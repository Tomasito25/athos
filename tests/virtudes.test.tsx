/**
 * Las virtudes y el menú de oración nuevo.
 *
 * Lo que se protege: que cada virtud tenga una ficha de verdad, que lo que cita
 * exista en ATHOS, y que desde la portada de Orar se llegue a todo sin leer ocho
 * pantallas.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { CASA_DEL_ALMA, VIRTUES, VIRTUES_BY_ID } from '@/content/virtudes';
import { VIRTUES_IN_ORDER, VIRTUE_GROUPS, VIRTUE_INFO } from '@/content/prayer-categories';
import { MOMENT_GROUPS } from '@/content/moments';
import { APOPHTHEGM_THEMES } from '@/content/apotegmas';
import { CHURCH_FATHERS } from '@/content/fathers';
import { SAINT_INDEX } from '@/content/saints';
import { PRAYERS } from '@/content/prayers';
import { parsePassage } from '@/lib/pericope';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
});

const montar = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);

const espera = (texto: RegExp) =>
  waitFor(() => expect(screen.getAllByText(texto).length).toBeGreaterThan(0), { timeout: 8000 });

describe('las fichas de las virtudes', () => {
  it('hay una por cada virtud del menú, sin que sobre ninguna', () => {
    expect([...VIRTUES.map((v) => v.id)].sort()).toEqual([...VIRTUES_IN_ORDER].sort());
    expect(new Set(VIRTUES_IN_ORDER).size).toBe(VIRTUES_IN_ORDER.length);
  });

  it('cada una explica qué es, qué se le opone y cómo se empieza', () => {
    for (const v of VIRTUES) {
      expect(v.what.length, v.id).toBeGreaterThanOrEqual(2);
      expect(v.against.length, v.id).toBeGreaterThan(40);
      expect(v.practice.length, v.id).toBeGreaterThanOrEqual(3);
      expect(v.scripture.length, v.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('están las que se piden por su nombre', () => {
    for (const id of ['fe', 'esperanza', 'amor', 'sabiduria', 'humildad', 'paciencia', 'castidad'] as const) {
      expect(VIRTUES_BY_ID.has(id), id).toBe(true);
    }
  });

  it('toda la Escritura que citan se entiende', () => {
    for (const v of VIRTUES) {
      for (const cita of v.scripture) expect(parsePassage(cita), `${v.id}: ${cita}`).not.toBeNull();
    }
  });

  it('los santos y los Padres que nombran tienen ficha', () => {
    const santos = new Set(SAINT_INDEX.map((s) => s.id));
    const padres = new Set(CHURCH_FATHERS.map((f) => f.id));
    for (const v of VIRTUES) {
      expect(v.saints.length, `${v.id} sin santos`).toBeGreaterThan(0);
      for (const s of v.saints) expect(santos.has(s.id), `${v.id}: ${s.id}`).toBe(true);
      for (const c of v.quotes) if (c.fatherId) expect(padres.has(c.fatherId), `${v.id}: ${c.fatherId}`).toBe(true);
    }
  });

  it('los temas de los dichos existen', () => {
    for (const v of VIRTUES) for (const t of v.themes) expect(APOPHTHEGM_THEMES[t], `${v.id}: ${t}`).toBeTruthy();
  });

  it('toda cita de un Padre dice de qué obra sale, y la casa del alma también', () => {
    for (const c of [...VIRTUES.flatMap((v) => v.quotes), ...CASA_DEL_ALMA]) {
      expect(c.who.length).toBeGreaterThan(3);
      expect(c.where.length, c.text).toBeGreaterThan(1);
    }
  });

  it('cada virtud tiene su griego y su línea para repetir, con procedencia', () => {
    for (const id of VIRTUES_IN_ORDER) {
      expect(VIRTUE_INFO[id].greek).toMatch(/[Ͱ-Ͽἀ-῿]/);
      expect(VIRTUE_INFO[id].petition.length, id).toBeGreaterThan(8);
      expect(VIRTUE_INFO[id].from.length, id).toBeGreaterThan(3);
    }
  });

  it('los grupos reparten todas las virtudes una sola vez', () => {
    expect(VIRTUE_GROUPS.flatMap((g) => g.virtues).length).toBe(VIRTUES.length);
  });
});

describe('el libro de oraciones', () => {
  it('ha crecido, y no por repetir', () => {
    expect(PRAYERS.length).toBeGreaterThan(300);
  });

  it('las traducciones nuevas de los Padres dicen de dónde se tradujeron', () => {
    const delRuso = PRAYERS.filter((p) => /versión rusa/.test(p.meta.source));
    expect(delRuso.length).toBeGreaterThanOrEqual(14);
    for (const p of delRuso) expect(p.meta.source, p.id).toMatch(/Traducción al español hecha para ATHOS/);
  });
});

describe('las pantallas', () => {
  it('la portada de Orar enseña las seis puertas y el oficio de ahora', async () => {
    montar('/orar');
    for (const grupo of MOMENT_GROUPS) await espera(new RegExp(grupo.question.replace(/[¿?]/g, '')));
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getAllByRole('link').some((a) => a.getAttribute('href') === '/orar/oraciones/seccion/virtudes')).toBe(true);
  });

  it('la puerta de las virtudes las enseña por grupos', async () => {
    montar('/orar/oraciones/seccion/virtudes');
    await espera(/Las tres que permanecen/);
    await espera(/La sabiduría/);
    await espera(/Señor y Soberano de mi vida/);
  });

  it('una virtud en el menú trae su línea, sus oraciones y el paso a la biblioteca', async () => {
    montar('/orar/oraciones/categoria/humildad');
    await espera(/Oh Dios, ten piedad de mí, pecador/);
    await espera(/Da humildad a mi corazón/);
    expect(screen.getAllByRole('link').some((a) => a.getAttribute('href') === '/biblioteca/virtudes/humildad')).toBe(true);
  });

  it('el buscador lleva primero al momento que se ha escrito', async () => {
    montar('/orar/oraciones/todas?q=humildad');
    await espera(/Para verse como se es delante de Dios/);
    expect(screen.getAllByRole('link').some((a) => a.getAttribute('href') === '/orar/oraciones/categoria/humildad')).toBe(true);
    await espera(/Da humildad a mi corazón/);
  });

  it('la biblioteca tiene la casa del alma y una ficha por virtud', async () => {
    montar('/biblioteca/virtudes');
    await espera(/La casa del alma/);
    const enlaces = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    for (const id of VIRTUES_IN_ORDER) expect(enlaces, id).toContain(`/biblioteca/virtudes/${id}`);
  });

  it('la ficha de una virtud enseña lo que dicen los Padres y lleva a sus oraciones', async () => {
    montar('/biblioteca/virtudes/mansedumbre');
    await espera(/Lo que dicen los Padres/);
    await espera(/una roca alzada sobre el mar/);
    expect(screen.getAllByRole('link').some((a) => a.getAttribute('href') === '/orar/oraciones/categoria/mansedumbre')).toBe(true);
  });
});
