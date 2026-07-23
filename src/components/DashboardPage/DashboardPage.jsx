import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  FileText,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Video,
  BarChart3,
  FolderKanban,
  Settings,
  Check
} from 'lucide-react';
import '../../App.css';
import './DashboardPage.css';

// User Role Theme Colors Configuration
const ROLE_THEMES = {
  Student: {
    name: 'Student',
    accent: '#4f46e5',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    softBg: 'rgba(79, 70, 229, 0.08)',
    border: 'rgba(79, 70, 229, 0.2)',
    badgeText: '🎓 Student View',
    primaryCta: '⚡ Start Mock Interview'
  },
  Recruiter: {
    name: 'Recruiter',
    accent: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
    softBg: 'rgba(5, 150, 105, 0.08)',
    border: 'rgba(5, 150, 105, 0.2)',
    badgeText: '💼 Recruiter View',
    primaryCta: '🔍 Post New Job / Internship'
  },
  Mentor: {
    name: 'Mentor',
    accent: '#d97706',
    gradient: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
    softBg: 'rgba(217, 119, 6, 0.08)',
    border: 'rgba(217, 119, 6, 0.2)',
    badgeText: '🧭 Mentor View',
    primaryCta: '📅 Schedule Mentorship Slot'
  },
  Admin: {
    name: 'Admin',
    accent: '#e11d48',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #c026d3 100%)',
    softBg: 'rgba(225, 29, 72, 0.08)',
    border: 'rgba(225, 29, 72, 0.2)',
    badgeText: '⚙️ Admin View',
    primaryCta: '📊 View Platform Analytics'
  }
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Student');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'applications' | 'skills'
  const [toast, setToast] = useState(null);

  const theme = ROLE_THEMES[selectedRole];

  const handleRoleChange = (role) => {
    setIsLoading(true);
    setSelectedRole(role);
    setTimeout(() => setIsLoading(false), 400);
  };

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* Toast Notification */}
      {toast && (
        <div className="dashboard-toast">
          <Sparkles size={18} color="#38bdf8" />
          <span>{toast}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="dashboard-sidebar">
        <div>
          {/* Logo */}
          <div onClick={() => navigate('/')} className="sidebar-logo">
            <div className="sidebar-logo-icon" style={{ background: theme.gradient, boxShadow: `0 6px 16px ${theme.border}` }}>
              <Sparkles size={22} />
            </div>
            <span className="sidebar-logo-title">
              Career<span style={{ color: theme.accent }}>AI</span>
            </span>
          </div>

          {/* Nav Items */}
          <div className="sidebar-nav-group">
            {[
              { id: 'overview', label: 'Dashboard', icon: BarChart3 },
              { id: 'learning', label: 'Learning Path', icon: BookOpen, path: '/learning' },
              { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects' },
              { id: 'applications', label: 'Applications', icon: Briefcase },
              { id: 'internships', label: 'Internships', icon: Target },
              { id: 'resume', label: 'AI Resume', icon: FileText },
              { id: 'mock', label: 'Mock Interviews', icon: Video },
              { id: 'roadmap', label: 'Career Roadmap', icon: Award },
              { id: 'skills', label: 'Skill Progress', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className="sidebar-nav-item"
                  style={{
                    background: isActive ? theme.softBg : 'transparent',
                    color: isActive ? theme.accent : '#64748b',
                    fontWeight: isActive ? 700 : 600
                  }}
                >
                  <IconComp size={18} color={isActive ? theme.accent : '#64748b'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pro Banner Upgrade */}
        <div className="sidebar-upgrade-box" style={{ background: theme.softBg, border: `1px solid ${theme.border}` }}>
          <div className="upgrade-box-title">
            Upgrade to Pro
          </div>
          <p className="upgrade-box-desc">
            Unlock unlimited AI resume scans and 1-on-1 interview practice.
          </p>
          <button
            onClick={() => showNotification('Upgrading to Pro tier...')}
            className="upgrade-box-btn"
            style={{ background: theme.gradient }}
          >
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        
        {/* TOP HEADER BAR */}
        <header className="dashboard-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.2rem' }}>
              <h1 className="dashboard-title-heading">
                Welcome back, Arjun! 👋
              </h1>
              <span className="role-badge-pill" style={{ background: theme.softBg, border: `1px solid ${theme.border}`, color: theme.accent }}>
                {theme.badgeText}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
              Track your progress, improve your skills, and land your dream career.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Search Bar */}
            <div className="search-input-wrap">
              <input
                type="text"
                placeholder="Search internships, skills, companies..."
                className="search-input"
              />
              <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>

            {/* ROLE SWITCHER SELECTOR */}
            <div className="role-select-wrap">
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Role:</span>
              <select
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="role-select"
                style={{ color: theme.accent }}
              >
                <option value="Student">🎓 Student</option>
                <option value="Recruiter">💼 Recruiter</option>
                <option value="Mentor">🧭 Mentor</option>
                <option value="Admin">⚙️ Admin</option>
              </select>
            </div>

            {/* User Profile */}
            <div className="user-profile-bar">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Arjun"
                className="user-profile-img"
                style={{ border: `2px solid ${theme.accent}` }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.2 }}>Arjun Mehta</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Data Science</span>
              </div>
            </div>
          </div>
        </header>

        {/* LOADING SKELETON ANIMATION STATE */}
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ height: '140px', background: '#ffffff', borderRadius: '20px' }} className="animate-pulse-glow" />
            <div style={{ height: '240px', background: '#ffffff', borderRadius: '20px' }} className="animate-pulse-glow" />
          </div>
        ) : (
          <>
            {/* PRIMARY CTA BANNER */}
            <div className="cta-banner" style={{ background: theme.gradient, boxShadow: `0 15px 35px -5px ${theme.border}` }}>
              <div>
                <span className="cta-tag-pill">
                  <Sparkles size={14} /> Priority Action Suggested
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.3rem' }}>
                  {selectedRole === 'Student' && 'Your AI Mock Interview is Ready to Begin'}
                  {selectedRole === 'Recruiter' && 'Review 12 New Verified Candidate Profiles'}
                  {selectedRole === 'Mentor' && '3 Mentorship Requests Awaiting Approval'}
                  {selectedRole === 'Admin' && 'System Performance & Security Check Required'}
                </h2>
                <p style={{ opacity: 0.9, fontSize: '0.925rem' }}>
                  {selectedRole === 'Student' && 'Practice technical & behavioral questions with instant automated AI score analysis.'}
                  {selectedRole === 'Recruiter' && 'Candidates match your Data Science & Software Engineer opening parameters.'}
                  {selectedRole === 'Mentor' && 'Help students refine their career roadmaps and technical portfolio.'}
                  {selectedRole === 'Admin' && 'All platform services operational. Audit log summary ready.'}
                </p>
              </div>

              <button
                onClick={() => showNotification(`Executing action: ${theme.primaryCta}`)}
                className="cta-banner-btn"
                style={{ color: theme.accent }}
              >
                {theme.primaryCta} <ArrowRight size={18} />
              </button>
            </div>

            {/* UNCLUTTERED 4 CORE SCORE CARDS */}
            <div className="stats-grid">
              
              {/* Card 1: Readiness Score */}
              <div className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Career Readiness Score</span>
                  <div className="stat-icon-square" style={{ background: theme.softBg, color: theme.accent }}>
                    <Award size={16} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>78</span>
                  <span style={{ fontSize: '0.925rem', color: '#94a3b8' }}>/100</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a', marginLeft: 'auto' }}>+12% vs last mo</span>
                </div>

                {/* Animated Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                  <div style={{ width: '78%', height: '100%', background: theme.gradient, borderRadius: '999px' }} />
                </div>
              </div>

              {/* Card 2: AI Resume Score */}
              <div className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>AI Resume Score</span>
                  <div className="stat-icon-square" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
                    <FileText size={16} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>92</span>
                  <span style={{ fontSize: '0.925rem', color: '#94a3b8' }}>/100</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#7c3aed', marginLeft: 'auto' }}>ATS Ready</span>
                </div>

                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                  <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Card 3: Internship Match */}
              <div className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Internship Match</span>
                  <div className="stat-icon-square" style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a' }}>
                    <Target size={16} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>89%</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a', marginLeft: 'auto' }}>12 New Matches</span>
                </div>

                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                  <div style={{ width: '89%', height: '100%', background: 'linear-gradient(90deg, #16a34a, #22c55e)', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Card 4: Skill Progress */}
              <div className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Skill Progress</span>
                  <div className="stat-icon-square" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                    <TrendingUp size={16} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>68%</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginLeft: 'auto' }}>4/6 Modules</span>
                </div>

                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                  <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '999px' }} />
                </div>
              </div>

            </div>

            {/* LOWER CONTENT GRID: REFINED 2-COLUMN VIEW */}
            <div className="dashboard-lower-grid">
              
              {/* Left Column: Applications & Recommendations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Recent Applications */}
                <div className="card-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Recent Applications</h3>
                    <button onClick={() => setActiveTab('applications')} style={{ background: 'none', border: 'none', color: theme.accent, fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
                      View All
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {[
                      { role: 'Data Science Intern', company: 'Google', status: 'Interview Scheduled', date: 'May 24, 2026', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)' },
                      { role: 'ML Engineer Intern', company: 'Microsoft', status: 'Under Review', date: 'May 20, 2026', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
                      { role: 'Data Analyst Intern', company: 'Deloitte', status: 'Application Submitted', date: 'May 15, 2026', color: '#64748b', bg: '#f1f5f9' }
                    ].map((app, idx) => (
                      <div key={idx} className="app-item-row">
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{app.role}</div>
                          <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.15rem' }}>{app.company} • Applied {app.date}</div>
                        </div>

                        <span style={{
                          background: app.bg,
                          color: app.color,
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px'
                        }}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="card-panel">
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                    AI Recommendations
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '16px', background: '#f8fafc', borderLeft: `4px solid ${theme.accent}` }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Improve your SQL skills</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.15rem' }}>Recommended based on your target role</div>
                      </div>
                      <span style={{ background: theme.softBg, color: theme.accent, fontWeight: 700, fontSize: '0.8rem', padding: '0.25rem 0.65rem', borderRadius: '8px' }}>High Impact</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '16px', background: '#f8fafc', borderLeft: '4px solid #7c3aed' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Build a Machine Learning project</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.15rem' }}>Top skill to boost profile matching by +15%</div>
                      </div>
                      <span style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', padding: '0.25rem 0.65rem', borderRadius: '8px' }}>Recommended</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Daily Checklist & Notifications */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Daily Checklist Tasks */}
                <div className="card-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Daily Tasks</h3>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: theme.accent }}>4/6 Completed</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { text: 'Complete Python Module', done: true },
                      { text: 'Apply to 3 Internships', done: true },
                      { text: 'Take SQL Assessment', done: false },
                      { text: 'Update AI Resume', done: true },
                      { text: 'Attend Mock Interview', done: false },
                      { text: 'Build Project Portfolio', done: true }
                    ].map((task, idx) => (
                      <label
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.925rem',
                          color: task.done ? '#94a3b8' : '#0f172a',
                          textDecoration: task.done ? 'line-through' : 'none',
                          cursor: 'pointer',
                          padding: '0.4rem 0'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          background: task.done ? theme.accent : '#ffffff',
                          border: task.done ? 'none' : '2px solid #cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}>
                          {task.done && <Check size={14} />}
                        </div>
                        <span style={{ fontWeight: 600 }}>{task.text}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="card-panel">
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                    Notifications
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                      <span>You have a new internship match from Google!</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
                      <span>Your resume was viewed by Microsoft recruiters.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                      <span>Mock interview feedback is ready for review.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
