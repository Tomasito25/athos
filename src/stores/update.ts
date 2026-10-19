/**
 * El estado de las actualizaciones.
 *
 * Lo llena el gestor del Service Worker (`UpdateBanner`) y lo leen el aviso y
 * la ficha «Acerca de», que tiene el botón de buscar a mano. Las funciones
 * `check` y `apply` también las pone el gestor: fuera de él, o en un
 * navegador sin Service Worker, no hacen nada y lo dicen.
 */
import { create } from 'zustand';

export type UpdateStatus =
  /** Aún no se ha mirado en esta sesión. */
  | 'idle'
  | 'checking'
  /** Hay una versión nueva bajándose. */
  | 'downloading'
  /** Hay una versión nueva lista para instalar. */
  | 'available'
  /** Se ha mirado y no hay nada nuevo. */
  | 'current'
  | 'offline'
  /** Este navegador no tiene Service Worker, o la aplicación corre en desarrollo. */
  | 'unsupported'
  | 'error'
  /** Se está instalando: la página se va a recargar. */
  | 'applying';

const CLAVE_ULTIMA = 'athos.update.lastCheck';

function leerUltima(): string | null {
  try {
    return localStorage.getItem(CLAVE_ULTIMA);
  } catch {
    return null;
  }
}

interface UpdateState {
  status: UpdateStatus;
  /** Cuándo se miró por última vez, en ISO. */
  lastCheck: string | null;
  /** El aviso se ha dejado para luego en esta sesión. */
  postponed: boolean;
  /**
   * Otra ventana aplicó la versión nueva y ésta sigue con el código viejo.
   * Se recarga en cuanto se sale de lo que se está rezando.
   */
  outdated: boolean;
  setStatus(status: UpdateStatus): void;
  markChecked(): void;
  postpone(): void;
  check(): Promise<void>;
  apply(): Promise<void>;
}

export const useUpdate = create<UpdateState>()((set) => ({
  status: 'idle',
  lastCheck: leerUltima(),
  postponed: false,
  outdated: false,
  setStatus: (status) => set({ status }),
  markChecked: () => {
    const ahora = new Date().toISOString();
    try {
      localStorage.setItem(CLAVE_ULTIMA, ahora);
    } catch {
      // Sin almacenamiento local se sigue igual; sólo no se recuerda la hora.
    }
    set({ lastCheck: ahora });
  },
  postpone: () => set({ postponed: true }),
  check: async () => set({ status: 'unsupported' }),
  apply: async () => {},
}));

/* ---------------- La última versión vista ---------------- */

const CLAVE_VISTA = 'athos.version.seen';

/**
 * Si hay que enseñar las novedades al arrancar.
 *
 * La primera vez que se abre ATHOS no hay novedades que contar: se apunta la
 * versión y nada más. Quien ya la usaba antes de que existiera esta marca
 * —se sabe porque ya cerró la bienvenida— sí las ve.
 */
export function pendingNews(current: string, returningUser: boolean): boolean {
  let vista: string | null;
  try {
    vista = localStorage.getItem(CLAVE_VISTA);
  } catch {
    return false;
  }
  if (vista === current) return false;
  if (vista === null && !returningUser) {
    markNewsSeen(current);
    return false;
  }
  return true;
}

export function markNewsSeen(current: string): void {
  try {
    localStorage.setItem(CLAVE_VISTA, current);
  } catch {
    // Igual que arriba: sin almacenamiento, las novedades se enseñarán otra vez.
  }
}
