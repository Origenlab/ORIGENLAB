/**
 * OrigenLab B2B Directory
 * Main JavaScript Application
 * Version: 1.0.0
 */

(function() {
  'use strict';

  // ==========================================================================
  // Utility Functions
  // ==========================================================================

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ==========================================================================
  // Search Functionality
  // ==========================================================================

  class SearchManager {
    constructor() {
      this.searchInput = document.getElementById('main-search');
      this.suggestionsBox = document.getElementById('search-suggestions');
      this.searchForm = document.querySelector('.search-form');

      if (this.searchInput) {
        this.init();
      }
    }

    init() {
      // Handle search input with debounce
      this.searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          this.showSuggestions(query);
        } else {
          this.hideSuggestions();
        }
      }, 300));

      // Handle form submission
      if (this.searchForm) {
        this.searchForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.performSearch(this.searchInput.value);
        });
      }

      // Hide suggestions when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.searchInput.contains(e.target) && !this.suggestionsBox?.contains(e.target)) {
          this.hideSuggestions();
        }
      });

      // Handle keyboard navigation
      this.searchInput.addEventListener('keydown', (e) => {
        this.handleKeyboardNav(e);
      });
    }

    showSuggestions(query) {
      // In a real implementation, this would make an API call
      // For now, we'll show the suggestions box if it exists
      if (this.suggestionsBox) {
        this.suggestionsBox.hidden = false;

        // Add entrance animation
        this.suggestionsBox.style.animation = 'fadeIn 200ms ease-out';
      }
    }

    hideSuggestions() {
      if (this.suggestionsBox) {
        this.suggestionsBox.hidden = true;
      }
    }

    performSearch(query) {
      console.log('Searching for:', query);
      // In production, navigate to search results or filter companies
      // window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
    }

    handleKeyboardNav(e) {
      // Handle arrow keys for suggestion navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        // Navigate through suggestions
      } else if (e.key === 'Escape') {
        this.hideSuggestions();
      }
    }
  }

  // ==========================================================================
  // Filter System
  // ==========================================================================

  class FilterManager {
    constructor() {
      this.filterToggles = document.querySelectorAll('.filter-toggle');
      this.filterCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');
      this.filterClear = document.querySelector('.filters-clear');
      this.quickFilters = document.querySelectorAll('.filter-chip');

      this.activeFilters = {
        location: [],
        industry: [],
        certification: [],
        size: []
      };

      this.init();
    }

    init() {
      // Handle filter accordion toggle
      this.filterToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          this.toggleFilterGroup(toggle);
        });
      });

      // Handle checkbox changes
      this.filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          this.handleFilterChange(e.target);
        });
      });

      // Clear all filters
      if (this.filterClear) {
        this.filterClear.addEventListener('click', () => {
          this.clearAllFilters();
        });
      }

      // Quick filters
      this.quickFilters.forEach(chip => {
        chip.addEventListener('click', () => {
          this.handleQuickFilter(chip);
        });
      });
    }

    toggleFilterGroup(toggle) {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const content = toggle.closest('.filter-group-title').nextElementSibling;

      if (content) {
        toggle.setAttribute('aria-expanded', !isExpanded);
        content.hidden = isExpanded;
      }
    }

    handleFilterChange(checkbox) {
      const filterName = checkbox.name;
      const filterValue = checkbox.value;

      if (checkbox.checked) {
        if (!this.activeFilters[filterName].includes(filterValue)) {
          this.activeFilters[filterName].push(filterValue);
        }
      } else {
        this.activeFilters[filterName] = this.activeFilters[filterName].filter(
          v => v !== filterValue
        );
      }

      this.applyFilters();
    }

    handleQuickFilter(chip) {
      const filterType = chip.dataset.filter;
      chip.classList.toggle('active');

      // In production, this would trigger a filter modal or expand the sidebar
      console.log('Quick filter clicked:', filterType);
    }

    applyFilters() {
      console.log('Active filters:', this.activeFilters);
      // In production, this would filter the companies grid
      // Could make an AJAX request or filter client-side
      this.updateURL();
    }

    clearAllFilters() {
      // Reset all filter categories
      Object.keys(this.activeFilters).forEach(key => {
        this.activeFilters[key] = [];
      });

      // Uncheck all checkboxes
      this.filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
      });

      // Remove active state from quick filters
      this.quickFilters.forEach(chip => {
        chip.classList.remove('active');
      });

      this.applyFilters();
    }

    updateURL() {
      // Update browser URL without page reload
      const params = new URLSearchParams();

      Object.entries(this.activeFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(','));
        }
      });

      const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
      window.history.pushState({}, '', newURL);
    }
  }

  // ==========================================================================
  // View Toggle (Grid/List)
  // ==========================================================================

  class ViewManager {
    constructor() {
      this.viewButtons = document.querySelectorAll('.view-btn');
      this.companiesGrid = document.querySelector('.companies-grid');
      this.currentView = 'grid';

      this.init();
    }

    init() {
      this.viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.switchView(btn.dataset.view);
        });
      });
    }

    switchView(view) {
      if (view === this.currentView) return;

      this.currentView = view;

      // Update button states
      this.viewButtons.forEach(btn => {
        const isActive = btn.dataset.view === view;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
      });

      // Update grid layout
      if (this.companiesGrid) {
        this.companiesGrid.classList.toggle('list-view', view === 'list');
        this.companiesGrid.classList.toggle('grid-view', view === 'grid');
      }
    }
  }

  // ==========================================================================
  // Company Bookmarking
  // ==========================================================================

  class BookmarkManager {
    constructor() {
      this.bookmarkButtons = document.querySelectorAll('.company-bookmark');
      this.bookmarks = this.loadBookmarks();

      this.init();
    }

    init() {
      this.bookmarkButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleBookmark(btn);
        });

        // Set initial state
        const companyId = this.getCompanyId(btn);
        if (this.bookmarks.includes(companyId)) {
          this.setBookmarked(btn, true);
        }
      });
    }

    toggleBookmark(btn) {
      const companyId = this.getCompanyId(btn);
      const isBookmarked = this.bookmarks.includes(companyId);

      if (isBookmarked) {
        this.bookmarks = this.bookmarks.filter(id => id !== companyId);
        this.setBookmarked(btn, false);
      } else {
        this.bookmarks.push(companyId);
        this.setBookmarked(btn, true);
      }

      this.saveBookmarks();
      this.showToast(isBookmarked ? 'Empresa eliminada de favoritos' : 'Empresa guardada en favoritos');
    }

    getCompanyId(btn) {
      // In production, this would get the actual company ID from data attribute
      const card = btn.closest('.company-card');
      return card?.querySelector('.company-name')?.textContent || 'unknown';
    }

    setBookmarked(btn, isBookmarked) {
      btn.classList.toggle('bookmarked', isBookmarked);
      btn.setAttribute('aria-label', isBookmarked ? 'Eliminar de favoritos' : 'Guardar empresa');

      // Update SVG fill if needed
      const svg = btn.querySelector('svg');
      if (svg && isBookmarked) {
        svg.setAttribute('fill', 'currentColor');
      } else if (svg) {
        svg.setAttribute('fill', 'none');
      }
    }

    loadBookmarks() {
      try {
        const saved = localStorage.getItem('origenlab_bookmarks');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Error loading bookmarks:', e);
        return [];
      }
    }

    saveBookmarks() {
      try {
        localStorage.setItem('origenlab_bookmarks', JSON.stringify(this.bookmarks));
      } catch (e) {
        console.error('Error saving bookmarks:', e);
      }
    }

    showToast(message) {
      // Simple toast notification
      const toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1F2937;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInUp 300ms ease-out;
      `;

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'fadeOut 300ms ease-out';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  }

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================

  class MobileMenu {
    constructor() {
      this.menuToggle = document.querySelector('.mobile-menu-toggle');
      this.navMenu = document.querySelector('.nav-menu');
      this.isOpen = false;

      if (this.menuToggle && this.navMenu) {
        this.init();
      }
    }

    init() {
      this.menuToggle.addEventListener('click', () => {
        this.toggle();
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isOpen &&
            !this.menuToggle.contains(e.target) &&
            !this.navMenu.contains(e.target)) {
          this.close();
        }
      });
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      this.isOpen = true;
      this.navMenu.classList.add('active');
      this.menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';

      // Animate hamburger to X
      const lines = this.menuToggle.querySelectorAll('.hamburger-line');
      if (lines.length === 3) {
        lines[0].style.transform = 'rotate(45deg) translateY(7px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      }
    }

    close() {
      this.isOpen = false;
      this.navMenu.classList.remove('active');
      this.menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';

      // Reset hamburger
      const lines = this.menuToggle.querySelectorAll('.hamburger-line');
      if (lines.length === 3) {
        lines[0].style.transform = '';
        lines[1].style.opacity = '';
        lines[2].style.transform = '';
      }
    }
  }

  // ==========================================================================
  // Sorting
  // ==========================================================================

  class SortManager {
    constructor() {
      this.sortSelect = document.getElementById('sort-select');

      if (this.sortSelect) {
        this.init();
      }
    }

    init() {
      this.sortSelect.addEventListener('change', (e) => {
        this.handleSort(e.target.value);
      });
    }

    handleSort(sortBy) {
      console.log('Sorting by:', sortBy);
      // In production, this would re-fetch or re-order the companies
      // Could also update URL parameters
    }
  }

  // ==========================================================================
  // Smooth Scroll
  // ==========================================================================

  class SmoothScroll {
    constructor() {
      this.links = document.querySelectorAll('a[href^="#"]');
      this.init();
    }

    init() {
      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href === '#' || href.length <= 1) return;

          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for sticky header

            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });

            // Update URL without jump
            history.pushState(null, null, href);
          }
        });
      });
    }
  }

  // ==========================================================================
  // Performance Optimizations
  // ==========================================================================

  // Lazy load images
  class LazyLoader {
    constructor() {
      this.images = document.querySelectorAll('img[data-src]');
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px'
        });

        this.images.forEach(img => observer.observe(img));
      } else {
        // Fallback for older browsers
        this.images.forEach(img => {
          img.src = img.dataset.src;
        });
      }
    }
  }

  // ==========================================================================
  // Analytics Helper
  // ==========================================================================

  class Analytics {
    static track(event, data = {}) {
      // In production, integrate with Google Analytics, Mixpanel, etc.
      console.log('Analytics Event:', event, data);

      // Example: Track to Google Analytics
      if (window.gtag) {
        window.gtag('event', event, data);
      }
    }

    static trackSearch(query) {
      this.track('search', { search_term: query });
    }

    static trackCompanyView(companyName) {
      this.track('view_company', { company_name: companyName });
    }

    static trackFilterUsage(filterType, filterValue) {
      this.track('filter_applied', {
        filter_type: filterType,
        filter_value: filterValue
      });
    }
  }

  // ==========================================================================
  // Add CSS animations
  // ==========================================================================

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    .nav-menu.active {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 73px;
      left: 0;
      right: 0;
      background: white;
      padding: 1.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      animation: fadeIn 200ms ease-out;
    }

    @media (min-width: 1024px) {
      .nav-menu.active {
        position: static;
        flex-direction: row;
        padding: 0;
        box-shadow: none;
      }
    }

    .filter-chip.active {
      background-color: #0066CC;
      color: white;
      border-color: #0066CC;
    }

    .company-bookmark.bookmarked {
      color: #0066CC;
    }
  `;
  document.head.appendChild(style);

  // ==========================================================================
  // Initialize Application
  // ==========================================================================

  function init() {
    // Initialize all managers
    new SearchManager();
    new FilterManager();
    new ViewManager();
    new BookmarkManager();
    new MobileMenu();
    new SortManager();
    new SmoothScroll();
    new LazyLoader();

    // Track page view
    Analytics.track('page_view', {
      page_title: document.title,
      page_path: window.location.pathname
    });

    console.log('OrigenLab B2B Directory initialized successfully');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
