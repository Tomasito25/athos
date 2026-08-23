# Procedencia del contenido de ATHOS

El **código** de ATHOS se publica bajo AGPL-3.0-or-later. Ese archivo de licencia
**no cubre el contenido religioso**, que conserva su propia procedencia. Este
documento la resume; la aplicación la muestra además al pie de cada texto y de
forma agregada en *Configuración → Fuentes*.

## Principio del proyecto

> ATHOS no inventa textos litúrgicos.

Cuando un texto no está disponible con una licencia compatible, se conserva su
ficha completa —título, autor, ocasión, estructura— y el cuerpo se marca como
*Contenido pendiente de incorporar*. Nunca se redacta una aproximación y se
presenta como texto litúrgico auténtico.

Los textos redactados expresamente para ATHOS (reseñas históricas, guías de
examen de conciencia, artículos sobre el Monte Athos) se identifican como tales
en su ficha, con licencia CC BY-SA 4.0.

---

## Texto bíblico

**Reina-Valera 1909** — dominio público.

Publicada en 1909; versión de Casiodoro de Reina revisada por Cipriano de Valera.
Texto digitalizado en formato USFX, procedente del proyecto
[open-bibles](https://github.com/seven1m/open-bibles).

Sigue el canon hebreo corto y la numeración hebrea de los Salmos. ATHOS muestra
además la numeración de los Setenta, que es la del culto ortodoxo, mediante una
tabla de correspondencia explícita (`src/content/psalter.ts`). El texto no se
altera en ningún caso.

Los libros deuterocanónicos de la Septuaginta figuran en el canon con su ficha,
pero su texto está **pendiente de incorporar**: la RV1909 no los contiene.

## Oraciones y textos litúrgicos

Oraciones litúrgicas tradicionales, de dominio público en su original griego o
eslavo, en la versión española de uso corriente en las parroquias ortodoxas
hispanohablantes.

Si el titular de los derechos de una versión española concreta lo comunica, esa
versión será sustituida. Abre una incidencia si detectas un texto protegido.

## Himnografía

Akathistos y cánones del Triodion, el Pentecostario y el Menaion. Se incorporan
el kontakion inicial del Akáthistos a la Theotokos, los irmos verificados y los
estribillos; el resto figura con ficha y estado *pendiente*.

## Padres de la Iglesia

Las obras patrísticas son de dominio público en su lengua original (griego,
siríaco, latín). Muchas traducciones españolas modernas **no** lo son.

ATHOS incorpora únicamente pasajes breves de uso común y verificables —entre
ellos la Homilía catequética pascual de san Juan Crisóstomo, que se lee en todas
las iglesias ortodoxas en la noche de Pascua— y mantiene la ficha del resto.

## Santoral, fiestas y calendario

Los nombres, rangos y fechas de las fiestas son datos del calendario litúrgico
de uso común a las jurisdicciones bizantinas.

Las **biografías** de los santos son reseñas históricas redactadas para ATHOS a
partir de fuentes hagiográficas comunes, bajo CC BY-SA 4.0.

Los **troparios y kontakia** son textos litúrgicos: sólo se incluyen cuando se
dispone de una versión española de uso tradicional. En caso contrario la ficha
queda marcada como pendiente.

## Reglas de ayuno

Siguen la lectura habitual del Typikon, la que recogen los calendarios de la
mayoría de las jurisdicciones. La aplicación muestra siempre, junto a ellas:

> Las normas de ayuno pueden variar según la tradición, jurisdicción y
> circunstancias personales. Para cuestiones particulares, consulta con tu
> sacerdote.

ATHOS no presenta estas reglas como una obligación canónica individual.

## Monte Athos

Reseñas redactadas para ATHOS a partir de la historia documentada de la
Comunidad Monástica, bajo CC BY-SA 4.0.

El mapa de la península es **esquemático**: sitúa cada monasterio en su costa y a
lo largo de la península para orientarse, pero **no son coordenadas
topográficas**, y así se indica al pie del mapa.

## Iconografía

Las fichas describen cada icono, su historia y su significado, bajo CC BY-SA 4.0.

**No se incluye ninguna imagen.** Mientras no se disponga de reproducciones con
licencia comprobada, se muestra una placa ornamental con el nombre del icono.
ATHOS prefiere una placa vacía a una imagen ajena usada sin derecho.

---

## Tipografía

| Fuente | Licencia | Origen |
| --- | --- | --- |
| **EB Garamond** | SIL Open Font License 1.1 | [octaviopardo/EBGaramond12](https://github.com/octaviopardo/EBGaramond12) |
| **Inter** | SIL Open Font License 1.1 | [rsms/inter](https://github.com/rsms/inter) |

Ambas se sirven desde el propio dominio, no desde un CDN: ATHOS debe funcionar
sin conexión y sin consultar servidores ajenos.

## Dependencias

React, React Router, Dexie, Zustand, i18next, Vite, Workbox y las demás
dependencias conservan sus respectivas licencias, todas ellas permisivas (MIT o
Apache-2.0). Consulta `package.json` y `npm ls` para el detalle.

---

## Reclamaciones de derechos

Si eres titular de los derechos de algún texto incorporado y consideras que su
uso aquí no es legítimo, abre una incidencia en el repositorio. El texto se
retirará y su ficha volverá al estado *pendiente de incorporar* mientras se
resuelve.
