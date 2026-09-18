/*
 * Contenido de Apuntes (es / en), ordenado como un itinerario de aprendizaje.
 * Cada tema tiene secciones con: h (título), p (texto), code (ejemplo) y opcionalmente
 * lang (lenguaje del ejemplo), table, tip (💡), warn (⚠️) y cat (nota de Thor o Hela).
 * En los textos, `código` sale como código y **texto** sale subrayado con rotulador.
 * Para añadir un tema nuevo basta con copiar la estructura de uno existente.
 */
window.ZNotesData = [
  /* ================================================================ HTML / CSS */
  {
    id: 'web',
    icon: '🎨',
    color: '#b79cf5',
    lang: 'html',
    title: { es: 'HTML / CSS', en: 'HTML / CSS' },
    sections: [
      {
        h: { es: '¿Qué son?', en: 'What are they?' },
        p: {
          es: "**HTML** es la estructura y el contenido de una web (el esqueleto). **CSS** es el estilo: colores, tamaños y colocación (la ropa). Y **JavaScript** pone el comportamiento.",
          en: "**HTML** is a web page's structure and content (the skeleton). **CSS** is the style: colours, sizes and layout (the clothes). And **JavaScript** adds behaviour.",
        },
        cat: {
          who: 'thor',
          es: "HTML es mi esqueleto, CSS es mi pelaje negro brillante. Yo soy 100 % estilo.",
          en: "HTML is my skeleton, CSS is my shiny black fur. I am 100 % style.",
        },
      },
      {
        h: { es: 'Cómo empezar', en: 'Getting started' },
        p: {
          es: "Solo necesitas un editor (por ejemplo **VS Code**) y un navegador. Crea una carpeta con `index.html` y `style.css`, abre el HTML con doble clic y ¡ya tienes web! Con la extensión **Live Server** la página se recarga sola cada vez que guardas.",
          en: "All you need is an editor (for example **VS Code**) and a browser. Create a folder with `index.html` and `style.css`, double-click the HTML and you have a website! With the **Live Server** extension the page reloads every time you save.",
        },
        tip: {
          es: "Pulsa **F12** en cualquier web para abrir las herramientas de desarrollo: puedes inspeccionar cómo está hecha y probar cambios en directo.",
          en: "Press **F12** on any website to open the developer tools: you can inspect how it is built and try changes live.",
        },
      },
      {
        h: { es: 'Estructura básica de HTML', en: 'Basic HTML structure' },
        p: {
          es: "Todo son **etiquetas** que abren y cierran (`<p>…</p>`). El `<head>` tiene información para el navegador y el `<body>`, lo que se ve.",
          en: "Everything is **tags** that open and close (`<p>…</p>`). The `<head>` holds info for the browser and the `<body>`, what you see.",
        },
        code: {
          es: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mis gatos</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Thor y Hela</h1>
  <p>Dos gatos y <strong>muchas</strong> siestas.</p>
  <img src="thor.png" alt="Thor, un gato negro">
</body>
</html>`,
          en: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My cats</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Thor and Hela</h1>
  <p>Two cats and <strong>lots of</strong> naps.</p>
  <img src="thor.png" alt="Thor, a black cat">
</body>
</html>`,
        },
        warn: {
          es: "Todas las imágenes necesitan `alt`: es lo que leen los lectores de pantalla y lo que se ve si la imagen no carga.",
          en: "Every image needs `alt`: it is what screen readers read out and what shows if the image fails to load.",
        },
      },
      {
        h: { es: 'Texto, listas y enlaces', en: 'Text, lists and links' },
        code: {
          es: `<h1>Título principal</h1>
<h2>Subtítulo</h2>
<p>Un párrafo con <em>cursiva</em> y <strong>negrita</strong>.</p>

<ul>  <!-- lista sin orden -->
  <li>Thor</li>
  <li>Hela</li>
</ul>

<ol>  <!-- lista numerada -->
  <li>Comer</li>
  <li>Dormir</li>
</ol>

<a href="contacto.html">Contacto</a>
<a href="https://github.com" target="_blank">GitHub</a>`,
          en: `<h1>Main title</h1>
<h2>Subtitle</h2>
<p>A paragraph with <em>italics</em> and <strong>bold</strong>.</p>

<ul>  <!-- unordered list -->
  <li>Thor</li>
  <li>Hela</li>
</ul>

<ol>  <!-- numbered list -->
  <li>Eat</li>
  <li>Sleep</li>
</ol>

<a href="contact.html">Contact</a>
<a href="https://github.com" target="_blank">GitHub</a>`,
        },
        tip: {
          es: "Usa un solo `<h1>` por página y los títulos en orden (`h2`, luego `h3`…): ayuda a Google y a la accesibilidad.",
          en: "Use a single `<h1>` per page and keep headings in order (`h2`, then `h3`…): it helps Google and accessibility.",
        },
      },
      {
        h: { es: 'Formularios', en: 'Forms' },
        code: {
          es: `<form action="/enviar" method="post">
  <label for="nombre">Nombre</label>
  <input id="nombre" name="nombre" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email">

  <label>
    <input type="checkbox" name="gatos"> Me gustan los gatos
  </label>

  <button type="submit">Enviar</button>
</form>`,
          en: `<form action="/send" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email">

  <label>
    <input type="checkbox" name="cats"> I like cats
  </label>

  <button type="submit">Send</button>
</form>`,
        },
        warn: {
          es: "Cada campo necesita su `<label>` (unido con `for` e `id`). Y `type=\"email\"` o `required` validan en el navegador, pero **siempre** hay que validar también en el servidor.",
          en: "Every field needs its `<label>` (linked with `for` and `id`). And `type=\"email\"` or `required` validate in the browser, but you **always** have to validate on the server too.",
        },
      },
      {
        h: { es: 'Etiquetas semánticas', en: 'Semantic tags' },
        p: {
          es: "En vez de poner `<div>` para todo, usa etiquetas con significado: mejoran la **accesibilidad** y el **SEO**.",
          en: "Instead of `<div>` for everything, use tags with meaning: they improve **accessibility** and **SEO**.",
        },
        code: {
          es: `<header>Logo y título</header>
<nav>Menú</nav>
<main>
  <article>
    <h2>Cómo dormir 16 horas</h2>
  </article>
</main>
<footer>© Hela</footer>`,
          en: `<header>Logo and title</header>
<nav>Menu</nav>
<main>
  <article>
    <h2>How to sleep 16 hours</h2>
  </article>
</main>
<footer>© Hela</footer>`,
        },
      },
      {
        h: { es: 'CSS: selectores y modelo de caja', en: 'CSS: selectors and the box model' },
        p: {
          es: "Una regla CSS es **selector { propiedad: valor; }**. Se selecciona por etiqueta, por **clase** (`.gato`) o por **id** (`#thor`). Cada elemento es una **caja**: contenido + `padding` + `border` + `margin`.",
          en: "A CSS rule is **selector { property: value; }**. You select by tag, by **class** (`.cat`) or by **id** (`#thor`). Every element is a **box**: content + `padding` + `border` + `margin`.",
        },
        lang: 'css',
        code: {
          es: `/* etiqueta, clase e id */
h1 { color: #6a4fd8; }

.gato {
  border: 2px solid black;
  padding: 12px;     /* espacio por dentro */
  margin: 8px;       /* espacio por fuera */
}

#thor { background: #1d1a3f; color: white; }`,
          en: `/* tag, class and id */
h1 { color: #6a4fd8; }

.cat {
  border: 2px solid black;
  padding: 12px;     /* space inside */
  margin: 8px;       /* space outside */
}

#thor { background: #1d1a3f; color: white; }`,
        },
        tip: {
          es: "Empieza tus hojas con `* { box-sizing: border-box; }`: así el ancho incluye el `padding` y el `border`, y las cuentas salen.",
          en: "Start your stylesheets with `* { box-sizing: border-box; }`: width then includes `padding` and `border`, and the maths works out.",
        },
      },
      {
        h: { es: 'Colores, fuentes y unidades', en: 'Colours, fonts and units' },
        lang: 'css',
        code: {
          es: `:root {
  --lila: #b79cf5;             /* variable CSS reutilizable */
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;             /* px: tamaño fijo */
  color: #1d1a3f;
}

h1 { font-size: 2rem; }        /* rem: relativo a la letra base */
.foto { width: 50%; }          /* %: relativo al contenedor */
.banner {
  height: 40vh;                /* vh: % de la altura de la pantalla */
  background: var(--lila);
}`,
          en: `:root {
  --lilac: #b79cf5;            /* reusable CSS variable */
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;             /* px: fixed size */
  color: #1d1a3f;
}

h1 { font-size: 2rem; }        /* rem: relative to the base font */
.photo { width: 50%; }         /* %: relative to the container */
.banner {
  height: 40vh;                /* vh: % of the screen height */
  background: var(--lilac);
}`,
        },
      },
      {
        h: { es: 'Flexbox y diseño adaptable', en: 'Flexbox and responsive design' },
        p: {
          es: "`display: flex` coloca los hijos en fila (o columna) y reparte el espacio. Con `@media` cambias el diseño según el ancho de la pantalla.",
          en: "`display: flex` lays children out in a row (or column) and shares the space. With `@media` you change the layout depending on screen width.",
        },
        lang: 'css',
        code: {
          es: `.gatos {
  display: flex;
  gap: 16px;
  justify-content: center;   /* eje principal */
  align-items: center;       /* eje cruzado */
}

@media (max-width: 600px) {
  .gatos { flex-direction: column; }   /* en móvil, uno debajo de otro */
}`,
          en: `.cats {
  display: flex;
  gap: 16px;
  justify-content: center;   /* main axis */
  align-items: center;       /* cross axis */
}

@media (max-width: 600px) {
  .cats { flex-direction: column; }   /* on mobile, stacked */
}`,
        },
        cat: {
          who: 'hela',
          es: "Flexbox es como nosotros en el sofá: en fila, con el `gap` justo para no molestarnos.",
          en: "Flexbox is like us on the sofa: in a row, with just enough `gap` not to bother each other.",
        },
      },
    ],
  },

  /* ================================================================ JavaScript */
  {
    id: 'js',
    icon: '✨',
    color: '#ffe45c',
    lang: 'js',
    title: { es: 'JavaScript', en: 'JavaScript' },
    sections: [
      {
        h: { es: '¿Qué es JavaScript?', en: 'What is JavaScript?' },
        p: {
          es: "El lenguaje que hace **interactivas** las webs: responde a clics, cambia la página sin recargar y pide datos a servidores. Se ejecuta en el **navegador** (y también en servidores con **Node.js**).",
          en: "The language that makes websites **interactive**: it reacts to clicks, changes the page without reloading and asks servers for data. It runs in the **browser** (and on servers with **Node.js**).",
        },
        cat: {
          who: 'hela',
          es: "JavaScript y Java se parecen como yo y un perro: solo en el nombre.",
          en: "JavaScript and Java are as alike as me and a dog: only in the name.",
        },
      },
      {
        h: { es: 'Cómo empezar', en: 'Getting started' },
        p: {
          es: "Crea un `app.js` y enlázalo desde el HTML con `<script src=\"app.js\" defer></script>`. Para ver los mensajes, abre la **consola** con F12. ¡También puedes escribir JavaScript directamente en ella!",
          en: "Create an `app.js` and link it from the HTML with `<script src=\"app.js\" defer></script>`. To see your messages, open the **console** with F12. You can also type JavaScript straight into it!",
        },
        code: {
          es: `// app.js
console.log("¡Hola desde la consola! 🐾");
alert("Esto es un aviso");`,
          en: `// app.js
console.log("Hello from the console! 🐾");
alert("This is an alert");`,
        },
      },
      {
        h: { es: 'Variables y tipos', en: 'Variables and types' },
        code: {
          es: `const nombre = "Thor";   // no se puede reasignar
let vidas = 7;           // sí se puede cambiar
vidas = vidas - 1;

typeof nombre;           // "string"
typeof vidas;            // "number"
typeof true;             // "boolean"
let sinValor;            // undefined
const nada = null;

console.log(\`\${nombre} tiene \${vidas} vidas\`);   // plantilla con comillas invertidas`,
          en: `const name = "Thor";     // cannot be reassigned
let lives = 9;           // can change
lives = lives - 1;

typeof name;             // "string"
typeof lives;            // "number"
typeof true;             // "boolean"
let noValue;             // undefined
const nothing = null;

console.log(\`\${name} has \${lives} lives\`);   // template literal with backticks`,
        },
        tip: {
          es: "Usa `const` por defecto y `let` solo si el valor va a cambiar. Evita `var`, que es la forma antigua y da sorpresas.",
          en: "Use `const` by default and `let` only if the value will change. Avoid `var`, the old way, which brings surprises.",
        },
      },
      {
        h: { es: 'Condicionales y bucles', en: 'Conditionals and loops' },
        code: {
          es: `const hambre = 8;

if (hambre > 5) {
  console.log("¡Comida ya! 😾");
} else if (hambre > 0) {
  console.log("Un snack…");
} else {
  console.log("Siesta 😴");
}

for (let i = 1; i <= 3; i++) {
  console.log("Miau " + i);
}`,
          en: `const hunger = 8;

if (hunger > 5) {
  console.log("Food now! 😾");
} else if (hunger > 0) {
  console.log("A snack…");
} else {
  console.log("Nap time 😴");
}

for (let i = 1; i <= 3; i++) {
  console.log("Meow " + i);
}`,
        },
        warn: {
          es: "Compara con `===` y no con `==`: `\"5\" == 5` da `true` porque convierte tipos, pero `\"5\" === 5` da `false`.",
          en: "Compare with `===`, not `==`: `\"5\" == 5` is `true` because it converts types, but `\"5\" === 5` is `false`.",
        },
      },
      {
        h: { es: 'Arrays y objetos', en: 'Arrays and objects' },
        code: {
          es: `const gatos = ["Thor", "Hela"];
gatos.push("Loki");
console.log(gatos.length);            // 3

const gata = { nombre: "Hela", color: "atigrada", siestas: 9 };
console.log(gata.nombre);             // Hela
gata.siestas++;                       // 10

// Métodos muy útiles
const saludos = gatos.map(g => "Hola, " + g);
const cortos = gatos.filter(g => g.length <= 4);
gatos.forEach(g => console.log(g));`,
          en: `const cats = ["Thor", "Hela"];
cats.push("Loki");
console.log(cats.length);             // 3

const cat = { name: "Hela", colour: "tabby", naps: 9 };
console.log(cat.name);                // Hela
cat.naps++;                           // 10

// Very handy methods
const greetings = cats.map(c => "Hi, " + c);
const short = cats.filter(c => c.length <= 4);
cats.forEach(c => console.log(c));`,
        },
      },
      {
        h: { es: 'Funciones', en: 'Functions' },
        code: {
          es: `function saludar(nombre) {
  return "¡Miau, " + nombre + "!";
}

// Función flecha: lo mismo, más corto
const saludarCorto = (nombre) => "¡Miau, " + nombre + "!";

console.log(saludar("Thor"));        // ¡Miau, Thor!`,
          en: `function greet(name) {
  return "Meow, " + name + "!";
}

// Arrow function: the same, shorter
const greetShort = (name) => "Meow, " + name + "!";

console.log(greet("Thor"));          // Meow, Thor!`,
        },
        cat: {
          who: 'thor',
          es: "Las funciones flecha son como yo yendo al comedero: directas y sin rodeos. ⚡",
          en: "Arrow functions are like me heading to the food bowl: straight to the point. ⚡",
        },
      },
      {
        h: { es: 'El DOM: tocar la página', en: 'The DOM: changing the page' },
        p: {
          es: "El **DOM** es la página convertida en objetos. Con `querySelector` eliges un elemento y con `addEventListener` reaccionas a lo que hace el usuario.",
          en: "The **DOM** is the page turned into objects. With `querySelector` you pick an element and with `addEventListener` you react to what the user does.",
        },
        code: {
          es: `// HTML:  <button id="comida">Dar de comer</button>
//        <p id="estado">Thor tiene hambre</p>

const boton = document.querySelector("#comida");
const estado = document.querySelector("#estado");

boton.addEventListener("click", () => {
  estado.textContent = "Thor está comiendo 🐟";
  boton.disabled = true;
});`,
          en: `// HTML:  <button id="food">Feed</button>
//        <p id="status">Thor is hungry</p>

const button = document.querySelector("#food");
const status = document.querySelector("#status");

button.addEventListener("click", () => {
  status.textContent = "Thor is eating 🐟";
  button.disabled = true;
});`,
        },
        tip: {
          es: "Así funciona, más o menos, el comedero de este escritorio 😉",
          en: "That's roughly how the food bowl on this desktop works 😉",
        },
      },
      {
        h: { es: 'Pedir datos: fetch y async/await', en: 'Fetching data: fetch and async/await' },
        p: {
          es: "`fetch` pide datos a un servidor. Con `async`/`await` esperas la respuesta **sin congelar** la página, y con `try`/`catch` controlas los errores.",
          en: "`fetch` requests data from a server. With `async`/`await` you wait for the answer **without freezing** the page, and `try`/`catch` handles errors.",
        },
        code: {
          es: `async function fotoDeGato() {
  try {
    const respuesta = await fetch("https://api.thecatapi.com/v1/images/search");
    const datos = await respuesta.json();
    console.log(datos[0].url);          // una foto de gato al azar
  } catch (error) {
    console.error("Algo ha fallado:", error);
  }
}

fotoDeGato();`,
          en: `async function catPicture() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    console.log(data[0].url);           // a random cat picture
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

catPicture();`,
        },
      },
    ],
  },

  /* ================================================================ PHP */
  {
    id: 'php',
    icon: '🐘',
    color: '#a9b8ff',
    lang: 'php',
    title: { es: 'PHP', en: 'PHP' },
    sections: [
      {
        h: { es: '¿Qué es PHP?', en: 'What is PHP?' },
        p: {
          es: "Un lenguaje de **servidor**: el servidor ejecuta el PHP y envía al navegador solo el **HTML resultante**. Sirve para webs con formularios, usuarios y bases de datos. **WordPress** está hecho en PHP.",
          en: "A **server-side** language: the server runs the PHP and sends the browser only the **resulting HTML**. It powers sites with forms, users and databases. **WordPress** is built with PHP.",
        },
        cat: {
          who: 'hela',
          es: "El navegador nunca ve tu PHP, solo el resultado. Como mis travesuras: tú solo ves el jarrón roto.",
          en: "The browser never sees your PHP, only the result. Like my mischief: you only see the broken vase.",
        },
      },
      {
        h: { es: 'Cómo empezar', en: 'Getting started' },
        p: {
          es: "Instala **XAMPP** (trae Apache, MySQL y PHP), guarda tus archivos en la carpeta `htdocs` y ábrelos en `http://localhost`. Los archivos PHP terminan en `.php` y el código va entre `<?php` y `?>`.",
          en: "Install **XAMPP** (it bundles Apache, MySQL and PHP), save your files in the `htdocs` folder and open them at `http://localhost`. PHP files end in `.php` and the code goes between `<?php` and `?>`.",
        },
        code: {
          es: `<?php
// index.php
echo "¡Hola, mundo! 🐾";
?>`,
          en: `<?php
// index.php
echo "Hello, world! 🐾";
?>`,
        },
        tip: {
          es: "Sin XAMPP: si tienes PHP instalado, `php -S localhost:8000` levanta un servidor en la carpeta en la que estés.",
          en: "Without XAMPP: if PHP is installed, `php -S localhost:8000` starts a server in the current folder.",
        },
      },
      {
        h: { es: 'Variables y tipos', en: 'Variables and types' },
        code: {
          es: `<?php
$nombre = "Thor";          // string
$vidas = 7;                // int
$peso = 5.2;               // float
$hambre = true;            // bool

echo "Hola, $nombre";                 // las comillas dobles meten la variable
echo 'Tiene ' . $vidas . ' vidas';    // el punto une textos
var_dump($peso);                      // float(5.2)`,
          en: `<?php
$name = "Thor";            // string
$lives = 9;                // int
$weight = 5.2;             // float
$hungry = true;            // bool

echo "Hello, $name";                  // double quotes insert the variable
echo 'Has ' . $lives . ' lives';      // the dot joins strings
var_dump($weight);                    // float(5.2)`,
        },
        warn: {
          es: "Todas las variables empiezan por `$` y cada instrucción termina en `;`. Olvidar el punto y coma es el error número 1.",
          en: "Every variable starts with `$` and every statement ends with `;`. Forgetting the semicolon is mistake number 1.",
        },
      },
      {
        h: { es: 'Condicionales y bucles', en: 'Conditionals and loops' },
        code: {
          es: `<?php
$hambre = 8;

if ($hambre > 5) {
    echo "¡Comida ya!";
} elseif ($hambre > 0) {
    echo "Un snack…";
} else {
    echo "Siesta";
}

for ($i = 1; $i <= 3; $i++) {
    echo "Miau $i<br>";
}`,
          en: `<?php
$hunger = 8;

if ($hunger > 5) {
    echo "Food now!";
} elseif ($hunger > 0) {
    echo "A snack…";
} else {
    echo "Nap time";
}

for ($i = 1; $i <= 3; $i++) {
    echo "Meow $i<br>";
}`,
        },
      },
      {
        h: { es: 'Arrays', en: 'Arrays' },
        code: {
          es: `<?php
$gatos = ["Thor", "Hela"];            // array indexado
$gatos[] = "Loki";                    // añadir al final
echo count($gatos);                   // 3

$gata = ["nombre" => "Hela", "color" => "atigrada"];   // array asociativo
echo $gata["color"];                  // atigrada

foreach ($gatos as $gato) {
    echo "<li>$gato</li>";
}`,
          en: `<?php
$cats = ["Thor", "Hela"];             // indexed array
$cats[] = "Loki";                     // add to the end
echo count($cats);                    // 3

$cat = ["name" => "Hela", "colour" => "tabby"];   // associative array
echo $cat["colour"];                  // tabby

foreach ($cats as $c) {
    echo "<li>$c</li>";
}`,
        },
      },
      {
        h: { es: 'Funciones', en: 'Functions' },
        code: {
          es: `<?php
function saludar(string $nombre, string $emoji = "🐾"): string {
    return "¡Miau, $nombre! $emoji";
}

echo saludar("Thor", "⚡");     // ¡Miau, Thor! ⚡`,
          en: `<?php
function greet(string $name, string $emoji = "🐾"): string {
    return "Meow, $name! $emoji";
}

echo greet("Thor", "⚡");       // Meow, Thor! ⚡`,
        },
        tip: {
          es: "Indicar los tipos (`string`, `int`…) es opcional, pero ayuda a encontrar errores antes.",
          en: "Declaring types (`string`, `int`…) is optional, but it helps you catch mistakes earlier.",
        },
      },
      {
        h: { es: 'Recibir formularios', en: 'Handling forms' },
        p: {
          es: "Lo que envía un `<form method=\"post\">` llega en `$_POST` (y con `method=\"get\"`, en `$_GET`).",
          en: "Whatever a `<form method=\"post\">` sends arrives in `$_POST` (and with `method=\"get\"`, in `$_GET`).",
        },
        code: {
          es: `<?php
// procesar.php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST["nombre"] ?? "");

    if ($nombre === "") {
        echo "Falta el nombre";
    } else {
        echo "Hola, " . htmlspecialchars($nombre);
    }
}`,
          en: `<?php
// process.php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");

    if ($name === "") {
        echo "Name is missing";
    } else {
        echo "Hello, " . htmlspecialchars($name);
    }
}`,
        },
        warn: {
          es: "Nunca muestres lo que escribe el usuario sin `htmlspecialchars()`: podrían colarte código JavaScript (ataque **XSS**).",
          en: "Never print user input without `htmlspecialchars()`: someone could sneak in JavaScript code (an **XSS** attack).",
        },
      },
      {
        h: { es: 'Base de datos con PDO', en: 'Databases with PDO' },
        p: {
          es: "**PDO** conecta PHP con MySQL (y otras bases de datos). Usa siempre **consultas preparadas**: los datos van aparte, marcados con `?`.",
          en: "**PDO** connects PHP to MySQL (and other databases). Always use **prepared statements**: the data goes separately, marked with `?`.",
        },
        code: {
          es: `<?php
$pdo = new PDO("mysql:host=localhost;dbname=gatera;charset=utf8mb4", "usuario", "clave");

$consulta = $pdo->prepare("SELECT nombre, siestas FROM gatos WHERE siestas > ?");
$consulta->execute([6]);

foreach ($consulta->fetchAll(PDO::FETCH_ASSOC) as $fila) {
    echo $fila["nombre"] . ": " . $fila["siestas"] . "<br>";
}`,
          en: `<?php
$pdo = new PDO("mysql:host=localhost;dbname=cattery;charset=utf8mb4", "user", "password");

$query = $pdo->prepare("SELECT name, naps FROM cats WHERE naps > ?");
$query->execute([6]);

foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $row) {
    echo $row["name"] . ": " . $row["naps"] . "<br>";
}`,
        },
        warn: {
          es: "Nunca metas datos del usuario directamente dentro del SQL: es la puerta a la **inyección SQL**. Las consultas preparadas lo evitan.",
          en: "Never paste user data straight into the SQL: it opens the door to **SQL injection**. Prepared statements prevent it.",
        },
        cat: {
          who: 'thor',
          es: "Esto conecta con la pestaña de SQL. Todo está conectado. Como yo con la hora de la cena.",
          en: "This links to the SQL tab. Everything is connected. Like me and dinner time.",
        },
      },
    ],
  },

  /* ================================================================ SQL */
  {
    id: 'sql',
    icon: '🗃️',
    color: '#7fe3ff',
    lang: 'sql',
    title: { es: 'SQL', en: 'SQL' },
    sections: [
      {
        h: { es: '¿Qué es SQL?', en: 'What is SQL?' },
        p: {
          es: "El lenguaje para hablar con **bases de datos relacionales** (MySQL, PostgreSQL, SQLite…). Los datos se guardan en **tablas**: cada **fila** es un registro y cada **columna**, un dato.",
          en: "The language for talking to **relational databases** (MySQL, PostgreSQL, SQLite…). Data lives in **tables**: each **row** is a record and each **column** a field.",
        },
        cat: {
          who: 'hela',
          es: "Una tabla es como una hoja de cálculo muy ordenada. Yo ocupo la fila de las siestas.",
          en: "A table is like a very tidy spreadsheet. I own the naps row.",
        },
      },
      {
        h: { es: 'Cómo empezar', en: 'Getting started' },
        p: {
          es: "Lo más sencillo es **SQLite**: la base de datos es un solo archivo y no necesita servidor (con **DB Browser for SQLite** tienes interfaz gráfica). Si usas XAMPP, **MySQL** viene incluido y se gestiona desde **phpMyAdmin**.",
          en: "The easiest option is **SQLite**: the whole database is one file and needs no server (**DB Browser for SQLite** gives you a GUI). If you use XAMPP, **MySQL** is included and managed from **phpMyAdmin**.",
        },
        lang: 'bash',
        code: {
          es: `sqlite3 gatera.db     # crea (o abre) la base de datos
.tables               # dentro de sqlite: ver las tablas
.quit                 # salir`,
          en: `sqlite3 cattery.db    # create (or open) the database
.tables               # inside sqlite: list tables
.quit                 # exit`,
        },
      },
      {
        h: { es: 'Tipos de datos comunes', en: 'Common data types' },
        table: {
          es: [
            ['Tipo', 'Para qué', 'Ejemplo'],
            ['`INT`', 'Números enteros', '`9`'],
            ['`DECIMAL(5,2)`', 'Decimales exactos (dinero, pesos)', '`5.20`'],
            ['`VARCHAR(n)`', 'Texto corto de hasta n caracteres', "`'Hela'`"],
            ['`TEXT`', 'Texto largo', 'una descripción'],
            ['`DATE`', 'Fechas', "`'2026-09-18'`"],
            ['`BOOLEAN`', 'Sí / no', '`TRUE`'],
          ],
          en: [
            ['Type', 'Used for', 'Example'],
            ['`INT`', 'Whole numbers', '`9`'],
            ['`DECIMAL(5,2)`', 'Exact decimals (money, weights)', '`5.20`'],
            ['`VARCHAR(n)`', 'Short text up to n characters', "`'Hela'`"],
            ['`TEXT`', 'Long text', 'a description'],
            ['`DATE`', 'Dates', "`'2026-09-18'`"],
            ['`BOOLEAN`', 'Yes / no', '`TRUE`'],
          ],
        },
      },
      {
        h: { es: 'Crear una tabla e insertar datos', en: 'Create a table and insert data' },
        p: {
          es: "`CREATE TABLE` define las columnas y su tipo. La **clave primaria** (`PRIMARY KEY`) identifica cada fila sin repetirse.",
          en: "`CREATE TABLE` defines the columns and their type. The **primary key** (`PRIMARY KEY`) identifies each row and never repeats.",
        },
        code: {
          es: `CREATE TABLE gatos (
  id      INT PRIMARY KEY,
  nombre  VARCHAR(30),
  color   VARCHAR(20),
  siestas INT
);

INSERT INTO gatos (id, nombre, color, siestas)
VALUES (1, 'Thor', 'negro', 5),
       (2, 'Hela', 'atigrada', 9);`,
          en: `CREATE TABLE cats (
  id     INT PRIMARY KEY,
  name   VARCHAR(30),
  colour VARCHAR(20),
  naps   INT
);

INSERT INTO cats (id, name, colour, naps)
VALUES (1, 'Thor', 'black', 5),
       (2, 'Hela', 'tabby', 9);`,
        },
      },
      {
        h: { es: 'Consultar: SELECT', en: 'Querying: SELECT' },
        p: {
          es: "`SELECT` elige columnas, `WHERE` filtra filas y `ORDER BY` ordena (`DESC` = de mayor a menor).",
          en: "`SELECT` picks columns, `WHERE` filters rows and `ORDER BY` sorts (`DESC` = highest first).",
        },
        code: {
          es: `SELECT nombre, siestas
FROM gatos
WHERE siestas > 6
ORDER BY siestas DESC;

-- Resultado: Hela | 9`,
          en: `SELECT name, naps
FROM cats
WHERE naps > 6
ORDER BY naps DESC;

-- Result: Hela | 9`,
        },
        tip: {
          es: "`SELECT *` trae todas las columnas: cómodo para explorar, pero en código real mejor nombrar solo las que necesitas.",
          en: "`SELECT *` brings every column: handy for exploring, but in real code name only the ones you need.",
        },
      },
      {
        h: { es: 'Filtrar mejor', en: 'Better filtering' },
        code: {
          es: `SELECT * FROM gatos WHERE color = 'negro' AND siestas >= 5;
SELECT * FROM gatos WHERE nombre LIKE 'H%';          -- empieza por H
SELECT * FROM gatos WHERE id IN (1, 2);
SELECT * FROM gatos WHERE siestas BETWEEN 5 AND 10;
SELECT nombre FROM gatos ORDER BY nombre LIMIT 1;    -- solo el primero`,
          en: `SELECT * FROM cats WHERE colour = 'black' AND naps >= 5;
SELECT * FROM cats WHERE name LIKE 'H%';             -- starts with H
SELECT * FROM cats WHERE id IN (1, 2);
SELECT * FROM cats WHERE naps BETWEEN 5 AND 10;
SELECT name FROM cats ORDER BY name LIMIT 1;         -- only the first one`,
        },
      },
      {
        h: { es: 'Resúmenes: COUNT, AVG, GROUP BY', en: 'Summaries: COUNT, AVG, GROUP BY' },
        code: {
          es: `SELECT COUNT(*) AS total, AVG(siestas) AS media, MAX(siestas) AS record
FROM gatos;

SELECT color, COUNT(*) AS cuantos
FROM gatos
GROUP BY color
HAVING COUNT(*) >= 1;`,
          en: `SELECT COUNT(*) AS total, AVG(naps) AS average, MAX(naps) AS record
FROM cats;

SELECT colour, COUNT(*) AS how_many
FROM cats
GROUP BY colour
HAVING COUNT(*) >= 1;`,
        },
        tip: {
          es: "`WHERE` filtra filas **antes** de agrupar; `HAVING` filtra los grupos **después**.",
          en: "`WHERE` filters rows **before** grouping; `HAVING` filters groups **after**.",
        },
      },
      {
        h: { es: 'Modificar y borrar', en: 'Update and delete' },
        code: {
          es: `UPDATE gatos SET siestas = siestas + 1
WHERE nombre = 'Thor';

DELETE FROM gatos
WHERE id = 3;`,
          en: `UPDATE cats SET naps = naps + 1
WHERE name = 'Thor';

DELETE FROM cats
WHERE id = 3;`,
        },
        warn: {
          es: "Un `UPDATE` o `DELETE` **sin `WHERE`** afecta a **todas** las filas. Revisa siempre el `WHERE` antes de pulsar Enter.",
          en: "An `UPDATE` or `DELETE` **without `WHERE`** hits **every** row. Always check the `WHERE` before pressing Enter.",
        },
      },
      {
        h: { es: 'Relaciones y JOIN', en: 'Relationships and JOIN' },
        p: {
          es: "Una **clave foránea** (`FOREIGN KEY`) enlaza una tabla con otra. `JOIN` combina sus filas en una misma consulta.",
          en: "A **foreign key** (`FOREIGN KEY`) links one table to another. `JOIN` combines their rows in a single query.",
        },
        code: {
          es: `CREATE TABLE comidas (
  id      INT PRIMARY KEY,
  gato_id INT,
  fecha   DATE,
  FOREIGN KEY (gato_id) REFERENCES gatos(id)
);

SELECT g.nombre, COUNT(c.id) AS comidas
FROM gatos g
JOIN comidas c ON c.gato_id = g.id
GROUP BY g.nombre;`,
          en: `CREATE TABLE meals (
  id     INT PRIMARY KEY,
  cat_id INT,
  day    DATE,
  FOREIGN KEY (cat_id) REFERENCES cats(id)
);

SELECT c.name, COUNT(m.id) AS meals
FROM cats c
JOIN meals m ON m.cat_id = c.id
GROUP BY c.name;`,
        },
        cat: {
          who: 'thor',
          es: "El `COUNT()` de mis comidas siempre sale bajo. Exijo una auditoría.",
          en: "The `COUNT()` of my meals always comes out low. I demand an audit.",
        },
      },
    ],
  },

  /* ================================================================ Python */
  {
    id: 'python',
    icon: '🐍',
    color: '#ffb38a',
    lang: 'python',
    title: { es: 'Python', en: 'Python' },
    sections: [
      {
        h: { es: '¿Qué es Python?', en: 'What is Python?' },
        p: {
          es: "Un lenguaje **interpretado** y muy legible: se ejecuta línea a línea, sin compilar. Se usa en **inteligencia artificial** (TensorFlow, PyTorch), automatización, análisis de datos y backend web (FastAPI, Django).",
          en: "An **interpreted**, very readable language: it runs line by line, with no compile step. It is used for **artificial intelligence** (TensorFlow, PyTorch), automation, data analysis and web backends (FastAPI, Django).",
        },
        cat: {
          who: 'hela',
          es: "En Python la **indentación** importa: los bloques se marcan con espacios, no con llaves. Como mi siesta: sin interrupciones.",
          en: "In Python **indentation** matters: blocks are marked with spaces, not braces. Like my naps: no interruptions.",
        },
      },
      {
        h: { es: 'Cómo empezar', en: 'Getting started' },
        p: {
          es: "Descárgalo de **python.org** (en Windows, marca la casilla **Add Python to PATH**). Escribe el código en un archivo `.py` y ejecútalo desde la terminal.",
          en: "Download it from **python.org** (on Windows, tick **Add Python to PATH**). Write your code in a `.py` file and run it from the terminal.",
        },
        lang: 'bash',
        code: {
          es: `python --version      # comprueba la instalación
python                # consola interactiva (sal con exit())
python hola.py        # ejecuta un archivo`,
          en: `python --version      # check the installation
python                # interactive console (leave with exit())
python hello.py       # run a file`,
        },
      },
      {
        h: { es: 'Variables y tipos', en: 'Variables and types' },
        p: {
          es: "No hace falta declarar el tipo: Python lo deduce (**tipado dinámico**). Los básicos son `str`, `int`, `float` y `bool`.",
          en: "You don't declare the type: Python infers it (**dynamic typing**). The basics are `str`, `int`, `float` and `bool`.",
        },
        code: {
          es: `nombre = "Thor"        # str
vidas = 7              # int (los gatos tienen siete vidas)
peso = 5.2             # float
tiene_hambre = True    # bool (siempre 😼)

print(f"{nombre} tiene {vidas} vidas")
print(type(peso))      # <class 'float'>`,
          en: `name = "Thor"          # str
lives = 9              # int (cats have nine lives)
weight = 5.2           # float
is_hungry = True       # bool (always 😼)

print(f"{name} has {lives} lives")
print(type(weight))    # <class 'float'>`,
        },
        tip: {
          es: "Las **f-strings** (`f\"...\"`) meten variables dentro del texto entre llaves. Son la forma más cómoda de formatear.",
          en: "**f-strings** (`f\"...\"`) put variables inside text using braces. They are the easiest way to format strings.",
        },
      },
      {
        h: { es: 'Entrada y salida', en: 'Input and output' },
        code: {
          es: `nombre = input("¿Cómo te llamas? ")
edad = int(input("¿Cuántos años tienes? "))
print(f"Hola, {nombre}. El año que viene tendrás {edad + 1}.")`,
          en: `name = input("What's your name? ")
age = int(input("How old are you? "))
print(f"Hi, {name}. Next year you'll be {age + 1}.")`,
        },
        warn: {
          es: "`input()` siempre devuelve **texto**. Para hacer cuentas conviértelo con `int()` o `float()`.",
          en: "`input()` always returns **text**. Convert it with `int()` or `float()` before doing maths.",
        },
      },
      {
        h: { es: 'Condicionales y bucles', en: 'Conditionals and loops' },
        p: {
          es: "`if` / `elif` / `else` deciden qué se ejecuta. `for` recorre una colección y `while` repite mientras se cumpla una condición.",
          en: "`if` / `elif` / `else` decide what runs. `for` walks through a collection and `while` repeats while a condition is true.",
        },
        code: {
          es: `gatos = ["Thor", "Hela"]
for gato in gatos:
    print(f"Hola, {gato}")

comida = 0
while comida < 3:
    comida += 1

if comida >= 3:
    print("¡Llenos! 😌")
else:
    print("Más, humana 😾")`,
          en: `cats = ["Thor", "Hela"]
for cat in cats:
    print(f"Hi, {cat}")

food = 0
while food < 3:
    food += 1

if food >= 3:
    print("Full! 😌")
else:
    print("More, human 😾")`,
        },
        warn: {
          es: "`=` asigna y `==` compara. Y no mezcles tabuladores con espacios: `IndentationError` asegurado.",
          en: "`=` assigns and `==` compares. And don't mix tabs and spaces: `IndentationError` guaranteed.",
        },
      },
      {
        h: { es: 'Listas y diccionarios', en: 'Lists and dictionaries' },
        p: {
          es: "Una **lista** guarda elementos en orden (se accede por posición). Un **diccionario** guarda parejas clave → valor (se accede por nombre).",
          en: "A **list** stores items in order (accessed by position). A **dictionary** stores key → value pairs (accessed by name).",
        },
        code: {
          es: `gatos = ["Thor", "Hela"]
gatos.append("Loki")     # ¿un tercer gato? 👀
print(gatos[0])          # Thor
print(len(gatos))        # 3

gata = {"nombre": "Hela", "color": "atigrada"}
print(gata["color"])     # atigrada
gata["siesta"] = True    # añadir una clave nueva`,
          en: `cats = ["Thor", "Hela"]
cats.append("Loki")      # a third cat? 👀
print(cats[0])           # Thor
print(len(cats))         # 3

cat = {"name": "Hela", "colour": "tabby"}
print(cat["colour"])     # tabby
cat["napping"] = True    # add a new key`,
        },
        warn: {
          es: "Las posiciones empiezan en **0**, no en 1. `gatos[3]` en una lista de 3 elementos da `IndexError`.",
          en: "Positions start at **0**, not 1. `cats[3]` on a 3-item list raises `IndexError`.",
        },
      },
      {
        h: { es: 'Funciones', en: 'Functions' },
        p: {
          es: "Se definen con `def`. Pueden tener **parámetros con valor por defecto** y devolver un resultado con `return`.",
          en: "Defined with `def`. They can have **default parameter values** and give back a result with `return`.",
        },
        code: {
          es: `def saludar(nombre, emoji="🐾"):
    """Devuelve un saludo gatuno."""
    return f"¡Miau, {nombre}! {emoji}"

print(saludar("Thor", "⚡"))   # ¡Miau, Thor! ⚡
print(saludar("Hela"))        # ¡Miau, Hela! 🐾`,
          en: `def greet(name, emoji="🐾"):
    """Return a cat-style greeting."""
    return f"Meow, {name}! {emoji}"

print(greet("Thor", "⚡"))   # Meow, Thor! ⚡
print(greet("Hela"))        # Meow, Hela! 🐾`,
        },
        cat: {
          who: 'thor',
          es: "Una función es como pedir comida: la llamas con tus datos y te **devuelve** algo. Yo la llamo a las 6 de la mañana.",
          en: "A function is like asking for food: you call it with your data and it **returns** something. I call it at 6 am.",
        },
      },
      {
        h: { es: 'Errores: try / except', en: 'Errors: try / except' },
        code: {
          es: `try:
    croquetas = int(input("¿Cuántas croquetas? "))
    print(100 / croquetas)
except ValueError:
    print("Eso no es un número 😾")
except ZeroDivisionError:
    print("¿Cero croquetas? Inaceptable.")`,
          en: `try:
    kibble = int(input("How much kibble? "))
    print(100 / kibble)
except ValueError:
    print("That's not a number 😾")
except ZeroDivisionError:
    print("Zero kibble? Unacceptable.")`,
        },
      },
      {
        h: { es: 'Módulos y pip', en: 'Modules and pip' },
        p: {
          es: "Con `import` usas código ya hecho: la **biblioteca estándar** trae muchísimo. Las librerías externas se instalan con **pip**.",
          en: "With `import` you use ready-made code: the **standard library** includes a lot. External libraries are installed with **pip**.",
        },
        code: {
          es: `import random
from datetime import date

print(random.choice(["Thor", "Hela"]))   # un gato al azar
print(date.today())

# En la terminal, para instalar librerías externas:
# pip install requests`,
          en: `import random
from datetime import date

print(random.choice(["Thor", "Hela"]))   # a random cat
print(date.today())

# In the terminal, to install external libraries:
# pip install requests`,
        },
        tip: {
          es: "Crea un **entorno virtual** por proyecto (`python -m venv .venv`) para que las librerías de uno no choquen con las de otro.",
          en: "Create a **virtual environment** per project (`python -m venv .venv`) so libraries from one project don't clash with another.",
        },
      },
    ],
  },

  /* ================================================================ Java */
  {
    id: 'java',
    icon: '☕',
    color: '#ff8fc7',
    lang: 'java',
    title: { es: 'Java · POO', en: 'Java · OOP' },
    sections: [
      {
        h: { es: '¿Qué es Java?', en: 'What is Java?' },
        p: {
          es: "Un lenguaje **compilado a bytecode** que ejecuta la máquina virtual (**JVM**): «escríbelo una vez, ejecútalo en cualquier sitio». Es de **tipado estático** y todo vive dentro de **clases**. Es la base clásica para aprender **Programación Orientada a Objetos (POO)**.",
          en: "A language **compiled to bytecode** that runs on the virtual machine (**JVM**): “write once, run anywhere”. It is **statically typed** and everything lives inside **classes**. It is the classic way to learn **Object-Oriented Programming (OOP)**.",
        },
      },
      {
        h: { es: 'Cómo empezar', en: 'Getting started' },
        p: {
          es: "Instala un **JDK** (por ejemplo, Eclipse Temurin) y un editor como **IntelliJ IDEA** o VS Code. Todo programa empieza en el método `main`.",
          en: "Install a **JDK** (for example, Eclipse Temurin) and an editor like **IntelliJ IDEA** or VS Code. Every program starts in the `main` method.",
        },
        code: {
          es: `// Hola.java  (el archivo se llama igual que la clase)
public class Hola {
    public static void main(String[] args) {
        System.out.println("¡Hola, mundo! 🐾");
    }
}

// En la terminal:  javac Hola.java   y después   java Hola`,
          en: `// Hello.java  (the file is named like the class)
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world! 🐾");
    }
}

// In the terminal:  javac Hello.java   then   java Hello`,
        },
      },
      {
        h: { es: 'Tipos, variables y control', en: 'Types, variables and control flow' },
        code: {
          es: `int vidas = 7;
double peso = 5.2;
boolean hambre = true;
String nombre = "Hela";
final int PATAS = 4;          // constante

if (hambre && vidas > 0) {
    System.out.println(nombre + " quiere comer");
}

for (int i = 1; i <= 3; i++) {
    System.out.println("Miau " + i);
}`,
          en: `int lives = 9;
double weight = 5.2;
boolean hungry = true;
String name = "Hela";
final int PAWS = 4;           // constant

if (hungry && lives > 0) {
    System.out.println(name + " wants food");
}

for (int i = 1; i <= 3; i++) {
    System.out.println("Meow " + i);
}`,
        },
        tip: {
          es: "Al tener **tipos estáticos**, el compilador avisa de muchos errores antes de ejecutar el programa.",
          en: "With **static types**, the compiler flags many mistakes before the program even runs.",
        },
      },
      {
        h: { es: 'Arrays y ArrayList', en: 'Arrays and ArrayList' },
        code: {
          es: `import java.util.ArrayList;   // va al principio del archivo

String[] fijos = {"Thor", "Hela"};          // array: tamaño fijo
System.out.println(fijos[0]);               // Thor

ArrayList<String> gatos = new ArrayList<>();  // lista: crece sola
gatos.add("Thor");
gatos.add("Hela");
gatos.add("Loki");
System.out.println(gatos.size());           // 3

for (String g : gatos) {
    System.out.println(g);
}`,
          en: `import java.util.ArrayList;   // goes at the top of the file

String[] fixed = {"Thor", "Hela"};          // array: fixed size
System.out.println(fixed[0]);               // Thor

ArrayList<String> cats = new ArrayList<>();   // list: grows by itself
cats.add("Thor");
cats.add("Hela");
cats.add("Loki");
System.out.println(cats.size());            // 3

for (String c : cats) {
    System.out.println(c);
}`,
        },
      },
      {
        h: { es: 'Clases y objetos', en: 'Classes and objects' },
        code: {
          es: `public class Gato {
    private String nombre;   // atributo

    public Gato(String nombre) {   // constructor
        this.nombre = nombre;
    }

    public void maullar() {        // método
        System.out.println(nombre + ": ¡Miau!");
    }
}

Gato thor = new Gato("Thor");     // un objeto
thor.maullar();                    // Thor: ¡Miau!`,
          en: `public class Cat {
    private String name;     // attribute

    public Cat(String name) {      // constructor
        this.name = name;
    }

    public void meow() {           // method
        System.out.println(name + ": Meow!");
    }
}

Cat thor = new Cat("Thor");       // an object
thor.meow();                       // Thor: Meow!`,
        },
        cat: {
          who: 'thor',
          es: "Una **clase** es el molde (Gato) y un **objeto** es cada gato de verdad: yo soy un objeto, y Hela es otro.",
          en: "A **class** is the mould (Cat) and an **object** is each real cat: I am one object, and Hela is another.",
        },
      },
      {
        h: { es: 'Pilar 1 · Encapsulamiento', en: 'Pillar 1 · Encapsulation' },
        p: {
          es: "Los datos de un objeto se **protegen** con `private` y solo se tocan a través de métodos (**getters** y **setters**), que pueden validar lo que entra.",
          en: "An object's data is **protected** with `private` and only changed through methods (**getters** and **setters**), which can validate the input.",
        },
        code: {
          es: `public class Gato {
    private int hambre;

    public int getHambre() {
        return hambre;
    }

    public void setHambre(int hambre) {
        if (hambre < 0) hambre = 0;   // nadie tiene hambre negativa
        this.hambre = hambre;
    }
}`,
          en: `public class Cat {
    private int hunger;

    public int getHunger() {
        return hunger;
    }

    public void setHunger(int hunger) {
        if (hunger < 0) hunger = 0;   // nobody has negative hunger
        this.hunger = hunger;
    }
}`,
        },
        tip: {
          es: "Idea clave: **nadie cambia tus datos por la puerta de atrás**. Si mañana cambia cómo se guardan, el resto del programa ni se entera.",
          en: "Key idea: **nobody changes your data through the back door**. If tomorrow the storage changes, the rest of the program never notices.",
        },
      },
      {
        h: { es: 'Pilar 2 · Herencia', en: 'Pillar 2 · Inheritance' },
        p: {
          es: "Una clase **hereda** atributos y métodos de otra con `extends`, y añade lo suyo. Evita repetir código: un Gato **es un** Animal.",
          en: "A class **inherits** attributes and methods from another with `extends`, and adds its own. It avoids repeating code: a Cat **is an** Animal.",
        },
        code: {
          es: `public class Animal {
    protected String nombre;

    public void dormir() {
        System.out.println(nombre + " duerme 😴");
    }
}

public class Gato extends Animal {
    public void ronronear() {
        System.out.println("Prrr…");
    }
}

// Un Gato puede dormir() aunque no lo haya escrito: lo hereda`,
          en: `public class Animal {
    protected String name;

    public void sleep() {
        System.out.println(name + " is sleeping 😴");
    }
}

public class Cat extends Animal {
    public void purr() {
        System.out.println("Purrr…");
    }
}

// A Cat can sleep() without writing it: it is inherited`,
        },
        cat: {
          who: 'hela',
          es: "Heredé de Animal el método `dormir()`. Lo he optimizado mucho.",
          en: "I inherited `sleep()` from Animal. I have optimised it a lot.",
        },
      },
      {
        h: { es: 'Pilar 3 · Polimorfismo', en: 'Pillar 3 · Polymorphism' },
        p: {
          es: "«Muchas formas»: el **mismo método** se comporta distinto según el objeto. Las clases hijas lo **sobrescriben** con `@Override`, y podemos tratarlas a todas como su clase padre.",
          en: "“Many forms”: the **same method** behaves differently depending on the object. Child classes **override** it with `@Override`, and we can treat them all as their parent class.",
        },
        code: {
          es: `public class Animal {
    public String sonido() { return "..."; }
}

public class Gato extends Animal {
    @Override
    public String sonido() { return "¡Miau!"; }
}

public class Perro extends Animal {
    @Override
    public String sonido() { return "¡Guau!"; }
}

Animal[] casa = { new Gato(), new Perro() };
for (Animal a : casa) {
    System.out.println(a.sonido());   // ¡Miau!  ¡Guau!
}`,
          en: `public class Animal {
    public String sound() { return "..."; }
}

public class Cat extends Animal {
    @Override
    public String sound() { return "Meow!"; }
}

public class Dog extends Animal {
    @Override
    public String sound() { return "Woof!"; }
}

Animal[] home = { new Cat(), new Dog() };
for (Animal a : home) {
    System.out.println(a.sound());    // Meow!  Woof!
}`,
        },
        cat: {
          who: 'thor',
          es: "Todos los animales tienen `sonido()`, pero el mío suena a las 6 de la mañana. Eso también es polimorfismo.",
          en: "Every animal has `sound()`, but mine plays at 6 am. That is polymorphism too.",
        },
      },
      {
        h: { es: 'Pilar 4 · Abstracción', en: 'Pillar 4 · Abstraction' },
        p: {
          es: "Mostrar **qué** hace algo sin explicar **cómo**. Se usan **interfaces** (`interface`) o **clases abstractas** (`abstract`): definen el contrato y cada clase lo cumple a su manera.",
          en: "Show **what** something does without explaining **how**. We use **interfaces** (`interface`) or **abstract classes** (`abstract`): they define the contract and each class fulfils it its own way.",
        },
        code: {
          es: `public interface Mascota {
    void comer();   // qué hace, no cómo
}

public class Gato implements Mascota {
    @Override
    public void comer() {
        System.out.println("Ñam ñam 🐟");
    }
}

Mascota hela = new Gato();
hela.comer();   // no necesito saber cómo come, solo que sabe comer`,
          en: `public interface Pet {
    void eat();   // what it does, not how
}

public class Cat implements Pet {
    @Override
    public void eat() {
        System.out.println("Nom nom 🐟");
    }
}

Pet hela = new Cat();
hela.eat();   // I don't need to know how she eats, only that she can`,
        },
      },
      {
        h: { es: 'Resumen de los 4 pilares', en: 'The 4 pillars at a glance' },
        table: {
          es: [
            ['Pilar', 'En una frase', 'Palabra clave'],
            ['Encapsulamiento', 'Proteger los datos y controlar el acceso', '`private`, getters/setters'],
            ['Herencia', 'Reutilizar código de una clase padre', '`extends`'],
            ['Polimorfismo', 'Mismo método, distinto comportamiento', '`@Override`'],
            ['Abstracción', 'Qué hace, sin importar cómo', '`interface`, `abstract`'],
          ],
          en: [
            ['Pillar', 'In one sentence', 'Keyword'],
            ['Encapsulation', 'Protect data and control access', '`private`, getters/setters'],
            ['Inheritance', 'Reuse code from a parent class', '`extends`'],
            ['Polymorphism', 'Same method, different behaviour', '`@Override`'],
            ['Abstraction', 'What it does, not how', '`interface`, `abstract`'],
          ],
        },
        warn: {
          es: "Los `String` se comparan con `.equals()`, no con `==` (que compara si son el mismo objeto en memoria).",
          en: "Compare `String`s with `.equals()`, not `==` (which checks whether they are the same object in memory).",
        },
      },
    ],
  },

  /* ================================================================ Git */
  {
    id: 'git',
    icon: '🌿',
    color: '#9dffb0',
    lang: 'bash',
    title: { es: 'Git', en: 'Git' },
    sections: [
      {
        h: { es: '¿Qué es Git?', en: 'What is Git?' },
        p: {
          es: "Un **control de versiones**: guarda «fotos» de tu proyecto (**commits**) para volver atrás, ver qué cambió y trabajar en equipo sin pisarse. **GitHub** es donde se suben los repositorios (¡como este portfolio!).",
          en: "A **version control system**: it saves “snapshots” of your project (**commits**) so you can go back, see what changed and work as a team without clashing. **GitHub** is where repositories are hosted (like this portfolio!).",
        },
        table: {
          es: [
            ['Zona', 'Qué es', 'Se llega con'],
            ['Carpeta de trabajo', 'Tus archivos tal cual', '(editar)'],
            ['Área de preparación', 'Lo que irá en el próximo commit', '`git add`'],
            ['Repositorio', 'El historial de commits', '`git commit`'],
          ],
          en: [
            ['Area', 'What it is', 'You get there with'],
            ['Working directory', 'Your files as they are', '(editing)'],
            ['Staging area', 'What goes into the next commit', '`git add`'],
            ['Repository', 'The commit history', '`git commit`'],
          ],
        },
      },
      {
        h: { es: 'Instalar y configurar', en: 'Install and configure' },
        p: {
          es: "Descárgalo de **git-scm.com**. La primera vez, dile quién eres: ese nombre y email aparecerán en tus commits.",
          en: "Download it from **git-scm.com**. The first time, tell it who you are: that name and email will appear on your commits.",
        },
        code: {
          es: `git --version
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main`,
          en: `git --version
git config --global user.name "Your Name"
git config --global user.email "you@email.com"
git config --global init.defaultBranch main`,
        },
      },
      {
        h: { es: 'Primeros pasos', en: 'First steps' },
        code: {
          es: `git init                  # crea un repositorio
git status                # ¿qué ha cambiado?
git add index.html        # prepara un archivo
git add .                 # …o todos
git commit -m "Añade la página de Thor"
git log --oneline         # historial resumido`,
          en: `git init                  # create a repository
git status                # what has changed?
git add index.html        # stage one file
git add .                 # …or all of them
git commit -m "Add Thor's page"
git log --oneline         # short history`,
        },
        tip: {
          es: "Mensajes de commit cortos y en imperativo: «Añade el comedero», «Corrige el botón de copiar». Tu yo del futuro lo agradecerá.",
          en: "Keep commit messages short and in the imperative: “Add the food bowl”, “Fix the copy button”. Future you will be grateful.",
        },
      },
      {
        h: { es: 'Ver qué ha cambiado', en: 'Seeing what changed' },
        code: {
          es: `git status                  # resumen de cambios
git diff                    # líneas cambiadas (sin preparar)
git diff --staged           # lo que ya está preparado
git log --oneline --graph   # historial en forma de árbol`,
          en: `git status                  # summary of changes
git diff                    # changed lines (not staged)
git diff --staged           # what is already staged
git log --oneline --graph   # history drawn as a tree`,
        },
      },
      {
        h: { es: 'Ignorar archivos: .gitignore', en: 'Ignoring files: .gitignore' },
        p: {
          es: "Un archivo `.gitignore` en la raíz del proyecto lista lo que Git **no** debe guardar: contraseñas, dependencias descargadas, archivos temporales…",
          en: "A `.gitignore` file at the project root lists what Git must **not** track: passwords, downloaded dependencies, temporary files…",
        },
        code: {
          es: `# .gitignore
.env
node_modules/
__pycache__/
.venv/
*.log`,
          en: `# .gitignore
.env
node_modules/
__pycache__/
.venv/
*.log`,
        },
        warn: {
          es: "**Nunca** subas contraseñas ni archivos `.env`. Si se te cuela uno, cambia esa contraseña: el historial de Git lo recuerda todo.",
          en: "**Never** commit passwords or `.env` files. If one slips in, change that password: Git history remembers everything.",
        },
      },
      {
        h: { es: 'Deshacer cosas', en: 'Undoing things' },
        code: {
          es: `git restore archivo.txt              # descarta cambios no guardados
git restore --staged archivo.txt     # lo saca del área de preparación
git commit --amend -m "Mensaje bien escrito"   # corrige el último commit (si no lo has subido)
git revert a1b2c3d                   # crea un commit que deshace otro`,
          en: `git restore file.txt                 # discard unsaved changes
git restore --staged file.txt        # remove it from the staging area
git commit --amend -m "Better message"   # fix the last commit (if not pushed yet)
git revert a1b2c3d                   # create a commit that undoes another`,
        },
      },
      {
        h: { es: 'Ramas', en: 'Branches' },
        p: {
          es: "Una **rama** es una línea de trabajo paralela: pruebas algo nuevo sin romper la rama principal (`main`) y, cuando funciona, lo **fusionas**.",
          en: "A **branch** is a parallel line of work: you try something new without breaking the main branch (`main`) and **merge** it once it works.",
        },
        code: {
          es: `git switch -c comedero    # crea la rama y se cambia a ella
# ...cambios y commits...
git switch main           # vuelve a main
git merge comedero        # une los cambios`,
          en: `git switch -c food-bowl   # create the branch and switch to it
# ...changes and commits...
git switch main           # back to main
git merge food-bowl       # bring the changes in`,
        },
        cat: {
          who: 'hela',
          es: "Una rama es como probar un sitio nuevo para la siesta sin renunciar al sofá.",
          en: "A branch is like trying a new napping spot without giving up the sofa.",
        },
      },
      {
        h: { es: 'Trabajar con GitHub', en: 'Working with GitHub' },
        code: {
          es: `git remote add origin https://github.com/usuario/proyecto.git
git push -u origin main   # la primera vez
git push                  # las siguientes
git pull                  # trae los cambios del remoto
git clone https://github.com/Zulema1904/zulemaos-monitor.git`,
          en: `git remote add origin https://github.com/user/project.git
git push -u origin main   # the first time
git push                  # from then on
git pull                  # fetch changes from the remote
git clone https://github.com/Zulema1904/zulemaos-monitor.git`,
        },
        warn: {
          es: "Cuidado con `git push --force` en ramas compartidas: puede borrar el trabajo de otras personas.",
          en: "Be careful with `git push --force` on shared branches: it can wipe out other people's work.",
        },
      },
    ],
  },
];
