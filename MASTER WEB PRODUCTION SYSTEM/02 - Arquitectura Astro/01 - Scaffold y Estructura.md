> Propósito: definir el NÚCLEO copy-paste (scaffold) de todo sitio Astro 6 SSG del Master System — los archivos base y la estructura de `src/` que un proyecto nuevo hereda antes de escribir una sola línea de negocio.

# Scaffold y Estructura

## Qué es el scaffold

El scaffold es el conjunto mínimo de archivos canónicos que arrancan un proyecto nuevo. Vive en `08 - Biblioteca Plantillas/_scaffold/` y se copia tal cual a la raíz/`src/` del repositorio nuevo; luego se reemplazan los marcadores `{{...}}` con los datos reales del cliente. Stack fijo: **Astro 6.x SSG, sin adapter, CSS vanilla con tokens en `:root`**.

Archivos del scaffold:

| Archivo | Rol | Origen canónico |
|---|---|---|
| `site.ts` → `src/config/site.ts` | SSoT: identidad, contacto (NAP), taxonomía, mensajes WhatsApp | `PROYECTORED/src/config/site.ts` |
| `content.config.ts` → `src/content.config.ts` | Content Collections con Zod `.strict()` | `MESECI` + `EVENTECH` + `SEGURIDADPRIVADA` |
| `astro.config.mjs` | Astro 6 + `@astrojs/sitemap` + `trailingSlash:'never'` | `PROYECTORED/astro.config.mjs` |
| `package.json` | Deps canónicas Astro 6 (4 limpias) | `PROYECTORED/package.json` |
| `tsconfig.json` | TypeScript `strict` | `PROYECTORED/tsconfig.json` |
| `.gitignore` | `node_modules`, `dist`, `.env` + nota anti-secretos | patrón E6 |
| `estructura-carpetas.md` | Árbol canónico de `src/` | PROYECTORED + A7 |

## Los dos contratos del núcleo

Todo el resto del Master System (capa SEO, layouts, componentes) interopera con dos archivos. Cambiar sus claves rompe lo de aguas abajo.

### 1. SSoT — [[site.ts]]

`src/config/site.ts` es la **fuente única de verdad** (patrón canónico A4, origen PROYECTORED: el más completo del ecosistema con contacto + taxonomías + ~30 mensajes WhatsApp). Exporta un contrato fijo:

- `SITE` — `{ name, brand, domain, url, lang:'es-MX', description, defaultImage }`
- `CONTACT` — `{ phone, phoneE164, whatsapp /*E.164 sin +*/, email, street, city, state, postalCode, country:'MX', geo:{lat,lng}, hours }`
- `TAXONOMY` — `{ categories, services, sectors, coverageStates }` `as const`
- `WA_MESSAGES` — `{ default, cotizar, … }` (mensajes pre-armados por intención)
- `waUrl(message?)` — `https://wa.me/<whatsapp>?text=<encodeURIComponent>`
- `telUrl()` — `tel:<phoneE164>`

Regla dura D4: **nunca** se hardcodea un número de WhatsApp; siempre `waUrl(WA_MESSAGES.<intención>)`.

### 2. Capa de contenido — [[content.config.ts]]

`src/content.config.ts` define las Content Collections con Zod `.strict()` (patrón canónico D1). Sintetiza lo mejor de tres proyectos:

- **MESECI** (`src/content.config.ts:57-83`): `.strict()` (rechaza campos desconocidos), `category` como `z.enum()` cerrado (nunca `z.string()` libre), imagen obligatoria vía `imagePath` regex `^/images/`.
- **EVENTECH** (`src/content/config.ts:11-29, 267-328`): `heroSchema` y `faqSchema` reutilizables; enums de categoría de blog cerrados.
- **SEGURIDADPRIVADA** (`src/content.config.ts:228-285, 171-222`): colección `zonas` para SEO local y colección de testimonios (aquí `casos`).

Cinco colecciones: **productos** (A), **servicios** (B/C), **articulos** (blog `.mdx`, regla D3), **zonas** (C), **casos** (prueba social). Enlazadas entre sí con `reference()` tipado. **Sin `aggregateRating` fabricado** (patrón B4: si no hay reseñas reales verificables, no se modela).

## Estructura de `src/`

El árbol canónico completo (una línea por carpeta) está en [[estructura-carpetas]]. Puntos clave:

- `config/site.ts` (SSoT) y `content.config.ts` (capa de datos) son la cima de la jerarquía de datos.
- `lib/seo.ts` concentra el JSON-LD por tipo con `@id` linking (canónico PODIUMEX/EVENTECH).
- Layouts en dos niveles + tipo (A7): `BaseLayout` (head/SEO) → `PageLayout` (chrome) → `Product/Service/Article Layout`.
- `styles/global.css` es la **única** fuente de design tokens (`:root`) — regla C2 contra la doble fuente de tokens.

## Evidencia (rutas reales)

- SSoT canónico: `/Users/frankoropeza/Documents/Claude/Projects/PROYECTORED/src/config/site.ts` (líneas 6-193: SITE, CONTACT, BRANCHES, WA_MESSAGES, PRODUCT_CATEGORIES, SERVICES, SECTORS, COVERAGE_STATES, `waUrl()`).
- Config Astro 6: `/Users/frankoropeza/Documents/Claude/Projects/PROYECTORED/astro.config.mjs` (`output:'static'`, sitemap con `serialize` por sección, `lastmod` omitido a propósito).
- Deps limpias Astro 6: `/Users/frankoropeza/Documents/Claude/Projects/PROYECTORED/package.json` (4 deps: astro `^6.1.1`, `@astrojs/sitemap`, `@astrojs/check`, typescript; Node `>=22.12.0`).
- Zod estricto de referencia: `/Users/frankoropeza/Documents/Claude/Projects/MESECI/src/content.config.ts` (`.strict()`, enums `BLOG_CATEGORIES`/`PRODUCT_CATEGORIES`, `imagePath`).
- 6 colecciones + heroSchema: `/Users/frankoropeza/Documents/Claude/Projects/EVENTECH/src/content/config.ts`.
- Zonas + testimonios: `/Users/frankoropeza/Documents/Claude/Projects/SEGURIDADPRIVADA/src/content.config.ts:228-285`.
- NAP único con `@id`: `/Users/frankoropeza/Documents/Claude/Projects/INFLAPY/src/data/business.ts` (formato E.164 "único en todo el sitio", `buildLocalBusinessJsonLd`).
- Decisiones canónicas: [[../_PATRONES/patrones-canonicos|patrones-canonicos]] (A1–A7, B5, C1/C2, D1/D3/D4, E6).

## Decisiones tomadas en este scaffold

- **`trailingSlash:'never'`** (B5): PROYECTORED no lo declara explícito; se adoptó de MESECI/SEGURIDADPRIVADA para normalizar canonicals.
- **`build = astro check && astro build`**: gate de tipos antes de construir (E2, origen FIREFIGHTERMX). PROYECTORED separa los scripts; aquí se encadenan.
- **Colección `articulos` en `.mdx`** (D3) en lugar del `blog` en `.md` de PROYECTORED, porque la regla canónica exige blog en colección `.mdx`.
- **`price` como `string` opcional** (no `number`): refleja el modelo "cotiza por WhatsApp" del ecosistema (sin precios públicos forzados).

## ⚠️ HUECOS

- ⚠️ HUECO: `lib/seo.ts` (librería de JSON-LD) y los layouts (`BaseLayout`/`PageLayout`/tipos) NO están en este scaffold — los entrega la capa SEO/layouts del Master System. Este núcleo solo define el contrato (`site.ts` + `content.config.ts`) con el que interoperan.
- ⚠️ HUECO: **deploy sin homologar** (E1). El scaffold es agnóstico de hosting; no incluye `astro.config` adapter ni `wrangler.toml`/`.github/workflows`. La decisión Cloudflare Pages vs GitHub Pages está pendiente de confirmar con el dueño y se documenta aparte.
- ⚠️ HUECO: **CDN de imágenes** (E3, ExactDN post-build) no incluido en el núcleo; el `imagePath` de [[content.config.ts]] valida rutas locales `/images/` y el reescritor CDN se añade como paso de build separado.
- ⚠️ HUECO: los enums de `content.config.ts` (`PRODUCT_CATEGORIES`, `SERVICE_CATEGORIES`, `ARTICLE_CATEGORIES`) llevan marcadores `{{...}}` y DEBEN sincronizarse a mano con `TAXONOMY` de [[site.ts]] al instanciar el proyecto (no hay validación cruzada automática todavía).
