# 03 — On-page y Metadatos
> Propósito: reglas de `title`, `description`, Open Graph y Twitter Card —longitudes, marca-al-final y defaults— generadas desde una sola función para que ninguna página tenga metadatos a mano.

Todos los metadatos del `<head>` salen de `buildMeta()` en [[../08 - Biblioteca Plantillas/_seo/seo.ts]], que el layout pasa a un componente `<SEOHead>`. La página solo aporta `title`, `description`, `canonical`, `image` y `type`. Origen del patrón: `EVENTECH/SEOHead.astro` + `utils/seo.ts` (resolveSEO/formatTitle) y `BOMBERO/SEOHead.astro` + `utils/seo.ts`.

---

## 1. `<title>` — reglas de longitud y marca
**Canónico (regla de oro, origen EVENTECH vault `Convencion-de-titulos.md`):**
- **Keyword PRIMERO.** El título empieza con la intención de búsqueda, no con la marca.
- **Máximo ~60 caracteres** (Google trunca ~580px). `SITE.seo.titleMaxLength = 60`.
- **La marca es complemento al final**, y solo se añade si el resultado **cabe** en 60. Si no cabe, va el título solo (EVENTECH) o se recorta el cuerpo conservando un único sufijo de marca limpio (BOMBERO).
- **Único por página** — nunca dos páginas con el mismo `<title>`.
- **Sin doble marca.** EVENTECH eliminó 49 títulos con doble marca en su remediación; su `formatTitle` prohíbe "EVENTECH" duplicado.

`formatTitle()` en `seo.ts` implementa exactamente esto:
- Si el título ya incluye la marca → respeta si cabe, si no recorta sin duplicar.
- Si no la incluye → añade `| {SITE.name}` solo si `≤ 60`; si excede, recorta el cuerpo por límite de palabra (sin separadores colgando) y añade el sufijo.

Evidencia: EVENTECH `seo.ts:22–27` (`formatTitle`, flag `rawTitle` para título exacto), BOMBERO `seo.ts:35–57` (`formatTitle` + `capTitleCore`, regex anti-doble-marca), FIREFIGHTERMX `validate-seo.mjs` (valida `title ≤ 60` en prebuild).

Ejemplos:
- ✅ `Renta de podiums profesionales en CDMX | PODIUMEX` (48 chars)
- ✅ `Trajes estructurales NFPA 1971 para bomberos` (sin marca, ya en el límite)
- ❌ `PODIUMEX | Renta de podiums...` (marca al inicio)
- ❌ `Renta de equipo para eventos en CDMX y México — EVENTECH S.A. de C.V.` (>60, doble marca)

---

## 2. `<meta name="description">`
**Canónico:**
- **120–160 caracteres** (Google trunca ~155–160). `SITE.seo.descriptionMaxLength = 160`.
- Fórmula (origen EVENTECH vault `Meta-descripciones.md`): **qué + para qué + zona + CTA**. Ej.: *"Renta de mobiliario, audio e iluminación para bodas y eventos corporativos en CDMX. Entrega, montaje y cotización en 24h."*
- es-MX, voz humana, sin keyword-stuffing.

`truncateMetaDescription()` en `seo.ts` recorta a ≤160 priorizando **oraciones completas**; si no caben, corta por palabra y **poda preposiciones/artículos colgando** al final, cerrando con punto cuando el espacio lo permite. Origen exacto: `BOMBERO/seo.ts:60–159` (lógica de oración → palabra, set de "palabras débiles" es-MX, target práctico ~155).

⚠️ **Deuda detectada (no replicar):** BOMBERO dejó ~80 descriptions de producto en 171–256 chars (límite del schema laxado a 260 a propósito, `content/config.ts:49–51`). El Vault mantiene el cap a 160 en `buildMeta` y el gate de CI rechaza descripciones largas.

---

## 3. Open Graph
`buildMeta()` produce los datos; `<SEOHead>` emite las etiquetas. Canónico (origen PODIUMEX `Layout.astro:44–89`, completo y correcto):
- `og:type` (`website` | `article`), `og:url` (= canonical), `og:title`, `og:description`.
- `og:image` **1200×630**, absoluta, + `og:image:alt` (PODIUMEX lo incluye; no omitir el alt).
- `og:locale` = `es_MX`, `og:site_name` = `SITE.name`.
- Para `type: 'article'`: `article:published_time` y `article:modified_time` (EVENTECH `seo.ts` los pasa por `resolveSEO`).

Default de imagen: `SITE.seo.image` (p.ej. `/og.jpg` 1200×630). `buildMeta` la vuelve absoluta con `absImage()`.

---

## 4. Twitter Card
Canónico: **`summary_large_image`** (PODIUMEX, EVENTECH, BOMBERO, SEGURIDADPRIVADA — universal).
- `twitter:card = summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (+ `image:alt`).
- `twitter:site = SITE.social.twitter` (p.ej. `@eventechmx`) si existe.

---

## 5. Otras metas del `<head>` (en `<SEOHead>`)
Inventario canónico (PODIUMEX `Layout.astro:44–95` + SEGURIDADPRIVADA `SEOHead.astro`):
- `robots`: `index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1` o `noindex,nofollow` (vía `buildMeta().robots`).
- `<link rel="canonical">` absoluto y normalizado.
- `<html lang="es-MX">`, `theme-color`, `format-detection: telephone=no`.
- Favicons + `site.webmanifest`.
- Resource hints: `preconnect` a `wa.me`, `preload` del hero AVIF y fuentes self-hosted.
- `google-site-verification` si `SITE.gscVerification` está definido (⚠️ HUECO: ver [[01 - SEO Tecnico]] §9).

⚠️ **Sobre geo meta tags:** BOMBERO emite `geo.*`/ICBM en el head; PODIUMEX y EVENTECH NO (la geo vive solo en el JSON-LD LocalBusiness). **Canónico: la geo va en el schema, no en metas `geo.*`** (Google no las usa para ranking local; el LocalBusiness `geo` sí). Son opcionales y no las incluimos por defecto.

---

## 6. Defaults y SSoT (`src/config/site.ts`)
`buildMeta` cae a estos defaults cuando la página no los provee (origen EVENTECH `site.ts:14–25`):
```ts
SITE.seo = {
  title: 'Renta de … | … en México',   // fallback sin marca al inicio
  titleTemplate: '%s | Equipo para … en México',
  titleMaxLength: 60,
  descriptionMaxLength: 160,
  description: 'Qué + para qué + zona + CTA, ≤160 chars.',
  image: '/og.jpg',                      // 1200×630
  type: 'website',
};
```
El `SITE` completo (con `seo`, `organization`, `business`, `contact`, `social`) es el contrato del scaffold — forma EVENTECH `site.ts`, ubicación PROYECTORED `src/config/site.ts`. Detalle del contrato en [[02 - Arquitectura Astro/01 - Scaffold y Estructura]] (pendiente).

---

## 7. Uso (página)
```astro
---
import { buildMeta } from '@lib/seo';
const meta = buildMeta({
  title: 'Renta de podiums profesionales en CDMX', // keyword-first, sin marca
  description: 'Renta y venta de podiums de acrílico y madera en CDMX. Entrega en 24h, personalización y garantía escrita.',
  canonical: '/renta-de-podiums',
  image: '/img/og/renta-podiums.jpg',
});
---
<Layout meta={meta}>...</Layout>
```

---

## Checklist on-page (por página)
- [ ] `title` keyword-first, ≤60, único, marca solo si cabe.
- [ ] `description` 120–160, fórmula qué+para qué+zona+CTA.
- [ ] `canonical` correcto (ruta relativa → `buildMeta` la normaliza).
- [ ] `og:image`/`twitter:image` 1200×630 con `alt`.
- [ ] `type: 'article'` en blog (con published/modified time).
- [ ] H1 único por página, alineado al `title` (no idéntico, complementario).
- [ ] Sin doble marca; sin descripción >160 (lo rechaza el gate de CI).
