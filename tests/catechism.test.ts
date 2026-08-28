/**
 * El catecismo.
 *
 * Un catecismo puede fallar de dos maneras: no responder, o responder de más.
 * Estas pruebas vigilan las dos.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CATECHISM_LEVELS, CATECHISM_META } from '@/content/catechism';
import { CATECHISM_PARTS } from '@/content/catechism-parts';

const todas = CATECHISM_PARTS.flatMap((p) => p.entries);

describe('estructura', () => {
  it('cubre las partes que un catecismo tiene que cubrir', () => {
    const ids = CATECHISM_PARTS.map((p) => p.id);
    for (const parte of ['dios', 'hombre', 'cristo', 'iglesia', 'misterios', 'vida', 'ultimas', 'fondo']) {
      expect(ids, `falta la parte ${parte}`).toContain(parte);
    }
  });

  it('no hay preguntas repetidas', () => {
    const ids = todas.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada pregunta lo es de verdad', () => {
    for (const e of todas) {
      expect(e.question.endsWith('?'), `«${e.question}» no es una pregunta`).toBe(true);
    }
  });

  it('cada respuesta responde, y no en una línea', () => {
    for (const e of todas) {
      expect(e.answer.length, `${e.id}: respuesta de un solo párrafo`).toBeGreaterThanOrEqual(2);
      for (const parrafo of e.answer) {
        expect(parrafo.length, `${e.id}: párrafo demasiado corto`).toBeGreaterThan(100);
      }
    }
  });
});

describe('los tres públicos', () => {
  it('los tres niveles tienen preguntas', () => {
    for (const nivel of Object.keys(CATECHISM_LEVELS)) {
      const cuantas = todas.filter((e) => e.level === nivel).length;
      expect(cuantas, `el nivel ${nivel} se ha quedado vacío`).toBeGreaterThan(3);
    }
  });

  it('quien llega de fuera tiene por dónde empezar', () => {
    // Si lo primero que se encuentra un recién llegado exige saber teología,
    // el catecismo no sirve para lo que dice servir.
    const primeras = CATECHISM_PARTS[0].entries;
    expect(primeras.every((e) => e.level === 'nuevo')).toBe(true);
  });

  it('lo hondo no se le sirve a quien acaba de llegar', () => {
    const hondas = todas.filter((e) => e.level === 'iniciado').map((e) => e.id);
    expect(hondas.length).toBeGreaterThan(1);
    // Esencia y energías, el purgatorio: no son primeras preguntas.
    expect(hondas).toContain('esencia-energias');
  });
});

describe('honradez', () => {
  it('lo que se discute se marca como discutido', () => {
    // Las cuatro diferencias de fondo con Occidente no pueden pasar por
    // doctrina pacífica.
    for (const id of ['filioque', 'quien-manda', 'purgatorio', 'pecado-original']) {
      const e = todas.find((x) => x.id === id);
      expect(e, `falta la pregunta ${id}`).toBeDefined();
      expect(e?.disputed, `${id} no dice que se discuta`).toBeTruthy();
    }
  });

  it('lo indefinido se declara indefinido', () => {
    // Un catecismo que cierra lo que la Iglesia dejó abierto enseña mal.
    const conAviso = todas.filter((e) => e.undefined_);
    expect(conAviso.length, 'nada se declara indefinido').toBeGreaterThanOrEqual(3);
    for (const id of ['infierno', 'el-mal']) {
      expect(todas.find((x) => x.id === id)?.undefined_, `${id}`).toBeTruthy();
    }
  });

  it('el aviso de lo discutido explica la postura ajena, no la caricaturiza', () => {
    for (const e of todas.filter((x) => x.disputed)) {
      expect(e.disputed!.length, `${e.id}: aviso demasiado escueto`).toBeGreaterThan(80);
      // Nombra a quien discrepa en vez de hablar de «los otros».
      expect(
        /católic|Roma|protestante|occidental|Occidente|latina|Florencia|Anselmo/i.test(e.disputed!),
        `${e.id}: no dice con quién se discrepa`,
      ).toBe(true);
    }
  });

  it('las citas bíblicas tienen forma de cita', () => {
    for (const e of todas) {
      for (const cita of e.scripture ?? []) {
        expect(cita, `${e.id}: «${cita}»`).toMatch(/^[1-4]?\s?[A-ZÁÉÍÓÚ][^,]*\s\d+(,\s?\d+)?/);
      }
    }
  });

  it('se declara como prosa de ATHOS, no como texto de la Iglesia', () => {
    expect(CATECHISM_META.license).toBe('cc-by-sa-4.0');
    expect(CATECHISM_META.source).toMatch(/redactado para ATHOS/i);
    expect(CATECHISM_META.notes).toMatch(/no es un texto litúrgico/i);
  });

  it('remite al sacerdote para lo que importa', () => {
    const pagina = readFileSync(resolve(process.cwd(), 'src/locales/es.ts'), 'utf-8');
    expect(pagina).toMatch(/pregúntaselo a un sacerdote/i);
  });
});

describe('los enlaces internos llevan a algún sitio', () => {
  it('todo «sigue por» apunta a una ruta real', () => {
    const rutas = readFileSync(resolve(process.cwd(), 'src/routes/router.tsx'), 'utf-8');
    for (const e of todas) {
      for (const enlace of e.seeAlso ?? []) {
        const camino = enlace.path.replace(/^\//, '');
        const raiz = camino.split('/').slice(0, 2).join('/');
        expect(
          rutas.includes(`path: '${camino}'`) || rutas.includes(`path: '${raiz}`),
          `${e.id} enlaza a ${enlace.path}, que no existe`,
        ).toBe(true);
      }
    }
  });
});
