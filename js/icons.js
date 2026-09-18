/* Iconos pixel-art en SVG (32×32). */
(() => {
  const svg = (body, box = 32) =>
    `<svg viewBox="0 0 ${box} ${box}" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${body}</svg>`;

  const INK = '#1d1a3f';

  const folder = (main, light, dark, badge = '') =>
    svg(`<path fill="${INK}" d="M2 6h11l2 3h15v20H2z"/>
      <path fill="${main}" d="M3 7h9l2 3h15v18H3z"/>
      <path fill="${light}" d="M3 12h26v2H3z"/>
      <path fill="${dark}" d="M3 26h26v2H3z"/>${badge}`);

  window.ICONS = {
    logo: svg(`<path fill="#6a4fd8" d="M3 3h10v3h-2v1h-1v1H9v1H8v1H7v1h6v2H3v-3h2V9h1V8h1V7h1V6h1V5H3z"/>`, 16),

    notepad: svg(`<path fill="${INK}" d="M6 2h17l5 5v23H6z"/>
      <path fill="#fff" d="M7 3h15v5h5v21H7z"/>
      <path fill="#cbbdf2" d="M23 4l3 3h-3z"/>
      <path fill="#6a4fd8" d="M10 11h14v2H10zm0 4h14v2H10zm0 4h10v2H10zm0 4h12v2H10z"/>`),

    folderBlue: folder('#7f94f0', '#b4c1ff', '#5a6fd0',
      `<path fill="${INK}" d="M18 16h8v8h-8z"/><path fill="#ffd66b" d="M19 17h6v6h-6z"/><path fill="${INK}" d="M20 15h4v2h-4z"/>`),

    folderLilac: folder('#b79cf5', '#d9c8ff', '#8f72e0',
      `<path fill="#ff8fc7" d="M21 15h2v3h3v2h-3v3h-2v-3h-3v-2h3z"/>`),

    chip: svg(`<path fill="${INK}" d="M11 3h2v5h-2zm4 0h2v5h-2zm4 0h2v5h-2zM11 24h2v5h-2zm4 0h2v5h-2zm4 0h2v5h-2zM3 11h5v2H3zm0 4h5v2H3zm0 4h5v2H3zM24 11h5v2h-5zm0 4h5v2h-5zm0 4h5v2h-5z"/>
      <path fill="${INK}" d="M7 7h18v18H7z"/>
      <path fill="#3552d1" d="M8 8h16v16H8z"/>
      <path fill="#7fe3ff" d="M12 12h8v8h-8z"/>
      <path fill="#fff" d="M9 9h2v2H9z"/>`),

    terminal: svg(`<path fill="${INK}" d="M2 5h28v23H2z"/>
      <path fill="#b79cf5" d="M3 6h26v3H3z"/>
      <path fill="#fff" d="M25 7h2v1h-2zm-3 0h2v1h-2z"/>
      <path fill="#120f2e" d="M3 9h26v18H3z"/>
      <path fill="#9dffb0" d="M6 13h2v2H6zm2 2h2v2H8zm-2 2h2v2H6zm7 2h7v2h-7z"/>`),

    mail: svg(`<path fill="${INK}" d="M2 7h28v19H2z"/>
      <path fill="#fff" d="M3 8h26v17H3z"/>
      <path fill="none" stroke="#8f72e0" stroke-width="2" d="M3 8l13 9 13-9"/>
      <path fill="#ff8fc7" d="M23 18h4v5h-4z"/>`),

    pdf: svg(`<path fill="${INK}" d="M6 2h17l5 5v23H6z"/>
      <path fill="#fff" d="M7 3h15v5h5v21H7z"/>
      <path fill="#cbbdf2" d="M23 4l3 3h-3z"/>
      <path fill="${INK}" d="M3 14h22v10H3z"/>
      <path fill="#ff8fc7" d="M4 15h20v8H4z"/>
      <path fill="#fff" d="M6 17h3v4H6zm5 0h3v4h-3zm5 0h4v1h-4zm0 1h2v3h-2z"/>
      <path fill="#6a4fd8" d="M10 26h12v1H10z"/>`),

    trash: svg(`<path fill="${INK}" d="M12 3h8v3h-8zM5 6h22v4H5zM7 10h18v20H7z"/>
      <path fill="#b79cf5" d="M13 4h6v2h-6zM6 7h20v2H6z"/>
      <path fill="#d9c8ff" d="M8 10h16v19H8z"/>
      <path fill="#8f72e0" d="M11 12h2v15h-2zm4 0h2v15h-2zm4 0h2v15h-2z"/>`),

    info: svg(`<path fill="${INK}" d="M10 2h12v2h4v2h2v4h2v12h-2v4h-2v2h-4v2H10v-2H6v-2H4v-4H2V10h2V6h2V4h4z"/>
      <path fill="#3552d1" d="M11 3h10v2h4v2h2v4h2v10h-2v4h-2v2h-4v2H11v-2H7v-2H5v-4H3V11h2V7h2V5h4z"/>
      <path fill="#fff" d="M15 8h3v3h-3zm-2 5h5v9h2v2h-8v-2h2v-7h-1z"/>`),

    zap: svg(`<path fill="${INK}" d="M17 1h8l-5 11h7L11 31l3-14H7z"/>
      <path fill="#ffd66b" d="M18 2h5l-5 11h7L13 27l2-11H9z"/>`),

    globe: svg(`<circle cx="16" cy="16" r="13" fill="${INK}"/>
      <circle cx="16" cy="16" r="12" fill="#7fe3ff"/>
      <path fill="#3ecf8e" d="M8 9h6v3h2v4h-3v5h-3v-4H8v-3H6v-3h2zm12 10h5v2h-2v3h-4v-3h1z"/>`),

    power: svg(`<path fill="${INK}" d="M15 3h3v12h-3z"/>
      <path fill="${INK}" d="M9 7h3v3H9v2H7v8h2v3h3v2h9v-2h3v-3h2v-8h-2v-2h-2V7h3v2h2v3h1v9h-1v3h-2v3h-4v1H12v-1H8v-3H6v-3H5v-9h1V9h3z"/>
      <path fill="#ff8fc7" d="M16 4h1v10h-1z"/>`),

    monitor: svg(`<path fill="${INK}" d="M2 4h28v20H2zM12 24h8v3h4v3H8v-3h4z"/>
      <path fill="#b79cf5" d="M3 5h26v2H3zM9 28h14v1H9z"/>
      <path fill="#120f2e" d="M4 7h24v15H4z"/>
      <path fill="#9dffb0" d="M5 18h3v-3h3v2h3v-6h3v4h3v-7h3v5h3v6H5z" opacity=".35"/>
      <path fill="#9dffb0" d="M5 17h3v1H5zm3-3h3v1H8zm3 2h3v1h-3zm3-6h3v1h-3zm3 4h3v1h-3zm3-7h3v1h-3zm3 5h2v1h-2z"/>`),

    calendar: svg(`<path fill="${INK}" d="M3 5h26v25H3z"/>
      <path fill="#ff8fc7" d="M4 6h24v5H4z"/>
      <path fill="#fff" d="M4 11h24v18H4z"/>
      <path fill="${INK}" d="M8 2h3v6H8zm13 0h3v6h-3z"/>
      <path fill="#cbbdf2" d="M7 14h3v3H7zm5 0h3v3h-3zm5 0h3v3h-3zm5 0h3v3h-3zM7 19h3v3H7zm5 0h3v3h-3zm5 0h3v3h-3zM7 24h3v3H7zm5 0h3v3h-3zm5 0h3v3h-3zm5 0h3v3h-3z"/>
      <path fill="#6a4fd8" d="M22 19h3v3h-3z"/>`),

    folderGames: folder('#9dd9f5', '#c9f0ff', '#5fb3dd',
      `<path fill="${INK}" d="M16 16h12v8H16z"/><path fill="#b79cf5" d="M17 17h10v6H17z"/>
       <path fill="${INK}" d="M18 19h3v1h-3zm1-1h1v3h-1zm5 0h1v1h-1zm1 2h1v1h-1z"/>`),

    sudoku: svg(`<path fill="${INK}" d="M3 3h26v26H3z"/>
      <path fill="#fff" d="M4 4h24v24H4z"/>
      <path fill="#cbbdf2" d="M12 4h1v24h-1zm7 0h1v24h-1zM4 12h24v1H4zm0 7h24v1H4z"/>
      <path fill="#3552d1" d="M6 6h4v1H6zm3 1h1v2H9zM7 9h3v1H7zm0 1h1v1H7zm0 1h3v1H7z"/>
      <path fill="#6a4fd8" d="M15 14h2v5h-2zm-1 1h1v1h-1z"/>
      <path fill="#ff8fc7" d="M21 21h4v1h-4zm0 1h1v1h-1zm0 1h4v1h-4zm3 1h1v1h-1zm-3 1h4v1h-4z"/>`),

    wordsearch: svg(`<path fill="${INK}" d="M3 3h26v26H3z"/>
      <path fill="#fff" d="M4 4h24v24H4z"/>
      <path fill="#ffd66b" d="M5 12h22v5H5z"/>
      <path fill="#9384c9" d="M6 6h2v3H6zm5 0h2v3h-2zm5 0h2v3h-2zm5 0h2v3h-2zM6 21h2v3H6zm5 0h2v3h-2zm5 0h2v3h-2zm5 0h2v3h-2z"/>
      <path fill="${INK}" d="M6 13h2v3H6zm5 0h2v3h-2zm5 0h2v3h-2zm5 0h2v3h-2z"/>`),

    tetris: svg(`<path fill="${INK}" d="M3 14h9v8H3zM11 6h9v16h-9zM19 14h10v16H19zM3 21h9v9H3z"/>
      <path fill="#b79cf5" d="M4 15h7v6H4z"/><path fill="#7fe3ff" d="M12 7h7v6h-7zm0 7h7v7h-7z"/>
      <path fill="#ff8fc7" d="M20 15h8v6h-8zm0 7h8v7h-8z"/><path fill="#9dffb0" d="M4 22h7v7H4z"/>
      <path fill="#fff" opacity=".5" d="M4 15h7v1H4zm8-8h7v1h-7zm8 8h8v1h-8zM4 22h7v1H4z"/>`),

    notes: svg(`<path fill="${INK}" d="M4 3h24v20l-7 7H4z"/>
      <path fill="#ffe89a" d="M5 4h22v18h-6v7H5z"/>
      <path fill="#e8c65c" d="M21 22h6l-6 6z"/>
      <path fill="#ff8fc7" d="M5 4h22v3H5z"/>
      <path fill="#b09340" d="M8 11h16v1H8zm0 4h16v1H8zm0 4h10v1H8z"/>`),

    bowl: svg(`<path fill="#8a5220" d="M9 11h3v2H9zm5-1h3v2h-3zm5 1h3v2h-3zm-7 2h3v1h-3zm5 0h3v1h-3z"/>
      <path fill="#c98a3e" d="M7 13h18v2H7zm5-3h2v1h-2zm5 0h2v1h-2z"/>
      <path fill="${INK}" d="M2 15h28v2H2zm1 2h26v3H3zm2 3h22v3H5zm3 3h16v2H8z"/>
      <path fill="#ff8fc7" d="M4 17h24v2H4zm2 2h20v2H6zm3 2h14v2H9z"/>
      <path fill="#ffd1e8" d="M4 17h3v1H4z"/>`),

    binary: svg(`<path fill="${INK}" d="M2 6h28v20H2z"/>
      <path fill="#120f2e" d="M3 7h26v18H3z"/>
      <path fill="#9dffb0" d="M5 10h2v5H5zm12 0h3v1h-1v4h-1v-4h-1zm8 0h2v5h-2z"/>
      <path fill="#9dffb0" d="M9 10h4v5H9zm1 1v3h2v-3z" fill-rule="evenodd"/>
      <path fill="#b79cf5" d="M5 18h4v4H5zm12 0h4v4h-4z"/>
      <path fill="#3a3470" d="M11 18h4v4h-4zm12 0h4v4h-4z"/>
      <path fill="#fff" d="M6 19h1v1H6zm12 0h1v1h-1z"/>`),

    quote: svg(`<path fill="${INK}" d="M3 4h26v18H14l-6 6v-6H3z"/>
      <path fill="#fff" d="M4 5h24v16H13l-4 4v-4H4z"/>
      <path fill="#6a4fd8" d="M8 9h4v4h-2v2H8zm8 0h4v4h-2v2h-2z"/>`),

    // Botones de la barra de título
    btnMin: '<svg viewBox="0 0 8 8" aria-hidden="true"><path fill="currentColor" d="M1 6h6v2H1z"/></svg>',
    btnMax: '<svg viewBox="0 0 8 8" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M0 0h8v8H0zM1 2v5h6V2z"/></svg>',
    btnClose: '<svg viewBox="0 0 8 8" aria-hidden="true"><path stroke="currentColor" stroke-width="1.6" d="M1 1l6 6M7 1L1 7"/></svg>',
  };
})();
