/**
 * El santoral completo: cada santo con su vida, sus himnos y su procedencia.
 *
 * No se importa desde el arranque. Lo usan la siembra de la base de datos, de
 * donde leen la ficha y la lista de santos, y las pruebas. El calendario y la
 * portada se arreglan con el índice de `saints.ts`.
 */
import type { Saint, SourceMeta, TextBlock } from '@/types';
import { SAINT_SEEDS } from './saints';
import { VIDAS_PRINCIPALES } from './vidas/principales';
import { VIDAS_MAS } from './vidas/mas';
import { VIDAS_TERCERA } from './vidas/tercera';
import { VIDAS_ANIO_1 } from './vidas/anio-1';
import { VIDAS_ANIO_2 } from './vidas/anio-2';
import { VIDAS_ANIO_3 } from './vidas/anio-3';
import { VIDAS_ANIO_4 } from './vidas/anio-4';
import { VIDAS_ANIO_5 } from './vidas/anio-5';
import { VIDAS_ANIO_6 } from './vidas/anio-6';

const bio: SourceMeta = {
  source: 'Reseña histórica redactada para ATHOS a partir de fuentes hagiográficas comunes',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
};

const pendingHymn: TextBlock[] = [
  { kind: 'pending', content: 'Contenido pendiente de incorporar.' },
];

const troparia: Record<string, TextBlock[]> = {
  pascua: [
    { kind: 'text', content: 'Cristo ha resucitado de entre los muertos, con su muerte ha vencido a la muerte y a los que estaban en los sepulcros les ha dado la vida.' },
  ],
};

/** La vida de cada santo, por su identificador. */
export const VIDAS: Record<string, string> = {
  ...VIDAS_PRINCIPALES,
  ...VIDAS_MAS,
  ...VIDAS_TERCERA,
  ...VIDAS_ANIO_1,
  ...VIDAS_ANIO_2,
  ...VIDAS_ANIO_3,
  ...VIDAS_ANIO_4,
  ...VIDAS_ANIO_5,
  ...VIDAS_ANIO_6,
};

export const SAINTS: Saint[] = SAINT_SEEDS.map((s) => {
  const biography = VIDAS[s.id] ?? '';
  return {
    id: s.id,
    name: s.name,
    fullName: s.fullName,
    day: s.day,
    category: s.category,
    century: s.century,
    place: s.place,
    biography,
    troparion: s.troparion ?? troparia[s.id] ?? pendingHymn,
    kontakion: pendingHymn,
    status: s.status ?? 'partial',
    meta: bio,
    searchText: `${s.name} ${s.fullName ?? ''} ${s.place ?? ''} ${biography}`.toLowerCase(),
  };
});
