# Layout L2 — Blog (`blog/index.html`)

> Cuarta página de nivel 2 del sitio. Lista de artículos con layout de dos columnas: contenido principal (izquierda) + sidebar sticky de navegación interna (derecha). Introduce el sistema `ol-blog-*` y el patrón `ol-sb-*` de sidebar.

---

## Flujo completo de la página

```
┌─────────────────────────────────┐
│  ol-topbar                      │  ← Idéntico a portafolio/index.html
├─────────────────────────────────┤
│  ol-header                      │  ← "Blog" = active
├─────────────────────────────────┤
│  ol-mobile-overlay              │  ← Idéntico
│  ol-mobile-panel                │  ← "Blog" = active
├─────────────────────────────────┤
│  <main>                         │
│  ├── ol-page-hero               │  ← align-items: center
│  ├── ol-quicknav (con íconos)   │  ← Igual al de portafolio (top)
│  ├── ol-blog-section            │  ← Layout 2 col: main + sidebar
│  │   ├── ol-blog-main           │  ← Filtros + Featured + Grid de tarjetas
│  │   └── ol-blog-sidebar        │  ← 6 widgets, position: sticky
│  ├── ol-blog-cta-band           │  ← Banda de conversión (reemplaza FAQ)
│  └── ol-quicknav (sin íconos)   │  ← Bottom nav
├─────────────────────────────────┤
│  ol-footer                      │  ← Idéntico a portafolio/index.html
├─────────────────────────────────┤
│  WA bubble                      │
│  JS (header + mobile + filtros) │
└─────────────────────────────────┘
```

---

## Secciones y su documentación

| Sección | Clase | Doc | Fondo |
|---------|-------|-----|-------|
| Page Hero | `ol-page-hero` | [[21 — Page Hero de Subpágina (ol-page-hero)]] | `#08080E` |
| Quick Nav (top) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |
| Blog principal | `ol-blog-section` | Este documento | `#08080E` |
| CTA band | `ol-blog-cta-band` | Este documento | `#04040A` |
| Quick Nav (bottom) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |

---

## Alternancia de fondos

| Sección | Fondo |
|---------|-------|
| Page Hero | `#08080E` |
| Quick Nav top | `#0C0C18` |
| ol-blog-section | `#08080E` |
| ol-blog-cta-band | `#04040A` ← más oscuro |
| Quick Nav bottom | `#0C0C18` |
| Footer | `#0F0C07` |

> **Nota:** Blog no tiene FAQ. La conversión se maneja con `ol-blog-cta-band`.

---

## Diferencias clave vs. otras L2

| Aspecto | servicios | portafolio | nosotros | **blog** |
|---------|-----------|------------|---------|---------|
| Nav active | Servicios | Portafolio | Nosotros | **Blog** |
| Hero `align-items` | `start` | `center` | `center` | **`center`** |
| Layout principal | 1 col | 1 col | 1 col | **2 col (main+sidebar)** |
| Sección central única | `ol-servicios-page` | `ol-portfolio-section` | `ol-about` | **`ol-blog-section`** |
| FAQ | ✅ (prefijo `s`) | ✅ (prefijo `p`) | ✅ (prefijo `n`) | **❌ (usa cta-band)** |
| JS adicional | header+mobile | header+mobile | header+mobile+faq | **header+mobile+filtros** |

---

## Page Hero — valores blog

```html
<span class="ol-eyebrow">Blog OrigenLab</span>
<h1 class="ol-page-hero-title">Ideas que impulsan<br>tu presencia digital.</h1>
<p class="ol-page-hero-sub">Recursos prácticos sobre desarrollo web, diseño y estrategia digital
para empresas en México. Sin relleno, sin teoría vacía — solo lo que funciona.</p>
```

```css
.ol-page-hero-grid { align-items: center; }
```

---

## Layout de dos columnas — ol-blog-layout

```
┌──────────────────────────────────┬────────────────┐
│  ol-blog-main                    │ ol-blog-sidebar │
│                                  │                 │
│  [Filtros de categoría]          │ Widget 1: CTA   │
│  [ol-blog-featured]              │ Widget 2: Cats  │
│  [ol-blog-grid (2×N)]            │ Widget 3: Svcs  │
│                                  │ Widget 4: Recnt │
│                                  │ Widget 5: Nav   │
│                                  │ Widget 6: Tags  │
└──────────────────────────────────┴────────────────┘
```

```css
.ol-blog-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3rem;
  align-items: start;
}
@media (max-width: 1100px) {
  .ol-blog-layout { grid-template-columns: 1fr; }
}
```

---

## Sistema de filtros

### Barra de filtros (top)

```html
<div class="ol-blog-filters">
  <button class="ol-blog-filter-btn active" data-cat="todos">Todos</button>
  <button class="ol-blog-filter-btn" data-cat="diseno">Diseño Web</button>
  <button class="ol-blog-filter-btn" data-cat="rendimiento">Rendimiento</button>
  <button class="ol-blog-filter-btn" data-cat="estrategia">Estrategia</button>
  <button class="ol-blog-filter-btn" data-cat="ecommerce">E-commerce</button>
  <button class="ol-blog-filter-btn" data-cat="tecnologia">Tecnología</button>
</div>
```

### Categorías disponibles y colores

| `data-cat` | Label | Color |
|------------|-------|-------|
| `rendimiento` | Rendimiento | `#818CF8` (índigo) |
| `tecnologia` | Tecnología | `#38BDF8` (azul cielo) |
| `diseno` | Diseño Web | `#F472B6` (rosa) |
| `ecommerce` | E-commerce | `#34D399` (verde) |
| `estrategia` | Estrategia | `#FBBF24` (ámbar) |

### JavaScript de filtros

```javascript
var filterBtns = document.querySelectorAll('.ol-blog-filter-btn');
var cards = document.querySelectorAll('.ol-blog-card');
var featured = document.querySelector('.ol-blog-featured');
var sidebarCats = document.querySelectorAll('.ol-sb-cat-link');
var sidebarTags = document.querySelectorAll('.ol-sb-tag');

function applyFilter(cat) {
  filterBtns.forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-cat') === cat);
  });
  if (featured) {
    var featCat = featured.getAttribute('data-cat');
    featured.style.display = (cat === 'todos' || cat === featCat) ? '' : 'none';
  }
  cards.forEach(function(c) {
    var match = cat === 'todos' || c.getAttribute('data-cat') === cat;
    c.style.display = match ? '' : 'none';
  });
}

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() { applyFilter(btn.getAttribute('data-cat')); });
});
sidebarCats.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    applyFilter(link.getAttribute('data-cat'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
sidebarTags.forEach(function(tag) {
  tag.addEventListener('click', function(e) {
    e.preventDefault();
    applyFilter(tag.getAttribute('data-cat'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
```

---

## Artículo destacado — ol-blog-featured

Primero en aparecer, layout horizontal (imagen izquierda + contenido derecha).

```html
<article class="ol-blog-featured" data-cat="rendimiento">
  <div class="ol-blog-featured-img"><!-- placeholder visual --></div>
  <div class="ol-blog-featured-content">
    <span class="ol-eyebrow">Artículo destacado</span>
    <span class="ol-blog-cat rendimiento">Rendimiento</span>
    <h2>Por qué tu sitio web lento te está costando clientes</h2>
    <p>…descripción…</p>
    <div class="ol-blog-meta">…</div>
    <a href="…" class="ol-btn ol-btn-primary">Leer artículo →</a>
  </div>
</article>
```

```css
.ol-blog-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
}
@media (max-width: 700px) {
  .ol-blog-featured { grid-template-columns: 1fr; }
}
.ol-blog-featured-img {
  aspect-ratio: 16/10;
  background: linear-gradient(135deg, #0C0C18, #1a1a2e);
  border-right: 1px solid rgba(255,255,255,0.05);
  position: relative;
  overflow: hidden;
  min-height: 280px;
}
```

---

## Tarjetas de artículo — ol-blog-card

```html
<article class="ol-blog-card" data-cat="tecnologia">
  <div class="ol-blog-card-img"><!-- placeholder --></div>
  <div class="ol-blog-card-body">
    <span class="ol-blog-cat tecnologia">Tecnología</span>
    <h3 class="ol-blog-card-title">Título del artículo</h3>
    <p class="ol-blog-card-desc">Descripción de 1–2 líneas.</p>
    <div class="ol-blog-meta">
      <span><!-- fecha --></span>
      <span><!-- tiempo de lectura --></span>
    </div>
    <a href="…/index.html" class="ol-blog-card-link">Leer artículo →</a>
  </div>
</article>
```

```css
.ol-blog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (max-width: 700px) {
  .ol-blog-grid { grid-template-columns: 1fr; }
}
.ol-blog-card {
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
}
.ol-blog-card:hover {
  border-color: rgba(201,168,76,0.2);
  transform: translateY(-3px);
}
```

---

## Inventario de artículos

| Slug | Título | Categoría | Tiempo |
|------|--------|-----------|--------|
| `por-que-tu-sitio-lento-cuesta-clientes/` | Por qué tu sitio web lento te está costando clientes ⭐ | rendimiento | 5 min |
| `astro-vs-wordpress-cual-elegir/` | Astro vs WordPress: cuál elegir para tu empresa en México | tecnologia | 7 min |
| `errores-pymes-mexicanas-sitio-web/` | 5 errores que cometen las pymes mexicanas en su sitio web | diseno | 4 min |
| `landing-page-vs-sitio-corporativo/` | Landing page vs sitio corporativo: ¿qué necesita tu negocio? | estrategia | 5 min |
| `como-saber-si-tu-sitio-genera-resultados/` | Cómo saber si tu sitio web está generando resultados reales | estrategia | 6 min |
| `core-web-vitals-que-son/` | Core Web Vitals: qué son y cómo afectan a tu negocio en México | rendimiento | 6 min |
| `mercadopago-vs-stripe-mexico/` | Mercado Pago vs Stripe: cuál integrar en tu tienda en línea mexicana | ecommerce | 5 min |
| `rediseno-web-cuando-renovar/` | Rediseño web: cuándo es el momento de renovar tu sitio | diseno | 4 min |
| `cuanto-cuesta-sitio-web-mexico-2026/` | ¿Cuánto cuesta un sitio web profesional en México en 2026? | estrategia | 7 min |

> ⭐ = artículo destacado (`.ol-blog-featured`)

> **Regla:** Ningún artículo menciona "SEO" en su título o descripción. Enfoque: diseño, velocidad, conversión, resultados.

---

## Sidebar — ol-blog-sidebar

6 widgets `ol-sb-widget` en columna. Position sticky en desktop (`top: 120px`), estático en ≤1100px.

```css
.ol-blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 120px;
}
@media (max-width: 1100px) {
  .ol-blog-sidebar { position: static; }
}
.ol-sb-widget {
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 1.5rem;
}
.ol-sb-widget-title {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(240,240,245,0.38);
  margin: 0 0 1rem;
}
```

### Widgets en orden

| # | Título | Tipo | Clase especial |
|---|--------|------|----------------|
| 1 | CTA principal | Botón + texto | `ol-sb-cta` |
| 2 | Categorías | Links filtro | `ol-sb-cat-link[data-cat]` |
| 3 | Nuestros Servicios | Links a L3 | Nav interna principal |
| 4 | Artículos recientes | Lista 4 artículos | `ol-sb-recent-item` |
| 5 | Explorar el sitio | Links a L2 | Quicklinks internos |
| 6 | Temas | Tags filtro | `ol-sb-tag[data-cat]` |

### Widget 1 — CTA Principal

```html
<div class="ol-sb-widget ol-sb-cta">
  <p class="ol-sb-cta-title">¿Necesitas un sitio web?</p>
  <p class="ol-sb-cta-desc">Cotiza tu proyecto sin compromiso en menos de 2 minutos.</p>
  <a href="../cotizar/index.html" class="ol-btn ol-btn-primary" style="width:100%;text-align:center;display:block;">
    Cotizar ahora
  </a>
  <a href="../contacto/index.html" class="ol-sb-cta-link">o escríbenos directamente →</a>
</div>
```

### Widget 3 — Nuestros Servicios (navegación interna)

Links principales hacia las páginas de servicio L3:

| Label | Href |
|-------|------|
| Desarrollo Web | `../servicios/desarrollo-web/index.html` |
| Landing Pages | `../servicios/landing-pages/index.html` |
| Tiendas en Línea | `../servicios/tiendas-en-linea/index.html` |
| Rediseño Web | `../servicios/rediseno-web/index.html` |

### Widget 5 — Explorar el sitio

| Label | Href |
|-------|------|
| Portafolio | `../portafolio/index.html` |
| Nosotros | `../nosotros/index.html` |
| Proceso | `../index.html#ol-process` |
| Testimonios | `../index.html#ol-testimonials` |

---

## ol-blog-cta-band

Banda de conversión que reemplaza la sección FAQ del blog. Aparece antes del ol-quicknav inferior.

```html
<section class="ol-blog-cta-band">
  <div class="ol-blog-cta-band-inner">
    <div class="ol-blog-cta-band-content">
      <span class="ol-eyebrow">¿Listo para dar el siguiente paso?</span>
      <h2 class="ol-blog-cta-band-title">Tu sitio web puede trabajar<br>por ti las 24 horas.</h2>
      <p class="ol-blog-cta-band-desc">…</p>
    </div>
    <div class="ol-blog-cta-band-actions">
      <a href="../cotizar/index.html" class="ol-btn ol-btn-primary">Cotizar mi proyecto</a>
      <a href="../portafolio/index.html" class="ol-btn ol-btn-ghost">Ver portafolio</a>
    </div>
  </div>
</section>
```

```css
.ol-blog-cta-band {
  background: #04040A;
  padding: 5rem 0;
  position: relative;
}
.ol-blog-cta-band::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
}
.ol-blog-cta-band-inner {
  width: 90%; max-width: 1600px; margin: 0 auto;
  display: flex; align-items: center;
  justify-content: space-between; gap: 3rem; flex-wrap: wrap;
}
```

---

## CSS de la página

Todo el CSS vive en `<style>` inline en el `<head>`. No modifica `premium-dark.css`.

| Bloque CSS | Qué define |
|------------|-----------|
| `ol-page-hero-*` | Hero de subpágina (igual que otras L2) |
| `ol-blog-section` | Contenedor principal |
| `ol-blog-layout` | Grid 2 col (1fr + 340px) |
| `ol-blog-filters` | Barra de botones de categoría |
| `ol-blog-filter-btn` | Botón de filtro + estado `.active` |
| `ol-blog-cat` | Badge de categoría + variantes de color |
| `ol-blog-featured` | Artículo destacado horizontal |
| `ol-blog-featured-img` | Placeholder imagen destacada |
| `ol-blog-featured-content` | Contenido del featured |
| `ol-blog-grid` | Grid 2 col de tarjetas |
| `ol-blog-card` | Tarjeta de artículo |
| `ol-blog-card-img` | Placeholder imagen de card |
| `ol-blog-card-body` | Cuerpo de la card |
| `ol-blog-card-title` | Título de card |
| `ol-blog-card-desc` | Descripción corta |
| `ol-blog-card-link` | CTA de card |
| `ol-blog-meta` | Fecha + tiempo de lectura |
| `ol-blog-sidebar` | Sidebar sticky |
| `ol-sb-widget` | Widget base del sidebar |
| `ol-sb-widget-title` | Eyebrow de widget |
| `ol-sb-cta` | Widget CTA principal |
| `ol-sb-cat-link` | Link de categoría filtrable |
| `ol-sb-nav-link` | Link de navegación interna |
| `ol-sb-recent-item` | Item de artículo reciente |
| `ol-sb-tag` | Tag filtrable |
| `ol-blog-cta-band` | Banda CTA inferior |

---

## Regla de rutas

```
CSS:      ../_astro/BaseLayout.xeR8R953.css
          ../_astro/premium-dark.css
Imágenes: ../img/origenlab.webp
Links:    ../index.html
          ../servicios/index.html
          ../portafolio/index.html
          ../nosotros/index.html
          ../cotizar/index.html
          ../contacto/index.html
          ../servicios/desarrollo-web/index.html
          ../servicios/landing-pages/index.html
          ../servicios/tiendas-en-linea/index.html
          ../servicios/rediseno-web/index.html
Artículos: [slug]/index.html  (relativo a blog/)
```

---

## Mejoras pendientes

| Prioridad | Mejora | Notas |
|-----------|--------|-------|
| 🔴 Alta | Crear páginas individuales de artículos | 9 slugs pendientes bajo `blog/[slug]/index.html` |
| 🔴 Alta | Añadir imágenes reales a artículos | Actualmente todos los placeholders usan gradientes CSS |
| 🟡 Media | Paginación | Cuando el inventario supere 12–15 artículos |
| 🟡 Media | Campo de búsqueda en sidebar | Búsqueda JS client-side por título/descripción |
| 🟡 Media | Contador de artículos por categoría en sidebar | `(N)` junto a cada categoría |
| 🟢 Baja | Open Graph meta tags por artículo | Para share en redes sociales |
| 🟢 Baja | Tiempo de lectura calculado dinámicamente | Con JS basado en conteo de palabras |

---

## Ver también

- [[21 — Page Hero de Subpágina (ol-page-hero)]]
- [[08 — Quick Nav Bar]]
- [[23 — Layout L2 — Servicios (servicios⁄index.html)]]
- [[24 — Layout L2 — Portafolio (portafolio⁄index.html)]]
- [[26 — Layout L2 — Nosotros (nosotros⁄index.html)]]
- [[20 — Estructura de Archivos y Páginas]]
