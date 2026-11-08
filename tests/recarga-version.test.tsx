/**
 * Una actualización hecha en otra ventana no deja esta rota.
 *
 * Si otra ventana aplica la versión nueva, el Service Worker nuevo borra los
 * archivos de la vieja; la ventana que seguía abierta pide una pantalla que ya
 * no existe y salía «Algo ha salido mal». Nada recogía ese error.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ErrorPage } from '@/features/error/ErrorPage';
import { isChunkLoadError } from '@/lib/chunk-reload';
import es from '@/locales/es';

const CLAVE = 'athos.chunk-reload';

const montar = (error: Error) =>
  render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: '/',
            errorElement: <ErrorPage />,
            lazy: async () => {
              throw error;
            },
          },
        ],
        { initialEntries: ['/'] },
      )}
    />,
  );

beforeEach(() => {
  sessionStorage.clear();
  // jsdom no navega: avisa por consola de que no sabe recargar, y basta.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('trozos que ya no existen', () => {
  it('se reconocen los mensajes de los navegadores', () => {
    for (const mensaje of [
      'Failed to fetch dynamically imported module: https://x/assets/PrayHub-abc.js', // Chrome
      'error loading dynamically imported module', // Firefox
      'Importing a module script failed.', // Safari
      'Unable to preload CSS for /assets/hubs-abc.css', // Vite
    ]) {
      expect(isChunkLoadError(new TypeError(mensaje)), mensaje).toBe(true);
    }
    expect(isChunkLoadError(new Error('No se ha podido cargar JHN (404)'))).toBe(false);
  });

  it('la pantalla de error recarga sola en vez de quedarse en «Algo ha salido mal»', async () => {
    montar(new TypeError('Failed to fetch dynamically imported module: /assets/PrayHub-viejo.js'));
    expect(await screen.findByText(es.app.staleChunkReloading)).toBeInTheDocument();
    expect(screen.queryByText(es.app.error)).toBeNull();
    await waitFor(() => expect(Number(sessionStorage.getItem(CLAVE))).toBeGreaterThan(0));
  });

  it('si ya recargó hace un momento, no entra en bucle: lo explica', async () => {
    sessionStorage.setItem(CLAVE, String(Date.now()));
    montar(new TypeError('Failed to fetch dynamically imported module: /assets/PrayHub-viejo.js'));
    expect(await screen.findByText(es.app.staleChunkFailed)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: es.app.retry })).toBeInTheDocument();
  });

  it('otros errores se enseñan como siempre', async () => {
    montar(new Error('otra cosa'));
    expect(await screen.findByText(es.app.error)).toBeInTheDocument();
    expect(sessionStorage.getItem(CLAVE)).toBeNull();
  });
});
