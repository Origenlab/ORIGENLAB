# OrigenLab — Sistema de Diseño
> Documentación completa del sitio origenlab.com · Actualizado 2026-06-02

## Mapa de notas

### 🎨 Fundamentos
- [[01 — Design Tokens]] — Variables CSS, colores, tipografía, espaciado
- [[02 — Tipografía]] — Escala de texto y jerarquía

### 🧱 Componentes Globales
- [[03 — Topbar]] — Barra superior fija con contacto y WhatsApp
- [[04 — Header y Navegación]] — Header fijo, nav desktop, dropdown, hamburger, panel móvil

### 📐 Layout y Patrones
- [[05 — Patrón Section Header 2 columnas (ol-sh)]] — El bloque reutilizable de encabezado de sección
- [[06 — Patrón Eyebrow + Título + Sub]] — Anatomía del título de sección

### 🏠 L1 — Index (`index.html`)
- [[07 — Hero]] — Sección principal arriba del fold (88vh, Astro override)
- [[08 — Quick Nav Bar]] — Barra de navegación rápida de 7 celdas (top con íconos / bottom sin íconos)
- [[09 — CTA Bar]] — Banda de conversión con badges y botones
- [[10 — Servicios]] — Grid de 4 tarjetas de servicio
- [[11 — Por qué OrigenLab (Why)]] — Grid de 4 diferenciales
- [[12 — Proceso]] — 4 pasos horizontales con línea conectora
- [[13 — Testimonios]] — Grid de tarjetas de clientes
- [[14 — FAQ]] — Acordeón de preguntas + formulario WhatsApp ← también en L2
- [[15 — CTA Final]] — Llamada a la acción centrada al fondo
- [[16 — Footer]] — Footer premium de 3 franjas

### 📄 L2 — Subpáginas (componentes compartidos)
- [[21 — Page Hero de Subpágina (ol-page-hero)]] — Hero 2 columnas para páginas L2+
- [[22 — Showcase de Servicios (ol-showcase)]] — Bloques imagen+info 2 columnas (variantes: servicios y portafolio)

### 📄 L2 — Layouts por página
- [[23 — Layout L2 — Servicios (servicios⁄index.html)]] — Estructura completa · referencia base para todas las L2
- [[24 — Layout L2 — Portafolio (portafolio⁄index.html)]] — Estructura completa · variantes: ol-proj-grid + showcase con imágenes reales
- [[26 — Layout L2 — Nosotros (nosotros⁄index.html)]] — Estructura completa · ol-about (nuevo) + ol-why + ol-process + ol-testimonials
- [[28 — Layout L2 — Blog (blog⁄index.html)]] — Estructura completa · layout 2 col con sidebar sticky · sistema de filtros por categoría

### 📄 L4 — Caso de estudio individual
- [[33 — Layout L4 — Caso de Estudio (portafolio⁄[sector]⁄[cliente]⁄index.html)]] — Plantilla L4 · base: gama-de-mexico · referencia profesional: bombero-mx · case-shell sidebar + 10 secciones fijas + acento por caso
- [[34 — L4 Casos en operación · Roster y enlaces]] — Roster de los 6 casos del sector contra incendios · cadena de navegación · convención de imágenes · variantes por modelo de negocio
- [[35 — Playbook · Construir un nuevo vertical (sector + casos L4)]] — Receta paso a paso para añadir un sector completo con N casos al portafolio · reproducible
- [[36 — Auditoría y QA Checklist L4]] — Checklist mecánico de validación · script Python de auditoría · métricas de salud · patrones de búsqueda
- [[38 — Sistema de maquetas .mk + Workflow caso L4 cliente]] — Ilustrar el caso con maquetas fieles del sitio (`.mk`) sin capturas reales · workflow completo · acentos · interlinking · límite de captura de imágenes
- [[42 — Fotos reales en casos L4 Seguridad Privada]] — Foto real (stock del usuario) en `#contexto` + `#resultado` + OG, conviviendo con las `.mk` · AVIF/WebP, nombres+alt SEO · mapeo tema→caso · galería `.mk` intacta · **aplicado a Seguridad Privada (5) y Equipos Contra Incendios (6)**

### 📦 Componentes Reutilizables
- [[17 — Tarjeta de Servicio (ol-svc-card)]] — Card de servicio con imagen, descripción y CTA (L1 y L2)
- [[18 — Tarjeta de Testimonio (ol-tc)]] — Card de reseña de cliente
- [[19 — Botones]] — Variantes de botones globales
- [[25 — Tarjeta de Proyecto (ol-proj-card)]] — Card de portafolio con thumbnail, badge, tags y link
- [[27 — Sección Manifiesto (ol-about)]] — Bloque 2 columnas exclusivo de nosotros: narrativa + grid de valores

### 📁 Estructura de Archivos
- [[20 — Estructura de Archivos y Páginas]] — Árbol de archivos, rutas, stack tecnológico

### 🚀 Deploy
- [[41 — Deploy origenlab.com vía Cloudflare Pages (2026-06-02)]] — **PIPELINE VIGENTE** · origenlab.com servido por Cloudflare Pages (proyecto `origenlab` ← `Origenlab/ORIGENLAB`) · push a `main` auto-publica · resuelve el desajuste de repo/dominio · cada sector cliente = su propio repo+proyecto Pages
- [[29 — Deploy & GitHub Push (2026-04-21)]] — Primer push a `github.com/Origenlab/ORIGENLAB` con sitio Astro · commit `c6f0d20` · script `_push-github.sh` (histórico, preview solamente)
- [[31 — Deploy origenlab.com (Frankoropeza repo)]] — ⚠️ **HISTÓRICO** · GitHub Pages en `Frankoropeza/origenlab` · superado por [[41]] (el dominio ya no se sirve desde ahí)
- [[32 — Playbook — Nuevo sitio en GH Pages + Cloudflare]] — Receta genérica para futuros dominios (histórico GH Pages) · checklist, errores comunes, multi-cuenta en macOS

### 🔎 Auditorías
- [[43 — Auditoría de imágenes (uso · huérfanas · plan de integración)]] — 291 imágenes: 149 en uso, 142 huérfanas (32 stock real aprovechable + ~110 legacy a limpiar) · 85/96 artículos sin imagen destacada · mapeo foto→artículo

### 🕸️ Knowledge Graph
- [[30 — Graph Snapshot (2026-04-21)]] — ORIGENLAB con semántica: **180 nodos · 255 edges · 32 comunidades** + Master graph (9 proyectos, AST): 681 nodos · 1,326 edges. Hook inyectado en `_push-github.sh` + script `_graphify-rebuild.sh`.

---

## Estado de páginas

| Página | Nivel | Estado | Doc |
|--------|-------|--------|-----|
| `index.html` | L1 | ✅ Completo | — |
| `servicios/index.html` | L2 | ✅ Completo | [[23]] |
| `portafolio/index.html` | L2 | ✅ Completo | [[24]] |
| `nosotros/index.html` | L2 | ✅ Completo | [[26]] |
| `contacto/index.html` | L2 | 🔜 Pendiente | — |
| `cotizar/index.html` | L2 | 🔜 Pendiente | — |
| `blog/index.html` | L2 | ✅ Completo | [[28]] |
| `servicios/desarrollo-web/` | L3 | 🔜 Pendiente | — |
| `servicios/tiendas-en-linea/` | L3 | 🔜 Pendiente | — |
| `servicios/landing-pages/` | L3 | 🔜 Pendiente | — |
| `servicios/rediseno-web/` | L3 | 🔜 Pendiente | — |

---

## Mejoras transversales identificadas

| Prioridad | Área | Descripción |
|-----------|------|-------------|
| 🔴 Alta | Portafolio | Imágenes reales para Gama de México y Eventech |
| 🟡 Media | Page Hero L2 | Evaluar `align-items: center` como estándar para todas las L2 (actualmente solo portafolio) |
| 🟡 Media | ol-showcase | Formalizar variante "con imagen real + reverse" como patrón documentado |
| 🟡 Media | Portafolio | Filtros JS por tipo de proyecto en `ol-proj-grid` |
| 🟢 Baja | Portafolio L3 | Páginas individuales de proyecto con caso de estudio completo |
| 🟢 Baja | Sistema global | Audit de consistencia: `align-items` en todos los `ol-sh` y `ol-page-hero-grid` |

---

## Convenciones del sistema `ol-*`

| Regla | Valor |
|-------|-------|
| Prefijo de clases | `ol-` |
| Contenedor inner | `width: 90%; max-width: 1600px; margin: 0 auto` |
| Padding de secciones | `6rem 0` (estándar) · `5rem 0 6rem` (showcase) · `7rem 0` (CTA final) |
| Fondo base | `#08080E` |
| Fondo alt | `#0D0D16` |
| Fondo dark | `#04040A` |
| Fondo card | `#0C0C18` |
| Acento oro | `#C9A84C` |
| CSS location | `<style>` inline en cada subpágina — nunca en `premium-dark.css` |
| FAQ prefijos | L2 servicios: `s` · L2 portafolio: `p` · L2 nosotros: `n` · etc. |

---

> **Regla de oro:** No mencionar SEO en ninguna parte del sitio. El foco es diseño, velocidad y conversión.
