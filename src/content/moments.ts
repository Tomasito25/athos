/**
 * El menú de los momentos.
 *
 * Las oraciones de ATHOS no se buscan por título, sino por la hora o la
 * circunstancia en que hacen falta: al despertar, antes de comer, al caer en
 * el pecado. Cada momento es una categoría de la biblioteca, presentada por lo
 * que le ocurre a quien la abre y no por su nombre de libro.
 */
import type { PrayerCategoryId } from '@/types';
import { PRAYER_CATEGORIES, VIRTUES_IN_ORDER } from './prayer-categories';

export interface MomentGroup {
  id: string;
  name: string;
  /** La pregunta con que se presenta en la portada de Orar. */
  question: string;
  description: string;
  /** Tres ejemplos, para reconocer la puerta sin abrirla. */
  examples: string;
  /** El signo del grupo, de los de `MOMENT_ICONS`. */
  icon: string;
  moments: PrayerCategoryId[];
}

/**
 * Las seis puertas del libro de oraciones.
 *
 * Antes eran cinco grupos con treinta y dos momentos a la vista en la portada,
 * de los que había que leerlos todos para encontrar uno. Ahora cada grupo
 * responde a una pregunta —cuándo, qué te pasa, por quién, qué pides, a quién—
 * y dentro van los suyos.
 */
export const MOMENT_GROUPS: MomentGroup[] = [
  {
    id: 'el-dia',
    name: 'El día',
    question: '¿A qué hora?',
    description: 'Desde que se abren los ojos hasta que se cierran.',
    examples: 'Al despertar, al comer, al acostarse',
    icon: 'sun',
    moments: ['manana', 'salir-de-casa', 'antes-trabajar', 'antes-estudiar', 'antes-comer', 'despues-comer', 'antes-viajar', 'noche'],
  },
  {
    id: 'el-alma',
    name: 'El alma',
    question: '¿Qué te pasa?',
    description: 'Cuando algo se tuerce por dentro, y cuando algo se endereza.',
    examples: 'La tentación, la ira, el miedo',
    icon: 'deep',
    moments: ['al-pecar', 'arrepentimiento', 'tentacion', 'ira', 'miedo', 'angustia', 'dudas', 'decision', 'accion-de-gracias'],
  },
  {
    id: 'los-tuyos',
    name: 'Los tuyos',
    question: '¿Por quién?',
    description: 'La parte de la oración que no es para uno mismo.',
    examples: 'Los hijos, los enfermos, los difuntos',
    icon: 'family',
    // La agonía, los difuntos y el duelo van seguidos y en ese orden: son tres
    // momentos de lo mismo, y quien busca uno suele necesitar el siguiente.
    moments: ['familia', 'matrimonio', 'embarazo', 'casa', 'amigos', 'enemigos', 'padre-espiritual', 'enfermedad', 'agonia', 'difuntos', 'duelo', 'paz'],
  },
  {
    id: 'virtudes',
    name: 'Las virtudes',
    question: '¿Qué quieres pedir?',
    description: 'La fe, la humildad, la paciencia, la sabiduría: las oraciones para pedir cada una.',
    examples: 'La humildad, la paciencia, la sabiduría',
    icon: 'lamp',
    moments: VIRTUES_IN_ORDER,
  },
  {
    id: 'a-quien',
    name: 'A quién',
    question: '¿A quién rezas?',
    description: 'A la Trinidad, a Cristo, al Espíritu Santo, a la Madre de Dios, a los ángeles y a los santos.',
    examples: 'A Cristo, a la Madre de Dios, a los santos',
    icon: 'candle',
    moments: ['a-la-trinidad', 'a-cristo', 'al-espiritu-santo', 'theotokos', 'angeles', 'santos'],
  },
  {
    id: 'la-iglesia',
    name: 'La Iglesia y la Escritura',
    question: '¿Con qué?',
    description: 'El templo, los sacramentos, el ayuno, y las oraciones que trae la propia Biblia.',
    examples: 'La comunión, el ayuno, las odas',
    icon: 'church',
    moments: ['templo', 'confesion', 'comunion', 'ayuno', 'escritura', 'odas', 'oraciones-biblicas', 'salmos-necesidad', 'otras'],
  },
];

/**
 * El icono de cada momento.
 *
 * Se nombra aquí, junto al momento, y no en la pantalla: así el menú y
 * cualquier otro sitio que enseñe momentos usan el mismo signo. Los iconos son
 * de trazo fino, como los de toda la aplicación, y varios son ortodoxos de
 * suyo: la prósfora con su sello, el cáliz, la cruz de tres travesaños, la
 * cúpula con su cruz.
 */
export const MOMENT_ICONS: Record<PrayerCategoryId, string> = {
  /* El día */
  manana: 'sun',
  'salir-de-casa': 'door',
  'antes-trabajar': 'work',
  'antes-estudiar': 'book',
  'antes-comer': 'bread',
  'despues-comer': 'chalice',
  'antes-viajar': 'path',
  noche: 'moon',
  /* El alma */
  'al-pecar': 'cross',
  arrepentimiento: 'candle',
  tentacion: 'shield',
  ira: 'branch',
  miedo: 'dove',
  angustia: 'deep',
  dudas: 'lamp',
  decision: 'path',
  'accion-de-gracias': 'wheat',
  /* Los tuyos */
  familia: 'family',
  matrimonio: 'crowns',
  embarazo: 'cradle',
  casa: 'home',
  amigos: 'people',
  enemigos: 'branch',
  'padre-espiritual': 'blessing',
  enfermedad: 'healing',
  agonia: 'candle',
  difuntos: 'tomb',
  duelo: 'deep',
  paz: 'dove',
  /* Las virtudes */
  fe: 'cross',
  esperanza: 'sun',
  amor: 'candle',
  sabiduria: 'book',
  discernimiento: 'lamp',
  'temor-de-dios': 'church',
  templanza: 'bread',
  justicia: 'scroll',
  fortaleza: 'shield',
  castidad: 'crowns',
  humildad: 'door',
  paciencia: 'path',
  mansedumbre: 'branch',
  obediencia: 'blessing',
  silencio: 'moon',
  vigilancia: 'tomb',
  desprendimiento: 'wheat',
  perdon: 'people',
  misericordia: 'healing',
  compuncion: 'deep',
  gratitud: 'chalice',
  'paz-interior': 'dove',
  oracion: 'pray',
  /* A quién */
  'a-la-trinidad': 'sun',
  'a-cristo': 'cross',
  'al-espiritu-santo': 'dove',
  theotokos: 'candle',
  angeles: 'shield',
  santos: 'people',
  /* La Iglesia y la Escritura */
  templo: 'church',
  confesion: 'cross',
  comunion: 'chalice',
  ayuno: 'bread',
  escritura: 'scroll',
  odas: 'book',
  'oraciones-biblicas': 'lamp',
  'salmos-necesidad': 'deep',
  otras: 'pray',
};

/** Cada momento con su ficha, en el orden en que aparece en el menú. */
export const MOMENTS_IN_ORDER: PrayerCategoryId[] = MOMENT_GROUPS.flatMap((g) => g.moments);

export const momentById = (id: string) => PRAYER_CATEGORIES.find((c) => c.id === id);

/** El grupo al que pertenece un momento. */
export const groupOfMoment = (id: string) => MOMENT_GROUPS.find((g) => (g.moments as string[]).includes(id));

/**
 * Qué momento corresponde a esta hora.
 *
 * Sólo se pronuncia sobre las horas que de verdad tienen un momento propio
 * —despertar, mesa, descanso—. En las demás devuelve `null`: manda el oficio.
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
