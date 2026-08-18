/**
 * @fileoverview SkipLink — keyboard-only visible skip navigation link.
 *
 * Rendered at the very top of every page (inside <body>, before <Navbar>).
 * Visually hidden until focused via keyboard Tab, then slides into view.
 * Satisfies WCAG 2.4.1 (Bypass Blocks) — Level A.
 *
 * Usage:
 *   <SkipLink targetId="main-content" />
 *   ...
 *   <main id="main-content">…</main>
 */
import React from 'react';

/**
 * @param {Object} props
 * @param {string} [props.targetId='main-content'] - The `id` of the element to skip to.
 * @param {string} [props.label='Skip to main content'] - Visible label text.
 */
export default function SkipLink({ targetId = 'main-content', label = 'Skip to main content' }) {
  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      onFocus={(e) => e.currentTarget.classList.add('focused')}
      onBlur={(e) => e.currentTarget.classList.remove('focused')}
    >
      {label}
    </a>
  );
}
