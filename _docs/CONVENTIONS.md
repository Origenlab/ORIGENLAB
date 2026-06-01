# ORIGENLAB · Convenciones del sitio

Reglas duras del proyecto. Cualquier código que rompa estas reglas debe rechazarse en revisión.

---

## 1. Reglas de contenido (NO negociables)

- **NO mencionar SEO en el sitio.** Ni en copy, ni en metadatos visibles, ni en alt text. Servicios oficiales: diseño web, velocidad, conversión. (Internamente sí optimizamos para buscadores; nunca lo comunicamos como producto.)
- **NO precios.** Cero cifras de proyectos. Cero "$X MXN", cero "desde $". Si una página tiene `.ol-pricing-*`, está fuera de spec — quitar o reemplazar por CTA "Cotizar".
- **NO plazos.** Cero "en 2 semanas", "entrega en X días". Reemplazar por "calendario comprometido por escrito desde el inicio".
- **NO animaciones excepto en botones.** Cards, imágenes, íconos JAMÁS animan (ni hover-lift, ni transform, ni transition de scale). Botones: sólo `transform: translateY(-1px)` + cambio de fondo en hover.

## 2. Stack

- **HTML estático** servido desde GitHub Pages (`Frankoropeza/origenlab` → origenlab.com).
- CSS compartido en `_astro/premium-dark.css` (1 solo archivo, secciones comentadas).
- JS mínimo en `_astro/ol-header.js` (header + FAQ toggle).
- Fuente: Inter de Google Fonts con preconnect.
- Cache buster: `?vYYYYMMDDx` en `<link>` y `<script>` cuando se modifique CSS/JS compartido.

## 3. Naming

| Prefix | Uso |
|--------|-----|
| `.hero` / `.hero__*` | Hero universal (BEM, sólo una vez por página) |
| `.ol-{componente}` / `.ol-{componente}-{elemento}` | Todos los componentes compartidos del sitio |
| `.ol-{componente}-{modificador}` | Variantes (`.ol-btn-ghost`, `.ol-card-dark`) |
| `--{componente}-{prop}` | Variables CSS para override por página |

Reglas:
- **Una clase = una intención.** No reusar `.ol-card` para 5 layouts distintos.
- **Sin scoping `[data-astro-cid-XXX]`** en reglas reusables — son scoped a Astro y rompen reuso.
- **Sin `!important`** salvo overrides justificados (ej. resetear estilos de Astro legacy).

## 4. Estructura de página HTML

Toda página sigue este orden:

```
<head>
  meta básica + canonical + OG + favicon + fonts
  <link premium-dark.css>
  <script ol-header.js defer>
  <style>  /* SÓLO overrides específicos de la página */ </style>
  Schema.org JSON-LD
</head>
<body>
  <!-- Header (nav universal) -->
  <header class="ol-topbar">...</header>
  <header class="ol-header">...</header>

  <main id="main">
    <section class="hero">...</section>
    <!-- Secciones de la página usando componentes compartidos -->
  </main>

  <!-- QuickNav opcional -->
  <div class="ol-quicknav">...</div>

  <!-- Footer universal -->
  <footer class="ol-footer">...</footer>
</body>
```

## 5. CSS inline por página: cuándo está permitido

Sólo para **overrides de variables CSS** (acentos por página) y **clases nuevas no reusables**. Ejemplo OK:

```html
<style>
  .hero { --hero-accent: #C0392B; }  /* override de variable: OK */
  .ol-case-only-x { ... }            /* clase única de la página: OK */
</style>
```

NUNCA OK:
- Redefinir clases compartidas (`.ol-faq-grid { ... }`).
- Copiar 30 líneas de un componente que ya existe en premium-dark.css.

## 6. Imágenes

- Formato: WebP siempre. JPG/PNG sólo si el cliente lo exige.
- Atributo `width` y `height` obligatorio (evita CLS).
- `loading="lazy"` en imágenes below-the-fold. `fetchpriority="high"` SÓLO en la primera imagen del hero.
- `alt` descriptivo y específico (no "imagen" ni vacío excepto decorativos).

## 7. Performance

- Cero JS de tracking inline. Todo lo de analytics (si llega a haberlo) debe ir async.
- Preconnect sólo a `fonts.googleapis.com` y `fonts.gstatic.com`.
- CSS crítico aceptable inline si supera el budget — pero sólo después de medir LCP.

## 8. Accesibilidad mínima

- Foco visible en todo elemento interactivo (`outline: 2px solid var(--accent)` o equivalente).
- Contraste AA mínimo (texto sobre fondo oscuro).
- `aria-label` en navs y botones de ícono.

---

Última actualización: 2026-04-26
