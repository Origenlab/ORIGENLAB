# 🩺 EXPEDIENTE CLÍNICO — BOMBERO

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #31 de 31 · 🟢 Estable · P3 — Mantenimiento

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **BOMBERO** |
| Dominio | `bombero.mx` |
| Sector | Contra incendios |
| Cuenta GitHub | Origenlab |
| Repo / root | `BOMBERO` |
| Rama activa | `canonical-astro6-migration` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 6.1** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🟢 Estable (score 0) |

## 3. Estudios de laboratorio (auditoría técnica)

### SEO técnico

| Estudio | Resultado |
|---|---|
| Sitemap | ✅ |
| Robots.txt | ✅ |
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
| Páginas | 183 |
| Posts de blog | 0 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 987 |
| Modernas (WebP/AVIF) | 978 |
| Raster (JPG/PNG) | 9 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Sin hallazgos relevantes. Paciente sano dentro del estándar.

## 5. Plan de tratamiento

**Acción de stack:** Migrado a Astro 6 en rama `canonical-astro6-migration` (sin mergear) — revisar/mergear

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P1 · Revisar y mergear rama Astro 6 a main/master + push
- [ ] P3 · Evaluar arranque de blog por cluster (oportunidad SEO)

## 6. Pronóstico y prioridad

- **Prioridad global:** P3 — Mantenimiento
- **Score de severidad:** 0 (más alto = más intervención)
- **Triage:** #31 de 31
- **Esfuerzo estimado:** Bajo

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ✅ |
| tokens.css (design system) | ✅ |
| site.ts (SSoT de datos) | ✅ |
| Content Collections (Zod strict) | ✅ |
| lib/seo.ts + JSON-LD por pageType | ✅ |
| Schema JSON-LD | ✅ |
| Sitemap + robots | ✅ |
| Open Graph | ✅ |
| WhatsApp-first (waUrl) | ✅ |
| Blog por cluster | ❌ |
| Imágenes WebP/AVIF <200KB | ✅ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 12/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
