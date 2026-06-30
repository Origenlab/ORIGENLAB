# Diagnóstico — BOMBERO
> Propósito: Sitio de venta de equipo para bomberos certificado NFPA en México (bombero.mx), con catálogo de producto + directorio nacional de estaciones de bomberos de los 32 estados + blog técnico.

## Identidad
- **Negocio/dominio:** BOMBERO.MX — `https://bombero.mx` (CNAME: `BOMBERO/CNAME`). Distribuidor de EPP y equipo contra incendios certificado NFPA. Contacto en CDMX, Col. Condesa (`BOMBERO/src/data/site.ts:77-88`).
- **Tipo de sitio:** Híbrido. Catálogo técnico de producto (e-commerce sin carrito; conversión = WhatsApp + formulario de cotización) + directorio/contenido programático masivo (estaciones por estado/municipio/especialidad) + blog editorial.
- **ARQUETIPO tentativo:** **A (catálogo producto/servicio técnico)** como eje comercial dominante, **fusionado con D (contenido/directorio)** como motor de captación SEO. Justificación: el catálogo (`src/pages/productos/`, 16 categorías, 114 variantes JSON) es el objetivo de negocio y todo CTA empuja a `/cotizar/` o WhatsApp; pero el grueso de páginas (~700 fichas de estación + hubs municipio/especialidad, ver `src/pages/sitemap-directorio.xml.ts:9`) es un directorio tipo-D que funciona como red de captura de tráfico local que enlaza al catálogo. NO es B (renta/eventos) ni C puro (servicio local único): el negocio vende producto a escala nacional. Etiqueta operativa: **"A+D" (catálogo técnico nacional con directorio programático de soporte SEO)**.
- **Estado:** **Vivo y en desarrollo activo.** Commits/ediciones de junio 2026 (mtimes recientes en layouts: `CategoriaLayout.astro`, `ProductL4Layout.astro` editados 16/Jun). Sitio en producción con analítica real (Rybbit + TruConversion).
- **Stack:**
  - **Astro `^5.7.0`** (`BOMBERO/package.json:20`), `output` estático por defecto (sin `adapter` → SSG puro).
  - **Integrations** (`BOMBERO/astro.config.mjs:11-59`): `@astrojs/mdx`, `@astrojs/sitemap` (con `serialize` de prioridades + i18n es-MX). NO usa `@astrojs/rss` como integración pero sí la dependencia para el feed (`src/pages/blog/rss.xml.ts`).
  - **CSS:** SIN Tailwind ni UnoCSS. Sistema de diseño propio con **CSS custom properties** (`src/styles/tokens.css`, 307 líneas) + CSS plano por componente (`<style>` con scope de Astro).
  - **Búsqueda:** Pagefind `^1.4.0` (post-build, indexa solo `blog` y `directorio` — `BOMBERO/package.json:8`).
  - **Otros dep:** `isomorphic-dompurify` (sanitización HTML de blog), `marked` (markdown → HTML en pipeline de blog).
  - **Adapter/output:** estático (SSG). `build.format: "directory"` + `trailingSlash: "always"` (`astro.config.mjs:79,96`).
  - **Deploy detectado:** **DUAL.** (1) GitHub Pages — evidencia: `BOMBERO/.nojekyll`, `BOMBERO/CNAME`, `redirects` HTML de respaldo en `astro.config.mjs:102`. (2) Cloudflare Pages — evidencia: `public/_headers` (CSP, HSTS, cache) y `public/_redirects` (301 nativos), ambos rotulados "Cloudflare Pages". El comentario en `_redirects:7-9` confirma la intención de migrar de GH Pages a CF Pages manteniendo ambos sincronizados.

## Estructura de carpetas
```
BOMBERO/
├── astro.config.mjs            # site, integrations, redirects, sitemap serialize
├── tsconfig.json               # extends astro/strict + alias @components @layouts @data @utils @styles
├── package.json                # build = astro build + pagefind + gen-csp-hashes.mjs
├── CNAME / .nojekyll           # deploy GitHub Pages
├── public/
│   ├── _headers / _redirects   # deploy Cloudflare Pages (CSP, 301)
│   ├── robots.txt              # reglas por bot + GEO (LLMs) + sitemaps
│   ├── llms.txt / llms-full.txt (en dist/) site.webmanifest, fonts/, images/
├── scripts/
│   ├── gen-csp-hashes.mjs      # post-build: hashea scripts inline → CSP estricta
│   ├── extract-producto-data.mjs # migra HTML producto → JSON de colección
│   ├── gen_all.py / gen_compact.py / generate_categories.py  # generadores legacy (Python)
│   └── *.sh                    # subir-cambios, reoptimizar_imagenes
├── docs/                       # ~10 auditorías internas previas (MD)
└── src/
    ├── components/             # 32 componentes + components/directorio/ (8)
    ├── content/
    │   ├── config.ts           # colecciones: pages (md) + productos (json glob)
    │   ├── pages/*.md          # servicios, nosotros, contacto, privacidad, terminos, devoluciones
    │   └── productos/<cat>/<sub>/<variante>.json  # 114 fichas L5
    ├── data/                   # ~60 archivos .ts (núcleo de datos)
    │   ├── site.ts             # SITE global (SEO, contacto, org)
    │   ├── types.ts            # interface Estacion + ESTADOS_MEXICO (32)
    │   ├── navigation.ts       # mainNav, productCategories, footerNav
    │   ├── quick-nav-pools.ts  # pools de enlaces contextuales
    │   ├── estaciones-<estado>.ts  (×32, ~40k líneas totales)
    │   └── blog-*.ts           # blog-articulos.ts (22k líneas) + datasets temáticos
    ├── layouts/                # 10 layouts (jerarquía en sección siguiente)
    ├── pages/
    │   ├── index.astro (home, ~2300 líneas)  404 / 500 / [...slug].astro (md pages)
    │   ├── productos/ (index + 16 categorías .astro + [...slug].astro variantes)
    │   ├── directorio/ (index + 32 estados .astro + 32 [slug].astro + [estado]/{municipios,especialidades})
    │   ├── blog/ ([slug], index, categoria/[categoria], pagina/[page], rss.xml.ts)
    │   ├── api/og/ (estado + estacion → SVG dinámico)
    │   ├── contacto/ cotizar/ nosotros/ (index.astro)
    │   └── sitemap-directorio.xml.ts
    ├── styles/                 # tokens, global, typography, fonts, mobile, mobile-blog, product-l3
    └── utils/                  # seo.ts (625L), directorio-index.ts (352L), cdn.ts, blog-enhance.ts, og-svg.ts, estacion-enrich.ts, helpers.ts
```

## Layouts — jerarquía de herencia
Raíz única `BaseLayout` → `PageLayout` → todos los demás. Verificado por imports (`grep "import .*Layout from"`).

| Layout | Ruta | Hereda / Incluye | Props clave | Uso |
|---|---|---|---|---|
| **BaseLayout** | `src/layouts/BaseLayout.astro` | RAÍZ. `<html>/<head>/<body>`, importa `SEOHead`, `JsonLd`, `WhatsAppFloat`, `BackToTop`; `global.css` + `mobile.css` (import JS). | `SEOProps & { jsonLd?, preloadImage? }` | Cascarón HTML. Inyecta JSON-LD global condicionado por ruta (Organization+WebSite+LocalBusiness solo en `/`; LocalBusiness en `/contacto/`) — `BaseLayout.astro:29-35`. Carga analytics tras 1ª interacción (`:90-126`). |
| **PageLayout** | `src/layouts/PageLayout.astro` | `BaseLayout` + `Header` + `Footer` + `PreFooterNav` + `QuickNav` | `SEOProps & { jsonLd?, showPreFooterNav?, quickNav?, quickNavPool?, preloadImage? }` | Chrome estándar (header/footer/discovery). Auto-detecta `pool` de QuickNav por URL (`:34-40`). Base de TODO el sitio salvo páginas sin chrome. |
| **PageLayout (md)** vía `[...slug].astro` | — | PageLayout | `page.data` de colección `pages` | Renderiza markdown de `src/content/pages/*.md` (servicios, nosotros, privacidad…). |
| **ProductoLayout** | `src/layouts/ProductoLayout.astro` (50 KB) | `PageLayout` + `Breadcrumb`, `CTABar`, `SectionHeader`, `WhyChooseUs`, `CTABanner`, `FAQQuote`, `QuickNav`, `HeroSection` | ~40 props tipados (hero, capas, especificaciones, aplicaciones, certs, sidebar, FAQ, relacionados — interfaces en `:16-90`) | Ficha de producto L5 (variante). Consume JSON de colección `productos`. Emite `productSchemaComplete` + `faqJsonLd` (`:12`). |
| **ProductL4Layout** | `src/layouts/ProductL4Layout.astro` | **`ProductoLayout`** | (extiende props de ProductoLayout) | Nivel intermedio L4 de producto (categoría con ficha enriquecida). Único layout de 2º nivel de herencia. |
| **ProductCategoryLayout** | `src/layouts/ProductCategoryLayout.astro` (4 KB) | `PageLayout` | categoría | Layout ligero de categoría de producto. |
| **CategoriaLayout** | `src/layouts/CategoriaLayout.astro` (19 KB) | `PageLayout` | categoría/listado | Listado de categoría (blog o producto — verificar consumidor). |
| **EstacionLayout** | `src/layouts/EstacionLayout.astro` (**88 KB — el más grande**) | `PageLayout` | `{ estacion, estado, estadosVecinos, estacionesCercanas, eppCards }` + slot `seo-content` | Ficha de estación de bomberos. Emite schema `FireStation`+`EmergencyService`+`GovernmentOrganization`+`HowTo`+`SpeakableSpecification` (`:180-280`). El motor SEO local más rico del sitio. |
| **DirectorioEstadoLayout** | `src/layouts/DirectorioEstadoLayout.astro` (48 KB) | `PageLayout` | estado | Landing de estado (lista estaciones + mapa + interlinking). |
| **BlogLayout** | `src/layouts/BlogLayout.astro` (41 KB) | `PageLayout` | hero, autor, tags, categorias, articulosPopulares, productosRelacionados, directorioLinks, relacionados, breadcrumb… | Artículo de blog. Recibe HTML pre-procesado por `blog-enhance.ts`. |
| **BlogMdxLayout** | `src/layouts/BlogMdxLayout.astro` (8 KB) | `PageLayout` | frontmatter mdx | Artículos en formato `.mdx` (vía `<Content/>`). Coexiste con el sistema `.ts` de `blog-articulos.ts`. |

⚠️ **HUECO/Observación:** existen DOS sistemas de blog en paralelo — el masivo basado en datos TypeScript (`blog-articulos.ts`, 22.395 líneas, consumido por `blog/[slug].astro` + `BlogLayout`) y el de archivos `.mdx` (consumido por `BlogMdxLayout`). No verifiqué qué slugs sirve cada uno ni si hay solape; importa para evitar URLs duplicadas.

## Componentes reutilizables — inventario
(props con tipos donde están declarados; "uso" inferido por imports)

| Componente | ruta | props (nombres+tipos visibles) | dónde se usa | nota |
|---|---|---|---|---|
| SEOHead | `src/components/SEOHead.astro` | `SEOProps` | BaseLayout | Genera title/description/keywords/canonical/OG/Twitter/geo. Núcleo SEO. |
| JsonLd | `src/components/JsonLd.astro` | `{ data: Record<string,unknown> }` | BaseLayout + layouts | Imprime `<script type="application/ld+json">`. Wrapper trivial. |
| Header | `src/components/Header.astro` (31 KB) | — | PageLayout | Header + mega menú (usa `productCategories`). |
| Nav | `src/components/Nav.astro` (19 KB) | data-driven | Header | Navegación principal desde `navigation.ts`. |
| Footer | `src/components/Footer.astro` (16 KB) | — | PageLayout | Footer multi-columna desde `footerNav`. ⚠️ enlaza `/capacitacion/` inexistente. |
| PreFooterNav | `src/components/PreFooterNav.astro` | — | PageLayout | Sección discovery pre-footer. |
| QuickNav | `src/components/QuickNav.astro` | `{ pool, count }` | PageLayout + páginas | Enlaces contextuales por sección (interlinking programático), seed = URL. |
| Breadcrumb | `src/components/Breadcrumb.astro` | `{ items: {label, href?}[] }` | layouts producto/directorio/blog | Auto-añade "Inicio"; emite su PROPIO BreadcrumbList JSON-LD + microdata. |
| HeroSection | `src/components/HeroSection.astro` | `badge, title, subtitle, blocks[]` + slot `left-extra` | home, páginas, hubs | Hero canónico con bloques SEO. |
| CategoryCard | `src/components/CategoryCard.astro` | `title, badge, image, href, buttonText, description, items[]` | home, categorías | Tarjeta de categoría con sub-enlaces. |
| ProductCard | `src/components/ProductCard.astro` | — | listados producto | Card de producto. |
| ProductSidebar / ProductL4Sidebar | `src/components/Product*Sidebar.astro` | — | ProductoLayout / L4 | Sidebar de ficha (specs rápidas, otros modelos, EPP, artículos, directorio). |
| CTABar / CTABanner / CTABar | `CTABar.astro`, `CTABanner.astro` | `quote`, `title/desc/btnText/btnHref/whatsapp` | global | CTAs a cotización/WhatsApp. |
| FAQ / FAQQuote | `FAQ.astro`, `FAQQuote.astro` (32 KB) | `title, description, items[{question,answer}]` | producto, home | FAQQuote incluye formulario de cotización + FAQ. |
| WhatsAppFloat | `src/components/WhatsAppFloat.astro` | `message?, position?, showText?, pulse?` | BaseLayout (global) | Botón flotante WhatsApp con tracking (`data-whatsapp-cta`). |
| BackToTop | `src/components/BackToTop.astro` | — | BaseLayout | Volver arriba. |
| WhyChooseUs / CompanyInfo / Testimonials / Certifications | varios | — | home, producto | Bloques de confianza/E-E-A-T. |
| Pagination | `src/components/Pagination.astro` | — | blog listados | Paginación. |
| BlogSearch / DirectorioSearch | `BlogSearch.astro`, `directorio/DirectorioSearch.astro` | — | blog / directorio | UI Pagefind. |
| Logo / TopBar / SectionHeader / QuickNav | varios | — | global | UI base. |
| **directorio/** (8) | `components/directorio/` | — | sistema directorio | `StationCard`, `StationCTA`, `EmergencyNumbersBar`, `MunicipiosPhonesTable`, `FAQDirectorio` (scope estado/municipio), `VerifiedBadge`, `StateDeepLinks`, `StationDeepLinks` (interlinking). |
| ComparativaTable | `src/components/ComparativaTable.astro` | — | producto | Tabla comparativa. |

## Content Collections / esquemas / taxonomías
**Config:** `src/content/config.ts`. Dos colecciones:
1. **`pages`** (`type: "content"`, markdown): `title`, `description` (max 160), `image?`, `noindex` (default false), `hero?` (title, description, primaryCTA/secondaryCTA, backgroundImage). Archivos: `src/content/pages/{servicios,nosotros,contacto,privacidad,terminos,devoluciones}.md`. Renderizadas por `src/pages/[...slug].astro` (excluye contacto/cotizar/nosotros que tienen `.astro` dedicado — `[...slug].astro:13`).
2. **`productos`** (`loader: glob` sobre `src/content/productos/**/*.json`): esquema MUY extenso y `.strict()` (`config.ts:149`) — espejo exacto de las props de `ProductoLayout`. Campos: SEO (title max 75, description max 260 [con nota de deuda editorial `:50-51`], keywords, canonical con `.startsWith("/productos/").endsWith("/")`, image), `breadcrumb[]`, hero (badge/title/highlight/subtitle/seoBlocks `.length(2)`), `producto*` (categoría, badges, features, appTags), `gallery[]`, `capas[]` (construcción multicapa con `color` enum ember/smoke/fire), `especificaciones[]`, `aplicaciones[]`, `certItems[]`, sidebar (`specsRapidas`, `otrosModelos`, `epp`, `articulos`, `directorioLinks`), `faqs[]`, `relacionados[]`. **El `id` del archivo ES el slug de la URL** (`config.ts:34-36`).

**Taxonomías:**
- **Producto:** Categoría (16: trajes, cascos, guantes, botas, scba, forestales, herramientas-rescate, tecnologia, capuchas, gafas, extintores, hazmat, equipo-contra-incendios, rescate-vertical, rescate-acuatico, equipo-medico) → Subcategoría → Variante. Definido en `navigation.ts` (`productCategories` + `secondaryCategories`).
- **Directorio:** Estado (32, `ESTADOS_MEXICO` en `types.ts:344`) → Municipio (derivado de datos) → Estación (slug). Eje transversal: **Especialidad** (13 canónicas en `directorio-index.ts:205`: HAZMAT, ARFF, Rescate Acuático/Vertical/Vehicular/Urbano, Incendios Forestales/Industriales, Buceo, K9, Eventos Masivos, Emergencias Volcánicas/Sísmicas — con normalización por regex `:304-317`).
- **Blog:** Categoría (6: Normativas, Mantenimiento, Técnicas, Industrial, Forestales, Equipo — `blog/[slug].astro:36`) + tags.

**Rutas dinámicas:** `productos/[...slug].astro` (colección + placeholders legacy `noindex`), `directorio/<estado>/[slug].astro` (×32, datos por estado), `directorio/[estado]/{municipios,especialidades}/[..].astro` (programáticas vía `directorio-index.ts`), `blog/[slug].astro`, `blog/categoria/[categoria].astro`, `blog/pagina/[page].astro`, `api/og/{estado,estacion}/...svg.ts`.

⚠️ **HUECO:** `directorio/[estado].astro` es un **archivo inerte** (`getStaticPaths` devuelve `[]`, `:20-22`) — conservado a propósito; no genera rutas. Documentado en el propio archivo.

## SEO real
- **Metadatos:** Centralizados. `SITE` (`src/data/site.ts`) define defaults; `resolveSEO()` + `formatTitle()` + `truncateMetaDescription()` (`src/utils/seo.ts`) normalizan title (cap 60 chars, sufijo de marca inteligente) y description (cap ~155-160 con corte por oración/palabra y limpieza de "palabras débiles"). `SEOHead.astro` emite title, description, keywords (merge página+globales), author, publisher, copyright, robots (index/noindex), **canonical** (con trailing slash forzado), geo.* e ICBM, OG completo (type/title/description/url/image 1200×630/locale/site_name + article:published/modified), Twitter `summary_large_image`. **hreflang eliminado a propósito** (sitio monolingüe es-MX — `SEOHead.astro:40`).
- **Schema JSON-LD (rico y bien segmentado):**
  - Global condicionado por ruta (no en todas las páginas — `BaseLayout.astro:24-35`): `Organization` + `WebSite` + `LocalBusiness` (tipo `Store`) solo en home; `LocalBusiness` también en `/contacto/`. Consolidación por `@id`.
  - Funciones en `seo.ts`: `organizationJsonLd`, `localBusinessJsonLd` (con `OfferCatalog`, `areaServed` por ciudad, `openingHours`), `websiteJsonLd`, `productJsonLd` + **`productSchemaComplete`** (Product completo: offers con `MerchantReturnPolicy`, `OfferShippingDetails`, `BusinessAudience`, `additionalProperty`), `articleJsonLd`, `breadcrumbJsonLd`, `faqJsonLd`, `serviceJsonLd`.
  - **EstacionLayout** (`:180+`): `["FireStation","EmergencyService"]` + `GovernmentOrganization` + `HowTo` (cómo contactar) + `SpeakableSpecification` (optimización voz/GEO) + `ContactPoint` + `GeoCoordinates`. Cobertura semántica excelente para directorio local.
  - Producto (colección): `Product` + `FAQPage` (`ProductoLayout.astro:12`).
  - Home: `BreadcrumbList` + `ItemList` de 16 categorías hardcodeado (`index.astro:17-46`).
- **Arquitectura de URLs (patrón real, todas con trailing slash):**
  - `/` · `/productos/` · `/productos/<categoria>/` · `/productos/<categoria>/<subcat>/<variante>/`
  - `/directorio/` · `/directorio/<estado>/` · `/directorio/<estado>/<estacion-slug>/` · `/directorio/<estado>/telefonos/` · `/directorio/<estado>/municipios/` + `/municipios/<municipio>/` · `/directorio/<estado>/especialidades/` + `/especialidades/<especialidad>/`
  - `/blog/` · `/blog/<slug>/` · `/blog/categoria/<cat>/` · `/blog/pagina/<n>/`
  - `/contacto/` `/cotizar/` `/nosotros/` `/servicios/` `/privacidad/` `/terminos/` `/devoluciones/`
  - Redirects 301 de marketing/typos → catálogo (`astro.config.mjs:102` + `public/_redirects`).
- **Internal linking (muy fuerte — diferenciador del proyecto):** `QuickNav` con pools contextuales por sección (`quick-nav-pools.ts`), `PreFooterNav`, sidebars de producto que enlazan a directorio y artículos, `StateDeepLinks`/`StationDeepLinks`/`estados-vecinos.ts` (interlinking entre estados), `directorio-productos-map.ts` y `blog-productos-map.ts` (cruce contenido↔producto), `relacionados[]` en cada ficha. El directorio y el catálogo se enlazan mutuamente de forma sistemática.
- **sitemap/robots/hreflang:** `@astrojs/sitemap` con `serialize` de prioridades por tipo de URL + `filter` (excluye `/draft/` y `/api/`) → `sitemap-index.xml`. ADEMÁS sitemap dedicado del directorio (`sitemap-directorio.xml.ts`, ~700+ URLs con `lastmod` real). Ambos declarados en `robots.txt`. `robots.txt` muy elaborado: reglas por bot, **permite explícitamente bots de IA/GEO** (GPTBot, ClaudeBot, PerplexityBot…), bloquea scrapers (Ahrefs, Semrush, Bytespider). hreflang: ausente a propósito (monolingüe). `llms.txt`/`llms-full.txt` presentes en dist (estándar GEO emergente).

## Sistema de diseño
- **Tokens** (`src/styles/tokens.css`, 307 líneas — fuente de verdad):
  - **Paleta:** 3 escalas de marca 50→900: `fire` (naranjas #fff7ed→#7c2d12), `ember` (rojos #fef2f2→#7f1d1d; accent=`ember-600` #dc2626), `smoke` (grises azulados 50→950). Semánticos: `--color-primary`=smoke-900, `--color-accent`=ember-600. Tokens contraste-AA corregidos con nota (`:75-76`).
  - **Tipografía:** `Inter` self-hosted (`--font-sans/--font-heading`), `JetBrains Mono` mono. Escala estática `--text-xs…8xl` + **escala fluida** `--text-fluid-*` con `clamp()`. Leading/tracking tokenizados. `fonts.css` + `typography.css`.
  - **Espaciado:** escala `--space-0…64` + aliases legacy (`--space-xs…4xl`) + spacing de sección responsive (`--section-padding` con clamp) + gaps responsive.
  - **Layout:** contenedores `--container-xs…7xl`, `--container-max: 1680px` (full-bleed), `--container-prose: 72ch`, `--container-narrow: 768px`, padding con clamp.
  - Radios, sombras (incl. `--shadow-fire` glow), transiciones/easings, z-index tokenizado (`--z-header:100`, `--z-fixed:90`…), blur.
  - **Capa "Industrial Pro"** (`:267-295`): tokens semánticos dark (surfaces, ink, hairlines, gradientes premium).
  - **Dark mode automático** vía `@media (prefers-color-scheme: dark)` (`:298-307`).
- **Componentes UI base / patrones visuales:** hero industrial oscuro con bloques SEO (`HeroSection`), `CategoryCard`/`ProductCard`, CTAs (`.btn--primary/--whatsapp-hero/--ghost`), **WhatsApp float global** con pulse, **breadcrumbs** con barra oscura + gradiente fuego (`Breadcrumb.astro`), `BackToTop`, sidebars de ficha, tablas comparativas/specs, FAQ acordeón, badges NFPA, `VerifiedBadge` (E-E-A-T del directorio).
- **CSS arquitectura:** `global.css` (reset, base, mobile-first con safe-areas iOS, inputs 16px anti-zoom, `overflow-x: clip` documentado) + `mobile.css` (1.747 líneas, importado por JS DESPUÉS de global para ganar cascada — decisión documentada en `BaseLayout.astro:10-14`) + `product-l3.css` (1.154 líneas, sistema de ficha) + scoped `<style>` por componente.

## Convenciones de nombres y archivos
- **Slugs:** kebab-case ASCII sin acentos (`toSlug()` en `directorio-index.ts:58` normaliza NFD, ñ→n). URLs siempre con trailing slash.
- **Componentes/Layouts:** PascalCase `.astro`. Data: kebab-case `.ts` con prefijo de dominio (`estaciones-<estado>.ts`, `blog-*.ts`).
- **Alias de import:** `@components @layouts @data @utils @styles @/*` (`tsconfig.json:5-11`) — usados consistentemente.
- **Comentarios:** densos, fechados (`(2026-06-10)`), explican el "por qué" de cada decisión y dejan rastro de migraciones/deuda. Estilo de separadores `─── ───` / `═══`.
- **Nomenclatura de niveles:** el equipo usa "L4/L5" para jerarquía de producto (variante=L5) y "L3/L4-ESTANDAR" en docs.

## Flujos / procesos (implícitos en el código)
1. **Conversión:** todo CTA → `/cotizar/` (con `utm_*` y `?sector=`) o WhatsApp `wa.me/525570081816` con mensaje pre-rellenado. NO hay carrito ni checkout; el precio es "bajo cotización" (`productSchemaComplete` pone price 0 con `UnitPriceSpecification` explicativa, `seo.ts:466-473`).
2. **Build pipeline** (`package.json:8`): `astro build` → `pagefind` (indexa blog+directorio) → `gen-csp-hashes.mjs` (hashea scripts inline y reescribe la CSP de `_headers` para eliminar `'unsafe-inline'` en `script-src`). CSP estricta sin mantenimiento manual.
3. **Migración de producto:** HTML legacy → JSON de colección vía `scripts/extract-producto-data.mjs` (referido en `config.ts:38`). Placeholders `noindex` para slugs aún no migrados (`productos/[...slug].astro:38`).
4. **Pipeline editorial de blog** (`utils/blog-enhance.ts` + `blog/[slug].astro`): genera TOC + anchors + inserción de imágenes/tablas/FAQ + FAQ schema + CTA inline mapeado por artículo (`blog-productos-map.ts`). Sanitización con DOMPurify.
5. **Directorio programático:** `directorio-index.ts` agrega los 32 datasets en build time (cero runtime) y genera municipios/especialidades/sitemap/interlinking.
6. **OG dinámico:** endpoints `api/og/*` generan SVG 1200×630 en build (`utils/og-svg.ts`, cero dependencias) por estado/estación.
7. **Performance:** analytics (Rybbit + TruConversion) cargados solo tras 1ª interacción real o a los 6s (evita penalización Lighthouse, `BaseLayout.astro:86-126`); preload de fuentes e imagen LCP por página; `inlineStylesheets: "auto"`; prefetch on hover.

## Integraciones
- **Cloudflare Pages:** ✅ Evidencia: `public/_headers` (CSP/HSTS/cache, rotulado "Cloudflare Pages"), `public/_redirects` (301 nativos), `docs/MIGRACION-CLOUDFLARE-PAGES.md`. `cdn.ts:5` contempla migrar a Cloudflare Image Resizing.
- **GitHub Pages:** ✅ Evidencia: `CNAME`, `.nojekyll`, redirects HTML de respaldo en `astro.config.mjs`. (Deploy dual con CF.)
- **CDN de imágenes:** ✅ **ExactDN / EWWW.io** (`emwn2f4rcov.exactdn.com`) vía `utils/cdn.ts` (`cdnW`/`cdnSrcset`), activado 15/Jun/2026. Preconnect en `BaseLayout.astro:55`.
- **Analytics/heatmap:** ✅ **Rybbit** (analytics, siteId `1353eff32e78`) + **TruConversion** (heatmap/session replay) — `BaseLayout.astro:96-111`.
- **Búsqueda:** ✅ **Pagefind** (post-build).
- **fal.ai / FLUX:** ⚠️ **HUECO** — no hay evidencia en código/config. La generación de imágenes OG es SVG propio; las imágenes de catálogo se sirven optimizadas vía ExactDN. Posible uso fuera de repo (en `material-trabajo/`, ignorado en git).
- **n8n:** ⚠️ **HUECO** — sin evidencia.
- **Brevo / Sendinblue:** ⚠️ **HUECO** — sin evidencia de envío de formularios por API; el formulario de cotización (`FAQQuote.astro`) aparenta empujar a WhatsApp (verificar handler real del form — no auditado a fondo).
- **GitHub Actions:** ⚠️ **HUECO** — `.github/workflows/` está vacío. Deploy probablemente por integración nativa de CF Pages/GH Pages, no por workflow versionado.

## Clasificación de hallazgos
### ✅ Funciona (estandarizar)
- Sistema de tokens de diseño completo y semántico, con dark mode y fluid type — `src/styles/tokens.css`.
- Jerarquía de layouts limpia, raíz única `BaseLayout`→`PageLayout`→resto — `src/layouts/`.
- SEO centralizado y robusto: `resolveSEO`/`formatTitle`/`truncateMetaDescription` + `SEOHead` — `src/utils/seo.ts`, `src/components/SEOHead.astro`.
- JSON-LD global condicionado por ruta (evita inflar ~1.400 páginas) — `BaseLayout.astro:24-35`.
- Schema de directorio de altísima calidad (`FireStation`+`EmergencyService`+`HowTo`+`Speakable`) — `EstacionLayout.astro:180+`.
- Colección `productos` con esquema `.strict()` espejo del layout (contrato de datos fuerte) — `src/content/config.ts:149`.
- CSP endurecida automáticamente por hash post-build — `scripts/gen-csp-hashes.mjs`.
- Interlinking programático sistemático (QuickNav pools, deep-links, mapas contenido↔producto) — `src/data/quick-nav-pools.ts`, `directorio-productos-map.ts`.
- Carga diferida de analytics anti-Lighthouse + preload LCP/fuentes — `BaseLayout.astro:68-126`.
- Convenciones de slug ASCII + trailing slash consistentes — `directorio-index.ts:58`, `astro.config.mjs:96`.

### ❌ Falla (deuda/inconsistencia)
- **Cadena rota en las 32 fichas de estado:** literal `"En Se distribuye equipo NFPA certificado de equipo para bomberos certificado NFPA"` (find/replace mal aplicado que borró el nombre de marca) — `src/pages/directorio/*/[slug].astro` (32 archivos; ej. `aguascalientes/[slug].astro:119`).
- **Enlace de footer a página inexistente** `/capacitacion/` — `src/data/navigation.ts:255` (no hay `.md` ni `.astro`; no está en `dist/`).
- **Doble `BreadcrumbList` JSON-LD** en `/productos/`: la página usa `<Breadcrumb>` (que ya emite el schema) Y además pasa `breadcrumbJsonLd()` en su `jsonLd` — `src/pages/productos/index.astro:17,76`.
- **Deuda editorial de meta descriptions:** ~80 descriptions de producto miden 171–256 chars (Google trunca ~160); límite del schema laxado a propósito (260) — documentado en `src/content/config.ts:49-51`.
- **Dos sistemas de blog coexistiendo** (datos `.ts` vs `.mdx`) sin verificación de solape de slugs — `BlogLayout.astro` vs `BlogMdxLayout.astro`.
- **Mantenimiento dual de redirects** (astro.config.mjs + _redirects) requiere sincronización manual — riesgo de divergencia, ya reconocido en `_redirects:7-9`.
- **`README.md` desactualizado:** describe "Astro Pro Template" genérico con componentes que no existen (`Hero.astro`, `CTA.astro`, `BlogCard.astro`) — `README.md`.
- **Datos de negocio posiblemente placeholder:** `legalName: "BOMBERO.MX S.A. de C.V."`, `foundingDate: "2010"`, `numberOfEmployees: "50-100"` en JSON-LD — verificar veracidad antes de publicar como structured data (`site.ts:101-107`).

### 🤖 Automatizable
- Generación/validación de fichas de producto JSON desde fuente (ya iniciado con `extract-producto-data.mjs`) — extender a las 16 categorías.
- Verificación de enlaces internos rotos en build (detectaría `/capacitacion/` y similares) — no existe checker actualmente.
- Reescritura batch de las meta descriptions >160 chars con la lógica de `truncateMetaDescription` aplicada al contenido (no solo en runtime) — `seo.ts`.
- Limpieza/normalización del literal roto de las 32 fichas con un script de find/replace controlado.
- Ingesta/actualización del directorio de estaciones (datos `estaciones-*.ts`) desde fuente externa (CSV/API municipal) — hoy parece manual.

### 📐 Estandarizable
- Patrón "BaseLayout→PageLayout + SEOHead/JsonLd centralizado" como plantilla raíz para otros sitios del sistema.
- Librería `seo.ts` (title/description/canonical + generadores JSON-LD por tipo) como paquete reutilizable.
- Sistema de tokens (`tokens.css`) como base de diseño compartida (renombrar paleta por marca).
- Motor de directorio programático (`directorio-index.ts` + sitemap dedicado + OG SVG) como módulo de "contenido local programático" reutilizable para arquetipo D.
- Pipeline de build (pagefind + gen-csp-hashes) y patrón de carga diferida de analytics.
- Esquema de colección `.strict()` como contrato de datos página↔layout.

## ⚠️ HUECOS
- **HUECO (integraciones):** sin evidencia en repo de **fal.ai/FLUX, n8n, Brevo**. Importa porque si esos servicios alimentan contenido/imágenes/leads, el proceso vive fuera del repo (`material-trabajo/` está en `.gitignore`) y no es auditable ni reproducible desde el código.
- **HUECO (formulario de cotización):** no verifiqué el handler real de envío de `/cotizar/` ni `FAQQuote.astro` (¿solo WhatsApp? ¿POST a algún endpoint/Brevo?). Importa para saber si los leads se capturan o se pierden.
- **HUECO (blog dual):** falta confirmar qué slugs sirve el sistema `.ts` vs `.mdx` y si hay duplicación de URLs / canónicos en conflicto.
- **HUECO (deploy real):** `.github/workflows/` vacío; no se confirmó cuál de los dos targets (GH Pages vs CF Pages) es el productivo "vivo" hoy ni el mecanismo de despliegue (integración nativa CF asumida, no verificada).
- **HUECO (CI/calidad):** existe `npm run lint`/`check`/`lighthouse` pero no hay automatización que los ejecute (sin Actions). No se verifica typecheck ni links en cada push.
- **HUECO (muestreo de páginas):** por volumen NO se leyeron las 187 páginas; se muestreó 1 por tipo (home, productos index/categoría/variante, directorio estado/estación/especialidad, blog artículo, página md). Las páginas `404.astro`/`500.astro`, `contacto`, `cotizar`, `nosotros` y los hubs `municipios/[municipio]` no se leyeron a fondo.
- **HUECO (veracidad de datos):** no se validó la exactitud de los datos del directorio (teléfonos/direcciones de 32 estados) ni de los claims de negocio del JSON-LD — fuera del alcance de una auditoría de código.
