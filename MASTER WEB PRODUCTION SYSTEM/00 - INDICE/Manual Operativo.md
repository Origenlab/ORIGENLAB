# Manual Operativo — construir un sitio de cero a producción
> Propósito: la guía end-to-end. Si solo lees un documento para construir un sitio, es este. Te lleva por la [[01 - La Fabrica de Sitios|línea de ensamblaje]] estación por estación.

Supuesto: persona nueva, sin contexto, usando **solo este Vault**. Ejemplo guía: un sitio **Tipo C** (servicio de seguridad privada local).

## Estación 0 — Selección (15 min)
1. Lee el brief del cliente. Aplica [[01 - Selector de Arquetipo]].
2. Decide arquetipo primario (+ secundario). *Ej.: seguridad local → C, con módulo D de blog.*
3. Esboza la taxonomía/URLs (servicios + zonas de cobertura) → alimentará `TAXONOMY`.
4. Define qué `pageType` de schema usarás (C → LocalBusiness + Service + geo).

## Estación 1 — Scaffold ([[SOP 01 - Crear sitio nuevo]])
1. `npm create astro@latest` (plantilla minimal, Astro 6).
2. Copia `08 - Biblioteca Plantillas/_scaffold/` → `src/` (site.ts, content.config.ts, tokens.css) y raíz (astro.config.mjs, package.json, tsconfig, .gitignore).
3. **Llena `site.ts` con datos REALES** del cliente: `SITE`, `CONTACT` (teléfono/WhatsApp/email/dirección/geo reales — cero placeholders), `TAXONOMY`, `WA_MESSAGES`.
4. Copia `_layouts/` y los componentes de `09 - Biblioteca Componentes/_src/` a `src/`.
5. `npm install && npm run build` → debe compilar limpio.

## Estación 2 — Contenido ([[SOP 02 - Crear una categoria]] · [[SOP 03 - Crear producto o servicio]] · [[SOP 04 - Crear articulo SEO]])
1. Da de alta cada servicio en la colección `servicios` (Zod estricto) y cada zona en `zonas`.
2. Genera las páginas con las plantillas `pagina-categoria`, `pagina-servicio`, `pagina-directorio-[...slug]` — **data-driven**, no a mano.
3. Blog: artículos `.mdx` en la colección `articulos` (regla D3). Ver [[02 - Blog y Articulos SEO]].
4. FAQs y casos reales: [[04 - FAQs y Casos de Exito]] (sin reseñas fabricadas).

## Estación 3 — SEO ([[SOP 06 - SEO tecnico y schema]])
1. `seo.ts` ya emite el schema por `pageType`; verifica que cada página pase el `pageType` correcto.
2. Confirma `sitemap` (integración), `robots.txt` (de `_seo/`), `canonical`, `trailingSlash: 'never'`.
3. Valida en Rich Results Test. Breadcrumb una sola vez; cero rating fabricado.

## Estación 4 — Diseño
1. Personaliza la marca editando **solo** `tokens.css` (`--c-primary`, `--font-*`). Ver [[04 - Diseño y UX/01 - Design Tokens|Design Tokens]].
2. Ensambla las páginas con los componentes de `09` en el orden de [[02 - Componentes y Jerarquia]].
3. Conversión: CTA WhatsApp arriba del fold ([[03 - UX y Conversion]]).

## Estación 5 — Imágenes ([[SOP 08 - Generar e integrar imagenes]])
1. Produce/optimiza a AVIF dimensionado, naming-keyword y `alt`. (fal.ai = ⚠️ HUECO; hoy manual.)
2. Configura `rewrite-cdn.mjs` post-build si usas CDN.

## Estación 6 — QA ([[SOP 10 - QA final y publicacion]] + [[02 - Checklist QA Pre-Deploy]])
1. `astro check` + `npm run build` + `lighthouse` + link-checker.
2. Recorre el checklist completo. **Bloqueante**: si algo falla, vuelve a la estación que lo originó.
3. `git grep -E "gho_|sk-|api_key"` vacío.

## Estación 7 — Deploy ([[SOP 07 - Deploy Cloudflare Pages]])
1. Repo en GitHub bajo `Origenlab`.
2. Conectar Cloudflare Pages (build `npm run build`, output `dist`, `NODE_VERSION=22`).
3. Dominio + DNS; `_headers`/`_redirects` (CF los respeta).
4. **Un solo destino** (no GH Pages en paralelo). Verificación post-deploy.

## Resultado
Un sitio que pasa el [[02 - Estandares de Calidad]] con la calidad de PROYECTORED/EVENTECH/BOMBERO. Si vas a producir blog continuo, evalúa [[SOP 09 - Automatizacion de contenido]] (⚠️ HUECO hasta cablear n8n).

Pendientes de evolución del sistema: [[Roadmap de Optimizacion]].
