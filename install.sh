#!/usr/bin/env bash
# ATHOS · integración con el escritorio.
# Crea la entrada en el menú de aplicaciones y un icono en el Escritorio para
# abrir ATHOS con doble clic, como cualquier otro programa.

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APPS_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
ICON_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/icons/hicolor/512x512/apps"
ENTRY="$APPS_DIR/athos.desktop"

desktop_dir() {
  if command -v xdg-user-dir >/dev/null 2>&1; then
    local d; d="$(xdg-user-dir DESKTOP 2>/dev/null || true)"
    [[ -n "$d" && -d "$d" ]] && { echo "$d"; return; }
  fi
  for d in "$HOME/Escritorio" "$HOME/Desktop"; do [[ -d "$d" ]] && { echo "$d"; return; }; done
  echo "$HOME"
}
DESK_DIR="$(desktop_dir)"
DESK_ENTRY="$DESK_DIR/athos.desktop"

if [[ "${1:-}" == "--uninstall" ]]; then
  rm -f "$ENTRY" "$DESK_ENTRY" "$ICON_DIR/athos.png"
  command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database "$APPS_DIR" >/dev/null 2>&1 || true
  echo "Accesos directos eliminados. Tus datos siguen intactos."
  exit 0
fi

mkdir -p "$APPS_DIR" "$ICON_DIR"

# Icono: el mismo que usa la aplicación instalada desde el navegador.
if [[ -f "$APP_DIR/public/icons/icon-512.png" ]]; then
  cp "$APP_DIR/public/icons/icon-512.png" "$ICON_DIR/athos.png"
  ICON="athos"
else
  ICON="$APP_DIR/public/icons/icon.svg"
fi

write_entry() {
  cat > "$1" <<DESKTOP
[Desktop Entry]
Type=Application
Version=1.0
Name=ATHOS
GenericName=Libro de oración ortodoxo
Comment=Oración · Tradición · Vida — sin conexión y sin cuenta
Exec=$APP_DIR/run.sh
Path=$APP_DIR
Icon=$ICON
Terminal=false
Categories=Education;Literature;Viewer;
Keywords=oración;ortodoxa;biblia;salterio;calendario;athos;
StartupWMClass=ATHOS
DESKTOP
  chmod +x "$1"
}

write_entry "$ENTRY"
write_entry "$DESK_ENTRY"

command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database "$APPS_DIR" >/dev/null 2>&1 || true
command -v gio >/dev/null 2>&1 && gio set "$DESK_ENTRY" metadata::trusted true >/dev/null 2>&1 || true

cat <<MSG
Listo.

  · Icono en el Escritorio: $DESK_ENTRY
  · Entrada en el menú de aplicaciones: busca «ATHOS»

La primera vez, GNOME puede mostrar el icono como archivo de texto:
clic derecho → «Permitir ejecución» (o «Allow Launching») y queda listo.

Para quitarlo:  ./install.sh --uninstall
MSG
