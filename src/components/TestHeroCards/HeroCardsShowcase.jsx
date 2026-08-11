import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Terminal, Database, Cpu, Cloud } from 'lucide-react';
import './HeroCardsShowcase.css';

const CATEGORIES = [
  {
    id: 'python',
    label: 'Python',
    icon: Terminal,
    bgTitle: 'Python Fundamentals',
    subcaption: 'Backend Frameworks',
    detailTitle: 'Python Backend Course',
    tags: ['REAL ESTATE', 'ECOMMERCE', 'MICROSERVICES'],
    description:
      'Master production-ready backend development with Python, Django & FastAPI. Learn clean architectural patterns, REST API design, ORM query optimization, and test automation.',
    bullets: [
      'Django REST Framework & FastAPI Architecture',
      'PostgreSQL schema design & migration strategies',
      'JWT Authentication, OAuth2 & role-based permissions',
      'Pytest suite with high coverage & mock integrations',
    ],
    cards: [
      { id: 'django', src: '/test_assets/card_django.jpg', alt: 'Django' },
      { id: 'diagram', src: '/test_assets/card_diagram.jpg', alt: 'Schema Diagram' },
      { id: 'server', src: '/test_assets/card_server.jpg', alt: 'Server Rack' },
      { id: 'api', src: '/test_assets/card_api.jpg', alt: 'API Hub' },
      { id: 'code', src: '/test_assets/card_code.jpg', alt: 'Python Code IDE' },
      { id: 'fastapi', src: '/test_assets/card_fastapi.jpg', alt: 'FastAPI Cloud' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    bgTitle: 'Database Management',
    subcaption: 'Relational & NoSQL Datastores',
    detailTitle: 'Database Architecture Masterclass',
    tags: ['POSTGRESQL', 'MONGODB', 'REDIS'],
    description:
      'From schema normalization to query performance tuning. Understand indexing strategies, connection pooling, transactional integrity, and multi-region database replication.',
    bullets: [
      'Relational modeling in PostgreSQL & SQL query tuning',
      'Document store indexing & aggregation in MongoDB',
      'In-memory caching patterns & pub/sub with Redis',
      'Database migration locks & zero-downtime schemas',
    ],
    cards: [
      { id: 'flask', src: '/test_assets/card_flask.jpg', alt: 'Flask' },
      { id: 'sql_server', src: '/test_assets/card_sql_server.jpg', alt: 'SQL Server' },
      { id: 'api_hub', src: '/test_assets/card_api_hub.jpg', alt: 'API Hub' },
      { id: 'ide', src: '/test_assets/card_ide.jpg', alt: 'Database IDE' },
      { id: 'sql_cloud', src: '/test_assets/card_sql_cloud.jpg', alt: 'SQL Cloud' },
      { id: 'mongodb', src: '/test_assets/card_mongodb.jpg', alt: 'MongoDB' },
    ],
  },
  {
    id: 'system',
    label: 'System Design',
    icon: Cpu,
    bgTitle: 'System Design & Scaling',
    subcaption: 'Distributed Architecture',
    detailTitle: 'High Scale Distributed Systems',
    tags: ['MICROSERVICES', 'LOAD BALANCING', 'KUBERNETES'],
    description:
      'Architect systems engineered for millions of requests per second. Explore rate limiting, circuit breakers, message broker queues, and microservice mesh patterns.',
    bullets: [
      'Monolith to microservice decoupling strategies',
      'Asynchronous task queues using Celery & RabbitMQ',
      'Horizontal auto-scaling & reverse proxy routing',
      'Resiliency engineering, fallback handlers & idempotency',
    ],
    cards: [
      { id: 'sys_json', src: '/test_assets/card_sys_json.jpg', alt: 'JSON Config' },
      { id: 'sys_hardware', src: '/test_assets/card_sys_hardware.jpg', alt: 'Hardware Server' },
      { id: 'sys_micro', src: '/test_assets/card_sys_micro.jpg', alt: 'Microservices' },
      { id: 'sys_cloud', src: '/test_assets/card_sys_cloud.jpg', alt: 'Cloud Arch' },
      { id: 'sys_arch', src: '/test_assets/card_sys_arch.jpg', alt: 'System Arch' },
      { id: 'sys_k8s', src: '/test_assets/card_sys_k8s.jpg', alt: 'Kubernetes' },
    ],
  },
  {
    id: 'deployment',
    label: 'Deployment',
    icon: Cloud,
    bgTitle: 'Deployment',
    subcaption: 'Cloud Infrastructure & DevOps',
    detailTitle: 'Cloud Infrastructure & CI/CD',
    tags: ['DOCKER', 'AWS', 'GITHUB ACTIONS'],
    description:
      'Containerize applications with Docker multi-stage builds and automate zero-downtime deployments to cloud clusters with automated CI/CD pipelines.',
    bullets: [
      'Optimized multi-stage Docker containerization',
      'Kubernetes ingress, secrets & config maps management',
      'Automated GitHub Actions CI/CD workflow pipelines',
      'Infrastructure as Code with Terraform & AWS cloud',
    ],
    cards: [
      { id: 'dep_load', src: '/test_assets/card_dep_load.jpg', alt: 'Load Balancer' },
      { id: 'dep_services', src: '/test_assets/card_dep_services.jpg', alt: 'Services' },
      { id: 'dep_cloud', src: '/test_assets/card_dep_cloud.jpg', alt: 'Cloud' },
      { id: 'dep_docker', src: '/test_assets/card_dep_docker.jpg', alt: 'Docker' },
      { id: 'dep_k8s', src: '/test_assets/card_dep_k8s.jpg', alt: 'Kubernetes' },
      { id: 'dep_fastapi', src: '/test_assets/card_dep_fastapi.jpg', alt: 'FastAPI' },
    ],
  },
];

export default function HeroCardsShowcase() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading Portfolio Assets');
  const [catIndex, setCatIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [lang, setLang] = useState('EN');

  // Initial loader animation (1.4s)
  useEffect(() => {
    const textSequence = [
      'Loading Portfolio Assets',
      'Initializing 3D Cards Deck...',
      'Ready',
    ];
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < textSequence.length) {
        setLoadingText(textSequence[step]);
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const activeCat = CATEGORIES[catIndex];

  return (
    <div className="hk-root">
      <div className="hk-grid-bg" />

      {/* Starting Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="hk-loader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="hk-loader-text-wrap">
              <motion.div
                key={loadingText}
                className="hk-loader-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {loadingText}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <header className="hk-header">
        <div className="hk-brand">codeforeverybody</div>

        <nav className="hk-nav">
          <span
            className={`hk-nav-item ${selectedCard === null ? 'active' : ''}`}
            onClick={() => setSelectedCard(null)}
          >
            Highlights
          </span>
          <span className="hk-nav-item">About</span>
          <span className="hk-nav-item">More Projects</span>
        </nav>

        <div className="hk-header-actions">
          <button
            type="button"
            className="hk-lang-toggle"
            onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
          >
            {lang === 'EN' ? 'EN – FR' : 'FR – EN'}
          </button>
          <button type="button" className="hk-contact-btn">
            Get In Touch
          </button>
        </div>
      </header>

      {/* Main Hero Area */}
      <main className="hk-main">
        {!isLoading && selectedCard === null ? (
          <>
            {/* Active Category Header Text at Top (Moved from background) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat.id}
                className="hk-top-title-wrap"
                initial={{ opacity: 0, y: -15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 1.02 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h1 className="hk-hero-title">{activeCat.bgTitle}</h1>
                <p className="hk-hero-subcaption">{activeCat.subcaption}</p>
              </motion.div>
            </AnimatePresence>

            {/* Overlapping Card Deck with Fly-in Deal Animation */}
            <div className="hk-deck-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCat.id}
                  className="hk-deck"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {activeCat.cards.map((cardObj, idx) => (
                    <motion.div
                      key={cardObj.id}
                      className="hk-card"
                      style={{ zIndex: idx + 1 }}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 120 + idx * 20,
                          rotate: -12 + idx * 4,
                          scale: 0.85,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: idx * 0.07,
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -80,
                          scale: 0.9,
                          transition: { duration: 0.2, delay: idx * 0.03 },
                        },
                      }}
                      whileHover={{
                        y: -26,
                        scale: 1.08,
                        rotateZ: 2,
                        zIndex: 60,
                        boxShadow: '0 24px 48px rgba(0,0,0,0.22)',
                        transition: { type: 'spring', stiffness: 400, damping: 22 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCard(idx)}
                    >
                      <img
                        src={cardObj.src}
                        alt={cardObj.alt}
                        className="hk-card-img"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Category Selection Buttons Bar at Bottom of Cards */}
            <motion.div
              className="hk-category-bar bottom"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {CATEGORIES.map((cat, idx) => {
                const IconComp = cat.icon;
                const isActive = idx === catIndex;
                return (
                  <motion.button
                    key={cat.id}
                    type="button"
                    className={`hk-category-tab${isActive ? ' active' : ''}`}
                    onClick={() => {
                      setCatIndex(idx);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComp size={14} />
                    <span>{cat.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        ) : !isLoading && selectedCard !== null ? (
          /* Detail View Transition */
          <motion.div
            className="hk-detail-container"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="hk-detail-left">
              <button
                type="button"
                className="hk-back-btn"
                onClick={() => setSelectedCard(null)}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <h1 className="hk-detail-title">{activeCat.detailTitle}</h1>

              <div className="hk-tag-group">
                {activeCat.tags.map((tag) => (
                  <span key={tag} className="hk-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="hk-detail-desc">{activeCat.description}</p>

              <ul className="hk-bullet-list">
                {activeCat.bullets.map((b) => (
                  <li key={b} className="hk-bullet-item">
                    <span className="hk-bullet-dot" />
                    {b}
                  </li>
                ))}
              </ul>

              <a href="#project" className="hk-cta-btn">
                See Project <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Right Side 3D Floating Gallery */}
            <div className="hk-detail-right">
              <div className="hk-floating-gallery">
                <div className="hk-gallery-bg-card">
                  <img
                    src="/test_assets/industrial_parts_dashboard.jpg"
                    alt="Project Showcase Dashboard"
                  />
                </div>

                <div className="hk-gallery-cards-fan">
                  {activeCat.cards.slice(0, 4).map((cardObj, idx) => (
                    <motion.div
                      key={`fan-${cardObj.id}`}
                      className="hk-fan-card"
                      initial={{ opacity: 0, y: 40, rotate: -20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotate: idx * 4 - 6,
                      }}
                      transition={{ delay: 0.1 + idx * 0.06 }}
                    >
                      <img src={cardObj.src} alt={cardObj.alt} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        <div className="hk-sparkle-star">✦</div>
      </main>

      {/* Footer */}
      <footer className="hk-footer">
        <div className="hk-socials">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            X
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            YouTube
          </a>
        </div>
        <div className="hk-footer-note">
          codeforeverybody
        </div>
      </footer>
    </div>
  );
}
