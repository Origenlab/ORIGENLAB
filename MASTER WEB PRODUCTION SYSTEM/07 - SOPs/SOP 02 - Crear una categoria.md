# SOP 02 — Crear una categoría
> Propósito: publicar una página de categoría (L2) que presenta un dominio, lista sus fichas hijas, interlinkea lateralmente y resuelve dudas con FAQ.

Estación 2 (Contenido) de la [[01 - La Fabrica de Sitios]]. Aplica a arquetipos **A · B · C**. Plantilla base: `08 - Biblioteca Plantillas/pagina-categoria.astro`.

## Objetivo
Una landing L2 en `/{categoria}/` con: hero, intro SEO, grid de fichas (L4), interlinking a otras categorías y bloque FAQ — con su `CollectionPage`+`ItemList`+`FAQPage` emitido por `buildSchema` (`pageType="category"`) y el breadcrumb una sola vez.

## Prerrequisitos
- Sitio creado con [[SOP 01 - Crear sitio nuevo]] (layouts y componentes montados).
- La categoría existe en `TAXONOMY.categories` de `src/config/site.ts` (slug kebab-case **sin acentos**).
- Componentes presentes: `Hero`, `SectionHeading`, `ProductCard` (o `ServiceCard`), `FAQAccordion`, `RelatedLinks`, `CTABanner` (ver [[09 - Biblioteca Componentes/00 - Inventario]]).

## Pasos

1. **Da de alta la categoría en `TAXONOMY`** (si no existe). En `src/config/site.ts`:
   ```ts
   categories: [
     { slug: 'extintores', label: 'Extintores', badge: null, href: '/extintores/' },
     // ...
   ],
   ```
   El `slug` debe coincidir con la carpeta de `/pages` y con el enum de `content.config.ts`. **Sin acentos** (regla [[04 - Convenciones]]; falla INFLAPY).

2. **Copia la plantilla** a su ruta L2 canónica:
   ```bash
   mkdir -p src/pages/extintores
   cp ".../08 - Biblioteca Plantillas/pagina-categoria.astro" src/pages/extintores/index.astro
   ```
   URL resultante: `/extintores/` (mapea con [[04 - Convenciones]]: L2 = `/{categoria}/`).

3. **Rellena los marcadores `{{...}}`** en `index.astro`:
   - `CATEGORY_SLUG` y `CATEGORY_LABEL` (los del `TAXONOMY`).
   - Hero: `{{HERO_TITULO_CATEGORIA}}`, `{{HERO_SUBTITULO_CATEGORIA}}`.
   - Intro: `{{KICKER_INTRO}}`, `{{TITULO_INTRO}}`, `{{PARRAFO_INTRO_1}}`, `{{PARRAFO_INTRO_2}}` (texto SEO real).
   - `title` del `PageLayout`: keyword-first **sin marca** (`buildMeta` añade el sufijo si cabe ≤60).
   - `description`: 140–160 chars.

4. **Conecta el grid a la colección** (en vez de tarjetas estáticas). Descomenta el import y filtra por categoría:
   ```astro
   ---
   import { getCollection } from "astro:content";
   const CATEGORY_SLUG = "extintores";
   const items = (await getCollection("productos", ({ data }) => !data.draft))
     .filter((p) => p.data.category === CATEGORY_SLUG);
   ---
   ```
   En el grid:
   ```astro
   <div class="cat-grid__items">
     {items.map((item, i) => (
       <ProductCard
         title={item.data.title}
         href={`/${CATEGORY_SLUG}/${item.id}`}
         image={item.data.image}
         imageAlt={item.data.title}
         description={item.data.description}
         priority={i === 0}
       />
     ))}
   </div>
   ```
   *(Para una categoría de servicios usa `ServiceCard` y la colección `servicios`.)*

5. **Pasa los items reales al `schemaData.list`** (no los dejes como `{{FICHA_1_TITULO}}`):
   ```ts
   const schemaData = {
     list: {
       name: CATEGORY_LABEL,
       description: "Extintores certificados NOM con recarga y mantenimiento.",
       path: `/${CATEGORY_SLUG}`,
       items: items.map((i) => ({ name: i.data.title, path: `/${CATEGORY_SLUG}/${i.id}` })),
     },
     faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
   };
   ```

6. **Escribe la FAQ una sola vez** en el array `faqs` (objetos `{ q, a }`). El bloque visible (`FAQAccordion`) y el `FAQPage` del schema usan **las mismas preguntas** (regla Google: contenido = schema). No actives `emitSchema` en `FAQAccordion` — el JSON-LD lo emite `seo.ts`.

7. **Configura el interlinking lateral** con `RelatedLinks` y `otherCategories` (ya viene en la plantilla: filtra `TAXONOMY.categories` excluyendo la actual). Es interlinking deliberado (B6).

8. **Cierra con `CTABanner`** WhatsApp-first (ya en la plantilla; el botón usa `waUrl()`).

9. **Verifica los breadcrumbs.** La plantilla pasa `breadcrumbs={[{ label: CATEGORY_LABEL }]}`; `PageLayout` antepone "Inicio" y emite el `BreadcrumbList` **una sola vez** vía `buildSchema`. No dupliques migas.

10. **Build:**
    ```bash
    npm run build && npm run preview
    ```

## Checklist de verificación
- [ ] Categoría dada de alta en `TAXONOMY.categories` (slug sin acentos, `href` coherente).
- [ ] Archivo en `src/pages/{categoria}/index.astro`; URL `/{categoria}/` sin slash final (`trailingSlash:'never'`).
- [ ] Cero `{{...}}`: hero, intro, `title`, `description` y FAQ con contenido real.
- [ ] Grid alimentado desde la colección (`getCollection` + filtro por `category`), no tarjetas hardcodeadas.
- [ ] `schemaData.list.items` mapeado desde la colección (no marcadores).
- [ ] FAQ visible == FAQ del schema (mismas preguntas); `FAQAccordion` sin `emitSchema`.
- [ ] `RelatedLinks` apunta a otras categorías reales (interlinking B6).
- [ ] CTA WhatsApp con `waUrl()`; sin números hardcodeados.
- [ ] Breadcrumb único (lo emite `buildSchema`, no el componente).
- [ ] `npm run build` verde; categoría visible en `sitemap-index.xml`.

## Errores comunes
- **Categorías hechas a mano y duplicadas por acento.** INFLAPY tuvo "Guias" vs "Guías" como categorías distintas → tráfico fragmentado. Lección: slug en kebab-case sin acentos, fuente única en `TAXONOMY` + enum cerrado.
- **Grid hardcodeado en `.astro`.** Anti-patrón D1/D3 (EVENTECH/RENTADEILUMINACION: cientos de `.astro` a mano). Lección: el grid nace de la colección; añadir un producto = añadir un `.md`, no editar la categoría.
- **FAQ visible distinta del schema.** Google marca el `FAQPage` como spam si las preguntas del JSON-LD no aparecen en la página. Lección: una sola fuente `faqs`, reutilizada en componente y `schemaData`.
- **Doble `FAQPage`.** Activar `emitSchema` en `FAQAccordion` **y** pasar `faqs` a `schemaData` duplica el JSON-LD. Lección: emítelo solo en `seo.ts` (default del componente es `emitSchema:false`).
- **Breadcrumb duplicado.** Anti-patrón B3 (BOMBERO/RENTADEILUMINACION emitían `BreadcrumbList` en layout *y* en `Breadcrumbs.astro`). Lección: el componente solo pinta microdata; el JSON-LD lo emite `buildSchema` una vez.
- **`title` con la marca al inicio.** `buildMeta` ya añade ` | <marca>` si cabe; ponerla tú duplica la marca y come caracteres SEO. Lección: keyword primero, sin marca en el `title`.
