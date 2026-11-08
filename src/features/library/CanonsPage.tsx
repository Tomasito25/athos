import { db } from '@/db/db';
import { HymnIndex } from './HymnPages';
import es from '@/locales/es';

export function CanonsPage() {
  return (
    <HymnIndex
      title={es.library.canons}
      subtitle="Nueve odas construidas sobre los cánticos bíblicos."
      basePath="/biblioteca/canones"
      load={() => db.canons.toArray()}
    />
  );
}
