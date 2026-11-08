/**
 * Los mapas de la Biblia: Tierra Santa, los viajes de san Pablo, y las siete
 * Iglesias del Apocalipsis con los concilios.
 *
 * Cada lugar va en su longitud y su latitud y con los pasajes que ocurren en
 * él, que la pantalla convierte en enlaces a la Biblia. Donde el sitio exacto
 * se discute —Emaús, Betsaida, el monte de la Transfiguración— la nota lo
 * dice y el mapa pone el que señala la tradición.
 *
 * Las coordenadas son las del yacimiento o de la ciudad actual que lo ocupa,
 * redondeadas a la centésima de grado (un kilómetro): a la escala de estos
 * mapas no se distingue más.
 */
import type { Aspecto, Encuadre, Lado } from '@/lib/mapa';

export interface PlaceBase {
  id: string;
  name: string;
  lon: number;
  lat: number;
  /** El rótulo, si el nombre no cabe. */
  label?: string;
  side?: Lado;
  dy?: number;
}

export interface BiblePlace extends PlaceBase {
  note: string;
  /** Los pasajes, como se citan: «Lc 2, 1-20». */
  passages: string[];
}

export interface WaterName {
  id: string;
  lon: number;
  lat: number;
  label: string;
}

/* ============================================================
   Tierra Santa
   ============================================================ */

export const HOLY_LAND: BiblePlace[] = [
  {
    id: 'tiro',
    name: 'Tiro',
    lon: 35.2,
    lat: 33.27,
    note: 'En la región de Tiro y Sidón, Cristo cura a la hija de una mujer sirofenicia por la fe de su madre. San Pablo pasó aquí una semana al volver de su tercer viaje.',
    passages: ['Mc 7, 24-30', 'Hch 21, 3-6'],
  },
  {
    id: 'cesarea-filipo',
    name: 'Cesarea de Filipo',
    label: 'Cesarea\nde Filipo',
    lon: 35.69,
    lat: 33.25,
    side: 'izquierda',
    note: 'Al pie del Hermón, junto a una de las fuentes del Jordán. Aquí confiesa Pedro: «Tú eres el Cristo, el Hijo de Dios vivo».',
    passages: ['Mt 16, 13-20', 'Mc 8, 27-30'],
  },
  {
    id: 'cafarnaum',
    name: 'Cafarnaúm',
    lon: 35.58,
    lat: 32.88,
    side: 'izquierda',
    note: 'La ciudad de Cristo mientras predicaba en Galilea, y la de Pedro y Andrés. Quedan las ruinas de la sinagoga, levantada sobre la de su tiempo, y la casa de Pedro, bajo una iglesia. Muy cerca, el monte de las Bienaventuranzas y Tabgha, donde la tradición pone la multiplicación de los panes.',
    passages: ['Mt 4, 12-17', 'Mt 5, 1-12', 'Mc 1, 21-34', 'Mc 2, 1-12', 'Jn 6, 24-59'],
  },
  {
    id: 'betsaida',
    name: 'Betsaida',
    lon: 35.63,
    lat: 32.91,
    note: 'La patria de Pedro, Andrés y Felipe. Cristo devuelve aquí la vista a un ciego, y en sus cercanías da de comer a cinco mil. Se discute dónde estaba; el mapa la pone en et-Tell.',
    passages: ['Jn 1, 44', 'Mc 8, 22-26', 'Lc 9, 10-17'],
  },
  {
    id: 'kursi',
    name: 'Tierra de los gerasenos',
    label: 'Kursi',
    lon: 35.65,
    lat: 32.83,
    note: 'En la orilla oriental del lago, Cristo libra al endemoniado y los demonios entran en los cerdos. La tradición bizantina lo situaba en Kursi, donde quedan las ruinas de un gran monasterio.',
    passages: ['Mc 5, 1-20', 'Lc 8, 26-39'],
  },
  {
    id: 'cana',
    name: 'Caná',
    lon: 35.34,
    lat: 32.75,
    note: 'Las bodas: el primer signo de Cristo, el agua hecha vino. Se identifica con Kafr Kanna, aunque otros proponen Khirbet Qana, algo más al norte.',
    passages: ['Jn 2, 1-11', 'Jn 4, 46-54'],
  },
  {
    id: 'nazaret',
    name: 'Nazaret',
    lon: 35.3,
    lat: 32.7,
    side: 'izquierda',
    note: 'La Anunciación y los años ocultos. Aquí se crió Cristo, y aquí lo rechazaron cuando leyó a Isaías en la sinagoga. Los ortodoxos veneran la Anunciación en la iglesia de san Gabriel, junto a la fuente.',
    passages: ['Lc 1, 26-38', 'Lc 2, 39-52', 'Lc 4, 16-30'],
  },
  {
    id: 'tabor',
    name: 'Monte Tabor',
    label: 'Tabor',
    lon: 35.39,
    lat: 32.69,
    note: 'El monte de la Transfiguración según la tradición, que lo señala desde el siglo IV; los Evangelios dicen sólo «un monte alto». La luz del Tabor está en el centro de la enseñanza de san Gregorio Palamás.',
    passages: ['Mt 17, 1-9', 'Mc 9, 2-9', 'Lc 9, 28-36'],
  },
  {
    id: 'naim',
    name: 'Naín',
    lon: 35.35,
    lat: 32.63,
    note: 'A la puerta de la ciudad, Cristo resucita al hijo único de una viuda.',
    passages: ['Lc 7, 11-17'],
  },
  {
    id: 'cesarea',
    name: 'Cesarea Marítima',
    label: 'Cesarea',
    lon: 34.89,
    lat: 32.5,
    side: 'izquierda',
    note: 'El puerto de Herodes y la sede del gobernador romano. Pedro bautiza aquí a Cornelio, el primer pagano, y Pablo pasa dos años preso antes de apelar al César.',
    passages: ['Hch 10, 1-48', 'Hch 23, 23-35', 'Hch 25, 1-12'],
  },
  {
    id: 'samaria',
    name: 'Samaria (Sebaste)',
    label: 'Samaria',
    lon: 35.19,
    lat: 32.28,
    side: 'izquierda',
    note: 'Felipe predica en la ciudad de Samaria, y Pedro y Juan bajan a imponer las manos a los bautizados. Una tradición antigua pone aquí el sepulcro de san Juan Bautista.',
    passages: ['Hch 8, 4-25'],
  },
  {
    id: 'sicar',
    name: 'Pozo de Jacob (Sicar)',
    label: 'Pozo de Jacob',
    lon: 35.29,
    lat: 32.21,
    note: 'La conversación con la samaritana. La tradición le da el nombre de Fotiní, la iluminada, y la venera como mártir. Sobre el pozo, en Naplusa, hay un monasterio ortodoxo.',
    passages: ['Jn 4, 1-42'],
  },
  {
    id: 'jope',
    name: 'Jope',
    lon: 34.75,
    lat: 32.05,
    side: 'izquierda',
    note: 'Pedro resucita a Tabita y, en la azotea de Simón el curtidor, ve el lienzo que le enseña que no ha de llamar impuro a lo que Dios ha purificado.',
    passages: ['Hch 9, 36-43', 'Hch 10, 9-23'],
  },
  {
    id: 'lida',
    name: 'Lida',
    lon: 34.9,
    lat: 31.95,
    note: 'Pedro cura al paralítico Eneas. Aquí se venera el sepulcro de san Jorge, en una iglesia ortodoxa que lleva su nombre.',
    passages: ['Hch 9, 32-35'],
  },
  {
    id: 'emaus',
    name: 'Emaús',
    lon: 34.99,
    lat: 31.84,
    side: 'izquierda',
    note: 'Los dos discípulos reconocen a Cristo resucitado al partir el pan. Hay varias candidatas; la tradición bizantina la identificaba con Emaús Nicópolis, junto a Latrún, que es la que señala el mapa.',
    passages: ['Lc 24, 13-35'],
  },
  {
    id: 'jerico',
    name: 'Jericó',
    lon: 35.44,
    lat: 31.87,
    side: 'izquierda',
    dy: -14,
    note: 'Zaqueo sube al sicómoro y Bartimeo recobra la vista. Y es el camino de la parábola del buen samaritano, que baja desde Jerusalén.',
    passages: ['Lc 19, 1-10', 'Mc 10, 46-52', 'Lc 10, 30-37'],
  },
  {
    id: 'bautismo',
    name: 'Betania, al otro lado del Jordán',
    label: 'Bautismo',
    lon: 35.55,
    lat: 31.84,
    dy: 10,
    note: 'Donde bautizaba Juan, junto al Jordán y frente a Jericó: la tradición pone aquí el Bautismo de Cristo, la Teofanía, la fiesta del 6 de enero con la gran bendición de las aguas.',
    passages: ['Jn 1, 28', 'Mt 3, 13-17', 'Mc 1, 9-11'],
  },
  {
    id: 'jerusalen',
    name: 'Jerusalén y Betania',
    label: 'Jerusalén',
    lon: 35.23,
    lat: 31.78,
    note: 'La entrada con los ramos, la Cena, Getsemaní, la Cruz, el sepulcro vacío y Pentecostés. En la iglesia de la Resurrección se enciende cada Sábado Santo el Fuego Santo. A tres kilómetros, en Betania, la resurrección de Lázaro.',
    passages: ['Mc 11, 1-11', 'Jn 11, 1-44', 'Lc 22, 39-46', 'Jn 19, 16-42', 'Jn 20, 1-18', 'Hch 2, 1-13'],
  },
  {
    id: 'belen',
    name: 'Belén',
    lon: 35.2,
    lat: 31.7,
    side: 'izquierda',
    note: 'Donde nació Cristo. La basílica de la Natividad, levantada sobre la gruta en el siglo IV y rehecha por Justiniano en el VI, es una de las iglesias más antiguas que siguen en uso.',
    passages: ['Lc 2, 1-20', 'Mt 2, 1-12'],
  },
  {
    id: 'gaza',
    name: 'El camino de Gaza',
    label: 'Gaza',
    lon: 34.47,
    lat: 31.5,
    note: 'En el camino que baja de Jerusalén a Gaza, Felipe bautiza a un eunuco, alto funcionario de la reina de los etíopes.',
    passages: ['Hch 8, 26-40'],
  },
];

export const HOLY_LAND_WATERS: WaterName[] = [
  { id: 'mediterraneo', lon: 34.42, lat: 32.75, label: 'Mar\nMediterráneo' },
  { id: 'galilea', lon: 35.82, lat: 32.62, label: 'Mar de\nGalilea' },
  { id: 'jordan', lon: 35.7, lat: 32.25, label: 'Jordán' },
  { id: 'muerto', lon: 35.8, lat: 31.4, label: 'Mar\nMuerto' },
];

/* ============================================================
   Los viajes de san Pablo
   ============================================================ */

export const PAUL_PLACES: PlaceBase[] = [
  { id: 'jerusalen', name: 'Jerusalén', lon: 35.23, lat: 31.78, side: 'izquierda' },
  { id: 'antioquia', name: 'Antioquía de Siria', label: 'Antioquía', lon: 36.16, lat: 36.2, side: 'izquierda' },
  { id: 'tarso', name: 'Tarso', lon: 34.9, lat: 36.92 },
  { id: 'salamina', name: 'Salamina', lon: 33.9, lat: 35.18 },
  { id: 'pafos', name: 'Pafos', lon: 32.41, lat: 34.76, side: 'abajo' },
  { id: 'perge', name: 'Perge', lon: 30.85, lat: 36.96, side: 'abajo' },
  { id: 'antioquia-pisidia', name: 'Antioquía de Pisidia', label: 'Antioquía\nde Pisidia', lon: 31.19, lat: 38.31, side: 'arriba' },
  { id: 'iconio', name: 'Iconio', lon: 32.49, lat: 37.87, side: 'arriba' },
  { id: 'listra', name: 'Listra', lon: 32.33, lat: 37.58, side: 'izquierda' },
  { id: 'derbe', name: 'Derbe', lon: 33.36, lat: 37.35 },
  { id: 'troas', name: 'Tróade', lon: 26.16, lat: 39.75, side: 'izquierda' },
  { id: 'samotracia', name: 'Samotracia', lon: 25.53, lat: 40.48 },
  { id: 'filipos', name: 'Filipos', lon: 24.29, lat: 41.01 },
  { id: 'tesalonica', name: 'Tesalónica', lon: 22.94, lat: 40.64, side: 'abajo' },
  { id: 'berea', name: 'Berea', lon: 22.2, lat: 40.52, side: 'izquierda', dy: -10 },
  { id: 'atenas', name: 'Atenas', lon: 23.73, lat: 37.98 },
  { id: 'corinto', name: 'Corinto', lon: 22.88, lat: 37.91, side: 'izquierda' },
  { id: 'efeso', name: 'Éfeso', lon: 27.34, lat: 37.94, side: 'arriba' },
  { id: 'mitilene', name: 'Mitilene', lon: 26.55, lat: 39.1 },
  { id: 'quios', name: 'Quíos', lon: 26.13, lat: 38.37, side: 'izquierda' },
  { id: 'samos', name: 'Samos', lon: 26.94, lat: 37.69, side: 'izquierda' },
  { id: 'mileto', name: 'Mileto', lon: 27.28, lat: 37.53 },
  { id: 'cos', name: 'Cos', lon: 27.29, lat: 36.89 },
  { id: 'rodas', name: 'Rodas', lon: 28.22, lat: 36.44, side: 'izquierda' },
  { id: 'patara', name: 'Pátara', lon: 29.32, lat: 36.27, side: 'abajo' },
  { id: 'tiro', name: 'Tiro', lon: 35.2, lat: 33.27 },
  { id: 'tolemaida', name: 'Tolemaida', lon: 35.07, lat: 32.92, side: 'izquierda', dy: -10 },
  { id: 'cesarea', name: 'Cesarea', lon: 34.89, lat: 32.5, side: 'izquierda' },
  { id: 'sidon', name: 'Sidón', lon: 35.37, lat: 33.56, side: 'izquierda' },
  { id: 'mira', name: 'Mira', lon: 29.99, lat: 36.25, side: 'abajo' },
  { id: 'cnido', name: 'Cnido', lon: 27.37, lat: 36.69, side: 'arriba' },
  { id: 'buenos-puertos', name: 'Buenos Puertos', lon: 24.78, lat: 34.93, side: 'abajo' },
  { id: 'malta', name: 'Malta', lon: 14.4, lat: 35.95, side: 'abajo' },
  { id: 'siracusa', name: 'Siracusa', lon: 15.29, lat: 37.08 },
  { id: 'regio', name: 'Regio', lon: 15.65, lat: 38.11 },
  { id: 'pozzuoli', name: 'Pozzuoli', lon: 14.12, lat: 40.82 },
  { id: 'roma', name: 'Roma', lon: 12.48, lat: 41.89 },
];

export interface PaulJourney {
  id: string;
  /** Para el selector: corto. */
  short: string;
  title: string;
  years: string;
  /** Dónde se cuenta. */
  passage: string;
  summary: string;
  /** Las paradas, en orden: la ruta las une. */
  stops: string[];
  /** Lo que se enseña del mapa: oeste, sur, este, norte. */
  encuadre?: Encuadre;
  /** Las cartas escritas durante el viaje o, en el de Roma, durante el cautiverio. */
  letters?: string[];
}

/** El Egeo y Levante: los tres primeros viajes caben aquí, más de cerca. */
const ORIENTE: Encuadre = [19.8, 30.9, 37.4, 42.0];

export const PAUL_JOURNEYS: PaulJourney[] = [
  {
    id: 'primero',
    short: '1.er viaje',
    title: 'Primer viaje',
    years: 'hacia 46-48',
    passage: 'Hch 13, 1-14, 28',
    summary:
      'Con Bernabé, enviados por la Iglesia de Antioquía. Cruzan Chipre, la patria de Bernabé, y suben a la meseta de Anatolia. En Listra los toman por dioses y luego apedrean a Pablo. Vuelven por donde vinieron, ordenando presbíteros en cada Iglesia.',
    stops: [
      'antioquia',
      'salamina',
      'pafos',
      'perge',
      'antioquia-pisidia',
      'iconio',
      'listra',
      'derbe',
      'listra',
      'iconio',
      'antioquia-pisidia',
      'perge',
      'antioquia',
    ],
    encuadre: ORIENTE,
  },
  {
    id: 'segundo',
    short: '2.º viaje',
    title: 'Segundo viaje',
    years: 'hacia 49-52',
    passage: 'Hch 15, 36-18, 22',
    summary:
      'Con Silas, y desde Listra con Timoteo. En Tróade, un macedonio en sueños le pide: «Pasa a Macedonia y ayúdanos», y el Evangelio entra en Europa. En Filipos bautiza a Lidia; en Atenas habla en el Areópago; en Corinto se queda año y medio.',
    stops: [
      'antioquia',
      'tarso',
      'derbe',
      'listra',
      'iconio',
      'antioquia-pisidia',
      'troas',
      'samotracia',
      'filipos',
      'tesalonica',
      'berea',
      'atenas',
      'corinto',
      'efeso',
      'cesarea',
      'jerusalen',
      'antioquia',
    ],
    encuadre: ORIENTE,
    letters: ['1 Ts 1, 1-10', '2 Ts 1, 1-4'],
  },
  {
    id: 'tercero',
    short: '3.er viaje',
    title: 'Tercer viaje',
    years: 'hacia 53-57',
    passage: 'Hch 18, 23-21, 17',
    summary:
      'Por Galacia y Frigia —el camino exacto no se cuenta; el mapa sigue el del viaje anterior— hasta Éfeso, donde se queda casi tres años. Luego Macedonia y Grecia, y la vuelta a Jerusalén por la costa, despidiéndose en Mileto de los presbíteros de Éfeso.',
    stops: [
      'antioquia',
      'tarso',
      'derbe',
      'listra',
      'iconio',
      'antioquia-pisidia',
      'efeso',
      'troas',
      'filipos',
      'tesalonica',
      'corinto',
      'filipos',
      'troas',
      'mitilene',
      'quios',
      'samos',
      'mileto',
      'cos',
      'rodas',
      'patara',
      'tiro',
      'tolemaida',
      'cesarea',
      'jerusalen',
    ],
    encuadre: ORIENTE,
    letters: ['1 Co 16, 5-9', '2 Co 2, 12-13', 'Rm 15, 25-28'],
  },
  {
    id: 'roma',
    short: 'A Roma',
    title: 'El viaje a Roma',
    years: 'hacia 59-60',
    passage: 'Hch 27, 1-28, 16',
    summary:
      'Preso, después de apelar al César. El barco sale tarde, con el otoño encima; frente a Creta lo atrapa el temporal y, tras catorce días a la deriva, naufraga en Malta. En primavera llegan a Italia, y los hermanos de Roma salen a recibirlo por la vía Apia.',
    stops: ['cesarea', 'sidon', 'mira', 'cnido', 'buenos-puertos', 'malta', 'siracusa', 'regio', 'pozzuoli', 'roma'],
    letters: ['Flp 1, 12-14', 'Col 4, 10-18'],
  },
];

/* ============================================================
   Las siete Iglesias y los concilios
   ============================================================ */

export interface AsiaPlace extends PlaceBase {
  kind: 'iglesia' | 'concilio' | 'iglesia-concilio' | 'patmos';
  note: string;
  passages: string[];
  /** Los concilios celebrados aquí, con la época y el hecho de la historia donde tienen ficha. */
  councils?: Array<{ id: string; period: string; label: string }>;
}

/** Las Iglesias, llenas; los concilios, huecos; Patmos, pequeño. */
export const ASIA_KIND_LOOK: Record<AsiaPlace['kind'], Aspecto> = {
  iglesia: 'lleno',
  'iglesia-concilio': 'lleno',
  concilio: 'hueco',
  patmos: 'pequeño',
};

export const ASIA_PLACES: AsiaPlace[] = [
  {
    id: 'patmos',
    name: 'Patmos',
    lon: 26.55,
    lat: 37.31,
    side: 'izquierda',
    kind: 'patmos',
    note: 'La isla donde san Juan, desterrado «por la palabra de Dios», recibe la revelación y la escribe para siete Iglesias de Asia. La gruta del Apocalipsis y el monasterio de san Juan el Teólogo, del siglo XI, siguen abiertos.',
    passages: ['Ap 1, 9-11'],
  },
  {
    id: 'efeso',
    name: 'Éfeso',
    lon: 27.34,
    lat: 37.94,
    kind: 'iglesia-concilio',
    note: 'La primera de las siete: trabajadora y firme, pero «has dejado tu amor primero». Pablo vivió aquí casi tres años, y aquí, según la tradición, acabó sus días san Juan. En 431 el III Concilio Ecuménico llamó a la Virgen Theotokos, Madre de Dios.',
    passages: ['Ap 2, 1-7', 'Hch 19, 1-20', 'Ef 1, 1-14'],
    councils: [{ id: 'efeso', period: 'concilios', label: 'III Concilio Ecuménico (431)' }],
  },
  {
    id: 'esmirna',
    name: 'Esmirna',
    lon: 27.14,
    lat: 38.42,
    side: 'izquierda',
    kind: 'iglesia',
    note: 'Pobre a los ojos del mundo y rica: no recibe ningún reproche. «Sé fiel hasta la muerte y te daré la corona de la vida.» Su obispo, san Policarpo, discípulo de san Juan, murió mártir hacia 155.',
    passages: ['Ap 2, 8-11'],
  },
  {
    id: 'pergamo',
    name: 'Pérgamo',
    lon: 27.18,
    lat: 39.12,
    side: 'izquierda',
    kind: 'iglesia',
    note: '«Donde está el trono de Satanás», quizá por el gran altar de Zeus o por el culto al emperador. Ha guardado la fe, y su mártir Antipas se nombra; se le reprocha tolerar a los nicolaítas.',
    passages: ['Ap 2, 12-17'],
  },
  {
    id: 'tiatira',
    name: 'Tiatira',
    lon: 27.84,
    lat: 38.92,
    kind: 'iglesia',
    note: 'Ciudad de gremios y de tintoreros: de aquí era Lidia, la vendedora de púrpura que Pablo bautizó en Filipos. Se alaban sus obras, que van a más, y se le reprocha consentir a una falsa profetisa.',
    passages: ['Ap 2, 18-29', 'Hch 16, 14-15'],
  },
  {
    id: 'sardes',
    name: 'Sardes',
    lon: 28.04,
    lat: 38.49,
    kind: 'iglesia',
    note: '«Tienes nombre de vivo, pero estás muerto.» La antigua capital de Lidia, rica y confiada. Aun así, hay en ella unos pocos que no han manchado sus vestidos.',
    passages: ['Ap 3, 1-6'],
  },
  {
    id: 'filadelfia',
    name: 'Filadelfia',
    lon: 28.52,
    lat: 38.35,
    kind: 'iglesia',
    note: 'Con poca fuerza, ha guardado la palabra: ante ella hay «una puerta abierta que nadie puede cerrar». Fue la última ciudad cristiana de Asia Menor en caer ante los turcos, en 1390.',
    passages: ['Ap 3, 7-13'],
  },
  {
    id: 'laodicea',
    name: 'Laodicea',
    lon: 29.11,
    lat: 37.84,
    side: 'izquierda',
    kind: 'iglesia',
    note: 'Ni fría ni caliente: tibia, rica y que no sabe que es pobre. «Mira que estoy a la puerta y llamo.» Pablo la nombra en la carta a la vecina Colosas.',
    passages: ['Ap 3, 14-22', 'Col 4, 13-16'],
  },
  {
    id: 'nicea',
    name: 'Nicea',
    lon: 29.72,
    lat: 40.43,
    kind: 'concilio',
    note: 'Dos concilios ecuménicos. En 325 el primero confesó que el Hijo es «de la misma sustancia que el Padre» y escribió la primera parte del Credo; en 787 el séptimo defendió la veneración de los iconos.',
    passages: [],
    councils: [
      { id: 'nicea-i', period: 'concilios', label: 'I Concilio Ecuménico (325)' },
      { id: 'nicea-ii', period: 'bizancio', label: 'VII Concilio Ecuménico (787)' },
    ],
  },
  {
    id: 'constantinopla',
    name: 'Constantinopla y Calcedonia',
    label: 'Constantinopla\ny Calcedonia',
    lon: 28.98,
    lat: 41.01,
    side: 'izquierda',
    kind: 'concilio',
    note: 'Cuatro concilios ecuménicos a las dos orillas del Bósforo, que a esta escala son un solo punto. En Constantinopla, tres: en 381, el que completó el Credo confesando la divinidad del Espíritu Santo; en 553, el que leyó Calcedonia a la luz de san Cirilo; en 680-681, el que confesó en Cristo dos voluntades, la divina y la humana. Enfrente, en Calcedonia, el de 451 definió que Cristo es uno «en dos naturalezas, sin confusión, sin cambio, sin división, sin separación».',
    passages: [],
    councils: [
      { id: 'constantinopla-i', period: 'concilios', label: 'II Concilio Ecuménico, Constantinopla (381)' },
      { id: 'calcedonia', period: 'concilios', label: 'IV Concilio Ecuménico, Calcedonia (451)' },
      { id: 'constantinopla-ii', period: 'bizancio', label: 'V Concilio Ecuménico, Constantinopla (553)' },
      { id: 'constantinopla-iii', period: 'bizancio', label: 'VI Concilio Ecuménico, Constantinopla (680-681)' },
    ],
  },
];

export const BIBLE_MAPS_NOTE =
  'La costa, los lagos y el Jordán salen de Natural Earth, de dominio público. Los lugares van donde los sitúan la arqueología y la tradición; cuando se discute dónde estaba uno, su nota lo dice. Las rutas de san Pablo unen en orden, con líneas rectas, las ciudades que nombran los Hechos y, donde sólo nombran una región, las que la cruzan por el camino más probable: el trazado exacto no se conoce.';
