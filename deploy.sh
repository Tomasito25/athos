#!/usr/bin/env bash
# ATHOS · preparar una carpeta para publicarla en un alojamiento con HTTPS.
#
# Un teléfono sólo puede INSTALAR una aplicación web servida por HTTPS. Este
# script compila ATHOS en una carpeta lista para subirla a cualquier sitio
# estático: Netlify, Cloudflare Pages, Vercel o un servidor propio.
#
# La publicación en GitHub Pages NO pasa por aquí: la hace sola el flujo
# .github/workflows/deploy.yml en cada empujón a main. Antes este script
# también subía a una rama gh-pages, y había dos maneras de publicar en el
# mismo sitio que podían pisarse; se dejó sólo la automática.

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE="/"
DESTINO="dist"
SITIO=""
PRUEBAS="si"

uso() {
  cat <<'HELP'
Uso: deploy.sh [opciones]

  --base /ruta/        Subcarpeta de la que colgará ATHOS (por defecto /).
  --salida <carpeta>   Carpeta de salida (por defecto dist).
  --url https://…      Dirección pública del sitio, para que la vista previa
                       de los enlaces (Open Graph) lleve imagen.
  --sin-pruebas        No comprobar la aplicación antes de compilar.
  --help               Esta ayuda.

Ejemplo:

  ./deploy.sh --url https://athos.example.org
      Compila en dist/ para subirla a la raíz de ese dominio.

Para GitHub Pages no hace falta: basta con empujar a main.
HELP
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base)   BASE="$2"; shift 2 ;;
    --salida) DESTINO="$2"; shift 2 ;;
    --url)    SITIO="${2%/}"; shift 2 ;;
    --sin-pruebas) PRUEBAS="no"; shift ;;
    -h|--help) uso; exit 0 ;;
    *) echo "Opción desconocida: $1 (usa --help)" >&2; exit 2 ;;
  esac
done

[[ "$BASE" == /* ]] || BASE="/$BASE"
[[ "$BASE" == */ ]] || BASE="$BASE/"

# --- Node ---
if ! command -v npm >/dev/null 2>&1; then
  for dir in "$HOME/.local/node/bin" "$HOME/.nvm/versions/node"/*/bin; do
    [[ -x "$dir/npm" ]] && { export PATH="$dir:$PATH"; break; }
  done
fi
command -v npm >/dev/null 2>&1 || { echo "Falta Node. Mira el README." >&2; exit 1; }

cd "$APP_DIR"
[[ -d node_modules ]] || npm install --no-audit --no-fund

# Antes de publicar nada, que la aplicación esté sana. Publicar una versión
# rota en una dirección que la gente ya tiene guardada cuesta más de arreglar
# que los dos minutos que tardan las pruebas.
if [[ "$PRUEBAS" == "si" ]]; then
  echo "Comprobando la aplicación antes de compilar …"
  npm run lint
  npm run typecheck
  npm run test
  echo
fi

if [[ -z "$SITIO" ]]; then
  echo "Aviso: sin --url, la vista previa de los enlaces no llevará imagen." >&2
fi

echo "Compilando con base $BASE${SITIO:+ y sitio $SITIO} …"
ATHOS_BASE="$BASE" ATHOS_URL="$SITIO" npm run build -- --outDir "$DESTINO"

# Algunos alojamientos ignoran lo que empieza por guion bajo si no encuentran esto.
touch "$DESTINO/.nojekyll"

# Los alojamientos estáticos no saben de aplicaciones de una sola página: sin
# este archivo, entrar directamente en /leer/salterio/50 daría un 404 la
# primera vez, antes de que el Service Worker esté instalado.
cp "$DESTINO/index.html" "$DESTINO/404.html"

TAMANO="$(du -sh "$DESTINO" | cut -f1)"
cat <<MSG

Listo: $DESTINO/ ($TAMANO)

Para que el móvil pueda instalarla, súbela a un sitio con HTTPS:

  · Netlify / Cloudflare Pages / Vercel
      Arrastra la carpeta $DESTINO/ a su panel. Nada más.

  · Servidor propio
      Copia el contenido de $DESTINO/ a la raíz del sitio y asegúrate de
      que las rutas desconocidas devuelvan index.html.

Después, abre la dirección en el teléfono e instálala:
  Android (Chrome): menú ⋮ → «Instalar aplicación»
  iPhone (Safari):  Compartir → «Añadir a pantalla de inicio»
MSG
