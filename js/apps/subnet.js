/*
 * Subredes.exe · calculadora de subredes IPv4
 * Acepta "192.168.1.10/24" o "192.168.1.10 255.255.255.0" y muestra red, broadcast,
 * rango de hosts, máscara, wildcard, clase y los bits de red/host coloreados.
 */
(() => {
  'use strict';

  const T = {
    es: {
      input: 'IP y máscara', calc: 'Calcular', examples: 'Ejemplos',
      bad: 'Escribe una IP válida con su máscara: 192.168.1.10/24 o 192.168.1.10 255.255.255.0',
      rows: ['Dirección de red', 'Broadcast', 'Primer host', 'Último host', 'Hosts utilizables', 'Máscara', 'Wildcard', 'Clase', 'Tipo'],
      priv: 'Privada', pub: 'Pública', loop: 'Loopback', link: 'Enlace local (APIPA)',
      legend: ['Bits de red', 'Bits de host'],
      hint: 'La máscara decide cuántos bits son de red: el resto numera los equipos de la subred.',
    },
    en: {
      input: 'IP and mask', calc: 'Calculate', examples: 'Examples',
      bad: 'Type a valid IP with its mask: 192.168.1.10/24 or 192.168.1.10 255.255.255.0',
      rows: ['Network address', 'Broadcast', 'First host', 'Last host', 'Usable hosts', 'Subnet mask', 'Wildcard', 'Class', 'Type'],
      priv: 'Private', pub: 'Public', loop: 'Loopback', link: 'Link-local (APIPA)',
      legend: ['Network bits', 'Host bits'],
      hint: 'The mask decides how many bits belong to the network: the rest number the hosts in the subnet.',
    },
  };
  const EXAMPLES = ['192.168.1.10/24', '10.20.30.40/8', '172.16.5.100/20', '192.168.0.130/26'];

  const toInt = (ip) => ip.split('.').reduce((n, o) => (n * 256) + Number(o), 0);
  const toIp = (n) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.');
  const validIp = (s) => /^(\d{1,3}\.){3}\d{1,3}$/.test(s) && s.split('.').every((o) => Number(o) <= 255);

  function parse(text) {
    const t = text.trim().replace(/\s+/g, ' ');
    let ip;
    let prefix;
    let m = t.match(/^([\d.]+)\s*\/\s*(\d{1,2})$/);
    if (m) { ip = m[1]; prefix = Number(m[2]); } else {
      m = t.match(/^([\d.]+) ([\d.]+)$/);
      if (!m || !validIp(m[2])) return null;
      ip = m[1];
      const mask = toInt(m[2]);
      const bits = (mask >>> 0).toString(2).padStart(32, '0');
      if (!/^1*0*$/.test(bits)) return null; // máscara no contigua
      prefix = bits.indexOf('0') === -1 ? 32 : bits.indexOf('0');
    }
    if (!validIp(ip) || prefix > 32) return null;
    return { ip, prefix };
  }

  function calc({ ip, prefix }) {
    const addr = toInt(ip);
    const mask = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const network = (addr & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const size = 2 ** (32 - prefix);
    const usable = prefix >= 31 ? size : size - 2;
    const first = prefix >= 31 ? network : network + 1;
    const last = prefix >= 31 ? broadcast : broadcast - 1;
    const o1 = addr >>> 24;
    const cls = o1 < 128 ? 'A' : o1 < 192 ? 'B' : o1 < 224 ? 'C' : o1 < 240 ? 'D' : 'E';
    const o2 = (addr >>> 16) & 255;
    const kind = o1 === 127 ? 'loop'
      : (o1 === 169 && o2 === 254) ? 'link'
        : (o1 === 10 || (o1 === 172 && o2 >= 16 && o2 <= 31) || (o1 === 192 && o2 === 168)) ? 'priv' : 'pub';
    return { addr, mask, network, broadcast, usable, first, last, cls, kind, prefix };
  }

  window.ZApps = window.ZApps || {};
  window.ZApps.subnet = {
    mount(body, ctx) {
      const t = () => T[ctx.lang()];
      let current = '192.168.1.10/24';

      body.classList.add('game', 'sn-body');
      body.innerHTML = `
        <form class="sn-form">
          <label class="sn-label"></label>
          <div class="sn-row"><input class="sn-in" spellcheck="false" autocomplete="off"><button class="btn primary sn-go"></button></div>
          <div class="sn-examples"><span></span>${EXAMPLES.map((e) => `<button type="button" class="link" data-ex="${e}">${e}</button>`).join('')}</div>
        </form>
        <div class="sn-bits"></div>
        <div class="sn-legend"></div>
        <dl class="sn-table"></dl>
        <p class="muted sn-hint"></p>`;
      const $ = (s) => body.querySelector(s);
      const input = $('.sn-in');

      function show() {
        const parsed = parse(current);
        if (!parsed) {
          $('.sn-table').innerHTML = `<p class="sn-bad">${t().bad}</p>`;
          $('.sn-bits').innerHTML = '';
          return;
        }
        const r = calc(parsed);
        const bits = (r.addr >>> 0).toString(2).padStart(32, '0');
        $('.sn-bits').innerHTML = [0, 1, 2, 3].map((o) => `<span class="sn-octet">${[...bits.slice(o * 8, o * 8 + 8)].map((b, i) =>
          `<i class="${o * 8 + i < r.prefix ? 'net' : 'host'}">${b}</i>`).join('')}<small>${(r.addr >>> (24 - o * 8)) & 255}</small></span>`).join('');
        $('.sn-legend').innerHTML = `<span class="net">${t().legend[0]}: ${r.prefix}</span><span class="host">${t().legend[1]}: ${32 - r.prefix}</span>`;
        const values = [
          `${toIp(r.network)}/${r.prefix}`, toIp(r.broadcast), toIp(r.first), toIp(r.last),
          r.usable.toLocaleString(ctx.lang() === 'es' ? 'es-ES' : 'en-GB'),
          toIp(r.mask), toIp(~r.mask >>> 0), r.cls, t()[r.kind],
        ];
        $('.sn-table').innerHTML = t().rows.map((k, i) => `<dt>${k}</dt><dd>${values[i]}</dd>`).join('');
      }

      function labels() {
        $('.sn-label').textContent = t().input;
        $('.sn-go').textContent = t().calc;
        $('.sn-examples span').textContent = `${t().examples}:`;
        $('.sn-hint').textContent = t().hint;
        show();
      }

      $('.sn-form').addEventListener('submit', (e) => {
        e.preventDefault();
        current = input.value;
        show();
        if (parse(current)) window.ZAch?.unlock('subnet');
      });
      $('.sn-examples').addEventListener('click', (e) => {
        const b = e.target.closest('[data-ex]');
        if (b) { current = input.value = b.dataset.ex; show(); }
      });

      input.value = current;
      labels();
      return { setLang: labels };
    },
  };
})();
