# Roadmap de Optimización
> Propósito: plan priorizado (impacto × esfuerzo) para evolucionar el ecosistema y el Vault. Qué hacer primero.

Derivado de las fallas sistémicas de [[diagnostico-por-proyecto]]. Prioridad: **P0** ya (riesgo activo) · **P1** alto impacto/bajo esfuerzo · **P2** alto impacto/alto esfuerzo · **P3** mejora continua.

## P0 — Riesgo activo (hacer ya)
| Acción | Por qué | Esfuerzo |
|---|---|---|
| **Rotar el token GitHub de RENTADEILUMINACION** (`.git/config`) | Secreto expuesto en repo | Bajo |
| Auditar los otros repos por secretos (`git grep`) y añadir pre-commit anti-secretos | Prevención | Bajo |

## P1 — Alto impacto / bajo esfuerzo (semanas)
| Acción | Impacto | Proyectos |
|---|---|---|
| **Resolver el drift de deploy** (borrar config Cloudflare o migrar; un solo destino) | Falla #1: CSP/301 muertos en prod | ≥7 (MESECI, CAMARADESEGURIDAD, SEGURIDADPRIVADA, SEGURIDADPRIVADAEVENTOS, GAMADEMEXICO, MANEXT, PROYECTORED) |
| **Quitar `aggregateRating`/reviews fabricados** del JSON-LD | Riesgo de acción manual de Google | MESECI, RENTADEILUMINACION, BRINCOLINS, SEGURIDADPARACONDOMINIOS, CAMARADESEGURIDAD, MANEXT |
| **Corregir conflictos de dominio** (config vs canonical/sitemap) | SEO: canonical incorrecto | CLINICADEBELLEZA, SEGURIDADPRIVADAEVENTOS, INFIELMX |
| **Arreglar sitemaps rotos/duplicados** y robots faltantes | Indexación | RENTADEILUMINACION, INFIELMX, RESOIL, CABOIMAGE, LGACONTRAINCENDIOS, MEDEDUL |
| **Reemplazar datos de contacto placeholder** por reales | Conversión + confianza | 8 proyectos |
| Arreglar enlaces internos rotos | UX/SEO | BOMBERO, LGACONTRAINCENDIOS, RESOIL, CDMXSITE |

## P2 — Alto impacto / alto esfuerzo (meses)
| Acción | Impacto |
|---|---|
| **Cablear el backend de leads** (Cloudflare Worker → n8n → Brevo + WhatsApp) | Cierra el hueco #1: hoy los leads de formulario se pierden. Ver [[SOP 09 - Automatizacion de contenido]] |
| **Migrar catálogos hardcodeados a data-driven** (dataset + plantilla) | Mantenibilidad; elimina miles de líneas duplicadas. BRINCOLINS, MESASPICNIC, EVENTECH (/servicios), PODIUMEX, RENTADEILUMINACION |
| **Homologar a Astro 6.x** todos los proyectos | Reduce fragmentación 4/5/6 |
| **Pipeline de imágenes fal.ai/FLUX** | Quita el cuello de botella manual. [[SOP 08 - Generar e integrar imagenes]] |
| **Pipeline n8n de blog** | Escala contenido SEO |

## P3 — Mejora continua del Vault y los repos
| Acción | Impacto |
|---|---|
| **Normalizar tokens canónicos** en los componentes y retirar el puente de alias de `tokens.css` | Limpieza del design system |
| Generalizar el **gate de QA en CI** (astro check + lint SEO + link-check) a todos | Calidad sostenida |
| Limpiar artefactos de build y carpetas legacy versionadas | Higiene de repo. MESASPICNIC, RESOIL, CDMXSITE |
| Convertir los **3 sitios HTML estáticos** (BARBERIA, CDMXSITE, SEGURIDADPRIVADAMX) a Astro con el Vault | Unificación |
| Reconciliar la **familia mededul** (3 variantes; working copy sin git) | Evitar pérdida de trabajo |
| Empaquetar el scaffold como **plantilla `npm create`/repo template** de OrigenLab | Acelera la Estación 1 |

## Métrica de éxito
Cada proyecto nuevo nace pasando el [[02 - Estandares de Calidad]] sin retrabajo, y los proyectos existentes migran de P1→P3 hasta cero deuda sistémica.
