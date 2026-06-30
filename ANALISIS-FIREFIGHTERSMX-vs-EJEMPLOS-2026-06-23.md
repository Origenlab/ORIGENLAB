# Análisis cruzado: FIREFIGHTERS MX vs EJEMPLOS.mx
**Fecha:** 2026-06-23 | **Experto en:** SEO · Marketing · Equipos contra incendio / bomberos

---

## 1. Mapa de páginas — qué tiene cada sitio

| Sección | FIREFIGHTERS MX (localhost:4322) | EJEMPLOS.mx (template) | Brecha |
|---|---|---|---|
| Home | ✅ 14 secciones | ✅ completo | — |
| Productos índice | ✅ | ✅ | — |
| Producto categoría | ✅ `/productos/[categoria]` | ✅ | — |
| Producto ficha | ✅ `/productos/[...producto]` | ✅ | — |
| Producto landing especial | ✅ `/productos/trajes-bombero/` `/productos/cascos-nfpa/` | ❌ | **FF gana** |
| Servicios índice | ✅ | ✅ | — |
| Servicio ficha | ✅ | ✅ | — |
| Blog índice | ✅ 13 artículos | ✅ | — |
| Blog paginación | ❌ | ✅ `/blog/pagina/[page]` | **EJEMPLOS gana** |
| Blog categorías | ❌ | ✅ `/blog/categoria/[...categoria]` | **EJEMPLOS gana** |
| Blog tags | ❌ | ✅ `/blog/tag/[...tag]` | **EJEMPLOS gana** |
| Cobertura índice | ✅ (estático) | ✅ | — |
| Cobertura por estado | ❌ 1 página plana | ✅ `/cobertura/[...slug]` dinámico | **EJEMPLOS gana** |
| Industrias/Sectores | ✅ `/industrias/[industria]` (3 sectores) | ❌ array vacío en config | **FF gana** |
| Marcas | ✅ `/marcas/index` (16 marcas estáticas) | ❌ | **FF gana** |
| Marca individual | ❌ sin `/marcas/[marca].astro` | ❌ | ambos pierden |
| Licitaciones | ✅ landing dedicada | ❌ | **FF gana** |
| Certificaciones | ✅ landing dedicada | ❌ | **FF gana** |
| Distribuidores | ✅ | ❌ | **FF gana** |
| Cotización dedicada | ✅ `/cotizacion` | ❌ solo /contacto | **FF gana** |
| Nosotros | ✅ | ✅ | — |
| Contacto | ✅ | ✅ | — |
| Blog anatomía/guía | ❌ | ✅ | **EJEMPLOS gana** |
| Módulos documentados | ❌ | ✅ /modulos/* | **EJEMPLOS gana** |
| Niveles L1-L4 | ❌ | ✅ | **EJEMPLOS gana** |

---

## 2. Issues técnicos SEO en FIREFIGHTERS MX (prioridad alta)

### 2.1 Title demasiado largo — CRÍTICO
```
Actual:    "Equipo para Bomberos y Contra Incendio Certificado NFPA | FIREFIGHTERS MX"  (~70 chars)
Límite:    60 chars (Google trunca con "…")
Propuesta: "Equipo para Bomberos Certificado NFPA | Distribución México"  (59c)
```
Google muestra ~57–60 chars antes de truncar. El truncado no deja ver "FIREFIGHTERS MX" y la KW "contra incendio" se pierde.

### 2.2 Description suboptimizada — dejando CTR en la mesa
```
Actual (106c): "Distribuidor autorizado de equipo para bomberos: trajes NFPA 1970 (antes 1971), SCBA, cascos, rescate, extintores y sistemas CI. Cotización en 24 h."
Potencial:     160 chars disponibles — 54 chars sin usar
```
Propuesta mejorada (158c):
> "Distribuidor autorizado: trajes NFPA 1970 Globe/Lion, SCBA MSA G1/Dräger PSS 7000, cascos Bullard/Gallet, herramientas Holmatro. Cuerpos de bomberos, brigadas industriales y aeropuertos. Licitaciones LAASSP. Cotiza en 24 h."

Por qué: menciona modelos reales (mayor CTR), segmentos atendidos (califica al usuario), differentiator de licitaciones.

### 2.3 site.ts no sigue el contrato canónico del Master System
FIREFIGHTERS MX usa `@data/site.ts` con estructura propia. Le faltan campos que EJEMPLOS.mx requiere:
- `KEYWORDS[]` (3 KWs jerárquicas — regla keyword-first)
- `SITE.seo.{title, description, titleMaxLength, descriptionMaxLength, appendBrand}`
- `SITE.trailingSlash` (astro.config.mjs debe coincidir)
- `SITE.allowSelfReviews` (gate anti-reseña self-serving)
- `SITE.organization.{foundingDate, sameAs[]}`
- `SITE.business.{address, geo, openingHours, areaServed}`
- `TAXONOMY` con `PRODUCT_CATEGORIES`, `SERVICES`, `SECTORS`, `COVERAGE_STATES`
- `WA_MESSAGES` objeto (mensajes pre-armados por intención)
- `BRANCHES[]` y `SOCIAL[]` como arrays tipados
- `LEGAL[]` para footer legal
- `waUrl()` y `telUrl()` constructores canónicos

**Riesgo:** sin `trailingSlash` consistente → canonical drift → Google ve `/productos/` y `/productos` como páginas distintas.

### 2.4 Solo 2 productos en Content Collections (vs data estática)
Solo `scba-msa-g1.md` y `traje-estructural-globe-gx7.md` son Content Collections con Zod.  
Los demás productos viven en `data/categories.ts` como strings — sin schema, sin URL propia, sin JSON-LD de Product individual.

**Impacto SEO:** sin páginas individuales de producto no hay:
- Rich result de Product (precio, marca, rating)
- URL indexable por modelo (`/productos/scba-msa-g1/`)
- Internal linking desde blog → producto

### 2.5 `/marcas/index.astro` pero sin `/marcas/[marca].astro`
16 marcas listadas (MSA, Dräger, 3M Scott, Globe, Holmatro, Bullard, Honeywell, Kidde, Ansul, NAFFCO, Tyco, Rosenbauer, Lion, Cairns, FLIR, DJI) pero ninguna tiene URL propia.

**Pérdida:** búsquedas como "MSA SCBA México", "Globe trajes bombero México", "Bullard cascos bomberos" tienen volumen real y cero competencia de SEO con landing dedicada.

### 2.6 Datos placeholder en producción (sin check:demo gate)
```
phone: '55 1234-5678'          ← placeholder
email: 'contacto@firefightersmx.com'  ← puede no existir
social.facebook: 'https://facebook.com/firefightersmx'  ← URL genérica
```
EJEMPLOS tiene `npm run check:demo` que bloquea push si quedan marcadores. FIREFIGHTERS MX no tiene ese gate.

### 2.7 Sin paginación ni taxonomía de blog
13 artículos y creciendo → sin `/blog/pagina/2/` Google penaliza listas infinitas o sin paginar. Sin categorías ni tags se pierde surface SEO de "extintores NFPA México", "trajes bombero NFPA 1970" como landing de categoría de blog.

---

## 3. Brechas de contenido — perspectiva sectorial (bomberos / CI)

### 3.1 Sectores sin landing (❌ = falta, ✅ = tiene)
| Sector | FIREFIGHTERS MX | Volumen KW estimado |
|---|---|---|
| Bomberos municipales | ✅ `/industrias/bomberos-municipales` | Alto |
| Brigadas industriales | ✅ `/industrias/brigadas-industriales` | Alto |
| Aeropuertos ARFF | ✅ `/industrias/aeropuertos-arff` | Medio-alto |
| Industria petrolera / HAZMAT | ❌ falta | Alto |
| Cuerpos de bomberos estatales | ❌ falta | Medio |
| Hospitales y salud | ❌ falta | Medio |
| Centros comerciales | ❌ falta | Medio |
| Construcción y obra civil | ❌ falta | Bajo-medio |

**HAZMAT es crítico**: "equipo HAZMAT México", "trajes HAZMAT NFPA 1994" tienen búsquedas de alta intención comercial y baja competencia.

### 3.2 Productos sin ficha individual (alta prioridad por volumen)
| Producto | KW target | ¿Tiene ficha? |
|---|---|---|
| MSA G1 SCBA | "MSA G1 SCBA México" | ✅ |
| Globe GX-7 traje | "Globe GX7 traje bombero" | ✅ |
| Dräger PSS 7000 | "Dräger PSS 7000 México" | ❌ |
| 3M Scott Air-Pak NxG7 | "Scott Air-Pak México" | ❌ |
| MSA Gallet F1 XF casco | "Gallet F1 casco bombero" | ❌ |
| Bullard USTM casco | "Bullard USTM México" | ❌ |
| Holmatro SPR 4250 SC | "Holmatro cizalla México" | ❌ |
| Holmatro CT 4260 | "Holmatro herramientas rescate" | ❌ |
| Cámara térmica FLIR K65 | "cámara térmica bomberos México" | ❌ |
| Traje proximidad ARFF | "traje proximidad aeropuerto" | ❌ |
| Traje forestal NFPA 1977 | "traje forestal bomberos México" | ❌ |

**Mínimo urgente:** Dräger PSS 7000, MSA Gallet F1 XF, Holmatro SPR 4250 — son los modelos que más buscan.

### 3.3 Contenido de blog que falta (gap editorial)
Artículos de alta intención que la competencia no tiene bien cubiertos:
1. **"Vida útil del equipo NFPA 1850: cuándo retirar traje, SCBA y casco"** — informacional + transaccional al cierre
2. **"Diferencias NFPA 1970 vs 1971 (y por qué importa para tu licitación)"** — muy buscado tras el cambio de norma
3. **"Cómo preparar el anexo técnico de licitación CompraNet para equipo bomberos"** — intención ultra-específica, cero competencia
4. **"SCBA MSA G1 vs Dräger PSS 7000 vs 3M Scott NxG7: comparativo real"** — captura tráfico de fondo de embudo
5. **"Checklist NOM-002-STPS para brigada industrial: qué equipo sí o sí"** — informacional + lead magnet
6. **"Equipo ARFF para aeropuertos: qué pide la OACI y cómo cotizarlo en México"** — nicho alto valor
7. **"Cámara térmica para bomberos: FLIR K65 vs K55 — cuál para búsqueda en interior"** — comparativo de producto
8. **"Mantenimiento de traje estructural NFPA 1850: lavado, inspección y vida útil"** — servicio + upsell mantenimiento

### 3.4 Normativas clave que deben aparecer (E-E-A-T)
FIREFIGHTERS MX menciona algunas. Las que elevan autoridad técnica:

| Norma | Aplica a | ¿Mencionada? |
|---|---|---|
| NFPA 1970 (antes 1971) | Trajes estructurales | ✅ |
| NFPA 1977 | Trajes forestales | ✅ (en data) |
| NFPA 1850 | Vida útil de EPP | ✅ (en data) |
| NFPA 1001/1002 | Capacitación bombero | ✅ (en datos industrias) |
| NFPA 1981/1982 | SCBA y PASS | ❌ falta en meta-contenido |
| NFPA 1994 | Trajes CBRN/HAZMAT | ❌ falta |
| NFPA 1021 | Oficial de bomberos (buyer influencer) | ❌ falta |
| NOM-002-STPS-2010 | Brigadas / CI centros de trabajo | ✅ |
| NOM-154-SCFI-2005 | Extintores | ✅ |
| OACI Cat. ARFF | Aeropuertos | ✅ (en datos) |
| LAASSP / CompraNet | Licitaciones gobierno | ✅ (en contenido) |

**Añadir NFPA 1981 (SCBA), NFPA 1994 (HAZMAT) y NFPA 1021 (oficial)** es diferenciador clave de autoridad técnica.

---

## 4. Lo que FIREFIGHTERS MX tiene y EJEMPLOS.mx debe incorporar al template

Estas features de FIREFIGHTERS MX son tan valiosas que deben subir al template canónico:

| Feature | Descripción | Impacto SEO/conversión |
|---|---|---|
| **`/industrias/[industria].astro`** | Landing por sector con norma, riesgos, solución spotlight, FAQs y productos recomendados | **Alto** — superficie SEO masiva |
| **`/licitaciones.astro`** | Landing dedicada a compra pública / CompraNet | **Alto** — captures leads de gobierno |
| **`/certificaciones.astro`** | Landing de respaldo normativo / certificaciones | **Medio** — E-E-A-T + conversión |
| **`/distribuidores.astro`** | Red de distribuidores y cobertura | **Medio** — local SEO |
| **`/cotizacion.astro`** | Formulario dedicado de cotización | **Alto** — conversión directa |
| **`TestimonialsSection`** | Testimonios con org/cargo/año/sector | **Alto** — E-E-A-T + confianza |
| **`IndustriesSection`** en home | Grid de sectores con link a landings | **Medio** — internal linking + UX |
| **`CoverageSection`** en home | Bloque visual de cobertura nacional | **Medio** — local SEO |
| **`BlogTeasers`** en home | 3 últimos artículos del blog en home | **Medio** — internal linking |
| **`QuickLinksBar`** post-hero | Accesos rápidos a secciones clave | **Medio** — UX + bounce rate |
| **`ValueProps`** | Diferenciadores en sección dedicada | **Medio** — conversión |
| **`knowsAbout[]`** en JSON-LD | Array de términos de expertise en schema | **Medio** — knowledge graph |
| **Schema `Store`** (en vez de solo `LocalBusiness`) | Tipo más específico para distribuidor | **Bajo-medio** |

### Para SECTORES en EJEMPLOS: propuesta de config
```ts
// En site.ts — añadir a TAXONOMY:
sectors: [
  { slug: 'bomberos-municipales', label: 'Bomberos Municipales', norm: 'NFPA 1970' },
  { slug: 'brigadas-industriales', label: 'Brigadas Industriales', norm: 'NOM-002' },
  { slug: 'aeropuertos-arff',     label: 'Aeropuertos ARFF',     norm: 'OACI NFPA' },
] as readonly { slug: string; label: string; norm?: string }[],
```
Y una página `/sectores/[sector].astro` análoga a `/industrias/[industria].astro` de FFMX.

---

## 5. Lo que EJEMPLOS.mx tiene que FIREFIGHTERS MX debe adoptar

| Feature | Por qué importa |
|---|---|
| **Blog paginación** `/blog/pagina/[page]` | Sin paginación, Google puede no indexar artículos 4+ |
| **Blog categorías** `/blog/categoria/[...categoria]` | Landings de categoría indexables (ej. "noticias NFPA México") |
| **Blog tags** `/blog/tag/[...tag]` | Long-tail de tema — "trajes estructurales", "rescate vehicular" |
| **Cobertura dinámica** `/cobertura/[...slug]` | Una landing por estado = SEO local multiplicado |
| **`check:demo` gate** | Bloquea push si hay placeholders → nunca llega dato falso a producción |
| **`KEYWORDS[]` jerárquico** | Fuerza la regla keyword-first en title/description |
| **Contrato canónico `site.ts`** | Todos los layouts/componentes consumen del mismo fuente → cero desync |
| **`WA_MESSAGES` por intención** | Un msg de WA distinto para cada punto de conversión |
| **`LEGAL[]` array** | Footer legal consistente, un solo lugar para mantener |
| **`trailingSlash: 'never'`** explícito | Evita canonical drift entre `/productos/` y `/productos` |
| **`allowSelfReviews: false`** | Gate que protege de schema auto-reseña (Google penaliza) |

---

## 6. Roadmap priorizado — qué hacer primero

### Sprint 1 — Semana 1 (Quick wins SEO técnico, sin contenido nuevo)
1. **Corregir title** de 70 → ≤59 chars (¡hoy!)
2. **Ampliar description** de 106 → 155–158 chars con modelos y segmentos reales
3. **Añadir `trailingSlash: 'never'`** en `astro.config.mjs`
4. **Implementar check:demo** con teléfono/email/social reales del cliente
5. **Añadir NFPA 1981 y NFPA 1994** a `knowsAbout[]` del JSON-LD
6. **Crear `/marcas/[marca].astro`** — landing individual para las 5 marcas top (MSA, Globe, Bullard, Dräger, Holmatro)

### Sprint 2 — Semana 2–3 (Superficie SEO de producto)
7. **Fichas individuales MD** para los 5 productos prioritarios (Dräger PSS 7000, MSA Gallet F1, Holmatro SPR, Scott NxG7, Traje proximidad ARFF)
8. **Blog paginación + categorías + tags** (copiar estructura de EJEMPLOS)
9. **`/cobertura/[slug]`** dinámico — mínimo CDMX, EDOMEX, Jalisco, Nuevo León

### Sprint 3 — Mes 2 (Superficie SEO de sector)
10. **Agregar 2–3 sectores** faltantes: HAZMAT/petroquímica, hospitales, construcción
11. **3 artículos blog** prioritarios: NFPA 1970 vs 1971, Anexo técnico CompraNet, SCBA comparativo
12. **Migrar `site.ts`** al contrato canónico del Master System (KEYWORDS, TAXONOMY, WA_MESSAGES)

### Sprint 4 — Mes 3 (Autoridad y conversión)
13. **Testimonios reales** con org/cargo/año (ojo: cero fabricados)
14. **4 artículos blog** restantes del gap editorial
15. **Landing HAZMAT** (`/industrias/petroquimica-hazmat`) con NFPA 1994
16. **Schema Product** individual en fichas de producto (precio, marca, modelo)

---

## 7. Resumen ejecutivo

**FIREFIGHTERS MX es el sitio más completo del portafolio en superficie de páginas** (licitaciones, industrias, certificaciones, distribuidores, cotización) pero tiene **deuda técnica SEO seria**: title 17% más largo que el límite, description que deja el 34% del espacio sin usar, datos placeholder sin gate, y arquitectura que diverge del contrato canónico del Master System.

**EJEMPLOS.mx es el template técnicamente más limpio** (SSoT, Content Collections, check:demo, taxonomía de blog) pero le faltan exactamente las páginas de mayor impacto SEO para el sector bomberos/CI: sectores, licitaciones, marcas individuales, cotización dedicada.

**El movimiento correcto**: adoptar las páginas de FIREFIGHTERS MX en EJEMPLOS como módulos opcionales (`/sectores/`, `/licitaciones/`, `/marcas/[marca]/`), y migrar FIREFIGHTERS MX al contrato canónico de site.ts. Así el template sube de nivel y el sitio más maduro del portafolio se alinea al sistema.
