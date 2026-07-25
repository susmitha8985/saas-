import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  Check,
  Menu,
  X,
  Plus,
  Upload,
  Play,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Bell,
  User,
  Trash2,
  RefreshCw,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import ResumeBuilderPage from '../ResumeBuilderPage/ResumeBuilderPage';
import MockInterviewPage from '../MockInterviewPage/MockInterviewPage';
import CareerRoadmapPage from '../CareerRoadmapPage/CareerRoadmapPage';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState('Student');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Synchronize tab query param with state
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

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

  const handleTabChange = (tabId, path) => {
    if (path) {
      navigate(path);
    } else {
      setActiveTab(tabId);
      setSearchParams({ tab: tabId });
    }
    setIsMobileMenuOpen(false);
  };

  // State data for functional views
  const [applications, setApplications] = useState([
    { id: 1, role: 'Data Science Intern', company: 'Google', location: 'Mountain View, CA', status: 'Interview Scheduled', date: 'May 24, 2026', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)' },
    { id: 2, role: 'ML Engineer Intern', company: 'Microsoft', location: 'Redmond, WA', status: 'Under Review', date: 'May 20, 2026', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { id: 3, role: 'Data Analyst Intern', company: 'Deloitte', location: 'New York, NY', status: 'Application Submitted', date: 'May 15, 2026', color: '#64748b', bg: '#f1f5f9' },
    { id: 4, role: 'AI Research Assistant', company: 'OpenAI', location: 'San Francisco, CA', status: 'Interview Scheduled', date: 'May 10, 2026', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)' },
    { id: 5, role: 'Business Intelligence Intern', company: 'Amazon', location: 'Seattle, WA', status: 'Offer Received', date: 'May 02, 2026', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.1)' }
  ]);

  const [internships, setInternships] = useState([
    { id: 101, title: 'AI & Data Science Summer Intern', company: 'Meta', location: 'Remote', stipend: '$45 - $60 / hr', match: '96%', tags: ['Python', 'PyTorch', 'SQL'], applied: false },
    { id: 102, title: 'Junior Data Analyst', company: 'Stripe', location: 'San Francisco, CA', stipend: '$40 - $50 / hr', match: '92%', tags: ['SQL', 'Tableau', 'R'], applied: false },
    { id: 103, title: 'Machine Learning Engineering Intern', company: 'NVIDIA', location: 'Santa Clara, CA', stipend: '$50 - $65 / hr', match: '88%', tags: ['C++', 'CUDA', 'TensorFlow'], applied: false },
    { id: 104, title: 'Product Analytics Specialist', company: 'Airbnb', location: 'Hybrid', stipend: '$38 - $48 / hr', match: '85%', tags: ['Python', 'A/B Testing', 'Snowflake'], applied: false }
  ]);

  const [activeMockSession, setActiveMockSession] = useState(null);
  const [quizModal, setQuizModal] = useState(false);

  // Settings State
  const [profileSettings, setProfileSettings] = useState({
    name: 'Arjun Mehta',
    email: 'arjun.mehta@university.edu',
    title: 'Data Science & AI Undergraduate',
    targetRole: 'Data Scientist / ML Engineer',
    emailNotifications: true,
    jobAlerts: true,
    weeklyReport: true
  });

  const handleApplyInternship = (id) => {
    setInternships(prev => prev.map(item => item.id === id ? { ...item, applied: true } : item));
    showNotification('Applied successfully with your AI Resume!');
  };

  const handleRemoveApp = (id) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    showNotification('Application record removed.');
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

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="drawer-header">
                <div className="drawer-brand">
                  <Sparkles size={22} color={theme.accent} />
                  <span className="drawer-brand-title">CareerAI</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="icon-btn-clean">
                  <X size={24} color="#64748b" />
                </button>
              </div>

              <div className="drawer-links">
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
                      onClick={() => handleTabChange(item.id, item.path)}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      style={{
                        background: isActive ? theme.softBg : 'transparent',
                        color: isActive ? theme.accent : '#0f172a'
                      }}
                    >
                      <IconComp size={18} /> {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={() => navigate('/')} style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem' }}>
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION (Desktop) */}
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
              { id: 'portfolio', label: 'Portfolio Overview', icon: User, path: '/overview' },
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
                  onClick={() => handleTabChange(item.id, item.path)}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="icon-btn-clean mobile-hamburger-btn"
              style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '10px' }}
              aria-label="Open navigation menu"
            >
              <Menu size={20} color="#0f172a" />
            </button>
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
            {/* DYNAMIC TAB VIEW 1: OVERVIEW */}
            {activeTab === 'overview' && (
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
                    onClick={() => {
                      if (selectedRole === 'Student') handleTabChange('mock');
                      else showNotification(`Executing action: ${theme.primaryCta}`);
                    }}
                    className="cta-banner-btn"
                    style={{ color: theme.accent }}
                  >
                    {theme.primaryCta} <ArrowRight size={18} />
                  </button>
                </div>

                {/* UNCLUTTERED 4 CORE SCORE CARDS */}
                <div className="stats-grid">
                  
                  {/* Card 1: Readiness Score */}
                  <div className="stat-card" onClick={() => handleTabChange('roadmap')} style={{ cursor: 'pointer' }}>
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

                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                      <div style={{ width: '78%', height: '100%', background: theme.gradient, borderRadius: '999px' }} />
                    </div>
                  </div>

                  {/* Card 2: AI Resume Score */}
                  <div className="stat-card" onClick={() => handleTabChange('resume')} style={{ cursor: 'pointer' }}>
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
                  <div className="stat-card" onClick={() => handleTabChange('internships')} style={{ cursor: 'pointer' }}>
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
                  <div className="stat-card" onClick={() => handleTabChange('skills')} style={{ cursor: 'pointer' }}>
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
                        <button onClick={() => handleTabChange('applications')} style={{ background: 'none', border: 'none', color: theme.accent, fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
                          View All ({applications.length})
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {applications.slice(0, 3).map((app) => (
                          <div key={app.id} className="app-item-row">
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
                          <button onClick={() => handleTabChange('skills')} style={{ background: theme.softBg, border: 'none', color: theme.accent, fontWeight: 700, fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px', cursor: 'pointer' }}>Start Practice</button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '16px', background: '#f8fafc', borderLeft: '4px solid #7c3aed' }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Build a Machine Learning project</div>
                            <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.15rem' }}>Top skill to boost profile matching by +15%</div>
                          </div>
                          <button onClick={() => navigate('/projects')} style={{ background: 'rgba(124, 58, 237, 0.1)', border: 'none', color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px', cursor: 'pointer' }}>View Projects</button>
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

            {/* DYNAMIC TAB VIEW 2: APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="card-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Application Tracker</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Manage and track all your active job & internship applications.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newApp = { id: Date.now(), role: 'Software Engineer Intern', company: 'Apple', location: 'Cupertino, CA', status: 'Under Review', date: 'Just now', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
                      setApplications([newApp, ...applications]);
                      showNotification('Added new sample application record!');
                    }}
                    className="gradient-btn"
                    style={{ padding: '0.65rem 1.25rem', borderRadius: '12px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Plus size={16} /> Add New Application
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Role & Company</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Location</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Date Applied</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{app.role}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.company}</div>
                          </td>
                          <td style={{ padding: '1rem', color: '#475569' }}>{app.location}</td>
                          <td style={{ padding: '1rem', color: '#64748b' }}>{app.date}</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ background: app.bg, color: app.color, fontWeight: 700, fontSize: '0.8rem', padding: '0.35rem 0.85rem', borderRadius: '999px' }}>
                              {app.status}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <button
                              onClick={() => handleRemoveApp(app.id)}
                              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem' }}
                              title="Withdraw / Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DYNAMIC TAB VIEW 3: INTERNSHIPS */}
            {activeTab === 'internships' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>AI Matched Internships</h2>
                      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Verified opportunities tailored for Data Science & Engineering students.</p>
                    </div>
                    <span style={{ background: theme.softBg, color: theme.accent, fontWeight: 700, padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.85rem' }}>
                      {internships.length} Live Positions
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                    {internships.map((job) => (
                      <div key={job.id} style={{ background: '#f8fafc', borderRadius: '18px', border: '1px solid #e2e8f0', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div>
                              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{job.title}</h3>
                              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748b' }}>{job.company} • {job.location}</span>
                            </div>
                            <span style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', fontWeight: 800, fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '8px' }}>
                              {job.match} Match
                            </span>
                          </div>

                          <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600, marginBottom: '0.75rem' }}>
                            💰 {job.stipend}
                          </div>

                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                            {job.tags.map((tag, idx) => (
                              <span key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 600 }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => handleApplyInternship(job.id)}
                          disabled={job.applied}
                          style={{
                            background: job.applied ? '#cbd5e1' : theme.gradient,
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.65rem',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            cursor: job.applied ? 'default' : 'pointer'
                          }}
                        >
                          {job.applied ? '✓ Applied' : '⚡ 1-Click Apply with AI Resume'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC TAB VIEW 4: AI RESUME */}
            {activeTab === 'resume' && (
              <ResumeBuilderPage />
            )}

            {/* DYNAMIC TAB VIEW 5: MOCK INTERVIEWS */}
            {activeTab === 'mock' && (
              <MockInterviewPage />
            )}

            {/* DYNAMIC TAB VIEW 6: CAREER ROADMAP */}
            {activeTab === 'roadmap' && (
              <CareerRoadmapPage />
            )}

            {/* DYNAMIC TAB VIEW 7: SKILLS */}
            {activeTab === 'skills' && (
              <div className="card-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Skill Analytics & Benchmarks</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Real-time proficiency scoring based on quizzes and project submissions.</p>
                  </div>
                  <button
                    onClick={() => showNotification('Launching SQL & Python Speed Quiz...')}
                    className="gradient-btn"
                    style={{ padding: '0.65rem 1.25rem', borderRadius: '12px', fontSize: '0.875rem' }}
                  >
                    Take Skill Quiz
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {[
                    { name: 'Python Programming', level: '92%', status: 'Advanced', color: '#4f46e5' },
                    { name: 'SQL & Database Design', level: '85%', status: 'Proficient', color: '#059669' },
                    { name: 'Machine Learning (Scikit-Learn)', level: '70%', status: 'Intermediate', color: '#d97706' },
                    { name: 'Data Visualization (Plotly)', level: '78%', status: 'Proficient', color: '#7c3aed' },
                    { name: 'Deep Learning (PyTorch)', level: '55%', status: 'Learning', color: '#e11d48' },
                    { name: 'A/B Testing & Statistics', level: '65%', status: 'Intermediate', color: '#0284c7' }
                  ].map((skill, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                        <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{skill.name}</span>
                        <span style={{ fontWeight: 800, color: skill.color, fontSize: '0.9rem' }}>{skill.level}</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.6rem' }}>
                        <div style={{ width: skill.level, height: '100%', background: skill.color, borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Proficiency: {skill.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DYNAMIC TAB VIEW 8: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="card-panel" style={{ maxWidth: '700px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>Account Settings</h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Manage your profile preferences and role integrations.</p>

                <form onSubmit={(e) => { e.preventDefault(); showNotification('Settings saved successfully!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
                    <input
                      type="text"
                      value={profileSettings.name}
                      onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Email Address</label>
                    <input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Target Career Role</label>
                    <input
                      type="text"
                      value={profileSettings.targetRole}
                      onChange={(e) => setProfileSettings({ ...profileSettings, targetRole: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Notification Preferences</h4>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '0.6rem' }}>
                      <input
                        type="checkbox"
                        checked={profileSettings.emailNotifications}
                        onChange={(e) => setProfileSettings({ ...profileSettings, emailNotifications: e.target.checked })}
                      />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>Email alerts for new internship matches</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={profileSettings.weeklyReport}
                        onChange={(e) => setProfileSettings({ ...profileSettings, weeklyReport: e.target.checked })}
                      />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>Weekly skill progress digest</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="gradient-btn"
                    style={{ padding: '0.8rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.5rem' }}
                  >
                    Save Preferences
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
