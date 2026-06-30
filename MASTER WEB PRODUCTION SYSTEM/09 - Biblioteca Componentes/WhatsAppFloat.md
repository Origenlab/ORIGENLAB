# WhatsAppFloat

> Propósito: botón flotante fijo de WhatsApp (verde #25D366, abajo-derecha) presente en todas las páginas vía el layout — el canal de conversión universal del ecosistema (patrón D4, WhatsApp-first). Origen: `PROYECTORED/.../global/WhatsAppButton.astro` (lee `waUrl` + `WA_MESSAGES`, etiqueta colapsable en móvil). Volver al [[00 - Inventario]].

## API de props
| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `message` | `keyof typeof WA_MESSAGES` | `'default'` (o la primera clave) | Mensaje preformateado a usar. |
| `label` | `string` | `'¿Necesitas ayuda?'` | Texto visible junto al ícono (se oculta en móvil). |

## Ejemplo de uso (copy-paste)
En el layout, una sola vez:
```astro
---
import WhatsAppFloat from '../components/WhatsAppFloat.astro'
---
<WhatsAppFloat />
```
Con un mensaje segmentado por intención:
```astro
<WhatsAppFloat message="cotizacion" label="Cotiza aquí" />
```

## Contrato (importante)
El `href` se genera con `waUrl(WA_MESSAGES[message])` desde `config/site`. NUNCA escribas el número en el componente ni en la página. Para añadir mensajes nuevos, agrégalos a `WA_MESSAGES` en `site.ts`.

## Variantes
- **Con / sin etiqueta:** en pantallas ≤640px la etiqueta se oculta y queda sólo el ícono (botón circular).
- **Mensaje por defecto vs segmentado:** pasa `message` para precargar el contexto del lead (mejora la calidad de la conversación).

## Notas de accesibilidad
- `aria-label="Contactar por WhatsApp"`, `title` con la etiqueta, `target="_blank" rel="noopener noreferrer"`.
- `:focus-visible` con halo verde; `z-index: 9999` para quedar siempre encima.
- Respeta el área segura de iOS con `margin-bottom: env(safe-area-inset-bottom)`.

## Tokens que usa
`--sp-6/-4/-3/-2`, `--radius-full`, `--text-sm`, `--weight-semibold`. El verde `#25D366` es fijo por convención de marca de WhatsApp (no se retematiza).

Relacionados: [[Footer]] · [[CTABanner]] · [[../00 - Inventario]]
