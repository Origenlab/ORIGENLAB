# Diagnóstico — PANTALLA-LED
> Propósito: Sitio estático Astro (sitio pequeño/MVP) de venta, renta e instalación de pantallas LED (exterior/interior/flexible/eventos) con cobertura nacional MX, construido sobre el sistema de diseño "PROYECTORED" y respaldado por un design-system vault de 34 archivos.

## Identidad
- **Negocio/dominio:** PantallaLED · `https://pantalla-led.com` (`astro.config.mjs` línea `site:`; `src/config/site.ts:8`). Tagline "Especialistas en pantallas LED para exteriores e interiores — Venta · Renta · Instalación" (`src/config/site.ts:9`).
- **Tipo de sitio:** Catálogo técnico de producto + servicios, multipágina estática. Conversión vía WhatsApp (sin carrito ni backend). Evidencia: `src/components/global/WhatsAppButton.astro` (botón flotante usa `waUrl(WA_MESSAGES.cotizacion)`), `src/config/site.ts:33-42` (`WA_MESSAGES`).
- **ARQUETIPO: A — catálogo de producto/servicio técnico** (con sub-componente C de servicio local nacional). Justificación: el producto es hardware con fichas técnicas (pixel pitch, luminosidad, resolución — `src/content/config.ts:6-13`); jerarquía catálogo L2 categorías → L3 ficha de producto (`src/pages/productos.astro` + `src/pages/productos/[slug].astro`); taxonomía cerrada de 6 categorías + subcategorías por pixel pitch (`site.ts:78-104`, `MEGA_SUBCATEGORIES:122-150`); schema `Product`+`BreadcrumbList` por ficha (`productos/[slug].astro` comentario líneas 9). No es B (renta) puro: la renta es uno de 6 servicios, no el modelo central; no es D (el directorio/cobertura es accesorio).
- **Estado:** **MVP / prototipo pre-producción.** ⚠️ Hallazgo crítico de datos: `src/config/site.ts:21-24` tiene CONTACTO con **placeholders sin reemplazar** — `phone: '55 0000 0000'`, `phoneRaw: '5500000000'`, `whatsapp: '525500000000'`, `email: contacto@pantalla-led.com`, `address: 'Ciudad de México, México'` (genérico). El sitio no puede recibir leads reales hasta corregirlo. CNAME existe pero está **vacío** (`public/CNAME` sin contenido — verificado en recon).

## Stack
- **Astro `^5.7.0`** (`package.json:13`). Output `static` (`astro.config.mjs:6`). Sin `trailingSlash` explícito (default `ignore`), pero los canonicals se emiten **con** slash final (`productos/[slug].astro`: `canonical = ...${slug}/`).
- **Integrations:** **NINGUNA** registrada en `astro.config.mjs` (config minimalista de 6 líneas). ⚠️ Sin `@astrojs/sitemap` pese a tenerlo el resto del cluster → **no genera sitemap**.
- **CSS:** **Tailwind 3.4** (`@astrojs/tailwind ^5.1.0` + `tailwindcss ^3.4.17` + autoprefixer/postcss en `package.json:9-13`) **PERO** no está integrado en `astro.config.mjs` (la integración Tailwind no se carga) → tokens y estilos reales viven en CSS propio: `src/styles/global.css` (403 l., `:root` con todos los tokens), `components.css` (389 l.), `mobile.css` (422 l.). ⚠️ Tailwind declarado pero aparentemente no usado (CSS hand-written es la fuente real).
- **TypeScript** strict (`tsconfig.json` extiende `astro/tsconfigs/strict`, alias `@/*`).
- **Adapter:** ninguno (SSG puro). Node `>=20` (`package.json:6`).
- **Deploy:** **GitHub Pages** vía `.github/workflows/deploy.yml` (Node 20, `npm install` + `astro build` + `upload-pages-artifact` + `deploy-pages`, branch `main`).

## Estructura de carpetas
```
PANTALLA-LED/
├── astro.config.mjs · tsconfig.json · package.json
├── .github/workflows/deploy.yml        ← CI GitHub Pages
├── src/
│   ├── config/   site.ts (SITE/CONTACT/WA_MESSAGES/PRODUCT_CATEGORIES/SERVICES/APPLICATIONS/COVERAGE_STATES/MEGA_SUBCATEGORIES) · categorias.ts · servicios.ts · aplicaciones.ts · faqs.ts
│   ├── content/  config.ts (colecciones productos+servicios) · productos/ (3 .md) · servicios/ (3 .md)
│   ├── layouts/  Base.astro              ← ÚNICO layout
│   ├── components/  global/ (5: TopBar, Header, Footer, PreFooterNav, WhatsAppButton) · sections/ (15) · ui/ (SectionHeader, SectionHeaderDuo, CategoryCard + icons/ 5 SVG)
│   ├── pages/    index, productos, productos/[slug], servicios, aplicaciones, contacto (6 .astro)
│   ├── styles/   global.css · components.css · mobile.css
│   └── utils/    url.ts
├── public/  CNAME (vacío) · favicon.svg
├── docs/design-system/   ← VAULT obsidian propio (34 .md, ver sección)
├── dist/ · graphify-out/ · .vite-cache/
```

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `Base` | `src/layouts/Base.astro` | **Ninguna** — único layout, raíz | `title*`, `description*`, `canonical?`, `ogImage?` | TODAS las páginas. Compone `<head>` (title, description, canonical autocalculado, OG completo, Twitter `summary_large_image`, robots `index,follow`, `color-scheme:dark`, favicon SVG + apple-touch, fuente Outfit async). Body: `TopBar` + `Header` + `<main><slot/></main>` + `PreFooterNav` + `Footer` + `WhatsAppButton`. |

No hay sub-layouts. ⚠️ El `<head>` de `Base.astro` **NO emite JSON-LD** (sin `Organization`/`LocalBusiness`/`WebSite` global). El schema es responsabilidad de cada página (ver SEO).

## Componentes — inventario
| Componente | Ruta | Props | Uso |
|---|---|---|---|
| `WhatsAppButton` | `components/global/WhatsAppButton.astro` | — (lee `waUrl`+`WA_MESSAGES`) | Botón flotante `.wa-float` (`position:fixed; bottom/right 1.5rem; #25D366`), en Base → todas las páginas |
| `Header` | `components/global/Header.astro` | (consume config) | Nav + mega menú (lee `MEGA_SUBCATEGORIES`/`PRODUCT_CATEGORIES`) |
| `TopBar`/`Footer`/`PreFooterNav` | `components/global/*` | — | Barra superior, pie, nav pre-footer |
| `PageHero` | `components/sections/PageHero.astro` | (hero interior) | Páginas L2/L3. Comentario: "El schema BreadcrumbList lo emite cada página" (línea 6) |
| `HeroIndex` | `components/sections/HeroIndex.astro` | (hero home) | index |
| `CategoriasIndex`,`ServiciosIndex`,`CoberturaIndex`,`EspecificacionesIndex`,`FaqCotizacionIndex`,`ProcesoIndex`,`ReviewsIndex`,`TrustIndex`,`TrustStrip`,`QuickNav`,`CTAFinalIndex` | `components/sections/*` | Secciones de la home y páginas L2 — **patrón "una sección = un componente"** (PROYECTORED) |
| `CategoriaSpotlight`,`ServicioSpotlight`,`AplicacionSpotlight` | `components/sections/*Spotlight.astro` | spotlight de entidad | Detalle de categoría/servicio/aplicación |
| `CategoryCard`,`SectionHeader`,`SectionHeaderDuo` | `components/ui/*` | tarjeta/encabezado | UI base reutilizable |
| `IconArrowRight`,`IconCheck`,`IconInfo`,`IconPhone`,`IconWhatsApp` | `components/ui/icons/*` | SVG inline | Iconografía |

## Content Collections / esquemas / taxonomías
`src/content/config.ts` define **2 colecciones** (`type: 'content'`, Zod):
- **`productos`** (3 .md: pantalla-exterior, pantalla-interior, pantalla-flexible): `title`, `description`, `tipo` **enum** [Exterior, Interior, Flexible, Personalizado], `pixelPitch` (oblig.), `luminosidad?`, `resolucion?`, `image?`, `precio?`, `destacado` bool, `order` num.
- **`servicios`** (3 .md: instalacion, mantenimiento, renta): `title`, `description`, `icon?`, `order` num.

**Generación de páginas:** `productos/[slug].astro` → `getStaticPaths` desde colección `productos` (emite `BreadcrumbList`+`Product`). Las páginas L2 (`productos.astro`, `servicios.astro`, `aplicaciones.astro`) son estáticas que consumen los **config .ts** (`PRODUCT_CATEGORIES`, `SERVICES`, `APLICACIONES`, `FAQS`) como fuente de datos, no las colecciones.
- ⚠️ **Desajuste taxonomía↔rutas:** `PRODUCT_CATEGORIES` (`site.ts:78-86`) define **6 categorías** con `href` a `/productos/pantallas-exteriores/`, `/pantallas-interiores/`, etc., pero la colección `productos` solo tiene **3 .md** (pantalla-exterior/interior/flexible) y genera slugs distintos. Las 6 categorías del mega-menú apuntan a rutas que **no existen** como páginas generadas (solo hay 3 fichas + index). Catálogo incompleto / enlaces rotos potenciales.

## SEO real
- **Metas (en `Base.astro`):** title, description, canonical (autocalculado `new URL(pathname, site)`), OG (title/description/url/type website/site_name/locale es_MX + image condicional), Twitter `summary_large_image`, robots `index, follow`, `color-scheme:dark`. ⚠️ **Sin geo.*, sin hreflang, sin theme-color, sin author.**
- **Schema JSON-LD:** **NO global** (Base no emite ninguno; `grep "@type"` = 0 en componentes, pero los config .ts documentan que las páginas emiten schema). Emitido **por página**: `aplicaciones.astro:56-65` (`BreadcrumbList`+`ItemList`); comentarios en `categorias.ts`/`servicios.ts`/`faqs.ts` indican `ItemList`/`FAQPage`/`Product` por página; `PageHero` deja el `BreadcrumbList` a cada página. ⚠️ **No hay LocalBusiness/Organization/WebSite en ningún sitio** — ausencia notable para un negocio de servicios (contrasta con PODIUMEX/BRINCOLINS que sí lo centralizan).
- **URLs:** lowercase kebab-case, canonicals con trailing slash.
- **Internal linking:** mega-menú con subcategorías (`MEGA_SUBCATEGORIES`), `QuickNav` post-hero, `PreFooterNav`, spotlights. Coherente.
- **Sitemap/robots:** ⚠️ **Sin sitemap** (no hay `@astrojs/sitemap` en config). `public/robots.txt` **no existe** (solo CNAME vacío + favicon.svg en public). **HUECO grave de SEO técnico** vs. el resto del cluster.

## Sistema de diseño
- **Tokens** en `src/styles/global.css` `:root` (única fuente declarada en el comentario de `Base.astro`): paleta **tech oscura** — `--c-primary #0066CC` (azul) + `-dark #004499`, `--c-accent #FF6600` (naranja) + `-dark #CC5200`, `--c-success #22C55E`, `--c-star #F59E0B`; fondos oscuros `--c-bg #080C18`, `-bg-2 #0F1629`, `--c-surface #141D35`/`-2 #1A2540`; bordes `#1E2D50`; tinta `--c-ink #F0F4FF`/`-2 #C5D0E6`, `--c-muted #7A8CAB`. Tipografía fluida `clamp()` (`--text-xs…`). `color-scheme: dark` global.
- **Tipografía:** **Outfit** (Google Fonts, async en `Base.astro`) — comentario explícito "mismo que PROYECTORED para coherencia de sistema". `--font-sans/-display: 'Outfit', 'Inter', system-ui`.
- **UI base:** `SectionHeader`/`SectionHeaderDuo`, `CategoryCard`, set de 5 iconos SVG.
- **Hero:** `HeroIndex` (home) + `PageHero` (interiores). **CTA:** `CTAFinalIndex` + secciones. **WhatsApp:** flotante `WhatsAppButton` (centralizado vía `waUrl`). **Breadcrumbs:** emitido por página vía `PageHero` (schema), no hay componente visual dedicado aparente. **Trust:** `TrustIndex`/`TrustStrip`/`ReviewsIndex`.

## Convenciones
- **Componentes:** PascalCase; organizados en `global/` · `sections/` · `ui/` (+`ui/icons/`). Patrón **"una sección = un componente"** con sufijo `Index` para secciones de home (`HeroIndex`, `CategoriasIndex`…) — idéntico a MESECI/PROYECTORED.
- **Páginas:** kebab-case = slug.
- **Config centralizada:** `src/config/site.ts` (`SITE`, `CONTACT`, `WA_MESSAGES`, `waUrl()`, `PRODUCT_CATEGORIES`, `SERVICES`, `APPLICATIONS`, `COVERAGE_STATES`, `MEGA_SUBCATEGORIES`), todo `as const` — **fuente única ejemplar** (salvo los placeholders sin llenar). Datos de catálogo/servicios/aplicaciones/FAQ separados en `categorias.ts`/`servicios.ts`/`aplicaciones.ts`/`faqs.ts`.
- **Alias:** `@/*` → `./src/*`.

## Flujos / procesos
1. **Contenido producto/servicio:** `.md` con frontmatter Zod → `productos/[slug]` lo renderiza; L2 consumen config .ts.
2. **Conversión:** todo CTA → WhatsApp vía `waUrl(WA_MESSAGES.x)`. Sin formulario con backend, sin CRM.
3. **Deploy:** push a `main` → GitHub Actions → GitHub Pages.
4. **Documentación primero:** el vault `docs/design-system/` parece guiar la construcción (guías "Crear una Página Nueva" / "Crear una Sección Nueva").

## Integraciones
| Servicio | Estado | Evidencia |
|---|---|---|
| **GitHub Actions / Pages** | ✅ Activo | `.github/workflows/deploy.yml` |
| **Google Fonts (Outfit)** | ✅ Activo | `Base.astro` (preconnect + stylesheet async) |
| **WhatsApp** | ✅ (links wa.me) — ⚠️ con número placeholder | `WhatsAppButton.astro`, `site.ts:23` (`525500000000`) |
| **Cloudflare / wrangler / n8n / fal.ai / Brevo / formsubmit / analytics (GA/rybbit/gtag) / exactdn** | ❌ HUECO: sin evidencia | `grep` sin resultados en `src/` ni config |

## Documentación previa (obsidian-vault propio): qué cubre, qué es reutilizable
Vault **`docs/design-system/` con 34 archivos .md** en estructura numerada 00–06 — el **design-system mejor estructurado del cluster para su tamaño**:
- **00 Inicio.md** — portada del vault.
- **01 Fundamentos/ (4):** Colores, Tipografía, Layout y Espaciado, Efectos — tokens documentados.
- **02 Componentes/ (8):** Botones, Tarjetas, Iconos, Page Hero, Split Layout, Encabezados de Sección, Utilidades.
- **03 Secciones/ (15):** Hero, QuickNav, Categorías, Servicios, Proceso, Trust, Reviews, FAQ y Cotización, CTA Final, CtaBar, Cobertura, Especificaciones — una ficha por componente de sección.
- **04 Arquitectura/ (4):** Estructura del Proyecto, Convenciones, Responsive, **SEO y Datos** (define cómo cada página emite su schema).
- **05 Guías/ (2):** "Crear una Página Nueva", "Crear una Sección Nueva" — **SOPs operativos**.
- **06 Páginas L2/ (5):** Productos, Ficha de Producto, Servicios, Aplicaciones, Contacto.

**Reutilizable para el Master System (alto valor):**
- **Estructura del vault 00–06** (Fundamentos → Componentes → Secciones → Arquitectura → Guías → Páginas) — modelo limpio de documentación de design-system, directamente exportable.
- **Guías "Crear página/sección nueva"** — SOPs canónicos de extensión de un sitio arquetipo A.
- Patrón **PROYECTORED** ("una sección = un componente" + sufijo `Index` + config `site.ts` centralizada con `waUrl`) — confirma el principio arquitectónico compartido del cluster.
- Fuente Outfit + tokens tech-dark como **tema base de arquetipo A técnico**.

## Clasificación
### ✅ Funciona
- Config centralizada ejemplar `site.ts` (`as const`, `waUrl()`, todas las taxonomías en un sitio) + datos separados por dominio (`categorias/servicios/aplicaciones/faqs.ts`) — `src/config/`.
- Patrón "una sección = un componente" (PROYECTORED) limpio y consistente — `src/components/sections/`.
- Design-system vault de 34 archivos con guías operativas y arquitectura SEO documentada — `docs/design-system/`.
- Content Collections con Zod (enum `tipo`, specs técnicas obligatorias) — `src/content/config.ts`.

### ❌ Falla
- **Datos de contacto placeholder** (`phone '55 0000 0000'`, `whatsapp '525500000000'`) → el sitio NO capta leads reales — `src/config/site.ts:21-24`.
- **Sin sitemap ni robots.txt** (no hay `@astrojs/sitemap` en config, no existe `public/robots.txt`) — déficit de SEO técnico básico vs. todo el cluster.
- **Sin JSON-LD global** (Base no emite Organization/LocalBusiness/WebSite) — el negocio no se declara estructuralmente a Google.
- **Desajuste catálogo:** mega-menú con 6 categorías → rutas inexistentes; colección solo tiene 3 fichas — `site.ts:78-86` vs `src/content/productos/`.
- **CNAME vacío** → dominio no fijado en el deploy — `public/CNAME`.
- Tailwind declarado en `package.json` pero no integrado en `astro.config.mjs` → dependencia muerta.

### 🤖 Automatizable
- Generación de las fichas de producto faltantes (6 categorías × pixel pitch) desde la colección + `MEGA_SUBCATEGORIES` como dataset único.
- Inyección de sitemap + robots + JSON-LD `LocalBusiness`/`Organization` global tomando datos de `site.ts` (cuando se llenen) — replicar el patrón de PODIUMEX/`data/schema.ts`.

### 📐 Estandarizable
- **Estructura del vault 00–06 + guías "crear página/sección"** como modelo de documentación de design-system del Master System.
- **`site.ts` (SITE/CONTACT/WA_MESSAGES/waUrl + taxonomías as const)** como contrato estándar de identidad para arquetipo A.
- **Patrón "una sección = un componente" + Outfit + tokens tech-dark** como tema base de catálogo técnico.

## ⚠️ HUECOS
- **HUECO: estado real del negocio.** Los datos de contacto son placeholders → no se pudo confirmar si PantallaLED es una empresa operativa o un sitio plantilla/demo del sistema. Requiere confirmar con el dueño.
- **HUECO: SEO técnico ausente.** Sin sitemap, robots ni JSON-LD global — no verifiqué si está pendiente intencionalmente (MVP) o es omisión.
- **HUECO: Tailwind.** Declarado pero no integrado; no confirmé si hay clases Tailwind usadas en algún `.astro` o si es dependencia residual.
- **HUECO: catálogo incompleto.** 3 fichas vs 6 categorías anunciadas; no determiné si las otras 3 están en backlog.
- **HUECO: integraciones externas.** Sin evidencia de n8n/fal.ai/Brevo/Cloudflare/analytics; se asume no integradas.
- **HUECO: cobertura de muestreo.** Leí Base, config completos, content config, WhatsAppButton, tokens y árbol; las 15 secciones y 6 páginas se inspeccionaron por nombre/uso, no archivo por archivo.
