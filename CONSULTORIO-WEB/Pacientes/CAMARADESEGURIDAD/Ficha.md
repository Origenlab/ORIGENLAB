# 🩺 EXPEDIENTE CLÍNICO — CAMARADESEGURIDAD

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #21 de 31 · 🟢 Estable · P3 — Mantenimiento

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **CAMARADESEGURIDAD** |
| Dominio | `camara-de-seguridad.com` |
| Sector | Seguridad/CCTV |
| Cuenta GitHub | Origenlab |
| Repo / root | `CAMARADESEGURIDAD` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 5.7** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🟢 Estable (score 23) |

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
| tokens.css (design system) | ❌ |
| WhatsApp-first | ✅ |

### Contenido

| Métrica | Valor |
|---|---|
| Páginas | 10 |
| Posts de blog | 1 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 12 |
| Modernas (WebP/AVIF) | 4 |
| Raster (JPG/PNG) | 8 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Astro 5 (1 versión atrás del canónico)
- Sin design system (tokens.css)

## 5. Plan de tratamiento

**Acción de stack:** Migrado a Astro 6 en rama `canonical-astro6-migration` (sin mergear) — revisar/mergear

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Actualizar Astro 5 → 6
- [ ] P2 · Implementar tokens.css (design system homologado)

## 6. Pronóstico y prioridad

- **Prioridad global:** P3 — Mantenimiento
- **Score de severidad:** 23 (más alto = más intervención)
- **Triage:** #21 de 31
- **Esfuerzo estimado:** Bajo

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ❌ |
| tokens.css (design system) | ❌ |
| site.ts (SSoT de datos) | ✅ |
| Content Collections (Zod strict) | ✅ |
| lib/seo.ts + JSON-LD por pageType | ✅ |
| Schema JSON-LD | ✅ |
| Sitemap + robots | ✅ |
| Open Graph | ✅ |
| WhatsApp-first (waUrl) | ✅ |
| Blog por cluster | ✅ |
| Imágenes WebP/AVIF <200KB | ✅ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 11/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
