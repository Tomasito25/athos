import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FIXED_FEASTS, GREAT_FEAST_IDS, MOVABLE_FEASTS } from '@/content/feasts';
import { paschaIso } from '@/lib/calendar/pascha';
import { addDaysIso, isoToCivil } from '@/lib/calendar/jdn';
import { formatLongDate, formatMonthDay } from '@/lib/format';
import { useToday } from '@/hooks/useLiturgicalDay';
import { ListRow, PageHead, Section, Tag } from '@/components/ui';
import es from '@/locales/es';

/** Las fiestas del año: móviles calculadas y fijas del Menaion. */
export function FeastsPage() {
  const today = useToday();
  const year = isoToCivil(today).year;
  const pascha = useMemo(() => paschaIso(year), [year]);

  const movable = useMemo(
    () =>
      MOVABLE_FEASTS.map((feast) => ({
        feast,
        date: addDaysIso(feast.paschaOffset! >= 0 ? pascha : paschaIso(year), feast.paschaOffset!),
      })).sort((a, b) => a.date.localeCompare(b.date)),
    [pascha, year],
  );

  return (
    <div className="page">
      <PageHead
        title={es.calendar.feasts}
        subtitle={`Pascua de ${year}: ${formatLongDate(pascha)}`}
      />

      <Section title="Las Doce Grandes Fiestas">
        <div className="grid">
          {[...MOVABLE_FEASTS, ...FIXED_FEASTS]
            .filter((feast) => GREAT_FEAST_IDS.includes(feast.id))
            .map((feast) => (
              <div key={feast.id} className="card">
                <span className="card__title">{feast.shortName ?? feast.name}</span>
                <span className="card__text">
                  {feast.day
                    ? formatMonthDay(feast.day)
                    : `Pascua ${feast.paschaOffset! > 0 ? '+' : ''}${feast.paschaOffset} días`}
                </span>
              </div>
            ))}
        </div>
      </Section>

      <Section title="Ciclo móvil de este año">
        <div className="list">
          {movable.map(({ feast, date }) => (
            <ListRow
              key={feast.id}
              to={`/calendario/dia/${date}`}
              title={feast.name}
              meta={feast.description ?? formatLongDate(date)}
              trailing={
                feast.rank === 'pascua' || feast.rank === 'gran-fiesta' ? <Tag tone="gold">Gran fiesta</Tag> : null
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Ciclo fijo">
        <div className="list">
          {[...FIXED_FEASTS]
            .sort((a, b) => (a.day ?? '').localeCompare(b.day ?? ''))
            .map((feast) => (
              <ListRow
                key={feast.id}
                chevron={false}
                title={feast.name}
                meta={feast.description}
                trailing={<Tag>{formatMonthDay(feast.day!)}</Tag>}
              />
            ))}
        </div>
      </Section>

      <p className="source-note">
        Las fechas del ciclo fijo se muestran en el calendario eclesiástico elegido en{' '}
        <Link to="/configuracion">{es.nav.settings}</Link>.
      </p>
    </div>
  );
}
