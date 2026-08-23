/**
 * Sesión del diario.
 *
 * El PIN vive únicamente en memoria mientras el diario está desbloqueado: no se
 * guarda en disco ni en localStorage. Al recargar la página hay que volver a
 * introducirlo, que es exactamente lo que debe ocurrir.
 */
import { create } from 'zustand';
import { getSetting, setSetting } from '@/db/db';
import { newSalt, pinDigest } from '@/lib/crypto';

export interface JournalLockConfig {
  enabled: boolean;
  salt: string;
  digest: string;
  encrypt: boolean;
}

const LOCK_KEY = 'journal.lock';

export async function getLockConfig(): Promise<JournalLockConfig | null> {
  return getSetting<JournalLockConfig | null>(LOCK_KEY, null);
}

export async function setLockPin(pin: string, encrypt: boolean): Promise<JournalLockConfig> {
  const salt = newSalt();
  const config: JournalLockConfig = {
    enabled: true,
    salt,
    digest: await pinDigest(pin, salt),
    encrypt,
  };
  await setSetting(LOCK_KEY, config);
  return config;
}

export async function clearLock(): Promise<void> {
  await setSetting<JournalLockConfig | null>(LOCK_KEY, null);
}

export async function verifyPin(pin: string): Promise<boolean> {
  const config = await getLockConfig();
  if (!config?.enabled) return true;
  return (await pinDigest(pin, config.salt)) === config.digest;
}

interface JournalSession {
  unlocked: boolean;
  pin: string | null;
  unlock(pin: string): void;
  lock(): void;
}

export const useJournalSession = create<JournalSession>((set) => ({
  unlocked: false,
  pin: null,
  unlock: (pin) => set({ unlocked: true, pin }),
  lock: () => set({ unlocked: false, pin: null }),
}));
