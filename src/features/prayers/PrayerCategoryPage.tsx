import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Empty, ListRow, Loading, PageHead, StatusTag } from '@/components/ui';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import es from '@/locales/es';

export function PrayerCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = PRAYER_CATEGORIES.find((c) => c.id === categoryId);
  const prayers = useAsync(
    () => db.prayers.where('category').equals(categoryId ?? '').sortBy('order'),
    [categoryId],
  );

  if (!category) {
    return (
      <div className="page">
        <Empty title="Esa categoría no existe" />
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead eyebrow={es.prayers.title} title={category.name} subtitle={category.description} />
      {prayers.loading ? <Loading /> : null}
      {prayers.data?.length === 0 ? (
        <Empty title={es.app.empty} text="Todavía no hay oraciones incorporadas en esta categoría." />
      ) : (
        <div className="list">
          {prayers.data?.map((prayer) => (
            <ListRow
              key={prayer.id}
              to={`/orar/oraciones/${prayer.id}`}
              title={prayer.title}
              meta={prayer.subtitle}
              trailing={<StatusTag status={prayer.status} />}
            />
          ))}
        </div>
      )}
    </div>
  );
}
