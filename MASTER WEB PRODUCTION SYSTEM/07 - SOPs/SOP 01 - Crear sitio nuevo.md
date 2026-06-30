# SOP 01 — Crear sitio nuevo
> Propósito: levantar un proyecto Astro 6 SSG desde cero con el scaffold canónico y `site.ts` lleno con datos reales, listo para construir contenido.

Estación 1 (Scaffold) de la [[01 - La Fabrica de Sitios]]. Entrada: arquetipo elegido. Salida: proyecto Astro inicial + `src/config/site.ts` lleno + primer build verde.

## Objetivo
Tener un repositorio Astro 6 funcional, con el contrato canónico (`SITE`/`CONTACT`/`TAXONOMY`/`WA_MESSAGES`/`waUrl()`), los layouts y componentes montados, los tokens del cliente y un `npm run build` que pasa — **sin un solo placeholder `{{...}}` en datos de negocio**.

## Prerrequisitos
- Brief del cliente con datos **reales**: nombre comercial, dominio, teléfono, WhatsApp (E.164), email, NAP, horario, categorías/servicios.
- Arquetipo decidido con [[01 - Selector de Arquetipo]] (A/B/C/D + sitemap de URLs + `pageType` por página).
- Node ≥ 22.12.0 (`node -v`).
- Rutas del Vault a mano:
  - Scaffold: `08 - Biblioteca Plantillas/_scaffold/` (`site.ts`, `content.config.ts`, `astro.config.mjs`, `package.json`, `tsconfig.json`, `.gitignore`, `tokens.css`).
  - Layouts: `08 - Biblioteca Plantillas/_layouts/` (`BaseLayout`, `PageLayout`, `ProductLayout`, `ServiceLayout`, `ArticleLayout`).
  - SEO: `08 - Biblioteca Plantillas/_seo/` (`seo.ts`, `robots.txt`, `rewrite-cdn.mjs`).
  - Componentes: `09 - Biblioteca Componentes/_src/` (ver [[09 - Biblioteca Componentes/00 - Inventario|Inventario]]).

## Pasos

1. **Crea el proyecto Astro vacío** (plantilla mínima, sin demo):
   ```bash
   npm create astro@latest mi-cliente -- --template minimal --no-install --no-git --skip-houston
   cd mi-cliente
   ```

2. **Sobrescribe la config raíz con el scaffold canónico.** Copia estos archivos de `08 - Biblioteca Plantillas/_scaffold/` a la raíz del proyecto, reemplazando los que generó Astro:
   ```bash
   cp ".../_scaffold/package.json"     ./package.json
   cp ".../_scaffold/astro.config.mjs" ./astro.config.mjs
   cp ".../_scaffold/tsconfig.json"    ./tsconfig.json
   cp ".../_scaffold/.gitignore"       ./.gitignore
   cp ".../_scaffold/content.config.ts" ./src/content.config.ts
   cp ".../_scaffold/site.ts"          ./src/config/site.ts
   cp ".../_scaffold/tokens.css"       ./src/styles/global.css
   ```
   - El `package.json` ya trae las deps canónicas (`astro ^6.1.1`, `@astrojs/sitemap`, `@astrojs/check`, `@astrojs/mdx ^6`, `typescript`) y el script `"build": "astro check && astro build"`.
   - El `tokens.css` es la **fuente única** de tokens; va a `src/styles/global.css` (regla C2: una sola definición de `:root`).

3. **Monta layouts, componentes y la librería SEO** en su lugar canónico (ver [[_scaffold/estructura-carpetas]]):
   ```bash
   mkdir -p src/layouts src/components src/lib src/config
   cp ".../_layouts/"*.astro      src/layouts/
   cp ".../09 - Biblioteca Componentes/_src/"*.astro src/components/
   cp ".../09 - Biblioteca Componentes/_src/cta-presets.ts" src/config/   # va en src/config/ (junto a site.ts), NO en components
   cp ".../_seo/seo.ts"           src/lib/seo.ts
   cp ".../_seo/robots.txt"       public/robots.txt
   mkdir -p scripts && cp ".../_seo/rewrite-cdn.mjs" scripts/rewrite-cdn.mjs
   ```
   Componentes mínimos: `Header.astro`, `Footer.astro`, `TopBar.astro`, `Hero.astro`, `ProductCard.astro`, `ServiceCard.astro`, `CTABanner.astro`, `WhatsAppFloat.astro`, `Breadcrumbs.astro`, `FAQAccordion.astro`, `SectionHeading.astro`, `RelatedLinks.astro`. Nota: `cta-presets.ts` es un módulo de config (no un componente) — va en `src/config/`. Al copiar el `.astro` de componentes con `*.astro` no se incluye, por eso se copia aparte.

4. **Alias de imports — YA VIENEN EN EL SCAFFOLD (no hay que escribirlos a mano).** El `tsconfig.json` del scaffold define los `paths` y `astro.config.mjs` define el `resolve.alias` ESPEJO (ambos son necesarios: tsconfig resuelve los tipos en el editor/`astro check`; Vite resuelve el bundle en `astro build`). Layouts, páginas y componentes importan con estos alias, así funcionan a **cualquier profundidad de ruta** (nada de `../../` frágiles). Solo **verifica** que estén presentes:
   ```jsonc
   // tsconfig.json (scaffold) — compilerOptions.paths
   "paths": {
     "@config/*":     ["src/config/*"],
     "@lib/*":        ["src/lib/*"],
     "@layouts/*":    ["src/layouts/*"],
     "@components/*": ["src/components/*"],
     "@content/*":    ["src/content/*"]
   }
   ```
   ```js
   // astro.config.mjs (scaffold) — vite.resolve.alias (DEBE coincidir, sin el /*)
   resolve: { alias: { '@config': r('./src/config'), '@lib': r('./src/lib'),
     '@layouts': r('./src/layouts'), '@components': r('./src/components'), '@content': r('./src/content') } }
   ```
   ⚠️ Si añades un alias nuevo, añádelo en **los dos** archivos o el build romperá con `Could not resolve …` aunque el editor no marque error.

5. **Llena `src/config/site.ts` con datos REALES — cero placeholders.** Reemplaza **cada** marcador `{{...}}`. Reglas del scaffold:
   - `whatsapp` = E.164 **sin** `+` (lo exige `wa.me`): `525562759624`.
   - `phoneE164` = E.164 **con** `+`: `+525562759624`.
   - `SITE.url` sin slash final; `lang: 'es-MX'`.
   - `description` 140–160 chars (qué vende + diferenciador + zona).
   - `geo.lat`/`geo.lng` reales (Google Maps → clic derecho → copiar). **Si no hay dato, deja el marcador**, NO inventes.
   - `TAXONOMY.categories[].slug` en **kebab-case sin acentos** ([[04 - Convenciones]]); cada `slug` debe coincidir con los enums de `content.config.ts` y con la estructura de `/pages`.
   - `WA_MESSAGES` requiere `default` y `cotizar` (los usan `WhatsAppFloat` y el CTA global). El scaffold también incluye `cotizacion` (alias de `cotizar`) porque el `Header`/`Footer`/`cta-presets` lo consumen por ese nombre — mantenlos con el mismo texto.
   - **Contrato superset:** `site.ts` es la FUENTE ÚNICA que satisface a `lib/seo.ts` Y a los componentes. Trae sub-objetos que el `<head>`/JSON-LD consumen: `SITE.seo`, `SITE.locale`, `SITE.organization`, `SITE.business`, `SITE.social`, `SITE.searchUrl`, `SITE.trailingSlash`, `SITE.allowSelfReviews` (default `false`), `CONTACT.phoneRaw`, `CONTACT.schedule`, `SITE.tagline`, y los alias planos de taxonomía (`PRODUCT_CATEGORIES`, `SERVICES`, `SECTORS`, `COVERAGE_STATES`) + `BRANCHES`. Rellena sus `{{...}}` o déjalos; si **no** defines `SITE.business`, no se emite `LocalBusiness` (coherente para negocios sin sede). NO inventes reseñas: `allowSelfReviews` queda en `false` salvo reseñas reales verificables.

6. **Sincroniza los enums de `src/content.config.ts`** con `TAXONOMY`: sustituye `{{CAT_1_SLUG}}` etc. en `PRODUCT_CATEGORIES`, `SERVICE_CATEGORIES`, `ARTICLE_CATEGORIES`. **Borra las colecciones que el proyecto no use** (un sitio A no necesita `zonas`; uno sin blog quita `articulos`). Mantén `articulos` solo si hay blog (y entonces añade `@astrojs/mdx`, ver paso 9).

7. **Pon el dominio real en `astro.config.mjs`**: reemplaza `https://{{DOMAIN}}` en `site:` y en los regex de `serialize`/`filter`. `output: 'static'`, `trailingSlash: 'never'` y `@astrojs/sitemap` ya vienen fijados.

8. **Define el color de marca** en `src/styles/global.css`: cambia `--c-primary`, `--c-primary-light`, `--c-primary-dark` (rojo `#d32f2f` por defecto). No dupliques tokens en ningún `<style is:global>` (C2).

9. **MDX — YA VIENE EN EL SCAFFOLD.** El blog vive en colección `.mdx` (regla D3), así que `@astrojs/mdx@^6` ya está en `package.json` y registrado en `astro.config.mjs` (`integrations: [sitemap(...), mdx()]`). ⚠️ **NO uses `npx astro add mdx`**: instala `@astrojs/mdx@^4` (peer `astro@^5`) y **ROMPE** con `astro@^6`. La versión correcta es `@astrojs/mdx@^6` (peer `astro@^6.4`), que es la que trae el scaffold. Si el proyecto **no** tiene blog, puedes quitar `mdx()` de `astro.config.mjs` y la dep del `package.json`.

10. **Instala y haz el primer build:**
    ```bash
    npm install
    npm run dev          # smoke test visual en localhost:4321
    npm run build        # corre astro check + astro build (debe terminar verde)
    npm run preview      # sirve dist/ como en producción
    ```

11. **Inicializa git y primer commit** (un repo por proyecto bajo la cuenta `Origenlab`, [[03 - Reglas Globales]]):
    ```bash
    git init && git add -A && git commit -m "chore: scaffold inicial Astro 6 (Vault OrigenLab)"
    ```

12. **Crea las páginas de entrada** copiando las plantillas que toque (no las escribas a mano):
    - Home → `08/pagina-home.astro` a `src/pages/index.astro` (ver [[SOP 05 - Crear landing de conversion]] para el hero/CTA).
    - Categorías → [[SOP 02 - Crear una categoria]]. Fichas → [[SOP 03 - Crear producto o servicio]]. Blog → [[SOP 04 - Crear articulo SEO]].

## Checklist de verificación
- [ ] `node -v` ≥ 22.12.0.
- [ ] `src/config/site.ts` sin un solo `{{...}}` en datos de negocio (nombre, dominio, teléfono, WhatsApp, NAP, horario).
- [ ] `whatsapp` sin `+`, `phoneE164` con `+`; `waUrl()` arma `https://wa.me/<numero>?text=...` correcto.
- [ ] Enums de `content.config.ts` == `TAXONOMY` (mismos slugs, sin acentos); colecciones no usadas eliminadas.
- [ ] `astro.config.mjs` con `site` real, `output:'static'`, `trailingSlash:'never'`, sitemap activo.
- [ ] `tsconfig.json` con `paths` (`@config/* @lib/* @layouts/* @components/* @content/*`) Y `astro.config.mjs` con el `resolve.alias` espejo (ambos vienen en el scaffold).
- [ ] `@astrojs/mdx ^6` en `package.json` + `mdx()` en `astro.config.mjs` (si hay blog). NUNCA `@astrojs/mdx@4` con `astro@6`.
- [ ] Tokens definidos en **un solo** `src/styles/global.css`.
- [ ] `npm run build` termina sin errores ni warnings de colecciones; `preview` levanta el sitio.
- [ ] `git init` + primer commit hecho (repo bajo `Origenlab`).
- [ ] Sin `node_modules/`, `dist/` ni `.env` versionados (los cubre el `.gitignore` del scaffold).

## Errores comunes
- **WhatsApp/teléfono hardcodeado o inventado.** Falla real en BRINCOLINS/MESASPICNIC/MANEXT (WhatsApp hardcodeado ×6). Lección: todo número vive en `site.ts` y sale por `waUrl()`/`telUrl()`; nunca `55-1234-5678` disfrazado de real (regla A4/D4).
- **`whatsapp` con `+`.** `wa.me` lo rechaza y el botón abre un chat vacío. Va **sin** `+`.
- **Doble fuente de tokens CSS.** Anti-patrón C2 (PROYECTORED tenía `global.css` *y* `Base.astro`; MANEXT 4 bloques `:root`). Lección: una sola `:root` en `global.css`.
- **`category` como `z.string()` libre en colecciones.** Generó "Guias" vs "Guías" como categorías distintas en INFLAPY → SEO fragmentado. Lección: enum cerrado, slug sin acentos, sincronizado con `TAXONOMY`.
- **Dejar `dist/` o `node_modules/` en el repo.** Anti-patrón E6 (MESASPICNIC ~179 archivos de build, RESOIL `_html_backup` 8.3M). El `.gitignore` del scaffold ya lo previene — no lo edites para "incluir el build".
- **Repo en cuenta personal.** Desvío FIREFIGHTERSMX. Lección: un repo por proyecto bajo `Origenlab`.
- **Saltar el `npm run build` inicial.** Si el scaffold no compila en limpio, el problema solo crece al añadir contenido. El build es bloqueante desde el día 1.
