/**
 * La portada de la biblioteca.
 *
 * Lo que se vigila aquí es que las cuentas sean de verdad. Un número escrito a
 * mano en una tarjeta se queda viejo el día que alguien añade contenido, y a
 * partir de ese día miente. Estas pruebas comprueban que cada cuenta coincide
 * con lo que hay detrás.
 */
import { describe, expect, it } from 'vitest';
import { LIBRARY_GROUPS, LIBRARY_SECTIONS } from '@/content/library';
import { CATECHISM_INDEX } from '@/content/catechism-parts';
import { CHURCH_FATHERS } from '@/content/fathers';
import { MONASTERIES, ATHOS_ARTICLES } from '@/content/athos';
import { COUNCILS } from '@/content/history-all';

const porId = new Map(LIBRARY_SECTIONS.map((s) => [s.id, s]));

describe('las cuentas de la portada', () => {
  it('coinciden con el contenido que hay detrás', () => {
    expect(porId.get('catecismo')?.count).toBe(CATECHISM_INDEX.length);
    expect(porId.get('padres')?.count).toBe(CHURCH_FATHERS.length);
    expect(porId.get('historia')?.count).toBe(COUNCILS.length);
    expect(porId.get('athos')?.count).toBe(MONASTERIES.length + ATHOS_ARTICLES.length);
  });

  it('ninguna sección se anuncia vacía', () => {
    for (const s of LIBRARY_SECTIONS) {
      expect(s.count, `${s.title}: cuenta cero`).toBeGreaterThan(0);
      expect(s.unit.length, `${s.title}: sin unidad`).toBeGreaterThan(2);
    }
  });

  it('cada tarjeta dice qué hay dentro, no sólo cómo se llama', () => {
    for (const s of LIBRARY_SECTIONS) {
      expect(s.text.length, `${s.title}: descripción escueta`).toBeGreaterThan(80);
    }
  });

  it('los bloques están explicados y ninguno se queda con una tarjeta', () => {
    for (const g of LIBRARY_GROUPS) {
      expect(g.sections.length, `${g.title}`).toBeGreaterThan(1);
      expect(g.note.length, `${g.title}: sin explicar`).toBeGreaterThan(40);
    }
  });

  it('las rutas empiezan por la biblioteca', () => {
    for (const s of LIBRARY_SECTIONS) {
      expect(s.to.startsWith('/biblioteca/'), `${s.title}: ${s.to}`).toBe(true);
    }
  });
});
