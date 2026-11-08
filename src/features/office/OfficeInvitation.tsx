/**
 * La invitación de la hora.
 *
 * Es lo primero que se ve al abrir ATHOS: qué oficio toca ahora y un botón
 * para empezar. Si ya se ha rezado, lo dice y ofrece volver a él.
 */
import { Link } from 'react-router-dom';
import { OFFICE_BY_TIME } from '@/content/hours';
import { LENGTH_INFO, minutesFor } from '@/content/office-lengths';
import { useOfficeProgress } from './useOfficeProgress';
import { useToday } from '@/hooks/useLiturgicalDay';
import { useSettings } from '@/stores/settings';
import { ProgressBlocks } from '@/components/ui';
import { OrthodoxCross } from '@/components/icons';
import { officeNow } from '@/lib/office-time';
import es from '@/locales/es';

export function OfficeInvitation() {
  const today = useToday();
  const horas = useSettings((s) => s.officeHours);
  const ahora = officeNow(new Date().getHours(), horas);
  const definicion = OFFICE_BY_TIME.get(ahora);
  const medida = useSettings((s) => s.officeLength?.[ahora] ?? 'habitual');

  const progreso = useOfficeProgress(today);
  // Sin regla para este momento —el usuario la borró— no hay nada que invitar a rezar.
  if (progreso.data && !progreso.data.has(ahora)) return null;

  const ratio = progreso.data?.get(ahora)?.ratio ?? 0;
  const empezado = ratio > 0;
  const completo = ratio >= 1;

  return (
    <Link
      to={`/orar/oficio/${ahora}`}
      className="office-invite"
      aria-label={`${es.office.pray}: ${definicion?.name ?? ''}`}
    >
      <OrthodoxCross size={26} className="office-invite__mark" aria-hidden="true" />

      <p className="eyebrow">{completo ? es.office.done : es.office.now}</p>
      <p className="office-invite__name display">{definicion?.name}</p>
      {definicion ? (
        <p className="office-invite__greek" lang="el">
          {definicion.greekName}
        </p>
      ) : null}
      <p className="office-invite__length">
        {LENGTH_INFO.get(medida)?.label} · {es.office.minutes.replace('{{n}}', String(minutesFor(ahora, medida)))}
      </p>

      {empezado && !completo ? (
        <div className="office-invite__progress">
          <ProgressBlocks value={ratio} />
          <p className="muted text-sm">{es.office.continueLater}</p>
        </div>
      ) : null}

      <span className="btn btn--primary btn--lg office-invite__button">
        {completo ? es.office.open : empezado ? 'Continuar' : es.office.pray}
      </span>
    </Link>
  );
}
