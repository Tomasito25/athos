import { db } from '@/db/db';
import { HymnDetail } from './HymnPages';
import es from '@/locales/es';

export function CanonPage() {
  return (
    <HymnDetail
      eyebrow={es.library.canons}
      basePath="/biblioteca/canones"
      favoriteKind="canon"
      load={(id) => db.canons.get(id)}
    />
  );
}
