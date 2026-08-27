/**
 * El ofrecimiento de instalación.
 *
 * Lo que se comprueba aquí es lo que el usuario ve y toca: que aparece solo y
 * pronto, y que al pulsar «Instalar» se llama al diálogo del navegador —no a
 * una imitación—. El diálogo nativo no se puede abrir sin un gesto del
 * usuario, así que este botón es imprescindible: no es un adorno.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { initI18n } from '@/lib/i18n';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';

/** Un `beforeinstallprompt` de mentira, con la misma forma que el de verdad. */
function eventoFalso() {
  const prompt = vi.fn(async () => undefined);
  const evento = Object.assign(new Event('beforeinstallprompt'), {
    prompt,
    userChoice: Promise.resolve({ outcome: 'accepted' as const, platform: 'web' }),
  });
  return { evento, prompt };
}

beforeEach(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
  await initI18n('es');
  useSettings.getState().set('installPromptDismissed', false);
  useUi.setState({ installEvent: null });
  delete (window as { __athosInstall?: unknown }).__athosInstall;
});

const montar = () =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/'] })} />);

describe('el ofrecimiento aparece solo', () => {
  it('sale sin que el usuario toque nada, y pronto', async () => {
    // Antes esperaba doce segundos, que era como no ofrecerlo nunca.
    const { evento } = eventoFalso();
    (window as { __athosInstall?: unknown }).__athosInstall = evento;
    montar();
    await waitFor(() => expect(screen.getByText(/Instala ATHOS en este dispositivo/i)).toBeTruthy(), {
      timeout: 4000,
    });
  });

  it('dice qué gana quien la instala', async () => {
    const { evento } = eventoFalso();
    (window as { __athosInstall?: unknown }).__athosInstall = evento;
    montar();
    await waitFor(() => expect(screen.getByText(/sin conexión/i)).toBeTruthy(), { timeout: 4000 });
  });

  it('no insiste si ya se ha rechazado', async () => {
    useSettings.getState().set('installPromptDismissed', true);
    const { evento } = eventoFalso();
    (window as { __athosInstall?: unknown }).__athosInstall = evento;
    montar();
    await new Promise((r) => setTimeout(r, 2200));
    expect(screen.queryByText(/Instala ATHOS en este dispositivo/i)).toBeNull();
  });

  it('no aparece si el navegador no ofrece instalar', async () => {
    montar();
    await new Promise((r) => setTimeout(r, 2200));
    expect(screen.queryByText(/Instala ATHOS en este dispositivo/i)).toBeNull();
  });
});

describe('el botón abre el diálogo del navegador', () => {
  it('llama a prompt() del evento nativo, no a un sustituto', async () => {
    const user = userEvent.setup();
    const { evento, prompt } = eventoFalso();
    (window as { __athosInstall?: unknown }).__athosInstall = evento;
    montar();

    const boton = await screen.findByRole('button', { name: /^Instalar ATHOS$/i }, { timeout: 4000 });
    await user.click(boton);

    expect(prompt, 'no se llamó al diálogo del navegador').toHaveBeenCalledTimes(1);
  });

  it('se retira al pulsarlo, para no asomar tras el diálogo', async () => {
    const user = userEvent.setup();
    const { evento } = eventoFalso();
    (window as { __athosInstall?: unknown }).__athosInstall = evento;
    montar();

    const boton = await screen.findByRole('button', { name: /^Instalar ATHOS$/i }, { timeout: 4000 });
    await user.click(boton);

    await waitFor(() =>
      expect(screen.queryByText(/Instala ATHOS en este dispositivo/i)).toBeNull(),
    );
  });

  it('«Ahora no» lo cierra y no vuelve', async () => {
    const user = userEvent.setup();
    const { evento } = eventoFalso();
    (window as { __athosInstall?: unknown }).__athosInstall = evento;
    montar();

    const no = await screen.findByRole('button', { name: /Ahora no/i }, { timeout: 4000 });
    await user.click(no);

    await waitFor(() =>
      expect(screen.queryByText(/Instala ATHOS en este dispositivo/i)).toBeNull(),
    );
    expect(useSettings.getState().installPromptDismissed).toBe(true);
  });
});
