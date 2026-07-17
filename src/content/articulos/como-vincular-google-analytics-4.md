---
titulo: "Cómo vincular Google Analytics 4 a tu sitio o tienda | Blog OrigenLab"
descripcion: "Guía paso a paso para vincular Google Analytics 4 a tu sitio o tienda: crea la propiedad, copia tu Measurement ID, instala el código y verifica que mida."
h1: "Cómo vincular Google Analytics 4 a tu sitio"
categoria: estrategia
categoriaLabel: "Estrategia"
fecha: 2026-07-13
minutos: 9
thumb: "/og-image.jpg"
thumbAlt: "Cómo vincular Google Analytics 4 a tu sitio"
---

<!-- ARTICLE HERO -->
  <section class="ol-art-hero">
    <div class="ol-art-hero-inner">
      <div class="ol-art-hero-grid">
        <div class="ol-art-hero-left">
          <div class="ol-art-badges">
            <span class="ol-art-cat estrategia">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 4-5"/></svg>
              Analítica
            </span>
            <span class="ol-art-readtime">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              9 min de lectura
            </span>
          </div>

          <h1 class="ol-art-title">Cómo vincular Google Analytics 4 a tu sitio</h1>

          <p class="ol-art-excerpt">Google Analytics 4 te dice qué hace la gente en tu sitio: de dónde llega, qué ve y dónde se va. Te mostramos cómo vincularlo paso a paso, sin código complicado.</p>

          <div class="ol-art-meta">
            <div class="ol-art-meta-author">
              <div class="ol-art-meta-avatar">OL</div>
              <div class="ol-art-meta-author-info">
                <span class="ol-art-meta-author-name">Equipo OrigenLab</span>
                <span class="ol-art-meta-author-role">Desarrollo Web &amp; Diseño Digital</span>
              </div>
            </div>
            <span class="ol-art-meta-sep"></span>
            
            <span class="ol-art-meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Guía profesional
            </span>
          </div>
        </div>

        <div class="ol-art-hero-right">
          <p class="ol-art-hero-copy">Tener un sitio bonito no sirve de mucho si no sabes qué pasa dentro. ¿La gente llega y se va? ¿Qué página los convence? ¿Desde qué celular o ciudad entran? Sin medición, todo es adivinar.</p>
          <p class="ol-art-hero-copy">Google Analytics 4 responde esas preguntas gratis. En esta guía lo conectamos de principio a fin: crear la cuenta, obtener tu ID de medición, instalar el código y confirmar que los datos ya estén entrando.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED IMAGE BAND -->
  <section class="ol-art-featured-band" aria-label="Imagen destacada">
    <div class="ol-art-featured-inner">
      <figure class="ol-art-featured">
        <img src="../../img/servicios/landing-page-conversion-analitica-mexico.avif" alt="Panel de Google Analytics 4 midiendo un sitio hecho por OrigenLab" loading="lazy" decoding="async" width="1280" height="720">
        <figcaption class="ol-art-featured-caption">Analítica web</figcaption>
      </figure>
    </div>
  </section>

  <!-- ARTICLE CONTENT -->
  <section class="ol-art-section">
    <div class="ol-art-inner">
      <div class="ol-art-layout">

        <article class="ol-art-body">


<h2 id="s1">Por qué medir tu sitio con Google Analytics</h2>
<p class="lead">Un sitio sin analítica es como una tienda sin caja registradora: sabes que entra gente, pero no cuánta, ni qué mira, ni qué la hace comprar.</p>
<p><strong>Google Analytics 4 (GA4)</strong> es la herramienta gratuita de Google para responder esas preguntas. Te muestra cuántas personas visitan tu sitio, de dónde llegan (Google, redes, un anuncio), qué páginas ven, desde qué dispositivo y en qué punto se van.</p>
<p>Con esos datos dejas de adivinar. Sabes qué campaña trae clientes reales, qué página convierte y qué contenido nadie lee. En OrigenLab dejamos Google Analytics configurado en cada proyecto que entregamos, justamente para que el cliente vea resultados desde el primer día.</p>
<p>Esta guía te lleva de cero a tener Google Analytics funcionando. Aplica igual para un sitio hecho a medida, un WordPress o una tienda Shopify.</p>
<h2 id="s2">Paso 1: Crea tu cuenta y propiedad de Google Analytics 4</h2>
<p>Entra a <a href="https://analytics.google.com" target="_blank" rel="noopener">analytics.google.com</a> con tu cuenta de Google. Si es tu primera vez, Google te pedirá crear una <strong>cuenta</strong> (el contenedor general, normalmente el nombre de tu empresa).</p>
<p>Dentro de la cuenta creas una <strong>propiedad</strong>, que es donde vive la información de un sitio. Haz clic en <strong>Administrar</strong> (el engrane), luego <strong>Crear &rarr; Propiedad</strong>, y define:</p>
<ul>
<li><strong>Nombre de la propiedad</strong> &mdash; por ejemplo, "Sitio web de tu empresa".</li>
<li><strong>Zona horaria</strong> &mdash; la de México, para que los reportes cuadren con tus horarios.</li>
<li><strong>Moneda</strong> &mdash; pesos mexicanos (MXN), si vendes en México.</li>
</ul>
<p>Google te preguntará el tamaño y la categoría de tu negocio. Son datos informativos; elige lo que más se acerque y continúa.</p>
<h2 id="s3">Paso 2: Crea un flujo de datos web</h2>
<p>Una vez creada la propiedad, Google te pide elegir una <strong>plataforma</strong>. Para un sitio o tienda, selecciona <strong>Web</strong>.</p>
<p>Ahí creas un <strong>flujo de datos</strong> (data stream): escribe la URL de tu sitio y un nombre para identificarlo.</p>
<p>Deja activada la <strong>medición mejorada</strong>. Con eso, Google Analytics registra automáticamente los eventos útiles &mdash; páginas vistas, scroll, clics a enlaces externos, búsquedas internas, envíos de formulario y reproducción de videos &mdash; sin que configures nada.</p>
<h2 id="s4">Paso 3: Copia tu ID de medición (G-XXXXXXX)</h2>
<p>Al terminar el flujo de datos, Google te muestra el <strong>ID de medición</strong> (Measurement ID). Tiene el formato <strong>G-XXXXXXX</strong> y es la "matrícula" que conecta tu sitio con tu propiedad de Analytics.</p>
<p>Si no lo ves, lo encuentras siempre en <strong>Administrar &rarr; Recogida y modificación de datos &rarr; Flujos de datos</strong>, abriendo tu flujo web. Cópialo: lo vas a necesitar en el siguiente paso.</p>
<blockquote>
<p>Guarda tu ID de medición a la mano. Todo lo que sigue depende de pegar ese G-XXXXXXX en el lugar correcto de tu sitio.</p>
</blockquote>
<h2 id="s5">Paso 4: Instala el código en tu sitio</h2>
<p>Hay dos caminos. Elige <strong>uno solo</strong> &mdash; instalar por dos vías a la vez duplica los datos.</p>
<h3>Opción A: etiqueta gtag.js directa</h3>
<p>En el mismo flujo de datos, Google te da una <strong>etiqueta de Google (gtag.js)</strong>: un bloque de código que empieza con <em>&lt;!-- Google tag --&gt;</em>. Cópialo completo y pégalo dentro de la sección <strong>&lt;head&gt;</strong> de tu sitio, en todas las páginas. Es la vía más directa cuando tienes acceso al código.</p>
<h3>Opción B: Google Tag Manager</h3>
<p>Si prefieres no tocar el código cada vez, instala <strong>Google Tag Manager</strong> una sola vez y, desde su panel, agrega una etiqueta de "Google Analytics: GA4" con tu ID de medición. Es ideal si vas a manejar varias etiquetas (Analytics, píxeles, conversiones) sin depender de un programador.</p>
<h2 id="s6">Paso 5: Conéctalo en WordPress o Shopify</h2>
<p>Si tu sitio corre en una plataforma, tienes atajos:</p>
<ul>
<li><strong>WordPress</strong> &mdash; usa un plugin oficial de Google (Site Kit) o inserta el contenedor de Tag Manager. Evita pegar el código en dos plugins distintos.</li>
<li><strong>Shopify</strong> &mdash; conéctalo desde el <strong>canal de Google y YouTube</strong>, que inserta el código en toda la tienda automáticamente. Si prefieres manual, pega la etiqueta en la sección <strong>&lt;head&gt;</strong> del archivo <em>theme.liquid</em>.</li>
</ul>
<p>La regla de oro es la misma: una sola vía de instalación por sitio.</p>
<h2 id="s7">Paso 6: Verifica que esté midiendo</h2>
<p>No des por hecho que quedó bien: confírmalo. En Google Analytics abre el informe <strong>Tiempo real</strong> y, en otra pestaña, navega tu propio sitio.</p>
<ol>
<li>Entra a tu sitio y muévete por un par de páginas.</li>
<li>Vuelve a Google Analytics y mira el informe <strong>Tiempo real</strong>.</li>
<li>Si aparece 1 usuario activo (tú) y el evento <em>page_view</em>, quedó instalado.</li>
</ol>
<p>Para revisar eventos con más detalle, usa <strong>DebugView</strong>. Si después de unos minutos no aparece nada, casi siempre es que el código no está en todas las páginas o que hay dos instalaciones peleando entre sí.</p>
<h2 id="s8">Cuándo conviene que alguien lo haga por ti</h2>
<p>Vincular Google Analytics es accesible, pero medir <em>bien</em> es otra cosa: definir qué es una conversión para tu negocio, marcar los eventos que importan (cotización enviada, clic a WhatsApp, compra) y leer los reportes sin ahogarte en datos.</p>
<p>En <strong>OrigenLab</strong> entregamos cada sitio con Google Analytics 4 ya configurado y con los eventos clave marcados, para que desde el primer día veas qué está funcionando y qué no. Si quieres que revisemos tu medición o la dejemos lista, <a href="/contacto/">escríbenos</a> &mdash; te decimos en concreto qué te falta.</p>


          <div class="ol-art-cta-inline">
            <div>
              <p class="ol-art-cta-inline-label">Siguiente paso</p>
              <h3>¿Listo para llevar tu sitio al siguiente nivel?</h3>
              <p>Hacemos diagnóstico técnico y estratégico sin costo. Te decimos exactamente qué frena a tu sitio hoy y qué camino tiene más sentido para tu negocio — sin compromiso de compra.</p>
            </div>
            <a href="/cotizar/" class="ol-art-cta-inline-btn">
              Solicitar diagnóstico
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div class="ol-art-share">
            <span class="ol-art-share-label">Compartir</span>
            <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Forigenlab.com%2Fblog%2Fcomo-vincular-google-analytics-4%2F&text=C%C3%B3mo+vincular+Google+Analytics+4+a+tu+sitio+o+tienda" target="_blank" rel="noopener noreferrer" class="ol-art-share-btn" aria-label="Compartir en X/Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Forigenlab.com%2Fblog%2Fcomo-vincular-google-analytics-4%2F" target="_blank" rel="noopener noreferrer" class="ol-art-share-btn" aria-label="Compartir en LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Forigenlab.com%2Fblog%2Fcomo-vincular-google-analytics-4%2F" target="_blank" rel="noopener noreferrer" class="ol-art-share-btn" aria-label="Compartir en Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://wa.me/?text=C%C3%B3mo+vincular+Google+Analytics+4+a+tu+sitio+o+tienda%20https%3A%2F%2Forigenlab.com%2Fblog%2Fcomo-vincular-google-analytics-4%2F" target="_blank" rel="noopener noreferrer" class="ol-art-share-btn" aria-label="Compartir en WhatsApp">
              <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004a15.94 15.94 0 002.46 8.55L.848 31.456l7.168-1.584A15.93 15.93 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.336 22.594c-.396 1.116-1.956 2.04-3.216 2.312-.864.18-1.992.324-5.792-1.244-4.86-2.004-7.986-6.93-8.226-7.254-.232-.324-1.932-2.58-1.932-4.92s1.224-3.492 1.656-3.972c.432-.48.948-.6 1.26-.6.312 0 .636.003.912.018.294.012.684-.111 1.068.816.396.96 1.344 3.276 1.464 3.516.12.24.198.516.036.84-.156.324-.24.516-.48.792-.24.276-.504.612-.72.828-.24.24-.492.504-.21.984.276.48 1.236 2.04 2.652 3.3 1.824 1.62 3.36 2.124 3.84 2.364.48.24.756.204 1.032-.12.276-.324 1.2-1.392 1.524-1.872.312-.48.636-.396 1.068-.24.432.168 2.748 1.296 3.216 1.536.48.24.792.36.912.552.12.204.12 1.14-.276 2.256z"/></svg>
            </a>
            <a href="mailto:?subject=C%C3%B3mo+vincular+Google+Analytics+4+a+tu+sitio+o+tienda&body=Mira%20este%20art%C3%ADculo%3A%20https%3A%2F%2Forigenlab.com%2Fblog%2Fcomo-vincular-google-analytics-4%2F" class="ol-art-share-btn" aria-label="Compartir por email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>

          <div class="ol-art-author-card">
            <div class="ol-art-author-avatar">OL</div>
            <div class="ol-art-author-info">
              <span class="label">Escrito por</span>
              <span class="name">Equipo OrigenLab</span>
              <span class="bio">Agencia mexicana de desarrollo web. Construimos sitios rápidos, modernos y pensados para convertir — para empresas en CDMX, Monterrey y Guadalajara.</span>
            </div>
            <a href="/nosotros/" class="ol-art-author-card-btn">
              Conocer al equipo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

        </article>

        <aside class="ol-art-sidebar" aria-label="Navegación y recursos">

          <div class="ol-sb-widget ol-sb-cta">
            <div class="ol-sb-cta-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </div>
            <p class="ol-sb-cta-title">¿Listo para<br>tu proyecto?</p>
            <p class="ol-sb-cta-sub">Cotización y diagnóstico estratégico sin costo. Te respondemos personalmente.</p>
            <a href="/cotizar/" class="ol-sb-cta-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Cotizar mi proyecto
            </a>
            <a href="https://wa.me/525547868402?text=Hola%2C%20me%20interesa%20un%20proyecto%20web" target="_blank" rel="noopener noreferrer" class="ol-sb-cta-wa">
              <svg width="13" height="13" viewBox="0 0 32 32" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004a15.94 15.94 0 002.46 8.55L.848 31.456l7.168-1.584A15.93 15.93 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.336 22.594c-.396 1.116-1.956 2.04-3.216 2.312-.864.18-1.992.324-5.792-1.244-4.86-2.004-7.986-6.93-8.226-7.254-.232-.324-1.932-2.58-1.932-4.92s1.224-3.492 1.656-3.972c.432-.48.948-.6 1.26-.6.312 0 .636.003.912.018.294.012.684-.111 1.068.816.396.96 1.344 3.276 1.464 3.516.12.24.198.516.036.84-.156.324-.24.516-.48.792-.24.276-.504.612-.72.828-.24.24-.492.504-.21.984.276.48 1.236 2.04 2.652 3.3 1.824 1.62 3.36 2.124 3.84 2.364.48.24.756.204 1.032-.12.276-.324 1.2-1.392 1.524-1.872.312-.48.636-.396 1.068-.24.432.168 2.748 1.296 3.216 1.536.48.24.792.36.912.552.12.204.12 1.14-.276 2.256z"/></svg>
              O escríbenos por WhatsApp
            </a>
          </div>

          <div class="ol-sb-widget">
            <p class="ol-sb-title">En este artículo</p>
            <nav class="ol-sb-toc" id="ol-sb-toc" aria-label="Índice del artículo">
              <a href="#s1" class="ol-sb-toc-link" data-target="s1">Por qué medir tu sitio</a>
              <a href="#s2" class="ol-sb-toc-link" data-target="s2">Paso 1: Cuenta y propiedad GA4</a>
              <a href="#s3" class="ol-sb-toc-link" data-target="s3">Paso 2: Flujo de datos web</a>
              <a href="#s4" class="ol-sb-toc-link" data-target="s4">Paso 3: Tu ID de medición</a>
              <a href="#s5" class="ol-sb-toc-link" data-target="s5">Paso 4: Instalar el código</a>
              <a href="#s6" class="ol-sb-toc-link" data-target="s6">Paso 5: WordPress o Shopify</a>
              <a href="#s7" class="ol-sb-toc-link" data-target="s7">Paso 6: Verificar que mida</a>
              <a href="#s8" class="ol-sb-toc-link" data-target="s8">¿Que lo hagan por ti?</a>
            </nav>
          </div>

          <div class="ol-sb-widget">
            <p class="ol-sb-title">Nuestros Servicios</p>
            <div class="ol-sb-services">
              <a href="/servicios/desarrollo-web/" class="ol-sb-svc-link">
                <div class="ol-sb-svc-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div class="ol-sb-svc-text">
                  <span class="ol-sb-svc-name">Desarrollo Web</span>
                  <span class="ol-sb-svc-sub">Sitios corporativos a medida</span>
                </div>
              </a>
              <a href="/servicios/landing-pages/" class="ol-sb-svc-link">
                <div class="ol-sb-svc-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div class="ol-sb-svc-text">
                  <span class="ol-sb-svc-name">Landing Pages</span>
                  <span class="ol-sb-svc-sub">Alta conversión desde día 1</span>
                </div>
              </a>
              <a href="/servicios/tiendas-en-linea/" class="ol-sb-svc-link">
                <div class="ol-sb-svc-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                </div>
                <div class="ol-sb-svc-text">
                  <span class="ol-sb-svc-name">Tiendas en Línea</span>
                  <span class="ol-sb-svc-sub">E-commerce con Mercado Pago</span>
                </div>
              </a>
              <a href="/servicios/rediseno-web/" class="ol-sb-svc-link">
                <div class="ol-sb-svc-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <div class="ol-sb-svc-text">
                  <span class="ol-sb-svc-name">Rediseño Web</span>
                  <span class="ol-sb-svc-sub">Moderniza tu sitio actual</span>
                </div>
              </a>
            </div>
          </div>

          <div class="ol-sb-widget">
            <p class="ol-sb-title">Seguir leyendo</p>
            <div class="ol-sb-related">
              <a href="/blog/como-medir-resultados-sitio-web/" class="ol-sb-related-item">
                <span class="ol-sb-related-num">01</span>
                <div class="ol-sb-related-info">
                  <span class="ol-sb-related-title">Cómo medir los resultados de tu sitio web</span>
                  <span class="ol-sb-related-meta">Estrategia · 6 min</span>
                </div>
              </a>
              <a href="/blog/por-que-tu-sitio-lento-cuesta-clientes/" class="ol-sb-related-item">
                <span class="ol-sb-related-num">02</span>
                <div class="ol-sb-related-info">
                  <span class="ol-sb-related-title">Por qué un sitio lento te cuesta clientes</span>
                  <span class="ol-sb-related-meta">Rendimiento · 5 min</span>
                </div>
              </a>
              <a href="/blog/astro-vs-wordpress-cual-elegir/" class="ol-sb-related-item">
                <span class="ol-sb-related-num">03</span>
                <div class="ol-sb-related-info">
                  <span class="ol-sb-related-title">Astro vs WordPress: cuál elegir</span>
                  <span class="ol-sb-related-meta">Tecnología · 8 min</span>
                </div>
              </a>
            </div>
          </div>

        </aside>

      </div>
    </div>
  </section>

  <!-- NEXT READ -->
  <section class="ol-art-nextread" aria-label="Artículos relacionados">
    <div class="ol-art-nextread-inner">
      <div class="ol-art-nextread-head">
        <div>
          <p class="ol-art-nextread-label">Te puede interesar</p>
          <h2 class="ol-art-nextread-title">Sigue explorando el blog</h2>
        </div>
        <a href="/blog/" class="ol-art-nextread-all">
          Ver todos los artículos
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div class="ol-art-nextread-grid">

        <a href="/blog/como-medir-resultados-sitio-web/" class="ol-art-nextread-card">
          <div class="ol-art-nextread-thumb"><span class="ol-art-nextread-num">01</span></div>
          <div class="ol-art-nextread-body">
            <div class="ol-art-nextread-top">
              <span class="ol-blog-cat estrategia">Estrategia</span>
              <span class="ol-art-nextread-meta">6 min de lectura</span>
            </div>
            <h3 class="ol-art-nextread-h">Cómo medir los resultados de tu sitio web</h3>
            <p class="ol-art-nextread-excerpt">Qué métricas de verdad importan y cómo leerlas sin ahogarte en datos.</p>
            <span class="ol-art-nextread-link">Leer artículo <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
        </a>
        <a href="/blog/por-que-tu-sitio-lento-cuesta-clientes/" class="ol-art-nextread-card">
          <div class="ol-art-nextread-thumb"><span class="ol-art-nextread-num">02</span></div>
          <div class="ol-art-nextread-body">
            <div class="ol-art-nextread-top">
              <span class="ol-blog-cat rendimiento">Rendimiento</span>
              <span class="ol-art-nextread-meta">5 min de lectura</span>
            </div>
            <h3 class="ol-art-nextread-h">Por qué un sitio lento te cuesta clientes</h3>
            <p class="ol-art-nextread-excerpt">El impacto directo de la velocidad de carga en tus ventas.</p>
            <span class="ol-art-nextread-link">Leer artículo <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
        </a>
        <a href="/blog/astro-vs-wordpress-cual-elegir/" class="ol-art-nextread-card">
          <div class="ol-art-nextread-thumb"><span class="ol-art-nextread-num">03</span></div>
          <div class="ol-art-nextread-body">
            <div class="ol-art-nextread-top">
              <span class="ol-blog-cat tecnologia">Tecnología</span>
              <span class="ol-art-nextread-meta">8 min de lectura</span>
            </div>
            <h3 class="ol-art-nextread-h">Astro vs WordPress: cuál elegir</h3>
            <p class="ol-art-nextread-excerpt">Velocidad, mantenimiento y costo comparados con datos reales de proyectos.</p>
            <span class="ol-art-nextread-link">Leer artículo <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
        </a>

      </div>
    </div>
  </section>

  <!-- CTA BAND -->
  <section class="ol-blog-cta-band">
    <div class="ol-blog-cta-band-inner">
      <div>
        <p class="ol-blog-cta-band-label">¿Listo para actuar?</p>
        <h2 class="ol-blog-cta-band-title">Lo que lees aquí lo aplicamos<br>en cada proyecto.</h2>
        <p class="ol-blog-cta-band-sub">Si este artículo te hizo preguntarte cómo se aplica en tu negocio, la respuesta más rápida es una conversación directa. Sin compromiso, sin ventas de presión — solo claridad sobre lo que necesitas.</p>
      </div>
      <div class="ol-blog-cta-band-actions">
        <a href="/cotizar/" class="ol-blog-cta-band-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Cotizar mi proyecto
        </a>
        <a href="https://wa.me/525547868402?text=Hola%2C%20vi%20el%20blog%20de%20OrigenLab%20y%20quiero%20platicar%20sobre%20mi%20proyecto" target="_blank" rel="noopener noreferrer" class="ol-blog-cta-band-wa">
          <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004a15.94 15.94 0 002.46 8.55L.848 31.456l7.168-1.584A15.93 15.93 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.336 22.594c-.396 1.116-1.956 2.04-3.216 2.312-.864.18-1.992.324-5.792-1.244-4.86-2.004-7.986-6.93-8.226-7.254-.232-.324-1.932-2.58-1.932-4.92s1.224-3.492 1.656-3.972c.432-.48.948-.6 1.26-.6.312 0 .636.003.912.018.294.012.684-.111 1.068.816.396.96 1.344 3.276 1.464 3.516.12.24.198.516.036.84-.156.324-.24.516-.48.792-.24.276-.504.612-.72.828-.24.24-.492.504-.21.984.276.48 1.236 2.04 2.652 3.3 1.824 1.62 3.36 2.124 3.84 2.364.48.24.756.204 1.032-.12.276-.324 1.2-1.392 1.524-1.872.312-.48.636-.396 1.068-.24.432.168 2.748 1.296 3.216 1.536.48.24.792.36.912.552.12.204.12 1.14-.276 2.256z"/></svg>
          Escribirnos por WhatsApp
        </a>
      </div>
    </div>
  </section>

  <!-- QUICKNAV BOTTOM -->
  
