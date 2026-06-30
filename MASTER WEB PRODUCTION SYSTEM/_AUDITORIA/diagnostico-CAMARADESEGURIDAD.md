# Diagnóstico — CAMARADESEGURIDAD
> Propósito: Sitio estático Astro de captación de leads (WhatsApp/cotización) para una empresa de venta, instalación y monitoreo de cámaras CCTV en México, con arquitectura SEO local L1→L2→L3.

## Identidad (negocio/dominio; tipo de sitio; ARQUETIPO + justificación con evidencia; estado)
- **Negocio:** "CAMSEG" / Cámara de Seguridad — venta, instalación y monitoreo de CCTV. Evidencia: `src/consts.ts:31` (`legalName: 'CAMSEG'`), `package.json:5` (description), `README.md:1`.
- **Dominio:** `https://camara-de-seguridad.com`. Evidencia: `astro.config.mjs:8`, `src/consts.ts:7`.
- **Tipo de sitio:** marketing/captación de leads estático (SSG), sin e-commerce ni backend; conversión vía WhatsApp y formularios mailto. Evidencia: `astro.config.mjs:14` (`build.format: 'directory'`), ausencia de adapter, `src/components/WhatsAppFloat.astro`.
- **ARQUETIPO: C = servicio profesional local.** Justificación con evidencia: el sitio vende un **servicio de instalación/monitoreo**, no un catálogo de productos comprables. JSON-LD principal es `['LocalBusiness','SecuritySystemInstallationService']` con `areaServed`, `openingHoursSpecification`, `geo` y `priceRange` (`src/components/SEO.astro:205-280`). La taxonomía es por **tipo de servicio/cliente** (hogar, comercio, industrial, control de acceso), no por SKU; la colección `productos` existe en el schema pero **no tiene contenido real ni rutas** (solo `_ejemplo-camara-ip-4k.md`, ignorado por el glob `[^_]`). Hay matices de arquetipo A (catálogo técnico) en el schema `productos` y en las cards de "modelos" L3, pero sin productos publicados ni páginas de producto domina claramente C.
- **Estado:** desarrollo avanzado / pre-producción. Build presente (`dist/`, 21 HTML, sitemap generado 2026-05-23), pero con datos placeholder de contacto sin reemplazar y pendientes de producción listados en `README.md:165-173`. Último commit: `1927527 feat(L2): overhaul profesional · headings dinamicos · HowTo schema · RelatedLinks · Content render · form WA por servicio · Reviews · 17K proyectos` (git log).

## Stack (Astro version, integrations, CSS, TypeScript, adapter/output, deploy, build pipeline)
- **Astro:** `^5.7.0` (`package.json:20`). Output estático por defecto (sin `output`/adapter declarado en `astro.config.mjs`).
- **Integrations:** `@astrojs/tailwind ^5.1.5` (con `applyBaseStyles:false`) y `@astrojs/sitemap ^3.4.0` con i18n `es-MX`. Evidencia: `astro.config.mjs:17-32`. También `@astrojs/rss ^4.0.11` y `@astrojs/check ^0.9.4` declarados (`package.json:16-18`), pero **RSS no se usa** (sin `rss.xml.js`, ⚠️ HUECO de uso).
- **CSS:** TailwindCSS `^3.4.17` utility-first + plugins `@tailwindcss/forms` y `@tailwindcss/typography` (`tailwind.config.mjs:114`, `package.json:25-26`). CSS global y `@layer components` en `src/styles/global.css`. Container Tailwind deshabilitado y redefinido a 100% ancho (`tailwind.config.mjs:11`, `global.css:62-69`).
- **TypeScript:** estricto — `extends astro/tsconfigs/strict` + `strictNullChecks` (`tsconfig.json:2,16`). Path aliases `@/`, `@components`, `@layouts`, `@styles`, `@content`, `@assets` (`tsconfig.json:7-14`).
- **Adapter/output:** ninguno → **estático puro (SSG)**. Todas las páginas dinámicas usan `getStaticPaths` (`src/pages/servicios/[slug].astro:10`, `[parent]/[sub].astro:10`).
- **Deploy:** **GitHub Pages** vía Actions. Evidencia: `.github/workflows/deploy.yml:1` ("Deploy Astro to GitHub Pages", `actions/deploy-pages@v4`, `upload-pages-artifact`). Remote `https://github.com/Origenlab/CAMARADESEGURIDAD.git` (`.git/config`). **CONTRADICCIÓN:** README y `public/_redirects` apuntan a Cloudflare Pages (ver ❌).
- **Build pipeline:** `npm ci` → `astro build` → artifact `./dist` → `deploy-pages` (`deploy.yml:35-57`). Dev server en puerto 4500 (`astro.config.mjs:11`). `compressHTML:true`, `prefetch.prefetchAll:true` (`astro.config.mjs:33-37`).

## Estructura de carpetas
```
CAMARADESEGURIDAD/
├── .github/workflows/deploy.yml      # CI → GitHub Pages
├── .wrangler/                        # VACÍO (residuo de intento Cloudflare)
├── _research/                        # Análisis de competidores (xlsx + docx) — NO debería deployarse
│   ├── Analisis_Competidores_Camaras_CDMX.xlsx
│   └── Reporte_Ejecutivo_Competidores_CDMX.docx
├── dist/                             # Build presente (21 HTML, sitemap, _redirects copiado)
├── public/
│   ├── _redirects                    # Formato Cloudflare Pages (18 reglas 301)
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── og-default.jpg / og-default.svg
│   └── robots.txt
├── src/
│   ├── assets/.gitkeep               # VACÍO — sin imágenes optimizadas reales
│   ├── components/                   # 22 componentes .astro
│   ├── consts.ts                     # SITE + NAV_LINKS + SERVICE_LINKS + SECTION_LINKS
│   ├── content/
│   │   ├── config.ts                 # 4 colecciones Zod (productos/blog/servicios/subServicios)
│   │   ├── blog/                      # 1 md (_ejemplo, ignorado)
│   │   ├── productos/                 # 1 md (_ejemplo, ignorado) → SIN páginas
│   │   ├── servicios/                 # 4 md reales (L2)
│   │   └── sub-servicios/             # 9 md reales (L3)
│   ├── data/seo.ts                   # SSOT de SEO + interlinking + quickLinks
│   ├── layouts/BaseLayout.astro      # único layout
│   ├── pages/                        # routing file-based + 2 rutas dinámicas
│   └── styles/global.css             # tokens CSS + @layer components
├── astro.config.mjs · tailwind.config.mjs · tsconfig.json · package.json
├── .env.example · .prettierrc.mjs · .gitignore · README.md
```
Árbol `src/pages/` (find): `404.astro`, `index.astro`, `contacto.astro`, `sobre-nosotros.astro`, `como-trabajamos.astro`, `cobertura-cdmx-edomex.astro`, `preguntas-frecuentes.astro`, `servicios/index.astro`, `servicios/[slug].astro`, `servicios/[parent]/[sub].astro`.

## Layouts — jerarquía (tabla: Layout|ruta|herencia|props|uso)
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| BaseLayout | `src/layouts/BaseLayout.astro` | Raíz (`<html>` + `<head>` + Header/Footer/WhatsAppFloat); delega meta a `SEO.astro` | `title, description, image, canonical, noindex, type, publishedTime, modifiedTime, keywords, showWhatsApp` + schemas opcionales: `faq, services, reviews, breadcrumb, howTo, contactPoints, places, products, articleAuthor/Section/Tags` (`BaseLayout.astro:65-88`) | **Único layout**; lo usan TODAS las páginas (`index.astro`, las 6 páginas estáticas, `[slug].astro`, `[parent]/[sub].astro`). `lang={SITE.lang}` (es), skip-link accesible, `<slot name="head">` |

⚠️ HUECO: no existe un layout específico para blog/artículos (`type:'article'` se soporta en props pero no hay páginas `blog/[slug].astro` que lo usen).

## Componentes — inventario (tabla: Componente|ruta|props|uso)
| Componente | Ruta | Props (resumen) | Uso |
|---|---|---|---|
| SEO | `src/components/SEO.astro` | title, description, image, canonical, noindex, type, keywords + 8 tipos de schema opcionales | Inyectado por BaseLayout; meta + OG + Twitter + JSON-LD |
| Header | `src/components/Header.astro` | (sin props observados; consume `NAV_LINKS`/`SERVICE_LINKS`) | Nav global (BaseLayout) |
| Footer | `src/components/Footer.astro` | — | Footer global (BaseLayout) |
| TopBar | `src/components/TopBar.astro` | — | Barra superior contacto (⚠️ HUECO: no se ve importado en BaseLayout — verificar si lo usa Header) |
| WhatsAppFloat | `src/components/WhatsAppFloat.astro` | `message?` | Botón flotante WA (BaseLayout, condicional `showWhatsApp`) |
| Hero | `src/components/Hero.astro` | ~17 props (eyebrow, preTitle, title1/2, subtitle, col2*, quickLinks, showRecBadge, showQuickLinks) | Home + todas las L2 + todas las L3 (componente unificado) |
| PageHero | `src/components/PageHero.astro` | — | Hero alterno para páginas estáticas (⚠️ verificar uso vs Hero) |
| SectionHeader | `src/components/SectionHeader.astro` | eyebrow, title, highlight, level, variant, lead, titleBreakBefore | Encabezados de sección canónicos (L2, otras) |
| ServiciosSection | `src/components/ServiciosSection.astro` | — | Home (grid de servicios) |
| ServicioDestacadoModule | `src/components/ServicioDestacadoModule.astro` | — | Home (módulo destacado) |
| ServiciosListadoSection | `src/components/ServiciosListadoSection.astro` | — | `/servicios/` index |
| ServiciosListadoCardsSection | `src/components/ServiciosListadoCardsSection.astro` | — | `/servicios/` index (variante cards) |
| EquiposSection | `src/components/EquiposSection.astro` | — | Home (`#equipos`) |
| BeneficiosSection | `src/components/BeneficiosSection.astro` | — | Home |
| PilaresSection | `src/components/PilaresSection.astro` | — | Home/servicios (pilares) |
| PorQueNosotrosSection | `src/components/PorQueNosotrosSection.astro` | — | Home (`#porque-nosotros`) |
| ProcesoSection | `src/components/ProcesoSection.astro` | — | Home / como-trabajamos |
| CoberturaSection | `src/components/CoberturaSection.astro` | — | Home / cobertura |
| TestimoniosSection | `src/components/TestimoniosSection.astro` | — | Home (reviews) |
| FaqSection | `src/components/FaqSection.astro` | — | Home / FAQ |
| CTASection | `src/components/CTASection.astro` | — | Cierre de páginas (L3, etc.) |
| RelatedLinks | `src/components/RelatedLinks.astro` | currentPath, variant, eyebrow, heading, lead | Interlinking interno; consume `src/data/seo.ts` |
Total: **22 componentes** (`find src/components`). Nota: props de muchos componentes "section" no se inspeccionaron por archivo individual (⚠️ HUECO menor: la mayoría parecen autocontenidos sin props, consumiendo `consts.ts`/`seo.ts`).

## Content Collections / esquemas / taxonomías (cómo se generan las páginas; estático vs dinámico/getStaticPaths)
- **4 colecciones** (`src/content/config.ts:392-397`), todas con loader `glob` y patrón `**/[^_]*.md` (los archivos `_*.md` se ignoran como ejemplos):
  - `productos` — schema rico (sku, precio, marca, categoria enum, especificaciones, galeria). **Sin contenido real** (solo `_ejemplo-camara-ip-4k.md`). **No hay página que la consuma** → 0 rutas generadas. ⚠️ HUECO/arquitectura: colección definida pero inerte.
  - `blog` — schema completo (pubDate, categoria enum, draft). **Sin contenido real** (`_ejemplo-como-elegir-camara.md`). **Sin páginas** `blog/index` ni `blog/[slug]` (confirmado en `dist/`). ⚠️ HUECO.
  - `servicios` (L2) — **4 md reales**: `camaras-para-hogar`, `camaras-para-comercio`, `control-de-acceso`, `sistemas-cctv-industriales`. Schema MUY extenso (~290 líneas): hero, seccionIntro, miniStats, segmentacion, problemas, proceso, casosDeUso, marcas, headings dinámicos, testimonio, ctaProblemas, formConfig, paquetes, faq, subServicios. Genera `/servicios/[slug]/` vía `getStaticPaths` (`[slug].astro:10-16`).
  - `subServicios` (L3) — **9 md reales** (alarmas, bodegas, camaras-ip, camaras-termicas, monitoreo, multi-sucursal, oficinas, tiendas, videoporteros). Relación con parent vía `parentSlug`/`parentTitle`/`parentEyebrow` (`config.ts:315-318`). Genera `/servicios/[parent]/[sub]/` vía `getStaticPaths` (`[parent]/[sub].astro:10-23`), con `siblings` y slug override opcional.
- **Generación de páginas:** **100% estática (SSG)**. Las páginas L2 y L3 se generan en build con `getCollection` + `getStaticPaths`; el resto son `.astro` por archivo. Markdown body se renderiza con `render()` + `<Content/>` (`[slug].astro:20`, `[parent]/[sub].astro:27,169`).
- **Taxonomía real:** jerarquía L1 (home) → L2 (4 servicios) → L3 (9 sub-servicios), reforzada por `breadcrumb` de 3-4 niveles y por el catálogo de interlinking en `src/data/seo.ts`. Resultado en `dist/`: **20 URLs en sitemap**, 21 HTML (incluye 404).

## SEO real (metas, schema JSON-LD tipos+rutas, URLs/trailing slash, internal linking, sitemap/robots, hreflang, verificación Search Console)
- **Metas:** título inteligente con dedupe de brand y tope 60 chars (`SEO.astro:138-142`); description, keywords condicional, author/publisher, canonical absoluto, robots `index,follow,max-image-preview:large` (o noindex), googlebot/bingbot, geo.* (CDMX), `content-language es-MX`, theme-color, OG completo (image 1200×630, secure_url, alt), Twitter `summary_large_image`. Evidencia: `SEO.astro:547-610`.
- **JSON-LD — tipos y rutas:** SIEMPRE inyectados en todas las páginas (`SEO.astro:643-647`): **Organization** (`#organization`), **LocalBusiness+SecuritySystemInstallationService** (`#business`, con aggregateRating 4.9/187, openingHours, areaServed, hasOfferCatalog, 5 Review embebidas), **WebSite** (`#website`), **WebPage** (`#webpage`). Dinámicos por props: **BreadcrumbList, FAQPage, Service[], Review[], HowTo, ContactPoint[], ItemList(Place), Product[], Article** (`SEO.astro:360-541`). Verificado en build: `dist/index.html` contiene 21 `@type` distintos (incl. FAQPage, OfferCatalog, OpeningHoursSpecification, Review, Service). HowTo se genera desde el `proceso` de cada L2 (`[slug].astro:155-166`).
- **URLs / trailing slash:** `trailingSlash:'ignore'` + `build.format:'directory'` (`astro.config.mjs:9,14`) → emite `/ruta/index.html`. Canonicals y enlaces internos usan slash final consistente (`/servicios/.../`). Coherente.
- **Internal linking:** sofisticado y centralizado en `src/data/seo.ts` — `LINK_CATALOG` (11 destinos con anchor text SEO), `PAGE_SEO` (`relatedLinks` por página), `QUICK_LINKS_BY_PATH` (sets curados por ruta en el hero, con fallback L3→parent), helpers `getRelatedLinks`/`getQuickLinks`/`getPageContext`. Componente `RelatedLinks` + quickLinks del Hero + breadcrumbs + siblings L3 = malla interna densa.
- **Sitemap:** `@astrojs/sitemap` con i18n es-MX, changefreq weekly, priority 0.7 (`astro.config.mjs:21-31`). `dist/sitemap-index.xml` + `dist/sitemap-0.xml` con **20 `<loc>`**. Declarado en `<head>` (`SEO.astro:620`) y en robots.
- **robots.txt** (`public/robots.txt`): `Allow: /` global; `Disallow: /_research/`, `/*.json$`, `/api/`; allow explícito a GPTBot/ClaudeBot/Googlebot/Bingbot; Sitemap declarado. Correcto (bloquea la carpeta de investigación).
- **hreflang:** `es-mx`, `es`, `x-default` — todos apuntan al MISMO canonical (`SEO.astro:568-570`). Correcto para sitio monolingüe (no hay versiones por idioma).
- **Verificación Search Console:** ⚠️ HUECO — no hay meta `google-site-verification` ni archivo de verificación; README lo lista como pendiente (`README.md:172`).

## Sistema de diseño (tokens/tipografía/paleta y DÓNDE están; UI base; hero/cards/CTA/WhatsApp/breadcrumbs)
- **Tokens — DÓNDE:** doble fuente. (1) `tailwind.config.mjs:13-67` define la paleta completa como escalas Tailwind. (2) `src/styles/global.css:6-12` re-declara los 4 colores base como CSS custom properties RGB (`--color-brand: 10 37 64`, `--color-accent: 220 38 38`, `--color-cream`, `--color-ink`) para usarse inline (ej. `style="background-color: rgb(var(--color-accent))"`).
- **Paleta:** primario **brand = navy `#0A2540`** (autoridad/seguridad), acento **accent = rojo alerta `#DC2626`** (CTAs/REC), base **cream = slate claro `#f1f5f9`**, tinta **ink `#1E293B`**. Cada uno con escala 50-950.
- **Tipografía:** display = **Montserrat** (weights 600-900, headings `font-black`), body = **Open Sans** (400-700). Definidas en `tailwind.config.mjs:69-72` y cargadas desde Google Fonts en `SEO.astro:625-638` (preconnect + preload + stylesheet). H1-H6 forzados a `font-display font-black text-brand-500` en `global.css:25-32`.
- **Sombras/animaciones:** shadows custom (`soft`, `ring`, `card`, `cta`) y animaciones de marca (`fade-in`, `fade-up`, `pulse-soft`, **`rec-blink`** — guiño al indicador REC de cámaras) en `tailwind.config.mjs:76-111`.
- **UI base (clases en `@layer components` de `global.css`):** `.container` (100% ancho, padding 2%), botones `.btn`/`.btn-primary`(rojo)/`.btn-brand`(navy)/`.btn-outline`/`.btn-outline-light`/`.btn-ghost`, secciones `.section`/`.section-cream`/`.section-white`/`.section-brand`, `.eyebrow` (punto rojo + uppercase tracking). También `.card`, `.heading-md/lg`, `.heading-light`, `.eyebrow-light`, `.marker-line`, `.lead`, `.faq-item` (usados en plantillas; definidos más abajo en global.css).
- **Hero:** componente unificado `Hero.astro` (~17 props) reusado en L1/L2/L3 — bicolumna, REC badge flotante opcional, quick-links strip sobre navy.
- **Cards:** patrón `.card` con header de color (`bg-brand-500`/`bg-accent-500`), hover `-translate-y` + `shadow-card`; cards de segmentación, problemas, sub-servicios, modelos, paquetes (popular destacado), marcas (primera = "Recomendada").
- **CTA:** `CTASection.astro` (cierre), CTAs WhatsApp con `wa.me` + mensaje `encodeURIComponent` contextual por servicio/modelo/paquete.
- **WhatsApp:** `WhatsAppFloat.astro` — FAB verde `#25D366` bottom-right, animación pulse, `aria-label`, abre `wa.me/{whatsapp}?text=...`.
- **Breadcrumbs:** no hay componente visual dedicado; los breadcrumbs se pasan como datos a SEO para **BreadcrumbList JSON-LD** (3 niveles en L2, 4 en L3). ⚠️ HUECO: breadcrumb visible al usuario no confirmado (solo schema).

## Convenciones (naming, idioma, lang, estructura de código, prettier/eslint)
- **Naming:** componentes en PascalCase (`Hero.astro`, `SectionHeader.astro`); páginas/rutas en kebab-case español (`camaras-para-hogar`, `como-trabajamos`); rutas dinámicas `[slug]`/`[parent]`/`[sub]`. Content files kebab-case.
- **Idioma del contenido:** español de México (copy, frontmatter, comentarios de código todo en es-MX).
- **lang:** `<html lang={SITE.lang}>` = `es` (`BaseLayout.astro:116`, `consts.ts:14`); `locale: 'es-MX'` para OG/JSON-LD.
- **Estructura de código:** fuerte separación de datos y vista — `consts.ts` (config negocio), `src/data/seo.ts` (SSOT SEO/interlinking), content collections (datos de servicios), componentes presentacionales. Plantillas L2/L3 con defaults "anti-hardcode" (headings/testimonio/form configurables por md). Path aliases consistentes.
- **Prettier:** `.prettierrc.mjs` — printWidth 100, singleQuote, semi, trailingComma all, tabWidth 2, plugins `prettier-plugin-astro` + `prettier-plugin-tailwindcss`.
- **ESLint:** ⚠️ HUECO — no hay config de ESLint; type-check vía `astro check` (`package.json:13`).

## Flujos / procesos (cotización, contacto, WhatsApp, formularios)
- **WhatsApp (canal primario):** omnipresente. FAB global + CTAs por servicio/sub-servicio/modelo/paquete, todos construyen `https://wa.me/${SITE.contact.whatsapp}?text=<mensaje contextual>` (ej. `[slug].astro:431,657,685,711`; `[parent]/[sub].astro:283,420,454`). Mensaje precargado dinámico según el contexto (servicio, modelo, paquete, diagnóstico).
- **Formulario de WhatsApp por servicio:** cada L2 define `formConfig` (label, opciones, placeholder) con defaults por slug (`[slug].astro:38-60`) — el formulario arma un mensaje y abre WhatsApp (no hay POST a backend).
- **Contacto:** página `/contacto/` con `contactPoints` → ContactPoint JSON-LD. ⚠️ HUECO: no se inspeccionó el cuerpo de `contacto.astro`; no hay evidencia de endpoint de formulario (sin adapter/SSR → cualquier form sería mailto o WhatsApp, o requeriría servicio externo).
- **Cotización:** no hay carrito ni checkout; "cotización" = lead vía WhatsApp/visita técnica. Coherente con arquetipo C.
- **Monitoreo (servicio comercial):** mencionado como servicio (desde $700/mes), no como feature del sitio.

## Integraciones (Cloudflare/n8n/fal.ai/Brevo/GHA — evidencia con ruta o ⚠️ HUECO)
- **GitHub Actions:** ✅ presente — `.github/workflows/deploy.yml` (build + deploy a GitHub Pages). Es la integración de deploy ACTIVA.
- **Cloudflare:** evidencia AMBIGUA/residual. `public/_redirects` usa el **formato de Cloudflare Pages** (`_redirects:2` lo dice explícitamente) y existe carpeta `.wrangler/` — pero está **VACÍA**, no hay `wrangler.toml`, y el deploy real es GitHub Pages. Conclusión: Cloudflare Pages fue el target original o alterno y quedó código muerto. ⚠️ Ver ❌.
- **n8n:** ⚠️ HUECO — sin evidencia (0 referencias en `src/`).
- **fal.ai:** ⚠️ HUECO — sin evidencia (0 referencias).
- **Brevo / Sendinblue:** ⚠️ HUECO — sin evidencia (0 referencias; el envío de leads es 100% vía WhatsApp). `.env.example` solo prevé GA/GTM opcionales, ningún email API.
- **Analytics (GA/GTM):** previsto pero NO conectado — variables comentadas en `.env.example:14-15`; sin script GA en SEO/BaseLayout. ⚠️ HUECO.

## Clasificación
### ✅ (lo que está bien — línea + ruta cada uno)
- SEO técnico de nivel alto: JSON-LD multi-entidad con @id linking (Organization/LocalBusiness/WebSite/WebPage) + 9 schemas dinámicos, verificado en el HTML compilado. `src/components/SEO.astro:643-647`, `dist/index.html`.
- Arquitectura de datos limpia y escalable: SSOT de SEO/interlinking desacoplado de la vista, con helpers reutilizables. `src/data/seo.ts`.
- Sistema L1→L2→L3 totalmente estático y data-driven con plantillas "anti-hardcode" (headings/testimonio/form configurables por Markdown). `src/pages/servicios/[slug].astro`, `src/pages/servicios/[parent]/[sub].astro`, `src/content/config.ts`.
- Higiene de seguridad: sin tokens, llaves ni secretos en el repo ni en `.git` (scan grep negativo); `.env.example` solo placeholders. `.env.example`, scan repo.
- Accesibilidad base: skip-link, `aria-label`/`aria-hidden`, `lang`, viewport `viewport-fit=cover`, focus-visible rings. `src/layouts/BaseLayout.astro:145-149`, `global.css:73`.
- Performance: `compressHTML`, `prefetch` global, preconnect/preload de fuentes y OG, lazy images. `astro.config.mjs:33-37`, `SEO.astro:625-638`.
- Sistema de diseño coherente y temático (paleta navy/rojo "seguridad", animación `rec-blink`), tokenizado en Tailwind + CSS vars. `tailwind.config.mjs:13-111`, `src/styles/global.css:6-12`.

### ❌ (fallas/problemas — línea + ruta)
- **CONTRADICCIÓN DE DEPLOY:** el CI deploya a **GitHub Pages** (`.github/workflows/deploy.yml:1`) pero README "Deploy" recomienda Cloudflare Pages (`README.md:147-149`) y existe `public/_redirects` en **formato Cloudflare** (`public/_redirects:2`). GitHub Pages **ignora `_redirects`** → las 18 reglas 301 declaradas **no funcionan** en el deploy actual.
- **CNAME ausente:** no hay `CNAME` en repo ni en `dist/` (verificado). Un deploy de GitHub Pages a dominio custom `camara-de-seguridad.com` **no enlazará el dominio** sin `CNAME` (o config en el repo de Pages). `dist/` sin CNAME.
- **Datos de contacto placeholder en producción:** WhatsApp `525555555555` y teléfono `+52 55 5555 5555` (ficticios), redes sociales = dominios base sin perfil. Estos placeholders se compilan en TODOS los enlaces WA y en el JSON-LD. `src/consts.ts:18-29`. (README lo marca pendiente, pero `dist/` ya está construido con ellos.)
- **Reseñas y rating fabricados/hardcodeados:** `aggregateRating` 4.9/187 (y 4.9/230 en Service/Product) + 5 `Review` con nombres y fechas inventadas embebidas en LocalBusiness. Riesgo de penalización por *review snippet spam* de Google si no son reseñas reales verificables. `src/components/SEO.astro:274-317,402-408,512-518`.
- **Incoherencia de marca/datos entre README y código:** README describe color de marca naranja `#FF5722` y `src/consts.ts` con datos antiguos (`README.md:134`), pero el código real usa navy `#0A2540`; README documenta estructura (`SEO.astro` carga Montserrat — correcto) pero omite `src/data/seo.ts`, L3, rutas dinámicas y el deploy real. README **desactualizado** respecto al código.
- **`_research/` versionado en el repo:** archivos `.xlsx`/`.docx` de análisis de competidores en el repositorio (`_research/`). Aunque robots lo bloquea y no se copia a `dist/`, es material interno que no debería vivir en un repo de sitio público.
- **Colecciones muertas:** `productos` y `blog` tienen schema completo pero 0 contenido real y 0 páginas que las consuman → peso de mantenimiento sin valor entregado. `src/content/config.ts:9-79`, `dist/` (sin rutas blog/productos).

### 🤖 (oportunidades de automatización/IA — línea + ruta)
- Generación asistida de nuevos servicios L2/L3: el schema es tan estructurado (`src/content/config.ts`) que un agente podría producir nuevos `.md` (frontmatter completo + body) a partir de un brief, escalando el sitio sin tocar plantillas.
- Captura de leads automatizada: hoy todo es WhatsApp manual; oportunidad de un endpoint (Cloudflare Worker/n8n/Brevo) que reciba el formulario de `/contacto/`, registre el lead y dispare email/CRM — la `.env.example` ya prevé el patrón de variables. `src/pages/contacto.astro`, `.env.example`.
- Reseñas dinámicas verificables: reemplazar los `Review` hardcodeados por un feed real (Google Business Profile API) inyectado en build, eliminando el riesgo de spam y manteniendo el rich snippet legítimo. `src/components/SEO.astro:281-317`.

### 📐 (deuda de diseño/arquitectura — línea + ruta)
- **Doble fuente de verdad de color:** paleta en `tailwind.config.mjs` Y en CSS vars `global.css:6-12` — deben mantenerse sincronizadas a mano (riesgo de drift).
- **SVG icon maps duplicados:** el objeto `svgIcons` (paths) está copiado en `[slug].astro:174-191` y `[parent]/[sub].astro:89-106` (y probablemente en otros). Debería extraerse a un módulo/componente `Icon` único.
- **Defaults largos embebidos en plantillas:** bloques extensos de copy por defecto (headings, leads, testimonio) viven dentro de `[slug].astro:63-129` en lugar de en la capa de datos — mezcla contenido con lógica de vista.
- **README desincronizado** con la arquitectura real (ver ❌) — deuda de documentación que confunde a quien retome el proyecto. `README.md`.
- **`@astrojs/rss` instalado sin usar** y colecciones blog/productos definidas sin rutas: superficie de dependencias/schema mayor que la funcionalidad real. `package.json:17`, `src/content/config.ts`.

## ⚠️ HUECOS (lista de qué falta y por qué)
- **Verificación Search Console:** sin meta `google-site-verification` ni archivo; el sitio aún no está verificado/conectado (pendiente declarado en `README.md:172`).
- **Analytics:** GA/GTM previstos pero no integrados (variables comentadas en `.env.example`); no se mide tráfico.
- **Endpoint de formularios:** sin adapter/SSR ni servicio externo; no hay backend para `/contacto/` más allá de WhatsApp — el cuerpo de `contacto.astro` no se inspeccionó a fondo para confirmar si usa mailto o un tercero.
- **Páginas legales:** `/aviso-de-privacidad` y `/terminos` no existen (pendiente `README.md:170`), relevante por LFPDPPP que el propio copy menciona.
- **OG image real:** README marca `og-default.jpg` como placeholder a reemplazar (`README.md:167`); existe el archivo pero su validez como imagen final 1200×630 no se verificó.
- **Breadcrumb visual:** confirmado solo como JSON-LD; no se verificó un componente de breadcrumb visible para el usuario.
- **Inventario fino de props de los componentes "section":** ~14 componentes de sección no se abrieron individualmente; se asumen autocontenidos (consumen `consts.ts`/`seo.ts`) por su uso, pero sus props exactas no se auditaron.
- **`.wrangler/` y `_redirects`:** evidencian un target Cloudflare que no está activo; falta decisión: o se migra el deploy a Cloudflare Pages (y `_redirects` funciona) o se eliminan estos residuos y se reimplementan los 301 en GitHub Pages (que no soporta `_redirects` nativo).
- **PageHero vs Hero / TopBar:** existen `PageHero.astro` y `TopBar.astro` cuyo uso real no se confirmó (Hero unificado parece cubrir L1/L2/L3); posible código no utilizado.
