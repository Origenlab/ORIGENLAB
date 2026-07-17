#!/usr/bin/env python3
"""
Gate de paridad de la migración a Astro 6.

Compara lo que genera `dist/` contra el inventario congelado de las 283 páginas
HTML que hoy sirve origenlab.com (`_migration/referencia.json`).

    python3 _migration/paridad.py            # informe
    python3 _migration/paridad.py --strict   # código 1 si falta paridad

**No se toca el DNS ni el deploy hasta que esto salga en verde.**

Por qué existe: la migración solo es segura si las 283 URLs indexadas siguen
existiendo. Un diff mecánico lo prueba; la intuición no. Ver _docs/49 §5.
"""
import json, os, re, sys

STRICT = '--strict' in sys.argv
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = json.load(open(os.path.join(RAIZ, '_migration/referencia.json'), encoding='utf-8'))
DIST = os.path.join(RAIZ, 'dist')

def c(t, col): return f"\033[{col}m{t}\033[0m"
ok, bad, warn = lambda t: print('  ' + c('✓', 32) + ' ' + t), lambda t: print('  ' + c('✗', 31) + ' ' + t), lambda t: print('  ' + c('!', 33) + ' ' + t)

if not os.path.isdir(DIST):
    print(c('No hay dist/. Corre `npm run build` primero.', 31)); sys.exit(1)

# ── rutas generadas ───────────────────────────────────────────────────────
gen = {}
for root, _, fs in os.walk(DIST):
    if 'index.html' not in fs: continue
    u = (root.replace(DIST, '') or '/')
    if not u.endswith('/'): u += '/'
    gen[u] = open(os.path.join(root, 'index.html'), encoding='utf-8', errors='ignore').read()

esperadas, generadas = set(REF), set(gen)
faltan, sobran = sorted(esperadas - generadas), sorted(generadas - esperadas)

print(c(f"\nPARIDAD — esperadas {len(esperadas)} · generadas {len(generadas)}", 1))

print(c("\nRutas", 1))
(ok if not faltan else bad)(f"faltan por generar: {len(faltan)}")
for u in faltan[:12]: print(f"      − {u}")
if len(faltan) > 12: print(f"      … +{len(faltan)-12} más")
(ok if not sobran else warn)(f"generadas de más: {len(sobran)}")
for u in sobran[:6]: print(f"      + {u}")

# ── SEO por ruta (solo las que existen en ambos) ──────────────────────────
comunes = sorted(esperadas & generadas)
print(c(f"\nSEO por ruta ({len(comunes)} comparables)", 1))

def campo(h, pat, limpia=False):
    m = re.search(pat, h, re.S)
    if not m: return None
    v = m.group(1).strip()
    return re.sub(r'<[^>]+>', '', v).strip() if limpia else v

difs = {k: [] for k in ('title', 'desc', 'canonical', 'og_title', 'og_image', 'h1', 'jsonld', 'noindex')}
for u in comunes:
    h, r = gen[u], REF[u]
    act = {
        'title':     campo(h, r'<title>(.*?)</title>'),
        'desc':      campo(h, r'<meta name="description" content="(.*?)">'),
        'canonical': campo(h, r'rel="canonical" href="(.*?)"'),
        'og_title':  campo(h, r'property="og:title" content="(.*?)"'),
        'og_image':  campo(h, r'property="og:image" content="(.*?)"'),
        'h1':        campo(h, r'<h1[^>]*>(.*?)</h1>', limpia=True),
    }
    for k, v in act.items():
        if v != r[k]: difs[k].append((u, r[k], v))
    tipos = sorted({t for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)
                      for t in re.findall(r'"@type":"([^"]+)"', b)})
    if tipos != r['jsonld_types']: difs['jsonld'].append((u, r['jsonld_types'], tipos))
    ni = bool(re.search(r'name="robots"[^>]*noindex', h))
    if ni != r['noindex']: difs['noindex'].append((u, r['noindex'], ni))

for k, lista in difs.items():
    (ok if not lista else bad)(f"{k}: {len(lista)} diferencia(s)")
    for u, esp, act in lista[:2]:
        print(f"      {u}\n        esperado: {str(esp)[:76]}\n        actual:   {str(act)[:76]}")

# ── resumen ───────────────────────────────────────────────────────────────
fallos = len(faltan) + sum(len(v) for v in difs.values())
print(c(f"\n{'✅ PARIDAD COMPLETA' if fallos == 0 else f'⚠️  {fallos} diferencia(s) — NO desplegar'}", 32 if fallos == 0 else 31))
if fallos:
    print(f"   avance: {len(comunes)-sum(len(v) for v in difs.values())}/{len(esperadas)} rutas con paridad total")
if STRICT and fallos: sys.exit(1)
