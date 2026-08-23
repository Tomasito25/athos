# Contribuir a ATHOS

Gracias por querer ayudar. Este documento explica cómo.

## La regla que gobierna el proyecto

> **No se inventan textos religiosos.**

Si un texto litúrgico no está disponible con una licencia compatible, se
conserva su ficha y el cuerpo se marca como *pendiente de incorporar*. Una ficha
honesta vale más que una aproximación con apariencia de autenticidad. Esta regla
no admite excepciones, ni siquiera «provisionales».

Lo mismo vale para las capacidades técnicas: si el navegador no puede hacer algo
—mantener la pantalla encendida, vibrar, notificar—, la interfaz lo dice en lugar
de simular que funciona.

---

## Aportar contenido

Es la contribución más valiosa. Cada texto necesita **procedencia completa**:

```ts
meta: {
  title: 'Título de la obra o del libro litúrgico',
  author: 'Autor del original, si se conoce',
  translator: 'Quién hizo la versión española',
  source: 'De dónde procede exactamente este texto',
  tradition: 'Rito bizantino, tradición rusa, griega…',
  language: 'es',
  license: 'public-domain' | 'traditional' | 'cc-by-4.0' | 'cc-by-sa-4.0' | 'cc0-1.0',
  copyright: 'Situación de los derechos, en una frase',
  dateAdded: 'AAAA-MM-DD',
  notes: 'Lo que un lector deba saber sobre esta versión',
}
```

Y un `status`:

- `complete` — el texto está íntegro y verificado.
- `partial` — hay una parte incorporada; el resto sigue pendiente.
- `pending` — sólo existe la ficha.

### Qué se acepta

- Textos de **dominio público** (originales antiguos, traducciones anteriores a 1929).
- Textos bajo **CC0, CC BY o CC BY-SA**.
- Textos litúrgicos **tradicionales** de uso corriente, indicando su procedencia.
- Traducciones **donadas por su autor**, con constancia escrita.

### Qué no se acepta

- Traducciones modernas con derechos vigentes, sin autorización.
- Textos «reconstruidos», «adaptados» o «basados en» sin decirlo con claridad.
- Imágenes de iconos sin licencia comprobada.
- Contenido cuya procedencia no se pueda documentar.

### Distinguir rúbrica de oración

Los bloques de texto llevan tipo. Respétalo: la rúbrica es indicación, no
oración, y se pinta distinto.

```ts
{ kind: 'rubric',  content: 'Con una gran postración tras cada petición:' }
{ kind: 'text',    content: 'Señor y Soberano de mi vida…' }
{ kind: 'refrain', content: '¡Salve, Esposa siempre Virgen!' }
{ kind: 'heading', content: 'Trisagio' }
{ kind: 'verse',   content: 'Ten piedad de mí…', ref: '1' }
{ kind: 'pending', content: 'Contenido pendiente de incorporar.' }
```

---

## Aportar traducciones de la interfaz

La internacionalización ya está montada y **ningún texto de interfaz está escrito
en un componente**. Para añadir un idioma:

1. Copia `src/locales/es.ts` a `src/locales/<código>.ts` y traduce los valores.
2. Regístralo en `src/lib/i18n.ts` (`resources` y `SUPPORTED_LANGUAGES`).
3. Marca `ready: true` sólo cuando la traducción esté **completa**.

Están previstos: español, inglés, griego, ruso, rumano, serbio, georgiano y
árabe. Para el árabe, comprueba también la disposición de derecha a izquierda:
`RTL_LANGUAGES` ya la contempla.

---

## Aportar código

```bash
npm install
npm run dev
npm run check   # lint + typecheck + test + build
```

`npm run check` debe pasar antes de abrir un *pull request*.

### Criterios

- **TypeScript estricto.** Nada de `any` fuera de las pruebas.
- **Comentarios en español**, y sólo donde expliquen un *porqué* que el código no
  puede expresar. No narres lo que ya se lee.
- **Ningún texto visible dentro de un componente**: todo pasa por `src/locales`.
- **Detección por capacidades**, nunca por navegador.
- **Los datos del usuario son sagrados.** Ninguna migración, siembra o
  actualización puede sobrescribirlos. Hay pruebas que lo verifican.

### El calendario litúrgico

`src/lib/calendar/` es la parte más delicada del proyecto. Si la tocas:

- Añade pruebas con **fechas verificables** contra calendarios publicados.
- No calcules fechas móviles sumando días a las del año anterior.
- Convierte entre calendarios pasando por el **día juliano**, nunca sumando trece
  días: ese desfase sólo vale para 1900-2099.
- Recuerda que el ciclo móvil tiene **dos anclas**: la Pascua anterior y la
  siguiente.

### Estructura

```
src/content/    corpus religioso, separado del código
src/db/         IndexedDB: esquema, siembra, repositorios
src/lib/        calendario, cifrado, texto, formato, PWA
src/features/   una carpeta por sección de la aplicación
src/components/ armazón e interfaz reutilizable
```

---

## Incidencias

Al abrir una incidencia sobre el **calendario o el ayuno**, incluye:

- la fecha exacta y el estilo de calendario (nuevo o juliano),
- lo que ATHOS muestra,
- lo que debería mostrar,
- **la fuente** que lo respalda.

Sobre **derechos de autor**: ver la sección final de [NOTICE.md](NOTICE.md). Los
textos reclamados se retiran primero y se discuten después.

---

## Código de conducta

Trata a los demás como quisieras ser tratado. Las discusiones sobre diferencias
entre tradiciones y jurisdicciones son bienvenidas cuando aportan precisión al
proyecto; las disputas confesionales, no.

ATHOS sirve a quien reza. Que eso guíe también cómo trabajamos.
