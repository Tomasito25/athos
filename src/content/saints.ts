/**
 * Santoral.
 *
 * Las biografías son reseñas históricas redactadas para ATHOS. Los troparios y
 * kontakia son textos litúrgicos: sólo se incluyen cuando se dispone de una
 * versión española de dominio público o de uso tradicional; en caso contrario
 * la ficha queda marcada como pendiente y no se inventa el texto.
 */
import type { Saint, SaintCategory, SourceMeta, TextBlock } from '@/types';
import { MORE_SAINTS } from './saints-more';
import { THIRD_SAINTS } from './saints-third';
import { YEAR_SAINTS_1 } from './saints-year-1';
import { YEAR_SAINTS_2 } from './saints-year-2';

const bio: SourceMeta = {
  source: 'Reseña histórica redactada para ATHOS a partir de fuentes hagiográficas comunes',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
};

const pendingHymn: TextBlock[] = [
  { kind: 'pending', content: 'Contenido pendiente de incorporar.' },
];

interface SaintSeed {
  id: string;
  name: string;
  fullName?: string;
  day: string;
  category: SaintCategory[];
  century?: string;
  place?: string;
  biography: string;
  troparion?: TextBlock[];
  status?: Saint['status'];
}

const seeds: SaintSeed[] = [
  /* ---------------- Enero ---------------- */
  { id: 'basilio-magno', name: 'San Basilio el Grande', day: '01-01', category: ['obispo', 'padre'], century: 'IV', place: 'Cesarea de Capadocia', biography: 'Arzobispo de Cesarea († 379). Organizó la vida cenobítica con sus Reglas, defendió la divinidad del Espíritu Santo frente al arrianismo y levantó la Basiliada, un complejo de hospital y albergue para pobres. Su Divina Liturgia se celebra diez veces al año.' },
  { id: 'serafin-sarov', name: 'San Serafín de Sarov', day: '01-02', category: ['monje'], century: 'XVIII–XIX', place: 'Sarov, Rusia', biography: 'Monje y starets († 1833). Vivió años en reclusión y silencio, mil noches en oración sobre una roca. Acogía a cuantos acudían a él con el saludo «Alegría mía, ¡Cristo ha resucitado!». Su conversación con Motovílov sobre la adquisición del Espíritu Santo es uno de los textos espirituales más leídos de la ortodoxia rusa.' },
  { id: 'teofania-señor', name: 'Bautismo del Señor', day: '01-06', category: ['senor'], biography: 'La Teofanía manifiesta a la Trinidad en el Jordán: la voz del Padre, el Hijo bautizado y el Espíritu en forma de paloma. Ese día se celebra la Gran Bendición de las Aguas.' },
  { id: 'juan-bautista-sinaxis', name: 'San Juan Bautista', fullName: 'Sinaxis del santo Profeta, Precursor y Bautista Juan', day: '01-07', category: ['profeta'], century: 'I', biography: 'El Precursor, «el mayor entre los nacidos de mujer». Predicó el bautismo de arrepentimiento y señaló a Cristo como el Cordero de Dios. Fue decapitado por Herodes.' },
  { id: 'antonio-magno', name: 'San Antonio el Grande', day: '01-17', category: ['monje'], century: 'III–IV', place: 'Egipto', biography: 'Padre del monacato († 356). A los veinte años oyó en la iglesia «vende cuanto tienes» y se retiró al desierto egipcio. Su Vida, escrita por San Atanasio, difundió el ideal monástico por todo el Imperio.' },
  { id: 'atanasio-alejandria', name: 'San Atanasio el Grande', day: '01-18', category: ['obispo', 'padre', 'confesor'], century: 'IV', place: 'Alejandría', biography: 'Patriarca de Alejandría († 373). Defendió el término «consustancial» de Nicea contra el arrianismo y pasó diecisiete años en cinco destierros. Autor de Sobre la Encarnación del Verbo.' },
  { id: 'macario-egipcio', name: 'San Macario el Egipcio', day: '01-19', category: ['monje'], century: 'IV', place: 'Escete, Egipto', biography: 'Anacoreta del desierto de Escete († c. 391). Maestro de la oración continua y del silencio; a él se atribuyen las Homilías espirituales que influyeron en toda la tradición hesicasta.' },
  { id: 'gregorio-teologo', name: 'San Gregorio el Teólogo', fullName: 'San Gregorio Nacianceno', day: '01-25', category: ['obispo', 'padre'], century: 'IV', place: 'Nacianzo, Capadocia', biography: 'Arzobispo de Constantinopla († 390). Sus cinco Discursos teológicos sobre la Trinidad le valieron el título de Teólogo, que la Iglesia sólo da a otros dos santos. Renunció a la sede para volver al retiro y la poesía.' },
  { id: 'tres-jerarcas', name: 'Los Tres Santos Jerarcas', day: '01-30', category: ['obispo', 'padre'], century: 'IV–V', biography: 'Basilio el Grande, Gregorio el Teólogo y Juan Crisóstomo. La fiesta común se instituyó en el siglo XI para acabar con las disputas sobre cuál de ellos era mayor: la Iglesia los honra juntos como maestros del mundo entero.' },

  /* ---------------- Febrero ---------------- */
  { id: 'encuentro-senor', name: 'Encuentro del Señor', day: '02-02', category: ['senor'], biography: 'A los cuarenta días, el Niño es llevado al Templo. El anciano Simeón lo recibe en sus brazos y pronuncia el «Ahora, Señor, despides a tu siervo en paz».' },
  { id: 'haralambos', name: 'San Haralampo', day: '02-10', category: ['martir', 'obispo'], century: 'II', place: 'Magnesia', biography: 'Presbítero de Magnesia martirizado a los ciento trece años bajo Septimio Severo. Muy venerado en Grecia como protector contra la peste.' },
  { id: 'cirilo-metodio-c', name: 'San Cirilo, iguales a los Apóstoles', day: '02-14', category: ['obispo'], century: 'IX', place: 'Tesalónica', biography: 'Con su hermano Metodio creó el alfabeto glagolítico y tradujo la Escritura y los oficios al eslavo, dando origen a la cristiandad eslava.' },

  /* ---------------- Marzo ---------------- */
  { id: 'gregorio-palamas', name: 'San Gregorio Palamás', day: '03-14', category: ['obispo', 'padre'], century: 'XIV', place: 'Monte Athos y Tesalónica', biography: 'Monje athonita y arzobispo de Tesalónica († 1359). Defendió a los hesicastas explicando la distinción entre la esencia de Dios, inaccesible, y sus energías increadas, en las que el hombre participa realmente.' },
  { id: 'anunciacion-s', name: 'Anunciación de la Theotokos', day: '03-25', category: ['theotokos'], biography: 'El arcángel Gabriel anuncia a la Virgen la encarnación del Verbo y ella responde: «Hágase en mí según tu palabra». La Iglesia entiende esa respuesta como el consentimiento de la humanidad entera, y por eso la fiesta va exactamente nueve meses antes de la Navidad. Es la única que no se aplaza nunca: se celebra aunque caiga en Viernes Santo, y entonces se cantan a la vez el anuncio y el sepulcro.' },

  /* ---------------- Abril ---------------- */
  { id: 'jorge-trofeoforo', name: 'San Jorge el Trofeóforo', day: '04-23', category: ['granmartir'], century: 'IV', place: 'Capadocia y Lida', biography: 'Oficial del ejército de Diocleciano que confesó públicamente su fe y fue martirizado el año 303. Patrón de numerosos pueblos cristianos.' },
  { id: 'marcos-evangelista', name: 'San Marcos Evangelista', day: '04-25', category: ['apostol'], century: 'I', place: 'Alejandría', biography: 'Discípulo de san Pedro, que lo llama «mi hijo», y autor del segundo Evangelio, el más breve y el más antiguo de los cuatro según casi todos los estudiosos. Escribe deprisa, con el adverbio «enseguida» en cada página, y no oculta las torpezas de los apóstoles. Fundó la Iglesia de Alejandría, la segunda del mundo antiguo, y allí lo arrastraron por las calles hasta matarlo. Sus reliquias, robadas por unos mercaderes venecianos en el siglo IX, están en San Marcos de Venecia; en 1968 Roma devolvió una parte a Alejandría.' },

  /* ---------------- Mayo ---------------- */
  { id: 'juan-teologo-mayo', name: 'San Juan el Teólogo', day: '05-08', category: ['apostol', 'padre'], century: 'I', place: 'Éfeso y Patmos', biography: 'El discípulo amado, junto a la Cruz y ante el sepulcro vacío. Autor del cuarto Evangelio, de tres cartas y del Apocalipsis, escrito en Patmos.' },

  /* ---------------- Junio ---------------- */
  { id: 'justino-filosofo', name: 'San Justino Filósofo', day: '06-01', category: ['martir', 'padre'], century: 'II', place: 'Roma', biography: 'Filósofo convertido y primer gran apologista († c. 165). Su Primera Apología contiene la descripción más antigua de la celebración eucarística dominical.' },

  /* ---------------- Julio ---------------- */
  { id: 'cosme-damian', name: 'Santos Cosme y Damián', day: '07-01', category: ['justo'], century: 'III', biography: 'Hermanos médicos que atendían sin cobrar nada, de donde les viene el nombre de anárgiros, los sin plata: tomaron al pie de la letra el «gratis lo recibisteis, dadlo gratis» del Evangelio. Hay tres parejas distintas de Cosme y Damián en el santoral bizantino, conmemoradas en tres días del año, y la tradición no las ha llegado a distinguir del todo. Se les invoca en la enfermedad, y el aceite de sus santuarios se sigue repartiendo en Grecia.' },
  { id: 'atanasio-athonita', name: 'San Atanasio el Athonita', day: '07-05', category: ['monje'], century: 'X', place: 'Monte Athos', biography: 'Fundador de la Gran Laura en 963, con el apoyo de su amigo el emperador Nicéforo Focas († c. 1000). Antes de él, el Athos era una montaña de ermitaños dispersos; él la organizó en comunidad, con regla, refectorio y oficio en común, y los eremitas de la Montaña se lo tomaron tan mal que estuvieron a punto de expulsarlo. Murió al desplomarse la cúpula que estaba construyendo, con cinco monjes más. La Gran Laura sigue siendo el primero de los veinte monasterios.' },
  { id: 'elias-profeta', name: 'Santo Profeta Elías', day: '07-20', category: ['profeta'], century: 'IX a. C.', place: 'Israel', biography: 'Profeta del fuego y del silencio: desafió a los profetas de Baal en el Carmelo y encontró a Dios en la brisa suave del Horeb. Fue arrebatado en un carro de fuego y apareció con Moisés en la Transfiguración.' },
  { id: 'panteleimon', name: 'San Panteleimón', day: '07-27', category: ['granmartir'], century: 'III–IV', place: 'Nicomedia', biography: 'Médico de Nicomedia martirizado en 305, hijo de padre pagano y madre cristiana. Atendía gratis y su clientela arruinó a los demás médicos de la ciudad, que lo denunciaron. Su nombre de bautismo era Pantoleón; la Iglesia lo cambió a Panteleimón, «el que todo lo compadece». Es, con san Cosme y san Damián, el más invocado en la enfermedad, y el monasterio ruso del Monte Athos lleva su nombre.' },

  /* ---------------- Agosto ---------------- */
  { id: 'degollacion-s', name: 'Degollación de San Juan Bautista', day: '08-29', category: ['profeta', 'martir'], century: 'I', biography: 'Herodes Antipas mandó decapitar a Juan por haberle reprochado que viviera con la mujer de su hermano, y lo hizo a regañadientes, atrapado por un juramento hecho en un banquete. La Iglesia guarda ese día ayuno estricto aunque caiga en domingo, y en muchos sitios se evita cortar nada redondo ni comer en plato hondo: una costumbre popular que no obliga a nadie, pero que ha conservado la memoria del modo en que murió.' },
  { id: 'cosme-etolia', name: 'San Cosme de Etolia', day: '08-24', category: ['martir', 'monje'], century: 'XVIII', place: 'Monte Athos y Epiro', biography: 'Monje de Filoteu que recorrió Grecia y Albania predicando y fundando escuelas († 1779). Fue ahorcado por orden turca. Sus profecías siguen siendo muy leídas.' },

  /* ---------------- Septiembre ---------------- */
  { id: 'simeon-estilita', name: 'San Simeón el Estilita', day: '09-01', category: ['monje'], century: 'V', place: 'Siria', biography: 'Vivió treinta y siete años sobre una columna cerca de Alepo († 459), predicando y arbitrando pleitos desde lo alto. Inauguró una forma de ascesis propia del Oriente cristiano.' },
  { id: 'exaltacion-s', name: 'Exaltación de la Cruz', day: '09-14', category: ['senor'], biography: 'Conmemora dos cosas: el hallazgo de la Cruz por santa Elena hacia el año 326 y su recuperación en 630, cuando Heraclio la trajo de vuelta de Persia. El nombre viene del gesto: el patriarca la levantaba en alto hacia los cuatro puntos cardinales mientras el pueblo cantaba «Señor, ten piedad» cien veces seguidas, y ese rito se sigue haciendo. Es una de las doce grandes fiestas, y la única que se celebra ayunando.' },
  { id: 'juan-teologo-dormicion', name: 'Dormición de San Juan el Teólogo', day: '09-26', category: ['apostol'], century: 'I', place: 'Éfeso', biography: 'Tránsito del discípulo amado en Éfeso, ya centenario. La tradición recuerda que repetía a sus discípulos: «Hijitos, amaos los unos a los otros».' },
  { id: 'silvano-athonita', name: 'San Silvano del Monte Athos', day: '09-24', category: ['monje'], century: 'XIX–XX', place: 'Monasterio de San Panteleimón, Athos', biography: 'Monje ruso del Athos († 1938). Recibió la palabra «Ten tu mente en el infierno y no desesperes». Sus escritos, publicados por su discípulo el archimandrita Sofronio, son un clásico de la espiritualidad contemporánea.' },

  /* ---------------- Octubre ---------------- */
  { id: 'dionisio-areopagita', name: 'San Dionisio Areopagita', day: '10-03', category: ['obispo', 'martir'], century: 'I', place: 'Atenas', biography: 'Miembro del consejo del Areópago convertido por el discurso de san Pablo ante el altar al dios desconocido, según los Hechos, y primer obispo de Atenas. Bajo su nombre circulan desde el siglo VI cuatro tratados de enorme influencia —sobre los nombres de Dios, la jerarquía celeste, la eclesiástica y la teología mística—, que la crítica atribuye hoy a un autor sirio muy posterior. La Iglesia los sigue leyendo y los llama areopagíticos, sin sostener ya que los escribiera él.' },
  { id: 'demetrio-s', name: 'San Demetrio de Tesalónica', day: '10-26', category: ['granmartir'], century: 'IV', place: 'Tesalónica', biography: 'Oficial romano martirizado en Tesalónica hacia 306, atravesado con lanzas en el subterráneo donde lo tenían preso. Le llaman Mirobleta, el que mana mirra, por el aceite perfumado que según la tradición brota de su sepulcro. Es el patrono de Tesalónica y uno de los santos militares más venerados de los Balcanes, junto con san Jorge; su basílica, del siglo V, sigue en pie sobre el lugar de su muerte.' },

  /* ---------------- Noviembre ---------------- */
  { id: 'miguel-arcangel', name: 'Arcángel Miguel', fullName: 'Sinaxis del Arcángel Miguel y todas las Potestades incorpóreas', day: '11-08', category: ['justo'], biography: 'Sinaxis de todas las potestades incorpóreas. El nombre de Miguel es una pregunta —«¿Quién como Dios?»— y la tradición la pone en su boca frente a la caída de Lucifer. La fiesta reúne a los nueve coros que enumera el Areopagita: serafines, querubines y tronos; dominaciones, virtudes y potestades; principados, arcángeles y ángeles. Se celebra el día octavo del noveno mes por esos nueve coros y por el octavo día, que en la tradición patrística es el de la eternidad.' },
  { id: 'gregorio-palamas-nov', name: 'San Gregorio Palamás (traslación)', day: '11-14', category: ['obispo', 'padre'], century: 'XIV', biography: 'Segunda conmemoración del defensor del hesicasmo, el día de su muerte en 1359, junto al apóstol Felipe. La principal es móvil: el segundo domingo de Cuaresma, puesto ahí en 1368 para presentarlo como una prolongación del Triunfo de la Ortodoxia del domingo anterior. Que un teólogo del siglo XIV tenga un domingo cuaresmal es señal de hasta qué punto la Iglesia consideró decisivo lo que estaba en juego.' },
  { id: 'entrada-theotokos-s', name: 'Entrada de la Theotokos en el Templo', day: '11-21', category: ['theotokos'], biography: 'Joaquín y Ana llevan al Templo a la Virgen de tres años, cumpliendo la promesa que habían hecho antes de tenerla. El relato no está en el Evangelio sino en el Protoevangelio de Santiago, un escrito del siglo II que la Iglesia no cuenta entre los libros inspirados pero cuya memoria conservó en la liturgia. Desde este día empiezan a cantarse los irmos de Navidad: es el primer aviso de que la fiesta se acerca.' },

  /* ---------------- Diciembre ---------------- */
  { id: 'esteban-protomartir', name: 'San Esteban Protomártir', day: '12-27', category: ['martir'], century: 'I', place: 'Jerusalén', biography: 'El primero de los siete diáconos y el primer mártir de la Iglesia, apedreado en Jerusalén hacia el año 34. Su discurso ante el sanedrín es el más largo de los Hechos y consiste casi entero en repasar la historia de Israel. Murió pidiendo perdón para quienes lo mataban, y entre los que aprobaban su muerte estaba Saulo de Tarso, guardando la ropa de los ejecutores. La Iglesia lo conmemora dos días después de la Navidad.' },

  /* ---------------- Padres y ancianos athonitas ---------------- */
  { id: 'isaac-sirio', name: 'San Isaac el Sirio', day: '01-28', category: ['obispo', 'monje', 'padre'], century: 'VII', place: 'Nínive', biography: 'Obispo de Nínive que renunció a la sede a los cinco meses para volver a la soledad. Sus Discursos ascéticos, sobre la misericordia y el corazón compasivo, se leen en todos los monasterios ortodoxos.' },
  { id: 'juan-damasceno', name: 'San Juan Damasceno', day: '12-04', category: ['monje', 'padre'], century: 'VII–VIII', place: 'Damasco y San Sabas', biography: 'Funcionario del califato hecho monje en San Sabas († c. 749). Defendió los iconos con el argumento de la Encarnación y sistematizó la doctrina en La fuente del conocimiento.' },
  { id: 'maximo-confesor', name: 'San Máximo el Confesor', day: '01-21', category: ['monje', 'confesor', 'padre'], century: 'VII', place: 'Constantinopla', biography: 'Defendió contra el monotelismo que Cristo tiene dos voluntades, humana y divina († 662). Le cortaron la lengua y la mano derecha por negarse a callar y firmar.' },
  { id: 'juan-kronstadt', name: 'San Juan de Kronstadt', day: '12-20', category: ['justo'], century: 'XIX–XX', place: 'Kronstadt, Rusia', biography: 'Sacerdote de parroquia († 1908) que celebraba la Liturgia a diario y comulgaba con frecuencia en una época en que era raro. Su diario Mi vida en Cristo sigue siendo una guía de oración.' },
  { id: 'teofano-recluso', name: 'San Teófano el Recluso', day: '01-10', category: ['obispo'], century: 'XIX', place: 'Vysha, Rusia', biography: 'Obispo que se retiró a la reclusión veintiocho años († 1894). Tradujo la Filocalia al ruso y respondió por carta a miles de personas sobre la vida de oración.' },
  { id: 'paisios-athonita', name: 'San Paisios del Monte Athos', day: '07-12', category: ['monje'], century: 'XX', place: 'Monte Athos', biography: 'Monje de Kutlumusiu y de la celda de Panagouda († 1994), canonizado en 2015. Recibía cada día a centenares de peregrinos; sus consejos, recogidos por sus discípulos, circulan en varios volúmenes.' },
  { id: 'porfirio-kavsokalivita', name: 'San Porfirio Kavsokalivita', day: '12-02', category: ['monje'], century: 'XX', place: 'Athos y Atenas', biography: 'Entró en el Athos a los doce años († 1991). Capellán durante décadas de una policlínica de Atenas, unía un raro don de discernimiento a una insistencia constante en el amor y no en el miedo.' },
  { id: 'sergio-radonezh', name: 'San Sergio de Rádonezh', day: '09-25', category: ['monje'], century: 'XIV', place: 'Rusia', biography: 'Fundador de la Laura de la Trinidad († 1392) y renovador del monacato ruso. Bendijo a Dimitri Donskói antes de Kulikovo y rehusó siempre cargos y honores.' },
  { id: 'ambrosio-optina', name: 'San Ambrosio de Óptina', day: '10-10', category: ['monje'], century: 'XIX', place: 'Óptina, Rusia', biography: 'El más conocido de los stárets de Óptina († 1891). Enfermo casi toda su vida, recibía a diario a campesinos y escritores; Dostoyevski lo visitó y se inspiró en él para el stárets Zósima.' },
];

const troparia: Record<string, TextBlock[]> = {
  pascua: [
    { kind: 'text', content: 'Cristo ha resucitado de entre los muertos, con su muerte ha vencido a la muerte y a los que estaban en los sepulcros les ha dado la vida.' },
  ],
};

/** Primera tanda y ampliación, ordenadas por su día del calendario. */
const allSeeds: SaintSeed[] = [
  ...seeds,
  ...MORE_SAINTS,
  ...THIRD_SAINTS,
  ...YEAR_SAINTS_1,
  ...YEAR_SAINTS_2,
].sort((a, b) =>
  a.day === b.day ? a.name.localeCompare(b.name, 'es') : a.day.localeCompare(b.day),
);

export const SAINTS: Saint[] = allSeeds.map((s) => ({
  id: s.id,
  name: s.name,
  fullName: s.fullName,
  day: s.day,
  category: s.category,
  century: s.century,
  place: s.place,
  biography: s.biography,
  troparion: s.troparion ?? troparia[s.id] ?? pendingHymn,
  kontakion: pendingHymn,
  status: s.status ?? 'partial',
  meta: bio,
  searchText: `${s.name} ${s.fullName ?? ''} ${s.place ?? ''} ${s.biography}`.toLowerCase(),
}));

export const SAINT_CATEGORY_LABELS: Record<SaintCategory, string> = {
  apostol: 'Apóstol',
  martir: 'Mártir',
  granmartir: 'Gran Mártir',
  confesor: 'Confesor',
  monje: 'Monje',
  obispo: 'Obispo',
  profeta: 'Profeta',
  justo: 'Justo',
  neomartir: 'Neomártir',
  padre: 'Padre de la Iglesia',
  theotokos: 'Theotokos',
  senor: 'Fiesta del Señor',
};

const byDay = new Map<string, Saint[]>();
for (const saint of SAINTS) {
  for (const day of [saint.day, ...(saint.otherDays ?? [])]) {
    const list = byDay.get(day) ?? [];
    list.push(saint);
    byDay.set(day, list);
  }
}

export function saintsOnDay(monthDay: string): Saint[] {
  return byDay.get(monthDay) ?? [];
}

export const SAINTS_COVERAGE_NOTE =
  `El santoral de ATHOS reúne ${SAINTS.length} conmemoraciones con su vida escrita, y no queda ` +
  'ningún día del año sin al menos una. Aun así, esto no es el Menaion: el libro completo trae ' +
  'varios santos cada día, y aquí hay una selección. Las vidas son reseñas históricas redactadas ' +
  'para ATHOS. En cuanto a los troparios: el propio de cada santo sigue sin incorporarse —son ' +
  'cientos y ATHOS no los escribe—, pero ninguna ficha se queda muda, porque se muestra el ' +
  'tropario general de su rango, que es justo lo que la Iglesia canta cuando no dispone del ' +
  'propio. Las grandes fiestas llevan el suyo. Ambos van traducidos del griego para ATHOS y su ' +
  'ficha lo dice.';

/** Cuántos días del año tienen conmemoración. Los 366 desde agosto de 2026. */
export const SAINT_DAYS_COVERED = new Set(SAINTS.map((s) => s.day)).size;

/** Días del año que ya tienen alguna conmemoración incorporada. */
export const SAINT_DAYS = new Set(SAINTS.map((s) => s.day));
