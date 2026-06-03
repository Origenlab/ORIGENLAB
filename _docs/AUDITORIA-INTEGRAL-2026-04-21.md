# Auditoría Integral ORIGENLAB — 21 de abril de 2026

**Alcance:** build estático completo (24 páginas HTML, 4 bundles CSS, `_docs/` sistema de diseño).
**Metodología:** arquitecto frontend sr. + SEO técnico + UX/UI + auditor de performance + CRO.
**Restricción confirmada:** OrigenLab NO comercializa SEO como servicio. Nunca mencionarlo en páginas de venta.

---

## Resumen ejecutivo

El sitio está en una **migración incompleta** entre dos sistemas de componentes que coexisten en producción. Aproximadamente el **46 % de las páginas** (11 de 24) no carga el tema `premium-dark.css` y sigue usando el header/footer legacy — el resultado visual es un sitio que **cambia de diseño al navegar** entre secciones. Esto por sí solo descalifica el sitio como "premium" hasta corregirlo.

A nivel SEO técnico hay **cinco referencias rotas** que apuntan a archivos inexistentes (`og-image.jpg`, `logo.svg`, `sitemap-index.xml`, páginas legales, blog posts duplicados). El schema.org se limita a `Organization` y deja fuera todos los tipos relevantes (`BlogPosting`, `Service`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`).

A nivel legal, el **formulario de cotización no funciona** (`action="cotizar.html#"`) y el sitio **no tiene aviso de privacidad público**, lo que incumple la LFPDPPP mexicana al recolectar datos personales sin consentimiento documentado.

A nivel comercial, las páginas de servicio son **demasiado delgadas** (1 H2, 4 features genéricas, ~400 palabras) para competir por keywords como "desarrollo web México" o "diseño de páginas web"; y **no existen páginas por ciudad** ni casos de estudio individuales, que son la vía principal de crecimiento orgánico para una agencia con 15 años de trayectoria y clientes en CDMX, Monterrey y Guadalajara.

El copy humano ya es bueno — los H1 y eyebrows están bien escritos, con voz profesional-cercana. El problema principal no es qué se dice, sino que las páginas terminan antes de dar al lector material suficiente para decidir.

---

## Tabla maestra de hallazgos

| # | Hallazgo | Prioridad | Impacto SEO | Impacto UX | Impacto CRO / comercial | Recomendación |
|---|---|---|---|---|---|---|
| 1 | Migración incompleta: 11/24 páginas sin `premium-dark.css` y con header legacy (`topbar` vs `ol-topbar`) | 🔴 P0 | Medio | Alto | Alto | Homologar todas las páginas al sistema `ol-*` + `premium-dark`. Eliminar clases legacy del build |
| 2 | Formulario `cotizar` roto: `action="cotizar.html#"` no envía | 🔴 P0 | — | Alto | Muy alto | Conectar a Formspree/Worker/Resend o endpoint propio; agregar validación + redirect a /gracias/ |
| 3 | Aviso de privacidad y términos inexistentes (links apuntan a `/contacto/`) | 🔴 P0 | Bajo | Medio | Medio (legal) | Crear `/aviso-de-privacidad/` y `/terminos/` conforme LFPDPPP; agregar checkbox de consentimiento al form |
| 4 | Referencias 404 en OG y Schema: `og-image.jpg`, `logo.svg` | 🔴 P0 | Alto | — | Alto (redes) | Crear `og-image.jpg` (1200×630) + `logo.svg`; generar OG por página si aplica |
| 5 | `sitemap-index.xml` declarado en robots.txt pero no existe | 🔴 P0 | Alto | — | — | Generar `sitemap.xml` desde build y publicarlo; registrar en Search Console |
| 6 | Duplicado `/cotizar.html` + `/cotizar/index.html` + `cotizar/index.html?ref=directorio.html` | 🔴 P0 | Alto | — | — | Elegir una ruta canónica (`/cotizar/`), redirigir las otras con 301, borrar el archivo con `?ref=` |
| 7 | Dos convenciones de URL en blog: flat (`.html`) vs carpeta (`/post/`) | 🟠 P1 | Alto | Bajo | — | Migrar todos a carpeta/index.html; redirigir los `.html` con 301 |
| 8 | 2 blog posts sin canonical; 3 con canonical apuntando a URL que no coincide con la real | 🟠 P1 | Alto | — | — | Alinear canonical con URL real en cada post y agregar los que faltan |
| 9 | Titles duplican marca: `Rediseño Web Profesional \| OrigenLab \| OrigenLab`, directorio igual | 🟠 P1 | Medio | Bajo | — | Corregir a `X \| OrigenLab` (una sola vez) |
| 10 | Schema.org reducido a `Organization`. Faltan `BlogPosting`, `Service`, `LocalBusiness`, `BreadcrumbList`, `FAQPage` | 🟠 P1 | Muy alto | — | Medio | Implementar schemas por tipo de página (ver plan de remediación §3) |
| 11 | Teléfono mal formateado en Schema: `+5547868402` (falta código 52) | 🟠 P1 | Medio | — | Bajo | Cambiar a `+525547868402` formato E.164 |
| 12 | Schema `sameAs: []` vacío — no vincula perfiles sociales | 🟡 P2 | Medio | — | Medio | Agregar URLs de LinkedIn, Instagram, Behance, Facebook, etc. |
| 13 | `meta name="keywords"` presente en todas las páginas | 🟡 P2 | — | — | — | Eliminar. Google lo ignora desde 2009; solo expone estrategia |
| 14 | `meta name="generator" content="Astro v6.0.2"` expone stack | 🟡 P2 | — | — | Bajo | Quitar o reemplazar |
| 15 | Google Fonts vía `@import` dentro de `premium-dark.css` → render-blocking | 🟠 P1 | — | Alto (LCP) | Alto | Mover a `<link rel="preconnect">` + `<link rel="preload">` en `<head>`; `font-display: swap` |
| 16 | Cloudflare Rocket Loader activo — obfusca scripts y degrada INP | 🟠 P1 | — | Medio | Bajo | Desactivar en el dashboard de Cloudflare; no aporta en Astro SSG |
| 17 | `!important` masivo en `premium-dark.css` (overrides sobre BaseLayout) | 🟡 P2 | — | — | — | Refactor: migrar tokens a un único archivo, eliminar BaseLayout como override layer |
| 18 | Inline `<style>` duplicado por componente en cada HTML (Astro scoped CSS) | 🟡 P2 | — | Medio | — | Ajustar estrategia de CSS en Astro: `inlineStylesheets: 'auto'` o extraer bundle común |
| 19 | `data-astro-cid-*` inflan HTML ~5–10 KB por página | 🟢 P3 | — | Bajo | — | Si es necesario, usar `data-astro-cid` más cortos o migrar a `class` estables |
| 20 | `contacto/index.html` sin `og:image` ni `twitter:image` | 🟡 P2 | Medio | — | Medio | Agregar meta completos |
| 21 | Footer col "Servicios": falta "Rediseño Web" | 🟡 P2 | Bajo | Bajo | Medio | Completar los 4 servicios |
| 22 | Imágenes sin `<picture>`/`srcset` y sin breakpoints responsive | 🟡 P2 | — | Alto (LCP móvil) | Medio | Usar `<Image>` de Astro con múltiples anchos; AVIF + WebP fallback |
| 23 | Hero de servicio usa `loading="eager"` pero sin `fetchpriority="high"` | 🟡 P2 | — | Medio | Bajo | Agregar `fetchpriority="high"` al LCP image |
| 24 | Alt de hero: `alt="desarrollo-web OrigenLab"` (slug literal) | 🟡 P2 | Medio | — | — | Reescribir alts descriptivos contextuales |
| 25 | Breadcrumbs ausentes en todo el sitio | 🟠 P1 | Alto | Medio | Medio | Añadir componente `ol-breadcrumbs` + `BreadcrumbList` schema |
| 26 | Páginas `/servicios/*/` con contenido ultra delgado (1 H2, ~400 palabras) | 🔴 P0 | Muy alto | Medio | Muy alto | Expansión a páginas de 1 800–2 400 palabras con: problema, solución, tecnología, casos, FAQ, pricing, CTA |
| 27 | Sin páginas por ciudad (Monterrey, Guadalajara, Puebla, Querétaro, CDMX) | 🟠 P1 | Muy alto | — | Muy alto | Crear landings locales con `LocalBusiness` schema por ciudad |
| 28 | Sin case studies individuales por proyecto | 🟠 P1 | Alto | Alto | Muy alto | Crear `/portafolio/[slug]/` con Project schema + narrativa + resultados |
| 29 | `blog/que-es-seo-local.html` desalinea posicionamiento (SEO no se vende) | 🟠 P1 | — | — | Medio | Re-framear el post hacia "visibilidad en Google Maps / ficha de negocio" sin vender SEO como servicio; alternativa: despublicar |
| 30 | robots.txt bloquea agentes AI (GPTBot, ClaudeBot, CCBot, Google-Extended, etc.) | 🟡 P2 | — | — | Medio | Decisión estratégica: permitir visibilidad en motores AI vs. protección de contenido. Recomendado: permitir crawlers de búsqueda AI (SGE, Perplexity) y bloquear solo scrapers de entrenamiento |
| 31 | Form en `/cotizar/` no incluye consentimiento de datos personales (LFPDPPP) | 🔴 P0 | — | — | Alto (legal) | Agregar checkbox obligatorio con link a aviso de privacidad |
| 32 | `<span class="ol-topbar-dot">` decorativo sin `aria-hidden="true"` | 🟢 P3 | — | Bajo | — | Marcar como decorativo |
| 33 | Inline JS de menú móvil duplicado en cada página (~2 KB × 24 archivos) | 🟡 P2 | — | — | — | Extraer a `menu.js` cacheable |

**Leyenda:**
🔴 P0 — bloqueante, reparar esta semana
🟠 P1 — alto impacto, 2-3 semanas
🟡 P2 — mejora relevante, 1 mes
🟢 P3 — pulido, backlog

---

## 1) Arquitectura Astro + Markdown

### 1.1 Qué hay realmente en el build

El directorio `ORIGENLAB/` contiene **solo el output estático de Astro**, no el código fuente:

```
ORIGENLAB/
├── _astro/              4 bundles CSS (2 de ellos fragmentados)
├── _docs/               Sistema de diseño (28 archivos .md, bien estructurado)
├── blog/                8 posts + índice (mezcla de .html y carpeta/index.html)
├── servicios/           4 subpáginas + índice
├── portafolio/          Solo índice (sin detalles por proyecto)
├── nosotros/ contacto/ directorio/ cotizar/
├── cotizar.html         ⚠️ Duplicado de /cotizar/index.html
├── cotizar/index.html?ref=directorio.html  ⚠️ archivo con "?" en el nombre
├── index.html robots.txt favicon.svg img/
└── cdn-cgi/             Rocket Loader + email-decode de Cloudflare
```

El sistema de diseño documentado en `_docs/` (tokens, tipografía, componentes `ol-*`, patrones `ol-sh`, `ol-page-hero`, `ol-proj-card`, `ol-svc-card`, etc.) es **muy sólido** — el problema es que no se aplicó de forma consistente al generar el build.

### 1.2 Dos sistemas conviviendo

Existen dos generaciones de layout publicadas simultáneamente:

| Sistema | Clases | CSS | Páginas afectadas |
|---|---|---|---|
| **Nuevo (premium-dark)** | `.ol-topbar`, `.ol-header`, `.ol-mobile-footer` | `BaseLayout` + `premium-dark.css` | `index`, `nosotros`, `servicios`, `portafolio`, `blog` (índice), `contacto`, `5-errores-pymes`, `astro-vs-wp`, `landing-vs-corp`, `por-que-sitio-lento`, `core-web-vitals`, `mercado-pago`, `como-medir` |
| **Legacy** | `.topbar`, `.header`, `.mobile-panel-footer` | Solo `BaseLayout` | `cotizar.html`, `cotizar/`, `directorio/`, `servicios/desarrollo-web/`, `servicios/tiendas-en-linea/`, `servicios/landing-pages/`, `servicios/rediseno-web/`, `blog/cuanto-cuesta-pagina-web-mexico.html`, `blog/que-es-seo-local.html`, `blog/velocidad-de-carga-importancia.html` |

Las páginas legacy no solo tienen diseño distinto — **no tienen el tema oscuro premium aplicado**, por lo que se ven con fondos claros y tipografías distintas al resto del sitio.

**Fix:** migrar los 11 HTML legacy al layout nuevo, cargar `premium-dark.css` y eliminar las clases `.topbar`, `.header`, `.mobile-panel-footer` del CSS final.

### 1.3 Bundles CSS

```
BaseLayout.xeR8R953.css     11 KB    ← 24 páginas (global)
premium-dark.css            57 KB    ← solo 13 páginas (tema nuevo)
index@_@astro.BX4RFBkr.css   7 KB    ← solo index.html
index@_@astro.DWosM7FM.css   5 KB    ← solo directorio/
```

Los dos chunks `index@_@astro.*` son **CSS fragmentado por página** de Astro (esperado). El problema es `premium-dark.css` cargado como override sobre `BaseLayout`: requiere `!important` masivo para ganar especificidad. Lo recomendable es **colapsar ambos archivos en un único CSS de sistema** (`ol-system.css`), con los tokens como fuente única de verdad y sin overrides.

---

## 2) SEO técnico

### 2.1 Referencias rotas (404 silenciosos)

Estas referencias apuntan a archivos que no existen en el build:

- `https://origenlab.com/og-image.jpg` → referenciado por 22 páginas como OG/Twitter image
- `https://origenlab.com/logo.svg` → referenciado en el Schema.org `Organization.logo`
- `https://origenlab.com/sitemap-index.xml` → declarado en robots.txt
- `cotizar/index.html?ref=directorio.html` → archivo con `?` en el nombre, no accesible por URL normal

**Impacto:** cuando el sitio se comparte en redes (WhatsApp, LinkedIn, X), aparece sin preview de imagen. Google no encuentra sitemap y debe descubrir el sitio por enlaces internos.

### 2.2 Titles y metas

| Problema | Páginas |
|---|---|
| `title` duplica marca (`X \| OrigenLab \| OrigenLab`) | `servicios/rediseno-web/`, `directorio/` |
| `meta keywords` presente (deprecado) | 22 páginas |
| `meta generator` expone stack | 22 páginas |
| `og:image` inexistente (404) | 22 páginas |
| `contacto/` sin `og:image` ni `twitter:image` | 1 |
| Canonical apunta a URL pretty que no existe aún | `blog/que-es-seo-local.html`, `blog/velocidad-de-carga-importancia.html`, `blog/cuanto-cuesta-pagina-web-mexico.html` |
| Sin canonical | `blog/landing-page-vs-sitio-corporativo/`, `blog/como-medir-resultados-sitio-web/` |

### 2.3 Headings

Los **H1 son correctos** — uno por página, con copy humano y persuasivo:

> "Desarrollo web que genera resultados reales." (home)
> "Construimos sitios web que trabajan por ti." (nosotros)
> "Proyectos reales. Resultados concretos." (portafolio)
> "Negocios de CDMX y EdoMex que merecen estar en línea." (directorio)

La estructura H2 sí tiene gaps: `servicios/landing-pages/` tiene 1 H2 (debería 4-6), `cotizar/` tiene 0 H2 (aceptable para una landing de formulario).

### 2.4 Schema.org

Actualmente: `Organization` + `ContactPoint` + `PostalAddress` replicado en las 24 páginas (desperdicio), + 1 `Blog` en `blog/index.html`. **Falta todo lo demás:**

- `LocalBusiness` (con `address`, `geo`, `openingHoursSpecification`) — crítico para Google Maps y Local Pack
- `Service` por cada servicio (con `serviceType`, `provider`, `areaServed`)
- `BlogPosting` por cada post (con `headline`, `datePublished`, `author`, `image`)
- `BreadcrumbList` en subpáginas
- `FAQPage` cuando la página tenga FAQ (home tiene; actualmente desaprovechado)
- `WebSite` + `SearchAction` para sitelinks en Google

### 2.5 URLs y trailing slash

El sitio mezcla dos convenciones:

```
/blog/5-errores-sitios-web-pymes-mexico/    ← carpeta, trailing slash
/blog/que-es-seo-local.html                 ← archivo flat
```

Elegir **una sola convención**. Recomendado: carpeta/`index.html` con trailing slash (más limpio, consistente con Astro por defecto). Los `.html` flats deben migrar y redirigir con 301.

### 2.6 Keywords prioritarias vs densidad real (home)

| Keyword objetivo | Ocurrencias en home | Densidad | Diagnóstico |
|---|---|---|---|
| `páginas web` / `paginas web` | 0 / 0 | 0 % | **Ausente** — keyword prioritaria no aparece en copy |
| `diseño` | 45 | 1.2 % | Bien |
| `desarrollo web` | 16 | 0.4 % | Saludable |
| `méxico` | 12 | 0.3 % | Saludable |
| `cdmx` | 1 | 0.03 % | Bajo |
| `conversión` | 9 | 0.24 % | Bien |

El término "**páginas web**" literalmente no aparece en la home, a pesar de ser una keyword prioritaria declarada. Esto es corregible añadiendo variaciones naturales en el hero y la intro sin caer en stuffing.

---

## 3) Limpieza de código

### Archivos a eliminar

```
cotizar.html                                          ← duplicado, borrar tras configurar redirect 301
cotizar/index.html?ref=directorio.html                ← archivo basura con ? en el nombre, borrar
.DS_Store (2 ocurrencias)                             ← artefactos de macOS, agregar a .gitignore
```

### Inline styles duplicados

Cada HTML incluye bloques `<style>` con reglas como `.sc[data-astro-cid-uhzbvkqe]{...}`, `.cta-final[data-astro-cid-frbqrhml]{...}`, etc. Son **CSS scoped por componente** que Astro inyecta — está bien funcionalmente, pero genera **200-300 líneas de CSS duplicado** por página. Al comprimir (gzip/brotli) cuesta menos, pero el HTML "mojado" es pesado.

Solución en Astro: `astro.config.mjs` → `build.inlineStylesheets: 'never'` y dejar que los componentes compartan un único CSS chunk cacheable.

### JS inline duplicado

El script del menú móvil (~80 líneas, ~2 KB) está inline en las 24 páginas. Extraer a `/js/menu.js` con `defer` ahorra ~45 KB acumulados y permite caché del navegador.

### CSS `!important` y overrides

`premium-dark.css` usa `!important` en tokens y reglas base para ganar especificidad sobre `BaseLayout`. En producción esto es aceptable pero frágil. Refactor objetivo: **un solo archivo de tokens + un solo archivo de sistema**, sin capas de override.

---

## 4) Homologación de layouts

El sistema de diseño en `_docs/` está bien definido. El build no lo respeta por completo. Tabla:

| Patrón documentado | Implementado correctamente | Implementado con legacy | Comentarios |
|---|---|---|---|
| 03 — Topbar (`ol-topbar`) | 13 páginas | 11 páginas con `.topbar` viejo | Homologar |
| 04 — Header y navegación | 13 páginas | 11 páginas con `.header` viejo | Homologar |
| 05 — Section Header 2col (`ol-sh`) | index, servicios, portafolio | — | OK donde aplica |
| 07 — Hero | index | — | OK |
| 16 — Footer | 15 páginas | 9 con `.footer` legacy | Homologar |
| 17 — `ol-svc-card` | servicios/ | — | OK |
| 18 — `ol-tc` (testimonio) | — | — | **No implementado** en ninguna página |
| 21 — `ol-page-hero` | nosotros, portafolio, blog, contacto | cotizar, directorio, servicios/* (con variante legacy) | Migrar los legacy |
| 22 — `ol-showcase` | index, portafolio | — | OK |
| 25 — `ol-proj-card` | portafolio | — | OK pero sin página de detalle |
| 27 — `ol-about` (manifiesto) | nosotros | — | OK |

---

## 5) Copy y humanización

El copy **ya es bueno en general** — los H1 son humanos y persuasivos, los eyebrows están bien usados, la voz editorial es coherente. No hay el típico texto robótico de agencia.

### Problemas concretos

1. **Páginas de servicio delgadas**: 1 párrafo intro + 4 features de 1 línea cada una. Faltan bloques que cualquier cliente quiere ver antes de cotizar: problema que resuelve, proceso, tecnologías específicas, portafolio relacionado, pricing transparente, FAQ, testimonios.
2. **Servicio "Desarrollo Web" predica sin practicar**: lista como feature *"Meta tags, Schema.org, sitemap, robots.txt y URLs amigables implementados correctamente desde el inicio"* — y el sitio propio tiene sitemap roto, OG image 404, schema incompleto. Coherencia rota.
3. **"Cotización gratis OrigenLab"** en `meta keywords` — un poco forzado, quitar junto con el resto de meta keywords.
4. **`/blog/que-es-seo-local.html`** choca con la política declarada de no vender SEO. El contenido es bueno informativamente pero el framing posiciona a OrigenLab en una categoría que no vende. Reescribir hacia *"cómo hacer que Google Maps muestre tu negocio"* o *"ficha de Google en México"* — misma intención de búsqueda, sin branding SEO.
5. **Footer legal vacío**: "Aviso de privacidad" y "Términos de servicio" son links a `/contacto/`. Un cliente corporativo revisa esto antes de firmar.

### Voz editorial (confirmada: profesional-cercano MX)

La voz actual ya funciona:

> "No todos los sitios web son iguales. Los que construimos en OrigenLab cargan en menos de 1 segundo, tienen Core Web Vitals en verde y están diseñados para convertir visitantes en clientes."

Solo hace falta **estirar cada página** con esta misma voz hasta cubrir el journey completo del decisor (PYME o dirección de marketing).

---

## 6) Performance y Core Web Vitals

Sin acceso a runtime no puedo dar métricas reales, pero los **indicadores en el código** apuntan a:

### LCP (riesgo medio-alto)

- `@import url('https://fonts.googleapis.com/...')` dentro de `premium-dark.css` → cascada de peticiones (HTML → CSS → @import → fuentes). Mover a `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` + `<link rel="preload" as="style" href="...">` en el `<head>`, y cargar con `font-display: swap`.
- Hero images en `/servicios/*/` usan `loading="eager"` pero sin `fetchpriority="high"` — agregar para acelerar el LCP por ~200-400 ms.
- Imágenes en AVIF sin fallback ni `srcset` — en móvil entrega la imagen de escritorio.

### CLS (riesgo bajo)

- Imágenes traen `width`/`height` en portafolio (✓ bien).
- Fonts con `display: swap` mitigan layout shift.
- Topbar fixed con altura fija (42 px) — sin reserva en `<body>` podría causar shift si el topbar tarda en pintar.

### INP (riesgo medio)

- **Cloudflare Rocket Loader activo** — reescribe `<script>` a un tipo no-JS y los ejecuta diferido. Genera scripts obfuscados (`type="79d1f31f...-text/javascript"`) y **degrada INP** al serializar la ejecución. Cloudflare hoy recomienda desactivarlo.
- **TruConversion** (heatmaps) cargado en todas las páginas — scroll, mousemove, click tracking es caro. Condicionar a cookie de consentimiento o cargar solo en páginas de conversión (`/cotizar/`, `/contacto/`).

### Total transferred per page

Page index.html: ~100 KB HTML + 57 KB premium-dark.css + 11 KB BaseLayout + 7 KB chunk + Google Fonts (~50 KB) + 2 imágenes ≈ **~260 KB** antes de CDN compression. Tras brotli queda aceptable pero se puede bajar a ~120 KB con las mejoras de arriba.

---

## 7) Oportunidades de crecimiento

### 7.1 Expansión de páginas de servicio

Cada `/servicios/*/` debe crecer de ~400 a **1 800–2 400 palabras** con esta estructura:

```
1. Hero (existe)
2. El problema (narrativo, 250 palabras)
3. Cómo lo resolvemos (proceso 4-6 pasos)
4. Tecnologías específicas (Astro/Next/Shopify/WooCommerce según servicio)
5. Resultados esperables (métricas reales de tus clientes)
6. Pricing transparente (existe, expandir)
7. Casos donde aplicamos este servicio (2-3 proyectos del portafolio)
8. FAQ (6-8 preguntas)
9. CTA
```

### 7.2 Páginas por ciudad (landings locales)

Con 15 años de operación en CDMX, Monterrey y Guadalajara, las landings locales son la **mayor palanca de crecimiento orgánico**:

```
/desarrollo-web-cdmx/
/desarrollo-web-monterrey/
/desarrollo-web-guadalajara/
/desarrollo-web-queretaro/
/desarrollo-web-puebla/
/diseno-de-paginas-web-cdmx/
/diseno-de-paginas-web-monterrey/
```

Cada una con `LocalBusiness` schema, foto del equipo o proyectos de la ciudad, testimoniales de esa plaza, y copy adaptado al perfil del cliente local.

### 7.3 Case studies individuales

El portafolio actual muestra 3 proyectos (Cadeca, Redeil, Brincolins) como tarjetas. Cada uno merece su página:

```
/portafolio/cadeca/
/portafolio/redeil/
/portafolio/brincolins/
```

Estructura sugerida por case study: problema → objetivo → solución técnica → tecnologías → screenshots → métricas (velocidad, conversión, sesiones) → testimonio → link al sitio vivo.

### 7.4 Clústeres temáticos (content hubs)

| Hub | Páginas hijas |
|---|---|
| **Velocidad y rendimiento web** | "velocidad de carga", "core web vitals", "por qué tu sitio lento cuesta clientes", "cómo medir tu sitio", "astro vs wp" |
| **E-commerce en México** | "mercado pago vs stripe", "cuánto cuesta tienda en línea en MX", "shopify vs woocommerce en MX", "cómo configurar envíos nacionales", "checkout de conversión en MX" |
| **Paginas web para PyMEs** | "cuánto cuesta una página web", "5 errores en sitios de pymes", "sitio web vs red social", "landing vs sitio corporativo" |
| **Rediseño y modernización** | "cuándo rediseñar tu sitio", "cómo migrar de WordPress", "auditoría técnica gratuita" |

### 7.5 Recursos descargables (lead magnets)

- PDF "Checklist de sitio web profesional en México"
- PDF "Guía de rendimiento: por qué tu sitio es lento y cómo arreglarlo"
- Plantilla de brief de proyecto web

Cada recurso en landing propia con formulario simple → email. Ideal para capturar contactos que aún no quieren cotizar.

---

## 8) Legal y compliance

Esto es bloqueante si el sitio va a trabajar con empresas formales:

1. **Aviso de privacidad** — LFPDPPP exige publicarlo donde se recolectan datos. Debe incluir: identidad del responsable, datos recolectados, finalidades, transferencias, derechos ARCO, mecanismo de contacto.
2. **Consentimiento explícito** en el form de cotización: checkbox obligatorio "He leído y acepto el aviso de privacidad".
3. **Términos de servicio** — no es obligatorio legalmente pero los clientes corporativos lo esperan.
4. **Cookie banner** — si se usa TruConversion (tracking de comportamiento), aplica ePrivacy / LFPDPPP. Mínimo: banner de consentimiento para analytics/heatmaps.

---

## 9) Política de bots AI

`robots.txt` actual bloquea: GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, Bytespider, Amazonbot, meta-externalagent.

Esto es una **decisión estratégica**, no un error. Contexto para tomarla:

- **Bloquear entrenamiento** (`Google-Extended`, `Applebot-Extended`, `GPTBot`, `ClaudeBot`, `CCBot`) protege tu contenido de ser usado para entrenar modelos comerciales. Razonable.
- **Bloquear crawlers de respuesta en tiempo real** (SGE de Google, Perplexity, copilot en Bing) **pierde visibilidad** en la nueva generación de motores de búsqueda.

**Recomendación:** diferenciar. Permitir los agentes que indexan para respuestas en vivo (Perplexity-User, OAI-SearchBot, etc.) y mantener bloqueados los de entrenamiento masivo. Requiere ajustar `robots.txt` con más granularidad.

---

## 10) Plan de remediación por fases

### Fase 1 — Bloqueantes (1 semana)

1. Conectar form de cotización a endpoint real + redirect `/gracias/`
2. Crear `/aviso-de-privacidad/` y `/terminos/`; agregar checkbox consentimiento al form
3. Homologar las 11 páginas legacy al sistema `ol-*` + `premium-dark.css`
4. Crear `og-image.jpg` (1200×630) genérico + `logo.svg`
5. Generar `sitemap.xml` del build y publicar
6. Eliminar `cotizar.html` y `cotizar/index.html?ref=directorio.html`; redirigir `cotizar.html` → `/cotizar/`
7. Corregir titles duplicados (`rediseño-web`, `directorio`)

### Fase 2 — SEO técnico y performance (2-3 semanas)

1. Implementar schemas: `LocalBusiness`, `Service` (×4), `BlogPosting` (×11), `BreadcrumbList`, `FAQPage`, `WebSite+SearchAction`
2. Añadir breadcrumbs visuales + schema en subpáginas
3. Unificar URLs de blog a `/blog/[slug]/`; 301 desde los `.html`
4. Corregir canonicals rotos; agregar los que faltan
5. Mover Google Fonts a `<link preconnect/preload>`; quitar `@import`
6. Desactivar Cloudflare Rocket Loader
7. Extraer `menu.js` + `forms.js` a archivos cacheables
8. Limpiar `meta keywords`, `meta generator`
9. Condicionar TruConversion a consentimiento o a `/cotizar/` y `/contacto/`

### Fase 3 — Expansión de contenido (3-5 semanas)

1. Reescribir las 4 páginas de `/servicios/*/` a 1 800–2 400 palabras con estructura completa (ver §7.1)
2. Crear landings por ciudad: CDMX, Monterrey, Guadalajara (+2 secundarias)
3. Crear case studies individuales: Cadeca, Redeil, Brincolins (+2-3 proyectos adicionales si hay)
4. Reescribir `/blog/que-es-seo-local.html` re-enfocado a Google Maps / ficha de negocio
5. Crear 2 lead magnets + landings
6. Completar footer "Servicios" con los 4

### Fase 4 — Pulido (continuo)

1. Refactor CSS: un único `ol-system.css` sin `!important`
2. Optimizar imágenes: `<Image>` de Astro con `srcset` AVIF+WebP
3. Revisar accesibilidad con lector de pantalla
4. Implementar analytics respetuoso (Plausible, Umami) en lugar de TruConversion completo
5. Monitor de Core Web Vitals en Search Console

---

## 11) Prioridad por tipo de trabajo

**Mayor ROI por hora invertida:**

1. Homologar las 11 páginas legacy — **8 horas** → el sitio deja de verse roto
2. Arreglar form de cotización — **2 horas** → recuperas leads que hoy se pierden
3. Crear aviso de privacidad + checkbox — **3 horas** → cumplimiento legal
4. Expansión de página `/servicios/desarrollo-web/` — **6 horas** → la keyword principal que hoy no rankea
5. 3 case studies individuales — **12 horas** → prueba social concreta para cierre comercial
6. Sitemap + Schema.org completo — **4 horas** → visibilidad orgánica
7. 2 landings locales (CDMX, Monterrey) — **8 horas** → tráfico calificado por ciudad

**Total esfuerzo Fase 1 + inicios de Fase 2:** ~43 horas de trabajo técnico, sin contar copy pulido.

---

## Cierre

El sitio tiene una **base sólida** (design system bien documentado, voz editorial buena, arquitectura Astro correcta en principio, performance decente). El problema es que se desplegó **a medio camino** entre dos versiones, con errores menores de SEO que se acumulan, y páginas de servicio demasiado delgadas para competir en un mercado donde la competencia publica 2 000-3 000 palabras por página.

Con la Fase 1 (1 semana) el sitio queda presentable y funcional. Con Fase 2 + 3 (8 semanas) puede posicionar con fuerza en "desarrollo web México", "diseño de páginas web CDMX/Monterrey/GDL" y ser referencia premium en el mercado.

---

*Auditoría elaborada el 21 de abril de 2026. Siguiente paso: confirmar con Frank qué fases ejecutar y en qué orden para iniciar los fixes.*
