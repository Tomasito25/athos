/**
 * Las portadas renovadas.
 *
 * Inicio dice qué día es y cómo va cada oficio; las portadas de sección
 * llevan su cabecera y sus teselas; la bienvenida se cierra y no vuelve.
 */
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { initI18n } from '@/lib/i18n';
import { useSettings } from '@/stores/settings';
import { nextGreatFeast } from '@/lib/calendar/next-feast';
import { LIBRARY_GROUPS } from '@/content/library';
import { APP_MAP } from '@/components/layout/navigation';
import { DAILY_OFFICES } from '@/content/hours';
import es from '@/locales/es';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
  await initI18n('es');
});

beforeEach(() => {
  useSettings.getState().set('welcomeDismissed', false);
});

const montar = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);

const espera = (texto: RegExp) =>
  waitFor(() => expect(screen.getAllByText(texto).length).toBeGreaterThan(0), { timeout: 8000 });

describe('la próxima gran fiesta', () => {
  it('antes de Navidad es Navidad, con los días que faltan', () => {
    const f = nextGreatFeast('2026-12-20', 'nuevo');
    expect(f?.date).toBe('2026-12-25');
    expect(f?.days).toBe(5);
    expect(f?.name).toMatch(/Natividad/);
  });

  it('el día después de Navidad, la Teofanía', () => {
    expect(nextGreatFeast('2026-12-25', 'nuevo')?.date).toBe('2027-01-06');
  });

  it('no cuenta el día de hoy: empieza mañana', () => {
    expect(nextGreatFeast('2026-12-24', 'nuevo')?.days).toBe(1);
  });
});

describe('Inicio', () => {
  it('dice qué celebra hoy la Iglesia y cuándo es la próxima gran fiesta', async () => {
    montar('/');
    await espera(new RegExp(es.home.today, 'i'));
    expect(screen.getAllByText(new RegExp(es.home.nextFeast, 'i')).length).toBeGreaterThan(0);
  });

  it('enseña cada uno de los tres oficios, y no una suma de pasos', async () => {
    montar('/');
    for (const oficio of DAILY_OFFICES) {
      await espera(new RegExp(oficio.name, 'i'));
    }
    expect(screen.queryByText(/\d+ de \d+$/)).toBeNull();
  });

  it('la bienvenida se cierra y queda cerrada', async () => {
    const user = userEvent.setup();
    montar('/');
    await espera(new RegExp(es.welcome.title, 'i'));
    await user.click(screen.getByRole('button', { name: es.welcome.ok }));
    await waitFor(() => expect(screen.queryByText(es.welcome.title)).toBeNull());
    expect(useSettings.getState().welcomeDismissed).toBe(true);
  });

  it('restablecer el aspecto no la vuelve a enseñar', () => {
    useSettings.getState().set('welcomeDismissed', true);
    useSettings.getState().reset();
    expect(useSettings.getState().welcomeDismissed).toBe(true);
  });
});

describe('las portadas de sección', () => {
  it.each([
    ['/orar', es.nav.pray],
    ['/leer', es.nav.read],
    ['/calendario', es.calendar.title],
    ['/biblioteca', es.library.title],
    ['/mas', es.nav.more],
  ])('%s abre con su cabecera', async (ruta, titulo) => {
    const { container } = montar(ruta);
    await waitFor(() => expect(container.querySelector('.hub-hero h1')?.textContent).toBe(titulo), {
      timeout: 8000,
    });
  });

  it('el calendario tiene arriba los atajos que antes iban al pie', async () => {
    const { container } = montar('/calendario');
    await waitFor(() => expect(container.querySelector('.shortcut-row')).not.toBeNull(), { timeout: 8000 });
    const destinos = [...container.querySelectorAll('.shortcut-row a')].map((a) => a.getAttribute('href'));
    expect(destinos).toEqual(
      expect.arrayContaining(['/calendario/santos', '/calendario/fiestas', '/calendario/ayuno']),
    );
  });
});

describe('los signos', () => {
  it('dentro de cada grupo de la biblioteca no se repite ninguno', () => {
    for (const grupo of LIBRARY_GROUPS) {
      const iconos = grupo.sections.map((s) => s.icon);
      expect(new Set(iconos).size, `${grupo.title}: ${iconos.join(', ')}`).toBe(iconos.length);
    }
  });

  it('cada entrada del mapa lleva el suyo', () => {
    for (const grupo of APP_MAP) for (const e of grupo.entries) expect(e.icon, e.to).toBeTruthy();
  });
});
