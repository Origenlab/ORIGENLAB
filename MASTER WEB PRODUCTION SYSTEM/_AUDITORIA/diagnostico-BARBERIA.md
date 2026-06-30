# Diagnóstico — BARBERIA

> Propósito: **Directorio editorial nacional de barberías de México** (`barberia.mx`). NO es Astro — es un sitio **HTML estático servido tal cual** (no hay framework de runtime; webpack en `package.json` está inactivo). Auditoría LIGERA: identidad, naturaleza (legacy/build), y patrones rescatables para el sistema de producción Astro.

## Identidad
- **Negocio/dominio:** Barberia.mx — "El Directorio de la Barbería Mexicana" · `barberia.mx` (`CNAME`). Directorio editorial nacional de barberías, con marketplace, bolsa de trabajo y revista del oficio. Operación declarada "desde 2005" (`index.html:58` schema description, `index.html:12` meta).
- **Tipo de sitio:** HTML estático prerrenderizado (páginas `index.html` por carpeta). Confirmado: **sin `astro.config.*`**; `package.json` usa webpack 5 (`start: webpack serve`, `build: webpack prod`) pero el deploy es HTML directo (no hay `dist/` versionado; el source HTML ES producción). `components/` contiene parciales HTML (masthead/header/footer) inyectados por `js/components.js` (loader de slots) — no es un framework de componentes.
- **ARQUETIPO: D — contenido/directorio/educación.** Justificación inequívoca: `<title>` "Las Mejores Barberías de México · Directorio Nacional" (`index.html:7`); H1/meta "Directorio editorial nacional… 1,247 barberías profesionales reseñadas en los 32 estados" (`index.html:12,58`); schema raíz `Organization` + `WebSite` (con `SearchAction`) + **`ItemList`** de estados (`index.html`), y `Offer` "Directorio de barberías" / "Registro de barbería" categoría `Directory`/`BusinessListing` (`index.html:105-106`). Las páginas de barbería individual (5 en CDMX) usan `LocalBusiness` + `BreadcrumbList` + `OfferCatalog` — fichas de directorio, no el sitio de una sola barbería. Listado por zona/estado + blog editorial + artículos → directorio D, no servicio local C.
- **Estado:** En producción y activo, **v1 a medias**. Hubs principales (home, directorio, blog, zona, categorías) migrados al sistema editorial nuevo; pendientes documentados (DOCS/05, DOCS/08): `/regiones/{slug}` ×6, `/estados/{slug}` ×31, registro/búsqueda funcionales, y migrar al template editorial las 5 fichas de barbería y los 3 artículos largos. Última actualización ~29-may-2026 (sitemap).

## Stack
- **HTML5 + CSS vanilla + JS vanilla.** Sin runtime de framework.
- **Build:** webpack 5 (`webpack.common/config.dev/config.prod.js`) **legacy/inactivo** — `HtmlWebpackPlugin` + `CopyPlugin` copian assets a `dist`, pero el deploy real sirve el HTML fuente. `package.json` con `name: " "` (placeholder).
- **CSS:** 3 archivos en `css/` → `style.css` (legacy, ~44 KB, backward-compat), `editorial.css` (~1,900 L, sistema nuevo que overridea legacy), `mobile.css` (responsive). Tokens CSS reales en `editorial.css`.
- **Deploy:** **GitHub Pages** vía `CNAME` (`barberia.mx`). ⚠️ No se detectó `.github/workflows/` → deploy probablemente por rama (branch pages) sin GHA, o publicado fuera del repo. (HUECO menor.)

## Estructura de carpetas / URLs
~23 archivos `.html`; **18 URLs en `sitemap.xml`** (lastmod 2026-05-29, priorities escalonadas). Árbol:
```
/                         index.html (home, 69 KB)
/404.html
/directorio/index.html            ← hub nacional catálogo
/ciudad-de-mexico/index.html      ← city guide + 5 fichas barbería:
    barberia-{roma-norte|condesa|polanco|juarez|del-valle}-*/index.html
/blog.html · /zona.html           ← hubs (magazine / atlas zonas CDMX)
/categorias/index.html + 5 sub/index.html  (tendencias, tecnicas, productos, negocios, estilo-de-vida)
/articulos/{3 slugs}/index.html   ← artículos largos
/components/ (masthead.html, header.html, footer.html)  ← parciales inyectados por js
/css/ /js/(+vendor) /img/
DOCS/ (11 .md) · .audit/ (2 .md maestros)
```

## Layouts / Componentes
No hay layouts de framework. Patrón: cada `.html` incluye `<head>` propio + slots `<div data-component>` rellenados en cliente por `js/components.js` con los parciales de `components/` (masthead, header, footer). Patrones visuales (no componentes reutilizables programáticos) viven como clases en `editorial.css`: `.ed-hero-cols`, `.ed-section-intro`, `.ed-cover`, `.ed-related`, `.ed-chips`, `.ed-regions`, `.ed-manifesto`.

## Content / taxonomías
Contenido hardcodeado en HTML (no hay colección ni CMS). Taxonomías de directorio: por **zona geográfica** (estados/regiones/ciudad/zona CDMX) y por **categoría editorial** (5: tendencias, técnicas, productos, negocios, estilo-de-vida). Artículos largos en `/articulos/`. Sistemas de producción documentados en `.audit/DOCUMENTO-BARBERIAS.md` (fichas) y `.audit/DOCUMENTO-ARTICULO.md` (artículos).

## SEO real
- **robots.txt** (114 L): permite a buscadores + bots IA (OpenAI, Anthropic, Perplexity, Apple, Google-Extended…), bloquea Ahrefs/Semrush/MJ12/Petal (crawl-delay), Disallow `/.audit/` y `/.git/`, Sitemap declarado. Robusto.
- **sitemap.xml:** 18 URLs, lastmod 2026-05-29.
- **Schema (JSON-LD) por página** (confirmado grep `@type`): home `Organization`+`WebSite`(SearchAction `/buscar?q=`)+`ItemList`; `/directorio/` y `/categorias/` `CollectionPage`+`BreadcrumbList`(+`ItemList`); `/blog.html` `Blog`+`BlogPosting`×3; `/zona.html` `ItemList` (6 zonas); fichas barbería `LocalBusiness`(+`aggregateRating`,`address`,`geo`,`hasOfferCatalog`)+`BreadcrumbList`; artículos `Article`(migración pendiente)+`BreadcrumbList`.
- **Meta:** patrón completo en todas (title, description, keywords, OG, Twitter, canonical).
- **WhatsApp:** solo en las 5 fichas de barbería (17 enlaces `wa.me`/whatsapp; los hubs no lo usan) — coherente con fichas de directorio que enlazan a cada negocio.

## Sistema de diseño (rescatable)
Tokens reales en `css/editorial.css`: `--ink #0a0a0a`, `--ink-soft #1a1916`, `--paper #f3ede3` (crema), `--paper-warm/-deep`, `--copper #b87333` (acento cobre, + hi/deep). Tipografía `--font-display: "Fraunces"` (serif editorial, opsz/italic) + Inter (body) + JetBrains Mono (kickers/labels). Hairlines (`--hair-ink`), sombras de card editorial (`--sh-card`). Filosofía editorial/magazine sobria (Frank rechazó tamaños "mega" — DOCS/07): tipografía cuidada, italic en cobre para énfasis, no iconos llamativos. **Coincide con la familia visual de CLIBEL y MESECI** (Fraunces serif + paleta cálida).

## Patrones rescatables para el sistema Astro
De alto valor (documentados en DOCS/06 Patrones Editoriales, DOCS/09 Interlinking):
1. **Section-intro 2-col estricto** (kicker mono + H2 serif italic | 2 párrafos apilados, vertical-center, hairline) — patrón editorial canónico.
2. **Hero landing** 6fr/6fr (kicker+H1+dek | aside 2 párrafos SEO con marca en `<strong>`) + search bar.
3. **Cover de hub** (breadcrumbs + eyebrow + H1 italic con palabra en cobre + dek + meta mono).
4. **Bloque "Related" obligatorio** (4 cross-links al pie de cada hub; hover ink/paper).
5. **Interlinking obligatorio:** cada página nueva enlazada desde ≥3 lugares (matriz en DOCS/09).
6. **Arquitectura de directorio local SEO:** zonas/estados/ciudad + fichas `LocalBusiness` (protocolo de investigación de barberías en `.audit/DOCUMENTO-BARBERIAS.md`) — reutilizable como módulo de directorio (arquetipo D) y compartible con el directorio de dulcerías de MEDEDUL.

## Documentación previa
**No es vault Obsidian**, pero `DOCS/` es una carpeta de 11 `.md` numerados muy completa y reutilizable: 01 Sistema de Diseño · 02 Arquitectura · 03 Páginas · 04 SEO y Schema · 05 Guía de Continuación · 06 Patrones Editoriales · 07 Decisiones del Cliente · 08 Auditoría Index (2026-05-28, 78 hallazgos / 21 fixes) · 09 Interlinking Strategy · 10 SEO + GEO Audit (28 KB) · README. Más `.audit/` con 2 documentos maestros de producción (fichas y artículos). **Reutilizable** directamente para `03 - SEO Master System`, `04 - Diseño y UX` y `_PATRONES` del vault maestro.

## Clasificación

### ✅ Bien resuelto / canónico
- **Sistema de schema JSON-LD por tipo de página** (Organization/WebSite/ItemList en home; LocalBusiness+OfferCatalog en fichas; CollectionPage+Breadcrumb en hubs) — `index.html`, fichas `ciudad-de-mexico/*`.
- **robots.txt maduro** (allowlist de bots IA + bloqueo de scrapers SEO + Disallow de `.audit`/`.git`).

### ❌ Roto / a corregir
- **Funciones declaradas sin backend:** búsqueda `/buscar?q=` (SearchAction en schema + form) es decorativa; `/registro` y newsletter sin integración (DOCS/05, DOCS/08).
- **OG images inexistentes:** metas referencian `/img/og-*.jpg` que no existen (hotlinks a Unsplash) — OG roto.

### 🤖 Automatizable
- **Generación de fichas de barbería y artículos** siguiendo los protocolos ya escritos en `.audit/DOCUMENTO-BARBERIAS.md` / `DOCUMENTO-ARTICULO.md` (estructura, schema, interlinking fijos) — candidato a producción asistida por IA al portarse a colecciones Astro.

### 📐 Patrón reutilizable
- **Patrones editoriales `.ed-*`** (section-intro 2-col, cover de hub, related block, interlinking obligatorio) + tokens Fraunces/cobre/paper — base directa para los componentes editoriales del sistema maestro (`css/editorial.css`, `DOCS/06`).

## ⚠️ HUECOS
- **No es Astro:** para integrarlo al sistema de producción hay que **portar HTML→Astro** (colecciones para directorio/blog/artículos; los patrones `.ed-*` y el schema ya están listos para trasladarse).
- **Build webpack legacy inactivo** — `package.json` placeholder (`name: " "`); decidir si se elimina o se reemplaza por Astro.
- **Deploy sin workflow detectado** (`.github/workflows/` ausente; deploy por CNAME/branch). Confirmar mecanismo.
- **v1 incompleta:** faltan regiones (6), estados (31), búsqueda/registro funcionales, y migración del template editorial a 5 fichas + 3 artículos (DOCS/05).
- **OG images faltantes** (arriba).
- **Seguridad:** ✅ sin tokens/credenciales expuestos (grep `gho_`, `sk-`, `api_key`, `SECRET`, `AKIA`, `Bearer` en todo el repo → 0 hallazgos). robots.txt además bloquea el crawl de `.audit/` y `.git/`.
