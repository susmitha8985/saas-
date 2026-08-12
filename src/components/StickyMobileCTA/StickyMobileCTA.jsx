import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import './StickyMobileCTA.css';

export default function StickyMobileCTA() {
  const [showSticky, setShowSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTA = () => {
    const el = document.getElementById('explore-courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/auth');
    }
  };

  return (
    <AnimatePresence>
      {showSticky && (
        <motion.div
          className="sm-sticky-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="sm-info">
            <div className="sm-badge">
              <Zap size={12} />
              <span>codeforeverybody</span>
            </div>
            <span className="sm-title">120+ Software Courses</span>
          </div>

          <button type="button" className="sm-btn" onClick={handleCTA}>
            <span>Explore</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
