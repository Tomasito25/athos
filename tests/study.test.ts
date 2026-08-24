/** Itinerarios de estudio y catálogo de obras. */
import { describe, expect, it } from 'vitest';
import { STUDY_COURSES, STUDY_WORKS, WORK_KINDS } from '@/content/study';
import { SAINTS } from '@/content/saints';
import { routes } from '@/routes/router';
import type { RouteObject } from 'react-router-dom';

/** Todas las rutas declaradas, en su forma completa. */
function rutasDeclaradas(nodos: RouteObject[], base = ''): string[] {
  return nodos.flatMap((nodo) => {
    const propia = nodo.path ? `${base}/${nodo.path}`.replace(/\/+/g, '/') : base;
    return [propia, ...rutasDeclaradas(nodo.children ?? [], propia)];
  });
}

const RUTAS = rutasDeclaradas(routes);

/** ¿Existe una ruta que case con este enlace? */
function rutaExiste(enlace: string): boolean {
  const camino = enlace.split('#')[0].split('?')[0];
  return RUTAS.some((patron) => {
    const regex = new RegExp(
      '^' + patron.replace(/:[^/]+/g, '[^/]+').replace(/\/\*$/, '.*') + '$',
    );
    return regex.test(camino);
  });
}

describe('itinerarios', () => {
  it('hay varios y cada uno tiene lecciones', () => {
    expect(STUDY_COURSES.length).toBeGreaterThanOrEqual(5);
    for (const curso of STUDY_COURSES) {
      expect(curso.lessons.length, curso.title).toBeGreaterThanOrEqual(5);
      expect(curso.subtitle.length).toBeGreaterThan(15);
    }
  });

  it('las lecciones tienen cuerpo suficiente', () => {
    for (const curso of STUDY_COURSES) {
      for (const leccion of curso.lessons) {
        expect(leccion.body.length, `${curso.title}: ${leccion.title}`).toBeGreaterThanOrEqual(2);
        const texto = leccion.body.join(' ');
        expect(texto.length, `${curso.title}: ${leccion.title}`).toBeGreaterThan(200);
      }
    }
  });

  it('los identificadores no se repiten', () => {
    const cursos = STUDY_COURSES.map((c) => c.id);
    expect(new Set(cursos).size).toBe(cursos.length);
    for (const curso of STUDY_COURSES) {
      const ids = curso.lessons.map((l) => l.id);
      expect(new Set(ids).size, curso.title).toBe(ids.length);
    }
  });

  it('todas las lecturas enlazadas llevan a una ruta que existe', () => {
    for (const curso of STUDY_COURSES) {
      for (const leccion of curso.lessons) {
        for (const lectura of leccion.readings ?? []) {
          expect(rutaExiste(lectura.path), `${leccion.title} → ${lectura.path}`).toBe(true);
        }
      }
    }
  });
});

describe('catálogo de obras', () => {
  it('cada obra dice qué es y por qué importa', () => {
    expect(STUDY_WORKS.length).toBeGreaterThanOrEqual(15);
    for (const obra of STUDY_WORKS) {
      expect(obra.what.length, obra.title).toBeGreaterThan(60);
      expect(obra.why.length, obra.title).toBeGreaterThan(60);
      expect(WORK_KINDS[obra.kind], obra.title).toBeDefined();
    }
  });

  it('declara con honestidad qué tiene ATHOS y qué no', () => {
    for (const obra of STUDY_WORKS) {
      expect(['completo', 'parcial', 'ficha']).toContain(obra.availability);
      // Si dice que hay texto, tiene que haber adónde ir.
      if (obra.availability !== 'ficha') {
        expect(obra.path, `${obra.title} dice tener texto pero no enlaza`).toBeTruthy();
      }
    }
  });

  it('los enlaces llevan a rutas que existen', () => {
    for (const obra of STUDY_WORKS) {
      if (!obra.path) continue;
      expect(rutaExiste(obra.path), `${obra.title} → ${obra.path}`).toBe(true);
    }
  });
});

describe('santoral ampliado', () => {
  it('hay bastantes más santos que al principio', () => {
    expect(SAINTS.length).toBeGreaterThanOrEqual(150);
  });

  it('todos tienen vida escrita, no sólo nombre', () => {
    for (const santo of SAINTS) {
      expect(santo.biography.length, santo.name).toBeGreaterThan(80);
      expect(santo.category.length, santo.name).toBeGreaterThan(0);
    }
  });

  it('los identificadores son únicos', () => {
    const ids = SAINTS.map((s) => s.id);
    const repetidos = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(repetidos).toEqual([]);
  });

  it('las fechas tienen forma MM-DD válida', () => {
    for (const santo of SAINTS) {
      expect(santo.day, santo.name).toMatch(/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
    }
  });

  it('cubren los doce meses', () => {
    const meses = new Set(SAINTS.map((s) => s.day.slice(0, 2)));
    expect(meses.size).toBe(12);
  });

  it('están ordenados por su día', () => {
    const dias = SAINTS.map((s) => s.day);
    expect([...dias].sort()).toEqual(dias);
  });
});
