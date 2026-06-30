# Componentes y Jerarquía Visual
> Propósito: qué componente usar dónde, y cómo ordenar la página para guiar al usuario.

Inventario completo con props y origen: [[09 - Biblioteca Componentes/00 - Inventario]]. Filosofía "una sección = un componente" (origen PROYECTORED).

## Anatomía de página (orden canónico)

**Home (L1):**
`TopBar` → `Header` → `Hero` (CTA arriba del fold) → categorías/servicios (grid de `ProductCard`/`ServiceCard`) → prueba social (casos reales) → `CTABanner` → `Footer` → `WhatsAppFloat`.

**Categoría (L2):**
`Header` → `Breadcrumbs` → `SectionHeading` + intro → grid de subcategorías/productos → `RelatedLinks` → `FAQAccordion` → `CTABanner`.

**Ficha producto/servicio (L4):**
`Breadcrumbs` → título + hero de ficha → bloques (descripción, specs/beneficios, aplicaciones, FAQ) → `CTABanner` (cotizar por WhatsApp) → `RelatedLinks`.

## Jerarquía visual (reglas)
1. **Una sola acción primaria por vista** (cotizar/WhatsApp), destacada con `--c-primary`.
2. **Un solo H1** por página; `SectionHeading` para H2/H3.
3. **Arriba del fold:** propuesta de valor + CTA + señal de confianza.
4. **Prueba social honesta:** casos/clientes reales. Sin reseñas inventadas. *(Regla B4.)*
5. **Densidad mobile-first:** verificar 1024/768/640/480/380.

## Componentes clave
| Componente | Uso | Origen |
|---|---|---|
| `Hero` | Encabezado L1/L2 con CTA | PROYECTORED + MESECI/HeroBase |
| `ProductCard` / `ServiceCard` | Grids de catálogo | PROYECTORED `.ccard` |
| `CTABanner` | Cierre de conversión | MESECI |
| `WhatsAppFloat` | Conversión persistente | PROYECTORED |
| `Breadcrumbs` | Navegación + (schema en seo.ts) | PROYECTORED |
| `FAQAccordion` | FAQ + schema opt-in | MESECI |
| `RelatedLinks` | Internal linking | PROYECTORED |

Todos consumen `site.ts` (cero datos hardcodeados) y `var(--token)`.
