/**
 * Las Iglesias ortodoxas hoy.
 *
 * Lo que más deprisa se queda viejo es quién preside cada Iglesia: en 2024
 * cambió en Bulgaria, en 2025 en Albania y en 2026 en Georgia. Esta prueba
 * falla cuando una ficha lleva más de un año sin comprobarse, para que
 * alguien la revise antes de que diga algo que ya no es verdad.
 */
import { describe, expect, it } from 'vitest';
import { CHURCH_DISPUTES, ORTHODOX_CHURCHES } from '@/content/iglesias-hoy';
import { MAP_EPOCHS } from '@/content/history-maps';

const UN_ANIO = 365 * 86_400_000;

describe('las fichas', () => {
  it('ninguna lleva más de un año sin revisar', () => {
    const viejas = ORTHODOX_CHURCHES.filter((c) => Date.now() - new Date(c.verifiedOn).getTime() > UN_ANIO).map(
      (c) => `${c.name} (comprobada el ${c.verifiedOn})`,
    );
    expect(viejas, 'hay que volver a comprobar quién las preside y actualizar verifiedOn').toEqual([]);
  });

  it('ninguna dice haberse comprobado en el futuro', () => {
    for (const c of ORTHODOX_CHURCHES) expect(new Date(c.verifiedOn).getTime(), c.id).toBeLessThanOrEqual(Date.now());
  });

  it('son catorce las que todas reconocen y tres las disputadas', () => {
    expect(ORTHODOX_CHURCHES.filter((c) => c.status === 'reconocida')).toHaveLength(14);
    expect(ORTHODOX_CHURCHES.filter((c) => c.status === 'disputada').map((c) => c.id).sort()).toEqual(['oca', 'ohrid', 'ucrania']);
  });

  it('cada una dice lo que se pidió', () => {
    for (const c of ORTHODOX_CHURCHES) {
      for (const campo of ['primateTitle', 'primate', 'primateSince', 'see', 'autocephaly', 'faithful'] as const) {
        expect(c[campo].length, `${c.id}.${campo}`).toBeGreaterThan(1);
      }
      expect(c.languages.length, c.id).toBeGreaterThan(0);
    }
  });

  it('el mapa de hoy tiene una sede por cada Iglesia', () => {
    const hoy = MAP_EPOCHS.find((e) => e.id === 'hoy')!;
    expect(hoy.sees).toHaveLength(ORTHODOX_CHURCHES.length);
  });
});

describe('las disputas', () => {
  it('se cuentan las que se pidieron', () => {
    const ids = CHURCH_DISPUTES.map((d) => d.id);
    for (const id of ['ucrania', 'oca', 'ohrid', 'estonia', 'moscu-constantinopla', 'moscu-alejandria']) {
      expect(ids, id).toContain(id);
    }
  });

  it('cada una apunta a Iglesias que tienen ficha', () => {
    const fichas = new Set(ORTHODOX_CHURCHES.map((c) => c.id));
    for (const d of CHURCH_DISPUTES) for (const c of d.churches) expect(fichas, `${d.id} → ${c}`).toContain(c);
  });
});
