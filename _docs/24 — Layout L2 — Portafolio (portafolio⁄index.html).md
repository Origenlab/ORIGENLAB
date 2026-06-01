# Layout L2 — Portafolio (`portafolio/index.html`)

> Segunda página de nivel 2 del sitio. Muestra el trabajo realizado por OrigenLab. Homologada al sistema `ol-*`. Referencia: `servicios/index.html`.

---

## Flujo completo de la página

```
┌─────────────────────────────────┐
│  ol-topbar                      │  ← Idéntico a servicios/index.html
├─────────────────────────────────┤
│  ol-header                      │  ← "Portafolio" = active
├─────────────────────────────────┤
│  ol-mobile-overlay              │  ← Idéntico
│  ol-mobile-panel                │  ← "Portafolio" = active
├─────────────────────────────────┤
│  <main>                         │
│  ├── ol-page-hero               │  ← align-items: center (vs. start en servicios)
│  ├── ol-quicknav (con íconos)   │  ← Igual al de servicios (top)
│  ├── ol-portfolio-section       │  ← EXCLUSIVO: ol-sh + ol-proj-grid (5 cards + 1 CTA)
│  ├── ol-showcase (variante prt) │  ← 3 bloques con imágenes reales + alternancia reverse
│  ├── ol-faq-section             │  ← FAQ portafolio (8 preguntas, IDs prefijo "p")
│  └── ol-quicknav (sin íconos)   │  ← Bottom nav
├─────────────────────────────────┤
│  ol-footer                      │  ← Idéntico a servicios/index.html
├─────────────────────────────────┤
│  WA bubble                      │
│  JS (header + mobile + faq)     │
└─────────────────────────────────┘
```

---

## Secciones y su documentación

| Sección | Clase | Doc | Fondo |
|---------|-------|-----|-------|
| Page Hero | `ol-page-hero` | [[21 — Page Hero de Subpágina (ol-page-hero)]] | `#08080E` |
| Quick Nav (top) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |
| Proyectos (grid de cards) | `ol-portfolio-section` | [[25 — Tarjeta de Proyecto (ol-proj-card)]] | `#04040A` |
| Showcase proyectos | `ol-showcase` | [[22 — Showcase de Servicios (ol-showcase)]] + variante portafolio ↓ | `#08080E` |
| FAQ + Form | `ol-faq-section` | [[14 — FAQ]] | `#0D0D16` |
| Quick Nav (bottom) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |

---

## Alternancia de fondos

| Sección | Fondo |
|---------|-------|
| Page Hero | `#08080E` |
| Quick Nav top | `#0C0C18` |
| Portfolio (cards) | `#04040A` ← más oscuro |
| Showcase | `#08080E` |
| FAQ | `#0D0D16` |
| Quick Nav bottom | `#0C0C18` |
| Footer | `#0F0C07` |

---

## Diferencias clave vs. `servicios/index.html`

| Aspecto | servicios/index.html | portafolio/index.html |
|---------|---------------------|----------------------|
| Nav active | Servicios | Portafolio |
| Page Hero `align-items` | `start` | `center` ← columnas alineadas verticalmente |
| Sección central | `ol-servicios-page` (4 ol-svc-card) | `ol-portfolio-section` (ol-proj-grid) |
| Showcase | 4 bloques, imagen placeholder, sin alternancia | 3 bloques, imágenes reales `.avif`, con `.reverse` en bloque 2 |
| FAQ IDs | Prefijo `s` → `faq-ans-s0`, `#ol-faq-list-svc` | Prefijo `p` → `faq-ans-p0`, `#ol-faq-list-prt` |
| Formulario ID | `#ol-wa-form-svc` | `#ol-wa-form-prt` |
| Copy FAQ | Enfocado en servicios y precios | Enfocado en proyectos, tecnología, proceso y plazos |

---

## Page Hero — valores portafolio

```html
<span class="ol-eyebrow">Trabajo realizado</span>
<h1 class="ol-page-hero-title">Proyectos reales.<br>Resultados concretos.</h1>
<p class="ol-page-hero-sub">Cada proyecto tiene un origen: un negocio con objetivos
claros y un sitio que tenía que trabajar por él.</p>
```

**Diferencia CSS vs. servicios:**
```css
/* servicios/index.html */
.ol-page-hero-grid { align-items: start; }

/* portafolio/index.html */
.ol-page-hero-grid { align-items: center; }
```

> ⚠️ Esta diferencia deberá evaluarse para homologar en futuras versiones. Ver sección "Mejoras pendientes" abajo.

---

## ol-showcase — Variante Portafolio

La sección `ol-showcase` en portafolio **difiere de la de servicios** en tres aspectos:

### 1. Imágenes reales en lugar de placeholders

```html
<!-- servicios: placeholder -->
<div class="ol-showcase-img">
  <div class="ol-showcase-img-label">
    <svg>...</svg>
    <span>Imagen próximamente</span>
  </div>
</div>

<!-- portafolio: imagen real -->
<div class="ol-showcase-img">
  <img src="../img/portafolio/cadeca-1.avif" alt="..." loading="lazy">
</div>
```

CSS adicional para la imagen real:
```css
.ol-showcase-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
}
```

### 2. Alternancia izquierda/derecha (clase `.reverse`)

En portafolio, el bloque 2 (REDEIL) usa `.reverse` para alternar la posición de imagen e info:

```html
<!-- Bloque normal: imagen izq, info der -->
<div class="ol-showcase-block">...</div>

<!-- Bloque invertido: info izq, imagen der -->
<div class="ol-showcase-block reverse">...</div>
```

CSS:
```css
.ol-showcase-block.reverse {
  direction: rtl;
}
.ol-showcase-block.reverse > * {
  direction: ltr;
}
/* En móvil se elimina la alternancia */
@media (max-width: 900px) {
  .ol-showcase-block.reverse { direction: ltr; }
}
```

### 3. Encabezado `ol-sh` propio de portafolio antes de los bloques

```html
<div class="ol-sh" style="margin-bottom: 2rem;">
  <div class="ol-sh-left">
    <span class="ol-eyebrow">Proyectos destacados</span>
    <h2 class="ol-section-title">Un vistazo a<br>cómo trabajamos.</h2>
    ...
  </div>
  ...
</div>
```

> En `servicios/index.html` el `ol-showcase` **no** tiene encabezado propio.

---

## Proyectos en el Showcase

| # | Proyecto | Imagen | URL |
|---|----------|--------|-----|
| 01 | CADECA — Fabricante de cajas | `../img/portafolio/cadeca-1.avif` | https://cajas-de-carton.com |
| 02 | REDEIL — Renta de iluminación | `../img/portafolio/redeil-2.avif` | https://rentadeiluminacion.com |
| 03 | BRINCOLINS — Directorio inflables | `../img/portafolio/brincolins-1.avif` | https://brincolins.com |

---

## FAQ — Portafolio

IDs scoped a `#ol-faq-list-prt`. Prefijo de datos: `p0`–`p7`.

| ID | Pregunta |
|----|----------|
| p0 | ¿Pueden mostrarme más proyectos antes de contratar? |
| p1 | ¿Trabajan con empresas de cualquier industria? |
| p2 | ¿Cuánto tiempo tarda en entregarse un proyecto? |
| p3 | ¿Qué información necesitan para empezar? |
| p4 | ¿Qué tecnología usan para construir los sitios? |
| p5 | ¿Qué pasa después del lanzamiento? |
| p6 | ¿Pueden hacer sitios con funcionalidades muy específicas? |
| p7 | ¿Cuánto cuesta un proyecto como los del portafolio? |

Formulario: `id="ol-wa-form-prt"`. Campos: `prt-nombre`, `prt-empresa`, `prt-tipo`, `prt-mensaje`.

---

## CSS de la página

Todo el CSS vive en el `<style>` inline del `<head>`. No modifica `premium-dark.css`.

| Bloque `<style>` | Qué define |
|------------------|-----------|
| 1er `<style>` (head) | `ol-page-hero-*` + `ol-portfolio-section` + `ol-proj-*` + `ol-showcase` (variante portafolio) |
| 2do `<style>` (dentro de `<main>`) | `ol-faq-section` + acordeón + formulario |

---

## Regla de rutas

```
CSS:      ../_astro/BaseLayout.xeR8R953.css
          ../_astro/premium-dark.css
Imágenes: ../img/origenlab.webp
          ../img/portafolio/cadeca-1.avif
          ../img/portafolio/redeil-2.avif
          ../img/portafolio/brincolins-1.avif
Links:    ../index.html
          ../servicios/index.html
          ../cotizar/index.html
          etc.
```

---

## Mejoras pendientes

| Prioridad | Mejora | Notas |
|-----------|--------|-------|
| 🔴 Alta | Agregar imágenes reales para Gama de México y Eventech | Actualmente muestran placeholder con inicial |
| 🟡 Media | Evaluar `align-items: center` en `ol-page-hero` para todas las L2 | Actualmente solo portafolio lo tiene — verificar si mejora la lectura en servicios |
| 🟡 Media | Documentar variante `ol-showcase` con imágenes reales en [[22 — Showcase de Servicios (ol-showcase)]] | La variante portafolio debe formalizarse como patrón reutilizable |
| 🟢 Baja | Añadir filtros por tipo de proyecto al grid (Todos / Corporativo / E-commerce / Landing) | Requiere JS ligero — alto impacto en UX |
| 🟢 Baja | Páginas individuales de proyecto (L3) | Una URL por proyecto con caso de estudio completo |

---

## Ver también

- [[21 — Page Hero de Subpágina (ol-page-hero)]]
- [[25 — Tarjeta de Proyecto (ol-proj-card)]]
- [[22 — Showcase de Servicios (ol-showcase)]]
- [[08 — Quick Nav Bar]]
- [[14 — FAQ]]
- [[23 — Layout L2 — Servicios (servicios⁄index.html)]]
- [[20 — Estructura de Archivos y Páginas]]
