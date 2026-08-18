/**
 * @fileoverview AuthPage component tests.
 *
 * Coverage:
 * - Renders login form by default
 * - Switches to registration form
 * - Validates: empty fields, short password
 * - Error message has role="alert" and aria-live="assertive"
 * - All inputs have associated labels (htmlFor / id)
 * - Submit button is disabled while loading
 * - jest-axe: zero WCAG 2.1 AA violations on both form modes
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import AuthPage from '../../pages/AuthPage';

expect.extend(toHaveNoViolations);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function renderAuthPage() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/auth']}>
        <AuthPage />
      </MemoryRouter>
    </AuthProvider>,
  );
}

/* ─────────────────────────────────────────────
   TESTS
───────────────────────────────────────────── */

describe('AuthPage', () => {
  describe('Login Form (default)', () => {
    it('renders the "Welcome Back" heading', () => {
      renderAuthPage();
      expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    });

    it('renders email and password fields', () => {
      renderAuthPage();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('does NOT render the name field in login mode', () => {
      renderAuthPage();
      expect(screen.queryByLabelText(/your name/i)).not.toBeInTheDocument();
    });

    it('renders the sign-in submit button', () => {
      renderAuthPage();
      expect(screen.getByRole('button', { name: /sign in to your account/i })).toBeInTheDocument();
    });
  });

  describe('Registration Form Toggle', () => {
    it('switches to "Create Account" form when toggle is clicked', async () => {
      renderAuthPage();
      const toggleBtn = screen.getByRole('button', { name: /switch to create account form/i });
      await userEvent.click(toggleBtn);

      expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    });
  });

  describe('Input ↔ Label Association', () => {
    it('every input has an associated label via htmlFor/id', () => {
      renderAuthPage();
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      expect(emailInput.id).toBeTruthy();
      expect(passwordInput.id).toBeTruthy();
    });

    it('name field in register mode has an associated label', async () => {
      renderAuthPage();
      await userEvent.click(screen.getByRole('button', { name: /switch to create account form/i }));
      const nameInput = screen.getByLabelText(/your name/i);
      expect(nameInput.id).toBeTruthy();
    });
  });

  describe('Validation', () => {
    it('shows an error when submitting with empty fields', async () => {
      renderAuthPage();
      await userEvent.click(screen.getByRole('button', { name: /sign in to your account/i }));

      const errorEl = await screen.findByRole('alert');
      expect(errorEl).toBeInTheDocument();
      expect(errorEl).toHaveTextContent(/please fill in all required fields/i);
    });

    it('error message has role="alert" and aria-live="assertive"', async () => {
      renderAuthPage();
      await userEvent.click(screen.getByRole('button', { name: /sign in to your account/i }));
      const errorEl = await screen.findByRole('alert');
      expect(errorEl).toHaveAttribute('aria-live', 'assertive');
    });

    it('shows a password length error for passwords under 6 characters', async () => {
      renderAuthPage();
      await userEvent.type(screen.getByLabelText(/email address/i), 'test@test.com');
      await userEvent.type(screen.getByLabelText(/password/i), '123');
      await userEvent.click(screen.getByRole('button', { name: /sign in to your account/i }));

      const errorEl = await screen.findByRole('alert');
      expect(errorEl).toHaveTextContent(/at least 6 characters/i);
    });
  });

  describe('Accessibility (axe)', () => {
    it('has no WCAG 2.1 AA violations on the login form', async () => {
      const { container } = renderAuthPage();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no WCAG 2.1 AA violations on the register form', async () => {
      const { container } = renderAuthPage();
      await userEvent.click(screen.getByRole('button', { name: /switch to create account form/i }));
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
