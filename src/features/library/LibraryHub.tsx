/**
 * Portada de la biblioteca.
 *
 * Van en tres bloques —para entender la fe, lo que se reza, quiénes lo
 * dijeron— y cada tarjeta lleva su cuenta, sacada del contenido y no escrita
 * a mano.
 *
 * Las tarjetas son bajas a propósito. Antes cada una ocupaba media pantalla
 * de móvil: el icono en una línea, el título en otra, cuatro renglones de
 * descripción y la cuenta debajo. Con nueve secciones, ver el índice entero
 * costaba seis pantallas de dedo, y un índice que no se abarca de un vistazo
 * no es un índice. Ahora el icono, el título y la cuenta van en el mismo
 * renglón y la descripción se recorta a dos líneas: lo que hace falta para
 * elegir, no para saberlo todo antes de entrar.
 */
import { Link } from 'react-router-dom';
import { ListRow, PageHead, Section } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { listHistory } from '@/db/user';
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
    <Link className="card card--index" to={section.to}>
      <span className="card__head">
        <Icono size={20} style={{ color: 'var(--gold)', flex: 'none' }} />
        <span className="card__title">{section.title}</span>
        <span className="card__count">
          <b>{section.count}</b> <span className="card__unit">{section.unit}</span>
        </span>
      </span>
      <span className="card__text card__text--clamp">{section.text}</span>
    </Link>
  );
}

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
      <PageHead title={es.library.title} subtitle={es.library.subtitle} />

      <SeguirLeyendo />

      {LIBRARY_GROUPS.map((grupo) => (
        <Section key={grupo.id} title={grupo.title}>
          <p className="muted text-sm" style={{ marginBottom: 'var(--sp-3)' }}>
            {grupo.note}
          </p>
          <div className="grid grid--index">
            {grupo.sections.map((section) => (
              <Tarjeta key={section.id} section={section} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
