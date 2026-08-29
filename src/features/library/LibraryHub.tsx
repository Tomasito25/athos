/**
 * Portada de la biblioteca.
 *
 * Antes eran nueve tarjetas iguales, y ninguna decía si detrás había tres
 * páginas o cuatrocientas. Ahora van en tres bloques —para entender la fe, lo
 * que se reza, quiénes lo dijeron— y cada una lleva su cuenta, sacada del
 * contenido y no escrita a mano.
 */
import { Link } from 'react-router-dom';
import { PageHead, Section } from '@/components/ui';
import {
  IconBook,
  IconCandle,
  IconChalice,
  IconMonastery,
  IconScroll,
  OrthodoxCross,
} from '@/components/icons';
import { LIBRARY_GROUPS, type LibrarySection } from '@/content/library';
import es from '@/locales/es';

const ICONOS = {
  cross: OrthodoxCross,
  scroll: IconScroll,
  book: IconBook,
  monastery: IconMonastery,
  candle: IconCandle,
  chalice: IconChalice,
} as const;

function Tarjeta({ section }: { section: LibrarySection }) {
  const Icono = ICONOS[section.icon];
  return (
    <Link className="card" to={section.to}>
      <Icono size={22} style={{ color: 'var(--gold)' }} />
      <span className="card__title">{section.title}</span>
      <span className="card__text">{section.text}</span>
      <span className="card__count">
        <b>{section.count}</b> {section.unit}
      </span>
    </Link>
  );
}

export function LibraryHub() {
  return (
    <div className="page">
      <PageHead title={es.library.title} subtitle={es.library.subtitle} />

      {LIBRARY_GROUPS.map((grupo) => (
        <Section key={grupo.id} title={grupo.title}>
          <p className="muted text-sm" style={{ marginBottom: 'var(--sp-3)' }}>
            {grupo.note}
          </p>
          <div className="grid grid--wide">
            {grupo.sections.map((section) => (
              <Tarjeta key={section.id} section={section} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
