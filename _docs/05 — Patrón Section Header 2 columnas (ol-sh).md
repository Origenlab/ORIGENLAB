# Patrón: Section Header 2 Columnas (`ol-sh`)

> El complemento de título estándar del sitio. Se usa en todas las secciones principales.

---

## Estructura HTML

```html
<div class="ol-sh">
  <div class="ol-sh-left">
    <span class="ol-eyebrow">Etiqueta de sección</span>
    <h2 class="ol-section-title">Título principal<br>en dos líneas</h2>
    <p class="ol-section-sub">Subtítulo corto, 1–2 líneas, orientado al beneficio.</p>
  </div>
  <div class="ol-sh-right">
    <p class="ol-sh-copy">Párrafo 1 — contexto más amplio, 2–4 líneas.</p>
    <p class="ol-sh-copy">Párrafo 2 — detalle adicional o diferenciador.</p>
  </div>
</div>
```

---

## CSS (en `premium-dark.css`)

```css
.ol-sh {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  margin-bottom: 4rem;
}
.ol-sh-right {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.25rem;
}
.ol-sh-copy {
  font-size: 15px;
  color: rgba(240,240,245,0.48);
  line-height: 1.8;
  margin: 0;
}

@media (max-width: 860px) {
  .ol-sh { grid-template-columns: 1fr; gap: 2rem; }
}
```

---

## Clases de Título Compartidas

```css
.ol-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 11px;
  font-weight: 600;
  color: #C9A84C;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1.5rem;
}

.ol-section-title {
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: #F0F0F5;
  letter-spacing: -0.025em;
  line-height: 1.12;
  margin: 0 0 1rem;
}

.ol-section-sub {
  font-size: 1.0625rem;
  color: rgba(240,240,245,0.5);
  line-height: 1.75;
  margin: 0;
}
```

---

## Usos en el sitio

| Sección | Eyebrow | Título |
|---------|---------|--------|
| Servicios | Servicios | Todo lo que tu negocio necesita en línea. |
| Diferencia | Diferencia | ¿Por qué OrigenLab? |
| Proceso | Proceso | Cómo trabajamos |
| Testimonios | Testimonios | Lo que dicen nuestros clientes. |
| FAQ | Preguntas Frecuentes | Todo lo que necesitas saber antes de empezar |

---

## Reglas de Copywriting

- **Eyebrow:** 1–2 palabras, sustantivo o tema de sección. Todo en mayúsculas (el CSS lo convierte).
- **Título (ol-section-title):** 4–8 palabras. Fraseado orientado al beneficio. `<br>` opcional para control de salto de línea.
- **Subtítulo (ol-section-sub):** 1–2 líneas. Amplía el título sin repetirlo.
- **Párrafos derechos (ol-sh-copy):** 2 párrafos, 2–4 líneas cada uno. Tono más editorial y profundo. Color intencionalmente apagado (`0.48` opacidad) para no competir con el título.

---

## Notas de Diseño

- El `ol-sh` va siempre **dentro del `-inner`** de cada sección, antes del grid de contenido.
- `margin-bottom: 4rem` separa el encabezado del grid de tarjetas.
- En móvil (`< 860px`) colapsa a 1 columna: primero izquierda, luego derecha.
- No usar `ol-sh` en secciones con encabezado centrado (como CTA Final).
