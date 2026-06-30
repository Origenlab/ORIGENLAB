/* ============================================================================
 * src/lib/seo.ts — Librería SEO canónica (Vault Maestro · ORIGENLAB)
 * ----------------------------------------------------------------------------
 * PROPÓSITO: única fuente de verdad para <head> (metadatos) y JSON-LD del sitio.
 *   - buildMeta()   → datos normalizados para <head> (title, description, OG, Twitter).
 *   - buildSchema() → array de objetos JSON-LD listos para <JsonLd> / set:html.
 *   - Helpers @id-linkados: orgSchema, localBusinessSchema, websiteSchema,
 *     breadcrumbSchema, productSchema, serviceSchema, articleSchema, faqSchema.
 *
 * ORIGEN (código real extraído del ecosistema, Fase 1–2):
 *   - PODIUMEX/src/data/schema.ts ........ globalGraph() con @graph, nodos @id
 *                                          reutilizables y CERO aggregateRating
 *                                          fabricado. Patrón de schema más limpio.
 *   - EVENTECH/src/utils/seo.ts .......... 10 generadores con @id linking
 *                                          (#organization, #website, #localbusiness)
 *                                          + supresión consciente de reseñas
 *                                          self-serving (serviceWithReviewJsonLd).
 *   - BOMBERO/src/utils/seo.ts ........... formatTitle() (cap 60 + sufijo limpio),
 *                                          truncateMetaDescription() (corte por
 *                                          oración/palabra, poda de palabras débiles),
 *                                          canonicalURL() con trailing slash.
 *
 * CONTRATO: consume `SITE` y `CONTACT` desde `@config/site` (scaffold SSoT,
 *   superset PROYECTORED + forma EVENTECH). No hardcodear NAP aquí. `site.ts`
 *   provee los sub-objetos que esta librería lee: SITE.seo, SITE.locale,
 *   SITE.organization, SITE.business, SITE.social, SITE.searchUrl,
 *   SITE.trailingSlash, SITE.allowSelfReviews y CONTACT.phoneRaw.
 *
 * REGLA DURA (B4 patrones-canonicos): NUNCA se emite aggregateRating ni Review
 *   salvo que `data.reviews` contenga reseñas REALES y verificables de terceros.
 *   Google penaliza reseñas auto-emitidas (self-serving). Ver bloque emitReviews().
 *
 * REGLA DURA (B3 patrones-canonicos): el BreadcrumbList se emite UNA sola vez.
 *   buildSchema() lo añade SOLO si recibe `data.breadcrumbs`. El componente
 *   <Breadcrumb> visual NO debe emitir su propio JSON-LD (anti-patrón BOMBERO /
 *   RENTADEILUMINACION: breadcrumb duplicado en layout + componente).
 * ========================================================================== */

import { SITE, CONTACT } from '@config/site';

/* ──────────────────────────────────────────────────────────────────────────
 * @id de las entidades raíz del grafo. Todo nodo apunta a estos por @id, de
 * modo que Google consolida Organization/WebSite/LocalBusiness en UNA entidad.
 * (origen: PODIUMEX BUSINESS_ID/WEBSITE_ID + EVENTECH #organization/#website)
 * ────────────────────────────────────────────────────────────────────────── */
const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const BUSINESS_ID = `${SITE.url}/#localbusiness`;
const LOGO_ID = `${SITE.url}/#logo`;

/* ════════════════════════════════════════════════════════════════════════════
 * 1) UTILIDADES DE URL Y TEXTO  (origen: BOMBERO/src/utils/seo.ts)
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Convierte una ruta relativa en URL absoluta y normaliza el trailing slash
 * según la política del sitio (SITE.trailingSlash: 'never' | 'always').
 * Si recibe una URL absoluta o ya tiene esquema, solo normaliza el slash final.
 * Nunca añade slash a archivos con extensión (p.ej. /og.jpg, /sitemap.xml).
 */
export function absUrl(path: string): string {
  const base = SITE.url.endsWith('/') ? SITE.url.slice(0, -1) : SITE.url;
  let clean = /^https?:\/\//.test(path) ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;

  if (clean === base || clean === `${base}/`) return `${base}/`; // home
  if (/\.\w{2,5}$/.test(clean)) return clean;                     // archivo con extensión

  // Widen a string: SITE.trailingSlash puede ser literal ('never'/'always') por
  // `as const` en site.ts; el cast mantiene la política data-driven sin que TS
  // marque la comparación como imposible (ts2367).
  const wantsSlash = String(SITE.trailingSlash ?? 'never') === 'always';
  const hasSlash = clean.endsWith('/');
  if (wantsSlash && !hasSlash) clean = `${clean}/`;
  if (!wantsSlash && hasSlash) clean = clean.slice(0, -1);
  return clean;
}

/** Resuelve una imagen relativa a URL absoluta; deja intactas las que ya lo son. */
function absImage(src?: string): string | undefined {
  if (!src) return undefined;
  return /^https?:\/\//.test(src) ? src : `${SITE.url}${src.startsWith('/') ? src : `/${src}`}`;
}

// Longitud máxima del <title> (Google trunca ~580px ≈ 60 caracteres).
const TITLE_MAX = SITE.seo?.titleMaxLength ?? 60;
const TITLE_SUFFIX = ` | ${SITE.name}`;

/** Recorta a `max` respetando límite de palabra; sin separadores colgando. */
function capTitleCore(text: string, max: number): string {
  const cleaned = text.replace(/[\s|·•\-–—,;:]+$/g, '').trim();
  if (cleaned.length <= max) return cleaned;
  let cut = cleaned.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > max * 0.5) cut = cut.slice(0, lastSpace);
  return cut.replace(/[\s|·•\-–—,;:]+$/g, '').trim();
}

/**
 * Devuelve el <title> final: añade el sufijo de marca SOLO si el resultado
 * cabe en TITLE_MAX; si el título ya incluye la marca, evita duplicarla.
 * Política: la keyword va PRIMERO; la marca es complemento, nunca al inicio.
 */
export function formatTitle(title?: string): string {
  if (!title) return SITE.seo?.title ?? SITE.name;
  const trimmed = title.trim();
  const brandRe = new RegExp(SITE.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

  if (brandRe.test(trimmed)) {
    // Ya marcado: respetar si cabe, si no recortar conservando un solo sufijo.
    if (trimmed.length <= TITLE_MAX) return trimmed;
    return `${capTitleCore(trimmed, TITLE_MAX - TITLE_SUFFIX.length)}${TITLE_SUFFIX}`;
  }
  const core = trimmed.replace(/[\s|·•\-–—]+$/g, '').trim();
  const full = `${core}${TITLE_SUFFIX}`;
  if (full.length <= TITLE_MAX) return full;
  return `${capTitleCore(core, TITLE_MAX - TITLE_SUFFIX.length)}${TITLE_SUFFIX}`;
}

const META_MAX = SITE.seo?.descriptionMaxLength ?? 160;
const WEAK_ENDINGS = new Set([
  'a', 'al', 'con', 'como', 'de', 'del', 'el', 'en', 'la', 'las', 'los',
  'para', 'por', 'sin', 'un', 'una', 'y', 'o', 'que',
]);

/**
 * Recorta la meta description a `max` (≈160) priorizando oraciones completas;
 * si no caben, corta por palabra. Poda preposiciones/artículos colgando al
 * final y cierra con punto cuando el espacio lo permite.
 * (origen: BOMBERO truncateMetaDescription, simplificado y conservando lógica)
 */
export function truncateMetaDescription(description: string, max = META_MAX): string {
  const normalized = description.replace(/\.{3,}/g, ' ').replace(/\s+/g, ' ').replace(/[“”"]/g, "'").trim();
  const trimEnding = (t: string) => t.trim().replace(/[,:;.\-–—\s]+$/g, '').trim();

  const trimWeak = (t: string) => {
    const words = trimEnding(t).split(' ').filter(Boolean);
    while (words.length > 3) {
      const last = words[words.length - 1]?.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      if (!last || !WEAK_ENDINGS.has(last)) break;
      words.pop();
    }
    return words.join(' ');
  };
  const finalize = (t: string) => {
    let r = trimWeak(t) || trimEnding(t);
    if (r && !/[.!?]$/.test(r) && `${r}.`.length <= max) r = `${r}.`;
    return r;
  };

  if (normalized.length <= max) return finalize(normalized);

  // 1) Oraciones completas si conservan ≥65% del cupo.
  const sentences = normalized.split(/(?<=[.!?])\s+/);
  let acc = '';
  for (const s of sentences) {
    const cand = acc ? `${acc} ${s}` : s;
    if (cand.length > max) break;
    acc = cand;
  }
  if (acc && acc.length >= Math.floor(max * 0.65)) return finalize(acc.trim());

  // 2) Fallback: por palabra.
  let words = '';
  for (const w of normalized.split(' ')) {
    const cand = words ? `${words} ${w}` : w;
    if (cand.length > max) break;
    words = cand;
  }
  return finalize(words || normalized.slice(0, max));
}

/* ════════════════════════════════════════════════════════════════════════════
 * 2) buildMeta() — datos para <head>  (consumido por SEOHead.astro)
 * ════════════════════════════════════════════════════════════════════════════ */

export type MetaInput = {
  title?: string;          // sin marca; buildMeta añade el sufijo si cabe
  description?: string;
  canonical?: string;      // ruta relativa o URL absoluta; se normaliza
  image?: string;          // ruta relativa o URL absoluta; default = SITE.seo.image
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;  // ISO — solo para type:'article'
  modifiedTime?: string;   // ISO — solo para type:'article'
};

export type MetaOutput = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  robots: string;
  locale: string;          // og:locale, p.ej. 'es_MX'
  siteName: string;
  twitterCard: 'summary_large_image';
  twitterSite?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Normaliza los metadatos de una página. El layout pasa esto a <SEOHead>.
 * - title: keyword-first, marca añadida solo si ≤60 chars.
 * - description: recortada a ≤160 con lógica de oración/palabra.
 * - canonical/image: absolutas y con trailing slash según política.
 * - robots: 'noindex,nofollow' si noindex; si no, directiva index completa.
 */
export function buildMeta(input: MetaInput): MetaOutput {
  return {
    title: formatTitle(input.title),
    description: truncateMetaDescription(input.description ?? SITE.seo?.description ?? ''),
    canonical: absUrl(input.canonical ?? '/'),
    image: absImage(input.image) ?? absImage(SITE.seo?.image) ?? `${SITE.url}/og.jpg`,
    type: input.type ?? 'website',
    robots: input.noindex
      ? 'noindex,nofollow'
      : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
    locale: SITE.locale?.replace('-', '_') ?? 'es_MX',
    siteName: SITE.name,
    twitterCard: 'summary_large_image',
    twitterSite: SITE.social?.twitter,
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
  };
}

/* ════════════════════════════════════════════════════════════════════════════
 * 3) NODOS RAÍZ DEL @graph  (origen: PODIUMEX businessNode/websiteNode + EVENTECH)
 *    Sin '@context' porque viven DENTRO de un @graph que ya lo declara.
 * ════════════════════════════════════════════════════════════════════════════ */

/** Organization — entidad publisher; el resto la referencia por @id. */
export function orgSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.organization?.name ?? SITE.name,
    ...(SITE.organization?.legalName ? { legalName: SITE.organization.legalName } : {}),
    url: SITE.url,
    logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: absImage(SITE.organization?.logo) ?? `${SITE.url}/logo.png` },
    image: { '@id': LOGO_ID },
    description: SITE.seo?.description ?? SITE.description ?? '',
    ...(SITE.organization?.foundingDate ? { foundingDate: SITE.organization.foundingDate } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneRaw ?? CONTACT.phone,
      email: CONTACT.email,
      contactType: 'customer service',
      areaServed: 'MX',
      availableLanguage: ['es-MX', 'Spanish'],
    },
    ...(SITE.organization?.sameAs?.length ? { sameAs: SITE.organization.sameAs } : {}),
  };
}

/** WebSite + SearchAction (si SITE.searchUrl está definido). */
export function websiteSchema() {
  const search = SITE.searchUrl; // p.ej. 'https://sitio.com/buscar?q={query}'
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.seo?.description ?? SITE.description ?? '',
    inLanguage: SITE.locale ?? 'es-MX',
    publisher: { '@id': ORG_ID },
    ...(search
      ? {
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: search },
            'query-input': 'required name=query',
          },
        }
      : {}),
  };
}

/**
 * LocalBusiness — para arquetipos C (servicio local) y A/B con sede física.
 * `@type` configurable vía SITE.business.type (LocalBusiness | Store |
 * ['LocalBusiness','SecurityService'] …). areaServed mapea ciudades.
 */
export function localBusinessSchema(overrides?: { areaServed?: string[] }) {
  const b = SITE.business ?? {};
  const a = (b as any).address ?? {};
  return {
    '@type': (b as any).type ?? 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: SITE.organization?.name ?? SITE.name,
    description: SITE.seo?.description ?? SITE.description ?? '',
    url: SITE.url,
    image: absImage(SITE.seo?.image),
    logo: { '@id': LOGO_ID },
    parentOrganization: { '@id': ORG_ID },
    telephone: CONTACT.phoneRaw ?? CONTACT.phone,
    email: CONTACT.email,
    priceRange: (b as any).priceRange ?? '$$',
    currenciesAccepted: 'MXN',
    ...(a.street || a.locality
      ? {
          address: {
            '@type': 'PostalAddress',
            ...(a.street ? { streetAddress: a.street } : {}),
            addressLocality: a.locality ?? 'Ciudad de México',
            addressRegion: a.region ?? 'CDMX',
            ...(a.postalCode ? { postalCode: a.postalCode } : {}),
            addressCountry: a.country ?? 'MX',
          },
        }
      : {}),
    ...((b as any).geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: (b as any).geo.lat ?? (b as any).geo.latitude, longitude: (b as any).geo.lng ?? (b as any).geo.longitude } }
      : {}),
    ...((b as any).openingHours
      ? {
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: (b as any).openingHours.weekdays?.opens ?? '09:00',
              closes: (b as any).openingHours.weekdays?.closes ?? '18:00',
            },
            ...((b as any).openingHours.saturday
              ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: (b as any).openingHours.saturday.opens, closes: (b as any).openingHours.saturday.closes }]
              : []),
          ],
        }
      : {}),
    areaServed: (overrides?.areaServed ?? (b as any).areaServed ?? ['Ciudad de México']).map((name: string) => ({ '@type': 'City', name })),
    ...(SITE.organization?.sameAs?.length ? { sameAs: SITE.organization.sameAs } : {}),
  };
}

/* ════════════════════════════════════════════════════════════════════════════
 * 4) NODOS POR TIPO DE PÁGINA  (origen: PODIUMEX + EVENTECH, fusionados)
 * ════════════════════════════════════════════════════════════════════════════ */

export type Crumb = { name: string; path: string };

/** BreadcrumbList — se emite UNA sola vez (ver REGLA DURA B3 arriba). */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

export type ProductData = {
  name: string;
  description: string;
  path: string;          // ruta de la ficha, p.ej. '/catalogo/podium-acrilico/'
  images: string[];
  sku?: string;
  brand?: string;
  category?: string;
  material?: string;
  price?: string;        // 'desde' en MXN, solo dígitos. Omítelo si es "bajo cotización".
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  reviews?: Review[];    // ← solo reseñas REALES verificables (ver emitReviews)
};

/**
 * Product + Offer honesto.
 * - Si NO hay `price`, se emite Offer "bajo cotización" (UnitPriceSpecification),
 *   patrón de negocio WhatsApp-first sin precio público (origen BOMBERO).
 * - aggregateRating/Review SOLO si emitReviews() valida reseñas reales.
 */
export function productSchema(p: ProductData) {
  const url = absUrl(p.path);
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    url,
    priceCurrency: 'MXN',
    availability: `https://schema.org/${p.availability ?? 'InStock'}`,
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': BUSINESS_ID },
    areaServed: 'MX',
  };
  if (p.price) {
    offer.price = p.price;
    offer.priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
  } else {
    offer.price = '0';
    offer.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: '0',
      priceCurrency: 'MXN',
      description: 'Precio bajo cotización — contáctanos para tarifa personalizada.',
    };
  }
  return {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: p.name,
    description: p.description,
    image: p.images.map((i) => absImage(i)!),
    ...(p.sku ? { sku: p.sku } : {}),
    ...(p.category ? { category: p.category } : {}),
    ...(p.material ? { material: p.material } : {}),
    brand: { '@type': 'Brand', name: p.brand ?? SITE.name },
    manufacturer: { '@id': ORG_ID },
    url,
    offers: offer,
    ...emitReviews(p.reviews),
  };
}

export type ServiceData = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  image?: string;
  areaServed?: string[];
  priceRange?: { min: number; max: number; currency?: string };
  reviews?: Review[];
};

/** Service — para arquetipos B (renta) y C (servicio profesional). */
export function serviceSchema(s: ServiceData) {
  const url = absUrl(s.path);
  return {
    '@type': 'Service',
    name: s.name,
    description: s.description,
    serviceType: s.serviceType ?? s.name,
    url,
    ...(s.image ? { image: absImage(s.image) } : {}),
    provider: { '@id': BUSINESS_ID },
    areaServed: (s.areaServed ?? (SITE.business as any)?.areaServed ?? ['Ciudad de México']).map((name: string) => ({ '@type': 'City', name })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: CONTACT.phoneRaw ?? CONTACT.phone,
    },
    ...(s.priceRange
      ? {
          offers: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: s.priceRange.min,
              maxPrice: s.priceRange.max,
              priceCurrency: s.priceRange.currency ?? 'MXN',
            },
          },
        }
      : {}),
    ...emitReviews(s.reviews),
  };
}

export type ArticleData = {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  section?: string;
  keywords?: string;
};

/** Article / BlogPosting — para el blog (colección .mdx). */
export function articleSchema(a: ArticleData) {
  const url = absUrl(a.path);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: a.title,
    description: a.description,
    url,
    ...(a.image ? { image: absImage(a.image) } : {}),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: SITE.locale ?? 'es-MX',
    author: a.author ? { '@type': 'Person', name: a.author } : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(a.section ? { articleSection: a.section } : {}),
    ...(a.keywords ? { keywords: a.keywords } : {}),
  };
}

export type FaqItem = { question: string; answer: string };

/** FAQPage. Emítelo SOLO si las preguntas son visibles en la página. */
export function faqSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export type ListItem = { name: string; path: string; image?: string; description?: string };

/**
 * CollectionPage + ItemList — para páginas de categoría (L2) y directorios (D).
 * (origen: PODIUMEX itemListSchema + EVENTECH collectionPage/itemList)
 */
export function directorySchema(data: { name: string; description: string; path: string; items: ListItem[]; areaServed?: string }) {
  return {
    '@type': 'CollectionPage',
    name: data.name,
    description: data.description,
    url: absUrl(data.path),
    inLanguage: SITE.locale ?? 'es-MX',
    isPartOf: { '@id': WEBSITE_ID },
    ...(data.areaServed
      ? { about: { '@type': 'Place', name: data.areaServed, address: { '@type': 'PostalAddress', addressLocality: data.areaServed, addressCountry: 'MX' } } }
      : {}),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: data.items.length,
      itemListElement: data.items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: absUrl(it.path),
        ...(it.image ? { image: absImage(it.image) } : {}),
        ...(it.description ? { description: it.description } : {}),
      })),
    },
  };
}

/* ════════════════════════════════════════════════════════════════════════════
 * 5) REGLA DURA — RESEÑAS / RATINGS  (origen: EVENTECH serviceWithReviewJsonLd)
 * ════════════════════════════════════════════════════════════════════════════
 * Google prohíbe reseñas/ratings AUTO-EMITIDOS (self-serving) sobre la propia
 * entidad: provocan acción manual y pérdida de rich results. Por eso NUNCA
 * fabricamos aggregateRating. emitReviews() devuelve `{}` (nada) salvo que se
 * le pasen reseñas REALES de terceros con autor, texto, rating y fecha.
 * Para activarlas: SITE.allowSelfReviews debe ser true Y cada review debe ser
 * verificable (p.ej. importada de Google Business Profile). En la duda: vacío.
 */
export type Review = { author: string; text: string; rating: number; date: string };

function emitReviews(reviews?: Review[]): Record<string, unknown> {
  // Sin reseñas, o función de auto-reseña desactivada (default) → no emitir NADA.
  if (!reviews?.length || !SITE.allowSelfReviews) return {};
  const valid = reviews.filter((r) => r.author && r.text && r.rating >= 1 && r.rating <= 5 && r.date);
  if (!valid.length) return {};
  const avg = valid.reduce((s, r) => s + r.rating, 0) / valid.length;
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: valid.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: valid.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  };
}

/* ════════════════════════════════════════════════════════════════════════════
 * 6) buildSchema() — selector por tipo de página  (origen: PODIUMEX globalGraph)
 * ════════════════════════════════════════════════════════════════════════════
 * Devuelve un ARRAY de objetos JSON-LD. El layout lo serializa con <JsonLd>.
 *
 * El grafo base (Organization + WebSite + LocalBusiness) se entrega como UN
 * objeto con @graph para que Google consolide las entidades por @id. Los nodos
 * de página (Product, Service, Article, FAQ, Breadcrumb…) van como objetos
 * sueltos con su propio @context. Todos los @id apuntan al mismo grafo raíz.
 *
 * pageType: 'home' | 'page' | 'category' | 'product' | 'service' | 'article' | 'directory' | 'faq'
 *   'page' = página genérica (contacto, nosotros, gracias…): solo grafo base +
 *   breadcrumb, sin nodo de tipo. Es el DEFAULT de BaseLayout.
 *
 * Nota de rendimiento (origen BOMBERO BaseLayout): en sitios con miles de
 * páginas conviene inyectar el @graph base SOLO en 'home' y 'service'/'category'
 * clave, no en cada hoja. Aquí lo incluimos siempre por simplicidad; recórtalo
 * en buildSchema() si el sitio supera ~1.000 URLs.
 */
const CTX = 'https://schema.org';

export type PageType = 'home' | 'page' | 'category' | 'product' | 'service' | 'article' | 'directory' | 'faq';

export type SchemaData = {
  breadcrumbs?: Crumb[];          // si se pasa → se emite BreadcrumbList (1 vez)
  product?: ProductData;
  service?: ServiceData;
  article?: ArticleData;
  faqs?: FaqItem[];
  list?: { name: string; description: string; path: string; items: ListItem[]; areaServed?: string };
  areaServed?: string[];          // override de LocalBusiness en páginas de zona
};

export function buildSchema(pageType: PageType, data: SchemaData = {}): object[] {
  const out: object[] = [];

  // Grafo base consolidado por @id (siempre en home; útil en el resto).
  const baseGraph: object[] = [orgSchema(), websiteSchema()];
  // LocalBusiness solo si el sitio tiene sede/área (arquetipos A/B/C/D locales).
  if (SITE.business) baseGraph.push(localBusinessSchema({ areaServed: data.areaServed }));
  out.push({ '@context': CTX, '@graph': baseGraph });

  // Breadcrumb: SOLO aquí, una vez (nunca también en <Breadcrumb>).
  if (data.breadcrumbs?.length) out.push({ '@context': CTX, ...breadcrumbSchema(data.breadcrumbs) });

  switch (pageType) {
    case 'home':
    case 'page':
      break; // el grafo base ya cubre la home y las páginas genéricas
    case 'product':
      if (data.product) out.push({ '@context': CTX, ...productSchema(data.product) });
      break;
    case 'service':
      if (data.service) out.push({ '@context': CTX, ...serviceSchema(data.service) });
      break;
    case 'article':
      if (data.article) out.push({ '@context': CTX, ...articleSchema(data.article) });
      break;
    case 'category':
    case 'directory':
      if (data.list) out.push({ '@context': CTX, ...directorySchema(data.list) });
      break;
    case 'faq':
      break; // las FAQ se añaden abajo (también pueden acompañar a otros tipos)
  }

  // FAQ adicional (puede convivir con product/service si están visibles).
  if (data.faqs?.length) out.push({ '@context': CTX, ...faqSchema(data.faqs) });

  return out;
}
