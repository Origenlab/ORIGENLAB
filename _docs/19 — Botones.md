# Componente: Botones

> Todas las variantes de botón usadas en el sitio.

---

## Variantes Globales (clases legacy — siguen activas)

| Clase | Fondo | Texto | Uso |
|-------|-------|-------|-----|
| `.btn-primary` | `#C9A84C` | `#08080E` | CTA principal dorado |
| `.btn-outline` | Transparente | `#C9A84C` | Contorno dorado |
| `.btn-outline-white` | Transparente | `#C9A84C` | Variante outline sobre fondo oscuro |

---

## Variantes `ol-*` (nuevas)

### `ol-header-cta` — Header "Cotizar proyecto"

```css
background: linear-gradient(135deg, #C9A84C, #B8922E);
color: #08080E;
font-size: 13px; font-weight: 700;
padding: 0.6rem 1.35rem;
border-radius: 10px;
/* Hover: sombra dorada + lift */
box-shadow: 0 6px 28px rgba(201,168,76,0.4);
transform: translateY(-1px);
```

### `ol-cta-primary` — WhatsApp (verde)

```css
background: #25D366;
color: #fff;
font-size: 15px; font-weight: 700;
padding: 0.9rem 1.75rem;
border-radius: 12px;
width: 100%;
```

### `ol-cta-secondary` — Cotizar (dorado)

```css
background: linear-gradient(135deg, #C9A84C, #B8922E);
color: #08080E;
font-size: 15px; font-weight: 700;
padding: 0.9rem 1.75rem;
border-radius: 12px;
width: 100%;
```

### `ol-cta-final-primary` — CTA Final (dorado sólido)

```css
background: #C9A84C;
color: #08080E;
font-size: 15px; font-weight: 700;
padding: 0.95rem 2.25rem;
border-radius: 10px;
```

### `ol-cta-final-secondary` — CTA Final (outline)

```css
background: transparent;
color: rgba(240,240,245,0.65);
border: 1px solid rgba(255,255,255,0.12);
font-size: 15px; font-weight: 500;
padding: 0.95rem 2.25rem;
border-radius: 10px;
/* Hover: borde dorado + texto dorado */
```

### `ol-svc-cta` — CTA de tarjeta de servicio

```css
background: rgba(201,168,76,0.05);
color: #C9A84C;
border: 1px solid rgba(201,168,76,0.3);
font-size: 13px; font-weight: 600;
padding: 0.65rem 1.25rem;
border-radius: 8px;
/* En hover de la card: se rellena de #C9A84C con texto #08080E */
```

---

## Reglas Generales

- **Dorado sobre oscuro** (`#C9A84C` / gradiente dorado): CTA primario, header, servicios.
- **Verde WhatsApp** (`#25D366`): Solo para el botón de WhatsApp directo.
- **Outline**: Para acciones secundarias — nunca compite visualmente con el primario.
- **Border-radius**: 10–12px para botones grandes, 8px para botones pequeños, 999px para pills.
- **Font-weight**: 700 para primarios, 500–600 para secundarios y pills.
- **Transform**: `translateY(-1px)` en hover de casi todos los botones CTA.
