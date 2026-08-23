import { db } from '@/db/db';
import { HymnIndex } from './HymnPages';
import es from '@/locales/es';

export function AkathistsPage() {
  return (
    <HymnIndex
      title={es.library.akathists}
      subtitle="Himnos que se cantan de pie, sin sentarse."
      basePath="/biblioteca/akathistos"
      load={() => db.akathists.toArray()}
    />
  );
}
