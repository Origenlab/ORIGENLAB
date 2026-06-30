# 03 — Directorios y Páginas Locales

> Propósito: el patrón de páginas hyper-local por zona/alcaldía (y directorios de terceros) generadas por ruta dinámica `[...slug]` desde colección — el imán de SEO local del Vault, sin una sola página hardcodeada.

Cuando un negocio cubre varias zonas (arquetipo **C**, SEO local multi-zona) o lista entidades de terceros (arquetipo **D**, directorio), la respuesta canónica es la misma: **una colección Zod + una ruta dinámica `[...slug]` que genera todas las páginas en build** (canónico **D2**). Es el patrón más data-driven del ecosistema. Detalle de tipo en [[01 - Tipos de Pagina]] §7.

## El patrón: `getStaticPaths` sobre una colección

Una sola página `[...slug].astro` itera la colección con `getStaticPaths()` y emite N páginas estáticas. Evidencia real de escala:

| Proyecto | Qué genera | Mecanismo | Evidencia |
|---|---|---|---|
| **EVENTECH** | **211 venues** (directorio D) en 3 niveles (región → zona → ficha) | `directorio/[...slug].astro` + colección `venues` (Zod rico: `type` enum 13, `amenities` enum 22, `eventTypes` enum 22) | `src/pages/directorio/[...slug].astro`, `src/content/config.ts` |
| **INFLAPY** | **16 alcaldías** (cobertura local C) con contenido hiperlocal único | `cobertura/[slug].astro` itera `data/cobertura/*.ts` + `InfoLocal.astro` desde `zonasLocal.ts` | `src/pages/cobertura/[slug].astro`, `src/data/cobertura/` |
| **RENTADEILUMINACION** | **25 alcaldías/municipios** (zonas C) | hoy **estáticas** `zonas/*.astro` (anti-patrón) — la auditoría las marca como candidatas a generarse desde datos | `src/pages/zonas/*.astro` |

EVENTECH e INFLAPY son el modelo correcto; RENTADEILUMINACION es la advertencia: sus 25 zonas son `.astro` "casi idénticos" escritos a mano, que la auditoría señala como automatizables — "generación de las 25 páginas de zona desde datos (lat/long, alcaldías colindantes) en vez de 25 `.astro`". Ver [[../_AUDITORIA/diagnostico-EVENTECH]], [[../_AUDITORIA/diagnostico-INFLAPY]], [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]].

## La colección `zonas` (arquetipo C)

Definida en [[08 - Biblioteca Plantillas/_scaffold/content.config.ts|content.config.ts]] (`:183-217`), Zod `.strict()`, origen SEGURIDADPRIVADA (`:228-285`) + INFLAPY (cobertura por alcaldía):

| Campo | Para qué |
|---|---|
| `zoneName` | nombre humano de la zona ("Benito Juárez"). |
| `type` | `z.enum(['ciudad','estado','alcaldia','municipio','zona'])` — nivel de la zona (EVENTECH `:208`). |
| `municipality?` / `state` | jerarquía geográfica. |
| `geo` | `{lat?, lng?, postalCodes?[]}` — alimenta `GeoCoordinates`/`areaServed`. |
| `colonias?[]` | colonias de la zona (SEGURIDADPRIVADA `:283`) — materia prima del contenido único. |
| `delivery?` | `{time?, note?}` — tiempo y notas de entrega (INFLAPY). |
| `availableServices` | `reference('servicios')[]` — qué servicios aplican en la zona (interlinking tipado). |
| `nearbyZones` | `reference('zonas')[]` — zonas cercanas (interlinking lateral). |
| `faqs` / `hero` | FAQ local + hero opcional. |

> ⚠️ La colección `directorio` (arquetipo D: salones/empresas de terceros) **no** está en el `content.config.ts` base (ese trae `zonas` para C). Si el proyecto es tipo D, hay que añadirla — su schema mínimo está documentado en la cabecera de `pagina-directorio-[...slug].astro` y modelado por la colección `venues` de EVENTECH. Es un hueco declarado de la biblioteca (ver [[08 - Biblioteca Plantillas/00 - Indice de Plantillas]] §Huecos).

## Schema (seo.ts)

`pageType="directory"` en `buildSchema()` ([[08 - Biblioteca Plantillas/_seo/seo.ts|seo.ts]] `:626-627`) → `directorySchema()` = `CollectionPage` + `ItemList`, con cada zona/entidad como `ListItem` y `about → Place` si se pasa `areaServed` (`seo.ts:508-532`). En páginas de zona se puede pasar `data.areaServed` para que `localBusinessSchema()` ajuste su `areaServed` a esa zona (`seo.ts:599,607,325`). El `BreadcrumbList` se emite una sola vez (B3). EVENTECH usa además `EventVenue`/`CollectionPage`/`ItemList` para el directorio; en arquetipo C el grafo base `LocalBusiness + Service + areaServed` por zona basta.

## Cómo evita el hardcode

El valor del patrón es **eliminar la duplicación** que pudre los catálogos hechos a mano (anti-patrón **A5** / la falla "automatizable" de varias auditorías):

1. **Dato, no página.** Cada zona es una entrada de colección (`.md`) o un `.ts` tipado, no un `.astro`. Añadir una zona = añadir un archivo de datos; la página se genera sola.
2. **Una plantilla, N páginas.** Toda la "inteligencia" de presentación (hero, FAQ por zona, mapa, schema, CTAs) vive en `[...slug].astro` / el layout — no se copia en cada página. RENTADEILUMINACION lo describe en su directorio: "toda la inteligencia de presentación está en el template, no en el `.md`".
3. **Contenido único verificable, no relleno.** El SEO local exige diferenciación real entre zonas, no texto clonado con el nombre cambiado. INFLAPY lo resuelve con `InfoLocal` (tiempo de entrega, vialidades, espacios, **un caso real**, un consejo) por alcaldía — datos específicos, no plantilla rellenada con sinónimos. La auditoría lo destaca como "contenido único verificable" exportable.
4. **Interlinking tipado.** `availableServices`/`nearbyZones` por `reference()`: el build valida los enlaces; no hay listas hardcodeadas que se rompan.
5. **Sincronía con la taxonomía.** Los slugs de zona y los `coverageStates` de [[site.ts]] son la misma fuente de verdad.

El resultado: GAMADEMEXICO probó que un template + capa de datos sustituye 33 páginas (~8,545 líneas, ~85% duplicadas) **sin cambiar URLs ni añadir redirects** (canónico **A5**, [[patrones-canonicos]]). Ese es el estándar para cualquier directorio o cobertura del Vault.

## Estructura de secciones (página de zona)

breadcrumb → hero de zona → contenido único hiperlocal (`InfoLocal`: entrega, colonias, vialidades, caso real) → grid de servicios disponibles → zonas cercanas → FAQ local → CTA WhatsApp con mensaje contextualizado por zona (`waUrl()`, D4).

## Evidencia

- Directorio multinivel desde colección: EVENTECH `src/pages/directorio/[...slug].astro` (211 venues), `src/content/config.ts`. Ver [[../_AUDITORIA/diagnostico-EVENTECH]].
- Cobertura local data-driven con contenido único: INFLAPY `src/data/cobertura/*.ts` + `src/data/zonasLocal.ts` + `src/components/InfoLocal.astro` + `cobertura/[slug].astro`. Ver [[../_AUDITORIA/diagnostico-INFLAPY]].
- Anti-patrón (zonas estáticas a corregir): RENTADEILUMINACION `src/pages/zonas/*.astro` (25 alcaldías). Ver [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]].
- Colección canónica: [[08 - Biblioteca Plantillas/_scaffold/content.config.ts]] (`zonas`). Patrón A5/D2 en [[patrones-canonicos]].
