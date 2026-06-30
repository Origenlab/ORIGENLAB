# Diagnóstico — MESECI
> Propósito: Catálogo-landing SEO de venta de equipo contra incendios (extintores, EPP bomberos, sistemas CI) para empresas en México, construido en Astro estático con 143 productos y 313 artículos de blog técnico.

## Identidad
- **Negocio/dominio:** MESECI — Equipo Contra Incendios · `meseci.com.mx` (CNAME en `public/CNAME`). Empresa mexicana desde 2008 (`src/config/site.ts:13-16`), CDMX (Benito Juárez) + Tlalnepantla (EdoMex). Email `ventas@meseci.com.mx`, WhatsApp `525534934812`.
- **Tipo de sitio:** Catálogo comercial + blog técnico SEO (no e-commerce: sin carrito ni pago; conversión vía WhatsApp/teléfono/formulario). Evidencia: `src/pages/productos/[...slug].astro:241-252` (solo CTAs de cotización), `src/components/sections/FormularioCotizacion.astro:134` (formsubmit.co, sin backend).
- **ARQUETIPO tentativo: A — catálogo de producto/servicio técnico.** Justificación: jerarquía Home → Categoría L3 → Subcategoría L3 → Producto L4 (`obsidian-vault/00-indice/README.md:86-93`); 143 fichas de producto en Content Collection (`src/content/productos/`); 18 categorías de producto cerradas (`src/content.config.ts:36-55`); schema `Product`+`Offer`+`AggregateRating` por producto (`src/pages/productos/[...slug].astro:56-99`); intención comercial/transaccional documentada (`obsidian-vault/04-seo/estrategia-seo.md:10-20`). El blog masivo (313 art.) es soporte SEO informacional/de captación, no el producto en sí — refuerza A, no lo convierte en D.
- **Estado:** En producción y activo, en remediación continua. El dueño ejecutó una auditoría técnica propia (`AUDITORIA_TECNICA_COMPLETA_2026-06-10.md`) con 20 secciones y registros de implementación Fase 0–4; build reciente en `dist/` (11-jun-2026, 429 HTML). Deuda estructural reconocida y parcialmente saldada.
- **Stack:**
  - **Astro 6** (`package.json:14` → `"astro": "^6.0.4"`). ⚠️ El vault documenta "Astro 5" (`obsidian-vault/01-arquitectura/arquitectura-general.md:12`) — desfasado.
  - **Output `static`**, `trailingSlash: 'never'`, `prefetch: true`, `inlineStylesheets: 'auto'` (`astro.config.mjs:6-16`).
  - **Integrations:** solo `@astrojs/sitemap` (`astro.config.mjs:2,17-51`) con priorities/changefreq por tipo de URL y filtro de drafts/privacidad.
  - **Tailwind 3.4** (`package.json:17`, `tailwind.config.mjs`) con `preflight:false` y `container:false` (delega reset y `.container` a `public/css/style.css`). PostCSS + autoprefixer (`postcss.config.mjs`).
  - **TypeScript** strict (`tsconfig.json` extiende `astro/tsconfigs/strict`).
  - **Adapter:** ninguno (sitio 100% estático).
  - **Deploy:** **GitHub Pages** vía `.github/workflows/deploy.yml` (Node 22, `npm ci` + `astro build` + `upload-pages-artifact` + `deploy-pages`). ⚠️ Conflicto: existen `public/_headers`, `public/_redirects` (formato Netlify/Cloudflare Pages) y el vault dice "Cloudflare/Bluehost" — pero GitHub Pages **ignora** `_headers` y `_redirects`. Ver HUECOS.

## Estructura de carpetas
```
MESECI/
├── astro.config.mjs · tailwind.config.mjs · postcss.config.mjs · tsconfig.json · package.json
├── .github/workflows/deploy.yml          ← CI GitHub Pages
├── .claude/ (settings.local.json + worktrees/)  ← worktrees de sesiones Cowork
├── src/
│   ├── config/   site.ts (SITE/CONTACT/waUrl/WA_MESSAGES) · cta-presets.ts (7 presets)
│   ├── data/     categoryMapping.ts (blog↔producto interlinking)
│   ├── components/        (10 raíz) + layout/ (5) + sections/ (67)  = 82 .astro
│   ├── layouts/  Layout.astro            ← ÚNICO layout
│   ├── pages/    37 archivos: 33 estáticas + 4 dinámicas ([categoria], productos/[...slug], blog/[...slug], blog/categoria/[category])
│   ├── content/  blog/ (313 .md) · productos/ (143 .md)
│   ├── content.config.ts                 ← esquemas Zod v2
│   └── styles/   global.css (3 @imports) · design-system.css (20KB, tokens)
├── public/
│   ├── css/  style.css (59KB) · homepage.css · categoria.css · blog-premium.css · venta-equipo.css
│   ├── js/   main.js (sticky header, megamenú, burger móvil)
│   ├── images/ (~2,896 .avif + 298 jpg)
│   ├── robots.txt · _headers · _redirects · CNAME · llms.txt · llms-full.txt · sitemap (generado)
├── obsidian-vault/   ← 28 .md de documentación propia (ver sección dedicada)
├── dist/             ← build (429 HTML) — versionado en repo
├── firefighter-articulos/  ← 5 .md sueltos fuera de la colección (borradores SCBA/ARFF/HAZMAT) + blog.html
├── graphify-out/     ← salida de herramienta de grafo de enlaces (graph.html, GRAPH_REPORT.md)
├── .archive/         ← scripts Python de migración WP (extraer-wp.py, fix-blog-*.py, convert_images.py)
└── ~30 .md sueltos en raíz  ← bitácora de fases (FASE9_*, RESUMEN_*, AUDITORIA_*, etc.)
```
⚠️ HUECO: `dist/` está versionado en el repo (raro en deploy por CI) y conviven ~30 .md de bitácora en la raíz + el vault — ruido documental.

## Layouts — jerarquía de herencia
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `Layout.astro` | `src/layouts/Layout.astro` | **Ninguna** — único layout, raíz de todo | `title*`, `description*`, `canonical?`, `ogImage?`, `ogType?`, `extraCss?: string[]`, `breadcrumbs?: {name,url}[]`, `noindex?`, `keywords?` | TODAS las páginas. Compone `<head>` SEO completo + 3 JSON-LD (Organization/LocalBusiness, WebSite+SearchAction, BreadcrumbList condicional) + `SiteHeader` + `Breadcrumbs` + `<slot/>` + `CTABar` + `Footer` + `WhatsAppFloat`. Carga `style.css` + `extraCss[]` por página. |

No hay sub-layouts ni layouts por tipo (producto/blog/categoría). La variación visual por tipo de página se logra con `extraCss` (p.ej. blog inyecta `homepage.css`+`blog-premium.css` — `src/pages/blog/[...slug].astro:118`) y `<style>` scoped dentro de cada página/componente.

## Componentes reutilizables — inventario
82 componentes `.astro`. Por volumen se agrupan; los representativos en detalle:

### Genéricos reutilizables (`src/components/`, 10)
| Componente | Ruta | Props | Dónde se usa | Nota |
|---|---|---|---|---|
| `HeroBase` | `components/HeroBase.astro` | `badge,h1,h1Accent(HTML),subtitle,ariaLabel?` + slots `default`/`left-extra` | Fuente única de los ~11 heroes "premium" (vía wrappers `HeroXxx`) | **Patrón canónico** del proyecto: hero limpio, CTAs van fuera (NavRapidaIndex). Tokens visuales en el propio `<style>`. |
| `Hero` | `components/Hero.astro` | `label,title,titleSpan?,description,p1?,p2?,stats?,ctaText,ctaHref,ctaWhatsApp?` | `pages/[categoria].astro:299` | ⚠️ **Contradice HeroBase**: mete stats + CTAs DENTRO del hero. Usa `homepage.css` global, no scoped. Patrón viejo. |
| `CTABanner` | `components/CTABanner.astro` | `heading,desc?,btns?[],badge?,variant?(red/dark/light),centered?` | Páginas L3 estáticas (con presets de `cta-presets.ts`) | CTA maestro configurable; iconos SVG inline; responsive. |
| `FAQ` | `components/FAQ.astro` | `items[],title,headingId` | `[categoria].astro:397`, páginas L3 | Acordeón. |
| `RelatedProducts` | `components/RelatedProducts.astro` | `products[],title` | Producto detalle, `[categoria]` | Grid de productos. |
| `RelatedArticles` | `components/RelatedArticles.astro` | `currentProductCategory,limit` | Producto detalle | Usa `categoryMapping.ts`. |
| `RelatedProductsBlog` | `components/RelatedProductsBlog.astro` | `currentBlogCategory,limit` | Blog detalle | Inverso del anterior. |
| `ResponsiveImage` | `components/ResponsiveImage.astro` | `src,alt,title?,width?,height?,loading?,decoding?,fetchpriority?,sizes?,class?,itemprop?` | Producto, categoría, etc. | Estandariza perf/CLS; imágenes estáticas AVIF (no usa `astro:assets`). |
| `CatGrid` | `components/CatGrid.astro` | grid de categorías | Páginas L3 | Marcado legacy. |
| `SectionTitulo` | `components/SectionTitulo.astro` | título de sección | Blog detalle | — |

### Layout (`components/layout/`, 5)
`SiteHeader` (topbar + header sticky + megamenú 4 columnas + overlay móvil), `Footer`, `Breadcrumbs` (visual; el JSON-LD lo emite Layout), `CTABar`, `WhatsAppFloat` (botón flotante, lee `CONTACT.whatsapp`). Todos extraídos de `Layout.astro` en el refactor 2026-06-10; estilos en `style.css` global.

### Secciones (`components/sections/`, 67) — duplicación masiva por familias
| Familia | Nº | Evidencia | Nota |
|---|---|---|---|
| `Hero*` | **30** | `HeroIndex, HeroExtintores, HeroBomberos, HeroCascosBombero…` | Mayoría son thin-wrappers de `HeroBase` (correcto), pero hay 1 archivo por página → no se parametrizó en un solo componente data-driven. |
| `Proceso*` | 6 | `ProcesoIndex/Extintores/Bomberos/Combate/Componentes/Section` | Mismo layout, datos distintos. |
| `Sectores*` | 6 | `SectoresIndex/Extintores/Bomberos/Combate/Componentes/Nosotros` | Idem. |
| `Relacionados*` | 5 | `RelacionadosExtintores/Bomberos/Combate/Componentes/Section` | Idem. |
| `NavInterna*` | 5 | `NavInterna/Bomberos/Combate/Componentes/Extintores` | Idem. |
| Index-específicas | ~10 | `CategoriasIndex, FeaturesIndex, TestimoniosIndex, BlogPreviewIndex, FaqCotizacionIndex, CTAFinalIndex, NavRapidaIndex…` | Patrón "una sección = un componente" (PROYECTORED). |
| Nosotros/Contacto | ~10 | `MisionNosotros, ValoresNosotros, TimelineNosotros, ConfianzaNosotros, SucursalesContacto, CanalesContacto, FaqContacto, FormularioCotizacion…` | — |

⚠️ La existencia de `*Section` genéricos (`ProcesoSection`, `RelacionadosSection`) junto a las variantes por-categoría sugiere una refactorización iniciada y no terminada.

## Content Collections / esquemas / taxonomías
Definidos en `src/content.config.ts` (esquema **v2**, endurecido tras auditoría 2026-06-10), con `glob()` loader.

**Colección `blog`** (`base: ./src/content/blog`, 313 .md):
- `title` string 10–110 · `description` string 70–280 · `heroImage` ruta `^/images/` obligatoria · `category` **enum cerrado de 13 valores** (default `general`) · `tags` array ≤10 opc. · `draft` bool (default false). `.strict()` (rechaza campos desconocidos).
- Categorías blog (`BLOG_CATEGORIES`, líneas 20-34): capacitacion-y-brigadas, combate-contra-incendios, componentes-contra-incendios, equipamiento-de-bomberos, equipos-contra-incendios, extintores-contra-incendios, general, mantenimiento-y-seguridad, normativa-y-cumplimiento, seguridad-industrial, seguridad-vial, senalizacion-y-proteccion-civil, sistemas-contra-incendio.

**Colección `productos`** (`base: ./src/content/productos`, 143 .md):
- `title` 10–110 · `description` 70–280 · `price` string opc. · `category` **enum cerrado de 18 valores** (obligatorio) · `image` ruta `^/images/` · `draft` bool. `.strict()`.
- Categorías producto (`PRODUCT_CATEGORIES`, líneas 36-55): botas/cascos/guantes/trajes-de-bombero, equipos-para-bomberos, extintores-{abc,de-agua,de-espuma,de-polvo,contra-incendios}, gabinetes, general, herrajes/hidrantes/mangueras/monitores-contra-incendios, seguridad-industrial, seguridad-vial.

**Decisión "sitio atemporal"** (config:11-13): sin `pubDate`/`updatedDate`; el contenido es evergreen, no se emiten fechas en schema ni UI. Por eso `sitemap` eliminó `lastmod` global (`astro.config.mjs:20-22`).

**Rutas dinámicas que consumen colecciones:**
- `productos/[...slug].astro` → `getStaticPaths` desde colección `productos`; emite `Product`+`Offer`+FAQPage (parsea FAQ del markdown). Mapeo categoría→página L3 inline `CAT_MAP` (líneas 21-40).
- `blog/[...slug].astro` → desde colección `blog` (excluye drafts); emite `Article`. Related posts por categoría.
- `blog/categoria/[category].astro` → archivo por categoría de blog.
- `[categoria].astro` → **NO usa colección para las rutas**; define ~24 categorías con metadata hard-codeada en `getStaticPaths` (líneas 13-239).

⚠️ Inconsistencias de taxonomía detectadas:
- `categoryMapping.ts:27` referencia `boquillas-para-monitor-de-importacion` y `componentes-contra-incendios` como categorías de producto que **no existen** en `PRODUCT_CATEGORIES` del schema.
- `blog/[...slug].astro:44-50` define `CAT_LABELS` con slugs (`extintores`, `equipamiento-de-bomberos`) que sólo parcialmente coinciden con el enum; hay 3 tablas de etiquetas distintas (`CAT_LABELS`, `CAT_LABELS_FULL`, `CAT_MAP`) en archivos separados → fuente de verdad fragmentada.

## SEO real
**Metas (todas en `Layout.astro`):** `<title>`, description, keywords (condicional), author/publisher, canonical normalizado sin trailing slash (líneas 42-45), robots configurable (`index,follow,max-snippet:-1,max-image-preview:large` o `noindex,nofollow`), geo.* (MX-CMX + coords), Open Graph completo (`og:type` configurable), Twitter `summary_large_image`, theme-color, favicons SVG+PNG.

**hreflang:** `es-MX` + `x-default` ambos apuntando al canonical (líneas 181-182) — sitio monolingüe.

**Schema JSON-LD (tipos + rutas):**
| Tipo | Dónde | Evidencia |
|---|---|---|
| `Organization`+`LocalBusiness` (3 ContactPoint, geo, openingHours, sameAs) | Layout → **todas las páginas** | `Layout.astro:48-129` |
| `WebSite`+`SearchAction` (sitelinks searchbox) | Layout → todas | `Layout.astro:147-165` |
| `BreadcrumbList` | Layout, si hay `breadcrumbs` prop | `Layout.astro:132-144` |
| `LocalBusiness`+`FireProtectionEquipmentSupplier`+`OfferCatalog` | Home | `pages/index.astro:37-94` |
| `FAQPage` | Home (6Q), páginas L3, productos (parseado del MD) | `index.astro:97-150`; conteo global **29 FAQPage / 90 Question** |
| `Product`+`Offer`+`AggregateRating`(4.9/38)+`MerchantReturnPolicy` | cada producto | `productos/[...slug].astro:56-99` |
| `Article`+`Blog`+`WebPage` | cada artículo (sin fechas, atemporal) | `blog/[...slug].astro:90-107` |
| `CollectionPage`+`ItemList` | páginas L3 categoría | conteo global 25 CollectionPage / 23 ItemList |

⚠️ Schema posiblemente arriesgado para SEO: `AggregateRating` 4.9 con `reviewCount:38` **idéntico y hard-codeado en los 143 productos** (`productos/[...slug].astro:66-72`) sin reseñas reales → riesgo de penalización por reviews fabricadas/spam estructurado en Google.

**URLs:** lowercase con guiones, sin stop words, sin trailing slash. WordPress→Astro migrado con ~80+ redirects 301 en `public/_redirects` (`/producto/* → /productos/:splat`, normalización de `ñ`, prefijos de categoría WP).

**Internal linking:** muy desarrollado — megamenú 4 columnas (`SiteHeader`), breadcrumbs en todas las páginas, `NavRapidaIndex` post-hero, `RelatedProducts`/`RelatedArticles`/`RelatedProductsBlog` cruzando blog↔producto vía `categoryMapping.ts`, sidebar de blog con categorías+recientes+productos. Documentado en 4 niveles (`obsidian-vault/04-seo/estrategia-seo.md:40-71`).

**Sitemap/robots:**
- Sitemap generado por integración con priorities (home 1.0, categorías top 0.9, productos/servicios 0.8, blog 0.7) y exclusión de draft/privacidad/mapa.
- `public/robots.txt`: permite buscadores, **bloquea bots de IA** (CCBot, GPTBot, ClaudeBot, Google-Extended, PerplexityBot, anthropic-ai, Bytespider…), Disallow `/*?*` y `/*&*`, Crawl-delay 1, apunta a `sitemap-index.xml`.
- `public/llms.txt` + `llms-full.txt`: resumen estructurado del negocio para LLMs (⚠️ contradice el bloqueo de bots IA en robots.txt — el dueño lo registró como hallazgo A8).
- Verificación Google: `public/googlee27371ca9070d7fb.html`.
- Analytics: **rybbit** (self-hosted, `app.rybbit.io`, site-id `f9641f347b5a`) inyectado en Layout (líneas 216-217). No hay Google Analytics ni GTM.

## Sistema de diseño
**Tokens** en `src/styles/design-system.css` (importado vía `global.css`):
- **Color:** `--color-brand-red #C8102E`, `-red-dark #9B0D22`, `-red-light #FEE2E2`, `-brand-orange #EA580C`; escala de grises `#111827 … #F9FAFB`; semánticos success/warning/error. Espejados en `tailwind.config.mjs:6-12` (`brand-red`, etc.).
- **Tipografía:** Inter (sans + heading), cargada async desde Google Fonts (`Layout.astro:223-228`); escala `--font-size-xs…5xl`, weights 400–900, line-heights, letter-spacing.
- **Espaciado:** escala `--spacing-0…32` + `--section-padding-{mobile,desktop}`; Tailwind añade `spacing.section: 5rem` y `maxWidth.content: 1400px`.
- **Otros:** `--radius-*` (sm→full), `--shadow-*`, `boxShadow.card`/`card-hover` en Tailwind.
- ⚠️ **Doble fuente de verdad de estilos:** tokens en `design-system.css` (CSS vars) + utilidades Tailwind + `style.css` global (59KB con `.container`, reset, clases de componentes) + 4 CSS por-página (`homepage/categoria/blog-premium/venta-equipo.css`) + `<style>` scoped en componentes/páginas. Coexisten sin una jerarquía única clara.

**UI base / patrones recurrentes:**
- **Hero:** patrón canónico `HeroBase` (fondo `linear-gradient(155deg,#0C0C0C,#180A0D)` + radial rojo + rejilla 60px, badge con dot pulsante, H1 con acento rojo, grid 55%/1fr) — REGLA ABSOLUTA: sin CTAs dentro (`HeroBase.astro:7-9`). Variante divergente en `Hero.astro` (con stats/CTAs).
- **Cards:** producto (`cat-product-card`), artículo relacionado, sidebar widgets — todas con sombra suave y radius 12-16px.
- **CTA:** `CTABanner` con 3 variantes (red/dark/light) + 7 presets temáticos (`cta-presets.ts`: GENERAL, EXTINTORES, BOMBEROS, SISTEMAS, COMPONENTES, COTIZACION, BLOG) con badges de normas (NOM-154, NFPA 1971/13/25, UL/FM).
- **WhatsApp:** botón flotante global (`WhatsAppFloat`) + mensajes preformateados centralizados (`WA_MESSAGES` en `site.ts:47-53`) + CTAs WA dispersos en cada plantilla.
- **Breadcrumbs:** componente visual + JSON-LD acoplado en Layout.

## Convenciones de nombres y archivos
- **Componentes:** PascalCase. Secciones con sufijo de página: `HeroExtintores`, `ProcesoBomberos`, `SectoresNosotros`. Genéricos sin sufijo (`CTABanner`, `FAQ`).
- **Páginas estáticas:** kebab-case = slug = keyword SEO (`extintores-abc.astro`, `equipamiento-para-bomberos.astro`).
- **Slugs de contenido:** kebab-case largo y descriptivo, **con sufijos editoriales `-tecnica` / `-confianza`** (106 archivos `-tecnica`, 59 `-confianza` en blog). El dueño identificó ~78 pares como canibalización SEO (`AUDITORIA…:86-95`).
- **Config centralizada:** `SITE`, `CONTACT`, `waUrl()`, `WA_MESSAGES` en `site.ts` — `as const`, fuente única para evitar hardcoding (parcialmente respetado: muchas plantillas hardcodean `525534934812` y textos WA en vez de usar `waUrl`).
- **CSS:** kebab-case por página en `public/css/`; tokens con prefijo `--color-`, `--spacing-`, `--font-`.
- **Comentarios:** encabezado de bloque con `─────` y propósito en casi todos los `.astro`/`.ts` — buena documentación inline.

## Flujos / procesos (implícitos)
1. **Contenido:** producto/artículo se escribe en `.md` con frontmatter validado por Zod → `getStaticPaths` genera la página → schema JSON-LD automático.
2. **Migración WP:** scripts Python en `.archive/` (`extraer-wp.py`, `descargar-imagenes.py`, `convert_images.py` → AVIF, `fix-blog-*.py`) + 301s en `_redirects`. Pipeline one-shot de migración, ya consumido.
3. **Conversión:** todo CTA → WhatsApp (`waUrl`/links directos), teléfono (`tel:`), o formulario (`formsubmit.co` → email). Sin CRM ni captura propia.
4. **Deploy:** push a `main` → GitHub Actions build → GitHub Pages. (⚠️ El vault documenta un flujo manual de push desde Cowork/Desktop, ver `arquitectura-general.md:125-139`.)
5. **Análisis de enlaces:** herramienta externa "graphify" generó `graphify-out/graph.html` + `GRAPH_REPORT.md` (auditoría de interlinking).
6. **Versión base aprobada:** commit `8a0a650` (regla del dueño: no pisar páginas sin confirmar).

## Integraciones
| Servicio | Estado | Evidencia |
|---|---|---|
| **GitHub Actions** | ✅ Activo | `.github/workflows/deploy.yml` (deploy a Pages) |
| **GitHub Pages** | ✅ Deploy target real | mismo workflow + `CNAME` |
| **Cloudflare** | ⚠️ HUECO / ambiguo | El vault dice "Cloudflare/Bluehost", existen `_headers`+`_redirects` (formato CF Pages/Netlify) y CSP completa, pero el CI publica a GitHub Pages que **no procesa** esos archivos. No hay `wrangler.toml`. Sin evidencia de despliegue activo en Cloudflare. |
| **formsubmit.co** | ✅ Activo | `FormularioCotizacion.astro:134` (procesa el form de cotización, sin backend propio) |
| **rybbit** (analytics self-hosted) | ✅ Activo | `Layout.astro:216-217` |
| **Google Search Console** | ✅ Verificado | `public/googlee27371ca9070d7fb.html` |
| **Google Fonts** | ✅ Activo | Inter, carga async (`Layout.astro:223-228`) |
| **WhatsApp Business** | ✅ Activo (links wa.me) | `site.ts`, todas las plantillas |
| **n8n / fal.ai / Brevo** | ❌ HUECO: sin evidencia | `grep` no encuentra referencias en `src/`, `public/`, config ni workflows. No integrados. |

## Documentación previa (obsidian-vault propio): qué cubre, qué es reutilizable
Vault de **28 archivos .md** en estructura 00–07 (con `.obsidian/` config + graph.json), última actualización 16-abr-2026:
- **00-indice/README.md:** mapa del vault, conexiones del sitio, reglas Claude (rutas, git, GitHub Origenlab).
- **01-arquitectura/:** `arquitectura-general.md` (stack, estructura, principio "una sección = un componente", referencia PROYECTORED, reglas de trabajo) + `design-system.md` (tokens, colores, tipografía).
- **02-paginas/ (13 archivos):** una ficha por página/tipo (home, categorías-principales, subcategorias con estado de homologación, extintores-abc/contra-incendios como referencias canónicas, blog, contacto, nosotros, productos, venta-equipo).
- **03-componentes/:** `componentes-sections.md`, `cta-banner.md` (7 presets), `patron-hero-cta.md` (REGLA ABSOLUTA HeroBase + diagrama mermaid de herencia + API + tokens CSS).
- **04-seo/estrategia-seo.md:** keywords con volumen/intención/página objetivo, interlinking 4 niveles, patrones de title/description/URL, métricas objetivo.
- **05-contenido/guia-blog.md:** estrategia editorial de la "Guía Contra Incendios".
- **06-plan-trabajo/ (7 archivos):** roadmap + bitácoras de sesiones (13/15/16-abr-2026).
- **07-templates/:** `template-L3-categoria.md` + `template-L3-subcategoria.md` — **plantillas canónicas por tipo de página** ("fuente de verdad del diseño, leer antes de crear/modificar").

**Reutilizable para el Master System (alto valor):**
- Patrón **HeroBase + NavRapida** (regla "hero presenta, NavRapida convierte") con API y diagrama — directamente exportable como SOP de hero.
- Patrón **CTABanner + presets** — modelo de CTA configurable reutilizable.
- **Templates L3 categoría/subcategoría** — esqueleto §1–§13 de página de catálogo (schemas, secciones, orden) → base para fábrica de sitios arquetipo A.
- **Estrategia SEO** (keywords→página, interlinking 4 niveles, patrones title/desc/URL) — plantilla de plan SEO.
- Patrón **PROYECTORED** ("una sección = un componente", config `site.ts` centralizada) — principio arquitectónico canónico.
- ⚠️ Reutilizable con cautela: el vault está **desfasado** (dice Astro 5, deploy Cloudflare/Bluehost; la realidad es Astro 6 + GitHub Pages) y la "REGLA ABSOLUTA" del hero no se cumple en `[categoria].astro`/`Hero.astro`.

## Clasificación de hallazgos

### ✅ Funciona
- Config Astro estática sólida: `static`, `trailingSlash:'never'`, prefetch, inline CSS — `astro.config.mjs`.
- SEO técnico maduro y centralizado en un solo layout (canonical normalizado, OG/Twitter, hreflang, geo, robots configurable) — `src/layouts/Layout.astro:42-239`.
- Cobertura JSON-LD rica y correcta por tipo: Organization/LocalBusiness, WebSite+SearchAction, Breadcrumb, Product/Offer, Article, FAQPage, CollectionPage/ItemList — `Layout.astro`, `index.astro`, `productos/[...slug].astro`, `blog/[...slug].astro`.
- Content Collections con **Zod estricto v2** (enums cerrados, `.strict()`, imagen obligatoria) que ya corrigió datos corruptos — `src/content.config.ts`.
- Config centralizada `SITE/CONTACT/waUrl/WA_MESSAGES` + 7 presets de CTA — `src/config/site.ts`, `cta-presets.ts`.
- Patrón canónico `HeroBase` (fuente única de hero) bien documentado y aplicado en las ~11 páginas premium — `components/HeroBase.astro`, `obsidian-vault/03-componentes/patron-hero-cta.md`.
- Headers de seguridad completos (CSP basada en inventario real, HSTS preload, X-Frame DENY, Permissions-Policy) — `public/_headers` (siempre que el host los sirva).
- Migración WP preservada con 301s y `ResponsiveImage` AVIF + width/height (anti-CLS) — `public/_redirects`, `components/ResponsiveImage.astro`.
- Documentación propia excepcional (vault 28 archivos + templates + auditoría técnica de 20 secciones).

### ❌ Falla
- **Deploy/host incoherente:** CI publica a GitHub Pages, que ignora `_headers` y `_redirects` → la CSP/HSTS y los 301 de WordPress **no se aplican en producción** si el host real es GitHub Pages — `.github/workflows/deploy.yml` vs `public/_headers`+`_redirects`.
- **Doble sistema de categorías:** `[categoria].astro` define ~24 categorías hard-codeadas que **colisionan** con ~24 páginas estáticas del mismo slug; en Astro la estática gana, dejando el dinámico como fallback parcial (solo sirve `productos-contra-incendios` y `boquillas-para-monitor-de-importacion`) — `pages/[categoria].astro:13-239` vs `pages/extintores-abc.astro` et al.
- **`AggregateRating` fabricado** 4.9/38 idéntico en los 143 productos sin reseñas reales — `productos/[...slug].astro:66-72` (riesgo de penalización Google).
- **Canonical con trailing slash** en `[categoria].astro:293` (`/${categoria}/`) contradice `trailingSlash:'never'` del resto del sitio — inconsistencia de URL canónica.
- **Duplicación de componentes** (reconocida por el dueño, ~6,900 líneas): 30 `Hero*`, 6 `Proceso*`, 6 `Sectores*`, 5 `Relacionados*`, 5 `NavInterna*` — `src/components/sections/`.
- **Canibalización de contenido:** 106 archivos `-tecnica` + 59 `-confianza` (~78 pares sobre el mismo producto compitiendo en Google) — `src/content/blog/`.
- **77 artículos en `draft:true`** (25% del blog) — contenido escrito sin publicar — `src/content/blog/`.
- **Fuente de verdad fragmentada para taxonomía/labels:** 3 tablas (`CAT_MAP`, `CAT_LABELS`, `CAT_LABELS_FULL`) + `categoryMapping.ts` con slugs que no existen en el enum (`boquillas-para-monitor-de-importacion`, `componentes-contra-incendios`).
- **`Hero.astro` viola la "REGLA ABSOLUTA"** del propio proyecto (mete stats/CTAs en el hero) — `components/Hero.astro` usado por `[categoria].astro`.

### 🤖 Automatizable
- Generación de los 30 `Hero*` / familias `Proceso/Sectores/Relacionados/NavInterna` desde **un componente data-driven + tabla de datos** (el dueño ya esbozó el reemplazo en `AUDITORIA…:311-357`).
- Generación de páginas L3 categoría/subcategoría desde los **templates del vault** (07-templates) + un dataset de categorías único → fábrica de sitios arquetipo A.
- Validación CI de `title`/`description` contra límites SEO (70/160) y detección de drafts/H1-duplicado/pares -tecnica/-confianza (lint de contenido).
- Build/Deploy ya automatizado (GitHub Actions); ampliable a check de schema y de enlaces rotos (existe `LINKS_ROTOS_PENDIENTES.md`).
- Sincronización `PRODUCT_CATEGORIES`/`BLOG_CATEGORIES` (schema) ↔ `categoryMapping.ts` ↔ labels desde una **única fuente** generada.

### 📐 Estandarizable
- **HeroBase + NavRapida** como patrón de hero canónico (eliminar `Hero.astro` divergente) — exportar API a SOP.
- **CTABanner + presets temáticos** como sistema CTA estándar de cualquier sitio del arquetipo.
- **Layout único + props SEO + JSON-LD por tipo** como plantilla de cabecera SEO reutilizable (el mejor `<head>` del portafolio candidato a canónico).
- **Esquema Zod estricto** (enums cerrados, `.strict()`, imagen obligatoria, decisión atemporal documentada) como plantilla de `content.config.ts`.
- **Config `site.ts`** (SITE/CONTACT/waUrl/WA_MESSAGES) como contrato estándar de identidad/contacto.
- **Estructura del vault 00–07 + templates por tipo de página** como modelo de documentación de proyecto.

## ⚠️ HUECOS
- **HUECO: Host real en producción.** El CI despliega a GitHub Pages (no procesa `_headers`/`_redirects`), pero existen artefactos de Cloudflare Pages/Netlify y el vault menciona "Cloudflare/Bluehost". No se pudo confirmar dónde resuelve `meseci.com.mx` hoy ni si la CSP/301s están activas. Requiere verificar DNS/host con el dueño.
- **HUECO: Astro 6 vs Astro 5.** package.json declara `^6.0.4` (preliminar para la fecha de la auditoría externa) pero el vault y comentarios dicen Astro 5. No verifiqué que el build corra sin warnings de breaking changes de la v6. ⚠️ Posible que `^6.0.4` sea una versión no estándar/local; el vault (Astro 5) puede reflejar la realidad histórica.
- **HUECO: n8n / fal.ai / Brevo.** Sin ninguna referencia en el repo → se asume no integrados; no puedo confirmar uso externo fuera del código.
- **HUECO: `firefighter-articulos/` y `graphify-out/`** viven fuera de `src/` (5 .md sueltos de blog no incluidos en la colección + salida de herramienta de grafo). No es claro si son borradores pendientes de migrar o residuos.
- **HUECO: `dist/` versionado** en el repo pese a deploy por CI — no verifiqué si es intencional (fallback) o residuo.
- **HUECO: divergencia entre la auditoría del dueño (354 art./337 H1/147 drafts) y el estado actual (313 art./77 drafts).** El dueño ha remediado activamente desde el 10-jun; no reconstruí el historial git para fechar cada cambio. El H1 duplicado hoy se mitiga con `display:none` CSS en plantillas (`blog/[...slug].astro:417`, `productos/[...slug].astro:220`), no eliminando el `#` del markdown.
- **HUECO: cobertura de muestreo.** Leí ~12 páginas/componentes representativos de 82+37; las familias `Proceso/Sectores/Relacionados/NavInterna` se inspeccionaron por nombre/conteo, no archivo por archivo.
