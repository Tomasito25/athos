/**
 * Recordatorios a la hora programada.
 *
 * Antes cada recordatorio tenía una hora fija que no se podía cambiar, se
 * programaba sólo al activar el interruptor —al recargar la aplicación ya no
 * quedaba nada programado— y decía siempre lo mismo. Ahora:
 *
 * - cada uno tiene su hora, que se elige;
 * - se programan al arrancar ATHOS y cada vez que cambian los ajustes;
 * - dicen lo que toca ese día: el santo, la referencia del Evangelio, lo que
 *   queda del plan de lectura, el oficio en la medida que se reza;
 * - los que dependen del día —el ayuno, la fiesta, lo que falta de rezar—
 *   sólo suenan cuando hay algo que decir;
 * - tocar el aviso abre la pantalla que corresponde.
 *
 * Con la aplicación abierta o en segundo plano, un temporizador avisa en punto.
 * Para cuando está cerrada, se deja preparada en IndexedDB la cola de los
 * próximos días: el Service Worker la lee cuando el navegador lo despierta
 * con la sincronización periódica —sólo Chrome y Edge, con ATHOS instalada—,
 * y enseña lo que haya vencido. Los dos apuntan lo que han enseñado en el
 * mismo sitio, para no avisar dos veces.
 */
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { addDaysIso, toIsoDate } from '@/lib/calendar/jdn';
import { readingNote, readingTitle } from '@/lib/readings';
import { loadLectionary } from '@/db/lectionary';
import { getSetting, setSetting } from '@/db/db';
import { currentPlan } from '@/db/plans';
import { DAILY_OFFICES } from '@/content/hours';
import { LENGTH_INFO, minutesFor } from '@/content/office-lengths';
import { diptychsForSaints, isRulePrayed, ruleForTime, ruleItems } from '@/db/user';
import { db } from '@/db/db';
import { useSettings, type SettingsState } from '@/stores/settings';
import { isFastDay } from '@/lib/calendar/fasting';
import { appUrl, notificationPermission, showNotification } from './notifications';
import type { RuleTime } from '@/types';

/* ============================================================
   Qué recordatorios hay
   ============================================================ */

export type ReminderGroup = 'rezar' | 'leer' | 'dia';

export interface ReminderDefinition {
  id: string;
  group: ReminderGroup;
  title: string;
  description: string;
  /** Hora local por defecto, `HH:MM`. */
  defaultTime: string;
  /**
   * Sólo puede decidirlo la aplicación abierta, porque depende de lo que el
   * usuario haya hecho ese día. El Service Worker no lo enseña.
   */
  needsApp?: boolean;
}

export const REMINDER_GROUPS: Record<ReminderGroup, string> = {
  rezar: 'Para rezar',
  leer: 'Para leer',
  dia: 'Lo que trae el día',
};

export const REMINDERS: ReminderDefinition[] = [
  { id: 'oracion-manana', group: 'rezar', title: 'Oficio de la mañana', description: 'Al empezar el día, con la medida en que lo rezas.', defaultTime: '07:00' },
  { id: 'oracion-mediodia', group: 'rezar', title: 'Oficio del mediodía', description: 'La Hora Sexta, en mitad de la jornada.', defaultTime: '13:00' },
  { id: 'oracion-noche', group: 'rezar', title: 'Oficio de la noche', description: 'Antes del descanso.', defaultTime: '21:30' },
  { id: 'regla', group: 'rezar', title: 'Lo que queda por rezar', description: 'Sólo si a esa hora queda algún oficio del día sin rezar. Necesita ATHOS abierta o en segundo plano.', defaultTime: '22:30', needsApp: true },
  { id: 'evangelio', group: 'leer', title: 'Evangelio del día', description: 'Con la referencia de la lectura de hoy.', defaultTime: '09:00' },
  { id: 'lectura', group: 'leer', title: 'Tu plan de lectura', description: 'Lo que toca hoy en el plan que llevas. Sólo si llevas alguno.', defaultTime: '20:00' },
  { id: 'santo', group: 'dia', title: 'Santo del día', description: 'A quién recuerda hoy la Iglesia.', defaultTime: '08:00' },
  { id: 'ayuno', group: 'dia', title: 'Comienzo de un ayuno', description: 'Sólo el primer día de cada periodo de ayuno.', defaultTime: '07:30' },
  { id: 'fiesta', group: 'dia', title: 'Grandes fiestas', description: 'Sólo en las grandes fiestas y en Pascua.', defaultTime: '07:30' },
  { id: 'onomastica', group: 'dia', title: 'Santos de tus nombres', description: 'El día del santo de alguien de tu lista de nombres para la oración.', defaultTime: '08:30' },
];

const OFICIO_DE: Record<string, RuleTime> = {
  'oracion-manana': 'manana',
  'oracion-mediodia': 'mediodia',
  'oracion-noche': 'noche',
};

export const timeFor = (id: string, times: Record<string, string> | undefined): string =>
  times?.[id] ?? REMINDERS.find((r) => r.id === id)?.defaultTime ?? '08:00';

/* ============================================================
   Qué dice cada uno, un día concreto
   ============================================================ */

export interface ReminderContent {
  title: string;
  body: string;
  /** Pantalla que abre al tocarlo. */
  path: string;
}

type Ajustes = Pick<SettingsState, 'calendarStyle' | 'officeLength'>;

/**
 * Lo que dice un recordatorio un día; `null` si ese día no tiene nada que
 * decir —no empieza ningún ayuno, no es fiesta, ya se ha rezado todo—.
 *
 * Con `live`, se mira además lo que el usuario ha hecho hoy: es lo que se usa
 * en el momento de avisar. Sin él, se prepara el aviso de un día futuro.
 */
export async function reminderContent(
  id: string,
  iso: string,
  ajustes: Ajustes,
  live = false,
): Promise<ReminderContent | null> {
  const dia = computeLiturgicalDay(iso, ajustes.calendarStyle);

  const oficio = OFICIO_DE[id];
  if (oficio) {
    const definicion = DAILY_OFFICES.find((o) => o.time === oficio)!;
    const medida = ajustes.officeLength?.[oficio] ?? 'habitual';
    if (live) {
      const regla = await ruleForTime(oficio);
      if (regla && (await rezadoHoy(iso, regla.id))) return null;
    }
    const fiesta = dia.feasts[0]?.name;
    return {
      title: definicion.name,
      body: `${LENGTH_INFO.get(medida)?.label ?? ''} · unos ${minutesFor(oficio, medida)} min${fiesta ? ` · ${fiesta}` : ''}`,
      path: `/orar/oficio/${oficio}`,
    };
  }

  switch (id) {
    case 'regla': {
      if (!live) return null;
      const faltan: string[] = [];
      for (const o of DAILY_OFFICES) {
        const regla = await ruleForTime(o.time);
        if (regla && !(await rezadoHoy(iso, regla.id))) faltan.push(o.name.replace('Oficio ', '').replace(/^de la |^del /, ''));
      }
      if (!faltan.length) return null;
      return {
        title: 'Queda por rezar',
        body: `Hoy falta: ${faltan.join(', ')}. Aunque sea en su forma breve.`,
        path: '/orar',
      };
    }

    case 'evangelio': {
      const evangelio = dia.readings?.readings.find((r) => r.kind === 'evangelio');
      if (!evangelio) return null;
      return {
        title: 'Evangelio del día',
        body: `${readingTitle(evangelio.reference)}${evangelio.note ? ` · ${readingNote(evangelio.note)}` : ''}`,
        path: '/leer/lecturas',
      };
    }

    case 'lectura': {
      const actual = await currentPlan();
      if (!actual) return null;
      // De un día futuro no se sabe qué tocará: depende de lo que se lea antes.
      const hoy = iso === toIsoDate(new Date());
      return {
        title: actual.plan.title,
        body: hoy ? `Día ${actual.day.number}: ${actual.day.label}` : 'Lo que toca hoy en tu plan de lectura.',
        path: actual.day.path,
      };
    }

    case 'santo': {
      const santo = dia.saints[0];
      if (!santo) return null;
      const mas = dia.saints.length - 1;
      return {
        title: 'Hoy la Iglesia recuerda',
        body: `${santo.name}${mas > 0 ? ` y ${mas === 1 ? 'otra conmemoración' : `${mas} conmemoraciones más`}` : ''}`,
        path: `/calendario/santos/${santo.id}`,
      };
    }

    case 'ayuno': {
      if (!isFastDay(dia.fasting) || !dia.fasting.periodId) return null;
      const ayer = computeLiturgicalDay(addDaysIso(iso, -1), ajustes.calendarStyle);
      if (ayer.fasting.periodId === dia.fasting.periodId) return null;
      return {
        title: `Hoy empieza: ${dia.fasting.period ?? dia.fasting.label}`,
        body: dia.fasting.label,
        path: '/calendario/ayuno',
      };
    }

    case 'onomastica': {
      const nombres = await diptychsForSaints(dia.saints.map((s) => s.id));
      if (!nombres.length) return null;
      const santo = dia.saints.find((s) => s.id === nombres[0]!.saintId);
      const quienes = nombres.map((n) => n.name);
      const enumerados =
        quienes.length > 1 ? `${quienes.slice(0, -1).join(', ')} y ${quienes.at(-1)}` : quienes[0];
      return {
        title: santo ? `Hoy es ${santo.name}` : 'Hoy es el santo de los tuyos',
        body: `El santo de ${enumerados}.`,
        path: '/orar/nombres',
      };
    }

    case 'fiesta': {
      const fiesta = dia.feasts.find((f) => f.rank === 'gran-fiesta' || f.rank === 'pascua');
      if (!fiesta) return null;
      return { title: 'Hoy es fiesta grande', body: fiesta.name, path: `/calendario/dia/${iso}` };
    }

    default:
      return null;
  }
}

async function rezadoHoy(iso: string, ruleId: string): Promise<boolean> {
  const marcas = await db.rule_completions.where('[date+ruleId]').equals([iso, ruleId]).toArray();
  return isRulePrayed(marcas, ruleId, await ruleItems(ruleId));
}

/* ============================================================
   La cola de los próximos días, para el Service Worker
   ============================================================ */

export interface QueuedReminder {
  id: string;
  /** Día al que pertenece, `YYYY-MM-DD`. */
  date: string;
  /** Cuándo suena, en ISO. */
  at: string;
  title: string;
  body: string;
  url: string;
  needsApp?: boolean;
}

export const QUEUE_KEY = 'reminders.queue';
export const SHOWN_KEY = 'reminders.shown';
/** Cuántos días por delante se dejan preparados. */
const DIAS_EN_COLA = 10;

function cuando(iso: string, hora: string): Date {
  const [h, m] = hora.split(':').map(Number);
  const [y, mes, d] = iso.split('-').map(Number);
  return new Date(y!, mes! - 1, d!, h ?? 0, m ?? 0, 0, 0);
}

/** Prepara los avisos de los próximos días con lo que se sabe hoy. */
export async function buildQueue(desde: Date = new Date()): Promise<QueuedReminder[]> {
  const ajustes = useSettings.getState();
  const activos = REMINDERS.filter((r) => ajustes.notifications[r.id]);
  if (!activos.length) return [];
  await loadLectionary(ajustes.calendarStyle).catch(() => null);

  const cola: QueuedReminder[] = [];
  const hoy = toIsoDate(desde);
  for (let i = 0; i < DIAS_EN_COLA; i += 1) {
    const iso = addDaysIso(hoy, i);
    for (const r of activos) {
      const at = cuando(iso, timeFor(r.id, ajustes.notificationTimes));
      if (at.getTime() <= desde.getTime()) continue;
      const contenido = r.needsApp ? null : await reminderContent(r.id, iso, ajustes);
      if (!contenido && !r.needsApp) continue;
      cola.push({
        id: r.id,
        date: iso,
        at: at.toISOString(),
        title: contenido?.title ?? r.title,
        body: contenido?.body ?? r.description,
        url: appUrl(contenido?.path ?? '/'),
        needsApp: r.needsApp,
      });
    }
  }
  return cola.sort((a, b) => a.at.localeCompare(b.at));
}

/** Lo enseñado, por `id|fecha`. Se olvida lo de hace más de un mes. */
async function vistos(): Promise<Record<string, string>> {
  return getSetting<Record<string, string>>(SHOWN_KEY, {});
}

async function marcarVisto(id: string, iso: string): Promise<void> {
  const todos = await vistos();
  todos[`${id}|${iso}`] = new Date().toISOString();
  const limite = addDaysIso(toIsoDate(new Date()), -31);
  for (const clave of Object.keys(todos)) if ((clave.split('|')[1] ?? '') < limite) delete todos[clave];
  await setSetting(SHOWN_KEY, todos);
}

/* ============================================================
   El temporizador de la aplicación abierta
   ============================================================ */

let temporizador: number | undefined;
let desuscribir: (() => void) | undefined;

/** El estado de los avisos con la aplicación cerrada, para la pantalla de ajustes. */
export type BackgroundState = 'active' | 'needs-install' | 'unsupported' | 'off';

let estadoFondo: BackgroundState = 'off';
export const backgroundState = () => estadoFondo;

interface PeriodicSyncManager {
  register(tag: string, options?: { minInterval: number }): Promise<void>;
  unregister(tag: string): Promise<void>;
}

/** Pide al navegador que despierte al Service Worker de vez en cuando. */
async function registrarFondo(hayAlgo: boolean): Promise<BackgroundState> {
  const sw = typeof navigator !== 'undefined' ? navigator.serviceWorker : undefined;
  if (!sw) return 'unsupported';
  try {
    const reg = (await Promise.race([
      sw.ready,
      new Promise<undefined>((r) => setTimeout(() => r(undefined), 3000)),
    ])) as (ServiceWorkerRegistration & { periodicSync?: PeriodicSyncManager }) | undefined;
    if (!reg?.periodicSync) return 'unsupported';
    if (!hayAlgo) {
      await reg.periodicSync.unregister('athos-recordatorios').catch(() => undefined);
      return 'off';
    }
    const permiso = await navigator.permissions
      ?.query({ name: 'periodic-background-sync' as PermissionName })
      .catch(() => null);
    if (permiso && permiso.state !== 'granted') return 'needs-install';
    await reg.periodicSync.register('athos-recordatorios', { minInterval: 60 * 60 * 1000 });
    return 'active';
  } catch {
    return 'needs-install';
  }
}

/** Avisa de lo que toque ahora y programa el siguiente. */
async function programar(): Promise<void> {
  window.clearTimeout(temporizador);
  const ajustes = useSettings.getState();
  const activos = REMINDERS.filter((r) => ajustes.notifications[r.id]);

  const cola = await buildQueue();
  await setSetting(QUEUE_KEY, cola);
  estadoFondo = await registrarFondo(activos.length > 0 && notificationPermission() === 'granted');

  const siguiente = cola[0];
  if (!siguiente) return;
  // setTimeout no admite esperas de más de 24 días; con la cola de diez, sobra.
  const espera = Math.max(0, new Date(siguiente.at).getTime() - Date.now());
  temporizador = window.setTimeout(async () => {
    const ya = await vistos();
    if (!ya[`${siguiente.id}|${siguiente.date}`]) {
      // En el momento de avisar se vuelve a mirar: quizá ya se ha rezado.
      const contenido = await reminderContent(siguiente.id, siguiente.date, useSettings.getState(), true);
      if (contenido) await showNotification(contenido.title, contenido.body, siguiente.id, contenido.path);
      await marcarVisto(siguiente.id, siguiente.date);
    }
    void programar();
  }, espera + 500);
}

/**
 * Arranca los recordatorios: los programa ahora y cada vez que cambian los
 * interruptores, las horas, el calendario o la medida de los oficios.
 */
export function startReminders(): void {
  if (typeof window === 'undefined') return;
  desuscribir?.();
  void programar();
  desuscribir = useSettings.subscribe((estado, previo) => {
    if (
      estado.notifications !== previo.notifications ||
      estado.notificationTimes !== previo.notificationTimes ||
      estado.calendarStyle !== previo.calendarStyle ||
      estado.officeLength !== previo.officeLength
    ) {
      void programar();
    }
  });
}

/** Vuelve a programar: tras dar permiso, por ejemplo. */
export const refreshReminders = () => programar();

/** El próximo aviso de un recordatorio, para enseñarlo en los ajustes. */
export async function nextOccurrence(id: string): Promise<QueuedReminder | null> {
  const cola = await getSetting<QueuedReminder[]>(QUEUE_KEY, []);
  return cola.find((q) => q.id === id) ?? null;
}
