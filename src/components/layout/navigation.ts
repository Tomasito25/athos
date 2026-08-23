/** Definición única de la navegación: la usan la barra inferior y la lateral. */
import type { ComponentType, SVGProps } from 'react';
import {
  IconBook,
  IconCalendar,
  IconHabits,
  IconHome,
  IconJournal,
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
  { to: '/diario', label: es.journal.title, icon: IconJournal },
  { to: '/habitos', label: es.habits.title, icon: IconHabits },
  { to: '/favoritos', label: es.favorites.title, icon: IconStar },
];

export const FOOTER_NAV: NavItem[] = [
  { to: '/configuracion', label: es.nav.settings, icon: IconSettings },
];

export const MORE_NAV: NavItem = { to: '/mas', label: es.nav.more, icon: IconMore };

export const SIDEBAR_GROUPS: Array<{ label?: string; items: NavItem[] }> = [
  { items: PRIMARY_NAV },
  { label: es.nav.personal, items: PERSONAL_NAV },
];
