# Estándares de Calidad — "lo máximo"
> Propósito: el listón que toda página producida con el Vault debe pasar, sin retrabajo.

Estos checks están integrados en las plantillas y en el [[02 - Checklist QA Pre-Deploy]]. Un sitio no se publica si falla alguno.

## SEO técnico
- `sitemap.xml` generado por `@astrojs/sitemap` (no manual). Un solo sitemap, sin estáticos obsoletos. *(Falla común: RENTADEILUMINACION, RESOIL.)*
- `robots.txt` presente, con sitemap correcto y política de bots. *(Falla: LGACONTRAINCENDIOS sin robots.)*
- `canonical` único y normalizado por página; `trailingSlash: 'never'`.
- `hreflang` solo si hay variantes de idioma reales.
- Schema válido por tipo (LocalBusiness/Service/Product/Article/FAQ/Breadcrumb), enlazado por `@id`, **una sola vez cada uno**. *(Falla: breadcrumb duplicado en BOMBERO/RENTADEILUMINACION.)*
- Open Graph + Twitter Card completos; `title` y `description` únicos por página (≤60 / ≤155 chars).
- Dominio consistente entre `astro.config`, canonical y sitemap. *(Falla: CLINICADEBELLEZA, INFIELMX, SEGURIDADPRIVADAEVENTOS.)*

## Performance (Core Web Vitals en verde)
- Imágenes en AVIF/WebP, dimensionadas, con `width`/`height`; LCP con `loading="eager"` + `fetchpriority="high"`, resto `lazy`.
- CSS crítico inline en `<head>`; fuentes self-hosted con `font-display: swap` + preload. *(Anti-patrón: Google Fonts CDN en FIREFIGHTERCOMMX.)*
- CDN de imágenes vía `rewrite-cdn.mjs` post-build.

## Arquitectura
- URLs limpias y consistentes con la taxonomía de `site.ts`.
- Internal linking deliberado (Breadcrumbs + RelatedLinks). **Cero enlaces internos rotos.** *(Falla: RESOIL, LGACONTRAINCENDIOS, CDMXSITE.)*
- Breadcrumbs con schema (emitido por `seo.ts`, no por el componente).

## Conversión
- CTA WhatsApp claro arriba del fold, vía `waUrl()` desde `site.ts`. Cero números hardcodeados.
- Datos de contacto reales y verificables. **Cero placeholders** (`55 1234-5678`, `0000`, `525500000000`). *(Falla: 8 proyectos.)*
- Jerarquía visual que guía a la acción.

## Datos estructurados honestos
- **Cero `aggregateRating`/`Review` fabricados.** Solo con reseñas reales verificables. *(Falla: MESECI, BRINCOLINS, SEGURIDADPARACONDOMINIOS, CAMARADESEGURIDAD, MANEXT.)*

## Accesibilidad básica
- Contraste AA, `alt` en toda imagen, jerarquía de headings (un solo H1), navegación por teclado, `aria-*` en menús/acordeones.

## Mobile-first
- Verificado en breakpoints 1024 / 768 / 640 / 480 / 380. Touch targets ≥44px. (Ver skill `mobile-responsive-overhaul` para sitios con deuda.)

## Operación
- Un solo destino de deploy configurado (sin drift Cloudflare↔GitHub Pages). *(Falla #1: ≥7 proyectos.)*
- `.gitignore` correcto; **cero secretos en el repo**. *(Falla crítica: token en RENTADEILUMINACION.)*
- Formularios con backend real o, si aún no existe, CTA WhatsApp como conversión primaria + `⚠️ HUECO` registrado.
