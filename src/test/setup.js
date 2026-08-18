/**
 * Global test setup file loaded before every test suite.
 * - Extends Vitest's `expect` with @testing-library/jest-dom matchers
 *   (e.g., toBeInTheDocument, toHaveAttribute, toBeVisible).
 * - Configures jest-axe for WCAG 2.1 AA accessibility assertions.
 */
import '@testing-library/jest-dom';
import { configureAxe } from 'jest-axe';

/**
 * Configure axe-core with WCAG 2.1 AA rules globally.
 * Any test calling `axe(container)` inherits these defaults.
 */
configureAxe({
  rules: {
    // Enforce WCAG 2.1 AA as the minimum standard
  },
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  },
});

// Silence React act() warnings during async state updates in tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: An update to')
  ) {
    return;
  }
  originalConsoleError(...args);
};
