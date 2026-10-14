/**
 * El iconostasio, visto de frente desde la nave.
 *
 * Abajo, la fila de las puertas: la central con la Anunciación, Cristo a su
 * derecha y la Theotokos a su izquierda, y las dos puertas de los diáconos.
 * Encima, en los iconostasios altos, las filas de las fiestas, la Deesis, los
 * profetas y los patriarcas, y la Cruz.
 */
import { Zone } from './Zone';

const FILAS = [
  { y: 44, nombre: 'Patriarcas' },
  { y: 74, nombre: 'Profetas' },
  { y: 104, nombre: 'Deesis' },
  { y: 134, nombre: 'Fiestas' },
];

export function Iconostasis({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const z = { selected, onSelect };
  return (
    <svg className="temple-svg" viewBox="0 0 360 300" role="group" aria-label="El iconostasio visto de frente">
      <Zone id="iconostasio" {...z}>
        <rect className="temple-shape temple-shape--wall" x="6" y="40" width="348" height="254" rx="4" />
        {/* La cruz de arriba */}
        <path className="temple-shape temple-shape--gold" d="M176 4 h8 v8 h10 v6 h-10 v16 h-8 v-16 h-10 v-6 h10 z" />
      </Zone>

      <Zone id="filas" {...z}>
        {FILAS.map((f) => (
          <g key={f.nombre}>
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={i} className="temple-shape temple-shape--icon" x={14 + i * 30.4} y={f.y} width="27" height="26" rx="2" />
            ))}
            <rect className="temple-label-bg" x="136" y={f.y + 6} width="88" height="15" rx="7.5" />
            <text x="180" y={f.y + 17} textAnchor="middle" className="temple-label">
              {f.nombre}
            </text>
          </g>
        ))}
      </Zone>

      {/* La fila de abajo, de izquierda a derecha según se mira */}
      <Zone id="puertas-diaconales" {...z}>
        <rect className="temple-shape temple-shape--door" x="52" y="176" width="40" height="114" rx="2" />
        <rect className="temple-shape temple-shape--door" x="268" y="176" width="40" height="114" rx="2" />
        <text x="72" y="236" textAnchor="middle" className="temple-vertical">Norte</text>
        <text x="288" y="236" textAnchor="middle" className="temple-vertical">Sur</text>
      </Zone>
      <Zone id="theotokos" {...z}>
        <rect className="temple-shape temple-shape--icon" x="96" y="176" width="44" height="114" rx="2" />
        <text x="118" y="236" textAnchor="middle">Theotokos</text>
      </Zone>
      <Zone id="puertas-reales" {...z}>
        <rect className="temple-shape temple-shape--gold" x="144" y="168" width="72" height="20" rx="2" />
        <text x="180" y="182" textAnchor="middle" className="temple-note">Cena mística</text>
        <path className="temple-shape temple-shape--door temple-shape--gold" d="M146 290 V206 A34 18 0 0 1 180 194 V290 Z" />
        <path className="temple-shape temple-shape--door temple-shape--gold" d="M214 290 V206 A34 18 0 0 0 180 194 V290 Z" />
        <text x="180" y="254" textAnchor="middle" className="temple-note">Puertas reales</text>
      </Zone>
      <Zone id="cristo" {...z}>
        <rect className="temple-shape temple-shape--icon" x="220" y="176" width="44" height="114" rx="2" />
        <text x="242" y="236" textAnchor="middle">Cristo</text>
      </Zone>
      <Zone id="otros-iconos" {...z}>
        <rect className="temple-shape temple-shape--icon" x="10" y="176" width="38" height="114" rx="2" />
        <rect className="temple-shape temple-shape--icon" x="312" y="176" width="38" height="114" rx="2" />
      </Zone>
    </svg>
  );
}
