/**
 * Si hoy se hacen grandes postraciones.
 *
 * El canon 20 del primer Concilio de Nicea (325) manda rezar de pie el
 * domingo y en los días de Pentecostés —de Pascua a Pentecostés—, porque son
 * días de la Resurrección. La costumbre añade los días de Navidad hasta la
 * víspera de la Teofanía y las grandes fiestas. Las inclinaciones pequeñas, en
 * cambio, se hacen siempre.
 *
 * En los días de diario de la Gran Cuaresma las postraciones van unidas a la
 * oración de san Efrén, y eso también se dice.
 */
import type { LiturgicalDay } from '@/types';

export interface ProstrationsToday {
  /** Si hoy se hacen grandes postraciones. */
  great: boolean;
  reason: string;
  /** Día de diario de la Gran Cuaresma: la oración de san Efrén con sus postraciones. */
  lent: boolean;
}

const dd = (n: number) => String(n).padStart(2, '0');

export function prostrationsToday(day: LiturgicalDay): ProstrationsToday {
  const o = day.paschaOffset;
  const n = day.nextPaschaOffset;
  const md = `${dd(day.church.month)}-${dd(day.church.day)}`;
  const granFiesta = day.feasts.some((f) => f.rank === 'gran-fiesta' || f.rank === 'pascua');

  if (o >= 0 && o <= 49) {
    return {
      great: false,
      lent: false,
      reason:
        'De Pascua a Pentecostés se reza de pie, como manda el canon 20 del primer Concilio de Nicea. Las postraciones vuelven el día de Pentecostés, con las oraciones de rodillas de sus Vísperas.',
    };
  }
  if (day.weekday === 0) {
    return {
      great: false,
      lent: false,
      reason:
        'Es domingo, el día de la Resurrección: el canon 20 del primer Concilio de Nicea manda rezar de pie. Las inclinaciones sí se hacen.',
    };
  }
  if (md >= '12-25' || md <= '01-04') {
    return {
      great: false,
      lent: false,
      reason: 'Desde Navidad hasta la víspera de la Teofanía no se hacen grandes postraciones: son días de fiesta.',
    };
  }
  if (granFiesta) {
    return { great: false, lent: false, reason: 'Hoy es una gran fiesta: no se hacen grandes postraciones.' };
  }
  if (n >= -48 && n <= -7 && day.weekday >= 1 && day.weekday <= 5) {
    return {
      great: true,
      lent: true,
      reason:
        'Es día de diario de la Gran Cuaresma: con la oración de san Efrén se hacen tres grandes postraciones, doce inclinaciones y otra postración al final.',
    };
  }
  if (day.weekday === 6) {
    return {
      great: true,
      lent: false,
      reason: 'Hoy se pueden hacer grandes postraciones. Desde las Vísperas de esta tarde ya es domingo, y se reza de pie.',
    };
  }
  return { great: true, lent: false, reason: 'Hoy se pueden hacer grandes postraciones.' };
}
