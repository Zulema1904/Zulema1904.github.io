/*
 * Extras de ZulemaOS: widget de frases, salvapantallas y código Konami.
 */
(() => {
  'use strict';

  const D = window.PORTFOLIO;
  const S = window.ZSprites;
  const desktop = document.getElementById('desktop');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
  const U = () => D[lang()].ui;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
  };
  const rand = (a, b) => a + Math.random() * (b - a);

  let quoteIndex = Math.floor(Math.random() * D.quotes.es.length);
  const fortune = () => D.quotes[lang()][Math.floor(Math.random() * D.quotes[lang()].length)];

  /* ---------- Widget de frases ---------- */

  const widget = document.createElement('aside');
  widget.className = 'widget';
  widget.innerHTML = `
    <header class="widget-bar"><span class="w-title"></span>
      <span><button class="w-btn w-next">↻</button><button class="w-btn w-close">✕</button></span></header>
    <blockquote><p class="w-text"></p><footer class="w-author"></footer></blockquote>`;
  desktop.append(widget);
  const wText = widget.querySelector('.w-text');
  let typing = 0;
  let rotate = 0;

  function showQuote(i = quoteIndex, animate = true) {
    const list = D.quotes[lang()];
    quoteIndex = (i + list.length) % list.length;
    const [text, author] = list[quoteIndex];
    widget.querySelector('.w-author').textContent = `— ${author}`;
    clearInterval(typing);
    if (!animate || reduced) { wText.textContent = text; return; }
    // Efecto máquina de escribir
    let n = 0;
    wText.textContent = '';
    wText.classList.add('typing');
    typing = setInterval(() => {
      wText.textContent = text.slice(0, ++n);
      if (n >= text.length) { clearInterval(typing); wText.classList.remove('typing'); }
    }, 28);
  }

  function paintWidget() {
    const w = U().widget;
    widget.querySelector('.w-title').textContent = `💬 ${w.title}`;
    widget.querySelector('.w-next').setAttribute('aria-label', w.next);
    widget.querySelector('.w-next').title = w.next;
    widget.querySelector('.w-close').setAttribute('aria-label', w.close);
    widget.querySelector('.w-close').title = w.close;
  }

  const widgetOn = () => store.get('zos-widget') !== 'off';
  function applyWidget() {
    widget.hidden = !widgetOn();
    clearInterval(rotate);
    if (!widget.hidden) {
      showQuote();
      rotate = setInterval(() => { if (!widget.matches(':hover') && !document.hidden) showQuote(quoteIndex + 1); }, 60000);
    }
  }
  widget.querySelector('.w-next').addEventListener('click', () => showQuote(quoteIndex + 1));
  widget.querySelector('.w-close').addEventListener('click', () => { store.set('zos-widget', 'off'); applyWidget(); });

  /* ---------- Salvapantallas ---------- */

  const IDLE_MS = 75000;
  let idleTimer = 0;
  let saver = null;

  function startSaver() {
    if (saver || document.hidden || document.getElementById('boot')) return;
    if (!document.getElementById('quick').hidden) return;
    const el = document.createElement('div');
    el.className = 'saver';
    el.innerHTML = `<canvas></canvas><div class="saver-logo">Zulema<b>OS</b></div>
      <div class="saver-cats"></div><p class="saver-hint">${U().saver}</p>`;
    document.body.append(el);
    const canvas = el.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const logo = el.querySelector('.saver-logo');
    const catsEl = el.querySelector('.saver-cats');
    const cats = ['black', 'tabby'].map((kind, i) => {
      const img = new Image();
      img.alt = '';
      catsEl.append(img);
      return { kind, img, x: -150 - i * 110 };
    });
    const colors = ['#ff8fc7', '#7fe3ff', '#9dffb0', '#ffd66b', '#b79cf5'];
    let W;
    let H;
    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
    resize();
    const stars = Array.from({ length: 220 }, () => ({ x: rand(-1, 1), y: rand(-1, 1), z: rand(0.05, 1) }));
    const pos = { x: rand(0, W * 0.6), y: rand(0, H * 0.6), vx: 110, vy: 80, c: 0 };
    let last = performance.now();
    let frame = 0;

    const tick = (now) => {
      if (!saver) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.fillStyle = 'rgba(11, 9, 32, 0.35)';
      ctx.fillRect(0, 0, W, H);
      for (const s of stars) {
        s.z -= dt * 0.25;
        if (s.z <= 0.02) { s.x = rand(-1, 1); s.y = rand(-1, 1); s.z = 1; }
        const sx = W / 2 + (s.x / s.z) * W * 0.5;
        const sy = H / 2 + (s.y / s.z) * H * 0.5;
        const size = Math.max(1, (1 - s.z) * 3.5);
        ctx.fillStyle = s.z < 0.3 ? '#ffffff' : '#b79cf5';
        ctx.fillRect(sx, sy, size, size);
      }
      // Logo que rebota y cambia de color en cada choque, como los DVD de antes
      const lw = logo.offsetWidth;
      const lh = logo.offsetHeight;
      pos.x += pos.vx * dt;
      pos.y += pos.vy * dt;
      if (pos.x <= 0 || pos.x + lw >= W) { pos.vx *= -1; pos.c++; pos.x = Math.max(0, Math.min(pos.x, W - lw)); }
      if (pos.y <= 0 || pos.y + lh >= H) { pos.vy *= -1; pos.c++; pos.y = Math.max(0, Math.min(pos.y, H - lh)); }
      logo.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      logo.style.color = colors[pos.c % colors.length];
      // Thor y Hela cruzan la pantalla
      frame = Math.floor(now / 160) % 2;
      cats.forEach((c) => {
        c.x += 120 * dt;
        if (c.x > W + 60) c.x = -160;
        const s = S.cat(c.kind, frame ? 'walk1' : 'walk2');
        if (c.img.src !== s.src) c.img.src = s.src;
        c.img.width = s.w * 4;
        c.img.style.transform = `translateX(${c.x}px)`;
      });
      requestAnimationFrame(tick);
    };

    saver = { el, resize };
    window.addEventListener('resize', resize);
    window.ZAch?.unlock('screensaver');
    if (reduced) {
      logo.style.transform = `translate(${W / 2 - logo.offsetWidth / 2}px, ${H / 2 - logo.offsetHeight / 2}px)`;
    } else {
      requestAnimationFrame(tick);
    }
  }

  function stopSaver() {
    if (!saver) return;
    window.removeEventListener('resize', saver.resize);
    saver.el.remove();
    saver = null;
  }

  function activity() {
    stopSaver();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startSaver, IDLE_MS);
  }
  ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
    window.addEventListener(ev, activity, { passive: true, capture: true }));
  activity();

  /* ---------- Código Konami: ↑ ↑ ↓ ↓ ← → ← → B A ---------- */

  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let progress = 0;
  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
    if (progress === KONAMI.length) { progress = 0; party(); window.ZAch?.unlock('konami'); }
  });

  function party() {
    const rain = document.createElement('div');
    rain.className = 'rain';
    rain.setAttribute('aria-hidden', 'true');
    const items = ['🐟', '💜', '⚡', '👑', '🐾', '🐟', '💜'];
    let html = `<p class="rain-title">${U().konami}</p>`;
    for (let i = 0; i < 46; i++) {
      const style = `left:${rand(0, 98)}%;animation-duration:${rand(2.2, 4.2)}s;animation-delay:${rand(0, 1.8)}s;font-size:${rand(18, 34)}px`;
      html += i % 6 === 0
        ? `<img src="${S.cat(i % 12 === 0 ? 'black' : 'tabby', 'sit').src}" style="${style};width:${rand(36, 60)}px" alt="">`
        : `<span style="${style}">${items[i % items.length]}</span>`;
    }
    rain.innerHTML = html;
    document.body.append(rain);
    if (window.ZPets) window.ZPets.meow();
    setTimeout(() => rain.remove(), 6500);
  }

  /* ---------- API ---------- */

  paintWidget();
  applyWidget();

  window.ZExtras = {
    fortune,
    party,
    screensaver: () => { clearTimeout(idleTimer); setTimeout(startSaver, 300); },
    widgetEnabled: widgetOn,
    toggleWidget() { store.set('zos-widget', widgetOn() ? 'off' : 'on'); applyWidget(); },
    setLang() { paintWidget(); if (!widget.hidden) showQuote(quoteIndex, false); },
  };
})();
