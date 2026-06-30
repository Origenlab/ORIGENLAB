# SOP 05 — Crear landing de conversión
> Propósito: armar una landing centrada en conversión — hero con CTA arriba del fold, prueba social honesta, CTABanner y WhatsApp flotante, con medición.

Estación 2 (Contenido) de la [[01 - La Fabrica de Sitios]]. Reutiliza `08/pagina-home.astro` como base (orquestador limpio) o `pagina-categoria.astro` para una landing de campaña. Conversión WhatsApp-first (D4).

## Objetivo
Una página cuya única misión es convertir: propuesta de valor y CTA WhatsApp **visibles sin hacer scroll**, prueba social **real** (o ninguna), banner de cierre y botón flotante presente — con eventos de medición listos.

## Prerrequisitos
- Sitio creado con [[SOP 01 - Crear sitio nuevo]].
- `WA_MESSAGES` con un mensaje por intención de la landing en `src/config/site.ts`.
- Componentes: `Hero`, `CTABanner` (+ `cta-presets.ts`), `WhatsAppFloat`, `SectionHeading` (ver [[09 - Biblioteca Componentes/00 - Inventario]] · ficha [[CTABanner]]).

## Pasos

1. **Crea la landing** a partir de la home (orquestador limpio) o copia una categoría para una campaña:
   ```bash
   cp ".../08 - Biblioteca Plantillas/pagina-home.astro" src/pages/index.astro
   # o, para campaña: cp .../pagina-categoria.astro src/pages/promocion-junio/index.astro
   ```

2. **Hero con CTA arriba del fold.** En el `Hero`, la promesa principal y el CTA WhatsApp deben verse sin scroll. Usa `waUrl()` con el mensaje de intención:
   ```astro
   ---
   import { waUrl, WA_MESSAGES } from "../config/site";
   const waLink = waUrl(WA_MESSAGES.cotizar);
   ---
   <Hero
     badge="{{PROPUESTA_CORTA}}"
     title="{{TITULAR_BENEFICIO_PRINCIPAL}}"
     subtitle="{{SUBTITULO_1_FRASE}}"
     ctas={[
       { text: "Cotizar por WhatsApp", href: waLink, variant: "primary", whatsapp: true },
       { text: "Llamar ahora", href: "tel:", variant: "outline" },
     ]}
   />
   ```
   El CTA primario es WhatsApp (D4); el secundario, llamada (`telUrl()`).

3. **Prueba social honesta (B4).** En la home la sección de testimonios **solo se pinta si `testimonials.length > 0`** (ya viene así). Llena el array **solo con testimonios reales/verificables**:
   ```ts
   const testimonials = [
     { name: "Cliente Real", role: "Gerente, Empresa X", text: "Testimonio textual verificable." },
   ];
   ```
   Si no hay reseñas reales, **déjalo vacío**: ni testimonios inventados ni `aggregateRating` en schema. Las señales E-E-A-T (años, cobertura, certificaciones) sí pueden ir en el bloque `home-trust` si son ciertas.

4. **Banner de cierre con `CTABanner`.** Usa un preset de `cta-presets.ts` (ya construye los botones con `waUrl`) o props directas:
   ```astro
   ---
   import CTABanner from "@components/CTABanner.astro";
   import { PRESET_GENERAL } from "../config/cta-presets";
   ---
   <CTABanner {...PRESET_GENERAL} />
   ```
   Variantes: `red` | `dark` | `light`. WhatsApp **siempre** vía `waUrl` (nunca `wa.me/<número>` hardcodeado).

5. **WhatsApp flotante presente.** Si la landing usa `PageLayout`, `WhatsAppFloat` ya viene incluido. Si montaste un layout mínimo, añádelo:
   ```astro
   <WhatsAppFloat message="cotizar" />
   ```
   `message` es una clave de `WA_MESSAGES`. El botón es accesible (touch ≥44px, `env(safe-area-inset-*)`).

6. **Formulario (si lo hay).** El ecosistema **no tiene backend de captura de leads** (⚠️ HUECO E5). Opciones válidas:
   - WhatsApp/`mailto:` como acción (recomendado, WhatsApp-first), o
   - Formspree/Worker externo si el cliente exige formulario server-side.
   **Nunca** un `setTimeout` que simule envío. Si queda pendiente, registra `⚠️ HUECO` y enlaza a [[SOP 09 - Automatizacion de contenido]].

7. **Medición.** Deja el evento de conversión listo:
   - Analítica canónica: **Rybbit self-hosted con carga diferida** (tras primera interacción o ~6s) para no penalizar Lighthouse (patrón E4, origen BOMBERO).
   - Marca el clic a WhatsApp como evento (data-attribute o handler ligero). Opcional: bot **DMChamp** intercepta clics WhatsApp (MESASPICNIC/INFLAPY).
   - ⚠️ HUECO: la integración fina de eventos→CRM no está cableada (depende del backend de leads, [[SOP 09 - Automatizacion de contenido]]).

8. **Build y prueba en móvil** (donde ocurre la mayoría del tráfico/conversión):
   ```bash
   npm run build && npm run preview
   ```
   Verifica el fold en 380/480/640.

## Checklist de verificación
- [ ] Titular de beneficio + CTA WhatsApp visibles **arriba del fold** (verificado en 380px).
- [ ] CTA primario = WhatsApp vía `waUrl(WA_MESSAGES.<intención>)`; secundario = `telUrl()`.
- [ ] Prueba social **solo real** (o sección oculta); cero `aggregateRating` fabricado.
- [ ] `CTABanner` de cierre presente (preset o props con `waUrl`).
- [ ] `WhatsAppFloat` presente y accesible (≥44px, safe-area).
- [ ] Sin números hardcodeados (todo sale de `site.ts`); contacto real (cero `1234-5678`/`0000`).
- [ ] Formulario con backend real o WhatsApp/`mailto:` + `⚠️ HUECO` registrado (nunca `setTimeout`).
- [ ] Analítica diferida (Rybbit) sin penalizar Lighthouse; evento de clic WhatsApp marcado.
- [ ] `npm run build` verde; CWV móvil sano (ver [[02 - Checklist QA Pre-Deploy]]).

## Errores comunes
- **CTA debajo del fold.** El usuario se va antes de verlo. Lección: promesa + WhatsApp arriba, sin scroll, en móvil primero.
- **Testimonios inventados / rating fabricado.** Anti-patrón B4 (6+ proyectos). Lección: prueba social solo verificable; si no hay, no se muestra y no se modela en schema.
- **WhatsApp hardcodeado en el botón.** Falla BRINCOLINS/MESASPICNIC/MANEXT. Lección: `waUrl()` desde `site.ts`, mensaje por intención.
- **Formulario con envío simulado (`setTimeout`).** Pretende capturar leads pero los pierde — explícitamente prohibido en [[02 - Checklist QA Pre-Deploy]]. Lección: backend real o WhatsApp/`mailto:`; marca el HUECO si falta.
- **Analítica que mata Lighthouse.** Cargar el script de tracking de forma síncrona baja el Performance. Lección: carga diferida (Rybbit anti-Lighthouse, E4).
- **Datos de contacto placeholder.** `55-0000-0000` en producción rompe la confianza y la conversión. Lección: NAP real en `site.ts` antes de publicar.
- **Reutilizar el mensaje `default` en toda la landing.** Un lead de campaña entra con contexto genérico. Lección: añade una clave en `WA_MESSAGES` por intención de la landing.
