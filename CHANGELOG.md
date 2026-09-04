# Registro de cambios

Este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [1.22.0]

### Añadido

- **Las cuatro Horas, enteras y rezables.** Hasta ahora había una sola ficha que
  las resumía en cuatro párrafos: servía para saber qué era la Hora Tercera, no
  para rezarla. Ahora cada una —**Primera, Tercera, Sexta y Novena**— tiene su
  propia página con la forma completa del Horologion: el comienzo, sus tres
  salmos con la razón de que sean ésos, el tropario propio de la hora, su
  theotokion, el Trisagio, las cuarenta invocaciones, la oración de toda hora y
  la oración final, que es distinta en cada una.
  - La Primera cierra con «Cristo, luz verdadera»; la Tercera con la de san
    Mardario; la Sexta y la Novena con las dos de san Basilio el Grande.
  - «Las Horas» sigue existiendo y ahora es su portada: las cuatro de un
    vistazo, para saber cuál toca.
- **El versículo del día, en lo alto de Inicio.** Ciento treinta y cinco
  referencias elegidas —de los Evangelios, los Salmos, las cartas y el Antiguo
  Testamento—, repartidas por día del año, de modo que el versículo de un día
  concreto es siempre el mismo y dos personas que hablan del de hoy hablan del
  mismo. Se pinta como una inscripción y lleva al capítulo entero.
- **Por dónde ibas.** La biblioteca es de las secciones a las que se vuelve, y
  ahora la portada abre con las últimas tres fichas visitadas.

### Cambiado

- **La portada de la biblioteca cabe de un vistazo.** Cada tarjeta ocupaba media
  pantalla de móvil —icono en una línea, título en otra, cuatro renglones de
  descripción y la cuenta debajo—: con nueve secciones, ver el índice costaba
  seis pantallas de dedo. Ahora el icono, el título y la cuenta comparten
  renglón y la descripción se recorta a dos líneas. **De 470 a 122 píxeles por
  tarjeta**, y de seis pantallas a dos y media; en escritorio, dos columnas.

### Arreglado

- **Una Hora ya no se rotula «Divina Liturgia».** El epígrafe de la ficha de
  cualquier oficio decía siempre lo mismo, así que unas Vísperas o unas
  Completas quedaban mal rotuladas en su propia página. Ahora dice de qué clase
  de oficio se trata, y el historial lo registra igual.
- «Despedida» salía dos veces en las Horas: como título de sección y otra vez
  como encabezado dentro.

### Detalles

- **De dónde salen los textos de las Horas.** El reparto de los salmos y el
  orden de las partes son datos documentados del Horologion. Los troparios, los
  theotokia y las oraciones finales son textos fijos, de dominio público en su
  original griego, y van traducidos para ATHOS: la ficha lo dice y no se
  presentan como tomados de un libro litúrgico español publicado. Lo que cambia
  cada día —los kontakia del Menaion, del Octoecos y del Triodion— se marca como
  pendiente y se dice de dónde habría que tomarlo.
- **En el versículo del día ATHOS no escribe Escritura.** Pone sólo la
  referencia; las palabras las saca de la Biblia que la aplicación ya lleva
  dentro, por el mismo camino que las lecturas del día. Una prueba resuelve las
  ciento treinta y cinco contra los archivos de verdad y falla si alguna no
  señala a un versículo que existe.
- 732 pruebas (151 nuevas).

## [1.21.0]

Nada de contenido nuevo: esta versión es la aplicación por dentro. Seis cosas
que se notan al usarla, y cuatro de ellas eran fallos.

### Arreglado

- **La flecha de volver ya no echa fuera de ATHOS.** Llamaba a `navigate(-1)`
  sin mirar si había algo detrás. Al abrir la aplicación directamente en una
  pantalla interior —los cuatro atajos del manifiesto, una notificación, un
  enlace compartido, un favorito— no lo había, y la flecha salía del programa.
  Ahora, cuando no hay historia propia, sube a la pantalla de la que cuelga
  ésta.
- **Los resultados de la búsqueda vuelven a tener tildes.** `highlight()`
  buscaba sobre el texto sin acentos —así «oracion» encuentra «oración»— pero
  devolvía también ese texto pelado, y los extractos salían con faltas:
  «senal de la Cruz», «tradicion», «esta». Quitar los acentos acorta la
  cadena, así que ahora se guarda a qué letra del original corresponde cada
  letra de la forma sin acentos y se recorta sobre el original.
- **Ninguna dirección rota deja tirado al usuario.** Veintiséis pantallas
  vacías no ofrecían ni un enlace. Las diecisiete de «esto no existe» ahora
  salen a su pantalla madre con una frase que la nombra —«Ir al Salterio»,
  «Ir a los Padres de la Iglesia»—, y cuando la madre tampoco existe se salta
  al abuelo en vez de caer en otro callejón.
- **La coincidencia de la búsqueda ya no es un amarillo de rotulador.** No
  había estilo para `<mark>` y salía el del navegador. Ahora es un baño de oro
  con el filo subrayado.

### Añadido

- **La búsqueda se recorre con el teclado.** Se abría con Ctrl/⌘ + K y ahí se
  acababa el atajo: las flechas no hacían nada y Enter abría siempre el
  primero. Ahora ↑ ↓ recorren todos los resultados de arriba abajo —cruzando
  los grupos, que ordenan la vista pero no el camino—, Inicio y Fin saltan a
  los extremos, y Enter abre el señalado. El foco no se mueve del campo, así
  que se puede seguir escribiendo.
- **Se nota que se ha cambiado de página.** El título de la pestaña se quedaba
  en «ATHOS» para las sesenta y tantas rutas, y quien usa un lector de pantalla
  no oía nada al pulsar un enlace. Ahora cada pantalla pone su encabezado en la
  pestaña, lo anuncia en una región viva y lleva el foco al contenido.
- **Saltar al contenido.** El `main` ya tenía `id` y `tabIndex` esperando a que
  algo apuntara ahí. Con el teclado ya no hay que recorrer la barra lateral
  entera para llegar al texto.

### Cambiado

- **La espera ya no parpadea.** Casi todo se lee de IndexedDB y llega en unas
  decenas de milisegundos: pintar «Cargando…» al instante era un destello de
  texto en cada paso. Ahora el aviso tarda 220 ms en escribirse y quien no
  espere no lo verá nunca; el recuadro sí se pinta desde el principio, para
  que la página no dé un salto y para que el texto entre en una región viva que
  ya existía. Donde se sabe la forma de lo que viene —una lista, un texto, una
  pantalla entera— se enseña su silueta.
- **Cuarenta y cuatro píxeles donde se toca con el dedo.** Los chips, las
  pestañas y los botones pequeños se quedaban en cuarenta con el puntero
  grueso, y la fila de meses del santoral se fallaba al vuelo.

### Detalles

- `parentPath()` sabe saltarse los tramos que no son pantalla —`categoria`,
  `editar`, `monasterio`, `obra`, `kathisma`, `dia`, `oficio`—. Una prueba
  recorre la tabla de rutas de verdad y falla si alguna ruta nueva estrena un
  tramo que no esté declarado, así que la lista no puede quedarse atrás en
  silencio.
- Las frases de destino («al Salterio», «a la Biblia», «a los Padres de la
  Iglesia») viven en el archivo de idioma y se guardan enteras: en español el
  artículo cambia con cada destino y no se deduce de un nombre suelto sin
  inventarse una gramática.
- El título de la pestaña sale del `h1` que acaba de pintarse, no de una tabla
  aparte: lo que se anuncia y lo que se lee arriba no pueden discrepar.
- 581 pruebas (32 nuevas): quince direcciones rotas montadas sobre el enrutador
  real, el recorrido de la flecha por toda la tabla de rutas, y que marcar una
  coincidencia no pierda ni duplique una letra del texto.

## [1.20.0]

### Añadido

- **El catecismo, con su armazón clásico.** Pasa de 68 preguntas a **108**, y
  sobre todo gana lo que le faltaba: la estructura de tres partes con que un
  catecismo ortodoxo se ha enseñado siempre, tomada de san Pablo —«ahora
  permanecen la fe, la esperanza y el amor»—.
  - **La fe**: los **doce artículos del Símbolo**, uno por uno, con lo que dice
    cada uno, contra qué se escribió y qué se juega en él. El Filioque, la
    cláusula contra Marcelo, el «consustancial» que costó cinco destierros.
  - **La esperanza**: qué es la oración, la **invocación, las siete peticiones
    y la doxología** del Padre Nuestro, y las **nueve bienaventuranzas**.
  - **El amor**: los dos mandamientos en que Cristo resumió la Ley y el
    **Decálogo entero**, en la numeración ortodoxa, avisando de que la católica
    y la luterana cuentan distinto.
- **El catecismo, decorado por todos lados.** Cada pregunta va dentro de una
  orla de entrelazo con rombos en las esquinas, la pregunta en su cartela
  dorada, la respuesta con capitular en tinta roja dentro de su recuadro y una
  cinta doble en el margen. Entre pregunta y pregunta, una banda de trenza; la
  parte se abre con la puerta y se cierra con el remate.

### Detalles

- La orla es un `border-image` sobre un SVG en línea: enmarca los cuatro lados
  con un solo mosaico, no pesa nada y no hay ninguna imagen que descargar.
  Adelgaza sola por debajo de 30 rem, donde un marco de dieciséis píxeles se
  comería el ancho de lectura, y ahí la capitular pierde su caja.
- Todo cuelga del interruptor de ornamentos: quien prefiera la página desnuda
  la tiene en Configuración.
- Los artículos del Símbolo, las peticiones y los mandamientos están
  formulados como preguntas y no como títulos, para que el buscador del
  catecismo los encuentre por lo que la gente escribe.
- El Credo no se transcribe en el catecismo: el texto litúrgico vive en Orar →
  Oraciones, y aquí va la explicación, que es prosa de ATHOS.

## [1.19.0]

### Añadido

- **El Himno Akáthistos a la Theotokos, entero.** Las veinticuatro estrofas con
  sus ciento cuarenta y cuatro saludos, el proimion y el acróstico completo de
  la alfa a la omega, traducidos del griego. Es el himno mariano más antiguo
  que se canta sin interrupción y el modelo de todos los demás akathistos.
- **El Canon Pascual, entero**: los ocho irmoi, el kontakion, el megalinario de
  la novena oda y el exapostilario.
- **Los otros cuatro akathistos y los otros cuatro cánones**, con lo que se
  puede traducir con seguridad: proimion, estribillos, irmoi de las nueve odas,
  kontakia y las oraciones que se rezan sueltas. Pasan de pendientes a
  utilizables: con eso se sigue y se responde un himno cuando lo canta otro.
- **Las cincuenta y cuatro obras patrísticas tienen ya su pasaje**, el que da
  nombre a cada una: el altar del pobre de Crisóstomo, la gloria de Dios que es
  el hombre viviente de Ireneo, el anzuelo de la divinidad de Gregorio de Nisa,
  el trigo de Dios de Ignacio. Cuarenta y siete no tenían ni una línea.
- **Tres oraciones más completas**: el Gran Canon, el Akáthistos y el canon de
  la Comunión ya no remiten a un hueco, sino que traen lo que de ellos se reza
  fuera del templo.

### Corregido

- **Un texto corregido podía tardar meses en llegar a quien ya tenía la
  aplicación.** La siembra sólo se rehacía al subir a mano `CONTENT_VERSION`, y
  ese número es fácil de olvidar. Ahora también se rehace cuando cambia la
  versión del paquete, que sube en cada publicación por fuerza.

### Lo que sigue faltando, y por qué

Los troparios propios de cada santo, las estrofas de los cuatro akathistos
devocionales, los doscientos cincuenta troparios del Gran Canon y el texto
íntegro de las obras. Nada de eso se ha rellenado con aproximaciones: un himno
inventado sería peor que un hueco declarado. De las obras del siglo XX, con
derechos vigentes, va una frase citada y no una traducción.

## [1.18.0]

### Añadido

- **Ningún santo se queda sin tropario.** El propio de cada uno sigue sin
  incorporarse —son cientos y ATHOS no escribe himnos—, pero ya no hay ficha
  muda: se muestra el **tropario general de su rango**, que es exactamente lo
  que la Iglesia canta cuando no dispone del propio y lo que figura como tal en
  el Horologion. Hay uno para los mártires, otro para los jerarcas, otro para
  los monjes, los apóstoles, los profetas, los confesores y los justos.
- **Doce grandes fiestas con su tropario propio**: Natividad, Teofanía,
  Encuentro, Anunciación, Transfiguración, Dormición, Natividad y Entrada de la
  Theotokos, la Cruz, la Protección y las Potestades incorpóreas. Las tres
  fiestas de la Cruz comparten el suyo, y una clausura repite el de su fiesta,
  como manda el libro.
- **Oración de Manasés**, que estaba pendiente desde el principio. Es un texto
  de la Septuaginta y la Reina-Valera 1909 sigue el canon corto, así que se ha
  traducido del griego.
- **Los cuatro oficios pendientes, armados**: las Horas con sus salmos y el
  tropario propio de cada una, el Oficio de Medianoche, el Moleben y la
  Paráclesis. Pasan de «pendiente» a utilizable.
- **La pantalla de Fuentes dice qué falta y por qué.** Antes ponía «17
  pendientes» y ahí se acababa. Ahora cada hueco dice de qué clase es —falta la
  licencia, son cientos de propios, o es una traducción larga por hacer— y qué
  haría falta para cerrarlo.

### Corregido

- **Lo que ATHOS quitaba de su contenido se quedaba para siempre en las
  aplicaciones ya instaladas.** La siembra usaba `bulkPut`, que añade y
  actualiza pero no borra: por eso el código decía 389 santos y la pantalla de
  Fuentes seguía enseñando 417, con san Demetrio tres veces el 26 de octubre.
  Ahora las tablas de contenido se vacían antes de sembrar. Las del usuario no
  se tocan, y hay una prueba para cada mitad de esa frase.

### Sobre lo que no se ha hecho

Ningún texto litúrgico se ha inventado. Lo que se ha incorporado es de una de
estas dos clases: lo que la Iglesia prescribe para el caso —los troparios
generales—, o traducciones del original griego, que es de dominio público,
diciendo en la ficha que la versión española es de ATHOS y no de un libro
publicado.

## [1.17.0]

### Añadido

- **Planes de lectura.** Cuatro: los cuatro Evangelios en 89 días, el Nuevo
  Testamento en 260, el Salterio por kathismata en 20 y la Biblia entera en un
  año. Los días no están escritos a mano: se reparten los capítulos entre los
  días del plan, parejo y sin partir ninguno, de modo que un plan son cuatro
  líneas de definición. Se marca lo leído, se puede saltar un día y volver a
  él, y el avance se guarda en el dispositivo.
- **Leer se abre por lo de hoy.** La epístola y el evangelio del día van
  delante con su cita a la vista, después el plan que se lleve empezado y sólo
  entonces los libros.
- **Ir a un pasaje desde la Biblia.** Escribir «Juan 3, 16» —o «Mt 5», o
  «1 Co 13»— ofrece abrir ese capítulo directamente. Usa el mismo análisis de
  citas que el leccionario, así que entiende abreviaturas y las dos notaciones.
- **Ornamentos bizantinos.** Cabecera de entrelazo sobre el título de cada
  texto, remate al pie, capitular iluminada en tinta roja dentro de su recuadro
  y filete de tabla de icono en las tarjetas. Todo dibujado con trazo, no con
  imágenes: unos cientos de bytes, escala sin perder filo y sigue al tema.
- **Cuatro ajustes nuevos**: ornamentos, capitular, **densidad** —el aire entre
  las cosas, aparte del tamaño de la letra— y **por dónde se abre la
  aplicación**, para quien entra siempre a lo mismo.

### Detalles

- La capitular pierde su recuadro por debajo de 24 rem: a esa anchura una
  letra de tres líneas deja el párrafo en una columna de dos palabras.
- Los planes dicen en su ficha que no son la lectura de la Iglesia. El
  leccionario está en Leer → Lecturas del día y sigue el año litúrgico; un plan
  es para leer seguido por tu cuenta, que es otra cosa.

## [1.16.0]

### Añadido

- **La historia, terminada.** Los **70 hechos** de la cronología tienen ya su
  reseña escrita: no queda ninguno reducido a una fecha. Entre los 21 que
  faltaban están cinco Concilios Ecuménicos —Éfeso, Calcedonia, Constantinopla
  II y III, Nicea II—, el Quinisexto, los concilios palamitas, Florencia, la
  condena del filetismo de 1872 y el Concilio de Creta de 2016.
- **Los nombres llevan a su página.** Cuando un texto nombra a un santo, a un
  Padre, a una obra suya, a un monasterio del Athos o a un icono, ese nombre es
  ahora un enlace a su ficha. Funciona en la historia, el catecismo, las vidas
  de los santos, los Padres y los artículos del Monte Athos.
- **Las dos fichas de la misma persona, enlazadas.** San Gregorio Palamás tiene
  página como santo —su vida y el día de su fiesta— y como Padre —lo que enseñó
  y sus obras—. Cada una lleva ahora a la otra.
- **Ir a un concilio concreto** desde la portada de la historia baja hasta él,
  igual que hacía ya el buscador del catecismo con sus preguntas.

### Corregido

- El salto a un elemento concreto dentro de una página larga no funcionaba en
  la historia: el enlace dejaba al lector arriba del todo. Ahora es un solo
  gancho compartido por la historia y el catecismo.

### Detalles del enlazado

- Sólo se enlazan nombres inequívocos: «San Juan Damasceno» sí, «Juan» no. Los
  apodos que pueden ir sueltos —«Crisóstomo», «Palamás»— están escritos y
  revisados uno por uno.
- Un mismo destino se enlaza **una sola vez por texto**, con un tope de cuatro
  enlaces por párrafo: un párrafo lleno de enlaces no se lee, se escanea.
- **Nunca sobre texto litúrgico.** Una oración, un tropario o un canon se
  muestran tal como son. La regla es la misma que impide inventarlos.

## [1.15.0]

### Añadido

- **Un santo cada día del año.** Se han escrito **197 conmemoraciones nuevas**
  para los días que estaban en blanco: ya no queda ninguno, incluido el 29 de
  febrero —san Juan Casiano, cuya fiesta sólo cae en años bisiestos—. El
  santoral pasa de 220 a **389 fichas** con vida escrita, en fechas del
  calendario eclesiástico.
- **Doce Padres de la Iglesia más**, de san Ignacio de Antioquía a san Sofronio
  de Essex, con lo que enseñó cada uno, la ficha de cada obra, por dónde empezar
  a leerlo y —donde hace falta— qué conviene saber antes. La lista se recorre
  ahora **por épocas**, de los que oyeron a los apóstoles hasta el siglo XX.
- **Siete momentos nuevos de oración**: junto a un moribundo, en el duelo, por
  el matrimonio, en la espera de un hijo, por la casa, cuando falla la fe y en
  tiempo de guerra. Con lo que hay que hacer cuando alguien se está muriendo y
  qué significan los días tercero, noveno y cuadragésimo.
- **Veintinueve preguntas más en el catecismo**, con tres partes nuevas: la
  Escritura, dentro del templo y la vida de todos los días. Entran el dinero, el
  trabajo, la sexualidad, el aborto, el suicidio, la cremación, la salvación de
  los no cristianos y el diaconado femenino. Y **buscador**, que lleva a la
  pregunta y no sólo a la parte que la contiene.
- **Seis artículos nuevos del Monte Athos**: el ávaton con sus objeciones, el
  gobierno de la Sagrada Comunidad, los sketes y las ermitas, los iconos, el
  canto bizantino y cómo se llega. Cada monasterio dice ahora **qué es hoy** y
  **quién vivió en él**.
- **Portada de la biblioteca con cuentas reales**, calculadas del contenido:
  ningún número escrito a mano que pueda quedarse viejo.

### Corregido

- **Veintiocho conmemoraciones duplicadas.** San Demetrio de Tesalónica estaba
  tres veces el 26 de octubre y la Natividad de Cristo dos veces el 25 de
  diciembre, con fichas distintas, porque las tandas del santoral se habían
  escrito por separado. Una prueba nueva impide que vuelva a pasar.
- **Veinte fichas de santos que se quedaban en una línea**, entre ellas las de
  las mayores fiestas del año: la Anunciación, la Exaltación de la Cruz, la
  Degollación del Bautista, san Marcos, san Demetrio y san Esteban Protomártir.

## [1.14.0]

### Añadido

- **Historia de la Iglesia ortodoxa**, de Pentecostés a hoy: ocho épocas, **70
  hechos fechados** y **13 concilios con ficha completa** —quién los convocó,
  cuántos asistieron, contra qué se reunieron, qué quedó definido y qué
  conviene no dar por sabido—.

  Están los siete Ecuménicos, de Nicea 325 a Nicea II 787, y también los
  locales que la Iglesia tiene por vinculantes: el Quinisexto, los tres
  concilios palamitas, Florencia, Jerusalén 1672 y Creta 2016.

  **Construida en dos capas a propósito.** Donde hay prosa, se escribe; donde
  no la hay todavía, el hecho conserva su año y su lugar en la cronología y lo
  dice: «sin reseña escrita todavía». Un hueco fechado enseña más que una
  ausencia, porque se ve. La portada indica cuántos hechos están escritos de
  cuántos hay.

  Los conflictos vivos se cuentan como conflictos, con las dos posiciones: la
  ruptura por Ucrania, las cuatro Iglesias que no acudieron a Creta, la reforma
  del calendario, la autocefalía americana, la anomalía de la diáspora frente a
  la condena del filetismo de 1872. Y las rupturas antiguas no se cuentan como
  victorias: Calcedonia dice quiénes se separaron y por qué; 1054, que las
  excomuniones se levantaron en 1965.

  Dieciséis pruebas vigilan que el esqueleto esté entero: que no falte ningún
  Ecuménico, que las fechas vayan hacia delante, que cada concilio diga quién
  lo convocó y contra qué, y que lo discutido se marque como discutido.

## [1.13.0]

### Añadido

- **Catecismo**: 39 preguntas con su respuesta, en diez partes —Dios, el
  hombre, Cristo, la Iglesia, los Misterios, la vida cristiana, las últimas
  cosas, el fondo y las preguntas difíciles—. Cada una dice a quién sirve, y se
  puede filtrar: quien llega de fuera, quien se prepara para el bautismo y
  quien lleva años dentro no necesitan lo mismo.

  Dos reglas lo gobiernan, y hay pruebas que las exigen. **Lo que se discute
  entre confesiones se marca como discutido** —el Filioque, el primado del
  papa, el purgatorio, el pecado original, la satisfacción— explicando la
  postura ajena sin caricaturizarla; una prueba comprueba que cada aviso nombre
  a quien discrepa. Y **lo que la Iglesia no ha definido se declara no
  definido**: el estado intermedio, la salvación fuera de sus límites visibles,
  la relación entre gracia y libertad, el mal.

### Cambiado

- **Los oficios ya no se marcan oración por oración.** Trece casillas que
  puntuar mientras se reza convertían el oficio en una lista de tareas. Ahora
  se da por rezado al llegar al final, que es cuando de verdad lo está: en el
  último paso, «Siguiente» deja sitio a «Terminar». Por dentro se siguen
  guardando las marcas de cada paso, así que el progreso y las estadísticas
  funcionan igual que antes.

## [1.12.0]

### Añadido

- **Los oficios se rezan paso a paso.** Un solo paso en pantalla, con la
  navegación pegada al borde inferior, donde llega el pulgar, y el número de
  paso siempre a la vista. Marcar un paso avanza al siguiente; desmarcarlo no,
  que sería quitarle a alguien lo que acaba de corregir. Rezar los trece pasos
  de la mañana desplazándose por un rollo era perder el sitio a cada rato.
  «Seguido» sigue estando a un toque, para quien lo prefiera o lea en pantalla
  grande.

- **Las conmemoraciones que faltaban en los tres oficios.** La mañana cierra
  haciendo sitio a los demás —los nombres, uno a uno— antes de la despedida,
  como hace el libro de oraciones. La noche recuerda a los difuntos, que es su
  hora. Y el mediodía, a los que nos hacen bien.

- **Restaurar un oficio.** Los oficios se siembran una sola vez, y con razón:
  resembrarlos borraría lo que cada uno haya ordenado a su gusto. El precio era
  que las mejoras posteriores no llegaban a quien ya tenía ATHOS instalada.
  Ahora se pueden pedir, oficio por oficio, avisando de lo que se pierde. Los
  otros dos no se tocan, y hay una prueba que lo exige.

### Corregido

- **Los números de versículo bajaban a nueve píxeles** en una pantalla
  estrecha: quedaban como un adorno ilegible. Ahora tienen suelo.
- **Las celdas del calendario no llegaban al mínimo táctil a 320 px.** En
  pantallas muy estrechas el margen de la página cede para que quepan.
- **Los nombres de santo del calendario** eran enlaces de bloque sin relleno:
  medían lo que una línea de texto, la mitad de lo que hay que poder tocar.

Barridas las 23 pantallas a 320, 360 y 412 píxeles: sin desbordes, sin texto
por debajo de lo legible y sin controles por debajo del mínimo táctil.

## [1.11.0]

### Añadido

- **Los Padres de la Iglesia dicen ahora qué enseñaron.** Cada uno tiene, además
  de su vida, entre tres y cinco párrafos sobre su aportación —por qué la
  Iglesia lo sigue leyendo—, una guía de por dónde empezar a leerlo y qué
  esperar, y en tres casos un aviso de lo que conviene saber antes: la opinión
  discutida de san Isaac sobre el infierno, los escritos que se atribuyen a
  san Máximo sin serlo, y las homilías de san Juan Crisóstomo contra los
  judaizantes, que ni se excusan ni se esconden.

- **Las 24 obras patrísticas dicen de qué tratan** y cuándo se escribieron.
  Antes, una obra sin texto incorporado era una ficha muda: «Sobre el Espíritu
  Santo — contenido pendiente de incorporar». Ahora se sabe qué sostiene ese
  tratado, contra quién y de dónde sale el artículo del Credo.

- **Los 10 akáthistos y cánones y los 10 oficios explican qué son**, cómo están
  construidos por dentro y cuándo se cantan. El Gran Canon, las dos Divinas
  Liturgias, los Presantificados, el Paráclisis: todo lo que todavía no se
  puede dar entero, al menos se entiende.

- **Las secciones de tropario y kontakion de los santos ya no están mudas.**
  Eran 220 fichas con dos apartados que sólo decían «pendiente». Ahora explican
  qué es un tropario, qué es un kontakion, y por qué ATHOS no incorpora el suyo:
  hacerlo exige una versión española con licencia comprobable, y aquí no se
  redacta un himno propio para llenar el hueco.

Nada de esto es texto litúrgico ni patrístico: es prosa de ATHOS, y sus fichas
lo declaran con su propia licencia. La regla del proyecto sigue intacta —no se
inventa lo que no se puede verificar—, pero dejar de inventar no obliga a dejar
de enseñar.

## [1.10.0]

### Añadido

- **El ofrecimiento de instalación aparece solo al entrar**, y su botón abre
  **el diálogo del navegador**, no una imitación. Antes existía, pero esperaba
  doce segundos escondido en un aviso fino: era como no ofrecerlo nunca.
  Ahora sale a los dos segundos, con la cruz, el título, qué se gana, «Instalar
  ATHOS» y «Ahora no». Si se rechaza, no vuelve.

  **El diálogo oficial no se puede abrir solo al cargar la página**: los
  navegadores exigen un gesto del usuario y descartan la llamada si no lo hay.
  Por eso hay un botón, y por eso está donde se ve. Un toque, y el que aparece
  es el del navegador.

### Corregido

- El aviso «ATHOS ya funciona sin conexión» se pintaba **dentro** del
  ofrecimiento: los dos viven pegados al borde inferior y coinciden justo en la
  primera visita. Ahora la hoja mide su propio alto y los avisos se colocan
  encima, sin números mágicos que se rompen al crecer el texto.
- El ofrecimiento se quedaba asomando detrás del diálogo del navegador mientras
  el usuario decidía. Ahora se retira antes de llamarlo.
- `ResizeObserver` se usaba sin comprobar que existiera: donde no está, la
  aplicación entera se caía a la pantalla de error. Lo cazó una prueba nueva.

## [1.9.1]

### Añadido

- **El manifest se sirve también en `/manifest.json`.** El nombre estándar es
  `.webmanifest` y es el que enlaza el documento, pero muchos validadores,
  rastreadores y herramientas de PWA piden `/manifest.json` por convención y,
  al no encontrarlo, concluyen que la aplicación no tiene manifest. Ahora las
  dos direcciones sirven exactamente lo mismo, y una prueba lo exige.
- **Cinco campos más en el manifest**, de 17 a 22:
  `prefer_related_applications: false` y `related_applications: []` para que
  ningún navegador busque una aplicación nativa que no existe;
  `launch_handler` para que al abrirla de nuevo reutilice la ventana en vez de
  dejar una oración a medias en otra; `handle_links: preferred` para que,
  instalada, abra sus propios enlaces en lugar de mandarlos al navegador; y
  `edge_side_panel`, que permite tenerla en el panel lateral de Edge.

Comprobado con `Page.getAppManifest`: el navegador sigue interpretándolo sin un
solo error.

## [1.9.1]

### Corregido

- **El documento publicaba dos etiquetas `rel="manifest"`.** Una la ponía el
  fuente a mano y otra la inyectaba el plugin con la base de compilación. Los
  navegadores usan la primera y descartan el resto, pero los validadores lo
  señalan y no hay motivo para tener dos. Ahora la pone sólo el plugin.
- **El Service Worker no llegaba a activarse en diez segundos**, y hasta que no
  se activa y toma el control, Android no termina de ofrecer la instalación.
  La causa era el precaché: 7,9 MB antes de dar señales de vida.

### Cambiado

- **El texto bíblico sale del precaché.** No es un recorte: ATHOS lo vuelca a
  IndexedDB nada más arrancar —`autoIndexBible`— y lo lee de ahí, no de la red;
  precachearlo era descargar y guardar los mismos cinco megas dos veces.
  **El precaché baja de 7,9 MB a 3,9 MB** y el Service Worker pasa a activarse
  y tomar el control en seis segundos.

  Comprobado que no se pierde nada: con la red cortada siguen abriéndose la
  portada, las oraciones, el Salterio, **Juan 1 de la Biblia**, las lecturas del
  día, el calendario y el santoral. La Escritura completa —31 084 versículos—
  está en IndexedDB a los diez segundos de la primera visita.

- `npm run pwa:audit` comprueba además que haya un único enlace al manifest, que
  `/manifest.json` responda —es lo que piden muchos validadores— y que el
  Service Worker llegue a controlar la página, esperando a que se active en vez
  de mirar una sola vez.

## [1.9.0]

### Corregido

- **No se podía instalar, y eran dos fallos distintos.**

  El primero, en el Service Worker: con `clientsClaim: false` no tomaba el
  control de la página hasta la siguiente navegación, y Chrome, Brave y Edge no
  ofrecen instalar una aplicación cuyo Service Worker no controla la página.
  Medido antes y después: antes seguía sin controlar a los 61 segundos; ahora
  controla a los 6. La garantía de que una versión nueva no se aplica sola
  sigue intacta —de eso se encarga `skipWaiting: false`, que es otra cosa—.

  El segundo, peor: **ATHOS no se enteraba de que el navegador sí ofrecía
  instalarla.** `beforeinstallprompt` se dispara una sola vez y a los tres
  segundos, pero el escuchador vivía dentro de React, que no se monta hasta que
  termina de sembrarse la base de datos. El evento se perdía, y la pantalla de
  instalación decía «tu navegador no ofrece el botón de instalación
  automática» mientras el navegador lo estaba ofreciendo. Ahora se recoge en el
  propio `index.html`, antes de que arranque nada.

- **Firefox de escritorio no instala PWA**, y no es un fallo de ATHOS: el
  navegador retiró esa capacidad. En Android sí, con «Añadir a la pantalla de
  inicio».

### Cambiado

- Las capturas de la ficha de instalación y la imagen de vista previa salen del
  precaché: casi un mega que sólo lee el navegador y que retrasaba la primera
  visita. De 8,9 a 7,9 MB.
- El corpus pasa a servirse con `CacheFirst`: lleva huella de versión y no
  cambia, así que no hay por qué revalidarlo contra la red cada vez.

## [1.8.2]

### Corregido

- **La publicación seguía bloqueada, y no era una prueba: era Node.** El flujo
  de publicación usaba Node 20, donde vitest ni siquiera arranca
  —`webidl.util.markAsUncloneable is not a function`, una API que esa versión
  no tiene—. El flujo de comprobación usaba Node 24 y pasaba, así que la
  integración continua daba luz verde mientras la publicación se caía en cada
  intento. Reproducido instalando Node 20 y Node 22 en local: en 20 falla, en
  22 pasan las 365 pruebas.
- **Los dos flujos leen ahora la versión de un único sitio**, `.nvmrc`, para que
  no puedan volver a divergir. Dos pruebas lo vigilan: que ninguno fije la
  versión a mano y que la de `.nvmrc` cumpla lo que `package.json` exige.
- `engines` pedía Node >=20, que era una promesa incumplible. Ahora pide >=22,
  que es lo verificado.

## [1.8.1]

### Corregido

- **La publicación llevaba dos días sin actualizarse porque las pruebas
  fallaban en GitHub.** La prueba del manifest exigía `scope === '/'`, pero al
  publicarse en `usuario.github.io/athos/` el ámbito **tiene que ser**
  `/athos/`: la aplicación hacía lo correcto y la prueba la tumbaba. Ahora se
  comprueba lo que de verdad importa —que el ámbito acabe en barra, y que
  `start_url`, `id` y los accesos directos caigan dentro de él—, sea cual sea
  la carpeta de la que cuelgue.
- Por eso la cruz corregida seguía sin verse en el sitio publicado.

### Añadido

- **`npm run pwa:audit`**: auditoría de instalabilidad contra la aplicación
  servida y el navegador de verdad. Comprueba los criterios que Chrome usa para
  decidir si ofrece instalar —contexto seguro, manifest sin errores de
  interpretación, iconos que se descargan, Service Worker activo con precaché,
  navegación completa sin red, capturas y accesos directos—. Las pruebas miran
  los archivos que deja la compilación; esto mira lo que el navegador hace con
  ellos, que no es lo mismo.

## [1.8.0]

### Añadido

- **58 conmemoraciones nuevas**, hasta 220 en 169 días del año: los cuarenta
  mártires de Sebaste, santa María Egipcíaca, san Panteleimón, santa María
  Magdalena, san Demetrio, san Espiridón, y las grandes fiestas que faltaban
  —Anunciación, Transfiguración, Dormición, Exaltación de la Cruz, Natividad—.
  Sólo entran conmemoraciones cuya fecha en el calendario bizantino se conoce
  con seguridad: poner a un santo en un día equivocado sería la misma falta que
  inventarle un texto.
- **El tropario propio de la Hora Sexta**, con su theotokion. Era el hueco que
  el propio README señalaba con nombre y apellido. **Los tres oficios quedan
  sin un solo «pendiente de incorporar»**, y una prueba lo exige.

### Corregido

- **La etiqueta de un interruptor y su explicación se pintaban pegadas**
  —«Indexar automáticamenteATHOS descarga…»—. Eran dos `span` en línea, así que
  el margen que debía separarlos no hacía nada.
- Dos entradas del santoral con el mismo identificador no daban error: la
  segunda sobrescribía a la primera al sembrar y el santo desaparecía sin
  ruido. Tres pruebas nuevas comprueban que no haya repetidos, que cada
  conmemoración tenga día válido y vida escrita, y que lo sembrado coincida con
  el corpus.

## [1.7.2]

### Corregido

- **La cruz estaba al revés.** El travesaño inferior de la cruz ortodoxa sube
  hacia la izquierda de quien mira —la mano derecha de Cristo, donde estaba el
  ladrón que se arrepintió— y baja hacia la derecha. En ATHOS bajaba a la
  izquierda y subía a la derecha, es decir, decía lo contrario. Estaba así en
  las cuatro cruces del proyecto: el emblema de la aplicación, el icono del
  momento «al caer en el pecado», el generador de iconos y, por él, el favicon
  y los veinte PNG que produce. Corregidas todas y regenerados los iconos, las
  pantallas de arranque, la imagen Open Graph y las capturas del manifest.
  Cinco pruebas nuevas fijan la orientación y comprueban que los cuatro dibujos
  coinciden entre sí.
- **GitHub Pages devolvía 404 en los enlaces profundos.** La portada cargaba,
  pero entrar directo en `/athos/leer/salterio/50` —o recargar estando ahí— no.
  Al flujo de publicación le faltaba copiar `index.html` a `404.html`, que es
  como GitHub Pages resuelve las rutas de una aplicación de una sola página.
- **Dos pruebas se saltaban en silencio en GitHub.** Las que arrancan
  `server.py` contra `dist/` se saltan si esa carpeta no existe, y los flujos
  probaban antes de compilar: nunca llegaron a ejecutarse. Ahora se compila
  primero.

### Añadido

- El flujo de publicación pasa lint, tipos y pruebas antes de subir nada, igual
  que `deploy.sh`.

## [1.7.1]

### Corregido

- **`package-lock.json` se había quedado en la versión 1.5.0.** `npm ci` —lo
  que usa la integración continua y cualquiera que clone el repositorio— se
  niega a instalar si el candado y `package.json` no concuerdan. Comprobado
  ejecutándolo de verdad sobre una copia limpia.

### Añadido

- **Integración continua** (`.github/workflows/ci.yml`): en cada empujón y cada
  propuesta de cambio pasa lint, tipos, pruebas y compilación, incluida la
  compilación en subcarpeta. No publica nada; para eso está `deploy.sh`.
- **`.gitattributes`**: los scripts conservan finales de línea Unix aunque se
  clonen en Windows. Con CRLF, `bash` no encuentra el intérprete y `run.sh` no
  arranca.
- El README empieza por donde tiene que empezar un repositorio público: cómo
  clonarlo.

## [1.7.0]

### Corregido

- **Faltaban encabezados de primer nivel.** La portada enseña la oración de
  Jesús y ningún título, y las diecisiete pantallas de «esto no existe» —un
  santo que no está, un salmo fuera de rango, una dirección inventada— eran
  todas un párrafo suelto. Quien navega con lector de pantalla no encontraba
  dónde empieza el contenido. Ahora cada pantalla tiene exactamente uno, y
  cuarenta y una pruebas lo comprueban, once de ellas sobre direcciones que no
  llevan a ninguna parte.
- El acceso directo del sistema apuntaba a la oración de Jesús, que ya no
  figura en el menú de Orar. Ahora apunta al komboskini, y una prueba exige que
  todos los accesos directos correspondan a una ruta real.
- `deploy.sh` decía `git push -u origin main` en un repositorio que está en
  `master`. Ahora usa la rama en la que estés.

### Añadido

- **`deploy.sh --github` comprueba antes de publicar**: lint, tipos y pruebas.
  Publicar una versión rota en una dirección que la gente ya tiene guardada
  cuesta más de arreglar que los dos minutos que tardan. Con `--sin-pruebas` se
  salta, a propósito y no por descuido.
- **Open Graph con direcciones absolutas.** `og:image` era relativa y no la
  resuelve ningún servicio que muestre una vista previa del enlace. Con
  `--url https://…` —deducida sola al publicar en GitHub Pages— se reescriben
  absolutas y se añade `og:url`; sin ella se quedan relativas, que es lo
  correcto mientras no se sepa el dominio.
- **La búsqueda en blanco ya no es un callejón sin salida.** Enseñaba un campo
  y nada más. Ahora, sin escribir nada, ofrece lo último que has leído y la
  lista de todo aquello en lo que busca —oraciones, Biblia, Salterio, santos,
  liturgia, Padres, estudio, Monte Athos e iconos—, y desde ahí se entra
  directamente. Una prueba exige que cada entrada lleve a una ruta real.
- Capturas del manifest rehechas con el diseño nuevo.

### Comprobado

- Las **49 pantallas** recorridas una por una: ninguna en blanco, sin errores
  de JavaScript, sin enlaces muertos ni imágenes rotas, sin desbordes.
- **Publicada en una subcarpeta** (`/athos/`), servida de verdad: Service
  Worker con ámbito correcto, manifest con sus rutas dentro, icono y captura
  que existen, enlaces profundos, navegación sin conexión y ningún recurso
  absoluto saliéndose de la subcarpeta.

## [1.6.1]

### Corregido

- **El código QR llevaba a una dirección que rechazaba la conexión.** El
  servidor sabía la dirección de este ordenador en la red y la anunciaba, pero
  escuchaba sólo en 127.0.0.1: el teléfono que escaneaba se encontraba con
  ERR_CONNECTION_REFUSED. Saber una dirección no es lo mismo que responder en
  ella. Ahora el servidor lo comprueba de verdad —mira a qué interfaz está
  atado y abre una conexión contra sí mismo— y sólo entonces ofrece el código.
- Cuando ATHOS se sirve sólo para este ordenador, que es lo normal, la pantalla
  lo dice y muestra la orden que lo arregla (`./run.sh --movil`), con su botón
  para copiarla. Si escucha en la red pero el cortafuegos la bloquea, también
  se dice, con el puerto que hay que permitir.
- Dos pruebas nuevas arrancan el servidor de las dos maneras y comprueban lo
  que responde; la segunda además **pide ATHOS por la dirección que anuncia**,
  que es exactamente lo que hace el teléfono.

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
