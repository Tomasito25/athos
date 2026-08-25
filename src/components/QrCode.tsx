/**
 * Un código QR dibujado en la propia página.
 *
 * Sirve para lo que hasta ahora obligaba a abrir un terminal: pasar ATHOS del
 * ordenador al teléfono sin teclear una dirección IP. La biblioteca se carga
 * sólo cuando esta pantalla se abre, para no engordar el arranque.
 *
 * Se dibuja como SVG desde la matriz de módulos, no como imagen: así se ve
 * nítido a cualquier tamaño y hereda los colores del tema.
 */
import { useEffect, useState } from 'react';
import { qrPath, type QrMatriz as Matriz } from '@/lib/qr-path';

interface Estado {
  /** La dirección que produjo esta matriz, para saber si sigue vigente. */
  value: string;
  matriz: Matriz | null;
  error: boolean;
}

export function QrCode({ value, size = 200 }: { value: string; size?: number }) {
  // Un solo estado con la dirección dentro: si cambia, lo anterior deja de
  // valer sin necesidad de reiniciar nada desde el efecto.
  const [estado, setEstado] = useState<Estado>({ value, matriz: null, error: false });

  useEffect(() => {
    let vivo = true;
    import('qrcode')
      .then(({ default: QRCode }) => {
        const qr = QRCode.create(value, { errorCorrectionLevel: 'M' });
        if (vivo) setEstado({ value, matriz: qr.modules as unknown as Matriz, error: false });
      })
      .catch(() => {
        if (vivo) setEstado({ value, matriz: null, error: true });
      });
    return () => {
      vivo = false;
    };
  }, [value]);

  const alDia = estado.value === value;
  const matriz = alDia ? estado.matriz : null;
  const error = alDia ? estado.error : false;

  if (error) {
    // Si el QR no se puede dibujar se dice, en vez de dejar un hueco mudo.
    return <p className="muted text-sm">No se ha podido dibujar el código. Copia la dirección.</p>;
  }

  if (!matriz) return <div className="qr qr--loading" style={{ width: size, height: size }} />;

  // Un módulo de margen a cada lado: sin él, muchas cámaras no lo leen.
  const borde = 1;
  const total = matriz.size + borde * 2;

  return (
    <svg
      className="qr"
      width={size}
      height={size}
      viewBox={`0 0 ${total} ${total}`}
      role="img"
      aria-label={`Código QR de ${value}`}
      shapeRendering="crispEdges"
    >
      <rect width={total} height={total} fill="var(--paper)" rx="0.5" />
      <g transform={`translate(${borde} ${borde})`} fill="var(--paper-ink)">
        <path d={qrPath(matriz)} />
      </g>
    </svg>
  );
}
