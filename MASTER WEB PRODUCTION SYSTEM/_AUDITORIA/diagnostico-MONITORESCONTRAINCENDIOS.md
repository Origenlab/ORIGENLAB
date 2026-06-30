# Diagnóstico — MONITORESCONTRAINCENDIOS

> Propósito: Sitio de la marca AQUEON (monitorescontraincendios.com) especializado en monitores contra incendios industriales en México — catálogo de monitores (fijos/portátiles/automáticos/boquillas), industrias atendidas, servicios y blog técnico. Migrado de landing estática a Astro multipágina. Sin Tailwind: CSS vanilla dark.

## Identidad
- **Negocio / dominio:** marca "AQUEON" / "AQUEON México" — `https://monitorescontraincendios.com` (`astro.config.mjs` `site`, `src/layouts/Base.astro`). CDMX (Reforma 505 en schema). Especialista en monitores (cañones) contra incendios industriales.
- **Tipo:** Catálogo / proveedor técnico industrial de nicho (un solo tipo de producto: monitores + accesorios), conversión por WhatsApp/contacto. Sin carrito.
- **ARQUETIPO tentativo:** **A (catálogo de producto / servicio técnico)**, nicho industrial profundo. Justificación: catálogo `productos.ts` (monitores fijos/portátiles/automáticos/boquillas con specs), páginas por **industria** (petróleo-gas, petroquímica, energía, minería, manufactura, aviación, bomberos) y por **servicio** (diseño-ingeniería, instalación, mantenimiento prev/correctivo, capacitación, consultoría), schema `Organization`+`LocalBusiness`. Módulo D secundario (blog 20 posts muy técnicos: NFPA 15/25, cálculo hidráulico, FM/UL). Evidencia: `src/data/{productos,industrias,servicios}.ts`, `src/pages/` (7 industrias + 6 servicios + 3 tipos de monitor).
- **Estado:** **vivo, en reestructuración activa**. Origen documentado en `README.md`: copia local de sitio estático descargado de Cloudflare (2026-06-07), luego **migrado a Astro multipágina**. `CHECKLIST-REESTRUCTURA-PAGINAS.md` y `ESTUDIO-SEO-COMPETENCIA-2026.md` (16-jun) = trabajo en curso. Datos de contacto aún placeholder.

## Stack
- **Astro:** `^5.12.0` (`package.json`). `trailingSlash: 'ignore'`, `compressHTML: true`, `inlineStylesheets: 'auto'`.
- **Integrations:** **solo `@astrojs/sitemap ^3.4.1`** (sin serialize/filter — config mínima).
- **CSS framework / tokens:** **CSS vanilla — sin Tailwind** (confirmado: sin tailwind/postcss). Design system en `src/styles/global.css`: tema **dark** (`--bg-0:#0a0a0a` → `--surface`), acento **rojo** `--red:#e02424` (+ dark/hover/soft/glow + gradientes `--grad-red`), texto AA sobre negro (`--text-strong/body/muted`), bordes sutiles rgba, `--whatsapp:#25d366`. **Escala tipográfica fluida** completa con `clamp()` (`--text-xs`..`--text-5xl`) + espaciado `--space-*`. Fuentes **self-hosted** Inter + Space Grotesk (woff2 con `unicode-range` por subset — migradas de `cf-fonts/` a `/public/fonts/`).
- **JS de cliente:** `src/scripts/menu.js` (toggle de menú móvil).
- **Adapter / output:** sin adapter → **estático**.
- **Deploy detectado:** **Cloudflare Pages** — `package.json` script `deploy: astro build && npx wrangler pages deploy dist --project-name=monitorescontraincendios --branch=production`; `.wrangler/` presente. **Único del cluster con deploy Cloudflare como método primario** (los demás GitHub Pages). **Sin `.github/workflows/`** → deploy manual vía wrangler. Repo `github.com/Origenlab/MONITORESCONTRAINCENDIOS.git`.

## Estructura de carpetas (resumen)
```
src/
  components/{blog,global,sections}/   (sin ui/)
  content/{blog(20)} + content.config.ts   (1 sola colección)
  data/{productos, industrias, servicios, testimonios}.ts   (SSOT catálogo)
  layouts/Base.astro    (único layout)
  pages/{index, 404, 500, blog/[...slug]+index,
         productos.astro, monitores-{fijos,portatiles,automaticos}.astro, boquillas.astro,
         industrias.astro + 7 industrias (petroleo-gas, petroquimica, generacion-de-energia,
           manufactura, mineria, aviacion, bomberos),
         servicios.astro + 6 servicios (diseno-ingenieria, instalacion,
           mantenimiento-preventivo/correctivo, capacitacion, consultoria-normativa),
         nosotros, contacto, recursos, aviso-de-privacidad, terminos-y-condiciones}
  scripts/menu.js · styles/global.css
public/ (robots.txt ✅, fonts/, images/, favicon, manifest)
```
Raíz: `README.md` (origen del proyecto), `CHECKLIST-REESTRUCTURA-PAGINAS.md`, `ESTUDIO-SEO-COMPETENCIA-2026.md`.

## Layouts — jerarquía
- **`Base.astro`** (único, todas las páginas) — props `title, description, keywords?, ogImage (def imagen refinería .webp)`. **No usa componente SEO separado** — inyecta todo en `<head>`: title (literal, sin sufijo automático), description, keywords opcional, robots, canonical, geo CDMX (`geo.position 19.43/-99.13`, ICBM), OG (image 1200×630), Twitter. **JSON-LD hardcodeado:** `Organization` (AQUEON, dirección Reforma 505) + `LocalBusiness` + **`BreadcrumbList` automático por ruta** (mapa `l3Breadcrumbs` con 16 slugs → padre Productos/Industrias/Servicios). `<body>`: skip-link, `Header`, `<main>`, `NavPrefooter`, `Footer`, `WhatsAppButton`, import `menu.js`. lang `es` (no `es-MX`).
- **Sin sub-layouts** — páginas componen secciones sobre Base.
- Carga **Font Awesome desde CDN** (`cdnjs`) en el `<head>` — render-blocking externo.

## Componentes — inventario
| Componente | Ruta | Props | Dónde se usa |
|---|---|---|---|
| Header / Footer / TopBar / NavPrefooter / WhatsAppButton | src/components/global/*.astro | — | Base layout |
| HeroIndex, NavRapidaIndex, ProductosIndex, IndustriasIndex, ServiciosIndex, NosotrosIndex, MarcasCertificaciones, PorQueAqueon, TestimoniosIndex, FeaturesIndex, FaqContactSplit | src/components/sections/*.astro (11) | `pages/index.astro` |
| BlogSidebar | src/components/blog/BlogSidebar.astro | — | blog |

**Sin carpeta `ui/`** (sin componentes atómicos). Patrón = secciones de homepage en `sections/` + páginas interiores que renderizan datos de `src/data/*.ts` con markup propio. Inventario de componentes **el más reducido del cluster** (las páginas de producto/industria/servicio son `.astro` individuales que leen los data files, no componentes parametrizados).

## Content Collections / esquemas / taxonomías
`src/content.config.ts` (**Content Layer API**, glob loader). **1 sola colección:**
- **`blog`** (20): `title, description, pubDate (coerce.date), category, image?`. Schema mínimo (sin tags/autor/draft) — el más simple del cluster.
- **Catálogo / negocio en `src/data/*.ts`** (SSOT, no colección):
  - `productos.ts` — interfaces `Producto`/`CategoriaProductos`: `categorias[]` con `{id, titulo, descripcion, parrafos[], productos[{modelo, nombre, badge?, badgePremium?, placeholderIcon, placeholderLabel, descripcion, specs[{icon,text}], fichaTecnica}]}`. Comentario: "contenido textual exacto del index original" (migrado del HTML estático).
  - `industrias.ts`, `servicios.ts`, `testimonios.ts`.
- **Rutas dinámicas:** **solo `blog/[...slug]`** (params = `post.id`, schema `@graph` BlogPosting+BreadcrumbList). Todo lo demás son **páginas `.astro` estáticas individuales** (no hay `[producto]`/`[industria]`/`[servicio]` dinámicos — cada una es un archivo: `monitores-fijos.astro`, `petroleo-gas.astro`, etc.).

## SEO real
- **Metas:** en `Base.astro` (sin componente). Title **literal sin sufijo** (cada página debe pasar el title completo), description, keywords (legacy, presente), canonical, **geo CDMX**, OG + Twitter (image default = foto refinería). `og:locale es_MX` pero `<html lang="es">`.
- **Schema JSON-LD:** `Organization` + `LocalBusiness` (global en Base) + **`BreadcrumbList` auto-generado por ruta** (elegante: mapa `l3Breadcrumbs` resuelve padre/nombre por slug) + en blog **patrón `@graph`** (`BlogPosting` + `BreadcrumbList` en un solo bloque — el patrón de schema más limpio del cluster). 
- **Patrón de URLs:** plano, sin jerarquía de carpetas (`/monitores-fijos`, `/petroleo-gas`, `/instalacion`) — aunque el breadcrumb las agrupa lógicamente bajo Productos/Industrias/Servicios. `trailingSlash: ignore`.
- **Internal linking:** `NavPrefooter` global + `NavRapidaIndex` + breadcrumbs auto. `ESTUDIO-SEO-COMPETENCIA-2026.md` documenta estrategia.
- **Sitemap / robots:** sitemap ✅ (integración, config mínima). `public/robots.txt` ✅ correcto (Allow /, sitemap-index).

## Sistema de diseño
- **Tokens:** CSS-vars vanilla en `global.css` — tema dark industrial (`--bg-0:#0a0a0a`, `--surface`, acento `--red:#e02424` + glow/gradientes), texto contraste AA, **escala tipográfica fluida `clamp()`** (xs→5xl) y espaciado `--space-*`. Fuentes self-hosted Inter (body) + Space Grotesk (heading) con subsets `unicode-range`. **Mejor optimización de fuentes del cluster** (woff2 subseteado, self-hosted).
- **UI base:** sin componentes atómicos; clases CSS globales.
- **Hero/cards/CTA/WhatsApp/breadcrumbs:** `HeroIndex`, cards de producto (render desde `productos.ts`), `FaqContactSplit` (CTA), **`WhatsAppButton` flotante** (`--whatsapp` token), `BreadcrumbList` automático (schema; componente visual no confirmado).

## Convenciones de nombres/archivos
- Componentes **PascalCase** con sufijo `*Index` (homepage) — patrón compartido con LGA.
- Datos en `src/data/*.ts` con interfaces TS + JSDoc (data-driven, comentarios "contenido exacto del index original").
- Páginas interiores en **kebab-case plano** (un `.astro` por producto/industria/servicio) — sin rutas dinámicas → más archivos, menos abstracción.
- Contenido frontmatter en **inglés** (`title`, `description`, `category`).
- `lang="es"` (no `es-MX` como el resto).

## Flujos / procesos (implícitos)
- **Origen del proyecto (documentado):** sitio estático en Cloudflare → descarga/limpieza (quitar rocket-loader, desofuscar emails) → migración a Astro multipágina (`README.md`).
- **Reestructura activa:** `CHECKLIST-REESTRUCTURA-PAGINAS.md` (plan de páginas) + `ESTUDIO-SEO-COMPETENCIA-2026.md` (research SEO) guían la expansión de páginas por industria/servicio.
- **Cotización:** `FaqContactSplit` + `WhatsAppButton` → lead WhatsApp.
- **Deploy:** `npm run deploy` → `wrangler pages deploy` (manual).

## Integraciones
- **Cloudflare:** ✅ evidencia fuerte — script `deploy` con `wrangler pages deploy ... --project-name=monitorescontraincendios`, `.wrangler/` presente. **Deploy primario del proyecto.**
- **GitHub Actions:** ❌ ausente (sin `.github/`) → no hay CI/CD automático; deploy manual.
- **n8n / fal.ai / Brevo:** ⚠️ HUECO — sin evidencia. Conversión = WhatsApp directo. Sin `.env`.
- **Otros:** Font Awesome CDN (cdnjs) — dependencia externa render-blocking.

## Clasificación

### ✅ Funciona
- BreadcrumbList JSON-LD generado automáticamente por ruta (mapa `l3Breadcrumbs`) + patrón `@graph` en blog — el sistema de schema más limpio y mantenible del cluster — `src/layouts/Base.astro` líneas 27–56, `src/pages/blog/[...slug].astro` línea 21.
- Fuentes self-hosted Inter + Space Grotesk con subsets `unicode-range` (woff2) — mejor performance de fuentes del cluster, sin dependencia de Google Fonts CDN — `src/styles/global.css`.
- Design system CSS vanilla con escala tipográfica fluida `clamp()` completa y tema dark coherente — `src/styles/global.css` (líneas 118–172).
- Catálogo data-driven tipado (`productos.ts` con `CategoriaProductos`/`Producto`/`ProductSpec`) + blog técnico de nicho profundo (NFPA 15/25, FM/UL) — `src/data/productos.ts`, `src/content/blog/`.

### ❌ Falla
- **Datos de contacto / dominio inconsistentes (placeholder):** teléfono `+52-55-1234-5678` en Organization y LocalBusiness; `README` advierte que canonical/OG del sitio original apuntaban a `aqueon.com.mx` (≠ monitorescontraincendios.com) y redes a `#` — `src/layouts/Base.astro` líneas 78, 93. Daña SEO local/confianza.
- **Sin CI/CD:** deploy 100% manual vía `wrangler` (sin `.github/workflows/`) → no hay build/deploy automático ni gate; riesgo de despliegues inconsistentes — `package.json` script `deploy`.
- **Documentación (README) desactualizada:** lista como "404 pendientes" páginas (`/blog`, `/recursos`, `/aviso-de-privacidad`, `/terminos-y-condiciones`) que YA existen como `.astro` tras la migración → el README describe el estado estático antiguo, no el Astro actual; induce a error sobre el estado real — `README.md` vs `src/pages/`.

### 🤖 Automatizable
- Páginas de producto/industria/servicio son archivos `.astro` casi idénticos que leen `src/data/*.ts`; convertirlas a **rutas dinámicas `[industria]`/`[servicio]`/`[producto]`** generaría las ~16 páginas desde los data files (menos duplicación, mismo patrón que ya tiene FFMX/FFSMX). El `l3Breadcrumbs` ya está mapeado para ello.

### 📐 Estandarizable
- El patrón de schema (Organization+LocalBusiness global + BreadcrumbList automático por mapa de rutas + `@graph` en blog) es el **modelo canónico de SEO técnico** a propagar al cluster. También la estrategia de fuentes self-hosted con `unicode-range` debería ser estándar (vs Google Fonts CDN de FFCOMMX/FFSMX/LGA).

## ⚠️ HUECOS
- **HUECO (contacto/dominio real):** falta tel/email reales y resolver la estrategia de dominio (aqueon.com.mx vs monitorescontraincendios.com) que el README marca como pendiente. Bloquea SEO local.
- **HUECO (CI/CD):** no hay workflow de GitHub; definir si Cloudflare Pages debe conectarse a git para deploy automático o si el deploy manual es intencional.
- **HUECO (README obsoleto):** actualizar `README.md` al estado Astro multipágina actual (los 404 listados ya están resueltos).
- **HUECO (rutas dinámicas vs estáticas):** indeterminado si la proliferación de `.astro` individuales es temporal (migración) o el modelo final; `CHECKLIST-REESTRUCTURA-PAGINAS.md` sugiere reestructura en curso.
- **HUECO (relación con LGA):** la marca AQUEON aparece también en artículos en la raíz de LGACONTRAINCENDIOS (`AQUEON_Articulo_*.md`) → contenido AQUEON compartido entre proyectos sin gobernanza documentada.
- **Seguridad:** ✅ sin secretos expuestos. `.git/config` solo URL HTTPS pública; grep `gho_/ghp_/sk-/api_key/SECRET` en `src` → sin coincidencias. `.wrangler/` local no contiene credenciales en el árbol revisado (estado de wrangler, no tokens). Email `contacto@aqueon.com.mx` es público de negocio, no secreto.
