# Sección: Por qué OrigenLab (`ol-why`)

> Grid de 4 diferenciales competitivos. Fondo más oscuro (`#04040A`) para contrastar con las secciones adyacentes.

---

## Estructura

```html
<section class="ol-why" id="diferencia">
  <div class="ol-why-inner">

    <!-- Encabezado 2 columnas -->
    <div class="ol-sh">
      <div class="ol-sh-left">
        <span class="ol-eyebrow">Diferencia</span>
        <h2 class="ol-section-title">¿Por qué OrigenLab?</h2>
        <p class="ol-section-sub">En un mercado saturado de agencias...</p>
      </div>
      <div class="ol-sh-right">
        <p class="ol-sh-copy">...</p>
        <p class="ol-sh-copy">...</p>
      </div>
    </div>

    <!-- Grid 4 items -->
    <div class="ol-why-grid">
      <!-- 4× items de diferencial -->
    </div>

  </div>
</section>
```

---

## CSS de Sección

```css
.ol-why {
  background: #04040A;    /* más oscuro que el resto */
  padding: 6rem 0;
}
.ol-why::before {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
}
.ol-why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
@media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr) }
@media (max-width: 580px)  { grid-template-columns: 1fr }
```

---

## Alternancia de Fondos en el Index

| Sección | Fondo |
|---------|-------|
| Hero | `#08080E` |
| Quick Nav | `#0C0C18` |
| CTA Bar | `#0D0D1A` |
| Servicios | `#08080E` |
| **Why** | **`#04040A`** ← más oscuro |
| Proceso | `#08080E` |
| **Testimonios** | **`#04040A`** ← más oscuro |
| FAQ | `#0D0D16` |
| CTA Final | `#0C0C18` |
| Footer | `#0F0C07` |

La alternancia crea ritmo visual sin necesidad de colores de acento fuertes.
