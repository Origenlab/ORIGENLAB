# Page Hero de Subpágina (`ol-page-hero`)

> Hero de entrada para páginas L2+. Reemplaza el hero del index. Layout 2 columnas igual que `ol-sh`. Fondo `#08080E`.

---

## Dónde se usa

| Página | Estado |
|--------|--------|
| `servicios/index.html` | ✅ Implementado |
| `nosotros/index.html` | Pendiente |
| `portafolio/index.html` | Pendiente |
| `contacto/index.html` | Pendiente |
| `blog/index.html` | Pendiente |

---

## Estructura HTML

```html
<section class="ol-page-hero">
  <div class="ol-page-hero-inner">
    <div class="ol-page-hero-grid">

      <!-- Columna izquierda -->
      <div class="ol-page-hero-left">
        <span class="ol-eyebrow">Lo que hacemos</span>
        <h1 class="ol-page-hero-title">Soluciones web que<br>generan resultados.</h1>
        <p class="ol-page-hero-sub">Texto descriptivo de la página. Max ~2 líneas cortas.</p>
      </div>

      <!-- Columna derecha -->
      <div class="ol-page-hero-right">
        <p class="ol-page-hero-copy">Párrafo editorial 1 — contexto ampliado.</p>
        <p class="ol-page-hero-copy">Párrafo editorial 2 — beneficio o diferencial.</p>
      </div>

    </div>
  </div>
</section>
```

---

## CSS

```css
.ol-page-hero {
  background: #08080E;
  padding: 6rem 0 5rem;
  position: relative;
  overflow: hidden;
}
/* Gradiente dorado izquierda */
.ol-page-hero::before {
  content: '';
  position: absolute;
  top: -20%; left: -10%;
  width: 60%; height: 120%;
  background: radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 65%);
  pointer-events: none;
}
/* Línea dorada inferior */
.ol-page-hero::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent);
}
.ol-page-hero-inner {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Grid 2 columnas — mismo gap que ol-sh */
.ol-page-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 860px) {
  .ol-page-hero-grid { grid-template-columns: 1fr; gap: 2rem; }
}

/* Título — H1 de la subpágina */
.ol-page-hero-title {
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 900;
  color: #F0F0F5;
  letter-spacing: -0.035em;
  line-height: 1.04;
  margin: 0 0 1.5rem;
}

/* Subtítulo izquierda */
.ol-page-hero-sub {
  font-size: 1.0625rem;
  color: rgba(240,240,245,0.5);
  line-height: 1.75;
  margin: 0;
}

/* Columna derecha */
.ol-page-hero-right {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.25rem;
}

/* Párrafos editoriales */
.ol-page-hero-copy {
  font-size: 15px;
  color: rgba(240,240,245,0.48);
  line-height: 1.8;
  margin: 0;
}
```

---

## Diferencias vs. Hero del Index

| Aspecto | Hero (L1) | Page Hero (L2+) |
|---------|-----------|-----------------|
| Elemento | `<section class="hero">` con `[data-astro-cid]` | `<section class="ol-page-hero">` |
| Altura | `min-height: 88vh` | `padding: 6rem 0 5rem` (sin vh) |
| Título | `<h1 class="hero__title">` | `<h1 class="ol-page-hero-title">` |
| CTAs | `btn btn-primary` + `btn btn-outline` | Sin CTAs — son páginas de contenido |
| Párrafos de apoyo | `hero__p1` / `hero__p2` con border-left dorado | `ol-page-hero-copy` sin borde |
| Clase CSS | Heredada del framework Astro | 100% ol-* |

---

## Notas

- El `ol-eyebrow` del page hero es el componente global estándar (pill dorado).
- El grid usa `gap: 4rem` — ligeramente más apretado que el `ol-sh` (`gap: 4–5rem` según sección).
- Siempre va **justo después del header/mobile-panel** y **antes del primer quicknav**.
- El CSS se define en el `<style>` inline de la propia subpágina, no en `premium-dark.css`.
