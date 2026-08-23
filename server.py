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


class AthosHandler(SimpleHTTPRequestHandler):
    """Servidor estático con reserva a index.html para las rutas de la aplicación."""

    protocol_version = "HTTP/1.1"

    def guess_type(self, path):  # noqa: D102 - firma heredada
        suffix = Path(str(path)).suffix.lower()
        return EXTRA_TYPES.get(suffix) or super().guess_type(path)

    def send_head(self):
        # ATHOS es una aplicación de una sola página: /orar/regla no es un
        # archivo, así que se entrega index.html y el enrutador hace el resto.
        target = self.translate_path(self.path)
        if not os.path.exists(target) and "." not in Path(self.path.split("?")[0]).name:
            self.path = "/index.html"
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
    if not (root / "index.html").exists():
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
