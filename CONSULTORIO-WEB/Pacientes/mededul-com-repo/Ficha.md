# 🩺 EXPEDIENTE CLÍNICO — mededul-com-repo

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #6 de 31 · 🔴 Crítico · P1 — Crítico

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **mededul-com-repo** |
| Dominio | `mesas-de-dulces.com` |
| Sector | Eventos/Activaciones |
| Cuenta GitHub | Origenlab |
| Repo / root | `mededul-com-repo` |
| Rama activa | `main` |
| ⚠️ Nota | Comparte dominio `mesas-de-dulces.com` con MEDEDUL / MEDEDULCOM / mededul-com-repo |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 5.1** |
| Estado de deploy | sin-pipeline |
| Pipeline CI (.yml) | ❌ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🔴 Crítico (score 65) |

## 3. Estudios de laboratorio (auditoría técnica)

### SEO técnico

| Estudio | Resultado |
|---|---|
| Sitemap | ✅ |
| Robots.txt | ❌ |
| Schema JSON-LD | ✅ |
| lib/seo.ts (SEO por pageType) | ✅ |
| Open Graph | ✅ |

### Design system / conversión

| Estudio | Resultado |
|---|---|
| tokens.css (design system) | ✅ |
| WhatsApp-first | ✅ |

### Contenido

| Métrica | Valor |
|---|---|
| Páginas | 20 |
| Posts de blog | 20 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 13 |
| Modernas (WebP/AVIF) | 3 |
| Raster (JPG/PNG) | 10 |
| Pesadas (>200KB) | 1 |

## 4. Diagnóstico

- Astro 5 (1 versión atrás del canónico)
- Sin pipeline CI/CD
- Sin workflow de deploy (.yml)
- Sin robots.txt
- 1 imágenes pesadas (>200KB)
- Dominio duplicado mesas-de-dulces.com (resolver canónico)

## 5. Plan de tratamiento

**Acción de stack:** Pendiente migración Astro 5 → 6 (menor)

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Actualizar Astro 5 → 6
- [ ] P1 · Stampar workflow Cloudflare Pages + secrets
- [ ] P3 · Añadir robots.txt
- [ ] P2 · Optimizar 1 imágenes pesadas (WebP/AVIF <200KB)
- [ ] P1 · Resolver canónico de mesas-de-dulces.com (3 repos, 1 dominio)

## 6. Pronóstico y prioridad

- **Prioridad global:** P1 — Crítico
- **Score de severidad:** 65 (más alto = más intervención)
- **Triage:** #6 de 31
- **Esfuerzo estimado:** Alto

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ❌ |
| tokens.css (design system) | ✅ |
| site.ts (SSoT de datos) | ✅ |
| Content Collections (Zod strict) | ✅ |
| lib/seo.ts + JSON-LD por pageType | ✅ |
| Schema JSON-LD | ✅ |
| Sitemap + robots | ❌ |
| Open Graph | ✅ |
| WhatsApp-first (waUrl) | ✅ |
| Blog por cluster | ✅ |
| Imágenes WebP/AVIF <200KB | ❌ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ❌ |

**Homologación: 9/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
