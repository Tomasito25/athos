/**
 * Lo que necesita quien no ve la pantalla o no usa el ratón.
 *
 * En una aplicación de una sola página nada de esto ocurre solo: el navegador
 * no recarga, así que no anuncia nada, no cambia el título y no mueve el
 * foco. Hay que hacerlo a mano, y por eso hay que comprobarlo.
 */
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { initI18n } from '@/lib/i18n';
import es from '@/locales/es';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
  await initI18n('es');
});

// `document.title` es global y sobrevive a cada prueba: si no se limpia, una
// espera puede darse por cumplida con el título que dejó la anterior, y la
// comprobación pasa sin que se haya pintado nada.
beforeEach(() => {
  document.title = '';
});

const montar = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);

describe('el cambio de página se nota', () => {
  it('pone en el título de la pestaña el encabezado de la pantalla', async () => {
    montar('/calendario/santos');
    await waitFor(() => expect(document.title).toBe(`${es.saints.title} · ${es.app.name}`));
  });

  it('no repite el nombre de la aplicación cuando el encabezado ya lo lleva', async () => {
    montar('/');
    await waitFor(() => expect(document.title).toMatch(/ATHOS/));
    expect(document.title.match(/ATHOS/g)).toHaveLength(1);
  });

  it('anuncia la pantalla nueva en una región viva', async () => {
    const { container } = montar('/calendario/santos');
    await waitFor(() => {
      const aviso = container.querySelector('.sr-only[role="status"]');
      expect(aviso?.textContent).toBe(es.saints.title);
    });
  });

  it('lleva el foco al contenido al navegar, pero no al entrar', async () => {
    const usuario = userEvent.setup();
    const { container } = montar('/calendario');

    // El armazón no está en el documento hasta que el enrutador resuelve la
    // primera ruta, así que el `main` se busca después de esperarla: antes es
    // nulo, y comparar contra nulo daba una prueba que no comprobaba nada.
    await screen.findByRole('heading', { level: 1, name: es.calendar.title });
    const main = container.querySelector('#contenido');
    expect(main).not.toBeNull();

    // Al abrir la aplicación el foco no se toca: nadie ha navegado aún.
    expect(document.activeElement).not.toBe(main);

    const enlace = await screen.findByRole('link', { name: new RegExp(es.saints.title, 'i') });
    await usuario.click(enlace);

    // El margen es holgado a propósito: entre el clic y el foco hay que
    // descargar el código de la pantalla nueva, y con el tope de un segundo
    // que trae `waitFor` la prueba fallaba unas veces sí y otras no.
    await waitFor(() => expect(document.activeElement).toBe(main), { timeout: 4000 });
  });
});

describe('saltar al contenido', () => {
  it('es lo primero que alcanza el tabulador y lleva al contenido', async () => {
    const usuario = userEvent.setup();
    const { container } = montar('/calendario/santos');
    await screen.findByRole('heading', { level: 1, name: es.saints.title });

    await usuario.tab();
    const salto = screen.getByRole('link', { name: es.app.skipToContent });
    expect(document.activeElement).toBe(salto);

    await usuario.click(salto);
    expect(document.activeElement).toBe(container.querySelector('#contenido'));
  });
});
