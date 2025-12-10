/**
 * CATEGORY ANALYTICS TRACKER
 * Tracks user interactions with categories for insights and optimization
 */

class CategoryAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.startTime = Date.now();
    this.init();
  }

  init() {
    this.trackPageView();
    this.setupEventTracking();
    this.setupBeforeUnload();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  trackPageView() {
    this.trackEvent('page_view', {
      page: 'categories_hub',
      url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
  }

  setupEventTracking() {
    // Track search queries
    const searchInput = document.getElementById('category-search');
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          const query = e.target.value.trim();
          if (query.length >= 2) {
            this.trackSearch(query);
          }
        }, 1000);
      });
    }

    // Track sort changes
    const sortSelect = document.getElementById('sort-categories');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.trackSort(e.target.value);
      });
    }

    // Track view mode changes
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.trackViewMode(e.currentTarget.dataset.view);
      });
    });

    // Track quick access clicks
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.trackQuickAccess(e.currentTarget.dataset.category);
      });
    });

    // Track scroll depth
    this.setupScrollTracking();
  }

  setupScrollTracking() {
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        if ([25, 50, 75, 100].includes(maxScroll)) {
          this.trackEvent('scroll_depth', {
            percentage: maxScroll
          });
        }
      }
    };

    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScroll, 100);
    });
  }

  setupBeforeUnload() {
    window.addEventListener('beforeunload', () => {
      this.trackSessionEnd();
      this.sendAnalytics();
    });
  }

  trackEvent(eventName, data = {}) {
    const event = {
      event: eventName,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      ...data
    };

    this.events.push(event);
    console.log('[Analytics]', event);

    // Send to analytics service (Google Analytics 4 example)
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }
  }

  trackCategoryView(category) {
    this.trackEvent('category_view', {
      category_id: category.id,
      category_name: category.name,
      category_slug: category.slug,
      company_count: category.companyCount,
      is_featured: category.featured,
      is_trending: category.trending
    });
  }

  trackSearch(query) {
    this.trackEvent('category_search', {
      search_query: query,
      query_length: query.length
    });
  }

  trackSort(sortType) {
    this.trackEvent('category_sort', {
      sort_type: sortType
    });
  }

  trackViewMode(viewMode) {
    this.trackEvent('view_mode_change', {
      view_mode: viewMode
    });
  }

  trackQuickAccess(categorySlug) {
    this.trackEvent('quick_access_click', {
      category_slug: categorySlug
    });
  }

  trackSessionEnd() {
    const duration = Date.now() - this.startTime;
    this.trackEvent('session_end', {
      duration_seconds: Math.round(duration / 1000),
      events_count: this.events.length
    });
  }

  sendAnalytics() {
    // Send analytics data to backend
    // This is a placeholder - implement actual backend endpoint
    const analyticsData = {
      sessionId: this.sessionId,
      events: this.events,
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    };

    // Example: Send to backend
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(analyticsData)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/categories', blob);
    }

    // Save to localStorage for debugging
    const existingData = JSON.parse(localStorage.getItem('analyticsDebug') || '[]');
    existingData.push(analyticsData);
    localStorage.setItem('analyticsDebug', JSON.stringify(existingData.slice(-10)));
  }

  // Funnel tracking
  trackFunnel(step, data = {}) {
    this.trackEvent('funnel_step', {
      funnel: 'category_exploration',
      step: step,
      ...data
    });
  }

  // A/B Testing support
  getVariant(testName) {
    const storageKey = `ab_test_${testName}`;
    let variant = localStorage.getItem(storageKey);

    if (!variant) {
      // Randomly assign variant (50/50 split)
      variant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(storageKey, variant);
    }

    this.trackEvent('ab_test_assignment', {
      test_name: testName,
      variant: variant
    });

    return variant;
  }

  // Heatmap data collection (simplified)
  trackClick(element, label) {
    const rect = element.getBoundingClientRect();
    this.trackEvent('element_click', {
      element_label: label,
      position_x: rect.left + rect.width / 2,
      position_y: rect.top + rect.height / 2,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight
    });
  }
}

// Performance Monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      this.observePaint();
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
    }

    window.addEventListener('load', () => {
      this.collectLoadMetrics();
    });
  }

  observePaint() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics[entry.name] = entry.startTime;
        console.log(`[Performance] ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  }

  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      console.log(`[Performance] LCP: ${this.metrics.lcp.toFixed(2)}ms`);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  observeFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime;
        console.log(`[Performance] FID: ${this.metrics.fid.toFixed(2)}ms`);
      }
    });
    observer.observe({ entryTypes: ['first-input'] });
  }

  observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
      console.log(`[Performance] CLS: ${clsValue.toFixed(3)}`);
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  }

  collectLoadMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      this.metrics.dns = navigation.domainLookupEnd - navigation.domainLookupStart;
      this.metrics.tcp = navigation.connectEnd - navigation.connectStart;
      this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      this.metrics.download = navigation.responseEnd - navigation.responseStart;
      this.metrics.domInteractive = navigation.domInteractive;
      this.metrics.domComplete = navigation.domComplete;
      this.metrics.loadComplete = navigation.loadEventEnd;

      console.log('[Performance] Load Metrics:', this.metrics);
    }

    // Send to analytics
    if (window.categoryAnalytics) {
      window.categoryAnalytics.trackEvent('performance_metrics', this.metrics);
    }
  }

  getMetrics() {
    return this.metrics;
  }
}

// Error Tracking
class ErrorTracker {
  constructor() {
    this.errors = [];
    this.init();
  }

  init() {
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'Unhandled Promise Rejection',
        reason: event.reason,
        promise: event.promise
      });
    });
  }

  logError(error) {
    const errorData = {
      ...error,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.errors.push(errorData);
    console.error('[Error Tracker]', errorData);

    // Send to analytics
    if (window.categoryAnalytics) {
      window.categoryAnalytics.trackEvent('error_occurred', errorData);
    }

    // Send to error tracking service (e.g., Sentry)
    // Sentry.captureException(error);
  }

  getErrors() {
    return this.errors;
  }
}

// Initialize Analytics
document.addEventListener('DOMContentLoaded', () => {
  window.categoryAnalytics = new CategoryAnalytics();
  window.performanceMonitor = new PerformanceMonitor();
  window.errorTracker = new ErrorTracker();

  console.log('[Analytics] Tracking initialized');
  console.log('Session ID:', window.categoryAnalytics.sessionId);
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CategoryAnalytics,
    PerformanceMonitor,
    ErrorTracker
  };
}
