# SOP 08 — Generar e integrar imágenes
> Propósito: producir e integrar imágenes optimizadas (AVIF dimensionadas, naming-keyword, alt) y reescribirlas al CDN post-build; la generación con IA es ⚠️ HUECO (hoy manual).

Estación 5 (Imágenes) de la [[01 - La Fabrica de Sitios]]. El flujo objetivo (prompt→FLUX) **no está implementado en ningún repo** ([[03 - Integraciones]] E5). Este SOP documenta el diseño objetivo y, sobre todo, el **proceso real de hoy**.

## Objetivo
Cada imagen del sitio: en AVIF (o WebP fallback), dimensionada a su uso, con nombre que incluye la keyword, `alt` descriptivo, ubicada bajo `/public/images/` (lo exige `imagePath` en `content.config.ts`) y opcionalmente servida por CDN vía `rewrite-cdn.mjs` post-build.

## Prerrequisitos
- Sitio creado con [[SOP 01 - Crear sitio nuevo]].
- Herramienta de conversión a AVIF: `sharp` (CLI o script), `cwebp/avifenc`, o Squoosh.
- (Opcional CDN) host ExactDN/EWWW y `scripts/rewrite-cdn.mjs` (de `08/_seo/rewrite-cdn.mjs`).

## Pasos

### A. Flujo OBJETIVO (⚠️ HUECO — prompt → FLUX → CDN)
> ⚠️ HUECO: **no implementado**. fal.ai/FLUX no existe en código en ninguno de los 31 proyectos (E5). Documentado como diseño objetivo en [[06 - Automatizaciones/00 - Indice]]; implementación futura junto con [[SOP 09 - Automatizacion de contenido]].

1. Definir un prompt por tipo de imagen (hero, ficha, blog) con estilo de marca consistente.
2. Generar con FLUX vía fal.ai (API), pedir la relación de aspecto del uso (ej. 1200×630 OG, 16:9 hero).
3. Pipeline automático: generar → optimizar a AVIF → subir al CDN con la ruta `/images/...` esperada → registrar el `alt`.
4. Hasta que exista: hacer A manual y seguir el bloque B.

### B. Proceso REAL de hoy (manual)

1. **Consigue la imagen** (foto real del cliente, banco con licencia, o generada manualmente). Prioriza fotos reales para E-E-A-T.

2. **Dimensiónala a su uso** antes de convertir (no subas un 4000px para un thumbnail):
   - Hero full-width: ~1600–1920px de ancho.
   - Ficha/Card: ~600–800px.
   - OG image: exactamente **1200×630**.
   - Blog hero: ~1200px.

3. **Convierte a AVIF** (mejor compresión; deja WebP/JPG de fallback si hace falta):
   ```bash
   # con sharp-cli
   npx sharp-cli -i origen.jpg -o public/images/productos/extintor-pqs-6kg.avif resize 800 --format avif
   # o avifenc
   avifenc --min 24 --max 36 origen.png public/images/blog/elegir-extintor.avif
   ```

4. **Nombra con keyword (naming-keyword), kebab-case sin acentos** ([[04 - Convenciones]]):
   - `extintor-pqs-6kg.avif`, no `IMG_2931.avif`.
   - Coincide con el slug/tema de la página donde se usa.

5. **Colócala bajo `/public/images/`** en la subcarpeta de su colección:
   ```
   public/images/productos/   public/images/servicios/
   public/images/blog/        public/images/zonas/       public/images/og/
   ```
   La ruta en frontmatter es absoluta y **debe empezar por `/images/`** (lo valida `imagePath`: `^/images/`). Ej. `image: "/images/productos/extintor-pqs-6kg.avif"`.

6. **Escribe el `alt`.** Descriptivo, con la keyword natural, sin "imagen de":
   - Bien: `alt="Extintor PQS de 6 kg con certificación NOM"`.
   - En plantillas: las cards reciben `imageAlt`; el `ArticleLayout` usa `imageAlt={d.title}`. Toda imagen lleva `alt` (requisito de accesibilidad QA).

7. **Anti-CLS: dimensiones explícitas.** Las cards del Vault traen imagen estática con `width`/`height`. La imagen LCP (hero) debe ir `eager` + `fetchpriority="high"` y opcional `<link rel="preload" as="image">`; el resto `loading="lazy"` (patrón C5).

8. **(Opcional) CDN post-build.** Si el proyecto sirve imágenes por CDN, añade al `package.json`:
   ```jsonc
   "scripts": { "build": "astro build && node scripts/rewrite-cdn.mjs" }
   ```
   Y corre con el host real:
   ```bash
   CDN_URL=https://tu-cdn.exactdn.com npm run build
   ```
   `rewrite-cdn.mjs` reescribe en el HTML de `dist/` las rutas `/img/` y `/images/` al CDN (en `src`/`href`/`srcset`/`url()`), **sin** tocar `/fonts/` ni `/_astro/`. Hacerlo en build (no en runtime) evita el doble request que destruye el LCP.

9. **Genera la OG image** (1200×630) y referénciala en `SITE.defaultImage` (`/images/og/...`). Que **exista** y no sea hotlink (lo verifica QA).

10. **Build y verifica peso/CLS:**
    ```bash
    npm run build && npm run preview
    ```

## Checklist de verificación
- [ ] Imágenes en AVIF (o WebP fallback), **dimensionadas** a su uso (sin 4000px para thumbs).
- [ ] Nombres con keyword, kebab-case, sin acentos.
- [ ] Ubicadas bajo `/public/images/...`; rutas de frontmatter empiezan por `/images/` (pasan `imagePath`).
- [ ] `alt` descriptivo en todas; OG image 1200×630 existe (no hotlink).
- [ ] LCP `eager`+`fetchpriority`; resto `lazy`; `width`/`height` presentes (anti-CLS).
- [ ] (Si CDN) `rewrite-cdn.mjs` en el build con `CDN_URL` real; `/fonts/` y `/_astro/` intactos.
- [ ] Lighthouse: imágenes no son el cuello del LCP; CLS < 0.1.
- [ ] ⚠️ HUECO de generación IA registrado (no se presenta como automatizado).

## Errores comunes
- **Presentar fal.ai/FLUX como hecho.** No existe en ningún repo (E5). Lección: márcalo `⚠️ HUECO`; hoy la generación es manual.
- **Reescritura de CDN en runtime.** EVENTECH arrastra doble reescritura (build + cliente) → doble request por imagen, LCP destruido. Lección: solo post-build con `rewrite-cdn.mjs` (origen RENTADEILUMINACION, que lo resolvió).
- **`CDN_URL` sin configurar.** El script aborta a propósito (`REEMPLAZA...`) para no romper el HTML. Lección: define `CDN_URL` o no añadas el script al build.
- **Imagen fuera de `/images/` o con acentos.** El Zod `imagePath` (`^/images/`) falla el build; los acentos rompen rutas en algunos hosts. Lección: `/images/...`, kebab-case sin acentos.
- **JPG pesado como hero.** Mata el LCP y Lighthouse. Lección: AVIF dimensionado + `preload` del hero.
- **Sin `width`/`height`.** CLS alto (layout salta al cargar). Lección: dimensiones explícitas siempre.
- **OG image inexistente o hotlinkeada.** Rompe los previews sociales y QA lo bloquea. Lección: genera la OG 1200×630 propia y referénciala en `SITE.defaultImage`.
- **`alt` vacío o "imagen de…".** Falla de accesibilidad y SEO de imágenes. Lección: `alt` descriptivo con keyword natural.
