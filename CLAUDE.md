# ORIGENLAB — guía para Claude / dev

Este archivo es el entry point. Léelo primero antes de tocar el sitio.

## TL;DR

Sitio HTML estático servido en GitHub Pages (`Frankoropeza/origenlab` → origenlab.com). CSS compartido en `_astro/premium-dark.css`. JS en `_astro/ol-header.js`. Componentes vienen de premium-dark.css; cada página HTML sólo trae overrides mínimos en su `<style>`.

## Reglas duras (no negociar)

1. **NO mencionar SEO** en el sitio (copy, alt, metadatos visibles). OrigenLab vende diseño + velocidad + conversión.
2. **NO precios** en ninguna página. Cero cifras.
3. **NO plazos** ("en 2 semanas", "entrega en X"). Reemplazar por "calendario por escrito desde el inicio".
4. **NO animaciones excepto botones** (cards, imágenes, íconos JAMÁS animan).
5. **NO duplicar CSS por página.** Si un patrón existe en >1 página, vive en premium-dark.css con variables CSS para overrides.
6. **NO usar `[data-astro-cid-XXX]`** en reglas reusables — son scoped a Astro y rompen reuso.
7. **Títulos de hero en artículos de blog (L6): CORTOS.** El `<h1 class="ol-art-title">` en el hero debe ser una versión condensada del título — máximo ~60 caracteres, sin subtítulos ni explicaciones. El título largo vive en `<title>`, OG tags y JSON-LD. Ejemplo: título completo = "Gama de México: el distribuidor autorizado de Elkhart Brass para la industria mexicana" → hero h1 = "Gama de México: distribuidor autorizado Elkhart Brass".

## Documentación del sistema

- `/_docs/CONVENTIONS.md` — naming, estructura HTML, performance, a11y.
- `/_docs/COMPONENTS.md` — catálogo de componentes con HTML de ejemplo.
- `/_docs/LAYOUTS.md` — secuencia de componentes por tipo de página (home, servicio, caso, blog, etc.).

Cualquier nueva página: leer estos 3 archivos antes de empezar.

## Antes de escribir código nuevo

1. ¿El patrón existe en `_docs/COMPONENTS.md`? → Úsalo, no copies CSS.
2. ¿Es un acento distinto pero misma estructura? → Override de variable CSS, no nueva clase.
3. ¿Es realmente único de la página? → Clase nueva con prefix de la página (`.ol-{pagina}-{elemento}`).

## Workflow de cambios al CSS compartido

1. Editar `_astro/premium-dark.css`.
2. Bumpear cache buster en TODAS las páginas que la cargan (`?vYYYYMMDDx`).
3. Hard-reload (Cmd+Shift+R) para verificar.
4. Si hay 28 páginas con el mismo `?v...`, usar `Grep + Edit replace_all` o un script.

## Workflow para nueva página

1. Identificar layout (`/_docs/LAYOUTS.md`).
2. Copiar la página piloto del layout más cercano.
3. Cambiar contenido + `--hero-accent` si aplica.
4. NO añadir CSS inline salvo overrides justificados.
5. Verificar canonical, OG, JSON-LD Schema.org.
6. Añadir a `sitemap.xml` y al menú si corresponde.

## Deploy

- Push: `bash _push-github.sh` (commit + push a `Frankoropeza/origenlab`).
- DNS: Cloudflare → GitHub Pages.
- Verificar: https://origenlab.com tras 1-2 min.

Detalles del playbook GH Pages + Cloudflare en memoria persistente del proyecto.

## Archivos importantes

| Archivo | Propósito |
|---------|-----------|
| `_astro/premium-dark.css` | CSS compartido del sitio (todos los componentes) |
| `_astro/ol-header.js` | JS del header + FAQ toggle |
| `_astro/BaseLayout.xeR8R953.css` | Reset / layout base de Astro |
| `index.html`, `nosotros/index.html`, ... | Páginas (HTML estático) |
| `sitemap.xml` | Sitemap |
| `_push-github.sh` | Script de deploy |

## Estado del refactor (2026-04-26)

**Foundation + migración masiva completas.**

`_astro/premium-dark.css` (5,165 líneas) consolida TODOS los componentes del sitio:
- Layout/chrome: `.ol-topbar`, `.ol-header`, `.ol-mobile-*`, `.ol-quicknav`, `.ol-footer`, `.ol-breadcrumb`
- Hero: `.hero` (universal), `.ol-page-hero` (subpágina)
- Secciones: `.ol-services-*`, `.ol-features-*`, `.ol-overview`, `.ol-stack-*`, `.ol-types-*`, `.ol-svc-process-*`, `.ol-showcase-*`, `.ol-testimonials-*`, `.ol-faq-*`, `.ol-cta-hero-*`, `.ol-cta-bar-*`
- Caso de estudio L4: `.ol-case-shell/grid/sidebar/body/section/h2/lead/cards/spec/arch/gallery/family/norma/service`
- Sidebar caso: `.ol-side-card`, `.ol-side-meta`, `.ol-side-toc`, `.ol-side-cta`
- Blog L5/L6: `.ol-blog-grid`, `.ol-blog-card-*`, `.ol-art-hero/title/excerpt/meta/body/callout/compare/pullstat/cta-inline/share/author-card/sidebar/nextread`
- Forms: `.ol-form-card`, `.ol-faq-form-*`, `.ol-contact-*`, `.ol-ci-*`, `.ol-chip-*`
- Sobre nosotros: `.ol-about-*`, `.ol-proceso-*`
- Botones: `.btn-primary`, `.btn-outline`, `.ol-btn-primary` (con `--case-accent`), `.ol-btn-ghost`

**Estado de migración por página (45 páginas live):**
- 16 páginas con 0 líneas inline (100% migradas)
- 20 páginas con 1-5 líneas (legacy `[data-astro-cid]` stub — aceptable)
- 7 páginas con 6-30 líneas (overrides legítimos de variables CSS)
- 2 páginas con >100 líneas (portafolio root + sector — mockups custom específicos de página, refactor pendiente si se desea)

**Cache buster unificado:** `?v20260426b` en todas las páginas live.

**Reglas auto-aplicadas:**
- 0 referencias a `.ol-pricing-*` en HTML live (regla "no precios" cumplida)
- 0 plazos específicos en copy comercial (solo educativo en blog)
- 0 menciones de SEO como servicio en hero/CTAs
- Animaciones solo en botones (regla CSS global en premium-dark.css ~líneas 2342-2406)

**Páginas piloto/referencia:**
- L1 home: `/index.html`
- L2 hub servicios: `/servicios/index.html`
- L3 servicio detalle: `/servicios/desarrollo-web/index.html`
- L3.5 sector: `/portafolio/equipos-contra-incendios/index.html`
- L4 caso (referencia base): `/portafolio/equipos-contra-incendios/gama-de-mexico/index.html`
- L4 caso (referencia profesional 2026-04-26): `/portafolio/equipos-contra-incendios/bombero-mx/index.html`
- L5 blog index: `/blog/index.html`
- L6 artículo: `/blog/astro-vs-wordpress-cual-elegir/index.html`
- L7 legal: `/aviso-de-privacidad/index.html`
- L8 conversión: `/contacto/index.html`

**Casos L4 LIVE (sector equipos-contra-incendios):**

| Caso | Slug | Acento | Modelo |
|------|------|--------|--------|
| Gama de México | `gama-de-mexico` | `#C0392B` | Distribuidor mono-marca (Elkhart Brass) |
| MESECI | `meseci` | `#E67E22` | Multi-línea (NOM/NFPA) |
| LGA Contraincendios | `lga-contraincendios` | `#DC2626` | E-commerce técnico |
| MANEXT | `manext` | `#B45309` | Servicios técnicos (NOM-154/002) |
| BOMBERO.MX | `bombero-mx` | `#B91C1C` | Distribuidor multi-marca NFPA |
| Proyecto Red | `proyectored` | `#7F1D1D` | Integrador de sistemas |

Cadena de navegación L4 (`ol-case-next`): Gama → MESECI → LGA → MANEXT → BOMBERO.MX → Proyecto Red → (sector). Cada caso enlaza al anterior y siguiente.

**Reglas reforzadas L4 (2026-04-26):**
- `aria-hidden="true" focusable="false"` en SVG decorativos (40+ por caso). Aplicado retroactivamente en Gama y MANEXT.
- Plural consistente en chips: `Formularios B2B` (nunca singular).
- JSON-LD enriquecido: `Organization` del cliente como nodo `@id` separado con `brand[]`/`areaServed`/`knowsAbout`.
- Cards y showcases del L3 enlazan a la URL interna del L4 (excepto e-commerce que mantiene link externo).
- CTA uniforme en cards/showcases del L3: "Ver caso →" / "Ver caso".
- Testimoniales del L3: nombre del cliente envuelto en `<a>` interno con `border-bottom` color de acento (40% alpha).

**Documentación canónica L4:**
- `/_docs/33 — Layout L4 — Caso de Estudio (...).md` — plantilla, anatomía, reglas de oro.
- `/_docs/34 — L4 Casos en operación · Roster y enlaces.md` — roster vivo, cadena, convenciones de imágenes, variantes por modelo.

**Pendiente (lower priority):**
- Portafolio root + sector tienen ~640L de mockups de browser específicos. Pueden mantenerse o extraerse como `.ol-mock-*` en una sesión futura.
- Páginas legales (/terminos, /aviso-de-privacidad, /gracias) tienen 23L cada una de prose styles legacy. Considera extraer `.ol-legal-prose` si se va a crear más legales.
- Template `_docs/L3-TEMPLATE.html` se mantiene como referencia con bloque pricing removido. No es página live.
- Migrar JSON-LD de Gama y MANEXT al patrón "Organization separado" usado en BOMBERO.MX.
