/**
 * El apartado de oraciones: el menú de momentos y la honradez de las fichas.
 *
 * Lo que aquí se comprueba no es sólo que la aplicación funcione, sino que
 * ningún texto redactado para ATHOS se presente como texto litúrgico.
 */
import { describe, expect, it } from 'vitest';
import { PRAYERS, PRAYER_CATEGORIES } from '@/content/prayers';
import { MOMENTS_IN_ORDER, MOMENT_GROUPS, MOMENT_ICONS, momentById, momentNow } from '@/content/moments';
import type { PrayerCategoryId } from '@/types';

const categorias = new Set(PRAYER_CATEGORIES.map((c) => c.id));

describe('el menú de momentos', () => {
  it('cada momento del menú es una categoría de verdad', () => {
    for (const grupo of MOMENT_GROUPS) {
      expect(grupo.moments.length, grupo.name).toBeGreaterThan(2);
      for (const id of grupo.moments) {
        expect(categorias.has(id), `${grupo.name}: no existe ${id}`).toBe(true);
      }
    }
  });

  it('ninguna categoría se queda fuera del menú ni aparece dos veces', () => {
    expect([...MOMENTS_IN_ORDER].sort()).toEqual([...categorias].sort());
    expect(new Set(MOMENTS_IN_ORDER).size).toBe(MOMENTS_IN_ORDER.length);
  });

  it('están los momentos que se piden por su nombre', () => {
    const porNombre = (nombre: string) =>
      PRAYER_CATEGORIES.find((c) => c.name.toLowerCase() === nombre.toLowerCase());
    expect(porNombre('Al despertar')).toBeDefined();
    expect(porNombre('Antes de comer')).toBeDefined();
    expect(porNombre('Después de comer')).toBeDefined();
    expect(porNombre('Al caer en el pecado')).toBeDefined();
  });

  it('cada momento tiene nombre y una línea que explica cuándo es', () => {
    for (const categoria of PRAYER_CATEGORIES) {
      expect(categoria.name.length, categoria.id).toBeGreaterThan(3);
      expect(categoria.description.length, categoria.id).toBeGreaterThan(15);
    }
  });

  it('momentById encuentra lo que el menú enumera', () => {
    for (const id of MOMENTS_IN_ORDER) {
      expect(momentById(id)?.id).toBe(id);
    }
    expect(momentById('inexistente')).toBeUndefined();
  });
});

describe('el signo de cada momento', () => {
  it('todos los momentos tienen icono, y no sobra ninguno', () => {
    for (const id of MOMENTS_IN_ORDER) {
      expect(MOMENT_ICONS[id], id).toBeTruthy();
    }
    expect(Object.keys(MOMENT_ICONS).sort()).toEqual([...MOMENTS_IN_ORDER].sort());
  });

  it('dentro de un mismo grupo no se repite ninguno', () => {
    // Dos tarjetas contiguas con el mismo signo se leen como un descuido.
    for (const grupo of MOMENT_GROUPS) {
      const signos = grupo.moments.map((id) => MOMENT_ICONS[id]);
      expect(new Set(signos).size, `${grupo.name}: ${signos.join(', ')}`).toBe(signos.length);
    }
  });
});

describe('el momento de la hora', () => {
  it('las veinticuatro horas dan un momento válido o ninguno', () => {
    for (let hora = 0; hora < 24; hora += 1) {
      const id = momentNow(hora);
      if (id !== null) expect(categorias.has(id), `hora ${hora}: ${id}`).toBe(true);
    }
  });

  it('reparte el día como se espera', () => {
    expect(momentNow(7)).toBe('manana');
    expect(momentNow(14)).toBe('antes-comer');
    expect(momentNow(16)).toBe('despues-comer');
    expect(momentNow(23)).toBe('noche');
    expect(momentNow(2)).toBe('noche');
  });

  it('no inventa un momento para las horas que no lo tienen', () => {
    // A media mañana y a media tarde no hay un momento propio: manda el oficio.
    expect(momentNow(11)).toBeNull();
    expect(momentNow(19)).toBeNull();
  });

  it('la noche cruza la medianoche sin agujeros', () => {
    for (const hora of [21, 22, 23, 0, 1, 2, 3, 4]) {
      expect(momentNow(hora), `hora ${hora}`).toBe('noche');
    }
  });

  it('aguanta horas fuera de rango', () => {
    expect(momentNow(24)).toBe(momentNow(0));
    expect(momentNow(-1)).toBe(momentNow(23));
  });
});

describe('la biblioteca de oraciones', () => {
  it('ningún momento se queda vacío', () => {
    for (const categoria of PRAYER_CATEGORIES) {
      const suyas = PRAYERS.filter((p) => p.category === categoria.id);
      expect(suyas.length, `${categoria.name} no tiene oraciones`).toBeGreaterThanOrEqual(2);
    }
  });

  it('no hay identificadores repetidos', () => {
    const ids = PRAYERS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('toda oración tiene título, categoría real y algo que rezar', () => {
    for (const prayer of PRAYERS) {
      expect(prayer.title.length, prayer.id).toBeGreaterThan(2);
      expect(categorias.has(prayer.category as PrayerCategoryId), prayer.id).toBe(true);
      expect(prayer.blocks.length, prayer.id).toBeGreaterThan(0);
    }
  });

  it('las oraciones se ordenan siguiendo el orden de los momentos', () => {
    const orden = new Map(PRAYER_CATEGORIES.map((c) => [c.id, c.order]));
    let anterior = 0;
    for (const prayer of [...PRAYERS].sort((a, b) => a.order - b.order)) {
      const suyo = orden.get(prayer.category) ?? 99;
      expect(suyo, `${prayer.id} rompe el orden`).toBeGreaterThanOrEqual(anterior);
      anterior = suyo;
    }
  });
});

describe('procedencia: lo que ATHOS escribe no se disfraza de texto litúrgico', () => {
  const esDeAthos = (texto: string) => /para ATHOS|redactad|compuesto para|resumido por ATHOS/i.test(texto);

  /*
   * Hay tres clases de texto y no dos, que es lo que se aprendió al incorporar
   * la Oración de Manasés:
   *
   * 1. **Tradicional.** Existe y circula en español; ATHOS lo recoge.
   * 2. **Propio.** Lo ha escrito ATHOS porque no hay texto para ese momento.
   * 3. **Traducido.** El texto existe y es antiquísimo, pero en griego; lo que
   *    no existe con licencia compatible es una versión española, así que
   *    ATHOS la hace.
   *
   * Los tres llevan licencia distinta y dicen cosas distintas. Lo que no puede
   * pasar es que uno se presente como otro: que lo propio parezca litúrgico,
   * que lo litúrgico parezca de ATHOS, o que una traducción propia se anuncie
   * como la versión que se reza en las parroquias.
   */
  const esTraduccion = (prayer: (typeof PRAYERS)[number]) =>
    /traducción al español hecha para ATHOS/i.test(prayer.meta.source);

  it('lo redactado para ATHOS nunca se declara tradicional', () => {
    for (const prayer of PRAYERS) {
      if (esDeAthos(prayer.meta.source)) {
        expect(prayer.meta.license, `${prayer.id} se hace pasar por tradicional`).not.toBe('traditional');
      }
    }
  });

  it('lo redactado para ATHOS lo dice con todas las letras', () => {
    for (const prayer of PRAYERS) {
      if (prayer.meta.license !== 'cc-by-sa-4.0') continue;
      // Una traducción sí es un texto litúrgico: lo que es de ATHOS es la
      // versión española, y eso lo declara su propia nota.
      if (esTraduccion(prayer)) {
        expect(
          /traducción de un texto que existe|es una traducción/i.test(prayer.meta.notes ?? ''),
          `${prayer.id}: no aclara que lo propio es la traducción`,
        ).toBe(true);
        continue;
      }
      expect(
        /no es un texto litúrgico/i.test(prayer.meta.notes ?? ''),
        `${prayer.id}: la ficha no advierte de que no es texto litúrgico`,
      ).toBe(true);
    }
  });

  it('lo redactado para ATHOS no hereda los derechos de los textos tradicionales', () => {
    // El fallo que esto vigila: una ficha de ATHOS mostrando «texto litúrgico
    // tradicional, de dominio público», heredado de la plantilla por descuido.
    for (const prayer of PRAYERS) {
      if (prayer.meta.license !== 'cc-by-sa-4.0') continue;
      const derechos = prayer.meta.copyright ?? '';
      expect(derechos.length, `${prayer.id} sin aviso de derechos`).toBeGreaterThan(20);
      if (esTraduccion(prayer)) {
        // Una traducción sí puede decir «dominio público»: es lo que es el
        // original. Lo que tiene que decir además es de quién es la versión.
        expect(
          /traducción hecha para ATHOS/i.test(derechos),
          `${prayer.id}: no dice de quién es la versión española`,
        ).toBe(true);
        continue;
      }
      expect(
        /texto litúrgico tradicional|dominio público/i.test(derechos),
        `${prayer.id} se atribuye derechos de texto tradicional`,
      ).toBe(false);
      expect(/redactado para ATHOS/i.test(derechos), `${prayer.id}`).toBe(true);
    }
  });

  it('una traducción propia no se anuncia como la que se reza en las parroquias', () => {
    // Es la mentira fácil: presentar la versión de ATHOS como «de uso
    // corriente». El texto es auténtico; la versión, no está en ningún libro.
    for (const prayer of PRAYERS) {
      if (!esTraduccion(prayer)) continue;
      expect(
        /uso corriente en las parroquias/i.test(prayer.meta.notes ?? ''),
        `${prayer.id}: se atribuye un uso que no tiene`,
      ).toBe(false);
      expect(prayer.meta.license, prayer.id).toBe('cc-by-sa-4.0');
    }
  });

  it('lo tradicional no se firma como obra de ATHOS', () => {
    for (const prayer of PRAYERS) {
      if (prayer.meta.license === 'cc-by-sa-4.0') continue;
      expect(
        /redactad[oa] para ATHOS|compuesto para ATHOS|Guía redactada/i.test(prayer.meta.source),
        `${prayer.id}: dice ser de ATHOS pero no lleva su licencia`,
      ).toBe(false);
    }
  });

  it('toda oración lleva fuente, lengua, licencia y fecha', () => {
    for (const prayer of PRAYERS) {
      expect(prayer.meta.source.length, prayer.id).toBeGreaterThan(10);
      expect(prayer.meta.language, prayer.id).toBe('es');
      expect(prayer.meta.license, prayer.id).toBeTruthy();
      expect(prayer.meta.dateAdded, prayer.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('lo pendiente se marca como pendiente y explica por qué', () => {
    for (const prayer of PRAYERS) {
      const tienePendiente = prayer.blocks.some((b) => b.kind === 'pending');
      if (tienePendiente) {
        expect(prayer.status, prayer.id).toBe('pending');
        expect(prayer.meta.notes?.length ?? 0, `${prayer.id} no explica qué falta`).toBeGreaterThan(30);
      }
      if (prayer.status === 'complete') {
        expect(tienePendiente, `${prayer.id} se declara completa con huecos`).toBe(false);
      }
    }
  });

  it('una oración completa tiene texto, no sólo rúbricas', () => {
    // Las guías prácticas son la excepción: son todo indicación, y lo declaran.
    for (const prayer of PRAYERS) {
      if (prayer.status !== 'complete') continue;
      const esGuia = /Guía redactada para ATHOS/i.test(prayer.meta.source);
      if (esGuia) continue;
      const tieneTexto = prayer.blocks.some((b) => b.kind === 'text' || b.kind === 'verse');
      expect(tieneTexto, `${prayer.id} no tiene ni una línea que rezar`).toBe(true);
    }
  });


  it('los momentos difíciles no se quedan vacíos', () => {
    // Se añadieron precisamente porque nadie los servía. Si alguno se queda sin
    // nada dentro, el menú promete algo que no da.
    for (const id of ['agonia', 'duelo', 'matrimonio', 'embarazo', 'casa', 'dudas', 'paz'] as const) {
      const dentro = PRAYERS.filter((p) => p.category === id);
      expect(dentro.length, `${id}: momento vacío`).toBeGreaterThan(1);
    }
  });

  it('donde la Iglesia no habla con una sola voz, se dice', () => {
    const guerra = PRAYERS.find((p) => p.id === 'la-iglesia-y-la-guerra');
    const texto = (guerra?.blocks ?? []).map((b) => b.content).join(' ');
    expect(texto, 'la guerra sin sus desacuerdos').toMatch(/posiciones opuestas|enfrentado/i);
    expect(texto, 'sin la parte difícil del Evangelio').toMatch(/enemigos/i);
  });

  it('el texto de búsqueda se calcula sin las etiquetas ni los huecos', () => {
    for (const prayer of PRAYERS) {
      expect(prayer.searchText).not.toMatch(/<[^>]+>/);
      // El hueco no se indexa; que una guía hable de lo que falta, sí.
      expect(prayer.searchText).not.toContain('contenido pendiente de incorporar');
      expect(prayer.searchText.includes(prayer.title.toLowerCase())).toBe(true);
    }
  });
});
