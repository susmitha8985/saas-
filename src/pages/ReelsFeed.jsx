/**
 * @fileoverview ReelsFeed — the main three-column learning feed page.
 *
 * Refactoring highlights:
 * - `ReelItem` extracted to `src/components/ReelItem/ReelItem.jsx` (SRP)
 * - `LeftSidebar` and `RightSidebar` extracted as named sub-components (SRP)
 * - All `alert()` calls replaced with `useToast()` (WCAG 4.1.3)
 * - `fetchProfileTelemetry` wrapped in `useCallback` to stabilise deps
 * - `logUserInteraction` also wrapped in `useCallback`
 * - JSDoc added to every function
 * - `formatNumber` extracted to a pure utility
 *
 * Accessibility improvements:
 * - `<main id="main-content" aria-label="Reels feed">` landmark
 * - Loading state: `aria-live="polite"`, `aria-busy="true"`
 * - Error state: `role="alert"`, `aria-live="assertive"`
 * - Reel viewer: `role="feed"`, `aria-label`
 * - Recommendations accordion: `aria-expanded`, `aria-controls`
 * - AI-generated study plan button: descriptive `aria-label`
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import ReelItem from '../components/ReelItem/ReelItem';
import {
  AlertCircle, Loader, RefreshCcw, Sparkles, Film, Compass,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */

/**
 * Formats a number ≥ 1000 as e.g. "12.4K".
 * @param {number} num
 * @returns {string | number}
 */
function formatNumber(num) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num;
}

/**
 * Generates randomised engagement counts (likes, comments, shares) for a list of reels.
 * Kept deterministic per-reel for display consistency within a session.
 *
 * @param {Object[]} reels - Array of reel objects with `_id` property.
 * @returns {{ likes: Object, comments: Object, shares: Object }}
 */
function generateEngagementCounts(reels) {
  const likes = {}, comments = {}, shares = {};
  reels.forEach((reel) => {
    likes[reel._id]    = Math.floor(Math.random() * 45000) + 5000;
    comments[reel._id] = Math.floor(Math.random() * 800)   + 120;
    shares[reel._id]   = Math.floor(Math.random() * 1200)  + 80;
  });
  return { likes, comments, shares };
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/**
 * Left sidebar — displays user profile telemetry and AI-inferred interests.
 *
 * @param {{ user: Object, profileData: Object|null, recommendations: Object[], seeding: boolean, onSeedData: Function }} props
 */
function LeftSidebar({ user, profileData, recommendations, seeding, onSeedData }) {
  return (
    <aside
      aria-label="Your learning signals and analytics"
      className="lg:col-span-3 md:col-span-1 bg-white border border-[#E6E4DE] rounded-2xl p-5 shadow-sm text-left flex flex-col justify-between h-[calc(100vh-8rem)] min-h-[580px] max-h-[680px]"
    >
      <div className="space-y-5 overflow-y-auto no-scrollbar">

        <section aria-labelledby="signals-heading">
          <h2
            id="signals-heading"
            className="text-xs font-extrabold uppercase text-[#365E7D] tracking-wider mb-3"
          >
            Your Signals
          </h2>

          {/* Profile card */}
          <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-xl border border-[#E6E4DE] mb-4">
            <img
              src={user?.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || 'Guest'}`}
              alt={`${user?.name || 'Guest'}'s avatar`}
              className="w-10 h-10 rounded-full border border-[#E6E4DE]"
            />
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-[#1F2933] truncate">{user?.name || 'Guest Student'}</h3>
              <p className="text-[10px] text-[#667085] truncate capitalize">
                Level: {profileData?.user?.profile?.experienceLevel || 'Beginner'}
              </p>
            </div>
          </div>
        </section>

        {/* AI Inferred Interests */}
        <section aria-labelledby="interests-sidebar-heading">
          <h3
            id="interests-sidebar-heading"
            className="text-[9px] font-extrabold uppercase text-[#667085] tracking-wider block mb-2"
          >
            AI Inferred Interests
          </h3>
          {user?.detectedInterests?.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5" aria-label="Detected interests">
              {user.detectedInterests.map((interest) => (
                <li
                  key={interest}
                  className="px-2 py-0.5 text-[10px] rounded-md bg-[#365E7D]/10 text-[#365E7D] font-bold border border-[#365E7D]/20"
                >
                  {interest}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[10px] text-[#667085] italic">Scroll reels to detect interests.</p>
          )}
        </section>

        {/* Watch Analytics */}
        <section
          aria-labelledby="watch-analytics-heading"
          className="pt-2 border-t border-[#E6E4DE] space-y-2"
        >
          <h3
            id="watch-analytics-heading"
            className="text-[9px] font-extrabold uppercase text-[#667085] tracking-wider block"
          >
            Watch Analytics
          </h3>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div
              role="group"
              aria-label={`Total scrolls: ${profileData?.stats?.totalInteractions ?? 0}`}
              className="bg-[#F7F6F2] p-2 rounded-lg border border-[#E6E4DE]"
            >
              <div className="font-bold text-[#1F2933]">{profileData?.stats?.totalInteractions ?? 0}</div>
              <div className="text-[8px] text-[#667085] uppercase">Scrolls</div>
            </div>
            <div
              role="group"
              aria-label={`Educational focus: ${profileData?.stats?.educationalRatio ?? 0} percent`}
              className="bg-[#F7F6F2] p-2 rounded-lg border border-[#E6E4DE]"
            >
              <div className="font-bold text-[#1F2933]">{profileData?.stats?.educationalRatio ?? 0}%</div>
              <div className="text-[8px] text-[#667085] uppercase">Focus</div>
            </div>
          </div>
        </section>

        {/* Focus Ratio Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[9px] text-[#667085] font-bold">
            <span>Focus Ratio</span>
            <span className="text-[#52796F]" aria-hidden="true">{profileData?.stats?.educationalRatio ?? 0}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={profileData?.stats?.educationalRatio ?? 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Educational focus ratio: ${profileData?.stats?.educationalRatio ?? 0} percent`}
            className="w-full bg-[#F7F6F2] border border-[#E6E4DE] h-2 rounded-full overflow-hidden p-0.5"
          >
            <div
              className="bg-gradient-to-r from-[#365E7D] to-[#52796F] h-full rounded-full transition-all duration-300"
              style={{ width: `${profileData?.stats?.educationalRatio ?? 0}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Bottom: Confidence + Seed Button */}
      <div className="pt-4 border-t border-[#E6E4DE] space-y-3">
        <div
          role="status"
          aria-label={`AI confidence level: ${recommendations[0]?.confidence || 'High'}`}
          className="flex justify-between items-center bg-[#52796F]/10 border border-[#52796F]/20 px-3 py-2 rounded-xl text-xs"
        >
          <span className="font-bold text-[#667085] text-[10px]">Confidence</span>
          <span className="px-2 py-0.5 font-bold uppercase rounded text-[9px] bg-[#52796F] text-white">
            {recommendations[0]?.confidence || 'High'}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onSeedData}
            disabled={seeding}
            aria-disabled={seeding}
            aria-label={seeding ? 'Seeding fictional reels, please wait' : 'Seed fictional reels into the feed'}
            className="w-full flex items-center justify-center space-x-1.5 py-2 px-2 rounded-xl text-[10px] font-bold border border-[#E6E4DE] bg-white hover:bg-[#F7F6F2] text-[#1F2933] disabled:opacity-50 transition shadow-sm"
          >
            {seeding
              ? <RefreshCcw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              : <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" aria-hidden="true" />
            }
            <span>Seed Fictional Reels</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

/**
 * Right sidebar — recommendations accordion and AI study plan generator.
 *
 * @param {{ recommendations: Object[], generating: boolean, onGenerateStudyPlan: Function }} props
 */
function RightSidebar({ recommendations, generating, onGenerateStudyPlan }) {
  return (
    <aside
      aria-label="AI recommendations and study plan"
      className="lg:col-span-4 md:col-span-1 bg-white border border-[#E6E4DE] rounded-2xl p-5 shadow-sm overflow-y-auto no-scrollbar h-[calc(100vh-8rem)] min-h-[580px] max-h-[680px] flex flex-col justify-between"
    >
      <section aria-labelledby="rec-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="rec-heading"
            className="text-xs font-extrabold uppercase text-[#365E7D] tracking-wider"
          >
            Next Best Recommendation
          </h2>
          <span className="text-[9px] font-bold text-[#667085]" aria-label={`${recommendations?.length ?? 0} roadmaps available`}>
            ({recommendations?.length ?? 0} Roadmaps)
          </span>
        </div>

        {recommendations?.length > 0 ? (
          <ul className="space-y-3" aria-label="Study recommendations">
            {recommendations.map((rec) => (
              <li
                key={rec._id}
                className="bg-[#F7F6F2] border border-[#E6E4DE] hover:border-[#365E7D]/40 p-3 rounded-xl space-y-2 text-left transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded bg-[#365E7D]/10 text-[#365E7D] tracking-wide inline-block mb-1">
                      {rec.category}
                    </span>
                    <h3 className="font-bold text-[#1F2933] text-xs leading-normal">
                      {rec.recommendedTopic}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded bg-[#E6E4DE] overflow-hidden flex-shrink-0 flex items-center justify-center border border-[#E6E4DE]">
                    <img
                      src={rec.currentReelId?.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&auto=format&fit=crop'}
                      alt={`Thumbnail for ${rec.recommendedTopic}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-[#667085] leading-relaxed line-clamp-2">{rec.reason}</p>

                <div className="flex items-center justify-between text-[8px] font-bold uppercase text-[#667085] pt-1 border-t border-[#E6E4DE]">
                  <span aria-label={`Difficulty: ${rec.difficulty}`}>{rec.difficulty}</span>
                  <span className="text-[#52796F]" aria-label={`Confidence: ${rec.confidence}`}>
                    {rec.confidence} Conf.
                  </span>
                </div>

                <button
                  onClick={() => {
                    // Navigate to the recommended topic
                    // Using a no-op in demo context (no routing for individual topics yet)
                  }}
                  aria-label={`Start study path: ${rec.recommendedTopic}`}
                  className="w-full py-1.5 mt-1.5 bg-[#365E7D] hover:bg-[#365E7D]/90 text-white font-bold text-[10px] rounded-lg transition"
                >
                  Watch Now
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-5 bg-[#F7F6F2] border border-[#E6E4DE] border-dashed rounded-xl text-center">
            <p className="text-[10px] text-[#667085]">
              No recommendations yet. Use the button below to generate your first technical learning roadmap.
            </p>
          </div>
        )}
      </section>

      {/* Generate AI Study Plan Button */}
      <button
        onClick={onGenerateStudyPlan}
        disabled={generating}
        aria-disabled={generating}
        aria-label={generating ? 'Generating AI study plan, please wait' : 'Generate a new AI-powered study plan'}
        aria-live="polite"
        className="w-full py-2.5 mt-4 rounded-xl bg-[#365E7D] text-white font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-[#365E7D]/95 active:scale-95 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {generating ? (
          <>
            <RefreshCcw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            <span>Generating Roadmaps…</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Generate AI Study Plan</span>
          </>
        )}
      </button>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */

/**
 * ReelsFeed — three-column layout: signals sidebar | reel player | recommendations sidebar.
 * The central reel player is a vertically-scrollable, snap-based feed of educational video reels.
 */
export default function ReelsFeed() {
  const { user, apiFetch } = useAuth();
  const { addToast } = useToast();

  const [reels, setReels]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [activeIdx, setActiveIdx]     = useState(0);
  const [isMuted, setIsMuted]         = useState(true);
  const [seeding, setSeeding]         = useState(false);
  const [syncing, setSyncing]         = useState(false);

  const [profileData, setProfileData]         = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [generating, setGenerating]           = useState(false);

  const [likedMap, setLikedMap]       = useState({});
  const [savedMap, setSavedMap]       = useState({});
  const [likeCounts, setLikeCounts]   = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [shareCounts, setShareCounts] = useState({});

  const containerRef = useRef(null);

  /* ── Data Fetching ── */

  /**
   * Fetches all reels from the API and generates display engagement counts.
   * @returns {Promise<void>}
   */
  const fetchReels = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reels`,
      );
      if (!response.ok) throw new Error('Failed to fetch reels.');

      const data = await response.json();
      setReels(data);

      const { likes, comments, shares } = generateEngagementCounts(data);
      setLikeCounts(likes);
      setCommentCounts(comments);
      setShareCounts(shares);
    } catch (err) {
      console.error('[ReelsFeed] fetchReels error:', err);
      setError(err.message || 'Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetches the authenticated user's dashboard + recommendations telemetry.
   * @returns {Promise<void>}
   */
  const fetchProfileTelemetry = useCallback(async () => {
    if (!user) return;
    try {
      const [dashRes, recRes] = await Promise.all([
        apiFetch('/dashboard'),
        apiFetch('/recommendations'),
      ]);
      const [dashJson, recJson] = await Promise.all([dashRes.json(), recRes.json()]);
      setProfileData(dashJson);
      setRecommendations(recJson);
    } catch (err) {
      console.error('[ReelsFeed] fetchProfileTelemetry error:', err);
    }
  }, [user, apiFetch]);

  useEffect(() => { fetchReels(); }, [fetchReels]);

  useEffect(() => {
    if (user && reels.length > 0) fetchProfileTelemetry();
  }, [user, reels, fetchProfileTelemetry]);

  /* ── Action Handlers ── */

  /**
   * Seeds the database with fictional reel data for demo purposes.
   * @returns {Promise<void>}
   */
  const handleSeedData = useCallback(async () => {
    setSeeding(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reels/seed`,
      );
      if (!response.ok) throw new Error('Seeding failed.');
      await fetchReels();
      addToast('Fictional reels seeded successfully!', 'success');
    } catch (err) {
      setError('Failed to seed database: ' + err.message);
      addToast('Failed to seed reels: ' + err.message, 'error');
    } finally {
      setSeeding(false);
    }
  }, [fetchReels, addToast]);

  /**
   * Syncs real video assets from Cloudinary into the database.
   * @returns {Promise<void>}
   */
  const handleSyncCloudinary = useCallback(async () => {
    setSyncing(true);
    setError('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reels/sync`,
        { method: 'POST' },
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Sync failed.');
      addToast(result.message || 'Cloudinary sync successful!', 'success');
      await fetchReels();
    } catch (err) {
      setError('Failed to sync Cloudinary: ' + err.message);
      addToast('Cloudinary sync failed: ' + err.message, 'error');
    } finally {
      setSyncing(false);
    }
  }, [fetchReels, addToast]);

  /**
   * Logs a user interaction event to the API and refreshes telemetry.
   *
   * @param {string} reelId        - The reel's MongoDB ObjectId.
   * @param {string} type          - Interaction type: 'like'|'save'|'watch'|'skip'.
   * @param {number} [watchedPercent=0] - Furthest-watched percentage.
   * @returns {Promise<void>}
   */
  const logUserInteraction = useCallback(async (reelId, type, watchedPercent = 0) => {
    if (!user) return;
    try {
      await apiFetch('/interactions', {
        method: 'POST',
        body: JSON.stringify({ reelId, interactionType: type, watchedPercent }),
      });
      fetchProfileTelemetry();
    } catch (err) {
      console.error('[ReelsFeed] logUserInteraction error:', err);
    }
  }, [user, apiFetch, fetchProfileTelemetry]);

  /**
   * Toggles the like state for a reel and logs the interaction.
   * @param {string} reelId
   */
  const handleLike = useCallback((reelId) => {
    const isCurrentlyLiked = likedMap[reelId];
    setLikedMap((prev) => ({ ...prev, [reelId]: !isCurrentlyLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [reelId]: isCurrentlyLiked ? prev[reelId] - 1 : prev[reelId] + 1,
    }));
    logUserInteraction(reelId, isCurrentlyLiked ? 'skip' : 'like');
  }, [likedMap, logUserInteraction]);

  /**
   * Toggles the save state for a reel and logs the interaction.
   * @param {string} reelId
   */
  const handleSave = useCallback((reelId) => {
    const isCurrentlySaved = savedMap[reelId];
    setSavedMap((prev) => ({ ...prev, [reelId]: !isCurrentlySaved }));
    logUserInteraction(reelId, isCurrentlySaved ? 'skip' : 'save');
  }, [savedMap, logUserInteraction]);

  /**
   * Generates a new AI study plan via the recommendations API.
   * @returns {Promise<void>}
   */
  const handleGenerateStudyPlan = useCallback(async () => {
    setGenerating(true);
    try {
      const res = await apiFetch('/recommendations/generate', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Generation failed');

      setRecommendations(data.recommendations);
      await fetchProfileTelemetry();
      addToast('Grok AI generated your study plan!', 'success');
    } catch (err) {
      addToast('Failed to generate study plan: ' + err.message, 'error');
    } finally {
      setGenerating(false);
    }
  }, [apiFetch, fetchProfileTelemetry, addToast]);

  /**
   * Detects the active reel index based on scroll position within the feed container.
   */
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeIdx && index >= 0 && index < reels.length) {
      setActiveIdx(index);
    }
  }, [activeIdx, reels.length]);

  /* ── Render ── */

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col">
      <Navbar />

      <main
        id="main-content"
        aria-label="Reels feed"
        className="flex-grow flex items-center justify-center p-4"
      >
        {/* Loading */}
        {loading ? (
          <div
            className="text-center py-12"
            aria-live="polite"
            aria-busy="true"
          >
            <Loader className="w-10 h-10 text-[#365E7D] animate-spin mx-auto mb-4" aria-hidden="true" />
            <p role="status" className="text-[#667085]">Loading ScrollWise Workspace…</p>
          </div>

        /* Error */
        ) : error ? (
          <div
            role="alert"
            aria-live="assertive"
            className="max-w-md w-full text-center bg-red-500/10 border border-red-500/20 p-6 rounded-2xl mx-4"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-lg font-bold mb-2">Feed Connection Error</h2>
            <p className="text-xs text-[#667085] mb-4">{error}</p>
            <button
              onClick={fetchReels}
              aria-label="Retry loading the reels feed"
              className="px-4 py-2 bg-white border border-[#E6E4DE] rounded-xl hover:bg-[#F7F6F2] text-sm font-semibold transition"
            >
              Try Again
            </button>
          </div>

        /* Empty State */
        ) : reels.length === 0 ? (
          <div className="max-w-md w-full text-center bg-white border border-[#E6E4DE] p-8 rounded-2xl mx-4 shadow-sm">
            <Compass className="w-12 h-12 text-[#365E7D] mx-auto mb-4 animate-bounce" aria-hidden="true" />
            <h2 className="text-lg font-bold mb-2">No Reels Loaded</h2>
            <p className="text-xs text-[#667085] mb-6">
              Connect and seed your Instagram database with one click.
            </p>
            <div className="w-full space-y-3">
              <button
                onClick={handleSeedData}
                disabled={seeding}
                aria-disabled={seeding}
                aria-label={seeding ? 'Seeding reels, please wait' : 'Seed fictional reels into the feed'}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#365E7D] hover:brightness-110 text-white disabled:opacity-50 transition"
              >
                {seeding ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Seeding Reels…</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C9A66B]" aria-hidden="true" />
                    <span>Seed Fictional Reels</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSyncCloudinary}
                disabled={syncing}
                aria-disabled={syncing}
                aria-label={syncing ? 'Syncing Cloudinary videos, please wait' : 'Sync videos from Cloudinary'}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#52796F] hover:brightness-110 text-white disabled:opacity-50 transition"
              >
                {syncing ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Syncing Cloudinary…</span>
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4" aria-hidden="true" />
                    <span>Sync Cloudinary Videos</span>
                  </>
                )}
              </button>
            </div>
          </div>

        /* Main 3-Column Layout */
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto py-2">

            {/* Column 1: Signals Sidebar */}
            <LeftSidebar
              user={user}
              profileData={profileData}
              recommendations={recommendations}
              seeding={seeding}
              onSeedData={handleSeedData}
            />

            {/* Column 2: Reel Player */}
            <div className="lg:col-span-5 md:col-span-2 flex flex-col items-center gap-4 h-[calc(100vh-8rem)] min-h-[580px] max-h-[680px]">

              {/* Vertical Reel Viewer */}
              <div className="flex-shrink-0 w-full max-w-[340px] relative h-[440px] bg-black rounded-2xl border border-[#E6E4DE] shadow-md overflow-hidden flex flex-col">
                <div
                  ref={containerRef}
                  onScroll={handleScroll}
                  role="feed"
                  aria-label="Educational reels — scroll to navigate"
                  aria-busy={loading}
                  className="flex-grow overflow-y-scroll snap-y-mandatory no-scrollbar bg-black relative h-full w-full"
                >
                  {reels.map((reel, idx) => (
                    <ReelItem
                      key={reel._id}
                      reel={reel}
                      isActive={idx === activeIdx}
                      isMuted={isMuted}
                      setIsMuted={setIsMuted}
                      isLiked={!!likedMap[reel._id]}
                      isSaved={!!savedMap[reel._id]}
                      likesCount={formatNumber(likeCounts[reel._id] || 0)}
                      commentsCount={formatNumber(commentCounts[reel._id] || 0)}
                      sharesCount={formatNumber(shareCounts[reel._id] || 0)}
                      onLike={() => handleLike(reel._id)}
                      onSave={() => handleSave(reel._id)}
                      logWatch={(percent) => logUserInteraction(reel._id, 'watch', percent)}
                    />
                  ))}
                </div>
              </div>

              {/* Watch Telemetry Card */}
              <div className="w-full max-w-[340px] bg-white border border-[#E6E4DE] rounded-xl p-4 shadow-sm text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold uppercase text-[#365E7D] tracking-wider">
                    Current Watch Telemetry
                  </span>
                  <span className="text-[10px] font-bold text-[#52796F]">
                    watched • {activeIdx === 0 ? '84%' : '100%'}
                  </span>
                </div>

                <div className="bg-[#52796F]/5 border-l-2 border-[#52796F] p-2.5 rounded-r-lg">
                  <span className="text-[9px] font-extrabold uppercase text-[#52796F] tracking-wider block mb-1">
                    Why this matters
                  </span>
                  <p className="text-[11px] text-[#1F2933] italic leading-relaxed">
                    &ldquo;{reels[activeIdx]?.isEducational
                      ? `You are engaging with technical material on ${reels[activeIdx]?.category}. This signals educational intent.`
                      : `You engage with developer lifestyle & interview humor. We connect this to core topics.`
                    }&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Recommendations Sidebar */}
            <RightSidebar
              recommendations={recommendations}
              generating={generating}
              onGenerateStudyPlan={handleGenerateStudyPlan}
            />
          </div>
        )}
      </main>
    </div>
  );
}
