#!/usr/bin/env python3
"""
Descarga las reproducciones de iconos desde Wikimedia Commons.

ATHOS no incluye imágenes generadas por ordenador ni reproducciones de origen
dudoso: todas las que muestra son fotografías o escaneos de iconos históricos
alojados en Wikimedia Commons, y de cada una se guarda su licencia, su autor y
su procedencia, que la aplicación enseña junto al icono.

El script comprueba la licencia antes de descargar nada. Si un archivo no está
en dominio público ni bajo una licencia Creative Commons compatible, se omite y
la ficha del icono se queda sin imagen, como estaba.

Uso:  python3 scripts/fetch-icons.py [carpeta-destino]
"""

from __future__ import annotations

import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

API = 'https://commons.wikimedia.org/w/api.php'
AGENTE = {
    'User-Agent': 'ATHOS/1.1 (PWA ortodoxa libre; https://github.com/tu-usuario/athos)'
}

# Licencias que ATHOS acepta. Todas permiten redistribuir citando la fuente.
LICENCIAS_OK = re.compile(
    r'public domain|^pd|cc0|cc by(?:-sa)?(?:\s|-)?\d|no restrictions',
    re.IGNORECASE,
)

# Para cada icono, los archivos candidatos de Commons por orden de preferencia.
# Se eligieron por ser reproducciones fieles de obras históricas concretas.
CANDIDATOS: dict[str, list[str]] = {
    'pantocrator': [
        'File:Christ Icon Sinai 6th century.jpg',
        'File:Spas vsederzhitel sinay.jpg',
    ],
    'acheiropoietos': [
        # Santa Faz de Nóvgorod, hacia 1100.
        'File:Christos Acheiropoietos.jpg',
        'File:Simon Ushakov - Спас Нерукотворный - Google Art Project.jpg',
    ],
    'vladimir': [
        'File:Vladimirskaya.jpg',
        'File:Theotokos of Vladimir (Tretyakov gallery).jpg',
    ],
    'portaitissa': [
        'File:Panagia Portaitissa.jpg',
        'File:Iveron.jpg',
    ],
    'trikherousa': [
        'File:Икона-Божией-Матери-Троеручица.jpg',
        'File:VergineTricherusa.jpg',
    ],
    'glykofilousa': [
        'File:Virgin of Tenderness, Athena (14th Century).jpg',
        'File:Episkepsis (mosaic icon).jpg',
    ],
    'trinidad-rublev': [
        'File:Andrey Rublev - Св. Троица - Google Art Project.jpg',
        'File:Angelsatmamre-trinity-rublev-1410.jpg',
    ],
    'anastasis': [
        'File:Chora Anastasis1.jpg',
        'File:Anastasis fresco Chora.jpg',
    ],
    'transfiguracion-icono': [
        'File:Transfiguration-Sinai.jpg',
        'File:Saint Catherine\'s Transfiguration.jpg',
    ],
    'natividad-icono': [
        # Mosaico de la Natividad, Capilla Palatina de Palermo, hacia 1150.
        'File:Meister der Palastkapelle in Palermo 001.jpg',
    ],
    'entrada-jerusalen': [
        # Mosaico de la Entrada en Jerusalén, misma capilla y misma época.
        'File:Meister der Palastkapelle in Palermo 002.jpg',
    ],
    'deesis': [
        'File:Deesis mosaic Hagia Sophia.jpg',
        'File:Christ Pantocrator Deesis mosaic Hagia Sophia.jpg',
    ],
    'panselinos-protaton': [
        'File:Manuel Panselinos Protaton.jpg',
        'File:Protaton fresco.jpg',
    ],
}

# Si ningún candidato sirve, se busca con estos términos.
BUSQUEDAS: dict[str, str] = {
    'pantocrator': 'Christ Pantocrator Sinai encaustic icon',
    'acheiropoietos': 'Mandylion Holy Face icon Novgorod',
    'vladimir': 'Theotokos Vladimir icon Tretyakov',
    'portaitissa': 'Iveron Portaitissa Theotokos icon',
    'trikherousa': 'Three-handed Theotokos Trojerucica icon',
    'glykofilousa': 'Glykophilousa Theotokos tenderness icon',
    'trinidad-rublev': 'Rublev Trinity icon',
    'anastasis': 'Anastasis Chora Harrowing of Hell fresco',
    'transfiguracion-icono': 'Transfiguration Sinai mosaic apse',
    'natividad-icono': 'Nativity of Christ Palatine Chapel mosaic',
    'entrada-jerusalen': 'Entry into Jerusalem Palatine Chapel mosaic',
    'deesis': 'Deesis mosaic Hagia Sophia',
    'panselinos-protaton': 'Protaton Karyes fresco Panselinos',
}


def consultar(parametros: dict) -> dict:
    parametros['format'] = 'json'
    url = API + '?' + urllib.parse.urlencode(parametros)
    peticion = urllib.request.Request(url, headers=AGENTE)
    with urllib.request.urlopen(peticion, timeout=60) as respuesta:
        return json.load(respuesta)


def limpiar(html: str) -> str:
    texto = re.sub(r'<[^>]+>', ' ', html or '')
    texto = texto.replace('&amp;', '&').replace('&quot;', '"').replace('&#039;', "'")
    return re.sub(r'\s+', ' ', texto).strip()


def info_de(titulos: list[str]) -> list[dict]:
    """Metadatos de imagen de una lista de títulos de Commons."""
    if not titulos:
        return []
    datos = consultar({
        'action': 'query',
        'titles': '|'.join(titulos),
        'prop': 'imageinfo',
        'iiprop': 'url|size|extmetadata|mime',
    })
    paginas = (datos.get('query') or {}).get('pages', {})
    salida = []
    for pagina in paginas.values():
        if 'missing' in pagina or not pagina.get('imageinfo'):
            continue
        ii = pagina['imageinfo'][0]
        em = ii.get('extmetadata', {})
        salida.append({
            'titulo': pagina['title'],
            'url': ii['url'],
            'descripcion_url': ii.get('descriptionurl', ''),
            'ancho': ii.get('width', 0),
            'alto': ii.get('height', 0),
            'mime': ii.get('mime', ''),
            'licencia': limpiar(em.get('LicenseShortName', {}).get('value', '')),
            'autor': limpiar(em.get('Artist', {}).get('value', '')),
            'credito': limpiar(em.get('Credit', {}).get('value', '')),
            'fecha': limpiar(em.get('DateTimeOriginal', {}).get('value', '')),
            'permiso': limpiar(em.get('UsageTerms', {}).get('value', '')),
        })
    return salida


def buscar(consulta: str, limite: int = 6) -> list[dict]:
    datos = consultar({
        'action': 'query',
        'generator': 'search',
        'gsrsearch': f'{consulta} filetype:bitmap',
        'gsrnamespace': 6,
        'gsrlimit': limite,
        'prop': 'imageinfo',
        'iiprop': 'url|size|extmetadata|mime',
    })
    paginas = (datos.get('query') or {}).get('pages', {})
    return info_de([p['title'] for p in paginas.values()])


def aceptable(info: dict) -> bool:
    if not info['mime'].startswith('image/'):
        return False
    # Se exige autoría o fecha documentada: ATHOS no muestra imágenes de
    # procedencia incierta, y menos aún generadas por ordenador.
    if not (info['autor'] or info['fecha']):
        return False
    # Algunas reproducciones antiguas sólo existen en resolución modesta; para
    # una ficha de 300 px de ancho siguen sirviendo.
    if min(info['ancho'], info['alto']) < 280:
        return False
    return bool(LICENCIAS_OK.search(info['licencia']))


def elegir(clave: str) -> dict | None:
    candidatos = [c for c in info_de(CANDIDATOS.get(clave, [])) if aceptable(c)]
    if not candidatos:
        candidatos = [c for c in buscar(BUSQUEDAS[clave]) if aceptable(c)]
    if not candidatos:
        return None
    # Se prefiere el dominio público y, dentro de eso, la mayor resolución.
    candidatos.sort(
        key=lambda c: (
            0 if 'public domain' in c['licencia'].lower() or c['licencia'].lower().startswith('pd') else 1,
            -min(c['ancho'], c['alto']),
        )
    )
    return candidatos[0]


def main() -> int:
    destino = Path(sys.argv[1] if len(sys.argv) > 1 else 'public/content/icons')
    destino.mkdir(parents=True, exist_ok=True)

    manifiesto: dict[str, dict] = {}
    for clave in CANDIDATOS:
        print(f'{clave}…', end=' ', flush=True)
        try:
            elegido = elegir(clave)
        except Exception as error:  # noqa: BLE001 - se informa y se sigue
            print(f'error: {error}')
            continue

        if not elegido:
            print('sin imagen con licencia comprobable')
            continue

        archivo = destino / f'{clave}.jpg'
        peticion = urllib.request.Request(elegido['url'], headers=AGENTE)
        with urllib.request.urlopen(peticion, timeout=180) as respuesta:
            archivo.write_bytes(respuesta.read())

        manifiesto[clave] = {
            'file': f'{clave}.jpg',
            'title': elegido['titulo'],
            'license': elegido['licencia'],
            'author': elegido['autor'],
            'credit': elegido['credito'],
            'date': elegido['fecha'],
            'terms': elegido['permiso'],
            'page': elegido['descripcion_url'],
            'width': elegido['ancho'],
            'height': elegido['alto'],
        }
        print(f"{elegido['licencia']} · {elegido['ancho']}×{elegido['alto']} · {archivo.stat().st_size // 1024} kB")

    (destino / 'origen.json').write_text(
        json.dumps({'source': 'Wikimedia Commons', 'api': API, 'items': manifiesto},
                   ensure_ascii=False, indent=1),
        encoding='utf-8',
    )
    print(f'\n{len(manifiesto)} de {len(CANDIDATOS)} iconos con imagen verificada')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
