/**
 * Los pasajes de las obras patrísticas.
 *
 * Cada obra tiene ahora el pasaje por el que se la conoce. Lo que hay que
 * vigilar es lo de siempre y una cosa más:
 *
 * · Que ninguna obra se quede sin texto.
 * · Que ninguna se declare completa: un pasaje no es un libro.
 * · Y que las obras del siglo XX, que tienen derechos vigentes, lleven una
 *   cita breve y no un texto traducido. Es la parte que no se puede improvisar.
 */
import { describe, expect, it } from 'vitest';
import { CHURCH_FATHERS } from '@/content/fathers';
import { WORK_EXCERPT } from '@/content/patristica-pasajes';

const obras = CHURCH_FATHERS.flatMap((f) => f.works);

describe('cobertura', () => {
  it('ninguna obra se queda sin una línea que leer', () => {
    const sin = obras.filter((w) => w.status === 'pending');
    expect(sin.map((w) => w.id), 'obras sin texto').toEqual([]);
    expect(obras.length, 'el catálogo se ha quedado corto').toBeGreaterThan(50);
  });

  it('ninguna obra se declara completa', () => {
    // Un pasaje no es un libro. Decir «completo» de las Tríadas porque hay
    // dos párrafos sería exactamente la clase de mentira que ATHOS evita.
    for (const w of obras) {
      expect(w.status, `${w.title} se declara completa`).not.toBe('complete');
    }
  });

  it('cada pasaje dice de dónde sale dentro de la obra', () => {
    // «Contra las herejías» no basta: son cinco libros. Hace falta el sitio.
    for (const [id, p] of Object.entries(WORK_EXCERPT)) {
      expect(p.meta.source.length, id).toBeGreaterThan(30);
      expect(p.blocks.length, `${id}: pasaje vacío`).toBeGreaterThan(0);
    }
  });
});

describe('derechos', () => {
  const modernas = Object.entries(WORK_EXCERPT).filter(([, p]) =>
    /derechos vigentes/i.test(p.meta.copyright ?? ''),
  );

  it('las obras del siglo XX se citan, no se traducen', () => {
    expect(modernas.length, 'ninguna obra moderna identificada').toBeGreaterThanOrEqual(4);
    for (const [id, p] of modernas) {
      // Una cita, no una traducción: corta y con la atribución a la vista.
      const texto = p.blocks.map((b) => b.content).join(' ');
      expect(texto.length, `${id}: demasiado texto para una obra con derechos`).toBeLessThan(600);
      expect(p.meta.source, id).toMatch(/cita breve|Cita breve/);
      expect(p.meta.notes, id).toMatch(/no puede incorporar el texto|derechos/i);
    }
  });

  it('las antiguas dicen que la traducción es de ATHOS', () => {
    for (const [id, p] of Object.entries(WORK_EXCERPT)) {
      if (/derechos vigentes/i.test(p.meta.copyright ?? '')) continue;
      expect(p.meta.license, id).toBe('cc-by-sa-4.0');
      expect(p.meta.source, id).toMatch(/[Tt]raducción al español hecha para ATHOS/);
      expect(p.meta.notes, id).toMatch(/no procede de ninguna edición española publicada/i);
    }
  });

  it('ningún pasaje se presenta como la obra entera', () => {
    for (const [id, p] of Object.entries(WORK_EXCERPT)) {
      if (/derechos vigentes/i.test(p.meta.copyright ?? '')) continue;
      expect(p.meta.notes, id).toMatch(/es un pasaje, no la obra/i);
    }
  });
});
