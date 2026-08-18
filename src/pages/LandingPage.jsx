import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, BrainCircuit, BarChart3, Upload, GraduationCap } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <header className="relative flex-grow flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Glow Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-indigo/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl animate-pulse-glow" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary-cyan" />
            <span className="text-xs font-semibold text-primary-cyan tracking-wide uppercase">
              Stop Doomscrolling. Start Building.
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight tracking-tight mb-6">
            Convert Passive Scrolling Into{' '}
            <span className="bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan bg-clip-text text-transparent">
              Career Capital
            </span>
          </h1>

          <p className="text-lg md:text-xl text-dark-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            ScrollWise intercepts your typical programming memes and tech-vlog distractions. 
            Our Grok-powered AI agent analyzes your interest patterns, then delivers actionable, high-quality 
            technical recommendations—from system architecture to coding interview prep.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan hover:brightness-110 shadow-lg shadow-primary-indigo/25 text-white transition-all duration-300 hover:scale-[1.03] text-center"
            >
              Get Started for Free
            </Link>
            <Link
              to="/feed"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-base font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300 hover:scale-[1.03] text-center"
            >
              <Compass className="w-5 h-5 text-primary-cyan" />
              <span>Explore Reels Feed</span>
            </Link>
          </div>
        </div>
      </header>

      {/* How it Works Section */}
      <section className="py-20 bg-dark-bg/60 border-t border-dark-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              How ScrollWise Reframes Your Focus
            </h2>
            <p className="text-dark-muted">
              We don't tell you to stop watching Reels. We just make what you watch actually work for your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-dark-card/40 border border-dark-border/60 p-8 rounded-2xl relative overflow-hidden group hover:border-primary-indigo/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-indigo/5 rounded-bl-full group-hover:bg-primary-indigo/10 transition-all duration-300" />
              <div className="p-3 bg-primary-indigo/10 rounded-xl w-fit text-primary-indigo mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">1. Scroll Fictional Reels</h3>
              <p className="text-dark-muted leading-relaxed text-sm">
                Watch standard tech-lifestyle vlogs, funny programming jokes, AI hype news, or gadget reviews in our student feed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-dark-card/40 border border-dark-border/60 p-8 rounded-2xl relative overflow-hidden group hover:border-primary-purple/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/5 rounded-bl-full group-hover:bg-primary-purple/10 transition-all duration-300" />
              <div className="p-3 bg-primary-purple/10 rounded-xl w-fit text-primary-purple mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">2. Semantic Interest Analysis</h3>
              <p className="text-dark-muted leading-relaxed text-sm">
                Grok AI bypasses the shallow jokes. It infers your technical experience levels, interests (like DSA, API systems, or LLMs) and career goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-dark-card/40 border border-dark-border/60 p-8 rounded-2xl relative overflow-hidden group hover:border-primary-cyan/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-cyan/5 rounded-bl-full group-hover:bg-primary-cyan/10 transition-all duration-300" />
              <div className="p-3 bg-primary-cyan/10 rounded-xl w-fit text-primary-cyan mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">3. Practical Tech Roadmap</h3>
              <p className="text-dark-muted leading-relaxed text-sm">
                Receive educational video content mapped perfectly to your inferred interest, with explanations detailing "Why did I get this?".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Transformation Showcase - The Built-in Trap Demo */}
      <section className="py-20 bg-dark-bg border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary-cyan/5 rounded-full blur-3xl" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold text-primary-purple tracking-widest uppercase mb-2 block">
                  The ScrollWise Difference
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 leading-tight">
                  Bypassing the Hype & Meme Trap
                </h2>
                <p className="text-dark-muted mb-6 leading-relaxed">
                  Most recommendation systems see you watch a Java meme and flood you with fifty more Java memes. They optimize for shallow clicks.
                </p>
                <p className="text-dark-muted mb-8 leading-relaxed">
                  <strong>ScrollWise does the opposite.</strong> If you watch programmer memes and tech-vlogs, Grok infers a developer career intent, filters out hype listicles, and recommends core educational deep dives like:
                </p>
                <ul className="space-y-3.5">
                  <li className="flex items-center space-x-3 text-sm text-gray-200">
                    <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full" />
                    <span>How a backend API request flows from browser to database</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-gray-200">
                    <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full" />
                    <span>What to learn for entry-level software engineering interviews</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-gray-200">
                    <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full" />
                    <span>Deep dive into CPU instructions and hardware architecture</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Illustration */}
              <div className="bg-dark-bg/60 border border-dark-border/80 p-6 rounded-2xl shadow-2xl relative">
                <div className="text-xs font-semibold text-dark-muted mb-4 uppercase tracking-wider">
                  ScrollWise Recommendation Logic Flow
                </div>
                
                {/* Inputs */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] text-dark-muted">Student Watched History:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">Java Meme</span>
                    <span className="px-2.5 py-1 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">Coding Interview Joke</span>
                    <span className="px-2.5 py-1 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">Dev Lifestyle Vlog</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center my-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-red-500/60 to-primary-indigo rounded-full" />
                </div>

                {/* Grok Analysis Box */}
                <div className="bg-primary-indigo/5 border border-primary-indigo/30 p-4 rounded-xl mb-6 relative">
                  <div className="absolute top-2 right-2">
                    <BrainCircuit className="w-4 h-4 text-primary-indigo animate-pulse" />
                  </div>
                  <div className="text-xs font-bold text-primary-indigo mb-1">Grok AI Semantic Inference:</div>
                  <p className="text-[11px] text-gray-300">
                    "User is interested in developer culture. Instead of another joke, recommend foundational software engineering preparation to support career entry."
                  </p>
                  <div className="mt-2 text-[10px] text-primary-cyan">
                    Inferred path: Software Engineering / Technical Career Preparation
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center my-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary-indigo to-primary-cyan rounded-full" />
                </div>

                {/* Outputs */}
                <div className="space-y-2">
                  <div className="text-[11px] text-dark-muted">Targeted Educational Recommendations:</div>
                  <div className="bg-dark-card border border-primary-cyan/30 p-3.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase text-primary-cyan bg-primary-cyan/10 px-2 py-0.5 rounded">HLD / System Design</span>
                      <span className="text-[10px] text-dark-muted">Difficulty: Intermediate</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">
                      How an API Request Flows from Browser to Database
                    </h4>
                    <p className="text-[10px] text-dark-muted">
                      Learn API gateways, load balancers, and TCP sockets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-bg border-t border-dark-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-dark-muted text-sm">
          <p>© {new Date().getFullYear()} ScrollWise. Built for technical education v2.0.</p>
        </div>
      </footer>
    </div>
  );
}
