# Reglas Globales — decisiones canónicas
> Propósito: las decisiones que ya están tomadas para todo proyecto nuevo. No se re-discuten por proyecto.

Derivadas de [[patrones-canonicos]]. Cada regla cita su origen.

## Stack
- **Framework:** Astro 6.x SSG (`output: 'static'`, sin adapter). Pinnear versión. *(7 proyectos ya en Astro 6.)*
- **CSS:** vanilla con design tokens en `:root` ([[01 - Design Tokens|tokens.css]]). Una sola fuente. Tailwind 4 `@theme` solo si el proyecto ya lo usa. *(Gold: PROYECTORED, BOMBERO.)*
- **Integración base:** `@astrojs/sitemap` (obligatoria) + MDX si hay blog.
- **Tipografía:** self-hosted (Outfit headings / Inter body por defecto).

## Datos
- **SSoT:** `src/config/site.ts` con `SITE`, `CONTACT`, `TAXONOMY`, `WA_MESSAGES`, `waUrl()`. *(Origen PROYECTORED.)*
- **Entidades repetibles:** Content Collections con Zod `.strict()`, enums cerrados, imagen obligatoria. *(Origen MESECI/EVENTECH.)*
- **Nada hardcodeado** en `.astro` que pueda vivir en datos.

## SEO
- `src/lib/seo.ts` genera metas + JSON-LD por `pageType`. Breadcrumb una sola vez.
- **Cero datos estructurados fabricados** (regla dura).

## Conversión
- WhatsApp-first vía `waUrl()`. Tel secundario. Cero números hardcodeados.

## Deploy — ⚠️ DECISIÓN A CONFIRMAR
La falla #1 del ecosistema es el **drift Cloudflare↔GitHub Pages** (config de CF presente pero deploy a GH Pages → `_headers`/`_redirects`/CSP muertos). Regla: **un solo destino por proyecto.**
- **Recomendado: Cloudflare Pages** — respeta `_headers`/`_redirects`, habilita el Worker de captura de leads, alinea con el stack declarado. Ver [[SOP 07 - Deploy Cloudflare Pages]].
- Alternativa válida: GitHub Pages — entonces **borrar** todo config de Cloudflare del repo.
- Prohibido: tener ambos.

*(Frank: confirma el destino canónico. El Vault asume Cloudflare Pages hasta nueva indicación.)*

## Seguridad
- `.gitignore` estándar; **cero secretos** en el repo (ni en `.git/config`). Pre-commit que bloquea `gho_`, `sk-`, `api_key`, tokens. *(Falla crítica: RENTADEILUMINACION — rotar token.)*
- Un repo por proyecto bajo la cuenta `Origenlab` (no cuentas personales). *(Desvío: FIREFIGHTERSMX.)*

## Calidad
- CI bloqueante: `astro check` + lint SEO + link-checker + build. *(Origen FIREFIGHTERMX.)*
- Sin artefactos de build ni carpetas legacy versionadas. *(Falla: MESASPICNIC, RESOIL.)*

Convenciones de nombres y archivos: [[04 - Convenciones]].
