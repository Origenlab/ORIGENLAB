# SOP 06 — SEO técnico y schema
> Propósito: dejar sitemap, robots.txt, canonical/trailingSlash y el JSON-LD por `pageType` correctos y validados, sin duplicados ni datos fabricados.

Estación 3 (SEO) de la [[01 - La Fabrica de Sitios]]. El SEO está **horneado** en las plantillas (`buildMeta`/`buildSchema`); esta estación **verifica y ajusta datos**. Marco técnico: [[01 - SEO Tecnico]] y `08/_seo/`.

## Objetivo
HTML indexable con canónicos consistentes, `sitemap-index.xml` generado por `@astrojs/sitemap`, `robots.txt` con el dominio correcto, y JSON-LD válido por tipo de página — con BreadcrumbList una sola vez y cero `aggregateRating` inventado.

## Prerrequisitos
- Sitio con páginas creadas (SOPs 02–05).
- `src/lib/seo.ts` montado (de `08/_seo/seo.ts`).
- `public/robots.txt` copiado de `08/_seo/robots.txt`.
- `astro.config.mjs` del scaffold (`@astrojs/sitemap` activo).

## Pasos

1. **Fija `site` y `trailingSlash` coherentes.** En `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: 'https://midominio.com.mx',   // OBLIGATORIO: sin él, sitemap y canonical fallan
     output: 'static',
     trailingSlash: 'never',             // canónico B5
     integrations: [sitemap(sitemapOptions)],
   });
   ```
   La política de `trailingSlash` aquí **debe coincidir** con `SITE.trailingSlash` que consume `absUrl()` en `seo.ts`. Mezclar `never` con canónicos con slash final = duplicados.

2. **Configura el sitemap.** El scaffold ya trae `sitemapOptions` con `filter` (excluye `/404`, `/_`, `/admin`) y `serialize` (prioridades por nivel). Ajusta los **regex a tus slugs reales** (los de `TAXONOMY`):
   ```js
   else if (/\/(extintores|servicios|productos|zonas)\/?$/.test(url)) { item.priority = 0.9; }
   ```
   - No pongas `lastmod: new Date()` global (Google ignora la señal si cambia en cada build — nota PROYECTORED).
   - **Arquetipo D (directorio masivo):** además genera un sitemap dedicado vía endpoint `.xml.ts` (origen `BOMBERO/sitemap-directorio.xml.ts`) y declara ambos en `robots.txt`.

3. **Edita `public/robots.txt`.** Reemplaza el dominio en las **dos** líneas finales:
   ```
   Sitemap: https://midominio.com.mx/sitemap-index.xml
   Host: https://midominio.com.mx
   ```
   La plantilla ya permite bots de IA/GEO (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot…) y bloquea scrapers abusivos (AhrefsBot, SemrushBot, Bytespider…). Si el cliente NO quiere alimentar IA, mueve esos UAs a `Disallow: /` (variante EVENTECH).

4. **Verifica el canonical.** Se genera SIEMPRE en el layout vía `buildMeta().canonical` → `absUrl()` (ruta→absoluta, normaliza slash, no toca archivos con extensión). No escribas `<link rel="canonical">` a mano en ninguna página.

5. **Asegura `pageType` correcto por plantilla** (lo dispara `buildSchema`):
   | Página | `pageType` | Schema que emite |
   |---|---|---|
   | Home | `home` | Organization + WebSite + LocalBusiness (`@graph`) |
   | Categoría | `category` | CollectionPage + ItemList |
   | Producto | `product` | Product + Offer |
   | Servicio | `service` | Service |
   | Artículo | `article` | Article |
   | Directorio | `directory` | CollectionPage + ItemList |
   El grafo base (`Organization`/`WebSite`/`LocalBusiness`) se consolida por `@id`. En sitios > ~1.000 URLs, recorta el `@graph` base a home + categorías clave (nota de rendimiento en `seo.ts`).

6. **Breadcrumb una sola vez (B3).** El `BreadcrumbList` lo emite `buildSchema` cuando recibe `data.breadcrumbs` (lo arma `PageLayout` desde las migas). El componente `Breadcrumbs.astro` solo pinta microdata, **sin** `<script type="application/ld+json">`. No actives JSON-LD en él.

7. **Cero datos estructurados fabricados (B4).** `seo.ts` no emite `aggregateRating`/`Review` salvo reseñas reales (`SITE.allowSelfReviews` + reviews válidas). No fuerces ratings. El `Offer` sin precio es "bajo cotización", no precio `0` falso.

8. **No mantengas sitemap manual.** Borra cualquier `sitemap.xml` viejo en `public/` — solo manda el `sitemap-index.xml` generado (falla RENTADEILUMINACION/RESOIL: sitemap manual obsoleto en paralelo).

9. **(Opcional) CDN de imágenes post-build.** Si usas CDN, añade `rewrite-cdn.mjs` al build (ver [[SOP 08 - Generar e integrar imagenes]]). No reescribas en runtime (doble request, mata LCP).

10. **Build y valida:**
    ```bash
    npm run build && npm run preview
    ```
    - Abre `http://localhost:4321/sitemap-index.xml` (debe existir y listar las URLs).
    - Abre `http://localhost:4321/robots.txt` (dominio correcto).
    - Copia el JSON-LD de una página y pégalo en **validator.schema.org** y **Rich Results Test** (`search.google.com/test/rich-results`).

## Checklist de verificación
- [ ] `site:` correcto en `astro.config.mjs`; `trailingSlash` coherente con `SITE.trailingSlash`.
- [ ] `sitemap-index.xml` generado y accesible; **sin** sitemap manual obsoleto en `public/`.
- [ ] `robots.txt` con dominio reemplazado y `Sitemap:`/`Host:` correctos.
- [ ] Canonical único por página (vía `buildMeta`); dominio = `astro.config.site` = sitemap.
- [ ] `pageType` correcto por plantilla; schema válido en validator.schema.org y Rich Results.
- [ ] **BreadcrumbList aparece una sola vez** por página.
- [ ] **Cero `aggregateRating`/`Review` fabricados.**
- [ ] `title` ≤60 y `description` ≤155 únicos por página (los recorta `buildMeta`).
- [ ] hreflang ausente y documentado (sitio monolingüe es-MX).
- [ ] (Si D) sitemap de directorio dedicado declarado en robots.txt.

## Errores comunes
- **Drift de dominio.** `astro.config.site` ≠ `robots.txt` ≠ canonical → Google ve URLs distintas y diluye. Lección: un solo dominio en los tres lugares; verifícalo en cada deploy (el `Sitemap:` de robots no se autogenera).
- **BreadcrumbList duplicado.** Anti-patrón B3 (BOMBERO, RENTADEILUMINACION: en layout *y* en `Breadcrumbs.astro`). Lección: solo `buildSchema` lo emite.
- **Ratings/reviews fabricados.** B4, 6+ proyectos. Lección: sin reseñas reales, `seo.ts` no emite nada.
- **Sitemap manual en paralelo.** RENTADEILUMINACION/RESOIL dejaron un `sitemap.xml` viejo que contradecía al generado. Lección: solo el `sitemap-index.xml` de `@astrojs/sitemap`.
- **`lastmod: new Date()` global.** Hace que Google ignore el campo en todo el sitio. Lección: omítelo (o usa fecha real en el sitemap de directorio).
- **JSON-LD escrito a mano en la página.** Se desincroniza del contenido y duplica nodos. Lección: todo el schema sale de `buildSchema()`; nunca un `<script type="application/ld+json">` manual.
- **hreflang sin decisión.** PODIUMEX/SEGURIDADPRIVADA no documentaban su ausencia. Lección: monolingüe = sin hreflang, **a propósito**; solo `og:locale=es_MX` e `inLanguage=es-MX`.
