# 41 — Deploy origenlab.com vía Cloudflare Pages (2026-06-02)

> **Pipeline definitivo vigente.** Reemplaza a [[31 — Deploy origenlab.com (Frankoropeza repo)]] y a la parte de producción de [[29 — Deploy & GitHub Push (2026-04-21)]]. El sitio ya **no** se sirve desde GitHub Pages.

## TL;DR

`origenlab.com` lo sirve **Cloudflare Pages**, proyecto **`origenlab`** conectado a **`github.com/Origenlab/ORIGENLAB`** (branch `main`). Cada push a `main` dispara build + publish automático en ~1-3 min. Ya no hay que tocar GitHub Pages ni la cuenta `Frankoropeza`.

## El problema que resolvió (importante)

Hasta 2026-06-02 hubo un desajuste silencioso:

- `_push-github.sh` empuja a **`Origenlab/ORIGENLAB`** (org).
- Pero `origenlab.com` lo servía **`Frankoropeza/origenlab`** (cuenta personal, GitHub Pages), **congelado en el push del 27-abr-2026** (tenía el `CNAME`).
- Resultado: todo el trabajo desde finales de abril (sector seguridad-privada, directorio, equipo-eventos, fotos) hacía push "success" a un repo que **no alimentaba el dominio**. El sitio en vivo quedó atascado en abril, mientras las páginas nuevas daban 404.

Diagnóstico que lo delató:
- `curl -sI https://origenlab.com/sitemap.xml` → `last-modified` = 27-abr y 0 refs a `seguridad-privada`.
- Páginas viejas (home, incendios) = 200; toda la sección nueva = 404.
- En Cloudflare DNS, el registro era `CNAME @ → frankoropeza.github.io`.

No se pudo liberar el dominio en GitHub Pages (la cuenta de trabajo es solo **colaboradora** en `Frankoropeza/origenlab`, sin acceso a Settings; y al intentar amarrar el dominio en `Origenlab/ORIGENLAB` GitHub respondía *"custom domain already taken"*). **Solución: saltarse GitHub Pages por completo y servir desde Cloudflare Pages.**

## Arquitectura actual

| Pieza | Valor |
|------|------|
| Repo fuente | `github.com/Origenlab/ORIGENLAB` (branch `main`) |
| Hosting | Cloudflare Pages, proyecto `origenlab` → `origenlab.pages.dev` |
| Cuenta Cloudflare | `711c2e12a6bd9cec3ec5c6a7633f147c` (Ccarsolio@gmail.com) |
| Build | Framework **None**, sin build command, **output dir `/`** (HTML estático en raíz) |
| DNS | Cloudflare `CNAME @ → origenlab.pages.dev` (antes apuntaba a `frankoropeza.github.io`) |
| Custom domain | `origenlab.com` añadido en el proyecto Pages → Custom domains |

### Cada sector cliente es su propio repo + su propio Pages
No confundir el portafolio con los sitios cliente. En la misma cuenta Cloudflare hay un proyecto Pages por sitio cliente, cada uno ligado a su repo `Origenlab/*`:

| Proyecto Pages | Repo | Dominio |
|---|---|---|
| `origenlab` | `Origenlab/ORIGENLAB` | origenlab.com (portafolio agencia) |
| `seguridad-privada-web` | `Origenlab/SEGURIDAD-PRIVADA` | seguridad-privada.com.mx (cliente ORIGINS) |
| `extintores-web` | `Origenlab/MANTENIMIENTO-DE-EXTINTORES` | — |
| `cdmx-sjc` | `Origenlab/CDMX` | — |
| `bombero` | `Origenlab/BOMBERO` | — |

## Cómo deployar ahora

1. `bash _push-github.sh` → hace clone+rsync+commit+push a `Origenlab/ORIGENLAB` `main` (mismo script de siempre; su mensaje de commit es fijo/heredado, no te fíes de él).
2. Cloudflare Pages detecta el push y **buildea+publica solo**. Espera 1-3 min.
3. El repo incluye `CNAME` (origenlab.com) y `.nojekyll` — inofensivos para Cloudflare Pages.

## Cómo verificar (no te fíes de "build success")

```bash
# Una página NUEVA debe dar 200 (no solo la home):
curl -s -o /dev/null -w '%{http_code}\n' https://origenlab.com/portafolio/seguridad-privada/seprico/
# Spot-check de un asset nuevo:
curl -s -o /dev/null -w '%{http_code}\n' https://origenlab.com/img/seguridad-privada/seprico/control-de-accesos-seguridad-privada-seprico.avif
```

Cloudflare antepone caché propia: usa `?cb=$RANDOM` o el botón de purga si ves contenido viejo.

## Notas / pendientes

- `Frankoropeza/origenlab` quedó huérfano (ya no sirve el dominio). Si algún día se recupera acceso a esa cuenta, conviene quitarle el custom domain para evitar confusión. No es urgente: el DNS ya no apunta ahí.
- Las notas [[31 — Deploy origenlab.com (Frankoropeza repo)]] y [[32 — Playbook — Nuevo sitio en GH Pages + Cloudflare]] quedan como **histórico**; el flujo vigente es éste.

Relacionado: [[42 — Fotos reales en casos L4 Seguridad Privada]] · [[34 — L4 Casos en operación · Roster y enlaces]]
