# Diagnóstico — INFIELMX

> Propósito: auditoría forense del sitio Astro de INFIEL MX (directorio nacional + agencia de investigación privada de infidelidad), con evidencia archivo:línea y mapeo de huecos para alimentar el sistema de patrones canónicos.

## Identidad

- **Negocio**: INFIEL MX — investigación privada especializada en infidelidad de pareja. Evidencia: `package.json:6` (`"description": "INFIEL MX — Investigación privada especializada en infidelidad de pareja"`), `src/lib/consts.ts:7-9` (`name: 'INFIEL MX'`, `legalName: 'INFIEL MX · Investigaciones Privadas'`, `tagline: 'La verdad, documentada.'`).
- **Dominio (CONFLICTO — confirmado)**: tres fuentes, dos valores distintos.
  - `astro.config.mjs:7` → `site: 'https://infiel.mx'` (con punto).
  - `wrangler.toml:7` → `PUBLIC_SITE_URL = "https://infielmx.com"` (sin punto).
  - `src/lib/consts.ts:14` → `url: 'https://infielmx.com'` (sin punto) — **esta es la fuente real que consume todo el sitio** (BaseLayout, schema, canonical, sitemap de robots).
  - Repo git remoto: `origin https://github.com/Origenlab/infiel.mx.git` (evidencia: `git remote -v`).
  - **Veredicto**: el dominio operativo es `infielmx.com` (consts + wrangler + canonical + robots). `astro.config.mjs:7` (`infiel.mx`) es el **outlier obsoleto**. Hay historial de corrección parcial: commit `c684232 "fix: corregir site URL y eliminar i18n del sitemap"`, pero la corrección no llegó a `astro.config.mjs`. Esto rompe el cálculo de URLs absolutas del sitemap de Astro (que usa `site`), mientras canonical/OG/schema (que usan `SITE.url`) sí apuntan a `infielmx.com`. Inconsistencia activa → ver ❌.
- **Tipo de sitio**: híbrido **directorio vertical (marketplace de demanda) + agencia de servicios propios**. La home NO vende solo servicios INFIEL MX: vende un directorio de 6 categorías profesionales con verificación de 4 niveles y membresías supply-side (`src/pages/index.astro:255-421`, `src/data/directory.ts`). Los servicios propios (6) y paquetes (6) coexisten como una de las verticales.
- **ARQUETIPO: D (contenido-directorio) con fuerte capa C (servicio local) — primario D.** Justificación con evidencia:
  - Directorio con taxonomía de categorías + perfiles + ciudades: `src/data/directory.ts:19-150` (6 CATEGORIES con `subcategories`, `count`, `priceFrom`), `src/pages/directorio/[slug].astro` (hub por categoría con cobertura por estado, filtro client-side, ProfileCard), `src/data/profiles/investigacion-privada-cdmx.ts` (10 perfiles verificados de terceros).
  - Membresías de anunciantes (supply-side marketplace): `src/data/directory.ts:216-279` (MEMBERSHIPS: Verificado $499, Profesional $1,499, Elite $2,499) renderizadas en `index.astro:399-412`.
  - Volumen editorial directorio-típico: **45 artículos MDX** de blog (muchos hyper-local "detective-privado-{colonia/zona}", evidencia: `src/content/blog/detective-privado-polanco-miguel-hidalgo.mdx`, `...-roma-condesa-cuauhtemoc.mdx`, etc.).
  - Capa C local: cobertura geográfica por estado/ciudad (`directory.ts:536-542` CITIES_PHASE_1; `directorio/[slug].astro:214-385` grid de 32 estados; páginas locales planas `src/pages/directorio/investigacion-privada-cdmx.astro` + 4 más).
  - Por qué NO A/B: no es catálogo técnico de productos ni renta de equipos; el inventario es de *profesionales* y *contenido*, no de SKUs.
- **Estado del proyecto**: **avanzado / pre-lanzamiento, mayormente completo.** 21 páginas `.astro`, 30 componentes, 45 posts, schema rico, vault de docs completo. Roadmap en `README.md:88-98` marca como pendientes: integración Cal.com, formulario→Resend/Formspree (✗), portal cliente. Quedan placeholders de contacto y un formulario sin backend (ver ❌). Git activo (último commit `69a5526` sobre copy de Hero).

## Stack

- **Astro** `^4.16.18` — `package.json:22`. Output `static`, sin SSR (`astro.config.mjs:9`).
- **trailingSlash** `'never'` — `astro.config.mjs:8`.
- **prefetch** `{ prefetchAll: false, defaultStrategy: 'hover' }` — `astro.config.mjs:10-13`.
- **Integrations declaradas en config**: solo `@astrojs/tailwind` (`applyBaseStyles: false`) y `@astrojs/mdx` (Shiki `github-dark-dimmed`, `wrap: true`) — `astro.config.mjs:14-22`. **`@astrojs/sitemap` NO está en el array de integrations** pese a estar en `package.json:20` (ver ❌, conflicto sitemap).
- **Dependencias** (`package.json:16-32`): `@astrojs/check ^0.9.4`, `@astrojs/mdx ^3.1.9`, `@astrojs/rss ^4.0.9`, `@astrojs/sitemap ^3.2.1`, `@astrojs/tailwind ^5.1.4`, `tailwindcss ^3.4.17`, `typescript ^5.7.3`, dev: `@tailwindcss/typography ^0.5.16`, `prettier ^3.4.2` + `prettier-plugin-astro`, `prettier-plugin-tailwindcss`, `wrangler ^3.99.0`.
- **astro-icon**: `astro.config.mjs:30` declara `vite.ssr.noExternal: ['astro-icon']`, **pero `astro-icon` NO figura como dependencia en `package.json`** y los íconos se sirven con una librería SVG inline propia (`src/components/Icon.astro:1-12`, objeto `paths` con ~21 íconos). Config vestigial → ver ❌.
- **CSS**: Tailwind 3.4.17 sin base styles + estilos propios. `tailwind.config.mjs` (raíz, 132 líneas) con `darkMode: 'class'`. Estilos en `src/styles/globals.css` (272 líneas, `@layer base/components`) + `src/styles/mobile.css` (overhaul responsive, importado al final). Plugin `@tailwindcss/typography` activo (`tailwind.config.mjs:130`).
- **TypeScript**: `tsconfig.json` extiende `astro/tsconfigs/strict`; alias `@/* @components @layouts @content @lib @styles` (`tsconfig.json:5-11`). `strictNullChecks: true`, `allowJs: true`.
- **Deploy**: Cloudflare Pages. `wrangler.toml`: `name = "infielmx"`, `compatibility_date = "2026-05-01"`, `pages_build_output_dir = "./dist"`. Script: `package.json:14` (`"deploy": "astro build && wrangler pages deploy ./dist --project-name=infielmx"`). `README.md:59-80` documenta deploy por repo conectado (Node 20) o Wrangler CLI.

## Estructura de carpetas

```
INFIELMX/
├── astro.config.mjs          # static · prefetch hover · tailwind+mdx (SIN sitemap) · site=infiel.mx (obsoleto)
├── tailwind.config.mjs       # paleta noir+blood · Space Grotesk · sombras blood/glow/deep
├── tsconfig.json             # strict + 6 alias
├── wrangler.toml             # CF Pages · vars con PLACEHOLDERS de contacto
├── package.json              # Astro 4 · scripts dev/build/deploy
├── README.md                 # stack + setup + roadmap (Cal.com/Resend pendientes)
├── public/
│   ├── _headers              # CSP + HSTS + X-Frame + cache (gtm/cal.com/analytics whitelisted)
│   ├── _redirects            # 6 redirects 301 (/home, /faq, /privacidad…)
│   ├── robots.txt            # Allow / · Disallow portal/admin/api · Sitemap → infielmx.com
│   ├── manifest.webmanifest  # PWA
│   ├── favicon.svg · og-image.svg · og-image.jpg
│   └── img/                  # AVIF: blog(15), casos(4), directorio(6), servicios(6), hero, og + MANIFEST.md
├── docs/                     # VAULT OBSIDIAN PROPIO (00–08 + L2 + per-component/page) · .obsidian/
│   └── INFIEL_MX_Estudio_Ejecutivo_de_Mercado.docx   # (no leído — fuente estratégica)
└── src/
    ├── layouts/              # BaseLayout.astro · ArticleLayout.astro (2)
    ├── components/           # 30 .astro (Hero, ServiceCard, PackageCard, CaseCard, ProfileCard, FAQ, ContactForm, WhatsAppFloat, QuickExit, Breadcrumbs, Nav, Footer, TopBar, TrustBadges, BlogSidebar…)
    ├── pages/                # 21 .astro + rss.xml.ts
    │   ├── index.astro       # home directorio (10 secciones N°001–010)
    │   ├── servicios/        # index + [slug] (6 servicios)
    │   ├── directorio/       # index + [slug] + 5 páginas locales CDMX planas
    │   ├── blog/             # index + [slug]
    │   ├── paquetes/ casos/  # index cada uno
    │   ├── contacto · consulta-gratis · garantia · preguntas-frecuentes
    │   ├── aviso-de-privacidad · terminos · 404
    │   └── rss.xml.ts        # feed RSS
    ├── content/              # collections
    │   ├── blog/             # 45 .mdx
    │   ├── servicios/        # 6 .mdx
    │   ├── directorio/       # 6 .mdx
    │   ├── casos/            # 4 .json (data collection)
    │   └── config.ts         # 4 esquemas Zod
    ├── data/                 # arrays TS: directory.ts · faq.ts · profiles/*.ts (5)
    ├── lib/                  # consts.ts (fuente única de marca) · utils.ts
    ├── styles/               # globals.css · mobile.css
    └── env.d.ts              # tipos ImportMetaEnv (PUBLIC_*)
```

## Layouts — jerarquía

| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | raíz (`<html>`) | `title?`, `description?`, `ogImage?`, `noindex?`, `canonical?`, `bodyClass?`, `breadcrumbs?: Crumb[]`, `breadcrumbCurrent?` (`:14-23`) | Shell de TODO el sitio. Inyecta head/SEO, monta TopBar+Nav+Breadcrumbs+`<slot/>`+TrustBadges+Footer+WhatsAppFloat+QuickExit (`:119-138`). Slot `head` para schema extra (`:116`). |
| `ArticleLayout` | `src/layouts/ArticleLayout.astro` | extiende `BaseLayout` (`:2`, `:115`) | `title`, `description`, `date?`/`updated?`/`author?` (reservados, no se renderizan — "blog atemporal" `:13`), `category?`, `ogImage?`, `cover?`, `body?`, `slug?`, `tags?`, `pillar?` (`:10-25`) | Wrapper de artículos del blog. Renderiza Hero con copy SEO por categoría (`:54-87`), cover, barra de progreso de lectura (`:196-202`,`:274-290`), BlogSidebar, CTASection. Inyecta JSON-LD `Article` vía slot head (`:116-118`). |

## Componentes — inventario

(30 componentes en `src/components/`. Props extraídas de la interfaz `Props`/destructuring de cada archivo. Abierto 1 representativo por tipo según instrucción.)

| Componente | Ruta | Props | Uso |
|---|---|---|---|
| `Hero` | `components/Hero.astro` | `sectionNumber?`, `eyebrow?`, `title`, `highlight?`, `description?`, `kpis?: KPI[]`, `seoTagA/seoLead/seoTagB/seoBody?`, `bottomBarLabel?`, `exploreLabel?`, `exploreHref?`, `compact?`, `anchorId?` (`:21-52`) | Hero único de TODO el sitio. Patrón editorial 2 columnas 50/50: titular+KPIs izq, 2 párrafos SEO der (`set:html` permite HTML, `:163-167`). Variante `compact` para legales/404. **Pieza canónica más reutilizada.** |
| `ServiceCard` | `components/ServiceCard.astro` | (catálogo) `slug`, `href?`, `title`, `summary`, `icon`, `image`, `priceFrom`, `duration`, `highlight?`, `badgeLabel?`, `count?`, `durationLabel?`, `index?` | Card de categoría/servicio. Usada en home (`index.astro:269-285`) y en `directorio/[slug]` para servicios articulados. |
| `PackageCard` | `components/PackageCard.astro` | `name`, `slug`, `duration`, `price`, `description`, `features[]`, `bestFor`, `badge?`, `highlight?` | Card de paquete/membresía. Reutilizada para PACKAGES y MEMBERSHIPS (`index.astro:400-412`, `paquetes/index.astro`). |
| `CaseCard` | `components/CaseCard.astro` | `id`, `city`, `type`, `hypothesis`, `duration`, `outcome` | Expediente anonimizado. Consume colección `casos` (`index.astro:477-486`). |
| `ProfileCard` | `components/ProfileCard.astro` | `profile: DirectoryProfile`, `context` | Perfil de profesional verificado de terceros (supply). Solo activo hoy en categoría investigación-privada CDMX (`directorio/[slug].astro:540-542`). |
| `BlogCard` | `components/BlogCard.astro` | `title`, `slug`, `excerpt`, `date?`, `category`, `body?`, `cover?` | Card editorial. Calcula tiempo de lectura desde `body`. |
| `FAQ` | `components/FAQ.astro` | `items: {q,a}[]` | Acordeón FAQ. Reutilizado en home, servicios/[slug], directorio/[slug], preguntas-frecuentes. |
| `CTASection` | `components/CTASection.astro` | `eyebrow?`, `title`, `description`, `primaryCta?`, `secondaryCta?`, `variant?: 'navy'\|'cream'` (`:5-21`) | Bloque CTA final canónico (consulta + WhatsApp). Defaults a `/consulta-gratis` + `CONTACT.whatsappUrl`. |
| `ContactForm` | `components/ContactForm.astro` | (sin props) | Formulario de contacto con honeypot (`:90-92`) y aviso de privacidad. **Submit es PLACEHOLDER** (`:134-135`: `setTimeout(600)` simulado, sin endpoint). Ver ❌. |
| `WhatsAppFloat` | `components/WhatsAppFloat.astro` | (sin props) | Botón flotante WhatsApp (consume `CONTACT.whatsappUrl`, `:6`). `data-event="float_whatsapp"`. |
| `QuickExit` | `components/QuickExit.astro` | — | Salida rápida / modo discreto (montado en BaseLayout `:137`). Patrón propio del nicho sensible. |
| `Breadcrumbs` | `components/Breadcrumbs.astro` | `items?: Crumb[]`, `current?` | Migas con microdata Schema.org BreadcrumbList (`:99-129`); auto-deriva de URL si no recibe items (`:64-73`); mapa de labels amigables (`:23-48`). |
| `Nav` | `components/Nav.astro` | (sin props) | Header sticky con dropdowns generados desde `SERVICES`/`PACKAGES`/`CATEGORIES` (`:32-50`); drawer mobile. Documenta REGLA DE INTERLINKING (`:5-14`). |
| `Footer` | `components/Footer.astro` | (sin props) | Footer de 5 columnas + cobertura local + compliance; genera enlaces desde mismas fuentes (`:16-17`). Misma REGLA DE INTERLINKING. |
| `TopBar` | `components/TopBar.astro` | — | Barra superior de contacto. |
| `TrustBadges` | `components/TrustBadges.astro` | — | Strip de credenciales bajo cada hero; consume `getHeroStripChips()` (chips contextuales determinísticos, `consts.ts:456-497`). |
| `SectionHeading` | `components/SectionHeading.astro` | `sectionNumber?`, `eyebrow?`, `title`, `description?`, `seoTagA/seoLead/seoTagB/seoBody?` | Encabezado editorial de sección (gemelo del Hero). Pieza canónica. |
| `ProcessStep` | `components/ProcessStep.astro` | `step`, `title`, `description`, `isLast?` | Paso numerado de proceso. |
| `BlogSidebar` | `components/BlogSidebar.astro` | `currentSlug?`, `currentCategory?`, `currentTags?`, `suggestedServiceSlug?`, `withSearch/withCategories/withToc/withShare?`, `sticky?` | Sidebar del artículo (TOC, categorías, share). |
| `Icon` | `components/Icon.astro` | `name: IconName`, `size?`, `class?`, `strokeWidth?`, `label?` | Librería SVG inline propia, ~21 íconos (`:6-10`, `:32+`). Sin dependencias. |
| `Logo` | `components/Logo.astro` | `invert?` | Marca. |
| Otros (artículo/UI) | `KeyTakeaways`, `ArticleStats`, `ArticleCallout`, `ArticleFAQ`, `ArticleImage`, `InlineCTA`, `SignalCard`, `SignalsGrid`, `TestimonialCard` | varias | Componentes de soporte editorial (MDX) y patrones UI específicos del blog/landing. |

## Content Collections / esquemas / taxonomías

Definidas en `src/content/config.ts` (4 colecciones, Zod):

- **`blog`** (`type: 'content'`, `:3-17`): `title`, `description`, `date` (coerce), `updated?`, `author` (default 'Equipo INFIEL MX'), `category` enum **`['Señales','Digital','Decisiones','Metodología']`** (`:11`), `tags[]`, `cover?`, `draft` (default false), `pillar` (default false). **45 entradas** (`src/content/blog/*.mdx`).
- **`servicios`** (`type: 'content'`, `:19-100`): esquema rico — `title`, `description`, `icon`, `priceFrom: number`, `duration`, `order`, `seoTitle?/seoDescription?`, `cover?`, `heroEyebrow?`, `highlight?`, `tagline?`, `metrics?`, `pillars?`, `process?`, `deliverables?`, `targetAudience?`, `legalFramework?`, `notIncluded?`, `recommendedPackages?` (slugs), `relatedCases?` (ids), `relatedPosts?` (slugs), `faqFilter?`, `faq?`. **6 entradas** (infidelidad-pareja/digital/emocional, prenupcial-due-diligence, post-divorcio, monitoreo-preventivo). Frontmatter validado contra `src/content/servicios/infidelidad-pareja.mdx:1-30`.
- **`casos`** (`type: 'data'`, `:102-113`): `id`, `city`, `type`, `hypothesis`, `duration`, `outcome` enum `['confirmado','descartado','parcial']`, `notes?`. **4 entradas JSON** (caso-037/041/052/064). ⚠️ HUECO de volumen vs. claim "1,200+ casos".
- **`directorio`** (`type: 'content'`, `:123-207`): esquema más extenso — `title`, `description`, `icon`, `order`, `seoTitle?/seoDescription?`, `heroEyebrow?`, `highlight?`, `tagline?`, `duration?`, `specialties?` (con `priceRange`), `verificationFlow?`, `legalFramework?`, `crossSell?` (when/go/href), `relatedServices?`, `relatedPosts?`, `faq?`, `notIncluded?`, `cities?` (slug/name/state/capital/href/summary/profesionales/badge/status enum `['active','soon']`/coverage). **6 entradas** (las 6 categorías troncales).

**Taxonomías paralelas (no en collections, sino en TS estático):**
- `SERVICES`, `PACKAGES`, `TRUST`, `NAV`, `SOCIAL`, `CONTACT`, `SITE`, `HERO_STRIP_POOL`, `PROCESS`, `GUARANTEE`, `CITIES_PHASE_1` — `src/lib/consts.ts`.
- `CATEGORIES` (6), `VERIFICATION_LEVELS` (4), `MEMBERSHIPS` (3) — `src/data/directory.ts`.
- `FAQ_ITEMS` — `src/data/faq.ts`.
- Perfiles de directorio: `src/data/profiles/*.ts` (5 archivos, solo investigacion-privada-cdmx con 10 perfiles reales hoy).
- **Observación**: existe duplicación de fuente de verdad entre `SERVICES` (consts.ts) y la colección `servicios` (content/), reconciliada por `meta = SERVICES.find()` en `servicios/[slug].astro:34`. Patrón frágil → ver 📐.

## SEO real

- **Metas (BaseLayout `:46-90`)**: `<title>` compuesto (`fullTitle`, `:36-37`), `description`, `canonical` (`:56`), `robots noindex` condicional (`:57`), Open Graph completo (`og:type/site_name/title/description/url/image/locale`, `:60-66`), Twitter `summary_large_image` (`:69-72`), theme-color `#0A0A0A`, color-scheme dark, manifest+favicon, fuentes Google (Space Grotesk + JetBrains Mono, `:81-84`). Viewport con `viewport-fit=cover` (iOS safe-area).
- **Canonical**: `canonicalUrl` se calcula sobre `SITE.url` (`infielmx.com`), no sobre `Astro.url.origin` (`:39-41`). Coherente con dominio operativo.
- **JSON-LD / Schema.org (por @type y ruta)**:
  - `ProfessionalService` `@id .../#organization` — global, en `BaseLayout.astro:93-114`. Incluye name/legalName/url/logo/image/address/areaServed/priceRange. **`address` con PLACEHOLDERS**: `streetAddress: 'Av. Reforma 000'`, `postalCode: '06600'` (`:108-109`). Ver ❌.
  - `Article` — en cada `/blog/{slug}` vía `ArticleLayout.astro:90-105` y `:117`. **Atemporal** (sin `datePublished`/`dateModified` por decisión, `:89`). `url` hardcodea `https://infielmx.com/blog/${slug}` (`:104`).
  - `BreadcrumbList` — global vía microdata en `Breadcrumbs.astro:99-129` + JSON-LD (`:78-89`); además explícito en `directorio/[slug].astro:150-158`.
  - `Service` + `Offer` — en cada `/servicios/{slug}` (`servicios/[slug].astro:84-102`), con `provider @id #organization`, `areaServed` México, `Offer` MXN/price/InStock.
  - `FAQPage` — en `/servicios/{slug}` (`:104-115`), `/directorio/{slug}` (`:160-171`) y previsiblemente en `/preguntas-frecuentes` (no leído en detalle — ⚠️ verificar).
  - `ProfessionalService` enriquecido con `OfferCatalog` + `AreaServed` desagregado por estado — en `/directorio/{slug}` (`directorio/[slug].astro:113-147`). Buen nivel para AI Overviews.
- **URLs**: rutas en español, `kebab-case`, `trailingSlash never`. Dinámicas: `/servicios/[slug]`, `/directorio/[slug]`, `/blog/[slug]` (todas con `getStaticPaths` desde colecciones). Locales planas adicionales (`/directorio/investigacion-privada-cdmx`, etc.).
- **Internal linking**: muy fuerte y sistematizado. Documentado como "REGLA DE INTERLINKING" en `Nav.astro:5-14` y `Footer.astro:5-13`. Nav dropdowns + Footer 5 columnas se autogeneran desde SERVICES/PACKAGES/CATEGORIES. Hero strip contextual determinístico (`consts.ts:456-497`) inyecta 6 chips cruzados bajo cada hero. Servicios/directorio enlazan paquetes/casos/posts relacionados por slug/id. Blog hyper-local enlaza a paquetes (ej. `detective-privado-anzures-reforma-cdmx.mdx:47`).
- **Sitemap**: **ROTO/INCONSISTENTE.** `robots.txt:7` apunta a `https://infielmx.com/sitemap-index.xml`, `package.json:20` incluye `@astrojs/sitemap`, pero **el config NO registra la integración** (`astro.config.mjs:14-22` solo tailwind+mdx) y existe commit explícito `db9755a "Remove sitemap integration from astro.config.mjs"`. Resultado: el build estático no generará `sitemap-index.xml` y robots referenciará un 404. Ver ❌.
- **RSS**: `src/pages/rss.xml.ts` presente (feed de blog vía `@astrojs/rss`).
- **robots.txt** (`public/robots.txt`): `Allow: /`, `Disallow: /portal-cliente/ /admin/ /api/` (rutas que aún no existen, preventivo). Sitemap line presente.
- **`_headers`** (`public/_headers`): seguridad de nivel alto — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` (geo/mic/cam off), `Strict-Transport-Security` 2y preload, y **CSP completa** (`:7`) que whitelista googletagmanager, cal.com, fonts.googleapis/gstatic, google-analytics, youtube/vimeo frames. Cache-Control immutable para assets/css/js. Excelente.
- **`_redirects`** (`public/_redirects`): 6 redirects 301 (`/home`,`/inicio`→`/`; `/faq`→`/preguntas-frecuentes`; `/privacidad`→`/aviso-de-privacidad`; etc.).

## Sistema de diseño

- **Identidad visual**: "Noir + Blood" — dark-first, agresivo, editorial, full-bleed. Documentado en `globals.css:5-8` y `tailwind.config.mjs:8-11`.
- **Tokens / paleta — DÓNDE**: definición DUAL (potencial fuente de drift, ver 📐):
  - **Tailwind** `tailwind.config.mjs:7-72` (`theme.extend.colors`): `navy` (negros 50→900, DEFAULT `#0A0A0A`), `cream` (superficies oscuras, DEFAULT `#171717`), `gold` (en realidad **rojo sangre**, DEFAULT `#DC2626`), `granate`, `carbon` (grises de texto), alias `ink/bone/blood/steel`. **Nota semántica importante**: los nombres de token son heredados/engañosos — `gold` = rojo, `cream` = superficie oscura, `navy` = negro. Documentado en los comentarios del propio config (`:8-11`, `:67-71`).
  - **CSS vars** `globals.css:11-44` (`:root`): `--color-ink/bone/blood/steel`, superficies `--bg-base/deep/surface/card/elev`, texto `--text-pure/strong/body/mute/dim`, bordes, radios `--radius-sm..xl`, padding fluido `--px-bleed: clamp(1.25rem,4vw,5rem)`.
- **Tipografía**: `tailwind.config.mjs:73-89`. `serif`/`sans`/`display` TODOS reasignados a **Space Grotesk** (Inter/system-ui fallback); `mono` = JetBrains Mono. Escala display con `clamp()` responsive (`display-2xl..sm`, `:84-88`). Cargada en BaseLayout (`:81-84`).
- **Sombras / motion**: sombras de marca `soft/card/deep/glow/blood` (`:96-102`); animaciones `fade-in/slide-up/pulse-slow/shimmer` (`:103-115`); `prefers-reduced-motion` respetado (`globals.css:259-266`).
- **UI base (clases utilitarias `@layer components`, `globals.css:109-254`)**:
  - Containers full-bleed: `.container-wide/.container-x/.container-bleed/.container-content/.full-bleed` (`:111-132`).
  - Secciones: `.section` (py-20→36), `.section-tight` (`:135-136`).
  - **Botones**: `.btn` base (rounded-none, uppercase, tracking-wider), `.btn-primary`, `.btn-gold`, `.btn-ghost`, `.btn-outline-white`, **`.btn-whatsapp`** (`#25D366`), `.btn-lg/.btn-xl` (`:143-180`).
  - Cards: `.card` (`bg-cream-100 border-carbon-700`); `.card-hover` **desactivado intencionalmente** (`:186-187`, "cards estáticas").
  - `.chip`/`.chip-gold`, `.eyebrow`, `.quote`, `.hr-gold/blood/glow`, `.prose-infiel` (prose-invert tuneado, `:214-229`), `.glass-dark`, `.marquee` (`:204-253`).
- **Patrones UI clave**:
  - **Hero**: `components/Hero.astro` — 2 columnas 50/50, eyebrow+N°sección, H1+highlight italic, 2 párrafos SEO (HTML), banda inferior con dot rojo + CTA "explorar". Patrón idéntico en home, servicios/[slug], directorio/[slug], ArticleLayout. **El patrón canónico del sistema.**
  - **Cards**: ServiceCard/PackageCard/CaseCard/ProfileCard/BlogCard/TestimonialCard — todas rounded-none, borde carbon, estáticas.
  - **CTA**: `CTASection` (centrado, doble botón consulta+WhatsApp) repetido al cierre de páginas.
  - **Botón WhatsApp**: triple presencia — `.btn-whatsapp` (clase), `WhatsAppFloat` (flotante), y forms que abren `wa.me` con texto prellenado (`index.astro:760-781`).
  - **Breadcrumbs**: con microdata, auto-derivados, montados globalmente en BaseLayout.
  - **Numeración editorial**: secciones rotuladas "N° 001…010" (home), "N° 020+" (servicios), "N° 100+" (directorio) — sistema de wayfinding propio (`servicios/[slug].astro:37-39`, `directorio/[slug].astro:72-76`).

## Convenciones

- Rutas en español, `kebab-case`; componentes `PascalCase.astro` (`README.md:102-104`).
- Sin emojis en UI por decisión de marca (`README.md:106`).
- "Modo discreto": QuickExit + WhatsApp con número intermediario + forms que no persisten datos (`README.md:107`, ContactForm).
- Fuente única de marca en `src/lib/consts.ts` (`README.md:82-84`).
- **REGLA DE INTERLINKING** formalizada: toda alta nueva debe enlazarse en card L2 + Nav + Footer + sitemap (`Nav.astro:5-14`, `Footer.astro:5-13`).
- Numeración editorial de secciones (N° NNN) con `step` reservado para evitar colisión (`directorio/[slug].astro:73`).
- Commits convencionales en español (`feat/fix/chore/copy(scope):`), evidencia `git log`.
- Blog "atemporal": fechas existen en schema pero NO se renderizan (decisión, `ArticleLayout.astro:13`, `:89`).
- Documentación versionada junto al código ("PR que toca src/ debe tocar docs/", `docs/README.md:56-58`).

## Flujos / procesos

- **Build/deploy**: `astro build` → `dist/` → `wrangler pages deploy` (manual, sin CI). `package.json:14`.
- **Funnel de demanda (cliente)**: Hero/CTA → `/consulta-gratis` o WhatsApp (`wa.me` prellenado) → ContactForm (cifrado declarado, datos no persisten). 4 pasos en `index.astro:33-58` (DIRECTORY_PROCESS) y proceso operativo de agencia en `consts.ts:499-524` (PROCESS).
- **Funnel de oferta (profesional)**: `/contacto?intent=membresia` → MEMBERSHIPS (`directory.ts:216-279`), CTA dual cliente/profesional en directorio (`directorio/[slug].astro:693-700`, `:1016-1023`).
- **Verificación de profesionales**: 4 niveles auditables (`directory.ts:156-209` VERIFICATION_LEVELS) renderizados en home y hub.
- **Generación de páginas**: estática vía `getStaticPaths` desde colecciones (servicios/directorio/blog). Filtro de estados client-side con deep-link querystring (`directorio/[slug].astro:390-523`).
- **Envío de formularios**: **incompleto** — ContactForm simula con `setTimeout` (`ContactForm.astro:134-135`); el form WhatsApp de home sí funciona (abre `wa.me`, `index.astro:760-781`).

## Integraciones

| Integración | Evidencia / Estado |
|---|---|
| **Cloudflare Pages** | ✅ Configurado. `wrangler.toml` completo, `package.json:14` deploy script, `README.md:59-80`, `public/_headers` + `_redirects` (artefactos CF). Repo `github.com/Origenlab/infiel.mx`. |
| **Cal.com** | ⚠️ HUECO parcial: whitelisted en CSP (`_headers:7`: `frame-src https://cal.com`, `script-src ... https://cal.com`) y listado como pendiente en roadmap (`README.md:94`), pero **NO hay embed/integración en código** (sin matches de cal.com en src). Preparado, no implementado. |
| **Google Tag Manager / Analytics** | ⚠️ HUECO: whitelisted en CSP (`_headers:7`: googletagmanager + google-analytics) pero **sin tag GTM/GA en BaseLayout ni en ningún `.astro`**. Solo `data-event="..."` attributes (Nav/WhatsAppFloat) sin handler de analytics. Preparado, no cableado. |
| **n8n** | ❌ HUECO total: sin evidencia en repo (0 matches). |
| **fal.ai** | ❌ HUECO total: sin evidencia en repo (0 matches). |
| **Brevo** | ❌ HUECO total: sin evidencia. El email transaccional está pendiente como "Resend / Formspree" (`README.md:95`, `ContactForm.astro:134`), no Brevo. |
| **GitHub Actions (.github/workflows)** | ❌ HUECO: **no existe carpeta `.github/`** (Glob sin resultados). Deploy es manual vía Wrangler CLI; CF Pages puede hacer build-on-push si el repo está conectado (Opción A del README), pero no hay workflow versionado. |
| **@astrojs/sitemap** | ❌ ROTO: dependencia presente pero integración removida del config (ver SEO real). |
| **@astrojs/rss** | ✅ Activo vía `src/pages/rss.xml.ts`. |
| **astro-icon** | ❌ Vestigial: `noExternal` en config sin dependencia ni uso (Icon propio). |

## Documentación previa

**SÍ existe un vault Obsidian propio** en `docs/.obsidian/` (`app.json`, `appearance.json`) — corrección a cualquier suposición previa: la carpeta `docs/` ES un vault de Obsidian además de documentación del repo (`docs/README.md:8-16`).

**Qué cubre** (estructura numerada estilo MOC con wiki-links y frontmatter `source:` que apunta al archivo `src/` real — fuente única de verdad, `docs/README.md:51-54`):
- `00 — Arquitectura general.md` — estructura, rendering static, tabla de 14 rutas públicas con cross-links.
- `01 — Stack y dependencias.md` — Astro 4, Tailwind 3, MDX, integraciones.
- `02 — Design System.md` — paleta noir+blood, Space Grotesk, spacing, shadows.
- `03 — Layouts.md` — BaseLayout, ArticleLayout.
- `04 — Componentes/` — carpeta con `_INDEX.md` + **una nota por componente** (Hero, BlogCard, CTASection, ContactForm, FAQ, Footer, Nav, PackageCard, ProcessStep, QuickExit, ServiceCard, TestimonialCard, TopBar, TrustBadges, WhatsAppFloat, Breadcrumbs, CaseCard, Icon, Logo, SectionHeading + nota "Article (Callout, FAQ, Stats, Takeaways, InlineCTA, Sidebar)").
- `05 — Páginas/` — `_INDEX.md` + una nota por página (Index, Servicios, Paquetes, Casos, Blog, Contacto, Consulta Gratis, Garantía, Preguntas Frecuentes, Aviso de Privacidad, Términos, 404).
- `06 — Data y Content Collections.md` — consts.ts, directory.ts, faq.ts, content/.
- `07 — SEO y keywords.md` — **muy reutilizable**: keyword principal "investigador privado de infidelidad", 8 variantes priorizadas, tabla de 6 clusters, tabla de meta-titles por página, reglas de densidad on-page, AEO/GEO.
- `08 — Decisiones de diseño.md` — ADRs (pivot directorio→investigador, reseñas pseudónimas 4×4, ecosistema numerado, hero 2 columnas, FAQ+form WhatsApp).
- `L2 — Blueprint de páginas secundarias.md` — **patrón canónico reutilizable** para páginas L2 (estructura, secciones, comparador, checklist de merge).
- `INFIEL_MX_Estudio_Ejecutivo_de_Mercado.docx` — fuente estratégica de mercado (existe; no leída por instrucción).

**Qué es reutilizable para el sistema maestro**: (1) la convención `source:`-frontmatter que ata cada nota a su archivo `src/`; (2) el blueprint L2 como plantilla de página secundaria; (3) la doc SEO 07 como modelo de estrategia keyword+clusters+meta-map; (4) el formato ADR corto de 08; (5) el patrón "una nota por componente con props documentadas". El vault es el activo de documentación más maduro y portable del proyecto.

## Clasificación

### ✅ (qué está bien — línea + ruta)
- **SEO/Schema de nivel profesional**: JSON-LD por tipo de página (ProfessionalService global `BaseLayout.astro:93-114`, Service+Offer `servicios/[slug].astro:84-102`, ProfessionalService+OfferCatalog+AreaServed desagregado por estado `directorio/[slug].astro:113-147`, BreadcrumbList con microdata `Breadcrumbs.astro:99-129`, FAQPage en servicios y directorio). Apto para rich results / AI Overviews.
- **Seguridad de headers ejemplar**: CSP estricta + HSTS preload + X-Frame DENY + Permissions-Policy en `public/_headers:1-7`.
- **Sistema de diseño tokenizado y documentado**: paleta + tipografía + sombras centralizadas en `tailwind.config.mjs:7-127` y CSS vars en `globals.css:11-44`; un solo Hero/SectionHeading/CTA canónicos reutilizados en todo el sitio.
- **Fuente única de marca + interlinking autogenerado**: `consts.ts` + `directory.ts` alimentan Nav (`Nav.astro:32-50`) y Footer (`Footer.astro:16-17`); regla de interlinking documentada en código.
- **Vault de documentación maduro**: `docs/` 00–08 + L2 + per-component/page con `source:` frontmatter (`docs/README.md`).
- **a11y considerada**: skip-link (`BaseLayout.astro:120-125`), focus-visible rings (`globals.css:84-86`), `prefers-reduced-motion` (`:259-266`), aria en Nav/Breadcrumbs/filtros.

### ❌ (qué está mal/roto — línea + ruta)
- **Conflicto de dominio `site`**: `astro.config.mjs:7` = `https://infiel.mx` contra `consts.ts:14` + `wrangler.toml:7` = `https://infielmx.com`. El `site` de Astro (obsoleto) corrompe URLs absolutas generadas por Astro; canonical/OG/schema (que usan `SITE.url`) sí son correctos → inconsistencia entre capas. Corregir `astro.config.mjs:7` a `infielmx.com`.
- **Sitemap roto**: `@astrojs/sitemap` en `package.json:20` pero la integración fue removida del config (commit `db9755a`; ausente en `astro.config.mjs:14-22`), mientras `robots.txt:7` referencia `sitemap-index.xml`. El build no generará el sitemap → robots apunta a un 404. Re-agregar la integración o quitar la línea de robots.
- **Formulario de contacto sin backend**: `ContactForm.astro:134-135` simula el envío con `setTimeout` y comentario "Placeholder: aquí conectarás Resend / Formspree / endpoint propio". Los leads del formulario principal se pierden. (Roadmap `README.md:95` lo confirma como pendiente.)
- **Placeholders de contacto en producción**: `consts.ts:20-34` y `wrangler.toml:8-10` con WhatsApp `+5215555555555`, phone `+525555555555`, email `contacto@infielmx.com`, address `Av. Reforma 000`. El schema de organización publica la dirección placeholder (`BaseLayout.astro:108-109`). NO es fuga de seguridad (son dummies), pero el sitio en vivo enviaría a números/dirección inválidos. **Observación, no fuga.**
- **Config `astro-icon` vestigial**: `astro.config.mjs:30` (`ssr.noExternal: ['astro-icon']`) sin la dependencia ni uso real (Icon propio en `Icon.astro`). Limpiar.
- **Datos de prueba inconsistentes con claims**: solo 4 casos JSON (`content/casos/`) frente a "1,200+ casos" repetido en UI/schema (`consts.ts:262`, `BaseLayout.astro:113`); perfiles reales solo en 1 de 6 categorías (`directorio/[slug].astro:40-41`). Coherente con pre-lanzamiento pero el sitio afirma cifras no respaldadas por el contenido.

### 🤖 (oportunidades de automatización — línea + ruta)
- **Generación de páginas locales por ciudad/colonia**: las 45 entradas de blog hyper-local (`detective-privado-{zona}.mdx`) y las páginas planas `directorio/*-cdmx.astro` siguen un patrón idéntico → candidato a generador desde un dataset de zonas (estilo `getStaticPaths` + plantilla única), eliminando los archivos planos duplicados (`src/pages/directorio/investigacion-privada-cdmx.astro` + 4).
- **Pipeline de leads (form → CRM/email)**: cablear `ContactForm.astro:134` a un endpoint (CF Pages Function / Brevo / Resend) + n8n para enrutar leads y notificar por WhatsApp; hoy el funnel principal de demanda no captura.
- **Analytics event tracking**: ya existen `data-event="..."` (`Nav.astro:147`, `WhatsAppFloat.astro:8`, `directorio/[slug].astro:290`) sin consumidor — automatizable conectando GTM/GA (ya whitelisted en CSP) a esos hooks.
- **Sincronización docs↔código**: la regla "PR a src/ toca docs/" (`docs/README.md:56`) es manual → automatizable con un check en CI (que hoy no existe, ver GHA).

### 📐 (estandarización/patrón a extraer — línea + ruta)
- **Hero canónico de 2 columnas + SEO HTML inyectado** (`Hero.astro:21-204`) y **SectionHeading gemelo**: patrón de "encabezado editorial con doble bloque SEO" exportable como componente base del sistema maestro para arquetipo D/C.
- **Sistema de numeración editorial de secciones** con `baseSection` + `step` reservado (`servicios/[slug].astro:37-39`, `directorio/[slug].astro:72-76`): patrón de wayfinding reutilizable.
- **Doble fuente de verdad servicios (consts `SERVICES` vs colección `servicios`)**, reconciliada por `find()` (`servicios/[slug].astro:34`): extraer a UN solo origen (idealmente todo en la colección con loader) para eliminar drift — anti-patrón a estandarizar.
- **Tokens con nombres semánticos engañosos** (`gold`=rojo, `cream`=oscuro, `navy`=negro, `tailwind.config.mjs:8-71`): estandarizar naming de paleta (p.ej. `brand/surface/accent`) en el sistema maestro para evitar confusión entre proyectos.
- **Blueprint L2 + interlinking rule + Icon inline**: ya documentados; promover a SOP/plantilla del sistema (vault `L2 — Blueprint`, `Nav.astro:5-14`, `Icon.astro`).

## ⚠️ HUECOS
- **CI/CD**: no existe `.github/workflows/` (Glob vacío) — sin pipeline versionado; deploy manual. Por qué importa: reproducibilidad y el check docs↔código quedan sin garantía.
- **Sitemap real**: imposible confirmar generación de `sitemap-index.xml` sin `dist/`; la evidencia de config indica que NO se genera. Verificar en build.
- **n8n / fal.ai / Brevo**: cero evidencia en repo — no integradas (huecos de evidencia, no fallos).
- **Cal.com / GTM / GA**: preparados en CSP (`_headers:7`) y roadmap pero sin código de integración — pendientes.
- **`/preguntas-frecuentes`, `/paquetes`, `/casos`, `/contacto`, `/consulta-gratis`, `/garantia`, páginas locales CDMX**: no leídas íntegramente en esta pasada (priorizadas layouts/dinámicas/SEO). Su schema FAQPage/estructura se infiere del patrón pero no se verificó línea a línea.
- **`INFIEL_MX_Estudio_Ejecutivo_de_Mercado.docx`**: existe en `docs/`; no leído (instrucción) — fuente de las cifras de mercado/supply que el sitio cita.
- **Cobertura de datos vs. claims**: "1,200+ casos", "+30 ciudades", supply objetivo (240/85/320/410/95/60) son metas/placeholders (`consts.ts:260-266`, `directory.ts:28+`), no datos verificados en contenido.
- **Backend de formularios y portal cliente** (`/portal-cliente/` en robots): mencionados pero inexistentes — funcionalidad futura.
- **Seguridad**: barrido `grep` por `gho_/ghp_/sk-/api_key/SECRET/token/AKIA/xoxb/AIza/BEGIN PRIVATE` sobre src+public+config+raíz (excluyendo node_modules/dist/.git) → **0 secretos reales**. Las únicas coincidencias fueron prosa legítima en español ("secreto profesional", "Telegram secret chats"). **No hay `.env`. No hay fuga.** Los valores `+5215555555555` / `contacto@infielmx.com` del wrangler son PLACEHOLDERS dummy (observación, no fuga).
