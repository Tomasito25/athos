/**
 * Los grandes monasterios del mundo ortodoxo, fuera de la Santa Montaña.
 *
 * Diecinueve casas del Sinaí a las Solovkí que cuentan la historia del
 * monacato ortodoxo: dónde nació la regla de los oficios, adónde fue el
 * Athos a sembrar, dónde se hicieron mártires los monjes del siglo XX. Sólo
 * monasterios de la Iglesia ortodoxa: los coptos, armenios o etíopes son de
 * las Iglesias orientales que no aceptaron Calcedonia, y merecen su propia
 * sección antes que una mezcla.
 *
 * Las coordenadas son las de Wikidata (CC0). La prosa está redactada para
 * ATHOS; no es texto litúrgico.
 */
import type { GeoPoint, SourceMeta } from '@/types';

export interface WorldMonastery {
  id: string;
  name: string;
  /** El nombre en la lengua del lugar, con su código de idioma. */
  localName: string;
  lang: string;
  country: string;
  /** La Iglesia de la que depende. */
  church: string;
  founded: string;
  coords: GeoPoint;
  wikidata: string;
  /** El año en que la UNESCO lo declaró patrimonio, si lo es. */
  unesco?: number;
  /** Monasterio de monjas. */
  women?: boolean;
  description: string;
  today: string;
  saints: string[];
  /** Dónde va el rótulo en el mapa. */
  label: { side: 'derecha' | 'izquierda' | 'arriba' | 'abajo'; dy?: number };
}

export const WORLD_MONASTERIES_META: SourceMeta = {
  source:
    'Reseñas redactadas para ATHOS a partir de la historia documentada de cada monasterio; coordenadas de Wikidata (CC0)',
  tradition: 'Monacato ortodoxo',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-11-01',
  notes:
    'Lo que se dice de la situación actual —comunidades, pleitos, guerras— es de 2026 y puede cambiar. Ninguna de las casas que se describen es de las Iglesias no calcedonianas.',
};

export const WORLD_MONASTERIES: WorldMonastery[] = [
  {
    id: 'sinai',
    name: 'Santa Catalina del Sinaí',
    localName: 'Ἱερὰ Μονὴ Ἁγίας Αἰκατερίνης',
    lang: 'el',
    country: 'Egipto',
    church: 'Iglesia autónoma del Sinaí',
    founded: '548-565',
    coords: { lat: 28.555830555, lon: 33.975561111 },
    wikidata: 'Q185362',
    unesco: 2002,
    description:
      'Al pie del monte Sinaí, donde la tradición sitúa la zarza ardiente. Lo amuralló el emperador Justiniano entre 548 y 565, y desde entonces no ha dejado de habitarse: es uno de los monasterios cristianos más antiguos en uso continuo.',
    today:
      'Su biblioteca es de las más antiguas que siguen abiertas, y guarda los iconos más antiguos que se conservan —el Cristo Pantocrátor y el san Pedro, pintados a la encáustica en el siglo VI—, que se salvaron de la iconoclasia porque el Sinaí quedaba ya fuera del Imperio. Su higúmeno es a la vez arzobispo del Sinaí, y la pequeña Iglesia que preside es autónoma.',
    saints: [
      'Santa Catalina de Alejandría, cuyas reliquias guarda',
      'San Juan Clímaco, higúmeno, autor de la Escala',
      'San Gregorio el Sinaíta, que se formó aquí',
    ],
    label: { side: 'derecha' },
  },
  {
    id: 'mar-saba',
    name: 'Mar Saba, la Laura de San Sabas',
    localName: 'Λαύρα τοῦ Ἁγίου Σάββα',
    lang: 'el',
    country: 'Palestina',
    church: 'Patriarcado de Jerusalén',
    founded: '483',
    coords: { lat: 31.705, lon: 35.331 },
    wikidata: 'Q1059946',
    description:
      'Colgado en el barranco del Cedrón, en el desierto de Judea. Lo fundó san Sabas el Santificado en 483 y fue el gran monasterio de Palestina: del orden de sus oficios nació el Típico de Jerusalén, el que regula todavía hoy la liturgia bizantina.',
    today:
      'Sigue habitado por una pequeña comunidad que guarda el ávaton: las mujeres no entran, y ven el monasterio desde la Torre de las Mujeres, enfrente. Las reliquias de san Sabas, que los cruzados se habían llevado a Venecia, volvieron en 1965.',
    saints: [
      'San Sabas el Santificado, fundador',
      'San Juan Damasceno, que escribió aquí sus himnos y su defensa de los iconos',
      'San Cosme el Melodista',
    ],
    label: { side: 'izquierda' },
  },
  {
    id: 'patmos',
    name: 'San Juan el Teólogo de Patmos',
    localName: 'Μονὴ Ἁγίου Ἰωάννου τοῦ Θεολόγου',
    lang: 'el',
    country: 'Grecia',
    church: 'Patriarcado Ecuménico',
    founded: '1088',
    coords: { lat: 37.309188888, lon: 26.548052777 },
    wikidata: 'Q1982506',
    unesco: 1999,
    description:
      'En lo alto de la isla donde san Juan escribió el Apocalipsis. Lo fundó en 1088 san Cristódulo, con una crisóbula del emperador Alejo I Comneno que le daba la isla entera, y sus muros de fortaleza dominan todavía el puerto.',
    today:
      'Depende directamente del Patriarcado Ecuménico. A media ladera está la cueva del Apocalipsis, donde según la tradición el apóstol oyó la voz y su discípulo Prócoro escribió lo que dictaba. La biblioteca guarda hojas de un Evangelio de san Marcos en pergamino púrpura del siglo VI.',
    saints: ['San Juan el Teólogo, que tuvo aquí la revelación', 'San Cristódulo de Patmos, fundador'],
    label: { side: 'derecha', dy: 6 },
  },
  {
    id: 'meteora',
    name: 'Metéora',
    localName: 'Μετέωρα',
    lang: 'el',
    country: 'Grecia',
    church: 'Iglesia de Grecia',
    founded: 'siglo XIV',
    coords: { lat: 39.726333, lon: 21.626287 },
    wikidata: 'Q664858',
    unesco: 1988,
    description:
      'Seis monasterios en lo alto de pilares de roca sobre la llanura de Tesalia. Había ermitaños en las grietas desde el siglo XI; en el XIV san Atanasio el Meteorita fundó el Gran Meteoro, y a los monasterios sólo se subía en redes izadas con cuerda o por escalas de mano.',
    today:
      'Siguen habitados seis de los veinticuatro que llegó a haber, cuatro de monjes y dos de monjas; hoy se sube por escaleras talladas en la roca. De Metéora salió en 1973 la comunidad que renovó Simonopetra, en el Athos.',
    saints: ['San Atanasio el Meteorita, fundador del Gran Meteoro', 'San Joasaf el Meteorita, su discípulo, príncipe serbio'],
    label: { side: 'izquierda' },
  },
  {
    id: 'hosios-lukas',
    name: 'Hosios Lukás',
    localName: 'Ὅσιος Λουκᾶς',
    lang: 'el',
    country: 'Grecia',
    church: 'Iglesia de Grecia',
    founded: 'siglo X',
    coords: { lat: 38.395136, lon: 22.746318 },
    wikidata: 'Q844841',
    unesco: 1990,
    description:
      'En una ladera del Helicón, junto a la tumba de san Lucas el Joven, ermitaño muerto en 953. Su katholikón, de comienzos del siglo XI, guarda uno de los conjuntos de mosaicos bizantinos más completos que existen.',
    today:
      'Lo habita una comunidad pequeña. Junto a la iglesia mayor sigue la de la Theotokos, algo anterior, y en la cripta, la tumba del santo.',
    saints: ['San Lucas el Joven, el Taumaturgo'],
    label: { side: 'izquierda' },
  },
  {
    id: 'kykkos',
    name: 'Kykkos',
    localName: 'Μονὴ Κύκκου',
    lang: 'el',
    country: 'Chipre',
    church: 'Iglesia de Chipre',
    founded: 'c. 1100',
    coords: { lat: 34.983866666, lon: 32.741075 },
    wikidata: 'Q225373',
    description:
      'En las montañas de Troodos. Lo fundó hacia 1100 el emperador Alejo I Comneno para guardar un icono de la Theotokos que la tradición atribuye a san Lucas, y que desde hace siglos se venera cubierto: nadie lo mira directamente.',
    today:
      'Es el monasterio más rico y más visitado de Chipre. En él fue novicio el arzobispo Macario III, el primer presidente de la isla, enterrado en la cumbre cercana de Throni.',
    saints: ['San Lucas Evangelista, a quien la tradición atribuye su icono'],
    label: { side: 'izquierda' },
  },
  {
    id: 'rila',
    name: 'Rila',
    localName: 'Рилски манастир',
    lang: 'bg',
    country: 'Bulgaria',
    church: 'Iglesia ortodoxa búlgara',
    founded: 'siglo X',
    coords: { lat: 42.134379, lon: 23.339551 },
    wikidata: 'Q207945',
    unesco: 1983,
    description:
      'En los montes de Rila, donde se retiró en el siglo X san Juan de Rila, el ermitaño a quien los búlgaros tienen por patrón. Durante la dominación otomana fue el refugio de la lengua y de la cultura búlgaras.',
    today:
      'Lo que se ve, con sus galerías de arcos a franjas y la iglesia pintada por fuera, es del siglo XIX, levantado tras el incendio de 1833; de antes queda la torre de Hrelio, de 1335. Guarda las reliquias de su fundador.',
    saints: ['San Juan de Rila, fundador'],
    label: { side: 'derecha' },
  },
  {
    id: 'studenica',
    name: 'Studenica',
    localName: 'Манастир Студеница',
    lang: 'sr',
    country: 'Serbia',
    church: 'Iglesia ortodoxa serbia',
    founded: 'c. 1190',
    coords: { lat: 43.486722222, lon: 20.531638888 },
    wikidata: 'Q143042',
    unesco: 1986,
    description:
      'La fundación de Esteban Nemanja, que lo levantó hacia 1190 antes de retirarse a la Montaña como el monje Simeón. Es la madre de los monasterios serbios: san Sava, su hijo, fue su higúmeno, le dio su Típico y trajo aquí desde Hilandar el cuerpo de su padre.',
    today:
      'Su iglesia de la Theotokos, de mármol blanco, guarda frescos de 1209 entre los más bellos del arte bizantino, con una Crucifixión famosa, y la tumba de san Simeón. Sigue habitado por una comunidad de monjes.',
    saints: ['San Simeón el Mirobleta, Esteban Nemanja, fundador', 'San Sava de Serbia, su higúmeno'],
    label: { side: 'derecha', dy: -4 },
  },
  {
    id: 'decani',
    name: 'Visoki Dečani',
    localName: 'Манастир Високи Дечани',
    lang: 'sr',
    country: 'Kosovo',
    church: 'Iglesia ortodoxa serbia',
    founded: '1327-1335',
    coords: { lat: 42.546944444, lon: 20.266388888 },
    wikidata: 'Q849517',
    unesco: 2004,
    description:
      'Lo mandó levantar el rey Esteban Uroš III, san Esteban de Dečani, entre 1327 y 1335, y es la mayor iglesia medieval de los Balcanes, con más de mil escenas pintadas en sus muros.',
    today:
      'La comunidad sigue en el monasterio desde la guerra de 1999, protegida durante años por las tropas internacionales, y la UNESCO lo tiene en su lista de patrimonio en peligro. Guarda las reliquias de su fundador.',
    saints: ['San Esteban de Dečani, rey, fundador'],
    label: { side: 'izquierda' },
  },
  {
    id: 'putna',
    name: 'Putna',
    localName: 'Mănăstirea Putna',
    lang: 'ro',
    country: 'Rumanía',
    church: 'Iglesia ortodoxa rumana',
    founded: '1466',
    coords: { lat: 47.866, lon: 25.59652778 },
    wikidata: 'Q1088525',
    description:
      'La fundó en 1466 Esteban el Grande, príncipe de Moldavia, que está enterrado en ella; fue la primera de las grandes fundaciones con que sembró el norte de Moldavia durante su reinado.',
    today:
      'Es lugar de peregrinación nacional: Esteban, que defendió Moldavia de los otomanos durante casi medio siglo, fue canonizado en 1992. Muy cerca están las iglesias de Bucovina pintadas por fuera, como Voroneț.',
    saints: ['San Esteban el Grande, príncipe de Moldavia, fundador'],
    label: { side: 'izquierda' },
  },
  {
    id: 'pecherska',
    name: 'La Laura de las Cuevas de Kiev',
    localName: 'Києво-Печерська лавра',
    lang: 'uk',
    country: 'Ucrania',
    church: 'Disputada entre la Iglesia ortodoxa ucraniana y la Iglesia ortodoxa de Ucrania',
    founded: 'c. 1051',
    coords: { lat: 50.434148, lon: 30.558323 },
    wikidata: 'Q242711',
    unesco: 1990,
    description:
      'La fundaron hacia 1051 san Antonio, que había sido monje en el Athos, y san Teodosio, en las cuevas de la orilla del Dniéper. Es la cuna del monacato de la Rus: de sus monjes salieron obispos, cronistas y santos para toda la Iglesia rusa.',
    today:
      'En sus galerías subterráneas reposan los cuerpos de más de cien santos. Desde 2023, el Estado ucraniano, dueño del recinto, ha ido retirando de él a la Iglesia ortodoxa ucraniana, de tradición moscovita, y ha abierto sus iglesias principales a la Iglesia ortodoxa de Ucrania; el conflicto entre las dos sigue abierto.',
    saints: ['San Antonio de las Cuevas, que vino del Athos', 'San Teodosio de las Cuevas', 'San Néstor el Cronista'],
    label: { side: 'derecha' },
  },
  {
    id: 'pochaiv',
    name: 'Pocháiv',
    localName: 'Почаївська лавра',
    lang: 'uk',
    country: 'Ucrania',
    church: 'Iglesia ortodoxa ucraniana',
    founded: 'siglo XVI (la tradición, 1240)',
    coords: { lat: 50.005, lon: 25.506666666 },
    wikidata: 'Q1595364',
    description:
      'Sobre una colina de Volinia. La tradición cuenta que en 1240 la Theotokos se apareció a unos monjes sobre una roca, donde dejó la huella de su pie, de la que mana una fuente que todavía se venera.',
    today:
      'Guarda el icono de Pocháiv, regalado en 1559 por una noble del lugar, y las reliquias de san Job de Pocháiv, el higúmeno que en el siglo XVII lo defendió de la unión con Roma. Es una de las grandes peregrinaciones de Ucrania.',
    saints: ['San Job de Pocháiv, higúmeno'],
    label: { side: 'izquierda' },
  },
  {
    id: 'san-sergio',
    name: 'La Laura de la Trinidad y San Sergio',
    localName: 'Свято-Троицкая Сергиева лавра',
    lang: 'ru',
    country: 'Rusia',
    church: 'Iglesia ortodoxa rusa',
    founded: 'c. 1337',
    coords: { lat: 56.31035, lon: 38.13065 },
    wikidata: 'Q211962',
    unesco: 1993,
    description:
      'La fundó hacia 1337 san Sergio de Rádonezh, en el bosque, con su hermano: una ermita de madera de la que nació medio monacato ruso. Para su iglesia de la Trinidad pintó Andréi Rubliov el icono de la Trinidad.',
    today:
      'Es el corazón de la Iglesia rusa: en ella están la Academia Teológica de Moscú y la tumba de san Sergio, que recibe peregrinos cada día. La ciudad que creció a su alrededor se llama Sérguiev Posad.',
    saints: ['San Sergio de Rádonezh, fundador', 'San Andréi Rubliov, iconógrafo'],
    label: { side: 'derecha' },
  },
  {
    id: 'optina',
    name: 'Óptina',
    localName: 'Оптина пустынь',
    lang: 'ru',
    country: 'Rusia',
    church: 'Iglesia ortodoxa rusa',
    founded: 'siglo XV',
    coords: { lat: 54.053333333, lon: 35.831944444 },
    wikidata: 'Q1225920',
    description:
      'Un monasterio en el bosque, junto al río Zhizdra, que en el siglo XIX se convirtió en la casa de los startsi: Leónidas, Macario, Ambrosio y sus sucesores recibían a quien llegaba. Fueron a verlos Gógol, Dostoievski y Tolstói, y el starets Zósima de Los hermanos Karamázov sale de allí.',
    today:
      'Cerrado en 1923, volvió a la Iglesia en 1987 y es otra vez uno de los grandes monasterios rusos. En la Pascua de 1993 fueron asesinados tres de sus monjes, que reposan en él.',
    saints: ['San Leónidas, san Macario y san Ambrosio de Óptina', 'Los santos ancianos de Óptina, canonizados en 2000'],
    label: { side: 'izquierda' },
  },
  {
    id: 'diveyevo',
    name: 'Diveyevo',
    localName: 'Серафимо-Дивеевский монастырь',
    lang: 'ru',
    country: 'Rusia',
    church: 'Iglesia ortodoxa rusa',
    founded: 'c. 1780',
    coords: { lat: 55.040519, lon: 43.246563 },
    wikidata: 'Q1974611',
    women: true,
    description:
      'Un monasterio de monjas de finales del siglo XVIII, que san Serafín de Sárov tomó bajo su cuidado y llamó la cuarta herencia de la Theotokos. Las monjas recorren cada día la Kanavka, el surco que él mandó cavar y por el que, según su palabra, había pasado la Virgen.',
    today:
      'Desde 1991 guarda las reliquias de san Serafín, halladas aquel año en un museo de Leningrado, y es una de las mayores peregrinaciones de Rusia.',
    saints: ['San Serafín de Sárov, su padre espiritual'],
    label: { side: 'izquierda', dy: 8 },
  },
  {
    id: 'valaam',
    name: 'Valaam',
    localName: 'Валаамский монастырь',
    lang: 'ru',
    country: 'Rusia',
    church: 'Iglesia ortodoxa rusa',
    founded: 'siglo XIV',
    coords: { lat: 61.388744, lon: 30.944229 },
    wikidata: 'Q1421396',
    description:
      'En un archipiélago del lago Ládoga. La tradición atribuye su fundación a los santos Sergio y Germán; en el siglo XIX fue un gran centro monástico, del que salieron los misioneros que llevaron la ortodoxia a Alaska, entre ellos san Germán.',
    today:
      'En 1940, cuando la isla pasó de Finlandia a la Unión Soviética, la comunidad se fue a Finlandia y fundó el Nuevo Valaam; el antiguo quedó vacío hasta 1989. Hoy vuelve a tener comunidad numerosa y sketes repartidos por las islas.',
    saints: ['Los santos Sergio y Germán de Valaam, fundadores', 'San Germán de Alaska, que salió de aquí'],
    label: { side: 'izquierda' },
  },
  {
    id: 'solovki',
    name: 'Solovkí',
    localName: 'Соловецкий монастырь',
    lang: 'ru',
    country: 'Rusia',
    church: 'Iglesia ortodoxa rusa',
    founded: 'c. 1436',
    coords: { lat: 65.024444444, lon: 35.710555555 },
    wikidata: 'Q1140434',
    unesco: 1992,
    description:
      'En unas islas del mar Blanco, junto al círculo polar. Lo fundaron en el siglo XV los santos Zósimo, Sabacio y Germán, y fue a la vez monasterio y fortaleza de la frontera del norte.',
    today:
      'En 1923 los soviéticos hicieron de él el primer gran campo de trabajos forzados, el origen del gulag: allí murieron miles de presos, entre ellos obispos, sacerdotes y fieles que hoy se veneran entre los nuevos mártires. Desde 1990 vuelve a tener monjes.',
    saints: ['Los santos Zósimo, Sabacio y Germán de Solovkí, fundadores', 'Los nuevos mártires de Solovkí'],
    label: { side: 'izquierda' },
  },
  {
    id: 'gelati',
    name: 'Gelati',
    localName: 'გელათის მონასტერი',
    lang: 'ka',
    country: 'Georgia',
    church: 'Iglesia ortodoxa georgiana',
    founded: '1106',
    coords: { lat: 42.294722222, lon: 42.768055555 },
    wikidata: 'Q679979',
    unesco: 1994,
    description:
      'Lo fundó en 1106 el rey David IV el Constructor, junto a Kutaisi, como monasterio y como academia: fue el gran centro de estudio de la Georgia medieval.',
    today:
      'El rey está enterrado bajo la puerta de entrada, para que lo pisaran quienes entraban, como pidió. El ábside conserva un mosaico de la Theotokos del siglo XII, y el monasterio sigue habitado.',
    saints: ['San David el Constructor, rey de Georgia, fundador'],
    label: { side: 'izquierda' },
  },
  {
    id: 'saydnaya',
    name: 'Nuestra Señora de Saydnaya',
    localName: 'دير سيدة صيدنايا',
    lang: 'ar',
    country: 'Siria',
    church: 'Patriarcado de Antioquía',
    founded: 'siglo VI',
    coords: { lat: 33.699444444, lon: 36.375 },
    wikidata: 'Q3320189',
    women: true,
    description:
      'Un convento de monjas sobre una roca, al norte de Damasco. La tradición cuenta que lo fundó el emperador Justiniano en 547, tras ver allí a la Theotokos, y guarda un icono suyo que se atribuye a san Lucas, la Shaghura, «la ilustre».',
    today:
      'Es una de las peregrinaciones más antiguas de Oriente, adonde acuden también musulmanes, y siguió abierto durante la guerra de Siria.',
    saints: ['San Lucas Evangelista, a quien la tradición atribuye su icono'],
    label: { side: 'derecha' },
  },
];

/** El Athos, para el mapa de conjunto: enlaza con su sección. */
export const ATHOS_ON_WORLD_MAP = {
  id: 'athos',
  name: 'Monte Athos',
  coords: { lat: 40.157, lon: 24.326 },
  label: { side: 'derecha' as const },
};
