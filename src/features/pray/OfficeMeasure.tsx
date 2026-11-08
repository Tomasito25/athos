/**
 * La medida de los tres oficios, de una vez.
 *
 * Dentro de cada oficio se puede cambiar la suya; aquí se elige para los
 * tres, que es lo que hace quien empieza —todo en breve— o quien da el paso
 * siguiente. Cada opción dice cuánto se tarda y para quién es, porque «breve»
 * y «extenso» no dicen nada sin un número al lado.
 */
import { OFFICE_LENGTHS, minutesFor } from '@/content/office-lengths';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import type { OfficeLength, RuleTime } from '@/types';
import es from '@/locales/es';

const TIEMPOS: RuleTime[] = ['manana', 'mediodia', 'noche'];

/** «5–6 min», o «unos 8 min» si los tres tardan lo mismo. */
function rango(length: OfficeLength): string {
  const minutos = TIEMPOS.map((t) => minutesFor(t, length));
  const [menos, mas] = [Math.min(...minutos), Math.max(...minutos)];
  return menos === mas ? es.office.minutes.replace('{{n}}', String(menos)) : `${menos}–${mas} min`;
}

export function OfficeMeasure() {
  const medidas = useSettings((s) => s.officeLength);
  const poner = useSettings((s) => s.set);
  const toast = useUi((s) => s.toast);

  const valores = TIEMPOS.map((t) => medidas?.[t] ?? 'habitual');
  const comun = valores.every((v) => v === valores[0]) ? valores[0] : null;

  const elegir = (length: OfficeLength) => {
    poner('officeLength', { manana: length, mediodia: length, noche: length });
    const nombre = OFFICE_LENGTHS.find((l) => l.id === length)?.label.toLowerCase() ?? length;
    toast(es.pray.measureSet.replace('{{name}}', nombre));
  };

  return (
    <div className="measure">
      <div className="measure-options" role="radiogroup" aria-label={es.pray.measureAll}>
        {OFFICE_LENGTHS.map((l) => (
          <button
            key={l.id}
            type="button"
            role="radio"
            aria-checked={comun === l.id}
            className="measure-option"
            data-length={l.id}
            onClick={() => elegir(l.id)}
          >
            <span className="measure-option__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="measure-option__name">{l.label}</span>
            <span className="measure-option__minutes">{rango(l.id)}</span>
            <span className="measure-option__hint">{l.forWhom}</span>
          </button>
        ))}
      </div>
      {comun ? null : <p className="muted text-sm measure__mixed">{es.pray.measureMixed}</p>}
    </div>
  );
}
