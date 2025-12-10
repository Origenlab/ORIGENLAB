# DOCUMENTO-ARTICULO.md
## Guía Completa para Crear y Publicar Artículos Profesionales - OrigenLab v2.0

**📚 DOCUMENTO UNIFICADO** - Esta es la **ÚNICA guía necesaria** para:
1. ✅ Generar artículos profesionales desde cero
2. ✅ Publicar correctamente en blog.html
3. ✅ Verificar calidad y SEO
4. ✅ Garantizar contenido atemporal

**Versión:** 2.0
**Última actualización:** 2025-01-23
**Propósito:** Guía paso a paso completa que cubre desde la planificación inicial hasta el monitoreo post-publicación de artículos para el blog de OrigenLab.

**📖 NOTA IMPORTANTE:**
- ⚠️ Este documento reemplaza y unifica GUIA-AGREGAR-ARTICULO-AL-BLOG.md
- ⚠️ NO necesitas consultar ningún otro documento
- ⚠️ Sigue las 7 FASES en orden secuencial
- ⚠️ Cada fase incluye checklists de validación

---

## ÍNDICE

1. [Visión General](#visión-general)
2. [Estructura HTML Completa](#estructura-html-completa)
3. [SEO y Meta Tags](#seo-y-meta-tags)
4. [Arquitectura del Contenido](#arquitectura-del-contenido)
5. [Elementos de Diseño](#elementos-de-diseño)
6. [Marketing y Conversión](#marketing-y-conversión)
7. [Checklist de Validación](#checklist-de-validación)
8. [Proceso Paso a Paso](#proceso-paso-a-paso)

---

## VISIÓN GENERAL

### Filosofía del Artículo
Los artículos de OrigenLab NO son posts de blog tradicionales. Son **activos de marketing B2B** que:
- Generan autoridad en la industria
- Convierten lectores en leads calificados
- Enlazan naturalmente con proveedores verificados
- Están optimizados para SEO y conversión simultáneamente

### Referencia Canónica
Archivo de referencia: `/blog/guia-eventos-corporativos.html`
Este es el estándar de oro que DEBE replicarse exactamente en estructura, estilos y arquitectura.

### ⚠️ REGLA CRÍTICA: CONTENIDO ATEMPORAL

**NUNCA incluyas fechas específicas en los artículos**. Los artículos deben ser **completamente atemporales** para mantener relevancia a largo plazo.

**❌ EVITAR:**
- "Las mejores empresas en 2025"
- "Tendencias para 2024"
- "Precios actualizados enero 2025"
- "Guía 2025 de..."
- Cualquier mención a año específico en títulos, subtítulos o contenido

**✅ CORRECTO:**
- "Las mejores empresas para..."
- "Tendencias actuales en..."
- "Precios reales de mercado"
- "Guía completa de..."
- Contenido que permanece relevante sin importar el año

**EXCEPCIÓN ÚNICA:** El copyright del footer puede mantener el año actual (`© 2025 OrigenLab`), ya que se actualiza automáticamente.

**Por qué es crítico:**
1. **SEO a largo plazo:** Google penaliza contenido desactualizado
2. **Mantenimiento:** No necesitas actualizar fechas constantemente
3. **Credibilidad:** Un artículo "2023" en 2025 pierde autoridad
4. **ROI:** El contenido atemporal genera tráfico durante años

---

## ESTRUCTURA HTML COMPLETA

### 1. HEAD SECTION - Meta Tags y SEO

```html
<!DOCTYPE html>
<html lang="es-MX">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta Tags -->
  <title>[TÍTULO OPTIMIZADO CON PALABRAS CLAVE] | OrigenLab</title>
  <meta name="description" content="[DESCRIPCIÓN DE 150-160 CARACTERES CON PROPUESTA DE VALOR CLARA Y KEYWORDS]">
  <meta name="keywords" content="[5-8 KEYWORDS SEPARADAS POR COMAS, INCLUIR MÉXICO/CDMX]">
  <meta name="author" content="OrigenLab">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://origenlab.com/blog/[SLUG-DEL-ARTICULO].html">
  <meta property="og:title" content="[TÍTULO PARA REDES SOCIALES - PUEDE SER MÁS CORTO]">
  <meta property="og:description" content="[DESCRIPCIÓN PARA REDES SOCIALES CON HOOK FUERTE]">
  <meta property="og:image" content="https://origenlab.com/img/[CATEGORIA]/[IMAGEN-DESTACADA].webp">
  <meta property="og:locale" content="es_MX">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://origenlab.com/blog/[SLUG-DEL-ARTICULO].html">
  <meta name="twitter:title" content="[TÍTULO PARA TWITTER]">
  <meta name="twitter:description" content="[DESCRIPCIÓN PARA TWITTER]">
  <meta name="twitter:image" content="https://origenlab.com/img/[CATEGORIA]/[IMAGEN-DESTACADA].webp">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://origenlab.com/blog/[SLUG-DEL-ARTICULO].html">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Stylesheets - ORDEN CRÍTICO -->
  <link rel="stylesheet" href="../css/minimal-global.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/cta-global.css">
  <link rel="stylesheet" href="assets/css/blog.css">
  <link rel="stylesheet" href="assets/css/article.css">

  <!-- Schema.org Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "[TÍTULO COMPLETO DEL ARTÍCULO]",
    "description": "[DESCRIPCIÓN DETALLADA 200-250 CARACTERES]",
    "image": "https://origenlab.com/img/[CATEGORIA]/[IMAGEN-DESTACADA].webp",
    "author": {
      "@type": "Organization",
      "name": "OrigenLab"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OrigenLab",
      "logo": {
        "@type": "ImageObject",
        "url": "https://origenlab.com/img/origenlab.webp"
      }
    },
    "inLanguage": "es-MX",
    "articleSection": "[CATEGORÍA DEL ARTÍCULO]",
    "keywords": "[KEYWORDS SEPARADAS POR COMAS]",
    "mentions": [
      {
        "@type": "LocalBusiness",
        "name": "[NOMBRE EMPRESA 1]",
        "url": "https://origenlab.com/categorias/[categoria]/[empresa-1].html"
      },
      {
        "@type": "LocalBusiness",
        "name": "[NOMBRE EMPRESA 2]",
        "url": "https://origenlab.com/categorias/[categoria]/[empresa-2].html"
      }
    ]
  }
  </script>
</head>
```

### 2. HEADER Y NAVEGACIÓN

```html
<body>

  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="nav-wrapper">
        <a href="../index.html" class="logo">
          <img src="../img/origenlab.webp" alt="OrigenLab" width="180" height="40">
        </a>
        <nav>
          <a href="../categorias/categorias.html" class="nav-link">Categorías</a>
          <a href="../blog.html" class="nav-link active">Blog</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Breadcrumbs -->
  <div class="breadcrumbs-wrapper">
    <div class="container">
      <nav aria-label="Breadcrumb" class="breadcrumbs">
        <ol>
          <li><a href="../index.html">Inicio</a></li>
          <li><a href="../blog.html">Blog</a></li>
          <li><a href="../categorias/[categoria].html">[Categoría]</a></li>
          <li aria-current="page">[Título Corto del Artículo]</li>
        </ol>
      </nav>
    </div>
  </div>
```

### 3. ARTICLE HERO - Diseño de 2 Columnas

```html
  <!-- Article Hero -->
  <article class="article-container">
    <div class="container" style="max-width: 1400px; padding: var(--space-xl) var(--space-md);">

      <!-- Article Header - 2 Column Hero -->
      <header class="article-header">
        <!-- Left Column: Featured Image -->
        <div class="article-header-image">
          <figure class="article-featured-image">
            <img src="../img/[categoria]/[imagen-destacada].webp" alt="[ALT TEXT DESCRIPTIVO CON KEYWORDS]" loading="lazy">
          </figure>
        </div>

        <!-- Right Column: Title + Intro -->
        <div class="article-header-content">
          <div class="article-category-badge">
            <a href="../categorias/[categoria].html">[Categoría]</a>
          </div>
          <h1 class="article-title">[TÍTULO PRINCIPAL DEL ARTÍCULO]</h1>
          <p class="article-subtitle">
            [SUBTÍTULO DE 2-3 LÍNEAS QUE VENDE EL VALOR DEL ARTÍCULO. DEBE INCLUIR NÚMEROS/DATOS ESPECÍFICOS Y PROPUESTA DE VALOR CLARA. EJEMPLO: "Casos documentados con ROI superior a 400%, frameworks probados en +200 eventos, y los proveedores profesionales en CDMX que hacen posible experiencias de clase mundial."]
          </p>
          <div class="article-meta-info">
            <span class="article-reading-time">⏱ [X] min lectura</span>
          </div>
        </div>
      </header>
```

### 4. LAYOUT DE CONTENIDO + SIDEBAR

```html
      <!-- Article Layout: Content + Sidebar -->
      <div class="article-layout">

        <!-- Main Content -->
        <div class="article-content">

          <!-- Introducción -->
          <section class="article-section">
            <p class="article-lead">
              [PRIMER PÁRRAFO CON HOOK FUERTE. DEBE INCLUIR: HISTORIA/ANÉCDOTA CONCRETA, MENCIÓN DE EMPRESA VERIFICADA CON LINK, PROBLEMA ESPECÍFICO. MÍNIMO 4-5 LÍNEAS.]
            </p>
            <p>
              [SEGUNDO PÁRRAFO: AMPLIFICA EL PROBLEMA. DATOS, ESTADÍSTICAS, CONTEXTO DE LA INDUSTRIA EN MÉXICO.]
            </p>
            <p>
              [TERCER PÁRRAFO: TRANSICIÓN A LA SOLUCIÓN. INTRODUCE EL FRAMEWORK/METODOLOGÍA QUE PRESENTARÁS.]
            </p>
          </section>

          <!-- Tabla de Contenidos -->
          <nav class="article-toc">
            <h2>Contenido del artículo</h2>
            <ol>
              <li><a href="#seccion-1">[Título Sección 1 - Debe ser pregunta o promesa específica]</a></li>
              <li><a href="#seccion-2">[Título Sección 2]</a></li>
              <li><a href="#seccion-3">[Título Sección 3]</a></li>
              <li><a href="#seccion-4">[Título Sección 4]</a></li>
              <li><a href="#seccion-5">[Título Sección 5 - Idealmente "Casos de éxito"]</a></li>
            </ol>
          </nav>

          <!-- SECCIONES DEL ARTÍCULO -->
          <!-- Repetir esta estructura para cada sección principal -->

          <section class="article-section" id="seccion-1">
            <h2>[TÍTULO DE LA SECCIÓN - H2]</h2>

            <p>
              [PÁRRAFO INTRODUCTORIO DE LA SECCIÓN. ESTABLECE EL PROBLEMA O CONTEXTO.]
            </p>

            <p>
              [PÁRRAFO CON EJEMPLO ESPECÍFICO, CASO REAL, O ANÉCDOTA CONCRETA.]
            </p>

            <h3>[SUBTÍTULO DE LA SECCIÓN - H3]</h3>

            <p>
              [CONTENIDO DEL SUBSECCIÓN. INCLUYE ENLACES A EMPRESAS VERIFICADAS DONDE SEA NATURAL.]
            </p>

            <!-- BOX DE TIP O HIGHLIGHT (usar estratégicamente 1-2 por artículo) -->
            <div class="article-tip">
              <h4>[Título del Tip]</h4>
              <p>[Consejo accionable específico. Debe ser framework, checklist, o regla práctica que el lector pueda aplicar inmediatamente.]</p>
            </div>

            <!-- O USAR HIGHLIGHT PARA INFORMACIÓN CRÍTICA -->
            <div class="article-highlight">
              <h4>[Título del Highlight]</h4>
              <p>[Información crítica, benchmark, o datos clave. Formato de lista o párrafo estructurado.]</p>
            </div>
          </section>

          <!-- SECCIÓN FINAL: CONCLUSIÓN -->
          <section class="article-section">
            <h2>[Título de Conclusión - Debe invitar a acción]</h2>

            <p>
              [RESUMEN DE PUNTOS CLAVE DEL ARTÍCULO]
            </p>

            <p>
              [CONTRASTE: QUÉ PASA SI NO APLICAS ESTO VS QUÉ PASA SI LO APLICAS]
            </p>

            <p>
              [CALL TO ACTION SUAVE: INVITA A EXPLORAR PROVEEDORES CON LINK A CATEGORÍA]
            </p>

            <p>
              [CIERRE MOTIVACIONAL]
            </p>
          </section>

          <!-- CTA EN EL ARTÍCULO -->
          <div class="article-cta">
            <h3>[Pregunta CTA que resuene con el tema del artículo]</h3>
            <p>[Descripción breve de qué encontrarán en la página de categoría]</p>
            <a href="../categorias/[categoria].html" class="btn-primary">Ver Proveedores Verificados de [Categoría]</a>
          </div>

        </div>

        <!-- Sidebar -->
        <aside class="article-sidebar">

          <!-- Artículos Relacionados -->
          <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">Artículos Relacionados</h3>

            <!-- Repetir 3 veces -->
            <a href="[slug-articulo-relacionado].html" class="related-article">
              <div class="related-article-image">
                <img src="../img/[categoria]/[imagen].webp" alt="[ALT]" loading="lazy">
              </div>
              <div class="related-article-content">
                <h4>[Título del Artículo Relacionado]</h4>
                <span class="related-article-time">[X] min</span>
              </div>
            </a>

          </div>

          <!-- Empresas Destacadas -->
          <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">Proveedores Verificados</h3>

            <!-- Incluir 3 empresas verificadas relacionadas con el tema -->
            <a href="../categorias/[categoria]/[empresa-1].html" class="empresa-relacionada">
              <div class="empresa-relacionada-nombre">[Nombre Empresa]</div>
              <div class="empresa-relacionada-desc">⭐ [Rating] • [Descripción corta] - CDMX</div>
            </a>

            <a href="../categorias/[categoria]/[empresa-2].html" class="empresa-relacionada">
              <div class="empresa-relacionada-nombre">[Nombre Empresa]</div>
              <div class="empresa-relacionada-desc">⭐ [Rating] • [Descripción corta] - CDMX</div>
            </a>

            <a href="../categorias/[categoria]/[empresa-3].html" class="empresa-relacionada">
              <div class="empresa-relacionada-nombre">[Nombre Empresa]</div>
              <div class="empresa-relacionada-desc">[Descripción corta]</div>
            </a>

          </div>

          <!-- Newsletter -->
          <div class="sidebar-widget sidebar-newsletter">
            <h3 class="sidebar-widget-title">Newsletter</h3>
            <p class="newsletter-description">Recibe las mejores guías de [temática] cada semana</p>
            <form class="newsletter-form">
              <input type="email" placeholder="tu@email.com" class="newsletter-input" required>
              <button type="submit" class="newsletter-btn">Suscribirme</button>
            </form>
            <p class="newsletter-privacy">Sin spam. Cancela cuando quieras.</p>
          </div>

        </aside>

      </div>

    </div>
  </article>
```

### 5. CTA SECTION POST-ARTÍCULO

```html
  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container" style="max-width: 800px;">
      <h2>[Pregunta CTA relacionada con el tema]</h2>
      <p>[Propuesta de valor del directorio]</p>
      <div class="cta-botones">
        <a href="../categorias/[categoria].html" class="btn-primary">Ver Proveedores de [Categoría]</a>
        <a href="../blog.html" class="btn-secondary">Más Artículos</a>
      </div>
    </div>
  </section>
```

### 6. FOOTER (Estructura Estándar)

```html
  <!-- Footer -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-main">
        <div class="footer-column footer-brand">
          <div class="footer-logo">
            <a href="../index.html">
              <img src="../img/origenlab.webp" alt="OrigenLab" width="160" height="36" style="object-fit: contain; filter: brightness(0) invert(1);">
            </a>
          </div>
          <p class="footer-tagline">Donde los Negocios Mexicanos se Conectan</p>
          <div class="footer-social">
            <a href="https://linkedin.com/company/origenlab" target="_blank" rel="noopener" aria-label="Síguenos en LinkedIn" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com/origenlab_mx" target="_blank" rel="noopener" aria-label="Síguenos en Twitter" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="https://facebook.com/origenlab" target="_blank" rel="noopener" aria-label="Síguenos en Facebook" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Categorías</h3>
          <ul class="footer-links">
            <li><a href="../categorias/eventos.html">Eventos</a></li>
            <li><a href="../categorias/fiestas-infantiles.html">Fiestas Infantiles</a></li>
            <li><a href="../index.html#companies-section">Manufactura</a></li>
            <li><a href="../index.html#companies-section">Tecnología</a></li>
            <li><a href="../categorias/categorias.html">Ver todas</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Empresa</h3>
          <ul class="footer-links">
            <li><a href="../index.html#por-que-origenlab">Acerca de OrigenLab</a></li>
            <li><a href="../index.html#registrar-empresa">Contacto</a></li>
            <li><a href="../blog.html">Blog</a></li>
            <li><a href="../index.html#recursos">Trabaja con Nosotros</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Para Empresas</h3>
          <ul class="footer-links">
            <li><a href="../index.html#registrar-empresa">Registrar Empresa</a></li>
            <li><a href="../index.html#planes-premium">Planes Premium</a></li>
            <li><a href="../index.html#recursos">Soluciones B2B</a></li>
            <li><a href="../index.html#recursos">API Empresarial</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Legal</h3>
          <ul class="footer-links">
            <li><a href="../index.html#recursos">Aviso de Privacidad</a></li>
            <li><a href="../index.html#recursos">Términos y Condiciones</a></li>
            <li><a href="../index.html#recursos">Política de Cookies</a></li>
            <li><a href="../index.html#recursos">Cumplimiento</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; 2025 OrigenLab. Todos los derechos reservados. Hecho con <span class="heart">♥</span> en México.
        </p>
        <div class="footer-certifications">
          <span class="footer-cert">🔒 SSL Seguro</span>
          <span class="footer-cert">✓ Datos Verificados SAT</span>
          <span class="footer-cert">🇲🇽 100% Mexicano</span>
        </div>
      </div>
    </div>
  </footer>

</body>

</html>
```

---

## SEO Y META TAGS

### Fórmulas de Títulos Optimizados

**Estructura de Título Ganadora:**
```
[BENEFICIO ESPECÍFICO] + [RESULTADO MEDIBLE] + [LOCALIZACIÓN] | OrigenLab

Ejemplos:
✅ "Cómo Organizar Eventos Corporativos que Generen ROI Real en México | OrigenLab"
✅ "Guía Completa de Iluminación LED para Bodas en CDMX | OrigenLab"
✅ "7 Errores Fatales al Rentar Audio Profesional en Ciudad de México | OrigenLab"

⚠️ RECORDATORIO: NO incluir años (2024, 2025, etc.) en títulos - mantener contenido atemporal
```

### Meta Description Perfecta

**Estructura (150-160 caracteres):**
```
[HOOK CON NÚMERO/DATO] + [BENEFICIO] + [CALL TO ACTION IMPLÍCITO]

Ejemplos:
✅ "Casos reales con ROI +400%. Estrategias comprobadas, proveedores verificados y frameworks para eventos B2B exitosos en CDMX"
✅ "12 sistemas de iluminación LED comparados. Descubre cuál maximiza el impacto visual de tu boda con presupuesto optimizado"
```

### Keywords Strategy

**Tipos de Keywords a Incluir:**

1. **Primary Keyword** (1x en título, 3-5x en contenido)
   - Ejemplo: "eventos corporativos México"

2. **Secondary Keywords** (2-3x cada una)
   - Ejemplo: "proveedores eventos CDMX", "organización eventos B2B"

3. **Long-tail Keywords** (1-2x cada una)
   - Ejemplo: "cómo organizar evento corporativo exitoso CDMX"

4. **Localización** (SIEMPRE incluir)
   - México, CDMX, Ciudad de México, [zonas específicas: Polanco, Santa Fe, etc.]

5. **Empresas Mencionadas** (para SEO interno)
   - Nombres de empresas verificadas enlazadas 2-3 veces

---

## ARQUITECTURA DEL CONTENIDO

### Estructura de 5 Secciones

**SECCIÓN 1: El Problema (H2)**
- Identifica el error #1 que comete la audiencia
- Usa anécdota concreta con empresa verificada
- Establece el costo del problema (dinero, tiempo, reputación)
- Longitud: 4-6 párrafos

**SECCIÓN 2: Framework/Metodología (H2)**
- Presenta TU sistema para resolver el problema
- Incluye subsecciones (H3) con pasos específicos
- Usa 1 box de tip/highlight con checklist
- Longitud: 5-8 párrafos

**SECCIÓN 3: Proveedores/Herramientas (H2)**
- Cómo identificar buenos proveedores
- Menciona 3-4 empresas verificadas con links
- Incluye criterios de selección específicos
- Longitud: 4-6 párrafos

**SECCIÓN 4: Aspectos Técnicos (H2)**
- Detalles técnicos que importan
- Benchmarks, números, especificaciones
- Usa 1 box de highlight con datos clave
- Longitud: 4-7 párrafos

**SECCIÓN 5: Casos de Éxito (H2)**
- 2-3 casos reales con números específicos
- Estructura: Situación → Estrategia → Resultado
- Incluye ROI o métricas medibles
- Longitud: 3-4 párrafos por caso

### Longitud Ideal del Artículo

- **Mínimo:** 2,500 palabras (~10-12 min lectura)
- **Óptimo:** 3,000-4,000 palabras (~12-15 min lectura)
- **Máximo:** 5,000 palabras (~18-20 min lectura)

### Densidad de Enlaces

- **Enlaces Internos a Empresas:** 6-10 por artículo
- **Enlaces Internos a Categorías:** 3-4 por artículo
- **Enlaces Internos a Otros Artículos:** 2-3 por artículo
- **Enlaces Externos:** 0-2 (solo si aportan valor excepcional)

---

## ELEMENTOS DE DISEÑO

### Componentes Visuales Obligatorios

#### 1. article-lead (Primer Párrafo Destacado)
```html
<p class="article-lead">
  [HOOK VISUAL: Primer párrafo con tipografía más grande, color destacado]
</p>
```

#### 2. article-tip (Caja de Consejo)
```html
<div class="article-tip">
  <h4>[Título del Tip]</h4>
  <p>[Consejo accionable]</p>
</div>
```
**Cuándo usar:** Framework, regla práctica, checklist rápido

#### 3. article-highlight (Caja de Información Crítica)
```html
<div class="article-highlight">
  <h4>[Título del Highlight]</h4>
  <p>[Benchmark, datos, especificaciones técnicas]</p>
</div>
```
**Cuándo usar:** Datos numéricos, benchmarks, información técnica crítica

#### 4. article-toc (Tabla de Contenidos)
```html
<nav class="article-toc">
  <h2>Contenido del artículo</h2>
  <ol>
    <li><a href="#seccion-1">[Título]</a></li>
    <!-- 4-6 secciones -->
  </ol>
</nav>
```
**Ubicación:** Después de la introducción, antes de la Sección 1

#### 5. article-cta (Call to Action Inline)
```html
<div class="article-cta">
  <h3>[Pregunta CTA]</h3>
  <p>[Descripción]</p>
  <a href="../categorias/[categoria].html" class="btn-primary">Ver Proveedores Verificados</a>
</div>
```
**Ubicación:** Al final del contenido, antes del sidebar

### Jerarquía de Headings

```
H1: Título Principal del Artículo (1x - en article-header-content)
H2: Secciones Principales (5-6x - cada sección del artículo)
H3: Subsecciones (2-4x por sección - temas dentro de secciones)
H4: Títulos de Boxes (en article-tip y article-highlight)
```

**REGLA DE ORO:** NUNCA saltar niveles (H2 → H4). Siempre H2 → H3 → H4.

---

## MARKETING Y CONVERSIÓN

### Estrategia de Enlaces a Empresas

**Integración Natural (NO spam):**

✅ **CORRECTO:**
```
"Cuando trabajé con [Redeil](link), una de las empresas líderes en iluminación LED..."
"Empresas como [Podiumex](link) ofrecen podiums con integración LED que..."
"Por ejemplo, [Redeil](link) tiene bodega propia con más de 200 cabezas móviles..."
```

❌ **INCORRECTO:**
```
"Para iluminación LED visita [Redeil](link)" ← Demasiado directo
"Los mejores proveedores son [Empresa1](link), [Empresa2](link), [Empresa3](link)" ← Spam de links
```

**Regla del Contexto:** Cada mención debe aportar información específica sobre la empresa (qué ofrece, qué hace especial, caso de uso concreto).

### Puntos de Conversión Estratégicos

**1. CTA Inline (Después de la Sección 3)**
```html
<div class="article-cta">
  <h3>¿[Pregunta relacionada con el problema que acabas de explicar]?</h3>
  <p>Encuentra [beneficio específico] en nuestro directorio de proveedores verificados</p>
  <a href="../categorias/[categoria].html" class="btn-primary">Ver Proveedores de [Categoría]</a>
</div>
```

**2. Sidebar - Proveedores Verificados**
- Siempre visible mientras scroll
- 3 empresas relacionadas con el tema
- Rating + descripción ultra-corta

**3. CTA Section Post-Artículo**
- Última oportunidad de conversión
- 2 botones: Ver Proveedores (primario) + Más Artículos (secundario)

**4. Newsletter Signup (Sidebar)**
- Captura emails para nurturing
- Promesa específica: "Recibe guías de [tema] cada semana"

### Hooks de Copywriting

**Inicio de Secciones H2 (primeras 2-3 líneas):**

✅ **Patrones que funcionan:**
```
"Déjame adivinar: [situación común que resuena]..."
"Aquí va una verdad incómoda: [statement controversial]..."
"La semana pasada, [anécdota específica]..."
"El [X]% de las empresas cometen este error: [error específico]..."
```

**Transiciones Entre Secciones:**

✅ **Conectores efectivos:**
```
"Pero aquí está el problema real..."
"Ahora, esto es donde se pone interesante..."
"La transformación llegó cuando..."
"Resultado: [número impactante]..."
```

---

## CHECKLIST DE VALIDACIÓN

### ✅ CONTENIDO ATEMPORAL (5 puntos) - ⚠️ CRÍTICO

- [ ] **Título NO contiene fechas** (2024, 2025, etc.)
- [ ] **Meta tags NO contienen años específicos** (og:title, twitter:title, Schema.org headline)
- [ ] **H1 del artículo es atemporal** (sin "2025", "en 2024", etc.)
- [ ] **Contenido NO menciona "precios actualizados [mes] [año]"** - usar "precios reales de mercado"
- [ ] **Todos los H2/H3 son atemporales** - verificar subtítulos

### ✅ SEO (10 puntos)

- [ ] Título optimizado con keyword primaria y localización
- [ ] Meta description de 150-160 caracteres con hook y CTA
- [ ] Keywords en meta tags (5-8 keywords)
- [ ] Canonical URL correcta
- [ ] Open Graph tags completos (title, description, image, URL)
- [ ] Twitter Card tags completos
- [ ] Schema.org BlogPosting con mentions de empresas
- [ ] Alt text en imagen destacada con keywords
- [ ] Breadcrumbs estructurados con categoría
- [ ] H1 único y match con title tag

### ✅ Estructura HTML (12 puntos)

- [ ] DOCTYPE y lang="es-MX" correctos
- [ ] 5 Stylesheets en orden correcto (minimal-global, style, cta-global, blog, article)
- [ ] Header con navegación (Categorías + Blog activo)
- [ ] Breadcrumbs con 4 niveles (Inicio → Blog → Categoría → Artículo)
- [ ] Article header con diseño 2 columnas (imagen + contenido)
- [ ] Article layout con content + sidebar
- [ ] Tabla de contenidos con 5-6 secciones
- [ ] Secciones con IDs para anchor links
- [ ] article-cta inline al final del contenido
- [ ] CTA section post-artículo con 2 botones
- [ ] Footer completo con 6 columnas
- [ ] Todos los enlaces relativos correctos (../)

### ✅ Contenido (15 puntos)

- [ ] Introducción con hook fuerte (anécdota/problema concreto)
- [ ] Mención de empresa verificada en primeros 2 párrafos
- [ ] Longitud 2,500-4,000 palabras (10-15 min lectura)
- [ ] 5 secciones principales con H2
- [ ] Cada sección tiene 4-6 párrafos mínimo
- [ ] 2-4 subsecciones H3 distribuidas en el artículo
- [ ] 1-2 cajas de article-tip con frameworks/checklists
- [ ] 1-2 cajas de article-highlight con datos/benchmarks
- [ ] Casos de éxito con números específicos (ROI, resultados medibles)
- [ ] 6-10 enlaces a empresas verificadas integrados naturalmente
- [ ] 3-4 enlaces a categorías
- [ ] Conclusión con resumen + CTA suave
- [ ] Tono conversacional pero profesional (tú/usted según contexto)
- [ ] Datos específicos de México/CDMX (no genéricos)
- [ ] Sin ortografía/gramática errors

### ✅ Conversión y Marketing (8 puntos)

- [ ] article-cta inline con pregunta relevante
- [ ] Sidebar con 3 empresas verificadas relacionadas
- [ ] Sidebar con 3 artículos relacionados
- [ ] Sidebar con newsletter signup
- [ ] CTA section con 2 botones (primario + secundario)
- [ ] Menciones de empresas aportan contexto/valor específico
- [ ] CTAs usan verbos de acción ("Ver", "Descubre", "Encuentra")
- [ ] Promesas de valor específicas (no "más información")

### ✅ Diseño y UX (5 puntos)

- [ ] Imagen destacada de alta calidad (webp, optimizada)
- [ ] Badge de categoría en header del artículo
- [ ] Reading time visible (⏱ X min lectura)
- [ ] Jerarquía visual clara (H2 → H3 → H4)
- [ ] Espaciado y respirabilidad entre secciones

---

## PROCESO PASO A PASO

### FASE 1: INVESTIGACIÓN Y PLANIFICACIÓN (30 min)

**1.1 Define el Tema y Keywords**
```
- Tema principal: [Qué problema resuelves]
- Keyword primaria: [1 keyword]
- Keywords secundarias: [3-4 keywords]
- Localización: [México/CDMX/zona específica]
- Categoría OrigenLab: [eventos/fiestas-infantiles/etc]
```

**1.2 Identifica Empresas a Mencionar**
```
- Empresa 1: [Nombre] - [Qué hace único]
- Empresa 2: [Nombre] - [Qué hace único]
- Empresa 3: [Nombre] - [Qué hace único]
- URLs: [Verificar que existen perfiles en /categorias/]
```

**1.3 Outline de 5 Secciones**
```
Introducción: [Hook/problema]

Sección 1 (H2): [Título - El Error #1]
  - Subsección (H3): [Subtema]
  - Subsección (H3): [Subtema]

Sección 2 (H2): [Título - Framework/Metodología]
  - Subsección (H3): [Paso 1]
  - Subsección (H3): [Paso 2]
  - [article-tip con checklist]

Sección 3 (H2): [Título - Proveedores/Selección]
  - Subsección (H3): [Criterios]
  - [Menciones de 3 empresas con links]

Sección 4 (H2): [Título - Aspectos Técnicos]
  - Subsección (H3): [Aspecto técnico 1]
  - Subsección (H3): [Aspecto técnico 2]
  - [article-highlight con datos]

Sección 5 (H2): [Título - Casos de Éxito]
  - Caso 1: [Resultado]
  - Caso 2: [Resultado]

Conclusión: [Resumen + CTA]
```

### FASE 2: CREACIÓN DEL ARCHIVO HTML (10 min)

**2.1 Crea el Archivo**
```bash
# Naming convention: slug-en-kebab-case.html
/blog/[tema-principal-keywords].html

Ejemplos:
✅ guia-eventos-corporativos.html
✅ iluminacion-led-bodas-cdmx.html
✅ errores-renta-audio-profesional.html
```

**2.2 Copia la Estructura Base**
```
1. Copia TODO el código de /blog/guia-eventos-corporativos.html
2. Guárdalo con tu nuevo nombre de archivo
3. Reemplaza placeholders con tu información
```

**2.3 Actualiza Meta Tags**
```
- <title>: Tu título optimizado | OrigenLab
- meta description: Tu descripción 150-160 chars
- meta keywords: Tus 5-8 keywords
- og:url: https://origenlab.com/blog/TU-SLUG.html
- og:title: Tu título para redes sociales
- og:description: Tu hook para redes sociales
- og:image: ../img/[categoria]/[tu-imagen].webp
- canonical: https://origenlab.com/blog/TU-SLUG.html
```

**2.4 Actualiza Schema.org**
```json
{
  "headline": "[Tu título completo]",
  "description": "[Descripción 200-250 chars]",
  "image": "https://origenlab.com/img/[categoria]/[imagen].webp",
  "articleSection": "[Tu Categoría]",
  "keywords": "[Tus keywords]",
  "mentions": [
    {
      "name": "[Empresa 1]",
      "url": "https://origenlab.com/categorias/[categoria]/[empresa-1].html"
    },
    {
      "name": "[Empresa 2]",
      "url": "https://origenlab.com/categorias/[categoria]/[empresa-2].html"
    }
  ]
}
```

### FASE 3: ESCRIBIR EL CONTENIDO (90-120 min)

**3.1 Header del Artículo**
```html
<div class="article-category-badge">
  <a href="../categorias/[tu-categoria].html">[Categoría]</a>
</div>
<h1 class="article-title">[TU TÍTULO PRINCIPAL]</h1>
<p class="article-subtitle">
  [SUBTÍTULO DE 2-3 LÍNEAS CON DATOS/NÚMEROS ESPECÍFICOS Y PROPUESTA DE VALOR]
</p>
<div class="article-meta-info">
  <span class="article-reading-time">⏱ [X] min lectura</span>
</div>
```

**3.2 Introducción (3 párrafos)**
```
Párrafo 1 (article-lead):
- Hook con anécdota concreta
- Menciona empresa verificada con link
- Establece problema específico
- 4-5 líneas

Párrafo 2:
- Amplifica el problema
- Datos de la industria en México
- Costo del problema (dinero/tiempo/reputación)
- 3-4 líneas

Párrafo 3:
- Transición a la solución
- Introduce tu framework/metodología
- Promesa de valor del artículo
- 3-4 líneas
```

**3.3 Tabla de Contenidos**
```html
<nav class="article-toc">
  <h2>Contenido del artículo</h2>
  <ol>
    <li><a href="#seccion-1">[Título Sección 1 - Pregunta o promesa]</a></li>
    <li><a href="#seccion-2">[Título Sección 2]</a></li>
    <li><a href="#seccion-3">[Título Sección 3]</a></li>
    <li><a href="#seccion-4">[Título Sección 4]</a></li>
    <li><a href="#seccion-5">[Título Sección 5]</a></li>
  </ol>
</nav>
```

**3.4 Cada Sección Principal (Repetir 5 veces)**
```html
<section class="article-section" id="seccion-X">
  <h2>[TÍTULO H2 - Pregunta o Afirmación Fuerte]</h2>

  <!-- Párrafo intro: Establece el contexto -->
  <p>
    [Introduce el tema de la sección con hook]
  </p>

  <!-- Párrafo con ejemplo concreto -->
  <p>
    [Caso específico, anécdota, o ejemplo real]
  </p>

  <!-- Subsección 1 -->
  <h3>[Subtítulo H3]</h3>

  <p>
    [Contenido de la subsección. Incluye link a empresa donde sea natural:
    <a href="../categorias/[categoria]/[empresa].html">Nombre Empresa</a>]
  </p>

  <!-- Más párrafos según necesites -->
  <p>
    [Continúa desarrollando el tema]
  </p>

  <!-- Box de Tip o Highlight (1 por cada 2 secciones) -->
  <div class="article-tip">
    <h4>[Título del Framework/Checklist]</h4>
    <p>[Consejo accionable. Puede ser lista: Item 1, Item 2, Item 3. O regla práctica específica.]</p>
  </div>

  <!-- O usar Highlight para datos críticos -->
  <div class="article-highlight">
    <h4>[Benchmark o Datos Clave]</h4>
    <p>[Información técnica, números, especificaciones. Formato estructurado.]</p>
  </div>
</section>
```

**3.5 Conclusión**
```html
<section class="article-section">
  <h2>[Título Motivacional - "Tu próximo X puede ser diferente"]</h2>

  <p>
    [Resumen de puntos clave del artículo en 2-3 líneas]
  </p>

  <p>
    [Contraste: He visto empresas gastar X sin resultados VS empresas que con Y lograron Z]
  </p>

  <p>
    [Call to action suave: "Si vas a invertir en X, invierte para ganar. Define tus objetivos. Trabaja con <a href="../categorias/[categoria].html">proveedores especializados</a>..."]
  </p>

  <p>
    [Cierre motivacional: "Y sobre todo, mide todo. Los X no son gastos—son inversiones."]
  </p>
</section>
```

**3.6 CTA Inline**
```html
<div class="article-cta">
  <h3>¿Listo para [resultado deseado relacionado con tema]?</h3>
  <p>Encuentra [beneficio específico] que hacen posible [resultado] en México</p>
  <a href="../categorias/[categoria].html" class="btn-primary">Ver Proveedores Verificados de [Categoría]</a>
</div>
```

### FASE 4: SIDEBAR Y ELEMENTOS SECUNDARIOS (20 min)

**4.1 Artículos Relacionados (Sidebar)**
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget-title">Artículos Relacionados</h3>

  <!-- Artículo 1 -->
  <a href="[slug-articulo-1].html" class="related-article">
    <div class="related-article-image">
      <img src="../img/[categoria]/[imagen-1].webp" alt="[ALT descriptivo]" loading="lazy">
    </div>
    <div class="related-article-content">
      <h4>[Título Artículo 1]</h4>
      <span class="related-article-time">[X] min</span>
    </div>
  </a>

  <!-- Repetir para artículos 2 y 3 -->
</div>
```

**4.2 Proveedores Verificados (Sidebar)**
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget-title">Proveedores Verificados</h3>

  <a href="../categorias/[categoria]/[empresa-1].html" class="empresa-relacionada">
    <div class="empresa-relacionada-nombre">[Nombre Empresa 1]</div>
    <div class="empresa-relacionada-desc">⭐ [X.X] • [Especialidad] - CDMX</div>
  </a>

  <a href="../categorias/[categoria]/[empresa-2].html" class="empresa-relacionada">
    <div class="empresa-relacionada-nombre">[Nombre Empresa 2]</div>
    <div class="empresa-relacionada-desc">⭐ [X.X] • [Especialidad] - CDMX</div>
  </a>

  <a href="../categorias/[categoria]/[empresa-3].html" class="empresa-relacionada">
    <div class="empresa-relacionada-nombre">[Nombre Empresa 3]</div>
    <div class="empresa-relacionada-desc">[Especialidad breve]</div>
  </a>
</div>
```

**4.3 Newsletter (Sidebar)**
```html
<div class="sidebar-widget sidebar-newsletter">
  <h3 class="sidebar-widget-title">Newsletter</h3>
  <p class="newsletter-description">Recibe las mejores guías de [temática específica] cada semana</p>
  <form class="newsletter-form">
    <input type="email" placeholder="tu@email.com" class="newsletter-input" required>
    <button type="submit" class="newsletter-btn">Suscribirme</button>
  </form>
  <p class="newsletter-privacy">Sin spam. Cancela cuando quieras.</p>
</div>
```

### FASE 5: CTA SECTION Y FOOTER (10 min)

**5.1 CTA Section Post-Artículo**
```html
<section class="cta-section">
  <div class="container" style="max-width: 800px;">
    <h2>¿[Pregunta relacionada con el tema del artículo]?</h2>
    <p>Encuentra [propuesta de valor del directorio específica para este tema]</p>
    <div class="cta-botones">
      <a href="../categorias/[categoria].html" class="btn-primary">Ver Proveedores de [Categoría]</a>
      <a href="../blog.html" class="btn-secondary">Más Artículos</a>
    </div>
  </div>
</section>
```

**5.2 Footer**
- Copiar footer completo de guia-eventos-corporativos.html
- NO cambiar nada (es estructura estándar)

### FASE 6: VALIDACIÓN Y OPTIMIZACIÓN (30 min)

**6.1 Validación Técnica**
```bash
# Verifica en navegador:
1. HTML válido (no errores de sintaxis)
2. Todos los links funcionan (categorías, empresas, artículos)
3. Imagen destacada carga correctamente
4. Breadcrumbs correctos (4 niveles)
5. Anchor links de TOC funcionan
6. Responsive (prueba mobile)
7. No broken links (404)
```

**6.2 Validación de Contenido**
```
- [ ] Lectura completa para coherencia
- [ ] Sin typos ni errores gramaticales
- [ ] Tono consistente (profesional pero conversacional)
- [ ] Transiciones suaves entre secciones
- [ ] Ejemplos específicos de México/CDMX
- [ ] Números/datos verificables
- [ ] CTAs claros y accionables
```

**6.3 Validación SEO**
```bash
# Checklist SEO:
- [ ] Keyword primaria en H1, primer párrafo, y 3-5x en contenido
- [ ] Keywords secundarias 2-3x cada una
- [ ] "México"/"CDMX" mínimo 5x en contenido
- [ ] Meta title 50-60 caracteres
- [ ] Meta description 150-160 caracteres
- [ ] Alt text en imagen con keywords
- [ ] URLs internas sin errores (/categorias/categoria/empresa.html)
- [ ] Schema.org con mentions de empresas
```

**6.4 Validación Conversión**
```
- [ ] Mínimo 6 links a empresas verificadas
- [ ] Links integrados naturalmente (aportan contexto)
- [ ] 2 CTAs visibles (inline + post-article)
- [ ] Sidebar con proveedores verificados
- [ ] Newsletter signup funcional
- [ ] Botones con copy accionable ("Ver", "Descubre", "Encuentra")
```

**6.5 ⚠️ VERIFICACIÓN CRÍTICA: CONTENIDO ATEMPORAL**
```
ANTES de publicar, buscar y eliminar TODAS las fechas:

# Buscar en el archivo:
grep -n "2024\|2025\|2026\|enero\|febrero\|marzo" tu-articulo.html

# Verificar estos 8 lugares específicos:
1. <title> tag - NO debe tener años
2. <meta property="og:title"> - NO debe tener años
3. <meta name="twitter:title"> - NO debe tener años
4. Schema.org "headline" - NO debe tener años
5. <h1> del artículo - NO debe tener años
6. Todos los <h2> y <h3> - NO deben tener años
7. Menciones de "actualizado [mes] [año]" → cambiar a "precios reales"
8. Cualquier "en 2025", "para 2024" → eliminar

# Reemplazos comunes:
"en 2025" → eliminar
"para 2024" → eliminar
"Guía 2025 de..." → "Guía Completa de..."
"Tendencias 2025" → "Tendencias Actuales"
"Precios actualizados enero 2025" → "Precios reales de mercado"
"Las mejores empresas 2025" → "Las mejores empresas"

✅ EXCEPCIÓN: Copyright del footer (© 2025 OrigenLab) puede tener año
```

**6.6 Optimización Final**
```
# Reducir peso:
- Imagen destacada optimizada webp (<200KB)
- Sin código comentado innecesario
- Sin espacios en blanco excesivos

# Mejorar legibilidad:
- Párrafos de 3-5 líneas máximo
- Listas bullets cuando aplique
- Negritas en conceptos clave (no abuse)
- Espaciado consistente entre secciones
```

### FASE 7: PUBLICACIÓN EN BLOG.HTML (20 min)

Esta fase es **CRÍTICA** y requiere **atención máxima al detalle**. Un artículo perfecto que no se publica correctamente en blog.html es un artículo invisible.

---

#### **PASO 7.1: Verificación Final Pre-Publicación** ⚠️

**ANTES de tocar blog.html, ejecuta esta verificación obligatoria:**

```bash
# 1. Verificar que el archivo existe
ls -lh blog/[tu-slug].html

# 2. Buscar fechas en el artículo (CRÍTICO - BLOQUEANTE)
grep -n "2024\|2025\|2026\|enero\|febrero\|marzo\|abril\|mayo\|junio" blog/[tu-slug].html

# Si retorna resultados (excepto copyright footer):
# ❌ DETENTE INMEDIATAMENTE
# ❌ Corrige TODAS las fechas antes de continuar
# ❌ NO publiques hasta que grep -n retorne 0 resultados
```

**Checklist Pre-Publicación (OBLIGATORIA):**
- [ ] ✅ Archivo HTML existe en `/blog/[tu-slug].html`
- [ ] ✅ `grep` NO retorna fechas (2024, 2025, meses, etc.)
- [ ] ✅ Título es atemporal (sin años)
- [ ] ✅ Meta tags son atemporales
- [ ] ✅ H1 es atemporal
- [ ] ✅ Todas las imágenes cargan (verificar rutas `../img/`)
- [ ] ✅ Todos los links funcionan (empresas, categorías)
- [ ] ✅ Scorecard ≥ 95/105 puntos
- [ ] ✅ FASE 6.5 completada (Verificación Atemporal)

**Si algún checkbox NO está marcado → NO continúes a PASO 7.2**

---

#### **PASO 7.2: Ubicar Sección de Artículos en blog.html**

Abre `/blog.html` con tu editor y localiza (líneas aproximadas 142-145):

```html
<!-- Grid de Artículos Recientes -->
<section class="blog-section">
  <h2 class="blog-section-title">Artículos Recientes</h2>

  <div class="articles-grid">

    <!-- ⬇️ INSERTAR NUEVO ARTÍCULO AQUÍ (como PRIMER elemento) ⬇️ -->
    <!-- Artículo 1 - [ACTUALMENTE PRIMER ARTÍCULO] -->
```

**REGLAS DE ORO:**
1. **SIEMPRE** agregar como **PRIMER** elemento del `.articles-grid`
2. El artículo nuevo = Artículo 1
3. Todos los demás artículos se desplazan hacia abajo
4. NO eliminar artículos antiguos (la paginación los manejará automáticamente)

---

#### **PASO 7.3: Plantilla Exacta para blog.html**

**Usa esta plantilla EXACTA sin modificaciones:**

```html
<!-- Artículo 1 - [TÍTULO CORTO DESCRIPTIVO] -->
<article class="article-card">
  <div class="article-card-image">
    <img src="img/[CARPETA]/[IMAGEN].webp" alt="[ALT TEXT SEO]" loading="lazy">
  </div>
  <div class="article-card-content">
    <div class="article-meta">
      <a href="categorias/[CATEGORIA].html" class="article-category">[NOMBRE CATEGORÍA]</a>
    </div>
    <h3 class="article-card-title">
      <a href="blog/[SLUG].html">[TÍTULO ATEMPORAL]</a>
    </h3>
    <p class="article-card-excerpt">
      [EXTRACTO 150-200 CARACTERES CON HOOK + BENEFICIO]
    </p>
    <div class="article-card-footer">
      <span class="article-reading-time">[X] min</span>
      <a href="blog/[SLUG].html" class="article-link">Leer más →</a>
    </div>
  </div>
</article>
```

**Tabla de Parámetros:**

| Parámetro | Tipo | Ejemplo Real | Reglas |
|-----------|------|--------------|--------|
| `[TÍTULO CORTO DESCRIPTIVO]` | Comentario | `Mejores Empresas Renta Inflables` | Max 50 caracteres, sin año |
| `[CARPETA]` | Path imagen | `eventos`, `fiestas-infantiles` | Debe existir en `/img/` |
| `[IMAGEN]` | Archivo webp | `luces-negras-para-fiestas.webp` | Optimizada <200KB |
| `[ALT TEXT SEO]` | Alt attribute | `Mejores empresas renta inflables CDMX` | Con keywords, sin año |
| `[CATEGORIA]` | Slug | `eventos`, `fiestas-infantiles` | Coincide con `/categorias/` |
| `[NOMBRE CATEGORÍA]` | Display | `Eventos`, `Fiestas Infantiles` | Capitalizado |
| `[SLUG]` | Filename | `mejores-empresas-renta-inflables-cdmx` | Sin `.html`, kebab-case |
| `[TÍTULO ATEMPORAL]` | H3 | `Las 2 Mejores Empresas para Rentar Inflables en CDMX` | SIN años |
| `[EXTRACTO]` | Descripción | `+8,000 fiestas exitosas documentadas. Guía completa...` | 150-200 chars |
| `[X]` | Minutos | `12`, `8`, `15` | Fórmula: palabras ÷ 200 |

---

#### **PASO 7.4: Ejemplo Completo Real**

**Artículo de Referencia:**
- Título: "Las 2 Mejores Empresas para Rentar Inflables en CDMX"
- Categoría: Fiestas Infantiles
- Slug: `mejores-empresas-renta-inflables-cdmx.html`
- Lectura: 12 min
- Palabras: ~3,800
- Empresas: 2 (INFLAPY + Renta de Inflables CDMX)

**Código implementado:**

```html
<!-- Artículo 1 - Mejores Empresas Renta Inflables -->
<article class="article-card">
  <div class="article-card-image">
    <img src="img/eventos/luces-negras-para-fiestas.webp" alt="Mejores empresas renta inflables CDMX" loading="lazy">
  </div>
  <div class="article-card-content">
    <div class="article-meta">
      <a href="categorias/fiestas-infantiles.html" class="article-category">Fiestas Infantiles</a>
    </div>
    <h3 class="article-card-title">
      <a href="blog/mejores-empresas-renta-inflables-cdmx.html">Las 2 Mejores Empresas para Rentar Inflables en CDMX</a>
    </h3>
    <p class="article-card-excerpt">
      +8,000 fiestas exitosas documentadas. Guía completa con empresas verificadas que garantizan puntualidad, seguridad e inflables impecables en Ciudad de México.
    </p>
    <div class="article-card-footer">
      <span class="article-reading-time">12 min</span>
      <a href="blog/mejores-empresas-renta-inflables-cdmx.html" class="article-link">Leer más →</a>
    </div>
  </div>
</article>
```

---

#### **PASO 7.5: Actualizar Numeración de Artículos**

Después de insertar tu artículo como **Artículo 1**, incrementa los números de TODOS los artículos existentes:

**ANTES:**
```html
<div class="articles-grid">

  <!-- Artículo 1 -->
  <article class="article-card">
    <h3><a href="blog/tendencias-iluminacion-led.html">Tendencias LED</a></h3>
  </article>

  <!-- Artículo 2 -->
  <article class="article-card">
    <h3><a href="blog/guia-equipo-audio.html">Guía Audio</a></h3>
  </article>
```

**DESPUÉS:**
```html
<div class="articles-grid">

  <!-- Artículo 1 - NUEVO (inflables) -->
  <article class="article-card">
    <h3><a href="blog/mejores-empresas-renta-inflables-cdmx.html">Inflables CDMX</a></h3>
  </article>

  <!-- Artículo 2 - (antes era Artículo 1) -->
  <article class="article-card">
    <h3><a href="blog/tendencias-iluminacion-led.html">Tendencias LED</a></h3>
  </article>

  <!-- Artículo 3 - (antes era Artículo 2) -->
  <article class="article-card">
    <h3><a href="blog/guia-equipo-audio.html">Guía Audio</a></h3>
  </article>
```

**IMPORTANTE:**
- Los números son solo para organización del código
- La paginación JavaScript ignora los comentarios
- Ayuda a futuras ediciones y debugging

---

#### **PASO 7.6: Actualizar Sidebar - Categorías**

**Caso A: Categoría NUEVA (no existe en sidebar)**

Ubicación: Líneas ~316-356 de blog.html

```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget-title">Categorías</h3>
  <ul class="blog-categories-list">
    <li>
      <a href="categorias/eventos.html" class="blog-category-item">
        <span class="category-name">Eventos</span>
        <span class="category-count">42</span>
      </a>
    </li>

    <!-- ⬇️ INSERTAR NUEVA CATEGORÍA AQUÍ ⬇️ -->
    <li>
      <a href="categorias/fiestas-infantiles.html" class="blog-category-item">
        <span class="category-name">Fiestas Infantiles</span>
        <span class="category-count">1</span>
      </a>
    </li>

    <li>
      <a href="categorias/manufactura.html" class="blog-category-item">
        <span class="category-name">Manufactura</span>
        <span class="category-count">28</span>
      </a>
    </li>
```

**Caso B: Categoría EXISTENTE (ya está en sidebar)**

Encuentra la categoría e **incrementa** el contador:

```html
<!-- ANTES -->
<li>
  <a href="categorias/eventos.html" class="blog-category-item">
    <span class="category-name">Eventos</span>
    <span class="category-count">42</span>
  </a>
</li>

<!-- DESPUÉS (si agregaste un artículo de Eventos) -->
<li>
  <a href="categorias/eventos.html" class="blog-category-item">
    <span class="category-name">Eventos</span>
    <span class="category-count">43</span> <!-- Incrementado +1 -->
  </a>
</li>
```

---

#### **PASO 7.7: Actualizar Sidebar - Tags Populares**

Agrega **1-2 tags relevantes** del nuevo artículo.

Ubicación: Líneas ~421-436 de blog.html

```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget-title">Tags Populares</h3>
  <div class="blog-tags">
    <a href="#" class="blog-tag">Eventos Corporativos</a>
    <!-- ⬇️ INSERTAR NUEVOS TAGS AQUÍ ⬇️ -->
    <a href="#" class="blog-tag">Fiestas Infantiles</a>
    <a href="#" class="blog-tag">Inflables</a>
    <!-- ⬆️ NUEVOS TAGS AGREGADOS ⬆️ -->
    <a href="#" class="blog-tag">Iluminación LED</a>
    <a href="#" class="blog-tag">Audio Profesional</a>
```

**Reglas de Tags:**
- Máximo 2 tags nuevos por artículo
- Deben ser keywords del artículo
- NO duplicar tags existentes
- Capitalización correcta (Title Case)
- Relevantes al contenido principal

**Ejemplos de buenos tags:**
- ✅ "Fiestas Infantiles" (categoría)
- ✅ "Inflables" (servicio específico)
- ✅ "Eventos Corporativos" (tipo de evento)

**Ejemplos de malos tags:**
- ❌ "Mejores Empresas" (demasiado genérico)
- ❌ "CDMX" (solo ubicación, no tema)
- ❌ "2025" (fecha - prohibido)

---

#### **PASO 7.8: Verificación Post-Publicación** ✅

**Ejecuta TODAS estas verificaciones ANTES de dar por terminado:**

**A) Verificación de Código:**
```bash
# 1. Verificar que blog.html referencia el artículo
grep -n "mejores-empresas-renta-inflables-cdmx" blog.html

# Debe retornar 3 líneas:
# - Una en el <a href="blog/...">
# - Una en el título <h3>
# - Una en "Leer más"

# 2. Verificar estructura HTML válida
# (Opcional: usar validator.w3.org)
```

**B) Verificación Visual en Navegador:**
```bash
# Abrir blog.html localmente
open blog.html

# O si estás en servidor:
# http://localhost:8000/blog.html
```

**Checklist Visual:**
- [ ] ✅ Artículo aparece como **PRIMERO** en el grid
- [ ] ✅ Imagen carga correctamente (no broken image)
- [ ] ✅ Categoría badge tiene color correcto y es clickeable
- [ ] ✅ Título del artículo es clickeable y abre el HTML
- [ ] ✅ Extracto es atractivo (150-200 caracteres)
- [ ] ✅ Tiempo de lectura correcto ([X] min)
- [ ] ✅ Botón "Leer más →" funciona
- [ ] ✅ Sidebar muestra categoría (nueva o count incrementado)
- [ ] ✅ Tags agregados aparecen en "Tags Populares"

**C) Verificación de Paginación:**

Si tienes más de 6 artículos:
- [ ] ✅ Aparecen controles de paginación (← [1] [2] →)
- [ ] ✅ Solo 6 artículos visibles en página 1
- [ ] ✅ Botón "Anterior" deshabilitado en página 1
- [ ] ✅ Botón "Siguiente" funciona y muestra artículos 7-12
- [ ] ✅ Números de página clickeables y funcionan
- [ ] ✅ Scroll suave al cambiar de página

**D) Verificación de Links:**
- [ ] ✅ Click en categoría badge → abre `/categorias/[categoria].html`
- [ ] ✅ Click en título artículo → abre `/blog/[slug].html`
- [ ] ✅ Click "Leer más" → abre `/blog/[slug].html`
- [ ] ✅ Dentro del artículo, breadcrumbs funcionan
- [ ] ✅ Links a empresas dentro del artículo funcionan

**E) Verificación de Consola del Navegador:**
```
1. Presiona F12
2. Ve a pestaña "Console"
3. Recarga la página (Ctrl+R o Cmd+R)
4. Verifica que NO hay errores en rojo
5. Verifica que paginación JavaScript se ejecuta
```

Errores comunes a buscar:
- ❌ `404 Not Found` → Imagen o archivo no existe
- ❌ `Uncaught ReferenceError` → Error en paginación JS
- ❌ `Failed to load resource` → Path incorrecto

---

#### **PASO 7.9: Probar Flujo Completo de Usuario**

**Simula el recorrido de un usuario real:**

```
1. index.html
   ↓ Click en "Blog" del menú
2. blog.html
   ↓ Artículo nuevo aparece primero
   ↓ Click en imagen o título
3. blog/[tu-slug].html
   ↓ Artículo completo se despliega
   ↓ Breadcrumbs: Inicio → Blog → Categoría → Artículo
   ↓ Click en empresa (ej: INFLAPY)
4. categorias/fiestas-infantiles/inflables-para-fiestas.html
   ✅ Perfil de empresa se abre correctamente
```

**Checklist de Flujo:**
- [ ] ✅ Navegación index → blog funciona
- [ ] ✅ Artículo nuevo es visible inmediatamente
- [ ] ✅ Click en artículo abre página completa
- [ ] ✅ Breadcrumbs permiten volver atrás
- [ ] ✅ Links a empresas abren perfiles correctos
- [ ] ✅ Sidebar "Artículos Relacionados" tiene links funcionales
- [ ] ✅ CTAs ("Ver Perfil", "Contactar") funcionan
- [ ] ✅ Footer mantiene navegación consistente

---

#### **PASO 7.10: Commit y Push a Git** (Opcional)

Si usas control de versiones:

```bash
# 1. Ver estado
git status

# Debe mostrar:
# modified:   blog.html
# modified:   blog/mejores-empresas-renta-inflables-cdmx.html (si editaste)

# 2. Ver diferencias
git diff blog.html

# 3. Agregar archivos
git add blog.html
git add blog/mejores-empresas-renta-inflables-cdmx.html

# 4. Commit con mensaje profesional
git commit -m "Add: Las 2 Mejores Empresas para Rentar Inflables en CDMX - Fiestas Infantiles

- Added article as first item in blog.html
- Updated sidebar: added 'Fiestas Infantiles' category (count: 1)
- Added tags: 'Fiestas Infantiles', 'Inflables'
- Article specs: 12 min read, 3,800 words, 2 company profiles
- SEO optimized: timeless content, no dates
- Scorecard: 98/105 points"

# 5. Push a remoto
git push origin main
```

**Anatomía del Mensaje de Commit Profesional:**

```
Línea 1: Add: [Título del artículo] - [Categoría]
[línea en blanco]
Línea 3+: Detalles específicos:
- Acción principal (added to blog.html)
- Cambios en sidebar (categorías, tags)
- Métricas del artículo (palabras, tiempo, enlaces)
- Optimizaciones (SEO, scorecard)
- Puntuación de calidad
```

**Buenas prácticas de commit:**
- Usar `Add:` para nuevos artículos
- Usar `Update:` para ediciones
- Incluir métricas cuantificables
- Mencionar optimizaciones SEO
- Separar cambios en bullets

---

#### **PASO 7.11: Monitoreo Post-Publicación** (Primeras 24h)

**Después de publicar, monitorea:**

**A) Rendimiento del Artículo:**
```bash
# Si tienes analytics:
- Pageviews en primeras 24h
- Tiempo promedio en página (target: >3 min)
- Bounce rate (target: <60%)
- CTR en empresas mencionadas
```

**B) Posicionamiento SEO:**
```
# Días 1-7:
- Google Search Console → Ver impresiones
- Keywords posicionando
- Click-through rate (CTR)
```

**C) Engagement:**
```
# Métricas de usuario:
- Scroll depth (¿llegan al final?)
- Clicks en CTAs
- Enlaces a empresas clickeados
- Newsletter signups desde artículo
```

**D) Problemas Técnicos:**
- 404 errors → Revisar logs de servidor
- Imágenes no cargan → Verificar CDN
- JS errors → Revisar consola navegador
- Mobile issues → Probar en dispositivos reales

---

### 🎯 RESUMEN FASE 7: CHECKLIST COMPLETO

**ANTES de Publicar:**
- [ ] Ejecutar grep para buscar fechas (0 resultados)
- [ ] Scorecard ≥ 95/105 puntos
- [ ] Artículo completamente atemporal

**Durante Publicación:**
- [ ] Agregar artículo como PRIMER elemento en blog.html
- [ ] Actualizar numeración de artículos existentes
- [ ] Agregar/actualizar categoría en sidebar
- [ ] Agregar 1-2 tags relevantes en sidebar

**DESPUÉS de Publicar:**
- [ ] Verificar artículo aparece primero visualmente
- [ ] Probar todos los links (imagen, título, "Leer más")
- [ ] Verificar paginación funciona (si >6 artículos)
- [ ] Probar flujo completo de usuario
- [ ] Commit con mensaje profesional
- [ ] Monitorear primeras 24h

**Si TODOS los checkboxes están marcados: ✅ ARTÍCULO PUBLICADO EXITOSAMENTE**

---

## ERRORES COMUNES Y CÓMO EVITARLOS

### ❌ ERROR 0: Contenido con Fechas Específicas ⚠️ CRÍTICO

**Problema:** Incluir años en títulos, meta tags o contenido
**Impacto:** El artículo se vuelve obsoleto rápidamente, pierde rankings SEO
**Solución:** Hacer TODO el contenido atemporal

```html
❌ INCORRECTO:
<title>Las Mejores Empresas para Rentar Inflables en CDMX 2025 | OrigenLab</title>
<h1>Las 2 Mejores Empresas para Rentar Inflables en CDMX en 2025</h1>
<p>Los precios de renta de inflables en CDMX (actualizados enero 2025)...</p>

✅ CORRECTO:
<title>Las Mejores Empresas para Rentar Inflables en CDMX | OrigenLab</title>
<h1>Las 2 Mejores Empresas para Rentar Inflables en CDMX</h1>
<p>Los precios reales de renta de inflables en CDMX varían según...</p>
```

**Lugares donde revisar:**
1. `<title>` tag
2. `<meta property="og:title">`
3. `<meta name="twitter:title">`
4. Schema.org `"headline"`
5. `<h1>` del artículo
6. Todos los `<h2>` y `<h3>`
7. Menciones de "precios actualizados [mes] [año]"
8. Cualquier referencia temporal en el contenido

**EXCEPCIÓN:** El copyright del footer (`© 2025 OrigenLab`) puede tener año.

### ❌ ERROR 1: Links Rotos
**Problema:** URLs relativas incorrectas
**Solución:** Siempre usa `../` para subir un nivel desde `/blog/`

```html
✅ CORRECTO:
<a href="../categorias/eventos/redeil.html">Redeil</a>
<a href="../categorias/eventos.html">Eventos</a>
<a href="../blog.html">Blog</a>

❌ INCORRECTO:
<a href="categorias/eventos/redeil.html">Redeil</a> ← Falta ../
<a href="/categorias/eventos.html">Eventos</a> ← Slash absoluto
```

### ❌ ERROR 2: Meta Description Débil
**Problema:** "Artículo sobre eventos corporativos en México"
**Solución:** Incluir hook con números + beneficio

```
✅ CORRECTO:
"Casos reales con ROI +400%. Estrategias comprobadas, proveedores verificados y frameworks para eventos B2B exitosos en CDMX"

❌ INCORRECTO:
"Aprende a organizar eventos corporativos. Encuentra proveedores en México."
```

### ❌ ERROR 3: Enlaces Spam a Empresas
**Problema:** "Los mejores proveedores: [Link1], [Link2], [Link3]"
**Solución:** Integrar empresas en narrativa con contexto

```
✅ CORRECTO:
"Cuando trabajé con Redeil, una de las empresas líderes en iluminación LED, me contaban cómo..."

❌ INCORRECTO:
"Contacta a Redeil para iluminación LED."
```

### ❌ ERROR 4: Contenido Genérico Sin Localización
**Problema:** Contenido aplicable a cualquier país
**Solución:** Menciones específicas de México/CDMX

```
✅ CORRECTO:
"Eventos en el WTC Ciudad de México"
"Proveedores en Polanco, CDMX"
"Precios en pesos mexicanos"

❌ INCORRECTO:
"Eventos corporativos" (sin localización)
"Mejores proveedores" (¿de dónde?)
```

### ❌ ERROR 5: Sin Casos de Éxito con Números
**Problema:** "Esta estrategia funciona muy bien"
**Solución:** Casos con ROI, números, resultados medibles

```
✅ CORRECTO:
"87 contratos cerrados en 45 días, ROI del evento: 1,748%"

❌ INCORRECTO:
"Muchos contratos cerrados, muy exitoso"
```

---

## EJEMPLOS DE ARTÍCULOS TIPO

### Tipo 1: Guía Práctica
**Estructura:**
- H1: "Cómo [Lograr Resultado] en [Localización]"
- Sección 1: El error común que impide el resultado
- Sección 2: Framework paso a paso
- Sección 3: Herramientas/proveedores necesarios
- Sección 4: Aspectos técnicos críticos
- Sección 5: Casos de éxito con números

**Ejemplo:**
"Cómo Elegir el Sistema de Audio Perfecto para tu Boda en CDMX"

### Tipo 2: Lista de Errores
**Estructura:**
- H1: "[X] Errores [Fatales/Costosos] al [Hacer Algo]"
- Sección 1: Error #1 [El más común]
- Sección 2: Error #2 [El más costoso]
- Sección 3: Error #3 [El menos obvio]
- Sección 4: Cómo evitar todos estos errores
- Sección 5: Casos de quienes lo hicieron bien

**Ejemplo:**
"7 Errores Fatales al Rentar Iluminación LED en Ciudad de México"

### Tipo 3: Comparativa Técnica
**Estructura:**
- H1: "[Opción A] vs [Opción B]: Cuál Elegir en [Año]"
- Sección 1: Diferencias clave
- Sección 2: Cuándo usar Opción A
- Sección 3: Cuándo usar Opción B
- Sección 4: Proveedores especializados en cada opción
- Sección 5: Casos de uso reales

**Ejemplo:**
"Sky Tracker vs Cabezas Móviles: Guía Completa para Eventos en CDMX 2025"

### Tipo 4: Casos de Estudio
**Estructura:**
- H1: "Cómo [Empresa/Sector] Logró [Resultado Específico]"
- Sección 1: La situación inicial (problema)
- Sección 2: La estrategia implementada
- Sección 3: Los proveedores y herramientas usadas
- Sección 4: Los resultados medibles
- Sección 5: Lecciones aplicables a tu caso

**Ejemplo:**
"Cómo una Startup Tecnológica Generó 87 Contratos con un Solo Evento"

---

## SCORECARD DE CALIDAD

### Evalúa tu Artículo (Máximo 105 puntos)

**⚠️ CONTENIDO ATEMPORAL (5 puntos) - VERIFICACIÓN OBLIGATORIA**
- [ ] Title tag SIN fechas (1 pt) - ¡CRÍTICO!
- [ ] Meta tags SIN años específicos (1 pt)
- [ ] H1 atemporal (1 pt)
- [ ] Contenido SIN "actualizado [mes] [año]" (1 pt)
- [ ] H2/H3 todos atemporales (1 pt)

**SEO y Optimización (25 puntos)**
- [ ] Title tag optimizado (3 pts)
- [ ] Meta description con hook (3 pts)
- [ ] Keywords integradas naturalmente (4 pts)
- [ ] Alt text con keywords (2 pts)
- [ ] Open Graph completo (3 pts)
- [ ] Schema.org con mentions (3 pts)
- [ ] Canonical URL correcto (2 pts)
- [ ] Breadcrumbs estructurados (2 pts)
- [ ] Localización México/CDMX (3 pts)

**Estructura y HTML (20 puntos)**
- [ ] Todas las stylesheets incluidas (3 pts)
- [ ] Header y navegación correctos (2 pts)
- [ ] Diseño 2 columnas en hero (3 pts)
- [ ] Layout content + sidebar (3 pts)
- [ ] Tabla de contenidos funcional (2 pts)
- [ ] IDs en secciones para anchors (2 pts)
- [ ] Footer completo (2 pts)
- [ ] Todos los links relativos correctos (3 pts)

**Contenido (30 puntos)**
- [ ] Introducción con hook fuerte (4 pts)
- [ ] 2,500-4,000 palabras (5 pts)
- [ ] 5 secciones con H2 (5 pts)
- [ ] 2-4 subsecciones H3 (3 pts)
- [ ] 1-2 cajas article-tip (3 pts)
- [ ] 1-2 cajas article-highlight (3 pts)
- [ ] Casos de éxito con números (4 pts)
- [ ] Conclusión con CTA (3 pts)

**Conversión y Enlaces (15 puntos)**
- [ ] 6-10 links a empresas (4 pts)
- [ ] Links integrados naturalmente (3 pts)
- [ ] article-cta inline (2 pts)
- [ ] CTA section post-artículo (2 pts)
- [ ] Sidebar con proveedores (2 pts)
- [ ] Newsletter signup (2 pts)

**Calidad y Profesionalismo (10 puntos)**
- [ ] Sin errores ortográficos (2 pts)
- [ ] Tono consistente (2 pts)
- [ ] Ejemplos específicos México (2 pts)
- [ ] Datos verificables (2 pts)
- [ ] Imagen optimizada webp (2 pts)

**RESULTADO:**
- 95-105 pts: Excelente - Listo para publicar
- 80-94 pts: Bueno - Pequeños ajustes necesarios
- 65-79 pts: Aceptable - Requiere revisión
- <65 pts: Insuficiente - Reescribir secciones clave

**⚠️ REGLA DE ORO:** Si el artículo tiene **0/5 puntos en CONTENIDO ATEMPORAL**, NO publicar hasta corregir todas las fechas.

---

## RECURSOS Y REFERENCIAS

### Archivos de Referencia
- **Template canónico:** `/blog/guia-eventos-corporativos.html`
- **Estructura de blog:** `/blog.html`
- **CSS de artículos:** `/blog/assets/css/article.css`
- **CSS de blog:** `/blog/assets/css/blog.css`

### Categorías Disponibles
- Eventos: `/categorias/eventos.html`
- Fiestas Infantiles: `/categorias/fiestas-infantiles.html`
- [Agregar más según se creen]

### Empresas Verificadas Disponibles
**Eventos:**
- Redeil: `/categorias/eventos/redeil.html` (Audio e Iluminación LED)
- Podiumex: `/categorias/eventos/podiumex.html` (Podiums Profesionales)
- Eventech: `/categorias/eventos/eventech.html` (Equipo Audiovisual)
- LuxEvents Pro: `/categorias/eventos/luxevents-pro.html` (Iluminación LED)
- Pantallas LED: `/categorias/eventos/pantalla-led.html`
- Bolas Disco: `/categorias/eventos/bolas-disco.html`
- Renta Iluminación: `/categorias/eventos/renta-iluminacion.html`
- Renta Sonido e Iluminación: `/categorias/eventos/renta-sonido-iluminacion.html`

**Fiestas Infantiles:**
- Mesas de Dulces: `/categorias/fiestas-infantiles/mesas-de-dulces.html`
- Inflables para Fiestas: `/categorias/fiestas-infantiles/inflables-para-fiestas.html`

### Guías de Keywords por Categoría

**Eventos:**
```
Primary: eventos corporativos México, organización eventos CDMX
Secondary: proveedores eventos, audio profesional eventos, iluminación LED eventos
Long-tail: cómo organizar evento corporativo exitoso CDMX, mejores proveedores audio CDMX
```

**Fiestas Infantiles:**
```
Primary: fiestas infantiles CDMX, organización fiestas niños México
Secondary: inflables para fiestas, mesas de dulces, animación infantil
Long-tail: cómo organizar fiesta infantil perfecta CDMX, mejores inflables para fiestas México
```

---

## NOTAS FINALES

### Filosofía OrigenLab
**Cada artículo debe:**
1. Resolver un problema B2B real
2. Incluir datos/números específicos
3. Mencionar proveedores verificados naturalmente
4. Ser accionable (el lector puede aplicar lo aprendido)
5. Posicionar a OrigenLab como autoridad

### Mantenimiento
**Actualizar este documento cuando:**
- Se agreguen nuevas categorías
- Se creen nuevas empresas verificadas
- Se identifiquen nuevos patrones que funcionen
- Se cambien estilos o estructura HTML

### Soporte
Para dudas sobre este documento:
- Referencia: `/blog/guia-eventos-corporativos.html` (template canónico)
- Documentación de empresas: `/.audit/DOCUMENTO-EMPRESAS.md`
- Guía para agregar artículos: `/.audit/GUIA-AGREGAR-ARTICULO-AL-BLOG.md`

---

## ⚠️ RECORDATORIO FINAL: CONTENIDO ATEMPORAL

**ANTES de publicar CUALQUIER artículo, ejecuta este comando para buscar fechas:**

```bash
grep -n "2024\|2025\|2026\|enero\|febrero\|marzo\|abril\|mayo\|junio\|julio\|agosto\|septiembre\|octubre\|noviembre\|diciembre" /ruta/al/articulo.html
```

**Si encuentras resultados (excepto copyright del footer), DETENTE y corrige TODAS las fechas.**

**Lugares críticos a verificar manualmente:**
1. `<title>` - línea ~8
2. `<meta property="og:title">` - línea ~17
3. `<meta name="twitter:title">` - línea ~25
4. Schema.org `"headline"` - línea ~49
5. `<h1 class="article-title">` - línea ~133
6. Todos los `<h2>` y `<h3>` en el contenido
7. Menciones de precios "actualizados"
8. Cualquier referencia temporal

**El contenido atemporal es la diferencia entre:**
- Un artículo que genera tráfico durante 1 año
- Un artículo que genera tráfico durante 5+ años

**No comprometas el ROI a largo plazo por incluir una fecha innecesaria.**

---

**Versión:** 2.0
**Fecha:** 2025-01-23
**Última actualización:** Documento unificado - incluye generación Y publicación completa
**Cambios v2.0:**
- ✅ Unificado con GUIA-AGREGAR-ARTICULO-AL-BLOG.md
- ✅ FASE 7 expandida con 11 pasos detallados de publicación
- ✅ Añadidas verificaciones pre y post-publicación
- ✅ Incluye guía de paginación automática
- ✅ Checklist completo de validación post-publicación
- ✅ Guía de monitoreo primeras 24h
**Autor:** OrigenLab Team
**Próxima revisión:** Cuando se complete el artículo #10

---

# FIN DEL DOCUMENTO
