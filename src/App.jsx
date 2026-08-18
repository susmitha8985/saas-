/**
 * @fileoverview Application root — wires together providers, router, and routes.
 *
 * Structure:
 *  AuthProvider   — provides user auth state globally
 *  ToastProvider  — provides in-app notifications (replaces alert())
 *  ErrorBoundary  — catches unexpected render errors
 *  BrowserRouter  — client-side routing
 *    SkipLink     — keyboard navigation bypass (WCAG 2.4.1)
 *    Routes       — page-level route declarations
 */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import SkipLink from './components/SkipLink';

// Lazy-load pages for code splitting
const LandingPage       = lazy(() => import('./pages/LandingPage'));
const AuthPage          = lazy(() => import('./pages/AuthPage'));
const ReelsFeed         = lazy(() => import('./pages/ReelsFeed'));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage'));
const Dashboard         = lazy(() => import('./pages/Dashboard'));
const UploadReel        = lazy(() => import('./pages/UploadReel'));
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'));

/**
 * Minimal loading fallback shown while a lazy page chunk is downloading.
 */
function PageLoader() {
  return (
    <div
      className="min-h-screen bg-dark-bg flex items-center justify-center"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div
        className="w-10 h-10 border-2 border-primary-indigo border-t-transparent rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}

/**
 * Root application component.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            {/* WCAG 2.4.1: Skip to main content for keyboard users */}
            <SkipLink targetId="main-content" />

            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"               element={<LandingPage />} />
                <Route path="/auth"           element={<AuthPage />} />
                <Route path="/feed"           element={<ReelsFeed />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="/dashboard"      element={<Dashboard />} />
                <Route path="/upload"         element={<UploadReel />} />
                {/* Proper 404 — no longer silently redirects to LandingPage */}
                <Route path="*"              element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
