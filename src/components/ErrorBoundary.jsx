/**
 * @fileoverview ErrorBoundary — React class component that catches render-time
 * errors and displays a graceful fallback UI instead of a blank screen.
 *
 * Satisfies WCAG 1.3.3 (sensory characteristics) and provides a clear recovery path.
 * Must be a class component because React error boundaries require
 * `componentDidCatch` / `getDerivedStateFromError` lifecycle methods.
 */
import React from 'react';

/**
 * @typedef {Object} ErrorBoundaryState
 * @property {boolean}   hasError - Whether a render error was caught.
 * @property {Error|null} error   - The caught Error instance.
 */

/**
 * Wrap any subtree that might throw during rendering.
 *
 * @example
 * <ErrorBoundary>
 *   <ReelsFeed />
 * </ErrorBoundary>
 */
export default class ErrorBoundary extends React.Component {
  /** @type {ErrorBoundaryState} */
  state = { hasError: false, error: null };

  /**
   * Called during rendering when a descendant throws.
   * @param {Error} error - The thrown error.
   * @returns {ErrorBoundaryState}
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Called after rendering when a descendant has thrown.
   * Logs the error for monitoring / observability.
   * @param {Error} error
   * @param {React.ErrorInfo} info
   */
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
  }

  /** Resets state so the user can attempt to recover. */
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-dark-bg text-white flex items-center justify-center p-6"
        >
          <div className="max-w-md w-full bg-dark-card border border-dark-border rounded-2xl p-8 text-center shadow-lg">
            <h1 className="text-2xl font-bold font-heading mb-3">Something went wrong</h1>
            <p className="text-sm text-dark-muted mb-2 leading-relaxed">
              An unexpected error occurred while rendering this view.
            </p>
            {this.state.error && (
              <pre className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-left overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 bg-primary-indigo text-white rounded-xl text-sm font-semibold hover:brightness-110 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-indigo"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-5 py-2.5 bg-dark-bg border border-dark-border text-white rounded-xl text-sm font-semibold hover:bg-dark-card transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-indigo"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
