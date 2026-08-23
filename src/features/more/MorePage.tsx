import { ListRow, PageHead, Section } from '@/components/ui';
import {
  IconBell,
  IconHabits,
  IconInfo,
  IconInstall,
  IconJournal,
  IconLock,
  IconSearch,
  IconSettings,
  IconStar,
  IconScroll,
} from '@/components/icons';
import es from '@/locales/es';

/** Todo lo que no cabe en la barra inferior. */
export function MorePage() {
  return (
    <div className="page">
      <PageHead title={es.nav.more} />

      <Section title={es.nav.personal}>
        <div className="list">
          <ListRow to="/diario" leading={<IconJournal size={20} />} title={es.journal.title} meta={es.journal.subtitle} />
          <ListRow to="/habitos" leading={<IconHabits size={20} />} title={es.habits.title} meta={es.habits.subtitle} />
          <ListRow to="/favoritos" leading={<IconStar size={20} />} title={es.favorites.title} meta={es.favorites.subtitle} />
          <ListRow to="/buscar" leading={<IconSearch size={20} />} title={es.search.title} meta={es.search.shortcut} />
        </div>
      </Section>

      <Section title={es.nav.settings}>
        <div className="list">
          <ListRow to="/configuracion" leading={<IconSettings size={20} />} title={es.settings.title} />
          <ListRow to="/configuracion/instalar" leading={<IconInstall size={20} />} title={es.settings.install} />
          <ListRow to="/configuracion/notificaciones" leading={<IconBell size={20} />} title={es.settings.notifications} />
          <ListRow to="/configuracion/seguridad" leading={<IconLock size={20} />} title={es.settings.security} />
          <ListRow to="/configuracion/datos" leading={<IconScroll size={20} />} title={es.settings.data} />
          <ListRow to="/configuracion/fuentes" leading={<IconInfo size={20} />} title={es.settings.sources} />
          <ListRow to="/configuracion/acerca-de" leading={<IconInfo size={20} />} title={es.settings.about} />
        </div>
      </Section>
    </div>
  );
}
