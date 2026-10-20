/**
 * Las Iglesias ortodoxas hoy.
 *
 * Una ficha por Iglesia: quién la preside, dónde tiene la sede, desde cuándo
 * es autocéfala, cuántos fieles tiene más o menos, qué calendario sigue, en
 * qué lenguas celebra, qué Iglesias autónomas dependen de ella y qué diócesis
 * tiene en España y en América Latina.
 *
 * Lo que más se queda viejo es el primado: en 2024 cambió en Bulgaria, en 2025
 * en Albania y en 2026 en Georgia. Por eso cada ficha lleva la fecha en que se
 * comprobó, se enseña al lado del nombre, y una prueba
 * (`tests/iglesias-hoy.test.ts`) falla cuando una ficha lleva más de un año
 * sin revisar.
 *
 * Los casos en disputa se cuentan como disputas: quién concedió qué, quién lo
 * reconoce y quién no. ATHOS no decide quién tiene razón.
 *
 * Las cifras de fieles son aproximadas y las da cada Iglesia o los censos;
 * varían mucho según se cuente a los bautizados o a los practicantes. Las
 * diócesis de España y América Latina son las que tienen sede propia allí;
 * muchas Iglesias atienden además parroquias sueltas desde diócesis de otros
 * países, y eso no se enumera.
 *
 * Texto redactado para ATHOS, CC BY-SA 4.0.
 */
import type { CalendarStyle } from '@/types';

export type ChurchStatus = 'reconocida' | 'disputada';

export interface OrthodoxChurch {
  id: string;
  name: string;
  /** El título del primado, tal como se le nombra. */
  primateTitle: string;
  /** Quién lo es ahora. */
  primate: string;
  /** Desde cuándo. */
  primateSince: string;
  /** Cuándo se comprobó por última vez quién es el primado: `AAAA-MM-DD`. */
  verifiedOn: string;
  see: string;
  /** Desde cuándo es autocéfala, y quién lo reconoció. */
  autocephaly: string;
  faithful: string;
  calendar: CalendarStyle | 'mixto';
  calendarNote?: string;
  languages: string[];
  /** Iglesias autónomas o con autogobierno que dependen de ella. */
  autonomous?: string[];
  /** Diócesis con sede en España o en América Latina. */
  hispanic?: string[];
  status: ChurchStatus;
  /** Lo que conviene saber, en una o dos frases. */
  note?: string;
}

/** Cuándo se revisaron por última vez todas las fichas. */
const REVISADO = '2026-10-19';

/**
 * Por el orden de los dípticos: el que siguen las Iglesias al conmemorarse
 * unas a otras. Las cuatro antiguas, luego los patriarcados nuevos y después
 * las demás autocéfalas por antigüedad de su autocefalia reconocida.
 */
export const ORTHODOX_CHURCHES: OrthodoxChurch[] = [
  {
    id: 'constantinopla',
    name: 'Patriarcado Ecuménico de Constantinopla',
    primateTitle: 'Arzobispo de Constantinopla-Nueva Roma y Patriarca Ecuménico',
    primate: 'Bartolomé I',
    primateSince: '1991',
    verifiedOn: REVISADO,
    see: 'Estambul (Fanar)',
    autocephaly: 'Sede apostólica; patriarcado desde el Concilio de Calcedonia (451), con el primado de honor entre los ortodoxos.',
    faithful: 'Entre 3 y 5 millones, la mayoría fuera de Turquía',
    calendar: 'nuevo',
    calendarNote: 'Los monasterios del Monte Athos, que dependen de él, siguen el juliano.',
    languages: ['griego', 'y las de cada diócesis de la diáspora'],
    autonomous: [
      'Iglesia ortodoxa de Finlandia',
      'Iglesia Apostólica Ortodoxa de Estonia',
      'Iglesia de Creta (semiautónoma)',
      'Monte Athos (autogobierno monástico)',
    ],
    hispanic: [
      'Metrópolis de España y Portugal (Madrid)',
      'Metrópolis de Buenos Aires',
      'Metrópolis de México',
    ],
    status: 'reconocida',
  },
  {
    id: 'alejandria',
    name: 'Patriarcado de Alejandría y de toda África',
    primateTitle: 'Papa y Patriarca de Alejandría y de toda África',
    primate: 'Teodoro II',
    primateSince: '2004',
    verifiedOn: REVISADO,
    see: 'Alejandría (Egipto)',
    autocephaly: 'Sede apostólica, fundada por san Marcos según la tradición.',
    faithful: 'En torno a 1,5 millones, sobre todo en el África subsahariana',
    calendar: 'nuevo',
    languages: ['griego', 'árabe', 'inglés', 'francés', 'suajili y otras lenguas africanas'],
    status: 'reconocida',
    note: 'Reconoció la autocefalia de Ucrania en 2019; desde 2021 la Iglesia rusa tiene en África un exarcado propio. Véase «Moscú y Alejandría».',
  },
  {
    id: 'antioquia',
    name: 'Patriarcado de Antioquía y de todo el Oriente',
    primateTitle: 'Patriarca de Antioquía y de todo el Oriente',
    primate: 'Juan X',
    primateSince: '2012',
    verifiedOn: REVISADO,
    see: 'Damasco (Siria)',
    autocephaly: 'Sede apostólica: en Antioquía se llamó cristianos por primera vez a los discípulos.',
    faithful: 'Entre 1,5 y 4 millones, según cómo se cuente la diáspora',
    calendar: 'nuevo',
    languages: ['árabe', 'griego', 'y en la diáspora inglés, español y portugués'],
    autonomous: ['Arquidiócesis de América del Norte (autogobierno)'],
    hispanic: [
      'Arquidiócesis de Buenos Aires y toda la Argentina',
      'Arquidiócesis de São Paulo y todo el Brasil',
      'Arquidiócesis de Santiago y todo Chile',
      'Arquidiócesis de México, Venezuela, Centroamérica y el Caribe',
    ],
    status: 'reconocida',
    note: 'Es la Iglesia ortodoxa con más fieles de lengua española y portuguesa, por la emigración siria y libanesa a América.',
  },
  {
    id: 'jerusalen',
    name: 'Patriarcado de Jerusalén',
    primateTitle: 'Patriarca de la Ciudad Santa de Jerusalén y de toda Palestina',
    primate: 'Teófilo III',
    primateSince: '2005',
    verifiedOn: REVISADO,
    see: 'Jerusalén',
    autocephaly: 'La Iglesia madre; patriarcado desde el Concilio de Calcedonia (451).',
    faithful: 'Unos 130.000, en Israel, Palestina y Jordania',
    calendar: 'juliano',
    languages: ['griego', 'árabe'],
    autonomous: ['Iglesia del Sinaí (autónoma)'],
    status: 'reconocida',
    note: 'Custodia, con otras confesiones, los Santos Lugares: el Santo Sepulcro y la basílica de la Natividad.',
  },
  {
    id: 'moscu',
    name: 'Patriarcado de Moscú',
    primateTitle: 'Patriarca de Moscú y de toda la Rus',
    primate: 'Cirilo',
    primateSince: '2009',
    verifiedOn: REVISADO,
    see: 'Moscú',
    autocephaly: 'De hecho desde 1448; reconocida y elevada a patriarcado en 1589.',
    faithful: 'La más numerosa: decenas de millones de practicantes; reivindica más de cien millones de bautizados',
    calendar: 'juliano',
    languages: ['eslavo eclesiástico'],
    autonomous: [
      'Iglesia ortodoxa rusa en el extranjero (autogobierno)',
      'Iglesia ortodoxa de Japón (autónoma)',
      'Iglesia ortodoxa china (autónoma)',
      'Iglesia ortodoxa de Letonia y de Moldavia (con autogobierno)',
    ],
    hispanic: ['Diócesis de España y Portugal (Madrid)', 'Diócesis de Argentina y Sudamérica (Buenos Aires)'],
    status: 'reconocida',
    note: 'Desde 2018 no está en comunión con Constantinopla. Véase «Ucrania».',
  },
  {
    id: 'serbia',
    name: 'Patriarcado de Serbia',
    primateTitle: 'Arzobispo de Peć, Metropolita de Belgrado y Karlovci, Patriarca Serbio',
    primate: 'Porfirio',
    primateSince: '2021',
    verifiedOn: REVISADO,
    see: 'Belgrado',
    autocephaly: 'Desde san Sava, en 1219; patriarcado desde 1346, restaurado en 1920.',
    faithful: 'Unos 8 millones',
    calendar: 'juliano',
    languages: ['eslavo eclesiástico', 'serbio'],
    hispanic: ['Diócesis de Buenos Aires, Sudamérica y Centroamérica'],
    status: 'reconocida',
  },
  {
    id: 'rumania',
    name: 'Patriarcado de Rumanía',
    primateTitle: 'Arzobispo de Bucarest, Metropolita de Muntenia y Dobruja, Patriarca de Rumanía',
    primate: 'Daniel',
    primateSince: '2007',
    verifiedOn: REVISADO,
    see: 'Bucarest',
    autocephaly: 'Desde 1885; patriarcado desde 1925.',
    faithful: 'Unos 16 millones',
    calendar: 'nuevo',
    languages: ['rumano'],
    autonomous: ['Metropolía de Besarabia (Moldavia, autónoma)'],
    hispanic: ['Obispado Ortodoxo Rumano de España y Portugal (Madrid)'],
    status: 'reconocida',
    note: 'Es la Iglesia ortodoxa con más parroquias en España, por la emigración rumana.',
  },
  {
    id: 'bulgaria',
    name: 'Patriarcado de Bulgaria',
    primateTitle: 'Metropolita de Sofía y Patriarca de toda Bulgaria',
    primate: 'Daniel (Daniil)',
    primateSince: '2024',
    verifiedOn: REVISADO,
    see: 'Sofía',
    autocephaly: 'Exarcado desde 1870, autocefalia reconocida en 1945; patriarcado restaurado en 1953, reconocido en 1961.',
    faithful: 'Unos 6 millones',
    calendar: 'nuevo',
    languages: ['eslavo eclesiástico', 'búlgaro'],
    status: 'reconocida',
    note: 'Sus parroquias en España dependen de la diócesis de Europa Occidental y Central.',
  },
  {
    id: 'georgia',
    name: 'Iglesia ortodoxa de Georgia',
    primateTitle: 'Católicos-Patriarca de toda Georgia',
    primate: 'Shio III',
    primateSince: '2026',
    verifiedOn: REVISADO,
    see: 'Tiflis (Mtsjeta)',
    autocephaly: 'Desde el siglo V; restaurada en 1917 y reconocida por Constantinopla en 1990.',
    faithful: 'Unos 3,5 millones',
    calendar: 'juliano',
    languages: ['georgiano'],
    status: 'reconocida',
    note: 'Ilia II, que la presidió desde 1977, murió el 17 de marzo de 2026; el Santo Sínodo eligió a Shio III el 11 de mayo.',
  },
  {
    id: 'chipre',
    name: 'Iglesia de Chipre',
    primateTitle: 'Arzobispo de Nueva Justiniana y de todo Chipre',
    primate: 'Jorge (Georgios)',
    primateSince: '2023',
    verifiedOn: REVISADO,
    see: 'Nicosia',
    autocephaly: 'Desde el Concilio de Éfeso (431).',
    faithful: 'Unos 700.000',
    calendar: 'nuevo',
    languages: ['griego'],
    status: 'reconocida',
  },
  {
    id: 'grecia',
    name: 'Iglesia de Grecia',
    primateTitle: 'Arzobispo de Atenas y de toda Grecia',
    primate: 'Jerónimo II',
    primateSince: '2008',
    verifiedOn: REVISADO,
    see: 'Atenas',
    autocephaly: 'Desde 1850, por tomos de Constantinopla.',
    faithful: 'Unos 9 millones',
    calendar: 'nuevo',
    languages: ['griego'],
    status: 'reconocida',
    note: 'Las metrópolis del norte de Grecia y las islas del Dodecaneso y Creta dependen canónicamente de Constantinopla.',
  },
  {
    id: 'polonia',
    name: 'Iglesia ortodoxa de Polonia',
    primateTitle: 'Metropolita de Varsovia y de toda Polonia',
    primate: 'Sabas (Sawa)',
    primateSince: '1998',
    verifiedOn: REVISADO,
    see: 'Varsovia',
    autocephaly: 'Desde 1924, por Constantinopla; Moscú la reconoció en 1948.',
    faithful: 'Unos 500.000',
    calendar: 'juliano',
    calendarNote: 'Algunas parroquias siguen el nuevo.',
    languages: ['eslavo eclesiástico', 'polaco'],
    status: 'reconocida',
  },
  {
    id: 'albania',
    name: 'Iglesia ortodoxa de Albania',
    primateTitle: 'Arzobispo de Tirana, Durrës y toda Albania',
    primate: 'Juan (Joan)',
    primateSince: '2025',
    verifiedOn: REVISADO,
    see: 'Tirana',
    autocephaly: 'Proclamada en 1922, reconocida por Constantinopla en 1937.',
    faithful: 'Entre 200.000 y 700.000, según la fuente',
    calendar: 'nuevo',
    languages: ['albanés', 'griego'],
    status: 'reconocida',
    note: 'Prohibida con toda religión de 1967 a 1990, renació con el arzobispo Anastasio, muerto en enero de 2025.',
  },
  {
    id: 'chequia-eslovaquia',
    name: 'Iglesia ortodoxa de las Tierras Checas y Eslovaquia',
    primateTitle: 'Arzobispo de Prešov y Metropolita de las Tierras Checas y Eslovaquia',
    primate: 'Rastislav',
    primateSince: '2014',
    verifiedOn: REVISADO,
    see: 'Praga y Prešov',
    autocephaly: 'Concedida por Moscú en 1951; Constantinopla la reconoció en 1998.',
    faithful: 'Unos 75.000',
    calendar: 'juliano',
    calendarNote: 'Algunas parroquias de las Tierras Checas siguen el nuevo.',
    languages: ['eslavo eclesiástico', 'checo', 'eslovaco'],
    status: 'reconocida',
  },
  {
    id: 'oca',
    name: 'Iglesia ortodoxa en América (OCA)',
    primateTitle: 'Arzobispo de Washington y Metropolita de toda América y Canadá',
    primate: 'Tijón (Tikhon)',
    primateSince: '2012',
    verifiedOn: REVISADO,
    see: 'Washington',
    autocephaly: 'Concedida por Moscú en 1970. La reconocen las Iglesias de Bulgaria, Georgia, Polonia y Chequia y Eslovaquia; Constantinopla y la mayoría, no.',
    faithful: 'Unas 700 parroquias en Estados Unidos, Canadá y México',
    calendar: 'nuevo',
    calendarNote: 'Algunas parroquias siguen el juliano.',
    languages: ['inglés', 'y eslavo, rumano, albanés y español en sus diócesis'],
    hispanic: ['Arquidiócesis de México'],
    status: 'disputada',
  },
  {
    id: 'ucrania',
    name: 'Iglesia ortodoxa de Ucrania',
    primateTitle: 'Metropolita de Kiev y de toda Ucrania',
    primate: 'Epifanio',
    primateSince: '2018',
    verifiedOn: REVISADO,
    see: 'Kiev',
    autocephaly: 'Concedida por Constantinopla en 2019. La reconocen además Alejandría, Grecia y Chipre; Moscú y la mayoría de las demás, no.',
    faithful: 'Varios millones; las cifras están en disputa',
    calendar: 'nuevo',
    calendarNote: 'Desde 2023.',
    languages: ['ucraniano', 'eslavo eclesiástico'],
    status: 'disputada',
    note: 'En Ucrania sigue también la Iglesia que dependía de Moscú, que en 2022 declaró su independencia de ella. Véase «Ucrania».',
  },
  {
    id: 'ohrid',
    name: 'Iglesia ortodoxa de Macedonia del Norte (Arzobispado de Ohrid)',
    primateTitle: 'Arzobispo de Ohrid y Macedonia',
    primate: 'Esteban (Stefan)',
    primateSince: '1999',
    verifiedOn: REVISADO,
    see: 'Skopie',
    autocephaly: 'Proclamada en 1967 sin reconocimiento; en 2022 Constantinopla la recibió en comunión y Serbia le concedió la autocefalia, que algunas Iglesias reconocen ya y otras no.',
    faithful: 'En torno a un millón',
    calendar: 'juliano',
    languages: ['macedonio', 'eslavo eclesiástico'],
    status: 'disputada',
  },
];

export interface ChurchDispute {
  id: string;
  title: string;
  since: string;
  /** Qué pasó, contado sin dar la razón a nadie. */
  text: string;
  /** A qué fichas afecta. */
  churches: string[];
}

export const CHURCH_DISPUTES: ChurchDispute[] = [
  {
    id: 'ucrania',
    title: 'Ucrania',
    since: '2018',
    text:
      'En 2018 Constantinopla revocó la cesión de la metrópolis de Kiev que había hecho a Moscú en 1686 y en 2019 concedió la autocefalia a la nueva Iglesia ortodoxa de Ucrania. Moscú lo considera una invasión de su territorio canónico y rompió la comunión con Constantinopla. En Ucrania siguen dos Iglesias: la autocéfala y la que dependía de Moscú, que en 2022, tras la invasión rusa, declaró su independencia, aunque Moscú la sigue contando como suya.',
    churches: ['ucrania', 'constantinopla', 'moscu'],
  },
  {
    id: 'moscu-constantinopla',
    title: 'Moscú y Constantinopla',
    since: '2018',
    text:
      'Desde octubre de 2018 la Iglesia rusa no está en comunión con el Patriarcado Ecuménico, y ha dejado de conmemorar a los primados que reconocieron a la Iglesia de Ucrania: el de Alejandría, el de Grecia y el de Chipre. Es la mayor fractura de la ortodoxia en siglos; las demás Iglesias siguen en comunión con las dos.',
    churches: ['moscu', 'constantinopla', 'grecia', 'chipre'],
  },
  {
    id: 'moscu-alejandria',
    title: 'Moscú y Alejandría',
    since: '2021',
    text:
      'Cuando Alejandría reconoció a la Iglesia de Ucrania en 2019, Moscú dejó de conmemorar a su patriarca. En diciembre de 2021 creó un exarcado patriarcal para África y recibió a clérigos africanos de Alejandría. Alejandría lo considera una intromisión en su territorio y depuso a varios de ellos.',
    churches: ['moscu', 'alejandria'],
  },
  {
    id: 'oca',
    title: 'La Iglesia en América',
    since: '1970',
    text:
      'Moscú concedió la autocefalia a su antigua metrópolis americana en 1970. Constantinopla sostiene que conceder la autocefalia le corresponde a ella, y no la reconoce; la reconocen las Iglesias de Bulgaria, Georgia, Polonia y Chequia y Eslovaquia. En la práctica, la OCA está en comunión con todas.',
    churches: ['oca', 'moscu', 'constantinopla'],
  },
  {
    id: 'ohrid',
    title: 'Ohrid',
    since: '1967',
    text:
      'La Iglesia de Macedonia proclamó su autocefalia en 1967, sin que nadie la reconociera. En 2022 Constantinopla la recibió en comunión y la Iglesia serbia, de la que se había separado, le concedió la autocefalia. Algunas Iglesias la reconocen ya —la OCA lo hizo en 2025— y otras siguen sin hacerlo.',
    churches: ['ohrid', 'serbia', 'constantinopla'],
  },
  {
    id: 'estonia',
    title: 'Estonia',
    since: '1996',
    text:
      'En Estonia hay dos Iglesias ortodoxas: la Iglesia Apostólica, autónoma bajo Constantinopla desde 1923 y restaurada en 1996, y la que dependía de Moscú. La restauración de 1996 llevó a Moscú a romper la comunión con Constantinopla durante unos meses. Una ley estonia de 2025 obliga a la segunda a cortar su vínculo administrativo con Moscú; ella lo ha llevado al Tribunal Europeo de Derechos Humanos.',
    churches: ['constantinopla', 'moscu'],
  },
];

export const CHURCHES_NOTE =
  'Las fichas dicen quién preside cada Iglesia y desde cuándo, y la fecha en que se comprobó. ' +
  'Los primados cambian —en 2024 en Bulgaria, en 2025 en Albania, en 2026 en Georgia—: si ves uno ' +
  'que ya no lo es, avisa. Las cifras de fieles son aproximadas. Los casos en disputa se cuentan ' +
  'como disputas, diciendo quién reconoce qué; ATHOS no decide quién tiene razón.';
