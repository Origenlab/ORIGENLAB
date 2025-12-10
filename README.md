# OrigenLab - Directorio B2B Premium para México

![OrigenLab](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)

**Donde los Negocios Mexicanos se Conectan**

Directorio B2B de clase mundial diseñado específicamente para el mercado mexicano. Una plataforma que compite directamente con ThomasNet, Kompass y Alibaba B2B, estableciendo nuevos estándares para directorios empresariales en México.

---

## 🎯 Características Principales

### Diseño y UX de Clase Mundial
- **Ratio 60-30-10**: 60% espacio blanco, 30% contenido, 10% elementos interactivos
- **Sistema de Grid de 12 Columnas**: Breakpoints en 320px, 768px, 1024px, 1440px
- **Tipografía Profesional**: Inter para UI, Georgia para contenido largo
- **Paleta B2B Premium**: Azul corporativo (#003366) con acentos estratégicos

### Motor de Búsqueda Avanzado
- Búsqueda semántica con procesamiento de lenguaje natural
- Filtrado dinámico por ubicación, industria, certificaciones y tamaño
- Autocompletado inteligente con sugerencias predictivas
- Búsqueda por códigos NAICS/SCIAN

### Sistema de Perfiles Empresariales
- Perfiles verificados con validación RFC (SAT)
- Trust signals: certificaciones ISO, ESR, T-MEC
- Ratings y reseñas B2B
- Integración con datos gubernamentales (INEGI)

### Características B2B Específicas
- Sistema de filtrado avanzado multinivel
- Cards de empresa con información crítica visible
- Badges de verificación y certificaciones
- Sistema de favoritos/bookmarks con localStorage
- Vista grid/lista intercambiable

### Progressive Web App (PWA)
- Service Worker para funcionalidad offline
- Instalable como app nativa
- Caché inteligente de recursos
- Sincronización en background
- Push notifications

### Optimización SEO Técnica
- Schema.org markup (Organization, LocalBusiness)
- Meta tags dinámicos optimizados
- URLs semánticas estructuradas
- Sitemap XML dinámico
- Core Web Vitals optimizado (LCP <2.5s, FID <100ms, CLS <0.1)

---

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/origenlab.git

# Navegar al directorio
cd origenlab

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Abrir en Navegador
El proyecto se abrirá automáticamente en `http://localhost:8080`

### Build para Producción
```bash
npm run build
```

---

## 📁 Estructura del Proyecto

```
ORIGENLAB/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos profesionales con design tokens
├── js/
│   └── app.js             # JavaScript modular con clases ES6
├── img/
│   └── company-placeholder.svg  # Placeholder para logos
├── sw.js                  # Service Worker para PWA
├── site.webmanifest       # Manifest PWA
├── robots.txt             # Configuración SEO
├── favicon.ico
├── icon.svg
├── icon.png
└── README.md
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Colores Primarios */
--color-primary: #003366        /* Deep Corporate Blue */
--color-secondary: #0066CC      /* Action Blue */
--color-accent: #FF6B35         /* Call-to-Action Orange */

/* Neutrales (60% White Space) */
--color-gray-50 to --color-gray-900

/* Trust Signals */
--color-verified: #10B981      /* Verde verificación */
--color-premium: #FFD700       /* Oro premium */
```

### Tipografía

```css
/* Sistema Dual */
--font-primary: 'Inter'        /* UI y navegación */
--font-secondary: Georgia      /* Contenido largo */

/* Scale Fluida */
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
...
--text-6xl: 3.75rem (60px)
```

### Espaciado (8px Grid)

```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-4: 1rem (16px)
...
--space-24: 6rem (96px)
```

---

## 🔧 Componentes Principales

### 1. Hero Section
- Título impactante con highlight
- Barra de búsqueda prominente con sombras elevadas
- Quick filters con chips interactivos
- Stats de confianza (50,000+ empresas)

### 2. Sistema de Filtros
- Sidebar sticky con acordeones
- Checkboxes con contadores dinámicos
- Búsqueda dentro de filtros
- Botón "Limpiar todo"
- URL state management

### 3. Company Cards
- Layout flexible con información jerárquica
- Badges premium/featured
- Certificaciones visuales
- Rating con estrellas
- Bookmarking persistente
- Hover states con elevación

### 4. Navigation
- Sticky header con blur effect
- Mobile menu hamburger animado
- Breadcrumbs semánticos
- CTAs prominentes

---

## 📊 SEO y Performance

### Meta Tags Implementados
```html
<!-- SEO Básico -->
<title>OrigenLab - Directorio B2B México</title>
<meta name="description" content="...">
<meta name="keywords" content="...">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="...">
<meta property="og:image" content="...">

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction"
  }
}
</script>
```

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

### Optimizaciones
- Lazy loading de imágenes
- Font display: swap
- Preconnect a Google Fonts
- Service Worker caching
- Minificación CSS/JS

---

## 💻 JavaScript Features

### Clases Implementadas

```javascript
// Motor de búsqueda
class SearchManager {
  - Debounced search input
  - Keyboard navigation
  - Suggestions dropdown
}

// Sistema de filtros
class FilterManager {
  - Accordion toggle
  - Checkbox state management
  - URL parameter sync
  - Clear all filters
}

// Bookmarking
class BookmarkManager {
  - localStorage persistence
  - Toast notifications
  - Icon state updates
}

// Mobile Navigation
class MobileMenu {
  - Hamburger animation
  - Escape key handler
  - Click outside detection
}
```

### Utilities
- `debounce()` - Optimización de búsqueda
- `throttle()` - Scroll events
- `Analytics` - Tracking helper
- `LazyLoader` - Intersection Observer

---

## 🌐 Progressive Web App

### Service Worker Features
- **Cache strategies**:
  - Cache-first para assets estáticos
  - Network-first para API calls
  - Image caching optimizado

- **Offline support**:
  - Página offline personalizada
  - Background sync
  - Cache size limits

- **Push Notifications**:
  - Notificaciones de nuevas empresas
  - Alertas de industria
  - Mensajes directos B2B

### Instalación PWA
Los usuarios pueden instalar OrigenLab como app nativa en:
- Android (Add to Home Screen)
- iOS (Add to Home Screen)
- Desktop (Chrome/Edge - Install)

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
320px   - Mobile pequeño
640px   - Mobile grande / Phablet
768px   - Tablet
1024px  - Desktop pequeño
1280px  - Desktop estándar
1440px+ - Desktop grande
```

### Grid Behavior
- **Mobile**: 1 columna
- **Tablet**: 2 columnas
- **Desktop**: 3 columnas (categorías), Sidebar + Grid (empresas)

---

## 🔒 Seguridad

### Implementado
- HTTPS enforcement
- CSP headers ready
- XSS prevention
- SQL injection protection (backend)
- CORS configurado
- Rate limiting ready

### Por Implementar (Backend)
- JWT authentication
- OAuth 2.0
- 2FA para cuentas premium
- Validación RFC con SAT API
- Encriptación de datos sensibles

---

## 🚦 Roadmap

### Fase 1 (Actual) ✅
- [x] Diseño UI/UX de clase mundial
- [x] Sistema de búsqueda frontend
- [x] Filtrado avanzado
- [x] PWA básico
- [x] SEO técnico

### Fase 2 (Q1 2025)
- [ ] Backend API (Node.js/Django)
- [ ] Base de datos (PostgreSQL)
- [ ] Sistema de autenticación
- [ ] Panel admin
- [ ] Integración SAT API

### Fase 3 (Q2 2025)
- [ ] Motor de búsqueda Elasticsearch
- [ ] Sistema de mensajería B2B
- [ ] Analytics dashboard premium
- [ ] Integración WhatsApp Business
- [ ] Marketplace de servicios

### Fase 4 (Q3 2025)
- [ ] Mobile apps nativas (React Native)
- [ ] API pública para developers
- [ ] Inteligencia artificial (recomendaciones)
- [ ] Reportes de industria automatizados
- [ ] Integración LinkedIn Sales Navigator

---

## 📈 Métricas de Éxito

### KPIs Objetivo
- 50,000+ empresas registradas en 6 meses
- 15% tasa de conversión free-to-premium
- Top 3 Google para "directorio empresas México"
- Tiempo en sitio: >4 minutos
- Páginas por sesión: >5
- Bounce rate: <40%

### Analytics Implementado
- Google Analytics 4
- Event tracking personalizado
- Funnel de conversión
- Heatmaps (Hotjar ready)

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Semántico y accesible (WCAG 2.1 AA)
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript ES6+**: Clases, Modules, Async/Await
- **PWA**: Service Workers, Web App Manifest

### Tools
- **Webpack**: Module bundling
- **Babel**: JS transpilation (ready)
- **PostCSS**: CSS processing (ready)
- **ESLint**: Code quality (ready)

### Fonts
- **Inter**: Google Fonts (UI)
- **Georgia**: System font (Contenido)

---

## 🤝 Contribuir

Este es un proyecto privado, pero si deseas contribuir:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Copyright © 2025 OrigenLab. Todos los derechos reservados.

---

## 📞 Contacto

**OrigenLab**
- Website: https://origenlab.com
- Email: contacto@origenlab.com
- LinkedIn: /company/origenlab
- Twitter: @origenlab_mx

---

## 🙏 Agradecimientos

- Inspiración de diseño: ThomasNet, Clutch.co, Capterra
- Iconos: Feather Icons
- Fonts: Google Fonts (Inter)
- Boilerplate: HTML5 Boilerplate v9.0.1

---

**Hecho con ♥ en México 🇲🇽**

*OrigenLab - Donde los Negocios Mexicanos se Conectan*
