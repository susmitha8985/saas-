import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  LayoutDashboard, User, Award, Compass, BarChart3, Clock, 
  Heart, Bookmark, GraduationCap, ChevronRight, Sparkles, Loader
} from 'lucide-react';

export default function Dashboard() {
  const { user, apiFetch } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/dashboard');
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch dashboard data.');
      setData(json);
    } catch (err) {
      console.error(err);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-dark-card/60 border border-dark-border p-8 rounded-2xl">
            <LayoutDashboard className="w-12 h-12 text-primary-purple mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">Authentication Required</h3>
            <p className="text-sm text-dark-muted mb-6">
              Log in to access your ScrollWise educational profile, analytics dashboard, and learning telemetry.
            </p>
            <Link
              to="/auth"
              className="inline-block w-full py-3 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-primary-indigo to-primary-purple text-white shadow-lg"
            >
              Sign In / Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <Loader className="w-10 h-10 text-primary-indigo animate-spin mx-auto mb-4" />
            <p className="text-dark-muted">Compiling developer profile telemetry...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-2">Error Loading Dashboard</h3>
            <p className="text-xs text-dark-muted mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-xs font-semibold"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: User Profile Card & Detected Interests */}
            <div className="lg:col-span-1 space-y-8">
              {/* Profile Card */}
              <div className="bg-dark-card border border-dark-border p-6 rounded-2xl relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-indigo/5 rounded-bl-full" />
                <div className="flex flex-col items-center text-center">
                  <img
                    src={data.user.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.name}`}
                    alt={data.user.name}
                    className="w-20 h-20 rounded-full border-2 border-primary-indigo p-1 bg-dark-bg shadow-md mb-4"
                  />
                  <h2 className="text-xl font-bold">{data.user.name}</h2>
                  <p className="text-xs text-dark-muted mb-2">{data.user.email}</p>
                  
                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary-indigo/10 border border-primary-indigo/25 text-primary-indigo text-xs font-bold mb-4 capitalize">
                    <span>{data.user.profile?.experienceLevel || 'Unspecified'} Level</span>
                  </div>

                  <p className="text-xs text-gray-300 italic max-w-xs">
                    "{data.user.profile?.bio || 'Full stack student explorer'}"
                  </p>
                </div>
              </div>

              {/* Detected Interests */}
              <div className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 text-primary-cyan font-bold mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-heading">AI Detected Interests</span>
                </div>
                
                {data.user.detectedInterests && data.user.detectedInterests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {data.user.detectedInterests.map((interest, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 text-xs rounded-xl bg-dark-bg border border-dark-border hover:border-primary-cyan/40 text-primary-cyan font-semibold transition"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-xs text-dark-muted leading-relaxed">
                      No interests inferred yet. Scroll tech reels, click Generate Recommendations, and Grok AI will populate your interest clusters!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Statistics Grid & Recent Scrolls */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Total Interactions */}
                <div className="bg-dark-card border border-dark-border p-4 rounded-xl text-left">
                  <div className="text-dark-muted mb-2"><Compass className="w-4 h-4 text-primary-indigo" /></div>
                  <div className="text-2xl font-bold text-white">{data.stats.totalInteractions}</div>
                  <div className="text-[10px] text-dark-muted font-semibold uppercase">Total Scrolls</div>
                </div>

                {/* Likes */}
                <div className="bg-dark-card border border-dark-border p-4 rounded-xl text-left">
                  <div className="text-dark-muted mb-2"><Heart className="w-4 h-4 text-red-500 fill-red-500/20" /></div>
                  <div className="text-2xl font-bold text-white">{data.stats.likesCount}</div>
                  <div className="text-[10px] text-dark-muted font-semibold uppercase">Likes</div>
                </div>

                {/* Saves */}
                <div className="bg-dark-card border border-dark-border p-4 rounded-xl text-left">
                  <div className="text-dark-muted mb-2"><Bookmark className="w-4 h-4 text-primary-cyan fill-primary-cyan/20" /></div>
                  <div className="text-2xl font-bold text-white">{data.stats.savesCount}</div>
                  <div className="text-[10px] text-dark-muted font-semibold uppercase">Saved</div>
                </div>

                {/* Educational Focus Ratio */}
                <div className="bg-dark-card border border-dark-border p-4 rounded-xl text-left">
                  <div className="text-dark-muted mb-2"><GraduationCap className="w-4 h-4 text-primary-purple" /></div>
                  <div className="text-2xl font-bold text-white">{data.stats.educationalRatio}%</div>
                  <div className="text-[10px] text-dark-muted font-semibold uppercase">Edu Focus Ratio</div>
                </div>
              </div>

              {/* Educational Progress Bar Panel */}
              <div className="bg-dark-card border border-dark-border p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base font-heading">Student Education Ratio</h3>
                  <span className="text-xs text-primary-indigo font-bold">{data.stats.educationalRatio}% Focus</span>
                </div>
                <div className="w-full bg-dark-bg border border-dark-border h-4 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: `${data.stats.educationalRatio}%` }}
                  />
                </div>
                <p className="text-[11px] text-dark-muted mt-3 leading-relaxed">
                  Focus ratio represents the share of educational vs entertainment reels you have interacted with. Keep watching DSA, hardware architecture, and interview prep to boost your score!
                </p>
              </div>

              {/* Recent Scrolls Timeline */}
              <div className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 text-primary-purple font-bold mb-6">
                  <Clock className="w-5 h-5" />
                  <span className="font-heading">Recent Scroll Activity</span>
                </div>

                {data.recentInteractions && data.recentInteractions.length > 0 ? (
                  <div className="space-y-4">
                    {data.recentInteractions.map((item, idx) => (
                      <div 
                        key={item._id} 
                        className="flex items-center justify-between p-3.5 bg-dark-bg/60 border border-dark-border/80 rounded-xl hover:border-dark-border transition"
                      >
                        <div className="flex items-center space-x-3 text-left">
                          <div className={`p-2 rounded-lg text-xs font-bold uppercase ${
                            item.interactionType === 'like' ? 'bg-red-500/10 text-red-400' :
                            item.interactionType === 'save' ? 'bg-cyan-500/10 text-cyan-400' :
                            item.interactionType === 'skip' ? 'bg-gray-500/10 text-gray-400' :
                            'bg-indigo-500/10 text-indigo-400'
                          }`}>
                            {item.interactionType}
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-white line-clamp-1">{item.title}</h4>
                            <p className="text-[10px] text-dark-muted font-medium">Category: {item.category} • Watched: {item.watchedPercent}%</p>
                          </div>
                        </div>
                        <div className="text-[10px] text-dark-muted">
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-dark-muted leading-relaxed mb-4">No recent interaction history logged.</p>
                    <Link
                      to="/feed"
                      className="px-4 py-2 bg-primary-indigo/20 border border-primary-indigo/40 text-xs font-semibold rounded-lg text-primary-indigo hover:bg-primary-indigo/35 transition"
                    >
                      Visit Reels Feed
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
