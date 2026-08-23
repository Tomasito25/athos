import { useUi } from '@/stores/ui';
import { IconClose } from '@/components/icons';
import es from '@/locales/es';

/** Avisos efímeros, discretos y sin sonido. */
export function Toasts() {
  const { toasts, dismissToast } = useUi();
  if (!toasts.length) return null;

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <span className="toast__text">{toast.message}</span>
          {toast.action ? (
            <button
              type="button"
              className="btn btn--sm btn--ghost"
              onClick={() => {
                toast.action?.run();
                dismissToast(toast.id);
              }}
            >
              {toast.action.label}
            </button>
          ) : null}
          <button
            type="button"
            className="icon-btn"
            style={{ width: '2rem', height: '2rem' }}
            onClick={() => dismissToast(toast.id)}
            aria-label={es.app.close}
          >
            <IconClose size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
