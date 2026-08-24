#!/usr/bin/env bash
# Regenera el leccionario diario de ATHOS.
#
# Prepara un entorno con orthocal (MIT, de Brian Glass), ejecuta su cómputo en
# local para el rango de años indicado y guarda el resultado en
# public/content/lectionary/. No se consulta su servidor: su robots.txt pide
# que no se recorra la API, y no hace falta.

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TRABAJO="${ATHOS_ORTHOCAL_DIR:-/tmp/orthocal}"
DESDE="${1:-2024}"
HASTA="${2:-2045}"
REPO='https://github.com/brianglass/orthocal-python.git'

command -v python3 >/dev/null 2>&1 || { echo "Falta python3" >&2; exit 1; }
command -v git     >/dev/null 2>&1 || { echo "Falta git" >&2; exit 1; }

if [[ ! -d "$TRABAJO/.git" ]]; then
  echo "Clonando orthocal en $TRABAJO…"
  git clone --depth 1 -q "$REPO" "$TRABAJO"
fi

cd "$TRABAJO"

if [[ ! -x .venv/bin/python ]]; then
  echo "Preparando el entorno…"
  python3 -m venv .venv
  ./.venv/bin/pip install -q --disable-pip-version-check django==6.1 jdcal python-dateutil
fi

# Ajustes mínimos: sólo las aplicaciones necesarias para el cálculo.
cat > settings_athos.py <<'PY'
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent
SECRET_KEY = 'solo-para-generar-datos'
DEBUG = False
INSTALLED_APPS = ['calendarium', 'bible', 'commemorations']
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'athos.sqlite3'}}
USE_TZ = True
TIME_ZONE = 'UTC'
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
PY

if [[ ! -f athos.sqlite3 ]]; then
  echo "Cargando el leccionario…"
  ./.venv/bin/python manage.py migrate --settings=settings_athos >/dev/null
  ./.venv/bin/python manage.py loaddata fixtures/calendarium.json --settings=settings_athos
fi

cp "$APP_DIR/scripts/build-lectionary.py" .
DESTINO="$APP_DIR/public/content/lectionary"
mkdir -p "$DESTINO"

for estilo in gregoriano juliano; do
  echo "Generando $DESDE-$HASTA ($estilo)… puede tardar varios minutos."
  DJANGO_SETTINGS_MODULE=settings_athos ./.venv/bin/python build-lectionary.py \
    "$DESDE" "$HASTA" "$DESTINO" "$estilo"
done

echo
echo "Listo. Recuerda subir CONTENT_VERSION en src/content/index.ts si cambia el corpus."
