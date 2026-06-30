# 00 — Índice de la Biblioteca de Plantillas

> Propósito: catálogo copy-paste de los **layouts** (jerarquía `BaseLayout → PageLayout → tipo`) y las **plantillas de página** (home, categoría, producto, servicio, artículo, directorio) del Vault Maestro — la mejor versión real de cada plantilla del ecosistema OrigenLab (28 codebases auditados), limpiada, generalizada y schema-driven. Todo en Astro 6 SSG, CSS vanilla con `var(--token)`, props tipados con `interface`. **Contrato:** los layouts consumen `buildMeta()`/`buildSchema()` de `src/lib/seo.ts` y `SITE`/`CONTACT`/`waUrl()`/`TAXONOMY` de `src/config/site.ts`; las páginas referencian los componentes con `@components/*`. Para los componentes ver [[../09 - Biblioteca Componentes/00 - Inventario]]; para SEO ver [[../03 - SEO Master System/00 - Indice SEO]]; patrones y evidencia en [[../_PATRONES/patrones-canonicos]].

## Cómo usar esta biblioteca
1. Arranca un proyecto nuevo con el scaffold de `_scaffold/` (`astro.config.mjs`, `package.json`, `tsconfig.json`, `src/config/site.ts`, `src/content.config.ts`) y la estructura de [[_scaffold/estructura-carpetas]].
2. Copia los **layouts** de `_layouts/` a `src/layouts/` y los componentes de [[../09 - Biblioteca Componentes/00 - Inventario]] (`_src/`) a `src/components/`. Copia `_seo/seo.ts` a `src/lib/seo.ts`.
3. Copia la **plantilla de página** que toque (tabla de abajo) a `src/pages/...` y **reemplaza cada marcador `{{...}}`** con contenido real del cliente.
4. Mapea los alias en `tsconfig.json`: `@components/* → src/components/*`, `@layouts/* → src/layouts/*`.
5. Define los design tokens en **una sola** `src/styles/global.css` (`:root`) — nunca duplicar (C2). Los layouts/páginas usan `var(--token)`.
6. Rellena el contenido repetible en Content Collections (`src/content/{productos,servicios,articulos,zonas,casos}`), validado por `content.config.ts`. **Nada hardcodeado** en `.astro` (D1).

## Jerarquía de layouts (canónica — origen BOMBERO, A7)
```
BaseLayout.astro            ← raíz: <html>/<head>, buildMeta() (meta/OG/Twitter/canonical/robots), buildSchema() (JSON-LD)
└── PageLayout.astro        ← chrome: Header + Breadcrumbs + <main> + Footer + WhatsAppFloat
    ├── ProductLayout.astro  ← ficha de producto (L4) — schema Product
    ├── ServiceLayout.astro  ← ficha de servicio (L4) — schema Service, 10 bloques opcionales
    └── ArticleLayout.astro  ← artículo de blog — schema Article
```
- **2 niveles + tipo** (Base → Page → {Product,Service,Article}). Evita el "God-layout" de 24–40 props (anti-patrón GAMADEMEXICO/BOMBERO ProductoLayout) y los 3 layouts ~95% duplicados (anti-patrón EVENTECH Service/Zone/Event).
- El **breadcrumb JSON-LD se emite una sola vez** en `buildSchema()` (B3); el componente `Breadcrumbs` solo pinta microdata. PageLayout mapea las migas visibles `{label, href}` → `{name, path}` del schema.
- Las páginas de **home, categoría y directorio** usan `PageLayout` directamente (no necesitan un layout de tipo; su contenido es la página).

## Tabla de plantillas — cuál usar por arquetipo y nivel

| Plantilla (archivo) | Nivel | Layout que usa | Arquetipo(s) | Cuándo usarla | Origen canónico |
|---|---|---|---|---|---|
| `pagina-home.astro` | **L1** | PageLayout (`pageType="home"`) | A · B · C · D | Portada. Hero + categorías (desde `TAXONOMY`) + prueba social + CTA WhatsApp. | PROYECTORED (orquestador limpio) + D2 |
| `pagina-categoria.astro` | **L2** | PageLayout (`pageType="category"`) | A · B · C | Landing de una categoría/dominio: intro + grid de fichas + interlinking + FAQ. | PROYECTORED `CategoryLayout` |
| `pagina-producto.astro` | **L4** | **ProductLayout** | **A** (catálogo) | Ruta dinámica `productos/[...slug]`. Ficha de producto desde colección `productos`. | BOMBERO `productos/[...slug]` |
| `pagina-servicio.astro` | **L4** | **ServiceLayout** | **B · C** (servicios) | Ruta dinámica `servicios/[...slug]`. Ficha de servicio desde colección `servicios` (10 bloques opcionales). | CLINICADEBELLEZA `servicios/[...slug]` |
| `pagina-articulo.mdx` | blog | **ArticleLayout** | A · B · C · D | Entrada `.mdx` de la colección `articulos`. Blog SIEMPRE en colección (D3). | BOMBERO `BlogMdxLayout` + EVENTECH |
| `pagina-directorio-[...slug].astro` | **D** | PageLayout (`pageType="directory"`) | **D** (directorio) | Ruta dinámica multinivel `directorio/[...slug]` (región → zona → ficha) desde colección. | EVENTECH `directorio/[...slug]` (211 venues) |

### Layouts (en `_layouts/`)
| Layout | Extiende | Props clave | Schema que dispara |
|---|---|---|---|
| `_layouts/BaseLayout.astro` | — (raíz) | `title, description?, canonical?, image?, pageType?, schemaData?, noindex?` | `buildSchema(pageType, schemaData)` |
| `_layouts/PageLayout.astro` | BaseLayout | `…igual + breadcrumbs?` | añade `BreadcrumbList` (una vez) desde `breadcrumbs` |
| `_layouts/ProductLayout.astro` | PageLayout | `title, description, category, image?, price?, badge?, gallery?, specs?, faqs?, related?…` | `Product` + `Offer` + `FAQPage?` |
| `_layouts/ServiceLayout.astro` | PageLayout | `title, description, category` + 10 bloques opcionales (`protocolSteps, timeline, modalities, clinicalCases, myths, comparison…`) | `Service` + `FAQPage?` |
| `_layouts/ArticleLayout.astro` | PageLayout | `title, description, pubDate, updatedDate?, author?, image?, tags?, related?` | `Article` |

### Arquetipos (de [[../_PATRONES/patrones-canonicos]] D2)
- **A — Catálogo técnico** (producto): home + categorías + `pagina-producto` (ProductLayout). Schema Product+Offer. *(PROYECTORED, BOMBERO, MESECI)*
- **B — Renta/eventos**: home + categorías + `pagina-servicio` (ServiceLayout) + `pagina-directorio` (venues). Schema Service+OfferCatalog. *(EVENTECH, RENTADEILUMINACION, RESOIL)*
- **C — Servicio profesional local**: home + `pagina-servicio` + `pagina` de zonas. Schema LocalBusiness+Service+areaServed. *(CLINICADEBELLEZA, SEGURIDADPRIVADA, LGA)*
- **D — Contenido/Directorio**: home + `pagina-directorio-[...slug]` (multinivel) + blog. Schema ItemList/CollectionPage. *(EVENTECH directorio, INFLAPY, CDMXSITE)*

## Cómo rellenar las plantillas (marcadores `{{...}}`)
- **`{{...}}`** = hueco de contenido específico del cliente. Reemplázalo SIEMPRE; no dejes marcadores en producción.
- **Datos de negocio** (nombre, teléfono, WhatsApp, dirección, taxonomías): NO van en la plantilla → van en `src/config/site.ts` (SSoT). Las plantillas los importan (`SITE`, `CONTACT`, `TAXONOMY`, `waUrl()`).
- **Conversión** (D4): todo CTA usa `waUrl(WA_MESSAGES.<intención>)`. **Nunca** un `wa.me/<número>` hardcodeado.
- **SEO** (B): `title` sin marca (`buildMeta` añade el sufijo si cabe ≤60); `description` 140–160; `pageType` correcto por plantilla. El JSON-LD lo arma `buildSchema()` — no escribas `<script type="application/ld+json">` a mano.
- **CSS**: usa `var(--token)`; los `<style>` de las plantillas son solo estructura. Los design tokens viven en `global.css` (una sola fuente, C2).
- **Bloques opcionales (ServiceLayout)**: cada sección se pinta SOLO si su array trae datos. Una ficha mínima usa 3 bloques; una rica, los 10. Para usar los bloques editoriales (protocolSteps, timeline, modalities, clinicalCases, myths, comparison, treatmentZones, commitments, safetyProtocol, pre/postCare) **añádelos al schema `servicios`** en `content.config.ts` y descomenta el mapeo en `pagina-servicio.astro` (ServiceLayout ya los acepta).

## Contrato con `lib/seo.ts` y `config/site.ts` (no romper)
- **`buildMeta(input)`** → objeto plano para `<head>`. `input`: `{ title?, description?, canonical?, image?, type?, noindex?, publishedTime?, modifiedTime? }`. BaseLayout deriva OG/Twitter de los campos planos. Ver [[../03 - SEO Master System/00 - Indice SEO]].
- **`buildSchema(pageType, data)`** → `object[]` de JSON-LD. `pageType`: `'home' | 'category' | 'product' | 'service' | 'article' | 'directory' | 'faq'`. `data` por tipo: `product {name, description, path, images[], sku?, category?, price?}`, `service {name, description, path, serviceType?, image?}`, `article {title, description, path, datePublished, dateModified?, author?, section?}`, `list {name, description, path, items[], areaServed?}`, `faqs [{question, answer}]`, `breadcrumbs [{name, path}]`.
- **`SITE`** (de `config/site.ts`): `name, brand, domain, url, lang, description, defaultImage`. **`CONTACT`**: NAP + `geo` + `hours`. **`TAXONOMY`**: `categories, services, sectors, coverageStates`. Helpers `waUrl(msg?)`, `telUrl()`.
- **Regla dura B4**: cero datos estructurados fabricados. `buildSchema` no emite `aggregateRating`/`Review` sin reseñas reales (la prueba social de la home solo se pinta si hay testimonios verificables).

## Evidencia (código real extraído — Fase 1/2)
- **Layouts limpios Base→Page**: `BOMBERO/src/layouts/{BaseLayout,PageLayout}.astro` (raíz única, A7). Ver [[../_AUDITORIA/diagnostico-BOMBERO]].
- **Niveles L1–L5 + orquestador limpio + regla de oro CSS**: `PROYECTORED/src/layouts/CategoryLayout.astro`, `src/config/site.ts`. Ver [[../_AUDITORIA/diagnostico-PROYECTORED]].
- **ServiceLayout schema-driven (10 bloques Zod opcionales)**: `CLINICADEBELLEZA/src/layouts/ServiceLayout.astro` + `src/content.config.ts`. Ver [[../_AUDITORIA/diagnostico-CLINICADEBELLEZA]].
- **Directorio `[...slug]` multinivel desde colección**: `EVENTECH/src/pages/directorio/[...slug].astro` (211 venues, region→zona→ficha). Ver [[../_AUDITORIA/diagnostico-EVENTECH]] y [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]].
- **Síntesis de patrones**: [[../_PATRONES/patrones-canonicos]] (A7 layouts, B2/B3/B4 schema, C1/C2 CSS, D1/D2/D3/D4 contenido).

## ⚠️ Huecos
- ⚠️ **Backend de formularios (leads).** Ninguna plantilla incluye handler de envío de formulario: en todo el ecosistema la conversión es **WhatsApp-first** (`waUrl()`) y NO existe backend de captura de leads (n8n/Brevo/Worker) en ningún repo auditado (E5). Si el proyecto necesita formulario server-side, ese handler **está pendiente de implementación** y debe construirse aparte (Cloudflare Worker / Brevo / Formspree). Los CTAs de las plantillas apuntan a WhatsApp y `/contacto`.
- ⚠️ **Colección `directorio` (arquetipo D).** `pagina-directorio-[...slug].astro` requiere una colección `directorio` (entidades de terceros: salones/empresas) que NO está en el `content.config.ts` base (ese trae `zonas` para arquetipo C). El schema mínimo está documentado en la cabecera de la plantilla; añádelo si tu proyecto es tipo D.
- ⚠️ **Bloques ricos de ficha.** Los campos de ficha enriquecida (ServiceLayout: 10 bloques editoriales; ProductLayout: specs/applications/certifications/badge/features) no están en el `content.config.ts` base por defecto. Las plantillas los aceptan como props opcionales (no rompen si faltan) y documentan cómo añadirlos al schema cuando se necesiten.
