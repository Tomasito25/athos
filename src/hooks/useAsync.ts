/**
 * Carga asíncrona con estados de carga y error.
 *
 * El estado de «cargando» se deduce de comparar la clave de la petición en
 * curso con la del resultado guardado, en lugar de escribirlo dentro del
 * efecto: así no se encadenan renders innecesarios.
 */
import { useCallback, useEffect, useState } from 'react';

export interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

interface Resolved<T> {
  key: string;
  data?: T;
  error: Error | null;
}

export function useAsync<T>(loader: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [nonce, setNonce] = useState(0);

  // Las dependencias se resumen en una clave de texto. Calcularla en cada
  // render es más barato que memorizarla, y evita una lista de dependencias
  // de longitud variable. Los llamantes pasan valores primitivos.
  const key = `${nonce}|${deps.map((value) => String(value)).join('¦')}`;

  const [resolved, setResolved] = useState<Resolved<T>>({ key: '', error: null });

  useEffect(() => {
    let alive = true;
    loader()
      .then((data) => {
        if (alive) setResolved({ key, data, error: null });
      })
      .catch((error: unknown) => {
        if (alive) {
          setResolved({
            key,
            data: undefined,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      });
    return () => {
      alive = false;
    };
    // `loader` se redefine en cada render; la clave es la que manda.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const settled = resolved.key === key;
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return {
    data: settled ? resolved.data : undefined,
    loading: !settled,
    error: settled ? resolved.error : null,
    reload,
  };
}
