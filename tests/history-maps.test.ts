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

describe('los mapas de los patriarcados', () => {
  it('hay una época por cada momento que cambia el mapa', () => {
    expect(MAP_EPOCHS.length).toBeGreaterThanOrEqual(5);
    const ids = MAP_EPOCHS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('todas las sedes caben dentro del esquema', () => {
    for (const epoca of MAP_EPOCHS) {
      for (const sede of epoca.sees) {
        expect(sede.x, `${epoca.id}/${sede.id}`).toBeGreaterThanOrEqual(0);
        expect(sede.x, `${epoca.id}/${sede.id}`).toBeLessThanOrEqual(100);
        expect(sede.y, `${epoca.id}/${sede.id}`).toBeGreaterThanOrEqual(0);
        expect(sede.y, `${epoca.id}/${sede.id}`).toBeLessThanOrEqual(88);
      }
    }
  });

  it('una misma sede no cambia de sitio de un mapa a otro', () => {
    const sitio = new Map<string, string>();
    for (const epoca of MAP_EPOCHS) {
      for (const sede of epoca.sees) {
        const clave = `${sede.x},${sede.y}`;
        const visto = sitio.get(sede.id);
        if (visto) expect(clave, `${sede.id} se mueve`).toBe(visto);
        else sitio.set(sede.id, clave);
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

  it('dice que es un esquema y no un mapa a escala', () => {
    expect(MAPS_NOTE).toMatch(/esquemas?/i);
    expect(MAPS_NOTE).toMatch(/no sobre un mapa a escala|no a escala/i);
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
