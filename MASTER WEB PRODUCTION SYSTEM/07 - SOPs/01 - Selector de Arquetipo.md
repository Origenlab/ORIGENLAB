# Selector de Arquetipo
> Propósito: decidir en 4 preguntas qué tipo de sitio construir, y con eso qué layout, schema y plantillas usar.

Los 4 arquetipos salieron de clasificar los 31 proyectos ([[diagnostico-por-proyecto]]). La mayoría son **híbridos**: elige el **eje comercial primario** para layout+schema y añade el secundario como módulo.

## Árbol de decisión

1. **¿El negocio vende productos físicos en catálogo (con marcas, specs, variantes)?**
   → Sí, y a escala → **Arquetipo A — Catálogo técnico.**
2. **¿Renta o vende por evento/fecha, con paquetes y cotización?**
   → Sí → **Arquetipo B — Renta/Eventos.**
3. **¿Es un servicio profesional recurrente con cobertura geográfica local?**
   → Sí → **Arquetipo C — Servicio profesional local.**
4. **¿El valor principal es contenido/directorio para captación SEO masiva?**
   → Sí → **Arquetipo D — Contenido/Directorio.**

Si dos aplican: el primario define el sitio; el otro entra como módulo (ej. **A+D** = catálogo + directorio nacional, como BOMBERO).

## Tabla de arquetipos

| | **A — Catálogo** | **B — Renta/Eventos** | **C — Servicio local** | **D — Contenido/Directorio** |
|---|---|---|---|---|
| **Eje** | Producto físico | Renta por evento | Servicio recurrente local | SEO por contenido |
| **Jerarquía** | L1→L2→L3→L4 ficha producto | L1→paquetes→cotizar | L1→servicios→zonas | índice→categoría→ficha/artículo |
| **Schema** | Product + Offer + Breadcrumb | Service + OfferCatalog | LocalBusiness + Service + geo + areaServed | CollectionPage + ItemList (+ EmergencyService/Place) |
| **Conversión** | Cotizar producto (WA) | Cotizar evento (fecha/WA) | Agendar/auditoría (WA) | Captar y derivar a A/B/C |
| **Plantilla principal** | `pagina-producto` | `pagina-servicio` | `pagina-servicio` + zonas | `pagina-directorio-[...slug]` |
| **Layout** | `ProductLayout` | `ServiceLayout` | `ServiceLayout` | `PageLayout` |
| **Ejemplos reales** | BOMBERO, FIREFIGHTERMX, MESECI, PROYECTORED, MANEXT, PANTALLA-LED, MONITORES | RENTADEILUMINACION, EVENTECH, INFLAPY, PODIUMEX, RESOIL, BRINCOLINS, MESASPICNIC, MEDEDUL | SEGURIDADPRIVADA, CAMARADESEGURIDAD, LGACONTRAINCENDIOS, SEGURIDADPARACONDOMINIOS, CLINICADEBELLEZA, CABOIMAGE | FIREFIGHTERCOMMX, BARBERIA, CDMXSITE, INFIELMX, GAMADEMEXICO |

## Salida de esta estación
- Arquetipo primario (+ secundario si aplica).
- Lista de URLs/taxonomía inicial (alimenta `TAXONOMY` en `site.ts`).
- Set de schema a activar en `seo.ts` (`pageType` por página).
- Plantillas y layout a usar.

Siguiente: [[SOP 01 - Crear sitio nuevo]].
