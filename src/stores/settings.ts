/**
 * Preferencias del usuario.
 *
 * Se guardan en localStorage con la clave `athos.appearance`, que es la misma
 * que lee el script insertado en index.html antes del primer pintado: así el
 * tema correcto se aplica sin destello.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CalendarStyle } from '@/types';

export type ThemeChoice = 'light' | 'dark' | 'system';
export type MeasureChoice = 'narrow' | 'normal' | 'wide';

/** Cómo se muestran las fórmulas que ATHOS trae también en griego. */
export type GreekMode = 'oculto' | 'griego' | 'ambos';

export interface SettingsState {
  theme: ThemeChoice;
  fontScale: number;
  lineHeight: number;
  measure: MeasureChoice;
  paperMode: boolean;
  serifUi: boolean;
  highContrast: boolean;
  greekMode: GreekMode;
  /** Cómo se reza un oficio: de corrido o un paso cada vez. */
  officeFlow: 'seguido' | 'paso';

  calendarStyle: CalendarStyle;
  language: string;

  /** Hora a la que empieza cada oficio. La noche se extiende hasta la mañana. */
  officeHours: { manana: number; mediodia: number; noche: number };

  jesusPrayerVibration: boolean;
  jesusPrayerSound: boolean;
  jesusPrayerKeepAwake: boolean;
  prayerModeDark: boolean;

  notifications: Record<string, boolean>;
  installPromptDismissed: boolean;
  autoIndexBible: boolean;

  set<K extends keyof SettingsState>(key: K, value: SettingsState[K]): void;
  toggleNotification(id: string, enabled: boolean): void;
  reset(): void;
}

export const DEFAULT_SETTINGS = {
  theme: 'system' as ThemeChoice,
  fontScale: 1,
  lineHeight: 1.65,
  measure: 'normal' as MeasureChoice,
  paperMode: false,
  serifUi: false,
  highContrast: false,
  greekMode: 'ambos' as GreekMode,
  // Un paso cada vez: es como se reza un oficio con el teléfono en la mano.
  officeFlow: 'paso' as 'seguido' | 'paso',
  calendarStyle: 'nuevo' as CalendarStyle,
  language: 'es',
  officeHours: { manana: 5, mediodia: 12, noche: 19 },
  jesusPrayerVibration: true,
  jesusPrayerSound: false,
  jesusPrayerKeepAwake: true,
  prayerModeDark: true,
  notifications: {} as Record<string, boolean>,
  installPromptDismissed: false,
  autoIndexBible: true,
};

export const MEASURE_WIDTHS: Record<MeasureChoice, string> = {
  narrow: '28rem',
  normal: '34rem',
  wide: '42rem',
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      set: (key, value) => set({ [key]: value } as Partial<SettingsState>),
      toggleNotification: (id, enabled) =>
        set((state) => ({ notifications: { ...state.notifications, [id]: enabled } })),
      reset: () => set({ ...DEFAULT_SETTINGS }),
    }),
    {
      name: 'athos.appearance',
      version: 1,
      partialize: ({ set: _set, toggleNotification: _t, reset: _r, ...rest }) => rest,
    },
  ),
);

/** Vuelca las preferencias visuales en el elemento raíz. */
export function applySettingsToDocument(state: SettingsState): void {
  const root = document.documentElement;
  const dark =
    state.theme === 'dark' ||
    (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  root.dataset.theme = dark ? 'dark' : 'light';
  root.style.setProperty('--user-font-scale', String(state.fontScale));
  root.style.setProperty('--user-line-height', String(state.lineHeight));
  root.style.setProperty('--measure', MEASURE_WIDTHS[state.measure]);

  if (state.highContrast) root.dataset.contrast = 'high';
  else delete root.dataset.contrast;

  if (state.serifUi) root.dataset.uiFont = 'serif';
  else delete root.dataset.uiFont;

  if (state.paperMode) root.dataset.reading = 'paper';
  else delete root.dataset.reading;

  // El color de la barra del sistema sigue al tema.
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  const color = dark ? '#100d0a' : '#f2e9d8';
  if (meta) meta.content = color;
  else {
    const created = document.createElement('meta');
    created.name = 'theme-color';
    created.content = color;
    document.head.append(created);
  }
}
