import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Mail, Lock, User, Sparkles, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/feed');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary-indigo/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-primary-purple/15 rounded-full blur-3xl" />

        <div className="max-w-md w-full space-y-8 bg-dark-card/60 border border-dark-border p-8 rounded-2xl backdrop-blur-xl relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-primary-indigo/10 text-primary-indigo mb-4 border border-primary-indigo/25">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold font-heading">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-sm text-dark-muted">
              {isLogin
                ? 'Sign in to access your feed and customized AI recommendations'
                : 'Join ScrollWise to transform your scrolling habits today'}
            </p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-semibold text-dark-muted uppercase tracking-wider block mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                    <input
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition-all duration-300 placeholder:text-dark-muted"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-dark-muted uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@university.edu"
                    className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition-all duration-300 placeholder:text-dark-muted"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-dark-muted uppercase tracking-wider block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition-all duration-300 placeholder:text-dark-muted"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan hover:brightness-110 shadow-lg shadow-primary-indigo/25 text-white transition-all duration-300 hover:scale-[1.01] focus:outline-none flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>
            </div>
          </form>

          <div className="text-center pt-4 border-t border-dark-border/40">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-xs text-primary-cyan hover:underline transition-all duration-300"
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : 'Already have an account? Sign in here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
