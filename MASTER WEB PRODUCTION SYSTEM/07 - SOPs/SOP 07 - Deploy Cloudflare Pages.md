# SOP 07 — Deploy Cloudflare Pages
> Propósito: publicar el sitio en producción con un único destino de deploy (Cloudflare Pages), respetando `_headers`/`_redirects` y sin drift con GitHub Pages.

Estación 7 (Deploy) de la [[01 - La Fabrica de Sitios]]. Entrada: QA aprobado ([[SOP 10 - QA final y publicacion]]). Decisión canónica: **un solo destino por proyecto** ([[03 - Reglas Globales]] §Deploy). El Vault asume **Cloudflare Pages** hasta nueva indicación de Frank.

## Objetivo
Repo en GitHub bajo la cuenta `Origenlab`, conectado a Cloudflare Pages con build `astro build` → `dist/`, dominio + DNS configurados, `_headers`/`_redirects` activos, y verificación post-deploy — **sin dejar config muerta de GitHub Pages en paralelo**.

## Prerrequisitos
- [[SOP 10 - QA final y publicacion]] en verde (build local OK, `astro check` limpio, sin secretos).
- Cuenta de GitHub `Origenlab` y cuenta de Cloudflare con acceso al dominio.
- `astro.config.mjs` con `site` = dominio de producción ([[SOP 06 - SEO tecnico y schema]]).
- `.gitignore` del scaffold (ignora `dist/`, `node_modules/`, `.env`).

## Pasos

1. **Sube el repo a GitHub (cuenta `Origenlab`).** Un repo por proyecto:
   ```bash
   git add -A && git commit -m "chore: listo para deploy"
   gh repo create Origenlab/mi-cliente --private --source=. --remote=origin --push
   # o manual:
   # git remote add origin https://github.com/Origenlab/mi-cliente.git
   # git branch -M main && git push -u origin main
   ```
   Verifica que **no** subiste secretos:
   ```bash
   git grep -nE "gho_|ghp_|sk-|api_key|AKIA|BEGIN PRIVATE KEY" -- . ':!*.md' || echo "OK sin secretos"
   ```

2. **Crea los archivos que Cloudflare SÍ respeta** en `public/` (van al raíz de `dist/`):
   - `public/_headers` — cabeceras de seguridad/cache (origen `BOMBERO/public/_headers`):
     ```
     /*
       X-Content-Type-Options: nosniff
       Referrer-Policy: strict-origin-when-cross-origin
       X-Frame-Options: SAMEORIGIN
       Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
     /_astro/*
       Cache-Control: public, max-age=31536000, immutable
     /images/*
       Cache-Control: public, max-age=31536000, immutable
     ```
   - `public/_redirects` — 301 (una regla por línea):
     ```
     /pagina-vieja  /pagina-nueva  301
     ```
   *(GitHub Pages NO honra estos archivos — por eso el destino es Cloudflare.)*

3. **Conecta Cloudflare Pages al repo.** En el dashboard: **Workers & Pages → Create → Pages → Connect to Git** → autoriza `Origenlab` → elige el repo.

4. **Configura el build:**
   - **Framework preset:** Astro.
   - **Build command:** `npm run build` (corre `astro check && astro build`; si usas CDN, `astro build && node scripts/rewrite-cdn.mjs`).
   - **Build output directory:** `dist`.
   - **Root directory:** `/` (o subcarpeta si el repo es monorepo).
   - **Node version:** define `NODE_VERSION = 22` en variables (el scaffold exige `>=22.12.0`).

5. **Variables de entorno.** Añádelas en **Settings → Environment variables** (Production y Preview), **nunca** en el repo:
   - `NODE_VERSION = 22`.
   - `CDN_URL = https://tu-cdn.exactdn.com` (solo si usas `rewrite-cdn.mjs`).
   - Cualquier token/secret se referencia aquí, jamás en `astro.config`/código (anti-patrón E6: token expuesto en RENTADEILUMINACION → rotar).

6. **Primer deploy.** Guarda y deja correr el build. Cloudflare publica en `https://mi-cliente.pages.dev`. Revisa el log: `astro check` y `astro build` deben pasar.

7. **Dominio + DNS.** En **Custom domains → Set up a custom domain** añade `midominio.com.mx`:
   - Si el DNS está en Cloudflare: el registro `CNAME`/`A` se crea solo (proxy naranja activo).
   - Si el DNS está fuera: crea un `CNAME` de `www` → `mi-cliente.pages.dev` y configura el ápex según indique Cloudflare.
   - Espera propagación; Cloudflare emite el certificado TLS automáticamente.

8. **Confirma destino único (anti-drift, falla #1 del ecosistema).** Asegura que NO hay un workflow de GitHub Pages activo:
   ```bash
   ls .github/workflows/ 2>/dev/null   # no debe haber deploy a gh-pages
   ```
   Si existe un `deploy.yml` a GitHub Pages, **bórralo**. No tengas Pages activado en Settings del repo de GitHub. Un solo destino: Cloudflare.

9. **Verificación post-deploy.** Sobre el dominio real:
   - `https://midominio.com.mx/robots.txt` → dominio correcto.
   - `https://midominio.com.mx/sitemap-index.xml` → existe y lista URLs.
   - DevTools → Network → revisa que `_astro/*` e `/images/*` traigan `Cache-Control: immutable` (prueba de que `_headers` se aplicó — lo que GitHub Pages no haría).
   - Prueba un `_redirects` (301 a la URL nueva).
   - Lighthouse móvil sobre producción (Performance ≥90, ver [[02 - Checklist QA Pre-Deploy]]).
   - Clic al botón WhatsApp → abre chat con el mensaje correcto.

10. **Deploys siguientes = `git push`.** Cada push a `main` dispara un build/deploy automático. Las ramas generan **Preview deployments** para revisar antes de mergear.

### Alternativa resumida: GitHub Pages
Válida solo si Frank lo decide como destino canónico, y entonces **se borra todo el config de Cloudflare** del repo (no dejar `_headers`/`_redirects`/`wrangler.toml` muertos):
1. `astro.config.mjs`: `site: 'https://Origenlab.github.io'` + `base: '/mi-cliente'` (si es project page).
2. Workflow `.github/workflows/deploy.yml` con `withastro/action` (build + deploy a `gh-pages`).
3. Settings → Pages → Source: GitHub Actions.
4. **Borra** `public/_headers`, `public/_redirects` y cualquier `wrangler.toml` (GitHub Pages los ignora → quedan como deuda muerta).
> Limitación: GitHub Pages **no** aplica cabeceras de seguridad/redirects ni habilita el Worker de captura de leads ([[SOP 09 - Automatizacion de contenido]]). Por eso el canónico recomendado es Cloudflare.

## Push desde Cowork (Desktop Commander) — operativo sin errores
> Propósito: subir páginas desde Cowork sin repetir los fallos recurrentes (push imposible desde el sandbox, 403 por cuenta equivocada, `index.lock` stale). Automatizado en la skill **`cowork-git-push`** (`~/Desktop/OrigenLab/Skills/`, empaquetada como plugin instalable; se auto-dispara con "sube esto", "haz push", "publica el sitio", "haz deploy").

**Regla de oro:** todo `git`/`gh`/`npm` corre por **Desktop Commander** (`mcp__Desktop_Commander__start_process` = zsh real del Mac), **nunca** por el sandbox de Cowork (`mcp__workspace__bash`): el sandbox no tiene `gh` ni Keychain y no puede borrar `.git/index.lock` (FUSE bloquea el unlink) → el push falla siempre.

1. **Cuenta correcta según el remote** (un 403 = cuenta equivocada activa):
   ```bash
   git remote get-url origin            # ¿Origenlab/* o Frankoropeza/*?
   gh auth switch -u Origenlab          # o -u Frankoropeza, según el dueño del repo
   gh auth status --active              # confirma la cuenta activa
   ```
   **Hay DOS cuentas legítimas, cada una con sus propios dominios** — no son desvíos: cada sitio vive en una cuenta y se pushea con ella. Switchea a la cuenta dueña del remote (`git remote get-url origin` te dice cuál). Mapa completo en §[[#Mapa de cuentas (qué página está con cuál)]].
2. **Limpia locks stale.** Si `git` dice `fatal: Unable to create '.git/index.lock': File exists` de una corrida muerta: `rm -f .git/index.lock`.
3. **Build antes de push.** `npm run build` verde (corre `astro check`/`astro build`) → recién `git add -A && git commit -m "..."` (Conventional Commits).
4. **Push y verifica contra GitHub** (no confíes solo en el ref local de tracking):
   ```bash
   git push -u origin main
   [ "$(git ls-remote origin refs/heads/main | cut -f1)" = "$(git rev-parse HEAD)" ] && echo "remoto == local OK"
   ```

### Mapa de cuentas (qué página está con cuál)
Dos cuentas de GitHub, cada una con sus dominios. Antes de pushear, `gh auth switch` a la que corresponda.

**Cuenta `Frankoropeza`:**

| Proyecto | Repo | Dominio |
|---|---|---|
| BRINCOLINS | `Frankoropeza/brincolins` | brincolins.com |
| CABOIMAGE | `Frankoropeza/CABOIMAGE` | (estático) |
| FIREFIGHTERSMX | `Frankoropeza/FIREFIGHTERSMX` | firefighters.mx |
| PANTALLA-LED | `Frankoropeza/PANTALLA-LED` | pantalla-led.com |
| SEGURIDADPRIVADAEVENTOS | `Frankoropeza/seguridadeventos` | seguridadeventos.com.mx |

**Cuenta `Origenlab`** (todo lo demás):

| Proyecto | Repo | Dominio |
|---|---|---|
| BARBERIA | `Origenlab/BARBERIAMX` | barberia.mx |
| BOMBERO | `Origenlab/BOMBERO` | bombero.mx |
| CAMARADESEGURIDAD | `Origenlab/CAMARADESEGURIDAD` | camara-de-seguridad.com |
| CDMXSITE | `Origenlab/CDMX` | cdmx.site |
| CLINICADEBELLEZA | `Origenlab/CLINICADEBELLEZA` | clinicadebelleza.com.mx |
| EJEMPLOS | `Origenlab/ejemplos-mx` | ejemplos.mx |
| EVENTECH | `Origenlab/EVENTECH` | eventech.mx |
| FIREFIGHTERCOMMX | `Origenlab/FIREFIGHTER` | firefighter.com.mx |
| FIREFIGHTERMX | `Origenlab/firefighter-mx` | firefighter.mx |
| GAMADEMEXICO | `Origenlab/GAMADEMEXICO` | gamademexico.com |
| INFIELMX | `Origenlab/infiel.mx` | infiel.mx |
| INFLAPY | `Origenlab/INFLAPY` | inflablesparafiestas.com.mx |
| LGACONTRAINCENDIOS | `Origenlab/LGACONTRAINCENDIOS` | lgacontraincendios.com |
| MANEXT | `Origenlab/MANTENIMIENTO-DE-EXTINTORES` | mantenimientodeextintores.mx |
| MEDEDUL / mededul-com-repo | `Origenlab/MEDEDUL` · `Origenlab/mededul.com` | mesas-de-dulces.com |
| MESECI | `Origenlab/MESECI` | meseci.com.mx |
| MONITORESCONTRAINCENDIOS | `Origenlab/MONITORESCONTRAINCENDIOS` | monitorescontraincendios.com |
| ORIGENLAB | `Origenlab/ORIGENLAB` | origenlab.com |
| PODIUMEX | `Origenlab/PODIUMEX` | podiumex.com |
| PROYECTORED | `Origenlab/PROYECTORED` | proyectored.com.mx |
| RENTADEILUMINACION | `Origenlab/RENTADEILUMINACION` | rentadeiluminacion.com |
| RESOIL | `Origenlab/RESOIL` | rentadesonidoeiluminacion.com.mx |
| SEGURIDADPARACONDOMINIOS | `Origenlab/seguridadprivadacondominios.com` | seguridadprivadacondominios.com |
| SEGURIDADPRIVADA | `Origenlab/SEGURIDAD-PRIVADA` | seguridad-privada.com.mx |
| SEGURIDADPRIVADAMX | `Origenlab/SEGURIDADPRIVADAMX` | seguridadprivadamx.com |

> MESASPICNIC no tiene remote configurado (sin `origin`). ⚠️ `Origenlab/RENTADEILUMINACION` tiene un token `gho_…` embebido en la URL del remote (`.git/config`) — quitarlo (`git remote set-url`) y rotar el token.

## Checklist de verificación
- [ ] **Un solo destino de deploy** (Cloudflare Pages); sin workflow de GitHub Pages activo.
- [ ] Repo bajo `Origenlab`; sin secretos (`git grep` vacío).
- [ ] Build command `npm run build` (o `+ rewrite-cdn.mjs`); output `dist`; `NODE_VERSION=22`.
- [ ] `public/_headers` y `public/_redirects` presentes y **aplicados** (verificado en Network).
- [ ] Variables/secretos en Cloudflare, no en el repo.
- [ ] Dominio custom + TLS activos; DNS propagado.
- [ ] `robots.txt` y `sitemap-index.xml` accesibles en el dominio de producción.
- [ ] Lighthouse móvil ≥90; CTA WhatsApp funcionando en producción.
- [ ] Push a `main` despliega automáticamente; previews por rama operativos.

## Errores comunes
- **Drift Cloudflare ↔ GitHub Pages (falla #1 del ecosistema).** ≥7 proyectos tenían config de CF (`_headers`/`_redirects`/`wrangler.toml`) pero desplegaban a GH Pages → cabeceras/redirects/CSP **muertos** (confirmado en SEGURIDADPRIVADA). Lección: un solo destino; si eliges CF, no dejes workflow de GH Pages; si eliges GH Pages, borra el config de CF.
- **`_headers`/`_redirects` que no se aplican.** Suelen estar fuera de `public/` o el destino es GH Pages. Lección: van en `public/` (llegan al raíz de `dist/`) y solo Cloudflare los honra; verifícalo en Network.
- **Secreto commiteado.** RENTADEILUMINACION expuso un token (hubo que rotarlo). Lección: variables en el panel de Cloudflare; `.gitignore` del scaffold + `git grep` antes de push.
- **Output dir equivocado.** Astro SSG emite a `dist/`; poner `build` o `public` rompe el deploy. Lección: output = `dist`.
- **Node viejo en el builder.** El scaffold exige `>=22.12.0`; sin `NODE_VERSION=22` el build de Cloudflare puede fallar. Lección: fíjalo en variables.
- **`site` apuntando a `.pages.dev`.** Deja canónicos y sitemap con el dominio temporal. Lección: `astro.config.site` = dominio final desde [[SOP 06 - SEO tecnico y schema]].
- **Cuenta equivocada al pushear (403).** Hay dos cuentas legítimas (`Origenlab` y `Frankoropeza`), cada una con sus dominios. Lección: confirma el dueño del remote y `gh auth switch` antes de pushear — ver §Mapa de cuentas.
- **Push desde Cowork que nunca sube.** Intentar `git push` por el sandbox (`mcp__workspace__bash`) falla: sin `gh`, sin Keychain, y no puede borrar `.git/index.lock`. Lección: usar Desktop Commander + `gh auth switch` a la cuenta del remote + limpiar lock. Ver §[[#Push desde Cowork (Desktop Commander) — operativo sin errores]] y la skill `cowork-git-push`.
