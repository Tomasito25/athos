# Antes de anunciar ATHOS

Lo que queda no es código: son decisiones y comprobaciones que tiene que hacer
una persona. Este documento las ordena, dice qué está ya preparado en la
aplicación para cada una y qué falta.

---

## 1. La dirección definitiva

**Decidir antes de anunciarla.** Lo de cada persona —reglas, favoritos, avance
de lectura, sesiones de oración— se guarda en su navegador ligado a la
dirección desde la que abre ATHOS. Si un día se pasa de
`tomasito25.github.io/athos` a un dominio propio, quien ya la usaba abrirá la
nueva dirección vacía: tendrá que exportar en la vieja e importar en la nueva
(*Configuración → Datos*). Con pocos usuarios es una molestia; con muchos, una
pérdida segura de datos para quien no lea el aviso.

**La Play Store.** Para publicar ATHOS como aplicación de Android (una
«Trusted Web Activity») hay que servir `/.well-known/assetlinks.json` en la
raíz del dominio. En `tomasito25.github.io/athos` la raíz es
`tomasito25.github.io`, que sólo se controla publicando además el repositorio
`tomasito25/tomasito25.github.io`. Con un dominio propio (o un subdominio,
`app.ejemplo.org`) es directo.

**Qué está preparado.** La publicación lee la dirección de GitHub
(`actions/configure-pages`): si se configura un dominio propio en
*Settings → Pages → Custom domain*, la siguiente compilación usa la nueva
dirección para la vista previa de los enlaces y para la raíz de la aplicación
sin tocar nada más.

**Qué falta.** Elegir el dominio, comprarlo y configurarlo en GitHub Pages
*antes* de anunciar ATHOS.

## 2. De dónde sale cada texto español

**Es el mayor riesgo legal.** `docs/PROCEDENCIA.md` lista los 196 textos
litúrgicos con la clase de su versión española, tal como la declara su ficha:

| Clase | Qué hay que hacer |
| --- | --- |
| **Tradicional sin verificar** (37) | Averiguar si es traducción propia o se tomó de un libro parroquial. Si es lo segundo y no hay permiso, retirarlo o volver a traducirlo del original. |
| Traducción de ATHOS (102) | Comprobar que la traducción está bien hecha, a ser posible cotejándola con el original. |
| Redactada para ATHOS (36) | Revisión teológica (punto 3). |
| Dominio público (21) | Nada, salvo confirmar la fuente. |

Lo revisado se anota en `docs/procedencia-revisada.json` y la tabla se
regenera con `npm run procedencia`, sin perder lo anotado.

## 3. Revisión de un sacerdote o un teólogo

Y, si se busca llegar a parroquias, una bendición. Lo que ha redactado ATHOS
es lo que más la necesita:

- **Catecismo**: 108 preguntas (`src/content/catechism*.ts`).
- **Cursos de estudio**: 11 itinerarios y 17 obras comentadas
  (`src/content/study*.ts`).
- **Vidas de santos**: 541 reseñas (`src/content/vidas/`).
- **Historia de la Iglesia**: 8 épocas y 13 concilios
  (`src/content/history*.ts`), con los conflictos actuales.
- **Monte Athos**: 12 artículos y 20 monasterios (`src/content/athos*.ts`).
- **Reglas de ayuno** (`src/lib/calendar/fasting.ts`): la aplicación ya avisa
  de que pueden variar según la tradición y que se consulte al sacerdote, pero
  las reglas mismas tienen que estar bien.
- **Las 102 traducciones** del punto anterior.

## 4. Privacidad, contacto y errores

**Preparado.** La política de privacidad está en la aplicación
(*Configuración → Acerca de → Política de privacidad*) y en una página fija
que se lee sin la aplicación: `https://tomasito25.github.io/athos/privacidad.html`.
Es la dirección que pide la Play Store. «Acerca de» enlaza al repositorio, a
los errores abiertos y a un formulario para informar de uno, con la versión ya
escrita.

**Falta.** Un correo de contacto. No se escribe en el código, porque quedaría
publicado para siempre en el historial: se pone como variable del repositorio
`ATHOS_CONTACTO` (*Settings → Secrets and variables → Actions → Variables*), y
la siguiente publicación lo enseña en «Acerca de» y en la política.

## 5. Probar en teléfonos de verdad

Lo probado hasta ahora es Chrome sin ventana. Hace falta, como mínimo:

- **iPhone con Safari**: añadir a la pantalla de inicio desde una página
  interior (el icono y la pantalla de arranque deben salir), abrirla sin
  conexión, exportar e importar una copia, importar el calendario `.ics`.
- **Un Android modesto con Chrome**: instalar, tiempo de arranque, los
  recordatorios con la aplicación cerrada, importar el `.ics`.
- **Firefox** (escritorio y Android): que funcione en pestaña, sin instalar.
- **En las tres**: compartir un enlace por WhatsApp o Telegram y ver que sale
  la imagen; tener dos ventanas abiertas, actualizar en una y seguir usando la
  otra.

`node scripts/pwa-audit.mjs` comprueba con un navegador de verdad la
instalación y el funcionamiento sin conexión, pero no sustituye a un teléfono.

## 6. Recordatorios

**Hecho en la aplicación.** *Configuración → Notificaciones* dice arriba, sin
rodeos, que con ATHOS cerrada los avisos no son fiables (en Android dependen
de Chrome; en iPhone no llegan nunca), y ofrece pasarlos al calendario del
teléfono en un archivo `.ics`, que avisa siempre. Las fiestas y los ayunos del
año se exportan igual.

**Queda como opción.** Empaquetar ATHOS como aplicación nativa (Play Store, o
App Store con un envoltorio) daría notificaciones de verdad; depende del
punto 1.

## 7. Copias de seguridad

**Hecho en la aplicación.** Inicio recuerda una vez al mes hacer una copia,
cuando hay algo que perder; se hace con un toque o se aplaza un mes. En iPhone
el aviso explica que Safari puede borrar los datos de una web que no se abre
en semanas.
