# Diagnóstico — CLINICADEBELLEZA

> Propósito: Sitio-catálogo SEO de servicios de una clínica de belleza con respaldo médico (CLIBEL) en CDMX — medicina estética, depilación láser, faciales, corporales y capilares — en Astro 5 estático con 21 fichas de servicio en Content Collection y un template editorial L4 schema-driven de gran profundidad. La conversión es por WhatsApp / formulario, sin e-commerce.

## Identidad
- **Negocio/dominio:** CLIBEL — "Clínica de Belleza con Respaldo Médico" en CDMX (`src/consts.ts:5-19`). Fundada en 1981 (`founded: '1981'`), reclama "45 años" y respaldo COFEPRIS (`cofepris: '253300891A0XXXX'` — placeholder). **⚠️ Conflicto de dominio:** el CNAME y `astro.config.mjs:7` apuntan a `clinicadebelleza.com.mx`, pero `consts.ts:14`, `SEO.astro`, `robots.txt` y todos los schemas usan `https://www.clibel.com.mx`. El sitio se construye con `site` = clinicadebelleza pero todas las URLs canónicas/OG/sitemap se generan contra clibel.com.mx → canonicals y sitemap apuntarían a un dominio distinto del de deploy. Ver HUECOS.
- **Tipo de sitio:** Catálogo de servicios + blog informacional (no e-commerce: sin carrito ni pago; conversión vía WhatsApp/formulario/teléfono). Evidencia: `ServiceLayout.astro:74` (CTAs solo a `/contacto` y `wa.me`), no hay backend de formulario detectado (`src/pages/contacto.astro` existe pero sin endpoint en repo — ver HUECOS).
- **ARQUETIPO: C — servicio profesional local** (con fuerte ejecución estilo A). Justificación: negocio de servicios presenciales localizados (CDMX, 2 sucursales en `consts.ts:BRANCHES`), schema raíz `BeautySalon + MedicalBusiness + LocalBusiness` con `LocalBusiness`, `geo`, `openingHoursSpecification`, `areaServed` y `aggregateRating` (`BaseLayout.astro:25-105`), Local SEO explícito (`SEO.astro:75-79` geo.region/placename/position MX-CMX). La jerarquía Home → catálogo `/servicios` → categoría L3 → servicio L4 y las 21 fichas de servicio en Content Collection le dan acabado de catálogo técnico (rasgo A), pero el núcleo del negocio es servicio profesional local con captación por proximidad → **C primario, A secundario**.
- **Estado:** En desarrollo avanzado, NO listo para producción. Datos de contacto son placeholders (`CONTACT.phone: '+52 55 0000 0000'`, `whatsapp: '525500000000'`, direcciones "Av. Reforma 000"/"Masaryk 000" — `consts.ts:21-49`). El propio `README.md:Próximos pasos` lista "reemplazar consts con datos reales / subir imágenes / conectar Analytics / configurar dominio". El vault marca L3 como "1/5" categorías terminadas (`docs/00 - Index.md:19`). Build reciente (`.astro/` 14-may), pero sin `dist/` versionado.

## Stack
- **Astro 5** (`package.json:11` → `"astro": "^5.1.0"`). Coincide con el vault (`docs/00 - Index.md:9` "Astro 5"). Loader `glob()` moderno (Content Layer v5).
- **Output estático** (sin `output` declarado = default `static`), `trailingSlash: 'ignore'`, `prefetch` con `prefetchAll: true` + `defaultStrategy: 'viewport'`, `inlineStylesheets: 'auto'`, `compressHTML: true`, assets en `_assets` (`astro.config.mjs:9-30`).
- **Integrations:** `@astrojs/mdx`, `@astrojs/sitemap` (i18n es-MX, changefreq weekly, priority 0.8). `@astrojs/rss` está en deps y se usa en `src/pages/rss.xml.ts` aunque no se registra como integration (correcto, rss es módulo).
- **CSS: Tailwind v4** vía plugin de Vite `@tailwindcss/vite` (`astro.config.mjs:32-34`, `package.json:13-15`), con `@theme {}` en `src/styles/global.css` (CSS-first config, sin `tailwind.config.js`). 372 líneas de design system + utilidades custom (`.btn`, `.card`, `.kicker`, `.container-x`).
- **Imágenes:** `astro:assets` + `sharp` (servicio sharp explícito en `astro.config.mjs:25-28`).
- **TypeScript** strict (`tsconfig.json` extiende `astro/tsconfigs/strict`) con alias `@/`, `@components/`, `@layouts/`, `@styles/`, `@content/`.
- **Adapter:** ninguno (100% estático).
- **Deploy: GitHub Pages** vía `.github/workflows/deploy.yml` (Node 20, `npm ci` + `npx astro build` + `upload-pages-artifact` + `deploy-pages`). Coherente con CNAME en raíz.

## Estructura de carpetas
```
CLINICADEBELLEZA/
├── astro.config.mjs · tsconfig.json · package.json · CNAME · README.md
├── CLIBEL_Estudio_de_Mercado.docx        ← estudio de mercado (binario)
├── .github/workflows/deploy.yml          ← CI GitHub Pages
├── src/
│   ├── consts.ts                         ← SITE/CONTACT/SOCIAL/NAV/CATEGORIES/STATS/PROCESS/ADVANTAGES/SECTORS/PARTNERS/BRANCHES/FAQ_ITEMS + helpers catHref()
│   ├── content.config.ts                 ← esquemas Zod (servicios, blog) — loader glob()
│   ├── components/   26 .astro
│   ├── layouts/      BaseLayout.astro · ServiceLayout.astro (2)
│   ├── content/      servicios/ (21 .md) · blog/ (3 .md)
│   ├── pages/        index · 6 estáticas (nosotros, equipo, contacto, tecnologia, aviso-de-privacidad, 404) + servicios/ (index + [...slug] + 5 landing L3) + blog/ (index + [...slug]) + rss.xml.ts
│   └── styles/       global.css (372 L, design system v2)
├── public/           favicon.svg · robots.txt   ⚠️ falta og-default.jpg e /img/*
└── docs/             ← VAULT OBSIDIAN (.obsidian/ + 14 .md numerados 00–13)
```
⚠️ HUECO: `public/` solo tiene `robots.txt` + `favicon.svg`. `SITE.defaultImage = '/og-default.jpg'` y todas las `CATEGORIES[].image` (`/img/cat-*.jpg`) apuntan a imágenes inexistentes → OG y cards de categoría sin imagen real.

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout.astro` | `src/layouts/BaseLayout.astro` (143 L) | **Raíz** — único layout base | `title*`, `description?`, `image?`, `type?('website'\|'article')`, `publishedAt?`, `canonical?`, `noindex?`, `hideHeader?` | TODAS las páginas. Compone `<head>` (preconnect Google Fonts: Fraunces+Inter; theme-color `#8B5A6B`) + `<SEO>` + **1 JSON-LD `BeautySalon/MedicalBusiness/LocalBusiness`** completo (geo, hours, areaServed, hasOfferCatalog con 5 categorías, aggregateRating 4.9/500, sameAs) + `TopBar` + `Header` + `<slot/>` + `Footer` + `WhatsAppFloat` + `RevealScript`. |
| `ServiceLayout.astro` | `src/layouts/ServiceLayout.astro` (**4386 L** — CSS inline masivo) | **extiende `BaseLayout`** | ~30 props (slug, title, description, category, duration, sessions, price, benefits, indications, contraindications + 10 bloques editoriales opcionales: `protocolSteps`, `timeline`, `preCare`, `postCare`, `faqs`, `comparison`, `modalities`, `clinicalCases`, `treatmentZones`, `myths`, `commitments`, `safetyProtocol`) | Solo `pages/servicios/[...slug].astro` (L4). Template editorial: Breadcrumb → Hero 2-col → HeroNavBar (siblings) → Sticky TOC scroll-spy → Cap I Resumen (body 2-col: prose + sidebar 6 widgets) → secciones condicionales (Casos clínicos, Mitos, Compromisos, Protocolo seguridad, Zonas, Modalidades, Comparativa, Protocolo paso a paso, Timeline) → Pre/Post → FAQ → RelatedCategories. Emite 3 JSON-LD adicionales: `BreadcrumbList`, `MedicalProcedure`, `FAQPage` condicional. |

Solo 2 layouts. La variación visual L1/L2/L3 vive en cada página con `<style>` scoped + utilidades de `global.css`; el L4 está fuertemente parametrizado por frontmatter.

## Componentes — inventario
26 componentes `.astro` en `src/components/`. Representativos (tienen `interface Props`; el resto consumen `consts.ts` directamente y no toman props):

| Componente | Ruta | Props clave | Uso |
|---|---|---|---|
| `SEO` | `components/SEO.astro` (74 L) | `title*,description?,keywords?,image?,type?,publishedAt?,canonical?,noindex?` | Invocado por `BaseLayout`. Title rule: `Inicio→SITE.longName`, resto `"{title} — CLIBEL CDMX"`. Emite OG completo + Twitter + geo MX-CMX. |
| `Hero` | `components/Hero.astro` (238 L) | sin props (lee consts) | Home. Hero principal. |
| `HeroButtons` | `components/HeroButtons.astro` (122 L) | sin props | Home, debajo del Hero (botones separados del hero). |
| `HeroNavBar` | `components/HeroNavBar.astro` (242 L) | `links*[],cta?,label?,ariaLabel?,variant?(cream\|white\|dark)` | Barra de navegación tipográfica entre secciones (siblings/categorías). Usada en L2/L3/L4. **Patrón de interlinking canónico.** |
| `Breadcrumb` | `components/Breadcrumb.astro` (190 L) | `items*[],kicker?,variant?(cream\|white\|dark)` | L2/L3/L4 (visual; el JSON-LD lo emiten las páginas). |
| `SectionHeader` | `components/SectionHeader.astro` (156 L) | `kicker*,title*(HTML),paragraphs?[],cta?,variant?(light\|dark),marginBottom?` | Encabezado editorial reutilizable en casi todas las secciones. **Componente más reutilizado.** |
| `ServiceCard` | `components/ServiceCard.astro` (303 L) | `href*,title*,description*,category*,duration?,sessions?,icon?,featured?,benefits?` | Grids de servicios (L2/L3). |
| `ServicesGrid` | `components/ServicesGrid.astro` (35 L) | `category?,featuredOnly?,limit?` | Wrapper que filtra colección `servicios` y renderiza `ServiceCard`. |
| `RelatedCategories` | `components/RelatedCategories.astro` (224 L) | `current*,recommend?[],variant?(cream\|white)` | Pre-footer cross-linking entre categorías. |
| `FAQ` | `components/FAQ.astro` (59 L) | `items?[],title?` | Acordeón. |
| `CTA` | `components/CTA.astro` (52 L) | `title?,subtitle?,primaryHref?,primaryLabel?` | Banner CTA. |
| `WhatsAppFloat` | `components/WhatsAppFloat.astro` (17 L) | sin props (lee `CONTACT.whatsapp`) | Global (BaseLayout). Botón flotante `#25D366`, `wa.me` con mensaje predefinido. |
| `Header` | `components/Header.astro` (979 L) | sin props | Global. Mega-menú 5 categorías + drawer móvil. |
| `Footer` | `components/Footer.astro` (672 L) | sin props | Global. Footer editorial sin iconos, numeración 01-05. |

Resto (consumen consts, sin props): `TopBar`, `CatalogShowcase` (313 L), `PartnersMarquee`, `WhyClibel` (202 L), `Process` (407 L), `SectorsAudience`, `Testimonials`, `BlogPreview`, `FAQContact`, `CategoryStrip`, `Features`, `RevealScript` (IntersectionObserver para `.reveal`).

## Content Collections / esquemas / taxonomías
Definidos en `src/content.config.ts` con loader `glob()` (API v5):

**Colección `servicios`** (`base: ./src/content/servicios`, 21 .md):
- Campos base: `title*`, `description*`, `category*` (enum **cerrado**: `facial | corporal | laser | medicina-estetica | capilar`), `duration?`, `sessions?`, `price?`, `icon?`, `image?`, `benefits[]`, `indications[]`, `contraindications[]`, `featured`, `order`, `publishedAt`.
- **10 bloques editoriales opcionales tipados** que alimentan secciones condicionales del L4: `seoTitle/seoDescription`, `heroLede/heroTagline`, `protocolSteps[{n,title,text}]`, `timeline[{when,label,text}]`, `preCare[]/postCare[]`, `faqs[{q,a}]`, `comparison[{aspect,home?,spa?,clibel}]`, `modalities[{name,kicker?,profile?,text,intensity?,downtime?}]`, `clinicalCases[{name,profile,duration?,plan[],target,accent?}]`, `treatmentZones[{name,kicker?,sessions?,text,accent?}]`, `myths[{myth,reality}]`, `commitments[{title,text,weight?}]`, `safetyProtocol[{title,text,kind?}]`. Contenido real muy poblado: la mayoría de las fichas usan 8-10 de estos bloques (`tratamiento-capilar.md` usa 10; solo `limpieza-facial-profunda.md` usa 3).
- **Taxonomía:** 5 categorías cerradas, espejadas en `consts.ts:CATEGORIES` (con label, slug, short, description, icon emoji, image, badge, 6 items de submenú c/u). Mapa `CATEGORY_LANDING_PAGES` + helper `catHref()` resuelve categoría→landing L3 o fallback a ancla `/servicios#<slug>`.

**Colección `blog`** (`base: ./src/content/blog`, 3 .md): `title*`, `description*`, `publishedAt*`, `updatedAt?`, `author(='Equipo CLIBEL')`, `image?`, `tags[]`, `draft`.

## SEO real
- **Metas:** `SEO.astro` emite title dinámico, description, keywords, author/publisher, canonical (`new URL(canonical ?? pathname, Astro.site)`), robots (index/noindex con `max-image-preview:large`), OG completo (type, title, desc, url, image 1200×630, site_name, locale es_MX, `article:published_time` condicional), Twitter `summary_large_image`, **geo/Local SEO** (geo.region MX-CMX, geo.placename, geo.position, ICBM), content-language es-MX.
- **Schema (JSON-LD):**
  - `BeautySalon + MedicalBusiness + LocalBusiness` global en **todas** las páginas (`BaseLayout.astro:25-105`): `@id #clinic`, geo, openingHours, areaServed (CDMX+EdoMex), priceRange `$$`, foundingDate, knowsAbout (13 temas), hasOfferCatalog (5 categorías), aggregateRating 4.9/500, sameAs (IG/FB/TikTok/YT).
  - L4 (`ServiceLayout`): `BreadcrumbList` + `MedicalProcedure` (con bodyLocation, preparation/followup derivados de pre/postCare, performer→#clinic) + `FAQPage` condicional.
  - L3 (`tratamientos-faciales/index.astro`): `BreadcrumbList` + `MedicalSpecialty` con `hasOfferCatalog` de `MedicalProcedure` por servicio, `provider→#clinic`, `relevantSpecialty: Dermatology`.
- **URLs:** SEO-friendly con keyword completa (`/servicios/tratamientos-faciales` no `/faciales`; slugs de servicio descriptivos). `trailingSlash: 'ignore'`.
- **Internal linking:** denso y deliberado — `HeroNavBar` (siblings + CTA categoría), `RelatedCategories` (cross-categoría), sidebar de 6 widgets en L4 (related siblings, otras categorías, contacto), bloque SEO editorial en Home con enlaces a las 5 categorías, `editorialLedes` por L4 en páginas L3. **Punto fuerte del proyecto.**
- **Sitemap:** `@astrojs/sitemap` → `/sitemap-index.xml` (referenciado en `<head>` y robots). **robots.txt** permite todo + Sitemap. ⚠️ Ambos apuntan a `www.clibel.com.mx` (ver conflicto de dominio).

## Sistema de diseño
- **Tokens** en `src/styles/global.css` `@theme {}` (Tailwind v4 CSS-first), documentados en `docs/02 - Sistema de diseño.md`:
  - **Paleta:** brand 50–600 (cremosos + champagne gold `#C9A961`), mauve 300/500/700 (primary brand `#8B5A6B`), ink 300–900 (tipografía). Fondo body `brand-50`, texto `ink-800`.
  - **Tipografía:** display `Fraunces` (serif, 300–700 + italic, cargada de Google Fonts), sans `Inter`. Titulares con `em` italic → mauve-500. Kickers uppercase tracking 0.18–0.24em.
  - **Radios:** `--radius-card: 1.25rem`, `--radius-pill: 999px`. **Sombras** card base + hover translateY(-6px) definidas.
  - **Container fluido full-width:** `--max-w: 100%`, `--gutter-x: clamp(1.25rem,3.5vw,4rem)`; clases `.container-x` / `.container-wide` / `.container-narrow` (72ch para texto largo).
- **UI base:** `.btn` (+ `-primary` mauve, `-gold`, `-outline`, `-ghost`, `-dark`), `.card` / `.card-glass` (glassmorphism con backdrop-filter), `.kicker` / `.kicker-line` (con línea gradiente).
- **Hero:** dos patrones — `Hero.astro` (home) + `ServiceLayout` hero 2-col (headline + lede + meta dl + acciones | bloque "Qué hace CLIBEL"). **Cards:** `ServiceCard`. **CTA:** `CTA.astro` + CTAs inline en widgets. **WhatsApp:** `WhatsAppFloat` global. **Breadcrumbs:** `Breadcrumb.astro` (3 variantes). **Filosofía declarada:** "Editorial / clínico / lujoso; numeración italic Fraunces en vez de iconos" (`docs/02:54`).

## Convenciones
- Datos del sitio centralizados en `src/consts.ts` (NAP, redes, categorías, stats, proceso, FAQ, sucursales) tipados `as const`.
- Páginas dinámicas vía `getCollection` + `getStaticPaths` (`servicios/[...slug].astro:5-11`).
- Alias TS `@components/`, `@layouts/`, etc. (definidos pero las páginas usan rutas relativas en la práctica).
- Schemas JSON-LD construidos inline en cada página/layout (no centralizados en un helper).
- Slugs = `entry.id` (nombre de archivo MD). Categorías como enum cerrado espejado en Zod + consts.
- `.reveal` + `RevealScript` (IntersectionObserver) para animaciones de entrada.
- Variantes de componente por prop `variant` (`cream | white | dark`) — patrón consistente en Breadcrumb/HeroNavBar/SectionHeader/RelatedCategories.

## Flujos / procesos
- **Conversión:** sin compra online. Toda CTA lleva a `/contacto` o a `wa.me/<whatsapp>?text=...` con mensaje contextual (incluye nombre del tratamiento en L4). Proceso de paciente documentado en `consts.ts:PROCESS` (4 pasos: diagnóstico → plan → procedimiento → seguimiento).
- **Build/deploy:** push a `main` → GHA build → GitHub Pages. Sin gates de QA/lint en el workflow (a diferencia de MEDEDUL).

## Integraciones
- **GitHub Actions:** ✅ `deploy.yml` (build + deploy a GitHub Pages, Node 20).
- **Cloudflare / n8n / fal.ai / Brevo:** ⚠️ HUECO — sin evidencia en el repo. No hay `_headers`/`_redirects`/`wrangler`, ni workflows de automatización, ni endpoint de formulario. El formulario de contacto (`pages/contacto.astro`) existe pero no se detectó action/servicio de envío en el repo (a verificar dentro del archivo).
- **Analytics/Pixel:** ⚠️ HUECO — `README.md` lo lista como pendiente ("conectar Google Analytics / Meta Pixel en BaseLayout"); no hay script de analytics en `BaseLayout`.

## Documentación previa (vault propio)
**Sí — vault de Obsidian en `docs/`** (`.obsidian/` config + 14 notas .md numeradas 00–13, frontmatter con tags/project/updated). Cobertura:
- `00 - Index` (mapa L1–L4, resumen de estado, jerarquía), `01 - Stack y convenciones`, `02 - Sistema de diseño` (tokens/paleta/tipografía/filosofía — **muy reutilizable** como base del design-system maestro), `03 - Estructura de componentes`, `04 - Páginas y rutas`, `05 - Contenido (Content Collections)`, `06 - Menú y navegación`, `07 - Hero y patrones de cabecera`, `08 - SEO y schema.org`, `09 - Pendientes y siguientes pasos`.
- **Notas de captura de layout (valiosas para patrones):** `10 - Layout final servicios` (L2), `11 - Layout L3 categoría`, `12 - Layout L4 servicio individual` (22 KB — documenta los 6 capítulos romanos I–VI, sticky TOC, sidebar 6 widgets), `13 - Layout L3 evolucionado` (spotlight + interlinking denso + humanización).
- **Reutilizable para el sistema maestro:** la nota 02 (design system), 08 (SEO/schema patterns por tipo de página) y 12/13 (anatomía de los templates L3/L4 schema-driven) son directamente trasladables a `04 - Diseño y UX`, `03 - SEO Master System` y `08/09 - Bibliotecas`.

## Clasificación

### ✅ Bien resuelto / canónico
- **L4 schema-driven editorial** (`ServiceLayout.astro` + 10 bloques opcionales en `content.config.ts`): una sola plantilla genera fichas clínicas ricas y diferenciadas por frontmatter, con TOC scroll-spy y sidebar de interlinking. Patrón de referencia para fichas de servicio/producto.
- **Centralización de datos en `src/consts.ts`** (NAP, categorías, proceso, FAQ, sucursales) tipado `as const` + helper `catHref()` — fuente única de verdad limpia.
- **Schema/JSON-LD por tipo de página** (`BeautySalon/LocalBusiness` global + `MedicalProcedure`/`MedicalSpecialty`/`FAQPage`/`BreadcrumbList` por ruta) — `BaseLayout.astro:25-105`, `ServiceLayout.astro:97-130`.
- **Sistema de diseño tokenizado** Tailwind v4 CSS-first con filosofía editorial documentada (`global.css` + `docs/02`).

### ❌ Roto / a corregir
- **Conflicto de dominio** `clinicadebelleza.com.mx` (CNAME + `astro.config.site`) vs `www.clibel.com.mx` (consts/SEO/robots/schemas/sitemap) → canonicals, OG y sitemap se generan contra un dominio que no es el de deploy (`astro.config.mjs:7` vs `src/consts.ts:14`).
- **Datos placeholder en producción potencial:** teléfono/WhatsApp `0000`, direcciones "000", COFEPRIS `XXXX` (`src/consts.ts:21-49`) — el sitio no es publicable tal cual.

### 🤖 Automatizable
- Generación de fichas de servicio: dado que el L4 es 100% data-driven por frontmatter Zod, las 21 fichas (y futuras) son candidatas a generación asistida por IA con esquema fijo (n8n/fal.ai → MD con los 10 bloques) — `content.config.ts:3-110`.

### 📐 Patrón reutilizable
- **HeroNavBar + RelatedCategories + sidebar de 6 widgets** como sistema de interlinking interno para arquetipos C/A (`HeroNavBar.astro`, `RelatedCategories.astro`, `ServiceLayout.astro:412-578`) — replicable en cualquier catálogo de servicios local.

## ⚠️ HUECOS
- **Dominio inconsistente** (descrito arriba): definir clibel.com.mx vs clinicadebelleza.com.mx y unificar `astro.config.site` + CNAME + `consts.url`.
- **Assets faltantes:** `public/` no contiene `og-default.jpg` ni `/img/cat-*.jpg` referenciadas en `consts.ts:CATEGORIES` y `SITE.defaultImage` → OG y tarjetas de categoría sin imagen.
- **Formulario de contacto sin backend evidente:** `pages/contacto.astro` existe pero no se confirmó endpoint/servicio de envío en el repo (¿Formsubmit/Brevo/n8n?). A verificar dentro del archivo.
- **Sin analytics/pixel** conectado (pendiente declarado en README).
- **L3 incompleto:** vault declara "1/5" categorías L3 terminadas (`docs/00:19`); existen los 5 `index.astro` de categoría pero con distinto grado de evolución (`tratamientos-faciales` es el más completo).
- **Datos de negocio placeholder** (NAP/COFEPRIS) — bloquean publicación.
- **Seguridad:** ✅ sin tokens/credenciales expuestos (grep de `gho_`, `sk-`, `api_key`, `SECRET`, `Bearer`, `AKIA` en `.astro/.ts/.js/.mjs/.json/.yml/.css` → 0 hallazgos).
