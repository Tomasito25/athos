#!/usr/bin/env bash
# ATHOS · integración con el escritorio.
# Crea la entrada en el menú de aplicaciones y un icono en el Escritorio para
# abrir ATHOS con doble clic, como cualquier otro programa.

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APPS_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
ICON_ROOT="${XDG_DATA_HOME:-$HOME/.local/share}/icons/hicolor"
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
  rm -f "$ENTRY" "$DESK_ENTRY"
  rm -f "$ICON_ROOT"/*/apps/athos.png "$ICON_ROOT/scalable/apps/athos.svg"
  command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database "$APPS_DIR" >/dev/null 2>&1 || true
  command -v kbuildsycoca6 >/dev/null 2>&1 && kbuildsycoca6 --noincremental >/dev/null 2>&1 || true
  echo "Accesos directos eliminados. Tus datos siguen intactos."
  exit 0
fi

mkdir -p "$APPS_DIR"

# El mismo icono que usa la aplicación instalada desde el navegador, en todos
# los tamaños que el escritorio pueda pedir.
ICON="athos"
for size in 64 128 256 512; do
  src="$APP_DIR/public/icons/icon-$size.png"
  [[ -f "$src" ]] || continue
  mkdir -p "$ICON_ROOT/${size}x${size}/apps"
  cp "$src" "$ICON_ROOT/${size}x${size}/apps/athos.png"
done
if [[ -f "$APP_DIR/public/icons/icon.svg" ]]; then
  mkdir -p "$ICON_ROOT/scalable/apps"
  cp "$APP_DIR/public/icons/icon.svg" "$ICON_ROOT/scalable/apps/athos.svg"
fi
# Si no se pudo copiar ninguno, se apunta al archivo directamente.
[[ -f "$ICON_ROOT/512x512/apps/athos.png" ]] || ICON="$APP_DIR/public/icons/icon.svg"

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
Categories=Education;Literature;
Keywords=oración;ortodoxa;biblia;salterio;calendario;santos;ayuno;athos;
StartupWMClass=ATHOS
StartupNotify=true
SingleMainWindow=true
Actions=Detener;Recompilar;

[Desktop Action Detener]
Name=Detener el servidor
Exec=$APP_DIR/run.sh --stop

[Desktop Action Recompilar]
Name=Recompilar y abrir
Exec=$APP_DIR/run.sh --rebuild
DESKTOP
  chmod +x "$1"
}

write_entry "$ENTRY"
write_entry "$DESK_ENTRY"

command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database "$APPS_DIR" >/dev/null 2>&1 || true
command -v gtk-update-icon-cache >/dev/null 2>&1 && gtk-update-icon-cache -qtf "$ICON_ROOT" >/dev/null 2>&1 || true
# KDE mantiene su propia caché de menús; sin esto la entrada tarda en aparecer.
for k in kbuildsycoca6 kbuildsycoca5; do
  command -v "$k" >/dev/null 2>&1 && { "$k" --noincremental >/dev/null 2>&1 || true; break; }
done
# GNOME y Nautilus exigen marcar el lanzador como de confianza; en KDE sobra.
command -v gio >/dev/null 2>&1 && gio set "$DESK_ENTRY" metadata::trusted true >/dev/null 2>&1 || true

echo "Listo."
echo
echo "  · Icono en el Escritorio: $DESK_ENTRY"
echo "  · Entrada en el menú de aplicaciones: busca «ATHOS»"
echo

case "${XDG_CURRENT_DESKTOP:-}" in
  *KDE*|*plasma*|*Plasma*)
    cat <<'MSG'
En Plasma, el icono está en el escritorio si tienes la vista de carpeta
activada. Clic derecho sobre él → «Abrir» la primera vez; después basta
el doble clic.

Clic derecho sobre el icono ofrece además «Detener el servidor» y
«Recompilar y abrir».
MSG
    ;;
  *GNOME*|*gnome*)
    cat <<'MSG'
La primera vez, GNOME puede mostrar el icono como archivo de texto:
clic derecho → «Permitir ejecución» (o «Allow Launching») y queda listo.
MSG
    ;;
  *)
    echo "Si el icono no arranca al primer intento, marca el archivo como ejecutable"
    echo "o permite su ejecución desde el menú contextual de tu escritorio."
    ;;
esac

echo
echo "Para quitarlo:  ./install.sh --uninstall"
