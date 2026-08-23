/**
 * Recordatorios.
 *
 * ATHOS no tiene servidor, así que no hay notificaciones push: los avisos se
 * programan en el propio dispositivo mientras la aplicación está abierta o
 * instalada, mediante la API de notificaciones del navegador.
 *
 * Esto se dice claramente en la interfaz. No se promete lo que no se cumple:
 * si el navegador no admite notificaciones, o el sistema las restringe, la
 * aplicación lo indica en lugar de simular que están activas.
 */
export interface ReminderDefinition {
  id: string;
  title: string;
  body: string;
  /** Hora local por defecto, `HH:MM`. */
  defaultTime: string;
  description: string;
}

export const REMINDERS: ReminderDefinition[] = [
  { id: 'oracion-manana', title: 'Oración de la mañana', body: 'Comienza el día con la regla de la mañana.', defaultTime: '07:00', description: 'Un aviso al empezar el día.' },
  { id: 'oracion-noche', title: 'Oración de la noche', body: 'Antes de dormir, el examen del día y la regla de la noche.', defaultTime: '22:00', description: 'Un aviso antes del descanso.' },
  { id: 'evangelio', title: 'Evangelio del día', body: 'Lee el Evangelio señalado para hoy.', defaultTime: '09:00', description: 'La lectura evangélica de la jornada.' },
  { id: 'lectura', title: 'Lectura diaria', body: 'Tu lectura de la Escritura y del Salterio.', defaultTime: '20:00', description: 'Recordatorio de la lectura continua.' },
  { id: 'santo', title: 'Santo del día', body: 'Conoce al santo que hoy se conmemora.', defaultTime: '08:00', description: 'La conmemoración del día.' },
  { id: 'ayuno', title: 'Comienzo del ayuno', body: 'Hoy empieza un periodo de ayuno.', defaultTime: '07:30', description: 'Aviso el primer día de cada ayuno.' },
  { id: 'fiesta', title: 'Fiesta litúrgica', body: 'Hoy es una gran fiesta.', defaultTime: '07:30', description: 'Aviso en las Doce Grandes Fiestas.' },
  { id: 'regla', title: 'Regla de oración', body: 'Todavía queda parte de tu regla por rezar.', defaultTime: '21:00', description: 'Si la regla del día está incompleta.' },
];

export const notificationsSupported = () => typeof window !== 'undefined' && 'Notification' in window;

export function notificationPermission(): NotificationPermission | 'unsupported' {
  return notificationsSupported() ? Notification.permission : 'unsupported';
}

export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!notificationsSupported()) return 'unsupported';
  if (Notification.permission !== 'default') return Notification.permission;
  return Notification.requestPermission();
}

export async function showNotification(title: string, body: string, tag?: string): Promise<boolean> {
  if (!notificationsSupported() || Notification.permission !== 'granted') return false;
  const options: NotificationOptions = {
    body,
    tag,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    lang: 'es',
  };
  try {
    const registration = await navigator.serviceWorker?.getRegistration();
    if (registration) await registration.showNotification(title, options);
    else new Notification(title, options);
    return true;
  } catch {
    return false;
  }
}

/* ---------- Programación local ---------- */

const timers = new Map<string, number>();

function msUntil(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);
  if (next.getTime() <= Date.now()) next.setDate(next.getDate() + 1);
  return next.getTime() - Date.now();
}

/**
 * Programa un aviso diario mientras la aplicación siga viva. Al cerrarla, el
 * temporizador desaparece: sin servidor, no hay forma de garantizar más.
 */
export function scheduleReminder(reminder: ReminderDefinition, time = reminder.defaultTime): void {
  cancelReminder(reminder.id);
  const delay = msUntil(time);
  const id = window.setTimeout(async () => {
    await showNotification(reminder.title, reminder.body, reminder.id);
    scheduleReminder(reminder, time);
  }, delay);
  timers.set(reminder.id, id);
}

export function cancelReminder(id: string): void {
  const timer = timers.get(id);
  if (timer !== undefined) {
    clearTimeout(timer);
    timers.delete(id);
  }
}

export function cancelAllReminders(): void {
  for (const id of [...timers.keys()]) cancelReminder(id);
}

export const NOTIFICATIONS_LIMITATION_NOTE =
  'ATHOS no usa servidores, así que los recordatorios se programan en este dispositivo y sólo ' +
  'suenan mientras la aplicación siga abierta o instalada en segundo plano. En iOS, además, ' +
  'las notificaciones web sólo funcionan si ATHOS está instalada en la pantalla de inicio.';
