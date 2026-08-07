import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Globe,
  ChevronDown,
  X,
  Menu,
  GraduationCap
} from 'lucide-react';
import './AuthPage.css';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup';
  const [authMode, setAuthMode] = useState(initialMode); // 'signup', 'signin', 'signin_email'
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [sendOffers, setSendOffers] = useState(true);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signin') {
      setAuthMode('signin');
    } else if (mode === 'signup') {
      setAuthMode('signup');
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate instant successful authentication
    navigate('/dashboard');
  };

  return (
    <div className="udemy-auth-root">
      
      {/* 1. HEADER NAVBAR */}
      <header className="udemy-in-header">
        <button className="mobile-hamburger-btn" aria-label="Toggle Menu">
          <Menu size={22} />
        </button>

        <div onClick={() => navigate('/')} className="in-brand-wrap" title="CareerHub Home">
          <div className="in-brand-icon">
            <GraduationCap size={22} color="#ffffff" />
          </div>
          <span className="in-brand-title">
            Career<span className="purple-txt">Hub</span>
          </span>
        </div>

        <button onClick={() => navigate('/')} className="in-nav-btn hide-mobile">
          Explore <ChevronDown size={14} style={{ marginLeft: 2 }} />
        </button>
        <button onClick={() => navigate('/overview')} className="in-nav-btn hide-mobile">
          Subscribe
        </button>

        <div className="in-search-container hide-mobile">
          <div className="in-search-box">
            <Search size={18} className="in-search-icon" />
            <input type="text" placeholder="Search for anything..." />
          </div>
        </div>

        <div className="in-nav-actions">
          <button className="in-nav-txt-link hide-tablet">CareerHub Business</button>
          <button className="in-nav-txt-link hide-tablet">Teach on CareerHub</button>

          <button onClick={() => navigate('/')} className="in-icon-btn" title="Shopping Cart">
            <ShoppingCart size={20} />
          </button>

          <button
            onClick={() => setAuthMode('signin')}
            className={`in-btn-login ${authMode === 'signin' || authMode === 'signin_email' ? 'active-tab' : ''}`}
          >
            Log in
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className="in-btn-signup"
          >
            Sign up
          </button>
          <button className="in-btn-globe" title="Change Language">
            <Globe size={18} />
          </button>
        </div>
      </header>

      {/* 2. SPLIT SCREEN AUTH CONTAINER */}
      <main className="auth-main-container">
        <div className="auth-split-wrapper">
          
          {/* LEFT COLUMN: CUSTOM AI GENERATED 3D ARTWORK */}
          <div className="auth-left-artwork">
            <div className="art-frame-container">
              <img
                src="/auth_illustration.jpg"
                alt="CareerHub AI Learning Illustration"
                className="art-image"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: AUTH FORM BOX */}
          <div className="auth-right-form-container">
            
            {/* --- SIGN UP WITH EMAIL MODE --- */}
            {authMode === 'signup' && (
              <div className="auth-box-content">
                <h1 className="auth-heading">Sign up with email</h1>
                
                <form onSubmit={handleSubmit} className="udemy-auth-form">
                  <div className="udemy-form-group">
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="udemy-input"
                    />
                  </div>

                  <div className="udemy-form-group">
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="udemy-input"
                    />
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

                  <button type="submit" className="udemy-btn-continue">
                    Continue
                  </button>
                </form>

                <div className="udemy-divider">
                  <span>Other sign up options</span>
                </div>

                {/* Social Icon Buttons Row */}
                <div className="social-buttons-row">
                  <button type="button" onClick={handleSubmit} className="social-icon-btn" title="Sign up with Google">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>
                  <button type="button" onClick={handleSubmit} className="social-icon-btn" title="Sign up with Facebook">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button type="button" onClick={handleSubmit} className="social-icon-btn" title="Sign up with Apple">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#000000">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.19.66-2.88 1.47-.62.72-1.16 1.88-.99 3.01 1.09.09 2.22-.56 2.88-1.38z" />
                    </svg>
                  </button>
                </div>

                <div className="auth-footer-link">
                  Already have an account?{' '}
                  <button onClick={() => setAuthMode('signin')} className="link-btn">
                    Log in
                  </button>
                </div>
              </div>
            )}

            {/* --- LOG IN MAIN OPTIONS MODE (SCREENSHOT 2) --- */}
            {authMode === 'signin' && (
              <div className="auth-box-content">
                <h1 className="auth-heading">Log in to continue your learning journey</h1>

                <div className="udemy-login-options">
                  <button onClick={handleSubmit} className="btn-google-sso">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="login-menu-box">
                    <button onClick={() => setAuthMode('signin_email')} className="menu-option-btn">
                      Log in to a different account
                    </button>
                    <div className="menu-divider" />
                    <button onClick={() => setAuthMode('signup')} className="menu-option-btn">
                      Don't have an account? <span className="purple-bold">Sign up</span>
                    </button>
                    <div className="menu-divider" />
                    <button onClick={() => alert('Redirecting to Organization SSO...')} className="menu-option-btn">
                      Log in with your organization
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- LOG IN WITH EMAIL MODE (SCREENSHOT 3) --- */}
            {authMode === 'signin_email' && (
              <div className="auth-box-content">
                <h1 className="auth-heading">Log in to continue your learning journey</h1>

                <form onSubmit={handleSubmit} className="udemy-auth-form">
                  <div className="udemy-form-group">
                    <input
                      type="text"
                      required
                      placeholder="Email or Phone Number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="udemy-input"
                    />
                  </div>

                  <button type="submit" className="udemy-btn-continue">
                    Continue
                  </button>
                </form>

                <div className="udemy-divider">
                  <span>Other log in options</span>
                </div>

                {/* Social Icon Buttons Row */}
                <div className="social-buttons-row">
                  <button type="button" onClick={handleSubmit} className="social-icon-btn" title="Log in with Google">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>
                  <button type="button" onClick={handleSubmit} className="social-icon-btn" title="Log in with Facebook">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button type="button" onClick={handleSubmit} className="social-icon-btn" title="Log in with Apple">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#000000">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.19.66-2.88 1.47-.62.72-1.16 1.88-.99 3.01 1.09.09 2.22-.56 2.88-1.38z" />
                    </svg>
                  </button>
                </div>

                <div className="auth-footer-link">
                  Don't have an account?{' '}
                  <button onClick={() => setAuthMode('signup')} className="link-btn">
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
