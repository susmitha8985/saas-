import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSEO } from '../../utils/seo';
import './ThankYouPage.css';

export default function ThankYouPage() {
  const navigate = useNavigate();

  useSEO({
    title: 'Thank You',
    description: 'Thank you for connecting with codeforeverybody!',
  });

  useEffect(() => {
    // Trigger confetti celebratory effect on page load
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="ty-container">
      <div className="ty-card">
        <motion.div
          className="ty-icon-wrap"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <CheckCircle2 size={48} color="#10b981" />
        </motion.div>

        <motion.h1
          className="ty-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          You're All Set!
        </motion.h1>

        <motion.p
          className="ty-desc"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Thank you for joining codeforeverybody! Your enrollment & account details have been sent to your email address.
        </motion.p>

        <motion.div
          className="ty-info-box"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="ty-info-item">
            <Sparkles size={18} color="#6366f1" />
            <span>Access 120+ video courses and hands-on labs immediately.</span>
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="ty-btn"
          onClick={() => navigate('/')}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Go to Dashboard</span>
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
