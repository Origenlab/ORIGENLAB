# 01 — SEO Técnico
> Propósito: fijar sitemap, robots.txt, canonical, `trailingSlash`, hreflang, Core Web Vitals y CDN post-build como configuración copy-paste, con la evidencia real del ecosistema.

Aplica a todos los proyectos de la Fábrica (Astro 6 SSG). El objetivo: HTML indexable, canónicos consistentes, assets rápidos y cero drift entre `astro.config.mjs`, `robots.txt` y el host de deploy.

---

## 1. `trailingSlash` y canonical
**Canónico: `trailingSlash: 'never'`** + `build.format: 'file'` (genera `pagina.html`, no `pagina/index.html`). Evidencia: MESECI y SEGURIDADPRIVADA (`astro.config.mjs` líneas 6–10) usan `never`; el patrón B5 lo fija como estándar.

> Excepción documentada: BOMBERO y EVENTECH usan `'always'`. Es válido, pero hay que ser **consistente**: la política de `astro.config.mjs` debe coincidir con la de `SITE.trailingSlash` que consume `absUrl()` en [[../08 - Biblioteca Plantillas/_seo/seo.ts]]. Mezclar `never` en config con canónicos con slash final causa duplicados.

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://DOMINIO.com.mx',   // OBLIGATORIO: sin él, sitemap y canonical fallan
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
```

El canonical se genera SIEMPRE en el layout vía `buildMeta().canonical`, que llama a `absUrl()`:
- convierte ruta relativa → absoluta con `SITE.url`,
- normaliza el slash final según `SITE.trailingSlash`,
- nunca añade slash a archivos con extensión.

Evidencia de la lógica: BOMBERO `utils/seo.ts:6–17` (`canonicalURL`) y `resolveSEO:162–186` (normaliza canónicos absolutos y relativos). EVENTECH `utils/seo.ts:10–14` (`canonicalURL`). SEGURIDADPRIVADA `SEOHead.astro` hace `.replace(/\/$/,'')` para `never`.

---

## 2. robots.txt
**Plantilla canónica:** [[../08 - Biblioteca Plantillas/_seo/robots.txt]] — copiar a `public/robots.txt` y reemplazar el dominio.

Decisiones que fija la plantilla:
- **Permite bots de IA/GEO por defecto** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot…). Origen: `BOMBERO/public/robots.txt:79–122` ("queremos aparecer citados en ChatGPT, Gemini, Claude, Perplexity y AI Overviews").
- **Bloquea scrapers SEO abusivos** (AhrefsBot, SemrushBot, MJ12bot, DotBot, BLEXBot, DataForSeoBot) y **Bytespider** (`BOMBERO/public/robots.txt:120–141`).
- **Permite redes sociales** (facebookexternalhit, Twitterbot, LinkedInBot, WhatsApp…) — necesario para previews OG.
- **Disallow** de `/_astro/`, `/api/`, `/draft/`, `/404`, `/gracias` (origen: `INFLAPY/public/robots.txt` + `PROYECTORED/public/robots.txt`).

> Variante "bloquear IA": si el cliente NO quiere alimentar entrenamiento, mover GPTBot/CCBot/Google-Extended/anthropic-ai/ClaudeBot a `Disallow: /`. Es exactamente el patrón de `EVENTECH/public/robots.txt:7–18`.

⚠️ **HUECO/Riesgo de drift:** `robots.txt` declara el `Sitemap:` con dominio absoluto. Si el dominio cambia, hay que actualizarlo a mano — no se genera. Verificar en cada deploy.

---

## 3. Sitemap
**Canónico: `@astrojs/sitemap` como única integración base obligatoria** (patrón A3, ~26/28 proyectos). Con `serialize` para prioridades por nivel de URL y `filter` para excluir `/draft/`, `/api/`.

```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

sitemap({
  filter: (page) => !page.includes('/draft/') && !page.includes('/api/'),
  serialize(item) {
    // Prioridad por profundidad/tipo (origen EVENTECH + BOMBERO serialize).
    if (item.url === 'https://DOMINIO.com.mx/') { item.priority = 1.0; item.changefreq = 'daily'; }
    else if (/\/(productos|servicios|categorias)\/$/.test(item.url)) { item.priority = 0.9; }
    else if (item.url.includes('/blog/')) { item.priority = 0.7; }
    else item.priority = 0.8;
    return item;
  },
});
```

Evidencia: EVENTECH `astro.config.mjs:12` (filter `/draft/`+`/admin/`, serialize por nivel L1–L5/blog/directorio), BOMBERO `astro.config.mjs:11–59` (serialize de prioridades + i18n es-MX), SEGURIDADPRIVADA `astro.config.mjs:11–69` (home 1.0, pillars 0.9, servicios 0.8, zonas 0.75, blog 0.7), FIREFIGHTERMX (serialize L1–L3).

**Arquetipo D (directorio masivo):** además del `sitemap-index.xml`, generar un **sitemap dedicado** del directorio con `lastmod` real, vía endpoint `.xml.ts`. Origen: `BOMBERO/src/pages/sitemap-directorio.xml.ts` (~700+ URLs). Declarar ambos en `robots.txt`.

---

## 4. hreflang
**Canónico: NO emitir `hreflang`** — todos los sitios del ecosistema son monolingües es-MX. La decisión debe quedar **documentada** (no asumida).

- Lo correcto que sí se emite: `og:locale = es_MX` e `inLanguage = es-MX` en el schema. Evidencia: BOMBERO `SEOHead.astro:40` ("hreflang eliminado a propósito, sitio monolingüe"), SEGURIDADPRIVADA y EVENTECH lo confirman.
- Si algún día hay versión en inglés: añadir `<link rel="alternate" hreflang="es-mx">` / `hreflang="en">` + `x-default` en `<SEOHead>`.

⚠️ **HUECO:** varios proyectos (PODIUMEX, SEGURIDADPRIVADA) no documentaban la ausencia de hreflang como decisión. El Vault la fija aquí: monolingüe = sin hreflang, a propósito.

---

## 5. Core Web Vitals (CWV) — LCP, CLS, INP
Patrón C5 (optimización LCP deliberada) + E4 (analítica diferida). Estándar para todas las páginas:

- **LCP:** `preload` de la imagen hero por página (`<link rel="preload" as="image">`) y de las fuentes self-hosted. Evidencia: BOMBERO `BaseLayout.astro:68–126`, RENTADEILUMINACION (critical CSS inline + preload).
- **CLS:** fuentes **self-hosted** con `font-display: swap` y `@font-face` (NUNCA Google Fonts CDN). Origen: MONITORES (subsets `unicode-range`), PODIUMEX/GAMADEMEXICO (Inter self-host). Anti-patrón: FIREFIGHTERCOMMX (Google Fonts CDN → CLS). Definir dimensiones de imagen siempre (`width`/`height`).
- **INP / TBT:** cargar analítica (Rybbit) **solo tras la primera interacción real o a los ~6s** para no penalizar Lighthouse. Origen: `BOMBERO/BaseLayout.astro:86–126` (patrón anti-Lighthouse), patrón E4.
- **HTML:** `compressHTML: true` + `build.inlineStylesheets: 'auto'` + `prefetch` on hover. Evidencia: PODIUMEX `astro.config.mjs:6–13`, EVENTECH `astro.config.mjs`.

---

## 6. CDN de imágenes (post-build)
**Canónico: script `rewrite-cdn.mjs` post-build**, NO reescritura en runtime. Plantilla: [[../08 - Biblioteca Plantillas/_seo/rewrite-cdn.mjs]].

Reescribir en cliente causa doble request por imagen y destruye el LCP — exactamente el problema que `RENTADEILUMINACION/scripts/rewrite-cdn.mjs` resolvió (ver su cabecera: "Sustituye la reescritura que se hacía en runtime desde BaseLayout.astro"). EVENTECH aún arrastra la doble reescritura (build + script cliente, `BaseLayout.astro:64–75`) — NO replicar eso.

```jsonc
// package.json
"scripts": {
  "build": "astro build && node scripts/rewrite-cdn.mjs"
}
```

Convención de host y transformaciones: `BOMBERO/src/utils/cdn.ts` (`cdnW`, `cdnSrcset`, `cdnLossless`). Se mantienen en origen `/fonts/` (CORS) y `/_astro/` (ya hasheado). Patrón E3 (~8 proyectos usan ExactDN/EWWW).

⚠️ **HUECO:** la generación de las imágenes (fal.ai/FLUX) y su subida al CDN son **manuales** — no hay pipeline en ningún repo (patrón E5). El script asume que la imagen ya existe en el host del CDN con la misma ruta.

---

## 7. Deploy y headers de seguridad
Patrón E1 — **la decisión #1 sin homologar.** ≥7 proyectos tienen config de GH Pages **y** Cloudflare mezclada (drift): `_headers`/`_redirects`/CSP quedan **muertos** en GitHub Pages porque GH Pages no los honra. Confirmado en SEGURIDADPRIVADA (workflow despliega a GH Pages mientras `_headers`/`_redirects`/`wrangler.toml` son de Cloudflare).

**Canónico recomendado: Cloudflare Pages** — respeta `_headers`/`_redirects`, alinea con el stack y habilita el Worker de captura de leads. *(Decisión a confirmar con el dueño; alternativa válida: estandarizar todo a GH Pages y BORRAR el config de Cloudflare para no dejar archivos muertos.)*

- Si Cloudflare Pages: `public/_headers` con CSP/HSTS/cache (origen BOMBERO `public/_headers`), `public/_redirects` con 301.
- **CSP endurecida sin mantenimiento manual:** `scripts/gen-csp-hashes.mjs` hashea los scripts inline post-build y elimina `'unsafe-inline'` de `script-src`. Origen: `BOMBERO/scripts/gen-csp-hashes.mjs` (corre en el `build` de `package.json`).

---

## 8. Gate de calidad SEO en CI
Patrón E2 (minoritario, alto valor). **Canónico: gate bloqueante en build** que valida `title` ≤60 y `description` 120–160 antes de publicar.

Único precedente real: `FIREFIGHTERMX/scripts/validate-seo.mjs` + `utils/seo-validator.ts` (prebuild + CI, modo `--strict` falla con warnings). El Vault adopta este gate; combinarlo con `astro check` + link-checker (detectaría enlaces rotos como el `/capacitacion/` de BOMBERO `navigation.ts:255`).

⚠️ **HUECO:** ningún otro proyecto tiene este gate; su versión generalizada para la Fábrica vive en [[00 - Indice de SOPs]] (pendiente).

---

## 9. Verificación Search Console
⚠️ **HUECO — sin automatizar.** Solo SEGURIDADPRIVADA inyecta `<meta name="google-site-verification">` (en `SEOHead.astro:75`, valor hardcodeado). Para la Fábrica: añadir `SITE.gscVerification` en `src/config/site.ts` y emitirlo condicionalmente en `<SEOHead>`. No hay integración con la API de GSC (n8n no existe — patrón E5).

---

## Checklist técnico (por proyecto)
- [ ] `site:` correcto en `astro.config.mjs` y `trailingSlash` coherente con `SITE.trailingSlash`.
- [ ] `@astrojs/sitemap` con `filter` + `serialize`; sitemap-index.xml accesible.
- [ ] `robots.txt` con dominio reemplazado y `Sitemap:` correcto.
- [ ] Canonical normalizado en todas las páginas (vía `buildMeta`).
- [ ] hreflang ausente y documentado (monolingüe).
- [ ] Fuentes self-hosted + preload hero + analítica diferida.
- [ ] `rewrite-cdn.mjs` en el `build` con `CDN_URL` real.
- [ ] Deploy único (sin config muerta del otro proveedor).
