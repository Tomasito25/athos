# Registro de cambios

Este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [1.1.0]

### Añadido

- **Lanzador de escritorio**: `run.sh` e `install.sh` con icono en el Escritorio
  y entrada en el menú; `server.py` sirve la aplicación por HTTP, que es lo que
  necesita una PWA. Adaptado a KDE Plasma y a GNOME.
- **Acceso desde el móvil**: `run.sh --movil` muestra la dirección en la red
  local con código QR, y `run.sh --tunel` abre un túnel HTTPS desde el que el
  teléfono sí puede instalar ATHOS.
- **Publicación**: `deploy.sh` prepara la carpeta para cualquier alojamiento
  estático con HTTPS y publica en GitHub Pages. ATHOS puede colgar de una
  subcarpeta mediante `ATHOS_BASE`.
- **Pantallas de arranque de iOS**: diez tamaños enlazados con su media query.

### Corregido

- Los campos de formulario medían 15 px, y iOS ampliaba la página al enfocarlos.
- Controles pequeños con puntero táctil: botones, segmentados, casillas de la
  regla de oración (24 px de área) y celdas de hábitos (14 px).
- El selector de calendario desbordaba la pantalla a 360 px de ancho.
- `run.sh --stop` no detenía el servidor: `setsid cmd &` devuelve el PID de
  setsid, no el del proceso servidor.
- La variable `ATHOS_BROWSER` se ignoraba si el navegador no estaba en la lista
  de familias conocidas.
- Dos elementos de navegación compartían nombre accesible.

## [1.0.0]

Primera versión.

### Añadido

- **Armazón** — PWA instalable con navegación inferior en móvil y barra lateral
  en escritorio, modo oración sin distracciones y soporte de `window-controls-overlay`.
- **Oraciones** — 45 textos en 18 categorías, con favoritos, notas, historial y
  tamaño de letra configurable.
- **Regla de oración** — reglas propias por ámbito (diario, domingo, fiesta,
  ayuno), pasos reordenables con enlaces a textos y objetivos, progreso por fecha
  y racha.
- **Oración de Jesús y chotki** — contador con objetivos de 33, 50, 100, 300 o
  personalizado, temporizador, vibración, sonido, bloqueo de pantalla, historial
  y estadísticas.
- **Biblia** — Reina-Valera 1909 completa (66 libros, 31 084 versículos), canon
  ortodoxo con los deuterocanónicos fichados, indexación en segundo plano para
  búsqueda sin conexión, marcadores y notas.
- **Salterio** — 150 salmos en numeración de los Setenta, con correspondencia
  hebrea explícita, 20 kathismata con sus estasis y kathisma sugerido del día.
- **Calendario litúrgico** — paschalion juliano convertido por día juliano,
  ciclo móvil completo, ciclo fijo, tono del Octoecos, calendario nuevo o
  juliano a elección.
- **Ayuno** — motor de reglas que resuelve cualquier día del año con seis grados
  y el detalle de lo permitido.
- **Santos** — 60 conmemoraciones con biografía, categorías y fichas de himnos.
- **Biblioteca** — Divina Liturgia de san Juan Crisóstomo y otros nueve oficios,
  akathistos, cánones, 12 Padres de la Iglesia, los 20 monasterios del Monte
  Athos con mapa esquemático, y 12 fichas de iconografía.
- **Diario espiritual** — privado, con bloqueo por PIN y cifrado AES-GCM opcional.
- **Hábitos** — 11 hábitos predefinidos y propios, con vistas de semana, mes y año.
- **Búsqueda global** sin conexión, agrupada por categoría.
- **Datos** — exportación a JSON y Markdown, importación validada con modo
  combinar o reemplazar, almacenamiento persistente y borrado completo.
- **Accesibilidad** — alto contraste, tipografía y ancho de lectura ajustables,
  navegación por teclado con atajos, etiquetas ARIA.
- **Internacionalización** preparada para ocho idiomas; español completo.
- 169 pruebas automatizadas.

### Conocido

- Sin sincronización entre dispositivos.
- Desbloqueo biométrico detectado pero no implementado.
- Los recordatorios sólo suenan mientras la aplicación sigue viva.
- Parte del corpus figura como *pendiente de incorporar*; ver *Configuración → Fuentes*.
