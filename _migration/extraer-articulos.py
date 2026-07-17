#!/usr/bin/env python3
"""
Extrae los 172 artículos del blog (HTML) a Markdown + frontmatter.

DECISIÓN DE DISEÑO — por qué el cuerpo se preserva como HTML:

El estudio de junio (memoria `origenlab-estudio-mejoras-fase1`) verificó que el
bloque `.ol-art-*` inline de los artículos es un diseño **distinto** al que ya
vive en premium-dark.css, y que borrarlo tumba páginas. Difirió la extracción
"por riesgo de regresión verificado". Esta migración lo respeta.

Medición propia (2026-07-15): 172 artículos → **34 variantes** de CSS inline
normalizando el color. 112 comparten una (60 líneas, solo cambia el acento).

Por tanto esta pasada hace UNA cosa y la hace bien:
  · frontmatter estructurado y validado por Zod
  · cuerpo HTML preservado literal (paridad garantizada)
  · CSS inline preservado por artículo (`estilos` en el frontmatter)
  · el CHROME sí se deduplica: eso lo da BaseLayout

La consolidación del CSS `.ol-art-*` es un paso POSTERIOR e independiente, con
su propio QA visual. Mezclar ambos cambios haría imposible saber qué rompió qué.
"""
import os, re, sys, json, subprocess, html as H
from datetime import date

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)
DESTINO = 'src/content/articulos'
os.makedirs(DESTINO, exist_ok=True)

CATS = {
    'pci': 'Sector PCI', 'eventos': 'Eventos', 'estrategia': 'Estrategia',
    'seguridad': 'Seguridad', 'rendimiento': 'Rendimiento', 'diseno': 'Diseño',
    'tecnologia': 'Tecnología', 'ecommerce': 'E-commerce', 'agencia': 'Agencia',
}

def yaml_str(s):
    """Escapa para YAML. Los títulos traen ·, —, comillas y dos puntos."""
    if s is None: return '""'
    s = str(s).replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
    return f'"{s}"'

def limpia(t):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', t or '')).strip()

def extraer(p):
    h = open(p, encoding='utf-8', errors='ignore').read()
    slug = p.split('/')[1]
    g = lambda pat, d=None: (re.search(pat, h, re.S).group(1).strip() if re.search(pat, h, re.S) else d)

    titulo = H.unescape(g(r'<title>(.*?)</title>', ''))
    desc   = H.unescape(g(r'<meta name="description" content="(.*?)"', ''))
    h1     = limpia(g(r'<h1[^>]*class="ol-art-title"[^>]*>(.*?)</h1>') or g(r'<h1[^>]*>(.*?)</h1>', ''))

    cat = g(r'<span class="ol-blog-cat ([a-z-]+)"') or g(r'class="ol-art-cat[^"]*"[^>]*>([^<]+)<')
    if cat not in CATS:
        cat = 'pci' if re.search(r'extintor|incendio|nfpa|bombero', slug) else \
              'eventos' if re.search(r'inflable|evento|fiesta|led|pantalla', slug) else \
              'seguridad' if 'seguridad' in slug else 'estrategia'

    img = g(r'property="og:image" content="https://origenlab\.com([^"]+)"') or \
          g(r'property="og:image" content="([^"]+)"') or '/og-image.jpg'
    alt = g(r'<img[^>]+src="' + re.escape(img) + r'"[^>]*alt="([^"]*)"') or limpia(h1)[:80] or titulo[:80]

    mins = g(r'<span class="ol-art-meta-item">\s*(\d+)\s*min') or g(r'(\d+)\s*min')
    fecha = g(r'"datePublished":"(\d{4}-\d{2}-\d{2})') or g(r'<time[^>]*datetime="(\d{4}-\d{2}-\d{2})') or '2026-06-04'
    acento = g(r'--art-accent:\s*(#[0-9A-Fa-f]{6})') or g(r'--case-accent:\s*(#[0-9A-Fa-f]{6})')

    # FAQ visible — el texto debe coincidir literal con el FAQPage (Google lo exige)
    faq = []
    for q, a in re.findall(r'class="ol-art-faq-q"[^>]*>(.*?)</[^>]+>\s*<[^>]*class="ol-art-faq-a"[^>]*>(.*?)</', h, re.S):
        faq.append({'pregunta': limpia(q), 'respuesta': limpia(a)})

    estilos = ''.join(re.findall(r'<style[^>]*>(.*?)</style>', h, re.S)).strip()

    m = re.search(r'<main[^>]*>(.*?)</main>', h, re.S)
    cuerpo = m.group(1).strip() if m else ''
    # el quicknav lo pone el layout, no el contenido
    cuerpo = re.sub(r'<div class="ol-quicknav">.*?</div>\s*</div>\s*', '', cuerpo, flags=re.S)

    if not mins:
        mins = max(3, round(len(limpia(cuerpo).split()) / 220))

    return dict(slug=slug, titulo=titulo, desc=desc, h1=h1, cat=cat, img=img, alt=alt,
                mins=int(mins), fecha=fecha, acento=acento, faq=faq, estilos=estilos, cuerpo=cuerpo)

def escribir(d):
    fm = ['---']
    fm.append(f'titulo: {yaml_str(d["titulo"])}')
    fm.append(f'descripcion: {yaml_str(d["desc"])}')
    fm.append(f'h1: {yaml_str(d["h1"][:60])}')
    fm.append(f'categoria: {d["cat"]}')
    fm.append(f'categoriaLabel: {yaml_str(CATS[d["cat"]])}')
    fm.append(f'fecha: {d["fecha"]}')
    fm.append(f'minutos: {d["mins"]}')
    fm.append(f'thumb: {yaml_str(d["img"])}')
    fm.append(f'thumbAlt: {yaml_str(d["alt"])}')
    if d['acento']: fm.append(f'acento: {yaml_str(d["acento"])}')
    if d['faq']:
        fm.append('faq:')
        for f in d['faq']:
            fm.append(f'  - pregunta: {yaml_str(f["pregunta"])}')
            fm.append(f'    respuesta: {yaml_str(f["respuesta"])}')
    if d['estilos']:
        fm.append('estilos: |')
        for l in d['estilos'].split('\n'):
            fm.append('  ' + l)
    fm.append('---')
    open(f'{DESTINO}/{d["slug"]}.md', 'w', encoding='utf-8').write('\n'.join(fm) + '\n\n' + d['cuerpo'] + '\n')

if __name__ == '__main__':
    tracked = subprocess.check_output(['git', 'ls-files'], text=True).split('\n')
    arts = [p for p in tracked if p.startswith('blog/') and p.endswith('/index.html')]
    problemas = []
    for p in arts:
        try:
            d = extraer(p)
            if not d['titulo'] or not d['desc']: problemas.append((p, 'sin title/desc')); continue
            if len(d['desc']) > 160: problemas.append((p, f'desc {len(d["desc"])}>160')); continue
            escribir(d)
        except Exception as e:
            problemas.append((p, str(e)[:60]))
    hechos = len(os.listdir(DESTINO))
    print(f"artículos extraídos: {hechos}/{len(arts)}")
    if problemas:
        print(f"\nno migrados: {len(problemas)}")
        for p, r in problemas[:10]: print(f"  · {p}: {r}")
