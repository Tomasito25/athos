/**
 * Más oraciones, añadidas en la 1.30.
 *
 * Para los momentos que se habían quedado cortos y para pedir la intercesión
 * de la Theotokos y de los santos, que no tenía sitio propio:
 *
 * - del Molitvoslov eslavo: la oración a la Theotokos Hodigitria antes de un
 *   viaje, «Reina mía buenísima», el kontakion «No tenemos otra ayuda», la
 *   oración de la mañana de san Juan de Kronstadt y la oración de celda de los
 *   ancianos de Óptina por los que murieron sin arrepentimiento;
 * - del akáthistos a san Panteleimón: la oración por la curación, la acción de
 *   gracias después de curarse y la oración del obispo Jeremías por las
 *   enfermedades del alma;
 * - del akáthistos a san Sergio de Rádonezh: la oración breve al santo;
 * - del Theotokarion de san Nectario de Egina: el himno «Ἁγνὴ Παρθένε»;
 * - y la oración final del akáthistos a san Nicolás, ya traducida en ATHOS,
 *   ahora también suelta.
 *
 * Fuentes: Wikisource ruso («Молитвы в продолжении дня», «Молитвы ко
 * Пресвятой Богородице», «Акафист великомученику Пантелеимону», «Акафист
 * преподобному Сергию Радонежскому») y griego («Αγνή Παρθένε»). Todos los
 * originales son de dominio público: los más recientes son de san Juan de
 * Kronstadt († 1908) y de san Nectario († 1920). La versión española es de
 * ATHOS, y cada ficha lo dice.
 */
import type { SourceMeta, TextBlock } from '@/types';
import type { ThirdPrayerSeed } from './prayers-third';
import { AKATHISTOS_NICOLAS } from './akathistos-mas';
import { SAINT_PROPER_TROPARIA } from './troparia-santos';
import { embed } from './comun';

const DERECHOS =
  'El original es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.';
const NOTA =
  'Es una traducción de un texto que existe, no una oración escrita para ATHOS. La versión española es de ATHOS: no procede de un libro de oraciones español publicado.';

const traduccion = (fuente: string, original: 'eslavo' | 'griego', autor?: string, nota?: string): SourceMeta => ({
  source: `${fuente}. Traducción al español hecha para ATHOS a partir del original ${original}, que es de dominio público`,
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  copyright: DERECHOS,
  dateAdded: '2026-10-14',
  author: autor,
  notes: nota ? `${NOTA} ${nota}` : NOTA,
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });

const DIA = 'Libro de oraciones ortodoxo eslavo (Molitvoslov), «Oraciones durante el día», en la transcripción de Wikisource';
const THEOTOKOS = 'Libro de oraciones ortodoxo eslavo (Molitvoslov), «Oraciones a la santísima Theotokos», en la transcripción de Wikisource';
const PANTELEIMON = 'Akáthistos al gran mártir Panteleimón, con sus oraciones, en la transcripción de Wikisource';
const SERGIO = 'Akáthistos a san Sergio de Rádonezh, con sus oraciones, en la transcripción de Wikisource';

/** Un verso del himno de san Nectario, con su griego. */
const verso = (espanol: string, griego: string): TextBlock => ({
  kind: 'text',
  content: `${espanol} <em>Alégrate, Esposa no desposada.</em>`,
  greek: `${griego} Χαῖρε, Νύμφη ἀνύμφευτε.`,
});

/** La oración final del akáthistos a san Nicolás, tal como está en ATHOS. */
const ORACION_A_SAN_NICOLAS: TextBlock[] = (AKATHISTOS_NICOLAS[AKATHISTOS_NICOLAS.length - 1]?.blocks ?? []).filter(
  (b) => !(b.kind === 'rubric' && b.content === 'Oración'),
);

export const FIFTH_PRAYERS: ThirdPrayerSeed[] = [
  /* ═════════════════════ A LA THEOTOKOS Y A LOS SANTOS ═════════════════════ */
  {
    id: 'agni-parthene',
    title: 'Virgen pura, Soberana',
    subtitle: 'Ἁγνὴ Παρθένε, himno de san Nectario de Egina',
    category: 'santos',
    blocks: [
      rub('Lo compuso san Nectario de Egina († 1920) para su Theotokarion, un libro de himnos a la Theotokos. Se canta en el tono plagal primero, con el saludo «Alégrate, Esposa no desposada» después de cada verso. Va con su griego, porque es como más se canta.'),
      verso('Virgen pura, Soberana, Theotokos inmaculada;', 'Ἁγνὴ Παρθένε Δέσποινα, ἄχραντε Θεοτόκε,'),
      verso('Virgen Madre, Reina, vellón empapado de rocío.', 'Παρθένε μήτηρ ἄνασσα, πανένδροσέ τε πόκε.'),
      verso('Más alta que los cielos, más resplandeciente que los rayos del sol;', 'Ὑψηλοτέρα οὐρανῶν, ἀκτίνων λαμπροτέρα,'),
      verso('alegría de los coros de las vírgenes, más excelsa que los ángeles.', 'Χαρὰ παρθενικῶν χορῶν, ἀγγέλων ὑπερτέρα.'),
      verso('Más brillante que los cielos, más pura que la luz;', 'Ἐκλαμπροτέρα οὐρανῶν, φωτὸς καθαρωτέρα,'),
      verso('más santa que todos los ejércitos del cielo.', 'Τῶν οὐρανίων στρατιῶν πασῶν ἁγιωτέρα.'),
      verso('María, siempre virgen, Señora del mundo entero;', 'Μαρία ἀειπάρθενε, κόσμου παντὸς Κυρία,'),
      verso('Esposa inmaculada, purísima, Soberana toda santa.', 'Ἄχραντε νύμφη πάναγνε, Δέσποινα Παναγία.'),
      verso('María, Esposa y Reina, causa de nuestra alegría;', 'Μαρία νύμφη ἄνασσα, χαρᾶς ἡμῶν αἰτία,'),
      verso('Doncella venerable, Reina, Madre santísima.', 'Κόρη σεμνή, Βασίλισσα, Μήτηρ ὑπεραγία.'),
      verso('Más venerable que los querubines, más gloriosa', 'Τιμιωτέρα Χερουβίμ, ὑπερενδοξοτέρα'),
      verso('que los serafines incorpóreos, más excelsa que los tronos.', 'Τῶν ἀσωμάτων Σεραφίμ, τῶν θρόνων ὑπερτέρα.'),
      verso('Alégrate, canto de los querubines; alégrate, himno de los ángeles;', 'Χαῖρε τὸ ᾆσμα Χερουβίμ, χαῖρε ὕμνος ἀγγέλων,'),
      verso('alégrate, cántico de los serafines, alegría de los arcángeles.', 'Χαῖρε ᾠδὴ τῶν Σεραφίμ, χαρὰ τῶν ἀρχαγγέλων.'),
      verso('Alégrate, paz y alegría, puerto de la salvación;', 'Χαῖρε εἰρήνη καὶ χαρά, λιμὴν τῆς σωτηρίας,'),
      verso('cámara nupcial sagrada del Verbo, flor de la incorrupción.', 'Παστὰς τοῦ Λόγου ἱερά, ἄνθος τῆς ἀφθαρσίας.'),
      verso('Alégrate, paraíso de delicias y de vida eterna;', 'Χαῖρε παράδεισε τρυφῆς, ζωῆς τε αἰωνίας,'),
      verso('alégrate, árbol de la vida, fuente de inmortalidad.', 'Χαῖρε τὸ ξύλον τῆς ζωῆς, πηγὴ ἀθανασίας.'),
      verso('A ti te suplico, Soberana; a ti te invoco ahora;', 'Σὲ ἱκετεύω Δέσποινα, σὲ νῦν ἐπικαλοῦμαι,'),
      verso('a ti te ruego, Reina de todos: te pido tu gracia.', 'Σὲ δυσωπῶ Παντάνασσα, σὴν χάριν ἐξαιτοῦμαι.'),
      verso('Doncella venerable y sin mancha, Soberana toda santa:', 'Κόρη σεμνὴ καὶ ἄσπιλε, Δέσποινα Παναγία,'),
      verso('con ardor te invoco, templo santificado.', 'Θερμῶς ἐπικαλοῦμαί σε, ναὲ ἡγιασμένε.'),
      verso('Socórreme, líbrame del enemigo,', 'Ἀντιλαβοῦ μου, ῥῦσαί με ἀπὸ τοῦ πολεμίου'),
      verso('y hazme heredero de la vida eterna.', 'Καὶ κληρονόμον δεῖξόν με ζωῆς τῆς αἰωνίου.'),
    ],
    meta: traduccion(
      'Theotokarion de san Nectario de Egina, «Ἁγνὴ Παρθένε», en la transcripción de Wikisource griego',
      'griego',
      'San Nectario de Egina († 1920)',
    ),
  },
  {
    id: 'reina-mia',
    title: 'Reina mía buenísima',
    subtitle: 'A la Theotokos, en la tribulación',
    category: 'santos',
    blocks: [
      t('Reina mía buenísima, esperanza mía, Theotokos, refugio de los huérfanos y protectora de los peregrinos, alegría de los afligidos, amparo de los ofendidos: ves mi desgracia, ves mi aflicción. Ayúdame, porque soy débil; guíame, porque soy peregrino.'),
      t('Tú conoces el agravio que padezco: resuélvelo como quieras. Porque no tengo otra ayuda fuera de ti, ni otra protectora, ni buena consoladora, sino sólo tú, oh Madre de Dios: guárdame y cúbreme por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(THEOTOKOS, 'eslavo'),
  },
  {
    id: 'a-san-nicolas',
    title: 'A san Nicolás',
    subtitle: 'La oración final de su akáthistos',
    category: 'santos',
    blocks: [
      rub('Es la oración con que termina el akáthistos a san Nicolás, y la que más se reza ante su icono.'),
      ...ORACION_A_SAN_NICOLAS,
      embed('akathist:akathistos-nicolas', 'El akáthistos entero'),
    ],
    meta: traduccion('Libro de oraciones eslavo, oración final del akáthistos a san Nicolás (edición digital de Azbuka Very, azbyka.ru)', 'eslavo'),
  },

  /* ═════════════════════ EN LA ANGUSTIA ═════════════════════ */
  {
    id: 'no-tenemos-otra-ayuda',
    title: 'No tenemos otra ayuda',
    subtitle: 'Kontakion a la Theotokos',
    category: 'angustia',
    blocks: [
      t('No tenemos otra ayuda, no tenemos otra esperanza fuera de ti, Soberana. Ayúdanos tú: en ti esperamos y de ti nos gloriamos, porque somos tus siervos: que no seamos avergonzados.'),
      rub('Se canta en el moleben a la Theotokos, y se dice a solas en cualquier apuro, a veces tres veces seguidas.'),
    ],
    meta: traduccion(THEOTOKOS, 'eslavo'),
  },

  /* ═════════════════════ ANTES DE VIAJAR ═════════════════════ */
  {
    id: 'hodigitria-viaje',
    title: 'A la Theotokos que guía el camino',
    subtitle: 'Antes de un viaje largo',
    category: 'antes-viajar',
    blocks: [
      rub('Hodigitria quiere decir «la que guía el camino»: es el nombre de los iconos en que la Virgen señala con la mano a su Hijo.'),
      t('¡Oh santísima Soberana mía, Virgen Theotokos, Hodigitria, protectora y esperanza de mi salvación! He aquí que ahora quiero partir para el camino que tengo delante, y durante este tiempo te encomiendo a ti, misericordiosísima Madre mía, mi alma y mi cuerpo, todas las fuerzas de mi mente y de mi cuerpo, confiándome entero a tu firme cuidado y a tu ayuda todopoderosa.'),
      t('¡Oh buena compañera y protectora mía! Te suplico con fervor que este camino mío no tenga tropiezos: guíame en él y dirígelo tú, santísima Hodigitria, como tú sabes, a la gloria de tu Hijo, mi Señor Jesucristo. Sé mi ayuda en todo, y sobre todo en este viaje largo y trabajoso guárdame bajo tu poderosa protección de todas las desgracias y aflicciones que puedan sobrevenir y de los enemigos visibles e invisibles.'),
      t('Y ruega por mí, Señora mía, a tu Hijo, Cristo nuestro Dios, que me envíe en ayuda a su ángel de paz, guía fiel y guardián, para que, como antiguamente dio a su siervo Tobías a Rafael, que en todo lugar y en todo tiempo lo guardó en el camino de todo mal, así también, conduciendo felizmente mi camino y guardándome con el poder del cielo, me haga volver sano, en paz y entero a mi casa, para gloria de su santo nombre; y que yo le glorifique y le bendiga todos los días de mi vida, y te engrandezca a ti, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(DIA, 'eslavo'),
  },

  /* ═════════════════════ EN LA ENFERMEDAD ═════════════════════ */
  {
    id: 'panteleimon-curacion',
    title: 'A san Panteleimón, por la curación',
    subtitle: 'Al médico sin paga, en la enfermedad',
    category: 'enfermedad',
    blocks: [
      rub('San Panteleimón era médico en Nicomedia y murió mártir hacia el año 305. Su nombre quiere decir «todo misericordia», y es el santo al que más se encomiendan los enfermos.'),
      t('¡Oh gran servidor de Cristo, portador de la pasión y médico misericordiosísimo, Panteleimón! Ten compasión de mí, siervo pecador; escucha mi gemido y mi clamor; aplaca al médico celestial y supremo de nuestras almas y cuerpos, Cristo nuestro Dios, para que me conceda la curación de la enfermedad que me oprime.'),
      t('Recibe la súplica indigna del más pecador de todos los hombres. Visítame con tu visita llena de gracia. No desprecies las llagas de mis pecados: úngelas con el óleo de tu misericordia y cúrame, para que, sano de alma y cuerpo, pueda pasar el resto de mis días, por la gracia de Dios, en arrepentimiento y agradando a Dios, y sea digno de recibir un buen final de mi vida.'),
      t('¡Sí, servidor de Dios! Suplica a Cristo Dios que por tu intercesión conceda salud a mi cuerpo y salvación a mi alma. Amén.'),
      // El tropario, el mismo que ATHOS trae en la ficha del santo.
      head(`Tropario, ${SAINT_PROPER_TROPARIA.panteleimon?.tone.toLowerCase() ?? 'tono 3'}`),
      ...(SAINT_PROPER_TROPARIA.panteleimon?.blocks ?? []),
    ],
    meta: traduccion(PANTELEIMON, 'eslavo'),
  },

  /* ═════════════════════ ARREPENTIMIENTO ═════════════════════ */
  {
    id: 'panteleimon-alma',
    title: 'Cúranos, san Panteleimón',
    subtitle: 'Por las enfermedades del alma, del obispo Jeremías',
    category: 'arrepentimiento',
    blocks: [
      rub('La escribió Jeremías (Soloviov), obispo de Nizhni Nóvgorod, que acabó su vida como recluso († 1884). Recorre una a una las enfermedades del alma, y sirve también como examen de conciencia.'),
      t('¡Santo gran mártir y médico Panteleimón! Ruega a Dios por nosotros y no permitas que sigan en nosotros las enfermedades que padecemos en el alma y en el cuerpo. Cura las llagas y las heridas que nos han causado nuestras pasiones.'),
      t('Estamos enfermos de pereza y de flojedad: cúranos. Estamos enfermos de apego a las cosas de la tierra: cúranos. Estamos enfermos, oh san Panteleimón, de olvido: de la obra de nuestra salvación, de nuestros pecados y debilidades, de nuestros deberes: cúranos. Estamos enfermos de rencor, de ira, de odio: cúranos, médico del Monte Athos y del mundo entero. Estamos enfermos de envidia, de soberbia, de altivez y de vanagloria, en medio de toda nuestra pobreza y miseria: cúranos. Estamos enfermos de los muchos y diversos achaques del amor a la carne: del exceso en el comer, de la intemperancia, de la gula, de la sensualidad: cúranos. Estamos enfermos de somnolencia, de palabrería, de conversación vana, de juzgar a los demás: cúranos, oh san Panteleimón.'),
      t('Están enfermos nuestros ojos de miradas pecaminosas; nuestros oídos, de escuchar palabras vacías, maledicencias y calumnias: cúranos. Están enfermas nuestras manos, que no quieren alzarse a la oración ni abrirse para dar limosna: cúranos. Están enfermos nuestros pies, que no quieren correr al templo del Señor y prefieren andar por las plazas y visitar las casas del mundo: cúranos. Está enferma, muy enferma, nuestra lengua, nuestra boca: de palabras vanas y ociosas, de maledicencia; se aparta de la oración y de la alabanza, o la dice con descuido, distraída, sin atención y sin entenderla: cúranos, oh misericordioso.'),
      t('De la cabeza a los pies estamos enfermos. Está enfermo nuestro entendimiento de torpeza, de insensatez y de necedad; está enferma nuestra voluntad, que se aparta de las ocupaciones santas y se va tras lo dañino y lo contrario a Dios; está enferma nuestra memoria, que olvida nuestros pecados y guarda sin perder nada las faltas y ofensas de nuestro prójimo; está enferma nuestra imaginación, que no sabe ni quiere representarse con viveza nuestra muerte, el tormento eterno de los pecadores, los bienes del Reino de los cielos, la ira de Dios, los padecimientos de Cristo en la Cruz y su crucifixión: cúranos, oh san Panteleimón.'),
      t('Todo en nosotros está enfermo. Está débil nuestra alma entera, con todas sus fuerzas y facultades; está débil todo nuestro cuerpo, con todos sus miembros. Cúranos, oh san Panteleimón, médico sin paga y lleno de amor, servidor de la santísima Theotokos, y no abandones nuestra miseria en tantas dolencias y en tanta debilidad: para que, curado por tu gracia, glorifique a la santísima Trinidad, Padre, Hijo y Espíritu Santo, y a la santísima Theotokos, que te envía a servir a los enfermos, y te dé gracias a ti, san Panteleimón, que traes la curación, por los siglos. Amén.'),
    ],
    meta: traduccion(PANTELEIMON, 'eslavo', 'Jeremías (Soloviov), obispo († 1884)'),
  },

  /* ═════════════════════ AL RECIBIR UN BIEN ═════════════════════ */
  {
    id: 'panteleimon-gracias',
    title: 'Gracias por la curación',
    subtitle: 'A san Panteleimón, después de curarse',
    category: 'accion-de-gracias',
    blocks: [
      t('Santo gran mártir, médico y taumaturgo Panteleimón, excelentísimo servidor de Dios y constante intercesor de los cristianos ortodoxos: con razón se te llama Panteleimón, que quiere decir «todo misericordia», porque, habiendo recibido de Dios la gracia de rogar por nosotros y de curar las enfermedades, das con abundancia a todos los que acuden a ti curaciones diversas y todo lo necesario para la vida presente y para la salvación.'),
      t('Por eso también nosotros, indignos, que hemos alcanzado tu misericordia, acudimos de nuevo a ti ante tu santo icono, y glorificándote como verdadero servidor de Dios y fiel intercesor y médico nuestro, te damos gracias de todo corazón a ti y al dador de todos los bienes, el Señor nuestro Dios, por los grandes beneficios que por ti nos ha hecho.'),
      t('Recibe, pues, con misericordia esta pequeña acción de gracias nuestra, porque no tenemos otra cosa que darte en pago; y en el tiempo que nos queda de vida no nos prives, débiles y pecadores, de tu ayuda ni de tu intercesión ante el Señor nuestro Dios, a quien corresponde toda gloria, acción de gracias y adoración, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(PANTELEIMON, 'eslavo'),
  },

  /* ═════════════════════ ANTES DE ESTUDIAR ═════════════════════ */
  {
    id: 'san-sergio-estudio',
    title: 'A san Sergio de Rádonezh',
    subtitle: 'El santo de los que estudian',
    category: 'antes-estudiar',
    blocks: [
      rub('San Sergio († 1392) fundó el monasterio de la Trinidad, cerca de Moscú. Cuenta su Vida que de niño no conseguía aprender a leer hasta que un anciano monje rezó por él y lo bendijo; desde entonces los estudiantes se encomiendan a él antes de estudiar y de los exámenes.'),
      t('¡Oh venerable padre nuestro Sergio, portador de Dios! Míranos con misericordia, y a los que estamos apegados a la tierra elévanos a la altura del cielo. Fortalece nuestra pusilanimidad y confírmanos en la fe, para que esperemos sin dudar recibir, por tus oraciones, todos los bienes de la bondad de Dios, nuestro Soberano.'),
      t('Pide con tu intercesión para todos y para cada uno el don que necesite; y por tus oraciones, que nos ayudan, haznos dignos de librarnos en el día del Juicio terrible del lado izquierdo, de estar entre los de la derecha y de oír la voz bienaventurada de Cristo, el Soberano: «Venid, benditos de mi Padre, heredad el Reino preparado para vosotros desde la creación del mundo». Amén.'),
      rub('Donde va la oración, se pueden decir los nombres de los que se encomiendan.'),
    ],
    meta: traduccion(SERGIO, 'eslavo'),
  },

  /* ═════════════════════ AL DESPERTAR ═════════════════════ */
  {
    id: 'kronstadt-manana',
    title: 'Oh Dios, Creador y Soberano del mundo',
    subtitle: 'Oración de la mañana de san Juan de Kronstadt',
    category: 'manana',
    blocks: [
      t('¡Oh Dios, Creador y Soberano del mundo! Mira con misericordia a tu criatura, adornada con tu imagen divina, en estas horas de la mañana: que tu ojo, incontables veces más luminoso que los rayos del sol, vivifique e ilumine mi alma, oscura y muerta por el pecado.'),
      t('Quita de mí el desaliento y la pereza, y concédeme alegría y vigor del alma, para que con el corazón gozoso glorifique tu bondad, tu santidad, tu grandeza sin límites y tus perfecciones infinitas a toda hora y en todo lugar. Porque Tú eres mi Creador y el Señor de mi vida, Señor, y a Ti se debe la gloria de tus criaturas racionales a toda hora, ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    meta: traduccion(DIA, 'eslavo', 'San Juan de Kronstadt († 1908)'),
  },

  /* ═════════════════════ POR LOS DIFUNTOS ═════════════════════ */
  {
    id: 'optina-sin-arrepentimiento',
    title: 'Por los que murieron sin arrepentimiento',
    subtitle: 'Oración de celda de los ancianos de Óptina',
    category: 'difuntos',
    blocks: [
      rub('La dio el starets Leónidas de Óptina († 1841) a un discípulo cuyo padre se había quitado la vida. Es una oración de celda: se reza en privado, no en la iglesia, y conviene hablarlo antes con el padre espiritual. La Iglesia, por regla general, no celebra oficios públicos por los que se quitaron la vida ni por los no bautizados; pero no prohíbe encomendarlos a Dios en secreto.'),
      t('Busca, Señor, el alma perdida de N.: si es posible, ten piedad de ella. Tus juicios son inescrutables. No me cuentes como pecado esta oración mía; pero hágase tu santa voluntad. Amén.'),
    ],
    meta: traduccion(DIA, 'eslavo', 'San Leónidas de Óptina († 1841)'),
  },
];
