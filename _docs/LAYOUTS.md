# ORIGENLAB · Layouts por tipo de página

Cada tipo de página sigue una secuencia de componentes fija. No improvises — copia el layout y rellena con contenido.

---

## L1 · Home (`/index.html`)

```
header (topbar + ol-header)
hero (.hero)
quicknav (.ol-quicknav)
servicios (cards 4 cols .ol-services-*)
why us (.ol-why-*)
process (.ol-process-*)
testimonials (.ol-testimonials-*)
cta-bar (.ol-cta-bar)
faq (.ol-faq-section)
quicknav (footer-rail)
footer (.ol-footer)
```

---

## L2 · Servicio (`/servicios/{slug}/`)

```
header
hero
quicknav
overview (imagen + copy)
features grid (.ol-features-*)
stack tech (.ol-stack-*)
types of work (.ol-types-*)
service process (.ol-svc-process-*)
faq
cta-bar
footer
```

⚠️ Las páginas actuales tienen `.ol-pricing-*` — VIOLA la regla "no precios". Quitar en migración.

---

## L3 · Portafolio root (`/portafolio/`)

```
header
hero (con copy del portafolio)
filtros por sector (cards/links)
grid de casos (cards con preview)
cta-bar
footer
```

---

## L3.5 · Sector (`/portafolio/{sector}/`)

```
header
hero (sector-specific)
listado de casos del sector (cards)
breadcrumb
cta-bar
footer
```

---

## L4 · Caso de estudio (`/portafolio/{sector}/{cliente}/`)

```
header
hero (.hero con --hero-accent override)
case shell:
  ├─ ol-case-body (contenido en 10 secciones tipo)
  └─ ol-case-sidebar (sticky)
cta hero card (.ol-cta-hero-card)
faq
case next nav (.ol-case-next)   ← cadena: anterior + siguiente / sector
quicknav
footer
```

**10 secciones del caso (estándar):**
1. Contexto del cliente
2. El reto
3. Arquitectura del sitio (6–7 capas según modelo)
4. Diseño y sistema visual
5. Catálogo / Servicios / Líneas (id según modelo)
6. Conversión B2B
7. Tecnología y rendimiento
8. Proceso de trabajo (6–7 fases)
9. Galería del sitio
10. Resultado entregado

> Detalles, variantes por modelo, JSON-LD enriquecido, reglas de a11y y roster vivo: ver `_docs/33 — Layout L4...md` y `_docs/34 — L4 Casos en operación · Roster y enlaces.md`.

**Casos L4 LIVE en sector `equipos-contra-incendios/`:** Gama de México · MESECI · LGA Contraincendios · MANEXT · BOMBERO.MX · Proyecto Red.

---

## L5 · Blog index (`/blog/`)

```
header
hero (blog-specific)
grid de artículos (.ol-blog-grid)
paginación (si aplica)
faq
cta-bar
footer
```

---

## L6 · Artículo de blog (`/blog/{slug}/`)

```
header
hero del artículo (título + meta + autor)
article body (.ol-article-body — prose, h2/h3/p/ul)
related posts (.ol-related-grid)
cta-bar
footer
```

---

## L7 · Páginas legales (`/aviso-de-privacidad/`, `/terminos/`)

```
header
hero ligera (sólo título + fecha de actualización)
contenido prose en una sola columna
footer
```

---

## L8 · Conversión (`/contacto/`, `/cotizar/`, `/gracias/`)

```
header
hero
form full-width o split (form + datos de contacto)
faq corto (3-5 preguntas relevantes a la conversión)
footer
```

---

## L9 · Misc (`/nosotros/`, `/directorio/`)

```
header
hero
secciones libres pero usando componentes existentes
faq
cta-bar
footer
```

---

Última actualización: 2026-04-26
