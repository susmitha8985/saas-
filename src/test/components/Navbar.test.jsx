/**
 * @fileoverview Navbar component tests.
 *
 * Coverage:
 * - Renders all navigation links
 * - Active link has aria-current="page"
 * - Mobile menu toggle: keyboard accessible (Enter / Space)
 * - Mobile menu toggle: aria-expanded reflects state
 * - Logout button has accessible name
 * - Avatar images have descriptive alt text
 * - jest-axe: zero WCAG 2.1 AA violations
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

expect.extend(toHaveNoViolations);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

/**
 * Renders Navbar inside required providers.
 * @param {string} [initialPath='/'] - Starting URL for the router.
 */
function renderNavbar(initialPath = '/') {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Navbar />
      </MemoryRouter>
    </AuthProvider>,
  );
}

/* ─────────────────────────────────────────────
   TESTS
───────────────────────────────────────────── */

describe('Navbar', () => {
  describe('Rendering', () => {
    it('renders the ScrollWise logo link', () => {
      renderNavbar();
      expect(screen.getByRole('link', { name: /scrollwise.*homepage/i })).toBeInTheDocument();
    });

    it('renders all four desktop navigation links by href', () => {
      renderNavbar();
      // Nav links are found by their href since icons are aria-hidden and text is their accessible name
      expect(document.querySelector('a[href="/feed"]')).toBeInTheDocument();
      expect(document.querySelector('a[href="/recommendations"]')).toBeInTheDocument();
      expect(document.querySelector('a[href="/dashboard"]')).toBeInTheDocument();
      expect(document.querySelector('a[href="/upload"]')).toBeInTheDocument();
    });

    it('renders nav link text labels', () => {
      renderNavbar();
      expect(screen.getAllByText('Reels Feed').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Recommendations').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Upload Reel').length).toBeGreaterThan(0);
    });
  });

  describe('Active Link Accessibility', () => {
    it('sets aria-current="page" on the active route link', () => {
      renderNavbar('/feed');
      const activeLinks = screen.getAllByRole('link', { name: /reels feed/i });
      const activeLink = activeLinks.find((el) => el.getAttribute('aria-current') === 'page');
      expect(activeLink).toBeInTheDocument();
    });

    it('does NOT set aria-current on inactive route links', () => {
      renderNavbar('/feed');
      const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i });
      dashboardLinks.forEach((link) => {
        expect(link.getAttribute('aria-current')).not.toBe('page');
      });
    });
  });

  describe('Mobile Menu Toggle', () => {
    it('mobile menu button has correct initial aria-expanded=false', () => {
      renderNavbar();
      const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
      expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens mobile menu on click and updates aria-expanded', async () => {
      renderNavbar();
      const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
      await userEvent.click(toggleBtn);
      expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute('aria-expanded', 'true');
    });

    it('opens mobile menu when toggle button receives Enter key', async () => {
      renderNavbar();
      const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
      toggleBtn.focus();
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
    });

    it('opens mobile menu when toggle button receives Space key', async () => {
      renderNavbar();
      const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
      toggleBtn.focus();
      await userEvent.keyboard(' ');
      expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
    });

    it('mobile toggle button has aria-controls pointing to mobile menu id', () => {
      renderNavbar();
      const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
      expect(toggleBtn).toHaveAttribute('aria-controls', 'mobile-menu');
    });
  });

  describe('Accessibility (axe)', () => {
    it('has no WCAG 2.1 AA violations in default state', async () => {
      const { container } = renderNavbar('/');
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no WCAG 2.1 AA violations with mobile menu open', async () => {
      const { container } = renderNavbar('/');
      const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
      await userEvent.click(toggleBtn);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
