import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  FileText,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Video,
  BarChart3,
  FolderKanban,
  Settings,
  Check,
  Calendar,
  Share2,
  Edit3,
  ChevronDown,
  ChevronRight,
  Book,
  PlayCircle,
  FileCode,
  CheckCircle2,
  Sparkle,
  MessageSquare
} from 'lucide-react';
import '../../App.css';
import './CareerRoadmapPage.css';

export default function CareerRoadmapPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const roadmapPhases = [
    {
      step: '01',
      title: 'Foundations',
      desc: 'Learn the fundamentals of programming, math and statistics.',
      status: 'Completed',
      pct: '100%',
      skills: ['Python', 'Statistics', 'Linear Algebra', 'Probability'],
      statusType: 'completed'
    },
    {
      step: '02',
      title: 'Data Handling & Analysis',
      desc: 'Work with data and learn analysis techniques.',
      status: 'In Progress',
      pct: '60%',
      skills: ['Pandas', 'NumPy', 'SQL', 'EDA'],
      statusType: 'progress'
    },
    {
      step: '03',
      title: 'Machine Learning',
      desc: 'Learn core ML algorithms and model training.',
      status: 'In Progress',
      pct: '30%',
      skills: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'],
      statusType: 'progress'
    },
    {
      step: '04',
      title: 'Deep Learning',
      desc: 'Deep neural networks and advanced DL concepts.',
      status: 'Upcoming',
      pct: '0%',
      skills: ['Neural Networks', 'CNN', 'RNN', 'TensorFlow'],
      statusType: 'upcoming'
    },
    {
      step: '05',
      title: 'Data Visualization & Storytelling',
      desc: 'Visualize date and communicate insights effectively.',
      status: 'Upcoming',
      pct: '0%',
      skills: ['Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
      statusType: 'upcoming'
    },
    {
      step: '06',
      title: 'Deployment & MLOps',
      desc: 'Deploy models and learn MLOps best practices.',
      status: 'Not Started',
      pct: '0%',
      skills: ['Docker', 'FastAPI', 'MLflow', 'AWS'],
      statusType: 'notstarted'
    }
  ];

  return (
    <div className="roadmap-page-wrapper">
      
      {/* Toast Notification */}
      {toast && (
        <div className="roadmap-toast">
          <Sparkles size={18} color="#38bdf8" />
          <span>{toast}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="roadmap-top-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.1rem' }}>Career Roadmap</h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Your personalized path to become a Data Scientist</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button onClick={() => showNotification('Opening Goal Configurator...')} className="secondary-action-btn">
            <Edit3 size={15} /> Edit Goal
          </button>

          <button onClick={() => showNotification('Copied Roadmap Link!')} className="secondary-action-btn">
            <Share2 size={15} /> Share Roadmap
          </button>

          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
            <button className="icon-round-btn"><Calendar size={18} color="#64748b" /></button>
          </div>

          <div className="user-avatar-pill">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" alt="Arjun" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', lineHeight: 1.1 }}>Arjun Mehta</div>
              <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Data Science Student</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN TWO COLUMN GRID */}
      <div className="roadmap-main-grid">
        
        {/* LEFT COLUMN WORKSPACE */}
        <div className="roadmap-workspace">
          
          {/* Top Goal Summary Banner */}
          <div className="goal-summary-banner">
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="target-icon-box">
                <Target size={28} color="#4f46e5" />
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Your Career Goal</div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0.1rem 0' }}>Data Scientist</h2>
                <p style={{ fontSize: '0.825rem', color: '#475569', margin: 0 }}>Build end-to-end skills to work as a data scientist in top tech companies.</p>
              </div>
            </div>

            {/* Metrics Chips */}
            <div className="goal-metrics-row">
              <div className="goal-metric-chip">
                <span className="metric-title">Total Duration</span>
                <span className="metric-val">12 - 14 Months</span>
              </div>
              <div className="goal-metric-chip">
                <span className="metric-title">Milestones</span>
                <span className="metric-val">6 Phases</span>
              </div>
              <div className="goal-metric-chip">
                <span className="metric-title">Skills to Learn</span>
                <span className="metric-val">28 Skills</span>
              </div>
              <div className="goal-metric-chip">
                <span className="metric-title">Projects</span>
                <span className="metric-val">8 Projects</span>
              </div>
              <div className="goal-metric-chip">
                <span className="metric-title">Certifications</span>
                <span className="metric-val">6 Certificates</span>
              </div>
            </div>
          </div>

          {/* 6 ROADMAP PHASES TIMELINE TABLE */}
          <div className="card-box-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Learning Path Milestones</h3>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>Expand All ˆ</span>
            </div>

            <div className="phases-list-table">
              {roadmapPhases.map((phase, idx) => (
                <div key={idx} className={`phase-row-card ${phase.statusType}`}>
                  <div className="phase-num-circle">{phase.step}</div>

                  <div className="phase-info-col">
                    <h4 className="phase-title">{phase.title}</h4>
                    <p className="phase-desc">{phase.desc}</p>
                  </div>

                  <div className="phase-status-col">
                    <span className={`status-pill ${phase.statusType}`}>{phase.status}</span>
                    <div className="phase-progress-bar">
                      <div className="phase-progress-fill" style={{ width: phase.pct }} />
                    </div>
                  </div>

                  <div className="phase-skills-col">
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', marginBottom: '0.2rem' }}>Key Skills</div>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {phase.skills.map((sk, i) => (
                        <span key={i} className="skill-chip">{sk}</span>
                      ))}
                    </div>
                  </div>

                  <div className="phase-resources-col">
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>Resources</span>
                    <div style={{ display: 'flex', gap: '0.4rem', color: '#64748b', marginTop: '0.2rem' }}>
                      <Book size={14} />
                      <PlayCircle size={14} />
                      <FileCode size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Milestone Banner */}
            <div className="final-milestone-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🏆</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Final Milestone</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Build a strong portfolio and land your dream role as a Data Scientist!</div>
                </div>
              </div>
              <span className="dream-job-badge">Dream Job 🎉</span>
            </div>
          </div>

          {/* MILESTONE HIGHLIGHTS CAROUSEL */}
          <div className="card-box-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Milestone Highlights</h3>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>View All Milestones →</span>
            </div>

            <div className="highlights-grid">
              {[
                { title: 'Python Programming Mastery', status: 'Completed', date: 'May 12, 2024', done: true },
                { title: 'Exploratory Data Analysis Project', status: 'Completed', date: 'Jun 18, 2024', done: true },
                { title: 'Machine Learning Model Builder', status: 'In Progress 60%', date: 'Jul 10, 2024', current: true },
                { title: 'Deep Learning Specialization', status: 'Upcoming', date: 'Sep 2024' },
                { title: 'End-to-End Project Deployment', status: 'Upcoming', date: 'Nov 2024' },
                { title: 'Job Ready Data Scientist', status: 'Upcoming', date: 'Dec 2024' }
              ].map((h, i) => (
                <div key={i} className={`highlight-card ${h.done ? 'done' : h.current ? 'current' : ''}`}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: h.done ? '#16a34a' : h.current ? '#4f46e5' : '#64748b', marginBottom: '0.3rem' }}>
                    {h.done ? '✓ Completed' : h.current ? '• Current' : 'Upcoming'}
                  </div>
                  <h4 style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.4rem' }}>{h.title}</h4>
                  <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{h.date}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL INSPECTOR */}
        <div className="roadmap-right-panel">
          
          {/* Your Progress Dial */}
          <div className="card-box-panel" style={{ textAlign: 'center' }}>
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Your Progress</h4>

            <div className="progress-arc-gauge">
              <span className="arc-num">46%</span>
              <span className="arc-sub">Overall Progress</span>
            </div>

            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#4f46e5', margin: '0.6rem 0' }}>
              You're doing great! Keep going 🚀
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left', fontSize: '0.775rem', color: '#64748b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>🟢 Completed</span>
                <span style={{ fontWeight: 800, color: '#16a34a' }}>12 (30%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>🔵 In Progress</span>
                <span style={{ fontWeight: 800, color: '#3b82f6' }}>7 (17%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>🟡 Upcoming</span>
                <span style={{ fontWeight: 800, color: '#d97706' }}>15 (37%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>⚪ Not Started</span>
                <span style={{ fontWeight: 800, color: '#94a3b8' }}>6 (16%)</span>
              </div>
            </div>

            <button onClick={() => showNotification('Opening Detailed Progress Breakdown...')} className="view-detailed-link">
              View Detailed Progress →
            </button>
          </div>

          {/* AI Recommendations */}
          <div className="card-box-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
              <Sparkles size={16} color="#7c3aed" />
              <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>AI Recommendations</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="ai-rec-item">
                <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0f172a' }}>Focus on SQL</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0.3rem' }}>Improve your SQL skills. It's in high demand for data roles.</div>
                <span className="impact-tag high">High Impact</span>
              </div>

              <div className="ai-rec-item">
                <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0f172a' }}>Build More Projects</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0.3rem' }}>Hands-on projects boost your profile and confidence.</div>
                <span className="impact-tag high">High Impact</span>
              </div>

              <div className="ai-rec-item">
                <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0f172a' }}>Learn MLOps Basics</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0.3rem' }}>Understand deployment to stand out in interviews.</div>
                <span className="impact-tag medium">Medium Impact</span>
              </div>
            </div>

            <button onClick={() => showNotification('Viewing all recommendations...')} className="view-detailed-link" style={{ marginTop: '0.75rem' }}>
              View All Recommendations →
            </button>
          </div>

          {/* Career Timeline */}
          <div className="card-box-panel">
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.85rem' }}>Career Timeline</h4>

            <div className="career-timeline-list">
              {[
                { time: '0-3 Months', text: 'Build strong foundations' },
                { time: '4-6 Months', text: 'Work on data analysis & ML basics' },
                { time: '7-9 Months', text: 'Master ML & start deep learning' },
                { time: '10-12 Months', text: 'Deploy projects & build portfolio' },
                { time: '12+ Months', text: 'Apply and land your dream role!' }
              ].map((t, idx) => (
                <div key={idx} className="timeline-node-item">
                  <div className="node-dot" />
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5' }}>{t.time}</div>
                    <div style={{ fontSize: '0.775rem', color: '#475569', fontWeight: 600 }}>{t.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => showNotification('Opening Full Timeline View...')} className="view-detailed-link" style={{ marginTop: '0.75rem' }}>
              View Full Timeline →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
