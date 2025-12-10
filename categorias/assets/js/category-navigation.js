/**
 * CATEGORY NAVIGATION SYSTEM
 * Handles search, filtering, sorting, and rendering of category cards
 */

// Utility: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// SVG Icon Generator
const IconGenerator = {
  calendar: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path><path d="M16 2v4M8 2v4M3 10h18"></path>',
  factory: '<path d="M2 20h20M2 5l6 5v10M8 10l6-5v15"></path>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
  truck: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
  package: '<path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"></path>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
  book: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>',
  'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
  'dollar-sign': '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>',
  users: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path>',
  target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"></path>',
  wifi: '<path d="M5 12.55a11 11 0 0114.08 0"></path><path d="M1.42 9a16 16 0 0121.16 0"></path><path d="M8.53 16.11a6 6 0 016.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
  droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>',
  'shopping-cart': '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>'
};

// Category Navigation Manager
class CategoryNavigationManager {
  constructor() {
    this.categories = [];
    this.filteredCategories = [];
    this.currentView = 'grid';
    this.currentSort = 'alphabetical';
    this.searchQuery = '';

    this.elements = {
      searchInput: document.getElementById('category-search'),
      searchClear: document.getElementById('search-clear'),
      suggestions: document.getElementById('category-suggestions'),
      grid: document.getElementById('categories-grid'),
      resultsCount: document.getElementById('results-count'),
      sortSelect: document.getElementById('sort-categories'),
      viewButtons: document.querySelectorAll('.view-btn'),
      noResults: document.getElementById('no-results'),
      clearSearchBtn: document.getElementById('clear-search-btn')
    };

    this.init();
  }

  async init() {
    await this.loadCategories();
    this.setupEventListeners();
    this.renderCategories();
    this.loadRecentlyViewed();
  }

  async loadCategories() {
    try {
      const response = await fetch('assets/data/categorias-data.json');
      const data = await response.json();
      this.categories = data.categories;
      this.filteredCategories = [...this.categories];
    } catch (error) {
      console.error('Error loading categories:', error);
      this.showError();
    }
  }

  setupEventListeners() {
    // Search input with debounce
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', debounce((e) => {
        this.searchQuery = e.target.value.trim();
        this.handleSearch();
      }, 300));

      this.elements.searchInput.addEventListener('focus', () => {
        if (this.searchQuery.length >= 2) {
          this.showSuggestions();
        }
      });

      // Keyboard navigation for search
      this.elements.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideSuggestions();
          this.elements.searchInput.blur();
        }
      });
    }

    // Clear search button
    if (this.elements.searchClear) {
      this.elements.searchClear.addEventListener('click', () => {
        this.clearSearch();
      });
    }

    // Sort select
    if (this.elements.sortSelect) {
      this.elements.sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.sortAndRender();
      });
    }

    // View toggle buttons
    this.elements.viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentView = btn.dataset.view;
        this.updateViewButtons();
        this.updateGridView();
      });
    });

    // Clear search from no results
    if (this.elements.clearSearchBtn) {
      this.elements.clearSearchBtn.addEventListener('click', () => {
        this.clearSearch();
      });
    }

    // Click outside to close suggestions
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-form-categories')) {
        this.hideSuggestions();
      }
    });
  }

  handleSearch() {
    if (this.searchQuery.length >= 2) {
      this.filterCategories();
      this.showSuggestions();
      this.elements.searchClear.style.display = 'block';
    } else {
      this.filteredCategories = [...this.categories];
      this.hideSuggestions();
      this.elements.searchClear.style.display = 'none';
    }
    this.sortAndRender();
  }

  filterCategories() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCategories = this.categories.filter(cat => {
      return (
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
        cat.subcategories.some(sub => sub.toLowerCase().includes(query))
      );
    });
  }

  showSuggestions() {
    if (this.filteredCategories.length === 0) {
      this.hideSuggestions();
      return;
    }

    const topResults = this.filteredCategories.slice(0, 5);
    const html = topResults.map(cat => `
      <div class="suggestion-item" role="option" data-category="${cat.slug}">
        <div class="suggestion-icon" style="background: ${cat.gradient};">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            ${IconGenerator[cat.icon] || IconGenerator.package}
          </svg>
        </div>
        <div class="suggestion-info">
          <div class="suggestion-name">${this.highlightMatch(cat.name)}</div>
          <div class="suggestion-count">${cat.companyCount.toLocaleString('es-MX')} empresas</div>
        </div>
      </div>
    `).join('');

    this.elements.suggestions.innerHTML = html;
    this.elements.suggestions.style.display = 'block';

    // Add click handlers to suggestions
    this.elements.suggestions.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const slug = item.dataset.category;
        const category = this.categories.find(c => c.slug === slug);
        if (category) {
          this.navigateToCategory(category);
        }
      });
    });
  }

  hideSuggestions() {
    this.elements.suggestions.style.display = 'none';
  }

  highlightMatch(text) {
    if (!this.searchQuery) return text;
    const regex = new RegExp(`(${this.searchQuery})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }

  clearSearch() {
    this.searchQuery = '';
    this.elements.searchInput.value = '';
    this.elements.searchClear.style.display = 'none';
    this.filteredCategories = [...this.categories];
    this.hideSuggestions();
    this.sortAndRender();
  }

  sortAndRender() {
    this.sortCategories();
    this.renderCategories();
  }

  sortCategories() {
    switch (this.currentSort) {
      case 'alphabetical':
        this.filteredCategories.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        break;
      case 'companies-desc':
        this.filteredCategories.sort((a, b) => b.companyCount - a.companyCount);
        break;
      case 'companies-asc':
        this.filteredCategories.sort((a, b) => a.companyCount - b.companyCount);
        break;
      case 'trending':
        this.filteredCategories.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.companyCount - a.companyCount;
        });
        break;
      case 'recent':
        this.filteredCategories.sort((a, b) => {
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
        break;
    }
  }

  renderCategories() {
    // Update results count
    const count = this.filteredCategories.length;
    this.elements.resultsCount.innerHTML = `Mostrando <strong>${count} ${count === 1 ? 'categoría' : 'categorías'}</strong>`;

    // Show/hide no results
    if (count === 0) {
      this.elements.grid.style.display = 'none';
      this.elements.noResults.style.display = 'block';
      return;
    } else {
      this.elements.grid.style.display = 'grid';
      this.elements.noResults.style.display = 'none';
    }

    // Render category cards
    const html = this.filteredCategories.map(cat => this.createCategoryCard(cat)).join('');
    this.elements.grid.innerHTML = html;

    // Add click tracking
    this.elements.grid.querySelectorAll('.category-card-hub').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          const slug = card.dataset.slug;
          const category = this.categories.find(c => c.slug === slug);
          if (category) {
            this.trackCategoryView(category);
            this.navigateToCategory(category);
          }
        }
      });
    });
  }

  createCategoryCard(cat) {
    const stars = this.generateStars(cat.avgRating);
    const badges = [];

    if (cat.verified) badges.push('<span class="category-badge verified">✓ Verificado</span>');
    if (cat.trending) badges.push('<span class="category-badge trending">🔥 Tendencia</span>');
    if (cat.featured) badges.push('<span class="category-badge featured">⭐ Destacado</span>');

    return `
      <article class="category-card-hub"
               data-slug="${cat.slug}"
               data-featured="${cat.featured}"
               style="--category-gradient: ${cat.gradient};">
        <div class="category-card-header">
          <div class="category-icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${IconGenerator[cat.icon] || IconGenerator.package}
            </svg>
          </div>
          <div class="category-info">
            <h3 class="category-name">${cat.name}</h3>
            <p class="category-count">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle;">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                <path d="M16 3.13a4 4 0 010 7.75"></path>
              </svg>
              ${cat.companyCount.toLocaleString('es-MX')} empresas
            </p>
          </div>
        </div>
        <div class="category-card-body">
          <p class="category-description">${cat.description}</p>
          <div class="category-badges">
            ${badges.join('')}
          </div>
        </div>
        <div class="category-card-footer">
          <div class="category-rating">
            <div class="stars">${stars}</div>
            <span>${cat.avgRating.toFixed(1)}</span>
          </div>
          <svg class="category-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </article>
    `;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let html = '';
    for (let i = 0; i < fullStars; i++) {
      html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
    if (hasHalfStar) {
      html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
    for (let i = 0; i < emptyStars; i++) {
      html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
    return html;
  }

  updateViewButtons() {
    this.elements.viewButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === this.currentView);
    });
  }

  updateGridView() {
    this.elements.grid.dataset.view = this.currentView;
  }

  navigateToCategory(category) {
    this.trackCategoryView(category);
    window.location.href = category.url;
  }

  trackCategoryView(category) {
    // Save to recently viewed
    let recent = JSON.parse(localStorage.getItem('recentlyViewedCategories') || '[]');
    recent = recent.filter(slug => slug !== category.slug);
    recent.unshift(category.slug);
    recent = recent.slice(0, 6); // Keep only last 6
    localStorage.setItem('recentlyViewedCategories', JSON.stringify(recent));

    // Track analytics
    if (window.categoryAnalytics) {
      window.categoryAnalytics.trackCategoryView(category);
    }
  }

  loadRecentlyViewed() {
    const recent = JSON.parse(localStorage.getItem('recentlyViewedCategories') || '[]');
    if (recent.length === 0) return;

    const recentCategories = recent
      .map(slug => this.categories.find(c => c.slug === slug))
      .filter(Boolean);

    if (recentCategories.length > 0) {
      this.renderRecentlyViewed(recentCategories);
    }
  }

  renderRecentlyViewed(categories) {
    const section = document.getElementById('recently-viewed-section');
    const grid = document.getElementById('recently-viewed-grid');

    if (!section || !grid) return;

    const html = categories.map(cat => this.createCategoryCard(cat)).join('');
    grid.innerHTML = html;
    section.style.display = 'block';

    // Add click handlers
    grid.querySelectorAll('.category-card-hub').forEach(card => {
      card.addEventListener('click', () => {
        const slug = card.dataset.slug;
        const category = this.categories.find(c => c.slug === slug);
        if (category) {
          this.navigateToCategory(category);
        }
      });
    });
  }

  showError() {
    this.elements.grid.innerHTML = `
      <div class="loading-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: #EF4444;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <p style="color: #EF4444; font-weight: 600;">Error al cargar las categorías</p>
        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 16px;">Reintentar</button>
      </div>
    `;
  }
}

// Personalization Engine
class PersonalizationEngine {
  constructor() {
    this.userPreferences = this.loadPreferences();
    this.viewHistory = this.loadViewHistory();
  }

  loadPreferences() {
    return JSON.parse(localStorage.getItem('categoryPreferences') || '{}');
  }

  loadViewHistory() {
    return JSON.parse(localStorage.getItem('categoryViewHistory') || '[]');
  }

  savePreference(key, value) {
    this.userPreferences[key] = value;
    localStorage.setItem('categoryPreferences', JSON.stringify(this.userPreferences));
  }

  addToViewHistory(categorySlug) {
    this.viewHistory.push({
      slug: categorySlug,
      timestamp: new Date().toISOString()
    });
    // Keep last 50 views
    this.viewHistory = this.viewHistory.slice(-50);
    localStorage.setItem('categoryViewHistory', JSON.stringify(this.viewHistory));
  }

  getRecommendations(allCategories, count = 4) {
    // Simple recommendation based on view history
    const viewedSlugs = [...new Set(this.viewHistory.map(v => v.slug))];
    const notViewed = allCategories.filter(cat => !viewedSlugs.includes(cat.slug));

    // Prioritize trending and featured
    notViewed.sort((a, b) => {
      const scoreA = (a.trending ? 2 : 0) + (a.featured ? 1 : 0);
      const scoreB = (b.trending ? 2 : 0) + (b.featured ? 1 : 0);
      return scoreB - scoreA || b.companyCount - a.companyCount;
    });

    return notViewed.slice(0, count);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.categoryNav = new CategoryNavigationManager();
  window.personalization = new PersonalizationEngine();

  // Load recommendations if available
  setTimeout(() => {
    if (window.categoryNav.categories.length > 0) {
      const recommendations = window.personalization.getRecommendations(window.categoryNav.categories);
      if (recommendations.length > 0) {
        renderRecommendations(recommendations);
      }
    }
  }, 1000);
});

// Render Recommendations
function renderRecommendations(categories) {
  const section = document.getElementById('recommended-section');
  const grid = document.getElementById('recommended-grid');

  if (!section || !grid || !window.categoryNav) return;

  const html = categories.map(cat => window.categoryNav.createCategoryCard(cat)).join('');
  grid.innerHTML = html;
  section.style.display = 'block';

  // Add click handlers
  grid.querySelectorAll('.category-card-hub').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      const category = window.categoryNav.categories.find(c => c.slug === slug);
      if (category) {
        window.categoryNav.navigateToCategory(category);
      }
    });
  });
}
