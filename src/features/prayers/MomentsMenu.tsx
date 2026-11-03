/**
 * Todos los momentos, en rejilla y por grupos: el cuerpo del índice de oraciones.
 *
 * Cada grupo lleva su ancla, para poder saltar a él desde arriba.
 */
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui';
import { MOMENT_GROUPS, momentById, momentNow } from '@/content/moments';
import { MomentIcon } from './MomentIcon';
import { useCategoryCounts } from './useCategoryCounts';
import es from '@/locales/es';

export function MomentsMenu() {
  const cuentas = useCategoryCounts();
  const ahora = momentNow(new Date().getHours());

  const cuenta = (id: string) => {
    const n = cuentas.get(id) ?? 0;
    return n === 1 ? es.prayers.countOne : es.prayers.countMany.replace('{{count}}', String(n));
  };

  return (
    <>
      {MOMENT_GROUPS.map((grupo) => (
        <Section key={grupo.id} id={grupo.id} title={grupo.name}>
          <p className="muted text-sm section-lead">{grupo.description}</p>
          <div className="moment-grid">
            {grupo.moments.map((id) => {
              const categoria = momentById(id);
              if (!categoria) return null;
              return (
                <Link
                  key={id}
                  to={`/orar/oraciones/categoria/${id}`}
                  className={`moment${id === ahora ? ' moment--now' : ''}`}
                >
                  <span className="moment__icon">
                    <MomentIcon id={id} />
                  </span>
                  <span className="moment__name">{categoria.name}</span>
                  <span className="moment__count">
                    {cuenta(id)}
                    {id === ahora ? ` · ${es.prayers.now}` : ''}
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>
      ))}
    </>
  );
}
