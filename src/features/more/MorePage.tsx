/**
 * El mapa de ATHOS.
 *
 * Antes esta pantalla sólo llevaba a los ajustes, que es lo que menos falta
 * hace encontrar. La barra inferior lleva a cinco portadas y desde cada una
 * hay que adivinar qué contiene; aquí no hay nada que adivinar: si existe en
 * la aplicación, está en esta lista.
 *
 * La biblioteca no se escribe dos veces —se lee de donde ya vive—, así que
 * una sección nueva aparece aquí sola.
 */
import { ListRow, PageHead, Section } from '@/components/ui';
import {
  IconBell,
  IconInfo,
  IconInstall,
  IconSearch,
  IconSettings,
  IconStar,
  IconScroll,
} from '@/components/icons';
import { APP_MAP } from '@/components/layout/navigation';
import { LIBRARY_GROUPS } from '@/content/library';
import es from '@/locales/es';

export function MorePage() {
  return (
    <div className="page">
      <PageHead title={es.nav.more} subtitle={es.nav.moreSubtitle} />

      {APP_MAP.map((grupo) => (
        <Section key={grupo.title} title={grupo.title}>
          <div className="list">
            {grupo.entries.map((entrada) => (
              <ListRow key={entrada.to} to={entrada.to} title={entrada.label} meta={entrada.hint} />
            ))}
          </div>
        </Section>
      ))}

      <Section title={es.nav.library}>
        <div className="list">
          {LIBRARY_GROUPS.flatMap((g) => g.sections).map((seccion) => (
            <ListRow
              key={seccion.id}
              to={seccion.to}
              title={seccion.title}
              trailing={
                <span className="pill-count">
                  {seccion.count} {seccion.unit}
                </span>
              }
            />
          ))}
        </div>
      </Section>

      <Section title={es.favorites.title}>
        <div className="list">
          <ListRow to="/favoritos" leading={<IconStar size={20} />} title={es.favorites.title} meta={es.favorites.subtitle} />
          <ListRow to="/buscar" leading={<IconSearch size={20} />} title={es.search.title} meta={es.search.shortcut} />
        </div>
      </Section>

      <Section title={es.nav.settings}>
        <div className="list">
          <ListRow to="/configuracion" leading={<IconSettings size={20} />} title={es.settings.title} />
          <ListRow to="/configuracion/instalar" leading={<IconInstall size={20} />} title={es.settings.install} />
          <ListRow to="/configuracion/notificaciones" leading={<IconBell size={20} />} title={es.settings.notifications} />
          <ListRow to="/configuracion/datos" leading={<IconScroll size={20} />} title={es.settings.data} />
          <ListRow to="/configuracion/fuentes" leading={<IconInfo size={20} />} title={es.settings.sources} />
          <ListRow to="/configuracion/acerca-de" leading={<IconInfo size={20} />} title={es.settings.about} />
        </div>
      </Section>
    </div>
  );
}
