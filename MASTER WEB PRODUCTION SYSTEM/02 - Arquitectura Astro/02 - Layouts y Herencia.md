# Layouts y Herencia
> Propósito: la jerarquía de layouts canónica y cómo extenderla sin duplicar.

Origen canónico: **BOMBERO** (BaseLayout→PageLayout limpio). Anti-patrones evitados: God-layout de 24 props (GAMADEMEXICO `Base.astro`), 3 layouts ~95% duplicados (EVENTECH). Código en `08/_layouts/`.

## Jerarquía (3 niveles)

```
BaseLayout.astro        <head>, SEO (buildMeta), JSON-LD (buildSchema), tokens.css, <slot/>
  └─ PageLayout.astro   Header + Breadcrumbs + <main><slot/></main> + Footer + WhatsAppFloat
       ├─ ProductLayout.astro   ficha L4 producto (specs, applications, certifications)
       ├─ ServiceLayout.astro   ficha L4 servicio, schema-driven (10 bloques opcionales)
       └─ ArticleLayout.astro   artículo de blog (.mdx)
```

Home, Categoría y Directorio usan **PageLayout directo** (no necesitan layout de tipo).

## Contrato de props

**BaseLayout:** `{ title, description, canonical?, image?, pageType?, schemaData?, noindex? }`
- Emite `<head>` vía `buildMeta()` y el JSON-LD vía `buildSchema(pageType, schemaData)`.
- El breadcrumb JSON-LD se emite **aquí, una sola vez** (el componente `Breadcrumbs` solo pinta, no emite schema). Regla B3.

**PageLayout:** `{ ...BaseLayout, breadcrumbs? }` — añade chrome (Header/Footer/WhatsAppFloat) y la barra visual de breadcrumbs.

**Layouts de tipo:** extienden PageLayout y reciben la entidad (`product`, `service`, `article`) ya tipada desde la Content Collection. Los bloques ricos (specs, FAQ, casos) son props opcionales.

## Reglas

1. **Máximo 3 niveles.** Si un layout necesita >10 props, parte la página en componentes de sección.
2. **El `<head>` vive solo en BaseLayout.** Ningún layout/página inferior toca metas o JSON-LD directamente.
3. **`tokens.css` se importa una sola vez** (en BaseLayout). Ver [[01 - Design Tokens]].
4. **Cero CSS global disperso.** Estilos de sección en su componente; tokens compartidos en `:root`.

Ver plantillas que los usan en [[08 - Biblioteca Plantillas/00 - Indice de Plantillas]].
