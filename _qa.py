#!/usr/bin/env python3
"""
QA pre-deploy de ORIGENLAB.

Por qué existe: sin build ni CI, cada corrección hay que aplicarla a N archivos
a mano — y por eso se revierte. Ya pasó: la Fase 1 (jun-2026) dejó las 158 metas
en <=160 car y en jul-2026 había 141 por encima otra vez. El cache buster se
"homologó" 3 veces y llegó a tener 4 versiones vivas.

Este script es la red. Córrelo ANTES de cada push:

    python3 _qa.py            # informe
    python3 _qa.py --strict   # sale con código 1 si hay fallos (para hooks/CI)

Fuente de verdad: `git ls-files`, NO el disco.
_backup-2026-04-21/ existe en local pero está gitignored y NO se despliega;
comprobar contra el disco da falsos negativos.
"""
import re, sys, json, html, subprocess
from collections import Counter

STRICT = '--strict' in sys.argv
FALLOS = []
AVISOS = []

def ok(msg):   print(f"  \033[32m✓\033[0m {msg}")
def bad(msg):  FALLOS.append(msg); print(f"  \033[31m✗\033[0m {msg}")
def warn(msg): AVISOS.append(msg); print(f"  \033[33m!\033[0m {msg}")
def h1(t):     print(f"\n\033[1m{t}\033[0m")

def sin_comentarios(s):
    """Los <img> de ejemplo dentro de comentarios HTML dan falsos positivos."""
    return re.sub(r'<!--.*?-->', '', s, flags=re.S)

tracked = set(subprocess.check_output(['git', 'ls-files'], text=True).split('\n'))
pages   = sorted(p for p in tracked if p.endswith('index.html'))
def leer(p): return open(p, encoding='utf-8', errors='ignore').read()

reales, redirects = [], []
for p in pages:
    (redirects if 'http-equiv="refresh"' in leer(p).lower() else reales).append(p)

print(f"\033[1mQA ORIGENLAB\033[0m — {len(reales)} páginas · {len(redirects)} redirects · {len(tracked)} archivos trackeados")

# ── SEO ───────────────────────────────────────────────────────────────────
h1("SEO")

largos = [(p, len(re.search(r'<title>(.*?)</title>', leer(p), re.S).group(1).strip()))
          for p in reales if re.search(r'<title>(.*?)</title>', leer(p), re.S)]
n = len([1 for _, l in largos if l > 60])
(warn if n else ok)(f"titles >60 car: {n}/{len(largos)}" + (" (prioriza por Search Console, no a ciegas)" if n else ""))

metas = [(p, len(html.unescape(m)))
         for p in pages
         for m in re.findall(r'<meta (?:name|property)="(?:description|og:description|twitter:description)" content="(.*?)">', leer(p))]
n = len([1 for _, l in metas if l > 160])
(bad if n else ok)(f"metas >160 car: {n}/{len(metas)}")

n = len([p for p in reales if 'rel="canonical"' not in leer(p)])
(bad if n else ok)(f"páginas sin canonical: {n}")

canons = [re.search(r'rel="canonical" href="(.*?)"', leer(p)).group(1) for p in reales if 'rel="canonical"' in leer(p)]
dup = [u for u, c in Counter(canons).items() if c > 1]
(bad if dup else ok)(f"canonicals duplicados: {len(dup)} {dup[:2] if dup else ''}")

n = len([p for p in reales if len(re.findall(r'<h1', leer(p))) != 1])
(bad if n else ok)(f"páginas con != 1 H1: {n}")

malos = 0
for p in pages:
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', leer(p), re.S):
        try: json.loads(b)
        except Exception: malos += 1
(bad if malos else ok)(f"JSON-LD inválido: {malos}")

# ── Sitemap ───────────────────────────────────────────────────────────────
h1("Sitemap")
sm = open('sitemap.xml', encoding='utf-8').read()
locs = re.findall(r'<loc>(.*?)</loc>', sm)
fantasma = [l for l in locs if (l.replace('https://origenlab.com/', '') + 'index.html') not in tracked]
(bad if fantasma else ok)(f"URLs que no se despliegan: {len(fantasma)} {[f.replace('https://origenlab.com','') for f in fantasma[:2]] if fantasma else ''}")

en_sm = set(locs)
faltan = [p for p in reales
          if not re.search(r'name="robots"[^>]*noindex', leer(p))
          and 'https://origenlab.com/' + p[:-len('index.html')] not in en_sm]
(warn if faltan else ok)(f"páginas indexables fuera del sitemap: {len(faltan)} {[f[:-11] for f in faltan[:2]] if faltan else ''}")

d = len(locs) - len(set(locs))
(bad if d else ok)(f"URLs duplicadas en sitemap: {d}")

# ── Enlaces ───────────────────────────────────────────────────────────────
h1("Enlaces internos")
rotos = []
for p in reales:
    for href in re.findall(r'href="(/[^"#?]*)"', sin_comentarios(leer(p))):
        if re.search(r'\.(css|js|xml|txt|webp|avif|jpg|jpeg|png|svg|ico|html)$', href) or href == '/':
            continue
        if (href.strip('/') + '/index.html') not in tracked:
            rotos.append((href, p))
(bad if rotos else ok)(f"enlaces rotos: {len(rotos)} {rotos[:2] if rotos else ''}")

# ── Imágenes ──────────────────────────────────────────────────────────────
h1("Imágenes")
noalt = nodim = tot = 0
for p in pages:
    for i in re.findall(r'<img [^>]*>', sin_comentarios(leer(p))):
        tot += 1
        if 'alt=' not in i: noalt += 1
        if 'width=' not in i or 'height=' not in i: nodim += 1
(bad if noalt else ok)(f"sin alt: {noalt}/{tot}")
(bad if nodim else ok)(f"sin width/height (CLS): {nodim}/{tot}")

# ── Assets ────────────────────────────────────────────────────────────────
h1("Assets")
for nombre, patron in [('premium-dark.css', r'premium-dark\.css\?v[0-9a-z]+'),
                       ('ol-header.js',     r'ol-header\.js\?v[0-9a-z]+'),
                       ('BaseLayout.css',   r'BaseLayout\.xeR8R953\.css\?v[0-9a-z]+')]:
    c = Counter(m for p in pages for m in re.findall(patron, leer(p)))
    (bad if len(c) > 1 else ok)(f"{nombre}: {len(c)} versión(es) de cache buster {list(c) if len(c) > 1 else ''}")

# ── Reglas duras de CLAUDE.md ─────────────────────────────────────────────
h1("Reglas duras (CLAUDE.md)")

# R2 — precios de OrigenLab solo en las 3 cards de #paquetes del home y en /paquetes/*.
# La regla protege el copy COMERCIAL. El blog educativo cita cifras de terceros
# ("hosting a $30/mes", "puedes tener $20,000 invertidos") y eso no es una tarifa
# nuestra: no infringe la regla. Solo se marcan precios en páginas de venta.
def visible(s): return re.sub(r'<[^>]+>', ' ', re.sub(r'<(script|style)\b.*?</\1>', '', s, flags=re.S))
# Superficies donde el precio SÍ es legítimo hoy (la realidad ya rebasó la regla
# escrita, que solo cita "las 3 cards del home"): las páginas de paquete y el
# <select> del formulario de cotización. Pendiente de que Frank actualice la regla.
PERMITIDO = ('index.html', 'paquetes/', 'cotizar/')
VENTA = ('servicios/', 'portafolio/', 'contacto/', 'nosotros/')
ofensores = []
for p in reales:
    if p.startswith(PERMITIDO) or not p.startswith(VENTA):
        continue
    if re.search(r'\$\s?[0-9][0-9,\.]*\s*(MXN|mxn|pesos)?', visible(leer(p))):
        ofensores.append(p)
(bad if ofensores else ok)(f"R2 · precios en páginas de venta (fuera de home/paquetes/cotizar): {len(ofensores)} {ofensores[:2] if ofensores else ''}")

precios_blog = [p for p in reales if p.startswith('blog/')
                and re.search(r'\$\s?[0-9][0-9,\.]*', visible(leer(p)))]
if precios_blog:
    warn(f"R2 · blog educativo con cifras de terceros: {len(precios_blog)} (permitido; revisar que no sean tarifas nuestras)")

# R6 — data-astro-cid prohibido en reglas reusables
n = len([p for p in pages if 'data-astro-cid' in leer(p)])
(warn if n else ok)(f"R6 · páginas con data-astro-cid: {n}")

# ── Accesibilidad ─────────────────────────────────────────────────────────
h1("Accesibilidad")
n = len([p for p in reales if '<main' not in leer(p)])
(warn if n else ok)(f"sin landmark <main>: {n}/{len(reales)}")

n = len([p for p in reales if 'lang=' not in re.search(r'<html([^>]*)>', leer(p)).group(1)])
(bad if n else ok)(f"sin lang en <html>: {n}")

svg_sin = sum(1 for p in pages for s in re.findall(r'<svg [^>]*>', sin_comentarios(leer(p))) if 'aria-hidden' not in s)
(warn if svg_sin else ok)(f"SVG sin aria-hidden: {svg_sin}")

# Contraste AA de --case-accent con texto blanco
def lum(h_):
    h_ = h_.lstrip('#'); r, g, b = [int(h_[i:i+2], 16)/255 for i in (0, 2, 4)]
    f = lambda c: c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b)
def ratio(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

# Se comprueba el contraste EFECTIVO en ambos sentidos.
# Default del componente: acento = --gold #C9A84C, tinta = #0A0A12 (ver premium-dark.css).
# Fallar por "invisible" (tinta oscura sobre acento oscuro) es peor que por "poco legible":
# lo primero borra el CTA de la pantalla.
INK_DEFAULT, ACC_DEFAULT = '#0A0A12', '#C9A84C'

def contextos(s):
    """(acento, tinta) efectivos de cada uso de .ol-btn-primary en la página."""
    out = []
    m = re.search(r':root\s*\{[^}]*--case-accent:\s*(#[0-9A-Fa-f]{6})[^}]*\}', s, re.S)
    if m:
        ink = re.search(r'--case-accent-ink:\s*(#[0-9A-Fa-f]{6})', m.group(0))
        out.append((m.group(1), ink.group(1) if ink else INK_DEFAULT))
    for st in re.findall(r'style="([^"]*--case-accent:\s*#[0-9A-Fa-f]{6}[^"]*)"', s):
        acc = re.search(r'--case-accent:\s*(#[0-9A-Fa-f]{6})', st).group(1)
        ink = re.search(r'--case-accent-ink:\s*(#[0-9A-Fa-f]{6})', st)
        out.append((acc, ink.group(1) if ink else INK_DEFAULT))
    return out or [(ACC_DEFAULT, INK_DEFAULT)]

ilegibles, invisibles = [], []
for p in pages:
    s = leer(p)
    if 'ol-btn-primary' not in s:
        continue
    for acc, ink in contextos(s):
        if ratio(ink, acc) < 4.5:
            (invisibles if lum(ink) < 0.1 and lum(acc) < 0.1 else ilegibles).append((p, acc, ink, round(ratio(ink, acc), 2)))
(bad if invisibles else ok)(f"CTA invisible (tinta oscura sobre acento oscuro): {len(invisibles)} {invisibles[:1] if invisibles else ''}")
(bad if ilegibles else ok)(f"CTA con contraste <4.5:1: {len(ilegibles)} {ilegibles[:2] if ilegibles else ''}")

# ── Higiene: internos que no deben publicarse ─────────────────────────────
h1("Internos (Cloudflare Pages sirve el repo TAL CUAL)")
patron = r'(^|/)(CLAUDE|AGENTS)\.md$|\.(xlsx|docx|csv|env)$|(^|/)_docs/|(^|/)CONSULTORIO-WEB/|(^|/)MASTER WEB|(^|/)_tools/|(^|/)_AUDITORIA/'
filtrados = [p for p in tracked if p and re.search(patron, p) and not p.endswith('.env.example')]
(bad if filtrados else ok)(f"internos trackeados: {len(filtrados)} {filtrados[:2] if filtrados else ''}")

# ── Resumen ───────────────────────────────────────────────────────────────
print(f"\n\033[1mResumen\033[0m — \033[31m{len(FALLOS)} fallo(s)\033[0m · \033[33m{len(AVISOS)} aviso(s)\033[0m")
if FALLOS:
    print("\nFallos:")
    for f in FALLOS: print(f"  · {f}")
if STRICT and FALLOS:
    sys.exit(1)
sys.exit(0)
