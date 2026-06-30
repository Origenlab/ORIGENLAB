# Diagnóstico — GAMADEMEXICO
> Propósito: Auditoría forense del proyecto Astro de catálogo SEO de equipos contra incendios (GAMA de México), con evidencia archivo:línea para alimentar el Vault Maestro y la fábrica de sitios.

## Identidad
- **Negocio / dominio:** GAMA de México — distribuidor autorizado Elkhart Brass de equipo contra incendios (monitores, boquillas, mangueras, válvulas, conexiones/herrajes, gabinetes-hidrantes). Dominio `https://gamademexico.com` (`src/lib/config.ts:8`, `CNAME:1`, `astro.config.mjs:22`).
- **Tipo de sitio:** Catálogo de producto SEO-first + blog técnico + directorio local — sitio estático (no e-commerce: sin carrito ni pago; conversión 100% vía WhatsApp/formulario). Evidencia: `output: 'static'` (`astro.config.mjs:28`); cotización por WhatsApp en `src/components/CotizacionForm.astro:287`; sin pasarela de pago en todo `src/`.
- **ARQUETIPO: B — Catálogo SEO/contenido a gran escala con conversión por mensajería (lead-gen).** Justificación con evidencia:
  - Volumen de contenido programático: **225 productos**, **84 posts de blog**, **53 empresas certificadas**, **6 categorías**, **4 hidrantes** en Content Collections (`src/content.config.ts:225`; conteo de archivos en `src/content/`).
  - Generación masiva por rutas dinámicas: `src/pages/productos/[...slug].astro:15` (getStaticPaths sobre 225 productos), `src/pages/[seccion]/[subcategoria].astro:22` (33 subcategorías desde capa de datos), `src/pages/blog/[categoria]/[slug].astro:27`, `src/pages/empresas-certificadas/[slug].astro:13`. Auditoría previa reporta **726 páginas generadas** (`ESTUDIO-INTEGRAL-SITIO-2026.md:24`).
  - SEO industrializado: JSON-LD en todas las plantillas (`src/lib/seo.ts`), sitemap con prioridades por tipo de URL (`astro.config.mjs:50`), interlinking blog↔producto↔servicio (`src/pages/blog/[categoria]/[slug].astro:108-125`).
  - Conversión por mensajería, no carrito: formulario que arma `wa.me` (`src/components/CotizacionForm.astro:266-287`), burbuja WhatsApp global (`src/components/WhatsAppBubble.astro`), sticky CTA móvil (`src/layouts/Base.astro:245-253`).
- **Estado:** En producción y activo. Build verde tras auditorías recientes (`AUDITORIA-TECNICA-2026.md:14-22`); CI/CD operativo a GitHub Pages (`.github/workflows/deploy.yml`); CDN de imágenes confirmado sirviendo en vivo (`AUDITORIA-CDN-EXACTDN-2026-06-15.md:12`). Madurez alta: tipado strict, validación de contenido en CI, refactor de duplicación ya ejecutado.

## Stack
- **Astro `^5.17.1`**, output `static`, `base: '/'`, `trailingSlash: 'never'`, `build.format: 'file'`, `inlineStylesheets: 'auto'`, `compressHTML: true`, `prefetch { prefetchAll: true, defaultStrategy: 'hover' }`, `vite.build.cssMinify: true` (`astro.config.mjs:25-97`; `package.json:25`).
- **Integraciones Astro:** `@astrojs/sitemap ^3.7.0` con `serialize()` de prioridades + `filter` que excluye `/404` (`astro.config.mjs:48-86`); `@fontsource/inter ^5.2.8` auto-hospedada en pesos 400-800 (`src/layouts/Base.astro:14-18`).
- **Markdown:** plugin propio `rehype-ewww-images.mjs` (CDN ExactDN/EWWW para imágenes de blog; usa `PUBLIC_EWWW_CDN_BASE` solo en producción) (`astro.config.mjs:13-16,100-102`).
- **Dev/tooling:** `@astrojs/check ^0.9.9`, `playwright ^1.58.2` (e2e galerías), `prettier ^3.8.4`, `typescript ^5.9.3` (`package.json:27-32`); `tsconfig` extiende `astro/tsconfigs/strict` (`tsconfig.json`).
- **Sin** wrangler / sin dependencias de framework UI (cero React/Vue/Svelte). Solo 3 dependencias de producción (`package.json:22-26`).
- **Analítica/terceros (runtime, en `<head>`):** Rybbit Analytics (`src/layouts/Base.astro:151`), TruConversion cargado tras idle (`src/layouts/Base.astro:173-187`), script inline ExactDN cliente (`src/layouts/Base.astro:153-170`).
- **Hosting (⚠️ inconsistencia, ver HUECOS):** workflow despliega a **GitHub Pages** (`.github/workflows/deploy.yml:1,39-52`); `public/_headers` y `public/_redirects` están escritos para **Cloudflare Pages** (`public/_headers:2`, `public/_redirects:2`).

## Estructura de carpetas
```
GAMADEMEXICO/
├── astro.config.mjs            # config Astro (sitemap serialize, rehype CDN)
├── package.json / tsconfig.json
├── CNAME                       # gamademexico.com (GitHub Pages custom domain)
├── .env.example / .env.development / .env.production   # solo PUBLIC_EWWW_CDN_BASE
├── .github/workflows/          # deploy.yml (GH Pages), ci.yml (check+content+build)
├── public/
│   ├── _headers / _redirects   # sintaxis Cloudflare Pages (seguridad/cache + ~230 redirects)
│   ├── robots.txt              # bloquea SEO bots terceros; apunta sitemap-index.xml
│   ├── site.webmanifest, favicon, icon-512.png, icon.svg
│   └── img/                    # ~1,618 imágenes (1,600 AVIF) — AUDITORIA-CDN-EXACTDN:35
├── src/
│   ├── layouts/Base.astro      # ÚNICO layout (24 props) — head/SEO/hero/CTA/footer
│   ├── components/             # 31 .astro (12 raíz + blog/ + directorio/)
│   ├── content.config.ts       # 5 colecciones Zod
│   ├── content/                # productos(225) blog(84) empresas(53) categorias(6) hidrantes(4)
│   ├── data/subcategorias/     # capa de datos tipada: 6 *.generated.json + index.ts + types.ts
│   ├── lib/                    # config, seo, images, breadcrumb, blogHelpers, pageCta, markdown/
│   ├── pages/                  # rutas estáticas + dinámicas (productos, subcats, blog, empresas, hidrantes, servicios)
│   ├── scripts/main.ts         # JS de cliente (header scroll, menú móvil, FAQ, forms, smooth-scroll)
│   └── styles/                 # 8 hojas CSS (global.css = design system)
├── scripts/                    # audit-images, audit-blog-quality, normalize-blog, clean-cache, e2e-gallery, extract-subcategorias, neuronwriter-seo.py, browseract-api.js
├── process_blindex.py / process_mangueras.py / process_succion.py  # generadores de fichas
├── optimizar-directorio.sh     # PNG→AVIF 1200×675 directorio
├── docs/                       # 18 archivos: runbooks/estudios galerías + plantillas de creación de páginas/blog
├── referencia-boquillas/ referencia-elkhart/ referencia-stang/   # material de referencia de fabricantes
├── aqueon-blog/ video-traje-bombero/ whisk-references/           # activos auxiliares
└── *.md (raíz)                 # 11 docs de auditoría/proceso/SOP
```

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `Base.astro` | `src/layouts/Base.astro` | Único layout; no extiende otro. Compone TopBar+Header+Breadcrumb+Hero+TrustBar+CtaCatalogo+slot+LeadCapture+Footer+WhatsAppBubble+sticky CTA (`Base.astro:1-10,192-253`) | 24 props: `title, description, canonical, ogTitle/Description, ogImage, ogType, twitterTitle/Description, activePage, showBreadcrumb, showHero, heroTitle/Intro/Badge/Metrics/Primary*/Secondary*, heroShowRightContent, noindex, structuredData[], showLeadCapture` (`Base.astro:23-48`) | Todas las páginas del sitio. Es el único layout (auditoría lo señala como sobrecargado: "24 props… concentra demasiadas responsabilidades", `AUDITORIA-TECNICA-2026.md:20`) |

Detalles SEO en el layout: clamp de meta description a ≤160 (`Base.astro:78-81`), canonical auto desde pathname normalizado (`Base.astro:83-84`), `og:image:type` dinámico por extensión (`Base.astro:121`), geo meta tags MX (`Base.astro:108-112`), preconnect/dns-prefetch al CDN si está configurado (`Base.astro:141-142`), inyección de `structuredData[]` como JSON-LD (`Base.astro:144-146`), `<html lang="es-MX">` (`Base.astro:94`).

## Componentes — inventario
Total: **31 componentes `.astro`** (12 en raíz, 9 en `blog/`, 3 en `directorio/`; + Hero/SectionHeader/etc.). Representativos abiertos con evidencia:

| Componente | Ruta | Props (clave) | Uso |
|---|---|---|---|
| Hero | `src/components/Hero.astro` | `titulo, intro, etiqueta, metricas[], cta(Primario/Secundario)Texto/Enlace, mostrarContenidoDerecho` + `<slot>` (`Hero.astro:3-13`) | Hero de toda página vía Base; dos variantes one-col/two-cols (`Hero.astro:27`) |
| Header | `src/components/Header.astro` | `activePage` (`Header.astro:4-8`) | Nav desktop con mega-menú + nav móvil; logo vía CDN (`Header.astro:9-13,43-50`) |
| TopBar / Footer / TrustBar | `src/components/{TopBar,Footer,TrustBar}.astro` | — | Barras globales en Base (`Base.astro:192,225,240`) |
| Breadcrumb | `src/components/Breadcrumb.astro` | `pageTitle` (`Breadcrumb.astro:5-9`) | Migas auto desde pathname; microdata `schema.org/BreadcrumbList` inline (`Breadcrumb.astro:20-37`) |
| CategoryCard | `src/components/CategoryCard.astro` | `titulo, subtitulo, enlace, subcategorias[], imagen` (`CategoryCard.astro:11-19`) | Grid de 6 categorías en home (`index.astro:102-175`); srcset responsive (`CategoryCard.astro:30-40`) |
| SubcategoryProductCard | `src/components/SubcategoryProductCard.astro` | `title, description, brand, image, productSlug, flow, material, certifications[]` (`SubcategoryProductCard.astro:4-13`) | Card de producto en páginas de subcategoría; imagen como background optimizado 400px (`SubcategoryProductCard.astro:27`) |
| ProductSidebar | `src/components/ProductSidebar.astro` | `navTitulo, subcategorias[], baseUrl, backLink*, certificaciones[], marcas[], aplicaciones[], productosRelacionados[]` | Sidebar en producto y subcategoría (`productos/[...slug].astro:287`, `[seccion]/[subcategoria].astro:167`) |
| RelatedProductsGrid | `src/components/RelatedProductsGrid.astro` | `titulo, subtitulo, productos[], maxProductos, verTodos*` | Cross-sell por categoría (`productos/[...slug].astro:320`) |
| CotizacionForm | `src/components/CotizacionForm.astro` | `titulo, producto, tipoEquipo, bullets[], pagina` (`CotizacionForm.astro:5-16`) | CTA de conversión universal; arma mensaje y abre `wa.me` (`CotizacionForm.astro:266-287`); `formId` determinista anti-CLS/build (`CotizacionForm.astro:33`) |
| WhatsAppBubble | `src/components/WhatsAppBubble.astro` | `phoneNumber, defaultMessage, position, showTooltip, tooltipText` (`WhatsAppBubble.astro:2-16`) | Burbuja flotante global (`Base.astro:242`); oculta en móvil cuando hay sticky CTA (`global.css:1372`) |
| Faq | `src/components/Faq.astro` | `items[{pregunta,respuesta}], id` | FAQ acordeón en home/producto/subcat (`index.astro:529`, `productos/[...slug].astro:340`) |
| CtaCatalogo / LeadCapture / SectionHeader / ServiceCard / Testimonial | `src/components/*.astro` | varias | Bloques de marketing reutilizables |
| Blog (9) | `src/components/blog/*.astro` | `BlogAuthor, BlogCTA, BlogCard, BlogCategories, BlogGrid, BlogRecent, BlogRelatedPosts, BlogSidebar, BlogTableOfContents, BlogTags` | Sistema de blog (sidebar TOC, related, recent, tags) (`blog/[categoria]/[slug].astro:279-292`) |
| Directorio (3) | `src/components/directorio/*.astro` | `SidebarDirectorio, EmpresasRecomendadas, ArticulosRelevantes` | Directorio empresas certificadas (`empresas-certificadas/[slug].astro:556-585`) |

## Content Collections / esquemas / taxonomías
5 colecciones con loader glob, todas en `src/content.config.ts:225`:

1. **`productos`** (225) — `src/content.config.ts:4-35`. Zod: `title 15-70`, `description 80-165`, `categoria` **enum cerrado** (`monitores|boquillas|mangueras|valvulas|conexiones-herrajes|gabinetes-hidrantes`, líneas 14-21), `subcategoria?` (string libre), `imagen` obligatoria con `.startsWith('/img/')`, `galeria[]?`, `certificaciones[]?`, `flujo?`, `material?`, `marca` default `'Elkhart Brass'`, `modelo?`, `precioReferencia?`, `destacado` default false, `orden` default 0.
2. **`blog`** (84) — `src/content.config.ts:40-100`. `title 20-70`, `description 80-165`, `fecha`/`fechaActualizacion` regex `YYYY-MM-DD`, `categoria` enum (las 6 + `equipos-contra-incendios` + `equipos-bomberos`, líneas 56-65; las 2 últimas se añadieron para reparar build roto — `AUDITORIA-TECNICA-2026.md:16`), `tags[]`, `autor` union string|objeto, `imagen` obligatoria `/img/`, `imagenAlt` min 10, `imagenOg?`, `destacado/draft`, `productosRelacionados[]?`/`articulosRelacionados[]?` (interlinking), `canonical?`, `noindex`, `tiempoLectura?`. Comentarios citan "automatización n8n" (líneas 38,51).
3. **`categorias`** (6) — `src/content.config.ts:102-113`. `title, description, metaTitle, metaDescription, slug, imagen?, orden`.
4. **`empresasCertificadas`** (53) — `src/content.config.ts:118-184`. `nombre, slug, descripcion?`, `giro` **enum cerrado** (10 valores: hotel/restaurante/oficina/almacen/hospital/escuela/industria/comercio/residencial/otro), ubicación completa + `latitud/longitud` (number), `tipoSistema[]` **enum cerrado** (9 valores), fechas certificación, `certificacionVigente`, `verificado`.
5. **`hidrantes`** (4) — `src/content.config.ts:189-223`. `id, tipo (publico|privado)`, ubicación + geo, `presionPsi?`, `colorCodigo?` enum, `estadoOperativo` enum.

**Taxonomía de subcategorías (capa de datos separada de las colecciones):** `src/data/subcategorias/` — 33 definiciones tipadas (`SubcategoryDef`, `types.ts:52-134`) cargadas desde 6 `*.generated.json` (`index.ts:7-23`), con validación de integridad en build (rutas duplicadas, meta obligatoria, faqs no vacías — `index.ts:26-40`). Extraídas 1:1 de las antiguas 33 páginas estáticas vía `scripts/extract-subcategorias.mjs` (`types.ts:4-5`). Mapeos de nombres legibles y padres para breadcrumbs en `src/lib/breadcrumb.ts:4-127`; mapa categoría→URL en `src/lib/config.ts:76-83`; labels/slugs de blog en `src/lib/blogHelpers.ts:13-48`.

## SEO real
- **Metas/Head (todas las páginas, `src/layouts/Base.astro`):** `<title>`, meta description con clamp ≤160 (`Base.astro:78-81,100-101`), robots dinámico index/noindex con directivas max-snippet/max-image-preview (`Base.astro:102-105`), canonical auto (`Base.astro:106`), geo MX (`Base.astro:108-112`), OG completo con width/height/type/alt/site_name/locale (`Base.astro:114-124`), Twitter `summary_large_image` (`Base.astro:126-132`), theme-color, manifest, apple-touch-icon (`Base.astro:134-138`).
- **JSON-LD (helpers en `src/lib/seo.ts`):**
  - `Organization` (`seo.ts:21`) + `LocalBusiness` con `@id`, geo, openingHours, address[], priceRange (`seo.ts:53`) + `WebSite` con SearchAction (`seo.ts:97`) → **home** (`index.astro:56-61`).
  - `Product` con `Offer` (availability InStock, priceCurrency MXN, seller, parseo de `precioReferencia`) + `Brand` + `manufacturer` → **páginas de producto** (`seo.ts:124`, usado en `productos/[...slug].astro:126-136`).
  - `buildProductCategorySchema` → `Product`+`Offer` **sin** aggregateRating/review/precios falsos (eliminados por auditoría 2026 por riesgo de penalización Google — `seo.ts:212-216`) → **páginas de subcategoría** (`[seccion]/[subcategoria].astro:59`).
  - `BreadcrumbList` (`seo.ts:306`) en producto, subcategoría, blog, empresas.
  - `FAQPage` (`seo.ts:285`) en home, producto, subcategoría, empresas (FAQs generadas dinámicamente por categoría/giro — `productos/[...slug].astro:89-119`, `empresas-certificadas/[slug].astro:237-290`).
  - `TechArticle` (no plain Article) con author Person/worksFor, publisher con logo, datePublished/Modified, wordCount, timeRequired → **blog** (`seo.ts:334-348`, usado en `blog/[categoria]/[slug].astro:157-168`).
  - `LocalBusiness` por empresa del directorio (address+geo, **sin** aggregateRating/review — eliminados por riesgo legal/SEO sobre negocios de terceros, `empresas-certificadas/[slug].astro:359-384`).
- **Sitemap:** `@astrojs/sitemap` con `serialize()` — home 1.0/daily, categorías-contra-incendios + /equipos + /contacto 0.9/weekly, /gabinetes/ + /servicios/ 0.8/weekly, /productos/ + /empresas-certificadas 0.7/monthly, /blog 0.6/monthly, resto 0.4/yearly (`astro.config.mjs:50-86`). Genera `sitemap-index.xml` (`public/robots.txt:23`).
- **robots.txt** (`public/robots.txt`): `Allow: /`, `Disallow: /404`, bloquea AhrefsBot/SemrushBot/MJ12bot/DotBot, declara sitemap.
- **`_headers`** (`public/_headers`): CSP estricta (default-src self; img-src self+*.exactdn.com+truconversion; script-src self+rybbit+truconversion; form-action self+wa.me), HSTS preload, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy; cache inmutable 1 año para /img,/fonts,/_astro; HTML stale-while-revalidate. **⚠️ formato Cloudflare Pages** (ver HUECOS).
- **`_redirects`** (`public/_redirects`, ~230 líneas): redirects 301 de URLs antiguas `/categoria-contra-incendios/[slug]` → `/productos/[slug]`, fix de blog tags con %20, index.html→/. Generado tras 2 crawls de 404 (164+66). **⚠️ formato Cloudflare Pages.**
- **CNAME:** `gamademexico.com` (`CNAME:1`) — apex para GitHub Pages.
- **Internal linking (blog↔producto):** blog enlaza catálogo de su categoría + /equipos + /servicios/asesoria + hubs cross-categoría (`blog/[categoria]/[slug].astro:108-125,242-255`); productos relacionados por `data.productosRelacionados` y por categoría (`blog`/`productos/[...slug].astro:31-35`); directorio enlaza catálogo por `?sistema=` y artículos relevantes (`empresas-certificadas/[slug].astro:540,576`).

## Sistema de diseño
- **Tokens (fuente única):** `src/styles/global.css:1-56` — `:root` con paleta, tipografía, escalas fluidas, spacing, radios, sombras, transiciones, alturas y anchos máximos.
- **Paleta:** primario `--color-primary: #C41E3A` (rojo bombero), `--color-primary-dark: #9A1829`, secundario `--color-secondary: #1A1A2E` (azul-noche), accent `#F5F5F5`, texto `#333`, star `#E8A317`, escala de blancos para footer (`global.css:2-20`). `BRAND_COLOR = '#C41E3A'` también en `src/lib/config.ts:61`.
- **Tipografía:** `--font-primary: 'Inter', -apple-system…` (`global.css:21`); Inter auto-hospedada 400/500/600/700/800 (`Base.astro:14-18`); escalas `--font-size-2xl..4xl` con `clamp()` fluido (`global.css:27-29`).
- **Spacing/layout:** spacing `xs..3xl` con clamp (`global.css:32-37`), `--max-width: 1760px`, `--max-width-text: 1100px`, `--container-padding: clamp(1.25rem,3.5vw,4rem)` (`global.css:48-50`); `.container` y `.container--narrow` (`global.css:168-178`).
- **Patrones UI (en `global.css`):**
  - **Hero:** `.hero-section` con gradiente accent→white, badge, título clamp, métricas, variante two-cols (`global.css:183-297`).
  - **Botones:** `.btn` + variantes `--primary/--outline/--white/--ghost/--sm` con hover translateY + sombra (`global.css:299-374`).
  - **Cards:** `.service-card`, `.category-card`, `.product-card`, `.subcategory-product-card`, `.complementary__card` con aspect-ratio 16/9, hover translateY(-6px)+shadow-xl+zoom de imagen (`global.css:390-578,1270-1321`).
  - **CTA:** `.cotizacion-form` (CSS scoped en componente, `CotizacionForm.astro:122-242`), `.sticky-cta-mobile` (`global.css:1329-1373`).
  - **WhatsApp:** `.wa-bubble` con gradiente verde + animación pulse (`WhatsAppBubble.astro:36-131`).
  - **Breadcrumbs:** dos definiciones — global `.breadcrumb` con chevron CSS (`global.css:953-997`) y scoped en componente con separador `/` (`Breadcrumb.astro:45-96`) (⚠️ duplicación de estilos, ver HUECOS).
  - **Responsive/homologación:** breakpoints 640/768/1024/1280/1600 con densificación de grids en pantallas grandes (`global.css:1067-1148,1382-1397`), blindaje anti-scroll-horizontal móvil (`global.css:1424-1447`).
- **8 hojas CSS:** `global.css` (design system), `professional.css`, `subcategory.css`, `services-shared.css`, `contacto.css`, `empresas.css`, `hidrantes.css`, `nosotros.css`. `global.css`+`professional.css` cargadas globalmente vía Base; el resto por página (`Base.astro:11-12`; ej. `productos/[...slug].astro:3`).

## Convenciones
- **Idioma:** español de México en código, comentarios, contenido y UI (`<html lang="es-MX">`, `Base.astro:94`); props de componentes en español (`titulo`, `intro`, `metricas` — `Hero.astro:3-13`).
- **Config centralizada:** todo dato de negocio/contacto/SEO en `src/lib/config.ts` (SITE_*, PHONE/WHATSAPP, LOCATIONS, GEO, BRAND_COLOR, CATEGORY_MAP, helpers WhatsApp/tel/mail) — "fuente única de verdad" (`config.ts:1-101`).
- **Capas:** datos en `src/data/` (subcategorías como JSON tipado), lógica/helpers en `src/lib/`, contenido en `src/content/`, presentación en `src/pages` + `src/components`.
- **Determinismo de build:** IDs de formulario derivados de la página (no `Math.random`) para builds reproducibles (`CotizacionForm.astro:31-33`); orden de posts con fallback epoch para `fecha` opcional (`blogHelpers.ts:139-141`).
- **Imágenes:** rutas siempre `/img/...` (validado en Zod, `content.config.ts:24,81`); optimización vía helpers `getOptimizedImageUrl/generateSrcset/getThumbnailUrl` (`src/lib/images.ts`); width/height + loading/decoding/fetchpriority explícitos para evitar CLS (`Header.astro:27-32`, `productos/[...slug].astro:208-216`).
- **Accesibilidad:** skip-link (`global.css:120-138`, `Header.astro:16`), `.sr-only` para labels (`global.css:146-156`), focus-visible global (`global.css:140-143`), `aria-*` y focus-trap en menú móvil (`main.ts:79-99`), `prefers-reduced-motion` (`global.css:158-166`).
- **Comentarios "auditoría 2026"** marcan decisiones forenses por todo el código (ej. `seo.ts:212`, `CotizacionForm.astro:31`, `content.config.ts:23`).

## Flujos / procesos
- **CI (`.github/workflows/ci.yml`):** en push (no main) y PR → `astro check` (tipos) + `npm run content:blog:check` (valida blog) + `npm run build`, con `PUBLIC_EWWW_CDN_BASE` inyectada. Pensado para evitar regresiones como el build roto por categoría inválida (`ci.yml:3-4,26-35`).
- **Deploy (`.github/workflows/deploy.yml`):** en push a main + manual → checkout, Node 20, `npm ci`, `npm run build` (con CDN env), upload artifact, `actions/deploy-pages@v4` → **GitHub Pages** (`deploy.yml:1-52`).
- **Build hooks (`package.json`):** `prebuild` ejecuta `scripts/clean-astro-cache.mjs` (limpia caché Astro antes de build, líneas 7); scripts `content:blog:normalize/check/audit`, `audit:images`, `e2e:gallery(:prod/:local)` (`package.json:7-20`).
- **Pipeline de contenido (scripts/):** `extract-subcategorias.mjs` (extrae datos de páginas a JSON), `normalize-blog-content.mjs` / `audit-blog-quality.mjs` (normaliza y audita posts), `audit-images.mjs` (auditoría de imágenes), `neuronwriter-seo.py` (integración SEO NeuronWriter), `browseract-api.js` (scraping vía BrowserAct), `e2e-gallery-playwright.mjs` (e2e de galerías). Generadores de fichas en raíz: `process_blindex.py`, `process_mangueras.py`, `process_succion.py`. `optimizar-directorio.sh` (PNG→AVIF del directorio).
- **Conversión (runtime):** formulario → arma mensaje WhatsApp y abre `wa.me/5215565298240` (`CotizacionForm.astro:266-287`, `main.ts:176-198`). No hay backend/API de formularios: el lead viaja por WhatsApp.

## Integraciones
- **ExactDN / EWWW (CDN de imágenes) — REAL, en producción.** Evidencia: env `PUBLIC_EWWW_CDN_BASE=https://egsev2ykn2x.exactdn.com` (`.env.example:18`, `.env.development:2`, `.env.production`); plugin build `rehype-ewww-images.mjs` (srcset 480/768/1024/1280, lazy — `rehype-ewww-images.mjs:1-69`); helper `src/lib/images.ts` (params Photon w/quality/strip/fit/zoom); script inline cliente reescribe `<img src^="/img/">` a CDN excepto en localhost (`Base.astro:153-170`); preconnect/dns-prefetch (`Base.astro:141-142`); CSP permite `*.exactdn.com` (`_headers:14`). Verificado sirviendo AVIF en vivo (`AUDITORIA-CDN-EXACTDN-2026-06-15.md:26-32`).
- **Rybbit Analytics — REAL.** `<script src="https://app.rybbit.io/api/script.js" data-site-id="7e67c404e911" defer>` (`Base.astro:151`); permitido en CSP (`_headers:14`).
- **TruConversion (heatmaps/funnels) — REAL.** Carga diferida tras `load`+idle, `app.truconversion.com/ti-js/62721/6efb8.js` (`Base.astro:173-187`); permitido en CSP.
- **NeuronWriter (SEO) — herramienta de proceso (no runtime).** `scripts/neuronwriter-seo.py` (integración API SEO); usa placeholder `NEURONWRITER_API_KEY=tu-api-key` (sin secreto real, `neuronwriter-seo.py:14`).
- **BrowserAct (scraping de catálogos) — herramienta de proceso (no runtime).** `scripts/browseract-api.js` + `docs/browseract-workflow-prompt.md` (scraping de monitores Elkhart).
- **Google Maps — enlace, no API.** Botón "Ver ubicación en mapa" arma URL `google.com/maps/search/?api=1&query=lat,lng` por empresa (`empresas-certificadas/[slug].astro:440`). Sin embed ni API key.
- **n8n — mencionado, NO implementado en este repo.** ⚠️ HUECO: el schema de blog dice estar "optimizado para automatización n8n" y hay helpers `generateMarkdownFrontmatter`/`validateBlogFrontmatter` (`content.config.ts:38`, `blogHelpers.ts:264-352`), pero no existe workflow, endpoint ni credencial n8n en el repo. Es una convención de formato preparada para un n8n externo, no una integración activa aquí.
- **Cloudflare — NO activo como deploy.** ⚠️ Solo presente como sintaxis en `_headers`/`_redirects` (escritos para Cloudflare Pages) mientras el deploy real es GitHub Pages. Sin wrangler, sin `mcp`/D1/KV/R2. (ver HUECOS).
- **Brevo / SendGrid / fal.ai — NO presentes.** ⚠️ HUECO: cero evidencia en código, config o env (grep negativo en `src`, `public`, `scripts`, config).

## Documentación previa
Volumen alto y de calidad: **11 .md en raíz + 18 en `docs/`**. Tabla de los clave:

| Documento | Qué cubre | Reutilizable como |
|---|---|---|
| `AUDITORIA-TECNICA-2026.md` | Auditoría integral 36 KB: 69 páginas, 31 componentes, 372 MD, 8 CSS; 3 problemas críticos (build roto, JSON-LD fabricado, riesgo legal directorio), plan de refactor que recortó 33 páginas a datos (`:6,14-22`) | **SOP de auditoría técnica Astro** (plantilla de hallazgos + roadmap) |
| `ESTUDIO-INTEGRAL-SITIO-2026.md` | Verificación de build + reparación de ~675 enlaces rotos de breadcrumb + 263 links de blog; resultado 726 páginas, 0 links rotos (`:11-24`) | SOP de reparación de enlaces internos / verificación de build |
| `GUIA-ARTICULOS-BLOG.md` (23 KB) | Guía profesional de redacción de artículos (índice, tono experto de campo) | **Plantilla/SOP de redacción de blog** |
| `PROCESO-BLOG-SEO.md` | Proceso SEO de blog en fases (auditoría→canibalización→interlinking) con principios "calidad>velocidad, verificar antes de reportar" (`:8-30`) | **SOP de optimización SEO de blog** (directamente portable) |
| `BLOG-SEO-REPORTE.md` | Reporte de optimización SEO del blog (marzo 2026) | Ejemplo de reporte de resultados SEO |
| `AUDITORIA-CDN-EXACTDN-2026-06-15.md` | Verificación de CDN ExactDN: config, producción en vivo, inventario 1,618 imágenes (`:12,35`) | SOP de verificación de CDN de imágenes |
| `docs/TEMPLATE-ARTICULO-BLOG.md` | Plantilla maestra de artículo de blog | **Plantilla directa de blog** |
| `docs/documento-{categoria,productos,subcategorias}.md` | Guías de diseño/estructura/contenido para crear páginas de categoría, producto y subcategoría ("Sistema de Diseño v2.0") | **SOPs de creación de páginas de catálogo** (oro para la fábrica) |
| `docs/RUNBOOK-GALERIAS-PRODUCCION.md` + `docs/E2E-GALERIAS-*` | Runbook + resultados Playwright de galerías de producto (local/prod, comparativo) | SOP/runbook de e2e de galerías |
| `docs/browseract-workflow-prompt.md` | Prompt para workflow de scraping en BrowserAct | SOP de scraping de catálogos de fabricante |
| `AUDITORIA-MONITORES.md` / `AUDITORIA-RESPONSIVE.md` / `IMAGE-AUDIT-REPORT.md` | Auditorías puntuales (categoría monitores, responsive, imágenes de monitores) | Ejemplos de auditoría vertical |
| `ZACARIAS-TASK-001.md` / `ZACARIAS-LOG-001.md` | Tarea/log de optimización de imágenes + galerías (workflow interno) | Histórico de proceso (menos reutilizable) |
| `README.md` | Starter kit mínimo de Astro (genérico, sin personalizar) | Bajo valor |

Reutilizable global: los `docs/documento-*` + `PROCESO-BLOG-SEO.md` + `GUIA-ARTICULOS-BLOG.md` + `TEMPLATE-ARTICULO-BLOG.md` son SOPs/plantillas casi listos para portar al Vault Maestro.

## Clasificación

### ✅
- **Arquitectura de datos desacoplada y validada en build.** 33 subcategorías como JSON tipado con guardas de integridad (rutas duplicadas, meta/faqs obligatorias) que fallan rápido. Evidencia: `src/data/subcategorias/index.ts:26-40`, `types.ts:52-134`.
- **SEO técnico completo y honesto.** JSON-LD por tipo (Organization/LocalBusiness/WebSite/Product+Offer/TechArticle/FAQ/Breadcrumb), sitemap priorizado, canonical/OG/Twitter centralizados, geo MX. Datos estructurados fabricados eliminados deliberadamente. Evidencia: `src/lib/seo.ts:21-400`, `astro.config.mjs:50-86`, `src/layouts/Base.astro:96-146`.
- **Performance/imagen de primer nivel.** Output static + compressHTML + CSS minify + prefetch hover; Inter auto-hospedada; CDN ExactDN con srcset/AVIF horneado en build + reescritura cliente; cache inmutable. Evidencia: `astro.config.mjs:35-97`, `src/lib/images.ts`, `_headers:16-24`, `AUDITORIA-CDN-EXACTDN-2026-06-15.md:26-32`.
- **Accesibilidad cuidada.** skip-link, sr-only, focus-visible, focus-trap móvil, prefers-reduced-motion, microdata breadcrumb. Evidencia: `src/styles/global.css:120-166`, `src/scripts/main.ts:79-99`, `src/components/Breadcrumb.astro:20-37`.
- **CI que protege el build.** `astro check` + validación de contenido + build en cada PR. Evidencia: `.github/workflows/ci.yml:26-35`.

### ❌
- **Inconsistencia de host: deploy GitHub Pages vs `_headers`/`_redirects` de Cloudflare.** GitHub Pages **no** procesa `public/_headers` ni `public/_redirects`, por lo que la CSP/HSTS y los ~230 redirects 301 **no se aplican** salvo que un proxy (Cloudflare delante) los sirva. Evidencia: `.github/workflows/deploy.yml:39-52` vs `public/_headers:2` y `public/_redirects:2`. (Impacto SEO/seguridad alto si no hay Cloudflare proxy real — confirmar runtime.)
- **`Base.astro` sobrecargado (24 props, God-layout).** Concentra head, hero, trust, CTA, lead-capture, footer y scripts de terceros en un único layout; dificulta mantenimiento y reuso. Evidencia: `src/layouts/Base.astro:23-48,150-253`; señalado en `AUDITORIA-TECNICA-2026.md:20`.
- **Riesgo legal latente en `empresas-certificadas` (contenido, no resuelto).** 53 fichas afirman que empresas reales identificables (Four Seasons, BMW, Pemex, hospitales ABC…) están "certificadas por Gama de México" con `verificado: true`, sin fuente. Los ratings/reseñas del JSON-LD ya se quitaron, pero la afirmación de marca persiste. Evidencia: `src/content/empresas-certificadas/*.md` (53 archivos), `AUDITORIA-TECNICA-2026.md:18`.
- **Estilos de breadcrumb duplicados/divergentes.** Definición global (chevron CSS, `global.css:953-997`) y scoped en componente (separador `/`, distintos tokens de color, `Breadcrumb.astro:45-96`) coexisten. Evidencia citada.

### 🤖
- **FAQs, reviews y especificaciones generadas dinámicamente por categoría/giro/hash.** Producto: FAQ por categoría (`productos/[...slug].astro:89-119`); empresas: FAQs + reseñas por giro + selección por hash determinista del slug (`empresas-certificadas/[slug].astro:159-290`). Reduce trabajo manual pero es contenido sintético a escala (el hash sigue eligiendo cuántas reseñas mostrar, aunque ya no inventa ratings — `empresas-certificadas/[slug].astro:225-234`).

### 📐
- **Patrón "página dinámica alimentada por capa de datos tipada" reemplazando páginas estáticas duplicadas.** Un template (`[seccion]/[subcategoria].astro`) + `SubcategoryDef` + JSON generados sustituyen 33 páginas (~8,545 líneas, ~85% duplicadas) sin cambiar URLs ni añadir redirects. Evidencia: `src/pages/[seccion]/[subcategoria].astro:1-27`, `src/data/subcategorias/types.ts:1-5`, `AUDITORIA-TECNICA-2026.md:20`. Patrón canónico replicable para cualquier catálogo del Vault.

## ⚠️ HUECOS
- **Host real sin confirmar.** No se pudo verificar en runtime si hay Cloudflare delante de GitHub Pages. Si NO lo hay, `_headers` (CSP/HSTS) y `_redirects` (301) están inertes. Qué falta: confirmar DNS/proxy de `gamademexico.com`. Por qué importa: seguridad (sin CSP) y SEO (301 no aplicados → 404 de URLs antiguas). Evidencia del conflicto: `deploy.yml:39-52` vs `_headers:2`/`_redirects:2`. Nota: docs internos también se contradicen (`AUDITORIA-TECNICA-2026.md:4` dice "GitHub Pages"; `ESTUDIO-INTEGRAL-SITIO-2026.md:3` dice "Cloudflare Pages").
- **n8n: integración declarada pero ausente.** El blog está "preparado para n8n" (schema + helpers) pero no hay workflow/endpoint/credencial en el repo. Falta: confirmar si el n8n vive fuera del repo. Evidencia: `content.config.ts:38`, `blogHelpers.ts:264-352`.
- **Redes sociales vacías en Schema.org.** `SOCIAL_MEDIA` (facebook/instagram/linkedin/youtube) están en blanco → `sameAs` se emite vacío. Falta: URLs reales. Evidencia: `src/lib/config.ts:87-96`.
- **Brevo / SendGrid / fal.ai: no existen.** Sin email transaccional ni IA generativa integrada. Evidencia: grep negativo en `src`/`public`/`scripts`/config.
- **`SEGURIDAD` — sin secretos expuestos (✅).** Escaneo de `gho_/ghp_/sk-/api_key/SECRET/token/AKIA/xox` en `src`, `public`, `scripts`, config, raíz y `.env*` (excluyendo node_modules/dist/.git): **único match es el placeholder** `NEURONWRITER_API_KEY=tu-api-key` en `scripts/neuronwriter-seo.py:14` (no es secreto real). `.env.production` contiene **solo** `PUBLIC_EWWW_CDN_BASE=https://egsev2ykn2x.exactdn.com` (variable PÚBLICA, no secreta) y está **en `.gitignore`** + **NO trackeado por git** (`git ls-files` negativo; `git check-ignore` positivo). `.env`, `.env.local`, `.env.production` ignorados (`.gitignore:13-16`). No hay tokens de CI hardcodeados (deploy usa OIDC `id-token: write`, `deploy.yml:8-11`). **Veredicto: sin hallazgos críticos de seguridad.**
- **CDN ExactDN expuesto como variable PÚBLICA es esperado, no un hueco.** El subdominio `egsev2ykn2x.exactdn.com` aparece en env, workflow y script inline cliente; por diseño es público (se hornea en el HTML). No constituye fuga de secreto.
