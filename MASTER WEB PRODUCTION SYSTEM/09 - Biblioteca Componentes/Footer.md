# Footer

> Propósito: pie de página profesional de 4 columnas — marca + contacto enriquecido (WhatsApp/email/sucursales/horario), navegación de Productos/Servicios/Sectores/Cobertura (data-driven), banda de certificaciones y bottom bar con copyright. Origen: `PROYECTORED/src/components/global/Footer.astro` (el más completo: lee `BRANCHES`, `schedule`, badges de cobertura, todo desde config). Volver al [[00 - Inventario]].

## API de props
| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `certifications` | `{ label:string; title?:string }[]` | `[]` | Normas para la banda inferior (varían por negocio; ej. NOM-154, NFPA 1971). Si vacío, se omite la banda. |
| `branches` | `{ label:string; address:string; mapsUrl?:string }[]` | `BRANCHES` de config si existe, si no `[]` | Sucursales en el bloque de contacto. Si vacío, se omite. |
| `logo` | `string` | `SITE.logo ?? '/images/brand/logo.svg'` | Ruta del logotipo. |
| `seoTagline` | `string` | `SITE.tagline` | Frase SEO centrada en el bottom bar. |

Navegación y descripción salen de `config/site`: `SITE`, `CONTACT` (incl. `schedule` opcional), `PRODUCT_CATEGORIES`, `SERVICES`, `SECTORS`, `COVERAGE_STATES`, `waUrl`, `WA_MESSAGES`.

## Ejemplo de uso (copy-paste)
```astro
---
import Footer from '../components/Footer.astro'
const CERTS = [
  { label: 'NOM-154-SCFI', title: 'Extintores certificados NOM' },
  { label: 'NFPA 1971', title: 'Equipo para bomberos NFPA' },
]
---
<Footer certifications={CERTS} />
```
Las sucursales se toman automáticamente de `BRANCHES` en `config/site`; pásalas explícitas sólo si quieres anularlas:
```astro
<Footer branches={[{ label: 'Matriz CDMX', address: 'Reforma 26, Cuauhtémoc', mapsUrl: 'https://maps.google.com/?q=...' }]} />
```

## Variantes
- **Con / sin certificaciones** (banda inferior condicional).
- **Con / sin sucursales** (bloque condicional).
- **Con / sin horario** (`CONTACT.schedule` opcional; muestra weekdays/saturday/sunday si existen, separados por `'  '`).

## Notas de accesibilidad
- `<footer role="contentinfo">`, columnas como `<nav aria-label>`, contacto en `<address>`.
- Enlaces de mapas/WhatsApp/email con `aria-label` descriptivo y `target="_blank" rel="noopener noreferrer"`.
- Contraste alto sobre fondo oscuro `#0d0d0d`; badges de cobertura con color semántico (operativo verde / comercial gris).

## Tokens que usa
`--color-red*` (vía variables locales `--ft-accent`), `--color-gray-*`, `--sp-*`, `--text-*`, `--weight-*`, `--radius-*`, `--container-max`, `--container-px`. El bloque define sus propios `--ft-*` derivados de los tokens globales, así que el footer es portable.

Relacionados: [[Header]] · [[WhatsAppFloat]] · [[../00 - Inventario]]
