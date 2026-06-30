# Diagnóstico — RENTADEILUMINACION
> Propósito: Sitio estático Astro (304 páginas) de renta de iluminación, sonido y efectos especiales para eventos (bodas/XV/corporativos) en CDMX y Edomex, con fuerte enfoque SEO local + blog + directorio de proveedores.

## Identidad
- **Negocio/dominio:** REDEIL — Renta de Iluminación Profesional · `https://rentadeiluminacion.com` (evidencia: `astro.config.mjs` línea `site:`; `src/pages/index.astro` schema LocalBusiness con dirección "Río Amazonas 74B, Col. Renacimiento, Cuauhtémoc, 06500 CDMX", tel +52 55 3068 2988, email hola@rentadeiluminacion.com).
- **Tipo de sitio:** Sitio corporativo de servicios + catálogo de renta + blog SEO + directorio de terceros. Multi-página estática (SSG puro).
- **ARQUETIPO tentativo: B = renta/eventos** (con fuerte componente C = servicio profesional local). Justificación: todo el modelo gira en torno a renta de equipo por evento (no venta), con paquetes por nivel/tamaño, CTAs de cotización vía WhatsApp/teléfono, páginas por zona geográfica (alcaldías CDMX/Edomex) y schema `Service`/`Product`/`LocalBusiness`/`AggregateRating`. Evidencia: `src/pages/servicios/*` (hubs de servicio + sub-paquetes), `src/pages/zonas/*` (25 alcaldías), `src/pages/eventos/{bodas,xv-anos}.astro`, copy recurrente "renta", "instalación incluida", "+ IVA". El componente C aparece en las 25 páginas de zona con `Service.areaServed`/`GeoCoordinates` por alcaldía.
- **Estado:** En producción y activo. Último commit `be4b02d` ("fix: corregir horario 20:00 en 27 archivos restantes"); historial reciente dominado por fixes SEO masivos (236 enlaces rotos, 128 títulos ≤60 chars, 31 meta descripciones, unificación de estadísticas). Build `dist/` presente con 288 HTML.

- **Stack:**
  - **Astro `^5.7.10`** (evidencia: `package.json`).
  - **Integrations:** solo `@astrojs/sitemap ^3.3.1` (evidencia: `astro.config.mjs`). Dependencia runtime extra: `gray-matter ^4.0.3` (parseo de frontmatter en `Header.astro`/`TopBar.astro`). DevDeps: `sharp ^0.34.5`, `glob ^13.0.6`.
  - **CSS:** NO usa Tailwind ni UnoCSS. CSS global hecho a mano: `public/css/style.css` (7,628 líneas, 175 KB) + `public/css/fonts.css` (self-hosted woff2 con metric overrides anti-CLS). Tokens vía CSS custom properties. Critical CSS inline duplicado en `BaseLayout.astro`.
  - **TypeScript:** `tsconfig.json` extiende `astro/tsconfigs/strictest`.
  - **Adapter/output:** Sin adapter. Output estático por defecto (SSG). `build.assets: '_astro'`. `vite.cacheDir: '/tmp/redeil-vite-cache'`.
  - **Deploy:** **GitHub Pages** vía GitHub Actions (`.github/workflows/deploy.yml`: `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`, Node 20, `npm ci` + `npm run build`). **NO es Cloudflare** (no hay wrangler ni `_redirects`/`CNAME`). Repo: `github.com/Origenlab/RENTADEILUMINACION` (⚠️ ver HUECOS: token GitHub expuesto en `.git/config`).
  - **Build pipeline:** `npm run build` = `astro build && node scripts/rewrite-cdn.mjs` (post-procesa el HTML para reescribir `/img/...` → CDN ExactDN).

## Estructura de carpetas
```
RENTADEILUMINACION/
├── astro.config.mjs, package.json, tsconfig.json
├── .github/workflows/deploy.yml        # CI → GitHub Pages
├── scripts/rewrite-cdn.mjs             # post-build: /img/ → ExactDN
├── src/
│   ├── layouts/      BaseLayout.astro · BlogLayout.astro   (solo 2)
│   ├── components/    23 componentes .astro
│   ├── pages/         304 .astro  (servicios, blog, zonas, directorio, eventos, raíz)
│   ├── content/       blog/ (10 .md) + directorio/ (25 .md) + config.ts   (Content Collections)
│   └── data/          blog-articles.ts (623 líneas) · header.md · topbar.md
├── public/
│   ├── css/ (style.css, fonts.css) · fonts/ · img/ · img.backup/
│   ├── robots.txt · sitemap.xml (ESTÁTICO, stale) · schema-redeil.json (huérfano)
│   └── favicon/icons · google*.html (verificación Search Console)
├── dist/             build (288 HTML) + sitemap-index.xml + sitemap-0.xml (generados)
├── docs/             copy markdown (zonas, artículos) — fuente editorial, no se compila
└── *.md (raíz)       ~15 archivos de auditoría/reportes/artículos sueltos (no se compilan)
```
Notas: `img.backup/` se versiona junto a `img/` (duplicación). `.astro/`, `.vite-cache/`, `graphify-out/` son artefactos locales (`.gitignore` ignora `node_modules`, `dist`, `graphify-out/`).

## Layouts — jerarquía de herencia
Solo existen **2 layouts** (todo el sitio cuelga de `BaseLayout`):

| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | Raíz (HTML completo) | `title, description, canonical, ogImage?, ogTitle?, ogDescription?, schemaMarkup?` | Base de TODAS las páginas. Inyecta `<head>` (meta/OG/Twitter), critical CSS inline, preconnect CDN, preload fonts, schema BreadcrumbList **autogenerado desde `canonical`**, slot `breadcrumbs`, `<TopBar>`+`<Header>`+`<Footer>`, y scripts de terceros (TruConversion, DMChamp). |
| `BlogLayout` | `src/layouts/BlogLayout.astro` | **Extiende `BaseLayout`** | `title, description, canonical, image, imageAlt, category, schemaMarkup?` | Artículos de blog. Layout 2 columnas (artículo + `BlogSidebar` sticky). Contiene **data hardcodeada** en el frontmatter: `popularArticles`, `directorioMap` por categoría, `relatedByCategory` (mapas grandes de artículos relacionados). Pasa `ogImage=image` a BaseLayout. |

`BaseLayout` codifica `slugNames` (diccionario ~70 entradas slug→nombre legible) para construir el BreadcrumbList automático. `lang="es-MX"`. (Evidencia: `src/layouts/BaseLayout.astro`, `src/layouts/BlogLayout.astro`.)

## Componentes reutilizables — inventario
23 componentes en `src/components/`. Todos con estilos en `style.css` global (cada componente cierra con comentario "Estilos en /css/style.css (global) — evita FOUC en dev mode").

| Componente | Ruta | Props (clave) | Dónde se usa | Nota |
|---|---|---|---|---|
| Header | `Header.astro` | (lee `src/data/header.md` con gray-matter) | BaseLayout | Nav sticky glassmorphism, dropdowns, panel móvil con JS inline. Config 100% data-driven desde markdown. |
| TopBar | `TopBar.astro` | (lee `src/data/topbar.md`) | BaseLayout | Barra superior promo+tel+horario+chat. Variantes dark/primary/accent. Data-driven. |
| Footer | `Footer.astro` | — (sin props; `year` dinámico) | BaseLayout | Footer premium: trust strip, nav completa hardcodeada, rating "4.8/127 reseñas", marcas. Enlaza `/sitemap-index.xml`. |
| Hero | `Hero.astro` | `title, subtitle, introParagraph1, introParagraph2, cotizarHref?, whatsappText?, badge?, stats?, hideCtas?, extraClass?` | Casi todas las páginas | 2 columnas. ⚠️ `defaultStats` dice **"10+ Años"** (inconsistente con "30+" del Footer/copy). Tiene lógica condicional hardcodeada sobre el H1 si `title` incluye "Iluminación". |
| SectionHeader | `SectionHeader.astro` | `title, paragraph1, paragraph2, subtitle?, tag?, dark?` | Servicios, zonas, directorio | Encabezado de sección estándar. |
| ServiceCard | `ServiceCard.astro` | `title, description, image, link, alt?, btnLabel?, eyebrow?` | Grids de servicios relacionados | Tarjeta de servicio con imagen+CTA. |
| ServiceCardPackages | `ServiceCardPackages.astro` | `title, image, packages[], ctaLink, eyebrow?, ctaLabel?, alt?` | Home | Tarjeta de servicio con lista de paquetes/precios. |
| PricingCards | `PricingCards.astro` | `packages[]` (name, price, features[{text,included}]...) | Hubs de servicio | Tabla de paquetes con features incluidas/excluidas. |
| ContentWithSidebar | `ContentWithSidebar.astro` | `sidebarTitle?, price?, priceNote?, features?[], packages?[], whatsapp?, waMessage?, phone?` | Sub-páginas de paquete | Layout contenido + sidebar sticky con precio y CTA WA. |
| FeatureGrid | `FeatureGrid.astro` | `features[]{title,description}, columns?(2\|3)` | Sub-páginas de paquete | Grid de características. |
| Gallery4x4 | `Gallery4x4.astro` | `images[]{src,alt}` | Servicios/zonas | Galería de imágenes (16 imgs típicas). |
| GallerySection | `GallerySection.astro` | `title?, subtitle?` | (puntual) | Wrapper de galería. |
| FaqSection | `FaqSection.astro` | `items[]{question,answer}, phone?, whatsapp?, waMessage?, email?, schedule?` | Casi todas | 2 cols: acordeón `<details>` + tarjeta de contacto con CTA DMChamp. Defaults REDEIL hardcodeados (tel, WA, email). |
| TestimonialCards | `TestimonialCards.astro` | `testimonials[]{name,event,rating,text}` | Sub-páginas de paquete | Reseñas (texto duplica el schema `Review` de la página). |
| Breadcrumbs | `Breadcrumbs.astro` | `items[]{label,href?}` | Vía slot `breadcrumbs` | ⚠️ Emite su PROPIO `BreadcrumbList` JSON-LD → **duplica** el de BaseLayout (ver Falla). |
| CtaBar | `CtaBar.astro` | `items[], headline?` | Importado en muchas páginas | Barra de accesos rápidos. **Frecuentemente importado pero comentado/no renderizado** (ej. en `cabezas-moviles.astro`, `BlogLayout`). |
| NavRapida | `NavRapida.astro` | `items?[]` | Home | Navegación rápida por categoría. |
| BlogCard | `BlogCard.astro` | `title, description, image, imageAlt, category, slug` | BlogLayout, blog index | Tarjeta de artículo. |
| BlogSidebar | `BlogSidebar.astro` | `categories?, popularArticles?, directorioEmpresas?, activeCategory?, currentSlug?, showSearch?, phone?, whatsapp?, waMessage?` | BlogLayout, blog index/pagina | Sidebar con populares + directorio + categorías. |
| RelatedBlog | `RelatedBlog.astro` | `posts[]` | (puntual) | Artículos relacionados. |
| DirectoryCard | `DirectoryCard.astro` | `nombre, categoria, zona, alcaldia_municipio, slug, telefono?, rating?, resenas?` | Directorio | Tarjeta de empresa. |
| ZoneCards | `ZoneCards.astro` | — (sin interface Props visible) | Zonas/home | Grid de zonas/alcaldías. |
| RelatedBlog/Gallery... | — | — | — | (ver arriba) |

## Content Collections / esquemas / taxonomías — CÓMO se generan las 304 páginas
`src/content/config.ts` define **2 colecciones** con Zod (`type: 'content'`):

- **`blog`**: `title(≤60), description(≤155), image, imageAlt, category` (req.) + `pubDate?, tags?[], keywords?[], faqItems?[{question,answer}], draft?(=false)`. Solo **10 archivos `.md`**.
- **`directorio`**: `nombre, categoria(enum: audio|iluminacion|audio-video|dj|efectos), zona(enum: cdmx|estado-de-mexico), alcaldia_municipio, direccion, servicios[]` (req.) + `telefono?, whatsapp?, facebook?, instagram?, horario?, rating?, resenas?, activo?(=true)`. **25 archivos `.md`**.

**⚠️ Hallazgo arquitectónico clave — el sitio NO es content-collection-driven.** De las 304 páginas, **301 son archivos `.astro` estáticos escritos a mano** y solo **3 son rutas dinámicas** (`getStaticPaths`):

**Desglose de las 304 `.astro` en `src/pages/` (y 282 URLs en sitemap generado / 288 HTML en dist):**
1. **`servicios/` — 134 páginas estáticas** (38 hubs de servicio top-level como `cabezas-moviles.astro`, + 96 sub-páginas de paquete en subcarpetas como `cabezas-moviles/paquete-show-basico.astro`). Cada hub lista ~4 paquetes; cada paquete es su propia página con schema `Product` + `Review` + `FAQPage`. **Esta es la fuente principal de escala.**
2. **`blog/` — 131 `.astro`**: 128 artículos estáticos escritos a mano + `index.astro` + `pagina/[page].astro` (paginación dinámica, páginas 2–6 desde `blog-articles.ts`) + `[...slug].astro` (renderiza la colección `blog` de 10 `.md`).
3. **`zonas/` — 26 estáticas**: 25 alcaldías/municipios (`coyoacan.astro`, `iztapalapa.astro`, …) + `index.astro`. Cada una con schema `Service` + `areaServed`/`GeoCoordinates` + FAQ.
4. **`directorio/` — 4**: `index.astro`, `cdmx.astro`, `estado-de-mexico.astro` (filtran la colección por `zona`), + `[...slug].astro` (genera las 25 fichas de empresa desde la colección `directorio`, con schema `LocalBusiness`).
5. **Raíz/secundarias**: `index.astro` (home, 772 líneas), `nosotros`, `contacto`, `servicios.astro`, `aviso-privacidad`, `zonas-de-cobertura`, `eventos/{bodas,xv-anos}`, `404`.

**Conclusión:** las "304 páginas" se generan **mayoritariamente a mano** (no por un patrón `[slug]` masivo). Solo el directorio (25) y el blog markdown (10) y la paginación (5) son programáticos. El blog está en un **modelo híbrido confuso**: el index/listado usa `src/data/blog-articles.ts` (121 entradas), pero los artículos viven como 128 `.astro` + 10 `.md` (colección). Build real: **89 HTML en `dist/blog/`** (los 121 del listado NO coinciden 1:1 con los archivos reales).

## SEO real
- **Metas:** `BaseLayout` emite title, description, `author=REDEIL`, `robots=index,follow`, canonical, OG completo (type/url/title/description/image/locale `es_MX`/site_name), Twitter `summary_large_image`, theme-color, favicons. OG image default desde CDN ExactDN.
- **Schema JSON-LD (tipos + rutas):**
  - `LocalBusiness` + `WebSite` + `FAQPage` → `src/pages/index.astro` (home; incluye `aggregateRating` 4.8/127, `geo`).
  - `Service` + `FAQPage` → hubs de servicio (`servicios/cabezas-moviles.astro`, etc.) y páginas de zona (`zonas/coyoacan.astro` con `areaServed`/`serviceArea`/`OpeningHoursSpecification`).
  - `Product` + `AggregateRating` + `Review[]` + `FAQPage` → sub-páginas de paquete (`servicios/.../paquete-*.astro`). ⚠️ Reseñas con nombres/textos plausiblemente ficticios (mismo patrón replicado).
  - `Article` (+ `FAQPage` condicional) → blog (`[...slug].astro` genera desde frontmatter; los `.astro` estáticos lo declaran inline).
  - `LocalBusiness` (por empresa) → `directorio/[...slug].astro`.
  - `BreadcrumbList` → **DOS fuentes**: `BaseLayout` (auto desde canonical) + `Breadcrumbs.astro` (por `items`). **Duplicado en todas las páginas con breadcrumbs** (confirmado: `dist/servicios/cabezas-moviles/index.html` tiene 2 `BreadcrumbList`).
- **URLs:** trailing slash (`/servicios/cabezas-moviles/`), build emite `index.html` por carpeta. Canonicals absolutos y consistentes con la URL real.
- **Internal linking:** muy denso y deliberado — Footer con ~40 links, dropdowns de Header, sidebars de directorio/blog con links cruzados generados por categoría+zona, "servicios relacionados" y "otros paquetes" en cada página. Fuerte topical clustering (servicio↔paquetes↔zonas↔blog↔directorio).
- **Sitemap:** `@astrojs/sitemap` genera `dist/sitemap-index.xml` → `dist/sitemap-0.xml` con **282 URLs** (correcto). `filter` en `astro.config.mjs` **excluye** `/servicios/bodas/`, `/servicios/xv-anos/`, `/servicios/confeti-papelitos/` del sitemap (esas páginas existen y se construyen, pero se omiten — probable des-duplicación frente a `/eventos/bodas/` y `/eventos/xv-anos/`; ⚠️ las páginas siguen siendo indexables vía canonical propio, no hay noindex).
- **robots.txt:** `Allow: /`, `Disallow: /404.html`, apunta a `sitemap-index.xml`, y **bloquea explícitamente bots de IA** (GPTBot, ClaudeBot, CCBot, Google-Extended, Bytespider, Amazonbot, meta-externalagent, Applebot-Extended).
- **hreflang:** ❌ NO existe (sitio mono-idioma es-MX, aceptable).
- **Verificación:** `public/google55e96e5e87e6de59.html` y `google897b1f16de00c568.html` (Search Console).

## Sistema de diseño
- **Tokens** (definidos en `:root` de `public/css/style.css`, líneas ~16–110; **duplicados parcialmente inline** en `BaseLayout.astro` para critical CSS):
  - **Color:** `--color-primary #ff5722` (naranja CTA), `--color-primary-dark #e64a19`, `--color-secondary #1a1a2e` (azul oscuro), `--color-accent #f4a261`, escala de grises `--color-gray-100..900`, `--color-whatsapp #25d366`.
  - **Tipografía:** `--font-primary 'Montserrat'` (headings), `--font-secondary 'Open Sans'` (body), con fallbacks `*-Fallback` + metric overrides (anti-CLS). Escala `--text-xs..6xl`. Fonts self-hosted woff2 (`/fonts/`), preload de 3 críticas.
  - **Espaciado:** `--space-1..24` (rem). **Radios:** `--radius-sm..full`. **Sombras:** `--shadow-sm..2xl`. **Transiciones:** `--transition-fast/base/slow`. **Container:** `--container-max 1400px`, `--container-padding 1.5rem`. `--header-height 76px`.
- **UI base:** clases utilitarias y de componente en `style.css` (`.container`, `.btn`/`.btn-primary`/`.btn-whatsapp`/`.btn-outline`/`.btn-lg`, `.services-section`, `.services-alt`, `.cta-section`).
- **Hero:** componente `Hero.astro` (2 columnas, overline, H1 con acento, stats, CTAs cotizar+WA).
- **Cards:** `ServiceCard`, `ServiceCardPackages`, `BlogCard`, `DirectoryCard`, `TestimonialCards`, `PricingCards`.
- **CTA:** patrón omnipresente "Cotizar"/"WhatsApp"/"Llámanos" con número `55 3068 2988` / `wa.me/525530682988`.
- **WhatsApp:** ⚠️ NO hay botón flotante (FAB) propio. El "chat" se delega al **widget DMChamp** (cargado en BaseLayout); botones `data-open-chat` disparan `window.openDmchampChat()`. Los enlaces `wa.me/...` directos sí existen en Footer/Hero/fichas.
- **Breadcrumbs:** componente dedicado con fondo oscuro + acento naranja, vía slot.

## Convenciones de nombres y archivos
- **Páginas:** kebab-case, español, orientadas a keyword (`cuanto-cuesta-iluminacion-boda-cdmx.astro`, `zonas/gustavo-a-madero.astro`).
- **Sub-paquetes:** prefijo `paquete-` dentro de carpeta del servicio (`servicios/guirnaldas/paquete-100-metros.astro`).
- **Componentes:** PascalCase `.astro`.
- **Colecciones:** `.md` kebab-case; frontmatter en español (campos `nombre`, `categoria`, `zona`).
- **Config data:** markdown frontmatter (`header.md`, `topbar.md`) — patrón "OrigenLab Standard" (comentado en TopBar/FaqSection).
- **Variables internas:** title/description/canonical/schemaMarkup declaradas al tope del frontmatter de cada página (patrón uniforme).
- **CSS:** BEM-like (`hdr__inner`, `ficha-hero__grid`, `ft__trust-item`, `crumbs__list`). Todo en un único `style.css`.
- **Imágenes:** AVIF, nombres descriptivos-SEO con sufijos de ancho (`renta-cabezas-moviles-...-800w.avif`), organizadas en `/img/<servicio>/`.

## Flujos / procesos (implícitos)
- **Editorial/contenido:** copy redactado en `docs/*.md` (zonas, artículos) → trasladado a `.astro`/`.md`. Artículos largos sueltos en raíz (`articulo-01-...md`, `podiumex-01-...md`) parecen borradores/insumos no compilados.
- **Build & deploy:** push a `main` → GitHub Actions → `astro build` → `rewrite-cdn.mjs` (reescribe `/img/` a ExactDN en el HTML) → artifact → GitHub Pages.
- **Optimización de imágenes:** scripts sueltos `optimize_avif.js`/`optimize_avif.mjs` (raíz) + `sharp` devDep → conversión a AVIF (proceso manual, fuera del build).
- **Conversión/lead:** CTAs → WhatsApp (`wa.me`), teléfono (`tel:`), formulario en `/contacto/`, chatbot DMChamp y microsurvey TruConversion.
- **Generación de fichas de directorio:** un `.md` por empresa → `[...slug].astro` autogenera hero, FAQ por categoría, mapa embed, schema y CTAs (toda la "inteligencia" de presentación está en el template, no en el `.md`).

## Integraciones (evidencia o HUECO)
- **GitHub Actions:** ✅ `.github/workflows/deploy.yml` (deploy a GitHub Pages).
- **Cloudflare:** ❌ No usado. Sin wrangler/`_redirects`/`CNAME`. (Deploy es GitHub Pages.)
- **CDN ExactDN** (`ek8wn5x6rqg.exactdn.com`): ✅ vía `scripts/rewrite-cdn.mjs` (post-build) + preconnect en `BaseLayout`. Es el CDN de imágenes de Jetpack/WordPress.com — ⚠️ dependencia externa de un dominio opaco hardcodeado.
- **DMChamp** (chatbot IA): ✅ `BaseLayout.astro` (`api.dmchamp.com/v1/chat-widget/T1ascJwdozIT8qo0YtQh`) + i18n por MutationObserver + helper `window.openDmchampChat`.
- **TruConversion** (microsurvey/heatmap): ✅ `BaseLayout.astro` (id `62671/e4e92`) con tema custom y traducción ES.
- **WhatzAI:** ⚠️ Mencionado/comentado en `BaseLayout` ("WhatzAI Chat Widget — comentado"); aparentemente reemplazado por DMChamp. No activo.
- **n8n:** ⚠️ HUECO: sin evidencia en el repo.
- **fal.ai:** ⚠️ HUECO: sin evidencia en código compilado; las imágenes AVIF podrían haberse generado con IA (hay `REPORTE-IMAGENES-GENERADAS.md` en raíz) pero NO hay integración en runtime/build.
- **Brevo (email):** ⚠️ HUECO: sin evidencia. El form de `/contacto/` no muestra backend de envío evidente en lo muestreado.

## Clasificación de hallazgos

### ✅ Funciona
- Sitemap generado correctamente con 282 URLs · `dist/sitemap-0.xml` (integración `@astrojs/sitemap`).
- Sistema de diseño con tokens centralizados y fonts self-hosted con metric overrides anti-CLS · `public/css/style.css` (`:root`), `public/css/fonts.css`.
- Optimización LCP deliberada: critical CSS inline, preload de fonts críticas, preconnect a CDN, reescritura de imágenes a CDN en post-build (evita doble request) · `src/layouts/BaseLayout.astro`, `scripts/rewrite-cdn.mjs`.
- Schema JSON-LD rico y por-tipo (LocalBusiness/Service/Product/Article/FAQPage/AggregateRating) · `src/pages/index.astro`, `servicios/*/paquete-*.astro`, `zonas/*.astro`.
- Header/TopBar 100% data-driven desde markdown (reconfigurables sin tocar código) · `src/components/Header.astro` + `src/data/header.md`.
- CI/CD funcional a GitHub Pages en cada push a main · `.github/workflows/deploy.yml`.
- Internal linking denso y coherente (topical clusters servicio↔paquete↔zona↔blog↔directorio) · `src/components/Footer.astro`, `directorio/[...slug].astro`.
- Accesibilidad básica cuidada: skip-link, `aria-*`, roles de menú, `lang="es-MX"` · `src/layouts/BaseLayout.astro`, `src/components/Header.astro`.

### ❌ Falla
- **BreadcrumbList JSON-LD DUPLICADO** en toda página con breadcrumbs (BaseLayout autogenera uno + Breadcrumbs.astro emite otro) — confirmado 2 ocurrencias en `dist/servicios/cabezas-moviles/index.html` · `src/layouts/BaseLayout.astro` + `src/components/Breadcrumbs.astro`.
- **5 colisiones de slug blog** entre colección `.md` y `.astro` estático: `error-mas-caro-iluminacion-bodas`, `humo-bajo-vs-maquina-humo-cual-es-para-ti`, `lo-que-tu-fotografo-quiere-que-sepas-sobre-iluminacion`, `por-que-el-vals-necesita-su-propia-iluminacion`, `que-pasa-cuando-llueve-evento-aire-libre`. El `.astro` gana; los `.md` correspondientes quedan **muertos** (nunca se renderizan) · `src/content/blog/` vs `src/pages/blog/`.
- **`public/sitemap.xml` estático y obsoleto** (55 URLs, lastmod 2026-03-17) coexiste con el sitemap generado (282 URLs) y se copia a `dist/sitemap.xml`. No está referenciado en robots, pero es basura confusa que contradice al real · `public/sitemap.xml`.
- **Inconsistencia de estadísticas:** `Hero.astro` `defaultStats` dice **"10+ Años"** mientras Footer/copy dice **"30+ años"** y "+3,000 eventos" (el git log dice que se "unificó a 30 años" pero el default del Hero quedó en 10+) · `src/components/Hero.astro` líneas ~31-33.
- **`schema-redeil.json` huérfano** en `public/` (14 KB, esquemas LocalBusiness/Product/etc.) — no se enlaza desde ninguna página; residuo de iteración previa · `public/schema-redeil.json`.
- **Reseñas/ratings probablemente sintéticos** repetidos en schema `Product`/`Review` y textos de `TestimonialCards` con los mismos nombres ("Sofía Ramírez", "Diego Herrera", "Patricia Vega") en múltiples paquetes → riesgo de penalización por review spam · `servicios/cabezas-moviles/paquete-show-basico.astro` y patrón replicado.
- **robots bloquea TODOS los crawlers de IA** incluido Google-Extended — decisión legítima pero limita visibilidad en respuestas de IA/AI Overviews · `public/robots.txt`.
- **`img.backup/` versionado** (duplica `/img/`, infla el repo) · `public/img.backup/`.

### 🤖 Automatizable
- Generación de las **96 sub-páginas de paquete** (hoy escritas a mano, una por archivo) → deberían derivarse de datos (colección `paquetes` o JSON por servicio) con un único `[servicio]/[paquete].astro`, como ya se hace con el directorio · `src/pages/servicios/*/paquete-*.astro`.
- Generación de las **25 páginas de zona** desde datos (lat/long, alcaldías colindantes) en vez de 25 `.astro` casi idénticos · `src/pages/zonas/*.astro`.
- Unificar el **blog en una sola fuente de verdad** (colección `.md`) y autogenerar listado/paginación/relacionados desde frontmatter, eliminando los 128 `.astro` + `blog-articles.ts` paralelo · `src/pages/blog/*.astro`, `src/data/blog-articles.ts`.
- **Conversión de imágenes a AVIF** integrada al build (hoy scripts sueltos `optimize_avif.*` corridos a mano) · `optimize_avif.mjs`.
- **Validación pre-commit** de slugs duplicados, links rotos y schema (el git log muestra fixes manuales masivos de "236 enlaces rotos", "128 títulos") — automatizable como CI check.

### 📐 Estandarizable
- **Tokens duplicados** entre `style.css` (`:root`) y el critical CSS inline de `BaseLayout` → fuente única de tokens (riesgo de divergencia) · `src/layouts/BaseLayout.astro` vs `public/css/style.css`.
- **Schema BreadcrumbList:** una sola fuente (eliminar el de `Breadcrumbs.astro` o el de `BaseLayout`) y estandarizar el patrón para todos los proyectos · `src/components/Breadcrumbs.astro`.
- **`CtaBar` importado pero no usado** en múltiples páginas (import muerto) → limpiar o estandarizar su inclusión · `servicios/cabezas-moviles.astro`, `BlogLayout.astro`, `directorio/[...slug].astro`.
- **Patrón de página de servicio** (frontmatter title/desc/canonical/schema + Hero+Gallery+Pricing+FAQ+CTA) es muy repetitivo y consistente → candidato a plantilla/snippet canónico de la fábrica.
- **Componente WhatsApp/contacto:** los `wa.me`, `tel:` y mensajes están hardcodeados en docenas de sitios; centralizar en config (como ya hace `topbar.md`) · `Footer.astro`, `Hero.astro`, fichas, FaqSection.
- **Nomenclatura de marca de proyecto** ("OrigenLab Standard" / "Origenlab Standard" aparece inconsistente en comentarios) · `TopBar.astro`, `FaqSection.astro`.

## ⚠️ HUECOS
- **Token de GitHub expuesto:** `.git/config` (remote origin) contiene un token `gho_...` en texto plano en la URL del remoto. ⚠️ Riesgo de seguridad real — debería rotarse y migrarse a credential helper. (Evidencia: salida de `git remote -v`.)
- **n8n / Brevo / fal.ai:** sin evidencia en el repositorio. No puedo confirmar ni negar su uso fuera del código (podrían operar en infraestructura externa: webhooks, formularios server-side, generación de imágenes offline). HUECO por falta de artefactos en el repo.
- **Backend del formulario `/contacto/`:** no muestreé el cuerpo completo de `contacto.astro`; no se identificó proveedor de envío de email (¿Formspree/Brevo/n8n/Netlify forms?). HUECO: requiere leer `src/pages/contacto.astro` completo.
- **`dist/` desincronizado vs fuente:** el build commiteado tiene 288 HTML y `lastmod` viejos (2026-03-17) frente a `src/` con 304 `.astro`; el `dist/` versionado puede no reflejar el estado actual (aunque `.gitignore` ignora `dist`, hay una copia presente en el árbol de trabajo). No verifiqué si el `dist/` actual es el desplegado.
- **Imágenes IA:** `REPORTE-IMAGENES-GENERADAS.md` sugiere generación de imágenes (posible fal.ai u otro), pero no hay integración en el repo; HUECO sobre la herramienta exacta.
- **Discrepancia conteo blog:** `blog-articles.ts` lista 121 artículos, hay 128 `.astro` + 10 `.md`, pero solo 89 HTML en `dist/blog/`. No reconcilié exactamente qué entradas del listado apuntan a páginas inexistentes (posibles links rotos en el índice del blog). HUECO: requiere cruce 1:1 listado↔archivos↔dist.
