/**
 * Oración de Jesús y komboskini: una pantalla, dos vistas.
 *
 * Eran dos pantallas casi iguales —el mismo contador, los mismos ajustes, el
 * mismo historial— que se diferenciaban en el dibujo: un aro que se llena
 * hacia un objetivo, o la cuerda con sus nudos y sus vueltas. Ahora es una
 * sola con las dos vistas, y la cuenta sigue al cambiar de una a otra.
 *
 * Se entra por `/orar/oracion-de-jesus` (el contador) o por
 * `/orar/komboskini` y `/orar/chotki` (la cuerda), que siguen funcionando
 * porque están en reglas, atajos y marcadores de la gente.
 *
 * Un contador sobrio: el texto grande, la cuenta, nada más. Las estadísticas
 * existen para recordar, no para competir.
 */
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useCounter, TARGETS } from './useCounter';
import { CounterView, RopeView } from './CounterView';
import { useAsync } from '@/hooks/useAsync';
import { listSessions, prayerStats } from '@/db/user';
import { useToday } from '@/hooks/useLiturgicalDay';
import { Button, ListRow, PageHead, Panel, Section, Segmented, Switch, Tag } from '@/components/ui';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import { formatDuration } from '@/lib/format';
import es from '@/locales/es';

type Vista = 'contador' | 'cuerda';

export function JesusPrayerPage() {
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const today = useToday();
  const toast = useUi((s) => s.toast);
  const settings = useSettings();

  const [vista, setVista] = useState<Vista>(() =>
    /\/(komboskini|chotki)/.test(pathname) ? 'cuerda' : 'contador',
  );
  const cuerda = vista === 'cuerda';

  const objetivo = params.get('objetivo') ? Number(params.get('objetivo')) : null;
  const counter = useCounter({
    mode: cuerda ? 'chotki' : 'jesus-prayer',
    formulaId: cuerda ? 'chotki' : 'jesus-prayer-es',
    // La cuerda tiene siempre un número de nudos; el contador puede ir sin objetivo.
    initialTarget: objetivo ?? (cuerda ? 100 : null),
  });
  const stats = useAsync(() => prayerStats(today), [today, counter.count === 0]);
  const sessions = useAsync(() => listSessions(10), [counter.count === 0]);
  const [custom, setCustom] = useState('');

  useEffect(() => {
    if (counter.complete && !cuerda) toast(es.jesusPrayer.completed.replace('{{count}}', String(counter.count)));
    // Sólo interesa el instante en que se alcanza el objetivo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter.complete]);

  const cambiarVista = (nueva: Vista) => {
    setVista(nueva);
    // La cuerda necesita nudos: si el contador iba sin objetivo, se le dan cien.
    if (nueva === 'cuerda' && counter.target === null) counter.setTarget(100);
  };

  const end = async (save: boolean) => {
    const saved = await counter.finish(save);
    stats.reload();
    sessions.reload();
    if (saved) toast(es.jesusPrayer.sessionSaved);
  };

  const nudos = counter.target ?? 100;
  const vueltas = Math.floor(counter.count / nudos);

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={cuerda ? 'Κομποσκοίνι' : undefined}
        title={es.jesusPrayer.title}
        subtitle={cuerda ? es.jesusPrayer.ropeSubtitle : undefined}
      />

      <Segmented<Vista>
        value={vista}
        label={es.jesusPrayer.view}
        options={[
          { value: 'contador', label: es.jesusPrayer.viewCounter },
          { value: 'cuerda', label: es.jesusPrayer.chotkiAlt },
        ]}
        onChange={cambiarVista}
      />

      <p
        className="display text-center"
        style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, margin: 'var(--sp-4) 0 var(--sp-5)' }}
      >
        {es.jesusPrayer.text}
      </p>

      {cuerda ? (
        <RopeView
          count={counter.count}
          knots={nudos}
          elapsed={counter.elapsed}
          laps={vueltas}
          onCount={counter.increment}
          dark={settings.prayerModeDark}
        />
      ) : (
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
      )}

      <div className="row row--wrap" style={{ marginTop: 'var(--sp-4)', justifyContent: 'center' }}>
        {TARGETS.map((value) => (
          <Button
            key={value}
            size="sm"
            variant={counter.target === value ? 'primary' : 'default'}
            onClick={() => counter.setTarget(counter.target === value && !cuerda ? null : value)}
          >
            {value}
            {cuerda ? ` ${es.jesusPrayer.knots}` : ''}
          </Button>
        ))}
        <input
          type="number"
          min={1}
          max={1000}
          className="input"
          style={{ width: '7rem' }}
          placeholder={es.jesusPrayer.custom}
          value={custom}
          aria-label={es.jesusPrayer.custom}
          onChange={(event) => {
            setCustom(event.target.value);
            const valor = event.target.value ? Math.max(1, Number(event.target.value) || 1) : null;
            counter.setTarget(valor ?? (cuerda ? 100 : null));
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

      <Section title={es.jesusPrayer.settings}>
        <Panel variant="quiet">
          <Switch
            checked={settings.jesusPrayerVibration}
            onChange={(value) => settings.set('jesusPrayerVibration', value)}
            title={es.jesusPrayer.vibration}
            description={
              counter.vibrationSupported ? es.jesusPrayer.vibrationHint : es.jesusPrayer.vibrationUnsupported
            }
          />
          <Switch
            checked={settings.jesusPrayerSound}
            onChange={(value) => settings.set('jesusPrayerSound', value)}
            title={es.jesusPrayer.sound}
            description={es.jesusPrayer.soundHint}
          />
          <Switch
            checked={settings.jesusPrayerKeepAwake}
            onChange={(value) => settings.set('jesusPrayerKeepAwake', value)}
            title={es.jesusPrayer.keepAwake}
            description={
              counter.wakeLockSupported
                ? counter.wakeLockActive
                  ? es.prayerMode.wakeLockOn
                  : es.jesusPrayer.keepAwakeHint
                : es.prayerMode.wakeLockUnsupported
            }
          />
          <Switch
            checked={settings.prayerModeDark}
            onChange={(value) => settings.set('prayerModeDark', value)}
            title={es.jesusPrayer.darkMode}
            description={es.jesusPrayer.darkModeHint}
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
