/**
 * Los mapas de costa real: cada lugar en tierra y en su sitio, cada pasaje
 * enlazable, y ningún rótulo encima de otro.
 *
 * Los rótulos se colocan a mano (a qué lado, cuánto se bajan), y un cambio en
 * uno descoloca a sus vecinos sin que nadie lo vea hasta abrir el mapa. Aquí
 * se calculan las cajas con la misma función que usa el componente.
 */
import { describe, expect, it } from 'vitest';
import { MAPAS_BASE, type MapaBase } from '@/content/generated/mapas';
import { MAP_EPOCHS, SEE_STATUS_LOOK } from '@/content/history-maps';
import {
  ASIA_KIND_LOOK,
  ASIA_PLACES,
  HOLY_LAND,
  HOLY_LAND_WATERS,
  PAUL_JOURNEYS,
  PAUL_PLACES,
  type WaterName,
} from '@/content/mapas-biblicos';
import { HISTORY_TIMELINE } from '@/content/history-all';
import { ORTHODOX_CHURCHES } from '@/content/iglesias-hoy';
import { citationFor } from '@/lib/citation';
import {
  LETRA,
  RADIO,
  dentroDelMapa,
  proyectar,
  rotulo,
  vista,
  type Aspecto,
  type Caja,
  type Encuadre,
  type Lado,
} from '@/lib/mapa';

interface Punto {
  id: string;
  lon: number;
  lat: number;
  label: string;
  side?: Lado;
  dy?: number;
  look?: Aspecto;
  fuera?: { x: number; y: number };
}

const choca = (a: Caja, b: Caja) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/** ¿Pisa la caja al círculo? Se busca el punto de la caja más cercano al centro. */
function tapa(c: Caja, x: number, y: number, r: number) {
  const cx = Math.max(c.x0, Math.min(x, c.x1));
  const cy = Math.max(c.y0, Math.min(y, c.y1));
  return (cx - x) ** 2 + (cy - y) ** 2 < r * r;
}

/** Los choques de un mapa, en frases legibles; vacío si todo cabe. */
function choques(mapa: MapaBase, puntos: Punto[], encuadre?: Encuadre, aguas: WaterName[] = []) {
  const v = vista(mapa, encuadre);
  const items = puntos.map((p) => {
    const [x, y] = p.fuera ? [p.fuera.x, p.fuera.y] : proyectar(mapa, p.lon, p.lat);
    const r = RADIO[p.look ?? 'lleno'] * v.f;
    return { id: p.id, x, y, r, caja: rotulo(x, y, p.label, r, v.f, p.side, p.dy).caja };
  });
  // Los nombres del agua: centrados en su sitio, con la letra algo menor.
  const letraAgua = LETRA * v.f * (26 / 30);
  const cajasAgua = aguas.map((a) => {
    const [x, y] = proyectar(mapa, a.lon, a.lat);
    const lineas = a.label.split('\n');
    const ancho = Math.max(...lineas.map((l) => l.length)) * 0.6 * letraAgua;
    return {
      id: a.id,
      caja: { x0: x - ancho / 2, x1: x + ancho / 2, y0: y - 0.75 * letraAgua, y1: y + (lineas.length - 1) * LETRA * v.f + 0.25 * letraAgua },
    };
  });

  const salida: string[] = [];
  for (const a of items) {
    const c = a.caja;
    if (c.x0 < v.x || c.x1 > v.x + v.ancho || c.y0 < v.y || c.y1 > v.y + v.alto) salida.push(`${a.id}: el rótulo se sale`);
    for (const b of items) {
      if (a === b) continue;
      if (a.id < b.id && choca(a.caja, b.caja)) salida.push(`${a.id} y ${b.id}: rótulos encima`);
      if (tapa(a.caja, b.x, b.y, b.r)) salida.push(`${a.id}: su rótulo tapa el punto de ${b.id}`);
      if (a.id < b.id && Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r) salida.push(`${a.id} y ${b.id}: puntos encima`);
    }
    for (const agua of cajasAgua) {
      if (choca(a.caja, agua.caja)) salida.push(`${a.id}: su rótulo pisa «${agua.id}»`);
      if (tapa(agua.caja, a.x, a.y, a.r)) salida.push(`«${agua.id}» tapa el punto de ${a.id}`);
    }
  }
  return salida;
}

/** Un mapa en una fila: ¿cae el sitio en tierra o en el agua? */
function enTierra(mapa: MapaBase, lon: number, lat: number, margen = 8) {
  const [x, y] = proyectar(mapa, lon, lat);
  // Se mira el contorno de tierra con la regla par-impar, como lo pinta el SVG.
  const anillos = mapa.tierra
    .split('Z')
    .filter(Boolean)
    .map((t) =>
      t
        .replace(/^M/, '')
        .split('L')
        .map((par) => par.trim().split(' ').map(Number) as [number, number]),
    );
  const dentro = (px: number, py: number) => {
    let n = 0;
    for (const anillo of anillos) {
      for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
        const [xi, yi] = anillo[i]!;
        const [xj, yj] = anillo[j]!;
        if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) n += 1;
      }
    }
    return n % 2 === 1;
  };
  // Tolerancia: la costa está simplificada, y un puerto puede quedar a un paso
  // del agua. Vale si está dentro o a menos de `margen` de la orilla.
  if (dentro(x, y)) return true;
  for (const anillo of anillos) {
    for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
      const [ax, ay] = anillo[j]!;
      const [bx, by] = anillo[i]!;
      const largo = (bx - ax) ** 2 + (by - ay) ** 2;
      const t = largo ? Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / largo)) : 0;
      if (Math.hypot(x - ax - t * (bx - ax), y - ay - t * (by - ay)) <= margen) return true;
    }
  }
  return false;
}

describe('los patriarcados', () => {
  for (const epoca of MAP_EPOCHS) {
    it(`${epoca.year}: ningún rótulo pisa a otro`, () => {
      const puntos: Punto[] = epoca.sees.map((s) => ({
        id: s.id,
        lon: s.lon,
        lat: s.lat,
        label: s.offMap ? `${s.label ?? s.name} ↖` : (s.label ?? s.name),
        side: s.labelSide,
        dy: s.labelDy,
        look: SEE_STATUS_LOOK[s.status],
        fuera: s.offMap,
      }));
      expect(choques(MAPAS_BASE.mediterraneo, puntos)).toEqual([]);
    });
  }

  it('cada sede de hoy tiene su ficha en «Las Iglesias ortodoxas hoy»', () => {
    const hoy = MAP_EPOCHS.find((e) => e.id === 'hoy')!;
    const fichas = new Set(ORTHODOX_CHURCHES.map((c) => c.id));
    for (const sede of hoy.sees) expect(fichas.has(sede.id), sede.id).toBe(true);
    expect(hoy.sees.length).toBe(ORTHODOX_CHURCHES.length);
  });
});

describe('Tierra Santa', () => {
  const mapa = MAPAS_BASE['tierra-santa'];

  it('cada lugar está dentro del mapa y en tierra', () => {
    for (const l of HOLY_LAND) {
      expect(dentroDelMapa(mapa, l.lon, l.lat), l.id).toBe(true);
      expect(enTierra(mapa, l.lon, l.lat), `${l.id} cae en el mar`).toBe(true);
    }
  });

  it('cada pasaje se puede abrir', () => {
    for (const l of HOLY_LAND) {
      expect(l.passages.length, l.id).toBeGreaterThan(0);
      for (const p of l.passages) expect(citationFor(p), `${l.id}: ${p}`).not.toBeNull();
    }
  });

  it('ningún rótulo pisa a otro', () => {
    expect(choques(mapa, HOLY_LAND.map((l) => ({ ...l, label: l.label ?? l.name })), undefined, HOLY_LAND_WATERS)).toEqual([]);
  });

  it('va de norte a sur, como dice la lista', () => {
    // Con un margen: dos sitios a la misma altura pueden ir en cualquier orden.
    for (let i = 1; i < HOLY_LAND.length; i += 1) {
      expect(HOLY_LAND[i]!.lat, HOLY_LAND[i]!.id).toBeLessThanOrEqual(HOLY_LAND[i - 1]!.lat + 0.12);
    }
  });
});

describe('los viajes de san Pablo', () => {
  const mapa = MAPAS_BASE.pablo;
  const lugar = (id: string) => PAUL_PLACES.find((p) => p.id === id);

  it('cada parada existe y está en tierra', () => {
    for (const viaje of PAUL_JOURNEYS) {
      for (const id of viaje.stops) {
        const p = lugar(id);
        expect(p, `${viaje.id}: ${id}`).toBeDefined();
        expect(enTierra(mapa, p!.lon, p!.lat), `${id} cae en el mar`).toBe(true);
      }
    }
  });

  it('no sobra ningún lugar', () => {
    const usados = new Set(PAUL_JOURNEYS.flatMap((v) => v.stops));
    for (const p of PAUL_PLACES) expect(usados.has(p.id), p.id).toBe(true);
  });

  it('los pasajes y las cartas se pueden abrir', () => {
    for (const viaje of PAUL_JOURNEYS) {
      for (const cita of [viaje.passage, ...(viaje.letters ?? [])]) {
        expect(citationFor(cita), `${viaje.id}: ${cita}`).not.toBeNull();
      }
    }
  });

  for (const viaje of PAUL_JOURNEYS) {
    it(`${viaje.title}: todo cabe en el encuadre y ningún rótulo pisa a otro`, () => {
      const unicos = [...new Set(viaje.stops)].map((id) => lugar(id)!);
      if (viaje.encuadre) {
        for (const p of unicos) {
          const [o, s, e, n] = viaje.encuadre;
          expect(p.lon >= o && p.lon <= e && p.lat >= s && p.lat <= n, p.id).toBe(true);
        }
      }
      const extremos = new Set([viaje.stops[0], viaje.stops[viaje.stops.length - 1]]);
      const puntos: Punto[] = unicos.map((p) => ({
        ...p,
        label: p.label ?? p.name,
        look: extremos.has(p.id) ? 'lleno' : 'hueco',
      }));
      expect(choques(mapa, puntos, viaje.encuadre)).toEqual([]);
    });
  }
});

describe('las siete Iglesias y los concilios', () => {
  const mapa = MAPAS_BASE['asia-menor'];

  it('son siete, y están en tierra', () => {
    const iglesias = ASIA_PLACES.filter((l) => l.kind === 'iglesia' || l.kind === 'iglesia-concilio');
    expect(iglesias).toHaveLength(7);
    for (const l of ASIA_PLACES) {
      expect(dentroDelMapa(mapa, l.lon, l.lat), l.id).toBe(true);
      expect(enTierra(mapa, l.lon, l.lat), `${l.id} cae en el mar`).toBe(true);
    }
  });

  it('cada Iglesia lleva a su carta del Apocalipsis', () => {
    for (const l of ASIA_PLACES.filter((x) => x.kind !== 'concilio')) {
      const primera = citationFor(l.passages[0] ?? '');
      expect(primera?.path, l.id).toMatch(/^\/leer\/biblia\/REV\//);
    }
  });

  it('están los siete Concilios Ecuménicos, y cada uno lleva a su ficha', () => {
    const concilios = ASIA_PLACES.flatMap((l) => l.councils ?? []);
    expect(concilios).toHaveLength(7);
    for (const c of concilios) {
      const hecho = HISTORY_TIMELINE.find((h) => h.id === c.id);
      expect(hecho, c.id).toBeDefined();
      expect(hecho!.periodId, c.id).toBe(c.period);
      expect(hecho!.council?.number, c.id).toBeDefined();
    }
  });

  it('ningún rótulo pisa a otro', () => {
    const puntos: Punto[] = ASIA_PLACES.map((l) => ({ ...l, label: l.label ?? l.name, look: ASIA_KIND_LOOK[l.kind] }));
    expect(choques(mapa, puntos)).toEqual([]);
  });
});
