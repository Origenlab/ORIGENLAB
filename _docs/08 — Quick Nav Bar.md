# Componente: Quick Nav Bar (`ol-quicknav`)

> Barra de 7 celdas debajo del hero. Actúa como menú de acceso directo a las secciones clave del sitio.

---

## Estructura HTML

```html
<div class="ol-quicknav">
  <div class="ol-quicknav-inner">

    <a href="#servicios" class="ol-qn-item">
      <div class="ol-qn-text">
        <span class="ol-qn-title">Desarrollo Web</span>
        <span class="ol-qn-sub">Sitios corporativos</span>
      </div>
    </a>

    <!-- × 6 más ítems... -->

    <!-- Último ítem: CTA destacado -->
    <a href="cotizar.html" class="ol-qn-item ol-qn-cta">
      <div class="ol-qn-text">
        <span class="ol-qn-title">Cotizar proyecto</span>
        <span class="ol-qn-sub">Respuesta en 24h</span>
      </div>
    </a>

  </div>
</div>
```

---

## Layout

```css
.ol-quicknav-inner {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
```

Cada celda tiene `border-right: 1px solid rgba(255,255,255,0.06)`. La última no tiene borde derecho.

---

## Ítem estándar

```css
.ol-qn-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.1rem 1.25rem;
  text-decoration: none;
  position: relative;
}
/* Línea dorada inferior en hover */
.ol-qn-item::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: #C9A84C;
  transform: scaleX(0);
  transform-origin: left;
}
.ol-qn-item:hover::after { transform: scaleX(1); }
```

---

## Ítem CTA (`ol-qn-cta`)

```css
.ol-qn-cta {
  background: rgba(201,168,76,0.06);
  border-left: 1px solid rgba(201,168,76,0.15);
}
.ol-qn-cta .ol-qn-title { color: #C9A84C; }
.ol-qn-cta .ol-qn-sub   { color: rgba(201,168,76,0.55); }
/* Línea dorada siempre visible al 60% de opacidad */
.ol-qn-cta::after { transform: scaleX(1); opacity: 0.6; }
```

---

## Responsive

| Breakpoint | Columnas |
|------------|---------|
| `> 1100px` | 7 columnas |
| `≤ 1100px` | 4 columnas |
| `≤ 768px` | 2 columnas (100% ancho) |

---

## Notas

- Los íconos (`ol-qn-icon`) están en el HTML pero ocultos con `display: none !important`.
- El `ol-qn-icon` puede reactivarse en el futuro para agregar pictogramas SVG por celda.
- Fondo: `#0C0C18` con bordes top/bottom `rgba(255,255,255,0.07)`.
