# Graph Snapshot — 2026-04-21

> Regeneración de `graphify-out/` para ORIGENLAB con **extracción semántica** + grafo maestro en `~/Documents/Claude/Projects/graphify-out/` (AST-only). Se ejecutó desde Cowork porque Claude Code tiene bloqueado `python3` en permisos.

## Dos grafos: uno por proyecto + uno maestro

- **ORIGENLAB** — `ORIGENLAB/graphify-out/` — AST + semantic full. Valor alto: captura el sistema `ol-*`, el design system, los blog posts, las páginas L1/L2, el deploy workflow.
- **Master** — `Projects/graphify-out/` — AST-only sobre los 9 proyectos. Valor medio: mapa cross-project de código, ideal para ver arquitecturas paralelas.

## Stats — ORIGENLAB (con semántica)

| Métrica | AST-only (anterior) | AST + Semantic (nuevo) | Δ |
|---|---|---|---|
| Nodos | 35 | **180** | +414% |
| Edges | 54 | **255** | +372% |
| Comunidades | 5 | **32** | +540% |
| Hyperedges | 0 | **12** | — |
| Extracción | 100% EXTRACTED | 96% EXTRACTED · 4% INFERRED | — |

### God nodes reales (post-semántica)

1. `OrigenLab — Sistema de Diseño` — 12 edges
2. `Color: Acento Oro (#C9A84C)` — 11 edges
3. `Cotizar (Page)` — 10 edges
4. `Page Hero de Subpágina (ol-page-hero)` — 9 edges
5. `Layout L2 — Nosotros` — 8 edges
6. `Layout L2 — Portafolio` — 8 edges
7. `Open Graph Social Card (SVG)` — 8 edges
8. `Layout L2 — Blog` — 7 edges
9. `Color: Fondo Card (#0C0C18)` — 7 edges
10. `Sección: Servicios (ol-services)` — 7 edges

**Contraste con AST-only**: antes los god nodes eran `e()`, `n()`, `i()` — funciones de bundler de Astro sin valor narrativo. Ahora reflejan el **sistema de diseño real** del sitio.

### Comunidades nombradas (top 10)

| # | Nombre | Nodos |
|---|---|---|
| 0 | Sistema de Diseño ol-* | 29 |
| 1 | Portafolio & Clientes | 25 |
| 2 | Cloudflare rocket-loader (noise) | 23 |
| 3 | Blog de Contenidos | 22 |
| 4 | Flujo de Conversión (Cotizar/Gracias) | 13 |
| 5 | Identidad de Marca | 12 |
| 6 | Pages L1/L2 Core | 11 |
| 7 | Cloudflare email-decode (noise) | 9 |
| 8 | Deploy & GitHub | 5 |
| 10 | Navegación (Topbar/Header/Mobile) | 3 |

### Hyperedges destacados

- **Design Tokens - Color System** — acento_oro + fondo_base + fondo_alt + fondo_dark + fondo_card [EXTRACTED 1.0]
- **GitHub Deploy Workflow** — doc29 + commit c6f0d20 + repo + push script [EXTRACTED 1.0]
- **L2 Nosotros / L2 Blog** — layout + ol-about + ol-page-hero + quicknav [EXTRACTED 0.95]
- **OrigenLab Brand Identity System** — wordmark + logo mark + palette + Inter + gold [EXTRACTED 0.95]
- **Navigation System** — ol_header + index + servicios + 4 svc pages [EXTRACTED 0.90]
- **Service Detail Pattern** — 4 servicios L3 + ol-faq [INFERRED 0.80]
- **Open Graph Card Visual System** — svg + png + jpg + palette + wordmark + tagline [EXTRACTED 1.0]

## Stats — Master graph (AST-only, 9 proyectos)

| Métrica | Valor |
|---|---|
| Archivos detectados | 3,285 · ~10.4M palabras |
| Tipos | 159 code · 1,369 docs · 1,757 imgs |
| Nodos (AST) | **681** |
| Edges | **1,326** |
| Comunidades | 66 |

Valor: comparar patrones entre PODIUMEX, MESASPICNIC, PROYECTORED, ORIGENLAB, etc. — los 9 sitios que Frank mantiene. Ver qué módulos JS se repiten, qué componentes se replican.

Semantic extraction en este grafo maestro **no se corrió** — costaría ~150+ subagent calls. Si algún día aporta valor, se puede correr por proyecto individualmente y agregar.

## Método de semántica (para ORIGENLAB)

1. **Detect** — 99 files, 216k palabras, 3 code + 90 docs + 6 images
2. **Filter** — excluidos `_backup-2026-04-21/`, `cdn-cgi/`, `graphify-out/` → 67 files relevantes
3. **Chunking** — 4 chunks de docs (~16 c/u) + 1 chunk de 6 imágenes
4. **Dispatch** — 5 subagentes `general-purpose` en paralelo con Agent tool (single message, 5 llamadas)
5. **Output per chunk** — JSON con nodes/edges/hyperedges escrito a `.graphify_chunk_N.json`
6. **Merge** — cached (AST previo) + new → `180 nodos, 268 edges, 12 hyperedges`
7. **Build → Cluster → Label → Export** — HTML + JSON + GRAPH_REPORT.md

**Tokens consumidos** — ~545k totales (5 subagentes combinados). Se ve en usage: chunk 4 fue el más caro por los blog posts largos.

## Hook de regeneración

Nuevo script `_graphify-rebuild.sh` en la raíz del proyecto — regenera el grafo AST-only en cualquier momento sin consumir tokens.

También se **inyectó en `_push-github.sh`**: antes de cada push, corre AST-only y actualiza `graphify-out/` localmente (se excluye del rsync al repo remoto).

Para re-correr la extracción semántica completa hay que usar `/graphify` desde Claude Code/Cowork (requiere subagentes de Claude).

## Cómo acceder

- **HTML interactivo**: abre `graphify-out/graph.html` en cualquier navegador
  - ORIGENLAB: `~/Documents/claude/projects/ORIGENLAB/graphify-out/graph.html`
  - Master: `~/Documents/Claude/Projects/graphify-out/graph.html`
- **JSON**: `graphify-out/graph.json` — GraphRAG-ready
- **Report**: `graphify-out/GRAPH_REPORT.md` — audit completo con god nodes + surprising connections

## Pendientes

1. ~~Re-correr ORIGENLAB con semántica~~ ✅ hecho
2. ~~Regenerar grafo maestro~~ ✅ hecho (AST-only)
3. ~~Git post-commit hook~~ ✅ inyectado en `_push-github.sh` + script standalone `_graphify-rebuild.sh`
4. (opcional) Semantic extraction de los otros 8 proyectos para un grafo maestro más rico
5. (opcional) Agregar categorías MDX/front-matter a nodos para filtrar por tipo en el HTML

## Referencias

- [[00 — ÍNDICE]]
- [[29 — Deploy & GitHub Push (2026-04-21)]]
