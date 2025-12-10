# 📁 Carpeta .audit - Documentación OrigenLab

Esta carpeta contiene toda la documentación técnica y guías para mantener el sitio web de OrigenLab.

---

## 📚 DOCUMENTOS ACTIVOS

### ⭐ DOCUMENTO-ARTICULO.md (v2.0) - **GUÍA PRINCIPAL**

**Úsalo para:** Crear y publicar artículos completos en el blog

**Incluye:**
- ✅ Planificación y investigación (FASE 1)
- ✅ Escritura de contenido (FASE 2-3)
- ✅ Creación HTML completa (FASE 4-5)
- ✅ Optimización SEO y marketing (FASE 6)
- ✅ **Publicación en blog.html (FASE 7)** ← NUEVO
- ✅ Verificación post-publicación
- ✅ Monitoreo primeras 24h

**Características clave:**
- 2,000+ líneas de documentación profesional
- Checklists de validación en cada fase
- Scorecard de 105 puntos
- **8 secciones sobre contenido atemporal**
- Ejemplos reales con código
- Guía de paginación automática

**📖 Este es el ÚNICO documento que necesitas consultar.**

---

## 🗑️ DOCUMENTOS DEPRECADOS (OBSOLETOS)

### ~~DEPRECATED-GUIA-AGREGAR-ARTICULO-AL-BLOG.md~~

❌ **NO USAR**

**Razón:** Este documento fue **unificado** con DOCUMENTO-ARTICULO.md v2.0

**Contenido integrado en:** DOCUMENTO-ARTICULO.md → FASE 7 (Publicación en Blog.html)

**Fecha de deprecación:** 2025-01-23

**Qué hacer si lo encuentras:**
- Ignóralo
- Usa DOCUMENTO-ARTICULO.md FASE 7 en su lugar
- Este archivo se mantiene solo como referencia histórica

---

## 📊 ESTRUCTURA DE DOCUMENTOS

```
.audit/
├── README.md                                    ← Este archivo
├── DOCUMENTO-ARTICULO.md (v2.0)                 ← ⭐ GUÍA PRINCIPAL
├── DEPRECATED-GUIA-AGREGAR-ARTICULO-AL-BLOG.md  ← ❌ Obsoleto
└── [Otros documentos futuros]
```

---

## 🎯 FLUJO DE TRABAJO RECOMENDADO

### Para Crear un Nuevo Artículo:

```
1. Abrir: DOCUMENTO-ARTICULO.md
   ↓
2. Seguir FASE 1: Investigación y Planificación
   ↓
3. Seguir FASE 2-3: Escritura de Contenido
   ↓
4. Seguir FASE 4-5: Creación HTML
   ↓
5. Seguir FASE 6: Optimización (incluye 6.5 Contenido Atemporal)
   ↓
6. Seguir FASE 7: Publicación en blog.html (11 pasos)
   ↓
7. ✅ Artículo completo y publicado
```

**Tiempo estimado total:** 3-4 horas (para un artículo de 3,000-4,000 palabras)

---

## ⚠️ REGLAS CRÍTICAS

### 1. Contenido Atemporal (OBLIGATORIO)

**NUNCA incluyas:**
- Años (2024, 2025, 2026, etc.)
- Meses con años ("enero 2025")
- Expresiones temporales ("en 2025", "para 2024")

**SIEMPRE verifica:**
```bash
grep -n "2024\|2025\|2026\|enero\|febrero\|marzo" /blog/tu-articulo.html
```

**Si retorna resultados → DETENTE y corrige antes de publicar**

### 2. Scorecard Mínimo

- **Mínimo aceptable:** 95/105 puntos
- **Óptimo:** 98-105 puntos
- **Bloqueante:** <95 puntos o 0/5 en Contenido Atemporal

### 3. Publicación en blog.html

**SIEMPRE:**
- Agregar como PRIMER elemento del articles-grid
- Actualizar numeración de artículos existentes
- Agregar/actualizar categoría en sidebar
- Agregar 1-2 tags relevantes

**NUNCA:**
- Publicar con fechas en el título
- Saltarse verificaciones de FASE 7.1
- Olvidar actualizar sidebar

---

## 📈 MÉTRICAS DE ÉXITO

### Artículo Bien Publicado:

✅ Aparece como primero en blog.html
✅ Todas las imágenes cargan
✅ Links funcionan (empresas, categorías)
✅ Paginación automática funciona
✅ Sin fechas específicas
✅ Scorecard ≥ 95/105
✅ Tiempo lectura correcto
✅ Extracto atractivo

### Indicadores de Problemas:

❌ Artículo no aparece en blog.html
❌ Imágenes rotas (404)
❌ Links no funcionan
❌ Paginación no muestra artículo
❌ Contiene "2025" o fechas
❌ Scorecard <95 puntos
❌ Errores en consola navegador

---

## 🔄 HISTORIAL DE VERSIONES

### DOCUMENTO-ARTICULO.md

**v2.0** (2025-01-23) - ACTUAL
- Unificado con GUIA-AGREGAR-ARTICULO-AL-BLOG.md
- FASE 7 expandida (11 pasos detallados)
- Añadidas 8 secciones de contenido atemporal
- Scorecard ampliado a 105 puntos
- Guía completa de paginación

**v1.1** (2025-01-23)
- Agregada sección crítica de Contenido Atemporal
- ERROR 0 agregado
- Checklist expandido

**v1.0** (2025-01-23)
- Versión inicial
- 7 FASES básicas
- Scorecard de 100 puntos

### GUIA-AGREGAR-ARTICULO-AL-BLOG.md

**v1.0** (2025-11-23) → **DEPRECATED** (2025-01-23)
- Contenido integrado en DOCUMENTO-ARTICULO.md v2.0 FASE 7
- Archivo renombrado a DEPRECATED-*

---

## 💡 PREGUNTAS FRECUENTES

### ¿Qué documento debo usar?

**R:** Solo DOCUMENTO-ARTICULO.md v2.0

### ¿Por qué hay un archivo "DEPRECATED"?

**R:** Para mantener referencia histórica. No lo uses.

### ¿Dónde está la guía de publicación?

**R:** DOCUMENTO-ARTICULO.md → FASE 7 (Publicación en Blog.html)

### ¿Cómo evito fechas en artículos?

**R:** Sigue FASE 6.5 (Verificación Crítica: Contenido Atemporal) + ejecuta grep antes de publicar

### ¿Cuánto tarda crear un artículo completo?

**R:**
- FASE 1 (Investigación): 30 min
- FASE 2-3 (Escritura): 60-90 min
- FASE 4-5 (HTML): 45-60 min
- FASE 6 (Optimización): 30 min
- FASE 7 (Publicación): 20 min
- **Total:** 3-4 horas

### ¿Puedo saltarme pasos?

**R:** NO. Cada fase tiene verificaciones críticas. Saltarlas = artículos de baja calidad.

### ¿Cómo sé si mi artículo es bueno?

**R:**
1. Completa Scorecard (mínimo 95/105)
2. 0 fechas encontradas con grep
3. Todas las verificaciones de FASE 7.8 pasadas
4. Artículo visible en blog.html como primero

---

## 📞 SOPORTE

**Para dudas sobre este documento:**
- Consulta: DOCUMENTO-ARTICULO.md
- Archivo de referencia: `/blog/guia-eventos-corporativos.html`

**Para reportar errores:**
- Crea issue en repositorio
- Marca como "documentación"

---

**Última actualización:** 2025-01-23
**Mantenedor:** OrigenLab Team
**Próxima revisión:** Después del artículo #10
