# _tools — capturas de páginas

Genera capturas full-page de páginas del repo, renderizadas con Chromium headless
(mismo HTML/CSS que sirve el sitio). No usa capturas externas: levanta un servidor
local y fotografía cada ruta.

## Setup (una vez)
```bash
npm i -D playwright-core
npx playwright install chromium
```

## Uso
```bash
# desde la raíz del repo
python3 -m http.server 8099 &          # sirve el sitio en localhost:8099
node _tools/capture.mjs                  # captura las rutas de _tools/pages.json → _tools/_out/*.png
python3 _tools/to-webp.py 82             # convierte a WebP (_out/*.webp)
```

Una sola página:
```bash
node _tools/capture.mjs "/blog/" blog-index 1280 800 full
```

## Qué edita
- `pages.json` — lista de rutas a capturar (`path`, `name`, `full`).
- `_out/` — salida PNG/WebP (no versionar; mover a `/img/...` lo que se use).

## Límite
Sólo páginas del propio repo (localhost). Sitios externos de clientes NO se
capturan por aquí (restricción de fetch); para esos se usa el navegador del usuario.
