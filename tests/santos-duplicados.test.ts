/**
 * Un mismo santo no puede salir dos veces el mismo día.
 *
 * La prueba de duplicados que ya había comparaba los nombres normalizados, y
 * no vio que «San Jorge el Trofeóforo» y «San Jorge, el Gran Mártir» eran la
 * misma ficha escrita de dos maneras. Hubo nueve casos así: el calendario
 * mostraba a san Jorge dos veces el 23 de abril y al traslado de san Atanasio
 * dos veces el 2 de mayo.
 *
 * Ésta compara lo que distingue a una persona —el nombre propio, no los
 * «san», «traslado» o «gran mártir» que rodean a cualquiera— entre las
 * fichas del mismo día. Los pocos casos de dos santos distintos que
 * comparten una palabra se declaran abajo, uno por uno.
 */
import { describe, expect, it } from 'vitest';
import { SAINTS } from '@/content/saints';

const COMUNES = new Set(
  (
    'san santa santo santos santas los las el la de del y e en su sus traslado traslacion reliquias ' +
    'dormicion reposo sinaxis hallazgo memoria gran grande magno apostol apostoles martir martires ' +
    'profeta padre padres confesor obispo monje igual iguales al venerable justo justa primer primero ' +
    'llamado megalomartir trofeoforo taumaturgo preciosa'
  ).split(' '),
);

const claves = (nombre: string) =>
  new Set(
    nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .match(/[a-z]+/g)
      ?.filter((w) => w.length > 2 && !COMUNES.has(w)) ?? [],
  );

/** Santos distintos que el mismo día comparten una palabra del nombre. */
const DISTINTOS = new Set([
  'efren-sirio-santo|isaac-sirio',
  // San Justino Popović tomó el nombre del Filósofo al hacerse monje, y la
  // Iglesia serbia los celebra el mismo día a propósito.
  'justino-filosofo|justino-popovic',
]);

describe('el santoral', () => {
  it('no repite la misma conmemoración el mismo día con otro nombre', () => {
    const porDia = new Map<string, typeof SAINTS>();
    for (const s of SAINTS) porDia.set(s.day, [...(porDia.get(s.day) ?? []), s]);

    const repetidos: string[] = [];
    for (const [dia, lista] of porDia) {
      for (let i = 0; i < lista.length; i += 1) {
        for (let j = i + 1; j < lista.length; j += 1) {
          const a = lista[i]!;
          const b = lista[j]!;
          const par = [a.id, b.id].sort().join('|');
          const ka = claves(a.name);
          const comun = [...claves(b.name)].filter((w) => ka.has(w));
          if (comun.length && !DISTINTOS.has(par)) repetidos.push(`${dia}: ${par} (${comun.join(', ')})`);
        }
      }
    }
    expect(repetidos).toEqual([]);
  });
});
