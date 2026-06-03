# 39 — Auditoría de la categoría Seguridad Privada

> Homologación, reparaciones y plan SEO / GEO / marketing para el hub del sector y los 5 casos L4.
> Fecha: 2026-06-01 · Alcance: `portafolio/seguridad-privada/` (hub + origins, seprico, seguridadprivadamx, seguridadeventos, gupri).

---

## 0. Resumen ejecutivo

La categoría está **estructuralmente homologada**: los 5 casos comparten el mismo layout L4 (hero → shell con sidebar + 10 secciones → CTA hero → FAQ → caso siguiente → footer), el mismo sistema de componentes, JSON-LD enriquecido, H1 único y corto, breadcrumb y canonical correctos, galería de 6 maquetas `.mk` y reglas duras cumplidas (sin precios, sin SEO como servicio, sin plazos de entrega).

Se detectaron y **repararon en esta sesión** 6 inconsistencias reales (cache buster partido, OG/imágenes rotas o faltantes, cards del hub con placeholder, meta descriptions largas, falta de schema FAQ). Quedan recomendaciones de mayor esfuerzo o que requieren assets del cliente, priorizadas abajo.

---

## 1. Matriz de homologación (estado final, post-reparación)

| Criterio | origins | seprico | segpmx | segeventos | gupri |
|---|:--:|:--:|:--:|:--:|:--:|
| Layout L4 (10 secciones, IDs) | ✓ | ✓ | ✓ | ✓ | ✓ |
| TOC = IDs de sección | ✓ | ✓ | ✓ | ✓ | ✓ |
| Chrome (topbar/header/móvil/footer) | ✓ | ✓ | ✓ | ✓ | ✓ |
| JSON-LD (Org+SecurityService+Breadcrumb+CreativeWork) | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FAQPage schema** (nuevo) | ✓ 8 | ✓ 8 | ✓ 8 | ✓ 8 | ✓ 8 |
| H1 único, corto, con keyword | ✓ | ✓ | ✓ | ✓ | ✓ |
| Galería 6 maquetas `.mk` | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cadena `ol-case-next` | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cache buster unificado (`v20260601d`) | ✓ | ✓ | ✓ | ✓ | ✓ |
| OG/Twitter image que resuelve | ✓ | ✓ | ✓ | ✓ | ✓ |
| Hero real en card del hub | ✓ | ✓ | ✓ | ✓* | ✓ |
| Meta description ≤ 160 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Reglas duras (precio/SEO/plazo) | ✓ | ✓ | ✓ | ✓ | ✓ |

\* SeguridadEventos usa una **portada de marca generada** (no captura real) — ver §3 y §4.

---

## 2. Reparaciones aplicadas en esta sesión

1. **Cache buster unificado.** El hub, SeguridadEventos y GUPRI quedaron en `v20260601b` mientras los otros tres casos ya estaban en `v20260601d`. Se bumpearon los tres a `v20260601d` (premium-dark.css, BaseLayout y ol-header.js). Ahora los 6 cargan la misma versión de CSS/JS.
2. **OG image rota en GUPRI.** El `og:image`/`twitter:image` apuntaba a `gupri-hero.avif`, que no existe (solo existe `gupri-hero.webp`). Se corrigieron las 3 referencias a `.webp`.
3. **OG image inexistente en SeguridadEventos.** No había carpeta de imágenes. Se generó una **portada de marca** profesional (1280×960, 29 KB, violeta) en `img/seguridad-privada/seguridadeventos/seguridadeventos-hero.webp` y se apuntaron las 3 referencias OG/JSON-LD a ella.
4. **Cards del hub con placeholder.** Las cards de SeguridadEventos y GUPRI usaban un bloque CSS con degradado en vez de `<img>`. Se reemplazaron por `<img>` reales (patrón `ol-proj-thumb-img`) para homologar la rejilla del hub con las otras tres.
5. **Figura de contexto en GUPRI.** Usaba maqueta `.mk`; como GUPRI ya tiene captura real (`gupri-hero.webp`, 1280×960), se cambió a imagen real, igual que origins y segpmx. La galería sigue con `.mk`.
6. **Meta descriptions.** origins (269) y segpmx (260) excedían el límite recomendado; las cinco se reescribieron a 147–155 caracteres, con keyword + diferenciador al frente.
7. **FAQPage JSON-LD (GEO/SEO).** Ninguna página marcaba su FAQ visible como datos estructurados. Se inyectó `FAQPage` con las 8 preguntas/respuestas reales de cada caso → elegibles para rich results y citables por motores de respuesta con IA.

---

## 3. Hallazgos que requieren decisión o assets (pendiente)

### A · Capturas reales para SeguridadEventos y GUPRI — **prioridad alta**
Los tres casos antiguos tienen un set de assets más profundo (hero + capturas `-01..04` en avif/jpg/webp), aunque hoy esas capturas `-01..04` están **huérfanas** (no se usan en el HTML; todas las galerías son `.mk`). Estado de assets:

| Caso | hero | capturas 01–04 |
|---|:--:|:--:|
| origins | ✓ webp | ✓ (huérfanas) |
| seprico | ✓ avif+webp | ✓ (huérfanas) |
| segpmx | ✓ webp | ✓ (huérfanas) |
| segeventos | ⚠ portada generada | ✗ |
| gupri | ✓ webp | ✗ |

Recomendado: que sueltes una **captura real del home** de seguridadeventos.com (para sustituir la portada generada) y, si quieres paridad total, capturas reales para las galerías. Yo puedo convertir cualquier asset a AVIF/WebP, pero no puedo generar capturas web desde el entorno (ver `/_docs/38`).

### B · Patrón de la figura de contexto — **RESUELTO (2026-06-01)**
Regla aplicada: "captura real en la figura de contexto cuando existe el asset; `.mk` si no". Hoy origins, seprico, segpmx y gupri usan **imagen real**; solo SeguridadEventos sigue con `.mk` por no tener captura real (usa la portada generada solo en card/OG). Al soltar la captura real de seguridadeventos.com queda 5/5.

### C · Capturas huérfanas `-01..04` — **prioridad baja**
Existen en disco para los 3 casos antiguos pero no se referencian. Opciones: (1) usarlas en la galería en lugar de `.mk`, (2) dejarlas como respaldo, o (3) eliminarlas para aligerar el repo. Hoy no afectan el render.

### D · Cache buster a nivel sitio — **RESUELTO (2026-06-01)**
Se hizo el pase global: todas las páginas live que cargan `premium-dark.css` quedaron en `?v20260601d` (CSS, BaseLayout y JS). Cero páginas live en versión stale. Los 22 artículos de blog L6 no cargan `premium-dark.css` (plantilla propia), por lo que no aplican.

### E · Jerarquía de encabezados — **prioridad baja (a11y/SEO)**
En el cuerpo de los casos se salta de `H2` (secciones) a `H4` (tarjetas de `ol-case-card`/`ol-arch-step`), sin `H3`. Es consistente en los 5, pero idealmente las tarjetas deberían ser `H3` para una jerarquía limpia. Cambio cosmético en `premium-dark.css` + HTML.

### F · Meta description del hub — **prioridad baja**
El hub tiene 179 caracteres; conviene recortarlo a ≤160.

---

## 4. Plan SEO / GEO / marketing recomendado

**SEO técnico (alto impacto, bajo esfuerzo)**
- ✅ FAQPage schema (aplicado) → rich results + featured snippets.
- Añadir `BreadcrumbList` ya está; mantener.
- Recortar meta del hub; revisar que cada `alt` de imagen incluya keyword + ciudad (las cards nuevas ya lo hacen).
- Sustituir la portada generada de segeventos por captura real (mejora CTR de OG en redes/WhatsApp).

**GEO (Generative Engine Optimization — que los LLM citen el sitio)**
- El JSON-LD por caso ya define `Organization`+`SecurityService` del cliente con `areaServed`, `knowsAbout` y `slogan`: es justo lo que los motores de respuesta con IA consumen. Mantener ese patrón en todo caso nuevo.
- La FAQPage recién añadida aporta pares pregunta/respuesta en lenguaje natural → altamente citable por asistentes. Mantener 6–8 Q&A reales por caso.
- Recomendado: añadir un bloque de "datos clave" consistente (cobertura, certificaciones, años) en texto plano cerca del hero — los LLM extraen mejor de prosa que de íconos.

**Marketing / conversión**
- CTA homologado (cotización + WhatsApp) ya presente en los 5; consistente.
- Oportunidad: añadir cross-links contextuales entre casos del mismo sub-nicho (p. ej. desde un caso de condominios, "ver otro proyecto de seguridad residencial") además de la cadena prev/next, para repartir autoridad y retener al visitante.
- Considerar `Review`/`aggregateRating` schema **solo si los testimonios son verificables** (hoy son ilustrativos en las maquetas; no marcar como Review hasta tener reseñas reales, o se arriesga penalización).

---

## 5. Checklist de cierre para nuevos casos del sector

Para mantener la homologación al sumar clientes, todo caso L4 nuevo debe pasar:

- [ ] Layout L4 con 10 secciones e IDs que coinciden con el TOC.
- [ ] JSON-LD: Organization+SecurityService del cliente (@id propio) + BreadcrumbList + CreativeWork + **FAQPage**.
- [ ] Cache buster en la versión vigente del sitio.
- [ ] `og:image`/`twitter:image` que resuelve a un archivo existente.
- [ ] Card del hub con `<img>` real (no placeholder), `alt` con keyword + ciudad.
- [ ] Meta description ≤ 160, keyword + diferenciador al frente.
- [ ] Acento distinto en el roster (`/_docs/38` §6).
- [ ] Interlinking recíproco completo (submenú, cadena, hub, conteo, sitemap).
- [ ] Reglas duras: sin precios, sin SEO como servicio, sin plazos de entrega.
