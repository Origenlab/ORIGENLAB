#!/usr/bin/env bash
# Push del sitio ORIGENLAB (Astro) al repo github.com/Origenlab/ORIGENLAB
# Corre desde tu Mac — usa tus credenciales git ya configuradas.
set -e

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_URL="https://github.com/Origenlab/ORIGENLAB.git"
WORK=$(mktemp -d)

# ============================================================
# Pre-push hook: regenera graphify-out (AST-only, 0 tokens)
# ============================================================
echo "==> Regenerando graphify-out (AST-only)"
if command -v python3 >/dev/null 2>&1; then
  python3 -c "import graphify" 2>/dev/null || python3 -m pip install graphifyy -q --break-system-packages 2>&1 | tail -1
  cd "$SITE_DIR"
  mkdir -p graphify-out
  python3 - << 'PYEOF'
import json
from pathlib import Path
try:
    from graphify.detect import detect
    from graphify.extract import collect_files, extract
    from graphify.build import build_from_json
    from graphify.cluster import cluster, score_all
    from graphify.analyze import god_nodes, surprising_connections, suggest_questions
    from graphify.report import generate
    from graphify.export import to_json, to_html
except ImportError:
    print('   [skip] graphify not available')
    raise SystemExit(0)

det = detect(Path('.'))
code_files = []
for f in det.get('files', {}).get('code', []):
    p = Path(f)
    code_files.extend(collect_files(p) if p.is_dir() else [p])
result = extract(code_files) if code_files else {'nodes':[],'edges':[]}
extraction = {'nodes':result['nodes'],'edges':result['edges'],'hyperedges':[],'input_tokens':0,'output_tokens':0}
Path('graphify-out/.graphify_extract.json').write_text(json.dumps(extraction))
G = build_from_json(extraction)
if G.number_of_nodes() == 0:
    print('   [skip] empty graph')
    raise SystemExit(0)
comm = cluster(G)
coh = score_all(G, comm)
gods = god_nodes(G)
surp = surprising_connections(G, comm)
labels = {c: f'Community {c}' for c in comm}
q = suggest_questions(G, comm, labels)
Path('graphify-out/GRAPH_REPORT.md').write_text(generate(G, comm, coh, labels, gods, surp, det, {'input':0,'output':0}, '.', suggested_questions=q))
to_json(G, comm, 'graphify-out/graph.json')
to_html(G, comm, 'graphify-out/graph.html', community_labels=labels)
print(f'   graphify: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges, {len(comm)} communities')
PYEOF
else
  echo "   [skip] python3 no disponible"
fi

echo "==> Clonando repo en $WORK"
git clone "$REPO_URL" "$WORK"

echo "==> Limpiando contenido (excepto .git)"
find "$WORK" -maxdepth 1 -mindepth 1 ! -name '.git' -exec rm -rf {} +

echo "==> Sincronizando workspace -> repo (excluye _backup, _docs, graphify-out, scripts)"
rsync -a \
  --exclude='_backup-2026-04-21' \
  --exclude='_docs' \
  --exclude='graphify-out' \
  --exclude='.git' \
  --exclude='_push-github.sh' \
  --exclude='_graphify-rebuild.sh' \
  "$SITE_DIR/" "$WORK/"

cd "$WORK"
git add -A

if git diff --cached --quiet; then
  echo "==> Sin cambios. Saliendo."
  exit 0
fi

git commit -m "Migración completa a Astro + homologación Fase 1 y Fase 2

- Sitio reconstruido con Astro (reemplaza estructura webpack anterior)
- 28 páginas homologadas con sistema ol-* (tokens, layouts, componentes)
- Schema markup (Organization, LocalBusiness, Service, BlogPosting, FAQPage, Review), canonicals y meta tags unificados
- WhatsApp +525547868402 unificado
- Páginas legales: aviso-de-privacidad, terminos, gracias
- Nuevas secciones: cotizar, directorio, portafolio
- Blog reestructurado (blog/slug/index.html) con breadcrumbs y related posts
- Accesibilidad: skip-link, focus-visible, lang=es-MX, prefers-reduced-motion
- Fuentes: preconnect a Google Fonts, sin @import render-blocking
- 65/65 imágenes con width/height/decoding=async (CLS ≈ 0)
- og:title y og:description diferenciados por página"

echo "==> Pushing a origin/main"
git push origin main

echo "==> Listo. Commit pusheado:"
git log --oneline -1
echo ""
echo "Repo temporal: $WORK  (puedes borrarlo con: rm -rf $WORK)"
