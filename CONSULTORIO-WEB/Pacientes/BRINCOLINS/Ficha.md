# 🩺 EXPEDIENTE CLÍNICO — BRINCOLINS

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #8 de 31 · 🔴 Crítico · P1 — Crítico

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **BRINCOLINS** |
| Dominio | `brincolins.com` |
| Sector | Renta eventos |
| Cuenta GitHub | Frankoropeza |
| Repo / root | `BRINCOLINS` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 6.0** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🔴 Crítico (score 49) |

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
| Páginas | 77 |
| Posts de blog | 52 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 395 |
| Modernas (WebP/AVIF) | 308 |
| Raster (JPG/PNG) | 87 |
| Pesadas (>200KB) | 53 |

## 4. Diagnóstico

- Sin design system (tokens.css)
- Sin lib/seo.ts (JSON-LD por pageType)
- 53 imágenes pesadas (>200KB)
- En cuenta personal Frankoropeza (mover a org Origenlab)

## 5. Plan de tratamiento

**Acción de stack:** Stack canónico Astro 6 ✓

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Implementar tokens.css (design system homologado)
- [ ] P2 · Añadir lib/seo.ts (JSON-LD por pageType, sin aggregateRating fabricado)
- [ ] P2 · Optimizar 53 imágenes pesadas (WebP/AVIF <200KB)
- [ ] P3 · Convertir 87 imágenes raster a formatos modernos
- [ ] P3 · Migrar repo de cuenta personal a org Origenlab

## 6. Pronóstico y prioridad

- **Prioridad global:** P1 — Crítico
- **Score de severidad:** 49 (más alto = más intervención)
- **Triage:** #8 de 31
- **Esfuerzo estimado:** Alto

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ✅ |
| tokens.css (design system) | ❌ |
| site.ts (SSoT de datos) | ✅ |
| Content Collections (Zod strict) | ✅ |
| lib/seo.ts + JSON-LD por pageType | ❌ |
| Schema JSON-LD | ✅ |
| Sitemap + robots | ✅ |
| Open Graph | ✅ |
| WhatsApp-first (waUrl) | ✅ |
| Blog por cluster | ✅ |
| Imágenes WebP/AVIF <200KB | ❌ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 10/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
