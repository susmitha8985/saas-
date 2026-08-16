import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  BookOpen,
  Briefcase,
  FileCheck,
  FileText,
  Settings,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { getStoredUser, logoutUser } from '../../utils/authService';
import './AppSidebar.css';

export default function AppSidebar({ customUser, onAction }) {
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = getStoredUser();

  const user = customUser || storedUser || {
    name: 'Natashia Khaleira',
    email: 'student@codeforeverybody.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  };

  // Unified Menu Items
  const navItems = [
    { id: 'overview', name: 'Overview', icon: LayoutGrid, path: '/overview' },
    { id: 'courses', name: 'Our Courses', icon: BookOpen, path: '/courses' },
    { id: 'jobs', name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { id: 'applications', name: 'Applications', icon: FileCheck, path: '/applications' },
    { id: 'resume', name: 'Resume', icon: FileText, path: '/resume' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/profile' },
  ];

  const handleNav = (item) => {
    if (item.path && item.path !== '#') {
      navigate(item.path);
    } else if (onAction) {
      onAction(item.id);
    }
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logoutUser();
    navigate('/auth?mode=signin');
  };

  const isItemActive = (item) => {
    if (item.id === 'overview') {
      return location.pathname === '/overview';
    }
    if (item.id === 'courses') {
      return location.pathname.startsWith('/courses') || location.pathname.startsWith('/player');
    }
    if (item.id === 'jobs') {
      return location.pathname.startsWith('/jobs');
    }
    if (item.id === 'applications') {
      return location.pathname.startsWith('/applications');
    }
    if (item.id === 'resume') {
      return location.pathname.startsWith('/resume');
    }
    if (item.id === 'settings') {
      return location.pathname.startsWith('/profile');
    }
    return false;
  };

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : user?.name || (user?.email ? user.email.split('@')[0] : 'Natashia Khaleira');

  return (
    <aside className="app-sidebar-root">
      <div>
        {/* Brand Logo matching coursespage.webp */}
        <div className="app-brand-logo" onClick={() => navigate('/')} title="codeforeverybody Home">
          <svg
            className="app-logo-svg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="3.2" fill="#D9534F" />
            <circle cx="18" cy="6" r="3.2" fill="#D9534F" />
            <circle cx="6" cy="18" r="3.2" fill="#D9534F" />
            <circle cx="18" cy="18" r="3.2" fill="#D9534F" />
            <rect x="6" y="4.5" width="12" height="3" fill="#D9534F" />
            <rect x="6" y="16.5" width="12" height="3" fill="#D9534F" />
            <rect x="4.5" y="6" width="3" height="12" fill="#D9534F" />
            <rect x="16.5" y="6" width="3" height="12" fill="#D9534F" />
          </svg>
          <div className="app-brand-text">
            codeforeverybody<span className="dot">.</span>
          </div>
        </div>

        {/* Unified Navigation Items */}
        <ul className="app-nav-list">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const active = isItemActive(item);
            return (
              <li key={item.id}>
                <button
                  className={`app-nav-item ${active ? 'active' : ''}`}
                  onClick={() => handleNav(item)}
                >
                  <IconComp className="app-nav-icon" />
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom CTA & User Section */}
      <div className="app-sidebar-bottom">
        {/* Mobile App CTA Card */}
        <div className="app-mobile-cta-card">
          <svg
            className="app-cta-ill"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="34" y="66" width="32" height="6" rx="3" fill="#E08365" />
            <path d="M40 72L36 86M60 72L64 86" stroke="#4A3E3D" strokeWidth="3" strokeLinecap="round" />
            <path d="M38 52C38 46 43 40 50 40C57 40 62 46 62 52V66H38V52Z" fill="#D9534F" />
            <circle cx="50" cy="30" r="12" fill="#5C3D2E" />
            <circle cx="50" cy="32" r="10" fill="#FFCDB2" />
            <rect x="42" y="52" width="16" height="11" rx="2.5" fill="#1E1E1E" />
            <circle cx="50" cy="57.5" r="1.5" fill="#FFFFFF" />
            <path d="M60 46L66 38" stroke="#FFCDB2" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="app-cta-title">
            Download Our<br />Mobile App
          </div>
          <button
            className="app-cta-btn"
            onClick={() => alert('Mobile App link sent to your device!')}
            title="Download App"
          >
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Compact User Row with Profile & Logout */}
        <div
          className="app-user-row"
          onClick={() => navigate('/profile')}
          title="View Profile"
        >
          <div className="app-user-left">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={displayName}
              className="app-user-avatar"
            />
            <div>
              <div className="app-user-name">{displayName}</div>
              <div className="app-user-role">Student</div>
            </div>
          </div>
          <button
            className="app-logout-icon-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
