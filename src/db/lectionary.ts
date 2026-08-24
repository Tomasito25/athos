/**
 * Leccionario diario.
 *
 * Las lecturas de cada día se generan a partir de orthocal (MIT, de Brian
 * Glass), que implementa el cómputo bizantino completo: el salto lucano, las
 * semanas que se añaden u omiten según la fecha de la Pascua y los propios del
 * Menaion. ATHOS no reimplementa esa lógica; guarda su resultado para veintidós
 * años y lo sirve sin conexión.
 *
 * Véase `scripts/build-lectionary.py`.
 */
import type { CalendarStyle, ReadingRef } from '@/types';
import { create } from 'zustand';

export interface LectionaryFile {
  format: string;
  version: number;
  source: string;
  url: string;
  tradition: string;
  calendar: string;
  generated: string;
  readings: RawReading[][];
  years: Record<string, Record<string, number>>;
}

interface RawReading {
  kind: ReadingRef['kind'];
  reference: string;
  book?: string;
  chapter?: number;
  note?: string;
  compuesta?: boolean;
}

const cargados = new Map<CalendarStyle, LectionaryFile>();
const enCurso = new Map<CalendarStyle, Promise<LectionaryFile | null>>();

const archivo = (estilo: CalendarStyle) =>
  `${import.meta.env.BASE_URL}content/lectionary/lectionary${estilo === 'juliano' ? '-juliano' : ''}.json`;

/** Avisa a la interfaz de que ya hay leccionario que mostrar. */
export const useLectionaryStatus = create<{ version: number; bump: () => void }>((set) => ({
  version: 0,
  bump: () => set((s) => ({ version: s.version + 1 })),
}));

export async function loadLectionary(estilo: CalendarStyle): Promise<LectionaryFile | null> {
  const ya = cargados.get(estilo);
  if (ya) return ya;

  const pendiente = enCurso.get(estilo);
  if (pendiente) return pendiente;

  const peticion = (async () => {
    try {
      const respuesta = await fetch(archivo(estilo));
      if (!respuesta.ok) return null;
      const datos = (await respuesta.json()) as LectionaryFile;
      cargados.set(estilo, datos);
      useLectionaryStatus.getState().bump();
      return datos;
    } catch {
      // Sin red y sin caché todavía: se usará el leccionario incorporado.
      return null;
    } finally {
      enCurso.delete(estilo);
    }
  })();

  enCurso.set(estilo, peticion);
  return peticion;
}

/**
 * Lecturas de una fecha, si el leccionario ya está en memoria.
 * Es síncrono a propósito: el cálculo del día litúrgico también lo es.
 */
export function lookupReadings(iso: string, estilo: CalendarStyle): ReadingRef[] | null {
  const datos = cargados.get(estilo);
  if (!datos) return null;

  const [anio, mes, dia] = iso.split('-');
  const indice = datos.years[anio]?.[`${mes}-${dia}`];
  if (indice === undefined) return null;

  return (datos.readings[indice] ?? []).map((r) => ({
    kind: r.kind,
    reference: r.reference,
    passageId: r.book && r.chapter ? `${r.book}.${r.chapter}` : undefined,
    note: r.note,
  }));
}

export function lectionaryMeta(estilo: CalendarStyle): LectionaryFile | null {
  return cargados.get(estilo) ?? null;
}

/** Años cubiertos por el leccionario incorporado. */
export function lectionaryRange(estilo: CalendarStyle): [number, number] | null {
  const datos = cargados.get(estilo);
  if (!datos) return null;
  const anios = Object.keys(datos.years).map(Number).sort((a, b) => a - b);
  return anios.length ? [anios[0], anios.at(-1)!] : null;
}
