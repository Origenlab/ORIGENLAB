# Diagnóstico — MEDEDUL

> Propósito: Sitio de servicio de mesas de dulces / candy bar profesional para eventos (bodas, XV, baby shower, corporativos) en CDMX + Valle de Toluca, en Astro 4 estático. Combina landings de servicio por evento/tipo/estación + un blog SEO masivo (120 artículos .mdx) + un directorio local embebido de ~70 dulcerías (CDMX/EdoMex/Toluca). Conversión por WhatsApp (widget DMChamp) y formulario de cotización.

## Identidad
- **Negocio/dominio:** MEDEDUL — "Mesas de Dulces Profesionales" · `mesas-de-dulces.com` (`public/CNAME`, `astro.config.mjs:5`). Cobertura CDMX + Estado de México + Valle de Toluca (Toluca, Metepec, Zinacantepec, Lerma, Calimaya) — `src/components/seo/SEO.astro:50-57`. 3 sucursales (Anzures CDMX, Condesa CDMX, Toluca/Metepec) según `ContactSection`/Header. WhatsApp y email reales no-placeholder (a diferencia de CLIBEL).
- **Tipo de sitio:** Servicio profesional con catálogo de paquetes + blog SEO + directorio local. NO e-commerce: conversión por WhatsApp (widget DMChamp interceptando todos los `wa.me`/`whatsapp://`) y formulario de cotización (`/cotizar`). Evidencia: `src/layouts/BaseLayout.astro:174-232` (widget DMChamp diferido), CSP en `public/.htaccess:162` whitelist `form-action ... https://formspree.io https://wa.me` (sugiere Formspree como backend del form — ver HUECOS).
- **ARQUETIPO: B — renta/eventos** (servicio para eventos), con un componente **D (directorio)** sustancial embebido. Justificación B: el negocio vende un servicio para eventos puntuales organizados por ocasión (bodas, XV años, baby shower, bautizos, corporativos, graduaciones — enum `category` en `src/content/config.ts:11-24`), con paquetes/precios (`serviceCollection.packages` con name/price/features/popular) y landings por tipo de evento (`candy-bar-eventos/`, `tipos-de-mesas-de-dulces/`, `estaciones-interactivas/`). Componente D: un **directorio de ~70 dulcerías reales** (`src/pages/directorio/*.astro` hand-built + rutas dinámicas `directorio/edomex/[municipio].astro`, categorías) respaldado por `src/data/dulcerias.ts` (base tipada con NAP, geo, rating, transporte). El directorio es captación SEO informacional/local que alimenta al servicio, no el producto en sí → **B primario, D secundario** (paralelo invertido al caso A/D de MESECI).
- **Estado:** En producción y activo, en optimización continua. `dist/` versionado (build 5-jun-2026). Múltiples estudios y bitácoras propios recientes (`ESTUDIO-OPTIMIZACION-MEDEDUL-2026.md` 5-jun, `investigacion-seccion-dulces-mededul.md` 5-jun, `ESTUDIO-SEO-DULCES-A-GRANEL-2026.md` 2-jun). Pipeline de QA y validadores propios maduros (scripts/). ⚠️ Hay un archivo lock de LibreOffice abierto en raíz (`.~lock.Dulcerias_EdoMex_SinWeb.xlsx#`) — ruido.

## Stack
- **Astro 4** (`package.json:13` → `"astro": "^4.15.0"`). ⚠️ Versión anterior a CLIBEL (5) y MESECI (6) — candidato a upgrade. Usa Content Collections API **v2 legacy** (`type: 'content'` en `src/content/config.ts:5`, no el loader `glob()` v5).
- **Output `static`**, sin `trailingSlash` declarado (= default; las clean-URLs con trailing slash las fuerza `.htaccess`, que NO aplica en GitHub Pages — ver HUECOS), `inlineStylesheets: 'always'`, `vite.build.cssMinify`, `compressHTML`, `prefetch` viewport + prefetchAll (`astro.config.mjs`).
- **14 redirects** declarados en `astro.config.mjs:8-32` (blog antiguos → guías canónicas) — estos SÍ se generan como páginas de redirect estáticas.
- **Integrations:** solo `@astrojs/mdx` (`astro.config.mjs:34-36`). `@astrojs/sitemap` está en deps pero **no se registra como integration** en el config → el sitemap automático puede no estar generándose (ver HUECOS).
- **CSS: CSS puro con variables** (NO Tailwind — no está en deps). 7 archivos en `src/styles/` con tokens y arquitectura por capas.
- **Imágenes:** `astro:assets` + `sharp` (servicio sharp) + **CDN ExactDN** (`src/lib/cdn.ts`, `e2pex68gctc.exactdn.com`) que reescribe `/img/*` y genera srcset responsive. `image.domains` incluye exactdn + dominio propio.
- **TypeScript** strict + alias `@/`, `@components/`, `@layouts/`, `@content/`, `@styles/`.
- **Adapter:** ninguno (estático).
- **Deploy: GitHub Pages** vía `.github/workflows/deploy.yml` (Node 20, `npm ci` + `npm run build` [que corre `validate:mdx` antes de `astro build`] + deploy-pages). CNAME en `public/`.

## Estructura de carpetas
```
MEDEDUL/
├── astro.config.mjs · tsconfig.json · package.json · CNAME
├── .github/workflows/deploy.yml
├── src/
│   ├── content/
│   │   ├── config.ts              ← esquemas Zod v2 (blog + 3 service collections + categoryMeta)
│   │   ├── blog/   120 .mdx       ← blog SEO masivo
│   │   └── docs/   1 .mdx         ← content-components.mdx (demo de componentes MDX)
│   ├── data/    dulcerias.ts (~70+ fichas) · subsections.ts (mega-menú) · porqueMededul.ts (pilares)
│   ├── lib/     cdn.ts · schema.ts · schemas.ts · blogSorting.ts · blogCardCta.ts
│   ├── layouts/ BaseLayout.astro · BlogPostLayout.astro (2)
│   ├── components/  43 .astro → global/ (19) · content/ (11, MDX) · blog/ (6) · seo/ (3) · directorio/ (4)
│   ├── pages/   229 archivos (ver desglose)
│   └── styles/  global · layout · design-system · mobile · blog · article · category (7)
├── public/   .htaccess (Apache, 223 L) · CNAME · img/ (cientos de .avif reales) · robots.txt · favicons
├── dist/     ← build versionado (5-jun)
├── scripts/  validadores + reescritores de artículos por lotes (validate-mdx.mjs, validate-content.cjs, lint-markdown.cjs, rewrite-editorial-batch*.cjs, install-hooks.sh…)
├── reports/  ← salidas de auditoría
├── _legacy-html-backup/  ← respaldo del sitio WordPress/HTML anterior
└── ~12 .md de estudios/bitácora en raíz (AUDIT-REPORT, COMPONENTS, ESTUDIO-*, ARTICLE_*, MESAS_DE_DULCES_GUIA_MAESTRA, DISEÑO-SISTEMA-NAVEGACION…) + 2 .docx/.xlsx
```

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout.astro` | `src/layouts/BaseLayout.astro` | **Raíz** | `title*`, `description*`, `canonical?`, `ogImage?`, `ogType?`, `article?{category,tags}`, `noindex?`, + **toggles de schema** `includeOrganizationSchema/includeLocalBusinessSchema/includeServiceSchema/includeWebSiteSchema`, + toggles de CSS `includeBlogStyles/includeArticleStyles/includeCategoryStyles` | TODAS las páginas. Compone `<SEO>` + `<JsonLd>` (condicional por toggles) + favicons + preload Google Fonts (Poppins+Pacifico, anti-CLS) + **script ExactDN** (reescribe `/img/*`→CDN, `:118-172`) + TopBar + Header + `<main>` + Footer + **widget DMChamp WhatsApp diferido** (`:174-232`). CSS global/layout/design-system/mobile siempre; blog/article/category vía `?url` condicional. |
| `BlogPostLayout.astro` | `src/layouts/BlogPostLayout.astro` | **extiende `BaseLayout`** | `post: CollectionEntry<'blog'>` | Renderiza artículos del blog: breadcrumbs (Blog→Categoría→Título con `categoryMeta` icon/color), hero, featured image con srcset CDN, `<slot/>` MDX, ArticleCoverageBanner, FAQ condicional, RelatedArticles (por tags), ArticleCTA (WhatsApp/cotizar), ArticleSidebar. Schema Article + FAQPage. |

Solo 2 layouts. Las landings de servicio/directorio (≈220 .astro) usan `BaseLayout` directamente con schema inline propio en cada página.

## Componentes — inventario (43)
| Componente | Ruta | Props clave | Uso |
|---|---|---|---|
| `Hero` | `global/Hero.astro` | `title,highlight,subtitle,description,secondaryContent?,showCTA?,ctaHref?,ctaBadge?,ctaTitle?,ctaText?,ctaButtonText?` | Hero de casi todas las páginas |
| `Header` | `global/Header.astro` | `currentPath` | Nav mega-menú (servicios/eventos/estaciones/empresa) + sucursales + WhatsApp; data de `src/data/subsections.ts` |
| `Footer` | `global/Footer.astro` | — | 6 columnas de links + social + legal |
| `SEO` | `seo/SEO.astro` | `title*,description*,canonical?,ogImage?,ogType?,article?,noindex?` | Invocado por BaseLayout. Metas + OG + Twitter + geo. **No emite JSON-LD.** |
| `JsonLd` | `seo/JsonLd.astro` | `type:'Organization'\|'LocalBusiness'\|'Article'\|'Service'\|'FAQPage'\|'WebSite'`, `data?` | Schema reutilizable (toggled desde BaseLayout) |
| `Breadcrumbs` | `seo/Breadcrumbs.astro` | `items:{name,url}[]` | Navegación + JSON-LD BreadcrumbList |
| `FAQ` | `global/FAQ.astro` | `items:{question,answer}[]`, `id` | Acordeón + FAQPage |
| `ServiceCard` | `global/ServiceCard.astro` | `title,description,href,icon` | Grids de servicios |
| `PricingPackages` | `global/PricingPackages.astro` | `packages:{name,price,features,popular}[]` | Tablas de precios por evento |
| `ContactSection` | `global/ContactSection.astro` | `phone?,email?,whatsappNumber?` | 3 sucursales + horarios + WhatsApp |
| `RelatedArticles` | `blog/RelatedArticles.astro` | `post,limit` | Interlinking blog por tags |
| `ArticleCTA` | `content/ArticleCTA.astro` | `title,description,buttonText,buttonUrl,variant` | CTA de cierre en artículos |
| `DulceriaCard` | `directorio/DulceriaCard.astro` | ficha (rating, horario, maps) | Directorio |
| `DulceriaLayout` / `CategoriaLayout` | `directorio/` | wrappers de página dulcería / categoría | Directorio |
| `DirectorioSidebar` | `directorio/DirectorioSidebar.astro` | filtros + stats | Directorio |

Resto: `global/` → TopBar, SectionHeader, ProcessSteps, WhyChooseUs, EventsGrid, TrustBadge, ReviewCard, StarRating, CTAServices, SucursalCtaBanner, FAQContactModule, QuickEventNav. `content/` (MDX) → AlertBox, InfoCard, CTABox, Quote, FeatureList, StepList, StatsGrid, StatCard, ProsCons, ComparisonTable. `blog/` → ArticleCoverageBanner, BlogArchive, ArticleSidebar, BlogPostCard, BlogSidebar.

## Content Collections / esquemas / taxonomías
Definidos en **`src/content/config.ts`** (API v2 legacy, `type: 'content'`).

**Colección `blog`** (120 .mdx en `src/content/blog/`):
- `title*` (max 150), `description*` (max 300), `publishDate?`, `modifiedDate?`, `category*` (**enum cerrado de 12**: bodas, xv-anos, baby-shower, bautizos, corporativos, fiestas-infantiles, infantiles [alias], graduaciones, despedidas-soltero, tips-consejos, tendencias, estaciones), `heroImage?`, `heroImageAlt?`, `tags[]`, `location?`, `readTime?`, `faqs[{question,answer}]?`, `draft`.
- **`categoryMeta`** exportado (`config.ts:65-138`): por cada categoría → `{name, icon (emoji), color (hex), description}`. Es el sistema de identidad visual del blog (cada categoría con su color).

**Colecciones de servicio (`serviceCollection`, esquema compartido):** `candy-bar`, `tipos-mesas`, `estaciones`, `porque-mededul` (`config.ts:140-146`). Esquema: `title*`, `description*`, `heroImage*(image())`, `heroImageAlt?`, `packages[{name,price,features[],popular}]?`, `gallery[{src(image()),alt}]?`, `faqs[{question,answer}]?`, `order`.
- ❌ **HUECO IMPORTANTE:** estas 4 colecciones están **declaradas pero VACÍAS** — `src/content/` solo contiene los directorios `blog/` y `docs/`; no existen `src/content/candy-bar/`, `/tipos-mesas/`, `/estaciones/`, `/porque-mededul/`. Las landings de esos servicios están **hand-built como `.astro`** (`src/pages/tipos-de-mesas-de-dulces/mesa-de-dulces.astro`, `src/pages/estaciones-interactivas/fuente-de-chocolate.astro`, `src/pages/porque-mededul/[pilar].astro` que lee de `src/data/porqueMededul.ts`). Es decir, el esquema de servicio se diseñó pero el contenido nunca migró a la colección → patrón a medio camino.

**Taxonomías:** blog por `category` (12) + `tags` (libres) → rutas `blog/categoria/[category]`, `blog/tag/[tag]`, `blog/pagina/[page]` (paginación). Directorio por municipio/alcaldía (`directorio/edomex/[municipio]`) + categoría de dulce (`directorio/categorias/*`: galletas-cupcakes, paletas-piruletas, chocolates-trufas, dulces-tradicionales, dulces-importados, gomitas-confiteria).

## SEO real
- **Metas (`SEO.astro`):** title (`{title} | Mededul`), description, author, robots (index/noindex con `max-image-preview:large`), googlebot, language=Spanish, distribution=global, canonical (`new URL(pathname, site)`), **geo doble** (`geo.region` MX-CMX **y** MX-MEX, geo.placename, geo.position, ICBM, `coverage` con 7 localidades, `target`), OG completo (1200×630, locale es_MX, site_name), Twitter `summary_large_image`, `article:section`/`article:tag` condicional. ⚠️ Dos `geo.region` (CMX y MEX) es no estándar pero refleja cobertura dual.
- **Schema (JSON-LD):** dos vías — (a) componente `JsonLd` toggled desde BaseLayout (`Organization/LocalBusiness/Service/WebSite/Article/FAQPage`), y (b) **schema inline por página** (mayoría). Tipos confirmados en repo (grep `@type`): `WebPage`, `Organization`, `LocalBusiness` (con `PostalAddress`, `geo`, `openingHoursSpecification`, `aggregateRating`, `areaServed`/`City`/`Place`, `serviceType`), `Service`, `ItemList`+`ListItem` (p.ej. `porque-mededul/index.astro:125-133`), `AggregateRating`, `Article`, `FAQPage`, `BreadcrumbList` (vía Breadcrumbs). Helpers en `src/lib/schema.ts` (`buildFaqSchema`, `buildServiceSchema` con AggregateOffer).
- **URLs:** kebab-case descriptivas; clean-URLs con trailing slash **dependen de `.htaccess`** (no aplica en GitHub Pages — riesgo de inconsistencia trailing slash, ver HUECOS). 14 redirects de slugs viejos→canónicos en `astro.config.mjs`.
- **Internal linking:** `RelatedArticles` (por tags), `ArticleSidebar`, `ArticleCoverageBanner`, `QuickEventNav`, mega-menú data-driven (`subsections.ts`), directorio cross-link por municipio/categoría. ⚠️ Sin mapa temático centralizado blog↔servicio (los related son solo por tags) — más débil que el `categoryMapping.ts` de MESECI.
- **robots.txt** (`public/robots.txt`): Allow + Disallow `/_astro/`, `/api/`, `/_image` + Sitemap `mesas-de-dulces.com/sitemap.xml`. ⚠️ El sitemap se referencia pero `@astrojs/sitemap` no está registrado en `astro.config` → verificar que `dist/sitemap.xml` realmente se genera.
- **llms.txt:** no existe (HUECO menor).

## Sistema de diseño
- **CSS puro tokenizado** (no Tailwind), arquitectura por capas en `src/styles/`:
  - `global.css` (reset, fallback fonts anti-CLS, tokens de color/spacing/sombras), `design-system.css` (tokens fluidos `--ds-*`: container max 1600px, section-py, fs-h1 clamp, gaps), `layout.css` (grids/bandas), `mobile.css` (breakpoints mobile-first 1024/768/640/480/380), `blog.css` / `article.css` / `category.css` (inyectados condicionalmente).
- **Paleta** (tokens en `global.css`): rosa principal `#D1007A`, rosa claro `#F548AA`, morado/turquesa `#5A1AA3`, naranja `#FF149A`, gradientes dulce/rosa (rosa→púrpura). Neutros: negro suave `#2D3436`, grises. **Por categoría** además color propio en `categoryMeta`.
- **Tipografía:** Poppins (400–800, principal) + Pacifico (decorativa/script). Fallbacks metric-matched anti-CLS.
- **Radios:** `--radio-pequeno:12px` → `--radio-redondo:50px`. **Sombras** suave/media/rosa.
- **Hero:** `Hero.astro` parametrizable. **Cards:** `ServiceCard`, `DulceriaCard`, `BlogPostCard`. **CTA:** `ArticleCTA`/`CTABox`/`SucursalCtaBanner`/`CTAServices`. **WhatsApp:** widget DMChamp global (intercepta todos los `wa.me`) con fallback a WA directo. **Breadcrumbs:** `Breadcrumbs.astro` con BreadcrumbList.

## Convenciones
- Datos de negocio repartidos en `src/data/` (dulcerias, subsections/mega-menú, pilares) — no hay un único `consts.ts`/`site.ts` central como en CLIBEL/MESECI (NAP/sucursales aparecen embebidos en componentes y schemas inline).
- Schema mayormente **inline por página** + helpers en `src/lib/schema.ts`; toggles de schema en BaseLayout para los globales.
- Imágenes vía `src/lib/cdn.ts` (`getCdnUrl`/`getCdnSrcSet`) → ExactDN; AVIF q75.
- Blog en colección tipada; servicios/directorio hand-built en `.astro`.
- **QA riguroso:** `npm run build` corre `validate:mdx` antes; `npm run check` = lint:content + lint:markdown + astro check; git hooks (`install-hooks.sh`). Reescritura de artículos por lotes (`rewrite-editorial-batch1..6.cjs`).

## Flujos / procesos
- **Conversión:** WhatsApp (widget DMChamp `api.dmchamp.com/v1/chat-widget/QjJvgg44KjPKkctV92lS`, carga diferida a primera interacción/idle) + formulario de cotización `/cotizar`. La CSP de `.htaccess` whitelist `formspree.io` y `wa.me` en `form-action` → el form de cotización probablemente postea a **Formspree** (confirmar dentro de `src/pages/cotizar.astro`).
- **Producción de contenido:** pipeline propio de validación + reescritura editorial por lotes; estudios SEO documentados.
- **Build/deploy:** push `main` → GHA (`validate:mdx` + `astro build`) → GitHub Pages.

## Integraciones
- **GitHub Actions:** ✅ `deploy.yml` (Node 20, build con validación MDX, deploy-pages).
- **ExactDN (CDN de imágenes):** ✅ `src/lib/cdn.ts` + script en `BaseLayout.astro:118-172`. Endpoint público `e2pex68gctc.exactdn.com`.
- **DMChamp (widget WhatsApp/chat):** ✅ `BaseLayout.astro:189` widget ID `QjJvgg44KjPKkctV92lS` (público por diseño).
- **Formspree (formulario):** ⚠️ EVIDENCIA INDIRECTA — CSP `form-action ... https://formspree.io` (`public/.htaccess:162`). Confirmar en `src/pages/cotizar.astro`.
- **Cloudflare:** ⚠️ EVIDENCIA INDIRECTA — CSP whitelist `static.cloudflareinsights.com` (`.htaccess:162`) sugiere Cloudflare Web Analytics, pero el deploy es GitHub Pages y `.htaccess` no aplica ahí (ver HUECOS). Sin `_headers`/`wrangler`.
- **n8n / fal.ai / Brevo:** ⚠️ HUECO — sin evidencia.

## Documentación previa
**No hay vault Obsidian** (sin `.obsidian/`). En su lugar, ~12 `.md` sueltos en raíz (bitácora/estudios), de los cuales destacan como reutilizables:
- `MESAS_DE_DULCES_GUIA_MAESTRA.md` — playbook editorial oficial (schema, frontmatter, componentes, estructura de artículo). **Muy reutilizable** como SOP de producción de contenido.
- `COMPONENTS.md` (18 KB) — catálogo de props de componentes (Hero, CTA, SectionHeader, content/*). **Reutilizable** como inventario de componentes.
- `ESTUDIO-OPTIMIZACION-MEDEDUL-2026.md`, `ESTUDIO-SEO-DULCES-A-GRANEL-2026.md`, `ESTUDIO-SITIO-2026.md`, `investigacion-seccion-dulces-mededul.md` — estudios SEO/keyword recientes (jun-2026), insumo estratégico.
- `DISEÑO-SISTEMA-NAVEGACION.md` — arquitectura de información / navegación.
- `AUDIT-REPORT.md`, `ARTICLE_HOMOLOGATION_GUIDE.md`, `ARTICLE_CORRECTION_PROMPT.md`, `ARTICLE_UPGRADE_PROGRESS.md` — auditoría y guías de homologación de artículos (procesos pasados; verificar vigencia de fechas).

## Clasificación

### ✅ Bien resuelto / canónico
- **Pipeline de QA de contenido** (`scripts/validate-mdx.mjs`, `validate-content.cjs`, `lint-markdown.cjs`, git hooks; `build` bloquea si MDX inválido) — `package.json:8-19`. Referencia para producción de contenido a escala.
- **Optimización de imágenes con CDN ExactDN** (`src/lib/cdn.ts` + reescritura en BaseLayout + srcset responsive AVIF q75) — perf/CLS sólido.
- **Sistema de blog data-driven con identidad por categoría** (`categoryMeta` color/icon por las 12 categorías + rutas categoria/tag/paginación) — `src/content/config.ts:65-138`.
- **Directorio local tipado** (`src/data/dulcerias.ts` con NAP/geo/rating/transporte + `DulceriaCard`/`CategoriaLayout` + rutas dinámicas por municipio) — patrón D reutilizable.

### ❌ Roto / a corregir
- **`.htaccess` (Apache) inerte en GitHub Pages:** `public/.htaccess` (223 L) define force-HTTPS, clean-URL rewrites, trailing-slash, 301 redirects, HSTS, CSP y cache headers — pero GitHub Pages **ignora `.htaccess`**. Todo eso NO se aplica en producción (mismo patrón que `_headers`/`_redirects` de MESECI). Los redirects críticos hay que llevarlos a `astro.config.redirects` (donde ya viven 14) y los headers a la capa de hosting real.
- **Colecciones de servicio declaradas y vacías:** `candy-bar/tipos-mesas/estaciones/porque-mededul` existen en `config.ts:140-146` sin directorio de contenido; las landings son `.astro` hand-built → esquema huérfano + inconsistencia arquitectónica.

### 🤖 Automatizable
- **Reescritura/homologación de artículos por lotes** ya existe como scripts (`rewrite-editorial-batch1..6.cjs`, `audit-homologation`) — candidato directo a orquestación con IA (n8n/fal.ai) sobre el esquema `blog` para generar/actualizar los 120 artículos con frontmatter validado.

### 📐 Patrón reutilizable
- **Directorio local SEO embebido** (data tipada `dulcerias.ts` → `DulceriaCard` + rutas por municipio/categoría + LocalBusiness schema por ficha) como módulo D injertable en cualquier negocio local de arquetipo B/C (`src/data/dulcerias.ts`, `src/pages/directorio/`).

## ⚠️ HUECOS
- **`.htaccess` no aplica en GitHub Pages** (descrito arriba) — riesgo real de redirects/headers/clean-URLs que no funcionan en producción. Migrar redirects a `astro.config` y headers al hosting; o mover el deploy a un host Apache/Cloudflare.
- **`@astrojs/sitemap` en deps pero no registrado** en `astro.config.mjs` → confirmar si `dist/sitemap.xml` se genera; robots.txt lo referencia.
- **4 colecciones de servicio vacías** (esquema sin contenido) — decidir: migrar las landings `.astro` a colección, o eliminar las colecciones del config.
- **Backend del formulario sin confirmar:** CSP sugiere Formspree (`public/.htaccess:162`) pero no verificado en `src/pages/cotizar.astro`.
- **Cloudflare Analytics ambiguo:** CSP whitelist `static.cloudflareinsights.com` pero deploy es GitHub Pages — verificar si el script de CF Insights está realmente inyectado en alguna página o es residuo del host anterior.
- **Astro 4** (vs 5/6 en proyectos hermanos) — deuda de versión.
- **Sin fuente única de datos de negocio** (NAP/sucursales dispersos en componentes y schemas inline) — frágil para mantener consistencia; conviene un `site.ts` central como CLIBEL/MESECI.
- **`dist/` versionado** y ruido en raíz (`.~lock.*.xlsx#`, 12 .md de bitácora, `_legacy-html-backup/`).
- **Seguridad:** ✅ sin tokens/credenciales expuestos (grep `gho_`, `sk-`, `api_key`, `SECRET`, `AKIA`, `Bearer` en `src/` → 0). Los IDs públicos por diseño (DMChamp widget ID, ExactDN endpoint, WhatsApp) no son secretos. Nota positiva: el `.htaccess` (aunque inerte en GH Pages) define CSP/HSTS/headers de seguridad correctos para un host Apache.
