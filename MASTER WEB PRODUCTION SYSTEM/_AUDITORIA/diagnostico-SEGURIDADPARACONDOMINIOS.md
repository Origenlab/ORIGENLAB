# Diagnóstico — SEGURIDADPARACONDOMINIOS
> Propósito: Sitio corporativo de SEPRICO (empresa de seguridad privada para condominios/residenciales en CDMX y Edomex) migrado 1:1 de WordPress a Astro 4, optimizado para SEO local y generación de leads.

## Identidad (negocio/dominio; tipo de sitio; ARQUETIPO + justificación con evidencia; estado)
- **Negocio:** SEPRICO — marca comercial de "Origins Private Security" (`src/config/site.ts:1-3`: `name: 'SEPRICO'`, `legalName: 'Origins Private Security'`). Empresa de seguridad privada para condominios/fraccionamientos/residenciales, fundada en 2000 (`site.ts:11`).
- **Dominio:** `seguridadprivadacondominios.com` (`astro.config.mjs:7`, `site.ts:5`).
- **Cobertura:** CDMX y Estado de México / Zona Metropolitana del Valle de México (`site.ts:38`).
- **Tipo de sitio:** Sitio corporativo de servicios + blog editorial extenso + páginas locales (zonas) y de segmento (comunidades). SSG estático puro.
- **ARQUETIPO: C = servicio profesional local.** Justificación con evidencia: el negocio vende un servicio recurrente local, no productos (`site.ts` define `SERVICIOS`/`RRHH`, no SKUs); el CTA central es cotización/auditoría sin costo y WhatsApp (`ServiceLayout.astro:103,424`); schema raíz es `['Organization','SecurityService','LocalBusiness']` con `areaServed` por alcaldías (`BaseLayout.astro:29,43`); existen 14 páginas de **zonas** (alcaldías/municipios) y 4 de **comunidades** orientadas a SEO local (`src/content/zonas/`, `src/content/comunidades/`). Hay un matiz de catálogo (arquetipo A) en `/equipo-de-seguridad/` (catálogo legacy de WooCommerce migrado) y de directorio/educación (arquetipo D) por el blog de 137 artículos, pero el eje del negocio y la conversión es servicio profesional local → **C**.
- **Estado:** Activo y en desarrollo intenso. Último commit `6c3cc0f` del 2026-06-18 ("reescritura humanizada de 5 articulos aliado SPMX"); historial reciente muestra trabajo continuo de blog y servicios (`git log`). `dist/` presente (build ejecutado). 329 páginas reportadas en commit `42c5bbd`. ⚠️ Aún no desplegado en plataforma confirmada (sin CNAME ni config de hosting en repo).

## Stack (Astro version, integrations, CSS, TypeScript, adapter/output, deploy, build pipeline)
- **Astro:** `^4.16.10` (`package.json:21`).
- **Integraciones:** `@astrojs/tailwind ^5.1.2` (con `applyBaseStyles:false`), `@astrojs/mdx ^3.1.9`, `@astrojs/sitemap 3.2.1` (pinned), `@astrojs/rss ^4.0.9` (dependencia presente, sin uso detectado), `@astrojs/check ^0.9.4` (`package.json:16-21`, `astro.config.mjs:25-30`).
- **CSS:** Tailwind CSS `^3.4.14` + plugin `@tailwindcss/typography ^0.5.15` (`tailwind.config.mjs:52`). CSS global en `src/styles/global.css` (componentes `@layer`) + `src/styles/mobile.css`. `darkMode: 'class'`. Sin CSS-in-JS.
- **TypeScript:** `^5.6.3`, config `astro/tsconfigs/strict` con path aliases `@/*`, `@components/*`, `@layouts/*`, `@assets/*`, `@content/*` (`tsconfig.json`).
- **Adapter/output:** Ninguno. Output estático por defecto (SSG). `build.format: 'directory'`, `trailingSlash: 'always'`, `compressHTML: true`, `inlineStylesheets: 'auto'`, `prefetch` global por viewport (`astro.config.mjs:24,76-84`).
- **Deploy:** ⚠️ HUECO — solo documentado, no configurado. README y `docs/05-Tecnico/03-Deploy.md` recomiendan **Netlify** (forms nativos), con Vercel/Cloudflare Pages como alternativas. No hay `netlify.toml`, `vercel.json`, `wrangler.toml`, `CNAME`, ni `.github/workflows/`. Build command `npm run build` → `dist`, Node ≥18.17 (`package.json:32`).
- **Build pipeline:** Manual (`npm run build`). Sin CI/CD.
- **Formato:** Prettier `^3.3.3` + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (`.prettierrc.json`: singleQuote, semi, printWidth 100, tabWidth 2). Sin ESLint.

## Estructura de carpetas
```
SEGURIDADPARACONDOMINIOS/
├── astro.config.mjs · tailwind.config.mjs · tsconfig.json · package.json · .prettierrc.json · .gitignore
├── README.md · MIGRATION-PLAN.md · SEO-HIERARCHY.md
├── docs/                         # documentación estructurada (01-Proyecto … 05-Tecnico) — 26 .md
├── dist/                         # build de producción (presente)
├── public/
│   ├── favicon.svg · robots.txt · site.webmanifest · .gitkeep
│   └── images/{banco,brand,general,og,rrhh,servicios}/   # ~220 .avif/.webp
└── src/
    ├── components/   # 45 componentes .astro (Hero, Header, Footer, 7× Schema*, Pillars, etc.)
    ├── config/site.ts            # única fuente de verdad: datos, NAV, SERVICIOS, RRHH, ZONAS, FAQS
    ├── content/
    │   ├── config.ts             # 4 colecciones: servicios, comunidades, zonas, blog
    │   ├── servicios/  (20 mdx)  ├── comunidades/ (4 mdx)
    │   ├── zonas/     (14 mdx)   └── blog/ (137 mdx)
    ├── layouts/      # BaseLayout.astro · ServiceLayout.astro
    ├── pages/        # 64 .astro (ver árbol abajo)
    ├── styles/       # global.css · mobile.css
    └── env.d.ts
```
Páginas (`src/pages/`, 64 archivos): raíz `index/nosotros/contacto/gracias/aviso-de-privacidad/404`; ~16 páginas de servicio L3 con slug raíz (ej. `control-de-acceso.astro`) que solo invocan `ServiceLayout`; 7 hubs L1 (`servicios-de-seguridad-privada`, `personal-de-seguridad-residencial`, `tecnologia-y-monitoreo`, `protocolos-y-consultoria`, `atencion-al-comite-condominios`, `reclutamiento-para-seguridad-privada`, `empresa-de-seguridad-privada-para-condominios`); dinámicas `blog/[...slug]`, `blog/index`, `blog/page/[page]`, `category/[...slug]`, `comunidades/[...slug]`+`index`, `zonas/[...slug]`+`index`, y 6 rutas de categoría blog (`seguridad-privada/[...slug]`, `vigilancia/[...slug]`, etc.); redirects legacy `servicios/[...slug]`, `servicios/index`, `producto/[...slug]`, `uncategorized/[...slug]`.

## Layouts — jerarquía (tabla: Layout|ruta|herencia|props|uso)
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| BaseLayout | `src/layouts/BaseLayout.astro` | raíz (`<html>`) | `title, description, image, canonical, type, noindex, keywords, articleSection, lastReviewed` | Shell de TODAS las páginas. Importa CSS global+mobile, monta `SEO`, `Header`, `Footer`, `WhatsAppFloat`, skip-link a11y, slot `schemas`, e inyecta 3 JSON-LD globales (Organization+SecurityService+LocalBusiness, WebSite, Brand). `<html lang="es-MX">`. |
| ServiceLayout | `src/layouts/ServiceLayout.astro` | extiende `BaseLayout` | `slug, type ('servicios'\|'rrhh')` | Plantilla L3 premium para los 20 servicios/RRHH. Lee el MDX de la colección `servicios` con `getEntry`, arma hero, stats, featureCards, beneficios, techStack, proceso, valueProps, FAQ, breadcrumb, TOC sticky, y 6 schemas (Service, Breadcrumb, FAQ, HowTo, ItemList, Speakable). 493 líneas. |

⚠️ HUECO: el blog no usa un layout dedicado sino el componente `BlogArticle.astro` que internamente envuelve `BaseLayout` (no hay `BlogLayout.astro`). Las páginas de zonas/comunidades renderizan vía sus propias páginas dinámicas usando `BaseLayout` + componentes, sin layout intermedio propio.

## Componentes — inventario (tabla: Componente|ruta|props|uso)
45 componentes en `src/components/`. Representativos y agrupados:
| Componente | Ruta | Props (resumen) | Uso |
|---|---|---|---|
| SEO | `components/SEO.astro` | `title, description, image, canonical, type, noindex, keywords, articleSection, lastReviewed` | Genera `<title>`, meta description, canonical, robots, OG completo, Twitter card, geo.region, theme-color. Único punto de metas. |
| Header | `components/Header.astro` | — (lee `NAV_LINKS`) | Nav sticky con mega-menú de 4 pilares. |
| Footer | `components/Footer.astro` | — (lee `SITE`, `ZONAS_*`) | Footer con contacto, rating, tel/WhatsApp, mapa de zonas. |
| Hero | `components/Hero.astro` | `eyebrow, label, headline, subheadline, body, asideP1/P2, asideEyebrow, isH1` | Hero 2-columnas (titular gradiente brand + aside identidad). `isH1` controla si emite `<h1>`. Usado en home y todos los servicios. |
| WhatsAppFloat | `components/WhatsAppFloat.astro` | — | Botón flotante WhatsApp (montado en BaseLayout). |
| Breadcrumb | `components/Breadcrumb.astro` | `items[]` | Migas visibles (par con `SchemaBreadcrumb`). |
| Section | `components/Section.astro` | `id, eyebrow, title, subtitle, desc, align, bg` | Wrapper de sección homologado (header 2-col + bg variants). |
| ServicesGrid / MostRequested / ServicePillars | `components/*` | listas de servicios | Grids de servicios en home/hubs. |
| Faq / ServiceFaq / SubHubFaq | `components/*` | `items[]/serviceName` | FAQ visibles (par con `SchemaFaq`). |
| Process / Timeline / StatsRow / BadgeCard / ValueProps / Testimonials / Certifications / Communities / Sectors / Process | `components/*` | varios | Bloques de contenido reutilizables. |
| Pillar{Comite,Personal,Protocolos,Tecnologia} | `components/Pillar*.astro` | — | Bloques de los 4 pilares (home/hubs). |
| BlogArticle / BlogSidebar | `components/*` | `entry, category{}` | Render de post de blog (envuelve BaseLayout) + sidebar. |
| Icon | `components/Icon.astro` | `name` (enum) | Sistema de iconos SVG inline (shield, cctv, patrol, access, alert, check, phone, mail, pin, clock, star, arrow). |
| Schema* (7) | `SchemaService, SchemaBreadcrumb, SchemaFaq, SchemaHowTo, SchemaItemList, SchemaSpeakable, SchemaBreadcrumb` + `BlogArticle` (BlogPosting) | datos tipados | Emisores de JSON-LD por tipo (ver SEO real). |
| QuickNav / QuickNavBottom / ChipsBar / UtilityBar / ClusterGrid / RelatedServices / AboutSeprico / ImageGallery / CtaBanner | `components/*` | varios | Navegación contextual, CTAs, interlinking y refuerzo de entidad. |

## Content Collections / esquemas / taxonomías (cómo se generan las páginas; estático vs dinámico/getStaticPaths)
4 colecciones definidas en `src/content/config.ts`:
- **servicios** (20 mdx): schema rico — `title, description, icon(enum), category(enum: personal|tecnologia|protocolos|atencion), kind(servicio|rrhh), image, order, features[], seoTitle/seoDescription, keywords[], benefits[], faqs[], related[], lastReviewed, hero*` (7 overrides), `stats[], process[], valueProps[], techStack[], featureCards[], showSectors`. **Generación: NO con getStaticPaths.** Cada servicio tiene una página `.astro` física con slug raíz (`src/pages/control-de-acceso.astro`) que invoca `<ServiceLayout slug="..." />`. Las URLs son slugs raíz (no `/servicios/[slug]`) para preservar SEO de WordPress (`site.ts:55-78`, `MIGRATION-PLAN.md`).
- **blog** (137 mdx): schema `title, description, pubDate, author, tags[], category(enum 7 valores), draft, image, imageAlt`. **Generación dinámica con `getStaticPaths`** filtrando por categoría: hay una ruta por categoría (`seguridad-privada/[...slug].astro`, `vigilancia/[...slug].astro`, etc.) que filtra `getCollection('blog', p => p.category === '...')`. URL canónica = `/{category}/{slug}/`. La ruta `blog/[...slug].astro` actúa como **redirect HTML** (meta-refresh + JS) del slug legacy `/blog/{slug}/` hacia `/{category}/{slug}/` (`blog/[...slug].astro:1-31`).
- **comunidades** (4 mdx: cotos-cerrados, fraccionamientos, residenciales-premium, torres-verticales): schema `title, description, emoji, order, challenges[], recommended[]`. Generadas vía `comunidades/[...slug].astro` (getStaticPaths sobre la colección).
- **zonas** (14 mdx: 8 alcaldías CDMX + 6 municipios Edomex): schema `title, description, region(cdmx|edomex), order, neighborhoods[]`. Generadas vía `zonas/[...slug].astro`. SEO local.
- ⚠️ Existe carpeta `src/content/blog-uncategorized/` vacía (0 mdx) — colección no declarada, posible residuo.

## SEO real (metas, schema JSON-LD tipos+rutas, URLs/trailing slash, internal linking, sitemap/robots, hreflang, verificación Search Console)
- **Metas:** centralizadas en `SEO.astro`. `<title>` = `${title} | SEPRICO` o `SEPRICO — ${tagline}`; emite description, **canonical absoluto** (`SEO.astro:32-35`), robots (`index, follow, max-image-preview:large, max-snippet:-1` o `noindex,nofollow` si `noindex`), OG completo (type/site_name/locale es_MX/title/description/url/image 1200×630/image:alt), Twitter `summary_large_image`, `geo.region MX-CMX`, `geo.placename`, `theme-color #050505`, author/publisher. `keywords` meta opcional.
- **Schema JSON-LD (tipos + rutas):**
  - Globales en `BaseLayout.astro:27-155` (todas las páginas): `Organization`+`SecurityService`+`LocalBusiness` combinados (con aggregateRating 4.9/184, openingHours 24/7, contactPoint, knowsAbout, sameAs), `WebSite`, `Brand`.
  - `SchemaService.astro` → `Service`/`SecurityService` + `OfferCatalog` + `AggregateRating` + `Audience` (rutas de servicio L3).
  - `SchemaBreadcrumb.astro` → `BreadcrumbList` (servicios y otras).
  - `SchemaFaq.astro` / `SubHubFaq.astro` → `FAQPage` (servicios, sub-hubs).
  - `SchemaHowTo.astro` → `HowTo` con `MonetaryAmount`/`HowToStep`/`HowToTool`/`HowToSupply` (servicios con `process[]`).
  - `SchemaItemList.astro` → `ItemList` (servicios con `techStack[]`).
  - `SchemaSpeakable.astro` → `WebPage`+`SpeakableSpecification` (voz/LLM).
  - `BlogArticle.astro:70` → `BlogPosting` (posts).
- **URLs/trailing slash:** `trailingSlash: 'always'` global, `build.format: 'directory'`. URLs limpias slug-raíz preservando WordPress (sin prefijo `/servicios/`). Redirects HTML para rutas legacy (`/servicios/*`, `/producto/*`, `/blog/{slug}/`, `/contacto/`).
- **Internal linking:** robusto. Mega-menú de 4 pilares (`site.ts:NAV_LINKS`), helpers `getRelatedServiceSlugs`/`resolveServiceMeta` (`site.ts:205-231`), `RelatedServices`, `QuickNav`/`QuickNavBottom` con chips contextuales, breadcrumbs. Commit `42c5bbd` reporta "+76 interlinking".
- **sitemap/robots:** `@astrojs/sitemap` con `filter` que excluye `/gracias`, `/contacto`, `/404`, `/blog/[slug]` legacy, `/servicios/*`, `/producto/`, `/uncategorized/` y `serialize` con prioridades graduadas (home 1.0, pilares L1 0.9, servicios L2 0.8, zonas/comunidades detalle 0.7, blog 0.6, etc.) — `astro.config.mjs:30-74`. `robots.txt` permite todo, bloquea internas, y **permite explícitamente bots IA** (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended) — `public/robots.txt`. Sitemap declarado: `/sitemap-index.xml`.
- **hreflang:** ⚠️ HUECO — no se emite ninguna etiqueta hreflang. Sitio monolingüe es-MX, sin alternativas de idioma; aceptable para el caso pero no implementado.
- **Verificación Search Console:** ⚠️ HUECO — no hay meta `google-site-verification` ni archivo de verificación, ni Google Analytics / GA4 / gtag / Plausible / Tag Manager en `src` o `public`. Pendiente según README ("Configurar Google Analytics 4 o Plausible").

## Sistema de diseño (tokens/tipografía/paleta y DÓNDE están; UI base; hero/cards/CTA/WhatsApp/breadcrumbs)
- **Tokens (DÓNDE):** `tailwind.config.mjs:6-49`. Paleta "estilo REDEIL: negro + rojo/coral":
  - `ink` (neutros oscuros): 950 `#0a0a0a` → 400 `#5a5a5a`.
  - `brand` (rojo/coral): 50 `#fff1f1` … 500 `#f43f3f` (primario) … 900 `#811c1c`.
  - `boxShadow.brand`, `letterSpacing.widest2: 0.18em`, `animation.fade-up` + keyframes `fadeUp`.
- **Tipografía:** `Inter` (sans + display), cargada vía Google Fonts con preconnect/preload en `BaseLayout.astro:137-149`. Headings `font-bold tracking-tight` (`global.css:23`). `.section-title` con `clamp(2rem,4.5vw,3.5rem)`.
- **UI base (en `global.css` @layer components):** `.container-pro` (max-w-1600px), `.eyebrow` (punto rojo + uppercase), `.btn`/`.btn-brand`/`.btn-ghost`/`.btn-dark`, `.service-card`(+image/body), `.card`/`.card-premium`, `.hairline`, `.section`, `.chip-row` (barra roja), y **`.prose-service`** — sistema tipográfico premium para el body MDX de L3 (H2 con badge numerado gradiente, H3 con barra brand, listas con bullets rojos, blockquote pull-quote, links brand). `mobile.css` aporta overrides responsive.
- **Hero:** `Hero.astro` — 2 columnas (titular gradiente brand `from-brand-400 via-brand-500 to-brand-700` + aside identidad con stats años/comunidades/cobertura). Defaults en props.
- **Cards:** `.service-card` (imagen 4:3 + overlay + número 0X + body) y `BadgeCard`.
- **CTA:** `.btn-brand` con sombra brand; CTAs duales "diagnóstico gratuito" + "WhatsApp 24/7" en ServiceLayout (`:423-432`); `CtaBanner.astro`.
- **WhatsApp:** `WhatsAppFloat.astro` (flotante global) + enlaces `wa.me/${SITE.contact.whatsapp}` con mensaje pre-cargado en hero/sidebar/footer.
- **Breadcrumbs:** `Breadcrumb.astro` (visible) emparejado con `SchemaBreadcrumb.astro` (JSON-LD).

## Convenciones (naming, idioma, lang, estructura de código, prettier/eslint)
- **Naming:** componentes y layouts en PascalCase `.astro`; páginas y slugs de contenido en kebab-case español (URLs reales de WordPress preservadas); colecciones en plural minúscula.
- **Idioma:** todo el contenido y comentarios en español de México. `<html lang="es-MX">` (`BaseLayout.astro:125`, `ServiceLayout` article `lang="es-MX"`). `defaultLocale: 'es-MX'`, OG `es_MX`.
- **Estructura de código:** fuente única de verdad en `src/config/site.ts` (datos de negocio, NAV, SERVICIOS/RRHH/ZONAS, FAQS, helpers de interlinking). Path aliases TS. Contenido desacoplado en MDX con frontmatter tipado por Zod. Separación clara contenido/presentación: las páginas de servicio son shells de 4 líneas que delegan en `ServiceLayout`.
- **Prettier:** configurado (`.prettierrc.json`) con plugins astro+tailwind. **ESLint:** ⚠️ HUECO — no hay `.eslintrc`. Type-check vía `astro check`.

## Flujos / procesos (cotización, contacto, WhatsApp, formularios)
- **Formulario de contacto:** en `/empresa-de-seguridad-privada-para-condominios/` (`empresa-de-seguridad-privada-para-condominios.astro:180-188`). `method="POST"`, **`data-netlify="true"`**, `netlify-honeypot="bot-field"`, input hidden `form-name=contacto`, `action="/gracias/"`. Campos: nombre*, teléfono*, email*, rol en comité (select), entre otros. **Depende de Netlify Forms** — solo funciona desplegado en Netlify; en otra plataforma el form no procesa (`docs/05-Tecnico/04-Troubleshooting.md:40`).
- **Página de gracias:** `/gracias/` (excluida de sitemap/robots).
- **Cotización:** CTA recurrente "cotización documentada en <48h hábiles" / "auditoría sin costo"; botones "Iniciar diagnóstico gratuito" (→ contacto) y "Solicitar cotización" (sidebar L3).
- **WhatsApp:** canal primario de conversión. `wa.me/525536282480` con mensaje pre-cargado, presente en flotante global, hero, sidebar de servicio y footer.
- **Redirects de UX:** `/contacto/` y `/servicios/` redirigen por meta-refresh+JS a las URLs canónicas SEO.

## Integraciones (Cloudflare/n8n/fal.ai/Brevo/GHA — evidencia con ruta o ⚠️ HUECO)
- **Netlify Forms:** evidencia real de uso → `empresa-de-seguridad-privada-para-condominios.astro:184` (`data-netlify="true"`). Es la única integración externa efectiva (y solo activa al desplegar en Netlify).
- **Cloudflare:** ⚠️ HUECO — sin `wrangler.toml`, `.wrangler`, `_redirects`, `_headers` ni adapter. Solo mencionado como opción de hosting en docs/README.
- **n8n:** ⚠️ HUECO — sin evidencia alguna en el repo.
- **fal.ai:** ⚠️ HUECO — sin evidencia alguna en el repo.
- **Brevo / Sendinblue:** ⚠️ HUECO — sin evidencia alguna en el repo.
- **GitHub Actions (GHA):** ⚠️ HUECO — no existe `.github/` ni workflows. Remote en GitHub (`Origenlab/seguridadprivadacondominios.com`) pero sin CI/CD.
- **Analytics / Tag Manager:** ⚠️ HUECO — sin GA4/gtag/GTM/Plausible.

## Clasificación
### ✅ (lo que está bien — línea + ruta cada uno)
- Arquitectura de contenido desacoplada y tipada con Zod; servicios L3 con schema riquísimo y layout que degrada elegante si faltan campos — `src/content/config.ts`, `src/layouts/ServiceLayout.astro`.
- Cobertura de Schema.org excepcional: 7 tipos JSON-LD (Organization/SecurityService/LocalBusiness, WebSite, Brand, Service, BreadcrumbList, FAQPage, HowTo, ItemList, Speakable, BlogPosting) — `src/components/Schema*.astro`, `src/layouts/BaseLayout.astro:27-155`.
- Fuente única de verdad para datos de negocio + NAV + interlinking helpers — `src/config/site.ts`.
- Sitemap con prioridades graduadas por nivel jerárquico y filtro de URLs legacy/internas — `astro.config.mjs:30-74`.
- robots.txt que habilita explícitamente bots de IA (GEO/AEO) — `public/robots.txt:18-35`.
- Preservación 1:1 de URLs de WordPress con redirects para slugs legacy (no rompe SEO) — `MIGRATION-PLAN.md`, `src/pages/blog/[...slug].astro`, `src/pages/contacto.astro`.
- Documentación interna seria y estructurada (26 .md en `docs/` + MIGRATION-PLAN + SEO-HIERARCHY) — `docs/`.
- Accesibilidad básica: skip-link, `lang="es-MX"`, focus states — `src/layouts/BaseLayout.astro:159-164`.
- Imágenes optimizadas en AVIF/WebP con variantes `-card` — `public/images/`.
- Sin secretos expuestos: scan de `gho_/ghp_/sk-/api_key/SECRET/Bearer` y de `.git/config` sin hallazgos reales (solo coincidencias de nombres de paquetes npm) — repo completo.

### ❌ (fallas/problemas — línea + ruta)
- Formulario de contacto atado a Netlify Forms sin fallback: si se despliega en Cloudflare/Vercel el form queda inerte (no procesa) — `empresa-de-seguridad-privada-para-condominios.astro:184`, `docs/05-Tecnico/04-Troubleshooting.md:40`.
- `aggregateRating` "4.9 / 184 reseñas" hardcodeado sin reviews verificables ni schema Review individual; riesgo de marcado engañoso/penalización Rich Results — `src/config/site.ts:12`, `src/layouts/BaseLayout.astro:77-81`, `src/components/SchemaService.astro:74`.
- Redes sociales son placeholders (`https://facebook.com/`, etc.); el `sameAs` los filtra pero quedan en `SITE.social` y podrían filtrarse a UI — `src/config/site.ts:33-37`.
- Sin verificación de Search Console ni analítica desplegada (no se puede medir ni indexar deliberadamente) — sin meta GSC / GA en `src`,`public`.
- Sin CI/CD ni configuración de deploy versionada; despliegue 100% manual y plataforma sin decidir (riesgo de drift y de romper el form) — ausencia de `.github/`, `netlify.toml`, `CNAME`.
- Carpeta residual `src/content/blog-uncategorized/` vacía (colección no declarada) — `src/content/blog-uncategorized/`.
- Inconsistencia documental: README dice identidad "negro + dorado" pero el sistema real es "negro + rojo/coral" (brand `#f43f3f`) — `README.md:6` vs `tailwind.config.mjs:8`.

### 🤖 (oportunidades de automatización/IA — línea + ruta)
- Lead capture del form podría enrutarse a un webhook/n8n + Brevo (email transaccional/CRM) y notificación WhatsApp en lugar de depender de Netlify Forms — `empresa-de-seguridad-privada-para-condominios.astro:180`.
- Generación asistida de los 137 posts ya en curso ("reescritura humanizada", `git log`); formalizar pipeline de generación/QA de blog con plantillas y verificación de interlinking automatizada — `src/content/blog/`, commit `42c5bbd`.
- Las 14 zonas + 4 comunidades son páginas-plantilla data-driven; un generador podría escalar a más alcaldías/municipios desde un dataset — `src/content/zonas/`, `src/pages/zonas/[...slug].astro`.

### 📐 (deuda de diseño/arquitectura — línea + ruta)
- 16 páginas de servicio son shells idénticas de 4 líneas que solo varían el `slug`; podrían colapsarse en una ruta dinámica `getStaticPaths` para eliminar duplicación (se mantienen explícitas por preservación de URL, pero es deuda) — `src/pages/control-de-acceso.astro` y 15 hermanas.
- Blog sin layout dedicado: la lógica vive en `BlogArticle.astro` que reenvuelve `BaseLayout`, y hay 6 rutas casi idénticas por categoría que repiten el patrón getStaticPaths+props — `src/pages/{seguridad-privada,vigilancia,...}/[...slug].astro`.
- `mobile.css` separado de `global.css` sugiere overhaul responsive posterior (cascada con !important probable); deuda de consolidación del sistema responsive — `src/styles/mobile.css`.
- Defaults de copy extensos embebidos en `Hero.astro`/`ServiceLayout.astro` (texto largo en props por defecto) mezclan contenido con presentación — `src/components/Hero.astro:19-29`, `src/layouts/ServiceLayout.astro:92-98`.

## ⚠️ HUECOS (lista de qué falta y por qué)
- **Plataforma de deploy real:** no decidida/configurada (sin `netlify.toml`/`vercel.json`/`wrangler.toml`/`CNAME`). Por qué importa: el form de contacto solo funciona en Netlify; desplegar en otra rompe la captación de leads.
- **Backend del formulario independiente de hosting:** no existe; dependencia exclusiva de Netlify Forms (`docs/05-Tecnico/04-Troubleshooting.md:40`).
- **Verificación Google Search Console:** ausente — no se indexará/medirá de forma controlada.
- **Analítica (GA4/Plausible/GTM):** ausente — sin medición de tráfico ni conversiones.
- **hreflang:** no implementado (sitio monolingüe es-MX; aceptable pero sin marcado explícito).
- **CI/CD (GitHub Actions):** ausente — build y deploy manuales pese a tener remote en GitHub.
- **Reseñas verificables:** `aggregateRating` hardcodeado sin fuente (`site.ts:12`); falta integración real o retiro del marcado para evitar riesgo.
- **Redes sociales reales:** placeholders en `site.ts:33-37`.
- **`@astrojs/rss` declarado pero sin feed detectado:** posible dependencia sin uso o feed pendiente (`package.json:18`).
- **Carpeta `src/content/blog-uncategorized/` vacía:** residuo sin colección declarada; limpiar o documentar.
