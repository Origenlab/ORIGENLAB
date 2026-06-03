# Deploy origenlab.com — Pipeline definitivo (2026-04-21)

> ⚠️ **HISTÓRICO — superado el 2026-06-02.** `origenlab.com` ya **NO** se sirve desde GitHub Pages / `Frankoropeza/origenlab`. El pipeline vigente es **Cloudflare Pages ← `Origenlab/ORIGENLAB`**: ver [[41 — Deploy origenlab.com vía Cloudflare Pages (2026-06-02)]]. Este documento queda solo como registro de cómo estuvo montado antes.

> **Autoridad (histórica).** Este documento reemplazó a [[29 — Deploy & GitHub Push (2026-04-21)]] como referencia de deploy a producción durante abril-mayo 2026.

## Problema resuelto

El sitio público `origenlab.com` **NO** se sirve desde `Origenlab/ORIGENLAB` (el repo "del equipo"). Se sirve desde el repo personal **`Frankoropeza/origenlab`** heredado con el dominio ya configurado.

Mandar push a `Origenlab/ORIGENLAB` solo actualiza el preview en `origenlab.github.io/ORIGENLAB/` — no mueve el sitio público.

## Topología

| Capa | Valor |
|------|-------|
| DNS (Cloudflare) | `origenlab.com` → CNAME `frankoropeza.github.io` — proxied 🟠 |
| Repo que sirve | [`Frankoropeza/origenlab`](https://github.com/Frankoropeza/origenlab) |
| Archivo en repo | `CNAME` con contenido `origenlab.com` |
| GH Pages source | **Deploy from a branch** · `main` · `/` (root) |
| Bypass Jekyll | archivo `.nojekyll` en root (permite servir `_astro/`) |
| Preview alterno | `Origenlab/ORIGENLAB` → `origenlab.github.io/ORIGENLAB/` (no es el sitio público) |

## Acceso de push (permanente, sin PAT)

El Mac de Frank tiene credenciales git cacheadas a nombre de **`Origenlab`** (cuenta org). El repo es de **`Frankoropeza`** (cuenta personal). Por default HTTPS rechaza con 403.

**Solución definitiva:** `Origenlab` fue agregado como **colaborador con Write access** en `Frankoropeza/origenlab` el 2026-04-21. Verificado con push `5a8df10..b649542`.

- GitHub settings: https://github.com/Frankoropeza/origenlab/settings/access
- Colaborador listado: `Origenlab` (org) — role Write
- Invitación aceptada desde la cuenta Origenlab

Por eso **ya no se necesita PAT**. El PAT viejo (`origenlab.com deploy`) fue revocado.

## Cómo publicar cambios

```bash
cd ~/Documents/claude/projects/ORIGENLAB
./_push-origenlab-com.sh
```

Qué hace el script:

1. Clona `Frankoropeza/origenlab` a un temp
2. Borra todo excepto `.git` y `CNAME` (preserva el archivo CNAME)
3. `rsync` del workspace al temp, excluyendo: `_backup-2026-04-21/`, `_docs/`, `graphify-out/`, los tres scripts (`_push-github.sh`, `_push-origenlab-com.sh`, `_graphify-rebuild.sh`), y el propio `CNAME`
4. Verifica que `CNAME` siga con `origenlab.com`; si falta lo regenera
5. Crea `.nojekyll` si no existe
6. Commit + `git push origin main`

### Flags

- `--empty` — fuerza un commit vacío para triggear rebuild de GH Pages sin cambios reales:
  ```bash
  ./_push-origenlab-com.sh --empty
  ```
  Útil cuando GH Pages no redeployeó solo (por cambio de config, por ejemplo).

## Lista de errores frecuentes y cómo se resuelven

| Síntoma | Causa | Fix |
|---------|-------|-----|
| Sitio sin CSS (`_astro/*` da 404) | Jekyll filtrando carpetas `_` | Crear `.nojekyll` en root del repo |
| 403 Permission denied to Origenlab | Invitación de colaborador no aceptada | Aceptar desde cuenta Origenlab en `/orgs/Origenlab/invitations` |
| Sitio viejo sigue visible | Cache de Cloudflare | dash.cloudflare.com → origenlab.com → Caching → Purge Everything |
| Commit hecho pero deploy no corre | GH Pages source estaba en "GitHub Actions" y el workflow fue borrado | Settings → Pages → source = **Deploy from a branch / main / root** + push vacío |
| CNAME desaparece después de un rsync | Rsync sobrescribió el archivo | El script ya lo preserva con `! -name 'CNAME'` y `--exclude='CNAME'` |

## Repos involucrados — cuál es cuál

| Repo | Rol | Dominio |
|------|-----|---------|
| **`Frankoropeza/origenlab`** | **Producción** — sirve el sitio real | **`origenlab.com`** |
| `Origenlab/ORIGENLAB` | Preview / repo del equipo | `origenlab.github.io/ORIGENLAB/` |

Los dos scripts existen por esta razón:

- `_push-github.sh` → `Origenlab/ORIGENLAB` (preview, incluye hook de graphify)
- `_push-origenlab-com.sh` → `Frankoropeza/origenlab` (producción, preserva CNAME)

Ambos leen del mismo workspace. Pushear a los dos mantiene los entornos en paralelo.

## Verificación post-deploy

```bash
# sin cache
curl -s "https://origenlab.com/?t=$(date +%s)" | grep -oE 'optimizados para [A-Za-z]+'
# esperado: optimizados para convertir

# generator Astro
curl -s https://origenlab.com/ | grep -o 'generator.*Astro[^"]*'
```

## Fallback si se pierde el acceso de colaborador

Si algún día Origenlab deja de ser colaborador (o alguien lo remueve), el plan B es PAT embebido en URL:

1. Generar PAT en https://github.com/settings/tokens con scope `repo` (desde cuenta Frankoropeza)
2. Modificar temporalmente `REPO_URL` en `_push-origenlab-com.sh`:
   ```bash
   REPO_URL="https://Frankoropeza:${FRANKO_TOKEN}@github.com/Frankoropeza/origenlab.git"
   ```
3. `export FRANKO_TOKEN=ghp_...` antes de correr el script
4. Rotar/revocar el PAT al terminar

SSH (tercera opción, no configurado actualmente) sería más limpio pero requiere generar key en la Mac y agregarla a la cuenta Frankoropeza.

## Referencias

- [[29 — Deploy & GitHub Push (2026-04-21)]] — registro histórico del primer push a `Origenlab/ORIGENLAB`
- [[32 — Playbook — Nuevo sitio en GH Pages + Cloudflare]] — receta genérica para futuros dominios
- [[00 — ÍNDICE]]
