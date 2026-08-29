/**
 * Padres de la Iglesia.
 *
 * Las obras patrísticas son de dominio público en su original griego, siríaco o
 * latino, pero no todas las traducciones españolas lo son. ATHOS incorpora la
 * ficha completa de cada autor y de cada obra, y sólo aquellos pasajes breves
 * cuya versión española es de uso común y verificable. El resto queda pendiente.
 */
import type { ChurchFather, FatherWork, SourceMeta, TextBlock } from '@/types';
import { CAUTION, READING, TEACHING, WORK_SUMMARY } from './fathers-teaching';
import { MORE_FATHERS } from './fathers-more';
import {
  CAUTION_MORE,
  READING_MORE,
  TEACHING_MORE,
  WORK_SUMMARY_MORE,
} from './fathers-teaching-more';

/** Las dos tandas, consultadas como una sola. */
const teaching: Record<string, string[]> = { ...TEACHING, ...TEACHING_MORE };
const reading: Record<string, string> = { ...READING, ...READING_MORE };
const caution: Record<string, string> = { ...CAUTION, ...CAUTION_MORE };
const summaries: Record<string, { summary: string; written?: string }> = {
  ...WORK_SUMMARY,
  ...WORK_SUMMARY_MORE,
};

const bioMeta: SourceMeta = {
  source: 'Reseña redactada para ATHOS a partir de fuentes patrísticas comunes',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
};

const quoteMeta = (author: string, work: string): SourceMeta => ({
  author,
  title: work,
  source: `${work}. Original de dominio público.`,
  language: 'es',
  license: 'traditional',
  dateAdded: '2026-01-01',
  notes: 'Pasaje breve de uso corriente en español.',
});

const pendingMeta = (author: string, work: string): SourceMeta => ({
  author,
  title: work,
  source: `${work}. Original de dominio público; traducción española pendiente de incorporar con licencia compatible.`,
  language: 'es',
  license: 'pending',
  dateAdded: '2026-01-01',
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const PENDING: TextBlock[] = [{ kind: 'pending', content: 'Contenido pendiente de incorporar.' }];

const work = (
  id: string,
  title: string,
  kind: FatherWork['kind'],
  author: string,
  blocks?: TextBlock[],
): FatherWork => ({
  id,
  title,
  kind,
  blocks: blocks ?? PENDING,
  status: blocks ? 'partial' : 'pending',
  meta: blocks ? quoteMeta(author, title) : pendingMeta(author, title),
  // De qué trata la obra. Es lo que ATHOS puede dar mientras no pueda dar el
  // texto: una ficha que al menos dice qué se está echando de menos.
  ...summaries[id],
});

interface FatherSeed {
  id: string;
  name: string;
  fullName: string;
  century: string;
  feastDay?: string;
  biography: string;
  works: FatherWork[];
}

const seeds: FatherSeed[] = [
  {
    id: 'juan-crisostomo',
    name: 'San Juan Crisóstomo',
    fullName: 'San Juan Crisóstomo, arzobispo de Constantinopla',
    century: 'siglos IV-V',
    feastDay: '11-13',
    biography:
      'Nació en Antioquía hacia el 347 y se formó en retórica con el pagano Libanio, que decía que habría sido su sucesor «si los cristianos no nos lo hubieran robado». Tras años de ascesis en las montañas, volvió arruinado de salud y fue ordenado sacerdote. Su predicación en Antioquía le valió el sobrenombre de Crisóstomo, «boca de oro». Llevado casi por la fuerza a la sede de Constantinopla en el 398, chocó con la corte al denunciar el lujo y la injusticia. Desterrado dos veces, murió camino del exilio en el 407 diciendo: «Gloria a Dios por todas las cosas».',
    works: [
      work('crisostomo-catequesis-pascual', 'Homilía catequética pascual', 'homilia', 'San Juan Crisóstomo', [
        rub('Se lee en todas las iglesias ortodoxas en la noche de Pascua.'),
        t('Si alguno es piadoso y amante de Dios, que goce de esta bella y luminosa fiesta. Si alguno es siervo agradecido, que entre gozoso en el gozo de su Señor.'),
        t('Si alguno se ha fatigado con el ayuno, que reciba ahora su recompensa. Si alguno ha trabajado desde la primera hora, que reciba hoy su justa paga. Si alguno llegó después de la tercera, que celebre agradecido. Si alguno llegó después de la sexta, que no dude, porque nada perderá. Si alguno se retrasó hasta la novena, que se acerque sin vacilar. Y si alguno llegó a la undécima hora, que no tema su tardanza.'),
        t('Porque el Señor es generoso: recibe al último igual que al primero; da descanso al de la undécima hora lo mismo que al que trabajó desde la primera. Del último se compadece y al primero cuida; a aquél le da y a éste le regala; recibe las obras y acoge la intención; honra la acción y alaba el propósito.'),
        t('Que nadie llore su pobreza, porque se ha manifestado el Reino común. Que nadie se lamente de sus pecados, porque del sepulcro ha brotado el perdón. Que nadie tema a la muerte, porque nos ha liberado la muerte del Salvador.'),
        t('¿Dónde está, muerte, tu aguijón? ¿Dónde está, infierno, tu victoria? Resucitó Cristo, y tú has sido derribado. Resucitó Cristo, y han caído los demonios. Resucitó Cristo, y se alegran los ángeles. Resucitó Cristo, y reina la vida. Resucitó Cristo, y ni un muerto queda en el sepulcro.'),
        t('A Él la gloria y el poder por los siglos de los siglos. Amén.'),
      ]),
      work('crisostomo-homilias-mateo', 'Homilías sobre el Evangelio de san Mateo', 'homilia', 'San Juan Crisóstomo'),
      work('crisostomo-sacerdocio', 'Sobre el sacerdocio', 'tratado', 'San Juan Crisóstomo'),
      work('crisostomo-estatuas', 'Homilías sobre las estatuas', 'homilia', 'San Juan Crisóstomo'),
    ],
  },
  {
    id: 'basilio-magno',
    name: 'San Basilio el Grande',
    fullName: 'San Basilio el Grande, arzobispo de Cesarea de Capadocia',
    century: 'siglo IV',
    feastDay: '01-01',
    biography:
      'Nacido hacia el 330 en una familia que dio varios santos, estudió en Atenas junto a Gregorio Nacianceno. Renunció a la carrera pública para hacerse monje y recorrió los monasterios de Egipto y Siria. Sus Reglas ordenaron el monacato oriental en torno a la vida común y el trabajo. Como arzobispo levantó a las afueras de Cesarea la Basiliada, un complejo de hospital, hospedería y talleres para pobres y leprosos que Gregorio llamó «una ciudad nueva». Murió en el 379, agotado a los cuarenta y nueve años.',
    works: [
      work('basilio-espiritu-santo', 'Sobre el Espíritu Santo', 'tratado', 'San Basilio el Grande'),
      work('basilio-hexameron', 'Homilías sobre el Hexamerón', 'homilia', 'San Basilio el Grande'),
      work('basilio-reglas', 'Reglas monásticas', 'tratado', 'San Basilio el Grande'),
    ],
  },
  {
    id: 'gregorio-nacianceno',
    name: 'San Gregorio Nacianceno',
    fullName: 'San Gregorio el Teólogo, arzobispo de Constantinopla',
    century: 'siglo IV',
    feastDay: '01-25',
    biography:
      'Amigo de Basilio desde los años de Atenas, tenía un temperamento opuesto: retraído, poeta, incapaz de gobernar. Llegó a Constantinopla cuando la ciudad estaba casi enteramente en manos arrianas y predicó en una capilla doméstica los cinco Discursos teológicos que fijaron el lenguaje trinitario de la Iglesia. Presidió brevemente el Concilio de 381 y dimitió en cuanto su elección fue discutida, para volver a la soledad y a los versos. Murió hacia el 390.',
    works: [
      work('gregorio-discursos-teologicos', 'Los cinco Discursos teológicos', 'tratado', 'San Gregorio Nacianceno'),
      work('gregorio-poemas', 'Poemas autobiográficos', 'sentencias', 'San Gregorio Nacianceno'),
    ],
  },
  {
    id: 'atanasio',
    name: 'San Atanasio el Grande',
    fullName: 'San Atanasio, arzobispo de Alejandría',
    century: 'siglo IV',
    feastDay: '01-18',
    biography:
      'Diácono aún joven en el Concilio de Nicea, dedicó cuarenta y cinco años de episcopado a defender que el Hijo es consustancial al Padre. Pasó diecisiete de ellos en cinco destierros; en uno se escondió entre los monjes del desierto, y de allí salió la Vida de Antonio, el libro que llevó el monacato a todo el Imperio. Murió en Alejandría el 373.',
    works: [
      work('atanasio-encarnacion', 'Sobre la Encarnación del Verbo', 'tratado', 'San Atanasio', [
        t('Se hizo hombre para que nosotros fuésemos hechos Dios; se manifestó en un cuerpo para que recibiéramos idea del Padre invisible; soportó la injuria de los hombres para que heredásemos la incorrupción.'),
        rub('Sobre la Encarnación del Verbo, 54. El resto de la obra está pendiente de incorporar.'),
      ]),
      work('atanasio-vida-antonio', 'Vida de san Antonio', 'tratado', 'San Atanasio'),
    ],
  },
  {
    id: 'maximo-confesor',
    name: 'San Máximo el Confesor',
    fullName: 'San Máximo el Confesor',
    century: 'siglo VII',
    feastDay: '01-21',
    biography:
      'Alto funcionario de la corte imperial que dejó el cargo para hacerse monje. Cuando el poder impuso el monotelismo —una voluntad sola en Cristo— para reconciliar a los disidentes, Máximo, simple monje sin dignidad eclesiástica, se opuso solo frente al emperador y al patriarca. Lo juzgaron, le cortaron la lengua y la mano derecha y lo desterraron al Cáucaso, donde murió en el 662. El Sexto Concilio Ecuménico le dio la razón dieciocho años después.',
    works: [
      work('maximo-caridad', 'Centurias sobre la caridad', 'sentencias', 'San Máximo el Confesor', [
        t('La caridad es una buena disposición del alma, por la cual no antepone nada al conocimiento de Dios.'),
        rub('Centurias sobre la caridad I, 1. El resto de la obra está pendiente de incorporar.'),
      ]),
      work('maximo-mistagogia', 'Mistagogia', 'tratado', 'San Máximo el Confesor'),
      work('maximo-ambigua', 'Ambigua', 'tratado', 'San Máximo el Confesor'),
    ],
  },
  {
    id: 'juan-damasceno',
    name: 'San Juan Damasceno',
    fullName: 'San Juan Damasceno, monje de San Sabas',
    century: 'siglos VII-VIII',
    feastDay: '12-04',
    biography:
      'Vivió en Damasco bajo dominio musulmán, donde su familia servía en la administración del califato. Precisamente por estar fuera del alcance del emperador iconoclasta pudo escribir los tres Discursos en defensa de los iconos, cuyo argumento es la Encarnación: lo que se hizo visible puede representarse. Se retiró al monasterio de San Sabas, junto a Jerusalén, donde compuso himnos que aún se cantan, entre ellos el Canon Pascual. Murió hacia el 749.',
    works: [
      work('damasceno-iconos', 'Discursos en defensa de los santos iconos', 'tratado', 'San Juan Damasceno', [
        t('No adoro a la materia, sino que adoro al Creador de la materia, que se hizo materia por mí y por medio de la materia obró mi salvación.'),
        rub('Primer discurso en defensa de los iconos, 16. El resto de la obra está pendiente de incorporar.'),
      ]),
      work('damasceno-fe-ortodoxa', 'Exposición exacta de la fe ortodoxa', 'tratado', 'San Juan Damasceno'),
    ],
  },
  {
    id: 'isaac-sirio',
    name: 'San Isaac el Sirio',
    fullName: 'San Isaac de Nínive',
    century: 'siglo VII',
    feastDay: '01-28',
    biography:
      'Monje de la región del golfo Pérsico, fue nombrado obispo de Nínive y renunció a los cinco meses para volver a la montaña. Escribió en siríaco unos discursos sobre la vida interior que, traducidos al griego en el monasterio de San Sabas, se convirtieron en lectura obligada de todo el monacato ortodoxo. Su tema constante es la misericordia de Dios, que a su juicio desborda cualquier medida humana de justicia.',
    works: [
      work('isaac-discursos', 'Discursos ascéticos', 'tratado', 'San Isaac el Sirio', [
        t('¿Y qué es un corazón misericordioso? Es un corazón que arde de amor por toda la creación: por los hombres, por las aves, por los animales, por los demonios, por toda criatura. Al recordarlos y contemplarlos, sus ojos derraman lágrimas. Por la fuerza de la compasión, su corazón se estremece y no soporta oír ni ver el menor daño ni el más pequeño dolor sufrido por una criatura.'),
        rub('Discurso 71. El resto de la obra está pendiente de incorporar.'),
      ]),
    ],
  },
  {
    id: 'gregorio-palamas',
    name: 'San Gregorio Palamás',
    fullName: 'San Gregorio Palamás, arzobispo de Tesalónica',
    century: 'siglo XIV',
    feastDay: '11-14',
    biography:
      'Hijo de un senador bizantino, dejó la corte a los veinte años para hacerse monje en el Athos. Cuando Barlaam de Calabria ridiculizó a los hesicastas, Gregorio respondió con las Tríadas en defensa de los santos hesicastas, donde distingue entre la esencia divina, inaccesible, y las energías increadas, en las que el hombre participa de verdad. Tres concilios de Constantinopla le dieron la razón. Fue arzobispo de Tesalónica y murió en 1359.',
    works: [
      work('palamas-triadas', 'Tríadas en defensa de los santos hesicastas', 'tratado', 'San Gregorio Palamás'),
      work('palamas-capitulos', 'Ciento cincuenta capítulos', 'sentencias', 'San Gregorio Palamás'),
    ],
  },
  {
    id: 'serafin-sarov',
    name: 'San Serafín de Sarov',
    fullName: 'San Serafín de Sarov',
    century: 'siglos XVIII-XIX',
    feastDay: '01-02',
    biography:
      'Entró en el monasterio de Sarov a los diecinueve años. Vivió dieciséis en el bosque, mil noches en oración de rodillas sobre una roca, y quince en reclusión sin hablar con nadie. Cuando por fin abrió su puerta, acudían miles de personas al día. A todos los saludaba, en cualquier época del año, con las mismas palabras: «Alegría mía, ¡Cristo ha resucitado!». Murió arrodillado ante el icono de la Theotokos en 1833.',
    works: [
      work('serafin-motovilov', 'Conversación con Motovílov sobre el fin de la vida cristiana', 'tratado', 'San Serafín de Sarov', [
        t('Adquiere el espíritu de paz, y a tu alrededor se salvarán miles.'),
        rub('Dicho recogido por sus discípulos. La conversación completa con Nicolás Motovílov está pendiente de incorporar.'),
      ]),
    ],
  },
  {
    id: 'juan-kronstadt',
    name: 'San Juan de Kronstadt',
    fullName: 'San Juan de Kronstadt, sacerdote',
    century: 'siglos XIX-XX',
    feastDay: '12-20',
    biography:
      'Sacerdote de la catedral de Kronstadt, ciudad portuaria donde se hacinaban los pobres de San Petersburgo. Celebraba la Liturgia todos los días y llamaba a la comunión frecuente en un tiempo en que lo habitual era comulgar una vez al año. Repartió cuanto recibía. Su diario espiritual, Mi vida en Cristo, es un clásico de la piedad rusa. Murió en 1908.',
    works: [work('kronstadt-mi-vida', 'Mi vida en Cristo', 'sentencias', 'San Juan de Kronstadt')],
  },
  {
    id: 'teofano-recluso',
    name: 'San Teófano el Recluso',
    fullName: 'San Teófano el Recluso, obispo de Tambov',
    century: 'siglo XIX',
    feastDay: '01-10',
    biography:
      'Obispo que a los cincuenta años pidió el retiro y se encerró veintiocho en el monasterio de Vysha. No dejó de trabajar: tradujo la Filocalia al ruso, escribió sobre la vida espiritual del cristiano corriente y respondió personalmente a miles de cartas. Murió en 1894.',
    works: [
      work('teofano-camino', 'El camino de la salvación', 'tratado', 'San Teófano el Recluso'),
      work('teofano-cartas', 'Cartas sobre la vida espiritual', 'carta', 'San Teófano el Recluso'),
    ],
  },
  {
    id: 'silvano-athonita',
    name: 'San Silvano del Monte Athos',
    fullName: 'San Silvano el Athonita',
    century: 'siglos XIX-XX',
    feastDay: '09-24',
    biography:
      'Campesino ruso, fuerte y sencillo, llegó al monasterio de San Panteleimón en 1892. Tras años de lucha con los pensamientos y de aparente abandono, recibió una palabra que cambió su vida entera: «Ten tu mente en el infierno y no desesperes». Trabajó como despensero y escribió a lápiz unos cuadernos que su discípulo el archimandrita Sofronio publicó tras su muerte, en 1938.',
    works: [
      work('silvano-escritos', 'Escritos', 'sentencias', 'San Silvano del Monte Athos', [
        t('Ten tu mente en el infierno y no desesperes.'),
        rub('Palabra recibida en oración, recogida por el archimandrita Sofronio Sájarov. Los escritos completos son obra de edición moderna con derechos vigentes: no se reproducen aquí.'),
      ]),
    ],
  },
];

/**
 * La segunda tanda entra por aquí. Ninguno de estos autores tiene todavía
 * pasajes incorporados —las traducciones españolas disponibles no son de
 * licencia compatible—, así que sus obras quedan en ficha: qué son, de qué
 * tratan y cuándo se escribieron. Eso ATHOS sí puede darlo.
 */
const moreSeeds: FatherSeed[] = MORE_FATHERS.map((f) => ({
  id: f.id,
  name: f.name,
  fullName: f.fullName,
  century: f.century,
  feastDay: f.feastDay,
  biography: f.biography,
  works: f.works.map(([id, title, kind]) => work(id, title, kind, f.name)),
}));

const allFathers: FatherSeed[] = [...seeds, ...moreSeeds];

export const CHURCH_FATHERS: ChurchFather[] = allFathers.map((f) => ({
  id: f.id,
  name: f.name,
  fullName: f.fullName,
  century: f.century,
  feastDay: f.feastDay,
  biography: f.biography,
  teaching: teaching[f.id] ?? [],
  reading: reading[f.id],
  caution: caution[f.id],
  works: f.works,
  status: f.works.some((w) => w.status !== 'pending') ? 'partial' : 'pending',
  meta: bioMeta,
  searchText: `${f.name} ${f.fullName} ${f.century} ${f.biography} ${(teaching[f.id] ?? []).join(' ')} ${f.works
    .map(
      (w) =>
        `${w.title} ${summaries[w.id]?.summary ?? ''} ${w.blocks
          .filter((b) => b.kind !== 'pending')
          .map((b) => b.content)
          .join(' ')}`,
    )
    .join(' ')}`.toLowerCase(),
}));


/* ---------------- Las épocas ----------------
   Veinticuatro nombres seguidos en una lista no dicen nada. Puestos en su
   siglo sí: se ve de un vistazo que la patrística no es un bloque antiguo,
   sino veinte siglos con etapas distintas, y que sigue habiendo Padres. */

const ROMANOS: Record<string, number> = {
  I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10,
  XI: 11, XII: 12, XIII: 13, XIV: 14, XV: 15, XVI: 16, XVII: 17, XVIII: 18,
  XIX: 19, XX: 20,
};

/** Primer siglo que se menciona en la ficha; sirve para ordenar. */
function primerSiglo(century: string): number {
  const romano = century.match(/\b([IVX]+)\b/);
  return romano ? (ROMANOS[romano[1]] ?? 99) : 99;
}

export interface FatherEra {
  id: string;
  title: string;
  /** Hasta qué siglo llega, ambos incluidos. */
  hasta: number;
  note: string;
}

export const FATHER_ERAS: FatherEra[] = [
  {
    id: 'apostolicos',
    title: 'Los que oyeron a los apóstoles',
    hasta: 3,
    note: 'La primera generación que escribe. No hay todavía concilios ni vocabulario técnico: hay cartas y refutaciones.',
  },
  {
    id: 'concilios',
    title: 'El siglo de los concilios',
    hasta: 5,
    note: 'Nicea, Constantinopla, Éfeso. Se fija el lenguaje de la Trinidad y de Cristo, y se paga caro por él.',
  },
  {
    id: 'bizancio',
    title: 'Bizancio y los iconos',
    hasta: 9,
    note: 'El monacato ya está formado y la disputa se traslada a la imagen: si Cristo se puede pintar o no.',
  },
  {
    id: 'hesicasmo',
    title: 'La oración del corazón',
    hasta: 15,
    note: 'De Simeón a Palamás: si el hombre puede conocer a Dios de verdad, y en qué sentido.',
  },
  {
    id: 'modernos',
    title: 'Los Padres de ayer',
    hasta: 99,
    note: 'La patrística no se acabó en Bizancio. Estos escribieron con imprenta, bajo el zar o bajo el comunismo, y algunos fueron canonizados hace pocos años.',
  },
];

/** A qué época pertenece cada Padre. */
export function eraOf(century: string): string {
  const siglo = primerSiglo(century);
  return (FATHER_ERAS.find((e) => siglo <= e.hasta) ?? FATHER_ERAS[FATHER_ERAS.length - 1]).id;
}

/** Los Padres agrupados por época y ordenados por siglo dentro de cada una. */
export const FATHERS_BY_ERA = FATHER_ERAS.map((era) => ({
  ...era,
  fathers: CHURCH_FATHERS.filter((f) => eraOf(f.century) === era.id).sort(
    (a, b) => primerSiglo(a.century) - primerSiglo(b.century),
  ),
}));

export const FATHERS_NOTE =
  'Las obras de los Padres son de dominio público en su lengua original. Muchas traducciones ' +
  'españolas modernas no lo son: por eso ATHOS incorpora sólo pasajes breves de uso común y ' +
  'mantiene la ficha del resto hasta poder añadir una traducción con licencia compatible.';
