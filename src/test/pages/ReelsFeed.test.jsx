/**
 * @fileoverview ReelsFeed component tests.
 *
 * Coverage:
 * - Loading state: spinner present, aria-busy=true, aria-live="polite"
 * - Error state: role="alert" shown, retry button accessible
 * - Empty state: seed and sync buttons accessible
 * - Empty state buttons have aria-disabled when active
 * - Main landmark present with correct aria-label
 * - jest-axe: zero WCAG 2.1 AA violations in loading state
 *
 * Note: Full feed rendering tests require a mocked fetch for reels data.
 * The API is mocked below using vi.spyOn(global, 'fetch').
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { ToastProvider } from '../../context/ToastContext';
import ReelsFeed from '../../pages/ReelsFeed';

expect.extend(toHaveNoViolations);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function renderFeed() {
  return render(
    <AuthProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={['/feed']}>
          <ReelsFeed />
        </MemoryRouter>
      </ToastProvider>
    </AuthProvider>,
  );
}

/** Creates a minimal mock fetch that returns a given JSON body and status. */
function mockFetch(body, status = 200) {
  return vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
}

/* ─────────────────────────────────────────────
   TESTS
───────────────────────────────────────────── */

describe('ReelsFeed', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Loading State', () => {
    it('shows a loading spinner while fetching reels', async () => {
      // Mock fetch to never resolve during this test
      vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));
      renderFeed();

      // The loading spinner (via role=status text) should be present
      expect(screen.getByText(/loading scrollwise workspace/i)).toBeInTheDocument();
    });

    it('loading container has aria-busy="true" and aria-live="polite"', async () => {
      vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));
      renderFeed();

      const liveRegion = screen.getByText(/loading scrollwise workspace/i).closest('[aria-live]');
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      expect(liveRegion).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Error State', () => {
    it('shows role="alert" when fetch fails', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
      renderFeed();

      const alertEl = await screen.findByRole('alert');
      expect(alertEl).toBeInTheDocument();
    });

    it('renders a retry button in error state with accessible name', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
      renderFeed();

      const retryBtn = await screen.findByRole('button', { name: /retry loading the reels feed/i });
      expect(retryBtn).toBeInTheDocument();
    });

    it('has no axe violations in error state', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
      const { container } = renderFeed();
      await screen.findByRole('alert');
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Empty State', () => {
    it('shows seed and sync buttons when reels array is empty', async () => {
      mockFetch([]);
      renderFeed();

      const seedBtn = await screen.findByRole('button', { name: /seed fictional reels into the feed/i });
      const syncBtn = await screen.findByRole('button', { name: /sync videos from cloudinary/i });
      expect(seedBtn).toBeInTheDocument();
      expect(syncBtn).toBeInTheDocument();
    });

    it('seed button has aria-disabled when seeding is active', async () => {
      mockFetch([]);
      renderFeed();

      const seedBtn = await screen.findByRole('button', { name: /seed fictional reels into the feed/i });

      // Mock subsequent fetch calls for seeding
      vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));
      await userEvent.click(seedBtn);

      // After clicking, the button should be disabled
      expect(seedBtn).toBeDisabled();
    });
  });

  describe('Landmark & Accessibility Structure', () => {
    it('renders main landmark with aria-label="Reels feed"', async () => {
      vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));
      renderFeed();
      const main = screen.getByRole('main', { name: /reels feed/i });
      expect(main).toBeInTheDocument();
    });

    it('main has id="main-content" for skip-link target', async () => {
      vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));
      renderFeed();
      const main = document.getElementById('main-content');
      expect(main).toBeInTheDocument();
    });

    it('has no axe violations in loading state', async () => {
      vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));
      const { container } = renderFeed();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
