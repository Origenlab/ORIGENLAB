# Sección: Showcase de Servicios (`ol-showcase`)

> Sección de detalle profundo de cada servicio. 4 bloques apilados, cada uno en layout 2 columnas: imagen placeholder izquierda / información derecha. Fondo `#08080E`.

---

## Dónde se usa

| Página | Estado |
|--------|--------|
| `servicios/index.html` | ✅ Implementado (4 bloques) |
| Otras subpáginas de servicio | Pendiente (versión de 1 bloque) |

---

## Posición en el flujo de `servicios/index.html`

```
ol-quicknav (top, con íconos)
  ↓
ol-servicios-page  ← cards grid (ol-services-grid con 4 ol-svc-card)
  ↓
ol-showcase        ← detalle 2 columnas por servicio  ← ESTA SECCIÓN
  ↓
ol-faq-section
  ↓
ol-quicknav (bottom, sin íconos)
  ↓
ol-footer
```

---

## Estructura HTML

```html
<section class="ol-showcase">
  <div class="ol-showcase-inner">

    <!-- Un bloque por servicio (se repite 4 veces) -->
    <div class="ol-showcase-block">

      <!-- Columna izquierda: placeholder de imagen -->
      <div class="ol-showcase-img">
        <div class="ol-showcase-img-label">
          <svg width="48" height="48" ...><!-- ícono del servicio --></svg>
          <span>Imagen próximamente</span>
        </div>
      </div>

      <!-- Columna derecha: información del servicio -->
      <div class="ol-showcase-info">
        <p class="ol-showcase-num">01 — Desarrollo Web</p>
        <h3 class="ol-showcase-title">Sitios corporativos construidos para crecer.</h3>
        <p class="ol-showcase-desc">Descripción larga del servicio...</p>
        <ul class="ol-showcase-list">
          <li>Feature 1</li>
          <li>Feature 2</li>
          <!-- 5–6 ítems -->
        </ul>
        <a href="desarrollo-web/index.html" class="ol-showcase-cta">Ver servicio completo →</a>
      </div>

    </div>
    <!-- Repetir para 02, 03, 04 -->

  </div>
</section>
```

---

## CSS

```css
.ol-showcase {
  background: #08080E;
  padding: 5rem 0 6rem;
  position: relative;
}
/* Línea dorada superior */
.ol-showcase::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
}
.ol-showcase-inner {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
}

/* Bloque 2 columnas */
.ol-showcase-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  padding: 5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.ol-showcase-block:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

/* Todas las columnas: imagen izquierda, info derecha (sin alternancia) */

/* Placeholder de imagen */
.ol-showcase-img {
  background: rgba(201,168,76,0.04);
  border: 1px solid rgba(201,168,76,0.1);
  border-radius: 12px;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ol-showcase-img-label {
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
}
.ol-showcase-img-label svg  { opacity: 0.25; color: var(--gold, #C9A84C); }
.ol-showcase-img-label span {
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(201,168,76,0.45);
}

/* Información */
.ol-showcase-info { display: flex; flex-direction: column; gap: 1.5rem; }

.ol-showcase-num {
  font-size: 10.5px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(201,168,76,0.5);
}
.ol-showcase-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800; color: #F0F0F5;
  letter-spacing: -0.025em; line-height: 1.1; margin: 0;
}
.ol-showcase-desc {
  font-size: 1rem; color: rgba(240,240,245,0.5);
  line-height: 1.8; margin: 0;
}
.ol-showcase-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.65rem;
}
.ol-showcase-list li {
  font-size: 13.5px; color: rgba(240,240,245,0.62);
  line-height: 1.5; padding-left: 1.25rem; position: relative;
}
.ol-showcase-list li::before {
  content: '→'; position: absolute; left: 0;
  color: rgba(201,168,76,0.6); font-size: 11px; top: 2px;
}
.ol-showcase-cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.25);
  color: #C9A84C; font-size: 13px; font-weight: 600;
  letter-spacing: 0.04em; padding: 0.75rem 1.5rem;
  border-radius: 6px; text-decoration: none; width: fit-content;
  transition: background 0.2s, border-color 0.2s;
}
.ol-showcase-cta:hover {
  background: rgba(201,168,76,0.14);
  border-color: rgba(201,168,76,0.4);
}

@media (max-width: 900px) {
  .ol-showcase-block { grid-template-columns: 1fr; gap: 2.5rem; }
}
```

---

## Servicios en `servicios/index.html`

| # | Título del bloque | CTA link |
|---|-------------------|----------|
| 01 | Sitios corporativos construidos para crecer. | `desarrollo-web/index.html` |
| 02 | E-commerce listo para vender desde el día uno. | `tiendas-en-linea/index.html` |
| 03 | Una página. Un objetivo. Máxima conversión. | `landing-pages/index.html` |
| 04 | Transforma tu sitio sin perder lo que ya funciona. | `rediseno-web/index.html` |

---

## Notas de diseño

- **Sin alternancia** — imagen siempre a la izquierda, info siempre a la derecha en todos los bloques.
- El `ol-showcase-num` incluye el número **y** el nombre corto del servicio: `"01 — Desarrollo Web"`.
- La lista usa flechas `→` como bullet (vs. `ol-svc-list` del index que usa `·`).
- El CTA es un botón-link dorado con borde (distinto al `ol-svc-cta` del card que es texto plano).
- El CSS vive en el `<style>` inline de la subpágina, no en `premium-dark.css`.
- Los separadores entre bloques son `border-bottom: 1px solid rgba(255,255,255,0.05)` — muy sutiles.
