# Diagnóstico — INFLAPY
> Propósito: Sitio estático Astro (catálogo + 133 posts MDX + 16 alcaldías + 20 salones) de renta de inflables para fiestas en CDMX/Edomex (`inflablesparafiestas.com.mx`), desplegado en Cloudflare Pages; el proyecto más data-driven y modular del cluster, con 7 componentes SEO dedicados, pipeline de validación pre-build con git hooks e infraestructura lista para generación de contenido con n8n.

## Identidad
- **Negocio/dominio:** INFLAPY — Inflables Para Fiestas · `https://inflablesparafiestas.com.mx` (`astro.config.mjs` `site:`). Empresa real fundada **1994** (`src/data/business.ts`), domicilio Reforma 26, Juárez, Cuauhtémoc, CP 06600, CDMX; tel/WhatsApp `+525531281706` (E.164, "formato único en todo el sitio"); geo 19.434208/-99.1513664; openingHours L-V 8-20, Sáb 9-18, Dom 9-15.
- **Tipo de sitio:** Catálogo de renta + SEO local por alcaldía + directorio de salones + blog. Multipágina estática. **Conversión 100% por WhatsApp** — los "formularios" (contacto/cotizar/gracias y el del blog) arman `wa.me/...?text=` con FormData y `window.open` (`blog/index.astro:1237-1303`), sin backend.
- **ARQUETIPO: B — renta/eventos** (núcleo) **+ C — SEO local multi-zona + D — directorio**. Justificación: todo conduce a `wa.me/525531281706`; catálogo de 8 inflables con precio orientativo (no carrito); `Service` schema con ReserveAction→WhatsApp. Capa **C**: 16 páginas de cobertura por alcaldía (`cobertura/[slug]` + `data/cobertura/*.ts` + `zonasLocal.ts`) con contenido hiperlocal. Capa **D**: colección `salones` (20 fichas MDX con LocalBusiness/rating/FAQ propios) = directorio de salones de terceros como cross-sell. Cobertura y directorio son estrategias satélite que alimentan el mismo embudo B.
- **Estado:** En producción y activo, **fuertemente remediado y en migración consolidándose**. Auditoría propia `audits/AUDITORIA-TECNICA-INTEGRAL-2026-06-10.md` (origen de los hallazgos I1/I6 citados en el código). El código delata migraciones sucesivas (salones .astro → colección MDX; WhatsAppFloat componente → inline) con documentación rezagada.

## Stack
- **Astro `^4.16.19`** (v4). Output `static`, `trailingSlash: 'always'`, `compressHTML` (`astro.config.mjs`).
- **Integrations:** `@astrojs/mdx`, `@astrojs/sitemap` (filter landing/404/gracias; `serialize` con prioridades por tipo: home 1.0, producto 0.9, categorías 0.85, cobertura/hubs 0.8, blog 0.7, salones 0.5, legal 0.3), `@astrojs/rss` declarado. `image.remotePatterns`: CDN **ExactDN** `e34tcqkvbt4.exactdn.com` + `inflablesparafiestas.com.mx`. `markdown.shikiConfig` github-dark.
- **CSS:** **NO Tailwind.** Tokens y CSS global en **`public/css/style.css`** (49 KB, `:root` con paleta/gradientes/escalas) + `mobile.css`/`mobile-optimizations.css`/`blog-article.css`/`blog.css`/`salon-detail.css`/`home.css`/`fonts.css`. En `src/styles/`: solo `cobertura.css` (210 l.), `producto.css` (258 l.), `salones.css` (554 l.) importados por las rutas dinámicas — **no hay global.css en src/** (el global vive en public/css).
- **Fuentes:** **Fredoka** (display) + **Nunito** (cuerpo), woff2 self-hosted en `public/fonts/` declaradas en `public/css/fonts.css` (`font-display:swap`, unicode-range); 3 críticas con `<link preload>` en BaseLayout. (`@fontsource/fredoka`+`nunito` en package.json pero se sirven los woff2 directos.)
- **TypeScript** strict (`tsconfig.json`, muchos alias `@components @layouts @content @styles @utils @data @assets`, `jsx react-jsx astro`). ⚠️ El código usa rutas relativas, no los alias.
- **DevDeps:** `lightningcss`, `sharp`.
- **Adapter:** ninguno (output static puro; sin adapter Cloudflare — deploy por wrangler).
- **Deploy:** **CLOUDFLARE PAGES** vía `.github/workflows/deploy.yml` (`cloudflare/wrangler-action@v3`, `command: pages deploy dist --project-name=inflablesparafiestas --branch=main`, Node 20, secrets `CLOUDFLARE_API_TOKEN`+`CLOUDFLARE_ACCOUNT_ID`). ⚠️ Account ID en comentario YAML (`711c2e12...`). `public/_headers` (CSP report-only + cache), `public/_redirects` (6 KB, 301s legacy), `public/CNAME` (**vestigio de GitHub Pages — inútil en CF**). `build = npm run validate && astro build`.

## Estructura de carpetas
```
INFLAPY/
├── astro.config.mjs · package.json · tsconfig.json · README.md · astro-build-validator.skill
├── .github/workflows/deploy.yml        ← CI Cloudflare Pages (wrangler)
├── .wrangler/ · .cowork/
├── scripts/  validate-blog.mjs · validate-mdx.mjs · install-hooks.sh (+ convert-to-avif, migrate-blog)
├── src/
│   ├── layouts/   BaseLayout.astro (177 l.) · ArticleLayout.astro (834 l.) · SalonLayout.astro (395 l.)
│   ├── components/ raíz (9: Header, Footer, Hero, TopBar, Breadcrumb, NavStrip, NavStripBottom, RelatedLinks, InfoLocal) · content/ (14 + index.ts + mdx-components.ts) · seo/ (7)
│   ├── content/   config.ts (2 colecciones) · blog/ (133 .mdx) · salones/ (20 .mdx)
│   ├── data/      business.ts (NAP central) · products.ts (8) · productos/ (8 .ts + index + types) · cobertura/ (16 .ts + index + types) · zonasLocal.ts · modules.json (2472 l., DESFASADO)
│   ├── pages/     index, catalogo, [categoria]/[slug] (productos), cobertura(+[slug]), salones/[slug], blog/[...slug]+[page]+index, directorio-salones..., + hubs (como-funciona/opiniones/contacto/...)
│   ├── styles/    cobertura.css · producto.css · salones.css
│   └── utils/     article.ts · version.ts
├── public/  css/ (style.css 49KB + 7 más) · fonts/ (18 woff2) · js/ (app.js, analytics.js) · _headers · _redirects · CNAME · robots.txt
├── docs/ (19 .md + modulos/) · audits/ (8) · cro-mejoras/ (T1-T10)
├── sitio-antiguo-html/ (45 dirs, WP viejo) · _migrated-salones/ (22, fuente migración) · brincolins-articulos/ · mededul-toluca-*.md (ajenos)
```

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout` (177 l.) | `src/layouts/BaseLayout.astro` | **Raíz** — arma TODO el head SEO | `title*`, `description*`, `canonical?`, `ogTitle/Description/Image?`, `ogType?`, `twitterTitle/Description/Image?`, `keywords?`, `currentPage?`, `noindex?` | `<head>` completo (ver SEO) + `<WebSiteSchema/>` sitewide + slot `head` (schema/CSS extra). Body: skip-link, `TopBar`, `Header`, `<main><slot/></main>`, **botón WhatsApp flotante inline** (`.whatsapp-float`, `wa.me/525531281706`, líneas 144-154), `Footer`. Scripts: TruConversion (inline), `/js/app.js`, **dmchamp** chat (lazy 3s). |
| `ArticleLayout` (834 l.) | `src/layouts/ArticleLayout.astro` | **Extiende BaseLayout** | `post: CollectionEntry<'blog'>`, `canonicalUrl`, `readingTime`, `relatedPosts[]`, `latestPosts[]`, `previousPost?`, `nextPost?` | Blog. Inyecta `<ArticleSEO slot=head>` (BlogPosting+BreadcrumbList), barra de progreso, `Breadcrumb`, `Hero`, `<article itemscope Article>`, sidebar gigante hardcodeado, related/prev-next, `NavStripBottom`. WhatsApp ~5 veces. |
| `SalonLayout` (395 l.) | `src/layouts/SalonLayout.astro` | **Extiende BaseLayout** | `data: any`, `slug: string` | Salones. Construye JSON-LD **en el propio layout** (LocalBusiness+BreadcrumbList+FAQPage+WebPage vía `set:html`); tema por salón con CSS vars `--s-primary/secondary/accent`; secciones data-driven; cross-sell INFLAPY que consume `BUSINESS`. |

**Clave:** BaseLayout arma todo el head base (title/desc/canonical/OG/Twitter/hreflang/geo/robots); los componentes `seo/` solo añaden JSON-LD. `ArticleSEO.astro:105-109` comenta que NO duplica metas porque "BaseLayout ya las emite" (hallazgo I1).

## Componentes — inventario
| Componente | Ruta | Props | Uso |
|---|---|---|---|
| `Hero` | `components/Hero.astro` | `badge?, title*(HTML), subtitle*, marketing1*/2*(HTML), marketing1Title?/2Title?, isHome?, navItems?` | TODAS las páginas (gradiente magenta→violeta, 2 marketing cards, incrusta `NavStrip`) |
| `Breadcrumb` | `components/Breadcrumb.astro` | `items: BreadcrumbItem[]` (name/label + href?) | Páginas internas (microdata BreadcrumbList; `margin-top:160px` por header sticky) |
| `NavStrip`/`NavStripBottom` | `components/NavStrip*.astro` | `items?` (default 7-8 botones) | Embebido en Hero / pre-footer |
| `RelatedLinks` | `components/RelatedLinks.astro` | `title, subtitle, items[]` | Cobertura |
| `InfoLocal` | `components/InfoLocal.astro` | `zona: ZonaLocal` | Cobertura `[slug]` (tiempo entrega, vialidades, espacios, caso real, consejo) |
| `TopBar`/`Header`/`Footer` | `components/*.astro` | phone/email/hours? / currentPage? / — | BaseLayout + ArticleLayout |
| **`content/` (14 para MDX)** | `components/content/*.astro` | — | `CTABox` (title/buttonText/buttonLink/variant), `FAQAccordion` (items), `InflatableCards` (items), `StatsGrid`/`StatCard`, `AlertBox`, `ComparisonTable`, `FeatureList`, `ImageGallery`, `InfoCard`, `ProsCons`, `Quote`, `StepList`, `VideoEmbed` — mapeados en `mdx-components.ts` (`<Content components={mdxContentComponents}>`) |
| **`seo/` (7)** | `components/seo/*.astro` | — | ver tabla SEO |

⚠️ Botón WhatsApp flotante = **inline en BaseLayout** (no componente). `modules.json`/docs documentan un `WhatsAppFloat.astro` que **ya no existe**.

## Content Collections / esquemas / taxonomías
`src/content/config.ts` (147 l., Zod) — **2 colecciones**:
- **`blog`** (133 .mdx): `title` 10-120 · `description` 50-160 · `pubDate`/`updatedDate` · `author` · `category` · `tags[]` · `heroImage` (image()|string + alt + w/h) · `heroGallery?` 2-8 · `draft` · `canonical?` · `noindex` · `readingTime?` · **`autogenerated`** (default false) · **`audit`** (source/aiModel/workflowVersion — campos para n8n).
- **`salones`** (20 .mdx): esquema muy rico — identidad, seo, theme (CSS vars), zona (locality/region/area enum CDMX|Edomex), address (lat/lng/mapUrl), telephone (omitible si placeholder), rating, amenities, hours, hero (7 campos), secciones data-driven (proofBar/gallery/servicios/spotlight/eventos/porque/opiniones/faq/ficha/blogLinks/CTAs).

**Generación de páginas (4 rutas dinámicas + data .ts):**
1. **`[categoria]/[slug].astro`** (productos): `getStaticPaths` itera `Object.keys(productoPages)` (de `data/productos/`); renderiza `<Fragment set:html={data.htmlBody}>`. **Data-driven desde `data/productos/`** (8 archivos `.ts` enormes — barco-pirata.ts = 1230 l. con `jsonld[]` + `htmlBody` string completo).
2. **`cobertura/[slug].astro`**: itera `data/cobertura/` (16 alcaldías `.ts`); + `InfoLocal` desde `zonasLocal.ts`. **Data-driven.**
3. **`salones/[slug].astro`**: `getCollection('salones')` → `<SalonLayout>`. **Colección MDX.**
4. **`blog/[...slug].astro`**: `getCollection('blog')`; calcula readingTime/relatedPosts/prev-next (`utils/article.ts`); `<ArticleLayout>` + `<Content components={mdxContentComponents}>`. **Colección MDX.**

⚠️ **Doble fuente de catálogo:** `data/products.ts` (8 productos, fuente "liviana" con precio para ProductSchema/ServiceSchema) **vs** `data/productos/*.ts` (8 `ProductoPage` con `jsonld` crudo + `htmlBody`). ⚠️ Categorías de blog **duplicadas por acento**: "Guias" (32) y "Guías" (29) como categorías distintas (`category` es string libre).

## SEO real
- **Metas (en `BaseLayout.astro:67-101`):** title, description, keywords?, robots (`index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1` o noindex), author, **geo.*** (region MX-CMX, placename, position, ICBM), canonical (slash forzado), **hreflang** es-MX + x-default (ambos al canonical, no multi-idioma real), **OG completo** (1200×630, locale es_MX), **Twitter** `summary_large_image` (@inflapy). ⚠️ Sin `og:image:alt`, sin SearchAction (comentado a propósito — no hay buscador server).
- **Schema JSON-LD — 7 componentes `seo/` dedicados:**
  | Componente | Schema | Fuente |
  |---|---|---|
  | `WebSiteSchema` | WebSite(#website)+Organization(#organization) | business.ts |
  | `OrganizationSchema` | Organization completo (contactPoint, knowsAbout, subOrganization→LocalBusiness; sin aggregateRating, hallazgo I6) | business.ts |
  | `LocalBusinessSchema` | LocalBusiness via `buildLocalBusinessJsonLd(extra)` (acepta aggregateRating solo en /opiniones) | business.ts |
  | `ProductSchema` | Product via `buildProductJsonLd` (precio, offer, seller→@id) | products.ts |
  | `ServiceSchema` | Service + OfferCatalog (16 alcaldías + 7 municipios) + AggregateOffer + ReserveAction/OrderAction | business+products |
  | `SpeakableSchema` | WebPage + SpeakableSpecification (búsqueda por voz) | business.ts |
  | `ArticleSEO` | BlogPosting + BreadcrumbList + metas article:* (no duplica OG/canonical) | props |
  Conteo `@type` (`grep`): Question/Answer 239 c/u, PostalAddress 210, Place 193, ListItem 145, Offer 98, Service 52, Product 50, LocalBusiness 47, BreadcrumbList 42, FAQPage 41, etc. (~55 tipos). `WebSiteSchema` sitewide; `LocalBusinessSchema` en producto; en cobertura/producto el JSON-LD va crudo dentro de los `.ts` por `set:html`.
- ✅ **`aggregateRating` 4.9/527 (312 Google+156 FB+59 WA) definido en business.ts pero NO emitido por defecto** (solo `/opiniones` lo pasa vía `extra`, comentario líneas 189-191: "Google exige reseñas visibles") — manejo correcto, a diferencia de BRINCOLINS/MESECI.
- **robots.txt** (`public/robots.txt`): Allow general; Disallow draft/api/_astro/landing/gracias/404; Crawl-delay 1; permite facebookexternalhit/Twitterbot/LinkedInBot/WhatsApp/Googlebot/Bingbot. ⚠️ **NO bloquea bots de IA** (sin GPTBot/CCBot/ClaudeBot/Google-Extended) — abierto a scrapers IA.
- **URLs:** kebab-case, trailing slash siempre (CF redirige 308); CDN ExactDN con `?w=&lossy=1&strip=all`.
- **Internal linking:** `NavStrip`/`NavStripBottom`, `RelatedLinks`, sidebar de blog/salón, breadcrumbs. Robusto.

## Sistema de diseño
- **Tokens** en **`public/css/style.css`** `:root` (no en src/): `--color-primary/secondary/accent` (+dark/light), `--color-yellow/cyan/white`, escala `--color-gray-50..900`, `--gradient-primary/secondary/hero/fun`, `--font-primary`/`--font-display`, espaciado `--space-xs..4xl`, `--radius-*`, `--shadow-*`+glow, `--container-max/padding`, tokens sociales `--biz/--fb/--ig/--yt/--wa`.
- **Paleta:** magenta `#ff12cc` (primary, theme-color) + violeta `#8B5CF6` (secondary) + cyan `#00D9FF`/`#0ea5e9` + amarillo `#ffd93d` + verde WA `#25D366`. Gradiente firma `linear-gradient(135deg, #ff12cc, #8B5CF6)`; hero mesh magenta→violeta→índigo.
- **Tipografía:** Fredoka (display) + Nunito (cuerpo), woff2 self-hosted (`fonts.css`).
- **Estrategia CSS:** critical + preload con `onload` swap + `<noscript>` fallback + cache-buster `?v={timestamp}` (`utils/version.ts`).
- **UI base / patrones:** Hero universal (badge+title+subtitle+2 cards). Cards de producto. `CTABox` (gradiente). WhatsApp float fijo (`.whatsapp-float`). Breadcrumbs microdata. Sidebars de blog/salón con widgets.

## Convenciones
- **Naming:** kebab-case en archivos/slugs (`renta-de-inflables-{alcaldia}-cdmx`); camelCase en exports de data (`barcoPirata`, `gustavoAMadero`); PascalCase componentes; BEM-ish en CSS.
- **Fuente central NAP: `src/data/business.ts`** (CONFIRMADO, documentada como única). WhatsApp canónico `525531281706`. ⚠️ Hay otros 2 números en MDX: `525528138060` (32 usos en 16 artículos de **aliados/proveedores** — intencional, no INFLAPY) y `525544990071` (1 salón). No están centralizados (hardcoded en MDX).
- **Alias declarados pero infrautilizados** (el código usa rutas relativas).

## Flujos / procesos
1. **Contenido blog:** `.mdx` con frontmatter Zod (campos `autogenerated`/`audit` listos para n8n) → `blog/[...slug]` con componentes MDX. Productos/cobertura desde `data/*.ts`.
2. **Conversión:** formularios arman `wa.me?text=` (honeypot anti-spam); chat dmchamp lazy. Sin backend.
3. **CDN:** ExactDN en remotePatterns + uso masivo en blog/productos/salones.
4. **Calidad pre-build:** `validate-blog.mjs` + `validate-mdx.mjs` (valida props requeridos por componente MDX) + pre-push hook (`install-hooks.sh`); `build = validate && astro build`.
5. **Deploy:** push a `main` → GitHub Actions → wrangler → Cloudflare Pages.

## Integraciones
| Servicio | Estado | Evidencia |
|---|---|---|
| **Cloudflare Pages** | ✅ Activo (deploy target) | `.github/workflows/deploy.yml` (wrangler-action, `pages deploy dist --project-name=inflablesparafiestas`); `_headers` (CSP), `_redirects` (301s) |
| **ExactDN** (CDN img) | ✅ Activo | `astro.config.mjs` (remotePatterns `e34tcqkvbt4.exactdn.com`) + CSP img-src + uso en MDX |
| **Rybbit** (analytics) | ✅ Activo | `public/js/analytics.js` (siteId `3ccbd1d99139`, `app.rybbit.io`, retry+fallback, off en localhost) |
| **TruConversion** (heatmaps) | ✅ Activo | inline en BaseLayout (id `63002/bf20b`) |
| **DMChamp** (chat) | ✅ Activo | BaseLayout (lazy `api.dmchamp.com`) |
| **WhatsApp** | ✅ Activo (lead capture) | `BaseLayout.astro:144-154`, formularios `blog/index.astro:1237-1303` |
| **n8n** | ⚠️ Documentado, no en runtime | `docs/article-system-n8n.md` (contrato frontmatter) + 1 artículo demo (`ejemplo-articulo-automatizado-n8n.mdx`, draft+noindex, `audit.source:n8n`); sin webhook/código en repo |
| **GA4 / GTM / Meta Pixel** | ❌ HUECO | `gtag`/`dataLayer` llamados defensivamente pero NO cargados (`cro-mejoras/T5` pendiente "sin esto no se mide nada"). Solo Rybbit+TruConversion activos |
| **fal.ai / Brevo / formsubmit / formspree** | ❌ HUECO: sin evidencia | `grep` sin resultados |

## Documentación previa (docs/ + audits/): qué cubre, qué es reutilizable
**`docs/` (19 .md) — no es un vault Obsidian formal, son docs con aspiración a vault** (frontmatter + wikilinks; `docs/modulos/INDEX.md` referencia un espejo Obsidian externo no presente):
- `CONTENT-COMPONENTS.md` (catálogo de los 14 componentes MDX), `DEPLOY.md` + **`PLAYBOOK-CF-PAGES-AUTODEPLOY.md`** (SOP deploy Cloudflare), `article-system-n8n.md` (contrato Astro+MDX para n8n), `analisis-competencia-seo.md`.
- `docs/modulos/` (13 .md): `INDEX.md` (catálogo maestro con árboles de stack + wikilinks) + 1 .md por módulo (BaseLayout, Hero, NavStrip…). ⚠️ **PARCIALMENTE OBSOLETO** (documenta `WhatsAppFloat.astro` y salones .astro ya migrados).
- **`audits/` (8):** `AUDITORIA-TECNICA-INTEGRAL-2026-06-10.md` (la reciente, origen de hallazgos I1/I6), 3 auditorías SEO, blog-audit, `editorial-template.md` (plantilla editorial 1500+ palabras — reutilizable), estudio de mercado .xlsx.
- **`cro-mejoras/`:** plan CRO 10 tareas (T5 tracking GTM/GA4/Pixel 🔴 crítica, T3 WhatsApp por producto 🔴…), fechado 2026-05-11, parcialmente implementado.

**Reutilizable para el Master System (alto valor):**
- **`PLAYBOOK-CF-PAGES-AUTODEPLOY.md`** — plantilla de auto-deploy Cloudflare Pages para todo el cluster que use CF.
- **Arquitectura data-driven:** `business.ts` (NAP único + helpers) + **7 componentes `seo/`** (grafo @id coherente, manejo correcto de aggregateRating) + 14 componentes MDX con **validador de props** — el kit de schema/contenido más modular del cluster.
- **Template de cobertura local por alcaldía** (`data/cobertura/*.ts` + `zonasLocal.ts` + `InfoLocal.astro` + `cobertura/[slug].astro`) con contenido único verificable — patrón SEO-local exportable a cualquier negocio multi-zona.
- **Pipeline de validación pre-build con git hooks** (`scripts/validate-*.mjs` + `install-hooks.sh` + `build = validate && astro build`) — SOP de calidad raro y valioso.
- **`article-system-n8n.md` + campos `autogenerated`/`audit` en Zod** — contrato listo para automatización de contenido con n8n.
- **`editorial-template.md`** — plantilla editorial de artículo de blog.

## Clasificación
### ✅ Funciona
- **Arquitectura data-driven madura con NAP único:** `src/data/business.ts` centraliza NAP/schema consumido por helpers + 7 componentes `seo/` con grafo @id (sin reseñas fabricadas por defecto) — el patrón más limpio del cluster.
- **Pipeline de calidad pre-build:** `scripts/validate-blog.mjs`+`validate-mdx.mjs` (valida props requeridos por componente MDX) + pre-push hook + `build = validate && astro build` — bloquea regresiones antes de CF Pages.
- Template de cobertura por alcaldía con contenido hiperlocal único (`data/cobertura/` + `zonasLocal.ts` + `InfoLocal.astro`).
- Auto-deploy Cloudflare Pages documentado + funcional (`PLAYBOOK-CF-PAGES-AUTODEPLOY.md`, `.github/workflows/deploy.yml`).

### ❌ Falla
- **Doble fuente de verdad en productos con precios divergentes:** `data/products.ts` (barco-pirata price=1800) vs `data/productos/barco-pirata.ts` (JSON-LD crudo price="2500") → schema con precio inconsistente. Además `htmlBody` con FAQ clonadas sin corregir (barco-pirata describe "2m, ideal interiores" — texto de Mini Castillo) — `src/data/productos/barco-pirata.ts`.
- **Categorías de blog duplicadas por acento:** "Guias" (32) y "Guías" (29) como categorías distintas (`category` string libre) → fragmenta el filtro y diluye SEO de categoría — `src/content/blog/*.mdx`.
- **Documentación desfasada:** `modules.json` (2472 l.) y `docs/modulos/` documentan `WhatsAppFloat.astro` y salones .astro que ya no existen (migrados) — `src/data/modules.json`.
- **GA4/GTM/Pixel no instalados** (gtag/dataLayer llamados defensivamente pero ausentes); `public/CNAME` vestigio inútil en CF — `cro-mejoras/T5`, `public/CNAME`.
- robots.txt no bloquea bots de IA — `public/robots.txt`.

### 🤖 Automatizable
- **Generación de artículos de blog vía n8n** — infraestructura LISTA: campos Zod `autogenerated`/`audit`, contrato `docs/article-system-n8n.md`, validador MDX y 1 demo funcional. Solo falta conectar el workflow n8n real — `src/content/config.ts`, `docs/article-system-n8n.md`.

### 📐 Estandarizable
- **Template de cobertura local por alcaldía** (`data/cobertura/*.ts` + `zonasLocal.ts` + `InfoLocal.astro` + `[slug].astro`) como patrón SEO-local del Master System.
- **`business.ts` + 7 componentes `seo/`** (NAP único + librería de schema con @id + aggregateRating correcto) como contrato de identidad/schema canónico.
- **Pipeline validate-*.mjs + git hooks + build=validate&&build** como SOP de calidad pre-deploy.

## ⚠️ HUECOS
- **HUECO: INFLAPY vs BRINCOLINS (gemelos).** Comparten WhatsApp (`525531281706`), email pattern, catálogo de 8 inflables idéntico, paleta y enfoque CDMX. INFLAPY es la versión **data-driven madura**; BRINCOLINS la **estática/hardcodeada**. No determiné cuál es el original ni si son del mismo dueño con dos dominios — requiere confirmar.
- **HUECO: doble fuente de productos.** No reconcilié `products.ts` vs `data/productos/*.ts`; los precios divergen → riesgo de schema con precio falso (no verifiqué los 8).
- **HUECO: GA4/tracking.** Sin GA4/GTM/Pixel (cro-mejoras T5 pendiente); no se mide conversión cuantitativa.
- **HUECO: vault Obsidian.** Referenciado en `docs/modulos/INDEX.md` (espejo externo) pero no presente en el filesystem accesible → solo docs sueltos.
- **HUECO: integraciones.** Sin fal.ai/Brevo/formsubmit (conversión por WhatsApp); n8n documentado pero sin runtime.
- **HUECO: ruido de migración.** `sitio-antiguo-html/` (WP viejo), `_migrated-salones/`, `brincolins-articulos/`, `mededul-toluca-*.md`, `preguntas_reales_*.md` — fuera del build; no determiné si todos son residuo definitivo.
- **HUECO: muestreo.** Los 133 posts MDX, 16 alcaldías y 20 salones se inspeccionaron por patrón/muestra (config + 1 por tipo), no archivo por archivo.
