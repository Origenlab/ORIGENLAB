> Propósito: árbol canónico de `src/` para un sitio Astro 6 SSG del Master System, una línea por carpeta. Origen: PROYECTORED (estructura) + patrón de layouts A7 (Base→Page→Tipo).

# Estructura canónica de `src/`

```
src/
├── config/
│   └── site.ts              # SSoT: SITE, CONTACT, TAXONOMY, WA_MESSAGES, waUrl(), telUrl(). Canónico PROYECTORED.
├── content.config.ts        # Content Collections con Zod .strict() (productos, servicios, articulos, zonas, casos).
├── content/                 # Contenido versionado validado por content.config.ts.
│   ├── productos/            # Fichas de producto (.md). Arquetipo A.
│   ├── servicios/            # Fichas de servicio (.md). Arquetipo B/C.
│   ├── articulos/            # Blog en .mdx (regla D3: nunca .astro sueltos).
│   ├── zonas/                # Páginas de SEO local por zona (.md). Arquetipo C.
│   └── casos/                # Casos de éxito / testimonios reales (.md).
├── lib/
│   └── seo.ts               # Librería de JSON-LD: constructores por tipo (LocalBusiness/WebSite/Product/Service/Article/FAQPage/Breadcrumb) + @id linking. Canónico PODIUMEX/EVENTECH.
├── layouts/
│   ├── BaseLayout.astro      # Raíz: <head> completo, meta/OG/canonical/hreflang, JSON-LD global. (A7)
│   ├── PageLayout.astro      # Extiende Base: Header + breadcrumbs + <main> + Footer + WhatsApp flotante.
│   ├── ProductLayout.astro   # Extiende Page: ficha de producto (schema Product).
│   ├── ServiceLayout.astro   # Extiende Page: ficha de servicio (schema Service).
│   └── ArticleLayout.astro   # Extiende Page: artículo de blog (schema Article).
├── pages/                   # Rutas (kebab-case en español). index + landings L2 + [...slug] dinámicos desde colecciones.
├── components/
│   ├── global/              # TopBar, Header, Footer, WhatsAppButton (consumen site.ts).
│   ├── ui/                  # Primitivas: Breadcrumb, Img, SectionHeader, Card, Button.
│   └── sections/            # Secciones de página: Hero, FAQ, RelatedLinks, CTA (una sección = un componente).
├── data/                    # Datos tipados .ts NO repetibles como colección (config de catálogo, menús). (A5)
├── styles/
│   └── global.css           # ÚNICA fuente de design tokens (:root) + reset. CSS vanilla (C1/C2: una sola definición de tokens).
└── env.d.ts                 # Tipos de Astro/Vite.
```

## Reglas estructurales (canónicas)

- **Una sola fuente de tokens CSS** (C2): los design tokens (`:root`) viven solo en `styles/global.css`. Nunca duplicar en un `<style is:global>` de Base (anti-patrón PROYECTORED).
- **SSoT estricto** (A4): cualquier dato repetido (contacto, taxonomía, WhatsApp) se importa de `config/site.ts`. Cero hardcode en páginas.
- **Datos repetibles → Content Collection** (D1); datos de configuración no-contenido → `data/*.ts` (A5).
- **Layouts en 2 niveles + tipo** (A7): `BaseLayout` (head/SEO) → `PageLayout` (chrome) → layout por tipo (Product/Service/Article). Evitar el "God-layout" de 24 props.
- **`public/`** (fuera de `src/`): `robots.txt`, `_headers`, `_redirects` (Cloudflare), `favicons/`, `fonts/` (self-hosted, anti-CLS, C3), `images/` (rutas que valida `imagePath` en content.config.ts).
```
```

⚠️ HUECO: `lib/seo.ts` y los layouts (`BaseLayout`/`PageLayout`/tipos) los entrega otro agente del Master System (capa SEO + layouts). Este scaffold define el contrato (`site.ts` + `content.config.ts`) con el que esos archivos interoperan; las rutas listadas aquí son el destino esperado.
