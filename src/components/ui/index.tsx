/** Piezas de interfaz reutilizables. */
import {
  useEffect,
  useId,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconChevronRight, IconClose, IconStar, IconStarFilled } from '@/components/icons';
import { RichText } from '@/components/RichText';
import type { ContentStatus, LicenseId, SourceMeta, TextBlock } from '@/types';
import { useSettings } from '@/stores/settings';
import es from '@/locales/es';

/* ---------------- Encabezado de página ---------------- */

export function PageHead({
  title,
  subtitle,
  eyebrow,
  actions,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-head">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="page-head__row">
        <h1 className="page-head__title display">{title}</h1>
        {actions ? <div className="page-head__actions">{actions}</div> : null}
      </div>
      {subtitle ? <p className="page-head__sub">{subtitle}</p> : null}
    </header>
  );
}

/* ---------------- Separador ornamental ---------------- */

export function Rule({ mark = '✤', plain = false }: { mark?: string; plain?: boolean }) {
  return (
    <div className={plain ? 'rule rule--plain' : 'rule'} role="separator">
      {!plain && <span className="rule__mark" aria-hidden="true">{mark}</span>}
    </div>
  );
}

/* ---------------- Sección ---------------- */

export function Section({
  title,
  action,
  children,
  id,
}: {
  title?: string;
  action?: { label: string; to: string };
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="section" id={id} aria-labelledby={title && id ? `${id}-title` : undefined}>
      {(title || action) && (
        <div className="section__head">
          {title ? (
            <h2 className="section__title" id={id ? `${id}-title` : undefined}>
              {title}
            </h2>
          ) : (
            <span />
          )}
          {action ? (
            <Link className="section__action" to={action.to}>
              {action.label}
            </Link>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}

/* ---------------- Panel ---------------- */

export function Panel({
  children,
  variant,
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement> & { variant?: 'quiet' | 'sunken' }) {
  const modifier = variant ? ` panel--${variant}` : '';
  return (
    <div className={`panel${modifier} ${className}`} {...rest}>
      {children}
    </div>
  );
}

/* ---------------- Botón ---------------- */

type ButtonVariant = 'default' | 'primary' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

const buttonClass = ({ variant = 'default', size = 'md', block }: ButtonProps) =>
  [
    'btn',
    variant !== 'default' ? `btn--${variant}` : '',
    size !== 'md' ? `btn--${size}` : '',
    block ? 'btn--block' : '',
  ]
    .filter(Boolean)
    .join(' ');

export function Button({ variant, size, block, className = '', ...rest }: ButtonProps) {
  return <button type="button" className={`${buttonClass({ variant, size, block })} ${className}`} {...rest} />;
}

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

export function ButtonLink({
  to,
  variant,
  size,
  block,
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link to={to} className={`${buttonClass({ variant, size, block })} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

/* ---------------- Etiqueta ---------------- */

export function Tag({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: 'gold' | 'red' | 'blue' | 'green';
}) {
  return <span className={`tag${tone ? ` tag--${tone}` : ''}`}>{children}</span>;
}

/* ---------------- Lista ---------------- */

export function ListRow({
  to,
  onClick,
  title,
  meta,
  leading,
  trailing,
  chevron = true,
}: {
  to?: string;
  onClick?: () => void;
  title: ReactNode;
  meta?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  chevron?: boolean;
}) {
  const inner = (
    <>
      {leading}
      <span className="list-item__body">
        <span className="list-item__title">{title}</span>
        {meta ? <span className="list-item__meta">{meta}</span> : null}
      </span>
      {trailing}
      {chevron ? <IconChevronRight size={18} className="list-item__chevron" /> : null}
    </>
  );

  if (to) {
    return (
      <Link className="list-item" to={to}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className="list-item" onClick={onClick}>
      {inner}
    </button>
  );
}

export function List({ children }: { children: ReactNode }) {
  return <div className="list">{children}</div>;
}

/* ---------------- Progreso ---------------- */

export function Progress({ value, label }: { value: number; label?: string }) {
  const percent = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="progress">
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress__label">{percent}%</span>
    </div>
  );
}

/** Progreso en bloques, como el boceto original: ████████░░ */
export function ProgressBlocks({ value, blocks = 10 }: { value: number; blocks?: number }) {
  const filled = Math.round(Math.min(1, Math.max(0, value)) * blocks);
  const percent = Math.round(value * 100);
  return (
    <p className="progress-blocks" aria-label={`${percent} por ciento`}>
      <span aria-hidden="true">{'█'.repeat(filled)}</span>
      <span className="progress-blocks__empty" aria-hidden="true">
        {'░'.repeat(blocks - filled)}
      </span>
      <span className="muted text-sm">  {percent}%</span>
    </p>
  );
}

/* ---------------- Campos ---------------- */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
}) {
  const id = useId();
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {children(id)}
      {hint ? <p className="field__hint">{hint}</p> : null}
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="switch"
      onClick={() => onChange(!checked)}
    >
      <span className="switch__text">
        <span className="switch__title">{title}</span>
        {description ? <span className="switch__desc">{description}</span> : null}
      </span>
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
    </button>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (next: T) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="segmented__option"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Diálogo ---------------- */

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={labelledBy ?? (title ? titleId : undefined)}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="dialog__panel">
        {title ? (
          <header className="dialog__head">
            <h2 className="dialog__title" id={titleId}>
              {title}
            </h2>
            <button type="button" className="icon-btn" onClick={onClose} aria-label={es.app.close}>
              <IconClose size={20} />
            </button>
          </header>
        ) : null}
        <div className="dialog__body">{children}</div>
        {footer ? <footer className="dialog__foot">{footer}</footer> : null}
      </div>
    </dialog>
  );
}

/* ---------------- Estados ---------------- */

/**
 * Un hueco explicado.
 *
 * Cuando el vacío ES la página —una dirección que no existe, un texto que no
 * está incorporado— hay que pasarle `heading`, para que el título salga como
 * encabezado de primer nivel. Sin él, esas pantallas se quedaban sin ninguno y
 * quien navega con lector de pantalla no encontraba dónde empieza el contenido.
 */
export function Empty({
  title,
  text,
  action,
  heading = false,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
  heading?: boolean;
}) {
  return (
    <div className="empty">
      <span aria-hidden="true" style={{ color: 'var(--gold)', opacity: 0.5, fontSize: '1.4rem' }}>
        ✤
      </span>
      {heading ? (
        <h1 className="empty__title">{title}</h1>
      ) : (
        <p className="empty__title">{title}</p>
      )}
      {text ? <p className="empty__text">{text}</p> : null}
      {action}
    </div>
  );
}

export function Notice({
  children,
  variant,
}: {
  children: ReactNode;
  variant?: 'pending' | 'warn';
}) {
  return <div className={`notice${variant ? ` notice--${variant}` : ''}`}>{children}</div>;
}

export function Loading({ label = es.app.loading }: { label?: string }) {
  return (
    <p className="loading" role="status" aria-live="polite">
      {label}
    </p>
  );
}

/* ---------------- Favorito ---------------- */

export function FavoriteButton({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="icon-btn"
      aria-pressed={active}
      aria-label={active ? es.favorites.remove : es.favorites.add}
      onClick={onToggle}
      title={active ? es.favorites.remove : es.favorites.add}
    >
      {active ? <IconStarFilled size={20} /> : <IconStar size={20} />}
    </button>
  );
}

/* ---------------- Texto litúrgico ---------------- */

/** Repeticiones de una fórmula: «tres veces», «doce veces»… */
const VECES: Record<number, string> = {
  2: 'dos veces',
  3: 'tres veces',
  12: 'doce veces',
  40: 'cuarenta veces',
};

const veces = (n: number) => VECES[n] ?? `${n} veces`;

/** El griego y su transliteración, debajo del español. */
function GreekLines({ block }: { block: TextBlock }) {
  const modo = useSettings((s) => s.greekMode);
  if (modo === 'oculto' || !block.greek) return null;

  return (
    <span className="greek">
      <span className="greek__original" lang="el">
        {block.greek}
      </span>
      {modo === 'ambos' && block.roman ? (
        <span className="greek__roman">{block.roman}</span>
      ) : null}
    </span>
  );
}

/**
 * Presenta un texto litúrgico respetando la distinción entre rúbricas
 * (indicaciones, en rojo) y texto orante.
 */
/**
 * `linked` enlaza los nombres que tienen ficha dentro de ATHOS.
 *
 * Sólo se activa en la prosa que ha escrito ATHOS —los artículos del Athos,
 * por ejemplo—. Nunca en una oración, un tropario o un canon: el texto
 * litúrgico se muestra tal como es, sin adornos añadidos por la aplicación.
 * Por eso el valor por defecto es `false` y hay que pedirlo expresamente.
 */
export function Blocks({
  blocks,
  illuminated = false,
  linked = false,
}: {
  blocks: TextBlock[];
  illuminated?: boolean;
  linked?: boolean;
}) {
  return (
    <div className={`prose book-surface${illuminated ? ' prose--illuminated' : ''}`}>
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;
        switch (block.kind) {
          case 'heading':
            return (
              <h3 key={key} style={{ marginTop: index === 0 ? 0 : '1.4em', marginBottom: '0.4em' }}>
                {block.content}
              </h3>
            );
          case 'rubric':
            return (
              <p key={key} className="rubric" style={{ marginTop: '1em' }}>
                {linked ? <RichText max={2}>{block.content}</RichText> : block.content}
              </p>
            );
          case 'refrain':
            return (
              <p
                key={key}
                style={{ marginTop: '0.9em', paddingInlineStart: '1.2em', borderInlineStart: '2px solid var(--gold-wash)' }}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            );
          case 'verse':
            return (
              <p key={key}>
                {block.ref ? <span className="verse-num">{block.ref}</span> : null}
                {block.content}
              </p>
            );
          case 'pending':
            return (
              <p key={key} className="notice notice--pending" style={{ marginTop: '1em' }}>
                {block.content}
              </p>
            );
          default:
            // Con `linked` no se usa `dangerouslySetInnerHTML`: la prosa de
            // ATHOS no lleva etiquetas, y así el enlazado no puede romper
            // marcado ajeno.
            if (linked) {
              return (
                <p key={key}>
                  <RichText>{block.content}</RichText>
                  <GreekLines block={block} />
                </p>
              );
            }
            return (
              <p key={key}>
                <span dangerouslySetInnerHTML={{ __html: block.content }} />
                {block.times && block.times > 1 ? (
                  <em className="repeat"> ({veces(block.times)})</em>
                ) : null}
                <GreekLines block={block} />
              </p>
            );
        }
      })}
    </div>
  );
}

/* ---------------- Procedencia ---------------- */

const STATUS_LABELS: Record<ContentStatus, string> = {
  complete: es.sources.statusComplete,
  partial: es.sources.statusPartial,
  pending: es.sources.statusPending,
};

export function SourceNote({ meta, status }: { meta: SourceMeta; status?: ContentStatus }) {
  const rows: Array<[string, string | undefined]> = [
    [es.sources.author, meta.author],
    [es.sources.translator, meta.translator],
    [es.sources.source, meta.source],
    [es.sources.tradition, meta.tradition],
    [es.sources.license, es.licenses[meta.license as LicenseId] ?? meta.license],
    [es.sources.copyright, meta.copyright],
    [es.sources.status, status ? STATUS_LABELS[status] : undefined],
    [es.sources.notes, meta.notes],
  ];

  return (
    <dl className="source-note">
      {rows
        .filter(([, value]) => Boolean(value))
        .map(([label, value]) => (
          <div key={label} style={{ display: 'block' }}>
            <dt>{label}:</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  );
}

export function StatusTag({ status }: { status: ContentStatus }) {
  if (status === 'complete') return null;
  return <Tag tone={status === 'pending' ? undefined : 'gold'}>{STATUS_LABELS[status]}</Tag>;
}

export function CheckCircle({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '1.5rem',
        height: '1.5rem',
        flex: 'none',
        borderRadius: '50%',
        border: `1px solid ${done ? 'var(--gold)' : 'var(--line-strong)'}`,
        background: done ? 'var(--gold)' : 'transparent',
        color: done ? 'var(--surface)' : 'transparent',
      }}
    >
      <IconCheck size={14} />
    </span>
  );
}
