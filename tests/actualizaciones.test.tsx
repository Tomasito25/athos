/**
 * Las actualizaciones.
 *
 * El aviso de versión nueva sale cuando la hay, no sale mientras se reza y se
 * puede dejar para luego; las novedades se enseñan a quien ya usaba ATHOS y no
 * a quien la abre por primera vez; y el registro de cambios entra entero en
 * la pantalla de novedades, con sus apartados.
 */
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { markNewsSeen, pendingNews, useUpdate } from '@/stores/update';
import { resolve } from 'node:path';
import { recentChangelog } from '../scripts/changelog';
import es from '@/locales/es';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
});

beforeEach(() => {
  useUpdate.setState({ status: 'available', postponed: false });
  localStorage.removeItem('athos.version.seen');
});

const montar = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);

describe('el aviso de versión nueva', () => {
  it('sale con sus dos botones, y «Más tarde» lo quita', async () => {
    const user = userEvent.setup();
    montar('/orar');
    const boton = await screen.findByRole('button', { name: es.app.updateLater }, { timeout: 8000 });
    expect(screen.getByRole('button', { name: es.app.updateNow })).toBeTruthy();
    await user.click(boton);
    await waitFor(() => expect(screen.queryByText(es.app.updateAvailable)).toBeNull());
  });

  it('no sale mientras se reza un oficio', async () => {
    montar('/orar/oficio/manana');
    await screen.findAllByText(/Oficio de la mañana/, undefined, { timeout: 8000 });
    expect(screen.queryByText(es.app.updateAvailable)).toBeNull();
  });
});

describe('las novedades', () => {
  it('no se enseñan la primera vez que se abre ATHOS', () => {
    expect(pendingNews('9.9.9', false)).toBe(false);
    // Y queda apuntada la versión, para no enseñarlas al volver.
    expect(pendingNews('9.9.9', false)).toBe(false);
  });

  it('sí a quien ya la usaba, y una sola vez', () => {
    expect(pendingNews('9.9.9', true)).toBe(true);
    markNewsSeen('9.9.9');
    expect(pendingNews('9.9.9', true)).toBe(false);
    expect(pendingNews('9.9.10', true)).toBe(true);
  });

  it('el registro de cambios trae las últimas versiones con sus apartados', () => {
    const entradas = recentChangelog(resolve(process.cwd(), 'CHANGELOG.md'), 3);
    expect(entradas).toHaveLength(3);
    expect(entradas[0]!.sections.length).toBeGreaterThan(0);
    expect(entradas[0]!.sections[0]!.items.length).toBeGreaterThan(0);
    // Los subpuntos se unen al punto del que cuelgan: no hay puntos vacíos.
    for (const e of entradas) for (const s of e.sections) for (const i of s.items) expect(i.trim()).not.toBe('');
    // Y es lo mismo que la aplicación lleva dentro.
    expect(__CHANGELOG__[0]?.version).toBe(entradas[0]!.version);
  });

  it('la pantalla de novedades enseña la versión instalada y el botón de buscar', async () => {
    useUpdate.setState({ status: 'current' });
    montar('/configuracion/novedades');
    await screen.findByRole('heading', { level: 1, name: es.settings.news }, { timeout: 8000 });
    expect(screen.getByRole('button', { name: es.settings.checkUpdates })).toBeTruthy();
    expect(screen.getByText(es.settings.updateCurrent)).toBeTruthy();
  });
});
