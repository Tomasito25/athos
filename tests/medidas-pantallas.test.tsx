/**
 * Las medidas en pantalla.
 *
 * Elegir la breve cambia de verdad los pasos del oficio, y rezarla deja el
 * oficio rezado con su medida apuntada; en Orar se elige para los tres de
 * una vez; la semana cuenta lo rezado; y el editor ya deja elegir qué oficio,
 * akathistos o canon se enlaza, y su texto entra en el oficio.
 */
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { completeRule, completionsOn, officeWeek, ruleForTime, uncompleteRule } from '@/db/user';
import { resolveItems } from '@/features/office/useOfficeSteps';
import { toIsoDate } from '@/lib/calendar/jdn';
import { useSettings } from '@/stores/settings';
import type { RuleItem } from '@/types';
import es from '@/locales/es';

const HOY = toIsoDate(new Date());

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
});

beforeEach(async () => {
  useSettings.getState().set('officeLength', { manana: 'habitual', mediodia: 'habitual', noche: 'habitual' });
  useSettings.getState().set('officeFlow', 'seguido');
  for (const time of ['manana', 'mediodia', 'noche'] as const) {
    const regla = await ruleForTime(time);
    if (regla) await uncompleteRule(HOY, regla.id);
  }
});

const montar = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);

const espera = (texto: RegExp) =>
  waitFor(() => expect(screen.getAllByText(texto).length).toBeGreaterThan(0), { timeout: 8000 });

describe('dentro del oficio', () => {
  it('la breve trae la regla de san Serafín y no las oraciones largas, y queda rezada con su medida', async () => {
    useSettings.getState().set('officeLength', { manana: 'breve', mediodia: 'habitual', noche: 'habitual' });
    const user = userEvent.setup();
    montar('/orar/oficio/manana');

    await espera(/Theotokos Virgen, alégrate/);
    expect(screen.queryByText(/Oración de san Macario/)).toBeNull();
    expect(screen.getAllByText(/san Serafín de Sarov/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: es.office.finish }));
    await waitFor(async () => {
      const marcas = await completionsOn(HOY);
      expect(marcas.some((m) => m.ruleId === 'oficio-manana' && m.length === 'breve')).toBe(true);
    });
    await espera(new RegExp(es.office.prayedToday));
  });

  it('cambiar a la extensa la guarda para ese oficio y enseña la Hora Primera', async () => {
    const user = userEvent.setup();
    montar('/orar/oficio/manana');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Extenso' })).toBeTruthy(), { timeout: 8000 });

    await user.click(screen.getByRole('button', { name: 'Extenso' }));
    expect(useSettings.getState().officeLength.manana).toBe('extenso');
    expect(useSettings.getState().officeLength.noche).toBe('habitual');
    await espera(/Hora Primera/);
    // La extensa no se edita: se ofrece copiarla al habitual.
    expect(screen.getByRole('button', { name: es.office.makeMine })).toBeTruthy();
  });
});

describe('en Orar', () => {
  it('la medida se elige para los tres oficios de una vez', async () => {
    const user = userEvent.setup();
    montar('/orar');
    const breve = await screen.findByRole('radio', { name: /^Breve/ }, { timeout: 8000 });
    await user.click(breve);
    expect(useSettings.getState().officeLength).toEqual({ manana: 'breve', mediodia: 'breve', noche: 'breve' });
    await waitFor(() => expect(screen.getByRole('radio', { name: /^Breve/ }).getAttribute('aria-checked')).toBe('true'));
  });

  it('la semana dice qué se rezó y con qué medida', async () => {
    const regla = await ruleForTime('noche');
    await completeRule(HOY, regla!.id, 'extenso');
    const semana = await officeWeek(HOY);
    expect(semana).toHaveLength(7);
    expect(semana[6].date).toBe(HOY);
    expect(semana[6].prayed.get('noche')).toBe('extenso');
    expect(semana[6].prayed.has('mediodia')).toBe(false);
  });

  it('restablecer el aspecto no toca la medida de los oficios', () => {
    useSettings.getState().set('officeLength', { manana: 'breve', mediodia: 'extenso', noche: 'breve' });
    useSettings.getState().reset();
    expect(useSettings.getState().officeLength.mediodia).toBe('extenso');
  });
});

describe('enlazar desde el editor', () => {
  const paso = (patch: Partial<RuleItem>): RuleItem => ({ id: 'x', ruleId: 'r', order: 1, title: 'Paso', ...patch });

  it('un oficio, un akathistos o un canon enlazados traen su texto, y no «sin texto»', async () => {
    const akathistos = (await db.akathists.toArray())[0];
    const canon = (await db.canons.toArray())[0];
    const pasos = await resolveItems([
      paso({ linkKind: 'office', linkId: 'hora-sexta' }),
      paso({ linkKind: 'akathist', linkId: akathistos.id }),
      paso({ linkKind: 'canon', linkId: canon.id }),
    ]);
    for (const p of pasos) {
      expect(p.blocks.some((b) => b.kind === 'pending'), p.item.linkKind).toBe(false);
      expect(p.path, p.item.linkKind).toBeTruthy();
    }
  });

  it('de un oficio entran sólo las secciones pedidas', async () => {
    const [p] = await resolveItems([paso({ linkKind: 'office', linkId: 'completas', sections: ['salmos'] })]);
    const titulos = p.blocks.filter((b) => b.kind === 'heading').map((b) => b.content);
    expect(titulos).toEqual(['Los tres salmos']);
  });
});
