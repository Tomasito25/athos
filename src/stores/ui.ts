/** Estado efímero de la interfaz: modo oración, búsqueda y avisos. */
import { create } from 'zustand';
import {
  enterFullscreen,
  exitFullscreen,
  isFullscreen,
  shouldGoFullscreen,
} from '@/lib/fullscreen';

export interface Toast {
  id: string;
  message: string;
  action?: { label: string; run: () => void };
  duration?: number;
}

interface UiState {
  prayerMode: boolean;
  searchOpen: boolean;
  toasts: Toast[];
  installEvent: BeforeInstallPromptEvent | null;

  setPrayerMode(on: boolean): void;
  togglePrayerMode(): void;
  setSearchOpen(open: boolean): void;
  toast(message: string, options?: Omit<Toast, 'id' | 'message'>): void;
  dismissToast(id: string): void;
  setInstallEvent(event: BeforeInstallPromptEvent | null): void;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

let counter = 0;

export const useUi = create<UiState>((set, get) => ({
  prayerMode: false,
  searchOpen: false,
  toasts: [],
  installEvent: null,

  setPrayerMode: (on) => {
    set({ prayerMode: on });
    if (on) document.documentElement.dataset.prayerMode = 'on';
    else delete document.documentElement.dataset.prayerMode;

    /*
     * En el móvil, además, pantalla completa.
     *
     * El modo oración esconde las barras de ATHOS; las del navegador las
     * esconde esto. Se pide sin esperar la respuesta: si el navegador se
     * niega —o si es un iPhone, donde no se puede—, el modo oración sigue
     * funcionando igual, sólo que con las barras del navegador puestas.
     *
     * Al salir se deshace siempre, aunque no lo hubiéramos pedido nosotros:
     * dejar al usuario en pantalla completa fuera del modo oración sería
     * dejarlo sin la barra de direcciones y sin saber por qué.
     */
    if (on) {
      if (shouldGoFullscreen()) void enterFullscreen();
    } else if (isFullscreen()) {
      void exitFullscreen();
    }
  },
  togglePrayerMode: () => get().setPrayerMode(!get().prayerMode),
  setSearchOpen: (searchOpen) => set({ searchOpen }),

  toast: (message, options) => {
    const id = `toast-${++counter}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, ...options }] }));
    const duration = options?.duration ?? 4200;
    if (duration > 0) {
      setTimeout(() => get().dismissToast(id), duration);
    }
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  setInstallEvent: (installEvent) => set({ installEvent }),
}));
