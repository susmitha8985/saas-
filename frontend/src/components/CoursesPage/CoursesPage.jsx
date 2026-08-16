import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Star,
  Clock,
  FileText,
  X
} from 'lucide-react';
import AppSidebar from '../common/AppSidebar';
import { useSEO } from '../../utils/seo';
import './CoursesPage.css';

export default function CoursesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedCards, setBookmarkedCards] = useState({ 1: false, 2: true, 3: false });
  const [toastMsg, setToastMsg] = useState('');

  useSEO({
    title: 'Our Courses - codeforeverybody',
    description: 'Explore UI/UX design, Figma prototyping, and mobile user experience courses on codeforeverybody.',
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    showToast(bookmarkedCards[id] ? 'Removed from favourites' : 'Saved to favourites');
  };

  const handleNavClick = (navId, path) => {
    setActiveNav(navId);
    if (path && path !== '#') {
      navigate(path);
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/player/${courseId || 'ux-design-beginner'}`);
  };

  const topCourses = [
    {
      id: 1,
      courseId: 'ux-design-beginner',
      title: 'UX Design Beginner',
      desc: 'Starting with UX design can be both exciting and overwhelming...',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
      price: '$12.50',
      rating: '4.1',
      duration: '12 week',
      lessons: '10 Lessons',
      tutorName: 'Miss. Vanei Carly',
      tutorExp: '(5+ Year Exp)',
      tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 2,
      courseId: 'mobile-user-experience',
      title: 'Mobile User Experience',
      desc: 'Designing an exceptional mobile user experience (UX) involves...',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      price: '$18.15',
      rating: '4.3',
      duration: '8 week',
      lessons: '14 Lessons',
      tutorName: 'Mr. Milian Deon',
      tutorExp: '(8+ Year Exp)',
      tutorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 3,
      courseId: 'figma-advance',
      title: 'Figma Advance',
      desc: 'Figma is a powerful and versatile design tool used by UX/UI designers...',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      price: '$14.60',
      rating: '3.8',
      duration: '16 week',
      lessons: '18 Lessons',
      tutorName: 'Mrs. Maria Waston',
      tutorExp: '(2+ Year Exp)',
      tutorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const featuredCourses = [
    {
      id: 'f1',
      title: 'Multi Editing Text In Figma',
      tutorName: 'Mr. Evan Black',
      tutorEmail: 'evanblack_04@lea.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'f2',
      title: 'Advance Prototyping',
      tutorName: 'Miss. Jane Cooper',
      tutorEmail: 'jane_coop12@lea.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'f3',
      title: 'UI Animation Interactions',
      tutorName: 'Miss. Stevi Jessi',
      tutorEmail: 'stevi_jessi10@lea.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const filteredTopCourses = topCourses.filter((course) => {
    if (!searchQuery) return true;
    return (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tutorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="cp-page-container">
      {/* Main Fullscreen Dashboard Layout */}
      <div className="cp-dashboard-frame">
        {/* Unified App Sidebar */}
        <AppSidebar />

        {/* Right Main Content Area */}
        <main className="cp-main-content">
          {/* Header Row */}
          <div className="cp-header-row">
            <h1 className="cp-page-title">Our Courses</h1>
            <div className="cp-header-actions">
              <button
                className="cp-icon-circle-btn"
                onClick={() => setShowSearchModal(!showSearchModal)}
                title="Search Courses"
              >
                <Search size={18} />
              </button>
              <button
                className="cp-icon-circle-btn"
                onClick={() => showToast('No new notifications')}
                title="Notifications"
              >
                <Bell size={18} />
              </button>
              <button
                className="cp-apply-btn"
                onClick={() => setShowApplyModal(true)}
              >
                Apply New Course
              </button>
            </div>
          </div>

          {/* Search Bar Input (When toggled or inline search) */}
          {showSearchModal && (
            <div style={{ display: 'flex', gap: '10px', animation: 'fadeIn 0.2s ease' }}>
              <input
                type="text"
                className="cp-form-input"
                placeholder="Search courses or tutors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  className="cp-icon-circle-btn"
                  onClick={() => setSearchQuery('')}
                  style={{ width: '40px', height: '40px' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          {/* Toast Notification */}
          {toastMsg && (
            <div
              style={{
                padding: '12px 18px',
                backgroundColor: '#1E1E1E',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              {toastMsg}
            </div>
          )}

          {/* Navigation Filter Tabs */}
          <div className="cp-tabs-bar">
            <button
              className={`cp-tab-item ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Courses (03)
            </button>
            <button
              className={`cp-tab-item ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active (04)
            </button>
            <button
              className={`cp-tab-item ${activeTab === 'complete' ? 'active' : ''}`}
              onClick={() => setActiveTab('complete')}
            >
              Complete (20)
            </button>
            <button
              className={`cp-tab-item ${activeTab === 'favourite' ? 'active' : ''}`}
              onClick={() => setActiveTab('favourite')}
            >
              Favourite (06)
            </button>
          </div>

          {/* Top Courses Carousel / Grid */}
          <div className="cp-carousel-container">
            <button className="cp-arrow-btn left" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>

            <div className="cp-courses-grid">
              {filteredTopCourses.map((course) => (
                <div
                  key={course.id}
                  className="cp-course-card"
                  onClick={() => handleCardClick(course.courseId)}
                >
                  {/* Card Thumbnail Image & Overlays */}
                  <div className="cp-card-media">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="cp-card-img"
                    />
                    <button
                      className={`cp-bookmark-btn ${bookmarkedCards[course.id] ? 'bookmarked' : ''}`}
                      onClick={(e) => toggleBookmark(course.id, e)}
                      title="Bookmark course"
                    >
                      <Bookmark size={15} fill={bookmarkedCards[course.id] ? '#ffffff' : 'none'} />
                    </button>
                    <div className="cp-price-badge">{course.price}</div>
                  </div>

                  {/* Card Content */}
                  <h3 className="cp-card-title">{course.title}</h3>
                  <p className="cp-card-desc">{course.desc}</p>

                  {/* Metadata Row */}
                  <div className="cp-meta-row">
                    <div className="cp-meta-item">
                      <Star size={14} fill="#D9534F" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="cp-meta-item">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="cp-meta-item">
                      <FileText size={14} />
                      <span>{course.lessons}</span>
                    </div>
                  </div>

                  <div className="cp-card-divider" />

                  {/* Instructor Row */}
                  <div className="cp-tutor-row">
                    <img
                      src={course.tutorAvatar}
                      alt={course.tutorName}
                      className="cp-tutor-avatar"
                    />
                    <span className="cp-tutor-name">{course.tutorName}</span>
                    <span className="cp-tutor-exp">{course.tutorExp}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="cp-arrow-btn right" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Featured Courses Section */}
          <section className="cp-featured-section">
            <h2 className="cp-section-title">Featured Course</h2>
            <div className="cp-featured-grid">
              {featuredCourses.map((feat) => (
                <div
                  key={feat.id}
                  className="cp-featured-card"
                  onClick={() => handleCardClick('figma-advance')}
                >
                  <h3 className="cp-feat-title">{feat.title}</h3>
                  <div className="cp-tutor-by-label">Tutor By</div>
                  <div className="cp-feat-tutor-row">
                    <div className="cp-feat-tutor-info">
                      <span className="cp-feat-tutor-name">{feat.tutorName}</span>
                      <span className="cp-feat-tutor-email">{feat.tutorEmail}</span>
                    </div>
                    <img
                      src={feat.avatar}
                      alt={feat.tutorName}
                      className="cp-feat-avatar"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Apply New Course Modal */}
      {showApplyModal && (
        <div className="cp-modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="cp-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="cp-modal-header">
              <h3 className="cp-modal-title">Apply For New Course</h3>
              <button
                className="cp-icon-circle-btn"
                onClick={() => setShowApplyModal(false)}
                style={{ width: '32px', height: '32px', border: 'none' }}
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowApplyModal(false);
                showToast('Application submitted successfully! Our team will review your application.');
              }}
            >
              <div className="cp-form-group">
                <label className="cp-form-label">Course Title</label>
                <input
                  type="text"
                  className="cp-form-input"
                  placeholder="e.g. Advanced System Architecture"
                  required
                />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Your Email</label>
                <input
                  type="email"
                  className="cp-form-input"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Why do you want to join?</label>
                <textarea
                  className="cp-form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Briefly state your learning goals..."
                  required
                />
              </div>
              <button type="submit" className="cp-submit-btn">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
