# 43 — Auditoría de imágenes (uso · huérfanas · plan de integración)

> Estudio completo del 2026-06-02. Inventario de **todas** las imágenes del repo, qué se usa y dónde, qué está huérfano, y plan para integrar lo aprovechable. Excluye `_backup`, `_docs`, `graphify-out`.

## Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Imágenes totales | **291** |
| En uso | **149** (51%) |
| Huérfanas (sin referencia en HTML/CSS/JS/XML) | **142** (49%) |
| → Huérfanas **aprovechables** (stock real de incendios) | **32** |
| → Huérfanas **legacy** (exports de maqueta + duplicados, superseded) | **~110** |
| Artículos de blog SIN imagen destacada | **85 de 96** |

**Lectura:** la mitad de las imágenes no se usan, pero **no todas deben “usarse”**. ~110 son restos del sistema viejo (capturas/exports de maqueta + duplicados `.jpg/.png`) que el sistema `.mk` y las fotos nuevas ya reemplazaron — esas se **limpian**, no se integran. Lo realmente aprovechable son **32 fotos stock reales de incendios** que se generaron con nombre SEO pero nunca se conectaron. Y hay una oportunidad grande: **85 artículos sin imagen destacada**.

## 1. Imágenes en uso (149) — por categoría

| Categoría | # | Dónde |
|---|---|---|
| Directorio (foto real por negocio) | 51 | Tarjetas/hero de perfiles `directorio/[empresa]` |
| Figura de caso L4 (foto real) | 45 | `#contexto` + `#resultado` + OG de los 11 casos (seg. privada 5 + incendios 6) |
| `.mk` export legacy aún referenciado | 30 | 11 destacadas de artículo + algunas tarjetas |
| OG / hero social | 13 | `{slug}-hero.webp` + `og-image` |
| Logo / marca | 9 | `origenlab.webp` en header/footer |
| Thumbnail portafolio | 1 | Tarjeta de portafolio |

## 2. Huérfanas (142) — dos clases

### 2A · Aprovechables: 32 fotos stock reales de incendios
En `img/equipos-contra-incendios/` (raíz), AVIF con nombre SEO, **0 referencias**. Claramente generadas para ser imágenes de artículo y nunca conectadas:

| Tema | # |
|---|---|
| `equipo-bombero-traje-estructural-scba` | 5 |
| `bombero-escalera-rescate-altura` | 7 |
| `bombero-extinguiendo-incendio-estructural` | 4 |
| `bomberos-respuesta-emergencia-incendio` | 4 |
| `bomberos-equipo-proteccion-personal-epp` | 3 |
| `sistema-alarma-deteccion-contra-incendios` | 3 |
| `bomberos-entrenamiento-rescate` | 2 |
| `manguera-contra-incendios-industrial` | 2 |
| `extintores-contra-incendios-certificados` | 1 |
| `equipo-proteccion-contra-incendios` | 1 |

### 2B · Legacy a limpiar: ~110
- Exports de maqueta por sección: `gama-fichas-tecnicas-*`, `bombero-home-*`, `bombero-catalogo-*`, etc. (reemplazados por `.mk` inline).
- Numeradas viejas: `gamademexico-01..06 .png/.webp`, `{caso}-01..04 .jpg/.webp/.avif` (galerías viejas, hoy `.mk`).
- Duplicados `.jpg` de fotos que hoy viven como `.avif/.webp`.

> Estas **no se integran** — reintroducirían el sistema viejo. Se recomienda limpiarlas (existe `_cleanup-huerfanos.sh` en raíz; revisar `git diff` antes de correr). La regla del proyecto ya documenta ~137 huérfanas tras la migración de galerías a `.mk`.

## 3. Oportunidad: 85 artículos sin imagen destacada

El template L6 tiene `.ol-art-featured` (imagen 21:9 con caption flotante), pero solo **11 artículos** la usan (y con exports `.mk`, no fotos). 85 no tienen ninguna.

De esos 85, **~16 son temáticos de incendios** (no perfiles de directorio) y encajan perfecto con las 32 fotos stock 2A:

| Artículo (sin imagen) | Foto stock sugerida (tema) |
|---|---|
| `bombero-mx-equipo-personal-proteccion-bomberos` | EPP / traje estructural |
| `msa-honeywell-globe-bullard-mexico-bombero` | traje estructural SCBA |
| `equipos-respiracion-autonoma-scba-bomberos` *(hoy `.mk`)* | traje estructural SCBA |
| `catalogo-extintores-rociadores-hidrantes-meseci` | extintores / manguera |
| `meseci-equipo-contra-incendios-nom-nfpa` | respuesta emergencia |
| `comprar-equipo-contra-incendios-en-linea-lga` | equipo protección |
| `equipar-negocio-contra-incendios-queretaro-lga` | escalera rescate |
| `lga-extintores-clases-a-b-c-d-k-queretaro` | extintores certificados |
| `manext-recarga-mantenimiento-extintores-cdmx` | manguera industrial |
| `programa-anual-mantenimiento-extintores-empresas-manext` | escalera rescate |
| `recarga-extintores-tipos-agente-pqs-co2-manext` | manguera industrial |
| `prueba-hidrostatica-extintores-nom-154-nom-002` | extinguiendo estructural |
| `diseno-instalacion-mantenimiento-sistemas-pci-proyecto-red` | sistema alarma/detección |
| `proyecto-red-sistemas-contra-incendio-integrales` | sistema alarma/detección |
| `sistemas-deteccion-alarma-incendio-nfpa-72-proyecto-red` | sistema alarma/detección |
| `supresion-agentes-limpios-co2-centros-datos-proyecto-red` | equipo protección / detección |

Con featured (1) + alguna figura inline en los artículos largos se **consumen las 32**.

## 4. Plan de integración (propuesto)

1. **Generar fallback `.webp`** de las 32 AVIF (compatibilidad social/old browsers) y servir vía `<picture>`.
2. **Imagen destacada** (`ol-art-featured`) en los ~16 artículos de incendios sin imagen, mapeo de la tabla §3 (inyectar CSS `.ol-art-featured` + markup tras `<main class="ol-art-content">`).
3. **Figuras inline** con las fotos sobrantes en los artículos largos (guías técnicas), para consumir las 32 y enriquecer lectura.
4. **`alt` + `figcaption`** con keywords del tema (NFPA, NOM-154, SCBA, EPP, PQS/CO₂, detección…).
5. **Limpieza** de las ~110 legacy (clase 2B) vía `_cleanup-huerfanos.sh` — requiere tu confirmación (es borrado).
6. Deploy a Cloudflare Pages y verificación en vivo.

### Fase 2 (opcional)
Quedan ~69 artículos sin imagen (perfiles de directorio + artículos web/SEO). Para esos hay **fotos en `~/Downloads`** (62 de seguridad + 82 de incendios) que se pueden optimizar e integrar en una segunda pasada. No están “en el repo” todavía, por eso quedan fuera de esta fase.

Relacionado: [[42 — Fotos reales en casos L4 Seguridad Privada]] · [[38 — Sistema de maquetas .mk + Workflow caso L4 cliente]] · [[39 — Auditoría categoría Seguridad Privada]]
