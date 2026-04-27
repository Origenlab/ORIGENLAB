#!/usr/bin/env bash
# Push del sitio ORIGENLAB (Astro) al repo github.com/Frankoropeza/origenlab
# Ese es el repo que GH Pages sirve en https://origenlab.com
# Corre desde tu Mac — usa tus credenciales git ya configuradas.
set -e

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
# Requiere que Origenlab tenga acceso Write al repo Frankoropeza/origenlab
# (Settings -> Collaborators -> Add Origenlab). Las credenciales ya están en
# macOS Keychain via el otro push (_push-github.sh).
REPO_URL="https://github.com/Frankoropeza/origenlab.git"
WORK=$(mktemp -d)

echo "==> Clonando repo en $WORK"
git clone "$REPO_URL" "$WORK"

echo "==> Limpiando contenido (excepto .git y CNAME)"
find "$WORK" -maxdepth 1 -mindepth 1 ! -name '.git' ! -name 'CNAME' -exec rm -rf {} +

echo "==> Sincronizando workspace -> repo (preserva CNAME, excluye backups/docs/graphify/scripts)"
rsync -a \
  --exclude='_backup-2026-04-21' \
  --exclude='_docs' \
  --exclude='graphify-out' \
  --exclude='.git' \
  --exclude='CNAME' \
  --exclude='_push-github.sh' \
  --exclude='_push-origenlab-com.sh' \
  --exclude='_graphify-rebuild.sh' \
  "$SITE_DIR/" "$WORK/"

cd "$WORK"

# Sanity: verificar que CNAME siga apuntando a origenlab.com
if [ -f CNAME ]; then
  echo "==> CNAME preservado: $(cat CNAME)"
else
  echo "!! CNAME NO ENCONTRADO — creando con origenlab.com"
  echo "origenlab.com" > CNAME
fi

# .nojekyll para que GH Pages no filtre _astro/
if [ ! -f .nojekyll ]; then
  touch .nojekyll
fi

git add -A

if git diff --cached --quiet; then
  if [ "${1:-}" = "--empty" ]; then
    echo "==> Sin cambios — forzando commit vacío (flag --empty)"
    git commit --allow-empty -m "chore: trigger deploy / test push"
    git push origin main
    echo "==> Push vacío OK. Si ves esto sin pedir token, colaborador funciona."
    exit 0
  fi
  echo "==> Sin cambios. Saliendo. (usa --empty para forzar push de prueba)"
  exit 0
fi

git commit -m "Migración a sitio Astro (reemplaza build webpack anterior)

- Sitio reconstruido con Astro — nuevo diseño y arquitectura
- 28 páginas homologadas con sistema ol-* (tokens, layouts, componentes)
- Schema markup (Organization, LocalBusiness, Service, BlogPosting, FAQPage, Review)
- Canonicals y meta tags unificados
- WhatsApp +525547868402 unificado
- Páginas legales: aviso-de-privacidad, terminos, gracias
- Nuevas secciones: cotizar, directorio, portafolio
- Blog reestructurado (blog/slug/index.html) con breadcrumbs y related posts
- Accesibilidad: skip-link, focus-visible, lang=es-MX, prefers-reduced-motion
- .nojekyll para servir _astro/ en GH Pages"

echo "==> Pushing a origin/main"
git push origin main

echo "==> Listo. Commit pusheado:"
git log --oneline -1
echo ""
echo "Repo temporal: $WORK  (puedes borrarlo con: rm -rf $WORK)"
echo ""
echo "En ~60s origenlab.com debe mostrar el sitio nuevo. Verifica:"
echo "  curl -s https://origenlab.com/ | grep -o 'generator.*Astro[^\"]*'"
