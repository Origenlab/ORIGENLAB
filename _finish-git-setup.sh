#!/usr/bin/env bash
# Termina la configuración de git para ORIGENLAB.
# Corre desde tu Mac, dentro de la carpeta del proyecto:
#   bash _finish-git-setup.sh
set -e

cd "$(dirname "$0")"

echo "==> Limpiando locks de git (si existen)"
rm -f .git/index.lock .git/HEAD.lock .git/objects/maintenance.lock 2>/dev/null || true

echo "==> Dejando de trackear basura (.DS_Store, .fuse_hidden, _backup, graphify-out)"
git ls-files | grep -E '(\.DS_Store$|\.fuse_hidden|^_backup-2026-04-21/|^graphify-out/)' \
  | xargs -r git rm -r --cached --quiet || true

echo "==> Agregando .gitignore, documentación y scripts"
git add .gitignore _docs/ _push-github.sh _graphify-rebuild.sh _finish-git-setup.sh

echo "==> Commit"
git commit -m "Setup git: ignore basura, versionar _docs y scripts" || echo "  (nada que commitear)"

echo "==> Estado final"
git status -sb

echo ""
echo "Si todo se ve bien, sube con:"
echo "   git push origin main"
