# SISTEMA PROFESIONAL DE GESTIÓN DE EMPRESAS - ORIGENLAB

## Framework Completo: Perfiles y Cards

**Versión:** 5.0 Professional Edition
**Última actualización:** 23 Noviembre 2025
**Nivel:** Enterprise Implementation
**Status:** Production Ready ✅

---

## 📋 TABLA DE CONTENIDOS

### [PARTE I: GUÍA COMPLETA DE PERFILES](#parte-i-guía-completa-de-perfiles)
- [Paso 1: Leer archivo de referencia](#paso-1-leer-archivo-de-referencia-obligatorio)
- [Paso 2: Estructura del hero section](#paso-2-estructura-del-hero-section)
- [Paso 3: Servicios grid](#paso-3-servicios-grid-6-servicios)
- [Paso 4: Sección "Sobre"](#paso-4-sección-sobre-con-background)
- [Paso 5: Info compacta](#paso-5-información-compacta-3-columnas)
- [Paso 6: FAQ](#paso-6-faq-con-details-y-summary)
- [Paso 7: CTA final](#paso-7-cta-final-con-gradient)
- [Paso 8: Footer y sidebar](#paso-8-footer-y-sidebar)
- [Checklist de validación](#checklist-de-validación-perfil)

### [PARTE II: COMPANY CARDS](#parte-ii-company-cards)
- [Verificar si la card ya existe](#paso-1-verificar-si-la-card-ya-existe)
- [Template de card](#paso-2-template-de-card)
- [Checklist de validación](#checklist-de-validación-card)

### [PARTE III: ARCHIVOS DE REFERENCIA](#parte-iii-archivos-de-referencia)
- [Archivos perfectos validados](#archivos-de-referencia-100-validados)

---

# PARTE I: GUÍA COMPLETA DE PERFILES

## ⚠️ REGLA DE ORO #1: SIEMPRE LEER REFERENCIA PRIMERO

**ANTES de crear cualquier perfil, DEBES:**

1. Leer el archivo de referencia completo
2. Entender la estructura exacta
3. Copiar el patrón, NO inventar

---

## PASO 1: Leer Archivo de Referencia (OBLIGATORIO)

### 📖 Comando para leer la referencia perfecta:

```bash
# SIEMPRE leer primero este archivo:
cat /categorias/fiestas-infantiles/mesas-de-dulces.html
```

### ✅ QUÉ buscar en la referencia:

1. **Estructura del `<head>`** (líneas 1-59)
   - Orden exacto de los CSS
   - Path correcto: `../eventos/perfil-empresa.css`
   - Schema.org completo

2. **Header y breadcrumbs** (líneas 64-90)
   - Estructura de navegación
   - nav-wrapper con logo

3. **Hero section** (líneas 93-159)
   - perfil-hero-grid con 2 columnas
   - perfil-imagen a la IZQUIERDA
   - perfil-header-info a la DERECHA
   - 4 stat-boxes
   - 2 botones CTA

4. **Layout con sidebar** (líneas 162-449)
   - Container con perfil-layout
   - perfil-main-content (izquierda)
   - perfil-sidebar (derecha)

5. **Secciones del contenido:**
   - Servicios grid (6 servicios)
   - Sobre con background gris
   - Info compacta (3 columnas)
   - FAQ con `<details>`
   - CTA con gradient
   - Footer con 5 columnas

---

## PASO 2: Estructura del Hero Section

### 📐 Estructura EXACTA (copiar de mesas-de-dulces.html líneas 93-159):

```html
<!-- Hero Section - Perfil de Empresa -->
<section class="perfil-hero">
  <div class="container">
    <div class="perfil-hero-grid">

      <!-- COLUMNA IZQUIERDA: Imagen -->
      <div class="perfil-imagen">
        <img src="../../img/eventos/[IMAGEN].webp" alt="[EMPRESA] - [SERVICIO]">
        <span class="verified-badge">✓ Verificado</span>
      </div>

      <!-- COLUMNA DERECHA: Info -->
      <div class="perfil-header-info">
        <h1>[EMPRESA_NOMBRE]</h1>
        <a href="[URL]" target="_blank" rel="noopener noreferrer" class="perfil-website">[DOMINIO]</a>

        <!-- Rating -->
        <div class="perfil-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-number">[RATING]</span>
          <span class="reviews-count">([NUM] reseñas)</span>
        </div>

        <!-- Descripción -->
        <p class="perfil-descripcion-corta">
          [DESCRIPCION_2_3_PARRAFOS]
        </p>

        <!-- Stats (4 cajas) -->
        <div class="perfil-stats">
          <div class="stat-box">
            <div class="stat-box-number">[NUMERO]</div>
            <div class="stat-box-label">[LABEL]</div>
          </div>
          <!-- Repetir 3 veces más -->
        </div>

        <!-- Botones -->
        <div class="perfil-ctas">
          <a href="tel:+52[TELEFONO]" class="btn-contact btn-contact-primary">
            [SVG_PHONE]
            Llamar
          </a>
          <a href="https://wa.me/52[TELEFONO]" target="_blank" rel="noopener noreferrer" class="btn-contact btn-contact-secondary">
            [SVG_WHATSAPP]
            WhatsApp
          </a>
        </div>

      </div>
    </div>
  </div>
</section>
```

### ⚠️ ERRORES COMUNES EN HERO:

❌ **MAL:** Poner info a la izquierda e imagen a la derecha
✅ **BIEN:** Imagen izquierda, info derecha

❌ **MAL:** Usar `perfil-contacto-box` en el hero
✅ **BIEN:** Solo `perfil-imagen` y `perfil-header-info`

❌ **MAL:** Poner 3 stat-boxes
✅ **BIEN:** Exactamente 4 stat-boxes

---

## PASO 3: Servicios Grid (6 servicios)

### 📐 Estructura EXACTA (ver mesas-de-dulces.html líneas 169-236):

```html
<!-- Contenido Principal con Sidebar -->
<div class="container" style="padding: var(--space-lg) var(--space-md);">
  <div class="perfil-layout">

    <!-- Contenido Principal -->
    <div class="perfil-main-content">

      <!-- Servicios -->
      <section class="perfil-section">
        <h2 class="perfil-section-title">[TITULO_SERVICIOS]</h2>

        <div class="servicios-grid">

          <div class="servicio-card">
            <div class="servicio-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                [PATH_SVG]
              </svg>
            </div>
            <h3 class="servicio-titulo">[SERVICIO_1]</h3>
            <p class="servicio-descripcion">[DESCRIPCION_1]</p>
          </div>

          <!-- Repetir 5 veces más para total de 6 servicios -->

        </div>
      </section>
```

### ⚠️ ERRORES COMUNES EN SERVICIOS:

❌ **MAL:** Usar emojis en servicio-icon
✅ **BIEN:** Usar SVG icons (copiar de mesas-de-dulces.html)

❌ **MAL:** Poner 5 servicios
✅ **BIEN:** Exactamente 6 servicios

---

## PASO 4: Sección "Sobre" (CON BACKGROUND)

### 📐 Estructura EXACTA (ver mesas-de-dulces.html líneas 238-294):

```html
<!-- Sobre [EMPRESA] -->
<section class="perfil-section compact" style="background: var(--color-surface); margin: 0 calc(-1 * var(--space-md)); padding-left: var(--space-md); padding-right: var(--space-md);">
  <h2 class="perfil-section-title">Sobre [EMPRESA]</h2>

  <div class="sobre-contenido">
    <p>
      Con más de <strong>[AÑOS]+ años de experiencia</strong> en el mercado, [EMPRESA] se ha consolidado como...
    </p>
    <p>
      [PARRAFO_2]
    </p>
    <p>
      [PARRAFO_3]
    </p>

    <h3 class="porque-elegirnos-titulo">¿Por qué elegirnos?</h3>

    <div class="razones-grid">
      <div class="razon-item">
        <div class="razon-check">✓</div>
        <div class="razon-texto">
          <strong>[RAZON_1]</strong> [descripcion]
        </div>
      </div>
      <!-- Repetir 5 veces más para total de 6 razones -->
    </div>
  </div>
</section>
```

### ⚠️ ERRORES COMUNES EN "SOBRE":

❌ **MAL:** `<section class="perfil-section">`
✅ **BIEN:** `<section class="perfil-section compact" style="background: var(--color-surface); margin: 0 calc(-1 * var(--space-md)); padding-left: var(--space-md); padding-right: var(--space-md);">`

❌ **MAL:** Poner 4 razones
✅ **BIEN:** Exactamente 6 razones con checkmarks

---

## PASO 5: Información Compacta (3 columnas)

### 📐 Estructura EXACTA (ver mesas-de-dulces.html líneas 296-350):

```html
<!-- Información Compacta -->
<section class="perfil-section compact">
  <h2 class="perfil-section-title">[TITULO_INFO]</h2>

  <div class="info-compacta-grid">

    <!-- Columna 1: Contacto -->
    <div class="info-compacta-columna">
      <h3>Contacto</h3>
      <div class="contacto-item-compacto">
        <strong>Teléfono</strong>
        <a href="tel:+52[TELEFONO]">[TELEFONO_FORMATEADO]</a>
      </div>
      <div class="contacto-item-compacto">
        <strong>WhatsApp</strong>
        <a href="https://wa.me/52[TELEFONO]" target="_blank" rel="noopener">[TELEFONO]</a>
      </div>
      <div class="contacto-item-compacto">
        <strong>Email</strong>
        <a href="mailto:[EMAIL]">[EMAIL]</a>
      </div>
      <div class="contacto-item-compacto">
        <strong>Horario</strong>
        <div>[HORARIO]</div>
      </div>
    </div>

    <!-- Columna 2 -->
    <div class="info-compacta-columna">
      <h3>[TITULO_COLUMNA_2]</h3>
      <ul class="info-compacta-lista">
        <li>[ITEM_1]</li>
        <li>[ITEM_2]</li>
        <!-- etc -->
      </ul>
    </div>

    <!-- Columna 3 -->
    <div class="info-compacta-columna">
      <h3>[TITULO_COLUMNA_3]</h3>
      <ul class="info-compacta-lista">
        <li>[ITEM_1]</li>
        <li>[ITEM_2]</li>
        <!-- etc -->
      </ul>
    </div>

  </div>
</section>
```

### ⚠️ ERRORES COMUNES EN INFO COMPACTA:

❌ **MAL:** Usar `info-compacta-item`
✅ **BIEN:** Usar `info-compacta-columna`

❌ **MAL:** Poner 2 columnas
✅ **BIEN:** Exactamente 3 columnas

---

## PASO 6: FAQ (con `<details>` y `<summary>`)

### 📐 Estructura EXACTA (ver mesas-de-dulces.html líneas 352-387):

```html
<!-- FAQ -->
<section class="perfil-section">
  <h2 class="perfil-section-title" style="text-align: center;">Preguntas Frecuentes</h2>

  <div class="faq-compacto">

    <details class="faq-item-compacto">
      <summary class="faq-pregunta">[PREGUNTA_1]</summary>
      <div class="faq-respuesta">
        <p>[RESPUESTA_1]</p>
      </div>
    </details>

    <details class="faq-item-compacto">
      <summary class="faq-pregunta">[PREGUNTA_2]</summary>
      <div class="faq-respuesta">
        <p>[RESPUESTA_2]</p>
      </div>
    </details>

    <!-- Mínimo 4 FAQs -->

  </div>
</section>
```

### ⚠️ ERRORES COMUNES EN FAQ:

❌ **MAL:** Usar `<div class="faq-item">`
✅ **BIEN:** Usar `<details class="faq-item-compacto">`

❌ **MAL:** Poner 3 FAQs
✅ **BIEN:** Mínimo 4 FAQs

---

## PASO 7: CTA Final (CON GRADIENT)

### 📐 Estructura EXACTA (ver mesas-de-dulces.html líneas 451-505):

```html
<!-- CTA Final -->
<section class="cta-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 0; text-align: center;">
  <div class="container" style="max-width: 900px;">
    <div style="background: rgba(255,255,255,0.98); border-radius: 16px; padding: 3rem 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">

      <h2 style="font-size: 2rem; font-weight: 700; color: #1a202c; margin: 0 0 1rem 0; line-height: 1.3;">
        [CTA_TITULO]
      </h2>

      <p style="font-size: 1.125rem; color: #4a5568; margin: 0 0 2rem 0; line-height: 1.6; max-width: 700px; margin-left: auto; margin-right: auto;">
        [CTA_DESCRIPCION]
      </p>

      <div class="cta-botones" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
        <a href="https://wa.me/52[TELEFONO]" target="_blank" rel="noopener noreferrer" class="cta-btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #25D366; color: white; padding: 1rem 2rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; font-size: 1.0625rem; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);">
          [SVG_WHATSAPP]
          Cotizar por WhatsApp
        </a>
        <a href="tel:+52[TELEFONO]" class="cta-btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #667eea; color: white; padding: 1rem 2rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; font-size: 1.0625rem; box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);">
          [SVG_PHONE]
          Llamar Ahora
        </a>
      </div>

      <div style="display: flex; gap: 2rem; justify-content: center; align-items: center; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #2d3748; font-size: 0.9375rem; font-weight: 500;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>[BADGE_1]</span>
        </div>
        <!-- Repetir 2 veces más para 3 badges -->
      </div>

    </div>
  </div>
</section>
```

### ⚠️ ERRORES COMUNES EN CTA:

❌ **MAL:** Sin gradient en el background
✅ **BIEN:** `style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"`

❌ **MAL:** Botones sin inline styles
✅ **BIEN:** Copiar estilos inline exactos de la referencia

---

## PASO 8: Footer y Sidebar

### 📐 Footer (ver mesas-de-dulces.html líneas 507-590):

```html
<!-- Footer -->
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-main">
      <div class="footer-column footer-brand">
        <div class="footer-logo">
          <a href="../../index.html">
            <img src="../../img/origenlab.webp" alt="OrigenLab" width="160" height="36" style="object-fit: contain; filter: brightness(0) invert(1);">
          </a>
        </div>
        <p class="footer-tagline">Donde los Negocios Mexicanos se Conectan</p>
        <div class="footer-social">
          [SOCIAL_LINKS_SVG]
        </div>
      </div>

      <!-- 4 columnas más de footer -->
      <div class="footer-column">
        <h3 class="footer-column-title">Categorías</h3>
        [LINKS]
      </div>
      <!-- Repetir para: Empresa, Para Empresas, Legal -->

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
```

### 📐 Sidebar (ver mesas-de-dulces.html líneas 392-445):

```html
<!-- Sidebar -->
<aside class="perfil-sidebar">

  <!-- Empresas Relacionadas -->
  <div class="sidebar-widget">
    <h3 class="sidebar-widget-title">Empresas Relacionadas</h3>

    <a href="[EMPRESA].html" class="empresa-relacionada">
      <div class="empresa-relacionada-nombre">[NOMBRE]</div>
      <div class="empresa-relacionada-desc">⭐ [RATING] • [DESCRIPCION]</div>
    </a>
    <!-- Repetir 3-4 veces -->

  </div>

  <!-- Artículos Relacionados -->
  <div class="sidebar-widget">
    <h3 class="sidebar-widget-title">Artículos Relacionados</h3>

    <a href="../../blog/[ARTICULO].html" class="articulo-relacionado">
      <div class="articulo-titulo">[TITULO]</div>
      <div class="articulo-fecha">[FECHA]</div>
    </a>
    <!-- Repetir 3-4 veces -->

  </div>

</aside>
```

---

## CHECKLIST DE VALIDACIÓN PERFIL

### ✅ Estructura HTML

```yaml
head:
  ✓ CSS en orden correcto
  ✓ perfil-empresa.css con path: ../eventos/perfil-empresa.css
  ✓ Schema.org LocalBusiness completo
  ✓ Open Graph completo

hero:
  ✓ perfil-hero-grid
  ✓ perfil-imagen (izquierda)
  ✓ perfil-header-info (derecha)
  ✓ 4 stat-boxes
  ✓ 2 botones CTA

layout:
  ✓ Container con perfil-layout
  ✓ perfil-main-content
  ✓ perfil-sidebar

secciones:
  ✓ 6 servicios en servicios-grid
  ✓ Sobre con background y 6 razones
  ✓ Info compacta con 3 columnas
  ✓ FAQ con mínimo 4 details
  ✓ CTA con gradient
  ✓ Footer con 5 columnas (footer-brand + 4)
  ✓ Sidebar con empresas y artículos
```

### ✅ Validación Rápida por Comando

```bash
# 1. Verificar CSS path
grep -n 'perfil-empresa.css' categorias/[categoria]/[archivo].html
# Debe mostrar: ../eventos/perfil-empresa.css

# 2. Verificar servicios
grep -c 'servicio-card' categorias/[categoria]/[archivo].html
# Debe ser: 6

# 3. Verificar razones
grep -c 'razon-item' categorias/[categoria]/[archivo].html
# Debe ser: 6

# 4. Verificar FAQs
grep -c '<details class="faq-item-compacto"' categorias/[categoria]/[archivo].html
# Debe ser: >= 4

# 5. Verificar gradient en CTA
grep 'linear-gradient' categorias/[categoria]/[archivo].html
# Debe encontrarse

# 6. Verificar columnas de footer
grep -c 'footer-column' categorias/[categoria]/[archivo].html
# Debe ser: 5
```

---

# PARTE II: COMPANY CARDS

## PASO 1: Verificar si la card ya existe

**ANTES de crear una card, VERIFICA si ya existe:**

```bash
# Buscar en el archivo de categoría
grep -n "[NOMBRE_EMPRESA]" categorias/[categoria].html
```

### ✅ Si la card YA EXISTE:

- **NO crear nueva card**
- Solo verificar que tenga la estructura correcta
- Actualizar datos si es necesario

### ✅ Si la card NO EXISTE:

- Continuar con el paso 2

---

## PASO 2: Template de Card

### 📐 Estructura EXACTA de Card:

Ver ejemplo en `/categorias/fiestas-infantiles.html` líneas 430-492 (Renta de Inflables CDMX)

```html
<!-- Company Card: [EMPRESA_NOMBRE] -->
<div class="company-card-enhanced">
  <div class="company-card-image">
    <img src="../img/eventos/[IMAGEN].webp" alt="[EMPRESA] - [SERVICIO]" loading="lazy">
    <span class="verified-badge">✓ Verificado</span>
  </div>
  <div class="company-card-body">
    <div class="company-card-header">
      <h3 class="company-card-title">[EMPRESA_NOMBRE]</h3>
      <a href="[URL_WEBSITE]" target="_blank" rel="noopener noreferrer" class="company-website-link">[DOMINIO]</a>
      <div class="company-rating">
        <span class="stars">★★★★★</span>
        <span class="rating-number">[RATING]</span>
        <span class="reviews-count">([NUM] reseñas)</span>
      </div>
    </div>

    <div class="company-card-services">
      <span class="service-tag">[TAG_1]</span>
      <span class="service-tag">[TAG_2]</span>
      <span class="service-tag">[TAG_3]</span>
      <span class="service-tag">[TAG_4]</span>
    </div>

    <p class="company-card-description">
      [DESCRIPCION_2_3_LINEAS_CON_KEYWORDS]
    </p>

    <div class="company-card-info">
      <div class="info-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>[UBICACION_CORTA]</span>
      </div>
      <div class="info-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <a href="tel:+52[TELEFONO]" class="contact-link">[TELEFONO_FORMATEADO]</a>
      </div>
    </div>

    <div class="company-card-actions">
      <a href="tel:+52[TELEFONO]" class="btn-contact btn-contact-primary">
        [SVG_PHONE]
        Llamar
      </a>
      <a href="https://wa.me/52[TELEFONO]" target="_blank" rel="noopener noreferrer" class="btn-contact btn-contact-secondary">
        [SVG_WHATSAPP]
        WhatsApp
      </a>
      <a href="[categoria]/[empresa-slug].html" class="btn-contact btn-contact-secondary">
        Ver Perfil
      </a>
    </div>
  </div>
</div>
```

---

## CHECKLIST DE VALIDACIÓN CARD

```yaml
estructura:
  ✓ company-card-enhanced
  ✓ company-card-image con loading="lazy"
  ✓ verified-badge "✓ Verificado"
  ✓ company-rating con estrellas
  ✓ 4 service-tags
  ✓ company-card-description (2-3 líneas)
  ✓ 2 info-items (ubicación + teléfono)
  ✓ 3 botones (Llamar, WhatsApp, Ver Perfil)

enlaces:
  ✓ Website con target="_blank" rel="noopener noreferrer"
  ✓ WhatsApp con target="_blank" rel="noopener noreferrer"
  ✓ Ver Perfil con ruta correcta: [categoria]/[empresa].html
```

---

# PARTE III: ARCHIVOS DE REFERENCIA

## ARCHIVOS DE REFERENCIA 100% VALIDADOS

### ✅ Perfiles HTML Perfectos:

1. **`/categorias/fiestas-infantiles/mesas-de-dulces.html`**
   - Empresa: Dulciparty
   - Rating: 4.8★ (528 reseñas)
   - **USAR COMO REFERENCIA PRINCIPAL**

2. **`/categorias/fiestas-infantiles/inflables-para-fiestas.html`**
   - Empresa: INFLAPY
   - Rating: 4.9★ (342 reseñas)
   - Estructura validada

3. **`/categorias/fiestas-infantiles/renta-de-inflables-cdmx.html`**
   - Empresa: Renta de Inflables CDMX
   - Rating: 4.8★ (486 reseñas)
   - Estructura validada

### ✅ Página de Categoría con Cards:

**`/categorias/fiestas-infantiles.html`**
- Ver líneas 430-492 para ejemplo perfecto de card
- Card de "Renta de Inflables CDMX"

---

## 🎯 REGLAS DE ORO (NUNCA OLVIDAR)

### 1. SIEMPRE leer el archivo de referencia COMPLETO antes de empezar

```bash
cat /categorias/fiestas-infantiles/mesas-de-dulces.html
```

### 2. SIEMPRE usar CSS path correcto

```html
<link rel="stylesheet" href="../eventos/perfil-empresa.css">
```

### 3. SIEMPRE verificar que la card NO exista antes de crear

```bash
grep -n "[EMPRESA]" categorias/[categoria].html
```

### 4. SIEMPRE usar estructura exacta del hero

- Imagen izquierda
- Info derecha
- 4 stat-boxes
- 2 botones CTA

### 5. SIEMPRE 6 servicios, 6 razones, 3 columnas info

### 6. SIEMPRE `<details>` y `<summary>` para FAQ

### 7. SIEMPRE gradient en CTA

```html
style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
```

### 8. SIEMPRE 5 columnas en footer (footer-brand + 4)

### 9. SIEMPRE sidebar con empresas y artículos relacionados

### 10. SIEMPRE validar con checklist antes de finalizar

---

## 📞 WORKFLOW COMPLETO PASO A PASO

### CREAR PERFIL DE EMPRESA:

1. ✅ Leer `/categorias/fiestas-infantiles/mesas-de-dulces.html` completo
2. ✅ Copiar estructura exacta
3. ✅ Reemplazar datos de la empresa
4. ✅ Verificar 6 servicios
5. ✅ Verificar 6 razones con checks
6. ✅ Verificar 3 columnas info compacta
7. ✅ Verificar mínimo 4 FAQs con `<details>`
8. ✅ Verificar gradient en CTA
9. ✅ Verificar 5 columnas footer
10. ✅ Guardar como: `/categorias/[categoria]/[empresa-slug].html`

### VERIFICAR/CREAR CARD:

1. ✅ Buscar si ya existe: `grep -n "[EMPRESA]" categorias/[categoria].html`
2. ✅ Si existe: NO crear nueva, solo verificar
3. ✅ Si NO existe: Copiar template de líneas 430-492 de fiestas-infantiles.html
4. ✅ Insertar en `<div class="companies-grid">`
5. ✅ Actualizar contador de empresas

---

## 🚫 ERRORES FATALES A EVITAR

### ERROR #1: NO leer referencia completa
- ❌ Inventar estructura
- ✅ Copiar de mesas-de-dulces.html

### ERROR #2: CSS path incorrecto
- ❌ `href="perfil-empresa.css"`
- ❌ `href="../../eventos/perfil-empresa.css"`
- ✅ `href="../eventos/perfil-empresa.css"`

### ERROR #3: Hero sin perfil-hero-grid
- ❌ Usar perfil-contacto-box en hero
- ✅ Usar perfil-imagen + perfil-header-info

### ERROR #4: Sección "Sobre" sin background
- ❌ `<section class="perfil-section">`
- ✅ `<section class="perfil-section compact" style="background: var(--color-surface); ...">`

### ERROR #5: FAQ sin `<details>`
- ❌ `<div class="faq-item">`
- ✅ `<details class="faq-item-compacto">`

### ERROR #6: CTA sin gradient
- ❌ `<section class="cta-section">`
- ✅ `<section class="cta-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">`

### ERROR #7: Footer con 3 columnas
- ❌ Solo 3 columnas
- ✅ 5 columnas (footer-brand + 4 más)

### ERROR #8: Crear card cuando ya existe
- ❌ Duplicar cards
- ✅ Verificar primero con grep

### ERROR #9: Número incorrecto de elementos
- ❌ 5 servicios, 4 razones, 2 columnas info
- ✅ 6 servicios, 6 razones, 3 columnas info

### ERROR #10: No usar sidebar
- ❌ Solo perfil-main-content
- ✅ perfil-layout con main-content + sidebar

---

## 📊 VALIDACIÓN FINAL

### Antes de considerar el trabajo terminado:

```bash
# 1. Verificar que el archivo existe
ls -lh categorias/[categoria]/[empresa].html

# 2. Ejecutar todos los comandos de validación
grep -n 'perfil-empresa.css' categorias/[categoria]/[empresa].html
grep -c 'servicio-card' categorias/[categoria]/[empresa].html  # = 6
grep -c 'razon-item' categorias/[categoria]/[empresa].html  # = 6
grep -c '<details class="faq-item-compacto"' categorias/[categoria]/[empresa].html  # >= 4
grep 'linear-gradient' categorias/[categoria]/[empresa].html
grep -c 'footer-column' categorias/[categoria]/[empresa].html  # = 5

# 3. Abrir en navegador y verificar visualmente
open categorias/[categoria]/[empresa].html
```

### Checklist visual:

- [ ] Hero con imagen izquierda e info derecha
- [ ] 4 stat-boxes visibles
- [ ] 6 servicios en grid
- [ ] Sección "Sobre" con fondo gris
- [ ] 6 checkmarks verdes en razones
- [ ] 3 columnas en info compacta
- [ ] FAQs se expanden al hacer click
- [ ] CTA con gradiente morado-azul
- [ ] Footer con 5 columnas
- [ ] Sidebar a la derecha con empresas y artículos

---

**© 2025 OrigenLab - Sistema de Gestión de Empresas v5.0**
**Professional Edition - Production Ready ✅**
