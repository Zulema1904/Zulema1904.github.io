/*
 * Terminal de ZulemaOS.
 * ZTerminal(contenedor, ctx) monta una consola interactiva.
 * ctx: { lang(), setLang(l), openApp(id), close() }
 */
(() => {
  'use strict';

  const D = window.PORTFOLIO;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const k = (s) => `<span class="c-acc">${esc(s)}</span>`;
  const dim = (s) => `<span class="c-dim">${esc(s)}</span>`;
  const PROMPT = '<span class="c-ok">zulema@zulemaos</span>:<span class="c-acc">~</span>$';

  // Archivos "visibles" con ls / open / cat
  const FILES = {
    es: { 'sobre_mi.txt': 'about', 'experiencia/': 'experience', 'proyectos/': 'projects', 'habilidades.exe': 'skills', 'monitor.exe': 'monitor', 'calendario.exe': 'calendar', 'juegos/': 'games', 'notas.txt': 'notes', 'binario.exe': 'binary', 'contacto.exe': 'contact', 'cv.pdf': 'cv', 'papelera/': 'trash' },
    en: { 'about_me.txt': 'about', 'experience/': 'experience', 'projects/': 'projects', 'skills.exe': 'skills', 'monitor.exe': 'monitor', 'calendar.exe': 'calendar', 'games/': 'games', 'notes.txt': 'notes', 'binary.exe': 'binary', 'contact.exe': 'contact', 'cv.pdf': 'cv', 'trash/': 'trash' },
  };
  const APP_IDS = ['about', 'experience', 'projects', 'skills', 'monitor', 'calendar', 'games', 'sudoku', 'wordsearch', 'tetris', 'notes', 'binary', 'contact', 'cv', 'trash', 'welcome', 'terminal'];

  const STR = {
    es: {
      motd: `ZulemaOS 1.0 (tty1)\nEscribe ${k('help')} para ver los comandos. ${dim('Tab autocompleta, ↑ ↓ recorren el historial.')}`,
      help: [
        ['help', 'Muestra esta ayuda'],
        ['whoami', '¿Quién es Zulema?'],
        ['about', 'Sobre mí'],
        ['experience', 'Experiencia laboral'],
        ['education', 'Formación'],
        ['skills', 'Habilidades técnicas'],
        ['projects', 'Proyectos'],
        ['contact', 'Cómo contactarme'],
        ['cv', 'Abre el CV en modo rápido'],
        ['open <app>', 'Abre una ventana (about, projects, skills…)'],
        ['top', 'Abre el monitor del sistema 🖥️'],
        ['cal', 'Calendario del mes'],
        ['man <tema>', 'Apuntes: html, js, php, sql, python, java, git, docker 📚'],
        ['juegos', 'Sudoku, sopa de letras y Tetris 🎮'],
        ['notas', 'Bloc de notas'],
        ['feed', 'Dar de comer a Thor y Hela 🐟'],
        ['fortune', 'Una frase de programadores (prueba: fortune | catsay)'],
        ['catsay <txt>', 'Un gato ASCII dice lo que quieras'],
        ['bin <número>', 'Convierte a binario, hexadecimal y octal'],
        ['ipcalc', 'Calculadora de subredes IP 🌐'],
        ['logros', 'Tus logros en ZulemaOS 🏆'],
        ['screensaver', 'Activa el salvapantallas'],
        ['ls', 'Lista los archivos'],
        ['neofetch', 'Información del sistema'],
        ['ping zulema', '¿Estoy disponible?'],
        ['cats', 'Mis gatos 🐾 (prueba también meow)'],
        ['lang es|en', 'Cambia el idioma'],
        ['clear', 'Limpia la pantalla'],
        ['exit', 'Cierra la terminal'],
      ],
      secret: 'Hay algunos comandos ocultos… 👀',
      notFound: (c) => `<span class="c-err">${esc(c)}: comando no encontrado.</span> Escribe ${k('help')}.`,
      opening: (n) => `Abriendo ${esc(n)}…`,
      openUsage: `Uso: ${k('open <app>')}  →  about, experience, projects, skills, contact, cv, trash`,
      noSuchFile: (n) => `<span class="c-err">No existe «${esc(n)}».</span> Prueba ${k('ls')}.`,
      catBinary: (n) => `${esc(n)} no es un archivo de texto. Prueba ${k('open ' + n)}.`,
      cd: `Aquí no hace falta ${k('cd')}: usa ${k('open proyectos')} o ${k('ls')} 😉`,
      sudo: '<span class="c-err">zulema no está en el archivo sudoers.</span> Este incidente será reportado. 🚨 (es broma)',
      rm: '<span class="c-err">Permiso denegado.</span> Buen intento 😏',
      hello: '¡Hola! 👋 Gracias por pasarte por mi portfolio.',
      langOk: 'Idioma cambiado a español.',
      langUsage: `Uso: ${k('lang es')} o ${k('lang en')}`,
      pingOk: `✔ Zulema está disponible. Escribe ${k('contact')} para hablar.`,
      stats: 'estadísticas',
      nf: {
        host: 'Host', kernel: 'Kernel', uptime: 'Uptime', shell: 'Shell', langs: 'Lenguajes', ai: 'IA', theme: 'Tema', status: 'Estado',
        uptimeV: 'aprendiendo desde 2021', themeV: 'Lilac Retro',
      },
      contactLine: 'Escríbeme:',
      eduTitle: 'Formación',
      expTitle: 'Experiencia',
      pending: '(pendiente de completar)',
      ifconfig: 'Hogar, dulce hogar.',
      cats: 'Mis compis de teletrabajo:',
      catsHint: `Escribe ${k('meow')} para llamarlos o ${k('cats off')} para esconderlos.`,
      catsOff: 'Los gatos se han ido a dormir a otra habitación. 🌙',
      catsOn: '¡Han vuelto los gatos! 🐾',
      calHint: 'Versión con festivos y citas: open calendario',
      vim: 'Para salir de vim escribe :q!… Tranqui, que abro el bloc de notas 😅',
      catsayDefault: '¡Miau! Escribe: catsay tu mensaje',
      binBad: 'Uso: bin 42 · bin 0b1010 · bin 0xFF (enteros de 0 a 4294967295)',
      konami: '↑ ↑ ↓ ↓ ← → ← → B A … pruébalo fuera de la terminal 😉',
      fed: (n) => `🐟 Comedero lleno. Thor y Hela van corriendo… (${n} comidas servidas)`,
      thor: '⚡ Thor ha tirado tu taza de la mesa. Mirándote. Sin remordimientos.',
      hela: '👑 Hela te ha mirado, ha bostezado y ha seguido durmiendo. Es un honor.',
    },
    en: {
      motd: `ZulemaOS 1.0 (tty1)\nType ${k('help')} to see the available commands. ${dim('Tab autocompletes, ↑ ↓ browse history.')}`,
      help: [
        ['help', 'Show this help'],
        ['whoami', 'Who is Zulema?'],
        ['about', 'About me'],
        ['experience', 'Work experience'],
        ['education', 'Education'],
        ['skills', 'Technical skills'],
        ['projects', 'Projects'],
        ['contact', 'How to reach me'],
        ['cv', 'Open the CV in quick view'],
        ['open <app>', 'Open a window (about, projects, skills…)'],
        ['top', 'Open the system monitor 🖥️'],
        ['cal', 'This month\'s calendar'],
        ['man <topic>', 'Study notes: html, js, php, sql, python, java, git, docker 📚'],
        ['games', 'Sudoku, word search and Tetris 🎮'],
        ['notes', 'Notepad'],
        ['feed', 'Feed Thor and Hela 🐟'],
        ['fortune', 'A programmer quote (try: fortune | catsay)'],
        ['catsay <txt>', 'An ASCII cat says whatever you want'],
        ['bin <number>', 'Convert to binary, hexadecimal and octal'],
        ['ipcalc', 'IP subnet calculator 🌐'],
        ['achievements', 'Your ZulemaOS achievements 🏆'],
        ['screensaver', 'Start the screensaver'],
        ['ls', 'List files'],
        ['neofetch', 'System information'],
        ['ping zulema', 'Am I available?'],
        ['cats', 'My cats 🐾 (also try meow)'],
        ['lang es|en', 'Switch language'],
        ['clear', 'Clear the screen'],
        ['exit', 'Close the terminal'],
      ],
      secret: 'There are a few hidden commands… 👀',
      notFound: (c) => `<span class="c-err">${esc(c)}: command not found.</span> Type ${k('help')}.`,
      opening: (n) => `Opening ${esc(n)}…`,
      openUsage: `Usage: ${k('open <app>')}  →  about, experience, projects, skills, contact, cv, trash`,
      noSuchFile: (n) => `<span class="c-err">"${esc(n)}" does not exist.</span> Try ${k('ls')}.`,
      catBinary: (n) => `${esc(n)} is not a text file. Try ${k('open ' + n)}.`,
      cd: `No need for ${k('cd')} here: use ${k('open projects')} or ${k('ls')} 😉`,
      sudo: '<span class="c-err">zulema is not in the sudoers file.</span> This incident will be reported. 🚨 (just kidding)',
      rm: '<span class="c-err">Permission denied.</span> Nice try 😏',
      hello: 'Hi! 👋 Thanks for stopping by my portfolio.',
      langOk: 'Language switched to English.',
      langUsage: `Usage: ${k('lang es')} or ${k('lang en')}`,
      pingOk: `✔ Zulema is available. Type ${k('contact')} to get in touch.`,
      stats: 'statistics',
      nf: {
        host: 'Host', kernel: 'Kernel', uptime: 'Uptime', shell: 'Shell', langs: 'Languages', ai: 'AI', theme: 'Theme', status: 'Status',
        uptimeV: 'learning since 2021', themeV: 'Lilac Retro',
      },
      contactLine: 'Write to me:',
      eduTitle: 'Education',
      expTitle: 'Experience',
      pending: '(to be completed)',
      ifconfig: 'There\'s no place like home.',
      cats: 'My remote-work buddies:',
      catsHint: `Type ${k('meow')} to call them or ${k('cats off')} to hide them.`,
      catsOff: 'The cats went to nap in another room. 🌙',
      catsOn: 'The cats are back! 🐾',
      calHint: 'Full version with holidays and meetings: open calendar',
      vim: 'To exit vim type :q!… Relax, I\'ll open the notepad instead 😅',
      catsayDefault: 'Meow! Type: catsay your message',
      binBad: 'Usage: bin 42 · bin 0b1010 · bin 0xFF (integers from 0 to 4294967295)',
      konami: '↑ ↑ ↓ ↓ ← → ← → B A … try it outside the terminal 😉',
      fed: (n) => `🐟 Bowl filled. Thor and Hela are running over… (${n} meals served)`,
      thor: '⚡ Thor just knocked your mug off the desk. Staring at you. No regrets.',
      hela: '👑 Hela looked at you, yawned and went back to sleep. You should feel honoured.',
    },
  };

  const LOGO = [
    ' _______ ',
    '|___   / ',
    '   /  /  ',
    '  /  /   ',
    ' /  /___ ',
    '/_______|',
  ];

  window.ZTerminal = function mount(body, ctx) {
    body.innerHTML = `<div class="term-out" role="log" aria-live="polite"></div>
      <form class="term-line" autocomplete="off">
        <label class="term-prompt">${PROMPT}</label>
        <input class="term-in" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" enterkeyhint="send" aria-label="Terminal">
      </form>`;

    const out = body.querySelector('.term-out');
    const form = body.querySelector('.term-line');
    const input = body.querySelector('.term-in');
    const history = [];
    let hIndex = 0;

    const lang = () => ctx.lang();
    const S = () => STR[lang()];
    const P = () => D[lang()];

    const print = (html = '', cls = '') => {
      const row = document.createElement('div');
      row.className = `term-row ${cls}`;
      row.innerHTML = html;
      out.append(row);
      body.scrollTop = body.scrollHeight;
    };
    const echo = (cmd) => {
      const row = document.createElement('div');
      row.className = 'term-row';
      row.innerHTML = `${PROMPT} `;
      row.append(document.createTextNode(cmd));
      out.append(row);
    };

    const resolveApp = (name) => {
      const n = (name || '').toLowerCase().replace(/\/$/, '');
      if (APP_IDS.includes(n)) return n;
      for (const map of Object.values(FILES)) {
        for (const [file, id] of Object.entries(map)) {
          const bare = file.replace(/\/$/, '');
          if (n === bare || n === bare.replace(/\.[a-z]+$/, '')) return id;
        }
      }
      return null;
    };

    const printAbout = () => P().about.forEach((p) => print(esc(p)));

    const printTimeline = (items) => {
      items.forEach((it) => {
        print(`<span class="c-acc">${esc(it.period)}</span>  <b>${esc(it.role)}</b>`);
        print(`  @ ${it.pending ? dim(S().pending) : esc(it.org)}`);
        (it.points || []).forEach((p) => print(`  <span class="c-lil">·</span> ${esc(p)}`, 'indent'));
        print('');
      });
    };

    const commands = {
      help() {
        S().help.forEach(([c, d]) => print(`  ${k(c.padEnd(13, ' '))} ${esc(d)}`));
        print('');
        print(dim(S().secret));
      },
      whoami() {
        print(`<b>${esc(D.name)}</b>`);
        print(esc(P().role));
        print(`<span class="c-ok">●</span> ${esc(P().status)}`);
      },
      about: printAbout,
      experience() {
        print(`<span class="c-lil">## ${esc(S().expTitle)}</span>`);
        printTimeline(P().experience);
      },
      education() {
        print(`<span class="c-lil">## ${esc(S().eduTitle)}</span>`);
        printTimeline(P().education);
      },
      skills() {
        P().skills.forEach((g) => {
          print(`<span class="c-lil">${esc(g.title)}</span>`);
          print(`  ${g.items.map((i) => `[${esc(i)}]`).join(' ')}`, 'indent');
        });
      },
      projects() {
        P().projects.forEach((p) => {
          print(`<span class="c-acc">▸ ${esc(p.name)}</span> ${dim('(' + p.tag + ')')}`);
          print(`  ${esc(p.desc)}`, 'indent');
          print(`  ${dim(p.stack.join(' · '))}`, 'indent');
        });
      },
      contact() {
        print(esc(S().contactLine));
        print(`  ✉  <a href="mailto:${esc(D.email)}">${esc(D.email)}</a>`);
        if (D.linkedin) print(`  in <a href="${esc(D.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
        print(`  📍 ${esc(D.location)}`);
      },
      cv() {
        print(S().opening('CV.pdf'));
        ctx.openApp('cv');
      },
      open(args) {
        if (!args[0]) return print(S().openUsage);
        const id = resolveApp(args[0]);
        if (!id) return print(S().noSuchFile(args[0]));
        print(S().opening(P().ui.apps[id]));
        ctx.openApp(id);
      },
      ls() {
        const items = Object.keys(FILES[lang()]).map((f) => {
          if (f.endsWith('/')) return `<span class="c-lil">${esc(f)}</span>`;
          if (f.endsWith('.exe')) return `<span class="c-ok">${esc(f)}</span>`;
          return esc(f);
        });
        print(items.join('  '));
      },
      cat(args) {
        if (!args[0]) return print(S().openUsage);
        const id = resolveApp(args[0]);
        if (!id) return print(S().noSuchFile(args[0]));
        if (id === 'about') return printAbout();
        print(S().catBinary(args[0]));
      },
      cd() { print(S().cd); },
      neofetch() {
        const n = S().nf;
        const p = P();
        const info = [
          `<span class="c-ok">zulema</span>@<span class="c-ok">zulemaos</span>`,
          dim('----------------'),
          `<span class="c-acc">OS</span>: ZulemaOS 1.0`,
          `<span class="c-acc">${n.host}</span>: ${esc(D.location)}`,
          `<span class="c-acc">${n.kernel}</span>: SMR 2023 + DAW 2025`,
          `<span class="c-acc">${n.uptime}</span>: ${n.uptimeV}`,
          `<span class="c-acc">${n.shell}</span>: zsh-ulema`,
          `<span class="c-acc">${n.langs}</span>: ${esc(p.skills[0].items.join(', '))}`,
          `<span class="c-acc">${n.ai}</span>: TensorFlow`,
          `<span class="c-acc">${n.theme}</span>: ${n.themeV}`,
          `<span class="c-acc">${n.status}</span>: ${esc(p.status)}`,
          '',
          ['#1d1a3f', '#3552d1', '#6a4fd8', '#b79cf5', '#ff8fc7', '#7fe3ff', '#9dffb0', '#fbf9ff']
            .map((c) => `<span class="swatch" style="background:${c}"></span>`).join(''),
        ];
        const logo = LOGO.map((l) => `<span class="c-lil">${esc(l)}</span>`);
        const rows = Math.max(logo.length, info.length);
        let html = '<div class="neofetch"><div>';
        for (let i = 0; i < rows; i++) html += `${logo[i] || ''}\n`;
        html += '</div><div>';
        html += info.join('\n');
        html += '</div></div>';
        print(html);
      },
      async ping(args) {
        const host = args[0] || 'zulema';
        form.hidden = true;
        print(`PING ${esc(host)} (127.0.0.1) 56(84) bytes of data.`);
        for (let i = 1; i <= 4; i++) {
          await sleep(420);
          print(`64 bytes from ${esc(host)}: icmp_seq=${i} ttl=64 time=${(Math.random() * 0.8 + 0.1).toFixed(2)} ms`);
        }
        await sleep(250);
        print(`--- ${esc(host)} ping ${S().stats} ---`);
        print('4 packets transmitted, 4 received, 0% packet loss');
        if (host.toLowerCase().startsWith('zulema')) print(S().pingOk);
        form.hidden = false;
        input.focus();
      },
      ifconfig() {
        print('eth0: flags=4163&lt;UP,BROADCAST,RUNNING&gt;  mtu 1500');
        print('      inet 127.0.0.1  netmask 255.0.0.0');
        print(`      ${dim(S().ifconfig)}`);
      },
      lang(args) {
        const l = (args[0] || '').toLowerCase();
        if (l !== 'es' && l !== 'en') return print(S().langUsage);
        ctx.setLang(l);
        print(S().langOk);
      },
      clear() { out.innerHTML = ''; },
      date() { print(esc(new Date().toLocaleString(lang() === 'es' ? 'es-ES' : 'en-GB'))); },
      echo(args) { print(esc(args.join(' '))); },
      history() { history.forEach((h, i) => print(`${String(i + 1).padStart(4, ' ')}  ${esc(h)}`)); },
      sudo() { print(S().sudo); window.ZAch?.unlock('sudo'); },
      rm() { print(S().rm); },
      hola() { print(S().hello); },
      cats(args) {
        const arg = (args[0] || '').toLowerCase();
        if (arg === 'off' || arg === 'on') {
          window.ZPets.toggle(arg === 'on');
          return print(arg === 'on' ? S().catsOn : S().catsOff);
        }
        print(S().cats);
        window.ZPets.list().forEach((c) => print(`  <span class="c-lil">🐾</span> <b>${esc(c.name)}</b> ${c.emoji} ${dim('— ' + c.bio[lang()])}`));
        print(`<span class="c-dim">${S().catsHint}</span>`);
      },
      top() {
        print(S().opening('Monitor.exe'));
        ctx.openApp('monitor');
      },
      cal() {
        // Como el "cal" de Linux, con la semana empezando en lunes
        const loc = lang() === 'es' ? 'es-ES' : 'en-GB';
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();
        const title = now.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
        const heads = Array.from({ length: 7 }, (_, i) =>
          new Date(2024, 0, 1 + i).toLocaleDateString(loc, { weekday: 'short' }).replace('.', '').slice(0, 2));
        const offset = (new Date(y, m, 1).getDay() + 6) % 7;
        const days = new Date(y, m + 1, 0).getDate();
        print(`<span class="c-lil">${esc(title.padStart(Math.floor((20 + title.length) / 2)))}</span>`);
        print(heads.map(esc).join(' '));
        let row = '   '.repeat(offset);
        for (let d = 1; d <= days; d++) {
          const cell = String(d).padStart(2, ' ');
          row += d === now.getDate() ? `<span class="c-today">${cell}</span>` : cell;
          if ((offset + d) % 7 === 0 || d === days) { print(row); row = ''; } else row += ' ';
        }
        print(dim(S().calHint));
      },
      juegos() {
        print(S().opening(P().ui.apps.games));
        ctx.openApp('games');
      },
      notas() {
        print(S().opening(P().ui.apps.notes));
        ctx.openApp('notes');
      },
      vim() {
        print(S().vim);
        window.ZAch?.unlock('vim');
        ctx.openApp('notes');
      },
      feed() {
        window.ZPets.feed();
        print(S().fed(window.ZPets.meals()));
      },
      fortune() {
        const [q, a] = window.ZExtras.fortune();
        print(`<span class="c-lil">“${esc(q)}”</span>`);
        print(dim(`   — ${a}`));
      },
      catsay(args, text) {
        const msg = (text || args.join(' ') || S().catsayDefault).trim();
        const lines = [];
        msg.split(/\s+/).forEach((word) => {
          const last = lines[lines.length - 1];
          if (last !== undefined && (`${last} ${word}`).length <= 34) lines[lines.length - 1] = `${last} ${word}`;
          else lines.push(word);
        });
        const w = Math.max(...lines.map((l) => l.length));
        const bubble = lines.length === 1
          ? [`< ${lines[0]} >`]
          : lines.map((l, i) => {
            const [a, b] = i === 0 ? ['/', '\\'] : i === lines.length - 1 ? ['\\', '/'] : ['|', '|'];
            return `${a} ${l.padEnd(w)} ${b}`;
          });
        const thor = Math.random() < 0.5;
        const cat = [
          '        \\    /\\_/\\',
          `         \\  ( ${thor ? 'o.o' : '-.-'} )`,
          `             > ${thor ? '^' : '~'} <`,
          '            /     \\',
          `           (  | |  )   ${thor ? '⚡ Thor' : '👑 Hela'}`,
        ];
        print(`<span class="catsay">${esc([` ${'_'.repeat(w + 2)}`, ...bubble, ` ${'-'.repeat(w + 2)}`, ...cat].join('\n'))}</span>`);
      },
      bin(args) {
        if (!args[0]) { ctx.openApp('binary'); return; }
        const raw = args[0].toLowerCase();
        const n = raw.startsWith('0b') ? parseInt(raw.slice(2), 2) : raw.startsWith('0x') ? parseInt(raw.slice(2), 16) : Number(raw);
        if (!Number.isInteger(n) || n < 0 || n > 0xFFFFFFFF) return print(S().binBad);
        const bin = n.toString(2);
        print(`<span class="c-acc">DEC</span> ${n}`);
        print(`<span class="c-acc">BIN</span> ${bin.padStart(Math.ceil(bin.length / 8) * 8, '0').replace(/(.{4})(?=.)/g, '$1 ')}`);
        print(`<span class="c-acc">HEX</span> 0x${n.toString(16).toUpperCase()}`);
        print(`<span class="c-acc">OCT</span> 0o${n.toString(8)}`);
      },
      screensaver() { window.ZExtras.screensaver(); },
      konami() { print(S().konami); },
      thor() { print(S().thor); },
      hela() { print(S().hela); },
      meow() {
        window.ZPets.meow();
        print('🐾 ' + esc(P().ui.pets.meows[0]));
      },
      exit() { ctx.close(); },
    };

    // Alias
    Object.assign(commands, {
      exp: commands.experience, edu: commands.education, dir: commands.ls, cls: commands.clear,
      ipconfig: commands.ifconfig, hello: commands.hola, hi: commands.hola, '?': commands.help,
      // "man python" abre los apuntes de Python; "man" a secas, la ayuda
      man(args) {
        let topic = (args[0] || '').toLowerCase();
        if (!topic) return commands.help();
        topic = { html: 'web', css: 'web', javascript: 'js' }[topic] || topic;
        if (!window.ZNotesData.some((x) => x.id === topic)) return print(S().noSuchFile(topic));
        print(S().opening(`${P().ui.apps.notebook} · ${topic}`));
        ctx.study(topic);
      },
      apuntes: () => ctx.study(), study: () => ctx.study(),
      gatos: commands.cats, pets: commands.cats, miau: commands.meow,
      htop: commands.top, monitor: commands.top, calendar: commands.cal, calendario: commands.cal,
      games: commands.juegos, notes: commands.notas, nano: commands.notas, vi: commands.vim, comida: commands.feed,
      sudoku: () => ctx.openApp('sudoku'), tetris: () => ctx.openApp('tetris'),
      sopa: () => ctx.openApp('wordsearch'), wordsearch: () => ctx.openApp('wordsearch'),
      ipcalc: () => ctx.openApp('subnet'), subredes: () => ctx.openApp('subnet'), subnet: () => ctx.openApp('subnet'),
      logros: () => ctx.openApp('achievements'), achievements: () => ctx.openApp('achievements'),
      binario: commands.bin, binary: commands.bin, xscreensaver: commands.screensaver, cowsay: commands.catsay,
    });

    const run = async (raw) => {
      const line = raw.trim();
      echo(raw);
      if (!line) return;
      history.push(line);
      hIndex = history.length;
      window.ZAch?.count('commands', 15, 'terminal');
      // Tubería favorita de cualquier sysadmin
      if (/^fortune\s*\|\s*(catsay|cowsay)$/i.test(line)) {
        const [q, a] = window.ZExtras.fortune();
        commands.catsay([], `${q} — ${a}`);
        window.ZAch?.unlock('fortune');
        body.scrollTop = body.scrollHeight;
        return;
      }
      const [cmd, ...args] = line.split(/\s+/);
      const fn = commands[cmd.toLowerCase()];
      if (fn) await fn(args);
      else print(S().notFound(cmd));
      body.scrollTop = body.scrollHeight;
    };

    const complete = () => {
      const v = input.value;
      const parts = v.split(/\s+/);
      let pool;
      let prefix;
      if (parts.length === 1) {
        pool = S().help.map(([c]) => c.split(' ')[0]);
        prefix = '';
      } else if (['open', 'cat'].includes(parts[0])) {
        pool = [...Object.keys(FILES[lang()]), ...APP_IDS];
        prefix = `${parts[0]} `;
      } else return;
      const last = parts[parts.length - 1].toLowerCase();
      const matches = [...new Set(pool.filter((c) => c.startsWith(last)))];
      if (matches.length === 1) input.value = prefix + matches[0] + (parts.length === 1 ? ' ' : '');
      else if (matches.length > 1) {
        echo(v);
        print(matches.map(esc).join('  '));
      }
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value;
      input.value = '';
      run(v);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (hIndex > 0) input.value = history[--hIndex];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        hIndex = Math.min(hIndex + 1, history.length);
        input.value = history[hIndex] || '';
      } else if (e.key === 'Tab') {
        e.preventDefault();
        complete();
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        commands.clear();
      }
    });

    body.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (!window.getSelection().toString()) input.focus({ preventScroll: true });
    });

    print(S().motd.replace(/\n/g, '<br>'));
    print('');
    input.focus({ preventScroll: true });
  };
})();
