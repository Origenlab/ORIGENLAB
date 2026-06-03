# Componente: Tarjeta de Testimonio (`ol-tc`)

> Card de reseña de cliente con estrellas, texto, avatar e info. Línea dorada decorativa en la parte superior.

---

## Estructura HTML

```html
<div class="ol-tc">

  <!-- Comilla decorativa (posición absoluta, no ocupa flujo) -->
  <div class="ol-tc-quote">"</div>

  <!-- Estrellas -->
  <div class="ol-tc-stars">
    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
  </div>

  <!-- Texto de la reseña -->
  <p class="ol-tc-text">Texto del testimonio, 2–4 líneas.</p>

  <!-- Footer: avatar + info -->
  <div class="ol-tc-footer">
    <div class="ol-tc-avatar">ER</div>
    <div class="ol-tc-info">
      <p class="ol-tc-name">Nombre Cliente</p>
      <p class="ol-tc-role">
        Cargo · <a href="https://..." class="ol-tc-link">sitio.com</a>
      </p>
    </div>
  </div>

</div>
```

---

## CSS Principal

```css
.ol-tc {
  background: #0C0C18;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
/* Línea dorada en la parte superior */
.ol-tc::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(201,168,76,0.6), rgba(201,168,76,0.15));
}
.ol-tc:hover { border-color: rgba(201,168,76,0.22); }

/* Comilla */
.ol-tc-quote {
  position: absolute; top: 1rem; right: 1.25rem;
  font-size: 3.5rem;
  color: rgba(201,168,76,0.08);
  font-family: Georgia, serif;
}

/* Estrellas */
.ol-tc-stars span { color: #C9A84C; font-size: 12px; }

/* Texto */
.ol-tc-text {
  font-size: 13.5px;
  color: rgba(240,240,245,0.62);
  line-height: 1.72;
  flex-grow: 1;
}

/* Footer */
.ol-tc-footer {
  display: flex; align-items: center; gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* Avatar con iniciales */
.ol-tc-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
  border: 1px solid rgba(201,168,76,0.22);
  border-radius: 50%;
  font-size: 11px; font-weight: 700; color: #C9A84C;
}

.ol-tc-name  { font-size: 13px; font-weight: 600; color: #F0F0F5; }
.ol-tc-role  { font-size: 11.5px; color: rgba(240,240,245,0.33); }
.ol-tc-link  { color: rgba(201,168,76,0.6); }
```

---

## Grid Contenedor

```css
.ol-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
@media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr) }
@media (max-width: 580px)  { grid-template-columns: 1fr }
```

---

## Testimonios Actuales

| Iniciales | Nombre | Empresa |
|-----------|--------|---------|
| ER | Equipo REDEIL | rentadeiluminacion.com |
| PR | Proyecto RED | proyectored.com.mx |
| EE | Equipo Eventech | eventech.mx |
| AG | Ana García | Estudio Creativo Mija |
| RS | Roberto Sánchez | Clínica Dental Sonríe |
| ML | María López | Constructora Horizonte |
| CM | Carlos Mendoza | Despacho Mendoza & Asociados |
| LV | Laura Vázquez | Moda Vázquez |

---

## Notas

- La `ol-tc-quote` usa `position: absolute` — no afecta el layout del contenido.
- El `flex-grow: 1` en `ol-tc-text` hace que el footer siempre quede al fondo de la tarjeta.
- El avatar usa las **iniciales** del nombre del cliente (2 letras).
