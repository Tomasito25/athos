/**
 * Sin conexión, el icono grande no sale como imagen rota.
 *
 * La imagen grande no va en el precaché: se guarda al abrirla por primera
 * vez. La miniatura sí está guardada desde la instalación, pero no se usaba
 * en su lugar.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { IconPlate } from '@/features/icons/IconPlate';

describe('placa de icono', () => {
  it('si la imagen grande falla, pone la miniatura', () => {
    render(
      <IconPlate name="Trinidad" image="content/icons/trinidad-rublev.webp" fallback="content/icons/trinidad-rublev-mini.webp" />,
    );
    const grande = screen.getByRole('img', { name: 'Trinidad' });
    expect(grande.getAttribute('src')).toMatch(/trinidad-rublev\.webp/);

    fireEvent.error(grande);

    const mini = screen.getByRole('img', { name: 'Trinidad' });
    expect(mini.getAttribute('src')).toMatch(/trinidad-rublev-mini\.webp/);
  });

  it('si fallan las dos, la placa lo dice en vez de enseñar una imagen rota', () => {
    render(<IconPlate name="Trinidad" image="content/icons/a.webp" fallback="content/icons/a-mini.webp" />);
    fireEvent.error(screen.getByRole('img', { name: 'Trinidad' }));
    fireEvent.error(screen.getByRole('img', { name: 'Trinidad' }));
    expect(screen.getByRole('img', { name: /no disponible sin conexión/ })).toBeInTheDocument();
    expect(document.querySelector('img')).toBeNull();
  });

  it('la imagen se pide con la huella de la carpeta', () => {
    render(<IconPlate name="Trinidad" image="content/icons/trinidad-rublev.webp" />);
    expect(screen.getByRole('img', { name: 'Trinidad' }).getAttribute('src')).toMatch(/\?v=[0-9a-f]{10}$/);
  });
});
