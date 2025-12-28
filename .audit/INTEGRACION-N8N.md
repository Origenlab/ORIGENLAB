# Integración n8n - OrigenLab Blog v8.1

## Visión General

Sistema de generación automática de artículos SEO profesionales para el blog de OrigenLab, especializado en el sector de seguridad privada en México.

## Cambios en v8.1 (ACTUAL)

| Aspecto | v8.0 (anterior) | v8.1 (actual) |
|---------|-----------------|---------------|
| Imágenes | GPT inventaba nombres | Solo imagen principal del sistema |
| Contenido | Incluía `<img>` inventadas | Limpieza automática de `<img>` |
| Validación | Básica | Elimina cualquier `<img>` o `<figure>` |
| Prompt | No especificaba | Prohibición explícita de imágenes |

## Cambios en v8.0

| Aspecto | v7.0 (anterior) | v8.0 |
|---------|-----------------|------|
| Contenido | ~2,000 palabras | 2,500+ palabras ejecutivo |
| Temporal | Con fechas | 100% atemporal (evergreen) |
| FAQs | Estáticas | Accordion interactivo |
| Tono | Profesional | Ejecutivo premium |
| Footer | Con año | Sin año |

## Cambios en v7.0

| Aspecto | v6.0 (anterior) | v7.0 |
|---------|-----------------|------|
| Contenido | Básico, ~500 palabras | Profesional, ~2,000+ palabras |
| SEO | Meta tags básicos | Schema.org, FAQ, Breadcrumbs |
| URLs | Con timestamps numéricos | Solo texto SEO-friendly |
| Imágenes | Genéricas | 61 imágenes organizadas por tema |
| Empresas | Datos simulados | 4 empresas reales verificadas |
| Prompt | Básico | Instrucciones SEO detalladas |

## Arquitectura del Sistema

```
┌──────────────────────────────────────────────────────────────────────┐
│                      FLUJO v7.0 - SEO PROFESIONAL                    │
└──────────────────────────────────────────────────────────────────────┘

  n8n Workflow v7.0          GitHub API                 Blog Frontend
  ┌─────────────────┐       ┌──────────────┐          ┌─────────────┐
  │ Trigger         │       │              │          │             │
  │ (cada 2 días)   │       │              │          │ blog.html   │
  │       ↓         │       │              │          │             │
  │ Seleccionar     │       │              │          │ JavaScript: │
  │ Empresa Real    │       │              │          │ fetch JSON  │
  │ (4 empresas)    │       │              │          │     ↓       │
  │       ↓         │       │              │          │ Filtrar     │
  │ Construir       │       │              │          │ n8n: true   │
  │ Prompt SEO Pro  │       │              │          │     ↓       │
  │ (2000+ palabras)│       │              │          │ Crear cards │
  │       ↓         │       │              │          │ dinámicas   │
  │ GPT-4o          │       │              │          │             │
  │ (8K tokens)     │       │              │          │             │
  │       ↓         │       │ 1. PUT       │          │             │
  │ Validar         │       │ articulo.html│          │             │
  │ Contenido       │       │              │          │             │
  │       ↓         │───────│ 2. GET       │──────────│             │
  │ Construir HTML  │       │ articulos    │          │             │
  │ SEO Completo    │       │ .json        │          │             │
  │ (Schema.org)    │       │              │          │             │
  │       ↓         │       │ 3. PUT       │          │             │
  │ Subir GitHub    │───────│ articulos    │          │             │
  │       ↓         │       │ .json        │          │             │
  │ Telegram        │       │              │          │             │
  └─────────────────┘       └──────────────┘          └─────────────┘
```

## Empresas de Seguridad Privada Disponibles

El workflow v7.0 incluye datos completos de 4 empresas verificadas:

### 1. ORIGINS Private Security
- **Slug:** `seguridad-condominios-cdmx`
- **Especialidad:** Seguridad para Condominios
- **Ubicación:** CDMX y Estado de México
- **Rating:** 4.9/5 (245 reseñas)
- **Diferenciador:** Respuesta en menos de 3 minutos
- **Certificaciones:** SSC, NOM-001, ISO 9001

### 2. SEPRICO
- **Slug:** `seguridad-condominios-seprico`
- **Especialidad:** Seguridad Especializada para Condominios
- **Ubicación:** CDMX - Polanco
- **Rating:** 4.8/5 (428 reseñas)
- **Diferenciador:** Evaluación de seguridad gratuita
- **Certificaciones:** SSC, CONOCER

### 3. Seguridad para Eventos
- **Slug:** `seguridad-eventos-profesional`
- **Especialidad:** Seguridad Integral para Eventos Masivos
- **Ubicación:** CDMX - Santa Fe
- **Rating:** 4.9/5 (615 reseñas)
- **Diferenciador:** Más de 5,000 eventos realizados
- **Certificaciones:** SSC, Protección Civil, NOM-002

### 4. SeguridadPrivadaMX
- **Slug:** `seguridad-condominios-inteligente`
- **Especialidad:** Seguridad Inteligente con Tecnología Propia
- **Ubicación:** CDMX - Benito Juárez
- **Rating:** 4.9/5 (312 reseñas)
- **Diferenciador:** App móvil y tecnología 100% propia
- **Certificaciones:** SSC, ISO 27001, CONOCER

## Imágenes Disponibles por Tema

El workflow selecciona automáticamente imágenes según la especialidad de la empresa:

### Condominios (10 imágenes)
```
img/seguridad-privada/
├── control-acceso-residencial-caseta.webp
├── guardia-caseta-entrada-residencial.webp
├── vigilante-fraccionamiento-residencial.webp
├── guardia-intramuros-residencial.webp
├── seguridad-perimetral-fraccionamiento.webp
├── patrulla-nocturna-fraccionamiento.webp
├── caseta-moderna-control-acceso.webp
├── guardia-acceso-condominio-pluma.webp
├── rondin-nocturno-residencial-casa.webp
└── vigilancia-acceso-controlado-pluma.webp
```

### Tecnología (7 imágenes)
```
img/seguridad-privada/
├── monitoreo-camaras-vigilancia-24hrs.webp
├── central-monitoreo-seguridad-remota.webp
├── operador-monitoreo-alarmas-central.webp
├── operador-videovigilancia-monitores.webp
├── centro-comando-videovigilancia-gps.webp
├── centro-monitoreo-cctv-camaras.webp
└── monitoreo-gps-rastreo-vehicular.webp
```

### Eventos (6 imágenes)
```
img/seguridad-privada/
├── seguridad-eventos-alfombra-roja.webp
├── staff-seguridad-evento-corporativo.webp
├── vigilancia-eventos-sociales-gala.webp
├── equipo-seguridad-gala-convenciones.webp
├── personal-femenino-seguridad-eventos.webp
└── seguridad-congresos-exposiciones.webp
```

### Corporativo (6 imágenes)
```
img/seguridad-privada/
├── seguridad-corporativa-lobby-recepcion.webp
├── vigilancia-entrada-edificio-corporativo.webp
├── guardia-seguridad-torre-corporativa.webp
├── guardias-seguridad-corporativa-edificio.webp
├── vigilante-edificio-oficinas.webp
└── guardias-chaleco-tactico-empresarial.webp
```

### Ejecutivo (6 imágenes)
```
img/seguridad-privada/
├── escoltas-ejecutivos-empresariales.webp
├── escolta-ejecutivo-proteccion-vip.webp
├── proteccion-ejecutivos-traslados.webp
├── guardaespaldas-proteccion-personal.webp
├── seguridad-ejecutiva-guardaespaldas.webp
└── escoltas-vehiculo-blindado-cdmx.webp
```

### Industrial (6 imágenes)
```
img/seguridad-privada/
├── seguridad-industrial-bodega-almacen.webp
├── seguridad-parque-industrial-logistica.webp
├── control-acceso-parque-industrial.webp
├── vigilancia-nave-industrial-fabrica.webp
├── equipo-seguridad-zona-carga-industrial.webp
└── seguridad-almacen-logistica-bodega.webp
```

## Estructura SEO del Artículo

### Meta Tags Requeridos
```html
<title>Título SEO (máx 60 chars) | OrigenLab</title>
<meta name="description" content="150-160 caracteres exactos">
<meta name="keywords" content="8-10 keywords relevantes">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
```

### Schema.org Incluido
1. **Article** - Para el artículo principal
2. **FAQPage** - Para preguntas frecuentes
3. **BreadcrumbList** - Para navegación
4. **LocalBusiness** - Para la empresa mencionada

### Estructura de Contenido Requerida
```html
<p class="article-lead">Introducción impactante (150-200 palabras)</p>

<section class="article-section" id="sobre-empresa">
  <h2>Sobre [Empresa]: Trayectoria y Experiencia</h2>
  <h3>Historia y Fundación</h3>
  <h3>Presencia en el Mercado Mexicano</h3>
</section>

<section class="article-section" id="servicios-seguridad">
  <h2>Servicios de Seguridad Privada</h2>
</section>

<section class="article-section" id="tecnologia-seguridad">
  <h2>Tecnología y Equipamiento</h2>
</section>

<section class="article-section" id="cobertura-zonas">
  <h2>Cobertura Geográfica en México</h2>
</section>

<section class="article-section" id="diferenciadores">
  <h2>¿Por Qué Elegir [Empresa]?</h2>
</section>

<section class="article-section" id="testimonios">
  <h2>Testimonios y Opiniones</h2>
</section>

<section class="article-section" id="como-contratar">
  <h2>Cómo Contratar los Servicios</h2>
</section>

<section class="article-section" id="preguntas-frecuentes">
  <h2>Preguntas Frecuentes</h2>
  <!-- Mínimo 5 FAQ -->
</section>

<section class="article-section" id="conclusion">
  <h2>Conclusión</h2>
</section>
```

### Elementos Especiales Requeridos
```html
<!-- Tips (2x) -->
<div class="article-tip">
  <h4>Consejo Profesional</h4>
  <p>Contenido del consejo...</p>
</div>

<!-- Highlights (2x) -->
<div class="article-highlight">
  <h4>Dato Importante</h4>
  <p>Estadística o dato clave...</p>
</div>

<!-- Testimonial (1x) -->
<blockquote class="article-quote">
  <p>"Testimonio de cliente satisfecho..."</p>
  <cite>— Nombre, Cargo/Ubicación</cite>
</blockquote>

<!-- Link interno a perfil -->
<a href="../categorias/seguridad-privada/[slug].html" class="article-link">[Nombre Empresa]</a>
```

## URLs SEO-Friendly

### Formato Anterior (incorrecto)
```
❌ /blog/podiumex-resena-1766887414597.html
❌ /blog/origins-security-caso-exito-1766889234.html
```

### Formato Nuevo (correcto)
```
✓ /blog/origins-private-security-resena-completa-seguridad.html
✓ /blog/seprico-guia-servicios-seguridad-especializada.html
✓ /blog/seguridad-eventos-caso-exito-eventos-masivos.html
✓ /blog/seguridadprivadamx-comparativa-seguridad-inteligente.html
```

## Configuración del Workflow

### 1. Importar en n8n
```bash
# Archivo: /.audit/n8n-workflows/origenlab-blog-generator-v7.json
```

### 2. Configurar Credenciales
Reemplazar los siguientes IDs:

| Placeholder | Descripción |
|-------------|-------------|
| `YOUR_OPENAI_CREDENTIAL_ID` | ID de credencial OpenAI en n8n |
| `YOUR_GITHUB_CREDENTIAL_ID` | ID de credencial GitHub en n8n |
| `YOUR_TELEGRAM_CREDENTIAL_ID` | ID de credencial Telegram en n8n |

### 3. Variables de Entorno
Configurar en n8n Settings > Variables:

| Variable | Valor |
|----------|-------|
| `GITHUB_OWNER` | Tu usuario u organización de GitHub |
| `GITHUB_REPO` | Nombre del repositorio |
| `TELEGRAM_CHAT_ID` | ID del chat para notificaciones |

### 4. Permisos GitHub
El token de GitHub necesita:
- `repo` - Acceso completo al repositorio
- `workflow` - Actualizar archivos

## Validaciones de Calidad

El workflow v7.0 incluye validaciones automáticas:

1. **Longitud mínima:** 1,500 caracteres de contenido
2. **Meta description:** 140-165 caracteres
3. **Título:** Máximo 60 caracteres
4. **Keywords:** 8-10 palabras clave
5. **Estructura:** Todas las secciones requeridas

## Notificaciones Telegram

### Éxito
```
🚀 ARTÍCULO SEO PUBLICADO

🏢 Empresa: ORIGINS Private Security
📝 Título: Reseña Completa: ORIGINS Private Security

📊 Métricas:
• Tiempo lectura: 15 min
• Contenido: 8,500 caracteres
• Total artículos: 12

🔑 Keywords: seguridad privada, CDMX, vigilancia...

🔗 Links:
• Ver Artículo
• Ver Perfil

✅ Artículo SEO profesional publicado correctamente
```

### Error
```
❌ ERROR EN GENERACIÓN

📋 Detalle: Contenido demasiado corto
🔍 Respuesta: [fragmento de respuesta]
```

## Cómo Funciona blog.html

El archivo `blog.html` carga los artículos dinámicamente:

```javascript
(async function loadDynamicArticles() {
  // Fetch con cache-busting
  const response = await fetch('blog/data/articulos.json?v=' + Date.now());
  const data = await response.json();

  // Filtrar artículos generados por n8n
  const n8nArticles = data.articulos.filter(a => a.n8n === true);

  // Crear cards y agregar al grid
  n8nArticles.forEach(article => {
    // Crear elemento de card
    // Insertar al inicio del grid
  });
})();
```

## Estructura de articulos.json

```json
{
  "version": "2.0",
  "lastUpdated": "2025-01-27T12:00:00.000Z",
  "articulos": [
    {
      "id": "origins-private-security-resena-completa-seguridad",
      "titulo": "Reseña Completa: ORIGINS Private Security",
      "slug": "origins-private-security-resena-completa-seguridad",
      "categoria": "seguridad-privada",
      "categoriaNombre": "Seguridad Privada",
      "extracto": "Análisis exhaustivo de ORIGINS Private Security...",
      "imagen": "img/seguridad-privada/control-acceso-residencial-caseta.webp",
      "tiempoLectura": 15,
      "destacado": false,
      "fecha": "2025-01-27",
      "n8n": true,
      "version": "7.0",
      "empresa": "ORIGINS Private Security",
      "empresaSlug": "seguridad-condominios-cdmx",
      "keywords": "seguridad privada, CDMX, condominios...",
      "contenidoLength": 8500
    }
  ]
}
```

## Próximos Pasos

1. **Importar workflow v7.0** en tu instancia de n8n
2. **Configurar credenciales** (OpenAI, GitHub, Telegram)
3. **Ejecutar manualmente** para probar
4. **Verificar artículo** generado en el blog
5. **Activar scheduler** para generación automática cada 2 días
