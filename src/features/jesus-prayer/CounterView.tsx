/** Superficie de recuento, compartida por la oración de Jesús y el chotki. */
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
