# 38 — Sistema de maquetas `.mk` + Workflow de caso L4 de cliente

> Cómo levantar la página de caso de estudio (L4) de un cliente nuevo, homologada a la referencia, e **ilustrarla con maquetas fieles del sitio** (`.mk`) cuando no hay capturas reales.
>
> Referencia base de layout L4: `/_docs/33` y `/_docs/34`. Reglas de oro del proyecto: `CLAUDE.md`.
>
> 📷 **Complemento:** cuando el dueño aporta fotos del mundo real, se pueden sumar a `#contexto` + `#resultado` + OG **sin tocar las `.mk`** — ver [[42 — Fotos reales en casos L4 Seguridad Privada]]. Las `.mk` siguen siendo la galería; las fotos reales NO son capturas de webs.

---

## 0. TL;DR del flujo

1. **Crawlear** el sitio del cliente (Chrome MCP o Crawl4AI) → marca, headline real, servicios, cifras, zonas, FAQ, testimonios.
2. **Copiar** un caso L4 existente como andamio (`origins`, `seprico` o `gama-de-mexico`).
3. **Transformar el `<head>`**: title, description, canonical, OG/Twitter, JSON-LD (`Organization`+`SecurityService` del cliente, `BreadcrumbList`, `CreativeWork`), breadcrumb visible, **acento del caso**.
4. **Escribir el body**: hero (h1 directo y con keyword, copy humanizado) + sidebar + 9–10 secciones.
5. **Galería = maquetas `.mk`** (6 pantallas del sitio recreadas en HTML/CSS) — NO requiere archivos de imagen.
6. **Interlinking recíproco**: card del hub → caso, submenú del header (desktop + móvil, en todas las páginas), cadena prev/next, card y conteo en `portafolio/index.html`, `sitemap.xml`.
7. **Deploy**: commit + push **desde la Mac** (ver §7).

---

## 1. Por qué maquetas `.mk` y no capturas

**Límite real de la herramienta:** las capturas que se toman con el navegador (Chrome MCP / `save_to_disk`) **no se persisten a un archivo** que el entorno de Claude pueda escribir en el repo — viven en la Mac del usuario, en un sistema separado del sandbox. Además, no se permite scrapear el sitio con headless/curl desde el sandbox. Resultado: **Claude no puede inyectar capturas reales al repo**; eso lo hace el usuario soltando los assets.

**Solución profesional:** recrear las pantallas del sitio con **maquetas HTML/CSS (`.mk`)** — un "browser-mockup" de tema claro, self-contained, que reproduce el contenido real (logo, menú, headline, cards, stats, testimonios, formulario). Se ve como una captura, no pesa archivos, y se versiona con el HTML.

**Capturas reales (opcional):** si el cliente entrega assets, van como `img/[sector]/[slug]/[slug]-hero.webp` (+ `-01..07.webp`) y se usan en la figura principal, card del hub y `og:image`. Claude **sí** puede convertir/optimizar a AVIF un archivo que ya esté en la carpeta (`convert in.jpg -quality 72 out.avif`), pero no puede generar la captura.

---

## 2. El componente `.mk` (CSS)

CSS self-contained que vive en el `<style>` de la página del caso (no en `premium-dark.css`, porque el acento cambia por cliente). Tema **claro** a propósito: simula la pantalla real del sitio dentro del frame oscuro del caso. **Sin animaciones** (regla 4).

Variables clave (cambiar solo el acento por cliente):

```css
.mk { --mk-indigo:#2563EB; /* ← ACENTO del cliente */
      --mk-ink:#0F1729; --mk-gray:#475467; --mk-soft:#7A8699;
      --mk-line:#E6E8EE; --mk-bg:#FFFFFF; --mk-bg2:#F6F7FB; --mk-indigo-soft:#EEF0FF; }
```

Bloques disponibles (catálogo): `.mk-bar` + `.mk-dots` + `.mk-url` (barra de navegador) · `.mk-view` (lienzo) · `.mk-nav`/`.mk-logo`/`.mk-menu`/`.mk-cta` (header) · `.mk-eyebrow`/`.mk-h`(`.ac`)/`.mk-sub` · `.mk-grid2` (hero 2-col) · `.mk-sect-h`/`.mk-sect-sub` (encabezado de sección) · `.mk-cards`/`.mk-card`/`.mk-ic`/`.mk-ct`/`.mk-bul` (grid de servicios) · `.mk-stats`/`.mk-stat` (cifras) · `.mk-chips`/`.mk-chip`(`.on`) (cobertura) · `.mk-tcards`/`.mk-tcard`/`.mk-trow`/`.mk-av`/`.mk-tn`/`.mk-tloc`/`.mk-stars`/`.mk-quote` (testimonios) · `.mk-form`/`.mk-field`/`.mk-frow`/`.mk-submit`/`.mk-trust` (cotización).

> El bloque CSS canónico (copiar/pegar y cambiar solo `--mk-indigo` + `--mk-indigo-soft`) está en `portafolio/seguridad-privada/seguridadprivadamx/index.html` y en el skill `origenlab-caso-l4`. Adaptar acento con:
> `sed -e 's/#4F46E5/#NUEVOACENTO/g' -e 's/#EEF0FF/#SOFTACENTO/g' -e 's/rgba(79,70,229/rgba(R,G,B/g'`

### Patrón de una figura de galería

```html
<figure class="ol-case-figure" style="grid-column:1/-1">  <!-- 1/-1 = ancho completo -->
  <div class="ol-case-figure-frame">
    <div class="mk">
      <div class="mk-bar"><span class="mk-dots"><i></i><i></i><i></i></span><span class="mk-url">dominio-del-cliente.com</span></div>
      <div class="mk-view"> … contenido real recreado … </div>
    </div>
  </div>
  <figcaption class="ol-case-figure-caption">01 · Home — …</figcaption>
</figure>
```

Las 6 pantallas estándar: **01 Home** (mk-grid2), **02 Servicios** (mk-cards), **03 Promesa/Cifras** (mk-stats), **04 Cobertura** (mk-chips), **05 Testimonios** (mk-tcards), **06 Cotización** (mk-trust + mk-form). Usa `grid-column:1/-1` en home/servicios/testimonios/cotización (anchas) y deja promesa/cobertura a media columna.

---

## 3. Anatomía del caso L4 (orden de secciones)

`hero` → `ol-case-shell` (sidebar + body) → `ol-cta-hero` → `ol-faq-section` → `ol-case-next` → footer.

Sidebar: `ol-side-card` "Datos del proyecto" (meta), `ol-side-card` "Stack y entregables" (tags), `nav` "Índice del caso" (`#ol-case-toc`, debe coincidir con los IDs de sección), `ol-side-cta`.

Body, secciones con `id` (el TOC y el scrollspy dependen de estos IDs):
`#contexto` (01) · `#reto` (02) · `#arquitectura` (03) · `#diseno` (04) · `#servicios` (05) · `#conversion` (06) · `#tecnologia` (07) · `#proceso` (08) · `#galeria` (09 · maquetas) · `#resultado` (10).

La **figura principal** (en `#contexto`) muestra el home: captura real (`[slug]-hero.webp`) si existe, o una maqueta `.mk` del home si no.

---

## 4. Copys: reglas de redacción

- **h1 del hero corto, directo y con keyword.** La marca va al `eyebrow`, no al h1. Ej.: eyebrow `Caso de estudio · ORIGINS Private Security` + h1 `Seguridad privada para condominios en CDMX.`
- **Humanizado y profesional.** Hablarle al decisor real (administrador, comité). Nada de relleno corporativo. Ej.: *"Cuando un comité busca seguridad, no quiere promesas: quiere saber si el personal está certificado, si cubren su zona y con quién hablar."*
- **Reglas duras del proyecto:** sin SEO como servicio, sin precios, sin plazos ("calendario por escrito"), animaciones solo en botones.

---

## 5. Interlinking recíproco (no se negocia)

Al levantar un caso, dejar TODO enlazado:

1. **Hub del sector** (`portafolio/[sector]/index.html`): card del cliente → `/portafolio/[sector]/[slug]/` con CTA "Ver caso →".
2. **Header (desktop + móvil) en TODAS las páginas live**: submenú anidado del sector con el cliente. Patrón desktop = `<li class="ol-has-subdrop"><a class="ol-dropdown-parent">…</a><div class="ol-subdrop"><ul>…<li>cliente</li></ul></div></li>`. Aplicar con `replace_all` por script (≈120 páginas).
3. **Cadena `ol-case-next`**: cada caso enlaza al anterior (← Caso anterior) y siguiente (Caso siguiente →) o "Volver al sector".
4. **`portafolio/index.html`** (root por sector): card del sector + **conteo honesto** ("N casos en operación", "N proyectos").
5. **`sitemap.xml`**: añadir la URL del caso.
6. **JSON-LD**: `BreadcrumbList` con 4 niveles + `Organization`/`SecurityService` del cliente como nodo `@id` separado.

---

## 6. Acentos por cliente (roster vivo)

| Sector | Cliente | Slug | Acento |
|--------|---------|------|--------|
| Seguridad Privada | ORIGINS Private Security | `origins` | `#2563EB` (azul) |
| Seguridad Privada | SEPRICO | `seprico` | `#0E7490` (teal) |
| Seguridad Privada | SeguridadPrivadaMX | `seguridadprivadamx` | `#4F46E5` (indigo) |
| Seguridad Privada | SeguridadEventos | `seguridadeventos` | `#7C3AED` (violeta) |
| Seguridad Privada | GUPRI | `gupri` | `#047857` (esmeralda) |

> Cada caso conserva su acento e identidad. Incendios usa rojos (ver `/_docs/34`). Elegir un acento distinto por cliente dentro del sector para que sean distinguibles.

---

## 7. Deploy

El push se hace **desde la Mac del usuario** (el sandbox no tiene identidad git ni permisos FUSE para empujar):

```bash
cd ~/Documents/Claude/Projects/ORIGENLAB
git add -A
git commit -m "…"
git push origin main
```

Si marca `index.lock`: `rm -f .git/index.lock` (cerrar VS Code / GitHub Desktop antes). Verificar en https://origenlab.com tras 1–2 min (GitHub Pages tarda en reconstruir).

---

## 8. Notas operativas aprendidas

- **El sandbox es el entorno temporal de Claude (Linux), no la Mac.** Su disco puede llenarse con la imagen base; no afecta el repo (vive en la Mac vía FUSE). Errores "Operation not permitted" suelen ser FUSE o disco lleno, no el repo.
- **Edición concurrente:** si hay otra sesión/herramienta editando el repo a la vez, aparecen duplicados (p. ej. CSS `.mk` dos veces). Coordinar para no pisarse.
- **Servir local:** `python -m http.server 8000` en la raíz del repo para previsualizar.
