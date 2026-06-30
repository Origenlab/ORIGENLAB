# Diagnóstico — FIREFIGHTERMX

> Propósito: Sitio comercial de equipos certificados para bomberos, brigadas, industria y protección civil (firefighter.mx), con catálogo por categorías/marcas/sectores, fichas técnicas L4, blog y directorio de estaciones piloto.

## Identidad
- **Negocio / dominio:** "FIREFIGHTER México" — `https://firefighter.mx` (`astro.config.mjs` `site`, `src/data/site.ts` `SITE.url`). Tagline: "Equipos para bomberos, brigadas y protección contra incendios", +50 años en mercado.
- **Tipo:** E-commerce de catálogo / distribuidor técnico (sin carrito — conversión vía WhatsApp/cotización). Vende EPP estructural, SCBA, herramientas de rescate, monitores, etc. de marcas líderes.
- **ARQUETIPO tentativo:** **A (catálogo de producto / servicio técnico)**. Justificación: arquitectura L1–L4 explícita (`CLAUDE.md`), colecciones `productos`/`categorias`/`marcas`, layout dedicado `ProductLayoutL4.astro` con schema `Product`+`Offer`, páginas `/sectores/*` y `/marcas/*`. Contiene un módulo secundario tipo D (`/directorio` de estaciones, `/blog`) pero el eje es comercial. Evidencia: `src/layouts/ProductLayoutL4.astro`, `src/content/config.ts`, `src/components/SchemaOrg.astro` (Product/Offer).
- **Estado:** **vivo y el más maduro del cluster**. `CLAUDE.md` operativo, validador SEO en prebuild, pipeline de imágenes, 46 posts. Git activo. Es la evolución/hermano premium de FIREFIGHTERCOMMX (mismo negocio "FIREFIGHTER México", dominio distinto).

## Stack
- **Astro:** `^5.1.0` (`package.json`), `trailingSlash: 'never'` (`astro.config.mjs`).
- **Integrations:** `@astrojs/sitemap ^3.2.1` (con `serialize` por niveles L1–L3), `@astrojs/rss ^4.0.10`. **Tailwind v4** vía `@tailwindcss/vite ^4.0.0` (plugin Vite, no integración Astro).
- **CSS framework / tokens:** TailwindCSS v4 con **`@theme {}` en `src/styles/global.css`** (NO hay `tailwind.config.js` — confirmado en `CLAUDE.md`). Tokens CSS-vars: `--color-fire-red:#E10A1A`, `--color-fire-red-dark:#A80000`, escala `--color-ink-50..900`, estados, `--font-sans:Inter`, `--font-display:Oswald`, `--radius-card`, `--shadow-*`, `--container-max:1560px`, `--header-height:80px`. ⚠️ `@tailwindcss/typography` NO instalado → `prose` no aplica; usan `.blog-content`/`.cat-content`.
- **Imágenes:** `sharp ^0.33.5` + scripts de optimización (`scripts/optimize-*.mjs`); `image.domains/remotePatterns` vacíos. Fuentes **self-hosted** vía `@font-face` (gstatic woff2, preload con crossorigin).
- **Adapter / output:** sin adapter → **estático** (`CLAUDE.md`: "SSG, output: static").
- **Deploy detectado:** **GitHub Pages** (`.github/workflows/deploy.yml`, build+deploy, Node 20) **y** Cloudflare (`wrangler.toml` + `.wrangler/` presentes). `CLAUDE.md` confirma "GitHub Pages / Cloudflare Pages". Repo `github.com/Origenlab/firefighter-mx.git`.
- **Tooling:** Prettier (+ plugin-astro, plugin-tailwindcss), `astro check`, `.editorconfig`, `.nvmrc`, `engines.node >=20`.

## Estructura de carpetas (resumen)
```
src/
  components/{blog,directorio,layout,products,sections,ui}/ (+ SEO.astro, SchemaOrg.astro raíz)
  content/{blog(46),categorias(10),marcas(4),paginas(1),productos(5)} + config.ts
  data/{site.ts, sectores.ts, sector-productos.ts, brands.ts, estaciones.ts,
        fichas-vivas.ts, fichas-l4/*, seo-graph.ts, wa-messages.ts, ...}
  layouts/{BaseLayout, ProductLayout, ProductLayoutL4}.astro
  pages/{index, blog/, categorias/[slug], productos/[slug]+/trajes-para-bomberos/,
         marcas/<17 .astro>, sectores/<9 .astro>, directorio/[estado]/,
         api/directorio-search.json.ts}
  scripts/{buscar-directorio, whatsapp-form, directorio-*-filter}.ts
  styles/{global.css, mobile.css}
  types/fichas-l4.ts · utils/{seo.ts, seo-validator.ts}
scripts/ (raíz): validate-seo.mjs, optimize-*.mjs, fix-*.mjs, products/
```
Aliases TS configurados (`@components`, `@data`, `@layouts`, `@utils`, `@styles`, `@types`) — `tsconfig.json`.

## Layouts — jerarquía
- **`BaseLayout.astro`** (raíz) — props `title, description, image, canonical, noindex, type ('website'|'article'|'product'), schemaType ('home'|'product'|'category'|'page'), schemaItemList[], showWhatsApp, breadcrumb[]`. Compone `<head>`: preload fuentes self-hosted + `SEO` + `SchemaOrg`; `<body>`: skip-link, `TopBar`, `Header`, `Breadcrumb`, `<main>`, `Footer`, `WhatsAppFloat` (condicional), `RevealScript` (animaciones on-scroll). lang `es-MX`, `viewport-fit=cover`, `theme-color #E10A1A`.
- **`ProductLayout.astro`** — layout de producto (versión base).
- **`ProductLayoutL4.astro`** — **layout estrella**: orquesta fichas técnicas L4 vía slot `mainContent`. Props tipadas con `FichaL4Data` (`@types/fichas-l4`): `data, formIdSuffix, faqLead, faqFormMetrics, entrega, marcaTexto/Href, totalEnCatalogo, customSelect, ctaSecondary*`. Compone HeroL4 → SpecsStrip → main+SidebarL4 → FAQFormL4 → RelatedModelsL4 → CTAFinal → ProductSchemaL4. Canonical `/productos/{categoriaSlug}/{slug}`. Hereda de BaseLayout.
- **Herencia:** Product/ProductL4 → envuelven BaseLayout. Páginas L2/L3 usan BaseLayout directo.

## Componentes — inventario
| Componente | Ruta | Props (resumen) | Dónde se usa |
|---|---|---|---|
| SEO | src/components/SEO.astro | title, description, image, canonical, noindex, type | BaseLayout head |
| SchemaOrg | src/components/SchemaOrg.astro | type, productData, itemList | BaseLayout head |
| HeroL4 / SpecsStrip / SidebarL4 / FAQFormL4 / RelatedModelsL4 / CTAFinal / ProductSchemaL4 / FichaTecnicaCompleta / AplicacionesGrid / CTABandaDark / SVGGridPattern | src/components/products/*.astro | data de ficha L4 | ProductLayoutL4 + fichas |
| Hero / HeroPro / CategoriesGridPro / CategoryGrid / CTASection / FinalCTA / FAQAccordion / TestimonialsGrid / IndustriesServed / ProcessSteps / ValueProps / TrustStrip / CertificationsBar / AnnouncementBar / TopBar / SpecializationBand / EquipoPrioritarioBand / OtrosSectoresGrid | src/components/sections/*.astro (20) | index + sectores + categorías |
| BlogCard / BlogCardFeatured / BlogSidebar | src/components/blog/*.astro | post | blog |
| MapaEmbed / SidebarEstado | src/components/directorio/*.astro | estado | directorio |
| Breadcrumb / ProductCard / ProductImg / QuickLinksProductosSidebar / RevealScript / WhatsAppFloat | src/components/ui/*.astro | varios | global |
| Header / Footer | src/components/layout/*.astro | — | BaseLayout |

## Content Collections / esquemas / taxonomías
`src/content/config.ts` (API `type: 'content'`, **glob legacy** — no Content Layer loader). 5 colecciones:
- **`productos`** (5): `titulo, sku?, categoria (reference→categorias), subcategoria?, marca (reference→marcas), descripcionCorta, imagenPrincipal (image()), galeria[image()], especificaciones[{nombre,valor}], certificaciones[], precio?, moneda (MXN/USD), disponible, destacado, fichaTecnicaUrl(url), seoTitle/seoDescription/seoKeywords, fechaPublicacion, borrador`. **Usa `reference()`** (relaciones tipadas) e `image()` (optimización Astro).
- **`categorias`** (10): `titulo, descripcion, descripcionLarga?, icono?, imagenPortada(image), orden, destacada, categoriaPadre (reference self), seoTitle/Description`.
- **`marcas`** (4): `nombre, descripcion, logo(image), paisOrigen?, sitioWeb(url)?, distribuidorAutorizado, orden, destacada`.
- **`paginas`** (1): `titulo, descripcion, fechaActualizacion?, seo*`.
- **`blog`** (46): `titulo, descripcionCorta, imagen (def /images/blog/placeholder.avif), categoria (enum: NFPA/Equipo/Normativa/Capacitación/Industria/Licitaciones), tags[], autor{nombre,cargo?}, fechaPublicacion, tiempoLectura, destacado, borrador, seo*`.
- **Datos NO en colección** (en `src/data/*.ts`): `estaciones.ts` (directorio — enums `EstacionTipo`/`ParqueTipo`, cobertura "Baja California piloto"), `sectores.ts`, `sector-productos.ts`, `fichas-l4/*` (fichas técnicas como objetos TS, no MD), `brands.ts`, `seo-graph.ts`.
- **Rutas dinámicas:** `categorias/[slug]`, `productos/[slug]` (¡slug = categoría! genera listing de productos de esa categoría), `blog/[slug]`, `directorio/[estado]/`, marcas y sectores como `.astro` estáticos individuales. Endpoint API: `pages/api/directorio-search.json.ts`.

## SEO real
- **`SEO.astro`:** título vía `buildTitle()`, description `buildDescription()` (utils/seo.ts), canonical normalizado, OG (type website/article/product, image absoluta `absoluteUrl`), Twitter card. Imagen default `/images/hero/og-default.avif`.
- **`SchemaOrg.astro` (multi-schema):** emite array `[Organization, LocalBusiness, WebSite]` en todas las páginas (con `@id` para grafo: `#organization`, `#localbusiness`, `#website`), + `Product`+`Offer` (si `productData`) + **`CollectionPage`+`ItemList`** para L3 categoría (si `type='category'` + `itemList`). `Organization` incluye `knowsAbout` (normas NFPA), `foundingDate 1976`, dirección desde `CONTACT`. WebSite con `SearchAction` → `/buscar?q=`.
- **`ProductSchemaL4.astro`** añade schema específico de ficha L4.
- **Validación SEO automática:** `scripts/validate-seo.mjs` (prebuild + CI) extrae `seoTitle/seoDescription/canonical` de cada ficha L4 vía regex y valida longitudes (title ≤60, desc 120–160) contra `utils/seo-validator.ts`. Modo `--strict` falla con warnings. **Único proyecto del cluster con gate SEO en build.**
- **Patrón de URLs:** L1 `/`, L2 `/categorias`,`/productos`,`/blog`, L3 `/categorias/[slug]`, L4 `/productos/[categoria]/[slug]`. `trailingSlash: never`.
- **Sitemap:** `serialize` por niveles (Home/directorio raíz prio 1.0 daily; L2 0.9; L3 fichas 0.85; categorías/productos 0.8; blog 0.75). **robots.txt** presente.
- **Internal linking:** cross-link categoría↔sector (`SECTORES_POR_CATEGORIA` en `productos/[slug].astro`), `QuickLinksProductosSidebar`, `seo-graph.ts` (grafo de enlaces).

## Sistema de diseño
- **Tokens:** CSS-vars en `@theme {}` de `global.css` (ver Stack). Tipografía con `clamp()` responsiva (`h1: clamp(2.25rem,5vw,3.75rem)`), `font-feature-settings` Inter. `mobile.css` separado (overrides responsive).
- **UI base:** `ui/` (Breadcrumb, ProductCard, ProductImg, WhatsAppFloat, RevealScript, QuickLinksProductosSidebar). Sistema de `sections/` muy amplio (20 secciones reutilizables tipo "Pro").
- **Hero/cards/CTA/WhatsApp/breadcrumbs:** Hero + HeroPro + HeroL4 (3 variantes), ProductCard/CategoryCard, CTASection/FinalCTA/CTABandaDark/CTAFinal, **WhatsAppFloat global** + `wa-messages.ts` (mensajes pre-cargados por contexto), Breadcrumb en BaseLayout.

## Convenciones de nombres/archivos
- Componentes **PascalCase**, sufijos semánticos: `*Pro` (versión premium), `*L4` (ficha nivel 4), `*Band`/`*Strip`/`*Grid` (tipo de sección).
- **Aliases TS** (`@components/...`, `@data/...`) en todos los imports — convención fuerte.
- Datos de negocio centralizados en `src/data/*.ts` como **single source of truth** (`site.ts`: SITE/CONTACT/SOCIAL/NAV/BRANDS + helpers `whatsappUrl`, `brandHref`).
- Contenido frontmatter **en español** (`titulo`, `descripcionCorta`) — divergente de FFCOMMX/FFSMX que usan inglés (`title`, `description`).
- Scripts de mantenimiento `.mjs` en `/scripts` raíz; scripts de cliente `.ts` en `src/scripts`.

## Flujos / procesos (implícitos)
- **Cotización / conversión:** formularios WhatsApp (`src/scripts/whatsapp-form.ts`, `FAQFormL4`) → `wa.me` con mensaje pre-llenado (`whatsappUrl()`); no hay backend de pedidos (modelo lead → WhatsApp).
- **Búsqueda de directorio:** endpoint `api/directorio-search.json.ts` + scripts `directorio-*-filter.ts` (filtrado client-side por estado/tipo/servicio).
- **Producción de fichas L4:** objeto `FichaL4Data` tipado → `ProductLayoutL4` + `validate-seo.mjs` (gate) → build.
- **Optimización de imágenes:** scripts sharp (`optimize-product-images`, `optimize-site-images`, `optimize-skold-hero`) + LQIP (`product-images-lqip.json`).

## Integraciones
- **GitHub Actions:** ✅ `.github/workflows/deploy.yml` (GitHub Pages) + paso SEO posible vía `validate-seo.mjs`.
- **Cloudflare:** ✅ evidencia — `wrangler.toml` (raíz) + `.wrangler/` (estado local). `CLAUDE.md` confirma deploy dual GitHub Pages / Cloudflare Pages.
- **fal.ai / n8n / Brevo:** ⚠️ HUECO — sin evidencia en código/configs revisadas. La conversión es WhatsApp directo, no CRM/automation detectado. `.env.example` existe (no leído en detalle — posible config de terceros).
- **RSS:** ✅ `@astrojs/rss` instalado (feed de blog).

## Clasificación

### ✅ Funciona
- Sistema de fichas técnicas L4 reutilizable y tipado (`ProductLayoutL4.astro` + `FichaL4Data` + componentes products/) — arquitectura de catálogo más avanzada del cluster.
- Multi-schema JSON-LD con grafo `@id` (Organization/LocalBusiness/WebSite/Product/CollectionPage+ItemList) — `src/components/SchemaOrg.astro`.
- Gate de validación SEO en prebuild + CI (`scripts/validate-seo.mjs` + `utils/seo-validator.ts`) — previene regresiones de title/description.
- Single source of truth de datos en `src/data/site.ts` (CONTACT/BRANDS/NAV + helpers) y aliases TS — mantenibilidad alta.

### ❌ Falla
- `@tailwindcss/typography` no instalado pese a Tailwind v4 → `prose` no funciona; el contenido MD del blog depende de CSS manual `.blog-content` (frágil, documentado como gotcha en `CLAUDE.md` línea 18).
- Catálogo real escaso: solo **5 productos** y **4 marcas** en colecciones, con varios placeholders (`marca-ejemplo.md`, `ejemplo-traje-estructural.md`, `placeholder-traje.jpg`) → el sitio promete catálogo amplio pero el contenido productivo no está poblado — `src/content/productos/`, `src/assets/productos/`.
- Solapamiento con FIREFIGHTERCOMMX: ambos son "FIREFIGHTER México" con directorio de estaciones (aquí `estaciones.ts` solo Baja California piloto vs 92 fichas MD en FFCOMMX) → datos divididos en dos formatos/proyectos, riesgo de canibalización — `src/data/estaciones.ts` línea 16.

### 🤖 Automatizable
- Generación de fichas L4 a partir de un objeto `FichaL4Data` + validación SEO automática ya existe; el siguiente paso natural es **generar las fichas desde una fuente de datos** (catálogo del cliente) — el andamiaje (`fichas-l4/`, `fichas-vivas.ts`, validador) ya soporta escalar a N productos.

### 📐 Estandarizable
- Toda la capa `src/data/*.ts` (site/brands/sectores/wa-messages/seo-graph) + el patrón L1–L4 documentado en `CLAUDE.md` es el **candidato canónico para la "Fábrica de Sitios"** del cluster: convención de tokens `@theme`, aliases, SchemaOrg multi-entidad y validador SEO son lo más replicable.

## ⚠️ HUECOS
- **HUECO (.env):** `.env.example` presente pero no inspeccionado a fondo; no se confirma qué servicio externo configura (¿analytics, forms, Cloudflare?). Verificar manualmente.
- **HUECO (directorio dual):** la relación entre el `/directorio` de firefighter.mx (data TS, BC piloto) y firefighter.com.mx (92 fichas MD) no está gobernada por ningún documento; decidir cuál es la fuente canónica.
- **HUECO (catálogo placeholder):** indeterminado si los 5 productos/4 marcas son MVP intencional o catálogo pendiente de migración; varios archivos `ejemplo-*`/`placeholder-*` siguen en repo.
- **HUECO (ProductLayout vs L4):** coexisten `ProductLayout.astro` y `ProductLayoutL4.astro`; no se confirmó si el primero es legacy a deprecar.
- **Seguridad:** ✅ sin secretos expuestos. `.git/config` solo URL HTTPS pública; grep `gho_/ghp_/sk-/api_key/SECRET/BREVO/FAL_KEY` en `src`, `.env.example`, `wrangler.toml` → sin coincidencias. (Revisar `.env` real local si existe fuera de control de versiones.)
