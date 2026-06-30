# 🩺 EXPEDIENTE CLÍNICO — BARBERIA

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #4 de 31 · 🔴 Crítico · P1 — Crítico

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **BARBERIA** |
| Dominio | `barberia.mx` |
| Sector | Directorio/Belleza |
| Cuenta GitHub | Origenlab |
| Repo / root | `BARBERIA` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Node (no Astro)** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Pendiente / GitHub Pages |
| Salud general | 🔴 Crítico (score 69) |

## 3. Estudios de laboratorio (auditoría técnica)

### SEO técnico

| Estudio | Resultado |
|---|---|
| Sitemap | ✅ |
| Robots.txt | ✅ |
| Schema JSON-LD | ❌ |
| lib/seo.ts (SEO por pageType) | ❌ |
| Open Graph | ❌ |

### Design system / conversión

| Estudio | Resultado |
|---|---|
| tokens.css (design system) | ❌ |
| WhatsApp-first | ❌ |

### Contenido

| Métrica | Valor |
|---|---|
| Páginas | 0 |
| Posts de blog | 0 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 0 |
| Modernas (WebP/AVIF) | 0 |
| Raster (JPG/PNG) | 0 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Stack fuera de estándar (no-Astro): requiere reconstrucción
- Sin design system (tokens.css)
- Sin schema JSON-LD
- Sin Open Graph

## 5. Plan de tratamiento

**Acción de stack:** Reconstrucción Astro 6 (hoy sitio estático Node/webpack)

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P1 · Reconstruir en Astro 6 SSG (hoy es sitio estático)
- [ ] P2 · Implementar tokens.css (design system homologado)
- [ ] P2 · Añadir schema JSON-LD
- [ ] P3 · Añadir Open Graph + imagen OG

## 6. Pronóstico y prioridad

- **Prioridad global:** P1 — Crítico
- **Score de severidad:** 69 (más alto = más intervención)
- **Triage:** #4 de 31
- **Esfuerzo estimado:** Alto

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ❌ |
| tokens.css (design system) | ❌ |
| site.ts (SSoT de datos) | ❌ |
| Content Collections (Zod strict) | ❌ |
| lib/seo.ts + JSON-LD por pageType | ❌ |
| Schema JSON-LD | ❌ |
| Sitemap + robots | ✅ |
| Open Graph | ❌ |
| WhatsApp-first (waUrl) | ❌ |
| Blog por cluster | ❌ |
| Imágenes WebP/AVIF <200KB | ✅ |
| Favicon | ✅ |
| Deploy Cloudflare Pages | ❌ |

**Homologación: 3/13 ítems cumplidos.**

---

*Generado automáticamente desde la auditoría real OrigenLab (2026-06-20). Próximo paso del expediente: investigación profunda en el repo (inventario de páginas, componentes, contenido y SEO específico).*
