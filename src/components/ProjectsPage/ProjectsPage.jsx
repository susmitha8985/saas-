import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Bell,
  Target,
  Award,
  Briefcase,
  BookOpen,
  BarChart3,
  Plus,
  FolderKanban,
  Menu,
  X
} from 'lucide-react';
import '../../App.css';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeStatusTab, setActiveStatusTab] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="projects-wrapper">
      
      {/* MOBILE HAMBURGER MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="drawer-overlay">
          <div className="drawer-content">
            <div>
              <div className="drawer-header">
                <div className="drawer-brand">
                  <Sparkles size={22} color="#4f46e5" />
                  <span className="drawer-brand-title">CareerAI</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="icon-btn-clean">
                  <X size={24} color="#64748b" />
                </button>
              </div>

              <div className="drawer-links">
                <button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <BarChart3 size={18} /> Dashboard
                </button>
                <button onClick={() => { navigate('/learning'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <BookOpen size={18} /> Learning Path
                </button>
                <button onClick={() => { navigate('/projects'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item active">
                  <FolderKanban size={18} /> Projects
                </button>
                <button onClick={() => { navigate('/auth?mode=signin'); setIsMobileMenuOpen(false); }} className="sidebar-nav-item">
                  <Briefcase size={18} /> Applications
                </button>
              </div>
            </div>

            <button onClick={() => navigate('/')} style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="projects-sidebar">
        <div>
          <div onClick={() => navigate('/')} className="sidebar-logo">
            <div className="sidebar-logo-icon" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 6px 16px rgba(79, 70, 229, 0.35)' }}>
              <Sparkles size={22} />
            </div>
            <span className="sidebar-logo-title">
              Career<span style={{ color: '#4f46e5' }}>AI</span>
            </span>
          </div>

          <div className="sidebar-nav-group">
            {[
              { label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
              { label: 'Applications', icon: Briefcase, path: '/auth?mode=signin' },
              { label: 'Internships', icon: Target, path: '/auth?mode=signin' },
              { label: 'Learning', icon: BookOpen, path: '/learning' },
              { label: 'Projects', icon: FolderKanban, path: '/projects', active: true },
              { label: 'Career Roadmap', icon: Award, path: '/auth?mode=signin' }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className="sidebar-nav-item"
                  style={{
                    background: item.active ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                    color: item.active ? '#4f46e5' : '#64748b',
                    fontWeight: item.active ? 700 : 600
                  }}
                >
                  <IconComp size={18} color={item.active ? '#4f46e5' : '#64748b'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GitHub Integration Badge */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '18px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>GitHub Connected</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.6rem' }}>arjunmehta-dev</div>
          <span style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a', fontWeight: 700, fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '999px' }}>
            Connected
          </span>
        </div>
      </aside>

      {/* MAIN PROJECTS CONTENT */}
      <main className="projects-main">
        
        {/* HEADER BAR */}
        <header className="learning-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="icon-btn-clean"
              style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '10px' }}
            >
              <Menu size={20} color="#0f172a" />
            </button>
            <div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>Projects</h1>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>Build real-world projects, track progress and showcase your skills.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div className="search-input-wrap">
              <input
                type="text"
                placeholder="Search projects, skills, tools..."
                className="search-input"
              />
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>

            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} color="#64748b" />
            </div>

            <div className="user-profile-bar">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Arjun"
                className="user-profile-img"
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a', lineHeight: 1.2 }}>Arjun Mehta</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Data Science Student</div>
              </div>
            </div>
          </div>
        </header>

        {/* TOP FILTER & SEARCH CONTROLS */}
        <div className="projects-filter-bar">
          
          {/* Status Tabs */}
          <div className="status-tabs-container">
            {[
              { id: 'all', label: 'All Projects', count: 12 },
              { id: 'progress', label: 'In Progress', count: 5 },
              { id: 'completed', label: 'Completed', count: 4 },
              { id: 'notstarted', label: 'Not Started', count: 3 }
            ].map((tab) => {
              const isActive = activeStatusTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStatusTab(tab.id)}
                  className={`status-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{tab.label}</span>
                  <span style={{
                    background: isActive ? '#4f46e5' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#64748b',
                    fontSize: '0.75rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '999px',
                    fontWeight: 700
                  }}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Difficulty & Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <select style={{ padding: '0.55rem 0.85rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.85rem', fontWeight: 600, color: '#475569', outline: 'none' }}>
              <option>Difficulty: All</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <button
              onClick={() => alert('Creating New Project...')}
              className="gradient-btn"
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Plus size={16} /> New Project
            </button>
          </div>
        </div>

        {/* LOWER GRID LAYOUT */}
        <div className="projects-grid-layout">
          
          {/* Left Column: Project Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                title: 'Sales Dashboard Analytics',
                featured: true,
                desc: 'Interactive dashboard to analyze sales performance and customer insights.',
                tags: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
                progress: 75,
                status: 'In Progress',
                statusBg: 'rgba(59, 130, 246, 0.1)',
                statusColor: '#3b82f6',
                imgBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                updated: 'Updated 2 days ago'
              },
              {
                title: 'Customer Churn Prediction',
                featured: false,
                desc: 'Machine learning model to predict customer churn in telecom industry.',
                tags: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
                progress: 40,
                status: 'In Progress',
                statusBg: 'rgba(59, 130, 246, 0.1)',
                statusColor: '#3b82f6',
                imgBg: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
                updated: 'Updated 5 days ago'
              },
              {
                title: 'Movie Recommendation System',
                featured: false,
                desc: 'Content-based filtering recommendation system using ML and NLP.',
                tags: ['Python', 'NLP', 'Scikit-learn', 'Cosine Similarity'],
                progress: 100,
                status: 'Completed 🏆',
                statusBg: 'rgba(22, 163, 74, 0.1)',
                statusColor: '#16a34a',
                imgBg: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
                updated: 'Completed on May 18, 2026'
              },
              {
                title: 'Image Classification with CNN',
                featured: false,
                desc: 'Deep learning model to classify images using Convolutional Neural Networks.',
                tags: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
                progress: 60,
                status: 'In Review',
                statusBg: 'rgba(245, 158, 11, 0.1)',
                statusColor: '#d97706',
                imgBg: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
                updated: 'Submitted on May 20, 2026'
              }
            ].map((p, idx) => (
              <div key={idx} className="project-card-item">
                {/* Visual Thumbnail */}
                <div className="project-thumbnail" style={{ background: p.imgBg }}>
                  <FolderKanban size={36} opacity={0.8} />
                </div>

                {/* Info Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{p.title}</h3>
                      {p.featured && (
                        <span style={{ background: 'rgba(79,70,229,0.1)', color: '#4f46e5', fontWeight: 700, fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <span style={{ background: p.statusBg, color: p.statusColor, fontWeight: 700, fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '999px' }}>
                      {p.status}
                    </span>
                  </div>

                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {p.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {p.tags.map((t, i) => (
                      <span key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Progress & GitHub Button */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, maxWidth: '200px' }}>
                      <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${p.progress}%`, height: '100%', background: p.statusColor, borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginTop: '0.2rem', display: 'block' }}>
                        {p.progress}% Complete
                      </span>
                    </div>

                    <button
                      onClick={() => alert(`Opening GitHub for ${p.title}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: '#0f172a',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> GitHub
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Analytics & Mentor Feedback */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Project Overview Stats */}
            <div className="card-panel">
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Project Overview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>12</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Projects</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3b82f6' }}>5</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>In Progress</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16a34a' }}>4</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Completed</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#94a3b8' }}>3</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Not Started</div>
                </div>
              </div>
            </div>

            {/* Mentor Feedback Widget */}
            <div className="card-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Latest Mentor Feedback</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>View All</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '14px', borderLeft: '3px solid #4f46e5' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Dr. Neha Sharma</div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0.4rem' }}>
                    "Great progress on the dashboard! Try optimizing queries for better performance."
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5' }}>
                    <span>Sales Dashboard Analytics</span>
                    <span>4.5 ★</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
