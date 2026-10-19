/**
 * Los nombres de la lista del usuario, en la conmemoración.
 *
 * Donde la oración dice «N.», se dicen los nombres de los nuestros. ATHOS los
 * pone aquí, en su sitio, para que no haya que recordarlos de memoria cada
 * mañana: los de la lista de vivos en la conmemoración de los vivos, los de
 * difuntos en la de los difuntos y en la panihida.
 */
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { listDiptychs } from '@/db/user';
import type { DiptychName } from '@/types';
import es from '@/locales/es';

export default function Commemoration({ list }: { list: DiptychName['list'] }) {
  const nombres = useAsync(() => listDiptychs(list), [list]);
  if (nombres.loading) return null;
  const lista = nombres.data ?? [];

  return (
    <div className="commemoration">
      {lista.length ? (
        <>
          <p className="commemoration__label">{list === 'vivos' ? es.names.yourLiving : es.names.yourDeparted}</p>
          <p className="commemoration__names">{lista.map((n) => n.name).join(', ')}</p>
          <Link to="/orar/nombres" className="commemoration__edit">
            {es.names.edit}
          </Link>
        </>
      ) : (
        <p className="commemoration__empty">
          {es.names.emptyHint}{' '}
          <Link to="/orar/nombres">{es.names.add}</Link>
        </p>
      )}
    </div>
  );
}
