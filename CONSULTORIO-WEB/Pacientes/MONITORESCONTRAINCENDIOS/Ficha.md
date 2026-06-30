# 🩺 EXPEDIENTE CLÍNICO — MONITORESCONTRAINCENDIOS

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #19 de 31 · 🟡 Atención · P2 — Atención

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **MONITORESCONTRAINCENDIOS** |
| Dominio | `monitorescontraincendios.com` |
| Sector | Contra incendios |
| Cuenta GitHub | Origenlab |
| Repo / root | `MONITORESCONTRAINCENDIOS` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 5.12** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🟡 Atención (score 29) |

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
| Páginas | 30 |
| Posts de blog | 20 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 41 |
| Modernas (WebP/AVIF) | 34 |
| Raster (JPG/PNG) | 7 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Astro 5 (1 versión atrás del canónico)
- Sin design system (tokens.css)
- Sin lib/seo.ts (JSON-LD por pageType)

## 5. Plan de tratamiento

**Acción de stack:** Migrado a Astro 6 en rama `canonical-astro6-migration` (sin mergear) — revisar/mergear

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Actualizar Astro 5 → 6
- [ ] P2 · Implementar tokens.css (design system homologado)
- [ ] P2 · Añadir lib/seo.ts (JSON-LD por pageType, sin aggregateRating fabricado)

## 6. Pronóstico y prioridad

- **Prioridad global:** P2 — Atención
- **Score de severidad:** 29 (más alto = más intervención)
- **Triage:** #19 de 31
- **Esfuerzo estimado:** Medio

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
| Deploy Cloudflare Pages | ✅ |

**Homologación: 10/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
