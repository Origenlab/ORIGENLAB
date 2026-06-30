# Diagnóstico — FIREFIGHTERCOMMX

> Propósito: Directorio nacional de estaciones de bomberos de México + blog técnico de equipamiento contra incendios (dominio firefighter.com.mx).

## Identidad
- **Negocio / dominio:** "Firefighter México" / Firefighter.com.mx — dominio `https://firefighter.com.mx` (evidencia: `astro.config.mjs` línea `site`, `src/components/seo/SEOHead.astro` `siteUrl`).
- **Tipo:** Directorio público de servicios de emergencia + contenido editorial (blog). El `package.json` lo describe literalmente como "Directorio Nacional de Estaciones de Bomberos de México".
- **ARQUETIPO tentativo:** **D (contenido / directorio / educación)**. Justificación: el núcleo del sitio son colecciones `stations` (92 fichas) y `blog` (100 artículos) con `src/pages/directorio/[state]/...` y schema `EmergencyService`/`ItemList`; no hay catálogo comercial ni carrito. Tiene un módulo secundario `productos` (estático, `src/data/productos.json`) pero es accesorio. Evidencia: `src/content.config.ts`, `src/pages/directorio/`, `src/utils/seo.ts`.
- **Estado:** **vivo**. Git activo (último commit en `.git` 18-jun), workflow de deploy presente, contenido abundante. Coexiste con `FIREFIGHTERMX` (firefighter.mx) que tiene su propio `/directorio` — hay solapamiento conceptual entre proyectos (ver ⚠️ HUECOS).

## Stack
- **Astro:** `^5.2.0` (`package.json`).
- **Integrations:** `@astrojs/sitemap ^3.2.1`, `@astrojs/tailwind ^6.0.0` (`astro.config.mjs`, `package.json`).
- **CSS framework / tokens:** TailwindCSS `^3.4.0` con config clásica `tailwind.config.mjs` (no `@theme`). Tokens definidos en `theme.extend.colors`: `fire-red` (#C41E3A), `navy` (#1B2A4A), `gold` (#D4A843) + escala `fire` 50–950 + `neutral`. Fuentes: Inter (sans) + Space Grotesk (display). `darkMode: 'class'`.
- **Librerías:** `leaflet ^1.9.4` + `@types/leaflet` (mapa interactivo del directorio).
- **Adapter / output:** sin adapter → **output estático** (default). `build.inlineStylesheets: 'auto'`, `compressHTML: true`, `prefetch.prefetchAll: true`.
- **Deploy detectado:** **GitHub Pages** vía `.github/workflows/deploy.yml` (upload-pages-artifact@v3, deploy-pages@v4, branch `main`, Node 20). Repo: `github.com/Origenlab/FIREFIGHTER.git` (`.git/config`).

## Estructura de carpetas (resumen)
```
src/
  assets/styles/global.css
  components/{directory,home,layout,productos,seo,ui}/
  content/{blog/*.md (100), stations/<estado>/*.md (92)}
  content.config.ts
  data/{productos.json, service-types.json, states.json}
  layouts/{BaseLayout.astro, DirectoryLayout.astro}
  pages/{index, directorio/[state]/..., blog/[...slug], productos/[categoria], + estáticas}
  utils/seo.ts
public/  (robots.txt, sitemap via integración, sw.js, favicon, manifest)
```
Carpetas raíz extra: `docs/`, `FIREFIGHTER/` (subdir), artefactos de investigación (`gen_estudio.py`, `.docx`).

## Layouts — jerarquía
- **`src/layouts/BaseLayout.astro`** — layout raíz. Props ricas: `title, description, image, type ('website'|'article'|'place'), canonicalUrl, noindex, breadcrumbs[], includeWebsiteSchema, stateDirectory, station, article, publishedDate, modifiedDate, schema`. Compone: `<head>` con `SEOHead` + `JsonLd` opcional + favicon/manifest/preconnect fonts; `<body>` con skip-link, `Header`, `Breadcrumbs` condicional, `<main>`, `Footer`, y registro de **Service Worker** (`/sw.js`). lang `es-MX`.
- **`src/layouts/DirectoryLayout.astro`** — hereda de `BaseLayout` (lo envuelve). Props: `title, description, image, breadcrumbs`. Solo añade wrapper `bg-slate-50` + `container-custom py-8`. Uso: páginas del directorio.
- Páginas usan directamente `BaseLayout` (ej. `blog/[...slug].astro` importa `BaseLayout` con `type="article"`).

## Componentes — inventario
| Componente | Ruta | Props (resumen) | Dónde se usa |
|---|---|---|---|
| SEOHead | src/components/seo/SEOHead.astro | title, description, image, station, breadcrumbs, stateDirectory, includeWebsiteSchema, article… | BaseLayout `<head>` |
| JsonLd | src/components/seo/JsonLd.astro | type ('WebSite'\|'Organization'\|'FireStation'\|'BreadcrumbList'\|'Article'), data | BaseLayout (schema opcional) |
| Header | src/components/layout/Header.astro | — | BaseLayout |
| Footer | src/components/layout/Footer.astro | — | BaseLayout |
| Breadcrumbs | src/components/layout/Breadcrumbs.astro | items[] | BaseLayout, páginas |
| StationCard | src/components/directory/StationCard.astro | (ficha estación) | directorio |
| Hero / FAQ / StatsCounter / Testimonials / StatesGrid / ProductCategories / Sectors / CertificationsBar / ContactChannels / CTAWhatsApp / HowItWorks / QuickNav / WhyFirefighter / FeaturedStations / DirectorioSection | src/components/home/*.astro (17) | `pages/index.astro` |
| Button / Card / Badge / Input / Logo / Pagination | src/components/ui/*.astro | variantes UI base | global |

UI base existe (`ui/`) con Button, Card, Badge, Input, Pagination, Logo — sistema de componentes reutilizables. `components/productos/` está vacío de archivos detectados (solo el dir).

## Content Collections / esquemas / taxonomías
Definidas en `src/content.config.ts` con **Content Layer API** (`glob` loader, Astro 5):
- **`stations`** (92 .md en `content/stations/<estado>/`): campos clave `name, stationCode?, serviceType (enum 6), status (enum activa/inactiva/en-construccion), state, stateSlug, municipality, city, address, latitude, longitude, phone, emergencyPhone (def 911), services[] (enum 12), equipment{fireTrucks,ambulances,rescueVehicles}, verified, lastUpdated, metaTitle?, metaDescription?`. Carpetas por estado: `ciudad-de-mexico`, `estado-de-mexico`, `puebla`. Evidencia frontmatter real: `EB-PUE-020 Ciudad Serdán`.
- **`states`** (loader definido, base `content/states` — **directorio no encontrado** → colección vacía): `name, code, capital, region, emergencyPhone, civilProtectionPhone?…`.
- **`blog`** (100 .md): `title, description, pubDate, updatedDate?, author (def "Firefighter México"), image?, imageAlt?, tags[], draft`.
- **Rutas dinámicas:** `directorio/[state]/` (carpeta), `blog/[...slug].astro` (params = `post.id`), `productos/[categoria].astro` (desde `data/productos.json`).

## SEO real
- **Metas:** `SEOHead.astro` genera título `{title} | Firefighter.com.mx`, description, canonical (`Astro.url.href`), `noindex` opcional, hreflang (`es-MX`, `es`, `x-default`), geo tags (MX), Open Graph completo (image 1200×630), Twitter `summary_large_image`, article:published/modified, place:lat/long para estaciones.
- **Schema JSON-LD (en `src/utils/seo.ts`, todas funciones):** `EmergencyService` (fichas de estación — con `geo`, `openingHoursSpecification` 24/7, `areaServed` City, `priceRange: Gratuito`), `BreadcrumbList`, `WebSite` + `SearchAction` (home), `Organization`, `Article` (blog), `ItemList` (listings de estado). `JsonLd.astro` añade `FireStation`/`Organization`/`WebSite` como alternativa. **SEO de directorio local es el más fuerte del cluster** por el uso de `EmergencyService` + geo.
- **Patrón de URLs:** `/directorio/[estado]/[estacion]`, `/blog/[slug]`, `/productos/[categoria]`. Trailing slash default Astro.
- **Internal linking:** related posts por tags compartidos (`blog/[...slug].astro`: filtra por tags, top-5), recientes top-4, categorías de blog hardcodeadas (8 con badges NFPA/NOM).
- **Sitemap / robots:** sitemap vía integración (`changefreq weekly, priority 0.7`, `sitemap-index.xml`). `public/robots.txt` presente y correcto (Allow /, apunta a sitemap-index).

## Sistema de diseño
- **Tokens:** en `tailwind.config.mjs` (`theme.extend`): paleta `fire-red`/`navy`/`gold` + escala `fire` + `neutral`; fuentes Inter/Space Grotesk; animaciones `fade-in`, `slide-up`, `count-up` con keyframes. **No usa CSS variables `@theme`** (Tailwind 3 clásico). CSS adicional en `src/assets/styles/global.css` (clase utilitaria `container-custom` referenciada).
- **UI base:** `ui/Button, Card, Badge, Input, Pagination, Logo` — componentes base presentes.
- **Hero / cards / CTA / WhatsApp / breadcrumbs:** Hero (`home/Hero.astro`), StationCard (`directory/`), CTA WhatsApp (`home/CTAWhatsApp.astro`), Breadcrumbs (`layout/Breadcrumbs.astro`, integrado en BaseLayout con BreadcrumbList schema). No hay botón flotante WhatsApp global tipo "Float" (a diferencia de FFMX/FFSMX/LGA/MONITORES) — el CTA WhatsApp es una sección.

## Convenciones de nombres/archivos
- Componentes **PascalCase** agrupados por dominio de carpeta (`home/`, `directory/`, `layout/`, `seo/`, `ui/`).
- Contenido en **kebab-case** (`acoples-storz-conexiones-rapidas.md`), estaciones agrupadas por carpeta de estado en kebab-case.
- Utilidades en `utils/seo.ts` (TS, funciones `generate*Schema`).
- Inglés en nombres de campos de schema (`stationCode`, `serviceType`), español en contenido.

## Flujos / procesos (implícitos)
- **Alta de estación:** `pages/agregar-estacion.astro` (formulario para captar nuevas estaciones; flujo de curación manual — campo `verified`).
- **Búsqueda en directorio:** `WebSite SearchAction` apunta a `/directorio/?q=` + mapa Leaflet (`pages/mapa.astro`).
- **Emergencias:** `pages/emergencias.astro` (página de servicio 911).
- **Publicación de blog:** archivos .md → `getCollection('blog')` → related por tags.

## Integraciones
- **GitHub Actions:** ✅ `.github/workflows/deploy.yml` (build + deploy a GitHub Pages).
- **Cloudflare:** ⚠️ HUECO — sin `wrangler.toml` ni `.wrangler/`. Deploy es GitHub Pages, no Cloudflare.
- **n8n / fal.ai / Brevo:** ⚠️ HUECO — sin evidencia en código, `.env`, ni configs. No hay formularios conectados a backend (los forms son estáticos sin endpoint detectado).
- **Otros:** Service Worker propio (`/sw.js`), Leaflet (mapas). `gen_estudio.py` = script Python de generación de estudio competencia (fuera del runtime web).

## Clasificación

### ✅ Funciona
- SEO de directorio local con schema `EmergencyService` + geo + `openingHoursSpecification` — el más completo del cluster — `src/utils/seo.ts` (función `generateEmergencyServiceSchema`).
- Content Layer API (Astro 5) bien tipada con Zod, enums estrictos para `serviceType`/`services`/`status` — `src/content.config.ts`.
- Internal linking automático en blog por tags compartidos + recientes — `src/pages/blog/[...slug].astro` (líneas ~16–38).
- robots.txt correcto + sitemap-index por integración — `public/robots.txt`, `astro.config.mjs`.

### ❌ Falla
- Colección `states` declarada pero **sin carpeta `src/content/states/`** → colección vacía; cualquier página que la consuma renderiza vacío — `src/content.config.ts` (loader base inexistente).
- Carga de fuentes desde Google Fonts CDN externo (Inter + Space Grotesk) en `BaseLayout` → dependencia de terceros / LCP penalizable; no self-hosted como FFMX — `src/layouts/BaseLayout.astro` (preload googleapis).
- Solapamiento de propósito con FIREFIGHTERMX (ambos tienen directorio de estaciones) → riesgo de canibalización SEO y duplicación de mantenimiento — comparar `content/stations` vs `FIREFIGHTERMX/src/data/estaciones.ts`.

### 🤖 Automatizable
- Generación / verificación de fichas de estación (92 hoy, faltan 29 estados) — el campo `verified` y `lastUpdated` sugieren un pipeline de scraping/curación de fuentes oficiales (gaceta/cabildo) que podría automatizarse (n8n + fuente pública).

### 📐 Estandarizable
- Patrón `SEOHead` + `utils/seo.ts` (funciones `generate*Schema`) es candidato a **librería SEO compartida** del cluster — más maduro en geo/EmergencyService que los demás; debería unificarse con el `SEO.astro`/`SchemaOrg.astro` de FFMX.

## ⚠️ HUECOS
- **HUECO (states vacía):** loader `states` apunta a `./src/content/states` que no existe en el árbol → no hay páginas de estado basadas en colección (las hay por carpeta `pages/directorio/[state]`). Verificar si es intencional.
- **HUECO (formularios sin backend):** `agregar-estacion.astro` y `contacto.astro` no muestran endpoint de envío (n8n/Brevo/API) en el código revisado; no se confirma a dónde llegan los datos.
- **HUECO (componentes/productos):** carpeta `src/components/productos/` existe pero no se detectaron archivos; el módulo productos depende de `data/productos.json` (no leído en detalle).
- **HUECO (relación inter-proyecto):** no hay documento que defina si firefighter.com.mx (directorio) y firefighter.mx (catálogo + directorio) son marcas separadas o un mismo negocio; el solapamiento del directorio no está gobernado.
- **Seguridad:** ✅ sin tokens/llaves expuestos. `.git/config` solo URL HTTPS pública; grep de `gho_/ghp_/sk-/api_key/SECRET` en `src` y configs → sin coincidencias.
