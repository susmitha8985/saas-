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
  Download,
  Plus,
  RotateCcw,
  RotateCw,
  Eye,
  Bell,
  User,
  CheckCircle2,
  Lock,
  ChevronDown,
  Globe,
  Mail,
  Phone,
  MapPin,
  Printer
} from 'lucide-react';
import '../../App.css';
import './ResumeBuilderPage.css';

const Github = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const Linkedin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

export default function ResumeBuilderPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('Modern Pro');
  const [selectedColor, setSelectedColor] = useState('#0f172a');
  const [toast, setToast] = useState(null);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const sectionsList = [
    { id: 'personal', name: 'Personal Information', completed: true },
    { id: 'summary', name: 'Summary', completed: true },
    { id: 'education', name: 'Education', completed: true },
    { id: 'experience', name: 'Experience', completed: true },
    { id: 'skills', name: 'Skills', completed: true },
    { id: 'projects', name: 'Projects', completed: true },
    { id: 'certifications', name: 'Certifications', completed: true },
    { id: 'achievements', name: 'Achievements', completed: false, optional: true },
    { id: 'languages', name: 'Languages', completed: false, optional: true }
  ];

  return (
    <div className="resume-builder-wrapper">
      
      {/* Toast Notification */}
      {toast && (
        <div className="builder-toast">
          <Sparkles size={18} color="#38bdf8" />
          <span>{toast}</span>
        </div>
      )}

      {/* TOP BAR */}
      <header className="builder-top-header">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.1rem' }}>AI Resume Builder</h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Create an ATS-optimized resume that gets you noticed.</p>
        </div>

        {/* Step Indicator */}
        <div className="builder-steps-indicator">
          {[
            { num: 1, label: 'Build' },
            { num: 2, label: 'Optimize' },
            { num: 3, label: 'Review' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`step-indicator-btn ${activeStep === s.num ? 'active' : ''}`}
            >
              <span className="step-num">{s.num}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={14} /> All changes saved
          </span>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button className="icon-action-btn" title="Undo"><RotateCcw size={16} /></button>
            <button className="icon-action-btn" title="Redo"><RotateCw size={16} /></button>
          </div>

          <button onClick={() => showNotification('Opening Print Preview...')} className="secondary-action-btn">
            <Eye size={16} /> Preview
          </button>

          <button onClick={() => showNotification('Exporting PDF...')} className="primary-export-btn">
            Export <ArrowRight size={16} />
          </button>

          <div className="user-avatar-pill">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" alt="Arjun" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', lineHeight: 1.1 }}>Arjun Mehta</div>
              <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Data Science Student</div>
            </div>
          </div>
        </div>
      </header>

      {/* THREE COLUMN MAIN BODY */}
      <div className="builder-main-grid">
        
        {/* LEFT COLUMN: Section Editor & AI Booster */}
        <div className="builder-left-col">
          
          <div className="card-box-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Section Editor</h3>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>Reorder Sections</span>
            </div>
            <p style={{ fontSize: '0.775rem', color: '#64748b', marginBottom: '1rem' }}>Click on a section to edit its content.</p>

            <div className="sections-list-group">
              {sectionsList.map((sec) => (
                <div key={sec.id} className="section-list-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div className="section-icon-wrap">
                      <FileText size={16} color="#4f46e5" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{sec.name}</div>
                      <div style={{ fontSize: '0.725rem', color: sec.completed ? '#16a34a' : '#94a3b8' }}>
                        {sec.completed ? 'Completed' : 'Optional'}
                      </div>
                    </div>
                  </div>

                  {sec.completed ? (
                    <CheckCircle2 size={16} color="#16a34a" />
                  ) : (
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                  )}
                </div>
              ))}
            </div>

            <button onClick={() => showNotification('Opening section picker...')} className="add-section-btn">
              <Plus size={16} /> Add Section
            </button>
          </div>

          {/* AI Write Assistant */}
          <div className="ai-assistant-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Sparkles size={18} color="#7c3aed" />
              <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>AI Write Assistant</h4>
            </div>
            <p style={{ fontSize: '0.775rem', color: '#64748b', marginBottom: '0.85rem' }}>Generate bullet points, professional summaries, and keywords.</p>
            <button onClick={() => showNotification('AI Generating Bullet Points...')} className="ai-generate-btn">
              Generate with AI <Sparkles size={14} />
            </button>
          </div>

          {/* Resume Versions */}
          <div className="card-box-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Resume Versions</h4>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>View all</span>
            </div>

            <div className="versions-list">
              <div className="version-item active">
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0f172a' }}>Data Scientist Resume</div>
                  <div style={{ fontSize: '0.725rem', color: '#64748b' }}>May 20, 2026 • 10:50 AM</div>
                </div>
                <span className="latest-badge">Latest</span>
              </div>

              <div className="version-item">
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0f172a' }}>ML Engineer Resume</div>
                  <div style={{ fontSize: '0.725rem', color: '#64748b' }}>May 18, 2026 • 2:45 PM</div>
                </div>
              </div>
            </div>

            <button onClick={() => showNotification('Creating new resume version...')} className="new-version-btn">
              <Plus size={14} /> New Version
            </button>
          </div>

        </div>

        {/* MIDDLE COLUMN: Live Interactive Document Editor */}
        <div className="builder-middle-col">
          
          {/* Editor Controls Bar */}
          <div className="document-controls-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Template:</span>
              <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="template-select-dropdown">
                <option value="Modern Pro">Modern Pro</option>
                <option value="Clean Minimal">Clean Minimal</option>
                <option value="Tech Focused">Tech Focused</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            {/* Color Swatch Picker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {['#0f172a', '#0284c7', '#059669', '#7c3aed', '#dc2626'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`color-swatch-dot ${selectedColor === color ? 'selected' : ''}`}
                  style={{ background: color }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <select className="template-select-dropdown" style={{ width: '100px' }}>
                <option>Fit Width</option>
                <option>100%</option>
                <option>75%</option>
              </select>
            </div>
          </div>

          {/* LIVE RESUME DOCUMENT PREVIEW */}
          <div className="live-document-canvas">
            <div className="resume-sheet-preview">
              
              {/* Left Column in Document */}
              <div className="resume-doc-sidebar" style={{ background: selectedColor }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces" alt="Arjun" className="resume-doc-photo" />
                
                <h2 className="resume-doc-name">Arjun Mehta</h2>
                <div className="resume-doc-title">Data Science Student</div>

                <div className="resume-doc-contact">
                  <div>✉️ arjun.mehta@email.com</div>
                  <div>📞 +91 98765 43210</div>
                  <div>📍 Bangalore, India</div>
                  <div>🔗 linkedin.com/in/arjunmehta</div>
                  <div>💻 github.com/arjunmehta</div>
                </div>

                <div className="resume-doc-section">
                  <h3 className="resume-doc-sec-title">SKILLS</h3>
                  {[
                    { name: 'Python', pct: '90%' },
                    { name: 'Machine Learning', pct: '85%' },
                    { name: 'SQL', pct: '80%' },
                    { name: 'Deep Learning', pct: '75%' },
                    { name: 'Data Analysis', pct: '85%' },
                    { name: 'TensorFlow', pct: '80%' },
                    { name: 'Pandas & NumPy', pct: '90%' },
                    { name: 'Power BI', pct: '75%' }
                  ].map((sk, i) => (
                    <div key={i} style={{ marginBottom: '0.4rem' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#e2e8f0' }}>{sk.name}</div>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: sk.pct, height: '100%', background: '#38bdf8' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="resume-doc-section">
                  <h3 className="resume-doc-sec-title">EDUCATION</h3>
                  <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#ffffff' }}>B.Tech in Computer Science</div>
                  <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>RV College of Engineering</div>
                  <div style={{ fontSize: '0.675rem', color: '#94a3b8' }}>2022 - 2026 • CGPA: 8.7/10</div>
                </div>
              </div>

              {/* Right Column in Document */}
              <div className="resume-doc-main">
                <div className="resume-doc-block">
                  <h3 className="resume-doc-heading">PROFESSIONAL SUMMARY</h3>
                  <p className="resume-doc-text">
                    Passionate Data Science student with hands-on experience in machine learning, data analysis, and building end-to-end data-driven solutions. Strong foundation in Python, SQL, and ML algorithms with a keen interest in solving real-world problems.
                  </p>
                </div>

                <div className="resume-doc-block">
                  <h3 className="resume-doc-heading">EXPERIENCE</h3>
                  
                  <div className="resume-exp-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.825rem', color: '#0f172a' }}>
                      <span>Data Science Intern</span>
                      <span>May 2024 - Jul 2024</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.3rem' }}>Zomato • Bangalore, India</div>
                    <ul className="resume-doc-ul">
                      <li>Analyzed user behavior data to identify trends and improve customer retention by 12%.</li>
                      <li>Built a demand forecasting model using Python and Prophet, reducing prediction error by 15%.</li>
                      <li>Created interactive dashboards in Power BI to track key performance metrics.</li>
                    </ul>
                  </div>

                  <div className="resume-exp-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.825rem', color: '#0f172a' }}>
                      <span>ML Research Intern</span>
                      <span>Jan 2024 - Apr 2024</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.3rem' }}>IIT Bombay • Mumbai, India</div>
                    <ul className="resume-doc-ul">
                      <li>Researched on time series forecasting using LSTM networks.</li>
                      <li>Improved model accuracy by 10% through hyperparameter tuning.</li>
                      <li>Published findings in the college research journal.</li>
                    </ul>
                  </div>
                </div>

                <div className="resume-doc-block">
                  <h3 className="resume-doc-heading">PROJECTS</h3>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>
                      <span>Customer Churn Prediction</span>
                      <span>Mar 2024</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.1rem 0' }}>Built a machine learning model to predict customer churn with 89% accuracy.</p>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Tech: Python, Pandas, Scikit-learn, XGBoost, Matplotlib</div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>
                      <span>Sales Dashboard Analytics</span>
                      <span>Feb 2024</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.1rem 0' }}>Created an interactive sales dashboard to visualize key metrics and trends.</p>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Tech: Power BI, SQL, Excel</div>
                  </div>
                </div>

                <div className="resume-doc-block">
                  <h3 className="resume-doc-heading">CERTIFICATIONS</h3>
                  <ul className="resume-doc-ul">
                    <li>Google Data Analytics Professional Certificate (Mar 2024)</li>
                    <li>IBM Data Science Professional Certificate (Dec 2023)</li>
                    <li>Machine Learning Specialization - Coursera (Oct 2023)</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="doc-bottom-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} /> ATS Friendly: This resume is optimized for ATS scanners.
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => showNotification('Draft saved.')} className="secondary-action-btn">Save Draft</button>
              <button onClick={() => showNotification('Resume Updated & Saved!')} className="primary-export-btn">Update Resume</button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ATS Score, AI Suggestions & Templates */}
        <div className="builder-right-col">
          
          {/* ATS Score Dial */}
          <div className="card-box-panel" style={{ textAlign: 'center' }}>
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>ATS Score</h4>
            
            <div className="ats-score-dial">
              <span className="score-num">92</span>
              <span className="score-sub">/100</span>
            </div>

            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#16a34a', marginTop: '0.5rem' }}>Excellent</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0.85rem' }}>Your resume is well-optimized!</p>

            <button onClick={() => showNotification('Opening Full ATS Diagnostic Report...')} className="view-report-link">
              View Full Report <ArrowRight size={14} />
            </button>
          </div>

          {/* AI Suggestions List */}
          <div className="card-box-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>AI Suggestions</h4>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>View all</span>
            </div>

            <div className="suggestions-list">
              {[
                { text: 'Add quantifiable achievements', pts: '+12 Points' },
                { text: 'Include more relevant keywords', pts: '+8 Points' },
                { text: 'Improve skills section', pts: '+6 Points' },
                { text: 'Add a project with results', pts: '+5 Points' }
              ].map((sug, idx) => (
                <div key={idx} className="suggestion-item">
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>⚡ {sug.text}</span>
                  <span className="pts-pill">{sug.pts}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Templates Picker */}
          <div className="card-box-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Resume Templates</h4>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>View all</span>
            </div>

            <div className="templates-mini-grid">
              {['Modern Pro', 'Clean Minimal', 'Tech Focused', 'Creative', 'Executive', 'Classic'].map((name) => (
                <div
                  key={name}
                  onClick={() => setSelectedTemplate(name)}
                  className={`template-thumb-card ${selectedTemplate === name ? 'selected' : ''}`}
                >
                  <div className="thumb-skeleton" />
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#0f172a', display: 'block', marginTop: '0.3rem' }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export Formats */}
          <div className="card-box-panel">
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.75rem' }}>Export Resume</h4>
            <div className="export-buttons-grid">
              <button onClick={() => showNotification('Exporting as PDF...')} className="export-format-btn">📄 PDF</button>
              <button onClick={() => showNotification('Exporting as Word doc...')} className="export-format-btn">📝 Word</button>
              <button onClick={() => showNotification('Exporting as Plain TXT...')} className="export-format-btn">📋 TXT</button>
              <button onClick={() => showNotification('Opening in Google Docs...')} className="export-format-btn">🌐 Google Docs</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
