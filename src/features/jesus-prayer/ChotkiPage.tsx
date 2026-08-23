/**
 * Chotki.
 *
 * Igual que el contador de la oración de Jesús, pero con la cuerda dibujada:
 * los nudos se van encendiendo conforme se avanza, como en la mano.
 */
import { useState } from 'react';
import { useCounter, TARGETS } from './useCounter';
import { useAsync } from '@/hooks/useAsync';
import { listSessions } from '@/db/user';
import { Button, ListRow, PageHead, Panel, Section, Switch } from '@/components/ui';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import { formatDuration } from '@/lib/format';
import es from '@/locales/es';

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

export function ChotkiPage() {
  const settings = useSettings();
  const toast = useUi((s) => s.toast);
  const [knots, setKnots] = useState(100);
  const counter = useCounter({ mode: 'chotki', formulaId: 'chotki', initialTarget: 100 });
  const sessions = useAsync(() => listSessions(10), [counter.count === 0]);

  const laps = Math.floor(counter.count / knots);

  return (
    <div className="page page--reading">
      <PageHead
        title={es.jesusPrayer.chotki}
        subtitle="La cuerda de oración. Cada nudo, una oración."
      />

      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          gap: 'var(--sp-4)',
          padding: 'var(--sp-5)',
          background: settings.prayerModeDark ? 'var(--bg-deep)' : 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <button
          type="button"
          onClick={counter.increment}
          aria-label={`${es.jesusPrayer.tapAnywhere}. ${counter.count}`}
          style={{ position: 'relative', display: 'grid', placeItems: 'center', WebkitTapHighlightColor: 'transparent' }}
        >
          <Rope knots={knots} filled={counter.count} />
          <span
            className="display"
            style={{
              position: 'absolute',
              fontSize: '2.8rem',
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--ink-strong)',
            }}
          >
            {counter.count % knots || (counter.count ? knots : 0)}
          </span>
        </button>

        <p className="muted text-sm">
          {counter.count} en total{laps > 0 ? ` · ${laps} vuelta${laps === 1 ? '' : 's'}` : ''}
          {counter.elapsed ? ` · ${formatDuration(counter.elapsed)}` : ''}
        </p>
      </div>

      <div className="row row--wrap" style={{ marginTop: 'var(--sp-4)', justifyContent: 'center' }}>
        {TARGETS.map((value) => (
          <Button
            key={value}
            size="sm"
            variant={knots === value ? 'primary' : 'default'}
            onClick={() => {
              setKnots(value);
              counter.setTarget(value);
            }}
          >
            {value} {es.jesusPrayer.knots}
          </Button>
        ))}
        <input
          type="number"
          min={1}
          max={1000}
          className="input"
          style={{ width: '8rem' }}
          value={knots}
          aria-label={es.jesusPrayer.custom}
          onChange={(event) => {
            const value = Math.max(1, Number(event.target.value) || 1);
            setKnots(value);
            counter.setTarget(value);
          }}
        />
      </div>

      <div className="btn-row" style={{ marginTop: 'var(--sp-4)', justifyContent: 'center' }}>
        <Button
          variant="primary"
          disabled={counter.count === 0}
          onClick={async () => {
            await counter.finish(true);
            sessions.reload();
            toast('Sesión guardada');
          }}
        >
          {es.jesusPrayer.saveSession}
        </Button>
        <Button variant="ghost" onClick={() => counter.finish(false)} disabled={counter.count === 0}>
          {es.jesusPrayer.reset}
        </Button>
      </div>

      <Section title="Ajustes">
        <Panel variant="quiet">
          <Switch
            checked={settings.jesusPrayerVibration}
            onChange={(value) => settings.set('jesusPrayerVibration', value)}
            title={es.jesusPrayer.vibration}
            description={
              counter.vibrationSupported
                ? 'Un pulso en cada nudo.'
                : 'Este dispositivo no admite vibración.'
            }
          />
          <Switch
            checked={settings.jesusPrayerSound}
            onChange={(value) => settings.set('jesusPrayerSound', value)}
            title={es.jesusPrayer.sound}
          />
          <Switch
            checked={settings.prayerModeDark}
            onChange={(value) => settings.set('prayerModeDark', value)}
            title={es.jesusPrayer.darkMode}
          />
        </Panel>
      </Section>

      {sessions.data && sessions.data.length > 0 ? (
        <Section title={es.jesusPrayer.history}>
          <div className="list">
            {sessions.data.map((session) => (
              <ListRow
                key={session.id}
                chevron={false}
                title={`${session.count} oraciones`}
                meta={`${new Date(session.startedAt).toLocaleString('es')} · ${formatDuration(session.durationMs)}`}
              />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
