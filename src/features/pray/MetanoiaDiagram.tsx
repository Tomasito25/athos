/**
 * Cómo se hace una metanoia, en dibujo.
 *
 * Dos filas de figuras de trazo: la pequeña —santiguarse e inclinarse hasta
 * tocar el suelo con la mano— y la grande —santiguarse, arrodillarse, tocar
 * el suelo con la frente y levantarse—. Son esquemas, no ilustraciones: lo
 * justo para que se entienda el movimiento.
 */
import type { ReactElement } from 'react';
import es from '@/locales/es';

/** De pie, con los brazos caídos. */
const DePie = () => (
  <>
    <circle cx="50" cy="20" r="8" />
    <path d="M50 28 V70 M50 70 L42 108 M50 70 L58 108 M50 36 L41 64 M50 36 L59 64" />
  </>
);

/** Santiguándose: la mano derecha a la frente. */
const Cruz = () => (
  <>
    <circle cx="50" cy="20" r="8" />
    <path d="M50 28 V70 M50 70 L42 108 M50 70 L58 108 M50 36 L41 64 M50 36 L62 32 L54 20" />
    <path className="metanoia__accent" d="M66 14 v14 M60 19 h12" />
  </>
);

/** Inclinado, con la mano derecha en el suelo. */
const Inclinado = () => (
  <>
    <circle cx="86" cy="66" r="8" />
    <path d="M50 70 L78 64 M50 70 L46 108 M50 70 L54 108 M72 65 L80 108 M70 66 L66 92" />
  </>
);

/** De rodillas, erguido. */
const Rodillas = () => (
  <>
    <circle cx="50" cy="30" r="8" />
    <path d="M50 38 V74 M50 74 L60 104 L32 106 M50 46 L42 72 M50 46 L58 72" />
  </>
);

/** Con la frente en el suelo. */
const Postrado = () => (
  <>
    <circle cx="84" cy="99" r="8" />
    <path d="M42 82 L76 96 M42 82 L54 104 L28 106 M64 91 L70 108 M58 89 L62 108" />
  </>
);

function Fila({ titulo, poses }: { titulo: string; poses: Array<[string, () => ReactElement]> }) {
  return (
    <figure className="metanoia">
      <figcaption className="metanoia__title">{titulo}</figcaption>
      <div className="metanoia__row">
        {poses.map(([etiqueta, Pose], i) => (
          <div key={etiqueta} className="metanoia__step">
            <svg viewBox="0 0 100 116" aria-hidden="true" className="metanoia__svg">
              <line className="metanoia__ground" x1="4" y1="110" x2="96" y2="110" />
              <Pose />
            </svg>
            <span className="metanoia__label">
              {i + 1}. {etiqueta}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function MetanoiaDiagram() {
  return (
    <div className="metanoia-diagram">
      <Fila
        titulo={es.metanoia.small}
        poses={[
          [es.metanoia.stepCross, Cruz],
          [es.metanoia.stepBow, Inclinado],
          [es.metanoia.stepUp, DePie],
        ]}
      />
      <Fila
        titulo={es.metanoia.great}
        poses={[
          [es.metanoia.stepCross, Cruz],
          [es.metanoia.stepKneel, Rodillas],
          [es.metanoia.stepForehead, Postrado],
          [es.metanoia.stepUp, DePie],
        ]}
      />
    </div>
  );
}
