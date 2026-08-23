/**
 * Iconografía.
 *
 * ATHOS no incluye imágenes cuya situación de derechos no haya podido
 * comprobarse. Cada ficha describe el icono, su historia y su significado —que
 * es información documentada— y, mientras no haya una imagen con licencia
 * verificada, se muestra una placa ornamental en su lugar. Nunca una imagen
 * ajena sin permiso.
 */
import type { IconCategory, OrthodoxIcon, SourceMeta } from '@/types';

const meta: SourceMeta = {
  source: 'Reseñas redactadas para ATHOS a partir de la literatura iconográfica común',
  tradition: 'Iconografía bizantina',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
  notes: 'Las imágenes no se incluyen mientras no se disponga de reproducciones con licencia comprobada.',
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
    id: 'panselinos-protaton',
    name: 'Frescos del Protaton',
    category: 'historicos',
    place: 'Karyés, Monte Athos',
    history:
      'Pintados hacia 1290 y atribuidos a Manuel Panselinos, son la obra maestra de la llamada escuela macedonia.',
    meaning:
      'Figuras monumentales, modelado casi escultórico y una fuerza dramática que rompe con el hieratismo anterior. Marcaron la pintura athonita durante siglos.',
  },
];

export const ICONS: OrthodoxIcon[] = seeds.map((s) => ({
  id: s.id,
  name: s.name,
  category: s.category,
  image: undefined,
  history: s.history,
  meaning: s.meaning,
  feastDay: s.feastDay,
  place: s.place,
  status: 'partial',
  meta,
  searchText: `${s.name} ${s.place ?? ''} ${s.history} ${s.meaning}`.toLowerCase(),
}));

export const ICONS_NOTE =
  'Las fichas describen cada icono y su significado. Las reproducciones no se incluyen ' +
  'mientras no se disponga de imágenes con licencia comprobada: ATHOS prefiere una placa ' +
  'vacía a una imagen usada sin derecho.';
