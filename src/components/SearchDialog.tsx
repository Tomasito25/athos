import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Loading } from '@/components/ui';
import { IconSearch } from '@/components/icons';
import { searchAll } from '@/db/search';
import type { SearchOutcome } from '@/db/search';
import { useUi } from '@/stores/ui';
import { highlight, tokenize } from '@/lib/text';
import es from '@/locales/es';

const OPTION_ID = (index: number) => `busqueda-resultado-${index}`;

/**
 * Búsqueda global. Se abre con Ctrl/⌘ + K y funciona sin conexión.
 *
 * Se recorre con las flechas sin soltar el teclado: el foco no se mueve del
 * campo —así se puede seguir escribiendo— y el resultado señalado se anuncia
 * con `aria-activedescendant`, que es el patrón de caja combinada. Antes las
 * flechas no hacían nada y Enter abría siempre el primero, lo que dejaba el
 * atajo a medias: se llegaba rápido a la búsqueda y luego había que coger el
 * ratón.
 */
export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUi();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [outcome, setOutcome] = useState<SearchOutcome | null>(null);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const stale = outcome !== null && trimmed.length < 2;

  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen || trimmed.length < 2) return;
    let alive = true;
    const timer = setTimeout(() => {
      setBusy(true);
      searchAll(trimmed, { limitPerGroup: 5 })
        .then((result) => {
          if (alive) setOutcome(result);
        })
        .finally(() => {
          if (alive) setBusy(false);
        });
    }, 180);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [trimmed, searchOpen]);

  const close = useCallback(() => {
    setSearchOpen(false);
    setQuery('');
    setOutcome(null);
    setActive(0);
  }, [setSearchOpen]);

  const go = useCallback(
    (path: string) => {
      close();
      navigate(path);
    },
    [close, navigate],
  );

  const tokens = tokenize(query);
  const visible = stale ? null : outcome;

  /**
   * Los grupos, en una sola fila.
   *
   * Las flechas recorren todos los resultados de arriba abajo sin que el
   * usuario tenga que saber que están repartidos en grupos: los grupos
   * ordenan la vista, no el recorrido.
   */
  const { plana, inicio } = useMemo(() => {
    const grupos = visible?.groups ?? [];
    const inicio = new Map<string, number>();
    let n = 0;
    for (const group of grupos) {
      inicio.set(group.kind, n);
      n += group.results.length;
    }
    return { plana: grupos.flatMap((group) => group.results), inicio };
  }, [visible]);

  /**
   * Cada tanda de resultados vuelve a señalar el primero.
   *
   * Se ajusta durante el render y no en un efecto: así no hay un instante
   * pintado con el índice viejo apuntando a un resultado que ya es otro.
   */
  const [vistos, setVistos] = useState<SearchOutcome | null>(null);
  if (vistos !== visible) {
    setVistos(visible);
    setActive(0);
  }

  // El resultado señalado tiene que verse, aunque se haya llegado a él con
  // el teclado y esté fuera del trozo visible de la lista.
  useEffect(() => {
    if (!plana.length) return;
    const nodo = listRef.current?.querySelector(`#${CSS.escape(OPTION_ID(active))}`);
    nodo?.scrollIntoView({ block: 'nearest' });
  }, [active, plana.length]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!plana.length) {
      // Sin resultados, Enter no debe tragarse la tecla.
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive((i) => (i + 1) % plana.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive((i) => (i - 1 + plana.length) % plana.length);
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(plana.length - 1);
        break;
      case 'Enter': {
        event.preventDefault();
        const elegido = plana[active] ?? plana[0];
        if (elegido) go(elegido.path);
        break;
      }
      default:
        break;
    }
  };

  return (
    <Dialog open={searchOpen} onClose={close} title={es.search.title}>
      <div className="row" style={{ marginBottom: 'var(--sp-4)' }}>
        <IconSearch size={20} style={{ color: 'var(--ink-muted)', flex: 'none' }} />
        <input
          ref={inputRef}
          type="search"
          className="input"
          placeholder={es.search.placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          aria-label={es.search.placeholder}
          role="combobox"
          aria-expanded={plana.length > 0}
          aria-controls="busqueda-resultados"
          aria-autocomplete="list"
          aria-activedescendant={plana.length ? OPTION_ID(active) : undefined}
        />
      </div>

      {trimmed.length < 2 ? (
        <p className="muted text-sm">{es.search.hint}</p>
      ) : busy && !visible ? (
        <Loading />
      ) : visible && visible.total === 0 ? (
        <p className="muted text-sm">{es.search.noResults.replace('{{query}}', trimmed)}</p>
      ) : (
        <div className="stack stack--loose" id="busqueda-resultados" role="listbox" ref={listRef}>
          {visible?.bibleIndexed === false ? (
            <p className="notice notice--pending">{es.search.bibleNotIndexed}</p>
          ) : null}

          {visible?.groups.map((group) => (
            <section key={group.kind}>
              <div className="section__head">
                <h3 className="section__title">{group.label}</h3>
                <span className="pill-count">{group.total}</span>
              </div>
              <div className="list">
                {group.results.map((result, i) => {
                  const index = (inicio.get(group.kind) ?? 0) + i;
                  const señalado = index === active;
                  return (
                    <button
                      key={result.id}
                      id={OPTION_ID(index)}
                      type="button"
                      role="option"
                      aria-selected={señalado}
                      className={`list-item${señalado ? ' list-item--active' : ''}`}
                      onClick={() => go(result.path)}
                      onMouseMove={() => setActive(index)}
                    >
                      <span className="list-item__body">
                        <span className="list-item__title">{result.title}</span>
                        <span
                          className="list-item__meta"
                          dangerouslySetInnerHTML={{ __html: highlight(result.snippet, tokens) }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          {visible && visible.total > 0 ? (
            <>
              <button
                type="button"
                className="btn btn--block"
                onClick={() => go(`/buscar?q=${encodeURIComponent(trimmed)}`)}
              >
                {es.search.seeAll.replace('{{count}}', String(visible.total))}
              </button>
              <p className="muted text-xs keyboard-hint">{es.search.keyboardHint}</p>
            </>
          ) : null}
        </div>
      )}
    </Dialog>
  );
}
