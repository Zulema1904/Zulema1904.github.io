/*
 * Tetris.exe
 * Tablero de 10×20 en <canvas>, bolsa de 7 piezas, pieza fantasma, niveles
 * y récord guardado. Controles: ← → mover · ↑/X girar · Z girar al revés ·
 * ↓ bajar · Espacio soltar · P pausa.
 */
(() => {
  'use strict';

  const COLS = 10;
  const ROWS = 20;
  const CELL = 22;
  const T = {
    es: {
      score: 'Puntos', lines: 'Líneas', level: 'Nivel', best: 'Récord', next: 'Siguiente',
      start: 'Pulsa Espacio o ▶ para jugar', paused: 'Pausa', over: 'Fin de la partida',
      record: '¡Nuevo récord! 🏆', again: 'Espacio o ▶ para otra', keys: '← → mover · ↑ girar · ↓ bajar · Espacio soltar · P pausa',
      tetris: '¡TETRIS! ⚡',
    },
    en: {
      score: 'Score', lines: 'Lines', level: 'Level', best: 'Best', next: 'Next',
      start: 'Press Space or ▶ to play', paused: 'Paused', over: 'Game over',
      record: 'New record! 🏆', again: 'Space or ▶ to play again', keys: '← → move · ↑ rotate · ↓ drop · Space hard drop · P pause',
      tetris: 'TETRIS! ⚡',
    },
  };

  const SHAPES = {
    I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  };
  const COLORS = { I: '#7fe3ff', O: '#ffd66b', T: '#b79cf5', S: '#9dffb0', Z: '#ff8fc7', J: '#7f94f0', L: '#ffb38a' };
  const POINTS = [0, 100, 300, 500, 800];

  const rotate = (m, dir) => {
    const n = m.length;
    return m.map((row, y) => row.map((_, x) => (dir > 0 ? m[n - 1 - x][y] : m[x][n - 1 - y])));
  };

  // Aclara u oscurece un color hex para el relieve de los bloques
  const shade = (hex, amt) => {
    const n = parseInt(hex.slice(1), 16);
    const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(v + amt))));
    return `rgb(${c.join(',')})`;
  };

  function drawBlock(ctx, x, y, color, size = CELL, ghost = false) {
    const px = x * size;
    const py = y * size;
    if (ghost) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(px + 2, py + 2, size - 4, size - 4);
      return;
    }
    ctx.fillStyle = color;
    ctx.fillRect(px, py, size, size);
    ctx.fillStyle = shade(color, 60);
    ctx.fillRect(px, py, size, 3);
    ctx.fillRect(px, py, 3, size);
    ctx.fillStyle = shade(color, -70);
    ctx.fillRect(px, py + size - 3, size, 3);
    ctx.fillRect(px + size - 3, py, 3, size);
  }

  window.ZApps = window.ZApps || {};
  window.ZApps.tetris = {
    mount(body, ctx) {
      const t = () => T[ctx.lang()];
      body.classList.add('game', 'tetris-body');
      body.innerHTML = `
        <div class="tt" tabindex="0">
          <div class="tt-board-wrap">
            <canvas class="tt-board" width="${COLS * CELL}" height="${ROWS * CELL}"></canvas>
            <div class="tt-overlay"></div>
          </div>
          <div class="tt-side">
            <div class="tt-box"><span class="tt-l" data-k="next"></span><canvas class="tt-next" width="88" height="66"></canvas></div>
            <div class="tt-box"><span class="tt-l" data-k="score"></span><b class="tt-score">0</b></div>
            <div class="tt-box"><span class="tt-l" data-k="lines"></span><b class="tt-lines">0</b></div>
            <div class="tt-box"><span class="tt-l" data-k="level"></span><b class="tt-level">1</b></div>
            <div class="tt-box"><span class="tt-l" data-k="best"></span><b class="tt-best">0</b></div>
          </div>
        </div>
        <div class="tt-pad">
          <button class="btn" data-a="left" aria-label="←">◀</button>
          <button class="btn" data-a="rotate" aria-label="↻">⟳</button>
          <button class="btn" data-a="right" aria-label="→">▶</button>
          <button class="btn" data-a="down" aria-label="↓">▼</button>
          <button class="btn" data-a="drop" aria-label="⤓">⤓</button>
          <button class="btn primary" data-a="play" aria-label="▶/⏸">▶⏸</button>
        </div>
        <p class="muted tt-keys"></p>`;

      const $ = (s) => body.querySelector(s);
      const root = $('.tt');
      const board = $('.tt-board').getContext('2d');
      const nextCtx = $('.tt-next').getContext('2d');
      const overlay = $('.tt-overlay');

      let grid;
      let piece;
      let bag = [];
      let next;
      let score = 0;
      let lines = 0;
      let level = 1;
      let state = 'ready'; // ready | playing | paused | over
      let dropAt = 0;
      let flash = '';
      let flashUntil = 0;
      let best = Number(ctx.store.get('zos-tetris-best')) || 0;

      const takeFromBag = () => {
        if (!bag.length) {
          bag = Object.keys(SHAPES);
          for (let i = bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; }
        }
        return bag.pop();
      };
      const spawn = (type) => ({ type, m: SHAPES[type].map((r) => r.slice()), x: Math.floor((COLS - SHAPES[type].length) / 2), y: type === 'I' ? -1 : 0 });

      const fits = (m, x, y) => m.every((row, dy) => row.every((v, dx) => {
        if (!v) return true;
        const gx = x + dx;
        const gy = y + dy;
        return gx >= 0 && gx < COLS && gy < ROWS && (gy < 0 || !grid[gy][gx]);
      }));

      const speed = () => Math.max(70, 800 - (level - 1) * 75);

      function reset() {
        grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
        bag = [];
        score = 0;
        lines = 0;
        level = 1;
        piece = spawn(takeFromBag());
        next = takeFromBag();
        state = 'playing';
        dropAt = performance.now() + speed();
        stats();
      }

      function stats() {
        $('.tt-score').textContent = score;
        $('.tt-lines').textContent = lines;
        $('.tt-level').textContent = level;
        $('.tt-best').textContent = best;
        if (score >= 1000) window.ZAch?.unlock('tetris1000');
      }

      function lock() {
        piece.m.forEach((row, dy) => row.forEach((v, dx) => {
          if (v && piece.y + dy >= 0) grid[piece.y + dy][piece.x + dx] = COLORS[piece.type];
        }));
        if (piece.m.some((row, dy) => row.some((v) => v && piece.y + dy < 0))) return gameOver();
        let cleared = 0;
        for (let y = ROWS - 1; y >= 0; y--) {
          if (grid[y].every(Boolean)) {
            grid.splice(y, 1);
            grid.unshift(Array(COLS).fill(null));
            cleared++;
            y++;
          }
        }
        if (cleared) {
          score += POINTS[cleared] * level;
          lines += cleared;
          level = Math.floor(lines / 10) + 1;
          if (cleared === 4) { flash = t().tetris; flashUntil = performance.now() + 1200; window.ZAch?.unlock('tetris'); }
        }
        piece = spawn(next);
        next = takeFromBag();
        if (!fits(piece.m, piece.x, piece.y)) return gameOver();
        stats();
      }

      function gameOver() {
        state = 'over';
        const record = score > best;
        if (record) { best = score; ctx.store.set('zos-tetris-best', String(best)); }
        stats();
        overlay.innerHTML = `<b>${t().over}</b>${record && score ? `<span>${t().record}</span>` : ''}<span>${t().score}: ${score}</span><small>${t().again}</small>`;
      }

      const move = (dx) => { if (fits(piece.m, piece.x + dx, piece.y)) piece.x += dx; };
      const softDrop = () => {
        if (fits(piece.m, piece.x, piece.y + 1)) { piece.y++; score += 1; } else lock();
        dropAt = performance.now() + speed();
        stats();
      };
      const hardDrop = () => {
        let n = 0;
        while (fits(piece.m, piece.x, piece.y + 1)) { piece.y++; n++; }
        score += n * 2;
        lock();
        dropAt = performance.now() + speed();
      };
      const turn = (dir) => {
        const m = rotate(piece.m, dir);
        for (const [kx, ky] of [[0, 0], [-1, 0], [1, 0], [-2, 0], [2, 0], [0, -1]]) {
          if (fits(m, piece.x + kx, piece.y + ky)) { piece.m = m; piece.x += kx; piece.y += ky; return; }
        }
      };

      function action(a) {
        if (a === 'play') {
          if (state === 'ready' || state === 'over') reset();
          else state = state === 'playing' ? 'paused' : 'playing';
          if (state === 'playing') dropAt = performance.now() + speed();
          return;
        }
        if (state !== 'playing') return;
        if (a === 'left') move(-1);
        if (a === 'right') move(1);
        if (a === 'rotate') turn(1);
        if (a === 'rotateBack') turn(-1);
        if (a === 'down') softDrop();
        if (a === 'drop') hardDrop();
      }

      const KEYS = {
        ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'rotate', x: 'rotate', X: 'rotate', z: 'rotateBack', Z: 'rotateBack',
        ArrowDown: 'down', ' ': 'drop', p: 'play', P: 'play', Escape: 'play',
      };
      root.addEventListener('keydown', (e) => {
        let a = KEYS[e.key];
        if (!a) return;
        e.preventDefault();
        if (e.key === ' ' && state !== 'playing') a = 'play';
        if (e.key === 'Escape' && state !== 'playing') return;
        action(a);
      });
      $('.tt-pad').addEventListener('click', (e) => {
        const b = e.target.closest('[data-a]');
        if (b) { action(b.dataset.a); root.focus({ preventScroll: true }); }
      });
      root.addEventListener('pointerdown', () => root.focus({ preventScroll: true }));

      function draw(now) {
        board.fillStyle = '#120f2e';
        board.fillRect(0, 0, COLS * CELL, ROWS * CELL);
        board.strokeStyle = '#1f1a4a';
        board.lineWidth = 1;
        for (let x = 1; x < COLS; x++) { board.beginPath(); board.moveTo(x * CELL + 0.5, 0); board.lineTo(x * CELL + 0.5, ROWS * CELL); board.stroke(); }
        for (let y = 1; y < ROWS; y++) { board.beginPath(); board.moveTo(0, y * CELL + 0.5); board.lineTo(COLS * CELL, y * CELL + 0.5); board.stroke(); }
        grid.forEach((row, y) => row.forEach((c, x) => { if (c) drawBlock(board, x, y, c); }));

        if (state !== 'ready') {
          let gy = piece.y;
          while (fits(piece.m, piece.x, gy + 1)) gy++;
          piece.m.forEach((row, dy) => row.forEach((v, dx) => {
            if (!v) return;
            if (gy + dy >= 0) drawBlock(board, piece.x + dx, gy + dy, COLORS[piece.type], CELL, true);
            if (piece.y + dy >= 0) drawBlock(board, piece.x + dx, piece.y + dy, COLORS[piece.type]);
          }));
        }

        nextCtx.fillStyle = '#120f2e';
        nextCtx.fillRect(0, 0, 88, 66);
        const nm = SHAPES[next].filter((r) => r.some(Boolean));
        const size = 16;
        const ox = Math.round((88 - nm[0].length * size) / 2 / size * 100) / 100;
        const oy = Math.round((66 - nm.length * size) / 2 / size * 100) / 100;
        nm.forEach((row, y) => row.forEach((v, x) => { if (v) drawBlock(nextCtx, x + ox, y + oy, COLORS[next], size); }));

        if (state === 'ready') overlay.innerHTML = `<b>TETRIS</b><small>${t().start}</small>`;
        else if (state === 'paused') overlay.innerHTML = `<b>${t().paused}</b>`;
        else if (state === 'playing') overlay.innerHTML = now < flashUntil ? `<b class="tt-flash">${flash}</b>` : '';
        overlay.hidden = !overlay.innerHTML;
      }

      function loop(now) {
        if (!body.isConnected) return; // la ventana se ha cerrado
        const visible = body.offsetParent !== null && !document.hidden;
        if (!visible && state === 'playing') state = 'paused';
        if (state === 'playing' && now >= dropAt) {
          if (fits(piece.m, piece.x, piece.y + 1)) piece.y++;
          else lock();
          dropAt = now + speed();
        }
        draw(now);
        requestAnimationFrame(loop);
      }

      function labels() {
        body.querySelectorAll('.tt-l').forEach((l) => { l.textContent = t()[l.dataset.k]; });
        $('.tt-keys').textContent = t().keys;
      }

      grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
      next = takeFromBag();
      piece = spawn(next);
      labels();
      stats();
      requestAnimationFrame(loop);
      setTimeout(() => root.focus({ preventScroll: true }), 50);
      return { setLang: labels };
    },
  };
})();
