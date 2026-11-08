/**
 * La Liturgia de los Dones Presantificados, entera en lo que tiene de fijo.
 *
 * Hasta la versión 1.25 ATHOS describía este oficio y daba sus tres himnos
 * propios. Ahora tiene el orden entero: la bendición inicial, el salmo 103 y
 * la gran letanía, la kathisma 18 con sus tres pequeñas letanías y las
 * oraciones que el sacerdote dice mientras traslada el Cordero, «Señor, a Ti
 * clamo» con la oración de la entrada, las dos lecturas con «La luz de Cristo
 * ilumina a todos», «Suba mi oración», las letanías de los catecúmenos y de
 * los que se preparan para el bautismo, las dos oraciones de los fieles, la
 * gran entrada en silencio, la oración antes del Padre Nuestro, la comunión,
 * la acción de gracias, la oración detrás del ambón, que es propia de la
 * Cuaresma, y la despedida.
 *
 * Lo que cambia de un día a otro —las estiqueras, los prokímena y las
 * lecturas— se toma del Triodion y del Menaion, y se indica dónde va.
 *
 * Traducido del Horologion griego (glt.goarch.org, «Προηγιασμένη»). La
 * letanía de los que se preparan para la iluminación no está en ese texto
 * griego: se ha traducido del Sluzhebnik eslavo. Los salmos no se copian: se
 * muestran tomados del Salterio de ATHOS. La traducción es de ATHOS y no
 * procede de ningún libro litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const section = (
  id: string,
  title: string,
  blocks: TextBlock[],
  voice?: OfficeSection['voice'],
): OfficeSection => ({ id, title, blocks, voice });

const AMEN = ref('Amén.');
const SENOR = ref('Señor, ten piedad.');
const A_TI = ref('A Ti, Señor.');
const CONCEDELO = ref('Concédelo, Señor.');
const POR_LOS_SIGLOS = 'ahora y siempre, y por los siglos de los siglos.';

/** La pequeña letanía que cierra cada parte de la kathisma. */
const PEQUENA_LETANIA: TextBlock[] = [
  rub('Diácono, o el sacerdote:'),
  t('Una y otra vez, en paz, oremos al Señor.'),
  SENOR,
  t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
  SENOR,
  t('Conmemorando a nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
  A_TI,
];

/** Lo que se dice al acabar cada parte de la kathisma. */
const FIN_DE_ESTACION: TextBlock[] = [
  rub('Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces). Señor, ten piedad (tres veces). Gloria, ahora y siempre.'),
];

export const PRESANTIFICADOS: OfficeSection[] = [
  section('sentido', 'Qué es', [
    t('No es una Liturgia eucarística: no hay consagración. Se comulga de los dones consagrados el domingo anterior. Se celebra los miércoles y viernes de la Gran Cuaresma, los tres primeros días de la Semana Santa y algunos otros días, siempre por la tarde, tras un día de ayuno.'),
    rub('Los libros lo llaman «de san Gregorio Dialogista, papa de Roma», pero esa atribución es tardía; la última sección explica de dónde viene realmente el oficio.'),
    rub('Es un oficio de Vísperas al que, después de las lecturas, se injerta la comunión. Lo que sigue es el orden entero. Lo que cambia cada día —las estiqueras de «Señor, a Ti clamo», los prokímena y las lecturas— se toma del Triodion, y del Menaion si hay un santo, y se dice en cada lugar dónde va.'),
  ]),

  section('inicio', 'La bendición y el salmo de la creación', [
    rub('Sacerdote, como al empezar la Liturgia:'),
    t(`Bendito sea el Reino del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Es lo único del comienzo que no es de Vísperas, y avisa desde la primera palabra de que aquí habrá comunión. Lector:'),
    t('Venid, adoremos y postrémonos ante nuestro Rey y Dios.'),
    t('Venid, adoremos y postrémonos ante Cristo, nuestro Rey y Dios.'),
    t('Venid, adoremos y postrémonos ante el mismo Cristo, nuestro Rey y nuestro Dios.'),
    psalm(103),
    rub('Al final se repite: «El sol conoce su ocaso; pusiste las tinieblas y se hizo de noche. ¡Qué grandes son tus obras, Señor! Todo lo hiciste con sabiduría». Gloria, ahora y siempre. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces). Esperanza nuestra, Señor, gloria a Ti.'),
  ]),

  section('letania-paz', 'La gran letanía', [
    rub('Diácono, o el sacerdote; a cada petición se responde «Señor, ten piedad»:'),
    t('En paz, oremos al Señor.'),
    t('Por la paz de lo alto y por la salvación de nuestras almas, oremos al Señor.'),
    t('Por la paz del mundo entero, por la estabilidad de las santas Iglesias de Dios y por la unión de todos, oremos al Señor.'),
    t('Por esta santa casa y por los que entran en ella con fe, piedad y temor de Dios, oremos al Señor.'),
    t('Por los cristianos piadosos y ortodoxos, oremos al Señor.'),
    t('Por nuestro arzobispo N., por el venerable presbiterio, por el diaconado en Cristo, por todo el clero y el pueblo, oremos al Señor.'),
    t('Por nuestro país, por sus autoridades y por todos los que lo protegen, oremos al Señor.'),
    t('Por esta ciudad, por toda ciudad y región, y por los que viven en ellas con fe, oremos al Señor.'),
    t('Por un clima benigno, por la abundancia de los frutos de la tierra y por tiempos de paz, oremos al Señor.'),
    t('Por los que navegan, los que viajan, los enfermos, los que sufren, los cautivos, y por su salvación, oremos al Señor.'),
    t('Por que seamos librados de toda aflicción, ira, peligro y necesidad, oremos al Señor.'),
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    t('Conmemorando a nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
    A_TI,
    rub('Sacerdote:'),
    t(`Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Se cierran del todo las puertas santas.'),
  ]),

  section('kathisma', 'La kathisma 18 y el traslado del Cordero', [
    rub('El lector lee en voz alta la kathisma decimoctava del Salterio, los salmos graduales: «Al Señor clamé en mi angustia». Se lee en tres partes, y cada una acaba con una pequeña letanía.'),
    head('Primera parte'),
    rub('Mientras se lee, el sacerdote hace tres postraciones ante el altar, abre el tabernáculo e inciensa los dones. Extiende el antimensio, pone sobre él la patena y traslada a ella el Cordero consagrado el domingo; lo cubre con la estrella y con un velo y, precedido del incensario, lo lleva a la mesa de la prótesis. Allí echa vino y agua en el cáliz, lo cubre, y cubre las dos cosas con el velo grande. En cada uno de estos gestos dice sólo:'),
    t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos.'),
    rub('El Sluzhebnik eslavo lo dice con menos detalle: al empezar la kathisma el sacerdote pone el Cordero en la patena, echa vino y agua en el cáliz, inciensa y lo cubre todo, diciendo sólo esa misma oración.'),
    psalm(119),
    psalm(120),
    psalm(121),
    psalm(122),
    psalm(123),
    ...FIN_DE_ESTACION,
    ...PEQUENA_LETANIA,
    rub('Sacerdote, en voz baja:'),
    t('Señor, no nos reprendas en tu cólera ni nos castigues en tu ira, sino trátanos según tu clemencia, médico y sanador de nuestras almas. Guíanos al puerto de tu voluntad; ilumina los ojos de nuestros corazones para que conozcamos tu verdad; y concédenos que lo que queda de este día, y todo el tiempo de nuestra vida, sea pacífico y sin pecado, por la intercesión de la santa Theotokos y de todos tus santos.'),
    rub('En voz alta:'),
    t(`Porque tuyo es el poder, y tuyos son el Reino, la fuerza y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    head('Segunda parte'),
    psalm(124),
    psalm(125),
    psalm(126),
    psalm(127),
    psalm(128),
    ...FIN_DE_ESTACION,
    ...PEQUENA_LETANIA,
    rub('Sacerdote, en voz baja:'),
    t('Señor, Dios nuestro, acuérdate de nosotros, tus siervos pecadores e inútiles, cuando invocamos tu santo y adorable nombre, y no nos defraudes en la espera de tu misericordia; concédenos, oh Dios, todo lo que te pedimos para nuestra salvación, y haznos dignos de amarte y temerte con todo nuestro corazón y de hacer en todo tu voluntad.'),
    rub('En voz alta:'),
    t(`Porque eres Dios bueno y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    head('Tercera parte'),
    psalm(129),
    psalm(130),
    psalm(131),
    psalm(132),
    psalm(133),
    rub('Gloria, ahora y siempre. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces). Esperanza nuestra, Señor, gloria a Ti.'),
    ...PEQUENA_LETANIA,
    rub('Sacerdote, en voz baja:'),
    t('Tú, a quien los santos poderes cantan con himnos incesantes y alabanzas que no callan: llena nuestra boca de tu alabanza, para que engrandezcamos tu santo nombre; y danos parte y herencia con todos los que te temen de verdad y guardan tus mandamientos, por la intercesión de la santa Theotokos y de todos tus santos.'),
    rub('En voz alta:'),
    t(`Porque Tú eres nuestro Dios, el Dios que tiene piedad y salva, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Estas tres oraciones son la segunda, la tercera y la cuarta de las siete oraciones de la luz de Vísperas (Biblioteca → Vísperas); aquí se reparten entre las tres partes de la kathisma.'),
  ]),

  section('senor-clame', 'Señor, a Ti clamo', [
    rub('El coro canta en voz baja, en el tono de la primera estiquera del Triodion:'),
    ref('Señor, a Ti clamo: escúchame. Escúchame, Señor. Señor, a Ti clamo, escúchame; atiende a la voz de mi súplica cuando clamo a Ti. Escúchame, Señor.'),
    ref('Suba mi oración como el incienso ante Ti; el alzar de mis manos, como sacrificio vespertino. Escúchame, Señor.'),
    rub('Siguen los salmos 140, 141, 129 y 116. En los diez últimos versículos se intercalan las estiqueras del día: las del Triodion —la idiomela, que se canta dos veces, y la de los mártires— y cuatro del Menaion, del santo del día siguiente o del que se celebra ese día. En el «Gloria» va la estiquera propia y en el «Ahora y siempre» un theotokion.'),
    psalm(140),
    psalm(141),
    psalm(129),
    psalm(116),
  ]),

  section('entrada', 'La entrada y el «Luz alegre»', [
    rub('Mientras se canta la estiquera del «Gloria», se abren las puertas santas. El sacerdote, con el diácono si lo hay, sale por la puerta del norte con el incensario, precedido de un cirio; si ese día se lee el Evangelio, la entrada se hace con el Evangeliario. Diácono: «Oremos al Señor». Sacerdote, en voz baja, la oración de la entrada:'),
    t('Por la tarde, por la mañana y al mediodía te alabamos, te bendecimos, te damos gracias y te suplicamos, Soberano de todas las cosas, Señor amigo de los hombres: haz que nuestra oración suba como el incienso ante Ti, y no dejes que nuestros corazones se inclinen a palabras ni a pensamientos malos; líbranos de todos los que acechan nuestras almas; porque a Ti, Señor, Señor, se vuelven nuestros ojos, y en Ti hemos esperado: no nos defraudes, Dios nuestro.'),
    t(`Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    rub('Diácono: «Bendice, padre, la santa entrada». Sacerdote:'),
    t(`Bendita la entrada de tus santos, siempre, ${POR_LOS_SIGLOS}`),
    rub('Diácono, ante las puertas santas:'),
    t('¡Sabiduría! ¡De pie!'),
    t('Luz alegre de la santa gloria del Padre inmortal, celestial, santo, bienaventurado: ¡oh Jesucristo! Llegados a la puesta del sol y viendo la luz de la tarde, cantamos al Padre, al Hijo y al Espíritu Santo, Dios. Digno eres de ser cantado en todo tiempo con voces santas, oh Hijo de Dios, que das la vida; por eso el mundo te glorifica.'),
  ]),

  section('lecturas', 'Las lecturas y la luz de Cristo', [
    rub('Diácono: «¡Atendamos!». Sacerdote: «Paz a todos». Diácono: «¡Sabiduría!». Se canta el primer prokímenon del día, del Triodion. Diácono: «¡Sabiduría! ¡Atendamos!». Y se lee la primera lectura: en la Gran Cuaresma, del Génesis; en los tres primeros días de la Semana Santa, del Éxodo.'),
    rub('Después se canta el segundo prokímenon. El diácono dice: «Manda». El sacerdote, con un cirio encendido y el incensario en las manos, de pie ante el altar y trazando con ellos la señal de la Cruz, dice:'),
    t('¡Sabiduría! ¡De pie!'),
    rub('Se vuelve al pueblo y, de pie en las puertas santas, proclama:'),
    t('La luz de Cristo ilumina a todos.'),
    rub('Bendice con el cirio en forma de cruz y vuelve al santuario. Todos se postran hasta el suelo mientras lo dice. Es uno de los pocos momentos del rito bizantino en que el pueblo no mira: la rúbrica manda inclinarse porque aquella luz no es la del cirio.'),
    rub('Los catecúmenos, que en la Iglesia antigua se preparaban en Cuaresma para el bautismo de Pascua, asistían hasta aquí; de ese uso quedan en este oficio unas letanías por ellos que no se dicen en ningún otro día del año.'),
    rub('Diácono: «¡Sabiduría! ¡Atendamos!». Se lee la segunda lectura: en la Cuaresma, de los Proverbios; en la Semana Santa, de Job. Al acabar, el sacerdote dice al lector: «Paz a ti». Diácono: «¡Sabiduría!».'),
  ]),

  section('suba-mi-oracion', 'Suba mi oración', [
    rub('El sacerdote, de pie ante el altar y moviendo despacio el incensario, canta con recogimiento:'),
    t('Suba mi oración como el incienso ante Ti; el alzar de mis manos, como sacrificio vespertino.'),
    rub('El coro lo repite, y el sacerdote canta los versículos mientras inciensa el altar: el primero desde el lado sur, el segundo desde detrás, el tercero desde el norte, y el «Gloria» de nuevo por delante. Después de cada uno el coro repite «Suba mi oración».'),
    t('Señor, a Ti clamo, escúchame; atiende a la voz de mi súplica cuando clamo a Ti.'),
    t('Pon, Señor, una guardia a mi boca y una puerta que cierre mis labios.'),
    t('No dejes que mi corazón se incline a palabras malas, a buscar excusas para el pecado.'),
    t(`Gloria al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
    rub('Al final el sacerdote canta «Suba mi oración»; sale a las puertas santas e inciensa el icono de Cristo cantando «como el incienso ante Ti», y mientras el coro canta «el alzar de mis manos, como sacrificio vespertino» inciensa los demás iconos, la iglesia y el pueblo.'),
    rub('En el uso eslavo todos están de rodillas mientras se canta, y después se dice la oración de san Efrén con tres postraciones:'),
    t('Señor y Soberano de mi vida: no me des espíritu de ociosidad, de desaliento, de dominio ni de vaniloquio.'),
    t('Concede en cambio a mí, tu siervo, espíritu de castidad, de humildad, de paciencia y de amor.'),
    t('Sí, Señor y Rey: concédeme ver mis propios pecados y no juzgar a mi hermano, porque bendito eres por los siglos de los siglos. Amén.'),
    rub('Si ese día se celebra a un santo con fiesta, o en los tres primeros días de la Semana Santa, se leen aquí el Apóstol y el Evangelio, como en la Liturgia.'),
  ]),

  section('letania-ferviente', 'La letanía ferviente', [
    rub('Diácono; a cada petición se responde tres veces «Señor, ten piedad»:'),
    t('Digamos todos con toda el alma y con todo el entendimiento, digamos.'),
    t('Señor todopoderoso, Dios de nuestros padres, te rogamos: escúchanos y ten piedad.'),
    t('Ten piedad de nosotros, oh Dios, según tu gran misericordia; te rogamos: escúchanos y ten piedad.'),
    t('Oremos también por nuestro arzobispo N.'),
    t('Oremos también por nuestros hermanos, los sacerdotes, los hieromonjes, los hierodiáconos y los monjes, y por toda nuestra hermandad en Cristo.'),
    rub('Así acaba en el uso del Patriarcado Ecuménico. Los libros eslavos añaden aquí las demás peticiones de la letanía ferviente de Vísperas (Biblioteca → Vísperas).'),
    rub('Sacerdote, en voz baja:'),
    t('Señor, Dios nuestro, recibe de tus siervos esta súplica ferviente, y ten piedad de nosotros según la abundancia de tu misericordia, y envía tus compasiones sobre nosotros y sobre todo tu pueblo, que espera de Ti la rica misericordia.'),
    rub('En voz alta:'),
    t(`Porque eres Dios misericordioso y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('catecumenos', 'La letanía de los catecúmenos', [
    rub('Diácono:'),
    t('Catecúmenos, orad al Señor.'),
    SENOR,
    t('Fieles, oremos por los catecúmenos, para que el Señor tenga piedad de ellos;'),
    t('para que los instruya en la palabra de la verdad;'),
    t('para que les revele el Evangelio de la justicia;'),
    t('para que los una a su santa Iglesia, católica y apostólica.'),
    t('Sálvalos, ten piedad de ellos, socórrelos y guárdalos, oh Dios, por tu gracia.'),
    SENOR,
    t('Catecúmenos, inclinad la cabeza ante el Señor.'),
    A_TI,
    rub('Sacerdote, en voz baja:'),
    t('Oh Dios, Dios nuestro, creador y hacedor de todas las cosas, que quieres que todos se salven y lleguen al conocimiento de la verdad: mira a tus siervos los catecúmenos, líbralos del antiguo engaño y de las asechanzas del adversario, y llámalos a la vida eterna; ilumina sus almas y sus cuerpos y cuéntalos en tu rebaño espiritual, sobre el que se invoca tu santo nombre.'),
    rub('En voz alta:'),
    t(`Para que también ellos glorifiquen con nosotros tu honorabilísimo y magnífico nombre, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Mientras tanto se despliega el antimensio, como en la Liturgia de san Juan Crisóstomo.'),
  ]),

  section('iluminandos', 'Por los que se preparan para el bautismo', [
    rub('Desde el miércoles de la cuarta semana, la de la mitad de la Cuaresma, se añade esta letanía por los que van a ser bautizados en Pascua. Está en los libros eslavos, de donde se ha traducido. Diácono:'),
    t('Cuantos sois catecúmenos, salid; catecúmenos, salid. Cuantos os preparáis para la iluminación, acercaos. Orad, los que os preparáis para la iluminación.'),
    SENOR,
    t('Fieles, oremos al Señor por nuestros hermanos que se preparan para la santa iluminación y por su salvación.'),
    SENOR,
    t('Para que el Señor, nuestro Dios, los afiance y los fortalezca;'),
    t('para que los ilumine con la luz del conocimiento y de la piedad;'),
    t('para que los haga dignos, a su debido tiempo, del baño de la regeneración, del perdón de los pecados y del vestido de la incorrupción;'),
    t('para que los engendre por el agua y el Espíritu;'),
    t('para que les conceda la plenitud de la fe;'),
    t('para que los cuente en su rebaño santo y escogido.'),
    t('Sálvalos, ten piedad de ellos, socórrelos y guárdalos, oh Dios, por tu gracia.'),
    SENOR,
    t('Los que os preparáis para la iluminación, inclinad la cabeza ante el Señor.'),
    A_TI,
    rub('Sacerdote, en voz baja:'),
    t('Muestra, Soberano, tu rostro a los que se preparan para la santa iluminación y desean sacudirse la mancha del pecado. Ilumina su pensamiento; afiánzalos en la fe, fortalécelos en la esperanza, perfecciónalos en el amor; haz de ellos miembros dignos de tu Cristo, que se entregó a sí mismo en rescate por nuestras almas.'),
    rub('En voz alta:'),
    t(`Porque Tú eres nuestra iluminación, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('fieles', 'Las oraciones de los fieles', [
    rub('Diácono:'),
    t('Cuantos sois catecúmenos, salid; catecúmenos, salid. Que no quede ninguno de los catecúmenos. Cuantos somos fieles, una y otra vez, en paz, oremos al Señor.'),
    rub('Desde la mitad de la Cuaresma dice antes: «Cuantos os preparáis para la iluminación, salid».'),
    SENOR,
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    SENOR,
    t('¡Sabiduría!'),
    rub('Sacerdote, en voz baja, la primera oración de los fieles:'),
    t('Oh Dios grande y digno de alabanza, que por la muerte vivificante de tu Cristo nos trasladaste de la corrupción a la incorrupción: libra Tú todos nuestros sentidos de la muerte que traen las pasiones, y ponles como buen guía la razón interior. Que el ojo se aparte de toda mirada mala, que el oído no dé entrada a las palabras ociosas, que la lengua se guarde limpia de expresiones indecorosas. Purifica nuestros labios, que te alaban, Señor; haz que nuestras manos se abstengan de las obras malas y hagan sólo lo que te agrada, y guarda con tu gracia todos nuestros miembros y nuestro entendimiento.'),
    rub('En voz alta:'),
    t(`Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Diácono:'),
    t('Una y otra vez, en paz, oremos al Señor.'),
    SENOR,
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    SENOR,
    t('¡Sabiduría!'),
    rub('Sacerdote, en voz baja, la segunda oración de los fieles:'),
    t('Soberano santo, bueno sobre toda bondad, a Ti, rico en misericordia, te suplicamos: sé propicio con nosotros, pecadores, y haznos dignos de recibir a tu Hijo unigénito y Dios nuestro, el Rey de la gloria. Porque he aquí que su Cuerpo purísimo y su Sangre vivificante entran en esta hora y van a ser depositados sobre esta mesa mística, escoltados invisiblemente por la multitud del ejército celestial. Concédenos participar de ellos sin condena, para que, iluminados por ellos los ojos de nuestro entendimiento, lleguemos a ser hijos de la luz y del día.'),
    rub('En voz alta:'),
    t(`Según el don de tu Cristo, con quien eres bendito, junto con tu santísimo, bueno y vivificante Espíritu, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('gran-entrada', 'La gran entrada en silencio', [
    rub('En lugar del Querúbico, el coro canta despacio, en el tono octavo, este himno, que el sacerdote y el diácono dicen también tres veces en voz baja ante el altar, con tres postraciones:'),
    t('Ahora las Potestades celestiales celebran invisiblemente con nosotros, pues he aquí que entra el Rey de la gloria.'),
    rub('Aquí se interrumpe el canto. La entrada se hace en silencio absoluto: el sacerdote lleva los dones con el velo grande extendido sobre la cabeza. Como los dones ya están consagrados, el pueblo se postra de rodillas y no se levanta hasta que están sobre el altar. Entonces el coro sigue:'),
    t('He aquí que es escoltado el sacrificio místico ya consumado. Acerquémonos con fe y con anhelo, para hacernos partícipes de la vida eterna. Aleluya, aleluya, aleluya.'),
    rub('Donde el griego dice «con fe y con anhelo», el eslavo dice «con fe y con amor».'),
  ]),

  section('padre-nuestro', 'La letanía y el Padre Nuestro', [
    rub('Diácono:'),
    t('Completemos nuestra súplica de la tarde al Señor.'),
    SENOR,
    t('Por los preciosos dones aquí presentes y ya santificados, oremos al Señor.'),
    SENOR,
    t('Para que nuestro Dios, amigo de los hombres, que los ha recibido en su altar santo, celestial y espiritual como perfume de fragancia espiritual, nos envíe a cambio la gracia divina y el don del Espíritu Santo, oremos.'),
    SENOR,
    t('Por que seamos librados de toda aflicción, ira, peligro y necesidad, oremos al Señor.'),
    SENOR,
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    SENOR,
    t('Pidamos al Señor que toda la tarde sea perfecta, santa, pacífica y sin pecado.'),
    CONCEDELO,
    t('Pidamos al Señor un ángel de paz, guía fiel y guardián de nuestras almas y de nuestros cuerpos.'),
    CONCEDELO,
    t('Pidamos al Señor el perdón y la remisión de nuestros pecados y de nuestras faltas.'),
    CONCEDELO,
    t('Pidamos al Señor lo que es bueno y provechoso para nuestras almas, y la paz para el mundo.'),
    CONCEDELO,
    t('Pidamos al Señor acabar en paz y en arrepentimiento el tiempo que nos queda de vida.'),
    CONCEDELO,
    t('Pidamos un final de nuestra vida cristiano, sin dolor, sin vergüenza y en paz, y una buena defensa ante el temible tribunal de Cristo.'),
    CONCEDELO,
    t('Habiendo pedido la unidad de la fe y la comunión del Espíritu Santo, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
    A_TI,
    rub('Sacerdote, en voz baja:'),
    t('Oh Dios de los misterios inefables e invisibles, en quien están escondidos los tesoros de la sabiduría y del conocimiento; que nos revelaste el ministerio de esta liturgia y, por tu gran amor a los hombres, nos pusiste a nosotros, pecadores, para ofrecerte dones y sacrificios por nuestros pecados y por las ignorancias del pueblo: Tú mismo, Rey invisible, que haces cosas grandes e inescrutables, gloriosas y extraordinarias, que no tienen número, mira a nosotros, tus siervos indignos, que estamos ante este santo altar como ante tu trono de querubines, en el que reposa tu Hijo unigénito y Dios nuestro en los misterios temibles aquí presentes.'),
    t('Libéranos de toda impureza, a nosotros y a tu pueblo fiel, y santifica las almas y los cuerpos de todos nosotros con una santificación que no se pierda; para que, participando con conciencia pura, con rostro sin vergüenza y con corazón iluminado de estas cosas santas y divinas, y vivificados por ellas, nos unamos a tu mismo Cristo, nuestro Dios verdadero, que dijo: «El que come mi carne y bebe mi sangre permanece en mí y yo en él». Así, habitando y caminando en nosotros tu Verbo, Señor, seremos templo de tu santísimo y adorable Espíritu, rescatados de toda asechanza del diablo, obrada de hecho, de palabra o de pensamiento, y alcanzaremos los bienes que nos has prometido, con todos tus santos que desde siempre te agradaron.'),
    rub('En voz alta:'),
    t('Y concédenos, Soberano, que con confianza y sin condena nos atrevamos a invocarte a Ti, Dios del cielo, como Padre, y a decir:'),
    rub('Todos:'),
    t('Padre nuestro, que estás en los cielos: santificado sea tu nombre; venga tu Reino; hágase tu voluntad, así en la tierra como en el cielo. El pan nuestro de cada día dánoslo hoy; y perdónanos nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del maligno.'),
    rub('Sacerdote:'),
    t(`Porque tuyos son el Reino, el poder y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    t('Paz a todos.'),
    ref('Y con tu espíritu.'),
    rub('Diácono:'),
    t('Inclinemos la cabeza ante el Señor.'),
    A_TI,
    rub('Sacerdote, en voz baja, la oración de la inclinación:'),
    t('Oh Dios, el único bueno y compasivo, que habitas en las alturas y miras lo humilde: mira con ojos compasivos a todo tu pueblo y guárdalo; y haznos dignos a todos de participar sin condena de estos misterios tuyos que dan la vida. Porque ante Ti hemos inclinado la cabeza, esperando de Ti la rica misericordia.'),
    rub('En voz alta:'),
    t(`Por la gracia, las compasiones y el amor a los hombres de tu Hijo unigénito, con quien eres bendito, junto con tu santísimo, bueno y vivificante Espíritu, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Sacerdote, en voz baja:'),
    t('Atiende, Señor Jesucristo, Dios nuestro, desde tu santa morada y desde el trono de la gloria de tu Reino, y ven a santificarnos, Tú que estás sentado arriba con el Padre y estás aquí invisiblemente con nosotros. Y dígnate, con tu mano poderosa, darnos tu Cuerpo purísimo y tu preciosa Sangre, y por medio de nosotros a todo el pueblo.'),
  ]),

  section('comunion', 'La comunión', [
    rub('Los dones siguen cubiertos. El sacerdote mete las manos bajo el velo y toca el Pan vivificante con reverencia y con mucho temor. Diácono:'),
    t('¡Atendamos!'),
    rub('Sacerdote:'),
    t('Las cosas santas presantificadas, para los santos.'),
    ref('Uno solo es santo, uno solo es Señor, Jesucristo, para gloria de Dios Padre. Amén.'),
    rub('El coro canta el versículo de comunión, del salmo 33:'),
    t('Gustad y ved qué bueno es el Señor. Aleluya, aleluya, aleluya.'),
    rub('Mientras se canta, el sacerdote descubre los dones y parte el Cordero en cuatro, diciendo como en la Liturgia:'),
    t('Se parte y se reparte el Cordero de Dios, que se parte y no se divide, que siempre se come y nunca se consume, sino que santifica a los que participan de Él.'),
    rub('Pone una parte en el cáliz: «Plenitud del cáliz, de la fe, del Espíritu Santo. Amén». Y se vierte en él el agua caliente: «Bendito el fervor de tus santos, siempre, ahora y siempre, y por los siglos de los siglos. Amén. Fervor de la fe, lleno del Espíritu Santo. Amén». En los libros eslavos estos gestos se hacen en silencio.'),
    rub('El sacerdote y el diácono se piden perdón: «Hermano y concelebrante, perdóname a mí, pecador». «Que el Señor Dios se acuerde de tu sacerdocio en su Reino». Se inclinan tres veces: «Oh Dios, sé propicio conmigo, pecador, y ten piedad de mí». Y comulgan:'),
    t('He aquí que me acerco a Cristo, nuestro Rey inmortal y Dios. Se me da a mí, N., presbítero indigno, el precioso y santísimo Cuerpo de nuestro Señor, Dios y Salvador Jesucristo, para el perdón de mis pecados y para la vida eterna. Amén.'),
    rub('Antes dicen las oraciones de la comunión, las mismas que dirán los fieles: «Creo, Señor, y confieso», «De tu Cena mística» y «Que la comunión de tus santos misterios» (Biblioteca → Divina Liturgia de san Juan Crisóstomo → La Comunión).'),
    rub('Aquí los usos difieren. En el libro griego que sigue ATHOS, el sacerdote comulga también del cáliz con las palabras de la Liturgia: «Esto ha tocado mis labios: el Señor quitará todas mis iniquidades y purificará mis pecados». En los libros eslavos el sacerdote y el diácono comulgan sólo de la partícula del Cuerpo, que el domingo se empapó en la Sangre; el diácono no bebe del cáliz hasta el final, porque —dice la rúbrica— el vino, aunque queda santificado por la partícula, no se ha convertido en la Sangre.'),
    rub('Se abren las puertas santas. Diácono:'),
    t('Acercaos con temor de Dios, con fe y con amor.'),
    ref('Amén. Bendito el que viene en el nombre del Señor; Dios es el Señor y se nos ha manifestado.'),
    rub('En el uso eslavo el diácono dice «Acercaos con temor de Dios y con fe», y el coro canta: «Bendeciré al Señor en todo tiempo; su alabanza estará siempre en mi boca».'),
    rub('Comulgan los fieles. Al acabar, el sacerdote bendice al pueblo:'),
    t('Salva, oh Dios, a tu pueblo y bendice tu heredad.'),
    rub('En lugar de «Hemos visto la luz verdadera», el coro canta:'),
    ref('Bendeciré al Señor en todo tiempo; su alabanza estará siempre en mi boca. Pan celestial y cáliz de vida: gustad y ved qué bueno es el Señor. Aleluya, aleluya, aleluya.'),
    rub('El sacerdote dice en voz baja: «Elévate sobre los cielos, oh Dios, y sobre toda la tierra tu gloria». El diácono lleva la patena a la prótesis. El sacerdote se inclina y dice en voz baja: «Bendito sea nuestro Dios»; toma el cáliz y, vuelto al pueblo, dice:'),
    t(`Siempre, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Lleva el cáliz a la prótesis, vuelve al altar y pliega el antimensio.'),
  ]),

  section('accion-de-gracias', 'La acción de gracias', [
    rub('Diácono:'),
    t('De pie. Habiendo recibido los divinos, santos, purísimos, inmortales, celestiales, vivificantes y temibles misterios de Cristo, demos gracias dignamente al Señor.'),
    SENOR,
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    SENOR,
    t('Habiendo pedido que toda la tarde sea perfecta, santa, pacífica y sin pecado, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
    A_TI,
    rub('Sacerdote, en voz baja:'),
    t('Te damos gracias, Dios Salvador de todos, por todos los bienes que nos has dado y por haber participado del santo Cuerpo y de la Sangre de tu Cristo. Y te suplicamos, Soberano amigo de los hombres: guárdanos bajo la protección de tus alas, y concédenos, hasta nuestro último aliento, participar dignamente de tus cosas santas, para iluminación del alma y del cuerpo, para herencia del Reino de los cielos.'),
    rub('Toma el Evangeliario, traza con él la señal de la Cruz sobre el antimensio ya plegado y lo deja encima. En voz alta:'),
    t(`Porque Tú eres nuestra santificación, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('ambon', 'La oración detrás del ambón', [
    rub('Sacerdote:'),
    t('En paz, salgamos.'),
    ref('En el nombre del Señor.'),
    rub('Diácono:'),
    t('Oremos al Señor.'),
    SENOR,
    rub('El sacerdote sale del santuario y, ante el icono de Cristo, dice la oración propia de este oficio, que es la oración de toda la Cuaresma:'),
    t('Soberano todopoderoso, que hiciste con sabiduría toda la creación; que por tu providencia inefable y tu gran bondad nos has traído a estos días venerabilísimos, para la purificación de las almas y de los cuerpos, para el dominio de las pasiones, para la esperanza de la resurrección; que durante cuarenta días pusiste en manos de tu siervo Moisés las tablas con las letras grabadas por Dios: concédenos también a nosotros, oh Bueno, combatir el buen combate, acabar la carrera del ayuno, guardar indivisa la fe, aplastar las cabezas de los dragones invisibles, mostrarnos vencedores del pecado y llegar sin condena a adorar también la santa Resurrección.'),
    t(`Porque bendito y glorificado es tu honorabilísimo y magnífico nombre, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    ref('Bendito sea el nombre del Señor, desde ahora y para siempre. <em>(tres veces)</em>'),
    rub('Mientras se canta, el sacerdote va a la prótesis y dice en voz baja la oración para consumir los dones:'),
    t(`Señor, Dios nuestro, que nos has traído a estos días venerabilísimos y nos has hecho partícipes de tus misterios temibles: únenos a tu rebaño espiritual y haznos herederos de tu Reino, ${POR_LOS_SIGLOS} Amén.`),
  ]),

  section('despedida', 'La despedida', [
    rub('Diácono: «Oremos al Señor». Coro: «Señor, ten piedad». Sacerdote:'),
    t(`Que la bendición del Señor y su misericordia vengan sobre vosotros, por su gracia divina y su amor a los hombres, siempre, ${POR_LOS_SIGLOS}`),
    AMEN,
    t('Gloria a Ti, Cristo Dios, esperanza nuestra, gloria a Ti.'),
    rub('Despedida:'),
    t('Cristo, nuestro Dios verdadero, por las intercesiones de su purísima y del todo inmaculada santa Madre; por el poder de la preciosa y vivificante Cruz; por la protección de las venerables Potestades celestiales incorpóreas; por las súplicas del venerable y glorioso profeta, Precursor y Bautista Juan; de los santos, gloriosos y victoriosos mártires; de nuestros venerables padres portadores de Dios; del santo de este templo; de los santos y justos antepasados de Dios Joaquín y Ana; del santo del día y de todos los santos, tenga piedad de nosotros y nos salve, porque es bueno y amigo de los hombres.'),
    rub('Los libros eslavos nombran también aquí a «nuestro santo padre Gregorio Dialogista», a quien atribuyen el oficio.'),
    rub('Mientras el sacerdote reparte el antídoron se leen el salmo 33 y, en el uso griego, también el 144.'),
    psalm(33),
    psalm(144),
    t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos.'),
    AMEN,
  ]),

  section('por-que', 'Por qué no hay consagración', [
    t('La Iglesia antigua no celebraba la Eucaristía en días de ayuno estricto, porque la Liturgia es siempre fiesta y la fiesta no cabe en un día de duelo. Pero tampoco quiso dejar a los fieles sin comunión durante seis semanas.'),
    t('La solución fue ésta: consagrar el domingo un Cordero de más, guardarlo, y darlo a comulgar entre semana dentro de un oficio que no es la Liturgia sino Vísperas. Por eso se celebra al atardecer, tras un día entero de ayuno, y por eso en él no se oye nunca la anáfora.'),
    rub('El canon 52 del Concilio Quinisexto, de 692, es el que fija esta práctica para toda la Cuaresma. Su atribución a san Gregorio Dialogista, papa de Roma, es posterior y no tiene fundamento histórico; el oficio es de formación oriental.'),
    rub('Traducción para ATHOS a partir del original griego, que es de dominio público, y, en la letanía por los que se preparan para el bautismo, del eslavo; no procede de un libro litúrgico español publicado.'),
  ]),
];
