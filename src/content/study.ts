/**
 * Biblioteca de estudio.
 *
 * Dos cosas distintas conviven aquí:
 *
 *   · Itinerarios — recorridos de estudio con lecciones breves, cada una con
 *     su explicación y sus lecturas dentro de ATHOS.
 *   · Obras — catálogo de los libros que forman la tradición, con qué son, por
 *     qué importan y si ATHOS tiene su texto o sólo su ficha.
 *
 * Las explicaciones son exposición histórica y doctrinal redactada para ATHOS.
 * No son textos litúrgicos ni patrísticos: cuando se cita a un Padre se dice de
 * dónde sale, y cuando algo se discute entre tradiciones, se dice también.
 */
import type { SourceMeta } from '@/types';

export const STUDY_META: SourceMeta = {
  source: 'Exposición redactada para ATHOS a partir de la historia y la doctrina comúnmente recibidas',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
  notes: 'No es un texto litúrgico ni patrístico: es material de estudio.',
};

/* ============================================================
   Itinerarios
   ============================================================ */

export interface LessonReading {
  label: string;
  /** Ruta dentro de ATHOS. */
  path: string;
}

export interface Lesson {
  id: string;
  title: string;
  /** Párrafos de la lección. */
  body: string[];
  /** Lecturas que la acompañan, dentro de la aplicación. */
  readings?: LessonReading[];
  /** Una pregunta para quedarse pensando, no un examen. */
  question?: string;
}

export interface StudyCourse {
  id: string;
  title: string;
  subtitle: string;
  level: 'principio' | 'medio' | 'hondo';
  lessons: Lesson[];
}

export const STUDY_LEVELS: Record<StudyCourse['level'], string> = {
  principio: 'Para empezar',
  medio: 'Intermedio',
  hondo: 'De fondo',
};

export const STUDY_COURSES: StudyCourse[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'primeros-pasos',
    title: 'Primeros pasos',
    subtitle: 'Qué es la Iglesia ortodoxa y cómo se entra en su vida',
    level: 'principio',
    lessons: [
      {
        id: 'que-es',
        title: 'Qué es la Iglesia ortodoxa',
        body: [
          'La Iglesia ortodoxa se entiende a sí misma como la continuación sin ruptura de la comunidad que nace en Pentecostés. No se define por un fundador posterior ni por una reforma, sino por la continuidad de la fe, de los sacramentos y de la sucesión de los obispos.',
          'No tiene una cabeza única con jurisdicción universal. Es una comunión de Iglesias locales —Constantinopla, Alejandría, Antioquía, Jerusalén, Rusia, Serbia, Rumanía, Bulgaria, Georgia, Grecia y otras— que comparten la misma fe y los mismos sacramentos, y cuyos obispos se reconocen entre sí. Al Patriarca de Constantinopla se le llama Ecuménico y tiene una primacía de honor, no de poder sobre las demás.',
          'La palabra «ortodoxia» significa a la vez recta doctrina y recta alabanza. Las dos cosas van juntas: en esta tradición no se separa lo que se cree de cómo se reza.',
        ],
        question: '¿Qué diferencia hay entre una primacía de honor y una de jurisdicción?',
      },
      {
        id: 'la-cruz',
        title: 'La señal de la Cruz',
        body: [
          'El gesto con que empieza y termina toda oración. Se juntan el pulgar, el índice y el corazón —las tres personas de la Trinidad— y se doblan el anular y el meñique contra la palma: las dos naturalezas de Cristo. El gesto es en sí mismo una confesión de fe.',
          'Se traza de la frente al pecho y del hombro derecho al izquierdo. Los cristianos occidentales lo hacen al revés, de izquierda a derecha; el orden oriental es el más antiguo de los dos.',
          'Se hace al entrar en la iglesia, al oír nombrar a la Trinidad, ante los iconos, antes de comer y al acostarse. No es un talismán: es recordar de quién se es.',
        ],
        readings: [{ label: 'Comienzo habitual', path: '/orar/oraciones/comienzo-habitual' }],
      },
      {
        id: 'los-iconos',
        title: 'Por qué hay iconos',
        body: [
          'La objeción es antigua y seria: «No te harás imagen alguna». La respuesta ortodoxa es la Encarnación. San Juan Damasceno lo dijo así: «No adoro a la materia, sino al Creador de la materia, que se hizo materia por mí».',
          'A Dios en su esencia no se le puede pintar. A Cristo sí, porque se hizo visible. Y con Él a su Madre y a los santos, que son «templos del Espíritu». Por eso la disputa iconoclasta del siglo VIII no fue una discusión sobre arte, sino sobre si Dios se hizo hombre de verdad.',
          'El Séptimo Concilio Ecuménico (Nicea, 787) distinguió dos palabras que el castellano confunde: latría, la adoración que sólo se debe a Dios, y proskýnesis, la veneración que se rinde a la imagen y que pasa al representado. Al icono se le besa; a Dios se le adora.',
        ],
        readings: [{ label: 'Iconografía', path: '/biblioteca/iconos' }],
        question: '¿Por qué el argumento a favor de los iconos depende de la Encarnación?',
      },
      {
        id: 'entrar-en-la-iglesia',
        title: 'Entrar en una iglesia ortodoxa',
        body: [
          'Se entra haciendo la señal de la Cruz, se besan los iconos de la entrada y se enciende una vela. Las velas no compran nada: son una oración que sigue ardiendo cuando uno ya se ha ido.',
          'En muchas iglesias se está de pie durante los oficios. Hay bancos para quien los necesite; no es una prueba de resistencia.',
          'La Liturgia no es un espectáculo que se contempla: es una acción en la que se participa, aunque al principio uno no entienda casi nada. Se entiende con los años, y sobre todo rezándola.',
        ],
        readings: [{ label: 'Divina Liturgia', path: '/biblioteca/liturgia/liturgia-crisostomo' }],
      },
      {
        id: 'la-regla',
        title: 'Empezar a rezar',
        body: [
          'La tradición no pide mucho al principio: pide poco y constante. Vale más cinco minutos cada día que una hora los domingos.',
          'La regla habitual tiene tres momentos: al levantarse, a mediodía y antes de dormir. Empieza siempre igual —la señal de la Cruz, el Trisagio, el Padre Nuestro— porque tener un comienzo fijo evita tener que decidir cada día.',
          'Los Padres insisten en algo que parece menor: rezar a la misma hora y en el mismo sitio. El cuerpo aprende antes que la cabeza.',
        ],
        readings: [
          { label: 'Oficio de la mañana', path: '/orar/oficio/manana' },
          { label: 'Oficio de la noche', path: '/orar/oficio/noche' },
        ],
      },
      {
        id: 'el-ayuno',
        title: 'Qué es el ayuno',
        body: [
          'El ayuno ortodoxo no es una dieta ni una penitencia por el pecado: es un ejercicio de libertad. Se aprende a decir que no a algo lícito para poder decir que no a lo que no lo es.',
          'Se ayuna los miércoles y los viernes de casi todo el año, y en cuatro periodos: la Gran Cuaresma, el ayuno de los Apóstoles, el de la Dormición y el de la Natividad. Se dejan la carne, los lácteos, los huevos y, según el día, el pescado, el aceite y el vino.',
          'Los Padres avisan de lo mismo una y otra vez: un ayuno sin misericordia no sirve de nada. San Juan Crisóstomo lo dice sin rodeos: «¿De qué sirve no comer carne si devoras a tu hermano?». Y el rigor concreto se habla con el confesor, no se decide a solas.',
        ],
        readings: [{ label: 'Calendario de ayuno', path: '/calendario/ayuno' }],
      },
      {
        id: 'confesion-comunion',
        title: 'Confesión y comunión',
        body: [
          'La confesión no es un interrogatorio ni un trámite. El sacerdote es testigo, no juez: se confiesa ante Cristo, y él está allí para dar la absolución y, si hace falta, un consejo.',
          'La frecuencia con que se comulga varía mucho entre tradiciones. En unas se comulga cada domingo; en otras, unas pocas veces al año tras preparación y confesión. Es una cuestión que se resuelve con el propio sacerdote, no leyendo.',
          'Antes de comulgar se guarda ayuno desde la medianoche y se rezan las oraciones de preparación.',
        ],
        readings: [
          { label: 'Antes de la confesión', path: '/orar/oraciones/antes-de-confesar' },
          { label: 'Creo, Señor, y confieso', path: '/orar/oraciones/creo-senor-y-confieso' },
        ],
      },
      {
        id: 'el-padre-espiritual',
        title: 'El padre espiritual',
        body: [
          'La tradición ortodoxa desconfía del que camina solo. No porque el individuo importe poco, sino porque nadie se ve a sí mismo con claridad.',
          'El padre espiritual —a veces el propio párroco, a veces un monje— no gobierna la vida de nadie: escucha, corrige y sostiene. La relación se construye despacio y con franqueza.',
          'Los ancianos advierten también de lo contrario: buscar un guía extraordinario, cargado de dones, suele ser una forma de vanidad. El sacerdote de la parroquia de al lado basta casi siempre.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'credo',
    title: 'El Símbolo de la Fe',
    subtitle: 'Artículo por artículo, lo que la Iglesia confiesa',
    level: 'medio',
    lessons: [
      {
        id: 'de-donde-viene',
        title: 'De dónde viene el Credo',
        body: [
          'El Símbolo que se recita en la Liturgia se fijó en dos concilios: Nicea (325) y Constantinopla (381). Por eso se llama niceno-constantinopolitano.',
          'No se escribió para explicar la fe entera, sino para cerrar el paso a errores concretos. Cada frase responde a una negación: por eso su tono es tan preciso y a veces tan seco.',
          'Se recita en plural en la Liturgia —«Creo» en singular en la práctica griega, «Creemos» en el texto conciliar— porque la fe se recibe de la Iglesia antes de ser personal.',
        ],
        readings: [{ label: 'Símbolo de la Fe', path: '/orar/oraciones/simbolo-de-la-fe' }],
      },
      {
        id: 'un-solo-dios',
        title: '«Creo en un solo Dios, Padre todopoderoso»',
        body: [
          'Empieza por el Padre, no por la esencia divina. La Trinidad ortodoxa se piensa desde una persona concreta que es origen de las otras dos, no desde una sustancia impersonal que después se reparte.',
          '«Creador del cielo y de la tierra, de todo lo visible y lo invisible»: contra quienes atribuían la materia a un dios menor o malo. Todo lo que existe es bueno porque lo hizo Él.',
        ],
      },
      {
        id: 'consustancial',
        title: '«Consustancial al Padre»',
        body: [
          'La palabra griega es homooúsios: de la misma esencia. Fue el término que dividió al siglo IV, porque no está en la Escritura y muchos obispos desconfiaban de él.',
          'Arrio sostenía que el Hijo era la primera y más excelsa de las criaturas: «hubo un tiempo en que no existía». Si eso fuera cierto, quien nos salva no sería Dios, y la salvación sería obra de un intermediario.',
          'Por eso Nicea añadió «engendrado, no creado». Toda la disputa se juega en una letra: homooúsios (de la misma esencia) frente a homoioúsios (de esencia parecida).',
        ],
        question: '¿Por qué no bastaba decir que el Hijo es «semejante» al Padre?',
      },
      {
        id: 'encarnacion',
        title: '«Y se encarnó… y se hizo hombre»',
        body: [
          'El centro del Credo, y el punto en que la liturgia manda inclinarse.',
          '«Por nosotros los hombres y por nuestra salvación»: la Encarnación no responde a una necesidad de Dios, sino a la nuestra.',
          'Los concilios posteriores precisaron cómo: en Cristo hay una sola persona en dos naturalezas, divina y humana, «sin confusión, sin cambio, sin división, sin separación» (Calcedonia, 451). Las cuatro negaciones marcan el terreno sin pretender explicar el misterio.',
        ],
      },
      {
        id: 'crucificado',
        title: '«Fue crucificado… y resucitó al tercer día»',
        body: [
          '«Bajo Poncio Pilato»: un nombre y una fecha. La fe cristiana se juega en la historia, no en un mito atemporal.',
          '«Según las Escrituras» no significa que la Resurrección esté profetizada al pie de la letra, sino que sólo se entiende dentro de la historia entera de Israel.',
          'La teología ortodoxa habla de la Cruz y la Resurrección como un solo acto. No insiste tanto en el pago de una deuda como en la victoria sobre la muerte: por eso el icono pascual no muestra el sepulcro vacío, sino a Cristo sacando a Adán del Hades.',
        ],
        readings: [{ label: 'El Anastasis', path: '/biblioteca/iconos/anastasis' }],
      },
      {
        id: 'espiritu-santo',
        title: '«Y en el Espíritu Santo, Señor y dador de vida»',
        body: [
          'La sección añadida en Constantinopla, contra quienes negaban la divinidad del Espíritu. No se dice «Dios» de forma directa, sino con los títulos que sólo a Dios convienen: Señor, dador de vida, adorado y glorificado con el Padre y el Hijo.',
          '«Que procede del Padre»: aquí está el punto que separa a Oriente de Occidente. La Iglesia latina añadió más tarde «y del Hijo» —Filioque—. La ortodoxa objeta dos cosas: que se añadió a un texto conciliar sin concilio, y que introduce dos principios en la Trinidad en vez de uno.',
        ],
        question: '¿Por qué la objeción ortodoxa al Filioque es a la vez canónica y teológica?',
      },
      {
        id: 'la-iglesia',
        title: '«Y en la Iglesia, una, santa, católica y apostólica»',
        body: [
          'Cuatro notas. «Católica» no quiere decir universal por extensión, sino íntegra: en cada Iglesia local que celebra la Eucaristía con su obispo está la Iglesia entera, no una parte.',
          '«Apostólica» significa que su fe y sus ministros vienen de los Apóstoles por sucesión ininterrumpida.',
          'Que la Iglesia sea santa no significa que lo sean sus miembros. Es santa por Aquel que la habita, y está llena de pecadores que se están curando.',
        ],
      },
      {
        id: 'resurreccion',
        title: '«Espero la resurrección de los muertos»',
        body: [
          'No dice «creo», dice «espero»: es lo único del Credo que aún no ha ocurrido.',
          'Y dice resurrección de los muertos, no inmortalidad del alma. La esperanza cristiana no es que algo nuestro sobreviva, sino que Dios devuelva la vida al hombre entero, cuerpo incluido.',
          'De ahí el respeto ortodoxo por el cuerpo del difunto y la insistencia en que la muerte es un enemigo vencido, no un tránsito natural.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'concilios',
    title: 'Los siete Concilios Ecuménicos',
    subtitle: 'Qué se discutió, qué se decidió y por qué importa',
    level: 'medio',
    lessons: [
      {
        id: 'que-es-un-concilio',
        title: 'Qué es un concilio ecuménico',
        body: [
          'Un concilio es ecuménico cuando la Iglesia entera lo recibe, no simplemente cuando se convoca como tal. Hubo asambleas numerosas y bien organizadas que la historia llama «conciliábulos» porque la Iglesia no las aceptó.',
          'Esa recepción es lenta y no la decide una autoridad única: es el criterio ortodoxo de la verdad, y también su mayor dificultad práctica.',
          'Los siete concilios se celebran todos entre 325 y 787, y sus definiciones son el suelo común de la fe.',
        ],
      },
      {
        id: 'nicea-i',
        title: 'I · Nicea, 325',
        body: [
          'Convocado por Constantino contra el arrianismo. Definió que el Hijo es consustancial al Padre y redactó la primera parte del Credo.',
          'Fijó además la fecha de la Pascua: el domingo siguiente al primer plenilunio tras el equinoccio de primavera, sin coincidir con la Pascua judía.',
          'Asistieron unos 318 Padres, entre ellos san Nicolás de Mira y el joven diácono Atanasio, que dedicaría el resto de su vida a defender lo allí decidido.',
        ],
      },
      {
        id: 'constantinopla-i',
        title: 'II · Constantinopla, 381',
        body: [
          'Completó el Credo con la sección sobre el Espíritu Santo, contra los pneumatómacos que lo tenían por criatura.',
          'Presidido primero por san Meletio de Antioquía y después por san Gregorio Nacianceno, que dimitió durante el concilio antes que sostener una disputa sobre su elección.',
        ],
      },
      {
        id: 'efeso',
        title: 'III · Éfeso, 431',
        body: [
          'Nestorio, patriarca de Constantinopla, prefería llamar a María «Cristotokos», madre de Cristo, y no «Theotokos», madre de Dios.',
          'San Cirilo de Alejandría respondió que el título no habla de ella, sino de Él: si el que nació de María es una sola persona y esa persona es Dios, entonces ella es Madre de Dios. Negarlo sería partir a Cristo en dos.',
          'El concilio confirmó Theotokos y el pueblo de Éfeso acompañó a los Padres con antorchas hasta sus casas.',
        ],
      },
      {
        id: 'calcedonia',
        title: 'IV · Calcedonia, 451',
        body: [
          'Contra el monofisismo, que reducía la humanidad de Cristo a una gota en el océano de su divinidad.',
          'Definió una persona en dos naturalezas, «sin confusión, sin cambio, sin división, sin separación». Cuatro adverbios que cierran los cuatro errores posibles.',
          'Aquí se separaron las Iglesias que hoy llamamos ortodoxas orientales —copta, siria, armenia, etíope—. Los diálogos del siglo XX han mostrado que buena parte de la ruptura fue de vocabulario, pero la comunión no se ha restablecido.',
        ],
      },
      {
        id: 'constantinopla-ii-iii',
        title: 'V y VI · Constantinopla, 553 y 680',
        body: [
          'El quinto condenó los llamados Tres Capítulos, en un intento —fallido— de reconciliar a los que rechazaban Calcedonia.',
          'El sexto definió que en Cristo hay dos voluntades, la divina y la humana, contra el monotelismo. Si Cristo no tuviera voluntad humana, no habría sanado lo que en el hombre está más enfermo: la voluntad.',
          'San Máximo el Confesor sostuvo esa doctrina cuando el emperador y casi todos los patriarcas defendían lo contrario. Le cortaron la lengua y la mano derecha; el concilio le dio la razón dieciocho años después de su muerte.',
        ],
        readings: [{ label: 'San Máximo el Confesor', path: '/biblioteca/padres/maximo-confesor' }],
      },
      {
        id: 'nicea-ii',
        title: 'VII · Nicea, 787',
        body: [
          'Restauró la veneración de los iconos después de medio siglo de iconoclasia imperial.',
          'Distinguió la adoración debida sólo a Dios del honor que se rinde a la imagen y que pasa al representado.',
          'El triunfo definitivo llegó en 843, y desde entonces el primer domingo de Cuaresma se llama Domingo de la Ortodoxia.',
        ],
        readings: [{ label: 'Domingo de la Ortodoxia', path: '/calendario/fiestas' }],
      },
      {
        id: 'despues',
        title: '¿Y después?',
        body: [
          'Algunos teólogos ortodoxos consideran ecuménicos también los concilios palamitas del siglo XIV, que definieron la distinción entre la esencia y las energías divinas.',
          'No hay unanimidad al respecto, y la Iglesia ortodoxa no tiene un mecanismo que la fuerce: sigue esperando la recepción.',
          'El Concilio de Creta de 2016 fue el primer encuentro panortodoxo en siglos, aunque cuatro Iglesias locales no acudieron.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'liturgia-explicada',
    title: 'La Divina Liturgia explicada',
    subtitle: 'Qué está pasando en cada parte',
    level: 'medio',
    lessons: [
      {
        id: 'antes',
        title: 'Antes de empezar: la Proscomidia',
        body: [
          'Mientras se leen las Horas, el sacerdote prepara el pan y el vino en una mesa lateral. Corta del pan una porción cuadrada, el Cordero, y va colocando alrededor partículas por la Theotokos, los santos, los vivos y los difuntos.',
          'Al final, la patena es una imagen de la Iglesia entera reunida en torno a Cristo. Los nombres que la gente entrega a la entrada se leen aquí.',
        ],
      },
      {
        id: 'catecumenos',
        title: 'La Liturgia de los catecúmenos',
        body: [
          'Empieza con la bendición del Reino: no «en el nombre de», sino «bendito sea el reino», porque lo que va a ocurrir pertenece ya al mundo futuro.',
          'Siguen las letanías, las antífonas, la Pequeña Entrada con el Evangeliario, el Trisagio y las lecturas: primero el Apóstol, después el Evangelio.',
          'Se llamaba «de los catecúmenos» porque hasta aquí podían asistir los que se preparaban para el bautismo; después eran despedidos. La despedida se conserva en el texto aunque hoy ya nadie salga.',
        ],
        readings: [{ label: 'Lecturas de hoy', path: '/leer/lecturas' }],
      },
      {
        id: 'querubico',
        title: 'La Gran Entrada',
        body: [
          'Se canta el Himno Querúbico y los dones se llevan en procesión de la mesa lateral al altar.',
          'La letra pide algo difícil: «dejemos ahora toda preocupación mundana». No es un adorno poético; es la instrucción central del momento.',
          'Todavía no están consagrados. Lo que se venera al paso es lo que van a ser.',
        ],
      },
      {
        id: 'anafora',
        title: 'La Anáfora',
        body: [
          'El corazón de la Liturgia. Empieza con un diálogo antiquísimo —«Elevemos los corazones» / «Los tenemos levantados hacia el Señor»— presente ya en el siglo III.',
          'La oración recuerda toda la historia de la salvación, canta el Sanctus con los ángeles, repite las palabras de la Última Cena y llega a la epíclesis: la invocación del Espíritu Santo sobre los dones.',
          'Ahí está una diferencia clásica con Occidente. Para la tradición ortodoxa la consagración no se ata al instante de las palabras de la institución, sino que culmina en la invocación del Espíritu.',
        ],
        readings: [{ label: 'Divina Liturgia', path: '/biblioteca/liturgia/liturgia-crisostomo' }],
        question: '¿Por qué importa que la consagración se atribuya al Espíritu y no sólo a unas palabras?',
      },
      {
        id: 'comunion',
        title: 'La Comunión',
        body: [
          'Antes de comulgar se canta el Padre Nuestro y el sacerdote proclama: «Las cosas santas, para los santos». El coro responde que uno solo es santo: nadie se acerca por merecerlo.',
          'Se comulga con pan y vino a la vez, con una cuchara, tanto los adultos como los niños de pecho, que comulgan desde el bautismo.',
          'Al salir se reparte el antídoron, pan bendito que no es la comunión y que puede tomar cualquiera.',
        ],
      },
      {
        id: 'despedida',
        title: 'La despedida',
        body: [
          '«En paz, salgamos». La Liturgia no termina en la iglesia: la palabra «liturgia» significa obra del pueblo, y la obra continúa fuera.',
          'Los Padres llaman a lo que sigue «la liturgia después de la liturgia»: lo que se ha recibido se devuelve en la calle o no se ha recibido de verdad.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'oracion-del-corazon',
    title: 'La oración del corazón',
    subtitle: 'El hesicasmo y la Filocalia, con sus avisos',
    level: 'hondo',
    lessons: [
      {
        id: 'hesychia',
        title: 'Hesychía: la quietud',
        body: [
          'Hesychía no es silencio exterior ni ausencia de ruido: es un estado en que cesa la agitación de los pensamientos y la atención puede volverse hacia Dios.',
          'No se consigue por técnica. Los Padres la describen como fruto del arrepentimiento y de la obediencia, y avisan de que buscarla por sí misma es un callejón sin salida.',
        ],
      },
      {
        id: 'la-formula',
        title: 'La fórmula',
        body: [
          '«Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador». Reúne la confesión de fe de Pedro y la súplica del publicano.',
          'Hay formas más breves —«Señor Jesucristo, ten piedad de mí»— y aún más cortas. Lo que importa no es la longitud sino la atención: repetirla distraído no es rezarla.',
          'Se dice despacio, encerrando la mente en las palabras. Cuando la mente se escapa, se la trae de vuelta sin irritarse. Eso es todo el ejercicio, y dura toda la vida.',
        ],
        readings: [{ label: 'Oración de Jesús', path: '/orar/oracion-de-jesus' }],
      },
      {
        id: 'komboskini-leccion',
        title: 'El komboskini',
        body: [
          'La cuerda de nudos —komboskini en griego, chotki en eslavo— sirve para contar sin pensar en la cuenta. Suele tener 33, 50, 100 o 300 nudos, y termina en una cruz.',
          'Cada nudo se teje con nueve cruces entrelazadas, en memoria de los nueve coros angélicos. La tradición cuenta que un monje aprendió a hacerlo de un ángel, después de que el diablo le deshiciera una y otra vez los nudos.',
          'No es un rosario: no hay misterios que meditar ni oraciones distintas por decena. Es una sola oración repetida.',
        ],
        readings: [{ label: 'Komboskini', path: '/orar/komboskini' }],
      },
      {
        id: 'palamas-leccion',
        title: 'Palamás y las energías increadas',
        body: [
          'En el siglo XIV, Barlaam de Calabria ridiculizó a los monjes athonitas que decían ver la luz increada. Si Dios es inaccesible —argumentaba—, esa experiencia es imposible o es una ilusión.',
          'San Gregorio Palamás respondió distinguiendo entre la esencia de Dios, absolutamente inaccesible, y sus energías increadas, en las que la criatura participa de verdad. Dios se da entero sin dejar de ser incomprensible.',
          'No es una distinción de partes: es la única manera de decir a la vez que Dios es inalcanzable y que se le puede conocer. De ahí depende que la deificación del hombre sea real y no una metáfora.',
        ],
        readings: [{ label: 'San Gregorio Palamás', path: '/biblioteca/padres/gregorio-palamas' }],
        question: '¿Qué se perdería si sólo se afirmara la esencia inaccesible?',
      },
      {
        id: 'la-filocalia',
        title: 'La Filocalia',
        body: [
          'Publicada en Venecia en 1782 por san Nicodemo el Hagiorita y san Macario de Corinto: una antología de textos sobre la oración que abarca mil años, del siglo IV al XV.',
          'San Paisios Velichkovski la tradujo al eslavo y san Teófano el Recluso al ruso. Aquella traducción llegó a manos de campesinos y llenó Rusia de peregrinos con una cuerda en el bolsillo; el Relato de un peregrino ruso nace de ahí.',
          'No es un libro para leer de corrido. Se lee poco a poco, y sus autores dan por supuesto un contexto de obediencia y vida sacramental que el lector moderno no siempre tiene.',
        ],
      },
      {
        id: 'avisos',
        title: 'Los avisos de la tradición',
        body: [
          'La misma tradición que enseña esta oración avisa de sus peligros con una insistencia que llama la atención.',
          'El primero es la plani, el engaño: tomar por gracia lo que es imaginación o nervios. Por eso los Padres desaconsejan buscar visiones, luces o sensaciones, y mandan desconfiar de las que lleguen.',
          'El segundo es hacerlo solo. Las técnicas de respiración y postura que describen algunos textos se transmitían siempre con un guía delante; sin él, más vale limitarse a repetir la oración con atención.',
          'El tercero es la prisa. Nadie ha llegado nunca a la oración del corazón por haberse propuesto llegar.',
        ],
      },
    ],
  },
];

/* ============================================================
   Obras
   ============================================================ */

export interface StudyWork {
  id: string;
  title: string;
  author: string;
  century: string;
  kind: 'escritura' | 'patristica' | 'liturgia' | 'espiritualidad' | 'historia';
  what: string;
  why: string;
  /** Si ATHOS tiene el texto, adónde lleva. */
  path?: string;
  /** Estado dentro de ATHOS. */
  availability: 'completo' | 'parcial' | 'ficha';
}

export const WORK_KINDS: Record<StudyWork['kind'], string> = {
  escritura: 'Escritura',
  patristica: 'Padres de la Iglesia',
  liturgia: 'Libros litúrgicos',
  espiritualidad: 'Vida espiritual',
  historia: 'Historia y doctrina',
};

export const STUDY_WORKS: StudyWork[] = [
  {
    id: 'biblia',
    title: 'La Sagrada Escritura',
    author: 'Reina-Valera 1909 en ATHOS',
    century: '—',
    kind: 'escritura',
    what: 'El Antiguo y el Nuevo Testamento. La Iglesia ortodoxa lee el Antiguo en la versión de los Setenta, la traducción griega que usaban los Apóstoles.',
    why: 'Todo lo demás la comenta. Los oficios están tejidos de versículos: quien conoce los salmos entiende de pronto la mitad de lo que se canta.',
    path: '/leer/biblia',
    availability: 'completo',
  },
  {
    id: 'salterio-obra',
    title: 'El Salterio',
    author: 'Rey David y otros',
    century: '—',
    kind: 'escritura',
    what: 'Ciento cincuenta salmos repartidos en veinte kathismata. En los monasterios se lee entero cada semana, y dos veces por semana en Cuaresma.',
    why: 'Es el libro de oración de la Iglesia antes que ningún otro. Enseña a rezar con palabras que no son las propias, y eso es justamente lo que hace falta los días malos.',
    path: '/leer/salterio',
    availability: 'completo',
  },
  {
    id: 'horologion',
    title: 'Horologion',
    author: 'Tradición bizantina',
    century: 'VI en adelante',
    kind: 'liturgia',
    what: 'El libro de las horas: los oficios fijos del día, de Medianoche a Completas.',
    why: 'Es el esqueleto del día litúrgico. Los tres oficios de ATHOS salen de aquí.',
    path: '/orar',
    availability: 'parcial',
  },
  {
    id: 'triodion',
    title: 'Triodion y Pentecostario',
    author: 'Tradición bizantina',
    century: 'VIII–XIV',
    kind: 'liturgia',
    what: 'Los propios de la Cuaresma y de la Semana Santa el primero; los de Pascua a Pentecostés el segundo.',
    why: 'Contienen la poesía litúrgica más alta de la tradición: el Gran Canon, los oficios de la Pasión, el canon pascual.',
    availability: 'ficha',
  },
  {
    id: 'menaion',
    title: 'Menaion',
    author: 'Tradición bizantina',
    century: 'IX en adelante',
    kind: 'liturgia',
    what: 'Doce volúmenes, uno por mes, con los oficios propios de cada santo y cada fiesta del calendario fijo.',
    why: 'Es la memoria cantada de la Iglesia: casi todo lo que se sabe de muchos santos está ahí antes que en ningún libro de historia.',
    availability: 'ficha',
  },
  {
    id: 'vida-antonio',
    title: 'Vida de san Antonio',
    author: 'San Atanasio de Alejandría',
    century: 'IV',
    kind: 'patristica',
    what: 'Biografía del padre de los monjes, escrita pocos años después de su muerte por quien lo conoció.',
    why: 'El libro que llevó el monacato a todo el Imperio. San Agustín cuenta en sus Confesiones que leerlo cambió su vida.',
    path: '/biblioteca/padres/atanasio',
    availability: 'ficha',
  },
  {
    id: 'encarnacion-obra',
    title: 'Sobre la Encarnación del Verbo',
    author: 'San Atanasio de Alejandría',
    century: 'IV',
    kind: 'patristica',
    what: 'Tratado breve, escrito por Atanasio siendo aún joven, sobre por qué Dios se hizo hombre: qué le pasó al hombre en la caída y por qué sólo el Verbo podía repararlo.',
    why: 'La mejor puerta de entrada a la teología patrística: corto, claro y sin jerga. De él sale la frase «se hizo hombre para que nosotros fuésemos hechos Dios».',
    path: '/biblioteca/padres/atanasio/atanasio-encarnacion',
    availability: 'parcial',
  },
  {
    id: 'catequesis-cirilo',
    title: 'Catequesis',
    author: 'San Cirilo de Jerusalén',
    century: 'IV',
    kind: 'patristica',
    what: 'Instrucciones a los que iban a bautizarse en Jerusalén, más cinco catequesis mistagógicas explicadas después del bautismo.',
    why: 'Ninguna otra fuente antigua describe con tanto detalle cómo se bautizaba y se comulgaba en el siglo IV.',
    availability: 'ficha',
  },
  {
    id: 'discursos-isaac',
    title: 'Discursos ascéticos',
    author: 'San Isaac el Sirio',
    century: 'VII',
    kind: 'espiritualidad',
    what: 'Homilías sobre la vida interior escritas en siríaco por un obispo que renunció a su sede para volver al desierto.',
    why: 'El libro más leído en los monasterios ortodoxos después de la Escritura. Su tema constante es una misericordia divina que desborda cualquier medida humana.',
    path: '/biblioteca/padres/isaac-sirio',
    availability: 'parcial',
  },
  {
    id: 'escala',
    title: 'La Escala Santa',
    author: 'San Juan Clímaco',
    century: 'VII',
    kind: 'espiritualidad',
    what: 'Treinta peldaños de ascenso espiritual, uno por cada año oculto de Cristo.',
    why: 'Se lee entera en los monasterios cada Cuaresma. Su análisis de las pasiones es de una precisión que sorprende quince siglos después.',
    availability: 'ficha',
  },
  {
    id: 'fe-ortodoxa',
    title: 'Exposición exacta de la fe ortodoxa',
    author: 'San Juan Damasceno',
    century: 'VIII',
    kind: 'patristica',
    what: 'La primera síntesis sistemática de la doctrina cristiana oriental.',
    why: 'Cierra la época patrística recogiéndola entera. Fue el manual de teología de Oriente durante siglos y también influyó en Occidente.',
    path: '/biblioteca/padres/juan-damasceno',
    availability: 'ficha',
  },
  {
    id: 'triadas',
    title: 'Tríadas en defensa de los santos hesicastas',
    author: 'San Gregorio Palamás',
    century: 'XIV',
    kind: 'patristica',
    what: 'Defensa de los monjes athonitas frente a Barlaam, con la distinción entre esencia y energías divinas.',
    why: 'Es la última gran síntesis de la teología bizantina y el fundamento doctrinal de toda la espiritualidad hesicasta.',
    path: '/biblioteca/padres/gregorio-palamas',
    availability: 'ficha',
  },
  {
    id: 'filocalia',
    title: 'Filocalia',
    author: 'San Nicodemo el Hagiorita y san Macario de Corinto',
    century: 'XVIII (textos del IV al XV)',
    kind: 'espiritualidad',
    what: 'Antología de treinta y seis autores sobre la oración y la guarda del corazón.',
    why: 'Reabrió la tradición hesicasta al mundo entero. Conviene leerla despacio y, a ser posible, acompañado.',
    availability: 'ficha',
  },
  {
    id: 'peregrino-ruso',
    title: 'Relato de un peregrino ruso',
    author: 'Anónimo',
    century: 'XIX',
    kind: 'espiritualidad',
    what: 'Un campesino recorre Rusia con una Biblia, una Filocalia y pan seco, aprendiendo la oración de Jesús.',
    why: 'La introducción más querida a la oración del corazón, y la que la sacó de los monasterios. Léase junto a los avisos de la tradición, no en su lugar.',
    availability: 'ficha',
  },
  {
    id: 'mi-vida-en-cristo',
    title: 'Mi vida en Cristo',
    author: 'San Juan de Kronstadt',
    century: 'XIX',
    kind: 'espiritualidad',
    what: 'Diario espiritual de un sacerdote de parroquia que celebraba la Liturgia a diario.',
    why: 'Muestra que la hondura no es cosa de monjes: está escrito desde el trabajo pastoral, entre pobres y enfermos.',
    path: '/biblioteca/padres/juan-kronstadt',
    availability: 'ficha',
  },
  {
    id: 'silvano',
    title: 'San Silvano del Monte Athos',
    author: 'Archimandrita Sofronio Sájarov',
    century: 'XX',
    kind: 'espiritualidad',
    what: 'La vida y los escritos del monje ruso del Athos, recogidos por su discípulo.',
    why: 'Una de las obras espirituales más leídas del siglo XX. Gira en torno a una sola frase: «Ten tu mente en el infierno y no desesperes».',
    path: '/biblioteca/padres/silvano-athonita',
    availability: 'parcial',
  },
  {
    id: 'catequesis-pascual',
    title: 'Homilía catequética pascual',
    author: 'San Juan Crisóstomo',
    century: 'IV–V',
    kind: 'patristica',
    what: 'La homilía que se lee en todas las iglesias ortodoxas en la noche de Pascua.',
    why: 'Cinco minutos que resumen el Evangelio entero. Se puede aprender de memoria.',
    path: '/biblioteca/padres/juan-crisostomo/crisostomo-catequesis-pascual',
    availability: 'completo',
  },
];

export const STUDY_NOTE =
  'Las explicaciones de esta sección son material de estudio redactado para ATHOS, no textos ' +
  'litúrgicos ni patrísticos. Cuando se cita a un Padre se indica de dónde procede, y cuando ' +
  'algo se discute entre tradiciones, se dice.';
