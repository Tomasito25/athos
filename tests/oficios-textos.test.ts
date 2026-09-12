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
    expect(seccion('medianoche', 'propios').blocks.some((b) => b.kind === 'pending')).toBe(true);
  });

  it('la Proscomidia trae ya las oraciones del revestimiento', () => {
    const t = texto('liturgia-crisostomo', 'revestimiento');
    for (const frase of [
      'Entraré en tu casa',
      'vestidura de salvación',
      'derrama su gracia sobre sus sacerdotes',
      'me ciñe de poder',
      'Tu diestra, Señor, se ha glorificado',
      'Tus manos me hicieron y me formaron',
      'se vestirán de justicia',
      'Lavaré mis manos entre los inocentes',
    ]) {
      expect(t, frase).toContain(frase);
    }
    expect(seccion('liturgia-crisostomo', 'revestimiento').blocks.some((b) => b.kind === 'pending')).toBe(false);
  });
});

describe('las Completas', () => {
  it('traen enteras las tres oraciones fijas de la noche', () => {
    expect(texto('completas', 'basilio-noche')).toContain('toda saeta que vuela de día');
    expect(texto('completas', 'theotokos-noche')).toContain('Inmaculada, incontaminada, incorrupta');
    expect(texto('completas', 'antioco')).toContain('descanso de cuerpo y alma');
    expect(texto('completas', 'esperanza')).toContain('Mi esperanza es el Padre');
  });

  it('terminan pidiendo perdón, que es como terminan de verdad', () => {
    expect(texto('completas', 'perdon')).toContain('Perdonadme, padres y hermanos');
  });

  it('traen la oración de san Juan Damasceno que anuncia su propio resumen', () => {
    const o = OFFICES.find((o) => o.id === 'completas')!;
    expect(o.structure).toContain('Damasceno');
    expect(texto('completas', 'damasceno')).toContain('¿será este lecho mi sepulcro');
  });

  it('las Grandes traen la oración de Manasés', () => {
    const t = texto('completas', 'grandes');
    expect(t).toContain('Señor omnipotente, Dios de nuestros padres');
    expect(t).toContain('doblo las rodillas de mi corazón');
    expect(t).toContain('Señor de las potestades, quédate con nosotros');
  });

  it('siguen declarando lo único que falta: el canon variable', () => {
    const conHueco = OFFICES.find((o) => o.id === 'completas')!.sections.filter((s) =>
      s.blocks.some((b) => b.kind === 'pending'),
    );
    expect(conHueco.map((s) => s.id)).toEqual(['canon']);
  });
});

describe('los Presantificados', () => {
  it('traen el momento propio del oficio', () => {
    expect(texto('presantificados', 'luz-de-cristo')).toContain('La luz de Cristo ilumina a todos');
    expect(texto('presantificados', 'himnos')).toContain('Gustad y ved qué bueno es el Señor');
    expect(texto('presantificados', 'himnos')).toContain('Suba mi oración como el incienso');
  });

  it('ya no despachan «el resto del oficio» como pendiente', () => {
    const o = OFFICES.find((o) => o.id === 'presantificados')!;
    const huecos = o.sections.flatMap((s) => s.blocks.filter((b) => b.kind === 'pending'));
    expect(huecos.map((b) => b.content).join(' ')).not.toContain('el resto del oficio');
    // Sigue siendo parcial, y por tanto tiene que decir qué le falta: los propios del Triodion.
    expect(huecos).toHaveLength(1);
    expect(huecos[0]!.content).toContain('Triodion');
  });

  it('no atribuyen el oficio a san Gregorio sin matizarlo', () => {
    expect(texto('presantificados', 'por-que')).toContain('no tiene fundamento histórico');
  });
});

describe('la procedencia', () => {
  it('cada texto incorporado dice que la traducción es de ATHOS', () => {
    for (const [oficio, id] of [
      ['maitines', 'doxologia'],
      ['medianoche', 'propios'],
      ['liturgia-crisostomo', 'proscomidia'],
      ['liturgia-crisostomo', 'revestimiento'],
      ['completas', 'trisagio-troparios'],
      ['completas', 'basilio-noche'],
      ['completas', 'theotokos-noche'],
      ['completas', 'antioco'],
      ['completas', 'damasceno'],
      ['presantificados', 'himnos'],
    ] as const) {
      expect(texto(oficio, id), `${oficio}/${id}`).toMatch(/Traducción para ATHOS a partir del original griego/);
    }
  });
});
