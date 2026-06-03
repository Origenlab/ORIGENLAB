# Componente: Tarjeta de Servicio (`ol-svc-card`)

> Card de servicio con imagen placeholder, número, título, descripción, lista de features y CTA.

---

## Estructura HTML

```html
<a href="servicios/desarrollo-web/index.html" class="ol-svc-card">

  <!-- Imagen placeholder -->
  <div class="ol-svc-img">
    <div class="ol-svc-img-label"><span>Imagen próximamente</span></div>
  </div>

  <!-- Cuerpo -->
  <div class="ol-svc-body">
    <p class="ol-svc-num">01</p>
    <h3 class="ol-svc-title">Desarrollo Web</h3>
    <p class="ol-svc-desc">Descripción del servicio, 1–3 líneas orientadas al beneficio.</p>
    <ul class="ol-svc-list">
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li>Feature 3</li>
    </ul>
    <span class="ol-svc-cta">Ver más →</span>
  </div>

</a>
```

---

## CSS Principal

```css
.ol-svc-card {
  display: flex;
  flex-direction: column;
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
}
.ol-svc-card:hover { border-color: rgba(201,168,76,0.35); }

/* Imagen */
.ol-svc-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #12121E, #1A1A2E, #0E0E1A);
  position: relative;
}
/* Cuadrícula sutil ::before + brillo radial ::after */

/* Número */
.ol-svc-num {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgba(201,168,76,0.45);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

/* Título */
.ol-svc-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #F0F0F5;
  letter-spacing: -0.015em;
  margin: 0 0 0.75rem;
}

/* Descripción */
.ol-svc-desc {
  font-size: 13.5px;
  color: rgba(240,240,245,0.48);
  line-height: 1.75;
}

/* Lista de features */
.ol-svc-list li {
  font-size: 12px;
  color: rgba(240,240,245,0.32);
  padding-left: 1.1rem;
  position: relative;
}
.ol-svc-list li::before {
  content: '→';
  position: absolute; left: 0;
  color: rgba(201,168,76,0.4);
  font-size: 10px;
}

/* CTA */
.ol-svc-cta {
  font-size: 13px;
  font-weight: 600;
  color: #C9A84C;
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  background: rgba(201,168,76,0.05);
}
/* En hover de la card, el CTA se rellena de dorado */
.ol-svc-card:hover .ol-svc-cta {
  background: #C9A84C;
  border-color: #C9A84C;
  color: #08080E;
}
```

---

## Grid Contenedor

```css
.ol-services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
@media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr) }
@media (max-width: 580px)  { grid-template-columns: 1fr }
```

---

## Servicios Actuales

| # | Título | URL |
|---|--------|-----|
| 01 | Desarrollo Web | `servicios/desarrollo-web/index.html` |
| 02 | Tiendas en Línea | `servicios/tiendas-en-linea/index.html` |
| 03 | Landing Pages | `servicios/landing-pages/index.html` |
| 04 | Rediseño Web | `servicios/rediseno-web/index.html` |

---

## Notas

- `ol-svc-icon` existe en el HTML pero tiene `display: none !important` — reservado para futura iconografía SVG.
- Las imágenes placeholder tienen un patrón de cuadrícula dorada sutil (grid 32×32px) con brillo radial central.
- Todo el `ol-svc-card` es un `<a>` — la tarjeta completa es clickeable.
