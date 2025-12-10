/**
 * CATEGORIAS - MINIMAL JAVASCRIPT
 * Simple, clean category rendering inspired by Apple's design
 */

// Category Icons (simple SVG paths)
const categoryIcons = {
  eventos: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM16 2v4M8 2v4M3 10h18"/>',
  manufactura: '<path d="M2 20h20M2 5l6 5v10M8 10l6-5v15"/>',
  tecnologia: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  logistica: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  construccion: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  alimentos: '<path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>',
  salud: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  energia: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  educacion: '<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
  marketing: '<path d="M11 5L6 9l5 4-5 4 5 4M18 3l-5 18"/>',
  financieros: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  legales: '<path d="M14 2H6a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/>',
  humanos: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  consultoria: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/>',
  inmobiliario: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  telecomunicaciones: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  seguridad: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  'seguridad-privada': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  limpieza: '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>',
  ecommerce: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>',
  'fiestas-infantiles': '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>'
};

// Category Data (from categories.json)
let categoriesData = [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  setupSearch();
});

/**
 * Load categories from JSON
 */
async function loadCategories() {
  try {
    const response = await fetch('assets/data/categories.json');
    const data = await response.json();
    categoriesData = data.categories;

    renderCategories(categoriesData);
  } catch (error) {
    console.error('Error loading categories:', error);
    showError();
  }
}

/**
 * Render categories in minimal cards
 */
function renderCategories(categories) {
  const grid = document.getElementById('categories-grid');
  const loadingState = document.getElementById('loading-state');
  const noResults = document.getElementById('no-results');
  const resultsCount = document.getElementById('results-count');

  // Hide loading
  if (loadingState) {
    loadingState.remove();
  }

  // Show/hide no results
  if (categories.length === 0) {
    noResults.classList.remove('hidden');
    grid.innerHTML = '';
    resultsCount.textContent = '0 categorías encontradas';
    return;
  } else {
    noResults.classList.add('hidden');
  }

  // Update count
  resultsCount.textContent = `${categories.length} categoría${categories.length !== 1 ? 's' : ''} disponible${categories.length !== 1 ? 's' : ''}`;

  // Sort alphabetically
  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name, 'es')
  );

  // Render cards
  grid.innerHTML = sortedCategories.map(category => createCategoryCard(category)).join('');
}

/**
 * Create minimal category card
 */
function createCategoryCard(category) {
  const icon = categoryIcons[category.slug] || categoryIcons.default || categoryIcons.ecommerce;
  const badge = category.featured ? '<span class="badge-minimal badge-nuevo">Nuevo</span>' :
                category.trending ? '<span class="badge-minimal badge-trending">Popular</span>' : '';

  return `
    <a href="${category.slug}.html" class="category-card-minimal" data-category="${category.slug}">
      <div class="category-icon-minimal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${icon}
        </svg>
      </div>
      <h3 class="category-name-minimal">
        ${category.name}${badge}
      </h3>
      <p class="category-count-minimal">${category.companyCount.toLocaleString('es-MX')} empresas</p>
      <svg class="category-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </a>
  `;
}

/**
 * Setup search functionality
 */
function setupSearch() {
  const searchInput = document.getElementById('category-search');
  if (!searchInput) return;

  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      const query = e.target.value.toLowerCase().trim();

      if (query === '') {
        renderCategories(categoriesData);
        return;
      }

      // Filter categories
      const filtered = categoriesData.filter(category => {
        return category.name.toLowerCase().includes(query) ||
               category.slug.toLowerCase().includes(query) ||
               (category.keywords && category.keywords.some(k => k.toLowerCase().includes(query)));
      });

      renderCategories(filtered);
    }, 300); // 300ms debounce
  });
}

/**
 * Show error state
 */
function showError() {
  const grid = document.getElementById('categories-grid');
  grid.innerHTML = `
    <div class="no-results-minimal">
      <svg class="no-results-minimal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3 class="no-results-minimal-title">Error al cargar categorías</h3>
      <p class="no-results-minimal-text">Por favor, recarga la página</p>
    </div>
  `;
}
