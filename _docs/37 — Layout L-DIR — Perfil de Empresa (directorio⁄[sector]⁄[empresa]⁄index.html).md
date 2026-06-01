# 37 — Layout L-DIR — Perfil de Empresa en Directorio

> **Ruta:** `/portafolio/[sector]/directorio/[empresa]/index.html`  
> **Página piloto:** `/portafolio/equipos-contra-incendios/directorio/equipos-y-servicios-mf/index.html`  
> **Propósito:** Perfil público de una empresa del sector que aún no tiene sitio web. Visibiliza la empresa, documenta su reputación y abre la conversación sobre presencia digital con OrigenLab como CTA.

---

## 1. Anatomy (secuencia exacta)

```
<head>              CSS vars + ol-prof-* inline styles + JSON-LD
<topbar>            Estándar OrigenLab
<header>            Estándar con nav activo en "Portafolio"
<mobile nav>        Estándar — incluir sublink al directorio del sector
<ol-bc-wrap>        5 niveles: Inicio > Portafolio > [Sector] > Directorio > [Empresa]
<hero>              Perfil — badges + 2 columnas
<ol-case-shell>     Sidebar + Content (igual que L4)
  <sidebar>
    datos verificados   ol-side-card (ol-side-gap-badge + ol-side-meta)
    potencial digital   ol-side-card (ol-side-score × 4)
    servicios           ol-side-card (ol-case-spec-tag)
    índice              ol-side-card (ol-side-toc × 6 items)
    CTA                 ol-side-cta (WhatsApp + /cotizar/)
  <ol-case-body>
    01 La empresa       ol-case-section + ol-prof-stats + ol-prof-alert
    02 Servicios        ol-case-section + ol-case-cards (4 cards)
    03 Zona             ol-case-section + ol-prof-info-grid (4 cells)
    04 Brecha digital   ol-case-section + ol-prof-alert + ol-case-cards (4 cards)
    05 Qué ganaría      ol-case-section + ol-prof-steps (5 steps)
    06 Cómo OrigenLab   ol-case-section + ol-case-arch (6 fases)
<ol-cta-hero-card>  Personalizado con nombre empresa
<ol-case-next>      2 cards: ← Directorio completo + Portafolio del sector →
<footer>            Estándar
```

---

## 2. CSS variables por empresa

```css
:root {
  --case-accent:       #C0392B;              /* color del sector/empresa */
  --case-accent-soft:  rgba(192,57,43,0.12);
  --case-accent-line:  rgba(192,57,43,0.28);
}
.hero {
  --hero-accent:      var(--case-accent);
  --hero-accent-soft: var(--case-accent-soft);
  --hero-accent-line: var(--case-accent-line);
}
.hero::before {
  background: radial-gradient(ellipse at center, rgba(192,57,43,0.08) 0%, transparent 65%);
}
```

Cambiar los valores RGBA para que coincidan con el color elegido.  
Sector equipos-contra-incendios usa `#C0392B` como acento de sector (igual que Gama).

---

## 3. Clases `ol-prof-*` — inline en cada página (aún no en premium-dark.css)

Estas clases deben copiarse del piloto a cada nueva página hasta que se extraigan al CSS compartido:

| Clase | Descripción |
|-------|-------------|
| `.ol-prof-badges` | Fila de badges en el hero (flex, gap .5rem) |
| `.ol-prof-badge` | Badge base (display:inline-flex, uppercase, font-size .72rem) |
| `.ol-prof-badge--maps` | Verde Google Maps verificado |
| `.ol-prof-badge--noweb` | Rojo "Sin sitio web propio" |
| `.ol-prof-badge--rating` | Amarillo estrellas |
| `.ol-prof-badge--zone` | Gris neutral zona geográfica |
| `.ol-prof-alert` | Alerta de oportunidad (borde izquierdo accent, padding 1.25rem) |
| `.ol-prof-alert-icon` | Ícono izquierdo del alert |
| `.ol-prof-alert-body` | Contenido textual del alert |
| `.ol-prof-alert-title` | Label uppercase del alert (color accent) |
| `.ol-prof-alert-text` | Párrafo del alert (.92rem, opacity .72) |
| `.ol-prof-stats` | Grid 3 columnas de stats numéricos (estilo zebra) |
| `.ol-prof-stat` | Celda de stat |
| `.ol-prof-stat-num` | Número grande (1.75rem, bold) — `<span>` toma color accent |
| `.ol-prof-stat-label` | Label del stat (.72rem, uppercase, opacity .45) |
| `.ol-prof-info-grid` | Grid 2×2 de datos de la empresa |
| `.ol-prof-info-item` | Celda de dato (border sutil, padding 1rem) |
| `.ol-prof-info-label` | Label del dato (.68rem, uppercase, opacity .35) |
| `.ol-prof-info-value` | Valor del dato (.9rem) |
| `.ol-prof-steps` | Lista vertical de oportunidades numeradas |
| `.ol-prof-step` | Item con número circular + contenido |
| `.ol-prof-step-num` | Círculo numerado (2rem, color accent, border accent-line) |
| `.ol-prof-step-content` | Texto del step (h4 + p) |
| `.ol-side-gap-badge` | Badge "Sin sitio web" en sidebar (rojo, inline-flex) |
| `.ol-side-score` | Wrapper de barra de puntaje digital |
| `.ol-side-score-label` | Label + valor fuerte en fila (justify-between) |
| `.ol-side-score-bar` | Contenedor de la barra (5px alto, bg sutil) |
| `.ol-side-score-fill` | Relleno de la barra (background: var(--case-accent)) |

> **Nota:** Competencia digital usa `background:rgba(255,255,255,0.2)` en el fill (barra apagada = baja amenaza).

---

## 4. Estructura del hero

```html
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__col1">
      <span class="hero__eyebrow">Perfil de empresa · Directorio · [Zona]</span>
      <h1 class="hero__title">[Nombre<br>Empresa]</h1>
      <p class="hero__sub">[Descripción corta — qué hace, dónde, con qué reputación]</p>
      <div class="ol-prof-badges">
        <!-- badge rating -->
        <!-- badge maps verificado (si aplica) -->
        <!-- badge noweb (si no tiene web) -->
        <!-- badge zone -->
      </div>
    </div>
    <div class="hero__col2">
      <p class="hero__p1">[Párrafo 1 — quiénes son, años, contexto]</p>
      <p class="hero__p2">Este perfil fue elaborado por OrigenLab como parte del
        <a href="/portafolio/[sector]/directorio/">Directorio de [sector] en México</a>.
        [Propósito del directorio]</p>
    </div>
  </div>
</section>
```

---

## 5. Secciones del cuerpo — contenido por tipo de empresa

### 01 — La empresa
- 2 párrafos de contexto
- `ol-prof-stats`: rating / # reseñas / zona (o variantes según datos disponibles)
- `ol-prof-alert` con título "Sin sitio web propio" y texto explicando el gap

### 02 — Servicios y especialidad
- 2 párrafos sobre el core del negocio y sus clientes típicos
- 4 `ol-case-card` con servicios específicos (ícono SVG + h4 + p)

### 03 — Zona de operación
- 2 párrafos de contexto geográfico y densidad de demanda
- `ol-prof-info-grid`: Dirección / Teléfono / Zona de cobertura / Tipo de clientes

### 04 — La brecha digital
- 2 párrafos: reputación real vs. invisibilidad digital
- `ol-prof-alert` con título "Oportunidad perdida cada día"
- 4 `ol-case-card`: Invisible en búsquedas / Sin credencial / Competidores / Sin canal propio

### 05 — Qué ganaría con un sitio
- 1 párrafo introductorio
- 5 `ol-prof-step`: búsquedas locales / credencial corporativa / cotización directa / reputación amplificada / info 24h

### 06 — Cómo trabajaría OrigenLab
- 2 párrafos contextualizando experiencia de OrigenLab en el sector
- `ol-case-arch` con 6 fases (Descubrimiento / Arquitectura / Desarrollo / Contenido / Lanzamiento / Post-entrega)

---

## 6. Sidebar — contenido estándar

### Datos verificados
```html
<div class="ol-side-card">
  <p class="ol-side-eyebrow">Datos verificados</p>
  <div class="ol-side-gap-badge">...</div>  <!-- solo si sin web -->
  <ul class="ol-side-meta">
    <li><dt>Empresa</dt><dd>[Nombre]</dd></li>
    <li><dt>Alcaldía / Ciudad</dt><dd>[Ubicación]</dd></li>
    <li><dt>Dirección</dt><dd>[Dirección]</dd></li>
    <li><dt>Teléfono</dt><dd><a href="tel:+52...">## #### ####</a></dd></li>
    <li><dt>Zona</dt><dd>[Cobertura]</dd></li>
    <li><dt>Especialidad</dt><dd>[Servicios principales]</dd></li>
    <li><dt>Calificación</dt><dd>[X.X ★ (N reseñas Google Maps)]</dd></li>
    <li><dt>Fuente</dt><dd>Google Maps · verificado [año]</dd></li>
  </ul>
</div>
```

### Potencial digital
4 barras fijas (valores ajustados por empresa):
1. Reputación local (% según rating/reseñas)
2. Demanda del sector (% según volumen búsquedas del sector)
3. Competencia digital (% = baja = bien — barra apagada si <50%)
4. Brecha vs. competencia (Alta/Media — %)

### Índice
6 links fijos: `#empresa` `#servicios` `#operacion` `#brecha` `#oportunidad` `#proceso`

### CTA sidebar
```
¿Eres de [Empresa]?
Tu empresa tiene la reputación. Nosotros ponemos la presencia digital.
[Botón WhatsApp personalizado]
[Link /cotizar/]
```

WhatsApp URL encode: `hola@, soy de [Empresa] en [Ubicación] y me interesa...`

---

## 7. JSON-LD

4 nodos en `@graph`:

```json
[
  { "@type": "Organization", "@id": "https://origenlab.com/#organization", ... },
  { "@type": "WebSite", "@id": "https://origenlab.com/#website", ... },
  { "@type": "BreadcrumbList", "@id": "...#breadcrumbs",
    "itemListElement": [
      { pos:1, Inicio },
      { pos:2, Portafolio },
      { pos:3, [Sector] },
      { pos:4, Directorio },
      { pos:5, [Empresa] }
    ]
  },
  { "@type": "LocalBusiness", "@id": "...#business",
    "name": "[Empresa]",
    "description": "...",
    "address": { streetAddress, addressLocality, addressRegion, addressCountry },
    "telephone": "+52...",
    "aggregateRating": { ratingValue, reviewCount, bestRating: "5" },
    "areaServed": { "@type": "City", "name": "..." },
    "knowsAbout": ["servicio1", "servicio2", ...]
  }
]
```

---

## 8. CTA hero card — personalizado

```html
<section class="ol-cta-hero-card">
  <div class="ol-cta-hero-inner">
    <div class="ol-cta-hero-col1">
      <span class="ol-cta-hero-eyebrow">¿Eres de [Empresa]?</span>
      <h2 class="ol-cta-hero-title">Tu empresa tiene la reputación.<br>Pongámosla en línea.</h2>
      <p class="ol-cta-hero-sub">[Rating] en Google Maps es una base sólida. Un sitio web profesional la convierte en captación activa...</p>
    </div>
    <div class="ol-cta-hero-col2">
      <div class="ol-cta-hero-actions">
        <a href="https://wa.me/525547868402?text=[encode]" class="ol-btn-primary">Escribir por WhatsApp →</a>
        <a href="/cotizar/" class="ol-btn-ghost">Cotizar mi proyecto →</a>
      </div>
      <p class="ol-cta-hero-note">Sin compromiso · Respuesta el mismo día · Atención personalizada</p>
    </div>
  </div>
</section>
```

---

## 9. Case next — navegación de cierre

```html
<section class="ol-case-next">
  <div class="ol-case-next-inner">
    <a href="/portafolio/[sector]/directorio/" class="ol-case-next-card">
      <p class="ol-case-next-eyebrow">← Directorio completo</p>
      <p class="ol-case-next-title">Ver todas las empresas de [sector] en México</p>
      <span class="ol-case-next-link">Ver directorio →</span>
    </a>
    <a href="/portafolio/[sector]/" class="ol-case-next-card">
      <p class="ol-case-next-eyebrow">Portafolio del sector →</p>
      <p class="ol-case-next-title">[Sector] · Casos de estudio desarrollados por OrigenLab</p>
      <span class="ol-case-next-link">Ver portafolio →</span>
    </a>
  </div>
</section>
```

---

## 10. Checklist de nueva empresa

- [ ] Copiar piloto `equipos-y-servicios-mf/index.html`
- [ ] Ajustar `--case-accent` y valores RGBA en el `<style>`
- [ ] Actualizar `<title>`, `<meta name="description">`, OG tags
- [ ] Actualizar `<link rel="canonical">`
- [ ] Actualizar JSON-LD (BreadcrumbList pos 5 + LocalBusiness completo)
- [ ] Actualizar breadcrumb HTML (5 niveles, pos 5 = empresa)
- [ ] Hero: eyebrow, h1, sub, badges (rating, maps, noweb/web, zone)
- [ ] Hero col2: párrafos de presentación
- [ ] Sidebar: ol-side-meta datos reales
- [ ] Sidebar: ol-side-score barras calibradas
- [ ] Sidebar: ol-case-spec-tag servicios reales
- [ ] Sidebar: ol-side-toc (6 links fijos — no cambiar IDs)
- [ ] Sidebar: ol-side-cta con nombre empresa + WA encode personalizado
- [ ] Sección 01: párrafos + stats reales + alert personalizado
- [ ] Sección 02: párrafos + 4 cards de servicios reales
- [ ] Sección 03: párrafos + info-grid con datos reales
- [ ] Sección 04: párrafos + alert + 4 cards de brecha
- [ ] Sección 05: párrafo + 5 steps (ajustar al sector si aplica)
- [ ] Sección 06: párrafos contextualizando + 6 fases (fijas)
- [ ] CTA hero card: eyebrow, h2, sub, WA encode personalizado
- [ ] Case next: links correctos al directorio y portafolio del sector
- [ ] Añadir a `sitemap.xml`
- [ ] Verificar en local antes de push

---

## 11. Variables por empresa (registro)

| Empresa | Slug | Acento | Rating | Reseñas | Ciudad | Tiene web |
|---------|------|--------|--------|---------|--------|-----------|
| Equipos y Servicios MF | `equipos-y-servicios-mf` | `#C0392B` | 4.8 | 13 | GAM, CDMX | No |

> Agregar una fila por empresa que se añada al directorio.
