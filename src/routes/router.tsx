/**
 * Rutas de ATHOS.
 *
 * Cada pantalla se carga bajo demanda: la aplicación arranca con lo justo y el
 * resto llega cuando hace falta, lo que importa en un móvil modesto.
 */
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { HomePage } from '@/features/home/HomePage';
import { ErrorPage } from '@/features/error/ErrorPage';

const page = (loader: () => Promise<Record<string, unknown>>, name: string) => async () => {
  const module = await loader();
  return { Component: module[name] as React.ComponentType };
};

/** Las rutas se exportan aparte para poder montarlas en las pruebas. */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },

      /* ---------------- Orar ---------------- */
      { path: 'orar', lazy: page(() => import('@/features/pray/PrayHub'), 'PrayHub') },
      { path: 'orar/oraciones', lazy: page(() => import('@/features/prayers/PrayersPage'), 'PrayersPage') },
      { path: 'orar/oraciones/todas', lazy: page(() => import('@/features/prayers/AllPrayersPage'), 'AllPrayersPage') },
      { path: 'orar/oraciones/categoria/:categoryId', lazy: page(() => import('@/features/prayers/PrayerCategoryPage'), 'PrayerCategoryPage') },
      { path: 'orar/oraciones/:prayerId', lazy: page(() => import('@/features/prayers/PrayerPage'), 'PrayerPage') },
      { path: 'orar/oficio/:time', lazy: page(() => import('@/features/office/OfficePage'), 'OfficePage') },
      { path: 'orar/mis-oraciones', lazy: page(() => import('@/features/office/MyPrayersPage'), 'MyPrayersPage') },
      { path: 'orar/regla', lazy: page(() => import('@/features/rule/RulePage'), 'RulePage') },
      { path: 'orar/regla/editar/:ruleId', lazy: page(() => import('@/features/rule/RuleEditorPage'), 'RuleEditorPage') },
      { path: 'orar/oracion-de-jesus', lazy: page(() => import('@/features/jesus-prayer/JesusPrayerPage'), 'JesusPrayerPage') },
      { path: 'orar/komboskini', lazy: page(() => import('@/features/jesus-prayer/ChotkiPage'), 'ChotkiPage') },
      { path: 'orar/chotki', lazy: page(() => import('@/features/jesus-prayer/ChotkiPage'), 'ChotkiPage') },

      /* ---------------- Leer ---------------- */
      { path: 'leer', lazy: page(() => import('@/features/read/ReadHub'), 'ReadHub') },
      { path: 'leer/biblia', lazy: page(() => import('@/features/bible/BiblePage'), 'BiblePage') },
      { path: 'leer/biblia/:bookId', lazy: page(() => import('@/features/bible/BookPage'), 'BookPage') },
      { path: 'leer/biblia/:bookId/:chapter', lazy: page(() => import('@/features/bible/ChapterPage'), 'ChapterPage') },
      { path: 'leer/salterio', lazy: page(() => import('@/features/psalter/PsalterPage'), 'PsalterPage') },
      { path: 'leer/salterio/kathisma/:number', lazy: page(() => import('@/features/psalter/KathismaPage'), 'KathismaPage') },
      { path: 'leer/salterio/:number', lazy: page(() => import('@/features/psalter/PsalmPage'), 'PsalmPage') },
      { path: 'leer/lecturas', lazy: page(() => import('@/features/readings/ReadingsPage'), 'ReadingsPage') },

      /* ---------------- Calendario ---------------- */
      { path: 'calendario', lazy: page(() => import('@/features/calendar/CalendarPage'), 'CalendarPage') },
      { path: 'calendario/dia/:date', lazy: page(() => import('@/features/calendar/DayPage'), 'DayPage') },
      { path: 'calendario/santos', lazy: page(() => import('@/features/saints/SaintsPage'), 'SaintsPage') },
      { path: 'calendario/santos/:saintId', lazy: page(() => import('@/features/saints/SaintPage'), 'SaintPage') },
      { path: 'calendario/ayuno', lazy: page(() => import('@/features/fasting/FastingPage'), 'FastingPage') },
      { path: 'calendario/fiestas', lazy: page(() => import('@/features/calendar/FeastsPage'), 'FeastsPage') },

      /* ---------------- Biblioteca ---------------- */
      { path: 'biblioteca', lazy: page(() => import('@/features/library/LibraryHub'), 'LibraryHub') },
      { path: 'biblioteca/liturgia', lazy: page(() => import('@/features/library/OfficesPage'), 'OfficesPage') },
      { path: 'biblioteca/liturgia/:officeId', lazy: page(() => import('@/features/library/OfficePage'), 'OfficePage') },
      { path: 'biblioteca/akathistos', lazy: page(() => import('@/features/library/AkathistsPage'), 'AkathistsPage') },
      { path: 'biblioteca/akathistos/:akathistId', lazy: page(() => import('@/features/library/AkathistPage'), 'AkathistPage') },
      { path: 'biblioteca/canones', lazy: page(() => import('@/features/library/CanonsPage'), 'CanonsPage') },
      { path: 'biblioteca/canones/:canonId', lazy: page(() => import('@/features/library/CanonPage'), 'CanonPage') },
      { path: 'biblioteca/padres', lazy: page(() => import('@/features/fathers/FathersPage'), 'FathersPage') },
      { path: 'biblioteca/padres/:fatherId', lazy: page(() => import('@/features/fathers/FatherPage'), 'FatherPage') },
      { path: 'biblioteca/padres/:fatherId/:workId', lazy: page(() => import('@/features/fathers/WorkPage'), 'WorkPage') },
      { path: 'biblioteca/athos', lazy: page(() => import('@/features/athos/AthosPage'), 'AthosPage') },
      { path: 'biblioteca/athos/monasterio/:monasteryId', lazy: page(() => import('@/features/athos/MonasteryPage'), 'MonasteryPage') },
      { path: 'biblioteca/athos/:articleId', lazy: page(() => import('@/features/athos/AthosArticlePage'), 'AthosArticlePage') },
      { path: 'biblioteca/historia', lazy: page(() => import('@/features/history/HistoryPage'), 'HistoryPage') },
      { path: 'biblioteca/historia/:periodId', lazy: page(() => import('@/features/history/PeriodPage'), 'HistoryPeriodPage') },
      { path: 'biblioteca/catecismo', lazy: page(() => import('@/features/catechism/CatechismPage'), 'CatechismPage') },
      { path: 'biblioteca/catecismo/:partId', lazy: page(() => import('@/features/catechism/PartPage'), 'CatechismPartPage') },
      { path: 'biblioteca/estudio', lazy: page(() => import('@/features/study/StudyPage'), 'StudyPage') },
      { path: 'biblioteca/estudio/obra/:workId', lazy: page(() => import('@/features/study/WorkPage'), 'StudyWorkPage') },
      { path: 'biblioteca/estudio/:courseId', lazy: page(() => import('@/features/study/CoursePage'), 'CoursePage') },
      { path: 'biblioteca/iconos', lazy: page(() => import('@/features/icons/IconsPage'), 'IconsPage') },
      { path: 'biblioteca/iconos/:iconId', lazy: page(() => import('@/features/icons/IconPage'), 'IconPage') },

      /* ---------------- Personal ---------------- */
      { path: 'favoritos', lazy: page(() => import('@/features/favorites/FavoritesPage'), 'FavoritesPage') },
      { path: 'buscar', lazy: page(() => import('@/features/search/SearchPage'), 'SearchPage') },
      { path: 'mas', lazy: page(() => import('@/features/more/MorePage'), 'MorePage') },

      /* ---------------- Configuración ---------------- */
      { path: 'configuracion', lazy: page(() => import('@/features/settings/SettingsPage'), 'SettingsPage') },
      { path: 'configuracion/instalar', lazy: page(() => import('@/features/settings/InstallPage'), 'InstallPage') },
      { path: 'configuracion/datos', lazy: page(() => import('@/features/settings/DataPage'), 'DataPage') },
      { path: 'configuracion/notificaciones', lazy: page(() => import('@/features/settings/NotificationsPage'), 'NotificationsPage') },
      { path: 'configuracion/fuentes', lazy: page(() => import('@/features/settings/SourcesPage'), 'SourcesPage') },
      { path: 'configuracion/acerca-de', lazy: page(() => import('@/features/settings/AboutPage'), 'AboutPage') },

      { path: '*', lazy: page(() => import('@/features/error/NotFoundPage'), 'NotFoundPage') },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  // Permite publicar ATHOS en una subcarpeta (usuario.github.io/athos/).
  basename: import.meta.env.BASE_URL,
});
