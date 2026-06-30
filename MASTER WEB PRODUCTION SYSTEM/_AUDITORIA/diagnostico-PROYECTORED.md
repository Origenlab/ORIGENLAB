# Diagnóstico — PROYECTORED
> Propósito: Catálogo técnico SEO de equipo contra incendios (proyectored.com.mx) — Astro estático, conversión vía WhatsApp, jerarquía L1→L4 + blog de 129 artículos.

## Identidad
- **Negocio / dominio:** Proyecto Red — venta de equipos contra incendios y seguridad industrial. Dominio `proyectored.com.mx` (`CNAME`; `src/config/site.ts:9`; `astro.config.mjs:56`).
- **Razón social comercial cruzada:** el email de contacto es `ventas@generalfiremexico.com` (`src/config/site.ts:60`) — marca comercial "Proyecto Red" pero correo de otra entidad ("General Fire México"). ⚠️ posible inconsistencia de identidad de marca.
- **Tipo de sitio:** catálogo técnico multinivel + blog, salida 100% estática, **cero JavaScript de hidratación** (solo JS vanilla del menú y un script de terceros TruConversion diferido — `src/layouts/Base.astro:115-133`). Conversión por WhatsApp (no e-commerce, no carrito, sin precios públicos salvo rangos en FAQ).
- **ARQUETIPO: A — Catálogo técnico.** Justificación con evidencia:
  - Jerarquía de catálogo L1→L4 con 8 categorías de producto cerradas y rutas dinámicas (`src/config/site.ts:140-149` `PRODUCT_CATEGORIES`; rutas `src/pages/extintores/[producto].astro`, `src/pages/extintores/[tipo]/[modelo].astro`).
  - Datos estructurados de producto: `@type: Product` por ficha (`src/pages/extintores/[producto].astro:60-69`), `OfferCatalog` global (`src/lib/seo.ts:68-81`).
  - Ausencia total de funciones de renta/eventos, reservas, o login — descarta B/C/D. El componente de "servicios" existe pero es soporte del catálogo (recarga, mantenimiento), no el eje del negocio (`src/config/site.ts:152-161`).
  - Contenido SEO masivo (129 artículos de blog) es soporte de captación, no un directorio/medio (descarta D).
- **Estado:** producción activa, maduro. Hay `dist/` construido, 233 rutas declaradas en auditoría previa (`docs/auditoria-tecnica-integral-2026-06.md`), redirects 301 de URLs legacy (`public/_redirects`), y deploy configurado. Documentación interna muy abundante (vault Obsidian + 8 .docx + docs/).

## Stack
- **Framework:** Astro `^6.1.1`, `output: 'static'` (`astro.config.mjs:55-57`; `package.json:17`).
- **Node:** `>=22.12.0` (`package.json:5-7`); GHA usa Node 22 (`.github/workflows/deploy.yml:27`).
- **Dependencias (4, mínimas):** `astro`, `@astrojs/sitemap ^3.7.2`, `@astrojs/check ^0.9.8`, `typescript ^5.9.3` (`package.json:14-19`). **Sin Tailwind, sin MDX, sin UI framework.**
- **CSS:** vanilla con CSS Custom Properties (variables). NO hay `public/css/` (verificado: no existe). Tokens en `src/styles/global.css` + bloque `<style is:global>` de `src/layouts/Base.astro`. Markdown puro para blog/productos (sin MDX).
- **TypeScript:** strict (`tsconfig.json:2` extiende `astro/tsconfigs/strict`).
- **Sitemap:** `@astrojs/sitemap` con `filter` (excluye `/404`, `/_`, `/admin`) y `serialize()` con prioridades por sección (home 1.0/weekly; L2 0.9/monthly; fichas L3/L4 0.8/monthly; blog 0.6/monthly; soporte 0.7/monthly). `lastmod` omitido intencionalmente con comentario que lo justifica (`astro.config.mjs:6-49`).
- **CDN de imágenes:** ExactDN / EWWW.io (`ewvydcs5uyw.exactdn.com`) — reescritura de rutas con WebP/AVIF y `?w=` responsive (`src/config/site.ts:18-54`; `src/components/ui/Img.astro`).
- **Tipografía:** Inter self-hosted woff2 variable (latin + latin-ext), preload + `font-display:swap` (`src/styles/global.css:4-19`; `src/layouts/Base.astro:104`).
- **Analítica/terceros:** TruConversion (heatmaps), único JS de terceros, diferido a `requestIdleCallback` tras `window.load` (`src/layouts/Base.astro:112-133`).

## Estructura de carpetas
```
src/
  config/site.ts          ← fuente de verdad: SITE, CONTACT, BRANCHES, WA_MESSAGES, PRODUCT_CATEGORIES, SERVICES, SECTORS, COVERAGE_STATES, QUICK_LINKS + waUrl()/cdnUrl()
  content.config.ts       ← colecciones Zod: blog, productos
  env.d.ts
  lib/seo.ts              ← JSON-LD: localBusinessLd, websiteLd, faqPageLd(), breadcrumbLd() + FAQS_GLOBALES (9 FAQs)
  layouts/                ← Base.astro (raíz), BaseLayout.astro (alias), CategoryLayout.astro (L2/L3/L4)
  pages/                  ← index + 8 categorías (index + [producto]) + extintores/[tipo]/[modelo] + servicios + empresas/[estado] + sectores/* + blog/[slug] + blog/[...page] + nosotros + contacto + productos + 404
  components/
    global/               ← TopBar, Header, Footer, WhatsAppButton
    ui/                   ← Breadcrumb, Img, SectionHeader, SectionHeaderDuo (+ COMPLEMENTOS.md)
    sections/             ← ~50 componentes de sección (Hero*, Catalogo*, Faq*, Normas*, Trust, Reviews, Cobertura, etc.)
    CtaBar.astro, FaqCotizacion.astro  ← en raíz de components/
  data/                   ← 14 archivos .ts de datos (catálogos por categoría, FAQs, normas, héroes, guías)
  styles/                 ← global.css, components.css, pages.css, product-page.css, faq-cotizacion-index.css, mobile.css
  content/
    blog/                 ← 129 .md
    productos/            ← 19 .md
public/                   ← _headers, _redirects, robots.txt, favicons, fonts/, imagenes/
scripts/                  ← 4 .mjs (sitemap legacy, procesamiento de imágenes, patch variantes)
docs/                     ← 8 .md (LAYOUT-SYSTEM, L3/L4 templates, auditorías)
ProyectoRed-Vault/        ← vault Obsidian propio (gestión + especificación de templates)
graphify-out/             ← grafo de conocimiento auto-generado (gitignored)
```
- ⚠️ HUECO: existe `src/content/productos/` (19 .md) con colección `productos` definida en Zod (`src/content.config.ts:23-32`), pero NO encontré página que consuma `getCollection('productos')` — las páginas de producto consumen archivos `src/data/*.ts`, no la colección. La colección `productos` parece huérfana o legacy (ver Content Collections).

## Layouts — jerarquía
| Layout | Archivo | Rol | Usado por |
|---|---|---|---|
| **Base** | `src/layouts/Base.astro` | Shell raíz: `<head>` completo (meta, canonical, hreflang es-MX/x-default, OG, Twitter, favicons, preconnect CDN, preload font), JSON-LD LocalBusiness global, slot `head`, TopBar+Header+Footer+WhatsAppButton, tokens en `<style is:global>` | index, blog/*, extintores/[tipo]/[modelo], (vía BaseLayout) todo |
| **BaseLayout** | `src/layouts/BaseLayout.astro` | Alias semántico de Base; añade sufijo `\| Proyecto Red` al title si falta (`:29`) | 404, CategoryLayout |
| **CategoryLayout** | `src/layouts/CategoryLayout.astro` | L2/L3/L4: Breadcrumb → Hero → CtaBar → slot → FaqCotizacionIndex → CTAFinal. Emite JSON-LD BreadcrumbList (`:82-91`) + FAQPage condicional (`:97-110`) | categorías index, [producto], servicios/[servicio], empresas/[estado], sectores/* |
- **Jerarquía de niveles documentada** (`docs/LAYOUT-SYSTEM.md`; `ProyectoRed-Vault/05 - Desarrollo/Sistema de Layouts (L1-L5)` referido): L1=home, L2=catálogo de dominio (productos, servicios), L3=categoría individual (extintores/index), L4=tipo de producto ([producto]), L5=ficha individual ([tipo]/[modelo]).
- ⚠️ Inconsistencia arquitectónica: las fichas de extintor más profundas (`[tipo]/[modelo].astro`) usan **Base directamente** con HTML + `<style is:global>` inline de 119 líneas (`src/pages/extintores/[tipo]/[modelo].astro:175-293`), mientras el resto del catálogo usa **CategoryLayout** componentizado. Dos patrones de página de producto conviviendo (legacy verbatim vs. moderno por datos).

## Componentes — inventario
| Componente | Archivo | Tipo | Notas (evidencia) |
|---|---|---|---|
| TopBar | `components/global/TopBar.astro` | global | Barra roja: tagline + horario + tel + WhatsApp, desde `CONTACT`/`SITE` (`:4`) |
| Header | `components/global/Header.astro` | global | Mega-menú con JS (dropdowns por timer), subcategorías hardcodeadas `MEGA_SUBCATEGORIES` (`:8-57`); logo vía ExactDN hardcodeado (`:66`) |
| Footer | `components/global/Footer.astro` | global | Datos desde `config/site` (BRANCHES, categorías, servicios, sectores, cobertura); `CERTIFICATIONS` hardcodeadas (`:11-20`) |
| WhatsAppButton | `components/global/WhatsAppButton.astro` | global/CTA | Botón flotante fijo; usa `waUrl(WA_MESSAGES.default)` (`:3,7`); tokens modernos `--sp-*`/`--color-white`/`--radius-full` |
| CtaBar | `components/CtaBar.astro` | CTA | Barra de 4 accesos rápidos; **items hardcodeados** (no usa `QUICK_LINKS` de config — duplicación, `:1-37`) |
| Breadcrumb | `components/ui/Breadcrumb.astro` | navegación | Microdata schema.org BreadcrumbList/ListItem inline (`:20-44`); componente único del sitio |
| Hero | `components/sections/Hero.astro` | hero | Hero genérico de L2/L3/L4 (badge, title, accent, subtitle, descRight, cta1/cta2) — consumido por CategoryLayout (`:127-135`) |
| Img | `components/ui/Img.astro` | media | `<picture>` AVIF + srcset CDN responsive; dev vs prod (`:46-70`) |
| SectionHeaderDuo | `components/ui/SectionHeaderDuo.astro` | UI | Encabezado de sección "duo" (eyebrow + 2 líneas + desc + body) — patrón aprobado, muy usado |
| FaqCotizacion | `components/FaqCotizacion.astro` | FAQ/form | FAQ + CTA cotización para fichas L5/blog (`pageId`, `faqs`, `bgGray`) |
| FaqCotizacionIndex | `components/sections/FaqCotizacionIndex.astro` | FAQ/form | FAQ usada por CategoryLayout y home; recibe `faqs` (`CategoryLayout:144`) |
| ReviewsIndex | `components/sections/ReviewsIndex.astro` | social proof | Reseñas con microdata `schema.org/Review` (`:88,108`) pero **sin AggregateRating ni vínculo al LocalBusiness** — reseñas hardcodeadas de 4+ empresas |
| TrustIndex / NormasCategoria / Cobertura* / Proceso* | `components/sections/*` | secciones | ~50 secciones; familias: Hero*, Catalogo*(por categoría), Faq*, Normas*, Cobertura*, Catalogo* |
- Catálogos por categoría como componentes dedicados: `CatalogoExtintores`, `CatalogoBomberos`, `CatalogoSenalamientos`, `CatalogoGabinetes`, `CatalogoMangueras`, `CatalogoSistemas`, `CatalogoPrimerosAuxilios`, `CatalogoEquipoSeguridad`, `CatalogoServicios`, `CatalogoEmpresas`, `CatalogoProductos` (`src/components/sections/`).
- Doc de complementos UI: `src/components/ui/COMPLEMENTOS.md`.

## Content Collections / esquemas / taxonomías
- **`content.config.ts`** define 2 colecciones con loader `glob` (Astro 5/6 Content Layer):
  - **`blog`** (`src/content.config.ts:4-21`): `title`, `description`, `pubDate` (coerce date), `updatedDate?`, `slug?`, `category` (string libre, **no enum**), `image?`, `author` (default 'Proyecto Red'), `tags[]`, `draft` (default false), `noindex` (default false). 129 .md en `src/content/blog/`.
  - **`productos`** (`:23-32`): `title`, `description`, `category`, `precio?`, `slug?`. 19 .md en `src/content/productos/`.
- **Taxonomía de catálogo (cerrada, en TS no en colección):** 8 categorías L2/L3 en `PRODUCT_CATEGORIES` (`src/config/site.ts:140-149`), 8 servicios en `SERVICES` (`:152-161`), 10 sectores en `SECTORS` (`:164-175`), 6 estados de cobertura en `COVERAGE_STATES` (`:178-185`). Subcategorías L4 hardcodeadas en `Header.astro:8-57` y por categoría en `src/data/*.ts`.
- **Datos de catálogo:** `src/data/` (14 archivos, ~7.300 líneas): `categorias.ts` (520, datos L3), `extintores-productos.ts` (1377, L4 tipos), `extintores-fichas.ts` (3458, 19 fichas L5 verbatim con clave `tipo/modelo`), `bomberos-productos.ts` (957), `normas-categorias.ts` (374), `faqs-categorias.ts` (570), + mangueras/sistemas/gabinetes/senalamientos/primeros-auxilios/equipo-seguridad/servicios/heroes-categorias/guias-categorias.
- ⚠️ HUECO: el blog `category` es string libre sin validación enum (`src/content.config.ts:13`) — las categorías se derivan dinámicamente de los posts (`blog/[...page].astro:25`), riesgo de inconsistencia tipográfica entre artículos.
- ⚠️ HUECO: colección `productos` (Zod) parece desconectada del render — no hallé `getCollection('productos')`; las páginas de producto leen `src/data/*.ts`. Confirmar si los 19 .md de `content/productos/` están en uso o son legacy.

## SEO real
- **Metas (Base.astro `<head>`):** title, description, canonical (auto desde pathname o prop), robots (`index,follow,max-image-preview:large,...` o `noindex,nofollow` si `noindex`), hreflang `es-mx` + `x-default`, OG completo (title/description/url/type/site_name/locale/image), Twitter `summary_large_image`, `color-scheme: light only` (`src/layouts/Base.astro:54-97`). OG image por defecto `/imagenes/og/proyectored-og.jpg` (`:49`).
- **JSON-LD por tipo y ruta (verificado):**
  - `LocalBusiness` (con `additionalType` Wikidata fire-safety, geo, openingHours, areaServed de 6 estados, `hasOfferCatalog` de 8 productos, sameAs FB/IG) — **global, todas las páginas** (`src/lib/seo.ts:19-86`; emitido en `Base.astro:107`).
  - `WebSite` (con SearchAction a `/blog/?q=`) — **solo home** (`src/lib/seo.ts:92-108`; `index.astro:50`).
  - `FAQPage` — home (9 FAQs globales, `index.astro:49`) y L2/L3/L4 condicional (`CategoryLayout.astro:97-110`). Texto del schema se limpia de HTML para coincidir con contenido visible (`seo.ts:170-171`; `CategoryLayout:96`).
  - `BreadcrumbList` — global vía microdata (`Breadcrumb.astro`) + JSON-LD explícito en CategoryLayout (`:82`), blog (`blog/[slug].astro:52`), servicios (`servicios/[servicio].astro:34`).
  - `Article` — blog post, con datePublished/dateModified, author Organization, publisher (`blog/[slug].astro:65-87`).
  - `Product` — ficha L4 extintores: name/description/sku/brand/url/image (`extintores/[producto].astro:60-69`).
  - `Service` — servicios individuales (`servicios/[servicio].astro:46+`).
- **Canonical:** auto-generado por pathname salvo override; blog usa `pageUrl` explícito (`Base.astro:46`; `blog/[slug].astro:99`).
- **robots.txt** (`public/robots.txt`): `Allow: /`, `Disallow: /404` y `/_astro/`, declara `Sitemap: .../sitemap-index.xml`.
- **_headers** (`public/_headers`, Cloudflare): X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, HSTS 1 año, Permissions-Policy restrictiva, **CSP en Report-Only** (permite truconversion + exactdn + unsafe-inline); cache immutable para `/_astro/` y `/fonts/`, 7 días para `/imagenes/`.
- **_redirects** (`public/_redirects`): ~32 redirects 301 de URLs legacy → nueva estructura (extintores, categorías, y slugs de blog con ñ→n percent-encoded).
- **Internal linking:** breadcrumbs L1→L2→L3→L4 consistentes (ej. `extintores/[producto].astro:82-87`); `related` (otros productos de la categoría, `:41`); blog relacionados por categoría con fallback a recientes (`blog/[slug].astro:33-46`); BlogSidebar de interlinking.
- **Consistencia de WhatsApp:** 81 usos de `waUrl()` centralizado vs. 3 `wa.me/525627596245` hardcodeados (`blog/[...page].astro` y `extintores/[tipo]/[modelo].astro`) — alta consistencia, 3 excepciones menores.
- ⚠️ HUECO/oportunidad: ReviewsIndex declara microdata `schema.org/Review` (`:88`) pero **no hay AggregateRating ni los reviews cuelgan del LocalBusiness** → Google no mostrará estrellas en resultados. Reseñas como entidades sueltas sin entidad padre.
- ⚠️ HUECO: `Product` JSON-LD sin `offers`/`Offer` (sin precio, sin `availability`, sin `priceCurrency`) — el `OfferCatalog` global tiene Products sin precio. Coherente con modelo "cotiza por WhatsApp", pero limita rich results de producto.
- ⚠️ HUECO: sin `sitemap.xml` físico en `public/` — se genera en build por `@astrojs/sitemap` (correcto); `scripts/generate-sitemap.mjs` es un generador legacy probablemente obsoleto.

## Sistema de diseño
- **Doble sistema de tokens (coexisten, dos convenciones de nombre):**
  1. **Moderno/semántico** en `src/styles/global.css:34-163`: `--color-red/-dark/-light/-faint`, escala neutra `--color-gray-*`, semánticos (`--bg-hero`, `--text-muted`, `--border`), escala fluida de texto `--text-xs…--text-5xl` (clamp), pesos, interlineado, grid de espaciado 8px `--sp-1…--sp-32`, `--radius-*`, `--shadow-*`, `--transition`, tokens WhatsApp.
  2. **Legacy `--c-*`** definido DOS veces: en `global.css:145-156` Y en `src/layouts/Base.astro:157-187` (`<style is:global>`): `--c-primary #C41E24`, `--c-primary-dark #A01820`, `--c-primary-light #F9E8E8`, `--c-primary-rgb`, `--c-ink`, `--c-muted`, `--c-surface`, `--c-border`, sombras tintadas, `--max-w 1760px`, `--container-px clamp(...)`, alturas de stack.
- **Paleta:** rojo primario `#C41E24` (marca incendios), negros/grises Zinc, superficie `#F4F4F5`. `color-scheme: light only` (sin dark mode, `Base.astro:56`).
- **Tipografía:** Inter (variable 100-900) self-hosted; `--font-sans` y `--font-display` ambos Inter (`global.css:67-68`).
- **Layout fluido:** ancho máx 1760px, padding lateral en vw, `--section-py` responsive por breakpoint (`Base.astro:177-252`).
- **Patrones UI (cruzado con `LAYOUT-PRODUCTO.md`):**
  - **Hero dark gradient** (`linear-gradient(160deg,#0E0E0E…)` con glow radial rojo) — `blog/[...page].astro:296-310`; patrón uniforme.
  - **Cards:** `.ccard` (catálogo, con header img + overlay + badge + CTA), `.prod-card` (blog), `.pp-otros__card` (otros productos). Card CTA-WhatsApp recurrente (`extintores/[producto].astro:174-190`).
  - **CTA:** botones globales `.btn-primary/.btn-secondary/.btn-outline` con focus-visible accesible (`Base.astro:262-324`); CtaBar (4 accesos), CTAFinal (cierre rojo), inline-cta por sección.
  - **WhatsApp:** botón flotante verde `#25D366` fijo (`WhatsAppButton.astro`); mensajes segmentados por intención en `WA_MESSAGES` (`site.ts:100-132`).
  - **Breadcrumbs:** barra entre header y hero, 4 niveles en producto, variante clara/oscura.
- **`LAYOUT-PRODUCTO.md`** (raíz, ref `pqs-1-kg.astro`): especifica la página de producto en **8 secciones** (Hero → CtaBar → Métricas → Layout 2-col main+sidebar de 8 widgets sticky → Otros productos grid de 4 → Cotización fondo oscuro → FAQs → Footer); breadcrumbs siempre 4 niveles; describe el patrón que hoy implementa `extintores/[tipo]/[modelo].astro`.
- ⚠️ HUECO/deuda: **dos archivos como fuente de verdad de tokens** (`global.css` y bloque is:global de `Base.astro`) con `--c-primary` duplicado — riesgo de divergencia. El propio vault lo reconoce ("`global.css`: Legacy / parcial. Ya no agregar aquí" — `ProyectoRed-Vault/02 - Clientes y Proyectos/Sitio Web — Sistema de Títulos y CSS.md`).
- ⚠️ Deuda: muchos componentes/fichas usan colores hex hardcodeados en CSS scoped en vez de tokens (ej. `extintores/[tipo]/[modelo].astro:176-293`: `#111`, `#444`, `#888`…).

## Convenciones
- **Single Source of Truth:** `src/config/site.ts` para todo dato repetido (contacto, sucursales, categorías, servicios, mensajes WA) y `src/lib/seo.ts` para JSON-LD — documentado como "Rationale Single Source of Truth" en el grafo.
- **Idioma/locale:** español de México, `lang="es-MX"`, `locale es_MX` (`Base.astro:52`; `site.ts:11`).
- **Regla de layout de página:** orden fijo `breadcrumb-bar → Hero → CtaBar → resto de secciones`; nada entre Hero y CtaBar (comentado en `Base.astro:140-145` y `CategoryLayout`).
- **Regla de CSS (crítica del proyecto):** "Todo el CSS de componentes va en `Base.astro <style is:global>`; nunca `<style>` scoped en componentes" por un bug de caché Vite en dev (`ProyectoRed-Vault/02 - .../Sistema de Títulos y CSS.md`; "Rationale CSS Global en Base.astro"). En la práctica conviven `global.css` + `pages.css` (3134 líneas) + scoped en algunas páginas — convención parcialmente seguida.
- **Zero-JS por defecto:** "Rationale Zero JavaScript by Default" (grafo); excepciones: menú Header (vanilla) y TruConversion (diferido).
- **Naming:** rutas en kebab-case español; slugs de blog migrados de ñ→n con redirects 301 (`_redirects:26-33`).
- **Datos verbatim:** las 19 fichas L5 se extrajeron mecánicamente a `extintores-fichas.ts` "extracción verbatim" conservando HTML inline (`extintores-fichas.ts:1-4`).
- **CLAUDE.md:** solo contiene instrucciones de graphify (leer `graphify-out/GRAPH_REPORT.md`, navegar wiki, reconstruir grafo tras editar) — NO contiene reglas de negocio/arquitectura (`CLAUDE.md:1-9`). ⚠️ HUECO: CLAUDE.md no documenta convenciones del proyecto; el conocimiento vive en el vault y docs/.

## Flujos / procesos
- **Build:** `npm run build` (astro build) → `dist/` estático (`package.json:10`).
- **CI (GitHub Actions):** `.github/workflows/deploy.yml` en push a `main`: checkout → Node 22 → **valida que no haya deps de plataforma rollup/esbuild** (`:29-45`) → `npm ci` → `npx astro check` (type check) → `npm run build` → upload artifact → **deploy a GitHub Pages** (`actions/deploy-pages@v4`).
- **Deploy manual (Cloudflare):** `npm run build && npx wrangler pages deploy dist` (`DEPLOY.md:24-32`; `wrangler.toml:3`).
- ⚠️ **CONFLICTO DE DEPLOY (importante):** el workflow activo despliega a **GitHub Pages** (`.github/workflows/deploy.yml:1,67-76`), pero `wrangler.toml` + `DEPLOY.md` + `_headers`/`_redirects` (formato Cloudflare Pages) configuran **Cloudflare Pages**. Dos destinos de hosting. `DEPLOY.md:40-77` ofrece un workflow alternativo de Cloudflare que NO es el que está en `.github/workflows/`. Los `_headers`/`_redirects` solo funcionan en Cloudflare Pages — en GitHub Pages serían ignorados. Resolver cuál es el canal real de producción.
- **Scripts de imágenes:** `scripts/process-extintores-images.mjs`, `process-variantes-images.mjs`, `patch-variantes-img.mjs` (procesamiento/optimización de imágenes de catálogo); `generate-sitemap.mjs` (legacy, sitemap ahora vía integración).
- **Optimización de imágenes en runtime:** ExactDN convierte/redimensiona en el edge; `Img.astro` genera `<picture>` AVIF + srcset por ancho.

## Integraciones
| Integración | Estado | Evidencia |
|---|---|---|
| **Cloudflare Pages** | Configurado (hosting alternativo) | `wrangler.toml` (name=proyectored, pages_build_output_dir=dist, env.production/preview vars ENVIRONMENT); `DEPLOY.md`; `_headers`/`_redirects` formato CF |
| **GitHub Pages** | Configurado (workflow activo) | `.github/workflows/deploy.yml:1,67-76` (actions/deploy-pages) — **es el deploy que corre en push** |
| **GitHub Actions** | Activo | `.github/workflows/deploy.yml` (validación + check + build + deploy) |
| **ExactDN / EWWW.io (CDN imágenes)** | Activo en prod | `src/config/site.ts:18-22`; `Img.astro`; preconnect `Base.astro:100`; logo servido desde el host |
| **TruConversion (heatmaps)** | Activo | `Base.astro:115-133` (id 62910/efa5e), diferido a idle |
| **@astrojs/sitemap** | Activo | `astro.config.mjs:59` |
| **n8n** | ⚠️ HUECO: no encontrado | sin referencias en `src`, `scripts`, config |
| **fal.ai** | ⚠️ HUECO: no encontrado | sin referencias |
| **Brevo (email)** | ⚠️ HUECO: no encontrado | sin referencias; no hay formulario backend — toda conversión es WhatsApp/tel/email mailto |
| **Formulario de contacto backend** | ⚠️ HUECO: no existe | "FaqCotizacion"/"cotización" son CTAs a WhatsApp, no envían a servidor (sitio estático) |
- Redes sociales declaradas en `sameAs`: facebook.com/proyectored, instagram.com/proyectored (`seo.ts:82-85`) — ⚠️ verificar que existan (posible placeholder).

## Documentación previa
- **VAULT PROPIO — `ProyectoRed-Vault/`** (Obsidian, creado 2026-04-02): base de conocimiento de gestión + especificación técnica. Cubre:
  - `01 - Empresa/`: Descripción General, Catálogo de Productos, **Estudio Técnico — Arquitectura Astro** (análisis del sitio, patrón L2), Sitio Web — Análisis, Arquitectura — Archivos Generados.
  - `02 - Clientes y Proyectos/`: Directorio de Clientes, Proyectos Activos, **Sitio Web — Sistema de Títulos y CSS** (regla de oro CSS, dos sistemas de tokens).
  - `03 - Normas y Certificaciones/`: Normas Aplicables (NOM/NFPA).
  - `04 - Tareas/`: Pendientes.
  - `05 - Desarrollo/` (el más reutilizable como SOP/plantilla): **L2 — Template Autorizado** (orquestador limpio <170 líneas), **L4 — Template Universal (Reglas y Checklist)** (regla crítica de variantes), 8 fichas "L2 — <categoría> (Aprobada)", Sistema de Layouts (L1-L5), "Regla — Solo botones con animación".
  - `06 - Blog/`: Tracker de estado de artículos (✅/🔶/❌), Template — Componentes HTML, Criterios de Evolución SEO y Marketing.
  - `🏠 Inicio.md`: índice navegable del vault.
- **`docs/`** (8 .md): `LAYOUT-SYSTEM.md`, `L3-TEMPLATE.md`, `L4-UNIVERSAL-TEMPLATE.md`, `L4-BOMBEROS-TEMPLATE.md`, `BLOG-AUDITORIA-MEJORAS.md`, `auditoria-tecnica-integral-2026-06.md` (auditoría profunda de 233 rutas), `PROMPT-IMAGEFX-SERVICIOS.md`.
- **`.md` sueltos en raíz:** `CLAUDE.md` (solo graphify), `DEPLOY.md`, `LAYOUT-PRODUCTO.md` (patrón de página de producto), `prompt-gemini-extintores.md`, `README.md` (sin tocar, plantilla minimal de Astro).
- **`.docx` de auditoría en raíz (8, NO leídos — documentación previa existente):**
  1. `Reporte — Análisis Nivel 3.docx`
  2. `Reporte-Analisis-Nivel3.docx` (duplicado renombrado)
  3. `SEO_Equipos_Contra_Incendios_ProyectoRed.docx`
  4. `analisis-extintores-pqs-2026.docx`
  5. `auditoria-L2-proyectored.docx`
  6. `auditoria-integral-proyectored.docx`
  7. `auditoria-paginas-producto.docx`
  8. `auditoria-seo-productos-l2-l3-l4.docx`
- **`graphify-out/`** (gitignored): grafo de conocimiento con ~200 notas Obsidian auto-generadas + conversión de los .docx a .md + `GRAPH_REPORT.md`. Reutilizable como base semántica.
- **Volumen total de documentación de auditoría:** 8 .docx + 8 docs/.md + ~20 notas de vault + grafo completo = corpus muy denso de auditoría/especificación previa.

## Clasificación

### ✅ (lo que está bien hecho — reutilizable)
- ✅ Single Source of Truth robusto: `src/config/site.ts` centraliza contacto, sucursales, taxonomías y 30+ mensajes WhatsApp segmentados por intención (`src/config/site.ts:6-193`).
- ✅ SEO técnico maduro y centralizado: JSON-LD tipado (LocalBusiness/WebSite/FAQPage/BreadcrumbList/Article/Product/Service) con limpieza HTML para coincidir contenido visible↔schema (`src/lib/seo.ts:1-205`; `CategoryLayout.astro:93-110`).
- ✅ Layout raíz completo y accesible: head exhaustivo, hreflang, skip-link, focus-visible, viewport, `noindex` propagado (`src/layouts/Base.astro:51-150,312-337`).
- ✅ Arquitectura "orquestador limpio" en L1/L2/L3/L4: páginas delgadas que importan secciones + datos (`src/pages/index.astro:54-67`; especificado en vault `L2 — Template Autorizado`).
- ✅ Imágenes optimizadas: `<picture>` AVIF + srcset responsive + CDN edge + lazy/eager por posición (`src/components/ui/Img.astro:46-104`).
- ✅ Migración SEO cuidada: 32 redirects 301 de URLs legacy y slugs ñ→n (`public/_redirects`).
- ✅ Cero-JS de hidratación + único terceros (TruConversion) diferido a idle (`src/layouts/Base.astro:112-133`).

### ❌ (problemas / deuda técnica — a corregir)
- ❌ **Conflicto de hosting:** workflow despliega a GitHub Pages (`.github/workflows/deploy.yml:1,67-76`) pero la config (`wrangler.toml`, `_headers`, `_redirects`, `DEPLOY.md`) es de Cloudflare Pages → los `_headers`/`_redirects` se ignoran si el canal real es GitHub Pages. Hosting ambiguo.
- ❌ **Doble fuente de verdad de tokens CSS:** `--c-primary` (y familia) definido en `src/styles/global.css:145-156` Y en `src/layouts/Base.astro:157-187` — riesgo de divergencia; el propio vault marca global.css como "legacy, no agregar aquí".
- ❌ **Reseñas sin AggregateRating ni entidad padre:** `ReviewsIndex.astro:88` usa microdata Review pero no cuelga del LocalBusiness ni emite AggregateRating → no genera estrellas en SERP (oportunidad SEO perdida).
- ❌ **Colección `productos` (Zod) huérfana:** definida en `src/content.config.ts:23-32` con 19 .md, pero el render usa `src/data/*.ts`; sin `getCollection('productos')` localizado.
- ❌ **CtaBar duplica datos:** items hardcodeados en `components/CtaBar.astro:1-37` en vez de consumir `QUICK_LINKS` de `site.ts:188-193`.
- ❌ **README.md sin actualizar:** sigue siendo la plantilla "Astro Starter Kit: Minimal" (`README.md:1-7`).

### 🤖 (oportunidades de automatización / IA)
- 🤖 Generación de fichas de producto L4/L5 desde plantilla + datos (el vault ya define checklist de variantes y template universal — `docs/L4-UNIVERSAL-TEMPLATE.md`; `ProyectoRed-Vault/05 - Desarrollo/L4 — Template Universal`); ideal para script que valide `variantes.length >= 4` y rellene datos faltantes (problema documentado: "variantes vacías → S0 no aparece").
- 🤖 Pipeline de imágenes ya semi-automatizado (`scripts/process-*-images.mjs`) — extensible a generación AI (ImageFX/fal.ai) dado que existe `docs/PROMPT-IMAGEFX-SERVICIOS.md` y `prompt-gemini-extintores.md` (prompts de generación ya escritos).
- 🤖 Blog: 129 artículos con tracker de calidad (✅/🔶/❌) en el vault → automatizar homologación al template HTML aprobado y verificación de `category` consistente.

### 📐 (patrones / plantillas formalizables como SOP)
- 📐 **Sistema de niveles L1-L5** completamente especificado y reutilizable: orquestador limpio (L1), catálogo de dominio (L2), categoría (L3), tipo de producto (L4), ficha (L5) — `docs/LAYOUT-SYSTEM.md` + `docs/L3-TEMPLATE.md` + `docs/L4-UNIVERSAL-TEMPLATE.md` + `LAYOUT-PRODUCTO.md` + `ProyectoRed-Vault/05 - Desarrollo/L2 — Template Autorizado.md`. Es el patrón canónico más completo de los proyectos auditados.
- 📐 Patrón JSON-LD centralizado en `lib/seo.ts` (LocalBusiness + helpers `faqPageLd`/`breadcrumbLd`) — plantilla directa para otros sitios de catálogo local.
- 📐 Patrón `config/site.ts` como SSoT (contacto + taxonomías cerradas + mensajes WhatsApp por intención + `waUrl()`/`cdnUrl()`) — plantilla replicable.

## ⚠️ HUECOS
- ⚠️ HUECO: **Inconsistencia de marca** — dominio/marca "Proyecto Red" pero email `ventas@generalfiremexico.com` (`src/config/site.ts:60`). No está claro si es la misma empresa o un correo prestado. Verificar.
- ⚠️ HUECO: **Hosting de producción no determinado** — coexisten GitHub Pages (workflow) y Cloudflare Pages (wrangler/_headers/_redirects). No hay evidencia en repo de cuál sirve `proyectored.com.mx` hoy.
- ⚠️ HUECO: **Colección `productos`** — confirmar si los 19 .md de `src/content/productos/` están en uso o son legacy (no se hallaron consumidores).
- ⚠️ HUECO: **`category` de blog sin enum** (`src/content.config.ts:13`) — no hay taxonomía cerrada validada; las categorías se infieren de los posts en runtime.
- ⚠️ HUECO: **n8n / fal.ai / Brevo NO presentes** — ninguna referencia en código; el sitio no tiene backend de formularios (toda conversión es WhatsApp/tel/mailto). Si se esperaban estas integraciones, no están implementadas.
- ⚠️ HUECO: **`sameAs` redes sociales** (`seo.ts:82-85`) podrían ser URLs placeholder — no verificables desde el repo.
- ⚠️ HUECO: **CLAUDE.md** no documenta arquitectura/convenciones (solo graphify) — el conocimiento operativo está disperso en vault + docs/, no en el archivo que un agente leería primero.

## 🔒 SEGURIDAD
- ✅ **Sin secretos expuestos.** `grep -rniE` de patrones de token (gho_/ghp_/sk-/api_key/secret/bearer/xoxb-/AKIA/BEGIN PRIVATE KEY) sobre `src`, `public`, `scripts`, `astro.config.mjs`, `wrangler.toml`, `package.json`, `.github` → **0 coincidencias reales**. Las únicas coincidencias son falsos positivos legítimos: "Secretaría del Trabajo/Salud/Educación" (copy en español) y "STPS" en artículos de blog/datos, y el comentario `# Variables de entorno por entorno (sin secrets)` en `wrangler.toml:10`.
- ✅ `wrangler.toml` solo define `vars = { ENVIRONMENT = ... }` (no secrets) (`wrangler.toml:11-15`).
- ✅ Secrets de CI referenciados correctamente como `${{ secrets.CLOUDFLARE_API_TOKEN }}` en `DEPLOY.md` (documentación, no valores reales).
- ✅ `.gitignore` excluye `.env`, `.env.production` (`.gitignore:16-18`).
- ✅ Cabeceras de seguridad presentes (`_headers`): HSTS, X-Frame-Options DENY, nosniff, CSP (Report-Only — aún no enforce).
- ⚠️ Observación (no crítico): CSP en `Content-Security-Policy-Report-Only` — pendiente de promover a enforce; permite `'unsafe-inline'` en script/style (necesario por JSON-LD inline y estilos). Solo efectivo en Cloudflare Pages.
