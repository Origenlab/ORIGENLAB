# 04 — FAQs y Casos de Éxito

> Propósito: cómo se modelan las FAQ (acordeón + FAQPage emitido una sola vez) y los casos de éxito (prueba social honesta, sin reseñas fabricadas, regla B4).

Dos piezas que aparecen en casi todas las páginas y que comparten una misma disciplina: **schema honesto y emitido una sola vez**. Se rigen por las reglas duras B3 (breadcrumb/schema único) y B4 (cero datos estructurados fabricados) de [[patrones-canonicos]].

---

## FAQ — FAQAccordion + faqSchema (una sola vez)

### Qué es y de dónde sale el contenido

Bloque de preguntas frecuentes reutilizable en home, categoría, producto, servicio y zona. Las preguntas viven en el campo `faqs` del frontmatter de la colección (helper `faqSchema` reutilizable en [[08 - Biblioteca Plantillas/_scaffold/content.config.ts|content.config.ts]] `:40-47`: array de `{question, answer}`), o inline en la página cuando son específicas de esa ruta.

### Cómo se pinta y cómo emite schema

- **Visual:** componente **`FAQAccordion`** — acordeón accesible (`<details>`/`<summary>`), ver [[09 - Biblioteca Componentes/00 - Inventario]]. INFLAPY lo tiene como `FAQAccordion` en sus componentes MDX; GAMADEMEXICO como `Faq.astro`; EVENTECH como `FaqSection`.
- **Schema:** `faqSchema()` en [[08 - Biblioteca Plantillas/_seo/seo.ts|seo.ts]] (`:491-500`) emite `FAQPage` con `mainEntity[]` de `Question`/`acceptedAnswer`.

### Las dos reglas duras de la FAQ

1. **Una sola vez por página.** El `FAQPage` lo añade `buildSchema()` vía `data.faqs` (`seo.ts:633-634`) — y solo ahí. El componente visual **NO** debe emitir su propio `<script type="application/ld+json">`. Esto es el corolario de **B3** (anti-patrón confirmado: BOMBERO y RENTADEILUMINACION emitían `BreadcrumbList` en el layout **y** en el componente → duplicado en todas las páginas). La misma trampa aplica al FAQPage: emítelo en `buildSchema()`, nunca dos veces.
2. **Solo si las preguntas son visibles en el DOM.** Google exige que el contenido del `FAQPage` esté visible en la página (`seo.ts:490` lo documenta: "Emítelo SOLO si las preguntas son visibles"). No se emite schema de FAQs ocultas.

### FAQs generadas honestamente

Se pueden **generar FAQs por categoría/giro** sin inventar datos: GAMADEMEXICO arma FAQs por categoría de producto y por giro de empresa de forma determinista (`productos/[...slug].astro:89-119`, `empresas-certificadas/[slug].astro:237-290`) — son preguntas reales del dominio, no contenido fabricado. La línea roja está en los **ratings** (ver abajo), no en redactar buenas preguntas.

---

## Casos de éxito — prueba social honesta (B4)

### Qué es

Un caso de éxito es prueba social **verificable**: un cliente real, su testimonio textual, y —si existe y se puede comprobar— su resultado. **No** es una reseña inventada con estrellas para forzar rich results.

### La regla B4 — cero `aggregateRating`/`Review` fabricados

Es la regla más estricta del sistema, con **6+ proyectos confirmados** fabricando ratings ([[patrones-canonicos]] §B4). La política canónica viene de EVENTECH/PODIUMEX/GAMADEMEXICO:

> Sin reseñas reales verificables de terceros, **no se emite** `aggregateRating` ni `Review`. Google penaliza las reseñas auto-emitidas (self-serving) con acción manual y pérdida de rich results.

Esto está **cableado en código**, no es una recomendación:

- `emitReviews()` ([[08 - Biblioteca Plantillas/_seo/seo.ts|seo.ts]] `:546-568`) devuelve `{}` (nada) salvo que se le pasen reseñas reales **y** `SITE.allowSelfReviews` sea `true`. En la duda: vacío.
- La colección **`casos`** (`content.config.ts:223-245`) lleva `rating: z.number().min(1).max(5).optional()` con el comentario explícito **"SOLO si es real y verificable"**. Ese rating se muestra **en la página** como dato del caso; **no** se agrega a un `AggregateRating` global inventado.
- Precedentes reales correctos: EVENTECH desactivó conscientemente `aggregateRating` en `serviceWithReviewJsonLd` ("Google prohíbe reseñas self-serving"); INFLAPY define un rating en `business.ts` pero **no lo emite por defecto** (solo `/opiniones` con reseñas visibles); GAMADEMEXICO eliminó los ratings fabricados del directorio por riesgo legal/SEO.
- Contraejemplos a **no** imitar: BRINCOLINS/MESECI fabrican ratings; RENTADEILUMINACION repite las mismas reseñas sintéticas ("Sofía Ramírez", "Diego Herrera"…) en múltiples paquetes → riesgo de review spam.

### La colección `casos`

| Campo | Regla | Nota |
|---|---|---|
| `clientName` | obligatorio | cliente real. |
| `clientRole?` / `clientCompany?` / `clientLocation?` | opcional | contexto del testimonio. |
| `quote` | obligatorio | **testimonio textual real**. |
| `summary?` | opcional | resumen del caso/resultado. |
| `image` | `imagePath` obligatoria | foto del cliente/proyecto. |
| `rating?` | 1-5, **solo si real** | se muestra en página, no se agrega (B4). |
| `relatedServices` / `relatedProducts` | `reference(...)` | a qué servicio/producto pertenece (interlinking). |
| `approved` | boolean default `true` | **gate editorial** — origen SEGURIDADPRIVADA. |
| `date?` / `featured` / `draft` | — | metadatos. |

El gate `approved` permite curar qué casos se publican; los testimonios B2B de aliados con dominio real (modelo EVENTECH `REVIEWS`) son el estándar de verificabilidad.

### Dónde se muestran y con qué estructura

- **Como bloque** en home (prueba social tras el grid de categorías), categoría o servicio.
- **Como página propia** (opcional) para casos extensos.
- **Estructura:** foto + nombre/rol/empresa → testimonio textual (`quote`) → resultado/`summary` → enlace al servicio o producto relacionado (`reference()`). CTA WhatsApp al cierre (`waUrl()`, D4).

### Schema de casos

**Sin schema fabricado.** No se emite `Review`/`aggregateRating` salvo reseñas reales verificables vía `emitReviews()`. El caso es contenido honesto en la página; si en el futuro hay reseñas importadas de Google Business Profile, se activan con `SITE.allowSelfReviews` y cada review verificable — no antes.

---

## Resumen de reglas

- **FAQ:** acordeón visible + `FAQPage` **una sola vez** desde `buildSchema()` (B3); nunca en el componente.
- **Casos:** prueba social honesta; **cero `aggregateRating`/`Review` fabricados** (B4, cableado en `emitReviews()`); `rating` solo si es real y se muestra, no se agrega.

## Evidencia

- FAQ honestas por categoría/giro: GAMADEMEXICO `productos/[...slug].astro:89-119`, `empresas-certificadas/[slug].astro:237-290`. Ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- Ficha schema-driven con FAQs (10 bloques): CLINICADEBELLEZA `ServiceLayout.astro` + `content.config.ts`. Ver [[../_AUDITORIA/diagnostico-CLINICADEBELLEZA]].
- Supresión consciente de reseñas self-serving: EVENTECH `src/utils/seo.ts` (`serviceWithReviewJsonLd`), `REVIEWS` B2B de aliados; INFLAPY `business.ts` (rating no emitido por defecto). Ver [[../_AUDITORIA/diagnostico-EVENTECH]] y [[../_AUDITORIA/diagnostico-INFLAPY]].
- Regla cableada: [[08 - Biblioteca Plantillas/_seo/seo.ts]] (`emitReviews`, `faqSchema`) + colección `casos` en [[08 - Biblioteca Plantillas/_scaffold/content.config.ts]]. Patrón B3/B4 en [[patrones-canonicos]].
