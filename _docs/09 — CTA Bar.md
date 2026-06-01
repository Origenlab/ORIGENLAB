# Componente: CTA Bar (`ol-cta-bar`)

> Banda de conversión ubicada después del Quick Nav. Layout 2 columnas: copy+badges izquierda / botones derecha.

---

## Estructura HTML

```html
<section class="ol-cta-bar">
  <div class="ol-cta-bar-inner">

    <!-- IZQUIERDA: copy -->
    <div>
      <p class="ol-cta-bar-eyebrow">
        <!-- SVG decorativo -->
        Proyectos activos · Disponibilidad limitada
      </p>
      <h2 class="ol-cta-bar-headline">¿Listo para empezar<br>tu proyecto?</h2>
      <p class="ol-cta-bar-sub">Descripción corta 1–2 líneas.</p>
      <div class="ol-cta-bar-badges">
        <span class="ol-badge">Sin contratos largos</span>
        <span class="ol-badge">Entrega en 3–6 semanas</span>
        <span class="ol-badge">Pago en etapas</span>
        <span class="ol-badge">Revisiones ilimitadas</span>
      </div>
    </div>

    <!-- DERECHA: acciones -->
    <div class="ol-cta-bar-actions">
      <a href="https://wa.me/..." class="ol-cta-primary">
        <!-- SVG WhatsApp -->
        WhatsApp directo
      </a>
      <a href="cotizar.html" class="ol-cta-secondary">
        Cotizar mi proyecto →
      </a>
      <p class="ol-cta-bar-note">o escríbenos a <a href="mailto:hola@origenlab.com">hola@origenlab.com</a></p>
    </div>

  </div>
</section>
```

---

## Layout

```css
.ol-cta-bar-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
@media (max-width: 900px) {
  .ol-cta-bar-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
```

---

## Botones

### `ol-cta-primary` (WhatsApp — Verde)
```css
background: #25D366;
color: #fff;
font-size: 15px;
font-weight: 700;
border-radius: 12px;
padding: 0.9rem 1.75rem;
width: 100%;
```

### `ol-cta-secondary` (Cotizar — Oro)
```css
background: linear-gradient(135deg, #C9A84C, #B8922E);
color: #08080E;
font-size: 15px;
font-weight: 700;
border-radius: 12px;
padding: 0.9rem 1.75rem;
width: 100%;
```

---

## Badges (`ol-badge`)

```css
.ol-badge {
  font-size: 11.5px;
  font-weight: 500;
  color: rgba(240,240,245,0.5);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
}
```

---

## Fondo

```css
.ol-cta-bar { background: #0D0D1A; padding: 4rem 0; }
/* Gradiente radial sutil en ambos extremos */
.ol-cta-bar::before {
  background:
    radial-gradient(ellipse 60% 80% at 0% 50%, rgba(201,168,76,0.05) 0%, transparent 60%),
    radial-gradient(ellipse 40% 60% at 100% 50%, rgba(80,80,180,0.04) 0%, transparent 60%);
}
```

---

## Notas

- El eyebrow de este componente es diferente al `ol-eyebrow` estándar: usa texto inline con SVG, sin pill border.
- Los botones de acción tienen `min-width: 240px` en desktop para consistencia visual.
- La nota inferior (`ol-cta-bar-note`) es discreta: 12px, `rgba(240,240,245,0.35)`.
