# Diagnóstico — CDMXSITE

> Propósito: Directorio empresarial de la Ciudad de México (cdmx.site) construido como sitio HTML estático multipágina, con foco editorial en seguridad privada, protección contra incendios y eventos, organizado por alcaldías + categorías + blog.

## Identidad

- **Negocio / dominio:** "Directorio CDMX" / **cdmx.site** (evidencia: `CNAME` → `cdmx.site`; `index.html:7` título "Directorio CDMX - El Directorio Empresarial #1 de la Ciudad de Mexico"; `index.html:12` canonical `https://cdmx.site/`). Dominio legacy `directorio-cdmx.com` redirigido al canonical (`_redirects` líneas de redirect 301).
- **Tipo de sitio:** Directorio / portal de contenido editorial sobre negocios en CDMX. Conecta negocios con clientes en las 16 alcaldías (`README.md:13`). Cobertura editorial real concentrada en 3 verticales: seguridad privada, protección contra incendios y eventos (evidencia: subcarpetas de `categorias/`).
- **ARQUETIPO: D — Contenido / Directorio.** Justificación con evidencia:
  - Taxonomía por **alcaldía** → `alcaldias/cuauhtemoc/categorias/{eventos,seguridad-privada}/index.html` (3 HTML).
  - Taxonomía por **categoría** → `categorias/{eventos,seguridad-privada,proteccion-contra-incendios}/` con 26 perfiles de empresa + 3 índices de categoría (29 HTML).
  - **Blog** editorial → `blog/` con 29 posts + 1 índice (30 HTML; `find blog -name index.html` = 30).
  - **Sistema de reseñas / fichas** documentado en `DOCUMENTO-RESENAS.md` (21 KB, guía para crear perfiles y cards de empresas con datos, schema y reseñas).
  - Schema dominante de directorio: `LocalBusiness`/`Service`/`Store`/`SecurityService` + `AggregateRating`/`Review` + `BreadcrumbList` + `FAQPage` + `ItemList` (conteo global más abajo).
- **Estado:** Activo y en producción (badges "Deployed on Cloudflare Pages" en `README.md:5`; sitio en vivo `README.md:13`; `index.html` modificado 2026-06-01). **Calidad interna comprometida:** `audit_report.json` reporta 183 enlaces rotos y 1072 placeholders en 19 archivos (ver SEO real).

> **CONFIRMACIÓN — HTML estático, NO Astro.** Evidencia directa:
> - `find . -name '*.astro' -not -path '*/node_modules/*'` → **0 resultados**.
> - `ls astro.config.*` → **no existe** ningún `astro.config.*`.
> - `package.json` (568 B) NO declara `astro` ni dependencias de framework; solo herramientas de build webpack (ver Stack).
> - Cada página es HTML autónomo con `<!DOCTYPE html>` propio (ej. `blog/cctv-residencial-cdmx/index.html:1`).
> → **Auditoría LIGERA aplicada** (sitio HTML estático multipágina servido en Cloudflare Pages).

## Stack

- **HTML5 plano multipágina** — 64 archivos `.html` (excl. `node_modules`): 1 raíz `index.html` (140 KB) + `404.html` + 3 alcaldías + 29 categorías + 30 blog (`find . -name '*.html' -not -path '*/node_modules/*' | wc -l` = 64).
- **CSS3 vanilla** con design tokens — `css/style.css` (4187 líneas), `css/article.css` (1050), `css/mobile.css` (796). Más backups `style.css.backup` / `style.css.bak`.
- **JavaScript ES6 vanilla** — un único bundle de origen `js/app.js` (842 líneas): base de datos de negocios embebida, navegación, búsqueda con autocompletado, dropdowns, estrellas de rating (`js/app.js:34` `businessesDB`, `js/app.js:233` `alcaldiasData`, `js/app.js:255` `utils`, `:297` `navigation`, `:366` `search`).
- **Webpack 5** como build/bundler (NO framework). `package.json` scripts: `start` = `webpack serve --config webpack.config.dev.js`, `build` = `webpack --config webpack.config.prod.js`. devDependencies: `webpack`, `webpack-cli`, `webpack-dev-server`, `webpack-merge`, `html-webpack-plugin`, `copy-webpack-plugin`.
  - ⚠️ El build webpack solo procesa `index.html` como template (`webpack.config.prod.js` `HtmlWebpackPlugin template: './index.html'`) y copia carpetas estáticas; las páginas internas (alcaldías/blog/categorías) NO pasan por webpack → se sirven tal cual. El webpack está prácticamente sin uso real para el sitio multipágina.
- **Sin dependencias SEO en npm** — toda la SEO es markup manual en los HTML. Sin librerías de generación.
- **Deploy:** Cloudflare Pages (evidencia: `README.md:5` badge + `_redirects` encabezado "Cloudflare Pages — 301 redirects"; `CNAME` apex). CDNs externos: Google Fonts (Inter, Poppins) y Font Awesome 6.5.1 vía `cdnjs.cloudflare.com` (`index.html:41-47`).

## Estructura de carpetas

```
CDMXSITE/
├── index.html                 # Home del directorio (140 KB) — hero, búsqueda, categorías, cards
├── index.html.backup          # Backup viejo (90 KB) — IGNORADO en git (.gitignore *.backup) y robots
├── 404.html                   # Página de error (servida por Cloudflare Pages)
├── CNAME                       # cdmx.site (apex de Cloudflare Pages)
├── _redirects                 # 12 reglas 301/200 (legacy .html → URL limpia, www→apex, dominio viejo)
├── robots.txt                 # Reglas por bot + sitemap + Host
├── sitemap.xml                # 63 URLs (15 KB)
├── site.webmanifest           # PWA manifest mínimo
├── favicon.ico / icon.png / icon.svg
├── webpack.common.js / .config.dev.js / .config.prod.js   # build (uso marginal)
├── package.json / package-lock.json
├── alcaldias/
│   └── cuauhtemoc/
│       └── categorias/
│           ├── index.html                  # índice de categorías de la alcaldía
│           ├── eventos/index.html
│           └── seguridad-privada/index.html   # (1 sola alcaldía implementada de 16)
├── categorias/
│   ├── index.html                          # hub de 15 categorías (solo 3 con contenido)
│   ├── eventos/           (índice + 12 perfiles de empresa)
│   ├── seguridad-privada/ (índice + 5 perfiles)
│   └── proteccion-contra-incendios/ (índice + 7 perfiles)
├── blog/
│   ├── index.html                          # índice del blog
│   └── <29 posts>/index.html               # cada post en su carpeta (URL limpia)
├── css/        (style.css, article.css, mobile.css + 2 backups)
├── js/         (app.js)
├── img/        (eventos/, partners/, proteccion-contra-incendios/<8 marcas>/, seguridad-privada/)
├── docs/       (auditoria-imagenes-seguridad-privada-2026-05-27.docx)
├── vendor/     (solo .gitkeep — vacío)
├── node_modules/ (deps webpack)
├── .claude/ .git/ .gitattributes .gitignore .github(NO EXISTE)
├── DOCUMENTO-RESENAS.md        # SOP para crear perfiles/cards de empresa (21 KB)
├── SEO-GUIDE-Core-Web-Vitals.md
├── SEO-GUIDE-Google-Search-Console.md
├── SEO-GUIDE-Schema-Validation.md
├── README.md
├── audit_report.json          # reporte de auditoría de enlaces (44 KB) — IGNORADO en git
└── LICENSE.txt (MIT)
```

## Layouts — jerarquía

**No aplica framework (sitio HTML estático).** No hay layouts Astro ni sistema de plantillas en tiempo de build para las páginas internas. Observaciones:

- **Cada HTML es autónomo y completo** (su propio `<!DOCTYPE html>`, `<head>`, `<body>`; ej. `index.html:1` y `blog/cctv-residencial-cdmx/index.html:1`).
- ❌ **Duplicación masiva de chrome (header/footer/top-bar) entre archivos.** Patrones presentes en ~63 archivos cada uno:
  - `top-bar` → 63 archivos; `class="header"` → 63; `class="footer"` → 63; `skip-link` → 63; `breadcrumb` → 62 (`grep -rl ... --include=*.html`).
  - El `<footer class="footer" id="contacto">` se repite literalmente en raíz (`index.html:2449`) y en blog (`blog/cctv-residencial-cdmx/index.html:618`), confirmando copia/pega del bloque completo en cada página.
  - Sin includes server-side, sin parciales, sin componentes JS que inyecten el chrome (no hay `fetch` de parciales en `js/app.js`). Mantener un cambio de header/footer exige editar las 63 páginas.
- El `<head>` también se duplica con metas/canonical/OG/JSON-LD individualizados por página (correcto para SEO, pero copiado a mano — `blog/.../index.html:7-12` vs `index.html:7-12`).
- Hueco de tooling: ver `## ⚠️ HUECOS`.

## Componentes — inventario

**No aplica framework.** Los "componentes" son bloques de marcado HTML repetidos + lógica vanilla en `js/app.js`. Patrones detectados por grep:

| Patrón | Dónde (evidencia) | Nota |
|---|---|---|
| Top bar (tel/email/redes) | 63 HTML (`top-bar`); `index.html:95-110` | Copiado en cada página |
| Header / navbar + dropdown categorías | 63 HTML (`class="header"`); `index.html:113-130` | Menú con dropdown JS |
| Mobile menu (hamburguesa) | `index.html:121`; lógica `js/app.js:318-327` | Toggle aria-expanded |
| Footer (#contacto) | 63 HTML; `index.html:2449`, `blog/.../index.html:618` | Bloque idéntico duplicado |
| Skip-link accesibilidad | 63 HTML; `index.html:92` | `Saltar al contenido principal` |
| Breadcrumbs | 62 HTML; + schema `BreadcrumbList` (46 instancias) | Navegación jerárquica |
| Hero | 26 HTML (`class="hero`) | En home, blog y perfiles |
| Cards (negocio/categoría) | 63 HTML (`card`) | Núcleo del directorio |
| Botón / enlace WhatsApp | 61 HTML (`wa.me`/`whatsapp`); `index.html` → `wa.me/525570081816`, `525520780102`, `525512345678` | CTA principal de contacto |
| Buscador + autocompletado | `index.html` form; `js/app.js:366-417` `search` + `suggestions` | Solo cliente (no backend) |
| Estrellas de rating | `js/app.js:276-278` | Render half-star |
| Base de datos de negocios embebida | `js/app.js:34` `businessesDB`, `:233` `alcaldiasData` | Hardcoded en JS |

## Content Collections / esquemas / taxonomías

**No aplica framework (sin content collections).** El "contenido" son carpetas de HTML estáticos. Taxonomías reales:

- **Alcaldías:** estructura prevista para 16 (`README.md:24`), pero **solo 1 implementada: Cuauhtémoc** (`alcaldias/cuauhtemoc/`, 3 HTML: índice + eventos + seguridad-privada). Las otras 15 alcaldías se mencionan en texto/cards de `index.html` (Álvaro Obregón, Azcapotzalco, Benito Juárez, Coyoacán, Cuajimalpa, Iztacalco, Iztapalapa, Magdalena Contreras, Miguel Hidalgo, etc.) pero NO tienen página propia. ⚠️ HUECO de cobertura.
- **Categorías:** el hub `categorias/index.html` lista **15 categorías** (automotriz, belleza, comercio, construccion, educacion, eventos, financieros, inmobiliarias, legal, manufactura, proteccion-contra-incendios, restaurantes, salud, seguridad-privada, tecnologia). **Solo 3 tienen contenido real:**
  - `eventos/` → 12 perfiles (boldis, eventech, inflapy, mesas-de-dulces, paled, podiumex, redeil, renta-de-iluminacion, renta-de-inflables, rentadecarpa, resoil, sonido-para-eventos).
  - `proteccion-contra-incendios/` → 7 perfiles (bombero, firefighter, gamademexico, lga, manext, meseci, proyectored, seind).
  - `seguridad-privada/` → 5 perfiles (gupri-guardias-privados, origins-private-security, seguridad-eventos, seguridadprivadamx, seprico-condominios).
  - Las 12 categorías restantes son enlaces sin página → ⚠️ contribuyen a los 183 enlaces rotos del audit.
- **Blog:** 29 posts + índice. Tema: análisis y guías para negocios CDMX, fuertemente alineados a las 3 verticales (seguridad privada, protección contra incendios/EPP, eventos) más posts de marca-empresa (ej. `bombero-mx-distribuidor-equipo-nfpa`, `manext-extintores-cdmx-desde-1943`). Título índice: "Blog Directorio CDMX — Analisis y Guias para Negocios" (`blog/index.html`).
- **DOCUMENTO-RESENAS.md (21 KB):** SOP/manual interno para dar de alta empresas. Cubre: (1) información requerida del cliente (datos básicos obligatorios, datos del perfil, opcionales), (2) crear carpeta del perfil, (3) estructura HTML del perfil, (4) crear la card en la categoría, (5) imágenes y assets, (6) Schema.org y SEO, (7) checklist final. Es el "esquema" de facto del contenido del directorio. Altamente reutilizable como plantilla de SOP.

## SEO real

SEO es el músculo más fuerte del sitio — markup manual extenso y consistente.

- **Metas (home `index.html`):** title, description, keywords, author, `robots index,follow` (`:7-11`), canonical `:12`, Open Graph 6 props `:15-20`, Twitter Card `:23-27`, theme-color `#E91E63` `:34`, manifest `:33`.
- **Metas por página interna:** individualizadas. Blog `cctv-residencial-cdmx` tiene title/description/keywords propios, `author` con byline ("Fernando Oropeza · Directorio CDMX", `:9`), canonical propio `:11`, `og:type=article` `:13`. Alcaldía/categoría idem.
- **JSON-LD Schema.org — 63 de 64 HTML lo incluyen** (`grep -rl 'application/ld+json'` = 63). Conteo global de `@type` (instancias):
  - Directorio/negocio: `Offer` 211, `Service` 187, `OfferCatalog` 66, `Store` 13, `SecurityService` 5, `Wholesaler` 4, `Product` 24, `Brand` 2.
  - Listas/navegación: `ListItem` 190+22, `BreadcrumbList` 46+6, `ItemList` 1, `CollectionPage` 7.
  - FAQ: `FAQPage` 17, `Question` 157, `Answer` 157.
  - Reseñas: `Review` 36, `Rating` 36, `AggregateRating` 25.
  - Entidades: `Organization` 32+16, `Person` 50+15, `PostalAddress` 30, `City` 39, `State` 16, `Country` 3, `GeoCoordinates` 1, `OpeningHoursSpecification` 16, `ContactPoint` 15, `ImageObject` 14+15.
  - Sitio/blog: `WebSite` 8, `Blog` 1, `BlogPosting` 15+14, `SearchAction` 1.
  - **Tipos por arquetipo de página:** home → `WebSite`+`Organization`+`SearchAction` (`index.html:54-87`); blog → `BlogPosting`+`Person`+`Organization`+`ImageObject` (`blog/cctv-residencial-cdmx`); alcaldía → `CollectionPage`+`BreadcrumbList`+`WebSite` (`alcaldias/cuauhtemoc/categorias/seguridad-privada`); perfil empresa → `SecurityService`/`Service`+`OfferCatalog`+`FAQPage`+`AggregateRating`+`PostalAddress`+`City`/`State` (`categorias/seguridad-privada/gupri-guardias-privados`).
  - Nota: convive formato pretty (`"@type": "X"`) y minificado (`"@type":"X"`) → indica dos generaciones/orígenes de markup.
- **Internal linking:** breadcrumbs en 62 páginas + dropdown de categorías en header + cards enlazadas. ❌ Muchos enlaces internos apuntan a categorías/alcaldías inexistentes (ver placeholders/broken).
- **sitemap.xml:** 63 `<url>` (`grep -c '<url>'`). Distribución: 1 home + categorias + 3 alcaldias + 30 blog + 29 categorias (todas con trailing slash, URLs limpias). NO incluye `index.html.backup`.
- **robots.txt (2.6 KB):** reglas por bot — search engines full allow (Googlebot crawl-delay 0); AI bots permitidos (GPTBot, ClaudeBot, PerplexityBot, Google-Extended); SEO scrapers throttled (Ahrefs/Semrush/MJ12/Dot crawl-delay 10); bloqueados PetalBot y SeznamBot; `Disallow` de `*.backup`/`*.bak`/`/index.html.backup` y query strings de tracking; `Sitemap:` + `Host: cdmx.site`. Bien estructurado.
- **_redirects (12 reglas):** legacy `.html` → URL limpia con slash 301; `directorio-cdmx.com` y `www.directorio-cdmx.com` → canonical; `www.cdmx.site` → apex; `/404.html 200`; catch-all `/*.html → /:splat/ 301`. Correcto para preservar SEO de URLs viejas.
- **CSS / tokens:** sí hay tokens (ver Sistema de diseño).
- **audit_report.json (44 KB):** reporte de auditoría de **enlaces y placeholders** (no Lighthouse). Estructura `{summary, broken, placeholders_by_file}`. `summary`: 20 files analizados, 2463 enlaces totales, 961 OK, **183 broken**, **1072 placeholders**, 154 fragments, 247 external. Placeholders distribuidos en 19 archivos. ❌ Señal fuerte de contenido incompleto (categorías/alcaldías sin construir, hrefs `#` provisionales).
- **3 SEO-GUIDE-*.md:** guías operativas reutilizables específicas de cdmx.site:
  - `SEO-GUIDE-Google-Search-Console.md` — alta de property, verificación de ownership, submit de sitemap, request indexing, reportes, Bing Webmaster.
  - `SEO-GUIDE-Schema-Validation.md` — validación con Rich Results Test y schema.org validator, 12 URLs prioritarias, schemas avanzados a futuro, troubleshooting.
  - `SEO-GUIDE-Core-Web-Vitals.md` — Lighthouse/PageSpeed, DevTools, diagnósticos para sitios estáticos, monitoreo continuo, optimizaciones implementadas.

## Sistema de diseño

Sí existe un sistema de diseño con tokens — fuerte para un sitio estático.

- **Tokens CSS en `:root`** (`css/style.css:26`). Familias de variables detectadas: color (`--primary`, `--primary-hover`, `--primary-soft`, `--primary-glow`, `--gold`, `--gold-soft`, `--gold-glow`, `--bg`, `--surface`, `--text-base/-light/-muted/-dim`, `--border`, `--border-strong`); gradientes (`--grad-primary`, `--grad-primary-soft`, `--grad-card`, `--grad-radial`, `--grad-text`); tipografía/escala (`--text-sm/-base/-lg/-xl`, `--t-base`); sombras (`--shadow-sm/-md/-lg/-glow`, `--shadow-glow-gold`); radios (`--r-sm/-md/-lg/-xl/-full`); layout (`--container`, `--container-wide`, `--gutter`, `--header-h:72px`); transiciones (`--t-fast/-base/-slow`).
- **Paleta:** primario rosa/magenta (`theme-color #E91E63`, `index.html:34`) + acento dorado (`--gold*`). Estética con glows/gradientes.
- **Tipografía:** Inter (300–800) para texto + Poppins (600–900) para titulares, vía Google Fonts (`index.html:43`). Font Awesome 6.5.1 para iconos (`index.html:47`).
- **Responsive:** `css/mobile.css` (796 líneas) dedicado; overrides de `:root` por breakpoint (`--header-h:72px` @ `style.css:1650`, `--gutter:1rem` @ `:1707`).
- **Disciplina documentada:** comentarios en CSS "Tokens existentes en :root. No hardcodes." (`css/style.css:2473`, `:2962`) → convención explícita de no hardcodear colores.
- **CSS de artículo separado:** `css/article.css` (1050 líneas) para tipografía/layout de posts de blog.

## Convenciones

- **URLs limpias con carpeta + `index.html`** (trailing slash) para todo el contenido (blog/categorias/alcaldias) → coherente con `_redirects` catch-all `/*.html → /:splat/`.
- **Slugs en kebab-case** y nombres de marca como slug (`gama-de-mexico`, `seprico-condominios`).
- **`lang="es-MX"`** en todas las páginas (`index.html:2`).
- **No hardcodear colores en CSS** — usar tokens de `:root` (comentarios `style.css:2473/2962`).
- **Cache-busting por query** en assets propios (`/css/style.css?v=7`, `/css/mobile.css?v=m1`, `index.html:50-51`).
- **Backups versionados localmente** con `.backup`/`.bak` (e ignorados por git y robots): `index.html.backup`, `css/style.css.backup`, `css/style.css.bak`.
- **SOP de alta de empresa** centralizado en `DOCUMENTO-RESENAS.md` (carpeta → HTML perfil → card en categoría → schema → checklist).
- **`.gitignore`:** `*.backup`, `*.bak`, `.DS_Store`, `node_modules/`, `audit_report.json`, `package-lock.json`.

## Flujos / procesos

- **Build (marginal):** `npm run build` → webpack prod genera `dist/` con `index.html` + copia `img/css/js/vendor/icons/robots/404/manifest` (`webpack.config.prod.js`). ⚠️ No procesa las 63 páginas internas; el sitio real se sirve estático sin pasar por webpack.
  - ⚠️ El copy-plugin copia `js/vendor` → pero `js/vendor` **no existe** (solo `js/app.js`); `vendor/` raíz tiene solo `.gitkeep`. Posible error de build heredado.
- **Deploy:** push a repo → Cloudflare Pages publica el estático en `cdmx.site` (`README.md:5`, `_redirects`). Sin GitHub Actions (`.github` no existe).
- **Alta de contenido (manual):** seguir `DOCUMENTO-RESENAS.md` — crear carpeta de perfil, escribir HTML con schema, añadir card en la categoría, registrar en `sitemap.xml`.
- **QA de enlaces:** existe un script/proceso que generó `audit_report.json` (link checker con detección de placeholders) — herramienta de QA, no commiteada (ignorada en git).
- **SEO post-lanzamiento:** procesos documentados en las 3 SEO-GUIDE (GSC submit, validación de schema, monitoreo CWV).

## Integraciones

- **Cloudflare Pages** (hosting/CDN) — evidencia: `README.md:5` badge, `_redirects` (sintaxis Cloudflare Pages), `CNAME` apex `cdmx.site`. ✅ Confirmada.
- **WhatsApp** (CTA de contacto, sin API) — `wa.me/525570081816`, `wa.me/525520780102`, `wa.me/525512345678` en `index.html`; presente en 61 HTML. Son enlaces `wa.me`, no integración programática.
- **Google Fonts + Font Awesome (cdnjs/Cloudflare)** — CDNs externos (`index.html:41-47`). 247 enlaces externos según `audit_report.json`.
- **Sin Google Analytics / GTM / gtag real** — `grep 'gtag('` / `G-XXXXXXXX` → **0 resultados**; las apariciones de "analytics" son texto de marketing en OG descriptions (ej. `categorias/seguridad-privada/seguridadprivadamx/index.html:17` "dashboard analytics"). ⚠️ HUECO: no hay medición de tráfico instalada.
- **Sin n8n / fal.ai / Brevo (Sendinblue)** — grep en HTML/JS/MD → 0 (las únicas coincidencias "cloudflare" son el CDN de Font Awesome y badges). ⚠️ HUECO o N/A.
- **Sin GitHub Actions** — `.github` no existe (deploy lo maneja Cloudflare Pages directamente).

## Documentación previa

Documentación interna abundante y reutilizable:

- **DOCUMENTO-RESENAS.md (21 KB):** SOP completo de alta de empresas (datos, carpeta, HTML, card, assets, schema, checklist). Reutilizable como plantilla maestra de creación de perfiles de directorio.
- **SEO-GUIDE-Google-Search-Console.md (8 KB):** SOP de indexación (property, verificación, sitemap, request indexing, Bing).
- **SEO-GUIDE-Schema-Validation.md (8 KB):** SOP de validación de Schema.org (Rich Results Test, 12 URLs prioritarias, troubleshooting).
- **SEO-GUIDE-Core-Web-Vitals.md (9 KB):** SOP de performance (Lighthouse/PSI, diagnósticos para estáticos, monitoreo).
- **README.md (3 KB):** overview, stack, estructura, deploy Cloudflare.
- **audit_report.json (44 KB):** snapshot de QA de enlaces (183 broken, 1072 placeholders) — útil como baseline de remediación.
- **docs/auditoria-imagenes-seguridad-privada-2026-05-27.docx:** auditoría de imágenes de la vertical seguridad privada (no inspeccionada en profundidad — binario .docx).

→ Las 3 SEO-GUIDE + DOCUMENTO-RESENAS son SOPs directamente portables a la fábrica de sitios.

## Clasificación

### ✅
- ✅ SEO técnico sólido y consistente: 63/64 HTML con JSON-LD multi-tipo, metas/canonical/OG por página, sitemap de 63 URLs y robots.txt afinado por bot. Evidencia: `index.html:54-87`, `sitemap.xml` (63 `<url>`), `robots.txt`.
- ✅ Sistema de diseño con tokens centralizados y disciplina anti-hardcode. Evidencia: `css/style.css:26` (`:root`) + comentarios `style.css:2473/2962`.
- ✅ Migración SEO bien resuelta con redirects 301 (legacy `.html`, dominio viejo, www→apex). Evidencia: `_redirects`.
- ✅ SOPs internos reutilizables (alta de empresa + 3 guías SEO). Evidencia: `DOCUMENTO-RESENAS.md`, `SEO-GUIDE-*.md`.

### ❌
- ❌ Duplicación masiva de chrome (header/footer/top-bar/breadcrumb idénticos en 63 páginas) sin includes ni componentes → mantenimiento frágil. Evidencia: footer idéntico en `index.html:2449` y `blog/cctv-residencial-cdmx/index.html:618`; `grep -rl 'class="footer"'` = 63.
- ❌ Contenido incompleto en gran escala: 183 enlaces rotos y 1072 placeholders en 19 archivos. Evidencia: `audit_report.json` (`summary.broken=183`, `placeholders=1072`).
- ❌ Taxonomía sobre-declarada vs implementada: 15 categorías listadas pero solo 3 con contenido; 16 alcaldías previstas pero solo Cuauhtémoc construida. Evidencia: `categorias/index.html` (15 hrefs) vs `find categorias -maxdepth 1 -type d` (3); `alcaldias/` (1 dir).
- ❌ Build webpack roto/inútil para el sitio multipágina: solo procesa `index.html` y copia `js/vendor` inexistente. Evidencia: `webpack.config.prod.js`, `ls js/vendor` → no existe.

### 🤖
- 🤖 QA de enlaces automatizable: ya existe el output (`audit_report.json` con `broken`/`placeholders_by_file`) → reintegrar el script como check pre-deploy.
- 🤖 Generación de chrome/plantilla y schema repetitivo: candidato ideal a SSG/partials o a un generador (eliminaría la duplicación en 63 archivos y reduciría placeholders).

### 📐
- 📐 `DOCUMENTO-RESENAS.md` es un patrón canónico de "ficha de negocio en directorio" (datos → HTML → card → schema → checklist) reutilizable para la fábrica de sitios.
- 📐 Las 3 SEO-GUIDE-*.md son SOPs canónicos portables (GSC, Schema validation, Core Web Vitals) para cualquier sitio de contenido.

## ⚠️ HUECOS

- ⚠️ HUECO: **Sin analítica/medición instalada** (no gtag/GTM/GA) — no hay datos de tráfico para priorizar contenido. Evidencia: `grep 'gtag('` = 0.
- ⚠️ HUECO: **15 de 16 alcaldías sin página** y **12 de 15 categorías sin contenido** — origen de la mayoría de los 183 enlaces rotos. Evidencia: `alcaldias/` (1 dir), `categorias/` (3 dirs con contenido) vs `categorias/index.html` (15 hrefs).
- ⚠️ HUECO: **Duplicación de plantilla sin tooling** — cualquier cambio de header/footer/menú obliga a editar 63 HTML a mano (riesgo de divergencia ya visible: schema en pretty vs minificado). Evidencia: 63 archivos con `class="header"`/`class="footer"`.
- ⚠️ HUECO/INFO: **`docs/auditoria-imagenes-seguridad-privada-2026-05-27.docx`** no inspeccionado (binario .docx) — contenido y conclusiones desconocidos en esta auditoría ligera.
- ⚠️ HUECO de build: `webpack.config.prod.js` copia `js/vendor` que no existe; `vendor/` solo tiene `.gitkeep` → el build prod probablemente falla o queda incompleto; nadie lo usa para producción.
- ⚠️ SEGURIDAD (verificado): **NO se encontraron secretos reales** — `grep -rnE 'gho_|sk-…|AIza…|SECRET|api_key|Bearer'` (excl. node_modules/.git/lock/audit) arrojó solo (a) texto editorial sobre regulación de seguridad privada mexicana (SSC, DGSP, NOM/DC-3) y (b) clases de Font Awesome `fa-user-secret`. **Ninguna API key embebida en `js/app.js`** (no Google Maps key, no Analytics ID). Sitio limpio en este aspecto.
