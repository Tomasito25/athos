/**
 * Las oraciones hechas de Escritura.
 *
 * El texto no está escrito en el libro de oraciones: lo trae la Biblia de ATHOS
 * al abrirlas, por su referencia. Una referencia mal puesta no da error, sino una
 * página que no enseña nada, así que aquí se abre cada una de verdad.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PRAYERS } from '@/content/prayers';
import { PRAYERS_ALSO, PRAYER_CATEGORIES, VIRTUES_IN_ORDER } from '@/content/prayer-categories';
import { parsePassage } from '@/lib/pericope';
import { translationOf } from '@/content/bible';

/** Los versículos de una referencia, tal como están en los ficheros de la Biblia. */
function versiculos(cita: string): string[] {
  const pericopas = parsePassage(cita);
  if (!pericopas) return [];
  const salida: string[] = [];
  for (const p of pericopas) {
    const traduccion = translationOf(p.bookId);
    const libro = JSON.parse(
      readFileSync(join(process.cwd(), 'public/content/bible', traduccion.id, `${p.bookId}.json`), 'utf8'),
    ) as { chapters: Record<string, Record<string, string>> };
    for (const tramo of p.ranges) {
      const capitulo = libro.chapters[String(tramo.chapter)];
      if (!capitulo) continue;
      for (const [n, texto] of Object.entries(capitulo)) {
        const v = Number(n);
        if (v >= (tramo.from ?? 1) && v <= (tramo.to ?? Infinity)) salida.push(texto);
      }
    }
  }
  return salida;
}

describe('las oraciones que son Escritura', () => {
  const lecturas = PRAYERS.flatMap((p) =>
    p.blocks.filter((b) => b.kind === 'reading').map((b) => ({ id: p.id, cita: b.ref ?? b.content })),
  );

  it('hay muchas, y todas se pueden abrir', () => {
    expect(lecturas.length).toBeGreaterThan(90);
    for (const { id, cita } of lecturas) {
      expect(parsePassage(cita), `${id}: no se entiende «${cita}»`).not.toBeNull();
      expect(versiculos(cita).length, `${id}: «${cita}» no trae ningún versículo`).toBeGreaterThan(0);
    }
  });

  it('cada referencia trae los versículos que dice, ni uno menos', () => {
    for (const { id, cita } of lecturas) {
      const pedidos = (parsePassage(cita) ?? []).flatMap((p) =>
        p.ranges.map((r) => (r.to ?? 0) - (r.from ?? 0) + 1),
      );
      const total = pedidos.reduce((a, b) => a + b, 0);
      if (total > 0) expect(versiculos(cita).length, `${id}: «${cita}»`).toBe(total);
    }
  });
});

describe('las oraciones que sirven para más de un momento', () => {
  const ids = new Set(PRAYERS.map((p) => p.id));

  it('todas existen', () => {
    for (const [momento, lista] of Object.entries(PRAYERS_ALSO)) {
      for (const id of lista ?? []) expect(ids.has(id), `${momento}: no existe ${id}`).toBe(true);
    }
  });

  it('ninguna repite en un momento donde ya está', () => {
    for (const [momento, lista] of Object.entries(PRAYERS_ALSO)) {
      for (const id of lista ?? []) {
        const propia = PRAYERS.find((p) => p.id === id);
        expect(propia?.category, `${id} ya es de ${momento}`).not.toBe(momento);
      }
    }
  });
});

describe('las virtudes en el libro de oraciones', () => {
  const textoReal = (id: string) =>
    PRAYERS.find((p) => p.id === id)?.blocks.some((b) => b.kind === 'text');

  it('cada virtud tiene sus oraciones, y alguna no es sólo una cita', () => {
    const nombres = new Map(PRAYER_CATEGORIES.map((c) => [c.id, c.name]));
    for (const virtud of VIRTUES_IN_ORDER) {
      expect(nombres.has(virtud), virtud).toBe(true);
      const suyas = PRAYERS.filter((p) => p.category === virtud).map((p) => p.id);
      const todas = [...suyas, ...(PRAYERS_ALSO[virtud] ?? [])];
      expect(todas.length, `${virtud} tiene pocas`).toBeGreaterThanOrEqual(5);
      expect(todas.some(textoReal), `${virtud} no tiene ninguna oración con texto`).toBe(true);
    }
  });
});
