# Deploy & GitHub Push — 2026-04-21

> ⚠️ **Documento histórico.** Este registro cubre el primer push al repo **preview** `Origenlab/ORIGENLAB`. El sitio público `origenlab.com` se sirve desde **otro repo** (`Frankoropeza/origenlab`). Para el pipeline de producción consulta [[31 — Deploy origenlab.com (Frankoropeza repo)]]. Para futuros sitios consulta el playbook genérico [[32 — Playbook — Nuevo sitio en GH Pages + Cloudflare]].

> Registro del push general que sincronizó el sitio Astro homologado con el repo remoto. Primer push después de completar Fase 1 y Fase 2.

## Resumen

| Item | Valor |
|------|-------|
| Repo | [github.com/Origenlab/ORIGENLAB](https://github.com/Origenlab/ORIGENLAB) |
| Branch | `main` |
| Commit | `c6f0d20` |
| Diff | `173be97..c6f0d20` |
| Objetos | 85 |
| Tamaño | 592.34 KiB |
| Archivos afectados | 265 |
| Fecha | 2026-04-21 |

## Qué cambió

**Eliminado** (estructura webpack legacy del sitio viejo):
- `package.json`, `webpack.common.js`, `webpack.config.dev.js`, `webpack.config.prod.js`
- `css/`, `js/`, `sw.js`, `site.webmanifest`, `404.html`
- `LICENSE.txt`, `README.md`, `.editorconfig`, `.gitattributes`, `.gitignore`
- Blog legacy (archivos planos `blog/*.html`)
- `.audit/` (scripts internos y n8n workflows)

**Agregado** (sitio Astro completo post-Fase 2):
- `_astro/` (BaseLayout.css, premium-dark.css, ol-header.js, index css hashes)
- 28 páginas HTML homologadas con sistema `ol-*`
- Blog reestructurado: `blog/<slug>/index.html` con breadcrumbs y related posts
- Nuevas subpáginas: `cotizar/`, `gracias/`, `directorio/`, `portafolio/`
- Servicios L3: `servicios/desarrollo-web/`, `tiendas-en-linea/`, `landing-pages/`, `rediseno-web/`
- Legales: `aviso-de-privacidad/`, `terminos/`
- Assets: `og-image.jpg` (1200×630), `og-image.png`, `og-image.svg`, `logo.svg`, `favicon.svg`
- `sitemap.xml` regenerado (26 URLs indexables), `robots.txt`

## Método

El sandbox de Cowork **no tiene credenciales GitHub** (no hay SSH keys ni PAT ni `gh` CLI). Se generó `_push-github.sh` en la raíz del workspace para ejecutarlo desde la Mac (usa el Keychain / credential helper local).

El script:

1. Clona `github.com/Origenlab/ORIGENLAB` a un temporal
2. Borra todo el contenido excepto `.git`
3. `rsync` del workspace al temporal, excluyendo `_backup-2026-04-21/`, `_docs/` y el propio `_push-github.sh`
4. `git add -A` + commit con mensaje de Fase 1 + Fase 2
5. `git push origin main`
6. Reporta el commit y la ruta del temporal para limpiar

### Uso

```bash
cd ~/Documents/Claude/Projects/ORIGENLAB
bash _push-github.sh
```

Las credenciales las resuelve macOS Keychain automáticamente.

## Exclusiones permanentes

El `rsync` en el script excluye estos folders locales para que nunca lleguen al repo:

- `_backup-2026-04-21/` — snapshot pre-homologación, 185 MB de HTML legacy
- `_docs/` — este vault Obsidian (documentación interna, no va a producción)
- `_push-github.sh` — el propio script

## Deploy resultante

Si el repo tiene GitHub Pages apuntando a `main`, el sitio se reconstruye al recibir el push. Verificar en:

- [Actions](https://github.com/Origenlab/ORIGENLAB/actions)
- [Settings → Pages](https://github.com/Origenlab/ORIGENLAB/settings/pages)

## Referencias

- [[00 — ÍNDICE]]
- [[20 — Estructura de Archivos y Páginas]]
- [[AUDITORIA-INTEGRAL-2026-04-21]]
