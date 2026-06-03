# Componente: Sección Manifiesto (`ol-about`)

> Bloque de 2 columnas exclusivo de `nosotros/index.html`. Presenta la narrativa de la agencia (izquierda) y un grid de 4 valores diferenciales (derecha).

---

## Dónde se usa

| Página | Estado |
|--------|--------|
| `nosotros/index.html` | ✅ Implementado |
| Otras páginas | — (exclusivo de nosotros) |

---

## Anatomía de la sección

```
┌─────────────────────────────────────────────────────────────┐
│  ol-sh (eyebrow + título + sub + 2 párrafos derechos)       │
├──────────────────────────┬──────────────────────────────────┤
│  ol-about-narrative      │  ol-about-values (2×2)           │
│  ┌────────────────────┐  │  ┌──────────┐ ┌──────────┐      │
│  │ Párrafo 1          │  │  │ Valor 01 │ │ Valor 02 │      │
│  │ Párrafo 2          │  │  └──────────┘ └──────────┘      │
│  │ Párrafo 3          │  │  ┌──────────┐ ┌──────────┐      │
│  │ Párrafo 4          │  │  │ Valor 03 │ │ Valor 04 │      │
│  │                    │  │  └──────────┘ └──────────┘      │
│  │ [Firma: avatar OL] │  │                                  │
│  └────────────────────┘  │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

---

## Estructura HTML

```html
<section class="ol-about">
  <div class="ol-about-inner">

    <!-- Encabezado 2 columnas estándar -->
    <div class="ol-sh">
      <div class="ol-sh-left">
        <span class="ol-eyebrow">Nuestra historia</span>
        <h2 class="ol-section-title">Un estudio con<br>una sola obsesión.</h2>
        <p class="ol-section-sub">Que los sitios que construimos funcionen de verdad...</p>
      </div>
      <div class="ol-sh-right">
        <p class="ol-sh-copy">Párrafo 1 de contexto editorial.</p>
        <p class="ol-sh-copy">Párrafo 2 de contexto editorial.</p>
      </div>
    </div>

    <!-- Grid 2 columnas: narrativa + valores -->
    <div class="ol-about-grid">

      <!-- Izquierda: narrativa -->
      <div class="ol-about-narrative">
        <p class="ol-about-p">Párrafo 1 — modelo de trabajo.</p>
        <p class="ol-about-p">Párrafo 2 — proceso de descubrimiento.</p>
        <p class="ol-about-p">Párrafo 3 — tecnología.</p>
        <p class="ol-about-p">Párrafo 4 — post-entrega.</p>

        <div class="ol-about-signature">
          <div class="ol-about-sig-avatar">OL</div>
          <div>
            <p class="ol-about-sig-name">Equipo OrigenLab</p>
            <p class="ol-about-sig-role">Ciudad de México · Desarrollo Web &amp; Diseño Digital</p>
          </div>
        </div>
      </div>

      <!-- Derecha: grid de valores -->
      <div class="ol-about-values">
        <div class="ol-about-value">
          <div class="ol-about-value-icon">
            <svg><!-- ícono --></svg>
          </div>
          <p class="ol-about-value-title">Título del valor</p>
          <p class="ol-about-value-desc">Descripción 1–2 líneas.</p>
        </div>
        <!-- × 4 valores total -->
      </div>

    </div>
  </div>
</section>
```

---

## Valores actuales

| # | Título | Descripción | Ícono |
|---|--------|-------------|-------|
| 01 | Velocidad extrema | Sitios que cargan en menos de 1 segundo. Construidos con Astro y Next.js. | Rayo `M13 2L3 14h9l-1 8 10-12h-9l1-8z` |
| 02 | Sin intermediarios | Hablas directamente con quien construye tu sitio. Un responsable técnico por proyecto. | Personas `path d="M17 21v-2a4 4 0 00-4-4H5..."` |
| 03 | Proceso claro | 4 fases con entregables concretos. Sin sorpresas. | Check `M9 11l3 3L22 4` |
| 04 | Resultados primero | Cada decisión se toma con el objetivo del negocio en mente. | Tendencia `M22 7 13.5 15.5 8.5 10.5 2 17` |

---

## CSS

```css
/* Contenedor de sección */
.ol-about {
  background: #04040A;
  padding: 6rem 0;
  position: relative;
}
.ol-about::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
}
.ol-about-inner {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
}

/* Grid principal */
.ol-about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
  margin-top: 4rem;
}
@media (max-width: 900px) {
  .ol-about-grid { grid-template-columns: 1fr; gap: 3rem; }
}

/* Narrativa */
.ol-about-narrative {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.ol-about-p {
  font-size: 1.0625rem;
  color: rgba(240,240,245,0.6);
  line-height: 1.8;
  margin: 0;
}
.ol-about-p strong {
  color: rgba(240,240,245,0.88);
  font-weight: 600;
}

/* Firma */
.ol-about-signature {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(255,255,255,0.07);
  margin-top: 0.5rem;
}
.ol-about-sig-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
  border: 1px solid rgba(201,168,76,0.25);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 14px; font-weight: 800;
  color: #C9A84C; letter-spacing: -0.03em;
}
.ol-about-sig-name {
  font-size: 0.9375rem; font-weight: 600;
  color: #F0F0F5; margin: 0 0 0.2rem;
}
.ol-about-sig-role {
  font-size: 12.5px; color: rgba(240,240,245,0.38); margin: 0;
}

/* Grid de valores */
.ol-about-values {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
@media (max-width: 560px) {
  .ol-about-values { grid-template-columns: 1fr; }
}

/* Card de valor */
.ol-about-value {
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex; flex-direction: column;
  gap: 0.85rem;
  transition: border-color 0.3s;
}
.ol-about-value:hover { border-color: rgba(201,168,76,0.2); }
.ol-about-value-icon {
  width: 40px; height: 40px;
  border-radius: 8px;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.15);
  display: flex; align-items: center; justify-content: center;
  color: #C9A84C; flex-shrink: 0;
}
.ol-about-value-title {
  font-size: 1rem; font-weight: 700;
  color: #F0F0F5; margin: 0; letter-spacing: -0.015em;
}
.ol-about-value-desc {
  font-size: 13px; color: rgba(240,240,245,0.48);
  line-height: 1.65; margin: 0;
}
```

---

## Encabezado `ol-sh` de la sección

| Campo | Valor |
|-------|-------|
| Eyebrow | Nuestra historia |
| Título | Un estudio con<br>una sola obsesión. |
| Sub | Que los sitios que construimos funcionen de verdad — no solo que se vean bien en la presentación. |

---

## Reglas de copywriting

- **Narrativa (`ol-about-p`):** 4 párrafos de 1–3 líneas. Tono editorial, primera persona del plural. Énfasis con `<strong>` en términos clave (tecnologías, principios de trabajo).
- **Firma:** Siempre "Equipo OrigenLab" — no nombres individuales.
- **Valores:** Título en 2–3 palabras. Descripción en 1–2 líneas. Concreto, sin adjetivos vacíos.

---

## Mejoras pendientes

| Prioridad | Mejora |
|-----------|--------|
| 🟡 Media | Reemplazar avatar "OL" con foto real del equipo cuando esté disponible |
| 🟡 Media | Variante `ol-about--photo` con columna de imagen a toda altura (3-col en desktop) |
| 🟢 Baja | Sección de métricas numéricas (proyectos entregados, años, sectores) — solo con datos reales validados |
| 🟢 Baja | Hover sutil en cada `ol-about-value` con mini-brillo dorado radial |

---

## Ver también

- [[26 — Layout L2 — Nosotros (nosotros⁄index.html)]]
- [[05 — Patrón Section Header 2 columnas (ol-sh)]]
- [[11 — Por qué OrigenLab (Why)]] — sección equivalente en L1
- [[01 — Design Tokens]]
