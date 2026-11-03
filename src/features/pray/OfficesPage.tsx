/**
 * Los tres oficios del día.
 *
 * Lo que necesita quien está cogiendo la costumbre de rezar a horas: los tres
 * oficios, en qué medida se reza cada uno, cómo ha ido la semana y los consejos
 * para empezar. Estaba repartido por la portada de Orar y la alargaba sin que
 * lo necesitara el que venía a buscar una oración concreta.
 */
import { Link } from 'react-router-dom';
import { useToday } from '@/hooks/useLiturgicalDay';
import { DAILY_OFFICES, OFFICES_STRUCTURE_NOTE } from '@/content/hours';
import { LENGTH_INFO, minutesFor } from '@/content/office-lengths';
import { officeNow } from '@/lib/office-time';
import { useSettings } from '@/stores/settings';
import { PageHead, ProgressBlocks, Section, Tag } from '@/components/ui';
import { useOfficeProgress } from '@/features/office/useOfficeProgress';
import { OfficeMeasure } from './OfficeMeasure';
import { OfficeWeek } from './OfficeWeek';
import es from '@/locales/es';

export function OfficesPage() {
  const today = useToday();
  const horas = useSettings((s) => s.officeHours);
  const medidas = useSettings((s) => s.officeLength);
  const progreso = useOfficeProgress(today);
  const ahora = officeNow(new Date().getHours(), horas);

  return (
    <div className="page">
      <PageHead eyebrow={es.nav.pray} title={es.office.title} subtitle={es.office.threeTimes} />

      <div className="office-cards">
        {DAILY_OFFICES.map((oficio) => {
          const estado = progreso.data?.get(oficio.time);
          const esAhora = oficio.time === ahora;
          const medida = medidas?.[oficio.time] ?? 'habitual';
          return (
            <Link
              key={oficio.time}
              to={`/orar/oficio/${oficio.time}`}
              className={`office-card${esAhora ? ' office-card--now' : ''}`}
            >
              <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                <p className="eyebrow" lang="el">
                  {oficio.greekName}
                </p>
                {esAhora ? <Tag tone="gold">{es.prayers.now}</Tag> : null}
              </div>
              <p className="office-card__name">{oficio.name}</p>
              <p className="muted text-sm">{oficio.subtitle}</p>
              <p className="office-card__length" data-length={medida}>
                <span>{LENGTH_INFO.get(medida)?.label}</span> ·{' '}
                {es.office.minutes.replace('{{n}}', String(minutesFor(oficio.time, medida)))}
              </p>
              {estado && estado.total > 0 && estado.ratio > 0 ? (
                <div className="office-card__progress">
                  <ProgressBlocks value={estado.ratio} />
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>

      <Section title={es.pray.measure}>
        <p className="muted text-sm section-lead">{es.pray.measureHint}</p>
        <OfficeMeasure />
        <details className="fold">
          <summary>{es.pray.beginners}</summary>
          <ul className="tips">
            {es.pray.beginnersTips.map((consejo) => (
              <li key={consejo}>{consejo}</li>
            ))}
          </ul>
          <p className="muted text-sm">{es.pray.beginnersNote}</p>
        </details>
      </Section>

      <Section title={es.pray.week}>
        <p className="muted text-sm section-lead">{es.pray.weekHint}</p>
        <OfficeWeek today={today} />
      </Section>

      <details className="fold">
        <summary>{es.pray.howOffices}</summary>
        <p className="text-sm muted">{OFFICES_STRUCTURE_NOTE}</p>
      </details>
    </div>
  );
}
