/**
 * @fileoverview Dashboard — authenticated user analytics overview.
 *
 * Accessibility improvements applied:
 * - `<main id="main-content" aria-labelledby="dashboard-heading">` landmark
 * - Loading state: `aria-busy="true"` + `aria-live="polite"` region
 * - Error state: `role="alert"` with retry
 * - Progress bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
 * - `<StatCard>` extracted with `role="group"` + `aria-label`
 * - Recent interaction list: `<ul>/<li>` semantics with `aria-label`
 * - Avatar images: descriptive alt text `"${name}'s profile avatar"`
 *
 * Code quality improvements:
 * - `StatCard` extracted as a reusable component (SRP)
 * - JSDoc on all functions and types
 */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  LayoutDashboard, Compass, BarChart3, Clock,
  Heart, Bookmark, GraduationCap, Sparkles, Loader,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/**
 * @typedef {Object} StatCardProps
 * @property {React.ReactNode} icon   - Icon element.
 * @property {string|number}   value  - Prominent metric value.
 * @property {string}          label  - Human-readable label.
 * @property {string}          ariaLabel - Full accessible label for the group.
 */

/**
 * A single metric card in the stats grid.
 * Uses `role="group"` and `aria-label` so screen readers announce
 * the metric name alongside its value without requiring extra nesting.
 *
 * @param {StatCardProps} props
 */
function StatCard({ icon, value, label, ariaLabel }) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="bg-dark-card border border-dark-border p-4 rounded-xl text-left"
    >
      <div className="text-dark-muted mb-2" aria-hidden="true">{icon}</div>
      <div className="text-2xl font-bold text-white" aria-label={`${value} ${label}`}>
        {value}
      </div>
      <div className="text-[10px] text-dark-muted font-semibold uppercase">{label}</div>
    </div>
  );
}

/**
 * @typedef {Object} InteractionBadgeProps
 * @property {string} type - Interaction type string.
 */

/**
 * Coloured badge for an interaction type (like / save / skip / watch).
 * @param {InteractionBadgeProps} props
 */
function InteractionBadge({ type }) {
  const styles = {
    like:  'bg-red-500/10 text-red-400',
    save:  'bg-cyan-500/10 text-cyan-400',
    skip:  'bg-gray-500/10 text-gray-400',
  };
  return (
    <div
      className={`p-2 rounded-lg text-xs font-bold uppercase ${styles[type] ?? 'bg-indigo-500/10 text-indigo-400'}`}
      aria-label={`Interaction type: ${type}`}
    >
      {type}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */

/**
 * Dashboard page — requires an authenticated user session.
 * Shows profile, AI-detected interests, stats grid, focus progress bar,
 * and a recent scroll activity timeline.
 */
export default function Dashboard() {
  const { user, apiFetch } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Fetches all dashboard telemetry from the API.
   * @returns {Promise<void>}
   */
  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/dashboard');
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch dashboard data.');
      setData(json);
    } catch (err) {
      console.error('[Dashboard] fetch error:', err);
      setError(err.message || 'Error fetching dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  /* ── Unauthenticated State ── */
  if (!user || user.email === 'guest@scrollwise.ai') {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col">
        <Navbar />
        <main
          id="main-content"
          aria-labelledby="auth-required-heading"
          className="flex-grow flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full text-center bg-dark-card/60 border border-dark-border p-8 rounded-2xl">
            <LayoutDashboard className="w-12 h-12 text-primary-purple mx-auto mb-4" aria-hidden="true" />
            <h1 id="auth-required-heading" className="text-xl font-bold font-heading mb-2">
              Authentication Required
            </h1>
            <p className="text-sm text-dark-muted mb-6">
              Log in to access your ScrollWise educational profile, analytics dashboard, and learning telemetry.
            </p>
            <Link
              to="/auth"
              aria-label="Sign in or register to access your dashboard"
              className="inline-block w-full py-3 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-primary-indigo to-primary-purple text-white shadow-lg transition hover:brightness-110"
            >
              Sign In / Register
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      <main
        id="main-content"
        aria-labelledby="dashboard-heading"
        className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Visually-hidden accessible page heading */}
        <h1 id="dashboard-heading" className="sr-only">
          Your ScrollWise Dashboard
        </h1>

        {/* ── Loading State ── */}
        {loading ? (
          <div
            className="text-center py-20"
            aria-live="polite"
            aria-busy="true"
            aria-label="Loading dashboard data"
          >
            <Loader className="w-10 h-10 text-primary-indigo animate-spin mx-auto mb-4" aria-hidden="true" />
            <p className="text-dark-muted" role="status">Compiling developer profile telemetry…</p>
          </div>

        /* ── Error State ── */
        ) : error ? (
          <div
            role="alert"
            aria-live="assertive"
            className="max-w-md mx-auto text-center bg-red-500/10 border border-red-500/20 p-6 rounded-2xl"
          >
            <h2 className="text-lg font-bold mb-2">Error Loading Dashboard</h2>
            <p className="text-xs text-dark-muted mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              aria-label="Retry loading dashboard data"
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-xs font-semibold transition"
            >
              Retry
            </button>
          </div>

        /* ── Data Loaded State ── */
        ) : data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Left Column: Profile + Detected Interests ── */}
            <div className="lg:col-span-1 space-y-8">

              {/* Profile Card */}
              <section aria-labelledby="profile-card-heading" className="bg-dark-card border border-dark-border p-6 rounded-2xl relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-indigo/5 rounded-bl-full" aria-hidden="true" />
                <div className="flex flex-col items-center text-center">
                  <img
                    src={data.user.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.name}`}
                    alt={`${data.user.name}'s profile avatar`}
                    className="w-20 h-20 rounded-full border-2 border-primary-indigo p-1 bg-dark-bg shadow-md mb-4"
                  />
                  <h2 id="profile-card-heading" className="text-xl font-bold">{data.user.name}</h2>
                  <p className="text-xs text-dark-muted mb-2">{data.user.email}</p>

                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary-indigo/10 border border-primary-indigo/25 text-primary-indigo text-xs font-bold mb-4 capitalize">
                    <span>{data.user.profile?.experienceLevel || 'Unspecified'} Level</span>
                  </div>

                  <p className="text-xs text-gray-300 italic max-w-xs">
                    &ldquo;{data.user.profile?.bio || 'Full stack student explorer'}&rdquo;
                  </p>
                </div>
              </section>

              {/* Detected Interests */}
              <section aria-labelledby="interests-heading" className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 text-primary-cyan font-bold mb-4">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  <h2 id="interests-heading" className="font-heading">AI Detected Interests</h2>
                </div>

                {data.user.detectedInterests?.length > 0 ? (
                  <ul className="flex flex-wrap gap-2" aria-label="Your AI-detected technical interests">
                    {data.user.detectedInterests.map((interest) => (
                      <li
                        key={interest}
                        className="px-3 py-1.5 text-xs rounded-xl bg-dark-bg border border-dark-border hover:border-primary-cyan/40 text-primary-cyan font-semibold transition"
                      >
                        {interest}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-xs text-dark-muted leading-relaxed">
                      No interests inferred yet. Scroll tech reels, click Generate Recommendations,
                      and Grok AI will populate your interest clusters!
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* ── Right Column: Stats + Progress + Recent Activity ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Stats Grid */}
              <section aria-labelledby="stats-heading">
                <h2 id="stats-heading" className="sr-only">Your learning statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    icon={<Compass className="w-4 h-4 text-primary-indigo" />}
                    value={data.stats.totalInteractions}
                    label="Total Scrolls"
                    ariaLabel={`Total scrolls: ${data.stats.totalInteractions}`}
                  />
                  <StatCard
                    icon={<Heart className="w-4 h-4 text-red-500 fill-red-500/20" />}
                    value={data.stats.likesCount}
                    label="Likes"
                    ariaLabel={`Likes given: ${data.stats.likesCount}`}
                  />
                  <StatCard
                    icon={<Bookmark className="w-4 h-4 text-primary-cyan fill-primary-cyan/20" />}
                    value={data.stats.savesCount}
                    label="Saved"
                    ariaLabel={`Reels saved: ${data.stats.savesCount}`}
                  />
                  <StatCard
                    icon={<GraduationCap className="w-4 h-4 text-primary-purple" />}
                    value={`${data.stats.educationalRatio}%`}
                    label="Edu Focus Ratio"
                    ariaLabel={`Educational focus ratio: ${data.stats.educationalRatio} percent`}
                  />
                </div>
              </section>

              {/* Focus Progress Bar */}
              <section aria-labelledby="edu-ratio-heading" className="bg-dark-card border border-dark-border p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 id="edu-ratio-heading" className="font-bold text-base font-heading">
                    Student Education Ratio
                  </h2>
                  <span className="text-xs text-primary-indigo font-bold" aria-hidden="true">
                    {data.stats.educationalRatio}% Focus
                  </span>
                </div>

                {/* WCAG 1.3.1: role=progressbar with valuenow/min/max */}
                <div
                  role="progressbar"
                  aria-valuenow={data.stats.educationalRatio}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Educational focus: ${data.stats.educationalRatio} percent`}
                  className="w-full bg-dark-bg border border-dark-border h-4 rounded-full overflow-hidden p-0.5"
                >
                  <div
                    className="bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: `${data.stats.educationalRatio}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[11px] text-dark-muted mt-3 leading-relaxed">
                  Focus ratio represents the share of educational vs entertainment reels you have interacted with.
                  Keep watching DSA, hardware architecture, and interview prep to boost your score!
                </p>
              </section>

              {/* Recent Activity Timeline */}
              <section aria-labelledby="activity-heading" className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 text-primary-purple font-bold mb-6">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                  <h2 id="activity-heading" className="font-heading">Recent Scroll Activity</h2>
                </div>

                {data.recentInteractions?.length > 0 ? (
                  <ul className="space-y-4" aria-label="Recent scroll activity">
                    {data.recentInteractions.map((item) => (
                      <li
                        key={item._id}
                        className="flex items-center justify-between p-3.5 bg-dark-bg/60 border border-dark-border/80 rounded-xl hover:border-dark-border transition"
                      >
                        <div className="flex items-center space-x-3 text-left">
                          <InteractionBadge type={item.interactionType} />
                          <div>
                            <h3 className="text-xs font-semibold text-white line-clamp-1">{item.title}</h3>
                            <p className="text-[10px] text-dark-muted font-medium">
                              Category: {item.category} • Watched: {item.watchedPercent}%
                            </p>
                          </div>
                        </div>
                        <time
                          dateTime={item.createdAt}
                          className="text-[10px] text-dark-muted"
                          aria-label={`Interacted at ${new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                        >
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </time>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-dark-muted leading-relaxed mb-4">
                      No recent interaction history logged.
                    </p>
                    <Link
                      to="/feed"
                      aria-label="Visit the reels feed to start building your history"
                      className="px-4 py-2 bg-primary-indigo/20 border border-primary-indigo/40 text-xs font-semibold rounded-lg text-primary-indigo hover:bg-primary-indigo/35 transition"
                    >
                      Visit Reels Feed
                    </Link>
                  </div>
                )}
              </section>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
