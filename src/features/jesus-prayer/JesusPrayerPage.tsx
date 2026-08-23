/**
 * Oración de Jesús.
 *
 * Un contador sobrio: el texto grande, la cuenta, nada más. Las estadísticas
 * existen para recordar, no para competir.
 */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCounter, TARGETS } from './useCounter';
import { CounterView } from './CounterView';
import { useAsync } from '@/hooks/useAsync';
import { listSessions, prayerStats } from '@/db/user';
import { useToday } from '@/hooks/useLiturgicalDay';
import {
  Button,
  ListRow,
  PageHead,
  Panel,
  Section,
  Switch,
  Tag,
} from '@/components/ui';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import { formatDuration } from '@/lib/format';
import es from '@/locales/es';

const FORMULA = 'Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador.';

export function JesusPrayerPage() {
  const [params] = useSearchParams();
  const today = useToday();
  const toast = useUi((s) => s.toast);
  const settings = useSettings();

  const initialTarget = params.get('objetivo') ? Number(params.get('objetivo')) : null;
  const counter = useCounter({ mode: 'jesus-prayer', formulaId: 'jesus-prayer-es', initialTarget });
  const stats = useAsync(() => prayerStats(today), [today, counter.count === 0]);
  const sessions = useAsync(() => listSessions(10), [counter.count === 0]);
  const [custom, setCustom] = useState('');

  useEffect(() => {
    if (counter.complete) toast(es.jesusPrayer.completed.replace('{{count}}', String(counter.count)));
    // Sólo interesa el instante en que se alcanza el objetivo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter.complete]);

  const end = async (save: boolean) => {
    const saved = await counter.finish(save);
    stats.reload();
    sessions.reload();
    if (saved) toast('Sesión guardada');
  };

  return (
    <div className="page page--reading">
      <PageHead title={es.jesusPrayer.title} />

      <p
        className="display text-center"
        style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, margin: '0 0 var(--sp-5)' }}
      >
        {FORMULA}
      </p>

      <CounterView
        count={counter.count}
        target={counter.target}
        progress={counter.progress}
        elapsed={counter.elapsed}
        onCount={counter.increment}
        dark={settings.prayerModeDark}
      >
        <span className="muted text-sm">{es.jesusPrayer.tapAnywhere}</span>
      </CounterView>

      <div className="row row--wrap" style={{ marginTop: 'var(--sp-4)', justifyContent: 'center' }}>
        {TARGETS.map((value) => (
          <Button
            key={value}
            size="sm"
            variant={counter.target === value ? 'primary' : 'default'}
            onClick={() => counter.setTarget(counter.target === value ? null : value)}
          >
            {value}
          </Button>
        ))}
        <input
          type="number"
          min={1}
          className="input"
          style={{ width: '7rem' }}
          placeholder={es.jesusPrayer.custom}
          value={custom}
          aria-label={es.jesusPrayer.custom}
          onChange={(event) => {
            setCustom(event.target.value);
            counter.setTarget(event.target.value ? Number(event.target.value) : null);
          }}
        />
      </div>

      <div className="btn-row" style={{ marginTop: 'var(--sp-4)', justifyContent: 'center' }}>
        <Button onClick={() => (counter.running ? counter.pause() : counter.start())}>
          {counter.running ? es.jesusPrayer.pause : es.jesusPrayer.resume}
        </Button>
        <Button variant="primary" onClick={() => end(true)} disabled={counter.count === 0}>
          {es.jesusPrayer.saveSession}
        </Button>
        <Button variant="ghost" onClick={() => end(false)} disabled={counter.count === 0}>
          {es.jesusPrayer.discard}
        </Button>
      </div>

      <Section title="Ajustes de la sesión">
        <Panel variant="quiet">
          <Switch
            checked={settings.jesusPrayerVibration}
            onChange={(value) => settings.set('jesusPrayerVibration', value)}
            title={es.jesusPrayer.vibration}
            description={
              counter.vibrationSupported
                ? 'Un pulso corto en cada oración y otro más largo al llegar al objetivo.'
                : 'Este dispositivo no admite vibración.'
            }
          />
          <Switch
            checked={settings.jesusPrayerSound}
            onChange={(value) => settings.set('jesusPrayerSound', value)}
            title={es.jesusPrayer.sound}
            description="Un tono muy leve cada diez oraciones."
          />
          <Switch
            checked={settings.jesusPrayerKeepAwake}
            onChange={(value) => settings.set('jesusPrayerKeepAwake', value)}
            title={es.jesusPrayer.keepAwake}
            description={
              counter.wakeLockSupported
                ? counter.wakeLockActive
                  ? es.prayerMode.wakeLockOn
                  : 'Se activará al comenzar a contar.'
                : es.prayerMode.wakeLockUnsupported
            }
          />
          <Switch
            checked={settings.prayerModeDark}
            onChange={(value) => settings.set('prayerModeDark', value)}
            title={es.jesusPrayer.darkMode}
            description="Fondo más oscuro alrededor del contador."
          />
        </Panel>
      </Section>

      <Section title={es.jesusPrayer.stats}>
        <div className="grid">
          <Panel variant="sunken">
            <p className="eyebrow">{es.jesusPrayer.today}</p>
            <p className="display" style={{ fontSize: 'var(--text-xl)' }}>{stats.data?.today ?? 0}</p>
          </Panel>
          <Panel variant="sunken">
            <p className="eyebrow">{es.jesusPrayer.week}</p>
            <p className="display" style={{ fontSize: 'var(--text-xl)' }}>{stats.data?.week ?? 0}</p>
          </Panel>
          <Panel variant="sunken">
            <p className="eyebrow">{es.jesusPrayer.total}</p>
            <p className="display" style={{ fontSize: 'var(--text-xl)' }}>{stats.data?.total ?? 0}</p>
          </Panel>
          <Panel variant="sunken">
            <p className="eyebrow">{es.jesusPrayer.sessions}</p>
            <p className="display" style={{ fontSize: 'var(--text-xl)' }}>{stats.data?.sessions ?? 0}</p>
          </Panel>
        </div>
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
                trailing={session.mode === 'chotki' ? <Tag>{es.jesusPrayer.chotki}</Tag> : null}
              />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
