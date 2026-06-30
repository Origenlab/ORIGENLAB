# Filosofía — La Fábrica de Sitios
> Propósito: explicar el modelo mental del sistema para que cualquiera lo use igual.

## El problema que resuelve

El ecosistema OrigenLab es **un mismo sistema construido 28 veces a mano, con drift**. La auditoría ([[diagnostico-por-proyecto]]) lo demostró: el ADN se repite (Astro SSG, `site.ts`, `seo.ts`, Content Collections, WhatsApp) pero cada proyecto reinventa detalles y repite los mismos errores — deploy mal configurado, datos de schema fabricados, formularios sin backend, catálogos hardcodeados. Resultado: tiempo perdido, retrabajo y calidad inconsistente.

## La solución

Tratar la producción web como una **línea de ensamblaje industrial**, no como artesanía. Un sitio nuevo no se inventa: se **ensambla** a partir de piezas estandarizadas y probadas (las mejores versiones que ya existen en el ecosistema), siguiendo una secuencia fija.

Principios:

1. **Una sola fuente de verdad.** Datos del negocio en `site.ts`; datos repetibles en Content Collections; tokens de diseño en `tokens.css`. Nada se duplica.
2. **Data-driven sobre hardcode.** Las páginas se generan desde datos + plantillas, no se escriben una por una. (Anti-patrón: los 228 `.astro` de servicio de EVENTECH.)
3. **Componer, no copiar.** Toda sección reutilizable es un componente de [[09 - Biblioteca Componentes/00 - Inventario]].
4. **Calidad por defecto.** El sistema produce sitios que pasan el [[02 - Estandares de Calidad]] sin retrabajo, porque los checks están horneados en las plantillas y el QA.
5. **Honestidad de datos.** Cero schema fabricado. Si no hay reseñas reales, no hay `aggregateRating`. (Lección de MESECI/RENTADEILUMINACION.)
6. **Lo real vs lo ideal, separado.** El Vault documenta primero lo que se hace hoy (con evidencia) y luego el estándar. Los huecos se marcan `⚠️ HUECO`, no se rellenan con suposiciones.

## Criterio de "terminado"

Una persona nueva, sin contexto previo y usando **solo este Vault**, construye un sitio completo que pasa el [[02 - Estandares de Calidad]], siguiendo los [[07 - SOPs/00 - Indice de SOPs|SOPs]] y reutilizando los [[09 - Biblioteca Componentes/00 - Inventario|componentes]] — con la calidad de los mejores proyectos (PROYECTORED, EVENTECH, BOMBERO, PODIUMEX).

Ver la metodología operativa en [[01 - La Fabrica de Sitios]].
