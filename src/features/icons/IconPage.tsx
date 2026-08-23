import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { ICON_CATEGORY_LABELS } from '@/content/icons';
import { Empty, Loading, Notice, PageHead, Section, SourceNote, Tag } from '@/components/ui';
import { IconPlate } from './IconPlate';
import { ReaderToolbar } from '@/components/Reader';
import { useVisitLog } from '@/hooks/useVisitLog';
import { formatMonthDay } from '@/lib/format';
import es from '@/locales/es';

export function IconPage() {
  const { iconId = '' } = useParams();
  const icon = useAsync(() => db.icons.get(iconId), [iconId]);
  const path = `/biblioteca/iconos/${iconId}`;

  useVisitLog(icon.data ? { path, title: icon.data.name, kind: es.library.icons } : null);

  if (icon.loading) return <Loading />;
  if (!icon.data) {
    return (
      <div className="page">
        <Empty title="Ese icono no está en la lista" />
      </div>
    );
  }

  const item = icon.data;

  return (
    <article className="page page--reading">
      <PageHead eyebrow={ICON_CATEGORY_LABELS[item.category]} title={item.name} subtitle={item.place} />

      <div style={{ maxWidth: '18rem', margin: '0 auto var(--sp-5)' }}>
        <IconPlate name={item.name} image={item.image} />
      </div>

      {!item.image ? <Notice variant="pending">Imagen pendiente de incorporar con licencia comprobada.</Notice> : null}

      <div className="tag-row" style={{ margin: 'var(--sp-4) 0' }}>
        <Tag tone="gold">{ICON_CATEGORY_LABELS[item.category]}</Tag>
        {item.feastDay ? <Tag>{formatMonthDay(item.feastDay)}</Tag> : null}
      </div>

      <ReaderToolbar favorite={{ kind: 'icon', refId: item.id, title: item.name, path }} />

      <Section title="Historia">
        <div className="prose book-surface">
          <p>{item.history}</p>
        </div>
      </Section>

      <Section title="Significado">
        <div className="prose book-surface">
          <p>{item.meaning}</p>
        </div>
      </Section>

      <SourceNote meta={item.meta} status={item.status} />
    </article>
  );
}
