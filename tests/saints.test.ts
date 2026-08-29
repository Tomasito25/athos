/**
 * El santoral.
 *
 * Lo que se pidió fue un santo cada día, y eso es exactamente lo que hay que
 * comprobar: que no queda ni un hueco, incluido el 29 de febrero. Un calendario
 * con días en blanco enseña a saltárselo.
 *
 * Lo demás que se vigila aquí es la regla de siempre: las vidas son reseñas
 * escritas para ATHOS, y ninguna puede presentarse como texto litúrgico.
 */
import { describe, expect, it } from 'vitest';
import { SAINTS, SAINT_DAYS, saintsOnDay } from '@/content/saints';

/** Los 366 días, con el bisiesto incluido. */
function todosLosDias(): string[] {
  const diasPorMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const dias: string[] = [];
  for (let mes = 1; mes <= 12; mes += 1) {
    for (let dia = 1; dia <= diasPorMes[mes - 1]; dia += 1) {
      dias.push(`${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`);
    }
  }
  return dias;
}

describe('un santo cada día', () => {
  it('no deja ningún día del año sin conmemoración', () => {
    const vacios = todosLosDias().filter((dia) => saintsOnDay(dia).length === 0);
    expect(vacios, `días sin santo: ${vacios.join(' ')}`).toEqual([]);
  });

  it('incluye el 29 de febrero, que sólo llega cada cuatro años', () => {
    expect(saintsOnDay('02-29').length).toBeGreaterThan(0);
  });

  it('no inventa días que no existen', () => {
    const reales = new Set(todosLosDias());
    for (const dia of SAINT_DAYS) {
      expect(reales.has(dia), `${dia} no es un día del calendario`).toBe(true);
    }
  });
});

describe('las fichas', () => {
  it('no repiten identificador', () => {
    const vistos = new Map<string, string>();
    for (const santo of SAINTS) {
      expect(vistos.has(santo.id), `${santo.id} repetido: ${vistos.get(santo.id)} y ${santo.name}`).toBe(
        false,
      );
      vistos.set(santo.id, santo.name);
    }
  });

  it('traen una reseña que dice algo, no una línea de relleno', () => {
    for (const santo of SAINTS) {
      expect(santo.biography.length, `${santo.name}: reseña demasiado corta`).toBeGreaterThan(120);
    }
  });

  it('declaran que la vida la ha redactado ATHOS', () => {
    for (const santo of SAINTS) {
      expect(santo.meta.source, santo.name).toMatch(/ATHOS/);
      expect(santo.meta.license, santo.name).not.toBe('traditional');
    }
  });

  it('no dan por incorporado un himno que está pendiente', () => {
    for (const santo of SAINTS) {
      const pendiente = (santo.troparion ?? []).some((b) => b.kind === 'pending');
      if (pendiente) {
        expect(santo.status, `${santo.name} se declara completo con el tropario pendiente`).not.toBe(
          'complete',
        );
      }
    }
  });


  it('no conmemora dos veces al mismo santo el mismo día', () => {
    // Pasó: san Demetrio estaba tres veces el 26 de octubre, con tres fichas
    // distintas, porque las tandas del santoral se escribieron por separado.
    // En una lista larga no se nota; en un calendario que enseña el santo del
    // día, se ve todos los años.
    const clave = (nombre: string) =>
      nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\b(san|santa|santo|santos|santas|de|del|la|el|los|las|y)\b/g, '')
        .replace(/[^a-z]/g, '');

    for (const dia of SAINT_DAYS) {
      const claves = saintsOnDay(dia).map((s) => clave(s.name));
      for (let i = 0; i < claves.length; i += 1) {
        for (let j = i + 1; j < claves.length; j += 1) {
          const [a, b] = [claves[i], claves[j]];
          expect(
            a === b || a.includes(b) || b.includes(a),
            `${dia}: repetidos «${saintsOnDay(dia)[i].name}» y «${saintsOnDay(dia)[j].name}»`,
          ).toBe(false);
        }
      }
    }
  });

  it('llevan al menos una categoría', () => {
    for (const santo of SAINTS) {
      expect(santo.category.length, santo.name).toBeGreaterThan(0);
    }
  });
});
