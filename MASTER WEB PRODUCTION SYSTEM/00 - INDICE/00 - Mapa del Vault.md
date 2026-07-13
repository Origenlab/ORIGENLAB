# MASTER WEB PRODUCTION SYSTEM — Mapa del Vault
> Propósito: fuente única de verdad para construir sitios OrigenLab profesionales desde cero hasta deploy. Empieza aquí.

Sistema operativo de producción web destilado de **31 proyectos reales** (Astro SSG). Si eres nuevo: lee [[01 - Filosofia]] → [[02 - Estandares de Calidad]] → corre el [[SOP 01 - Crear sitio nuevo]].

## Cómo está organizado

| Carpeta | Qué contiene | Empieza por |
|---|---|---|
| **00 - INDICE** | Este mapa de navegación | (aquí) |
| **01 - Fundamentos** | Filosofía, estándares de calidad, reglas globales, convenciones | [[01 - Filosofia]] |
| **02 - Arquitectura Astro** | Scaffold, estructura, layouts, integraciones | [[02 - Arquitectura Astro/01 - Scaffold y Estructura]] |
| **03 - SEO Master System** | Técnico, schema, on-page, internal linking | [[03 - SEO Master System/00 - Indice SEO]] |
| **04 - Diseño y UX** | Design tokens, componentes, UX y conversión | [[04 - Diseño y UX/01 - Design Tokens]] |
| **05 - Producción de Contenido** | Cómo se arma cada tipo de página/contenido | [[05 - Produccion de Contenido/00 - Indice]] |
| **06 - Automatizaciones** | Scripts reales + diseño de n8n/fal.ai/Brevo (con huecos marcados) | [[06 - Automatizaciones/00 - Indice]] |
| **07 - SOPs** | Procedimientos paso a paso (10) | [[07 - SOPs/00 - Indice de SOPs]] |
| **08 - Biblioteca Plantillas** | Código copy-paste por tipo de página | [[08 - Biblioteca Plantillas/00 - Indice de Plantillas]] |
| **09 - Biblioteca Componentes** | Inventario de componentes con props y ejemplos | [[09 - Biblioteca Componentes/00 - Inventario]] |

Trabajo de base (no se edita, es evidencia): `_AUDITORIA/` (diagnóstico de los 31 proyectos) y `_PATRONES/` (patrones canónicos). Ver [[diagnostico-por-proyecto]] y [[patrones-canonicos]].

## Ruta rápida: construir un sitio nuevo

1. [[SOP 06 - SEO tecnico y schema|Define]] arquetipo con el [[01 - Selector de Arquetipo|selector A/B/C/D]].
2. Scaffold: copia `08/_scaffold/` → llena [[site.ts]].
3. Contenido: Content Collections + plantillas de [[08 - Biblioteca Plantillas/00 - Indice de Plantillas]].
4. SEO: `seo.ts` ya cablea schema por tipo. Verifica con [[03 - SEO Master System/02 - Schema JSON-LD por tipo]].
5. Diseño: tokens en [[04 - Diseño y UX/01 - Design Tokens]], componentes de `09/_src`.
6. QA: corre el [[02 - Checklist QA Pre-Deploy]].
7. Deploy: [[SOP 07 - Deploy Cloudflare Pages]].

La metodología industrial completa está en [[01 - La Fabrica de Sitios]].

## Entregables clave

- [[Manual Operativo]] — guía end-to-end para construir un sitio usando solo el Vault.
- [[Roadmap de Optimizacion]] — plan priorizado (impacto × esfuerzo) para evolucionar el ecosistema.
- [[2026-07-10-Programa-SEO-NeuronWriter-Portafolio]] — programa operativo para auditar, priorizar y optimizar el portafolio URL por URL.
- [[03 - Mapa de Conocimiento]] — dónde vive el conocimiento hoy y qué centraliza este Vault.
- [[diagnostico-por-proyecto]] · [[patrones-canonicos]] — base de evidencia (31 proyectos).

## Estado del sistema (2026-06-18)

Construido y verificado: auditoría (31), patrones canónicos, scaffold, sistema SEO, layouts, 6 plantillas de página, 13 componentes, design tokens. Decisión pendiente del dueño: **deploy canónico** (Cloudflare Pages recomendado vs GitHub Pages) — ver [[03 - Reglas Globales]] §Deploy. Huecos abiertos (automatización n8n/fal.ai/Brevo, backend de leads): ver [[06 - Automatizaciones/00 - Indice]].
