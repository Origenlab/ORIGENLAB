# UX y Conversión
> Propósito: convertir visitas en contactos. Patrón WhatsApp-first del ecosistema.

## Modelo de conversión canónico

Todo el ecosistema converge en **WhatsApp-first**: el negocio cotiza por chat, no por carrito. (Verificado en los 28 codebases.)

1. **CTA primario = WhatsApp** con mensaje pre-armado por página, vía `waUrl(WA_MESSAGES.x)` desde `site.ts`. El mensaje incluye contexto (producto/servicio/zona) para que el lead llegue calificado.
2. **CTA secundario = teléfono** (`telUrl()`), visible en `TopBar` y `Footer`.
3. **`WhatsAppFloat`** persistente en todas las páginas.
4. **Formularios:** hoy sin backend en el ecosistema (`⚠️ HUECO`). Hasta cablear el [[SOP 09 - Automatizacion de contenido|backend de leads]], el formulario envía por WhatsApp o `mailto`, nunca a un `setTimeout` simulado. *(Anti-patrón: INFIELMX simulaba el envío y perdía leads.)*

## Reglas de UX

- **CTA arriba del fold** en Home y fichas.
- **Contexto en el mensaje:** `WA_MESSAGES.cotizar` referencia el producto/servicio de la página.
- **Fricción mínima:** un clic al chat; sin pasos intermedios innecesarios.
- **Confianza:** datos de contacto reales, NAP consistente, certificaciones reales (no placeholders). *(Falla: 8 proyectos con contacto placeholder.)*
- **Prueba social honesta:** casos reales con foto/resultado; cero reseñas fabricadas.
- **Bot opcional (DMChamp):** intercepta el clic de WhatsApp para pre-calificar. *(MESASPICNIC, INFLAPY.)*

## Medición
Rybbit (self-hosted) con carga diferida. Eventos mínimos: clic WhatsApp, clic tel, scroll a fichas, envío de form. Ver [[03 - Integraciones]].
