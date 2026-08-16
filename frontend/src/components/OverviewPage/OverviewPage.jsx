import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Award,
  Clock,
  ArrowRight,
  Play,
  FileCheck,
  Search,
  Bell,
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';
import AppSidebar from '../common/AppSidebar';
import { getStoredUser } from '../../utils/authService';
import { getAllJobs } from '../../utils/jobService';
import { getMyApplications } from '../../utils/applicationService';
import { useSEO } from '../../utils/seo';
import './OverviewPage.css';

export default function OverviewPage() {
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const [jobs, setJobs] = useState([]);
  const [applicationsCount, setApplicationsCount] = useState(0);

  useSEO({
    title: 'Dashboard Overview - codeforeverybody',
    description: 'Track your enrolled courses, learning progress, job applications, and career milestones on codeforeverybody.',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const jobList = await getAllJobs();
        setJobs(jobList.slice(0, 3));
        const apps = await getMyApplications(storedUser?.id);
        setApplicationsCount(apps.length);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, [storedUser?.id]);

  const userName = storedUser?.name || (storedUser?.email ? storedUser.email.split('@')[0] : 'Student');

  return (
    <div className="ov-page-container">
      <div className="ov-dashboard-frame">
        {/* Unified Sidebar */}
        <AppSidebar />

        {/* Main Overview Content */}
        <main className="ov-main-content">
          {/* Header Row */}
          <div className="ov-header-row">
            <div>
              <h1 className="ov-welcome-title">Welcome back, {userName}! 👋</h1>
              <p className="ov-welcome-sub">Here is what is happening with your learning & career goals today.</p>
            </div>
            <div className="ov-header-actions">
              <button
                className="ov-icon-btn"
                onClick={() => navigate('/courses')}
                title="Search"
              >
                <Search size={18} />
              </button>
              <button
                className="ov-icon-btn"
                onClick={() => alert('No new notifications')}
                title="Notifications"
              >
                <Bell size={18} />
              </button>
              <button
                className="ov-primary-btn"
                onClick={() => navigate('/courses')}
              >
                <Sparkles size={16} /> Explore Courses
              </button>
            </div>
          </div>

          {/* KPI Stats Grid */}
          <div className="ov-stats-grid">
            <div className="ov-stat-card">
              <div className="ov-stat-icon-wrap" style={{ backgroundColor: '#FEE2E2', color: '#D9534F' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <div className="ov-stat-value">04</div>
                <div className="ov-stat-label">Enrolled Courses</div>
              </div>
            </div>

            <div className="ov-stat-card">
              <div className="ov-stat-icon-wrap" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
                <Clock size={24} />
              </div>
              <div>
                <div className="ov-stat-value">28.5 hrs</div>
                <div className="ov-stat-label">Hours Learned</div>
              </div>
            </div>

            <div className="ov-stat-card">
              <div className="ov-stat-icon-wrap" style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
                <FileCheck size={24} />
              </div>
              <div>
                <div className="ov-stat-value">{applicationsCount || '03'}</div>
                <div className="ov-stat-label">Jobs Applied</div>
              </div>
            </div>

            <div className="ov-stat-card">
              <div className="ov-stat-icon-wrap" style={{ backgroundColor: '#E0E7FF', color: '#4F46E5' }}>
                <Award size={24} />
              </div>
              <div>
                <div className="ov-stat-value">02</div>
                <div className="ov-stat-label">Certificates Earned</div>
              </div>
            </div>
          </div>

          {/* 2-Column Main Split Content */}
          <div className="ov-split-grid">
            {/* Left Main Column */}
            <div>
              {/* In Progress Course Card */}
              <div className="ov-section-heading">
                <h2 className="ov-sec-title">Continue Learning</h2>
                <span className="ov-view-all-link" onClick={() => navigate('/courses')}>
                  View All Courses →
                </span>
              </div>

              <div className="ov-progress-banner">
                <img
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400&q=80"
                  alt="UX Design Beginner"
                  className="ov-banner-img"
                />
                <div className="ov-banner-info">
                  <div className="ov-badge-tag">IN PROGRESS • LESSON 4 OF 10</div>
                  <h3 className="ov-banner-title">UX Design Beginner & Prototyping</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#78746D', fontWeight: '600' }}>
                    <span>Progress: 40%</span>
                    <span>6 Lessons left</span>
                  </div>
                  <div className="ov-progress-bar-bg">
                    <div className="ov-progress-bar-fill" style={{ width: '40%' }} />
                  </div>
                </div>
                <button
                  className="ov-primary-btn"
                  onClick={() => navigate('/player/ux-design-beginner')}
                  style={{ padding: '12px 18px', alignSelf: 'center' }}
                >
                  <Play size={16} fill="#FFFFFF" /> Resume
                </button>
              </div>

              {/* Recommended Jobs */}
              <div className="ov-section-heading">
                <h2 className="ov-sec-title">Recommended Jobs For You</h2>
                <span className="ov-view-all-link" onClick={() => navigate('/jobs')}>
                  Explore Jobs Portal →
                </span>
              </div>

              <div className="ov-jobs-list">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="ov-job-row"
                    onClick={() => navigate('/jobs')}
                  >
                    <div className="ov-job-left">
                      <img
                        src={job.companyLogo || 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png'}
                        alt={job.company}
                        className="ov-job-logo"
                      />
                      <div>
                        <h4 className="ov-job-title">{job.title}</h4>
                        <div className="ov-job-meta">
                          {job.company} • {job.location || 'Remote'}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="ov-job-salary">{job.salary || '$150/hr'}</div>
                      <div style={{ fontSize: '12px', color: '#D9534F', fontWeight: '700' }}>Quick Apply →</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Quick Navigation & Resume Card */}
            <div>
              {/* Resume & Profile Quick Widget */}
              <div className="ov-widget-card">
                <h3 className="ov-widget-title">Quick Actions</h3>

                <div
                  className="ov-action-link-btn"
                  onClick={() => navigate('/resume')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={18} color="#D9534F" />
                    <span>Resume Builder & Uploader</span>
                  </div>
                  <ArrowRight size={16} />
                </div>

                <div
                  className="ov-action-link-btn"
                  onClick={() => navigate('/applications')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileCheck size={18} color="#D9534F" />
                    <span>My Job Applications</span>
                  </div>
                  <ArrowRight size={16} />
                </div>

                <div
                  className="ov-action-link-btn"
                  onClick={() => navigate('/profile')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award size={18} color="#D9534F" />
                    <span>Edit Profile & Skills</span>
                  </div>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Weekly Learning Goal Widget */}
              <div className="ov-widget-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="ov-widget-title">Weekly Goal</h3>
                  <TrendingUp size={18} color="#16A34A" />
                </div>
                <div style={{ fontSize: '13px', color: '#78746D' }}>
                  Target: 5 hours / week. You have completed 3.5 hrs (70%).
                </div>
                <div className="ov-progress-bar-bg">
                  <div className="ov-progress-bar-fill" style={{ width: '70%', backgroundColor: '#16A34A' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#16A34A', fontWeight: '700' }}>
                  🔥 4-Day Learning Streak Active!
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
