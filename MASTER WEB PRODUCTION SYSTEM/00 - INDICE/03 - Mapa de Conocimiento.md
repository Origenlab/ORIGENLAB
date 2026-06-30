# Mapa de Conocimiento
> Propósito: dónde vive el conocimiento del ecosistema hoy, qué centraliza este Vault, y qué huecos quedan.

## Cómo estaba el conocimiento (antes del Vault Maestro)

Disperso en **~9 vaults Obsidian** + **~10 conjuntos de docs sueltos**, dentro de cada proyecto, y **desactualizado respecto al código** (varios dicen "Astro 5 / Cloudflare" cuando el repo ya es Astro 6 / GitHub Pages). No había una fuente única.

### Vaults Obsidian existentes (minados)
| Proyecto | Cubre | Reutilizable |
|---|---|---|
| **MESECI** (00–07 + AUDITORIA propia) | Arquitectura, design system, fichas de página/componente, SEO, templates L3 | Alto — el más completo |
| **PROYECTORED** (ProyectoRed-Vault 01–06) | Niveles L2/L4, fichas aprobadas, regla de oro CSS | Alto |
| **MESASPICNIC** (44 md) | Design system + 16 fichas de componente + 21 páginas | Alto |
| **PANTALLA-LED** (34 md) | Design system + guías "crear página/sección" | Alto |
| **EVENTECH** (16 md) | Plantillas hub/producto, convenciones SEO | Alto |
| **INFIELMX** (00–08) | Blueprint L2, frontmatter atado a `src/` | Medio |
| **CLINICADEBELLEZA** (00–13) | Diseño + layouts | Medio |
| **CABOIMAGE** | Marca/SEO | Medio |
| **SEGURIDADPRIVADA** (vault/) | Estudio de homologación | Medio |

### Docs sueltos valiosos
GAMADEMEXICO (`PROCESO-BLOG-SEO`, `TEMPLATE-ARTICULO`), CDMXSITE (3 `SEO-GUIDE`: GSC, Schema, CWV), RESOIL/SEGURIDADPRIVADAMX (`DOCUMENTO-PAGINAS`, `DOCUMENTO-ARTICULOS`), MEDEDUL (`GUIA_MAESTRA`, `COMPONENTS.md`), MESASPICNIC (`DMChamp — Guía Maestra OrigenLab`), SEGURIDADPRIVADA (`ESTUDIO-MAESTRO-HOMOLOGACION-2026`).

## Qué centraliza ahora este Vault

El **MASTER WEB PRODUCTION SYSTEM** absorbe y reconcilia ese conocimiento en una sola fuente actualizada:
- Lo disperso → [[01 - Filosofia|Fundamentos]] + [[03 - Reglas Globales|Reglas]].
- Los design systems de MESECI/PROYECTORED/PANTALLA-LED → [[04 - Diseño y UX/01 - Design Tokens|Tokens]] + [[09 - Biblioteca Componentes/00 - Inventario|Componentes]].
- Las plantillas L3/L4 → [[08 - Biblioteca Plantillas/00 - Indice de Plantillas|Plantillas]].
- El proceso de blog de GAMADEMEXICO/MEDEDUL → [[02 - Blog y Articulos SEO]].
- Las guías SEO de CDMXSITE → [[03 - SEO Master System/00 - Indice SEO|SEO Master System]].
- El estudio de homologación de SEGURIDADPRIVADA → [[patrones-canonicos]].

**Regla:** a partir de ahora, este Vault es la fuente única. Los vaults por proyecto quedan como histórico; el conocimiento nuevo se escribe aquí.

## Huecos de conocimiento (lo que nadie había documentado bien)
- **Backend de leads / n8n / fal.ai / Brevo:** mencionados en docs, **sin implementación real**. Documentados como diseño objetivo (⚠️ HUECO) en [[06 - Automatizaciones/00 - Indice]].
- **Deploy canónico:** decisión nunca cerrada (drift CF↔GH Pages). Pendiente de confirmar.
- **`METODOLOGIA-ORIGENLAB-v2.md`** (citada en el encargo): no existe.
- **Handler real de formularios:** sin verificar en ningún proyecto.

## Recomendación de migración
1. Marca este Vault como fuente única (pin en Obsidian).
2. En cada repo, reemplaza el README por un enlace a este Vault + las particularidades del proyecto.
3. Conforme migres proyectos (Roadmap P1–P3), borra los docs desactualizados que ya estén cubiertos aquí.
