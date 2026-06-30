# REPORTE QA — Vault Maestro OrigenLab

> Ingeniería de QA · verificación con build REAL en sandbox `/tmp` (Astro 6.4.8, Node 22.22).
> Fecha auditoría inicial: 2026-06-18. **Remediación + reverificación: 2026-06-18** (Ingeniería de Plataforma Astro).
> Alcance: scaffold + layouts + páginas + componentes + SEO + wikilinks + huecos.

---

## VEREDICTO GLOBAL: **PASA** (era FALLA)

> ✅ **Tras la remediación, el Vault compila VERDE.** Un usuario que siga el SOP (copiar `_scaffold` + `_layouts` + `_seo` + `_src`, rellenar `{{...}}`) obtiene un proyecto que pasa `astro check` con **0 errores / 0 warnings** y `astro build` **sin errores ni warnings** (8 páginas, 1 por arquetipo). El contrato `SITE`/`TAXONOMY` quedó reconciliado en UNA fuente única (`site.ts` superset) y documentado en SOP 01.

**Diagnóstico original (queda como histórico):** el sistema NO compilaba: el flujo reventaba en `astro build` y acumulaba **69 errores** en `astro check`. Plantillas, componentes y capa SEO se extrajeron de **proyectos distintos con contratos `SITE`/`TAXONOMY` incompatibles** y nunca se reconciliaron. La calidad conceptual (JSON-LD sin ratings fabricados, breadcrumb único, honestidad de huecos) ya era **buena**; lo roto era la **integración mecánica** — ya corregida.

| Dimensión | Resultado original | Resultado tras remediación |
|---|---|---|
| 1. Consistencia de contrato (estático) | ❌ Rota (3 desajustes sistémicos) | ✅ `site.ts` es la fuente única superset (satisface seo.ts + componentes) |
| 2. Build real (`astro check` + `astro build`) | ❌ Falla (build aborta; 69 errores) | ✅ check: 0 errores / 0 warnings · build: OK, 8 páginas, 0 warnings |
| 3. Integridad de wikilinks | ⚠️ 14 enlaces rotos | ✅ 14 corregidos (code-refs / índices reales) |
| 4. Huecos y evidencia | ✅ Correcto | ✅ Correcto (+ contrato `SITE` ahora documentado en SOP 01 §5) |

---

## ✅ RESULTADO DE LA REVERIFICACIÓN (2026-06-18)

**Sandbox de ensamblaje** (negocio ficticio "Extintores del Valle", NAP/WA en formato válido, 1 entrada por colección `productos`/`servicios`/`articulos`/`zonas`/`casos`/`directorio`, páginas: home, categoría `extintores/index`, servicio dinámico, producto dinámico, artículo `.mdx`, directorio multinivel). Reproducido copiando las piezas del vault TAL CUAL a `src/{config,lib,layouts,components,styles,content,pages}` con los alias configurados.

```
npm install            # 387 paquetes, sin conflicto de peers (astro@6.4.8 + @astrojs/mdx@6.0.3)
npx astro check        # Result (29 files): 0 errors, 0 warnings, 115 hints
npx astro build        # 8 page(s) built · Complete! · 0 warnings · sitemap-index.xml creado
npm run build          # (= astro check && astro build) → PASA de extremo a extremo
```

Se verificó además en un **segundo sandbox con el `site.ts` del vault VERBATIM** (estructura exacta `as const` + casts internos, solo slugs rellenados): **0 errores / 0 warnings** — confirma que la forma del scaffold tipa, no solo una versión simplificada.

**Validación del HTML construido:** grafo home Organization + WebSite + LocalBusiness (1 vez); **0 `aggregateRating` fabricado** (B4); BreadcrumbList **1 JSON-LD + 1 microdata** (B3, sin duplicar); Product+Offer; Article + `og:type=article`; y el **CTA "Cotizar" del Header ahora lleva el mensaje de cotización real** (D4 resuelto, ya no degrada al genérico).

### Arreglos aplicados (en el VAULT, la fuente)
| Defecto | Archivo(s) del vault corregidos | Qué se hizo |
|---|---|---|
| D1 | `_scaffold/site.ts`, `_seo/seo.ts` | `site.ts` ampliado a SUPERSET: `SITE.seo/locale/organization/business/social/searchUrl/trailingSlash/allowSelfReviews`, `CONTACT.phoneRaw/schedule`, `SITE.tagline`. `seo.ts` ahora consume `@config/site` y la comparación de `trailingSlash` se widena (ts2367 resuelto). |
| D2 | `_scaffold/site.ts`, `Header/Footer/TopBar/RelatedLinks.astro` | Alias planos `export const PRODUCT_CATEGORIES = TAXONOMY.categories` (+ SERVICES/SECTORS/COVERAGE_STATES) y tipos derivados. `SITE.tagline`, `CONTACT.phoneRaw`, `CONTACT.schedule` añadidos. |
| D3/D5 | `pagina-*.astro`, layouts, `tsconfig.json`, `astro.config.mjs` | PATH ALIASES (`@config @lib @layouts @components @content`) en tsconfig **y** `vite.resolve.alias`. Todos los imports `../../` frágiles reescritos a alias → funcionan a cualquier profundidad. |
| D4 | `_scaffold/site.ts`, `Header/Footer.astro`, `cta-presets.ts` | `WA_MESSAGES.cotizacion` añadido como alias de `cotizar` (mismo texto). El CTA ya no pierde el mensaje. |
| D5/H | `_scaffold/package.json`, `astro.config.mjs` | `@astrojs/mdx@^6` añadido a deps y `mdx()` registrado en la config. Verificado compatible con `astro@^6.4`. SOP 01/04 + Integraciones avisan: NO usar `astro add mdx` (instala v4 y rompe). |
| D6 | `_scaffold/site.ts`, `pagina-home.astro` | `TAXONOMY.categories[].badge` pasa de `null` a `undefined` (compatible con `badge?: string` de ProductCard). |
| D7 | `_scaffold/tsconfig.json` | `compilerOptions.paths` con los 5 alias directamente en el archivo (consistente con el SOP). |
| D8 | `_seo/seo.ts`, `BaseLayout.astro`, `pagina-directorio` | `'page'` añadido al tipo `PageType` y a `buildSchema` (página genérica = grafo base). Se eliminó el `as PageType` que silenciaba el error; default de BaseLayout = `'page'` tipado. |
| Tokens | `_scaffold/tokens.css` | Añadidos `--color-bg`, `--space-12`, `--c-primary-rgb`, `--radius-xl`, `--leading-snug`, `--section-py`, `--z-sticky`, `--transition-base`, `--color-gray-200/400/500`. |
| Latentes (no listados, surgieron en build limpio) | `_seo/seo.ts:serviceSchema`, `SectionHeading.astro`, `_scaffold/astro.config.mjs`, `Footer.astro` | Tipados explícitos `(name: string)`/`(p: string)` (ts7006); JSDoc `@param` en arrow de la config; `BRANCHES` exportado en `site.ts` y leído estático en Footer (elimina el WARN de Vite import dinámico+estático). |
| D10 | 7 notas `.md` (ver §3) | 14 wikilinks corregidos. |
| D9 | — | Carpeta vacía `04 - Diseno y UX/` (sin acento): intento de borrado bloqueado por permisos del sandbox; queda como defecto cosmético residual (no afecta build ni enlaces). |

---

## 2. PRUEBA DE BUILD REAL — DIAGNÓSTICO ORIGINAL (histórico, ya remediado)

> ⬇️ Lo de abajo documenta el estado **antes** de la remediación (los 69 errores). El resultado VERDE final está en la sección "✅ RESULTADO DE LA REVERIFICACIÓN" de arriba. Se conserva para trazabilidad de causa-raíz.

Sandbox: proyecto Astro mínimo en `/tmp/site-test`, ensamblado con TODAS las piezas del vault, `site.ts` rellenado con datos realistas (negocio ficticio "Extintores del Valle", NAP/WA reales en formato válido, sin placeholders tipo 1234), 1 entrada por colección (`productos`, `servicios`, `articulos`) y 4 páginas (home, categoría, ficha de servicio dinámica, ficha de producto dinámica).

### Resultado `astro build` (SSG render)
- **PRIMER build: FALLA.** Error fatal de Vite/Rollup:
  `Could not resolve "../layouts/PageLayout.astro" from "src/pages/extintores/index.astro"`.
- **Tras arreglar imports: FALLA otra vez.** `"PRODUCT_CATEGORIES" is not exported by "src/config/site.ts"` (Header.astro).
- **Tras añadir capa de compatibilidad (alias de exports + objetos `SITE` faltantes): COMPILA** (4 páginas). Pero esa capa son ~45 líneas que **el usuario tiene que escribir a mano y que NO están documentadas** — es exactamente el trabajo que el scaffold debería entregar resuelto.

### Resultado `astro check` (TypeScript)
- **CHECK_EXIT=1 · Result (27 files): 69 errors, 0 warnings, 105 hints.**
- Tras la capa de compatibilidad de imports/exports: **sigue fallando con 44 errores** (35 sólo en `seo.ts`), porque `seo.ts` importa el `SITE`/`CONTACT` planos del scaffold y lee sub-objetos que no existen.
- `package.json` define `build = "astro check && astro build"`, así que **el build oficial aborta en el check** aunque el render por sí solo pudiera pasar.

### Errores exactos (agrupados por causa raíz)

**A) `seo.ts` lee un `SITE`/`CONTACT` que el scaffold NO exporta — 35 errores ts(2339).**
`src/lib/seo.ts` accede a `SITE.seo` (líneas 79, 98, 113, 206, 208, 237, 259, 286, 288), `SITE.trailingSlash` (65), `SITE.locale` (213, 260, 478, 514), `SITE.social` (216), `SITE.organization` (232-247, 285, 326), `SITE.business` (280, 431, 607), `SITE.searchUrl` (253), `SITE.allowSelfReviews` (548) y `CONTACT.phoneRaw` (241, 291, 435). El scaffold `_scaffold/site.ts` sólo exporta `SITE = { name, brand, domain, url, lang, description, defaultImage }` y `CONTACT = { phone, phoneE164, whatsapp, … }`. **`seo.ts:23` afirma "consume SITE y CONTACT desde el scaffold SSoT", pero consume una forma (rica, anidada, estilo EVENTECH/PODIUMEX) que el scaffold (plano, estilo PROYECTORED) no provee.**

**B) Componentes importan exports que `site.ts` no tiene — 9 errores ts(2305) + cascada ts(7006).**
`Header.astro:4`, `Footer.astro:4`, `RelatedLinks.astro:4` importan `PRODUCT_CATEGORIES, SERVICES, SECTORS, COVERAGE_STATES` desde `../config/site`. El scaffold exporta esos datos **anidados** bajo `TAXONOMY.{categories, services, sectors, coverageStates}`, no como nombres planos. Esto vuelve `any` los `.map((cat)=>…)` → 16 ts(7006) adicionales en Header/Footer/RelatedLinks.

**C) `WA_MESSAGES.cotizacion` no existe — 3 errores ts(2339) + bug silencioso de runtime.**
`Header.astro:61,159`, `Footer.astro:31`, `cta-presets.ts:34` usan `WA_MESSAGES.cotizacion`; el scaffold define la clave `cotizar`. Como el código hace `WA_MESSAGES.cotizacion ?? WA_MESSAGES.default`, **en runtime no truena pero degrada silenciosamente**: todos los CTA "Cotizar" del Header/Footer pierden su mensaje de cotización y mandan el mensaje genérico `default` (verificado en el HTML construido).

**D) `SITE.tagline` y `CONTACT.schedule`/`CONTACT.phoneRaw` no existen — ts(2339).**
`TopBar.astro:10,20`, `Footer.astro:27` usan `SITE.tagline`, `CONTACT.phoneRaw`, `CONTACT.schedule` (no están en el scaffold; sí existían en el `site.ts` de PROYECTORED de donde se extrajeron los componentes).

**E) Profundidad de import equivocada en `pagina-categoria.astro` — ts(2307) + build fatal.**
La plantilla usa `import … from "../layouts/PageLayout.astro"` y `"../config/site"` (profundidad de `src/pages/X.astro`), pero **su propio comentario de cabecera dice copiarla a `src/pages/{categoria}/index.astro`** (un nivel más profundo). Ahí los imports deben ser `../../`. Es el único error que **tumba el `astro build`** de golpe (Rollup no resuelve el módulo).

**F) `TAXONOMY.categories[].badge: null` incompatible con `ProductCard` — ts(2322).**
`pagina-home.astro:60` pasa `badge={cat.badge}` a `<ProductCard>`, cuya prop es `badge?: string`. El scaffold pone `badge: null` en las categorías. `null` no es asignable a `string | undefined`.

**G) Latente: `pageType="page"` no es un `PageType` válido.**
`BaseLayout.astro:54` (`pageType = "page" as PageType`) y `pagina-directorio-[...slug].astro:111` (`"directory" | "page"`). `PageType = 'home'|'category'|'product'|'service'|'article'|'directory'|'faq'` — `"page"` no existe. El `as PageType` **silencia el error de tipo**; en runtime `buildSchema` cae a `default` (no truena) pero el valor es semánticamente inválido y `pagina-directorio` lo pasa como prop tipada.

**H) Defecto de empaque: el blog requiere `@astrojs/mdx` pero no hay versión guía.**
La colección `articulos` es `.mdx` (obligatorio por D3), pero `_scaffold/astro.config.mjs` no incluye `@astrojs/mdx` y `package.json` no lo lista. Al añadirlo, `@astrojs/mdx@4` (lo "natural") **rompe**: peer `astro@^5`, incompatible con el `astro@^6.1.1` del scaffold. La versión correcta es `@astrojs/mdx@^6` (peer `astro@^6.4`). El vault no dice qué versión usar.

---

## TABLA DE DEFECTOS

| # | Sev | Archivo(s) | Defecto | Arreglo sugerido |
|---|-----|-----------|---------|------------------|
| D1 | 🔴 Crítico | `_seo/seo.ts` ↔ `_scaffold/site.ts` | `seo.ts` lee `SITE.seo/locale/organization/business/social/searchUrl/trailingSlash/allowSelfReviews` y `CONTACT.phoneRaw`; el scaffold no los exporta. 35 errores de tipo; sin esto el SEO/JSON-LD no tipa. **No documentado.** | Elegir UN contrato `SITE`. Recomendado: ampliar `_scaffold/site.ts` con los sub-objetos (`organization`, `business`, `seo`, `locale`, `social`, etc.) que `seo.ts` espera, con marcadores `{{...}}`. Alternativa: reescribir `seo.ts` para derivar todo de `SITE/CONTACT` planos. |
| D2 | 🔴 Crítico | `Header.astro`, `Footer.astro`, `TopBar.astro`, `RelatedLinks.astro` | Importan `PRODUCT_CATEGORIES/SERVICES/SECTORS/COVERAGE_STATES`, `SITE.tagline`, `CONTACT.phoneRaw/schedule` que el scaffold no exporta (los anida en `TAXONOMY` / no existen). **No documentado.** | En `_scaffold/site.ts` exportar alias planos (`export const PRODUCT_CATEGORIES = TAXONOMY.categories`, etc.) y añadir `SITE.tagline`, `CONTACT.phoneRaw`, `CONTACT.schedule`; o reescribir los componentes para leer `TAXONOMY.*`. |
| D3 | 🔴 Crítico | `pagina-categoria.astro` | Imports `../layouts` / `../config` no resuelven en la ruta de destino documentada (`src/pages/{categoria}/index.astro`). **Tumba `astro build`.** | Usar `../../layouts/…` y `../../config/site` en la plantilla, o documentar que va en `src/pages/X.astro` (depth 1). |
| D4 | 🟠 Mayor | `Header.astro`, `Footer.astro`, `cta-presets.ts` | `WA_MESSAGES.cotizacion` no existe (scaffold: `cotizar`). 3 errores; bug silencioso de runtime (CTA pierde el mensaje de cotización). | Renombrar a `cotizar` en los 4 sitios, **o** añadir clave `cotizacion` a `WA_MESSAGES`. Unificar el nombre en todo el vault. |
| D5 | 🟠 Mayor | `_scaffold/astro.config.mjs`, `_scaffold/package.json` | El blog `.mdx` exige `@astrojs/mdx`, ausente; y `@astrojs/mdx@4` (peer `astro@^5`) es incompatible con `astro@^6`. | Incluir `@astrojs/mdx@^6` en `package.json` y registrarlo en `astro.config.mjs` (comentado/activable). Documentar la versión `^6` en SOP 01. |
| D6 | 🟠 Mayor | `pagina-home.astro:60` + `ProductCard.astro` | `TAXONOMY.categories[].badge: null` vs prop `badge?: string`. ts(2322). | En el scaffold usar `badge: undefined` (no `null`), o tipar la prop como `badge?: string \| null`, o filtrar `badge ?? undefined` al pasarla. |
| D7 | 🟠 Mayor | `_scaffold/tsconfig.json` ↔ layouts | El `tsconfig.json` del scaffold NO define `@components/*` aunque todos los layouts lo importan. *(Mitigado: SOP 01 §4 sí instruye añadirlo — el archivo y el SOP son inconsistentes.)* | Incluir `compilerOptions.paths` con `@components/*` (y `@layouts/*`) directamente en `_scaffold/tsconfig.json`. |
| D8 | 🟡 Menor | `BaseLayout.astro:54`, `pagina-directorio-[...slug].astro:111` | `pageType="page"` no pertenece a `PageType`; el `as PageType` silencia el error. Valor semánticamente inválido. | Cambiar el default a `'home'` o añadir `'page'` a `PageType` y a `buildSchema`. En directorio, tipar `pageType: PageType = "directory"`. |
| D9 | 🟡 Menor | Estructura del vault | Carpeta duplicada por acento: `04 - Diseño y UX/` (con contenido) y `04 - Diseno y UX/` (vacía). | Eliminar la carpeta vacía `04 - Diseno y UX/`. |
| D10 | 🟡 Menor | 14 wikilinks (ver abajo) | Enlaces `[[...]]` que no resuelven a ninguna nota/archivo del vault. | Corregir destinos (ver sección 3). |

---

## TOKENS CSS FALTANTES (Verificación 1) — ✅ AÑADIDOS

> ✅ Los 11 tokens se añadieron a `_scaffold/tokens.css`: los 2 que rompían (`--color-bg`, `--space-12`) y los 9 de solo-fallback (`--c-primary-rgb` = `211, 47, 47`, `--radius-xl`, `--leading-snug`, `--section-py`, `--z-sticky`, `--transition-base`, `--color-gray-200/400/500`), con valores coherentes con la escala canónica `--c-*`/`--sp-*`. Detalle original abajo.


`var(--token)` usados pero **no** definidos en `_scaffold/tokens.css` ni en su puente de alias. Los que se usan **sin fallback rompen visualmente**; los que tienen fallback `var(--x, valor)` degradan al fallback (deuda, no rotura).

**Rompen (sin fallback) — 2 reales:**
- `--color-bg` → `ServiceLayout.astro:412, 416` (fondo de `.svc-hero__meta dl` y `.svc-toc`).
- `--space-12` → `ServiceLayout.astro:406` (padding del hero de servicio).
  *(El "—token" detectado en ServiceLayout:404 es un FALSO POSITIVO: aparece dentro de un comentario «CSS vanilla con tokens var(--token)».)*

**Usados sólo con fallback (degradan, deberían existir o migrarse) — 9:**
`--c-primary-rgb` (Header:194,213 · usado en `rgba(var(--c-primary-rgb,…))`), `--radius-xl` (ProductCard/ServiceCard), `--leading-snug` (ProductCard/ServiceCard), `--section-py` (FAQAccordion/RelatedLinks), `--z-sticky` (ServiceLayout:416), `--transition-base` (pagina-directorio:252), `--color-gray-200/400/500` (CTABanner). Nota: el puente declara `--color-gray-50/100/700/900` pero **faltan** `--color-gray-200/400/500` que los componentes sí usan.

**Total faltantes: 11** (2 que rompen + 9 sólo-fallback). Tokens definidos: 77 (incl. puente). Usados únicos: 86.

---

## BREADCRUMB / RATINGS (Verificación 1, validado en HTML construido)
- ✅ **BreadcrumbList JSON-LD se emite UNA sola vez**, desde `seo.ts`/`BaseLayout`. En la página de categoría construida: 1 `"@type":"BreadcrumbList"` (JSON-LD) + 1 `schema.org/BreadcrumbList` (microdata visible del componente `Breadcrumbs.astro`, que **no** emite JSON-LD). Correcto (regla B3).
- ✅ **Cero `aggregateRating` fabricado**. `emitReviews()` devuelve `{}` salvo reseñas reales + `SITE.allowSelfReviews`. El HTML construido no contiene `aggregateRating`/`AggregateRating`. Correcto (regla B4).
- Observación: con el `site.ts` base (sin `SITE.business`), la home emite Organization + WebSite + ContactPoint + ImageObject pero **no LocalBusiness** (guardado por `if (SITE.business)`). Coherente, pero un sistema "negocio local" no emitirá LocalBusiness hasta que el usuario defina `SITE.business` — que hoy ni existe en el scaffold (ver D1).

---

## 3. INTEGRIDAD DE WIKILINKS — **14 enlaces rotos → ✅ CORREGIDOS**

> ✅ Los 14 se corrigieron: (a) wikilinks a archivos de código (`[[_layouts/*]]`, `[[pagina-*]]`, `[[pagina-directorio-[...slug]]]`) pasaron a **referencias en `código`** (backticks) con la extensión real, en `08/00 - Indice de Plantillas.md`, `05/01 - Tipos de Pagina.md` y `05/03 - Directorios y Paginas Locales.md`; (b) los wikilinks a carpetas se apuntaron a la **nota índice real**: `[[../07 - SOPs]]` → `[[00 - Indice de SOPs]]` (en `03/00` y `03/01`), `[[../02 - Arquitectura Astro]]` → `[[02 - Arquitectura Astro/01 - Scaffold y Estructura]]` (en `03/03`); (c) `[[../03 - Sistema de Diseño/Contrato site.ts]]` → `[[02 - Arquitectura Astro/01 - Scaffold y Estructura]]` (en `09/00 - Inventario.md`). Nota: `[[site.ts]]` se mantiene como wikilink (resuelve por basename a `_scaffold/site.ts`; no estaba entre los 14 rotos).

(Excluidos `_AUDITORIA/diagnostico-*`. Se resolvió por basename, por ruta relativa y por nombre-con/sin-`.md`, al estilo Obsidian.)

### Detalle original de los 14 (histórico):

**a) Apuntan a archivos de código que existen pero NO como `.md` (wikilink no resoluble sin extensión/ruta) — 11:**
- `[[_layouts/BaseLayout]]`, `[[_layouts/PageLayout]]`, `[[_layouts/ProductLayout]]`, `[[_layouts/ServiceLayout]]`, `[[_layouts/ArticleLayout]]` ← `08 - Biblioteca Plantillas/00 - Indice de Plantillas.md`. (Los `.astro` existen; el wikilink bare no los resuelve.)
- `[[pagina-home]]`, `[[pagina-categoria]]`, `[[pagina-servicio]]`, `[[pagina-producto]]`, `[[pagina-articulo]]` ← `00 - Indice de Plantillas.md` y `05 - Produccion de Contenido/01 - Tipos de Pagina.md`. (Existen como `.astro`/`.mdx`.)
- `[[pagina-directorio-[...slug]]]` ← 3 docs. **Genuinamente irresoluble**: el `[...]` en el nombre del archivo impide el wikilink.

**b) Apuntan a carpetas (no a notas) — 2:**
- `[[../02 - Arquitectura Astro]]` ← `03 - SEO Master System/03 - On-page y Metadatos.md`.
- `[[../07 - SOPs]]` ← `03 - SEO Master System/00 - Indice SEO.md`, `01 - SEO Tecnico.md`. (Son carpetas; no hay nota homónima.)

**c) Destino inexistente — 1:**
- `[[../03 - Sistema de Diseño/Contrato site.ts]]` ← `09 - Biblioteca Componentes/00 - Inventario.md`. La carpeta real es `04 - Diseño y UX/` (no "03 - Sistema de Diseño") y no existe la nota "Contrato site.ts".

*Sugerencia:* para (a), enlazar con extensión o con ruta completa (`[[08 - Biblioteca Plantillas/pagina-home.astro]]`) o crear notas-índice; para (b)/(c), apuntar a la nota índice real de la carpeta (p.ej. `[[00 - Indice de SOPs]]`) y corregir la ruta de "Sistema de Diseño".

---

## 4. HUECOS Y EVIDENCIA — ✅ Correcto

**Docs n8n / fal.ai / Brevo / backend de leads: bien marcados como huecos, NO presentados como hechos.**
- `06 - Automatizaciones/02 - Pipeline de Contenido n8n.md`, `03 - Generacion de Imagenes fal.ai.md`, `04 - Email y Leads Brevo.md` abren los tres con `> ⚠️ HUECO: no implementado — diseño propuesto.` y afirman explícitamente "**No existe en ningún repo**".
- Citan evidencia con ruta y línea: p.ej. `GAMADEMEXICO CotizacionForm.astro:266-287`, `EVENTECH cotizar/index.astro:319-355`, `INFLAPY blog/index.astro:1237-1303`, y enlazan a `[[../_AUDITORIA/diagnostico-*]]`. La distinción real/propuesto es clara y honesta.
- SOPs que tocan automatización/imágenes/leads (`SOP 08`, `SOP 09`, `SOP 05`) también llevan marcas de hueco.

**Muestreo de evidencia en docs core:** `03 - SEO Master System` (01, 02, 03, 04) y `02 - Arquitectura Astro/01` citan rutas `/src/`, `.astro:línea` y `diagnostico-*` de forma consistente.

**Huecos NO marcados / silenciosos detectados → ✅ RESUELTOS:**
1. ✅ **El desajuste de contrato `site.ts` ↔ `seo.ts` (D1) y `site.ts` ↔ componentes (D2) quedó resuelto y documentado.** Ya no hay desajuste: `site.ts` es el SUPERSET que provee TODO lo que `seo.ts` y los componentes consumen. SOP 01 §5 ahora documenta el contrato superset explícitamente (qué sub-objetos trae y para qué). El usuario que sigue el SOP **obtiene un proyecto que compila**.
2. ✅ Los componentes siguen siendo "data-driven desde `config/site`" — y ahora el `config/site` real (el scaffold) **sí tiene la forma** que consumen (alias planos `PRODUCT_CATEGORIES`/`SERVICES`/`SECTORS`/`COVERAGE_STATES`). Coherente con `00 - Inventario.md` y `00 - Indice de Plantillas.md`.

---

## CÓMO REPRODUCIR
```
cd /tmp && (estructura Astro mínima)
# copiar _scaffold, _layouts, _seo, _src -> src/{config,layouts,lib,components,styles}
# rellenar site.ts (datos reales) + content.config.ts (enums) + astro.config (dominio + mdx@^6)
# 1 .md por colección (productos/servicios/articulos) + index.astro + extintores/index.astro + rutas dinámicas
npm install            # OJO: @astrojs/mdx debe ser ^6 (no ^4) con astro@^6
npx astro check        # -> 69 errors  (FALLA)
npx astro build        # -> Could not resolve "../layouts/PageLayout.astro" (FALLA)
```

---
*Fin del reporte. Cero invención: cada error proviene de la salida real de `astro check`/`astro build` sobre el vault ensamblado.*
