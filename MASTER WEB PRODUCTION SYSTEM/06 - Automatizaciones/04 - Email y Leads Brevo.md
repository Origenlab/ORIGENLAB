# 04 — Email y Leads Brevo

> ⚠️ HUECO: no implementado — diseño propuesto.

> Propósito: diseño objetivo del backend de captura de leads (formulario → Cloudflare Worker → n8n → Brevo + WhatsApp). **No existe backend de leads en ningún repo.** Hoy la conversión es WhatsApp-first.

## Estado real (verificado en auditoría)

**No hay backend de captura de leads en ningún proyecto del ecosistema, y Brevo no existe en código.** Esto es categórico ([[patrones-canonicos]] §E5, [[02 - Arquitectura Astro/03 - Integraciones]] §HUECOS):

- **Conversión = WhatsApp-first (D4), universal.** En los 31 proyectos los "formularios" **no postean a un backend**: arman un enlace `wa.me/...?text=` con los datos y abren WhatsApp. Evidencia: GAMADEMEXICO `CotizacionForm.astro:266-287` ("No hay backend/API de formularios: el lead viaja por WhatsApp"), EVENTECH `cotizar/index.astro:319-355` ("único mecanismo de captación = WhatsApp"), INFLAPY formularios `blog/index.astro:1237-1303` ("sin backend"), CLINICADEBELLEZA (CTAs a `/contacto` y `wa.me`, sin endpoint).
- **Brevo:** grep negativo en todos los repos. No hay email transaccional integrado en ninguno.
- **Indicios indirectos, no confirmados:** MEDEDUL y CLINICADEBELLEZA tienen CSP que whitelistea `formspree.io` → **sospecha** de Formspree en el form de cotización, **sin verificar** en el código. RENTADEILUMINACION/CLINICADEBELLEZA: backend del `/contacto` no confirmado. Eso es ambigüedad, no integración. Ver [[../_AUDITORIA/diagnostico-MEDEDUL]] y [[../_AUDITORIA/diagnostico-CLINICADEBELLEZA]] §HUECOS.

La biblioteca de plantillas lo confirma como hueco: *"ninguna plantilla incluye handler de envío de formulario... la conversión es WhatsApp-first y NO existe backend de captura de leads"* ([[08 - Biblioteca Plantillas/00 - Indice de Plantillas]] §Huecos). **Hoy, el lead se captura por WhatsApp** y se atiende en ese canal.

## Diseño objetivo (propuesta, a construir)

Un backend serverless que, **sin abandonar el WhatsApp-first**, capture también el lead por formulario, lo registre y dispare email + notificación. El destino canónico de deploy (Cloudflare Pages, [[03 - Reglas Globales]] §Deploy) es lo que habilita el Worker — por eso la recomendación de Cloudflare apunta justo aquí.

### Flujo propuesto

```
1. Formulario     → form HTML del sitio (campos: nombre, contacto, mensaje + honeypot anti-spam)
                     el CTA primario sigue siendo WhatsApp (waUrl) — el form es complemento
2. Cloudflare Worker → recibe el POST en el edge (mismo host que el sitio en CF Pages)
                       valida, anti-spam, normaliza
3. n8n            → orquesta: registra el lead, decide ramas  (n8n también es HUECO — [[02 - Pipeline de Contenido n8n]])
4a. Brevo         → email transaccional (autorespuesta al cliente + alta en lista) — HUECO, no existe
4b. WhatsApp      → notificación al negocio (sigue siendo el canal primario, D4)
```

### Por qué este diseño encaja con lo real

- **No rompe la conversión actual:** el WhatsApp-first se mantiene como CTA primario (`waUrl(WA_MESSAGES.<intención>)` desde [[site.ts]], D4). El backend **añade** una vía de captura, no la sustituye. Es la razón por la que las plantillas hoy apuntan a WhatsApp y `/contacto`.
- **El Worker exige Cloudflare Pages:** este diseño es la justificación operativa de la regla de deploy. En GitHub Pages no hay edge functions; el Worker vive donde vive el sitio. Por eso [[03 - Reglas Globales]] recomienda Cloudflare Pages ("habilita el Worker de captura de leads").
- **Sin secretos en el repo:** la API key de Brevo y credenciales viven en variables de entorno del Worker/n8n, **nunca** en el código (regla de [[03 - Reglas Globales]] §Seguridad; la falla crítica de RENTADEILUMINACION fue un token `gho_` en `.git/config`).

### Qué falta para que sea real

1. El Cloudflare Worker (endpoint, validación, anti-spam) — **no existe** en ningún repo.
2. La instancia n8n y su orquestación — **no existe** ([[02 - Pipeline de Contenido n8n]]).
3. La cuenta Brevo + plantillas de email transaccional + credenciales — **no existe**.
4. El handler del formulario en el front que postee al Worker (hoy los forms arman `wa.me`).

Hasta tener esos cuatro, **no hay backend de leads**: la conversión es WhatsApp-first y así deben quedar los CTAs de las plantillas. SOP relacionado de deploy donde viviría el Worker: [[SOP 07 - Deploy Cloudflare Pages]].

## Evidencia

- Conversión WhatsApp-first sin backend: GAMADEMEXICO `CotizacionForm.astro:266-287`, EVENTECH `cotizar/index.astro:319-355`, INFLAPY `blog/index.astro:1237-1303`. Ver [[../_AUDITORIA/diagnostico-GAMADEMEXICO]], [[../_AUDITORIA/diagnostico-EVENTECH]], [[../_AUDITORIA/diagnostico-INFLAPY]].
- Brevo inexistente / backend no confirmado: grep negativo en repos; sospecha Formspree (CSP) sin verificar en MEDEDUL/CLINICADEBELLEZA. Ver [[../_AUDITORIA/diagnostico-MEDEDUL]] y [[../_AUDITORIA/diagnostico-CLINICADEBELLEZA]].
- Confirmación de hueco + diseño Worker→n8n→Brevo: [[02 - Arquitectura Astro/03 - Integraciones]] §HUECOS, [[08 - Biblioteca Plantillas/00 - Indice de Plantillas]] §Huecos, [[patrones-canonicos]] §E5.
