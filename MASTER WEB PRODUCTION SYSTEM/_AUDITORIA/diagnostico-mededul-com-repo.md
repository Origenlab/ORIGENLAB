# Diagnóstico — mededul-com-repo

> Propósito: Repositorio git OFICIAL del sitio MEDEDUL (GitHub Origenlab/mededul.com) — misma base de código que MEDEDULCOM/mededul-site, pero en un estado divergente. Renta de mesas de dulces/candy bar para eventos en CDMX/Edomex; Astro 5 + Markdown.

## Identidad

- **Negocio:** MEDEDUL — Mesas de Dulces & Candy Bar Premium para eventos en CDMX y Edomex. Idéntico a MEDEDULCOM. (Evidencia: `mededul-com-repo/src/data/site.ts` L5-13, `package.json`.)
- **Tipo:** Sitio de servicios/renta para eventos (catálogo de servicios + paquetes + landings locales + casos + blog SEO), SSG. Idioma español de México.
- **ARQUETIPO: B (renta/eventos), con D (contenido/directorio local) — idéntico a MEDEDULCOM.** Justificación: misma estructura de colecciones (services/packages/events con `priceFrom`+schema Product/Offer = renta de eventos B; locations+blog = SEO local/contenido D). La diferencia con `mededul-site` es de **volumen de contenido**, no de arquetipo.
- **Estado:** Funcional pero **menos completo que `mededul-site`** y con una **regresión de configuración en el HEAD** (ver §Stack y §HUECOS). `.astro/` cache presente. Working tree limpio (`git status` sin cambios).
- **Relación con proyectos hermanos (LOS TRES "mededul") — ESTE ES EL ANÁLISIS COMPARATIVO PEDIDO:**
  - **¿Es duplicado/variante?** → **VARIANTE (mismo proyecto, dos estados divergentes), NO duplicado exacto.** `mededul-com-repo` y `MEDEDULCOM/mededul-site` comparten ancestro común y son byte-idénticos en `docs/` (4 archivos), `README.md`, `src/data/site.ts`, `package.json`, `tsconfig.json`. Divergen en contenido y algunos componentes/páginas.
  - **mededul-com-repo (ESTE) = el repositorio git** (remote `https://github.com/Origenlab/mededul.com.git`, branch `main`, 8 commits). Es la **fuente de verdad versionada**.
  - **mededul-site = working copy SIN git** que es **superconjunto de contenido editorial** (más cobertura y casos) pero le falta 1 blog post que sí está en el repo.
  - **Inventario comparado de contenido:**
    | Colección | mededul-com-repo (git) | mededul-site (working copy) |
    |---|---|---|
    | services | 8 | 8 |
    | events | 5 | 5 |
    | packages | 4 | 4 |
    | **locations** | **4** (interlomas, lomas-de-chapultepec, polanco, santa-fe) | **20** |
    | **cases** | **2** (boda-polanco, xv-interlomas) | **7** |
    | **blog** | **20** (incluye `ideas-mesa-dulces-boda-2026.md`) | **19** (NO tiene ese post) |
    | testimonials | 12 | 12 |
  - **Componentes:** mededul-site tiene 2 componentes extra que el repo NO tiene: `AboutMededul.astro` y `L2Interlink.astro`. Múltiples layouts/páginas/componentes difieren (Header, Footer, Hero, Breadcrumbs, index, varios layouts) — mededul-site es la versión rediseñada más reciente.
  - **Conclusión:** son **el mismo sitio en dos ramas de trabajo desincronizadas**. El repo git tiene contenido más antiguo/reducido + 1 post que se perdió en la working copy; la working copy tiene el grueso del trabajo nuevo (16 cobertura, 5 casos, 2 componentes, rediseño) que **nunca se commiteó**. Hace falta una reconciliación/merge bidireccional. Ver `diagnostico-MEDEDULCOM.md`.
  - Comparte la arquitectura de fábrica ORIGENLAB con CABOIMAGE (Astro + content collections + WhatsApp + schema), divergiendo en CSS (MEDEDUL = tokens CSS vanilla; CABOIMAGE = Tailwind).

## Stack

- **Astro:** `^5.1.1` (`package.json`, idéntico a mededul-site).
- **Integraciones:** `@astrojs/mdx ^4.0.3`, `@astrojs/sitemap ^3.2.1` (activo, i18n es-MX), `@astrojs/rss ^4.0.10`, `sharp ^0.33.5`. (`astro.config.mjs`)
- **CSS:** vanilla con tokens — `src/styles/tokens.css` + `global.css`. Sin Tailwind.
- **Tipografía:** Fraunces + Plus Jakarta Sans (Google Fonts en BaseLayout).
- **Adapter / output:** SSG, `trailingSlash:'always'`, `build.format:'directory'`, `inlineStylesheets:'auto'`, `prefetch` viewport.
- **⚠️ REGRESIÓN DE CONFIG EN EL HEAD (hallazgo forense):** el historial git muestra dos commits de corrección — `1c75332 fix: corrige site URL de mesas-de-dulces.com a mededul.com` y `1ee8b3c fix: elimina cssMinify lightningcss que causaba error en build` — **pero el HEAD actual los tiene REVERTIDOS**. El último commit que tocó `astro.config.mjs` es `ffe3aad` ("16 articulos nuevos..."), que **re-introdujo el bloque `vite.build.cssMinify:'lightningcss'`** (HEAD L46-50) y **devolvió `site:'https://mesas-de-dulces.com'`** (HEAD L8) + `site.ts.url` también `mesas-de-dulces.com` (L10). Es decir: el repo oficial **vuelve a tener el minificador que "causaba error en build" y el dominio viejo**, deshaciendo el trabajo de los fixes. (Evidencia: `git log --oneline -- astro.config.mjs`; `git show HEAD:astro.config.mjs`; `git show 1ee8b3c`/`1c75332`.)
- **Deploy:** `docs/DEPLOY.md` (Vercel/Cloudflare/Netlify) — sin config de plataforma commiteada. `site` definitivo ambiguo por la regresión (`mededul.com` pretendido vs `mesas-de-dulces.com` efectivo en HEAD).

## Estructura de carpetas

Idéntica a mededul-site salvo el contenido (menos locations/cases) y la ausencia de `AboutMededul.astro`/`L2Interlink.astro`. Incluye `.git/` (el único de los tres con repo git en la propia carpeta del sitio).
```
mededul-com-repo/
├── .git/  (remote Origenlab/mededul.com, branch main)
├── astro.config.mjs, tsconfig.json, package.json, .env.example, README.md
├── public/, docs/(ARCHITECTURE,CONTENT,SEO,DEPLOY)
└── src/  content(config.ts + blog20+services8+events5+packages4+locations4+cases2+testimonials12)
        data(site.ts, nav.ts) · utils(schema.ts) · layouts(6) · components(15, sin About/L2Interlink) ·
        pages(index, nosotros, contacto, cotizar, faq, 404, legales, servicios/eventos/paquetes/cobertura/
              portafolio/blog [index+slug], robots.txt.ts, rss.xml.ts) · styles(tokens.css, global.css)
```

## Layouts — jerarquía

Idéntica estructura a MEDEDULCOM (algunos archivos difieren en contenido, ver diff): `BaseLayout` → `ServiceLayout` / `EventLayout` / `PackageLayout` / `LocationLayout` / `BlogLayout`. `BaseLayout` emite `localBusinessSchema()` global; cada layout añade su schema. (Evidencia: `src/layouts/*`; los archivos `BlogLayout/EventLayout/LocationLayout/PackageLayout/ServiceLayout.astro` difieren respecto a mededul-site según `diff -rq`.)

## Componentes — inventario

15 componentes (faltan los 2 que sí tiene mededul-site). Props equivalentes a MEDEDULCOM para los compartidos.

| Componente | Ruta | Props | Uso |
|---|---|---|---|
| SEO | `src/components/SEO.astro` | `title?,description?,image?,imageAlt?,type,canonical?,noindex?,publishedTime?,modifiedTime?,schema?` | Metadata/OG/Twitter/JSON-LD |
| TopBar | `src/components/TopBar.astro` | — | Barra contacto |
| Header | `src/components/Header.astro` | — | Nav (difiere de mededul-site) |
| Footer | `src/components/Footer.astro` | — | Footer (difiere de mededul-site) |
| WhatsAppFloat | `src/components/WhatsAppFloat.astro` | `message?` | CTA flotante WhatsApp |
| Hero | `src/components/Hero.astro` | `kicker?,title?,highlight?,italicWord?,subtitle?,lead?,showQuicklinks?` | Hero (difiere de mededul-site) |
| Quicklinks | `src/components/Quicklinks.astro` | (interface Props) | Accesos rápidos |
| ServiceCard | `src/components/ServiceCard.astro` | (interface Props) | Card servicio |
| PackageCard | `src/components/PackageCard.astro` | (interface Props) | Card paquete |
| EventCard | `src/components/EventCard.astro` | (interface Props) | Card evento |
| TestimonialCard | `src/components/TestimonialCard.astro` | (interface Props) | Card testimonio |
| FAQ | `src/components/FAQ.astro` | `items,kicker?,title?` | Acordeón FAQ → faqSchema |
| Breadcrumbs | `src/components/Breadcrumbs.astro` | `items: Crumb[]` | Migas de pan (difiere de mededul-site) |
| ContactForm | `src/components/ContactForm.astro` | (interface Props) | Form → abre WhatsApp `wa.me` (sin backend) |
| **(ausentes)** | — | — | `AboutMededul.astro` y `L2Interlink.astro` NO existen aquí (sí en mededul-site) |

## Content Collections / esquemas / taxonomías

`src/content/config.ts` con Zod + `reference()` — **misma definición de esquema que MEDEDULCOM** (diff de `config.ts` marca diferencia menor: el repo tuvo commit `739389e fix(schema): sube limite max de description en blog de 170 a 200` → en el repo el max de `blog.description` es probablemente 200 vs 170 en mededul-site). Colecciones: blog(20), services(8), events(5), packages(4), locations(**4**), cases(**2**), testimonials(12). Taxonomías idénticas (enums color/tier/state + grafo de references). Para el detalle completo de cada esquema, ver `diagnostico-MEDEDULCOM.md` §Content Collections (es el mismo `config.ts` modulo el límite de description).

## SEO real

- **Metas/Schema/URLs:** idénticos a MEDEDULCOM (mismo `SEO.astro` + `utils/schema.ts`): LocalBusiness global, Service+Offer/Product+Offer/FAQPage/Article+BreadcrumbList por tipo de página; URLs es-MX kebab-case `trailingSlash:'always'`.
- **Internal linking:** **más débil que mededul-site** porque carece de `L2Interlink.astro` (el hub editorial de recirculación entre L2). Sí tiene `Breadcrumbs`, `Quicklinks`, nav.
- **Sitemap/robots/RSS:** `@astrojs/sitemap` activo → `/sitemap-index.xml`; `robots.txt.ts` y `rss.xml.ts` dinámicos. ✅ Coherente.
- **⚠️ Dominio del sitemap/canónicos:** por la regresión, `site` en HEAD = `mesas-de-dulces.com`, así que sitemap y canónicos apuntan a ese dominio (no a `mededul.com` que pretendía el fix `1c75332`).

## Sistema de diseño

Idéntico a MEDEDULCOM: tokens en `src/styles/tokens.css` (paleta pink/turq/yellow/lavender/coral/mint + neutros + WhatsApp; tipografía Fraunces/Plus Jakarta Sans; escalas fluidas clamp; sombras/radios/spacing). `global.css` difiere ligeramente respecto a mededul-site (marcado en diff). Hero/cards/CTA/WhatsApp/Breadcrumbs presentes; **sin** L2Interlink.

## Convenciones

Idénticas a MEDEDULCOM: TS strict + alias `@/...`, URLs minúsculas sin acentos kebab-case `trailingSlash:'always'`, slugs desde filename, contenido Markdown/JSON validado por Zod, config en `data/site.ts`+`nav.ts`, Prettier + `astro check`. **Convención adicional observable:** uso disciplinado de Conventional Commits en git (`feat()`, `fix()`, `chore()`) — buena práctica de versionado.

## Flujos / procesos

- **Captación de lead:** WhatsApp-first, sin backend (igual que MEDEDULCOM): `ContactForm` arma mensaje y abre `wa.me`; `WhatsAppFloat` + CTAs `/cotizar/`.
- **Versionado:** repo git en GitHub Origenlab, branch `main`, historial de 8 commits (scaffold → fixes → rediseño home + 16 posts). Es el **canal de despliegue oficial** (un host conectado al repo desplegaría ESTE estado, no el de mededul-site).
- **Build:** `npm run build` → `dist/` — **con el riesgo del `cssMinify lightningcss` reintroducido** que un commit anterior marcó como causante de error de build.

## Integraciones

- **Cloudflare / n8n / fal.ai / Brevo / GitHub Actions:** ⚠️ HUECO — sin evidencia de config en el repo. `.env.example` prevé `RESEND_API_KEY` + `FORMS_ENDPOINT` (no cableados; form usa WhatsApp). Analytics (GA4/GTM/Pixel/Clarity) en `.env.example`, no inyectados.
- **GitHub:** ✅ ÚNICO de los tres con repositorio remoto confirmado (`github.com/Origenlab/mededul.com`). No se observa workflow CI en `.github/` (HUECO de CI, no de hosting de código).

## Documentación previa

`docs/` con 4 archivos **byte-idénticos a mededul-site**: `ARCHITECTURE.md` (stack/routing/layouts), `CONTENT.md` (edición Markdown), `SEO.md` (checklist + tabla schema), `DEPLOY.md` (Vercel/Cloudflare/Netlify/DNS/redirects). README idéntico. No hay vault Obsidian (eso es exclusivo de CABOIMAGE).

## Clasificación

### ✅ Lo bien hecho
- **Es el único con control de versiones propio** (git + remote GitHub Origenlab) e historial con Conventional Commits → trazabilidad. — `.git/`, `git log`
- Mismo modelo de datos sólido que MEDEDULCOM (content collections + Zod + `reference()`), sitemap/robots/RSS dinámicos coherentes. — `src/content/config.ts`, `src/pages/*`
- Conserva 1 blog post (`ideas-mesa-dulces-boda-2026.md`) que se perdió en la working copy mededul-site. — `src/content/blog/`
- Documentación `docs/` completa.

### ❌ Lo que falla / riesgos
- **Regresión de config en HEAD:** `cssMinify:'lightningcss'` (marcado como rompe-build por commit `1ee8b3c`) y `site:'mesas-de-dulces.com'` (revertido del fix `1c75332`) están de vuelta porque `ffe3aad` los reintrodujo → **el repo oficial puede no buildear y/o emite canónicos/sitemap con el dominio equivocado**. — `git show HEAD:astro.config.mjs` L8, L46-50.
- **Desincronizado del trabajo real:** le faltan 16 landings de cobertura, 5 casos, `AboutMededul` y `L2Interlink`, y el rediseño que vive en mededul-site → el sitio oficial es una versión inferior del producto. — `diff -rq` vs mededul-site.
- **Internal linking más pobre** (sin `L2Interlink`) que la working copy. — `src/components/` (ausente).
- **Captación 100% WhatsApp** sin captura de lead propia (Resend/FORMS_ENDPOINT no cableados). — `ContactForm.astro`.

### 🤖 Automatizable / oportunidad
- **Reconciliar repo ↔ working copy:** commitear el contenido/componentes nuevos de mededul-site a este repo y, a la vez, traer el post de blog que solo está aquí → un único `main` fuente de verdad.
- Re-aplicar (y proteger con CI) los fixes de `site URL` y `cssMinify` para que no se vuelvan a revertir en el siguiente rediseño.
- GitHub Actions para `astro check` + build en cada push (atraparía la regresión de lightningcss antes de desplegar).

### 📐 Patrón replicable (fábrica)
- Mismo kit canónico arquetipo B/D que MEDEDULCOM (colecciones + 6 layouts + `utils/schema.ts` + tokens CSS). — `src/`
- Flujo git con Conventional Commits como estándar de la fábrica (el resto de proyectos debería adoptarlo). — `git log`

## ⚠️ HUECOS

- **Regresión `astro.config.mjs` (CRÍTICO):** HEAD re-incluye `cssMinify lightningcss` y dominio `mesas-de-dulces.com`, deshaciendo dos fixes previos. Por qué: el commit de rediseño `ffe3aad` sobrescribió el archivo con una versión vieja. Confirmar dominio definitivo (`mededul.com` vs `mesas-de-dulces.com`) y si lightningcss buildea.
- **Divergencia de contenido vs mededul-site** (4 vs 20 cobertura, 2 vs 7 casos, faltan 2 componentes, falta rediseño) → el repo oficial está atrás del producto real. Requiere merge.
- **Integraciones (Cloudflare/n8n/fal.ai/Brevo/GHA):** sin evidencia. Resend/FORMS_ENDPOINT previstos, no cableados. Sin CI.
- **Deploy/plataforma final indefinida** (docs sugieren 3 opciones; sin config commiteada).
- **Seguridad:** ✅ Sin tokens/secretos expuestos (grep `gho_`/`sk-`/`api_key`/`SECRET`/`AIza`/`re_` → 0 en `src`/`.mjs`/`.env.example`). El `.git/` no se escaneó en profundidad por historial, pero `.env.example` solo contiene claves vacías y el WhatsApp hardcodeado es dato público.
