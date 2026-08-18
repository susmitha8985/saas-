import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Award, BrainCircuit, RefreshCcw, Sparkles, ChevronDown, ChevronUp, 
  BookOpen, HelpCircle, Loader, Compass, ShieldAlert, GraduationCap
} from 'lucide-react';

export default function RecommendationsPage() {
  const { user, apiFetch } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Expandable panel map to control individual expandable state by ID
  const [expandedMap, setExpandedMap] = useState({});

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/recommendations');
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || 'Failed to fetch recommendations list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await apiFetch('/recommendations/generate', {
        method: 'POST'
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Recommendation generation failed.');
      }
      
      setRecommendations(data.recommendations);
      setSuccessMsg('Grok AI successfully analyzed your feed behavior and generated new career paths!');
      
      // Auto expand the first card
      if (data.recommendations.length > 0) {
        setExpandedMap({ [data.recommendations[0]._id]: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to contact Grok AI backend.');
    } finally {
      setGenerating(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getConfidenceBadge = (confidence) => {
    const caps = confidence?.toUpperCase() || 'MEDIUM';
    if (caps === 'HIGH') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded bg-green-500/10 border border-green-500/30 text-green-400">
          High Confidence
        </span>
      );
    } else if (caps === 'MEDIUM') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
          Medium Confidence
        </span>
      );
    } else {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded bg-orange-500/10 border border-orange-500/30 text-orange-400">
          Low Confidence
        </span>
      );
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const caps = difficulty?.toUpperCase() || 'BEGINNER';
    if (caps === 'ADVANCED') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-red-500/15 border border-red-500/30 text-red-400">
          Advanced
        </span>
      );
    } else if (caps === 'INTERMEDIATE') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-blue-500/15 border border-blue-500/30 text-blue-400">
          Intermediate
        </span>
      );
    } else {
      return (
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
          Beginner
        </span>
      );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-dark-card/60 border border-dark-border p-8 rounded-2xl">
            <ShieldAlert className="w-12 h-12 text-primary-purple mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">Authentication Required</h3>
            <p className="text-sm text-dark-muted mb-6">
              You must register or log in to allow ScrollWise to collect scroll interactions and generate recommendations.
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

      <div className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-indigo/10 border border-primary-indigo/25 text-primary-indigo mb-4">
            <BrainCircuit className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">AI Recommendation Hub</span>
          </div>
          <h1 className="text-4xl font-bold font-heading mb-4">
            Personalized Study Guidance
          </h1>
          <p className="text-dark-muted max-w-xl mx-auto text-sm leading-relaxed">
            Analyze your feed interaction patterns. Grok AI will parse your technical intents and propose advanced, educational roadmaps.
          </p>
        </div>

        {/* Generate / Action Area */}
        <div className="bg-dark-card border border-dark-border p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          <div className="text-left">
            <h3 className="font-bold text-base mb-1">Update Recommendations</h3>
            <p className="text-xs text-dark-muted">
              Grok parses watch percentages, likes, and skips to evaluate technical experience shifts.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all duration-300"
          >
            {generating ? (
              <>
                <RefreshCcw className="w-4 h-4 animate-spin" />
                <span>Analyzing Behavior...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Recommendations</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6 animate-pulse">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-xs mb-6">
            {successMsg}
          </div>
        )}

        {/* Recommendations List Container */}
        {loading ? (
          <div className="text-center py-16">
            <Loader className="w-10 h-10 text-primary-indigo animate-spin mx-auto mb-4" />
            <p className="text-dark-muted">Retrieving recommendations...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-16 bg-dark-card/40 border border-dark-border/60 rounded-2xl">
            <Compass className="w-12 h-12 text-dark-muted mx-auto mb-4 animate-pulse" />
            <h4 className="text-base font-bold mb-2">No Recommendation History</h4>
            <p className="text-xs text-dark-muted max-w-sm mx-auto mb-6">
              You haven't requested any recommendations yet. Go scroll through the feed and interact with a few Reels, then return here to click Generate.
            </p>
            <Link
              to="/feed"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold rounded-xl"
            >
              Go to Feed
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((rec) => {
              const isExpanded = !!expandedMap[rec._id];
              return (
                <div 
                  key={rec._id} 
                  className="bg-dark-card border border-dark-border hover:border-primary-indigo/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  {/* Card Header (Target Recommended Reel Title) */}
                  <div className="p-6 border-b border-dark-border/60 bg-gradient-to-r from-dark-card to-dark-bg/60">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-primary-indigo text-white">
                          {rec.category}
                        </span>
                        {getDifficultyBadge(rec.difficulty)}
                      </div>
                      {getConfidenceBadge(rec.confidence)}
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                      {rec.recommendedTopic}
                    </h2>
                    
                    <p className="text-xs text-primary-cyan flex items-center space-x-1.5 font-medium">
                      <GraduationCap className="w-4 h-4" />
                      <span>Recommended study curriculum topic</span>
                    </p>
                  </div>

                  {/* Card Required Fields */}
                  <div className="p-6 space-y-4 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Current Reel Reference */}
                      <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                        <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                          Current Reel
                        </span>
                        <span className="text-xs text-gray-200 font-semibold leading-relaxed block">
                          {rec.currentReelId?.title || 'General Scroll History'}
                        </span>
                      </div>

                      {/* Interest Inferred */}
                      <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                        <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                          Interest Detected
                        </span>
                        <span className="text-xs text-gray-200 font-semibold leading-relaxed block">
                          {rec.detectedInterest}
                        </span>
                      </div>
                    </div>

                    {/* Evidence */}
                    <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                      <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                        Why (Evidence)
                      </span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {rec.evidence}
                      </p>
                    </div>

                    {/* Recommended Tech Reel */}
                    <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                      <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                        Recommended Tech Reel
                      </span>
                      <p className="text-xs text-white font-bold">
                        {rec.recommendedTopic}
                      </p>
                    </div>

                    {/* Category Label */}
                    <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                      <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                        Category
                      </span>
                      <p className="text-xs text-gray-300">
                        {rec.category} (AI / DSA / Java / HLD / Cybersecurity / Cloud / Hardware / Career / Other)
                      </p>
                    </div>

                    {/* Why This Recommendation */}
                    <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                      <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                        Why This Recommendation
                      </span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>

                    {/* Difficulty and Confidence */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                        <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                          Difficulty
                        </span>
                        <p className="text-xs text-gray-300 font-semibold">{rec.difficulty}</p>
                      </div>
                      <div className="p-3 bg-dark-bg/60 border border-dark-border rounded-xl">
                        <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider block mb-1">
                          Confidence
                        </span>
                        <p className="text-xs text-gray-300 font-semibold">{rec.confidence}</p>
                      </div>
                    </div>

                    {/* Why did I get this? Expandable panel */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleExpand(rec._id)}
                        className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-primary-indigo/35 bg-primary-indigo/5 text-primary-indigo hover:bg-primary-indigo/10 transition-all duration-300 text-xs font-semibold"
                      >
                        <span className="flex items-center space-x-1.5">
                          <HelpCircle className="w-4 h-4" />
                          <span>Why did I get this? Explanation</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-4 bg-dark-bg border border-dark-border rounded-xl text-xs space-y-3.5 leading-relaxed text-gray-300 animate-slideDown">
                          <p>
                            We tracked your engagement with <strong>{rec.currentReelId?.title || 'your recent scroll stream'}</strong>. Your watch time reached critical volumes, and you provided strong interaction signals.
                          </p>
                          <div className="border-l-2 border-primary-indigo pl-3 py-1 bg-white/5 rounded-r">
                            <span className="font-bold text-[10px] text-primary-indigo uppercase block mb-0.5">AI Inference Trail</span>
                            <span className="text-gray-200">{rec.evidence}</span>
                          </div>
                          <p>
                            To guide you off casual distractions and vlogs, we bypass generic hype loops and recommend this structured concept. Studying <strong>{rec.recommendedTopic}</strong> will equip you with standard technical knowledge expected in {rec.difficulty.toLowerCase()} engineering roles.
                          </p>
                          <p className="text-[10px] text-dark-muted italic">
                            Confidence rating is {rec.confidence.toLowerCase()} based on current telemetry logs. Recommendation registered at {new Date(rec.createdAt).toLocaleString()}.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
