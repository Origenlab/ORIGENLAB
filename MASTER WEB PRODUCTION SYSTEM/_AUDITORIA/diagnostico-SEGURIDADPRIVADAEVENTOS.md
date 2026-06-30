# Diagnóstico — SEGURIDADPRIVADAEVENTOS
> Propósito: Sitio Astro 100% estático de SEPRIEV, empresa de seguridad privada especializada en EVENTOS en México, orientado a captación de cotizaciones vía WhatsApp + SEO local/programático.

## Identidad (negocio/dominio; tipo de sitio; ARQUETIPO + justificación con evidencia; estado)

- **Negocio:** "SEPRIEV — Seguridad Privada para Eventos" (marca interna; nombre del repo `seguridad-eventos`). Evidencia: `src/lib/config.ts:4` (`SITE_NAME = "SEPRIEV"`), `src/layouts/BaseLayout.astro:127` (topbar "SEGURIDAD PRIVADA PARA EVENTOS").
- **Dominio:** ⚠️ **INCONSISTENCIA.** `astro.config.mjs:7` y `src/lib/config.ts:3` declaran `https://seguridadeventos.com.mx`, pero `CNAME` (raíz) dice `seguridadeventos.com` (sin `.mx`). El deploy GitHub Pages servirá en `seguridadeventos.com` mientras canonical/sitemap/schema apuntan a `.com.mx` → canonicals cruzados y sitemap inválido para el dominio real.
- **Tipo de sitio:** Sitio corporativo de servicios + blog editorial (58 artículos) + bolsa de trabajo. Multi-página estático (SSG).
- **ARQUETIPO: C = servicio profesional local** (con fuerte componente de contenido/SEO). Justificación con evidencia: el copy vende un SERVICIO operado (no renta de inventario): `src/lib/seo.ts:46` Schema `Service` + `Organization`/`LocalBusiness` (`seo.ts:7`) con `areaServed` por ciudades (CDMX, GDL, MTY, Puebla, Cancún — `config.ts:38-44`), `priceRange "$$"`, `hasCredential` DGSSP/STPS (`seo.ts:23-26`). El CTA central es "Solicitar Cotización" / WhatsApp (no carrito ni catálogo con precios). **No es arquetipo B (renta/eventos)**: aunque el nicho son eventos, no se renta equipo ni espacios — se presta un servicio de personal de seguridad facturado por operativo, con análisis de riesgo y coordinación con Protección Civil (`pages/index.astro:72-76`). El eje "local" (cobertura por ciudad + páginas `/zonas/*`) y el modelo de venta consultiva (cotización en 24 h) confirman **C**.
- **Estado:** En producción/activo. Último commit `ae8d0b4 feat: bolsa de trabajo con paginas L3 por vacante + 5 articulos de blog`. `dist/` presente (78 HTML). GitHub Actions de deploy configurado y activo. L1-L3 al estándar; L4 apenas iniciado (2 de 30 hechas según el código, 1 según el plan).

## Stack (Astro version, integrations, CSS, TypeScript, adapter/output, deploy, build pipeline)

- **Astro:** `^4.16.18` (`package.json:19`). Output **estático** por defecto (sin `output:` ni adapter en `astro.config.mjs`).
- **Integrations:** `@astrojs/mdx ^3.1.9`, `@astrojs/sitemap 3.2.1` (pin exacto — comentario de commit `8a32113` indica compat Astro 4), `@astrojs/tailwind ^5.1.4` (`astro.config.mjs:8`, `package.json:16-18`).
- **CSS:** Tailwind `^3.4.17` con `@astrojs/tailwind` (config en `tailwind.config.mjs`). Estilos globales inline en `BaseLayout.astro:95-109` (reset, scrollbar) y bloque `is:global` de tipografía de artículo en `ArticleLayout.astro:142-266`. Sin CSS en `public/`.
- **TypeScript:** `astro/tsconfigs/strict` + alias `@/*`, `@components/*`, `@layouts/*`, `@content/*` (`tsconfig.json`). Markdown con Shiki tema `dracula` (`astro.config.mjs:10-12`).
- **Adapter/output:** ninguno → SSG puro a `dist/` con URLs de directorio (`/ruta/index.html` → trailing slash). Evidencia: `dist/blog/bienvenida/index.html`, sitemap con `/aviso-de-privacidad/`.
- **Deploy:** **GitHub Pages** vía `.github/workflows/deploy.yml` (`actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`, Node 20, `npm ci` + `npm run build`). `public/.nojekyll` presente. ⚠️ NO es Cloudflare Pages, pese a que los comentarios de `scripts/install-hooks.sh` y `validate-mdx.mjs` mencionan "CF Pages" (deuda de documentación heredada de plantilla).
- **Build pipeline:** `npm run build` = `npm run validate:mdx && astro build` (`package.json:9`). Hook `pre-push` instalable (`scripts/install-hooks.sh`) corre validate:blog (si existe) → validate:mdx → `astro check` → `astro build` antes de cada push.

## Estructura de carpetas

```
SEGURIDADPRIVADAEVENTOS/
├─ astro.config.mjs, tailwind.config.mjs, tsconfig.json, package.json
├─ CNAME, .gitattributes, .gitignore, PLAN-SUBCATEGORIAS-L4.md
├─ .github/workflows/deploy.yml          # GitHub Pages
├─ scripts/
│   ├─ install-hooks.sh                  # instala pre-push hook
│   └─ validate-mdx.mjs                  # linter MDX (closing tags, imports, props)
├─ public/
│   ├─ .nojekyll, favicon.svg, robots.txt
│   └─ img/  (logo-sepriev.png, og-sepriev.jpg, eventos/*.avif+.jpg pares 640/1200)
├─ src/
│   ├─ layouts/        BaseLayout · ServiceLayout · ArticleLayout
│   ├─ components/      (21 .astro — Header/Footer embebidos en BaseLayout)
│   ├─ lib/             config.ts · seo.ts · blog.ts · vacantes.ts
│   ├─ content/
│   │   ├─ config.ts    (colecciones blog + servicios)
│   │   ├─ blog/        58 .md/.mdx
│   │   └─ servicios/   10 .mdx
│   ├─ pages/           (ver árbol en Content Collections)
│   └─ env.d.ts
├─ dist/                # build (78 HTML) — gitignored
└─ .astro/              # cache generada — gitignored
```
⚠️ No existe `src/data/` (los datos viven en `src/lib/`). No hay `src/styles/` (CSS embebido en layouts).

## Layouts — jerarquía (tabla: Layout|ruta|herencia|props|uso)

| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| BaseLayout | `src/layouts/BaseLayout.astro` | Raíz (`<html>`) | `title, description?, canonical?, ogImage?, schema?, noindex?` | Único layout raíz. Contiene `<head>` completo (SEO, OG, Twitter, geo, JSON-LD), TOPBAR, HEADER + nav desktop/drawer móvil, FOOTER, WhatsApp flotante y todo el JS de UI. Lo consumen TODAS las páginas e indirectamente los otros 2 layouts. |
| ServiceLayout | `src/layouts/ServiceLayout.astro` | extends BaseLayout (import `:2`) | `titulo, descripcion, metaTitle?, metaDescription?, slug, emoji?, imagen?, faq?, breadcrumbs?` | Plantilla de página de servicio "genérica": breadcrumb + hero con imagen + 2 párrafos SEO + `<slot/>` MDX (prose) + sidebar (CTA, otros servicios, certificaciones) + FAQ acordeón + `CTABanner`. Solo lo usa `pages/servicios/[...slug].astro` para servicios NO standalone (hoy ninguno: las 10 categorías son standalone). |
| ArticleLayout | `src/layouts/ArticleLayout.astro` | extends BaseLayout (import `:2`) | `title, description, metaTitle?, metaDescription?, categoria?, imagen?, readTime?, canonical?, slug?` | Plantilla de artículo de blog: breadcrumb + hero imagen + cabecera (categoría, readTime, autor "Equipo SEPRIEV") + `<slot/>` (`.article-body` con tipografía propia, `is:global`) + sidebar `BlogSidebar` + `CTABanner`. Inyecta `buildArticleSchema`. Lo usa `pages/blog/[...slug].astro`. |

## Componentes — inventario (tabla: Componente|ruta|props|uso)

| Componente | Ruta | Props | Uso |
|---|---|---|---|
| Header | — | — | ⚠️ HUECO de fichero: NO existe `Header.astro` como pieza usada; el header/nav vive embebido en `BaseLayout.astro:135-245`. (Sí existe `src/components/Header.astro` pero ver HUECOS — posiblemente huérfano/legacy.) |
| Footer | `src/components/Footer.astro` | (existe pero) | El footer real está embebido en `BaseLayout.astro:355-476`. `Footer.astro` no se importa en BaseLayout → probable huérfano. |
| HeroSection | `src/components/HeroSection.astro` | `titulo?, subtitulo?` | Hero de la home: imagen de fondo con overlay + 2 columnas (título/subtítulo + texto institucional). Usado en `index.astro:48`. |
| PageHero | `src/components/PageHero.astro` | `eyebrow, titulo, subtitulo` + slot `right` | Hero de páginas internas (cotizar, contacto, L4, bolsa). Patrón 2 columnas con slot derecho para párrafos SEO/CTAs. |
| ServiceCard | `src/components/ServiceCard.astro` | `title, description, features?, href?, badge?, featured?, image?` | Tarjeta de servicio (imagen `<picture>` avif/jpg + features + link). Usada en home grid e índices/relacionados. |
| BlogCard | `src/components/BlogCard.astro` | (no leído) | Tarjeta de artículo en grids de blog. |
| CTABanner | `src/components/CTABanner.astro` | `titulo?, subtitulo?, eyebrow?, parrafos?, faq?, ctaLabel?, ctaHref?, variant?` | CTA final reutilizable: FAQ acordeón (`<details>`) + formulario de cotización que arma mensaje y abre WhatsApp (`define:vars` con `WHATSAPP_NUMBER`). Cierre de casi todas las páginas. |
| Breadcrumb | `src/components/Breadcrumb.astro` | `items: {label, href?}[]` | Breadcrumb con microdata `schema.org/BreadcrumbList` (itemscope/itemprop). Usado en blog, cotizar, contacto, L4, bolsa. |
| PageNav | `src/components/PageNav.astro` | `items, ariaLabel` | Navegación de tarjetas (3-4 links a servicios/canales) bajo el hero de páginas internas. |
| SectionNav | `src/components/SectionNav.astro` | (no leído) | Navegación de secciones en la home (`index.astro:49`). |
| SectionHeader | `src/components/SectionHeader.astro` | `eyebrow, titulo, lead, parrafos` | Encabezado homologado de sección (título + lead + párrafos SEO). Lo usa CTABanner y secciones. |
| StatsSection | `src/components/StatsSection.astro` | (usa `STATS` de config) | Banda de estadísticas (500+ eventos, 1,200+ guardias, etc.). Usado en L4 y otras. |
| ProcessSection | `src/components/ProcessSection.astro` | `eyebrow, titulo, lead, parrafos, pasos[]` | Sección de proceso por pasos numerados. |
| TrustSection / TrustBadges | `src/components/TrustSection.astro`, `TrustBadges.astro` | (no leídos) | Bloques de confianza/certificaciones (home). |
| TestimonialsSection | `src/components/TestimonialsSection.astro` | (no leído) | Testimonios (home). |
| ClientsSection | `src/components/ClientsSection.astro` | (no leído) | Sección de clientes/casos. |
| ServiceModule | `src/components/ServiceModule.astro` | (no leído) | Módulo de servicio reutilizable (probable para detalle/L4). |
| BlogNav | `src/components/BlogNav.astro` | (no leído) | Navegación interna del blog. |
| BlogSidebar | `src/components/BlogSidebar.astro` | `currentSlug?` | Sidebar de artículo (categorías, posts relacionados). Usado en ArticleLayout. |
| Pagination | `src/components/Pagination.astro` | (no leído) | Paginación del listado de blog. |
| SEO | `src/components/SEO.astro` | `title, description, canonical?, ogImage?, type?, publishedTime?` | ⚠️ **Componente huérfano**: define `<head>` alterno (con `og:image` por defecto `/favicon.svg`), pero NO se importa en ningún layout/página (grep sin resultados de uso). El head real lo arma BaseLayout. Restos de plantilla. |

## Content Collections / esquemas / taxonomías (cómo se generan las páginas; estático vs dinámico/getStaticPaths; explica L1-L4)

**Colecciones** (`src/content/config.ts`):
- `blog` (`type: content`): `title, description, metaTitle?, metaDescription?, categoria(def "Blog"), imagen?, readTime(def 5), keywords?, draft(def false)`. **58 archivos** (.md/.mdx). Categorías derivadas del frontmatter (no enum).
- `servicios` (`type: content`): `title, description, metaTitle?, metaDescription?, emoji(def 🛡️), orden(def 99), keywords?`. **10 archivos** .mdx.

**Generación de páginas (estático con `getStaticPaths`):**
- Blog detalle: `pages/blog/[...slug].astro` → `getStaticPaths` desde `getCollection('blog')` filtrando `!draft`; render con `ArticleLayout`.
- Blog paginación: `pages/blog/page/[page].astro` (`POSTS_PER_PAGE=16`, `blog.ts`), página 1 en `/blog`; categorías en `pages/blog/categoria/[categoria].astro` (slug vía `catSlug()`).
- Servicios genéricos: `pages/servicios/[...slug].astro` → `getStaticPaths` desde colección `servicios` **excluyendo** un array `STANDALONE` con las 10 categorías (`[...slug].astro:8`). Como hoy las 10 son standalone, **este template no emite ninguna página** (los `.mdx` de `servicios/` quedan sin renderizar por esta vía; el FAQ y `serviceImg` por slug viven hardcodeados aquí como fallback).
- Bolsa de trabajo: `pages/bolsa-de-trabajo/[slug].astro` → `getStaticPaths` desde `VACANTES` (`src/lib/vacantes.ts`, 6 vacantes); inyecta `JobPosting` + `FAQPage` + `BreadcrumbList`.

**Taxonomía L1-L4** (`PLAN-SUBCATEGORIAS-L4.md`):
- **L1 — Home** `/` (`pages/index.astro`, archivo monolítico de ~1030 líneas con 10 módulos de servicio escritos a mano).
- **L2 — Servicios** `/servicios` (`pages/servicios/index.astro`).
- **L3 — Página de cada servicio** `/servicios/<servicio>` (10/10). Implementadas como **páginas standalone con diseño dedicado** (un `.astro` por servicio en `pages/servicios/*.astro`), NO desde la colección — usan `PageHero`+`StatsSection`+módulos+`ProcessSection`. La colección `servicios/*.mdx` + `ServiceLayout` es la ruta "genérica" alternativa (hoy sin uso por el filtro STANDALONE).
- **L4 — Subcategoría** `/servicios/<servicio>/<subcategoria>` (objetivo 30 = 10×3). **Hechas en código: 2** (`backstage-seguro.astro`, `control-de-multitudes.astro` bajo `seguridad-conciertos-festivales/`). El plan dice "1/30" pero el repo tiene 2 archivos L4. Cada L4 usa el helper central `buildServicePageSchema({ parent, ... })` (`seo.ts:100`) que genera grafo `WebPage`+`Service`+`BreadcrumbList`(4 niveles)+`FAQPage` con `isRelatedTo` al padre. Pendiente "cablear" sección de subcategorías en cada L3 padre (huérfanas hoy).
- **Zonas** `/zonas/<ciudad>` (cdmx, guadalajara, monterrey, puebla, cancun) — eje SEO local, fuera del árbol L1-L4 pero parte de la arquitectura.

## SEO real (metas, schema JSON-LD tipos+rutas, URLs/trailing slash, internal linking, sitemap/robots, hreflang, verificación Search Console)

- **Metas:** `<head>` centralizado en `BaseLayout.astro:60-119`. `<title>` se usa TAL CUAL (sin sufijo de marca; comentario `:26`), `meta description`, canonical (computado `Astro.url.pathname` o prop). Estrategia de **title con keywords concatenadas** (ej. `index.astro:45` "Seguridad privada para eventos | seguridad para eventos | seguridad para fiestas") — keyword stuffing en títulos, introducido en commit `5d501eb`.
- **Open Graph / Twitter:** completos (`og:type/url/title/description/image/site_name=SEPRIEV/locale=es_MX`, `twitter:summary_large_image`). OG image por defecto `/img/og-sepriev.jpg`. Geo metas `MX`/CDMX (`:71-74`).
- **JSON-LD (tipos + rutas):**
  - `Organization`+`LocalBusiness` y `WebSite` (con `SearchAction`) en TODAS las páginas vía `seo.ts:5,29` inyectados por BaseLayout.
  - `Service` + `FAQPage` en servicios genéricos (`ServiceLayout.astro:34-36` con `buildServiceSchema`/`buildFAQSchema`).
  - Grafo profesional `WebPage`+`Service`+`BreadcrumbList`(hasta 4 niveles)+`FAQPage`+`ImageObject` en L3/L4 vía `buildServicePageSchema` (`seo.ts:100`; rutas: `pages/servicios/seguridad-vip.astro`, `.../backstage-seguro.astro`, `.../control-de-multitudes.astro`).
  - `Article` en blog (`buildArticleSchema`, `ArticleLayout.astro:35`).
  - `JobPosting`+`FAQPage`+`BreadcrumbList` en bolsa (`pages/bolsa-de-trabajo/[slug].astro:42-79`).
  - Breadcrumb adicional como **microdata** (no JSON-LD) en `Breadcrumb.astro` (doble señal de breadcrumb).
- **URLs / trailing slash:** salida de directorio → URLs CON trailing slash (`/blog/bienvenida/`). Sin `trailingSlash` explícito en config (default Astro). Consistente en sitemap.
- **Internal linking:** fuerte. Header con dropdown de 10 servicios + bolsa; footer con servicios, zonas, empresa, vacantes; L4 enlaza a padre y hermanas; blog enlaza a `/cotizar`, servicios y artículos. ⚠️ L4 aún huérfanas desde sus L3 padres (pendiente "cablear", plan línea 103). ⚠️ Footer enlaza `/terminos` que NO existe (404).
- **Sitemap/robots:** `@astrojs/sitemap` genera `sitemap-index.xml` + `sitemap-0.xml` (`dist/`). `robots.txt` (`public/robots.txt`): `Allow: /` + `Sitemap: https://seguridadeventos.com.mx/sitemap-index.xml`. ⚠️ Sitemap y robots apuntan a `.com.mx` pero el dominio real (CNAME) es `.com` → desalineado.
- **hreflang:** ⚠️ HUECO — no hay `hreflang`/`alternate` (sitio monolingüe es-MX; `<html lang="es-MX">` `BaseLayout.astro:59`). Aceptable para sitio mono-idioma pero no declarado.
- **Verificación Search Console:** ⚠️ HUECO — sin meta `google-site-verification` ni equivalente en el código (grep sin resultados). Verificación probablemente vía DNS/GSC externo (no auditable en repo).

## Sistema de diseño (tokens/tipografía/paleta y DÓNDE están; UI base; hero/cards/CTA/WhatsApp/breadcrumbs)

- **DÓNDE:** tokens en `tailwind.config.mjs` (theme.extend). No hay `:root` custom properties en CSS global; los colores se referencian por clases Tailwind o hex literales en estilos inline.
- **Paleta** (`tailwind.config.mjs:6-14`): `primary #1a2540` (azul marino), `secondary #dc2626` (rojo — color de acción/marca), `accent #6b7280` (gris texto), `dark #0a0f1a` (fondo principal), `light #f9fafb`, `gold #f59e0b`, `primary-light #243154`. Tema **oscuro** dominante (body `bg-dark text-light`). Verde de WhatsApp por clases `green-*` de Tailwind (no tokenizado).
- **Tipografía:** `Inter` (Google Fonts, pesos 400-900) — `fontFamily.sans` en config + `<link>` en `BaseLayout.astro:114` y duplicado en `SEO.astro:51`. Tipografía de artículo definida aparte en `ArticleLayout.astro:142-266` (`is:global`, tamaños `clamp()`, h2/h3 con border y color rojo).
- **UI base:**
  - **Hero:** dos variantes — `HeroSection` (home, fondo imagen + overlay) y `PageHero` (internas, 2 cols con slot `right`). Patrón recurrente: eyebrow rojo uppercase + título `font-black` + barra `w-16 h-0.5 bg-secondary` + párrafos SEO.
  - **Cards:** `ServiceCard` (imagen `<picture>` avif/jpg responsive 640/1200 + badge + features + "Ver servicio"), `BlogCard`.
  - **CTA:** `CTABanner` (FAQ `<details>` + formulario→WhatsApp) y botones rojos `bg-secondary hover:bg-red-700` uppercase. CTA secundario "Cotizar" en header.
  - **WhatsApp:** botón flotante fijo `bottom-6 right-6` verde (`BaseLayout.astro:479`), en topbar, header (desktop), drawer, footer y formularios. Número desde `WHATSAPP_NUMBER` (config) — salvo 1 hardcode (ver ❌).
  - **Breadcrumbs:** componente `Breadcrumb.astro` con microdata + barra acento izquierda; en ServiceLayout hay un breadcrumb inline alterno (`<ol>` propio, no usa el componente).
- **Ancho/layout:** patrón fluido `w-full px-[5%] xl:px-[7%]` en todas las secciones (no container centrado; decisión de commit `b664e6e` "layout 100% width, medidas en %"). `overflow-x-hidden` global.

## Convenciones (naming, idioma, lang, estructura de código, prettier/eslint)

- **Naming:** componentes/layouts en PascalCase `.astro`; páginas en kebab-case; slugs URL en kebab-case y español (`seguridad-conciertos-festivales`). Libs en `src/lib/*.ts` con `UPPER_SNAKE` para constantes exportadas (`SITE`, `WHATSAPP_NUMBER`, `SERVICIOS_NAV`).
- **Idioma:** copy 100% español de México; `<html lang="es-MX">`; `og:locale es_MX`; comentarios de código en español.
- **Estructura de código:** datos centralizados en `src/lib/` (config, seo helpers, blog utils, vacantes como "fuente única de datos"). Schemas siempre vía helpers de `seo.ts` (un solo lugar). Páginas L3 con datos hardcodeados en el frontmatter del `.astro` (no desde colección).
- **Prettier/ESLint:** ⚠️ HUECO — no hay `.prettierrc`, `.eslintrc`, ni `prettier`/`eslint` en `devDependencies` (`package.json` no tiene `devDependencies`). Calidad se cuida solo vía `validate-mdx.mjs` + `astro check` en pre-push.
- **Git:** `.gitattributes` solo normaliza LF (`* text=auto`) — **no usa Git LFS** (los AVIF/JPG se versionan como binarios normales). Remoto `github.com/Frankoropeza/seguridadeventos`.

## Flujos / procesos (cotización, contacto, WhatsApp, formularios)

- **Cotización** (`pages/cotizar/index.astro`): formulario (nombre, empresa, teléfono, email, tipo de evento, aforo, ciudad, detalles) que **NO usa backend**: el `<script>` (`:213-236`) intercepta submit, arma un mensaje y abre `https://wa.me/...` (todo client-side, sin almacenamiento). ⚠️ Hardcodea `5215512345678` en `:234` en vez de usar `WHATSAPP_NUMBER`.
- **CTABanner** (formulario embebido en muchas páginas): mismo patrón → WhatsApp, pero correctamente parametrizado con `define:vars={{ WA: WHATSAPP_NUMBER }}` (`:237`).
- **Contacto** (`pages/contacto/index.astro`): sin formulario; tarjetas directas a WhatsApp / `tel:` / `mailto:` + grid de zonas. Horario "Lun-Sáb 8:00-20:00".
- **Bolsa de trabajo:** página de detalle por vacante con formulario de postulación (mismo mecanismo WhatsApp presumido) + `JobPosting` schema.
- **Conclusión:** todo el "backend" de conversión es **WhatsApp deep-link**. No hay envío de email server-side, ni API, ni base de datos, ni captcha.

## Integraciones (Cloudflare/n8n/fal.ai/Brevo/GHA — evidencia con ruta o ⚠️ HUECO)

- **GitHub Actions:** ✅ presente — `.github/workflows/deploy.yml` (build + deploy a GitHub Pages).
- **Cloudflare:** ⚠️ HUECO — no hay `wrangler.toml`, `.wrangler`, `_redirects`, `_headers`, ni adapter `@astrojs/cloudflare`. Los comentarios "CF Pages" en `scripts/` son texto muerto heredado de plantilla; el deploy real es GitHub Pages.
- **n8n:** ⚠️ HUECO — sin evidencia (grep sin resultados).
- **fal.ai:** ⚠️ HUECO — sin evidencia. Las imágenes AVIF parecen generadas/optimizadas offline (commit `f1fba41` "imagenes AVIF en todo el sitio") pero no hay integración en repo.
- **Brevo / Sendinblue / email transaccional:** ⚠️ HUECO — sin evidencia. La conversión es 100% WhatsApp.
- **Analytics (GA/GTM/Plausible):** ⚠️ HUECO — no hay script de analítica en `BaseLayout` ni en `<head>`.

## Clasificación

### ✅ (lo que está bien — línea + ruta cada uno)
- ✅ Arquitectura SEO programática sólida y centralizada: todos los schemas en un solo helper `src/lib/seo.ts` con grafo profesional (`WebPage`+`Service`+`BreadcrumbList` 4 niveles+`FAQPage`+`ImageObject`) reutilizable para L3/L4 — `src/lib/seo.ts:100`.
- ✅ Datos de negocio como fuente única de verdad: `src/lib/config.ts` (NAP, servicios, zonas) y `src/lib/vacantes.ts` (bolsa) — evita duplicación y facilita mantenimiento.
- ✅ Imágenes responsive correctas en todo el sitio: `<picture>` con AVIF+JPG y `srcset` 640/1200, `width/height` para CLS, `loading`/`fetchpriority` adecuados — ej. `src/components/ServiceCard.astro:24-36`, `ServiceLayout.astro:72-76`.
- ✅ Pipeline de calidad defensivo: `validate-mdx.mjs` (closing tags, imports, props requeridos) + `astro check` + `astro build` en pre-push hook — `scripts/install-hooks.sh`, `scripts/validate-mdx.mjs`.
- ✅ Accesibilidad cuidada: `aria-label`/`aria-expanded`/`aria-controls` en nav y drawer, `aria-labelledby` en secciones, breadcrumb con microdata, `aria-hidden` en SVG decorativos — `src/layouts/BaseLayout.astro:152,231-236`.
- ✅ Contenido editorial extenso y bien estructurado: 58 artículos de blog con tipografía profesional dedicada (`ArticleLayout.astro:142-266`) y casos de éxito reales.

### ❌ (fallas/problemas — línea + ruta)
- ❌ **Dominio inconsistente (crítico SEO/deploy):** `CNAME` = `seguridadeventos.com` vs `SITE`/canonical/sitemap = `https://seguridadeventos.com.mx` (`astro.config.mjs:7`, `src/lib/config.ts:3`, `public/robots.txt:4`). Canonicals, OG y sitemap apuntan a un dominio distinto al servido → riesgo de no indexación/canonical cruzado.
- ❌ **Número de WhatsApp hardcodeado** `5215512345678` en `src/pages/cotizar/index.astro:234` (ignora `WHATSAPP_NUMBER`); si cambia el número, este formulario seguirá enviando al viejo.
- ❌ **Enlace roto en footer:** `/terminos` (`src/layouts/BaseLayout.astro:472`) no tiene página → 404 en todo el sitio. (`/aviso-de-privacidad` sí existe.)
- ❌ **Datos de contacto son placeholders:** `PHONE_PRIMARY +525512345678`, `PHONE_DISPLAY 55 1234 5678`, `WHATSAPP_NUMBER 5215512345678` (`src/lib/config.ts:7-9`) — números de relleno; si están en producción, ninguna conversión llega.
- ❌ **Inconsistencia de "años de experiencia":** `STATS` dice `15+` años (`src/lib/config.ts:21`) pero el copy de home, heroes y ~6 artículos repite "más de 30 años" (`HeroSection.astro:67`, `ServiceLayout.astro:113`, `content/blog/*`). Mensaje contradictorio para el usuario y para E-E-A-T.
- ❌ **Keyword stuffing en `<title>`:** títulos con 3 keywords separadas por `|` sin marca (`index.astro:45`, `cotizar/index.astro:33`, `contacto/index.astro:33`) — riesgo de títulos spam y reescritura por Google.
- ❌ **Componentes huérfanos/legacy:** `SEO.astro` (no importado en ningún lado) y probablemente `Header.astro`/`Footer.astro` (el header/footer reales están embebidos en BaseLayout) — código muerto que confunde el mantenimiento.

### 🤖 (oportunidades de automatización/IA — línea + ruta)
- 🤖 **Generación de L4 (29 pendientes) con plantilla parametrizada:** ya existe el helper `buildServicePageSchema` y dos L4 de referencia (`backstage-seguro.astro`, `control-de-multitudes.astro`); un generador (estilo `scripts/`) que tome un objeto de datos por subcategoría y emita el `.astro` + cablee la sección "Subcategorías" en el L3 padre cerraría las 30 L4 y resolvería el huérfano del plan (`PLAN-SUBCATEGORIAS-L4.md:103`). Ideal para IA: redacción de copy + FAQ + alts por subcategoría.
- 🤖 **Backend de formularios + IA de pre-cualificación:** hoy todo es WhatsApp deep-link sin captura (`cotizar/index.astro:213`); una función serverless (o n8n/Brevo) que reciba el form, registre el lead y use IA para sugerir nº de elementos/plan según tipo+aforo automatizaría la "cotización en 24h" que el copy promete.
- 🤖 **Refactor de `index.astro` (~1030 líneas) con `ServiceModule`:** los 10 módulos de servicio están escritos a mano y repetidos; un componente `ServiceModule` (ya existe el archivo) alimentado por un array generaría la home y permitiría regenerar copy con IA de forma consistente.

### 📐 (deuda de diseño/arquitectura — línea + ruta)
- 📐 **Doble vía de servicios L3 desacoplada:** las 10 categorías existen como páginas standalone (`pages/servicios/*.astro`) Y como colección `servicios/*.mdx` + `ServiceLayout`, pero el filtro `STANDALONE` deja la colección sin renderizar (`pages/servicios/[...slug].astro:8`). Resultado: 10 `.mdx` "fantasma" + FAQ duplicado (hardcodeado en `[...slug].astro:24-85` y en cada página standalone). Un solo origen de datos eliminaría la divergencia.
- 📐 **Header/Footer monolíticos dentro de BaseLayout** (`BaseLayout.astro:135-476`, ~340 líneas con JS inline) en lugar de componentes `Header.astro`/`Footer.astro` reutilizables — dificulta pruebas y reuso, y deja los componentes homónimos huérfanos.
- 📐 **`index.astro` monolítico (~1030 líneas)** con copy y markup repetido por servicio — alta carga de mantenimiento, propenso a inconsistencias (como la de "30 años").
- 📐 **Sin tokens CSS (`:root`):** colores en `tailwind.config` pero también hex literales dispersos (`BaseLayout.astro:106-108`, `ArticleLayout.astro:144-260`) — duplicación de la paleta fuera del sistema de tokens.

## ⚠️ HUECOS (lista de qué falta y por qué)
- ⚠️ **HUECO: contacto real** — teléfono/WhatsApp/email son placeholders (`config.ts:7-12`); no se puede verificar el NAP real del negocio desde el repo.
- ⚠️ **HUECO: dominio canónico definitivo** — conflicto `.com` (CNAME) vs `.com.mx` (config) sin resolución; falta saber cuál es el dominio de producción real.
- ⚠️ **HUECO: verificación Search Console / analytics** — sin meta de verificación ni script de analítica en el repo (probablemente configurados fuera de código; no auditables aquí).
- ⚠️ **HUECO: integraciones externas (Cloudflare, n8n, fal.ai, Brevo)** — ninguna evidencia en el repo; el sitio es SSG puro + GitHub Pages + WhatsApp. Los comentarios "CF Pages" en `scripts/` son texto heredado, no integración real.
- ⚠️ **HUECO: prettier/eslint** — sin configuración de formato/lint ni `devDependencies`; convención de estilo no forzada por herramientas.
- ⚠️ **HUECO: estado real de L4** — `PLAN-SUBCATEGORIAS-L4.md` dice "1/30 hechas" pero el repo tiene 2 L4 (`backstage-seguro`, `control-de-multitudes`); el plan no está sincronizado con el código.
- ⚠️ **HUECO: props/uso de 9 componentes no muestreados** — `BlogCard, BlogNav, SectionNav, StatsSection (interno), ServiceModule, TrustSection, TrustBadges, TestimonialsSection, ClientsSection, Pagination` no se leyeron en detalle (inventario por nombre/import); sus props exactas no están verificadas 1:1.
- ⚠️ **HUECO: `Header.astro`/`Footer.astro` contenido** — confirmado que NO se importan en BaseLayout, pero no se leyó su interior para descartar uso en otra página; clasificados como probables huérfanos por ausencia de import.
- ⚠️ **HUECO: terminos y condiciones** — el footer enlaza `/terminos` pero la página no existe en `src/pages/`.
