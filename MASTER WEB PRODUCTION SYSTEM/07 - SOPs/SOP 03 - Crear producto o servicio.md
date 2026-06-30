# SOP 03 — Crear producto o servicio
> Propósito: publicar una ficha L4 (producto o servicio) desde una Content Collection, con su schema Product/Service honesto y cero rating fabricado.

Estación 2 (Contenido) de la [[01 - La Fabrica de Sitios]]. Producto → arquetipo **A**; servicio → arquetipos **B · C**. Plantillas: `08/pagina-producto.astro` (+ `ProductLayout`) o `08/pagina-servicio.astro` (+ `ServiceLayout`).

## Objetivo
Generar **una página por entrada** de la colección (`productos` o `servicios`) mediante ruta dinámica `[...slug]`, con frontmatter validado por Zod `.strict()`, render schema-driven y JSON-LD `Product`+`Offer` o `Service` emitido por `seo.ts` — **sin inventar precios ni reseñas**.

## Prerrequisitos
- Sitio creado con [[SOP 01 - Crear sitio nuevo]]; la categoría existe ([[SOP 02 - Crear una categoria]]).
- `src/content.config.ts` con la colección activa (`productos` y/o `servicios`) y su `category` en el enum.
- Layout correcto en `src/layouts/`: `ProductLayout.astro` (producto) o `ServiceLayout.astro` (servicio).
- Imagen de la ficha lista en `public/images/...` (AVIF dimensionada, ver [[SOP 08 - Generar e integrar imagenes]]).

## Pasos

1. **Crea la ruta dinámica** (una sola por colección, sirve todas las fichas):
   - Producto:
     ```bash
     mkdir -p src/pages/productos
     cp ".../08 - Biblioteca Plantillas/pagina-producto.astro" "src/pages/productos/[...slug].astro"
     ```
   - Servicio:
     ```bash
     mkdir -p src/pages/servicios
     cp ".../08 - Biblioteca Plantillas/pagina-servicio.astro" "src/pages/servicios/[...slug].astro"
     ```
   Ambas ya traen `getStaticPaths()` (filtra `draft`), mapean frontmatter→props y renderizan el cuerpo con `<Content />`. **No las edites por ficha** — el contenido vive en la colección.

2. **Crea la entrada `.md` en la colección.** El `id` del archivo (sin extensión) **es el slug de la URL**:
   ```bash
   # Producto → /productos/extintor-pqs-6kg
   touch src/content/productos/extintor-pqs-6kg.md
   ```

3. **Llena el frontmatter respetando el schema Zod `.strict()`** de `content.config.ts`. Para `productos`:
   ```md
   ---
   title: "Extintor PQS 6 kg certificado NOM"        # 10–110 chars
   description: "Extintor de polvo químico seco ABC de 6 kg con certificación NOM, ideal para oficinas y comercios."  # 70–280
   category: "extintores"                            # DEBE estar en el enum PRODUCT_CATEGORIES
   image: "/images/productos/extintor-pqs-6kg.avif"  # obligatoria, ruta absoluta bajo /images/
   price: "Desde $850"                               # string libre; OMITE si es "bajo cotización"
   sku: "EXT-PQS-6"
   brand: "Mi Cliente"
   relatedProducts: ["extintor-co2-5kg"]             # reference() tipado (slug, sin extensión)
   relatedServices: ["recarga-extintores"]
   faqs:
     - question: "¿Incluye certificado NOM?"
       answer: "Sí, cada extintor entrega su constancia NOM-154-SCFI para auditorías."
   featured: false
   draft: false
   ---

   Cuerpo en Markdown del producto. Va al <Content /> del ProductLayout.
   ```
   Para `servicios`: usa `pricing` (objeto con `min/max/unit/note`), `includes` (array), `isHub`, `hero`. Ver el bloque `servicios` en `content.config.ts`.

4. **Sobre el precio (Offer honesto).** Si el negocio es WhatsApp-first sin precio público, **omite `price`**: `seo.ts` emite un `Offer` "bajo cotización" (`UnitPriceSpecification`, patrón BOMBERO). No pongas `price: "0"` ni un precio falso.

5. **Sobre reseñas/rating (regla dura B4).** **No** añadas `aggregateRating` ni `Review` salvo que existan reseñas reales verificables de terceros. La colección `casos` admite `rating` solo por caso real (no se agrega a un rating global). `seo.ts` ignora reseñas a menos que `SITE.allowSelfReviews` sea `true` y cada reseña sea válida.

6. **Verifica el contrato de schema.** La plantilla pasa `pageType="product"`/`"service"` al layout y este llama `buildSchema`. Datos que consume `seo.ts`:
   - `product { name, description, path, images[], sku?, brand?, category?, price?, availability? }` → `Product` + `Offer` (+ `FAQPage` si hay faqs).
   - `service { name, description, path, serviceType?, image?, areaServed?, priceRange? }` → `Service` (+ `FAQPage`).

7. **Interlinking.** Llena `relatedProducts`/`relatedServices` con slugs reales (`reference()` tipado). La plantilla resuelve las referencias con `getEntries` y las pinta con `RelatedLinks` (B6).

8. **Bloques ricos (opcionales).** Specs/applications/certifications (producto) o los 10 bloques editoriales (servicio: `protocolSteps`, `timeline`, `modalities`, `clinicalCases`, `myths`, `comparison`...) **no** están en el schema base. Si los necesitas: añádelos al schema en `content.config.ts` y **descomenta** el mapeo en la plantilla. `ProductLayout`/`ServiceLayout` ya los aceptan y solo pintan la sección si el array trae datos (no rompen si faltan).

9. **Repite el paso 2–3 por cada ficha** (un `.md` por producto/servicio). Añadir catálogo = añadir archivos, nunca páginas `.astro`.

10. **Build:**
    ```bash
    npm run build && npm run preview
    ```
    Verifica que `astro check` no marque campos desconocidos (los rechaza `.strict()`).

## Checklist de verificación
- [ ] Ruta dinámica única (`src/pages/{productos|servicios}/[...slug].astro`); sin fichas `.astro` sueltas.
- [ ] Una entrada `.md` por ficha en `src/content/{productos|servicios}/`; `id` = slug de URL.
- [ ] Frontmatter pasa Zod `.strict()` (sin campos desconocidos); `category` en el enum.
- [ ] `image` presente, ruta `^/images/`, en AVIF dimensionada.
- [ ] Precio honesto: `price` real o **omitido** (Offer "bajo cotización"); nunca precio falso.
- [ ] **Cero `aggregateRating`/`Review` fabricados** (solo reseñas reales).
- [ ] `relatedProducts`/`relatedServices` con slugs válidos (interlinking resuelto).
- [ ] `pageType` correcto y JSON-LD `Product`/`Service` validado en Rich Results ([[SOP 06 - SEO tecnico y schema]]).
- [ ] CTA WhatsApp del layout funcionando (`waUrl`); breadcrumb único.
- [ ] `npm run build` verde; las fichas aparecen en el sitemap.

## Errores comunes
- **Fichas como `.astro` sueltas.** Anti-patrón D1/D3 (EVENTECH/RENTADEILUMINACION: cientos de páginas a mano → deuda imposible de mantener). Lección: toda entidad repetible = Content Collection + ruta `[...slug]`.
- **Rating/reseñas fabricados.** 6+ proyectos lo hacían → riesgo de acción manual de Google y pérdida de rich results (B4). Lección: sin reseñas reales verificables, `seo.ts` no emite nada — déjalo así.
- **Precio inventado para "tener Offer".** Lección: omite `price` y deja el `Offer` "bajo cotización"; es honesto y válido (patrón BOMBERO).
- **Campo extra en el frontmatter** (ej. `hero_image:` en vez de `heroImage:`). Antes Zod lo ignoraba en silencio; con `.strict()` (MESECI) el build **falla** — eso es bueno, corrige el nombre, no relajes el schema.
- **`category` que no está en el enum.** El build falla por enum cerrado. Lección: añade el slug al enum de `content.config.ts` y a `TAXONOMY` antes de crear la ficha.
- **God-layout con 24+ props.** Anti-patrón A7 (GAMADEMEXICO `Base` 24 props; BOMBERO `ProductoLayout`). Lección: usa el `ProductLayout`/`ServiceLayout` canónico (2 niveles + tipo); los bloques ricos son props opcionales, no un layout nuevo.
- **Imagen sin `width`/`height`.** Causa CLS y baja Lighthouse. Lección: AVIF dimensionada en `/images/` (ver [[SOP 08 - Generar e integrar imagenes]]).
