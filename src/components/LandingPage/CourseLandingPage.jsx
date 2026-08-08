import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseLandingPage.css';

// SVG Visual Graphics built to match the video visuals
const CardGraphic = ({ type }) => {
  switch (type) {
    case 'django':
      return (
        <div className="card-graphic-wrapper django-style">
          <div className="svg-container">
            <svg viewBox="0 0 120 120" className="graphic-svg">
              {/* Python Snakes */}
              <path fill="#3776ab" d="M59.5 10c-22.3 0-20.9 9.7-20.9 9.7l.1 10.1h21.4v3H39.7S25 31.2 25 53.7c0 22.5 12.8 21.7 12.8 21.7h7.6v-10.8s-.4-12.8 12.8-12.8h21.1s12.2.2 12.2-12V22.1S73.5 10 49.5 10zm-11.7 6.8a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4z" />
              <path fill="#ffd43b" d="M60.5 100c22.3 0 20.9-9.7 20.9-9.7V80.2H60V77.2h30.4s14.7 1.6 14.7-20.9c0-22.5-12.8-21.7-12.8-21.7h-7.6v10.8s.4 12.8-12.8 12.8H50.8s-12.2-.2-12.2 12v17.7S36.5 100 60.5 100zm11.7-6.8a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4z" />
            </svg>
          </div>
          <div className="django-badge">django</div>
        </div>
      );

    case 'er-diagram':
      return (
        <div className="card-graphic-wrapper diagram-style">
          <svg viewBox="0 0 140 100" className="graphic-svg">
            {/* Database ER Tables */}
            <rect x="10" y="10" width="35" height="45" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="10" y="10" width="35" height="12" fill="#3b82f6" rx="3" />
            <line x1="15" y1="30" x2="38" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <line x1="15" y1="38" x2="32" y2="38" stroke="#cbd5e1" strokeWidth="2" />

            <rect x="90" y="25" width="35" height="50" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="90" y="25" width="35" height="12" fill="#0284c7" rx="3" />
            <line x1="95" y1="45" x2="118" y2="45" stroke="#94a3b8" strokeWidth="2" />
            <line x1="95" y1="53" x2="112" y2="53" stroke="#cbd5e1" strokeWidth="2" />

            {/* Connecting Lines */}
            <path d="M 45 32 C 65 32, 70 50, 90 50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
          </svg>
        </div>
      );

    case 'sql-server':
      return (
        <div className="card-graphic-wrapper server-style">
          <svg viewBox="0 0 140 100" className="graphic-svg">
            {/* Server Chassis */}
            <rect x="25" y="15" width="90" height="65" rx="6" fill="#1e293b" />
            <rect x="33" y="23" width="74" height="12" rx="3" fill="#334155" />
            <circle cx="40" cy="29" r="2.5" fill="#38bdf8" />
            <rect x="33" y="41" width="74" height="12" rx="3" fill="#334155" />
            <circle cx="40" cy="47" r="2.5" fill="#38bdf8" />
            <rect x="33" y="59" width="74" height="12" rx="3" fill="#334155" />
            <circle cx="40" cy="65" r="2.5" fill="#22c55e" />
          </svg>
          <div className="sql-3d-text">SQL</div>
        </div>
      );

    case 'api-hub':
      return (
        <div className="card-graphic-wrapper api-style">
          <svg viewBox="0 0 140 100" className="graphic-svg">
            <circle cx="70" cy="50" r="28" fill="#10b981" opacity="0.15" />
            <circle cx="70" cy="50" r="18" fill="#10b981" />
            <text x="70" y="54" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="12">API</text>
            <path d="M25 50 L52 50 M88 50 L115 50 M70 20 L70 32 M70 68 L70 80" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'fastapi-code':
      return (
        <div className="card-graphic-wrapper code-style">
          <div className="editor-window">
            <div className="editor-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="editor-body">
              <span className="kwd">from</span> fastapi <span className="kwd">import</span> FastAPI<br />
              app = FastAPI()<br />
              <span className="kwd">@app</span>.get(<span className="str">"/"</span>)<br />
              <span className="kwd">async def</span> root():<br />
              &nbsp;&nbsp;<span className="kwd">return</span> &#123;<span className="str">"message"</span>: <span className="str">"Hello"</span>&#125;
            </div>
          </div>
          <div className="fastapi-badge">
            <span className="bolt">⚡</span> FastAPI
          </div>
        </div>
      );

    case 'cloud-db':
      return (
        <div className="card-graphic-wrapper cloud-style">
          <svg viewBox="0 0 140 100" className="graphic-svg">
            <path d="M 45 60 A 18 18 0 0 1 42 26 A 24 24 0 0 1 88 22 A 20 20 0 0 1 102 58 Z" fill="#0284c7" opacity="0.85" />
            {/* Cylinder DB */}
            <ellipse cx="70" cy="62" rx="16" ry="5" fill="#38bdf8" />
            <path d="M 54 62 L 54 74 A 16 5 0 0 0 86 74 L 86 62 Z" fill="#0ea5e9" />
          </svg>
          <div className="mongo-text">mongoDB</div>
        </div>
      );

    default:
      return null;
  }
};

const CATEGORIES = [
  { id: 'python-cat', label: 'Python Fundamentals', courseIndex: 0 },
  { id: 'database-cat', label: 'Database Management', courseIndex: 1 },
  { id: 'system-cat', label: 'System Design & Scaling', courseIndex: 3 },
  { id: 'cloud-cat', label: 'Cloud Deployment', courseIndex: 4 }
];

const COURSES = [
  {
    id: 'course-django',
    catId: 'python-cat',
    bgTitle: 'Python Fundamentals',
    title: 'Python Backend Course',
    tags: ['FASTAPI', 'POSTGRESQL', 'DOCKER'],
    description: "As Python Backend Course user, master Python 3 frameworks and fast web development with Python ecosystems, including web scraping, custom middlewares, ORM optimization, and async web services with FastAPI and Django.",
    bullets: [
      { key: 'Technologies', text: 'Python, Django, PostgreSQL, Database, API development, API monitoring' },
      { key: 'Ecosystem', text: 'Frontend development, backend frameworks and architecture, microservices, deployment strategies, and CI/CD pipelines' },
      { key: 'Hands-on experience', text: 'Real-world projects, modern frameworks, production-grade pipelines and microservice architectures.' }
    ],
    graphicType: 'django'
  },
  {
    id: 'course-er',
    catId: 'database-cat',
    bgTitle: 'Database Management',
    title: 'Relational Database Design',
    tags: ['POSTGRESQL', 'SQL', 'SCHEMA'],
    description: "Master entity-relationship modeling, schema normalization, query optimization, and complex joins in PostgreSQL for high-throughput transactional backends.",
    bullets: [
      { key: 'Technologies', text: 'PostgreSQL, MySQL, Database ER Diagrams, Query Profiling' },
      { key: 'Ecosystem', text: 'Relational modeling, migration scripts, ORM mappings' },
      { key: 'Hands-on experience', text: 'Designing normalized production enterprise schemas.' }
    ],
    graphicType: 'er-diagram'
  },
  {
    id: 'course-sql',
    catId: 'database-cat',
    bgTitle: 'Database Management',
    title: 'High Performance SQL & Caching',
    tags: ['SQL', 'REDIS', 'CACHING'],
    description: "Deep dive into execution plans, indexing strategies, connection pooling, and sub-millisecond key-value caching using Redis.",
    bullets: [
      { key: 'Technologies', text: 'SQL, Redis, Connection Poolers, Index Profiling' },
      { key: 'Ecosystem', text: 'In-memory caching patterns, read replicas, transaction isolation' },
      { key: 'Hands-on experience', text: 'Building zero-latency query caching layers.' }
    ],
    graphicType: 'sql-server'
  },
  {
    id: 'course-api',
    catId: 'system-cat',
    bgTitle: 'System Design & Scaling',
    title: 'RESTful & GraphQL API Architecture',
    tags: ['API', 'REST', 'GRAPHQL'],
    description: "Architect production-grade APIs with automated OpenAPI spec, rate limiting, JWT/OAuth2 security, and real-time WebSockets.",
    bullets: [
      { key: 'Technologies', text: 'REST API, GraphQL, OpenAPI, JWT, WebSockets' },
      { key: 'Ecosystem', text: 'API Gateways, microservice contracts, schema validation' },
      { key: 'Hands-on experience', text: 'Constructing secure multi-tenant API systems.' }
    ],
    graphicType: 'api-hub'
  },
  {
    id: 'course-fastapi',
    catId: 'system-cat',
    bgTitle: 'System Design & Scaling',
    title: 'FastAPI Async Microservices',
    tags: ['FASTAPI', 'ASYNC', 'PYDANTIC'],
    description: "Harness non-blocking Python async/await paradigms powered by Starlette and Pydantic V2 for ultra-fast concurrent microservices.",
    bullets: [
      { key: 'Technologies', text: 'FastAPI, Pydantic, Asyncio, gRPC, NATS' },
      { key: 'Ecosystem', text: 'Asynchronous event loops, worker queues, strict data validation' },
      { key: 'Hands-on experience', text: 'Building resilient asynchronous backend systems.' }
    ],
    graphicType: 'fastapi-code'
  },
  {
    id: 'course-cloud',
    catId: 'cloud-cat',
    bgTitle: 'Cloud Deployment',
    title: 'Cloud Orchestration & MongoDB',
    tags: ['DOCKER', 'KUBERNETES', 'MONGODB'],
    description: "Containerize Python backends with Docker, orchestrate multi-node Kubernetes clusters, and integrate distributed NoSQL MongoDB databases.",
    bullets: [
      { key: 'Technologies', text: 'Docker, Kubernetes, MongoDB, AWS, GitHub Actions' },
      { key: 'Ecosystem', text: 'CI/CD delivery, ingress controllers, dynamic document storage' },
      { key: 'Hands-on experience', text: 'Automating multi-cloud cluster infrastructure.' }
    ],
    graphicType: 'cloud-db'
  }
];

export default function CourseLandingPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const currentCourse = COURSES[activeIndex];

  const handleCategoryClick = (catIndex) => {
    setActiveIndex(catIndex);
  };

  const handleCardClick = (course, index) => {
    setActiveIndex(index);
    setSelectedCourse(course);
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  return (
    <div className={`viewport-root ${selectedCourse ? 'mode-detail' : 'mode-deck'}`}>
      {/* Background SVG Grid Pattern matching video */}
      <div className="background-grid" />

      {/* Dynamic Background Watermark Typography */}
      <div className="watermark-wrapper">
        <h1 key={selectedCourse ? selectedCourse.id : currentCourse.catId} className="watermark-heading">
          {selectedCourse ? selectedCourse.bgTitle : currentCourse.bgTitle}
        </h1>
      </div>

      {/* Header Navigation */}
      <header className="header-bar">
        <div className="brand-group" onClick={() => setSelectedCourse(null)} style={{ cursor: 'pointer' }}>
          <span className="author-name">codeForEveryBody</span>
          <span className="dot-sep">-</span>
          <span className="author-role">FullStack Software Academy</span>
        </div>

        <nav className="center-nav">
          <button className="nav-btn active" onClick={() => setSelectedCourse(null)}>Highlights</button>
          <button className="nav-btn" onClick={() => navigate('/overview')}>About</button>
          <button className="nav-btn" onClick={() => navigate('/projects')}>More Projects</button>
        </nav>

        <div className="right-nav">
          <span className="lang-text">EN - FR</span>
          <button className="touch-btn" onClick={() => navigate('/auth')}>Get in Touch</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-viewport">
        {!selectedCourse ? (
          /* Deck Carousel Mode */
          <div className="deck-mode-container">
            <div className="cards-carousel-stage">
              {COURSES.map((course, idx) => {
                const offset = idx - activeIndex;
                return (
                  <div
                    key={course.id}
                    className={`carousel-card ${idx === activeIndex ? 'is-active' : ''}`}
                    onClick={() => handleCardClick(course, idx)}
                    style={{
                      transform: `translateX(${offset * 160}px) translateZ(${120 - Math.abs(offset) * 45}px) rotateY(${offset * -12}deg)`,
                      zIndex: 20 - Math.abs(offset),
                      opacity: Math.abs(offset) > 3 ? 0 : 1 - Math.abs(offset) * 0.15
                    }}
                  >
                    <div className="card-inner-content">
                      <CardGraphic type={course.graphicType} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Category Sub-Navigation Buttons */}
            <div className="category-control-bar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-btn ${COURSES[activeIndex].bgTitle === cat.label ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat.courseIndex)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <span className="deck-caption">Backend Frameworks • codeForEveryBody</span>
          </div>
        ) : (
          /* Expanded Detail Split-Screen View */
          <div className="detail-split-stage">
            {/* Left Content Area */}
            <div className="detail-left-pane">
              <button className="back-nav-btn" onClick={handleBack}>
                <span className="arrow">←</span> Back
              </button>

              <div className="detail-tags-row">
                {selectedCourse.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              <h2 className="detail-course-title">{selectedCourse.title}</h2>
              <p className="detail-course-description">{selectedCourse.description}</p>

              <div className="detail-bullet-group">
                {selectedCourse.bullets.map((b, i) => (
                  <div key={i} className="bullet-item">
                    <span className="bullet-dot">•</span>
                    <p className="bullet-content">
                      <strong>{b.key}:</strong> {b.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="detail-action-row">
                <button className="see-project-button" onClick={() => navigate('/auth')}>
                  Enroll in Course <span>↗</span>
                </button>
              </div>
            </div>

            {/* Right Side Stacked 3D Cards */}
            <div className="detail-right-pane">
              <div className="stacked-cards-container">
                {COURSES.map((course, idx) => {
                  const stackOffset = idx - activeIndex;
                  return (
                    <div
                      key={course.id}
                      className={`stacked-card ${course.id === selectedCourse.id ? 'is-selected' : ''}`}
                      onClick={() => handleCardClick(course, idx)}
                      style={{
                        transform: `translateY(${stackOffset * 18}px) rotate(${stackOffset * 6}deg)`,
                        zIndex: 10 - Math.abs(stackOffset)
                      }}
                    >
                      <CardGraphic type={course.graphicType} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Bar */}
      <footer className="footer-bar">
        <div className="social-links-container">
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <span className="sep">x</span>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>

        {/* Physical Tilted Photo Badge (Bottom Left) */}
        <div className="tilted-photo-badge">
          <div className="photo-card-inner">
            <div className="portrait-frame">
              <span className="portrait-text">CEB</span>
            </div>
          </div>
        </div>

        <div className="location-text">
          codeForEveryBody Platform • Global Tech Education
        </div>
      </footer>
    </div>
  );
}
