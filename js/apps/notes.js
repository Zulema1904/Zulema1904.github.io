/*
 * Notas.txt · bloc de notas
 * Se guarda solo en el navegador de quien lo usa (localStorage), nunca en un servidor.
 */
(() => {
  'use strict';

  const KEY = 'zos-notes';
  const T = {
    es: {
      new: 'Nuevo', sure: '¿Seguro? Pulsa otra vez', download: 'Descargar .txt', copy: 'Copiar', copied: '¡Copiado!',
      placeholder: 'Escribe aquí lo que quieras… Se guarda solo en tu navegador 💜',
      saved: 'Guardado en este navegador', saving: 'Guardando…',
      count: (w, c) => `${w} ${w === 1 ? 'palabra' : 'palabras'} · ${c} caracteres`,
      file: 'notas.txt',
    },
    en: {
      new: 'New', sure: 'Sure? Click again', download: 'Download .txt', copy: 'Copy', copied: 'Copied!',
      placeholder: 'Write anything here… It\'s only saved in your browser 💜',
      saved: 'Saved in this browser', saving: 'Saving…',
      count: (w, c) => `${w} ${w === 1 ? 'word' : 'words'} · ${c} characters`,
      file: 'notes.txt',
    },
  };

  window.ZApps = window.ZApps || {};
  window.ZApps.notes = {
    mount(body, ctx) {
      const t = () => T[ctx.lang()];
      body.classList.add('notes-body');
      body.innerHTML = `
        <div class="notes-bar">
          <button class="btn n-new"></button>
          <button class="btn n-download"></button>
          <button class="btn n-copy"></button>
        </div>
        <textarea class="notes-text" spellcheck="true"></textarea>
        <div class="notes-status"><span class="n-saved"></span><span class="n-count"></span></div>`;

      const $ = (s) => body.querySelector(s);
      const text = $('.notes-text');
      let saveTimer = 0;
      let confirmNew = false;

      text.value = ctx.store.get(KEY) || '';

      function status(saving = false) {
        const v = text.value;
        const words = v.trim() ? v.trim().split(/\s+/).length : 0;
        $('.n-saved').textContent = saving ? t().saving : t().saved;
        $('.n-count').textContent = t().count(words, v.length);
      }

      function labels() {
        $('.n-new').textContent = confirmNew ? t().sure : t().new;
        $('.n-download').textContent = t().download;
        $('.n-copy').textContent = t().copy;
        text.placeholder = t().placeholder;
        text.setAttribute('aria-label', t().placeholder);
        status();
      }

      text.addEventListener('input', () => {
        status(true);
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => { ctx.store.set(KEY, text.value); status(); }, 400);
      });

      $('.n-new').addEventListener('click', () => {
        if (text.value && !confirmNew) {
          confirmNew = true;
          labels();
          setTimeout(() => { confirmNew = false; labels(); }, 2500);
          return;
        }
        confirmNew = false;
        text.value = '';
        ctx.store.set(KEY, '');
        labels();
        text.focus();
      });

      $('.n-download').addEventListener('click', () => {
        const url = URL.createObjectURL(new Blob([text.value], { type: 'text/plain;charset=utf-8' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = t().file;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });

      $('.n-copy').addEventListener('click', (e) => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(text.value).then(() => {
          e.target.textContent = t().copied;
          setTimeout(labels, 1400);
        }, () => {});
      });

      labels();
      setTimeout(() => text.focus({ preventScroll: true }), 50);
      return { setLang: labels };
    },
  };
})();
