# SOP 10 — QA final y publicación
> Propósito: correr el control bloqueante punto por punto, aprobar y publicar; con plan de rollback si algo sale mal.

Estación 6 (QA) → 7 (Deploy) de la [[01 - La Fabrica de Sitios]]. Ejecuta [[02 - Checklist QA Pre-Deploy]] de forma operativa. **El QA es bloqueante: si algo falla, regresa a la estación que lo originó.**

## Objetivo
Verificar el [[02 - Estandares de Calidad|estándar de calidad]] con comandos reales sobre el build de producción, dejar el checklist 100% verde, aprobar y publicar vía [[SOP 07 - Deploy Cloudflare Pages]], con rollback listo.

## Prerrequisitos
- Sitio completo: scaffold (SOP 01), contenido (SOPs 02–05), SEO (SOP 06), imágenes (SOP 08).
- Build local funcional: `npm run build && npm run preview`.
- Herramientas: `lighthouse` (o Lighthouse en DevTools), un link-checker (ej. `linkinator`/`lychee`).

## Pasos

1. **Build y código.**
   ```bash
   npm run check                 # astro check — sin errores de tipos
   npm run build                 # astro check && astro build — sin warnings de colecciones
   grep -rnE "console\.(log|debug)|TODO|FIXME|\{\{[A-Z_]+\}\}|lorem ipsum" dist/ && echo "⚠️ revisar" || echo "OK limpio"
   ```
   Cero `console`/TODO/placeholder/`{{...}}` en el output.

2. **SEO técnico** ([[SOP 06 - SEO tecnico y schema]]).
   ```bash
   npm run preview &             # sirve dist/ en :4321
   curl -sf http://localhost:4321/sitemap-index.xml >/dev/null && echo "sitemap OK"
   curl -s  http://localhost:4321/robots.txt | grep -i "Sitemap:"
   ```
   - `sitemap-index.xml` accesible; **sin** sitemap manual obsoleto en `public/`.
   - `robots.txt` con la URL correcta del sitemap.
   - `canonical` único por página; dominio = `astro.config.site` = sitemap.
   - `title` (≤60) y `description` (≤155) únicos; OG + Twitter Card en todas; OG image existe (no hotlink).

3. **Schema (JSON-LD).**
   - Copia el JSON-LD de una página de cada tipo y valida en **validator.schema.org** y **Rich Results Test**.
   - Tipos correctos por arquetipo ([[02 - Schema JSON-LD por tipo]]).
   - **BreadcrumbList una sola vez** por página (grep de control):
     ```bash
     grep -ro "BreadcrumbList" dist/ | sort | uniq -c   # 1 por archivo HTML
     ```
   - **Cero `aggregateRating`/`Review` fabricados:**
     ```bash
     grep -rl "aggregateRating" dist/ && echo "⚠️ revisar si hay reseñas reales" || echo "OK sin ratings"
     ```

4. **Performance (CWV).**
   ```bash
   npx lighthouse http://localhost:4321/ --preset=desktop --only-categories=performance --view
   npx lighthouse http://localhost:4321/ --form-factor=mobile --only-categories=performance --view
   ```
   - Móvil ≥90 en Performance; LCP < 2.5s; CLS < 0.1.
   - Imágenes AVIF/WebP con `width`/`height`; LCP `eager`+`fetchpriority`, resto `lazy`.
   - Fuentes self-hosted con preload; CSS crítico inline.

5. **Arquitectura e internal linking.**
   ```bash
   npx linkinator http://localhost:4321 --recurse --silent   # cero enlaces internos rotos
   ```
   - Breadcrumbs en todas las páginas internas; URLs coherentes con `TAXONOMY`; `trailingSlash:'never'`.

6. **Conversión.**
   - CTA WhatsApp arriba del fold; `WhatsAppFloat` presente.
   - Todo WhatsApp/tel sale de `site.ts` (`waUrl()`/`telUrl()`):
     ```bash
     grep -rnE "wa\.me/[0-9]" src/ && echo "⚠️ hardcode WhatsApp" || echo "OK waUrl"
     grep -rnE "55[\- ]?1234[\- ]?5678|0000|525500000000" src/ dist/ && echo "⚠️ contacto placeholder" || echo "OK contacto real"
     ```
   - Formulario: backend real, o WhatsApp/`mailto:` + `⚠️ HUECO` registrado (nunca `setTimeout` simulado).

7. **Accesibilidad.**
   - Un solo H1; jerarquía de headings correcta; `alt` en todas las imágenes; contraste AA.
   - Menús y acordeones navegables por teclado (`aria-*`).
   ```bash
   npx lighthouse http://localhost:4321/ --only-categories=accessibility --view
   ```

8. **Mobile-first.** Verifica en 1024 / 768 / 640 / 480 / 380 (DevTools): touch targets ≥44px; sin overflow horizontal.

9. **Seguridad y deploy.**
   ```bash
   git grep -nE "gho_|ghp_|sk-|api_key|AKIA|BEGIN PRIVATE KEY" -- . ':!*.md' || echo "OK sin secretos"
   git ls-files | grep -E "^dist/|node_modules/|\.env$" && echo "⚠️ artefacto versionado" || echo "OK repo limpio"
   ```
   - **Un solo destino de deploy** (sin drift Cloudflare↔GitHub Pages, ver [[SOP 07 - Deploy Cloudflare Pages]]).
   - `.gitignore` correcto; sin artefactos de build ni carpetas legacy versionadas.

10. **Aprobar y publicar.** Si **todo** el [[02 - Checklist QA Pre-Deploy]] está verde:
    ```bash
    git add -A && git commit -m "release: QA aprobado, publicación" && git push origin main
    ```
    Cloudflare Pages reconstruye y publica. Verificación post-deploy sobre el dominio real (paso 9 de [[SOP 07 - Deploy Cloudflare Pages]]).

11. **Rollback (si algo falla en producción).**
    - **Inmediato:** en Cloudflare Pages → **Deployments** → elige el deploy estable anterior → **Rollback** (vuelve en segundos, sin rebuild).
    - **Por código:** revierte el commit y push:
      ```bash
      git revert HEAD && git push origin main      # dispara nuevo deploy con el estado bueno
      ```
    - Registra qué falló y regresa a la estación que lo originó (no parchees en producción).

## Checklist de verificación
- [ ] `astro check` y `npm run build` sin errores ni warnings; output sin `console`/TODO/`{{...}}`.
- [ ] `sitemap-index.xml` y `robots.txt` correctos; canonical único; `title`/`description` en rango.
- [ ] Schema válido en Rich Results; **BreadcrumbList una vez**; **cero rating fabricado**.
- [ ] Lighthouse móvil ≥90; LCP<2.5s; CLS<0.1; imágenes dimensionadas; fuentes self-hosted.
- [ ] Cero enlaces internos rotos (link-checker); breadcrumbs en internas; `trailingSlash:'never'`.
- [ ] CTA WhatsApp arriba del fold + flotante; cero hardcode WhatsApp/tel; contacto real.
- [ ] Formulario con backend real o WhatsApp/`mailto:` + HUECO (nunca `setTimeout`).
- [ ] Un H1; `alt` en todas; navegación por teclado; mobile 1024→380 sin overflow; touch ≥44px.
- [ ] Cero secretos en el repo; sin artefactos versionados; **un solo destino de deploy**.
- [ ] Publicado; verificación post-deploy hecha; rollback probado/entendido.

## Errores comunes
- **Saltar el QA "porque urge".** El QA es bloqueante por diseño (regla 1 de la Fábrica). Lección: si algo falla, no se sube; se corrige en su estación.
- **QA sobre `dev` y no sobre el build.** `dev` oculta problemas de build/colecciones y rutas. Lección: corre QA sobre `npm run build && npm run preview`.
- **Placeholder en producción.** `{{...}}`, `lorem ipsum`, `55-0000-0000` colados al deploy. Lección: el grep del paso 1 y 6 es obligatorio antes de publicar.
- **BreadcrumbList o rating colados.** Anti-patrones B3/B4. Lección: los greps del paso 3 los cazan; sin reseñas reales no hay `aggregateRating`.
- **Enlaces internos rotos.** Como el `/capacitacion/` muerto en `BOMBERO/navigation.ts`. Lección: link-checker sobre el build, parte del gate.
- **Secreto o `dist/` versionado.** RENTADEILUMINACION (token), MESASPICNIC/RESOIL (artefactos). Lección: `git grep` + `git ls-files` antes de push.
- **Publicar con drift de deploy.** `_headers`/`_redirects` muertos por desplegar a GH Pages teniendo config CF. Lección: confirma destino único antes de publicar ([[SOP 07 - Deploy Cloudflare Pages]]).
- **Parchar en producción sin rollback.** Riesgo de dejar el sitio peor. Lección: usa el Rollback de Cloudflare o `git revert`, y arregla en la estación de origen.
