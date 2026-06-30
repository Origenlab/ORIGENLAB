# 03 — Generación de Imágenes fal.ai

> ⚠️ HUECO: no implementado — diseño propuesto.

> Propósito: diseño objetivo de un pipeline que genere imágenes con fal.ai/FLUX y las deje listas para el sitio (AVIF dimensionado, nombre con keyword, alt, en `/img`, servidas por CDN). **No existe en ningún repo.** Hoy el proceso de imágenes es manual.

## Estado real (verificado en auditoría)

**fal.ai / FLUX NO aparece en ningún repositorio del ecosistema** (grep negativo en código, config y env de los 31 proyectos; [[patrones-canonicos]] §E5, [[02 - Arquitectura Astro/03 - Integraciones]] §HUECOS). Lo que existe hoy es **manual**:

- **Optimización a AVIF manual / scripts sueltos:** RENTADEILUMINACION tiene `optimize_avif.js`/`optimize_avif.mjs` en raíz + `sharp` como devDep → conversión a AVIF corrida **a mano, fuera del build**; la auditoría lo marca como automatizable. GAMADEMEXICO tiene `optimizar-directorio.sh` (PNG→AVIF 1200×675) y `process_*.py` para fichas. CLINICADEBELLEZA/MEDEDUL usan `astro:assets` + `sharp`.
- **Indicio de IA, sin integración:** RENTADEILUMINACION tiene un `REPORTE-IMAGENES-GENERADAS.md` que **sugiere** que algunas AVIF se generaron con IA, pero **no hay integración en runtime ni en build** — la herramienta exacta es un hueco. Ver [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]] §HUECOS.
- **Lo que sí es real y aguas abajo:** la **entrega** por CDN (`rewrite-cdn.mjs`, AVIF, srcset) — eso está documentado como REAL en [[01 - Scripts Reales]]. El hueco es la **generación**, no la entrega.

Mientras tanto, las imágenes se crean/optimizan a mano y se colocan en `/img` (o `/images`) cumpliendo la convención de naming-keyword + `alt` que ya exige el esquema (`imagePath` `^/images/`).

## Diseño objetivo (propuesta, a construir)

Un pipeline que tome un prompt y entregue una imagen lista para producción, encajando en las reglas que el Vault **ya** impone (imagen obligatoria con ruta bajo `/images/`, alt obligatorio en el blog).

### Flujo propuesto

```
1. Prompt        → descripción + estilo de marca (consistente con la paleta de [[04 - Diseño y UX/01 - Design Tokens]])
2. FLUX (fal.ai) → genera la imagen base
3. Dimensionado  → recorta/escala a los tamaños del sitio (hero, card, OG 1200×630) y convierte a AVIF
                    (lo que hoy hacen optimize_avif.* / optimizar-directorio.sh a mano)
4. Naming-keyword→ nombre de archivo descriptivo-SEO con la keyword y sufijo de ancho
                    (convención REAL: RENTADEILUMINACION `renta-cabezas-moviles-...-800w.avif`)
5. Alt           → genera el texto alternativo descriptivo (heroImageAlt / imagenAlt, min 10 chars — GAMADEMEXICO)
6. Carpeta /img  → coloca el AVIF bajo /img|/images/<seccion>/ (cumple imagePath ^/images/ del schema)
7. CDN           → el HTML se sirve vía CDN por rewrite-cdn.mjs post-build (REAL — [[01 - Scripts Reales]])
```

### Por qué este diseño encaja con lo real

- **Los pasos 3–7 ya existen, manuales:** dimensionado AVIF (`optimize_avif.*`, `optimizar-directorio.sh`), naming-keyword (convención verificada en RENTADEILUMINACION), `alt` obligatorio (Zod `imagenAlt` min 10 en GAMADEMEXICO), `/img` + CDN (`rewrite-cdn.mjs` REAL). El hueco es **automatizar y encadenar** los pasos 1–2 (generación) con esa cadena que ya funciona.
- **El esquema obliga la calidad:** `imagePath` (`^/images/`) en `content.config.ts` rechaza en build cualquier imagen sin ruta válida; el blog exige `heroImage` + `imageAlt`. La automatización debe producir activos que pasen ese gate.
- **Coherencia de marca:** los prompts deben respetar la paleta/estilo definidos en [[04 - Diseño y UX/01 - Design Tokens]], no generar imágenes genéricas.

### Qué falta para que sea real

1. Cuenta/credencial fal.ai y el nodo de generación FLUX — **no existe**.
2. El encadenado generación → dimensionado → naming → alt como un solo paso reproducible (hoy son scripts sueltos manuales).
3. Integración con el pipeline de contenido ([[02 - Pipeline de Contenido n8n]], también HUECO) para que un artículo nuevo dispare sus imágenes.

Hasta entonces, **el pipeline de imágenes es manual**. SOP relacionado: [[SOP 08 - Generar e integrar imagenes]].

## Evidencia

- Optimización AVIF manual / scripts sueltos: RENTADEILUMINACION `optimize_avif.mjs` + `REPORTE-IMAGENES-GENERADAS.md` (indicio IA, sin integración); GAMADEMEXICO `optimizar-directorio.sh`, `process_*.py`. Ver [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]] y [[../_AUDITORIA/diagnostico-GAMADEMEXICO]].
- Convención naming-keyword + AVIF: RENTADEILUMINACION (`/img/<servicio>/...-800w.avif`); `alt` obligatorio: GAMADEMEXICO Zod `imagenAlt`.
- Entrega real por CDN (aguas abajo): [[01 - Scripts Reales]] (`rewrite-cdn.mjs`).
- Confirmación de hueco: [[02 - Arquitectura Astro/03 - Integraciones]] §HUECOS y [[patrones-canonicos]] §E5.
