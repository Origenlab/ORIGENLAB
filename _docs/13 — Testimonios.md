# Sección: Testimonios (`ol-testimonials`)

> Grid de 8 tarjetas de testimonio de clientes reales. Fondo oscuro `#04040A`.

---

## Estructura

```html
<section class="ol-testimonials" id="testimonios">
  <div class="ol-testimonials-inner">

    <!-- Encabezado 2 columnas -->
    <div class="ol-sh">
      <div class="ol-sh-left">
        <span class="ol-eyebrow">Testimonios</span>
        <h2 class="ol-section-title">Lo que dicen nuestros clientes.</h2>
        <p class="ol-section-sub">Más del 70% de nuestros proyectos provienen de referidos...</p>
      </div>
      <div class="ol-sh-right">
        <p class="ol-sh-copy">Los mejores indicadores de calidad no son los que nosotros mismos decimos...</p>
        <p class="ol-sh-copy">Cada testimonio representa un proyecto real...</p>
      </div>
    </div>

    <!-- Grid 4 columnas (8 tarjetas = 2 filas) -->
    <div class="ol-testimonials-grid">
      <!-- 8× ol-tc → ver [[18 — Tarjeta de Testimonio (ol-tc)]] -->
    </div>

  </div>
</section>
```

---

## CSS de Sección

```css
.ol-testimonials {
  background: #04040A;
  padding: 6rem 0;
}
.ol-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
```

---

## Clientes Activos

| Cliente | Sector |
|---------|--------|
| REDEIL | Renta de Iluminación |
| Proyecto RED | Agencia Creativa |
| Eventech | Renta de Equipo para Eventos |
| Estudio Creativo Mija | Dirección Creativa |
| Clínica Dental Sonríe | Salud |
| Constructora Horizonte | Construcción |
| Despacho Mendoza & Asociados | Legal |
| Moda Vázquez | E-commerce / Moda |

---

## Ver también

- [[18 — Tarjeta de Testimonio (ol-tc)]] — Estructura y CSS de cada card
