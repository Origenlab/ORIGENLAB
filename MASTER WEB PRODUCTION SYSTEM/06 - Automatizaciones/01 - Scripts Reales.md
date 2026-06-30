# 01 — Scripts Reales

> Propósito: las automatizaciones que **sí existen y corren** en repos del ecosistema — CDN post-build, validación MDX + git hooks, link-checker, gate SEO en CI y el comando de build canónico — cada una con su evidencia.

Todo lo de este documento es **REAL**: código verificado en proyectos auditados, citado por archivo. (Lo aspiracional —n8n/fal.ai/Brevo— está en los HUECOS de [[00 - Indice]].)

## 1. CDN de imágenes post-build — `rewrite-cdn.mjs` ✅

- **Qué hace:** tras `astro build`, recorre el HTML (y XML/CSS) de `dist/` y reescribe las referencias `/img/...` al CDN de imágenes (ExactDN/EWWW). Así el HTML se sirve apuntando ya al CDN —AVIF, srcset, cache inmutable— sin doble request y sin acoplar el código a la URL del CDN.
- **Estado:** **REAL**, canónico **E3** ([[patrones-canonicos]]) — ~8 proyectos lo usan (BOMBERO, EVENTECH, INFLAPY, MEDEDUL, GAMADEMEXICO, PROYECTORED, RENTADEILUMINACION, MESASPICNIC).
- **Evidencia:**
  - RENTADEILUMINACION: `npm run build` = `astro build && node scripts/rewrite-cdn.mjs`; `scripts/rewrite-cdn.mjs` reescribe `/img/` → ExactDN (`ek8wn5x6rqg.exactdn.com`) + preconnect en `BaseLayout`. Ver [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]].
  - GAMADEMEXICO / EVENTECH: variante como integración/plugin de build (`rehype-ewww-images.mjs`, `exactdnRewriter` inline en `astro.config.mjs`) + script inline cliente que reescribe `<img src^="/img/">` salvo en localhost. Verificado sirviendo AVIF en vivo (`AUDITORIA-CDN-EXACTDN-2026-06-15.md`). Ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- **Home canónico en el Vault:** `_seo/rewrite-cdn.mjs` (post-build), referenciado en [[02 - Arquitectura Astro/03 - Integraciones]]. La URL del CDN va en variable pública (`PUBLIC_EWWW_CDN_BASE`), nunca hardcodeada en lógica.

## 2. Validación de MDX + git hooks — `validate:mdx` ✅

- **Qué hace:** antes de build, valida los `.mdx` del blog: frontmatter correcto contra el esquema Zod y **props requeridos por cada componente MDX**. Si algo falla, **rompe el build** en vez de publicar contenido roto. Un git hook (pre-push) corre la misma validación localmente para que el error se cace antes del CI.
- **Estado:** **REAL**, canónico **E2**. Es el SOP de calidad de contenido más maduro del cluster.
- **Evidencia:**
  - MEDEDUL: `npm run build` corre `validate:mdx` **antes** de `astro build`; `npm run check` = `lint:content` + `lint:markdown` + `astro check`; `scripts/validate-mdx.mjs`, `validate-content.cjs`, `lint-markdown.cjs` + `install-hooks.sh`. Ver [[../_AUDITORIA/diagnostico-MEDEDUL]].
  - INFLAPY: `scripts/validate-blog.mjs` + `scripts/validate-mdx.mjs` (valida props requeridos por componente MDX) + pre-push hook (`install-hooks.sh`); `build = npm run validate && astro build`. Ver [[../_AUDITORIA/diagnostico-INFLAPY]].
- **Por qué es el guardián de la automatización:** es lo que hace fiable la colección `articulos` `.strict()` ([[05 - Produccion de Contenido/02 - Blog y Articulos SEO]]): un `.mdx` con un campo mal escrito o un componente sin sus props no llega a producción.

## 3. Link-checker ✅ (canónico)

- **Qué hace:** verifica que los enlaces internos del sitio resuelven (no hay rutas muertas) antes de publicar.
- **Estado:** **REAL como necesidad probada / canónico en el gate de CI.** El dolor que resuelve está documentado: RENTADEILUMINACION arregló **236 enlaces rotos** a mano y GAMADEMEXICO **~675 enlaces de breadcrumb + 263 de blog** (`ESTUDIO-INTEGRAL-SITIO-2026.md`) — fixes manuales masivos que un link-checker en CI convierte en un check bloqueante. Ver [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]] y [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- **Refuerzo de diseño:** el interlinking tipado por `reference()` (D1) ya rompe el build si un slug relacionado no existe; el link-checker cubre el resto de enlaces (href de contenido). Es parte del gate de CI canónico (punto 5).

## 4. Gate SEO en CI — origen FIREFIGHTERMX ✅

- **Qué hace:** una GitHub Action que, en cada push/PR, corre validación SEO **antes** de permitir el build: títulos ≤60, meta descriptions ≤160, schema/JSON-LD válido, sin metas duplicadas. Bloqueante.
- **Estado:** **REAL**, canónico **E2** — minoritario pero de alto valor. Origen **FIREFIGHTERMX** (validación SEO prebuild). GAMADEMEXICO tiene su variante (`ci.yml`: `astro check` + `content:blog:check` + `build`); EVENTECH/INFLAPY corren `_seocheck.{cjs,mjs}` / validadores. Ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- **Relación:** complementa a `seo.ts` (que **genera** el SEO correcto) verificándolo en CI. Detalle del SEO técnico en [[03 - SEO Master System/01 - SEO Tecnico]].

## 5. Build canónico — `astro check && astro build` ✅

- **Qué hace:** el comando de build del Vault corre **primero el type-check** (`astro check`, valida tipos y frontmatter de colecciones) y solo si pasa ejecuta `astro build`. Encadenado con los pasos anteriores, el `build` real del ecosistema es una cadena de gates.
- **Estado:** **REAL** y regla de [[03 - Reglas Globales]] §Calidad: *"CI bloqueante: `astro check` + lint SEO + link-checker + build."*
- **Forma canónica del pipeline (compuesta de lo real):**

```
1. astro check            # tipos + frontmatter de colecciones (Zod .strict())
2. validate:mdx           # frontmatter + props de componentes MDX  (MEDEDUL/INFLAPY)
3. lint SEO               # títulos ≤60, meta ≤160, schema válido   (FIREFIGHTERMX)
4. link-check             # enlaces internos resuelven              (evita los 236/675 fixes manuales)
5. astro build            # compila el sitio
6. rewrite-cdn.mjs        # post-build: /img/ → CDN                 (RENTADEILUMINACION/BOMBERO)
```

Los pasos 1–5 son **bloqueantes** (fallan el deploy); el 6 es post-build. Cada pieza existe en al menos un repo real; el Vault las estandariza como un solo gate de CI.

## Lo que NO está aquí

La **generación** automática de contenido e imágenes y el **backend de email/leads** no son scripts reales: son diseño objetivo. Viven, marcados como HUECO, en [[02 - Pipeline de Contenido n8n]], [[03 - Generacion de Imagenes fal.ai]] y [[04 - Email y Leads Brevo]].

## Evidencia (resumen)

- `rewrite-cdn.mjs`: RENTADEILUMINACION `scripts/rewrite-cdn.mjs` + `package.json` build; GAMADEMEXICO `rehype-ewww-images.mjs`. [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]], [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- `validate:mdx` + hooks: MEDEDUL `scripts/validate-mdx.mjs` + `install-hooks.sh`; INFLAPY `scripts/validate-blog.mjs` + `validate-mdx.mjs`. [[../_AUDITORIA/diagnostico-MEDEDUL]], [[../_AUDITORIA/diagnostico-INFLAPY]].
- Gate SEO / CI: FIREFIGHTERMX (validación SEO prebuild), GAMADEMEXICO `ci.yml`. [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- Patrón E2/E3: [[patrones-canonicos]] §E.
