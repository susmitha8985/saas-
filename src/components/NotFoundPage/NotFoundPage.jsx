import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight, AlertCircle } from 'lucide-react';
import { useSEO } from '../../utils/seo';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useSEO({
    title: '404 Page Not Found',
    description: 'The requested page could not be found on codeforeverybody.',
  });

  return (
    <div className="nf-container">
      <div className="nf-content">
        <motion.div
          className="nf-badge"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <AlertCircle size={20} />
          <span>404 ERROR</span>
        </motion.div>

        <motion.h1
          className="nf-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Lost in Code Space?
        </motion.h1>

        <motion.p
          className="nf-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The page or course link you are looking for doesn't exist or has been moved to a new route.
        </motion.p>

        <motion.div
          className="nf-actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button type="button" className="nf-btn-primary" onClick={() => navigate('/')}>
            <Home size={18} />
            <span>Return to Home</span>
          </button>

          <button type="button" className="nf-btn-secondary" onClick={() => navigate('/auth')}>
            <span>Browse Courses</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
