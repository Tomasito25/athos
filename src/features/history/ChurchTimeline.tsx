/**
 * La línea del tiempo de la Iglesia y sus divisiones.
 *
 * Un tronco desde Pentecostés y las ramas que se van separando, cada una con
 * su año y su motivo. Es el dibujo que contesta de un vistazo a la pregunta
 * que más se hace quien llega de fuera: quién se separó de quién, y cuándo.
 *
 * Está contado desde donde está ATHOS —la recta es la Iglesia ortodoxa—, y en
 * la pantalla se dice, porque un católico dibujaría lo mismo con la recta en
 * su sitio. Las fechas y los motivos no cambian según quién lo cuente, y eso
 * es lo que el esquema afirma.
 *
 * El eje no es lineal: dos tercios de la altura se van a los primeros mil
 * años, donde no pasa casi nada visible, y el último tercio a los últimos
 * mil, donde se amontona todo. Con un eje a escala, cuatro de las seis ramas
 * caerían una encima de otra.
 */
import { CHURCH_BRANCHES, TIMELINE_END, TIMELINE_START } from '@/content/history-maps';

const ANCHO = 340;
const ALTO = 470;
const MARGEN = 46;
const TRONCO_X = 82;

/**
 * Año → altura.
 *
 * Raíz cuadrada del avance: estira los siglos vacíos y comprime los llenos,
 * lo justo para que las seis ramas quepan sin pisarse.
 */
function y(anio: number): number {
  const avance = (anio - TIMELINE_START) / (TIMELINE_END - TIMELINE_START);
  return MARGEN + Math.sqrt(avance) * (ALTO - MARGEN * 2);
}

/** Dónde corre cada rama una vez separada del tronco. */
const CARRIL: Record<string, number> = {
  oriente: 166,
  orientales: 166,
  roma: 166,
  protestantes: 250,
  'greco-catolicos': 166,
  'viejos-creyentes': 166,
};

/** Hueco mínimo entre dos separaciones, para que quepan sus dos renglones. */
const HUECO = 52;

/**
 * La altura de cada separación, ya repartida.
 *
 * Éfeso (431) y Calcedonia (451) caen a veinte años uno de otro: en cualquier
 * eje que quepa en una pantalla se pisan, y con ellos sus rótulos. Se
 * recorren en orden y se empuja hacia abajo la que quede demasiado cerca de
 * la anterior. Deja de ser un eje exacto —ya no lo era— y pasa a ser lo que
 * de verdad se necesita: un orden legible. El pie de la figura lo dice.
 */
function alturas(): Map<string, number> {
  const orden = [...CHURCH_BRANCHES].sort((a, b) => a.year - b.year);
  const salida = new Map<string, number>();
  let anterior = -Infinity;
  for (const rama of orden) {
    const altura = Math.max(y(rama.year), anterior + HUECO);
    salida.set(rama.id, altura);
    anterior = altura;
  }
  return salida;
}

/**
 * Los nombres largos se parten en dos renglones.
 *
 * SVG no ajusta el texto solo: «Iglesias ortodoxas orientales» de una tirada
 * se sale del dibujo. Se corta por el espacio más cercano a la mitad, que es
 * donde menos raro queda.
 */
function enDosLineas(texto: string, maximo = 20): string[] {
  if (texto.length <= maximo) return [texto];
  const mitad = Math.floor(texto.length / 2);
  const espacios = [...texto].flatMap((c, i) => (c === ' ' ? [i] : []));
  if (!espacios.length) return [texto];
  const corte = espacios.reduce((a, b) => (Math.abs(b - mitad) < Math.abs(a - mitad) ? b : a));
  return [texto.slice(0, corte), texto.slice(corte + 1)];
}

export function ChurchTimeline() {
  const altura = alturas();
  // El tronco llega hasta debajo de la última separación, con sitio para el
  // rótulo del final.
  const fondo = Math.max(ALTO - MARGEN, Math.max(...altura.values()) + 64);

  return (
    <figure className="cronologia">
      <svg
        viewBox={`0 0 ${ANCHO} ${fondo + MARGEN}`}
        className="cronologia__svg"
        role="img"
        aria-labelledby="crono-t crono-d"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="crono-t">La Iglesia y sus divisiones, de Pentecostés a hoy</title>
        <desc id="crono-d">
          Un tronco con seis ramas que se separan en 431, 451, 1054, 1517, 1596 y 1666. Cada una
          se detalla en la lista que hay debajo.
        </desc>

        {/* El tronco: la comunión que llega hasta hoy. */}
        <line
          x1={TRONCO_X}
          y1={MARGEN}
          x2={TRONCO_X}
          y2={fondo}
          stroke="var(--gold)"
          strokeWidth="3"
        />

        <circle cx={TRONCO_X} cy={MARGEN} r="5" fill="var(--gold)" />
        <text x={TRONCO_X} y={MARGEN - 28} fontSize="11" fill="var(--ink-faint)" textAnchor="middle">
          c. 33
        </text>
        <text x={TRONCO_X} y={MARGEN - 11} fontSize="13" fill="var(--ink)" textAnchor="middle">
          Pentecostés
        </text>

        {CHURCH_BRANCHES.map((rama) => {
          const alto = altura.get(rama.id)!;
          // Las ramas que salen de otra rama arrancan de su carril, no del tronco.
          const desdeX = rama.from === 'tronco' ? TRONCO_X : (CARRIL[rama.from] ?? TRONCO_X);
          const hastaX = CARRIL[rama.id] ?? 150;
          const lineas = enDosLineas(rama.name);
          return (
            <g key={rama.id}>
              {/* La curva de separación: sale, se dobla y sigue en paralelo. */}
              <path
                d={`M ${desdeX} ${alto} C ${desdeX + 26} ${alto}, ${hastaX - 26} ${alto}, ${hastaX} ${alto + 18} L ${hastaX} ${fondo}`}
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth="1.6"
              />
              <circle
                cx={desdeX}
                cy={alto}
                r="4"
                fill="var(--surface)"
                stroke="var(--gold)"
                strokeWidth="1.6"
              />
              <text x={desdeX - 9} y={alto + 4} fontSize="11" fill="var(--ink-faint)" textAnchor="end">
                {rama.yearLabel}
              </text>
              <text x={hastaX + 7} y={alto + 22} fontSize="12" fill="var(--ink)">
                {lineas.map((linea, i) => (
                  <tspan key={linea} x={hastaX + 7} dy={i === 0 ? 0 : 14}>
                    {linea}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        <circle cx={TRONCO_X} cy={fondo} r="5" fill="var(--gold)" />
        <text x={TRONCO_X} y={fondo + 20} fontSize="12" fill="var(--ink)" textAnchor="middle">
          Iglesia ortodoxa
        </text>
      </svg>

      <figcaption className="cronologia__pie">
        La línea recta es la Iglesia ortodoxa porque es desde donde está contado. El eje del tiempo
        no va a escala: los primeros siglos ocupan más de lo que les tocaría, y dos separaciones
        muy juntas —Éfeso en 431 y Calcedonia en 451— se separan lo justo para poder leerlas. Las
        fechas de cada rama son las que dice su rótulo.
      </figcaption>
    </figure>
  );
}

/** Las mismas separaciones, explicadas. El dibujo sitúa; esto cuenta. */
export function ChurchBranchList() {
  return (
    <div className="stack">
      {CHURCH_BRANCHES.map((rama) => (
        <div key={rama.id} className="panel panel--quiet">
          <p className="eyebrow">{rama.yearLabel}</p>
          <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>
            {rama.name}
          </p>
          <p className="text-sm" style={{ marginTop: 'var(--sp-2)' }}>
            {rama.why}
          </p>
          {rama.today ? (
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
              Hoy: {rama.today}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
