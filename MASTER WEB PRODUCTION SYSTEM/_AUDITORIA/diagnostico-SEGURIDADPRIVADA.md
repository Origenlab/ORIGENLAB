# Diagnóstico — SEGURIDADPRIVADA
> Propósito: Sitio estático Astro 5 de generación de leads para ORIGINS Private Security, empresa de seguridad privada en CDMX/Edomex especializada en condominios y residenciales, con fuerte arquitectura SEO local (servicios + zonas + blog + emergencias).

## Identidad
- **Negocio:** ORIGINS PRIVATE SECURITY S.A. DE C.V. — evidencia: `src/pages/index.astro` (schema `legalName`, líneas 40-41), `vault/Project Context.md` (línea 5).
- **Dominio:** `https://seguridad-privada.com.mx` — evidencia: `astro.config.mjs` (`site`, línea 5), `CNAME` (`seguridad-privada.com.mx`), `public/CNAME`.
- **Tipo de sitio:** Sitio corporativo de servicio profesional local con motor SEO (catálogo de 21 servicios + 11 zonas geográficas + 35 artículos de blog + directorio de emergencias). Generación de leads por WhatsApp + formulario.
- **ARQUETIPO: C = servicio profesional local.** Justificación con evidencia:
  - Schema raíz `["LocalBusiness","SecurityService","ProfessionalService"]` con `address`, `geo`, `openingHoursSpecification`, `areaServed` por ciudad — `src/pages/index.astro` (líneas 38-89).
  - Páginas de zona para SEO local (`src/content/zonas/` × 11: alvaro-obregon, atizapan, benito-juarez, coyoacan, cuauhtemoc, gustavo-a-madero, iztapalapa, miguel-hidalgo, naucalpan, tlalnepantla, xochimilco) renderizadas vía `src/pages/zonas/[slug].astro`.
  - Conversión por contacto local: teléfono `tel:+525530255580`, WhatsApp `wa.me/525530255580`, formularios a `formsubmit.co` — no hay carrito, precios de catálogo ni reservas/eventos.
  - Posicionamiento "especialistas, no generalistas" en `vault/Project Context.md` (líneas 14-23).
  - Nota: tiene un fuerte componente de **directorio/contenido** (D) por el blog de 35 posts y las páginas de emergencias (bomberos, cruz-roja, policía, etc.), pero el núcleo de negocio y schema es servicio profesional local (C).
- **Estado:** Activo y en iteración. Último commit `9656e05 feat(blog): imagenes img-eventos + voz humanizada en 5 articulos de eventos`; historial reciente muestra trabajo "Día 1/Día 2 Fase 1" de restructura SEO. `dist/` presente (build reciente, May 30). Existen ramas `main` y `restructure-2026` (`.git/config`).

## Stack
- **Astro:** `^5.1.0` — `package.json` (línea 14). Content Layer API de Astro 5 (`glob` loader) en `src/content.config.ts`.
- **Integrations:** `@astrojs/sitemap ^3.2.0` (única integración) — `package.json` (línea 13), `astro.config.mjs` (líneas 11-69) con `serialize` custom de prioridades/changefreq por tipo de URL.
- **CSS:** CSS plano modular con custom properties. **NO hay Tailwind ni PostCSS** (verificado: no existen `tailwind.config.*` ni `postcss.config.*`). Tokens en `src/styles/global.css` (`:root`, líneas 6-51) + `@import './mobile.css'` al final (línea 350). Estilos divididos en `src/styles/sections/*` (×12), `src/styles/pages/*` (×11), `src/styles/patterns/servicio-premium.css`. Mucho CSS también `<style>` scoped dentro de componentes y páginas.
- **TypeScript:** `astro/tsconfigs/strict` + alias `@/*`, `@components/*`, `@layouts/*`, `@styles/*` — `tsconfig.json`.
- **Adapter/output:** `output: 'static'`, `trailingSlash: 'never'`, `build.format: 'file'` (genera `página.html` en vez de `página/index.html`) — `astro.config.mjs` (líneas 6-10). Sin adapter SSR.
- **Deploy:** ⚠️ **AMBIGÜEDAD/CONFLICTO.** Coexisten dos pipelines:
  - GitHub Pages activo: `.github/workflows/deploy.yml` (build Astro + `actions/deploy-pages@v4`, trigger push a main/master) + `CNAME` + `public/.nojekyll`.
  - Artefactos de Cloudflare Pages: `wrangler.toml` (`pages_build_output_dir = "dist"`), `public/_headers` (security + cache), `public/_redirects` (301s). `_headers`/`_redirects` son sintaxis de Cloudflare/Netlify y **NO los honra GitHub Pages**.
- **Build pipeline:** `npm run build` → `astro build` → `dist/`. CI: `npm ci || npm install` luego `astro build`, sube `dist/` (`deploy.yml` líneas 31-38).
- **Analytics:** Rybbit (`data-site-id="1746096009d5"`) — `src/layouts/Base.astro` (líneas 34-39).

## Estructura de carpetas
```
SEGURIDADPRIVADA/
├── astro.config.mjs, tsconfig.json, package.json, wrangler.toml, CNAME, .gitignore
├── AUDIT-REPORT.md                      # auditoría previa (2026-04-01)
├── ESTUDIO-*.md (×5), IMAGEN-STRATEGY.md # research SEO (ver HUECOS / nota)
├── *.docx (×5), *.xlsx (×1), day-1-baseline/  # deliverables research (gitignored)
├── .github/workflows/deploy.yml
├── scripts/                             # audit-zonas, health-check, test-redirects, validate-schemas (.sh)
├── vault/                               # Obsidian: Project Context, Design System, Pages, Decisions (gitignored)
├── public/
│   ├── robots.txt, _headers, _redirects, CNAME, .nojekyll, site.webmanifest
│   ├── favicon.ico, icon.svg, icon.png, img/og-image.*
│   └── img/<servicio|sector>/*.avif      # ~30 carpetas, cientos de imágenes AVIF
├── dist/                                # build presente
└── src/
    ├── content.config.ts
    ├── layouts/Base.astro               # único layout
    ├── components/ (×16 + icons/StarRating)
    ├── content/{servicios×21, blog×35, zonas×11, testimonios×1}
    ├── data/ (×6 .ts: featured-services, homepage-*, servicios-faqs, index)
    ├── pages/ (index, nosotros, contacto, bolsa-de-trabajo, aviso, mapa, 404
    │           + servicios/[...slug]+index, zonas/[slug]+index,
    │             blog/[...slug]+index, emergencias/ ×6 + index)
    └── styles/ {global, mobile, pages/×11, sections/×12, patterns/×1}
```

## Layouts — jerarquía
| Layout | Ruta | Herencia | Props | Uso |
|---|---|---|---|---|
| Base | `src/layouts/Base.astro` | Raíz (único layout) | `title, description, canonical?, ogType?, ogImage?, noindex?, schema?, useLegacyCSS?` | TODAS las páginas. Renderiza `<SEOHead>`, script Rybbit, sprite SVG inline (phone/pin/arrow/shield/clock), `<Header>`, `<main>`+slot, `<Footer>`, `<WhatsAppWidget>`. `lang="es"`. |

Nota: `useLegacyCSS` está declarado como prop (línea 16) pero **no se usa** en el cuerpo del layout (deuda menor / prop muerta).

## Componentes — inventario
| Componente | Ruta | Props | Uso |
|---|---|---|---|
| SEOHead | `src/components/SEOHead.astro` | `title, description, canonical?, ogType?, ogImage?, noindex?, schema?` | Metas, OG/Twitter, geo tags, canonical (con strip de trailing slash), robots, favicon, Google Site Verification, JSON-LD. Usado por Base. |
| Header | `src/components/Header.astro` | (sin props; usa `Astro.url`) | Header sticky con mega-menú desktop (4 columnas) + active-state helper. Incluye `<TopBar>`. |
| TopBar | `src/components/TopBar.astro` | — | Barra superior (teléfono/credenciales). |
| Footer | `src/components/Footer.astro` | — | Footer global. |
| WhatsAppWidget | `src/components/WhatsAppWidget.astro` | `phoneNumber?, defaultMessage?, position?, showTooltip?, tooltipText?, tooltipDelay?, agentName?, chatTitle?, businessHours?, offlineMessage?` | Burbuja flotante con panel de "chat" simulado, tooltip, detección de horario laboral (8-20h, cierra domingos), abre `wa.me`. JS vanilla IIFE. |
| HeroPagina | `src/components/HeroPagina.astro` | `badge, titulo, descripcion, breadcrumb?, ctaPrimario?, ctaWhatsapp?, seoParrafo1?, seoParrafo2?` | Hero 2 columnas para páginas internas; emite BreadcrumbList JSON-LD. |
| NavCTA | `src/components/NavCTA.astro` | `cards:[NavCard×4], ariaLabel?, footer?` | Bloque de 4 tarjetas de navegación/CTA (con iconos predefinidos, variante WhatsApp/accent). |
| PageCTA | `src/components/PageCTA.astro` | `titulo, descripcion, ctaPrimario?, ctaWhatsapp?` | CTA de cierre de página (fondo oscuro). |
| ServiceCard | `src/components/ServiceCard.astro` | `href, image, imageAlt, badge, title, description, features, ctaText` | Tarjeta de servicio con imagen + features + CTA. |
| ServicioCatalogCard | `src/components/ServicioCatalogCard.astro` | (catálogo) | Tarjeta de catálogo de servicio. |
| CategoriaCard | `src/components/CategoriaCard.astro` | `id, etiqueta, titulo, descripcion, imagenHero, imagenHeroAlt, ...subcards` | Tarjeta de categoría (agrupa servicios). |
| BlogPostCard | `src/components/BlogPostCard.astro` | `href, title, description, category, heroImage?` | Tarjeta de artículo del blog. |
| TestimonialCard | `src/components/TestimonialCard.astro` | (testimonio + rating) | Tarjeta de testimonio con estrellas. |
| CredentialsCard | `src/components/CredentialsCard.astro` | `title, items[], icon?` | Tarjeta de credenciales/confianza (iconos shield/users/document/clock). |
| SectionHeader | `src/components/SectionHeader.astro` | (badge + título + subtítulo) | Encabezado de sección homologado. |
| FAQItem | `src/components/FAQItem.astro` | `question, answer, open?` | Ítem de FAQ acordeón. |
| icons/StarRating | `src/components/icons/StarRating.astro` | (rating) | Estrellas de calificación. |

## Content Collections / esquemas / taxonomías
4 colecciones definidas con Zod en `src/content.config.ts` (Astro 5 Content Layer, `glob` loader):
- **servicios** (21 .md en `src/content/servicios/`): schema rico — `title(≤120)`, `description(≤250)`, `keywords[1-20]`, `category` enum (`pillar|service|location`), `pillarType` (`guardias-intramuros|seguridad-residenciales|seguridad-condominios`), `serviceFeatures[]`, `pricing?`, `relatedServices[]`, `relatedBlogPosts[]`, `schemaType` (`Service|LocalBusiness|Product`), `faqs[]`, `ctaText/ctaLink` (defaults), `targetLocations[]`, `heroImage`. Genera páginas vía `src/pages/servicios/[...slug].astro` → `getStaticPaths()` filtrando `!draft`, `params.slug = servicio.id`.
- **blog** (35 .md en `src/content/blog/`): `title(≤70)`, `keywords[3-10]`, `cluster` (alineado a pillars + `general`), `articleType` (`guide|comparison|case-study|tips|news|checklist`), `author` (default ORIGINS), fechas, `featured`, `relatedPillar/relatedPosts/relatedServices`, `faqs`, `schemaType` (`Article|BlogPosting|HowTo`). Render vía `src/pages/blog/[...slug].astro`.
- **zonas** (11 .md): `zoneName`, `zoneSlug`, `municipality`, `state`(default CDMX), `coordinates?`, `zoneType`, `securityLevel?`, `availableServices[]`, `faqs` (con `pregunta/respuesta` — nota: inconsistencia de idioma vs `question/answer` del resto), `colonias[]`. Render vía `src/pages/zonas/[slug].astro` (`params.slug = zona.data.zoneSlug`).
- **testimonios** (1 .md `condominio-polanco`): `clientName`, `quote`, `rating`, `serviceCategory`, `propertyType?`, `metrics?`, etc.
- **Generación:** 100% **estático** (`output: 'static'`). Páginas de colección vía `getStaticPaths()`; páginas fijas (index, nosotros, contacto, emergencias×6, etc.) como `.astro` directos. No hay SSR ni rutas dinámicas en runtime.
- **Taxonomías clave:** clusters/pillars (`guardias-intramuros`, `seguridad-residenciales`, `seguridad-condominios`) que vinculan blog↔servicios↔testimonios para autoridad temática.

## SEO real
- **Metas:** centralizadas en `SEOHead.astro` — `<title>`, description, author, canonical (con `.replace(/\/$/,'')`), robots (index/noindex), googlebot, geo tags (MX-CMX, coords CDMX), Open Graph completo, Twitter `summary_large_image`, theme-color, manifest, format-detection, resource hints (preconnect wa.me / rybbit), preload del hero AVIF.
- **Schema JSON-LD (tipos + rutas):**
  - Home `src/pages/index.astro`: `@graph` con `LocalBusiness/SecurityService/ProfessionalService` (`#business`), `Organization`, `Brand`, `WebSite` (+`SearchAction`), `FAQPage`.
  - `src/pages/servicios/[...slug].astro`: `Service` + `BreadcrumbList` + `FAQPage` condicional.
  - `src/pages/zonas/[slug].astro` y `zonas/index.astro`, `nosotros.astro` (AboutPage/Person directivos — confirmado por commit `e4733a3`), `contacto.astro`, `bolsa-de-trabajo.astro`, `404.astro`, `blog/[...slug].astro`+`index`, y las 6 páginas `emergencias/*` (cada una con varios `@type`). `HeroPagina.astro` emite `BreadcrumbList`.
  - 5 artículos de blog embeben JSON-LD propio en el .md (p.ej. `verificar-empresa-seguridad-legal-ssc-repse-cdmx.md`).
- **URLs / trailing slash:** `trailingSlash: 'never'` + `build.format:'file'`; canonicals normalizados sin slash final. Coherente.
- **Internal linking:** muy fuerte. `[...slug].astro` arma sidebar con servicios relacionados (frontmatter `relatedServices`), zonas, categorías, credenciales y contacto; cross-linking servicios↔zonas↔blog. AUDIT-REPORT confirma "0/20 → 20/20 con links internos".
- **Sitemap:** `@astrojs/sitemap` genera `sitemap-index.xml`/`sitemap-0.xml` con prioridades custom (home 1.0, pillars 0.9, servicios 0.8, zonas 0.75, blog 0.7…) y filtro que excluye `/draft`, `/aviso-de-privacidad`, `/mapa-del-sitio` — `astro.config.mjs`.
- **robots.txt:** `public/robots.txt` — `Allow: /` + `Sitemap: …/sitemap-index.xml`. Correcto.
- **hreflang:** ⚠️ HUECO — no se emiten etiquetas `hreflang` (sitio monolingüe es-MX; `og:locale es_MX` e `inLanguage es-MX` presentes, pero sin `<link rel="alternate" hreflang>`).
- **Verificación Search Console:** `<meta name="google-site-verification" content="googleb985b706e3017c36">` en `SEOHead.astro` (línea 75).

## Sistema de diseño
- **Tokens — DÓNDE:** `src/styles/global.css` `:root` (líneas 6-51), redefinidos en `@media (min-width:768px)` (líneas 54-63). Documentación adicional en `vault/Design System/` (Obsidian local).
- **Paleta:** `--color-primary:#0a0a0a`, `--color-secondary:#1a1a1a`, `--color-accent:#f8f9fa`, `--color-text:#0a0a0a`, `--color-text-light:#666`, `--color-white:#fff`, `--color-border:#e0e0e0`, `--color-success:#28a745`, `--color-whatsapp:#25D366`. (Nota: muchos componentes usan además `#0a0f1e` y verde `#25D366` hardcodeados, no via token — ver 📐.)
- **Tipografía:** system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto…`); escala `--font-size-xs … --font-size-5xl`; headings `font-weight:700`, `letter-spacing:-0.02em`. Estilo Apple-like. NO usa webfonts.
- **Radios/sombras/spacing:** `--border-radius:12px/24px/980px`, `--shadow-sm/md/lg`, spacing `xs…xxl` (mobile-first, escalado en 768px).
- **UI base:** `.btn` + variantes (`.btn-primary`, `.btn-whatsapp`, `.btn-outline`), `.container` (fluido `max-width:100%`), `.section-title/subtitle`, `prose-section-header`/`prose-section-block`/`prose-two-col` (sistema "Servicio Premium" para el contenido markdown renderizado).
- **Hero:** `src/styles/sections/hero.css` + componente `HeroPagina.astro` (2 columnas). **Cards:** ServiceCard, CategoriaCard, BlogPostCard, TestimonialCard, CredentialsCard. **CTA:** NavCTA (4-card), PageCTA, secciones `cta.css`/`final-cta.css`/`cotizacion.css`. **WhatsApp:** `WhatsAppWidget.astro` (flotante con panel). **Breadcrumbs:** integrados en `HeroPagina.astro` (visual + JSON-LD).
- **Mobile:** `src/styles/mobile.css` (534 líneas) importado al final del cascade — overhaul responsive dedicado.

## Convenciones
- **Idioma:** español de México en copy/UI; nombres de archivo y slugs en kebab-case español (`seguridad-condominios.md`, `control-de-accesos`). `lang="es"` en `<html>` (Base.astro línea 23); `inLanguage es-MX` / `og:locale es_MX` en schema.
- **Naming componentes:** PascalCase `.astro`; mezcla español/inglés (HeroPagina, ServicioCatalogCard, CategoriaCard vs ServiceCard, BlogPostCard, SEOHead) — inconsistente.
- **Estructura de código:** datos de homepage extraídos a `src/data/*.ts` (separación contenido/presentación); mapas de datos enriquecidos (serviceCardData, serviceIcons) inline en los routers `[...slug].astro` y `[slug].astro`.
- **Prettier/ESLint:** ⚠️ HUECO — no se encontró `.prettierrc`, `.eslintrc` ni `eslint`/`prettier` en `package.json` (deps mínimas: solo astro + sitemap). Formato consistente pero sin tooling declarado.
- **Comentarios:** abundantes JSDoc en componentes y comentarios de "Día 1/Día 2" en config y `_headers`/`_redirects` (trazabilidad de cambios).

## Flujos / procesos
- **Cotización / contacto (formulario):** formularios POST a `https://formsubmit.co/josecruz@originsecurity.mx` (servicio de terceros que reenvía a email). Presente en 7 páginas: `index.astro`, `contacto.astro`, `bolsa-de-trabajo.astro`, `servicios/[...slug].astro`, `servicios/index.astro`, `zonas/[slug].astro`, `zonas/index.astro`. Campos: nombre/teléfono/email/empresa/zona(select CDMX+Edomex)/tipoServicio/mensaje/términos; honeypot `_honey`, `_captcha=false`, `_next` a `…/gracias.html`, `_subject` dinámico.
- **WhatsApp:** canal primario. Número `525530255580` en `WhatsAppWidget` global + CTAs por toda la página; mensajes precargados contextuales (p.ej. "Hola, me interesa cotizar {servicio} para mi condominio"). El widget simula un chat y al enviar abre `wa.me` con el texto.
- **Teléfono:** `tel:+525530255580` (y un segundo `+52-55-7204-4370` como "sales" en schema Organization).
- **Email:** `contacto@seguridad-privada.com.mx` (mailto en varias páginas) — distinto del email receptor de formularios (`josecruz@originsecurity.mx`).
- **Promesa de servicio (copy):** diagnóstico gratuito, respuesta <2h / propuesta <24h, activación en 72h, supervisión semanal — `vault/Project Context.md`, `seguridad-condominios.md`.
- ⚠️ Nota: `_next` apunta a `…/gracias.html` pero **no existe** `src/pages/gracias.astro` ni `public/gracias.html` (no aparece en el árbol) → posible 404 post-envío. Verificar.

## Integraciones
- **Cloudflare:** PARCIAL/ambiguo — `wrangler.toml` (`pages_build_output_dir="dist"`), `public/_headers` (HSTS, X-CTO, Referrer-Policy, Permissions-Policy, X-Frame-Options, X-XSS-Protection, cache por ruta), `public/_redirects` (42 líneas de 301: sitemaps, limpieza `.html` legacy, redirecciones de servicios). PERO el deploy activo es GitHub Pages → estos archivos no se aplican en GH Pages. Sin carpeta `.wrangler` ni Cloudflare adapter. Evidencia de intención de migrar a CF Pages, sin confirmación de que esté en producción ahí.
- **GitHub Actions:** SÍ — `.github/workflows/deploy.yml` (deploy a GitHub Pages en push a main/master). Repo `github.com/Origenlab/SEGURIDAD-PRIVADA` (`.git/config`).
- **Rybbit Analytics:** SÍ — script en `Base.astro` (`data-site-id 1746096009d5`).
- **FormSubmit.co:** SÍ — backend de formularios (terceros, sin servidor propio).
- **n8n:** ⚠️ HUECO — sin evidencia (grep `n8n` vacío).
- **fal.ai:** ⚠️ HUECO — sin evidencia (grep `fal.ai/fal-ai` vacío). Las imágenes AVIF existen pero no hay rastro de pipeline de generación en el repo.
- **Brevo/Sendinblue:** ⚠️ HUECO — sin evidencia (grep vacío).
- **scripts/ (automatización):** SÍ — 4 scripts bash de QA post-deploy: `health-check.sh` (200 OK en URLs críticas), `audit-zonas.sh` (detecta soft-404 en /zonas/*), `test-redirects.sh` (valida 301 de `_redirects`), `validate-schemas.sh` (valida JSON-LD). Son herramientas de auditoría manual, no CI.

## Clasificación

### ✅
- Arquitectura de contenido SEO sólida y tipada con Zod (4 colecciones, clusters/pillars coherentes) — `src/content.config.ts`.
- Schema.org rico y bien estructurado (`@graph` con LocalBusiness+Organization+Brand+WebSite+FAQPage; Service+Breadcrumb+FAQ por servicio) — `src/pages/index.astro`, `src/pages/servicios/[...slug].astro`.
- Seguridad de cabeceras y caché bien pensadas (HSTS, nosniff, CSP-lite, immutable assets, SWR) — `public/_headers` (condicionado a deploy CF, ver ❌).
- Sin secretos expuestos: scan de `gho_/ghp_/sk-/api_key/SECRET/Bearer/AKIA` limpio; `.git/config` usa remoto HTTPS sin token embebido; `.env*` y `vault/` gitignored — `.gitignore`.
- Tooling de QA propio (health-check, redirects, schemas, zonas) — `scripts/*.sh`.
- Mobile-first real con CSS dedicado (`src/styles/mobile.css`, 534 líneas) y tokens responsive.

### ❌
- **Conflicto de deploy:** workflow despliega a **GitHub Pages**, pero `_headers`/`_redirects`/`wrangler.toml` son de **Cloudflare/Netlify** y GH Pages los ignora → las 42 redirecciones 301 y todas las cabeceras de seguridad/caché NO se están aplicando si producción es GH Pages — `.github/workflows/deploy.yml` vs `public/_headers`+`public/_redirects`+`wrangler.toml`.
- **Posible 404 post-formulario:** los forms redirigen a `…/gracias.html` que no existe en `src/pages/` ni `public/` — 7 formularios afectados (`contacto.astro` línea 154 et al.).
- **Email receptor inconsistente/expuesto:** formularios envían a `josecruz@originsecurity.mx` (dominio distinto `originsecurity.mx`) mientras el contacto público es `contacto@seguridad-privada.com.mx` — riesgo de confusión/entregabilidad — `src/pages/contacto.astro` (línea 154).
- **Inconsistencia de schema en zonas:** colección `zonas` usa `faqs` con claves `pregunta/respuesta` mientras el resto del sitio usa `question/answer` — fragmenta la lógica de FAQPage — `src/content.config.ts` (líneas 277-280).
- **`site.webmanifest` incompleto:** `short_name` y `name` vacíos, `theme_color` (#fafafa) distinto del `theme-color` del head (#0a0a0a) — `public/site.webmanifest`.
- **Prop muerta** `useLegacyCSS` declarada en `Base.astro` pero nunca consumida.

### 🤖
- Generación/optimización de imágenes AVIF a escala (cientos de archivos en `public/img/<servicio>/*.avif`, con nombres SEO-keyword) es claramente un proceso repetible candidato a automatizar con un pipeline IA (fal.ai/flux) + script — hoy sin rastro de automatización (`public/img/`, `IMAGEN-STRATEGY.md`).
- Generación de páginas de zona y artículos de blog desde plantilla: el `serviceCardData`/`serviceIcons` y el patrón de frontmatter están altamente estructurados → un generador (LLM + plantilla Zod) podría producir nuevas zonas/clusters consistentes — `src/pages/zonas/[slug].astro`, `src/content/blog/`.
- Captura de leads vía `formsubmit.co` podría migrar a un webhook (n8n/Brevo) para CRM + autorespuesta + scoring, hoy es email plano — `src/pages/contacto.astro`.
- Los 4 scripts de QA podrían integrarse como job de GitHub Actions post-deploy (smoke tests automáticos) en vez de ejecución manual — `scripts/*.sh`.

### 📐
- **Tokens de color no respetados:** `#0a0f1e` y `#25D366` aparecen hardcodeados en decenas de componentes/páginas en vez de via `var(--color-*)`; además `--color-primary` (#0a0a0a) ≠ azul oscuro real usado (#0a0f1e) → la fuente de verdad de color está fragmentada — `global.css` vs componentes.
- **CSS muy disperso:** estilos repartidos entre `global.css`, `mobile.css`, `sections/*` (12), `pages/*` (11), `patterns/*`, `<style>` scoped y `<style>` enormes inline en routers (`[...slug].astro` >900 líneas con CSS) → difícil de mantener/auditar.
- **Mezcla de idiomas en naming** de componentes (HeroPagina/CategoriaCard vs ServiceCard/BlogPostCard) y de claves de schema (pregunta/respuesta vs question/answer).
- **Lógica de datos duplicada** entre `servicios/[...slug].astro` y `zonas/[slug].astro` (mapas `serviceCardData` casi idénticos) — candidato a extraer a `src/data/`.
- **Sin tooling de formato/lint** declarado → la consistencia depende de disciplina manual (sin `eslint`/`prettier` en `package.json`).
- **Iconos duplicados:** sprite SVG en `Base.astro` + iconos inline repetidos en cada componente/página (mismos paths de shield/phone/whatsapp) en vez de reutilizar el sprite.

## ⚠️ HUECOS
- **Estrategia de deploy real no resuelta:** no se puede determinar con certeza si producción es GitHub Pages (workflow activo) o Cloudflare Pages (wrangler/_headers/_redirects). Si es GH Pages, redirects y headers de seguridad están inactivos. Falta documento de decisión de hosting.
- **`hreflang` ausente:** correcto si es monolingüe, pero no documentado como decisión.
- **Página `gracias.html` faltante:** referenciada por `_next` de FormSubmit; no existe en el repo → confirmar si se genera/sube aparte o es bug.
- **Prettier/ESLint:** no hay configuración de formato/lint en el repo.
- **fal.ai / n8n / Brevo:** mencionados en el checklist de auditoría pero SIN evidencia alguna en el código; las imágenes AVIF existen sin pipeline de generación visible (proceso probablemente externo/manual no versionado).
- **Estudios SEO previos (no leídos en detalle, evidencia de research):** raíz contiene `ESTUDIO-MAESTRO-HOMOLOGACION-2026.md`, `ESTUDIO-PREGUNTAS-GOOGLE-MAPS-2026.md`, `ESTUDIO-PROFESIONAL-2026.md`, `ESTUDIO-SEO-ORIGINS-FASE2.md`, `IMAGEN-STRATEGY.md`, `auditoria-seo-seprico-2026.docx`, `dia-1-resumen-y-pendientes.docx`, `dia-2-resumen-y-pendientes.docx`, `pasos-mejorar-origins-runbook-2026.docx`, `restructura-origins-seguridad-privada-2026.docx`, `tracking-restructure-origins-2026.xlsx`, carpeta `day-1-baseline/`, `vault/` (Obsidian: Design System, Pages, Decisions) y `AUDIT-REPORT.md` (auditoría previa 2026-04-01). Indican trabajo de research/SEO/diseño sustancial previo; su contenido detallado no fue auditado por instrucción.
- **Testimonios:** solo 1 entrada (`condominio-polanco`) pese a schema robusto y claim de "+50 desarrollos / 98% renovación" → falta contenido de prueba social.
