import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Compass, Award, PlusCircle, LayoutDashboard, LogOut, LogIn } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Reels Feed', path: '/feed', icon: Compass },
    { label: 'Recommendations', path: '/recommendations', icon: Award },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Upload Reel', path: '/upload', icon: PlusCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-dark-bg/60 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan bg-clip-text text-transparent heading-font tracking-wide">
                ScrollWise
              </span>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-primary-indigo/25 border border-primary-indigo/40 text-primary-indigo rounded-full">
                AI Agent
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-primary-indigo/10 border border-primary-indigo/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                      : 'text-dark-muted border border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-dark-border">
                <img
                  src={user.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-primary-indigo/40 bg-dark-card shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-semibold text-white max-w-[100px] truncate">{user.name}</p>
                  <p className="text-[10px] text-dark-muted truncate capitalize">{user.profile?.experienceLevel || 'Student'}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg border border-transparent text-dark-muted hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-indigo to-primary-purple hover:from-primary-indigo/90 hover:to-primary-purple/90 text-white shadow-lg shadow-primary-indigo/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-dark-muted hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 space-y-1 bg-dark-bg/95 border-b border-dark-border backdrop-blur-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-indigo/10 border border-primary-indigo/30 text-white'
                    : 'text-dark-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-dark-border mt-4">
            {user ? (
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-primary-indigo/40"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-dark-muted">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs">Logout</span>
                </button>
              </div>
            ) : (
              <div className="px-4">
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-1.5 w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium bg-gradient-to-r from-primary-indigo to-primary-purple text-white shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
