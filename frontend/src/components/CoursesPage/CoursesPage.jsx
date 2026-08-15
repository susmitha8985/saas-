import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutGrid,
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  Award,
  Settings,
  Search,
  Bell,
  ArrowRight,
  Briefcase,
  User,
  FileText,
  Mail,
  Info,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Star,
  Clock,
  Book,
  Plus
} from 'lucide-react';
import './CoursesPage.css';

export default function CoursesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Courses (03)');
  const [bookmarked, setBookmarked] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'Courses', icon: BookOpen, path: '/courses', active: true },
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'Applications', icon: FileText, path: '/applications' },
    { name: 'Contact', icon: Mail, path: '#' },
    { name: 'About', icon: Info, path: '#' },
  ];

  const mainCourses = [
    {
      id: 'course_1',
      title: 'UX Design Beginner',
      description: 'Starting with UX design can be both exciting and overwhelming...',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      price: '$12.50',
      rating: '4.1',
      duration: '12 week',
      lessons: '10 Lessons',
      instructor: 'Miss. Vanei Carly',
      experience: '(5+ Year Exp)',
      instructorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'course_2',
      title: 'Mobile User Experience',
      description: 'Designing an exceptional mobile user experience (UX) involves...',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
      price: '$18.15',
      rating: '4.3',
      duration: '8 week',
      lessons: '14 Lessons',
      instructor: 'Mr. Milian Deon',
      experience: '(8+ Year Exp)',
      instructorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'course_3',
      title: 'Figma Advance',
      description: 'Figma is a powerful and versatile design tool used by UX/UI designers...',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      price: '$14.60',
      rating: '3.8',
      duration: '16 week',
      lessons: '18 Lessons',
      instructor: 'Mrs. Maria Waston',
      experience: '(2+ Year Exp)',
      instructorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const featuredCourses = [
    {
      id: 'feat_1',
      title: 'Multi Editing Text In Figma',
      tutorName: 'Mr. Evan Black',
      tutorEmail: 'evanblack_04@lea.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'feat_2',
      title: 'Advance Prototyping',
      tutorName: 'Miss. Jane Cooper',
      tutorEmail: 'jane_coop12@lea.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'feat_3',
      title: 'UI Animation Interactions',
      tutorName: 'Miss. Stevi Jessi',
      tutorEmail: 'stevi_jessi10@lea.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="courses-page-wrapper">
      <div className="courses-main-container">
        
        {/* LEFT SIDEBAR */}
        <aside className="courses-sidebar">
          <div className="sidebar-brand" onClick={() => navigate('/')}>
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

          {/* BOTTOM DOWNLOAD WIDGET */}
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

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="courses-content">
          
          {/* HEADER ROW */}
          <header className="content-header">
            <h1 className="page-heading">Our Courses</h1>
            <div className="header-actions">
              <button className="header-icon-btn" aria-label="Search">
                <Search size={18} color="#475569" />
              </button>
              <button className="header-icon-btn" aria-label="Notifications">
                <Bell size={18} color="#475569" />
              </button>
              <button className="apply-course-btn">
                Apply New Course
              </button>
            </div>
          </header>

          {/* FILTER TABS ROW */}
          <div className="filter-tabs-bar">
            {['All Courses (03)', 'Active (04)', 'Complete (20)', 'Favourite (06)'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* MAIN COURSES SLIDER CAROUSEL SECTION */}
          <div className="carousel-section">
            <button className="carousel-nav-btn prev" aria-label="Previous">
              <ChevronLeft size={18} color="#475569" />
            </button>

            <div className="courses-grid">
              {mainCourses.map((course) => (
                <div
                  key={course.id}
                  className="course-card"
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

            <button className="carousel-nav-btn next" aria-label="Next">
              <ChevronRight size={18} color="#475569" />
            </button>
          </div>

          {/* FEATURED COURSE SECTION */}
          <section className="featured-section">
            <h2 className="section-title">Featured Course</h2>
            <div className="featured-grid">
              {featuredCourses.map((feat) => (
                <div key={feat.id} className="featured-card">
                  <div className="featured-card-content">
                    <h3 className="featured-title">{feat.title}</h3>
                    <span className="tutor-label">Tutor By</span>
                    <div className="tutor-details">
                      <span className="tutor-name">{feat.tutorName}</span>
                      <span className="tutor-email">{feat.tutorEmail}</span>
                    </div>
                  </div>
                  <img src={feat.avatar} alt={feat.tutorName} className="featured-avatar" />
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
