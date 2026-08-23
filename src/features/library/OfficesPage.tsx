import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { OFFICES_NOTE, OFFICE_KIND_LABELS } from '@/content/offices';
import { ListRow, Loading, PageHead, Section, StatusTag } from '@/components/ui';
import type { OfficeKind } from '@/types';
import es from '@/locales/es';

export function OfficesPage() {
  const offices = useAsync(() => db.liturgies.orderBy('order').toArray(), []);

  const groups = new Map<OfficeKind, typeof offices.data>();
  for (const office of offices.data ?? []) {
    const list = groups.get(office.kind) ?? [];
    list!.push(office);
    groups.set(office.kind, list);
  }

  return (
    <div className="page">
      <PageHead title={es.library.liturgy} subtitle="Para seguir los oficios." />
      {offices.loading ? <Loading /> : null}

      {[...groups.entries()].map(([kind, list]) => (
        <Section key={kind} title={OFFICE_KIND_LABELS[kind]}>
          <div className="list">
            {list?.map((office) => (
              <ListRow
                key={office.id}
                to={`/biblioteca/liturgia/${office.id}`}
                title={office.title}
                meta={office.subtitle}
                trailing={<StatusTag status={office.status} />}
              />
            ))}
          </div>
        </Section>
      ))}

      <p className="source-note">{OFFICES_NOTE}</p>
    </div>
  );
}
