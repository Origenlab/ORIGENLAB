# 02 — Blog y Artículos SEO

> Propósito: el proceso editorial real del blog OrigenLab — frontmatter tipado, la regla de oro (blog siempre en colección `.mdx`), interlinking deliberado e identidad visual por categoría.

El blog es el motor de tráfico de descubrimiento: capta búsquedas informacionales y las canaliza al catálogo por interlinking. El proceso está destilado del blog SEO de GAMADEMEXICO (84 posts, `PROCESO-BLOG-SEO.md` + `GUIA-ARTICULOS-BLOG.md`) y MEDEDUL (120 `.mdx`, identidad por categoría) — ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]] y [[../_AUDITORIA/diagnostico-MEDEDUL]]. Para el paso a paso operativo: [[SOP 04 - Crear articulo SEO]].

## Regla D3 — blog SIEMPRE en colección `.mdx`

El blog vive en la colección **`articulos`** en archivos `.mdx`, **nunca** como páginas `.astro` sueltas. Es regla dura ([[patrones-canonicos]] §D3) porque el anti-patrón está documentado y cuesta caro:

- MESASPICNIC: 75 `.astro` de blog sueltos · RENTADEILUMINACION: 128 `.astro` (+ `blog-articles.ts` paralelo → 5 colisiones de slug, los `.md` quedaron muertos) · PODIUMEX: idem.
- Consecuencia: sin validación de frontmatter, sin schema homogéneo, slugs que chocan, listado desincronizado del contenido real.

**El modelo correcto:** un solo `articulos/[...slug].astro` que itera `getCollection('articulos')`, calcula relacionados/tiempo de lectura y renderiza con `ArticleLayout` + componentes MDX. Origen: BOMBERO `BlogMdxLayout`, EVENTECH (`blog/[...slug]` + paginación), INFLAPY (`blog/[...slug]` con `<Content components={mdxContentComponents}>`). Requiere `@astrojs/mdx` en `astro.config.mjs`.

## Frontmatter tipado (de content.config.ts)

La colección `articulos` está definida en [[08 - Biblioteca Plantillas/_scaffold/content.config.ts|content.config.ts]] (`:156-178`), Zod `.strict()` — rechaza campos desconocidos en build:

| Campo | Tipo / regla | Por qué |
|---|---|---|
| `title` | string 10-70 | ≤70 para SEO (convención de títulos ≤60 + margen). |
| `description` | string 70-160 | Meta description objetivo 140-160. |
| `category` | **`z.enum(ARTICLE_CATEGORIES)`** default `'general'` | Enum **cerrado**. Evita el bug de INFLAPY: "Guias" (32) vs "Guías" (29) como categorías distintas → SEO fragmentado. |
| `heroImage` | `imagePath` (`^/images/`) **obligatoria** | Sin imagen no hay tarjeta ni OG. Regla MESECI. |
| `pubDate` / `updatedDate?` | `z.coerce.date()` | `dateModified` alimenta el schema Article. |
| `author` | string default `{{BRAND}}` | — |
| `tags` | array ≤10 | Interlinking por afinidad. |
| `relatedProducts` / `relatedServices` / `relatedPosts` | `reference(...)` | **Interlinking tipado** blog↔catálogo (D1). El build valida que el slug exista. |
| `faqs` | `faqSchema` | FAQ opcional → FAQPage (una vez, ver [[04 - FAQs y Casos de Exito]]). |
| `seoTitle?` / `seoDescription?` / `keywords?` / `noindex` | `seoFields` | Overrides SEO. |
| `featured` / `draft` | boolean | Destacado / borrador. |

`.strict()` es lo que hace fiable la automatización: cualquier `.mdx` con un campo mal escrito **falla el build** en vez de ignorarse en silencio (origen MESECI: `.strict()` cazó `hero_image:` mal tipado en 16 archivos). Esto se valida además pre-build con `validate:mdx` (ver [[01 - Scripts Reales]]).

## Schema del artículo

`pageType="article"` en `buildSchema()` ([[08 - Biblioteca Plantillas/_seo/seo.ts|seo.ts]] `:467-486`) emite `Article`/`BlogPosting` con `headline`, `description`, `datePublished`/`dateModified`, `author` (Person o `@id` de Organization), `publisher→#organization`, `isPartOf→#website`, `mainEntityOfPage`. GAMADEMEXICO usa `TechArticle` (no `Article` plano) con `wordCount`/`timeRequired` para blog técnico — variante válida cuando el contenido es de campo experto. El `BreadcrumbList` lo añade `buildSchema()` una sola vez (B3); el FAQPage solo si el artículo trae `faqs` visibles.

## Interlinking (canónico B6)

El interlinking es deliberado, no decorativo — es el mecanismo que convierte tráfico de blog en cotizaciones:

- **Blog → catálogo:** cada artículo enlaza el catálogo de su categoría + servicios relacionados. GAMADEMEXICO enlaza catálogo de la categoría + `/equipos` + `/servicios/asesoria` + hubs cross-categoría (`blog/[categoria]/[slug].astro:108-125`).
- **Tipado por `reference()`:** `relatedProducts`/`relatedServices`/`relatedPosts` se resuelven contra las colecciones reales; el build rompe si el slug no existe (D1). Esto evita los enlaces rotos que RENTADEILUMINACION arregló a mano ("236 enlaces rotos").
- **Componente data-driven:** usa `RelatedLinks` (ver [[09 - Biblioteca Componentes/00 - Inventario]]) alimentado por la taxonomía, no listas hardcodeadas. Más detalle en [[03 - SEO Master System/04 - Internal Linking y URLs]].
- **Related por tags como complemento, no como único mapa:** MEDEDUL solo relaciona por `tags` y la auditoría lo marcó como más débil que un mapa temático centralizado — preferir `reference()` explícito + tags.

## Identidad por categoría (origen MEDEDUL)

Cada categoría del blog tiene **identidad visual propia** (color + ícono + descripción), no es solo un filtro. MEDEDUL exporta `categoryMeta` (`config.ts:65-138`): por cada una de sus 12 categorías un `{name, icon, color, description}`. El resultado: las tarjetas, los hero de categoría y los breadcrumbs del blog se tiñen con el color de su categoría, dando coherencia editorial y mejor escaneo visual.

En el Vault, esa identidad se define junto a la taxonomía (en `TAXONOMY`/datos de [[site.ts]] o en un `categoryMeta` espejo de `ARTICLE_CATEGORIES`), y los slugs **deben coincidir** con el enum `ARTICLE_CATEGORIES` de `content.config.ts` — misma fuente de verdad, sin divergencias. Rutas del blog canónicas: `articulos/` (listado), `articulos/[categoria]/` (por categoría) y paginación, todas derivadas de la colección.

## Proceso editorial (origen GAMADEMEXICO PROCESO-BLOG-SEO)

El proceso real de GAMADEMEXICO se resume en fases con un principio rector: **"calidad > velocidad, verificar antes de reportar"** (`PROCESO-BLOG-SEO.md:8-30`):

1. **Investigación / keyword:** definir intención y keyword principal (GAMADEMEXICO usó NeuronWriter como herramienta de proceso, no de runtime).
2. **Redacción** sobre la plantilla de artículo (`docs/TEMPLATE-ARTICULO-BLOG.md`, `GUIA-ARTICULOS-BLOG.md`): tono experto de campo, estructura de secciones, `heroImage` + `imagenAlt`.
3. **Normalización / QA:** `validate:mdx` valida frontmatter y props de componentes MDX; git hook pre-push bloquea regresiones (MEDEDUL/INFLAPY) — ver [[01 - Scripts Reales]].
4. **Interlinking:** poblar `relatedProducts`/`relatedServices`/`relatedPosts` y enlazar el catálogo de la categoría.
5. **Anti-canibalización:** evitar dos artículos compitiendo por la misma keyword (fase explícita en el proceso de GAMADEMEXICO).

> ⚠️ La **generación automática** de artículos (workflow n8n que escribe y publica `.mdx`) es **diseño objetivo, no realidad**: no existe en ningún repo. INFLAPY dejó la infraestructura lista (campos Zod `autogenerated`/`audit`, contrato `docs/article-system-n8n.md`, 1 demo en `draft`), pero **sin webhook ni código**. Ese diseño se documenta — marcado como HUECO — en [[06 - Automatizaciones/02 - Pipeline de Contenido n8n]]. Hoy el blog se produce **a mano** con el proceso de arriba.

## Evidencia

- Proceso y plantilla: GAMADEMEXICO `PROCESO-BLOG-SEO.md`, `docs/TEMPLATE-ARTICULO-BLOG.md`, `GUIA-ARTICULOS-BLOG.md`; schema `TechArticle` en `src/lib/seo.ts`. Ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- Identidad por categoría + pipeline de QA: MEDEDUL `src/content/config.ts:65-138` (`categoryMeta`), `scripts/validate-mdx.mjs`. Ver [[../_AUDITORIA/diagnostico-MEDEDUL]].
- Frontmatter tipado para automatización: INFLAPY `src/content/config.ts` (campos `autogenerated`/`audit`). Ver [[../_AUDITORIA/diagnostico-INFLAPY]].
- Frontmatter canónico: [[08 - Biblioteca Plantillas/_scaffold/content.config.ts]] (`articulos`).
