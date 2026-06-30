# Convenciones — nombres, carpetas, rutas
> Propósito: que todo proyecto se vea y se navegue igual.

## Estructura `src/` (canónica)
Ver [[estructura-carpetas]] para el árbol completo. Resumen:
```
src/
├── config/site.ts        SSoT del negocio
├── content/              Content Collections (config + entradas)
├── content.config.ts     esquemas Zod
├── data/                 taxonomías y datasets .ts tipados
├── layouts/              Base → Page → {Product,Service,Article}
├── components/           UI (ver Biblioteca de Componentes)
│   ├── global/           Header, Footer, TopBar, WhatsAppFloat
│   ├── sections/         Hero, CTABanner, secciones de página
│   └── ui/               Breadcrumbs, Card, FAQAccordion, SectionHeading
├── lib/seo.ts            metas + JSON-LD
├── pages/                rutas (usa plantillas de 08)
└── styles/tokens.css     fuente única de tokens
```

## Nombres
- **Componentes:** PascalCase (`ProductCard.astro`).
- **Datos/utilidades:** camelCase (`site.ts`, `seo.ts`); datasets en `data/` minúscula-kebab (`productos.ts`).
- **Colecciones:** plural en español (`productos`, `servicios`, `articulos`, `zonas`, `casos`).
- **Slugs/URLs:** minúsculas, kebab-case, **sin acentos** (`guias`, no `guías`). *(Falla: categorías duplicadas por acento en INFLAPY.)*

## Rutas (URLs)
Coherentes con `TAXONOMY` y el nivel:
- L1 Home `/`
- L2 Categoría `/{categoria}/`
- L3 Subcategoría `/{categoria}/{subcategoria}/`
- L4 Ficha `/{categoria}/{subcategoria}/{producto}/`
- Blog `/blog/{slug}/`
- Directorio/Zona `/{tipo}/{zona}/`
`trailingSlash: 'never'`.

## Frontmatter (Markdown/MDX)
Campos mínimos: `title`, `description`, `pubDate` (blog), `image`, `category` (enum), `draft`. Ver [[content.config.ts]].

## Git / commits
- Un repo por proyecto bajo `Origenlab`.
- Commits: `tipo: resumen` (`feat:`, `fix:`, `seo:`, `content:`, `chore:`).
- Nunca commitear `dist/`, `node_modules/`, `.env`, ni secretos.
- Trabajo nuevo se commitea siempre (no working copies sin git — *falla: MEDEDULCOM*).
