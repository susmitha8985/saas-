import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check } from 'lucide-react';
import './CookieBanner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="ck-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="ck-content">
            <div className="ck-icon">
              <Cookie size={20} />
            </div>
            <p className="ck-text">
              We use cookies to personalize content, analyze traffic, and improve your experience on <strong>codeforeverybody</strong>. Read our <a href="/privacy">Privacy Policy</a>.
            </p>
          </div>

          <div className="ck-actions">
            <button type="button" className="ck-btn-decline" onClick={handleDecline}>
              Decline
            </button>
            <button type="button" className="ck-btn-accept" onClick={handleAccept}>
              <Check size={14} /> Accept Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
