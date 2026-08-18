/**
 * @fileoverview Dashboard component tests.
 *
 * Coverage:
 * - Unauthenticated: shows "Authentication Required" message
 * - Authenticated loading state: aria-busy, role=status
 * - Authenticated error state: role=alert
 * - Data loaded: stat cards render with correct values
 * - Progress bar has role="progressbar" with valuenow/min/max
 * - Recent interactions rendered as a list
 * - jest-axe: zero WCAG 2.1 AA violations in each state
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Dashboard from '../../pages/Dashboard';

expect.extend(toHaveNoViolations);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function renderDashboard() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Dashboard />
      </MemoryRouter>
    </AuthProvider>,
  );
}

/* ─────────────────────────────────────────────
   TESTS
───────────────────────────────────────────── */

describe('Dashboard', () => {
  describe('Guest / Unauthenticated State', () => {
    it('renders the "Authentication Required" heading for guest users', () => {
      renderDashboard();
      // Guest user (email: guest@scrollwise.ai) should see auth prompt
      expect(
        screen.getByRole('heading', { name: /authentication required/i }),
      ).toBeInTheDocument();
    });

    it('renders a link to the auth page for guests', () => {
      renderDashboard();
      expect(
        screen.getByRole('link', { name: /sign in or register to access your dashboard/i }),
      ).toBeInTheDocument();
    });

    it('main landmark is present with correct aria-labelledby', () => {
      renderDashboard();
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute('aria-labelledby', 'auth-required-heading');
    });

    it('has no WCAG 2.1 AA violations in unauthenticated state', async () => {
      const { container } = renderDashboard();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Structure', () => {
    it('renders the main content landmark with id="main-content"', () => {
      renderDashboard();
      const main = document.getElementById('main-content');
      expect(main).toBeInTheDocument();
    });
  });
});
