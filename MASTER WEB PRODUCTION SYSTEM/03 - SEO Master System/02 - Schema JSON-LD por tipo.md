# 02 — Schema JSON-LD por tipo
> Propósito: definir qué structured data emitir por arquetipo (A/B/C/D) y por tipo de página, cómo enlazar todo por `@id`, y la regla dura de cero datos fabricados.

Todo el JSON-LD se genera desde `buildSchema(pageType, data)` en [[../08 - Biblioteca Plantillas/_seo/seo.ts]]. El layout serializa el array resultante con un emisor `<JsonLd>`. Origen del patrón: `PODIUMEX/src/data/schema.ts` (`globalGraph()` con `@graph` y nodos `@id` reutilizables — el más limpio del ecosistema) + `EVENTECH/src/utils/seo.ts` (10 generadores con `@id` linking).

---

## 1. El grafo `@id` (consolidación de entidad)
El grafo base se emite como UN objeto con `@graph` para que Google consolide las tres entidades raíz en UNA. Cada nodo de página las referencia por `@id` (nunca se redefinen):

| Entidad | `@id` | Función |
|---|---|---|
| Organization | `${url}/#organization` | Publisher; autor/editor de artículos, manufacturer de productos. |
| WebSite | `${url}/#website` | + `SearchAction` si `SITE.searchUrl`. `isPartOf` de páginas. |
| LocalBusiness | `${url}/#localbusiness` | `provider`/`seller`/`about`. Solo si hay sede/área. |
| ImageObject (logo) | `${url}/#logo` | Logo referenciado por Organization y LocalBusiness. |

Evidencia: PODIUMEX `schema.ts:43–93` (`BUSINESS_ID`/`WEBSITE_ID`, `businessNode`/`websiteNode`, `globalGraph()`), EVENTECH `seo.ts:45–144` (`organizationJsonLd`/`websiteJsonLd`/`localBusinessJsonLd` con `@id` y `parentOrganization`), BOMBERO `seo.ts:189–346` (mismo trío, `@type: Store`).

> **Anti-duplicado LocalBusiness:** si una página de zona inyecta su propio LocalBusiness, no debe re-emitir el global. EVENTECH lo resuelve con un `overrides.id`; nuestro `localBusinessSchema({areaServed})` mantiene el mismo `@id` y solo cambia `areaServed`.

---

## 2. Schema por arquetipo
Los arquetipos vienen de [[../_PATRONES/patrones-canonicos]] §B2. `pageType` selecciona el constructor.

### Arquetipo A — Catálogo de producto / técnico
*(FIREFIGHTERMX, BOMBERO, PROYECTORED, MESECI)*
- **Home:** grafo base (`buildSchema('home')`).
- **Categoría (L2/L3):** `buildSchema('category', { list })` → `CollectionPage` + `ItemList` + `breadcrumbs`.
- **Producto (L4/L5):** `buildSchema('product', { product, breadcrumbs, faqs? })` → `Product` + `Offer` + `BreadcrumbList` (+ `FAQPage` si hay FAQ visibles).
- **Offer honesto:** si no hay precio público, `Offer` "bajo cotización" con `UnitPriceSpecification` (origen BOMBERO `seo.ts:466–473` — modelo WhatsApp-first sin precio).

### Arquetipo B — Renta / eventos
*(EVENTECH, RESOIL, RENTADEILUMINACION, PODIUMEX)*
- **Servicio de renta:** `buildSchema('service', { service })` → `Service` + `ServiceChannel` + `areaServed` multi-ciudad. Origen: PODIUMEX `serviceSchema:162–178`, EVENTECH `serviceJsonLd:147–186`.
- **Producto de renta:** `Product` + `Offer` si hay ficha (PODIUMEX combina A+B: usa `productSchema` para podiums y `serviceSchema` para servicios de evento).
- **OfferCatalog** opcional en el LocalBusiness para listar categorías (origen BOMBERO `seo.ts:297–327`).

### Arquetipo C — Servicio profesional local
*(SEGURIDADPRIVADA, CAMARADESEGURIDAD, LGACONTRAINCENDIOS)*
- **Home:** LocalBusiness con `@type` compuesto, p.ej. `['LocalBusiness','SecurityService','ProfessionalService']` (configurable vía `SITE.business.type`). Origen: `SEGURIDADPRIVADA/src/pages/index.astro:38–89` (`@graph` con SecurityService/ProfessionalService + Organization + Brand + WebSite+SearchAction + FAQPage).
- **Servicio:** `buildSchema('service', { service, breadcrumbs, faqs })` → `Service` + `BreadcrumbList` + `FAQPage`.
- **Zona:** `Service`/`LocalBusiness` con `areaServed` de esa zona (override `data.areaServed`).
- Clave del arquetipo: `geo` + `address` + `openingHoursSpecification` + `areaServed` (presentes en `localBusinessSchema()`).

### Arquetipo D — Directorio / contenido programático
*(FIREFIGHTERCOMMX, BARBERIA, CDMXSITE; módulo D en BOMBERO/EVENTECH)*
- **Listado (estado/zona):** `buildSchema('directory', { list, areaServed })` → `CollectionPage` + `ItemList` + `Place`. Origen: EVENTECH `collectionPageJsonLd:340–370` + `itemListJsonLd:317–337`.
- **Ficha de entidad:** schema específico de dominio. El más rico del ecosistema: `BOMBERO/EstacionLayout.astro:180+` emite `['FireStation','EmergencyService']` + `GovernmentOrganization` + `HowTo` + `SpeakableSpecification`. Para directorios genéricos: `Place`/`LocalBusiness`/`EventVenue` (EVENTECH `venueJsonLd:373–477`).

> Resumen rápido (patrón B2):
> - **A:** Product + Offer + BreadcrumbList
> - **B:** Service + OfferCatalog
> - **C:** LocalBusiness + Service + geo + areaServed
> - **D:** CollectionPage/ItemList + (EventVenue | FireStation | Place)
> Más Organization + WebSite+SearchAction + BreadcrumbList en todos, enlazados por `@id`.

---

## 3. Tabla página → `pageType` → schema emitido

| Página | `pageType` | Nodos JSON-LD |
|---|---|---|
| Home | `home` | `@graph` [Organization, WebSite(+SearchAction), LocalBusiness] |
| Categoría L2 | `category` | + CollectionPage + ItemList + BreadcrumbList |
| Producto L4/L5 | `product` | + Product + Offer (+ FAQPage) + BreadcrumbList |
| Servicio | `service` | + Service + ServiceChannel (+ FAQPage) + BreadcrumbList |
| Artículo blog | `article` | + Article/BlogPosting + BreadcrumbList |
| Directorio/zona | `directory` | + CollectionPage + ItemList + Place + BreadcrumbList |
| FAQ dedicada | `faq` | + FAQPage + BreadcrumbList |

Notas:
- `breadcrumbs` se pasa SIEMPRE que la página tenga ruta jerárquica → `buildSchema` añade `BreadcrumbList` una sola vez.
- `faqs` puede acompañar a `product`/`service` si las preguntas están **visibles** en la página (regla de Google).

---

## 4. ⚠️ REGLA DURA — Cero datos estructurados fabricados
Patrón B4 (6+ proyectos fabricaban ratings: BRINCOLINS, MESECI…). **El Vault prohíbe inventar señales de confianza.**

- **NUNCA** se emite `aggregateRating` ni `Review` sobre la propia entidad sin reseñas REALES y verificables de terceros. Google penaliza reseñas auto-emitidas (self-serving) con acción manual.
- En `seo.ts`, la función `emitReviews()` devuelve `{}` (nada) salvo que:
  1. `SITE.allowSelfReviews === true` (default `false`), **y**
  2. cada review tenga `author`, `text`, `rating` 1–5 y `date` válidos.
- Modelo correcto del ecosistema:
  - **PODIUMEX** `schema.ts`: `grep aggregateRating/reviewCount/ratingValue = 0` (auditoría confirma cero ratings fabricados).
  - **EVENTECH** `seo.ts:216–223`: `serviceWithReviewJsonLd` recibe reviews pero las **omite** del JSON-LD con comentario "Google prohíbe reseñas self-serving"; emite `Service` SIN rating.

> Si en el futuro hay reseñas verificables (p.ej. importadas de Google Business Profile), activar `SITE.allowSelfReviews` y pasarlas a `productSchema`/`serviceSchema`. En la duda: vacío.

Lo que SÍ se puede mostrar: reseñas como **contenido visible** (componente de testimonios) sin marcarlas como `Review` schema. Política de testimonios B2B de aliados: EVENTECH `REVIEWS` (12, todas con dominio real) — visibles, no inyectadas como rating propio.

---

## 5. ⚠️ REGLA DURA — Breadcrumb una sola vez
Patrón B3. Anti-patrón confirmado:
- **BOMBERO:** `/productos/` usa `<Breadcrumb>` (que emite su propio `BreadcrumbList`) **y además** pasa `breadcrumbJsonLd()` en `jsonLd` → doble `BreadcrumbList` (`index.astro:17,76`; `Breadcrumb.astro` auto-emite schema).
- **RENTADEILUMINACION:** breadcrumb en BaseLayout **y** en `Breadcrumbs.astro`.

**Solución del Vault:** el `BreadcrumbList` JSON-LD se emite ÚNICAMENTE en `buildSchema()` cuando recibe `data.breadcrumbs`. El componente `<Breadcrumb>` visual renderiza la UI pero **NO** emite JSON-LD. Una fuente, un emisor.

---

## 6. Cómo se consume (página de ejemplo)
```astro
---
// src/pages/catalogo/[slug].astro  (Arquetipo A)
import Layout from '@layouts/ProductLayout.astro';
import { buildMeta, buildSchema } from '@lib/seo';

const { producto } = Astro.props;
const meta = buildMeta({
  title: producto.seoTitle,
  description: producto.seoDescription,
  canonical: `/catalogo/${producto.slug}`,
  image: producto.images[0],
});
const schema = buildSchema('product', {
  breadcrumbs: [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: producto.name, path: `/catalogo/${producto.slug}` },
  ],
  product: {
    name: producto.name,
    description: producto.seoDescription,
    path: `/catalogo/${producto.slug}`,
    images: producto.images,
    sku: producto.sku,
    // sin `price` → Offer "bajo cotización"; sin `reviews` → sin rating
  },
  faqs: producto.faqs, // solo si están visibles en la página
});
---
<Layout meta={meta} schema={schema}>
  <!-- contenido; el layout serializa `schema` con <JsonLd> -->
</Layout>
```

---

## Checklist schema (por página)
- [ ] `pageType` correcto para el arquetipo.
- [ ] Grafo base con `@id` consolidado (Organization/WebSite/LocalBusiness).
- [ ] `breadcrumbs` pasado → `BreadcrumbList` (y `<Breadcrumb>` NO emite JSON-LD).
- [ ] `Offer` con precio real o "bajo cotización" (nunca precio inventado).
- [ ] Sin `aggregateRating`/`Review` salvo reseñas reales verificables.
- [ ] `FAQPage` solo si las preguntas son visibles en la página.
- [ ] Validado en Rich Results Test antes de publicar.
