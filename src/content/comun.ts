/**
 * Las piezas que se repiten en todos los oficios.
 *
 * Muchos oficios de la biblioteca decían «el comienzo habitual (Orar →
 * Oraciones → Comienzo habitual)» y había que salir a buscarlo en mitad del
 * rezo. Aquí está una vez, con las fórmulas de siempre —en español, y con su
 * griego—, para que cada oficio lo lleve dentro.
 */
import type { TextBlock } from '@/types';
import { GREEK_FORMULAS as G } from './greek';

const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const t = (content: string): TextBlock => ({ kind: 'text', content });
const gr = (clave: keyof typeof G, times?: number): TextBlock => ({
  kind: 'text',
  content: G[clave].spanish,
  greek: G[clave].greek,
  roman: G[clave].roman,
  times,
});

/** Trisagio, «Santísima Trinidad» y Padre Nuestro. */
export const TRISAGIO_PADRE_NUESTRO: TextBlock[] = [
  gr('trisagion', 3),
  gr('doxa'),
  gr('panagiaTrias'),
  gr('kyrie', 3),
  gr('doxa'),
  gr('paterImon'),
  rub('Sacerdote: «Porque tuyo es el reino, y el poder, y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos». Sin sacerdote: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos». Amén.'),
];

/** «Gloria a Ti», «Rey celestial» y lo anterior: el comienzo de casi todo oficio. */
export const COMIENZO_HABITUAL: TextBlock[] = [
  gr('doxaSi'),
  gr('basileuOuranie'),
  rub('Desde Pascua hasta la Ascensión, en lugar de «Rey celestial» se dice tres veces «Cristo ha resucitado»; entre la Ascensión y Pentecostés se omite.'),
  ...TRISAGIO_PADRE_NUESTRO,
];

/** La oración de san Efrén el Sirio, con sus postraciones. */
export const ORACION_DE_EFREN: TextBlock[] = [
  t('Señor y Soberano de mi vida: no me des espíritu de ociosidad, de desaliento, de dominio ni de vaniloquio.'),
  rub('Gran postración.'),
  t('Concede en cambio a mí, tu siervo, espíritu de castidad, de humildad, de paciencia y de amor.'),
  rub('Gran postración.'),
  t('Sí, Señor y Rey: concédeme ver mis propios pecados y no juzgar a mi hermano, porque bendito eres por los siglos de los siglos. Amén.'),
  rub('Gran postración.'),
];

/** Un texto entero de la biblioteca, plegado en su sitio. */
export const embed = (ref: string, content: string): TextBlock => ({ kind: 'embed', content, ref });
