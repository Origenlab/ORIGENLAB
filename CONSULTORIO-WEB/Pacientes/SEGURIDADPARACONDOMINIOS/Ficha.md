# 🩺 EXPEDIENTE CLÍNICO — SEGURIDADPARACONDOMINIOS

> **Consultorio Web OrigenLab** · Ficha técnica del sitio · Última revisión: 2026-06-20  
> Triage #15 de 31 · 🟡 Atención · P2 — Atención

---

## 1. Identificación del paciente

| Campo | Valor |
|---|---|
| Nombre clave | **SEGURIDADPARACONDOMINIOS** |
| Dominio | `seguridadprivadacondominios.com` |
| Sector | Seguridad privada |
| Cuenta GitHub | Origenlab |
| Repo / root | `SEGURIDADPARACONDOMINIOS` |
| Rama activa | `main` |

## 2. Signos vitales

| Signo | Lectura |
|---|---|
| Framework | **Astro 4.16** |
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
| Páginas | 52 |
| Posts de blog | 137 |

### Imágenes

| Métrica | Valor |
|---|---|
| Total | 286 |
| Modernas (WebP/AVIF) | 278 |
| Raster (JPG/PNG) | 8 |
| Pesadas (>200KB) | 0 |

## 4. Diagnóstico

- Astro 4 (stack obsoleto, 2 versiones atrás)
- Sin design system (tokens.css)

## 5. Plan de tratamiento

**Acción de stack:** Pendiente migración Astro 4 → 6 (mayor)

Pasos priorizados hacia el estándar *"terminado"*:

- [ ] P1 · Migrar Astro 4 → 6 (rama `canonical-astro6-migration`)
- [ ] P2 · Implementar tokens.css (design system homologado)

## 6. Pronóstico y prioridad

- **Prioridad global:** P2 — Atención
- **Score de severidad:** 38 (más alto = más intervención)
- **Triage:** #15 de 31
- **Esfuerzo estimado:** Medio

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
