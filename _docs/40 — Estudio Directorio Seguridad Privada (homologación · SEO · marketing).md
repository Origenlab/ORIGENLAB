# 40 — Estudio del Directorio de Seguridad Privada

**Fecha:** 2026-06-02
**Alcance:** índice del directorio + 10 perfiles de empresa (L9).
**Método:** auditoría por script sobre el HTML real servido (no inferida), más revisión de homologación, estructura, SEO y marketing.

URLs auditadas:

```
/portafolio/seguridad-privada/directorio/                (índice)
/portafolio/seguridad-privada/directorio/armasek/
/portafolio/seguridad-privada/directorio/gif-seguridad/
/portafolio/seguridad-privada/directorio/tcps/
/portafolio/seguridad-privada/directorio/agaetra/
/portafolio/seguridad-privada/directorio/prosecon/
/portafolio/seguridad-privada/directorio/trust-group/
/portafolio/seguridad-privada/directorio/america/
/portafolio/seguridad-privada/directorio/apsp/
/portafolio/seguridad-privada/directorio/aar/
/portafolio/seguridad-privada/directorio/sistemas-coordinados/
```

---

## 1. Veredicto

El directorio está **bien estructurado y homologado**. Las 10 fichas son consistentes entre sí, comparten el mismo sistema de diseño, el mismo CSS compartido y el mismo esquema de datos estructurados. La base SEO y de marketing es sólida.

Se detectó **un solo defecto técnico real** (faltaban `og:image` / `twitter:image` en los 10 perfiles) — **ya corregido en esta sesión**. El resto son **optimizaciones recomendadas**, no errores: principalmente longitud de `<title>` y `meta description`.

Calificación global: **estructura 10/10 · homologación 10/10 · SEO 8.5/10 → 9/10 tras la corrección · marketing 9/10.**

---

## 2. Aclaración sobre "Astro"

El sitio se sirve como **HTML estático** (no se compila desde componentes Astro en este momento). Los nombres heredados (`BaseLayout.xeR8R953.css`) vienen de una migración previa, pero hoy cada página es HTML plano que carga el CSS compartido `_astro/premium-dark.css`. Esto es **correcto y deliberado** según `CLAUDE.md`: componentes en el CSS compartido, overrides mínimos por página. Los perfiles del directorio respetan esa arquitectura: **sin CSS duplicado de sistema**, solo overrides de acento + el bloque `.mk` de la maqueta.

---

## 3. Homologación estructural

Las 10 fichas comparten exactamente la misma anatomía (clon del patrón L9 de incendios `equipos-y-servicios-mf`, con acento oro `#C9A84C` del sector):

`topbar → header/nav → menú móvil → breadcrumb → hero → ol-case-shell (sidebar + 6 secciones de cuerpo) → ol-cta-hero → ol-case-next → footer → burbuja WhatsApp`

Resultado de la auditoría (todas idénticas salvo contenido):

| Check | Índice | 10 perfiles |
|---|---|---|
| 1 solo `<h1>` | ✅ | ✅ (10/10) |
| `<h2>` por página | 13 | 7 (10/10, consistente) |
| `lang="es-MX"` | ✅ | ✅ |
| `viewport` | ✅ | ✅ |
| Cache buster `?v20260601d` | ✅ | ✅ |
| Carga `premium-dark.css` | ✅ | ✅ |
| Breadcrumb visible + Schema | ✅ | ✅ |
| Monograma + datos verificados | n/a | ✅ |
| Maqueta `.mk` "propuesta" | n/a | ✅ |
| Cadena anterior/siguiente | n/a | ✅ (Armasek→…→Sistemas Coordinados) |

**Sin desviaciones.** Cada perfil pesa ~68 KB (muy homogéneo), señal de que comparten la misma plantilla.

---

## 4. SEO

### 4.1 Lo que está bien (10/10 páginas)

- **Canonical** correcto y único por página.
- **JSON-LD válido** (parseado sin errores): `BreadcrumbList` + `Organization/SecurityService` con `aggregateRating` real (rating + nº de reseñas) en cada perfil; `CollectionPage` en el índice.
- **Open Graph** núcleo (type, url, title, description, locale, site_name) y **Twitter Card**.
- **Jerarquía de encabezados** correcta (un solo H1, H2 por sección).
- **Sitemap**: las 11 URLs están dadas de alta en `sitemap.xml`.
- **Datos NAP** (nombre, dirección, teléfono) consistentes entre HTML visible y Schema.

### 4.2 Corregido en esta sesión ✅

- **`og:image` y `twitter:image` faltaban en los 10 perfiles** → la vista previa al compartir en WhatsApp/Facebook/X salía vacía. **Añadidos** apuntando a `https://origenlab.com/og-image.jpg` en las 10 fichas. (El índice ya lo tenía.)

> Mejora futura opcional: una imagen OG por empresa (con su nombre) en vez de la genérica, para previews más atractivos. Requiere generar 10 imágenes.

### 4.3 Recomendado (pendiente de tu visto bueno)

**`<title>` demasiado largos** (83–94 caracteres; Google corta ~60) y **`meta description` largas** (159–276; Google corta ~155–160). No es un error —Google las reescribe— pero se truncan en resultados. Propuesta de versiones cortas:

| # | Empresa | `<title>` propuesto (≤60) |
|---|---------|---------------------------|
| 1 | Armasek | Armasek — Seguridad Privada en Nezahualcóyotl |
| 2 | GIF | GIF Seguridad Privada — Guardias en Oriente CDMX |
| 3 | TCPS | TCPS Seguridad Privada — Guardias en Iztapalapa |
| 4 | Agaetra | Agaetra Security — Guardias en Gustavo A. Madero |
| 5 | Prosecon | Prosecon — Seguridad Corporativa en GAM, CDMX |
| 6 | Trust Group | Trust Group — Seguridad Industrial en Ecatepec |
| 7 | America | America Seguridad Privada — Guardias en GAM |
| 8 | APSP | APSP Security — Guardias y Vigilancia en Ecatepec |
| 9 | Corp. AAR | Corporativo AAR — Guardias en Coyoacán, CDMX |
| 10 | Sist. Coordinados | Sistemas Coordinados — Custodia y Traslado CDMX |

Descripciones: recortar a ~150 caracteres conservando: empresa + servicio + zona + rating. Ejemplo (Armasek): *"Armasek, seguridad privada corporativa en Nezahualcóyotl: guardias, vigilancia y custodia. 4.8★ con 38 reseñas reales en Google."* (124).

> Si das luz verde, aplico los 10 títulos + 10 descripciones por script en una pasada.

### 4.4 Nota de marca (regla del proyecto)

0 menciones de "SEO" como servicio y 0 precios/plazos en las 11 páginas. Regla cumplida. *(El término técnico "SEO" en este documento interno no cuenta: no está en el sitio.)*

---

## 5. Marketing

Embudo de conversión bien armado y consistente en las 10 fichas:

- **Propuesta de valor clara por empresa**: cada perfil tiene un ángulo real basado en sus datos (volumen de reseñas, calificación, giro, zona) — no es texto genérico repetido. Ej.: GIF = "alto volumen → ordena la demanda"; America/AAR = "calificación impecable, falta visibilidad"; Trust Group/Prosecon = "cliente corporativo, registros de proveedores"; Sistemas Coordinados = "custodia, se contrata por confianza".
- **CTAs**: 5 enlaces a WhatsApp por página (topbar, sidebar, CTA-hero, burbuja flotante, footer) + teléfono clicable + "Cotizar proyecto". Prefill de WhatsApp personalizado por empresa.
- **Prueba social**: badge "Negocio local verificado", rating con estrellas, scorecard de "Potencial digital" calibrado a datos reales (no inflado).
- **Maqueta de propuesta `.mk`**: cada ficha muestra "cómo podría verse su sitio" (hero oscuro premium + servicios + cobertura + stats + testimonial), etiquetada honestamente como maqueta. Diferenciador fuerte vs. un directorio plano.
- **Interlinking**: ~21 enlaces internos al directorio por ficha + "otras empresas" + "casos del sector" (L4) + cadena anterior/siguiente. Excelente para navegación y rastreo.

Recomendación menor: las maquetas usan testimonios por rol/sector (correcto, sin nombres inventados). Mantener ese criterio.

---

## 6. Accesibilidad y rendimiento

- SVG decorativos con `aria-hidden`/`focusable="false"`; `alt` en el logo; `skip-link` presente.
- Animaciones solo en botones (regla global de `premium-dark.css`); cards/imágenes no animan.
- Sin imágenes pesadas en los perfiles (la maqueta es HTML/CSS, el monograma es texto) → carga muy ligera.
- Responsive heredado del sistema + media queries propias del bloque `.mk`.

---

## 7. Acciones priorizadas

| Prioridad | Acción | Estado |
|---|---|---|
| ✅ Alta | Añadir `og:image`/`twitter:image` a los 10 perfiles | **Hecho** |
| ✅ Media | Acortar `<title>` a ≤60 en los 10 (+ sincronizar og/twitter title) | **Hecho** (56–61 car.) |
| ✅ Media | Acortar `meta description` a ~150 en los 10 (+ og/twitter desc) | **Hecho** (111–139 car.) |
| 🔵 Baja | Imagen OG por empresa (10 imágenes) | Opcional |
| 🔵 Baja | `<title>` del índice (64, ligeramente largo) | Opcional |

---

## 8. Conclusión

Homologación y estructura: **listas y consistentes**. SEO técnico: **sólido**, con el único defecto real ya corregido. Marketing: **bien estructurado** con ángulos por empresa, CTAs y prueba social. Lo único que queda es la **optimización editorial de títulos/descripciones**, que es mejora, no corrección.

Recomendación final: aprobar el recorte de títulos/descripciones (sección 4.3) y hacer push. El directorio queda en orden.
