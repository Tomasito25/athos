/**
 * Los grandes monasterios de fuera del Athos: en el mapa, en tierra, sin
 * rótulos encima unos de otros, y todos de la Iglesia ortodoxa.
 */
import { describe, expect, it } from 'vitest';
import { ATHOS_ON_WORLD_MAP, WORLD_MONASTERIES } from '@/content/monasterios-mundo';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { RADIO, dentroDelMapa, proyectar, rotulo, type Caja } from '@/lib/mapa';
import { worldMapPoints } from '@/features/monasteries/world-map-points';

const MAPA = MAPAS_BASE.ortodoxia;
const choca = (a: Caja, b: Caja) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const tapa = (c: Caja, x: number, y: number, r: number) => {
  const cx = Math.max(c.x0, Math.min(x, c.x1));
  const cy = Math.max(c.y0, Math.min(y, c.y1));
  return (cx - x) ** 2 + (cy - y) ** 2 < r * r;
};

describe('los monasterios del mundo ortodoxo', () => {
  it('cada uno tiene su ficha completa', () => {
    const ids = new Set<string>();
    for (const m of WORLD_MONASTERIES) {
      expect(ids.has(m.id), m.id).toBe(false);
      ids.add(m.id);
      expect(m.wikidata, m.id).toMatch(/^Q\d+$/);
      expect(m.description.length, m.id).toBeGreaterThan(120);
      expect(m.today.length, m.id).toBeGreaterThan(80);
      expect(m.saints.length, m.id).toBeGreaterThan(0);
    }
    expect(WORLD_MONASTERIES.length).toBeGreaterThanOrEqual(18);
  });

  it('ninguno es de las Iglesias no calcedonianas', () => {
    const texto = WORLD_MONASTERIES.map((m) => `${m.name} ${m.church}`).join(' ');
    expect(texto).not.toMatch(/copt|armeni|etíop|siríaca|malankar/i);
  });

  it('todos caen dentro del mapa', () => {
    for (const m of [...WORLD_MONASTERIES, ATHOS_ON_WORLD_MAP]) {
      expect(dentroDelMapa(MAPA, m.coords.lon, m.coords.lat), m.id).toBe(true);
    }
  });

  it('ningún rótulo pisa a otro, ni tapa un punto, ni se sale', () => {
    const puntos = worldMapPoints().map((p) => {
      const [x, y] = proyectar(MAPA, p.lon, p.lat);
      const r = RADIO[p.look ?? 'lleno'];
      return { ...p, x, y, r, caja: rotulo(x, y, p.label, r, 1, p.side, p.dy).caja };
    });
    const fallos: string[] = [];
    for (const a of puntos) {
      const c = a.caja;
      if (c.x0 < 0 || c.x1 > MAPA.ancho || c.y0 < 0 || c.y1 > MAPA.alto) fallos.push(`${a.id}: el rótulo se sale`);
      for (const b of puntos) {
        if (a === b) continue;
        if (a.id < b.id && choca(c, b.caja)) fallos.push(`${a.id} y ${b.id}: rótulos encima`);
        if (tapa(c, b.x, b.y, b.r)) fallos.push(`${a.id}: su rótulo tapa el punto de ${b.id}`);
      }
    }
    expect(fallos).toEqual([]);
  });
});
