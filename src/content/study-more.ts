/**
 * Más itinerarios de estudio, añadidos en la 1.30.
 *
 * El templo, las formas de rezar, los Misterios, el año de la Iglesia, la
 * Theotokos y los santos, y la muerte. Como los demás, son exposición
 * redactada para ATHOS: cuando algo es costumbre y no regla, o varía entre
 * tradiciones, se dice; cuando se nombra un concilio o un canon, es porque
 * existe y dice eso.
 */
import type { StudyCourse } from './study';

export const MORE_COURSES: StudyCourse[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'el-templo',
    title: 'El templo por dentro',
    subtitle: 'De la puerta al altar, parte por parte',
    level: 'principio',
    lessons: [
      {
        id: 'orientacion',
        title: 'Hacia el oriente',
        body: [
          'Una iglesia ortodoxa se recorre del oeste al este: se entra por la puerta del oeste y se camina hacia el altar, que está al este, por donde sale el sol. Es un camino de la oscuridad a la luz, y todo lo que hay dentro está ordenado a lo largo de él.',
          'Las tres partes del templo —nártex, nave y santuario— se leen desde antiguo como el mundo, la tierra que se santifica y el cielo.',
        ],
        readings: [{ label: 'El templo, con la planta', path: '/biblioteca/templo' }],
      },
      {
        id: 'narthex-leccion',
        title: 'La entrada',
        body: [
          'El nártex es el umbral. En la Iglesia antigua era el sitio de los catecúmenos y los penitentes; hoy es donde se encienden las velas y se compran, donde se dejan los nombres para que el sacerdote rece por ellos y donde se rezan algunos oficios breves.',
          'Al pasar a la nave uno se santigua y se inclina. Después se acerca al icono del día, en el centro, y lo besa.',
        ],
        readings: [{ label: 'El nártex', path: '/biblioteca/templo#narthex' }],
      },
      {
        id: 'nave-leccion',
        title: 'La nave',
        body: [
          'Es el lugar del pueblo. Se está de pie, porque es la postura de quien espera al Señor, y en muchas iglesias no hay bancos. Arriba, en la cúpula, Cristo mira desde lo alto: el cielo cubre la tierra.',
          'Delante están la solea, el ambón y los coros. Desde el ambón se lee el Evangelio y se da la comunión.',
        ],
        readings: [{ label: 'La nave', path: '/biblioteca/templo#nave' }],
      },
      {
        id: 'iconostasio-leccion',
        title: 'El iconostasio',
        body: [
          'La pared de iconos no esconde el altar: lo enseña. Tiene tres puertas; la del centro, las puertas reales, lleva la Anunciación, y a sus lados están siempre Cristo, a la derecha, y la Theotokos, a la izquierda.',
          'En los iconostasios altos, por encima van las fiestas, la Deesis, los profetas y los patriarcas: toda la historia de la salvación, leída de arriba abajo hasta la puerta.',
        ],
        readings: [{ label: 'El iconostasio, en dibujo', path: '/biblioteca/templo#iconostasio' }],
        question: '¿Por qué crees que la Anunciación va precisamente en la puerta?',
      },
      {
        id: 'santuario-leccion',
        title: 'El santuario',
        body: [
          'Detrás del iconostasio está el santuario, con la santa mesa en el centro, donde se celebra la Eucaristía. Sobre ella están el antimension firmado por el obispo, el Evangelio y el tabernáculo.',
          'A la izquierda, la mesa de la preparación, donde se preparan el pan y el vino y se recuerda a los vivos y a los difuntos cuyos nombres se dan. Al fondo, el lugar alto, el trono del obispo.',
        ],
        readings: [{ label: 'El santuario y lo que hay en el altar', path: '/biblioteca/templo#santuario' }],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'formas-de-rezar',
    title: 'Las formas de rezar',
    subtitle: 'Con el cuerpo, la voz, el corazón y la Iglesia',
    level: 'principio',
    lessons: [
      {
        id: 'senal-cruz',
        title: 'La señal de la Cruz',
        body: [
          'Se hace con la mano derecha: los tres primeros dedos juntos, por la Trinidad, y los otros dos doblados hacia la palma, por las dos naturalezas de Cristo. Se toca la frente, el pecho, el hombro derecho y el izquierdo.',
          'Abre y cierra toda oración, y se repite al nombrar a la Trinidad. Hacerla despacio ya es rezar.',
        ],
        readings: [{ label: 'Metanoias', path: '/orar/metanoias' }],
      },
      {
        id: 'cuerpo-leccion',
        title: 'De pie, inclinado, postrado',
        body: [
          'Se reza de pie. Las inclinaciones —la pequeña metanoia— y las postraciones —la grande— dicen con el cuerpo el arrepentimiento y la adoración.',
          'El canon 20 del primer Concilio de Nicea manda rezar de pie el domingo y de Pascua a Pentecostés: son días de la Resurrección, y en ellos no se hacen grandes postraciones.',
        ],
        readings: [{ label: 'Metanoias', path: '/orar/metanoias' }],
      },
      {
        id: 'voz-leccion',
        title: 'Con la voz y con la mente',
        body: [
          'Las oraciones del libro se dicen mejor a media voz, de forma que uno se oiga: la voz ayuda a la atención. La oración de Jesús se dice primero con los labios y después con la mente.',
          'Lo que importa no es la cantidad sino la atención. Cuando la mente se escapa, se la trae de vuelta, sin irritarse.',
        ],
        readings: [
          { label: 'Formas de rezar', path: '/orar/formas' },
          { label: 'Oración de Jesús', path: '/orar/oracion-de-jesus' },
        ],
      },
      {
        id: 'horas-leccion',
        title: 'Una regla a la medida',
        body: [
          'Cada cristiano tiene su regla: lo que reza cada mañana y cada noche. Puede ser muy breve —la de san Serafín de Sarov son tres oraciones— o muy larga; lo que la hace buena es que se cumpla cada día.',
          'ATHOS ofrece cada oficio en tres medidas para empezar por la breve e ir alargando. La regla de cada uno conviene hablarla con el padre espiritual.',
        ],
        readings: [{ label: 'Los tres oficios del día', path: '/orar' }],
        question: '¿Qué regla podrías cumplir todos los días durante un mes, aunque estuvieras cansado?',
      },
      {
        id: 'iglesia-leccion',
        title: 'Rezar con la Iglesia',
        body: [
          'La oración de casa sale de la Liturgia del domingo y vuelve a ella. Los oficios —Vísperas, Maitines, las Horas— se pueden rezar también en casa, sin sacerdote.',
          'En casa la costumbre es el rincón de los iconos, con una lamparilla, y rezar en familia cuando se puede.',
        ],
        readings: [
          { label: 'Maitines en casa', path: '/orar/maitines' },
          { label: 'La Liturgia explicada', path: '/biblioteca/estudio/liturgia-explicada' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'misterios',
    title: 'Los Misterios de la Iglesia',
    subtitle: 'Qué son y qué se recibe en cada uno',
    level: 'medio',
    lessons: [
      {
        id: 'que-es-un-misterio',
        title: 'Qué es un misterio',
        body: [
          'Lo que en Occidente se llama sacramentos la Iglesia ortodoxa los llama misterios: actos de la Iglesia en los que Dios da su gracia de verdad, por medio de cosas visibles —agua, aceite, pan y vino, la imposición de las manos—.',
          'Se suelen contar siete, aunque la Iglesia ortodoxa no ha cerrado nunca la cuenta con la rigidez con que se hizo en Occidente: la tonsura monástica, la bendición de las aguas o el oficio de difuntos se viven también como misterios en sentido amplio.',
        ],
      },
      {
        id: 'bautismo',
        title: 'El Bautismo y la Crismación',
        body: [
          'El Bautismo se hace por triple inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo: es morir y resucitar con Cristo. Inmediatamente después se recibe la Crismación, la unción con el santo crisma, que es el don del Espíritu Santo, y la primera comunión.',
          'Por eso en la Iglesia ortodoxa los niños bautizados comulgan desde el primer día: no se les deja fuera de la mesa hasta que entiendan, porque nadie la entiende del todo.',
        ],
      },
      {
        id: 'eucaristia',
        title: 'La Eucaristía',
        body: [
          'Es el centro de todo: en la Divina Liturgia el pan y el vino se convierten en el Cuerpo y la Sangre de Cristo, y los fieles comulgan de los dos, con la cucharilla.',
          'Para comulgar se prepara uno con oración, ayuno y, según la costumbre de cada lugar y lo que diga el padre espiritual, confesión. Las oraciones de antes y después de comulgar están en el libro de oración.',
        ],
        readings: [
          { label: 'Oraciones antes de comulgar', path: '/orar/oraciones/orden/antes-de-comulgar' },
          { label: 'La Liturgia explicada', path: '/biblioteca/estudio/liturgia-explicada' },
        ],
      },
      {
        id: 'confesion-misterio',
        title: 'La Confesión',
        body: [
          'Se confiesa ante Cristo, con el sacerdote como testigo: en muchas iglesias, delante de un atril con la cruz y el Evangelio. Al final el sacerdote pone el epitraquelio sobre la cabeza del penitente y lee la oración de absolución.',
          'No es un tribunal sino un hospital, dicen los Padres. Prepararse es examinar la conciencia con calma y decir lo que se ha hecho, sin excusas y sin desesperar.',
        ],
        readings: [{ label: 'Oraciones para la confesión', path: '/orar/oraciones/categoria/confesion' }],
      },
      {
        id: 'uncion',
        title: 'La Unción de los enfermos',
        body: [
          'Se unge con aceite bendecido al enfermo, como manda la carta de Santiago (5, 14-15), pidiendo la curación del cuerpo y del alma y el perdón de los pecados. No es sólo para moribundos: se da a cualquier enfermo, y en muchas parroquias se celebra para todos el Miércoles Santo.',
          'En su forma completa la celebran siete sacerdotes, y se leen siete Epístolas y siete Evangelios, con siete unciones; cuando no es posible, basta uno.',
        ],
        readings: [{ label: 'Oraciones por los enfermos', path: '/orar/oraciones/categoria/enfermedad' }],
      },
      {
        id: 'matrimonio',
        title: 'El Matrimonio',
        body: [
          'El Matrimonio ortodoxo tiene dos partes: los esponsales, con los anillos, y la coronación, en la que se pone a los novios unas coronas, que son a la vez de gloria y de martirio. Beben de una copa común y dan tres vueltas en torno al atril mientras se canta.',
          'Los novios no pronuncian votos como en Occidente —en el rito eslavo sólo se les pregunta si se casan libremente—: es Dios quien los une, por la oración del sacerdote.',
        ],
        readings: [{ label: 'Oraciones para el matrimonio', path: '/orar/oraciones/categoria/matrimonio' }],
      },
      {
        id: 'orden',
        title: 'El Sacerdocio',
        body: [
          'Por la imposición de las manos del obispo se ordena a los diáconos, a los presbíteros y a los obispos. A los obispos los consagran al menos dos o tres obispos juntos. Los presbíteros y diáconos pueden estar casados si se casaron antes de la ordenación; los obispos se eligen entre los monjes.',
          'La ordenación se hace siempre dentro de la Liturgia, y en un momento distinto para cada grado: el obispo, antes de las lecturas; el presbítero, después de la Gran Entrada; el diácono, después de la anáfora. Al terminar, el pueblo aclama «¡Áxios!», «¡es digno!».',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'ano-liturgico',
    title: 'El año de la Iglesia',
    subtitle: 'Las fiestas, los ayunos, la semana y los tonos',
    level: 'medio',
    lessons: [
      {
        id: 'dos-ciclos',
        title: 'Dos ciclos que se cruzan',
        body: [
          'El año litúrgico empieza el 1 de septiembre. Dentro de él corren dos ciclos a la vez: el de las fiestas fijas, que caen cada año en la misma fecha —la Natividad, la Dormición, los santos de cada día—, y el de las móviles, que dependen de la Pascua.',
          'Las iglesias que siguen el calendario juliano celebran las fiestas fijas trece días después de la fecha civil; la Pascua es la misma para todas.',
        ],
        readings: [{ label: 'El calendario', path: '/calendario' }],
      },
      {
        id: 'pascua-leccion',
        title: 'La Pascua',
        body: [
          'Es la fiesta de las fiestas. Se celebra el domingo siguiente a la primera luna llena después del equinoccio de primavera, calculado con el calendario juliano, y siempre después de la Pascua judía. Por eso suele caer más tarde que en Occidente.',
          'De ella cuelgan diez semanas antes —el Triodio, con la Gran Cuaresma— y ocho después —el Pentecostario, hasta Todos los Santos—.',
        ],
        readings: [{ label: 'Las fiestas', path: '/calendario/fiestas' }],
      },
      {
        id: 'doce-fiestas',
        title: 'Las Doce Grandes Fiestas',
        body: [
          'Además de la Pascua, que está por encima de todas, hay doce grandes fiestas: ocho del Señor y cuatro de la Theotokos. Del Señor: la Natividad, la Teofanía, el Encuentro, la Entrada en Jerusalén, la Ascensión, Pentecostés, la Transfiguración y la Exaltación de la Cruz. De la Theotokos: su Natividad, su Entrada en el Templo, la Anunciación y la Dormición.',
          'Cada una tiene su vigilia la víspera, su tropario y su kontakion propios, y unos días de «prefiesta» antes y de «postfiesta» después, en los que se sigue cantando, hasta la «despedida» de la fiesta. Así una fiesta grande no dura un día, sino una semana o más.',
        ],
        readings: [{ label: 'Las grandes fiestas', path: '/calendario/fiestas' }],
      },
      {
        id: 'ayunos-leccion',
        title: 'Los cuatro ayunos',
        body: [
          'Hay cuatro periodos de ayuno: la Gran Cuaresma antes de Pascua, el de los Apóstoles en junio, el de la Dormición del 1 al 14 de agosto y el de la Natividad, cuarenta días antes de Navidad. Además se ayuna los miércoles y los viernes, por la traición y por la Cruz.',
          'El ayuno es dejar la carne, los lácteos y, según los días, el pescado, el aceite y el vino; pero sobre todo es más oración, más limosna y menos de uno mismo. Cada uno lo guarda según su salud, con el consejo del padre espiritual.',
        ],
        readings: [{ label: 'El ayuno', path: '/calendario/ayuno' }],
      },
      {
        id: 'semana-leccion',
        title: 'La semana',
        body: [
          'Cada día de la semana tiene su dedicación en el Octoecos: el domingo, la Resurrección; el lunes, los ángeles; el martes, san Juan el Precursor; el miércoles, la Cruz y la Theotokos; el jueves, los apóstoles y san Nicolás; el viernes, la Cruz; el sábado, la Theotokos, todos los santos y los difuntos.',
          'Por eso ATHOS propone cada día un akathistos y un canon distintos: siguen ese reparto.',
        ],
        readings: [{ label: 'Lo propio de hoy', path: '/orar' }],
      },
      {
        id: 'tonos',
        title: 'Los ocho tonos',
        body: [
          'Los himnos de la Iglesia se cantan en ocho tonos, que son ocho maneras de cantar. Cada semana, desde el domingo de Tomás, tiene su tono, y se suceden en orden del primero al octavo: es el ciclo del Octoecos, el libro de los ocho tonos.',
          'El tono de la semana decide el tropario de la Resurrección que se canta el domingo, y ATHOS lo dice en la portada de cada día.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'theotokos-santos',
    title: 'La Theotokos y los santos',
    subtitle: 'Por qué se les venera y qué se les pide',
    level: 'medio',
    lessons: [
      {
        id: 'theotokos-nombre',
        title: 'Theotokos',
        body: [
          'Theotokos quiere decir «la que dio a luz a Dios». El tercer Concilio Ecuménico, en Éfeso en el año 431, confirmó ese nombre contra Nestorio, que prefería llamarla sólo madre de Cristo: si el que nació de ella es Dios, ella es Madre de Dios. Es, antes que nada, una afirmación sobre Cristo.',
          'La Iglesia la llama también siempre virgen y toda santa, y la honra por encima de los querubines y los serafines.',
        ],
        readings: [{ label: 'El Concilio de Éfeso', path: '/biblioteca/estudio/concilios' }],
      },
      {
        id: 'intercesion',
        title: 'La intercesión de los santos',
        body: [
          'Los santos están vivos en Dios, y la Iglesia es una sola en la tierra y en el cielo. Por eso se les pide que recen por nosotros, como se le pide a un amigo: no en lugar de Cristo, sino con Él.',
          'Cada día tiene sus santos, y cada cristiano el suyo, el del nombre que recibió en el bautismo, cuya fiesta celebra.',
        ],
        readings: [{ label: 'Los santos de cada día', path: '/calendario/santos' }],
      },
      {
        id: 'veneracion',
        title: 'Venerar no es adorar',
        body: [
          'El séptimo Concilio Ecuménico, en Nicea en el año 787, distinguió entre la adoración, que sólo se debe a Dios, y la veneración, que se tributa a los iconos, a la Cruz y a los santos, y que pasa a quien representan.',
          'Besar un icono, encenderle una vela o inclinarse ante él es venerar. Por eso los iconos no son ídolos: no se adora la madera, se saluda a quien está pintado en ella.',
        ],
        readings: [{ label: 'Los iconos', path: '/biblioteca/iconos' }],
      },
      {
        id: 'reliquias',
        title: 'Las reliquias',
        body: [
          'El cuerpo de los santos fue templo del Espíritu Santo, y la Iglesia lo honra: desde los primeros siglos se celebró la Eucaristía sobre las tumbas de los mártires, y por eso hoy cada altar y cada antimension llevan reliquias.',
          'Las reliquias se veneran como los iconos: se besan, se les enciende una vela, se reza ante ellas pidiendo la intercesión del santo. No se las adora; se honra en ellas la santidad que Dios dio a ese cuerpo y que espera la resurrección.',
        ],
        readings: [{ label: 'El antimension', path: '/biblioteca/templo#antimension' }],
      },
      {
        id: 'akathistos-leccion',
        title: 'El Akáthistos',
        body: [
          'Es el himno más conocido a la Theotokos: veinticuatro estrofas que se cantan de pie —eso quiere decir su nombre—. Se canta entero el quinto sábado de Cuaresma, y muchos lo rezan en casa en otras ocasiones.',
          'Cada estrofa empieza por una letra del alfabeto griego, en orden, y las impares terminan con el saludo «Alégrate, Esposa no desposada». Sobre su modelo se compusieron después cientos de akathistos a Cristo y a los santos.',
        ],
        readings: [{ label: 'El Akáthistos', path: '/biblioteca/akathistos/akathistos-theotokos' }],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'muerte-esperanza',
    title: 'La muerte y la esperanza',
    subtitle: 'Lo que la Iglesia confiesa y cómo reza por los difuntos',
    level: 'hondo',
    lessons: [
      {
        id: 'resurreccion-leccion',
        title: '«Espero la resurrección de los muertos»',
        body: [
          'La esperanza cristiana no es la inmortalidad de un alma que se libra del cuerpo, sino la resurrección: Cristo ha resucitado con su cuerpo, y nosotros resucitaremos con el nuestro. La muerte es real, y es un enemigo, pero ya está vencida.',
          'Por eso la Pascua es la fiesta de las fiestas, y por eso la Iglesia canta junto a los difuntos «Cristo ha resucitado».',
        ],
        readings: [{ label: 'Lecciones del Credo', path: '/biblioteca/estudio/credo' }],
      },
      {
        id: 'oracion-difuntos',
        title: 'Rezar por los difuntos',
        body: [
          'La Iglesia reza por los que se han dormido desde los primeros siglos: en cada Liturgia se les recuerda, y en la preparación de los dones se saca una partícula por cada nombre. La oración une a los vivos y a los muertos en el mismo Cristo.',
          'No es una contabilidad de méritos: es amor que no se interrumpe con la muerte. Cómo obra Dios con esa oración, la Iglesia no lo define; sabe que debe rezar.',
        ],
        readings: [{ label: 'Oraciones por los difuntos', path: '/orar/oraciones/categoria/difuntos' }],
      },
      {
        id: 'panihida-leccion',
        title: 'La panihida y los días de memoria',
        body: [
          'La panihida es el oficio breve por los difuntos. Es costumbre celebrarla al tercer día, al noveno y al cuadragésimo después de la muerte, y en los aniversarios. Los números tienen su explicación en la tradición —la Resurrección al tercer día, los nueve coros de los ángeles, la Ascensión a los cuarenta—, y la costumbre varía de un lugar a otro.',
          'En la mesa de la panihida se pone el kolyva, trigo cocido con miel, por las palabras del Señor sobre el grano que muere para dar fruto.',
        ],
        readings: [
          { label: 'La panihida', path: '/orar/oraciones/panihida-ficha' },
          { label: 'Canon por un difunto', path: '/biblioteca/canones/canon-difuntos' },
        ],
      },
      {
        id: 'sabados',
        title: 'Los sábados de difuntos',
        body: [
          'Varias veces al año la Iglesia dedica un sábado entero a todos los difuntos: antes de la Cuaresma, en la segunda, tercera y cuarta semana de Cuaresma, y antes de Pentecostés. En la tradición eslava se añade la Radonitsa, el martes después del domingo de Tomás, cuando se lleva la alegría de la Pascua a los cementerios.',
          'El sábado es el día de los difuntos porque es el día en que Cristo reposó en el sepulcro: el séptimo día, el del descanso, que espera el octavo, el de la Resurrección.',
        ],
        readings: [{ label: 'El calendario', path: '/calendario/fiestas' }],
      },
      {
        id: 'duelo-leccion',
        title: 'El duelo cristiano',
        body: [
          'Llorar a los muertos no es falta de fe: Cristo lloró ante la tumba de Lázaro. El cristiano llora con esperanza, y su duelo se vuelve oración por quien se ha ido.',
          'San Pablo no pide no entristecerse, sino no entristecerse «como los demás, que no tienen esperanza» (1 Tesalonicenses 4, 13). La Iglesia acompaña ese duelo con sus oficios y con sus días de memoria, para que no se pase a solas.',
        ],
        readings: [{ label: 'Oraciones en el duelo', path: '/orar/oraciones/categoria/duelo' }],
      },
      {
        id: 'memoria-muerte',
        title: 'Acordarse de la muerte',
        body: [
          'Los Padres aconsejan acordarse cada día de la muerte, no para entristecerse sino para vivir despierto. La oración de san Juan Damasceno antes de dormir lo hace cada noche: «¿será este lecho mi sepulcro?».',
          'Quien vive así no teme el final, porque lo ha ido preparando. En las letanías de la mañana y de la tarde la Iglesia pide «un final de nuestra vida cristiano, sin dolor, sin vergüenza y en paz».',
        ],
        readings: [{ label: 'Oración antes del sueño', path: '/orar/oraciones/damasceno-noche' }],
        question: '¿Qué cambiaría en tu día si de verdad te acordaras de que va a acabar?',
      },
    ],
  },
];
