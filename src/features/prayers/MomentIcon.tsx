/**
 * El signo de cada momento.
 *
 * Traduce el nombre que guarda `MOMENT_ICONS` al icono correspondiente. Vive
 * aparte del contenido para que `src/content/` no dependa de React.
 */
import {
  IconBlessing,
  IconBook,
  IconBranch,
  IconBread,
  IconCandle,
  IconChalice,
  IconChurch,
  IconCross,
  IconDeep,
  IconDoor,
  IconFamily,
  IconHealing,
  IconMoon,
  IconPath,
  IconPeople,
  IconPray,
  IconScroll,
  IconShield,
  IconSun,
  IconTomb,
  IconWheat,
  IconWork,
} from '@/components/icons';
import { MOMENT_ICONS } from '@/content/moments';
import type { PrayerCategoryId } from '@/types';

const ICONOS = {
  sun: IconSun,
  moon: IconMoon,
  door: IconDoor,
  work: IconWork,
  book: IconBook,
  bread: IconBread,
  chalice: IconChalice,
  path: IconPath,
  cross: IconCross,
  candle: IconCandle,
  shield: IconShield,
  deep: IconDeep,
  wheat: IconWheat,
  people: IconPeople,
  family: IconFamily,
  branch: IconBranch,
  blessing: IconBlessing,
  healing: IconHealing,
  tomb: IconTomb,
  church: IconChurch,
  scroll: IconScroll,
  pray: IconPray,
} as const;

export function MomentIcon({ id, size = 22 }: { id: PrayerCategoryId; size?: number }) {
  const Icono = ICONOS[MOMENT_ICONS[id] as keyof typeof ICONOS] ?? IconPray;
  return <Icono size={size} />;
}
