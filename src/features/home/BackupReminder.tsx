/**
 * Recordar la copia de seguridad.
 *
 * Lo de cada uno —reglas, favoritos, avance— sólo vive en este dispositivo, y
 * Safari puede borrarlo si la web no se abre en semanas. Una vez al mes, si
 * hay algo que perder, se recuerda hacer una copia; se hace desde aquí mismo,
 * con un toque, o se aplaza otro mes.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import {
  backupReminderDue,
  downloadFile,
  exportBackup,
  markBackupDone,
  snoozeBackupReminder,
} from '@/db/backup';
import { toIsoDate } from '@/lib/calendar/jdn';
import { detectPlatform } from '@/lib/pwa';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function BackupReminder() {
  const toast = useUi((s) => s.toast);
  const toca = useAsync(() => backupReminderDue(), []);
  const [hecho, setHecho] = useState(false);
  if (!toca.data || hecho) return null;

  const copiar = async () => {
    const copia = await exportBackup();
    downloadFile(`athos-${toIsoDate(new Date())}.json`, JSON.stringify(copia, null, 2), 'application/json');
    await markBackupDone();
    setHecho(true);
    toast(es.backup.done);
  };

  const aplazar = async () => {
    await snoozeBackupReminder();
    setHecho(true);
  };

  return (
    <section className="backup-reminder" aria-labelledby="copia-titulo">
      <p className="eyebrow">{es.backup.eyebrow}</p>
      <h2 id="copia-titulo" className="backup-reminder__title">
        {es.backup.title}
      </h2>
      <p className="text-sm">{detectPlatform() === 'ios' ? es.backup.textIos : es.backup.text}</p>
      <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => void copiar()}>
          {es.backup.now}
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => void aplazar()}>
          {es.backup.later}
        </button>
        <Link to="/configuracion/datos" className="btn btn--ghost btn--sm">
          {es.backup.more}
        </Link>
      </div>
    </section>
  );
}
