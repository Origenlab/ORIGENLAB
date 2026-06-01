# Sección: CTA Final (`ol-cta-final`)

> Llamada a la acción centrada al fondo del index. Fondo oscuro con brillo radial dorado.

---

## Estructura HTML

```html
<section class="ol-cta-final">
  <div class="ol-cta-final-inner">
    <h2 class="ol-cta-final-title">¿Listo para crecer<br>en línea?</h2>
    <p class="ol-cta-final-sub">Cuéntanos tu proyecto. Respuesta en menos de 24 horas.</p>
    <div class="ol-cta-final-actions">
      <a href="cotizar.html" class="ol-cta-final-primary">Iniciar proyecto →</a>
      <a href="contacto/index.html" class="ol-cta-final-secondary">Más información</a>
    </div>
  </div>
</section>
```

---

## CSS

```css
.ol-cta-final {
  background: #0C0C18;
  padding: 7rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}
/* Línea dorada superior */
.ol-cta-final::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
}
/* Brillo radial central */
.ol-cta-final::after {
  content: '';
  position: absolute; top: -40%; left: 15%; width: 70%; height: 130%;
  background: radial-gradient(ellipse at center, rgba(201,168,76,0.055) 0%, transparent 60%);
}

/* Contenedor máximo 760px centrado */
.ol-cta-final-inner {
  width: 90%; max-width: 760px;
  margin: 0 auto;
  position: relative; z-index: 1;
}

/* Título */
.ol-cta-final-title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 900;
  color: #F0F0F5;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1.25rem;
}

/* Subtítulo */
.ol-cta-final-sub {
  font-size: 1.0625rem;
  color: rgba(240,240,245,0.48);
  line-height: 1.75;
  margin: 0 0 3rem;
}

/* Botón primario (dorado) */
.ol-cta-final-primary {
  background: #C9A84C;
  color: #08080E;
  font-size: 15px; font-weight: 700;
  padding: 0.95rem 2.25rem;
  border-radius: 10px;
}
.ol-cta-final-primary:hover {
  background: #E4C26B;
  box-shadow: 0 8px 32px rgba(201,168,76,0.35);
  transform: translateY(-1px);
}

/* Botón secundario (outline) */
.ol-cta-final-secondary {
  background: transparent;
  color: rgba(240,240,245,0.65);
  border: 1px solid rgba(255,255,255,0.12);
  font-size: 15px; font-weight: 500;
  padding: 0.95rem 2.25rem;
  border-radius: 10px;
}
.ol-cta-final-secondary:hover {
  border-color: rgba(201,168,76,0.35);
  color: #C9A84C;
}
```

---

## Notas

- Usa `max-width: 760px` en lugar de los 1600px estándar — para mantener el copy compacto y centrado.
- Es la única sección del index con `text-align: center` y sin `ol-sh`.
- `padding: 7rem 0` — más generoso que el estándar de 6rem para darle peso visual al cierre.
- En móvil `< 480px` los botones se apilan en columna con `align-items: stretch`.
