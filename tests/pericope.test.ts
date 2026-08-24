/** Análisis de las referencias del leccionario. */
import { describe, expect, it } from 'vitest';
import { chaptersOf, inPericope, parsePericope } from '@/lib/pericope';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('referencias sencillas', () => {
  it('un tramo de versículos', () => {
    expect(parsePericope('Mateo 19, 16-26')).toEqual({
      bookId: 'MAT',
      bookName: 'Evangelio según San Mateo',
      ranges: [{ chapter: 19, from: 16, to: 26 }],
    });
  });

  it('un solo versículo', () => {
    expect(parsePericope('Juan 3, 16')?.ranges).toEqual([{ chapter: 3, from: 16, to: 16 }]);
  });

  it('un capítulo entero', () => {
    expect(parsePericope('Salmo 118')?.ranges).toEqual([{ chapter: 118 }]);
  });

  it('libros que empiezan por cifra', () => {
    const p = parsePericope('2 Corintios 8, 7-15');
    expect(p?.bookId).toBe('2CO');
    expect(p?.ranges).toEqual([{ chapter: 8, from: 7, to: 15 }]);
  });
});

describe('referencias compuestas', () => {
  it('dos capítulos separados por punto y coma', () => {
    expect(parsePericope('Lucas 10, 38-42; 11, 27-28')?.ranges).toEqual([
      { chapter: 10, from: 38, to: 42 },
      { chapter: 11, from: 27, to: 28 },
    ]);
  });

  it('cruce de capítulo con guion largo', () => {
    expect(parsePericope('1 Corintios 4, 17 – 5, 5')?.ranges).toEqual([
      { chapter: 4, from: 17 },
      { chapter: 5, to: 5 },
    ]);
  });

  it('cruce que salta un capítulo entero por medio', () => {
    expect(parsePericope('Hebreos 11, 33 – 13, 2')?.ranges).toEqual([
      { chapter: 11, from: 33 },
      { chapter: 12 },
      { chapter: 13, to: 2 },
    ]);
  });

  it('tramos sueltos dentro del mismo capítulo', () => {
    expect(parsePericope('Mateo 10, 32-33. 37-38')?.ranges).toEqual([
      { chapter: 10, from: 32, to: 33 },
      { chapter: 10, from: 37, to: 38 },
    ]);
  });
});

describe('lo que no se entiende no se recorta', () => {
  it('devuelve null en vez de adivinar', () => {
    expect(parsePericope('Composite 1 - Génesis 17.1-2, 4')).toBeNull();
    expect(parsePericope('texto sin forma de referencia')).toBeNull();
    expect(parsePericope('')).toBeNull();
  });

  it('rechaza libros que ATHOS no tiene incorporados', () => {
    // Los deuterocanónicos figuran en el canon pero sin texto.
    expect(parsePericope('Sabiduría 3, 1-9')).toBeNull();
  });
});

describe('pertenencia y capítulos', () => {
  const p = parsePericope('Lucas 10, 38-42; 11, 27-28')!;

  it('sabe qué versículos entran', () => {
    expect(inPericope(p.ranges, 10, 38)).toBe(true);
    expect(inPericope(p.ranges, 10, 42)).toBe(true);
    expect(inPericope(p.ranges, 10, 43)).toBe(false);
    expect(inPericope(p.ranges, 11, 27)).toBe(true);
    expect(inPericope(p.ranges, 11, 26)).toBe(false);
  });

  it('un capítulo sin límites entra entero', () => {
    const entero = parsePericope('Salmo 90')!;
    expect(inPericope(entero.ranges, 90, 1)).toBe(true);
    expect(inPericope(entero.ranges, 90, 16)).toBe(true);
  });

  it('enumera los capítulos que hay que cargar', () => {
    expect(chaptersOf(p.ranges)).toEqual([10, 11]);
    expect(chaptersOf(parsePericope('Hebreos 11, 33 – 13, 2')!.ranges)).toEqual([11, 12, 13]);
  });
});

/* El leccionario real es la prueba de fuego: son miles de referencias. */
const ruta = resolve(process.cwd(), 'public/content/lectionary/lectionary.json');
const hay = existsSync(ruta);

describe.skipIf(!hay)('contra el leccionario completo', () => {
  const datos = JSON.parse(readFileSync(ruta, 'utf-8')) as {
    readings: Array<Array<{ kind: string; reference: string; book?: string }>>;
  };

  it('todas las lecturas de Evangelio y Epístola se entienden', () => {
    const fallos: string[] = [];
    let total = 0;
    for (const juego of datos.readings) {
      for (const lectura of juego) {
        if (lectura.kind !== 'evangelio' && lectura.kind !== 'epistola') continue;
        if (!lectura.book) continue; // las compuestas se dejan como están
        total += 1;
        const p = parsePericope(lectura.reference);
        if (!p) fallos.push(lectura.reference);
        else if (p.bookId !== lectura.book) fallos.push(`${lectura.reference} → ${p.bookId}`);
      }
    }
    expect(total).toBeGreaterThan(1000);
    expect(fallos.slice(0, 10)).toEqual([]);
  });

  it('ningún tramo sale al revés', () => {
    for (const juego of datos.readings) {
      for (const lectura of juego) {
        if (!lectura.book) continue;
        const p = parsePericope(lectura.reference);
        if (!p) continue;
        for (const r of p.ranges) {
          if (r.from !== undefined && r.to !== undefined) {
            expect(r.to, lectura.reference).toBeGreaterThanOrEqual(r.from);
          }
        }
      }
    }
  });
});
