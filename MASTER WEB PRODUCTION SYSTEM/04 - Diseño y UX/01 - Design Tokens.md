# Design Tokens
> Propósito: la fuente ÚNICA de variables visuales. Cambiar la marca = cambiar tokens, nada más.

Archivo canónico: `08 - Biblioteca Plantillas/_scaffold/tokens.css`. Se importa **una sola vez** en `BaseLayout`. Resuelve el anti-patrón C2 (doble fuente de tokens: PROYECTORED, MANEXT, RENTADEILUMINACION tenían tokens duplicados).

## Familias de tokens

| Familia | Prefijo canónico | Ejemplos |
|---|---|---|
| Color marca | `--c-primary*` | `--c-primary`, `--c-primary-light`, `--c-primary-dark`, `--c-accent` |
| Color tinta/neutros | `--c-*` | `--c-ink`, `--c-ink-2`, `--c-muted`, `--c-border`, `--c-surface`, `--c-white` |
| Tipografía familia | `--font-*` | `--font-heading` (Outfit), `--font-body` (Inter) |
| Tamaño texto | `--text-*` | `--text-xs … --text-4xl`, `--text-fluid-3xl/4xl` |
| Peso / interlineado | `--weight-*`, `--leading-*` | `--weight-semibold`, `--leading-relaxed` |
| Espaciado | `--sp-*` | `--sp-1 … --sp-12` |
| Radios / borde | `--radius-*`, `--border` | `--radius-md`, `--radius-full` |
| Layout | `--container-*`, `--header-height`, `--topbar-height` | `--container-max: 1200px` |
| Sombra / transición | `--shadow-*`, `--transition` | `--shadow-md` |

## Reglas

1. **Solo `var(--token)` en los componentes.** Cero hex/px sueltos para color o espaciado. *(Anti-patrón: SEGURIDADPRIVADA hardcodeó `#0a0f1e`/`#25D366` ignorando sus tokens.)*
2. **Personalizar marca = editar `tokens.css`.** Cambiar `--c-primary` y `--font-*` reviste todo el sitio.
3. **Puente de alias.** `tokens.css` mapea nombres heredados (`--color-red`, `--space-5`, `--ft-accent`) al canónico para que los componentes extraídos funcionen sin reescritura. *(Deuda de roadmap: normalizar los componentes a los nombres canónicos; ver [[Roadmap de Optimizacion]].)*
4. **Tipografía self-hosted** (no Google Fonts CDN). Preload de la fuente del LCP.

## Identidad por arquetipo (orientativo)
- **A/contra incendios:** rojo bombero + navy + tinta oscura (BOMBERO, FIREFIGHTERMX).
- **C/seguridad:** navy/azul + acento; serio y corporativo (SEGURIDADPRIVADA).
- **B/eventos:** color vivo + alto contraste, fotografía protagonista (EVENTECH, INFLAPY).
- **D/editorial:** serif display (Fraunces) + neutros papel (BARBERIA, MESECI).
