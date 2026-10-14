/**
 * El akathistos o el canon de hoy, dentro de un oficio o de una oración.
 *
 * Dice cuál toca y por qué, y lo trae entero, plegado: quien quiera rezarlo
 * lo abre ahí mismo, sin salir de donde está. Lo elige `dayDevotion`, que no
 * inventa ninguno: escoge entre los que ATHOS tiene enteros.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { dayDevotion } from '@/lib/calendar/day-devotion';
import { db } from '@/db/db';
import { Blocks } from '@/components/ui';
import type { OfficeSection } from '@/types';

export default function DayDevotion({ kind, open = false }: { kind: 'akathist' | 'canon'; open?: boolean }) {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const devocion = dayDevotion(day);
  const eleccion = kind === 'akathist' ? devocion.akathist : devocion.canon;

  const texto = useAsync(async () => {
    if (!eleccion) return null;
    if (kind === 'akathist') {
      const a = await db.akathists.get(eleccion.id);
      return a ? { title: a.title, sections: a.sections, path: `/biblioteca/akathistos/${a.id}` } : null;
    }
    const c = await db.canons.get(eleccion.id);
    return c ? { title: c.title, sections: c.odes, path: `/biblioteca/canones/${c.id}` } : null;
  }, [kind, eleccion?.id]);

  const [abierto, setAbierto] = useState(open);

  if (!eleccion) {
    return (
      <div className="day-troparion">
        <div className="day-troparion__notice">
          <p>{devocion.notice}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="day-troparion day-devotion">
      <p className="day-troparion__date">
        {kind === 'akathist' ? 'Akathistos de hoy' : 'Canon de hoy'}
        {texto.data ? `: ${texto.data.title}` : ''}
      </p>
      <p className="rubric">{eleccion.reason}</p>
      {texto.data ? (
        <details className="inline-psalm" open={abierto} onToggle={(e) => setAbierto(e.currentTarget.open)}>
          <summary className="inline-psalm__head">
            <span className="inline-psalm__title">{abierto ? 'Plegar' : 'Rezarlo aquí, entero'}</span>
          </summary>
          {abierto ? (
            <div className="inline-psalm__body">
              {texto.data.sections.map((s: OfficeSection) => (
                <section key={s.id} style={{ marginTop: 'var(--sp-4)' }}>
                  <h4 className="day-devotion__part">{s.title}</h4>
                  <Blocks blocks={s.blocks} />
                </section>
              ))}
              <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
                <Link to={texto.data.path}>Abrirlo en su ficha</Link>, con su procedencia.
              </p>
            </div>
          ) : null}
        </details>
      ) : null}
    </div>
  );
}
