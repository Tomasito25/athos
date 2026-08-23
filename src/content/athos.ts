/**
 * Monte Athos — la Montaña Santa.
 *
 * Los veinte monasterios soberanos, en el orden jerárquico fijado por el
 * Estatuto de la Comunidad Monástica. Las posiciones del mapa son esquemáticas:
 * sitúan cada monasterio en la costa que le corresponde y a lo largo de la
 * península, pero no son coordenadas topográficas.
 */
import type { AthosArticle, Monastery, SourceMeta, TextBlock } from '@/types';

const meta: SourceMeta = {
  source: 'Reseñas redactadas para ATHOS a partir de la historia documentada de la Comunidad Monástica del Monte Athos',
  tradition: 'Monacato athonita',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
};

interface MonasterySeed {
  id: string;
  name: string;
  greekName: string;
  rank: number;
  founded: string;
  tradition: string;
  dedication: string;
  side: 'este' | 'oeste' | 'sur';
  along: number;
  monks?: string;
  description: string;
  treasures?: string[];
}

const seeds: MonasterySeed[] = [
  { id: 'megisti-lavra', name: 'Gran Laura', greekName: 'Μεγίστη Λαύρα', rank: 1, founded: '963', tradition: 'Griega', dedication: 'Dormición de san Atanasio el Athonita (5 de julio)', side: 'sur', along: 0.95, description: 'El más antiguo y el primero en la jerarquía. Lo fundó san Atanasio el Athonita con el apoyo del emperador Nicéforo Focas, y su fundación marca el paso del eremitismo disperso a la vida cenobítica organizada en la Montaña. Es el único monasterio que nunca ha sufrido un incendio general.', treasures: ['Reliquias de san Atanasio', 'Biblioteca con más de dos mil manuscritos'] },
  { id: 'vatopedi', name: 'Vatopedi', greekName: 'Βατοπέδι', rank: 2, founded: 'c. 972-985', tradition: 'Griega', dedication: 'Anunciación de la Theotokos (25 de marzo)', side: 'este', along: 0.25, description: 'Segundo en la jerarquía y uno de los mayores. Fue durante siglos centro de estudio y copia de manuscritos, y allí vivió san Gregorio Palamás antes de retirarse a la ermita. Conserva varios de los iconos milagrosos más venerados de la Montaña.', treasures: ['Cíngulo de la Theotokos', 'Icono de la Panagía Vematarissa', 'Biblioteca de más de ocho mil volúmenes'] },
  { id: 'iviron', name: 'Ivirón', greekName: 'Ιβήρων', rank: 3, founded: 'c. 972-980', tradition: 'Griega (fundación georgiana)', dedication: 'Dormición de la Theotokos (15 de agosto)', side: 'este', along: 0.4, description: 'Fundado por monjes georgianos —de ahí su nombre, «de los iberos»—, fue durante siglos el vínculo entre el Athos y el Cáucaso. Alberga el icono de la Portaítissa, la Guardiana de la Puerta, uno de los más venerados del mundo ortodoxo.', treasures: ['Icono de la Panagía Portaítissa', 'Manuscritos georgianos'] },
  { id: 'hilandar', name: 'Hilandar', greekName: 'Χιλανδαρίου', rank: 4, founded: '1198', tradition: 'Serbia', dedication: 'Entrada de la Theotokos en el Templo (21 de noviembre)', side: 'este', along: 0.12, description: 'Restaurado por san Sava y su padre san Simeón Nemanja, es el monasterio serbio de la Montaña y cuna de la literatura y la identidad serbias medievales. Un incendio lo devastó en 2004 y ha sido reconstruido.', treasures: ['Icono de la Trikherousa, la Virgen de las tres manos', 'Vid de san Simeón'] },
  { id: 'dionysiou', name: 'Dionisiou', greekName: 'Διονυσίου', rank: 5, founded: '1375', tradition: 'Griega', dedication: 'Natividad de san Juan Bautista (24 de junio)', side: 'oeste', along: 0.85, description: 'Encaramado sobre un acantilado de la costa suroeste, es uno de los conjuntos más impresionantes del Athos. Sus frescos del refectorio, del siglo XVI, se cuentan entre los mejor conservados de la escuela cretense.', treasures: ['Icono de la Panagía del Saludo', 'Frescos de Tzortzis'] },
  { id: 'koutloumousiou', name: 'Kutlumusiu', greekName: 'Κουτλουμουσίου', rank: 6, founded: 'siglos XII-XIII', tradition: 'Griega', dedication: 'Transfiguración del Señor (6 de agosto)', side: 'este', along: 0.5, description: 'Situado junto a Karyés, la capital administrativa, lo que le da un papel singular en la vida de la Montaña. San Paisios vivió en él antes de trasladarse a su celda de Panagouda.' },
  { id: 'pantokratoros', name: 'Pantokrátoros', greekName: 'Παντοκράτορος', rank: 7, founded: '1363', tradition: 'Griega', dedication: 'Transfiguración del Señor (6 de agosto)', side: 'este', along: 0.35, description: 'Fundado por dos altos funcionarios bizantinos sobre una pequeña península rocosa. En su dependencia de Kapsokalyvia vivieron numerosos ascetas célebres.' },
  { id: 'xiropotamou', name: 'Xiropótamu', greekName: 'Ξηροποτάμου', rank: 8, founded: 'siglo X', tradition: 'Griega', dedication: 'Los Cuarenta Mártires de Sebaste (9 de marzo)', side: 'oeste', along: 0.45, description: 'Uno de los más antiguos de la Montaña. Conserva el fragmento más grande que se conoce de la Preciosa Cruz.', treasures: ['Fragmento de la Preciosa Cruz'] },
  { id: 'zographou', name: 'Zográfu', greekName: 'Ζωγράφου', rank: 9, founded: 'siglo X', tradition: 'Búlgara', dedication: 'San Jorge el Trofeóforo (23 de abril)', side: 'oeste', along: 0.3, description: 'El monasterio búlgaro de la Montaña. Su nombre, «del pintor», recuerda la tradición del icono de san Jorge que apareció pintado sin mano humana. Sus monjes fueron martirizados en 1276 por resistirse a la unión con Roma.' },
  { id: 'docheiariou', name: 'Dojiaríu', greekName: 'Δοχειαρίου', rank: 10, founded: 'siglo X', tradition: 'Griega', dedication: 'Arcángeles Miguel y Gabriel (8 de noviembre)', side: 'oeste', along: 0.38, description: 'Su nombre procede del monje encargado de la despensa de la Gran Laura, que lo fundó. Custodia el icono de la Gorgoepíkoos, «la que escucha pronto».', treasures: ['Icono de la Panagía Gorgoepíkoos'] },
  { id: 'karakalou', name: 'Karakalu', greekName: 'Καρακάλλου', rank: 11, founded: 'siglo XI', tradition: 'Griega', dedication: 'Santos Apóstoles Pedro y Pablo (29 de junio)', side: 'este', along: 0.6, description: 'Situado entre olivares en la vertiente oriental. Su torre del siglo XVI es una de las mejor conservadas del Athos.' },
  { id: 'filotheou', name: 'Filoteu', greekName: 'Φιλοθέου', rank: 12, founded: 'c. 990', tradition: 'Griega', dedication: 'Anunciación de la Theotokos (25 de marzo)', side: 'este', along: 0.62, description: 'De él salió san Cosme de Etolia para predicar por Grecia y Albania. En el siglo XX fue uno de los focos de la renovación cenobítica de la Montaña.' },
  { id: 'simonopetra', name: 'Simonopetra', greekName: 'Σίμωνος Πέτρα', rank: 13, founded: '1257', tradition: 'Griega', dedication: 'Natividad de Cristo (25 de diciembre)', side: 'oeste', along: 0.8, description: 'La imagen más reconocible del Athos: siete pisos de balcones de madera sobre una roca que cae a plomo trescientos metros sobre el mar. San Simón lo fundó tras ver una luz sobre el peñasco la noche de Navidad.' },
  { id: 'agiou-pavlou', name: 'San Pablo', greekName: 'Αγίου Παύλου', rank: 14, founded: 'siglo X', tradition: 'Griega', dedication: 'Encuentro del Señor en el Templo (2 de febrero)', side: 'oeste', along: 0.9, description: 'Al pie del monte, en un barranco por el que baja el torrente. Conserva parte de los dones de los Magos, llevados allí desde Constantinopla.', treasures: ['Dones de los Magos'] },
  { id: 'stavronikita', name: 'Stavronikita', greekName: 'Σταυρονικήτα', rank: 15, founded: '1541', tradition: 'Griega', dedication: 'San Nicolás (6 de diciembre)', side: 'este', along: 0.45, description: 'El más pequeño y el último de los veinte en fundarse. Sus frescos son obra de Teofanes el Cretense.', treasures: ['Icono en mosaico de san Nicolás Streidás'] },
  { id: 'xenophontos', name: 'Xenofontos', greekName: 'Ξενοφώντος', rank: 16, founded: 'siglos X-XI', tradition: 'Griega', dedication: 'San Jorge el Trofeóforo (23 de abril)', side: 'oeste', along: 0.35, description: 'A pie de playa en la costa occidental. Tiene dos katholikón, uno del siglo XVI y otro del XIX, caso único en la Montaña.' },
  { id: 'osiou-grigoriou', name: 'San Gregorio', greekName: 'Οσίου Γρηγορίου', rank: 17, founded: 'siglo XIV', tradition: 'Griega', dedication: 'San Nicolás (6 de diciembre)', side: 'oeste', along: 0.83, description: 'Fundado por san Gregorio el Sinaíta o por un discípulo suyo. Estrechamente ligado a la tradición hesicasta, hoy es uno de los monasterios más poblados.' },
  { id: 'esphigmenou', name: 'Esfigmenu', greekName: 'Εσφιγμένου', rank: 18, founded: 'siglo X', tradition: 'Griega', dedication: 'Ascensión del Señor', side: 'este', along: 0.08, description: 'En el extremo norte de la península, junto al mar. Cerca se encuentra la cueva donde vivió san Antonio de las Cuevas antes de llevar el monacato athonita a Kiev.' },
  { id: 'agiou-panteleimonos', name: 'San Panteleimón', greekName: 'Αγίου Παντελεήμονος', rank: 19, founded: 'siglo XI', tradition: 'Rusa', dedication: 'San Panteleimón (27 de julio)', side: 'oeste', along: 0.4, description: 'El monasterio ruso de la Montaña, llamado también Rossikón. A finales del siglo XIX llegó a albergar más de mil monjes. Allí vivió y murió san Silvano el Athonita.', treasures: ['Reliquias de san Silvano', 'Campana de trece toneladas'] },
  { id: 'konstamonitou', name: 'Konstamonitu', greekName: 'Κωνσταμονίτου', rank: 20, founded: 'siglo XI', tradition: 'Griega', dedication: 'San Esteban Protomártir (27 de diciembre)', side: 'oeste', along: 0.25, description: 'El más apartado y el más pobre de los veinte, escondido en un valle boscoso sin vistas al mar. Vive de la agricultura y de la limosna.' },
];

export const MONASTERIES: Monastery[] = seeds.map((s) => ({
  id: s.id,
  name: s.name,
  greekName: s.greekName,
  rank: s.rank,
  founded: s.founded,
  tradition: s.tradition,
  dedication: s.dedication,
  description: s.description,
  location: { side: s.side, along: s.along },
  monks: s.monks,
  treasures: s.treasures,
  status: 'complete',
  meta,
  searchText: `${s.name} ${s.greekName} ${s.tradition} ${s.dedication} ${s.description}`.toLowerCase(),
}));

const p = (content: string): TextBlock => ({ kind: 'text', content });
const h = (content: string): TextBlock => ({ kind: 'heading', content });

export const ATHOS_ARTICLES: AthosArticle[] = [
  {
    id: 'historia',
    title: 'Historia de la Montaña Santa',
    topic: 'historia',
    blocks: [
      p('La península de Athos aparece ya en Heródoto, que cuenta cómo Jerjes hizo excavar un canal en el istmo para evitar el naufragio que su flota había sufrido al doblar el cabo. La tradición monástica sitúa allí ermitaños desde los primeros siglos cristianos, aunque las primeras noticias firmes son del siglo IX.'),
      h('La fundación cenobítica'),
      p('En 963, san Atanasio el Athonita funda la Gran Laura con el apoyo del emperador Nicéforo Focas. La novedad no fue la presencia de monjes, sino la organización: una comunidad con regla, refectorio común y oficio coral, frente a la dispersión de los eremitas. El modelo se extendió con rapidez.'),
      h('El Athos multinacional'),
      p('A partir del siglo XI llegan georgianos, rusos, serbios y búlgaros. Ivirón nace de una fundación georgiana; Hilandar es refundado por san Sava de Serbia en 1198; Zográfu se convierte en el monasterio búlgaro; el Rossikón, en el ruso. La Montaña es desde entonces el único lugar donde toda la ortodoxia convive en un mismo territorio.'),
      h('Decadencias y renacimientos'),
      p('Tras la caída de Constantinopla en 1453, los monasterios sobrevivieron pagando tributo al sultán. El siglo XVIII trajo el movimiento kollyvadista y la publicación de la Filocalia, que reavivó la oración hesicasta en todo el mundo ortodoxo. El siglo XX empezó con un declive demográfico severo —de casi ocho mil monjes en 1900 a poco más de mil en 1970— y se cerró con una recuperación inesperada: monjes jóvenes y con estudios repoblaron los monasterios idiorrítmicos, que volvieron uno tras otro a la vida cenobítica.'),
      h('Hoy'),
      p('El Monte Athos es una región autónoma dentro del Estado griego, bajo la jurisdicción espiritual del Patriarcado Ecuménico. Los veinte monasterios soberanos se gobiernan por la Sagrada Comunidad, con sede en Karyés. Rige el ávaton, la prohibición de acceso a las mujeres, en vigor desde hace más de mil años.'),
    ],
    status: 'complete',
    meta,
    searchText: 'historia monte athos atanasio athonita gran laura filocalia karyes avaton'.toLowerCase(),
  },
  {
    id: 'geografia',
    title: 'Geografía y vida cotidiana',
    topic: 'geografia',
    blocks: [
      p('El Athos es la más oriental de las tres penínsulas de Calcídica: unos cincuenta kilómetros de largo por entre siete y doce de ancho, que terminan en un monte de 2.033 metros que cae casi a pico sobre el mar Egeo.'),
      h('Los veinte y los demás'),
      p('Además de los veinte monasterios soberanos, la Montaña alberga doce sketes —comunidades dependientes—, celdas, kalyves, kathismata y ermitas. En el extremo sur, en los acantilados de Karoulia, viven todavía anacoretas casi inaccesibles.'),
      h('El tiempo bizantino'),
      p('Salvo en Ivirón, el día no empieza a medianoche sino a la puesta de sol, cuando el reloj se pone a las doce. Como el ocaso cambia a lo largo del año, los relojes se ajustan cada pocos días. El calendario es el juliano, trece días por detrás del civil.'),
      h('La jornada'),
      p('Los oficios ocupan entre seis y ocho horas diarias, repartidas de manera que el grueso caiga en la noche: se duerme en dos tramos, con las vigilias en medio. El resto del tiempo se dedica al diakonima, el trabajo asignado a cada monje, y a la oración personal.'),
    ],
    status: 'complete',
    meta,
    searchText: 'geografia athos karyes esquitas ermitas tiempo bizantino calendario juliano'.toLowerCase(),
  },
  {
    id: 'hesicasmo',
    title: 'El hesicasmo',
    topic: 'hesicasmo',
    blocks: [
      p('Hesychía significa quietud: no la ausencia de ruido, sino un estado del alma en que cesa la agitación de los pensamientos y la atención puede volverse hacia Dios.'),
      h('La oración del corazón'),
      p('El método consiste en repetir la oración de Jesús —«Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador»— hasta que deja de ser un ejercicio de la boca o de la mente y pasa al corazón, donde continúa por sí sola. La tradición insiste en que no es una técnica, sino un modo de arrepentimiento, y en que sin obediencia y sin guía puede volverse peligrosa.'),
      h('La controversia del siglo XIV'),
      p('Barlaam de Calabria ridiculizó a los monjes que decían ver la luz increada. San Gregorio Palamás respondió distinguiendo entre la esencia de Dios, absolutamente inaccesible, y sus energías increadas, en las que la criatura participa de verdad. Los concilios de Constantinopla de 1341, 1347 y 1351 le dieron la razón, y el segundo domingo de Cuaresma quedó dedicado a su memoria.'),
      h('La Filocalia'),
      p('En 1782 san Nicodemo el Hagiorita y san Macario de Corinto publicaron en Venecia una antología de textos sobre la oración que abarcaba mil años. Traducida al eslavo por san Paisios Velichkovski y al ruso por san Teófano el Recluso, la Filocalia llevó el hesicasmo athonita mucho más allá de los monasterios.'),
    ],
    status: 'complete',
    meta,
    searchText: 'hesicasmo oracion del corazon jesus palamas barlaam energias increadas filocalia nicodemo'.toLowerCase(),
  },
  {
    id: 'monacato',
    title: 'El monacato athonita',
    topic: 'monacato',
    blocks: [
      p('Se entra en la Montaña como dokimos, novicio, y se permanece así al menos tres años. Después viene la tonsura, en dos o tres grados según la tradición del monasterio: rasóforo, estavróforo y, finalmente, el gran hábito o gran esquema.'),
      h('Los tres votos'),
      p('Obediencia, castidad y pobreza. De los tres, la tradición athonita subraya la obediencia: no como sumisión ciega, sino como el modo concreto de renunciar a la propia voluntad, que es la raíz de todo lo demás.'),
      h('Cenobitismo e idiorritmia'),
      p('En el monasterio cenobítico todo es común: la mesa, el horario, la bolsa. En el idiorrítmico, cada monje administraba su tiempo y sus bienes. Durante siglos convivieron ambas formas; desde 1992 los veinte monasterios son cenobíticos.'),
      h('El anciano'),
      p('La figura del gerondas o starets es central: un monje experimentado a quien se abren los pensamientos. La relación no es de dirección espiritual entendida como consejo ocasional, sino de transparencia continua.'),
    ],
    status: 'complete',
    meta,
    searchText: 'monacato novicio tonsura rasoforo esquema obediencia cenobitico idiorritmico gerondas starets'.toLowerCase(),
  },
  {
    id: 'ancianos',
    title: 'Ancianos del Athos',
    topic: 'ancianos',
    blocks: [
      p('El siglo XX dejó en la Montaña una generación de ancianos cuya influencia desbordó con mucho los muros de los monasterios.'),
      h('San Silvano el Athonita (1866-1938)'),
      p('Campesino ruso llegado al Rossikón en 1892. Tras años de lucha con los pensamientos recibió la palabra: «Ten tu mente en el infierno y no desesperes». Sus escritos, publicados por su discípulo el archimandrita Sofronio Sájarov, giran en torno a la oración por el mundo entero.'),
      h('San Paisios del Monte Athos (1924-1994)'),
      p('De Kutlumusiu y luego de la celda de Panagouda. Recibía cada día a decenas de visitantes y respondía con un humor seco y una franqueza desconcertante. Fue canonizado en 2015.'),
      h('San Porfirio Kavsokalivita (1906-1991)'),
      p('Entró en el Athos a los doce años. Capellán durante treinta años de una policlínica de Atenas, insistía en que la vida cristiana no se sostiene sobre el miedo, sino sobre el amor y la belleza.'),
      h('San José el Hesicasta (1897-1959)'),
      p('Vivió en cuevas de Pequeña Santa Ana practicando la oración del corazón con extremo rigor. Su descendencia espiritual repobló varios monasterios de la Montaña en la segunda mitad del siglo XX.'),
    ],
    status: 'complete',
    meta,
    searchText: 'ancianos silvano paisios porfirio jose hesicasta sofronio panagouda'.toLowerCase(),
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura e iconografía',
    topic: 'arquitectura',
    blocks: [
      p('El monasterio athonita es un recinto cerrado, casi una fortaleza, con una sola puerta que se cierra al ponerse el sol. En el centro del patio está el katholikón, la iglesia principal.'),
      h('El katholikón'),
      p('Sigue el plano cruciforme bizantino con una particularidad athonita: los choroí, dos ábsides laterales donde se sitúan los coros. Delante se abre el lité, y ante él el exonártex.'),
      h('La fiala y el refectorio'),
      p('Frente a la iglesia se levanta la fiala, la fuente cubierta donde se hace la bendición de las aguas. El refectorio, casi siempre enfrentado al katholikón, está cubierto de frescos: se come mientras un monje lee en voz alta.'),
      h('Las escuelas de pintura'),
      p('En los frescos de la Montaña se distinguen sobre todo dos manos: la escuela macedonia, más dramática y monumental, representada por Manuel Panselinos en el Protaton de Karyés, y la escuela cretense de Teofanes, más contenida y refinada, que dejó obra en Gran Laura y Stavronikita.'),
    ],
    status: 'complete',
    meta,
    searchText: 'arquitectura katholikon fiala refectorio frescos panselinos teofanes cretense macedonia'.toLowerCase(),
  },
];

export const ATHOS_INTRO =
  'Ὄρος Ἄθως, el Jardín de la Theotokos: una península de la Calcídica griega donde desde ' +
  'hace más de mil años sólo se vive para orar.';
