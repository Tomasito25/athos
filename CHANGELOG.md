# Registro de cambios

Este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [1.6.0]

### Corregido

- **La epístola se lee entera, siempre.** Fallaban 25 lecturas por dos causas:
  «Judas 1-10» se tomaba por diez capítulos cuando Judas tiene uno solo, y las
  referencias que cruzan de un libro a otro —«1 Corintios 5, 6-8; Gálatas 3,
  13-14»— no se entendían. El analizador ahora reconoce los libros de un
  capítulo, la notación de punto que arrastra el leccionario, los tramos que
  cruzan de capítulo a medio escribir y las referencias de varios libros, que
  se muestran uno tras otro con su encabezado. **Epístola: 4012 de 4012.**
- **El Evangelio también, 4048 de 4048**: `findBook` declaraba nombres
  alternativos pero no los consultaba, y por eso «Matt» —la abreviatura inglesa
  que orthocal deja sin traducir en los Evangelios de la Pasión— no resolvía.

### Añadido

- **Los momentos, en rejilla y con su signo.** Veinticuatro tarjetas en dos o
  cinco columnas según la pantalla, cada una con un icono de trazo fino: la
  prósfora con su sello, el cáliz, la cruz de tres travesaños, la cúpula con su
  cruz, el ramo de olivo por los enemigos.
- **Código QR en la pantalla de instalación.** Se apunta con la cámara del
  móvil y ATHOS se abre allí, sin teclear una dirección ni abrir un terminal.
  Cuando se usa el lanzador local, el servidor dice su dirección en la red para
  que el código no lleve a 127.0.0.1, que en un teléfono no es este ordenador.
  Si esa dirección es HTTP, se advierte de que desde ella se podrá usar ATHOS
  pero no instalarla, y se indica cómo conseguir una que sí valga.
- **Rediseño visual**: superficies con relieve, filete dorado bajo los títulos,
  listas con cuerpo propio en vez de renglones sueltos, marca dorada al costado
  de la fila señalada, botón principal en degradado y píldora tras el icono
  activo de la barra inferior. Sin tocar la tipografía ni la paleta bizantina.

### Quitado

- La fila de la oración de Jesús en Orar. El komboskini se queda, y lleva la
  cuenta del día que antes mostraba aquélla.

## [1.5.0]

### Añadido

- **Menú de momentos**: las oraciones ya no se abren por un índice de títulos,
  sino por la circunstancia en que hacen falta —al despertar, al salir de casa,
  antes y después de comer, al caer en el pecado, en la angustia y la tristeza,
  al entrar en el templo, antes de leer la Escritura, antes de confesar y de
  comulgar—. Veinticuatro momentos repartidos en cuatro grupos: el día, el
  alma, los demás, ante Dios.
- **El momento de la hora, destacado arriba**. En las horas que no tienen un
  momento propio no se inventa ninguno: se ofrece la oración de Jesús.
- **36 oraciones nuevas**, hasta 79, y **ningún momento vacío**: la oración de
  los ancianos de Óptina, los troparios de compunción de las Completas, el
  versículo de san Juan Casiano contra los pensamientos, «Bajo tu compasión»
  (papiro del siglo III), el tropario del domingo de la Ortodoxia, las
  bendiciones de la mesa de la tarde y de Pascua, la conmemoración de los vivos
  y de los difuntos, y las guías prácticas para quien llega nuevo: cómo se hace
  la señal de la cruz, qué se hace dentro del templo, cómo es la confesión y
  cómo se prepara la comunión.
- **Todas las oraciones** en pantalla aparte, con el buscador.

### Corregido

- **Las fichas de los textos redactados por ATHOS declaraban derechos que no
  eran suyos**: heredaban de la plantilla el aviso «texto litúrgico
  tradicional, de dominio público en su original griego o eslavo». Cuatro
  textos —el examen del día, la oración antes del trabajo, la guía de examen
  antes de la confesión y la oración por la paz— se presentaban así. Ahora la
  fuente, los derechos y la primera línea de las notas de todo lo que ATHOS
  escribe se fijan después de los datos de cada ficha, de modo que ya no se
  pueden perder al escribirla, y tres pruebas lo vigilan.

## [1.4.0]

### Añadido

- **El Evangelio del día muestra el texto exacto**: sólo los versículos de la
  perícopa, no el capítulo entero. El analizador entiende las más de mil
  referencias del leccionario, incluidos los cruces de capítulo y los tramos
  sueltos; lo que no puede recortar con seguridad remite al capítulo.
- Inicio muestra los primeros versículos del Evangelio, no sólo la cita.
- **102 santos nuevos con su vida**, hasta 162 repartidos por los doce meses.
- **Sección de estudio**: cinco itinerarios con treinta y siete lecciones
  —primeros pasos, el Credo, los siete Concilios, la Liturgia explicada y la
  oración del corazón— y un catálogo de diecisiete obras. Con progreso por
  lección y búsqueda global.
- **Capturas reales en el manifest**, tomadas con `scripts/screenshots.mjs`.

## [1.3.0]

### Añadido

- **Tres oficios diarios**: mañana, mediodía y noche, con la estructura del
  Horologion. El del mediodía sigue la Hora Sexta (salmos 53, 54 y 90) y el de
  la noche las Pequeñas Completas (50, 69 y 142).
- **La pantalla de inicio propone el oficio de la hora**, con su nombre griego y
  un botón para empezar; si ya se había empezado, ofrece continuar.
- **Fórmulas en griego** con transliteración: Trisagio, Kyrie eleison, Christe
  eleison, Padre Nuestro, Rey Celestial, Theotoke Parthene, Axion estin, la
  oración de Jesús y la despedida. Se eligen en Configuración → Aspecto.
- **Oraciones propias**: se escriben en Orar → Mis oraciones y se añaden a
  cualquier oficio como una más. Entran en la copia de seguridad.
- **Komboskini** como paso del oficio, con contador incrustado que no obliga a
  salir de la oración. La sección pasa a llamarse por su nombre griego.
- Las repeticiones («tres veces», «cuarenta veces») se muestran en su sitio.
- Horas de cada oficio ajustables en Configuración.
- La barra superior indica en qué sección estás.

### Cambiado

- Las dos reglas que ATHOS creaba por defecto dan paso a los tres oficios. Las
  reglas creadas por el usuario se conservan intactas.

## [1.2.0]

### Añadido

- **Lecturas de todos los días del año.** Evangelio y Epístola de cada jornada,
  más los propios de Maitines, Vísperas y las Horas, del leccionario bizantino
  de tradición eslava. Se generan ejecutando en local
  [orthocal](https://github.com/brianglass/orthocal-python) (MIT, de Brian
  Glass), que implementa el cómputo completo —salto lucano incluido—, y se
  guardan para 2024-2045 en los dos calendarios. Reproducible con
  `scripts/build-lectionary.sh`.
- Cada lectura lleva resuelto el libro y el capítulo, así que se abre
  directamente en la Biblia.
- **Trece reproducciones de iconos** de Wikimedia Commons, con su autor,
  datación, licencia y enlace al origen. Ninguna generada por ordenador;
  `scripts/fetch-icons.py` comprueba la licencia contra la API de Commons y
  cada imagen se verificó a la vista.

### Retirado

- **Diario espiritual y hábitos.** Con ellos se van la pantalla de Seguridad, el
  bloqueo por PIN y el cifrado, que sólo servían al diario. Favoritos,
  marcadores y notas se mantienen.
- Al actualizar, lo que hubiera en el diario y los hábitos queda archivado y
  puede descargarse una vez desde Configuración → Datos antes de borrarse.

## [1.1.0]

### Añadido

- **Lanzador de escritorio**: `run.sh` e `install.sh` con icono en el Escritorio
  y entrada en el menú; `server.py` sirve la aplicación por HTTP, que es lo que
  necesita una PWA. Adaptado a KDE Plasma y a GNOME.
- **Acceso desde el móvil**: `run.sh --movil` muestra la dirección en la red
  local con código QR, y `run.sh --tunel` abre un túnel HTTPS desde el que el
  teléfono sí puede instalar ATHOS.
- **Publicación**: `deploy.sh` prepara la carpeta para cualquier alojamiento
  estático con HTTPS y publica en GitHub Pages. ATHOS puede colgar de una
  subcarpeta mediante `ATHOS_BASE`.
- **Pantallas de arranque de iOS**: diez tamaños enlazados con su media query.

### Corregido

- Los campos de formulario medían 15 px, y iOS ampliaba la página al enfocarlos.
- Controles pequeños con puntero táctil: botones, segmentados, casillas de la
  regla de oración (24 px de área) y celdas de hábitos (14 px).
- El selector de calendario desbordaba la pantalla a 360 px de ancho.
- `run.sh --stop` no detenía el servidor: `setsid cmd &` devuelve el PID de
  setsid, no el del proceso servidor.
- La variable `ATHOS_BROWSER` se ignoraba si el navegador no estaba en la lista
  de familias conocidas.
- Dos elementos de navegación compartían nombre accesible.

## [1.0.0]

Primera versión.

### Añadido

- **Armazón** — PWA instalable con navegación inferior en móvil y barra lateral
  en escritorio, modo oración sin distracciones y soporte de `window-controls-overlay`.
- **Oraciones** — 45 textos en 18 categorías, con favoritos, notas, historial y
  tamaño de letra configurable.
- **Regla de oración** — reglas propias por ámbito (diario, domingo, fiesta,
  ayuno), pasos reordenables con enlaces a textos y objetivos, progreso por fecha
  y racha.
- **Oración de Jesús y chotki** — contador con objetivos de 33, 50, 100, 300 o
  personalizado, temporizador, vibración, sonido, bloqueo de pantalla, historial
  y estadísticas.
- **Biblia** — Reina-Valera 1909 completa (66 libros, 31 084 versículos), canon
  ortodoxo con los deuterocanónicos fichados, indexación en segundo plano para
  búsqueda sin conexión, marcadores y notas.
- **Salterio** — 150 salmos en numeración de los Setenta, con correspondencia
  hebrea explícita, 20 kathismata con sus estasis y kathisma sugerido del día.
- **Calendario litúrgico** — paschalion juliano convertido por día juliano,
  ciclo móvil completo, ciclo fijo, tono del Octoecos, calendario nuevo o
  juliano a elección.
- **Ayuno** — motor de reglas que resuelve cualquier día del año con seis grados
  y el detalle de lo permitido.
- **Santos** — 60 conmemoraciones con biografía, categorías y fichas de himnos.
- **Biblioteca** — Divina Liturgia de san Juan Crisóstomo y otros nueve oficios,
  akathistos, cánones, 12 Padres de la Iglesia, los 20 monasterios del Monte
  Athos con mapa esquemático, y 12 fichas de iconografía.
- **Diario espiritual** — privado, con bloqueo por PIN y cifrado AES-GCM opcional.
- **Hábitos** — 11 hábitos predefinidos y propios, con vistas de semana, mes y año.
- **Búsqueda global** sin conexión, agrupada por categoría.
- **Datos** — exportación a JSON y Markdown, importación validada con modo
  combinar o reemplazar, almacenamiento persistente y borrado completo.
- **Accesibilidad** — alto contraste, tipografía y ancho de lectura ajustables,
  navegación por teclado con atajos, etiquetas ARIA.
- **Internacionalización** preparada para ocho idiomas; español completo.
- 169 pruebas automatizadas.

### Conocido

- Sin sincronización entre dispositivos.
- Desbloqueo biométrico detectado pero no implementado.
- Los recordatorios sólo suenan mientras la aplicación sigue viva.
- Parte del corpus figura como *pendiente de incorporar*; ver *Configuración → Fuentes*.
