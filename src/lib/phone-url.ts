/**
 * Qué dirección hay que darle al teléfono.
 *
 * Si ATHOS está publicado en un dominio, vale la que se está viendo. Pero
 * cuando se abre con el lanzador local la dirección es 127.0.0.1, y ésa en un
 * teléfono no apunta a este ordenador sino al propio teléfono. Para ese caso el
 * servidor local expone su dirección en la red, y es la que se ofrece.
 */
export interface PhoneUrl {
  url: string | null;
  /** `true` si desde esa dirección el teléfono podrá además instalarla. */
  installable: boolean;
  reason: 'remote' | 'lan' | 'none';
}

const LOCAL = /^(localhost|127\.\d+\.\d+\.\d+|\[?::1\]?)$/i;

export function isLocalHost(hostname: string): boolean {
  return LOCAL.test(hostname);
}

/**
 * Una PWA sólo se instala en contexto seguro. `localhost` cuenta como tal, pero
 * una IP de red local por HTTP no: desde el teléfono se podrá usar ATHOS, no
 * instalarla. Conviene decirlo antes de que busque un botón que no existe.
 */
export function isInstallableFrom(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || isLocalHost(u.hostname);
  } catch {
    return false;
  }
}

export async function resolvePhoneUrl(
  location: { href: string; hostname: string },
  fetcher: typeof fetch = fetch,
): Promise<PhoneUrl> {
  if (!isLocalHost(location.hostname)) {
    return { url: location.href, installable: isInstallableFrom(location.href), reason: 'remote' };
  }

  try {
    const respuesta = await fetcher('/__athos/host.json', { cache: 'no-store' });
    if (respuesta.ok) {
      const datos = (await respuesta.json()) as { lan?: string | null };
      if (datos.lan) {
        return { url: datos.lan, installable: isInstallableFrom(datos.lan), reason: 'lan' };
      }
    }
  } catch {
    /* El servidor local no responde: no es un error, simplemente no hay QR. */
  }

  return { url: null, installable: false, reason: 'none' };
}
