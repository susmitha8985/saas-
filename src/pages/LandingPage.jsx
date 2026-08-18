/**
 * @fileoverview LandingPage — public marketing homepage.
 *
 * Accessibility improvements applied:
 * - `<main id="main-content" aria-label="ScrollWise home page">` landmark
 * - Single `<h1>` per page (WCAG 1.3.1)
 * - Decorative glow divs: `aria-hidden="true"`
 * - All lucide icons alongside text: `aria-hidden="true"`
 * - CTA links: descriptive `aria-label`
 * - Feature cards: `<article>` with heading hierarchy maintained
 * - Feature list: proper `<ul>/<li>` structure (already correct, preserved)
 * - Footer: `<footer role="contentinfo">`
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Sparkles, BrainCircuit, GraduationCap,
} from 'lucide-react';
import Navbar from '../components/Navbar';

/**
 * @typedef {Object} StepCard
 * @property {string}                   number   - Step number display.
 * @property {string}                   title    - Card heading.
 * @property {string}                   body     - Description text.
 * @property {React.ComponentType}      icon     - Lucide icon component.
 * @property {string}                   accent   - Tailwind color token (indigo/purple/cyan).
 */

/** @type {StepCard[]} */
const HOW_IT_WORKS_STEPS = [
  {
    number: '1',
    title: 'Scroll Fictional Reels',
    body: 'Watch standard tech-lifestyle vlogs, funny programming jokes, AI hype news, or gadget reviews in our student feed.',
    icon: Compass,
    accent: 'indigo',
  },
  {
    number: '2',
    title: 'Semantic Interest Analysis',
    body: "Grok AI bypasses the shallow jokes. It infers your technical experience levels, interests (like DSA, API systems, or LLMs) and career goals.",
    icon: BrainCircuit,
    accent: 'purple',
  },
  {
    number: '3',
    title: 'Practical Tech Roadmap',
    body: 'Receive educational video content mapped perfectly to your inferred interest, with explanations detailing "Why did I get this?".',
    icon: GraduationCap,
    accent: 'cyan',
  },
];

/** Color utility map to avoid repetition with Tailwind's JIT purge. */
const ACCENT_CLASSES = {
  indigo: {
    icon:   'bg-primary-indigo/10 text-primary-indigo',
    border: 'hover:border-primary-indigo/30',
    glow:   'group-hover:bg-primary-indigo/10',
    base:   'bg-primary-indigo/5',
  },
  purple: {
    icon:   'bg-primary-purple/10 text-primary-purple',
    border: 'hover:border-primary-purple/30',
    glow:   'group-hover:bg-primary-purple/10',
    base:   'bg-primary-purple/5',
  },
  cyan: {
    icon:   'bg-primary-cyan/10 text-primary-cyan',
    border: 'hover:border-primary-cyan/30',
    glow:   'group-hover:bg-primary-cyan/10',
    base:   'bg-primary-cyan/5',
  },
};

/**
 * Marketing homepage for ScrollWise.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      <main
        id="main-content"
        aria-label="ScrollWise home page"
      >

        {/* ── Hero Section ── */}
        <header
          className="relative flex-grow flex items-center justify-center overflow-hidden py-20 px-4"
          aria-label="Hero section"
        >
          {/* Decorative glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-indigo/20 rounded-full blur-3xl animate-pulse-glow" aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl animate-pulse-glow" aria-hidden="true" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
              aria-hidden="true"
            >
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
              Our Grok-powered AI agent analyses your interest patterns, then delivers actionable,
              high-quality technical recommendations—from system architecture to coding interview prep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth"
                aria-label="Get started with ScrollWise for free — create an account"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan hover:brightness-110 shadow-lg shadow-primary-indigo/25 text-white transition-all duration-300 hover:scale-[1.03] text-center"
              >
                Get Started for Free
              </Link>
              <Link
                to="/feed"
                aria-label="Explore the ScrollWise reels feed"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-base font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300 hover:scale-[1.03] text-center"
              >
                <Compass className="w-5 h-5 text-primary-cyan" aria-hidden="true" />
                <span>Explore Reels Feed</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ── How It Works Section ── */}
        <section
          className="py-20 bg-dark-bg/60 border-t border-dark-border relative"
          aria-labelledby="how-it-works-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="how-it-works-heading"
                className="text-3xl md:text-4xl font-bold font-heading mb-4"
              >
                How ScrollWise Reframes Your Focus
              </h2>
              <p className="text-dark-muted">
                We don't tell you to stop watching Reels. We just make what you watch actually work for your career.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HOW_IT_WORKS_STEPS.map((step) => {
                const ac = ACCENT_CLASSES[step.accent];
                const Icon = step.icon;
                return (
                  <article
                    key={step.number}
                    aria-label={`Step ${step.number}: ${step.title}`}
                    className={`bg-dark-card/40 border border-dark-border/60 p-8 rounded-2xl relative overflow-hidden group ${ac.border} transition-all duration-300`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${ac.base} rounded-bl-full ${ac.glow} transition-all duration-300`} aria-hidden="true" />
                    <div className={`p-3 ${ac.icon} rounded-xl w-fit mb-6`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-heading">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-dark-muted leading-relaxed text-sm">{step.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── ScrollWise Difference Section ── */}
        <section
          className="py-20 bg-dark-bg border-t border-dark-border"
          aria-labelledby="difference-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary-cyan/5 rounded-full blur-3xl" aria-hidden="true" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-xs font-bold text-primary-purple tracking-widest uppercase mb-2 block">
                    The ScrollWise Difference
                  </span>
                  <h2
                    id="difference-heading"
                    className="text-3xl md:text-4xl font-bold font-heading mb-6 leading-tight"
                  >
                    Bypassing the Hype &amp; Meme Trap
                  </h2>
                  <p className="text-dark-muted mb-6 leading-relaxed">
                    Most recommendation systems see you watch a Java meme and flood you with fifty more Java memes.
                    They optimise for shallow clicks.
                  </p>
                  <p className="text-dark-muted mb-8 leading-relaxed">
                    <strong>ScrollWise does the opposite.</strong> If you watch programmer memes and tech-vlogs,
                    Grok infers a developer career intent, filters out hype listicles, and recommends core
                    educational deep dives like:
                  </p>
                  <ul className="space-y-3.5" aria-label="Example ScrollWise recommendations">
                    {[
                      'How a backend API request flows from browser to database',
                      'What to learn for entry-level software engineering interviews',
                      'Deep dive into CPU instructions and hardware architecture',
                    ].map((item) => (
                      <li key={item} className="flex items-center space-x-3 text-sm text-gray-200">
                        <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full flex-shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendation Logic Illustration */}
                <div
                  className="bg-dark-bg/60 border border-dark-border/80 p-6 rounded-2xl shadow-2xl relative"
                  aria-label="ScrollWise recommendation logic flow diagram"
                >
                  <div className="text-xs font-semibold text-dark-muted mb-4 uppercase tracking-wider">
                    ScrollWise Recommendation Logic Flow
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] text-dark-muted">Student Watched History:</div>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Watched content examples">
                      {['Java Meme', 'Coding Interview Joke', 'Dev Lifestyle Vlog'].map((tag) => (
                        <span
                          key={tag}
                          role="listitem"
                          className="px-2.5 py-1 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center my-4" aria-hidden="true">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-red-500/60 to-primary-indigo rounded-full" />
                  </div>

                  <div className="bg-primary-indigo/5 border border-primary-indigo/30 p-4 rounded-xl mb-6 relative">
                    <div className="absolute top-2 right-2" aria-hidden="true">
                      <BrainCircuit className="w-4 h-4 text-primary-indigo animate-pulse" />
                    </div>
                    <div className="text-xs font-bold text-primary-indigo mb-1">Grok AI Semantic Inference:</div>
                    <p className="text-[11px] text-gray-300">
                      "User is interested in developer culture. Instead of another joke, recommend foundational
                      software engineering preparation to support career entry."
                    </p>
                    <div className="mt-2 text-[10px] text-primary-cyan">
                      Inferred path: Software Engineering / Technical Career Preparation
                    </div>
                  </div>

                  <div className="flex items-center justify-center my-4" aria-hidden="true">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary-indigo to-primary-cyan rounded-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] text-dark-muted">Targeted Educational Recommendations:</div>
                    <div className="bg-dark-card border border-primary-cyan/30 p-3.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase text-primary-cyan bg-primary-cyan/10 px-2 py-0.5 rounded">
                          HLD / System Design
                        </span>
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
      </main>

      {/* ── Footer ── */}
      <footer
        role="contentinfo"
        className="py-8 bg-dark-bg border-t border-dark-border mt-auto"
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-dark-muted text-sm">
          <p>© {new Date().getFullYear()} ScrollWise. Built for technical education v2.0.</p>
        </div>
      </footer>
    </div>
  );
}
