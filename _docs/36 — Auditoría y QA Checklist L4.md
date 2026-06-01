# 36 — Auditoría y QA Checklist L4

> Checklist mecánico para validar que un L4 cumple el estándar profesional. Ejecutar después de cualquier cambio en un caso o cuando se incorpora uno nuevo.
> Última actualización: 2026-04-26

---

## A. Reglas duras (auto-bloqueantes)

| # | Regla | Comando bash | Aceptación |
|---|-------|--------------|-----------|
| A1 | Sin menciones de SEO/posicionamiento | `grep -ic 'SEO\|posicionamiento'` | 0 |
| A2 | Sin precios (símbolo `$`) en HTML del caso | `grep -c '\$'` excluyendo CSS/scripts | 0 menciones de precio en copy |
| A3 | Sin plazos comprometidos (`en X semanas`, `entrega en`) | búsqueda manual de copy | 0 |
| A4 | Sin animaciones en cards/imágenes | revisión de `<style>` inline | sólo botones |

## B. Accesibilidad (a11y)

| # | Regla | Comando | Aceptación |
|---|-------|---------|-----------|
| B1 | `aria-hidden="true" focusable="false"` en SVG decorativos | `grep -c 'aria-hidden'` | ≥30 |
| B2 | Skip-link como primer elemento del `<body>` | grep manual | Presente |
| B3 | `aria-label` en `<nav>` principal, mobile, breadcrumb, sidebar y form | grep `aria-label` | ≥6 |
| B4 | `aria-current="page"` en breadcrumb actual | grep manual | Presente |
| B5 | `aria-expanded` en hamburger toggle | grep manual | Presente |

## C. Consistencia terminológica

| # | Regla | Comando | Aceptación |
|---|-------|---------|-----------|
| C1 | Plural en chip "Formularios B2B" | `grep -c 'Formulario B2B</span>'` | 0 (singular ausente) |
| C1b | Plural presente | `grep -c 'Formularios B2B</span>'` | ≥1 |
| C2 | CTA "Ver caso" en card y showcase del L3 | grep en sector page | uniforme |
| C3 | Sección 05 con id válido (`#catalogo`, `#servicios` o `#proyectos`) | grep manual | Presente |

## D. JSON-LD enriquecido

| # | Regla | Verificación |
|---|-------|--------------|
| D1 | `@graph` con 5 nodos | parse JSON, count graph |
| D2 | `Organization` OrigenLab con `@id` `https://origenlab.com/#organization` | parse |
| D3 | `WebSite` con `@id` `https://origenlab.com/#website` | parse |
| D4 | `BreadcrumbList` con `@id` propio `[canonical]#breadcrumbs` | parse |
| D5 | `Organization` del cliente con `@id` `https://[dominio]/#organization` | parse |
| D6 | Cliente tiene `description`, `areaServed`, `knowsAbout[]` | parse |
| D7 | Distribuidores tienen `brand[]` con `{@type:Brand, name}` | parse |
| D8 | `CreativeWork` con `@id` `[canonical]#case` referencia al cliente por `@id` (no inline) | parse |

## E. Estructura del caso

| # | Regla | Verificación |
|---|-------|--------------|
| E1 | 10 secciones con IDs fijos en `#ol-case-toc` | grep IDs |
| E2 | `ol-case-shell` con 2 columnas (body + sidebar) | inspección |
| E3 | Sidebar con 4 cards (datos · stack · TOC · CTA) | inspección |
| E4 | `ol-case-next` con 2 cards (cadena anterior/siguiente / sector) | inspección |
| E5 | CTA hero card final | inspección |
| E6 | FAQ + WhatsApp form | inspección |

## F. Encadenamiento del sector

| # | Regla | Verificación |
|---|-------|--------------|
| F1 | El primer caso de la cadena tiene Card 1 = "Caso siguiente" | grep |
| F2 | Casos intermedios tienen Card 1 = "← Caso anterior" y Card 2 = "Caso siguiente" | grep |
| F3 | El último caso tiene Card 1 = "← Caso anterior" y Card 2 = "Volver al sector" | grep |
| F4 | Las URLs del case-next coinciden con la cadena documentada en doc 34 | manual |

## G. Cache buster y assets

| # | Regla | Comando |
|---|-------|---------|
| G1 | Cache buster sincronizado en `premium-dark.css?v...` | `grep -oE 'premium-dark.css\?v[0-9a-z]+'` debe ser igual entre todas las páginas live |
| G2 | Imágenes en `/img/[sector]/[slug-folder]/[slug-folder]-XX.webp` | inspección de paths |
| G3 | `og:image` apunta a `[slug-folder]-01.webp` | grep manual |

## H. Menú propagado

| # | Regla | Comando |
|---|-------|---------|
| H1 | Subdrop desktop en TODAS las páginas live | `grep -lr '/portafolio/[sector]/[slug]/" class="ol-dropdown-link"' --include='*.html' .` debe contar igual a páginas live |
| H2 | Submenu mobile en TODAS las páginas live | `grep -lr '[slug]/" class="ol-mobile-link' --include='*.html' .` mismo conteo |

## I. HTML válido

| # | Regla | Comando |
|---|-------|---------|
| I1 | 0 errores de tags abiertos/cerrados/cruzados | parser Python (snippet abajo) |
| I2 | Doctype HTML5 | grep `<!DOCTYPE html>` |
| I3 | `<html lang="es-MX">` | grep |

---

## Script de auditoría completa (Python · ejecutar desde root del repo)

```python
#!/usr/bin/env python3
"""Audita los L4 contra el estándar profesional. Reporta violaciones por caso."""
import json, re, os, sys
from html.parser import HTMLParser

CHAIN = ['gama-de-mexico', 'meseci', 'lga-contraincendios', 'manext', 'bombero-mx', 'proyectored']

class HTMLValidator(HTMLParser):
    VOID = {'br','hr','img','meta','link','input','source','track','area','base','col','embed','param','wbr'}
    def __init__(self):
        super().__init__()
        self.stack=[]
        self.errors=[]
    def handle_starttag(self,t,a):
        if t in self.VOID: return
        self.stack.append(t)
    def handle_endtag(self,t):
        if t in self.VOID: return
        if not self.stack: self.errors.append(('extra-close',t)); return
        if self.stack[-1]==t: self.stack.pop()
        else: self.errors.append(('mismatch', self.stack[-1], t))

def audit(slug):
    issues = []
    p = f'portafolio/equipos-contra-incendios/{slug}/index.html'
    if not os.path.exists(p):
        return [f'  FATAL: {p} no existe']
    with open(p) as fh: src = fh.read()

    # A1
    if re.search(r'\bSEO\b|posicionamiento', src, re.I):
        issues.append('A1 · menciones de SEO/posicionamiento detectadas')
    # B1
    aria_count = src.count('aria-hidden')
    if aria_count < 30:
        issues.append(f'B1 · aria-hidden bajo: {aria_count} (esperado ≥30)')
    # C1
    if 'Formulario B2B</span>' in src:
        issues.append('C1 · chip singular "Formulario B2B" detectado')
    # D1-D8 JSON-LD
    m = re.search(r'<script type="application/ld\+json">(.+?)</script>', src, re.DOTALL)
    if m:
        try:
            data = json.loads(m.group(1))
            graph = data.get('@graph', [])
            ids = [n.get('@id','') for n in graph]
            if len(graph) < 5:
                issues.append(f'D1 · JSON-LD con {len(graph)} nodos (esperado 5)')
            client_org = [n for n in graph if n.get('@type')=='Organization' and 'origenlab.com' not in n.get('@id','')]
            if not client_org:
                issues.append('D5 · Organization del cliente NO encontrada')
            else:
                co = client_org[0]
                if 'areaServed' not in co: issues.append('D6 · Organization cliente sin areaServed')
                if 'knowsAbout' not in co: issues.append('D6 · Organization cliente sin knowsAbout')
            bc = [n for n in graph if n.get('@type')=='BreadcrumbList']
            if bc and not bc[0].get('@id','').endswith('#breadcrumbs'):
                issues.append('D4 · BreadcrumbList sin @id propio')
        except Exception as e:
            issues.append(f'D · JSON-LD inválido: {e}')
    # E1
    for sec in ['#contexto','#reto','#arquitectura','#diseno','#conversion','#tecnologia','#proceso','#galeria','#resultado']:
        if f'id="{sec[1:]}"' not in src:
            issues.append(f'E1 · sección {sec} ausente')
    # F · case-next chain
    nm = re.search(r'<section class="ol-case-next">.*?</section>', src, re.DOTALL)
    if nm:
        hrefs = re.findall(r'href="([^"]+)"', nm.group(0))
        i = CHAIN.index(slug) if slug in CHAIN else -1
        if i == 0:
            expected = [f'/portafolio/equipos-contra-incendios/{CHAIN[1]}/', '/portafolio/equipos-contra-incendios/']
        elif i == len(CHAIN)-1:
            expected = [f'/portafolio/equipos-contra-incendios/{CHAIN[-2]}/', '/portafolio/equipos-contra-incendios/']
        else:
            expected = [f'/portafolio/equipos-contra-incendios/{CHAIN[i-1]}/', f'/portafolio/equipos-contra-incendios/{CHAIN[i+1]}/']
        if hrefs[:2] != expected:
            issues.append(f'F · cadena rota: {hrefs[:2]} vs esperado {expected}')
    # I1
    v = HTMLValidator()
    v.feed(src)
    if v.errors or v.stack:
        issues.append(f'I1 · HTML inválido: errs={len(v.errors)} stk_abierto={len(v.stack)}')
    return issues

for slug in CHAIN:
    issues = audit(slug)
    print(f'{slug:24s} {"OK ✓" if not issues else f"{len(issues)} problemas"}')
    for i in issues: print(f'   {i}')
```

---

## Métricas de salud — sector contra incendios (snapshot 2026-04-26)

| Caso | A1 SEO | B1 aria | C1 plural | D JSON-LD | E1 secciones | F cadena | I1 HTML | Estado |
|------|--------|---------|-----------|-----------|--------------|----------|---------|--------|
| gama-de-mexico | ✅ | ✅ 35 | ✅ | ✅ enriquecido | ✅ | ✅ | ✅ | OK |
| meseci | ✅ | ✅ 43 | ✅ | ✅ enriquecido | ✅ | ✅ | ✅ | OK |
| lga-contraincendios | ✅ | ✅ 43 | ✅ | ✅ enriquecido | ✅ | ✅ | ✅ | OK |
| manext | ✅ | ✅ 35 | ✅ | ✅ enriquecido | ✅ | ✅ | ✅ | OK |
| bombero-mx | ✅ | ✅ 36 | ✅ | ✅ referencia | ✅ | ✅ | ✅ | OK |
| proyectored | ✅ | ✅ 42 | ✅ | ✅ enriquecido | ✅ | ✅ | ✅ | OK |

> Si en una auditoría futura un caso aparece con un ❌, ejecutar el playbook 35 sección que corresponda y volver a auditar. No marcar como entregado hasta llegar a 100% verde.

---

## Patrones de búsqueda útiles

```bash
# Detectar SVGs decorativos sin aria-hidden
grep -oE '<svg [^>]*>' portafolio/equipos-contra-incendios/[slug]/index.html | grep -v aria-hidden | wc -l

# Validar cadena ol-case-next
for s in gama-de-mexico meseci lga-contraincendios manext bombero-mx proyectored; do
  echo "$s:"; grep -A1 'ol-case-next-card' portafolio/equipos-contra-incendios/$s/index.html | grep -oE 'href="[^"]+"' | head -2
done

# Conteo de menú en todo el sitio
grep -lr '/portafolio/equipos-contra-incendios/[slug]/' --include='*.html' . | wc -l

# Verificar cache buster sincronizado
grep -hroE 'premium-dark.css\?v[0-9a-z]+' --include='*.html' . | sort -u
```
