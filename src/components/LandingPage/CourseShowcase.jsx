import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';
import './CourseShowcase.css';

// ------------------------------------------------------------------
// Content — swap icons for your own thumbnail images, e.g.
// icon: <img src="/thumbs/django.png" alt="" />
// ------------------------------------------------------------------
const CATEGORIES = [
  {
    title: 'Backend Frameworks',
    label: 'Backend Frameworks',
    description:
      "Learn to design and ship production-ready APIs with Python's most in-demand frameworks — from routing and middleware to auth and testing.",
    bullets: [
      'Build REST APIs with Django & FastAPI',
      'Structure large codebases the right way',
      'Add authentication, validation & error handling',
      'Ship with confidence using automated tests',
    ],
    cards: [
      { label: 'Python', icon: '🐍' },
      { label: 'Django', icon: '🎯' },
      { label: 'Flask', icon: '🧪' },
      { label: 'Server Logic', icon: '🖥️', dark: true },
      { label: 'FastAPI', icon: '⚡' },
      { label: 'Node.js', icon: '🟢' },
    ],
  },
  {
    title: 'Database Management',
    label: 'Database Management',
    description:
      'Go from schema design to query tuning — work hands-on with the relational and NoSQL databases used in real production systems.',
    bullets: [
      'Model relational data with PostgreSQL',
      'Work with documents in MongoDB',
      'Write efficient, indexed queries',
      'Manage migrations & data integrity',
    ],
    cards: [
      { label: 'PostgreSQL', icon: '🐘' },
      { label: 'MongoDB', icon: '🍃' },
      { label: 'Redis', icon: '🔺' },
      { label: 'Query Design', icon: '🗄️', dark: true },
      { label: 'ORM', icon: '🧬' },
      { label: 'Indexing', icon: '🔍' },
    ],
  },
  {
    title: 'System Design & Scaling',
    label: 'System Design & Scaling',
    description:
      'Understand how large systems stay fast and reliable — the patterns behind apps that serve millions of users.',
    bullets: [
      'Design for horizontal scale',
      'Break monoliths into microservices',
      'Add caching & message queues',
      'Handle failure gracefully',
    ],
    cards: [
      { label: 'Load Balancing', icon: '⚖️' },
      { label: 'Microservices', icon: '🧩' },
      { label: 'Caching', icon: '🚀' },
      { label: 'Architecture', icon: '🏗️', dark: true },
      { label: 'Message Queues', icon: '📨' },
      { label: 'Scaling', icon: '📈' },
    ],
  },
  {
    title: 'Cloud Deployment',
    label: 'Cloud Deployment',
    description:
      'Take your app from localhost to production — containerize, orchestrate, and ship it with a real CI/CD pipeline.',
    bullets: [
      'Containerize apps with Docker',
      'Orchestrate with Kubernetes',
      'Automate deploys with CI/CD',
      'Monitor uptime & performance',
    ],
    cards: [
      { label: 'Docker', icon: '🐳' },
      { label: 'Kubernetes', icon: '☸️' },
      { label: 'AWS', icon: '☁️' },
      { label: 'CI/CD', icon: '🔁', dark: true },
      { label: 'Monitoring', icon: '📉' },
      { label: 'Serverless', icon: 'λ' },
    ],
  },
];

const CYCLE_MS = 3200;

export default function CourseShowcase() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(null); // category index in detail view, or null
  const intervalRef = useRef(null);

  // Auto-cycle the category headline + deck while browsing (paused in detail view)
  useEffect(() => {
    if (selected !== null) return undefined;
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % CATEGORIES.length);
    }, CYCLE_MS);
    return () => clearInterval(intervalRef.current);
  }, [selected]);

  const active = CATEGORIES[activeIndex];
  const detail = selected !== null ? CATEGORIES[selected] : null;

  // Flat overlapping stack: cards sit upright with a small consistent
  // overlap, later cards on top, staggered fly-in left → right.
  const cardTransform = (i) => ({
    '--delay': `${i * 130}ms`,
    zIndex: i,
  });

  return (
    <div className="cs-root">
      <div className="cs-grid-bg" />

      {/* Prominent Visible Navigation Bar */}
      <nav className="cs-nav">
        <div className="cs-logo" onClick={() => setSelected(null)} style={{ cursor: 'pointer' }}>
          <div className="cs-brand-badge">
            <Zap size={18} color="#ffffff" />
          </div>
          <span className="cs-brand-name">codeForEveryBody</span>
          <span className="cs-brand-sub">— Learn & Ship Software</span>
        </div>

        <div className="cs-nav-links">
          <a href="#courses" className={selected === null ? 'active' : ''} onClick={(e) => { e.preventDefault(); setSelected(null); }}>
            <BookOpen size={15} style={{ marginRight: 6 }} />
            Courses
          </a>
          <a href="#paths" onClick={(e) => { e.preventDefault(); navigate('/overview'); }}>
            <Layers size={15} style={{ marginRight: 6 }} />
            Career Paths
          </a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); }}>
            <Sparkles size={15} style={{ marginRight: 6 }} />
            Projects
          </a>
          <a href="#tools" onClick={(e) => { e.preventDefault(); navigate('/roadmap'); }}>
            Roadmaps
          </a>
        </div>

        <div className="cs-nav-actions">
          <button className="cs-signin-btn" onClick={() => navigate('/auth?mode=signin')}>
            Log In
          </button>
          <button className="cs-cta-btn" onClick={() => navigate('/auth?mode=signup')}>
            Get Started Free <ArrowRight size={14} style={{ marginLeft: 4 }} />
          </button>
        </div>
      </nav>

      <main className="cs-hero">
        {!detail ? (
          <>
            <h1 key={activeIndex} className="cs-title">{active.title}</h1>

            <div className="cs-deck" key={`deck-${activeIndex}`}>
              {active.cards.map((card, i) => (
                <button
                  key={card.label}
                  type="button"
                  className={`cs-card${card.dark ? ' is-dark' : ''}`}
                  style={cardTransform(i)}
                  onClick={() => setSelected(activeIndex)}
                >
                  <span className="cs-card-icon">{card.icon}</span>
                  <span className="cs-card-label">{card.label}</span>
                </button>
              ))}
            </div>

            <p key={`caption-${activeIndex}`} className="cs-caption">{active.label}</p>
          </>
        ) : (
          <div className="cs-detail">
            <div className="cs-detail-info">
              <button type="button" className="cs-back" onClick={() => setSelected(null)}>
                ← Back
              </button>
              <h2>{detail.title} Course</h2>
              <div className="cs-tags">
                {detail.cards.slice(0, 3).map((c) => (
                  <span key={c.label} className="cs-tag">{c.label}</span>
                ))}
              </div>
              <p className="cs-detail-desc">{detail.description}</p>
              <ul className="cs-detail-list">
                {detail.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <a href="#enroll" className="cs-see-course" onClick={(e) => { e.preventDefault(); navigate('/auth'); }}>
                Enroll Now ↗
              </a>
            </div>

            <div className="cs-detail-gallery">
              {detail.cards.map((card, i) => (
                <div
                  key={card.label}
                  className={`cs-gallery-card${card.dark ? ' is-dark' : ''}`}
                  style={{ '--i': i, '--delay': `${i * 60}ms` }}
                >
                  <span className="cs-card-icon large">{card.icon}</span>
                  <span className="cs-card-label">{card.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="cs-sparkle" aria-hidden="true">✦</div>
      </main>

      <footer className="cs-footer">
        <div className="cs-socials">
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">X</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>
        <div className="cs-footer-note">Crafted for learners, everywhere • codeForEveryBody</div>
      </footer>
    </div>
  );
}
