# Integraciones
> Propósito: qué se conecta a un sitio OrigenLab, qué es real hoy y qué está pendiente.

## Reales y canónicas (verificadas en el ecosistema)

- **`@astrojs/sitemap`** — obligatoria. Genera `sitemap-index.xml`. Nunca mantener un sitemap manual en paralelo. *(Falla: RENTADEILUMINACION, RESOIL.)*
- **`@astrojs/mdx@^6`** — solo si hay blog en `.mdx`. *(Regla D3.)* Ya viene en el scaffold (`package.json` + `astro.config.mjs`). Debe ser `^6` (peer `astro@^6.4`); `@astrojs/mdx@^4` exige `astro@^5` y rompe. NO uses `npx astro add mdx` (instala v4).
- **CDN de imágenes (ExactDN/EWWW)** — vía `_seo/rewrite-cdn.mjs` post-build, reescribe `/img/` al CDN. *(Origen RENTADEILUMINACION, BOMBERO; usado en ~8 proyectos.)*
- **Analítica: Rybbit (self-hosted)** con carga diferida anti-Lighthouse. *(Origen BOMBERO; usado en MESECI, INFLAPY, RESOIL.)* + TruConversion microsurvey opcional.
- **Búsqueda: Pagefind** (opcional, estático). *(Origen BOMBERO.)*
- **Bot de conversión: DMChamp** (opcional) intercepta clics WhatsApp. *(MESASPICNIC, INFLAPY.)*

## Deploy
Cloudflare Pages (recomendado) o GitHub Pages — **uno solo**. Ver [[03 - Reglas Globales]] §Deploy y [[SOP 07 - Deploy Cloudflare Pages]].

## ⚠️ HUECOS — aspiracional, NO implementado en ningún repo

El encargo menciona estas integraciones; la auditoría confirmó que **no existen en código** en ninguno de los 31 proyectos (solo se mencionan en docs/schema). Documentadas como diseño objetivo en [[06 - Automatizaciones/00 - Indice]]:

- **n8n** (automatización de contenido) — `⚠️ HUECO`.
- **fal.ai / FLUX** (generación de imágenes) — `⚠️ HUECO`; hoy el pipeline de imágenes es manual.
- **Brevo** (email) — `⚠️ HUECO`.
- **Backend de captura de leads** — no hay handler real en ningún formulario. Conversión primaria es WhatsApp. Diseño propuesto: Cloudflare Worker → n8n → Brevo. Ver [[SOP 09 - Automatizacion de contenido]].

No documentar estas como "hechas". Marcarlas como pendientes hasta tener el código real.
