/**
 * Iconografía.
 *
 * Las reproducciones proceden de Wikimedia Commons y son fotografías o
 * escaneos de obras históricas concretas: ninguna está generada por ordenador.
 * De cada una se guarda el autor, la datación, la licencia y la página de la
 * que procede, y ATHOS lo muestra junto al icono.
 *
 * `scripts/fetch-icons.py` comprueba la licencia antes de descargar nada y
 * rechaza los archivos sin autoría ni fecha documentadas. Si una ficha no
 * tiene imagen verificable, se queda sin ella y se muestra una placa
 * ornamental: nunca una imagen ajena sin permiso.
 */
import type { IconCategory, ImageCredit, OrthodoxIcon, SourceMeta } from '@/types';

const meta: SourceMeta = {
  source: 'Reseñas redactadas para ATHOS a partir de la literatura iconográfica común',
  tradition: 'Iconografía bizantina',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
  notes:
    'Las reproducciones proceden de Wikimedia Commons, con su licencia comprobada una a una. Ninguna imagen está generada por ordenador.',
};

const COMMONS = 'Wikimedia Commons';

/**
 * Procedencia de cada reproducción, comprobada contra la API de Commons y
 * verificada visualmente una por una.
 */
const CREDITOS: Record<string, ImageCredit & { archivo: string }> = {
  pantocrator: {
    author: 'Autor desconocido',
    date: 'siglo VI',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Christ_Icon_Sinai_6th_century.jpg',
    archivo: 'pantocrator',
  },
  acheiropoietos: {
    author: 'Simón Ushakov',
    date: '1658',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Simon_Ushakov_-_%D0%A1%D0%BF%D0%B0%D1%81_%D0%9D%D0%B5%D1%80%D1%83%D0%BA%D0%BE%D1%82%D0%B2%D0%BE%D1%80%D0%BD%D1%8B%D0%B9_-_Google_Art_Project.jpg',
    archivo: 'acheiropoietos',
  },
  vladimir: {
    author: 'Autor desconocido, taller constantinopolitano',
    date: 'siglo XII',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Vladimirskaya.jpg',
    archivo: 'vladimir',
  },
  portaitissa: {
    author: 'Autor desconocido; la tradición la atribuye a san Lucas',
    date: 'reproducción de la Portaítissa de Ivirón',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Iveron.jpg',
    archivo: 'portaitissa',
  },
  trikherousa: {
    author: 'Autor desconocido; la tradición la vincula a san Juan Damasceno',
    date: 'entre los siglos VIII y XIV',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:VergineTricherusa.jpg',
    archivo: 'trikherousa',
  },
  glykofilousa: {
    author: 'Autor desconocido',
    date: 'siglo XIV',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Virgin_of_Tenderness,_Athena_(14th_Century).jpg',
    archivo: 'glykofilousa',
  },
  'trinidad-rublev': {
    author: 'Andréi Rubliov',
    date: '1425-1427',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Angelsatmamre-trinity-rublev-1410.jpg',
    archivo: 'trinidad-rublev',
  },
  anastasis: {
    author: 'Autor desconocido, San Salvador de Chora',
    date: 'siglo XIV',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Chora_Anastasis1.jpg',
    archivo: 'anastasis',
  },
  'transfiguracion-icono': {
    author: 'Autor desconocido, monasterio de Santa Catalina del Sinaí',
    date: 'hacia 600',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Transfiguration-Sinai.jpg',
    archivo: 'transfiguracion-icono',
  },
  'natividad-icono': {
    author: 'Maestro de la Capilla Palatina de Palermo',
    date: 'hacia 1150',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Meister_der_Palastkapelle_in_Palermo_001.jpg',
    archivo: 'natividad-icono',
  },
  'entrada-jerusalen': {
    author: 'Maestro de la Capilla Palatina de Palermo',
    date: 'hacia 1150',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Meister_der_Palastkapelle_in_Palermo_002.jpg',
    archivo: 'entrada-jerusalen',
  },
  deesis: {
    author: 'Mosaico anónimo del siglo XIII; fotografía de Myrabella',
    date: 'siglo XIII',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Christ_Pantocrator_Deesis_mosaic_Hagia_Sophia.jpg',
    archivo: 'deesis',
  },
  'panselinos-protaton': {
    author: 'Émile Gilliéron, copia del fresco de Manuel Panselinos',
    date: '1880-1881',
    license: 'Dominio público',
    source: COMMONS,
    page: 'https://commons.wikimedia.org/wiki/File:Manuel_Panselinos,_Protaton,_Agios_Neilos_-_copy_by_E_Gilli%C3%A9ron_(Athens,_Byz_Mus_22932).jpg',
    archivo: 'panselinos-protaton',
  },
};

export const ICON_CATEGORY_LABELS: Record<IconCategory, string> = {
  cristo: 'Cristo',
  theotokos: 'Theotokos',
  santos: 'Santos',
  fiestas: 'Fiestas',
  historicos: 'Iconos históricos',
};

interface IconSeed {
  id: string;
  name: string;
  category: IconCategory;
  history: string;
  meaning: string;
  feastDay?: string;
  place?: string;
}

const seeds: IconSeed[] = [
  {
    id: 'pantocrator',
    name: 'Cristo Pantocrátor',
    category: 'cristo',
    place: 'Monasterio de Santa Catalina del Sinaí',
    history:
      'El ejemplar más antiguo que se conserva, pintado en encáustica hacia el siglo VI, sobrevivió a la iconoclasia por estar el Sinaí bajo dominio árabe. Los dos lados del rostro son deliberadamente distintos.',
    meaning:
      'Pantocrátor significa «Soberano de todo». La mano derecha bendice; la izquierda sostiene el Evangelio. La asimetría del rostro se ha interpretado como la unión de las dos naturalezas: la severidad del Juez y la misericordia del Salvador. El nimbo lleva las letras Ὁ ὬΝ, «el que Es», el nombre revelado a Moisés en la zarza.',
  },
  {
    id: 'acheiropoietos',
    name: 'El Santo Mandylion',
    category: 'cristo',
    place: 'Edesa, después Constantinopla',
    history:
      'Según la tradición, el rey Abgar de Edesa envió un mensajero a Cristo pidiéndole que lo curase, y recibió un lienzo con la impronta de su rostro. El paño fue trasladado a Constantinopla en 944 y se perdió en el saqueo de 1204.',
    meaning:
      'Es el icono «no hecho por mano humana», acheiropoíetos: el argumento tradicional de que la representación de Cristo procede de Él mismo. Se conmemora el 16 de agosto.',
    feastDay: '08-16',
  },
  {
    id: 'vladimir',
    name: 'Theotokos de Vladímir',
    category: 'theotokos',
    place: 'Moscú',
    history:
      'Pintada en Constantinopla a comienzos del siglo XII y llevada a la Rus. Estuvo en Vladímir y después en Moscú, donde se le atribuye la salvación de la ciudad ante tres invasiones. Sólo el rostro conserva la pintura original.',
    meaning:
      'Es del tipo Eleúsa, «de la ternura»: el Niño aprieta la mejilla contra la de su Madre. La mirada de ella no se dirige al Hijo ni al espectador, sino a un punto intermedio: sabe lo que va a ocurrir.',
    feastDay: '05-21',
  },
  {
    id: 'portaitissa',
    name: 'Panagía Portaítissa',
    category: 'theotokos',
    place: 'Monasterio de Ivirón, Monte Athos',
    history:
      'La tradición cuenta que una viuda de Nicea la arrojó al mar para salvarla de los iconoclastas y que llegó flotante a la costa del Athos. Cada vez que los monjes la colocaban en el katholikón, aparecía sobre la puerta del monasterio; entendieron que quería ser la guardiana y allí le construyeron capilla.',
    meaning:
      'Portaítissa significa «la Guardiana de la Puerta». En la mejilla lleva una herida de la que, según la tradición, brotó sangre al ser golpeada por un soldado.',
  },
  {
    id: 'trikherousa',
    name: 'Theotokos de las Tres Manos',
    category: 'theotokos',
    place: 'Monasterio de Hilandar, Monte Athos',
    history:
      'Se asocia a san Juan Damasceno: cortada su mano derecha por orden del califa a causa de una calumnia, oró ante este icono y amaneció curado. En agradecimiento colgó del icono una mano de plata.',
    meaning:
      'La tercera mano, que a primera vista desconcierta, es un exvoto que quedó incorporado a la imagen. Es la abadesa titular de Hilandar: el trono del igúmeno está vacío y el icono ocupa su lugar.',
  },
  {
    id: 'glykofilousa',
    name: 'Panagía Glykofilousa',
    category: 'theotokos',
    place: 'Monasterio de Filoteu, Monte Athos',
    history:
      'Según la tradición procede de Constantinopla, salvada de la iconoclasia por una mujer que la echó al mar; llegó a la costa del Athos en pie sobre las olas.',
    meaning: 'Glykofilousa, «la del dulce beso»: variante de la Eleúsa en que el Niño besa a su Madre.',
  },
  {
    id: 'trinidad-rublev',
    name: 'La Santísima Trinidad',
    category: 'fiestas',
    place: 'Moscú',
    history:
      'Pintada por san Andrés Rubliov hacia 1425 para el monasterio de la Trinidad de San Sergio, en memoria de san Sergio de Rádonezh. El Concilio de los Cien Capítulos la declaró en 1551 modelo de toda representación de la Trinidad.',
    meaning:
      'Representa la hospitalidad de Abraham: los tres ángeles de Mambré. Sus figuras se inclinan formando un círculo abierto por delante, hacia el espectador; sobre la mesa hay un cáliz. El lugar vacío es una invitación.',
  },
  {
    id: 'anastasis',
    name: 'La Resurrección · Descenso al Hades',
    category: 'fiestas',
    place: 'San Salvador de Chora, Constantinopla',
    history:
      'El fresco del ábside de Chora, de comienzos del siglo XIV, es la representación más célebre del tema.',
    meaning:
      'La ortodoxia no representa el momento de la Resurrección, que nadie vio, sino sus consecuencias: Cristo pisa las puertas rotas del Hades y saca de sus tumbas a Adán y Eva, agarrándolos por la muñeca, no por la mano. No colaboran: son levantados.',
  },
  {
    id: 'transfiguracion-icono',
    name: 'La Transfiguración',
    category: 'fiestas',
    place: 'Monasterio de Santa Catalina del Sinaí',
    history: 'El mosaico absidal del Sinaí, del siglo VI, es la versión más antigua conservada del tema.',
    meaning:
      'Cristo aparece dentro de una mandorla oscura, no luminosa: la luz increada se representa como tiniebla precisamente porque excede la vista. Moisés y Elías flanquean; los tres discípulos caen deslumbrados.',
    feastDay: '08-06',
  },
  {
    id: 'natividad-icono',
    name: 'La Natividad de Cristo',
    category: 'fiestas',
    history:
      'La composición bizantina reúne en una sola imagen escenas de varios momentos: el nacimiento, los magos, los pastores, el baño del Niño y la duda de José.',
    meaning:
      'El Niño no nace en un establo sino en una cueva oscura, y está fajado como un cadáver dentro de un pesebre con forma de sepulcro: la Navidad ya mira a la Pascua.',
    feastDay: '12-25',
  },
  {
    id: 'deesis',
    name: 'La Deesis',
    category: 'cristo',
    history:
      'Está en el centro de todo iconostasio: Cristo entronizado entre la Theotokos y san Juan Bautista, ambos inclinados hacia Él.',
    meaning:
      'Deesis significa «súplica». Los dos intercesores no miran al fiel sino a Cristo. Es la imagen de la Iglesia orante, y por eso ocupa el lugar central de la fila principal del iconostasio.',
  },
  {
    id: 'entrada-jerusalen',
    name: 'La Entrada en Jerusalén',
    category: 'fiestas',
    place: 'Capilla Palatina de Palermo',
    history:
      'El mosaico de la Capilla Palatina, hacia 1150, es obra de mosaístas bizantinos trabajando para la corte normanda de Sicilia.',
    meaning:
      'Cristo entra sentado de lado sobre el pollino, con la mirada vuelta hacia los discípulos y no hacia la ciudad que lo aclama. Los niños tienden sus mantos en el suelo; al fondo, la puerta de Jerusalén. El Domingo de Ramos abre la Semana Santa.',
  },
  {
    id: 'panselinos-protaton',
    name: 'San Nilo, del Protaton',
    category: 'historicos',
    place: 'Karyés, Monte Athos',
    history:
      'Los frescos del Protaton, pintados hacia 1290 y atribuidos a Manuel Panselinos, son la obra maestra de la llamada escuela macedonia. La reproducción que aquí se muestra no es una fotografía del fresco, sino la copia que Émile Gilliéron hizo en 1880 de la figura de san Nilo; se conserva en el Museo Bizantino de Atenas.',
    meaning:
      'Figuras monumentales, modelado casi escultórico y una fuerza dramática que rompe con el hieratismo anterior. Marcaron la pintura athonita durante siglos.',
  },
];

export const ICONS: OrthodoxIcon[] = seeds.map((s) => ({
  id: s.id,
  name: s.name,
  category: s.category,
  image: CREDITOS[s.id] ? `content/icons/${CREDITOS[s.id].archivo}.webp` : undefined,
  thumb: CREDITOS[s.id] ? `content/icons/${CREDITOS[s.id].archivo}-mini.webp` : undefined,
  credit: CREDITOS[s.id]
    ? {
        author: CREDITOS[s.id].author,
        date: CREDITOS[s.id].date,
        license: CREDITOS[s.id].license,
        source: CREDITOS[s.id].source,
        page: CREDITOS[s.id].page,
      }
    : undefined,
  history: s.history,
  meaning: s.meaning,
  feastDay: s.feastDay,
  place: s.place,
  status: CREDITOS[s.id] ? 'complete' : 'partial',
  meta,
  searchText: `${s.name} ${s.place ?? ''} ${s.history} ${s.meaning}`.toLowerCase(),
}));

export const ICONS_NOTE =
  'Las reproducciones proceden de Wikimedia Commons: son fotografías y escaneos de obras ' +
  'históricas concretas, con su autor, su datación y su licencia comprobados uno a uno. ' +
  'Ninguna imagen está generada por ordenador. Si una ficha no tiene imagen es porque no ' +
  'se ha encontrado una reproducción verificable, y en su lugar se muestra una placa.';
