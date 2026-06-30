# 🩺 EXPEDIENTE CLÍNICO — MESASPICNIC

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #7 de 31 · 🔴 Crítico · P1 — Crítico

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **MESASPICNIC** |
| Dominio | `mesaspicnic.com` |
| Sector | Renta eventos |
| Cuenta GitHub | Origenlab |
| Repo / root | `MESASPICNIC` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 4.16** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🔴 Crítico (score 58) |

## 3. Estudios de laboratorio (auditoría técnica)

### SEO técnico

| Estudio | Resultado |
|---|---|
| Sitemap | ✅ |
| Robots.txt | ✅ |
| Schema JSON-LD | ✅ |
| lib/seo.ts (SEO por pageType) | ❌ |
| Open Graph | ✅ |

### Design system / conversión

| Estudio | Resultado |
|---|---|
| tokens.css (design system) | ❌ |
| WhatsApp-first | ✅ |

### Contenido

| Métrica | Valor |
|---|---|
| Páginas | 128 |
| Posts de blog | 0 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 884 |
| Modernas (WebP/AVIF) | 863 |
| Raster (JPG/PNG) | 21 |
| Pesadas (>200KB) | 14 |

## 4. Diagnóstico

- Astro 4 (stack obsoleto, 2 versiones atrás)
- Sin design system (tokens.css)
- Sin lib/seo.ts (JSON-LD por pageType)
- 14 imágenes pesadas (>200KB)

## 5. Plan de tratamiento

**Acción de stack:** Pendiente migración Astro 4 → 6 (mayor)

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P1 · Migrar Astro 4 → 6 (rama `canonical-astro6-migration`)
- [ ] P2 · Implementar tokens.css (design system homologado)
- [ ] P2 · Añadir lib/seo.ts (JSON-LD por pageType, sin aggregateRating fabricado)
- [ ] P2 · Optimizar 14 imágenes pesadas (WebP/AVIF <200KB)
- [ ] P3 · Convertir 21 imágenes raster a formatos modernos
- [ ] P3 · Evaluar arranque de blog por cluster (oportunidad SEO)

## 6. Pronóstico y prioridad

- **Prioridad global:** P1 — Crítico
- **Score de severidad:** 58 (más alto = más intervención)
- **Triage:** #7 de 31
- **Esfuerzo estimado:** Alto

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ❌ |
| tokens.css (design system) | ❌ |
| site.ts (SSoT de datos) | ✅ |
| Content Collections (Zod strict) | ✅ |
| lib/seo.ts + JSON-LD por pageType | ❌ |
| Schema JSON-LD | ✅ |
| Sitemap + robots | ✅ |
| Open Graph | ✅ |
| WhatsApp-first (waUrl) | ✅ |
| Blog por cluster | ❌ |
| Imágenes WebP/AVIF <200KB | ❌ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 8/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
