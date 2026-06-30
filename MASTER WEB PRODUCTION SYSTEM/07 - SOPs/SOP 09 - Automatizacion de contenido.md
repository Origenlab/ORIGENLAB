# SOP 09 — Automatización de contenido
> Propósito: diseñar el pipeline de blog (n8n) y el backend de captura de leads (Worker→n8n→Brevo+WhatsApp); ⚠️ HUECO — no implementado en ningún repo, aquí está el diseño y los pasos para construirlo.

Estación 9 (opcional) de la [[01 - La Fabrica de Sitios]]. **⚠️ HUECO grande:** n8n, fal.ai/FLUX, Brevo y el backend de leads **no existen en código** en ninguno de los 31 proyectos ([[03 - Integraciones]] E5, patrones E5). Este SOP es **diseño objetivo + plan de implementación**, no un procedimiento sobre algo ya construido.

## Objetivo
Dejar especificado y accionable: (1) un pipeline n8n que produzca artículos de blog en la colección `articulos` respetando el schema, y (2) un backend de leads `Cloudflare Worker → n8n → Brevo + WhatsApp` que reemplace el "formulario sin handler" del ecosistema. Hasta implementarlo, la conversión sigue siendo **WhatsApp-first** ([[SOP 05 - Crear landing de conversion]]).

## Prerrequisitos
- Sitio en producción en **Cloudflare Pages** ([[SOP 07 - Deploy Cloudflare Pages]]) — el Worker de leads requiere el ecosistema Cloudflare (otra razón del destino canónico).
- Decisión de Frank de invertir en la automatización (hoy no es bloqueante para publicar).
- Cuentas a futuro: n8n (self-host o cloud), Brevo (email), número de WhatsApp Business API.

## Pasos

### A. Pipeline de blog con n8n (⚠️ HUECO — diseño)
> No implementado. Diseño objetivo:

1. **Disparador:** cron en n8n (ej. semanal) o webhook desde una hoja de temas/keywords.
2. **Generación:** nodo LLM redacta el artículo en Markdown siguiendo la plantilla `08/pagina-articulo.mdx` (estructura H2/H3, intención arriba, español de México).
3. **Imagen:** generar portada (flujo objetivo fal.ai/FLUX, también ⚠️ HUECO — ver [[SOP 08 - Generar e integrar imagenes]]) y optimizar a AVIF bajo `/images/blog/`.
4. **Frontmatter válido:** el nodo debe emitir frontmatter que **pase el Zod `.strict()`** de la colección `articulos` (`title` 10–70, `description` 70–160, `category` del enum `ARTICLE_CATEGORIES`, `heroImage` `^/images/`, `pubDate` ISO).
5. **Commit:** abrir PR a GitHub (cuenta `Origenlab`) con el `.mdx` nuevo, **nunca** publicar directo a `main` sin revisión (gate editorial).
6. **Gate de calidad:** el CI ([[SOP 10 - QA final y publicacion]]) corre `astro check` + lint SEO + link-check; si falla, el PR no mergea.
7. **Deploy:** al mergear, Cloudflare Pages reconstruye y publica automáticamente.
> Implementar con cautela: contenido generado sin revisión humana degrada E-E-A-T. El humano aprueba el PR.

### B. Backend de captura de leads (⚠️ HUECO — diseño Worker→n8n→Brevo+WhatsApp)
> **Hoy NO existe handler de formulario en ningún repo** (E5): toda conversión es `waUrl()`. Diseño objetivo para cuando se necesite formulario server-side:

1. **Frontend:** formulario en la página POSTea (fetch) a un endpoint del Worker. **Nunca** `setTimeout` simulado (prohibido en [[02 - Checklist QA Pre-Deploy]]).
2. **Cloudflare Worker (endpoint `/api/lead`):**
   - Valida y sanea el payload (anti-spam: honeypot + rate-limit con KV).
   - No expone secretos al cliente; las claves viven en variables del Worker (no en el repo, E6).
   - Reenvía el lead a un **webhook de n8n**.
   ```js
   // worker (boceto) — el código real NO existe aún
   export default {
     async fetch(req, env) {
       if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
       const lead = await req.json();
       // validar honeypot, campos requeridos, rate-limit (env.LEADS_KV)...
       await fetch(env.N8N_WEBHOOK_URL, {
         method: "POST",
         headers: { "content-type": "application/json" },
         body: JSON.stringify(lead),
       });
       return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
     }
   };
   ```
3. **n8n orquesta:**
   - **Brevo:** alta del contacto + email transaccional de seguimiento.
   - **WhatsApp:** notificación al asesor (WhatsApp Business API) con el contexto del lead.
   - Registro del lead (hoja/CRM/DB).
4. **Confirmación:** el Worker responde `ok`; el frontend muestra estado real de éxito/error (no fingido).
5. **Privacidad:** aviso de privacidad y consentimiento; no loguear datos sensibles en texto plano.

### C. Mientras tanto (estado real, hoy)
- Conversión por **WhatsApp-first** con `waUrl(WA_MESSAGES.<intención>)` y `WhatsAppFloat` ([[SOP 05 - Crear landing de conversion]]).
- Si un cliente exige formulario ya: usar **Formspree** o un Worker mínimo (solo reenvío a email/WhatsApp) y registrar `⚠️ HUECO` hasta tener el pipeline completo.
- Imágenes: manual ([[SOP 08 - Generar e integrar imagenes]]).

## Checklist de verificación
> Para cuando se implemente (no antes):
- [ ] El estado actual está marcado `⚠️ HUECO` y NO se presenta como funcionando.
- [ ] (Blog) El frontmatter generado pasa Zod `.strict()`; PR con revisión humana; CI bloqueante verde.
- [ ] (Leads) Worker valida + rate-limit; secretos en variables del Worker (no en repo).
- [ ] (Leads) n8n da de alta en Brevo y notifica WhatsApp; respuesta de éxito/error **real** (sin `setTimeout`).
- [ ] Aviso de privacidad/consentimiento presente; sin logging de datos sensibles.
- [ ] El destino de deploy es Cloudflare Pages (requisito del Worker).

## Errores comunes
- **Presentar n8n/Brevo/Worker como hecho.** No existen en ningún repo (E5). Lección: documentar como diseño objetivo y marcar `⚠️ HUECO: pendiente de implementación`.
- **Formulario con envío simulado (`setTimeout`).** Aparenta capturar leads pero los tira. Prohibido en QA. Lección: backend real o WhatsApp/`mailto:`; marca el HUECO.
- **Secretos del Worker en el repo.** Repetiría el token expuesto de RENTADEILUMINACION (E6). Lección: claves en variables del Worker/entorno, jamás en código.
- **Blog autopublicado sin revisión.** Contenido generado sin gate humano degrada E-E-A-T y puede romper el schema. Lección: PR + CI bloqueante + aprobación humana antes de `main`.
- **Frontmatter generado que rompe el build.** Si el LLM inventa un campo o una `category` fuera del enum, Zod `.strict()` falla. Lección: el nodo debe emitir frontmatter validado contra el schema de `articulos`.
- **Implementar leads sin Cloudflare.** El diseño asume el Worker; en GitHub Pages no hay backend. Lección: destino Cloudflare Pages ([[SOP 07 - Deploy Cloudflare Pages]]).
