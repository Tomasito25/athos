/**
 * Iconos de ATHOS.
 *
 * Trazo fino y uniforme, sin relleno: quieren parecerse a la línea de un
 * manuscrito, no a un icono de aplicación comercial.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Cruz ortodoxa de ocho puntas: el emblema de la aplicación. */
export const OrthodoxCross = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 2.5v19" />
    <path d="M9 6h6" />
    <path d="M6.5 10h11" />
    <path d="M8 17.5l8-3.4" />
  </Svg>
);

export const IconHome = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 21V10.5L12 4l8 6.5V21" />
    <path d="M9.5 21v-5.5h5V21" />
    <path d="M12 2v2.2" />
  </Svg>
);

export const IconPray = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3v8" />
    <path d="M9.6 5.6h4.8" />
    <circle cx="12" cy="15" r="6" />
    <path d="M8.4 19.8l1.1-1.5" />
  </Svg>
);

export const IconBook = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 4.5A1.5 1.5 0 015.5 3H11v17H5.5A1.5 1.5 0 014 18.5z" />
    <path d="M20 4.5A1.5 1.5 0 0018.5 3H13v17h5.5a1.5 1.5 0 001.5-1.5z" />
    <path d="M11 20h2" />
  </Svg>
);

export const IconCalendar = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17" />
    <path d="M8 3v4M16 3v4" />
    <path d="M12 12.5v4.5M10 14.2h4" />
  </Svg>
);

export const IconLibrary = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 20V5.5A1.5 1.5 0 015.5 4H8v16z" />
    <path d="M8 20V4h3.5v16z" />
    <path d="M14 20l3.4-14.6 2.6.6L16.6 20z" />
  </Svg>
);

export const IconSearch = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </Svg>
);

export const IconSettings = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.8v2.6M12 18.6v2.6M4.5 7.6l2.2 1.3M17.3 15.1l2.2 1.3M4.5 16.4l2.2-1.3M17.3 8.9l2.2-1.3" />
  </Svg>
);

export const IconStar = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3.6l2.4 5.2 5.6.7-4.1 3.9 1.1 5.6L12 16.2 6.9 19l1.1-5.6-4.1-3.9 5.6-.7z" />
  </Svg>
);

export const IconStarFilled = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M12 3.6l2.4 5.2 5.6.7-4.1 3.9 1.1 5.6L12 16.2 6.9 19l1.1-5.6-4.1-3.9 5.6-.7z" />
  </Svg>
);

export const IconBookmark = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" />
  </Svg>
);

export const IconNote = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 3.5h9.5L19 8v12.5H5z" />
    <path d="M14.5 3.5V8H19" />
    <path d="M8 12.5h7M8 16h4.5" />
  </Svg>
);

export const IconJournal = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 3.5h12.5v17H6a1.5 1.5 0 01-1.5-1.5V5A1.5 1.5 0 016 3.5z" />
    <path d="M8.5 3.5v17" />
    <path d="M11.5 9h4M11.5 13h4" />
  </Svg>
);

export const IconHabits = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
    <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
    <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
    <path d="M15 17.5l1.8 1.8 3.4-3.6" />
  </Svg>
);

export const IconChevronRight = (props: IconProps) => (
  <Svg {...props}>
    <path d="M9.5 5l7 7-7 7" />
  </Svg>
);

export const IconChevronLeft = (props: IconProps) => (
  <Svg {...props}>
    <path d="M14.5 5l-7 7 7 7" />
  </Svg>
);

export const IconChevronDown = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 9.5l7 7 7-7" />
  </Svg>
);

export const IconClose = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const IconPlus = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconCheck = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Svg>
);

export const IconTrash = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4.5 6.5h15" />
    <path d="M9 6.5V4.5h6v2" />
    <path d="M6.5 6.5l1 13h9l1-13" />
    <path d="M10.5 10v6M13.5 10v6" />
  </Svg>
);

export const IconEdit = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 20h4l10-10-4-4L4 16z" />
    <path d="M13.5 5.5l4 4" />
  </Svg>
);

export const IconMoon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z" />
  </Svg>
);

export const IconSun = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4" />
  </Svg>
);

export const IconCandle = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 2.5c1.6 1.7 2.2 2.9 2.2 4a2.2 2.2 0 11-4.4 0c0-1.1.6-2.3 2.2-4z" />
    <path d="M8.5 9.5h7v11h-7z" />
    <path d="M8.5 13.5h7" />
  </Svg>
);

export const IconChotki = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="12" cy="4.5" r="1.1" fill="currentColor" />
    <circle cx="19.5" cy="12" r="1.1" fill="currentColor" />
    <circle cx="12" cy="19.5" r="1.1" fill="currentColor" />
    <circle cx="4.5" cy="12" r="1.1" fill="currentColor" />
  </Svg>
);

export const IconScroll = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6.5 4.5h11v15h-11z" />
    <path d="M6.5 4.5a2 2 0 010 4M17.5 19.5a2 2 0 010-4" />
    <path d="M9.5 9.5h5M9.5 13h5" />
  </Svg>
);

export const IconMonastery = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3.5 20.5V12l4-3 4 3v8.5" />
    <path d="M11.5 20.5V9l5-3.5L21.5 9v11.5" />
    <path d="M16.5 2v2" />
    <path d="M15.2 3h2.6" />
    <path d="M15 20.5v-4h3v4" />
  </Svg>
);

export const IconFast = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 3v7a2.5 2.5 0 005 0V3" />
    <path d="M8.5 10v11" />
    <path d="M17 3c-1.4 1.6-2 3.6-2 6 0 1.8.6 2.8 2 3v9" />
  </Svg>
);

export const IconDownload = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3.5v11" />
    <path d="M7.5 10.5l4.5 4.5 4.5-4.5" />
    <path d="M4.5 19.5h15" />
  </Svg>
);

export const IconUpload = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 15.5v-11" />
    <path d="M7.5 8.5L12 4l4.5 4.5" />
    <path d="M4.5 19.5h15" />
  </Svg>
);

export const IconLock = (props: IconProps) => (
  <Svg {...props}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="1.5" />
    <path d="M8 10V7a4 4 0 018 0v3" />
    <path d="M12 14v2.5" />
  </Svg>
);

export const IconBell = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 10a6 6 0 0112 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" />
    <path d="M10 19a2 2 0 004 0" />
  </Svg>
);

export const IconInfo = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.5" />
    <circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconInstall = (props: IconProps) => (
  <Svg {...props}>
    <rect x="6" y="2.5" width="12" height="19" rx="2" />
    <path d="M12 7v7" />
    <path d="M9.2 11.2L12 14l2.8-2.8" />
  </Svg>
);

export const IconDrag = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="9" cy="6" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="6" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="18" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconReset = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 12a8 8 0 108-8 8 8 0 00-5.7 2.4L4 8.5" />
    <path d="M4 4v4.5h4.5" />
  </Svg>
);

export const IconMore = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </Svg>
);

/* ============================================================
   Iconos de los momentos de oración
   ============================================================ */

/** La puerta de casa, y también las puertas reales del iconostasio. */
export const IconDoor = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 21V8a7 7 0 0114 0v13" />
    <path d="M3 21h18" />
    <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
  </Svg>
);

/** La prósfora: el pan redondo con su sello cuadrado. */
export const IconBread = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <rect x="8.5" y="8.5" width="7" height="7" rx="0.5" />
    <path d="M12 8.5v7M8.5 12h7" />
  </Svg>
);

/** El cáliz. */
export const IconChalice = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6.5 4h11l-1 5.5A4.6 4.6 0 0112 13a4.6 4.6 0 01-4.5-3.5z" />
    <path d="M12 13v5M8.5 21h7" />
    <path d="M9.5 18h5" />
  </Svg>
);

/** La cruz ortodoxa de tres travesaños. */
export const IconCross = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3v18" />
    <path d="M8.5 6.5h7" />
    <path d="M6 10.5h12" />
    <path d="M8 16.5l8-2.5" />
  </Svg>
);

/** El camino que se estrecha hacia el horizonte. */
export const IconPath = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 21l4-16M18 21l-4-16" />
    <path d="M12 18.5v-2.5M12 12.5v-2.5M12 6.5v-1" />
  </Svg>
);

/** Los otros. */
export const IconPeople = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0111 0" />
    <path d="M16 5.5a3 3 0 010 5.5" />
    <path d="M17.5 14.5a5.5 5.5 0 013 5.5" />
  </Svg>
);

/** La mano que bendice. */
export const IconBlessing = (props: IconProps) => (
  <Svg {...props}>
    <path d="M7 12V5.5a1.5 1.5 0 013 0V11" />
    <path d="M10 10.5V4.5a1.5 1.5 0 013 0V11" />
    <path d="M13 10.5V6a1.5 1.5 0 013 0v6" />
    <path d="M16 9.5a1.5 1.5 0 013 0V15a6 6 0 01-6 6h-1a6 6 0 01-6-6v-1l-1.6-2.2a1.5 1.5 0 012.4-1.8L7 12" />
  </Svg>
);

/** La sepultura: la cruz sobre el túmulo. */
export const IconTomb = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 4v9M9.5 7h5" />
    <path d="M3.5 20c2-3 5-4.5 8.5-4.5S18.5 17 20.5 20z" />
  </Svg>
);

/** El aceite del santo óleo. */
export const IconHealing = (props: IconProps) => (
  <Svg {...props}>
    <path d="M10 3h4v3h-4z" />
    <path d="M9 6h6l1 12a3 3 0 01-3 3h-2a3 3 0 01-3-3z" />
    <path d="M12 11v5M9.5 13.5h5" />
  </Svg>
);

/** El escudo de la fe. */
export const IconShield = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3l7.5 3v5.5c0 4.5-3 8.2-7.5 9.5-4.5-1.3-7.5-5-7.5-9.5V6z" />
    <path d="M12 8v6M9 11h6" />
  </Svg>
);

/** Lo hondo: «desde lo hondo clamé a Ti». */
export const IconDeep = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3 9c2.2 0 2.2 2 4.5 2S9.7 9 12 9s2.2 2 4.5 2S18.7 9 21 9" />
    <path d="M3 14c2.2 0 2.2 2 4.5 2s2.2-2 4.5-2 2.2 2 4.5 2 2.2-2 4.5-2" />
    <path d="M3 19c2.2 0 2.2 2 4.5 2s2.2-2 4.5-2 2.2 2 4.5 2 2.2-2 4.5-2" />
    <path d="M12 3v3" />
  </Svg>
);

/** El templo: la cúpula con su cruz. */
export const IconChurch = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 2v3M10.5 3.5h3" />
    <path d="M8 11a4 4 0 018 0" />
    <path d="M8 11v10M16 11v10" />
    <path d="M4 21V13l4-2M20 21v-8l-4-2" />
    <path d="M3 21h18" />
    <path d="M12 21v-5a1.6 1.6 0 00-1.6 1.6V21z" />
  </Svg>
);

/** El trabajo de las manos. */
export const IconWork = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3" y="7.5" width="18" height="12" rx="2" />
    <path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5" />
    <path d="M3 12.5h18" />
  </Svg>
);

/** La espiga: acción de gracias por lo recibido. */
export const IconWheat = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 21V9" />
    <path d="M12 9c0-2 1.2-3.5 3-4-.2 2-1.2 3.5-3 4z" />
    <path d="M12 9c0-2-1.2-3.5-3-4 .2 2 1.2 3.5 3 4z" />
    <path d="M12 14c0-2 1.2-3.5 3-4-.2 2-1.2 3.5-3 4z" />
    <path d="M12 14c0-2-1.2-3.5-3-4 .2 2 1.2 3.5 3 4z" />
  </Svg>
);

/** La familia: el grande y el pequeño. */
export const IconFamily = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="8" cy="6.5" r="2.5" />
    <path d="M3.5 20a4.5 4.5 0 019 0" />
    <circle cx="16.5" cy="11" r="2" />
    <path d="M13 20a3.5 3.5 0 017 0" />
  </Svg>
);

/** El ramo de olivo: por los que nos hacen daño. */
export const IconBranch = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 21c0-8 4-13 11-15" />
    <path d="M13 5.5c1.6-.6 3.2-.2 4 1-1.4 1-3 1-4-1z" />
    <path d="M10 9.5c1.6-.6 3.2-.2 4 1-1.4 1-3 1-4-1z" />
    <path d="M7.5 14c1.6-.6 3.2-.2 4 1-1.4 1-3 1-4-1z" />
  </Svg>
);
