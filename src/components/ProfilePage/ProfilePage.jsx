import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Edit3, Camera, Mail, Phone, MapPin,
  Shield, Bell, Lock, Trash2, Award, BookOpen,
  TrendingUp, CheckCircle, Save,
} from 'lucide-react';
import './ProfilePage.css';

const SKILLS = ['Python', 'Django', 'FastAPI', 'React', 'System Design', 'DevOps', 'PostgreSQL', 'Docker'];

const BADGES = [
  { emoji: '🚀', name: 'First Course' },
  { emoji: '🔥', name: '7-Day Streak' },
  { emoji: '🧠', name: 'Quiz Master' },
  { emoji: '🐍', name: 'Python Pro' },
  { emoji: '⭐', name: 'Top Learner' },
  { emoji: '🏆', name: 'Finisher' },
];

const MINI_COURSES = [
  { emoji: '🐍', bg: 'rgba(79,70,229,0.15)', name: 'Python & Django REST', pct: 68 },
  { emoji: '⚙️', bg: 'rgba(6,182,212,0.15)', name: 'High-Scale System Design', pct: 34 },
  { emoji: '🐳', bg: 'rgba(34,197,94,0.15)', name: 'Cloud DevOps & Kubernetes', pct: 12 },
];

const TOGGLES = [
  { label: 'Email Notifications', sub: 'Lesson reminders, streaks, announcements', default: true },
  { label: 'Newsletter', sub: 'Weekly tips and course updates', default: true },
  { label: 'Two-Factor Authentication', sub: 'Extra security for your account', default: false },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: 'Shaik Zabiulla',
    email: 'shaik.zabi@example.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    bio: 'Passionate full-stack developer learning backend architecture and system design at codeforeverybody.',
  });

  const [toggles, setToggles] = useState(TOGGLES.map((t) => t.default));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="pf-root">

      {/* Navbar */}
      <nav className="pf-navbar">
        <div className="pf-brand">code<span>ForEveryBody</span></div>
        <button className="pf-back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={14} /> Home
        </button>
      </nav>

      {/* Hero */}
      <div className="pf-hero">
        <div className="pf-hero-glow" />
        <div className="pf-hero-glow-2" />
        <div className="pf-hero-inner">
          <div className="pf-avatar-wrap">
            <div className="pf-avatar">SZ</div>
            <button className="pf-avatar-edit" title="Change photo">
              <Camera size={12} />
            </button>
          </div>

          <div className="pf-hero-info">
            <div className="pf-user-name">{form.name}</div>
            <div className="pf-user-role">Full Stack Developer · Student</div>
            <div className="pf-user-meta">
              <span className="pf-meta-chip"><Mail size={12} />{form.email}</span>
              <span className="pf-meta-chip"><MapPin size={12} />{form.location}</span>
              <span className="pf-meta-chip"><CheckCircle size={12} />Member since Aug 2026</span>
            </div>
          </div>

          <button className="pf-edit-profile-btn">
            <Edit3 size={14} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="pf-body">

        {/* ── LEFT COLUMN ── */}
        <div className="pf-left-col">

          {/* Personal Info */}
          <div className="pf-card">
            <div className="pf-card-title">
              <Shield size={16} color="#4f46e5" /> Personal Information
            </div>
            <div className="pf-info-grid">
              <div className="pf-field">
                <label className="pf-label">Full Name</label>
                <input
                  className="pf-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="pf-field">
                <label className="pf-label">Email Address</label>
                <input
                  className="pf-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="pf-field">
                <label className="pf-label">Phone</label>
                <input
                  className="pf-input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="pf-field">
                <label className="pf-label">Location</label>
                <input
                  className="pf-input"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div className="pf-field full">
                <label className="pf-label">Bio</label>
                <textarea
                  className="pf-input pf-textarea"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>
            </div>
            <button className="pf-save-btn" onClick={handleSave}>
              <Save size={14} /> {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>

          {/* Skills */}
          <div className="pf-card">
            <div className="pf-card-title">
              <TrendingUp size={16} color="#7c3aed" /> Skills &amp; Interests
            </div>
            <div className="pf-skill-tags">
              {SKILLS.map((s) => (
                <span key={s} className="pf-skill-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="pf-card">
            <div className="pf-card-title">
              <Bell size={16} color="#f59e0b" /> Account Settings
            </div>

            {TOGGLES.map((t, i) => (
              <div key={t.label} className="pf-toggle-row">
                <div>
                  <div className="pf-toggle-label">{t.label}</div>
                  <div className="pf-toggle-sub">{t.sub}</div>
                </div>
                <label className="pf-toggle">
                  <input
                    type="checkbox"
                    checked={toggles[i]}
                    onChange={() => {
                      const next = [...toggles];
                      next[i] = !next[i];
                      setToggles(next);
                    }}
                  />
                  <span className="pf-toggle-slider" />
                </label>
              </div>
            ))}

            <button className="pf-pwd-btn">
              <Lock size={14} /> Change Password
            </button>

            <div className="pf-danger-zone">
              <div>
                <div className="pf-danger-title">Danger Zone</div>
                <div className="pf-danger-sub">Permanently delete your account and all data.</div>
              </div>
              <button className="pf-delete-btn">
                <Trash2 size={13} /> Delete Account
              </button>
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="pf-right-col">

          {/* Learning Stats */}
          <div className="pf-card">
            <div className="pf-card-title">
              <TrendingUp size={16} color="#22c55e" /> Learning Stats
            </div>
            <div className="pf-stats-grid">
              {[
                { val: '3', label: 'Courses' },
                { val: '48h', label: 'Hours' },
                { val: '67', label: 'Lessons' },
                { val: '🔥 7', label: 'Day Streak' },
              ].map((s) => (
                <div key={s.label} className="pf-stat-mini">
                  <div className="pf-stat-mini-val">{s.val}</div>
                  <div className="pf-stat-mini-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="pf-ring-wrap">
              <div className="pf-ring">
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <circle className="pf-ring-bg" cx="30" cy="30" r="25" />
                  <circle className="pf-ring-fill" cx="30" cy="30" r="25" />
                </svg>
                <div className="pf-ring-text">78%</div>
              </div>
              <div>
                <div className="pf-ring-label">Completion Rate</div>
                <div className="pf-ring-sub">Avg. across all courses</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="pf-card">
            <div className="pf-card-title">
              <Award size={16} color="#f59e0b" /> Achievements
            </div>
            <div className="pf-badges-grid">
              {BADGES.map((b) => (
                <div key={b.name} className="pf-badge">
                  <span className="pf-badge-emoji">{b.emoji}</span>
                  <span className="pf-badge-name">{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="pf-card">
            <div className="pf-card-title">
              <BookOpen size={16} color="#06b6d4" /> Enrolled Courses
            </div>
            {MINI_COURSES.map((c) => (
              <div key={c.name} className="pf-mini-course">
                <div className="pf-mini-emoji" style={{ background: c.bg }}>{c.emoji}</div>
                <div className="pf-mini-info">
                  <div className="pf-mini-name">{c.name}</div>
                  <div className="pf-mini-bar">
                    <div className="pf-mini-fill" style={{ width: `${c.pct}%` }} />
                  </div>
                  <div className="pf-mini-pct">{c.pct}%</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
