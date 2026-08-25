#!/usr/bin/env bash
# ATHOS · preparar la publicación en un alojamiento con HTTPS.
#
# Un teléfono sólo puede INSTALAR una aplicación web servida por HTTPS. Por eso,
# para tener ATHOS en el móvil de forma permanente hay que publicarla en algún
# sitio con certificado. Este script deja la carpeta lista para cualquiera de
# ellos, y puede publicarla en GitHub Pages por ti.

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE="/"
DESTINO="dist"
MODO="preparar"
RAMA="gh-pages"
SITIO=""
PRUEBAS="si"

uso() {
  cat <<'HELP'
Uso: deploy.sh [opciones]

  --base /ruta/        Subcarpeta de la que colgará ATHOS.
                       GitHub Pages de proyecto:  --base /athos/
                       Dominio propio o Netlify:  --base /   (por defecto)
  --github             Publica en la rama gh-pages del repositorio actual.
  --rama <nombre>      Rama de publicación (por defecto gh-pages).
  --salida <carpeta>   Carpeta de salida (por defecto dist).
  --url https://…      Dirección pública del sitio, para las etiquetas Open
                       Graph. Con --github se deduce del remoto.
  --sin-pruebas        No comprobar la aplicación antes de publicar.
  --help               Esta ayuda.

Ejemplos:

  ./deploy.sh --base /athos/ --github
      Compila y publica en https://TU-USUARIO.github.io/athos/

  ./deploy.sh
      Compila en dist/ para subirla a Netlify, Cloudflare Pages, Vercel,
      un hosting propio o cualquier servidor de archivos estáticos.
HELP
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base)   BASE="$2"; shift 2 ;;
    --salida) DESTINO="$2"; shift 2 ;;
    --rama)   RAMA="$2"; shift 2 ;;
    --github) MODO="github"; shift ;;
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
if [[ "$MODO" == "github" && "$PRUEBAS" == "si" ]]; then
  echo "Comprobando la aplicación antes de publicar …"
  npm run lint
  npm run typecheck
  npm run test
  echo
fi

# Open Graph necesita direcciones absolutas. Al publicar en GitHub Pages se
# deduce del remoto; en los demás casos se puede pasar con --url.
if [[ "$MODO" == "github" && -z "$SITIO" ]]; then
  R="$(git -C "$APP_DIR" remote get-url origin 2>/dev/null || true)"
  if [[ -n "$R" ]]; then
    U="$(sed -E 's#.*github.com[:/]([^/]+)/([^/.]+)(\.git)?#\1#' <<<"$R")"
    [[ -n "$U" ]] && SITIO="https://$U.github.io"
  fi
fi

echo "Compilando con base $BASE${SITIO:+ y sitio $SITIO} …"
ATHOS_BASE="$BASE" ATHOS_URL="$SITIO" npm run build -- --outDir "$DESTINO"

# GitHub Pages ignora lo que empieza por guion bajo si no encuentra esto.
touch "$DESTINO/.nojekyll"

# GitHub Pages no sabe de aplicaciones de una sola página: sin este archivo,
# entrar directamente en /leer/salterio/50 daría un 404 la primera vez.
cp "$DESTINO/index.html" "$DESTINO/404.html"

TAMANO="$(du -sh "$DESTINO" | cut -f1)"
echo
echo "Listo: $DESTINO/ ($TAMANO)"

if [[ "$MODO" == "preparar" ]]; then
  cat <<MSG

Para que el móvil pueda instalarla, súbela a un sitio con HTTPS:

  · Netlify / Cloudflare Pages / Vercel
      Arrastra la carpeta $DESTINO/ a su panel. Nada más.

  · GitHub Pages
      ./deploy.sh --base /NOMBRE-DEL-REPO/ --github

  · Servidor propio
      Copia el contenido de $DESTINO/ a la raíz del sitio y asegúrate de
      que las rutas desconocidas devuelvan index.html.

Después, abre la dirección en el teléfono e instálala:
  Android (Chrome): menú ⋮ → «Instalar aplicación»
  iPhone (Safari):  Compartir → «Añadir a pantalla de inicio»
MSG
  exit 0
fi

# --- Publicación en GitHub Pages ---
command -v git >/dev/null 2>&1 || { echo "Falta git." >&2; exit 1; }
git -C "$APP_DIR" rev-parse --git-dir >/dev/null 2>&1 || {
  echo "Esto no es un repositorio git." >&2; exit 1; }

REMOTO="$(git -C "$APP_DIR" remote get-url origin 2>/dev/null || true)"
[[ -n "$REMOTO" ]] || {
  ACTUAL="$(git -C "$APP_DIR" branch --show-current 2>/dev/null || echo main)"
  cat >&2 <<MSG
No hay un remoto 'origin' configurado. Crea el repositorio en GitHub y:

  git remote add origin https://github.com/TU-USUARIO/athos.git
  git push -u origin $ACTUAL

Después vuelve a ejecutar este script.
MSG
  exit 1; }

echo "Publicando en la rama $RAMA de $REMOTO …"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -r "$DESTINO/." "$TMP/"
cd "$TMP"
git init -q
git checkout -qb "$RAMA"
git add -A
git -c user.email="$(git -C "$APP_DIR" config user.email || echo athos@localhost)" \
    -c user.name="$(git -C "$APP_DIR" config user.name || echo ATHOS)" \
    commit -qm "ATHOS · publicación $(date +%Y-%m-%d)"
git push -q --force "$REMOTO" "$RAMA"

USUARIO_REPO="$(sed -E 's#.*github.com[:/]([^/]+)/([^/.]+)(\.git)?#\1 \2#' <<<"$REMOTO")"
read -r USUARIO REPO <<<"$USUARIO_REPO"
cat <<MSG

Publicado.

  Activa GitHub Pages en:
    https://github.com/$USUARIO/$REPO/settings/pages
    Origen: rama «$RAMA», carpeta «/ (root)»

  En un par de minutos estará en:
    https://$USUARIO.github.io/$REPO/

Abre esa dirección en el teléfono e instálala desde el menú del navegador.
MSG
