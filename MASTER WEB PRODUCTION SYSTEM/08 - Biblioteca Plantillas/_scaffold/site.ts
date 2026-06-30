// site.ts — SSoT (Single Source of Truth) del sitio. Canónico: PROYECTORED/src/config/site.ts
// ============================================================================
// FUENTE ÚNICA DE VERDAD. Todo dato que aparezca en más de una página vive aquí:
// identidad, contacto (NAP), taxonomías y mensajes de WhatsApp. Nada de esto
// se hardcodea en componentes ni páginas — se importa desde este archivo.
//
// CONTRATO CANÓNICO (interoperable con la capa SEO/layouts/componentes del Master
// System). `site.ts` es el SUPERSET que satisface a la vez:
//   • src/lib/seo.ts  → SITE.seo, SITE.locale, SITE.organization, SITE.business,
//                        SITE.social, SITE.searchUrl, SITE.trailingSlash,
//                        SITE.allowSelfReviews, CONTACT.phoneRaw.
//   • componentes     → PRODUCT_CATEGORIES, SERVICES, SECTORS, COVERAGE_STATES
//                        (alias planos de TAXONOMY), SITE.tagline, CONTACT.schedule,
//                        WA_MESSAGES.cotizar / .cotizacion.
// Exports canónicos: SITE, CONTACT, TAXONOMY, PRODUCT_CATEGORIES, SERVICES,
//   SECTORS, COVERAGE_STATES, WA_MESSAGES, waUrl(), telUrl().
// Respetar las claves EXACTAS: la librería de schema (lib/seo.ts), los layouts y
// los componentes las consumen por nombre. Renombrar una clave aquí rompe el
// JSON-LD o el chrome aguas abajo.
//
// CÓMO USAR ESTE SCAFFOLD:
//   1. Reemplaza cada marcador {{...}} con el dato real del cliente.
//   2. NUNCA dejes un teléfono/WhatsApp inventado disfrazado de real
//      (ej. 55-1234-5678). Si no tienes el dato, deja el marcador {{...}}.
//   3. whatsapp y phoneE164 van en formato E.164 (lada país incluida).
//      whatsapp = E.164 SIN el signo "+" (lo exige wa.me). Ej: 525512345678
//      phoneE164 = E.164 CON "+". Ej: +525512345678
//      phoneRaw  = E.164 CON "+" (es el que usan los componentes/JSON-LD).
//   4. Los sub-objetos `seo`, `organization`, `business`, `social` los CONSUME
//      lib/seo.ts para los metadatos y el JSON-LD. Rellénalos o déjalos con sus
//      marcadores; si no defines `SITE.business`, no se emite LocalBusiness.
// ============================================================================

// ── SITE — identidad de marca + SEO + organización + negocio local ───────────
// Consumido por: <head> (title/OG/canonical), JSON-LD WebSite/Organization/
// LocalBusiness, TopBar/Footer (tagline). FORMA superset (PROYECTORED + EVENTECH).
export const SITE = {
  name: '{{SITE_NAME}}', // Nombre comercial corto. Ej: 'Proyecto Red'
  brand: '{{BRAND}}', // Marca para títulos/footer (suele = name). Ej: 'Proyecto Red'
  tagline: '{{TAGLINE}}', // Frase corta (TopBar/Footer). Ej: 'Seguridad contra incendios en CDMX'
  domain: '{{DOMAIN}}', // Dominio sin protocolo. Ej: 'proyectored.com.mx'
  url: 'https://{{DOMAIN}}', // URL canónica con protocolo, SIN slash final.
  lang: 'es-MX', // Locale del Master System. NO cambiar salvo proyecto no-MX.
  locale: 'es-MX', // Locale para og:locale/inLanguage (lib/seo.ts lo normaliza a es_MX).
  description:
    '{{SITE_DESCRIPTION}}', // 140–160 chars. Qué vende + diferenciador + zona. Para meta description default.
  defaultImage: '/imagenes/og/{{OG_IMAGE_FILE}}', // OG image default (1200×630). Ruta absoluta bajo /public.

  // Política de trailing slash. Debe coincidir con astro.config.mjs (canónico B5: 'never').
  trailingSlash: 'never' as 'never' | 'always',
  // searchUrl: si el sitio tiene buscador interno → WebSite SearchAction. Si no, undefined.
  searchUrl: undefined as string | undefined, // p.ej. 'https://{{DOMAIN}}/buscar?q={query}'
  // allowSelfReviews: gate de reseñas. DEFAULT false (Google penaliza self-serving).
  // Solo true si tienes reseñas REALES verificables de terceros (ver lib/seo.ts emitReviews).
  allowSelfReviews: false,

  // seo: defaults para <head>. Los consume lib/seo.ts (buildMeta/formatTitle/truncate).
  seo: {
    title: '{{SEO_TITLE_HOME}}', // Title default de la home (≤60). buildMeta lo recorta.
    description: '{{SITE_DESCRIPTION}}', // Meta description default (140–160).
    image: '/imagenes/og/{{OG_IMAGE_FILE}}', // OG default; suele = defaultImage.
    titleMaxLength: 60, // Cap del <title> (Google ~580px ≈ 60 chars).
    descriptionMaxLength: 160, // Cap de la meta description.
  },

  // social: redes para JSON-LD sameAs (organization) + twitter:site. Vacío = se omite.
  social: {
    twitter: undefined as string | undefined, // p.ej. '@proyectored' → twitter:site.
    facebook: undefined as string | undefined,
    instagram: undefined as string | undefined,
    linkedin: undefined as string | undefined,
    youtube: undefined as string | undefined,
  },

  // organization: entidad publisher (JSON-LD Organization). Es la entidad raíz por @id.
  // sameAs: derivado de social (perfiles verificables). logo: ruta absoluta bajo /public.
  organization: {
    name: '{{SITE_NAME}}', // Razón comercial (suele = name).
    legalName: '{{LEGAL_NAME}}', // Razón social legal. Opcional.
    logo: '/imagenes/brand/{{LOGO_FILE}}', // Logo cuadrado para schema (no el del header).
    foundingDate: '{{FOUNDING_YEAR}}', // Año de fundación 'YYYY'. Opcional.
    // sameAs: perfiles oficiales verificables. Deja [] si no hay.
    sameAs: [] as string[], // p.ej. ['https://facebook.com/...', 'https://instagram.com/...']
  },

  // business: negocio local (JSON-LD LocalBusiness). Si NO lo defines (déjalo undefined),
  // buildSchema NO emite LocalBusiness — coherente para negocios sin sede física.
  // Para arquetipos con sede/área de servicio, rellénalo a partir de CONTACT.
  business: {
    // type: 'LocalBusiness' | 'Store' | ['LocalBusiness','SecurityService'] | etc.
    type: 'LocalBusiness' as string | string[],
    priceRange: '$$', // Indicador de precio para LocalBusiness.
    address: {
      street: '{{STREET}}',
      locality: '{{CITY}}',
      region: '{{STATE}}',
      postalCode: '{{POSTAL_CODE}}',
      country: 'MX',
    },
    geo: {
      lat: '{{GEO_LAT}}' as string | number, // number en el sitio real. Ej: 19.434208
      lng: '{{GEO_LNG}}' as string | number, // number en el sitio real. Ej: -99.1513664
    },
    openingHours: {
      weekdays: { opens: '{{OPENS_WEEKDAYS}}', closes: '{{CLOSES_WEEKDAYS}}' }, // 'HH:MM' 24h. Ej: '09:00'/'18:00'
      saturday: undefined as { opens: string; closes: string } | undefined, // o { opens:'09:00', closes:'14:00' }
    },
    // areaServed: ciudades/zonas atendidas (JSON-LD areaServed). Personaliza.
    areaServed: ['{{CIUDAD_PRINCIPAL}}'] as string[],
  },
} as const;

// ── CONTACT — NAP (Name, Address, Phone) + geo + horario ─────────────────────
// Consumido por: TopBar, Footer, JSON-LD LocalBusiness (address/geo/openingHours),
// telUrl(). El patrón @id de NAP único viene de INFLAPY/src/data/business.ts.
export const CONTACT = {
  phone: '{{PHONE_DISPLAY}}', // Formato legible para mostrar. Ej: '55 6275 9624'
  phoneE164: '{{PHONE_E164}}', // E.164 CON +, para <a href="tel:">. Ej: '+525562759624'
  phoneRaw: '{{PHONE_E164}}', // E.164 CON +; lo consumen componentes y JSON-LD (telephone). Suele = phoneE164.
  whatsapp: '{{WHATSAPP_E164}}', // E.164 SIN +, lo exige wa.me. Ej: '525562759624'
  email: '{{EMAIL}}', // Ej: 'ventas@dominio.com.mx'
  street: '{{STREET}}', // Calle y número + colonia. Ej: 'Paseo de la Reforma 26, Col. Juárez'
  city: '{{CITY}}', // Ej: 'Ciudad de México'
  state: '{{STATE}}', // Ej: 'CDMX'
  postalCode: '{{POSTAL_CODE}}', // Ej: '06600'
  country: 'MX', // ISO 3166-1 alpha-2. Fijo para el Master System.
  // geo: coordenadas exactas del domicilio (Google Maps → clic derecho → copiar).
  // Las consume JSON-LD GeoCoordinates. NO inventar: si no hay, dejar marcadores.
  geo: {
    lat: '{{GEO_LAT}}', // Ej: 19.434208 (number en el sitio real)
    lng: '{{GEO_LNG}}', // Ej: -99.1513664 (number en el sitio real)
  },
  // hours: fuente única del horario. weekdays/saturday/sunday = texto visible;
  // display = versión concisa para TopBar/Footer. La capa SEO mapea esto a
  // OpeningHoursSpecification (ver lib/seo.ts → SITE.business.openingHours).
  hours: {
    weekdays: '{{HOURS_WEEKDAYS}}', // Ej: 'Lun–Vie 8:00–18:00'
    saturday: '{{HOURS_SATURDAY}}', // Ej: 'Sáb 8:00–14:00'
    sunday: '{{HOURS_SUNDAY}}', // Ej: 'Dom Cerrado'
    display: '{{HOURS_DISPLAY}}', // Ej: 'Lun–Vie 8:00–18:00' (TopBar)
  },
  // schedule: versión que consumen TopBar/Footer (PROYECTORED). `display` para la
  // barra superior; weekdays/saturday/sunday usan doble espacio "Día␣␣Horario"
  // (el Footer hace split('  ')). Espejo de `hours` con ese formato.
  schedule: {
    display: '{{HOURS_DISPLAY}}', // Ej: 'Lun–Vie 8:00–18:00'
    weekdays: '{{HOURS_WEEKDAYS_FOOTER}}', // Ej: 'Lun–Vie  8:00–18:00' (doble espacio entre día y horario)
    saturday: '{{HOURS_SATURDAY_FOOTER}}', // Ej: 'Sábado  8:00–14:00'
    sunday: '{{HOURS_SUNDAY_FOOTER}}', // Ej: 'Domingo  Cerrado'
  },
} as const;

// ── TAXONOMY — categorías/servicios/zonas cerradas (as const) ────────────────
// Origen: PROYECTORED (PRODUCT_CATEGORIES + SERVICES + SECTORS + COVERAGE_STATES).
// Fuente única de la navegación, footer y rutas. Cada `slug` debe coincidir con
// el `category` de las Content Collections (ver content.config.ts) y con la
// estructura de carpetas de /pages. `as const` → tipos literales para autocompletado.
export const TAXONOMY = {
  // categories: catálogo de dominio (L2). href apunta a la landing de categoría.
  // badge: etiqueta opcional (norma/sello). undefined si no aplica (NO null: la
  // prop badge de ProductCard es `string | undefined`).
  categories: [
    { slug: '{{CAT_1_SLUG}}', label: '{{CAT_1_LABEL}}', badge: undefined, href: '/{{CAT_1_SLUG}}/' },
    { slug: '{{CAT_2_SLUG}}', label: '{{CAT_2_LABEL}}', badge: undefined, href: '/{{CAT_2_SLUG}}/' },
    // … añade las categorías reales del cliente (cerradas, sin duplicar slugs).
  ],
  // services: servicios ofrecidos (catálogo o página /servicios).
  services: [
    { id: '{{SVC_1_ID}}', label: '{{SVC_1_LABEL}}', desc: '{{SVC_1_DESC}}' },
    { id: '{{SVC_2_ID}}', label: '{{SVC_2_LABEL}}', desc: '{{SVC_2_DESC}}' },
    // … servicios reales.
  ],
  // sectors: sectores/segmentos atendidos (opcional; páginas /sectores/*).
  sectors: [
    { slug: '{{SECTOR_1_SLUG}}', label: '{{SECTOR_1_LABEL}}' },
    // … sectores reales. Si NO aplica, NO dejes [] vacío bajo `as const` (infiere
    // never[] y rompe Header/Footer en `astro check`). Tipa el arreglo vacío:
    //   sectors: [] as readonly { slug: string; label: string }[],
  ],
  // coverageStates: cobertura geográfica. type distingue zona operativa de comercial.
  // Lo consume JSON-LD areaServed. Para SEO local por zona ver content.config.ts (zonas).
  coverageStates: [
    { slug: '{{STATE_1_SLUG}}', label: '{{STATE_1_LABEL}}', type: 'operativo' as 'operativo' | 'comercial' },
    { slug: '{{STATE_2_SLUG}}', label: '{{STATE_2_LABEL}}', type: 'comercial' as 'operativo' | 'comercial' },
    // … estados reales.
  ],
} as const;

// ── Alias planos de TAXONOMY — contrato de componentes ───────────────────────
// Header/Footer/RelatedLinks (origen PROYECTORED) importan estos nombres PLANOS
// directamente. Son la MISMA data que TAXONOMY.*, re-exportada para no partir el
// contrato en dos. Tipos derivados de TAXONOMY (sin implicit-any).
export const PRODUCT_CATEGORIES = TAXONOMY.categories;
export const SERVICES = TAXONOMY.services;
export const SECTORS = TAXONOMY.sectors;
export const COVERAGE_STATES = TAXONOMY.coverageStates;

// Tipos exportados de los elementos de taxonomía (útiles para tipar .map() en
// componentes/páginas y evitar ts7006 implicit-any).
export type ProductCategory = (typeof TAXONOMY.categories)[number];
export type Service = (typeof TAXONOMY.services)[number];
export type Sector = (typeof TAXONOMY.sectors)[number];
export type CoverageState = (typeof TAXONOMY.coverageStates)[number];

// ── BRANCHES — sucursales (opcional) ─────────────────────────────────────────
// Consumido por: Footer (bloque "Sucursales"). Si el negocio no tiene sucursales,
// déjalo como []; el Footer omite el bloque. Cada sucursal: { label, address, mapsUrl? }.
// Existe como export para que el Footer lo lea SIN import() dinámico.
export const BRANCHES: { label: string; address: string; mapsUrl?: string }[] = [
  // { label: 'Matriz CDMX', address: 'Av. Cuauhtémoc 145, Col. Doctores', mapsUrl: 'https://maps.google.com/?q=...' },
];

// ── WA_MESSAGES — mensajes de WhatsApp pre-armados por intención ─────────────
// Origen: PROYECTORED (30 mensajes segmentados). Cada mensaje pre-carga contexto
// para que el asesor entre en materia y suba la calidad del lead. `default` y
// `cotizar` son OBLIGATORIOS (los usan el botón flotante y el CTA global).
// `cotizacion` es ALIAS de `cotizar`: el Header/Footer/cta-presets del ecosistema
// (PROYECTORED) usan la clave `cotizacion`; se mantiene para no perder el mensaje.
// Añade una clave por categoría/servicio/intención del cliente.
export const WA_MESSAGES = {
  default: 'Hola, necesito información sobre {{NEGOCIO_GENERICO}}.',
  cotizar: 'Hola, quiero solicitar una cotización de {{NEGOCIO_GENERICO}}.',
  cotizacion: 'Hola, quiero solicitar una cotización de {{NEGOCIO_GENERICO}}.', // alias de `cotizar` (Header/Footer/cta-presets).
  // Por intención de página (ejemplos a personalizar):
  productos: 'Hola, estoy viendo el catálogo y quiero cotizar varios productos.',
  servicios: 'Hola, necesito información sobre sus servicios.',
  blog: 'Hola, leí un artículo de su blog y tengo una pregunta.',
  contacto: 'Hola, quiero atención personalizada para mi proyecto.',
  urgente: 'Hola, necesito atención urgente hoy.',
  // … añade un mensaje por cada categoría/servicio en TAXONOMY si lo deseas.
} as const;

// ── waUrl() — constructor canónico de enlaces de WhatsApp ────────────────────
// REGLA DURA (D4): nunca hardcodear wa.me/<número> en una página/componente.
// Siempre waUrl(WA_MESSAGES.<intencion>). Centraliza el número y el encoding.
//   waUrl()                       → mensaje default
//   waUrl(WA_MESSAGES.cotizar)    → mensaje de cotización
export function waUrl(message: string = WA_MESSAGES.default): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

// ── telUrl() — constructor canónico del enlace de llamada ────────────────────
// Usa phoneE164 (con +) que es el formato que exige el esquema tel:.
export function telUrl(): string {
  return `tel:${CONTACT.phoneE164}`;
}
