/**
 * La planta de una iglesia, vista desde arriba.
 *
 * El este va arriba, que es hacia donde se reza: el ábside con el altar, el
 * iconostasio atravesado, la nave con la cúpula encima y, abajo, el nártex y
 * la puerta. Es un esquema: cada iglesia tiene su forma, pero el orden es
 * siempre éste.
 */
import { Zone } from './Zone';

export function ChurchPlan({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const z = { selected, onSelect };
  return (
    <svg className="temple-svg" viewBox="0 0 320 520" role="group" aria-label="Planta de una iglesia ortodoxa, con el este arriba">
      {/* La brújula */}
      <g className="temple-compass" aria-hidden="true">
        <path d="M290 46 L284 62 L290 58 L296 62 Z" />
        <text x="290" y="38" textAnchor="middle">Este</text>
      </g>

      {/* El santuario: el ábside y lo que hay dentro */}
      <Zone id="santuario" {...z}>
        <path className="temple-shape" d="M60 175 L60 112 A100 72 0 0 1 260 112 L260 175 Z" />
      </Zone>
      <Zone id="sintronon" {...z}>
        <path className="temple-shape temple-shape--line" d="M92 96 A72 52 0 0 1 228 96" />
        <text x="160" y="58" textAnchor="middle">Lugar alto</text>
      </Zone>
      <Zone id="prothesis" {...z}>
        <rect className="temple-shape" x="66" y="122" width="40" height="34" rx="3" />
        <text x="86" y="143" textAnchor="middle">Prep.</text>
      </Zone>
      <Zone id="diakonikon" {...z}>
        <rect className="temple-shape" x="214" y="122" width="40" height="34" rx="3" />
        <text x="234" y="143" textAnchor="middle">Diak.</text>
      </Zone>
      <Zone id="mesa-altar" {...z}>
        <rect className="temple-shape temple-shape--gold" x="140" y="112" width="40" height="40" rx="2" />
        <text x="160" y="136" textAnchor="middle">Altar</text>
      </Zone>

      {/* El iconostasio, con sus tres puertas */}
      <Zone id="iconostasio" {...z}>
        <rect className="temple-shape temple-shape--wall" x="34" y="175" width="252" height="12" />
      </Zone>
      <Zone id="puertas-diaconales" {...z}>
        <rect className="temple-shape temple-shape--door" x="80" y="174" width="20" height="14" />
        <rect className="temple-shape temple-shape--door" x="220" y="174" width="20" height="14" />
      </Zone>
      <Zone id="puertas-reales" {...z}>
        <rect className="temple-shape temple-shape--door temple-shape--gold" x="145" y="173" width="30" height="16" />
      </Zone>

      {/* La nave */}
      <Zone id="nave" {...z}>
        <rect className="temple-shape" x="30" y="187" width="260" height="243" />
        <circle className="temple-shape temple-shape--dashed" cx="160" cy="315" r="72" />
        <text x="160" y="400" textAnchor="middle">Nave</text>
        <text x="160" y="248" textAnchor="middle" className="temple-note">cúpula</text>
      </Zone>
      <Zone id="solea" {...z}>
        <rect className="temple-shape" x="34" y="187" width="252" height="16" />
        <text x="62" y="199" textAnchor="middle">Solea</text>
      </Zone>
      <Zone id="ambon" {...z}>
        <path className="temple-shape temple-shape--gold" d="M138 203 A22 22 0 0 0 182 203 Z" />
        <text x="160" y="217" textAnchor="middle">Ambón</text>
      </Zone>
      <Zone id="kliros" {...z}>
        <rect className="temple-shape" x="38" y="212" width="42" height="36" rx="3" />
        <rect className="temple-shape" x="240" y="212" width="42" height="36" rx="3" />
        <text x="59" y="234" textAnchor="middle">Coro</text>
        <text x="261" y="234" textAnchor="middle">Coro</text>
      </Zone>
      <Zone id="tetrapodion" {...z}>
        <rect className="temple-shape temple-shape--gold" x="150" y="312" width="20" height="14" rx="2" />
        <text x="160" y="342" textAnchor="middle" className="temple-note">icono del día</text>
      </Zone>

      {/* El nártex y la puerta */}
      <Zone id="narthex" {...z}>
        <rect className="temple-shape" x="30" y="430" width="260" height="58" />
        <text x="160" y="463" textAnchor="middle">Nártex</text>
      </Zone>
      <Zone id="velas" {...z}>
        <circle className="temple-shape temple-shape--gold" cx="70" cy="455" r="9" />
        <circle className="temple-shape temple-shape--gold" cx="250" cy="455" r="9" />
      </Zone>
      <Zone id="oriente" {...z}>
        <rect className="temple-shape temple-shape--door" x="140" y="486" width="40" height="8" />
        <text x="160" y="510" textAnchor="middle">Entrada · oeste</text>
      </Zone>
    </svg>
  );
}
