# SOP 04 — Crear artículo SEO
> Propósito: publicar un artículo de blog como `.mdx` en la colección `articulos`, con frontmatter tipado, interlinking deliberado y schema Article — nunca como `.astro` suelto.

Estación 2 (Contenido) de la [[01 - La Fabrica de Sitios]]. Aplica a **A · B · C · D** (todo arquetipo puede tener blog). Plantilla: `08/pagina-articulo.mdx` (+ `ArticleLayout`). **Regla D3: el blog SIEMPRE en colección `.mdx`.**

## Objetivo
Un artículo en `/blog/{slug}/` desde la colección `articulos`, validado por Zod, renderizado en `ArticleLayout` con `pageType="article"`, con imagen obligatoria, interlinking a fichas/otros artículos y `Article` JSON-LD emitido por `seo.ts`.

## Prerrequisitos
- Sitio creado con [[SOP 01 - Crear sitio nuevo]] **con MDX habilitado** (`@astrojs/mdx@^6` ya viene en el scaffold: `package.json` + `mdx()` en `astro.config.mjs`). NO uses `npx astro add mdx` (instala v4, incompatible con astro 6).
- Colección `articulos` activa en `content.config.ts` y su `category` en el enum `ARTICLE_CATEGORIES`.
- Ruta dinámica del blog: `src/pages/blog/[...slug].astro` (renderiza dentro de `ArticleLayout`).
- Imagen de portada en `public/images/blog/` (AVIF, ver [[SOP 08 - Generar e integrar imagenes]]).

## Pasos

1. **Asegura la ruta dinámica del blog.** Si no existe, créala (mapea `articulos` → `ArticleLayout`):
   ```bash
   mkdir -p src/pages/blog
   ```
   ```astro
   ---
   // src/pages/blog/[...slug].astro
   import { getCollection, getEntries, render } from "astro:content";
   import ArticleLayout from "../../layouts/ArticleLayout.astro";

   export async function getStaticPaths() {
     const posts = await getCollection("articulos", ({ data }) => !data.draft);
     return posts.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
   }
   const { entry } = Astro.props;
   const d = entry.data;
   const relatedRefs = [...(d.relatedPosts ?? []), ...(d.relatedServices ?? []), ...(d.relatedProducts ?? [])];
   const related = relatedRefs.length
     ? (await getEntries(relatedRefs as any)).map((r: any) => ({
         label: r.data.title,
         href: `/${r.collection === "articulos" ? "blog" : r.collection}/${r.id}`,
       }))
     : [];
   const { Content } = await render(entry);
   ---
   <ArticleLayout
     title={d.title} description={d.description} category={d.category}
     pubDate={d.pubDate} updatedDate={d.updatedDate} author={d.author}
     image={d.heroImage} imageAlt={d.title} tags={d.tags} related={related}
   >
     <Content />
   </ArticleLayout>
   ```

2. **Crea el artículo `.mdx`** desde la plantilla (el `id` del archivo = slug de URL):
   ```bash
   cp ".../08 - Biblioteca Plantillas/pagina-articulo.mdx" "src/content/articulos/como-elegir-extintor.mdx"
   ```
   URL resultante: `/blog/como-elegir-extintor/`.

3. **Llena el frontmatter respetando el schema `articulos`** (Zod `.strict()`):
   ```mdx
   ---
   title: "Cómo elegir el extintor correcto"          # 10–70 chars (sin marca)
   description: "Guía práctica para elegir extintor por tipo de fuego, capacidad y normativa NOM, con ejemplos para oficina y hogar."  # 70–160
   category: "guias"                                    # DEBE estar en ARTICLE_CATEGORIES (sin acentos)
   heroImage: "/images/blog/elegir-extintor.avif"       # OBLIGATORIA, ruta ^/images/
   pubDate: 2026-06-18                                   # ISO YYYY-MM-DD
   author: "Mi Cliente"
   tags: ["extintores", "seguridad"]
   relatedProducts: ["extintor-pqs-6kg"]                # reference() (slug sin extensión)
   relatedServices: ["recarga-extintores"]
   relatedPosts: ["normativa-nom-154"]
   draft: false
   ---
   ```

4. **Escribe el cuerpo en MDX** siguiendo la estructura de la plantilla:
   - **Un solo H1** lo pone el layout (el `title`); en el cuerpo empieza en `##` (H2).
   - Responde la intención de búsqueda en las **primeras 2–3 líneas**.
   - Usa H2/H3, listas y tablas para escaneabilidad.
   - Español de México, sin relleno.

5. **Interlinking deliberado (B6).** Enlaza dentro del texto a fichas de producto/servicio y a otros artículos. Además usa `relatedProducts/Services/Posts` en el frontmatter (el layout los pinta con `RelatedLinks`).

6. **Verifica el schema.** `ArticleLayout` pasa `pageType="article"`; `seo.ts` arma `Article` con `headline`, `datePublished`, `dateModified` (= `pubDate` si no hay `updatedDate`), `author`/`publisher` y `inLanguage: es-MX`. El breadcrumb (`Blog → título`) lo emite `buildSchema` una vez.

7. **Imagen.** `heroImage` obligatoria, AVIF, dimensionada, con `alt` (el layout usa `imageAlt={d.title}`). Nombre de archivo con keyword (ver [[SOP 08 - Generar e integrar imagenes]]).

8. **Build:**
   ```bash
   npm run build && npm run preview
   ```

## Checklist de verificación
- [ ] `@astrojs/mdx@^6` instalado y `mdx()` en `astro.config.mjs` (lo exige la colección). NUNCA v4 con astro 6.
- [ ] Artículo en `src/content/articulos/{slug}.mdx` (NO un `.astro` en `src/pages/blog/`).
- [ ] Frontmatter pasa Zod `.strict()`; `title` 10–70, `description` 70–160, `category` en el enum.
- [ ] `heroImage` presente (`^/images/`), AVIF, con keyword en el nombre.
- [ ] `pubDate` en ISO; `author` definido.
- [ ] Cuerpo: un solo H1 (del layout), H2+ en el texto, intención resuelta arriba.
- [ ] Interlinking en el cuerpo + `related*` en frontmatter (B6).
- [ ] `Article` JSON-LD validado en Rich Results; breadcrumb único.
- [ ] `npm run build` verde; el artículo aparece en el sitemap (prioridad blog).

## Errores comunes
- **Blog como `.astro` sueltos.** Anti-patrón D3 confirmado: MESASPICNIC (75 archivos), RENTADEILUMINACION (128), PODIUMEX. Imposible de mantener y sin schema consistente. Lección: el blog vive **siempre** en colección `.mdx`.
- **Olvidar `@astrojs/mdx` o instalar la versión equivocada.** La colección `articulos` usa `glob` sobre `**/*.mdx`; sin la integración el build falla. El scaffold ya trae `@astrojs/mdx@^6` y `mdx()` en la config. ⚠️ `npx astro add mdx` instala `@astrojs/mdx@^4` (peer `astro@^5`) y ROMPE con astro 6: usa `^6`.
- **`category` con acento.** "Guías" vs "Guias" como categorías distintas (INFLAPY) fragmenta el blog. Lección: enum cerrado, slug sin acentos.
- **Dos H1.** El layout ya emite el H1 (title). Poner `#` en el cuerpo crea jerarquía rota (falla de accesibilidad QA). Lección: empieza el cuerpo en `##`.
- **`heroImage` faltante o no AVIF.** El schema Zod la exige (`imagePath`); además una portada pesada en JPG mata el LCP. Lección: AVIF dimensionada bajo `/images/blog/`.
- **Fecha que cambia en cada build.** Poner `new Date()` en `dateModified` hace que Google ignore la señal. Lección: `updatedDate` solo cuando edites de verdad (la plantilla usa `pubDate` como default).
- **Interlinking inexistente.** Un artículo huérfano no transfiere autoridad ni capta. Lección: enlaza a fichas A/B/C y deriva al CTA (la conversión del blog es captar y mandar a producto/servicio, ver [[01 - Selector de Arquetipo]]).
