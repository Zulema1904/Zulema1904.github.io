/*
 * ZulemaOS: escritorio, ventanas, barra de tareas, menú Inicio,
 * modo rápido (CV en una página), arranque y apagado.
 */
(() => {
  'use strict';

  const D = window.PORTFOLIO;
  const I = window.ICONS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // Almacenamiento tolerante a fallos (modo privado, cookies bloqueadas…)
  const storage = (name) => ({
    get: (key) => { try { return window[name].getItem(key); } catch { return null; } },
    set: (key, val) => { try { window[name].setItem(key, val); } catch { /* sin almacenamiento */ } },
    del: (key) => { try { window[name].removeItem(key); } catch { /* sin almacenamiento */ } },
  });
  const local = storage('localStorage');
  const session = storage('sessionStorage');

  const pickLang = () => {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'es' || q === 'en') return q;
    const saved = local.get('zos-lang');
    if (saved === 'es' || saved === 'en') return saved;
    return (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  };

  let lang = pickLang();
  const L = () => D[lang];
  const U = () => D[lang].ui;
  const isMobile = () => window.matchMedia('(max-width: 720px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const layer = $('#windows');
  const iconsNav = $('#icons');
  const taskList = $('#task-list');
  const startBtn = $('#start-btn');
  const startMenu = $('#start-menu');
  const quickEl = $('#quick');
  const clockEl = $('#clock');

  /* ---------- Plantillas de contenido ---------- */

  const avatarImg = () => `<img class="avatar-img" src="${window.ZSprites.avatar().src}" alt="" width="32" height="32">`;
  const catIcon = () => `<img src="${window.ZSprites.cat('black', 'sit').src}" alt="">`;
  const chips = (items) => `<ul class="chips">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  const addrBar = (path) => `<div class="addr-bar"><span>${esc(U().address)}</span><div class="addr">${esc(path)}</div></div>`;

  const timeline = (items) => `<ol class="timeline">${items.map((it) => `
    <li class="${it.pending ? 'pending' : ''}">
      <div class="tl-date">${esc(it.period)}</div>
      <h4 class="tl-role">${esc(it.role)}</h4>
      <p class="tl-org">${it.pending ? `✎ ${esc(U().pending)}` : esc(it.org)}</p>
      ${it.points && it.points.length ? `<ul>${it.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
    </li>`).join('')}</ol>`;

  const R = {
    welcome() {
      const w = U().welcome;
      const tips = w.tips.map((t) => t
        .replace('{terminal}', `<button class="link" data-open="terminal">${esc(w.terminal)}</button>`)
        .replace('{quick}', `<button class="link" data-action="quick">${esc(w.quick)}</button>`));
      const icons = [I.notepad, I.terminal, I.zap, catIcon()];
      return `<div class="welcome">
        <div class="welcome-hero">
          <div class="big-logo" aria-hidden="true">${avatarImg()}</div>
          <div><h3>${esc(w.title)}</h3><p>${esc(w.intro)}</p></div>
        </div>
        <ul class="tips">${tips.map((t, i) => `<li>${icons[i]}<span>${t}</span></li>`).join('')}</ul>
        <div class="row-end">
          <label class="check"><input type="checkbox" data-action="hide-welcome" ${local.get('zos-hide-welcome') === '1' ? 'checked' : ''}> ${esc(w.hide)}</label>
          <button class="btn primary" data-action="close-welcome">${esc(w.go)}</button>
        </div>
      </div>`;
    },

    about() {
      const l = L();
      return `<div class="about">
        <div class="about-head">
          <div class="avatar" aria-hidden="true">${avatarImg()}</div>
          <div>
            <h3>${esc(D.name)}</h3>
            <p class="role">${esc(l.role)}</p>
            <p class="status">${esc(l.status)}</p>
          </div>
        </div>
        ${l.about.map((p) => `<p>${esc(p)}</p>`).join('')}
        <div class="facts">${l.facts.map(([k, v]) => `<div><span>${esc(k)}</span>${esc(v)}</div>`).join('')}</div>
        <div class="actions">
          <button class="btn" data-open="experience">${esc(U().seeExperience)}</button>
          <button class="btn" data-open="projects">${esc(U().seeProjects)}</button>
          <button class="btn primary" data-open="contact">${esc(U().contactMe)}</button>
        </div>
      </div>`;
    },

    experience() {
      return `${addrBar(U().paths.experience)}
        <h3 class="sec-title">${esc(U().sec.experience)}</h3>
        ${timeline(L().experience)}
        <h3 class="sec-title">${esc(U().sec.education)}</h3>
        ${timeline(L().education)}`;
    },

    projects() {
      return `${addrBar(U().paths.projects)}
        <div class="cards">
          ${L().projects.map((p) => `
            <article class="card">
              <div class="card-head">${p.kind === 'live' ? I.terminal : I.folderLilac}<h4>${esc(p.name)}</h4></div>
              <span class="badge ${p.kind}">${esc(p.tag)}</span>
              <p>${esc(p.desc)}</p>
              ${chips(p.stack)}
              ${p.url ? `<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">↗ Ver</a>` : ''}
            </article>`).join('')}
          <div class="card ghost">${I.notepad}<strong>${esc(U().comingSoon)}</strong><span>${esc(U().comingSoonText)}</span></div>
        </div>`;
    },

    skills() {
      const s = U().sys;
      return `<div class="sysinfo">
          ${I.chip}
          <div><h3>${esc(s.title)}</h3>
          <dl>${s.rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div>
        </div>
        ${L().skills.map((g) => `<fieldset class="group"><legend>${esc(g.title)}</legend>${chips(g.items)}</fieldset>`).join('')}
        <fieldset class="group"><legend>${esc(U().sec.soft)}</legend>${chips(L().soft)}</fieldset>
        <fieldset class="group"><legend>${esc(U().sec.languages)}</legend>${chips(L().languages.map(([a, b]) => `${a} · ${b}`))}</fieldset>`;
    },

    contact() {
      const c = U().contact;
      return `<div class="contact">
        <div class="contact-hero">${I.mail}<div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div></div>
        <div class="email-field">
          <code>${esc(D.email)}</code>
          <button class="btn" data-action="copy-email">${esc(c.copy)}</button>
        </div>
        <div class="actions">
          <a class="btn primary" href="mailto:${esc(D.email)}">✉ ${esc(c.send)}</a>
          ${D.linkedin ? `<a class="btn" href="${esc(D.linkedin)}" target="_blank" rel="noopener">in LinkedIn</a>` : ''}
          ${D.github ? `<a class="btn" href="${esc(D.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
        </div>
        <p class="muted">📍 ${esc(D.location)}</p>
      </div>`;
    },

    trash() {
      return `${addrBar(U().paths.trash)}
        <ul class="file-list">${L().trash.map(([name, year]) => `
          <li>${I.notepad}<span>${esc(name)}</span><small>${esc(U().trashDeleted)} ${esc(year)}</small></li>`).join('')}
        </ul>
        <p class="muted center">${esc(U().trashNote)}</p>`;
    },
  };

  /* ---------- Aplicaciones ---------- */

  const APPS = {
    welcome: { icon: 'info', w: 500, render: R.welcome },
    about: { icon: 'notepad', w: 580, h: 520, render: R.about },
    experience: { icon: 'folderBlue', w: 660, h: 560, render: R.experience },
    projects: { icon: 'folderLilac', w: 700, h: 540, render: R.projects },
    skills: { icon: 'chip', w: 620, h: 560, render: R.skills },
    terminal: { icon: 'terminal', w: 700, h: 450, bodyClass: 'term', mount: (body) => window.ZTerminal(body, termCtx) },
    contact: { icon: 'mail', w: 460, render: R.contact },
    cv: { icon: 'pdf', action: () => openQuick() },
    trash: { icon: 'trash', w: 460, h: 360, render: R.trash },
  };
  const DESKTOP_ICONS = ['about', 'experience', 'projects', 'skills', 'terminal', 'contact', 'cv', 'trash'];

  /* ---------- Gestor de ventanas ---------- */

  const wins = new Map();
  let z = 10;
  let cascade = 0;

  function openApp(id) {
    const app = APPS[id];
    if (!app) return;
    toggleStart(false);
    if (app.action) return app.action();

    const existing = wins.get(id);
    if (existing) {
      existing.el.hidden = false;
      focusWin(id);
      return;
    }

    const el = document.createElement('section');
    el.className = 'window';
    el.dataset.app = id;
    el.tabIndex = -1;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-labelledby', `t-${id}`);
    el.innerHTML = `
      <header class="titlebar">
        <span class="t-icon">${I[app.icon]}</span>
        <h2 class="t-title" id="t-${id}"></h2>
        <div class="t-btns">
          <button class="t-btn" data-act="min">${I.btnMin}</button>
          <button class="t-btn" data-act="max">${I.btnMax}</button>
          <button class="t-btn" data-act="close">${I.btnClose}</button>
        </div>
      </header>
      <div class="window-body ${app.bodyClass || ''}"></div>`;

    placeWindow(el, app, id);
    layer.append(el);

    const task = document.createElement('button');
    task.className = 'task';
    task.innerHTML = `${I[app.icon]}<span></span>`;
    task.addEventListener('click', () => {
      if (el.hidden) { el.hidden = false; focusWin(id); }
      else if (el.classList.contains('active')) minimizeWin(id);
      else focusWin(id);
    });
    taskList.append(task);

    const w = { id, el, task, body: $('.window-body', el) };
    wins.set(id, w);
    paintWin(w);

    $('.t-btns', el).addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]')?.dataset.act;
      if (act === 'min') minimizeWin(id);
      if (act === 'max') el.classList.toggle('maximized');
      if (act === 'close') closeWin(id);
    });
    el.addEventListener('pointerdown', () => focusWin(id), true);
    enableDrag(el, id);

    focusWin(id);
    if (app.mount) app.mount(w.body, w);
  }

  function placeWindow(el, app, id) {
    if (isMobile()) {
      el.classList.add('maximized');
      return;
    }
    const vw = layer.clientWidth;
    const vh = layer.clientHeight;
    const width = Math.min(app.w, vw - 32);
    el.style.width = `${width}px`;
    if (app.h) el.style.height = `${Math.min(app.h, vh - 32)}px`;

    let x;
    let y;
    if (id === 'welcome') {
      x = vw - width - 48;
      y = 48;
    } else {
      const step = (cascade++ % 6) * 28;
      x = (vw - width) / 2 + step - 40;
      y = 36 + step;
    }
    el.style.left = `${clamp(x, vw > 900 ? 130 : 16, vw - width - 16)}px`;
    el.style.top = `${clamp(y, 16, vh - 120)}px`;
  }

  function paintWin(w) {
    const u = U();
    const title = u.apps[w.id];
    $('.t-title', w.el).textContent = title;
    $('[data-act="min"]', w.el).setAttribute('aria-label', u.min);
    $('[data-act="max"]', w.el).setAttribute('aria-label', u.max);
    $('[data-act="close"]', w.el).setAttribute('aria-label', u.close);
    $('span', w.task).textContent = title;
    w.task.title = title;
    const app = APPS[w.id];
    if (app.render) w.body.innerHTML = app.render();
  }

  function focusWin(id) {
    wins.forEach((w) => {
      const on = w.id === id;
      w.el.classList.toggle('active', on);
      w.task.setAttribute('aria-pressed', String(on && !w.el.hidden));
    });
    const w = wins.get(id);
    if (!w) return;
    w.el.style.zIndex = ++z;
    if (quickEl.hidden && !w.el.contains(document.activeElement)) w.el.focus({ preventScroll: true });
  }

  function minimizeWin(id) {
    const w = wins.get(id);
    if (!w) return;
    w.el.hidden = true;
    w.el.classList.remove('active');
    w.task.setAttribute('aria-pressed', 'false');
    focusTopmost();
  }

  function closeWin(id) {
    const w = wins.get(id);
    if (!w) return;
    w.el.remove();
    w.task.remove();
    wins.delete(id);
    focusTopmost();
  }

  function focusTopmost() {
    const visible = [...wins.values()].filter((w) => !w.el.hidden);
    if (!visible.length) return;
    visible.sort((a, b) => b.el.style.zIndex - a.el.style.zIndex);
    focusWin(visible[0].id);
  }

  function enableDrag(el, id) {
    const bar = $('.titlebar', el);
    bar.addEventListener('dblclick', (e) => {
      if (!e.target.closest('.t-btn') && !isMobile()) el.classList.toggle('maximized');
    });
    bar.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('.t-btn') || el.classList.contains('maximized')) return;
      focusWin(id);
      const r = el.getBoundingClientRect();
      const offX = e.clientX - r.left;
      const offY = e.clientY - r.top;
      try { bar.setPointerCapture(e.pointerId); } catch { /* puntero ya liberado */ }
      el.classList.add('dragging');

      const move = (ev) => {
        el.style.left = `${clamp(ev.clientX - offX, 80 - r.width, layer.clientWidth - 80)}px`;
        el.style.top = `${clamp(ev.clientY - offY, 0, layer.clientHeight - 32)}px`;
      };
      const stop = () => {
        el.classList.remove('dragging');
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', stop);
        bar.removeEventListener('pointercancel', stop);
      };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', stop);
      bar.addEventListener('pointercancel', stop);
    });
  }

  const termCtx = {
    lang: () => lang,
    setLang: (l) => setLang(l),
    openApp: (id) => openApp(id),
    close: () => closeWin('terminal'),
  };

  /* ---------- Escritorio, menú Inicio y barra de tareas ---------- */

  // Permite partir "Sobre_mi.txt" como "Sobre_ / mi.txt" en vez de a mitad de palabra
  const breakable = (name) => esc(name).replace(/_/g, '_<wbr>').replace(/\.(?=[a-z]+$)/, '<wbr>.');

  function renderIcons() {
    iconsNav.innerHTML = DESKTOP_ICONS.map((id) =>
      `<button class="d-icon" data-open="${id}" aria-label="${esc(U().apps[id])}">${I[APPS[id].icon]}<span>${breakable(U().apps[id])}</span></button>`).join('');
  }

  function renderStart() {
    const u = U();
    const item = (attr, icon, label) =>
      `<li><button class="start-item" ${attr} role="menuitem">${icon}<span>${esc(label)}</span></button></li>`;
    startMenu.innerHTML = `
      <div class="start-banner" aria-hidden="true"><span>Zulema<b>OS</b></span></div>
      <ul class="start-list" role="menu">
        ${['about', 'experience', 'projects', 'skills', 'terminal', 'contact']
          .map((id) => item(`data-open="${id}"`, I[APPS[id].icon], u.apps[id])).join('')}
        <li class="start-sep" role="separator"></li>
        ${item('data-action="quick"', I.zap, u.quick)}
        ${item('data-open="welcome"', I.info, u.readme)}
        ${item('data-action="lang"', I.globe, u.langName)}
        ${item('data-action="pets"', catIcon(), window.ZPets.enabled() ? u.pets.on : u.pets.off)}
        <li class="start-sep" role="separator"></li>
        ${item('data-action="shutdown"', I.power, u.shutdown)}
      </ul>`;
  }

  function toggleStart(force) {
    const open = typeof force === 'boolean' ? force : startMenu.hidden;
    startMenu.hidden = !open;
    startBtn.setAttribute('aria-expanded', String(open));
    startBtn.classList.toggle('pressed', open);
  }

  function paintStatic() {
    $$('[data-i18n]').forEach((el) => { el.textContent = U()[el.dataset.i18n]; });
    $('#lang-btn').textContent = U().langBtn;
    $('#lang-btn').setAttribute('aria-label', U().langName);
    $('#wm-role').textContent = L().role;
  }

  function updateClock() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
    clockEl.dateTime = now.toISOString();
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'es';
    local.set('zos-lang', lang);
    document.documentElement.lang = lang;
    document.title = L().docTitle;
    paintStatic();
    renderIcons();
    renderStart();
    wins.forEach(paintWin);
    if (!quickEl.hidden) quickEl.innerHTML = renderQuick();
    updateClock();
  }

  /* ---------- Modo rápido (CV en una página) ---------- */

  function renderQuick() {
    const l = L();
    const u = U();
    const job = (it) => `<div class="cv-job ${it.pending ? 'pending' : ''}">
        <h3>${esc(it.role)}</h3>
        <p class="meta">${it.pending ? `✎ ${esc(u.pending)}` : esc(it.org)} · ${esc(it.period)}</p>
        ${it.points && it.points.length ? `<ul>${it.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      </div>`;
    return `
      <div class="quick-bar no-print">
        <button class="btn" data-action="close-quick">← ${esc(u.quickBar.back)}</button>
        <div class="quick-bar-right">
          <button class="btn" data-action="lang">${esc(u.langName)}</button>
          <button class="btn primary" data-action="print">${esc(u.quickBar.print)}</button>
        </div>
      </div>
      <article class="cv">
        <header class="cv-head">
          <div class="avatar cv-avatar" aria-hidden="true">${avatarImg()}</div>
          <div>
          <h1 id="cv-title" tabindex="-1">${esc(D.name)}</h1>
          <p class="cv-role">${esc(l.role)}</p>
          <p class="cv-meta">
            <span>📍 ${esc(D.location)}</span>
            <a href="mailto:${esc(D.email)}">✉ ${esc(D.email)}</a>
            ${D.linkedin ? `<a href="${esc(D.linkedin)}" target="_blank" rel="noopener">in LinkedIn</a>` : ''}
            ${D.github ? `<a href="${esc(D.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
          </p>
          </div>
        </header>
        <div class="cv-grid">
          <div class="cv-main">
            <section><h2>${esc(u.sec.about)}</h2>${l.about.slice(1).map((p) => `<p>${esc(p)}</p>`).join('')}</section>
            <section><h2>${esc(u.sec.experience)}</h2>${l.experience.map(job).join('')}</section>
            <section><h2>${esc(u.sec.education)}</h2>${l.education.map(job).join('')}</section>
          </div>
          <aside class="cv-side">
            ${l.skills.map((g) => `<section><h2>${esc(g.title)}</h2>${chips(g.items)}</section>`).join('')}
            <section><h2>${esc(u.sec.soft)}</h2>${chips(l.soft)}</section>
            <section><h2>${esc(u.sec.languages)}</h2><ul class="plain">${l.languages.map(([a, b]) => `<li><b>${esc(a)}</b> · ${esc(b)}</li>`).join('')}</ul></section>
          </aside>
        </div>
      </article>`;
  }

  function openQuick() {
    toggleStart(false);
    quickEl.innerHTML = renderQuick();
    quickEl.hidden = false;
    quickEl.scrollTop = 0;
    document.body.classList.add('quick-open');
    if (location.hash !== '#cv') history.replaceState(null, '', '#cv');
    $('#cv-title', quickEl).focus({ preventScroll: true });
  }

  function closeQuick() {
    quickEl.hidden = true;
    document.body.classList.remove('quick-open');
    history.replaceState(null, '', location.pathname + location.search);
  }

  /* ---------- Arranque y apagado ---------- */

  function boot() {
    const el = $('#boot');
    if (session.get('zos-booted') || reducedMotion || location.hash === '#cv') {
      el.remove();
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const log = $('#boot-log', el);
      const b = U().boot;
      const lines = [
        ...b.head.map(esc),
        ...b.checks.map(([label, ok]) => `${esc(label.padEnd(34, '.'))} <span class="ok">${esc(ok)}</span>`),
        ...b.tail.map(esc),
      ];
      $('.boot-skip', el).textContent = U().bootSkip;
      let i = 0;
      let timer;
      let done = false;

      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window.removeEventListener('keydown', finish);
        session.set('zos-booted', '1');
        el.classList.add('boot-out');
        setTimeout(() => { el.remove(); resolve(); }, 350);
      };
      const step = () => {
        if (i < lines.length) {
          log.innerHTML += `${lines[i++]}\n`;
          timer = setTimeout(step, i === 1 ? 380 : 170);
        } else {
          timer = setTimeout(finish, 650);
        }
      };
      window.addEventListener('keydown', finish);
      el.addEventListener('pointerdown', finish);
      step();
    });
  }

  function shutdown() {
    toggleStart(false);
    const el = $('#shutdown');
    el.innerHTML = `<span>${esc(U().shutdownMsg)}</span><span class="blink">${esc(U().reboot)}</span>`;
    el.hidden = false;
    el.focus();
    el.addEventListener('click', () => {
      session.del('zos-booted');
      location.reload();
    }, { once: true });
  }

  /* ---------- Eventos globales ---------- */

  const actions = {
    quick: openQuick,
    'close-quick': closeQuick,
    lang: () => setLang(lang === 'es' ? 'en' : 'es'),
    print: () => window.print(),
    pets: () => { window.ZPets.toggle(); renderStart(); },
    shutdown,
    'close-welcome': () => closeWin('welcome'),
    'copy-email': (btn) => {
      const done = () => {
        btn.textContent = U().contact.copied;
        setTimeout(() => { btn.textContent = U().contact.copy; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(D.email).then(done, () => {});
    },
  };

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) openApp(opener.dataset.open);

    const act = e.target.closest('[data-action]');
    if (act && act.type !== 'checkbox' && actions[act.dataset.action]) actions[act.dataset.action](act);

    if (!startMenu.hidden && !e.target.closest('#start-menu, #start-btn')) toggleStart(false);
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-action="hide-welcome"]')) {
      if (e.target.checked) local.set('zos-hide-welcome', '1');
      else local.del('zos-hide-welcome');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!quickEl.hidden) closeQuick();
    else if (!startMenu.hidden) { toggleStart(false); startBtn.focus(); }
  });

  startBtn.addEventListener('click', () => toggleStart());
  $('#lang-btn').addEventListener('click', actions.lang);
  $('#quick-btn').addEventListener('click', openQuick);
  window.addEventListener('hashchange', () => {
    if (location.hash === '#cv') openQuick();
    else if (!quickEl.hidden) closeQuick();
  });
  window.addEventListener('resize', () => {
    if (isMobile()) wins.forEach((w) => w.el.classList.add('maximized'));
  });

  /* ---------- Inicio ---------- */

  document.documentElement.lang = lang;
  document.title = L().docTitle;
  paintStatic();
  renderIcons();
  renderStart();
  updateClock();
  setInterval(updateClock, 15000);

  // El avatar parpadea de vez en cuando
  if (!reducedMotion) {
    const blink = () => {
      const imgs = $$('.avatar-img');
      imgs.forEach((img) => { img.src = window.ZSprites.avatar(true).src; });
      setTimeout(() => imgs.forEach((img) => { img.src = window.ZSprites.avatar().src; }), 160);
      setTimeout(blink, 2500 + Math.random() * 3500);
    };
    setTimeout(blink, 3000);
  }

  if (location.hash === '#cv') openQuick();
  boot().then(() => {
    if (local.get('zos-hide-welcome') !== '1') openApp('welcome');
  });
})();
