/**
 * Una parte que se puede tocar en un dibujo del templo.
 *
 * Es un grupo SVG con papel de botón: se elige con el ratón, con el dedo o
 * con el teclado (Intro o espacio), y dice su nombre al lector de pantalla.
 */
import type { KeyboardEvent, ReactNode } from 'react';
import { templePart } from '@/content/temple';

export function Zone({
  id,
  selected,
  onSelect,
  children,
}: {
  id: string;
  selected: string;
  onSelect: (id: string) => void;
  children: ReactNode;
}) {
  const parte = templePart(id);
  const elegir = () => onSelect(id);
  const tecla = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      elegir();
    }
  };
  return (
    <g
      className={`temple-zone${selected === id ? ' temple-zone--on' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={selected === id}
      aria-label={parte ? `${parte.name}: ${parte.short}` : id}
      onClick={elegir}
      onKeyDown={tecla}
    >
      {children}
    </g>
  );
}
