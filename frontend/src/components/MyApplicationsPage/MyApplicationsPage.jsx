import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  BookOpen,
  Briefcase,
  User,
  Mail,
  Info,
  Search,
  Bell,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  MapPin,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { getStoredUser } from '../../utils/authService';
import { getMyApplications } from '../../utils/applicationService';
import './MyApplicationsPage.css';

export default function MyApplicationsPage() {
  const navigate = useNavigate();
  const storedUser = getStoredUser();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const apps = await getMyApplications(storedUser?.id);
        setApplications(apps);
      } catch (err) {
        console.error('Failed to load applications:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [storedUser?.id]);

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'Applications', icon: FileText, path: '/applications', active: true },
    { name: 'Contact', icon: Mail, path: '#' },
    { name: 'About', icon: Info, path: '#' },
  ];

  const filteredApps = applications.filter((app) => {
    if (filterStatus === 'ALL') return true;
    return app.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="app-status-badge accepted">
            <CheckCircle2 size={14} /> Accepted
          </span>
        );
      case 'REJECTED':
        return (
          <span className="app-status-badge rejected">
            <XCircle size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span className="app-status-badge pending">
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="apps-page-wrapper">
      <div className="apps-main-container">
        
        {/* LEFT SIDEBAR */}
        <aside className="apps-sidebar">
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
        <main className="apps-content">
          
          {/* HEADER ROW */}
          <header className="content-header">
            <h1 className="page-heading">My Job Applications</h1>

            <div className="header-actions">
              <button className="header-icon-btn" aria-label="Search">
                <Search size={18} color="#475569" />
              </button>
              <button className="header-icon-btn" aria-label="Notifications">
                <Bell size={18} color="#475569" />
              </button>
              <button className="apply-course-btn" onClick={() => navigate('/jobs')}>
                Explore Jobs
              </button>
            </div>
          </header>

          {/* FILTER TABS */}
          <div className="filter-tabs-bar">
            {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map((status) => (
              <button
                key={status}
                className={`tab-btn ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status === 'ALL' ? `All Applications (${applications.length})` : status}
              </button>
            ))}
          </div>

          {/* APPLICATIONS LIST */}
          {loading ? (
            <div className="apps-loading-box">Loading applications...</div>
          ) : filteredApps.length === 0 ? (
            <div className="apps-empty-box">
              <FileText size={42} color="#D05249" />
              <h3>No Applications Found</h3>
              <p>You haven't applied for any jobs matching this filter status yet.</p>
              <button className="explore-btn" onClick={() => navigate('/jobs')}>Browse Available Jobs</button>
            </div>
          ) : (
            <div className="apps-list-grid">
              {filteredApps.map((app) => {
                const job = app.job || {};
                const appliedDate = app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'Recent';

                return (
                  <div key={app.id} className="application-card">
                    <div className="app-card-top">
                      <div className="company-logo-badge">
                        <Building2 size={24} color="#D05249" />
                      </div>
                      <div className="app-main-info">
                        <h3 className="job-title-text">{job.title || 'Software Engineer'}</h3>
                        <span className="company-name-text">{job.company || 'Tech Partner'}</span>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="app-card-details">
                      <span className="detail-pill"><MapPin size={14} /> {job.location || 'Remote'}</span>
                      <span className="detail-pill"><DollarSign size={14} /> {job.salary || '$150/hr'}</span>
                      <span className="detail-pill"><Clock size={14} /> Applied on {appliedDate}</span>
                    </div>

                    <div className="app-card-action">
                      <button 
                        className="view-job-btn"
                        onClick={() => navigate(`/jobs/detail/${job.id || app.jobId}`)}
                      >
                        View Job Details <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
