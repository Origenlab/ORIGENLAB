# Componente: Tarjeta de Proyecto (`ol-proj-card`)

> Card de portafolio con thumbnail, badge de resultado, categoría, nombre, descripción, tags y link al sitio. Exclusivo de `portafolio/index.html`.

---

## Dónde se usa

| Página | Estado |
|--------|--------|
| `portafolio/index.html` | ✅ Implementado (5 cards + 1 card CTA) |
| Páginas L3 de proyecto | 🔜 Pendiente |

---

## Anatomía del card

```
┌─────────────────────────────┐
│  [thumbnail / placeholder]  │  ← .ol-proj-thumb (height: 210px)
│  [badge resultado]          │  ← .ol-proj-badge (bottom-left, glassmorphism)
├─────────────────────────────┤
│  CATEGORÍA                  │  ← .ol-proj-cat (uppercase, accent color)
│  Nombre del proyecto        │  ← .ol-proj-name (h3)
│  Descripción corta          │  ← .ol-proj-desc (2–3 líneas)
│  [tag] [tag] [tag]          │  ← .ol-proj-tags + .ol-proj-tag
│  Ver sitio →                │  ← .ol-proj-link (solo si hay URL pública)
└─────────────────────────────┘
```

---

## Estructura HTML — Card con imagen real

```html
<div class="ol-proj-card" style="--proj-accent: #E05800;">

  <!-- Thumbnail -->
  <div class="ol-proj-thumb">
    <img src="../img/portafolio/cadeca-1.avif"
         alt="CADECA — Sitio corporativo B2B"
         width="600" height="338" loading="lazy">
    <span class="ol-proj-badge" style="color:#E05800;">127 páginas indexadas</span>
  </div>

  <!-- Info -->
  <div class="ol-proj-body">
    <span class="ol-proj-cat">Sitio Corporativo B2B</span>
    <h3 class="ol-proj-name">CADECA</h3>
    <p class="ol-proj-desc">Descripción del proyecto en 2–3 líneas orientadas al resultado.</p>
    <div class="ol-proj-tags">
      <span class="ol-proj-tag">Astro</span>
      <span class="ol-proj-tag">B2B</span>
      <span class="ol-proj-tag">Catálogo</span>
    </div>
    <a href="https://cajas-de-carton.com" class="ol-proj-link"
       target="_blank" rel="noopener noreferrer">Ver sitio →</a>
  </div>

</div>
```

---

## Estructura HTML — Card con placeholder (sin imagen)

```html
<div class="ol-proj-card" style="--proj-accent: #0EA5E9;">

  <div class="ol-proj-thumb">
    <div class="ol-proj-thumb-placeholder">
      <span class="ol-proj-thumb-initial" style="--proj-accent: #0EA5E9;">G</span>
    </div>
    <span class="ol-proj-badge" style="color:#0EA5E9;">Presencia digital profesional</span>
  </div>

  <div class="ol-proj-body">
    <span class="ol-proj-cat">Sitio Corporativo</span>
    <h3 class="ol-proj-name">Gama de México</h3>
    <p class="ol-proj-desc">Descripción del proyecto.</p>
    <div class="ol-proj-tags">...</div>
    <!-- Sin ol-proj-link si no hay URL pública -->
  </div>

</div>
```

---

## Estructura HTML — Card CTA (último slot del grid)

```html
<a href="../cotizar/index.html" class="ol-proj-card ol-proj-card-cta">
  <div class="ol-proj-cta-icon">
    <svg ...><!-- ícono + --></svg>
  </div>
  <p class="ol-proj-cta-title">Tu empresa, aquí</p>
  <p class="ol-proj-cta-sub">¿Tu negocio necesita presencia digital profesional?</p>
  <span class="ol-proj-cta-btn">Cotizar proyecto →</span>
</a>
```

---

## CSS

```css
/* Grid contenedor */
.ol-proj-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3.5rem;
}
@media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
@media (max-width: 640px)  { grid-template-columns: 1fr; }

/* Card base */
.ol-proj-card {
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.ol-proj-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201,168,76,0.25);
  box-shadow: 0 24px 48px rgba(0,0,0,0.5);
}

/* Thumbnail */
.ol-proj-thumb {
  position: relative;
  height: 210px;
  overflow: hidden;
  background: rgba(201,168,76,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.ol-proj-thumb img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.45s ease;
}
.ol-proj-card:hover .ol-proj-thumb img { transform: scale(1.05); }

/* Placeholder sin imagen */
.ol-proj-thumb-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.ol-proj-thumb-initial {
  font-size: 4.5rem; font-weight: 900;
  color: var(--proj-accent, #C9A84C);
  opacity: 0.18; letter-spacing: -0.05em;
  user-select: none;
}

/* Badge */
.ol-proj-badge {
  position: absolute;
  bottom: 0.75rem; left: 0.875rem;
  background: rgba(0,0,0,0.72);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.04em;
  padding: 0.3rem 0.8rem;
  /* color se define inline con --proj-accent */
}

/* Cuerpo */
.ol-proj-body {
  padding: 1.5rem;
  display: flex; flex-direction: column;
  gap: 0.75rem; flex: 1;
}
.ol-proj-cat {
  font-size: 10.5px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--proj-accent, #C9A84C);
}
.ol-proj-name {
  font-size: 1.2rem; font-weight: 700;
  color: #F0F0F5; letter-spacing: -0.02em;
  line-height: 1.2; margin: 0;
}
.ol-proj-desc {
  font-size: 0.875rem; color: rgba(240,240,245,0.5);
  line-height: 1.65; margin: 0; flex: 1;
}

/* Tags */
.ol-proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.25rem; }
.ol-proj-tag {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 999px;
  font-size: 11px; color: rgba(240,240,245,0.45);
  padding: 0.2rem 0.65rem;
}

/* Link */
.ol-proj-link {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 12.5px; font-weight: 600;
  color: #C9A84C; text-decoration: none;
  margin-top: 0.5rem;
  transition: gap 0.2s; width: fit-content;
}
.ol-proj-link:hover { gap: 0.6rem; }

/* ---- Card CTA (último slot) ---- */
.ol-proj-card-cta {
  background: rgba(201,168,76,0.04);
  border-color: rgba(201,168,76,0.15);
  justify-content: center; align-items: center;
  text-align: center; min-height: 320px;
  text-decoration: none; display: flex;
  flex-direction: column; gap: 0;
  transition: background 0.3s, border-color 0.3s;
}
.ol-proj-card-cta:hover {
  background: rgba(201,168,76,0.08);
  border-color: rgba(201,168,76,0.3);
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(0,0,0,0.5);
}
.ol-proj-cta-icon {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.2);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.5rem;
  color: #C9A84C;
}
.ol-proj-cta-title {
  font-size: 1.1rem; font-weight: 700;
  color: #F0F0F5; margin: 0 0 0.6rem;
  letter-spacing: -0.02em;
}
.ol-proj-cta-sub {
  font-size: 0.875rem; color: rgba(240,240,245,0.4);
  line-height: 1.6; margin: 0 0 1.75rem; max-width: 22ch;
}
.ol-proj-cta-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.3);
  color: #C9A84C; font-size: 13px; font-weight: 600;
  padding: 0.7rem 1.4rem; border-radius: 6px;
  text-decoration: none; transition: background 0.2s, border-color 0.2s;
}
.ol-proj-card-cta:hover .ol-proj-cta-btn {
  background: rgba(201,168,76,0.18);
  border-color: rgba(201,168,76,0.5);
}
```

---

## Variable de acento `--proj-accent`

Cada card define su propio color de acento mediante un custom property inline:

```html
<div class="ol-proj-card" style="--proj-accent: #E05800;">
```

Este valor se usa en `.ol-proj-cat`, `.ol-proj-thumb-initial` y `.ol-proj-badge` (color inline directo).

| Proyecto | `--proj-accent` |
|----------|----------------|
| CADECA | `#E05800` |
| REDEIL | `#7C3AED` |
| BRINCOLINS | `#F59E0B` |
| Gama de México | `#0EA5E9` |
| Eventech | `#10B981` |
| Card CTA | Sin variable — usa dorado `#C9A84C` directo |

---

## Proyectos actuales

| # | Nombre | Tipo | Imagen | URL pública |
|---|--------|------|--------|-------------|
| 01 | CADECA | Sitio Corporativo B2B | `cadeca-1.avif` | https://cajas-de-carton.com |
| 02 | REDEIL | Sitio de Servicios + Cotizador | `redeil-2.avif` | https://rentadeiluminacion.com |
| 03 | BRINCOLINS | Directorio + Reservas | `brincolins-1.avif` | https://brincolins.com |
| 04 | Gama de México | Sitio Corporativo | — (placeholder) | — |
| 05 | Eventech | Catálogo de Servicios | — (placeholder) | https://eventech.mx |
| 06 | Card CTA | — | — | `../cotizar/index.html` |

---

## Reglas de contenido

- **Categoría (`ol-proj-cat`):** 2–4 palabras. Describe el tipo de proyecto. Ej: `Sitio Corporativo B2B`, `Directorio + Reservas`.
- **Nombre (`ol-proj-name`):** Solo el nombre comercial del cliente. Una línea.
- **Descripción (`ol-proj-desc`):** 2–3 líneas. Enfocada en qué se hizo y un resultado concreto. No mencionar SEO.
- **Tags (`ol-proj-tag`):** 3–4 tags. Tecnología + tipo de proyecto. No usar "SEO" como tag.
- **Badge (`ol-proj-badge`):** Resultado o logro concreto. 3–5 palabras. Color = `--proj-accent`.
- **Link:** Solo presente si el sitio tiene URL pública activa. Si no hay URL, omitir `ol-proj-link`.

---

## Sección contenedora — `ol-portfolio-section`

```css
.ol-portfolio-section {
  background: #04040A;
  padding: 6rem 0;
  position: relative;
}
/* Línea separadora superior */
.ol-portfolio-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
}
.ol-portfolio-inner {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
}
```

Estructura `ol-sh` de la sección:

| Campo | Valor |
|-------|-------|
| Eyebrow | Proyectos |
| Título | Sitios que construimos<br>para empresas reales. |
| Sub | Proyectos entregados, funcionando y generando resultados para negocios en México. |

---

## Mejoras pendientes

| Prioridad | Mejora |
|-----------|--------|
| 🔴 Alta | Agregar imágenes reales para Gama de México y Eventech |
| 🟡 Media | Agregar filtros JS (Todos / Corporativo / E-commerce / Landing) al `ol-proj-grid` |
| 🟡 Media | Crear variante `ol-proj-card--featured` de ancho completo para proyectos destacados |
| 🟢 Baja | Añadir efecto de overlay con tagline al hacer hover en el thumbnail |
| 🟢 Baja | Páginas individuales L3 por proyecto con caso de estudio completo |

---

## Ver también

- [[24 — Layout L2 — Portafolio (portafolio⁄index.html)]]
- [[17 — Tarjeta de Servicio (ol-svc-card)]] — componente equivalente para servicios
- [[22 — Showcase de Servicios (ol-showcase)]]
- [[01 — Design Tokens]]
