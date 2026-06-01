# Sección: FAQ (`ol-faq-section`)

> Preguntas frecuentes + formulario de contacto WhatsApp. Layout 2 columnas: acordeón izquierda / formulario derecha.

---

## Estructura HTML

```html
<section class="ol-faq-section">
  <div class="ol-faq-inner">

    <!-- Encabezado con patrón ol-sh -->
    <div class="ol-sh">
      <div class="ol-sh-left">
        <span class="ol-eyebrow">Preguntas Frecuentes</span>
        <h2 class="ol-section-title">Todo lo que necesitas saber<br>antes de empezar</h2>
        <p class="ol-section-sub">Resolvemos las dudas más comunes...</p>
      </div>
      <div class="ol-sh-right">
        <p class="ol-sh-copy">Párrafo 1...</p>
        <p class="ol-sh-copy">Párrafo 2...</p>
      </div>
    </div>

    <!-- Grid 2 columnas -->
    <div class="ol-faq-grid">

      <!-- Columna 1: Acordeón -->
      <div>
        <p class="ol-faq-col-label">Preguntas frecuentes</p>
        <div class="ol-faq-list" id="ol-faq-list">

          <div class="ol-faq-item">
            <button class="ol-faq-question" data-faq="0">
              ¿Cuánto cuesta un sitio web?
              <span class="ol-faq-icon">
                <!-- SVG + (se convierte en × al abrir) -->
              </span>
            </button>
            <div class="ol-faq-answer" id="faq-ans-0">
              <p class="ol-faq-answer-inner">Respuesta...</p>
            </div>
          </div>
          <!-- Más ítems... -->

        </div>
      </div>

      <!-- Columna 2: Formulario WhatsApp -->
      <div class="ol-faq-form-wrap">
        <!-- Badge, título, subtítulo, campos, botón -->
      </div>

    </div>
  </div>
</section>
```

---

## CSS del Acordeón

```css
.ol-faq-item {
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.ol-faq-item:first-of-type { border-top: 1px solid rgba(255,255,255,0.07); }

.ol-faq-question {
  width: 100%;
  background: none; border: none;
  padding: 1.15rem 0;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 15px; font-weight: 500; color: rgba(240,240,245,0.8);
  cursor: pointer; text-align: left;
}
.ol-faq-question:hover, .ol-faq-question.active { color: #C9A84C; }

/* Ícono + → × */
.ol-faq-icon {
  width: 24px; height: 24px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, transform 0.3s;
}
.ol-faq-question.active .ol-faq-icon {
  background: rgba(201,168,76,0.1);
  border-color: rgba(201,168,76,0.3);
  transform: rotate(45deg);  /* + se convierte en × */
}

/* Respuesta (accordion) */
.ol-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
.ol-faq-answer-inner {
  font-size: 14px;
  color: rgba(240,240,245,0.55);
  line-height: 1.75;
  padding-bottom: 1.1rem;
}
```

---

## Preguntas Actuales

1. ¿Cuánto cuesta un sitio web profesional?
2. ¿Cuánto tiempo tarda el desarrollo?
3. ¿Qué incluye el servicio?
4. ¿Hacen sitios para cualquier tipo de negocio?
5. ¿Qué necesito para empezar?

---

## Fondo

```css
.ol-faq-section {
  background: var(--bg-alt, #0D0D16);
  padding: 6rem 0;
}
/* Línea dorada superior */
.ol-faq-section::before {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 50%, transparent 100%);
}
```

---

## Responsive

```css
.ol-faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
@media (max-width: 900px) {
  .ol-faq-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}
```

---

## Notas de Encabezado

- El encabezado del FAQ **usa el patrón `ol-sh`** estándar del sitio (eyebrow + section-title + section-sub + sh-copy).
- Antes usaba clases propias (`ol-faq-eyebrow`, `ol-faq-title`). Migrado a las clases globales para consistencia.
- El eyebrow antiguo tenía líneas decorativas `::before / ::after` laterales — ahora usa el pill estándar.
