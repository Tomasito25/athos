/**
 * Oficios divinos.
 *
 * ATHOS incorpora la estructura completa de cada oficio —que es un dato
 * documentado— y los textos que se han podido verificar: diaconías, respuestas
 * del pueblo y exclamaciones. Las oraciones sacerdotales largas y los propios
 * variables se marcan como pendientes en lugar de transcribirse de memoria.
 *
 * El propósito de esta sección es seguir el oficio, no sustituir al libro
 * litúrgico del celebrante.
 */
import type { Office, OfficeSection, SourceMeta, TextBlock } from '@/types';
import { OFFICE_ABOUT } from './hymns-about';
import { HORAS_OFFICES, HORAS_RESUMEN } from './horas';
import { PARACLISIS_OFICIO } from './paraclesis';
import { LITURGIA_CRISOSTOMO } from './liturgia-crisostomo';
import { LITURGIA_BASILIO } from './liturgia-basilio';
import { VISPERAS } from './visperas';
import { MAITINES } from './maitines';
import { MEDIANOCHE } from './medianoche';
import { PRESANTIFICADOS } from './presantificados';
import { COMPLETAS } from './completas';
import { MOLEBEN } from './moleben';

const meta: SourceMeta = {
  source: 'Ieratikón y Horologion bizantinos; textos de uso tradicional',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  copyright: 'Textos litúrgicos tradicionales, de dominio público en su original griego.',
  dateAdded: '2026-01-01',
  translator: 'ATHOS',
  notes:
    'Traducción para ATHOS de los textos fijos del Hieratikon y del Horologion griegos (glt.goarch.org) y, donde se indica, del eslavo eclesiástico; no procede de un libro litúrgico español publicado. Los salmos y las lecturas se muestran tomados del Salterio y de la Biblia de la aplicación. Lo que cambia cada día —estiqueras, troparios y cánones del Octoecos, del Menaion y del Triodion— se indica en su lugar.',
};

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });

const section = (
  id: string,
  title: string,
  blocks: TextBlock[],
  voice?: OfficeSection['voice'],
): OfficeSection => ({ id, title, blocks, voice });

/* ============================================================
   Divina Liturgia de san Juan Crisóstomo
   ============================================================ */

const crisostomoSections: OfficeSection[] = [
  section('revestimiento', 'La entrada y el revestimiento', [
    rub('Antes de preparar los dones, el sacerdote y el diácono se detienen ante las puertas del iconostasio, hacen tres inclinaciones y rezan las oraciones de entrada; después besan los iconos de Cristo y de la Theotokos y entran en el santuario diciendo:'),
    t('Entraré en tu casa, adoraré en tu santo templo con tu temor. Señor, guíame por tu justicia; por causa de mis enemigos, endereza delante de Ti mi camino.'),
    rub('Dentro, toman las vestiduras una a una, las bendicen, las besan y se revisten diciendo un versículo distinto para cada una. Casi todos son de los salmos, y no describen la prenda sino lo que significa llevarla.'),
    rub('Al ponerse el esticario, la túnica larga que llevan por igual el sacerdote, el diácono y el monaguillo:'),
    t('Se alegrará mi alma en el Señor, porque me ha vestido con vestidura de salvación y me ha cubierto con manto de alegría; como a esposo me ha puesto una corona y como a esposa me ha adornado con joyas.'),
    rub('Al ponerse el epitraquelio, la estola que cae desde el cuello y sin la cual el sacerdote no puede celebrar nada:'),
    t('Bendito sea Dios, que derrama su gracia sobre sus sacerdotes, como el ungüento sobre la cabeza, que desciende sobre la barba, la barba de Aarón, que desciende hasta el borde de su vestidura.'),
    rub('Al ceñirse el cinturón:'),
    t('Bendito sea Dios, que me ciñe de poder y hace intachable mi camino, que hace mis pies como de ciervo y me afirma sobre las alturas.'),
    rub('Al ponerse los puños, primero el derecho:'),
    t('Tu diestra, Señor, se ha glorificado en la fuerza; tu mano derecha, Señor, ha quebrantado a los enemigos, y con la abundancia de tu gloria has destrozado a los adversarios.'),
    rub('Y después el izquierdo:'),
    t('Tus manos me hicieron y me formaron; dame entendimiento y aprenderé tus mandamientos.'),
    rub('Si le corresponde llevarlo, al ponerse el epigonation, la pieza romboidal que cuelga del costado:'),
    t('Ciñe tu espada a la cintura, valeroso, en tu esplendor y tu hermosura; tiende tu arco, avanza y reina, por la verdad, la mansedumbre y la justicia; y tu diestra te guiará maravillosamente.'),
    rub('Al ponerse el felonio, la capa sin mangas que lo cubre todo:'),
    t('Tus sacerdotes, Señor, se vestirán de justicia y tus santos se llenarán de alegría, ahora y siempre, y por los siglos de los siglos. Amén.'),
    rub('Por último se lavan las manos, diciendo el salmo 25:'),
    t('Lavaré mis manos entre los inocentes y rodearé tu altar, Señor, para oír la voz de tu alabanza y contar todas tus maravillas. Señor, he amado la belleza de tu casa y el lugar donde habita tu gloria. No pierdas mi alma con los impíos ni mi vida con los hombres de sangre, en cuyas manos hay iniquidad y cuya diestra está llena de sobornos. Yo, en cambio, he caminado en mi inocencia; líbrame, Señor, y ten piedad de mí. Mi pie se mantiene en el camino recto; en las asambleas te bendeciré, Señor.'),
    rub('El diácono se reviste sólo con el esticario, el orario —la banda larga que lleva sobre el hombro izquierdo— y los puños, y pide antes la bendición del sacerdote.'),
    rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
  ], 'sacerdote'),

  section('proscomidia', 'Proscomidia', [
    rub('Antes de la Liturgia, el sacerdote y el diácono preparan los dones en la prótesis, una mesa a la izquierda del altar. El pueblo aún no participa; entre tanto se leen las Horas.'),
    rub('Del primero de los panes ofrecidos, la prósfora, el sacerdote corta con la lanza un cubo marcado con el sello IC XC NIKA: es el Cordero, que será consagrado. Mientras corta dice las palabras del profeta Isaías: «Como oveja fue llevado al matadero; como cordero sin mancha, mudo ante el que lo esquila, así no abrió su boca».'),
    rub('Después atraviesa el Cordero por el costado recordando el Evangelio de Juan: «Uno de los soldados le abrió el costado con una lanza, y al instante salió sangre y agua». Y vierte en el cáliz vino y agua.'),
    rub('De los demás panes saca partículas que coloca en la patena alrededor del Cordero: una por la Theotokos, a su derecha; nueve por los órdenes de los santos —el Precursor, los profetas, los apóstoles, los jerarcas, los mártires, los monjes, los anárgiros, los antepasados de Dios y el santo del día—; y otras por los vivos y los difuntos cuyos nombres le han entregado los fieles. Así la Iglesia entera, del cielo y de la tierra, queda reunida en torno a Cristo.'),
    rub('Cubre los dones con la estrella y los velos, los inciensa y dice la oración de la prótesis:'),
    t('Oh Dios, Dios nuestro, que enviaste el Pan celestial, alimento de todo el mundo, a nuestro Señor y Dios Jesucristo, Salvador, Redentor y Bienhechor, que nos bendice y santifica: bendice Tú mismo esta ofrenda y recíbela en tu altar celestial. Acuérdate, como bueno y amante de los hombres, de los que la ofrecieron y de aquellos por quienes la ofrecieron, y guárdanos sin condenación en la celebración sagrada de tus divinos misterios. Porque santificado y glorificado es tu honorabilísimo y magnífico nombre, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.'),
  ], 'sacerdote'),


  // De la bendición inicial a la despedida, entera, en su propio archivo.
  ...LITURGIA_CRISOSTOMO,
];

/* ============================================================
   Fichas de los demás oficios
   ============================================================ */

interface OfficeSeed {
  id: string;
  title: string;
  subtitle?: string;
  kind: Office['kind'];
  sections: OfficeSection[];
  status: Office['status'];
  note?: string;
}

const seeds: OfficeSeed[] = [
  { id: 'liturgia-crisostomo', title: 'Divina Liturgia de san Juan Crisóstomo', subtitle: 'La que se celebra la mayor parte del año', kind: 'liturgia', sections: crisostomoSections, status: 'complete' },
  {
    id: 'liturgia-basilio',
    title: 'Divina Liturgia de san Basilio el Grande',
    subtitle: 'Diez veces al año',
    kind: 'liturgia',
    status: 'complete',
    sections: LITURGIA_BASILIO,
  },
  {
    id: 'presantificados',
    title: 'Liturgia de los Dones Presantificados',
    subtitle: 'Vísperas con comunión, propia de la Gran Cuaresma',
    kind: 'liturgia',
    status: 'complete',
    sections: PRESANTIFICADOS,
  },
  { id: 'visperas', title: 'Vísperas', subtitle: 'Hesperinós — el oficio con que empieza el día litúrgico', kind: 'visperas', sections: VISPERAS, status: 'complete' },
  {
    id: 'maitines',
    title: 'Maitines',
    subtitle: 'Orthros — el oficio de la mañana',
    kind: 'maitines',
    status: 'complete',
    sections: MAITINES,
  },
  {
    id: 'completas',
    title: 'Completas',
    subtitle: 'Apódeipnon — después de la cena',
    kind: 'completas',
    status: 'complete',
    sections: COMPLETAS,
  },
  {
    id: 'medianoche',
    title: 'Oficio de Medianoche',
    subtitle: 'Mesonyktikón',
    kind: 'medianoche',
    status: 'complete',
    sections: MEDIANOCHE,
  },
  {
    id: 'horas',
    title: 'Las Horas',
    subtitle: 'Primera, Tercera, Sexta y Novena',
    kind: 'horas',
    status: 'complete',
    sections: [
      section('sentido', 'Las cuatro horas del día', [
        rub('El día antiguo se contaba desde el amanecer y se marcaba de tres en tres horas. La Iglesia rezó en esas cuatro señales, y a cada una le quedó la memoria de un momento de la Pasión o de Pentecostés.'),
        rub('Las cuatro tienen la misma forma: tres salmos fijos, el tropario propio de la hora con su theotokion, el Trisagio, cuarenta veces «Señor, ten piedad», la oración de toda hora y una oración final distinta en cada una.'),
        t('Cada una está entera en su propia ficha. Aquí van las cuatro de un vistazo, para saber cuál toca.'),
      ]),
      section('prima', 'Hora Primera', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-primera')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-primera')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-primera')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Primera.`),
      ]),
      section('tercia', 'Hora Tercera', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-tercera')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-tercera')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-tercera')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Tercera.`),
      ]),
      section('sexta', 'Hora Sexta', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-sexta')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-sexta')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-sexta')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Sexta.`),
      ]),
      section('nona', 'Hora Novena', [
        rub(HORAS_RESUMEN.find((x) => x.id === 'hora-novena')!.cuando),
        t(HORAS_RESUMEN.find((x) => x.id === 'hora-novena')!.memoria),
        rub(`Salmos ${HORAS_RESUMEN.find((x) => x.id === 'hora-novena')!.salmos.join(', ')}. El oficio entero está en Biblioteca → Liturgia → Hora Novena.`),
      ]),
    ],
  },
  {
    id: 'moleben',
    title: 'Moleben',
    subtitle: 'Oficio de súplica',
    kind: 'moleben',
    status: 'complete',
    sections: MOLEBEN,
  },
  {
    id: 'paraclesis',
    title: 'Paráclesis a la Theotokos',
    subtitle: 'La Pequeña Paráclesis, entera',
    kind: 'paraclesis',
    status: 'complete',
    sections: PARACLISIS_OFICIO,
  },
];

const plain = (sections: OfficeSection[]) =>
  sections
    .flatMap((s) => [s.title, ...s.blocks.filter((b) => b.kind !== 'pending').map((b) => b.content)])
    .join(' ')
    .replace(/<[^>]+>/g, '')
    .toLowerCase();

const base: Office[] = seeds.map((s, i) => ({
  ...OFFICE_ABOUT[s.id],
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
  kind: s.kind,
  order: i + 1,
  sections: s.sections,
  status: s.status,
  meta,
  searchText: `${s.title} ${s.subtitle ?? ''} ${plain(s.sections)}`,
}));

/**
 * Las cuatro Horas van detrás de «Las Horas», que es su portada.
 *
 * Se definen aparte —en `horas.ts`— porque las cuatro comparten esqueleto y
 * escribirlo cuatro veces a mano era pedir que se descolgaran entre sí.
 */
export const OFFICES: Office[] = [...base, ...HORAS_OFFICES];

export const OFFICE_KIND_LABELS: Record<Office['kind'], string> = {
  liturgia: 'Divina Liturgia',
  visperas: 'Vísperas',
  maitines: 'Maitines',
  completas: 'Completas',
  medianoche: 'Oficio de Medianoche',
  horas: 'Las Horas',
  moleben: 'Moleben',
  paraclesis: 'Paráclesis',
};

export const OFFICES_NOTE =
  'Esta biblioteca sirve para seguir el oficio, no para celebrarlo: no sustituye al ' +
  'Ieratikón del sacerdote ni a los libros de coro.';
