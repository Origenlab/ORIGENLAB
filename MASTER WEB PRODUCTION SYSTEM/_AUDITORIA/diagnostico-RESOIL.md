# Diagnóstico — RESOIL
> Propósito: Sitio Astro estático de renta de sonido e iluminación para eventos en CDMX, migrado desde un sitio HTML legacy, con captación de leads vía WhatsApp y deploy en GitHub Pages.

## Identidad
- **Negocio:** RESOIL — Renta de Sonido e Iluminación profesional para eventos. Evidencia: `package.json:5` (`"description": "Renta de Sonido e Iluminación - CDMX"`), `src/layouts/Layout.astro:30` (`siteName = 'RESOIL - Renta de Sonido e Iluminación'`).
- **Dominio:** `rentadesonidoeiluminacion.com.mx`. Evidencia: `CNAME:1`, `astro.config.mjs:5` (`site: 'https://rentadesonidoeiluminacion.com.mx'`).
- **Ubicación / contacto:** Montecito 38, Col. Nápoles, Benito Juárez, 03810, CDMX; tel `+52 55 7896 0091`; `contacto@rentadesonidoeiluminacion.com.mx`. Evidencia: `src/components/Footer.astro:71-77`, `src/components/TopBar.astro:9-11`, `src/pages/contacto.astro:125`.
- **Tipo:** Sitio corporativo/servicios estático multipágina (Astro static output, sin SSR).
- **ARQUETIPO: B = renta-eventos.** Justificación con evidencia:
  - Catálogo de equipo de renta organizado por categoría de evento (no técnico): "Bocinas para Bodas / XV Años / Fiestas / Conferencias / Graduaciones / Bautizos" (`src/pages/renta-de-sonido.astro:107-178`), y equipos especiales (bolas disco, máquina de humo/confeti/burbujas, pantalla inflable, carpas, mesas picnic) en `src/pages/index.astro:385-491`.
  - CTA dominante de **cotización/reserva por evento** vía WhatsApp, no e-commerce ni carrito: `src/pages/index.astro:636` ("Solicita tu Cotización"), formulario con campos "Tipo de Evento / Fecha del Evento / Número de Invitados" (`src/pages/index.astro:657-680`) y botón "Enviar por WhatsApp" (`src/pages/index.astro:711`).
  - Schema `Service` + `OfferCatalog` de `Offer`/`Service` por tipo de evento (`src/pages/renta-de-sonido.astro:38-49`, `src/pages/renta-de-iluminacion.astro:39-48`), NO `Product`/`Offer` con precio.
  - Taxonomía mental de eventos en el `<select>` de tipoEvento: boda, XV años, fiesta, conferencia, graduación, bautizo, corporativo (`src/pages/index.astro:664-674`).
  - ⚠️ HUECO: no hay "paquetes" combinados con precio explícitos como página/colección; solo mención textual de "paquetes combinados" en copy (`src/pages/index.astro:501`). No hay arquetipo de e-commerce.
- **Estado:** Funcional pero PARCIALMENTE MIGRADO. Solo 7 páginas Astro reales existen (`src/pages/`), mientras Header/Footer/sitemap apuntan a ~32 rutas adicionales (`/blog`, `/equipos`, `/iluminacion/*`, `/sonido/*`) que NO tienen archivo fuente. Quedan vestigios del sitio HTML legacy (`_html_backup/`, `img/` en raíz, `webpack.common.js`, `sitemap.xml` manual). Ver `## ⚠️ HUECOS`.

## Stack
- **Framework:** Astro `^6.1.9`, output default = **static** (sin `output:` declarado). Evidencia: `package.json:13`, `astro.config.mjs:7-14`.
- **Dependencias:** únicamente `@astrojs/sitemap ^3.7.2` + `astro`. SIN Tailwind, SIN MDX, SIN React/Vue/Svelte. Evidencia: `package.json:11-14`. Confirmado: CSS vanilla (ver `## Sistema de diseño`).
- **Config Astro:** `compressHTML: true`, `build.format: 'file'` (genera `pagina.html` en vez de `pagina/index.html`), `build.assets: '_astro'`, `integrations: [sitemap()]` sin `serialize` → sin prioridades/changefreq en el sitemap generado. Evidencia: `astro.config.mjs:6-13`.
- **TypeScript:** `extends "astro/tsconfigs/strict"`, `include ["**/*"]`, `exclude ["dist"]`. Evidencia: `tsconfig.json:1-5`.
- **Build artefacto:** `dist/` con páginas `.html` planas (no carpetas). Evidencia: `dist/` listado (`index.html`, `contacto.html`, `servicios.html`, etc.).
- **Vestigio de stack anterior:** `webpack.common.js` (entry `./js/app.js`, output `dist/`) — herramienta de build del sitio HTML legacy, NO usada por Astro. Evidencia: `webpack.common.js:1-12`.
- **Deploy:** GitHub Pages vía GitHub Actions (Node 22, `npm ci && npm run build`, sube `./dist`). NO Cloudflare Pages, NO wrangler. Evidencia: `.github/workflows/deploy.yml:1-37`.

## Estructura de carpetas
```
RESOIL/
├── src/
│   ├── components/   (4: Breadcrumb, Footer, Header, TopBar)
│   ├── layouts/      (1: Layout.astro)
│   ├── pages/        (7: index, servicios, nosotros, contacto, privacidad,
│   │                      renta-de-sonido, renta-de-iluminacion)
│   └── env.d.ts
├── public/           (CNAME, robots.txt, sitemap.xml, site.webmanifest, favicons,
│                       google verification, css/style.css, js/app.js, img/ AVIF)
├── .github/workflows/deploy.yml   (GitHub Pages)
├── dist/             (5.8M, build estático — versionado/presente)
├── _html_backup/     (8.3M, 349 archivos — SITIO HTML LEGACY COMPLETO migrado)
├── img/              (5.4M, 286 archivos — VESTIGIO raíz, duplica public/img)
├── .audit/           (108K — copias de los 2 DOCUMENTO-*.md)
├── graphify-out/     (80K — GRAPH_REPORT.md, graph.html/json, cache)
├── node_modules/     (117M)
├── astro.config.mjs, tsconfig.json, package.json, webpack.common.js (vestigio)
├── CNAME, robots.txt, sitemap.xml, site.webmanifest, favicons (VESTIGIOS en raíz)
├── DOCUMENTO-ARTICULOS.md (42KB), DOCUMENTO-PAGINAS.md (16KB), LICENSE.txt
```
- **Duplicidad crítica raíz vs public:** `CNAME`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicons e `img/` existen en LA RAÍZ y en `public/`. Solo los de `public/` se publican (Astro copia `public/*` a `dist/`). Los de raíz son vestigios del sitio HTML legacy. Verificado: `diff robots.txt public/robots.txt` = idénticos; `diff site.webmanifest public/site.webmanifest` = idénticos.

## Layouts — jerarquía
| Layout | Ruta | Props | Incluye | Notas |
|---|---|---|---|---|
| Layout.astro | `src/layouts/Layout.astro` | `title, description, canonical, ogTitle?, ogDescription?, ogImage?, ogUrl?, schemaMarkup?, activePage?` (`:6-16`) | `<TopBar>` (`:81`), `<Header activePage>` (`:82`), `<slot/>` (`:83`), `<Footer>` (`:84`), botón flotante WhatsApp inline (`:87-101`) | Único layout. Carga CSS global `/css/style.css` (`:74`), inyecta `schemaMarkup` con `<Fragment set:html>` (`:76`), carga `/js/app.js` (`:103`) y script de analítica Rybbit (`:78`). |

- Las 7 páginas usan `Layout.astro` directamente (un solo nivel, sin layouts anidados). Evidencia: `import Layout from '../layouts/Layout.astro'` en cada `src/pages/*.astro:2`.

## Componentes — inventario
| Componente | Ruta | Props | Función | Observación |
|---|---|---|---|---|
| TopBar | `src/components/TopBar.astro` | ninguna | Barra superior fija: marca, teléfono, horario, zona, redes sociales (FB/IG/TikTok/WhatsApp) | SVG inline; redes apuntan a URLs genéricas `facebook.com/`, `instagram.com/`, `tiktok.com/` sin handle (`:25,28,31`). ⚠️ HUECO. |
| Header | `src/components/Header.astro` | `activePage?` (`:3`) | Nav principal con logo, dropdown Servicios → submenús Iluminación/Sonido/Equipos | Menú enlaza a ~22 rutas, la mayoría inexistentes como página (`/blog`, `/equipos`, `/iluminacion/*`, `/sonido/*`). Ver HUECOS. |
| Footer | `src/components/Footer.astro` | ninguna | 6 columnas: marca, enlaces rápidos, iluminación, sonido, equipos, contacto + barra inferior con redes | Mismos enlaces rotos que Header. Dirección/contacto reales (`:71-77`). |
| Breadcrumb | `src/components/Breadcrumb.astro` | `items: Array<{label, href?}>` (`:2-4`) | Migas de pan reutilizables | **NO SE IMPORTA en ninguna página.** Las páginas usan breadcrumb inline `<ol class="breadcrumb">` (p.ej. `src/pages/renta-de-sonido.astro:65-71`). Componente huérfano. |

- **Patrones UI repetidos sin componetizar (copy-paste entre páginas):** hero de 2 columnas (`.hero-section`/`.hero-grid`), cards de servicio/sonido/equipo (`.lighting-card`/`.sound-card`/`.equipment-card`), CTA section (`.cta-section`/`.cta-buttons`), formulario de cotización completo (duplicado verbatim en `index.astro:640-715` y `contacto.astro:151-227`), breadcrumb inline. Botón flotante WhatsApp vive en el layout (`Layout.astro:87-101`).

## Content Collections / esquemas / taxonomías
- **NO hay Content Collections.** No existe `src/content/`, ni `src/content.config.ts`, ni `src/content/config.ts`. Evidencia: `find src -type f` no lista ningún archivo de contenido ni config de colecciones.
- **NO hay rutas dinámicas.** No existen archivos `[slug].astro` / `[...slug].astro`. Todas las páginas son estáticas individuales. Evidencia: `src/pages/` solo contiene 7 `.astro` con nombre fijo.
- **Taxonomía implícita (no codificada como datos):** categorías de servicio Iluminación / Sonido / Equipos y subcategorías por tipo de evento, definidas a mano en el menú (`Header.astro:30-72`) y como tarjetas hardcodeadas en páginas. No hay fuente de datos central (`src/data`, `src/config`, `src/lib` no existen). ⚠️ HUECO.

## SEO real
- **Metas base (en `Layout.astro`):** `<title>`, `description`, viewport, `lang="es"` (`:35,47-48`). Google Site Verification (`:39`). Theme-color `#1a1a1a` (`:72`).
- **Open Graph completo:** `og:type=website`, `og:title`, `og:description`, `og:url`, `og:image` (default `…/img/resoil-og.avif`), `og:image:width/height` 1200×630, `og:locale=es_MX`, `og:site_name`. Evidencia: `Layout.astro:50-58,31`. ⚠️ El OG image por defecto `…/img/resoil-og.avif` no existe en `public/img/` (no aparece en el inventario de imágenes). HUECO.
- **Twitter Card:** `summary_large_image` + title/description/image. Evidencia: `Layout.astro:60-63`.
- **Canonical:** por página vía prop `canonical` (`Layout.astro:65`); cada página la pasa explícita (p.ej. `index.astro:165`, `contacto.astro:51`).
- **JSON-LD (inyectado por `schemaMarkup` prop):**
  - `index.astro`: `Organization` (`:8`), `LocalBusiness` con `geo`, `priceRange "$$"`, `openingHoursSpecification`, `aggregateRating 4.9/187` (`:37,57-68`), `WebPage`→`Service`→`OfferCatalog` (`:74-97`), `FAQPage` con 4 preguntas (`:123-157`), `Review` ×3 (`:98-117`).
  - `renta-de-sonido.astro`: `BreadcrumbList` (`:8`) + `Service` con `OfferCatalog` de 6 `Offer`/`Service` (`:19,38-49`).
  - `renta-de-iluminacion.astro`: `BreadcrumbList` + `Service`/`OfferCatalog` de 6 ofertas (`:8,19,39-47`).
  - `contacto.astro`: `BreadcrumbList` + `LocalBusiness` (`:8,18`).
  - `nosotros.astro`: `BreadcrumbList` + `LocalBusiness` con `Place`/`QuantitativeValue` (`:8,18,39,43`).
  - `servicios.astro`, `privacidad.astro`: `BreadcrumbList` (`:8`).
  - Tipos presentes: Organization, LocalBusiness, WebPage, Service, OfferCatalog, Offer, FAQPage, Review, AggregateRating, BreadcrumbList, PostalAddress, GeoCoordinates, OpeningHoursSpecification, Place, QuantitativeValue, City.
- **Sitemap — DUPLICIDAD CRÍTICA (raíz vs generado):**
  - `astro.config.mjs:12` activa `@astrojs/sitemap`, que en `dist/` genera `sitemap-index.xml` (203 B) + `sitemap-0.xml` (844 B) con SOLO las 7 páginas reales. Evidencia: `dist/sitemap-index.xml`, `dist/sitemap-0.xml`.
  - PERO existe un `sitemap.xml` MANUAL (39 URLs, todas con extensión `.html`, incl. ~32 rutas inexistentes como `/blog/*`, `/equipos/*`, `/iluminacion/*`, `/sonido/*`) presente en RAÍZ y en `public/sitemap.xml` (idénticos, 8167 B). Astro copia `public/sitemap.xml` → `dist/sitemap.xml`, que COEXISTE con el generado. Evidencia: `sitemap.xml:1-39` (locs listados), `dist/sitemap.xml` (8167 B).
  - **`robots.txt` apunta a `/sitemap.xml`** (el manual con páginas falsas), NO a `/sitemap-index.xml` (el generado). Evidencia: `robots.txt` ("Sitemap: https://rentadesonidoeiluminacion.com.mx/sitemap.xml") = `public/robots.txt`. Resultado: Google recibe un sitemap con ~32 URLs 404. ❌
- **robots.txt (raíz vs public):** ambos idénticos (verificado por `diff`). El de `public/` es el que se publica. `Allow: /`, `Disallow: /css/ /js/ /*.json`, `Allow /img/` para Googlebot-Image. Evidencia: `public/robots.txt`.
- **`_headers` / `_redirects` / `wrangler.toml`:** NO existen (ni raíz ni public). Evidencia: `ls` negativo. (Coherente con deploy GitHub Pages, que no soporta `_headers`/`_redirects` estilo Cloudflare.)
- **Internal linking:** Header (`Header.astro:28-83`) y Footer (`Footer.astro:15-65`) enlazan profusamente a categorías y subcategorías — pero la mayoría de destinos son 404 (páginas no migradas). El linking REAL funcional entre páginas existentes: index↔servicios↔renta-de-sonido↔renta-de-iluminacion↔contacto↔nosotros↔privacidad. Las cards de index enlazan a `/iluminacion/*`, `/sonido/*`, `/equipos/*` rotos (`index.astro:204,216,394,...`). ❌

## Sistema de diseño
- **Sin Tailwind. CSS vanilla monolítico:** `public/css/style.css` (6949 líneas), basado en HTML5 Boilerplate v9.0.1 (`:1-3`). Es el único stylesheet, cargado globalmente en `Layout.astro:74`. No hay `src/styles/`.
- **Tokens / design system (CSS custom properties)** en `:root` — `public/css/style.css:311-332`:
  - Paleta: `--primary-blue #1a1a2e`, `--secondary-blue #16213e`, `--accent-blue/--accent-color #0f3460`, `--primary-color #1a1a2e`, `--text-color #2d3748`, `--text-light #718096`, `--text-muted #a0aec0`, `--white #ffffff`, `--light-gray #f7fafc`, `--border-color #e2e8f0`.
  - Sombras: `--shadow`, `--shadow-light`, `--shadow-hover` (`:324-326`).
  - Radios: `--border-radius 16px`, `--border-radius-small 8px` (`:327-328`).
  - Layout: `--max-width 1400px` (`:329`).
  - Gradientes: `--gradient-primary` (135deg azul oscuro), `--gradient-light` (`:330-331`).
- **Tipografía:** sin webfont; `font-family: 'Arial', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (`:342`), base `font-size 1.05em` (`:16`), `line-height 1.6` (`:343`).
- **Patrones UI (clases CSS):**
  - **Hero:** `.hero-section` / `.hero-grid` (grid 1fr 1.2fr) / `.hero-title-column` / `.hero-content-column` (`:1215-1330`).
  - **Cards:** `.lighting-card` (`:1372`), `.sound-card` (`:1572`), `.equipment-card` (`:1679`), `.service-card` (`:1796`), `.testimonial-card` (`:2548`), `.provider-card` y `.contact-card` (`:2171`). Todas comparten patrón: `border-radius 16px`, `box-shadow 0 4px 20px`, grid `auto-fit minmax(380px,1fr)`.
  - **CTA:** `.cta-button` (pill 50px, `.primary`/`.secondary`) (`:1516-1555`); `.cta-section`/`.cta-buttons` (estilos más allá de la línea 2587, no leídos completos).
  - **WhatsApp:** botón flotante `.whatsapp-float` (estilos >2587) + `.whatsapp-button` verde `#25D366` (`:2204-2219`); botón de envío `.submit-btn` gradiente WhatsApp (`:2425`).
  - **Breadcrumbs:** `.breadcrumb-container` / `.breadcrumb` (estilos >2587).
  - **Formularios:** `.contact-form` / `.form-row` / `.form-group` / `.checkbox-group` (`:2322-2448`).
- **Responsive:** mobile-first con breakpoints 992px/768px/480px; múltiples bloques `@media` DUPLICADOS y conflictivos para la navegación (p.ej. tres bloques `@media (max-width:768px)` distintos: `:734`, `:887`, `:1946`, con reglas de `.nav-list`/`.nav-menu` que se pisan). Indica acumulación legacy. ⚠️
- **Mención n8n:** comentario en CSS "Blog Cards - n8n Workflow Compatible Styles" (`public/css/style.css:5301,5304`) — estilos para cards de blog que se generarían vía n8n (blog no migrado). Evidencia documental, no integración activa en el código Astro.

## Convenciones
- **Idioma:** español (es-MX); `lang="es"` (`Layout.astro:35`); entidades HTML para acentos en componentes (`&oacute;`, `&aacute;`) — `Header.astro`, `Footer.astro`, `TopBar.astro`.
- **Rutas:** `build.format:'file'` → URLs sin trailing slash, con/sin `.html`. Las páginas referencian rutas limpias sin `.html` (`/servicios`, `/contacto`), pero el sitemap manual usa `.html`. Inconsistencia. ⚠️
- **SEO por página:** patrón uniforme — cada página define una constante `schemaMarkup` en el frontmatter y pasa `title/description/canonical/schemaMarkup/activePage` al `Layout` (`src/pages/*.astro:2-60` aprox).
- **Naming:** páginas kebab-case (`renta-de-sonido.astro`); imágenes en `public/img/img-<categoria>/<slug-keyword>.avif` con nombres SEO-keyword (p.ej. `public/img/img-bocinas-bodas/...`). Formato de imagen: `.avif` casi exclusivo.
- **Breadcrumb:** convención INCONSISTENTE — existe `Breadcrumb.astro` (no usado) y simultáneamente markup inline `<ol class="breadcrumb">` repetido en cada página. ⚠️
- **Componetización:** baja. Hero, cards, CTA y formulario se copian entre páginas en vez de usar componentes/`.astro` reutilizables.

## Flujos / procesos
- **Captación de leads (único flujo de negocio):** formulario de cotización → mensaje pre-formateado → abre WhatsApp (`window.open(wa.me/...)`). 100% client-side, SIN backend, SIN endpoint, SIN base de datos. Evidencia: `public/js/app.js` (handler `contactForm`, `:265-309`).
  - **BUG funcional:** el handler escucha `document.getElementById('contactForm')` (`app.js:265`), pero el `<form>` en las páginas Astro tiene `id="contact-form"` (con guion) — `index.astro:640`, `contacto.astro:151`. Los IDs no coinciden → **el formulario NO dispara el envío a WhatsApp**. Además `app.js` lee `formData.getAll('servicios[]')` (`:282`) mientras el markup usa `name="servicios"` sin `[]` (`index.astro:685`). ❌
  - El `app.js` también define handlers para formularios de páginas legacy no migradas: `quote-form` (guirnaldas, `:316`), `neon-quote-form` (`:386`), `citycolor-quote-form` (`:458`), `luces-neon-quote-form` (`:512`). Vestigios del sitio HTML — esos forms no existen en las páginas Astro actuales.
- **Navegación móvil:** menú hamburguesa + dropdowns/submenús con toggle por click <768px; IntersectionObserver para nav activa, scroll suave para anclas, FAQ accordion, efecto header on-scroll. Evidencia: `public/js/app.js:20-66, 122-260, 437-490`.
- **Deploy (CI/CD):** push a `main` → GitHub Actions build (`npm ci && npm run build`) → publica `dist/` en GitHub Pages. Evidencia: `.github/workflows/deploy.yml:1-37`. El `CNAME` (`public/CNAME` → `dist/CNAME`) fija el dominio custom en Pages.

## Integraciones
- **Rybbit Analytics** (analítica self-hosted): `<script src="https://app.rybbit.io/api/script.js" data-site-id="deb6a0fbe51c" defer>`. Evidencia: `Layout.astro:78`, con preconnect/dns-prefetch (`:41,43`).
- **Cloudflare (parcial / ambiguo):** solo `dns-prefetch` a `static.cloudflareinsights.com` (`Layout.astro:45`) — sugiere que el dominio pasa por Cloudflare proxy (Web Analytics / CDN), pero NO hay beacon de Cloudflare Insights inyectado en el código ni wrangler. El deploy es GitHub Pages, así que Cloudflare actuaría solo como DNS/proxy frente a Pages. Evidencia indirecta. ⚠️ HUECO de confirmación.
- **Google Search Console:** verificación por meta (`Layout.astro:39`) y por archivo HTML (`public/google1e43991d551f0621.html`).
- **GitHub Actions → GitHub Pages:** confirmado (ver Flujos). `.github/workflows/deploy.yml`.
- **n8n:** SOLO referencia en comentario de CSS para "blog cards" (`public/css/style.css:5301,5304`). No hay workflow, webhook ni endpoint n8n en el código. Documental, no activa.
- **NO detectados:** fal.ai, Brevo, Formspree/Getform, SendGrid, Mailchimp, Cloudflare D1/R2/Workers, base de datos. (grep negativo sobre `src`, `public`, config.)

## Documentación previa
Dos `.md` grandes en raíz (también copiados en `.audit/`):
- **`DOCUMENTO-PAGINAS.md`** (381 líneas, ~16KB): "Documento de Actualización de Navegación - RESOIL" (fecha 2025-01-17). Registra la migración de navegación del **sitio HTML legacy**: actualización de páginas principales, creación de páginas `/iluminacion/` (6), `/sonido/` (6) y `/equipos/`, estructura de menú/footer, patrones de rutas relativas. REUTILIZABLE como **mapa del sitio objetivo** (qué páginas y subcategorías deberían existir) para completar la migración a Astro. Evidencia: `DOCUMENTO-PAGINAS.md:1,56,90,218,315`.
- **`DOCUMENTO-ARTICULOS.md`** (1241 líneas, ~42KB): "MANUAL PROFESIONAL DE CREACIÓN DE ARTÍCULOS - BLOG RESOIL". Guía editorial + plantilla HTML/SEO para artículos de blog: filosofía editorial, arquitectura HTML, meta tags/Schema.org Article+FAQPage (regla de atemporalidad/sin fechas), hero de 2 columnas, imagen destacada, estructura de contenido H2/H3, FAQ accordion. REUTILIZABLE como **spec para una futura Content Collection de blog** (el blog aún no existe en Astro). Evidencia: `DOCUMENTO-ARTICULOS.md:1,29,72,148,224,259,302,556`.
- **`graphify-out/GRAPH_REPORT.md`** + `graph.json/html`: salida de una herramienta de grafo de dependencias/enlaces (no auditada en detalle). Posible insumo para análisis de internal linking.

## Clasificación

### ✅
- ✅ JSON-LD rico y por-página bien tipado (Organization, LocalBusiness, Service+OfferCatalog, FAQPage, Review, BreadcrumbList) coherente con arquetipo renta-eventos. `src/pages/index.astro:4-159`, `renta-de-sonido.astro:4-51`.
- ✅ Open Graph + Twitter Card completos y centralizados en el layout, con fallbacks por prop. `src/layouts/Layout.astro:50-63`.
- ✅ Sistema de tokens CSS coherente (paleta, sombras, radios, gradientes, max-width) en `:root`. `public/css/style.css:311-332`.
- ✅ Pipeline de deploy reproducible (GitHub Actions → Pages, Node 22, `npm ci`). `.github/workflows/deploy.yml:1-37`.
- ✅ Imágenes optimizadas en `.avif` con `width/height`, `loading="lazy"` y `fetchpriority`/`decoding` en el logo (previene CLS). `Header.astro:14-22`, `index.astro:205`.
- ✅ Seguridad limpia: sin tokens/secretos/API keys en src/public/config. (grep negativo.)

### ❌
- ❌ **Sitemap referenciado en robots.txt es el manual con ~32 URLs 404** (rutas `.html` de páginas no migradas), coexistiendo con el `sitemap-index.xml` generado por Astro que sí es correcto. `robots.txt` (Sitemap line), `public/sitemap.xml` (8167B, 39 locs), `dist/sitemap-index.xml`. Google indexaría páginas inexistentes.
- ❌ **Enlaces internos rotos masivos:** Header/Footer/cards apuntan a `/blog`, `/equipos`, `/iluminacion/*`, `/sonido/*` (≈32 rutas) sin archivo fuente en `src/pages/`. `Header.astro:38-72`, `Footer.astro:28-64`, `index.astro:204-491`.
- ❌ **Formulario de cotización no funciona:** mismatch de IDs (`contactForm` en JS vs `contact-form` en HTML) y de `name` (`servicios[]` vs `servicios`). El submit no abre WhatsApp. `public/js/app.js:265,282` vs `index.astro:640,685` y `contacto.astro:151`.
- ❌ Duplicidad de archivos públicos raíz↔public (CNAME, robots, sitemap, manifest, img) — fuente de confusión y de servir el sitemap equivocado. (Verificado por `diff` idénticos.)

### 🤖
- 🤖 `DOCUMENTO-ARTICULOS.md` (manual editorial + plantilla SEO/Schema de blog) es spec lista para auto-generar una Content Collection de artículos. `DOCUMENTO-ARTICULOS.md:1-1241`.
- 🤖 Comentario "n8n Workflow Compatible Styles" para blog cards sugiere intención de pipeline de contenido automatizado (n8n) ya contemplado en el CSS. `public/css/style.css:5301-5304`.

### 📐
- 📐 Patrón uniforme de página: frontmatter con const `schemaMarkup` + `<Layout title/description/canonical/schemaMarkup/activePage>`; reutilizable como plantilla canónica para nuevas páginas de servicio/equipo. `src/pages/renta-de-sonido.astro:4-60`.
- 📐 Patrón de card de catálogo (`.lighting-card`/`.sound-card`/`.equipment-card`): imagen `420×230` enlazada + h3 + p + `.service-button`, grid `auto-fit minmax(380px,1fr)`; candidato a componente único `<ServiceCard>`. `index.astro:202-272`, `public/css/style.css:1365-1443`.

## ⚠️ HUECOS
- ⚠️ HUECO: **~32 páginas declaradas en navegación/sitemap no existen como fuente** (`/blog`, `/blog/*`, `/equipos`, `/equipos/*`, `/iluminacion/*`, `/sonido/*`). Solo 7 de ~39 rutas están migradas a Astro. Existen en `_html_backup/` como HTML legacy pero no en `src/pages/`. Por qué importa: enlaces 404, sitemap inválido, catálogo incompleto. Evidencia: `find src/pages` (7 archivos) vs `Header.astro:38-72` + `sitemap.xml:1-39` + `_html_backup/` (carpetas `blog/`, `equipos/`, `iluminacion/`, `sonido/`).
- ⚠️ HUECO: **OG image por defecto inexistente** — `Layout.astro:31` apunta a `…/img/resoil-og.avif` pero ese archivo no está en `public/img/`. Las cards sociales no mostrarían imagen.
- ⚠️ HUECO: **Componente `Breadcrumb.astro` huérfano** (definido pero nunca importado); breadcrumbs se hacen inline. Decisión de diseño sin consolidar. Evidencia: grep "Breadcrumb" en `src/pages` solo encuentra markup inline y JSON-LD, nunca el import.
- ⚠️ HUECO: **Redes sociales sin handle** — FB/IG/TikTok apuntan a `https://www.facebook.com/` etc. sin perfil. `TopBar.astro:25,28,31`, `Footer.astro:91-93`, y `sameAs` del Organization igual genérico (`index.astro:27-31`).
- ⚠️ HUECO: **Sin fuente de datos central** (no `src/data`, `src/config`, `src/lib`, ni Content Collections). El catálogo está hardcodeado en markup, lo que bloquea escalar a las ~30 páginas faltantes de forma mantenible.
- ⚠️ HUECO: **Estado real de Cloudflare sin confirmar** — solo hay `dns-prefetch` a `cloudflareinsights.com` (`Layout.astro:45`); no hay beacon ni config. No se puede afirmar desde el repo si el dominio usa Cloudflare proxy/analytics. Deploy confirmado es GitHub Pages.
- ⚠️ HUECO (higiene): **vestigios pesados versionados** — `_html_backup/` (8.3M, 349 archivos, sitio HTML legacy), `img/` raíz (5.4M, 286 archivos, duplica `public/img`), `webpack.common.js`, y los archivos públicos duplicados en raíz. `dist/` (5.8M) también presente en el árbol. Por qué importa: peso del repo, ambigüedad de cuál es la fuente de verdad, riesgo de publicar el sitemap/robots equivocado.
- ⚠️ HUECO: **CSS con bloques `@media` duplicados/conflictivos** para la navegación (tres `@media (max-width:768px)` que redefinen `.nav-*`). `public/css/style.css:734, 887, 1946`. Mantenibilidad comprometida.
