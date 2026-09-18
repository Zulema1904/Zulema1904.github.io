/*
 * Apuntes · libreta con pestañas por tema (contenido en notes-data.js)
 * Incluye un coloreado de sintaxis mínimo para Python y Java.
 */
(() => {
  'use strict';

  const T = {
    es: { copy: 'Copiar', copied: '¡Copiado!', tip: 'Truco', warn: '¡Ojo!', says: 'dice' },
    en: { copy: 'Copy', copied: 'Copied!', tip: 'Tip', warn: 'Watch out!', says: 'says' },
  };
  const CATS = { thor: ['black', 'Thor ⚡'], hela: ['tabby', 'Hela 👑'] };
  const KEYWORDS = {
    python: 'def return if elif else for while in import from as class True False None and or not pass break continue try except with lambda',
    java: 'public private protected class extends implements interface abstract static final void int double boolean char long new return if else for while this super null true false try catch',
    sql: 'SELECT FROM WHERE INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE PRIMARY KEY FOREIGN REFERENCES INT VARCHAR DECIMAL DATE ORDER BY DESC ASC JOIN ON GROUP HAVING AS AND OR NOT NULL LIKE IN BETWEEN LIMIT',
    bash: 'git init status add commit log switch merge clone pull push diff restore config remote revert sqlite3 python javac java php pip docker run build pull images ps stop rm rmi logs exec compose up down system prune',
    docker: 'FROM WORKDIR COPY RUN ENV EXPOSE CMD ENTRYPOINT ARG',
    yaml: 'services build image ports volumes environment depends_on',
    js: 'const let var function return if else for while of in new class this null undefined true false async await try catch typeof document console',
    php: 'echo function return if else elseif foreach for while as new class public private require include isset empty null true false try catch string int float bool array',
    html: 'DOCTYPE html head body meta title link h1 h2 p strong img a header nav main article section footer div span',
    css: 'color background border padding margin display gap justify content align items flex direction media max width box sizing font size solid white black center column',
  };
  const COMMENTS = {
    python: '#[^\\n]*|"""[\\s\\S]*?"""', java: '//[^\\n]*', sql: '--[^\\n]*', bash: '#[^\\n]*', docker: '#[^\\n]*', yaml: '#[^\\n]*',
    html: '<!--[\\s\\S]*?-->', css: '/\\*[\\s\\S]*?\\*/',
    js: '//[^\\n]*|/\\*[\\s\\S]*?\\*/', php: '//[^\\n]*|/\\*[\\s\\S]*?\\*/',
  };
  // Textos entre comillas dobles, simples o invertidas (plantillas de JavaScript)
  const STRINGS = '"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  // `código` → <code>, **texto** → subrayado de rotulador
  const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<mark>$1</mark>');

  function highlight(code, lang) {
    const kw = new Set(KEYWORDS[lang].split(' '));
    // Grupos: comentario | texto | anotación, color hex o variable $php | número | palabra
    const re = new RegExp(`(${COMMENTS[lang]})|(${STRINGS})|(@\\w+|#[0-9a-fA-F]{3,8}\\b|\\$\\w+)|\\b(\\d+(?:\\.\\d+)?)\\b|\\b([A-Za-z_]\\w*)\\b`, 'g');
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      last = m.index + m[0].length;
      const [whole, cm, str, ann, num, word] = m;
      let cls = '';
      if (cm) cls = 'cm';
      else if (str) cls = 'st';
      else if (ann) cls = 'an';
      else if (num) cls = 'nu';
      else if (word && kw.has(word)) cls = 'kw';
      else if (word && code[last] === '(') cls = 'fn';
      else if (word && code[last] === '=') cls = 'an'; // atributos HTML: href=, src=…
      else if (word && lang === 'java' && /^[A-Z]/.test(word)) cls = 'ty';
      out += cls ? `<span class="hl-${cls}">${esc(whole)}</span>` : esc(whole);
    }
    return out + esc(code.slice(last));
  }

  window.ZApps = window.ZApps || {};
  window.ZApps.notebook = {
    mount(body, ctx) {
      const topics = window.ZNotesData;
      const t = () => T[ctx.lang()];
      let current = ctx.store.get('zos-notebook-tab') || topics[0].id;

      body.classList.add('nb-body');
      body.innerHTML = '<nav class="nb-tabs" role="tablist"></nav><article class="nb-page" tabindex="0"></article>';
      const tabs = body.querySelector('.nb-tabs');
      const page = body.querySelector('.nb-page');

      function render() {
        const L = ctx.lang();
        const topic = topics.find((x) => x.id === current) || topics[0];
        window.ZAch?.track('topics', topic.id, topics.length, 'notebook');
        tabs.innerHTML = topics.map((x) =>
          `<button class="nb-tab ${x.id === topic.id ? 'active' : ''}" role="tab" aria-selected="${x.id === topic.id}" data-topic="${x.id}" style="--tab:${x.color}">${x.icon} ${esc(x.title[L])}</button>`).join('');

        page.style.setProperty('--tab', topic.color);
        const num = (i) => String(i + 1).padStart(2, '0');
        const index = `<ol class="nb-index">${topic.sections.map((s, i) =>
          `<li><button data-goto="${i}"><b>${num(i)}</b> ${inline(s.h[L])}</button></li>`).join('')}</ol>`;
        page.innerHTML = `<h2 class="nb-title"><span>${topic.icon}</span> ${esc(topic.title[L])}</h2>${index}` + topic.sections.map((s, i) => {
          let html = `<section class="nb-sec" data-sec="${i}"><h3><span class="nb-num">${num(i)}</span>${inline(s.h[L])}</h3>`;
          if (s.p) html += `<p>${inline(s.p[L])}</p>`;
          if (s.table) {
            const [head, ...rows] = s.table[L];
            html += `<table class="nb-table"><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>
              <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
          }
          if (s.code) {
            const code = typeof s.code === 'string' ? s.code : s.code[L];
            const lang = s.lang || topic.lang;
            html += `<div class="nb-code"><div class="nb-code-bar"><span>${lang}</span><button class="nb-copy">${esc(t().copy)}</button></div>
              <pre><code>${highlight(code, lang)}</code></pre></div>`;
          }
          if (s.tip) html += `<p class="nb-note nb-tip"><b>💡 ${esc(t().tip)}:</b> ${inline(s.tip[L])}</p>`;
          if (s.warn) html += `<p class="nb-note nb-warn"><b>⚠️ ${esc(t().warn)}</b> ${inline(s.warn[L])}</p>`;
          if (s.cat) {
            const [sprite, name] = CATS[s.cat.who];
            html += `<aside class="nb-cat nb-cat-${s.cat.who}"><img src="${window.ZSprites.cat(sprite, 'sit').src}" alt="">
              <p><b>${esc(name)} ${esc(t().says)}:</b> ${inline(s.cat[L])}</p></aside>`;
          }
          return `${html}</section>`;
        }).join('');
        page.scrollTop = 0;
      }

      tabs.addEventListener('click', (e) => {
        const b = e.target.closest('[data-topic]');
        if (!b) return;
        current = b.dataset.topic;
        ctx.store.set('zos-notebook-tab', current);
        render();
      });
      page.addEventListener('click', (e) => {
        const go = e.target.closest('[data-goto]');
        if (go) {
          const sec = page.querySelector(`[data-sec="${go.dataset.goto}"]`);
          page.scrollTo({ top: sec.offsetTop - 12, behavior: 'smooth' });
          return;
        }
        const b = e.target.closest('.nb-copy');
        if (!b || !navigator.clipboard) return;
        navigator.clipboard.writeText(b.closest('.nb-code').querySelector('code').textContent).then(() => {
          b.textContent = t().copied;
          setTimeout(() => { b.textContent = t().copy; }, 1400);
        }, () => {});
      });

      render();
      return {
        setLang: render,
        goto(id) { if (topics.some((x) => x.id === id)) { current = id; ctx.store.set('zos-notebook-tab', id); render(); } },
      };
    },
  };
})();
