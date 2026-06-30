# 🩺 EXPEDIENTE CLÍNICO — EVENTECH

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #10 de 31 · 🔴 Crítico · P1 — Crítico

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **EVENTECH** |
| Dominio | `eventech.mx` |
| Sector | Renta eventos |
| Cuenta GitHub | Origenlab |
| Repo / root | `EVENTECH` |
| Rama activa | `master` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 5.7** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🔴 Crítico (score 45) |

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
| Páginas | 242 |
| Posts de blog | 94 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 1935 |
| Modernas (WebP/AVIF) | 1490 |
| Raster (JPG/PNG) | 445 |
| Pesadas (>200KB) | 377 |

## 4. Diagnóstico

- Astro 5 (1 versión atrás del canónico)
- 377 imágenes pesadas (>200KB)

## 5. Plan de tratamiento

**Acción de stack:** Migrado a Astro 6 en rama `canonical-astro6-migration` (sin mergear) — revisar/mergear

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Actualizar Astro 5 → 6
- [ ] P2 · Optimizar 377 imágenes pesadas (WebP/AVIF <200KB)
- [ ] P3 · Convertir 445 imágenes raster a formatos modernos

## 6. Pronóstico y prioridad

- **Prioridad global:** P1 — Crítico
- **Score de severidad:** 45 (más alto = más intervención)
- **Triage:** #10 de 31
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
| Sitemap + robots | ✅ |
| Open Graph | ✅ |
| WhatsApp-first (waUrl) | ✅ |
| Blog por cluster | ✅ |
| Imágenes WebP/AVIF <200KB | ❌ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 11/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
