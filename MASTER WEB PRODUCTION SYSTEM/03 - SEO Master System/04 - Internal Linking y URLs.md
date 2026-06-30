# 04 — Internal Linking y URLs
> Propósito: fijar la taxonomía de URLs (L1–L5), las migas de pan (emitidas una sola vez) y el enlazado interno data-driven que distribuye autoridad entre catálogo, servicios, zonas y blog.

El internal linking es el diferenciador SEO de los mejores proyectos del ecosistema (BOMBERO, SEGURIDADPRIVADA). Se construye desde las taxonomías de `src/config/site.ts` y las Content Collections, no a mano página por página.

---

## 1. Arquitectura de URLs — niveles L1–L5
**Canónico (patrón A6, spec autorizada PROYECTORED):**

| Nivel | Qué es | Patrón de URL | Ejemplo |
|---|---|---|---|
| L1 | Home | `/` | `/` |
| L2 | Categoría / hub | `/{categoria}/` | `/extintores/` |
| L3 | Subcategoría | `/{categoria}/{subcat}/` | `/extintores/co2/` |
| L4 | Ficha producto/servicio | `/{categoria}/{subcat}/{ficha}/` | `/productos/cascos/msa-cairns/` |
| L5 | Variante | `…/{variante}/` | `…/dorada-champagne/` |

Reglas:
- **kebab-case ASCII sin acentos.** Normalizar con NFD (ñ→n). Origen: `BOMBERO/directorio-index.ts:58` (`toSlug()`).
- **El slug = keyword.** PODIUMEX: `renta-de-podiums`, `acrilico-negro-compacto` (slug = keyword objetivo).
- **Estructura de carpetas = URL** cuando se usa `index.astro` por carpeta (EVENTECH).
- **`trailingSlash` coherente** con [[01 - SEO Tecnico]] §1 — `never` canónico.
- **Arquetipo D (directorio):** rutas dinámicas `[...slug]` desde colección. Ej.: `/directorio/{estado}/{estacion}/` (BOMBERO), `/directorio/{region}/{zona}/{venue}/` (EVENTECH 211 venues), `/zonas/{slug}` (SEGURIDADPRIVADA 11 zonas).

> Redirects 301 de marketing/typos → URL canónica (origen BOMBERO `astro.config.mjs:102` + `_redirects`). Mantener en UN solo lugar para evitar drift (BOMBERO advierte del riesgo en `_redirects:7–9`).

---

## 2. Breadcrumbs (migas de pan)
**Visual + JSON-LD, pero el JSON-LD se emite UNA sola vez** (ver [[02 - Schema JSON-LD por tipo]] §5).

- El componente `<Breadcrumb items={[...]}>` renderiza la UI (con microdata visual opcional) pero **NO** emite `BreadcrumbList` JSON-LD.
- El `BreadcrumbList` JSON-LD lo emite `buildSchema()` al recibir `data.breadcrumbs`.
- Primer item siempre "Inicio" → `/`. Último item = página actual (sin enlace navegable, pero con `item` en el schema).

Evidencia del anti-patrón a evitar: BOMBERO `Breadcrumb.astro` auto-emite schema **y** la página vuelve a pasarlo (`index.astro:17,76`) → doble `BreadcrumbList`. RENTADEILUMINACION igual (BaseLayout + componente). El Vault separa UI y schema.

```astro
---
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Recarga de extintores', path: '/servicios/recarga-de-extintores' },
];
const schema = buildSchema('service', { service, breadcrumbs });
---
<Breadcrumb items={breadcrumbs} />   <!-- solo UI, sin JSON-LD -->
```

---

## 3. Internal linking data-driven
**Canónico (patrón B6): componente `RelatedLinks` alimentado por taxonomía**, no enlaces hardcodeados.

Las taxonomías viven en `src/config/site.ts` `as const` (origen PROYECTORED `PRODUCT_CATEGORIES`, `SERVICES`, `SECTORS`, `COVERAGE_STATES`, `QUICK_LINKS`). Los enlaces se derivan de:
- **`reference()` entre colecciones** (producto→categoría→marca). Origen: FIREFIGHTERMX `content/config.ts` (relaciones tipadas), MEDEDUL (grafo `reference()`).
- **Campos de relación en frontmatter:** `relatedServices`, `relatedBlogPosts`, `relatedPosts`. Origen: SEGURIDADPRIVADA (servicios↔zonas↔blog por `relatedServices`/`cluster`/`pillar`), EVENTECH (`relatedServices/Events/Posts`).
- **Pools contextuales por sección:** `QuickNav` con pools por URL (seed determinista). Origen: BOMBERO `quick-nav-pools.ts` + `QuickNav.astro` (interlinking programático por sección).

Componentes reutilizables del ecosistema (referencia para [[../09 - Biblioteca Componentes/00 - Inventario]]):
- `QuickNav` / `QuickLinksBar` (FIREFIGHTERSMX, BOMBERO) — accesos rápidos por sección.
- `RelatedContent` / `RelatedCategories` (EVENTECH 394 l., CLINICADEBELLEZA) — relacionados al final del contenido.
- `PreFooterNav` / `LinksModule` (BOMBERO, PODIUMEX) — módulo de descubrimiento pre-footer en TODAS las páginas.
- `ProductSidebar` (PODIUMEX, BOMBERO) — sidebar de ficha que enlaza a otros modelos, EPP, artículos y directorio.
- Deep-links cruzados: `StateDeepLinks`/`StationDeepLinks` + mapas `directorio-productos-map.ts`/`blog-productos-map.ts` (BOMBERO) — el directorio y el catálogo se enlazan mutuamente.

---

## 4. Patrón de enlazado por arquetipo
Cómo fluye la autoridad (modelo SEGURIDADPRIVADA/BOMBERO):
- **A (catálogo):** Home → L2 categorías → L4 fichas; ficha → otras variantes + categoría padre + artículos relacionados + directorio. Cross-link categoría↔sector (FIREFIGHTERMX `SECTORES_POR_CATEGORIA`).
- **B (renta):** Home → servicios de renta → producto; cross-link evento↔servicio.
- **C (servicio local):** clusters/pillars vinculan blog↔servicios↔zonas para autoridad temática. SEGURIDADPRIVADA: pillars `guardias-intramuros`/`seguridad-residenciales`/`seguridad-condominios` conectan los tres tipos de contenido.
- **D (directorio):** entidad → estados vecinos + entidades cercanas + categoría de producto relevante (BOMBERO `estados-vecinos.ts`). El directorio enlaza al catálogo como red de captura.

Regla: **toda página debe enlazar y ser enlazada** (sin huérfanas). SEGURIDADPRIVADA pasó de "0/20 → 20/20 con links internos" (AUDIT-REPORT) precisamente cerrando huérfanas.

---

## 5. Anti-patrones de enlazado (evitar)
- ❌ **Enlaces a páginas inexistentes.** BOMBERO `navigation.ts:255` enlaza `/capacitacion/` que no existe (sin `.md`/`.astro`). → El gate de CI debe incluir un **link-checker** (ver [[01 - SEO Tecnico]] §8).
- ❌ **Componente de related desactivado** dejando llamadas no-op. EVENTECH `CTABanner` desactivado con ~200 llamadas vivas → no renderiza nada. Si se desactiva un componente, quitar sus usos.
- ❌ **Blog como `.astro` sueltos** (rompe el enlazado por taxonomía). MESASPICNIC (75), RENTADEILUMINACION (128), PODIUMEX. **Canónico (D3): blog siempre en colección `.mdx`** con `relatedPosts`/`tags`/`category` para derivar relacionados.

---

## 6. Conversión WhatsApp-first (enlaces de salida del funnel)
Patrón D4 (universal). Los CTA enlazan a `waUrl(msg)` desde `src/config/site.ts` con mensaje pre-armado por intención/página — **nunca número hardcodeado** (origen PROYECTORED `WA_MESSAGES` + `waUrl()`, 30 mensajes segmentados). Esto convierte el internal linking en conversión: cada hub/ficha empuja al lead con contexto pre-cargado.

⚠️ Anti-patrón: WhatsApp hardcodeado en BRINCOLINS/MESASPICNIC/MANEXT (×6 sin SSoT). Siempre vía `waUrl()`.

---

## Checklist internal linking & URLs (por proyecto)
- [ ] URLs L1–L5 kebab-case ASCII; slug = keyword; `trailingSlash` coherente.
- [ ] Breadcrumb visual + JSON-LD UNA sola vez (componente no emite schema).
- [ ] `RelatedLinks`/`QuickNav` data-driven desde taxonomía/`reference()`/frontmatter.
- [ ] Módulo de descubrimiento pre-footer en todas las páginas.
- [ ] Cero páginas huérfanas; cero enlaces a rutas inexistentes (link-checker en CI).
- [ ] Blog en colección `.mdx` con relacionados por taxonomía.
- [ ] CTAs WhatsApp vía `waUrl()` con mensaje por intención (sin número hardcodeado).
