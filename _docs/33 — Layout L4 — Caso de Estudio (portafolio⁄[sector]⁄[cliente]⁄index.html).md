# 33 — Layout L4 — Caso de Estudio (`portafolio/[sector]/[cliente]/index.html`)

> Plantilla **L4** — página individual de caso de estudio por cliente, anidada en su sector.
> **Referencia base:** `portafolio/equipos-contra-incendios/gama-de-mexico/index.html`
> **Referencia profesional (más completa):** `portafolio/equipos-contra-incendios/bombero-mx/index.html`
> Hereda de `premium-dark.css` + `BaseLayout` + `ol-header.js`. Estilos específicos del caso van **inline** en `<style>` dentro del `<head>`.
> Última actualización: 2026-04-26

---

## Ruta y vecindad

```
portafolio/
└─ equipos-contra-incendios/        ← L3 sector
   ├─ gama-de-mexico/index.html     ← L4 LIVE · referencia base
   ├─ meseci/index.html             ← L4 LIVE
   ├─ lga-contraincendios/index.html← L4 LIVE
   ├─ manext/index.html             ← L4 LIVE (2026-04-26)
   ├─ bombero-mx/index.html         ← L4 LIVE (2026-04-26) · referencia profesional
   └─ proyectored/index.html        ← L4 LIVE (parcial)
```

Profundidad: 3 niveles bajo raíz → todos los assets globales se referencian con `../../../`.

---

## Estructura macro (orden vertical)

| # | Bloque | Componente | Notas |
|---|--------|-----------|-------|
| 01 | Skip-link | `.ol-skip-link` | A11y, oculto hasta foco |
| 02 | Topbar | `.ol-topbar` | Email · separador · teléfono · promo · WhatsApp |
| 03 | Header | `.ol-header` | Logo + nav desktop + dropdown con sub-drop · CTA Cotizar · hamburger |
| 04 | Mobile overlay + panel | `.ol-mobile-overlay`, `.ol-mobile-panel` | Submenús colapsables `data-submenu` |
| 05 | Breadcrumb | `.ol-bc-wrap` | 4 niveles: Inicio › Portafolio › Sector › Cliente |
| 06 | **Hero** | `.hero` (compartido) | Override de acento por caso vía `--hero-accent` |
| 06.5 | **Perfil de empresa** | `.ol-co` | **Bloque centrado en el CLIENTE** (empresa primero): head, stats, split qué/cómo, líneas/servicios, por qué elegir, banda de respaldo/marca. Va entre hero y case shell. Usa `--case-accent`. Seguido de `.ol-co-divider` que reencuadra el caso como bloque secundario "Detrás del sitio". Live en los 9 casos L4 (incendios + seguridad privada) desde 2026-06-01. |
| 07 | **Case Shell** | `.ol-case-shell` | **Layout 2 columnas: contenido + sidebar sticky** |
| 08 | CTA hero del caso | `.ol-cta-hero` | Card grande 2 col: pitch + promesas |
| 09 | FAQ + WhatsApp form | `.ol-faq-section` | Bloque universal con form que abre `wa.me` |
| 10 | Next case nav | `.ol-case-next` | 2 cards: **caso anterior/siguiente + volver al sector** |
| 11 | Quicknav bottom | `.ol-quicknav` | 7 celdas con CTA al final |
| 12 | Footer | `.ol-footer` | Tagline · contactos · 4 columnas · legal |
| 13 | WA bubble | `.wa-bubble` | Flotante esquina inferior derecha |
| 14 | Scripts | inline | Menú móvil, scroll header, TOC activo, smooth scroll |

---

## Sistema de tokens del caso (override de acento)

Cada caso define su acento de marca en `:root` y reescribe el hero:

```css
:root {
  --case-accent: #B91C1C;                          /* BOMBERO.MX: crimson */
  --case-accent-soft: rgba(185,28,28,0.12);
  --case-accent-line: rgba(185,28,28,0.28);
}
.hero { --hero-accent: var(--case-accent); --hero-accent-soft: var(--case-accent-soft); --hero-accent-line: var(--case-accent-line); }
.hero::before { background: radial-gradient(ellipse at center, rgba(185,28,28,0.08) 0%, transparent 65%); }
```

**Tabla de acentos por caso (sector contra incendios):**

| Caso | Acento | Hex | Slug | Estado |
|------|--------|-----|------|--------|
| Gama de México | Rojo industrial | `#C0392B` | `gama-de-mexico` | ✅ LIVE |
| MESECI | Naranja técnico | `#E67E22` | `meseci` | ✅ LIVE |
| LGA Contraincendios | Rojo encendido | `#DC2626` | `lga-contraincendios` | ✅ LIVE |
| MANEXT | Ámbar industrial | `#B45309` | `manext` | ✅ LIVE 2026-04-26 |
| BOMBERO.MX | Crimson institucional | `#B91C1C` | `bombero-mx` | ✅ LIVE 2026-04-26 |
| Proyecto Red | Vino institucional | `#7F1D1D` | `proyectored` | ✅ LIVE (parcial) |

> Los acentos coinciden con los `--proj-accent` ya usados en las cards del L3 (`portafolio/equipos-contra-incendios/index.html`) — mantener sincronizado al añadir un caso nuevo.

---

## Anatomía del Hero (`.hero`)

```html
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__col1">
      <span class="hero__eyebrow">Caso de estudio · [vertical]</span>
      <h1 class="hero__title">[Cliente]<br>[Promesa en 2-3 lineas].</h1>
      <p class="hero__sub">[Una linea con marca/normas/cobertura].</p>
      <div class="hero__ctas">
        <a class="ol-btn-primary">Visitar el sitio</a>
        <a class="ol-btn-ghost" href="#construccion">Cómo se construyó</a>
      </div>
    </div>
    <div class="hero__col2">
      <p class="hero__p1">Plataforma comercial...</p>
      <p class="hero__p2">Arquitectura de contenidos...</p>
    </div>
  </div>
</section>
```

Botones del caso (`.ol-btn-primary`, `.ol-btn-ghost`) reusan el acento del caso vía `var(--case-accent)`.

---

## Case Shell — el corazón del L4

```
.ol-case-shell
└─ .ol-case-inner (90% / max 1600px)
   └─ .ol-case-grid  (1fr 320px @ ≥1080px → 1 col móvil)
      ├─ <article class="ol-case-body">  ← grid-column 1
      │     10 secciones .ol-case-section con scroll-margin-top:110px
      └─ <aside class="ol-case-sidebar"> ← grid-column 2, sticky top:110px
            ├─ .ol-side-card  · Datos del proyecto (dl)
            ├─ .ol-side-card  · Stack y entregables (.ol-case-spec-tag chips)
            ├─ .ol-side-card  · Índice del caso (.ol-side-toc con .num)
            └─ .ol-side-cta   · CTA gradiente con botón + link WhatsApp
```

### Las 10 secciones del body (orden fijo)

| # | id | Eyebrow | Bloque visual interno |
|---|----|---------|----------------------|
| 01 | `#contexto` | 01 · Contexto del cliente | `.ol-case-lead` + figura |
| 02 | `#reto` | 02 · El reto | Grid `.ol-case-cards` (4 cards con `.icon`) |
| 03 | `#arquitectura` | 03 · Arquitectura del sitio | `.ol-case-arch` (6–7 capas) + figura |
| 04 | `#diseno` | 04 · Diseño y sistema visual | `.ol-case-cards` (4) + figura |
| 05 | `#catalogo` / `#servicios` | 05 · Catálogo técnico | Cards de familias + `.ol-case-list` + figura |
| 06 | `#conversion` | 06 · Conversión B2B | `.ol-case-cards` (4 canales diferenciados) |
| 07 | `#tecnologia` | 07 · Tecnología y rendimiento | `.ol-case-spec` (dl tabla) + figura |
| 08 | `#proceso` | 08 · Proceso de trabajo | `.ol-case-arch` (6–7 fases) |
| 09 | `#galeria` | 09 · Galería del sitio | `.ol-case-gallery` (2×3 + 1 full) |
| 10 | `#resultado` | 10 · Resultado entregado | `.ol-case-list` (bullets check) |

> El TOC del sidebar lista los **10 IDs** y el script de la página activa el item visible al hacer scroll.

### Variantes de la sección 05 según el modelo de negocio

| Modelo | id sugerido | Estructura interna |
|--------|------------|--------------------|
| Distribuidor de marca única | `#catalogo` | `.ol-case-list` con familias del fabricante |
| Distribuidor multi-marca | `#catalogo` | Cards de familias (4–6) + `.ol-case-list` con plantilla de ficha |
| Servicios técnicos | `#servicios` | `.ol-case-list` con servicios + normativa por servicio |
| Integrador de sistemas | `#proyectos` | Cards de líneas de proyecto + galería |

### Variantes de la sección 03 (arquitectura)

| Modelo | Capas |
|--------|-------|
| Distribuidor | 01 Home · 02 Familias · 03 Marcas · 04 Ficha · 05 Quiénes somos · 06 Cobertura · 07 Contacto |
| Servicios | 01 Home · 02 Servicios · 03 Ficha · 04 Quiénes somos · 05 Cobertura · 06 Programa anual · 07 Contacto |
| Integrador | 01 Home · 02 Líneas · 03 Caso · 04 Quiénes somos · 05 Cobertura · 06 Contacto |

---

## Componentes específicos del L4 (definidos inline en cada caso)

| Clase | Función |
|-------|---------|
| `.ol-case-eyebrow` | Píldora con borde y soft-bg, color `--case-accent` |
| `.ol-case-h2` | clamp(1.75rem, 3vw, 2.4rem) · 800 · letter-spacing -0.025em |
| `.ol-case-lead` | Párrafo destacado con `border-left: 2px solid --case-accent` |
| `.ol-case-cards` | Grid 2 col @ ≥720px · cards `#0C0C18` con icon cuadrado de acento |
| `.ol-case-list` | UL con check SVG inline en `::before`, soft-bg |
| `.ol-case-arch` | Grid 3 col · pasos numerados (`CAPA 0X` / `FASE 0X`) |
| `.ol-case-spec` | `<dl>` tabla 220px+1fr · `<code>` con tinte de acento |
| `.ol-case-spec-tag` | Chips en sidebar para stack & entregables |
| `.ol-case-figure` + `.ol-case-figure-frame` + `.ol-case-figure-caption` | Figuras estandarizadas |
| `.ol-case-gallery` | Grid 2 col para pantallas |
| `.ol-cta-hero-card` | Card final 2 col con gradiente diagonal y glow radial |
| `.ol-case-next` | 2 cards: caso anterior/siguiente + sector |

---

## Datos estructurados (JSON-LD)

Bloque único `application/ld+json` con `@graph`. **Patrón profesional** (referencia: BOMBERO.MX):

1. `Organization` — `@id` `https://origenlab.com/#organization` (OrigenLab)
2. `WebSite` — `@id` `https://origenlab.com/#website`
3. `BreadcrumbList` — **con `@id` propio**: `[url-canónica]#breadcrumbs`
4. `Organization` del cliente — `@id` `https://[dominio-cliente]/#organization` con:
    - `description`
    - `areaServed` (Country/State según corresponda)
    - `knowsAbout[]` con normas y categorías de producto/servicio
    - `brand[]` (sólo distribuidores) — array de `{ "@type": "Brand", "name": "..." }`
5. `CreativeWork` — `@id` `[url-canónica]#case`:
    - `headline`, `description`, `inLanguage`, `image`
    - `author`, `publisher` → referencia OrigenLab por `@id`
    - `about` → referencia al `Organization` del cliente por `@id` (no inline)
    - `keywords[]`

> **Mejora 2026-04-26**: introducir nodo `Organization` separado para el cliente con `brand[]` (distribuidores) o `areaServed` detallado (servicios). Esto enriquece el grafo Schema.org y permite a buscadores entender la relación marca-distribuidor.

---

## Accesibilidad (a11y)

- Skip-link `<a class="ol-skip-link" href="#main">` como primer elemento del `<body>`
- `aria-label` en `<nav>` principal, breadcrumb, sidebar y formulario
- **`aria-hidden="true" focusable="false"`** en TODOS los SVG decorativos (chevrons, íconos en cards, dot icons en listas, separadores de breadcrumb, íconos de WhatsApp/teléfono/email)
- `aria-current="page"` en breadcrumb actual
- `aria-expanded` en hamburger toggle
- Foco visible en todos los componentes interactivos (heredado de `premium-dark.css`)

> **Regla**: si el SVG transmite información (logo, ícono semántico de un control), tiene `aria-label` o título. Si es decoración (acompaña a texto que ya describe la acción), va con `aria-hidden="true" focusable="false"`.

---

## SEO técnico (no SEO de cara al cliente — sólo on-page)

- Canonical → URL absoluta `https://origenlab.com/portafolio/[sector]/[cliente]/`
- Open Graph + Twitter Card con `og:image` apuntando a `[cliente]-01.webp`
- `inLanguage: es-MX`
- Skip-link en primera línea de `<body>`
- BreadcrumbList JSON-LD con `@id` único por página

---

## Sidebar — datos mínimos por caso

```
Cliente · Sector · Tipo de sitio · Modelo de negocio
[Marca distribuida | Marcas distribuidas | Cumplimiento | Especialidad]
Cobertura
Sitio en vivo (link externo target=_blank rel=noopener)
```

> "Tipo de sitio" debe coincidir con el badge de la card del L3.

### Stack & entregables — chips estándar (plural consistente)

`Astro` · `HTML5 / CSS3` · `Inter` · `Schema.org` · `WhatsApp Lead` · **`Formularios B2B`** (siempre plural) · `Hosting CDN` · `Responsivo` · `[chip de modelo]` (Multi-marca / Multi-sucursal / Multi-servicio / Programa anual / Catálogo extenso / Cobertura nacional)

---

## Encadenamiento entre casos (`ol-case-next`)

Bloque al final del `<main>` que conecta con el caso anterior, el siguiente y el sector. **Patrón cadena**:

| Posición en cadena | Card 1 | Card 2 |
|--------------------|--------|--------|
| Primero (Gama) | Caso siguiente → MANEXT | Volver al sector |
| Intermedio (MANEXT) | ← Caso anterior: Gama | Caso siguiente → BOMBERO.MX |
| Último (BOMBERO.MX) | ← Caso anterior: MANEXT | Volver al sector |

> Cuando se añade un caso al sector, se actualizan los `ol-case-next` de los casos vecinos para mantener la cadena.

---

## Scripts inline (al final del `<main>`)

1. **Menú móvil** — abrir/cerrar overlay + panel + submenús `data-submenu`.
2. **Header scroll** — añade `.scrolled` cuando `pageYOffset > 10`.
3. **TOC activo** — recorre las 10 secciones, marca link según `offsetTop ≤ scrollY+140`.
4. **Smooth scroll** — para todos los `a[href^="#"]`, `replaceState` para no contaminar history.
5. **Form WhatsApp** (`#ol-wa-form`) — arma mensaje con `Hola OrigenLab, me contacto desde el caso de [cliente]...` y abre `wa.me/525547868402` en nueva pestaña.

---

## Reglas de oro del L4

1. **No animaciones** en cards, imágenes o figuras. Sólo botones (transition de hover).
2. **No precios, no plazos, no fechas comprometidas**. El sidebar nunca lleva fecha de entrega ni costo. Frases válidas: "calendario por escrito desde el inicio".
3. **No SEO** mencionado al usuario. Internamente: canonicals, schema, sitemap.
4. **Componentes compartidos primero**: `.hero`, `.ol-topbar`, `.ol-header`, `.ol-bc`, `.ol-quicknav`, `.ol-footer`, `.wa-bubble` vienen de `premium-dark.css`. Sólo lo específico del caso vive en el `<style>` inline.
5. **Acento por caso** vía `--case-accent` — nunca duplicar paleta. Sincronizar con `--proj-accent` del L3.
6. **CTA contextual** del caso debe coincidir con el WhatsApp text: `vi el caso de [Cliente] y me interesa un proyecto similar`.
7. **`aria-hidden="true" focusable="false"`** en SVG decorativos sin excepción.
8. **JSON-LD enriquecido** con `Organization` del cliente y `brand[]`/`areaServed` cuando aplica.
9. **Plural consistente** en chips: "Formularios B2B", nunca "Formulario B2B".
10. **Encadenar `ol-case-next`** al añadir un caso al sector.

---

## Casos en operación

| Caso | Estado | Acento | Modelo | Notas |
|------|--------|--------|--------|-------|
| Gama de México | ✅ LIVE | `#C0392B` | Distribuidor mono-marca | Elkhart Brass · UL/FM · CDMX/Querétaro/Bajío |
| MESECI | ✅ LIVE | `#E67E22` | Multi-línea | Catálogo extenso · NOM/NFPA · venta + instalación + mantenimiento |
| LGA Contraincendios | ✅ LIVE | `#DC2626` | E-commerce | Tienda en línea · Querétaro |
| MANEXT | ✅ LIVE | `#B45309` | Servicios técnicos | Recarga · prueba hidrostática · NOM-154/NOM-002 · CDMX/ZMVM |
| BOMBERO.MX | ✅ LIVE | `#B91C1C` | Distribuidor multi-marca | PPE bomberos · NFPA · MSA/Honeywell/Globe/Bullard · nacional |
| Proyecto Red | ✅ LIVE (parcial) | `#7F1D1D` | Integrador | Sistemas + instalación + mantenimiento |

> Cuando se levante un caso nuevo, copiar `bombero-mx/index.html` (referencia profesional) como base, swap del acento, swap de imágenes en `/img/equipos-contra-incendios/[slug]/` y reescribir las 10 secciones manteniendo orden, componentes y reglas de oro.
