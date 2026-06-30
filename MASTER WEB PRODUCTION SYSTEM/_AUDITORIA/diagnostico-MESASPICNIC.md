# Diagnóstico — MESASPICNIC
> Propósito: Sitio estático Astro (~128 rutas en src/pages) de renta de mesas picnic y mobiliario de madera para eventos (bodas/corporativos/infantiles/picnic romántico) en CDMX y Edomex, con embudo de conversión sobre el bot DMChamp, directorio de espacios al aire libre y un obsidian-vault propio de 44 archivos.

## Identidad
- **Negocio/dominio:** MESPIC — "Renta de Mesas Picnic" · `https://mesaspicnic.com` (`astro.config.mjs`, `CNAME`). `siteName = "MESPIC — Renta de Mesas Picnic"` hardcoded en `src/layouts/BaseLayout.astro:33-34`. Tel/WhatsApp `5547868402` (display `55 4786 8402`), schedule "Lun–Dom 8:00–20:00" (`src/data/topbar.md`). Geo CDMX (19.4326/-99.1332).
- **Tipo de sitio:** Catálogo de renta + servicios por tipo de evento + directorio de espacios + blog. Multipágina estática. **Conversión 100% por chat/WhatsApp vía DMChamp** (sin formulario con backend) — `BaseLayout.astro:200` + interceptor que captura todo click `a[href*="wa.me"]` y lo abre en el bot (líneas 203-237).
- **ARQUETIPO: B — renta/eventos** (núcleo) **+ D — directorio** (módulo). Justificación: `LocalBusiness`+`EventVenue` con dirección física/geo/areaServed/openingHours (`BaseLayout.astro:38-82`); embudo Servicios→Catálogo→Paquetes→Cotizar (`CtaFlujo`, `ExploreMore` "Paso 1/2/3"); producto = servicio de renta con entrega/montaje, no e-commerce (sin checkout, "cotiza por WhatsApp"); 23 fichas de mobiliario, 14 servicios por evento, 4 paquetes. El módulo `/directorio/` (32 venues desde `espacios.json` → `directorio/[slug].astro` con EventVenue schema) es un directorio D de imán SEO local (parques/jardines reales por alcaldía). No es A (no es catálogo técnico de compra) ni C puro.
- **Estado:** En producción y activo. Build `dist/` reciente. Auditorías propias y vault extenso. ⚠️ **Build versionado en el repo:** además de `dist/`, la raíz tiene **~179 artefactos de build trackeados** (`404.html`, `index.html`, `blog/*/index.html`, `catalogo/`, `_astro/`, `chunks/`, `img/`, etc.) pese a que `.gitignore` ignora `dist` — basura versionada redundante; el código fuente real es solo `src/`.

## Stack
- **Astro `^4.16.18`** (⚠️ **v4, no v5/v6** — la versión más antigua del cluster). `package.json:14`.
- Output `static`, `trailingSlash: 'ignore'`, `compressHTML: true`, `build.inlineStylesheets: 'auto'` (`astro.config.mjs`).
- **Integrations:** `@astrojs/mdx` (instalado pero el blog NO lo usa — son .astro), **`exactdnRewriter`** (integración propia `src/integrations/exactdn.ts`, hook `astro:build:done`, reescribe `/img/...` → CDN `https://ew3fy9iennp.exactdn.com`), `@astrojs/sitemap` (filter aviso-privacidad/gracias/404; `serialize` normaliza trailing slash y asigna prioridades L1–L4 + blog). `@astrojs/check` declarado.
- **CSS:** **NO Tailwind.** CSS propio: `src/styles/global.css` (159 l., `:root` tokens), `mobile.css` (183 l., overrides responsive), `blog-article.css` (698 l., prosa). Total ~1,040 l.
- **TypeScript** strict (`tsconfig.json`, alias `@/*`). ⚠️ Las páginas usan rutas relativas, no el alias.
- **Adapter:** ninguno (SSG puro).
- **Deploy:** **GitHub Pages** vía `.github/workflows/deploy.yml` (Node 20, `npm ci` + build + `upload-pages-artifact` + `deploy-pages`, branch `main`).

## Estructura de carpetas
```
MESASPICNIC/
├── astro.config.mjs · package.json · tsconfig.json · CNAME · _noop-middleware.mjs
├── DMChamp — Guía Maestra OrigenLab.md · FAQ_MESPIC_100_preguntas.md · PLAN-Directorio-Espacios-Aire-Libre.md · SEO-KEYWORDS.md · MESPIC_Analisis_Competidores.{docx,xlsx} · prompts-fotografia-servicios.md
├── .github/workflows/deploy.yml        ← CI GitHub Pages
├── src/
│   ├── layouts/   BaseLayout.astro (239 l.) · BlogLayout.astro (639 l.)
│   ├── components/ 24 .astro
│   ├── pages/     ~128 rutas: index, contacto, cotizar, nosotros, aviso-de-privacidad, 404; servicios/ (L2+L3+L4) · catalogo/ (~23 productos) · paquetes/ (4) · directorio/{index,[slug]} · blog/ (~75 .astro)
│   ├── data/      espacios.json (133 KB, directorio venues) · header.md · topbar.md
│   ├── integrations/  exactdn.ts (build-time CDN)
│   ├── lib/       cdn.ts (runtime CDN)
│   └── styles/    global.css · mobile.css · blog-article.css
├── public/  robots.txt · img/ · favicon
├── docs/                               ← obsidian-vault propio (44 .md, ver sección)
├── dist/ + ~179 HTML/_astro/chunks en RAÍZ (artefactos versionados) · graphify-out/ · .audit/
```

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout` (239 l.) | `src/layouts/BaseLayout.astro` | **Raíz** | `title*`, `description?`, `canonical?`, `ogImage?` (default avif), `noindex?`, `schema?` (obj o array) | TODAS las páginas. `<head>` completo (ver SEO) + 2 JSON-LD fijos (LocalBusiness+EventVenue líneas 38-82, WebSite+SearchAction 85-98) + `extraSchemas` por página. Body: skip-link → `TopBar` → `.hdr-stack`{`Header`+slot breadcrumbs} → `<main>` → `CtaFlujo` → `Footer`. **3 scripts terceros:** TruConversion (172-182), **DMChamp** widget (200), interceptor de embudo wa.me→DMChamp (203-237). `StickyMobileNav` REMOVIDO (comentado). |
| `BlogLayout` (639 l.) | `src/layouts/BlogLayout.astro` | **Extiende BaseLayout** | rich: `title, heroTitle, heroDescription, heroSeo1/2`* + heroBadge/heroMetrics/heroCta, datePublished, dateModified, articleSection, faqs[], breadcrumbs[], sidebarProducts/Articles/Services (defaults hardcoded) | Artículos. Breadcrumbs+`Hero dark`+`CtaBar`+grid 2-col (article + aside 5 widgets)+`ExploreMore`+`NextStep`. Genera `BlogPosting`+`FAQPage` condicional → BaseLayout. ~350 l. `<style>` scoped. |

## Componentes — inventario (24)
| Componente | Ruta | Props (clave) | Uso |
|---|---|---|---|
| `Hero` | `components/Hero.astro` (363 l.) | `title, description, seoParagraph1/2`* + badge?, ctaPrimary?, ctaSecondary?, dark?, metrics? | Cabecera de toda página |
| `ServiceCard` | `components/ServiceCard.astro` (122 l.) | `title, description, image, href` + btnLabel?, badge?, icon? | Grids de servicios |
| `VenueCard` | `components/VenueCard.astro` (202 l.) | `e, tipos` (entrada espacio + dict) | Cards del directorio |
| `CtaBar` | `components/CtaBar.astro` (272 l.) | `items?: NavItem[]` (default 5) | Nav rápida post-hero (no convierte) |
| `CtaFlujo` | `components/CtaFlujo.astro` (445 l.) | sin props — auto-detecta `Astro.url.pathname` | **CTA inteligente único en BaseLayout**: cambia mensaje/badge/step según URL (Home→Servicios→Catálogo→Paquetes→Cotizar); se oculta en cotizar/contacto/aviso |
| `CtaBarFinal` | `components/CtaBarFinal.astro` (155 l.) | headline?, subtext?, phone?, whatsapp?, waMessage?, cotizarHref? | Barra de conversión dura al final |
| `WaBubble` | `components/WaBubble.astro` (82 l.) | whatsapp?, message? | Burbuja flotante WA (`position:fixed; #25D366`; abre DMChamp) |
| `FunnelProgress` | `components/FunnelProgress.astro` (383 l.) | (detecta paso por pathname) | Indicador de progreso de embudo |
| `NextStep` | `components/NextStep.astro` (237 l.) | titulo, href, btnLabel + subtitulo?, secondBtn? | Bloque "siguiente paso" |
| `EspaciosSidebar` | `components/EspaciosSidebar.astro` (249 l.) | espacios, tipos, activeSlug? | Sidebar del directorio |
| `Breadcrumbs`,`FaqSection`,`FeatureCard`,`Footer`,`GallerySection`,`Header`,`Img`,`ProductGallery`,`SectionHeader`,`TestimonialCard`,`TestimonialCardEmpresa`,`TopBar`,`ExploreMore` | `components/*` | varias | Migas/FAQ/cards/footer/galerías/nav/imagen-CDN/encabezados/testimonios |
| `StickyMobileNav` | `components/StickyMobileNav.astro` | — | **HUÉRFANO** (import comentado en BaseLayout) |

⚠️ **3 CTAs distintos por etapa del embudo:** `CtaBar` (nav rápida), `CtaFlujo` (CTA inteligente por URL, único en BaseLayout), `CtaBarFinal` (conversión dura). Sus headers los declaran **"OrigenLab Standard"** (sistema de diseño compartido entre proyectos del cluster). Duplicación: SVG de WhatsApp repetido en 4 archivos; `TestimonialCard`+`TestimonialCardEmpresa` casi iguales.

## Content Collections / esquemas / taxonomías
- **NO hay Content Collection.** No existe `src/content.config.ts` ni `src/content/`. El blog son **~75 archivos `.astro` individuales** en `src/pages/blog/` (deuda — ver Clasificación).
- **`src/data/espacios.json`** (133 KB): **directorio de espacios/venues al aire libre** — objeto con `_nota`, `tipos` (5 tipos) y **`espacios` (32 entradas)**. Cada espacio = 23 campos (slug, nombre, tipo, alcaldia, estado, capacidad, eventos, imagenes, descripcion, incluye/noIncluye, tips, puntosInteres, resena, seoTitle, seoDesc, comercialHook…). Contenido SEO local (parques/jardines reales).
- **`directorio/[slug].astro`** → `getStaticPaths` importa `espacios.json` y mapea `espacios → {params:{slug}, props:{espacio}}` (líneas 15-18); emite EventVenue + FAQ dinámica + tabla de cálculo de mesas + comparativa. Filtrado por alcaldía es **client-side por query string** (`/directorio/?a=Iztapalapa`), no rutas estáticas.
- **Nav data-driven:** `src/data/header.md` (brand "MesPic", 5 dropdowns + CTA) y `topbar.md` (promo, phone, whatsapp, schedule) — frontmatter YAML editable.

## SEO real
- **Metas (en `BaseLayout.astro:104-183`):** title, description, canonical (normalizado sin trailing slash vía regex línea 32+113), robots dinámico (`max-snippet:-1, max-image-preview:large` o noindex), **geo.*** (region MX-CMX, placename, ICBM 19.4326,-99.1332), **OG completo** (type/url/title/description/image 1200×630/locale es_MX/site_name), **Twitter** `summary_large_image`, favicon + theme-color `#2C5530`. ⚠️ **Sin hreflang** (monolingüe es-MX).
- **Schema JSON-LD:** fijos en BaseLayout (LocalBusiness+EventVenue, WebSite+SearchAction); BlogLayout (BlogPosting, FAQPage); por página: Product/Offer/Brand (catalogo), Service/FAQPage (servicios), EventVenue (directorio), BreadcrumbList (`Breadcrumbs`), FAQPage (`FaqSection`). Conteo `grep`: Question/Answer 93, LocalBusiness 40, ListItem 40, Offer 30, FAQPage 27, Product 25, Brand 25, Service 17, Article 9, etc. (~30 tipos). **No hay evidencia de AggregateRating fabricado masivo** (solo 2 ocurrencias).
- **Canonicals con `trailingSlash:'ignore'`:** normalizados sin slash en layout (32) y sitemap serialize — coherentes.
- **URLs:** kebab-case español; jerarquía L1–L4 anidada (servicios/bodas/boho).
- **Internal linking:** breadcrumbs (todas), sidebars (BlogLayout 5 widgets, EspaciosSidebar), `ExploreMore`, `NextStep`, `CtaBar`. Embudo muy marcado.
- **robots.txt** (`public/robots.txt`): Allow /, bloquea `/_astro/`+`/api/`+`/gracias`+params utm/fbclid/gclid; **GPTBot** Allow / (salvo gracias/cotizar); **CCBot Disallow /** (bloqueo Common Crawl). Sitemap → `sitemap-index.xml`.

## Sistema de diseño
- **Tokens** en `src/styles/global.css` `:root`: paleta **"madera + naturaleza + premium"** — `--c-primary #2C5530` (verde bosque) + light/dark, `--c-secondary #8B6F4E` (madera), `--c-accent #C8956C` (terracota) + light, fondos `--c-bg #FEFDFB`/`-alt #F7F4F0`/`-hero #F2EDE7`, texto `#1C1917`/`-muted #78716C`, borde `#E7E0D8`, `--c-star #F59E0B`. Layout: `--container 1600px`, `--header-height 92px`, `--topbar-height 36px`, `--section-py 5rem`.
- **Tipografía:** `--font-head: 'Plus Jakarta Sans'` (cargada vía Google Fonts, `BaseLayout.astro:146`); `--font-body: 'Inter'` ⚠️ **referenciada pero NO cargada** (comentario línea 143 "Inter removido") → body cae a system-ui silenciosamente.
- **UI base / patrones:** Hero (`Hero.astro`, variante `dark`). Cards (`ServiceCard`/`VenueCard`/`FeatureCard`). CTA (`CtaBar`/`CtaFlujo`/`CtaBarFinal`). WhatsApp flotante (`WaBubble`, `#25D366`, abre DMChamp). Breadcrumbs dentro de `.hdr-stack`. `mobile.css` como overrides; `blog-article.css` (698 l.) prosa de artículos.

## Convenciones
- **Naming:** páginas/slugs kebab-case español; componentes PascalCase; productos = carpeta/`index.astro`; jerarquía L1–L4 en rutas (servicios/bodas/boho).
- **Config centralizada: fragmentada / HUECO.** No hay `site.ts`/`config.ts`. Verdad repartida: `astro.config.mjs` (`SITE`), `BaseLayout.astro` (`siteUrl`/`siteName`/tel/email hardcoded 33-44), `topbar.md` (phone/whatsapp/schedule editable). **WhatsApp `5547868402` hardcoded en ~6 archivos** (BaseLayout ×2, BlogLayout, WaBubble, CtaFlujo, directorio/[slug]) sin fuente única.
- **"OrigenLab Standard":** vocabulario de sistema de diseño compartido, citado en headers de `CtaBar`/`CtaBarFinal`/`CtaFlujo`/`WaBubble`/`NextStep` y documentado en `docs/Arquitectura/`.

## Flujos / procesos
1. **Contenido:** páginas estáticas .astro (blog incluido); directorio desde `espacios.json` vía getStaticPaths.
2. **Conversión:** todo click WhatsApp → interceptado y abierto en **DMChamp** (bot/CRM IA); fallback `wa.me/5547868402`. Sin formulario con backend.
3. **CDN:** doble ExactDN (build-time `exactdn.ts` + runtime `lib/cdn.ts` con srcset responsive vía `Img.astro`).
4. **Deploy:** push a `main` → GitHub Actions → GitHub Pages.

## Integraciones
| Servicio | Estado | Evidencia |
|---|---|---|
| **DMChamp** (chat/CRM IA) | ✅ Activo — motor de conversión | `BaseLayout.astro:200` (widget `chat-widget/F4AelJWcHcHpPjjhC6sd`) + interceptor embudo + `WaBubble`/`CtaBarFinal`. Todo click WA pasa por el bot |
| **TruConversion** (heatmaps) | ✅ Activo | `BaseLayout.astro:172-182` (`app.truconversion.com/ti-js/62950/...`) |
| **ExactDN / ewww.io** (CDN img) | ✅ Activo | `src/integrations/exactdn.ts`, `src/lib/cdn.ts`, `Img.astro` (host `ew3fy9iennp.exactdn.com`) |
| **@astrojs/sitemap, mdx** | ✅ Activo (mdx sin usar) | `astro.config.mjs` |
| **GitHub Actions / Pages** | ✅ Activo | `.github/workflows/deploy.yml`, `CNAME` |
| **Cloudflare / wrangler / n8n / fal.ai / Brevo / formsubmit** | ❌ HUECO: sin evidencia | `grep` sin resultados en `src/` |
| **analytics GA/gtag/GTM/rybbit** | ❌ HUECO | No hay GA4. Único "analytics" = TruConversion (heatmaps, no tráfico) |

## Documentación previa (obsidian-vault propio): qué cubre, qué es reutilizable
**`docs/` = obsidian-vault de 44 archivos .md:**
- **Arquitectura (3):** `Estructura del Sitio.md`, **`Sistema de Diseño — OrigenLab Standard.md`** (el estándar transversal), `Stack Técnico.md`.
- **Componentes (16):** fichas 1:1 de BaseLayout, Breadcrumbs, CtaBar, CtaBarFinal, FaqSection, FeatureCard, Footer, GallerySection, Header, Hero, ProductGallery, SectionHeader, ServiceCard, TestimonialCard, TopBar, WaBubble.
- **Diseño (3):** `Paleta de Colores.md`, `Tipografía.md`, `Tokens CSS.md`.
- **Páginas (21):** fichas L1 Home; L2 Blog/Contacto/Cotizar/Nosotros/Servicios; L3 (Bodas/Corporativos/Festivales/Infantiles/Temáticas/Picnic Romántico/Reuniones/Sesiones); L4 (Boda Boho/Clásica/Rústica/Íntima + Corp Activaciones/Comidas/Conferencias/Team Building).
- **MOC (1):** `MOC — MESPIC Website.md`.
- ⚠️ Hueco doc: 9 componentes sin ficha (CtaFlujo, FunnelProgress, NextStep, EspaciosSidebar, VenueCard, ExploreMore, Img, StickyMobileNav, TestimonialCardEmpresa); Directorio sin ficha (solo el PLAN en raíz).
- **.md sueltos en raíz:** `DMChamp — Guía Maestra OrigenLab.md` (SOP de configuración del bot/CRM), `FAQ_MESPIC_100_preguntas.md` (banco de 100 FAQs → materia prima de schema/blog), `PLAN-Directorio-Espacios-Aire-Libre.md` (spec del directorio), `SEO-KEYWORDS.md` (keyword research), `prompts-fotografia-servicios.md` (prompts de imagen), `MESPIC_Analisis_Competidores.{docx,xlsx}` (competencia).

**Reutilizable para el Master System (alto valor):**
- **"Sistema de Diseño — OrigenLab Standard" + "Tokens CSS" + 16 fichas de componentes** — base de design system replicable entre proyectos del cluster (el más completo en fichas-por-componente).
- **`DMChamp — Guía Maestra OrigenLab.md`** — SOP canónico de integración del bot/CRM de conversión (transversal al cluster RENTA/EVENTOS).
- **Patrón embudo 3-CTAs (CtaBar→CtaFlujo→CtaBarFinal) + FunnelProgress** — modelo de funnel de conversión por etapas.
- **`FAQ_MESPIC_100_preguntas.md`** — plantilla de banco de FAQs reutilizable como insumo de FAQPage/blog.
- ⚠️ El vault va **detrás del código** (9 componentes y el directorio sin documentar).

## Clasificación
### ✅ Funciona
- SEO/Schema técnico de primer nivel para negocio local: ~30 tipos JSON-LD, LocalBusiness+EventVenue+geo, canonicals normalizados coherentes con sitemap, robots que bloquea CCBot — `src/layouts/BaseLayout.astro`, `public/robots.txt`, `astro.config.mjs`.
- Arquitectura CDN doble robusta (build-time + runtime con srcset, flags de bypass) — `src/integrations/exactdn.ts`, `src/lib/cdn.ts`.
- Directorio de espacios data-driven desde `espacios.json` (32 venues, 23 campos) → `directorio/[slug]` con EventVenue — `src/data/espacios.json`, `src/pages/directorio/[slug].astro`.
- Vault de documentación extenso (44 .md) + embudo de conversión bien diseñado.

### ❌ Falla
- **Blog como ~75 `.astro` individuales** (no Content Collection): cada artículo repite imports e invoca BlogLayout con props inline; sin frontmatter tipado (irónico: `@astrojs/mdx` instalado y sin usar) — `src/pages/blog/`.
- **Build versionado en el repo:** ~179 artefactos HTML/_astro/chunks en la raíz pese a deploy por CI desde `dist/` — `MESASPICNIC/` raíz.
- **Sin fuente única de contacto/WhatsApp:** `5547868402` hardcoded en 6+ archivos (no hay `site.ts`) — `BaseLayout.astro`, `BlogLayout.astro`, `WaBubble.astro`, `CtaFlujo.astro`, `CtaBarFinal.astro`, `directorio/[slug].astro`.
- **Componente muerto + tipografía fantasma:** `StickyMobileNav.astro` (import comentado) y `--font-body: 'Inter'` referenciada pero no cargada — `BaseLayout.astro:6,143,197`.
- **Astro v4** (el más desactualizado del cluster) — `package.json:14`.

### 🤖 Automatizable
- Migrar el blog a **Content Collection MDX** (`src/content/blog/*.mdx` + `[...slug].astro`) — `@astrojs/mdx` ya está instalado; elimina ~75 .astro duplicados. (DMChamp ya automatiza la conversión vía bot IA.)

### 📐 Estandarizable
- **"Sistema de Diseño — OrigenLab Standard"** (vault + Tokens CSS + 16 fichas de componentes) como design system canónico del cluster.
- **SOP DMChamp** (`DMChamp — Guía Maestra OrigenLab.md`) como procedimiento estándar de integración del bot de conversión.
- **Embudo 3-CTAs + FunnelProgress + ExploreMore "Paso 1/2/3"** como patrón de funnel estándar de arquetipo B.

## ⚠️ HUECOS
- **HUECO: config central.** Sin `site.ts`/`config.ts`; identidad/contacto fragmentada (astro.config + BaseLayout hardcoded + topbar.md) → no hay fuente única tipada.
- **HUECO: analytics de tráfico.** Sin GA4 (solo TruConversion heatmaps); no se mide tráfico/conversión cuantitativa.
- **HUECO: integraciones.** Sin n8n/fal.ai/Brevo/formsubmit/Cloudflare; conversión 100% por DMChamp/WhatsApp.
- **HUECO: documentación rezagada.** 9 componentes y el directorio sin ficha en el vault; el directorio solo tiene el PLAN en raíz.
- **HUECO: binarios.** `MESPIC_Analisis_Competidores.{docx,xlsx}` no leídos.
- **HUECO: muestreo.** Proyecto mediano-grande (~128 rutas): los ~23 productos de catálogo y ~75 posts de blog se inspeccionaron por patrón/muestra (1 por tipo), no archivo por archivo.
