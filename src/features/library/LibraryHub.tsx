/**
 * Portada de la biblioteca.
 *
 * Van en tres bloques —para entender la fe, lo que se reza, quiénes lo
 * dijeron— y cada tarjeta lleva su cuenta, sacada del contenido y no escrita
 * a mano.
 *
 * Cada sección es una tesela, dos por fila en el móvil: el icono, el título,
 * la cuenta en la esquina y dos renglones de descripción, lo que hace falta
 * para elegir. Así el índice entero cabe en poco más de una pantalla, y un
 * índice que no se abarca de un vistazo no es un índice.
 */
import { ListRow, Section } from '@/components/ui';
import { HubHero, Tile, TileGrid } from '@/components/hub';
import { useAsync } from '@/hooks/useAsync';
import { listHistory } from '@/db/user';
import { IconLibrary } from '@/components/icons';
import { LIBRARY_GROUPS } from '@/content/library';
import { LIBRARY_ICONS } from './sectionIcons';
import es from '@/locales/es';

/**
 * Por dónde ibas.
 *
 * La biblioteca es de las secciones a las que se vuelve, no de las que se
 * recorren una vez: casi siempre se entra para seguir un capítulo empezado.
 * Antes había que rehacer el camino entero desde la portada.
 */
function SeguirLeyendo() {
  const historial = useAsync(() => listHistory(30), []);

  const recientes = (historial.data ?? [])
    .filter((h) => h.path.startsWith('/biblioteca/'))
    // Una misma ficha visitada tres veces es una sola entrada en la lista.
    .filter((h, i, todas) => todas.findIndex((x) => x.path === h.path) === i)
    .slice(0, 3);

  if (!recientes.length) return null;

  return (
    <Section title={es.library.continueReading}>
      <div className="list">
        {recientes.map((h) => (
          <ListRow key={h.path} to={h.path} title={h.title} meta={h.kind} />
        ))}
      </div>
    </Section>
  );
}

export function LibraryHub() {
  return (
    <div className="page">
      <HubHero icon={IconLibrary} title={es.library.title} subtitle={es.library.subtitle} />

      <SeguirLeyendo />

      {LIBRARY_GROUPS.map((grupo) => (
        <Section key={grupo.id} title={grupo.title}>
          <p className="muted text-sm" style={{ marginBottom: 'var(--sp-3)' }}>
            {grupo.note}
          </p>
          <TileGrid>
            {grupo.sections.map((section) => (
              <Tile
                key={section.id}
                to={section.to}
                icon={LIBRARY_ICONS[section.icon]}
                title={section.title}
                hint={section.text}
                badge={section.count}
              />
            ))}
          </TileGrid>
        </Section>
      ))}
    </div>
  );
}
