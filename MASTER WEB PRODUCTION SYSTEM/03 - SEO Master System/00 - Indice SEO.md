# 00 — Índice SEO Master System
> Propósito: punto de entrada al sistema SEO copy-paste del Vault — qué documento usar para cada decisión (técnica, schema, on-page, internal linking) y dónde vive el código canónico.

El SEO de la Fábrica de Sitios se gobierna desde **un solo lugar**: `src/lib/seo.ts` (metadatos + JSON-LD) alimentado por `src/config/site.ts` (NAP y taxonomías). Todo lo demás (robots, sitemap, CDN, internal linking) son convenciones que estos documentos fijan.

## Documentos
1. [[01 - SEO Tecnico]] — sitemap, robots.txt, canonical, `trailingSlash`, hreflang, Core Web Vitals, CDN post-build.
2. [[02 - Schema JSON-LD por tipo]] — qué schema emitir por arquetipo A/B/C/D, grafo `@id`, y la **regla cero-fabricado** (sin `aggregateRating` inventado).
3. [[03 - On-page y Metadatos]] — `title`/`description`/OG/Twitter, reglas de longitud y la marca-al-final.
4. [[04 - Internal Linking y URLs]] — taxonomías L1–L5, breadcrumbs (emitidos una vez), `RelatedLinks` data-driven.

## Código canónico (copy-paste)
| Artefacto | Ruta destino en proyecto | Plantilla en Vault | Origen real |
|---|---|---|---|
| Librería SEO | `src/lib/seo.ts` | [[../08 - Biblioteca Plantillas/_seo/seo.ts]] | PODIUMEX `data/schema.ts` + EVENTECH `utils/seo.ts` + BOMBERO `utils/seo.ts` |
| Robots | `public/robots.txt` | [[../08 - Biblioteca Plantillas/_seo/robots.txt]] | BOMBERO + EVENTECH + INFLAPY/PROYECTORED |
| CDN post-build | `scripts/rewrite-cdn.mjs` | [[../08 - Biblioteca Plantillas/_seo/rewrite-cdn.mjs]] | RENTADEILUMINACION `scripts/rewrite-cdn.mjs` + BOMBERO `utils/cdn.ts` |

## Contrato de `src/lib/seo.ts` (resumen)
- `buildMeta({ title, description, canonical?, image?, type?, noindex? })` → objeto para `<head>` (title único keyword-first, description ≤160, canonical/imagen absolutas, OG, Twitter, robots).
- `buildSchema(pageType, data)` → `object[]` de JSON-LD. `pageType`: `'home' | 'category' | 'product' | 'service' | 'article' | 'directory' | 'faq'`.
- Helpers `@id`-linkados: `orgSchema()`, `localBusinessSchema()`, `websiteSchema()` (+SearchAction), `breadcrumbSchema(items)`, `productSchema(p)`, `serviceSchema(s)`, `articleSchema(a)`, `faqSchema(items)`, `directorySchema(...)`.
- Consume `SITE` y `CONTACT` desde `../config/site.ts` (SSoT — origen PROYECTORED, forma EVENTECH).

## Reglas duras (no negociables)
- **Cero datos estructurados fabricados.** Sin reseñas reales verificables, NUNCA se emite `aggregateRating`/`Review`. Detalle en [[02 - Schema JSON-LD por tipo]]. (Patrón B4; modelo PODIUMEX/EVENTECH.)
- **Breadcrumb una sola vez.** El JSON-LD de `BreadcrumbList` se emite en `buildSchema()`, nunca también en el componente `<Breadcrumb>` visual. (Patrón B3; anti-patrón confirmado en BOMBERO y RENTADEILUMINACION.)
- **NAP en un solo sitio.** Nombre/dirección/teléfono viven en `src/config/site.ts`. `seo.ts` no hardcodea datos de negocio.
- **Una sola definición de tokens, una sola fuente de schema.** (Patrón C2/B1.)

## Cobertura y huecos del sistema
- ⚠️ **HUECO — Google Search Console:** no hay verificación GSC automatizada en la Fábrica (SEGURIDADPRIVADA tiene un `<meta google-site-verification>` manual). Pendiente: inyectar el token vía `SITE.gscVerification` en `<SEOHead>`. Ver [[01 - SEO Tecnico]] §Verificación.
- ⚠️ **HUECO — n8n / Brevo / fal.ai:** la automatización de contenido, emails e imágenes NO existe en ningún repo (patrón E5). El SEO no depende de ellas, pero el pipeline de imágenes que alimenta el CDN es manual.
- ⚠️ **HUECO — gate SEO en CI:** solo FIREFIGHTERMX valida `title`/`description` en prebuild. El Vault adopta ese gate como canónico; su implementación se detalla en [[00 - Indice de SOPs]] (pendiente) y se referencia en [[01 - SEO Tecnico]].
