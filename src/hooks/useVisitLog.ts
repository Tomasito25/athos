/** Registra la visita a un texto, para el historial y «continuar leyendo». */
import { useEffect } from 'react';
import { recordVisit } from '@/db/user';

export function useVisitLog(entry: { path: string; title: string; kind: string } | null) {
  useEffect(() => {
    if (!entry?.title) return;
    const timer = setTimeout(() => {
      void recordVisit(entry);
    }, 1500); // Sólo cuenta si el usuario se queda.
    return () => clearTimeout(timer);
  }, [entry?.path, entry?.title, entry?.kind]); // eslint-disable-line react-hooks/exhaustive-deps
}
