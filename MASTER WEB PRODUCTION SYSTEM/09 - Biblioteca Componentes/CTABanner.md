# CTABanner

> Propósito: banner de conversión configurable para el cierre de cualquier página — heading + descripción + botones tipados con íconos + insignia de confianza, en 3 variantes visuales (red / dark / light). Origen: `MESECI/src/components/CTABanner.astro` (el CTA maestro del ecosistema, acompañado de 7 presets temáticos). Volver al [[00 - Inventario]].

## API de props
| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `heading` | `string` | — | Título del banner (obligatorio). |
| `desc` | `string` | — | Párrafo descriptivo. |
| `btns` | `BtnDef[]` | `[]` | Botones. `BtnDef = { label, href, icon?, primary?, external? }`. `icon ∈ wa\|arrow\|phone\|catalog\|info\|quote`. |
| `badge` | `string` | — | Línea de confianza bajo los botones (con ícono de escudo). |
| `variant` | `'red' \| 'dark' \| 'light'` | `'red'` | Fondo: rojo de marca / gradiente oscuro / claro con bordes. |
| `centered` | `boolean` | `false` | `true` apila y centra texto + botones; `false` deja texto-izq / botones-der. |

## Ejemplo de uso (copy-paste)
Lo habitual es usar un **preset** de `cta-presets.ts` (que ya construye los botones de WhatsApp con `waUrl`):
```astro
---
import CTABanner from '../components/CTABanner.astro'
import { PRESET_GENERAL } from '../config/cta-presets'
---
<CTABanner {...PRESET_GENERAL} />
```
Uso avanzado con props directas (WhatsApp SIEMPRE vía `waUrl`):
```astro
---
import CTABanner from '../components/CTABanner.astro'
import { waUrl, WA_MESSAGES, CONTACT } from '../config/site'
---
<CTABanner
  heading="¿Necesitas extintores certificados?"
  desc="Documentación NOM-154 incluida para auditorías."
  variant="dark"
  btns={[
    { label: 'Cotizar por WhatsApp', href: waUrl(WA_MESSAGES.cotizacion), icon: 'wa', primary: true, external: true },
    { label: 'Llamar ahora', href: CONTACT.phoneHref ?? `tel:${CONTACT.phoneRaw}`, icon: 'phone' },
  ]}
  badge="NOM-154-SCFI · Respuesta rápida"
/>
```

## Variantes
- **`red`** — fondo de marca, botón primario blanco; para home y la mayoría de páginas.
- **`dark`** — gradiente casi negro con glow; combina con el Hero para cerrar páginas técnicas.
- **`light`** — fondo claro con bordes; para cierres discretos (blog, contacto).
- **`centered`** — útil cuando no hay desc larga o el banner va a todo el ancho.

## Contrato (importante)
Los botones de WhatsApp se construyen con `waUrl(WA_MESSAGES.x)`. NUNCA pongas `href="https://wa.me/52..."` literal (anti-patrón documentado: WhatsApp hardcodeado ×6 en BRINCOLINS/MESASPICNIC). Los presets de `cta-presets.ts` ya lo respetan.

## Notas de accesibilidad
- `<section aria-labelledby>` ligado al `<h2>`. Botones con `:focus-visible` (contorno blanco sobre fondos oscuros, rojo sobre claro).
- En móvil los botones pasan a ancho completo y apilados (≥44px de alto).

## Tokens que usa
`--color-red`/`--color-red-dark`, `--color-gray-50/-200/-400/-500/-900`, `--border`, `--sp-*`, `--text-xs`, `--weight-black/-bold/-medium`, `--radius-md`, `--container-max`, `--container-px`. La variante `dark` usa `color-mix()` sobre `--color-red` para el glow.

Relacionados: [[Hero]] · `cta-presets.ts` · [[../00 - Inventario]]
