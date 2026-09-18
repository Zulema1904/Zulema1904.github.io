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
    es: { 'sobre_mi.txt': 'about', 'experiencia/': 'experience', 'proyectos/': 'projects', 'habilidades.exe': 'skills', 'contacto.exe': 'contact', 'cv.pdf': 'cv', 'papelera/': 'trash' },
    en: { 'about_me.txt': 'about', 'experience/': 'experience', 'projects/': 'projects', 'skills.exe': 'skills', 'contact.exe': 'contact', 'cv.pdf': 'cv', 'trash/': 'trash' },
  };
  const APP_IDS = ['about', 'experience', 'projects', 'skills', 'contact', 'cv', 'trash', 'welcome', 'terminal'];

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
      sudo() { print(S().sudo); },
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
      ipconfig: commands.ifconfig, hello: commands.hola, hi: commands.hola, man: commands.help, '?': commands.help,
      gatos: commands.cats, pets: commands.cats, miau: commands.meow,
    });

    const run = async (raw) => {
      const line = raw.trim();
      echo(raw);
      if (!line) return;
      history.push(line);
      hIndex = history.length;
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
