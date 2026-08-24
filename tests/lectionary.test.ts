/**
 * Leccionario y iconografía.
 *
 * El leccionario se genera desde orthocal (MIT) y se guarda como dato; aquí se
 * comprueba su forma, su cobertura y algunas lecturas verificables contra
 * cualquier calendario ortodoxo publicado.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { ICONS } from '@/content/icons';
import { BOOKS_BY_ID } from '@/content/bible';

const raiz = process.cwd();
const rutaLeccionario = resolve(raiz, 'public/content/lectionary/lectionary.json');
const hayLeccionario = existsSync(rutaLeccionario);

interface Lectura {
  kind: string;
  reference: string;
  book?: string;
  chapter?: number;
  note?: string;
}
interface Archivo {
  format: string;
  version: number;
  source: string;
  tradition: string;
  calendar: string;
  readings: Lectura[][];
  years: Record<string, Record<string, number>>;
}

const leccionario: Archivo | null = hayLeccionario
  ? (JSON.parse(readFileSync(rutaLeccionario, 'utf-8')) as Archivo)
  : null;

const lecturasDe = (iso: string): Lectura[] => {
  const [a, m, d] = iso.split('-');
  const indice = leccionario!.years[a]?.[`${m}-${d}`];
  return indice === undefined ? [] : leccionario!.readings[indice];
};

const referencia = (iso: string, tipo: string) =>
  lecturasDe(iso).find((r) => r.kind === tipo)?.reference;

describe.skipIf(!hayLeccionario)('leccionario diario', () => {
  it('declara su procedencia', () => {
    expect(leccionario!.format).toBe('athos-lectionary');
    expect(leccionario!.source).toContain('orthocal');
    expect(leccionario!.source).toContain('MIT');
    expect(leccionario!.tradition).toBe('slavic');
  });

  it('cubre más de veinte años seguidos, sin huecos', () => {
    const anios = Object.keys(leccionario!.years).map(Number).sort((a, b) => a - b);
    expect(anios.length).toBeGreaterThanOrEqual(20);
    for (let i = 1; i < anios.length; i++) {
      expect(anios[i]).toBe(anios[i - 1] + 1);
    }
  });

  it('tiene lecturas para todos los días de cada año', () => {
    for (const [anio, dias] of Object.entries(leccionario!.years)) {
      const bisiesto = Number(anio) % 4 === 0 && (Number(anio) % 100 !== 0 || Number(anio) % 400 === 0);
      expect(Object.keys(dias).length, `año ${anio}`).toBe(bisiesto ? 366 : 365);
    }
  });

  it('sólo faltan Evangelios los días laborables de Cuaresma', () => {
    // En Cuaresma no hay Divina Liturgia entre semana, así que esos días no
    // tienen Evangelio. Cualquier otra ausencia sería un fallo del leccionario.
    const sinEvangelio: Array<[string, string]> = [];
    for (const [anio, dias] of Object.entries(leccionario!.years)) {
      for (const [md, indice] of Object.entries(dias)) {
        if (!leccionario!.readings[indice].some((r) => r.kind === 'evangelio')) {
          sinEvangelio.push([anio, md]);
        }
      }
    }

    expect(sinEvangelio.length).toBeGreaterThan(0);
    for (const [anio, md] of sinEvangelio) {
      const fecha = new Date(Number(anio), Number(md.slice(0, 2)) - 1, Number(md.slice(3)));
      const diaSemana = fecha.getDay();
      expect(diaSemana, `${anio}-${md} no es laborable`).toBeGreaterThan(0);
      expect(diaSemana, `${anio}-${md} es sábado`).toBeLessThan(6);
      expect(['02', '03', '04'], `${anio}-${md} fuera de Cuaresma`).toContain(md.slice(0, 2));
    }
  });

  /* Fechas comprobables contra cualquier calendario litúrgico publicado. */

  it('la Pascua lee Juan 1 y Hechos 1', () => {
    for (const [pascua] of [['2026-04-12'], ['2027-05-02'], ['2025-04-20']]) {
      expect(referencia(pascua, 'evangelio'), pascua).toBe('Juan 1, 1-17');
      expect(referencia(pascua, 'epistola'), pascua).toBe('Hechos 1, 1-8');
    }
  });

  it('la Natividad lee Mateo 2 y Gálatas 4', () => {
    expect(referencia('2026-12-25', 'evangelio')).toBe('Mateo 2, 1-12');
    expect(referencia('2026-12-25', 'epistola')).toBe('Gálatas 4, 4-7');
  });

  it('la Teofanía lee Mateo 3', () => {
    expect(referencia('2026-01-06', 'evangelio')).toBe('Mateo 3, 13-17');
  });

  it('la Anunciación lee Lucas 1', () => {
    expect(referencia('2026-03-25', 'evangelio')).toBe('Lucas 1, 24-38');
  });

  it('el Domingo de Ramos lee Juan 12', () => {
    expect(referencia('2026-04-05', 'evangelio')).toBe('Juan 12, 1-18');
  });

  it('Pentecostés lee Juan 7', () => {
    expect(referencia('2026-05-31', 'evangelio')).toContain('Juan 7, 37-52');
  });

  it('coincide con el leccionario que ATHOS ya tenía verificado a mano', () => {
    // El ciclo móvil curado a mano y el generado deben decir lo mismo.
    expect(referencia('2026-02-01', 'evangelio')).toBe('Lucas 18, 10-14'); // Publicano y fariseo
    expect(referencia('2026-04-19', 'evangelio')).toBe('Juan 20, 19-31'); // Domingo de Tomás
  });

  it('las referencias están en español', () => {
    for (const lectura of leccionario!.readings.flat()) {
      expect(lectura.reference).not.toMatch(/\b(Matthew|Luke|John|Mark|Acts|Romans|Isaiah)\b/);
    }
  });

  it('las referencias simples usan el formato español «Libro cap, vv»', () => {
    // Las lecturas compuestas de Vísperas conservan su forma original a
    // propósito: reescribirlas podría alterar lo que dicen.
    const simples = leccionario!.readings.flat().filter((r) => r.book && r.chapter);
    expect(simples.length).toBeGreaterThan(2000);
    for (const lectura of simples) {
      expect(lectura.reference, lectura.reference).not.toMatch(/\d\.\d/);
      // Los libros numerados («2 Timoteo») empiezan por cifra.
      expect(lectura.reference, lectura.reference).toMatch(/^(?:[1-4]\s)?\D+\s\d+(?:,|$)/);
    }
  });

  it('los libros citados existen en el canon de ATHOS', () => {
    const codigos = new Set(
      leccionario!.readings.flat().map((r) => r.book).filter(Boolean) as string[],
    );
    expect(codigos.size).toBeGreaterThan(20);
    for (const codigo of codigos) {
      expect(BOOKS_BY_ID.has(codigo), `libro desconocido: ${codigo}`).toBe(true);
    }
  });

  it('las notas están traducidas', () => {
    const notas = leccionario!.readings.flat().map((r) => r.note).filter(Boolean) as string[];
    expect(notas.length).toBeGreaterThan(100);
    for (const nota of notas.slice(0, 300)) {
      expect(nota).not.toMatch(/\b(Theotokos and|Sunday before|Saturday after|Afterfeast of)\b/);
    }
  });

  it('pesa lo razonable para precachearlo', () => {
    expect(statSync(rutaLeccionario).size).toBeLessThan(2_500_000);
  });
});

describe('iconografía', () => {
  it('las imágenes tienen procedencia completa', () => {
    const conImagen = ICONS.filter((i) => i.image);
    expect(conImagen.length).toBeGreaterThanOrEqual(12);
    for (const icono of conImagen) {
      expect(icono.credit, icono.id).toBeDefined();
      expect(icono.credit!.author.length, icono.id).toBeGreaterThan(3);
      expect(icono.credit!.license.length, icono.id).toBeGreaterThan(3);
      expect(icono.credit!.source, icono.id).toBe('Wikimedia Commons');
      expect(icono.credit!.page, icono.id).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
    }
  });

  it('los archivos de imagen existen', () => {
    for (const icono of ICONS) {
      if (!icono.image) continue;
      expect(existsSync(resolve(raiz, 'public', icono.image)), icono.image).toBe(true);
      expect(existsSync(resolve(raiz, 'public', icono.thumb!)), icono.thumb).toBe(true);
    }
  });

  it('cada imagen pesa poco: son muchas y van al dispositivo', () => {
    for (const icono of ICONS) {
      if (!icono.image) continue;
      expect(statSync(resolve(raiz, 'public', icono.image)).size, icono.id).toBeLessThan(500_000);
      expect(statSync(resolve(raiz, 'public', icono.thumb!)).size, icono.id).toBeLessThan(120_000);
    }
  });

  it('ninguna licencia queda sin declarar', () => {
    const licencias = new Set(ICONS.filter((i) => i.credit).map((i) => i.credit!.license));
    for (const licencia of licencias) {
      expect(licencia).toMatch(/Dominio público|CC/);
    }
  });

  it('un icono sin imagen sigue teniendo su ficha', () => {
    for (const icono of ICONS) {
      expect(icono.history.length).toBeGreaterThan(40);
      expect(icono.meaning.length).toBeGreaterThan(40);
    }
  });
});
