# Diagnóstico — PODIUMEX
> Propósito: Sitio estático Astro (28 páginas + blog) de renta y venta de podiums profesionales (acrílico/madera/combinados) en México, con personalización por grabado láser, entrega 24h y un sistema de schema JSON-LD centralizado en una única fuente de verdad.

## Identidad
- **Negocio/dominio:** PODIUMEX · `https://podiumex.com` (`astro.config.mjs` línea `site:`; `src/data/schema.ts:15`). Empresa real fundada 2020 (`schema.ts:18`), domicilio Av. Tamaulipas 150-1301B, Condesa, CDMX 06140 (`schema.ts:23-29`), tel/WhatsApp `+525516567973` (display `55 1656 7973`), email `podiumexmx@gmail.com` (`schema.ts:16-17`). CNAME `podiumex.com` (`CNAME`).
- **Tipo de sitio:** Catálogo de renta+venta de producto + servicios + blog SEO. Multipágina estática. Conversión vía WhatsApp (botón flotante con tooltip + badge "1") y `tel:` — sin carrito/backend. Evidencia: `src/layouts/Layout.astro:117-135` (WhatsApp float a `wa.me/525516567973`).
- **ARQUETIPO: B — renta/eventos** (con fuerte componente A de catálogo de producto técnico). Justificación: el modelo es renta+venta de podiums para eventos, con páginas dedicadas `renta-de-podiums.astro` y `venta-de-podiums.astro`; 8 fichas de producto por material/tamaño (`src/pages/catalogo/*.astro`); schema `Service`+`Product`+`Offer`+`LocalBusiness` con `areaServed` multi-ciudad (`schema.ts:30-38`); servicios de eventos (`asesoria-de-eventos.astro`, `setup-para-streaming.astro`, `entrega-e-instalacion.astro`). El eje "renta para eventos" + servicios asociados domina sobre el catálogo puro → B con A.
- **Estado:** En producción y activo. Build `dist/` reciente (12-jun-2026, 35 entradas). Auditoría propia previa en `AUDITORIA-SITIO.md` (raíz) + `_docs/` (7 archivos de estado/roadmap). Repo `github.com/...` (no se inspeccionó `.git/config`).

## Stack
- **Astro `^6.0.4`** (`package.json:8`). Output estático por defecto (sin `output` declarado → SSG). `build.assets: '_assets'`, `compressHTML: true` (`astro.config.mjs:6-8,13`).
- **Integrations:** solo `@astrojs/sitemap ^3.7.1` (`astro.config.mjs:10-12`) con `filter` que excluye `/dist/`.
- **CSS:** **NO Tailwind.** CSS propio: `src/styles/global.css` (333 l., `:root` con todos los tokens + `@font-face` Inter self-hosted-via-gstatic), `ix-system.css` (308 l., sistema de interacciones/secciones "ix"), `fullwidth.css` (155 l.). Cargados en orden en `Layout.astro:1-3`.
- **TypeScript** strict (`tsconfig.json` extiende `astro/tsconfigs/strict`, excluye `dist`).
- **Adapter:** ninguno (SSG puro).
- **Deploy:** **GitHub Pages** vía `.github/workflows/deploy.yml` (Node 22, `npm ci` + `astro build` + `upload-pages-artifact` + `deploy-pages`, branch `main`).

## Estructura de carpetas
```
PODIUMEX/
├── astro.config.mjs · tsconfig.json · package.json · site.webmanifest
├── .github/workflows/deploy.yml        ← CI GitHub Pages
├── src/
│   ├── data/     schema.ts (NAP + constructores Schema.org — FUENTE ÚNICA) · faqs.ts
│   ├── content.config.ts                ← colección blog (Zod)
│   ├── content/blog/ (29 .md)
│   ├── layouts/  Layout.astro            ← ÚNICO layout
│   ├── components/ (10: Topbar, Header, Footer, CtaFinal, HelpSection, LinksModule, ProductSidebar, QuickLinks, SectionHeader, WhatsAppButton)
│   ├── pages/    28 .astro (catalogo/ + raíz: renta/venta/servicios/nosotros/blog/...)
│   └── styles/   global.css · ix-system.css · fullwidth.css
├── public/  img/ · js/app.js · favicon/icons · site.webmanifest
├── _docs/        ← 7 .md de documentación propia (estado/arquitectura/SEO/diseño/roadmap)
├── img/ · js/    (duplicados en raíz — artefactos)
├── dist/ · graphify-out/ · .audit/
└── estudio-mercado-podiumex.md · AUDITORIA-SITIO.md · README.md
```
⚠️ Hay `img/` y `js/` también en la **raíz** del repo (además de `public/`) — probable duplicación/residuo.

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `Layout` | `src/layouts/Layout.astro` | **Ninguna** — único layout, raíz | `title*`, `description*`, `canonical*`, `ogType?`, `ogImage?`, `ogImageAlt?`, `schema?` (string), `noindex?`, `breadcrumbSchema?` | TODAS las páginas. `<head>` SEO completo + 3 JSON-LD: `globalGraph()` (LocalBusiness+WebSite, siempre), `schema` por página (condicional), `breadcrumbSchema` (condicional). Body: skip-link + `Topbar` + `Header` + `<main><slot/></main>` + `LinksModule` + `Footer` + botón scroll-top + **WhatsApp float** + `js/app.js`. |

Único layout; las páginas pasan su `schema` ya serializado como string. Patrón limpio.

## Componentes — inventario
| Componente | Ruta | Props | Uso |
|---|---|---|---|
| `Topbar` | `components/Topbar.astro` | — | Barra superior (en Layout) |
| `Header` | `components/Header.astro` | — | Nav principal sticky (en Layout) |
| `Footer` | `components/Footer.astro` | — | Pie (en Layout) |
| `LinksModule` | `components/LinksModule.astro` | — | Módulo de enlaces internos pre-footer (en Layout) — internal linking |
| `WhatsAppButton` | `components/WhatsAppButton.astro` | — | (existe como componente; el float también está inline en `Layout.astro:117-135`) |
| `CtaFinal` | `components/CtaFinal.astro` | (CTA de cierre) | Páginas de catálogo/servicios |
| `ProductSidebar` | `components/ProductSidebar.astro` | (sidebar de ficha) | Fichas de catálogo |
| `QuickLinks` | `components/QuickLinks.astro` | (enlaces rápidos) | Navegación lateral/contextual |
| `HelpSection` | `components/HelpSection.astro` | (bloque de ayuda/contacto) | Páginas de soporte/servicio |
| `SectionHeader` | `components/SectionHeader.astro` | (encabezado de sección) | Transversal |

## Content Collections / esquemas / taxonomías
`src/content.config.ts` define **1 colección** (`blog`, `glob()` loader, Zod estricto):
- `title` max 65 · `description` max 160 · `pubDate` (coerce date) · `updatedDate?` · `author` (default PODIUMEX) · `category` **enum cerrado de 6** [Guías, Comparativas, Consejos, Tendencias, Organización de Eventos, Personalización] · `tags` array · `image` + `imageAlt` (obligatorios) · `featured` bool · `draft` bool. (`content.config.ts:6-26`).
- **29 artículos** `.md` (`src/content/blog/`).

**Generación de páginas:**
- `blog/[slug].astro` → `getStaticPaths` desde colección `blog`; emite `BlogPosting` (`schema.ts` provee constructor).
- `blog/index.astro` → índice de blog.
- **Catálogo:** 8 fichas **estáticas** `.astro` (`catalogo/acrilico-negro.astro`, `acrilico-transparente`, `madera-caoba-acrilico`, `podium-madera-negro` + variantes `-compacto`) — NO colección; cada una emite `Product`/`Offer` vía constructores de `schema.ts`.
- **Servicios/landing:** ~15 páginas estáticas (`renta-de-podiums`, `venta-de-podiums`, `personalizacion-total`, `setup-para-streaming`, `asesoria-de-eventos`, `entrega-e-instalacion`, `financiamiento`, `mantenimiento`, `soporte-tecnico`, `sustentabilidad`, `nosotros`, `contacto`, `testimonios`, `preguntas-frecuentes`, `servicios`). Total **28 páginas .astro**.

## SEO real
- **Metas (todas en `Layout.astro:44-89`):** title, description, robots (`index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1` o `noindex,nofollow`), author, `language es-MX`, canonical (absoluta `${siteURL}${canonical}`), **OG completo** (type, url, title, description, image 1200×630 + `og:image:alt`, locale es_MX, site_name), **Twitter** `summary_large_image` (+ `@podiumex`, image:alt), favicons + manifest, theme-color `#0a1628`, `format-detection telephone=no`, preconnect `wa.me` + dns-prefetch fonts. ⚠️ **Sin geo.* meta tags, sin hreflang** (la geo vive solo en el JSON-LD LocalBusiness).
- **Schema JSON-LD (centralizado en `src/data/schema.ts` — "Fuente ÚNICA de verdad"):** constructores que devuelven strings. Tipos definidos: `LocalBusiness` (`@id #business`), `WebSite` (`@id #website`), `Service`+`ServiceChannel`, `Product`+`Offer`+`Brand`, `BreadcrumbList`, `FAQPage`+`Question`+`Answer`, `CollectionPage`+`ItemList`, `BlogPosting`, `WebPage`, `GeoCoordinates`, `PostalAddress`, `OpeningHoursSpecification` (×2), `AdministrativeArea` (×2), `ImageObject`. `globalGraph()` inyecta LocalBusiness+WebSite en TODAS las páginas (`Layout.astro:91`).
- ✅ **Sin `AggregateRating`/reviews fabricados** en `schema.ts` (`grep` aggregateRating/reviewCount/ratingValue = 0) — a diferencia de BRINCOLINS/MESECI; políticamente correcto frente a Google.
- **URLs:** kebab-case, canonicals absolutas con paths sin trailing slash forzado (el `canonical` prop se concatena tal cual; las páginas pasan rutas con/sin slash según convención propia).
- **Internal linking:** `LinksModule` (pre-footer), `QuickLinks`, `ProductSidebar`, breadcrumbs por página (`breadcrumbSchema`). Robusto.
- **Sitemap/robots:** sitemap generado por `@astrojs/sitemap` (filtra `/dist/`). `public/robots.txt`: `User-agent: *` / `Disallow:` (permite TODO). ⚠️ **No bloquea bots de IA** (sin GPTBot/CCBot/ClaudeBot) — a diferencia de MESECI/EVENTECH/MESASPICNIC.

## Sistema de diseño
- **Tokens** en `src/styles/global.css` `:root`: paleta **lujo/corporativa** — `--primary #0a0a0a` (negro) + `-light #1a1a1a`/`-medium #2a2a2a`, `--secondary #fafafa`, `--accent #b8860b` (oro/dorado) + `-light #d4a634`/`-dark #8b6914`, `--blue #1e40af`/`-light #3b82f6`, escala de texto `--text #1a1a1a … -muted #9a9a9a`, `--success #059669`, bordes `#e0e0e0`. theme-color `#0a1628` (azul muy oscuro). Estética negro + dorado = posicionamiento premium.
- **Tipografía:** **Inter** self-hosted vía `@font-face` apuntando a `fonts.gstatic.com` woff2 (`global.css:5`, weight 300–700, `font-display:swap`). `--font` Inter + system fallback.
- **Sistema "ix":** `src/styles/ix-system.css` (308 l.) — sistema propio de interacciones/secciones (nombre `ix-system`); `fullwidth.css` para secciones a ancho completo.
- **UI base / patrones:** Hero (en páginas, no componente único aparente). **Cards:** producto (catálogo) + `ProductSidebar`. **CTA:** `CtaFinal` + `HelpSection`. **WhatsApp:** float global (`Layout.astro`, tooltip "Cotiza por WhatsApp" + badge "1"). **Breadcrumbs:** schema por página (`breadcrumbSchema` prop). **Scroll-top:** botón flotante (`Layout.astro:111`).

## Convenciones
- **Componentes:** PascalCase, planos en `src/components/` (sin subcarpetas).
- **Páginas:** kebab-case = slug = keyword (`renta-de-podiums`, `acrilico-negro-compacto`). Catálogo en `catalogo/`.
- **Schema:** **fuente única `src/data/schema.ts`** con NAP `SITE` `as const` + constructores que devuelven strings JSON listos para `set:html` — patrón muy limpio (cada página importa el constructor que necesita y lo pasa como prop `schema`). FAQs centralizadas en `src/data/faqs.ts`.
- **CSS:** tokens sin prefijo de marca (`--primary`, `--accent`); sistema `ix-` para interacciones.

## Flujos / procesos
1. **Contenido blog:** `.md` con frontmatter Zod (enum categoría) → `blog/[slug]` → `BlogPosting`.
2. **Catálogo/servicios:** páginas estáticas `.astro` que importan constructores de `schema.ts` y pasan `schema`+`breadcrumbSchema` al Layout.
3. **Conversión:** WhatsApp float + `tel:` + CTAs (`CtaFinal`). Sin formulario con backend ni CRM.
4. **Deploy:** push a `main` → GitHub Actions → GitHub Pages.

## Integraciones
| Servicio | Estado | Evidencia |
|---|---|---|
| **GitHub Actions / Pages** | ✅ Activo | `.github/workflows/deploy.yml` |
| **@astrojs/sitemap** | ✅ Activo | `astro.config.mjs:10-12` |
| **Google Fonts (Inter, self-hosted via gstatic)** | ✅ Activo | `global.css:5` (`@font-face`) |
| **WhatsApp** | ✅ Activo (links wa.me) | `Layout.astro:117-135`, `schema.ts:16` |
| **Cloudflare / wrangler / n8n / fal.ai / Brevo / formsubmit / analytics (GA/rybbit/gtag/dmchamp/truconversion) / exactdn** | ❌ HUECO: sin evidencia | `grep` sin resultados en `src/` ni config |

## Documentación previa (propia)
**No es un obsidian-vault formal**, sino `_docs/` con **7 archivos .md** de gestión + 2 .md sueltos en raíz:
- `_docs/00-PROYECTO-ESTADO.md` — estado del proyecto.
- `_docs/01-ARQUITECTURA-ASTRO.md` — arquitectura Astro (layout, componentes, schema).
- `_docs/02-PAGINAS-INVENTARIO.md` — inventario de páginas.
- `_docs/03-SEO-MARKETING.md` — estrategia SEO/marketing.
- `_docs/04-DISENO-SISTEMA.md` — sistema de diseño (tokens, ix-system).
- `_docs/05-PENDIENTES-ROADMAP.md` — backlog/roadmap.
- `_docs/catalogo-imagenes-galeria-eventos.md` — catálogo de imágenes.
- Raíz: `AUDITORIA-SITIO.md` (auditoría técnica propia) + `estudio-mercado-podiumex.md` (42 KB, estudio de mercado de podiums).

**Reutilizable para el Master System (alto valor):**
- **`src/data/schema.ts`** (NAP `as const` + constructores Schema.org que devuelven strings + `@graph` con `@id` reutilizable + `globalGraph()`) — **el patrón de schema más limpio del cluster**, candidato a SOP canónico de structured data (sin reviews fabricadas, multi-ciudad areaServed).
- **Layout único con props `schema`/`breadcrumbSchema` por página** — plantilla de cabecera SEO reutilizable.
- **Esquema Zod blog estricto** (max-length en title/description, enum cerrado de categorías, imagen+alt obligatorios) — plantilla de `content.config.ts`.
- **Estructura `_docs/ 00–05`** (Estado → Arquitectura → Inventario → SEO → Diseño → Roadmap) — modelo simple de documentación de proyecto.

## Clasificación
### ✅ Funciona
- **Schema centralizado ejemplar:** `src/data/schema.ts` como fuente única de NAP + constructores que devuelven JSON, `globalGraph()` sitewide, `@id` reutilizable, **sin AggregateRating fabricado** — `src/data/schema.ts`.
- `<head>` SEO completo y correcto (canonical, OG con `og:image:alt`, Twitter, robots configurable) — `src/layouts/Layout.astro:44-95`.
- Content Collection blog con Zod estricto (max-length + enum + imagen/alt obligatorios) — `src/content.config.ts`.
- Documentación propia ordenada (`_docs/` 7 archivos) + estudio de mercado.

### ❌ Falla
- **Catálogo NO data-driven:** 8 fichas como `.astro` estáticos individuales (`src/pages/catalogo/*.astro`) en vez de Content Collection → duplicación y mantenimiento manual (contrasta con su propia colección de blog).
- **`img/` y `js/` duplicados en la raíz** del repo además de `public/` — residuo/ruido que infla el repo — `PODIUMEX/img/`, `PODIUMEX/js/`.
- **robots.txt no bloquea bots de IA** (permite todo) — inconsistente con la política del resto del cluster — `public/robots.txt`.
- **Sin geo.* ni hreflang** en metas (solo en JSON-LD) — `Layout.astro` head.

### 🤖 Automatizable
- Migrar las 8 fichas de catálogo a una **Content Collection `productos`** (Zod: material, medidas, precio, imágenes) + `catalogo/[slug].astro` con constructor `Product` de `schema.ts` → elimina duplicación.

### 📐 Estandarizable
- **`schema.ts` (NAP `as const` + constructores Schema.org + `globalGraph()`)** como SOP canónico de structured data del Master System — el mejor del portafolio para este fin.
- **Layout único + props `schema`/`breadcrumbSchema`** como plantilla de cabecera SEO.
- **Esquema Zod blog (max-length + enum + imagen/alt obligatorios)** como plantilla de `content.config.ts`.

## ⚠️ HUECOS
- **HUECO: catálogo estático vs colección.** No verifiqué si las 8 fichas comparten un parcial/include o están 100% duplicadas; el patrón sugiere duplicación pero no abrí las 8.
- **HUECO: componente `WhatsAppButton` vs float inline.** Existe `components/WhatsAppButton.astro` Y un float inline en `Layout.astro` — no confirmé cuál se usa realmente (posible componente huérfano).
- **HUECO: `img/`+`js/` en raíz.** No determiné si son residuo de migración o sirven a algo (parecen redundantes con `public/`).
- **HUECO: integraciones externas.** Sin evidencia de n8n/fal.ai/Brevo/Cloudflare/analytics; se asume no integradas (sitio capta por WhatsApp/tel únicamente).
- **HUECO: cobertura de muestreo.** Leí Layout, schema.ts (parcial), content.config, tokens, robots, árbol y conteos; las 28 páginas y 10 componentes se inspeccionaron por nombre/uso, no archivo por archivo.
- **HUECO: `.git/config`.** No inspeccioné credenciales del remote (a diferencia de otros proyectos del cluster donde se revisó).
