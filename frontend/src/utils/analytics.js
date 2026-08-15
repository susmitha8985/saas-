// src/utils/analytics.js - Lightweight Privacy-Friendly Analytics Utility

export const trackEvent = (eventName, properties = {}) => {
  const payload = {
    event: eventName,
    properties,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };

  // Safe console log for development / placeholder for Google Analytics or Plausible
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics Event]', payload);
  }

  // Window custom event dispatcher if external tracker is present
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', { page: pageName || window.location.pathname });
};
