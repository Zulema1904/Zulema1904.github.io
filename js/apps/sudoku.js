/*
 * Sudoku.exe
 * Genera puzles con solución única: rellena un tablero completo al azar y va
 * quitando números mientras el resolvedor siga encontrando una sola solución.
 */
(() => {
  'use strict';

  const T = {
    es: {
      levels: { easy: 'Fácil', medium: 'Medio', hard: 'Difícil' },
      level: 'Dificultad', newGame: 'Nuevo', erase: 'Borrar',
      win: (t) => `🎉 ¡Resuelto en ${t}! Hela está impresionada.`,
      best: (t) => `Récord: ${t}`,
      generating: 'Generando…',
    },
    en: {
      levels: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
      level: 'Difficulty', newGame: 'New', erase: 'Erase',
      win: (t) => `🎉 Solved in ${t}! Hela is impressed.`,
      best: (t) => `Best: ${t}`,
      generating: 'Generating…',
    },
  };
  const HOLES = { easy: 38, medium: 46, hard: 53 };

  /* ---------- Lógica ---------- */

  const ROW = (i) => Math.floor(i / 9);
  const COL = (i) => i % 9;
  const BOX = (i) => Math.floor(ROW(i) / 3) * 3 + Math.floor(COL(i) / 3);
  const PEERS = Array.from({ length: 81 }, (_, i) => {
    const s = new Set();
    for (let j = 0; j < 81; j++) {
      if (j !== i && (ROW(j) === ROW(i) || COL(j) === COL(i) || BOX(j) === BOX(i))) s.add(j);
    }
    return [...s];
  });

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Números posibles en una casilla, como máscara de bits (bit n = número n)
  const candidates = (g, i) => {
    let used = 0;
    for (const p of PEERS[i]) used |= 1 << g[p];
    return ~used & 0b1111111110;
  };

  // Cuenta soluciones hasta "limit". Si "fill" es true, deja la primera escrita en g.
  function countSolutions(g, limit = 2, fill = false, random = false) {
    let best = -1;
    let bestMask = 0;
    let bestCount = 10;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const mask = candidates(g, i);
      let n = 0;
      for (let v = 1; v <= 9; v++) if (mask & (1 << v)) n++;
      if (n < bestCount) { best = i; bestMask = mask; bestCount = n; if (n <= 1) break; }
    }
    if (best === -1) return 1; // tablero completo
    if (bestCount === 0) return 0;
    let values = [];
    for (let v = 1; v <= 9; v++) if (bestMask & (1 << v)) values.push(v);
    if (random) values = shuffle(values);
    let total = 0;
    for (const v of values) {
      g[best] = v;
      total += countSolutions(g, limit - total, fill, random);
      if (total >= limit || (fill && total)) {
        if (!fill) g[best] = 0;
        return total;
      }
    }
    g[best] = 0;
    return total;
  }

  function generate(level) {
    const solution = Array(81).fill(0);
    countSolutions(solution, 1, true, true);
    const puzzle = solution.slice();
    let removed = 0;
    for (const i of shuffle([...Array(81).keys()])) {
      if (removed >= HOLES[level]) break;
      const keep = puzzle[i];
      puzzle[i] = 0;
      if (countSolutions(puzzle.slice(), 2) !== 1) puzzle[i] = keep;
      else removed++;
    }
    return { puzzle, solution };
  }

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  /* ---------- Interfaz ---------- */

  window.ZApps = window.ZApps || {};
  window.ZApps.sudoku = {
    mount(body, ctx) {
      const t = () => T[ctx.lang()];
      let level = ctx.store.get('zos-sudoku-level') || 'easy';
      let game = null;
      let values = [];
      let selected = -1;
      let started = 0;
      let solved = false;
      let timer = 0;

      body.classList.add('game');
      body.innerHTML = `
        <div class="game-bar">
          <label class="game-field"><span class="sdk-level-label"></span>
            <select class="sdk-level">${Object.keys(HOLES).map((k) => `<option value="${k}"></option>`).join('')}</select>
          </label>
          <button class="btn sdk-new"></button>
          <span class="game-stat sdk-time">0:00</span>
        </div>
        <div class="sdk" role="grid" tabindex="0"></div>
        <div class="sdk-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="btn" data-n="${n}">${n}</button>`).join('')}
          <button class="btn sdk-erase" data-n="0"></button></div>
        <p class="game-msg" aria-live="polite"></p>`;

      const $ = (s) => body.querySelector(s);
      const grid = $('.sdk');
      const msg = $('.game-msg');
      grid.innerHTML = Array.from({ length: 81 }, (_, i) => {
        const cls = [COL(i) % 3 === 2 && COL(i) < 8 && 'bx-r', ROW(i) % 3 === 2 && ROW(i) < 8 && 'bx-b'].filter(Boolean).join(' ');
        return `<button class="sdk-cell ${cls}" data-i="${i}" tabindex="-1"></button>`;
      }).join('');
      const cells = [...grid.children];

      function labels() {
        $('.sdk-level-label').textContent = t().level;
        $('.sdk-level').querySelectorAll('option').forEach((o) => { o.textContent = t().levels[o.value]; });
        $('.sdk-level').value = level;
        $('.sdk-new').textContent = t().newGame;
        $('.sdk-erase').textContent = t().erase;
        showBest();
      }

      function showBest() {
        const best = Number(ctx.store.get(`zos-sudoku-best-${level}`));
        if (!solved) msg.textContent = best ? t().best(fmt(best)) : '';
      }

      function paint() {
        const sel = values[selected];
        cells.forEach((c, i) => {
          const v = values[i];
          c.textContent = v || '';
          const conflict = v && PEERS[i].some((p) => values[p] === v);
          const related = selected >= 0 && (ROW(i) === ROW(selected) || COL(i) === COL(selected) || BOX(i) === BOX(selected));
          c.classList.toggle('given', !!game.puzzle[i]);
          c.classList.toggle('conflict', !!conflict);
          c.classList.toggle('related', related && i !== selected);
          c.classList.toggle('same', !!(sel && v === sel && i !== selected));
          c.classList.toggle('selected', i === selected);
          c.setAttribute('aria-label', `${ROW(i) + 1}·${COL(i) + 1}: ${v || '—'}`);
        });
      }

      function newGame() {
        msg.textContent = t().generating;
        setTimeout(() => {
          game = generate(level);
          values = game.puzzle.slice();
          selected = values.indexOf(0);
          solved = false;
          started = Date.now();
          grid.classList.remove('won');
          showBest();
          paint();
        }, 20);
      }

      function put(n) {
        if (solved || selected < 0 || game.puzzle[selected]) return;
        values[selected] = n;
        paint();
        if (values.every((v, i) => v === game.solution[i])) {
          solved = true;
          const secs = Math.round((Date.now() - started) / 1000);
          const key = `zos-sudoku-best-${level}`;
          const best = Number(ctx.store.get(key));
          if (!best || secs < best) ctx.store.set(key, String(secs));
          msg.textContent = t().win(fmt(secs));
          grid.classList.add('won');
          window.ZAch?.unlock('sudoku');
          if (level === 'hard') window.ZAch?.unlock('sudoku_hard');
        }
      }

      grid.addEventListener('click', (e) => {
        const c = e.target.closest('.sdk-cell');
        if (!c) return;
        selected = Number(c.dataset.i);
        paint();
        grid.focus({ preventScroll: true });
      });
      $('.sdk-pad').addEventListener('click', (e) => {
        const b = e.target.closest('[data-n]');
        if (b) put(Number(b.dataset.n));
      });
      grid.addEventListener('keydown', (e) => {
        const moves = { ArrowUp: -9, ArrowDown: 9, ArrowLeft: -1, ArrowRight: 1 };
        if (moves[e.key] !== undefined) {
          e.preventDefault();
          const next = selected + moves[e.key];
          if (next >= 0 && next < 81 && (Math.abs(moves[e.key]) === 9 || ROW(next) === ROW(selected))) selected = next;
          paint();
        } else if (/^[1-9]$/.test(e.key)) put(Number(e.key));
        else if (['Backspace', 'Delete', '0'].includes(e.key)) { e.preventDefault(); put(0); }
      });
      $('.sdk-new').addEventListener('click', newGame);
      $('.sdk-level').addEventListener('change', (e) => {
        level = e.target.value;
        ctx.store.set('zos-sudoku-level', level);
        newGame();
      });

      timer = setInterval(() => {
        if (!body.isConnected) return clearInterval(timer);
        if (game && !solved) $('.sdk-time').textContent = `⏱ ${fmt(Math.round((Date.now() - started) / 1000))}`;
      }, 500);

      labels();
      newGame();
      return { setLang: labels };
    },
  };
})();
