/**
 * El menú de los momentos.
 *
 * Las oraciones de ATHOS no se buscan por título, sino por la hora o la
 * circunstancia en que hacen falta: al despertar, antes de comer, al caer en
 * el pecado. Cada momento es una categoría de la biblioteca, presentada por lo
 * que le ocurre a quien la abre y no por su nombre de libro.
 */
import type { PrayerCategoryId } from '@/types';
import { PRAYER_CATEGORIES } from './prayers';

export interface MomentGroup {
  id: string;
  name: string;
  description: string;
  moments: PrayerCategoryId[];
}

export const MOMENT_GROUPS: MomentGroup[] = [
  {
    id: 'el-dia',
    name: 'El día',
    description: 'Desde que se abren los ojos hasta que se cierran.',
    moments: [
      'manana',
      'salir-de-casa',
      'antes-trabajar',
      'antes-estudiar',
      'antes-comer',
      'despues-comer',
      'antes-viajar',
      'noche',
    ],
  },
  {
    id: 'el-alma',
    name: 'El alma',
    description: 'Cuando algo se tuerce por dentro, y cuando algo se endereza.',
    moments: ['al-pecar', 'arrepentimiento', 'tentacion', 'angustia', 'accion-de-gracias'],
  },
  {
    id: 'los-demas',
    name: 'Los demás',
    description: 'La parte de la oración que no es para uno mismo.',
    moments: ['familia', 'amigos', 'enemigos', 'enfermedad', 'padre-espiritual', 'difuntos'],
  },
  {
    id: 'ante-dios',
    name: 'Ante Dios',
    description: 'El templo, la Escritura y los sacramentos.',
    moments: ['templo', 'escritura', 'confesion', 'comunion', 'otras'],
  },
];

/** Cada momento con su ficha, en el orden en que aparece en el menú. */
export const MOMENTS_IN_ORDER: PrayerCategoryId[] = MOMENT_GROUPS.flatMap((g) => g.moments);

export const momentById = (id: string) => PRAYER_CATEGORIES.find((c) => c.id === id);

/**
 * Qué momento corresponde a esta hora.
 *
 * Sólo se pronuncia sobre las horas que de verdad tienen un momento propio
 * —despertar, mesa, descanso—. En las demás devuelve `null` y la pantalla
 * ofrece la oración de Jesús, que no tiene hora.
 *
 * Las franjas siguen el horario español: la comida a media tarde y la cena
 * tarde. La noche cruza la medianoche.
 */
export function momentNow(hour: number): PrayerCategoryId | null {
  const h = ((hour % 24) + 24) % 24;
  if (h >= 5 && h < 10) return 'manana';
  if (h >= 13 && h < 15) return 'antes-comer';
  if (h >= 15 && h < 17) return 'despues-comer';
  if (h >= 21 || h < 5) return 'noche';
  return null;
}

/** Lo que se ofrece cuando la hora no manda: la oración que se reza a cualquiera. */
export const ANY_HOUR = {
  title: 'A cualquier hora',
  text: 'Señor Jesucristo, Hijo de Dios, ten piedad de mí, pecador.',
  path: '/orar/oraciones/oracion-de-jesus',
} as const;
