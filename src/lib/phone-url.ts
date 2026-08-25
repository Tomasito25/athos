/**
 * Qué dirección hay que darle al teléfono.
 *
 * Si ATHOS está publicado en un dominio, vale la que se está viendo. Pero
 * cuando se abre con el lanzador local la dirección es 127.0.0.1, y ésa en un
 * teléfono no apunta a este ordenador sino al propio teléfono. Para ese caso el
 * servidor local expone su dirección en la red, y es la que se ofrece.
 */
/**
 * Por qué hay —o no hay— una dirección que darle al teléfono.
 *
 * - `remote`   ATHOS está publicada: vale la dirección que se está viendo.
 * - `lan`      El servidor local escucha en la red y responde: hay QR.
 * - `loopback` El servidor sólo escucha para este ordenador. Es lo normal, y
 *              tiene arreglo: arrancarlo con `./run.sh --movil`.
 * - `blocked`  Escucha en la red pero algo lo bloquea, casi siempre el
 *              cortafuegos.
 * - `none`     No se ha podido averiguar nada.
 */
export type PhoneReason = 'remote' | 'lan' | 'loopback' | 'blocked' | 'none';

export interface PhoneUrl {
  url: string | null;
  /** `true` si desde esa dirección el teléfono podrá además instalarla. */
  installable: boolean;
  reason: PhoneReason;
  /** La orden que hay que ejecutar, cuando la hay. */
  command?: string;
  /** Dirección y puerto que habría que desbloquear, cuando es el cortafuegos. */
  ip?: string;
  port?: number;
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
      const datos = (await respuesta.json()) as {
        lan?: string | null;
        reason?: string;
        command?: string;
        ip?: string;
        port?: number;
      };
      if (datos.lan) {
        return { url: datos.lan, installable: isInstallableFrom(datos.lan), reason: 'lan' };
      }
      // Sin dirección alcanzable no se dibuja ningún código: un QR hacia una
      // dirección que rechaza la conexión es peor que no ofrecer ninguno.
      if (datos.reason === 'loopback' || datos.reason === 'blocked') {
        return {
          url: null,
          installable: false,
          reason: datos.reason,
          command: datos.command,
          ip: datos.ip,
          port: datos.port,
        };
      }
    }
  } catch {
    /* El servidor local no responde: no es un error, simplemente no hay QR. */
  }

  return { url: null, installable: false, reason: 'none' };
}
