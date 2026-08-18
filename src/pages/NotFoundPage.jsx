/**
 * @fileoverview NotFoundPage — accessible 404 error page.
 *
 * Rendered by the wildcard `*` route in App.jsx when no route matches.
 * Previously the app silently redirected to LandingPage, which is confusing
 * and fails WCAG 3.3.1 (Error Identification).
 */
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Compass } from 'lucide-react';

/**
 * Renders a user-friendly 404 Not Found page with navigation options.
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      <main
        id="main-content"
        aria-labelledby="not-found-heading"
        className="flex-grow flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-md w-full text-center">
          {/* Large accessible status indicator */}
          <div
            aria-hidden="true"
            className="text-[8rem] font-extrabold font-heading leading-none text-primary-indigo/20 select-none mb-4"
          >
            404
          </div>

          <Compass
            className="w-12 h-12 text-primary-indigo mx-auto mb-6"
            aria-hidden="true"
          />

          <h1
            id="not-found-heading"
            className="text-3xl font-bold font-heading mb-3"
          >
            Page Not Found
          </h1>

          <p className="text-dark-muted mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Head back to explore the feed or your dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-primary-indigo text-white font-semibold rounded-xl hover:brightness-110 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-indigo"
            >
              Return Home
            </Link>
            <Link
              to="/feed"
              className="px-6 py-3 bg-dark-card border border-dark-border text-white font-semibold rounded-xl hover:bg-dark-card/80 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-indigo"
            >
              Browse Reels Feed
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
