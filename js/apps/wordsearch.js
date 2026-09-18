/*
 * Sopa_de_letras.exe
 * Coloca palabras en las 8 direcciones y rellena el resto al azar.
 * Se selecciona arrastrando de la primera a la última letra, o con dos clics.
 */
(() => {
  'use strict';

  const SIZE = 12;
  const WORDS_PER_GAME = 10;
  const WORDS = {
    es: ['PYTHON', 'JAVA', 'LINUX', 'REDES', 'HTML', 'CSS', 'SQL', 'PHP', 'THOR', 'HELA', 'GATO', 'TERMINAL',
      'CODIGO', 'SERVIDOR', 'BUCLE', 'GIT', 'PIXEL', 'ROUTER', 'DATOS', 'FUNCION', 'VARIABLE', 'API', 'XML', 'TECLADO',
      'CONSOLA', 'SCRIPT', 'WEB', 'MODELO', 'CABLE', 'BINARIO'],
    en: ['PYTHON', 'JAVA', 'LINUX', 'NETWORK', 'HTML', 'CSS', 'SQL', 'PHP', 'THOR', 'HELA', 'CAT', 'TERMINAL',
      'CODE', 'SERVER', 'LOOP', 'GIT', 'PIXEL', 'ROUTER', 'DATA', 'FUNCTION', 'VARIABLE', 'API', 'XML', 'KEYBOARD',
      'CONSOLE', 'SCRIPT', 'WEB', 'MODEL', 'CABLE', 'BINARY'],
  };
  const T = {
    es: { newGame: 'Nueva', find: 'Encuentra las palabras', win: (t) => `🎉 ¡Todas encontradas en ${t}! Thor aplaude con la patita.`, hint: 'Arrastra de la primera a la última letra (o haz clic en las dos).' },
    en: { newGame: 'New', find: 'Find the words', win: (t) => `🎉 All found in ${t}! Thor applauds with his paw.`, hint: 'Drag from the first to the last letter (or click both).' },
  };
  const DIRS = [[1, 0], [0, 1], [1, 1], [1, -1], [-1, 0], [0, -1], [-1, -1], [-1, 1]];
  const COLORS = ['#b79cf5', '#7fe3ff', '#ff8fc7', '#9dffb0', '#ffd66b', '#a9b8ff', '#ffb38a', '#c9f27f', '#f5a3ff', '#8fe0d0'];

  const rnd = (n) => Math.floor(Math.random() * n);
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  function build(lang) {
    for (let attempt = 0; attempt < 20; attempt++) {
      const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(''));
      const words = shuffle(WORDS[lang].slice()).filter((w) => w.length <= SIZE).slice(0, WORDS_PER_GAME)
        .sort((a, b) => b.length - a.length);
      const placed = [];
      for (const word of words) {
        let ok = false;
        for (let tries = 0; tries < 300 && !ok; tries++) {
          const [dx, dy] = DIRS[rnd(DIRS.length)];
          const x = rnd(SIZE);
          const y = rnd(SIZE);
          const ex = x + dx * (word.length - 1);
          const ey = y + dy * (word.length - 1);
          if (ex < 0 || ex >= SIZE || ey < 0 || ey >= SIZE) continue;
          ok = [...word].every((ch, k) => [ch, ''].includes(grid[y + dy * k][x + dx * k]));
          if (ok) {
            [...word].forEach((ch, k) => { grid[y + dy * k][x + dx * k] = ch; });
            placed.push({ word, x, y, dx, dy });
          }
        }
      }
      if (placed.length === words.length) {
        const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        grid.forEach((row) => row.forEach((c, i) => { if (!c) row[i] = abc[rnd(abc.length)]; }));
        return { grid, words: placed.sort((a, b) => a.word.localeCompare(b.word)) };
      }
    }
    throw new Error('No se pudo generar la sopa de letras');
  }

  window.ZApps = window.ZApps || {};
  window.ZApps.wordsearch = {
    mount(body, ctx) {
      const t = () => T[ctx.lang()];
      let game;
      let found;
      let start = null;
      let armed = null;
      let started = 0;
      let done = false;

      body.classList.add('game');
      body.innerHTML = `
        <div class="game-bar">
          <button class="btn ws-new"></button>
          <span class="game-stat ws-count"></span>
          <span class="game-stat ws-time">0:00</span>
        </div>
        <div class="ws">
          <div class="ws-grid" style="--n:${SIZE}"></div>
          <div class="ws-side"><h4 class="ws-title"></h4><ul class="ws-words"></ul><p class="muted ws-hint"></p></div>
        </div>
        <p class="game-msg" aria-live="polite"></p>`;
      const $ = (s) => body.querySelector(s);
      const gridEl = $('.ws-grid');

      const cellAt = (x, y) => gridEl.children[y * SIZE + x];
      const posOf = (el) => { const i = Number(el.dataset.i); return [i % SIZE, Math.floor(i / SIZE)]; };

      // Casillas en línea recta entre a y b (o [] si no es horizontal/vertical/diagonal)
      function line([x1, y1], [x2, y2]) {
        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);
        const len = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        if (x1 !== x2 && y1 !== y2 && Math.abs(x2 - x1) !== Math.abs(y2 - y1)) return [];
        return Array.from({ length: len + 1 }, (_, k) => [x1 + dx * k, y1 + dy * k]);
      }

      function labels() {
        $('.ws-new').textContent = t().newGame;
        $('.ws-title').textContent = t().find;
        $('.ws-hint').textContent = t().hint;
      }

      function paintWords() {
        $('.ws-words').innerHTML = game.words.map((w, i) =>
          `<li class="${found.has(w.word) ? 'found' : ''}" style="--c:${COLORS[i % COLORS.length]}">${w.word}</li>`).join('');
        $('.ws-count').textContent = `${found.size} / ${game.words.length}`;
      }

      function newGame() {
        game = build(ctx.lang());
        found = new Set();
        start = armed = null;
        done = false;
        started = Date.now();
        gridEl.innerHTML = game.grid.flat().map((ch, i) => `<span class="ws-cell" data-i="${i}">${ch}</span>`).join('');
        $('.game-msg').textContent = '';
        paintWords();
      }

      function preview(cells) {
        gridEl.querySelectorAll('.picking').forEach((c) => c.classList.remove('picking'));
        cells.forEach(([x, y]) => cellAt(x, y).classList.add('picking'));
      }

      function check(a, b) {
        preview([]);
        const cells = line(a, b);
        if (cells.length < 2) return;
        const text = cells.map(([x, y]) => game.grid[y][x]).join('');
        const idx = game.words.findIndex((w) => !found.has(w.word) && (w.word === text || w.word === [...text].reverse().join('')));
        if (idx < 0) return;
        found.add(game.words[idx].word);
        cells.forEach(([x, y]) => {
          const c = cellAt(x, y);
          c.classList.add('found');
          c.style.setProperty('--c', COLORS[idx % COLORS.length]);
        });
        paintWords();
        if (found.size === game.words.length) {
          done = true;
          $('.game-msg').textContent = t().win(fmt(Math.round((Date.now() - started) / 1000)));
          window.ZAch?.unlock('wordsearch');
        }
      }

      const cellFromEvent = (e) => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        return el && el.classList.contains('ws-cell') && gridEl.contains(el) ? el : null;
      };

      gridEl.addEventListener('pointerdown', (e) => {
        const c = cellFromEvent(e);
        if (!c || done) return;
        e.preventDefault();
        if (armed && armed !== c) { check(posOf(armed), posOf(c)); armed = null; return; }
        start = c;
        try { gridEl.setPointerCapture(e.pointerId); } catch { /* puntero ya liberado */ }
        preview([posOf(c)]);
      });
      gridEl.addEventListener('pointermove', (e) => {
        if (!start) return;
        const c = cellFromEvent(e);
        if (c) preview(line(posOf(start), posOf(c)));
      });
      gridEl.addEventListener('pointerup', (e) => {
        if (!start) return;
        const c = cellFromEvent(e) || start;
        if (c === start) { armed = start; preview([posOf(start)]); } else check(posOf(start), posOf(c));
        start = null;
      });

      $('.ws-new').addEventListener('click', newGame);
      const timer = setInterval(() => {
        if (!body.isConnected) return clearInterval(timer);
        if (!done) $('.ws-time').textContent = `⏱ ${fmt(Math.round((Date.now() - started) / 1000))}`;
      }, 500);

      labels();
      newGame();
      return { setLang() { labels(); } };
    },
  };
})();
