/**
 * Un día de un plan, leído de corrido.
 *
 * El día entero está en una página; marcarlo lleva al siguiente; el plan que
 * se lleva sale en Inicio con lo que toca.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { currentPlan, planProgress } from '@/db/plans';
import { initI18n } from '@/lib/i18n';
import es from '@/locales/es';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
  await initI18n('es');
});

const montar = (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
};

describe('leer un día', () => {
  it('trae la kathisma con sus salmos, y al marcarla pasa al día siguiente', async () => {
    const user = userEvent.setup();
    const router = montar('/leer/planes/salterio-veinte-dias/dia/1');
    await screen.findByRole('heading', { level: 1, name: `${es.plans.day} 1` }, { timeout: 8000 });
    expect(screen.getAllByText(/Kathisma 1/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: es.plans.markDayDone.replace('{{n}}', '1') }));
    await waitFor(() => expect(router.state.location.pathname).toBe('/leer/planes/salterio-veinte-dias/dia/2'));
    const progreso = await planProgress('salterio-veinte-dias');
    expect(progreso?.completed).toEqual(['1']);
    expect(progreso?.startedAt).toBeTruthy();
  });

  it('el plan en curso dice qué toca hoy y sale en Inicio', async () => {
    const actual = await currentPlan();
    expect(actual?.plan.id).toBe('salterio-veinte-dias');
    expect(actual?.day.number).toBe(2);
    montar('/');
    await screen.findByText(es.plans.planToday, undefined, { timeout: 8000 });
    expect(screen.getAllByText(/Kathisma 2/).length).toBeGreaterThan(0);
  });

  it('un día que no existe lo dice', async () => {
    montar('/leer/planes/evangelios/dia/999');
    await screen.findByText(es.plans.dayMissing, undefined, { timeout: 8000 });
  });
});
