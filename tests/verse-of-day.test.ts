/**
 * El versículo del día.
 *
 * ATHOS pone la referencia; el texto lo pone la Biblia que la aplicación
 * lleva dentro. Por eso lo único que hay que comprobar —y hay que
 * comprobarlo entero— es que las ciento treinta y cinco referencias señalan
 * a un versículo que existe de verdad. Una mal escrita saldría en la portada,
 * que es la primera pantalla que se ve cada mañana.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { VERSES_OF_DAY, verseReferenceFor } from '@/content/verse-of-day';
import { chaptersOf, inPericope, parsePassage } from '@/lib/pericope';

interface LibroJson {
  id: string;
  name: string;
  chapters: Record<string, Record<string, string>>;
}

const cache = new Map<string, LibroJson>();
const libro = (id: string): LibroJson => {
  if (!cache.has(id)) {
    cache.set(id, JSON.parse(readFileSync(`public/content/bible/rv1909/${id}.json`, 'utf-8')));
  }
  return cache.get(id)!;
};

/** El texto al que apunta una referencia, leído del archivo de verdad. */
function textoDe(referencia: string): string {
  const pericopas = parsePassage(referencia);
  expect(pericopas, `no se entiende la referencia «${referencia}»`).not.toBeNull();

  let salida = '';
  for (const p of pericopas!) {
    const datos = libro(p.bookId);
    for (const capitulo of chaptersOf(p.ranges)) {
      const versiculos = datos.chapters[String(capitulo)] ?? {};
      for (const [n, texto] of Object.entries(versiculos)) {
        if (inPericope(p.ranges, capitulo, Number(n))) salida += ` ${texto}`;
      }
    }
  }
  return salida.trim();
}

describe('las referencias del versículo del día', () => {
  it('no se repite ninguna', () => {
    expect(new Set(VERSES_OF_DAY).size).toBe(VERSES_OF_DAY.length);
  });

  it('son bastantes para que un año no dé muchas vueltas', () => {
    expect(VERSES_OF_DAY.length).toBeGreaterThanOrEqual(120);
  });

  it.each(VERSES_OF_DAY)('«%s» señala a un versículo que existe', (referencia) => {
    const texto = textoDe(referencia);
    expect(texto, `«${referencia}» no devuelve texto`).not.toBe('');
    // Un versículo de verdad, no una línea suelta de dos palabras.
    expect(texto.length, `«${referencia}» devuelve muy poco: ${texto}`).toBeGreaterThan(25);
  });

  it('ninguno es tan largo que deje de ser un versículo para llevarse encima', () => {
    const largos = VERSES_OF_DAY.map((r) => ({ r, n: textoDe(r).length })).filter((x) => x.n > 400);
    expect(largos).toEqual([]);
  });
});

describe('el reparto por días', () => {
  it('el mismo día del mismo año da siempre el mismo versículo', () => {
    const a = verseReferenceFor(new Date(2026, 8, 4));
    const b = verseReferenceFor(new Date(2026, 8, 4, 23, 59));
    expect(a).toBe(b);
  });

  it('días seguidos dan versículos distintos', () => {
    const uno = verseReferenceFor(new Date(2026, 8, 4));
    const dos = verseReferenceFor(new Date(2026, 8, 5));
    expect(uno).not.toBe(dos);
  });

  it('recorre la lista entera a lo largo de un año', () => {
    const vistos = new Set<string>();
    for (let i = 0; i < 365; i += 1) {
      vistos.add(verseReferenceFor(new Date(2026, 0, 1 + i)));
    }
    expect(vistos.size).toBe(VERSES_OF_DAY.length);
  });
});
