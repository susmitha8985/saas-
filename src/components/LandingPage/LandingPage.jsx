import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Play,
  Star,
  FileText,
  Briefcase,
  TrendingUp,
  Award,
  Video,
  ChevronDown,
  ChevronUp,
  Target,
  GraduationCap,
  Search,
  Bell,
  Send,
  LayoutDashboard,
  BookOpen,
  PieChart,
  Settings,
  Menu,
  X
} from 'lucide-react';
import '../../App.css';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert(`Thank you for subscribing with ${newsletterEmail}!`);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="landing-wrapper">
      
      {/* HAMBURGER DRAWER */}
      {isMenuOpen && (
        <div className="drawer-overlay">
          <div className="drawer-content">
            <div>
              <div className="drawer-header">
                <div className="drawer-brand">
                  <Sparkles size={22} color="#4f46e5" />
                  <span className="drawer-brand-title">CareerAI</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="icon-btn-clean">
                  <X size={24} color="#64748b" />
                </button>
              </div>

              <div className="drawer-links">
                <button onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }} className="drawer-link-btn">
                  📊 Dashboard
                </button>
                <button onClick={() => { navigate('/learning'); setIsMenuOpen(false); }} className="drawer-link-btn active">
                  🎓 Learning Path
                </button>
                <button onClick={() => { navigate('/auth?mode=signin'); setIsMenuOpen(false); }} className="drawer-link-btn">
                  💼 Sign In / Sign Up
                </button>
              </div>
            </div>

            <button onClick={() => navigate('/auth?mode=signup')} className="gradient-btn" style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', fontSize: '0.9rem' }}>
              Get Started Free <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 1. TOP NAVBAR */}
      <nav className="landing-navbar">
        {/* Brand Logo & Mobile Hamburger */}
        <div className="nav-brand-group">
          <button onClick={() => setIsMenuOpen(true)} className="icon-btn-clean mobile-hamburger-btn" aria-label="Open mobile menu">
            <Menu size={22} color="#0f172a" />
          </button>

          <div onClick={() => navigate('/')} className="nav-brand-logo">
            <div className="nav-logo-icon">
              <Sparkles size={20} />
            </div>
            <span className="nav-brand-title">
              Career<span style={{ color: '#4f46e5' }}>AI</span>
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="nav-center-links">
          <button onClick={() => navigate('/overview')} className="nav-btn-link">Overview</button>
          <button onClick={() => navigate('/dashboard')} className="nav-btn-link">Dashboard</button>
          <button onClick={() => navigate('/learning')} className="nav-btn-link nav-btn-active">Learning</button>
          <a href="#features" className="nav-anchor-link">Features</a>
          <a href="#pricing" className="nav-anchor-link">Pricing</a>
          <a href="#faq" className="nav-anchor-link">FAQ</a>
        </div>

        {/* Auth Actions */}
        <div className="nav-auth-actions">
          <button
            type="button"
            onClick={() => navigate('/auth?mode=signin')}
            className="nav-btn-link"
            style={{ fontWeight: 700 }}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => navigate('/auth?mode=signup')}
            className="gradient-btn"
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              boxShadow: '0 8px 20px -4px rgba(79, 70, 229, 0.4)'
            }}
          >
            Sign Up <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-grid">
          
          {/* Left Hero Column */}
          <div className="hero-col-left">
            <div className="badge-tag-pill">
              <Sparkles size={15} /> AI-Powered Career Platform for the Future
            </div>

            <h1 className="hero-heading">
              Launch Your <br />
              AI Career with <br />
              <span className="hero-heading-gradient">Confidence</span>
            </h1>

            <p className="hero-subtext">
              From AI resume reviews to perfect internship matches, CareerAI gives you everything you need to learn, grow, and land the right opportunity—faster.
            </p>

            <div className="hero-action-row">
              <button
                type="button"
                onClick={() => navigate('/auth?mode=signup')}
                className="gradient-btn"
                style={{ padding: '0.95rem 1.8rem', borderRadius: '16px', fontSize: '1rem' }}
              >
                Get Started Free <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => alert('Launching CareerAI Demo!')}
                className="demo-play-btn"
              >
                <div className="demo-icon-circle">
                  <Play size={12} fill="#0f172a" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="social-proof-wrap">
              <div className="avatar-stack">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces'
                ].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Avatar"
                    className="avatar-img"
                    style={{ marginLeft: idx > 0 ? '-10px' : '0' }}
                  />
                ))}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', color: '#f59e0b' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" />)}
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  Trusted by 25,000+ students and professionals
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual 3D Robot & Badges */}
          <div className="hero-col-right">
            <div className="hero-glow-bg animate-pulse-glow" />

            <div style={{ position: 'relative', zIndex: 1 }} className="animate-float">
              <svg width="280" height="280" viewBox="0 0 200 200" fill="none">
                <ellipse cx="100" cy="175" rx="75" ry="18" fill="url(#pGrad)" opacity="0.9" />
                <rect x="68" y="105" width="64" height="52" rx="26" fill="url(#bBody)" />
                <rect x="74" y="112" width="52" height="38" rx="19" fill="#ffffff" opacity="0.95" />
                <circle cx="100" cy="131" r="8" fill="url(#cGlow)" />
                <rect x="60" y="55" width="80" height="58" rx="29" fill="url(#bHead)" />
                <rect x="68" y="63" width="64" height="42" rx="21" fill="#0f172a" />
                <ellipse cx="84" cy="84" rx="7" ry="9" fill="#38bdf8" />
                <ellipse cx="116" cy="84" rx="7" ry="9" fill="#38bdf8" />
                <circle cx="86" cy="82" r="2.5" fill="#ffffff" />
                <circle cx="118" cy="82" r="2.5" fill="#ffffff" />
                <circle cx="56" cy="84" r="7" fill="#818cf8" />
                <circle cx="144" cy="84" r="7" fill="#818cf8" />
                <circle cx="100" cy="48" r="6" fill="#38bdf8" />
                <line x1="100" y1="54" x2="100" y2="48" stroke="#818cf8" strokeWidth="3" />
                <rect x="42" y="115" width="18" height="32" rx="9" fill="url(#bHead)" />
                <rect x="140" y="115" width="18" height="32" rx="9" fill="url(#bHead)" />
                <defs>
                  <linearGradient id="pGrad" x1="25" y1="175" x2="175" y2="175"><stop stopColor="#e0e7ff"/><stop offset="1" stopColor="#c7d2fe"/></linearGradient>
                  <linearGradient id="bHead" x1="60" y1="55" x2="140" y2="113"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#c7d2fe"/></linearGradient>
                  <linearGradient id="bBody" x1="68" y1="105" x2="132" y2="157"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#4f46e5"/></linearGradient>
                  <linearGradient id="cGlow" x1="92" y1="123" x2="108" y2="139"><stop stopColor="#38bdf8"/><stop offset="1" stopColor="#818cf8"/></linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating Glass Badges */}
            <div className="glass-badge-card animate-float-reverse" style={{ position: 'absolute', top: '4%', left: '4%', zIndex: 2 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block' }}>AI Resume Score</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>92<span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/100</span></span>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed' }}>Excellent</div>
            </div>

            <div className="glass-badge-card animate-float" style={{ position: 'absolute', top: '8%', right: '2%', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block' }}>Internship Match</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>98%</span>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>Top Match</div>
              </div>
              <svg width="34" height="34" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="98, 100" />
              </svg>
            </div>

            <div className="glass-badge-card" style={{ position: 'absolute', bottom: '22%', left: '0%', zIndex: 2 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block' }}>Skill Progress</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>78%</span>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6' }}>Keep it up!</div>
            </div>

            <div className="glass-badge-card animate-float-reverse" style={{ position: 'absolute', bottom: '30%', right: '-4%', zIndex: 2 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block' }}>Mock Interview</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>4.8<span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/5</span></span>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8b5cf6' }}>Great Performance</div>
            </div>

            <div className="glass-badge-card" style={{ position: 'absolute', bottom: '2%', right: '8%', zIndex: 2 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block' }}>Career Roadmap</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Next: Data Scientist</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE COMPANION SECTION ("Everything You Need") */}
      <section id="features" className="features-section">
        <div className="section-title-wrap">
          <div className="badge-tag-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} /> Everything You Need
          </div>
          <h2 className="section-main-title">
            Your All-in-One <span style={{ color: '#4f46e5' }}>AI Career</span> Companion
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            Powerful AI tools and resources designed to help you find opportunities, build skills, and achieve your dream career.
          </p>
        </div>

        <div className="feature-cards-grid">
          {[
            {
              icon: FileText,
              color: '#4f46e5',
              bg: '#e0e7ff',
              title: 'AI Resume Analyzer',
              desc: 'Get AI-powered feedback and improve your resume for ATS success.'
            },
            {
              icon: Target,
              color: '#3b82f6',
              bg: '#dbeafe',
              title: 'Smart Internship Match',
              desc: 'Find the best internships matched to your skills and interests.'
            },
            {
              icon: TrendingUp,
              color: '#8b5cf6',
              bg: '#f3e8ff',
              title: 'Skill Gap Detector',
              desc: 'Identify skill gaps and get personalized learning recommendations.'
            },
            {
              icon: Award,
              color: '#0284c7',
              bg: '#e0f2fe',
              title: 'Career Roadmap',
              desc: 'Get a personalized plan to reach your career goals faster.'
            },
            {
              icon: Video,
              color: '#4f46e5',
              bg: '#e0e7ff',
              title: 'Mock Interviews',
              desc: 'Practice with AI interviews and get smart, actionable feedback.'
            },
            {
              icon: GraduationCap,
              color: '#7c3aed',
              bg: '#ede9fe',
              title: 'AI Learning Path',
              desc: 'Personalized courses and resources tailored just for you.'
            }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-icon-badge" style={{ background: item.bg, color: item.color }}>
                  <IconComp size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TRUSTED COMPANIES LOGO BAR */}
      <section style={{ maxWidth: '1280px', margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <div className="badge-tag-pill" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} /> Trusted by Top Companies
        </div>

        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '2.5rem' }}>
          Leading Companies Trust CareerAI
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2.5rem 3.5rem' }}>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#4285F4' }}>Google</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#00a4ef' }}>Microsoft</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ff9900' }}>amazon</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#FF0000' }}>Adobe</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#86BC25' }}>Deloitte.</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#76B900' }}>NVIDIA</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#003087' }}>PayPal</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1F4E79' }}>TCS</span>
        </div>
      </section>

      {/* 5. PLATFORM PREVIEW DASHBOARD MOCKUP */}
      <section id="preview" style={{ maxWidth: '1280px', margin: '6rem auto', padding: '0 1.5rem' }}>
        <div className="section-title-wrap">
          <div className="badge-tag-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} /> Platform Preview
          </div>

          <h2 className="section-main-title">
            A Smarter Way to Build Your Career
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Everything in one place to discover, learn, and grow with AI.
          </p>
        </div>

        {/* Mock UI Card Container */}
        <div className="preview-card-container">
          {/* Mock Sidebar */}
          <div className="mock-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#818cf8" />
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>CareerAI</span>
            </div>

            <div className="mock-sidebar-menu">
              <div className="mock-menu-item active">
                <LayoutDashboard size={16} /> Dashboard
              </div>
              <div className="mock-menu-item">
                <Briefcase size={16} /> Applications
              </div>
              <div className="mock-menu-item">
                <Target size={16} /> Internships
              </div>
              <div className="mock-menu-item">
                <FileText size={16} /> AI Resume
              </div>
              <div className="mock-menu-item">
                <BookOpen size={16} /> Learning
              </div>
              <div className="mock-menu-item">
                <Video size={16} /> Mock Interview
              </div>
              <div className="mock-menu-item">
                <Award size={16} /> Career Roadmap
              </div>
              <div className="mock-menu-item">
                <PieChart size={16} /> Analytics
              </div>
              <div className="mock-menu-item">
                <Settings size={16} /> Settings
              </div>
            </div>
          </div>

          {/* Mock Main Dashboard Body */}
          <div className="mock-main-body">
            {/* Mock Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Welcome back, Arjun! 👋</h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Here's your career progress overview for this week.</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search internships, skills, companies..."
                    readOnly
                    style={{ padding: '0.5rem 1rem 0.5rem 2.2rem', borderRadius: '999px', border: '1px solid #cbd5e1', fontSize: '0.8rem', width: '240px', background: '#fff' }}
                  />
                  <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bell size={16} color="#64748b" />
                </div>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces"
                  alt="User"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Dashboard Top Widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#fff', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Internship Match Score</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>96%</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22c55e' }}>Excellent Match</div>
              </div>

              <div style={{ background: '#fff', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Resume ATS Score</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>92<span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/100</span></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5' }}>Top 5% Applicants</div>
              </div>

              <div style={{ background: '#fff', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Skills Progress</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                  <div>Python: <strong>90%</strong></div>
                  <div>ML: <strong>75%</strong></div>
                  <div>SQL: <strong>65%</strong></div>
                  <div>Data Analysis: <strong>55%</strong></div>
                </div>
              </div>
            </div>

            {/* Dashboard Lower Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#fff', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>Weekly Applications</h4>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.8rem', height: '100px', padding: '0.5rem 0' }}>
                  {[40, 65, 80, 50, 95, 70, 85].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                      <div style={{ width: '100%', height: `${h}%`, background: 'linear-gradient(180deg, #4f46e5 0%, #818cf8 100%)', borderRadius: '6px' }} />
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{['M','T','W','T','F','S','S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>Upcoming Interviews</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
                  <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '10px', borderLeft: '3px solid #4f46e5' }}>
                    <div style={{ fontWeight: 700 }}>Data Scientist Intern</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Google • May 25, 10:00 AM</div>
                  </div>
                  <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '10px', borderLeft: '3px solid #3b82f6' }}>
                    <div style={{ fontWeight: 700 }}>ML Engineer Intern</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Microsoft • May 28, 02:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION ("Real Stories") */}
      <section id="testimonials" style={{ maxWidth: '1280px', margin: '6rem auto', padding: '0 1.5rem' }}>
        <div className="section-title-wrap">
          <div className="badge-tag-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} /> Loved by Learners
          </div>

          <h2 className="section-main-title">
            Real Stories from CareerAI Users
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {[
            {
              quote: '"CareerAI helped me improve my resume and land an internship at my dream company!"',
              name: 'Riya Sharma',
              role: 'Data Science Intern @ Google',
              img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces'
            },
            {
              quote: '"The AI mock interviews gave me confidence and the roadmap kept me on track."',
              name: 'Arjun Mehta',
              role: 'ML Intern @ Microsoft',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces'
            },
            {
              quote: '"Best platform for students to grow, learn, and get noticed by top companies."',
              name: 'Sneha P.',
              role: 'Software Intern @ Amazon',
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces'
            }
          ].map((story, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ fontSize: '1rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {story.quote}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <img
                  src={story.img}
                  alt={story.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{story.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: 600 }}>{story.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRICING SECTION ("Simple & Transparent") */}
      <section id="pricing" style={{ maxWidth: '1280px', margin: '6rem auto', padding: '0 1.5rem' }}>
        <div className="section-title-wrap">
          <div className="badge-tag-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} /> Simple &amp; Transparent
          </div>

          <h2 className="section-main-title">
            Choose the Plan That's Right for You
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Start free and upgrade anytime. Cancel anytime.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Free</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>Your starter with basic features.</span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              ₹0 <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>forever</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#475569', marginBottom: '2rem' }}>
              <div>✓ Resume Analysis (3/month)</div>
              <div>✓ Limited Internship Matches</div>
              <div>✓ Basic Learning Access</div>
            </div>
            <button type="button" onClick={() => navigate('/auth?mode=signup')} style={{ marginTop: 'auto', background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '0.85rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Get Started
            </button>
          </div>

          {/* Pro (Highlighted) */}
          <div className="pricing-card pro">
            <span className="pricing-card-badge">
              Most Popular
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Pro</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>Perfect for serious learners.</span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              ₹499 <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>/month</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#475569', marginBottom: '2rem' }}>
              <div>✓ Unlimited AI Resume Analysis</div>
              <div>✓ Smart Internship Match</div>
              <div>✓ Skill Gap Detection</div>
              <div>✓ Mock Interviews</div>
              <div>✓ Priority Support</div>
            </div>
            <button type="button" onClick={() => navigate('/auth?mode=signup')} className="gradient-btn" style={{ marginTop: 'auto', padding: '0.85rem', borderRadius: '12px', fontSize: '0.9rem' }}>
              Choose Pro
            </button>
          </div>

          {/* Team */}
          <div className="pricing-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Team</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>For groups and communities.</span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              ₹1,999 <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>/month</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#475569', marginBottom: '2rem' }}>
              <div>✓ Everything in Pro</div>
              <div>✓ Team Dashboard</div>
              <div>✓ Bulk Resume Analysis</div>
              <div>✓ Admin Controls</div>
            </div>
            <button type="button" onClick={() => navigate('/auth?mode=signup')} style={{ marginTop: 'auto', background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '0.85rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Choose Team
            </button>
          </div>

          {/* Enterprise */}
          <div className="pricing-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Enterprise</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>For organizations and campuses.</span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              Custom <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>/year</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#475569', marginBottom: '2rem' }}>
              <div>✓ Everything in Team</div>
              <div>✓ Custom Integrations</div>
              <div>✓ Dedicated Support</div>
              <div>✓ Advanced Analytics</div>
            </div>
            <button type="button" onClick={() => alert('Contacting Sales Team!')} style={{ marginTop: 'auto', background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.85rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section id="faq" style={{ maxWidth: '1280px', margin: '6rem auto', padding: '0 1.5rem' }}>
        <div className="section-title-wrap">
          <div className="badge-tag-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} /> Frequently Asked
          </div>

          <h2 className="section-main-title">
            Answers to Common Questions
          </h2>
        </div>

        <div className="faq-grid">
          {[
            { q: 'What is CareerAI?', a: 'CareerAI is an all-in-one platform using artificial intelligence to optimize your resume, match you with top internships, provide mock interview feedback, and create personalized career roadmaps.' },
            { q: 'Is CareerAI free to use?', a: 'Yes! We offer a perpetual Free tier that includes resume analysis, basic internship matching, and learning roadmaps. You can upgrade to Pro for unlimited features.' },
            { q: 'How does the AI resume analysis work?', a: 'Our AI engine scans your resume against thousands of active job descriptions and ATS systems to evaluate formatting, keyword matches, and impact statements.' },
            { q: 'How are internships matched?', a: 'We analyze your current skills, target role, education, and preferences to automatically compute match percentages for curated internships.' },
            { q: 'Can I track my application status?', a: 'Yes, CareerAI provides a unified dashboard where you can track sent applications, interview invitations, and status updates.' },
            { q: 'Is my data secure with CareerAI?', a: 'Absolutely. We use enterprise-grade encryption and privacy controls. Your personal data is never sold or shared without your explicit consent.' }
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => toggleFaq(idx)}
                className="faq-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="#4f46e5" /> : <ChevronDown size={18} color="#94a3b8" />}
                </div>
                {isOpen && (
                  <p style={{ marginTop: '0.8rem', color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <Sparkles size={20} color="#4f46e5" />
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>CareerAI</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Your AI-powered partner for career growth, learning, and opportunities.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', color: '#64748b' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#64748b' }}>
              <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Features</a>
              <a href="#preview" style={{ textDecoration: 'none', color: 'inherit' }}>Internships</a>
              <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>AI Resume</a>
              <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Career Roadmap</a>
              <a href="#pricing" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#64748b' }}>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</a>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Guides</a>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Webinars</a>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Help Center</a>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Changelog</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#64748b' }}>
              <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a>
              <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Careers</a>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a>
              <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Terms of Service</a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div style={{ gridColumn: 'span 1' }}>
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.6rem' }}>Subscribe to our newsletter</h4>
            <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.8rem', lineHeight: 1.4 }}>
              Get the latest updates and opportunities delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="footer-input"
              />
              <button
                type="submit"
                className="footer-submit-btn"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '2.5rem auto 0', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
          &copy; 2026 CareerAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
