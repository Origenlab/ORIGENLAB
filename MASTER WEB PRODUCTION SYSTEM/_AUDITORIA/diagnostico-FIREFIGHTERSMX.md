# Diagnóstico — FIREFIGHTERSMX

> Propósito: Portal comercial de equipos para bomberos certificados NFPA/NOM en México (firefighters.mx) con catálogo data-driven por categorías/marcas/industrias/servicios, blog y conversión por cotización/WhatsApp. Theme tactical dark.

## Identidad
- **Negocio / dominio:** "FIREFIGHTERS MX" — `https://firefighters.mx` (`astro.config.mjs` `site`, `src/data/site.ts` `SITE.url`). Tagline: "Equipos para bomberos certificados NFPA en México". Afirma "distribuidores autorizados en los 32 estados", 15 años en mercado.
- **Tipo:** Catálogo / distribuidor técnico sin carrito (lead → cotización/WhatsApp). Productos: trajes estructurales, SCBA, herramientas de rescate, extintores, sistemas contra incendio.
- **ARQUETIPO tentativo:** **A (catálogo de producto / servicio técnico)**. Justificación: catálogo por categorías con norma NFPA (`src/data/categories.ts`), páginas `/productos`, `/industrias/[industria]`, `/servicios/[servicio]`, `/marcas`, `/licitaciones`, `/cotizacion`, schema `Product` per producto. Módulo D secundario (`/blog` 13 posts). Es el **tercer "FIREFIGHTER"** del cluster (.com.mx directorio, .mx catálogo+directorio, firefighters.mx catálogo) → marcas/SEO superpuestos. Evidencia: `src/data/categories.ts`, `src/pages/productos/[categoria].astro`, `src/content/config.ts`.
- **Estado:** **vivo pero con datos placeholder**. Contacto con valores de relleno (teléfono `55 1234-5678`, email `contacto@firefightersmx.com` que NO coincide con dominio firefighters.mx). Git activo (commit 18-jun). 13 posts, 2 productos. Diseño avanzado; contenido productivo incompleto.

## Stack
- **Astro:** `^4.15.0` (`package.json`) — **único del cluster en Astro 4** (los demás 5/6). 
- **Integrations:** `@astrojs/tailwind ^5.1.0` (integración clásica, `applyBaseStyles:false`, `configFile './tailwind.config.cjs'`), `@astrojs/mdx ^3.1.3`, `@astrojs/sitemap ^3.2.1` (filtro `!/404`).
- **CSS framework / tokens:** TailwindCSS `^3.4.10` (`tailwind.config.cjs`) + plugins `@tailwindcss/typography` y `@tailwindcss/forms` (✅ instalados, a diferencia de FFMX). **Doble fuente de tokens:** (a) `tailwind.config.cjs` (`theme.extend.colors`: `fire` escala, `gold`, `dark` slate, `ink`; fuentes Sora/Rajdhani; `maxWidth.site 1440px`; `boxShadow.fire`; `backgroundImage.tactical/fire-gradient`); (b) **CSS-vars en `src/styles/global.css`** ("Design System v2 FORGE & PROTECT": `--forge-50..900` navy, `--ember-*` naranja eléctrico, `--gold-*`, semánticos `--color-bg/surface/accent`, alias backward-compat). Theme **dark tactical** (bg `#040A12`).
- **Adapter / output:** sin adapter → **estático**. `compressHTML:true`, `cssCodeSplit:true`, `inlineStylesheets:'auto'`, `image.domains:['firefighters.mx']`, shiki `dracula`.
- **Deploy detectado:** **GitHub Pages** (`.github/workflows/deploy.yml`: build + deploy-pages@v4, Node 20). Repo `github.com/Frankoropeza/FIREFIGHTERSMX.git` — **único bajo cuenta `Frankoropeza`** (los otros 4 bajo `Origenlab`).
- **Tooling:** `eslint`, `astro check`, `@types/node`. Fuentes vía Google Fonts CDN `<link>` (no self-hosted) — documentado como intencional (no `@import` para no bloquear render).

## Estructura de carpetas (resumen)
```
src/
  components/{blog,common,home,products,ui}/  (ui/ vacío)
  content/{blog(13), productos(2)} + config.ts
  data/{site, categories, products, brands, industries, services, faqs, navigation}.ts
  layouts/{BaseLayout, BlogLayout}.astro
  pages/{index, blog/, productos/[categoria]+[...producto]+/trajes-bombero/+/cascos-nfpa/,
         industrias/[industria], servicios/[servicio], marcas/, empresa/,
         + estáticas: certificaciones, cobertura, cotizacion, distribuidores,
           licitaciones, nosotros, contacto, terminos, aviso-privacidad}
  styles/global.css · env.d.ts
```
Aliases TS (`@layouts`, `@components`, `@data`).

## Layouts — jerarquía
- **`BaseLayout.astro`** (raíz) — props `title, description, canonicalURL (def Astro.url.href), ogImage, ogType ('website'|'article'|'product'), noindex, schema (object|object[])`. Compone `<head>`: preconnect + Google Fonts (Rajdhani/Sora) + `SEO` + favicon/manifest (`theme-color #040A12`); `<body style="bg:#040A12;color:#CBD5E1"`: skip-link, `Header`, `<main>`, **`QuickLinksBar variant="footer"`** (interlinking global), `Footer`, `WhatsAppButton`, slot `analytics`. lang `es-MX`, `scroll-smooth`.
- **`BlogLayout.astro`** — layout de artículos de blog (hereda/envuelve BaseLayout; no inspeccionado en detalle).
- **Herencia:** páginas usan `BaseLayout` y pasan `schema` por prop (cada página construye su BreadcrumbList/etc. y lo inyecta).

## Componentes — inventario
| Componente | Ruta | Props | Dónde se usa |
|---|---|---|---|
| SEO | src/components/common/SEO.astro | title, description, canonicalURL, ogImage, ogType, noindex, schema | BaseLayout head |
| Header / Footer / TopBar | src/components/common/*.astro | — | BaseLayout |
| QuickLinksBar | src/components/common/QuickLinksBar.astro | variant ('footer'…) | BaseLayout (interlinking) |
| WhatsAppButton | src/components/common/WhatsAppButton.astro | — | BaseLayout (flotante) |
| Spotlight | src/components/common/Spotlight.astro | — | secciones |
| HeroPro / CategoriesGrid / ProductCards / ServicesSection / IndustriesSection / CoverageSection / NormsTable / RiskGuide / ProcessSteps / ValueProps / TestimonialsSection / FAQSection / CTASection / BlogTeasers | src/components/home/*.astro (14) | `pages/index.astro` |
| CategoryCard / CategorySpotlight | src/components/products/*.astro | category | productos |
| BlogCard | src/components/blog/BlogCard.astro | post | blog |

`src/components/ui/` existe pero **sin archivos** (dir vacío) — no hay capa UI base atómica (Button/Badge propios); se resuelve con clases utilitarias (`btn-primary` global).

## Content Collections / esquemas / taxonomías
`src/content/config.ts` (API `type: 'content'`, glob legacy). 2 colecciones (inglés en campos):
- **`blog`** (13): `title, description (≤165), pubDate, updatedDate?, author (def "FIREFIGHTERS MX"), category (string libre), tags[], image{url,alt,caption?}?, draft`.
- **`productos`** (2): `title, description (≤165), category, subcategory?, brand?, model?, norm?, sku?, image?, images[], specs (record<string>)?, features[], draft`.
- **Catálogo real en `src/data/*.ts`** (no colección): `categories.ts` (interface `Category` rica: slug, label, norm, description ≤160, shortDesc, accent, icon SVG inline, intro[], items[{name,detail}], productCategory?, spotlight{}), `products.ts` (`featuredProducts`), `brands.ts`, `industries.ts`, `services.ts`, `faqs.ts`, `navigation.ts`. **El contenido editorial de categorías vive en TS, no en MD.**
- **Rutas dinámicas:** `productos/[categoria]` (desde `allCategories`, excluye L3 estáticas `trajes-bombero`/`cascos-nfpa`), `productos/[...producto]` (catch-all), `industrias/[industria]`, `servicios/[servicio]`, `blog/[slug]`. Mezcla de dinámicas + estáticas dedicadas.

## SEO real
- **`SEO.astro`:** título `{title} | FIREFIGHTERS MX` (idempotente), description, robots index/noindex con `max-image-preview:large`, canonical, OG completo (image 1200×630 absoluta), Twitter `@firefightersmx`, author/publisher/geo MX. **`Organization` schema base inyectado en TODA página** (con `contactPoint` telephone `+52-55-1234-5678` ⚠️ placeholder, `sameAs` redes de `SITE.social`). Schemas adicionales por prop (`schema` array) → cada página añade BreadcrumbList/Product/etc.
- **Schema JSON-LD tipos:** `Organization` (global), `BreadcrumbList` (construido en cada página dinámica, ej. `productos/[categoria].astro`), Product/Service según página. Patrón: schema-por-prop (menos centralizado que el `@graph` de MONITORES o el multi-schema de FFMX).
- **Patrón de URLs:** `/productos`, `/productos/[categoria]`, `/industrias/[industria]`, `/servicios/[servicio]`, `/blog/[slug]`, `/marcas`. 
- **Internal linking:** `QuickLinksBar` global (footer) + `otherCategories` (related en cada categoría, top-5) + spotlights cruzados.
- **Sitemap / robots:** sitemap por integración (filtro 404). `public/robots.txt` correcto (Allow /, Disallow /admin/ y /api/, apunta a sitemap-index).

## Sistema de diseño
- **Tokens:** **duplicados** entre `tailwind.config.cjs` y `global.css` (CSS-vars). Concepto "FORGE & PROTECT": navy `--forge-*` + naranja eléctrico `--ember-*` + amber `--gold-*`. Radios angulares (`--radius-card:0.25rem`), `--shadow-glow` (glow naranja), `--container-max:1600px`. Fuentes Rajdhani (display) + Sora (body). Dark theme por defecto.
- **UI base:** plugins typography + forms instalados (`prose` y forms funcionan). Clase global `btn-primary`. NO hay componentes atómicos en `ui/`.
- **Hero/cards/CTA/WhatsApp/breadcrumbs:** `HeroPro`, `CategoryCard`/`ProductCards`, `CTASection`, **`WhatsAppButton` flotante global**, breadcrumbs vía schema (no se confirmó componente visual de breadcrumb en common/). `marquee` animation (TrustStrip/marcas).

## Convenciones de nombres/archivos
- Componentes **PascalCase** agrupados por dominio (`common/`, `home/`, `products/`, `blog/`).
- Datos en `src/data/*.ts` con **interfaces TS exportadas** y JSDoc (patrón data-driven fuerte, ej. `Category`).
- Aliases TS (`@data/`, `@components/`, `@layouts/`).
- Contenido frontmatter **en inglés** (`title`, `description`) — coincide con FFCOMMX, diverge de FFMX/LGA (español).
- Páginas L3 con índice dedicado en subcarpeta (`productos/trajes-bombero/index.astro`) conviven con dinámica `[categoria]`.

## Flujos / procesos (implícitos)
- **Cotización:** `pages/cotizacion.astro` + `WhatsAppButton`/`whatsappUrl()` → `wa.me` con mensaje. Páginas de soporte comercial: `/licitaciones`, `/distribuidores`, `/certificaciones`, `/cobertura`.
- **Publicación blog:** MD/MDX → `getCollection('blog')` → BlogLayout.
- **Navegación catálogo:** `navigation.ts` (estructura de menú) + `categories.ts` (hubs) + filtrado de `featuredProducts` por `productCategory`.

## Integraciones
- **GitHub Actions:** ✅ `.github/workflows/deploy.yml` (GitHub Pages).
- **Cloudflare:** ⚠️ HUECO — sin `wrangler.toml`/`.wrangler/`. Deploy GitHub Pages.
- **n8n / fal.ai / Brevo:** ⚠️ HUECO — sin evidencia. Slot `analytics` en BaseLayout vacío (preparado, no conectado). Conversión = WhatsApp directo.
- **MDX:** ✅ `@astrojs/mdx` (permite componentes en contenido).

## Clasificación

### ✅ Funciona
- Arquitectura data-driven con interfaces TS ricas y autodocumentadas (`Category` con intro[], spotlight, icon SVG) — `src/data/categories.ts`; permite generar hubs sin tocar markup.
- Theme tactical dark coherente y diferenciado con doble sistema de tokens y `@tailwindcss/typography`+`forms` instalados (prose funciona) — `src/styles/global.css`, `tailwind.config.cjs`.
- Interlinking global vía `QuickLinksBar variant="footer"` montado en BaseLayout + related categorías top-5 — `src/layouts/BaseLayout.astro`, `productos/[categoria].astro`.
- robots.txt completo (Disallow /admin/ y /api/) + sitemap filtrado — `public/robots.txt`.

### ❌ Falla
- **Datos de contacto placeholder e inconsistentes:** teléfono `55 1234-5678` y `contactPoint` `+52-55-1234-5678` en TODAS las páginas (Organization schema), email `contacto@firefightersmx.com` ≠ dominio `firefighters.mx` — `src/data/site.ts` líneas 7–10, `src/components/common/SEO.astro` línea 38. Daña SEO local y confianza.
- Catálogo casi vacío: **2 productos** en colección y `ui/` sin componentes base → promesa "32 estados / portal líder" sin respaldo de contenido — `src/content/productos/`, `src/components/ui/`.
- Astro 4 (resto del cluster en 5/6) + tokens duplicados (config.cjs vs CSS-vars) → deuda de mantenimiento y divergencia de versión — `package.json`, `tailwind.config.cjs` + `global.css`.

### 🤖 Automatizable
- Poblado del catálogo: dado que categorías ya son objetos TS tipados y productos siguen schema Zod, se puede **automatizar la conversión de un feed de productos del cliente** a archivos de colección + entradas en `products.ts`.

### 📐 Estandarizable
- Las interfaces TS de datos (`Category`, products/brands/industries/services) son un patrón replicable, pero **deben unificarse con FFMX** (que usa `reference()`/`image()` en colecciones reales) para no mantener dos modelos de datos de catálogo distintos en el cluster.

## ⚠️ HUECOS
- **HUECO (contacto real):** falta el teléfono/email reales del negocio; los placeholders están publicados en schema global. Bloquea SEO local correcto.
- **HUECO (cuenta GitHub divergente):** repo bajo `Frankoropeza` y no `Origenlab` como los otros 4 → revisar gobernanza/propiedad del proyecto en el cluster.
- **HUECO (3 marcas "FIREFIGHTER"):** no hay documento que distinga firefighters.mx de firefighter.mx y firefighter.com.mx; tres dominios de marca casi idéntica compiten por las mismas keywords (canibalización SEO probable).
- **HUECO (BlogLayout):** no inspeccionado a fondo; no se confirmó schema `Article`/`BlogPosting` por post (solo `Organization` global + breadcrumbs en páginas dinámicas vistas).
- **HUECO (analytics):** slot `analytics` preparado en BaseLayout pero sin proveedor conectado.
- **Seguridad:** ✅ sin secretos expuestos. `.git/config` solo URL HTTPS pública; grep `gho_/ghp_/sk-/api_key/SECRET` en `src` → sin coincidencias (no hay `.env`/`wrangler.toml` en el proyecto).
