# Sección: Servicios (`ol-services`)

> Grid de 4 tarjetas de servicio precedidas por el encabezado `ol-sh`.

---

## Estructura

```html
<section class="ol-services" id="servicios">
  <div class="ol-services-inner">

    <!-- Encabezado 2 columnas -->
    <div class="ol-sh">
      <div class="ol-sh-left">
        <span class="ol-eyebrow">Servicios</span>
        <h2 class="ol-section-title">Todo lo que tu negocio<br>necesita en línea.</h2>
        <p class="ol-section-sub">Desde el diseño hasta el lanzamiento...</p>
      </div>
      <div class="ol-sh-right">
        <p class="ol-sh-copy">...</p>
        <p class="ol-sh-copy">...</p>
      </div>
    </div>

    <!-- Grid 4 tarjetas -->
    <div class="ol-services-grid">
      <!-- 4× ol-svc-card → ver [[17 — Tarjeta de Servicio (ol-svc-card)]] -->
    </div>

  </div>
</section>
```

---

## CSS de Sección

```css
.ol-services {
  background: #08080E;
  padding: 6rem 0;
  position: relative;
}
/* Línea dorada superior */
.ol-services::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent);
}
```

---

## Ver también

- [[17 — Tarjeta de Servicio (ol-svc-card)]] — Anatomía completa de cada card
- [[05 — Patrón Section Header 2 columnas (ol-sh)]] — Encabezado reutilizable
