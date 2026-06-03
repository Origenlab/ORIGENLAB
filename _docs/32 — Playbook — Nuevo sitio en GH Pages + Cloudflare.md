# Playbook — Nuevo sitio en GH Pages + Cloudflare

> Receta reutilizable para publicar un sitio Astro (o cualquier build estático) en un dominio propio usando **GitHub Pages + Cloudflare DNS**. Destilado de la migración de `origenlab.com` (ver [[31 — Deploy origenlab.com (Frankoropeza repo)]]) — evita repetir los mismos traspiés en futuros proyectos.

## Cuándo usar este stack

- Sitio 100% estático (Astro, Next static export, Hugo, 11ty, HTML plano).
- Dominio ya comprado y con DNS gestionado por Cloudflare.
- Zero-cost hosting aceptable (GH Pages es gratis).
- Tráfico bajo-medio (GH Pages tiene límites suaves: 100 GB/mes, 10 builds/hora).

No uses este stack si: necesitas SSR, edge functions complejas, o >100 GB/mes. Para esos casos: Cloudflare Pages, Vercel o Netlify.

## Checklist inicial — una sola vez por dominio

### 1. Elegir cuenta/org del repo

Decisión crítica: **¿el repo va en cuenta personal o en org?**

| Caso | Ventaja | Desventaja |
|------|---------|------------|
| Personal (`user/sitio`) | Creds de Mac ya funcionan si tú eres el user | Si otros necesitan pushear → invitar colaboradores |
| Org (`org/sitio`) | Equipo tiene acceso desde el inicio | GH Pages de proyecto sirve `user.github.io/repo/` — necesitas CNAME para dominio propio |

**Regla para origenlab.com:** se quedó en `Frankoropeza/origenlab` porque el dominio ya estaba configurado ahí. Cambiar el repo habría implicado reconfigurar DNS.

### 2. Configurar GH Pages

En `Settings → Pages` del repo:

- **Source:** `Deploy from a branch` (no GitHub Actions, a menos que necesites build server-side)
- **Branch:** `main`
- **Folder:** `/ (root)`

Evita "GitHub Actions" como source si tu build ya corre localmente — agrega complejidad (workflow files, secrets) sin beneficio.

### 3. Archivos obligatorios en el root del repo

| Archivo | Contenido | Por qué |
|---------|-----------|---------|
| `CNAME` | `midominio.com` (sin http, sin trailing slash) | GH Pages lee este archivo para enrutar el dominio custom al repo |
| `.nojekyll` | (vacío, `touch .nojekyll`) | Bypass de Jekyll — imprescindible si tu build usa carpetas con prefijo `_` (Astro usa `_astro/`) |

**Crítico:** sin `.nojekyll`, GH Pages procesa como Jekyll y **filtra silenciosamente** cualquier folder que empiece con `_`. Síntoma: sitio carga pero sin CSS/JS, devtools muestran 404 en `_astro/*`.

### 4. DNS en Cloudflare

Registro tipo CNAME:

| Tipo | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `midominio.com` (o `@`) | `<user-o-org>.github.io` | 🟠 Proxied |

El target siempre es `<owner>.github.io` — **NO** incluye el nombre del repo. GH Pages resuelve el repo correcto leyendo el archivo `CNAME` del repo que tiene `midominio.com`.

Si tienes subdominio (`www`), agrega otro CNAME con el mismo target.

### 5. HTTPS en GH Pages

Después de propagación DNS (puede tardar hasta 24h pero suele ser <1h):

- Settings → Pages → `Enforce HTTPS` debe estar habilitado
- GH emite cert automáticamente via Let's Encrypt

Si Cloudflare está en modo proxied 🟠, también activa en Cloudflare:
- SSL/TLS → Overview → **Full (strict)**

## Checklist de push recurrente — cada deploy

Para proyectos nuevos, clona este patrón del script `_push-origenlab-com.sh`:

1. **Clone del repo destino a un temp:**
   ```bash
   WORK=$(mktemp -d)
   git clone "$REPO_URL" "$WORK"
   ```
2. **Preservar archivos críticos:**
   ```bash
   find "$WORK" -maxdepth 1 -mindepth 1 ! -name '.git' ! -name 'CNAME' -exec rm -rf {} +
   ```
3. **Rsync desde workspace con excludes:**
   ```bash
   rsync -a \
     --exclude='.git' \
     --exclude='CNAME' \
     --exclude='_docs' \
     --exclude='_backup-*' \
     --exclude='graphify-out' \
     --exclude='_push-*.sh' \
     "$SITE_DIR/" "$WORK/"
   ```
4. **Garantizar archivos obligatorios:**
   ```bash
   [ -f "$WORK/CNAME" ] || echo "midominio.com" > "$WORK/CNAME"
   [ -f "$WORK/.nojekyll" ] || touch "$WORK/.nojekyll"
   ```
5. **Commit + push:**
   ```bash
   cd "$WORK" && git add -A
   git diff --cached --quiet && echo "Sin cambios" && exit 0
   git commit -m "deploy: ..."
   git push origin main
   ```

Soporta flag `--empty` para forzar rebuild sin cambios:

```bash
if [ "${1:-}" = "--empty" ] && git diff --cached --quiet; then
  git commit --allow-empty -m "chore: trigger rebuild"
  git push origin main
fi
```

## Errores más comunes y sus fixes

| Síntoma | Diagnóstico | Fix |
|---------|-------------|-----|
| Sitio sin CSS/JS (404 en `_astro/` o `_next/`) | Jekyll activo | `touch .nojekyll` en root y repush |
| `403 Permission denied` al pushear | Keychain cachea otra cuenta | Invitar cuenta correcta como colaborador Write **o** embebir PAT en URL |
| DNS sigue apuntando a IP vieja | Cloudflare cache | DNS → verificar CNAME · Caching → Purge Everything |
| Settings de GH Pages cambiado pero no redeploy | GH Pages no auto-trigger en config change | Push vacío: `git commit --allow-empty -m "trigger" && git push` |
| CNAME desaparece tras push | Script sobrescribió root | Excluir CNAME del rsync + preservarlo al limpiar |
| HTTPS cert error | Cloudflare en "Flexible" SSL | Cambiar a "Full (strict)" en SSL/TLS → Overview |
| Cuenta con creds git no puede pushear a repo en otra cuenta | macOS Keychain guarda 1 user por host | Colaborador + Write (preferido) · SSH con 2 keys · PAT embebido (rotar frecuente) |

## Multi-cuenta en macOS — decisión recomendada

En Mac solo puede haber **un** set de credenciales git por host (`github.com`). Si necesitas pushear a repos de cuentas distintas:

### Opción A (recomendada): Colaborador cross-cuenta

1. Repo de cuenta A · necesitas pushear desde Mac con creds de cuenta B
2. Agregar cuenta B como colaborador con **Write** en el repo de cuenta A
3. Aceptar invitación desde cuenta B
4. Push funciona directo — Keychain ya tiene creds de B

**Ventajas:** sin PAT, sin rotar tokens, sin setup SSH.
**Desventaja:** la cuenta A debe confiar en B para darle write.

### Opción B: PAT embebido en URL

```bash
REPO_URL="https://Ausuario:${A_TOKEN}@github.com/Ausuario/repo.git"
```

PAT con scope `repo`, generado desde cuenta A, exportado en env antes de pushear.

**Ventajas:** no requiere permiso cruzado.
**Desventajas:** PAT en memoria/scripts (riesgo fuga), hay que rotar cada N meses.

### Opción C: SSH con dos keys

`~/.ssh/config` con hosts alias:

```
Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_personal

Host github-org
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_org
```

Remote URL usa el alias: `git@github-personal:user/repo.git`.

**Ventajas:** limpio, sin tokens que rotar.
**Desventajas:** setup inicial (generar 2 keys, subirlas a las cuentas, configurar aliases).

## Verificación post-deploy (copy-paste)

Reemplaza `MIDOMINIO` por el dominio real:

```bash
# sitio responde con contenido nuevo (sin cache)
curl -s "https://MIDOMINIO/?t=$(date +%s)" | head -30

# cert y headers
curl -sI "https://MIDOMINIO/" | head -10

# Astro (o el generator que sea)
curl -s "https://MIDOMINIO/" | grep -o 'generator.*[A-Za-z][^"]*'

# CNAME del repo (vía API)
gh api repos/OWNER/REPO/contents/CNAME --jq .content | base64 -d
```

## Referencias

- [[29 — Deploy & GitHub Push (2026-04-21)]] — primer push a repo preview (Origenlab/ORIGENLAB)
- [[31 — Deploy origenlab.com (Frankoropeza repo)]] — aplicación concreta de este playbook
- [[20 — Estructura de Archivos y Páginas]] — qué se excluye del build
- [[00 — ÍNDICE]]

## Checklist rápido (tl;dr)

- [ ] Repo decidido (personal vs org) basado en dónde ya está el dominio
- [ ] GH Pages source = **Deploy from a branch / main / root**
- [ ] Archivo `CNAME` con el dominio (sin http)
- [ ] Archivo `.nojekyll` vacío en root
- [ ] Cloudflare: CNAME → `<owner>.github.io` · proxy 🟠 · SSL Full (strict)
- [ ] Acceso de push resuelto (colaborador / PAT / SSH)
- [ ] Script de push con rsync + preservación de CNAME + flag `--empty`
- [ ] Verificación: `curl` devuelve contenido nuevo sin cache
