# 34 — L4 Casos en operación · Roster y enlaces

> Inventario vivo de los casos de estudio L4 desplegados en `portafolio/[sector]/[cliente]/`.
> Última actualización: 2026-04-26

Esta nota es complementaria a [[33 — Layout L4 — Caso de Estudio (portafolio⁄[sector]⁄[cliente]⁄index.html)]] y a [[24 — Layout L2 — Portafolio (portafolio⁄index.html)]]. La fuente de verdad del **layout** está en la 33; aquí sólo se llevan los **datos del roster**.

---

## Sector · Equipos Contra Incendios

```
portafolio/equipos-contra-incendios/
├─ index.html                        ← L3 sector (showcase + cards + testimoniales)
├─ gama-de-mexico/index.html         ← L4
├─ meseci/index.html                 ← L4
├─ lga-contraincendios/index.html    ← L4
├─ manext/index.html                 ← L4
├─ bombero-mx/index.html             ← L4
└─ proyectored/index.html            ← L4
```

### Roster

| # | Caso | Slug L4 | Acento | Modelo | Sitio en vivo | Cobertura | Cumplimiento clave |
|---|------|---------|--------|--------|---------------|-----------|--------------------|
| 01 | Gama de México | `gama-de-mexico` | `#C0392B` | Distribuidor mono-marca | [gamademexico.com](https://gamademexico.com/) | CDMX · Querétaro · Bajío | UL · FM |
| 02 | MESECI | `meseci` | `#E67E22` | Multi-línea | [meseci.com.mx](https://meseci.com.mx/) | Nacional | NOM · NFPA |
| 03 | LGA Contraincendios | `lga-contraincendios` | `#DC2626` | E-commerce técnico | [lgacontraincendios.com](https://lgacontraincendios.com/) | Querétaro · regional | NOM |
| 04 | MANEXT | `manext` | `#B45309` | Servicios técnicos | [mantenimientodeextintores.mx](https://mantenimientodeextintores.mx/) | CDMX · ZMVM | NOM-154-SCFI · NOM-002-STPS |
| 05 | BOMBERO.MX | `bombero-mx` | `#B91C1C` | Distribuidor multi-marca | [bombero.mx](https://bombero.mx/) | Nacional (32 entidades) | NFPA 1971 · NFPA 1981 · NFPA 1855 |
| 06 | Proyecto Red | `proyectored` | `#7F1D1D` | Integrador | [proyectored.com.mx](https://proyectored.com.mx/) | CDMX · EdoMéx | NOM · NFPA |

### Cadena de navegación L4

`Gama → MESECI → LGA → MANEXT → BOMBERO.MX → Proyecto Red → (sector)`

Cada bloque `.ol-case-next` enlaza al caso anterior y siguiente. Al añadir o reordenar un caso, actualizar **los dos vecinos**.

---

## Enlaces internos del sector

| Punto de entrada | Apunta a | Notas |
|------------------|----------|-------|
| Header dropdown desktop · `Portafolio › Equipos Contra Incendios` | Subdrop con los 6 casos | Propagado en 33 páginas live |
| Header mobile submenu | Mismos 6 enlaces | Propagado en 33 páginas live |
| L3 sector · `ol-proj-grid` cards | Cada card → su L4 (link interno) | Card de Gama, MANEXT, BOMBERO.MX y Proyecto Red ya migradas a internal route. LGA mantiene link externo (e-commerce). MESECI internal. |
| L3 sector · `ol-showcase-block` | Cada bloque → su L4 + CTA "Ver caso" | Mismo patrón |
| L3 sector · `ol-tc` (testimonios) | Nombre de cliente envuelto en link interno con underline de acento | Patrón aplicado en Gama, MANEXT y BOMBERO.MX |
| L4 sidebar · `ol-side-cta` | `/cotizar/` + WhatsApp con texto contextual | Texto WhatsApp menciona el caso |
| L4 footer · `ol-case-next` | 2 cards: caso anterior/siguiente + sector | Cadena lineal |

---

## Imágenes por caso

Cada caso tiene 7 imágenes en `/img/equipos-contra-incendios/[slug]/[slug]-01.webp` … `[slug]-07.webp` más una `[slug]-hero.webp` que se usa en cards y showcase del sector.

**Convención**:
- `01.webp` — hero principal (también `og:image`)
- `02.webp` — sección institucional
- `03.webp` — catálogo / familias / servicios
- `04.webp` — sistema de tarjetas y badges
- `05.webp` — ficha de producto / servicio
- `06.webp` — vista responsiva
- `07.webp` — módulo de contacto + cobertura

Dimensiones estándar: **1543×854** (ratio 16:9 aprox), formato WebP, `loading="lazy"`, `decoding="async"`.

---

## Diferenciadores por caso (qué reescribir)

Lo que cambia entre casos:

1. **Acento** (`--case-accent` en `<style>` inline)
2. **Hero copy** (h1, sub, hero__p1, hero__p2)
3. **Sidebar datos del proyecto** (cliente, sector, marcas, normas, cobertura, sitio en vivo)
4. **JSON-LD**: `Organization` del cliente con `brand[]`/`areaServed`/`knowsAbout`
5. **10 secciones del body** — mismo orden, copy distinto
6. **Imágenes** del caso
7. **`ol-case-next`** según posición en la cadena
8. **Texto del WhatsApp** en CTAs (3 lugares: hero CTA del sidebar, CTA hero del caso, WA bubble flotante, form FAQ)
9. **Subdrop entry** propio en navegación (auto-propagado por script)

Lo que NO cambia: el resto del HTML viene del template.

---

## Variantes documentadas por modelo de negocio

| Modelo | Sección 03 (capas) | Sección 05 (id) | Sección 06 (tipo de canales) |
|--------|--------------------|-----------------|------------------------------|
| Distribuidor mono-marca (Gama) | 6 capas | `#catalogo` · familias del fabricante | Formulario · WhatsApp · teléfono · correo |
| Distribuidor multi-marca (BOMBERO.MX) | 7 capas (incluye Marcas distribuidas) | `#catalogo` · familias + plantilla de ficha | Formularios sectoriales · WhatsApp · teléfono · licitación |
| Servicios técnicos (MANEXT) | 7 capas (incluye Programa anual) | `#servicios` · servicios + normativa | Formulario corporativo · WhatsApp · teléfono · programa anual |
| Integrador (Proyecto Red) | 6 capas | `#proyectos` · líneas + galería | A definir |

---

## Hallazgos profesionales acumulados (2026-04-26)

- **`Formularios B2B`** (plural). Ya parchado en MANEXT y aplicado en BOMBERO.MX.
- **`aria-hidden="true" focusable="false"`** en TODOS los SVG decorativos. Aplicado retroactivamente en Gama, MANEXT y BOMBERO.MX (40+ SVG por caso).
- **JSON-LD enriquecido**: `Organization` del cliente como nodo separado, no inline en `about`. Patrón aplicado en BOMBERO.MX (referencia profesional). Pendiente migrar Gama y MANEXT.
- **Card del sector** debe apuntar a la URL interna del L4, no al sitio externo. Fix aplicado en Gama, MANEXT y BOMBERO.MX. LGA permanece externa por ser e-commerce.
- **Showcase block CTA** uniforme: "Ver caso" (no "Distribución" / "Mantenimiento" / "Bomberos").
- **Card link** uniforme: "Ver caso →".
- **Testimonio** del L3 con nombre del cliente envuelto en `<a>` interno con `border-bottom` color de acento (40% alpha).

---

## Tareas pendientes (lower priority)

- [ ] Migrar JSON-LD de Gama y MANEXT al patrón "Organization del cliente como nodo `@id` separado" usado en BOMBERO.MX.
- [ ] Auditar y completar los L4 de MESECI, LGA Contraincendios y Proyecto Red contra esta plantilla (algunos pueden carecer de `aria-hidden`, plural, etc.).
- [ ] Construir 7 imágenes oficiales por caso (`[slug]-01.webp` … `[slug]-07.webp`) cuando se entreguen los assets del cliente.
- [ ] Considerar extraer los componentes inline del L4 (`.ol-case-*`) a `premium-dark.css` si surge un sexto caso que duplique los estilos.
