# Header

> Propósito: cabecera global sticky con mega-menú de productos (data-driven desde `PRODUCT_CATEGORIES`), dropdowns de Servicios/Cobertura/Sectores, CTA de WhatsApp y navegación móvil con acordeón. Origen: `PROYECTORED/src/components/global/Header.astro` — el navegador más completo del ecosistema (timer de gracia, foco por teclado, Escape, overlay). Volver al [[00 - Inventario]].

## API de props
| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `logo` | `string` | `SITE.logo ?? '/images/brand/logo.svg'` | Ruta del logotipo (desde `/public` o CDN). |

Todo lo demás es data-driven desde `config/site`: `PRODUCT_CATEGORIES`, `SERVICES`, `SECTORS`, `COVERAGE_STATES`, `SITE`, `waUrl`, `WA_MESSAGES`.

## Ejemplo de uso (copy-paste)
```astro
---
// src/layouts/BaseLayout.astro
import TopBar from '../components/TopBar.astro'
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
import WhatsAppFloat from '../components/WhatsAppFloat.astro'
---
<html lang="es-MX">
  <body>
    <TopBar />
    <Header logo="/images/brand/mi-logo.svg" />
    <main><slot /></main>
    <Footer />
    <WhatsAppFloat />
  </body>
</html>
```

## Subcategorías del mega-menú
Las subcategorías por categoría se editan en el frontmatter del componente (`MEGA_SUBCATEGORIES`), porque dependen de qué páginas L3 existen en cada proyecto:
```ts
const MEGA_SUBCATEGORIES: Record<string, { label: string; slug: string }[]> = {
  extintores: [
    { label: 'Polvo Seco ABC', slug: 'polvo-seco' },
    { label: 'CO₂', slug: 'co2' },
  ],
}
```
Si una categoría no tiene entrada, sólo se muestra su título (sin sub-lista).

## Variantes
- **Con / sin TopBar.** El header es sticky a `top: var(--topbar-height, 0px)`. Si NO usas TopBar, define `--topbar-height: 0px` o déjalo sin declarar (fallback 0). Si usas TopBar, declara `--topbar-height: 36px`.
- **Rutas de navegación.** Los enlaces de primer nivel (`/productos/ /servicios/ /cobertura/ /sectores/ /blog/ /contacto/`) son hardcodeados; cámbialos si tu estructura difiere (ej. LGA usa `/empresas/`).

## Notas de accesibilidad
- Dropdowns abren con `mouseenter`/`focus` y cierran con timer de gracia (120 ms), clic en overlay o `Escape` (que devuelve el foco al trigger).
- `aria-haspopup`, `aria-expanded`, `aria-hidden` sincronizados por JS; `ArrowDown`/`Enter` enfoca el primer enlace del panel.
- Hamburguesa de 44×44px, `aria-controls`/`aria-expanded`; el acordeón móvil bloquea el scroll del body al abrirse.
- `:focus-visible` con contorno en todos los enlaces y botones.

## Tokens que usa
`--c-primary/-primary-dark/-primary-light/-primary-rgb`, `--c-ink/-ink-2/-muted/-surface/-border/-white`, `--header-height`, `--topbar-height`, `--sp-*`, `--text-*`, `--weight-*`, `--radius-*`, `--container-max`, `--container-px`. Todos con fallback inline.

Relacionados: [[Footer]] · [[../00 - Inventario]]
