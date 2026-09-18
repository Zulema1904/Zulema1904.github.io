/*
 * Contenido de Apuntes (es / en).
 * Cada tema tiene secciones con: h (título), p (texto), code (ejemplo),
 * tip (💡), warn (⚠️) y cat (nota al margen de Thor o Hela).
 * En los textos, `código` sale como código y **texto** sale subrayado con rotulador.
 * Para añadir un tema nuevo basta con copiar la estructura de uno existente.
 */
window.ZNotesData = [
  {
    id: 'python',
    icon: '🐍',
    color: '#ffd66b',
    lang: 'python',
    title: { es: 'Python', en: 'Python' },
    sections: [
      {
        h: { es: '¿Qué es Python?', en: 'What is Python?' },
        p: {
          es: 'Un lenguaje **interpretado** y muy legible: se ejecuta línea a línea, sin compilar. Se usa en **inteligencia artificial** (TensorFlow, PyTorch), automatización, análisis de datos y backend web (FastAPI, Django).',
          en: 'An **interpreted**, very readable language: it runs line by line, with no compile step. It is used for **artificial intelligence** (TensorFlow, PyTorch), automation, data analysis and web backends (FastAPI, Django).',
        },
        cat: {
          who: 'hela',
          es: 'En Python la **indentación** importa: los bloques se marcan con espacios, no con llaves. Como mi siesta: sin interrupciones.',
          en: 'In Python **indentation** matters: blocks are marked with spaces, not braces. Like my naps: no interruptions.',
        },
      },
      {
        h: { es: 'Variables y tipos', en: 'Variables and types' },
        p: {
          es: 'No hace falta declarar el tipo: Python lo deduce (**tipado dinámico**). Los básicos son `str`, `int`, `float` y `bool`.',
          en: 'You don\'t declare the type: Python infers it (**dynamic typing**). The basics are `str`, `int`, `float` and `bool`.',
        },
        code: {
          es: 'nombre = "Thor"        # str\nvidas = 7              # int (los gatos tienen siete vidas)\npeso = 5.2             # float\ntiene_hambre = True    # bool (siempre 😼)\n\nprint(f"{nombre} tiene {vidas} vidas")\nprint(type(peso))      # <class \'float\'>',
          en: 'name = "Thor"          # str\nlives = 9              # int (cats have nine lives)\nweight = 5.2           # float\nis_hungry = True       # bool (always 😼)\n\nprint(f"{name} has {lives} lives")\nprint(type(weight))    # <class \'float\'>',
        },
        tip: {
          es: 'Las **f-strings** (`f"..."`) meten variables dentro del texto entre llaves. Son la forma más cómoda de formatear.',
          en: '**f-strings** (`f"..."`) put variables inside text using braces. They are the easiest way to format strings.',
        },
      },
      {
        h: { es: 'Listas y diccionarios', en: 'Lists and dictionaries' },
        p: {
          es: 'Una **lista** guarda elementos en orden (se accede por posición). Un **diccionario** guarda parejas clave → valor (se accede por nombre).',
          en: 'A **list** stores items in order (accessed by position). A **dictionary** stores key → value pairs (accessed by name).',
        },
        code: {
          es: 'gatos = ["Thor", "Hela"]\ngatos.append("Loki")     # ¿un tercer gato? 👀\nprint(gatos[0])          # Thor\nprint(len(gatos))        # 3\n\ngata = {"nombre": "Hela", "color": "atigrada"}\nprint(gata["color"])     # atigrada\ngata["siesta"] = True    # añadir una clave nueva',
          en: 'cats = ["Thor", "Hela"]\ncats.append("Loki")      # a third cat? 👀\nprint(cats[0])           # Thor\nprint(len(cats))         # 3\n\ncat = {"name": "Hela", "colour": "tabby"}\nprint(cat["colour"])     # tabby\ncat["napping"] = True    # add a new key',
        },
        warn: {
          es: 'Las posiciones empiezan en **0**, no en 1. `gatos[3]` en una lista de 3 elementos da `IndexError`.',
          en: 'Positions start at **0**, not 1. `cats[3]` on a 3-item list raises `IndexError`.',
        },
      },
      {
        h: { es: 'Condicionales y bucles', en: 'Conditionals and loops' },
        p: {
          es: '`if` / `elif` / `else` deciden qué se ejecuta. `for` recorre una colección y `while` repite mientras se cumpla una condición.',
          en: '`if` / `elif` / `else` decide what runs. `for` walks through a collection and `while` repeats while a condition is true.',
        },
        code: {
          es: 'for gato in gatos:\n    print(f"Hola, {gato}")\n\ncomida = 0\nwhile comida < 3:\n    comida += 1\n\nif comida >= 3:\n    print("¡Llenos! 😌")\nelse:\n    print("Más, humana 😾")',
          en: 'for cat in cats:\n    print(f"Hi, {cat}")\n\nfood = 0\nwhile food < 3:\n    food += 1\n\nif food >= 3:\n    print("Full! 😌")\nelse:\n    print("More, human 😾")',
        },
        warn: {
          es: '`=` asigna y `==` compara. Y no mezcles tabuladores con espacios: `IndentationError` asegurado.',
          en: '`=` assigns and `==` compares. And don\'t mix tabs and spaces: `IndentationError` guaranteed.',
        },
      },
      {
        h: { es: 'Funciones', en: 'Functions' },
        p: {
          es: 'Se definen con `def`. Pueden tener **parámetros con valor por defecto** y devolver un resultado con `return`.',
          en: 'Defined with `def`. They can have **default parameter values** and give back a result with `return`.',
        },
        code: {
          es: 'def saludar(nombre, emoji="🐾"):\n    """Devuelve un saludo gatuno."""\n    return f"¡Miau, {nombre}! {emoji}"\n\nprint(saludar("Thor", "⚡"))   # ¡Miau, Thor! ⚡\nprint(saludar("Hela"))        # ¡Miau, Hela! 🐾',
          en: 'def greet(name, emoji="🐾"):\n    """Return a cat-style greeting."""\n    return f"Meow, {name}! {emoji}"\n\nprint(greet("Thor", "⚡"))   # Meow, Thor! ⚡\nprint(greet("Hela"))        # Meow, Hela! 🐾',
        },
        cat: {
          who: 'thor',
          es: 'Una función es como pedir comida: la llamas con tus datos y te **devuelve** algo. Yo la llamo a las 6 de la mañana.',
          en: 'A function is like asking for food: you call it with your data and it **returns** something. I call it at 6 am.',
        },
      },
    ],
  },
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
          es: 'Un lenguaje **compilado a bytecode** que ejecuta la máquina virtual (**JVM**): "escríbelo una vez, ejecútalo en cualquier sitio". Es de **tipado estático** y todo vive dentro de **clases**. Es la base de la **Programación Orientada a Objetos (POO)**.',
          en: 'A language **compiled to bytecode** that runs on the virtual machine (**JVM**): "write once, run anywhere". It is **statically typed** and everything lives inside **classes**. It is the classic way to learn **Object-Oriented Programming (OOP)**.',
        },
        code: {
          es: 'public class Gato {\n    private String nombre;   // atributo\n\n    public Gato(String nombre) {   // constructor\n        this.nombre = nombre;\n    }\n\n    public void maullar() {        // método\n        System.out.println(nombre + ": ¡Miau!");\n    }\n}\n\nGato thor = new Gato("Thor");     // un objeto\nthor.maullar();                    // Thor: ¡Miau!',
          en: 'public class Cat {\n    private String name;     // attribute\n\n    public Cat(String name) {      // constructor\n        this.name = name;\n    }\n\n    public void meow() {           // method\n        System.out.println(name + ": Meow!");\n    }\n}\n\nCat thor = new Cat("Thor");       // an object\nthor.meow();                       // Thor: Meow!',
        },
        cat: {
          who: 'thor',
          es: 'Una **clase** es el molde (Gato) y un **objeto** es cada gato de verdad: yo soy un objeto, y Hela es otro.',
          en: 'A **class** is the mould (Cat) and an **object** is each real cat: I am one object, and Hela is another.',
        },
      },
      {
        h: { es: '1 · Encapsulamiento', en: '1 · Encapsulation' },
        p: {
          es: 'Los datos de un objeto se **protegen** con `private` y solo se tocan a través de métodos (**getters** y **setters**), que pueden validar lo que entra.',
          en: 'An object\'s data is **protected** with `private` and only changed through methods (**getters** and **setters**), which can validate the input.',
        },
        code: {
          es: 'public class Gato {\n    private int hambre;\n\n    public int getHambre() {\n        return hambre;\n    }\n\n    public void setHambre(int hambre) {\n        if (hambre < 0) hambre = 0;   // nadie tiene hambre negativa\n        this.hambre = hambre;\n    }\n}',
          en: 'public class Cat {\n    private int hunger;\n\n    public int getHunger() {\n        return hunger;\n    }\n\n    public void setHunger(int hunger) {\n        if (hunger < 0) hunger = 0;   // nobody has negative hunger\n        this.hunger = hunger;\n    }\n}',
        },
        tip: {
          es: 'Idea clave: **nadie cambia tus datos por la puerta de atrás**. Si mañana cambia cómo se guardan, el resto del programa ni se entera.',
          en: 'Key idea: **nobody changes your data through the back door**. If tomorrow the storage changes, the rest of the program never notices.',
        },
      },
      {
        h: { es: '2 · Herencia', en: '2 · Inheritance' },
        p: {
          es: 'Una clase **hereda** atributos y métodos de otra con `extends`, y añade lo suyo. Evita repetir código: un Gato **es un** Animal.',
          en: 'A class **inherits** attributes and methods from another with `extends`, and adds its own. It avoids repeating code: a Cat **is an** Animal.',
        },
        code: {
          es: 'public class Animal {\n    protected String nombre;\n\n    public void dormir() {\n        System.out.println(nombre + " duerme 😴");\n    }\n}\n\npublic class Gato extends Animal {\n    public void ronronear() {\n        System.out.println("Prrr…");\n    }\n}\n\n// Un Gato puede dormir() aunque no lo haya escrito: lo hereda',
          en: 'public class Animal {\n    protected String name;\n\n    public void sleep() {\n        System.out.println(name + " is sleeping 😴");\n    }\n}\n\npublic class Cat extends Animal {\n    public void purr() {\n        System.out.println("Purrr…");\n    }\n}\n\n// A Cat can sleep() without writing it: it is inherited',
        },
        cat: {
          who: 'hela',
          es: 'Heredé de Animal el método `dormir()`. Lo he optimizado mucho.',
          en: 'I inherited `sleep()` from Animal. I have optimised it a lot.',
        },
      },
      {
        h: { es: '3 · Polimorfismo', en: '3 · Polymorphism' },
        p: {
          es: '"Muchas formas": el **mismo método** se comporta distinto según el objeto. Las clases hijas lo **sobrescriben** con `@Override`, y podemos tratarlas a todas como su clase padre.',
          en: '"Many forms": the **same method** behaves differently depending on the object. Child classes **override** it with `@Override`, and we can treat them all as their parent class.',
        },
        code: {
          es: 'public class Animal {\n    public String sonido() { return "..."; }\n}\n\npublic class Gato extends Animal {\n    @Override\n    public String sonido() { return "¡Miau!"; }\n}\n\npublic class Perro extends Animal {\n    @Override\n    public String sonido() { return "¡Guau!"; }\n}\n\nAnimal[] casa = { new Gato(), new Perro() };\nfor (Animal a : casa) {\n    System.out.println(a.sonido());   // ¡Miau!  ¡Guau!\n}',
          en: 'public class Animal {\n    public String sound() { return "..."; }\n}\n\npublic class Cat extends Animal {\n    @Override\n    public String sound() { return "Meow!"; }\n}\n\npublic class Dog extends Animal {\n    @Override\n    public String sound() { return "Woof!"; }\n}\n\nAnimal[] home = { new Cat(), new Dog() };\nfor (Animal a : home) {\n    System.out.println(a.sound());    // Meow!  Woof!\n}',
        },
        cat: {
          who: 'thor',
          es: 'Todos los animales tienen `sonido()`, pero el mío suena a las 6 de la mañana. Eso también es polimorfismo.',
          en: 'Every animal has `sound()`, but mine plays at 6 am. That is polymorphism too.',
        },
      },
      {
        h: { es: '4 · Abstracción', en: '4 · Abstraction' },
        p: {
          es: 'Mostrar **qué** hace algo sin explicar **cómo**. Se usan **interfaces** (`interface`) o **clases abstractas** (`abstract`): definen el contrato y cada clase lo cumple a su manera.',
          en: 'Show **what** something does without explaining **how**. We use **interfaces** (`interface`) or **abstract classes** (`abstract`): they define the contract and each class fulfils it its own way.',
        },
        code: {
          es: 'public interface Mascota {\n    void comer();   // qué hace, no cómo\n}\n\npublic class Gato implements Mascota {\n    @Override\n    public void comer() {\n        System.out.println("Ñam ñam 🐟");\n    }\n}\n\nMascota hela = new Gato();\nhela.comer();   // no necesito saber cómo come, solo que sabe comer',
          en: 'public interface Pet {\n    void eat();   // what it does, not how\n}\n\npublic class Cat implements Pet {\n    @Override\n    public void eat() {\n        System.out.println("Nom nom 🐟");\n    }\n}\n\nPet hela = new Cat();\nhela.eat();   // I don\'t need to know how she eats, only that she can',
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
          es: 'Los `String` se comparan con `.equals()`, no con `==` (que compara si son el mismo objeto en memoria).',
          en: 'Compare `String`s with `.equals()`, not `==` (which checks whether they are the same object in memory).',
        },
      },
    ],
  },
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
          es: 'El lenguaje para hablar con **bases de datos relacionales** (MySQL, PostgreSQL, SQLite…). Los datos se guardan en **tablas**: cada **fila** es un registro y cada **columna**, un dato.',
          en: 'The language for talking to **relational databases** (MySQL, PostgreSQL, SQLite…). Data lives in **tables**: each **row** is a record and each **column** a field.',
        },
        cat: {
          who: 'hela',
          es: 'Una tabla es como una hoja de cálculo muy ordenada. Yo ocupo la fila de las siestas.',
          en: 'A table is like a very tidy spreadsheet. I own the naps row.',
        },
      },
      {
        h: { es: 'Crear una tabla e insertar datos', en: 'Create a table and insert data' },
        p: {
          es: '`CREATE TABLE` define las columnas y su tipo. La **clave primaria** (`PRIMARY KEY`) identifica cada fila sin repetirse.',
          en: '`CREATE TABLE` defines the columns and their type. The **primary key** (`PRIMARY KEY`) identifies each row and never repeats.',
        },
        code: {
          es: 'CREATE TABLE gatos (\n  id      INT PRIMARY KEY,\n  nombre  VARCHAR(30),\n  color   VARCHAR(20),\n  siestas INT\n);\n\nINSERT INTO gatos (id, nombre, color, siestas)\nVALUES (1, \'Thor\', \'negro\', 5),\n       (2, \'Hela\', \'atigrada\', 9);',
          en: 'CREATE TABLE cats (\n  id     INT PRIMARY KEY,\n  name   VARCHAR(30),\n  colour VARCHAR(20),\n  naps   INT\n);\n\nINSERT INTO cats (id, name, colour, naps)\nVALUES (1, \'Thor\', \'black\', 5),\n       (2, \'Hela\', \'tabby\', 9);',
        },
      },
      {
        h: { es: 'Consultar: SELECT', en: 'Querying: SELECT' },
        p: {
          es: '`SELECT` elige columnas, `WHERE` filtra filas y `ORDER BY` ordena (`DESC` = de mayor a menor).',
          en: '`SELECT` picks columns, `WHERE` filters rows and `ORDER BY` sorts (`DESC` = highest first).',
        },
        code: {
          es: 'SELECT nombre, siestas\nFROM gatos\nWHERE siestas > 6\nORDER BY siestas DESC;\n\n-- Resultado: Hela | 9',
          en: 'SELECT name, naps\nFROM cats\nWHERE naps > 6\nORDER BY naps DESC;\n\n-- Result: Hela | 9',
        },
        tip: {
          es: '`SELECT *` trae todas las columnas: cómodo para explorar, pero en código real mejor nombrar solo las que necesitas.',
          en: '`SELECT *` brings every column: handy for exploring, but in real code name only the ones you need.',
        },
      },
      {
        h: { es: 'Modificar y borrar', en: 'Update and delete' },
        code: {
          es: 'UPDATE gatos SET siestas = siestas + 1\nWHERE nombre = \'Thor\';\n\nDELETE FROM gatos\nWHERE id = 3;',
          en: 'UPDATE cats SET naps = naps + 1\nWHERE name = \'Thor\';\n\nDELETE FROM cats\nWHERE id = 3;',
        },
        warn: {
          es: 'Un `UPDATE` o `DELETE` **sin `WHERE`** afecta a **todas** las filas. Revisa siempre el `WHERE` antes de pulsar Enter.',
          en: 'An `UPDATE` or `DELETE` **without `WHERE`** hits **every** row. Always check the `WHERE` before pressing Enter.',
        },
      },
      {
        h: { es: 'Unir tablas: JOIN', en: 'Joining tables: JOIN' },
        p: {
          es: '`JOIN` combina filas de dos tablas relacionadas por una columna. Con `GROUP BY` y funciones como `COUNT()` se calculan resúmenes.',
          en: '`JOIN` combines rows from two tables related by a column. With `GROUP BY` and functions like `COUNT()` you build summaries.',
        },
        code: {
          es: 'SELECT g.nombre, COUNT(c.id) AS comidas\nFROM gatos g\nJOIN comidas c ON c.gato_id = g.id\nGROUP BY g.nombre;',
          en: 'SELECT c.name, COUNT(m.id) AS meals\nFROM cats c\nJOIN meals m ON m.cat_id = c.id\nGROUP BY c.name;',
        },
        cat: {
          who: 'thor',
          es: 'El `COUNT()` de mis comidas siempre sale bajo. Exijo una auditoría.',
          en: 'The `COUNT()` of my meals always comes out low. I demand an audit.',
        },
      },
    ],
  },
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
          es: 'Un **control de versiones**: guarda "fotos" de tu proyecto (**commits**) para volver atrás, ver qué cambió y trabajar en equipo sin pisarse. **GitHub** es donde se suben los repositorios (¡como este portfolio!).',
          en: 'A **version control system**: it saves "snapshots" of your project (**commits**) so you can go back, see what changed and work as a team without clashing. **GitHub** is where repositories are hosted (like this portfolio!).',
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
        h: { es: 'Primeros pasos', en: 'First steps' },
        code: {
          es: 'git init                  # crea un repositorio\ngit status                # ¿qué ha cambiado?\ngit add index.html        # prepara un archivo\ngit add .                 # …o todos\ngit commit -m "Añade la página de Thor"\ngit log --oneline         # historial resumido',
          en: 'git init                  # create a repository\ngit status                # what has changed?\ngit add index.html        # stage one file\ngit add .                 # …or all of them\ngit commit -m "Add Thor\'s page"\ngit log --oneline         # short history',
        },
        tip: {
          es: 'Mensajes de commit cortos y en imperativo: "Añade el comedero", "Corrige el botón de copiar". Tu yo del futuro lo agradecerá.',
          en: 'Keep commit messages short and in the imperative: "Add the food bowl", "Fix the copy button". Future you will be grateful.',
        },
      },
      {
        h: { es: 'Ramas', en: 'Branches' },
        p: {
          es: 'Una **rama** es una línea de trabajo paralela: pruebas algo nuevo sin romper la rama principal (`main`) y, cuando funciona, lo **fusionas**.',
          en: 'A **branch** is a parallel line of work: you try something new without breaking the main branch (`main`) and **merge** it once it works.',
        },
        code: {
          es: 'git switch -c comedero    # crea la rama y se cambia a ella\n# ...cambios y commits...\ngit switch main           # vuelve a main\ngit merge comedero        # une los cambios',
          en: 'git switch -c food-bowl   # create the branch and switch to it\n# ...changes and commits...\ngit switch main           # back to main\ngit merge food-bowl       # bring the changes in',
        },
        cat: {
          who: 'hela',
          es: 'Una rama es como probar un sitio nuevo para la siesta sin renunciar al sofá.',
          en: 'A branch is like trying a new napping spot without giving up the sofa.',
        },
      },
      {
        h: { es: 'Trabajar con GitHub', en: 'Working with GitHub' },
        code: {
          es: 'git clone https://github.com/Zulema1904/zulemaos-monitor.git\ngit pull                  # trae los cambios del remoto\ngit push                  # sube tus commits',
          en: 'git clone https://github.com/Zulema1904/zulemaos-monitor.git\ngit pull                  # fetch changes from the remote\ngit push                  # upload your commits',
        },
        warn: {
          es: '**Nunca** subas contraseñas ni archivos `.env`: lista lo privado en `.gitignore`. Y ojo con `git push --force` en ramas compartidas.',
          en: '**Never** commit passwords or `.env` files: list private stuff in `.gitignore`. And be careful with `git push --force` on shared branches.',
        },
      },
    ],
  },
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
          es: '**HTML** es la estructura y el contenido de una web (el esqueleto). **CSS** es el estilo: colores, tamaños y colocación (la ropa). Y JavaScript pone el comportamiento.',
          en: '**HTML** is a web page\'s structure and content (the skeleton). **CSS** is the style: colours, sizes and layout (the clothes). And JavaScript adds behaviour.',
        },
        cat: {
          who: 'thor',
          es: 'HTML es mi esqueleto, CSS es mi pelaje negro brillante. Yo soy 100 % estilo.',
          en: 'HTML is my skeleton, CSS is my shiny black fur. I am 100 % style.',
        },
      },
      {
        h: { es: 'Estructura básica de HTML', en: 'Basic HTML structure' },
        p: {
          es: 'Todo son **etiquetas** que abren y cierran (`<p>…</p>`). El `<head>` tiene información para el navegador y el `<body>`, lo que se ve.',
          en: 'Everything is **tags** that open and close (`<p>…</p>`). The `<head>` holds info for the browser and the `<body>`, what you see.',
        },
        code: {
          es: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Mis gatos</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Thor y Hela</h1>\n  <p>Dos gatos y <strong>muchas</strong> siestas.</p>\n  <img src="thor.png" alt="Thor, un gato negro">\n  <a href="https://zulema1904.github.io">Mi portfolio</a>\n</body>\n</html>',
          en: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My cats</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Thor and Hela</h1>\n  <p>Two cats and <strong>lots of</strong> naps.</p>\n  <img src="thor.png" alt="Thor, a black cat">\n  <a href="https://zulema1904.github.io">My portfolio</a>\n</body>\n</html>',
        },
        warn: {
          es: 'Todas las imágenes necesitan `alt`: es lo que leen los lectores de pantalla y lo que se ve si la imagen no carga.',
          en: 'Every image needs `alt`: it is what screen readers read out and what shows if the image fails to load.',
        },
      },
      {
        h: { es: 'Etiquetas semánticas', en: 'Semantic tags' },
        p: {
          es: 'En vez de poner `<div>` para todo, usa etiquetas con significado: mejoran la **accesibilidad** y el **SEO**.',
          en: 'Instead of `<div>` for everything, use tags with meaning: they improve **accessibility** and **SEO**.',
        },
        code: {
          es: '<header>Logo y título</header>\n<nav>Menú</nav>\n<main>\n  <article>\n    <h2>Cómo dormir 16 horas</h2>\n  </article>\n</main>\n<footer>© Hela</footer>',
          en: '<header>Logo and title</header>\n<nav>Menu</nav>\n<main>\n  <article>\n    <h2>How to sleep 16 hours</h2>\n  </article>\n</main>\n<footer>© Hela</footer>',
        },
      },
      {
        h: { es: 'CSS: selectores y caja', en: 'CSS: selectors and the box' },
        p: {
          es: 'Una regla CSS es **selector { propiedad: valor; }**. Se puede seleccionar por etiqueta, por **clase** (`.gato`) o por **id** (`#thor`). Cada elemento es una **caja**: contenido + `padding` + `border` + `margin`.',
          en: 'A CSS rule is **selector { property: value; }**. You can select by tag, by **class** (`.cat`) or by **id** (`#thor`). Every element is a **box**: content + `padding` + `border` + `margin`.',
        },
        lang: 'css',
        code: {
          es: '/* etiqueta, clase e id */\nh1 { color: #6a4fd8; }\n\n.gato {\n  border: 2px solid black;\n  padding: 12px;     /* espacio por dentro */\n  margin: 8px;       /* espacio por fuera */\n}\n\n#thor { background: #1d1a3f; color: white; }',
          en: '/* tag, class and id */\nh1 { color: #6a4fd8; }\n\n.cat {\n  border: 2px solid black;\n  padding: 12px;     /* space inside */\n  margin: 8px;       /* space outside */\n}\n\n#thor { background: #1d1a3f; color: white; }',
        },
        tip: {
          es: 'Empieza tus hojas con `* { box-sizing: border-box; }`: así el ancho incluye el `padding` y el `border`, y las cuentas salen.',
          en: 'Start your stylesheets with `* { box-sizing: border-box; }`: width then includes `padding` and `border`, and the maths works out.',
        },
      },
      {
        h: { es: 'Flexbox y diseño adaptable', en: 'Flexbox and responsive design' },
        p: {
          es: '`display: flex` coloca los hijos en fila (o columna) y reparte el espacio. Con `@media` cambias el diseño según el ancho de la pantalla.',
          en: '`display: flex` lays children out in a row (or column) and shares the space. With `@media` you change the layout depending on screen width.',
        },
        lang: 'css',
        code: {
          es: '.gatos {\n  display: flex;\n  gap: 16px;\n  justify-content: center;   /* eje principal */\n  align-items: center;       /* eje cruzado */\n}\n\n@media (max-width: 600px) {\n  .gatos { flex-direction: column; }   /* en móvil, uno debajo de otro */\n}',
          en: '.cats {\n  display: flex;\n  gap: 16px;\n  justify-content: center;   /* main axis */\n  align-items: center;       /* cross axis */\n}\n\n@media (max-width: 600px) {\n  .cats { flex-direction: column; }   /* on mobile, stacked */\n}',
        },
        cat: {
          who: 'hela',
          es: 'Flexbox es como nosotros en el sofá: en fila, con `gap` justo para no molestarnos.',
          en: 'Flexbox is like us on the sofa: in a row, with just enough `gap` not to bother each other.',
        },
      },
    ],
  },
];
