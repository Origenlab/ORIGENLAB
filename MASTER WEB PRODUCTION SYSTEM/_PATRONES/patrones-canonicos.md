# Patrones Canónicos — Fase 2
> Propósito: patrones cuantificados del ecosistema (frecuencia · variantes · versión canónica) extraídos de [[diagnostico-por-proyecto]]; insumo directo del Vault Maestro.

Base: 28 codebases Astro (+3 HTML estáticos como contexto). "Frecuencia" = nº de proyectos donde se verificó. "Canónico" = la versión que el Vault adopta como estándar, con su proyecto de origen.

---

## A. Patrones ARQUITECTÓNICOS

### A1. Astro SSG puro — **28/28 (100%)**
Todos usan `output: static` sin adapter. **Canónico:** Astro SSG, sin SSR salvo necesidad explícita. Origen: universal.

### A2. Versión de Astro — fragmentada
Astro 4: 8 proyectos · Astro 5: 13 · **Astro 6: 7** (los más recientes: PROYECTORED 6.1, RESOIL 6.1, MANEXT 6, LGACONTRAINCENDIOS 6, BRINCOLINS 6, PODIUMEX 6, MESECI 6). **Canónico:** **Astro 6.x pinneado** (dirección actual del ecosistema). Migrar nuevos proyectos siempre desde la última 6.

### A3. Integración `@astrojs/sitemap` — **~26/28**
Casi universal. **Canónico:** `@astrojs/sitemap` como única integración base obligatoria; MDX solo si el proyecto tiene blog en `.mdx`.

### A4. SSoT de configuración (`config/site.ts`) — **~18/28 (≥80% de los maduros)**
Un archivo con `SITE`, `CONTACT`, `waUrl()`, taxonomías `as const`, `WA_MESSAGES`. Variantes de nombre: `config/site.ts` (PROYECTORED), `data/site.ts`, `business.ts` (INFLAPY), `data/seo.ts` (CAMARADESEGURIDAD). **Faltante** en BRINCOLINS, MESASPICNIC, MANEXT (WhatsApp hardcodeado ×6). **Canónico:** `src/config/site.ts` — **origen PROYECTORED** (el más completo: contacto + taxonomías + 30 mensajes WA).

### A5. Capa de datos tipada (`src/data/*.ts`) — **~12/28, creciente**
Catálogo/taxonomía como TS tipado, no hardcode en `.astro`. Mejor: GAMADEMEXICO (`SubcategoryDef` + JSON, elimina ~8,500 líneas duplicadas), INFLAPY, FIREFIGHTERMX. **Canónico:** todo dato repetible vive en `data/*.ts` o Content Collection; **nunca** hardcodeado en páginas.

### A6. Jerarquía de niveles L1→L4/L5 — **patrón rector**
Home(L1) → Categoría(L2) → Subcategoría(L3) → Ficha producto/servicio(L4) → variante(L5). Especificado al detalle en **PROYECTORED** (spec L1–L5 autorizada) y **MESECI** (templates L3 §1–§13). **Canónico:** modelo L1–L5 de PROYECTORED.

### A7. Layouts — jerarquía de herencia
Patrón dominante: `BaseLayout` (`<head>`, SEO, JSON-LD) → `PageLayout`/`ServiceLayout` (header/footer/breadcrumbs) → página. Mejor: BOMBERO (BaseLayout→PageLayout limpio). **Anti-patrón:** GAMADEMEXICO `Base.astro` "God-layout" de 24 props; EVENTECH 3 layouts ~95% duplicados. **Canónico:** 2 niveles (Base + Page) + layouts de tipo (Producto/Servicio/Articulo) que extienden Page.

## B. Patrones SEO

### B1. Capa SEO centralizada — **~16/28 maduros**
`lib/seo.ts` / `utils/seo.ts` / `data/schema.ts` genera metas + JSON-LD por tipo de ruta. **Canónico:** **PODIUMEX `data/schema.ts`** (`globalGraph()`, constructores `@graph` por tipo, **sin AggregateRating fabricado**) + estilo generador de EVENTECH (`@id` linking). Política dura: **cero datos estructurados fabricados**.

### B2. Cobertura JSON-LD por tipo — **universal en maduros**
Organization/LocalBusiness + WebSite+SearchAction + BreadcrumbList + (Product+Offer | Service+OfferCatalog | Article | FAQPage), enlazados por `@id`. Por arquetipo:
- **A:** Product + Offer + BreadcrumbList (MESECI, FIREFIGHTERMX, PROYECTORED)
- **B:** Service + OfferCatalog (RESOIL, EVENTECH, RENTADEILUMINACION)
- **C:** LocalBusiness + Service + geo + areaServed (CAMARADESEGURIDAD, SEGURIDADPRIVADA, LGACONTRAINCENDIOS)
- **D:** ItemList/CollectionPage + EmergencyService (FIREFIGHTERCOMMX, BARBERIA, CDMXSITE)
**Canónico:** un constructor por tipo, seleccionado por una prop `pageType`.

### B3. ❌ Anti-patrón: BreadcrumbList duplicado — **2+ confirmados** (BOMBERO, RENTADEILUMINACION: en BaseLayout *y* en `Breadcrumbs.astro`). **Regla:** el breadcrumb JSON-LD se emite **en un solo lugar**.

### B4. ❌ Anti-patrón: ratings/reviews fabricados — **6+ confirmados**. **Regla canónica:** sin reseñas reales verificables, **no se emite** `aggregateRating`/`Review` (modelo EVENTECH/PODIUMEX/GAMADEMEXICO).

### B5. URLs limpias con `trailingSlash` explícito — recurrente (MESECI `never`, SEGURIDADPRIVADA `never`). **Canónico:** `trailingSlash: 'never'` + `site` correcto + canonical normalizado en BaseLayout.

### B6. Internal linking deliberado — componentes `QuickLinksBar` (FIREFIGHTERSMX), `RelatedCategories` (CLINICADEBELLEZA), `NavInterna*`/`Relacionados*` (MESECI), interlinking 4 niveles (SEGURIDADPRIVADAEVENTOS). **Canónico:** componente `RelatedLinks` data-driven por taxonomía.

## C. Patrones de DISEÑO

### C1. Capa CSS — dividida
Tailwind (3.x o 4 `@theme`): ~10 · **CSS vanilla con tokens `:root`: ~13** (incluye los gold BOMBERO y RENTADEILUMINACION + PROYECTORED, LGA, MONITORES, SEGURIDADPRIVADA, MEDEDUL). Tendencia: los proyectos más nuevos/gold usan **vanilla + tokens**. **Canónico:** **CSS vanilla con design tokens en `:root`** (origen PROYECTORED "regla de oro CSS"). Variante aceptada: Tailwind 4 `@theme` para proyectos que ya lo usen. ❌ Evitar: Tailwind declarado y no integrado (PANTALLA-LED), `@tailwindcss/typography` faltante (FIREFIGHTERMX).

### C2. ❌ Anti-patrón: doble fuente de tokens — PROYECTORED (`global.css` Y `Base.astro`), MANEXT (4 bloques `:root`), RENTADEILUMINACION (style.css ↔ critical inline). **Regla:** **una sola** definición de tokens.

### C3. Tipografía self-hosted anti-CLS — MONITORES (subsets `unicode-range`), GAMADEMEXICO/PROYECTORED (Inter self-host), RENTADEILUMINACION (preload). ❌ Google Fonts CDN en FIREFIGHTERCOMMX. **Canónico:** fuentes self-hosted + `font-display: swap` + preload.

### C4. Componentes UI recurrentes — Hero, Card de producto/servicio, CTABanner, WhatsApp float, Breadcrumbs, FAQ accordion, SectionHeading. MESECI tiene la familia más rica (30 Hero*, presets CTA). **Canónico:** ver [[../09 - Biblioteca Componentes/00 - Inventario]].

### C5. Optimización LCP deliberada — critical CSS inline + preload + CDN post-build (RENTADEILUMINACION, BOMBERO). **Canónico:** estándar para todas las páginas.

## D. Patrones de CONTENIDO

### D1. Content Collections + Zod estricto — **~14/28 maduros**
`.strict()`, enums cerrados, imagen obligatoria, `reference()` entre colecciones. Mejor: MESECI (Zod v2 estricto), EVENTECH (6 colecciones), MEDEDULCOM (`reference()` con grafo). **Canónico:** toda entidad repetible (producto, servicio, artículo, zona, caso) = Content Collection con esquema Zod `.strict()`.

### D2. Organización por arquetipo de página
- **Home:** hero + categorías + prueba social + CTA WhatsApp.
- **Categoría (L2):** intro + grid de subcategorías/productos + interlinking + FAQ.
- **Producto/Servicio (L4):** ficha schema-driven (ServiceLayout de CLINICADEBELLEZA: 10 bloques Zod opcionales — el más flexible).
- **Artículo blog:** `.mdx` en colección con frontmatter tipado (GAMADEMEXICO `TEMPLATE-ARTICULO`, MEDEDUL identidad por categoría).
- **Directorio/Zona (D):** ruta dinámica `[...slug]` desde colección (EVENTECH 211 venues, INFLAPY alcaldías, RENTADEILUMINACION 25 alcaldías).
**Canónico:** ver SOPs 2–5 y [[../08 - Biblioteca Plantillas/00 - Indice de Plantillas]].

### D3. ❌ Anti-patrón: blog como `.astro` sueltos — MESASPICNIC (75), RENTADEILUMINACION (128), PODIUMEX. **Regla:** blog **siempre** en colección `.mdx`, nunca páginas sueltas.

### D4. Conversión — WhatsApp-first — **universal**
CTA WhatsApp con mensaje pre-armado por página; tel secundario. Bot DMChamp en MESASPICNIC/INFLAPY. **Canónico:** `waUrl(msg)` desde `site.ts`; nunca número hardcodeado.

## E. Patrones de DESARROLLO / OPERACIÓN

### E1. Deploy — **la decisión #1 sin homologar**
GH Pages real: ~20 · Cloudflare real (wrangler): MONITORES, INFLAPY, INFIELMX, CDMXSITE · **config de ambos mezclada (drift): ≥7** → `_headers`/`_redirects`/CSP **muertos** en GH Pages. **Canónico recomendado:** **Cloudflare Pages** — alinea con el stack declarado, respeta `_headers`/`_redirects` y habilita el Worker de captura de leads. *(Decisión a confirmar con el dueño; alternativa válida: estandarizar todo a GH Pages y borrar el config CF.)*

### E2. CI/CD — gate de calidad en build — **minoritario, alto valor**
FIREFIGHTERMX (validación SEO prebuild), MEDEDUL/INFLAPY (validate:mdx + git hooks), GAMADEMEXICO (guardas de datos). **Canónico:** GitHub Action con `astro check` + lint SEO + link-checker + build, bloqueante.

### E3. CDN de imágenes — ExactDN/EWWW vía reescritura post-build — **~8** (BOMBERO, EVENTECH, INFLAPY, MEDEDUL, GAMADEMEXICO, PROYECTORED, RENTADEILUMINACION, MESASPICNIC). **Canónico:** script `rewrite-cdn.mjs` post-build (origen RENTADEILUMINACION/BOMBERO).

### E4. Analítica — Rybbit self-hosted recurrente (MESECI, INFLAPY, RESOIL, BOMBERO) + TruConversion. **Canónico:** Rybbit con carga diferida (patrón anti-Lighthouse de BOMBERO).

### E5. ⚠️ HUECO: automatización de contenido/imágenes/email
**n8n, fal.ai/FLUX, Brevo NO existen en ningún repo** — son aspiracionales. El Vault documentará el diseño objetivo y lo marcará `⚠️ HUECO: pendiente de implementación` hasta tener código real.

### E6. ❌ Anti-patrones de repo — artefactos de build versionados (MESASPICNIC ~179, RESOIL `_html_backup` 8.3M), working copy sin git (MEDEDULCOM), token expuesto (RENTADEILUMINACION). **Canónico:** `.gitignore` estándar + pre-commit que bloquea secretos + un repo por proyecto bajo `Origenlab`.

---

## Tabla de versiones canónicas (resumen)

| Decisión | Canónico | Origen |
|---|---|---|
| Framework | Astro 6.x SSG | PROYECTORED/RESOIL |
| CSS | vanilla + tokens `:root` | PROYECTORED, BOMBERO |
| Config | `src/config/site.ts` (SSoT) | PROYECTORED |
| Datos | `data/*.ts` + Content Collections Zod `.strict()` | MESECI, GAMADEMEXICO |
| SEO/Schema | `lib/seo.ts` + `data/schema.ts`, cero fabricado | PODIUMEX, EVENTECH |
| Niveles | L1–L5 | PROYECTORED |
| Layouts | Base→Page→Tipo | BOMBERO |
| Conversión | `waUrl()` WhatsApp-first | PROYECTORED/INFLAPY |
| Imágenes | self-host + AVIF + CDN post-build | BOMBERO, RENTADEILUMINACION |
| Deploy | Cloudflare Pages *(a confirmar)* | INFLAPY/MONITORES |
| CI | `astro check` + lint SEO + link-check | FIREFIGHTERMX |

> Siguiente: el Vault Maestro (Fase 3) convierte cada "canónico" en doc + plantilla copy-paste.
