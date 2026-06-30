# Diagnóstico — EVENTECH
> Propósito: Sitio estático Astro (~242 módulos-página → 578 HTML) de renta integral de equipo para eventos (mobiliario, audio, carpas, iluminación, inflables, catering) en CDMX y México, con un directorio data-driven de 211 salones y blog de 94 posts; respaldado por un obsidian-vault propio con plantillas y convenciones SEO maduras.

## Identidad
- **Negocio/dominio:** EVENTECH — "Renta de Equipo para Eventos en CDMX y México" · `https://eventech.mx` (`astro.config.mjs` `site:`, `CNAME`). Empresa real (legalName "EVENTECH S.A. de C.V.", foundingDate 2024) — `src/data/site.ts` (`SITE.organization`). Email `contacto@eventech.mx`, tel `55 6432 8954`, WhatsApp `525564328954`, geo 19.4326/-99.1332, areaServed [CDMX, Edomex, Zona Metropolitana].
- **Tipo de sitio:** Catálogo de renta de eventos + directorio de salones + blog SEO. Multipágina estática. **Único mecanismo de captación = WhatsApp** (formulario de `cotizar/` sin backend que arma `wa.me?text=` — `src/pages/cotizar/index.astro:319-355`). Sin carrito/pago.
- **ARQUETIPO: B — renta/eventos** (núcleo) **+ D — directorio** (módulo satélite). Justificación: `SITE.tagline` "Renta de Equipo para Eventos", `SERVICE_CATEGORIES` (8 categorías de renta), `EVENT_TYPES` (bodas/XV/corporativos); schema `LocalBusiness`+`Service`+`Offer/PriceSpecification` MXN+`OpeningHoursSpecification`+`GeoCoordinates` (patrón de servicio local de renta, NO Product/SKU de tienda); URLs jerárquicas `/servicios/{cat}/{subcat}/{producto}/` + `/eventos/` + `/zonas/`. El módulo `/directorio/` (211 venues con `EventVenue`/`CollectionPage` schema, búsqueda y filtros) es un directorio D injertado como imán SEO local. No es A (no es catálogo técnico de compra) ni C puro (cubre múltiples zonas).
- **Estado:** En producción, **fuertemente remediado**. `AUDITORIA-SITIO.md` (11-jun-2026, Astro 5.18, 575 páginas): pasó de 6 errores ESLint/172 TS/cientos de issues SEO a 0 errores y build limpio; 49 títulos con doble marca eliminados, 431 títulos ≤60 chars, 114 descripciones ≤160, reseñas self-serving eliminadas del JSON-LD en ~200 páginas, 246 AVIF generados, ~2,250 líneas de CSS muerto eliminadas, `ServiceShowcase` migró 741/771 instancias. **Hallazgo abierto:** 903 refs a `/images/venues/*.jpg` + 128 `.avif` de producto a archivos inexistentes (brecha de fotos reales).

## Stack
- **Astro `^5.7.0`** (`package.json`). Output `static`, `trailingSlash: 'always'`, `compressHTML` implícito, `prefetch` (hover, no prefetchAll), `build.inlineStylesheets: 'auto'`, `vite.cacheDir: /tmp/vite-eventech` (`astro.config.mjs`).
- **Integrations:** `@astrojs/mdx`, **`exactdnRewriter`** (integración propia inline en `astro.config.mjs:7-94`: hook `astro:build:done` reescribe TODA referencia `/images/` y `https://eventech.mx/images/` → CDN `https://ehzpd66uywy.exactdn.com` en HTML/XML/CSS), `@astrojs/sitemap` (filter `/draft/`+`/admin/`, `serialize` con prioridades por nivel L1–L5/eventos/zonas/directorio/blog). También `@astrojs/rss` declarado. `image.domains: [eventech.mx, ehzpd66uywy.exactdn.com]`.
- **CSS:** **NO Tailwind.** CSS propio: `src/styles/` 11 archivos, **8,820 líneas** (`directorio.css` 3081, `home-2026.css` 1354, `directorio-2026.css` 1159, `blog-2026.css` 677, `blog.css` 634, `l3-shared.css` 595, `l4-shared.css` 441, `tokens.css` 136…). Tokens en `tokens.css`. Namespaces `hm-` (home/marketing) y `dr-` (directorio); estilos compartidos por nivel `l3-shared`/`l4-shared`.
- **TypeScript** strict (`tsconfig.json`, alias `@components @layouts @data @utils @styles`). DevDeps: prettier, eslint (+ plugin astro), `@astrojs/check`. Script `validate:mdx` corre antes de `build`.
- **Adapter:** ninguno (SSG puro).
- **Deploy:** **GitHub Pages** vía `.github/workflows/deploy.yml` (**branch `master`**, Node 20, `npm ci` + build + `configure-pages` + `upload-pages-artifact` + `deploy-pages`).

## Estructura de carpetas
```
EVENTECH/
├── astro.config.mjs (con exactdnRewriter inline) · package.json · tsconfig.json · eslint.config.mjs · CNAME
├── AUDITORIA-SITIO.md · AUDITORIA-SEO-propuestas.xlsx · EVENTECH-Estudio-Inflables-...docx · _propuesta-home.html · _seocheck.{cjs,mjs}
├── .github/workflows/deploy.yml        ← CI GitHub Pages (branch master)
├── scripts/                            ← validate-mdx.mjs, install-hooks.sh, upgrade-layout.mjs (77 KB)
├── src/
│   ├── layouts/   6: BaseLayout · PageLayout · ServiceLayout · ZoneLayout · EventLayout · BlogLayout (823 l.)
│   ├── components/ 29 raíz + blog/ (8) + directorio/ (6) = 43 .astro + 2 barrels (index.ts)
│   ├── pages/     242 .astro (8 dinámicas [...slug] + ~228 index.astro estáticas de /servicios/)
│   ├── data/      site.ts (25 KB, FUENTE ÚNICA) · navigation.ts · inflables-juegos.ts (32 KB, data-driven)
│   ├── utils/     seo.ts (13 KB, 10 generadores JSON-LD) · interlinking.ts (11 KB) · helpers.ts
│   ├── styles/    11 CSS (8,820 l.)
│   └── content/   6 colecciones + config.ts (550 l.)
├── public/  robots.txt · fonts/ · images/ · favicon/manifest
├── docs/                               ← obsidian-vault propio (16 .md, ver sección)
├── reference-photos/ (150) · _auditoria-capturas/ (16) · dist/ (578 HTML)
```

## Layouts — jerarquía
Todos heredan de `BaseLayout`. Patrón consistente: BaseLayout arma `<html>/<head>` + JSON-LD global; los demás añaden Topbar/Header/Footer y hero opcional.

| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout` (84 l.) | `src/layouts/BaseLayout.astro` | **Raíz** | `SEOProps & { jsonLd?[] }` | `<html lang=es-MX>`, `<head>` (favicon, manifest, theme-color, preconnect+fuente Cormorant, `<SEOHead>`, JSON-LD), skip-link, **script inline ExactDN** (reescribe `img[src^=/images/]` en cliente salvo localhost), `<slot/>` |
| `PageLayout` (30 l.) | `src/layouts/PageLayout.astro` | BaseLayout | `+ jsonLd` | Topbar+Header+slot breadcrumbs+`<main>`+Footer (layout estándar) |
| `ServiceLayout` (107 l.) | `src/layouts/ServiceLayout.astro` | BaseLayout | `+ hero?, jsonLd` | Topbar+Header+`<HeroPage>`+slot prose+Footer |
| `ZoneLayout` (99 l.) | `src/layouts/ZoneLayout.astro` | BaseLayout | igual a ServiceLayout | **~95% duplicado de ServiceLayout** |
| `EventLayout` (109 l.) | `src/layouts/EventLayout.astro` | BaseLayout | `+ breadcrumbItems?` | igual + `<Breadcrumbs>` |
| `BlogLayout` (823 l.) | `src/layouts/BlogLayout.astro` | (monolítico, 32 KB) | — | Layout pesado del blog |

⚠️ ServiceLayout/ZoneLayout/EventLayout comparten ~95% del código (bloque prose copy-pasteado) — candidato a consolidación en un layout parametrizado.

## Componentes — inventario
43 `.astro` + 2 barrels. Representativos:

| Componente | Ruta | Props | Uso |
|---|---|---|---|
| `ServiceShowcase` | `components/ServiceShowcase.astro` (43 l.) | (zig-zag de producto) | **212 páginas** — el patrón reutilizable más extendido |
| `HeroPage` | `components/HeroPage.astro` (239 l.) | `badge?, title(set:html), subtitle, primaryCTA, secondaryCTA?, cards?[]` | Hero 2-columnas estándar (Service/Zone/Event layouts) |
| `Card` | `components/Card.astro` (160 l.) | `name, excerpt, cta, href, icon?, image?, badge?` | Tarjeta servicio/evento; hubs y listados |
| `FaqSection` | `components/FaqSection.astro` (222 l.) | `items[], phone?, email?, schedule?, serviceName?` | FAQ acordeón + bloque contacto → `/cotizar/` |
| `Breadcrumbs` | `components/Breadcrumbs.astro` (83 l.) | `items: {label, href?}[]` | Migas (oro `#c2a24a`); vía slot breadcrumbs |
| `SEOHead` | `components/SEOHead.astro` (54 l.) | `SEOProps` | Emite TODAS las metas del head |
| `JsonLd` | `components/JsonLd.astro` (21 l.) | array jsonLd | Emisor de `<script ld+json>` |
| `VenueCard` | `components/directorio/VenueCard.astro` | `venue(CollectionEntry), typeLabel, location?` | Tarjeta de salón en directorio |
| `CTABanner` | `components/CTABanner.astro` (22 l.) | (variant) | **DESACTIVADO** — no renderiza; ~200 llamadas vivas quedaron no-op |
| `Nav`(709), `Footer`(614), `DirectorySearch`(565), `RelatedContent`(394), `ContentWithSidebar`(338) | `components/*` | — | Nav/footer/búsqueda directorio/related/sidebar |

⚠️ **No hay botón WhatsApp flotante** (bubble). WhatsApp aparece en Topbar, Footer, HeroHome, FaqSection y sobre todo en el formulario de `cotizar/`. El único `position:fixed` es la Topbar.

## Content Collections / esquemas / taxonomías
`src/content/config.ts` (550 l., Zod) — **6 colecciones**:
| Colección | Archivos | Esquema / taxonomías |
|---|---|---|
| **venues** | **211** .md | El más rico: `region` enum [cdmx, estado-mexico]; `type` enum 13 (salon/jardin/hacienda/terraza/hotel/restaurante/foro/quinta/mansion/centro-convenciones/rooftop/playa/club-privado); `amenities` enum 22; `servicesIncluded` enum 14; `eventTypes` enum 22; capacity, priceRange [$..$$$$], schedule, reviews, premium/verified/featured |
| **blog** | **94** (92 .md + 2 .mdx) | `category` enum [bodas, xv-anos, corporativos, tendencias, guias, tips, casos-exito]; tags, date, faqs, relatedServices/Events/Posts, draft/featured |
| **eventos** | 4 (bodas, xv-anos, corporativos, fiestas-infantiles) | serviceSections, styles, stats, faqs, hero |
| **servicios** | 1 (mobiliario/index.md) | `category` enum 7; pricing (unit enum), specs, includes, subServices, faqs, isHub, hero |
| **zonas** | 1 (cdmx/index.md) | `type` enum [ciudad, estado, alcaldia, municipio, zona]; geo (postalCodes), venues, delivery, subzones |
| **pages** | 1 (nosotros.md) | title, description, image, noindex, hero |

`heroSchema` reutilizable compartido por servicios/eventos/zonas/pages.

**Generación de páginas (3 mecanismos coexisten):**
1. **getStaticPaths desde colección:** `directorio/[...slug].astro` (211 venues → región+zona+venue), `blog/[...slug]`+`blog/[...page]` (paginate 9), `eventos/[...slug]`, `zonas/[...slug]`, `[...slug]` raíz (pages), `servicios/[...slug]` (excluye `mobiliario` que tiene página estática).
2. **Páginas estáticas hand-written (la mayoría):** ~228 `index.astro` del árbol `/servicios/` con FAQs/specs/galería/schema **inline** en cada archivo (ej. `servicios/mobiliario/sillas/tiffany/dorada-champagne/index.astro` — 5 FAQs + 10 specs hardcodeadas).
3. **Data `.ts`:** `src/data/inflables-juegos.ts` (22 entradas) → hub `juegos-infantiles/` + fichas L5 `[slug]/index.astro`. Único `data/*.ts` que genera rutas (prueba de concepto data-driven).

## SEO real
- **Metas:** armadas en `SEOHead.astro` (delegado por BaseLayout), resueltas con `utils/seo.ts` (`resolveSEO`, `canonicalURL`, `formatTitle`) + defaults de `site.ts`. Incluye title, description, robots (`max-snippet:-1, max-image-preview:large, max-video-preview:-1` o noindex), canonical absoluta con trailing slash, **OG completo** (+ `article:published_time/modified_time`), **Twitter** `summary_large_image` (@eventechmx), `<link alternate>` RSS. ⚠️ **Sin hreflang, sin meta geo.*** (la geo vive solo en JSON-LD).
- **Schema JSON-LD:** emisor `JsonLd.astro`; 10 generadores en `utils/seo.ts`. Grafo base en TODAS las páginas (BaseLayout): `Organization`(#organization), `WebSite`(#website), `LocalBusiness`(#localbusiness, con anti-duplicado si la página inyecta uno propio). Tipos: Service, EventVenue, FAQPage, ItemList, CollectionPage, BreadcrumbList, Article, ContactPage, Place, Offer, PriceSpecification, OpeningHoursSpecification, GeoCoordinates, AggregateRating, etc. Service+Breadcrumb+FAQ → servicios; EventVenue+CollectionPage+ItemList → directorio; Article → blog.
- ✅ **Reseñas/`aggregateRating` deliberadamente desactivadas** en `serviceWithReviewJsonLd` (`utils/seo.ts:216-223`) con comentario "Google prohíbe reseñas self-serving" — emite Service SIN rating. Coherente con la remediación de `AUDITORIA-SITIO.md`. (Contrasta con BRINCOLINS/MESECI que sí las fabrican.)
- **Componente SEO dedicado:** `SEOHead.astro` + `JsonLd.astro` (no hay carpeta `components/seo/`).
- **robots.txt** (`public/robots.txt`): Allow /, Disallow `/draft/`+`/api/`. **Bloquea bots IA explícitamente** (GPTBot, CCBot, Google-Extended, anthropic-ai → Disallow /). Sitemap → `sitemap-index.xml`.
- **URLs:** kebab-case, `index.astro` por carpeta = jerarquía, trailing slash siempre.
- **Internal linking:** `Nav` (709 l.), breadcrumbs, `RelatedContent` (394 l.), `interlinking.ts` (11 KB), `DirectorySearch`. Muy desarrollado.

## Sistema de diseño
- **Tokens** en `src/styles/tokens.css` (136 l., `:root`): paleta **navy premium + teal + oro** — `--color-primary #1a1a2e` (+ light/dark), `--color-accent #0a8266` (teal CTA, hover/light), `--color-gold #c2a24a` (premium 2026), `--color-ivory #faf8f4`, `--color-hairline #e7e1d6`, `--color-cta #D92D2D` (coral urgente), `--color-highlight #FFD93D`. Escala tipográfica fluida `clamp()`. Comentario remite a `docs/ESTUDIO-COLORES.md`.
- **Tipografía:** sans = system-ui; **display = Cormorant Garamond** (Google Fonts, preconnect en BaseLayout, weights 500/600). `typography.css` (248 l.). Carpeta `public/fonts/` (contenido no inventariado — HUECO).
- **UI base / patrones:** Hero `HeroPage`/`HeroHome`. Cards `Card`/`CategoryCard`/`ProductCard`/`VenueCard`. CTA `CtaBar`/`CTA` (`CTABanner` desactivado). Breadcrumbs scoped (oro). FAQ `FaqSection`+`blog/FAQ`+`directorio/DirectoryFAQ`. WhatsApp = deep-link en `cotizar/` (sin bubble flotante).

## Convenciones
- **Naming:** componentes/layouts PascalCase; páginas/slugs kebab-case con `index.astro` por carpeta (estructura = URL); rutas dinámicas `[...slug]`/`[param]`; colecciones `.md` kebab-case.
- **Config centralizada:** **`src/data/site.ts`** (FUENTE ÚNICA). Exporta `SITE` (name, url, locale, seo con `titleMaxLength 60` + `titleTemplate`, social, contact con phone/phoneRaw/whatsapp, organization legalName/foundingDate, business priceRange/openingHours/geo/areaServed), `SERVICE_CATEGORIES`(8), `EVENT_TYPES`(8), `FEATURES`(8), `REVIEWS`(12, todas B2B de aliados con dominio real), `LOCATIONS`(4 oficinas con rating Google). `navigation.ts`: mainNav/footerNav.
- **Convención SEO documentada:** prohibido "EVENTECH" en `<title>`; `formatTitle` añade complemento solo si cabe ≤60 chars, flag `rawTitle` para título exacto (`utils/seo.ts:22-27`).

## Flujos / procesos
1. **Contenido:** venue/post/evento en `.md` con frontmatter Zod → `getStaticPaths` → schema. Servicios L4/L5 = páginas estáticas con datos inline.
2. **Conversión:** formulario `cotizar/` (sin backend) arma `wa.me?text=` con `define:vars` — único lead capture.
3. **CDN:** doble ExactDN (build-time `exactdnRewriter` + script cliente en BaseLayout).
4. **Calidad:** `validate:mdx` pre-build, `install-hooks.sh`, `_seocheck.{cjs,mjs}`.
5. **Deploy:** push a `master` → GitHub Actions → GitHub Pages.

## Integraciones
| Servicio | Estado | Evidencia |
|---|---|---|
| **GitHub Actions / Pages** | ✅ Activo | `.github/workflows/deploy.yml` (branch master), `CNAME` |
| **ExactDN** (CDN imágenes) | ✅ Activo | `astro.config.mjs:7-94` (exactdnRewriter, CDN `ehzpd66uywy.exactdn.com`) + script cliente `BaseLayout.astro:64-75` + `image.domains` |
| **@astrojs/mdx, sitemap, rss** | ✅ Activo | `astro.config.mjs`, `package.json` |
| **WhatsApp** | ✅ Activo (lead capture) | `cotizar/index.astro:319-355` |
| **Google Fonts (Cormorant)** | ✅ Activo | `BaseLayout.astro` |
| **Cloudflare / wrangler / n8n / fal.ai / Brevo / formsubmit / analytics (GA/rybbit/gtag/GTM/dmchamp)** | ❌ HUECO: sin evidencia | `grep` solo falsos positivos (texto "Dashboard analytics" en blog, "G-" en cuerpo). **NO hay tag de analítica instalado** |

## Documentación previa (obsidian-vault propio): qué cubre, qué es reutilizable
**`docs/` = vault de 16 archivos .md.**
- **Raíz:** `BLUEPRINT-ESTRATEGICO.md` (plan de negocio/TAM/segmentación sector eventos MX), `ESTUDIO-COLORES.md` (psicología del color → justifica navy+oro+coral).
- **`docs/vault-eventech/`:** `00-INDEX.md` (índice + datos del negocio + regla "nunca EVENTECH en title").
  - **SEO/:** `Convencion-de-titulos.md` (patrón `[keyword] | complemento`, ≤60, sin marca), `Meta-descripciones.md` (140–160: qué+para qué+zona+CTA), `Schemas-JSON-LD.md` (grafo @id, anti-duplicado, anti reseñas self-serving).
  - **Componentes/:** `Cards-categoria.md`, `Encabezado-split.md`, `Formulario-whatsapp.md`, `Galeria-hm-feat-g3.md`, `SEOHead-rawTitle.md`.
  - **Contenido/:** `Resenas.md` (política testimonios B2B aliados), `Tono-y-copy.md` ("renta" no "alquiler", es-MX).
  - **Plantillas/:** `Template-L4-hub.md` + `Template-L5-producto.md` (anatomía canónica de hubs y fichas, jerarquía L1–L6).
  - **Registro/:** `Cambios.md` (changelog).
- **`AUDITORIA-SITIO.md`** (raíz): auditoría técnica de 575 páginas (resultados de remediación: 0 errores, títulos/descripciones normalizados, reseñas eliminadas del JSON-LD, ServiceShowcase migrado, hallazgo abierto de 903 imágenes faltantes).

**Reutilizable para el Master System (alto valor):**
- **Plantillas L4-hub / L5-producto** (`docs/vault-eventech/Plantillas/`) — esqueleto canónico de hub y ficha → base de fábrica de sitios arquetipo B.
- **Convenciones SEO** (`Convencion-de-titulos.md`, `Meta-descripciones.md`, `Schemas-JSON-LD.md`) — SOPs de title/description/schema directamente exportables (incluida la regla anti-reseñas-self-serving, la correcta del cluster).
- **`site.ts`** (fuente única con `titleMaxLength`/`titleTemplate`/areaServed/organization) — contrato de identidad estándar, el más completo del cluster.
- **`utils/seo.ts`** (10 generadores JSON-LD con grafo `@id` + anti-duplicado) — librería de schema reutilizable.
- **`Tono-y-copy.md`** + estructura `00-INDEX.md` — modelo de voz de marca y de índice de vault.
- ⚠️ Específicos de EVENTECH (poco portables): `BLUEPRINT-ESTRATEGICO.md`, `Resenas.md`, `Cambios.md`.

## Clasificación
### ✅ Funciona
- **Arquitectura SEO centralizada y disciplinada:** `site.ts` (fuente única) + `utils/seo.ts` (10 generadores JSON-LD, grafo @id, anti-duplicado LocalBusiness, **supresión consciente de reseñas self-serving**) + `SEOHead.astro`; robots bloquea bots IA; sitemap con prioridades por nivel — `src/data/site.ts`, `src/utils/seo.ts`, `astro.config.mjs:115-152`.
- **Directorio data-driven de venues:** 211 salones en 3 niveles desde colección con Zod rico (enums de type/amenities/eventTypes), con EventVenue/CollectionPage/ItemList — `src/pages/directorio/[...slug].astro`, `src/content/config.ts`.
- ExactDN doble (build + cliente) bien encapsulado — `astro.config.mjs:7-94`.
- Pipeline de calidad (validate:mdx pre-build, eslint, _seocheck) + vault con plantillas — `scripts/`, `docs/`.

### ❌ Falla
- **Imágenes rotas masivas:** 903 refs `/images/venues/*.jpg` + 128 `.avif` de producto a archivos inexistentes — `AUDITORIA-SITIO.md §3.4b`. El mayor impacto visual, sin resolver.
- **Catálogo de servicios NO data-driven:** ~228 `index.astro` con FAQs/specs/galería/schema inline (ej. `servicios/mobiliario/sillas/tiffany/dorada-champagne/index.astro`) → duplicación enorme, inconsistente con el resto que usa colecciones.
- **`CTABanner` desactivado** dejando ~200 llamadas no-op — `src/components/CTABanner.astro`.
- **3 layouts ~95% duplicados** (Service/Zone/Event) — `src/layouts/{Service,Zone,Event}Layout.astro`.
- Sin analítica instalada (no GA/rybbit/GTM) — no se mide tráfico.

### 🤖 Automatizable
- Migrar el árbol estático `/servicios/` a una **colección `productos` data-driven** (como ya se hizo con `inflables-juegos.ts` + `[slug]`): generar las ~228 leaf desde frontmatter/`.ts` con un único `[...slug].astro`, eliminando duplicación de specs/FAQ/schema. La prueba de concepto ya existe — `src/data/inflables-juegos.ts`.

### 📐 Estandarizable
- **Plantillas del vault** (`Template-L4-hub.md`, `Template-L5-producto.md`) + **convenciones SEO** (títulos/descripciones/schemas) + `site.ts` como esquema → **kit de arranque replicable** para sitios de servicio/catálogo local.
- **`utils/seo.ts` (generadores JSON-LD con @id + anti-duplicado + anti-reseñas)** como librería de schema canónica del Master System.
- Consolidar Service/Zone/Event en un único layout parametrizado.

## ⚠️ HUECOS
- **HUECO: 903 imágenes faltantes.** Brecha de fotos reales de venues/productos (auditoría 11-jun); estado actual de `public/images/` no re-verificado.
- **HUECO: cuerpos no leídos.** `BlogLayout.astro` (823 l.), `ServiceShowcase`/`Nav`/`DirectorySearch`/`RelatedContent`/`interlinking.ts` (solo conteo/uso), campos exactos del form de `cotizar/`, contenido de `public/fonts/`, `scripts/upgrade-layout.mjs` (77 KB).
- **HUECO: analítica.** Sin GA/rybbit/GTM/Pixel → no se puede medir conversión; no confirmé si está pendiente o se mide externamente.
- **HUECO: integraciones externas.** Sin evidencia de n8n/fal.ai/Brevo/Cloudflare; se asume no integradas.
- **HUECO: muestreo.** Proyecto grande (242 módulos-página, 578 HTML): las ~228 páginas de servicios y 211 venues se inspeccionaron por patrón/muestra (1 por tipo), no archivo por archivo.
