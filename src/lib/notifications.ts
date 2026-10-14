/**
 * Notificaciones: permiso y presentación.
 *
 * ATHOS no tiene servidor, así que no hay notificaciones push. Lo que avisa a
 * la hora es la propia aplicación —ver `reminders.ts`—, y esto es sólo la
 * parte de pedir permiso y enseñar el aviso.
 *
 * Se dice claramente en la interfaz qué llega y qué no. No se promete lo que
 * no se cumple: si el navegador no admite notificaciones, o el sistema las
 * restringe, la aplicación lo indica en lugar de simular que están activas.
 */
export const notificationsSupported = () => typeof window !== 'undefined' && 'Notification' in window;

export function notificationPermission(): NotificationPermission | 'unsupported' {
  return notificationsSupported() ? Notification.permission : 'unsupported';
}

export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!notificationsSupported()) return 'unsupported';
  if (Notification.permission !== 'default') return Notification.permission;
  return Notification.requestPermission();
}

/** Una ruta de la aplicación como dirección completa, respetando la base. */
export function appUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

/**
 * Enseña un aviso. Con `path`, tocarlo abre esa pantalla de ATHOS: lo hace
 * el Service Worker, que es quien recibe el toque aunque la aplicación esté
 * cerrada.
 */
export async function showNotification(
  title: string,
  body: string,
  tag?: string,
  path?: string,
): Promise<boolean> {
  if (!notificationsSupported() || Notification.permission !== 'granted') return false;
  const options: NotificationOptions = {
    body,
    tag,
    icon: appUrl('icons/icon-192.png'),
    badge: appUrl('icons/icon-192.png'),
    lang: 'es',
    data: { url: appUrl(path ?? '') },
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

export const NOTIFICATIONS_LIMITATION_NOTE =
  'ATHOS no usa servidores: los recordatorios los prepara la propia aplicación en este dispositivo. ' +
  'Con ATHOS abierta, o en segundo plano, llegan a la hora en punto. Con ATHOS cerrada sólo pueden ' +
  'llegar si el navegador permite la sincronización periódica —Chrome y Edge, con ATHOS instalada—, ' +
  'y entonces llegan cuando el sistema la despierta, que puede ser con retraso. En iPhone y iPad no ' +
  'hay manera de avisar con la aplicación cerrada sin un servidor, y ATHOS no lo tiene.';
