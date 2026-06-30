# 01 — Tipos de Página

> Propósito: la anatomía canónica de cada tipo de página — colección, plantilla, schema y secciones — para que cualquier página del Vault se arme igual y emita el JSON-LD correcto.

Cada tipo cita la **colección** que lo alimenta ([[08 - Biblioteca Plantillas/_scaffold/content.config.ts|content.config.ts]]), la **plantilla** que lo pinta ([[08 - Biblioteca Plantillas/00 - Indice de Plantillas|Plantillas]]), el **`pageType`** que pasa a `buildSchema()` ([[08 - Biblioteca Plantillas/_seo/seo.ts|seo.ts]]) y su **estructura de secciones**. El modelo de niveles es el rector L1→L4/L5 (canónico **A6**, origen PROYECTORED): Home (L1) → Categoría (L2) → Subcategoría (L3) → Ficha producto/servicio (L4) → variante (L5).

## Tabla maestra

| Tipo | Nivel | Colección | Plantilla / Layout | `pageType` (schema) | SOP |
|---|---|---|---|---|---|
| Home | L1 | — (orquesta `TAXONOMY`) | `pagina-home.astro` · PageLayout | `home` → Organization+WebSite+LocalBusiness | [[SOP 01 - Crear sitio nuevo]] |
| Categoría | L2 | filtra `productos`/`servicios` por `category` | `pagina-categoria.astro` · PageLayout | `category` → CollectionPage+ItemList | [[SOP 02 - Crear una categoria]] |
| Subcategoría | L3 | filtra colección por `category` (+ capa de datos) | `pagina-categoria.astro` · PageLayout | `category` → CollectionPage+ItemList | [[SOP 02 - Crear una categoria]] |
| Producto | L4 | `productos` | `pagina-producto.astro` · **ProductLayout** | `product` → Product+Offer (+FAQPage?) | [[SOP 03 - Crear producto o servicio]] |
| Servicio | L4 | `servicios` | `pagina-servicio.astro` · **ServiceLayout** | `service` → Service (+FAQPage?) | [[SOP 03 - Crear producto o servicio]] |
| Artículo blog | — | `articulos` (`.mdx`) | `pagina-articulo.mdx` · **ArticleLayout** | `article` → Article/BlogPosting | [[SOP 04 - Crear articulo SEO]] |
| Directorio / Zona | D / C | `zonas` (C) · `directorio` (D, ver hueco) | `pagina-directorio-[...slug].astro` · PageLayout | `directory` → CollectionPage+ItemList | [[03 - Directorios y Paginas Locales]] |
| Landing de conversión | — | — (página suelta) | PageLayout (`pageType="service"` o `"home"`) | según oferta | [[SOP 05 - Crear landing de conversion]] |
| FAQ | bloque | inline o `faqs` del frontmatter | `FAQAccordion` (componente) | `faq` → FAQPage (**una vez**) | [[04 - FAQs y Casos de Exito]] |
| Caso de éxito | — | `casos` | bloque de prueba social + página opcional | sin schema fabricado (B4) | [[04 - FAQs y Casos de Exito]] |

A continuación, cada tipo en detalle.

---

## 1. Home (L1)

- **Qué es:** la portada. Comunica negocio + propuesta de valor, ramifica a las categorías y empuja la conversión. Es un **orquestador**, no un contenedor de datos sueltos (origen PROYECTORED, "orquestador limpio").
- **Colección / plantilla:** no consume una colección directa; lee `TAXONOMY` de [[site.ts]] para pintar el grid de categorías. Plantilla `pagina-home.astro` con `PageLayout` (`pageType="home"`).
- **Schema (seo.ts):** `pageType="home"` emite el **grafo base** consolidado por `@id` — `orgSchema()` + `websiteSchema()` (+ SearchAction si `SITE.searchUrl`) + `localBusinessSchema()` si hay sede (`seo.ts:601-615`). La home no añade más nodos; el grafo base ya la cubre.
- **Secciones canónicas (D2):** Hero (con `waUrl()` primario) → grid de categorías desde `TAXONOMY` → prueba social honesta (testimonios/casos verificables, B4) → CTA WhatsApp. Patrón verificado en GAMADEMEXICO (`index.astro` hero + 6 CategoryCard + FAQ + LeadCapture) — ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].

## 2. Categoría (L2)

- **Qué es:** la landing de un dominio del catálogo (ej. "Monitores", "Mobiliario", "Tratamientos faciales"). Presenta la categoría y ramifica a subcategorías o fichas.
- **Colección / plantilla:** filtra `productos` o `servicios` por su `category` (enum cerrado de `content.config.ts`). Plantilla `pagina-categoria.astro` con `PageLayout` (`pageType="category"`). Origen canónico: PROYECTORED `CategoryLayout`.
- **Schema (seo.ts):** `pageType="category"` → `directorySchema()` = `CollectionPage` + `ItemList` con cada ficha como `ListItem` (`seo.ts:508-532`). El `BreadcrumbList` lo emite `buildSchema()` una sola vez (B3).
- **Secciones canónicas (D2):** intro editorial → grid de subcategorías/productos (cards) → interlinking (`RelatedLinks`) → FAQ de la categoría. Verificado en GAMADEMEXICO (`[seccion]/[subcategoria].astro` con `SubcategoryProductCard` + `ProductSidebar` + `Faq`).

## 3. Subcategoría (L3)

- **Qué es:** el nivel intermedio entre categoría y ficha cuando el catálogo es profundo (ej. "Boquillas → Boquillas de chorro fijo"). Misma naturaleza que L2 pero más específica.
- **Colección / plantilla:** filtra la colección por `category` + una capa de datos tipada para la taxonomía fina. Misma plantilla `pagina-categoria.astro` / `PageLayout` (`pageType="category"`). **Patrón de oro:** GAMADEMEXICO movió 33 subcategorías a `src/data/subcategorias/` (JSON tipado `SubcategoryDef` + guardas de integridad en build), eliminando ~8,500 líneas duplicadas de 33 `.astro` (canónico **A5**). En el Vault esa taxonomía vive en `TAXONOMY` de [[site.ts]] o en la propia colección — nunca como páginas estáticas duplicadas.
- **Schema (seo.ts):** igual que L2 — `directorySchema()` (`CollectionPage`+`ItemList`).
- **Secciones canónicas:** intro de subcategoría → grid de fichas → sidebar de navegación (marcas/aplicaciones/relacionados) → FAQ específica. Ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]] (sección "Patrón página dinámica alimentada por capa de datos").

## 4. Producto (L4) — arquetipo A

- **Qué es:** la ficha de un producto del catálogo técnico. No hay carrito: la conversión es cotización por WhatsApp (D4).
- **Colección / plantilla:** colección **`productos`** (`content.config.ts:95-117`): `title` 10-110, `description` 70-280, `category` enum cerrado, `image` obligatoria `^/images/`, `price` string libre opcional ("Desde $X"/"Cotizar", **no** `number` forzado), `sku?`, `brand?`, `gallery?`, `relatedProducts`/`relatedServices` por `reference()`, `faqs`, `featured`, `order`. Ruta dinámica `productos/[...slug]`. Plantilla `pagina-producto.astro` con **ProductLayout**. Origen: BOMBERO `productos/[...slug]`.
- **Schema (seo.ts):** `pageType="product"` → `productSchema()` = `Product` + `Offer` (`seo.ts:369-407`). Honesto: si no hay `price`, emite Offer "bajo cotización" (`UnitPriceSpecification`), patrón WhatsApp-first. **`aggregateRating`/`Review` solo si `emitReviews()` valida reseñas reales** (B4). `+ FAQPage` si la ficha trae `faqs` visibles.
- **Secciones canónicas:** breadcrumb → hero de producto (imagen/galería + meta) → descripción → specs/aplicaciones/certificaciones (props opcionales) → FAQ → productos relacionados (cross-sell por `reference()` o categoría) → CTA cotizar. Verificado en GAMADEMEXICO (`productos/[...slug].astro` con `RelatedProductsGrid` + `Faq` + `CotizacionForm`).

## 5. Servicio (L4) — arquetipos B y C

- **Qué es:** la ficha de un servicio (renta para eventos, o servicio profesional local). Conversión por WhatsApp/cotización.
- **Colección / plantilla:** colección **`servicios`** (`content.config.ts:121-150`): `title`, `description`, `category` enum, `image`, `pricing` opcional (`{min,max,unit,note}` — `unit` enum `pieza|set|evento|hora|dia|mes|servicio`), `includes[]`, `isHub` (hub vs servicio individual), `relatedServices`/`relatedProducts`, `hero` (heroSchema reutilizable), `faqs`. Ruta dinámica `servicios/[...slug]`. Plantilla `pagina-servicio.astro` con **ServiceLayout**. Origen: CLINICADEBELLEZA `servicios/[...slug]`.
- **Bloques editoriales opcionales (lo que hace única la ficha):** ServiceLayout acepta hasta **10 bloques opcionales** que se pintan solo si traen datos — `protocolSteps`, `timeline`, `preCare`/`postCare`, `comparison`, `modalities`, `clinicalCases`, `treatmentZones`, `myths`, `commitments`, `safetyProtocol`. Origen CLINICADEBELLEZA (`tratamiento-capilar.md` usa los 10; `limpieza-facial-profunda.md` solo 3). Para usarlos hay que añadirlos al schema `servicios` en `content.config.ts` y descomentar su mapeo en la plantilla (ver [[08 - Biblioteca Plantillas/00 - Indice de Plantillas]] §"Cómo rellenar").
- **Schema (seo.ts):** `pageType="service"` → `serviceSchema()` = `Service` con `provider→#localbusiness`, `areaServed` (ciudades), `availableChannel` (tel), `offers` si hay `pricing` (`seo.ts:421-452`). `+ FAQPage` si hay `faqs`. Reseñas: misma regla B4.
- **Secciones canónicas:** breadcrumb → hero 2-col → TOC (sticky en fichas ricas) → resumen/cuerpo + sidebar de interlinking → bloques opcionales presentes → FAQ → categorías relacionadas → CTA WhatsApp. Verificado en CLINICADEBELLEZA (`ServiceLayout.astro`: hero, HeroNavBar de siblings, sticky TOC scroll-spy, sidebar de 6 widgets, secciones condicionales).

## 6. Artículo de blog

- **Qué es:** entrada editorial SEO (guía, comparativa, informacional) que capta tráfico de descubrimiento y enlaza al catálogo. Detalle completo en [[02 - Blog y Articulos SEO]].
- **Colección / plantilla:** colección **`articulos`** en `.mdx` (**regla D3** — nunca `.astro` sueltos). Frontmatter tipado en `content.config.ts:156-178`: `title` ≤70, `description` ≤160, `category` enum cerrado (evita "Guias"/"Guías" de INFLAPY), `heroImage` obligatoria, `pubDate`/`updatedDate`, `author`, `tags` ≤10, `relatedProducts`/`relatedServices`/`relatedPosts` por `reference()`, `faqs`. Plantilla `pagina-articulo.mdx` con **ArticleLayout**. Requiere `@astrojs/mdx`.
- **Schema (seo.ts):** `pageType="article"` → `articleSchema()` = `Article`/`BlogPosting` con `author`, `publisher→#organization`, `isPartOf→#website`, `datePublished`/`dateModified` (`seo.ts:467-486`).
- **Secciones canónicas:** breadcrumb → hero (imagen + meta) → cuerpo `.mdx` (con componentes de contenido) → FAQ condicional → artículos/servicios relacionados → CTA. Origen GAMADEMEXICO (`TEMPLATE-ARTICULO-BLOG.md`, `TechArticle`) + MEDEDUL (identidad por categoría).

## 7. Directorio / Zona

- **Qué es:** páginas hyper-local (una por zona/alcaldía/municipio, arquetipo C) o fichas de un directorio de terceros (arquetipo D). Detalle completo en [[03 - Directorios y Paginas Locales]].
- **Colección / plantilla:** colección **`zonas`** (C: `zoneName`, `type` enum `ciudad|estado|alcaldia|municipio|zona`, `geo`, `colonias`, `delivery`, `availableServices`/`nearbyZones` por `reference()`, `content.config.ts:183-217`) o **`directorio`** (D, ver hueco al pie). Ruta dinámica `[...slug]` multinivel. Plantilla `pagina-directorio-[...slug].astro` con `PageLayout` (`pageType="directory"`). Origen: EVENTECH `directorio/[...slug]` (211 venues, región→zona→ficha).
- **Schema (seo.ts):** `pageType="directory"` → `directorySchema()` (`CollectionPage`+`ItemList`). En páginas de zona se puede pasar `areaServed` como override de `localBusinessSchema` (`seo.ts:599,607`).
- **Secciones canónicas:** breadcrumb → hero de zona → contenido único hiperlocal (tiempo de entrega, vialidades, colonias — INFLAPY `InfoLocal`) → servicios disponibles → zonas cercanas → FAQ local → CTA. Verificado en INFLAPY/RENTADEILUMINACION.

## 8. Landing de conversión

- **Qué es:** página de aterrizaje enfocada en una oferta/intención concreta (campaña, evento, promoción). No es catálogo ni blog: es persuasión + conversión.
- **Colección / plantilla:** suele ser una **página suelta** (no necesariamente colección) con `PageLayout`; `pageType` según la oferta (`"service"` si promociona un servicio, `"home"` si es genérica). SOP dedicado: [[SOP 05 - Crear landing de conversion]].
- **Schema (seo.ts):** el grafo base + el nodo del tipo que corresponda (Service si vende un servicio). Sin reseñas fabricadas (B4).
- **Secciones canónicas:** hero con propuesta de valor única → beneficios/prueba (casos verificables) → oferta clara → FAQ que resuelve objeciones → CTA WhatsApp dominante (D4). La conversión es **WhatsApp-first**: no hay backend de formulario en el ecosistema (E5 — ver [[06 - Automatizaciones/00 - Indice]]).

## 9. FAQ

- **Qué es:** bloque de preguntas frecuentes, reutilizable en cualquier tipo de página (home, categoría, producto, servicio, zona). Detalle en [[04 - FAQs y Casos de Exito]].
- **Colección / plantilla:** las preguntas viven en el campo `faqs` del frontmatter (`faqSchema` reutilizable de `content.config.ts:40-47`) o inline en la página. Se pintan con el componente **`FAQAccordion`** (ver [[09 - Biblioteca Componentes/00 - Inventario]]).
- **Schema (seo.ts):** `faqSchema()` = `FAQPage` (`seo.ts:491-500`). **Regla dura:** se emite **una sola vez por página** y **solo si las preguntas son visibles** en el DOM. `buildSchema()` lo añade vía `data.faqs` (`seo.ts:633-634`); el componente visual **no** debe emitir su propio JSON-LD.
- **Estructura:** acordeón (`<details>`/`<summary>`) accesible; las FAQs pueden generarse por categoría/giro de forma honesta (GAMADEMEXICO genera FAQ por categoría de producto sin inventar datos).

## 10. Caso de éxito

- **Qué es:** prueba social honesta — un cliente real, su testimonio textual y, si existe y es verificable, su resultado. **No** son reseñas fabricadas. Detalle en [[04 - FAQs y Casos de Exito]].
- **Colección / plantilla:** colección **`casos`** (`content.config.ts:223-245`): `clientName`, `clientRole?`, `clientCompany?`, `quote` (testimonio textual real), `summary?`, `image`, `rating?` (**solo si es real y verificable**), `relatedServices`/`relatedProducts`, `approved` (gate editorial). Se muestran como bloque en home/categoría o como página propia.
- **Schema (seo.ts):** **sin `aggregateRating` fabricado** (B4). El `rating` por caso es dato real que se muestra en página; **no** se agrega a un `AggregateRating` global inventado. `emitReviews()` devuelve vacío salvo reseñas reales de terceros (`seo.ts:546-568`).
- **Estructura:** foto + nombre/rol/empresa → testimonio textual → resultado/resumen → enlace al servicio/producto relacionado. Origen del modelo honesto: EVENTECH (REVIEWS B2B de aliados con dominio real), SEGURIDADPRIVADA (colección de testimonios con gate `approved`).

---

## Reglas transversales

- **Niveles (A6):** respeta L1→L4/L5; la URL refleja la jerarquía (`/categoria/subcategoria/producto/`).
- **Schema (B2/B3):** un nodo por tipo de página seleccionado por `pageType`; el `BreadcrumbList` **una sola vez** (anti-patrón BOMBERO/RENTADEILUMINACION: breadcrumb duplicado en layout + componente).
- **Cero fabricado (B4):** ningún tipo emite ratings/reseñas inventados.
- **Conversión (D4):** todo CTA = `waUrl(WA_MESSAGES.<intención>)`.

Ver el JSON-LD por tipo en [[03 - SEO Master System/02 - Schema JSON-LD por tipo]] y las plantillas en [[08 - Biblioteca Plantillas/00 - Indice de Plantillas]].
