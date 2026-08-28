import { Link } from 'react-router-dom';
import { PageHead, Section } from '@/components/ui';
import { IconBook, IconCandle, IconMonastery, IconScroll, OrthodoxCross } from '@/components/icons';
import { ATHOS_INTRO } from '@/content/athos';
import es from '@/locales/es';

const SECTIONS = [
  { to: '/biblioteca/liturgia', title: es.library.liturgy, text: 'Divina Liturgia, Vísperas, Maitines, Completas y demás oficios.', Icon: OrthodoxCross },
  { to: '/biblioteca/akathistos', title: es.library.akathists, text: 'Himnos que se cantan de pie, empezando por el Akáthistos a la Theotokos.', Icon: IconScroll },
  { to: '/biblioteca/canones', title: es.library.canons, text: 'Cánones de arrepentimiento, de preparación para la Comunión y a los santos.', Icon: IconScroll },
  { to: '/biblioteca/padres', title: es.library.fathers, text: 'Crisóstomo, Basilio, Isaac el Sirio, Máximo, Palamás, Silvano.', Icon: IconBook },
  { to: '/biblioteca/athos', title: es.library.athos, text: ATHOS_INTRO, Icon: IconMonastery },
  { to: '/biblioteca/iconos', title: es.library.icons, text: 'Los iconos que la Iglesia venera y lo que significan.', Icon: IconCandle },
  {
    to: '/biblioteca/historia',
    title: es.history.title,
    text: 'De Pentecostés a hoy, en ocho épocas: los siete Concilios con su ficha, las rupturas, las misiones y los conflictos que siguen abiertos.',
    Icon: IconScroll,
  },
  {
    to: '/biblioteca/catecismo',
    title: es.catechism.title,
    text: 'Qué cree la Iglesia ortodoxa y por qué, en preguntas con respuesta. Filtrable según se llegue de fuera, se sea catecúmeno o se lleve años dentro.',
    Icon: IconScroll,
  },
  { to: '/biblioteca/estudio', title: es.library.study, text: 'Itinerarios para estudiar despacio y el catálogo de las obras que forman la tradición.', Icon: IconBook },
];

export function LibraryHub() {
  return (
    <div className="page">
      <PageHead title={es.library.title} subtitle="Los libros de la Iglesia." />
      <Section>
        <div className="grid grid--wide">
          {SECTIONS.map(({ to, title, text, Icon }) => (
            <Link key={to} className="card" to={to}>
              <Icon size={22} style={{ color: 'var(--gold)' }} />
              <span className="card__title">{title}</span>
              <span className="card__text">{text}</span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
