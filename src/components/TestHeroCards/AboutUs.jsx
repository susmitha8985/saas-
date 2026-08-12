import React from 'react';
import {
  Sparkles,
  Cpu,
  Award,
  CheckCircle2,
  ArrowRight,
  Code,
  Terminal,
} from 'lucide-react';
import './AboutUs.css';

export default function AboutUs() {
  const scrollToCourses = () => {
    const el = document.getElementById('explore-courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="au-section" id="about-us">
      <div className="au-container">
        {/* Header */}
        <div className="au-header-wrap">
          <div className="au-pill-tag">
            <Sparkles size={13} />
            <span>Our Story & Mission</span>
          </div>

          <h2 className="au-section-title">About codeforeverybody</h2>
          <p className="au-section-subtitle">
            Empowering software engineers worldwide with production-grade architectures, real-world systems engineering, and hands-on mastery.
          </p>
        </div>

        {/* Content Grid */}
        <div className="au-grid">
          {/* Left Column: Story & Core Pillars */}
          <div className="au-left-col">
            <div className="au-story-card">
              <h3 className="au-card-title">
                Bridging the Gap Between Syntax & Production
              </h3>
              <p className="au-story-text">
                We founded <strong>codeforeverybody</strong> with a single mission: to eliminate the frustrating gap between basic coding tutorials and real-world software engineering.
              </p>
              <p className="au-story-text">
                Traditional courses teach syntax, but production systems demand understanding PostgreSQL query execution plans, distributed Redis locks, microservice fault tolerance, and automated Kubernetes CI/CD pipelines. We build courses that prepare you for high-scale engineering challenges.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="au-pillars-grid">
              <div className="au-pillar-item">
                <div className="au-pillar-icon-wrap">
                  <Terminal size={20} />
                </div>
                <h4 className="au-pillar-title">Production-Grade Code</h4>
                <p className="au-pillar-desc">
                  No toy projects. Every course uses production design patterns, strict typing, clean architecture, and automated Pytest coverage.
                </p>
              </div>

              <div className="au-pillar-item">
                <div className="au-pillar-icon-wrap">
                  <Cpu size={20} />
                </div>
                <h4 className="au-pillar-title">High-Scale Architecture</h4>
                <p className="au-pillar-desc">
                  Deep dive into PostgreSQL indexing, Kafka event streams, Redis caching topologies, and multi-stage Docker containerization.
                </p>
              </div>

              <div className="au-pillar-item">
                <div className="au-pillar-icon-wrap">
                  <Award size={20} />
                </div>
                <h4 className="au-pillar-title">Career Acceleration</h4>
                <p className="au-pillar-desc">
                  Over 120,000+ developers have leveraged our masterclasses to land senior engineering and tech lead roles at top global tech companies.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Instructor & Platform Spotlight */}
          <div className="au-right-col">
            <div className="au-spotlight-card">
              <div className="au-avatar-block">
                <div className="au-avatar">
                  <Code size={28} />
                </div>
                <div className="au-inst-meta">
                  <div className="au-inst-name-row">
                    <h4 className="au-inst-name">codeforeverybody</h4>
                    <span className="au-verified-check">✦</span>
                  </div>
                  <span className="au-inst-role">Principal Software Architect & Instructor</span>
                </div>
              </div>

              <p className="au-spotlight-bio">
                Over a decade of experience designing fault-tolerant backends, scalable relational datastores, and cloud infrastructure handling millions of daily active requests.
              </p>

              <div className="au-stats-grid">
                <div className="au-stat-box">
                  <span className="au-stat-value">120,000+</span>
                  <span className="au-stat-label">Students Taught</span>
                </div>

                <div className="au-stat-box">
                  <span className="au-stat-value">4.9 ★</span>
                  <span className="au-stat-label">Instructor Rating</span>
                </div>

                <div className="au-stat-box">
                  <span className="au-stat-value">15+</span>
                  <span className="au-stat-label">Masterclasses</span>
                </div>

                <div className="au-stat-box">
                  <span className="au-stat-value">98%</span>
                  <span className="au-stat-label">Career Impact</span>
                </div>
              </div>

              <ul className="au-check-list">
                <li>
                  <CheckCircle2 size={16} className="au-check-icon" />
                  Full GitHub Repository Access & Solutions
                </li>
                <li>
                  <CheckCircle2 size={16} className="au-check-icon" />
                  Verifiable Certificate of Completion
                </li>
                <li>
                  <CheckCircle2 size={16} className="au-check-icon" />
                  30-Day Money-Back Satisfaction Guarantee
                </li>
              </ul>

              <button
                type="button"
                className="au-cta-btn"
                onClick={scrollToCourses}
              >
                Explore Masterclasses <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
