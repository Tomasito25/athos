<div align="center">

# ATHOS

**Oración · Tradición · Vida**

Horologion digital, libro de oración, biblioteca ortodoxa y calendario
litúrgico, en una aplicación que funciona sin conexión.

### → **[Abrir e instalar ATHOS](https://tomasito25.github.io/athos/)** ←

`https://tomasito25.github.io/athos/`

Sin cuenta · Sin rastreo · Sin publicidad · Tus datos en tu dispositivo

</div>

---

## Instalarla

Abre **[tomasito25.github.io/athos](https://tomasito25.github.io/athos/)** y
añádela a tu dispositivo. No pasa por ninguna tienda: es la misma web, guardada
en tu teléfono.

| | |
| --- | --- |
| **Android** (Chrome, Brave) | Menú **⋮** → *Instalar aplicación* |
| **iPhone y iPad** (Safari) | **Compartir** → *Añadir a pantalla de inicio* |
| **Ordenador** (Chrome, Edge, Brave) | El icono de instalar en la barra de direcciones |

Después se abre en su propia ventana, arranca al instante y **funciona entera
sin conexión**: la Biblia, el Salterio, el calendario y las oraciones quedan en
el dispositivo. No ocupa apenas espacio y no envía nada a ningún servidor,
porque no hay servidor.

---

## Qué trae

- **Oraciones por el momento, no por el título.** Veinticuatro momentos —al
  despertar, al salir de casa, antes y después de comer, al caer en el pecado,
  en la angustia, al entrar en el templo, antes de comulgar—, con el que
  corresponde a la hora destacado al abrir.
- **Tres oficios diarios** con la estructura del Horologion: mañana, Hora Sexta
  y Pequeñas Completas, con sus salmos y las fórmulas en griego.
- **La Biblia completa** en Reina-Valera 1909, con búsqueda sin conexión.
- **El Salterio** en la numeración de los Setenta, repartido en los veinte
  kathismata.
- **Las lecturas de cada día** del leccionario bizantino, recortadas al
  versículo exacto: no el capítulo entero, sino la perícopa que se lee.
- **Calendario litúrgico** con la Pascua ortodoxa calculada de verdad, el tono
  del Octoecos, las fiestas y el ayuno de cada día.
- **Santoral** con la vida de cada conmemoración.
- **Biblioteca**: Divina Liturgia, Padres de la Iglesia, Monte Athos,
  iconografía y cinco itinerarios de estudio.
- **Oración de Jesús y komboskini**, con contador, temporizador e historial.

---
## Contribuir

ATHOS es software libre y agradece la ayuda. Hay cuatro maneras de darla, de
más útil a menos:

**Textos litúrgicos en español con licencia comprobada.** Es lo que más falta y
lo que más cuesta conseguir. Qué está incorporado y qué no, la aplicación lo
dice en todo momento en **Configuración → Fuentes**: cualquier ficha marcada
como *pendiente de incorporar* es una contribución esperando a alguien.

**Correcciones al calendario y al ayuno.** Si una fecha, un tono o un grado de
ayuno no cuadra con tu jurisdicción, díselo — con la fuente que lo respalde.
Las diferencias entre tradiciones son reales y ATHOS quiere reflejarlas, no
aplanarlas.

**Traducciones de la interfaz.** Ningún texto está escrito dentro de un
componente: todos viven en `src/locales/`. Traducir consiste en copiar el
archivo español y traducirlo. Los idiomas que ya existen son los archivos que
haya en esa carpeta.

**Código.** Errores, accesibilidad, rendimiento. `CONTRIBUTING.md` explica los
criterios; el más importante es que nada se dé por bueno sin una prueba que lo
respalde.

### La regla que no se negocia

**Aquí no se inventa un texto litúrgico.** Toda aportación de contenido tiene
que traer su procedencia completa —título, autor, traductor, fuente,
tradición, idioma, licencia y derechos— y decir con claridad si es un texto
tradicional, una traducción con licencia o algo redactado para ATHOS. Lo
tercero se acepta; lo tercero disfrazado de lo primero, no.

Si un texto se incorporó por error y tienes derechos sobre él, escríbelo en una
incidencia: **se retira primero y se discute después**.

### Cómo empezar

```bash
git clone https://github.com/Tomasito25/athos.git
cd athos && ./run.sh
```

Sólo hace falta **python3** para usarla; Node únicamente para compilar, y
`run.sh` lo encuentra solo si está en `~/.local/node`. Antes de proponer un
cambio:

```bash
npm run check
```

Eso pasa el lint, los tipos, las pruebas y la compilación — lo mismo que
comprueba GitHub en cada empujón.

Lo largo está en **[CONTRIBUTING.md](CONTRIBUTING.md)**: qué licencias se
aceptan, cómo se distingue una rúbrica de una oración, y qué hacer con el
calendario litúrgico, que es la parte más delicada del proyecto.

**[Abrir una incidencia](https://github.com/Tomasito25/athos/issues)** ·
**[Ver las abiertas](https://github.com/Tomasito25/athos/issues)**
## La regla de la casa

**Aquí no se inventa un texto litúrgico.** Cuando una oración, un himno o una
traducción no está disponible con licencia comprobada, se conserva su ficha
completa y el cuerpo se marca como *pendiente de incorporar*. Antes que un
texto aproximado, una ficha honesta.

Lo mismo con lo que la aplicación hace: si algo no funciona —las
notificaciones sin servidor, la sincronización que aún no existe— la interfaz
lo dice en vez de simularlo. Y lo poco que ATHOS redacta por su cuenta —guías
prácticas, órdenes de oración— se identifica como suyo en su ficha, nunca como
texto litúrgico.

Cada texto lleva su procedencia: autor, traductor, fuente, tradición, idioma,
licencia y derechos. Se puede consultar entera en **Configuración → Fuentes**.

---

## Licencias

Código bajo [AGPL-3.0-or-later](LICENSE). El contenido religioso conserva cada
uno su propia licencia, declarada en su ficha y visible en la aplicación; ver
[NOTICE.md](NOTICE.md). Reina-Valera 1909 (La OSB no la he podido encontrar en español), dominio público. EB Garamond e
Inter, SIL Open Font License 1.1. **La licencia del código no cubre el
contenido religioso de terceros.**
