# Diagnóstico — BRINCOLINS
> Propósito: Sitio estático Astro (~112 páginas) de renta de inflables para fiestas infantiles en CDMX y Estado de México, con fuerte SEO local (35 páginas de cobertura por alcaldía + directorio de 17 salones) y blog en Markdown; gemelo cercano de INFLAPY (mismo WhatsApp, mismo catálogo de 8 inflables).

## Identidad
- **Negocio/dominio:** BRINCOLINS · `https://brincolins.com` (`astro.config.mjs:5`, `CNAME`). Renta de inflables/brincolines para fiestas infantiles, CDMX + Edomex, "+20 años" (`AGENTS.md`; `src/layouts/PageLayout.astro` FAQ). Tel/WhatsApp `5531281706` (display `55 3128 1706`), email `info@brincolins.com` (`BaseLayout.astro:42-43`, `AGENTS.md`).
- **Tipo de sitio:** Catálogo de renta + SEO local hiperextendido + directorio de salones de terceros + blog. Multipágina estática. Conversión a WhatsApp y `/cotizar/` (sin carrito/backend). Evidencia: `PageLayout.astro` (FAQ + `WaBubble` universal), `BaseLayout.astro:117` (sticky CTA móvil a `wa.me/5531281706`).
- **ARQUETIPO: B — renta/eventos** (con fuerte componente C de SEO local multi-zona y módulo D de directorio). Justificación: modelo de renta por evento con 8 fichas de inflable (`src/pages/inflables/*.astro`), paquetes (`servicios/paquetes-de-fiesta.astro`), schema `Product`+`Offer`+`LocalBusiness`+`EventVenue` (`BaseLayout.astro:165-237`); **35 páginas de cobertura por alcaldía** (`src/pages/cobertura/*/index.astro`) con colonias/FAQ locales = capa C; **directorio de 17 salones** CDMX/Edomex (`src/pages/directorio/cdmx/*.astro`) = módulo D de captación. El núcleo es renta (B); cobertura y directorio son satélites SEO.
- **Estado:** En producción y activo, **recién refactorizado** (jun-2026). `INFORME-MEJORAS-2026.md` documenta: build verde con **112 páginas**, 0 imágenes/enlaces rotos, **609 bloques JSON-LD válidos**, blog migrado de 37 `.astro` duplicados a sistema único Markdown. ⚠️ El informe dice "no se publicó a GitHub (pendiente de tu revisión)" — los cambios están en local, no confirmé que estén desplegados.

## Stack
- **Astro `^6.0.1`** (`package.json:14`; `AGENTS.md`/`README.md` confirman "Astro 6"). Output estático por defecto (SSG; sin `output` declarado).
- **Integrations:** solo `@astrojs/sitemap ^3.7.1` (`astro.config.mjs:11-46`) con `serialize` que asigna prioridades por tipo de URL (home 1.0/daily, `/inflables/` 0.9, `/cobertura/` 0.85, servicios/contacto/cotizar 0.8, `/blog/` 0.7) y excluye `/cdn-cgi/`. Dependencia runtime extra: `gray-matter ^4.0.3` (parseo de `header.md`/`topbar.md` en `Header.astro`).
- **CSS:** **NO Tailwind.** CSS propio: `src/styles/global.css` (2,577 l., `:root` con todos los tokens) + `mobile.css` (420 l.). CSS scoped por componente (`AGENTS.md` regla 8). Critical CSS inline en `BaseLayout.astro:153-164`.
- **TypeScript** (`tsconfig.json`, alias `@` → `/src` vía `vite.resolve.alias` en `astro.config.mjs:6-12`).
- **Adapter:** ninguno (SSG puro). Node `>=22.12.0` (`package.json:6`).
- **Deploy:** **GitHub Pages** vía `.github/workflows/deploy.yml` (Node 22, `npm ci` + `astro build` + `upload-pages-artifact` + `deploy-pages`, branch `main`).

## Estructura de carpetas
```
BRINCOLINS/
├── astro.config.mjs · tsconfig.json · package.json · CNAME · AGENTS.md
├── README.md · INFORME-MEJORAS-2026.md · SEO-Auditoria-BRINCOLINS-2026.docx · seo-meta-optimizer.skill
├── .github/workflows/deploy.yml        ← CI GitHub Pages
├── src/
│   ├── data/     header.md · topbar.md     (nav data-driven, frontmatter YAML)
│   ├── content.config.ts                   ← colección blog (Zod, glob loader)
│   ├── content/blog/ (52 .md)
│   ├── layouts/  BaseLayout.astro · PageLayout.astro   (2 layouts)
│   ├── components/ (26 .astro)
│   ├── pages/    ~77 .astro: index, inflables/ (8 fichas + 2 index), servicios/ (6), cobertura/ (35 alcaldías), directorio/cdmx/ (17 salones) + edomex/index, blog/[slug]+index, contacto/cotizar/nosotros/precios
│   └── styles/   global.css · mobile.css
├── public/  img/ (AVIF) · robots.txt · favicon
├── articulos/    ← 5 .md sueltos (artículos fuera de la colección)
├── batch-whisk.sh · .astro/
```
⚠️ No hay obsidian-vault. La documentación es `README.md` + `AGENTS.md` + `INFORME-MEJORAS-2026.md` + un .docx de auditoría SEO + `articulos/` (5 .md sueltos fuera de `src/content/`).

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | **Ninguna** — raíz (HTML completo) | `title*`, `description*`, `canonical?`, `ogImage?`, `pageType?` (home/product/category/page), `breadcrumbs?`, `faqItems?`, `product?` (ProductSeo), `schemaMarkup?` | Base de TODO. `<head>` SEO completo + critical CSS inline + **6 JSON-LD**: Organization, LocalBusiness+EventVenue, WebSite, BreadcrumbList (**auto-generado desde el `canonical`** vía diccionario `slugNames` de ~70 entradas, líneas 50-138), FAQPage (si `faqItems`), Product (si `product`). Body: skip-link + `TopBar` + `Header` + slot breadcrumbs + `<main>` + `Footer` + **sticky CTA móvil** + script FAQ accordion. |
| `PageLayout` | `src/layouts/PageLayout.astro` | **Extiende `BaseLayout`** | mismas props + `whatsapp?`, `phone?`, `email?` | La mayoría de páginas. Añade **módulo FAQ universal pre-footer** (8 FAQs de respaldo hardcodeadas, líneas 33-78) + `WaBubble` flotante. |

## Componentes — inventario (26)
| Componente | Ruta | Props (clave) | Uso |
|---|---|---|---|
| `Header` | `components/Header.astro` | lee `src/data/header.md`+`topbar.md` (gray-matter) | Nav + mega-menú Inflables (2 cols) + dropdown Servicios; data-driven |
| `TopBar` | `components/TopBar.astro` | lee `topbar.md` | Barra superior promo/tel/WhatsApp |
| `Footer` | `components/Footer.astro` | — | Pie |
| `WaBubble` | `components/WaBubble.astro` | `whatsapp?` (def `5531281706`), `message?`, `tooltip?` | Botón flotante WhatsApp (en PageLayout) |
| `ProductCard` | `components/ProductCard.astro` | `slug, emoji, name, description, price, size, ages, category, categoryColor?, gradient, image?, whatsapp?` | Grid de inflables; CTA WhatsApp por producto |
| `VenueCard` | `components/VenueCard.astro` | (salón) | Directorio |
| `CtaBanner` | `components/CtaBanner.astro` | `title*, subtitle?, btnText?, btnHref?, btnSecondaryText?/Href?, variant?(vibrant/warm/cool/festa), whatsapp?, external?, compact?` | CTA configurable transversal |
| `FaqSection` | `components/FaqSection.astro` | `items[], whatsapp?` | Acordeón FAQ + tarjeta cotización |
| `PricingCards` | `components/PricingCards.astro` | precios | Fichas de inflable, precios |
| `QuickNav` | `components/QuickNav.astro` | nav post-hero | Casi todas las páginas |
| `Breadcrumbs` | `components/Breadcrumbs.astro` | `items[]` (solo visual; el schema lo emite BaseLayout) | Páginas internas |
| `Gallery4x4` | `components/Gallery4x4.astro` | `images[]` | Galerías de inflable |
| `SectionHeader` | `components/SectionHeader.astro` | `badge, title, subtitle, copy1, copy2` | Encabezados de sección |
| `CtaBar` | `components/CtaBar.astro` | nav rápida | Páginas |
| `BlogCard`,`TestimonialCards`,`ZonaCard`,`ServiceFeature`,`ProductFeature`,`FeatureGrid`,`Sidebar`,`NavSidebar`,`ServicesSidebar`,`CatalogSidebar`,`ContentWithSidebar`,`VenueCard` | `components/*.astro` | Tarjetas/sidebars/features de blog, servicios, directorio |

## Content Collections / esquemas / taxonomías
`src/content.config.ts` define **1 colección** (`blog`, `glob()` loader sobre `./src/content/blog`, Zod):
- `title` (meta title) · `h1?` · `description` · `excerpt?` · `publishDate` (string) · `updatedDate?` · `category` (string libre, **sin enum**) · `author` (default "Equipo BRINCOLINS") · `readTime?` · `heroImage?` + `heroImageAlt?` · `galleryImages?` · `intro?` (array) · `tags?` · `draft` bool · `faqs?` (array {question, answer}).
- **52 artículos** `.md` (`src/content/blog/`).
- ⚠️ `category` es `z.string()` libre (no enum) → sin garantía de taxonomía consistente (a diferencia de PODIUMEX/MESECI).

**Generación de páginas:**
- `blog/[slug].astro` → `getStaticPaths` desde colección `blog` (emite `BlogPosting`); plantilla única (migración documentada en `INFORME-MEJORAS-2026.md`).
- **Inflables (8):** páginas **estáticas** `.astro` con objeto `inflable` inline (`inflables/barco-pirata.astro:16-29`) — NO colección.
- **Cobertura (35 alcaldías):** páginas **estáticas** `cobertura/<alcaldia>/index.astro`, cada una con arrays `colonias`/`faqs` **inline** (`cobertura/alvaro-obregon/index.astro:11-30`, 202 líneas) — NO data-driven.
- **Directorio (17 salones):** páginas **estáticas** `directorio/cdmx/<salon>.astro` con objeto `salon` inline (nombre, dirección, capacidad, teléfono, rating, gradient — `directorio/cdmx/dino-kids.astro:11+`) — NO colección.
- ⚠️ **Patrón dominante: páginas estáticas con datos hardcodeados**, no data-driven. Es la mayor deuda arquitectónica (60+ páginas que podrían generarse desde datasets). Contrasta con su gemelo INFLAPY, que SÍ usa `data/cobertura/*.ts` + `data/productos/*.ts` + colección `salones`.

## SEO real
- **Metas (todas en `BaseLayout.astro:179-219`):** title, description, author, robots (`index, follow, max-snippet:-1, max-image-preview:large`), canonical (`Astro.url.href` por defecto), **geo.* completo** (region MX-CMX, placename, position, ICBM), **OG completo** (type configurable home/product, url, title, description, image 1200×630, locale es_MX, site_name), Twitter `summary_large_image`, theme-color `#FF3D00`, favicon, fuente Outfit async. ⚠️ **Sin hreflang** (sitio monolingüe es-MX).
- **Schema JSON-LD (6 tipos, centralizado en `BaseLayout.astro`):** Organization (`#org`), LocalBusiness+EventVenue (`#negocio`, con openingHours/geo/areaServed), WebSite (`#website`), **BreadcrumbList auto-generado desde el canonical** (diccionario `slugNames` ~70 entradas), FAQPage (si `faqItems`), Product+Offer (si `product`). Conteo global (`grep`): 21 LocalBusiness, 18 AggregateRating, 3 Service, 1 Product/Offer/FAQPage/BreadcrumbList, etc.
- ⚠️ **`AggregateRating` 4.9/47 + 3 reviews fabricadas HARDCODEADAS** en `BaseLayout.astro:230-272` — María González (Coyoacán), Roberto Hernández (Naucalpan), Ana Laura Martínez (Polanco), idénticas en **cada** ficha de producto, con `reviewBody` que interpola el nombre del inflable. **Riesgo de penalización Google por reseñas autogeneradas/spam estructurado** (mismo patrón que MESECI). El propio `INFORME-MEJORAS-2026.md` celebra "609 JSON-LD válidos" pero válido ≠ permitido por las políticas de reseñas de Google.
- **URLs:** lowercase kebab-case, trailing slash en enlaces internos (`/cobertura/`, `/inflables/barco-pirata/`).
- **Internal linking:** mega-menú (`Header` data-driven), breadcrumbs en todas, `QuickNav` post-hero, `CtaBar`, sidebars de blog/servicios/catálogo, FAQ universal. 35 páginas de cobertura + 17 de directorio = malla SEO local densa.
- **Sitemap/robots:** sitemap por integración con prioridades por tipo. `public/robots.txt`: `Allow: /`, `Disallow: /cdn-cgi/`, apunta a `sitemap-index.xml`. ⚠️ **No bloquea bots de IA** (sin GPTBot/CCBot/ClaudeBot).

## Sistema de diseño
- **Tokens** en `src/styles/global.css` `:root`: paleta **festiva infantil** — `--c-primary #FF3D00` (naranja-rojo) + `--c-secondary #1A1A2E` (azul oscuro), `--c-accent #FFD600` (amarillo), `--c-green #00C853`, `--c-wa #25D366`; **paleta por categoría de inflable** (`--c-castillo #FF3D00`, `--c-princesas #E91E8C`, `--c-pirata #1565C0`, `--c-jungla #2E7D32`, `--c-acuatico`, `--c-deportivo`, `--c-extremo`, `--c-bodas`). Fondos blanco/`#f8fafc`/dark `#1A1A2E`.
- **Tipografía:** **Outfit** (Google Fonts async, `BaseLayout.astro:212`) para headings; body `system-ui`. (`--font-head: 'Outfit'`, `--font-body: system-ui`).
- **UI base / patrones:** **Hero 2 columnas** (regla `AGENTS.md` #3). **Cards:** `ProductCard` (con `categoryColor`+`gradient` por tipo), `VenueCard`, `BlogCard`. **CTA:** `CtaBanner` (4 variantes) + `CtaBar` + sticky CTA móvil global. **WhatsApp:** `WaBubble` flotante (PageLayout) + sticky móvil (BaseLayout) + CTAs por producto. **Breadcrumbs:** componente visual + JSON-LD acoplado en BaseLayout (regla `AGENTS.md`: no duplicar — corregido en el refactor).
- **Reglas de marca (`AGENTS.md`):** CERO animaciones de entrada, H2 como preguntas (GEO), "sin palabras IA", imágenes AVIF, CTAs → `/cotizar/`.

## Convenciones
- **Componentes:** PascalCase, planos en `src/components/`.
- **Páginas:** kebab-case = slug; cobertura/directorio en subcarpetas con `index.astro` por entidad.
- **Slugs de inflable:** compartidos con INFLAPY (barco-pirata, castillo-blanco, castillo-princesas, dragones-rojos, extremo, gusanitos, mini-castillo, mini-jungla).
- **Config:** nav data-driven en `src/data/header.md`+`topbar.md` (frontmatter YAML). ⚠️ **No hay `site.ts`/`config.ts` central de TS:** `SITE`/`TEL`/`EMAIL` están hardcodeados en `BaseLayout.astro:40-43`; WhatsApp `5531281706` repetido en BaseLayout, PageLayout (default), WaBubble (default), ProductCard (default), Header (default), header.md — sin fuente única tipada.
- **Alias:** `@` → `/src`.
- **Blog (`AGENTS.md`):** un `.md` por artículo en `src/content/blog/`, plantilla única `blog/[slug].astro`, "NO crear `.astro` por artículo".

## Flujos / procesos
1. **Contenido blog:** `.md` con frontmatter → `blog/[slug]` → `BlogPosting`. Imágenes en `public/img/blog/<slug>/`.
2. **Inflables/cobertura/directorio:** páginas estáticas con datos inline (proceso manual de copiar/editar por entidad).
3. **Conversión:** WhatsApp (`WaBubble`/sticky/CTAs) + `/cotizar/`. Sin CRM/backend.
4. **Deploy:** push a `main` → GitHub Actions → GitHub Pages.
5. **Refactor reciente:** documentado en `INFORME-MEJORAS-2026.md` (blog→Markdown, fix logo, dedup breadcrumbs, render WaBubble, fix imágenes).

## Integraciones
| Servicio | Estado | Evidencia |
|---|---|---|
| **GitHub Actions / Pages** | ✅ Activo | `.github/workflows/deploy.yml`, `CNAME` |
| **@astrojs/sitemap** | ✅ Activo | `astro.config.mjs:11-46` |
| **Google Fonts (Outfit)** | ✅ Activo | `BaseLayout.astro:210-212` |
| **WhatsApp** | ✅ Activo (links wa.me) | `BaseLayout.astro:117`, `WaBubble.astro` |
| **Cloudflare / wrangler / n8n / fal.ai / Brevo / formsubmit / analytics (GA/rybbit/gtag/dmchamp/truconversion) / exactdn** | ❌ HUECO: sin evidencia | `grep` sin resultados en `src/`. Sitio capta solo por WhatsApp; imágenes AVIF locales (sin CDN, a diferencia de INFLAPY/MESASPICNIC) |

## Documentación previa
**No hay obsidian-vault.** Documentación = archivos sueltos en raíz:
- `README.md` — stack, estructura, comandos (reescrito en el refactor).
- `AGENTS.md` — **instrucciones para agentes/IA**: identidad, reglas de marca (hero 2 cols, cero animaciones, H2-preguntas, AVIF, CTAs→/cotizar), convención de blog Markdown, schema centralizado. **Reutilizable como plantilla de AGENTS.md de proyecto.**
- `INFORME-MEJORAS-2026.md` — auditoría/bitácora del refactor (diagnóstico + cambios + métricas: 112 págs, 609 JSON-LD). **Reutilizable como modelo de informe de remediación.**
- `SEO-Auditoria-BRINCOLINS-2026.docx` — auditoría SEO (binario, no leído).
- `seo-meta-optimizer.skill` — skill de optimización de metas (8.8 KB).
- `articulos/` — 5 .md sueltos fuera de la colección (artículos 1–5).

**Reutilizable para el Master System:**
- **`AGENTS.md`** (reglas de marca + convención blog + schema) — plantilla de contrato de proyecto para agentes.
- **Patrón cobertura por alcaldía** (35 páginas con colonias/FAQ locales) — modelo de SEO local, aunque aquí mal implementado (estático en vez de data-driven; ver INFLAPY para la versión data-driven correcta).
- **BaseLayout: BreadcrumbList auto-generado desde canonical** (`slugNames`) — patrón útil de breadcrumb sin props.

## Clasificación
### ✅ Funciona
- `<head>` SEO completo y centralizado en un layout (geo, OG, Twitter, robots, BreadcrumbList auto-generado desde canonical) — `src/layouts/BaseLayout.astro:50-219`.
- Blog ya migrado a Content Collection Markdown (plantilla única `blog/[slug].astro`), eliminando 37 `.astro` duplicados — `INFORME-MEJORAS-2026.md`, `src/content.config.ts`.
- Malla SEO local extensa: 35 páginas de cobertura + 17 de directorio con datos locales reales (colonias, FAQs, salones con rating) — `src/pages/cobertura/`, `src/pages/directorio/`.
- Sistema de color por categoría de inflable + nav data-driven (header.md/topbar.md) — `global.css`, `Header.astro`.

### ❌ Falla
- **`AggregateRating` 4.9/47 + 3 reviews fabricadas** idénticas en cada ficha de producto → riesgo de penalización Google — `src/layouts/BaseLayout.astro:230-272`.
- **Inflables/cobertura/directorio NO data-driven:** 8+35+17 = 60+ páginas estáticas con datos hardcodeados inline → duplicación masiva y mantenimiento manual — `src/pages/inflables/*.astro`, `cobertura/*/index.astro`, `directorio/cdmx/*.astro`.
- **Sin fuente única de identidad/contacto:** `SITE`/`TEL`/`EMAIL`/WhatsApp hardcodeados y repetidos en 6+ archivos (no hay `site.ts`) — `BaseLayout.astro:40-43` + defaults en WaBubble/ProductCard/PageLayout/Header.
- **`category` de blog sin enum** (`z.string()` libre) → taxonomía no garantizada — `src/content.config.ts`.
- robots.txt no bloquea bots de IA — `public/robots.txt`.
- ⚠️ Cambios del refactor "no publicados a GitHub" según el informe → posible desfase local vs producción.

### 🤖 Automatizable
- Migrar inflables/cobertura/directorio a **datasets + rutas dinámicas** (`data/productos.ts`, `data/cobertura.ts`, colección `salones`) — el gemelo INFLAPY ya tiene exactamente este patrón data-driven, directamente portable.
- Reemplazar el `AggregateRating` fabricado por reseñas reales o eliminarlo del schema (lint de CI).

### 📐 Estandarizable
- **`AGENTS.md`** (reglas de marca + convención de blog + schema centralizado) como plantilla de contrato de proyecto para agentes del Master System.
- **BaseLayout con BreadcrumbList auto-generado desde canonical** (`slugNames`) como patrón de breadcrumb sin props.
- **Paleta por categoría de producto** (tokens `--c-<categoria>`) como técnica de theming por tipo de ítem.

## ⚠️ HUECOS
- **HUECO: BRINCOLINS vs INFLAPY (gemelos).** Comparten WhatsApp (`5531281706`), email pattern, catálogo de 8 inflables idéntico, paleta y enfoque. BRINCOLINS es la versión **estática/hardcodeada**; INFLAPY la **data-driven**. No determiné cuál es el original ni si son del mismo dueño operando dos marcas/dominios — requiere confirmar.
- **HUECO: estado de publicación.** `INFORME-MEJORAS-2026.md` dice que el refactor está en local sin publicar; no verifiqué si ya se desplegó a GitHub Pages después de la fecha del informe.
- **HUECO: integraciones externas.** Sin evidencia de n8n/fal.ai/Brevo/Cloudflare/analytics/CDN; se asume no integradas (capta por WhatsApp, imágenes AVIF locales sin CDN).
- **HUECO: `articulos/` sueltos.** 5 .md fuera de `src/content/blog/` — no determiné si son borradores pendientes de migrar o residuo.
- **HUECO: `.git/config`.** El remote usa `https://Frankoropeza@github.com/Frankoropeza/brincolins.git` (solo usuario, **sin token/credencial expuesta** — limpio).
- **HUECO: cobertura de muestreo.** Leí ambos layouts completos, content.config, tokens, 5+ componentes, robots, AGENTS/README/INFORME y muestras de inflable/cobertura/directorio; las 35 páginas de cobertura y 17 de directorio se inspeccionaron por patrón/muestra, no archivo por archivo.
