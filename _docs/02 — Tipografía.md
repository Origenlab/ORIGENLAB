# Tipografía

---

## Fuente Principal

**Inter** — importada desde Google Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## Jerarquía de Títulos

| Nivel | Elemento | Tamaño | Peso | Uso |
|-------|----------|--------|------|-----|
| H1 | Hero title | `clamp(2.8rem, 6.5vw, 5rem)` | 900 | Título principal del hero |
| H2 grande | CTA Final | `clamp(2.2rem, 5vw, 3.8rem)` | 900 | Cierre de página |
| H2 sección | `ol-section-title` | `clamp(1.9rem, 3.5vw, 2.8rem)` | 800 | Encabezado de secciones |
| H2 FAQ | `ol-faq-title` (legacy) | `clamp(1.75rem, 3.5vw, 2.6rem)` | 700 | Solo en FAQ antiguo |
| H3 card | `ol-svc-title` | `1.125rem` | 700 | Títulos de tarjetas |
| H3 proceso | `ol-process-step-title` | `1.0625rem` | 700 | Pasos del proceso |

---

## Texto de Cuerpo

| Clase / Contexto | Tamaño | Peso | Color |
|------------------|--------|------|-------|
| `ol-section-sub` | `1.0625rem` | 400 | `rgba(240,240,245,0.5)` |
| `ol-sh-copy` | `15px` | 400 | `rgba(240,240,245,0.48)` |
| `ol-svc-desc` | `13.5px` | 400 | `rgba(240,240,245,0.48)` |
| `ol-tc-text` | `13.5px` | 400 | `rgba(240,240,245,0.62)` |
| Nav link | `13px` | 400 | `rgba(240,240,245,0.55)` |
| Footer links | `13.5px` | 400 | `rgba(240,240,245,0.42)` |
| Notas / labels | `11–12px` | 500–700 | varia |

---

## Labels y Eyebrows

| Clase | Tamaño | Peso | Característica |
|-------|--------|------|----------------|
| `ol-eyebrow` | `11px` | 600 | Uppercase + letter-spacing 0.16em + pill dorado |
| `ol-svc-num` | `10.5px` | 700 | Uppercase + letter-spacing 0.14em + color dorado 45% |
| `ol-footer-col-title` | `11px` | 700 | Uppercase + letter-spacing 0.12em + muted |
| `ol-qn-title` | `13px` | 600 | Normal case |
| `ol-qn-sub` | `11px` | 400 | Muted |

---

## Letter-Spacing

| Valor | Uso |
|-------|-----|
| `-0.035em` | Hero title (máxima compresión) |
| `-0.03em` | CTA Final title |
| `-0.025em` | Títulos de sección (`ol-section-title`) |
| `-0.015em` | Títulos de tarjeta (`ol-svc-title`) |
| `0` | Cuerpo de texto |
| `+0.01em` | Botones, nav |
| `+0.12–0.18em` | Labels y eyebrows (siempre uppercase) |

---

## Line Height

| Contexto | Valor |
|----------|-------|
| Títulos grandes | `1.02–1.12` |
| Subtítulos / sub | `1.75` |
| Cuerpo editorial | `1.8` |
| Cards | `1.7–1.75` |
| Notas pequeñas | `1.4–1.5` |
