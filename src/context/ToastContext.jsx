/**
 * @fileoverview ToastContext — lightweight in-app notification system.
 *
 * Replaces all `alert()` / `window.alert()` calls with accessible,
 * non-blocking toast messages rendered in an `aria-live="assertive"` region.
 *
 * Satisfies:
 * - WCAG 4.1.3 (Status Messages) — Level AA
 * - WCAG 1.4.13 (Content on Hover or Focus)
 *
 * Usage:
 *   const { addToast } = useToast();
 *   addToast('Sync successful!', 'success');
 *   addToast('Failed to connect.', 'error');
 */
import React, { createContext, useCallback, useContext, useState } from 'react';

/**
 * @typedef {'success'|'error'|'info'|'warning'} ToastVariant
 */

/**
 * @typedef {Object} Toast
 * @property {string}       id        - Unique identifier (timestamp + random).
 * @property {string}       message   - Human-readable message to display.
 * @property {ToastVariant} variant   - Visual / semantic variant.
 */

/** @type {React.Context<{ toasts: Toast[], addToast: Function, removeToast: Function }>} */
const ToastContext = createContext(null);

/**
 * Duration in milliseconds before a toast auto-dismisses.
 * @constant {number}
 */
const AUTO_DISMISS_MS = 4500;

/**
 * Provides toast state and `addToast` / `removeToast` helpers to the tree.
 * Renders an `aria-live="assertive"` region for screen-reader announcements.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState(/** @type {Toast[]} */ ([]));

  /**
   * Adds a new toast message.
   * Auto-dismisses after {@link AUTO_DISMISS_MS} ms.
   *
   * @param {string}       message - The text to announce.
   * @param {ToastVariant} [variant='info'] - Visual style.
   */
  const addToast = useCallback((message, variant = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => removeToast(id), AUTO_DISMISS_MS);
  }, []);

  /**
   * Removes a toast by id.
   * @param {string} id
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* WCAG 4.1.3: assertive live region for status messages */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="toast-container"
        role="status"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Individual toast item.
 * @param {{ toast: Toast, onDismiss: (id: string) => void }} props
 */
function ToastItem({ toast, onDismiss }) {
  const variantStyles = {
    success: 'bg-emerald-900/90 border-emerald-500/40 text-emerald-100',
    error:   'bg-red-900/90 border-red-500/40 text-red-100',
    warning: 'bg-amber-900/90 border-amber-500/40 text-amber-100',
    info:    'bg-dark-card border-dark-border text-white',
  };

  return (
    <div
      className={`toast-item ${variantStyles[toast.variant] ?? variantStyles.info}`}
      role="alert"
    >
      <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="ml-3 text-current opacity-60 hover:opacity-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Hook to consume the ToastContext.
 * Must be used inside a `<ToastProvider>`.
 *
 * @returns {{ addToast: Function, removeToast: Function, toasts: Toast[] }}
 * @throws {Error} When used outside `<ToastProvider>`.
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}
