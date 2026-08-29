/**
 * El Monte Athos.
 *
 * Dos cosas que vigilar. La primera: que ningún monasterio se quede en su
 * fecha de fundación, porque veinte fechas no cuentan nada de la Montaña.
 * La segunda: que los artículos que tocan asuntos discutidos —el ávaton, la
 * ruptura de Esfigmenu, el dinero ruso— los cuenten como discutidos y no los
 * esquiven.
 */
import { describe, expect, it } from 'vitest';
import { ATHOS_ARTICLES, MONASTERIES } from '@/content/athos';
import { ATHOS_GROUPS, ATHOS_LEAD } from '@/content/athos-articles';

describe('los veinte monasterios', () => {
  it('son veinte y su jerarquía va del uno al veinte sin repetirse', () => {
    expect(MONASTERIES.length).toBe(20);
    const rangos = MONASTERIES.map((m) => m.rank).sort((a, b) => a - b);
    expect(rangos).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });

  it('todos dicen qué son hoy, no sólo cuándo se fundaron', () => {
    for (const m of MONASTERIES) {
      expect(m.today, `${m.name}: sin presente`).toBeTruthy();
      expect((m.today ?? '').length, m.name).toBeGreaterThan(200);
    }
  });

  it('todos dicen quién vivió allí', () => {
    for (const m of MONASTERIES) {
      expect((m.saints ?? []).length, `${m.name}: sin santos`).toBeGreaterThan(0);
    }
  });

  it('cuentan lo incómodo donde lo hay', () => {
    const esfigmenu = MONASTERIES.find((m) => m.id === 'esphigmenou');
    expect(esfigmenu?.today, 'Esfigmenu sin su ruptura').toMatch(/ruptura|cismátic/i);
    const ruso = MONASTERIES.find((m) => m.id === 'agiou-panteleimonos');
    expect(ruso?.today, 'el Rossikón sin la polémica del dinero').toMatch(/polémica|influencia/i);
  });
});

describe('los artículos', () => {
  it('cada uno pertenece a un bloque y ningún bloque nombra artículos que no existen', () => {
    const ids = new Set(ATHOS_ARTICLES.map((a) => a.id));
    const enGrupos = ATHOS_GROUPS.flatMap((g) => g.articles);
    for (const id of enGrupos) expect(ids.has(id), `${id} no existe`).toBe(true);
    for (const id of ids) expect(enGrupos.includes(id), `${id} sin bloque`).toBe(true);
    expect(enGrupos.length).toBe(new Set(enGrupos).size);
  });

  it('cada uno dice de qué va antes de abrirlo', () => {
    for (const a of ATHOS_ARTICLES) {
      expect(ATHOS_LEAD[a.id], `${a.title}: sin entradilla`).toBeTruthy();
    }
  });

  it('el ávaton expone las objeciones, no sólo la tradición', () => {
    const avaton = ATHOS_ARTICLES.find((a) => a.id === 'avaton');
    const texto = (avaton?.blocks ?? []).map((b) => b.content).join(' ');
    expect(texto).toMatch(/Parlamento Europeo/);
    expect(texto).toMatch(/igualdad/);
    // Y no lo resuelve por su cuenta.
    expect(texto).toMatch(/no las va a resolver|ninguna de las dos posturas es marginal/i);
  });

  it('lo práctico avisa de que caduca', () => {
    const visita = ATHOS_ARTICLES.find((a) => a.id === 'visita');
    expect(visita?.meta.notes, 'los datos de la visita no avisan de que cambian').toMatch(
      /cambian|orientativo/i,
    );
  });
});
