# Diagnóstico — SEGURIDADPRIVADAMX

> Propósito: Sitio de captación de leads para una empresa de seguridad privada residencial en CDMX/Edomex, enfocado en condominios. **SITIO HTML ESTÁTICO (no Astro — confirmado: no existe astro.config) — auditoría ligera.**

Confirmación no-Astro: `find . -maxdepth 2 -name "astro.config*"` no devolvió resultados. El tooling es Webpack (ver Stack).

## Identidad
- **Negocio:** SeguridadPrivadaMX / "Origins Private Security" (ver `ANALISIS-COMPETITIVO.md` línea 5). Seguridad privada para condominios y residenciales en CDMX y Estado de México. Posicionamiento: 40+ años de experiencia (foundingDate 1985), guardias certificados SSC, monitoreo 24/7, precios transparentes.
  - Evidencia: `index.html` `<title>` "Seguridad Privada para Condominios en CDMX | SeguridadPrivadaMX"; `<h1>` "Seguridad privada para condominios y residenciales"; meta description (40 años, SSC, 24/7, cotización en 4h).
- **Dominio:** `seguridadprivadamx.com` (`CNAME`).
- **Tipo:** sitio HTML estático multipágina (no SPA, no CMS). No hay rastro de WordPress/Elementor/`wp-content` en `index.legacy.html` (grep negativo).
- **LEGACY vs BUILD nuevo — coexisten dos versiones del home:**
  - `index.html` (908 líneas, 79 KB): **home rediseñado/nuevo**, usa hoja `css/home.css` (exclusiva de este archivo) y clases nuevas (`hero-inner`, `hero-strip`, `hero-chip`, `text-grad`).
  - `index.legacy.html` (1087 líneas, 62 KB): **home anterior**, usa `css/style.css` y clases viejas (`hero-content`, `hero-title`, `hero-description`, `services-grid`).
  - Evidencia: `grep -l home.css *.html` → solo `index.html`; `grep -l style.css *.html` → todas las demás páginas + `index.legacy.html`.
  - **Implicación:** el rediseño se aplicó SOLO al home. Todas las páginas internas (servicios, blog, nosotros, contacto, legales) siguen con el CSS y estética legacy (`style.css`).
- **Estado/deploy:** repo git activo, deploy automático a **GitHub Pages** en cada push a `main` (`DEPLOY.md`). Remote: `https://github.com/Origenlab/SEGURIDADPRIVADAMX.git`. Último commit: `eb585d2 Agrega DEPLOY.md con instrucciones de despliegue`. Historial corto (6 commits) — proyecto reciente.

## Stack real
- **HTML/CSS/JS plano** (vanilla, sin framework JS de runtime).
- **CSS propio, sin framework** (no Tailwind/Bootstrap): dos hojas en `css/` — `style.css` (51 KB, legacy global) y `home.css` (39 KB, solo home nuevo). Sistema de design tokens con variables CSS en `:root` (`css/home.css`): paleta dark-navy + azul (`--brand #3b82f6`, `--bg #070b15`), gradientes, fuentes Archivo (display) + Inter (body).
- **JS:** un solo `js/app.js` (4.5 KB, vanilla, IIFE): acordeón FAQ, menú móvil, smooth-scroll, debounce de resize. Sin librerías. `js/vendor/` está vacío (solo `.gitkeep`).
- **Tooling de build: Webpack 5** (`package.json` scripts `start`/`build`; configs `webpack.common.js` + `webpack.config.dev.js` + `webpack.config.prod.js`). `node_modules/` instalado localmente.
  - ⚠️ **El build de Webpack está prácticamente desconectado del sitio real:** `webpack.common.js` solo empaqueta `js/app.js` → `dist/js/app.js`, y `webpack.config.prod.js` procesa **únicamente `index.html`** vía HtmlWebpackPlugin (copia img/css/etc. a `dist/`). Las demás páginas (.html de servicio, blog, legales) NO pasan por el build. En la práctica el sitio se publica como **HTML estático servido tal cual desde la raíz** vía GitHub Pages — Webpack es andamiaje heredado de un boilerplate, no el pipeline de publicación. `dist/` está en `.gitignore`.
- **Deploy:** GitHub Pages sirviendo la raíz del repo (no la salida de Webpack). Confirmado en `DEPLOY.md`.

## Estructura de archivos
- **Páginas raíz:** `index.html` (home nuevo), `index.legacy.html` (home viejo, no enlazado en sitemap), `servicios.html`, `nosotros.html`, `contacto.html`, `blog.html`, `404.html`, legales `aviso-privacidad.html` + `terminos-condiciones.html`.
- **Páginas de servicio (6):** `vigilancia-24-7.html`, `control-accesos.html`, `camaras-monitoreo.html`, `patrullaje-vehicular.html`, `respuesta-emergencias.html`, `reportes-analytics.html`.
- **Blog:** carpeta `blog/` con 8 artículos largos sobre seguridad en condominios CDMX (guías, costos, marco legal, CCTV, control de acceso, protocolos, mejores empresas, guardias intramuros).
- **Assets:** `css/` (2 hojas), `js/` (`app.js` + `vendor/` vacío), `img/` **vacío** (solo `.gitkeep` — ⚠️ las imágenes referenciadas como `images/logo.png` en schema no existen localmente), favicons/manifest en raíz.
- **Config/SEO:** `sitemap.xml`, `robots.txt`, `CNAME`, `.editorconfig`, `.gitattributes`.
- **Documentación interna:** `DEPLOY.md`, `ANALISIS-COMPETITIVO.md` (30 KB, estudio de mercado), y carpeta **`.audit/`** con dos guías de generación de contenido: `DOCUMENTO-PAGINAS.md` (44 KB — plantilla maestra para crear páginas de servicio, página de referencia `/vigilancia-24-7.html`) y `DOCUMENTO-ARTICULOS.md` (47 KB — guía para generar artículos de blog con su card, SEO y schema).
- **`index.html` vs `index.legacy.html`:** misma identidad de negocio, distinto diseño/CSS (ver Identidad). El legacy quedó como respaldo; no está en `sitemap.xml`.

## SEO real
- **Metas completas en `index.html`:** title optimizado por keyword, meta description, keywords, `canonical`, Open Graph (`og:title`, etc.).
- **Schema JSON-LD muy rico** (presente en las 20 páginas indexadas + legacy). Tipos detectados (conteo agregado vía grep `@type`):
  - `SecurityService`/`LocalBusiness` (`index.html`): con `foundingDate 1985`, `telephone`, `address` (Av. Insurgentes Sur 1602), `priceRange $$$`, `aggregateRating 4.9/150`, `areaServed` (CDMX + Edomex), `sameAs` (Facebook/Instagram).
  - `Service` (15), `FAQPage`+`Question`/`Answer` (en home y servicios), `Article` (8, en blog), `BreadcrumbList`+`ListItem` (18, navegación), `Organization` (18), `ImageObject`, `WebPage`, `ContactPage`, `OpeningHoursSpecification`, `GeoCoordinates`, `OfferCatalog`/`Offer`/`PriceSpecification`.
  - Rutas: schema en `index.html`, las 6 páginas de servicio, `servicios.html`, `blog.html`, `contacto.html`, `nosotros.html`, y los 8 artículos de `blog/`.
- **`sitemap.xml`:** 21 URLs (home, servicios, 6 páginas de servicio, nosotros, contacto, blog index, 8 artículos, 2 legales). Bien estructurado.
- **`robots.txt`:** permite todo, bloquea `/cgi-bin/` y `*.php`, declara sitemap. Correcto.

## Patrones rescatables para migración a Astro
1. **Sistema de design tokens CSS (`css/home.css` `:root`)** — paleta dark-navy/azul completa, gradientes (`--grad-brand`, `--grad-text`), escala de radios, fuentes Archivo+Inter. Migrable casi 1:1 a un `global.css` / variables de tema en Astro. (Solo el home tiene esta versión moderna; es el patrón visual a estandarizar.)
2. **Plantillas y arquitectura de contenido ya documentadas en `.audit/`** — `DOCUMENTO-PAGINAS.md` y `DOCUMENTO-ARTICULOS.md` definen la estructura HTML base, secciones reutilizables, componentes y formato de datos de páginas de servicio y artículos. Es prácticamente un spec de componentes Astro listo para mapear (página de referencia: `vigilancia-24-7.html`).
3. **Esquema JSON-LD por tipo de página** — `SecurityService`/`LocalBusiness` (home), `Service` (páginas de servicio), `Article`+`BreadcrumbList` (blog), `FAQPage` (home/servicios). Reutilizable como componentes Astro `<Schema>` parametrizados; el contenido del schema ya está redactado.
4. **Copy SEO en español, listo y extenso** — meta descriptions/keywords/H1 por keyword en cada página, y 8 artículos de blog largos de fondo (condominios CDMX: costos, marco legal, REPSE/SSC, CCTV, protocolos). Contenido difícil de regenerar; migrar tal cual a colecciones de contenido de Astro.
5. **Componentes JS vanilla reutilizables (`js/app.js`)** — acordeón FAQ, menú móvil, smooth-scroll con debounce/`requestAnimationFrame`. Pequeños y portables a islas/`<script>` de Astro.
6. **`ANALISIS-COMPETITIVO.md`** — estudio de mercado (posicionamiento, propuesta de valor "precios transparentes", segmento condominios). No es código pero es la fuente de la estrategia de copy/SEO a preservar.

## Integraciones / Seguridad
- **Tokens/llaves expuestos: NO.** Scan con grep de patrones `gho_/ghp_/sk-/AKIA/Bearer/api_key/secret/token` sobre `*.html *.js *.json *.md *.xml` (excluyendo `node_modules` y `package-lock`): sin coincidencias reales. Las únicas coincidencias de "secret" son contenido en español legítimo ("**Secret**aría de Seguridad Ciudadana"). `.git/config` no contiene credenciales (remote HTTPS limpio).
- **Sin integraciones de terceros activas:** no hay backend, no hay API keys, no hay Analytics/GTM detectado, formulario de contacto sin endpoint visible (es sitio estático). Único servicio externo: GitHub Pages (hosting).
- ⚠️ **Datos de contacto y de schema son PLACEHOLDERS / datos de muestra** (no es fuga de seguridad, pero sí riesgo de publicación): teléfono `55 1234 5678` / `55 8765 4321`, `tel:+525512345678`, `wa.me/525512345678`, dirección "Av. Insurgentes Sur 1602", rating 4.9/150. El propio `DEPLOY.md` (línea 54) advierte: "Teléfono/WhatsApp del sitio son **placeholders**: actualízalos antes de difundir." Hay que reemplazarlos antes/durante la migración.

## ⚠️ HUECOS
- **`img/` vacío** (solo `.gitkeep`): el schema y posiblemente HTML referencian `images/logo.png` y otras imágenes que no existen en el repo. No se pudo verificar de dónde salen las imágenes en producción (¿se suben aparte? ¿faltan?). HUECO de assets visuales.
- **Datos de negocio reales sin confirmar:** teléfono, WhatsApp, dirección, redes sociales y rating son placeholders/muestra (ver Seguridad). No se conoce la información real de contacto.
- **Webpack vs realidad de deploy:** existe pipeline Webpack pero el deploy real (GitHub Pages desde raíz) lo ignora; no se pudo confirmar si alguien ejecuta `npm run build` o si `dist/` se usa en algún flujo. Asumido: Webpack es andamiaje heredado no usado en publicación.
- **Inconsistencia de diseño no resuelta:** solo el home (`index.html`) fue rediseñado con `home.css`; el resto del sitio sigue con `style.css` legacy. No se auditó a fondo el grado de divergencia visual entre ambas hojas (auditoría ligera).
- **Formulario de contacto:** `contacto.html` existe con schema `ContactPage`, pero no se verificó si el formulario tiene backend/servicio de envío (probablemente no, al ser estático). HUECO funcional a confirmar en migración.
