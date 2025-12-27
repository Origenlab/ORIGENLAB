# Workflows de n8n para OrigenLab

## Seguridad Privada Blog Generator v3.0

**Archivo:** `seguridad-privada-blog-generator.json`

### Descripcion

Workflow automatizado para generar articulos de blog profesionales de seguridad privada, **siguiendo exactamente la guia DOCUMENTO-ARTICULO.md** de OrigenLab.

### Novedades v3.0 - Homologacion con DOCUMENTO-ARTICULO.md

- **Contenido Atemporal:** Nunca incluye fechas, anos o meses especificos
- **Estructura de 5 Secciones:** El Problema, Framework, Proveedores, Tecnico, Casos de Exito
- **Hero 2 Columnas:** Imagen destacada + Titulo/Subtitulo
- **Layout Content + Sidebar:** Siguiendo el estandar de OrigenLab
- **Tabla de Contenidos:** Generada automaticamente con anchor links
- **article-tip y article-highlight:** Cajas de contenido especial
- **5 Stylesheets:** minimal-global, style, cta-global, blog, article
- **Schema.org BlogPosting:** SEO estructurado completo
- **Codigo para blog.html:** Genera el HTML listo para agregar

### Flujo del Workflow

```
Trigger → Selector Tema/Imagenes → Prompt DOCUMENTO-ARTICULO → ChatGPT → Validacion → HTML Profesional → GitHub → Codigo blog.html
```

### Estructura del Articulo Generado (segun DOCUMENTO-ARTICULO.md)

```
┌─────────────────────────────────────────────────────┐
│  HEADER + NAV (Categorias | Blog)                   │
├─────────────────────────────────────────────────────┤
│  BREADCRUMBS: Inicio > Blog > Categoria > Titulo    │
├─────────────────────────────────────────────────────┤
│  ARTICLE HERO (2 columnas)                          │
│  ┌─────────────┐  ┌─────────────────────────────┐   │
│  │   IMAGEN    │  │ Badge Categoria             │   │
│  │  DESTACADA  │  │ H1 Titulo                   │   │
│  │             │  │ Subtitulo                   │   │
│  │             │  │ ⏱ X min lectura             │   │
│  └─────────────┘  └─────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│  LAYOUT (Content + Sidebar)                         │
│  ┌─────────────────────────┐  ┌─────────────────┐   │
│  │  TABLA DE CONTENIDOS    │  │   SIDEBAR       │   │
│  │  1. Seccion 1           │  │  Proveedores    │   │
│  │  2. Seccion 2           │  │  Newsletter     │   │
│  │  3. Seccion 3           │  │                 │   │
│  │  4. Seccion 4           │  │                 │   │
│  │  5. Seccion 5           │  │                 │   │
│  │  6. Conclusion          │  │                 │   │
│  ├─────────────────────────┤  │                 │   │
│  │  INTRODUCCION           │  │                 │   │
│  │  <p class="article-lead">│  │                 │   │
│  ├─────────────────────────┤  │                 │   │
│  │  SECCION 1: El Problema │  │                 │   │
│  │  <h2> + <h3> + <p>      │  │                 │   │
│  ├─────────────────────────┤  │                 │   │
│  │  SECCION 2: Framework   │  │                 │   │
│  │  + article-tip          │  │                 │   │
│  ├─────────────────────────┤  │                 │   │
│  │  SECCION 3: Proveedores │  │                 │   │
│  │  [IMAGEN 1]             │  │                 │   │
│  ├─────────────────────────┤  │                 │   │
│  │  SECCION 4: Tecnico     │  │                 │   │
│  │  + article-highlight    │  │                 │   │
│  │  [IMAGEN 2]             │  │                 │   │
│  ├─────────────────────────┤  │                 │   │
│  │  SECCION 5: Casos Exito │  │                 │   │
│  │  [IMAGEN 3]             │  │                 │   │
│  ├─────────────────────────┤  │                 │   │
│  │  CONCLUSION             │  │                 │   │
│  │  + CTA Inline           │  │                 │   │
│  └─────────────────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────┤
│  CTA SECTION                                        │
│  "¿Buscas servicios de seguridad privada?"          │
│  [Ver Proveedores] [Mas Articulos]                  │
├─────────────────────────────────────────────────────┤
│  FOOTER (4 columnas)                                │
└─────────────────────────────────────────────────────┘
```

### Elementos Generados Automaticamente

| Elemento | Descripcion |
|----------|-------------|
| `<p class="article-lead">` | Primer parrafo destacado |
| `<nav class="article-toc">` | Tabla de contenidos con anchors |
| `<div class="article-tip">` | Caja de consejo/checklist |
| `<div class="article-highlight">` | Caja de datos/benchmarks |
| `<div class="article-cta">` | CTA inline al final |
| `<section class="cta-section">` | CTA post-articulo |

### Regla Critica: Contenido Atemporal

El workflow NUNCA genera:
- "Guia 2025", "Tendencias 2024"
- "Precios actualizados enero 2025"
- Cualquier mencion a anos especificos

SI genera:
- "Guia Completa", "Tendencias Actuales"
- "Precios reales de mercado"
- Contenido que permanece relevante siempre

### Temas de Articulos (30)

Cada tema tiene keywords SEO asociadas:

1. Vigilancia intramuros para empresas
2. Guardias de seguridad capacitados
3. Escoltas ejecutivos: proteccion VIP
4. Monitoreo CCTV 24/7
5. Control de acceso vehicular
6. Proteccion patrimonial industrial
7. Seguridad para eventos
8. Custodia de valores
9. Sistemas de alarma empresariales
10. Seguridad perimetral
... y 20 temas mas

### Credenciales Necesarias

| Credencial | Tipo | Uso |
|------------|------|-----|
| OpenAI API | API Key | Generar contenido con GPT-4o |
| GitHub API | Personal Token | Subir articulo al repositorio |

### Salida del Workflow

El workflow genera:

1. **Archivo HTML** → Se sube a `blog/[slug].html` via GitHub
2. **Codigo para blog.html** → HTML listo para agregar como primer articulo
3. **Instrucciones** → Pasos para completar la publicacion

```json
{
  "exito": true,
  "detalles": {
    "titulo": "Vigilancia Intramuros para Empresas en CDMX",
    "urlArticulo": "https://origenlab.com.mx/blog/vigilancia-intramuros.html",
    "tiempoLectura": "12 min",
    "categoria": "Seguridad Privada"
  },
  "codigoParaBlogHTML": "<!-- HTML para agregar a blog.html -->",
  "instrucciones": [
    "1. Agregar codigo como PRIMER elemento en blog.html",
    "2. Actualizar contador de categoria en sidebar",
    "3. Agregar tags relevantes",
    "4. Verificar que aparece primero en el grid"
  ]
}
```

### Estructura de Archivos

```
origenlab/
├── blog/
│   ├── assets/
│   │   └── css/
│   │       ├── blog.css
│   │       └── article.css
│   └── [slug-articulo].html  ← Generado automaticamente
├── css/
│   ├── minimal-global.css
│   ├── style.css
│   └── cta-global.css
├── img/
│   └── seguridad-privada/
│       └── [60 imagenes .webp]
└── blog.html  ← Agregar codigo manualmente
```

### Configuracion Post-Importacion

1. **Nodo "ChatGPT - Generar Articulo"**
   - Selecciona tu credencial de OpenAI
   - Modelo: gpt-4o (recomendado)

2. **Nodo "GitHub - Subir Articulo"**
   - Cambia `YOUR_GITHUB_USERNAME` por tu usuario
   - Selecciona tu credencial de GitHub

### Costos Estimados

| Servicio | Costo por Articulo |
|----------|-------------------|
| OpenAI GPT-4o | ~$0.05-0.08 USD |
| GitHub | $0 |
| **Total** | ~$0.08 USD |

Con ejecucion cada 3 dias: ~$0.80 USD/mes

### Checklist de Publicacion (FASE 7 de DOCUMENTO-ARTICULO)

Despues de ejecutar el workflow:

- [ ] Agregar `codigoParaBlogHTML` como PRIMER articulo en blog.html
- [ ] Actualizar numeracion de articulos existentes
- [ ] Agregar/actualizar categoria "Seguridad Privada" en sidebar
- [ ] Agregar 1-2 tags relevantes en sidebar
- [ ] Verificar articulo aparece primero visualmente
- [ ] Probar todos los links (imagen, titulo, "Leer mas")
- [ ] Verificar paginacion funciona (si >6 articulos)
- [ ] Commit con mensaje profesional

### Referencia

Este workflow implementa las 7 fases de **DOCUMENTO-ARTICULO.md**:

1. Investigacion y Planificacion
2. Creacion del Archivo HTML
3. Escritura del Contenido
4. Sidebar y Elementos Secundarios
5. CTA Section y Footer
6. Validacion y Optimizacion
7. Publicacion en blog.html

---

Creado para OrigenLab - Directorio Empresarial de Mexico
Version 3.0 - Diciembre 2024
Homologado con DOCUMENTO-ARTICULO.md v2.0
