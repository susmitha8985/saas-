import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  ChevronDown,
  Plus,
  CheckCircle,
  RotateCcw,
  LayoutDashboard,
  User,
  BookOpen,
  Mail,
  Info
} from 'lucide-react';
import JobCard from './JobCard';
import JobDetailModal from './JobDetailModal';
import PostJobModal from './PostJobModal';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
import { getAllJobs } from '../../utils/jobService';
import './JobsPage.css';

export default function JobsPage() {
  const { jobId: routeJobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('Designer');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [salaryMax, setSalaryMax] = useState(2000);

  // Hamburger Drawer & User Menu State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showDrawerUserMenu, setShowDrawerUserMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Sidebar Filter Checkbox States
  const [schedules, setSchedules] = useState({
    'Full time': true,
    'Part time': true,
    'Internship': false,
    'Project work': false,
    'Volunteering': false,
  });

  const [employmentTypes, setEmploymentTypes] = useState({
    'Full day': true,
    'Flexible schedule': true,
    'Shift work': false,
    'Distant work': false,
    'Shift method': false,
  });

  const [sortOption, setSortOption] = useState('latest');
  const [selectedJobId, setSelectedJobId] = useState(routeJobId || null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Fetch jobs on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const data = await getAllJobs();
        if (isMounted) setJobs(data);
      } catch (err) {
        console.error('Failed to load jobs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync routeJobId
  useEffect(() => {
    if (routeJobId) {
      setSelectedJobId(routeJobId);
    }
  }, [routeJobId]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleToggleSchedule = (key) => {
    setSchedules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleEmployment = (key) => {
    setEmploymentTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleJobCreated = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
    showToast(`Job "${newJob.title}" posted successfully!`);
  };

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (searchTitle.trim()) {
        const query = searchTitle.toLowerCase();
        const titleMatch = job.title?.toLowerCase().includes(query);
        const companyMatch = job.company?.toLowerCase().includes(query);
        const descMatch = job.description?.toLowerCase().includes(query);
        if (!titleMatch && !companyMatch && !descMatch) return false;
      }
      return true;
    });
  }, [jobs, searchTitle]);

  return (
    <div className="jobs-app-container">
      {/* 1. Top Navbar Header with Hamburger Button & brand logo */}
      <header className="jobs-navbar-header">
        <div className="nav-brand-left">
          {/* Hamburger Menu Button */}
          <button
            className="hamburger-btn"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            title="Open Menu"
          >
            <Menu size={22} />
          </button>

          {/* brand codeforeverybody */}
          <div className="brand-title-box" onClick={() => navigate('/')}>
            <div className="brand-name">
              codefor<span>everybody</span>
            </div>
            <span className="brand-subtitle">
              Course Selling & Tech Career Platform
            </span>
          </div>
        </div>
      </header>

      {/* 2. Sliding Hamburger Drawer (Matching Profile Route Menu Theme) */}
      {isDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)}>
          <aside
            className="profile-theme-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Logo */}
            <div className="profile-drawer-logo">
              <div className="drawer-brand-name" onClick={() => { setIsDrawerOpen(false); navigate('/'); }}>
                codefor<span>everybody</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close drawer"
              >
                <X size={18} color="#646464" />
              </button>
            </div>

            {/* Navigation List - Same Theme as Profile Route Sidebar */}
            <ul className="profile-drawer-nav-list">
              <li>
                <button
                  className={`profile-drawer-nav-item ${location.pathname === '/' ? 'active' : ''}`}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/');
                  }}
                >
                  <LayoutDashboard className="sidebar-icon" size={18} />
                  <span>Dashboard</span>
                </button>
              </li>

              <li>
                <button
                  className={`profile-drawer-nav-item ${location.pathname.startsWith('/jobs') ? 'active' : ''}`}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/jobs');
                  }}
                >
                  <Briefcase className="sidebar-icon" size={18} />
                  <span>Jobs</span>
                </button>
              </li>

              <li>
                <button
                  className={`profile-drawer-nav-item ${location.pathname.startsWith('/profile') ? 'active' : ''}`}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/profile');
                  }}
                >
                  <User className="sidebar-icon" size={18} />
                  <span>My Profile</span>
                </button>
              </li>

              <li>
                <button
                  className={`profile-drawer-nav-item ${location.pathname.startsWith('/player') ? 'active' : ''}`}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/player');
                  }}
                >
                  <BookOpen className="sidebar-icon" size={18} />
                  <span>Courses</span>
                </button>
              </li>

              <li>
                <button
                  className="profile-drawer-nav-item"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setShowContactModal(true);
                  }}
                >
                  <Mail className="sidebar-icon" size={18} />
                  <span>Contact</span>
                </button>
              </li>

              <li>
                <button
                  className="profile-drawer-nav-item"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setShowAboutModal(true);
                  }}
                >
                  <Info className="sidebar-icon" size={18} />
                  <span>About</span>
                </button>
              </li>
            </ul>

            {/* Profile User Pill at Bottom (Matching Profile Route Sidebar) */}
            <div className="profile-drawer-user-wrapper">
              {showDrawerUserMenu && (
                <div className="user-menu-popover" style={{ bottom: '70px', left: '16px', right: '16px' }}>
                  <button
                    className="user-menu-item"
                    onClick={() => {
                      setShowDrawerUserMenu(false);
                      setIsDrawerOpen(false);
                      navigate('/profile');
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="user-menu-item active"
                    onClick={() => {
                      setShowDrawerUserMenu(false);
                      setIsDrawerOpen(false);
                      navigate('/jobs');
                    }}
                  >
                    Jobs Portal
                  </button>
                  <button className="user-menu-item" onClick={() => setShowDrawerUserMenu(false)}>
                    Change Password
                  </button>
                </div>
              )}

              <div
                className="sidebar-user-pill"
                onClick={() => setShowDrawerUserMenu(!showDrawerUserMenu)}
                title="Profile Options"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="User avatar"
                  className="sidebar-avatar"
                />
                <div className="sidebar-user-info">
                  <span className="sidebar-user-name">Natashia Khaleira</span>
                  <span className="sidebar-user-email">jonson@bress.com</span>
                </div>
                <ChevronDown size={16} color="#64748B" />
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Dark Top Filter Bar (#0F1217) */}
      <header className="jobs-top-filter-bar">
        <div className="top-filters-left">
          {/* Search Title */}
          <div className="filter-select-pill">
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search job title..."
            />
            <ChevronDown size={14} color="#94A3B8" />
          </div>

          {/* Work Location */}
          <div className="filter-select-pill">
            <MapPin size={16} color="#94A3B8" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All">Work location</option>
              <option value="Remote">Remote</option>
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="New York, NY">New York, NY</option>
              <option value="California, CA">California, CA</option>
            </select>
          </div>

          {/* Experience */}
          <div className="filter-select-pill">
            <Briefcase size={16} color="#94A3B8" />
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="All">Experience</option>
              <option value="Junior">Junior level</option>
              <option value="Middle">Middle level</option>
              <option value="Senior">Senior level</option>
            </select>
          </div>

          {/* Pay Period */}
          <div className="filter-select-pill">
            <DollarSign size={16} color="#94A3B8" />
            <select>
              <option value="month">Per month</option>
              <option value="hour">Per hour</option>
              <option value="year">Per year</option>
            </select>
          </div>

          {/* Salary Range Slider ($1200 - $2000) */}
          <div className="salary-range-wrapper">
            <div className="salary-label-group">
              <span className="salary-title">Salary range</span>
              <span className="salary-value">$1200 - ${salaryMax}</span>
            </div>
            <input
              type="range"
              min="1200"
              max="5000"
              step="100"
              value={salaryMax}
              onChange={(e) => setSalaryMax(Number(e.target.value))}
              className="range-slider-input"
            />
          </div>
        </div>
      </header>

      {/* 4. Main Dashboard Layout (Sidebar + Grid) */}
      <div className="jobs-main-layout">
        {/* Left Sidebar Filters */}
        <aside className="jobs-sidebar">
          {/* LuckyJob Dark Promo Banner */}
          <div className="promo-card">
            <h2 className="promo-headline">
              Get Your best<br />profession<br />with LuckyJob
            </h2>
            <button
              className="promo-learn-btn"
              onClick={() => setShowPostModal(true)}
            >
              Post a Job
            </button>
          </div>

          {/* Filters Header */}
          <div className="sidebar-filters-title">
            <span>Filters</span>
            <RotateCcw
              size={15}
              color="#64748B"
              style={{ cursor: 'pointer' }}
              onClick={() => setSearchTitle('Designer')}
              title="Reset Filters"
            />
          </div>

          {/* Working Schedule Filter Category */}
          <div className="filter-category">
            <span className="category-name">Working schedule</span>
            <div className="checkbox-group">
              {Object.keys(schedules).map((key) => (
                <label key={key} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={schedules[key]}
                    onChange={() => handleToggleSchedule(key)}
                  />
                  <span className="custom-checkbox" />
                  <span>{key}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Employment Type Filter Category */}
          <div className="filter-category">
            <span className="category-name">Employment type</span>
            <div className="checkbox-group">
              {Object.keys(employmentTypes).map((key) => (
                <label key={key} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={employmentTypes[key]}
                    onChange={() => handleToggleEmployment(key)}
                  />
                  <span className="custom-checkbox" />
                  <span>{key}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="jobs-content-area">
          {/* Header Row: Title + Count + Sort + Post Job button */}
          <div className="content-header-row">
            <div className="title-with-badge">
              <h1 className="main-jobs-title">Recommended jobs</h1>
              <span className="jobs-count-pill">{filteredJobs.length + 380}</span>
            </div>

            <div className="content-header-actions">
              <div className="sort-by-box">
                <span>Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="sort-select"
                >
                  <option value="latest">Last updated</option>
                  <option value="highest">Highest Salary</option>
                </select>
              </div>

              <button
                className="post-job-btn"
                onClick={() => setShowPostModal(true)}
              >
                <Plus size={16} /> Post Job
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMsg && (
            <div
              style={{
                padding: '12px 18px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #10B981',
                color: '#065F46',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              <CheckCircle size={18} color="#10B981" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Job Cards Grid */}
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
              Loading job opportunities...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
              No jobs match your filter criteria.
            </div>
          ) : (
            <div className="jobs-cards-grid">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id || job.jobId}
                  job={job}
                  onSelectDetail={(selected) => {
                    setSelectedJobId(selected.jobId || selected.id);
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Detail Modal (GET /jobs/detail/:jobId) */}
      <JobDetailModal
        jobId={selectedJobId}
        isOpen={Boolean(selectedJobId)}
        onClose={() => setSelectedJobId(null)}
      />

      {/* Post Job Modal (POST /jobs/:userId) */}
      <PostJobModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onJobPosted={handleJobCreated}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      {/* About Us Modal */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </div>
  );
}
