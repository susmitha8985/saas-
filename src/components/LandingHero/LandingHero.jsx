import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  User,
  Video,
  Play,
  Code,
} from 'lucide-react';
import './LandingHero.css';

export default function LandingHero({ onExploreClick, onAboutClick }) {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('explore-courses');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/learning');
      }
    }
  };

  const handleAboutClick = () => {
    if (onAboutClick) {
      onAboutClick();
    } else {
      const el = document.getElementById('about-us');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/overview');
      }
    }
  };

  return (
    <section className="tl-landing-container" id="root-landing-hero">
      <div className="tl-wrapper">
        {/* Top Navigation Bar */}
        <header className="tl-nav-bar">
          <div className="tl-brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="tl-logo-icon">
              <Code size={20} strokeWidth={2.5} />
            </div>
            <span className="tl-brand-text">codeforeverybody</span>
          </div>

          <nav className="tl-nav-links">
            <button type="button" className="tl-nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Home
            </button>
            <button type="button" className="tl-nav-link" onClick={handleAboutClick}>
              About Us
            </button>
            <button type="button" className="tl-nav-link" onClick={handleExploreClick}>
              Course
            </button>
            <button type="button" className="tl-nav-link" onClick={() => navigate('/auth')}>
              Log In
            </button>
          </nav>

          <div className="tl-nav-actions">
            <button type="button" className="tl-nav-login" onClick={() => navigate('/auth')}>
              Log In
            </button>
            <button type="button" className="tl-btn-signup" onClick={() => navigate('/auth')}>
              <span>Sign Up</span>
              <div className="tl-arrow-circle">
                <ArrowRight size={14} />
              </div>
            </button>
          </div>
        </header>

        {/* Hero Section Container */}
        <div className="tl-hero-section">
          {/* Floating Pill Left (Expert Tutors) */}
          <motion.div
            className="tl-floating-badge left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="tl-stat-pill">
              <div className="tl-stat-icon">
                <User size={16} />
              </div>
              <div className="tl-stat-content">
                <div className="tl-stat-val">100+</div>
                <div className="tl-stat-lbl">Expert tutor</div>
              </div>
            </div>
            <div className="tl-badge-avatar-box">
              <img src="/tutor_success_card.jpg" alt="Expert Tutor" />
            </div>
          </motion.div>

          {/* Floating Pill Right (Video Courses) */}
          <motion.div
            className="tl-floating-badge right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="tl-stat-pill">
              <div className="tl-stat-icon">
                <Video size={16} />
              </div>
              <div className="tl-stat-content">
                <div className="tl-stat-val">120+</div>
                <div className="tl-stat-lbl">Video courses</div>
              </div>
            </div>
            <div className="tl-badge-avatar-box">
              <img src="/ceo_laptop_card.jpg" alt="Video Course Preview" />
              <div className="tl-play-mini-overlay">
                <Play size={12} fill="#ffffff" />
              </div>
            </div>
          </motion.div>

          {/* Reviews Stack Badge */}
          <motion.div
            className="tl-reviews-pill"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="tl-avatar-stack">
              <img src="/tutor_success_card.jpg" alt="User 1" />
              <img src="/ceo_laptop_card.jpg" alt="User 2" />
              <img src="/tutor_experienced_card.jpg" alt="User 3" />
            </div>
            <span className="tl-reviews-text">125k+ student reviews</span>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.h1
            className="tl-hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span>Build skills</span>
            <span>New opportunities.</span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            className="tl-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            codeforeverybody gives you a complete learning experience that helps you gain real, job-ready skills and take the next step in your career.
          </motion.p>

          {/* Primary Navigation CTA Buttons */}
          <motion.div
            className="tl-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button type="button" className="tl-btn-explore" onClick={handleExploreClick}>
              <span>Explore Our Courses</span>
              <div className="tl-arrow-circle">
                <ArrowRight size={16} />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Bottom 3 Featured Hero Cards */}
        <motion.div
          className="tl-cards-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Card 1: 92% Career Outcome Success */}
          <motion.div
            className="tl-hero-card"
            whileHover={{ y: -8 }}
            onClick={handleExploreClick}
          >
            <img
              src="/tutor_success_card.jpg"
              alt="92% Career Outcome Success"
              className="tl-card-bg-img"
            />
            <div className="tl-card-gradient-overlay">
              <div className="tl-card-info">
                <h3 className="tl-card-title-lg">92% Career Outcome Success</h3>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Interactive Project Labs */}
          <motion.div
            className="tl-hero-card"
            whileHover={{ y: -8 }}
            onClick={handleExploreClick}
          >
            <img
              src="/ceo_laptop_card.jpg"
              alt="Interactive Project Labs"
              className="tl-card-bg-img"
            />
            <div className="tl-card-gradient-overlay">
              <div className="tl-play-circle-lg">
                <Play size={20} fill="#0d0e12" style={{ marginLeft: 3 }} />
              </div>
              <div className="tl-card-info">
                <h3 className="tl-card-title-lg">Interactive Project Labs</h3>
                <div className="tl-card-sub-text">50+ Real-World Production Projects & Labs</div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: 100+ Experienced tutor */}
          <motion.div
            className="tl-hero-card"
            whileHover={{ y: -8 }}
            onClick={handleExploreClick}
          >
            <img
              src="/tutor_experienced_card.jpg"
              alt="100+ Experienced tutor"
              className="tl-card-bg-img"
            />
            <div className="tl-card-gradient-overlay">
              <div className="tl-card-info">
                <h3 className="tl-card-title-lg">100+ Experienced tutor</h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
