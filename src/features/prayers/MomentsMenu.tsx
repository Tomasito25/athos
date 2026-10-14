/**
 * Las oraciones para cada momento, en rejilla.
 *
 * Es el menú de la portada de las oraciones, y ahora también el de Orar, en
 * lugar de la rejilla «Tu oración», que mezclaba cinco destinos sin relación
 * entre sí. Aquí cada grupo —el día, el alma, los demás, la casa, ante Dios—
 * lleva sus momentos, cada uno con su signo y cuántas oraciones tiene.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Section } from '@/components/ui';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import { MOMENT_GROUPS, momentNow } from '@/content/moments';
import { MomentIcon } from './MomentIcon';
import type { PrayerCategoryId } from '@/types';
import es from '@/locales/es';

export function MomentsMenu({ headingLevel = 'section' }: { headingLevel?: 'section' | 'sub' }) {
  const prayers = useAsync(() => db.prayers.orderBy('order').toArray(), []);
  const ahora = momentNow(new Date().getHours());

  const porCategoria = useMemo(() => {
    const map = new Map<string, number>();
    for (const prayer of prayers.data ?? []) map.set(prayer.category, (map.get(prayer.category) ?? 0) + 1);
    return map;
  }, [prayers.data]);

  const cuenta = (id: PrayerCategoryId) => {
    const n = porCategoria.get(id) ?? 0;
    return n === 1 ? es.prayers.countOne : es.prayers.countMany.replace('{{count}}', String(n));
  };

  const rejilla = (moments: PrayerCategoryId[]) => (
    <div className="moment-grid">
      {moments.map((id) => {
        const categoria = PRAYER_CATEGORIES.find((c) => c.id === id);
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
  );

  if (headingLevel === 'sub') {
    return (
      <div className="moments-menu">
        {MOMENT_GROUPS.map((grupo) => (
          <div key={grupo.id} className="moments-menu__group">
            <h3 className="moments-menu__title">{grupo.name}</h3>
            <p className="muted text-sm moments-menu__lead">{grupo.description}</p>
            {rejilla(grupo.moments)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {MOMENT_GROUPS.map((grupo) => (
        <Section key={grupo.id} title={grupo.name}>
          <p className="muted text-sm section-lead">{grupo.description}</p>
          {rejilla(grupo.moments)}
        </Section>
      ))}
    </>
  );
}
