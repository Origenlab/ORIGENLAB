# Diagnóstico — CABOIMAGE

> Propósito: Sitio de portafolio/servicios de un fotógrafo profesional de bodas y lifestyle en Los Cabos (BCS, México), construido en Astro 4 + Tailwind para mercado internacional.

## Identidad

- **Negocio:** Cabo Image — marca artística/comercial de **Miguel Ventura**, fotógrafo profesional en Los Cabos, Baja California Sur, México. (Evidencia: `caboimage-astro/src/layouts/BaseLayout.astro` L40-58; `obsidian-vault/01-Brand/Identidad-de-Marca.md`)
- **Tipo:** Sitio de servicio profesional con portafolio fotográfico (galerías por categoría) + blog SEO + páginas de servicio + formulario de contacto. Output 100% estático (SSG).
- **ARQUETIPO: C (servicio local) con fuerte componente A (catálogo/galería).** Justificación: el núcleo es captar leads de un servicio profesional geolocalizado (bodas en Los Cabos) vía schema `LocalBusiness`/`ProfessionalService`, WhatsApp y formulario (rasgo C). Pero la arquitectura gira alrededor de un **catálogo de 7 servicios fotográficos + galerías con subcategorías** (8 galerías de bodas + 3 más) tratadas como colecciones navegables tipo catálogo (rasgo A). No es renta/eventos (B) ni directorio/educación (D). Evidencia: `src/content/services/` (7 .md), `src/content/gallery/` (11 .json), `src/pages/services/[slug].astro`, `src/pages/gallery/[category].astro`.
- **Idioma:** Bilingüe inconsistente — UI, nav, servicios y blog en **inglés** (mercado internacional de bodas destino); pero el `homeSchema` y comentarios del homepage en **español** ("Fotógrafo profesional de bodas..."). Evidencia: `src/components/layout/Header.astro` L13-19 (nav EN: Weddings/Gallery/Services/Journal/About) vs `src/pages/index.astro` L17-60 (schema en ES) y `<title>` "Fotógrafo de Bodas en Los Cabos".
- **Estado:** Avanzado/funcional. Tiene `dist/` compilado, galerías con imágenes reales `.avif` (27 brides, etc.), 7 servicios, 3 posts MDX, 6 testimonios. El `README.md` lista "Next Steps (Design Phase)" con checkboxes de componentes home como pendientes, **pero esos componentes ya existen** (`src/components/home/*` están construidos) → README desactualizado.
- **Relación con proyectos hermanos:** El homepage declara explícitamente ser parte de la **fábrica ORIGENLAB**: comentario `index.astro` L2 → *"homologado con PROYECTORED / MESECI / LGACONTRAINCENDIOS"*. Los componentes home (`Hero`, `StatsBar`, `ProcesoIndex`, `FAQIndex`, `FinalCTA`) replican el patrón MESECI/LGA (ver comentarios internos de cada componente). Comparte el patrón general con MEDEDUL (Astro + content collections + WhatsApp + schema) pero **diverge en CSS**: CABOIMAGE usa **Tailwind**, MEDEDUL usa **CSS vanilla con tokens**.

## Stack

- **Astro:** `^4.16.0` (Evidencia: `package.json`). NOTA: una versión major por detrás de MEDEDUL (Astro 5).
- **Integraciones:** `@astrojs/tailwind ^5.1.0` (con `applyBaseStyles:false`), `@astrojs/mdx ^3.1.0`, `@astrojs/sitemap ^3.7.2` **instalado pero DESACTIVADO** (comentado en `astro.config.mjs` L4 y L13), `astro-seo ^0.8.4` (componente `<SEO>` de terceros), `@tailwindcss/typography ^0.5.15`, `sharp ^0.33.5`.
- **CSS:** Tailwind CSS `^3.4.14` con `darkMode:'class'`, tema oscuro extendido en `tailwind.config.mjs` (paleta `cabo-*`, tipografía serif/display, animaciones, sombras gold). `src/styles/global.css`.
- **Adapter / output:** `output: 'static'` (SSG puro), `trailingSlash: 'never'`, `build.assets: '_assets'`, `inlineStylesheets:'auto'`. Sin adapter SSR. (Evidencia: `astro.config.mjs`)
- **Image:** servicio Sharp local, `remotePatterns` para `caboimage.com` e `images.unsplash.com`.
- **Deploy:** No hay config de plataforma en repo (sin `vercel.json`/`netlify.toml`/`wrangler`). README menciona Vercel (recomendado) / Netlify / Cloudflare Pages como opciones. ⚠️ HUECO (ver abajo).

## Estructura de carpetas

```
caboimage-astro/
├── astro.config.mjs, tailwind.config.mjs, tsconfig.json, .env.example, README.md
├── public/            (favicon.svg, robots.txt, site.webmanifest, images/gallery/**.avif + _manifest.json)
├── dist/              (build compilado presente)
├── graphify-out/      (artefacto de herramienta "graphify": graph.html/json, GRAPH_REPORT.md)
└── src/
    ├── content/       config.ts + services/(7 .md) + blog/(3 .mdx) + gallery/(8 .json) + testimonials/(6 .json)
    ├── layouts/       BaseLayout, PageLayout, ServiceLayout, BlogLayout
    ├── components/     layout/(Header,Footer) · ui/(Button,ContactForm,SectionHeader,WhatsAppButton) ·
    │                   home/(9 bloques) · services/(ServiceCard) · gallery/(GalleryGrid) · blog/(BlogCard)
    ├── pages/         index, about, contact, 404, services/(index,[slug]), gallery/(index,[category]),
    │                   blog/(index,[slug]), sitemap.xml.ts
    ├── styles/        global.css
    └── env.d.ts
```
- Hermano del repo: `CABOIMAGE/obsidian-vault/` (vault de documentación, ver §Documentación previa) y `CABOIMAGE/graphify-out/` (artefacto de grafo de código).

## Layouts — jerarquía

```
BaseLayout.astro  (HTML shell, <SEO> astro-seo, fuentes Google, orgSchema LocalBusiness siempre, slots: head/whatsapp)
 ├── PageLayout.astro    → Header + <main> + Footer + WhatsAppButton  (index, about, contact, gallery hub, blog index)
 ├── ServiceLayout.astro → Header(transparent) + main + Footer + WhatsAppButton; inyecta serviceSchema (Service) propio
 └── BlogLayout.astro    → define articleSchema (Article); pasa schema a BaseLayout
```
- `BaseLayout` siempre emite `orgSchema` (`LocalBusiness` con `founder` Miguel Ventura, `areaServed` Los Cabos/Cabo San Lucas/San José del Cabo, `priceRange:'$$$$'`). Acepta `schema` adicional por página. Evidencia: `BaseLayout.astro` L36-58, L123-125.

## Componentes — inventario

| Componente | Ruta | Props | Uso |
|---|---|---|---|
| Header | `src/components/layout/Header.astro` | `transparent?` | Nav fija (5 links EN), modo transparente sobre hero |
| Footer | `src/components/layout/Footer.astro` | (sin interface Props) | Footer global |
| Button | `src/components/ui/Button.astro` | `href?, variant(primary\|outline\|ghost\|gold), size, external?, type, disabled?, ariaLabel?` | Botón/enlace reutilizable |
| ContactForm | `src/components/ui/ContactForm.astro` | `title?, subtitle?, successMessage?, formId?` | Formulario lead (Netlify Forms default / Formspree si `PUBLIC_FORMSPREE_ID`) |
| SectionHeader | `src/components/ui/SectionHeader.astro` | (interface Props) | Encabezado de sección reutilizable |
| WhatsAppButton | `src/components/ui/WhatsAppButton.astro` | (sin Props; lee `PUBLIC_WHATSAPP_NUMBER`) | CTA flotante WhatsApp |
| ServiceCard | `src/components/services/ServiceCard.astro` | `title, slug, tagline, heroImage, heroImageAlt, featured?, order?` | Card de servicio en grid |
| GalleryGrid | `src/components/gallery/GalleryGrid.astro` | (interface Props) | Grid de galería con lightbox |
| BlogCard | `src/components/blog/BlogCard.astro` | (interface Props) | Card de post de blog |
| Hero | `src/components/home/Hero.astro` | (consts locales, sin Props) | Hero home — patrón homologado MESECI/PROYECTORED, grid 55%/1fr |
| StatsBar | `src/components/home/StatsBar.astro` | (consts locales) | Barra de 4 stats post-hero (patrón LGA/MESECI) |
| FeaturedWork | `src/components/home/FeaturedWork.astro` | (`categories` local) | Portafolio destacado, grid editorial asimétrico |
| ServicesOverview | `src/components/home/ServicesOverview.astro` | (getCollection services) | 7 servicios con subcategorías |
| ProcesoIndex | `src/components/home/ProcesoIndex.astro` | (`pasos` local, 4 pasos) | "Cómo trabajamos" |
| AboutSnippet | `src/components/home/AboutSnippet.astro` | (`credenciales` local) | Bio Miguel Ventura 2 columnas |
| Testimonials | `src/components/home/Testimonials.astro` | (getCollection testimonials) | 3 cards con venue+rating |
| FAQIndex | `src/components/home/FAQIndex.astro` | (`faqs` local) | Acordeón `details/summary` nativo, 0 JS |
| FinalCTA | `src/components/home/FinalCTA.astro` | (consts locales) | Cierre con imagen full-width + CTA |

- ⚠️ **No existe componente `Breadcrumbs`** (búsqueda en `src/components` y layouts → 0 resultados). Contrasta con MEDEDUL que sí lo tiene.

## Content Collections / esquemas / taxonomías

Definidas en `src/content/config.ts` (Zod, sin `reference()` entre colecciones):
- **services** (`type:'content'`): title, description, seoTitle, seoDescription, keywords[], tagline, heroImage/Alt, coverImage?, order, featured, active, galleryCategory?, ctaText/ctaUrl, `subcategories[]` (name/slug/description), `faq[]`, `schemaType`. → 7 archivos (wedding, portrait, real-estate, architecture, fine-art, advertising, commercial-travel).
- **blog** (`type:'content'`): title, description, pubDate, seo*, keywords?, heroImage?, draft, tags[], `category` enum(`weddings|venues|tips|behind-the-scenes|real-estate|los-cabos`), author(default Miguel Ventura), relatedPosts?, relatedService?, ogImage?. → 3 .mdx.
- **gallery** (`type:'data'`): category, title, description, coverImage, order, `images[]` (src, alt, width?, height?, caption?, venue?, year?). → 8 .json (weddings + subcategorías brides/love/ceremony/details/getting-ready/groups/bride-and-groom).
- **testimonials** (`type:'data'`): name, location, service, rating(1-5), quote, date, venue?, image?, featured?. → 6 .json.
- **Taxonomías:** servicios por `order`/`featured`; blog por `category` enum + `tags`; galerías por `category` con subcategorías como slugs separados (`weddings--brides` en URLs del sitemap). Imágenes reales en `public/images/gallery/weddings/**` formato `.avif` con `_manifest.json`.

## SEO real

- **Metas:** `astro-seo` `<SEO>` en `BaseLayout` → title (con sufijo `| Cabo Image`), description, canonical (`Astro.url.href` por defecto), `noindex` opcional, OpenGraph completo (basic+optional+image 1200×630, `locale:'en_US'`), Twitter `summary_large_image`. Evidencia: `BaseLayout.astro` L60-110.
- **Schema (JSON-LD), tipos + rutas:**
  - `LocalBusiness` (orgSchema) — TODAS las páginas (`BaseLayout`).
  - `ProfessionalService` con `hasOfferCatalog` (7 servicios) + `aggregateRating` 5/120 — home (`index.astro` L17-60).
  - `Service` — páginas de servicio (`ServiceLayout.astro` L34-50).
  - `Article` — posts (`BlogLayout.astro` L40).
  - ⚠️ **Sin `BreadcrumbList`** (no hay breadcrumbs).
- **URLs:** en inglés, `trailingSlash:'never'` (ej. `/services/wedding-photography`). Galerías de subcategoría usan doble guion: `/gallery/weddings--brides`.
- **Internal linking:** vía nav (Header, 5 links), `ServicesOverview`, `FeaturedWork`, `L2`/CTAs home. Sin componente de interlinking editorial dedicado (a diferencia del `L2Interlink` de MEDEDUL).
- **Sitemap:** ❌ **INCONSISTENCIA CRÍTICA DE SEO.** Sitemap estático generado por `src/pages/sitemap.xml.ts` en la ruta `/sitemap.xml` (lista ~30 URLs hardcodeadas), pero `public/robots.txt` apunta a `Sitemap: https://caboimage.com/sitemap-index.xml` → la URL declarada **no existe** (la integración `@astrojs/sitemap` que generaría `sitemap-index.xml` está desactivada). Resultado: robots referencia un sitemap inexistente. Evidencia: `public/robots.txt` L9 vs `src/pages/sitemap.xml.ts` + `astro.config.mjs` L4/L13.
- **robots.txt:** estático en `public/`, Allow `/`, Disallow `/admin/ /_astro/ /api/`.

## Sistema de diseño

- **Tokens / tipografía / paleta:** definidos en **`tailwind.config.mjs`** (`theme.extend`). Paleta de marca `cabo-*` (tema oscuro: `cabo-black #080808`, `cabo-surface`, `cabo-card`, acento dorado `cabo-gold #C8A97E` con variantes light/dark/muted, neutros `cabo-white #F5F0EB`/`cabo-muted`/`cabo-subtle`, estados success/info/warning). Tipografía: `sans:Inter`, `serif:Cormorant Garamond`, `display:Playfair Display`, `mono:JetBrains Mono`; escala `display-*` con line-height/letter-spacing. Fuentes cargadas vía Google Fonts en `BaseLayout`.
- **UI base:** `Button` (4 variantes), `SectionHeader`. Animaciones definidas en config (fade-in/up/down, scale-in, shimmer; easings expo/spring), sombras `gold-*`/`image`, aspect ratios fotográficos (`photo` 4/3, `portrait`, `cinematic` 21/9).
- **Hero:** `home/Hero.astro` (grid 55%/1fr, patrón homologado). **Cards:** `ServiceCard`, `BlogCard`, cards de testimonio. **CTA:** `Button variant gold/primary`, `FinalCTA`. **WhatsApp:** `WhatsAppButton` flotante (bottom-right, color `#25D366`, lee `PUBLIC_WHATSAPP_NUMBER`, mensaje en inglés). **Breadcrumbs:** ❌ ausentes.

## Convenciones

- TS strict (`astro/tsconfigs/strict` + `strictNullChecks`), alias `@components`, `@layouts`, `@styles`, `@content`, `@utils`, `@types` (en `tsconfig.json`; nota: imports reales usan rutas relativas `../`, no los alias).
- Slugs de servicios/galerías en **inglés**, kebab-case; `trailingSlash:'never'`.
- Imágenes optimizadas a `.avif` con naming SEO (`wedding-photographer-los-cabos-01.avif`), alt descriptivos generados con plantilla "... by Miguel Ventura — Cabo Image, image N".
- Componentes home como bloques con datos inline (consts locales) en vez de props → patrón de "página homologada" de la fábrica, no componentes parametrizables.
- Prettier + `prettier-plugin-astro` (`.prettierrc`); script `lint: eslint .` declarado pero sin config eslint en repo.

## Flujos / procesos

- **Captación de lead:** dual → (1) `WhatsAppButton` flotante global; (2) `ContactForm` (página `/contact`) que envía a **Netlify Forms** por defecto (atributo `data-netlify`, honeypot `bot-field`) o a **Formspree** si se define `PUBLIC_FORMSPREE_ID` (con submit `fetch` en JS cliente). No hay backend propio. Evidencia: `ContactForm.astro` L19-20, L44-48, L192-197.
- **Navegación de contenido:** Home → Services overview / Gallery hub → categorías/subcategorías → CTA contacto. Blog para SEO de bodas destino.
- **Build:** `npm run build` → `dist/` estático.

## Integraciones

- **Cloudflare:** ⚠️ HUECO — README menciona Cloudflare Pages como opción de deploy, pero **sin evidencia** de config (`wrangler.toml`/Pages) en el repo.
- **n8n:** ⚠️ HUECO — sin evidencia (grep sin resultados).
- **fal.ai:** ⚠️ HUECO — sin evidencia.
- **Brevo:** ⚠️ HUECO — sin evidencia. Email transaccional previsto vía **Resend** (`RESEND_API_KEY` en `.env.example` y `env.d.ts`) pero **no cableado** en código (solo placeholder; el form usa Netlify/Formspree).
- **GitHub Actions:** ⚠️ HUECO — no hay `.github/workflows/` en el repo.
- **Analytics:** previstos vía `.env.example` (Umami, Google Analytics) pero sin script inyectado en layouts → no activos.
- El repo raíz `CABOIMAGE/` SÍ es git (`.git/` presente) pero no se inspeccionó remoto en esta auditoría (foco en `caboimage-astro`).

## Documentación previa

Existe **`CABOIMAGE/obsidian-vault/`** (vault Obsidian hermano del repo Astro). Cubre:
- `00-INDEX/MOC-Principal.md` — Map of Content, tabla de fases del proyecto (Auditoría ✅, marca/arquitectura/contenido/dev/SEO/launch pendientes — estado anterior al build).
- `01-Brand/Identidad-de-Marca.md` — posicionamiento, datos del fotógrafo (Miguel Ventura, Canon, idioma principal inglés/mercado internacional), propuesta de valor.
- `02-Sitio-Actual/` — `Auditoria-Completa.md`, `Problemas-y-Oportunidades.md`, `Tech-Stack-Actual.md` (documenta que el sitio **anterior era WordPress + WPBakery + BeTheme + Contact Form 7**, con problemas de performance LCP>3s → justifica migración a Astro).
- `03-Servicios/` — `Overview-Servicios.md`, `Wedding-Photography.md`.
- `04-Nuevo-Sitio/Arquitectura.md`, `05-Contenido/Copy-Homepage.md`, `06-SEO/SEO-Strategy.md` (keywords Tier 1/2 con volúmenes estimados), `07-Astro-Dev/Setup-Inicial.md`.
- `assets/graphity.html` — grafo visual del vault. Además `CABOIMAGE/graphify-out/GRAPH_REPORT.md` documenta el grafo del código fuente.
- Esta documentación es **rica y útil** (cubre brand, auditoría del sitio legacy WP, estrategia SEO, arquitectura) pero refleja un estado de planeación previo al build actual (el MOC muestra fases como "pendientes" que ya están implementadas).

## Clasificación

### ✅ Lo bien hecho
- Galerías reales optimizadas a `.avif` con naming SEO y alt descriptivos. — `public/images/gallery/weddings/**`, `src/content/gallery/*.json`
- Sistema de tokens de diseño completo y coherente (paleta `cabo-*`, tipografía, animaciones, aspect ratios). — `tailwind.config.mjs`
- Schema JSON-LD por tipo de página (LocalBusiness global + ProfessionalService/Service/Article) bien estructurado. — `BaseLayout.astro`, `ServiceLayout.astro`, `BlogLayout.astro`, `index.astro`
- Documentación de marca/SEO/auditoría legacy en vault Obsidian. — `obsidian-vault/`

### ❌ Lo que falla / riesgos
- **robots.txt apunta a `sitemap-index.xml` inexistente** (sitemap real está en `/sitemap.xml` y la integración sitemap está desactivada). — `public/robots.txt` L9 vs `astro.config.mjs` L4/L13 + `src/pages/sitemap.xml.ts`
- **Sin breadcrumbs** (ni componente ni schema BreadcrumbList) → peor UX/SEO de profundidad. — `src/components/` (ausente)
- Sitemap **manual/hardcodeado** que se desincroniza al agregar servicios/posts/galerías. — `src/pages/sitemap.xml.ts`
- README desactualizado (lista como "pendientes" componentes home que ya existen) e idioma del sitio inconsistente (UI EN / schema home ES). — `README.md`, `index.astro`

### 🤖 Automatizable / oportunidad
- Reactivar `@astrojs/sitemap` (ya instalado) para generar `sitemap-index.xml` automático y alinear robots → elimina el sitemap manual. — `astro.config.mjs`
- Generación de galerías desde `_manifest.json` (ya existe el manifest) en vez de mantener cada `.json` a mano. — `public/images/gallery/_manifest.json`
- Cablear formulario a un único proveedor (Resend/n8n) en vez de la rama Netlify/Formspree condicional.

### 📐 Patrón replicable (fábrica)
- Bloques home homologados (`Hero`, `StatsBar`, `ProcesoIndex`, `AboutSnippet`, `FAQIndex`, `FinalCTA`) compartidos con MESECI/PROYECTORED/LGACONTRAINCENDIOS → núcleo del kit de página de inicio de la fábrica. — `src/components/home/*` (comentarios "Patrón homologado")
- `BaseLayout` con `<SEO>` + orgSchema + slots head/whatsapp como shell estándar. — `src/layouts/BaseLayout.astro`
- FAQ con `details/summary` nativo sin JS. — `src/components/home/FAQIndex.astro`

## ⚠️ HUECOS

- **Sitemap/robots desalineados** (CRÍTICO SEO): robots referencia `sitemap-index.xml` que no se genera. Confirmado por evidencia.
- **Deploy sin configurar:** no hay `vercel.json`/`netlify.toml`/`wrangler.toml`/CI. Plataforma final indefinida (README sugiere 3 opciones). — por qué: nunca se commiteó config de hosting.
- **Integraciones (Cloudflare/n8n/fal.ai/Brevo/GHA):** sin evidencia alguna en el repo `caboimage-astro`. Resend previsto pero no cableado; Analytics previstos pero no inyectados.
- **Variables `.env` con placeholders:** WhatsApp (`+52XXXXXXXXXX`), teléfono, IDs de analytics vacíos → el sitio compila con datos de contacto ficticios si no se llena `.env`. — `.env.example`, `WhatsAppButton.astro` fallback.
- **Idioma inconsistente** (UI EN vs schema/comentarios ES) → decisión de localización sin resolver. — por qué: contenido escrito en inglés pero plantilla de fábrica en español.
- **Astro 4 (no 5):** desactualizado respecto a MEDEDUL; posible deuda al homologar la fábrica.
- **Seguridad:** ✅ Sin tokens/secretos expuestos en código fuente (grep `gho_`/`sk-`/`api_key`/`SECRET`/`AIza`/`re_` → 0 hallazgos en `src`, `.mjs`, `.env.example` solo tiene claves vacías).
