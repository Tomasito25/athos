import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { FATHERS_NOTE } from '@/content/fathers';
import { ListRow, Loading, PageHead, StatusTag } from '@/components/ui';
import es from '@/locales/es';

export function FathersPage() {
  const fathers = useAsync(() => db.church_fathers.toArray(), []);

  return (
    <div className="page">
      <PageHead title={es.library.fathers} subtitle="Los maestros de la Iglesia y sus obras." />
      {fathers.loading ? <Loading /> : null}
      <div className="list">
        {fathers.data?.map((father) => (
          <ListRow
            key={father.id}
            to={`/biblioteca/padres/${father.id}`}
            title={father.name}
            meta={`${father.century} · ${father.biography.slice(0, 140)}…`}
            trailing={<StatusTag status={father.status} />}
          />
        ))}
      </div>
      <p className="source-note">{FATHERS_NOTE}</p>
    </div>
  );
}
