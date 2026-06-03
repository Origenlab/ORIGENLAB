# Layout L2 — Nosotros (`nosotros/index.html`)

> Tercera página de nivel 2 del sitio. Presenta la identidad, valores y proceso de OrigenLab. Introduce el componente exclusivo `ol-about`. Homologada al sistema `ol-*`.

---

## Flujo completo de la página

```
┌─────────────────────────────────┐
│  ol-topbar                      │  ← Idéntico a portafolio/index.html
├─────────────────────────────────┤
│  ol-header                      │  ← "Nosotros" = active
├─────────────────────────────────┤
│  ol-mobile-overlay              │  ← Idéntico
│  ol-mobile-panel                │  ← "Nosotros" = active
├─────────────────────────────────┤
│  <main>                         │
│  ├── ol-page-hero               │  ← align-items: center (igual que portafolio)
│  ├── ol-quicknav (con íconos)   │  ← Igual al de portafolio (top)
│  ├── ol-about                   │  ← EXCLUSIVO: manifiesto + grid de valores
│  ├── ol-why                     │  ← Igual al L1 (4 ol-svc-card)
│  ├── ol-process                 │  ← Igual al L1 (4 pasos)
│  ├── ol-testimonials            │  ← Igual al L1 (8 testimonios)
│  ├── ol-faq-section             │  ← FAQ nosotros (8 preguntas, IDs prefijo "n")
│  └── ol-quicknav (sin íconos)   │  ← Bottom nav
├─────────────────────────────────┤
│  ol-footer                      │  ← Idéntico a portafolio/index.html
├─────────────────────────────────┤
│  WA bubble                      │
│  JS (header + mobile + faq)     │
└─────────────────────────────────┘
```

---

## Secciones y su documentación

| Sección | Clase | Doc | Fondo |
|---------|-------|-----|-------|
| Page Hero | `ol-page-hero` | [[21 — Page Hero de Subpágina (ol-page-hero)]] | `#08080E` |
| Quick Nav (top) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |
| Manifiesto | `ol-about` | [[27 — Sección Manifiesto (ol-about)]] | `#04040A` |
| ¿Por qué OrigenLab? | `ol-why` | (premium-dark.css — idéntico a L1) | `#08080E` |
| Proceso | `ol-process` | (premium-dark.css — idéntico a L1) | `#04040A` |
| Testimonios | `ol-testimonials` | (premium-dark.css — idéntico a L1) | `#08080E` |
| FAQ + Form | `ol-faq-section` | [[14 — FAQ]] | `#0D0D16` |
| Quick Nav (bottom) | `ol-quicknav` | [[08 — Quick Nav Bar]] | `#0C0C18` |

---

## Alternancia de fondos

| Sección | Fondo |
|---------|-------|
| Page Hero | `#08080E` |
| Quick Nav top | `#0C0C18` |
| ol-about | `#04040A` ← más oscuro |
| ol-why | `#08080E` |
| ol-process | `#04040A` ← más oscuro |
| ol-testimonials | `#08080E` |
| FAQ | `#0D0D16` |
| Quick Nav bottom | `#0C0C18` |
| Footer | `#0F0C07` |

---

## Diferencias clave vs. otras L2

| Aspecto | servicios | portafolio | nosotros |
|---------|-----------|------------|---------|
| Nav active | Servicios | Portafolio | Nosotros |
| Hero `align-items` | `start` | `center` | `center` |
| Sección central única | `ol-servicios-page` | `ol-portfolio-section` | `ol-about` (nuevo) |
| Secciones de contenido | Showcase | Showcase + proj-grid | About + Why + Process + Testimonials |
| FAQ IDs | Prefijo `s` | Prefijo `p` | Prefijo `n` |

---

## Page Hero — valores nosotros

```html
<span class="ol-eyebrow">Quiénes somos</span>
<h1 class="ol-page-hero-title">Construimos sitios web<br>que trabajan por ti.</h1>
<p class="ol-page-hero-sub">Somos OrigenLab: un estudio de desarrollo web con sede en Ciudad de México,
especializado en crear sitios rápidos, modernos y orientados a resultados reales para empresas mexicanas.</p>
```

CSS igual que portafolio:
```css
.ol-page-hero-grid { align-items: center; }
```

---

## ol-about — Sección manifiesto

La sección exclusiva de nosotros tiene dos mitades:

### Izquierda — narrativa editorial
4 párrafos que presentan la misión, modelo de trabajo, stack tecnológico y compromiso post-entrega. Finaliza con un bloque de firma (`ol-about-signature`) con avatar de iniciales "OL".

### Derecha — grid de valores (2×2)
Cuatro tarjetas `ol-about-value` con ícono SVG, título y descripción corta:

| # | Título | Ícono tema |
|---|--------|------------|
| 01 | Velocidad extrema | Rayo |
| 02 | Sin intermediarios | Personas |
| 03 | Proceso claro | Check/Clipboard |
| 04 | Resultados primero | Tendencia ascendente |

Ver CSS completo en [[27 — Sección Manifiesto (ol-about)]].

---

## FAQ — Nosotros

IDs scoped a `#ol-faq-list-nos`. Prefijo de datos: `n0`–`n7`.

| ID | Pregunta |
|----|----------|
| n0 | ¿Dónde están ubicados? |
| n1 | ¿Cuántas personas trabajan en OrigenLab? |
| n2 | ¿Subcontratan parte del trabajo? |
| n3 | ¿Qué tecnologías dominan? |
| n4 | ¿Cuántos proyectos tienen activos al mismo tiempo? |
| n5 | ¿Han trabajado con mi industria o sector? |
| n6 | ¿Cómo es la comunicación durante el proyecto? |
| n7 | ¿Qué incluye el servicio después de la entrega? |

Formulario: `id="ol-wa-form-nos"`. Campos: `nos-nombre`, `nos-empresa`, `nos-tipo`, `nos-mensaje`.

Mensaje WhatsApp abre con: `"Hola OrigenLab, me contacto desde la página Nosotros."`

---

## CSS de la página

Todo el CSS vive en el `<style>` inline del `<head>`. No modifica `premium-dark.css`.

| Bloque `<style>` | Qué define |
|------------------|-----------|
| 1er `<style>` (head) | `ol-page-hero-*` + `ol-about` + `ol-about-grid` + `ol-about-narrative` + `ol-about-values` + `ol-about-value` + `ol-about-signature` |
| 2do `<style>` (dentro de `<main>`) | `ol-faq-section` + acordeón + formulario |

Secciones `ol-why`, `ol-process`, `ol-testimonials` vienen de `premium-dark.css` — sin CSS adicional.

---

## Regla de rutas

```
CSS:      ../_astro/BaseLayout.xeR8R953.css
          ../_astro/premium-dark.css
Imágenes: ../img/origenlab.webp
Links:    ../index.html
          ../servicios/index.html
          ../portafolio/index.html
          ../cotizar/index.html
          etc.
```

---

## Mejoras pendientes

| Prioridad | Mejora | Notas |
|-----------|--------|-------|
| 🟡 Media | Añadir foto/imagen real del equipo en ol-about | Reemplazar el avatar "OL" por imagen real cuando esté disponible |
| 🟡 Media | Crear variante `ol-about--with-photo` para equipo con imagen | Layout de 3 columnas o imagen a pantalla completa izquierda |
| 🟢 Baja | Añadir métricas numéricas de impacto (proyectos entregados, sectores, años) | Requiere datos validados — no inventar números |
| 🟢 Baja | Línea de tiempo visual del origen de la agencia | Componente nuevo `ol-timeline` |

---

## Ver también

- [[21 — Page Hero de Subpágina (ol-page-hero)]]
- [[27 — Sección Manifiesto (ol-about)]]
- [[08 — Quick Nav Bar]]
- [[14 — FAQ]]
- [[23 — Layout L2 — Servicios (servicios⁄index.html)]]
- [[24 — Layout L2 — Portafolio (portafolio⁄index.html)]]
- [[20 — Estructura de Archivos y Páginas]]
