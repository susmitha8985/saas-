import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseHub.css';

const coursesData = [
  {
    id: 'python-django',
    category: 'PYTHON & FRAMEWORKS',
    bgTitle: 'Python Fundamentals',
    title: 'Python Backend Course',
    subtitle: 'Master modern Python 3.12, Django, and scalable web architecture.',
    tags: ['PYTHON', 'DJANGO', 'BACKEND'],
    description: `As Python Backend Course user, master Python 3 frameworks and fast web development with Python ecosystems, including web scraping, custom middlewares, ORM optimization, and async web services with FastAPI and Django.`,
    features: [
      'Database integration with PostgreSQL, Redis & MongoDB',
      'Async tasks & background workers with Celery',
      'Comprehensive REST API development with JWT Auth & rate limiting',
      'Production deployment on AWS & Docker'
    ],
    cardGraphic: {
      bgColor: '#1e293b',
      primaryIcon: '🐍',
      badge: 'Django',
      accentColor: '#38bdf8'
    }
  },
  {
    id: 'db-management',
    category: 'DATABASE DESIGN',
    bgTitle: 'Database Management',
    title: 'Database Architecture & SQL',
    subtitle: 'From relational schema design to high-throughput indexing.',
    tags: ['POSTGRESQL', 'SQL', 'REDIS'],
    description: `Learn how to architect resilient database layers for high-load backend services. Master indexing strategies, query execution plans, transactions, replication, and caching patterns.`,
    features: [
      'Relational modeling with PostgreSQL & complex queries',
      'NoSQL patterns with MongoDB & dynamic document schemas',
      'In-memory caching with Redis for sub-millisecond latencies',
      'Database migration pipelines and schema versioning'
    ],
    cardGraphic: {
      bgColor: '#0f172a',
      primaryIcon: '🛢️',
      badge: 'SQL',
      accentColor: '#0ea5e9'
    }
  },
  {
    id: 'api-design',
    category: 'API & INTEGRATIONS',
    bgTitle: 'API Architecture',
    title: 'RESTful & GraphQL API Engineering',
    subtitle: 'Build robust, well-documented, and secure APIs at enterprise scale.',
    tags: ['API', 'REST', 'GRAPHQL'],
    description: `Design enterprise-ready APIs built for developer experience and performance. Covers OpenAPI specification, rate-limiting, OAuth2 authentication, WebSockets for real-time communication, and GraphQL schema architecture.`,
    features: [
      'OpenAPI / Swagger auto-generated documentation',
      'Real-time bi-directional streaming via WebSockets',
      'Authentication flows: JWT, OAuth2, API Keys',
      'Payload validation, pagination, and error handling standards'
    ],
    cardGraphic: {
      bgColor: '#111827',
      primaryIcon: '🔌',
      badge: 'API',
      accentColor: '#10b981'
    }
  },
  {
    id: 'fastapi-microservices',
    category: 'ASYNC & FASTAPI',
    bgTitle: 'System Design & Scaling',
    title: 'FastAPI & Async Microservices',
    subtitle: 'Ultra-fast asynchronous Python services powered by Pydantic & Starlette.',
    tags: ['FASTAPI', 'ASYNC', 'MICROSERVICES'],
    description: `Harness Python's async/await capabilities with FastAPI. Build production-ready microservices featuring automatic serialization, strict typing with Pydantic, and high-concurrency throughput.`,
    features: [
      'High performance async requests handling',
      'Strict payload validation using Pydantic V2',
      'Microservice inter-service communication via gRPC & NATS',
      'Automated testing suites with PyTest & HTTPX'
    ],
    cardGraphic: {
      bgColor: '#064e3b',
      primaryIcon: '⚡',
      badge: 'FastAPI',
      accentColor: '#34d399'
    }
  },
  {
    id: 'cloud-deployment',
    category: 'DEVOPS & CLOUD',
    bgTitle: 'Cloud Deployment',
    title: 'Cloud Deployment & DevOps',
    subtitle: 'Containerize, orchestrate, and deploy backend clusters automatically.',
    tags: ['DOCKER', 'KUBERNETES', 'AWS'],
    description: `Automate end-to-end delivery pipelines. Package applications into slim Docker containers, orchestrate multi-container setups with Docker Compose, and manage automated deployments on Kubernetes clusters.`,
    features: [
      'Multi-stage Docker builds for minimal container footprints',
      'Kubernetes manifests, ingress controllers, and auto-scaling',
      'CI/CD deployment pipelines with GitHub Actions',
      'Infrastructure monitoring with Prometheus & Grafana'
    ],
    cardGraphic: {
      bgColor: '#172554',
      primaryIcon: '☁️',
      badge: 'Docker',
      accentColor: '#60a5fa'
    }
  }
];

export default function CourseHub() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const activeCourse = coursesData[activeIndex];

  const handleCardClick = (course, index) => {
    setActiveIndex(index);
    setSelectedCourse(course);
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  return (
    <div className={`landing-container ${selectedCourse ? 'detail-open' : ''}`}>
      {/* Background Grid Pattern */}
      <div className="grid-overlay" />

      {/* Top Header Navbar */}
      <header className="navbar">
        <div className="brand" onClick={() => setSelectedCourse(null)}>
          <span className="brand-name">codeForEveryBody</span>
          <span className="brand-title"> • FullStack Academy</span>
        </div>

        <nav className="nav-center">
          <a href="#highlights" className="nav-link active" onClick={(e) => { e.preventDefault(); setSelectedCourse(null); }}>Highlights</a>
          <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/overview'); }}>About</a>
          <a href="#projects" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/projects'); }}>More Projects</a>
        </nav>

        <div className="nav-right">
          <span className="lang-switch">EN - FR</span>
          <button className="contact-btn" onClick={() => navigate('/auth')}>Get in Touch</button>
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="main-content">
        {/* Dynamic Big Background Watermark Text */}
        <div className="bg-watermark">
          <h1>{selectedCourse ? selectedCourse.bgTitle : activeCourse.bgTitle}</h1>
        </div>

        {/* Normal Deck / Detail Split View Container */}
        {!selectedCourse ? (
          /* Cards Carousel Deck View */
          <div className="deck-wrapper">
            <div className="cards-deck">
              {coursesData.map((course, idx) => (
                <div
                  key={course.id}
                  className={`course-card ${idx === activeIndex ? 'active-card' : ''}`}
                  onClick={() => handleCardClick(course, idx)}
                  style={{ '--card-bg': course.cardGraphic.bgColor }}
                >
                  <div className="card-inner">
                    <div className="card-top-badge" style={{ color: course.cardGraphic.accentColor }}>
                      {course.cardGraphic.badge}
                    </div>
                    <div className="card-icon">{course.cardGraphic.primaryIcon}</div>
                    <div className="card-bottom">
                      <p className="card-title-preview">{course.title}</p>
                      <span className="card-tag">{course.tags[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="deck-subtitle">Backend Frameworks</div>
          </div>
        ) : (
          /* Detailed Expanded Course View */
          <div className="detail-layout">
            <div className="detail-panel-left">
              <button className="back-btn" onClick={handleBack}>
                ← Back
              </button>

              <div className="detail-tags">
                {selectedCourse.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              <h2 className="detail-title">{selectedCourse.title}</h2>
              <p className="detail-description">{selectedCourse.description}</p>

              <ul className="detail-features">
                {selectedCourse.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <div className="detail-actions">
                <button className="see-project-btn" onClick={() => navigate('/auth')}>
                  Enroll in Course <span>↗</span>
                </button>
              </div>
            </div>

            <div className="detail-panel-right">
              <div className="stacked-cards-preview">
                {coursesData.map((course, idx) => (
                  <div
                    key={course.id}
                    className={`stacked-card ${course.id === selectedCourse.id ? 'is-selected' : ''}`}
                    onClick={() => handleCardClick(course, idx)}
                    style={{
                      '--card-bg': course.cardGraphic.bgColor,
                      transform: `rotate(${(idx - activeIndex) * 6}deg) translateY(${(idx - activeIndex) * 12}px)`
                    }}
                  >
                    <div className="card-inner">
                      <div className="card-top-badge" style={{ color: course.cardGraphic.accentColor }}>
                        {course.cardGraphic.badge}
                      </div>
                      <div className="card-icon">{course.cardGraphic.primaryIcon}</div>
                      <p className="mini-title">{course.tags[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <span className="separator">✕</span>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>

        {/* Tilted Profile Card Preview in Footer */}
        <div className="footer-profile-card">
          <div className="profile-photo-placeholder">
            <span>SE</span>
          </div>
        </div>

        <div className="location-info">
          Coded in Morteau, Franche-Comté, France
        </div>
      </footer>
    </div>
  );
}
