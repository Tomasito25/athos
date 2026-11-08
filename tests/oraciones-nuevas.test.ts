/**
 * Las oraciones añadidas en la 1.30.
 *
 * Todas son traducciones de textos que existen y lo dicen; la Theotokos y los
 * santos tienen ya su sitio en el menú; el himno de san Nectario va verso a
 * verso con su griego; y la oración a san Nicolás es la misma del akáthistos.
 */
import { describe, expect, it } from 'vitest';
import { FIFTH_PRAYERS } from '@/content/prayers-fifth';
import { PRAYERS, PRAYER_CATEGORIES } from '@/content/prayers';
import { MOMENT_GROUPS } from '@/content/moments';
import { AKATHISTOS_NICOLAS } from '@/content/akathistos-mas';

describe('las oraciones nuevas', () => {
  it('todas son traducciones de un texto que existe, y lo dicen', () => {
    expect(FIFTH_PRAYERS.length).toBeGreaterThanOrEqual(10);
    for (const p of FIFTH_PRAYERS) {
      expect(p.meta?.source, p.id).toMatch(/Traducción al español hecha para ATHOS/);
      expect(p.meta?.notes, p.id).toMatch(/^Es una traducción de un texto que existe/);
      expect(p.blocks.some((b) => b.kind === 'text'), p.id).toBe(true);
    }
  });

  it('están en el libro, sin repetir identificador', () => {
    const ids = PRAYERS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of FIFTH_PRAYERS) expect(ids, p.id).toContain(p.id);
  });

  it('la Theotokos y los santos tienen su momento en el menú', () => {
    expect(PRAYER_CATEGORIES.some((c) => c.id === 'santos')).toBe(true);
    expect(MOMENT_GROUPS.flatMap((g) => g.moments)).toContain('santos');
    expect(PRAYERS.filter((p) => p.category === 'santos').length).toBeGreaterThanOrEqual(3);
  });

  it('el himno de san Nectario va con su griego, verso a verso', () => {
    const agni = FIFTH_PRAYERS.find((p) => p.id === 'agni-parthene')!;
    const versos = agni.blocks.filter((b) => b.kind === 'text');
    expect(versos).toHaveLength(24);
    for (const v of versos) expect(v.greek, v.content).toMatch(/[Ͱ-Ͽἀ-῿]/);
  });

  it('la oración a san Nicolás es la misma que cierra su akáthistos', () => {
    const nicolas = FIFTH_PRAYERS.find((p) => p.id === 'a-san-nicolas')!;
    const delAkathistos = AKATHISTOS_NICOLAS[AKATHISTOS_NICOLAS.length - 1]!.blocks.find((b) => b.kind === 'text')!;
    expect(nicolas.blocks.some((b) => b.content === delAkathistos.content)).toBe(true);
  });
});
