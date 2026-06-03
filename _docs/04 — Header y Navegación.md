# Componente: Header y Navegación (`ol-header`)

> Header fijo que arranca en `top: 42px` (debajo del topbar). Al hacer scroll, sube a `top: 0`.

---

## Estructura HTML

```html
<header class="ol-header" id="ol-header">
  <div class="ol-header-inner">

    <!-- Logo -->
    <a href="index.html" class="ol-header-logo">
      <img src="img/origenlab.webp" alt="OrigenLab" class="ol-logo-img">
    </a>

    <!-- Nav Desktop -->
    <nav class="ol-nav" aria-label="Navegación principal">
      <ul class="ol-nav-list">
        <li><a href="index.html" class="ol-nav-link active">Inicio</a></li>
        <li class="ol-has-dropdown">
          <a href="servicios/index.html" class="ol-nav-link">
            Servicios
            <svg class="ol-nav-chevron">...</svg>
          </a>
          <div class="ol-dropdown">
            <ul>
              <li><a href="..." class="ol-dropdown-link">Desarrollo Web</a></li>
              <li><a href="..." class="ol-dropdown-link">Tiendas en Línea</a></li>
              <li><a href="..." class="ol-dropdown-link">Landing Pages</a></li>
              <li><a href="..." class="ol-dropdown-link">Rediseño Web</a></li>
            </ul>
          </div>
        </li>
        <li><a href="portafolio/index.html" class="ol-nav-link">Portafolio</a></li>
        <li><a href="nosotros/index.html" class="ol-nav-link">Nosotros</a></li>
        <li><a href="blog/index.html" class="ol-nav-link">Blog</a></li>
        <li><a href="contacto/index.html" class="ol-nav-link">Contacto</a></li>
      </ul>
    </nav>

    <!-- CTA Desktop -->
    <a href="cotizar.html" class="ol-header-cta">Cotizar proyecto →</a>

    <!-- Hamburger (móvil) -->
    <button class="ol-menu-toggle" id="ol-menu-toggle">
      <span class="ol-ham-line"></span>
      <span class="ol-ham-line"></span>
      <span class="ol-ham-line"></span>
    </button>

  </div>
</header>

<!-- Overlay oscuro para móvil -->
<div class="ol-mobile-overlay" id="ol-mobile-overlay"></div>

<!-- Panel móvil -->
<nav class="ol-mobile-panel" id="ol-mobile-panel">
  ...
</nav>
```

---

## Layout del Header

```css
.ol-header-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;  /* logo | nav | cta */
  align-items: center;
  gap: 2.5rem;
}
```

---

## Nav Link

```css
.ol-nav-link {
  font-size: 13px;
  font-weight: 400;
  color: rgba(240,240,245,0.55);
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
}
/* Subrayado animado en hover/active */
.ol-nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px; left: 50%; right: 50%;
  height: 1.5px;
  background: #C9A84C;
  transition: left 0.25s ease, right 0.25s ease;
}
.ol-nav-link.active { color: #C9A84C; font-weight: 500; }
```

---

## Dropdown

```css
.ol-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  min-width: 210px;
  background: #1C1C2A;
  border: 1px solid rgba(255,255,255,0.08);
  border-top: 2px solid rgba(201,168,76,0.3);
  border-radius: 14px;
  transform: translateX(-50%) translateY(10px);
  opacity: 0; visibility: hidden;
  transition: opacity 0.22s, visibility 0.22s, transform 0.22s;
}
/* Aparece en hover del li padre */
.ol-has-dropdown:hover .ol-dropdown { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
```

Cada item del dropdown tiene un punto dorado `::before` que hace scale en hover.

---

## Header CTA (botón "Cotizar")

```css
.ol-header-cta {
  background: linear-gradient(135deg, #C9A84C, #B8922E);
  color: #08080E;
  font-size: 13px;
  font-weight: 700;
  padding: 0.6rem 1.35rem;
  border-radius: 10px;
}
/* Hover: sombra dorada + lift de 1px */
```

---

## Estado Scrolled

```css
.ol-header.scrolled {
  top: 0;
  background: rgba(19,19,31,0.97);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 40px rgba(0,0,0,0.6);
}
```
Activado vía JavaScript al detectar `window.scrollY > 10`.

---

## Hamburger (Móvil)

```css
/* Visible en ≤ 900px */
.ol-menu-toggle { display: none; }
@media (max-width: 900px) { .ol-menu-toggle { display: flex; } }

/* Animación de X al abrir */
.ol-menu-toggle.open .ol-ham-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.ol-menu-toggle.open .ol-ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
.ol-menu-toggle.open .ol-ham-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
```

---

## Panel Móvil (`ol-mobile-panel`)

- Slide desde la derecha: `transform: translateX(100%)` → `translateX(0)` al abrir.
- Ancho: `80%` / máx. `340px`. En `≤ 480px`: `100%`.
- Contiene: logo, nav con submenú colapsable, CTA en footer del panel.

---

## Responsive

| Breakpoint | Comportamiento |
|------------|---------------|
| `> 900px` | Nav desktop + CTA visible. Hamburger oculto |
| `≤ 900px` | Nav y CTA ocultos. Hamburger visible |
| `≤ 480px` | Panel móvil ocupa 100% de ancho |

---

## Notas

- El logo usa `filter: brightness(0) invert(1)` para convertir el logo a blanco.
- La línea decorativa dorada debajo del header es un `::after` pseudoelemento con gradiente.
- No hay submenú de 2 niveles en móvil: solo 1 nivel de accordion.
