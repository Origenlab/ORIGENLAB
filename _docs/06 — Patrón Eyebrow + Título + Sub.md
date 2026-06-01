# Patrón: Eyebrow + Título + Sub

> Anatomía del encabezado de cualquier sección. Siempre en este orden, nunca al revés.

---

## Anatomía Visual

```
┌─────────────────────────────┐
│  [ ETIQUETA ]               │  ← ol-eyebrow (pill dorado)
│                             │
│  Título principal           │  ← ol-section-title (grande, blanco)
│  en una o dos líneas        │
│                             │
│  Subtítulo corto que        │  ← ol-section-sub (muted, 1.0625rem)
│  amplía el título.          │
└─────────────────────────────┘
```

---

## Reglas de Uso

### `ol-eyebrow`
- Siempre `<span>`, nunca `<p>` ni `<div>`
- 1–2 palabras máximo
- El CSS aplica `text-transform: uppercase` — no hace falta escribirlo en mayúsculas
- Ejemplo: `Servicios`, `Proceso`, `Diferencia`, `Testimonios`, `Preguntas Frecuentes`

### `ol-section-title`
- Siempre `<h2>` (excepto en hero donde es `<h1>`)
- 4–8 palabras. Usa `<br>` para controlar el salto de línea en diseño
- Letter-spacing: `-0.025em` — comprimido, da sensación de peso
- Font-weight: 800

### `ol-section-sub`
- Siempre `<p>`
- 1–2 líneas máximo en el `ol-sh-left`
- Color `rgba(240,240,245,0.5)` — visible pero no protagonista

---

## En contexto `ol-sh` (2 columnas)

```html
<div class="ol-sh-left">
  <span class="ol-eyebrow">Etiqueta</span>
  <h2 class="ol-section-title">Título principal</h2>
  <p class="ol-section-sub">Subtítulo corto.</p>
</div>
<div class="ol-sh-right">
  <p class="ol-sh-copy">Párrafo editorial más largo, opacidad 0.48.</p>
  <p class="ol-sh-copy">Segundo párrafo.</p>
</div>
```

---

## Espaciado interno

```
ol-eyebrow      → margin-bottom: 1.5rem
ol-section-title → margin: 0 0 1rem
ol-section-sub  → margin: 0
```

El `ol-sh` entero tiene `margin-bottom: 4rem` para separarlo del grid de contenido.

---

## Qué NO hacer

- ❌ Usar `<p>` para el eyebrow
- ❌ Usar `<h3>` para el section-title en secciones principales
- ❌ Escribir el eyebrow en minúsculas — el CSS ya lo convierte
- ❌ Poner el subtítulo antes del título
- ❌ Usar más de 2 párrafos en `ol-sh-right` (el diseño se rompe)
- ❌ Agregar el patrón `ol-sh` en secciones centradas como CTA Final
