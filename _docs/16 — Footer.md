# Componente: Footer (`ol-footer`)

> Footer premium de 3 franjas: top (logo + tagline + contacto), links (4 columnas), bottom (copyright + legal).

---

## Estructura HTML

```html
<footer class="ol-footer">

  <!-- FRANJA 1: logo | tagline | contacto -->
  <div class="ol-footer-top">
    <a href="index.html" class="ol-footer-logo">
      Origen<span class="ol-footer-logo-dot">.</span>Lab
    </a>
    <p class="ol-footer-tagline">
      Agencia de desarrollo web en México.<br>
      Creamos sitios que generan resultados.
    </p>
    <ul class="ol-footer-contact-list">
      <li><a href="mailto:..." class="ol-fcl-item">...</a></li>
      <li><a href="tel:..."   class="ol-fcl-item">...</a></li>
      <li><a href="https://wa.me/..." class="ol-fcl-item ol-fcl-wa">WhatsApp</a></li>
      <li><span class="ol-fcl-item ol-fcl-static">Ciudad de México, MX</span></li>
    </ul>
  </div>

  <!-- FRANJA 2: columnas de links -->
  <div class="ol-footer-links">
    <div>
      <p class="ol-footer-col-title">Servicios</p>
      <ul class="ol-footer-col-list">
        <li><a href="...">Desarrollo Web</a></li>
        <li><a href="...">Tiendas en Línea</a></li>
        <li><a href="...">Landing Pages</a></li>
        <li><a href="...">Rediseño Web</a></li>
      </ul>
    </div>
    <div>
      <p class="ol-footer-col-title">Empresa</p>
      <ul class="ol-footer-col-list">
        <li><a href="...">Nosotros</a></li>
        <li><a href="...">Portafolio</a></li>
        <li><a href="...">Blog</a></li>
        <li><a href="...">Contacto</a></li>
      </ul>
    </div>
    <div>
      <p class="ol-footer-col-title">Recursos</p>
      <ul class="ol-footer-col-list">
        <li><a href="...">Cotizador</a></li>
        <!-- ... -->
      </ul>
    </div>
    <div>
      <p class="ol-footer-col-title">Contacto</p>
      <!-- info de contacto -->
    </div>
  </div>

  <!-- FRANJA 3: copyright + legal -->
  <div class="ol-footer-bottom">
    <p class="ol-footer-copy">© 2025 OrigenLab. Todos los derechos reservados.</p>
    <div class="ol-footer-legal">
      <a href="...">Privacidad</a>
      <a href="...">Términos</a>
    </div>
  </div>

</footer>
```

---

## CSS Principal

### Franja superior

```css
.ol-footer-top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2.5rem;
  align-items: center;
  padding: 1.6rem 0;
  border-bottom: 1px solid rgba(201,168,76,0.12);
}
.ol-footer-logo {
  font-size: 1.45rem; font-weight: 900;
  color: #F0F0F5; letter-spacing: -0.04em;
}
.ol-footer-logo-dot { color: #C9A84C; }
.ol-footer-tagline {
  font-size: 13px;
  color: rgba(240,240,245,0.32);
}
```

### Ítems de contacto

```css
.ol-fcl-item {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  font-size: 13.5px;
  color: rgba(240,240,245,0.5);
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}
.ol-fcl-item:hover { background: rgba(255,255,255,0.04); color: rgba(240,240,245,0.85); }
.ol-fcl-wa          { color: rgba(37,211,102,0.65); }
.ol-fcl-wa:hover    { color: #25D366; background: rgba(37,211,102,0.05); }
.ol-fcl-static      { cursor: default; } /* Ciudad de México — no es clickeable */
```

### Columnas de links

```css
.ol-footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid rgba(201,168,76,0.08);
}
.ol-footer-col-title {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(240,240,245,0.4);
}
.ol-footer-col-list li a {
  font-size: 13.5px;
  color: rgba(240,240,245,0.42);
}
.ol-footer-col-list li a:hover { color: #C9A84C; }
```

---

## Fondo

```css
.ol-footer { background: #0F0C07; }   /* Cálido oscuro — diferente al resto del sitio */
/* Línea dorada superior del footer */
.ol-footer::before {
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.3) 70%, transparent);
}
```

El footer usa `#0F0C07` (con tono ligeramente cálido) para diferenciarse del `#08080E` del resto.

---

## Responsive

| Breakpoint | Layout top | Layout links |
|------------|-----------|-------------|
| `> 1024px` | 3 columnas | 4 columnas |
| `≤ 1024px` | 2 col + contacto en segunda fila | 2 columnas |
| `≤ 640px` | 1 columna | 2 columnas |

---

## Notas

- El footer del Astro original (`footer[data-astro-cid-sz7xmlte]`) está oculto con `display: none !important`.
- El `ol-footer` es HTML estático añadido directamente en el `<body>`.
