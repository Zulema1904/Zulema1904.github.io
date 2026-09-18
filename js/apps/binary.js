/*
 * Binario.exe · calculadora de bits
 * Decimal ⇄ binario ⇄ hexadecimal ⇄ octal, bits como LEDs que se pulsan,
 * operaciones NOT / << / >> y vista como IPv4 (32 bits) o carácter ASCII (8 bits).
 */
(() => {
  'use strict';

  const T = {
    es: { bits: 'Bits', dec: 'Decimal', bin: 'Binario', hex: 'Hexadecimal', oct: 'Octal', clear: 'Limpiar', ip: 'Como IPv4', char: 'Carácter ASCII', none: '(no imprimible)', hint: 'Haz clic en los bits para encenderlos 💡' },
    en: { bits: 'Bits', dec: 'Decimal', bin: 'Binary', hex: 'Hexadecimal', oct: 'Octal', clear: 'Clear', ip: 'As IPv4', char: 'ASCII character', none: '(not printable)', hint: 'Click the bits to switch them on 💡' },
  };
  const BASES = { dec: 10, bin: 2, hex: 16, oct: 8 };

  window.ZApps = window.ZApps || {};
  window.ZApps.binary = {
    mount(body, ctx) {
      const t = () => T[ctx.lang()];
      let bits = 8;
      let value = 42;

      body.classList.add('game', 'bin-body');
      body.innerHTML = `
        <div class="game-bar">
          <span class="bin-label" data-k="bits"></span>
          ${[8, 16, 32].map((n) => `<button class="btn bin-size" data-bits="${n}">${n}</button>`).join('')}
          <span class="game-stat bin-dec-big"></span>
        </div>
        <div class="bin-leds"></div>
        <div class="bin-ops">
          <button class="btn" data-op="not">NOT</button>
          <button class="btn" data-op="shl">&lt;&lt; 1</button>
          <button class="btn" data-op="shr">&gt;&gt; 1</button>
          <button class="btn" data-op="inc">+1</button>
          <button class="btn" data-op="dec">−1</button>
          <button class="btn" data-op="clear" data-k="clear"></button>
        </div>
        <div class="bin-fields">${Object.keys(BASES).map((k) =>
          `<label><span data-k="${k}"></span><input class="bin-in" data-base="${k}" spellcheck="false" autocomplete="off"></label>`).join('')}
        </div>
        <p class="bin-extra"></p>
        <p class="muted bin-hint" data-k="hint"></p>`;

      const $ = (s) => body.querySelector(s);
      const max = () => (bits === 32 ? 0xFFFFFFFF : (1 << bits) - 1);
      const norm = (v) => (bits === 32 ? v >>> 0 : v & max());

      function paint(except) {
        $('.bin-dec-big').textContent = value.toLocaleString(ctx.lang() === 'es' ? 'es-ES' : 'en-GB');
        body.querySelectorAll('.bin-size').forEach((b) => b.classList.toggle('pressed', Number(b.dataset.bits) === bits));

        const leds = [];
        for (let i = bits - 1; i >= 0; i--) {
          const on = Math.floor(value / 2 ** i) % 2 === 1;
          leds.push(`<button class="led ${on ? 'on' : ''}" data-bit="${i}" aria-pressed="${on}" title="2^${i} = ${(2 ** i).toLocaleString()}"><i></i><small>${i}</small></button>`);
          if (i % 4 === 0 && i) leds.push('<span class="led-gap"></span>');
        }
        $('.bin-leds').innerHTML = leds.join('');

        body.querySelectorAll('.bin-in').forEach((inp) => {
          if (inp === except) return;
          const k = inp.dataset.base;
          let s = value.toString(BASES[k]).toUpperCase();
          if (k === 'bin') s = s.padStart(bits, '0').replace(/(.{4})(?=.)/g, '$1 ');
          inp.value = s;
          inp.classList.remove('bad');
        });

        let extra = '';
        if (bits === 32) extra = `${t().ip}: <b>${[24, 16, 8, 0].map((s) => (value >>> s) & 255).join('.')}</b>`;
        if (bits === 8) extra = `${t().char}: <b>${value >= 32 && value < 127 ? `'${String.fromCharCode(value).replace('<', '&lt;')}'` : t().none}</b>`;
        $('.bin-extra').innerHTML = extra;
      }

      function labels() {
        body.querySelectorAll('[data-k]').forEach((el) => { el.textContent = t()[el.dataset.k]; });
        paint();
      }

      $('.bin-leds').addEventListener('click', (e) => {
        const led = e.target.closest('.led');
        if (!led) return;
        const w = 2 ** Number(led.dataset.bit);
        value = led.classList.contains('on') ? value - w : value + w;
        paint();
      });
      body.querySelectorAll('.bin-size').forEach((b) => b.addEventListener('click', () => {
        bits = Number(b.dataset.bits);
        value = norm(value);
        paint();
      }));
      $('.bin-ops').addEventListener('click', (e) => {
        const op = e.target.closest('[data-op]')?.dataset.op;
        if (!op) return;
        if (op === 'not') value = norm(~value);
        if (op === 'shl') value = norm(value * 2);
        if (op === 'shr') value = Math.floor(value / 2);
        if (op === 'inc') value = value === max() ? 0 : value + 1;
        if (op === 'dec') value = value === 0 ? max() : value - 1;
        if (op === 'clear') value = 0;
        paint();
      });
      body.querySelectorAll('.bin-in').forEach((inp) => inp.addEventListener('input', () => {
        const base = BASES[inp.dataset.base];
        const raw = inp.value.replace(/\s|_/g, '').replace(/^0[xbo]/i, '');
        const valid = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^\d+$/, 16: /^[0-9a-f]+$/i }[base];
        const n = raw ? parseInt(raw, base) : 0;
        const ok = !raw || (valid.test(raw) && n <= max());
        inp.classList.toggle('bad', !ok);
        if (ok) { value = n; paint(inp); }
      }));

      labels();
      return { setLang: labels };
    },
  };
})();
