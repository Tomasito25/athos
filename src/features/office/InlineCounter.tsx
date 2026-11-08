/**
 * Contador dentro del oficio.
 *
 * Cuando un paso es la oración de Jesús o el komboskini, no se lee: se repite.
 * Este contador vive dentro del oficio para no obligar a salir de él, y guarda
 * la sesión igual que la pantalla completa.
 */
import { useCounter } from '@/features/jesus-prayer/useCounter';
import { Button } from '@/components/ui';
import { GREEK_FORMULAS } from '@/content/greek';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import { formatDuration } from '@/lib/format';
import es from '@/locales/es';

export function InlineCounter({
  mode,
  target,
  onComplete,
}: {
  mode: 'jesus-prayer' | 'komboskini';
  target: number;
  onComplete?: () => void;
}) {
  const toast = useUi((s) => s.toast);
  const greekMode = useSettings((s) => s.greekMode);
  const counter = useCounter({
    mode: mode === 'komboskini' ? 'chotki' : 'jesus-prayer',
    formulaId: mode === 'komboskini' ? 'komboskini' : 'jesus-prayer-es',
    initialTarget: target,
  });

  const formula = GREEK_FORMULAS.jesusPrayer;
  const completo = counter.count >= target;

  return (
    <div
      style={{
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        background: 'var(--surface)',
        padding: 'var(--sp-4)',
      }}
    >
      <p className="display" style={{ fontSize: 'var(--text-md)', lineHeight: 1.5 }}>
        {formula.spanish}
      </p>
      {greekMode !== 'oculto' ? (
        <p className="greek" style={{ marginTop: 'var(--sp-2)' }}>
          <span className="greek__original" lang="el">
            {formula.greek}
          </span>
          {greekMode === 'ambos' ? <span className="greek__roman">{formula.roman}</span> : null}
        </p>
      ) : null}

      <button
        type="button"
        onClick={counter.increment}
        aria-label={`${es.jesusPrayer.tapAnywhere}. ${counter.count} de ${target}`}
        style={{
          display: 'grid',
          placeItems: 'center',
          gap: 'var(--sp-1)',
          width: '100%',
          marginTop: 'var(--sp-4)',
          padding: 'var(--sp-5) var(--sp-3)',
          borderRadius: 'var(--radius)',
          border: `1px solid ${completo ? 'var(--gold)' : 'var(--line-strong)'}`,
          background: completo ? 'var(--gold-wash)' : 'var(--surface-sunken)',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
      >
        <span
          className="display"
          style={{ fontSize: '2.6rem', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--ink-strong)' }}
        >
          {counter.count}
        </span>
        <span className="muted text-sm">
          de {target}
          {mode === 'komboskini' ? ` ${es.jesusPrayer.knots}` : ''}
          {counter.elapsed ? ` · ${formatDuration(counter.elapsed)}` : ''}
        </span>
        <span className="muted text-sm">{es.jesusPrayer.tapAnywhere}</span>
      </button>

      <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
        <Button
          size="sm"
          variant={completo ? 'primary' : 'default'}
          disabled={counter.count === 0}
          onClick={async () => {
            await counter.finish(true);
            toast(es.jesusPrayer.saveSession);
            onComplete?.();
          }}
        >
          {es.office.finishCounter}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => counter.finish(false)} disabled={counter.count === 0}>
          {es.jesusPrayer.reset}
        </Button>
      </div>
    </div>
  );
}
