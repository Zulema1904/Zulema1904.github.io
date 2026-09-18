/*
 * Mascotas de escritorio: los gatos pasean por el suelo del escritorio,
 * se sientan, parpadean, se echan la siesta (a veces juntos) y maúllan al hacer clic.
 */
(() => {
  'use strict';

  const D = window.PORTFOLIO;
  const S = window.ZSprites;
  const desktop = document.getElementById('desktop');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
  };
  const T = () => D[document.documentElement.lang === 'en' ? 'en' : 'es'].ui.pets;
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const scale = () => (window.innerWidth <= 720 ? 2 : window.innerWidth <= 1100 ? 3 : 4);

  const layer = document.createElement('div');
  layer.className = 'pets';
  desktop.append(layer);

  const pets = D.pets.map((cfg, i) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'pet';
    el.dataset.kind = cfg.sprite;
    el.title = `${cfg.name} ${cfg.emoji}`;
    el.setAttribute('aria-label', cfg.name);
    el.innerHTML = '<img alt="" draggable="false"><span class="pet-bubble" hidden></span><span class="pet-zzz" hidden>z Z</span>';
    layer.append(el);
    return {
      cfg, el,
      img: el.querySelector('img'),
      bubble: el.querySelector('.pet-bubble'),
      zzz: el.querySelector('.pet-zzz'),
      x: 0, w: 0, dir: i ? -1 : 1,
      mode: 'sit', until: 0, target: 0, speed: 40,
      pose: '', frame: 0, frameT: 0,
      phase: Math.random() * 3000,
      cuddle: false,
      bubbleTimer: 0,
    };
  });
  pets.forEach((p, i) => { p.buddy = pets[1 - i]; });

  /* ---------- Dibujo ---------- */

  function setPose(p, pose) {
    if (p.pose === pose) return;
    const s = S.cat(p.cfg.sprite, pose);
    const k = scale();
    p.img.src = s.src;
    p.img.width = s.w * k;
    p.img.height = s.h * k;
    p.w = s.w * k;
    p.pose = pose;
  }

  function place(p) {
    const faces = p.pose.startsWith('walk') || p.pose.startsWith('sleep');
    p.el.style.transform = `translateX(${Math.round(p.x - p.w / 2)}px)`;
    p.img.style.transform = faces && p.dir < 0 ? 'scaleX(-1)' : '';
  }

  function say(p, text) {
    p.bubble.textContent = text;
    p.bubble.hidden = false;
    clearTimeout(p.bubbleTimer);
    p.bubbleTimer = setTimeout(() => { p.bubble.hidden = true; }, 1800);
  }

  function heart(p) {
    const h = document.createElement('span');
    h.className = 'pet-heart';
    h.textContent = '💜';
    p.el.append(h);
    setTimeout(() => h.remove(), 1000);
  }

  /* ---------- Comportamiento ---------- */

  const width = () => layer.clientWidth;
  const margin = () => 40 * scale() / 3;

  function sit(p, now, ms) {
    p.mode = 'sit';
    p.cuddle = false;
    p.zzz.hidden = true;
    p.until = now + ms;
  }

  function walkTo(p, x) {
    p.mode = 'walk';
    p.zzz.hidden = true;
    p.target = clamp(x, margin(), width() - margin());
    p.speed = rand(35, 55) * scale() / 3;
  }

  function sleep(p, now, ms) {
    p.mode = 'sleep';
    p.zzz.hidden = false;
    p.until = now + ms;
    // A veces el otro gato viene a dormir al lado, como en la foto
    const b = p.buddy;
    if (!p.cuddle && b && b.mode !== 'sleep' && Math.random() < 0.5) {
      b.cuddle = true;
      const side = b.x < p.x ? -1 : 1;
      walkTo(b, p.x + side * p.w * 0.8);
    }
  }

  function decide(p, now) {
    const r = Math.random();
    if (r < 0.6) walkTo(p, rand(margin(), width() - margin()));
    else if (r < 0.8) sleep(p, now, rand(8000, 15000));
    else sit(p, now, rand(3000, 6000));
  }

  function arrive(p, now) {
    if (p.cuddle) {
      p.dir = p.buddy.x > p.x ? 1 : -1;
      const left = p.buddy.mode === 'sleep' ? p.buddy.until - now : 0;
      sleep(p, now, Math.max(left, 6000));
    } else if (Math.random() < 0.75) sit(p, now, rand(2500, 6000));
    else sleep(p, now, rand(8000, 14000));
  }

  function update(p, now, dt) {
    if (p.mode === 'walk') {
      const d = p.target - p.x;
      if (Math.abs(d) < 2) arrive(p, now);
      else {
        p.dir = Math.sign(d);
        p.x += p.dir * Math.min(Math.abs(d), p.speed * dt);
        if (now - p.frameT > 170) { p.frame ^= 1; p.frameT = now; }
        setPose(p, p.frame ? 'walk1' : 'walk2');
      }
    }
    if (p.mode === 'sit') {
      setPose(p, (now + p.phase) % 3600 < 160 ? 'blink' : 'sit');
      if (now > p.until) decide(p, now);
    }
    if (p.mode === 'sleep') {
      setPose(p, Math.floor((now + p.phase) / 900) % 2 ? 'sleep1' : 'sleep2');
      if (now > p.until) sit(p, now, rand(2000, 4000));
    }
    p.x = clamp(p.x, margin(), width() - margin());
    place(p);
  }

  let last = performance.now();
  let raf = 0;
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    pets.forEach((p) => update(p, now, dt));
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (raf || reduced) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  /* ---------- Interacción ---------- */

  pets.forEach((p) => {
    p.el.addEventListener('click', () => {
      const now = performance.now();
      const meow = Math.random() < 0.3 ? `${p.cfg.name} ${p.cfg.emoji}` : pick(T().meows);
      say(p, p.mode === 'sleep' ? T().wake : meow);
      heart(p);
      sit(p, now, 3000);
      if (reduced) { setPose(p, 'sit'); place(p); }
    });
  });

  window.addEventListener('resize', () => {
    pets.forEach((p) => { p.pose = ''; update(p, performance.now(), 0); });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!layer.hidden) start();
  });

  /* ---------- Arranque: empiezan acurrucados, como en la foto ---------- */

  const now = performance.now();
  const [first, second] = pets;
  first.x = width() * 0.62;
  second.x = width() * 0.62 + 70 * scale() / 3;
  second.dir = -1;
  sleep(second, now, rand(5000, 8000));
  sit(first, now, rand(2500, 4000));
  pets.forEach((p) => update(p, now, 0));

  const enabled = () => store.get('zos-pets') !== 'off';
  const apply = () => {
    layer.hidden = !enabled();
    if (layer.hidden) stop(); else start();
  };
  apply();

  window.ZPets = {
    enabled,
    toggle(on = !enabled()) {
      store.set('zos-pets', on ? 'on' : 'off');
      apply();
      return on;
    },
    meow() {
      if (layer.hidden) this.toggle(true);
      pets.forEach((p, i) => setTimeout(() => p.el.click(), i * 400));
    },
    list: () => pets.map((p) => p.cfg),
  };
})();
