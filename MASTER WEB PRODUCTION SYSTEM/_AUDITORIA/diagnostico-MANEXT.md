# Diagnóstico — MANEXT
> Propósito: Radiografía forense del proyecto Astro de MANEXT (mantenimiento/venta de extintores CDMX) para alimentar el sistema maestro de producción web — cada hallazgo con ruta y línea de evidencia.

## Identidad
- **Negocio:** MANEXT — Mantenimiento, venta y recarga de extintores y equipo contra incendios. Package name `manext-extintores` (`package.json:2`).
- **Dominio:** `https://mantenimientodeextintores.mx` (`astro.config.mjs:5`; `public/CNAME:1` = `mantenimientodeextintores.mx`).
- **Tipo:** Sitio estático multi-página (catálogo técnico + servicio local + blog editorial denso). 26 rutas `.astro` (24 estáticas + 2 dinámicas) más 161 entradas de Content Collections (`src/pages/`, `src/content/`).
- **ARQUETIPO: A (catálogo técnico) con fuerte componente C (servicio local) y D (contenido-directorio).** Justificación con evidencia:
  - **A — catálogo técnico:** Colección `productos` con 42 fichas (`src/content/productos/*.md`, 42 archivos) segmentadas por agente extintor (PQS, CO₂, AFFF, Tipo K, agente limpio, agua), 6 páginas de categoría por tipo (`src/pages/polvo-quimico-seco.astro`, `co2.astro`, `espuma-afff.astro`, `tipo-k.astro`, `agentes-limpios.astro`, `agua-presion.astro`) y catálogo digital JS-driven (`src/pages/catalogo.astro:435` carga `/js/catalog-system.js`).
  - **C — servicio local:** JSON-LD `LocalBusiness` con `areaServed: ["Ciudad de México","Estado de México"]`, `geo` y `openingHours` (`src/pages/index.astro:6-33`); 6 páginas de servicio con schema `Service` (`prueba-hidrostatica.astro:7`, `recarga-de-extintores.astro`, `mantenimiento-preventivo.astro`, `senalizacion.astro`, `capacitacion-brigadas.astro`, `servicios.astro`); meta `geo.region MX-CMX` (`src/layouts/Layout.astro:58`).
  - **D — contenido-directorio:** 119 archivos en `src/content/blog/` (`ls src/content/blog/*.md` = 119) con taxonomía por categorías en `blog/index.astro:6-22`.
  - No es B (renta-eventos): no hay inventario por fechas, reservas ni calendario.
- **Estado:** Producción activa, desplegado y vivo (auditorías previas verifican local↔live sincronizados — `ANALISIS-MANEXT-2026-05-05.md:13`). Madurez de plataforma alta, madurez de contenido media (placeholders y duplicados pendientes — ver HUECOS).

## Stack
| Pieza | Detalle | Evidencia |
|---|---|---|
| Framework | Astro `^6.0.4` | `package.json:14` |
| Integración única | `@astrojs/sitemap ^3.7.1` (sin opciones — `sitemap()` pelado) | `package.json:13`; `astro.config.mjs:2,6` |
| Output | NO declarado → `static` por defecto en Astro 6 | `astro.config.mjs:4-8` (ausencia) |
| trailingSlash | `'never'` | `astro.config.mjs:7` |
| site | `https://mantenimientodeextintores.mx` | `astro.config.mjs:5` |
| TypeScript | `extends astro/tsconfigs/strict` (1 línea) | `tsconfig.json:1-3` |
| Estilos | Vanilla CSS — SIN Tailwind, SIN PostCSS, SIN MDX. CSS en `public/css/*` + `<style>` inline en páginas + critical CSS inline en layout | `package.json:12-15` (solo 2 deps); `src/layouts/Layout.astro:50`; ver Sistema de diseño |
| JS cliente | Vanilla, `is:inline`. 2 archivos en `public/js/` (`blog-system.js` 652 líneas, `catalog-system.js` 64 líneas) | `find public -type f` |
| Node CI | Node 22, `npm ci` + `npm run build` | `.github/workflows/deploy.yml:20-23` |
| Analytics | Rybbit.io (self-host `app.rybbit.io`, site-id `f9641f347b5a`) | `src/layouts/Layout.astro:49,78` |
| Chat / lead | DM Champ chat widget (`api.dmchamp.com`) + embudo que intercepta clicks a WhatsApp | `src/layouts/Layout.astro:357,361-407` |

Config **mínima confirmada** (8 líneas reales). Solo 2 dependencias en `package.json`. Stack deliberadamente austero.

## Estructura de carpetas
```
MANEXT/
├── astro.config.mjs            # 8 líneas (config mínima)
├── package.json                # name: manext-extintores, 2 deps
├── tsconfig.json               # extends strict
├── CNAME (en public/)          # mantenimientodeextintores.mx
├── .github/workflows/deploy.yml# Deploy a GitHub Pages (Node 22)
├── .editorconfig               # utf-8, lf, indent 2
├── .gitattributes              # 194 líneas, boilerplate genérico web (line-endings)  ← legacy
├── .ftpquota                   # "0 0" (4 bytes)  ← vestigio de hosting FTP/cPanel previo
├── .audit/DOCUMENTO-ARTICULOS.md          # artefacto de auditoría de contenido
├── graphify-out/               # análisis de grafo de enlaces + HERO-DESIGN-SYSTEM.md, GRAPH_REPORT.md, graph.json/html
├── ANALISIS-MANEXT-2026-05-05.md          # auditoría propia previa (19 KB)
├── AUDITORIA-MANEXT-2026-04-06.md         # auditoría propia previa (30 KB)
├── public/
│   ├── css/   (6: style 57L, blog-system 2481L, blog-article 3350L, catalog-system 0L, mobile-enhancements 613L, section-redesign 448L)
│   ├── js/    (2: blog-system, catalog-system)
│   ├── img/   (~339 archivos, mayoría .avif; subcarpeta img-index/)
│   ├── data/  (products.json, articles.json)  ← fuente del catálogo JS legacy
│   ├── _headers   (cache headers Cloudflare/Netlify)
│   ├── robots.txt
│   ├── CNAME
│   ├── favicon.ico, icon.svg, icon.png
└── src/
    ├── content.config.ts       # 2 colecciones: blog, productos
    ├── content/
    │   ├── blog/        (119 .md)
    │   └── productos/   (42 .md)
    ├── components/  (2: Hero.astro, SectionHeader.astro)
    ├── layouts/     (1: Layout.astro — 410 líneas)
    └── pages/       (24 .astro estáticas + blog/[...slug] + productos/[...slug])
```
Evidencia: `find src -type f`, `find public -type f`, `ls -la` raíz, `wc -l public/css/*.css`.

## Layouts — jerarquía
| Layout | Rol | Props | Evidencia |
|---|---|---|---|
| `src/layouts/Layout.astro` | **Layout único** del sitio entero. Contiene `<head>` completo (SEO, OG, Twitter, favicons, schema BreadcrumbList), critical CSS inline, top-info-bar, header+nav con dropdowns y menú móvil JS, breadcrumbs, `<slot/>`, footer completo (4 columnas + trust-bar + legal), widget DMChamp y embudo WhatsApp. | `title`, `description`, `canonical`, `ogTitle?`, `ogDescription?`, `ogImage?` (default `/img/og-image.avif`), `breadcrumbs?[]`, `schemas?[]`, `extraCss?[]` | `src/layouts/Layout.astro:1-12` (interface), `:41-81` (head), `:82-258` (header/nav/breadcrumbs), `:264-354` (footer), `:356-407` (chat/embudo) |

**No hay layouts anidados ni layout específico de blog/producto.** Todas las páginas (incluidas dinámicas) importan el mismo `Layout.astro` y diferencian estilos vía `extraCss[]` (p. ej. `blog/[...slug].astro:44` carga `blog-system.css` + `blog-article.css`). El schema BreadcrumbList se construye SIEMPRE en el layout a partir del prop `breadcrumbs` (`Layout.astro:26-38`).

## Componentes — inventario
| Componente | Tipo | Variantes / props clave | Uso | Evidencia |
|---|---|---|---|---|
| `Hero.astro` | Hero | `variant: 'home'\|'page'`; props `title`, `subtitle`, `description`, `eyebrow`, `paragraphs[]`, `services[]` (cards con icono), `showServices`. Incluye mapa interno de 15 iconos SVG tipo Lucide. Strip de "service cards" hardcodeado de 4 cards como fallback. | Usado por **20 páginas** (incl. `index`, dinámicas, servicios) | `src/components/Hero.astro:35-47` (props), `:50-66` (iconos), `:122-196` (service strip); `grep -rl '<Hero' src/pages` = 20 |
| `SectionHeader.astro` | Encabezado de sección | `title`, `subtitle?`, `eyebrow?`, `paragraphs?[]`. Layout 2-columnas (`sh--split`) o centrado (`sh--center`). | Usado por **12 páginas** | `src/components/SectionHeader.astro:12-20`; `grep -rl SectionHeader src/pages` = 12 |

**Solo 2 componentes `.astro` reutilizables.** El resto de patrones UI (cards de servicio, cards de producto, CTA, WhatsApp, breadcrumbs, formulario de cotización, FAQ acordeón, testimonios, pre-footer strip) están **inline/hardcodeados** en cada página o en el layout — NO componetizados. Ejemplos:
- **Card de servicio / extintor:** markup repetido a mano en `index.astro:112-184` y `:248-343`.
- **WhatsApp:** botones y enlaces `wa.me` dispersos por todo el sitio, no hay componente; el embudo central los intercepta (`Layout.astro:383-405`).
- **Breadcrumbs:** renderizados en el layout (`Layout.astro:230-258`), no es componente independiente.
- **Formulario de cotización:** `<form id="whatsappForm">` inline + script `is:inline` por página (`index.astro:591-625` markup, `:751-782` handler).
- **FAQ acordeón:** markup + script `is:inline` duplicado en cada página que lo usa (`index.astro:499-580` + `:709-748`; copia distinta en `blog/[...slug].astro:269-278`).

## Content Collections / esquemas / taxonomías
Definidas en `src/content.config.ts` con loaders `glob` (API de Astro 5/6):
| Colección | Loader | Schema (Zod) | Conteo | Evidencia |
|---|---|---|---|---|
| `blog` | `glob **/*.md base ./src/content/blog` | `title` (req), `description?`, `heroImage?`, `heroRight?: string[]` | 119 `.md` | `src/content.config.ts:4-12`; `ls src/content/blog/*.md` = 119 |
| `productos` | `glob **/*.md base ./src/content/productos` | `title` (req), `description?`, `price?`, `category?`, `image?` | 42 `.md` | `src/content.config.ts:14-23`; `ls src/content/productos/*.md` = 42 |

- **Rutas dinámicas:** `src/pages/blog/[...slug].astro:6-12` y `src/pages/productos/[...slug].astro:5-11` via `getStaticPaths` sobre cada colección (`params.slug = entry.id`).
- **Taxonomía de blog:** NO está en el schema; se deriva por **regex sobre el slug** en runtime (`blog/index.astro:14-22` función `getCategory`) y hay una lista de 11 "category slugs" excluidos del listado (`blog/index.astro:6-11`). ⚠️ Esos 11 stubs siguen generando página individual indexable vía `getStaticPaths` (ver HUECOS / auditoría previa).
- **Schema de productos NO usa `price`/`category`/`image` de forma estructurada en JSON-LD** — la ficha solo pinta `title`+`description`+`image` (`productos/[...slug].astro:58-72`). No hay JSON-LD `Product`/`Offer` por producto (ver SEO real).

## SEO real
**Cabecera (en `Layout.astro`, aplica a todo el sitio):**
- `<title>` dinámico, `meta description` dinámico, `lang="es-MX"` (`:42,46,56`).
- `meta robots` = `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` (`:57`).
- Geo: `geo.region MX-CMX`, `geo.placename Ciudad de Mexico` (`:58-59`).
- **Canonical** dinámico vía prop `canonical` (`:60`) — cada página lo pasa explícito (p. ej. `index.astro:77`, `blog/[...slug].astro:42`, `productos/[...slug].astro:20`).
- **Open Graph** completo: title/description/type=website/locale=es_MX/url/image (1200×630)/image:alt (`:61-69`). Default OG image `/img/og-image.avif` (`:20`) — **EXISTE** en `public/img/og-image.avif` (corrige hallazgo previo de "falta").
- **Twitter Card** `summary_large_image` (`:70-73`).
- Favicons: `favicon.ico`, `icon.svg`; **apple-touch-icon apunta a `/icon.avif`** (`:76`) que **NO existe** en `public/` → 404 (`ls public/icon.avif` = MISSING). ❌
- `theme-color #d32f2f` (`:77`).

**JSON-LD (set:html con set:html):** 56 declaraciones `@type` en 18 páginas (`grep "@type" src/pages` = 56 en 18 archivos):
- **BreadcrumbList:** siempre, generado en el layout (`Layout.astro:26-38`).
- **LocalBusiness:** home (`index.astro:6-56`, con `hasOfferCatalog`/`OfferCatalog`/`Offer`/`Product`) y embebido en páginas de servicio (`prueba-hidrostatica.astro:12`).
- **FAQPage + Question/Answer:** home (`index.astro:58-71`, 8 preguntas) y páginas de servicio (`prueba-hidrostatica.astro:39-45`, `capacitacion-brigadas.astro:43`).
- **Service:** 6 páginas de servicio (`prueba-hidrostatica`, `recarga-de-extintores`, `mantenimiento-preventivo`, `senalizacion`, `capacitacion-brigadas`, `servicios` — `grep '"@type": "Service"' src/pages`).
- **Product / Offer / AggregateRating:** en `extintores.astro` y 6 páginas de tipo (`co2`, `tipo-k`, `venta-de-extintores`, `polvo-quimico-seco`, `agentes-limpios`, `espuma-afff` — `grep -rln aggregateRating src/pages` = 7 archivos). ❌ **El `aggregateRating` SIGUE presente** (la auditoría 2026-05-05 lo daba por "fix aplicado" solo en home; las páginas de tipo lo conservan — riesgo de acción manual de Google por reseñas no verificables).
- **Página de producto individual (`/productos/[slug]`): SIN JSON-LD propio** — solo hereda BreadcrumbList del layout. No hay `Product`/`Offer`/precio estructurado (`productos/[...slug].astro:17-22`). ❌
- **Artículo de blog: usa MICRODATA, no JSON-LD** — `itemscope itemtype schema.org/Article` + `itemprop headline/articleBody/image` (`blog/[...slug].astro:48,58,83,87`). No emite `Article`/`BlogPosting` como JSON-LD ni `datePublished`/`author`. 📐

**Sitemap:** `sitemap()` sin opciones (`astro.config.mjs:6`) → `grep serialize|customPages|priority|changefreq astro.config.mjs` = 0. ❌ **Sin `serialize`, sin prioridades, sin `changefreq`, sin `lastmod` curado.** Todas las URLs salen con prioridad uniforme; el home/servicios no se distinguen de stubs de blog.

**robots.txt** (`public/robots.txt`): `Allow: /`, `Crawl-delay: 1`, Sitemap declarado. Bloquea rutas **legacy que ya no existen en este árbol Astro** (`/MANTENIMIENTO-TOOLS/`, `/templates/`, `/scripts/`, `/.audit/`, `/.claude/`, `/js/webpack.*`, `/*_backup*`) → vestigios del sitio anterior (`public/robots.txt:8-26`). ⚠️

**_headers** (`public/_headers`): cache-control agresivo (1 año immutable para img/css/js/woff2, 1h must-revalidate para html). Comentario lo etiqueta para "Cloudflare Pages / Netlify" (`public/_headers:1`) — pero el deploy real es **GitHub Pages** (`deploy.yml:1`), que **ignora `_headers`** → el archivo es inerte en el hosting actual. ⚠️/❌

**CNAME:** `mantenimientodeextintores.mx` (`public/CNAME:1`). No hay `_redirects`, no hay `site.webmanifest` (`ls` → MISSING ambos).

## Sistema de diseño
**NO existe un sistema de design tokens unificado.** La identidad visual está **fragmentada y duplicada** en 4 bloques `:root` independientes + critical CSS inline + valores hardcodeados:
| Fuente | Tokens | Prefijo | Evidencia |
|---|---|---|---|
| `public/css/style.css:1` (`:root`) | 7 vars: `--primary-color #d32f2f`, `--secondary-color #f44336`, `--dark-color #212121`, `--light-color #fafafa`, `--gray-color #757575`, `--white`, `--shadow` | `--*-color` | `grep ':root' public/css/style.css` |
| `src/layouts/Layout.astro:50` (critical CSS inline) | **Mismos 7 tokens duplicados** literalmente | `--*-color` | `Layout.astro:50` |
| `public/css/blog-system.css:6` (`:root`) | 10 vars: `--blog-primary #d32f2f`, `--blog-primary-dark`, `--blog-dark`, `--blog-gray`, `--blog-light`, `--blog-border`, `--blog-shadow`, `--blog-radius 16px`, `--blog-transition` | `--blog-*` | `public/css/blog-system.css:6-17` |
| `public/css/blog-article.css:8` (`:root`) | 5 vars: `--art-primary #d32f2f`, `--art-primary-light`, `--texto-oscuro`, `--texto-gris`, `--art-bg-light` | `--art-*` | `public/css/blog-article.css:8-14` |

- **Paleta:** rojo `#d32f2f` (primario) → `#f44336`/`#ef4444`/`#ee5253` (secundarios), oscuros `#212121`/`#1a1a1a`/`#0a0a0a`, grises `#757575`/`#666`/`#555`. **El mismo rojo se redefine 4 veces con 4 nombres distintos** y además aparece hardcodeado (no como var) en `<style>` inline de páginas (p. ej. `productos/[...slug].astro:25-49` usa `#d32f2f`/`#f44336` literales; `index.astro:804,827,842,889` usa `var(--primary-color)` pero también `rgba(211,47,47,…)` a mano).
- **Tipografía:** sistema, sin webfont — `font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif` (`Layout.astro:50`; `style.css:1`). No hay tokens de escala tipográfica; tamaños con `rem`/`clamp()` ad-hoc por bloque.
- **Espaciado / radios / sombras:** sin escala global; `blog-system.css` define `--blog-radius`/`--blog-shadow` pero solo para el blog; el resto usa valores sueltos.
- **CSS co-localizado:** `<style>` inline en **11 archivos de página** (`grep '<style' src/pages` = 15 ocurrencias en 11 archivos), p. ej. bloque `<style is:global>` de 117 líneas para testimonios en `index.astro:784-902` y 28 líneas de hero de producto en `productos/[...slug].astro:23-51`.
- **Documentación de diseño existente:** `graphify-out/HERO-DESIGN-SYSTEM.md` documenta el Hero (tokens en PROSA: `#0a0a0a`, `#d32f2f→#ef4444`, etc.) y se declara "espejo de `Obsidian Vault/MANEXT/HERO-DESIGN-SYSTEM.md`" (`HERO-DESIGN-SYSTEM.md:18`) — pero esos tokens **no están codificados como variables CSS**, solo descritos.

**Veredicto: diseño AD-HOC.** Hay intención de tokens (4 `:root` parciales + doc del Hero) pero sin fuente única ni nomenclatura consistente; mucho color hardcodeado. 📐

**Patrones UI presentes** (todos ad-hoc salvo Hero/SectionHeader): hero (componente), section header (componente), service/extinguisher cards (inline), CTA oscuro (inline, `blog/[...slug].astro:107-130`), botón WhatsApp (inline + embudo), breadcrumbs (layout), formulario cotización→WhatsApp (inline + script), FAQ acordeón (inline + script duplicado), testimonios (inline), pre-footer interlinking strip `.pf-strip` (definido en `section-redesign.css:9-15`, markup inline), sidebar de artículo `.sb-card` (`blog/[...slug].astro:134-225`).

## Convenciones
- **Idioma:** español de México en todo el contenido y UI; `lang="es-MX"`, `og:locale es_MX` (`Layout.astro:42,64`).
- **Indentación:** 2 espacios, LF, UTF-8, final newline (`.editorconfig:5-10`).
- **Slugs:** kebab-case descriptivo y largo, SEO-oriented (p. ej. `prueba-hidrostatica-extintores-empresa-cdmx-cada-cuanto-cuanto-cuesta.md`).
- **Cache-busting CSS:** querystring `?v=N` manual en cada `<link>` y en `extraCss[]` (`Layout.astro:51,53,54`; `blog/[...slug].astro:44`). Se incrementa a mano por archivo.
- **Scripts cliente:** siempre `is:inline`, IIFE con `'use strict'`, vanilla JS sin framework (`Layout.astro:135-228`; `index.astro:709-782`).
- **JSON-LD:** patrón `const xSchema = JSON.stringify({...})` en frontmatter → pasado por prop `schemas={[...]}` al layout, que lo inyecta con `set:html` (`index.astro:6,82`; `Layout.astro:80`).
- **Imágenes:** AVIF como formato primario, `loading="lazy"` salvo hero (`loading="eager"`), `width`/`height` explícitos casi siempre (`index.astro:115`, `blog/[...slug].astro:83`).
- **Teléfono / WhatsApp:** tel `5614612594`; WhatsApp `5215614612594` (con 521). ⚠️ Inconsistencia histórica: auditorías previas detectaron `5215539689272` en template de producto; el código actual de `productos/[...slug].astro:69` ya usa `5215614612594` (corregido).
- **Versionado de componentes en comentarios:** Hero declara "Versión 3.0 (2026-05-05)" (`Hero.astro:4`).

## Flujos / procesos
- **Build & deploy:** push a `main` → GitHub Actions (`actions/checkout@v4`, `setup-node@v4` Node 22, `npm ci`, `npm run build`) → `upload-pages-artifact` (`./dist`) → `actions/deploy-pages@v4` → **GitHub Pages** con dominio propio (CNAME). Concurrency group `pages`, `cancel-in-progress: false` (`.github/workflows/deploy.yml:1-37`).
- **Generación de páginas:** estáticas (SSG) — sin `output: 'server'` ni adapter. `getStaticPaths` para blog y productos (`blog/[...slug].astro:6`, `productos/[...slug].astro:5`).
- **Captura de lead:** formulario de cotización valida campos y arma mensaje → `window.open(wa.me…)` (`index.astro:757-780`); el embudo global intercepta ese `window.open` y todos los `<a href=wa.me>` para abrir primero el chat **DMChamp**, con fallback a WhatsApp a 800 ms (`Layout.astro:361-405`).
- **Analítica:** Rybbit (`app.rybbit.io/api/script.js`, defer, `Layout.astro:78`).
- **Catálogo digital:** página `catalogo.astro` carga `catalog-system.js` que consume `public/data/products.json` (catálogo filtrable client-side, paralelo a las fichas `.md`).

## Integraciones
| Integración | Estado | Evidencia |
|---|---|---|
| GitHub Actions / GitHub Pages | ✅ Activa (único deploy real) | `.github/workflows/deploy.yml:1,24-36`; `public/CNAME` |
| Rybbit analytics (self-host) | ✅ Activa | `Layout.astro:49,78` |
| DM Champ chat widget | ✅ Activa, con embudo de interceptación WhatsApp | `Layout.astro:357,361-407` |
| WhatsApp (wa.me) | ✅ Canal de conversión principal (no API, solo deep-links) | `index.astro:778`; `blog/[...slug].astro:95,120,142` |
| Cloudflare | ⚠️ HUECO: no hay `wrangler.toml` ni código CF; `_headers` menciona Cloudflare Pages pero el deploy es GitHub Pages → `_headers` inerte. La auditoría 2026-04-06 menciona "Cloudflare/GitHub Pages" como hipótesis, no confirmado en código | `public/_headers:1`; ausencia de `wrangler*` |
| n8n / fal.ai / Brevo | ⚠️ HUECO: sin rastro en `src`, `public`, config, workflows. No integrados | `grep` negativo |
| @astrojs/sitemap | ✅ Activa pero sin configurar (`sitemap()` pelado) | `astro.config.mjs:6` |
| FTP deploy | ⚠️ NO activo. `.ftpquota` ("0 0") y `.gitattributes` (194 líneas boilerplate) son **vestigios de un hosting cPanel/FTP previo**, no hay credenciales ni workflow FTP. El deploy vigente es GHA→Pages | `.ftpquota:1`; `.gitattributes:1-16`; `deploy.yml` |

## Documentación previa
Cuatro artefactos de auditoría/documentación propios en el repo (alto valor de reutilización):
1. **`AUDITORIA-MANEXT-2026-04-06.md`** (30 KB) — Auditoría experta. Cubre: mapa completo del sitio por niveles L1/L2/L3 (`:21-69`), resumen ejecutivo con 3 problemas críticos (canibalización, duplicados de blog, 27/42 productos placeholder — `:11-18`), errores operativos (WhatsApp erróneo, OG faltantes, rating falso). **Reutilizable:** taxonomía de URLs, catálogo de problemas SEO, benchmark de sector (BOMBERO, MESECI, PROYECTORED, GAMADEMEXICO — `:5`). Nota: declara "Astro 5.x" (`:4`) — desactualizado, hoy es 6.0.4.
2. **`ANALISIS-MANEXT-2026-05-05.md`** (19 KB) — Análisis de estado + comparación local↔live. Cubre: TL;DR con progreso (3 de 22 problemas resueltos — `:11`), tabla stack/arquitectura (`:27-41`), mapa funcional (99 URLs en sitemap, `:42-50`), tabla de sincronía local↔live verificada por navegador (`:58-70`). **Reutilizable:** estado real vs. live, conteo de URLs, lista viva de pendientes. ⚠️ Algunas afirmaciones quedaron obsoletas (dice OG home OK / aggregateRating fix en home, pero el rating sigue en 7 páginas de tipo; y el blog hoy tiene 119 `.md`, no 41).
3. **`graphify-out/HERO-DESIGN-SYSTEM.md`** (7 KB) — Doc del Hero Design System v2.0 (tokens en prosa, ubicación de archivos, referencia visual proyectored.com.mx). Declara ser espejo de un `Obsidian Vault/MANEXT/`. **Reutilizable:** especificación del patrón Hero canónico.
4. **`graphify-out/GRAPH_REPORT.md`** (10 KB) + `graph.json`/`graph.html` — análisis del grafo de enlaces internos. **Reutilizable:** mapa de interlinking. `.audit/DOCUMENTO-ARTICULOS.md` — inventario/auditoría de los artículos de blog.

## Clasificación
### ✅
- Layout único bien tipado con props SEO completos (title/description/canonical/og/breadcrumbs/schemas/extraCss) y BreadcrumbList automático — `src/layouts/Layout.astro:1-12,26-38`.
- Content Collections tipadas con Zod y loaders `glob` (Astro 6) para blog (119) y productos (42) — `src/content.config.ts:4-23`.
- SEO técnico denso: 56 JSON-LD en 18 páginas (LocalBusiness, Service, FAQPage, OfferCatalog), OG/Twitter completos, canonical explícito por página, AVIF + dimensiones — `index.astro:6-71`, `Layout.astro:56-73`.
- Deploy CI/CD reproducible Node 22 → GitHub Pages con dominio propio — `.github/workflows/deploy.yml:1-37`, `public/CNAME`.
- Componente Hero versátil (variantes home/page, 15 iconos, service strip) reutilizado por 20 páginas — `src/components/Hero.astro:35-196`.
- Accesibilidad cuidada en nav: skip-link, roles ARIA, `aria-expanded`, manejo de foco/Escape, `aria-current` — `Layout.astro:85,89-130,209-226`.
- Embudo de conversión funcional: formulario→WhatsApp con interceptación a chat DMChamp y fallback — `Layout.astro:361-405`, `index.astro:751-782`.

### ❌
- `aggregateRating` sin fuente verificable en 7 páginas (`extintores.astro` + 6 de tipo) — riesgo de acción manual de Google — `grep aggregateRating src/pages` (7 archivos), p. ej. `extintores.astro`.
- `apple-touch-icon` apunta a `/icon.avif` inexistente → 404 — `Layout.astro:76`; `ls public/icon.avif` = MISSING.
- Fichas de producto sin JSON-LD `Product`/`Offer`/precio estructurado pese a ser arquetipo catálogo — `productos/[...slug].astro:17-22`.
- `_headers` configurado para Cloudflare/Netlify pero el deploy es GitHub Pages → cache headers **no se aplican** — `public/_headers:1` vs `deploy.yml:1`.
- Sitemap sin `serialize`/prioridades/`changefreq` → todas las URLs con peso uniforme (home = stub) — `astro.config.mjs:6`.
- 11 stubs de categoría de blog siguen generando página individual indexable — `blog/index.astro:6-11` (excluidos del listado pero no de `getStaticPaths`).
- `robots.txt` bloquea rutas legacy inexistentes en el árbol Astro (ruido, sin efecto útil) — `public/robots.txt:8-26`.

### 🤖
- JSON-LD construido manualmente como `JSON.stringify({...})` masivo y repetido por página (LocalBusiness/FAQ/Service duplicados entre páginas) — candidato a generador/helper centralizado — `index.astro:6-71`, `prueba-hidrostatica.astro:7-45`.
- Taxonomía de blog inferida por regex sobre slugs en runtime en vez de campo `category` en el schema — frágil y no determinista — `blog/index.astro:14-22` vs `content.config.ts:6-11`.
- Cache-busting CSS manual `?v=N` por archivo y página — propenso a olvidos; automatizable en build — `Layout.astro:51-54`.
- Catálogo duplicado en dos fuentes (Content Collection `productos/*.md` + `public/data/products.json` para el JS de `catalogo.astro`) — riesgo de desincronización — `content.config.ts:14-23` vs `catalogo.astro:435`.

### 📐
- Codificar un **design-token system único** (color/tipo/espaciado/radio/sombra) que reemplace los 4 `:root` fragmentados + critical CSS inline + hardcodes — `style.css:1`, `Layout.astro:50`, `blog-system.css:6`, `blog-article.css:8`, `productos/[...slug].astro:25-49`.
- Extraer componentes para patrones hoy inline: ServiceCard, ProductCard, CTA, WhatsAppButton, FAQAccordion, QuoteForm, Breadcrumbs — hoy duplicados en páginas y layout — `index.astro:112-184`, `:499-580`, `:591-625`.
- Unificar markup estructural de artículo en `BlogPosting` JSON-LD (con `datePublished`/`author`) en lugar de solo microdata `Article` — `blog/[...slug].astro:48,58`.
- Añadir `output` explícito en config (aunque sea `'static'`) y considerar `prefetch` para navegación interna densa — `astro.config.mjs:4-8` (ausencia de ambos).

## ⚠️ HUECOS
- ⚠️ HUECO: **Hosting real ambiguo a nivel de archivos.** Coexisten señales de 3 hostings: GitHub Pages (deploy real, `deploy.yml`/`CNAME`), Cloudflare/Netlify (`_headers`) y FTP/cPanel (`.ftpquota`, `.gitattributes`). Confirmado por código que el activo es GitHub Pages; los otros son vestigios. No verificable desde el repo si hay un proxy Cloudflare por DNS delante (posible, pero sin evidencia en archivos).
- ⚠️ HUECO: **`aggregateRating` — valores exactos no citados aquí** (la salida grep solo confirma presencia en 7 archivos). Para remediar habría que abrir cada uno y ver rating/conteo; no se inventan cifras.
- ⚠️ HUECO: **n8n / fal.ai / Brevo / Cloudflare Workers / D1 / KV:** sin ninguna evidencia en `src`, `public`, config o workflows. Si existen, viven fuera del repo (no auditable aquí).
- ⚠️ HUECO: **Webfont / sistema tipográfico:** no hay `@font-face` ni token de escala; solo font-stack del sistema (`Segoe UI`). No hay design system tipográfico — confirmado AD-HOC.
- ⚠️ HUECO: **Sincronía Content Collection ↔ `public/data/*.json`:** el catálogo `.md` (42) y `products.json` podrían divergir; no se verificó si el JS de catálogo refleja las mismas 42 fichas (requeriría diff de contenidos).
- ⚠️ HUECO: **Estado en vivo (live) NO reverificado** en esta auditoría (sin navegador); las afirmaciones de live provienen de `ANALISIS-MANEXT-2026-05-05.md` y pueden haber cambiado desde entonces.

### Seguridad
- ✅ **Sin secretos expuestos.** `grep -rniE 'gho_|ghp_|sk-…|api[_-]?key|SECRET|Bearer|BEGIN … KEY'` en `src/` y `public/` (excluyendo node_modules/dist/.git) → **0 credenciales reales**. Las coincidencias de "token"/"Secretaría"/"key" son palabras del contenido en español (normativa, Secretaría del Trabajo) y prosa de blog, no claves. El `data-site-id` de Rybbit (`f9641f347b5a`, `Layout.astro:78`) es un ID público de cliente, no secreto. El widget DMChamp usa un path token público en URL (`Layout.astro:357`), embebido por diseño (no credencial sensible).
- ⚠️ Nota: `.gitignore` (`node_modules/`, `dist/`, `.astro/`) no ignora `.DS_Store` ni `graphify-out/` — ruido en el repo, sin riesgo de seguridad.
