/*
 * Logros de ZulemaOS.
 * Se guardan solo en el navegador de cada visitante (localStorage).
 * Desde cualquier parte: ZAch.unlock(id), ZAch.count(nombre, meta, id) o ZAch.track(conjunto, valor, meta, id).
 */
(() => {
  'use strict';

  const KEY = 'zos-ach';
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');

  // [id, icono, secreto, { es: [título, descripción], en: [...] }]
  const LIST = [
    ['feed', '🐟', false, { es: ['Servicio de catering', 'Da de comer a Thor y Hela'], en: ['Catering service', 'Feed Thor and Hela'] }],
    ['feed5', '🍽️', false, { es: ['Chef felino', 'Sirve 5 comidas'], en: ['Feline chef', 'Serve 5 meals'] }],
    ['pet', '💜', false, { es: ['Mimos', 'Haz clic en uno de los gatos'], en: ['Cuddles', 'Click one of the cats'] }],
    ['cv', '📄', false, { es: ['Modo profesional', 'Abre el CV en modo rápido'], en: ['Professional mode', 'Open the CV in quick view'] }],
    ['explorer', '🗺️', false, { es: ['Exploración total', 'Abre 10 aplicaciones distintas'], en: ['Full explorer', 'Open 10 different apps'] }],
    ['notebook', '📚', false, { es: ['Sed de saber', 'Visita todos los temas de Apuntes'], en: ['Thirst for knowledge', 'Visit every study notes topic'] }],
    ['terminal', '⌨️', false, { es: ['Alma de sysadmin', 'Ejecuta 15 comandos en la terminal'], en: ['Sysadmin soul', 'Run 15 commands in the terminal'] }],
    ['fortune', '🐱', false, { es: ['Sabiduría gatuna', 'Prueba fortune | catsay en la terminal'], en: ['Feline wisdom', 'Try fortune | catsay in the terminal'] }],
    ['subnet', '🌐', false, { es: ['Subnetting', 'Calcula una subred en Subredes.exe'], en: ['Subnetting', 'Calculate a subnet in Subnets.exe'] }],
    ['binary', '💡', false, { es: ['Todo encendido', 'Enciende todos los bits en Binario.exe'], en: ['All lights on', 'Switch on every bit in Binary.exe'] }],
    ['sudoku', '🔢', false, { es: ['Mente numérica', 'Resuelve un sudoku'], en: ['Number cruncher', 'Solve a sudoku'] }],
    ['sudoku_hard', '🧠', false, { es: ['Nivel experto', 'Resuelve un sudoku difícil'], en: ['Expert level', 'Solve a hard sudoku'] }],
    ['wordsearch', '🔤', false, { es: ['Ojo de lince', 'Completa una sopa de letras'], en: ['Eagle eye', 'Complete a word search'] }],
    ['tetris', '🧱', false, { es: ['¡TETRIS!', 'Haz 4 líneas de golpe'], en: ['TETRIS!', 'Clear 4 lines at once'] }],
    ['tetris1000', '🏆', false, { es: ['Mil puntos', 'Llega a 1.000 puntos en Tetris'], en: ['A thousand points', 'Reach 1,000 points in Tetris'] }],
    ['screensaver', '🌌', false, { es: ['¿Sigues ahí?', 'Deja que salte el salvapantallas'], en: ['Still there?', 'Let the screensaver kick in'] }],
    ['night', '🦉', false, { es: ['Búho nocturno', 'Visita ZulemaOS entre las 00:00 y las 05:00'], en: ['Night owl', 'Visit ZulemaOS between midnight and 5 am'] }],
    ['vim', '🚪', true, { es: ['Escapaste de vim', 'Abre vim en la terminal… y sal con vida'], en: ['You escaped vim', 'Open vim in the terminal… and get out alive'] }],
    ['sudo', '🚨', true, { es: ['Permiso denegado', 'Intenta usar sudo'], en: ['Permission denied', 'Try using sudo'] }],
    ['konami', '🎮', true, { es: ['Código secreto', 'Introduce el código Konami'], en: ['Secret code', 'Enter the Konami code'] }],
    ['all', '🌟', false, { es: ['100 % ZulemaOS', 'Desbloquea todos los logros'], en: ['100 % ZulemaOS', 'Unlock every achievement'] }],
  ];

  const UI = {
    es: {
      toast: '¡Logro desbloqueado!', title: 'Logros', progress: (n, t) => `${n} de ${t} desbloqueados`,
      secret: 'Logro secreto: sigue explorando…', local: 'Se guardan solo en este navegador.',
      reset: 'Reiniciar', sure: '¿Seguro? Pulsa otra vez',
    },
    en: {
      toast: 'Achievement unlocked!', title: 'Achievements', progress: (n, t) => `${n} of ${t} unlocked`,
      secret: 'Secret achievement: keep exploring…', local: 'Only saved in this browser.',
      reset: 'Reset', sure: 'Sure? Click again',
    },
  };

  const read = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) || fallback; } catch { return fallback; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } };

  let done = read(KEY, {});
  const queue = [];
  let showing = false;

  function toast(entry) {
    queue.push(entry);
    if (showing) return;
    const next = () => {
      const item = queue.shift();
      if (!item) { showing = false; return; }
      showing = true;
      const [, icon, , text] = item;
      const el = document.createElement('div');
      el.className = 'ach-toast';
      el.setAttribute('role', 'status');
      el.innerHTML = `<span class="ach-toast-icon">${icon}</span><div><small>🏆 ${UI[lang()].toast}</small><b></b></div>`;
      el.querySelector('b').textContent = text[lang()][0];
      document.body.append(el);
      setTimeout(() => el.classList.add('out'), 3600);
      setTimeout(() => { el.remove(); next(); }, 4000);
    };
    next();
  }

  function unlock(id) {
    if (done[id]) return;
    const entry = LIST.find((a) => a[0] === id);
    if (!entry) return;
    done[id] = Date.now();
    write(KEY, done);
    toast(entry);
    window.dispatchEvent(new CustomEvent('zos-achievement', { detail: id }));
    if (id !== 'all' && LIST.every(([aid]) => aid === 'all' || done[aid])) {
      setTimeout(() => { unlock('all'); window.ZExtras?.party(); }, 1200);
    }
  }

  window.ZAch = {
    unlock,
    // Contador: al llegar a "goal" se desbloquea el logro
    count(name, goal, id) {
      const counters = read(`${KEY}-counters`, {});
      counters[name] = (counters[name] || 0) + 1;
      write(`${KEY}-counters`, counters);
      if (counters[name] >= goal) unlock(id);
    },
    // Conjunto de valores distintos (apps abiertas, temas visitados…)
    track(name, value, goal, id) {
      const sets = read(`${KEY}-sets`, {});
      const set = new Set(sets[name] || []);
      set.add(value);
      sets[name] = [...set];
      write(`${KEY}-sets`, sets);
      if (set.size >= goal) unlock(id);
    },
    list: () => LIST.map(([id, icon, secret, text]) => ({
      id, icon, secret, title: text[lang()][0], desc: text[lang()][1], at: done[id] || 0,
    })),
    progress: () => [LIST.filter(([id]) => done[id]).length, LIST.length],
    ui: () => UI[lang()],
    reset() {
      done = {};
      ['', '-counters', '-sets'].forEach((s) => { try { localStorage.removeItem(KEY + s); } catch { /* nada */ } });
      window.dispatchEvent(new CustomEvent('zos-achievement'));
    },
  };

  // Búho nocturno
  const hour = new Date().getHours();
  if (hour < 5) setTimeout(() => unlock('night'), 4000);
})();
