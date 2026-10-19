/**
 * El templo, las formas de rezar, las metanoias y los itinerarios nuevos.
 *
 * Las postraciones se dejan cuando la Iglesia las deja; cada parte de los
 * dibujos del templo tiene su explicación; y ningún enlace de estas páginas ni
 * de los itinerarios lleva a una pantalla que no existe.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter, matchRoutes } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { prostrationsToday } from '@/lib/calendar/prostrations';
import { STUDY_COURSES, STUDY_WORKS } from '@/content/study';
import { PRAYER_WAYS } from '@/content/prayer-ways';
import { TEMPLE_PARTS } from '@/content/temple';
import { ChurchPlan } from '@/features/library/temple/ChurchPlan';
import { Iconostasis } from '@/features/library/temple/Iconostasis';
import es from '@/locales/es';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
});

const dia = (iso: string) => computeLiturgicalDay(iso, 'nuevo');

describe('las grandes postraciones', () => {
  it('no se hacen el domingo, ni de Pascua a Pentecostés, ni en Navidad', () => {
    expect(prostrationsToday(dia('2026-10-18')).great).toBe(false);
    expect(prostrationsToday(dia('2027-05-20')).great).toBe(false);
    expect(prostrationsToday(dia('2026-12-28')).great).toBe(false);
    expect(prostrationsToday(dia('2026-10-18')).reason).toMatch(/Nicea/);
  });

  it('sí un martes cualquiera, y en Cuaresma con la oración de san Efrén', () => {
    expect(prostrationsToday(dia('2026-10-20')).great).toBe(true);
    // La Cuaresma de 2027 empieza el 15 de marzo; el miércoles 17 es de diario.
    const cuaresma = prostrationsToday(dia('2027-03-17'));
    expect(cuaresma.great).toBe(true);
    expect(cuaresma.lent).toBe(true);
  });
});

describe('los enlaces', () => {
  const existe = (path: string) => {
    const ruta = path.split('#')[0]!.split('?')[0]!;
    const m = matchRoutes(routes, ruta);
    return !!m && m[m.length - 1]!.route.path !== '*';
  };

  it('los de los itinerarios llevan a pantallas que existen', () => {
    for (const curso of STUDY_COURSES) {
      for (const leccion of curso.lessons) {
        for (const l of leccion.readings ?? []) expect(existe(l.path), `${curso.id}/${leccion.id}: ${l.path}`).toBe(true);
      }
    }
    for (const obra of STUDY_WORKS) if (obra.path) expect(existe(obra.path), obra.id).toBe(true);
  });

  it('los de las formas de rezar, también', () => {
    for (const w of PRAYER_WAYS) for (const l of w.links) expect(existe(l.to), `${w.id}: ${l.to}`).toBe(true);
  });

  it('los anclajes del templo apuntan a partes que existen', () => {
    const ids = new Set(TEMPLE_PARTS.map((p) => p.id));
    for (const curso of STUDY_COURSES) {
      for (const leccion of curso.lessons) {
        for (const l of leccion.readings ?? []) {
          const [ruta, ancla] = l.path.split('#');
          if (ruta === '/biblioteca/templo' && ancla) expect(ids.has(ancla), ancla).toBe(true);
        }
      }
    }
  });

  it('los itinerarios nuevos están, con sus lecciones', () => {
    for (const id of ['el-templo', 'formas-de-rezar', 'misterios', 'ano-liturgico', 'theotokos-santos', 'muerte-esperanza']) {
      expect(STUDY_COURSES.find((c) => c.id === id)?.lessons.length, id).toBeGreaterThan(3);
    }
  });
});

describe('los dibujos del templo', () => {
  it('cada parte que se puede tocar tiene su explicación', () => {
    const { container } = render(
      <svg>
        <ChurchPlan selected="" onSelect={() => {}} />
        <Iconostasis selected="" onSelect={() => {}} />
      </svg>,
    );
    const zonas = [...container.querySelectorAll('[role="button"]')];
    expect(zonas.length).toBeGreaterThan(20);
    for (const z of zonas) expect(z.getAttribute('aria-label'), z.outerHTML.slice(0, 60)).toMatch(/: /);
  });

  it('al tocar una parte, se lee qué es', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/biblioteca/templo'] })} />);
    const ambon = await screen.findAllByRole('button', { name: /^El ambón:/ }, { timeout: 8000 });
    await user.click(ambon[0]!);
    await waitFor(() => expect(screen.getByRole('heading', { level: 2, name: 'El ambón' })).toBeTruthy());
  });
});

describe('las pantallas', () => {
  it('las metanoias dicen si hoy hay postraciones y cuentan', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/orar/metanoias'] })} />);
    await screen.findByRole('heading', { level: 1, name: es.metanoia.title }, { timeout: 8000 });
    const boton = screen.getByRole('button', { name: /Contar una metanoia/ });
    await user.click(boton);
    await user.click(boton);
    expect(screen.getByRole('button', { name: /Llevas 2 de 12/ })).toBeTruthy();
  });

  it('las formas de rezar tienen su índice', async () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/orar/formas'] })} />);
    await screen.findByRole('heading', { level: 1, name: es.ways.title }, { timeout: 8000 });
    expect(screen.getByRole('navigation', { name: es.ways.index })).toBeTruthy();
  });
});
