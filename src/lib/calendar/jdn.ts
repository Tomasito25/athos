/**
 * Conversión entre fechas civiles y día juliano (JDN).
 *
 * El calendario ortodoxo obliga a moverse entre el cómputo juliano y el
 * gregoriano. Hacerlo sumando «13 días» sólo funciona entre 1900 y 2099;
 * pasar por el número de día juliano es exacto para cualquier año.
 *
 * Algoritmos de Fliegel y Van Flandern.
 */
import type { CivilDate } from '@/types';

const floorDiv = (a: number, b: number) => Math.floor(a / b);

export function gregorianToJdn(y: number, m: number, d: number): number {
  const a = floorDiv(14 - m, 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  return (
    d +
    floorDiv(153 * m2 + 2, 5) +
    365 * y2 +
    floorDiv(y2, 4) -
    floorDiv(y2, 100) +
    floorDiv(y2, 400) -
    32045
  );
}

export function julianToJdn(y: number, m: number, d: number): number {
  const a = floorDiv(14 - m, 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  return d + floorDiv(153 * m2 + 2, 5) + 365 * y2 + floorDiv(y2, 4) - 32083;
}

export function jdnToGregorian(jdn: number): CivilDate {
  const a = jdn + 32044;
  const b = floorDiv(4 * a + 3, 146097);
  const c = a - floorDiv(146097 * b, 4);
  const d = floorDiv(4 * c + 3, 1461);
  const e = c - floorDiv(1461 * d, 4);
  const m = floorDiv(5 * e + 2, 153);
  return {
    day: e - floorDiv(153 * m + 2, 5) + 1,
    month: m + 3 - 12 * floorDiv(m, 10),
    year: 100 * b + d - 4800 + floorDiv(m, 10),
  };
}

export function jdnToJulian(jdn: number): CivilDate {
  const c = jdn + 32082;
  const d = floorDiv(4 * c + 3, 1461);
  const e = c - floorDiv(1461 * d, 4);
  const m = floorDiv(5 * e + 2, 153);
  return {
    day: e - floorDiv(153 * m + 2, 5) + 1,
    month: m + 3 - 12 * floorDiv(m, 10),
    year: d - 4800 + floorDiv(m, 10),
  };
}

/** Días que el calendario gregoriano lleva de adelanto sobre el juliano. */
export function julianOffsetDays(gregorianYear: number): number {
  const g = gregorianToJdn(gregorianYear, 3, 1);
  const j = julianToJdn(gregorianYear, 3, 1);
  return g - j;
}

/* ---------- Puentes con fechas ISO y `Date` ---------- */

export function isoToJdn(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return gregorianToJdn(y, m, d);
}

export function jdnToIso(jdn: number): string {
  return civilToIso(jdnToGregorian(jdn));
}

export function civilToIso({ year, month, day }: CivilDate): string {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function isoToCivil(iso: string): CivilDate {
  const [year, month, day] = iso.split('-').map(Number);
  return { year, month, day };
}

/** Fecha ISO local (nunca UTC: cambiaría el día en husos negativos). */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

export function isoToDate(iso: string): Date {
  const { year, month, day } = isoToCivil(iso);
  return new Date(year, month - 1, day);
}

export function addDaysIso(iso: string, days: number): string {
  return jdnToIso(isoToJdn(iso) + days);
}

export function diffDaysIso(a: string, b: string): number {
  return isoToJdn(a) - isoToJdn(b);
}

/** 0 = domingo … 6 = sábado. */
export function weekdayFromJdn(jdn: number): number {
  return (jdn + 1) % 7;
}

/** `MM-DD` de una fecha civil, para indexar el calendario fijo. */
export function monthDay({ month, day }: CivilDate): string {
  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
