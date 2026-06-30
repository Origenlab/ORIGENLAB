# La Fábrica de Sitios — línea de ensamblaje
> Propósito: la secuencia industrial exacta para construir un sitio, de cero a producción, sin retrabajo.

Objetivo: reducir tiempo, errores y retrabajo; aumentar calidad, SEO y reutilización. Un sitio se **ensambla**, no se inventa.

## Las 7 estaciones

| # | Estación | Entrada | Salida | SOP | Plantillas/Piezas |
|---|---|---|---|---|---|
| 0 | **Selección** | Brief del cliente | Arquetipo A/B/C/D + sitemap de URLs | [[01 - Selector de Arquetipo]] | — |
| 1 | **Scaffold** | Arquetipo | Proyecto Astro inicial + `site.ts` lleno | [[SOP 01 - Crear sitio nuevo]] | `08/_scaffold/` |
| 2 | **Contenido** | Taxonomía | Content Collections + páginas generadas | [[SOP 02 - Crear una categoria]], [[SOP 03 - Crear producto o servicio]], [[SOP 04 - Crear articulo SEO]], [[SOP 05 - Crear landing de conversion]] | `08/pagina-*`, `content.config.ts` |
| 3 | **SEO** | Páginas | Schema por tipo + metas + sitemap/robots | [[SOP 06 - SEO tecnico y schema]] | `08/_seo/` |
| 4 | **Diseño** | Páginas + marca | Tokens del cliente + componentes montados | — (ver [[04 - Diseño y UX/01 - Design Tokens]]) | `tokens.css`, `09/_src` |
| 5 | **Imágenes** | Necesidades visuales | AVIF dimensionadas + CDN | [[SOP 08 - Generar e integrar imagenes]] | `rewrite-cdn.mjs` |
| 6 | **QA** | Sitio completo | Checklist 100% verde | [[SOP 10 - QA final y publicacion]] | [[02 - Checklist QA Pre-Deploy]] |
| 7 | **Deploy** | QA aprobado | Sitio en producción + dominio | [[SOP 07 - Deploy Cloudflare Pages]] | — |

(Estación 9 opcional: [[SOP 09 - Automatizacion de contenido]] para blog continuo — ⚠️ HUECO hasta cablear n8n.)

## Reglas de la línea
1. **No saltar estaciones.** El QA (6) es bloqueante: si algo falla, regresa a la estación que lo originó.
2. **Data-driven desde la estación 2.** Toda página repetible nace de datos + plantilla, nunca a mano. *(Evita la deuda de EVENTECH/RENTADEILUMINACION: cientos de `.astro` hechos a mano.)*
3. **El SEO no es un paso final**, está horneado: las plantillas ya traen `buildSchema()`. La estación 3 solo verifica y ajusta datos.
4. **Una sola fuente** en cada capa: `site.ts` (negocio), Collections (contenido), `tokens.css` (diseño).
5. **Deploy único** (estación 7): Cloudflare Pages o GitHub Pages, nunca ambos.

## Tiempo objetivo (orientativo)
Sitio arquetipo C/D con ~20–40 páginas data-driven: **1–2 días** con el Vault, vs. semanas a mano. El cuello de botella real es **contenido e imágenes**, no código — por eso las estaciones 2, 5 y 9 son las que más conviene automatizar (ver [[Roadmap de Optimizacion]]).
