/**
 * El glosario, y que llegue solo a las lecciones.
 *
 * Lo que se protege es la promesa: que ATHOS no dé por supuesto su propio
 * vocabulario. Si una lección estrena una palabra rara y nadie la añade aquí,
 * la prueba lo dice.
 */
import { describe, expect, it } from 'vitest';
import { GLOSSARY, termsIn } from '@/content/glossary';
import { STUDY_COURSES } from '@/content/study';

describe('el glosario', () => {
  it('no repite identificadores ni términos', () => {
    const ids = GLOSSARY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const terminos = GLOSSARY.map((t) => t.term.toLowerCase());
    expect(new Set(terminos).size).toBe(terminos.length);
  });

  it('cada palabra tiene una definición de una línea que se sostiene sola', () => {
    for (const t of GLOSSARY) {
      expect(t.short.length, t.id).toBeGreaterThan(30);
      // Una línea es una línea: si hace falta más, va en `long`.
      expect(t.short.length, t.id).toBeLessThan(200);
      expect(t.short.endsWith('.'), t.id).toBe(true);
    }
  });

  it('la explicación larga añade algo, no repite la corta', () => {
    for (const t of GLOSSARY) {
      if (!t.long) continue;
      expect(t.long, t.id).not.toBe(t.short);
      expect(t.long.length, t.id).toBeGreaterThan(t.short.length / 2);
    }
  });
});

describe('encontrar los términos en un texto', () => {
  it('encuentra la palabra con y sin acentos', () => {
    expect(termsIn('habla de la Theotokos').map((t) => t.id)).toContain('theotokos');
    expect(termsIn('una iglesia autocefala').map((t) => t.id)).toContain('autocefala');
    expect(termsIn('una iglesia autocéfala').map((t) => t.id)).toContain('autocefala');
  });

  it('no la encuentra dentro de otra palabra', () => {
    // «tropario» no debe saltar dentro de «entropía», ni «teosis» en «teosista».
    expect(termsIn('la entropía del sistema').map((t) => t.id)).not.toContain('tropario');
    expect(termsIn('un texto cualquiera sin nada').length).toBe(0);
  });

  it('da cada término una sola vez aunque el texto lo repita', () => {
    const ids = termsIn('Theotokos, Theotokos y otra vez Theotokos').map((t) => t.id);
    expect(ids.filter((x) => x === 'theotokos').length).toBe(1);
  });

  it('gana el término más largo cuando uno contiene a otro', () => {
    const ids = termsIn('tiene una primacía de honor sobre las demás').map((t) => t.id);
    expect(ids).toContain('primacia-honor');
  });
});

describe('las lecciones de estudio', () => {
  const lecciones = STUDY_COURSES.flatMap((c) =>
    c.lessons.map((l) => ({ curso: c.id, id: l.id, texto: `${l.title} ${l.body.join(' ')}` })),
  );

  it('hay lecciones que explicar', () => {
    expect(lecciones.length).toBeGreaterThan(30);
  });

  it('la mayoría explica alguna de sus palabras', () => {
    const conTerminos = lecciones.filter((l) => termsIn(l.texto).length > 0);
    // No todas tienen por qué usar vocabulario técnico; si menos de la mitad
    // lo tuviera, sería que el glosario se ha quedado corto.
    expect(conTerminos.length).toBeGreaterThan(lecciones.length / 2);
  });

  it('el vocabulario más propio de la tradición está cubierto', () => {
    const todo = lecciones.map((l) => l.texto).join(' ');
    const encontrados = new Set(termsIn(todo).map((t) => t.id));
    for (const clave of ['theotokos', 'ortodoxia', 'concilio-ecumenico', 'teosis', 'hesicasmo']) {
      expect(encontrados, `falta ${clave} en las lecciones`).toContain(clave);
    }
  });
});
