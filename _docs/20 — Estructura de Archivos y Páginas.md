# Estructura de Archivos y Páginas

---

## Árbol de Páginas

```
ORIGENLAB/
│
├── index.html                          ← L1 ✅ Página principal (Home)
├── cotizar.html                        ← Cotizador (alias de cotizar/index.html)
├── favicon.svg
│
├── img/
│   └── origenlab.webp                  ← Logo (se usa con filter invert para fondo oscuro)
│
├── _astro/                             ← CSS compilado por Astro
│   ├── premium-dark.css                ← ⭐ Sistema de diseño principal (2093 líneas)
│   ├── BaseLayout.xeR8R953.css         ← Layout base de Astro
│   ├── index@_@astro.BX4RFBkr.css     ← CSS del index compilado
│   └── index@_@astro.DWosM7FM.css     ← CSS de secciones específicas
│
├── servicios/
│   ├── index.html                      ← L2 ✅ Hub de servicios (HOMOLOGADO)
│   ├── desarrollo-web/index.html       ← L3 🔜 Pendiente
│   ├── tiendas-en-linea/index.html     ← L3 🔜 Pendiente
│   ├── landing-pages/index.html        ← L3 🔜 Pendiente
│   └── rediseno-web/index.html         ← L3 🔜 Pendiente
│
├── portafolio/
│   └── index.html                      ← L2 🔜 Pendiente
│
├── nosotros/
│   └── index.html                      ← L2 🔜 Pendiente
│
├── contacto/
│   └── index.html                      ← L2 🔜 Pendiente
│
├── cotizar/
│   └── index.html                      ← L2 🔜 Pendiente
│
├── blog/
│   ├── index.html                      ← L2 🔜 Pendiente
│   ├── velocidad-de-carga-importancia.html
│   ├── que-es-seo-local.html           ← ⚠️ Menciona SEO — revisar
│   └── cuanto-cuesta-pagina-web-mexico.html
│
├── directorio/
│   └── index.html
│
└── _docs/                              ← Esta carpeta de documentación
    ├── 00 — ÍNDICE.md
    └── ...
```

---

## Arquitectura CSS

### Jerarquía de carga (en el `<head>`)

```html
1. BaseLayout.xeR8R953.css     ← Reset y estilos base de Astro
2. index@_@astro.BX4RFBkr.css ← Estilos de componentes Astro
3. premium-dark.css             ← ⭐ Override completo — siempre el último
4. <style> inline               ← Estilos de sección específicos (ej. FAQ)
```

El `premium-dark.css` sobreescribe todo lo anterior con `!important` donde es necesario.

---

## Componentes Astro (ocultos con CSS)

Estos componentes existen en el HTML pero están ocultos porque fueron reemplazados por versiones `ol-*`:

| Componente oculto | Reemplazado por |
|-------------------|----------------|
| `.header[data-astro-cid-3ef6ksr2]` | `ol-header` |
| `.topbar[data-astro-cid-axxsutmj]` | `ol-topbar` |
| `.footer[data-astro-cid-sz7xmlte]` | `ol-footer` |
| `.cta-bar[data-astro-cid-j7pv25f6]` | `ol-cta-bar` |
| `.services-section[data-astro-cid-j7pv25f6]` | `ol-services` |
| `.cta-final[data-astro-cid-frbqrhml]` | `ol-cta-final` |

---

## Stack Tecnológico

| Herramienta | Versión | Rol |
|-------------|---------|-----|
| Astro | v6.0.2 | Framework base |
| Inter (Google Fonts) | — | Tipografía |
| TruConversion | — | Heatmaps y grabaciones |
| Cloudflare | — | CDN y protección de email |

---

## Dominio y Datos de Contacto

| Campo | Valor |
|-------|-------|
| Dominio | origenlab.com |
| Email | hola@origenlab.com |
| Teléfono | +55 4786 8402 |
| WhatsApp | wa.me/5547868402 |
| Ubicación | Ciudad de México, MX |

---

## Convenciones de Nombres de Clases

Todos los componentes personalizados usan el prefijo `ol-`:

```
ol-[componente]               ← Wrapper del componente
ol-[componente]-[elemento]    ← Elemento hijo
ol-[modificador]              ← Variante o estado
```

Ejemplos: `ol-header`, `ol-header-cta`, `ol-eyebrow`, `ol-tc`, `ol-tc-footer`, `ol-qn-cta`.
