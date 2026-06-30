# 🩺 EXPEDIENTE CLÍNICO — PANTALLA-LED

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #17 de 31 · 🟡 Atención · P2 — Atención

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **PANTALLA-LED** |
| Dominio | `pantalla-led.com` |
| Sector | Renta eventos |
| Cuenta GitHub | Frankoropeza |
| Repo / root | `PANTALLA-LED` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 5.7** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🟡 Atención (score 34) |

## 3. Estudios de laboratorio (auditoría técnica)

### SEO técnico

| Estudio | Resultado |
|---|---|
| Sitemap | ❌ |
| Robots.txt | ❌ |
| Schema JSON-LD | ✅ |
| lib/seo.ts (SEO por pageType) | ❌ |
| Open Graph | ✅ |

### Design system / conversión

| Estudio | Resultado |
|---|---|
| tokens.css (design system) | ✅ |
| WhatsApp-first | ✅ |

### Contenido

| Métrica | Valor |
|---|---|
| Páginas | 6 |
| Posts de blog | 0 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 10 |
| Modernas (WebP/AVIF) | 3 |
| Raster (JPG/PNG) | 7 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Astro 5 (1 versión atrás del canónico)
- Sin lib/seo.ts (JSON-LD por pageType)
- Sin sitemap
- Sin robots.txt
- En cuenta personal Frankoropeza (mover a org Origenlab)

## 5. Plan de tratamiento

**Acción de stack:** Migrado a Astro 6 en rama `canonical-astro6-migration` (sin mergear) — revisar/mergear

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Actualizar Astro 5 → 6
- [ ] P2 · Añadir lib/seo.ts (JSON-LD por pageType, sin aggregateRating fabricado)
- [ ] P2 · Generar sitemap
- [ ] P3 · Añadir robots.txt
- [ ] P3 · Migrar repo de cuenta personal a org Origenlab
- [ ] P3 · Evaluar arranque de blog por cluster (oportunidad SEO)

## 6. Pronóstico y prioridad

- **Prioridad global:** P2 — Atención
- **Score de severidad:** 34 (más alto = más intervención)
- **Triage:** #17 de 31
- **Esfuerzo estimado:** Medio

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ❌ |
| tokens.css (design system) | ✅ |
| site.ts (SSoT de datos) | ✅ |
| Content Collections (Zod strict) | ✅ |
| lib/seo.ts + JSON-LD por pageType | ❌ |
| Schema JSON-LD | ✅ |
| Sitemap + robots | ❌ |
| Open Graph | ✅ |
| WhatsApp-first (waUrl) | ✅ |
| Blog por cluster | ❌ |
| Imágenes WebP/AVIF <200KB | ✅ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 9/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
