/** Definición única de la navegación: la usan la barra inferior y la lateral. */
import type { ComponentType, SVGProps } from 'react';
import {
  IconBook,
  IconCalendar,
  IconHome,
  IconLibrary,
  IconMore,
  IconPray,
  IconSettings,
  IconStar,
} from '@/components/icons';
import es from '@/locales/es';

export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  /** Rutas que también deben marcar este elemento como activo. */
  match?: string[];
  end?: boolean;
}

export const PRIMARY_NAV: NavItem[] = [
  { to: '/', label: es.nav.home, icon: IconHome, end: true },
  { to: '/orar', label: es.nav.pray, icon: IconPray },
  { to: '/leer', label: es.nav.read, icon: IconBook },
  { to: '/calendario', label: es.nav.calendar, icon: IconCalendar },
  { to: '/biblioteca', label: es.nav.library, icon: IconLibrary },
];

export const PERSONAL_NAV: NavItem[] = [
  { to: '/favoritos', label: es.favorites.title, icon: IconStar },
];

export const FOOTER_NAV: NavItem[] = [
  // En el escritorio no hay barra inferior ni botón de «Más» a mano: sin esto,
  // el mapa de la aplicación sólo se alcanzaba escribiendo la dirección.
  { to: '/mas', label: es.nav.more, icon: IconMore },
  { to: '/configuracion', label: es.nav.settings, icon: IconSettings },
];

export const MORE_NAV: NavItem = { to: '/mas', label: es.nav.more, icon: IconMore };

export const SIDEBAR_GROUPS: Array<{ label?: string; items: NavItem[] }> = [
  { items: PRIMARY_NAV },
  { label: es.favorites.title, items: PERSONAL_NAV },
];


/* ============================================================
   El mapa de la aplicación
   ============================================================ */

export interface MapEntry {
  to: string;
  label: string;
  hint?: string;
}

export interface MapGroup {
  title: string;
  entries: MapEntry[];
}

/**
 * Todo lo que hay, en una sola pantalla.
 *
 * La barra inferior lleva a cinco portadas y desde cada una hay que adivinar
 * qué contiene. Este mapa es el sitio donde no hay que adivinar nada: si
 * existe en ATHOS, está aquí. Sirve para llegar de una vez a lo que está a
 * tres toques, y para descubrir lo que uno no sabía que estaba.
 *
 * La biblioteca no se escribe aquí: se lee de `LIBRARY_GROUPS`, que es donde
 * ya vive. Así una sección nueva aparece en el mapa sola.
 */
export const APP_MAP: MapGroup[] = [
  {
    title: es.nav.pray,
    entries: [
      { to: '/orar', label: es.nav.pray, hint: 'Los tres momentos del día' },
      { to: '/orar/oraciones', label: es.prayers.title, hint: 'Por momento del día y por necesidad' },
      { to: '/orar/regla', label: es.rule.title, hint: 'La tuya, editable paso a paso' },
      { to: '/orar/oracion-de-jesus', label: es.jesusPrayer.title },
      { to: '/orar/komboskini', label: 'Komboskini', hint: 'El cordón de nudos, con contador' },
      { to: '/orar/mis-oraciones', label: 'Mis oraciones' },
    ],
  },
  {
    title: es.nav.read,
    entries: [
      { to: '/leer/biblia', label: es.bible.title },
      { to: '/leer/salterio', label: es.psalter.title, hint: 'Los 150 salmos y las veinte kathismata' },
      { to: '/leer/lecturas', label: es.calendar.readings, hint: 'Las del día, según el leccionario' },
      { to: '/leer/planes', label: es.plans.title },
    ],
  },
  {
    title: es.nav.calendar,
    entries: [
      { to: '/calendario', label: es.calendar.title },
      { to: '/calendario/santos', label: es.saints.title },
      { to: '/calendario/fiestas', label: es.calendar.feasts },
      { to: '/calendario/ayuno', label: es.fasting.title },
    ],
  },
];
