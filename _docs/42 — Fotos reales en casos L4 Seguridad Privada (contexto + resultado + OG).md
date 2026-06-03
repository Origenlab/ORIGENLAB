# 42 — Fotos reales en casos L4 Seguridad Privada (#contexto + #resultado + OG)

> Patrón para enriquecer los casos L4 con **fotografía real** sin tocar el sistema de maquetas [[38 — Sistema de maquetas .mk + Workflow caso L4 cliente]]. Hecho 2026-06-02 para los 5 casos del sector seguridad privada.

## Qué es

Las maquetas `.mk` ilustran "el sitio que construimos". Las **fotos reales** ilustran "la operación real del cliente". Conviven: foto real arriba, maqueta del sitio debajo. **No son capturas de webs** (eso sigue prohibido, ver [[38]]); son fotos del mundo real que aporta el dueño del sitio.

## Colocación por caso (2 figuras visibles + 1 imagen social)

1. **`#contexto`** — 1 foto real **arriba de la maqueta `.mk`** de esa sección. Sienta la escena (guardias, control de accesos, CCTV…) antes de mostrar el sitio.
2. **`#resultado`** — 1 foto de apoyo **justo antes de `<div class="ol-cs-band">`** (la banda de cifras).
3. **OG / Twitter / JSON-LD** — se **sobrescribe el archivo `{slug}-hero.webp`**. No se edita HTML: las metas ya apuntan a ese archivo, así que cambiar el binario actualiza la tarjeta social automáticamente.

> La galería `#galeria` sigue siendo 100% `.mk`. No se le mete `<img>`.

## Markup (componente existente, no se inventa CSS)

```html
<figure class="ol-case-figure">
  <div class="ol-case-figure-frame">
    <picture>
      <source srcset="/img/seguridad-privada/{slug}/{archivo}.avif" type="image/avif">
      <img src="/img/seguridad-privada/{slug}/{archivo}.webp"
           alt="{alt con keyword}" width="1280" height="720"
           loading="lazy" decoding="async">
    </picture>
  </div>
  <figcaption class="ol-case-figure-caption">{caption ligado a la narrativa}</figcaption>
</figure>
```

El CSS `.ol-case-figure-frame img { width:100%; height:auto; object-fit:cover }` ya existe en `premium-dark.css` y aplica el borde con el `--case-accent-line` del caso. El marco es idéntico al que envuelve las `.mk`, así que queda homologado por construcción.

### Anclas de inserción (para scripts/ediciones)
- **Contexto:** la `<figure class="ol-case-figure">` de la maqueta — su `mk-url` es único por caso. Se inserta la foto **antes** de esa figura.
- **Resultado:** `<div class="ol-cs-band">` (aparece exactamente 1 vez por archivo).

## Optimización

| Uso | Formato | Dimensión | Calidad |
|-----|---------|-----------|---------|
| Figuras (#contexto, #resultado) | AVIF (primario) + WebP (fallback) vía `<picture>` | 1280×720 (16:9) | AVIF q58 · WebP q80 |
| Imagen social `{slug}-hero.webp` | WebP | 1200×630 | q82 |

Producción con PIL (`Image.save(... "AVIF"/"WEBP")`), recorte centrado al aspect ratio. Archivos a `img/seguridad-privada/{slug}/`. ~80-160 KB por imagen.

## SEO

- **Nombres de archivo con keyword** (no `caso-01.avif`): `guardias-seguridad-privada-condominios-gupri.avif`, `monitoreo-cctv-seguridad-privada-seguridadprivadamx.avif`, etc.
- **`alt` descriptivo con keywords naturales** (no keyword-stuffing): "Operadores de seguridad privada monitoreando cámaras CCTV en una central 24/7".
- `width`/`height` explícitos (CLS≈0) + `loading="lazy"` + `decoding="async"`.
- La regla "no mencionar SEO en el sitio" aplica al **copy visible**; los nombres de archivo y `alt` no son copy y sí se optimizan.

## Mapeo tema → caso (2026-06-02)

El stock se clasificó en 6 temas. Asignación por afinidad con el cliente:

| Caso | Acento | Foto #contexto | Foto #resultado (apoyo) |
|------|--------|----------------|-------------------------|
| **gupri** | `#047857` | `guardias-seguridad-privada-condominios-gupri` (control de acceso vehicular en condominio) | `patrullaje-vigilancia-condominios-gupri` |
| **origins** | `#2563EB` | `seguridad-privada-residencial-condominios-origins` (guardias intramuros con residentes) | `guardias-intramuros-patrullaje-origins` |
| **seguridadeventos** | `#7C3AED` | `seguridad-privada-eventos-control-de-accesos` (control de accesos en evento) | `guardias-evento-masivo-seguridadeventos` |
| **seguridadprivadamx** | `#4F46E5` | `monitoreo-cctv-seguridad-privada-seguridadprivadamx` (central CCTV 24/7 — su diferenciador) | `control-de-accesos-condominios-seguridadprivadamx` |
| **seprico** | `#0E7490` | `control-de-accesos-seguridad-privada-seprico` (caseta verificando credenciales) | `patrullaje-condominios-vigilancia-seprico` |

## Reglas respetadas

- Galerías `.mk` intactas (8 nodos `.mk` por caso, sin cambios).
- Sin precios, sin plazos, sin copy de SEO en lo visible.
- `figcaption` profesional, perfiles por rol/sector (nunca nombres inventados).

## Aplicado también a Equipos Contra Incendios (6 casos · 2026-06-02)

Mismo patrón, ahora en `portafolio/equipos-contra-incendios/`. **Diferencias del sector respecto a seguridad privada:**

- El `#resultado` **no usa `ol-cs-band`**; la foto de apoyo se inserta **antes del primer `<ul class="ol-case-list">`** dentro de `#resultado` (inserción scopeada por sección con Python, no por ancla global única).
- Las **carpetas img no coinciden con el slug**: `gama-de-mexico → /img/equipos-contra-incendios/gamademexico/`, `bombero-mx → /bombero/`. Siempre leer la ruta real del `og:image` antes de tocar.
- **proyectored** tenía el OG en `.avif` (mal para scrapers sociales); se creó `proyectored-hero.webp` y se repuntaron sus 3 metas (og/twitter/JSON-LD).

| Caso | Acento | #contexto | #resultado |
|------|--------|-----------|------------|
| **gama-de-mexico** | `#C0392B` | unidad/monitores Elkhart (apparatus) | catálogo de equipo |
| **meseci** | `#E67E22` | equipo NOM/NFPA en exhibición | inspección técnica |
| **lga-contraincendios** | `#E63946` | catálogo e-commerce | revisión previa al envío |
| **manext** | `#B45309` | mantenimiento/inspección | recarga extintores NOM-154 |
| **bombero-mx** | `#B91C1C` | EPP NFPA (trajes/SCBA) | inspección traje + SCBA |
| **proyectored** | `#7F1D1D` | protección de planta industrial | cobertura complejos industriales |

Temas de stock usados: equipo en exhibición, inspección técnica, industrial/petroquímico, apparatus (fire engine). Se evitaron los frames más dramáticos (combate/rescate) por ser B2B de equipo.

## Workflow para repetir (otros sectores)

1. Usuario guarda fotos reales en `~/Downloads` (él autoriza el stock como dueño).
2. Clasificar por tema, elegir 2 por caso + 1 para OG.
3. Optimizar a AVIF/WebP con nombres keyword.
4. Insertar las 2 figuras (contexto + resultado) y sobrescribir `{slug}-hero.webp`.
5. Verificar `<picture>` ×2 por caso, alt no vacío, `.mk` intacto.
6. Deploy: [[41 — Deploy origenlab.com vía Cloudflare Pages (2026-06-02)]].

Relacionado: [[38 — Sistema de maquetas .mk + Workflow caso L4 cliente]] · [[33 — Layout L4 — Caso de Estudio (portafolio⁄[sector]⁄[cliente]⁄index.html)]] · [[39 — Auditoría categoría Seguridad Privada (homologación + SEO·GEO)]]
