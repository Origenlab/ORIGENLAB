#!/usr/bin/env bash
# Regenera graphify-out/ para ORIGENLAB (AST-only · 0 tokens · rápido).
# Uso: bash _graphify-rebuild.sh
# Para extracción semántica (nodos desde _docs/*.md) usa el slash command /graphify
# dentro de Claude Code o Cowork — requiere subagentes.
set -e

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SITE_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "ERROR: python3 no está instalado."
  exit 1
fi

python3 -c "import graphify" 2>/dev/null || python3 -m pip install graphifyy -q --break-system-packages 2>&1 | tail -3

mkdir -p graphify-out

python3 - << 'PYEOF'
import json
from pathlib import Path
from graphify.detect import detect
from graphify.extract import collect_files, extract
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from graphify.export import to_json, to_html

print('==> detect')
det = detect(Path('.'))
Path('graphify-out/.graphify_detect.json').write_text(json.dumps(det))
print(f'   {det["total_files"]} files, {det["total_words"]:,} words')

print('==> AST extraction')
code_files = []
for f in det.get('files', {}).get('code', []):
    p = Path(f)
    code_files.extend(collect_files(p) if p.is_dir() else [p])
result = extract(code_files) if code_files else {'nodes':[],'edges':[]}
extraction = {'nodes':result['nodes'],'edges':result['edges'],'hyperedges':[],'input_tokens':0,'output_tokens':0}
Path('graphify-out/.graphify_extract.json').write_text(json.dumps(extraction))
print(f'   {len(result["nodes"])} nodes, {len(result["edges"])} edges')

print('==> build + cluster + analyze')
G = build_from_json(extraction)
if G.number_of_nodes() == 0:
    print('ERROR: graph vacío.')
    raise SystemExit(1)
comm = cluster(G)
coh = score_all(G, comm)
gods = god_nodes(G)
surp = surprising_connections(G, comm)
labels = {c: f'Community {c}' for c in comm}
q = suggest_questions(G, comm, labels)

print('==> generate outputs')
Path('graphify-out/GRAPH_REPORT.md').write_text(generate(G, comm, coh, labels, gods, surp, det, {'input':0,'output':0}, '.', suggested_questions=q))
to_json(G, comm, 'graphify-out/graph.json')
to_html(G, comm, 'graphify-out/graph.html', community_labels=labels)

print()
print(f'Master: {G.number_of_nodes()} nodes · {G.number_of_edges()} edges · {len(comm)} communities')
print('Outputs:')
print('  - graphify-out/graph.html  (visualización interactiva)')
print('  - graphify-out/graph.json  (GraphRAG-ready)')
print('  - graphify-out/GRAPH_REPORT.md  (audit)')
PYEOF
