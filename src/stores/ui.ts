/** Estado efímero de la interfaz: modo oración, búsqueda y avisos. */
import { create } from 'zustand';

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
