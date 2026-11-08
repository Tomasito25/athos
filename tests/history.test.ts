/**
 * La historia de la Iglesia.
 *
 * El esqueleto tiene que estar entero aunque la prosa no lo esté: ésa era la
 * idea. Estas pruebas vigilan que no falte ningún concilio, que las fechas
 * vayan en orden y que los conflictos vivos se cuenten como conflictos.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { HISTORY_META } from '@/content/history';
import { COUNCILS, ECUMENICAL, HISTORY_PERIODS, HISTORY_TIMELINE } from '@/content/history-all';

describe('el esqueleto', () => {
  it('llega de Pentecostés a hoy sin saltos de época', () => {
    expect(HISTORY_PERIODS.length).toBeGreaterThanOrEqual(8);
    expect(HISTORY_PERIODS[0].events[0].sort).toBeLessThan(50);
    const ultima = HISTORY_PERIODS[HISTORY_PERIODS.length - 1];
    expect(Math.max(...ultima.events.map((e) => e.sort))).toBeGreaterThan(2015);
  });

  it('cada época se explica antes de enumerar', () => {
    for (const p of HISTORY_PERIODS) {
      expect(p.summary.length, `${p.title}: sin introducción`).toBeGreaterThanOrEqual(2);
      for (const parrafo of p.summary) {
        expect(parrafo.length, `${p.title}`).toBeGreaterThan(150);
      }
      expect(p.events.length, `${p.title}: época vacía`).toBeGreaterThan(3);
    }
  });

  it('la cronología va hacia delante', () => {
    let anterior = -1;
    for (const hecho of HISTORY_TIMELINE) {
      expect(hecho.sort, `${hecho.title} rompe el orden`).toBeGreaterThanOrEqual(anterior);
      anterior = hecho.sort;
    }
  });

  it('dentro de cada época, también', () => {
    for (const p of HISTORY_PERIODS) {
      let anterior = -1;
      for (const hecho of p.events) {
        expect(hecho.sort, `${p.title} · ${hecho.title}`).toBeGreaterThanOrEqual(anterior);
        anterior = hecho.sort;
      }
    }
  });

  it('todo hecho tiene año, título y tipo, tenga o no reseña', () => {
    // Un hecho sin párrafo sigue valiendo; uno sin fecha, no.
    for (const hecho of HISTORY_TIMELINE) {
      expect(hecho.year.length, hecho.id).toBeGreaterThan(0);
      expect(hecho.title.length, hecho.id).toBeGreaterThan(5);
      expect(hecho.sort, `${hecho.id}: año sin ordenar`).toBeGreaterThan(0);
    }
  });

  it('no hay identificadores repetidos', () => {
    const ids = HISTORY_TIMELINE.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('los concilios', () => {
  it('están los siete Ecuménicos, en orden y sin faltar ninguno', () => {
    expect(ECUMENICAL.map((c) => c.council!.number)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('cada uno dice quién lo convocó, contra qué y qué definió', () => {
    for (const c of COUNCILS) {
      const f = c.council!;
      expect(f.place.length, c.id).toBeGreaterThan(3);
      expect(f.year.length, c.id).toBeGreaterThan(2);
      expect(f.convokedBy.length, `${c.id}: sin quién lo convocó`).toBeGreaterThan(8);
      expect(f.against.length, `${c.id}: sin contra qué`).toBeGreaterThan(30);
      expect(f.defined.length, `${c.id}: sin definiciones`).toBeGreaterThan(0);
    }
  });

  it('los siete llevan además su aclaración', () => {
    // Lo que conviene no dar por sabido: por qué homooúsios, por qué Calcedonia
    // rompió con los coptos, por qué Nicea II se malentendió en Occidente.
    for (const c of ECUMENICAL) {
      expect(c.council!.note, `el concilio ${c.council!.number} no aclara nada`).toBeTruthy();
      expect((c.council!.note ?? '').length).toBeGreaterThan(80);
    }
  });

  it('también están los locales que la Iglesia tiene por vinculantes', () => {
    const ids = COUNCILS.map((c) => c.id);
    for (const local of ['trullo', 'concilios-palamitas', 'florencia', 'jerusalen-1672', 'creta-2016']) {
      expect(ids, `falta ${local}`).toContain(local);
    }
  });

  it('los ecuménicos van con las fechas correctas', () => {
    const porNumero = Object.fromEntries(ECUMENICAL.map((c) => [c.council!.number, c.council!.year]));
    expect(porNumero[1]).toBe('325');
    expect(porNumero[2]).toBe('381');
    expect(porNumero[3]).toBe('431');
    expect(porNumero[4]).toBe('451');
    expect(porNumero[5]).toBe('553');
    expect(porNumero[6]).toBe('680-681');
    expect(porNumero[7]).toBe('787');
  });
});

describe('honradez', () => {
  it('los conflictos vivos se cuentan como conflictos', () => {
    // Ucrania, Creta, el calendario, la diáspora: divisiones abiertas entre
    // Iglesias ortodoxas. Contarlas resueltas a favor de alguien sería mentir.
    for (const id of ['ucrania-2018', 'creta-2016', 'calendario-revisado', 'diaspora', 'ocan-1970']) {
      const hecho = HISTORY_TIMELINE.find((e) => e.id === id);
      expect(hecho, `falta ${id}`).toBeDefined();
      expect(hecho?.disputed, `${id} no dice que se discuta`).toBeTruthy();
    }
  });

  it('lo de Ucrania expone las dos posiciones', () => {
    const ucrania = HISTORY_TIMELINE.find((e) => e.id === 'ucrania-2018')!;
    expect(ucrania.disputed).toMatch(/Constantinopla/);
    expect(ucrania.disputed).toMatch(/Moscú/);
    expect(ucrania.disputed!.length).toBeGreaterThan(200);
  });

  it('las rupturas antiguas no se cuentan como victorias', () => {
    // Calcedonia y 1054: dos heridas, no dos triunfos.
    const calcedonia = HISTORY_TIMELINE.find((e) => e.id === 'calcedonia')!;
    expect(calcedonia.disputed).toMatch(/copta|armenia|siria/i);
    const mil54 = HISTORY_TIMELINE.find((e) => e.id === 'cisma-1054')!;
    expect(mil54.disputed).toMatch(/1965|levantadas/i);
  });

  it('se declara como reseña de ATHOS, no como documento de la Iglesia', () => {
    expect(HISTORY_META.license).toBe('cc-by-sa-4.0');
    expect(HISTORY_META.source).toMatch(/redactada para ATHOS/i);
    expect(HISTORY_META.notes).toMatch(/no es un texto litúrgico/i);
  });
});

describe('enlaces', () => {
  it('todo enlace interno lleva a una ruta real', () => {
    const rutas = readFileSync(resolve(process.cwd(), 'src/routes/router.tsx'), 'utf-8');
    for (const hecho of HISTORY_TIMELINE) {
      for (const enlace of hecho.seeAlso ?? []) {
        const camino = enlace.path.replace(/^\//, '');
        const raiz = camino.split('/').slice(0, 2).join('/');
        expect(
          rutas.includes(`path: '${camino}'`) || rutas.includes(`path: '${raiz}`),
          `${hecho.id} enlaza a ${enlace.path}, que no existe`,
        ).toBe(true);
      }
    }
  });
});
