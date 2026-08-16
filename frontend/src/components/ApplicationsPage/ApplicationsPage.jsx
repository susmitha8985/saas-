import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck,
  Briefcase,
  Clock,
  CheckCircle,
  ExternalLink,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import AppSidebar from '../common/AppSidebar';
import { getStoredUser } from '../../utils/authService';
import { getMyApplications } from '../../utils/applicationService';
import { useSEO } from '../../utils/seo';
import './ApplicationsPage.css';

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'My Job Applications - codeforeverybody',
    description: 'Track the status and timeline of your submitted job applications on codeforeverybody.',
  });

  useEffect(() => {
    async function load() {
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
    load();
  }, [storedUser?.id]);

  const filteredApps = applications.filter((app) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return app.status === 'PENDING';
    if (activeTab === 'reviewed') return app.status === 'REVIEWED';
    if (activeTab === 'accepted') return app.status === 'ACCEPTED';
    return true;
  });

  return (
    <div className="ap-page-container">
      <div className="ap-dashboard-frame">
        {/* Unified App Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="ap-main-content">
          {/* Header Row */}
          <div className="ap-header-row">
            <div>
              <h1 className="ap-page-title">My Job Applications</h1>
              <p className="ap-page-sub">Monitor all your submitted tech job applications and review feedback.</p>
            </div>
            <button
              className="ap-view-btn"
              style={{ backgroundColor: '#D9534F', color: '#FFFFFF', fontWeight: '700', border: 'none' }}
              onClick={() => navigate('/jobs')}
            >
              <Sparkles size={16} /> Browse New Jobs
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="ap-tabs-row">
            <button
              className={`ap-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Applications ({applications.length})
            </button>
            <button
              className={`ap-tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Review
            </button>
            <button
              className={`ap-tab-btn ${activeTab === 'reviewed' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviewed')}
            >
              Under Review
            </button>
            <button
              className={`ap-tab-btn ${activeTab === 'accepted' ? 'active' : ''}`}
              onClick={() => setActiveTab('accepted')}
            >
              Shortlisted / Accepted
            </button>
          </div>

          {/* Applications List */}
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#78746D' }}>
              Loading applications...
            </div>
          ) : filteredApps.length > 0 ? (
            <div className="ap-grid">
              {filteredApps.map((app) => {
                const job = app.job || {};
                const appliedDate = app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : 'Recent';

                return (
                  <div key={app.id} className="ap-card">
                    <div className="ap-card-left">
                      <img
                        src={job.companyLogo || 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png'}
                        alt={job.company || 'Company'}
                        className="ap-card-logo"
                      />
                      <div>
                        <h3 className="ap-card-title">{job.title || 'Software Developer'}</h3>
                        <div className="ap-card-company">
                          {job.company || 'Tech Recruiter'} • {job.location || 'Remote'} • Applied {appliedDate}
                        </div>
                      </div>
                    </div>

                    <div className="ap-card-right">
                      <span className={`ap-status-badge ap-status-${(app.status || 'pending').toLowerCase()}`}>
                        {app.status || 'PENDING'}
                      </span>
                      <button
                        className="ap-view-btn"
                        onClick={() => navigate('/jobs')}
                      >
                        View Job <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="ap-empty-state">
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#FEE2E2', color: '#D9534F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={28} />
              </div>
              <h3 className="ap-empty-title">No job applications yet</h3>
              <p className="ap-empty-desc">
                Explore our tech jobs portal and submit applications to start tracking your interviews here!
              </p>
              <button
                className="ap-view-btn"
                style={{ backgroundColor: '#D9534F', color: '#FFFFFF', marginTop: '10px' }}
                onClick={() => navigate('/jobs')}
              >
                Explore Open Positions
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
