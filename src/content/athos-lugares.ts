/**
 * Lo que hay en la Montaña además de los veinte monasterios.
 *
 * Los doce sketes reconocidos por el Estatuto, cada uno con el monasterio del
 * que depende; los lugares que sirven para orientarse —la capital, el puerto,
 * la cumbre, el desierto del sur—; y los iconos de la Theotokos cuya fiesta
 * se celebra en la Montaña. Las coordenadas son las de Wikidata (CC0).
 *
 * Es un índice ligero, sin prosa larga: lo usan el mapa y el calendario de
 * fiestas, y no tiene por qué arrastrar los textos de los monasterios.
 */
import type { GeoPoint } from '@/types';

export interface Skete {
  id: string;
  name: string;
  greekName: string;
  /** El monasterio soberano del que depende. */
  monastery: string;
  /**
   * Cenobítico: un monasterio pequeño, con higúmeno y mesa común.
   * Idiorrítmico: una aldea de kalyvas con su iglesia central, el kyriakón.
   */
  kind: 'cenobitico' | 'idiorritmico';
  tradition: string;
  coords: GeoPoint;
  wikidata: string;
  note: string;
}

export const ATHOS_SKETES: Skete[] = [
  {
    id: 'santa-ana',
    name: 'Santa Ana',
    greekName: 'Σκήτη Αγίας Άννης',
    monastery: 'megisti-lavra',
    kind: 'idiorritmico',
    tradition: 'Griega',
    coords: { lat: 40.140277777, lon: 24.296944444 },
    wikidata: 'Q18210286',
    note: 'El más antiguo y el mayor de los sketes, colgado sobre el mar al pie del monte. Su kyriakón guarda el pie de santa Ana, y de él depende la Pequeña Santa Ana, donde vivió san José el Hesicasta.',
  },
  {
    id: 'kavsokalyvia',
    name: 'Kavsokalyvia',
    greekName: 'Σκήτη Καυσοκαλυβίων',
    monastery: 'megisti-lavra',
    kind: 'idiorritmico',
    tradition: 'Griega',
    coords: { lat: 40.1333, lon: 24.35 },
    wikidata: 'Q3192869',
    note: 'Dedicado a la Santísima Trinidad. Toma el nombre de san Máximo, que quemaba su choza cada vez que se mudaba: las chozas quemadas. Aquí tomó el hábito san Porfirio.',
  },
  {
    id: 'prodromu',
    name: 'Prodromu',
    greekName: 'Σκήτη Τιμίου Προδρόμου',
    monastery: 'megisti-lavra',
    kind: 'cenobitico',
    tradition: 'Rumana',
    coords: { lat: 40.143563888, lon: 24.383994444 },
    wikidata: 'Q2091460',
    note: 'El skete rumano, dedicado a san Juan Bautista, cerca del extremo sureste de la península. Lo levantaron en el siglo XIX monjes venidos de Moldavia.',
  },
  {
    id: 'san-demetrio-vatopedi',
    name: 'San Demetrio',
    greekName: 'Σκήτη Αγίου Δημητρίου',
    monastery: 'vatopedi',
    kind: 'idiorritmico',
    tradition: 'Griega',
    coords: { lat: 40.302222222, lon: 24.22 },
    wikidata: 'Q15262883',
    note: 'En el bosque, a poca distancia de Vatopedi: un grupo de kalyvas en torno a su kyriakón.',
  },
  {
    id: 'san-andres',
    name: 'San Andrés',
    greekName: 'Σκήτη Αγίου Ανδρέα',
    monastery: 'vatopedi',
    kind: 'cenobitico',
    tradition: 'Rusa en su origen; hoy griega',
    coords: { lat: 40.26215, lon: 24.2444 },
    wikidata: 'Q12884497',
    note: 'El Serái, a las puertas de Karyés. Fue el gran skete ruso de la Montaña, con una de las iglesias mayores de los Balcanes; se vació en el siglo XX, y hoy lo habitan monjes griegos de Vatopedi.',
  },
  {
    id: 'prodromu-iviron',
    name: 'San Juan Bautista de Ivirón',
    greekName: 'Σκήτη Τιμίου Προδρόμου Ιβήρων',
    monastery: 'iviron',
    kind: 'idiorritmico',
    tradition: 'Griega',
    coords: { lat: 40.23911111, lon: 24.27526389 },
    wikidata: 'Q15246370',
    note: 'Sobre la ladera, por encima de Ivirón: kalyvas dispersas alrededor de su kyriakón.',
  },
  {
    id: 'san-panteleimon-kutlumusiu',
    name: 'San Panteleimón de Kutlumusiu',
    greekName: 'Σκήτη Αγίου Παντελεήμονος',
    monastery: 'koutloumousiou',
    kind: 'idiorritmico',
    tradition: 'Griega',
    coords: { lat: 40.25333611, lon: 24.25861111 },
    wikidata: 'Q18210289',
    note: 'Junto a Karyés, en la vertiente que baja hacia Ivirón. No se confunde con el monasterio ruso del mismo nombre.',
  },
  {
    id: 'profeta-elias',
    name: 'Profeta Elías',
    greekName: 'Σκήτη Προφήτη Ηλία',
    monastery: 'pantokratoros',
    kind: 'cenobitico',
    tradition: 'Rusa y ucraniana en su origen; hoy griega',
    coords: { lat: 40.2811299, lon: 24.2525983 },
    wikidata: 'Q10999366',
    note: 'Nació de la celda donde vivió en el siglo XVIII san Paisio Velichkovski, y fue durante el XIX un skete de monjes rusos y ucranianos. Hoy lo habitan monjes griegos.',
  },
  {
    id: 'lakkoskiti',
    name: 'San Demetrio del Lakkos',
    greekName: 'Σκήτη Αγίου Δημητρίου του Λάκκου',
    monastery: 'agiou-pavlou',
    kind: 'idiorritmico',
    tradition: 'Rumana',
    coords: { lat: 40.19278333, lon: 24.31880556 },
    wikidata: 'Q6479725',
    note: 'La Lakkoskiti, en una hondonada boscosa del interior. El segundo skete rumano de la Montaña.',
  },
  {
    id: 'nueva-skete',
    name: 'Nueva Skete',
    greekName: 'Νέα Σκήτη',
    monastery: 'agiou-pavlou',
    kind: 'idiorritmico',
    tradition: 'Griega',
    coords: { lat: 40.14727778, lon: 24.28937222 },
    wikidata: 'Q18209497',
    note: 'Junto al mar, entre San Pablo y Santa Ana. Aquí murió en 1959 san José el Hesicasta, y de aquí salió en 1990 la comunidad que renovó Vatopedi.',
  },
  {
    id: 'anunciacion-xenofontos',
    name: 'Anunciación',
    greekName: 'Σκήτη Ευαγγελισμού της Θεοτόκου',
    monastery: 'xenophontos',
    kind: 'idiorritmico',
    tradition: 'Griega',
    coords: { lat: 40.25138333, lon: 24.19836944 },
    wikidata: 'Q18210295',
    note: 'En la ladera sobre Xenofontos, dedicado a la Anunciación de la Theotokos.',
  },
  {
    id: 'bogoroditsa',
    name: 'Bogoróditsa',
    greekName: 'Σκήτη Βογορόδιτσας',
    monastery: 'agiou-panteleimonos',
    kind: 'cenobitico',
    tradition: 'Rusa',
    coords: { lat: 40.291666666, lon: 24.238888888 },
    wikidata: 'Q18210292',
    note: 'Xylurgu, el skete de la Theotokos: el primer asentamiento de monjes rusos en la Montaña, documentado en el siglo XI.',
  },
];

export interface AthosPlace {
  id: string;
  name: string;
  note: string;
  coords: GeoPoint;
  wikidata: string;
  /** Fuera de la Montaña: Ouranúpoli es el último pueblo antes de la frontera. */
  outside?: boolean;
}

export const ATHOS_PLACES: AthosPlace[] = [
  {
    id: 'karyes',
    name: 'Karyés',
    note: 'La capital: la Sagrada Comunidad, el Protaton y el gobernador civil.',
    coords: { lat: 40.257398, lon: 24.245894 },
    wikidata: 'Q632870',
  },
  {
    id: 'dafni',
    name: 'Dafni',
    note: 'El puerto de la Montaña, adonde llega el barco de Ouranúpoli.',
    coords: { lat: 40.214079, lon: 24.221817 },
    wikidata: 'Q2453100',
  },
  {
    id: 'cumbre',
    name: 'Monte Athos',
    note: '2.033 metros. En la cumbre, la capilla de la Transfiguración.',
    coords: { lat: 40.158333333, lon: 24.327222222 },
    wikidata: 'Q130321',
  },
  {
    id: 'karoulia',
    name: 'Karoulia',
    note: 'Las ermitas colgadas sobre el acantilado del sur, adonde se baja el pan con una cuerda.',
    coords: { lat: 40.122625, lon: 24.29568333 },
    wikidata: 'Q3193578',
  },
  {
    id: 'ouranupoli',
    name: 'Ouranúpoli',
    note: 'El último pueblo antes de la frontera, de donde sale el barco a Dafni.',
    coords: { lat: 40.326944444444, lon: 23.981944444444 },
    wikidata: 'Q430886',
    outside: true,
  },
];

/**
 * Los iconos de la Theotokos que tienen fiesta en la Montaña.
 *
 * Sólo los que tienen fecha segura en los calendarios: los demás iconos
 * célebres están en el artículo y en la ficha de su monasterio. `day` es del
 * calendario juliano; `paschaOffset`, si la fiesta depende de la Pascua.
 */
export interface AthosIconFeast {
  id: string;
  name: string;
  monastery?: string;
  place: string;
  day?: string;
  paschaOffset?: number;
  note: string;
}

export const ATHOS_ICON_FEASTS: AthosIconFeast[] = [
  {
    id: 'axion-estin',
    name: 'Axion Estin, «Digno es»',
    place: 'Protaton, en Karyés',
    day: '06-11',
    note: 'La aparición del arcángel Gabriel, que según la tradición enseñó a un monje el himno «Digno es en verdad» ante este icono, en el siglo X.',
  },
  {
    id: 'portaitissa',
    name: 'Portaítissa',
    monastery: 'iviron',
    place: 'Ivirón',
    paschaOffset: 2,
    note: 'El martes de la Semana Luminosa, procesión hasta la orilla donde se recogió del mar.',
  },
  {
    id: 'trikherousa',
    name: 'Trikherousa, la de las tres manos',
    monastery: 'hilandar',
    place: 'Hilandar',
    day: '07-12',
    note: 'La mano de plata recuerda la de san Juan Damasceno, restituida tras orar ante este icono.',
  },
  {
    id: 'gorgoepikoos',
    name: 'Gorgoepíkoos, la que pronto escucha',
    monastery: 'docheiariou',
    place: 'Dojiaríu',
    day: '11-09',
    note: 'El icono de lo urgente, pintado en el muro junto al refectorio.',
  },
  {
    id: 'paramythia',
    name: 'Paramythía, la Consoladora',
    monastery: 'vatopedi',
    place: 'Vatopedi',
    day: '01-21',
    note: 'Según la tradición, advirtió al higúmeno de un ataque de piratas y volvió el rostro para hacerlo.',
  },
];

/**
 * Dónde va el rótulo de cada sitio en el mapa de la península.
 *
 * Los de la costa occidental van a la izquierda, sobre el golfo, y los de la
 * oriental a la derecha, sobre el Egeo. Los que quedan apretados se mueven
 * arriba o abajo; la prueba de los mapas comprueba que ninguno pise a otro.
 */
export const ATHOS_MAP_LABELS: Record<string, { side: 'derecha' | 'izquierda' | 'arriba' | 'abajo'; dy?: number }> = {
  'megisti-lavra': { side: 'derecha' },
  vatopedi: { side: 'derecha' },
  iviron: { side: 'derecha' },
  hilandar: { side: 'izquierda' },
  dionysiou: { side: 'izquierda' },
  koutloumousiou: { side: 'abajo', dy: 16 },
  pantokratoros: { side: 'derecha', dy: -6 },
  xiropotamou: { side: 'izquierda' },
  zographou: { side: 'izquierda' },
  docheiariou: { side: 'izquierda', dy: -4 },
  karakalou: { side: 'derecha', dy: 4 },
  filotheou: { side: 'derecha', dy: -4 },
  simonopetra: { side: 'izquierda' },
  'agiou-pavlou': { side: 'izquierda' },
  stavronikita: { side: 'derecha' },
  xenophontos: { side: 'izquierda', dy: 4 },
  'osiou-grigoriou': { side: 'izquierda' },
  esphigmenou: { side: 'derecha' },
  'agiou-panteleimonos': { side: 'izquierda' },
  konstamonitou: { side: 'izquierda' },
  karyes: { side: 'izquierda', dy: -12 },
  dafni: { side: 'izquierda' },
  cumbre: { side: 'derecha' },
  karoulia: { side: 'izquierda' },
  ouranupoli: { side: 'derecha' },
};
