/**
 * Ornamentos bizantinos, dibujados con trazo y no con imágenes.
 *
 * Un manuscrito bizantino no empieza un Evangelio con un título a secas: abre
 * con una πύλη —una «puerta»—, una banda rectangular de entrelazo con una cruz
 * encima, y la primera letra del texto va agrandada y en rojo dentro de la
 * banda. Eso es lo que se reconstruye aquí.
 *
 * Todo es SVG en línea y en `currentColor`, por tres razones: pesa unos
 * cientos de bytes en vez de un PNG, escala sin perder filo en cualquier
 * pantalla, y sigue al tema claro o al oscuro sin tener dos copias.
 *
 * El usuario puede apagarlos en Configuración. Hay quien quiere un libro
 * ornado y quien quiere una página desnuda, y las dos cosas son ortodoxas.
 */
import { useSettings } from '@/stores/settings';

/**
 * La trenza: dos cadenas de círculos entrelazados con un rombo en cada cruce.
 *
 * Es el motivo más repetido de la ornamentación bizantina, del Protaton de
 * Karyés a los evangeliarios de Constantinopla. Se dibuja como un patrón que
 * se repite, de modo que la banda vale para cualquier ancho.
 */
function Trenza({ id }: { id: string }) {
  return (
    <pattern id={id} width="24" height="16" patternUnits="userSpaceOnUse">
      {/* Las dos ondas que se cruzan. Con las líneas partidas en el cruce se
          lee como un entrelazo y no como una malla. */}
      <path
        d="M0 8 C 4 8, 4 2, 8 2 S 12 8, 12 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M12 8 C 16 8, 16 14, 20 14 S 24 8, 24 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M0 8 C 4 8, 4 14, 8 14 S 12 8, 12 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M12 8 C 16 8, 16 2, 20 2 S 24 8, 24 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      {/* El rombo del cruce. El del borde se dibuja dos veces, en x=0 y en
          x=24: cada mitad queda recortada por el borde del mosaico y las dos
          se completan al repetirse el patrón. Con uno solo se veía media
          piedra colgando en cada junta. */}
      <path d="M12 5.4 L14.4 8 L12 10.6 L9.6 8 Z" fill="currentColor" opacity="0.75" />
      <path d="M0 5.4 L2.4 8 L0 10.6 L-2.4 8 Z" fill="currentColor" opacity="0.75" />
      <path d="M24 5.4 L26.4 8 L24 10.6 L21.6 8 Z" fill="currentColor" opacity="0.75" />
    </pattern>
  );
}

/**
 * La puerta que abre una sección.
 *
 * Va encima del título, como en el manuscrito. La cruz del centro es la de
 * ocho puntas, con el travesaño inferior subiendo a la izquierda de quien
 * mira, que es la mano derecha de Cristo.
 */
export function Headpiece({ width = 220 }: { width?: number }) {
  const ornamentos = useSettings((s) => s.ornaments);
  if (!ornamentos) return null;

  return (
    <svg
      className="ornament ornament--headpiece"
      viewBox={`0 0 ${width} 34`}
      width={width}
      height={34}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <Trenza id="athos-trenza-cabecera" />
      </defs>

      {/* La cruz, encima y en el centro. */}
      <g transform={`translate(${width / 2}, 2)`} stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M0 0 v11" />
        <path d="M-2.4 2.2 h4.8" />
        <path d="M-4.4 5 h8.8" />
        <path d="M-3 8.6 l6 1.9" />
      </g>

      {/* La banda de entrelazo, con su marco. */}
      <rect x="0.6" y="15.6" width={width - 1.2} height="16.8" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
      <rect x="2" y="17" width={width - 4} height="14" fill="url(#athos-trenza-cabecera)" opacity="0.85" />
    </svg>
  );
}

/**
 * El remate que cierra una sección.
 *
 * En los manuscritos la sección no acaba en blanco: se cierra con un motivo
 * más pequeño, a veces sólo una hoja o un trébol. Aquí es una cruz entre dos
 * trazos que se afinan hacia fuera.
 */
export function Tailpiece() {
  const ornamentos = useSettings((s) => s.ornaments);
  if (!ornamentos) return null;

  return (
    <svg
      className="ornament ornament--tailpiece"
      viewBox="0 0 120 18"
      width={120}
      height={18}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" fill="none" strokeLinecap="round">
        <path d="M4 9 C 22 9, 30 4, 44 9" strokeWidth="0.9" opacity="0.7" />
        <path d="M116 9 C 98 9, 90 4, 76 9" strokeWidth="0.9" opacity="0.7" />
        <path d="M4 9 C 22 9, 30 14, 44 9" strokeWidth="0.9" opacity="0.7" />
        <path d="M116 9 C 98 9, 90 14, 76 9" strokeWidth="0.9" opacity="0.7" />
      </g>
      <g transform="translate(60, 2)" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round">
        <path d="M0 0 v14" />
        <path d="M-2.6 2.6 h5.2" />
        <path d="M-4.8 5.6 h9.6" />
        <path d="M-3.2 9.8 l6.4 2" />
      </g>
    </svg>
  );
}

/** La banda de entrelazo suelta, para separar dentro de una página. */
export function Interlace({ width = 180 }: { width?: number }) {
  const ornamentos = useSettings((s) => s.ornaments);
  if (!ornamentos) return null;

  return (
    <svg
      className="ornament ornament--band"
      viewBox={`0 0 ${width} 16`}
      width={width}
      height={16}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <Trenza id="athos-trenza-banda" />
      </defs>
      <rect x="0" y="0" width={width} height="16" fill="url(#athos-trenza-banda)" opacity="0.7" />
    </svg>
  );
}
