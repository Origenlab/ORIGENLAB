# 35 — Playbook · Construir un nuevo vertical (sector + casos L4)

> Receta paso a paso para añadir un sector completo a `/portafolio/`. Reproducible. Después de ejecutar este playbook, el nuevo vertical estará al mismo nivel profesional que `equipos-contra-incendios/`.
> Última actualización: 2026-04-26

Lectura previa obligatoria: [[20 — Estructura de Archivos y Páginas]] · [[24 — Layout L2 — Portafolio (portafolio⁄index.html)]] · [[33 — Layout L4 — Caso de Estudio (portafolio⁄[sector]⁄[cliente]⁄index.html)]] · [[34 — L4 Casos en operación · Roster y enlaces]] · [[36 — Auditoría y QA Checklist L4]].

---

## Glosario

- **Sector** o **vertical**: agrupación temática (`equipos-contra-incendios`, `automotriz`, `sanitaria`, ...). Vive en `/portafolio/[sector]/index.html` (L3.5).
- **Caso L4**: cliente individual del sector. Vive en `/portafolio/[sector]/[slug]/index.html`.
- **Cadena**: orden lineal de los L4 dentro de un sector. Cada caso enlaza al anterior y siguiente en `.ol-case-next`.

---

## Paso 0 · Investigación previa al código

Antes de tocar HTML, definir:

| Dato | Ejemplo (sector contra incendios) |
|------|------------------------------------|
| Nombre del sector | Equipos Contra Incendios |
| Slug del sector (kebab-case) | `equipos-contra-incendios` |
| Casos por orden de cadena | Gama → MESECI → LGA → MANEXT → BOMBERO.MX → Proyecto Red |
| Modelo de cada caso | Distribuidor mono-marca · Multi-línea · E-commerce · Servicios técnicos · Distribuidor multi-marca · Integrador |
| Acento de cada caso (hex) | `#C0392B` · `#E67E22` · `#DC2626` · `#B45309` · `#B91C1C` · `#7F1D1D` |
| Sitio en vivo de cada cliente | gamademexico.com · meseci.com.mx · ... |
| Cobertura | CDMX · Bajío · Querétaro · ZMVM · Nacional · CDMX/EdoMéx |
| Cumplimiento normativo | UL/FM · NOM · NFPA · NOM-154/002 · NFPA 1971/1981/1855 · NOM/NFPA |

Documentar en una tabla de roster (ver paso 7). Sin esto, no avances.

---

## Paso 1 · Crear la página del sector (L3.5)

Copiar la página piloto:

```bash
cp -r portafolio/equipos-contra-incendios portafolio/[nuevo-sector]
```

Editar `portafolio/[nuevo-sector]/index.html`:

1. `<title>`, `<meta description>`, canonical, OG → al nuevo sector
2. Hero copy → al perfil del sector
3. JSON-LD `BreadcrumbList` → 3 niveles: Inicio › Portafolio › Sector
4. JSON-LD `CollectionPage` → al nuevo sector
5. Cards (`.ol-proj-card`) → 1 por caso L4 con `--proj-accent` específico
6. Showcase blocks (`.ol-showcase-block`) → 1 por caso con copy y CTA "Ver caso"
7. Testimonios → uno por caso, nombre envuelto en `<a>` interno con `border-bottom` color de acento (40% alpha)
8. Resto de la página (overview, tipos, FAQ, CTA-bar, footer) → adaptar copy si aplica

**Reglas duras a respetar:** no SEO, no precios, no plazos comprometidos, no animaciones excepto botones.

---

## Paso 2 · Crear los casos L4

Para cada caso del sector, copiar la **referencia profesional** (no la base):

```bash
cp -r portafolio/equipos-contra-incendios/bombero-mx portafolio/[sector]/[slug]
```

Editar `portafolio/[sector]/[slug]/index.html`:

### 2.1 · Header
- `<title>`, `<meta description>`, canonical, OG → al caso
- Imágenes → `/img/[sector]/[slug-img-folder]/[slug-img-folder]-01.webp` … `-07.webp` + `-hero.webp`

### 2.2 · Estilos inline
```css
:root {
  --case-accent: #XXX;
  --case-accent-soft: rgba(R,G,B,0.12);
  --case-accent-line: rgba(R,G,B,0.28);
}
.hero { --hero-accent: var(--case-accent); --hero-accent-soft: var(--case-accent-soft); --hero-accent-line: var(--case-accent-line); }
.hero::before { background: radial-gradient(ellipse at center, rgba(R,G,B,0.08) 0%, transparent 65%); }
```

Sincronizar el hex con el `--proj-accent` que la card del L3 usa para este caso.

### 2.3 · JSON-LD (5 nodos en `@graph`)

```json
{
  "@context":"https://schema.org",
  "@graph":[
    {"@type":"Organization","@id":"https://origenlab.com/#organization", ...OrigenLab},
    {"@type":"WebSite","@id":"https://origenlab.com/#website", ...},
    {"@type":"BreadcrumbList","@id":"[canonical]#breadcrumbs", ...},
    {"@type":"Organization","@id":"https://[dominio-cliente]/#organization",
      "name":"...",
      "url":"https://[dominio-cliente]/",
      "description":"...",
      "areaServed": {"@type":"Country|AdministrativeArea","name":"..."},
      "knowsAbout":[ ... categorías y normas ... ],
      "brand":[{"@type":"Brand","name":"..."}]   /* sólo distribuidores */
    },
    {"@type":"CreativeWork","@id":"[canonical]#case",
      "name":"...","description":"...","inLanguage":"es-MX","image":"...",
      "author":{"@id":"https://origenlab.com/#organization"},
      "publisher":{"@id":"https://origenlab.com/#organization"},
      "about":{"@id":"https://[dominio-cliente]/#organization"},
      "keywords":[ ... ]
    }
  ]
}
```

### 2.4 · Hero copy
- `hero__eyebrow` → "Caso de estudio · [vertical/sub-vertical]"
- `hero__title` → 2-3 líneas con `<br>` separando
- `hero__sub` → 1-2 frases: marca/normas/cobertura
- `hero__p1`, `hero__p2` → 2 párrafos descriptivos. **NO usar "posicionamiento estratégico", "SEO", "búsquedas reales"**. Usar: "criterio editorial profesional", "redacción técnica", "jerarquía visual".

### 2.5 · Sidebar (datos del proyecto)
Cliente · Sector · Tipo de sitio · Modelo · Marcas distribuidas/Cumplimiento · Cobertura · Sitio en vivo (link externo).

### 2.6 · Stack & entregables (chips)
Plural consistente: `Astro` · `HTML5 / CSS3` · `Inter` · `Schema.org` · `WhatsApp Lead` · **`Formularios B2B`** · `Hosting CDN` · `Responsivo` + chip de modelo (Multi-marca / Multi-sucursal / Multi-servicio / Programa anual / Catálogo extenso / Cobertura nacional).

### 2.7 · 10 secciones del body
Mismas IDs en todos los casos: `#contexto` `#reto` `#arquitectura` `#diseno` `#catalogo`(o `#servicios` o `#proyectos`) `#conversion` `#tecnologia` `#proceso` `#galeria` `#resultado`.

Variantes por modelo (ver doc 33 sección "Variantes"):
- **Distribuidor mono-marca**: 6 capas en arquitectura · catálogo por familia.
- **Distribuidor multi-marca**: 7 capas (incluye Marcas distribuidas) · catálogo + plantilla de ficha.
- **Servicios técnicos**: 7 capas (incluye Programa anual) · servicios + normativa por servicio.
- **Integrador**: 6 capas · líneas + galería.
- **E-commerce**: 6 capas · catálogo en grid + flujo de checkout.

### 2.8 · A11y
**`aria-hidden="true" focusable="false"`** en TODOS los SVG decorativos. Aplicar:
- Topbar (email, teléfono, WhatsApp): 3
- Header dropdown chevron: 1 (×2 dropdowns)
- Mobile close, sub-toggle chevrons: 3
- Breadcrumb separators: 3
- Hero CTAs (visitar el sitio, scroll down): 2
- Sidebar CTA arrow: 1
- Cards en .ol-case-cards (sección 02, 04, 06, 05 cards de familia): ~20
- Footer iconos contacto: 4
- WA bubble: 1
- FAQ form badge + button: 2

Total esperado: **~35-40 SVGs con aria-hidden** por caso. Si el conteo es <30, faltan SVGs por marcar.

### 2.9 · ol-case-next (cadena)
Card 1: caso anterior (o sector si es el primero).
Card 2: caso siguiente (o sector si es el último).

### 2.10 · Texto de WhatsApp
3 lugares contienen el texto `vi el caso de [Cliente]`:
- Sidebar `ol-side-cta-link`
- CTA hero card `ol-btn-ghost`
- WA bubble flotante
- (opcional) `ol-faq-form` mensaje pre-cargado en script JS

---

## Paso 3 · Propagar el menú del header

Cada vez que añadas un caso L4, debe aparecer en el subdrop "Portafolio › [Sector]" en TODAS las páginas del sitio.

Hay dos patrones de menú coexistiendo:
1. **Plain** (en los L4 actuales): `class="ol-dropdown-link">[Nombre]`
2. **Em-dash** (en home, blogs, servicios, etc.): `class="ol-dropdown-link ol-dropdown-sub">— [Nombre]`

Usar Python script para detectar ambos patrones (ver `/_docs/36 — Auditoría y QA Checklist L4.md` apartado "Script de propagación de menú").

---

## Paso 4 · Cards y showcases del sector

En `portafolio/[sector]/index.html`:

### 4.1 · `.ol-proj-card`
- `href="/portafolio/[sector]/[slug]/"` (ruta interna, NO externa salvo e-commerce)
- `style="--proj-accent: #XXX;"` (mismo hex que `--case-accent` del L4)
- Badge: corto y descriptivo ("Caso de estudio · Ver detalle", "Catálogo extenso", "Servicios certificados")
- Categoría (`ol-proj-cat`): coincide con "Tipo de sitio" del sidebar del L4
- Tags: 4 chips con tipos representativos
- CTA (`ol-proj-link`): "Ver caso →" uniforme

### 4.2 · `.ol-showcase-block`
- Imagen anchor → ruta interna
- `--proj-accent` mismo hex
- Lista de 6 viñetas con valor diferencial
- CTA `ol-showcase-cta`: "Ver caso" uniforme

### 4.3 · Testimonio del caso (`.ol-tc`)
- Quote técnico, en boca del cliente
- Nombre envuelto en link interno con `border-bottom: 1px solid rgba(R,G,B,0.4)` color del acento del caso
- Role: "[Modelo] · [enlace externo al sitio del cliente]"

---

## Paso 5 · Encadenar `ol-case-next` en TODOS los casos

Cuando insertas un caso nuevo en posición `n` de la cadena:

| Caso | Card 1 | Card 2 |
|------|--------|--------|
| Posición 1 (primero) | Caso siguiente → caso 2 | Volver al sector |
| Posición intermedia | ← Caso anterior: caso n-1 | Caso siguiente → caso n+1 |
| Posición final | ← Caso anterior: caso n-1 | Volver al sector |

Actualizar los **vecinos** del caso recién insertado (el caso n-1 cambia su Card 2 al nuevo, y el caso n+1 cambia su Card 1 al nuevo). Si ejecutas el script de cadena del paso 6, esto se hace automáticamente.

---

## Paso 6 · Sitemap.xml

Añadir 1 línea por caso L4 nuevo:

```xml
<url><loc>https://origenlab.com/portafolio/[sector]/[slug]/</loc><lastmod>YYYY-MM-DD</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
```

Y 1 línea para el sector si es nuevo:

```xml
<url><loc>https://origenlab.com/portafolio/[sector]/</loc><lastmod>YYYY-MM-DD</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
```

---

## Paso 7 · Documentación

### 7.1 · Roster vivo del sector
Crear (o actualizar) `_docs/34 — L4 Casos en operación · Roster y enlaces.md`:
- Tabla maestra con: caso, slug, acento, modelo, sitio, cobertura, cumplimiento
- Cadena de navegación
- Convención de imágenes
- Hallazgos profesionales acumulados

### 7.2 · Memoria persistente
Si el vertical cambia las reglas del sistema (nuevo modelo, nuevo patrón JSON-LD), actualizar las memorias:
- `project_l4_case_template.md`
- `project_l4_roster_[fecha].md`
- `feedback_l4_a11y_y_consistencia.md` (sólo si surge nueva regla)

### 7.3 · CLAUDE.md
Si el sector es relevante a nivel del proyecto, actualizar la tabla "Casos L4 LIVE" en CLAUDE.md.

---

## Paso 8 · Auditoría final

Antes de marcar el sector como entregable, ejecutar el checklist de [[36 — Auditoría y QA Checklist L4]]:
- HTML válido (0 errores, 0 stack abierto)
- 0 menciones de SEO/posicionamiento
- 0 precios, 0 plazos
- aria-hidden ≥30 por caso
- Plural "Formularios B2B"
- JSON-LD enriquecido (5 nodos en `@graph`)
- Cache buster sincronizado
- Cadena `ol-case-next` válida
- Menú propagado en 100% de páginas live
- Sitemap actualizado

---

## Paso 9 · Deploy

Ejecutar `bash _push-github.sh` siguiendo el procedimiento de [[31 — Deploy origenlab.com (Frankoropeza repo)]].

---

## Mini-checklist de creación rápida

Para añadir UN caso L4 a un sector existente:

1. [ ] Copiar `bombero-mx/index.html` como base
2. [ ] Reemplazar acento (`--case-accent`) y URLs (cliente, OG)
3. [ ] Reescribir hero (título, sub, p1, p2)
4. [ ] Reescribir 10 secciones con copy del caso
5. [ ] Reemplazar JSON-LD con datos del cliente (`Organization` separado, `brand[]`/`areaServed`)
6. [ ] Cambiar imágenes a `/img/[sector]/[slug]/[slug]-XX.webp`
7. [ ] Añadir caso a la card y showcase del L3 (ruta interna, acento, copy)
8. [ ] Añadir testimonio en el L3 (con link interno al caso)
9. [ ] Propagar caso en menú desktop + mobile en TODAS las páginas (script Python)
10. [ ] Encadenar `ol-case-next` (caso nuevo + 2 vecinos en la cadena)
11. [ ] Sitemap.xml + actualizar `_docs/34` roster
12. [ ] Verificar aria-hidden ≥30, plural, JSON-LD, sin SEO/precios/plazos
13. [ ] Validar HTML
14. [ ] Push y verificar en producción

Tiempo estimado: 90-120 min para un caso bien documentado, asumiendo copy ya redactado.

---

## Casos especiales

### Cliente con sitio externo conservado (e-commerce)
LGA Contraincendios mantiene link externo en card y showcase del L3 (no internal route). El L4 sigue existiendo internamente para SEO técnico, JSON-LD y cadena. Documentar excepción en doc 34.

### Cliente sin sitio en vivo
El sidebar del L4 muestra `Sitio en vivo: No publicado todavía` o se omite la fila. CTA de "Visitar el sitio" se reemplaza por scroll a `#construccion`.

### Múltiples clientes con misma marca distribuida
Si dos casos del mismo sector representan a la misma marca (ej. dos distribuidores Elkhart Brass), se mantienen como casos independientes. Cada uno tiene su propio acento, sidebar y JSON-LD. La marca se referencia idénticamente (`{"@type":"Brand","name":"Elkhart Brass"}`).
