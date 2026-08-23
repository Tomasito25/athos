/** Recordatorios locales. */
import { useAsync } from '@/hooks/useAsync';
import {
  NOTIFICATIONS_LIMITATION_NOTE,
  REMINDERS,
  cancelReminder,
  notificationPermission,
  notificationsSupported,
  requestNotificationPermission,
  scheduleReminder,
  showNotification,
} from '@/lib/notifications';
import { Button, Notice, PageHead, Panel, Section, Switch } from '@/components/ui';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function NotificationsPage() {
  const settings = useSettings();
  const toast = useUi((s) => s.toast);
  const permission = useAsync(async () => notificationPermission(), []);

  const supported = notificationsSupported();
  const granted = permission.data === 'granted';

  return (
    <div className="page page--reading">
      <PageHead title={es.settings.notifications} />

      {!supported ? (
        <Notice variant="warn">{es.settings.notificationsUnsupported}</Notice>
      ) : permission.data === 'denied' ? (
        <Notice variant="warn">{es.settings.notificationsDenied}</Notice>
      ) : !granted ? (
        <Panel>
          <p className="muted text-sm">
            Para recibir recordatorios hay que dar permiso al navegador. Puedes retirarlo cuando
            quieras desde los ajustes del sitio.
          </p>
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
      ) : (
        <Notice>Los recordatorios están permitidos en este dispositivo.</Notice>
      )}

      <Section title="Recordatorios">
        <Panel>
          {REMINDERS.map((reminder) => {
            const enabled = settings.notifications[reminder.id] ?? false;
            return (
              <Switch
                key={reminder.id}
                checked={enabled}
                onChange={(value) => {
                  settings.toggleNotification(reminder.id, value);
                  if (value && granted) scheduleReminder(reminder);
                  else cancelReminder(reminder.id);
                }}
                title={`${reminder.title} · ${reminder.defaultTime}`}
                description={reminder.description}
              />
            );
          })}

          <Button
            size="sm"
            style={{ marginTop: 'var(--sp-4)' }}
            disabled={!granted}
            onClick={async () => {
              const shown = await showNotification(
                'ATHOS',
                'Así se verán los recordatorios.',
                'prueba',
              );
              if (!shown) toast('El navegador no ha mostrado la notificación');
            }}
          >
            Probar una notificación
          </Button>
        </Panel>
      </Section>

      <p className="source-note">{NOTIFICATIONS_LIMITATION_NOTE}</p>
    </div>
  );
}
