#!/usr/bin/env python3
"""
Genera el leccionario diario de ATHOS a partir de orthocal.

orthocal (https://github.com/brianglass/orthocal-python, licencia MIT, de Brian
Glass) implementa el cómputo completo del leccionario bizantino: el salto
lucano, las semanas que se añaden o se omiten según la fecha de la Pascua, los
domingos antes y después de las grandes fiestas, y los propios del Menaion.

ATHOS no reimplementa esa lógica —son casi dos mil líneas y equivocarse sería
fácil y silencioso—, sino que la ejecuta en local y guarda el resultado. Así el
cálculo es el de la fuente y ATHOS sigue funcionando sin conexión y sin
depender de ningún servidor.

Este script se ejecuta dentro del entorno de orthocal; lo prepara todo
`scripts/build-lectionary.sh`.

orthocal usa por defecto la tradición eslava, que es la que ATHOS incorpora.

Uso:  python build-lectionary.py <año-inicial> <año-final> <carpeta-salida> [gregoriano|juliano]
"""

from __future__ import annotations

import json
import re
import sys
from datetime import date, timedelta
from pathlib import Path

import django

django.setup()

from calendarium.datetools import Calendar  # noqa: E402
from calendarium.liturgics import Day  # noqa: E402  (requiere django.setup antes)

# ---------------------------------------------------------------------------
# Nombres de los libros
# ---------------------------------------------------------------------------

# Del nombre inglés que usa orthocal al nombre español y al código USFX que
# emplea ATHOS para abrir el pasaje en la Biblia.
LIBROS: dict[str, tuple[str, str, str]] = {
    # inglés: (nombre español, abreviatura, código USFX)
    'Matthew': ('Mateo', 'Mt', 'MAT'),
    'Mark': ('Marcos', 'Mc', 'MRK'),
    'Luke': ('Lucas', 'Lc', 'LUK'),
    'John': ('Juan', 'Jn', 'JHN'),
    'Acts': ('Hechos', 'Hch', 'ACT'),
    'Romans': ('Romanos', 'Rm', 'ROM'),
    '1 Corinthians': ('1 Corintios', '1 Co', '1CO'),
    '2 Corinthians': ('2 Corintios', '2 Co', '2CO'),
    'Galatians': ('Gálatas', 'Ga', 'GAL'),
    'Ephesians': ('Efesios', 'Ef', 'EPH'),
    'Philippians': ('Filipenses', 'Flp', 'PHP'),
    'Colossians': ('Colosenses', 'Col', 'COL'),
    '1 Thessalonians': ('1 Tesalonicenses', '1 Ts', '1TH'),
    '2 Thessalonians': ('2 Tesalonicenses', '2 Ts', '2TH'),
    '1 Timothy': ('1 Timoteo', '1 Tm', '1TI'),
    '2 Timothy': ('2 Timoteo', '2 Tm', '2TI'),
    'Titus': ('Tito', 'Tt', 'TIT'),
    'Philemon': ('Filemón', 'Flm', 'PHM'),
    'Hebrews': ('Hebreos', 'Hb', 'HEB'),
    'James': ('Santiago', 'St', 'JAS'),
    '1 Peter': ('1 Pedro', '1 P', '1PE'),
    '2 Peter': ('2 Pedro', '2 P', '2PE'),
    '1 John': ('1 Juan', '1 Jn', '1JN'),
    '2 John': ('2 Juan', '2 Jn', '2JN'),
    '3 John': ('3 Juan', '3 Jn', '3JN'),
    'Jude': ('Judas', 'Jds', 'JUD'),
    'Revelation': ('Apocalipsis', 'Ap', 'REV'),
    # Antiguo Testamento (vísperas, horas y profecías)
    'Genesis': ('Génesis', 'Gn', 'GEN'),
    'Exodus': ('Éxodo', 'Ex', 'EXO'),
    'Leviticus': ('Levítico', 'Lv', 'LEV'),
    'Numbers': ('Números', 'Nm', 'NUM'),
    'Deuteronomy': ('Deuteronomio', 'Dt', 'DEU'),
    'Joshua': ('Josué', 'Jos', 'JOS'),
    'Judges': ('Jueces', 'Jc', 'JDG'),
    'Ruth': ('Rut', 'Rt', 'RUT'),
    'Job': ('Job', 'Jb', 'JOB'),
    'Psalm': ('Salmo', 'Sal', 'PSA'),
    'Psalms': ('Salmos', 'Sal', 'PSA'),
    'Proverbs': ('Proverbios', 'Pr', 'PRO'),
    'Ecclesiastes': ('Eclesiastés', 'Ec', 'ECC'),
    'Song of Songs': ('Cantar de los Cantares', 'Ct', 'SNG'),
    'Isaiah': ('Isaías', 'Is', 'ISA'),
    'Jeremiah': ('Jeremías', 'Jr', 'JER'),
    'Lamentations': ('Lamentaciones', 'Lm', 'LAM'),
    'Ezekiel': ('Ezequiel', 'Ez', 'EZK'),
    'Daniel': ('Daniel', 'Dn', 'DAN'),
    'Hosea': ('Oseas', 'Os', 'HOS'),
    'Joel': ('Joel', 'Jl', 'JOL'),
    'Amos': ('Amós', 'Am', 'AMO'),
    'Obadiah': ('Abdías', 'Abd', 'OBA'),
    'Jonah': ('Jonás', 'Jon', 'JON'),
    'Micah': ('Miqueas', 'Mi', 'MIC'),
    'Nahum': ('Nahúm', 'Na', 'NAM'),
    'Habakkuk': ('Habacuc', 'Ha', 'HAB'),
    'Zephaniah': ('Sofonías', 'So', 'ZEP'),
    'Haggai': ('Ageo', 'Ag', 'HAG'),
    'Zechariah': ('Zacarías', 'Za', 'ZEC'),
    'Malachi': ('Malaquías', 'Ml', 'MAL'),
    # Deuterocanónicos: ATHOS los reconoce, aunque su texto siga pendiente.
    'Wisdom of Solomon': ('Sabiduría', 'Sb', 'WIS'),
    'Sirach': ('Eclesiástico', 'Si', 'SIR'),
    'Baruch': ('Baruc', 'Ba', 'BAR'),
    'Judith': ('Judit', 'Jdt', 'JDT'),
    'Tobit': ('Tobías', 'Tb', 'TOB'),
    '1 Maccabees': ('1 Macabeos', '1 M', '1MA'),
    '2 Maccabees': ('2 Macabeos', '2 M', '2MA'),
    '3 Maccabees': ('3 Macabeos', '3 M', '3MA'),
    # Numeración de los Reinos según los Setenta, como la escribe orthocal.
    '1 Kings': ('1 Samuel', '1 S', '1SA'),
    '2 Kings': ('2 Samuel', '2 S', '2SA'),
    '3 Kings': ('1 Reyes', '1 R', '1KI'),
    '4 Kings': ('2 Reyes', '2 R', '2KI'),
    '1 Samuel': ('1 Samuel', '1 S', '1SA'),
    '2 Samuel': ('2 Samuel', '2 S', '2SA'),
    'Song of the Three': ('Cántico de los tres jóvenes', 'Cánt', ''),
}

# Los nombres largos se prueban primero: «1 Corinthians» antes que «Corinthians».
LIBROS_ORDENADOS = sorted(LIBROS, key=len, reverse=True)

# ---------------------------------------------------------------------------
# Tipo de lectura
# ---------------------------------------------------------------------------

def clasificar(source: str) -> str:
    s = source.lower()
    if 'matins gospel' in s:
        return 'evangelio-maitines'
    if 'passion gospel' in s:
        return 'evangelio-pasion'
    if 'gospel' in s:
        return 'evangelio'
    if 'epistle' in s:
        return 'epistola'
    if 'vespers' in s:
        return 'visperas'
    if 'hour' in s:
        return 'horas'
    if 'blessing of waters' in s:
        return 'bendicion-aguas'
    if 'cross procession' in s:
        return 'procesion-cruz'
    if 'matins' in s:
        return 'maitines'
    return 'otra'


ORDEN_TIPO = {
    'evangelio': 0,
    'epistola': 1,
    'evangelio-maitines': 2,
    'visperas': 3,
    'horas': 4,
    'evangelio-pasion': 5,
    'bendicion-aguas': 6,
    'procesion-cruz': 7,
    'maitines': 8,
    'otra': 9,
}

# ---------------------------------------------------------------------------
# Referencias
# ---------------------------------------------------------------------------

SEGMENTO_SIMPLE = re.compile(r'^\d+\.\d+(?:-\d+(?:\.\d+)?)?$')


def partir_display(display: str) -> tuple[str | None, str]:
    """Separa «Matthew 19.16-26» en («Matthew», «19.16-26»)."""
    texto = display.strip().lstrip('​')
    for libro in LIBROS_ORDENADOS:
        if texto.startswith(libro + ' '):
            return libro, texto[len(libro) + 1:]
    return None, texto


def formatear_referencia(resto: str) -> tuple[str, int | None, bool]:
    """
    Pasa la referencia al uso español: «19.16-26» → «19, 16-26».

    Devuelve además el capítulo inicial, para poder abrir el pasaje, y si la
    referencia era simple. Las compuestas se dejan como están: prefiero una
    referencia literal a una reescritura que pueda alterar su sentido.
    """
    segmentos = [s.strip() for s in resto.split(',')]
    salida: list[str] = []
    capitulo: int | None = None
    simple = True

    for segmento in segmentos:
        if SEGMENTO_SIMPLE.fullmatch(segmento):
            inicio, _, fin = segmento.partition('-')
            cap, _, ver = inicio.partition('.')
            if capitulo is None:
                capitulo = int(cap)
            if '.' in fin:  # cruza de capítulo: 4.17-5.5
                cap2, _, ver2 = fin.partition('.')
                salida.append(f'{cap}, {ver} – {cap2}, {ver2}')
            elif fin:
                salida.append(f'{cap}, {ver}-{fin}')
            else:
                salida.append(f'{cap}, {ver}')
        elif re.fullmatch(r'\d+', segmento):
            if capitulo is None:
                capitulo = int(segmento)
            salida.append(segmento)
        elif re.fullmatch(r'\d+(?:-\d+)?', segmento) and salida:
            # Continuación dentro del mismo capítulo: «10.38-42, 44-45».
            salida.append(segmento)
        else:
            simple = False
            salida.append(segmento)

    return '; '.join(salida), capitulo, simple


def traducir_nombres(texto: str) -> str:
    """Traduce los nombres de libro que aparezcan dentro de una referencia compuesta."""
    for libro in LIBROS_ORDENADOS:
        texto = re.sub(rf'\b{re.escape(libro)}\b', LIBROS[libro][0], texto)
    return texto


def convertir(display: str) -> dict:
    libro, resto = partir_display(display)
    if libro is None:
        return {'reference': traducir_nombres(display), 'compuesta': True}

    nombre, _abrev, codigo = LIBROS[libro]
    referencia, capitulo, simple = formatear_referencia(resto)
    if not simple:
        referencia = traducir_nombres(referencia)

    entrada: dict = {'reference': f'{nombre} {referencia}'}
    if simple and codigo and capitulo:
        entrada['book'] = codigo
        entrada['chapter'] = capitulo
    if not simple:
        entrada['compuesta'] = True
    return entrada


# ---------------------------------------------------------------------------
# Notas de la lectura
# ---------------------------------------------------------------------------

# Indican por qué se lee ese pasaje: la fiesta, el santo o el oficio. Se
# traduce el vocabulario estructural; los nombres propios de santo se dejan
# tal cual, porque su transliteración al español varía y no se inventa.
NOTAS: list[tuple[str, str]] = [
    (r'\bAfterfeast of\b', 'Después de la fiesta de'),
    (r'\bForefeast of\b', 'Víspera de'),
    (r'\bLeavetaking of\b', 'Clausura de'),
    (r'\bSaturday before\b', 'sábado anterior a'),
    (r'\bSaturday after\b', 'sábado posterior a'),
    (r'\bSunday before\b', 'domingo anterior a'),
    (r'\bSunday after\b', 'domingo posterior a'),
    (r'\bat Vespers\b', 'en Vísperas'),
    (r'\bat Matins\b', 'en Maitines'),
    (r'\bat Liturgy\b', 'en la Liturgia'),
    (r'\bAt the Washing of the Feet\b', 'En el lavatorio de los pies'),
    (r'\bAfter the Washing of the Feet\b', 'Tras el lavatorio de los pies'),
    (r'\bAnnunciation\b', 'Anunciación'),
    (r'\bNativity of the Theotokos\b', 'Natividad de la Theotokos'),
    (r'\bNativity\b', 'Natividad'),
    (r'\bTheophany\b', 'Teofanía'),
    (r'\bTransfiguration\b', 'Transfiguración'),
    (r'\bDormition\b', 'Dormición'),
    (r'\bPresentation\b', 'Presentación'),
    (r'\bProtection of the Theotokos\b', 'Protección de la Theotokos'),
    (r'\bElevation of the Cross\b', 'Exaltación de la Cruz'),
    (r'\bExaltation\b', 'Exaltación'),
    (r'\bMeeting\b', 'Encuentro'),
    (r'\bEntrance\b', 'Entrada'),
    (r'\bAscension\b', 'Ascensión'),
    (r'\bPentecost\b', 'Pentecostés'),
    (r'\bPascha\b', 'Pascua'),
    (r'\bBeheading\b', 'Degollación'),
    (r'\bCircumcision\b', 'Circuncisión'),
    (r'\bConception\b', 'Concepción'),
    (r'\bSynaxis of\b', 'Sinaxis de'),
    (r'\bForerunner\b', 'el Precursor'),
    (r'\bTheotokos\b', 'la Theotokos'),
    (r'\bDeparted\b', 'los difuntos'),
    (r'\bFathers\b', 'los Padres'),
    (r'\bMartyrs\b', 'los mártires'),
    (r'\bMartyr\b', 'el mártir'),
    (r'\bHieromartyrs\b', 'los hieromártires'),
    (r'\bHieromartyr\b', 'el hieromártir'),
    (r'\bSaints\b', 'los santos'),
    (r'\bApostles of the 70\b', 'los Setenta Apóstoles'),
    (r'\bApostles\b', 'los Apóstoles'),
    (r'\bApostle\b', 'el apóstol'),
    (r'\bProphet\b', 'el profeta'),
    (r'\bUnmercenaries\b', 'los anargiros'),
    (r'\bBridegroom\b', 'el Esposo'),
    (r'\bAngels\b', 'los ángeles'),
    (r'\bMonastics\b', 'los monjes'),
    (r'\bthe Great\b', 'el Grande'),
    (r'\bthe Wonderworker\b', 'el Taumaturgo'),
    (r'\bthe Theologian\b', 'el Teólogo'),
    (r'\bof the Seventy\b', 'de los Setenta'),
    (r'\bSt\.?\b', 'san'),
    (r'\bEpistle\b', 'Epístola'),
    (r'\bGospel\b', 'Evangelio'),
    (r'\bProphecy\b', 'profecía'),
    (r'\balternate\b', 'alternativa'),
    (r'\b(\d+)(?:st|nd|rd|th) [Rr]eading\b', r'lectura \1'),
    (r'\bMenaion\b', 'Menaion'),
]


def traducir_nota(nota: str) -> str:
    for patron, reemplazo in NOTAS:
        nota = re.sub(patron, reemplazo, nota)
    return nota


# ---------------------------------------------------------------------------
# Generación
# ---------------------------------------------------------------------------

def generar_anio(anio: int, calendario) -> dict:
    dias: dict[str, list[dict]] = {}
    fecha = date(anio, 1, 1)

    while fecha.year == anio:
        dia = Day(fecha.year, fecha.month, fecha.day, calendar=calendario)
        dia.initialize()

        lecturas = []
        for lectura in dia.get_readings():
            display = getattr(lectura.pericope, 'display', '') or ''
            if not display:
                continue
            entrada = convertir(display)
            entrada['kind'] = clasificar(lectura.source)
            if lectura.desc:
                entrada['note'] = traducir_nota(lectura.desc)
            lecturas.append(entrada)

        lecturas.sort(key=lambda r: ORDEN_TIPO.get(r['kind'], 9))
        if lecturas:
            dias[f'{fecha.month:02d}-{fecha.day:02d}'] = lecturas
        fecha += timedelta(days=1)

    return {'year': anio, 'days': dias}


def main() -> int:
    if len(sys.argv) < 4:
        print(__doc__)
        return 2

    desde, hasta, destino = int(sys.argv[1]), int(sys.argv[2]), Path(sys.argv[3])
    estilo = sys.argv[4] if len(sys.argv) > 4 else 'gregoriano'
    calendario = Calendar.Julian if estilo.startswith('jul') else Calendar.Gregorian
    sufijo = '-juliano' if estilo.startswith('jul') else ''
    destino.mkdir(parents=True, exist_ok=True)

    # El mismo juego de lecturas se repite muchísimo de un año a otro: se
    # guarda una sola vez y cada día apunta a su posición. Reduce el archivo
    # a una fracción, que importa porque todo esto se precachea.
    pozo: list[str] = []
    indices: dict[str, int] = {}
    anios: dict[str, dict[str, int]] = {}
    total_dias = 0

    for anio in range(desde, hasta + 1):
        datos = generar_anio(anio, calendario)
        dias: dict[str, int] = {}
        for clave, lecturas in datos['days'].items():
            firma = json.dumps(lecturas, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
            if firma not in indices:
                indices[firma] = len(pozo)
                pozo.append(firma)
            dias[clave] = indices[firma]
        anios[str(anio)] = dias
        total_dias += len(dias)
        print(f'  {anio}: {len(dias)} días')

    salida = {
        'format': 'athos-lectionary',
        'version': 1,
        'source': 'orthocal-python (Brian Glass) — licencia MIT',
        'url': 'https://github.com/brianglass/orthocal-python',
        'tradition': 'slavic',
        'calendar': estilo,
        'generated': date.today().isoformat(),
        'readings': [json.loads(f) for f in pozo],
        'years': anios,
    }

    archivo = destino / f'lectionary{sufijo}.json'
    archivo.write_text(json.dumps(salida, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(
        f'{len(anios)} años · {total_dias} días · {len(pozo)} juegos distintos '
        f'· {archivo.stat().st_size // 1024} kB'
    )
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
