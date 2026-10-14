/**
 * Un texto de la biblioteca plegado dentro de otro.
 *
 * Donde antes una rúbrica decía «está entero en Biblioteca → Cánones» y había
 * que salir de la oración para buscarlo, ahora está ahí mismo, plegado: se
 * abre, se reza y se sigue. No se carga hasta que se abre.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { Blocks } from '@/components/ui';
import type { OfficeSection, TextBlock } from '@/types';

interface Embebido {
  title: string;
  path: string;
  sections: Array<{ id: string; title?: string; blocks: TextBlock[] }>;
}

async function cargar(ref: string): Promise<Embebido | null> {
  const [tipo, resto = ''] = ref.split(':');
  const [id = '', secciones] = resto.split('#');
  const solo = secciones?.split(',').filter(Boolean);
  const filtrar = (s: OfficeSection[]) => s.filter((x) => !solo?.length || solo.includes(x.id));

  switch (tipo) {
    case 'canon': {
      const c = await db.canons.get(id);
      return c ? { title: c.title, path: `/biblioteca/canones/${id}`, sections: filtrar(c.odes) } : null;
    }
    case 'akathist': {
      const a = await db.akathists.get(id);
      return a ? { title: a.title, path: `/biblioteca/akathistos/${id}`, sections: filtrar(a.sections) } : null;
    }
    case 'office': {
      const o = await db.liturgies.get(id);
      return o ? { title: o.title, path: `/biblioteca/liturgia/${id}`, sections: filtrar(o.sections) } : null;
    }
    case 'prayer': {
      const p = await db.prayers.get(id);
      return p ? { title: p.title, path: `/orar/oraciones/${id}`, sections: [{ id, blocks: p.blocks }] } : null;
    }
    default:
      return null;
  }
}

export default function EmbeddedText({ reference, label }: { reference: string; label: string }) {
  const [abierto, setAbierto] = useState(false);
  const texto = useAsync(() => (abierto ? cargar(reference) : Promise.resolve(null)), [abierto, reference]);

  return (
    <details className="inline-psalm embedded" open={abierto} onToggle={(e) => setAbierto(e.currentTarget.open)}>
      <summary className="inline-psalm__head">
        <span className="inline-psalm__title">{label}</span>
        <span className="embedded__hint">{abierto ? 'Plegar' : 'Rezarlo aquí'}</span>
      </summary>
      {abierto ? (
        <div className="inline-psalm__body">
          {texto.loading ? <p className="muted">Cargando…</p> : null}
          {texto.data
            ? texto.data.sections.map((s) => (
                <section key={s.id} style={{ marginTop: 'var(--sp-3)' }}>
                  {s.title && texto.data!.sections.length > 1 ? <h4 className="day-devotion__part">{s.title}</h4> : null}
                  <Blocks blocks={s.blocks} />
                </section>
              ))
            : null}
          {texto.data ? (
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              <Link to={texto.data.path}>Abrirlo en su ficha</Link>, con su procedencia.
            </p>
          ) : !texto.loading ? (
            <p className="notice notice--pending">Este texto no está disponible ahora.</p>
          ) : null}
        </div>
      ) : null}
    </details>
  );
}
