#!/usr/bin/env python3
"""
Inserta el enlace "Paquetes" (/paquetes/) en nav desktop, nav mobile y footer
de todas las paginas live de ORIGENLAB. Idempotente: si ya existe el link en
esa seccion, no la vuelve a insertar. Modo --dry-run por defecto.
"""
import os, re, sys, json

ROOT = '.'
EXCLUDE_DIRS = {'_backup-2026-04-21', 'MASTER WEB PRODUCTION SYSTEM', '_AUDITORIA', '_docs',
                 '_branding', '_tools', '_reports', 'CONSULTORIO-WEB', '.git', 'node_modules'}
EXCLUDE_FILES = {'./automate_whatsapp.html', './cotizar.html'}  # cotizar.html es legado sin header estandar

DESKTOP_RE = re.compile(r'(<li class="ol-has-dropdown">\s*<a href="/portafolio/" class="ol-nav-link)')
DESKTOP_INSERT = '        <li><a href="/paquetes/" class="ol-nav-link">Paquetes</a></li>\n'

MOBILE_RE = re.compile(r'(<li>\s*<button class="ol-mobile-link ol-mobile-sub-toggle" data-submenu>\s*<span>Portafolio</span>)')
MOBILE_INSERT = '    <li><a href="/paquetes/" class="ol-mobile-link">Paquetes</a></li>\n'

# Fallback mobile: paginas con nav mobile simplificado (directorios L9, casos L4) sin
# dropdown de Portafolio. "Inicio" es universal en todas las variantes vistas.
MOBILE_FALLBACK_RE = re.compile(r'(<li><a href="/" class="ol-mobile-link">Inicio</a></li>)')
MOBILE_FALLBACK_INSERT = '<li><a href="/paquetes/" class="ol-mobile-link">Paquetes</a></li>'

# Footer patron A: columnas con <p class="ol-footer-col-title"> + <li><a href="...">
FOOTER_A_RE = re.compile(r'(<li><a href="/blog/">Blog</a></li>)')
FOOTER_A_INSERT = '<li><a href="/paquetes/">Paquetes</a></li>'

# Footer patron B: columnas con <h3 class="ol-footer-col-title"> + <a class="ol-footer-link"> (blog articles)
FOOTER_B_RE = re.compile(r'(<a href="/blog/" class="ol-footer-link">Blog</a>)')
FOOTER_B_INSERT = '<a href="/paquetes/" class="ol-footer-link">Paquetes</a>'

# Footer patron C: variante sin clases (algunos articulos blog "proyecto-red").
# Se ancla incluyendo el link de Portafolio previo para no confundir con el
# mismo texto "Blog" en el breadcrumb.
FOOTER_C_RE = re.compile(r'(<a href="/portafolio/">Portafolio</a>\s*<a href="/blog/">Blog</a>)')
FOOTER_C_INSERT = '<a href="/paquetes/">Paquetes</a>'

def find_files():
    files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith('.')]
        for fn in filenames:
            if fn.endswith('.html'):
                p = os.path.join(dirpath, fn)
                if p not in EXCLUDE_FILES:
                    files.append(p)
    return sorted(files)

def process(path, apply_changes):
    text = open(path, encoding='utf-8').read()
    orig = text
    report = {'file': path, 'desktop': 'skip', 'mobile': 'skip', 'footer': 'skip'}

    has_header = '<header class="ol-header" id="ol-header">' in text
    if not has_header:
        report['desktop'] = report['mobile'] = report['footer'] = 'no-header'
        return report, text, False

    # Desktop nav
    if 'href="/paquetes/" class="ol-nav-link"' in text:
        report['desktop'] = 'already-present'
    else:
        n = len(DESKTOP_RE.findall(text))
        if n == 1:
            text = DESKTOP_RE.sub(DESKTOP_INSERT + r'\1', text, count=1)
            report['desktop'] = 'inserted'
        else:
            report['desktop'] = f'anomaly({n})'

    # Mobile nav
    if 'href="/paquetes/" class="ol-mobile-link"' in text:
        report['mobile'] = 'already-present'
    else:
        n = len(MOBILE_RE.findall(text))
        if n == 1:
            text = MOBILE_RE.sub(MOBILE_INSERT + r'\1', text, count=1)
            report['mobile'] = 'inserted'
        elif n == 0:
            nf = len(MOBILE_FALLBACK_RE.findall(text))
            if nf == 1:
                text = MOBILE_FALLBACK_RE.sub(r'\1' + MOBILE_FALLBACK_INSERT, text, count=1)
                report['mobile'] = 'inserted-fallback'
            else:
                report['mobile'] = f'anomaly(0,fallback={nf})'
        else:
            report['mobile'] = f'anomaly({n})'

    # Footer
    if 'href="/paquetes/"' in text and ('ol-footer-link">Paquetes' in text or '"/paquetes/">Paquetes</a></li>' in text):
        report['footer'] = 'already-present'
    else:
        nA = len(FOOTER_A_RE.findall(text))
        nB = len(FOOTER_B_RE.findall(text))
        if nA == 1 and nB == 0:
            text = FOOTER_A_RE.sub(r'\1' + FOOTER_A_INSERT, text, count=1)
            report['footer'] = 'inserted-A'
        elif nB == 1 and nA == 0:
            text = FOOTER_B_RE.sub(r'\1' + FOOTER_B_INSERT, text, count=1)
            report['footer'] = 'inserted-B'
        elif nA == 0 and nB == 0:
            nC = len(FOOTER_C_RE.findall(text))
            if nC == 1:
                text = FOOTER_C_RE.sub(r'\1' + FOOTER_C_INSERT, text, count=1)
                report['footer'] = 'inserted-C'
            else:
                report['footer'] = f'anomaly(0,C={nC})'
        else:
            report['footer'] = f'anomaly(A={nA},B={nB})'

    changed = text != orig
    if apply_changes and changed:
        open(path, 'w', encoding='utf-8').write(text)
    return report, text, changed

def main():
    apply_changes = '--apply' in sys.argv
    files = find_files()
    reports = []
    changed_count = 0
    for f in files:
        report, _, changed = process(f, apply_changes)
        reports.append(report)
        if changed:
            changed_count += 1

    summary = {'desktop': {}, 'mobile': {}, 'footer': {}}
    for r in reports:
        for k in ('desktop', 'mobile', 'footer'):
            summary[k][r[k]] = summary[k].get(r[k], 0) + 1

    print("MODE:", "APPLY" if apply_changes else "DRY-RUN")
    print("total files scanned:", len(files))
    print("files changed:", changed_count)
    print(json.dumps(summary, indent=2, ensure_ascii=False))

    anomalies = [r for r in reports if any(str(r[k]).startswith('anomaly') for k in ('desktop','mobile','footer'))]
    print("\nfiles with at least one anomaly:", len(anomalies))
    for r in anomalies:
        print(" ", r)

if __name__ == '__main__':
    main()
