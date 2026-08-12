import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Bell,
  ArrowRight,
  TrendingUp,
  FileText,
  Target,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  BookOpen,
  Video,
  BarChart3,
  Plus,
  Flame,
  Check,
  Menu,
  X
} from 'lucide-react';
import '../../App.css';
import './LearningPage.css';

export default function LearningPage() {
  const navigate = useNavigate();
  const [activeCourseTab, setActiveCourseTab] = useState('current');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="learning-wrapper">
      
      {/* MOBILE HAMBURGER MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="drawer-overlay">
          <div className="drawer-content">
            <div>
              <div className="drawer-header">
                <div className="drawer-brand">
                  <Sparkles size={22} color="#4f46e5" />
                  <span className="drawer-brand-title">CareerAI</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="icon-btn-clean">
                  <X size={24} color="#64748b" />
                </button>
              </div>

              <div className="drawer-links">
                <button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <BarChart3 size={18} /> Dashboard
                </button>
                <button onClick={() => { navigate('/learning'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item active">
                  <BookOpen size={18} /> Learning Path
                </button>
                <button onClick={() => { navigate('/projects'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <Award size={18} /> Projects
                </button>
                <button onClick={() => { navigate('/dashboard?tab=applications'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <Briefcase size={18} /> Applications
                </button>
                <button onClick={() => { navigate('/dashboard?tab=resume'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <FileText size={18} /> AI Resume
                </button>
                <button onClick={() => { navigate('/dashboard?tab=mock'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <Video size={18} /> Mock Interviews
                </button>
                <button onClick={() => { navigate('/dashboard?tab=roadmap'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <Award size={18} /> Career Roadmap
                </button>
              </div>
            </div>

            <button onClick={() => navigate('/')} style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* LEFT DESKTOP SIDEBAR */}
      <aside className="learning-sidebar">
        <div>
          <div onClick={() => navigate('/')} className="sidebar-logo">
            <div className="sidebar-logo-icon" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 6px 16px rgba(79, 70, 229, 0.35)' }}>
              <Sparkles size={22} />
            </div>
            <span className="sidebar-logo-title font-heading">
              code<span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ForEveryBody</span>
            </span>
          </div>

          <div className="sidebar-nav-group">
            {[
              { label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
              { label: 'Learning', icon: BookOpen, path: '/learning', active: true },
              { label: 'Projects', icon: Award, path: '/projects' },
              { label: 'Applications', icon: Briefcase, path: '/dashboard?tab=applications' },
              { label: 'Internships', icon: Target, path: '/dashboard?tab=internships' },
              { label: 'AI Resume', icon: FileText, path: '/dashboard?tab=resume' },
              { label: 'Mock Interviews', icon: Video, path: '/dashboard?tab=mock' },
              { label: 'Career Roadmap', icon: Award, path: '/dashboard?tab=roadmap' },
              { label: 'Analytics', icon: TrendingUp, path: '/dashboard?tab=skills' }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className="sidebar-nav-item"
                  style={{
                    background: item.active ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                    color: item.active ? '#4f46e5' : '#64748b',
                    fontWeight: item.active ? 700 : 600
                  }}
                >
                  <IconComp size={18} color={item.active ? '#4f46e5' : '#64748b'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Streak Card */}
        <div className="streak-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#d97706' }}>Learning Streak</span>
            <Flame size={18} color="#ea580c" fill="#ea580c" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>
            12 <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>days</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Keep it up! Consistency is key.</p>
        </div>
      </aside>

      {/* MAIN LEARNING CONTENT */}
      <main className="learning-main">
        
        {/* HEADER BAR */}
        <header className="learning-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="icon-btn-clean mobile-hamburger-btn"
              style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '10px' }}
              aria-label="Open menu"
            >
              <Menu size={20} color="#0f172a" />
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                <span>Learning</span> / <span style={{ color: '#4f46e5' }}>Data Science Path</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div className="search-input-wrap">
              <input
                type="text"
                placeholder="Search skills, courses, roadmaps..."
                className="search-input"
              />
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>

            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} color="#64748b" />
            </div>

            <div className="user-profile-bar">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Arjun"
                className="user-profile-img"
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a', lineHeight: 1.2 }}>Arjun Mehta</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Data Science Student</div>
              </div>
            </div>
          </div>
        </header>

        {/* HERO PATH BANNER */}
        <div className="hero-path-card">
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>AI Data Scientist Path</h1>
              <span style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', fontWeight: 700, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                Beginner to Advanced
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Master the skills to become a job-ready Data Scientist with this AI-powered personalized learning path.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#475569', fontWeight: 600, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} color="#4f46e5" /> 12 Modules
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={16} color="#4f46e5" /> 48 Courses
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} color="#4f46e5" /> 120+ Hours
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#16a34a" /> Certificate Included
              </div>
            </div>
          </div>

          {/* Target 3D Visual */}
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={64} color="#4f46e5" />
          </div>
        </div>

        {/* MILESTONE PROGRESS STEPPER */}
        <div className="milestones-stepper-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Overall Path Progress</span>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#4f46e5' }}>24% Completed</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ width: '24%', height: '100%', background: 'linear-gradient(90deg, #4f46e5, #7c3aed)', borderRadius: '999px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {[
              { step: 1, title: 'Foundations', sub: '12% Complete', done: true },
              { step: 2, title: 'Core Skills', sub: '35% Complete', current: true },
              { step: 3, title: 'Advanced ML', sub: '0% Complete' },
              { step: 4, title: 'Capstone Project', sub: '0% Complete' },
              { step: 5, title: 'Career Ready', sub: '0% Complete' }
            ].map((m, idx) => (
              <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: m.done ? '#16a34a' : m.current ? '#4f46e5' : '#f1f5f9',
                  color: m.done || m.current ? '#ffffff' : '#94a3b8',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem'
                }}>
                  {m.done ? <Check size={16} /> : m.step}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: m.current || m.done ? '#0f172a' : '#64748b' }}>{m.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* LOWER 2-COLUMN SECTION */}
        <div className="learning-grid-layout">
          
          {/* Left Column: Course Cards */}
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
              {['Current Courses', 'Milestones', 'Quizzes', 'Certificates'].map((t, idx) => {
                const key = t.toLowerCase().split(' ')[0];
                const isActive = activeCourseTab === key || (idx === 0 && activeCourseTab === 'current');
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCourseTab(key)}
                    className={`course-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Course List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { title: 'Python for Data Science', desc: 'Learn Python programming and essential libraries for data science.', progress: 75, lessons: '6 / 8 Lessons', status: 'In Progress', color: '#38bdf8' },
                { title: 'Data Analysis with Pandas', desc: 'Master data manipulation, cleaning, and analysis using Pandas.', progress: 40, lessons: '4 / 10 Lessons', status: 'In Progress', color: '#818cf8' },
                { title: 'SQL for Data Analysis', desc: 'Learn SQL queries, joins, aggregations, and data extraction.', progress: 20, lessons: '2 / 10 Lessons', status: 'In Progress', color: '#4f46e5' },
                { title: 'Statistics & Probability', desc: 'Understand probability, distributions, and statistical inference.', progress: 0, lessons: '0 / 12 Lessons', status: 'Not Started', color: '#94a3b8' }
              ].map((c, idx) => (
                <div key={idx} className="course-card-item">
                  <div style={{ flex: 1, paddingRight: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{c.title}</h3>
                      <span style={{ background: c.progress > 0 ? 'rgba(22,163,74,0.1)' : '#f1f5f9', color: c.progress > 0 ? '#16a34a' : '#64748b', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                        {c.status}
                      </span>
                    </div>

                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>{c.desc}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>{c.lessons}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Launching ${c.title} module`)}
                    style={{
                      background: c.progress > 0 ? '#4f46e5' : '#f1f5f9',
                      color: c.progress > 0 ? '#ffffff' : '#0f172a',
                      border: 'none',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '14px',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {c.progress > 0 ? 'Continue' : 'Start'} <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Recommendations & Milestones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Learning Progress Radial */}
            <div className="card-panel" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Your Learning Progress</h3>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#4f46e5', marginBottom: '0.2rem' }}>24%</div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>29 of 120 Lessons Completed</span>
            </div>

            {/* Recommended for You */}
            <div className="card-panel">
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Recommended for You</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { name: 'Data Visualization with Matplotlib', dur: '2.5 hrs • 4.8 ★' },
                  { name: 'Machine Learning A-Z', dur: '19 hrs • 4.7 ★' },
                  { name: 'Deep Learning with PyTorch', dur: '15 hrs • 4.9 ★' }
                ].map((rec, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '12px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{rec.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{rec.dur}</div>
                    </div>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
