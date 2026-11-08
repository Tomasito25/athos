/**
 * Las formas de rezar: con el cuerpo, con la voz, con el corazón, a sus horas,
 * con la Iglesia, por los demás, con la Escritura, y cuando cuesta. Cada una
 * lleva a donde ATHOS la tiene.
 */
import { Link } from 'react-router-dom';
import { HubHero } from '@/components/hub';
import { Section, SourceNote } from '@/components/ui';
import { IconPray } from '@/components/icons';
import { PRAYER_WAYS, PRAYER_WAYS_META } from '@/content/prayer-ways';
import { useHashScroll } from '@/hooks/useHashScroll';
import es from '@/locales/es';

export function PrayerWaysPage() {
  useHashScroll([]);
  return (
    <div className="page">
      <HubHero icon={IconPray} title={es.ways.title} subtitle={es.ways.subtitle} />

      <nav className="ways-index" aria-label={es.ways.index}>
        {PRAYER_WAYS.map((w) => (
          <a key={w.id} href={`#${w.id}`} className="ways-index__item">
            <span className="ways-index__title">{w.title}</span>
            <span className="ways-index__lead">{w.lead}</span>
          </a>
        ))}
      </nav>

      {PRAYER_WAYS.map((w) => (
        <Section key={w.id} title={w.title} id={w.id}>
          <div className="prose book-surface">
            {w.text.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="shortcut-row" style={{ marginTop: 'var(--sp-3)' }}>
            {w.links.map((l) => (
              <Link key={l.to + l.label} className="shortcut" to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>
        </Section>
      ))}

      <SourceNote meta={PRAYER_WAYS_META} />
    </div>
  );
}
