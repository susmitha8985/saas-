/**
 * @fileoverview AuthPage — login and registration form.
 *
 * Accessibility improvements applied:
 * - `<main id="main-content" aria-labelledby="auth-heading">` landmark
 * - Every `<label>` has `htmlFor` wired to matching `id` on `<input>`
 * - Error message: `role="alert"` + `aria-live="assertive"` (WCAG 4.1.3)
 * - Submit button: `aria-disabled` when loading, descriptive `aria-label`
 * - Form: `aria-describedby` points to error region
 * - Switch-mode button: `aria-label` describes the resulting action
 */
import React, { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Mail, Lock, User, Sparkles, AlertCircle } from 'lucide-react';

/**
 * @typedef {Object} FormData
 * @property {string} name     - Full name (register only).
 * @property {string} email    - Email address.
 * @property {string} password - Password (min 6 chars).
 */

/** @type {FormData} */
const INITIAL_FORM_DATA = { name: '', email: '', password: '' };

/**
 * Validates form fields before submission.
 * @param {FormData}  data
 * @param {boolean}   isLogin
 * @returns {string} Error message or empty string if valid.
 */
function validateForm(data, isLogin) {
  if (!data.email || !data.password || (!isLogin && !data.name)) {
    return 'Please fill in all required fields.';
  }
  if (data.password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return '';
}

/**
 * Authentication page — toggles between Sign In and Create Account.
 */
export default function AuthPage() {
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate stable, unique IDs for input/label association
  const uid = useId();
  const ids = {
    heading:  `${uid}-heading`,
    errorBox: `${uid}-error`,
    name:     `${uid}-name`,
    email:    `${uid}-email`,
    password: `${uid}-password`,
  };

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user && user.email !== 'guest@scrollwise.ai') {
      navigate('/feed');
    }
  }, [user, navigate]);

  /**
   * Handles controlled input changes and clears the error.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  /**
   * Submits the login or registration form.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm(formData, isLogin);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/feed');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /** Toggles between login and register mode, clearing form state. */
  const handleSwitchMode = () => {
    setIsLogin((prev) => !prev);
    setFormData(INITIAL_FORM_DATA);
    setError('');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      <main
        id="main-content"
        aria-labelledby={ids.heading}
        className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Decorative glow spheres */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary-indigo/15 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-primary-purple/15 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-md w-full space-y-8 bg-dark-card/60 border border-dark-border p-8 rounded-2xl backdrop-blur-xl relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

          {/* Header */}
          <div className="text-center">
            <div
              className="inline-flex p-3 rounded-xl bg-primary-indigo/10 text-primary-indigo mb-4 border border-primary-indigo/25"
              aria-hidden="true"
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h1
              id={ids.heading}
              className="text-3xl font-bold font-heading"
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="mt-2 text-sm text-dark-muted">
              {isLogin
                ? 'Sign in to access your feed and customised AI recommendations'
                : 'Join ScrollWise to transform your scrolling habits today'}
            </p>
          </div>

          {/* Error Message — announced immediately to screen readers */}
          {error && (
            <div
              id={ids.errorBox}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm animate-shake"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            aria-describedby={error ? ids.errorBox : undefined}
            noValidate
          >
            <div className="space-y-4">

              {/* Name Field (register only) */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor={ids.name}
                    className="text-xs font-semibold text-dark-muted uppercase tracking-wider block mb-1"
                  >
                    Your Name <span aria-hidden="true" className="text-red-400">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted"
                      aria-hidden="true"
                    />
                    <input
                      id={ids.name}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition-all duration-300 placeholder:text-dark-muted"
                      aria-required="true"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label
                  htmlFor={ids.email}
                  className="text-xs font-semibold text-dark-muted uppercase tracking-wider block mb-1"
                >
                  Email Address <span aria-hidden="true" className="text-red-400">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted"
                    aria-hidden="true"
                  />
                  <input
                    id={ids.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@university.edu"
                    className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition-all duration-300 placeholder:text-dark-muted"
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor={ids.password}
                  className="text-xs font-semibold text-dark-muted uppercase tracking-wider block mb-1"
                >
                  Password <span aria-hidden="true" className="text-red-400">*</span>
                  <span className="sr-only">(required, minimum 6 characters)</span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted"
                    aria-hidden="true"
                  />
                  <input
                    id={ids.password}
                    name="password"
                    type="password"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition-all duration-300 placeholder:text-dark-muted"
                    aria-required="true"
                    aria-describedby={!isLogin ? `${ids.password}-hint` : undefined}
                  />
                </div>
                {!isLogin && (
                  <p id={`${ids.password}-hint`} className="mt-1 text-[10px] text-dark-muted">
                    Minimum 6 characters.
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                aria-disabled={loading}
                aria-label={loading
                  ? (isLogin ? 'Signing in, please wait' : 'Creating account, please wait')
                  : (isLogin ? 'Sign in to your account' : 'Create your account')
                }
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan hover:brightness-110 shadow-lg shadow-primary-indigo/25 text-white transition-all duration-300 hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      aria-hidden="true"
                    />
                    <span>{isLogin ? 'Signing in…' : 'Creating account…'}</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>
            </div>
          </form>

          {/* Mode Toggle */}
          <div className="text-center pt-4 border-t border-dark-border/40">
            <button
              onClick={handleSwitchMode}
              aria-label={isLogin
                ? "Don't have an account? Switch to create account form"
                : 'Already have an account? Switch to sign in form'}
              className="text-xs text-primary-cyan hover:underline transition-all duration-300"
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : 'Already have an account? Sign in here'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
