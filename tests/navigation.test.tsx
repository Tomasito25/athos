/**
 * Navegación.
 *
 * Se monta el enrutador real en memoria y se comprueba que cada sección
 * principal se carga, se pinta y responde a la navegación, sin depender de
 * un navegador.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '@/routes/router';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { initI18n } from '@/lib/i18n';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
  await initI18n('es');
});

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

const findHeading = (text: RegExp) =>
  waitFor(() => expect(screen.getAllByText(text).length).toBeGreaterThan(0), { timeout: 5000 });

describe('secciones principales', () => {
  it('el inicio muestra la oración de Jesús y el día', async () => {
    renderAt('/');
    await findHeading(/ten misericordia de mí/i);
    expect(screen.getAllByText(/Pascua:/i).length).toBeGreaterThan(0);
  });

  it('Orar reúne oraciones, regla y contadores', async () => {
    renderAt('/orar');
    await findHeading(/Regla de oración/i);
    expect(screen.getAllByText(/Chotki/i).length).toBeGreaterThan(0);
  });

  it('las oraciones se abren por el menú de momentos', async () => {
    renderAt('/orar/oraciones');
    await findHeading(/El día/i);
    // Los momentos se nombran por lo que le pasa a quien los busca.
    expect(screen.getAllByText(/Al despertar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Al caer en el pecado/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Antes de comer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Después de comer/i).length).toBeGreaterThan(0);
  });

  it('un momento lleva a sus oraciones', async () => {
    renderAt('/orar/oraciones/categoria/al-pecar');
    await findHeading(/Al caer en el pecado/i);
    // El título del momento es estático; la lista llega de IndexedDB.
    await findHeading(/Troparios de compunción/i);
  });

  it('una oración concreta muestra su texto y su procedencia', async () => {
    renderAt('/orar/oraciones/efren-sirio');
    await findHeading(/Señor y Soberano de mi vida/i);
    expect(screen.getAllByText(/San Efrén el Sirio/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Licencia/i).length).toBeGreaterThan(0);
  });

  it('Leer da acceso a la Escritura y al Salterio', async () => {
    renderAt('/leer');
    await findHeading(/Biblia/i);
    expect(screen.getAllByText(/Salterio/i).length).toBeGreaterThan(0);
  });

  it('el índice bíblico separa los testamentos', async () => {
    renderAt('/leer/biblia');
    await findHeading(/Antiguo Testamento/i);
    expect(screen.getAllByText(/Nuevo Testamento/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Evangelio según San Juan/i).length).toBeGreaterThan(0);
  });

  it('el calendario pinta la rejilla del mes', async () => {
    renderAt('/calendario');
    await waitFor(() => expect(screen.getAllByRole('gridcell').length).toBeGreaterThan(27));
  });

  it('la biblioteca ofrece sus seis secciones', async () => {
    renderAt('/biblioteca');
    await findHeading(/Divina Liturgia/i);
    for (const label of [/Akathistos/i, /Cánones/i, /Padres de la Iglesia/i, /Monte Athos/i, /Iconografía/i]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it('el Monte Athos muestra los veinte monasterios', async () => {
    renderAt('/biblioteca/athos');
    await findHeading(/Gran Laura/i);
    expect(screen.getAllByText(/Simonopetra/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/San Panteleimón/i).length).toBeGreaterThan(0);
  });

  it('el ayuno muestra el aviso obligatorio', async () => {
    renderAt('/calendario/ayuno');
    await findHeading(/consulta con tu sacerdote/i);
  });

  it('la ficha de un santo incluye su vida', async () => {
    renderAt('/calendario/santos/juan-crisostomo');
    await findHeading(/Boca de oro/i);
  });

  it('la configuración permite cambiar el tema', async () => {
    renderAt('/configuracion');
    await findHeading(/Aspecto/i);
    expect(screen.getAllByText(/Calendario nuevo|juliano revisado/i).length).toBeGreaterThan(0);
  });

  it('la pantalla de fuentes resume el estado del corpus', async () => {
    renderAt('/configuracion/fuentes');
    await findHeading(/Reina-Valera 1909/i);
    expect(screen.getAllByText(/pendientes|parciales|completos/i).length).toBeGreaterThan(0);
  });

  it('una ruta inexistente muestra la página de error', async () => {
    renderAt('/esto-no-existe');
    await findHeading(/Esta página no existe/i);
  });
});

describe('armazón', () => {
  it('la barra inferior lleva a las cinco secciones', async () => {
    renderAt('/');
    await findHeading(/ten misericordia de mí/i);
    const nav = screen.getAllByRole('navigation', { name: /Navegación principal/i })[0];
    const enlaces = nav.querySelectorAll('a');
    expect(enlaces.length).toBe(5);
    expect([...enlaces].map((a) => a.getAttribute('href'))).toEqual([
      '/',
      '/orar',
      '/leer',
      '/calendario',
      '/biblioteca',
    ]);
  });

  it('hay un enlace para saltar al contenido', async () => {
    renderAt('/');
    await findHeading(/ten misericordia de mí/i);
    expect(document.querySelector('#contenido')).toBeTruthy();
  });

  it('se puede navegar de Orar a la regla', async () => {
    const user = userEvent.setup();
    renderAt('/orar');
    await findHeading(/Regla de oración/i);
    const enlace = screen
      .getAllByRole('link')
      .find((el) => el.getAttribute('href') === '/orar/regla');
    expect(enlace).toBeTruthy();
    await user.click(enlace!);
    await findHeading(/Días normales/i);
  });
});

describe('modo oración', () => {
  it('se activa y desactiva desde el lector', async () => {
    const user = userEvent.setup();
    renderAt('/orar/oraciones/efren-sirio');
    await findHeading(/Señor y Soberano de mi vida/i);

    await user.click(screen.getAllByText(/^Modo oración$/i)[0]);
    await waitFor(() => expect(document.documentElement.dataset.prayerMode).toBe('on'));

    await user.click(screen.getAllByText(/Salir del modo oración/i)[0]);
    await waitFor(() => expect(document.documentElement.dataset.prayerMode).toBeUndefined());
  });
});

/* ============================================================
   Un encabezado por pantalla
   ------------------------------------------------------------
   Toda página necesita un h1: es por donde entra quien navega
   con lector de pantalla. Faltaba en la portada —que enseña la
   oración de Jesús y ningún título— y en las diecisiete
   pantallas de «esto no existe», que ocupan la página entera.
   ============================================================ */
const PANTALLAS = [
  '/',
  '/orar',
  '/orar/oraciones',
  '/orar/oraciones/todas',
  '/orar/oraciones/categoria/manana',
  '/orar/oraciones/efren-sirio',
  '/orar/mis-oraciones',
  '/orar/regla',
  '/orar/oracion-de-jesus',
  '/orar/komboskini',
  '/leer',
  '/leer/biblia',
  '/leer/salterio',
  '/leer/salterio/50',
  '/leer/lecturas',
  '/calendario',
  '/calendario/santos',
  '/calendario/ayuno',
  '/calendario/fiestas',
  '/biblioteca',
  '/biblioteca/estudio',
  '/biblioteca/iconos',
  '/biblioteca/padres',
  '/favoritos',
  '/buscar',
  '/mas',
  '/configuracion',
  '/configuracion/instalar',
  '/configuracion/fuentes',
  '/configuracion/acerca-de',
];

/** Direcciones que no llevan a ninguna parte: también son una pantalla. */
const INEXISTENTES = [
  '/calendario/santos/no-existe',
  '/orar/oraciones/no-existe',
  '/orar/oraciones/categoria/no-existe',
  '/leer/salterio/999',
  '/leer/biblia/NADA',
  '/biblioteca/estudio/no-existe',
  '/biblioteca/estudio/obra/no-existe',
  '/biblioteca/padres/no-existe',
  '/biblioteca/iconos/no-existe',
  '/biblioteca/athos/monasterio/no-existe',
  '/ruta/que/no/existe',
];

describe('cada pantalla tiene un encabezado', () => {
  it.each(PANTALLAS)('%s', async (ruta) => {
    const { unmount } = renderAt(ruta);
    await waitFor(() => expect(document.querySelectorAll('h1').length).toBeGreaterThan(0), {
      timeout: 5000,
    });
    // Ni ninguno ni dos: exactamente uno.
    expect(document.querySelectorAll('h1').length, ruta).toBe(1);
    unmount();
  });

  it.each(INEXISTENTES)('%s dice que no existe, con encabezado', async (ruta) => {
    const { unmount } = renderAt(ruta);
    await waitFor(() => expect(document.querySelectorAll('h1').length).toBeGreaterThan(0), {
      timeout: 5000,
    });
    expect(document.querySelectorAll('h1').length, ruta).toBe(1);
    // Y lo dice con palabras, no con una pantalla en blanco.
    expect(document.body.textContent?.length ?? 0, ruta).toBeGreaterThan(20);
    unmount();
  });
});
