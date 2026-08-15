import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutGrid,
  BookOpen,
  Briefcase,
  User,
  FileText,
  Mail,
  Info,
  Search,
  Bell,
  Play,
  Clock,
  Star,
  Award,
  Book,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { getStoredUser } from '../../utils/authService';
import { getProfile, DEFAULT_PROFILE } from '../../utils/profileService';
import './DashboardPage.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    async function loadData() {
      if (storedUser?.id) {
        const p = await getProfile(storedUser.id);
        if (p) setProfile(p);
      }
    }
    loadData();
  }, []);

  const userName = profile.firstName
    ? `${profile.firstName} ${profile.lastName || ''}`.trim()
    : profile.name || storedUser?.name || 'Student';

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard', active: true },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'Applications', icon: FileText, path: '/applications' },
    { name: 'Contact', icon: Mail, path: '#' },
    { name: 'About', icon: Info, path: '#' },
  ];

  const suggestedCourses = [
    {
      id: 'sugg_1',
      title: 'Advanced React 19 & Next.js App Router',
      description: 'Master server components, streaming, system architecture, and modern state management.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      price: '$19.99',
      rating: '4.9',
      duration: '14 week',
      lessons: '22 Lessons',
      instructor: 'Alex Mercer',
      experience: '(6+ Year Exp)',
      instructorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'sugg_2',
      title: 'AI Prompt Engineering & LLM APIs',
      description: 'Build enterprise AI applications with OpenAI, Claude, Vector DBs, and LangChain.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      price: '$24.50',
      rating: '4.8',
      duration: '10 week',
      lessons: '16 Lessons',
      instructor: 'Dr. Sarah Jenkins',
      experience: '(9+ Year Exp)',
      instructorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'sugg_3',
      title: 'Enterprise NestJS & Microservices',
      description: 'Design scalable backend APIs with Prisma, GraphQL, WebSockets, and Redis cache.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      price: '$16.80',
      rating: '4.7',
      duration: '12 week',
      lessons: '18 Lessons',
      instructor: 'Marcus Vance',
      experience: '(7+ Year Exp)',
      instructorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="dash-page-wrapper">
      <div className="dash-main-container">
        
        {/* LEFT SIDEBAR */}
        <aside className="dash-sidebar">
          <div className="sidebar-brand" onClick={() => navigate('/dashboard')}>
            <div className="brand-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-red"></span>
              <span className="dot dot-red"></span>
              <span className="dot dot-red"></span>
            </div>
            <span className="brand-text">
              codefor<span className="brand-dot">everybody</span>
            </span>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className={`nav-item ${item.active ? 'active' : ''}`}
                  onClick={() => {
                    if (item.path && item.path !== '#') {
                      navigate(item.path);
                    }
                  }}
                >
                  <Icon size={18} className="nav-icon" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </nav>

          {/* BOTTOM DOWNLOAD APP WIDGET */}
          <div className="sidebar-app-widget">
            <div className="widget-illustration">
              <img
                src="/mobile_app_character.jpg"
                alt="Download App Character"
                className="character-img"
              />
            </div>
            <h4 className="widget-title">Download Our<br />Mobile App</h4>
            <button className="widget-arrow-btn" aria-label="Download App">
              <ArrowRight size={16} />
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="dash-content">
          
          {/* HEADER ROW */}
          <header className="content-header">
            <h1 className="page-heading">Dashboard Overview</h1>

            <div className="header-actions">
              <button className="header-icon-btn" aria-label="Search">
                <Search size={18} color="#475569" />
              </button>
              <button className="header-icon-btn" aria-label="Notifications">
                <Bell size={18} color="#475569" />
              </button>
              
              <div 
                className="dash-user-pill" 
                onClick={() => navigate('/profile')}
                title="View Profile"
              >
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt="User avatar"
                  className="dash-user-avatar"
                />
                <span className="dash-user-name">{userName}</span>
              </div>
            </div>
          </header>

          {/* WELCOMING HERO BANNER */}
          <div className="dash-welcome-banner">
            <div className="welcome-text-content">
              <div className="welcome-badge">
                <Sparkles size={15} color="#D05249" />
                <span>AI Career Academy</span>
              </div>
              <h2 className="welcome-title">Welcome back, {userName}! 👋</h2>
              <p className="welcome-desc">
                You've completed <strong style={{ color: '#D05249' }}>65%</strong> of your weekly learning goal. Continue building software skills today!
              </p>
              
              <div className="stats-badges-row">
                <div className="stat-chip">
                  <BookOpen size={16} color="#D05249" />
                  <span>4 Active Courses</span>
                </div>
                <div className="stat-chip">
                  <Clock size={16} color="#D05249" />
                  <span>28h Total Learning</span>
                </div>
                <div className="stat-chip">
                  <Award size={16} color="#D05249" />
                  <span>2 Certificates</span>
                </div>
              </div>
            </div>
          </div>

          {/* RESUME PLAYING COURSE SECTION */}
          <section className="resume-section">
            <div className="section-header-flex">
              <h2 className="section-title">Resume Playing</h2>
              <span className="view-all-link" onClick={() => navigate('/courses')}>Explore All Courses →</span>
            </div>

            <div className="resume-playing-card">
              <div className="resume-card-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80"
                  alt="UX Design Masterclass"
                  className="resume-card-img"
                />
                <button className="play-overlay-btn" onClick={() => navigate('/player/ux-design')}>
                  <Play size={22} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '3px' }} />
                </button>
              </div>

              <div className="resume-card-info">
                <div className="resume-tag-row">
                  <span className="resume-badge">In Progress</span>
                  <span className="resume-lesson-count">Module 4 of 6 • Lesson 8</span>
                </div>
                
                <h3 className="resume-course-title">UX Design & Interactive Prototyping Masterclass</h3>
                <p className="resume-lesson-title">Current Lesson: Building High-Fidelity Micro-Interactions & Components</p>

                {/* PROGRESS BAR */}
                <div className="progress-bar-wrap">
                  <div className="progress-text-flex">
                    <span>Course Progress</span>
                    <span className="progress-percent">65%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="resume-action-row">
                  <button className="resume-play-btn" onClick={() => navigate('/player/ux-design')}>
                    <Play size={16} fill="#FFFFFF" color="#FFFFFF" /> Resume Playing
                  </button>
                  <span className="tutor-by-text">Instructor: Miss. Vanei Carly</span>
                </div>
              </div>
            </div>
          </section>

          {/* SUGGESTED COURSES SECTION */}
          <section className="suggested-section">
            <div className="section-header-flex">
              <h2 className="section-title">Suggested For You</h2>
              <span className="view-all-link" onClick={() => navigate('/courses')}>View Catalog →</span>
            </div>

            <div className="dash-courses-grid">
              {suggestedCourses.map((course) => (
                <div
                  key={course.id}
                  className="dash-course-card"
                  onClick={() => navigate(`/player/${course.id}`)}
                >
                  <div className="card-image-wrap">
                    <img src={course.image} alt={course.title} className="card-img" />
                    <button
                      className={`bookmark-btn ${bookmarked[course.id] ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(course.id);
                      }}
                      aria-label="Bookmark"
                    >
                      <Bookmark size={15} color="#FFFFFF" fill={bookmarked[course.id] ? "#FFFFFF" : "none"} />
                    </button>
                    <span className="price-tag">{course.price}</span>
                  </div>

                  <div className="card-body">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-desc">{course.description}</p>

                    <div className="metrics-row">
                      <span className="metric-item red-text">
                        <Star size={14} className="metric-icon" fill="#D05249" color="#D05249" />
                        {course.rating}
                      </span>
                      <span className="metric-item red-text">
                        <Clock size={14} className="metric-icon" color="#D05249" />
                        {course.duration}
                      </span>
                      <span className="metric-item red-text">
                        <Book size={14} className="metric-icon" color="#D05249" />
                        {course.lessons}
                      </span>
                    </div>

                    <div className="instructor-footer">
                      <div className="instructor-info">
                        <img src={course.instructorImg} alt={course.instructor} className="instructor-avatar" />
                        <span className="instructor-name">{course.instructor}</span>
                      </div>
                      <span className="instructor-exp">{course.experience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
