import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  UserPlus,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useSEO } from '../../utils/seo';
import { trackPageView } from '../../utils/analytics';
import { registerUser, loginUser } from '../../utils/authService';
import './AuthPage.css';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup';
  const [authMode, setAuthMode] = useState(initialMode); // 'signup', 'signin', 'signin_email'
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sendOffers, setSendOffers] = useState(true);

  // API Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useSEO({
    title: authMode === 'signup' ? 'Create Account' : 'Log In',
    description: 'Sign up or log in to access software development courses and interactive project labs on codeforeverybody.',
  });

  useEffect(() => {
    trackPageView('/auth');
  }, []);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signin') {
      setAuthMode('signin');
    } else if (mode === 'signup') {
      setAuthMode('signup');
    }
  }, [searchParams]);

  const switchMode = (newMode) => {
    setErrorMessage('');
    setSuccessMessage('');
    setAuthMode(newMode);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser({
        name: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      setSuccessMessage(response.message || 'Account created successfully! Please log in.');
      setFullName('');
      setPassword('');

      // Auto-switch to email sign-in mode after successful registration
      setTimeout(() => {
        switchMode('signin_email');
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginUser({
        email: email.trim(),
        password: password.trim(),
      });

      setSuccessMessage('Login successful! Redirecting...');

      // Redirect after brief delay
      setTimeout(() => {
        navigate('/thank-you');
      }, 800);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="udemy-auth-root">
      
      {/* Clean Top Brand Bar */}
      <div className="auth-top-bar">
        <div onClick={() => navigate('/')} className="in-brand-wrap" title="Back to Home">
          <div className="in-brand-icon">
            <GraduationCap size={20} color="#ffffff" />
          </div>
          <span className="in-brand-title">
            code<span className="purple-txt">ForEveryBody</span>
          </span>
        </div>
      </div>

      {/* 2. SPLIT SCREEN AUTH CONTAINER */}
      <main className="auth-main-container">
        <div className="auth-split-wrapper">
          
          {/* LEFT COLUMN: CUSTOM AI GENERATED 3D ARTWORK & BENEFITS */}
          <div className="auth-left-artwork">
            <div className="art-frame-container">
              <img
                src="/auth_illustration.jpg"
                alt="CareerHub AI Learning Illustration"
                className="art-image"
              />
              <div className="art-overlay-badge">
                <Sparkles size={16} className="sparkle-icon" />
                <span>AI-Powered Career Academy</span>
              </div>
            </div>
            
            <div className="art-highlights">
              <div className="highlight-item">
                <CheckCircle2 size={18} className="highlight-icon" />
                <span>Over 250,000+ interactive courses & real-world projects</span>
              </div>
              <div className="highlight-item">
                <ShieldCheck size={18} className="highlight-icon" />
                <span>Enterprise grade security & instant AI feedback</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AUTH FORM BOX */}
          <div className="auth-right-form-container">
            
            {/* Global Error Banner */}
            {errorMessage && (
              <div className="auth-alert-error">
                <AlertCircle size={18} className="auth-alert-icon" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Global Success Banner */}
            {successMessage && (
              <div className="auth-alert-success">
                <CheckCircle2 size={18} className="auth-alert-icon" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* --- SIGN UP WITH EMAIL MODE --- */}
            {authMode === 'signup' && (
              <div className="auth-box-content">
                <h1 className="auth-heading">Sign up with email</h1>
                
                <form onSubmit={handleRegisterSubmit} className="udemy-auth-form">
                  <div className="udemy-form-group">
                    <label className="input-label">Full Name</label>
                    <div className="input-with-icon-wrapper">
                      <User size={18} className="input-lead-icon" />
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="udemy-input input-has-lead"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="udemy-form-group">
                    <label className="input-label">Email Address</label>
                    <div className="input-with-icon-wrapper">
                      <Mail size={18} className="input-lead-icon" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="udemy-input input-has-lead"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="udemy-form-group">
                    <label className="input-label">Password</label>
                    <div className="input-with-icon-wrapper">
                      <Lock size={18} className="input-lead-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="udemy-input input-has-lead input-has-trail"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <label className="udemy-checkbox-label">
                    <input
                      type="checkbox"
                      checked={sendOffers}
                      onChange={(e) => setSendOffers(e.target.checked)}
                      className="udemy-checkbox"
                    />
                    <span>Send me special offers, personalized recommendations, and learning tips.</span>
                  </label>

                  <button type="submit" disabled={isLoading} className="udemy-btn-continue">
                    {isLoading ? (
                      <>
                        <span className="btn-spinner" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <div className="udemy-divider">
                  <span>Other sign up options</span>
                </div>

                {/* Social Icon Buttons Row */}
                <div className="social-buttons-row">
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Sign up with Google">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Sign up with Facebook">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Sign up with Apple">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#000000">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.19.66-2.88 1.47-.62.72-1.16 1.88-.99 3.01 1.09.09 2.22-.56 2.88-1.38z" />
                    </svg>
                  </button>
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Sign up with GitHub">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#24292e">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                </div>

                <div className="auth-footer-link">
                  Already have an account?{' '}
                  <button onClick={() => switchMode('signin_email')} className="link-btn">
                    Log in
                  </button>
                </div>
              </div>
            )}

            {/* --- LOG IN MAIN OPTIONS MODE --- */}
            {authMode === 'signin' && (
              <div className="auth-box-content">
                <h1 className="auth-heading">Log in to continue your learning journey</h1>

                <div className="udemy-login-options">
                  <button onClick={() => switchMode('signin_email')} className="btn-google-sso">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="login-menu-box">
                    <button onClick={() => switchMode('signin_email')} className="menu-option-btn">
                      <div className="menu-btn-content">
                        <Mail size={18} className="menu-btn-icon" />
                        <span>Log in with Email and Password</span>
                      </div>
                      <ArrowRight size={16} className="menu-arrow-icon" />
                    </button>
                    <div className="menu-divider" />
                    <button onClick={() => switchMode('signup')} className="menu-option-btn">
                      <div className="menu-btn-content">
                        <UserPlus size={18} className="menu-btn-icon" />
                        <span>Don't have an account? <span className="purple-bold">Sign up</span></span>
                      </div>
                      <ArrowRight size={16} className="menu-arrow-icon" />
                    </button>
                    <div className="menu-divider" />
                    <button onClick={() => alert('Redirecting to Organization SSO...')} className="menu-option-btn">
                      <div className="menu-btn-content">
                        <Building2 size={18} className="menu-btn-icon" />
                        <span>Log in with your organization</span>
                      </div>
                      <ArrowRight size={16} className="menu-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- LOG IN WITH EMAIL MODE --- */}
            {authMode === 'signin_email' && (
              <div className="auth-box-content">
                <h1 className="auth-heading">Log in to continue your learning journey</h1>

                <form onSubmit={handleLoginSubmit} className="udemy-auth-form">
                  <div className="udemy-form-group">
                    <label className="input-label">Email Address</label>
                    <div className="input-with-icon-wrapper">
                      <Mail size={18} className="input-lead-icon" />
                      <input
                        type="email"
                        required
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="udemy-input input-has-lead"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="udemy-form-group">
                    <label className="input-label">Password</label>
                    <div className="input-with-icon-wrapper">
                      <Lock size={18} className="input-lead-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="udemy-input input-has-lead input-has-trail"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading} className="udemy-btn-continue">
                    {isLoading ? (
                      <>
                        <span className="btn-spinner" />
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <>
                        <span>Log In</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <div className="udemy-divider">
                  <span>Other log in options</span>
                </div>

                {/* Social Icon Buttons Row */}
                <div className="social-buttons-row">
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Log in with Google">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Log in with Facebook">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Log in with Apple">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#000000">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.19.66-2.88 1.47-.62.72-1.16 1.88-.99 3.01 1.09.09 2.22-.56 2.88-1.38z" />
                    </svg>
                  </button>
                  <button type="button" onClick={() => switchMode('signin')} className="social-icon-btn" title="Log in with GitHub">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#24292e">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                </div>

                <div className="auth-footer-link">
                  Don't have an account?{' '}
                  <button onClick={() => switchMode('signup')} className="link-btn">
                    Sign up
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
}
