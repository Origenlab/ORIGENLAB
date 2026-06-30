# Checklist QA Pre-Deploy
> Propósito: el control bloqueante antes de publicar. Si algo falla, no se sube. Verifica el [[02 - Estandares de Calidad]].

Corre en local con build de producción: `npm run build && npm run preview`.

## Build y código
- [ ] `astro check` sin errores de tipos.
- [ ] `npm run build` sin warnings de contenido/colecciones.
- [ ] Cero `console`/TODO/datos placeholder en el output.

## SEO técnico
- [ ] `sitemap-index.xml` generado y accesible; **no** hay sitemap manual obsoleto en `public/`.
- [ ] `robots.txt` presente con la URL correcta del sitemap.
- [ ] `canonical` único por página; dominio = `astro.config.site` = sitemap (sin conflicto).
- [ ] `title` (≤60) y `description` (≤155) únicos por página.
- [ ] OG + Twitter Card en todas las páginas; imagen OG existe (no hotlink).

## Schema (JSON-LD)
- [ ] Valida en validator.schema.org y Rich Results Test.
- [ ] Tipos correctos por arquetipo (ver [[02 - Schema JSON-LD por tipo]]).
- [ ] **BreadcrumbList aparece una sola vez** por página.
- [ ] **Cero `aggregateRating`/`Review` fabricados** (solo reseñas reales).

## Performance (CWV)
- [ ] Lighthouse móvil ≥90 en Performance; LCP < 2.5s, CLS < 0.1.
- [ ] Imágenes AVIF/WebP, con `width`/`height`; LCP `eager`+`fetchpriority`, resto `lazy`.
- [ ] Fuentes self-hosted con preload; CSS crítico inline.

## Arquitectura e internal linking
- [ ] **Cero enlaces internos rotos** (correr link-checker sobre el build).
- [ ] Breadcrumbs en todas las páginas internas.
- [ ] URLs coherentes con `TAXONOMY`; `trailingSlash: 'never'`.

## Conversión
- [ ] CTA WhatsApp arriba del fold; `WhatsAppFloat` presente.
- [ ] Todo WhatsApp/tel sale de `site.ts` (`waUrl()`/`telUrl()`), **cero hardcode**.
- [ ] Datos de contacto **reales** (cero `1234-5678`, `0000`, `525500000000`).
- [ ] Formulario: backend real, o WhatsApp/mailto + `⚠️ HUECO` registrado (nunca `setTimeout` simulado).

## Accesibilidad
- [ ] Un solo H1; jerarquía de headings correcta.
- [ ] `alt` en todas las imágenes; contraste AA.
- [ ] Menús y acordeones navegables por teclado (`aria-*`).

## Mobile-first
- [ ] Verificado en 1024 / 768 / 640 / 480 / 380.
- [ ] Touch targets ≥44px; sin overflow horizontal.

## Seguridad y deploy
- [ ] **Un solo destino de deploy** configurado (sin drift Cloudflare↔GitHub Pages).
- [ ] **Cero secretos** en el repo (`git grep -E "gho_|sk-|api_key"` vacío); `.gitignore` correcto.
- [ ] Sin artefactos de build ni carpetas legacy versionadas.

> Si todo está verde → [[SOP 07 - Deploy Cloudflare Pages]].
