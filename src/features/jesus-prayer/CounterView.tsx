/**
 * Las dos superficies de recuento de la oración de Jesús: el aro que se llena
 * hacia un objetivo y la cuerda del komboskini, con sus nudos y sus vueltas.
 */
import type { ReactNode } from 'react';
import { formatDuration } from '@/lib/format';
import es from '@/locales/es';

export function CounterView({
  count,
  target,
  progress,
  elapsed,
  onCount,
  children,
  dark,
}: {
  count: number;
  target: number | null;
  progress: number;
  elapsed: number;
  onCount: () => void;
  children?: ReactNode;
  dark?: boolean;
}) {
  const size = 232;
  const radius = 104;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      type="button"
      onClick={onCount}
      aria-label={`${es.jesusPrayer.tapAnywhere}. ${es.jesusPrayer.count}: ${count}`}
      style={{
        display: 'grid',
        placeItems: 'center',
        gap: 'var(--sp-4)',
        width: '100%',
        padding: 'var(--sp-6) var(--sp-4)',
        borderRadius: 'var(--radius-lg)',
        background: dark ? 'var(--bg-deep)' : 'var(--surface)',
        border: '1px solid var(--line)',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--line)"
            strokeWidth={2}
          />
          {target ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transition: 'stroke-dashoffset 220ms var(--ease)' }}
            />
          ) : null}
        </svg>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeContent: 'center',
            justifyItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span
            className="display"
            style={{
              fontSize: '3.6rem',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--ink-strong)',
            }}
          >
            {count}
          </span>
          {target ? <span className="muted text-sm">de {target}</span> : null}
          {elapsed > 0 ? <span className="muted text-sm">{formatDuration(elapsed)}</span> : null}
        </div>
      </div>

      {children}
    </button>
  );
}

/** Dibuja la cuerda con sus nudos y una cruz en el cierre. */
function Rope({ knots, filled }: { knots: number; filled: number }) {
  const size = 250;
  const center = size / 2;
  const radius = 96;
  // Con muchos nudos la cuerda se satura: se muestra una vuelta representativa.
  const shown = Math.min(knots, 50);
  const step = (2 * Math.PI) / shown;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      {Array.from({ length: shown }, (_, index) => {
        const angle = -Math.PI / 2 + index * step;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        const done = (filled % knots || (filled > 0 ? knots : 0)) > index * (knots / shown);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={done ? 4.6 : 3}
            fill={done ? 'var(--gold)' : 'var(--line-strong)'}
            style={{ transition: 'all 180ms var(--ease)' }}
          />
        );
      })}
      <g stroke="var(--gold)" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.85}>
        <path d={`M${center} ${center + radius - 16}v30`} />
        <path d={`M${center - 8} ${center + radius - 8}h16`} />
        <path d={`M${center - 12} ${center + radius}h24`} />
      </g>
    </svg>
  );
}

/** La cuerda: los nudos se van encendiendo conforme se avanza, como en la mano. */
export function RopeView({
  count,
  knots,
  laps,
  elapsed,
  onCount,
  dark,
}: {
  count: number;
  knots: number;
  laps: number;
  elapsed: number;
  onCount: () => void;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        gap: 'var(--sp-4)',
        padding: 'var(--sp-5)',
        background: dark ? 'var(--bg-deep)' : 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <button
        type="button"
        onClick={onCount}
        aria-label={`${es.jesusPrayer.tapAnywhere}. ${es.jesusPrayer.count}: ${count}`}
        style={{
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
      >
        <Rope knots={knots} filled={count} />
        <span
          className="display"
          style={{
            position: 'absolute',
            fontSize: '2.8rem',
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--ink-strong)',
          }}
        >
          {count % knots || (count ? knots : 0)}
        </span>
      </button>

      <p className="muted text-sm">
        {es.jesusPrayer.inTotal.replace('{{count}}', String(count))}
        {laps > 0 ? ` · ${laps} ${laps === 1 ? es.jesusPrayer.lap : es.jesusPrayer.laps}` : ''}
        {elapsed ? ` · ${formatDuration(elapsed)}` : ''}
      </p>
    </div>
  );
}
