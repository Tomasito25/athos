import { useState } from 'react';
import { contentUrl } from '@/lib/content-url';

/**
 * Placa de icono.
 *
 * Mientras no haya una reproducción con licencia comprobada, se muestra una
 * tabla ornamental con el nombre: honesta y digna, en lugar de una imagen
 * rota o de una imagen ajena usada sin derecho.
 *
 * `fallback` es la miniatura. La imagen grande no va en el precaché —se
 * guarda al abrirla por primera vez—, así que sin conexión podía salir rota
 * aunque la miniatura sí estuviera guardada. Si la grande falla, se pone la
 * miniatura; si falla también, la placa.
 */
export function IconPlate({
  name,
  image,
  fallback,
  eager = false,
}: {
  name: string;
  image?: string;
  fallback?: string;
  eager?: boolean;
}) {
  // Cuántas imágenes han fallado: 0, la grande; 1, la miniatura; 2, ninguna.
  const [fallos, setFallos] = useState(0);
  const fuentes = [image, fallback].filter((f): f is string => Boolean(f));
  const actual = fuentes[fallos];

  if (actual) {
    return (
      <img
        key={actual}
        src={contentUrl(actual)}
        alt={name}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFallos((n) => n + 1)}
        style={{
          width: '100%',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--line-strong)',
          background: 'var(--surface-sunken)',
          boxShadow: 'var(--shadow-sm)',
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={
        fuentes.length ? `${name} — imagen no disponible sin conexión` : `${name} — imagen pendiente de incorporar`
      }
      style={{
        aspectRatio: '3 / 4',
        display: 'grid',
        placeItems: 'center',
        background:
          'linear-gradient(160deg, var(--surface-sunken), var(--surface-2))',
        border: '1px solid var(--line-strong)',
        borderRadius: 'var(--radius-sm)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 120 160" width="100%" height="100%" aria-hidden="true">
        <rect x="6" y="6" width="108" height="148" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
        <rect x="12" y="12" width="96" height="136" fill="none" stroke="var(--gold)" strokeWidth="0.5" opacity="0.35" />
        <g stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.55">
          <path d="M60 52v58" />
          <path d="M50 62h20" />
          <path d="M42 74h36" />
          <path d="M48 98l24-10" />
        </g>
        <circle cx="60" cy="52" r="0" />
      </svg>
    </div>
  );
}
