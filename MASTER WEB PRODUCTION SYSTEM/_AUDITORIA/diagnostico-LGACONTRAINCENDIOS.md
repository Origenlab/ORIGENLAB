# Diagnóstico — LGACONTRAINCENDIOS

> Propósito: Sitio de proveedor local de equipos contra incendios en Querétaro (lgacontraincendios.com) — venta de extintores, monitores, equipo bomberos, mangueras y señalización, con fuerte SEO local Querétaro + blog. Sin Tailwind: CSS vanilla con design system propio.

## Identidad
- **Negocio / dominio:** "LGA Contra Incendios" — `https://lgacontraincendios.com` (`astro.config.mjs` `SITE`, `src/config/site.ts`). Local de Santiago de Querétaro (Av. Constituyentes 120, CP 76030), +25 años, teléfono real `442 452 55 89`.
- **Tipo:** Proveedor/distribuidor local con servicios (venta + recarga + mantenimiento + asesoría + instalación + capacitación). Conversión por WhatsApp/contacto. Sin carrito.
- **ARQUETIPO tentativo:** **C (servicio profesional local)** con fuerte componente A (catálogo). Justificación: identidad geográfica explícita (Querétaro en title/geo/schema), `SERVICES` y `PROCESO` de trabajo definidos (`config/site.ts`), `LocalBusiness`+`Store` con dirección/geo/horarios reales, blog hiper-local (artículos por colonia: "...centro-historico-queretaro", "...juriquilla-zibata-queretaro"). El catálogo de producto es el vehículo, pero el negocio es servicio local. Evidencia: `src/layouts/BaseLayout.astro` (LocalBusiness), `src/content/blog/venta-equipos-*-queretaro.md`, `src/config/site.ts` (SERVICES/PROCESO/SECTORES).
- **Estado:** **vivo, datos reales** (contacto verificable, no placeholders — contrasta con FFSMX/MONITORES). Git activo (commit 09-jun). 39 posts. Pero con deuda técnica de rutas (ver ❌). Es el sitio "ancla" comercial del cluster contra incendios.

## Stack
- **Astro:** `^6.1.1` (`package.json`) — **el más nuevo del cluster** (Astro 6). `output: 'static'` explícito. `engines.node >=22.12.0`.
- **Integrations:** **solo `@astrojs/sitemap ^3.2.1`** (con `serialize` por niveles + `filter` que excluye aviso-privacidad/gracias/mapa). `@astrojs/check` para type-check.
- **CSS framework / tokens:** **NINGÚN framework — CSS vanilla** (confirmado: sin tailwind/postcss en `package.json` ni configs). Design system propio en `src/styles/global.css` + `src/styles/components.css` (importado). Tokens CSS-vars exhaustivos: marca navy `--color-navy:#03223f`, acento fuego `--color-fire:#E84A2F`, neutros gray-50..900, semánticos (`--bg-hero`, `--accent`, `--border`), alias `--c-*` (primary/accent/ink/surface) para Header/TopBar/Footer, escalas `--text-*`/`--sp-*`/`--weight-*`/`--topbar-height`. Comentario: "Inspirado en arquitectura de ProyectoRed / MESECI". Fuente: Inter (Google Fonts CDN, preload no bloqueante).
- **Adapter / output:** estático. `vite.cacheDir: '/tmp/vite-cache'`. `optionalDependencies: @rollup/rollup-linux-arm64-gnu` (fix de CI Linux ARM).
- **Deploy detectado:** **GitHub Pages** (`.github/workflows/deploy.yml`, Node 22, upload-pages-artifact@v3) + **dominio custom** (`public/CNAME` presente). Repo `github.com/Origenlab/LGACONTRAINCENDIOS.git`.

## Estructura de carpetas (resumen)
```
src/
  components/{global,sections}/   (sin ui/ — 67 componentes en sections/)
  config/site.ts                  (SSOT: SITE, CONTACT, WA_MESSAGES, PRODUCT_CATEGORIES,
                                   SERVICES, NORMATIVAS, SECTORES, PROCESO + helpers)
  content/{blog(39), productos(1)} + content.config.ts
  layouts/BaseLayout.astro        (único layout)
  pages/{index, blog/[slug]+[...page], catalogo/, productos/,
         + 5 hubs de categoría (carpeta/index.astro): extintores-certificados,
           monitores-contra-incendios, equipo-para-bomberos,
           mangueras-contra-incendios, senalizacion,
         + extintores-clase-a/, contacto/, nosotros/, servicios/,
           aviso-de-privacidad/, mapa-del-sitio/}
  styles/{global.css, components.css}
public/ (CNAME, imagenes/) — ⚠️ sin robots.txt ni /og
```
Raíz con muchos artefactos de investigación/contenido (`.docx`, `AQUEON_Articulo_*.md`, `estudio-sitio-lga-para-astro.md`, `descargar_imagenes.py`, `graphify-out/`).

## Layouts — jerarquía
- **`BaseLayout.astro`** (único, todas las páginas) — props `title, description (def SITE.description), canonical, ogImage (def /og/lga-og-default.jpg), noindex, schema (object|object[])`. Inyecta en `<head>` directamente (sin componente SEO separado): title idempotente, description, canonical, geo tags Querétaro (`geo:region MX-QUE`, `ICBM`), robots, OG, Twitter, favicons, fuentes. **JSON-LD global hardcodeado en el layout:** `LocalBusiness`+`Store` (dirección Av. Constituyentes 120, geo 20.5888/-100.3899, horarios L-V/Sáb, areaServed City/State/Country) + `WebSite`+`SearchAction` (→ `/blog/?q=`). Schema adicional por prop. `<body>`: `TopBar`, `Header`, `<main>`, `Footer`, `WhatsAppButton`. lang `es-MX`.
- **No hay sub-layouts** (ni de blog ni de producto): cada página compone secciones directamente sobre BaseLayout.

## Componentes — inventario (67 en sections/ — patrón "1 sección = 1 componente")
| Componente | Ruta | Props | Dónde se usa |
|---|---|---|---|
| Header / Footer / TopBar / BreadcrumbBar / WhatsAppButton | src/components/global/*.astro | — / items | BaseLayout + páginas |
| HeroIndex, StatsBarIndex, CategoriasIndex, FeaturesIndex, NosotrosPreview, ProcesoIndex, NormasIndex, ReviewsIndex, BlogPreviewIndex, FaqIndex, CTAFinalIndex | src/components/sections/*Index.astro | — (leen config/site) | `pages/index.astro` |
| Hero{Extintores,Monitores,Bomberos,Mangueras,Senalizacion,Productos,Catalogo,Contacto,Nosotros,Blog,Articulo} | src/components/sections/Hero*.astro | — | hubs de categoría respectivos |
| {Beneficios,Faq,Proceso,Productos*Grid,Subcategorias,Tabla}{Extintores,Monitores,Bomberos,Mangueras,Senalizacion} | src/components/sections/*.astro | — | hubs de categoría (1 set por categoría) |
| GridCatalogo, HeroCatalogo, SolicitudCatalogo, CatalogoComplemento | src/components/sections/*.astro | — | /catalogo |
| ArticleBlog, GridBlog, HeroBlog, HeroArticulo | src/components/sections/*.astro | post(s) | blog |
| FormularioContacto, MapaContacto, ContactoContenido | src/components/sections/*.astro | — | /contacto |
| Historia/Mision/Cifras/Reviews Nosotros | src/components/sections/*Nosotros.astro | — | /nosotros |

**Sin carpeta `ui/`** → no hay componentes atómicos (Button/Card/Badge); el estilo se aplica con clases CSS de `components.css` (`.section-header`, etc.). Patrón = **secciones específicas por página** (mucha duplicación entre categorías: hay Beneficios/Faq/Proceso/Tabla por cada una de las 5 categorías).

## Content Collections / esquemas / taxonomías
`src/content.config.ts` (**Content Layer API**, glob loader — Astro 5+). 2 colecciones (campos español):
- **`productos`** (1 archivo): `title, categoria (enum: extintores/monitores/equipo-bomberos/mangueras/senalizacion), subcategoria?, descripcionCorta (≤200), descripcionSeo (≤200), marca?, normativas[], sectores[], modelos[{nombre,descripcion,capacidad?}], faqs[{pregunta,respuesta}], imagen?, ogImage?, publicado, orden?`. Frontmatter real (`extintores-clase-a.md`) incluye campo `slug` (no en schema) y 4 modelos.
- **`blog`** (39): `title, categoria, fecha (coerce.date), descripcionSeo (≤200), imagenPortada?, ogImage?, autor (def "LGA Contra Incendios"), tags[], publicado, destacado`.
- **Catálogo / negocio en `src/config/site.ts`** (SSOT, no colección): `PRODUCT_CATEGORIES` (5 categorías con `subcategorias[]` y `href`), `SERVICES` (6), `NORMATIVAS` (8), `SECTORES` (8), `PROCESO` (4 pasos), `WA_MESSAGES` (10 mensajes por contexto).
- **Rutas dinámicas:** `blog/[slug]` (params = id sin `.md`, related por categoría top-3), `blog/[...page]` (paginación). **La colección `productos` NO está conectada a una ruta dinámica** — las 5 categorías son carpetas estáticas `*/index.astro` y solo existe 1 subcategoría como página (`extintores-clase-a/index.astro`).

## SEO real
- **Metas:** en BaseLayout (sin componente SEO). Title idempotente `{title} | LGA Contra Incendios`, canonical, **geo local Querétaro** (region MX-QUE, placename, ICBM coords), robots con max-snippet/image-preview, OG + Twitter completos.
- **Schema JSON-LD:** **`LocalBusiness`+`Store`** global (con geo, horarios, areaServed multi-nivel) — el más fuerte para SEO local del cluster — + `WebSite`+`SearchAction`, ambos en `BaseLayout.astro`. Páginas añaden schema por prop (homepage añade `FAQPage`). Productos definen `faqs[]` (insumo para FAQPage de categoría).
- **Patrón de URLs:** **trailing slash** (`/extintores-certificados/`, `/blog/[slug]/`). 5 hubs L2 + subcategorías L3 planas. `serialize` sitemap: Home 1.0, L2 hubs 0.9, L3 0.8, blog 0.6.
- **Internal linking:** `CategoriasIndex`/`NavPrefooter`-equivalente, related blog por categoría, `PRODUCT_CATEGORIES.subcategorias[].href` (menú) — **pero muchos href apuntan a páginas inexistentes** (ver ❌).
- **Sitemap / robots:** sitemap ✅ con serialize. **robots.txt ❌ AUSENTE** (`public/` solo tiene CNAME e imagenes) — único del cluster sin robots.

## Sistema de diseño
- **Tokens:** CSS-vars vanilla en `global.css` (navy `#03223f` + fire `#E84A2F` + grises + semánticos + alias `--c-*` + escalas tipográficas/espaciado). `components.css` define clases compartidas (`.section-header`, `__eyebrow`, tarjetas, tablas, FAQ base) con BEM-like. **Arquitectura más limpia y portable del cluster por no depender de Tailwind.**
- **UI base:** clases CSS reutilizables (no componentes atómicos). Patrón "sección con `<style scoped>`".
- **Hero/cards/CTA/WhatsApp/breadcrumbs:** Hero por página (11 variantes), CTAFinalIndex, **WhatsAppButton flotante** + `WA_MESSAGES`/`waUrl()` por contexto, `BreadcrumbBar` (`global/`).

## Convenciones de nombres/archivos
- Componentes **PascalCase** con **sufijo de contexto**: `*Index` (homepage), `*Extintores`/`*Monitores`/etc. (por categoría), `*Nosotros`, `*Blog`. → nombres muy específicos, baja reutilización.
- Config centralizada en `src/config/site.ts` (no `src/data/`) — SSOT con `as const` + helpers (`waUrl`, `phoneUrl`).
- Contenido y campos **en español** (`titulo`→`title` mixto; `descripcionSeo`, `categoria`, `fecha`).
- Rutas en **kebab-case con trailing slash**, hubs como carpeta+`index.astro`.
- Estilos en 2 archivos globales (no CSS-modules ni scoped-only).

## Flujos / procesos (implícitos)
- **Método LGA (explícito):** `PROCESO` 4 pasos (Diagnóstico → Propuesta → Suministro → Mantenimiento) renderizado en `ProcesoIndex` y por categoría.
- **Solicitud de catálogo:** `SolicitudCatalogo`/`pages/catalogo/` → lead.
- **Cotización:** `FormularioContacto` + `WhatsAppButton`/`waUrl(WA_MESSAGES.x)` por categoría.
- **Servicios recurrentes:** recarga/mantenimiento de extintores (modelo de ingreso recurrente, en `SERVICES`).
- **Publicación blog SEO-local:** artículos por colonia/parque industrial de Querétaro (estrategia long-tail geográfica).

## Integraciones
- **GitHub Actions:** ✅ `.github/workflows/deploy.yml` (GitHub Pages + CNAME dominio propio).
- **Cloudflare:** ⚠️ HUECO — sin wrangler. Deploy GitHub Pages.
- **n8n / fal.ai / Brevo:** ⚠️ HUECO — sin evidencia. `FormularioContacto` no muestra endpoint backend (probable mailto/WhatsApp). Sin `.env`.
- **Otros:** `graphify-out/` y `descargar_imagenes.py` = herramientas de generación de imágenes/grafos (fuera del runtime). Artefactos AQUEON en raíz sugieren que LGA fue base de contenido para MONITORES (marca AQUEON).

## Clasificación

### ✅ Funciona
- SEO local Querétaro de primer nivel: `LocalBusiness`+`Store` con geo/horarios/areaServed reales (global en `BaseLayout.astro`) + blog long-tail por colonia — la mejor estrategia de SEO local del cluster.
- Design system CSS vanilla portable y completo (`global.css` + `components.css`) sin dependencia de framework — `src/styles/`.
- SSOT de negocio muy completa en `src/config/site.ts` (categorías, servicios, normativas, sectores, proceso, WA messages) con helpers tipados.
- Datos de contacto reales y consistentes (tel `442 452 55 89`, dirección verificable) — `src/config/site.ts` (contrasta con placeholders de FFSMX/MONITORES).

### ❌ Falla
- **Enlaces internos rotos masivos:** `PRODUCT_CATEGORIES.subcategorias[].href` apunta a ~24 rutas que NO existen como páginas (solo existe `extintores-clase-a/`): faltan clase-b/c/k, todas las subcategorías de monitores/mangueras/equipo-bomberos/señalización — `src/config/site.ts` líneas 78–148 vs `src/pages/` (solo 14 carpetas). 404s y autoridad SEO desperdiciada.
- **robots.txt ausente** — `public/` no lo incluye (único del cluster sin él); el sitemap existe pero no se referencia desde robots.
- **Colección `productos` infrautilizada:** 1 solo archivo, no conectada a ruta dinámica `[slug]`; el campo `slug` del frontmatter no está en el schema Zod → datos huérfanos. Las páginas de categoría son estáticas y no consumen la colección — `src/content.config.ts` vs `src/pages/`.

### 🤖 Automatizable
- Generación de las páginas L3 de subcategoría/producto faltantes: dado que `productos` ya tiene schema (modelos, faqs, normativas, sectores) y las categorías están en SSOT, una **ruta dinámica `[categoria]/[subcategoria]` + poblado de la colección** generaría las ~24 páginas faltantes automáticamente (resuelve el ❌ de enlaces rotos).

### 📐 Estandarizable
- El design system CSS vanilla (`global.css`+`components.css`, tokens `--c-*`/`--sp-*`/`--text-*`) y el patrón "config/site.ts como SSOT + sección por componente" son el modelo más limpio para sitios **sin Tailwind**; comparte linaje declarado con ProyectoRed/MESECI → candidato a plantilla canónica para el arquetipo C local.

## ⚠️ HUECOS
- **HUECO (rutas declaradas vs existentes):** ~24 subcategorías referenciadas en `site.ts` sin página. Decidir: generar páginas o limpiar los `href`. Bloquea navegación y SEO.
- **HUECO (robots.txt):** falta crear `public/robots.txt` apuntando al sitemap-index.
- **HUECO (formulario backend):** `FormularioContacto` sin endpoint confirmado; no se sabe a dónde llegan los leads (¿correo, WhatsApp, n8n?).
- **HUECO (colección productos):** indeterminado si se planeaba migrar las 5 categorías a contenido dinámico; hoy es 1 archivo huérfano.
- **HUECO (artefactos AQUEON en raíz):** archivos `AQUEON_Articulo_*.md` y blog cards en la raíz de LGA — relación de contenido con MONITORES (AQUEON) sin documentar; posible mezcla de proyectos.
- **Seguridad:** ✅ sin secretos expuestos. `.git/config` solo URL HTTPS pública; grep `gho_/ghp_/sk-/api_key/SECRET` en `src` → sin coincidencias. (Hay `_writetest.txt` vacío en raíz — residuo de prueba, sin riesgo.)
