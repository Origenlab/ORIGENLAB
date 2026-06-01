# Sección: Hero

> Primera sección visible del sitio. Ocupa mínimo 88vh. Componente de Astro sobreescrito con `premium-dark.css`.

---

## Clase HTML Base

El hero es un componente Astro original con clases `[data-astro-cid-bbe6dxrz]`. No tiene prefijo `ol-` porque se heredó del framework y se sobreescribió vía CSS.

```html
<section class="hero" data-astro-cid-bbe6dxrz>
  <div class="container">
    <div class="hero__inner" data-astro-cid-bbe6dxrz>

      <!-- Eyebrow -->
      <p class="hero__eyebrow" data-astro-cid-bbe6dxrz>
        Agencia de Desarrollo Web · México
      </p>

      <!-- Título principal -->
      <h1 class="hero__title" data-astro-cid-bbe6dxrz>
        Sitios web que<br>generan resultados.
      </h1>

      <!-- Subtítulo -->
      <p class="hero__sub" data-astro-cid-bbe6dxrz>
        Descripción corta, máx. 460px de ancho.
      </p>

      <!-- CTAs -->
      <div class="hero__ctas" data-astro-cid-bbe6dxrz>
        <a href="cotizar.html" class="btn btn-primary">Iniciar proyecto →</a>
        <a href="portafolio/index.html" class="btn btn-outline">Ver portafolio</a>
      </div>

      <!-- Párrafos de apoyo con borde izquierdo dorado -->
      <p class="hero__p1" data-astro-cid-bbe6dxrz>...</p>
      <p class="hero__p2" data-astro-cid-bbe6dxrz>...</p>

    </div>
  </div>
</section>
```

---

## CSS Override

```css
.hero[data-astro-cid-bbe6dxrz] {
  background: #08080E;
  min-height: 88vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
/* Gradiente dorado sutil izquierda */
.hero::before {
  background: radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 65%);
  top: -30%; left: -15%; width: 65%; height: 120%;
}
/* Gradiente azulado sutil derecha */
.hero::after {
  background: radial-gradient(ellipse at center, rgba(80,80,200,0.05) 0%, transparent 65%);
  bottom: -20%; right: -10%; width: 55%; height: 80%;
}

/* Título */
.hero__title {
  font-size: clamp(2.8rem, 6.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 1.02;
  color: #F0F0F5;
  margin-bottom: 1.5rem;
}

/* Eyebrow del hero */
.hero__eyebrow {
  display: inline-flex;
  align-items: center; gap: 0.5rem;
  color: var(--gold);
  font-size: 10.5px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1.5rem;
}

/* Párrafos con borde izquierdo dorado */
.hero__p1, .hero__p2 {
  color: rgba(240,240,245,0.4);
  font-size: 1rem;
  line-height: 1.85;
  border-left: 2px solid rgba(201,168,76,0.25);
  padding-left: 1.1rem;
  margin-bottom: 1.25rem;
}
```

---

## Notas

- El hero usa la clase `.container` (ancho 90%, max 1600px) — a diferencia del resto que usan `*-inner`.
- El eyebrow del hero es visualmente idéntico al `ol-eyebrow` pero con clase diferente.
- Los párrafos `hero__p1` / `hero__p2` están debajo de los CTAs — son texto editorial de apoyo.
- No tiene el patrón `ol-sh` — es una sección de entrada, no de contenido.
