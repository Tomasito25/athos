/**
 * Lo propio del día, añadido solo a los oficios.
 *
 * El tropario y el kontakion del día cambian cada día, y el akathistos que
 * toca también: no pueden ir guardados en los pasos de cada uno. Se añaden al
 * enseñar el oficio, en su sitio, y no tocan la regla guardada: si mañana
 * cambia el santo, cambia el tropario sin que nadie edite nada.
 *
 * - El tropario y el kontakion de hoy, en el oficio habitual de los tres
 *   momentos, antes de la despedida. La breve no lo lleva —es la regla de
 *   san Serafín, tal cual—, y la extensa ya lo trae dentro de las Horas.
 * - El akathistos de hoy, plegado, en el oficio de la noche habitual y
 *   extenso: quien quiera lo abre y lo reza ahí mismo.
 */
import type { OfficeLength, RuleTime } from '@/types';
import type { ResolvedStep } from './useOfficeSteps';

const paso = (id: string, title: string, note: string, blocks: ResolvedStep['blocks']): ResolvedStep => ({
  item: { id: `del-dia-${id}`, ruleId: 'del-dia', order: 0, title, note },
  blocks,
  origin: 'Lo propio de hoy, según el calendario',
});

const TROPARIO = paso(
  'tropario',
  'Tropario y kontakion de hoy',
  'Lo pone ATHOS según el calendario: el del santo, el de la fiesta o el del domingo.',
  [
    { kind: 'day-troparion', content: 'Tropario del día' },
    { kind: 'day-kontakion', content: 'Kontakion del día' },
  ],
);

const AKATHISTOS = paso(
  'akathistos',
  'Akathistos de hoy',
  'Si hay tiempo. Va plegado: se abre y se reza aquí mismo.',
  [{ kind: 'day-akathist', content: 'Akathistos de hoy' }],
);

/** Dónde va cada cosa: antes del primer paso que encaje, o antes del último. */
function insertarAntes(lista: ResolvedStep[], nuevo: ResolvedStep, antes: RegExp): ResolvedStep[] {
  if (!lista.length) return lista;
  let i = lista.findIndex((p) => antes.test(p.item.id) || antes.test(p.item.title));
  if (i < 0) i = lista.length - 1;
  return [...lista.slice(0, i), nuevo, ...lista.slice(i)];
}

export function withDayExtras(
  lista: ResolvedStep[],
  time: RuleTime,
  length: OfficeLength,
  extras: { troparion: boolean; akathist: boolean } | undefined,
): ResolvedStep[] {
  let salida = lista;
  if (extras?.troparion !== false && length === 'habitual') {
    salida = insertarAntes(salida, TROPARIO, /despedida/i);
  }
  if (extras?.akathist !== false && time === 'noche' && length !== 'breve') {
    salida = insertarAntes(salida, AKATHISTOS, /damasceno|oraciones antes del sue|ne-oraciones|despedida/i);
  }
  return salida;
}
