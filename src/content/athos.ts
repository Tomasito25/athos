/**
 * Monte Athos — la Montaña Santa.
 *
 * Los veinte monasterios soberanos, en el orden jerárquico fijado por el
 * Estatuto de la Comunidad Monástica. Las posiciones del mapa son esquemáticas:
 * sitúan cada monasterio en la costa que le corresponde y a lo largo de la
 * península, pero no son coordenadas topográficas.
 */
import type { AthosArticle, Monastery, SourceMeta, TextBlock } from '@/types';
import { MORE_ATHOS_ARTICLES } from './athos-articles';

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
  /** Qué es hoy: sin esto, veinte fichas son veinte fechas de fundación. */
  today?: string;
  saints?: string[];
  dependencies?: string[];
}

const seeds: MonasterySeed[] = [
  { id: 'megisti-lavra', name: 'Gran Laura', greekName: 'Μεγίστη Λαύρα', rank: 1, founded: '963', tradition: 'Griega', dedication: 'Dormición de san Atanasio el Athonita (5 de julio)', side: 'sur', along: 0.95, description: 'El más antiguo y el primero en la jerarquía. Lo fundó san Atanasio el Athonita con el apoyo del emperador Nicéforo Focas, y su fundación marca el paso del eremitismo disperso a la vida cenobítica organizada en la Montaña. Es el único monasterio que nunca ha sufrido un incendio general.', treasures: ['Reliquias de san Atanasio', 'Biblioteca con más de dos mil manuscritos'], today: 'Es el mayor de los veinte en extensión y el que más dependencias tiene: de él dependen los sketes de Santa Ana, Kavsokalyvia, Prodromu y las ermitas de Karoulia, en los acantilados del extremo sur, donde todavía viven anacoretas casi inaccesibles. Su refectorio, con frescos de Teofanes el Cretense, y el ciprés que la tradición hace plantado por san Atanasio siguen en pie. Fue el último en volver a la vida cenobítica, en 1980.', saints: ['San Atanasio el Athonita, fundador', 'San Gregorio Palamás, que vivió aquí antes de retirarse a la ermita', 'San Cosme de Etolia', 'Los ascetas de Karoulia'], dependencies: ['Skete de Santa Ana', 'Skete de Kavsokalyvia', 'Skete de San Juan Bautista (Prodromu), rumano', 'Karoulia'] },
  { id: 'vatopedi', name: 'Vatopedi', greekName: 'Βατοπέδι', rank: 2, founded: 'c. 972-985', tradition: 'Griega', dedication: 'Anunciación de la Theotokos (25 de marzo)', side: 'este', along: 0.25, description: 'Segundo en la jerarquía y uno de los mayores. Fue durante siglos centro de estudio y copia de manuscritos, y allí vivió san Gregorio Palamás antes de retirarse a la ermita. Conserva varios de los iconos milagrosos más venerados de la Montaña.', treasures: ['Cíngulo de la Theotokos', 'Icono de la Panagía Vematarissa', 'Biblioteca de más de ocho mil volúmenes'], today: 'Es hoy uno de los más poblados y activos, con una comunidad internacional que incluye monjes de habla inglesa; su renovación en los años ochenta, con monjes venidos de Chipre, es una de las historias que explican el repunte del Athos. Guarda el cinturón de la Theotokos, que sus monjes llevan de viaje a las Iglesias que lo piden. Su biblioteca es la segunda del Athos y su archivo conserva documentos imperiales desde el siglo X.', saints: ['San Gregorio Palamás', 'San Máximo el Griego, que llevó la cultura bizantina a Moscú', 'San Eudocimo de Vatopedi'], dependencies: ['Skete de San Demetrio', 'Skete de San Andrés, en Karyés'] },
  { id: 'iviron', name: 'Ivirón', greekName: 'Ιβήρων', rank: 3, founded: 'c. 972-980', tradition: 'Griega (fundación georgiana)', dedication: 'Dormición de la Theotokos (15 de agosto)', side: 'este', along: 0.4, description: 'Fundado por monjes georgianos —de ahí su nombre, «de los iberos»—, fue durante siglos el vínculo entre el Athos y el Cáucaso. Alberga el icono de la Portaítissa, la Guardiana de la Puerta, uno de los más venerados del mundo ortodoxo.', treasures: ['Icono de la Panagía Portaítissa', 'Manuscritos georgianos'], today: 'Es el único monasterio de la Montaña que mantiene la hora bizantina distinta de las demás: allí el día empieza al amanecer y no al ocaso, por una tradición ligada a la llegada de la Portaítissa. El icono está en una capilla junto a la puerta, y no dentro del katholikón, porque según el relato la propia Virgen dijo que no venía a ser guardada sino a guardar. Conserva manuscritos georgianos que son la fuente principal para la historia literaria de aquel país.', saints: ['San Juan y san Eutimio el Ibero, fundadores', 'San Jorge el Hagiorita, traductor', 'San Gabriel el Ibero, que recogió el icono del mar'], dependencies: ['Skete de San Juan Bautista', 'Kellion de la Panagía'] },
  { id: 'hilandar', name: 'Hilandar', greekName: 'Χιλανδαρίου', rank: 4, founded: '1198', tradition: 'Serbia', dedication: 'Entrada de la Theotokos en el Templo (21 de noviembre)', side: 'este', along: 0.12, description: 'Restaurado por san Sava y su padre san Simeón Nemanja, es el monasterio serbio de la Montaña y cuna de la literatura y la identidad serbias medievales. Un incendio lo devastó en 2004 y ha sido reconstruido.', treasures: ['Icono de la Trikherousa, la Virgen de las tres manos', 'Vid de san Simeón'], today: 'Sigue siendo el monasterio serbio y el lugar donde nació la literatura de ese país: allí escribió san Sava la vida de su padre, primer texto de la prosa serbia. El incendio de 2004 destruyó más de la mitad del recinto y la reconstrucción, financiada por el Estado serbio y por donativos, ha durado veinte años. La vid que según la tradición brotó de la tumba de san Simeón sigue dando fruto en la pared sur.', saints: ['San Sava de Serbia', 'San Simeón el Mirobleta', 'Los mártires de Hilandar'], dependencies: ['Kellion del Tipikaritsa', 'Torre de San Sava en Karyés'] },
  { id: 'dionysiou', name: 'Dionisiou', greekName: 'Διονυσίου', rank: 5, founded: '1375', tradition: 'Griega', dedication: 'Natividad de san Juan Bautista (24 de junio)', side: 'oeste', along: 0.85, description: 'Encaramado sobre un acantilado de la costa suroeste, es uno de los conjuntos más impresionantes del Athos. Sus frescos del refectorio, del siglo XVI, se cuentan entre los mejor conservados de la escuela cretense.', treasures: ['Icono de la Panagía del Saludo', 'Frescos de Tzortzis'], today: 'Comunidad pequeña y muy rigurosa, conocida por conservar el orden litúrgico más estricto de la Montaña: los oficios son largos y no se abrevian. Su biblioteca guarda un rollo litúrgico del siglo XI y una crónica ilustrada del Apocalipsis. El monasterio está tan encajado en el acantilado que el huerto tuvo que hacerse en terrazas colgadas sobre el mar.', saints: ['San Dionisio de Korisós, fundador', 'San Nifón, patriarca de Constantinopla, que murió aquí como monje raso'], dependencies: ['Kellion de San Esteban'] },
  { id: 'koutloumousiou', name: 'Kutlumusiu', greekName: 'Κουτλουμουσίου', rank: 6, founded: 'siglos XII-XIII', tradition: 'Griega', dedication: 'Transfiguración del Señor (6 de agosto)', side: 'este', along: 0.5, description: 'Situado junto a Karyés, la capital administrativa, lo que le da un papel singular en la vida de la Montaña. San Paisios vivió en él antes de trasladarse a su celda de Panagouda.', today: 'Su cercanía a Karyés le da un papel administrativo constante: es la parada obligada de quien llega a la capital. San Paisios vivió en él antes de trasladarse a su celda de Panagouda, adonde después acudían cada día decenas de visitantes. Conserva la iglesia de la Transfiguración con frescos del siglo XVI restaurados hace poco.', saints: ['San Paisios del Monte Athos', 'San Cipriano de Kutlumusiu, neomártir'], dependencies: ['Skete de San Panteleimón'] },
  { id: 'pantokratoros', name: 'Pantokrátoros', greekName: 'Παντοκράτορος', rank: 7, founded: '1363', tradition: 'Griega', dedication: 'Transfiguración del Señor (6 de agosto)', side: 'este', along: 0.35, description: 'Fundado por dos altos funcionarios bizantinos sobre una pequeña península rocosa. En su dependencia de Kapsokalyvia vivieron numerosos ascetas célebres.', today: 'De él depende el skete de Kavsokalyvia, una aldea de casas dispersas por el acantilado donde cada grupo de monjes vive por su cuenta y sólo se juntan los domingos: es la forma de vida athonita a medio camino entre el monasterio y la ermita. San Porfirio se crió allí. El monasterio guarda un mosaico del siglo XI y un icono de la Gerontissa muy visitado.', saints: ['San Porfirio Kavsokalivita', 'San Acacio de Kavsokalyvia', 'San Teófilo el Mirobleta'], dependencies: ['Skete de Kavsokalyvia'] },
  { id: 'xiropotamou', name: 'Xiropótamu', greekName: 'Ξηροποτάμου', rank: 8, founded: 'siglo X', tradition: 'Griega', dedication: 'Los Cuarenta Mártires de Sebaste (9 de marzo)', side: 'oeste', along: 0.45, description: 'Uno de los más antiguos de la Montaña. Conserva el fragmento más grande que se conoce de la Preciosa Cruz.', treasures: ['Fragmento de la Preciosa Cruz'], today: 'Custodia el fragmento más grande que se conoce de la Cruz, con el orificio de uno de los clavos, y lo expone a los peregrinos en su fiesta. El monasterio fue destruido dos veces —por los latinos en el siglo XIII y por un incendio en 1609— y reconstruido las dos. Su comunidad es hoy pequeña y muy silenciosa.', saints: ['Santa Pulqueria, emperatriz, benefactora según la tradición', 'Los Cuarenta Mártires de Sebaste, sus titulares'] },
  { id: 'zographou', name: 'Zográfu', greekName: 'Ζωγράφου', rank: 9, founded: 'siglo X', tradition: 'Búlgara', dedication: 'San Jorge el Trofeóforo (23 de abril)', side: 'oeste', along: 0.3, description: 'El monasterio búlgaro de la Montaña. Su nombre, «del pintor», recuerda la tradición del icono de san Jorge que apareció pintado sin mano humana. Sus monjes fueron martirizados en 1276 por resistirse a la unión con Roma.', today: 'Sigue siendo el monasterio búlgaro, aunque durante décadas del siglo XX quedó casi despoblado por la imposibilidad de que llegaran monjes desde un país comunista; hoy vuelve a tener comunidad. Guarda dos iconos de san Jorge muy venerados y el recuerdo de sus veintiséis mártires, quemados en la torre en 1276 por rechazar la unión con Roma que había firmado el emperador Miguel VIII.', saints: ['Los veintiséis mártires de Zográfu', 'San Cosme el Zógrafo'], dependencies: ['Kellion del Nacimiento de la Theotokos'] },
  { id: 'docheiariou', name: 'Dojiaríu', greekName: 'Δοχειαρίου', rank: 10, founded: 'siglo X', tradition: 'Griega', dedication: 'Arcángeles Miguel y Gabriel (8 de noviembre)', side: 'oeste', along: 0.38, description: 'Su nombre procede del monje encargado de la despensa de la Gran Laura, que lo fundó. Custodia el icono de la Gorgoepíkoos, «la que escucha pronto».', treasures: ['Icono de la Panagía Gorgoepíkoos'], today: 'Custodia el icono de la Gorgoepíkoos, «la que escucha pronto», ante el cual se lee cada lunes y viernes una súplica que atrae a peregrinos de toda Grecia. Su katholikón, del siglo XVI, tiene los frescos mejor conservados de la escuela cretense en la costa oeste. La comunidad se renovó en 1980 con monjes venidos de Metéora.', saints: ['San Neófito de Dojiaríu', 'Los santos Eutimio y Nicolás, fundadores según la tradición'] },
  { id: 'karakalou', name: 'Karakalu', greekName: 'Καρακάλλου', rank: 11, founded: 'siglo XI', tradition: 'Griega', dedication: 'Santos Apóstoles Pedro y Pablo (29 de junio)', side: 'este', along: 0.6, description: 'Situado entre olivares en la vertiente oriental. Su torre del siglo XVI es una de las mejor conservadas del Athos.', today: 'Comunidad mediana, conocida por sus huertos y su olivar, que trabajan los propios monjes. Su torre de 1535, financiada por un gobernante de Valaquia, es una de las mejor conservadas y todavía se sube por ella. El monasterio mantiene lazos antiguos con Rumanía y buena parte de su comunidad ha sido rumana en distintas épocas.', saints: ['San Nicodemo de Karakalu', 'San Gedeón de Karakalu, neomártir'] },
  { id: 'filotheou', name: 'Filoteu', greekName: 'Φιλοθέου', rank: 12, founded: 'c. 990', tradition: 'Griega', dedication: 'Anunciación de la Theotokos (25 de marzo)', side: 'este', along: 0.62, description: 'De él salió san Cosme de Etolia para predicar por Grecia y Albania. En el siglo XX fue uno de los focos de la renovación cenobítica de la Montaña.', today: 'Fue el foco de la renovación cenobítica del siglo XX: en 1973 llegó un grupo de monjes formados por el anciano José el Hesicasta, y de Filoteu salieron después las comunidades que repoblaron Konstamonitu, Karakalu, Xenofontos y varios monasterios de Grecia y de América. De él salió también san Cosme de Etolia a predicar por los pueblos griegos y albaneses en el siglo XVIII.', saints: ['San Cosme de Etolia', 'San Efrén de Filoteu', 'El anciano Efrén de Arizona, formado aquí'] },
  { id: 'simonopetra', name: 'Simonopetra', greekName: 'Σίμωνος Πέτρα', rank: 13, founded: '1257', tradition: 'Griega', dedication: 'Natividad de Cristo (25 de diciembre)', side: 'oeste', along: 0.8, description: 'La imagen más reconocible del Athos: siete pisos de balcones de madera sobre una roca que cae a plomo trescientos metros sobre el mar. San Simón lo fundó tras ver una luz sobre el peñasco la noche de Navidad.', today: 'Es la imagen más reconocible de la Montaña y también uno de los monasterios más internacionales: su comunidad, renovada en 1973 con monjes venidos de Metéora, incluye franceses, rumanos y africanos, y de ella salió el primer monasterio ortodoxo del África subsahariana. Su coro es célebre y sus grabaciones han difundido el canto bizantino por todo el mundo. No tiene fuentes propias: el agua llega por un acueducto desde la montaña.', saints: ['San Simón el Mirobleta, fundador', 'Los trece mártires de Simonopetra, muertos en 1580'] },
  { id: 'agiou-pavlou', name: 'San Pablo', greekName: 'Αγίου Παύλου', rank: 14, founded: 'siglo X', tradition: 'Griega', dedication: 'Encuentro del Señor en el Templo (2 de febrero)', side: 'oeste', along: 0.9, description: 'Al pie del monte, en un barranco por el que baja el torrente. Conserva parte de los dones de los Magos, llevados allí desde Constantinopla.', treasures: ['Dones de los Magos'], today: 'Conserva los dones de los Magos —oro, incienso y mirra—, llevados allí desde Constantinopla a través de Serbia, y los presta a las Iglesias que los piden: en 2014 estuvieron en Rusia y los vinieron a ver más de un millón de personas. Está al pie del monte, en la boca de un barranco por el que baja el torrente que en invierno lo aísla. De él dependen dos sketes.', saints: ['San Pablo el Xiropotamita', 'Los santos de la skete de Santa Ana'], dependencies: ['Skete de Santa Ana la Nueva', 'Skete de San Demetrio, rumana'] },
  { id: 'stavronikita', name: 'Stavronikita', greekName: 'Σταυρονικήτα', rank: 15, founded: '1541', tradition: 'Griega', dedication: 'San Nicolás (6 de diciembre)', side: 'este', along: 0.45, description: 'El más pequeño y el último de los veinte en fundarse. Sus frescos son obra de Teofanes el Cretense.', treasures: ['Icono en mosaico de san Nicolás Streidás'], today: 'El más pequeño de los veinte y el más tardío: se fundó en 1541, cuando la Montaña llevaba ya cinco siglos organizada. Sus frescos son de Teofanes el Cretense y están entre los mejor conservados del Athos. Guarda un mosaico de san Nicolás hallado en el mar con una concha adherida al rostro, de donde le viene el sobrenombre de Streidás, el de la ostra.', saints: ['San Gregorio el Sinaíta, que vivió aquí', 'San Teófilo el Mirobleta'] },
  { id: 'xenophontos', name: 'Xenofontos', greekName: 'Ξενοφώντος', rank: 16, founded: 'siglos X-XI', tradition: 'Griega', dedication: 'San Jorge el Trofeóforo (23 de abril)', side: 'oeste', along: 0.35, description: 'A pie de playa en la costa occidental. Tiene dos katholikón, uno del siglo XVI y otro del XIX, caso único en la Montaña.', today: 'Único monasterio de la Montaña con dos katholikón: el antiguo, del siglo XVI, quedó pequeño y en el XIX se levantó otro mayor sin derribar el primero, de modo que se pueden ver los dos. Está a pie de playa y es de los más fáciles de alcanzar. Su comunidad se renovó en 1976 con monjes procedentes de Filoteu.', saints: ['San Xenofonte, fundador según la tradición', 'San Jorge el Trofeóforo, su titular'] },
  { id: 'osiou-grigoriou', name: 'San Gregorio', greekName: 'Οσίου Γρηγορίου', rank: 17, founded: 'siglo XIV', tradition: 'Griega', dedication: 'San Nicolás (6 de diciembre)', side: 'oeste', along: 0.83, description: 'Fundado por san Gregorio el Sinaíta o por un discípulo suyo. Estrechamente ligado a la tradición hesicasta, hoy es uno de los monasterios más poblados.', today: 'Uno de los más poblados de la Montaña y de los más ligados a la tradición hesicasta; su comunidad se renovó en 1974 y desde entonces ha enviado monjes a fundar en Grecia y en el Congo. Está construido sobre una roca a pocos metros del agua, y el mar lo ha inundado más de una vez. Mantiene una escuela de canto bizantino.', saints: ['San Gregorio el Sinaíta o un discípulo suyo, fundador', 'San Cosme de Grigoriu, misionero en el Congo'] },
  { id: 'esphigmenou', name: 'Esfigmenu', greekName: 'Εσφιγμένου', rank: 18, founded: 'siglo X', tradition: 'Griega', dedication: 'Ascensión del Señor', side: 'este', along: 0.08, description: 'En el extremo norte de la península, junto al mar. Cerca se encuentra la cueva donde vivió san Antonio de las Cuevas antes de llevar el monacato athonita a Kiev.', today: 'Está desde 1972 en ruptura con el Patriarcado Ecuménico por el asunto del calendario y del ecumenismo, y su comunidad fue declarada cismática; hay dos grupos que se disputan el monasterio y el litigio sigue abierto ante los tribunales griegos. Es el único caso de conflicto abierto entre los veinte. Cerca está la cueva donde vivió san Antonio antes de llevar el monacato athonita a Kiev.', saints: ['San Antonio de las Cuevas de Kiev', 'San Agatángelo de Esfigmenu, neomártir', 'San Gregorio Palamás, que fue higúmeno aquí'] },
  { id: 'agiou-panteleimonos', name: 'San Panteleimón', greekName: 'Αγίου Παντελεήμονος', rank: 19, founded: 'siglo XI', tradition: 'Rusa', dedication: 'San Panteleimón (27 de julio)', side: 'oeste', along: 0.4, description: 'El monasterio ruso de la Montaña, llamado también Rossikón. A finales del siglo XIX llegó a albergar más de mil monjes. Allí vivió y murió san Silvano el Athonita.', treasures: ['Reliquias de san Silvano', 'Campana de trece toneladas'], today: 'Llegó a tener más de dos mil monjes hacia 1900 y quedó reducido a trece ancianos en 1970, cuando la Unión Soviética impedía la llegada de novicios; hoy vuelve a tener comunidad numerosa y sus edificios han sido restaurados con financiación rusa, no sin polémica sobre la influencia que eso da a Moscú en la Montaña. Su campana mayor, de trece toneladas, se oye desde el mar.', saints: ['San Silvano el Athonita', 'San Antonio de las Cuevas, que aquí tomó el hábito según una tradición'], dependencies: ['Skete de San Andrés', 'Skete del Profeta Elías'] },
  { id: 'konstamonitou', name: 'Konstamonitu', greekName: 'Κωνσταμονίτου', rank: 20, founded: 'siglo XI', tradition: 'Griega', dedication: 'San Esteban Protomártir (27 de diciembre)', side: 'oeste', along: 0.25, description: 'El más apartado y el más pobre de los veinte, escondido en un valle boscoso sin vistas al mar. Vive de la agricultura y de la limosna.', today: 'El más pobre y el más escondido: no tiene vistas al mar, vive de sus huertos y de la limosna, y es el que menos visitantes recibe. Su comunidad se renovó en 1978 con monjes venidos de Filoteu. Conserva un icono de san Esteban que la tradición atribuye a santa Pulqueria.', saints: ['San Esteban Protomártir, su titular', 'Santa Ana de Constantinopla, benefactora según la tradición'] },
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
  today: s.today,
  saints: s.saints,
  dependencies: s.dependencies,
  status: 'complete',
  meta,
  searchText: `${s.name} ${s.greekName} ${s.tradition} ${s.dedication} ${s.description} ${s.today ?? ''} ${(s.saints ?? []).join(' ')}`.toLowerCase(),
}));

const p = (content: string): TextBlock => ({ kind: 'text', content });
const h = (content: string): TextBlock => ({ kind: 'heading', content });

const baseArticles: AthosArticle[] = [
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

export const ATHOS_ARTICLES: AthosArticle[] = [...baseArticles, ...MORE_ATHOS_ARTICLES];

export const ATHOS_INTRO =
  'Ὄρος Ἄθως, el Jardín de la Theotokos: una península de la Calcídica griega donde desde ' +
  'hace más de mil años sólo se vive para orar.';
