/**
 * Los textos fijos de los oficios que ya no están pendientes.
 *
 * Se comprueba lo que importa de cada uno: que está entero, que no queda un
 * aviso de pendiente sobre algo que ya se ha incorporado, y que dice de
 * dónde sale la traducción.
 */
import { describe, expect, it } from 'vitest';
import { OFFICES } from '@/content/offices';

const seccion = (oficio: string, id: string) =>
  OFFICES.find((o) => o.id === oficio)!.sections.find((s) => s.id === id)!;
const texto = (oficio: string, id: string) =>
  seccion(oficio, id).blocks.map((b) => b.content).join(' ');

describe('la Gran Doxología', () => {
  it('está entera, de la primera frase al Trisagio final', () => {
    const t = texto('maitines', 'doxologia');
    for (const frase of [
      'Gloria a Dios en las alturas',
      'Cordero de Dios',
      'sólo Tú eres santo',
      'Concédenos, Señor, guardarnos este día sin pecado',
      'en tu luz veremos la luz',
      'Santo Dios, Santo Fuerte, Santo Inmortal',
    ]) {
      expect(t, frase).toContain(frase);
    }
  });

  it('ya no se anuncia como pendiente', () => {
    expect(seccion('maitines', 'doxologia').blocks.some((b) => b.kind === 'pending')).toBe(false);
  });
});

describe('Medianoche y Proscomidia', () => {
  it('Medianoche trae el tropario del Esposo', () => {
    expect(texto('medianoche', 'propios')).toContain('He aquí que el Esposo viene a medianoche');
  });

  it('la Proscomidia trae la oración de la prótesis', () => {
    expect(texto('liturgia-crisostomo', 'proscomidia')).toContain('que enviaste el Pan celestial');
  });

  it('lo que sigue faltando se sigue diciendo', () => {
    for (const [oficio, id] of [
      ['medianoche', 'propios'],
      ['liturgia-crisostomo', 'proscomidia'],
    ] as const) {
      expect(seccion(oficio, id).blocks.some((b) => b.kind === 'pending'), `${oficio}/${id}`).toBe(true);
    }
  });
});

describe('la procedencia', () => {
  it('cada texto incorporado dice que la traducción es de ATHOS', () => {
    for (const [oficio, id] of [
      ['maitines', 'doxologia'],
      ['medianoche', 'propios'],
      ['liturgia-crisostomo', 'proscomidia'],
    ] as const) {
      expect(texto(oficio, id), `${oficio}/${id}`).toMatch(/Traducción para ATHOS a partir del original griego/);
    }
  });
});
