import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Rocket,
  GraduationCap,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';
import '../../App.css';
import './AuthPage.css';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup';
  const [authMode, setAuthMode] = useState(initialMode);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signin' || mode === 'signup') {
      setAuthMode(mode);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    industry: '',
    location: '',
    experience: '1-3 years',
    degree: '',
    university: '',
    gradYear: '2025',
    skills: ['React', 'JavaScript', 'Data Analysis'],
    rememberMe: true,
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Password validations
  const passLength = formData.password.length >= 8;
  const passUpper = /[A-Z]/.test(formData.password);
  const passNumber = /[0-9]/.test(formData.password);
  const passSpecial = /[^A-Za-z0-9]/.test(formData.password);

  const score = [passLength, passUpper, passNumber, passSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (score <= 1) return { label: 'Weak', color: '#ef4444' };
    if (score === 2 || score === 3) return { label: 'Medium', color: '#f59e0b' };
    return { label: 'Strong', color: '#22c55e' };
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (authMode === 'signin') {
      triggerToast('Signed in successfully! Redirecting to dashboard...');
      return;
    }

    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === 4) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleSSOLogin = (provider) => {
    triggerToast(`Connecting to ${provider}... Redirecting to auth portal.`);
  };

  const availableSkills = ['React', 'JavaScript', 'Node.js', 'Python', 'Data Science', 'UX Design', 'AI/ML', 'Product Management'];

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="career-app-wrapper">
      {/* Top Brand Navbar */}
      <header className="auth-header">
        <div onClick={() => navigate('/')} className="auth-logo">
          <div className="auth-logo-icon">
            <Sparkles size={22} />
          </div>
          <span className="auth-logo-text">
            Career<span className="auth-logo-text-accent">AI</span>
          </span>
        </div>

        <div>
          {authMode === 'signin' ? (
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setCurrentStep(1); }}
              className="auth-nav-btn"
            >
              New here? <span className="auth-logo-text-accent">Sign up</span> <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className="auth-nav-btn"
            >
              Already registered? <span className="auth-logo-text-accent">Log in</span> <ArrowRight size={16} />
            </button>
          )}
        </div>
      </header>

      {/* Main Glass Card Container */}
      <div className="auth-card-container">
        
        {/* LEFT PANEL: Branding + 3D Robot Showcase */}
        <div className="left-panel">
          <div>
            <div className="auth-pill-badge">
              <Sparkles size={14} /> AI-Powered Career Platform
            </div>

            <h1 className="auth-heading">
              {authMode === 'signup' ? (
                <>
                  Create Your Account <br />
                  &amp; Unlock <span className="auth-heading-accent">Your Future</span>
                </>
              ) : (
                <>
                  Take the Next Step <br />
                  Toward Your <span className="auth-heading-accent">Dream Career</span>
                </>
              )}
            </h1>

            <p className="auth-subtext">
              {authMode === 'signup' 
                ? 'Join thousands of students and professionals building smarter careers with AI.'
                : 'Sign in to access personalized career insights, AI tools, internships, and personalized learning recommendations.'}
            </p>
          </div>

          {/* Center 3D Robot Mascot Illustration */}
          <div className="auth-robot-container">
            <div className="auth-robot-glow animate-pulse-glow" />

            <div className="auth-robot-svg-wrap animate-float">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="175" rx="75" ry="18" fill="url(#podiumGrad3)" opacity="0.9" />
                <ellipse cx="100" cy="175" rx="60" ry="12" fill="url(#podiumTop3)" />
                <path d="M40 175 C40 185, 160 185, 160 175" stroke="#a5b4fc" strokeWidth="2" fill="none" opacity="0.6" />

                <rect x="68" y="105" width="64" height="52" rx="26" fill="url(#botBody3)" />
                <rect x="74" y="112" width="52" height="38" rx="19" fill="#ffffff" opacity="0.95" />
                <circle cx="100" cy="131" r="8" fill="url(#coreGlow3)" />

                <rect x="60" y="55" width="80" height="58" rx="29" fill="url(#botHead3)" />
                <rect x="68" y="63" width="64" height="42" rx="21" fill="#0f172a" />
                
                <ellipse cx="84" cy="84" rx="7" ry="9" fill="#38bdf8" />
                <ellipse cx="116" cy="84" rx="7" ry="9" fill="#38bdf8" />
                <circle cx="86" cy="82" r="2.5" fill="#ffffff" />
                <circle cx="118" cy="82" r="2.5" fill="#ffffff" />

                <circle cx="56" cy="84" r="7" fill="#818cf8" />
                <circle cx="144" cy="84" r="7" fill="#818cf8" />
                <circle cx="100" cy="48" r="6" fill="#38bdf8" />
                <line x1="100" y1="54" x2="100" y2="48" stroke="#818cf8" strokeWidth="3" />

                <rect x="42" y="115" width="18" height="32" rx="9" fill="url(#botHead3)" />
                <rect x="140" y="115" width="18" height="32" rx="9" fill="url(#botHead3)" />

                <defs>
                  <linearGradient id="podiumGrad3" x1="25" y1="175" x2="175" y2="175">
                    <stop stopColor="#e0e7ff" />
                    <stop offset="0.5" stopColor="#c7d2fe" />
                    <stop offset="1" stopColor="#e0e7ff" />
                  </linearGradient>
                  <linearGradient id="podiumTop3" x1="40" y1="175" x2="160" y2="175">
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e0e7ff" />
                  </linearGradient>
                  <linearGradient id="botHead3" x1="60" y1="55" x2="140" y2="113">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.5" stopColor="#e0e7ff" />
                    <stop offset="1" stopColor="#c7d2fe" />
                  </linearGradient>
                  <linearGradient id="botBody3" x1="68" y1="105" x2="132" y2="157">
                    <stop stopColor="#818cf8" />
                    <stop offset="1" stopColor="#4f46e5" />
                  </linearGradient>
                  <linearGradient id="coreGlow3" x1="92" y1="123" x2="108" y2="139">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating Stats Cards */}
            <div className="glass-badge-card animate-float-reverse auth-badge-resume">
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>AI Resume Score</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>92</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22c55e' }}>Excellent</span>
                <TrendingUp size={14} color="#22c55e" />
              </div>
            </div>

            <div className="glass-badge-card animate-float auth-badge-skill">
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', display: 'block' }}>Skill Match</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>78%</span>
              </div>
              <div style={{ position: 'relative', width: '28px', height: '28px' }}>
                <svg width="28" height="28" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="78, 100" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Feature Badges */}
          <div className="auth-feature-grid">
            <div className="auth-feature-card">
              <div className="auth-feature-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                <ShieldCheck size={18} />
              </div>
              <div className="auth-feature-title">Secure &amp; Private</div>
              <div className="auth-feature-desc">Enterprise security.</div>
            </div>

            <div className="auth-feature-card">
              <div className="auth-feature-icon" style={{ background: '#f3e8ff', color: '#a855f7' }}>
                <Sparkles size={18} />
              </div>
              <div className="auth-feature-title">AI-Powered</div>
              <div className="auth-feature-desc">Smart tools.</div>
            </div>

            <div className="auth-feature-card">
              <div className="auth-feature-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                <Rocket size={18} />
              </div>
              <div className="auth-feature-title">Career Focused</div>
              <div className="auth-feature-desc">Land dream role.</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="right-panel">
          {toastMessage && (
            <div className="toast-notification">
              <Sparkles size={16} color="#38bdf8" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Stepper Header (Sign Up Mode) */}
          {authMode === 'signup' && (
            <div className="stepper-header">
              <div className="stepper-bar-container">
                <div className="stepper-track">
                  <div
                    className="stepper-progress"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  />
                </div>

                {[
                  { num: 1, label: 'Account' },
                  { num: 2, label: 'Personal Info' },
                  { num: 3, label: 'Education' },
                  { num: 4, label: 'Complete' }
                ].map((step) => {
                  const isActive = currentStep === step.num;
                  const isDone = currentStep > step.num;

                  return (
                    <div
                      key={step.num}
                      onClick={() => isDone && setCurrentStep(step.num)}
                      className="stepper-item"
                      style={{ cursor: isDone ? 'pointer' : 'default' }}
                    >
                      <div
                        className="stepper-num"
                        style={{
                          background: isActive ? '#3b82f6' : isDone ? '#4f46e5' : '#ffffff',
                          border: isActive || isDone ? 'none' : '2px solid #e2e8f0',
                          color: isActive || isDone ? '#ffffff' : '#94a3b8'
                        }}
                      >
                        {isDone ? <CheckCircle2 size={18} /> : step.num}
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#3b82f6' : isDone ? '#0f172a' : '#94a3b8'
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Title */}
          <div className="auth-section-title">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>
              {authMode === 'signin' ? 'Welcome back 👋' : currentStep === 1 ? "Let's Get Started!" : currentStep === 2 ? 'Personal Profile' : currentStep === 3 ? 'Education & Skills' : 'Account Ready!'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {authMode === 'signin' ? 'Sign in to your account and continue your journey' : 'Create your account to continue your career journey.'}
            </p>
          </div>

          {/* SSO */}
          {(authMode === 'signin' || (authMode === 'signup' && currentStep === 1)) && (
            <>
              <div className="sso-grid">
                <button type="button" className="sso-button" onClick={() => handleSSOLogin('Google')}>
                  <span>Google</span>
                </button>
                <button type="button" className="sso-button" onClick={() => handleSSOLogin('Microsoft')}>
                  <span>Microsoft</span>
                </button>
                <button type="button" className="sso-button" onClick={() => handleSSOLogin('LinkedIn')}>
                  <span>LinkedIn</span>
                </button>
              </div>

              <div className="divider-with-text">
                <div className="divider-line" />
                <span>{authMode === 'signin' ? 'or continue with email' : 'or sign up with email'}</span>
                <div className="divider-line" />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleNextStep} className="auth-form">
            {authMode === 'signin' ? (
              <>
                <div>
                  <label className="auth-label">Email address</label>
                  <div className="custom-input-group">
                    <input type="email" required placeholder="Enter your email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <Mail className="input-icon" size={18} />
                  </div>
                </div>

                <div>
                  <label className="auth-label">Password</label>
                  <div className="custom-input-group">
                    <input type={showPassword ? 'text' : 'password'} required placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <Lock className="input-icon" size={18} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="pwd-toggle-btn">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#475569' }}>
                    <input type="checkbox" checked={formData.rememberMe} onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })} style={{ accentColor: '#4f46e5' }} />
                    Remember me
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); triggerToast('Password reset link sent.'); }} style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="gradient-btn" style={{ marginTop: '0.5rem' }}>
                  Sign In <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                {currentStep === 1 && (
                  <>
                    <div>
                      <label className="auth-label">Full Name</label>
                      <div className="custom-input-group">
                        <input type="text" required placeholder="Enter your full name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                        <User className="input-icon" size={18} />
                      </div>
                    </div>

                    <div>
                      <label className="auth-label">Email Address</label>
                      <div className="custom-input-group">
                        <input type="email" required placeholder="Enter your email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <Mail className="input-icon" size={18} />
                      </div>
                    </div>

                    <div>
                      <label className="auth-label">Password</label>
                      <div className="custom-input-group">
                        <input type={showPassword ? 'text' : 'password'} required placeholder="Create a password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <Lock className="input-icon" size={18} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="pwd-toggle-btn">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {formData.password.length > 0 && (
                        <div style={{ marginTop: '0.6rem' }}>
                          <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                            {[1, 2, 3, 4].map((bar) => (
                              <div key={bar} className={`strength-bar ${score >= bar ? 'active' : ''}`} />
                            ))}
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: getStrengthLabel().color, marginLeft: '0.5rem' }}>
                              {getStrengthLabel().label}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="gradient-btn" style={{ marginTop: '0.75rem' }}>
                      Continue <ArrowRight size={18} />
                    </button>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="auth-label">Current Role / Title</label>
                      <div className="custom-input-group">
                        <input type="text" required placeholder="e.g. Software Engineer, Student" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                        <Briefcase className="input-icon" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="auth-label">Target Industry</label>
                      <div className="custom-input-group">
                        <input type="text" required placeholder="e.g. AI & Robotics" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} />
                        <Target className="input-icon" size={18} />
                      </div>
                    </div>
                    <div className="btn-row">
                      <button type="button" onClick={() => setCurrentStep(1)} className="btn-secondary">Back</button>
                      <button type="submit" className="gradient-btn" style={{ flex: 1 }}>Next Step <ArrowRight size={18} /></button>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div>
                      <label className="auth-label">Degree / Field of Study</label>
                      <div className="custom-input-group">
                        <input type="text" required placeholder="e.g. B.S. Computer Science" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} />
                        <GraduationCap className="input-icon" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="auth-label">Key Skills</label>
                      <div className="skills-chip-group">
                        {availableSkills.map(skill => {
                          const selected = formData.skills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className="skill-chip"
                              style={{
                                border: selected ? 'none' : '1px solid #cbd5e1',
                                background: selected ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#f8fafc',
                                color: selected ? '#ffffff' : '#475569'
                              }}
                            >
                              {selected ? `✓ ${skill}` : `+ ${skill}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="btn-row">
                      <button type="button" onClick={() => setCurrentStep(2)} className="btn-secondary">Back</button>
                      <button type="submit" className="gradient-btn" style={{ flex: 1 }}>Finish Setup <Sparkles size={18} /></button>
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                      Welcome aboard, {formData.fullName || 'User'}! 🎉
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Your AI profile setup is complete.</p>
                    <button type="button" className="gradient-btn" style={{ width: '100%' }} onClick={() => navigate('/')}>
                      Go to Home Page <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </form>

          {/* Toggle */}
          <div className="auth-toggle-footer">
            {authMode === 'signup' ? (
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Already have an account?{' '}
                <a href="#login" onClick={(e) => { e.preventDefault(); setAuthMode('signin'); }} className="auth-toggle-link">Log in</a>
              </p>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Don't have an account?{' '}
                <a href="#signup" onClick={(e) => { e.preventDefault(); setAuthMode('signup'); setCurrentStep(1); }} className="auth-toggle-link">Sign up</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
