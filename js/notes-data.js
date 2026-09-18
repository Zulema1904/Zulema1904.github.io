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
];
