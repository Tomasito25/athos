/**
 * Lo que toca hoy en el plan de lectura que se lleva.
 *
 * Va en Inicio y en Leer. Si no se lleva ningún plan, no enseña nada: no es
 * sitio para empujar a empezar uno.
 */
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { currentPlan } from '@/db/plans';
import { ProgressBlocks } from '@/components/ui';
import { IconBook } from '@/components/icons';
import es from '@/locales/es';

export function PlanToday() {
  const actual = useAsync(() => currentPlan(), []);
  if (!actual.data) return null;
  const { plan, day, done, total } = actual.data;

  return (
    <Link to={day.path} className="plan-today">
      <span className="plan-today__icon" aria-hidden="true">
        <IconBook size={20} />
      </span>
      <span className="plan-today__body">
        <span className="eyebrow">{es.plans.planToday}</span>
        <span className="plan-today__title">{plan.title}</span>
        <span className="plan-today__day">
          {es.plans.day} {day.number} · {day.label}
        </span>
        <span className="plan-today__progress">
          <ProgressBlocks value={done / Math.max(total, 1)} />
        </span>
      </span>
      <span className="plan-today__go">{es.plans.read}</span>
    </Link>
  );
}
