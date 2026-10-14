/**
 * Lo propio de hoy, en Orar.
 *
 * Lo que cambia cada día y antes había que ir a buscar a la biblioteca: el
 * tropario y el kontakion del día, el akathistos y el canon que tocan según
 * el día de la semana o la fiesta. Todo plegado y entero, para rezarlo aquí.
 */
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { dayDevotion } from '@/lib/calendar/day-devotion';
import { Blocks } from '@/components/ui';
import { WEEKDAYS } from '@/lib/format';
import es from '@/locales/es';

export function TodayDevotions() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const devocion = dayDevotion(day);

  return (
    <div className="today-devotions">
      <p className="today-devotions__lead">
        <span className="eyebrow">{WEEKDAYS[day.weekday]}</span>{' '}
        {es.pray.dedication.replace('{{what}}', devocion.dedication)}
        {day.feasts[0] ? ` · ${day.feasts[0].name}` : ''}
      </p>

      <details className="fold today-devotions__fold">
        <summary>{es.pray.troparionToday}</summary>
        <Blocks
          blocks={[
            { kind: 'day-troparion', content: 'Tropario del día' },
            { kind: 'day-kontakion', content: 'Kontakion del día' },
          ]}
        />
      </details>

      <Blocks
        blocks={[
          { kind: 'day-akathist', content: 'Akathistos de hoy' },
          { kind: 'day-canon', content: 'Canon de hoy' },
        ]}
      />
    </div>
  );
}
