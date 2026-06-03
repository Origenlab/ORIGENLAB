# Componente: Topbar (`ol-topbar`)

> Barra fija en la parte superior absoluta de la página. Altura: 42px desktop / 38px móvil.

---

## Estructura HTML

```html
<div class="ol-topbar">
  <div class="ol-topbar-inner">

    <!-- IZQUIERDA: email + teléfono -->
    <div class="ol-topbar-left">
      <a href="mailto:hola@origenlab.com" class="ol-topbar-contact">
        <!-- SVG envelope 13×13 -->
        hola@origenlab.com
      </a>
      <span class="ol-topbar-sep"></span>
      <a href="tel:+5547868402" class="ol-topbar-contact">
        <!-- SVG phone 13×13 -->
        +55 4786 8402
      </a>
    </div>

    <!-- CENTRO: mensaje promo con punto pulsante -->
    <div class="ol-topbar-center">
      <span class="ol-topbar-promo">
        <span class="ol-topbar-dot"></span>
        Respuesta garantizada en menos de 24 horas · Ciudad de México
      </span>
    </div>

    <!-- DERECHA: botón WhatsApp -->
    <div class="ol-topbar-right">
      <a href="https://wa.me/5547868402?text=..." class="ol-topbar-wa">
        <!-- SVG WhatsApp 13×13 -->
        WhatsApp
      </a>
    </div>

  </div>
</div>
```

---

## Layout

```css
.ol-topbar-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;  /* izq | centro | der */
  align-items: center;
  height: 100%;
}
```

---

## Elementos Clave

| Clase | Descripción |
|-------|-------------|
| `ol-topbar-contact` | Link de contacto (email / teléfono). Color `rgba(240,240,245,0.5)`, 11.5px |
| `ol-topbar-sep` | Separador vertical 1px, 14px alto |
| `ol-topbar-promo` | Texto central, 11px, color `rgba(240,240,245,0.45)` |
| `ol-topbar-dot` | Punto pulsante dorado animado con `ol-pulse` |
| `ol-topbar-wa` | Botón WhatsApp dorado con borde redondeado 999px |

---

## Comportamiento Responsive

| Breakpoint | Comportamiento |
|------------|---------------|
| `≤ 768px` | Oculta centro y teléfono. Grid 2 col |
| `≤ 480px` | Oculta toda la izquierda. Solo muestra botón WhatsApp centrado |

---

## Posición en el Stack de Z-Index

```
z-index: 1002  →  ol-topbar     (más alto)
z-index: 1000  →  ol-header
z-index: 999   →  ol-mobile-panel
z-index: 998   →  ol-mobile-overlay
z-index: 10    →  ol-quicknav
```

---

## Notas

- El `body` tiene `padding-top: calc(42px + 88px)` para compensar topbar + header.
- En scroll, el header sube encima del topbar (`top: 0`), el topbar queda cubierto.
- El color de fondo es `#04040A`, más oscuro que el header (`#13131F`).
