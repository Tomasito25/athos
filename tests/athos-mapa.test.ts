/**
 * El Monte Athos, ya con mapa de verdad: cada monasterio y cada skete en
 * tierra y en su sitio, ningún rótulo encima de otro, cada skete colgado del
 * monasterio que le corresponde y cada fiesta en su día del calendario civil.
 */
import { describe, expect, it } from 'vitest';
import { MONASTERIES } from '@/content/athos';
import { ATHOS_ICON_FEASTS, ATHOS_MAP_LABELS, ATHOS_PLACES, ATHOS_SKETES } from '@/content/athos-lugares';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { athosFeastCalendar, nextMonasteryFeast } from '@/lib/athos-feasts';
import { RADIO, dentroDelMapa, proyectar, rotulo, type Caja } from '@/lib/mapa';
import { addDaysIso, isoToJdn, jdnToIso, julianToJdn } from '@/lib/calendar/jdn';
import { paschaIso, paschaJdn } from '@/lib/calendar/pascha';
import { athosMapPoints } from '@/features/athos/athos-map-points';

const MAPA = MAPAS_BASE.athos;

const anillos = MAPA.tierra
  .split('Z')
  .filter(Boolean)
  .map((t) =>
    t
      .replace(/^M/, '')
      .split('L')
      .map((par) => par.trim().split(' ').map(Number) as [number, number]),
  );

/** Dentro de la tierra, o a menos de `margen` unidades de la orilla. */
function enTierra(lon: number, lat: number, margen = 6) {
  const [x, y] = proyectar(MAPA, lon, lat);
  let n = 0;
  for (const anillo of anillos) {
    for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
      const [xi, yi] = anillo[i]!;
      const [xj, yj] = anillo[j]!;
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) n += 1;
    }
  }
  if (n % 2 === 1) return true;
  return anillos.some((anillo) =>
    anillo.some(([ax, ay], i) => {
      const [bx, by] = anillo[(i + 1) % anillo.length]!;
      const largo = (bx - ax) ** 2 + (by - ay) ** 2;
      const t = largo ? Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / largo)) : 0;
      return Math.hypot(x - ax - t * (bx - ax), y - ay - t * (by - ay)) <= margen;
    }),
  );
}

const choca = (a: Caja, b: Caja) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const tapa = (c: Caja, x: number, y: number, r: number) => {
  const cx = Math.max(c.x0, Math.min(x, c.x1));
  const cy = Math.max(c.y0, Math.min(y, c.y1));
  return (cx - x) ** 2 + (cy - y) ** 2 < r * r;
};

describe('el mapa de la península', () => {
  it('todos los sitios caen dentro del dibujo', () => {
    for (const s of [...MONASTERIES, ...ATHOS_SKETES, ...ATHOS_PLACES]) {
      expect(dentroDelMapa(MAPA, s.coords.lon, s.coords.lat), s.id).toBe(true);
    }
  });

  it('los monasterios y los sketes están en tierra, no en el mar', () => {
    for (const s of [...MONASTERIES, ...ATHOS_SKETES, ...ATHOS_PLACES]) {
      expect(enTierra(s.coords.lon, s.coords.lat), s.id).toBe(true);
    }
  });

  it('la costa tiene detalle: no es un esquema de veinte vértices', () => {
    const vertices = anillos.reduce((n, a) => n + a.length, 0);
    expect(vertices).toBeGreaterThan(400);
    expect(MAPA.relieve?.length).toBe(MAPA.niveles?.length);
  });

  it('ningún rótulo pisa a otro, ni tapa un punto, ni se sale', () => {
    const puntos = athosMapPoints(MONASTERIES).map((p) => {
      const [x, y] = proyectar(MAPA, p.lon, p.lat);
      const r = RADIO[p.look ?? 'lleno'];
      return { ...p, x, y, r, caja: p.quiet ? null : rotulo(x, y, p.label, r, 1, p.side, p.dy).caja };
    });
    const fallos: string[] = [];
    for (const a of puntos) {
      if (!a.caja) continue;
      const c = a.caja;
      if (c.x0 < 0 || c.x1 > MAPA.ancho || c.y0 < 0 || c.y1 > MAPA.alto) fallos.push(`${a.id}: el rótulo se sale`);
      for (const b of puntos) {
        if (a === b) continue;
        if (b.caja && a.id < b.id && choca(c, b.caja)) fallos.push(`${a.id} y ${b.id}: rótulos encima`);
        if (tapa(c, b.x, b.y, b.r)) fallos.push(`${a.id}: su rótulo tapa el punto de ${b.id}`);
      }
    }
    expect(fallos).toEqual([]);
  });

  it('cada monasterio y cada lugar tiene dicho dónde va su rótulo', () => {
    for (const s of [...MONASTERIES, ...ATHOS_PLACES]) expect(ATHOS_MAP_LABELS[s.id], s.id).toBeTruthy();
  });

  it('en la ficha de un monasterio sólo se rotula él', () => {
    const puntos = athosMapPoints(MONASTERIES, 'vatopedi');
    const rotulados = puntos.filter((p) => !p.quiet).map((p) => p.id);
    expect(rotulados).toContain('vatopedi');
    expect(rotulados).toContain('san-andres');
    expect(rotulados).not.toContain('iviron');
  });
});

describe('los sketes', () => {
  it('son doce y cada uno depende de un monasterio que existe', () => {
    expect(ATHOS_SKETES.length).toBe(12);
    const ids = new Set(MONASTERIES.map((m) => m.id));
    for (const s of ATHOS_SKETES) expect(ids.has(s.monastery), s.id).toBe(true);
  });

  it('se reparten como dice el artículo', () => {
    const cuenta = (id: string) => ATHOS_SKETES.filter((s) => s.monastery === id).length;
    expect(cuenta('megisti-lavra')).toBe(3);
    expect(cuenta('vatopedi')).toBe(2);
    expect(cuenta('agiou-pavlou')).toBe(2);
    for (const id of ['iviron', 'koutloumousiou', 'pantokratoros', 'xenophontos', 'agiou-panteleimonos']) {
      expect(cuenta(id), id).toBe(1);
    }
  });

  it('Kavsokalyvia es de la Gran Laura y el Profeta Elías de Pantokrátoros', () => {
    expect(ATHOS_SKETES.find((s) => s.id === 'kavsokalyvia')?.monastery).toBe('megisti-lavra');
    expect(ATHOS_SKETES.find((s) => s.id === 'profeta-elias')?.monastery).toBe('pantokratoros');
    expect(ATHOS_SKETES.find((s) => s.id === 'san-andres')?.monastery).toBe('vatopedi');
  });
});

describe('los monasterios, revisados', () => {
  it('nadie sin canonizar lleva el título de santo', () => {
    const texto = MONASTERIES.flatMap((m) => m.saints ?? []).join(' | ');
    expect(texto).not.toMatch(/San Efrén de Filoteu|San Cosme de Grigoriu/);
  });

  it('todos tienen coordenadas de Wikidata y su fiesta', () => {
    for (const m of MONASTERIES) {
      expect(m.wikidata, m.id).toMatch(/^Q\d+$/);
      expect(m.feast.day ?? m.feast.paschaOffset, m.id).toBeDefined();
      if (m.feast.day) expect(m.feast.day, m.id).toMatch(/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
    }
  });
});

describe('las fiestas de la Montaña', () => {
  it('la Anunciación de Vatopedi cae el 7 de abril del calendario civil', () => {
    const vatopedi = MONASTERIES.find((m) => m.id === 'vatopedi')!;
    expect(nextMonasteryFeast(vatopedi, '2027-01-01')?.date).toBe('2027-04-07');
  });

  it('la Navidad de Simonopetra cae el 7 de enero', () => {
    const simonopetra = MONASTERIES.find((m) => m.id === 'simonopetra')!;
    expect(nextMonasteryFeast(simonopetra, '2026-11-01')?.date).toBe('2027-01-07');
  });

  it('Esfigmenu celebra la Ascensión, cuarenta días después de la Pascua', () => {
    const esfigmenu = MONASTERIES.find((m) => m.id === 'esphigmenou')!;
    expect(nextMonasteryFeast(esfigmenu, '2027-01-01')?.date).toBe(addDaysIso(paschaIso(2027), 39));
  });

  it('san Jorge pasa al lunes de Pascua si cae antes', () => {
    // Un año en que el 23 de abril juliano cae antes de la Pascua.
    let ano = 2000;
    while (julianToJdn(ano, 4, 23) > paschaJdn(ano)) ano += 1;
    const zografu = MONASTERIES.find((m) => m.id === 'zographou')!;
    const f = nextMonasteryFeast(zografu, `${ano}-01-01`)!;
    expect(f.date).toBe(jdnToIso(paschaJdn(ano) + 1));
    expect(f.moved).toBe(true);
  });

  it('el 19 de diciembre civil, san Nicolás, celebran Stavronikita y San Gregorio', () => {
    const hoy = athosFeastCalendar(MONASTERIES, '2026-12-19').filter((f) => f.days === 0);
    expect(hoy.map((f) => f.monasteryId).sort()).toEqual(['osiou-grigoriou', 'stavronikita']);
  });

  it('el calendario va por orden y no se olvida de nadie', () => {
    const calendario = athosFeastCalendar(MONASTERIES, '2026-11-01');
    expect(calendario.filter((f) => f.kind === 'monasterio').length).toBe(20);
    expect(calendario.filter((f) => f.kind === 'icono').length).toBe(ATHOS_ICON_FEASTS.length);
    for (let i = 1; i < calendario.length; i++) expect(calendario[i]!.days).toBeGreaterThanOrEqual(calendario[i - 1]!.days);
    expect(calendario.every((f) => f.days >= 0 && f.days < 400)).toBe(true);
    expect(isoToJdn(calendario[0]!.date)).toBeGreaterThanOrEqual(isoToJdn('2026-11-01'));
  });
});
