# 05 — Producción de Contenido

> Propósito: el "qué" del contenido — cómo se arma cada tipo de página y cada pieza editorial del Vault, con su colección, su layout, su schema y su estructura de secciones canónica.

Esta carpeta responde una sola pregunta: **dado un tipo de página, ¿qué colección lo alimenta, qué plantilla lo pinta, qué schema emite y qué secciones lleva?** El "cómo operativo" (paso a paso) vive en los [[07 - SOPs/00 - Indice de SOPs|SOPs]]; el código copy-paste en [[08 - Biblioteca Plantillas/00 - Indice de Plantillas|Plantillas]]; el JSON-LD por tipo en [[03 - SEO Master System/02 - Schema JSON-LD por tipo]]. Aquí está el mapa que los conecta.

## Mapa de la carpeta

| Documento | Qué cubre | Léelo cuando… |
|---|---|---|
| [[01 - Tipos de Pagina]] | Los 10 tipos de página (Home, Categoría L2, Subcategoría L3, Producto L4, Servicio L4, Artículo, Directorio/Zona, Landing de conversión, FAQ, Caso de éxito): colección, plantilla, schema y secciones. | Vas a crear cualquier página y necesitas saber su anatomía. |
| [[02 - Blog y Articulos SEO]] | El proceso editorial real del blog: frontmatter tipado, regla D3 (`.mdx` en colección), interlinking y la identidad visual por categoría. | Vas a producir un artículo o a montar el blog. |
| [[03 - Directorios y Paginas Locales]] | Páginas hyper-local por zona/alcaldía con ruta dinámica `[...slug]` desde colección; cómo evita el hardcode. | El negocio cubre varias zonas o lleva un directorio de terceros. |
| [[04 - FAQs y Casos de Exito]] | FAQ (FAQAccordion + `faqSchema`, una sola vez) y casos de éxito como prueba social honesta (sin reseñas fabricadas, B4). | Vas a añadir FAQs o testimonios/casos a cualquier página. |

## Principio rector (de [[patrones-canonicos]] §D)

Todo dato repetible —producto, servicio, artículo, zona, caso— vive en una **Content Collection** con esquema Zod `.strict()`, **nunca hardcodeado en `.astro`** (canónico **D1**; anti-patrón **D3** = blog como `.astro` sueltos: MESASPICNIC 75, RENTADEILUMINACION 128, PODIUMEX). El frontmatter real está definido en [[08 - Biblioteca Plantillas/_scaffold/content.config.ts|content.config.ts]] (colecciones `productos`, `servicios`, `articulos`, `zonas`, `casos`) y el SEO que consume en [[08 - Biblioteca Plantillas/_seo/seo.ts|seo.ts]] (`buildMeta()` + `buildSchema(pageType, data)`).

Tres reglas duras atraviesan toda la carpeta:

- **D1 / D3 — contenido en colección.** Si se repite, es una colección Zod `.strict()`. El blog **siempre** en `.mdx` dentro de la colección `articulos`.
- **B4 — cero datos estructurados fabricados.** Ni `aggregateRating` ni `Review` sin reseñas reales y verificables. Las FAQs y los casos se modelan honestamente (origen EVENTECH/PODIUMEX/GAMADEMEXICO).
- **D4 — conversión WhatsApp-first.** Todo CTA usa `waUrl(WA_MESSAGES.<intención>)` desde [[site.ts]]; nunca un `wa.me/<número>` hardcodeado.

## Evidencia (proyectos de origen)

- **Proceso editorial de blog:** GAMADEMEXICO (`PROCESO-BLOG-SEO.md`, `docs/TEMPLATE-ARTICULO-BLOG.md`, 84 posts) y MEDEDUL (120 `.mdx`, `categoryMeta` con identidad por categoría). Ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]] y [[../_AUDITORIA/diagnostico-MEDEDUL]].
- **Directorios y zonas:** EVENTECH (211 venues, `directorio/[...slug].astro`), INFLAPY (16 alcaldías, `cobertura/[slug]` data-driven), RENTADEILUMINACION (25 alcaldías). Ver [[../_AUDITORIA/diagnostico-EVENTECH]], [[../_AUDITORIA/diagnostico-INFLAPY]], [[../_AUDITORIA/diagnostico-RENTADEILUMINACION]].
- **Ficha schema-driven y FAQs:** CLINICADEBELLEZA (`ServiceLayout` con 10 bloques Zod opcionales, FAQs por servicio). Ver [[../_AUDITORIA/diagnostico-CLINICADEBELLEZA]].
- **Síntesis cuantificada:** [[patrones-canonicos]] §D (D1–D4).
