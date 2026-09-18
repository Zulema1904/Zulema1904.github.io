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
              <div class="card-head">${I[p.icon] || (p.kind === 'live' ? I.terminal : I.folderLilac)}<h4>${esc(p.name)}</h4></div>
              <span class="badge ${p.kind}">${esc(p.tag)}</span>
              <p>${esc(p.desc)}</p>
              ${chips(p.stack)}
              ${p.open || p.repo ? `<div class="card-actions">
                ${p.open ? `<button class="btn primary" data-open="${esc(p.open)}">▶ ${esc(U().openApp)}</button>` : ''}
                ${p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">&lt;/&gt; ${esc(U().code)}</a>` : ''}
              </div>` : ''}
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

  /* ---------- Calendario ---------- */

  const pad2 = (n) => String(n).padStart(2, '0');
  const ymd = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const locale = () => (lang === 'es' ? 'es-ES' : 'en-GB');
  const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const longDate = (d) => d.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Domingo de Pascua (algoritmo anónimo gregoriano)
  function easter(y) {
    const a = y % 19; const b = Math.floor(y / 100); const c = y % 100;
    const d = Math.floor(b / 4); const e = b % 4; const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3); const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4); const k = c % 4; const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    return new Date(y, month - 1, ((h + l - 7 * m + 114) % 31) + 1);
  }

  const HOLIDAYS = [
    ['01-01', 'Año Nuevo', 'New Year\'s Day'],
    ['01-06', 'Reyes', 'Epiphany'],
    ['05-01', 'Día del Trabajo', 'Labour Day'],
    ['05-02', 'Fiesta de la Comunidad de Madrid', 'Madrid Region Day'],
    ['08-15', 'Asunción', 'Assumption Day'],
    ['10-12', 'Fiesta Nacional de España', 'National Day of Spain'],
    ['11-01', 'Todos los Santos', 'All Saints\' Day'],
    ['12-06', 'Día de la Constitución', 'Constitution Day'],
    ['12-08', 'Inmaculada Concepción', 'Immaculate Conception'],
    ['12-25', 'Navidad', 'Christmas Day'],
  ];

  // Todos los eventos de un año: { 'AAAA-MM-DD': [{ icon, text, holiday }] }
  const yearCache = new Map();
  function yearEvents(y) {
    const key = `${y}-${lang}`;
    if (yearCache.has(key)) return yearCache.get(key);
    const ev = {};
    const add = (date, icon, text, holiday = false) => { (ev[date] ||= []).push({ icon, text, holiday }); };

    HOLIDAYS.forEach(([md, es, en]) => add(`${y}-${md}`, '🎉', lang === 'es' ? es : en, true));
    const e = easter(y);
    const shift = (days) => ymd(new Date(e.getFullYear(), e.getMonth(), e.getDate() + days));
    add(shift(-3), '🎉', lang === 'es' ? 'Jueves Santo' : 'Maundy Thursday', true);
    add(shift(-2), '🎉', lang === 'es' ? 'Viernes Santo' : 'Good Friday', true);

    D.calendar.days.filter((d) => !d.year || d.year === y).forEach((d) => add(`${y}-${d.md}`, d.icon, d[lang]));
    // Día del Programador: el día 256 del año
    add(ymd(new Date(y, 0, 256)), '💻', lang === 'es' ? 'Día del Programador (día 256 del año)' : 'Programmers\' Day (day 256 of the year)');
    // Día de Ada Lovelace: segundo martes de octubre
    const oct1 = new Date(y, 9, 1);
    add(ymd(new Date(y, 9, 1 + ((9 - oct1.getDay()) % 7) + 7)), '👩‍💻', lang === 'es' ? 'Día de Ada Lovelace' : 'Ada Lovelace Day');

    yearCache.set(key, ev);
    return ev;
  }
  const eventsOn = (date) => yearEvents(Number(date.slice(0, 4)))[date] || [];

  const cal = {
    view: (() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); })(),
    selected: null,
  };

  const bookable = (date) => {
    const d = new Date(`${date}T12:00:00`);
    const wd = d.getDay();
    return date >= ymd(new Date()) && wd !== 0 && wd !== 6 && !eventsOn(date).some((e) => e.holiday);
  };

  R.calendar = () => {
    const c = U().cal;
    const y = cal.view.getFullYear();
    const m = cal.view.getMonth();
    const today = ymd(new Date());
    const offset = (new Date(y, m, 1).getDay() + 6) % 7; // semana empieza en lunes
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const weeks = Math.ceil((offset + daysInMonth) / 7);

    const heads = Array.from({ length: 7 }, (_, i) =>
      `<th scope="col">${esc(new Date(2024, 0, 1 + i).toLocaleDateString(locale(), { weekday: 'narrow' }))}</th>`).join('');

    let rows = '';
    for (let w = 0; w < weeks; w++) {
      rows += '<tr>';
      for (let i = 0; i < 7; i++) {
        const d = new Date(y, m, 1 - offset + w * 7 + i);
        const date = ymd(d);
        const evs = eventsOn(date);
        const cls = [
          d.getMonth() !== m && 'out',
          date === today && 'today',
          i >= 5 && 'weekend',
          evs.some((e) => e.holiday) && 'holiday',
          evs.some((e) => !e.holiday) && 'special',
          date === cal.selected && 'selected',
        ].filter(Boolean).join(' ');
        const label = [longDate(d), ...evs.map((e) => e.text)].join(' · ');
        rows += `<td><button class="cal-day ${cls}" data-action="cal-day" data-date="${date}" aria-label="${esc(label)}" title="${esc(evs.map((e) => `${e.icon} ${e.text}`).join('\n'))}" aria-pressed="${date === cal.selected}">${d.getDate()}${evs.length ? `<span class="cal-dot">${evs[0].icon}</span>` : ''}</button></td>`;
      }
      rows += '</tr>';
    }

    const monthEvents = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${y}-${pad2(m + 1)}-${pad2(day)}`;
      eventsOn(date).forEach((e) => monthEvents.push(`<li class="${e.holiday ? 'is-holiday' : ''}"><b>${day}</b> ${e.icon} ${esc(e.text)}</li>`));
    }

    const viewYm = `${y}-${pad2(m + 1)}`;
    const story = D.calendar.milestones.map((s) => {
      const [sy, sm] = s.ym.split('-').map(Number);
      const when = capital(new Date(sy, sm - 1, 1).toLocaleDateString(locale(), { month: 'short', year: 'numeric' }));
      return `<li class="${s.ym === viewYm ? 'current' : ''}"><button class="link" data-action="cal-goto" data-ym="${s.ym}">${esc(when)}</button> ${s.icon} ${esc(s[lang])}</li>`;
    }).join('');

    let booking = `<p class="muted">${esc(c.bookHint)}</p>`;
    if (cal.selected) {
      const nice = longDate(new Date(`${cal.selected}T12:00:00`));
      const href = `mailto:${D.email}?subject=${encodeURIComponent(c.subject(nice))}&body=${encodeURIComponent(c.body(nice))}`;
      const evs = eventsOn(cal.selected);
      booking = `${evs.length ? `<ul class="cal-sel-events">${evs.map((e) => `<li>${e.icon} ${esc(e.text)}</li>`).join('')}</ul>` : ''}
        ${bookable(cal.selected)
          ? `<a class="btn primary" href="${esc(href)}">✉ ${esc(c.bookBtn(nice))}</a>`
          : `<p class="muted">${esc(c.bookInvalid)}</p>`}`;
    }

    return `<div class="cal">
      <div class="cal-main">
        <div class="cal-head">
          <button class="btn" data-action="cal-move" data-step="-1" aria-label="${esc(c.prev)}">◀</button>
          <h3 aria-live="polite">${esc(capital(cal.view.toLocaleDateString(locale(), { month: 'long', year: 'numeric' })))}</h3>
          <button class="btn" data-action="cal-move" data-step="1" aria-label="${esc(c.next)}">▶</button>
          <button class="btn" data-action="cal-move" data-step="0">${esc(c.today)}</button>
        </div>
        <table class="cal-grid"><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
        <fieldset class="group cal-book"><legend>${esc(c.book)}</legend>${booking}</fieldset>
      </div>
      <div class="cal-side">
        <h4>${esc(c.thisMonth)}</h4>
        ${monthEvents.length ? `<ul class="cal-list">${monthEvents.join('')}</ul>` : `<p class="muted">${esc(c.nothing)}</p>`}
        <h4>${esc(c.history)}</h4>
        <ul class="cal-list cal-story">${story}</ul>
      </div>
    </div>`;
  };

  R.games = () => `${addrBar(U().paths.games)}
    <div class="launcher">${['sudoku', 'wordsearch', 'tetris'].map((id) =>
      `<button class="launch" data-open="${id}">${I[APPS[id].icon]}<span>${breakable(U().apps[id])}</span></button>`).join('')}
    </div>`;

  function repaintCalendar() {
    const w = wins.get('calendar');
    if (w) paintWin(w);
  }

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
    monitor: {
      icon: 'monitor', w: 1000, h: 680, bodyClass: 'frame',
      mount: (body) => { body.innerHTML = `<iframe class="app-frame" src="${monitorSrc()}" title="ZulemaOS Monitor" allow="local-network-access; loopback-network"></iframe>`; },
    },
    calendar: { icon: 'calendar', w: 700, h: 560, render: R.calendar },
    games: { icon: 'folderGames', w: 460, h: 280, render: R.games },
    sudoku: { icon: 'sudoku', w: 440, h: 560, mount: (body, ctx) => window.ZApps.sudoku.mount(body, ctx) },
    wordsearch: { icon: 'wordsearch', w: 720, h: 650, mount: (body, ctx) => window.ZApps.wordsearch.mount(body, ctx) },
    tetris: { icon: 'tetris', w: 470, h: 640, mount: (body, ctx) => window.ZApps.tetris.mount(body, ctx) },
    notes: { icon: 'notes', w: 560, h: 460, mount: (body, ctx) => window.ZApps.notes.mount(body, ctx) },
  };
  const DESKTOP_ICONS = ['about', 'experience', 'projects', 'skills', 'terminal', 'monitor', 'calendar', 'games', 'notes', 'contact', 'cv', 'trash'];
  const appCtx = { lang: () => lang, store: local };
  const monitorSrc = () => `monitor/?embed&lang=${lang}`;

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
    if (app.mount) w.instance = app.mount(w.body, appCtx);
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
    else if (w.instance && w.instance.setLang) w.instance.setLang();
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
    applyLayout();
  }

  /* ---------- Iconos que se pueden mover ---------- */

  // Colocación libre guardada por visitante: { id: { x, y } } en píxeles dentro del escritorio.
  // Hay una para ordenador y otra para móvil, porque la rejilla cambia mucho.
  const GRID = { x: 10, y: 12, w: 112, h: 98 };
  const layoutKey = () => `zos-icons-${isMobile() ? 'mobile' : 'desktop'}`;
  const loadLayout = () => { try { return JSON.parse(local.get(layoutKey())); } catch { return null; } };
  const iconEls = () => $$('.d-icon', iconsNav);
  const area = () => iconsNav.parentElement.getBoundingClientRect();

  function setIconPos(el, x, y) {
    const a = area();
    el.style.left = `${clamp(x, 0, a.width - el.offsetWidth)}px`;
    el.style.top = `${clamp(y, 0, a.height - el.offsetHeight)}px`;
  }

  // Casilla libre más cercana al principio de la rejilla (para iconos nuevos)
  function freeCell(taken) {
    const rows = Math.max(1, Math.floor((area().height - GRID.y) / GRID.h));
    for (let i = 0; ; i++) {
      const x = GRID.x + Math.floor(i / rows) * GRID.w;
      const y = GRID.y + (i % rows) * GRID.h;
      if (!taken.some((p) => p.x === x && p.y === y)) return { x, y };
    }
  }

  function applyLayout() {
    const layout = loadLayout();
    iconsNav.classList.toggle('free', !!layout);
    if (!layout) {
      iconEls().forEach((el) => { el.style.left = ''; el.style.top = ''; });
      return;
    }
    const taken = Object.values(layout);
    iconEls().forEach((el) => {
      const p = layout[el.dataset.open] || freeCell(taken);
      taken.push(p);
      setIconPos(el, p.x, p.y);
    });
  }

  function saveLayout() {
    const layout = {};
    iconEls().forEach((el) => { layout[el.dataset.open] = { x: parseFloat(el.style.left), y: parseFloat(el.style.top) }; });
    local.set(layoutKey(), JSON.stringify(layout));
  }

  // La primera vez que se arrastra, se "congela" la rejilla actual en posiciones libres
  function freeze() {
    if (iconsNav.classList.contains('free')) return;
    const a = area();
    const pos = iconEls().map((el) => { const r = el.getBoundingClientRect(); return [el, r.left - a.left, r.top - a.top]; });
    iconsNav.classList.add('free');
    pos.forEach(([el, x, y]) => setIconPos(el, x, y));
  }

  const snap = (v, origin, step, max) => clamp(origin + Math.round((v - origin) / step) * step, origin, Math.max(origin, origin + Math.floor((max - origin) / step) * step));

  function drop(el, from) {
    const a = area();
    const x = snap(parseFloat(el.style.left), GRID.x, GRID.w, a.width - el.offsetWidth);
    const y = snap(parseFloat(el.style.top), GRID.y, GRID.h, a.height - el.offsetHeight);
    // Si ya hay un icono en esa casilla, se intercambian
    const other = iconEls().find((o) => o !== el && Math.abs(parseFloat(o.style.left) - x) < GRID.w / 2 && Math.abs(parseFloat(o.style.top) - y) < GRID.h / 2);
    if (other) setIconPos(other, from.x, from.y);
    setIconPos(el, x, y);
    saveLayout();
  }

  let suppressClick = false;
  iconsNav.addEventListener('pointerdown', (e) => {
    const el = e.target.closest('.d-icon');
    if (!el || e.button !== 0) return;
    const sx = e.clientX;
    const sy = e.clientY;
    const threshold = e.pointerType === 'touch' ? 10 : 5;
    let origin = null;

    const move = (ev) => {
      if (!origin) {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < threshold) return;
        freeze();
        origin = { x: parseFloat(el.style.left), y: parseFloat(el.style.top) };
        el.classList.add('dragging');
      }
      el.style.left = `${origin.x + ev.clientX - sx}px`;
      el.style.top = `${origin.y + ev.clientY - sy}px`;
    };
    const end = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      if (!origin) return;
      el.classList.remove('dragging');
      drop(el, origin);
      // El "click" que llega justo después de soltar no debe abrir la app
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
  });
  iconsNav.addEventListener('click', (e) => {
    if (suppressClick) { e.stopPropagation(); e.preventDefault(); }
  }, true);

  function resetIcons() {
    local.del(layoutKey());
    applyLayout();
  }

  function renderStart() {
    const u = U();
    const item = (attr, icon, label) =>
      `<li><button class="start-item" ${attr} role="menuitem">${icon}<span>${esc(label)}</span></button></li>`;
    startMenu.innerHTML = `
      <div class="start-banner" aria-hidden="true"><span>Zulema<b>OS</b></span></div>
      <ul class="start-list" role="menu">
        ${['about', 'experience', 'projects', 'skills', 'terminal', 'monitor', 'calendar', 'games', 'notes', 'contact']
          .map((id) => item(`data-open="${id}"`, I[APPS[id].icon], u.apps[id])).join('')}
        <li class="start-sep" role="separator"></li>
        ${item('data-action="feed"', I.bowl, u.pets.feed)}
        ${item('data-action="arrange-icons"', I.folderLilac, u.arrange)}
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
    $('#clock-btn').setAttribute('aria-label', U().cal.clock);
    $('#clock-btn').title = U().cal.clock;
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
    const monitorFrame = wins.get('monitor') && $('iframe', wins.get('monitor').body);
    if (monitorFrame) monitorFrame.src = monitorSrc();
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
    feed: () => { toggleStart(false); window.ZPets.feed(); renderStart(); },
    'arrange-icons': () => { toggleStart(false); resetIcons(); },
    'cal-move': (btn) => {
      const step = Number(btn.dataset.step);
      const now = new Date();
      cal.view = step ? new Date(cal.view.getFullYear(), cal.view.getMonth() + step, 1) : new Date(now.getFullYear(), now.getMonth(), 1);
      repaintCalendar();
    },
    'cal-goto': (btn) => {
      const [y, m] = btn.dataset.ym.split('-').map(Number);
      cal.view = new Date(y, m - 1, 1);
      repaintCalendar();
    },
    'cal-day': (btn) => {
      const date = btn.dataset.date;
      cal.selected = cal.selected === date ? null : date;
      const d = new Date(`${date}T12:00:00`);
      if (d.getMonth() !== cal.view.getMonth()) cal.view = new Date(d.getFullYear(), d.getMonth(), 1);
      repaintCalendar();
      $(`.cal-day[data-date="${date}"]`)?.focus({ preventScroll: true });
    },
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
  $('#clock-btn').addEventListener('click', () => openApp('calendar'));

  // Los clics dentro de un <iframe> no llegan a esta página: cuando el foco
  // se va a uno, se trae su ventana al frente.
  window.addEventListener('blur', () => {
    setTimeout(() => {
      const frame = document.activeElement;
      if (frame && frame.tagName === 'IFRAME') {
        const win = frame.closest('.window');
        if (win) focusWin(win.dataset.app);
      }
    });
  });
  $('#lang-btn').addEventListener('click', actions.lang);
  $('#quick-btn').addEventListener('click', openQuick);
  window.addEventListener('hashchange', () => {
    if (location.hash === '#cv') openQuick();
    else if (!quickEl.hidden) closeQuick();
  });
  window.addEventListener('resize', () => {
    if (isMobile()) wins.forEach((w) => w.el.classList.add('maximized'));
    applyLayout();
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
