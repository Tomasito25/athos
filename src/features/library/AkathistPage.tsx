import { db } from '@/db/db';
import { HymnDetail } from './HymnPages';
import es from '@/locales/es';

export function AkathistPage() {
  return (
    <HymnDetail
      eyebrow={es.library.akathists}
      basePath="/biblioteca/akathistos"
      favoriteKind="akathist"
      load={(id) => db.akathists.get(id)}
    />
  );
}
