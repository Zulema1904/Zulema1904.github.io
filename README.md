# ZulemaOS · Portfolio de Zulema Gutiérrez

🌐 **https://zulema1904.github.io**

Portfolio con forma de sistema operativo retro: escritorio, ventanas, terminal y un
**modo rápido** con el CV en una sola página (se puede imprimir o guardar en PDF).
Es HTML, CSS y JavaScript puro, sin frameworks ni instalación.

## Estructura

```
index.html        Página única
css/style.css     Estilos (paleta y fuentes al principio, en :root)
js/data.js        ✏️  TODO EL CONTENIDO (textos en español e inglés)
js/icons.js       Iconos pixel-art en SVG
js/sprites.js     Avatar chibi y gatos en pixel-art (dibujados con texto)
js/pets.js        Thor y Hela, las mascotas de escritorio
js/terminal.js    Terminal y sus comandos
js/os.js          Escritorio, ventanas, barra de tareas, modo rápido
assets/           Favicon y futuras imágenes
monitor/          Copia de la interfaz de ZulemaOS Monitor (se abre como Monitor.exe)
```

La carpeta `monitor/` es una copia de `web/` del repositorio
[zulemaos-monitor](https://github.com/Zulema1904/zulemaos-monitor). Si cambias el monitor,
vuelve a copiar esos archivos aquí.

Para cambiar textos, experiencia, habilidades o proyectos solo hace falta editar
`js/data.js`. Cada idioma (`es` / `en`) tiene la misma estructura.

## Verlo en local

```bash
python -m http.server 5500
```

Y abre http://localhost:5500

## Enlaces útiles

- `/#cv` abre directamente el modo rápido (ideal para mandar a reclutadores).
- `/?lang=en` fuerza la versión en inglés.
