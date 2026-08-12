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
  Play,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Pause,
  Clock,
  CheckCircle2,
  HelpCircle,
  Headphones,
  LogOut,
  ChevronRight,
  Volume2,
  FileEdit,
  Hand
} from 'lucide-react';
import '../../App.css';
import './MockInterviewPage.css';

export default function MockInterviewPage() {
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(3);
  const [toast, setToast] = useState(null);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const questionsList = [
    { id: 1, title: 'Tell me about yourself.', duration: '1:45', status: 'Done' },
    { id: 2, title: 'Why are you interested in this role?', duration: '1:30', status: 'Done' },
    { id: 3, title: 'Explain the bias-variance tradeoff in machine learning.', duration: 'Pending', active: true },
    { id: 4, title: 'How would you handle missing values in a dataset?', duration: 'Pending' },
    { id: 5, title: 'SQL: Write a query to find the 3rd highest salary from a table.', duration: 'Pending' },
    { id: 6, title: 'Describe a challenging project you have worked on.', duration: 'Pending' },
    { id: 7, title: 'Where do you see yourself in 5 years?', duration: 'Pending' },
    { id: 8, title: 'Do you have any questions for us?', duration: 'Pending' }
  ];

  return (
    <div className="mock-interview-wrapper">
      
      {/* Toast Notification */}
      {toast && (
        <div className="mock-toast">
          <Sparkles size={18} color="#38bdf8" />
          <span>{toast}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="mock-top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)' }}>
              <Sparkles size={18} />
            </div>
            <span className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              code<span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ForEveryBody</span>
            </span>
          </div>
          <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>AI Mock Interview</h1>
            <span style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', fontWeight: 700, fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
              Data Scientist Intern • Zomato
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="leave-interview-btn">
            <LogOut size={16} /> Leave Interview
          </button>
          <button className="icon-round-btn" title="Settings"><Settings size={18} color="#64748b" /></button>
          <button className="icon-round-btn" title="Audio Test"><Headphones size={18} color="#64748b" /></button>
          
          <div className="user-avatar-pill">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" alt="Arjun" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', lineHeight: 1.1 }}>Arjun Mehta</div>
              <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Data Science Student</div>
            </div>
          </div>
        </div>
      </header>

      {/* TWO COLUMN MAIN INTERVIEW STUDIO */}
      <div className="mock-studio-grid">
        
        {/* LEFT & MIDDLE WORKSPACE */}
        <div className="mock-workspace">
          
          {/* VIDEO STAGE */}
          <div className="video-stage-card">
            
            {/* Top Stage Bar */}
            <div className="stage-top-bar">
              <span className="live-status-pill">
                <span className="red-live-dot" /> Interview in Progress
              </span>

              <div className="timer-box">
                <Clock size={16} color="#7c3aed" /> 28:46
              </div>

              <button onClick={() => showNotification('Ending Interview session...')} className="end-session-red-btn">
                End Interview
              </button>
            </div>

            {/* Stage Screens View (2 Boxes: AI Interviewer & User Camera) */}
            <div className="video-screens-split">
              
              {/* AI Interviewer Box */}
              <div className="ai-avatar-screen">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&crop=faces"
                  alt="AI Interviewer"
                  className="ai-interviewer-img"
                />
                <div className="ai-tag-badge">
                  <Sparkles size={14} color="#a855f7" /> AI Interviewer • Powered by CareerAI
                </div>

                {/* Right Floating Control Tools */}
                <div className="ai-tools-float-column">
                  <button onClick={() => showNotification('AI Voice Settings')} className="ai-tool-btn">
                    <Volume2 size={16} /> AI Voice
                  </button>
                  <button onClick={() => showNotification('Opening Interview Notes')} className="ai-tool-btn">
                    <FileEdit size={16} /> Notes
                  </button>
                  <button onClick={() => showNotification('Hand Raised!')} className="ai-tool-btn">
                    <Hand size={16} /> Raise Hand
                  </button>
                </div>
              </div>

              {/* User Camera Box */}
              <div className="user-camera-screen">
                <div className="user-you-tag">You</div>
                
                {isCameraOn ? (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
                    alt="You"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="camera-off-placeholder">
                    <CameraOff size={32} color="#94a3b8" />
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>Camera is off</span>
                    <button onClick={() => setIsCameraOn(!isCameraOn)} className="turn-on-camera-btn">
                      Turn on Camera
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Prompt & Transcript Box */}
            <div className="transcript-box">
              <Sparkles size={18} color="#7c3aed" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <p style={{ fontSize: '0.9rem', color: '#0f172a', margin: 0, lineHeight: 1.5 }}>
                Great! Let's begin. I'll be asking you a mix of technical, analytical and behavioral questions. Please think out loud when solving problems.
              </p>
            </div>

            {/* Live Controls Footer */}
            <div className="stage-controls-footer">
              <button onClick={() => setIsPaused(!isPaused)} className="control-pill-btn">
                <Pause size={16} /> {isPaused ? 'Resume Interview' : 'Pause Interview'}
              </button>

              <button onClick={() => setIsMicOn(!isMicOn)} className={`control-pill-btn ${isMicOn ? 'mic-on' : 'mic-off'}`}>
                {isMicOn ? <Mic size={16} /> : <MicOff size={16} />} {isMicOn ? 'Mic On' : 'Mic Muted'}
              </button>

              <button onClick={() => showNotification('Interview Ended.')} className="control-pill-btn end-btn">
                End Interview
              </button>
            </div>

          </div>

          {/* Tips Banner Below Stage */}
          <div className="tips-banner-card">
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#d97706', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              💡 Tips
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#475569', flexWrap: 'wrap' }}>
              <span>✓ Look at the camera while speaking</span>
              <span>✓ Speak clearly and at a moderate pace</span>
              <span>✓ Use examples to support your answers</span>
            </div>
          </div>

          {/* OVERALL PERFORMANCE & AI FEEDBACK PANEL */}
          <div className="performance-card-panel">
            <div className="performance-grid-split">
              
              {/* Overall Score Dial */}
              <div style={{ paddingRight: '1.5rem', borderRight: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Overall Performance</div>
                
                <div className="overall-score-gauge">
                  <span className="gauge-num">82</span>
                  <span className="gauge-sub">/100</span>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#16a34a', textAlign: 'center', marginTop: '0.6rem' }}>
                  Great Performance! 🎉
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: '0.2rem 0 1rem' }}>
                  You are doing really well. Keep it up!
                </p>

                {/* Skill Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { name: 'Communication', score: '85/100', pct: '85%' },
                    { name: 'Technical Knowledge', score: '80/100', pct: '80%' },
                    { name: 'Problem Solving', score: '78/100', pct: '78%' },
                    { name: 'Confidence', score: '88/100', pct: '88%' },
                    { name: 'Clarity', score: '79/100', pct: '79%' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ fontSize: '0.775rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#475569', marginBottom: '0.15rem' }}>
                        <span>{item.name}</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>{item.score}</span>
                      </div>
                      <div style={{ width: '100%', height: '5px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: item.pct, height: '100%', background: '#4f46e5', borderRadius: '999px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => showNotification('Opening Detailed Performance Analytics...')} className="view-detailed-report-btn">
                  View Detailed Report <ArrowRight size={14} />
                </button>
              </div>

              {/* AI Feedback & Strengths */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>AI Feedback</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}>View Full Feedback →</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Strengths */}
                  <div className="feedback-box green">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.85rem', color: '#16a34a', marginBottom: '0.4rem' }}>
                      <span>🏆 Strengths</span>
                      <span>+12</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#475569' }}>
                      <span>• Good use of examples</span>
                      <span>• Confident and composed</span>
                    </div>
                  </div>

                  {/* Areas to Improve */}
                  <div className="feedback-box amber">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.85rem', color: '#d97706', marginBottom: '0.4rem' }}>
                      <span>💡 Areas to Improve</span>
                      <span>+8</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span>• Provide more structured answers</span>
                      <span>• Take more time before answering</span>
                      <span>• Add quantitative examples</span>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="feedback-box blue">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.85rem', color: '#0284c7', marginBottom: '0.4rem' }}>
                      <span>✨ Suggestions</span>
                      <span>+10</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span>• Practice SQL queries more</span>
                      <span>• Revise ML algorithms</span>
                      <span>• Work on system design basics</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Question Stepper Row */}
            <div className="question-stepper-bar">
              {[
                { label: 'Intro', time: '2 min', status: 'done' },
                { label: 'Q1', time: '2 min', status: 'done' },
                { label: 'Q2', time: '2 min', status: 'done' },
                { label: 'Q3', time: 'In Progress', status: 'active' },
                { label: 'Q4', time: 'Pending', status: 'pending' },
                { label: 'Q5', time: 'Pending', status: 'pending' },
                { label: 'Q6', time: 'Pending', status: 'pending' },
                { label: 'Q7', time: 'Pending', status: 'pending' },
                { label: 'Q8', time: 'Pending', status: 'pending' },
                { label: 'Summary', time: 'Pending', status: 'pending' }
              ].map((step, i) => (
                <div key={i} className={`step-chip ${step.status}`}>
                  <span className="chip-label">{step.status === 'done' ? '✓ ' + step.label : step.label}</span>
                  <span className="chip-time">{step.time}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* RIGHT PANEL: Question Controls & Radar Breakdown */}
        <div className="mock-right-panel">
          
          {/* Active Question Box */}
          <div className="card-box-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>Question 3 of 8</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>37%</span>
            </div>
            
            <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ width: '37%', height: '100%', background: '#4f46e5', borderRadius: '999px' }} />
            </div>

            <span style={{ background: 'rgba(79,70,229,0.1)', color: '#4f46e5', fontWeight: 700, fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.6rem' }}>
              Technical
            </span>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, marginBottom: '0.6rem' }}>
              Explain the bias-variance tradeoff in machine learning.
            </h3>

            <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.85rem' }}>
              <Clock size={14} /> Expected time: 2 - 3 min
            </div>

            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              Take a moment to think before you answer. You can speak your answer out loud.
            </p>

            <button onClick={() => showNotification('Listening to your answer... Speak now!')} className="ready-answer-btn">
              <Mic size={16} /> I'm Ready to Answer
            </button>
          </div>

          {/* All Questions List */}
          <div className="card-box-panel">
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.85rem' }}>All Questions</h4>

            <div className="questions-scroll-list">
              {questionsList.map((q) => (
                <div key={q.id} className={`q-list-item ${q.active ? 'active' : ''}`}>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span className="q-num">{q.id}</span>
                    <span className="q-title">{q.title}</span>
                  </div>
                  <span className={`q-status-badge ${q.status.toLowerCase()}`}>{q.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart Breakdown */}
          <div className="card-box-panel">
            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.75rem' }}>Score Breakdown</h4>
            
            <div className="radar-chart-placeholder">
              <div className="radar-shape" />
              <span className="radar-tag top">Communication 85</span>
              <span className="radar-tag right">Technical 80</span>
              <span className="radar-tag bottom-right">Problem Solving 78</span>
              <span className="radar-tag bottom-left">Confidence 88</span>
              <span className="radar-tag left">Clarity 79</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
