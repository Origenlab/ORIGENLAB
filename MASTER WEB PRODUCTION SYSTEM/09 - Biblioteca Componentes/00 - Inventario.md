# 00 — Inventario de la Biblioteca de Componentes

> Propósito: catálogo de los componentes Astro 6 canónicos del Vault Maestro — la MEJOR versión real de cada pieza recurrente del ecosistema OrigenLab (28 codebases auditados), limpiada y estandarizada. Todos en `_src/`, copy-paste, CSS vanilla con `var(--token)`, props tipados con `interface`. **Contrato:** consumen `SITE`/`CONTACT`/`waUrl()`/taxonomías desde `../config/site` (nunca datos hardcodeados) y una sola fuente de tokens en `:root`. Origen de tokens y contrato en [[../_PATRONES/patrones-canonicos]] (C1, C2, C4, D4). Para construir páginas con estos componentes ver [[../08 - Biblioteca Plantillas/00 - Indice de Plantillas]].

## Cómo usar esta biblioteca
1. Copia `_src/*.astro` a `src/components/` del proyecto nuevo.
2. Asegura que exista `src/config/site.ts` con el contrato (`SITE`, `CONTACT`, `waUrl`, `WA_MESSAGES`, `PRODUCT_CATEGORIES`, `SERVICES`, `SECTORS`, `COVERAGE_STATES`). Modelo canónico: PROYECTORED — ver [[02 - Arquitectura Astro/01 - Scaffold y Estructura]] o `PROYECTORED/src/config/site.ts`.
3. Define los design tokens en `:root` (un solo archivo `global.css`). Nombres canónicos: `--color-red/-red-dark/-red-light`, `--color-gray-*`, `--c-primary/-primary-dark/-primary-light/-primary-rgb` y `--c-ink/-ink-2/-muted/-surface/-border/-white` (alias para Header/Footer/TopBar), `--sp-1..32`, `--text-xs..5xl`, `--weight-*`, `--leading-*`, `--radius-*`, `--container-max`, `--container-px`, `--section-py`, `--topbar-height`, `--header-height`. Todos los componentes traen **fallback inline** en cada `var(--token, fallback)`, así que rinden aunque falte un token.
4. El esquema de color por defecto es rojo (cluster contra-incendios). Para retematizar basta cambiar los tokens `--color-red*` y `--c-primary*` en `:root` — los componentes no traen hex de marca salvo el verde fijo de WhatsApp (#25D366) y los oscuros del hero/footer.

## Regla de JSON-LD (importante)
El schema estructurado se emite en **un solo lugar**: `lib/seo.ts` / el `BaseLayout` (patrón B1–B4, anti-duplicación). Por eso:
- **Breadcrumbs.astro** emite microdata visible pero **NO** `<script type="application/ld+json">`.
- **FAQAccordion.astro** trae `emitSchema` en `false` por defecto; sólo actívalo si esa sección es la única fuente de las FAQs y `seo.ts` no las emite.
- Ningún otro componente emite JSON-LD.

## Tabla de componentes

| Componente | props (nombre:tipo) | dónde se usa | origen (ruta real) | dependencias |
|---|---|---|---|---|
| **Header.astro** | `logo?:string` (lee `SITE.logo`); mega-menú/dropdowns data-driven | Layout, todas las páginas (cabecera sticky) | `PROYECTORED/src/components/global/Header.astro` | `config/site` (PRODUCT_CATEGORIES, SERVICES, SECTORS, COVERAGE_STATES, SITE, waUrl, WA_MESSAGES); JS scoped; tokens `--c-*`, `--header-height`, `--topbar-height` |
| **Footer.astro** | `certifications?:{label,title?}[]` · `branches?:{label,address,mapsUrl?}[]` · `logo?:string` · `seoTagline?:string` | Layout, todas las páginas (pie) | `PROYECTORED/src/components/global/Footer.astro` | `config/site` (SITE, CONTACT, BRANCHES?, PRODUCT_CATEGORIES, SERVICES, SECTORS, COVERAGE_STATES, waUrl, WA_MESSAGES); tokens `--color-*`, `--sp-*` |
| **TopBar.astro** ⭐extra | — (lee SITE/CONTACT/WA_MESSAGES) | Layout, antes de `<Header/>` (barra utilitaria sticky) | `PROYECTORED/src/components/global/TopBar.astro` | `config/site` (SITE, CONTACT, waUrl, WA_MESSAGES); tokens `--color-red`/`--c-primary`, `--topbar-height` |
| **Hero.astro** | `badge?:string` · `title:string` · `accent?:string` · `subtitle?:string` · `descRight?:string[]` · `ctas?:HeroCTA[]` · `ariaLabel?:string` | L1/L2/L3 (cabecera de página) | `PROYECTORED/.../sections/Hero.astro` + fondo de `MESECI/.../HeroBase.astro` | tokens `--color-red*`, `--text-*`, `--sp-*`, `--container-max`; CTAs opcionales (REGLA HeroBase) |
| **ProductCard.astro** | `title:string` · `href:string` · `image?:string` · `imageAlt?:string` · `badge?:string` · `description?:string` · `ctaLabel?:string` · `index?:number` · `priority?:boolean` | Grids de catálogo (L2 categoría, productos relacionados) | `PROYECTORED/.../CatalogoProductos.astro` (.ccard) + `MESECI/.../RelatedProducts.astro` | sólo tokens (atómico); imagen estática con `width/height` (anti-CLS) |
| **ServiceCard.astro** | `title:string` · `description:string` · `href:string` · `icon?:string` · `image?:string` · `imageAlt?:string` · `badge?:string` · `ctaLabel?:string` · `whatsapp?:boolean` | Grids de servicios (L2 servicios, home) | `PROYECTORED/.../CatalogoServicios.astro` (.ccard) + `MESASPICNIC/.../ServiceCard.astro` | sólo tokens (atómico); CTA WhatsApp vía `waUrl` en el href que pases |
| **CTABanner.astro** | `heading:string` · `desc?:string` · `btns?:BtnDef[]` · `badge?:string` · `variant?:'red'\|'dark'\|'light'` · `centered?:boolean` | Cierre de páginas L1/L2/L3/blog | `MESECI/src/components/CTABanner.astro` | `cta-presets.ts` (presets); botones WhatsApp vía `waUrl` (en presets); tokens `--color-red*` |
| **cta-presets.ts** ⭐config | exporta `PRESET_GENERAL\|PRESET_CATEGORIA\|PRESET_CONTACTO:CTAPreset` | importado por páginas que usan CTABanner | `MESECI/src/config/cta-presets.ts` | `config/site` (waUrl, WA_MESSAGES) |
| **WhatsAppFloat.astro** | `message?:keyof WA_MESSAGES` · `label?:string` | Layout, todas las páginas (botón flotante) | `PROYECTORED/.../global/WhatsAppButton.astro` | `config/site` (waUrl, WA_MESSAGES); tokens `--sp-*`, `--radius-full`; verde #25D366 fijo |
| **Breadcrumbs.astro** | `items:{label,href?}[]` | Layout/páginas internas (entre header y hero) | `PROYECTORED/src/components/ui/Breadcrumb.astro` | sólo tokens; microdata schema.org **sin JSON-LD** (lo emite seo.ts) |
| **FAQAccordion.astro** | `items:FAQItem[]` · `title?:string` · `headingId?:string` · `emitSchema?:boolean` · `openFirst?:boolean` | L2/L3/producto/blog (sección de dudas) | `MESECI/src/components/FAQ.astro` + `PROYECTORED/.../FaqCotizacionIndex.astro` | sólo tokens; `<details>` nativo; JSON-LD opcional (default off) |
| **SectionHeading.astro** | `id?` · `eyebrow?` · `title:string` · `titleAccent?` · `desc?` · `layout?:'simple'\|'duo'` · `align?:'center'\|'left'` · `body?:string[]` · `dark?:boolean` · `as?:'h2'\|'h3'` | Encabezado de cualquier sección | `PROYECTORED/.../ui/SectionHeader.astro` + `SectionHeaderDuo.astro` | sólo tokens (atómico) |
| **RelatedLinks.astro** | `current?:string` · `limit?:number` · `title?:string` · `desc?:string` · `links?:LinkItem[]` | Cierre de categorías/producto (cross-link SEO) | `PROYECTORED/.../sections/CategoriasRelacionadas.astro` | `config/site` (PRODUCT_CATEGORIES) o `links` manuales; tokens |

⭐ extra/config = pieza añadida sobre los 11 solicitados por su alta reutilización.

## Fichas individuales (5 componentes más usados)
- [[Header]] — cabecera global
- [[Footer]] — pie global
- [[Hero]] — cabecera de página
- [[CTABanner]] — banner de conversión
- [[WhatsAppFloat]] — botón flotante

## Notas de adopción / huecos
- ⚠️ **HUECO suavizado: Header.MEGA_SUBCATEGORIES.** Las subcategorías del mega-menú son las únicas etiquetas que viven en el componente (no en config) porque varían por proyecto y dependen de qué páginas L3 existan. Edítalas en el frontmatter del Header. Idealmente migrarlas a `config/site` cuando la taxonomía L3 esté cerrada.
- ⚠️ **HUECO: rutas de navegación.** Header/Footer asumen rutas `/productos/ /servicios/ /cobertura/ /sectores/ /blog/ /contacto/`. Ajusta los hardcodes de ruta si el proyecto usa otra estructura (LGA usa `/empresas/` en vez de `/cobertura/`). Las categorías/servicios sí salen de config.
- ⚠️ **Tokens `--c-*` requeridos por Header/Footer/TopBar.** Estos 3 usan los alias `--c-primary*` y `--c-ink/-muted/-border/-surface/-white`. Defínelos en `:root` (ver paso 3). Traen fallback, pero conviene declararlos para coherencia de marca.
- Los componentes son **mobile-first y accesibles**: foco visible, `aria-*`, `prefers-reduced-motion`, touch targets ≥44px, `env(safe-area-inset-*)` en el botón flotante.
