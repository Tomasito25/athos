/**
 * Los kathismata del día, dentro de los Maitines.
 *
 * Cada kathisma va plegada, con sus salmos dentro: son veinte minutos cada
 * una, y quien no tenga tiempo debe poder saltarla de un vistazo. Los salmos
 * no se cargan hasta que se abre.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { kathismataFor } from '@/lib/calendar/day-kathismata';
import { KATHISMATA } from '@/content/psalter';
import { Blocks } from '@/components/ui';
import { WEEKDAYS } from '@/lib/format';

export default function DayKathismata() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const { numbers, notice } = kathismataFor(day);

  return (
    <div className="day-troparion">
      <p className="day-troparion__date">
        {WEEKDAYS[day.weekday]}: {numbers.length ? `kathismata ${numbers.join(' y ')}` : 'sin kathismata'}
      </p>
      {notice ? <p className="rubric">{notice}</p> : null}
      {numbers.map((n) => (
        <Kathisma key={n} n={n} />
      ))}
      <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
        El reparto es el del Típikon para los días ordinarios. <Link to="/leer/salterio">El Salterio entero</Link>.
      </p>
    </div>
  );
}

function Kathisma({ n }: { n: number }) {
  const [abierta, setAbierta] = useState(false);
  const kathisma = KATHISMATA.find((k) => k.number === n);
  return (
    <details className="inline-psalm" open={abierta} onToggle={(e) => setAbierta(e.currentTarget.open)}>
      <summary className="inline-psalm__head">
        <span className="inline-psalm__title">
          Kathisma {n} · salmos {kathisma?.psalms[0]}–{kathisma?.psalms[kathisma.psalms.length - 1]}
        </span>
      </summary>
      {abierta ? (
        <div className="inline-psalm__body">
          <Blocks blocks={(kathisma?.psalms ?? []).map((p) => ({ kind: 'psalm' as const, content: `Salmo ${p}`, ref: String(p) }))} />
          <p className="rubric">Señor, ten piedad (tres veces). Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.</p>
        </div>
      ) : null}
    </details>
  );
}
