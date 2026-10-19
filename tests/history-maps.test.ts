/**
 * Los mapas de los patriarcados y la cronología de las divisiones.
 *
 * Un dibujo afirma cosas igual que un párrafo, y hay que poder comprobarlas:
 * que las sedes caben dentro del esquema, que ninguna época se contradice con
 * otra, y que cada rama de la cronología sale de un tronco que existe.
 */
import { describe, expect, it } from 'vitest';
import {
  CHURCH_BRANCHES,
  MAP_EPOCHS,
  MAPS_NOTE,
  SEE_STATUS_LABELS,
  TIMELINE_END,
  TIMELINE_START,
} from '@/content/history-maps';
import { HISTORY_PERIODS } from '@/content/history-all';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { dentroDelMapa, proyectar } from '@/lib/mapa';

describe('los mapas de los patriarcados', () => {
  it('hay una época por cada momento que cambia el mapa', () => {
    expect(MAP_EPOCHS.length).toBeGreaterThanOrEqual(5);
    const ids = MAP_EPOCHS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('todas las sedes caben dentro del mapa, salvo las que dicen estar fuera', () => {
    const mapa = MAPAS_BASE.mediterraneo;
    for (const epoca of MAP_EPOCHS) {
      for (const sede of epoca.sees) {
        if (sede.offMap) continue;
        expect(dentroDelMapa(mapa, sede.lon, sede.lat), `${epoca.id}/${sede.id}`).toBe(true);
      }
    }
  });

  it('una misma sede no cambia de sitio de un mapa a otro', () => {
    const sitio = new Map<string, string>();
    for (const epoca of MAP_EPOCHS) {
      for (const sede of epoca.sees) {
        const clave = `${sede.lon},${sede.lat}`;
        const visto = sitio.get(sede.id);
        if (visto) expect(clave, `${sede.id} se mueve`).toBe(visto);
        else sitio.set(sede.id, clave);
      }
    }
  });

  it('cada sede cae en tierra firme, no en el mar', () => {
    // Las coordenadas se comprueban contra la propia costa del dibujo: una
    // sede en el agua es una latitud o una longitud equivocada. Se da un
    // margen de una docena de unidades —unos 50 km— porque las ciudades de
    // costa, Constantinopla en el Bósforo, quedan a veces al otro lado de
    // una costa simplificada.
    const mapa = MAPAS_BASE.mediterraneo;
    // jsdom no sabe si un punto está dentro de un trazado: se hace a mano.
    const anillos = mapa.tierra
      .split('M')
      .filter(Boolean)
      .map((t) => t.replace('Z', '').split('L').map((p) => p.split(' ').map(Number) as [number, number]));
    const enTierra = (x: number, y: number) => {
      let dentro = false;
      for (const anillo of anillos) {
        for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
          const [xi, yi] = anillo[i]!;
          const [xj, yj] = anillo[j]!;
          if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dentro = !dentro;
        }
      }
      return dentro;
    };
    for (const epoca of MAP_EPOCHS) {
      for (const sede of epoca.sees) {
        if (sede.offMap) continue;
        const [x, y] = proyectar(mapa, sede.lon, sede.lat);
        const cerca = [[0, 0], [12, 0], [-12, 0], [0, 12], [0, -12], [9, 9], [-9, 9], [9, -9], [-9, -9]].some(
          ([dx, dy]) => enTierra(x + dx!, y + dy!),
        );
        expect(cerca, `${sede.id} cae en el mar`).toBe(true);
      }
    }
  });

  it('ninguna sede se repite dentro de la misma época', () => {
    for (const epoca of MAP_EPOCHS) {
      const ids = epoca.sees.map((s) => s.id);
      expect(new Set(ids).size, epoca.id).toBe(ids.length);
    }
  });

  it('cada sede dice qué es, y el rango tiene rótulo', () => {
    for (const epoca of MAP_EPOCHS) {
      for (const sede of epoca.sees) {
        expect(SEE_STATUS_LABELS[sede.status], sede.id).toBeTruthy();
        expect(sede.note.length, `${epoca.id}/${sede.id}`).toBeGreaterThan(20);
      }
    }
  });

  it('la pentarquía tiene sus cinco sedes, y sólo esa época las tiene', () => {
    const pentarquia = MAP_EPOCHS.find((e) => e.id === 'pentarquia')!;
    const cinco = pentarquia.sees.filter((s) => s.status === 'pentarquia').map((s) => s.id);
    expect(cinco.sort()).toEqual(
      ['alejandria', 'antioquia', 'constantinopla', 'jerusalen', 'roma'].sort(),
    );
  });

  it('Roma aparece fuera de comunión desde 1054 en adelante', () => {
    const desde1054 = MAP_EPOCHS.filter((e) => ['ruptura-1054', 'tras-1453'].includes(e.id));
    for (const epoca of desde1054) {
      const roma = epoca.sees.find((s) => s.id === 'roma');
      expect(roma?.status, epoca.id).toBe('separada');
    }
  });

  it('cada época apunta a una época de la historia que existe', () => {
    const conocidas = new Set(HISTORY_PERIODS.map((p) => p.id));
    for (const epoca of MAP_EPOCHS) {
      if (!epoca.periodId) continue;
      expect(conocidas, `${epoca.id} → ${epoca.periodId}`).toContain(epoca.periodId);
    }
  });

  it('el mapa de hoy tiene las catorce Iglesias autocéfalas y las tres en disputa', () => {
    // Faltaban Albania, Polonia, Chequia y Eslovaquia y la OCA, aunque la
    // propia Historia habla de catorce Iglesias autocéfalas.
    const hoy = MAP_EPOCHS.find((e) => e.id === 'hoy')!;
    const reconocidas = hoy.sees.filter((s) => s.status === 'patriarcado' || s.status === 'autocefala');
    expect(reconocidas.map((s) => s.id).sort()).toEqual(
      [
        'constantinopla', 'alejandria', 'antioquia', 'jerusalen', 'moscu', 'belgrado', 'bucarest',
        'sofia', 'tiflis', 'nicosia', 'atenas', 'varsovia', 'tirana', 'praga',
      ].sort(),
    );
    const enDisputa = hoy.sees.filter((s) => s.status === 'disputada').map((s) => s.id);
    expect(enDisputa.sort()).toEqual(['america', 'kiev', 'ohrid']);
    expect(hoy.summary).toMatch(/[Cc]atorce/);
  });

  it('en ningún mapa un punto pisa a otro', () => {
    const mapa = MAPAS_BASE.mediterraneo;
    for (const epoca of MAP_EPOCHS) {
      for (const [i, a] of epoca.sees.entries()) {
        for (const b of epoca.sees.slice(i + 1)) {
          const [ax, ay] = a.offMap ? [a.offMap.x, a.offMap.y] : proyectar(mapa, a.lon, a.lat);
          const [bx, by] = b.offMap ? [b.offMap.x, b.offMap.y] : proyectar(mapa, b.lon, b.lat);
          // Los puntos miden diez de radio: a veinte de distancia no se tocan.
          expect(Math.hypot(ax - bx, ay - by), `${epoca.id}: ${a.id} y ${b.id}`).toBeGreaterThanOrEqual(20);
        }
      }
    }
  });

  it('dice de dónde sale la costa y que no dibuja fronteras', () => {
    expect(MAPS_NOTE).toMatch(/Natural Earth/);
    expect(MAPS_NOTE).toMatch(/dominio público/);
    expect(MAPS_NOTE).toMatch(/fronteras/);
  });
});

describe('la cronología de las divisiones', () => {
  it('cada rama sale del tronco o de otra rama que existe', () => {
    const conocidas = new Set(['tronco', ...CHURCH_BRANCHES.map((b) => b.id)]);
    for (const rama of CHURCH_BRANCHES) {
      expect(conocidas, `${rama.id} sale de ${rama.from}`).toContain(rama.from);
    }
  });

  it('ninguna rama sale de sí misma ni de una posterior', () => {
    const anio = new Map(CHURCH_BRANCHES.map((b) => [b.id, b.year]));
    for (const rama of CHURCH_BRANCHES) {
      expect(rama.from, rama.id).not.toBe(rama.id);
      if (rama.from === 'tronco') continue;
      expect(anio.get(rama.from)!, `${rama.id} antes que su origen`).toBeLessThan(rama.year);
    }
  });

  it('las protestantes salen de Roma, no del tronco', () => {
    // Es el punto que el dibujo existe para dejar claro.
    const protestantes = CHURCH_BRANCHES.find((b) => b.id === 'protestantes')!;
    expect(protestantes.from).toBe('roma');
  });

  it('la línea llega hasta el año en curso', () => {
    // Acababa en 2025 y ahí se quedaba.
    expect(TIMELINE_END).toBe(new Date().getFullYear());
  });

  it('todos los años caben en el eje', () => {
    for (const rama of CHURCH_BRANCHES) {
      expect(rama.year, rama.id).toBeGreaterThanOrEqual(TIMELINE_START);
      expect(rama.year, rama.id).toBeLessThanOrEqual(TIMELINE_END);
    }
  });

  it('cada rama explica por qué se separó', () => {
    for (const rama of CHURCH_BRANCHES) {
      expect(rama.why.length, rama.id).toBeGreaterThan(50);
      expect(rama.yearLabel, rama.id).toMatch(/\d{3,4}/);
    }
  });

  it('están las separaciones que hay que contar', () => {
    const ids = CHURCH_BRANCHES.map((b) => b.id);
    for (const clave of ['oriente', 'orientales', 'roma', 'protestantes', 'viejos-creyentes']) {
      expect(ids, `falta ${clave}`).toContain(clave);
    }
  });
});
