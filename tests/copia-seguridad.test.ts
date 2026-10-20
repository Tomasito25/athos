/**
 * Recordar la copia de seguridad.
 *
 * Los datos sólo viven en el dispositivo y Safari puede borrarlos. Un aviso
 * periódico para exportar evita disgustos; pero sólo cuando hay algo que
 * perder, y sin insistir si se aplaza.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '@/db/db';
import { backupReminderDue, markBackupDone, snoozeBackupReminder } from '@/db/backup';
import { toggleFavorite } from '@/db/user';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

const ahora = new Date('2026-10-19T10:00:00Z');
const dias = (n: number) => new Date(ahora.getTime() + n * 86_400_000);

describe('el aviso de copia', () => {
  it('no sale si no hay nada que perder', async () => {
    expect(await backupReminderDue(ahora)).toBe(false);
  });

  it('sale en cuanto hay algo guardado y nunca se ha hecho copia', async () => {
    await toggleFavorite({ kind: 'prayer', refId: 'padre-nuestro', title: 'Padre nuestro', path: '/orar/oraciones/padre-nuestro' });
    expect(await backupReminderDue(ahora)).toBe(true);
  });

  it('tras una copia se calla un mes, y después vuelve', async () => {
    await toggleFavorite({ kind: 'prayer', refId: 'padre-nuestro', title: 'Padre nuestro', path: '/orar/oraciones/padre-nuestro' });
    await markBackupDone(ahora);
    expect(await backupReminderDue(dias(10))).toBe(false);
    expect(await backupReminderDue(dias(31))).toBe(true);
  });

  it('aplazado, no insiste hasta que pasa el plazo', async () => {
    await toggleFavorite({ kind: 'prayer', refId: 'padre-nuestro', title: 'Padre nuestro', path: '/orar/oraciones/padre-nuestro' });
    await snoozeBackupReminder(30, ahora);
    expect(await backupReminderDue(dias(5))).toBe(false);
    expect(await backupReminderDue(dias(31))).toBe(true);
  });
});
