---
title: Plan Maestro de Producción, Optimización y Escalamiento — OrigenLab
tipo: documento-ejecutivo
fecha_base: 2026-06-19
responsable: Dirección de Operaciones Digitales
estado: vigente
relacionado: [[00 - INDICE/00 - Mapa del Vault]]
---

# Plan Maestro OrigenLab — La Fábrica de Sitios Web

> Objetivo único: convertir el portafolio en una **fábrica de sitios web optimizados**, donde todos los proyectos siguen el mismo estándar de calidad, SEO, estructura, diseño, velocidad, contenido y documentación; todo en **Astro + Markdown**, sin errores técnicos y con trazabilidad total.

El tablero operativo vive en `OrigenLab-Plan-Maestro.xlsx` (misma carpeta). Este documento es la **metodología**: define el estándar, las rutinas y el sistema de documentación. El Excel es el **día a día**.

---

## 1. Estado actual (foto real al 19/06/2026)

Auditoría automatizada de los 31 proyectos cliente alojados en Local, **OrigenLab** y **Frank Oropeza**.

| Indicador | Hoy | Meta |
|---|---|---|
| Proyectos cliente | 31 | — |
| Favicon vibrante por sector | **31 / 31** ✔ | 31 / 31 |
| Desplegando con CI (Cloudflare/GitHub Pages) | 28 / 31 | 31 / 31 |
| En Astro 6 (stack canónico) | 8 / 31 | 31 / 31 |
| En Astro 4 / 5 (a migrar) | 20 / 31 | 0 |
| HTML estático (a reconstruir) | 3 / 31 | 0 |
| Con `tokens.css` / design system | 8 / 31 | 31 / 31 |
| Con Schema / JSON-LD | 28 / 31 | 31 / 31 |
| Con blog activo | 24 / 31 | 31 / 31 |
| Imágenes pesadas (>200 KB) | **512** | 0 |
| Proyectos en Prioridad 1 | 11 | 0 |

**Lecturas clave**
- Lo más urgente (P1): 3 sitios aún en **HTML estático** (Barbería MX, Directorio CDMX, Seguridad Privada MX), 3 **sin pipeline de deploy** (Cabo Image, Directorio CDMX, mededul.com) y 5 sitios con **imágenes pesadas** que castigan velocidad (Eventech 377, Brincolins 53, Proyecto Red 53, Mesas Picnic 14, Inflapy 6).
- El mayor gap de homologación es **`tokens.css`/design system**: 23 sitios no lo tienen → diseño inconsistente.
- La base ya es buena: SEO técnico, schema y WhatsApp-first están presentes en la mayoría; el favicon ya está homologado en todos.

---

## 2. Estándar de Homologación (Estándar Global)

Todo sitio se considera **terminado** sólo cuando cumple esta matriz. Es la definición de "calidad OrigenLab".

| Elemento | Estándar | Origen canónico |
|---|---|---|
| Framework | Astro 6.x SSG, `astro check` verde | `ORIGENLAB-TEMPLATE` |
| Design system | `tokens.css` `:root` (color/tipografía/espaciado) | `tokens.css` |
| SSoT | `src/config/site.ts` tipado | PROYECTORED |
| Content Collections | Zod `.strict()` (blog, servicios) | PODIUMEX `schema.ts` |
| SEO técnico | titles/descriptions/H1 únicos, sin canibalización | `lib/seo.ts` |
| Schema / JSON-LD | por `pageType`, **sin `aggregateRating` fabricado** | EVENTECH `seo.ts` |
| Sitemap + Robots + OG | `@astrojs/sitemap` + `robots.txt` + `og:image` | `astro.config` |
| Breadcrumbs | en todas las páginas, con JSON-LD | `lib/seo` |
| Header / Footer / Nav / 404 | patrón único reutilizable | componentes compartidos |
| FAQ + Tablas comparativas | bloque FAQ (`FAQPage`) + comparativa en servicios | componentes |
| Conversión | **WhatsApp-first** `waUrl()` + botón flotante + prueba social | `lib waUrl()` |
| Blog | colección activa + plan editorial por cluster | `content/blog` |
| Imágenes | **WebP/AVIF**, `alt` en todas, ninguna > 200 KB | pipeline imágenes |
| Responsive | mobile-first, breakpoints homologados | `mobile.css` |
| Favicon | icono vibrante por sector, set completo | `_branding/favicons-2026-06` ✔ |
| Deploy | Cloudflare Pages (GitHub Actions → `wrangler`) | `_tools/rollout-cf` |
| Documentación | cada cambio en la Bitácora | hoja `Bitacora` |

---

## 3. SOP — Optimización de un sitio, paso a paso

Procedimiento estándar que se aplica **igual a todos**. Es la "línea de producción".

1. **Snapshot**: registrar estado del sitio (la fila ya viene en la Tabla Maestra).
2. **Framework**: si es Astro 4/5 → migrar a Astro 6; si es HTML → reconstruir con la plantilla canónica.
3. **Homologar base**: `tokens.css`, `site.ts`, Header/Footer/Nav/404, layouts.
4. **SEO**: titles/descriptions/H1, keywords primarias/secundarias, enlazado interno, breadcrumbs, sitemap, robots, OG, Schema por `pageType`.
5. **Contenido**: completar páginas débiles, FAQs, tablas comparativas, CTAs; planear artículos del cluster.
6. **Imágenes**: convertir a WebP/AVIF, `alt`, eliminar pesos > 200 KB.
7. **Conversión**: WhatsApp-first, prueba social, casos de éxito, testimonios.
8. **Velocidad**: Lighthouse → corregir LCP/CLS/INP, podar JS/CSS.
9. **QA**: `astro check` verde + checklist de Homologación.
10. **Deploy + Bitácora**: commit/push (deploy CF), y **registrar el cambio**.

Regla de oro: **ningún paso se da por hecho hasta que queda en la Bitácora.**

---

## 4. Sistema de Producción Diaria

- **Una pieza por día**: cada mañana se toma la fila del día en la hoja `Tablero Diario` (ordenado P1 → P3) y se ejecuta su **Próxima Acción**.
- **Standup 8:00** y **revisión semanal lunes 8:30** (refresca Tabla Maestra + KPIs).
- Cadencia completa (diaria / semanal / mensual / trimestral) en la hoja `Cadencia`.

---

## 5. Sistema de Documentación (memoria viva)

Toda mejora se registra en la **Bitácora** (`Fecha · Sitio · Página · Cambio · Responsable · Resultado`). Además se mantienen historiales por dominio:

- Historial **SEO** · Historial **Contenido** · Historial **Diseño** · Historial **Técnico** · Historial **Rendimiento**.

En cualquier momento debe poder responderse: *¿qué sitio estamos trabajando, qué falta, qué se hizo, qué sigue?* — esa es la prueba de que el sistema funciona.

---

## 6. Fases de Escalamiento (12 meses)

| Fase | Nombre | Meses | Resultado |
|---|---|---|---|
| F1 | Organización total | 1–2 | inventario + deploy 100% + reconstrucción de legacy |
| F2 | Homologación de estructura | 2–4 | plantilla canónica + tokens + componentes |
| F3 | Optimización SEO global | 3–6 | schema, titles, sitemap, anti-canibalización |
| F4 | Optimización UX / Conversión | 5–8 | Header/Footer/CTA + Core Web Vitals + imágenes |
| F5 | Producción masiva de contenido | 7–12 | plan editorial + artículos por cluster |
| F6 | Automatización Astro+Markdown | 6–10 | generador/scaffold + pipeline de imágenes |
| F7 | Documentación centralizada | 1–12 | bitácora + historiales |
| F8 | Control de calidad | 4–12 | QA + CI `astro check` verde |
| F9 | Optimización continua | 6–12 | revisión mensual de KPIs |
| F10 | Escalamiento y crecimiento | 9–12 | onboarding de clientes nuevos con la fábrica |

Detalle accionable en la hoja `Roadmap` y la `Linea de Tiempo`.

---

## 7. KPIs

Se miden en la hoja `KPIs` (varios se autocalculan desde la Tabla Maestra): % en Astro 6, % desplegando, % con schema, % con tokens, % con blog, imágenes pesadas totales, P1 abiertos, LCP verde, cobertura de documentación, y **tiempo de creación de un sitio nuevo** (meta < 1 día) como métrica final de la fábrica.

---

## 8. Cómo encaja todo

- **Este `.md`** = metodología y estándar (vault, versionable).
- **`OrigenLab-Plan-Maestro.xlsx`** = operación diaria (tabla maestra, roadmap, tablero, bitácora, línea de tiempo, KPIs).
- **`ORIGENLAB-TEMPLATE` + `_tools/`** = la maquinaria (scaffold canónico, rollout de deploy, fixers).
- **`_branding/favicons-2026-06/`** = identidad ya homologada (31/31).

> Próximo arranque (semana 1): cerrar deploy del 100% (3 sin pipeline), reconstruir los 3 sitios legacy en Astro, y empezar la homologación de `tokens.css`. Todo se va tachando en el `Tablero Diario` y registrando en la `Bitacora`.
