# 🩺 EXPEDIENTE CLÍNICO — RESOIL

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #29 de 31 · 🟢 Estable · P3 — Mantenimiento

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **RESOIL** |
| Dominio | `rentadesonidoeiluminacion.com.mx` |
| Sector | Renta eventos |
| Cuenta GitHub | Origenlab |
| Repo / root | `RESOIL` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 6.1** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🟢 Estable (score 14) |

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
| Páginas | 7 |
| Posts de blog | 0 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 572 |
| Modernas (WebP/AVIF) | 563 |
| Raster (JPG/PNG) | 9 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Sin design system (tokens.css)
- Sin lib/seo.ts (JSON-LD por pageType)

## 5. Plan de tratamiento

**Acción de stack:** Stack canónico Astro 6 ✓

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Implementar tokens.css (design system homologado)
- [ ] P2 · Añadir lib/seo.ts (JSON-LD por pageType, sin aggregateRating fabricado)
- [ ] P3 · Evaluar arranque de blog por cluster (oportunidad SEO)

## 6. Pronóstico y prioridad

- **Prioridad global:** P3 — Mantenimiento
- **Score de severidad:** 14 (más alto = más intervención)
- **Triage:** #29 de 31
- **Esfuerzo estimado:** Bajo

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
| Blog por cluster | ❌ |
| Imágenes WebP/AVIF <200KB | ✅ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ✅ |

**Homologación: 10/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
