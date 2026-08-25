#!/usr/bin/env python3
"""
ATHOS · servidor local.

Sirve la aplicación ya compilada (`dist/`) por HTTP en 127.0.0.1, que es lo que
necesita una PWA: el Service Worker sólo se registra en un contexto seguro, y
`localhost` cuenta como tal. Abrir `dist/index.html` con doble clic (file://) no
funciona, y por eso existe este archivo.

Sólo necesita python3. Node hace falta para compilar, no para usar ATHOS.
"""

from __future__ import annotations

import argparse
import os
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

# python3 no conoce algunos de estos tipos, y un manifest servido como
# text/plain hace que el navegador se niegue a instalar la aplicación.
EXTRA_TYPES = {
    ".webmanifest": "application/manifest+json",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".mjs": "text/javascript",
    ".js": "text/javascript",
    ".css": "text/css",
    ".ico": "image/x-icon",
    ".webp": "image/webp",
}

# Los recursos con huella en el nombre pueden cachearse para siempre.
IMMUTABLE_PREFIXES = ("/assets/", "/fonts/")

# Lo único que este servidor responde por su cuenta, además de archivos.
HOST_ENDPOINT = "/__athos/host.json"


def lan_url(port: int) -> str | None:
    """
    La dirección de este ordenador en la red local.

    Se averigua abriendo un socket UDP hacia fuera y preguntando qué interfaz
    habría usado. No se envía ni un byte: UDP no establece conexión, y sirve
    igual aunque no haya salida a internet.
    """
    import socket

    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.settimeout(0.4)
            s.connect(("1.1.1.1", 53))
            ip = s.getsockname()[0]
    except OSError:
        return None
    if not ip or ip.startswith("127."):
        return None
    return f"http://{ip}:{port}"


class AthosHandler(SimpleHTTPRequestHandler):
    """Servidor estático con reserva a index.html para las rutas de la aplicación."""

    protocol_version = "HTTP/1.1"

    def guess_type(self, path):  # noqa: D102 - firma heredada
        suffix = Path(str(path)).suffix.lower()
        return EXTRA_TYPES.get(suffix) or super().guess_type(path)

    def do_GET(self):  # noqa: N802 - firma heredada
        """
        Responde la dirección de red local, para que la pantalla de instalación
        pueda dibujar un código QR que el teléfono sí pueda abrir.

        Sin esto el QR llevaría a 127.0.0.1, que en un teléfono no es este
        ordenador sino el propio teléfono. Es información que ya está en la
        máquina del usuario y no sale de ella.
        """
        if self.path.split("?")[0] == HOST_ENDPOINT:
            import json

            url = lan_url(self.server.server_address[1])
            cuerpo = json.dumps({"lan": url, "secure": False}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(cuerpo)))
            self.end_headers()
            self.wfile.write(cuerpo)
            return
        super().do_GET()

    def send_head(self):
        # ATHOS es una aplicación de una sola página: /orar/regla no es un
        # archivo, así que se entrega el index.html que la contiene y el
        # enrutador hace el resto. Se busca hacia arriba para que también
        # funcione publicada en una subcarpeta (…/athos/orar/regla).
        ruta = self.path.split("?")[0]
        destino = self.translate_path(self.path)
        if not os.path.exists(destino) and "." not in Path(ruta).name:
            partes = [p for p in ruta.split("/") if p]
            while True:
                candidato = "/" + "/".join([*partes, "index.html"])
                if os.path.exists(self.translate_path(candidato)):
                    self.path = candidato
                    break
                if not partes:
                    break
                partes.pop()
        return super().send_head()

    def end_headers(self):
        path = self.path.split("?")[0]
        if path.startswith(IMMUTABLE_PREFIXES):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        else:
            # El Service Worker y el documento nunca se cachean: si se cachean,
            # una actualización deja al usuario atrapado en la versión vieja.
            self.send_header("Cache-Control", "no-cache")
        self.send_header("Service-Worker-Allowed", "/")
        super().end_headers()

    def log_message(self, fmt, *args):
        if os.environ.get("ATHOS_VERBOSE"):
            super().log_message(fmt, *args)


def main() -> int:
    parser = argparse.ArgumentParser(description="Servidor local de ATHOS")
    parser.add_argument("--port", type=int, default=8788)
    parser.add_argument("--dir", default=str(Path(__file__).resolve().parent / "dist"))
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument(
        "--pid-file",
        help="Archivo donde escribir el PID real. `setsid cmd &` devuelve el PID "
        "de setsid, no el de este proceso, así que lo escribe él mismo.",
    )
    args = parser.parse_args()

    root = Path(args.dir).resolve()
    if not root.is_dir():
        print(f"No existe la carpeta {root}.", file=sys.stderr)
        return 1
    # Puede no haber index.html en la raíz si ATHOS cuelga de una subcarpeta.
    if not (root / "index.html").exists() and not any(root.glob("*/index.html")):
        print(
            f"No encuentro la aplicación compilada en {root}.\n"
            "Ejecuta ./run.sh, que la compila si hace falta.",
            file=sys.stderr,
        )
        return 1

    handler = partial(AthosHandler, directory=str(root))
    with ThreadingHTTPServer((args.host, args.port), handler) as httpd:
        if args.pid_file:
            Path(args.pid_file).write_text(str(os.getpid()), encoding="utf-8")
        print(f"ATHOS servido en http://{args.host}:{args.port}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nATHOS detenido.")
        finally:
            if args.pid_file:
                Path(args.pid_file).unlink(missing_ok=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
