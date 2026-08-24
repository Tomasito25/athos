import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { ICONS_NOTE, ICON_CATEGORY_LABELS } from '@/content/icons';
import { Loading, PageHead, Section, Segmented } from '@/components/ui';
import { IconPlate } from './IconPlate';
import type { IconCategory } from '@/types';
import es from '@/locales/es';

const FILTERS: Array<{ value: IconCategory | 'todos'; label: string }> = [
  { value: 'todos', label: es.app.all },
  { value: 'cristo', label: ICON_CATEGORY_LABELS.cristo },
  { value: 'theotokos', label: ICON_CATEGORY_LABELS.theotokos },
  { value: 'fiestas', label: ICON_CATEGORY_LABELS.fiestas },
];

export function IconsPage() {
  const [filter, setFilter] = useState<IconCategory | 'todos'>('todos');
  const icons = useAsync(() => db.icons.toArray(), []);
  const list = (icons.data ?? []).filter((icon) => filter === 'todos' || icon.category === filter);

  return (
    <div className="page">
      <PageHead title={es.library.icons} subtitle="Lo que la Iglesia ve cuando mira un icono." />
      <Segmented value={filter} options={FILTERS} onChange={setFilter} label={es.saints.category} />

      {icons.loading ? <Loading /> : null}

      <Section>
        <div className="grid">
          {list.map((icon) => (
            <Link key={icon.id} className="card" to={`/biblioteca/iconos/${icon.id}`}>
              <IconPlate name={icon.name} image={icon.thumb ?? icon.image} />
              <span className="card__title">{icon.name}</span>
              <span className="card__text">{ICON_CATEGORY_LABELS[icon.category]}</span>
            </Link>
          ))}
        </div>
      </Section>

      <p className="source-note">{ICONS_NOTE}</p>
    </div>
  );
}
