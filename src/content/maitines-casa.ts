/**
 * Los Maitines para rezar en casa, sin sacerdote.
 *
 * Los Maitines de la biblioteca están para seguir el oficio en la iglesia:
 * traen las letanías del diácono, las exclamaciones del sacerdote y, en el
 * sitio de lo que cambia cada día, una rúbrica que dice de qué libro se toma.
 * Rezarlos en casa así obliga a saltar la mitad y a salir a buscar la otra.
 *
 * Esta forma es la que se reza sin sacerdote: no lleva letanías ni
 * exclamaciones —en su lugar se dice «Señor, ten piedad», como es costumbre—,
 * y lo que cambia cada día lo pone ATHOS en su sitio:
 *
 * - el tropario del día, en «Dios es el Señor»;
 * - los kathismata que el Típikon reparte para cada día de la semana;
 * - en el lugar del canon del día, que es del Octoecos y del Menaion y no está
 *   en ATHOS, el canon que ATHOS propone para hoy, con el Magníficat.
 *
 * No hay aquí texto nuevo: los salmos vienen del Salterio de ATHOS, los
 * troparios del oficio real, las Laudes y la Doxología son los de los
 * Maitines de la biblioteca, y el comienzo habitual es el de los oficios del
 * día.
 */
import type { OfficeSection, TextBlock } from '@/types';
import { MAITINES } from './maitines';
import { COMIENZO, TRISAGIO } from './hours';
import { GREEK_FORMULAS as G } from './greek';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const gr = (clave: keyof typeof G, times?: number): TextBlock => ({
  kind: 'text',
  content: G[clave].spanish,
  greek: G[clave].greek,
  roman: G[clave].roman,
  times,
});
const section = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const de = (id: string): TextBlock[] => MAITINES.find((s) => s.id === id)?.blocks ?? [];

/** Lo que dice el sacerdote o el diácono no se dice en casa. */
const sinClero = (bloques: TextBlock[]): TextBlock[] =>
  bloques.filter((b) => !(b.kind === 'rubric' && /^(Sacerdote|Diácono)[:\s]/.test(b.content)));

/** Los troparios del oficio real, tal como están en los Maitines de la biblioteca. */
function troparioDelOficioReal(): TextBlock[] {
  const bloques = de('comienzo');
  const desde = bloques.findIndex((b) => b.content.startsWith('Salva, Señor, a tu pueblo'));
  const hasta = bloques.findIndex((b) => b.content.startsWith('Protección temible'));
  return desde >= 0 && hasta >= desde ? bloques.slice(desde, hasta + 1) : [];
}

const SENOR_12: TextBlock = { kind: 'text', content: 'Señor, ten piedad.', times: 12 };
const SENOR_3: TextBlock = { kind: 'text', content: 'Señor, ten piedad.', times: 3 };
const GLORIA_AHORA = gr('doxa');
const LAICO = t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos. Amén.');

export const MAITINES_EN_CASA: OfficeSection[] = [
  section('en-casa', 'Cómo se rezan en casa', [
    rub('Esta es la forma de los Maitines sin sacerdote. No se dicen las letanías ni las exclamaciones; en su lugar, como es costumbre, «Señor, ten piedad», doce veces donde iba una letanía larga y tres donde iba una corta.'),
    rub('Lo que cambia cada día lo pone ATHOS en su sitio: el tropario del día, los kathismata que tocan hoy y un canon para el lugar del canon del día, que es del Octoecos y del Menaion y no está en ATHOS. Lo demás es fijo y está entero.'),
    rub('Enteros, con los kathismata y el canon, llevan cerca de hora y media. Si es demasiado, los kathismata y el canon se pueden dejar plegados: lo que queda se reza en media hora larga.'),
  ]),

  section('comienzo', 'El comienzo', [
    LAICO,
    ...COMIENZO.filter((b) => b.kind !== 'rubric'),
    ...TRISAGIO,
    SENOR_12,
    GLORIA_AHORA,
    gr('deute'),
  ]),

  section('oficio-real', 'Los salmos 19 y 20', [
    rub('Los dos salmos que piden por quienes gobiernan, con que se abren los Maitines de los días ordinarios. En la vigilia de los domingos y las fiestas, cuando los Maitines siguen a las Vísperas, no se dicen y se pasa a los Seis Salmos.'),
    psalm(19),
    psalm(20),
    ...TRISAGIO.filter((b) => b.kind !== 'heading' && b.content !== G.basileuOuranie.spanish && !/^Desde Pascua/.test(b.content)),
    ...troparioDelOficioReal(),
    rub('En lugar de la letanía:'),
    SENOR_12,
    rub('Y sin la bendición del sacerdote:'),
    LAICO,
  ]),

  section('exapsalmos', 'Los Seis Salmos', sinClero(de('exapsalmos'))),

  section('en-lugar-de-la-letania', 'En lugar de la gran letanía', [SENOR_12]),

  section('dios-es-el-senor', 'Dios es el Señor', de('dios-es-el-senor')),

  section('kathismata', 'Los kathismata de hoy', [
    rub('Después de cada kathisma, «Señor, ten piedad» tres veces, gloria, ahora y siempre.'),
    { kind: 'day-kathismata', content: 'Los kathismata de hoy' },
  ]),

  section('salmo-50', 'Salmo 50', [psalm(50)]),

  section('canon', 'El canon', [
    rub('El canon del día no está en ATHOS. En su lugar va el que ATHOS propone para hoy; y antes de la novena oda, el Magníficat.'),
    { kind: 'day-canon', content: 'El canon de hoy' },
  ]),

  section('magnificat', 'El Magníficat', sinClero(de('magnificat'))),

  section('despues-del-canon', 'Después del canon', [
    rub('En lugar de la pequeña letanía:'),
    SENOR_3,
    rub('Y «Santo es el Señor, nuestro Dios» tres veces, sólo los domingos.'),
  ]),

  section('laudes', 'Las Laudes', de('laudes')),

  section('doxologia', 'La Doxología', sinClero(de('gran-doxologia'))),

  section('final', 'El final', [
    rub('En lugar de las letanías de la mañana, el Trisagio y el tropario del día:'),
    ...TRISAGIO.filter((b) => b.kind !== 'heading' && b.content !== G.basileuOuranie.spanish && !/^Desde Pascua/.test(b.content)),
    { kind: 'day-troparion', content: 'Tropario del día' },
    SENOR_12,
    t('Que el Señor Dios afiance la fe santa e inmaculada de los cristianos piadosos y ortodoxos, junto con su santa Iglesia y esta ciudad, por los siglos de los siglos. Amén.'),
    GLORIA_AHORA,
    SENOR_3,
    LAICO,
  ]),
];
