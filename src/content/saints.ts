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
  { id: 'cuarenta-martires', name: 'Los Cuarenta Mártires de Sebaste', day: '03-09', category: ['martir'], century: 'IV', place: 'Sebaste, Armenia', biography: 'Cuarenta soldados cristianos condenados a morir de frío sobre un lago helado el año 320. Uno flaqueó; un guardia ocupó su lugar al ver las coronas descender sobre ellos.' },
  { id: 'gregorio-palamas', name: 'San Gregorio Palamás', day: '03-14', category: ['obispo', 'padre'], century: 'XIV', place: 'Monte Athos y Tesalónica', biography: 'Monje athonita y arzobispo de Tesalónica († 1359). Defendió a los hesicastas explicando la distinción entre la esencia de Dios, inaccesible, y sus energías increadas, en las que el hombre participa realmente.' },
  { id: 'anunciacion-s', name: 'Anunciación de la Theotokos', day: '03-25', category: ['theotokos'], biography: 'El arcángel Gabriel anuncia a la Virgen la encarnación del Verbo. La fiesta se celebra siempre, incluso el Viernes Santo.' },

  /* ---------------- Abril ---------------- */
  { id: 'maria-egipciaca', name: 'Santa María Egipcíaca', day: '04-01', category: ['justo'], century: 'V–VI', place: 'Desierto de Jordania', biography: 'Vivió en Alejandría entregada al desenfreno hasta que una fuerza invisible le impidió entrar en la iglesia del Santo Sepulcro. Tras arrepentirse pasó cuarenta y siete años sola en el desierto. Su vida se lee íntegra durante la Gran Cuaresma.' },
  { id: 'juan-escala', name: 'San Juan Clímaco', day: '03-30', category: ['monje'], century: 'VI–VII', place: 'Monte Sinaí', biography: 'Abad del Sinaí († c. 649). Su Escala Santa describe treinta peldaños de ascenso espiritual y es lectura obligada de los monasterios durante la Cuaresma.' },
  { id: 'jorge-trofeoforo', name: 'San Jorge el Trofeóforo', day: '04-23', category: ['granmartir'], century: 'IV', place: 'Capadocia y Lida', biography: 'Oficial del ejército de Diocleciano que confesó públicamente su fe y fue martirizado el año 303. Patrón de numerosos pueblos cristianos.' },
  { id: 'marcos-evangelista', name: 'San Marcos Evangelista', day: '04-25', category: ['apostol'], century: 'I', place: 'Alejandría', biography: 'Discípulo de San Pedro y autor del segundo Evangelio. Fundó la Iglesia de Alejandría, donde sufrió el martirio.' },

  /* ---------------- Mayo ---------------- */
  { id: 'juan-teologo-mayo', name: 'San Juan el Teólogo', day: '05-08', category: ['apostol', 'padre'], century: 'I', place: 'Éfeso y Patmos', biography: 'El discípulo amado, junto a la Cruz y ante el sepulcro vacío. Autor del cuarto Evangelio, de tres cartas y del Apocalipsis, escrito en Patmos.' },
  { id: 'constantino-elena-s', name: 'Santos Constantino y Elena', day: '05-21', category: ['justo'], century: 'IV', place: 'Constantinopla y Jerusalén', biography: 'El emperador que dio la paz a la Iglesia con el Edicto de Milán y convocó el Concilio de Nicea, y su madre, que halló en Jerusalén la Preciosa Cruz.' },

  /* ---------------- Junio ---------------- */
  { id: 'justino-filosofo', name: 'San Justino Filósofo', day: '06-01', category: ['martir', 'padre'], century: 'II', place: 'Roma', biography: 'Filósofo convertido y primer gran apologista († c. 165). Su Primera Apología contiene la descripción más antigua de la celebración eucarística dominical.' },
  { id: 'juan-bautista-natividad', name: 'Natividad de San Juan Bautista', day: '06-24', category: ['profeta'], century: 'I', biography: 'Nacimiento del Precursor, anunciado a Zacarías en el Templo. Se celebra seis meses antes de la Natividad de Cristo, como indica el Evangelio de Lucas.' },
  { id: 'pedro-pablo-s', name: 'Santos Apóstoles Pedro y Pablo', day: '06-29', category: ['apostol'], century: 'I', place: 'Roma', biography: 'Los coribeos de los Apóstoles, martirizados en Roma bajo Nerón: Pedro crucificado cabeza abajo, Pablo decapitado por ser ciudadano romano.' },

  /* ---------------- Julio ---------------- */
  { id: 'cosme-damian', name: 'Santos Cosme y Damián', day: '07-01', category: ['justo'], century: 'III', biography: 'Médicos anargiros: curaban sin cobrar, «gratis lo recibisteis, dadlo gratis». Muy invocados en la enfermedad.' },
  { id: 'atanasio-athonita', name: 'San Atanasio el Athonita', day: '07-05', category: ['monje'], century: 'X', place: 'Monte Athos', biography: 'Fundador de la Gran Laura el año 963, primer monasterio cenobítico del Monte Athos y cabeza de los veinte que hoy lo forman.' },
  { id: 'elias-profeta', name: 'Santo Profeta Elías', day: '07-20', category: ['profeta'], century: 'IX a. C.', place: 'Israel', biography: 'Profeta del fuego y del silencio: desafió a los profetas de Baal en el Carmelo y encontró a Dios en la brisa suave del Horeb. Fue arrebatado en un carro de fuego y apareció con Moisés en la Transfiguración.' },
  { id: 'panteleimon', name: 'San Panteleimón', day: '07-27', category: ['granmartir'], century: 'III–IV', place: 'Nicomedia', biography: 'Médico de Nicomedia martirizado el año 305. Anargiro y sanador; el monasterio ruso del Monte Athos lleva su nombre.' },

  /* ---------------- Agosto ---------------- */
  { id: 'transfiguracion-s', name: 'Transfiguración del Señor', day: '08-06', category: ['senor'], biography: 'En el Tabor, Cristo muestra a Pedro, Santiago y Juan la luz increada de su divinidad. Fundamento escriturístico de la teología hesicasta.' },
  { id: 'dormicion-s', name: 'Dormición de la Theotokos', day: '08-15', category: ['theotokos'], biography: 'La Madre de Dios entrega su alma en manos de su Hijo, rodeada de los Apóstoles reunidos milagrosamente. Culmina el ayuno de catorce días.' },
  { id: 'degollacion-s', name: 'Degollación de San Juan Bautista', day: '08-29', category: ['profeta', 'martir'], century: 'I', biography: 'Herodes hizo decapitar al Precursor por reprender su adulterio. Día de ayuno estricto en toda la Iglesia.' },
  { id: 'cosme-etolia', name: 'San Cosme de Etolia', day: '08-24', category: ['martir', 'monje'], century: 'XVIII', place: 'Monte Athos y Epiro', biography: 'Monje de Filoteu que recorrió Grecia y Albania predicando y fundando escuelas († 1779). Fue ahorcado por orden turca. Sus profecías siguen siendo muy leídas.' },

  /* ---------------- Septiembre ---------------- */
  { id: 'simeon-estilita', name: 'San Simeón el Estilita', day: '09-01', category: ['monje'], century: 'V', place: 'Siria', biography: 'Vivió treinta y siete años sobre una columna cerca de Alepo († 459), predicando y arbitrando pleitos desde lo alto. Inauguró una forma de ascesis propia del Oriente cristiano.' },
  { id: 'natividad-theotokos-s', name: 'Natividad de la Theotokos', day: '09-08', category: ['theotokos'], biography: 'Nacimiento de la Virgen María, hija de Joaquín y Ana, ancianos y sin hijos. Primera de las grandes fiestas del año eclesiástico, que comienza el 1 de septiembre.' },
  { id: 'exaltacion-s', name: 'Exaltación de la Cruz', day: '09-14', category: ['senor'], biography: 'Conmemora el hallazgo de la Cruz por Santa Elena y su elevación ante el pueblo por el patriarca Macario. Día de ayuno.' },
  { id: 'juan-teologo-dormicion', name: 'Dormición de San Juan el Teólogo', day: '09-26', category: ['apostol'], century: 'I', place: 'Éfeso', biography: 'Tránsito del discípulo amado en Éfeso, ya centenario. La tradición recuerda que repetía a sus discípulos: «Hijitos, amaos los unos a los otros».' },
  { id: 'silvano-athonita', name: 'San Silvano del Monte Athos', day: '09-24', category: ['monje'], century: 'XIX–XX', place: 'Monasterio de San Panteleimón, Athos', biography: 'Monje ruso del Athos († 1938). Recibió la palabra «Ten tu mente en el infierno y no desesperes». Sus escritos, publicados por su discípulo el archimandrita Sofronio, son un clásico de la espiritualidad contemporánea.' },

  /* ---------------- Octubre ---------------- */
  { id: 'proteccion-s', name: 'Protección de la Theotokos', day: '10-01', category: ['theotokos'], century: 'X', place: 'Constantinopla', biography: 'San Andrés el Loco por Cristo vio en las Blaquernas a la Madre de Dios extendiendo su velo sobre los fieles. La fiesta es especialmente querida en las Iglesias eslavas.' },
  { id: 'dionisio-areopagita', name: 'San Dionisio Areopagita', day: '10-03', category: ['obispo', 'martir'], century: 'I', place: 'Atenas', biography: 'Miembro del Areópago convertido por la predicación de San Pablo (Hch 17). Primer obispo de Atenas.' },
  { id: 'lucas-evangelista', name: 'San Lucas Evangelista', day: '10-18', category: ['apostol'], century: 'I', biography: 'Médico y compañero de San Pablo, autor del tercer Evangelio y de los Hechos. La tradición le atribuye los primeros iconos de la Theotokos.' },
  { id: 'demetrio-s', name: 'San Demetrio de Tesalónica', day: '10-26', category: ['granmartir'], century: 'IV', place: 'Tesalónica', biography: 'Mirobléta, «el que mana mirra». Oficial romano martirizado bajo Galerio; patrón de Tesalónica y de los Balcanes.' },

  /* ---------------- Noviembre ---------------- */
  { id: 'miguel-arcangel', name: 'Arcángel Miguel', fullName: 'Sinaxis del Arcángel Miguel y todas las Potestades incorpóreas', day: '11-08', category: ['justo'], biography: 'Jefe de las milicias celestiales, cuyo nombre significa «¿Quién como Dios?». La fiesta reúne a los nueve coros angélicos.' },
  { id: 'juan-crisostomo', name: 'San Juan Crisóstomo', day: '11-13', category: ['obispo', 'padre'], century: 'IV–V', place: 'Antioquía y Constantinopla', biography: 'Arzobispo de Constantinopla († 407), llamado «Boca de oro» por su predicación. Desterrado dos veces por denunciar los abusos de la corte, murió camino del exilio diciendo «Gloria a Dios por todas las cosas». Su Divina Liturgia es la que se celebra habitualmente.' },
  { id: 'gregorio-palamas-nov', name: 'San Gregorio Palamás (traslación)', day: '11-14', category: ['obispo', 'padre'], century: 'XIV', biography: 'Segunda conmemoración del defensor del hesicasmo, junto al apóstol Felipe. La principal se celebra el segundo domingo de Cuaresma.' },
  { id: 'entrada-theotokos-s', name: 'Entrada de la Theotokos en el Templo', day: '11-21', category: ['theotokos'], biography: 'La Virgen niña es presentada en el Templo por sus padres. En esta fiesta comienzan a cantarse los irmos de Navidad.' },
  { id: 'andres-primerllamado', name: 'San Andrés el Primer Llamado', day: '11-30', category: ['apostol'], century: 'I', place: 'Patras', biography: 'Primero en seguir a Cristo y en llevar a su hermano Pedro. Predicó en Escitia y Bizancio; fue crucificado en Patras sobre una cruz en aspa. Patrón del Patriarcado Ecuménico.' },

  /* ---------------- Diciembre ---------------- */
  { id: 'nicolas-s', name: 'San Nicolás de Mira', day: '12-06', category: ['obispo'], century: 'IV', place: 'Mira de Licia', biography: 'Obispo de Mira († c. 343), célebre por su misericordia silenciosa con los pobres y por su firmeza en Nicea. Es, después de la Theotokos, el santo con más iglesias dedicadas en Oriente.' },
  { id: 'espiridon', name: 'San Espiridón de Trimitonte', day: '12-12', category: ['obispo'], century: 'IV', place: 'Chipre y Corfú', biography: 'Pastor de ovejas hecho obispo, participó en el Concilio de Nicea, donde explicó la Trinidad con un ladrillo. Sus reliquias incorruptas se veneran en Corfú.' },
  { id: 'natividad-s', name: 'Natividad de Cristo', day: '12-25', category: ['senor'], biography: 'El Verbo se hace carne en Belén. La fiesta va precedida de cuarenta días de ayuno y seguida de doce días sin ayuno hasta la Teofanía.' },
  { id: 'esteban-protomartir', name: 'San Esteban Protomártir', day: '12-27', category: ['martir'], century: 'I', place: 'Jerusalén', biography: 'Primero de los siete diáconos y primer mártir. Apedreado ante Saulo de Tarso, murió orando por sus verdugos.' },

  /* ---------------- Padres y ancianos athonitas ---------------- */
  { id: 'isaac-sirio', name: 'San Isaac el Sirio', day: '01-28', category: ['obispo', 'monje', 'padre'], century: 'VII', place: 'Nínive', biography: 'Obispo de Nínive que renunció a la sede a los cinco meses para volver a la soledad. Sus Discursos ascéticos, sobre la misericordia y el corazón compasivo, se leen en todos los monasterios ortodoxos.' },
  { id: 'juan-damasceno', name: 'San Juan Damasceno', day: '12-04', category: ['monje', 'padre'], century: 'VII–VIII', place: 'Damasco y San Sabas', biography: 'Funcionario del califato hecho monje en San Sabas († c. 749). Defendió los iconos con el argumento de la Encarnación y sistematizó la doctrina en La fuente del conocimiento.' },
  { id: 'maximo-confesor', name: 'San Máximo el Confesor', day: '01-21', category: ['monje', 'confesor', 'padre'], century: 'VII', place: 'Constantinopla', biography: 'Defendió contra el monotelismo que Cristo tiene dos voluntades, humana y divina († 662). Le cortaron la lengua y la mano derecha por negarse a callar y firmar.' },
  { id: 'juan-kronstadt', name: 'San Juan de Kronstadt', day: '12-20', category: ['justo'], century: 'XIX–XX', place: 'Kronstadt, Rusia', biography: 'Sacerdote de parroquia († 1908) que celebraba la Liturgia a diario y comulgaba con frecuencia en una época en que era raro. Su diario Mi vida en Cristo sigue siendo una guía de oración.' },
  { id: 'teofano-recluso', name: 'San Teófano el Recluso', day: '01-10', category: ['obispo'], century: 'XIX', place: 'Vysha, Rusia', biography: 'Obispo que se retiró a la reclusión veintiocho años († 1894). Tradujo la Filocalia al ruso y respondió por carta a miles de personas sobre la vida de oración.' },
  { id: 'paisios-athonita', name: 'San Paisios del Monte Athos', day: '07-12', category: ['monje'], century: 'XX', place: 'Monte Athos', biography: 'Monje de Kutlumusiu y de la celda de Panagouda († 1994), canonizado en 2015. Recibía cada día a centenares de peregrinos; sus consejos, recogidos por sus discípulos, circulan en varios volúmenes.' },
  { id: 'porfirio-kavsokalivita', name: 'San Porfirio Kavsokalivita', day: '12-02', category: ['monje'], century: 'XX', place: 'Athos y Atenas', biography: 'Entró en el Athos a los doce años († 1991). Capellán durante décadas de una policlínica de Atenas, unía un raro don de discernimiento a una insistencia constante en el amor y no en el miedo.' },
  { id: 'nectario-egina', name: 'San Nectario de Egina', day: '11-09', category: ['obispo'], century: 'XIX–XX', place: 'Egina, Grecia', biography: 'Metropolita de Pentápolis († 1920), calumniado y apartado, aceptó la humillación en silencio y fundó el monasterio de Egina. Canonizado en 1961; uno de los santos más venerados de Grecia.' },
  { id: 'sergio-radonezh', name: 'San Sergio de Rádonezh', day: '09-25', category: ['monje'], century: 'XIV', place: 'Rusia', biography: 'Fundador de la Laura de la Trinidad († 1392) y renovador del monacato ruso. Bendijo a Dimitri Donskói antes de Kulikovo y rehusó siempre cargos y honores.' },
  { id: 'ambrosio-optina', name: 'San Ambrosio de Óptina', day: '10-10', category: ['monje'], century: 'XIX', place: 'Óptina, Rusia', biography: 'El más conocido de los stárets de Óptina († 1891). Enfermo casi toda su vida, recibía a diario a campesinos y escritores; Dostoyevski lo visitó y se inspiró en él para el stárets Zósima.' },
];

const troparia: Record<string, TextBlock[]> = {
  pascua: [
    { kind: 'text', content: 'Cristo ha resucitado de entre los muertos, con su muerte ha vencido a la muerte y a los que estaban en los sepulcros les ha dado la vida.' },
  ],
};

/** Primera tanda y ampliación, ordenadas por su día del calendario. */
const allSeeds: SaintSeed[] = [...seeds, ...MORE_SAINTS, ...THIRD_SAINTS].sort((a, b) =>
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
  `El santoral de ATHOS reúne ${SAINTS.length} conmemoraciones con su vida escrita. El Menaion ` +
  'completo tiene varias por día y puede añadirse importando datos desde Configuración → Datos.';

/** Días del año que ya tienen alguna conmemoración incorporada. */
export const SAINT_DAYS = new Set(SAINTS.map((s) => s.day));
