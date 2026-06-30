# 🩺 EXPEDIENTE CLÍNICO — FIREFIGHTERSMX

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #16 de 31 · 🟡 Atención · P2 — Atención

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **FIREFIGHTERSMX** |
| Dominio | `firefighters.mx` |
| Sector | Contra incendios |
| Cuenta GitHub | Frankoropeza |
| Repo / root | `FIREFIGHTERSMX` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 4.15** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🟡 Atención (score 35) |

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
| Páginas | 24 |
| Posts de blog | 13 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 35 |
| Modernas (WebP/AVIF) | 26 |
| Raster (JPG/PNG) | 9 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Astro 4 (stack obsoleto, 2 versiones atrás)
- En cuenta personal Frankoropeza (mover a org Origenlab)

## 5. Plan de tratamiento

**Acción de stack:** Pendiente migración Astro 4 → 6 (mayor)

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P1 · Migrar Astro 4 → 6 (rama `canonical-astro6-migration`)
- [ ] P3 · Migrar repo de cuenta personal a org Origenlab

## 6. Pronóstico y prioridad

- **Prioridad global:** P2 — Atención
- **Score de severidad:** 35 (más alto = más intervención)
- **Triage:** #16 de 31
- **Esfuerzo estimado:** Medio

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
| Imágenes WebP/AVIF <200KB | ✅ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 12/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
