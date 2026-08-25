/**
 * El apartado de oraciones: el menú de momentos y la honradez de las fichas.
 *
 * Lo que aquí se comprueba no es sólo que la aplicación funcione, sino que
 * ningún texto redactado para ATHOS se presente como texto litúrgico.
 */
import { describe, expect, it } from 'vitest';
import { PRAYERS, PRAYER_CATEGORIES } from '@/content/prayers';
import { MOMENTS_IN_ORDER, MOMENT_GROUPS, momentById, momentNow } from '@/content/moments';
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
      expect(
        /texto litúrgico tradicional|dominio público/i.test(derechos),
        `${prayer.id} se atribuye derechos de texto tradicional`,
      ).toBe(false);
      expect(/redactado para ATHOS/i.test(derechos), `${prayer.id}`).toBe(true);
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

  it('el texto de búsqueda se calcula sin las etiquetas ni los huecos', () => {
    for (const prayer of PRAYERS) {
      expect(prayer.searchText).not.toMatch(/<[^>]+>/);
      // El hueco no se indexa; que una guía hable de lo que falta, sí.
      expect(prayer.searchText).not.toContain('contenido pendiente de incorporar');
      expect(prayer.searchText.includes(prayer.title.toLowerCase())).toBe(true);
    }
  });
});
