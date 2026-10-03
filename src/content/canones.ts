/**
 * Los cánones, con sus irmoi.
 *
 * Un canon bizantino son nueve odas, y cada oda empieza por un **irmos**: la
 * estrofa modelo, que fija la melodía y el metro de las que vienen detrás, y
 * que alude siempre al cántico bíblico de esa oda —el de Moisés en el mar, el
 * de Ana, el de Habacuc, el de los tres jóvenes en el horno—. Los irmoi son la
 * parte fija y conocida; los troparios que los siguen cambian con la fiesta y
 * son muchos.
 *
 * Aquí están los irmoi traducidos del griego, que es lo que permite seguir un
 * canon y cantarlo. Donde el canon tiene además doscientos cincuenta troparios
 * propios —el Gran Canon—, se dice y se deja dicho: incorporarlos es otro
 * trabajo, y fingir que están sería peor que no tenerlos.
 *
 * Misma advertencia que en el Akáthistos: el texto es auténtico, la versión
 * castellana es de ATHOS y no procede de ningún libro publicado.
 */
import type { OfficeSection, SourceMeta, TextBlock } from '@/types';

const base = {
  tradition: 'Rito bizantino',
  language: 'es' as const,
  license: 'cc-by-sa-4.0' as const,
  dateAdded: '2026-09-01',
};

export const canonMeta = (over: Partial<SourceMeta>): SourceMeta => ({
  ...base,
  ...over,
  source: `${over.source ?? ''} Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público.`.trim(),
  copyright:
    'Texto litúrgico tradicional; el original griego es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes: `${over.notes ?? ''} Lo que es de ATHOS es la traducción: no procede de ningún libro litúrgico español publicado ni se ha cotejado con una edición crítica del griego.`.trim(),
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const pending = (what: string): TextBlock => ({
  kind: 'pending',
  content: `Contenido pendiente de incorporar: ${what}`,
});
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

/* ═══════════════════ Canon Pascual ═══════════════════ */

export const CANON_PASCUAL: OfficeSection[] = [
  s('sobre', 'El canon de la noche de Pascua', [
    rub('Obra de san Juan Damasceno. Se canta en los Maitines de Pascua y todos los días de la Semana Radiante. Como todos los cánones festivos, no tiene segunda oda.'),
    rub('Entre estrofa y estrofa se canta el estribillo, y al final de cada oda se repite el irmos.'),
    ref('Cristo ha resucitado de entre los muertos.'),
  ]),
  s('oda-1', 'Oda 1', [
    t('Éste es el día de la Resurrección: resplandezcamos, pueblos. ¡Pascua, Pascua del Señor! Porque de la muerte a la vida y de la tierra al cielo nos ha llevado Cristo Dios, a los que cantamos el himno de victoria.'),
  ]),
  s('oda-3', 'Oda 3', [
    t('Venid, bebamos una bebida nueva, no sacada milagrosamente de una roca estéril, sino de la fuente de incorrupción que brota del sepulcro de Cristo, en quien nos afianzamos.'),
  ]),
  s('oda-4', 'Oda 4', [
    t('Que se ponga en la guardia divina el divino Habacuc, y nos muestre al ángel portador de luz que dice claramente: Hoy es la salvación del mundo, porque ha resucitado Cristo, como omnipotente.'),
  ]),
  s('oda-5', 'Oda 5', [
    t('Madruguemos muy de mañana, y en lugar de ungüento ofrezcamos un himno al Señor, y veremos a Cristo, sol de justicia, que hace amanecer la vida para todos.'),
  ]),
  s('oda-6', 'Oda 6', [
    t('Descendiste a lo más hondo de la tierra y quebrantaste los cerrojos eternos que retenían a los encadenados, oh Cristo; y al tercer día, como Jonás del monstruo marino, saliste del sepulcro.'),
  ]),
  s('kontakion', 'Kontakion', [
    t('Aunque bajaste al sepulcro, oh Inmortal, destruiste el poder del infierno y resucitaste vencedor, oh Cristo Dios, diciendo a las mujeres portadoras de ungüento: Alegraos, y dando la paz a tus apóstoles, Tú que concedes la resurrección a los caídos.'),
  ]),
  s('oda-7', 'Oda 7', [
    t('El que libró a los jóvenes del horno, hecho hombre, padece como mortal, y por su pasión reviste a lo mortal con la hermosura de la incorrupción: el único Dios de nuestros padres, bendito y lleno de gloria.'),
  ]),
  s('oda-8', 'Oda 8', [
    t('Éste es el día señalado y santo, el primero de las semanas, rey y señor, fiesta de fiestas y solemnidad de solemnidades, en el que bendecimos a Cristo por los siglos.'),
  ]),
  s('oda-9', 'Oda 9', [
    rub('Antes del irmos se canta el megalinario, que pone en boca del ángel el saludo a la Madre de Dios:'),
    t('El ángel gritó a la llena de gracia: Virgen pura, alégrate; y de nuevo digo: alégrate, porque tu Hijo ha resucitado al tercer día del sepulcro, y ha resucitado a los muertos. Pueblos, alegraos.'),
    t('Ilumínate, ilumínate, nueva Jerusalén, porque la gloria del Señor ha amanecido sobre ti. Danza ahora y alégrate, Sión; y tú, Madre de Dios pura, gózate en la resurrección de tu Hijo.'),
  ]),
  s('exapostilario', 'Exapostilario', [
    t('Habiéndote dormido en la carne como mortal, oh Rey y Señor, al tercer día resucitaste, levantando a Adán de la corrupción y aboliendo la muerte. Pascua de la incorrupción, salvación del mundo.'),
  ]),
];

/* ═══════════════════ Gran Canon ═══════════════════ */

// Entero, en su propio archivo: son casi trescientas estrofas.
export { GRAN_CANON } from './gran-canon';

/* ═══════════════════ Pequeña Paráclesis ═══════════════════ */

// Entera, con el oficio del que forma parte, en su propio archivo.
export { PARACLISIS_CANON as CANON_PARACLISIS } from './paraclesis';

/* ═══════════════════ Canon al Ángel de la Guarda ═══════════════════ */

export const CANON_ANGEL: OfficeSection[] = [
  s('sobre', 'El canon al propio ángel', [
    rub('Se lee la víspera de comulgar, junto con el canon de la Comunión y el de la Theotokos. Cada bautizado tiene un ángel puesto para guardarle, y este canon le habla a él directamente, en segunda persona.'),
    ref('Santo ángel de Dios, guardián mío, ruega a Dios por mí.'),
  ]),
  s('oracion', 'La oración al ángel', [
    rub('Se reza también sola, cada noche, y está en Orar → Oraciones.'),
    t('Santo ángel, que asistes a mi alma miserable y a mi vida atribulada: no me abandones a mí, pecador, ni te apartes de mí por mi falta de dominio. No des lugar al demonio maligno para que me domine con la violencia de este cuerpo mortal. Toma mi mano desdichada y débil y llévame por el camino de la salvación.'),
  ]),
  s('irmos-1', 'Irmos de la oda 1', [
    t('Cantemos al Señor, que condujo a su pueblo por el mar Rojo, porque sólo Él se ha glorificado gloriosamente.'),
  ]),
  s('lo-que-falta', 'Las odas', [
    rub('El estribillo y la oración al ángel, que son lo que se reza fuera del canon, están incorporados.'),
    pending('los troparios de las nueve odas.'),
  ]),
];

/* ═══════════════════ Canon de la Comunión ═══════════════════ */

export { CANON_COMUNION } from './canon-comunion';
