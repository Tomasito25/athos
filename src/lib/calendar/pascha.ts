/**
 * Paschalion — cálculo de la fecha de Pascua ortodoxa.
 *
 * Toda la Iglesia ortodoxa, incluidas las que siguen el calendario nuevo para
 * las fiestas fijas, calcula la Pascua con el cómputo juliano. El algoritmo de
 * Meeus devuelve la fecha en el calendario juliano; hay que convertirla al
 * gregoriano para mostrarla en un dispositivo moderno.
 */
import { julianToJdn, jdnToIso } from './jdn';

/** Fecha de Pascua expresada en el calendario juliano. */
export function paschaJulian(year: number): { month: number; day: number } {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const total = d + e + 114;
  return { month: Math.floor(total / 31), day: (total % 31) + 1 };
}

/** Día juliano (JDN) de la Pascua ortodoxa. */
export function paschaJdn(year: number): number {
  const { month, day } = paschaJulian(year);
  return julianToJdn(year, month, day);
}

/** Fecha ISO gregoriana de la Pascua ortodoxa de un año. */
export function paschaIso(year: number): string {
  return jdnToIso(paschaJdn(year));
}

/**
 * Pascua que gobierna el ciclo móvil de una fecha dada: la última Pascua
 * anterior o igual a esa fecha. El año litúrgico móvil no coincide con el civil.
 */
export function governingPascha(jdn: number): { year: number; jdn: number } {
  const approxYear = new Date((jdn - 2440588) * 86400000).getUTCFullYear();
  for (let y = approxYear + 1; y >= approxYear - 1; y--) {
    const p = paschaJdn(y);
    if (p <= jdn) return { year: y, jdn: p };
  }
  const y = approxYear - 1;
  return { year: y, jdn: paschaJdn(y) };
}

/**
 * Tono del Octoecos según el ciclo de ocho semanas que arranca en el
 * Domingo de Tomás. Durante la Semana de la Renovación no hay tono semanal.
 */
export function toneForOffset(paschaOffset: number): number | null {
  if (paschaOffset >= 0 && paschaOffset < 7) return null;
  const weekIndex = Math.floor((paschaOffset - 7) / 7);
  return (((weekIndex % 8) + 8) % 8) + 1;
}

/** Pascua gregoriana (cómputo occidental), sólo para comparar calendarios. */
export function paschaGregorianWestern(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}
