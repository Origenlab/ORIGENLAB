# ORIGENLAB — Especificación de Páginas L3 (Servicios)

> Documento de referencia para replicar el layout de `servicios/desarrollo-web/index.html`  
> en todos los L3 de servicios con coherencia total de diseño, estructura y código.

---

## 1. Qué es un L3

Una página de nivel 3 (L3) describe un servicio específico de OrigenLab.  
Ruta canónica: `https://origenlab.com/servicios/{slug}/`  
Archivo local: `servicios/{slug}/index.html`

Servicios L3 actuales:
| Slug | Servicio |
|---|---|
| `desarrollo-web` | Desarrollo Web Profesional |
| `tiendas-en-linea` | Tiendas en Línea / E-commerce |
| `landing-pages` | Landing Pages de Alta Conversión |
| `rediseno-web` | Rediseño Web |

---

## 2. Anatomía de la página — secciones en orden

```
<head>          meta + OG + Twitter + favicon + fonts + CSS + JS + <style> + JSON-LD
<body>
  .ol-skip-link
  .ol-topbar              — barra superior: email · teléfono · promo · WhatsApp
  .ol-header              — logo + nav desktop + CTA + hamburger
  .ol-mobile-overlay
  .ol-mobile-panel        — menú móvil completo
  .ol-bc-wrap             — breadcrumb Schema.org (3 niveles: Inicio > Servicios > {Servicio})
  <main id="main">
    1.  .ol-page-hero     — hero 2 columnas: H1 + subtítulo | copy descriptivo
    2.  .ol-quicknav      — barra horizontal de navegación rápida (TOP, con íconos SVG)
    3.  .ol-overview      — .ol-sh + grid imagen/texto: introducción del servicio
    4.  .ol-features      — .ol-sh + grid 4 col: 8 feature cards (lo que entregamos)
    5.  .ol-stack         — .ol-sh + grid 6 col: stack tecnológico (puede omitirse en L3 sin stack propio)
    6.  .ol-types         — .ol-sh + grid 3 col: 6 type cards (para quién es)
    7.  .ol-svc-process   — .ol-sh + 4 pasos con línea conectora dorada
    8.  .ol-pricing       — .ol-sh + pricing card 2 col (precio + checklist de incluidos)
    9.  .ol-showcase      — .ol-sh + 3 bloques cross-sell a otros servicios
    10. .ol-faq-section   — .ol-sh + acordeón FAQ (izq) + formulario WhatsApp sticky (der)
        <script>          — JS inline: acordeón + lógica formulario WhatsApp
    11. .ol-quicknav      — barra horizontal navegación (BOTTOM, sin íconos)
  </main>
  .ol-footer              — footer 3 capas: top (logo+contacto) + links (4 cols) + copyright
```

---

## 3. CSS — arquitectura de dos capas

### Capa 1: CSS compartido (global, no tocar)
```html
<link rel="stylesheet" href="../../_astro/BaseLayout.xeR8R953.css?v20260421a">
<link rel="stylesheet" href="../../_astro/premium-dark.css?v20260421a">
<script src="../../_astro/ol-header.js?v20260421a" defer></script>
```
Estas hojas definen: topbar, header, nav, dropdown, mobile panel, breadcrumb, quicknav, footer, ol-sh, ol-eyebrow, ol-section-title, ol-section-sub, ol-skip-link, ol-qn-*, ol-footer-*, ol-bc-*.

### Capa 2: Estilos página (bloque `<style>` en el `<head>`)
Cada L3 define sus propios componentes de sección dentro del `<head>`. Ver sección 5.

---

## 4. Paleta de colores y tokens de diseño

| Token | Valor | Uso |
|---|---|---|
| `--bg-deep` | `#04040A` | Fondos alternos más oscuros |
| `--bg-base` | `#08080E` | Fondo base de la mayoría de secciones |
| `--bg-mid` | `#0D0D16` | Fondos alternos (stack, pricing, faq) |
| `--bg-card` | `#0C0C18` | Cards y contenedores interiores |
| `--gold` | `#C9A84C` | Color de acento principal dorado |
| `--gold-hover` | `#E4C26B` | Hover sobre dorado |
| `--text-primary` | `#F0F0F5` | Texto principal |
| `--text-muted-50` | `rgba(240,240,245,0.50)` | Subtítulos |
| `--text-muted-55` | `rgba(240,240,245,0.55)` | Descripciones de card |
| `--text-muted-48` | `rgba(240,240,245,0.48)` | Texto secundario fino |
| `--border-subtle` | `rgba(255,255,255,0.07)` | Bordes de cards |
| `--gold-border` | `rgba(201,168,76,0.25)` | Bordes con acento dorado |
| `--wa-green` | `#25D366` | Color WhatsApp |

---

## 5. Especificación CSS por sección

### Patrón de separador entre secciones (universal)
```css
.ol-{section}::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
  /* Variantes: 0.07 (sutil) | 0.15 (estándar) | 0.2 (enfatizado) | 0.3 (fuerte) */
}
```

### Patrón de contenedor interno (universal)
```css
.ol-{section}-inner {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
}
```

### Patrón de padding de sección (universal)
```css
padding: 6rem 0;     /* estándar */
padding: 5rem 0 6rem; /* showcase (top más corto) */
```

---

### 5.1 `.ol-page-hero`
**Fondo:** `#08080E`  
**Grid:** 2 col 1fr 1fr, gap 4rem. Mobile (≤860px): 1 col.

```
.ol-page-hero-grid
  .ol-page-hero-left
    .ol-eyebrow               → "Servicio · {Nombre del Servicio}"
    h1.ol-page-hero-title     → clamp(2.8rem, 5vw, 4.5rem) | font-weight:900 | color:#F0F0F5
    p.ol-page-hero-sub        → 1.0625rem | rgba(240,240,245,0.5) | line-height:1.75
  .ol-page-hero-right
    p.ol-page-hero-copy (×2)  → 15px | rgba(240,240,245,0.48) | line-height:1.8
```

**Decoradores:** `::before` gradiente dorado arriba-izquierda + `::after` línea en bottom.

---

### 5.2 `.ol-quicknav` (TOP — con íconos)
**Componente global**, definido en CSS compartido.  
7 ítems: los 4 servicios + Portafolio + Nosotros + CTA "Cotizar Proyecto" (`.ol-qn-cta`).  
El ítem activo lleva `aria-current="page"`.  
Cada ítem: `.ol-qn-item` > `.ol-qn-icon` (SVG 22×22) + `.ol-qn-text` > `.ol-qn-title` + `.ol-qn-sub`.

---

### 5.3 `.ol-overview`
**Fondo:** `#04040A`  
**Grid texto:** `.ol-sh` (global) — ver sección 6.  
**Grid imagen:** 2 col 1fr 1fr, gap 5rem, `align-items: center`. Mobile (≤900px): 1 col, img order -1.

```
.ol-overview-grid
  .ol-overview-img            → aspect-ratio:4/3 | border-radius:14px | border:1px gold-border
    img                       → object-fit:cover | avif/webp preferido
  .ol-overview-text
    .ol-eyebrow
    h3.ol-overview-title      → clamp(1.9rem, 3.5vw, 2.8rem) | font-weight:800
    p (×3)                    → 1rem | color:rgba(240,240,245,0.58) | line-height:1.8
    strong                    → color:#F0F0F5 | font-weight:600
```

---

### 5.4 `.ol-features`
**Fondo:** `#08080E`  
**Grid:** 4 col repeat(4, 1fr), gap 1.5rem. ≤1100px: 2 col. ≤560px: 1 col.

```
.ol-features-grid
  article.ol-feature-card (×8)
    .ol-feature-icon          → 44×44px | bg:rgba(201,168,76,0.1) | border:1px gold-border | SVG 22×22
    h3.ol-feature-title       → 1.0625rem | font-weight:700 | color:#F0F0F5
    p.ol-feature-desc         → 14px | rgba(240,240,245,0.55) | line-height:1.7
```

**Hover card:** border-color dorado 0.4 + translateY(-3px) + box-shadow.

---

### 5.5 `.ol-stack`
**Fondo:** `#0D0D16`  
**Grid:** 6 col. ≤1100px: 3 col. ≤560px: 2 col.  
**Nota:** Omitir esta sección si el servicio no tiene stack técnico propio (ej. Rediseño Web puede reutilizar o simplificar).

```
.ol-stack-grid
  .ol-stack-item (×6)
    p.ol-stack-cat    → 10.5px | color:rgba(201,168,76,0.85) | uppercase | letter-spacing:0.14em
    h3.ol-stack-tech  → 1rem | font-weight:700 | color:#F0F0F5
    p.ol-stack-desc   → 12.5px | rgba(240,240,245,0.48) | line-height:1.55
```

---

### 5.6 `.ol-types`
**Fondo:** `#08080E`  
**Grid:** 3 col. ≤980px: 2 col. ≤640px: 1 col.

```
.ol-types-grid
  article.ol-type-card (×6)
    p.ol-type-num     → "01" … "06" | 10.5px | rgba(201,168,76,0.7) | uppercase
    h3.ol-type-title  → 1.125rem | font-weight:700 | color:#F0F0F5
    p.ol-type-desc    → 14px | rgba(240,240,245,0.55) | line-height:1.7 | flex:1
    .ol-type-meta     → border-top:1px rgba(255,255,255,0.06) | flex space-between
      span            → 12.5px | rgba(240,240,245,0.48)
      strong          → color:#C9A84C | font-weight:600
```

**Hover card:** border-color dorado 0.35 + translateY(-3px).

---

### 5.7 `.ol-svc-process`
**Fondo:** `#04040A`  
**Grid:** 4 col, gap 0. ≤900px: 2 col. ≤520px: 1 col.

```
.ol-svc-process-steps
  ::before    → línea conectora horizontal dorada entre los 4 círculos
                top:27px | left:calc(12.5%+30px) | right:calc(12.5%+30px) | height:1px
  .ol-svc-process-step (×4)
    .ol-svc-process-num   → 56×56px círculo | bg:#0C0C18 | border:1px gold | número dorado
    h3.ol-svc-process-title → 1.0625rem | font-weight:700 | color:#F0F0F5
    p.ol-svc-process-desc  → 14px | rgba(240,240,245,0.44) | line-height:1.72
    p.ol-svc-process-time  → 11px | uppercase | color:rgba(201,168,76,0.75) | "Semana X"
```

La línea conectora se oculta en mobile (display:none cuando ≤900px).

---

### 5.8 `.ol-pricing`
**Fondo:** `#0D0D16`  

```
.ol-pricing-card     → bg:linear-gradient(135deg, #0C0C18, #12121F) | border:1px rgba(201,168,76,0.3)
                        border-radius:18px | padding:3.5rem | grid 2 col | gap:4rem
  .ol-pricing-left
    p.ol-pricing-label        → 10.5px | #C9A84C | uppercase | "{Servicio} · Plan base"
    p.ol-pricing-from-word    → 13px | rgba(240,240,245,0.5) | "Inversión desde"
    p.ol-pricing-amount       → clamp(2.8rem,5vw,3.8rem) | font-weight:900 | "$XX,000"
      span.curr               → "MXN" | 0.55em | opacity 0.55
    p.ol-pricing-pay          → 13px | "50% inicio · 50% entrega · Factura incluida"
    p.ol-pricing-blurb        → 14.5px | rgba(240,240,245,0.62)
    a.ol-pricing-cta          → bg:#C9A84C | color:#08080E | padding:0.95rem 1.75rem
  .ol-pricing-right
    p.ol-pricing-includes-title
    ul.ol-pricing-includes-list  → grid 2 col | checkbox dorado como ::before
      li (×8)
```

Mobile (≤900px): 1 col, checklist 1 col, padding 2.5rem.

---

### 5.9 `.ol-showcase`
**Fondo:** `#08080E`  
3 bloques cross-sell a los otros 3 servicios (siempre los que NO son el L3 actual).

```
.ol-showcase-block (×3)     → grid 2 col 1fr 1fr | gap:5rem | border-bottom:1px rgba(255,255,255,0.05)
  .ol-showcase-img           → placeholder SVG centrado con label "Imagen próximamente"
  .ol-showcase-info
    p.ol-showcase-num        → "0X — {Nombre Servicio}"
    h3.ol-showcase-title     → clamp(1.75rem, 3vw, 2.5rem) | font-weight:800
    p.ol-showcase-desc       → 1rem | rgba(240,240,245,0.5) | line-height:1.8
    ul.ol-showcase-list (×4) → flechas doradas "→" como bullets
    a.ol-showcase-cta        → ghost dorado | "Ver {Servicio} →"
```

Mobile (≤900px): 1 col.

---

### 5.10 `.ol-faq-section`
**Fondo:** `#0D0D16`  
**Grid:** 2 col 1fr 1fr, gap 3rem, align-items start. Mobile (≤900px): 1 col.

**Columna izquierda — acordeón FAQ:**
```
.ol-faq-list#ol-faq-list-{slug}
  .ol-faq-item (×9)
    button.ol-faq-question[data-faq="{slug}{N}"]
      span.ol-faq-icon (SVG +/×)
    .ol-faq-answer#faq-ans-{slug}{N}
      p.ol-faq-answer-inner
```

**Columna derecha — formulario sticky:**
```
.ol-faq-form-wrap              → bg:#131320 | border:1px rgba(255,255,255,0.08) | sticky top:120px
  .ol-faq-form-badge           → verde #25D366 | "● Respuesta en menos de 24 h"
  .ol-faq-form-title           → 1.4rem | font-weight:700
  .ol-faq-form-sub             → 0.875rem | rgba(240,240,245,0.5)
  form#ol-wa-form-{slug}
    .ol-faq-form-row (2 col)   → nombre + empresa
    select                     → tipo de proyecto (opciones específicas del servicio)
    textarea                   → descripción del proyecto
    button.ol-faq-submit       → bg:#25D366 | "Enviar por WhatsApp" + SVG WA
    p.ol-faq-form-note         → "Al enviar, se abrirá WhatsApp..."
```

**JS inline (al cierre de la sección FAQ):**
```javascript
// 1. Acordeón: toggle .active + maxHeight animado
// 2. Form submit: armar mensaje WhatsApp y abrir wa.me/525547868402
//    IDs a actualizar: #ol-faq-list-{SLUG}, data-faq="{SLUG}{N}", #faq-ans-{SLUG}{N}
//    form ID: #ol-wa-form-{SLUG}
//    input IDs: #{SLUG}-nombre, #{SLUG}-empresa, #{SLUG}-tipo, #{SLUG}-mensaje
```

---

### 5.11 `.ol-quicknav` (BOTTOM — sin íconos)
Igual al TOP pero sin `.ol-qn-icon`. Solo `.ol-qn-text` con title + sub diferente ("Estás aquí", "Vende desde el día uno", etc.).

---

## 6. Componente `.ol-sh` — cabecera de sección (global)

Todas las secciones principales inician con `.ol-sh` (definido en CSS compartido):

```html
<div class="ol-sh">
  <div class="ol-sh-left">
    <span class="ol-eyebrow">Label corto</span>
    <h2 class="ol-section-title">Título principal<br>dos líneas.</h2>
    <p class="ol-section-sub">Subtítulo descriptivo en 1-2 oraciones.</p>
  </div>
  <div class="ol-sh-right">
    <p class="ol-sh-copy">Párrafo de copy 1.</p>
    <p class="ol-sh-copy">Párrafo de copy 2.</p>
  </div>
</div>
```

El contenido de la sección viene justo después del `</div>` del `.ol-sh`, con `style="margin-top:4rem;"` en el elemento grid.

---

## 7. Schema.org JSON-LD por L3

Cada L3 lleva 4 tipos en un solo `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", ... },
    { "@type": "Service",
      "serviceType": "{Nombre del Servicio}",
      "@id": "https://origenlab.com/servicios/{slug}/#service",
      "url": "https://origenlab.com/servicios/{slug}/",
      "offers": { "price": "{precio_minimo_MXN}" }
    },
    { "@type": "BreadcrumbList", ... },
    { "@type": "FAQPage", "mainEntity": [ ... ] }
  ]
}
```

---

## 8. Variables que cambian por cada L3

| Variable | Desarrollo Web | Tiendas en Línea | Landing Pages | Rediseño Web |
|---|---|---|---|---|
| `{SLUG}` | `desarrollo-web` | `tiendas-en-linea` | `landing-pages` | `rediseno-web` |
| `{SLUG_ID}` | `dw` | `te` | `lp` | `rw` |
| `{SERVICE_NAME}` | Desarrollo Web | Tiendas en Línea | Landing Pages | Rediseño Web |
| `{SERVICE_NAME_FULL}` | Desarrollo Web Profesional | Tiendas en Línea / E-commerce | Landing Pages de Alta Conversión | Rediseño Web |
| `{TITLE_TAG}` | Desarrollo Web Profesional en México | Tiendas en Línea / E-commerce en México | Landing Pages de Alta Conversión | Rediseño Web Profesional México |
| `{PRECIO_DESDE}` | $15,000 | $25,000 | $8,500 | $12,000 |
| `{ENTREGA}` | 3 a 6 semanas | 6 a 10 semanas | 7 a 14 días | 4 a 8 semanas |
| `{IMG_SRC}` | `img/servicios/desarrollo-web.avif` | `img/servicios/tiendas-en-linea.avif` | `img/servicios/landing-pages.avif` | `img/servicios/rediseno-web.avif` |
| `{IMG_ALT}` | Desarrollo web profesional — OrigenLab | E-commerce a medida — OrigenLab | Landing pages de alta conversión — OrigenLab | Rediseño web — OrigenLab |
| `{H1}` | Sitios corporativos hechos para cargar rápido y convertir. | Tiendas en línea que venden desde el primer día. | Páginas que convierten. Diseñadas para campañas que dan resultados. | Tu sitio actual, renovado. Más rápido, más moderno, más efectivo. |

---

## 9. Qué NO cambia entre L3

- Topbar completo (email, tel, promo, WA)
- Header completo (logo, nav, CTA, mobile panel)
- Todos los links del nav y dropdowns (siempre los 4 servicios)
- Quicknav TOP: los 7 ítems siempre los mismos, solo cambia el `aria-current="page"`
- Quicknav BOTTOM: los 7 ítems con textos ligeramente distintos por contexto
- Footer completo
- CSS compartido (BaseLayout + premium-dark)
- Paleta de colores y tokens
- Estructura CSS de cada sección (copy-paste exacto del bloque `<style>`)
- Número de feature cards: siempre 8
- Número de type cards: siempre 6
- Número de process steps: siempre 4
- Número de pricing includes: siempre 8
- Número de showcase blocks: siempre 3 (los otros 3 servicios)
- Número de FAQ items: 9 por L3

---

## 10. Checklist de implementación por nuevo L3

```
[ ] Copiar L3-TEMPLATE.html a servicios/{slug}/index.html
[ ] Sustituir todas las variables {PLACEHOLDER}
[ ] Reemplazar contenido de .ol-page-hero (h1, subtítulo, copy)
[ ] Reemplazar contenido de .ol-overview (eyebrow, h3, 3 párrafos)
[ ] Escribir 8 feature cards específicas del servicio
[ ] Escribir stack tecnológico (o eliminar sección si no aplica)
[ ] Escribir 6 type cards ("para quién es")
[ ] Escribir 4 process steps con tiempos realistas
[ ] Ajustar precio y checklist de pricing (8 items)
[ ] Configurar los 3 showcase blocks (los otros 3 servicios, NO el propio)
[ ] Escribir 9 preguntas FAQ específicas del servicio
[ ] Ajustar select "Tipo de proyecto" en el formulario WA
[ ] Actualizar JSON-LD (Service type, precio, BreadcrumbList, FAQPage)
[ ] Cambiar meta title y description
[ ] Actualizar canonical y og:url al slug correcto
[ ] Verificar que el ítem activo en quicknav TOP sea el correcto
[ ] Verificar que el ítem "Estás aquí" en quicknav BOTTOM sea el correcto
[ ] Actualizar IDs únicos del acordeón (ol-faq-list-{SLUG_ID}, faq-ans-{SLUG_ID}{N})
[ ] Agregar imagen AVIF en img/servicios/{slug}.avif
```

---

## 11. Rutas de assets (relativas desde servicios/{slug}/)

```
../../_astro/BaseLayout.xeR8R953.css
../../_astro/premium-dark.css
../../_astro/ol-header.js
../../favicon.svg
../../img/origenlab.webp
../../img/servicios/{slug}.avif
../../index.html              → Inicio
../index.html                 → Servicios (L2)
../desarrollo-web/index.html
../tiendas-en-linea/index.html
../landing-pages/index.html
../rediseno-web/index.html
../../portafolio/index.html
../../nosotros/index.html
../../blog/index.html
../../contacto/index.html
../../cotizar/index.html
../../aviso-de-privacidad/index.html
../../terminos/index.html
```

---

*Generado: 2026-04-23 | Basado en: servicios/desarrollo-web/index.html*
