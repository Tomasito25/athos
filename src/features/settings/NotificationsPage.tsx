/**
 * Recordatorios locales.
 *
 * Cada recordatorio con su interruptor, su hora y lo que dirá la próxima vez,
 * agrupados por lo que piden: rezar, leer, lo que trae el día. Arriba, sin
 * adornos, qué llega y qué no en este dispositivo.
 */
import { useAsync } from '@/hooks/useAsync';
import {
  NOTIFICATIONS_LIMITATION_NOTE,
  notificationPermission,
  notificationsSupported,
  requestNotificationPermission,
  showNotification,
} from '@/lib/notifications';
import {
  REMINDERS,
  REMINDER_GROUPS,
  backgroundState,
  nextOccurrence,
  refreshReminders,
  timeFor,
  type ReminderDefinition,
  type ReminderGroup,
} from '@/lib/reminders';
import { Button, Notice, PageHead, Panel, Section, Switch } from '@/components/ui';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

const FONDO: Record<ReturnType<typeof backgroundState>, string> = {
  active: es.notifications.bgActive,
  'needs-install': es.notifications.bgNeedsInstall,
  unsupported: es.notifications.bgUnsupported,
  off: es.notifications.bgOff,
};

export function NotificationsPage() {
  const settings = useSettings();
  const toast = useUi((s) => s.toast);
  const permission = useAsync(async () => notificationPermission(), []);
  // Se recalcula cuando cambian los ajustes: la cola se rehace con ellos.
  const fondo = useAsync(async () => {
    await refreshReminders();
    return backgroundState();
  }, [settings.notifications, settings.notificationTimes, permission.data]);

  const supported = notificationsSupported();
  const granted = permission.data === 'granted';
  const grupos = Object.keys(REMINDER_GROUPS) as ReminderGroup[];

  return (
    <div className="page page--reading">
      <PageHead title={es.settings.notifications} subtitle={es.notifications.subtitle} />

      {!supported ? (
        <Notice variant="warn">{es.settings.notificationsUnsupported}</Notice>
      ) : permission.data === 'denied' ? (
        <Notice variant="warn">{es.settings.notificationsDenied}</Notice>
      ) : !granted ? (
        <Panel>
          <p className="muted text-sm">{es.notifications.permissionText}</p>
          <Button
            variant="primary"
            style={{ marginTop: 'var(--sp-3)' }}
            onClick={async () => {
              await requestNotificationPermission();
              permission.reload();
            }}
          >
            {es.settings.notificationsEnable}
          </Button>
        </Panel>
      ) : null}

      {supported && granted ? (
        <Panel variant="quiet">
          <p className="panel__title">{es.notifications.howTheyArrive}</p>
          <ul className="reminder-status">
            <li data-ok="si">{es.notifications.whenOpen}</li>
            <li data-ok={fondo.data === 'active' ? 'si' : 'no'}>
              {fondo.data ? FONDO[fondo.data] : es.notifications.bgChecking}
            </li>
          </ul>
        </Panel>
      ) : null}

      {grupos.map((grupo) => (
        <Section key={grupo} title={REMINDER_GROUPS[grupo]}>
          <div className="stack stack--tight">
            {REMINDERS.filter((r) => r.group === grupo).map((r) => (
              <ReminderRow
                key={r.id}
                reminder={r}
                enabled={settings.notifications[r.id] ?? false}
                time={timeFor(r.id, settings.notificationTimes)}
                onToggle={(value) => settings.toggleNotification(r.id, value)}
                onTime={(value) =>
                  settings.set('notificationTimes', { ...settings.notificationTimes, [r.id]: value })
                }
                refresh={fondo.data}
              />
            ))}
          </div>
        </Section>
      ))}

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <Button
          size="sm"
          disabled={!granted}
          onClick={async () => {
            const shown = await showNotification('ATHOS', es.notifications.testBody, 'prueba', '/configuracion/notificaciones');
            if (!shown) toast(es.notifications.testFailed);
          }}
        >
          {es.notifications.test}
        </Button>
      </div>

      <p className="source-note">{NOTIFICATIONS_LIMITATION_NOTE}</p>
    </div>
  );
}

function ReminderRow({
  reminder,
  enabled,
  time,
  onToggle,
  onTime,
  refresh,
}: {
  reminder: ReminderDefinition;
  enabled: boolean;
  time: string;
  onToggle: (value: boolean) => void;
  onTime: (value: string) => void;
  refresh: unknown;
}) {
  const proximo = useAsync(
    async () => (enabled ? nextOccurrence(reminder.id) : null),
    [enabled, time, reminder.id, refresh],
  );

  const cuando = proximo.data
    ? new Date(proximo.data.at).toLocaleString('es', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <Panel className={`reminder${enabled ? ' reminder--on' : ''}`}>
      <div className="reminder__head">
        <Switch
          checked={enabled}
          onChange={onToggle}
          title={reminder.title}
          description={reminder.description}
        />
        <label className="reminder__time">
          <span className="sr-only">
            {es.notifications.timeFor.replace('{{name}}', reminder.title)}
          </span>
          <input
            type="time"
            className="input"
            value={time}
            onChange={(e) => {
              if (/^\d{2}:\d{2}$/.test(e.target.value)) onTime(e.target.value);
            }}
          />
        </label>
      </div>
      {enabled && proximo.data ? (
        <p className="reminder__next">
          <span className="reminder__when">{cuando}</span> · {proximo.data.title}
          {proximo.data.needsApp ? '' : ` — ${proximo.data.body}`}
        </p>
      ) : enabled && proximo.data === null && !proximo.loading ? (
        <p className="reminder__next muted">{es.notifications.nothingSoon}</p>
      ) : null}
    </Panel>
  );
}
