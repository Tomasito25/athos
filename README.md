<div align="center">

# ATHOS

**Oración · Tradición · Vida**

Horologion digital, libro de oración, biblioteca ortodoxa, calendario litúrgico
y diario espiritual, en una aplicación web instalable que funciona sin conexión.

Sin cuenta · Sin rastreo · Sin publicidad · Tus datos en tu dispositivo

</div>

---

## Cómo se usa

```bash
cd athos && ./run.sh
```

Eso compila la aplicación si hace falta, arranca el servidor local y abre ATHOS
en su propia ventana. Para usarla sólo hace falta **python3**; Node se necesita
únicamente para compilar, y `run.sh` lo busca solo en `~/.local/node` si no está
en el PATH.

### Icono en el escritorio

```bash
cd athos && ./install.sh
```

Crea un icono en el Escritorio y una entrada en el menú de aplicaciones: doble
clic y se abre como cualquier otro programa. Para quitarlo, `./install.sh --uninstall`.

> La primera vez, GNOME puede mostrar el icono como archivo de texto. Clic
> derecho → **«Permitir ejecución»** (o «Allow Launching») y queda listo.

### En el móvil

Un teléfono sólo puede **instalar** una aplicación web servida por **HTTPS**.
De ahí las dos formas:

```bash
./run.sh --movil    # verla en el teléfono, en tu misma red (HTTP)
./run.sh --tunel    # instalarla en el teléfono (HTTPS temporal)
```

- `--movil` muestra un **código QR** con la dirección de este equipo en la red
  local. El teléfono podrá usar ATHOS, pero no instalarla ni guardarla sin
  conexión, porque la conexión no va cifrada.
- `--tunel` abre un túnel de Cloudflare con HTTPS de verdad —te pedirá permiso
  para descargar `cloudflared`, que no necesita cuenta— y da una dirección
  desde la que el teléfono **sí puede instalarla**. Una vez instalada, ATHOS
  vive en el teléfono y sigue funcionando cuando cierres el túnel y apagues el
  ordenador.

En ambos casos sólo se sirven los archivos de la aplicación. Tu diario, tus
reglas y tus hábitos viven en el navegador de cada dispositivo y no viajan por
la red.

Para tenerla de forma **permanente** en el móvil, publícala en un alojamiento
con HTTPS:

```bash
./deploy.sh                              # deja dist/ listo para Netlify, Vercel…
./deploy.sh --base /athos/ --github      # publica en GitHub Pages
```

`deploy.sh` añade el `.nojekyll` y el `404.html` que GitHub Pages necesita, y
ATHOS puede colgar de una subcarpeta (`usuario.github.io/athos/`) sin tocar
nada más.

### Otras opciones

```bash
./run.sh --no-browser   # sólo el servidor, lo abres tú
./run.sh --status       # ¿está corriendo?
./run.sh --stop         # detenerlo
./run.sh --rebuild      # recompilar y arrancar
ATHOS_PORT=8899 ./run.sh
```

> **No abras `dist/index.html` con doble clic.** Un archivo `file://` no es un
> contexto seguro, así que el Service Worker no se registra y la aplicación no
> funcionaría sin conexión. ATHOS necesita servirse por HTTP, y de eso se encarga
> `run.sh`.

---

## Qué es ATHOS

ATHOS reúne en un solo lugar lo que un cristiano ortodoxo usa a diario:

- **Oraciones** — libro de oración estructurado en dieciocho categorías, de las
  oraciones de la mañana a la preparación para la Comunión.
- **Regla de oración** — reglas propias, editables y reordenables, con reglas
  distintas para días normales, domingos, fiestas y periodos de ayuno.
- **Oración de Jesús y chotki** — contador con objetivos, temporizador,
  vibración, historial y estadísticas.
- **Biblia** — texto completo de la Reina-Valera 1909 (dominio público), con
  búsqueda sin conexión, marcadores y notas.
- **Salterio** — los ciento cincuenta salmos en la **numeración de los Setenta**,
  la litúrgica, repartidos en los veinte kathismata del Horologion.
- **Calendario litúrgico** — Pascua calculada con el cómputo juliano, ciclo
  móvil completo, ciclo fijo, santos, fiestas y tono del Octoecos. Calendario
  nuevo o juliano, a elección.
- **Ayuno** — motor de reglas que resuelve cualquier día del año, con el detalle
  de lo permitido y el aviso de que las normas varían según la tradición.
- **Biblioteca** — Divina Liturgia y demás oficios, akathistos, cánones, Padres
  de la Iglesia, los veinte monasterios del Monte Athos e iconografía.
- **Diario espiritual** — privado, con bloqueo por PIN y cifrado AES-GCM opcional.
- **Hábitos** — registro sin rachas destacadas, sin medallas y sin comparación
  con nadie.

### Qué **no** hace

- No pide cuenta ni registro.
- No hace analítica, ni pone cookies de terceros, ni identificadores publicitarios.
- No envía tus datos a ningún servidor. No hay servidor.
- **No inventa textos litúrgicos.** Cuando una oración o un himno no está
  disponible con una licencia compatible, la ficha se conserva y el texto se
  marca como *pendiente de incorporar*.

---

## Instalación como aplicación

ATHOS es una PWA: se abre desde una URL y, si quieres, se instala.

| Plataforma | Cómo |
| --- | --- |
| **Android** (Chrome, Edge, Brave) | Menú ⋮ → «Instalar aplicación» |
| **iOS / iPadOS** (Safari) | Compartir → «Añadir a pantalla de inicio» |
| **Windows / macOS / Linux** (Chrome, Edge, Brave) | Icono de instalación en la barra de direcciones |
| **Firefox de escritorio** | No instala PWA; ATHOS funciona igual en la pestaña, también sin conexión |

Dentro de la aplicación: **Configuración → Instalar ATHOS**, con instrucciones
para tu plataforma concreta y detección de si ya está instalada.

---

## Desarrollo

Sólo si vas a tocar el código. Requiere **Node 20 o superior**; en este equipo
está en `~/.local/node`, así que antepón:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

```bash
npm install
npm run dev          # servidor de desarrollo
npm run build        # comprobación de tipos + compilación a dist/
npm run preview      # sirve dist/ con el Service Worker activo
```

Comprobaciones:

```bash
npm run lint         # ESLint
npm run typecheck    # TypeScript, sin emitir
npm test             # Vitest (169 pruebas)
npm run check        # lint + typecheck + test + build
```

Utilidades:

```bash
npm run icons        # regenera iconos, favicon, OG y splash desde el SVG maestro
npm run build:bible  # convierte una Biblia USFX a los JSON de public/content
```

> El Service Worker sólo se registra en la compilación de producción, no en
> `npm run dev`. Para probar el funcionamiento sin conexión usa `./run.sh` y
> desconecta la red en las herramientas de desarrollo.

---

## Arquitectura

```
athos/
├── public/
│   ├── content/bible/rv1909/   # texto bíblico: un JSON por libro
│   ├── fonts/                  # EB Garamond e Inter autoalojadas (OFL)
│   └── icons/                  # iconos PWA, splash de iOS, imagen OG
│
├── scripts/
│   ├── build-bible.mjs         # USFX → JSON
│   └── generate-icons.mjs      # SVG maestro → PNG/ICO
│
├── src/
│   ├── content/                # CORPUS: todo el contenido religioso
│   │   ├── prayers.ts  saints.ts  feasts.ts  lectionary.ts
│   │   ├── bible.ts    psalter.ts offices.ts hymns.ts
│   │   └── fathers.ts  athos.ts   icons.ts
│   │
│   ├── db/                     # IndexedDB (Dexie): esquema, siembra, repositorios
│   ├── lib/
│   │   ├── calendar/           # jdn · pascha · fasting · liturgical
│   │   ├── crypto.ts  text.ts  format.ts  pwa.ts  i18n.ts
│   │   └── notifications.ts  wakelock.ts  bootstrap.ts
│   ├── components/             # armazón, interfaz, lector
│   ├── features/               # una carpeta por sección
│   ├── hooks/  stores/  styles/  types/  locales/
│   └── routes/router.tsx
│
└── tests/                      # Vitest
```

**El corpus vive separado del código** (`src/content/` y `public/content/`) para
que las licencias de uno y otro puedan mantenerse distintas.

### Calendario litúrgico

Es la parte más delicada, y por eso la más probada.

- Las fechas móviles **no se calculan sumando días** a las del año anterior. La
  Pascua se obtiene con el algoritmo de Meeus, que da la fecha en el **calendario
  juliano**, y se convierte al gregoriano pasando por el **día juliano (JDN)** —
  exacto para cualquier año, no sólo para el intervalo 1900-2099 en que el
  desfase es de trece días.
- El ciclo móvil se ancla en dos referencias: la Pascua anterior (Pentecostario)
  y la siguiente (Triodio, Cuaresma, Semana Santa).
- El ciclo fijo se resuelve sobre la fecha eclesiástica que corresponda al
  calendario elegido, nuevo o juliano.
- El tono del Octoecos sigue el ciclo continuo de ocho semanas desde el Domingo
  de Tomás.

Verificado contra las fechas publicadas de la Pascua ortodoxa entre 2018 y 2034,
y comprobado para el intervalo 1900-2200: siempre en domingo y siempre entre el
22 de marzo y el 25 de abril julianos.

### Funcionamiento sin conexión

| Capa | Qué guarda |
| --- | --- |
| **Precaché del Service Worker** | Aplicación, tipografía latina y **la Biblia completa** (172 entradas, ~6 MB) |
| **Caché en tiempo de ejecución** | Subconjuntos griego y cirílico de las fuentes; corpus adicional |
| **IndexedDB** | Corpus sembrado, texto bíblico indexado y **todos los datos del usuario** |

Tras el primer arranque, ATHOS indexa la Escritura en segundo plano (31 084
versículos) para que la búsqueda global funcione sin red. El progreso se ve en
**Configuración → Datos**.

Una actualización **nunca se aplica sola**: se avisa y el usuario decide. Los
datos de IndexedDB no se tocan al actualizar.

### Base de datos

Dexie sobre IndexedDB, esquema versionado. Tablas de contenido —`prayers`,
`bible_books`, `bible_chapters`, `bible_verses`, `psalms`, `saints`, `feasts`,
`liturgical_readings`, `liturgies`, `akathists`, `canons`, `church_fathers`,
`monasteries`, `athos_articles`, `icons`— y tablas del usuario —`daily_rules`,
`rule_items`, `rule_completions`, `habits`, `habit_entries`, `journal_entries`,
`favorites`, `bookmarks`, `notes`, `history`, `jesus_prayer_sessions`,
`reading_progress`, `settings`.

La siembra del contenido es idempotente y **sólo escribe en las tablas de
contenido**: los datos del usuario nunca se sobrescriben.

---

## Privacidad y seguridad

Todo permanece en el dispositivo. La única petición de red que hace ATHOS es la
descarga inicial de sus propios recursos.

El diario puede protegerse con PIN y cifrarse. Lo que eso significa, exactamente:

- El PIN **no se guarda**: se almacena un resumen SHA-256 con sal.
- Con el cifrado activo, el cuerpo de las entradas se cifra con **AES-GCM** y una
  clave derivada del PIN mediante **PBKDF2-SHA256, 310 000 iteraciones**.
- La clave existe **sólo en memoria** mientras el diario está desbloqueado.
- **Si olvidas el PIN, las entradas cifradas se pierden.** No hay recuperación.
- Los títulos, fechas y etiquetas **no** se cifran: hacen falta para ordenar y buscar.
- Un PIN corto no resiste a alguien con acceso al dispositivo y tiempo. Protege
  de una mirada casual, no de un ataque decidido.

El desbloqueo biométrico **está detectado pero no implementado**: la pantalla de
Seguridad lo indica en lugar de fingir que funciona.

---

## Accesibilidad

Tamaño de texto y altura de línea configurables, ancho de lectura ajustable,
modo de alto contraste, tema claro/oscuro/sistema, navegación completa por
teclado, `focus-visible` en todo elemento interactivo, etiquetas ARIA, enlace
para saltar al contenido y respeto por `prefers-reduced-motion`.

Los controles miden al menos 44 px en pantallas táctiles (`pointer: coarse`).
Los enlaces incrustados en el texto corrido quedan exentos, como permite el
criterio WCAG 2.5.8.

Atajos de teclado:

| Atajo | Acción |
| --- | --- |
| `Ctrl/⌘ + K` o `/` | Búsqueda global |
| `Esc` | Cerrar diálogo o salir del modo oración |
| `Ctrl/⌘ + B` | Favoritos |
| `g` | Inicio |
| `p` | Modo oración |

---

## Contenido: qué hay y qué falta

ATHOS distingue tres estados en cada texto: **completo**, **parcial** y
**pendiente de incorporar**. El estado del corpus entero está en
**Configuración → Fuentes**.

| Sección | Estado |
| --- | --- |
| Biblia | Completa (RV1909). Los deuterocanónicos figuran con ficha; su texto es pendiente |
| Salterio | Completo, 150 salmos. El Salmo 151 es pendiente |
| Oraciones | 45 oraciones; 4 fichas pendientes (Gran Canon, canon de Comunión, Akáthistos) |
| Santos | 60 conmemoraciones. El Menaion completo es pendiente |
| Leccionario | Ciclo móvil y grandes fiestas. El ciclo diario completo es pendiente |
| Oficios | Estructura completa y partes cantadas; oraciones sacerdotales pendientes |
| Akathistos y cánones | Fichas completas; la mayoría de los textos, pendientes |
| Padres | 12 autores con biografía y obras; pasajes breves verificados |
| Monte Athos | Los 20 monasterios y 6 artículos, completos |
| Iconografía | 12 fichas completas; **sin imágenes**, a la espera de licencias comprobadas |

Esto no es un descuido: es la regla del proyecto. **Antes que un texto
aproximado, una ficha honesta.**

### Cómo aportar contenido

Las contribuciones más valiosas son textos litúrgicos españoles con licencia
comprobada. Cada aportación debe traer su procedencia completa: título, autor,
traductor, fuente, tradición, idioma, licencia y derechos. Ver
[CONTRIBUTING.md](CONTRIBUTING.md).

---

## Licencias

- **Código de ATHOS**: [AGPL-3.0-or-later](LICENSE).
- **Contenido religioso**: cada texto conserva su propia licencia, declarada en
  su ficha y visible en la aplicación. Ver [NOTICE.md](NOTICE.md).
- **Reina-Valera 1909**: dominio público.
- **EB Garamond** e **Inter**: SIL Open Font License 1.1.

La licencia del código **no** cubre el contenido religioso de terceros.

---

## Pendiente

Lo que está diseñado pero aún no implementado, dicho sin rodeos:

- **Sincronización** (WebDAV / Nextcloud / servidor propio). La arquitectura la
  contempla —exportación e importación versionadas, datos del usuario separados—
  pero no hay código de sincronización.
- **Desbloqueo biométrico** (WebAuthn). Se detecta la capacidad; falta el flujo.
- **Traducciones**: la internacionalización está montada y ningún texto de
  interfaz está escrito en un componente, pero sólo existe el archivo español.
- **Notificaciones**: se programan en el dispositivo y sólo suenan mientras la
  aplicación siga viva. Sin servidor no hay push, y así se dice en la interfaz.
- **Capturas de pantalla** en el manifest, para la interfaz de instalación
  enriquecida de Chrome.

## Comprobado

Verificado en Brave 151 (Chromium) sobre el servidor de `run.sh`:

- Service Worker registrado y activo, con **172 de 172 entradas recuperables**
  del precaché, incluidos los 67 archivos del texto bíblico y la tipografía.
- Manifest leído por el navegador **sin errores de parseo**.
- Con la red del navegador **completamente cortada**: la aplicación recarga,
  pinta y permite navegar a rutas profundas como `/leer/salterio/50`, que
  muestra el salmo entero.
- IndexedDB: 43 oraciones, 151 salmos, 60 santos y 31 084 versículos.

Y en emulación de teléfono (360×740, 375×667, 393×852 y apaisado 740×360, con
puntero táctil), recorriendo las 25 pantallas de la aplicación: sin desbordes
horizontales, sin campos por debajo de 16 px y sin controles por debajo de
40 px.

También verificado publicada en una subcarpeta (`/athos/`): manifest sin
errores, Service Worker con el ámbito correcto y enlaces profundos
funcionando.

---

<div align="center">

*Δόξα τῷ Θεῷ πάντων ἕνεκεν*
**Gloria a Dios por todas las cosas**

</div>
