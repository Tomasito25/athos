/**
 * El índice de las oraciones.
 *
 * Es el libro entero de una ojeada: todos los momentos, por grupos, con un salto a
 * cada grupo arriba. La portada de Orar lleva a la puerta que toca; esto es para
 * quien prefiere verlo todo.
 */
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useHashScroll } from '@/hooks/useHashScroll';
import { db } from '@/db/db';
import { listFavorites } from '@/db/user';
import { ListRow, PageHead, Section } from '@/components/ui';
import { IconPray } from '@/components/icons';
import { PRAYER_LICENSE_NOTE } from '@/content/prayer-note';
import { MOMENT_GROUPS } from '@/content/moments';
import { MomentsMenu } from './MomentsMenu';
import { PrayerSearchBox } from './PrayerSearchBox';
import es from '@/locales/es';

export function PrayersPage() {
  useHashScroll();
  const total = useAsync(() => db.prayers.count(), []);
  const favorites = useAsync(() => listFavorites('prayer'), []);

  return (
    <div className="page">
      <PageHead eyebrow={es.nav.pray} title={es.prayers.title} subtitle={es.prayers.heroSubtitle} />

      <PrayerSearchBox />

      <nav className="shortcut-row" aria-label={es.prayers.categories}>
        {MOMENT_GROUPS.map((grupo) => (
          <Link key={grupo.id} className="shortcut" to={`/orar/oraciones#${grupo.id}`}>
            {grupo.name}
          </Link>
        ))}
      </nav>

      {favorites.data && favorites.data.length > 0 ? (
        <Section title={es.prayers.favorites}>
          <div className="list">
            {favorites.data.slice(0, 5).map((favorite) => (
              <ListRow key={favorite.id} to={favorite.path} title={favorite.title} meta={favorite.subtitle} />
            ))}
          </div>
        </Section>
      ) : null}

      <MomentsMenu />

      <Section title={es.prayers.everything}>
        <div className="list">
          <ListRow
            to="/orar/oraciones/todas"
            leading={<IconPray size={20} style={{ color: 'var(--accent)' }} />}
            title={es.prayers.allPrayers}
            meta={es.prayers.searchAll}
            trailing={<span className="pill-count">{total.data ?? 0}</span>}
          />
        </div>
      </Section>

      <p className="source-note" style={{ marginTop: 'var(--sp-6)' }}>
        {PRAYER_LICENSE_NOTE}
      </p>
    </div>
  );
}
