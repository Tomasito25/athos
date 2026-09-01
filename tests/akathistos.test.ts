/**
 * El Himno Akáthistos.
 *
 * Es un texto con una forma muy estricta, y esa forma es comprobable: si
 * alguna estrofa se cae al editar, o si un ikos se queda con once saludos en
 * vez de doce, no se nota leyendo pero rompe el himno. La estructura es lo
 * único que una prueba puede vigilar de una traducción, y merece la pena.
 */
import { describe, expect, it } from 'vitest';
import { AKATHISTOS_META, AKATHISTOS_SECTIONS } from '@/content/akathistos-theotokos';
import { AKATHISTS } from '@/content/hymns';

const ikoi = AKATHISTOS_SECTIONS.filter((s) => s.id.startsWith('ikos-'));
const kontakia = AKATHISTOS_SECTIONS.filter((s) => s.id.startsWith('kontakion-'));

describe('la forma del himno', () => {
  it('tiene las veinticuatro estrofas', () => {
    expect(ikoi.length, 'ikoi').toBe(12);
    expect(kontakia.length, 'kontakia').toBe(12);
  });

  it('las estrofas siguen el alfabeto griego, de la alfa a la omega', () => {
    // El acróstico es la firma del himno: si una letra se salta, la estrofa
    // que falta se nota aquí y en ningún otro sitio.
    const ALFABETO = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'.split('');
    const enOrden = [...ikoi, ...kontakia]
      .map((s) => ({ id: s.id, letra: s.title.split('·')[1]?.trim() }))
      .sort((a, b) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1]));
    const letras = AKATHISTOS_SECTIONS.filter((s) => s.title.includes('·')).map((s) =>
      s.title.split('·')[1].trim(),
    );
    expect(letras).toEqual(ALFABETO);
    expect(enOrden.length).toBe(24);
  });

  it('cada ikos lleva sus doce saludos', () => {
    // Van en seis versos de dos saludos cada uno, unidos por punto y coma:
    // el segundo va en minúscula porque sigue dentro de la misma frase.
    for (const i of ikoi) {
      const versos = i.blocks.filter((b) => b.kind === 'text').slice(1);
      expect(versos.length, `${i.title}: no son seis versos`).toBe(6);
      const saludos = versos.reduce(
        (n, b) => n + (b.content.match(/alégrate/gi) ?? []).length,
        0,
      );
      expect(saludos, `${i.title}: ${saludos} saludos en vez de doce`).toBe(12);
    }
  });

  it('cada ikos termina con el estribillo y cada kontakion con el Aleluya', () => {
    for (const i of ikoi) {
      const ultimo = i.blocks[i.blocks.length - 1];
      expect(ultimo.kind, i.title).toBe('refrain');
      expect(ultimo.content, i.title).toBe('Alégrate, Esposa no desposada.');
    }
    for (const k of kontakia) {
      const ultimo = k.blocks[k.blocks.length - 1];
      expect(ultimo.kind, k.title).toBe('refrain');
      expect(ultimo.content, k.title).toBe('Aleluya.');
    }
  });

  it('lleva el proimion, que no forma parte del acróstico', () => {
    const proimion = AKATHISTOS_SECTIONS.find((s) => s.id === 'proimion');
    expect(proimion).toBeTruthy();
    expect(proimion!.blocks.some((b) => b.content.includes('caudilla defensora'))).toBe(true);
    // Y dice de dónde sale, que es lo que explica por qué está fuera.
    expect(proimion!.blocks.some((b) => b.content.includes('626'))).toBe(true);
  });

  it('no queda ni un hueco sin texto', () => {
    for (const s of AKATHISTOS_SECTIONS) {
      expect(
        s.blocks.some((b) => b.kind === 'pending'),
        `${s.title} sigue pendiente`,
      ).toBe(false);
    }
  });
});

describe('honradez de la traducción', () => {
  it('dice que la versión española es de ATHOS y el original de dominio público', () => {
    expect(AKATHISTOS_META.license).toBe('cc-by-sa-4.0');
    expect(AKATHISTOS_META.source).toMatch(/traducción al español hecha para ATHOS/i);
    expect(AKATHISTOS_META.copyright).toMatch(/dominio público/);
  });

  it('no se atribuye un uso litúrgico que no tiene', () => {
    // El texto es auténtico; esta versión castellana no está en ningún libro.
    expect(AKATHISTOS_META.notes).toMatch(/no procede de ningún libro litúrgico español/i);
    expect(AKATHISTOS_META.notes ?? '').not.toMatch(/uso corriente en las parroquias/i);
  });

  it('avisa de que no se ha cotejado con una edición crítica', () => {
    expect(AKATHISTOS_META.notes).toMatch(/edición crítica/i);
  });

  it('el himno figura como completo en el corpus', () => {
    const suyo = AKATHISTS.find((a) => a.id === 'akathistos-theotokos');
    expect(suyo?.status).toBe('complete');
  });
});
