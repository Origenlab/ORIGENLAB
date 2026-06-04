# SPEC — Artículos L6 "Equipo para Eventos" (Perfil + Guía de servicios)

Generas un archivo **Python** `data_<letra>.py` con una lista `ARTICLES = [ {...}, ... ]`.
El generador (`build_articles.py`) construye TODO el chrome (head, menú, hero, share, sidebar, footer). **Tú solo aportas datos + el HTML del cuerpo del artículo.** No escribas `<head>`, `<header>`, `<footer>` ni `<style>`: eso lo pone el generador.

Cada empresa → **2 artículos**: `perfil` (qué es y quién es la empresa) y `guia` (guía de sus servicios a detalle). 

## Reglas DURAS (rompe cualquiera = trabajo inválido)
1. **CERO precios / cifras de dinero.** Nunca "$", "desde $X", "económico/barato/precio".
2. **CERO plazos de entrega** ("en 2 semanas", "entrega en X días"). Permitido hablar de tiempos de respuesta del cliente si son reales (ej. "cotización en 24h" de EVENTECH) pero evítalo si no es dato real.
3. **Nunca escribas "SEO"** en texto visible.
4. Un solo `<h1>` por página (lo pone el generador en el hero). En el cuerpo usa **solo h2/h3/h4**.
5. No inventes datos (teléfonos, años, # de eventos, direcciones). Usa solo los datos de este SPEC. Si un campo no está, omítelo.
6. El artículo habla de **la empresa cliente y sus servicios** (no de OrigenLab). Tono profesional, cálido, en español de México, 2ª/3ª persona.
7. Párrafos **amplios** (4–6 líneas reales), listados de interés (`<ul>`), y **tablas comparativas** (`<div class="ol-art-table-wrap"><table>…`).

## Esquema del dict (todos los campos obligatorios salvo nota)
```python
{
 "slug": "boldis-perfil",                 # carpeta blog/<slug>/
 "accent": "#E63946", "accD": "#B32C36", "accL": "#FF4757", "accRGB": "230,57,70",
 "title": "BOLDIS: bolas disco e iluminación para eventos en CDMX | OrigenLab",  # <title>, termina en " | OrigenLab"
 "meta": "Perfil de BOLDIS, especialista en renta de bolas disco e iluminación para eventos en CDMX y Estado de México. Servicios, catálogo y contacto.",  # 150–165 car, sin comillas dobles internas
 "about": "Renta de bolas disco e iluminación para eventos",  # JSON-LD about
 "h1_json": "\"BOLDIS: bolas disco e iluminación para eventos en CDMX\"",  # string JSON con comillas escapadas, sin pipe de OrigenLab
 "date": "2026-06-04",
 "breadcrumb": "Perfil: BOLDIS",          # corto
 "cat": "Equipo para Eventos · CDMX",
 "read": "8 min de lectura",
 "h1": "BOLDIS: bolas disco e iluminación en CDMX",  # hero h1 CORTO (~max 60 car)
 "excerpt": "Todo sobre BOLDIS: qué renta, su catálogo de bolas disco e iluminación, zona de cobertura en CDMX y Estado de México, y cómo contratar su servicio con instalación incluida.",
 "share_text": "BOLDIS: bolas disco e iluminación para eventos en CDMX",
 "toc": [("empresa","Quiénes son"), ("servicios","Servicios"), ("porque","Por qué elegirlos"), ("cobertura","Cobertura"), ("contacto","Contacto"), ("contratar","Cómo contratar"), ("faq","Preguntas frecuentes")],  # ids DEBEN existir como h2 id="..." en el body
 "body": "<h2 id=\"empresa\">…</h2>…",     # HTML del cuerpo (ver skeletons)
 "related": [("/blog/boldis-guia-servicios/","Guía de servicios de BOLDIS"),
             ("/portafolio/equipo-para-eventos/boldis/","BOLDIS — caso de estudio"),
             ("/portafolio/equipo-para-eventos/","Equipo para Eventos — sector")],
 "next_url": "/blog/boldis-guia-servicios/",
 "next_title": "Guía de servicios de BOLDIS →",
}
```
Para el artículo `guia`, `related[0]` y `next_url` apuntan al `perfil` (recíproco), `breadcrumb`="Guía: BOLDIS", toc/ids según su skeleton.

## Clases disponibles (ya estilizadas con el acento por el generador)
- `<p class="lead">` primer párrafo destacado.
- `<div class="ol-art-stat-row"><div class="ol-art-stat"><div class="ol-art-stat-num">+1,500<span>★</span></div><div class="ol-art-stat-label">Eventos</div></div>…</div>` (2–3 stats, solo datos reales; usa emoji o número).
- Tabla: `<div class="ol-art-table-wrap"><table><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table></div>`
- CTA inline (usa tel real si existe, si no enlaza al caso):
```
<div class="ol-art-cta-inline">
  <div><p class="ol-art-cta-inline-label">¿Lo necesitas en tu evento?</p>
  <h3>Contacta a BOLDIS</h3><p>Renta de bolas disco e iluminación con instalación incluida.</p></div>
  <a href="tel:+52..." class="ol-art-cta-inline-btn"><svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 12 19.79 19.79 0 0 1 .38 3.38 2 2 0 0 1 2.38 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.35a16 16 0 0 0 6.29 6.29l1.41-1.41a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Llamar ahora</a>
</div>
```
  Si NO hay teléfono real: cambia el `<a href="/portafolio/equipo-para-eventos/<slug>/" class="ol-art-cta-inline-btn">…Ver caso de estudio</a>` (sin svg de teléfono; usa flecha → o quítalo).
- Contact card (solo datos reales; omite bloques sin dato):
```
<div class="ol-art-contact-card"><h3>Información de contacto — BOLDIS</h3>
<div class="ol-art-contact-grid">
  <div class="ol-art-contact-block"><span class="ol-art-contact-label">Empresa</span><span class="ol-art-contact-val">BOLDIS</span><span class="ol-art-contact-sub">Bolas disco e iluminación · CDMX</span></div>
  <div class="ol-art-contact-block"><span class="ol-art-contact-label">Correo</span><a href="mailto:contacto@boldis.com.mx" class="ol-art-contact-link">contacto@boldis.com.mx</a></div>
  <div class="ol-art-contact-block"><span class="ol-art-contact-label">Caso de estudio</span><a href="/portafolio/equipo-para-eventos/boldis/" class="ol-art-contact-link">Ver caso completo</a></div>
  <div class="ol-art-contact-block"><span class="ol-art-contact-label">Cobertura</span><span class="ol-art-contact-val">CDMX y Estado de México</span></div>
  <div class="ol-art-contact-block"><span class="ol-art-contact-label">Servicio</span><span class="ol-art-contact-val">Renta y venta · instalación incluida</span></div>
</div></div>
```
- Pasos numerados: `<ol><li><strong>Paso.</strong> texto…</li>…</ol>` (el generador los numera con círculos del acento).
- FAQ: 5–6 ítems:
```
<div class="ol-art-faq">
<details class="ol-art-faq-item"><summary class="ol-art-faq-q">¿Pregunta? <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></summary><div class="ol-art-faq-a"><p>Respuesta…</p></div></details>
…
</div>
```
- `<blockquote><p>"…"</p></blockquote>` para un destacado.
- Listas de interés: `<ul><li>…</li></ul>`.

## Skeleton PERFIL (secciones h2 con esos ids; usa h3/h4 dentro)
1. `<h2 id="empresa">Quiénes son …</h2>` + `<p class="lead">` + 2–3 párrafos amplios + stat-row.
2. `<h2 id="servicios">Servicios …</h2>` + intro + **tabla** (Servicio | Qué incluye | Ideal para) + h3 con 1–2 párrafos + cta-inline.
3. `<h2 id="porque">Por qué elegir a …</h2>` + párrafos + blockquote.
4. `<h2 id="cobertura">Zona de cobertura</h2>` + párrafos + `<ul>` de zonas/usos.
5. `<h2 id="contacto">Datos de contacto</h2>` + intro + contact-card.
6. `<h2 id="contratar">Cómo contratar el servicio</h2>` + `<ol>` 3–4 pasos.
7. `<h2 id="faq">Preguntas frecuentes</h2>` + faq (5–6).

## Skeleton GUÍA (más enfocado al catálogo/servicios)
1. `<h2 id="panorama">Qué ofrece … </h2>` + lead + párrafos + stat-row.
2. `<h2 id="lineas">Líneas de servicio</h2>` + intro + **un `<h3>` por línea** (las 6 líneas reales) cada uno con `<h4>` opcional y 1 párrafo + un `<ul>`; cierra con **tabla** (Línea | Qué incluye | Para qué evento).
3. `<h2 id="comparativa">Comparativa de opciones</h2>` + **tabla comparativa** (compara líneas/paquetes/configuraciones por criterios) + párrafo.
4. `<h2 id="eventos">Para qué eventos sirve</h2>` + **tabla** (Tipo de evento | Línea recomendada | Por qué) + `<ul>`.
5. `<h2 id="incluye">Qué incluye el servicio</h2>` + `<ul>` listado de interés (logística, instalación, operación, etc.) + cta-inline.
6. `<h2 id="contacto">Contacto</h2>` + contact-card.
7. `<h2 id="faq">Preguntas frecuentes</h2>` + faq (5–6).

`toc` de la guía: `[("panorama","Qué ofrece"),("lineas","Líneas de servicio"),("comparativa","Comparativa"),("eventos","Para qué eventos"),("incluye","Qué incluye"),("contacto","Contacto"),("faq","Preguntas frecuentes")]`.

## Longitud
Cada body ≈ 1100–1500 palabras. Profesional, sin relleno genérico. Cada empresa debe sonar distinta (su nicho, sus líneas, sus eventos).

## IMPORTANTE Python
- El archivo debe `import`ar nada raro; solo `ARTICLES = [ ... ]`.
- Usa comillas dobles escapadas dentro de strings, o triple-quote `"""..."""` para el body (recomendado). Evita `"""` dentro del HTML.
- `h1_json` es un string que contiene comillas: usa `'"texto"'` (comilla simple afuera).
- Verifica que cada id de `toc` aparezca como `<h2 id="...">` en el body.

## DATOS REALES POR EMPRESA
(usa solo esto; acentos exactos)

### podiumex — ACC #B8860B / D #8F6808 / L #E6A70D / RGB 184,134,11
PODIUMEX. Fabricante mexicano de podiums profesionales (venta + renta). Taller propio, grabado láser. +1,500 eventos. Cobertura: CDMX, Monterrey, Guadalajara. Tel **+525564328954**, correo **podiumexmx@gmail.com**. Caso: /portafolio/equipo-para-eventos/podiumex/.
Líneas: Podium Acrílico Transparente; Podium Acrílico Negro; Podium de Madera Negro; Podium Madera y Acrílico; Personalización con grabado láser; Setup para streaming/transmisión.
Eventos: conferencias, congresos, ruedas de prensa, eventos corporativos, religiosos, académicos, transmisiones.

### boldis — ACC #E63946 / D #B32C36 / L #FF4757 / RGB 230,57,70
BOLDIS. Renta y venta de bolas disco e iluminación para eventos; instalación incluida. CDMX + Estado de México. Catálogo por tamaño 30–200 cm + LED RGB. Correo **contacto@boldis.com.mx** (sin teléfono público → CTA al caso). Caso: /portafolio/equipo-para-eventos/boldis/.
Líneas: Bola disco 30 cm; Bola disco 50 cm; Bola disco 100 cm; Bola disco hasta 200 cm; Iluminación LED RGB; Instalación y montaje.
Eventos: bodas, XV años, fiestas temáticas, producciones, sesiones de foto/video.

### pantalla-led — ACC #0066CC / D #004F9F / L #007FFF / RGB 0,102,204
PantallaLED. Proveedor directo de pantallas LED (venta + renta + instalación). +10 años. **Cobertura nacional**. 6 tipos. Correo **contacto@pantalla-led.com.mx** (sin tel público → CTA al caso). Caso: /portafolio/equipo-para-eventos/pantalla-led/.
Líneas/tipos: Pantallas LED para exteriores; para interiores; flexibles; para eventos; de piso; transparentes.
Usos: conciertos y eventos masivos, corporativos, retail/publicidad, ferias y expos, eventos deportivos.

### inflapy — ACC #F97316 / D #C25911 / L #FF8F1B / RGB 249,115,22
INFLAPY. Renta de inflables, brincolines y castillos para fiestas. CDMX + Estado de México (Naucalpan, Ecatepec, Nezahualcóyotl). Entrega + instalación + recolección incluidas. Higiene garantizada. Respuesta por WhatsApp rápida. Correo **contacto@inflablesparafiestas.com.mx** (sin tel público confirmado → CTA al caso). Caso: /portafolio/equipo-para-eventos/inflapy/.
Líneas/modelos: Mini Castillo; Castillo de Princesas; Barco Pirata; Inflable Extremo; Dragones Rojos; Mini Jungla.
Eventos: fiestas infantiles, cumpleaños, kermés, eventos escolares y familiares.

### eventech — ACC #0D9488 / D #0A736A / L #10B9AA / RGB 13,148,136
EVENTECH. Renta integral de equipo para eventos con un solo proveedor: mobiliario, audiovisual, carpas, iluminación, pistas de baile, catering. CDMX + Zona Metropolitana. Fundada 2024, +500 eventos. Entrega + montaje + asesoría incluidos. Equipo certificado. Propuesta personalizada en 24h. Tel **+525564328954**, correo **contacto@eventech.mx**. Caso: /portafolio/equipo-para-eventos/eventech/.
Líneas: Mobiliario; Audio y Video; Iluminación; Carpas; Pistas de baile; Catering.
Eventos: bodas, corporativos, XV años, conferencias, ferias, eventos sociales.

### redeil — ACC #9333EA / D #7227B6 / L #B73FFF / RGB 147,51,234
REDEIL. Renta de iluminación LED + audio (marcas JBL y QSC) + DJ + efectos para bodas, XV años y corporativos. CDMX + Estado de México, +10 años. Servicio llave en mano: transporte + instalación + operación + desmontaje. Tel **+525549375172**. Horario L-V 9:00–19:00 / Sáb 10:00–15:00. Caso: /portafolio/equipo-para-eventos/redeil/.
Líneas: Iluminación Decorativa; Iluminación Robótica y Efectos; Audio Profesional; Audio para Conferencias; DJ y Cabina; Equipos y Efectos.
Eventos: bodas, XV años, corporativos, conferencias.

### resoil — ACC #4F46E5 / D #3D36B2 / L #6257FF / RGB 79,70,229
RESOIL. Renta de sonido + iluminación profesional con enfoque empresarial/corporativo. +15 años, +5,000 eventos. Técnicos certificados, servicio técnico integral. Dirección **Montecito 38, Nápoles, Benito Juárez, CDMX, CP 03810**. Tel **+525578960091**. Horario L-D 9:00–20:00. Caso: /portafolio/equipo-para-eventos/resoil/.
Líneas: Iluminación Decorativa; Iluminación Arquitectónica y Efectos; Sonido para Eventos Sociales; Sonido para Eventos Corporativos; Equipos Especiales; Montaje y Operación Técnica.
Eventos: corporativos, conferencias, lanzamientos, bodas, eventos sociales.

### rentadeiluminacion — ACC #D97706 / D #A95C04 / L #FF9407 / RGB 217,119,6
REDEIL Iluminación (marca real "REDEIL"; usa etiqueta "REDEIL Iluminación" para distinguir del otro REDEIL). Renta de iluminación + audio JBL + DJ + efectos especiales (humo bajo). Instalación incluida. +500 eventos. Tel **+525530682988**. Horario L-D 8:00–18:00. Caso: /portafolio/equipo-para-eventos/rentadeiluminacion/.
Líneas: Iluminación Decorativa; Iluminación Robótica y Efectos de Luz; Iluminación Arquitectónica; Audio Profesional y DJ; Efectos Especiales; Instalación y Operación.
Eventos: bodas, XV años, corporativos, fiestas.

### soeve — ACC #DB2777 / D #AA1E5C / L #FF3094 / RGB 219,39,119
SOEVE. Especialista en renta de sonido profesional: bocinas, consolas de mezcla, micrófonos, paquetes DJ, amplificadores + iluminación. Instalación incluida + soporte técnico 24/7 + renta flexible. CDMX + Estado de México, interiores y exteriores. Sin teléfono público (CTA al caso). Caso: /portafolio/equipo-para-eventos/soeve/.
Líneas: Renta de Bocinas; Consolas de Mezcla; Micrófonos Profesionales; Paquetes DJ; Amplificadores de Potencia; Instalación, Montaje y Soporte 24/7.
Eventos: eventos sociales, conferencias, fiestas, corporativos, exteriores.

### mededul — ACC #BE123C / D #940E2E / L #ED164B / RGB 190,18,60
MEDEDUL. Mesas de dulces premium / candy bar + estaciones gourmet. +500 eventos. Diseño personalizado, montaje incluido. CDMX + Estado de México + Toluca + Metepec + Valle de Toluca. Tel CDMX **+525525226442**, Toluca **+525521775184**. Correo **info@mesas-de-dulces.com**. Horario L-S 10:00–19:00. Redes @mededul. Caso: /portafolio/equipo-para-eventos/mededul/.
Líneas: Mesa de Dulces Premium (30+ variedades); Postres Gourmet (macarons, cheesecakes); Queso y Charcutería artesanal; Algodón de Azúcar (10+ sabores); Fuente de Chocolate (3–5 niveles); Hot Dogs y Palomitas con operador.
Eventos: bodas, XV años, baby shower, bautizos, primera comunión, corporativos, infantiles, temáticos.

### renta-de-inflables — ACC #16A34A / D #117F39 / L #1BCB5C / RGB 22,163,74
RID · Renta de Inflables (H1 "Renta de Inflables"). Fiestas infantiles integral: inflables (chicos, medianos, grandes; para niñas, niños, boda) + servicios (pantalla inflable, mobiliario, decoración, pintacaritas, máquina de palomitas, mesa de dulces) + paquetes. Tel/WhatsApp **+525539048634**. CDMX + Estado de México. Tono cálido, dirigido a mamás y papás. Caso: /portafolio/equipo-para-eventos/renta-de-inflables/.
Líneas (doble eje): Inflables Chicos; Inflables Medianos; Inflables Grandes; Servicios complementarios (pantalla inflable, mobiliario, decoración); Animación (pintacaritas, palomitas); Paquetes de fiesta.
Eventos: cumpleaños infantiles, kermés, posadas, eventos familiares.

### avantexpo — ACC #0891B2 / D #06718A / L #0AB5DE / RGB 8,145,178
AVANTEXPO. Venta y renta de equipos para exposiciones: stands modulares, vitrinas y mostradores, pantallas LED, iluminación, podiums + servicios (diseño/personalización de stands, instalación/montaje, mantenimiento/soporte técnico). Para ferias, congresos, exposiciones y eventos corporativos. Sin tel/correo público (CTA al caso). Tono B2B (gerentes de marketing, coordinadores de ferias, agencias). Caso: /portafolio/equipo-para-eventos/avantexpo/.
Líneas: Stands Modulares; Vitrinas y Mostradores; Pantallas LED; Iluminación; Podiums; Diseño, Montaje y Soporte.
Eventos: ferias comerciales, congresos, exposiciones, activaciones, eventos corporativos.

### deglob — ACC #FB6F92 / D #C35671 / L #FF8AB6 / RGB 251,111,146
DEGLOB (alt "Fantasy Globos"). Decoración profesional con globos para eventos en CDMX. Llave en mano: diseño a la medida + instalación incluida + desinstalación. Tel/WhatsApp **+5215639565117**. Horario L-V 9:00–19:00 / Sáb 10:00–16:00. CDMX + Estado de México + ZMVM. Caso: /portafolio/equipo-para-eventos/deglob/.
Líneas: Arcos de Globos; Columnas Decorativas; Guirnaldas Orgánicas; Backdrops y Paneles; Globos con Helio; Figuras y Globos Gigantes.
Eventos: bodas, XV años, baby shower, cumpleaños infantil y adulto, corporativos, graduaciones, gender reveal.
