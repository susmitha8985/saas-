import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  User,
  FileText,
  Mail,
  Info,
  ChevronDown
} from 'lucide-react';

import { logoutUser, getStoredUser } from '../../utils/authService';

export default function Sidebar({ user, activeTab, onTabChange, collapsed = false }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = getStoredUser();

  const handleLogout = () => {
    logoutUser();
    setShowUserMenu(false);
    navigate('/auth?mode=signin');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'Applications', icon: FileText, path: '/applications' },
    { name: 'Contact', icon: Mail, path: '#' },
    { name: 'About', icon: Info, path: '#' },
  ];

  return (
    <aside className={`profile-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Logo */}
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <div className="logo-brand-name">
          codefor<span>everybody</span>
        </div>
      </div>

      {/* Navigation List */}
      <ul className="sidebar-nav-list">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && item.path !== '#' && location.pathname.startsWith(item.path)) ||
            (item.name === 'My Profile' && activeTab === 'My Profile');
          return (
            <li key={item.name}>
              <a
                href={item.path}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.path && item.path !== '#') {
                    navigate(item.path);
                  } else if (onTabChange) {
                    onTabChange(item.name);
                  }
                }}
              >
                <div className="sidebar-nav-left">
                  <IconComp className="sidebar-icon" />
                  <span>{item.name}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {/* User Profile Card & Popover in Sidebar */}
      <div className="sidebar-user-wrapper">
        {showUserMenu && (
          <div className="user-menu-popover">
            <button
              className="user-menu-item active"
              onClick={() => {
                setShowUserMenu(false);
                navigate('/profile');
              }}
            >
              My Profile
            </button>
            <button
              className="user-menu-item"
              onClick={() => {
                setShowUserMenu(false);
                navigate('/jobs');
              }}
            >
              Jobs Portal
            </button>
            <button
              className="user-menu-item"
              onClick={() => {
                setShowUserMenu(false);
                navigate('/player');
              }}
            >
              Course Player
            </button>
            <button
              className="user-menu-item logout-btn"
              onClick={handleLogout}
              style={{ color: '#EF4444', fontWeight: '600' }}
            >
              Log Out
            </button>
          </div>
        )}

        <div
          className="sidebar-user-pill"
          onClick={() => setShowUserMenu(!showUserMenu)}
          title="Click for profile options"
        >
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt="User avatar"
            className="sidebar-avatar"
          />
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.name || storedUser?.name || 'Natashia Khaleira'}
            </span>
            <span className="sidebar-user-email">
              {user?.email || storedUser?.email || 'student@codeforeverybody.com'}
            </span>
          </div>
          <ChevronDown size={16} color="#64748B" />
        </div>
      </div>
    </aside>
  );
}
