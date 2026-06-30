# Diagnóstico por Proyecto — Auditoría Forense del Ecosistema
> Propósito: índice maestro y tabla global de los 31 proyectos auditados; base de evidencia para [[patrones-canonicos]] y el Vault Maestro.

**Fecha:** 2026-06-18 · **Método:** auditoría forense por proyecto (cero invención, evidencia por ruta) · **Cobertura:** 28 codebases Astro + 3 sitios HTML estáticos = 31.

---

## Resumen ejecutivo

El ecosistema es **un mismo sistema repetido 28 veces con drift**. Hay un ADN común y maduro — Astro SSG, `@astrojs/sitemap`, SSoT en `site.ts`, capa `lib/seo.ts` con JSON-LD por tipo de ruta, Content Collections con Zod, conversión por WhatsApp — pero **no está homologado**: la versión de Astro va de 4 a 6, la capa CSS se parte entre Tailwind (3.x y 4 `@theme`) y CSS vanilla con tokens, y el mismo error se repite proyecto tras proyecto. Las tres fallas sistémicas más caras son: (1) **conflicto de deploy** — configuración de Cloudflare (`_headers`/`_redirects`/`wrangler`) presente pero el deploy real va a GitHub Pages, que las ignora → seguridad y 301s muertos en producción; (2) **datos estructurados fabricados** — `aggregateRating`/reviews inventados en el JSON-LD, riesgo de penalización en Google; (3) **formularios sin backend** — n8n/Brevo se mencionan pero no existen en ningún repo: los leads se pierden. Los mejores proyectos (PROYECTORED, EVENTECH, INFLAPY, PODIUMEX, BOMBERO) ya resolvieron varias de estas y son la base canónica.

---

## Tabla resumen global

Salud: 🟢 publicable / 🟡 deuda corregible / 🔴 no publicable (placeholder o roto). Arquetipo: **A** catálogo técnico · **B** renta/eventos · **C** servicio profesional local · **D** contenido/directorio.

| Proyecto | Arq | Astro | CSS | Deploy real | Vault propio | Salud | Falla #1 |
|---|---|---|---|---|---|---|---|
| [[diagnostico-BOMBERO\|BOMBERO]] ⭐ | A+D | 5.7 | vanilla+tokens | GH Pages + CF (dual) | — | 🟡 | cadena de marca rota en 32 fichas de estado |
| [[diagnostico-MESECI\|MESECI]] ⭐ | A | 6.0 | Tailwind 3.4→style.css | GH Pages (GHA) | ✅ 28 md | 🟡 | rating 4.9/38 fabricado en 143 productos |
| [[diagnostico-RENTADEILUMINACION\|RENTADEILUMINACION]] ⭐ | B+C | 5.7 | vanilla (7.6k L) | GH Pages (GHA) | — | 🔴 | **token GitHub expuesto** + breadcrumb duplicado |
| [[diagnostico-FIREFIGHTERMX\|FIREFIGHTERMX]] | A | 5 | Tailwind 4 `@theme` | GH Pages + CF | 🟡 | gate SEO en CI ✅ / catálogo escaso (5) |
| [[diagnostico-FIREFIGHTERCOMMX\|FIREFIGHTERCOMMX]] | D | 5 | Tailwind 3 + Leaflet | GH Pages | 🟡 | colección `states` declarada y vacía |
| [[diagnostico-FIREFIGHTERSMX\|FIREFIGHTERSMX]] | A | **4** | Tailwind 3 (.cjs)+MDX | GH Pages (cuenta personal) | 🔴 | contacto placeholder + catálogo (2) |
| [[diagnostico-LGACONTRAINCENDIOS\|LGACONTRAINCENDIOS]] | C+A | **6** | vanilla | GH Pages + CNAME | 🟡 | ~24 enlaces rotos + robots.txt ausente |
| [[diagnostico-MONITORESCONTRAINCENDIOS\|MONITORESCONTRAINCENDIOS]] | A | 5 | vanilla self-host fonts | **CF Pages (wrangler)** | 🔴 | contacto/dominio placeholder, sin CI |
| [[diagnostico-CAMARADESEGURIDAD\|CAMARADESEGURIDAD]] | C | 5.7 | Tailwind 3.4 | GH Pages (GHA) | 🟡 | conflicto deploy CF + 5 reviews fabricados |
| [[diagnostico-SEGURIDADPARACONDOMINIOS\|SEGURIDADPARACONDOMINIOS]] | C | **4** | Tailwind 3.4+MDX | sin CI versionado | 🟡 | form Netlify sin fallback + rating 4.9/184 |
| [[diagnostico-SEGURIDADPRIVADA\|SEGURIDADPRIVADA]] | C+D | 5.1 | vanilla+tokens | GH Pages (GHA) | ✅ vault/ | conflicto deploy CF + 7 forms a 404 |
| [[diagnostico-SEGURIDADPRIVADAEVENTOS\|SEGURIDADPRIVADAEVENTOS]] | C | **4** | Tailwind 3.4+MDX | GH Pages (GHA) | — | dominio .com vs .com.mx + WA placeholder |
| [[diagnostico-SEGURIDADPRIVADAMX\|SEGURIDADPRIVADAMX]] | C | HTML estático | vanilla (webpack muerto) | GH Pages | 🔴 | solo home migrado; contacto/schema placeholder |
| [[diagnostico-BRINCOLINS\|BRINCOLINS]] | B+C/D | **6** | — | GH Pages | 🟡 | rating 4.9/47 + 3 reviews fabricadas/ficha |
| [[diagnostico-MESASPICNIC\|MESASPICNIC]] | B+D | **4** | + CDN ExactDN | GH Pages | ✅ 44 md | blog = 75 .astro sueltos (no colección) |
| [[diagnostico-EVENTECH\|EVENTECH]] | B+D | 5 | + CDN ExactDN | GH Pages | ✅ 16 md | 903 imágenes rotas + 228 págs estáticas |
| [[diagnostico-PANTALLA-LED\|PANTALLA-LED]] | A+C | 5 | (Tailwind sin integrar) | GH Pages | ✅ 34 md | MVP: sin sitemap/robots/JSON-LD global |
| [[diagnostico-PODIUMEX\|PODIUMEX]] | B+A | **6** | + sitemap | GH Pages | _docs/ | catálogo 8 .astro estáticos (no colección) |
| [[diagnostico-INFLAPY\|INFLAPY]] | B+C+D | **4** | + CDN ExactDN | **CF Pages (wrangler)** | docs/ 19 md | doble fuente de precios (1800 vs 2500) |
| [[diagnostico-CLINICADEBELLEZA\|CLINICADEBELLEZA]] | C | 5 | Tailwind 4 `@theme`+MDX | GH Pages | ✅ 14 md | conflicto dominio + datos placeholder |
| [[diagnostico-MEDEDUL\|MEDEDUL]] | B+D | **4** | vanilla+tokens+ExactDN | GH Pages | docs ~12 md | `.htaccess` Apache inerte + 4 colecciones vacías |
| [[diagnostico-BARBERIA\|BARBERIA]] | D | HTML estático | vanilla | GH Pages (CNAME) | DOCS/ 11 md | search/registro sin backend; OG hotlink |
| [[diagnostico-INFIELMX\|INFIELMX]] | D+C | **4** | Tailwind 3.4+MDX | **CF Pages** | ✅ 00-08 | sitemap roto + form simulado (setTimeout) |
| [[diagnostico-GAMADEMEXICO\|GAMADEMEXICO]] | A/B | 5.17 | self-host + ExactDN | GH Pages | docs 18 md | conflicto host + Base.astro God-layout (24 props) |
| [[diagnostico-MANEXT\|MANEXT]] | A+C+D | **6** | vanilla (sin tokens) | GH Pages (GHA) | docs | rating sin fuente VIVO en 7 páginas |
| [[diagnostico-PROYECTORED\|PROYECTORED]] | A | **6.1** | vanilla+tokens+ExactDN | GH Pages (GHA) | ✅ 01-06 | conflicto host + doble fuente de tokens CSS |
| [[diagnostico-RESOIL\|RESOIL]] | B | **6.1** | vanilla monolítico (6.9k) | GH Pages (GHA) | .audit/ | enlaces rotos masivos (7/39 migradas) |
| [[diagnostico-CDMXSITE\|CDMXSITE]] | D | HTML estático | vanilla+tokens | **CF Pages** | SEO-GUIDEs | chrome duplicado ×63 + 183 enlaces rotos |
| [[diagnostico-CABOIMAGE\|CABOIMAGE]] | C+A | **4** | Tailwind | GH Pages | ✅ marca/SEO | robots→sitemap-index inexistente; sin breadcrumbs |
| [[diagnostico-MEDEDULCOM\|MEDEDULCOM]] | B+D | 5.1 | vanilla+tokens | indefinido | docs/ | **working copy SIN git** (riesgo de pérdida) |
| [[diagnostico-mededul-com-repo\|mededul-com-repo]] | B+D | 5.1 | vanilla+tokens | indefinido | docs/ | regresión en HEAD (revirtió fixes) |

⭐ = gold standard designado por el dueño.

---

## ✅ Patrones que FUNCIONAN (estandarizar)

1. **Astro SSG puro** (`output: static`, sin adapter) en los 28 codebases. Cero excepciones → es el estándar de facto. *Evidencia: todos los `astro.config.*`.*
2. **`@astrojs/sitemap`** como integración casi universal.
3. **SSoT de configuración** (`config/site.ts` / `data/site.ts` / `business.ts`): contacto + taxonomías `as const` + mensajes WhatsApp en un solo archivo. Versión canónica: PROYECTORED (`config/site.ts`), INFLAPY (`business.ts`), PANTALLA-LED, EVENTECH.
4. **Capa SEO centralizada** (`lib/seo.ts` / `utils/seo.ts` / `data/schema.ts`) que genera `<head>` + JSON-LD por tipo de ruta. Mejor implementación: PODIUMEX (`data/schema.ts` con `globalGraph()`, **sin ratings fabricados**), EVENTECH (10 generadores con `@id` linking), BOMBERO (`seo.ts` 625 L).
5. **JSON-LD por tipo** con grafo `@id`: Organization/LocalBusiness + WebSite+SearchAction + BreadcrumbList + (Product|Service|Article|FAQPage). Maduro en BOMBERO, MESECI, FIREFIGHTERMX, EVENTECH, SEGURIDADPRIVADA.
6. **Content Collections + Zod estricto** (`.strict()`, enums cerrados, imagen obligatoria): contrato de datos fuerte. Canónico: MESECI, EVENTECH (6 colecciones), INFLAPY, SEGURIDADPRIVADA, PODIUMEX.
7. **Jerarquía L1→L4/L5** (Home→Categoría→Subcategoría→Ficha): especificada al detalle en PROYECTORED y MESECI.
8. **Conversión WhatsApp** con mensajes pre-armados por página; bot DMChamp en MESASPICNIC/INFLAPY.
9. **CDN de imágenes ExactDN/EWWW** vía reescritura post-build: BOMBERO, MESASPICNIC, EVENTECH, INFLAPY, MEDEDUL, GAMADEMEXICO, PROYECTORED, RENTADEILUMINACION.
10. **Gate de QA en build/CI**: validación SEO (FIREFIGHTERMX), validate:mdx + git hooks (MEDEDUL, INFLAPY), guardas de datos (GAMADEMEXICO).

## ❌ Fallas SISTÉMICAS (deuda técnica repetida)

1. **Conflicto de deploy GitHub Pages vs Cloudflare** — `_headers`/`_redirects`/`wrangler.toml` presentes pero el deploy va a GH Pages, que los ignora → CSP/HSTS y 301s **muertos en producción**. ≥7 confirmados: MESECI, CAMARADESEGURIDAD, SEGURIDADPRIVADA, SEGURIDADPRIVADAEVENTOS, GAMADEMEXICO, MANEXT, PROYECTORED. **Falla #1 del ecosistema.**
2. **`aggregateRating`/reviews fabricados** en JSON-LD (riesgo de acción manual de Google): MESECI (4.9/38 ×143), RENTADEILUMINACION, BRINCOLINS (4.9/47), SEGURIDADPARACONDOMINIOS (4.9/184), CAMARADESEGURIDAD, MANEXT. Contramodelo correcto: EVENTECH/PODIUMEX/GAMADEMEXICO los **suprimen a propósito**.
3. **Formularios sin backend** — n8n/Brevo se mencionan pero **no existen en ningún repo**; leads se pierden. INFIELMX llega a simular el envío con `setTimeout`. Hueco transversal #1.
4. **Datos de contacto placeholder** (`55 1234-5678`, `0000`, `525500000000`): FIREFIGHTERSMX, MONITORESCONTRAINCENDIOS, CLINICADEBELLEZA, PANTALLA-LED, SEGURIDADPRIVADAEVENTOS, CAMARADESEGURIDAD, SEGURIDADPRIVADAMX, INFIELMX.
5. **Sitemap roto/duplicado** (manual obsoleto coexiste con el generado, o robots apunta a 404): RENTADEILUMINACION, INFIELMX, RESOIL, CABOIMAGE; MEDEDUL no registra la integración.
6. **Enlaces internos rotos**: BOMBERO, LGACONTRAINCENDIOS (~24), RESOIL (masivo), MEDEDULCOM, CDMXSITE (183).
7. **Conflicto de dominio** (config vs canonical/sitemap): CLINICADEBELLEZA, SEGURIDADPRIVADAEVENTOS, INFIELMX.
8. **Catálogos estáticos hardcodeados** en vez de data-driven (miles de líneas duplicadas): BRINCOLINS, MESASPICNIC, EVENTECH (228 /servicios/), PODIUMEX, RENTADEILUMINACION (96 sub-páginas), GAMADEMEXICO.
9. **Fragmentación de versión y de CSS**: Astro 4/5/6 conviviendo; Tailwind 3 / Tailwind 4 / vanilla sin estándar; tokens duplicados (PROYECTORED, MANEXT, RENTADEILUMINACION).
10. **Artefactos de build versionados** y carpetas legacy en el repo: MESASPICNIC (~179), RESOIL (`_html_backup` 8.3M), CDMXSITE.

## 🤖 Automatizable (candidatos a generador/script)

1. **Generador de fichas data-driven** (dataset + template) — sustituye los catálogos hardcodeados; POCs ya existen en EVENTECH, INFLAPY (directorio), RENTADEILUMINACION (directorio).
2. **Endpoint de captura de leads** (Cloudflare Worker → n8n → Brevo + WhatsApp) reutilizable para todos los formularios.
3. **Link-checker + SEO gate en CI** (enlaces rotos, drafts, H1 único, meta length, breadcrumb único): generalizar el de FIREFIGHTERMX.
4. **Pipeline de imágenes** fal.ai/FLUX → AVIF dimensionado + naming-keyword + alt (hoy manual en SEGURIDADPRIVADA).
5. **Generador de páginas hyper-local por zona/alcaldía** (patrón idéntico en INFIELMX, INFLAPY, SEGURIDADPARACONDOMINIOS).

## 📐 Estandarizable (decisión repetida → regla)

1. **Un solo destino de deploy** por proyecto (decidir GH Pages **o** Cloudflare; no ambos) + plantilla única de CI.
2. **SSoT `site.ts` + esquemas Zod** como contrato obligatorio de todo proyecto nuevo.
3. **`lib/seo.ts` como paquete reutilizable** con política "cero datos fabricados".
4. **Sistema de niveles L1–L5** (tomar PROYECTORED como spec canónica).
5. **Tokens de diseño en una sola fuente** (decidir Tailwind `@theme` vs CSS vars; eliminar la duplicación).
6. **Convención `data/*.ts` tipado** como capa de datos en vez de hardcode en `.astro`.

---

## Mapa de conocimiento (documentación previa minable)

Vaults Obsidian formales: **MESECI** (00–07, + AUDITORIA propia, incluye templates L3 — el más completo), **PROYECTORED** (ProyectoRed-Vault 01–06, L2/L4 templates + regla de oro CSS), **MESASPICNIC** (44 md, design system + 16 fichas de componente), **PANTALLA-LED** (34 md, guías "crear página/sección"), **EVENTECH** (16 md, plantillas hub/producto), **INFIELMX** (00–08 + Blueprint L2), **CLINICADEBELLEZA** (00–13), **CABOIMAGE** (marca/SEO), **SEGURIDADPRIVADA** (vault/).

Docs no-Obsidian valiosos: GAMADEMEXICO (`PROCESO-BLOG-SEO`, `TEMPLATE-ARTICULO`), CDMXSITE (3 `SEO-GUIDE`: GSC, Schema, Core Web Vitals), RESOIL/SEGURIDADPRIVADAMX (`DOCUMENTO-PAGINAS`, `DOCUMENTO-ARTICULOS`), MEDEDUL (`GUIA_MAESTRA`, `COMPONENTS.md`), MESASPICNIC (`DMChamp — Guía Maestra OrigenLab`), SEGURIDADPRIVADA (`ESTUDIO-MAESTRO-HOMOLOGACION-2026`).

**Dónde está el conocimiento hoy:** disperso en ~9 vaults + ~10 conjuntos de docs sueltos, **desactualizados respecto al código** (varios dicen "Astro 5 / Cloudflare" cuando el repo ya es Astro 6 / GH Pages). El Vault Maestro debe **absorber y reconciliar** este conocimiento, no competir con él.

## ⚠️ HUECOS globales (a cerrar antes o durante el Vault)

- 🔴 **Seguridad:** token `gho_...` en `RENTADEILUMINACION/.git/config` → **rotar ya**. (Los otros 30 repos: limpios.)
- **n8n / fal.ai / Brevo:** mencionados en docs/schema pero **sin evidencia de implementación** en ningún repo. Las automatizaciones del prompt son aspiracionales hoy. Marcar como ⚠️ HUECO en el Vault hasta tener el código real.
- **`METODOLOGIA-ORIGENLAB-v2.md`** (citado en el encargo) **no existe** en el ecosistema.
- **Backend de formularios:** sin handler real verificado en ningún proyecto.
- **Plataforma de deploy final** indefinida en la familia mededul (3 variantes divergentes, una sin git).

> Siguiente: [[patrones-canonicos]] (Fase 2) cuantifica estos patrones con frecuencia y versión canónica.
