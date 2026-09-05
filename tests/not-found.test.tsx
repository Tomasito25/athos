/**
 * Direcciones que no llevan a ninguna parte.
 *
 * Se llega a ellas más de lo que parece: un favorito viejo, un marcador de
 * otra versión, contenido que cambió de nombre, una dirección escrita a mano.
 * Lo que se exige aquí es que ninguna deje al usuario mirando una frase sin
 * un solo enlace, y que la salida diga a dónde va.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { initI18n } from '@/lib/i18n';
import { screenName } from '@/lib/screens';
import es from '@/locales/es';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
  await initI18n('es');
});

/** Una dirección rota por cada pantalla de ficha de la aplicación. */
const ROTAS: Array<[string, string]> = [
  ['/orar/oraciones/no-existe', '/orar/oraciones'],
  ['/orar/oraciones/categoria/no-existe', '/orar/oraciones'],
  ['/leer/biblia/no-existe', '/leer/biblia'],
  ['/leer/biblia/no-existe/3', '/leer/biblia'],
  ['/leer/salterio/999', '/leer/salterio'],
  ['/leer/salterio/kathisma/99', '/leer/salterio'],
  ['/leer/planes/no-existe', '/leer/planes'],
  ['/calendario/santos/no-existe', '/calendario/santos'],
  ['/biblioteca/padres/no-existe', '/biblioteca/padres'],
  ['/biblioteca/athos/monasterio/no-existe', '/biblioteca/athos'],
  ['/biblioteca/historia/no-existe', '/biblioteca/historia'],
  ['/biblioteca/catecismo/no-existe', '/biblioteca/catecismo'],
  ['/biblioteca/iconos/no-existe', '/biblioteca/iconos'],
  ['/biblioteca/estudio/no-existe', '/biblioteca/estudio'],
  ['/biblioteca/estudio/obra/no-existe', '/biblioteca/estudio'],
];

describe('una dirección rota siempre tiene salida', () => {
  it.each(ROTAS)('%s ofrece volver a %s', async (rota, destino) => {
    const router = createMemoryRouter(routes, { initialEntries: [rota] });
    const { container } = render(<RouterProvider router={router} />);

    // Margen holgado: la pantalla se carga bajo demanda, y con la suite
    // entera en marcha el segundo que trae `waitFor` por defecto se queda
    // corto unas veces sí y otras no.
    const salida = await waitFor(
      () => {
        const enlace = container.querySelector('.empty a');
        expect(enlace).not.toBeNull();
        return enlace!;
      },
      { timeout: 8000 },
    );

    expect(salida.getAttribute('href')).toBe(destino);
    // Y el rótulo nombra el destino, en vez de un «Volver» que no dice nada.
    expect(salida.textContent).toBe(es.app.goTo.replace('{{screen}}', screenName(destino)));
  });

  it('la pantalla de dirección desconocida también sale a alguna parte', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/esto-no-existe-de-nada'] });
    render(<RouterProvider router={router} />);
    await waitFor(() => expect(screen.getAllByRole('link').length).toBeGreaterThan(0), {
      timeout: 8000,
    });
  });
});

describe('las frases de destino', () => {
  it('llevan preposición y artículo, no un nombre suelto', () => {
    for (const [, destino] of ROTAS) {
      expect(screenName(destino)).toMatch(/^a(l| la| los| las)? /);
    }
  });

  it('suben hasta la primera pantalla con nombre', () => {
    expect(screenName('/leer/salterio/50')).toBe(es.screens['/leer/salterio']);
    expect(screenName('/una/ruta/inventada')).toBe(es.screens['/']);
  });
});
