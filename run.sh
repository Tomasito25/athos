#!/usr/bin/env bash
# ATHOS · lanzador local.
# Arranca el servidor y abre ATHOS en su propia ventana, como cualquier otra
# aplicación de escritorio. Si la aplicación no está compilada todavía, la
# compila. Para usarla sólo hace falta python3; Node únicamente para compilar.

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${ATHOS_PORT:-8788}"
URL="http://127.0.0.1:${PORT}/"
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/athos"
PID_FILE="$DATA_DIR/server.pid"
LOG_FILE="$DATA_DIR/server.log"
mkdir -p "$DATA_DIR"

OPEN_BROWSER=1
ACTION="run"

for arg in "$@"; do
  case "$arg" in
    --no-browser|--server-only) OPEN_BROWSER=0 ;;
    --stop)    ACTION="stop" ;;
    --status)  ACTION="status" ;;
    --rebuild) ACTION="rebuild" ;;
    -h|--help)
      cat <<'HELP'
Uso: run.sh [opciones]

  (sin opciones)   Arranca el servidor y abre ATHOS
  --no-browser     Sólo arranca el servidor (ábrelo tú en el navegador)
  --rebuild        Vuelve a compilar antes de arrancar
  --status         Indica si ATHOS está corriendo
  --stop           Detiene el servidor
  --help           Muestra esta ayuda

Variables de entorno:
  ATHOS_PORT       Puerto local (por defecto 8788)
  ATHOS_BROWSER    Navegador concreto (brave-browser, firefox, chromium…)
  ATHOS_CHROME     1 = mostrar la barra del navegador en Firefox/Zen
HELP
      exit 0 ;;
    *) echo "Opción desconocida: $arg (usa --help)" >&2; exit 2 ;;
  esac
done

# Cuando ATHOS se abre con doble clic no hay terminal donde ver un error,
# así que los fallos se avisan en pantalla.
has_tty() { [[ -t 2 ]]; }
fail() {
  local msg="$1"
  echo "$msg" >&2
  if ! has_tty; then
    if command -v kdialog >/dev/null 2>&1; then kdialog --title ATHOS --error "$msg" >/dev/null 2>&1 || true
    elif command -v zenity >/dev/null 2>&1; then zenity --error --title=ATHOS --text="$msg" >/dev/null 2>&1 || true
    elif command -v notify-send >/dev/null 2>&1; then notify-send -u critical "ATHOS" "$msg" >/dev/null 2>&1 || true
    fi
  fi
  exit 1
}
notice() {
  echo "$1"
  has_tty || command -v notify-send >/dev/null 2>&1 && notify-send -a ATHOS "ATHOS" "$1" >/dev/null 2>&1 || true
}

port_open() { (exec 3<>"/dev/tcp/127.0.0.1/$PORT") >/dev/null 2>&1; }
is_athos()  { command -v curl >/dev/null 2>&1 && curl -fsS --max-time 2 "$URL" 2>/dev/null | grep -q "ATHOS"; }

# Quién escucha en el puerto, por si el archivo de PID se perdió.
listener_pid() {
  if command -v ss >/dev/null 2>&1; then
    ss -ltnpH "sport = :$PORT" 2>/dev/null | grep -o 'pid=[0-9]*' | head -1 | cut -d= -f2
  elif command -v lsof >/dev/null 2>&1; then
    lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -1
  fi
}

stop_running() {
  local stopped=1 pid
  if [[ -f "$PID_FILE" ]]; then
    pid="$(cat "$PID_FILE")"
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null && stopped=0
    fi
    rm -f "$PID_FILE"
  fi
  if [[ "$stopped" != 0 ]] && port_open; then
    pid="$(listener_pid)"
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null && stopped=0
    fi
  fi
  # Esperar a que el puerto quede libre de verdad.
  for _ in $(seq 1 40); do port_open || break; sleep 0.05; done
  return "$stopped"
}

case "$ACTION" in
  stop)
    if stop_running; then echo "ATHOS detenido."; else echo "No había ningún servidor de ATHOS en marcha."; fi
    exit 0 ;;
  status)
    if port_open && is_athos; then echo "ATHOS está corriendo en $URL"; else echo "ATHOS no está corriendo."; fi
    exit 0 ;;
esac

command -v python3 >/dev/null 2>&1 || fail "Falta python3. Instálalo con: sudo apt install python3"

# ---------------------------------------------------------------------------
# Compilación, sólo si hace falta
# ---------------------------------------------------------------------------
find_node() {
  if command -v npm >/dev/null 2>&1; then echo ""; return 0; fi
  # Node no siempre está en el PATH del sistema; se busca la instalación local.
  for dir in "$HOME/.local/node/bin" "$HOME/.nvm/versions/node"/*/bin; do
    [[ -x "$dir/npm" ]] && { echo "$dir"; return 0; }
  done
  return 1
}

build() {
  local extra_path
  if ! extra_path="$(find_node)"; then
    fail "ATHOS no está compilada y no encuentro Node para compilarla.

Instálalo sin tocar el sistema:
  curl -o /tmp/node.tar.xz https://nodejs.org/dist/v24.19.0/node-v24.19.0-linux-x64.tar.xz
  mkdir -p ~/.local && tar -xf /tmp/node.tar.xz -C ~/.local
  mv ~/.local/node-v24.19.0-linux-x64 ~/.local/node

Y vuelve a abrir ATHOS."
  fi
  [[ -n "$extra_path" ]] && export PATH="$extra_path:$PATH"

  notice "Compilando ATHOS… (sólo la primera vez, tarda un minuto)"
  cd "$APP_DIR"
  [[ -d node_modules ]] || npm install --no-audit --no-fund || fail "Falló la instalación de dependencias."
  npm run build || fail "Falló la compilación. Ejecuta ./run.sh desde una terminal para ver el detalle."
  cd - >/dev/null
}

if [[ "$ACTION" == "rebuild" ]]; then
  stop_running >/dev/null || true
  build
elif [[ ! -f "$APP_DIR/dist/index.html" ]]; then
  build
fi

# ---------------------------------------------------------------------------
# Servidor
# ---------------------------------------------------------------------------
STARTED_HERE=0
if port_open; then
  if is_athos; then
    echo "ATHOS ya se estaba sirviendo en ${URL}"
  else
    fail "El puerto ${PORT} está ocupado por otro programa.
Ciérralo o usa otro puerto:  ATHOS_PORT=8899 ./run.sh"
  fi
else
  rm -f "$PID_FILE"
  setsid python3 "$APP_DIR/server.py" --port "$PORT" --dir "$APP_DIR/dist" \
    --pid-file "$PID_FILE" >"$LOG_FILE" 2>&1 &
  STARTED_HERE=1
  for _ in $(seq 1 100); do port_open && break; sleep 0.05; done
  SERVER_PID="$(cat "$PID_FILE" 2>/dev/null || listener_pid)"
  port_open || fail "No se pudo arrancar el servidor. Revisa $LOG_FILE"
fi

stop_server() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
    rm -f "$PID_FILE"
  fi
}

if [[ "$OPEN_BROWSER" == 0 ]]; then
  echo "ATHOS en ${URL} · Ctrl+C para detener."
  trap 'stop_server' EXIT INT TERM
  [[ "$STARTED_HERE" == 1 ]] && wait "$SERVER_PID"
  exit 0
fi

# ---------------------------------------------------------------------------
# Navegador, en ventana propia
# ---------------------------------------------------------------------------
GECKO_LIKE=(zen zen-browser zen-bin firefox librewolf floorp waterfox)
CHROMIUM_LIKE=(brave-browser brave chromium chromium-browser google-chrome google-chrome-stable microsoft-edge vivaldi)

BROWSER_BIN="${ATHOS_BROWSER:-}"
if [[ -z "$BROWSER_BIN" ]]; then
  # Se prefiere Chromium: es el único que instala PWA de verdad.
  for b in "${CHROMIUM_LIKE[@]}" "${GECKO_LIKE[@]}"; do
    command -v "$b" >/dev/null 2>&1 && { BROWSER_BIN="$b"; break; }
  done
fi

kind_of() {
  local name; name="$(basename "${1:-}")"
  for b in "${GECKO_LIKE[@]}";    do [[ "$name" == "$b" ]] && { echo gecko; return; }; done
  for b in "${CHROMIUM_LIKE[@]}"; do [[ "$name" == "$b" ]] && { echo chromium; return; }; done
  echo other
}
BROWSER_KIND="$(kind_of "$BROWSER_BIN")"
# Un navegador indicado a mano se respeta aunque no se reconozca su familia.
[[ -n "${ATHOS_BROWSER:-}" && "$BROWSER_KIND" == "other" ]] && BROWSER_KIND="manual"

prepare_gecko_profile() {
  local prof="$DATA_DIR/gecko-profile"
  mkdir -p "$prof/chrome"
  cat > "$prof/user.js" <<'PREFS'
// Perfil de ATHOS: generado por run.sh, puedes editarlo a tu gusto.
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.aboutwelcome.enabled", false);
user_pref("browser.sessionstore.resume_from_crash", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("browser.tabs.warnOnClose", false);
user_pref("zen.welcome-screen.seen", true);
PREFS
  if [[ "${ATHOS_CHROME:-0}" == "1" ]]; then
    rm -f "$prof/chrome/userChrome.css"
  else
    cat > "$prof/chrome/userChrome.css" <<'CSS'
/* ATHOS como aplicación: fuera barras de pestañas y de direcciones.
   Borra este archivo (o exporta ATHOS_CHROME=1) para recuperarlas. */
#navigator-toolbox { display: none !important; }
#zen-sidebar-splitter,
#zen-appcontent-navbar-container,
#zen-tabbox-wrapper > #zen-sidebar-box { display: none !important; }
#zen-main-app-wrapper, #zen-appcontent-wrapper { margin: 0 !important; padding: 0 !important; }
browser { border-radius: 0 !important; }
CSS
  fi
  echo "$prof"
}

started_at=$SECONDS
case "$BROWSER_KIND" in
  gecko)
    PROFILE="$(prepare_gecko_profile)"
    "$BROWSER_BIN" --no-remote --profile "$PROFILE" --class ATHOS \
      --new-window "$URL" >/dev/null 2>&1 || true
    ;;
  chromium)
    "$BROWSER_BIN" \
      --app="$URL" \
      --user-data-dir="$DATA_DIR/browser" \
      --class=ATHOS \
      --no-first-run --no-default-browser-check --disable-features=Translate \
      >/dev/null 2>&1 || true
    ;;
  manual)
    "$BROWSER_BIN" "$URL" >/dev/null 2>&1 || true
    ;;
  *)
    if command -v xdg-open >/dev/null 2>&1; then
      xdg-open "$URL" >/dev/null 2>&1 || true
    else
      fail "No se encontró ningún navegador. Abre manualmente: $URL"
    fi
    ;;
esac
elapsed=$(( SECONDS - started_at ))

# Si el navegador devolvió el control enseguida, delegó en una ventana ya
# existente: el servidor debe seguir vivo. Si estuvo abierto de verdad, al
# cerrarlo se apaga todo.
if [[ "$STARTED_HERE" == 1 ]]; then
  if (( elapsed < 5 )); then
    echo "ATHOS abierto en ${URL}"
    echo "El servidor sigue en segundo plano · deténlo con: $APP_DIR/run.sh --stop"
  else
    stop_server
  fi
fi
