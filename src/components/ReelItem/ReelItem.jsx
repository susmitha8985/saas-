/**
 * @fileoverview ReelItem — a single full-screen educational reel card.
 *
 * Extracted from ReelsFeed.jsx to respect the Single Responsibility Principle.
 *
 * Accessibility improvements:
 * - `<video>` has `aria-label={reel.title}` and `title` for AT (WCAG 1.2.1)
 * - Like button: `aria-pressed={isLiked}`, `aria-label`
 * - Save button: `aria-pressed={isSaved}`, `aria-label`
 * - Mute/volume toggle on video tap: announced via `aria-live` status div
 * - Comments / Share buttons: descriptive `aria-label`
 * - All decorative icons: `aria-hidden="true"`
 * - Progress bar: `role="progressbar"` with `aria-valuenow`
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Heart, Bookmark, Volume2, VolumeX, MessageCircle, Send, MoreVertical,
} from 'lucide-react';

/** Double-tap detection threshold in milliseconds. */
const DOUBLE_TAP_DELAY_MS = 350;

/**
 * @typedef {Object} ReelItemProps
 * @property {Object}   reel          - Reel document from API.
 * @property {boolean}  isActive      - Whether this reel is currently in view.
 * @property {boolean}  isMuted       - Global mute state.
 * @property {Function} setIsMuted    - Setter for global mute state.
 * @property {boolean}  isLiked       - Whether the current user liked this reel.
 * @property {boolean}  isSaved       - Whether the current user saved this reel.
 * @property {string}   likesCount    - Formatted likes count string.
 * @property {string}   commentsCount - Formatted comments count string.
 * @property {string}   sharesCount   - Formatted shares count string.
 * @property {Function} onLike        - Callback for like toggle.
 * @property {Function} onSave        - Callback for save toggle.
 * @property {Function} logWatch      - Callback to log watch progress (percent: number).
 */

/**
 * Renders a single full-height reel card with video, controls, and captions.
 * @param {ReelItemProps} props
 */
export default function ReelItem({
  reel, isActive, isMuted, setIsMuted,
  isLiked, isSaved, likesCount, commentsCount, sharesCount,
  onLike, onSave, logWatch,
}) {
  const videoRef = useRef(null);
  const [showMuteIndicator, setShowMuteIndicator] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const maxWatchedPercentRef = useRef(0);
  const lastTapRef = useRef(0);
  const muteTimerRef = useRef(null);
  const heartTimerRef = useRef(null);

  /* ── Playback Control based on active state ── */
  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.currentTime = 0;
      maxWatchedPercentRef.current = 0;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[ReelItem] Autoplay blocked:', err);
        });
      }
    } else {
      videoRef.current.pause();

      // Log the furthest-reached watch percentage when leaving a reel
      if (maxWatchedPercentRef.current > 0) {
        logWatch(maxWatchedPercentRef.current);
        maxWatchedPercentRef.current = 0;
      }
    }

    // Cleanup timers on unmount / re-run
    return () => {
      clearTimeout(muteTimerRef.current);
      clearTimeout(heartTimerRef.current);
    };
  }, [isActive]);

  /* ── Tap / Double-Tap Gesture Handler ── */

  /**
   * Handles a single or double tap/click on the video overlay.
   * - Single tap: toggle mute
   * - Double tap: like + heart animation
   *
   * @param {React.MouseEvent | React.TouchEvent} e
   */
  const handleTapVideo = (e) => {
    if (e.type === 'touchstart') e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    const timeDiff = now - lastTapRef.current;

    if (timeDiff < DOUBLE_TAP_DELAY_MS && timeDiff > 0) {
      // Double-tap: like
      if (!isLiked) onLike();
      setShowHeartAnimation(true);
      heartTimerRef.current = setTimeout(() => setShowHeartAnimation(false), 800);
      lastTapRef.current = 0;
    } else {
      // Single-tap: mute toggle
      setIsMuted((prev) => !prev);
      setShowMuteIndicator(true);
      muteTimerRef.current = setTimeout(() => setShowMuteIndicator(false), 1000);
      lastTapRef.current = now;
    }
  };

  /* ── Video Progress Tracking ── */

  /** Updates the furthest-watched percentage as the video plays. */
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration) {
      const percent = Math.round((currentTime / duration) * 100);
      setVideoProgress(percent);
      if (percent > maxWatchedPercentRef.current) {
        maxWatchedPercentRef.current = Math.min(percent, 100);
      }
    }
  };

  /** Fires when video plays to completion — log 100% watch. */
  const handleVideoEnded = () => {
    logWatch(100);
    maxWatchedPercentRef.current = 100;
    setVideoProgress(100);
  };

  return (
    <article
      className="h-full w-full snap-start relative flex flex-col justify-between select-none bg-black"
      aria-label={`Reel: ${reel.title}`}
    >
      {/* ── Video Player ── */}
      <video
        ref={videoRef}
        src={reel.cloudinaryUrl}
        loop
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        aria-label={reel.title}
        title={reel.description || reel.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Tap Interceptor Overlay ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label={isMuted ? 'Tap to unmute, double-tap to like' : 'Tap to mute, double-tap to like'}
        onMouseDown={handleTapVideo}
        onTouchStart={handleTapVideo}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsMuted((prev) => !prev);
          }
        }}
        className="absolute inset-0 z-10 cursor-pointer select-none"
        style={{ WebkitUserSelect: 'none', userSelect: 'none', WebkitTouchCallout: 'none' }}
      />

      {/* ── Heart Double-Tap Animation ── */}
      {showHeartAnimation && (
        <div
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          aria-hidden="true"
        >
          <Heart className="w-20 h-20 text-red-500 fill-red-500 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-heartPop" />
        </div>
      )}

      {/* ── Gradient Overlays (decorative) ── */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" aria-hidden="true" />

      {/* ── Top Badge ── */}
      <div
        className="absolute top-4 left-4 flex items-center space-x-2 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm"
        aria-hidden="true"
      >
        <span className="font-heading font-extrabold text-xs text-white tracking-wider uppercase">Reels</span>
      </div>

      {/* ── Mute Indicator ── */}
      {showMuteIndicator && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          aria-hidden="true"
        >
          <div className="p-4 rounded-full bg-black/60 text-white flex items-center justify-center animate-ping">
            {isMuted
              ? <VolumeX className="w-8 h-8" />
              : <Volume2 className="w-8 h-8" />
            }
          </div>
        </div>
      )}

      {/* ── Screen-reader mute status (live) ── */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {showMuteIndicator ? (isMuted ? 'Video muted' : 'Video unmuted') : ''}
      </div>

      {/* Spacer */}
      <div className="flex-grow" aria-hidden="true" />

      {/* ── Bottom Layout ── */}
      <div className="w-full p-4 relative z-20 flex items-end justify-between space-x-4">

        {/* Left: Hashtags + Audio Indicator */}
        <div className="flex-grow text-left max-w-[76%] mb-1 bg-black/70 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl shadow-lg">
          {reel.hashtags?.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 mb-3" aria-label="Hashtags">
              {reel.hashtags.map((tag) => (
                <li key={tag} className="text-xs font-semibold text-white/75">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center bg-black/35 backdrop-blur-md rounded-full p-2 w-fit border border-white/5 shadow-sm" aria-hidden="true">
            <Volume2 className="w-3.5 h-3.5 text-white/95 animate-pulse" />
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-col items-center space-y-4 mb-2 flex-shrink-0">

          {/* Like Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={(e) => { e.stopPropagation(); onLike(); }}
              aria-pressed={isLiked}
              aria-label={isLiked ? 'Unlike this reel' : 'Like this reel'}
              className="p-2.5 rounded-full hover:scale-110 active:scale-95 transition"
            >
              <Heart
                className={`w-7 h-7 filter drop-shadow-md transition-colors ${isLiked ? 'text-red-500 fill-red-500 scale-105' : 'text-white'}`}
                aria-hidden="true"
              />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5" aria-hidden="true">
              {likesCount}
            </span>
            <span className="sr-only">{likesCount} likes</span>
          </div>

          {/* Comments Button */}
          <div className="flex flex-col items-center">
            <button
              aria-label={`View comments — ${commentsCount} comments`}
              className="p-2.5 rounded-full hover:scale-110 transition"
            >
              <MessageCircle className="w-7 h-7 text-white filter drop-shadow-md" aria-hidden="true" />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5" aria-hidden="true">
              {commentsCount}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <button
              aria-label={`Share this reel — ${sharesCount} shares`}
              className="p-2.5 rounded-full hover:scale-110 transition"
            >
              <Send
                className="w-6 h-6 text-white filter drop-shadow-md rotate-[345deg] -translate-y-0.5"
                aria-hidden="true"
              />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5" aria-hidden="true">
              {sharesCount}
            </span>
          </div>

          {/* Save / Bookmark Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={(e) => { e.stopPropagation(); onSave(); }}
              aria-pressed={isSaved}
              aria-label={isSaved ? 'Remove from saved reels' : 'Save this reel'}
              className="p-2.5 rounded-full hover:scale-110 active:scale-95 transition"
            >
              <Bookmark
                className={`w-6 h-6 filter drop-shadow-md transition-colors ${isSaved ? 'text-primary-cyan fill-primary-cyan scale-105' : 'text-white'}`}
                aria-hidden="true"
              />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5" aria-hidden="true">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </div>

          {/* More Options Button */}
          <button
            aria-label="More options for this reel"
            className="p-2.5 rounded-full hover:scale-110 transition"
          >
            <MoreVertical className="w-5 h-5 text-white filter drop-shadow-md" aria-hidden="true" />
          </button>

          {/* Spinning Audio Disc */}
          <div className="pt-2" aria-hidden="true">
            <div className="w-8 h-8 rounded-full border-2 border-white/60 bg-slate-900 overflow-hidden flex items-center justify-center animate-spin-slow shadow-md">
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${reel.title}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Video Progress Bar ── */}
      <div
        role="progressbar"
        aria-valuenow={videoProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Video progress: ${videoProgress} percent watched`}
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30"
      >
        <div
          className="bg-white h-full transition-all duration-100"
          style={{ width: `${videoProgress}%` }}
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
