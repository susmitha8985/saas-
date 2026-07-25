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
  Check,
  Download,
  Mail,
  MapPin,
  ExternalLink,
  Star,
  GitFork,
  CheckCircle2,
  Code,
  Globe,
  MoreVertical,
  Edit3,
  Phone,
  Layers,
  Cpu,
  User,
  GraduationCap
} from 'lucide-react';
import '../../App.css';
import './OverviewPage.css';

// SVG Helper Icons for Brands
const Github = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const Linkedin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

const Twitter = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function OverviewPage() {
  const navigate = useNavigate();
  const [activeNavTab, setActiveNavTab] = useState('portfolio');
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
  const [toast, setToast] = useState(null);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Generate 52 weeks x 5 days github heatmap matrix
  const generateHeatmapDays = () => {
    const weeks = [];
    for (let w = 0; w < 32; w++) {
      const days = [];
      for (let d = 0; d < 5; d++) {
        // Generate random activity level 0-4
        const rand = Math.random();
        let level = 0;
        if (rand > 0.4) level = 1;
        if (rand > 0.65) level = 2;
        if (rand > 0.82) level = 3;
        if (rand > 0.93) level = 4;
        days.push(level);
      }
      weeks.push(days);
    }
    return weeks;
  };

  const [heatmapMatrix] = useState(generateHeatmapDays());

  const getHeatmapColor = (level) => {
    switch (level) {
      case 1: return '#bbf7d0';
      case 2: return '#4ade80';
      case 3: return '#22c55e';
      case 4: return '#15803d';
      default: return '#ebedf0';
    }
  };

  return (
    <div className="overview-page-wrapper">
      
      {/* Toast Notification */}
      {toast && (
        <div className="overview-toast">
          <Sparkles size={18} color="#38bdf8" />
          <span>{toast}</span>
        </div>
      )}

      {/* 1. TOP NAVBAR */}
      <header className="overview-top-navbar">
        {/* Brand */}
        <div onClick={() => navigate('/')} className="overview-brand">
          <div className="overview-brand-icon">
            <Sparkles size={20} />
          </div>
          <span className="overview-brand-title">
            Career<span style={{ color: '#4f46e5' }}>AI</span>
          </span>
        </div>

        {/* Center Pill Tabs */}
        <div className="overview-center-pills">
          {[
            { id: 'portfolio', label: 'Portfolio', path: '/overview' },
            { id: 'projects', label: 'Projects', path: '/projects' },
            { id: 'certificates', label: 'Certificates', path: '/dashboard?tab=roadmap' },
            { id: 'experience', label: 'Experience', path: '/dashboard?tab=applications' },
            { id: 'contact', label: 'Contact', path: '#contact' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveNavTab(tab.id);
                if (tab.path.startsWith('/')) navigate(tab.path);
              }}
              className={`overview-pill-btn ${activeNavTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => showNotification('Opening Portfolio Editor...')}
            className="edit-portfolio-btn"
          >
            <Edit3 size={16} /> Edit Portfolio
          </button>
          <button className="icon-more-btn" aria-label="More options">
            <MoreVertical size={18} color="#64748b" />
          </button>
        </div>
      </header>

      {/* MAIN TWO COLUMN LAYOUT */}
      <div className="overview-container">
        
        {/* LEFT SIDEBAR PROFILE PANEL */}
        <aside className="overview-sidebar">
          
          {/* User Profile Card Header */}
          <div className="profile-header-card">
            <div className="profile-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces"
                alt="Arjun Mehta"
                className="profile-avatar"
              />
              <span className="online-indicator-dot" />
            </div>

            <h2 className="profile-name">Arjun Mehta</h2>
            <p className="profile-tagline">Data Science Student</p>
            <div className="profile-location">
              <MapPin size={14} color="#64748b" /> Bangalore, India
            </div>
          </div>

          {/* Vertical Menu Links */}
          <nav className="sidebar-menu-nav">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects' },
              { id: 'skills', label: 'Skills', icon: TrendingUp, path: '/dashboard?tab=skills' },
              { id: 'experience', label: 'Experience', icon: Briefcase, path: '/dashboard?tab=applications' },
              { id: 'certificates', label: 'Certificates', icon: Award, path: '/dashboard?tab=roadmap' },
              { id: 'achievements', label: 'Achievements', icon: Star },
              { id: 'resume', label: 'Resume', icon: FileText, path: '/dashboard?tab=resume' },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeSidebarItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarItem(item.id);
                    if (item.path) navigate(item.path);
                  }}
                  className={`sidebar-menu-btn ${isActive ? 'active' : ''}`}
                >
                  <IconComp size={18} color={isActive ? '#4f46e5' : '#64748b'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Availability Box */}
          <div className="availability-card">
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem' }}>Available for</div>
            <span className="availability-pill">
              🎓 Internships
            </span>
          </div>

          {/* Social Links */}
          <div className="connect-social-wrap">
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>Connect with me</div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-box" title="GitHub">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-box" title="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-box" title="Twitter">
                <Twitter size={16} />
              </a>
              <a href="mailto:arjun.mehta@email.com" className="social-icon-box" title="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>

        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="overview-main-content">
          
          {/* 1. HERO BANNER */}
          <section className="hero-banner-card">
            <div className="hero-banner-left">
              <span className="open-status-badge">
                <span className="green-pulse-dot" /> Open to Opportunities
              </span>

              <h1 className="hero-banner-title">
                Turning Data into <br />
                <span className="gradient-text">Insights & Impact</span>
              </h1>

              <p className="hero-banner-desc">
                Passionate about building intelligent solutions that solve real-world problems using data and AI.
              </p>

              <div className="hero-action-buttons">
                <button
                  onClick={() => showNotification('Downloading Arjun_Mehta_Resume.pdf...')}
                  className="download-resume-hero-btn"
                >
                  <Download size={16} /> Download Resume
                </button>
                <button
                  onClick={() => showNotification('Opening contact dialog...')}
                  className="hire-me-btn"
                >
                  Hire Me
                </button>
              </div>
            </div>

            {/* Right Graphic Card Illustration */}
            <div className="hero-graphics-container">
              <div className="glass-code-card">
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <div className="code-snippet-preview">
                  <span style={{ color: '#c084fc' }}>import</span> pandas <span style={{ color: '#c084fc' }}>as</span> pd<br />
                  <span style={{ color: '#c084fc' }}>import</span> torch.nn <span style={{ color: '#c084fc' }}>as</span> nn<br /><br />
                  <span style={{ color: '#60a5fa' }}>class</span> <span style={{ color: '#facc15' }}>CareerAI</span>(nn.Module):<br />
                  &nbsp;&nbsp;<span style={{ color: '#c084fc' }}>def</span> <span style={{ color: '#60a5fa' }}>predict_career</span>(self):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4ade80' }}>return</span> <span style={{ color: '#f472b6' }}>"Success 🚀"</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. FIVE METRICS STATS CARDS */}
          <section className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5' }}>
                <FolderKanban size={20} />
              </div>
              <div>
                <div className="metric-value">10+</div>
                <div className="metric-label">Projects Completed</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                <Briefcase size={20} />
              </div>
              <div>
                <div className="metric-value">2+</div>
                <div className="metric-label">Internships</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48' }}>
                <Award size={20} />
              </div>
              <div>
                <div className="metric-value">8+</div>
                <div className="metric-label">Certifications</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
                <Code size={20} />
              </div>
              <div>
                <div className="metric-value">500+</div>
                <div className="metric-label">GitHub Contributions</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="metric-value">9.2</div>
                <div className="metric-label">CGPA</div>
              </div>
            </div>
          </section>

          {/* 3. FEATURED PROJECTS SECTION */}
          <section className="overview-section">
            <div className="section-header">
              <h2 className="section-title">Featured Projects</h2>
              <button onClick={() => navigate('/projects')} className="section-link-btn">
                View all projects <ArrowRight size={16} />
              </button>
            </div>

            <div className="featured-projects-grid">
              {[
                {
                  title: 'Sales Dashboard Analytics',
                  desc: 'Interactive dashboard to visualize sales performance and key metrics.',
                  tags: ['Python', 'Streamlit', 'Plotly'],
                  stars: 128,
                  forks: 45,
                  gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
                },
                {
                  title: 'Pneumonia Detection AI',
                  desc: 'Deep learning model to detect pneumonia from chest X-ray images.',
                  tags: ['Python', 'TensorFlow', 'CNN'],
                  stars: 96,
                  forks: 32,
                  gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)'
                },
                {
                  title: 'AI Chatbot Assistant',
                  desc: 'NLP-powered chatbot for FAQ automation and smart user interactions.',
                  tags: ['Python', 'Transformers', 'FastAPI'],
                  stars: 74,
                  forks: 21,
                  gradient: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)'
                },
                {
                  title: 'Stock Price Predictor',
                  desc: 'LSTM model to predict stock prices using historical market data.',
                  tags: ['Python', 'Keras', 'LSTM'],
                  stars: 88,
                  forks: 28,
                  gradient: 'linear-gradient(135deg, #881337 0%, #be123c 100%)'
                }
              ].map((proj, idx) => (
                <div key={idx} className="featured-project-card">
                  <div className="project-card-image-box" style={{ background: proj.gradient }}>
                    <FolderKanban size={36} color="#ffffff" opacity={0.8} />
                  </div>
                  <div className="project-card-body">
                    <h3 className="project-card-title">{proj.title}</h3>
                    <p className="project-card-desc">{proj.desc}</p>
                    <div className="project-tags-wrap">
                      {proj.tags.map((t, i) => (
                        <span key={i} className="project-tag-pill">{t}</span>
                      ))}
                    </div>
                    <div className="project-card-footer">
                      <div className="project-stats-wrap">
                        <span>⭐ {proj.stars}</span>
                        <span>🍴 {proj.forks}</span>
                      </div>
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="project-gh-link">
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. TWO COLUMN: SKILLS & INTERNSHIPS */}
          <section className="overview-two-col-grid">
            
            {/* Left: Skills & Technologies */}
            <div className="card-box-panel">
              <h3 className="panel-title">Skills & Technologies</h3>

              <div className="skills-bars-container">
                {[
                  { name: 'Python', pct: '90%' },
                  { name: 'Machine Learning', pct: '85%' },
                  { name: 'SQL', pct: '80%' },
                  { name: 'Data Analysis', pct: '85%' },
                  { name: 'Deep Learning', pct: '75%' },
                  { name: 'Data Visualization', pct: '80%' }
                ].map((s, idx) => (
                  <div key={idx} className="skill-progress-item">
                    <div className="skill-label-row">
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-pct">{s.pct}</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: s.pct }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.75rem' }}>Tools & Libraries</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Matplotlib', 'Power BI', 'Streamlit', 'MySQL', 'Git', 'Docker'].map((tool, idx) => (
                    <span key={idx} className="tool-pill-tag">{tool}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Internship Experience */}
            <div className="card-box-panel">
              <div className="section-header" style={{ marginBottom: '1rem' }}>
                <h3 className="panel-title" style={{ margin: 0 }}>Internship Experience</h3>
                <button onClick={() => navigate('/dashboard?tab=applications')} className="section-link-btn">View all →</button>
              </div>

              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="company-logo-box" style={{ background: '#ef4444' }}>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem' }}>Z</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      <div>
                        <h4 className="job-role-title">Data Science Intern</h4>
                        <span className="job-company-name">Zomato</span>
                      </div>
                      <span className="job-date-pill">May 2024 - Jul 2024</span>
                    </div>
                    <ul className="job-bullet-list">
                      <li>Analyzed user behavior data to identify trends.</li>
                      <li>Built demand forecasting model improving accuracy by 15%.</li>
                      <li>Automated reporting using Python and SQL.</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="company-logo-box" style={{ background: '#00a4ef' }}>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem' }}>M</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      <div>
                        <h4 className="job-role-title">ML Intern</h4>
                        <span className="job-company-name">Microsoft</span>
                      </div>
                      <span className="job-date-pill">Jan 2024 - Mar 2024</span>
                    </div>
                    <ul className="job-bullet-list">
                      <li>Worked on image classification using deep learning.</li>
                      <li>Improved model accuracy by 10% using transfer learning.</li>
                      <li>Deployed model using Flask API.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* 5. CERTIFICATIONS SECTION */}
          <section className="overview-section">
            <div className="section-header">
              <h2 className="section-title">Certifications</h2>
              <button onClick={() => navigate('/dashboard?tab=roadmap')} className="section-link-btn">
                View all certificates <ArrowRight size={16} />
              </button>
            </div>

            <div className="certs-grid">
              {[
                { title: 'Machine Learning Specialization', issuer: 'Coursera', logo: 'coursera', badge: '🏅' },
                { title: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', logo: 'google', badge: '🏅' },
                { title: 'Deep Learning Specialization', issuer: 'Coursera', logo: 'coursera', badge: '🏅' },
                { title: 'SQL for Data Science', issuer: 'DataCamp', logo: 'datacamp', badge: '🏅' }
              ].map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <div className="cert-card-header">
                    <div className="cert-logo-circle">
                      {cert.logo === 'google' ? 'G' : cert.logo === 'coursera' ? 'C' : 'D'}
                    </div>
                    <div>
                      <h4 className="cert-title">{cert.title}</h4>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                  </div>
                  <div className="cert-footer">
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Issued Feb 2024</span>
                    <span style={{ fontSize: '1.2rem' }}>{cert.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. GITHUB OVERVIEW & RESUME DOWNLOAD */}
          <section className="overview-two-col-grid">
            
            {/* GitHub Overview */}
            <div className="card-box-panel">
              <div className="section-header" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Github size={20} color="#0f172a" />
                  <h3 className="panel-title" style={{ margin: 0 }}>GitHub Overview</h3>
                </div>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="section-link-btn">View Profile →</a>
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4f46e5', marginBottom: '1rem' }}>@arjunmehta-dev</div>

              {/* GitHub Metrics */}
              <div className="github-metrics-row">
                <div className="gh-metric-item">
                  <div className="gh-metric-num">78</div>
                  <div className="gh-metric-label">Repositories</div>
                </div>
                <div className="gh-metric-item">
                  <div className="gh-metric-num">1.2k+</div>
                  <div className="gh-metric-label">Stars Earned</div>
                </div>
                <div className="gh-metric-item">
                  <div className="gh-metric-num">320+</div>
                  <div className="gh-metric-label">Contributions</div>
                </div>
                <div className="gh-metric-item">
                  <div className="gh-metric-num">24</div>
                  <div className="gh-metric-label">Followers</div>
                </div>
              </div>

              {/* Contribution Activity Matrix */}
              <div className="github-heatmap-container">
                <div className="heatmap-months-header">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
                <div className="heatmap-grid">
                  {heatmapMatrix.map((week, wIdx) => (
                    <div key={wIdx} className="heatmap-col">
                      {week.map((level, dIdx) => (
                        <div
                          key={dIdx}
                          className="heatmap-cell"
                          style={{ background: getHeatmapColor(level) }}
                          title={`Contributions level: ${level}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="heatmap-legend">
                  <span>Less</span>
                  <div className="heatmap-cell" style={{ background: '#ebedf0' }} />
                  <div className="heatmap-cell" style={{ background: '#bbf7d0' }} />
                  <div className="heatmap-cell" style={{ background: '#4ade80' }} />
                  <div className="heatmap-cell" style={{ background: '#22c55e' }} />
                  <div className="heatmap-cell" style={{ background: '#15803d' }} />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Resume Download Panel */}
            <div className="card-box-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 className="panel-title" style={{ marginBottom: '1.25rem' }}>Resume</h3>
                
                <div className="resume-file-card">
                  <div className="pdf-icon-square">
                    <FileText size={24} color="#4f46e5" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Arjun_Mehta_Resume.pdf</h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Last updated 2 days ago • PDF • 1.2 MB</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showNotification('Downloading Arjun_Mehta_Resume.pdf...')}
                className="gradient-btn"
                style={{ width: '100%', padding: '0.85rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}
              >
                <Download size={18} /> Download Resume
              </button>
            </div>

          </section>

          {/* 7. FOOTER CONTACT BANNER */}
          <footer className="overview-footer-card">
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>Let's Connect!</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>I'm always open to discussing new opportunities, collaborating on exciting projects, or just connecting.</p>
            </div>

            <div className="footer-info-row">
              <div className="footer-info-item">
                <div className="footer-info-icon"><Mail size={16} /></div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Email</div>
                  <a href="mailto:arjun.mehta@email.com" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>arjun.mehta@email.com</a>
                </div>
              </div>

              <div className="footer-info-item">
                <div className="footer-info-icon"><Phone size={16} /></div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Phone</div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>+91 98765 43210</span>
                </div>
              </div>

              <div className="footer-info-item">
                <div className="footer-info-icon"><MapPin size={16} /></div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Location</div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Bangalore, India</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', marginLeft: 'auto' }}>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-box"><Github size={16} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-box"><Linkedin size={16} /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-box"><Twitter size={16} /></a>
              </div>
            </div>

            <div className="footer-copyright-bar">
              <span>© 2025 Arjun Mehta. All rights reserved.</span>
              <span>Built with ❤️ and <strong style={{ color: '#4f46e5' }}>CareerAI</strong></span>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
