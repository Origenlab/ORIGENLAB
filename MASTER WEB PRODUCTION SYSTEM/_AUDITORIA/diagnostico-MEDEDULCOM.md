# Diagnóstico — MEDEDULCOM

> Propósito: Sitio comercial de MEDEDUL — renta de mesas de dulces, candy bar y servicios premium para eventos (bodas, XV, corporativos) en CDMX, Edomex y Toluca; Astro 5 + Markdown, SEO local agresivo.

## Identidad

- **Negocio:** MEDEDUL — "Mesas de Dulces & Candy Bar Premium" para eventos en CDMX y Estado de México. Razón comercial `mededul-site`. (Evidencia: `mededul-site/src/data/site.ts` L5-13; `package.json` description.)
- **Tipo:** Sitio de servicios/renta para eventos con catálogo (servicios + paquetes), landings hiperlocales por colonia/municipio, portafolio de casos reales, blog SEO y captación por WhatsApp/formulario. SSG puro.
- **ARQUETIPO: B (renta/eventos) — primario, con fuerte D (contenido/directorio local).** Justificación: el core de negocio es **renta y servicio para eventos** (mesa de dulces, máquinas de palomitas/algodón, fuente de chocolate, paquetes Essential/Signature/Atelier/Bespoke con `priceFrom` y schema `Product`/`Offer`) → arquetipo B inequívoco (`src/content/services/`, `src/content/packages/`, `src/content/events/`). El componente D es robusto: **20 landings hiperlocales** por alcaldía/municipio (`src/content/locations/`) con venues, logística y FAQ + cluster de blog SEO (19 posts) + casos. No es catálogo técnico (A) ni servicio puramente local de una sola sede (C: de hecho tiene 3 sucursales).
- **Estado:** Maduro y rico en contenido. 8 servicios, 5 tipos de evento, 4 paquetes, **20 cobertura**, 7 casos, 19 blog posts, 12 testimonios. `.astro/` cache presente (se ha corrido dev). Build de producción listo. Idioma 100% español de México.
- **Relación con proyectos hermanos (LOS TRES "mededul"):**
  - **MEDEDULCOM/mededul-site** (ESTE) = **working copy SIN git propio** (`.git` no existe en la subcarpeta), pero es el **superconjunto más completo y reciente** de contenido.
  - **mededul-com-repo** = el **repositorio git oficial** (remote `https://github.com/Origenlab/mededul.com.git`), pero es una **versión anterior/reducida** (solo 4 cobertura, 2 casos; sin `AboutMededul.astro` ni `L2Interlink.astro`).
  - **MEDEDULCOM/index.html** (hermano en la raíz `MEDEDULCOM/`) = un HTML estático suelto (57 KB) + `MEDEDUL-Planeacion-Estrategica-Premium.docx` (planeación). No es el sitio Astro; es material previo/landing single-file.
  - **Veredicto:** `mededul-site` y `mededul-com-repo` son **el mismo proyecto en dos estados divergentes**. `mededul-site` añadió 16 cobertura, 5 casos, 16 blog posts y 2 componentes que **nunca se commitearon al repo git** → riesgo de pérdida (el trabajo más valioso vive fuera de control de versiones). `docs/` y `src/data/site.ts` son **idénticos** entre ambos (diff vacío), confirmando ancestro común. Ver `diagnostico-mededul-com-repo.md` para el detalle de la variante.
  - Comparte arquitectura de fábrica ORIGENLAB con CABOIMAGE (Astro + content collections + WhatsApp + schema JSON-LD + SEO local) pero **diverge en CSS**: MEDEDUL usa **CSS vanilla con design tokens** (`tokens.css`), CABOIMAGE usa **Tailwind**.

## Stack

- **Astro:** `^5.1.1` (Evidencia: `package.json`). Una major por delante de CABOIMAGE.
- **Integraciones:** `@astrojs/mdx ^4.0.3` (gfm+smartypants), `@astrojs/sitemap ^3.2.1` (**activo**, con i18n `es-MX`, changefreq weekly, filtro excluye `/admin` y `/borradores`), `@astrojs/rss ^4.0.10`, `sharp ^0.33.5`. (Evidencia: `astro.config.mjs`)
- **CSS:** **vanilla con design tokens** — `src/styles/tokens.css` (custom properties) importado por `src/styles/global.css`. Sin Tailwind. Minificación `cssMinify:'lightningcss'` en vite (NOTA: el repo git tuvo un commit `fix: elimina cssMinify lightningcss que causaba error en build` → posible inconsistencia entre las dos copias; ver §HUECOS).
- **Tipografía:** Google Fonts `Fraunces` (display) + `Plus Jakarta Sans` (body), cargadas en `BaseLayout`.
- **Adapter / output:** SSG estático, `trailingSlash:'always'`, `build.format:'directory'`, `inlineStylesheets:'auto'`, `prefetch` (prefetchAll, viewport). Sin adapter SSR.
- **Deploy:** sin config de plataforma en el repo (`docs/DEPLOY.md` documenta Vercel/Cloudflare Pages/Netlify como opciones con build `npm run build` → `dist/`). `site:'https://mesas-de-dulces.com'` en config, pero `site.ts.url` también `mesas-de-dulces.com` (el repo git tuvo commit `fix: corrige site URL de mesas-de-dulces.com a mededul.com` → divergencia de dominio entre copias; ver §HUECOS).

## Estructura de carpetas

```
mededul-site/
├── astro.config.mjs, tsconfig.json (alias @/@components/@layouts/@styles/@data/@utils/@content), package.json, .env.example, README.md
├── public/            (favicon, og, etc.)
├── docs/              ARCHITECTURE.md · CONTENT.md · SEO.md · DEPLOY.md
└── src/
    ├── content/  config.ts + blog(19) + services(8) + events(5) + packages(4) + locations(20) + cases(7) + testimonials(12 json)
    ├── data/     site.ts (config global: contacto, 3 sucursales, social, stats, áreas) · nav.ts (mainNav+footerNav)
    ├── utils/    schema.ts (helpers JSON-LD: localBusiness/service/article/faq/product)
    ├── layouts/  BaseLayout, ServiceLayout, EventLayout, PackageLayout, LocationLayout, BlogLayout
    ├── components/ SEO, TopBar, Header, Footer, WhatsAppFloat, Hero, Quicklinks, ServiceCard,
    │              PackageCard, EventCard, TestimonialCard, FAQ, Breadcrumbs, ContactForm, AboutMededul, L2Interlink
    ├── pages/    index, nosotros, contacto, cotizar, faq, 404, aviso-de-privacidad, terminos-y-condiciones,
    │             servicios/(index,[slug]), eventos/(index,[slug]), paquetes/(index,[slug]),
    │             cobertura/(index,[slug]), portafolio/(index,[slug]), blog/(index,[slug]),
    │             robots.txt.ts, rss.xml.ts
    └── styles/   tokens.css + global.css
```

## Layouts — jerarquía

```
BaseLayout.astro  (HTML shell lang=es-MX; SEO + Header + Footer + WhatsAppFloat; localBusinessSchema por defecto; slots head/end)
 ├── ServiceLayout.astro  → Breadcrumbs + hero(precio) + "qué incluye" + slot MD + FAQ + ContactForm; serviceSchema + faqSchema
 ├── EventLayout.astro     → hero aspiracional + contenido + FAQ + CTA
 ├── PackageLayout.astro   → hero con precio + incluye + idealFor + CTA (Product schema)
 ├── LocationLayout.astro  → hero local + venues + zonas + logística + FAQ (LocalBusiness con areaServed)
 └── BlogLayout.astro      → post hero + cuerpo + tags + FAQ + CTA (Article + BreadcrumbList)
```
- `BaseLayout` siempre emite `localBusinessSchema()` (de `utils/schema.ts`); cada layout pasa `schema` específico (uno solo o `@graph` si hay FAQ). Evidencia: `BaseLayout.astro` L29-31, `ServiceLayout.astro` L14-29.

## Componentes — inventario

| Componente | Ruta | Props | Uso |
|---|---|---|---|
| SEO | `src/components/SEO.astro` | `title?, description?, image?, imageAlt?, type, canonical?, noindex?, publishedTime?, modifiedTime?, schema?` | Metadata/OG/Twitter/canonical/robots/JSON-LD |
| TopBar | `src/components/TopBar.astro` | — | Barra superior contacto |
| Header | `src/components/Header.astro` | — | Nav principal con submenús (desde `nav.ts`) + menú móvil |
| Footer | `src/components/Footer.astro` | — | Footer global (footerNav) |
| WhatsAppFloat | `src/components/WhatsAppFloat.astro` | `message?` | CTA flotante WhatsApp (lee `site.contact.whatsapp`) |
| Hero | `src/components/Hero.astro` | `kicker?, title?, highlight?, italicWord?, subtitle?, lead?, showQuicklinks?` | Hero parametrizable home/L2 |
| Quicklinks | `src/components/Quicklinks.astro` | (interface Props) | Accesos rápidos post-hero |
| ServiceCard | `src/components/ServiceCard.astro` | (interface Props) | Card de servicio |
| PackageCard | `src/components/PackageCard.astro` | (interface Props) | Card de paquete con precio |
| EventCard | `src/components/EventCard.astro` | (interface Props) | Card tipo de evento |
| TestimonialCard | `src/components/TestimonialCard.astro` | (interface Props) | Card de testimonio (rating/venue) |
| FAQ | `src/components/FAQ.astro` | `items, kicker?, title?` | Acordeón FAQ + alimenta faqSchema |
| Breadcrumbs | `src/components/Breadcrumbs.astro` | `items: Crumb[]` | Migas de pan (usado en todos los L2/L3) |
| ContactForm | `src/components/ContactForm.astro` | (interface Props) | Form que arma mensaje y abre **WhatsApp** (`wa.me`) — sin backend |
| AboutMededul | `src/components/AboutMededul.astro` | (interface Props) | Bloque "nosotros" reutilizable **(solo en mededul-site, no en repo)** |
| L2Interlink | `src/components/L2Interlink.astro` | `current?, featured?` | Hub editorial de interlinking entre L2 (servicios/eventos/paquetes/etc.) **(solo en mededul-site)** |

## Content Collections / esquemas / taxonomías

`src/content/config.ts` (Zod, **usa `reference()` para relacionar colecciones** — más sofisticado que CABOIMAGE):
- **blog** (content): title(≤80), description(80-170), pubDate, updatedDate?, heroImage/Alt, `category` enum(bodas/xv-anos/corporativos/fiestas-infantiles/tendencias/ideas/guias-precios/casos-reales), tags[], author(default Equipo MEDEDUL), readTime?, draft, featured, `relatedServices`/`relatedEvents` (references), `faq[]`. → 19 posts.
- **services** (content): title, shortTitle?, description, icon, `color` enum(pink/turq/yellow/lavender/coral/mint), heroImage, order, featured, `includes[]`, priceFrom?, priceNote?, duration?, gallery?, `faq[]`, `relatedEvents`/`relatedPackages` (refs), seoTitle/Desc, draft. → 8.
- **events** (content): title, description, icon, color, order, featured, tagline?, typicalGuests?, typicalBudget?, `recommendedServices`/`recommendedPackages` (refs), faq[], seo*, draft. → 5.
- **packages** (content): name, `tier` enum(Essential/Signature/Atelier/Bespoke), tagline, description, priceFrom?, priceNote('MXN'), maxGuests?, duration?, color, featured, order, `includes[]`, idealFor?, addons?, seo*, draft. → 4.
- **locations** (content): city, `state` enum(CDMX/Edomex/Toluca/Morelos/Querétaro), borough?, `tier`(premium/standard), description, heroImage, venues[], neighborhoods[], logistics?, faq[], lat/lng?, seo*, draft, order. → 20.
- **cases** (content): title, description, eventType, eventDate, guests, location, venue?, packageUsed?, heroImage, gallery?, videoUrl?, challenge/solution/result?, clientQuote/Name?, `servicesUsed` (refs), featured, draft. → 7.
- **testimonials** (data): name, role?, eventType, location, date, rating(1-5), quote, avatar?, `avatarColor` enum, featured, `caseStudy`(ref), business?, businessUrl?. → 12 json.
- **Taxonomías:** colecciones tipadas + enums de color/tier/state + grafo de relaciones vía `reference()` (servicios↔eventos↔paquetes↔casos↔testimonios). Nav jerárquico en `nav.ts`.

## SEO real

- **Metas:** `SEO.astro` → `<title>` (`{título} | MEDEDUL` o tagline), description (default `site.description`), canonical absoluto (`Astro.url.pathname` + `site.url`), `robots` con `max-image-preview:large, max-snippet:-1`, `theme-color`, `geo.placename`/`geo.region MX-CMX`, OpenGraph completo (`og:locale es_MX`, image 1200×630), Twitter `summary_large_image`, `article:published/modified_time` condicional. Evidencia: `SEO.astro`.
- **Schema (JSON-LD), tipos + rutas** (helpers en `utils/schema.ts`):
  - `LocalBusiness` (con `aggregateRating` 4.9/500, `openingHours`, `geo`, `areaServed`, `sameAs` social) — global (`BaseLayout`).
  - `Service` + `Offer` — `/servicios/[slug]` (`ServiceLayout`).
  - `FAQPage` — añadido como `@graph` cuando hay FAQ (servicios, eventos, locations, blog).
  - `Product` + `Offer` — `/paquetes/[slug]` (`PackageLayout`).
  - `Article` + `BreadcrumbList` — `/blog/[slug]` (`BlogLayout`, según `docs/SEO.md`).
  - `LocalBusiness` con `areaServed` específico — `/cobertura/[slug]`.
  - (`docs/SEO.md` también documenta CreativeWork+Review para casos.)
- **URLs:** español, kebab-case sin acentos, `trailingSlash:'always'` (ej. `/servicios/mesa-de-dulces/`, `/cobertura/polanco/`). Slugs derivados del filename del MD.
- **Internal linking:** fuerte — `nav.ts` (mainNav con submenús + footerNav 4 columnas), `Quicklinks`, `L2Interlink` (hub editorial de 3-4 destinos curados al final de cada L2), `Breadcrumbs` en todas las páginas, `relatedServices/Events/Packages` vía references.
- **Sitemap:** `@astrojs/sitemap` **activo** → `/sitemap-index.xml` (+ `sitemap-0.xml`), con i18n es-MX y filtro. `robots.txt.ts` (dinámico) apunta correctamente a `sitemap-index.xml`. RSS en `/rss.xml` (`rss.xml.ts`). ✅ Coherente (a diferencia de CABOIMAGE).
- **robots.txt:** generado por `src/pages/robots.txt.ts`: Allow `/`, Disallow `/admin/ /borradores/ /api/`, Sitemap correcto.

## Sistema de diseño

- **Tokens / tipografía / paleta:** **`src/styles/tokens.css`** (CSS custom properties). Paleta multicolor fresca: 6 acentos con variante soft (`--pink #FF3D7F`, `--turq #3DD9D6`, `--yellow #FFD93D`, `--lavender #B383FF`, `--coral #FF8C5A`, `--mint #A8E6B5`), neutros (`--ink`, `--cream`, `--border`), WhatsApp (`--wa #25D366`). Tipografía: `--font-display:Fraunces`, `--font-body:Plus Jakarta Sans`; escala fluida `--fs-xs..5xl` con `clamp()`. Sombras (rosa), radios (24/14/8), spacing 1-24, transiciones, layout (`--header-h`, `--gutter` fluido). Responsive `--header-h` en ≤768px.
- **UI base:** botones por clase (`.btn .btn-primary/.btn-wa/.btn-ghost`), `.tag tag-{color}`, `.container`, `.sec-head`, `.prose` (en `global.css`). El enum `color` de las colecciones mapea a los tokens de acento.
- **Hero:** `Hero.astro` parametrizable (kicker/title/highlight/italicWord/subtitle, grid). **Cards:** ServiceCard/PackageCard/EventCard/TestimonialCard. **CTA:** `.btn-primary` "Cotizar" + `.btn-wa` WhatsApp en cada layout. **WhatsApp:** `WhatsAppFloat` flotante + CTAs `wa.me` con mensaje pre-armado. **Breadcrumbs:** ✅ `Breadcrumbs.astro` (presente y usado).

## Convenciones

- TS strict (`astro/tsconfigs/strict`), alias `@/@components/@layouts/@styles/@data/@utils/@content` (sí usados en imports).
- URLs minúsculas sin acentos, kebab-case, `trailingSlash:'always'`; slugs derivados del filename del Markdown.
- Contenido editable 100% en Markdown/JSON validado por Zod (build falla si no cumple) — documentado en `docs/CONTENT.md`.
- Config global centralizada en `data/site.ts` (contacto, 3 sucursales con geo, social, stats, áreas, categorías GBP) y `data/nav.ts`.
- Prettier + `prettier-plugin-astro`; script `check: astro check`.
- Imágenes previstas en `public/img/{collection}/` con Sharp.

## Flujos / procesos

- **Captación de lead — WhatsApp-first, sin backend:** `ContactForm.astro` no hace POST a un servidor — **arma un mensaje y abre `https://wa.me/525525226442?text=...`** (L22). `WhatsAppFloat` y todos los CTAs ("Cotizar este servicio", `/cotizar/`) abren WhatsApp con texto pre-rellenado. Página `/cotizar/` y `/contacto/` como destinos.
- **Navegación SEO:** Home → L2 (servicios/eventos/paquetes/cobertura/blog) → L3 (slug) → `L2Interlink` recircula a otros hubs → CTA WhatsApp. Cluster de blog (19 posts en categorías) para captar long-tail; cobertura hiperlocal (20 colonias) para SEO local.
- **3 sucursales** (Anzures, Condesa, Toluca) con geo y teléfonos diferenciados (CDMX vs Toluca) en `site.ts` → soporte multi-zona.
- **Build:** `npm run build` → `dist/`; `astro check` para validación de tipos/contenido.

## Integraciones

- **Cloudflare:** ⚠️ HUECO — `docs/DEPLOY.md` lista Cloudflare Pages como opción, pero sin `wrangler.toml`/config en repo.
- **n8n:** ⚠️ HUECO — sin evidencia (grep 0).
- **fal.ai:** ⚠️ HUECO — sin evidencia.
- **Brevo:** ⚠️ HUECO — sin evidencia. `.env.example` prevé `RESEND_API_KEY` + `FORMS_ENDPOINT` (email/forms server-side) pero **no están cableados** — el form usa WhatsApp, no envío de correo.
- **GitHub Actions:** ⚠️ HUECO — sin `.github/workflows/`. (El repo hermano `mededul-com-repo` SÍ tiene historial git en GitHub Origenlab, pero sin CI visible.)
- **Analytics:** `.env.example` prevé GA4/GTM/Meta Pixel/Clarity (todos vacíos) — no inyectados en layouts en esta copia → no activos.

## Documentación previa

No hay vault Obsidian para MEDEDUL, pero **sí documentación interna en `docs/`** (4 archivos, idénticos entre `mededul-site` y `mededul-com-repo`):
- `ARCHITECTURE.md` — decisiones de stack (Astro 5 SSG, por qué content collections + Zod, tabla de routing filesystem→URL, layouts y componentes).
- `CONTENT.md` — guía para crear/editar Markdown por colección.
- `SEO.md` — checklist on-page, tabla de schema por tipo de página, sitemap, performance.
- `DEPLOY.md` — guía Vercel/Cloudflare/Netlify, variables de entorno, DNS, SSL, redirects 301.
- Además en la raíz `MEDEDULCOM/`: `MEDEDUL-Planeacion-Estrategica-Premium.docx` (planeación estratégica del negocio) e `index.html` (landing single-file previa, no Astro).

## Clasificación

### ✅ Lo bien hecho
- Content collections con grafo de relaciones (`reference()`) entre servicios/eventos/paquetes/casos/testimonios → modelo de datos coherente y tipado. — `src/content/config.ts`
- SEO local de alto nivel: 20 landings hiperlocales con venues/logística/FAQ + cluster de 19 blog posts + sitemap/RSS/robots dinámicos coherentes. — `src/content/locations/`, `src/pages/sitemap`/`robots.txt.ts`/`rss.xml.ts`
- Sistema de tokens CSS completo y reutilizable; helpers JSON-LD centralizados (`utils/schema.ts`) con LocalBusiness/Service/Product/FAQ/Article. — `src/styles/tokens.css`, `src/utils/schema.ts`
- Documentación `docs/` (arquitectura/contenido/SEO/deploy) clara y mantenida.

### ❌ Lo que falla / riesgos
- **Divergencia git no controlada:** el contenido más valioso (16 cobertura, 5 casos, 16 posts, 2 componentes, home rediseñado) vive en `mededul-site` que **NO tiene `.git`**; el repo oficial (`mededul-com-repo`) está atrás. Riesgo alto de pérdida. — `mededul-site/.git` (ausente) vs `mededul-com-repo` remote Origenlab.
- **Inconsistencias entre copias:** dominio (`mesas-de-dulces.com` en site.ts/config de esta copia vs commit `fix: corrige site URL ... a mededul.com` en repo) y `cssMinify lightningcss` (presente aquí, eliminado por commit en repo "que causaba error en build") → esta copia puede romper el build. — `astro.config.mjs` L67-71 vs git log repo.
- **Captación 100% dependiente de WhatsApp**, sin captura de lead a base de datos/email (Resend/FORMS_ENDPOINT previstos pero no cableados) → no hay registro propio del lead si el usuario no completa el chat. — `ContactForm.astro` L22.
- **Nav promete páginas inexistentes:** `nav.ts` lista servicios (`mesa-de-frutas`, `mesa-de-botanas`, `cabina-360`) y eventos (`graduacion`, `cumpleanos-infantil`, `despedida-soltera`, `bautizo-primera-comunion`) que **no tienen archivo de contenido** → enlaces 404. — `src/data/nav.ts` vs `src/content/services|events/`.

### 🤖 Automatizable / oportunidad
- Generación de landings de cobertura desde un dataset (CSV de colonias) reutilizando `LocationLayout` → escalar de 20 a N colonias automáticamente.
- Cablear `ContactForm` a n8n/Resend/Brevo para captura de lead + autorespuesta, manteniendo WhatsApp como CTA secundario.
- Sincronizar `mededul-site` → repo git (commit del trabajo divergente) y CI de build (GitHub Actions) para prevenir builds rotos.

### 📐 Patrón replicable (fábrica)
- **Modelo canónico del arquetipo B/D:** colecciones services/events/packages/locations/cases/testimonials con `reference()` + 6 layouts especializados + `utils/schema.ts` → plantilla ideal para negocios de renta/eventos con SEO local. — `src/content/config.ts`, `src/layouts/*`, `src/utils/schema.ts`
- `L2Interlink` (hub editorial de interlinking curado) y `Breadcrumbs` → patrones de arquitectura de enlaces que CABOIMAGE no tiene y debería heredar. — `src/components/L2Interlink.astro`, `Breadcrumbs.astro`
- Tokens CSS vanilla (`tokens.css`) como alternativa ligera a Tailwind para la fábrica.

## ⚠️ HUECOS

- **`mededul-site` sin control de versiones** (no hay `.git`): el estado más completo no está respaldado en git. Por qué: se trabajó como copia local fuera del repo oficial.
- **Dominio y cssMinify divergentes** entre `mededul-site` (esta copia) y el repo git → ambigüedad sobre cuál es la fuente de verdad y si el build de esta copia funciona (lightningcss fue eliminado en el repo por romper build). Confirmar antes de desplegar.
- **Enlaces de nav a contenido inexistente** (4+ servicios/eventos sin .md) → 404 potenciales hasta crear el contenido.
- **Integraciones (Cloudflare/n8n/fal.ai/Brevo/GHA):** sin evidencia en el repo. Resend/FORMS_ENDPOINT previstos, no cableados. Analytics previstos, no inyectados.
- **Deploy/plataforma final indefinida** (docs sugieren 3 opciones; sin config commiteada).
- **Seguridad:** ✅ Sin tokens/secretos expuestos (grep `gho_`/`sk-`/`api_key`/`SECRET`/`AIza`/`re_` → 0 en `src`/`.mjs`/`.env.example`; el número de WhatsApp `525525226442` está hardcodeado en `ContactForm.astro` L22 pero es dato público de contacto, no un secreto).
