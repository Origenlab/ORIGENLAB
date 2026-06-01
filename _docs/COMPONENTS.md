# ORIGENLAB · Catálogo de componentes

Cada componente vive en `_astro/premium-dark.css` (sección comentada). Aquí: cómo usarlo, variables que acepta, y dónde se usa hoy.

Antes de crear CSS nuevo, **revisa si existe ya**. Si lo que necesitas es 80% un componente existente, override variables — no copies código.

---

## Hero

**Sección CSS:** `HERO`
**Variables:** `--hero-accent`, `--hero-accent-soft`, `--hero-accent-line`

```html
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__col1">
      <span class="hero__eyebrow">Eyebrow</span>
      <h1 class="hero__title">Título<br>en 2-3 líneas</h1>
      <p class="hero__sub">Subtítulo de máximo 2 líneas.</p>
      <div class="hero__ctas">
        <a class="ol-btn-primary" href="#">CTA principal</a>
        <a class="ol-btn-ghost" href="#">CTA secundaria</a>
      </div>
    </div>
    <div class="hero__col2">
      <p class="hero__p1">Párrafo 1 con borde acento (left).</p>
      <p class="hero__p2">Párrafo 2 con borde gris.</p>
    </div>
  </div>
</section>
```

**Override de acento por página:**
```css
.hero { --hero-accent: #C0392B; --hero-accent-soft: rgba(192,57,43,.08); --hero-accent-line: rgba(192,57,43,.2); }
```

---

## Header (ol-topbar + ol-header)

**Sección CSS:** `NEW TOPBAR`, `HEADER`, `MOBILE OVERLAY & PANEL`
**Universal — copiar tal cual de cualquier página.** No modificar por página.

---

## Footer (ol-footer)

**Sección CSS:** `FOOTER`
**Universal — copiar tal cual.** Si una página requiere CTA distinto en el footer, NO crear variante: añadir CTA arriba (CTA bar / CTA hero card).

---

## QuickNav (ol-quicknav)

**Sección CSS:** `QUICKNAV`
Barra de 7 atajos a servicios + portafolio + nosotros. Universal — copiar tal cual.

---

## Buttons

**Sección CSS:** `BUTTONS`

```html
<a class="btn-primary" href="#">Primary base (oro)</a>
<a class="btn-outline" href="#">Outline base</a>

<!-- Variante por caso/sección con acento custom: -->
<a class="ol-btn-primary" href="#">Primary acento del caso</a>
<a class="ol-btn-ghost" href="#">Ghost</a>
```

`.ol-btn-primary` y `.ol-btn-ghost` consumen `var(--case-accent)` cuando existe; si no, fallback al oro de la marca.

---

## FAQ + Form WhatsApp (ol-faq-*)

**Sección CSS:** `FAQ` (a extraer en este refactor)
**Páginas que lo usan:** index, gama-de-mexico, todas las de servicios, blog.

```html
<section class="ol-faq-section">
  <div class="ol-faq-inner">
    <div class="ol-sh">
      <div class="ol-sh-left">
        <span class="ol-eyebrow">Preguntas Frecuentes</span>
        <h2 class="ol-section-title">Título</h2>
        <p class="ol-section-sub">Sub.</p>
      </div>
      <div class="ol-sh-right">
        <p class="ol-sh-copy">Copy 1.</p>
        <p class="ol-sh-copy">Copy 2.</p>
      </div>
    </div>

    <div class="ol-faq-grid">
      <div>
        <p class="ol-faq-col-label">Preguntas frecuentes</p>
        <div class="ol-faq-list" id="ol-faq-list">
          <div class="ol-faq-item">
            <button class="ol-faq-question" data-faq="0">¿Pregunta?<span class="ol-faq-icon">…</span></button>
            <div class="ol-faq-answer" id="faq-ans-0"><p class="ol-faq-answer-inner">Respuesta.</p></div>
          </div>
          <!-- N items, data-faq="N" e id="faq-ans-N" -->
        </div>
      </div>

      <div>
        <div class="ol-faq-form-wrap">
          <span class="ol-faq-form-badge">…</span>
          <h3 class="ol-faq-form-title">Título form</h3>
          <p class="ol-faq-form-sub">Sub.</p>
          <form class="ol-faq-form" id="ol-wa-form" novalidate>…</form>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Toggle:** lo maneja `ol-header.js` (universal).
**Submit form:** script inline de 15 líneas por página — cambia sólo el mensaje pre-cargado de WhatsApp para identificar de qué página vino el lead.

---

## Section header de 2 columnas (ol-sh)

**Sección CSS:** `SECTION HEADERS` (a documentar)
Layout de encabezado de sección con eyebrow + título + sub a la izquierda y 2 párrafos de copy a la derecha. Reusable en cualquier sección.

---

## Features grid (ol-features-*)

**Sección CSS:** `FEATURES` (a extraer)
**Páginas:** servicios/* (4 páginas).

```html
<section class="ol-features">
  <div class="ol-features-inner">
    <div class="ol-features-grid">
      <article class="ol-feature-card">
        <div class="ol-feature-icon"><svg>…</svg></div>
        <h3 class="ol-feature-title">Feature</h3>
        <p class="ol-feature-desc">Descripción.</p>
      </article>
      <!-- ... -->
    </div>
  </div>
</section>
```

---

## Blog grid + Article card (ol-blog-grid, ol-article-*)

**Sección CSS:** `BLOG` (a extraer)
**Páginas:** /blog/index + 9 artículos.

Pendiente de documentar.

---

## Case study layout (ol-case-*)

**Sección CSS:** `CASE STUDY` (en `premium-dark.css`)
**Páginas LIVE:** `portafolio/equipos-contra-incendios/{gama-de-mexico, meseci, lga-contraincendios, manext, bombero-mx, proyectored}`.
**Referencia profesional:** `bombero-mx/index.html` (incluye `aria-hidden`, plural consistente, JSON-LD enriquecido).

Layout de 2 columnas: contenido principal + sidebar sticky con datos del proyecto, stack, índice (TOC) y CTA.

```html
<section class="ol-case-shell" id="construccion">
  <div class="ol-case-inner">
    <div class="ol-case-grid">
      <article class="ol-case-body">
        <section class="ol-case-section" id="seccion">
          <span class="ol-case-eyebrow">01 · Tema</span>
          <h2 class="ol-case-h2">Título</h2>
          <p class="ol-case-lead">Lead.</p>
          …
        </section>
      </article>
      <aside class="ol-case-sidebar">
        <div class="ol-side-card">…datos…</div>
        <div class="ol-side-card">…stack…</div>
        <nav class="ol-side-card">…TOC…</nav>
        <div class="ol-side-cta">…CTA…</div>
      </aside>
    </div>
  </div>
</section>
```

**Acento por caso (sincronizar con `--proj-accent` del L3):**
```css
:root { --case-accent: #C0392B; --case-accent-soft: rgba(192,57,43,.12); --case-accent-line: rgba(192,57,43,.28); }
```

**Reglas mínimas para el L4:**
- `aria-hidden="true" focusable="false"` en TODOS los SVG decorativos.
- Chip plural: `Formularios B2B` (nunca singular).
- JSON-LD: `Organization` separado del cliente con `brand[]`/`areaServed`/`knowsAbout`.
- Card del L3 → URL interna del L4 (no externa) salvo e-commerce.
- `ol-case-next` encadenado: anterior + siguiente / volver al sector.

> Detalles completos: [[33 — Layout L4 — Caso de Estudio (portafolio⁄[sector]⁄[cliente]⁄index.html)]] y [[34 — L4 Casos en operación · Roster y enlaces]].

---

## CTA hero card (ol-cta-hero-*)

**Sección CSS:** `CTA HERO CARD` (a extraer)
Card grande de cierre con eyebrow + título + blurb + lista de promesas + 2 CTAs.

---

Última actualización: 2026-04-26
