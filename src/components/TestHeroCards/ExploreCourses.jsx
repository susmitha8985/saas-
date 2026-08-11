import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Search,
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  Award,
  Sparkles,
  PlayCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import './ExploreCourses.css';

const COURSES_DATA = [
  {
    id: 'course-python-1',
    category: 'python',
    badge: 'Bestseller',
    badgeType: 'bestseller',
    title: 'Python Backend Engineering: Django REST & FastAPI Masterclass',
    subtitle:
      'Build scalable RESTful APIs, master ORM query optimization, PostgreSQL schema design, microservices, and automated pytest suites.',
    instructor: 'codeforeverybody',
    instructorTitle: 'Principal Software Architect & Lead Instructor',
    rating: 4.9,
    reviewsCount: 4230,
    studentsCount: 32800,
    duration: '46.5 total hours',
    lectures: 290,
    level: 'All Levels',
    price: '$19.99',
    originalPrice: '$89.99',
    discount: '78% off',
    image: '/test_assets/card_django.jpg',
    updatedDate: 'August 2026',
    language: 'English',
    learnings: [
      'Architect production-ready Django REST Framework & FastAPI microservices',
      'Optimize complex PostgreSQL ORM queries, indexes, and schema migrations',
      'Implement OAuth2, JWT authentication, RBAC permissions, and Redis caching',
      'Build robust automated testing pipelines using Pytest with 90%+ code coverage',
      'Containerize backend services with Docker multi-stage builds',
      'Design clean layered architectures with repository and service patterns',
    ],
    curriculum: [
      {
        title: 'Module 1: Advanced Python & Async Foundations',
        duration: '4h 15m',
        lecturesCount: 24,
        lectures: [
          'Course Overview & Production Setup',
          'Python Type Hinting & Pydantic Data Validation',
          'Asynchronous I/O Deep Dive with asyncio',
          'Custom Decorators & Context Managers in Practice',
        ],
      },
      {
        title: 'Module 2: Django REST Framework Architecture',
        duration: '8h 30m',
        lecturesCount: 48,
        lectures: [
          'Domain-Driven Django Project Structure',
          'Serializers, ModelSerializers & Nested Data',
          'Custom Permissions & JWT Authentication',
          'QuerySet Optimization & N+1 Problem Prevention',
        ],
      },
      {
        title: 'Module 3: High-Performance FastAPI Services',
        duration: '7h 45m',
        lecturesCount: 38,
        lectures: [
          'FastAPI Dependency Injection System',
          'Asynchronous Endpoints & Database Connection Pools',
          'OpenAPI Documentation & Interactive Swagger',
          'Background Tasks & Celery Workers',
        ],
      },
      {
        title: 'Module 4: PostgreSQL Schemas & Migration Integrity',
        duration: '6h 10m',
        lecturesCount: 32,
        lectures: [
          'Relational Normalization & Indexing Strategies',
          'Zero-Downtime Migration Locking Strategies',
          'Transaction Isolation Levels & Row Locks',
        ],
      },
    ],
  },
  {
    id: 'course-db-1',
    category: 'database',
    badge: 'Highest Rated',
    badgeType: 'highest-rated',
    title: 'Advanced Database Architecture: PostgreSQL, Redis & MongoDB',
    subtitle:
      'From schema normalization and indexing strategies to distributed database replication, sharding, and zero-downtime schema migrations.',
    instructor: 'codeforeverybody',
    instructorTitle: 'Database Infrastructure Lead',
    rating: 4.9,
    reviewsCount: 2910,
    studentsCount: 19400,
    duration: '38.0 total hours',
    lectures: 215,
    level: 'Intermediate',
    price: '$18.99',
    originalPrice: '$79.99',
    discount: '76% off',
    image: '/test_assets/card_mongodb.jpg',
    updatedDate: 'July 2026',
    language: 'English',
    learnings: [
      'Master B-Tree, GIN, and BRIN indexing strategies in PostgreSQL',
      'Tune complex SQL queries using EXPLAIN ANALYZE diagnostic plans',
      'Implement Redis in-memory caching patterns and pub/sub queues',
      'Design MongoDB document schemas and aggregation pipelines',
      'Manage connection pooling, transaction locks, and deadlock recovery',
    ],
    curriculum: [
      {
        title: 'Module 1: Relational Modeling & PostgreSQL Deep Dive',
        duration: '5h 40m',
        lecturesCount: 30,
        lectures: [
          'Database Normalization vs Practical Denormalization',
          'PostgreSQL Internal Storage & Page Architecture',
          'Indexes: B-Tree, Hash, GIN, and Partial Indexes',
        ],
      },
      {
        title: 'Module 2: Query Tuning & Performance Diagnostics',
        duration: '6h 50m',
        lecturesCount: 35,
        lectures: [
          'Reading EXPLAIN ANALYZE Execution Plans',
          'Joint Algorithms: Nested Loop, Hash Join, Merge Join',
          'Partitioning Large Tables & Maintenance Vacuuming',
        ],
      },
      {
        title: 'Module 3: Redis In-Memory Datastores & Pub/Sub',
        duration: '4h 30m',
        lecturesCount: 28,
        lectures: [
          'Caching Topologies: Cache-Aside, Write-Through',
          'Redis Data Structures & Memory Eviction Policies',
          'Distributed Locking with Redlock Algorithm',
        ],
      },
    ],
  },
  {
    id: 'course-sys-1',
    category: 'system',
    badge: 'Hot & New',
    badgeType: 'hot-new',
    title: 'High-Scale System Design: Distributed Architecture & Microservices',
    subtitle:
      'Architect systems engineered for millions of requests per second. Explore rate limiting, circuit breakers, event queues, and Kafka.',
    instructor: 'codeforeverybody',
    instructorTitle: 'Principal Systems Architect',
    rating: 4.8,
    reviewsCount: 3420,
    studentsCount: 27100,
    duration: '52.0 total hours',
    lectures: 340,
    level: 'Advanced',
    price: '$22.99',
    originalPrice: '$99.99',
    discount: '77% off',
    image: '/test_assets/card_sys_arch.jpg',
    updatedDate: 'August 2026',
    language: 'English',
    learnings: [
      'Decouple monolithic systems into domain-driven microservices',
      'Implement asynchronous task queues with Celery, RabbitMQ & Kafka',
      'Configure rate limiters, circuit breakers, and fallback handlers',
      'Design load balancing, consistent hashing, and reverse proxies',
      'Master data idempotency, saga patterns, and distributed transactions',
    ],
    curriculum: [
      {
        title: 'Module 1: Distributed System Fundamentals',
        duration: '4h 30m',
        lecturesCount: 26,
        lectures: [
          'CAP Theorem & PACELC Trade-Offs',
          'Scalability Patterns: Vertical vs Horizontal',
          'Load Balancers & Reverse Proxies (NGINX & HAProxy)',
        ],
      },
      {
        title: 'Module 2: Microservices Decoupling & API Gateways',
        duration: '7h 50m',
        lecturesCount: 42,
        lectures: [
          'Domain-Driven Design (DDD) & Service Boundaries',
          'API Gateway Pattern & Centralized Authentication',
          'Service Mesh Architecture with Envoy',
        ],
      },
      {
        title: 'Module 3: Event-Driven Systems with Apache Kafka',
        duration: '9h 10m',
        lecturesCount: 48,
        lectures: [
          'Kafka Topics, Partitions & Consumer Groups',
          'Event Sourcing & CQRS Pattern Implementation',
          'Dead Letter Queues & Retry Mechanisms',
        ],
      },
    ],
  },
  {
    id: 'course-dev-1',
    category: 'deployment',
    badge: 'Bestseller',
    badgeType: 'bestseller',
    title: 'Cloud Infrastructure & DevOps: Docker, Kubernetes & AWS',
    subtitle:
      'Containerize applications with multi-stage Docker builds, orchestrate Kubernetes clusters, and build automated GitHub Actions pipelines.',
    instructor: 'codeforeverybody',
    instructorTitle: 'DevOps & Cloud Architect',
    rating: 4.9,
    reviewsCount: 5120,
    studentsCount: 41500,
    duration: '44.0 total hours',
    lectures: 275,
    level: 'All Levels',
    price: '$19.99',
    originalPrice: '$84.99',
    discount: '76% off',
    image: '/test_assets/card_dep_k8s.jpg',
    updatedDate: 'August 2026',
    language: 'English',
    learnings: [
      'Build minimal multi-stage Docker images for Python & Node services',
      'Manage Kubernetes Ingress, Pods, Services, Secrets & ConfigMaps',
      'Construct automated CI/CD workflows using GitHub Actions',
      'Provision cloud infrastructure with Terraform Infrastructure as Code',
      'Monitor container health, metrics, and logs with Prometheus & Grafana',
    ],
    curriculum: [
      {
        title: 'Module 1: Production Multi-Stage Docker Build',
        duration: '5h 50m',
        lecturesCount: 32,
        lectures: [
          'Container Fundamentals & Kernel Namespaces',
          'Writing Multi-Stage Dockerfiles for Minimal Size',
          'Docker Compose for Multi-Container Development',
        ],
      },
      {
        title: 'Module 2: Kubernetes Cluster Orchestration',
        duration: '8h 15m',
        lecturesCount: 45,
        lectures: [
          'Kubernetes Objects: Deployments, Pods & Services',
          'Ingress Controllers & TLS Certificate Management',
          'Horizontal Pod Autoscaling (HPA) & Resource Limits',
        ],
      },
      {
        title: 'Module 3: GitHub Actions CI/CD Pipeline Automation',
        duration: '5h 30m',
        lecturesCount: 30,
        lectures: [
          'Automated Linting, Testing & Security Scanning',
          'Building & Pushing Images to AWS ECR / Docker Hub',
          'Zero-Downtime Rolling Deployment to Kubernetes',
        ],
      },
    ],
  },
  {
    id: 'course-py-2',
    category: 'python',
    badge: 'Popular',
    badgeType: 'popular',
    title: 'Full-Stack Software Engineering: React, Node & Python Microservices',
    subtitle:
      'Build modern end-to-end fullstack applications with reactive UI frontend and resilient backend microservices.',
    instructor: 'codeforeverybody',
    instructorTitle: 'FullStack Engineering Lead',
    rating: 4.8,
    reviewsCount: 1840,
    studentsCount: 14200,
    duration: '50.0 total hours',
    lectures: 320,
    level: 'All Levels',
    price: '$21.99',
    originalPrice: '$94.99',
    discount: '77% off',
    image: '/test_assets/card_code.jpg',
    updatedDate: 'July 2026',
    language: 'English',
    learnings: [
      'Build responsive single page apps with React & Vite',
      'Integrate frontend state with REST APIs and WebSockets',
      'Implement authentication flows with JWT & refresh tokens',
      'Deploy fullstack apps to cloud serverless & container platforms',
    ],
    curriculum: [
      {
        title: 'Module 1: Modern React & State Management',
        duration: '6h 10m',
        lecturesCount: 35,
        lectures: [
          'React Hooks, Context API & Custom Hooks',
          'Asynchronous Data Fetching & Optimistic UI Updates',
        ],
      },
      {
        title: 'Module 2: Microservice API Integration',
        duration: '7h 40m',
        lecturesCount: 40,
        lectures: [
          'REST API Consumption & Error Boundaries',
          'WebSocket Real-Time Subscriptions',
        ],
      },
    ],
  },
  {
    id: 'course-dev-2',
    category: 'deployment',
    badge: 'Trending',
    badgeType: 'trending',
    title: 'Production Microservices with FastAPI & Docker Containers',
    subtitle:
      'Learn how to package, deploy, and scale high performance async FastAPI applications inside cloud Docker environments.',
    instructor: 'codeforeverybody',
    instructorTitle: 'Cloud Native Developer',
    rating: 4.9,
    reviewsCount: 2150,
    studentsCount: 16800,
    duration: '32.0 total hours',
    lectures: 190,
    level: 'Intermediate',
    price: '$17.99',
    originalPrice: '$74.99',
    discount: '76% off',
    image: '/test_assets/card_fastapi.jpg',
    updatedDate: 'August 2026',
    language: 'English',
    learnings: [
      'Async FastAPI architecture for high throughput endpoints',
      'Docker Compose orchestration for multi-service apps',
      'Structured JSON logging, tracing, and health checks',
    ],
    curriculum: [
      {
        title: 'Module 1: Asynchronous Web Services',
        duration: '4h 20m',
        lecturesCount: 22,
        lectures: [
          'FastAPI Request Lifecycle & Response Validation',
          'Asynchronous Database Access with SQLAlchemy 2.0',
        ],
      },
      {
        title: 'Module 2: Containerization & Cloud Deployment',
        duration: '5h 15m',
        lecturesCount: 28,
        lectures: [
          'Optimizing Python Alpine & Slim Docker Images',
          'Deploying to AWS ECS & DigitalOcean App Platform',
        ],
      },
    ],
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Courses' },
  { id: 'python', label: 'Python & Backend' },
  { id: 'database', label: 'Database Systems' },
  { id: 'system', label: 'System Design' },
  { id: 'deployment', label: 'DevOps & Cloud' },
];

export default function ExploreCourses() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(0);
  const [enrolledCourseId, setEnrolledCourseId] = useState(null);

  // Filter courses by category and search keyword
  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = activeTab === 'all' || course.category === activeTab;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (courseId, e) => {
    if (e) e.stopPropagation();
    setEnrolledCourseId(courseId);

    // Trigger celebratory confetti effect
    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#111111', '#2563eb', '#10b981', '#f59e0b'],
    });

    setTimeout(() => {
      setEnrolledCourseId(null);
    }, 4000);
  };

  return (
    <section className="ec-section" id="explore-courses">
      <div className="ec-container">
        {/* Section Header */}
        <div className="ec-header-wrap">
          <div className="ec-pill-tag">
            <Sparkles size={13} />
            <span>Masterclass Catalog</span>
          </div>

          <h2 className="ec-section-title">Explore Courses</h2>
          <p className="ec-section-subtitle">
            Industry-proven software engineering courses designed & taught by{' '}
            <strong>codeforeverybody</strong>. Learn system architecture, database optimization, and cloud engineering.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="ec-controls-bar">
          <div className="ec-tabs">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`ec-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="ec-search-box">
            <Search size={16} className="ec-search-icon" />
            <input
              type="text"
              placeholder="Search courses by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ec-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="ec-search-clear"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="ec-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                className="ec-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="ec-card-media">
                  <img src={course.image} alt={course.title} className="ec-card-img" />
                  <div className="ec-media-overlay">
                    <span className="ec-preview-badge">
                      <PlayCircle size={14} /> Preview Course
                    </span>
                  </div>

                  <span className={`ec-badge ${course.badgeType}`}>
                    {course.badge}
                  </span>
                </div>

                <div className="ec-card-body">
                  <h3 className="ec-card-title">{course.title}</h3>

                  <div className="ec-instructor">
                    <span className="ec-inst-name">{course.instructor}</span>
                    <span className="ec-verified-check">✦</span>
                  </div>

                  <div className="ec-rating-row">
                    <span className="ec-rating-num">{course.rating}</span>
                    <div className="ec-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className="ec-star-icon filled"
                        />
                      ))}
                    </div>
                    <span className="ec-reviews-count">
                      ({course.reviewsCount.toLocaleString()})
                    </span>
                  </div>

                  <div className="ec-meta-row">
                    <span>
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span>
                      <BookOpen size={12} /> {course.lectures} lectures
                    </span>
                    <span>
                      <Award size={12} /> {course.level}
                    </span>
                  </div>

                  <div className="ec-card-footer">
                    <div className="ec-price-block">
                      <span className="ec-current-price">{course.price}</span>
                      <span className="ec-original-price">
                        {course.originalPrice}
                      </span>
                      <span className="ec-discount-pill">{course.discount}</span>
                    </div>

                    <button
                      type="button"
                      className={`ec-enroll-btn ${
                        enrolledCourseId === course.id ? 'enrolled' : ''
                      }`}
                      onClick={(e) => handleEnroll(course.id, e)}
                    >
                      {enrolledCourseId === course.id ? (
                        <>
                          <CheckCircle2 size={14} /> Enrolled!
                        </>
                      ) : (
                        'Enroll Now'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="ec-no-results">
              <BookOpen size={40} />
              <p className="ec-no-title">No courses match your search</p>
              <p className="ec-no-sub">Try searching for a different keyword or category.</p>
              <button
                type="button"
                className="ec-reset-btn"
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Udemy-Style Detailed Course Modal Overlay */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="ec-modal-overlay" onClick={() => setSelectedCourse(null)}>
            <motion.div
              className="ec-modal-content"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="ec-modal-close"
                onClick={() => setSelectedCourse(null)}
              >
                <X size={20} />
              </button>

              {/* Modal Header Banner */}
              <div className="ec-modal-header">
                <span className={`ec-badge ${selectedCourse.badgeType}`}>
                  {selectedCourse.badge}
                </span>

                <h2 className="ec-modal-title">{selectedCourse.title}</h2>
                <p className="ec-modal-subtitle">{selectedCourse.subtitle}</p>

                <div className="ec-modal-meta">
                  <div className="ec-modal-rating">
                    <span className="ec-modal-rate-num">{selectedCourse.rating}</span>
                    <div className="ec-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="ec-star-icon filled" />
                      ))}
                    </div>
                    <span>
                      ({selectedCourse.reviewsCount.toLocaleString()} ratings)
                    </span>
                  </div>

                  <span>
                    <Users size={14} /> {selectedCourse.studentsCount.toLocaleString()} students
                  </span>

                  <span>
                    <Clock size={14} /> {selectedCourse.duration}
                  </span>
                </div>

                <div className="ec-modal-author">
                  <span>Created by <strong>{selectedCourse.instructor}</strong></span>
                  <span className="ec-verified-check">✦</span>
                  <span className="ec-modal-date">Last updated {selectedCourse.updatedDate}</span>
                </div>
              </div>

              {/* Modal Body Grid */}
              <div className="ec-modal-body">
                <div className="ec-modal-left">
                  {/* What you will learn section */}
                  <div className="ec-learn-box">
                    <h3 className="ec-box-title">
                      <Zap size={18} /> What you'll learn
                    </h3>
                    <ul className="ec-learn-list">
                      {selectedCourse.learnings.map((item, idx) => (
                        <li key={idx} className="ec-learn-item">
                          <CheckCircle2 size={16} className="ec-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Course Content / Curriculum Accordion */}
                  <div className="ec-curriculum-box">
                    <div className="ec-curr-header">
                      <h3 className="ec-box-title">Course Content</h3>
                      <span className="ec-curr-summary">
                        {selectedCourse.curriculum.length} sections • {selectedCourse.lectures} lectures • {selectedCourse.duration}
                      </span>
                    </div>

                    <div className="ec-accordion">
                      {selectedCourse.curriculum.map((mod, idx) => (
                        <div key={idx} className="ec-acc-item">
                          <button
                            type="button"
                            className={`ec-acc-trigger ${
                              expandedModule === idx ? 'open' : ''
                            }`}
                            onClick={() =>
                              setExpandedModule(expandedModule === idx ? -1 : idx)
                            }
                          >
                            <div className="ec-acc-left">
                              {expandedModule === idx ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                              <span>{mod.title}</span>
                            </div>
                            <span className="ec-acc-meta">
                              {mod.lecturesCount} lectures • {mod.duration}
                            </span>
                          </button>

                          {expandedModule === idx && (
                            <div className="ec-acc-content">
                              {mod.lectures.map((lec, lIdx) => (
                                <div key={lIdx} className="ec-lec-row">
                                  <PlayCircle size={14} className="ec-lec-icon" />
                                  <span className="ec-lec-name">{lec}</span>
                                  <span className="ec-lec-preview">Preview</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Right Side Card Box */}
                <div className="ec-modal-right">
                  <div className="ec-sticky-card">
                    <img
                      src={selectedCourse.image}
                      alt={selectedCourse.title}
                      className="ec-sticky-img"
                    />

                    <div className="ec-sticky-price">
                      <span className="ec-big-price">{selectedCourse.price}</span>
                      <span className="ec-old-price">{selectedCourse.originalPrice}</span>
                      <span className="ec-disc-badge">{selectedCourse.discount}</span>
                    </div>

                    <button
                      type="button"
                      className={`ec-sticky-enroll-btn ${
                        enrolledCourseId === selectedCourse.id ? 'enrolled' : ''
                      }`}
                      onClick={(e) => handleEnroll(selectedCourse.id, e)}
                    >
                      {enrolledCourseId === selectedCourse.id ? (
                        <>
                          <CheckCircle2 size={16} /> Enrolled Successfully!
                        </>
                      ) : (
                        <>
                          Enroll Now <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <ul className="ec-guarantee-list">
                      <li>
                        <ShieldCheck size={14} /> 30-Day Money-Back Guarantee
                      </li>
                      <li>
                        <BookOpen size={14} /> Full Lifetime Access
                      </li>
                      <li>
                        <Award size={14} /> Certificate of Completion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
