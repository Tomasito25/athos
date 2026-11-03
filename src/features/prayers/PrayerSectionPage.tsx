/**
 * Una de las seis puertas del libro de oraciones.
 *
 * Una lista con el nombre de cada momento y una línea que dice cuándo es: se lee
 * de arriba abajo y se toca sin apuntar. Las virtudes van agrupadas, y encima
 * llevan las tres oraciones que las piden todas juntas y el paso a su ficha en la
 * biblioteca.
 */
import { Link, useParams } from 'react-router-dom';
import { ButtonLink, ListRow, NotFound, PageHead, Section } from '@/components/ui';
import { MOMENT_GROUPS, momentById } from '@/content/moments';
import { VIRTUE_GROUPS, VIRTUE_INFO } from '@/content/prayer-categories';
import { MomentIcon } from './MomentIcon';
import { useCategoryCounts } from './useCategoryCounts';
import type { PrayerCategoryId } from '@/types';
import es from '@/locales/es';

function Fila({ id, cuenta, griego }: { id: PrayerCategoryId; cuenta?: number; griego?: string }) {
  const momento = momentById(id);
  if (!momento) return null;
  return (
    <ListRow
      to={`/orar/oraciones/categoria/${id}`}
      leading={
        <span className="pray-row__icon" aria-hidden="true">
          <MomentIcon id={id} size={20} />
        </span>
      }
      title={
        <>
          {momento.name}
          {griego ? (
            <span className="pray-row__greek" lang="el">
              {griego}
            </span>
          ) : null}
        </>
      }
      meta={momento.description}
      trailing={cuenta ? <span className="pill-count">{cuenta}</span> : undefined}
    />
  );
}

/** Las que piden todas las virtudes juntas. */
const PARA_TODAS = [
  { id: 'efren-sirio', title: 'Señor y Soberano de mi vida', from: 'San Efrén el Sirio' },
  { id: 'trinidad-al-espiritu', title: 'Danos el espíritu de amor y de paciencia', from: 'Al Espíritu Santo' },
  { id: 'crisostomo-24', title: 'Las veinticuatro oraciones', from: 'San Juan Crisóstomo' },
];

export function PrayerSectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const grupo = MOMENT_GROUPS.find((g) => g.id === sectionId);
  const cuentas = useCategoryCounts();

  if (!grupo) {
    return (
      <div className="page">
        <NotFound title={es.prayers.noSection} text={es.prayers.noSectionText} />
        <div className="btn-row">
          <ButtonLink to="/orar">{es.screens['/orar']}</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead eyebrow={grupo.question} title={grupo.name} subtitle={grupo.description} />

      {grupo.id === 'virtudes' ? (
        <>
          <Section title={es.prayers.forAllVirtues}>
            <div className="list">
              {PARA_TODAS.map((p) => (
                <ListRow key={p.id} to={`/orar/oraciones/${p.id}`} title={p.title} meta={p.from} />
              ))}
            </div>
            <p className="text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              <Link to="/biblioteca/virtudes">{es.prayers.virtuesInLibrary}</Link>
            </p>
          </Section>

          {VIRTUE_GROUPS.map((sub) => (
            <Section key={sub.id} title={sub.name}>
              <p className="muted text-sm section-lead">{sub.note}</p>
              <div className="list">
                {sub.virtues.map((id) => (
                  <Fila key={id} id={id} cuenta={cuentas.get(id)} griego={VIRTUE_INFO[id].greek} />
                ))}
              </div>
            </Section>
          ))}
        </>
      ) : (
        <div className="list" style={{ marginTop: 'var(--sp-4)' }}>
          {grupo.moments.map((id) => (
            <Fila key={id} id={id} cuenta={cuentas.get(id)} />
          ))}
        </div>
      )}

      <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
        <ButtonLink to="/orar/oraciones" variant="ghost" size="sm">
          {es.pray.fullIndex}
        </ButtonLink>
      </div>
    </div>
  );
}
