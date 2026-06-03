# Layout L2 — Servicios (`servicios/index.html`)

> Segunda página del sitio. Hub de todos los servicios. Homologada al sistema `ol-*`. Referencia para construir todas las demás páginas L2.

---

## Flujo completo de la página

```
┌─────────────────────────────────┐
│  ol-topbar                      │  ← Idéntico al index
├─────────────────────────────────┤
│  ol-header                      │  ← Idéntico al index (nav "Servicios" = active)
├─────────────────────────────────┤
│  ol-mobile-overlay              │  ← Idéntico al index
│  ol-mobile-panel                │  ← Idéntico al index
├─────────────────────────────────┤
│  <main>                         │
│  ├── ol-page-hero               │  ← Hero de subpágina (2 columnas, sin CTAs)
│  ├── ol-quicknav (con íconos)   │  ← Quick Nav top — igual al del index (top)
│  ├── ol-servicios-page          │  ← Sección: ol-sh + ol-services-grid (4 cards)
│  ├── ol-showcase                │  ← Sección: 4 bloques imagen+info 2 columnas
│  ├── ol-faq-section             │  ← FAQ acordeón + formulario WhatsApp
│  └── ol-quicknav (sin íconos)   │  ← Quick Nav bottom — igual al del index (bottom)
├─────────────────────────────────┤
│  ol-footer                      │  ← Idéntico al index
├─────────────────────────────────┤
│  WA bubble                      │  ← Botón flotante WhatsApp
│  JS (header + mobile + faq)     │  ← Scripts al final del body
└─────────────────────────────────┘
```

---

## Secciones y su documentación

| Sección | Clase | Doc | Fondo |
|---------|-------|-----|-------|
| Page Hero | `ol-page-hero` | [[21 — Page Hero de Subpágina (ol-page-hero)]] | `#08080E` |
| Quick Nav (top) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |
| Servicios (cards) | `ol-servicios-page` | [[10 — Servicios]] + [[17 — Tarjeta de Servicio (ol-svc-card)]] | `#04040A` |
| Showcase | `ol-showcase` | [[22 — Showcase de Servicios (ol-showcase)]] | `#08080E` |
| FAQ + Form | `ol-faq-section` | [[14 — FAQ]] | `#0D0D16` |
| Quick Nav (bottom) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |

---

## Alternancia de fondos en L2

| Sección | Fondo |
|---------|-------|
| Page Hero | `#08080E` |
| Quick Nav top | `#0C0C18` |
| Servicios (cards) | `#04040A` ← más oscuro |
| Showcase | `#08080E` |
| FAQ | `#0D0D16` |
| Quick Nav bottom | `#0C0C18` |
| Footer | `#0F0C07` |

---

## Componentes globales (idénticos al index)

Los siguientes componentes se copian **sin cambios** del L1, ajustando solo las rutas de assets (`../`) y el estado `active` en la navegación:

- `ol-topbar` — sin cambios de contenido
- `ol-header` — `Servicios` lleva clase `active` en el nav link
- `ol-mobile-panel` — mismo contenido
- `ol-footer` — mismo contenido (rutas `../`)
- WA bubble — mismo código
- JS del header — mismo script

---

## Diferencias clave respecto al L1

| Aspecto | L1 (index.html) | L2 (servicios/index.html) |
|---------|-----------------|---------------------------|
| Hero | `<section class="hero">` (Astro, 88vh) | `<section class="ol-page-hero">` (2 col, sin vh) |
| Primer módulo | Hero del index | `ol-page-hero` |
| `ol-cta-bar` | ✅ Presente | ❌ Eliminado |
| `ol-why` | ✅ Presente | ❌ No aplica |
| `ol-process` | ✅ Presente | ❌ No aplica |
| `ol-testimonials` | ✅ Presente | ❌ No aplica |
| `ol-showcase` | ❌ No existe | ✅ Exclusivo de L2 Servicios |
| `ol-cta-final` | ✅ Presente | ❌ Eliminado (reemplazado por quicknav bottom) |
| Rutas CSS/img | Raíz (`_astro/`, `img/`) | Relativas (`../_astro/`, `../img/`) |

---

## Convención de IDs en FAQ (L2)

Para evitar colisión si el JS del index y L2 cargan en el mismo contexto, los IDs del FAQ en L2 usan prefijo `s`:

```html
<!-- L1 (index.html) -->
<div class="ol-faq-list" id="ol-faq-list">
  <button data-faq="0"> ... </button>
  <div id="faq-ans-0"> ... </div>

<!-- L2 (servicios/index.html) -->
<div class="ol-faq-list" id="ol-faq-list-svc">
  <button data-faq="s0"> ... </button>
  <div id="faq-ans-s0"> ... </div>
```

El JS del FAQ en L2 está scoped a `#ol-faq-list-svc` y el form a `#ol-wa-form-svc`.

---

## CSS de la página

El CSS de L2 vive completamente en el `<style>` inline del `<head>`. No modifica `premium-dark.css`.

| Bloque `<style>` | Qué define |
|------------------|-----------|
| 1er `<style>` (head) | `ol-page-hero-*` + `ol-servicios-page-*` + `ol-showcase-*` |
| 2do `<style>` (dentro de `<main>`) | `ol-faq-section` + todo el acordeón y formulario |

---

## Regla de rutas para subpáginas

```
Ruta en L1 (index.html):     _astro/premium-dark.css
Ruta en L2 (servicios/):    ../_astro/premium-dark.css

Ruta en L1:   img/origenlab.webp
Ruta en L2:   ../img/origenlab.webp

Links internos L1:   servicios/index.html
Links internos L2:   ../portafolio/index.html  (sube un nivel)
                     desarrollo-web/index.html  (mismo nivel)
```

---

## Ver también

- [[07 — Hero]] — Hero del index (L1)
- [[08 — Quick Nav Bar]] — Documentación completa del quicknav
- [[21 — Page Hero de Subpágina (ol-page-hero)]] — Hero de L2+
- [[22 — Showcase de Servicios (ol-showcase)]] — Bloques imagen+info
- [[14 — FAQ]] — Módulo FAQ completo
- [[20 — Estructura de Archivos y Páginas]] — Árbol completo del proyecto
