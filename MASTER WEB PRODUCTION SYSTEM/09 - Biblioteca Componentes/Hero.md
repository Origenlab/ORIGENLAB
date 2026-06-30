# Hero

> Propósito: cabecera de página oscura — gradiente 155° + glow radial de marca + rejilla sutil, badge con punto pulsante, H1 con acento de color, columna derecha opcional y CTAs opcionales. Origen: estructura de 2 columnas de `PROYECTORED/.../sections/Hero.astro` fusionada con el fondo canónico de `MESECI/.../HeroBase.astro` (la versión visual de referencia del cluster). Volver al [[00 - Inventario]].

## API de props
| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `title` | `string` | — | Título principal (obligatorio). |
| `accent` | `string` | — | Última(s) palabra(s) resaltadas con `--color-red-light`. |
| `badge` | `string` | — | Etiqueta superior con punto pulsante. |
| `subtitle` | `string` | — | Párrafo bajo el H1. |
| `descRight` | `string[]` | `[]` | Párrafos de la columna derecha (se ocultan en móvil). |
| `ctas` | `HeroCTA[]` | `[]` | Botones. `HeroCTA = { text, href, variant?:'primary'\|'outline', whatsapp?:boolean }`. |
| `ariaLabel` | `string` | `'Encabezado principal'` | Etiqueta de la región. |

## Ejemplo de uso (copy-paste)
```astro
---
import Hero from '../components/Hero.astro'
import { waUrl, WA_MESSAGES } from '../config/site'
---
<Hero
  badge="Desde 2008 · NOM · NFPA"
  title="Equipo contra incendios"
  accent="certificado"
  subtitle="Extintores, equipo para bomberos y sistemas CI con documentación oficial para tu expediente de Protección Civil."
  descRight={[
    'Atención técnica real, no un call center.',
    'Entrega el mismo día en CDMX y Estado de México.',
  ]}
  ctas={[
    { text: 'Cotizar por WhatsApp', href: waUrl(WA_MESSAGES.cotizacion), whatsapp: true },
    { text: 'Ver catálogo', href: '/productos/', variant: 'outline' },
  ]}
/>
```

## Variantes
- **Sólo presentación (recomendado por la REGLA HeroBase):** omite `ctas` y deja que la conversión la haga una barra `RelatedLinks`/QuickLinks o el CTABanner. El diagnóstico MESECI marca como anti-patrón meter el funnel completo dentro del hero.
- **Con CTAs (L1/L2):** pasa 1–2 botones; `whatsapp:true` añade el ícono verde y abre en pestaña nueva.
- **Con / sin columna derecha:** si `descRight` está vacío, el hero queda a una sola columna centrada a la izquierda.

## Notas de accesibilidad
- Un solo `<h1>` por página (este componente). El punto del badge respeta `prefers-reduced-motion` (sin animación).
- CTAs con `:focus-visible` y `rel="noopener noreferrer"` en enlaces externos/WhatsApp.
- Contraste AA: texto blanco/translúcido sobre gradiente casi negro.

## Tokens que usa
`--color-red`/`--color-red-light`/`--color-red-dark`, `--text-4xl`/`--text-base`, `--sp-*`, `--weight-black`, `--leading-*`, `--radius-md`, `--container-max`, `--container-px`. El gradiente y el glow usan `color-mix()` sobre `--color-red` para retematizar con sólo cambiar ese token.

Relacionados: [[CTABanner]] · [[../00 - Inventario]]
