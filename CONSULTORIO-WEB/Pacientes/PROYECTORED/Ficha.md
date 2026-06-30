# 🩺 EXPEDIENTE CLÍNICO — PROYECTORED

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #14 de 31 · 🟡 Atención · P2 — Atención

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **PROYECTORED** |
| Dominio | `proyectored.com.mx` |
| Sector | Contra incendios |
| Cuenta GitHub | Origenlab |
| Repo / root | `PROYECTORED` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 6.1** |
| Estado de deploy | live |
| Pipeline CI (.yml) | ✅ |
| Favicon | ✅ |
| Hosting | Cloudflare Pages |
| Salud general | 🟡 Atención (score 38) |

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
| Páginas | 39 |
| Posts de blog | 129 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 236 |
| Modernas (WebP/AVIF) | 103 |
| Raster (JPG/PNG) | 133 |
| Pesadas (>200KB) | 53 |

## 4. Diagnóstico

- Sin design system (tokens.css)
- 53 imágenes pesadas (>200KB)

## 5. Plan de tratamiento

**Acción de stack:** Stack canónico Astro 6 ✓

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P2 · Implementar tokens.css (design system homologado)
- [ ] P2 · Optimizar 53 imágenes pesadas (WebP/AVIF <200KB)
- [ ] P3 · Convertir 133 imágenes raster a formatos modernos

## 6. Pronóstico y prioridad

- **Prioridad global:** P2 — Atención
- **Score de severidad:** 38 (más alto = más intervención)
- **Triage:** #14 de 31
- **Esfuerzo estimado:** Medio

## 7. Checklist de homologación (qué tiene / qué falta)

Estándar OrigenLab de sitio *"terminado"*:

| Ítem del estándar | Estado |
|---|---|
| Astro 6 SSG | ✅ |
| tokens.css (design system) | ❌ |
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
