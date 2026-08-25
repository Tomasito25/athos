/** Análisis de las referencias del leccionario. */
import { describe, expect, it } from 'vitest';
import { chaptersOf, inPericope, parsePassage, parsePericope } from '@/lib/pericope';
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

describe('las formas que traía el leccionario y no se entendían', () => {
  it('un libro de un solo capítulo cuenta versículos, no capítulos', () => {
    // Judas no tiene diez capítulos: tiene uno.
    expect(parsePericope('Judas 1-10')?.ranges).toEqual([{ chapter: 1, from: 1, to: 10 }]);
    expect(parsePericope('Judas 11-25')?.ranges).toEqual([{ chapter: 1, from: 11, to: 25 }]);
    expect(parsePericope('Judas 1-7; 17-25')?.ranges).toEqual([
      { chapter: 1, from: 1, to: 7 },
      { chapter: 1, from: 17, to: 25 },
    ]);
    expect(parsePericope('Filemón 1-6')?.ranges).toEqual([{ chapter: 1, from: 1, to: 6 }]);
  });

  it('la notación de punto se traduce a la española', () => {
    expect(parsePericope('1 Corintios 5.6-8')?.ranges).toEqual([{ chapter: 5, from: 6, to: 8 }]);
    expect(parsePericope('Génesis 17.15-17, 19')?.ranges).toEqual([
      { chapter: 17, from: 15, to: 17 },
      { chapter: 17, from: 19, to: 19 },
    ]);
    expect(parsePericope('Éxodo 40:1-5, 9-10')?.ranges).toEqual([
      { chapter: 40, from: 1, to: 5 },
      { chapter: 40, from: 9, to: 10 },
    ]);
  });

  it('el punto español que separa tramos sigue funcionando', () => {
    // La prueba de que normalizar no rompió lo que ya estaba bien.
    expect(parsePericope('Mateo 10, 32-33. 37-38')?.ranges).toEqual([
      { chapter: 10, from: 32, to: 33 },
      { chapter: 10, from: 37, to: 38 },
    ]);
  });

  it('el tramo que cruza de capítulo a medio escribir', () => {
    // «35-6.1»: del versículo 35 del capítulo en curso al 1 del capítulo 6.
    expect(parsePericope('Marcos 5, 22-24; 35-6.1')?.ranges).toEqual([
      { chapter: 5, from: 22, to: 24 },
      { chapter: 5, from: 35 },
      { chapter: 6, to: 1 },
    ]);
    expect(parsePericope('Hebreos 11, 24-26; 32-12.2')?.ranges).toEqual([
      { chapter: 11, from: 24, to: 26 },
      { chapter: 11, from: 32 },
      { chapter: 12, to: 2 },
    ]);
  });

  it('una referencia puede abarcar dos libros', () => {
    const p = parsePassage('1 Corintios 5.6-8; Gálatas 3.13-14');
    expect(p?.map((x) => x.bookId)).toEqual(['1CO', 'GAL']);
    expect(p?.[0].ranges).toEqual([{ chapter: 5, from: 6, to: 8 }]);
    expect(p?.[1].ranges).toEqual([{ chapter: 3, from: 13, to: 14 }]);
  });

  it('un solo libro sigue devolviendo una sola perícopa', () => {
    expect(parsePassage('Lucas 10, 38-42; 11, 27-28')?.length).toBe(1);
  });

  it('si una parte no se entiende, no se muestra la otra a medias', () => {
    // Mostrar media lectura y callar la otra media sería peor que remitir.
    expect(parsePassage('Mateo 5, 1-3; Sabiduría 3, 1-9')).toBeNull();
  });

  it('las abreviaturas inglesas que orthocal deja sin traducir', () => {
    expect(parsePericope('Matt 27:39-54')?.bookId).toBe('MAT');
  });

  it('las coletillas no estorban', () => {
    expect(parsePericope('Proverbios 15.20-16.9 (LXX)')?.ranges).toEqual([
      { chapter: 15, from: 20 },
      { chapter: 16, to: 9 },
    ]);
  });
});

describe.skipIf(!hay)('contra el leccionario completo', () => {
  const datos = JSON.parse(readFileSync(ruta, 'utf-8')) as {
    readings: Array<Array<{ kind: string; reference: string; book?: string }>>;
  };

  it('se entienden TODAS las lecturas de Evangelio y Epístola, sin excepciones', () => {
    // Antes esta prueba saltaba las lecturas sin campo `book`, y por ese hueco
    // se colaban «Judas 1-10» —versículos de un libro de un solo capítulo— y
    // las referencias que cruzan de un libro a otro. Ahora no se salta ninguna.
    const fallos: string[] = [];
    let total = 0;
    for (const juego of datos.readings) {
      for (const lectura of juego) {
        if (lectura.kind !== 'evangelio' && lectura.kind !== 'epistola') continue;
        total += 1;
        const p = parsePassage(lectura.reference);
        if (!p) fallos.push(lectura.reference);
        else if (lectura.book && !p.some((x) => x.bookId === lectura.book)) {
          fallos.push(`${lectura.reference} → ${p.map((x) => x.bookId).join('+')}`);
        }
      }
    }
    expect(total).toBeGreaterThan(8000);
    expect(fallos.slice(0, 10)).toEqual([]);
  });

  it('los Evangelios de Maitines y de la Pasión también', () => {
    const fallos: string[] = [];
    for (const juego of datos.readings) {
      for (const lectura of juego) {
        if (lectura.kind !== 'evangelio-maitines' && lectura.kind !== 'evangelio-pasion') continue;
        if (!parsePassage(lectura.reference)) fallos.push(lectura.reference);
      }
    }
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
