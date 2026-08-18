/**
 * @fileoverview Shared render utility for testing components that depend on
 * React Router and AuthContext. Wraps the component under test in all required
 * providers so each test file doesn't need boilerplate setup code.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

/**
 * @typedef {Object} RenderOptions
 * @property {string[]} [initialEntries=['/'] ] - Initial URL entries for MemoryRouter.
 * @property {Object}   [providerProps={}]       - Extra props forwarded to AuthProvider.
 */

/**
 * Renders a React component wrapped in MemoryRouter + AuthProvider.
 *
 * @param {React.ReactElement} ui            - The component to render.
 * @param {RenderOptions}      [options={}]  - Configuration for router and providers.
 * @returns {import('@testing-library/react').RenderResult & { rerender: Function }}
 *
 * @example
 * const { getByRole } = renderWithProviders(<Navbar />, { initialEntries: ['/feed'] });
 */
export function renderWithProviders(ui, { initialEntries = ['/'], ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <AuthProvider>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </AuthProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
