import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Clock, CheckCircle, Award, Play,
  Calendar, ArrowLeft, Zap, Target, Bell,
  Settings, HelpCircle, TrendingUp,
} from 'lucide-react';
import './OverviewPage.css';

/* ── Static demo data ── */
const STATS = [
  {
    label: 'Courses Enrolled',
    value: '3',
    delta: '+1 this month',
    icon: BookOpen,
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.12)',
  },
  {
    label: 'Hours Learned',
    value: '48h',
    delta: '+6h this week',
    icon: Clock,
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
  },
  {
    label: 'Lessons Done',
    value: '67',
    delta: '+5 today',
    icon: CheckCircle,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.12)',
  },
  {
    label: 'Certificates',
    value: '1',
    delta: '1 pending',
    icon: Award,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
  },
];

const COURSES = [
  {
    id: 1,
    emoji: '🐍',
    bg: 'rgba(79,70,229,0.15)',
    name: 'Python & Django REST Framework',
    meta: '12 of 18 lessons • Module 3',
    progress: 68,
  },
  {
    id: 2,
    emoji: '⚙️',
    bg: 'rgba(6,182,212,0.15)',
    name: 'High-Scale System Design',
    meta: '6 of 18 lessons • Module 2',
    progress: 34,
  },
  {
    id: 3,
    emoji: '🐳',
    bg: 'rgba(34,197,94,0.15)',
    name: 'Cloud DevOps & Kubernetes',
    meta: '2 of 16 lessons • Module 1',
    progress: 12,
  },
];

const ACTIVITIES = [
  { emoji: '▶️', bg: 'rgba(79,70,229,0.15)', action: 'Watched: Django REST Framework — Authentication', time: '2 hours ago' },
  { emoji: '✅', bg: 'rgba(34,197,94,0.15)', action: 'Completed Quiz: Python Variables & Scope', time: '5 hours ago' },
  { emoji: '📝', bg: 'rgba(245,158,11,0.15)', action: 'Saved a note at 04:32 in System Design video', time: 'Yesterday' },
  { emoji: '🏆', bg: 'rgba(168,85,247,0.15)', action: 'Earned badge: 7-Day Learning Streak!', time: 'Yesterday' },
  { emoji: '▶️', bg: 'rgba(79,70,229,0.15)', action: 'Watched: Introduction to Microservices', time: '2 days ago' },
];

const SESSIONS = [
  { day: '16', month: 'Aug', name: 'Live Q&A — Django Advanced Patterns', time: '7:00 PM IST', chip: 'Live' },
  { day: '20', month: 'Aug', name: 'Workshop — Docker & Kubernetes Hands-on', time: '6:30 PM IST', chip: 'Workshop' },
];

const QUICK_ACTIONS = [
  { icon: BookOpen, label: 'Browse Courses', path: '/' },
  { icon: Award, label: 'Certificates', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/profile' },
  { icon: HelpCircle, label: 'Help Center', path: '/' },
];

export default function OverviewPage() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="ov-root">

      {/* Navbar */}
      <nav className="ov-navbar">
        <div className="ov-brand">
          code<span>ForEveryBody</span>
        </div>
        <div className="ov-nav-actions">
          <button className="ov-notif-btn" title="Notifications">
            <Bell size={16} />
            <span className="ov-notif-dot" />
          </button>
          <button className="ov-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={14} /> Home
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="ov-content">

        {/* ── Greeting ── */}
        <div className="ov-greeting-bar">
          <div className="ov-greeting-left">
            <h1>{greeting}, Zabiulla! 👋</h1>
            <p>{today}</p>
          </div>
          <div className="ov-streak-badge">
            <span className="ov-streak-fire">🔥</span>
            <div className="ov-streak-info">
              <strong>7</strong>
              <span>Day Streak</span>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="ov-stats-row">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="ov-stat-card"
                style={{ '--stat-color': s.color, '--stat-bg': s.bg }}
              >
                <div className="ov-stat-icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="ov-stat-value">{s.value}</div>
                <div className="ov-stat-label">{s.label}</div>
                <div className="ov-stat-delta">↑ {s.delta}</div>
              </div>
            );
          })}
        </div>

        {/* ── Body grid ── */}
        <div className="ov-body-grid">

          {/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Continue Learning */}
            <div className="ov-section-card">
              <div className="ov-section-header">
                <span className="ov-section-title">
                  <TrendingUp size={16} color="#4f46e5" /> Continue Learning
                </span>
                <button className="ov-view-all" onClick={() => navigate('/')}>View all →</button>
              </div>
              <div className="ov-course-list">
                {COURSES.map((c) => (
                  <div key={c.id} className="ov-course-card">
                    <div className="ov-course-thumb" style={{ background: c.bg }}>
                      {c.emoji}
                    </div>
                    <div className="ov-course-info">
                      <div className="ov-course-name">{c.name}</div>
                      <div className="ov-course-meta">{c.meta}</div>
                      <div className="ov-progress-track">
                        <div
                          className="ov-progress-fill"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <div className="ov-progress-label">{c.progress}% complete</div>
                    </div>
                    <button
                      className="ov-play-btn"
                      onClick={() => navigate('/player')}
                      title="Resume"
                    >
                      <Play size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="ov-section-card">
              <div className="ov-section-header">
                <span className="ov-section-title">
                  <Zap size={16} color="#f59e0b" /> Recent Activity
                </span>
              </div>
              <div className="ov-activity-list">
                {ACTIVITIES.map((a, i) => (
                  <div key={i} className="ov-activity-item">
                    <div className="ov-activity-dot-wrap">
                      <div className="ov-activity-dot" style={{ background: a.bg }}>
                        {a.emoji}
                      </div>
                    </div>
                    <div className="ov-activity-text">
                      <div className="ov-activity-action">{a.action}</div>
                      <div className="ov-activity-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right col */}
          <div className="ov-right-col">

            {/* Upcoming Sessions */}
            <div className="ov-section-card">
              <div className="ov-section-header">
                <span className="ov-section-title">
                  <Calendar size={16} color="#06b6d4" /> Upcoming
                </span>
              </div>
              <div className="ov-upcoming-list">
                {SESSIONS.map((s, i) => (
                  <div key={i} className="ov-session-card">
                    <div className="ov-session-date-box">
                      <div className="ov-session-day">{s.day}</div>
                      <div className="ov-session-month">{s.month}</div>
                    </div>
                    <div>
                      <div className="ov-session-name">{s.name}</div>
                      <div className="ov-session-time">
                        <Clock size={11} /> {s.time}
                      </div>
                      <span className="ov-session-chip">{s.chip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="ov-section-card">
              <div className="ov-section-header">
                <span className="ov-section-title">
                  <Target size={16} color="#a78bfa" /> Quick Actions
                </span>
              </div>
              <div className="ov-quick-grid">
                {QUICK_ACTIONS.map((q) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={q.label}
                      className="ov-quick-btn"
                      onClick={() => navigate(q.path)}
                    >
                      <div className="ov-quick-icon">
                        <Icon size={18} />
                      </div>
                      {q.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
