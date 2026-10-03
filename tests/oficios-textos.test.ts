/**
 * Los textos fijos de los oficios.
 *
 * Se comprueba lo que importa de cada uno: que está entero, que no queda un
 * aviso de pendiente sobre algo que ya se ha incorporado, que los textos que
 * se corrigieron al cotejarlos con el Horologion están en su sitio, y que el
 * oficio dice de dónde sale la traducción.
 */
import { describe, expect, it } from 'vitest';
import { OFFICES } from '@/content/offices';

const oficio = (id: string) => OFFICES.find((o) => o.id === id)!;
const seccion = (of: string, id: string) => {
  const s = oficio(of).sections.find((x) => x.id === id);
  if (!s) throw new Error(`No existe la sección ${of}/${id}`);
  return s;
};
const texto = (of: string, id: string) =>
  seccion(of, id).blocks.map((b) => b.content).join(' ');
const todo = (of: string) =>
  oficio(of).sections.flatMap((s) => s.blocks.map((b) => b.content)).join(' ');
const huecos = (of: string) =>
  oficio(of).sections.flatMap((s) => s.blocks.filter((b) => b.kind === 'pending'));

describe('la Gran Doxología', () => {
  it('está entera, de la primera frase al Trisagio final', () => {
    const t = texto('maitines', 'gran-doxologia');
    for (const frase of [
      'Gloria a Dios en las alturas',
      'Cordero de Dios',
      'sólo Tú eres santo',
      'Concédenos, Señor, guardarnos sin pecado este día',
      'en tu luz veremos la luz',
      'Santo Dios, Santo Fuerte, Santo Inmortal',
    ]) {
      expect(t, frase).toContain(frase);
    }
  });
});

describe('Medianoche y Proscomidia', () => {
  it('Medianoche trae el tropario del Esposo', () => {
    expect(texto('medianoche', 'diario')).toContain('He aquí que el Esposo viene a medianoche');
  });

  it('la Proscomidia trae la oración de la prótesis', () => {
    expect(texto('liturgia-crisostomo', 'proscomidia')).toContain('que enviaste el Pan celestial');
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
  });
});

describe('las Completas', () => {
  it('las Pequeñas traen enteras sus oraciones finales', () => {
    expect(texto('completas', 'theotokos-noche')).toContain('Inmaculada, incontaminada, incorrupta');
    expect(texto('completas', 'antioco')).toContain('descanso de cuerpo y alma');
    expect(texto('completas', 'esperanza')).toContain('Mi esperanza es el Padre');
  });

  it('las Pequeñas traen sus troparios propios, y no los de las oraciones antes de dormir', () => {
    const t = texto('completas', 'trisagio-troparios');
    expect(t).toContain('Dios de nuestros padres, que obras siempre con nosotros');
    expect(t).toContain('Con los santos da descanso');
    // «Ten piedad de nosotros, Señor» es de la segunda parte de las Grandes.
    expect(t).not.toContain('sin saber qué alegar en nuestra defensa');
    expect(texto('completas', 'manases')).toContain('sin saber qué alegar en nuestra defensa');
  });

  it('terminan pidiendo perdón, que es como terminan de verdad', () => {
    expect(texto('completas', 'perdon')).toContain('perdonadme a mí, pecador');
    expect(texto('completas', 'perdon')).toContain('Perdona, Señor amigo de los hombres, a los que nos odian');
  });

  it('la oración de san Basilio está donde la pone el Horologion: al final de la primera parte de las Grandes', () => {
    const ids = oficio('completas').sections.map((s) => s.id);
    expect(texto('completas', 'basilio-noche')).toContain('toda saeta que vuela de día');
    expect(ids.indexOf('basilio-noche')).toBeGreaterThan(ids.indexOf('grandes'));
  });

  it('la de san Juan Damasceno se da como lo que es: una oración antes de dormir', () => {
    const t = texto('completas', 'damasceno');
    expect(t).toContain('¿será este lecho mi sepulcro');
    expect(t).toContain('No es parte del oficio');
  });

  it('las Grandes están enteras: Dios está con nosotros, Manasés y Señor de las potestades', () => {
    expect(texto('completas', 'dios-con-nosotros')).toContain('Ángel del Gran Consejo');
    const manases = texto('completas', 'manases');
    expect(manases).toContain('Señor omnipotente, Dios de nuestros padres');
    expect(manases).toContain('doblo las rodillas de mi corazón');
    expect(texto('completas', 'senor-de-las-potestades')).toContain('Señor de las potestades, quédate con nosotros');
  });

  it('no les queda nada pendiente', () => {
    expect(oficio('completas').status).toBe('complete');
    expect(huecos('completas')).toHaveLength(0);
  });
});

describe('los Presantificados', () => {
  it('traen el orden entero, de la bendición a la despedida', () => {
    const t = todo('presantificados');
    for (const frase of [
      'Bendito sea el Reino del Padre',
      'La luz de Cristo ilumina a todos',
      'Suba mi oración como el incienso ante Ti',
      'Ahora las Potestades celestiales',
      'Las cosas santas presantificadas, para los santos',
      'Gustad y ved qué bueno es el Señor',
      'aplastar las cabezas de los dragones invisibles',
    ]) {
      expect(t, frase).toContain(frase);
    }
  });

  it('traen la letanía de los que se preparan para el bautismo, del eslavo', () => {
    const t = texto('presantificados', 'iluminandos');
    expect(t).toContain('Porque Tú eres nuestra iluminación');
    expect(t).toContain('libros eslavos');
  });

  it('ya no dejan pendiente lo propio del día: dicen de qué libro se toma', () => {
    expect(oficio('presantificados').status).toBe('complete');
    expect(huecos('presantificados')).toHaveLength(0);
    expect(texto('presantificados', 'senor-clame')).toContain('Triodion');
  });

  it('no atribuyen el oficio a san Gregorio sin matizarlo', () => {
    expect(texto('presantificados', 'por-que')).toContain('no tiene fundamento histórico');
  });
});

describe('la procedencia', () => {
  it('los oficios dicen que la traducción es de ATHOS y de qué original', () => {
    const meta = oficio('visperas').meta;
    expect(meta.translator).toBe('ATHOS');
    expect(meta.notes).toMatch(/Traducción para ATHOS/);
    expect(meta.notes).toMatch(/griegos/);
  });

  it('los textos traducidos dentro de las Completas lo dicen también en su sitio', () => {
    for (const id of ['trisagio-troparios', 'theotokos-noche', 'antioco', 'damasceno', 'basilio-noche'] as const) {
      expect(texto('completas', id), id).toMatch(/Traducción para ATHOS a partir del/);
    }
  });
});
