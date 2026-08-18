import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Heart, Bookmark, Volume2, VolumeX, MessageCircle, Send, MoreVertical,
  Film, Sparkles, AlertCircle, Loader, RefreshCcw, ShieldCheck, Grid, CheckCircle2,
  HelpCircle, ChevronDown, ChevronUp, BrainCircuit, Play, Award, Settings, Clock,
  User as UserIcon, Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReelsFeed() {
  const { user, apiFetch } = useAuth();
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Profile data and AI states
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [expandedMap, setExpandedMap] = useState({});

  // Likes and Saves local telemetry mapping
  const [likedMap, setLikedMap] = useState({});
  const [savedMap, setSavedMap] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [shareCounts, setShareCounts] = useState({});

  const containerRef = useRef(null);

  // Fetch all reels
  const fetchReels = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reels`);
      if (!response.ok) {
        throw new Error('Failed to fetch reels.');
      }
      const data = await response.json();
      setReels(data);

      // Generate randomized Instagram counts for likes, comments, shares for authenticity
      const initialLikes = {};
      const initialComments = {};
      const initialShares = {};
      data.forEach(reel => {
        initialLikes[reel._id] = Math.floor(Math.random() * 45000) + 5000;
        initialComments[reel._id] = Math.floor(Math.random() * 800) + 120;
        initialShares[reel._id] = Math.floor(Math.random() * 1200) + 80;
      });
      setLikeCounts(initialLikes);
      setCommentCounts(initialComments);
      setShareCounts(initialShares);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard and recommendation telemetry for the profile section
  const fetchProfileTelemetry = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      // Fetch Dashboard
      const dashRes = await apiFetch('/dashboard');
      const dashJson = await dashRes.json();
      setProfileData(dashJson);

      // Fetch Recommendations
      const recRes = await apiFetch('/recommendations');
      const recJson = await recRes.json();
      setRecommendations(recJson);
    } catch (err) {
      console.error("Profile telemetry error:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    if (user && reels.length > 0) {
      fetchProfileTelemetry();
    }
  }, [user, reels]);

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reels/seed`);
      if (!response.ok) throw new Error('Seeding failed.');
      await fetchReels();
    } catch (err) {
      setError('Failed to seed database: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  const handleSyncCloudinary = async () => {
    setSyncing(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reels/sync`, {
        method: 'POST'
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Sync failed.');
      }
      const result = await response.json();
      alert(result.message || 'Sync successful!');
      await fetchReels();
    } catch (err) {
      setError('Failed to sync Cloudinary: ' + err.message);
    } finally {
      setSyncing(false);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const height = container.clientHeight;
    
    const index = Math.round(scrollPosition / height);
    if (index !== activeIdx && index >= 0 && index < reels.length) {
      setActiveIdx(index);
    }
  };

  const logUserInteraction = async (reelId, type, watchedPercent = 0) => {
    if (!user) return;
    try {
      await apiFetch('/interactions', {
        method: 'POST',
        body: JSON.stringify({
          reelId,
          interactionType: type,
          watchedPercent
        })
      });
      // Refresh telemetry automatically after logs
      fetchProfileTelemetry();
    } catch (err) {
      console.error("Failed to log interaction to server:", err);
    }
  };

  const handleLike = (reelId) => {
    const isCurrentlyLiked = likedMap[reelId];
    setLikedMap(prev => ({ ...prev, [reelId]: !isCurrentlyLiked }));
    
    setLikeCounts(prev => ({
      ...prev,
      [reelId]: isCurrentlyLiked ? prev[reelId] - 1 : prev[reelId] + 1
    }));

    logUserInteraction(reelId, isCurrentlyLiked ? 'skip' : 'like');
  };

  const handleSave = (reelId) => {
    const isCurrentlySaved = savedMap[reelId];
    setSavedMap(prev => ({ ...prev, [reelId]: !isCurrentlySaved }));
    
    logUserInteraction(reelId, isCurrentlySaved ? 'skip' : 'save');
  };

  const handleGenerateStudyPlan = async () => {
    setGenerating(true);
    try {
      const res = await apiFetch('/recommendations/generate', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Generation failed');
      
      setRecommendations(data.recommendations);
      await fetchProfileTelemetry();
      
      // Auto expand the first recommendation card
      if (data.recommendations.length > 0) {
        setExpandedMap({ [data.recommendations[0]._id]: true });
      }
    } catch (err) {
      alert("Failed to analyze path: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4">
        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-10 h-10 text-[#365E7D] animate-spin mx-auto mb-4" />
            <p className="text-[#667085]">Loading ScrollWise Workspace...</p>
          </div>
        ) : error ? (
          <div className="max-w-md w-full text-center bg-red-500/10 border border-red-500/20 p-6 rounded-2xl mx-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Feed Connection Error</h3>
            <p className="text-xs text-[#667085] mb-4">{error}</p>
            <button
              onClick={fetchReels}
              className="px-4 py-2 bg-white border border-[#E6E4DE] rounded-xl hover:bg-[#F7F6F2] text-sm font-semibold transition"
            >
              Try Again
            </button>
          </div>
        ) : reels.length === 0 ? (
          <div className="max-w-md w-full text-center bg-white border border-[#E6E4DE] p-8 rounded-2xl mx-4 shadow-sm">
            <Compass className="w-12 h-12 text-[#365E7D] mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-bold mb-2">No Reels Loaded</h3>
            <p className="text-xs text-[#667085] mb-6">
              Connect and seed your Instagram database with one click.
            </p>
            <div className="w-full space-y-3">
              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#365E7D] hover:brightness-110 text-white disabled:opacity-50 transition"
              >
                {seeding ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    <span>Seeding Reels...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C9A66B]" />
                    <span>Seed Fictional Reels</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleSyncCloudinary}
                disabled={syncing}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#52796F] hover:brightness-110 text-white disabled:opacity-50 transition"
              >
                {syncing ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    <span>Syncing Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4" />
                    <span>Sync Cloudinary Videos</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Main 3-Column Layout */
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto py-2">
            
            {/* COLUMN 1: YOUR SIGNALS (Left Sidebar - spans 3 columns on large screens) */}
            <div className="lg:col-span-3 md:col-span-1 bg-white border border-[#E6E4DE] rounded-2xl p-5 shadow-sm text-left flex flex-col justify-between h-[calc(100vh-8rem)] min-h-[580px] max-h-[680px]">
              <div className="space-y-5 overflow-y-auto no-scrollbar">
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-[#365E7D] tracking-wider mb-3">
                    Your Signals
                  </h3>
                  
                  {/* User Profile avatar/bio card */}
                  <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-xl border border-[#E6E4DE] mb-4">
                    <img
                      src={user?.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || 'Guest'}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border border-[#E6E4DE]"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-[#1F2933] truncate">{user?.name || 'Guest Student'}</h4>
                      <p className="text-[10px] text-[#667085] truncate capitalize">Level: {profileData?.user?.profile?.experienceLevel || 'Beginner'}</p>
                    </div>
                  </div>
                </div>

                {/* Inferred Interests */}
                <div className="space-y-2">
                  <span className="text-[9px] font-extrabold uppercase text-[#667085] tracking-wider block">
                    AI Inferred Interests
                  </span>
                  {user?.detectedInterests && user.detectedInterests.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {user.detectedInterests.map((interest, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] rounded-md bg-[#365E7D]/10 text-[#365E7D] font-bold border border-[#365E7D]/20">
                          {interest}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-[#667085] italic">Scroll reels to detect interests.</p>
                  )}
                </div>

                {/* Stats summary */}
                <div className="pt-2 border-t border-[#E6E4DE] space-y-2">
                  <span className="text-[9px] font-extrabold uppercase text-[#667085] tracking-wider block">
                    Watch Analytics
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-[#F7F6F2] p-2 rounded-lg border border-[#E6E4DE]">
                      <div className="font-bold text-[#1F2933]">{profileData?.stats?.totalInteractions || 0}</div>
                      <div className="text-[8px] text-[#667085] uppercase">Scrolls</div>
                    </div>
                    <div className="bg-[#F7F6F2] p-2 rounded-lg border border-[#E6E4DE]">
                      <div className="font-bold text-[#1F2933]">{profileData?.stats?.educationalRatio || 0}%</div>
                      <div className="text-[8px] text-[#667085] uppercase">Focus</div>
                    </div>
                  </div>
                </div>

                {/* Focus bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9px] text-[#667085] font-bold">
                    <span>Focus Ratio</span>
                    <span className="text-[#52796F]">{profileData?.stats?.educationalRatio || 0}%</span>
                  </div>
                  <div className="w-full bg-[#F7F6F2] border border-[#E6E4DE] h-2 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="bg-gradient-to-r from-[#365E7D] to-[#52796F] h-full rounded-full transition-all duration-300"
                      style={{ width: `${profileData?.stats?.educationalRatio || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Confidence Score at bottom & Action buttons */}
              <div className="pt-4 border-t border-[#E6E4DE] space-y-3">
                <div className="flex justify-between items-center bg-[#52796F]/10 border border-[#52796F]/20 px-3 py-2 rounded-xl text-xs">
                  <span className="font-bold text-[#667085] text-[10px]">Confidence</span>
                  <span className="px-2 py-0.5 font-bold uppercase rounded text-[9px] bg-[#52796F] text-white">
                    {recommendations.length > 0 ? (recommendations[0].confidence || 'High') : 'High'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSeedData}
                    disabled={seeding}
                    className="w-full flex items-center justify-center space-x-1.5 py-2 px-2 rounded-xl text-[10px] font-bold border border-[#E6E4DE] bg-white hover:bg-[#F7F6F2] text-[#1F2933] disabled:opacity-50 transition shadow-sm"
                  >
                    {seeding ? <RefreshCcw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />}
                    <span>Seed Fictional Reels</span>
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 2: CURRENT REEL (Middle - spans 5 columns on large screens) */}
            <div className="lg:col-span-5 md:col-span-2 flex flex-col items-center gap-4 h-[calc(100vh-8rem)] min-h-[580px] max-h-[680px]">
              
              {/* Vertical Reel Viewer Container */}
              <div className="flex-shrink-0 w-full max-w-[340px] relative h-[440px] bg-black rounded-2xl border border-[#E6E4DE] shadow-md overflow-hidden flex flex-col">
                <div 
                  ref={containerRef}
                  onScroll={handleScroll}
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

              {/* Progress and "Why this matters" Card below player */}
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
                    "{reels[activeIdx]?.isEducational 
                      ? `You are engaging with technical material on ${reels[activeIdx]?.category}. This signals educational intent.` 
                      : `You engage with developer lifestyle & interview humor. We connect this to core topics.`}"
                  </p>
                </div>
              </div>
            </div>

            {/* COLUMN 3: NEXT BEST RECOMMENDATION (Right Sidebar - spans 4 columns on large screens) */}
            <div className="lg:col-span-4 md:col-span-1 bg-white border border-[#E6E4DE] rounded-2xl p-5 shadow-sm overflow-y-auto no-scrollbar h-[calc(100vh-8rem)] min-h-[580px] max-h-[680px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase text-[#365E7D] tracking-wider">
                    Next Best Recommendation
                  </h3>
                  <span className="text-[9px] font-bold text-[#667085]">
                    ({recommendations?.length || 0} Roadmaps)
                  </span>
                </div>

                {recommendations && recommendations.length > 0 ? (
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div 
                        key={rec._id} 
                        className="bg-[#F7F6F2] border border-[#E6E4DE] hover:border-[#365E7D]/40 p-3 rounded-xl space-y-2 text-left transition-all duration-300"
                      >
                        {/* Recommendation Title */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded bg-[#365E7D]/10 text-[#365E7D] tracking-wide inline-block mb-1">
                              {rec.category}
                            </span>
                            <h4 className="font-bold text-[#1F2933] text-xs leading-normal">
                              {rec.recommendedTopic}
                            </h4>
                          </div>
                          
                          {/* Mini Thumbnail representation */}
                          <div className="w-10 h-10 rounded bg-[#E6E4DE] overflow-hidden flex-shrink-0 flex items-center justify-center border border-[#E6E4DE]">
                            <img
                              src={rec.currentReelId?.thumbnailUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&auto=format&fit=crop"}
                              alt="thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <p className="text-[10px] text-[#667085] leading-relaxed line-clamp-2">
                          {rec.reason}
                        </p>

                        <div className="flex items-center justify-between text-[8px] font-bold uppercase text-[#667085] pt-1 border-t border-[#E6E4DE]">
                          <span>{rec.difficulty}</span>
                          <span className="text-[#52796F]">{rec.confidence} Conf.</span>
                        </div>

                        {/* Watch Now Button */}
                        <button
                          onClick={() => alert(`Starting Study Path: ${rec.recommendedTopic}`)}
                          className="w-full py-1.5 mt-1.5 bg-[#365E7D] hover:bg-[#365E7D]/90 text-white font-bold text-[10px] rounded-lg transition"
                        >
                          Watch Now
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 bg-[#F7F6F2] border border-[#E6E4DE] border-dashed rounded-xl text-center">
                    <p className="text-[10px] text-[#667085]">
                      No recommendations yet. Use the button below to generate your first technical learning roadmap.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button at bottom */}
              <button 
                onClick={handleGenerateStudyPlan}
                disabled={generating}
                className="w-full py-2.5 mt-4 rounded-xl bg-[#365E7D] text-white font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-[#365E7D]/95 active:scale-95 transition shadow-sm"
              >
                {generating ? (
                  <>
                    <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating Roadmaps...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate AI Study Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Full Instagram Replica Reel Item Renderer
function ReelItem({ 
  reel, isActive, isMuted, setIsMuted, isLiked, isSaved, 
  likesCount, commentsCount, sharesCount, onLike, onSave, logWatch 
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMuteIndicator, setShowMuteIndicator] = useState(false);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [followText, setFollowText] = useState('Follow');

  const maxWatchedPercentRef = useRef(0);
  const lastTapRef = useRef(0);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const creatorHandle = `@${reel.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  useEffect(() => {
    if (isActive) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        maxWatchedPercentRef.current = 0;
        
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.warn("Autoplay interrupted:", error);
              setIsPlaying(false);
            });
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
        
        if (maxWatchedPercentRef.current > 0) {
          logWatch(maxWatchedPercentRef.current);
          maxWatchedPercentRef.current = 0;
        }
      }
    }
  }, [isActive]);

  const handleTapVideo = (e) => {
    if (e) {
      e.stopPropagation();
      if (e.type === 'touchstart') {
        e.preventDefault();
      }
    }
    
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 350;
    const timeDiff = now - lastTapRef.current;
    
    if (timeDiff < DOUBLE_TAP_DELAY && timeDiff > 0) {
      // Double tap detected: LIKE
      if (!isLiked) {
        onLike();
      }
      setShowHeartAnimation(true);
      setTimeout(() => {
        setShowHeartAnimation(false);
      }, 800);
      lastTapRef.current = 0;
    } else {
      // Single tap detected: Mute toggle
      setIsMuted(!isMuted);
      setShowMuteIndicator(true);
      setTimeout(() => {
        setShowMuteIndicator(false);
      }, 1000);
      lastTapRef.current = now;
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur) {
      const percent = Math.round((current / dur) * 100);
      if (percent > maxWatchedPercentRef.current) {
        maxWatchedPercentRef.current = Math.min(percent, 100);
      }
    }
  };

  const handleVideoEnded = () => {
    logWatch(100);
    maxWatchedPercentRef.current = 100;
  };

  const handleFollowToggle = (e) => {
    e.stopPropagation();
    setFollowText(prev => prev === 'Follow' ? 'Following' : 'Follow');
  };

  return (
    <div className="h-full w-full snap-start relative flex flex-col justify-between select-none bg-black">
      
      {/* 9:16 Center Video Player */}
      <video
        ref={videoRef}
        src={reel.cloudinaryUrl}
        loop
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Transparent Click Interceptor Overlay for Tap and Double-Tap gestures */}
      <div 
        onMouseDown={handleTapVideo}
        onTouchStart={handleTapVideo}
        className="absolute inset-0 z-10 cursor-pointer select-none"
        style={{ WebkitUserSelect: 'none', userSelect: 'none', WebkitTouchCallout: 'none' }}
      />

      {/* Large Center Double-Tap Heart Animation */}
      {showHeartAnimation && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <Heart className="w-20 h-20 text-red-500 fill-red-500 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-heartPop" />
        </div>
      )}

      {/* Instagram Gradient Shadow Overlays */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

      {/* Top Header Labels (Instagram Reel title style) */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
        <span className="font-heading font-extrabold text-xs text-white tracking-wider uppercase">Reels</span>
      </div>

      {/* Temporary visual Tap Mute feedback indicator */}
      {showMuteIndicator && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="p-4 rounded-full bg-black/60 text-white flex items-center justify-center animate-ping">
            {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Bottom Layout Container */}
      <div className="w-full p-4 relative z-20 flex items-end justify-between space-x-4">
        
        {/* Left Side: Caption and Details wrapped in a dark high-contrast card for backdrop legibility */}
        <div className="flex-grow text-left max-w-[76%] mb-1 bg-black/70 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl shadow-lg">

          {/* Hashtags list */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {reel.hashtags?.map((tag, i) => (
              <span key={i} className="text-xs font-semibold text-white/75">
                #{tag}
              </span>
            ))}
          </div>

          {/* Audio music symbol */}
          <div className="flex items-center bg-black/35 backdrop-blur-md rounded-full p-2 w-fit border border-white/5 shadow-sm">
            <Volume2 className="w-3.5 h-3.5 text-white/95 animate-pulse" />
          </div>
        </div>

        {/* Right Side: Instagram Vertical Action Buttons */}
        <div className="flex flex-col items-center space-y-4 mb-2 flex-shrink-0">
          {/* Like Button */}
          <div className="flex flex-col items-center">
            <button 
              onClick={(e) => { e.stopPropagation(); onLike(); }}
              className="p-2.5 rounded-full hover:scale-110 active:scale-95 transition"
            >
              <Heart className={`w-7 h-7 text-white filter drop-shadow-md ${isLiked ? 'text-red-500 fill-red-500 scale-105' : ''}`} />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{likesCount}</span>
          </div>

          {/* Comments Button */}
          <div className="flex flex-col items-center">
            <button className="p-2.5 rounded-full hover:scale-110 transition">
              <MessageCircle className="w-7 h-7 text-white filter drop-shadow-md" />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{commentsCount}</span>
          </div>

          {/* Share/Send Button */}
          <div className="flex flex-col items-center">
            <button className="p-2.5 rounded-full hover:scale-110 transition">
              <Send className="w-6 h-6 text-white filter drop-shadow-md rotate-[345deg] -translate-y-0.5" />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{sharesCount}</span>
          </div>

          {/* Save/Bookmark Button */}
          <div className="flex flex-col items-center">
            <button 
              onClick={(e) => { e.stopPropagation(); onSave(); }}
              className="p-2.5 rounded-full hover:scale-110 active:scale-95 transition"
            >
              <Bookmark className={`w-6.5 h-6.5 text-white filter drop-shadow-md ${isSaved ? 'text-primary-cyan fill-primary-cyan scale-105' : ''}`} />
            </button>
            <span className="text-[10px] text-white font-bold drop-shadow-md mt-0.5">{isSaved ? 'Saved' : 'Save'}</span>
          </div>

          {/* More options button */}
          <button className="p-2.5 rounded-full hover:scale-110 transition">
            <MoreVertical className="w-5 h-5 text-white filter drop-shadow-md" />
          </button>

          {/* Rotating vinyl record audio cover at bottom right */}
          <div className="pt-2">
            <div className="w-8 h-8 rounded-full border-2 border-white/60 bg-slate-900 overflow-hidden flex items-center justify-center animate-spin-slow shadow-md">
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${reel.title}`}
                alt="music disc"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Progress Bar indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div 
          className="bg-white h-full transition-all duration-100" 
          style={{ width: `${videoRef.current?.duration ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0}%` }}
        />
      </div>

    </div>
  );
}
