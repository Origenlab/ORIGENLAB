# Design Tokens

Archivo fuente: `_astro/premium-dark.css`

---

## Variables CSS (`:root`)

```css
/* Fondos */
--bg:         #08080E   /* fondo base del sitio */
--bg-alt:     #0D0D16   /* fondo alternado (secciones pares) */
--bg-dark:    #04040A   /* fondo más oscuro */
--bg-card:    #131320   /* fondo de tarjetas */

/* Texto */
--text:            #F0F0F5
--text-muted:      rgba(240,240,245,0.55)
--text-on-dark:    #F0F0F5
--text-on-dark-muted: rgba(240,240,245,0.5)

/* Acento — Oro */
--accent:       #C9A84C
--accent-hover: #E4C26B
--gold:         #C9A84C
--gold-glow:    rgba(201,168,76,0.2)

/* Bordes */
--border:      rgba(255,255,255,0.08)
--border-dark: rgba(255,255,255,0.12)
```

---

## Paleta de Colores

| Nombre | Hex / RGBA | Uso |
|--------|-----------|-----|
| Fondo base | `#08080E` | Body, secciones principales |
| Fondo alt | `#0D0D16` | FAQ, secciones alternadas |
| Fondo dark | `#04040A` | Why, Testimonials |
| Fondo card | `#0C0C18` | Cards de servicio y testimonio |
| Fondo card alt | `#131320` | Variante de card |
| Header | `#13131F` | Fondo del header |
| Footer | `#0F0C07` | Fondo del footer (cálido oscuro) |
| Texto | `#F0F0F5` | Texto primario |
| Texto muted 55% | `rgba(240,240,245,0.55)` | Subtítulos |
| Texto muted 50% | `rgba(240,240,245,0.5)` | `ol-section-sub` |
| Texto muted 48% | `rgba(240,240,245,0.48)` | Copia de cards |
| Texto muted 35–40% | `rgba(240,240,245,0.35–0.4)` | Labels, roles |
| Oro principal | `#C9A84C` | Accent, eyebrows, CTAs |
| Oro hover | `#E4C26B` | Hover de elementos dorados |
| Verde WhatsApp | `#25D366` | CTA WhatsApp |
| Verde WA hover | `#1ebe5a` | Hover WhatsApp |

---

## Tipografía

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
```

Importada desde Google Fonts con pesos: 300, 400, 500, 600, 700, 800, 900.

### Escala de tamaños frecuentes

| Elemento | Tamaño | Peso |
|----------|--------|------|
| Título hero | `clamp(2.8rem, 6.5vw, 5rem)` | 900 |
| Título de sección (ol-section-title) | `clamp(1.9rem, 3.5vw, 2.8rem)` | 800 |
| Título FAQ | `clamp(1.75rem, 3.5vw, 2.6rem)` | 700 |
| Título CTA Final | `clamp(2.2rem, 5vw, 3.8rem)` | 900 |
| Subtítulo sección (ol-section-sub) | `1.0625rem` | 400 |
| Copia larga (ol-sh-copy) | `15px` | 400 |
| Eyebrow | `11px` | 600 |
| Nav link | `13px` | 400 |
| Label pequeño | `10–11px` | 600–700 |

---

## Espaciado de Secciones

```css
padding: 6rem 0   /* estándar para la mayoría de secciones */
padding: 7rem 0   /* CTA Final */
padding: 4rem 0   /* CTA Bar */
```

---

## Ancho de Contenedores

```css
width: 90%;
max-width: 1600px;
margin: 0 auto;

/* móvil */
@media (max-width: 768px) { width: 92% }
@media (max-width: 480px) { width: 94% }
```

---

## Bordes y Radios Comunes

| Elemento | Radio |
|----------|-------|
| Pills / eyebrows | `999px` |
| Header CTA | `10px` |
| Tarjetas grandes | `16–18px` |
| Tarjetas chicas | `14px` |
| Nav links | `8–9px` |
| Dropdowns | `14px` |

---

## Sombras Comunes

```css
/* Card hover */
box-shadow: 0 28px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.15)

/* Header scrolled */
box-shadow: 0 4px 40px rgba(0,0,0,0.6)

/* CTA gold hover */
box-shadow: 0 6px 28px rgba(201,168,76,0.4)

/* WhatsApp hover */
box-shadow: 0 6px 28px rgba(37,211,102,0.3)
```

---

## Animaciones

```css
/* Punto pulsante del topbar */
@keyframes ol-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.7); }
}
animation: ol-pulse 2.5s ease-in-out infinite;
```

---

## Scrollbar personalizado

```css
::-webkit-scrollbar       { width: 6px }
::-webkit-scrollbar-track { background: #08080E }
::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 3px }
```

## Selección de texto

```css
::selection { background: rgba(201,168,76,0.25); color: #F0F0F5 }
```
