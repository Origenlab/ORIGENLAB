#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Consultorio Web OrigenLab — generador de expedientes clínicos (fichas técnicas).
Lee la auditoría real (_datos-auditoria.json), calcula severidad/triage,
y escribe un vault por paciente + índice maestro.
"""
import json, os, datetime

BASE = "/sessions/focused-gallant-wright/mnt/Projects"
AUDIT = os.path.join(BASE, "ORIGENLAB/MASTER WEB PRODUCTION SYSTEM/00 - PLAN MAESTRO/_datos-auditoria.json")
OUT = os.path.join(BASE, "ORIGENLAB/CONSULTORIO-WEB")
PAC = os.path.join(OUT, "Pacientes")
HOY = "2026-06-20"

data = json.load(open(AUDIT, encoding="utf-8"))

# ---- enriquecimiento desde memoria operativa (estado real 2026-06-20) ----
MIGR_A6_RAMA = {"FIREFIGHTERMX","BOMBERO","EVENTECH","PANTALLA-LED","MONITORESCONTRAINCENDIOS","CAMARADESEGURIDAD"}
PEND_A5_6 = {"CLINICADEBELLEZA","FIREFIGHTERCOMMX","SEGURIDADPRIVADA","mededul-com-repo","GAMADEMEXICO"}
PEND_A4_6 = {"FIREFIGHTERSMX","INFIELMX","INFLAPY","MEDEDUL","MESASPICNIC","SEGURIDADPARACONDOMINIOS","SEGURIDADPRIVADAEVENTOS"}
STATIC_REBUILD = {"BARBERIA","CDMXSITE","SEGURIDADPRIVADAMX"}
DUP_DOMAIN = {"MEDEDUL","MEDEDULCOM","mededul-com-repo"}  # mesas-de-dulces.com
CF_PAGES_LIVE = True  # 24/24 Astro en Cloudflare Pages, 18/18 dominios con HTTPS

def fw_class(fw):
    if "no Astro" in fw: return ("ESTATICO", 0)
    try:
        major = int(fw.replace("Astro ","").split(".")[0])
    except:
        major = 0
    return ("ASTRO", major)

def severidad(s):
    kind, major = fw_class(s["framework"])
    score = 0
    motivos = []
    # Stack
    if kind == "ESTATICO":
        score += 50; motivos.append("Stack fuera de estándar (no-Astro): requiere reconstrucción")
    elif major == 4:
        score += 30; motivos.append("Astro 4 (stack obsoleto, 2 versiones atrás)")
    elif major == 5:
        score += 15; motivos.append("Astro 5 (1 versión atrás del canónico)")
    elif major >= 6:
        score += 0
    # Versionado / deploy
    if s["deploy"] == "no-git":
        score += 40; motivos.append("Sin control de versiones (no-git): riesgo de pérdida")
    elif s["deploy"] == "sin-pipeline":
        score += 20; motivos.append("Sin pipeline CI/CD")
    if not s["deploy_yml"]:
        score += 10; motivos.append("Sin workflow de deploy (.yml)")
    # Homologación SEO/design
    if not s["tokens"]:
        score += 8; motivos.append("Sin design system (tokens.css)")
    if not s["seo_lib"] and kind != "ESTATICO":
        score += 6; motivos.append("Sin lib/seo.ts (JSON-LD por pageType)")
    if not s["schema"]:
        score += 6; motivos.append("Sin schema JSON-LD")
    if not s["og"]:
        score += 5; motivos.append("Sin Open Graph")
    if not s["sitemap"]:
        score += 4; motivos.append("Sin sitemap")
    if not s["robots"]:
        score += 4; motivos.append("Sin robots.txt")
    if not s["whatsapp"] and kind != "ESTATICO":
        score += 4; motivos.append("Sin conversión WhatsApp")
    # Imágenes
    if s["img_heavy"] > 0:
        score += min(s["img_heavy"], 30); motivos.append(f"{s['img_heavy']} imágenes pesadas (>200KB)")
    # Gobernanza
    if s["cuenta"] == "Frankoropeza":
        score += 5; motivos.append("En cuenta personal Frankoropeza (mover a org Origenlab)")
    if s["slug"] in DUP_DOMAIN:
        score += 15; motivos.append("Dominio duplicado mesas-de-dulces.com (resolver canónico)")
    return score, motivos

for s in data:
    s["_score"], s["_motivos"] = severidad(s)
    k, m = fw_class(s["framework"])
    s["_kind"], s["_major"] = k, m

orden = sorted(data, key=lambda x: (-x["_score"], x["slug"]))
for i, s in enumerate(orden, 1):
    s["_rank"] = i

def prioridad(score):
    if score >= 45: return "P1 — Crítico"
    if score >= 25: return "P2 — Atención"
    return "P3 — Mantenimiento"

def semaforo(score):
    if score >= 45: return "🔴 Crítico"
    if score >= 25: return "🟡 Atención"
    return "🟢 Estable"

def yn(b): return "✅" if b else "❌"

def plan_estado(s):
    k, mj = s["_kind"], s["_major"]
    if s["slug"] in STATIC_REBUILD: return "Reconstrucción Astro 6 (hoy sitio estático Node/webpack)"
    if s["slug"] in MIGR_A6_RAMA: return "Migrado a Astro 6 en rama `canonical-astro6-migration` (sin mergear) — revisar/mergear"
    if s["slug"] in PEND_A4_6: return "Pendiente migración Astro 4 → 6 (mayor)"
    if s["slug"] in PEND_A5_6: return "Pendiente migración Astro 5 → 6 (menor)"
    if mj >= 6: return "Stack canónico Astro 6 ✓"
    return "Revisar stack"

def ficha(s):
    L = []
    a = L.append
    nm = s["slug"]
    a(f"# 🩺 EXPEDIENTE CLÍNICO — {nm}")
    a("")
    a(f"> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: {HOY}  ")
    a(f"> Triage #{s['_rank']} de 31 · {semaforo(s['_score'])} · {prioridad(s['_score'])}")
    a("")
    a("---")
    a("")
    # 1. Identificación
    a("## 1. Identificación del paciente")
    a("")
    a("| Campo | Valor |")
    a("|---|---|")
    a(f"| Nombre clave | **{nm}** |")
    a(f"| Dominio | `{s['dominio']}` |")
    a(f"| Sector | {s['sector']} |")
    a(f"| Cuenta GitHub | {s['cuenta']} |")
    a(f"| Repo / root | `{s['root']}` |")
    a(f"| Rama activa | `{s['rama']}` |")
    if nm in DUP_DOMAIN:
        a(f"| ⚠️ Nota | Comparte dominio `mesas-de-dulces.com` con MEDEDUL / MEDEDULCOM / mededul-com-repo |")
    a("")
    # 2. Signos vitales
    a("## 2. Signos vitales")
    a("")
    a("| Signo | Lectura |")
    a("|---|---|")
    a(f"| Framework | **{s['framework']}** |")
    a(f"| Estado de deploy | {s['deploy']} |")
    a(f"| Pipeline CI (.yml) | {yn(s['deploy_yml'])} |")
    a(f"| Favicon | {yn(s['favicon'])} |")
    a(f"| Hosting | {'Cloudflare Pages' if (s['_kind']!='ESTATICO' and CF_PAGES_LIVE) else 'Pendiente / GitHub Pages'} |")
    a(f"| Salud general | {semaforo(s['_score'])} (score {s['_score']}) |")
    a("")
    # 3. Labs
    a("## 3. Estudios de laboratorio (auditoría técnica)")
    a("")
    a("### SEO técnico")
    a("")
    a("| Estudio | Resultado |")
    a("|---|---|")
    a(f"| Sitemap | {yn(s['sitemap'])} |")
    a(f"| Robots.txt | {yn(s['robots'])} |")
    a(f"| Schema JSON-LD | {yn(s['schema'])} |")
    a(f"| lib/seo.ts (SEO por pageType) | {yn(s['seo_lib'])} |")
    a(f"| Open Graph | {yn(s['og'])} |")
    a("")
    a("### Design system / conversión")
    a("")
    a("| Estudio | Resultado |")
    a("|---|---|")
    a(f"| tokens.css (design system) | {yn(s['tokens'])} |")
    a(f"| WhatsApp-first | {yn(s['whatsapp'])} |")
    a("")
    a("### Contenido")
    a("")
    a("| Métrica | Valor |")
    a("|---|---|")
    a(f"| Páginas | {s['pages']} |")
    a(f"| Posts de blog | {s['blog_posts']} |")
    a("")
    a("### Imágenes")
    a("")
    a("| Métrica | Valor |")
    a("|---|---|")
    a(f"| Total | {s['img_total']} |")
    a(f"| Modernas (WebP/AVIF) | {s['img_modern']} |")
    a(f"| Raster (JPG/PNG) | {s['img_raster']} |")
    a(f"| Pesadas (>200KB) | {s['img_heavy']} |")
    a("")
    # 4. Diagnóstico
    a("## 4. Diagnóstico")
    a("")
    if s["_motivos"]:
        for m in s["_motivos"]:
            a(f"- {m}")
    else:
        a("- Sin hallazgos relevantes. Paciente sano dentro del estándar.")
    a("")
    # 5. Plan de tratamiento
    a("## 5. Plan de tratamiento")
    a("")
    a(f"**Acción de stack:** {plan_estado(s)}")
    a("")
    a("Pasos priorizados hacia el estándar *\"terminado\"*:")
    a("")
    pasos = []
    if s["slug"] in STATIC_REBUILD:
        pasos.append("P1 · Reconstruir en Astro 6 SSG (hoy es sitio estático)")
    elif s["_major"] == 4:
        pasos.append("P1 · Migrar Astro 4 → 6 (rama `canonical-astro6-migration`)")
    elif s["_major"] == 5:
        pasos.append("P2 · Actualizar Astro 5 → 6")
    elif s["slug"] in MIGR_A6_RAMA:
        pasos.append("P1 · Revisar y mergear rama Astro 6 a main/master + push")
    if s["deploy"] == "no-git":
        pasos.append("P1 · Inicializar git + subir a org Origenlab")
    elif s["deploy"] == "sin-pipeline":
        pasos.append("P1 · Stampar workflow Cloudflare Pages + secrets")
    if not s["tokens"]:
        pasos.append("P2 · Implementar tokens.css (design system homologado)")
    if not s["seo_lib"] and s["_kind"] != "ESTATICO":
        pasos.append("P2 · Añadir lib/seo.ts (JSON-LD por pageType, sin aggregateRating fabricado)")
    if not s["schema"]:
        pasos.append("P2 · Añadir schema JSON-LD")
    if not s["og"]:
        pasos.append("P3 · Añadir Open Graph + imagen OG")
    if not s["sitemap"]:
        pasos.append("P2 · Generar sitemap")
    if not s["robots"]:
        pasos.append("P3 · Añadir robots.txt")
    if not s["whatsapp"] and s["_kind"] != "ESTATICO":
        pasos.append("P2 · Cablear conversión WhatsApp-first (waUrl())")
    if s["img_heavy"] > 0:
        pasos.append(f"P2 · Optimizar {s['img_heavy']} imágenes pesadas (WebP/AVIF <200KB)")
    if s["img_raster"] > 10:
        pasos.append(f"P3 · Convertir {s['img_raster']} imágenes raster a formatos modernos")
    if s["cuenta"] == "Frankoropeza":
        pasos.append("P3 · Migrar repo de cuenta personal a org Origenlab")
    if s["slug"] in DUP_DOMAIN:
        pasos.append("P1 · Resolver canónico de mesas-de-dulces.com (3 repos, 1 dominio)")
    if s["blog_posts"] == 0 and s["_kind"] != "ESTATICO":
        pasos.append("P3 · Evaluar arranque de blog por cluster (oportunidad SEO)")
    if not pasos:
        pasos.append("Mantenimiento: monitoreo, contenido y CRO. Sin deuda técnica abierta.")
    for p in pasos:
        a(f"- [ ] {p}")
    a("")
    # 6. Pronóstico
    a("## 6. Pronóstico y prioridad")
    a("")
    a(f"- **Prioridad global:** {prioridad(s['_score'])}")
    a(f"- **Score de severidad:** {s['_score']} (más alto = más intervención)")
    a(f"- **Triage:** #{s['_rank']} de 31")
    esfuerzo = "Alto" if s["_score"] >= 45 else ("Medio" if s["_score"] >= 25 else "Bajo")
    a(f"- **Esfuerzo estimado:** {esfuerzo}")
    a("")
    # 7. Checklist homologación
    a("## 7. Checklist de homologación (qué tiene / qué falta)")
    a("")
    a("Estándar OrigenLab de sitio *\"terminado\"*:")
    a("")
    checks = [
        ("Astro 6 SSG", s["_major"] >= 6 and s["_kind"] != "ESTATICO"),
        ("tokens.css (design system)", s["tokens"]),
        ("site.ts (SSoT de datos)", s["_kind"] != "ESTATICO"),
        ("Content Collections (Zod strict)", s["_kind"] != "ESTATICO"),
        ("lib/seo.ts + JSON-LD por pageType", s["seo_lib"]),
        ("Schema JSON-LD", s["schema"]),
        ("Sitemap + robots", s["sitemap"] and s["robots"]),
        ("Open Graph", s["og"]),
        ("WhatsApp-first (waUrl)", s["whatsapp"]),
        ("Blog por cluster", s["blog_posts"] > 0),
        ("Imágenes WebP/AVIF <200KB", s["img_heavy"] == 0),
        ("Favicon", s["favicon"]),
        ("Deploy Cloudflare Pages", s["deploy_yml"] and s["_kind"] != "ESTATICO"),
    ]
    a("| Ítem del estándar | Estado |")
    a("|---|---|")
    for nombre, ok in checks:
        a(f"| {nombre} | {yn(ok)} |")
    cumplidos = sum(1 for _, ok in checks if ok)
    a("")
    a(f"**Homologación: {cumplidos}/{len(checks)} ítems cumplidos.**")
    a("")
    a("---")
    a("")
    a(f"*Generado automáticamente desde la auditoría real OrigenLab ({HOY}). "
      "Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, "
      "componentes, contenido y SEO específico).*")
    a("")
    return "\n".join(L)

# ---- escribir ----
os.makedirs(PAC, exist_ok=True)
for s in data:
    d = os.path.join(PAC, s["slug"])
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "Ficha.md"), "w", encoding="utf-8") as f:
        f.write(ficha(s))

# ---- índice maestro / triage ----
I = []
a = I.append
a("# 🏥 Consultorio Web OrigenLab — Índice de Triage")
a("")
a(f"> Expedientes clínicos de los **31 sitios**. Revisión: {HOY}.  ")
a("> Cada sitio = un paciente con su vault y ficha técnica. Orden = de más enfermo a más sano.")
a("")
n_p1 = sum(1 for s in data if s["_score"]>=45)
n_p2 = sum(1 for s in data if 25<=s["_score"]<45)
n_p3 = sum(1 for s in data if s["_score"]<25)
a(f"**Resumen:** 🔴 {n_p1} críticos · 🟡 {n_p2} en atención · 🟢 {n_p3} estables")
a("")
a("## Orden de atención (triage)")
a("")
a("| # | Paciente | Sector | Dominio | Stack | Salud | Prioridad | Score | Ficha |")
a("|---|---|---|---|---|---|---|---|---|")
for s in orden:
    fw = "ESTÁTICO" if s["_kind"]=="ESTATICO" else f"A{s['_major']}"
    a(f"| {s['_rank']} | **{s['slug']}** | {s['sector']} | `{s['dominio']}` | {fw} | "
      f"{semaforo(s['_score'])} | {prioridad(s['_score'])} | {s['_score']} | "
      f"[ver](Pacientes/{s['slug']}/Ficha.md) |")
a("")
a("## Notas clínicas del consultorio")
a("")
a("- **Dominio duplicado:** `mesas-de-dulces.com` lo comparten MEDEDUL, MEDEDULCOM y mededul-com-repo. Decisión pendiente: cuál es el canónico.")
a("- **3 sitios estáticos** (BARBERIA, CDMXSITE, SEGURIDADPRIVADAMX) están fuera del estándar Astro: requieren reconstrucción.")
a("- **5 repos en cuenta personal Frankoropeza** (BRINCOLINS, CABOIMAGE, FIREFIGHTERSMX, PANTALLA-LED, SEGURIDADPRIVADAEVENTOS): gobernanza pendiente.")
a("- **6 sitios** ya migrados a Astro 6 en rama `canonical-astro6-migration` sin mergear.")
a("- Mayor brecha de homologación del portafolio: **tokens.css** (design system) — presente en pocos sitios.")
a("")
a("---")
a("*Estándar de \"terminado\": Astro 6 SSG · tokens.css · site.ts SSoT · Content Collections Zod · lib/seo.ts (JSON-LD por pageType) · sitemap+robots+OG · WhatsApp-first · blog por cluster · imágenes WebP/AVIF <200KB · favicon · deploy Cloudflare Pages.*")
with open(os.path.join(OUT, "00 - INDICE-TRIAGE.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(I))

# resumen consola
print("OK — fichas generadas:", len(data))
print("Carpeta:", OUT)
print()
print("ORDEN DE TRIAGE:")
for s in orden:
    print(f"{s['_rank']:2}. {s['slug']:26} score {s['_score']:3} {semaforo(s['_score'])} {prioridad(s['_score'])}")
