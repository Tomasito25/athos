/**
 * El mapa de ATHOS.
 *
 * La barra inferior lleva a cinco portadas y desde cada una hay que adivinar
 * qué contiene; aquí no hay nada que adivinar: si existe en la aplicación,
 * está en esta pantalla.
 *
 * Eran treinta y tantas filas seguidas, casi tres pantallas de dedo. Ahora
 * cada grupo es una rejilla de teselas bajas, con su icono: se encuentra el
 * nombre de un vistazo, que es a lo que se viene a un mapa.
 *
 * La biblioteca no se escribe dos veces —se lee de donde ya vive—, así que
 * una sección nueva aparece aquí sola.
 */
import { Section } from '@/components/ui';
import { HubHero, Tile, TileGrid } from '@/components/hub';
import {
  IconBell,
  IconInfo,
  IconInstall,
  IconMore,
  IconScroll,
  IconSearch,
  IconSettings,
  IconStar,
} from '@/components/icons';
import { APP_MAP } from '@/components/layout/navigation';
import { LIBRARY_GROUPS } from '@/content/library';
import { LIBRARY_ICONS } from '@/features/library/sectionIcons';
import es from '@/locales/es';

export function MorePage() {
  return (
    <div className="page">
      <HubHero icon={IconMore} title={es.nav.more} subtitle={es.nav.moreSubtitle} />

      {APP_MAP.map((grupo) => (
        <Section key={grupo.title} title={grupo.title}>
          <TileGrid compact>
            {grupo.entries.map((entrada) => (
              <Tile key={entrada.to} to={entrada.to} icon={entrada.icon} title={entrada.label} hint={entrada.hint} />
            ))}
          </TileGrid>
        </Section>
      ))}

      <Section title={es.nav.library}>
        <TileGrid compact>
          {LIBRARY_GROUPS.flatMap((g) => g.sections).map((seccion) => (
            <Tile
              key={seccion.id}
              to={seccion.to}
              icon={LIBRARY_ICONS[seccion.icon]}
              title={seccion.title}
              badge={seccion.count}
            />
          ))}
        </TileGrid>
      </Section>

      <Section title={es.more.yours}>
        <TileGrid compact>
          <Tile to="/favoritos" icon={IconStar} title={es.favorites.title} hint={es.favorites.subtitle} />
          <Tile to="/buscar" icon={IconSearch} title={es.search.title} hint={es.search.shortcut} />
        </TileGrid>
      </Section>

      <Section title={es.nav.settings}>
        <TileGrid compact>
          <Tile to="/configuracion" icon={IconSettings} title={es.settings.title} />
          <Tile to="/configuracion/instalar" icon={IconInstall} title={es.settings.install} />
          <Tile to="/configuracion/notificaciones" icon={IconBell} title={es.settings.notifications} />
          <Tile to="/configuracion/datos" icon={IconScroll} title={es.settings.data} />
          <Tile to="/configuracion/fuentes" icon={IconInfo} title={es.settings.sources} />
          <Tile to="/configuracion/acerca-de" icon={IconInfo} title={es.settings.about} />
        </TileGrid>
      </Section>
    </div>
  );
}
