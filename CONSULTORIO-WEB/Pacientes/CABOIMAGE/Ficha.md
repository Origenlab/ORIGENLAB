# 🩺 EXPEDIENTE CLÍNICO — CABOIMAGE

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #3 de 31 · 🔴 Crítico · P1 — Crítico

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **CABOIMAGE** |
| Dominio | `caboimage.com` |
| Sector | Fotografía |
| Cuenta GitHub | Frankoropeza |
| Repo / root | `CABOIMAGE/caboimage-astro` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 4.16** |
| Estado de deploy | sin-pipeline |
| Pipeline CI (.yml) | ❌ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🔴 Crítico (score 79) |

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
| Páginas | 10 |
| Posts de blog | 3 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 201 |
| Modernas (WebP/AVIF) | 194 |
| Raster (JPG/PNG) | 7 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Astro 4 (stack obsoleto, 2 versiones atrás)
- Sin pipeline CI/CD
- Sin workflow de deploy (.yml)
- Sin design system (tokens.css)
- Sin lib/seo.ts (JSON-LD por pageType)
- En cuenta personal Frankoropeza (mover a org Origenlab)

## 5. Plan de tratamiento

**Acción de stack:** Revisar stack

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P1 · Migrar Astro 4 → 6 (rama `canonical-astro6-migration`)
- [ ] P1 · Stampar workflow Cloudflare Pages + secrets
- [ ] P2 · Implementar tokens.css (design system homologado)
- [ ] P2 · Añadir lib/seo.ts (JSON-LD por pageType, sin aggregateRating fabricado)
- [ ] P3 · Migrar repo de cuenta personal a org Origenlab

## 6. Pronóstico y prioridad

- **Prioridad global:** P1 — Crítico
- **Score de severidad:** 79 (más alto = más intervención)
- **Triage:** #3 de 31
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
| Blog por cluster | ✅ |
| Imágenes WebP/AVIF <200KB | ✅ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ❌ |

**Homologación: 9/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
