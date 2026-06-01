# Sección: Proceso (`ol-process`)

> 4 pasos horizontales conectados con una línea dorada. Sección centrada sin el patrón `ol-sh`.

---

## Estructura HTML

```html
<section class="ol-process" id="proceso">
  <div class="ol-process-inner">

    <!-- Encabezado estándar ol-sh -->
    <div class="ol-sh">
      <div class="ol-sh-left">
        <span class="ol-eyebrow">Proceso</span>
        <h2 class="ol-section-title">Cómo trabajamos</h2>
        <p class="ol-section-sub">4 etapas claras, sin incertidumbre.</p>
      </div>
      <div class="ol-sh-right">
        <p class="ol-sh-copy">Párrafo 1...</p>
        <p class="ol-sh-copy">Párrafo 2...</p>
      </div>
    </div>

    <!-- Pasos -->
    <div class="ol-process-steps">
      <div class="ol-process-step">
        <div class="ol-process-num">1</div>
        <h3 class="ol-process-step-title">Descubrimiento</h3>
        <p class="ol-process-step-desc">Descripción del paso.</p>
      </div>
      <!-- × 3 más -->
    </div>

  </div>
</section>
```

---

## Línea Conectora

```css
.ol-process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
}
/* Línea horizontal dorada que conecta los números */
.ol-process-steps::before {
  content: '';
  position: absolute;
  top: 27px;   /* alineada con el centro del círculo */
  left:  calc(12.5% + 30px);
  right: calc(12.5% + 30px);
  height: 1px;
  background: linear-gradient(90deg, rgba(201,168,76,0.15), rgba(201,168,76,0.35) 50%, rgba(201,168,76,0.15));
}
```

---

## Número de Paso

```css
.ol-process-num {
  width: 56px; height: 56px;
  background: #0C0C18;
  border: 1px solid rgba(201,168,76,0.25);
  border-radius: 50%;
  font-size: 17px; font-weight: 800; color: #C9A84C;
  margin: 0 auto 2rem;
  position: relative; z-index: 1;  /* sobre la línea */
}
```

---

## Pasos Actuales

| # | Título |
|---|--------|
| 1 | Descubrimiento |
| 2 | Diseño y Prototipo |
| 3 | Desarrollo |
| 4 | Lanzamiento |

---

## Responsive

| Breakpoint | Layout |
|------------|--------|
| `> 768px` | 4 columnas con línea conectora |
| `≤ 768px` | 2 columnas, línea oculta |
| `≤ 480px` | 1 columna, pasos sin padding lateral |

---

## Notas

- `background: #08080E` — igual que la sección de Servicios.
- La línea conectora desaparece en móvil (`display: none`).
- Los pasos tienen `text-align: center` y `padding: 0 2rem`.
