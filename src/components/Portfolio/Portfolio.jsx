import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  X,
  Send,
  CheckCircle2,
  Globe,
  Sparkles,
  Layers,
  Cpu,
  Boxes
} from 'lucide-react';
import CarouselDeck from './CarouselDeck';
import { KDTreeMeshCanvas, TopographicalWaveCanvas } from './WebGLBackground';
import { PROJECTS_WITH_IMAGES, HERO_CAROUSEL_IMAGES } from './assets';
import './Portfolio.css';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('highlights');
  const [hoveredProject, setHoveredProject] = useState(PROJECTS_WITH_IMAGES[0]);
  const [hoveredDeckCard, setHoveredDeckCard] = useState(HERO_CAROUSEL_IMAGES[0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lang, setLang] = useState('EN');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Translate tab content strings based on lang
  const t = {
    highlights: lang === 'EN' ? 'Highlights' : 'Standard',
    about: lang === 'EN' ? 'About' : 'À propos',
    more: lang === 'EN' ? 'More Projects' : 'Plus de projets',
    touch: lang === 'EN' ? 'Get in Touch' : 'Contactez-moi',
    back: lang === 'EN' ? 'Back' : 'Retour',
    seeProject: lang === 'EN' ? 'See Project' : 'Voir le projet',
  };

  const handleDeckCardSelect = (deckCard) => {
    // Find matching project or default to first project
    const match = PROJECTS_WITH_IMAGES.find((p) => p.id === deckCard.id) || PROJECTS_WITH_IMAGES[0];
    setSelectedProject(match);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setIsContactOpen(false);
    }, 2500);
  };

  return (
    <div className="portfolio-container">
      {/* Background Grid Overlay */}
      <div className="grid-overlay" />

      {/* Navigation Header */}
      <header className="navbar">
        <div className="brand" onClick={() => { setActiveTab('highlights'); setSelectedProject(null); }}>
          <span className="brand-name">Marius Ballet</span>
          <span className="brand-title">– FullStack Tinkerer</span>
        </div>

        <nav className="nav-links">
          <button
            className={activeTab === 'highlights' ? 'active' : ''}
            onClick={() => { setActiveTab('highlights'); setSelectedProject(null); }}
          >
            {t.highlights}
          </button>
          <button
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            {t.about}
          </button>
          <button
            className={activeTab === 'more' ? 'active' : ''}
            onClick={() => setActiveTab('more')}
          >
            {t.more}
          </button>
        </nav>

        <div className="nav-actions">
          <button 
            className="lang-switch" 
            onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
            title="Switch Language"
          >
            <Globe size={14} style={{ marginRight: 4 }} />
            {lang === 'EN' ? 'EN - FR' : 'FR - EN'}
          </button>
          <button className="btn-touch" onClick={() => setIsContactOpen(true)}>
            {t.touch}
          </button>
        </div>
      </header>

      {/* Main Dynamic View */}
      <main className="content-area">
        <AnimatePresence mode="wait">
          {activeTab === 'highlights' && (
            <motion.section 
              key="highlights"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="highlights-section"
            >
              {!selectedProject ? (
                /* Carousel & Title Reveal Overlay */
                <div className="carousel-wrapper">
                  <motion.h1
                    key={hoveredDeckCard?.id || hoveredProject?.id}
                    initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.45 }}
                    className="bg-backdrop-title"
                  >
                    {hoveredDeckCard?.title || hoveredProject?.title}
                  </motion.h1>

                  {/* 3D Perspective Card Carousel Deck */}
                  <CarouselDeck
                    hoveredCard={hoveredDeckCard}
                    setHoveredCard={(card) => {
                      setHoveredDeckCard(card);
                      const projMatch = PROJECTS_WITH_IMAGES.find((p) => p.id === card.id);
                      if (projMatch) setHoveredProject(projMatch);
                    }}
                    onSelectCard={handleDeckCardSelect}
                  />

                  <div className="active-caption">
                    <Sparkles size={14} style={{ display: 'inline', marginRight: 6, color: '#00aa70' }} />
                    {hoveredDeckCard?.subtitle || hoveredDeckCard?.title}
                  </div>
                </div>
              ) : (
                /* Detail Project Expand View */
                <motion.div
                  className="project-detail-view"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="detail-info">
                    <button className="btn-back" onClick={() => setSelectedProject(null)}>
                      <ArrowLeft size={16} /> {t.back}
                    </button>
                    <h2>{selectedProject.title}</h2>
                    {selectedProject.subtitle && (
                      <p className="detail-subtitle">{selectedProject.subtitle}</p>
                    )}
                    <div className="tag-cloud">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                    <p className="detail-desc">{selectedProject.description}</p>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-link"
                    >
                      {t.seeProject} <ArrowUpRight size={16} />
                    </a>
                  </div>

                  {/* 3D Fold / Layered Screen Mockups */}
                  <div className="detail-3d-stage">
                    <div className="layered-cards-stack">
                      {selectedProject.previewImages.map((img, i) => (
                        <div key={i} className={`layer-card layer-${i}`}>
                          <img src={img} alt={`${selectedProject.title} preview ${i + 1}`} />
                          <div className="layer-badge">Layer 0{i + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* About Section with Interactive 3D Canvas */}
          {activeTab === 'about' && (
            <motion.section 
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="about-section"
            >
              <div className="webgl-bg-placeholder">
                <KDTreeMeshCanvas className="tree-mesh-simulation" />
              </div>
              
              <div className="about-content">
                <div className="about-header-pill">
                  <Cpu size={14} /> Creative Technology & WebGL
                </div>
                <h1>Full-Stack Thinker. Maker at Heart.</h1>
                <p>
                  I'm a software engineer and creative technologist who thrives on building. From scalable web applications to 3D-printed prototypes and autonomous robots. Whether it's clean code, creative problem-solving, or hands-on experimentation, I love turning ideas into real-world solutions.
                </p>
                <p>
                  I obtained a bachelor's degree in interactive software development at <strong>Gobelins Paris</strong> and continued my studies to become a software engineer with a major in drones and robotics systems at <strong>EFREI Paris</strong>.
                </p>

                <div className="skills-grid">
                  <div className="skill-card">
                    <Boxes size={20} className="skill-icon" />
                    <h4>Graphics & Shaders</h4>
                    <p>WebGL, Three.js, GLSL Shaders, KD-Trees, Mesh Topology</p>
                  </div>
                  <div className="skill-card">
                    <Layers size={20} className="skill-icon" />
                    <h4>Full-Stack Architecture</h4>
                    <p>React, Next.js, Node.js, Microservices, TypeScript</p>
                  </div>
                  <div className="skill-card">
                    <Cpu size={20} className="skill-icon" />
                    <h4>Robotics & Hardware</h4>
                    <p>C++, OpenCV, Embedded Systems, PCB Design, 3D Printing</p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* More Projects & Experience Section */}
          {activeTab === 'more' && (
            <motion.section 
              key="more"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="more-section"
            >
              <div className="more-grid">
                <div className="col">
                  <h3>Projects & Explorations</h3>
                  <ul className="project-list">
                    <li>
                      <span>PenPlotter Devlog</span>
                      <ArrowUpRight size={14} />
                    </li>
                    <li>
                      <span>GLSL Wave Shader</span>
                      <ArrowUpRight size={14} />
                    </li>
                    <li>
                      <span>3D Printed Magnet Organizer</span>
                      <ArrowUpRight size={14} />
                    </li>
                    <li>
                      <span>3D Printed Spice Tree</span>
                      <ArrowUpRight size={14} />
                    </li>
                    <li>
                      <span>Autonomous Micro-Drone Firmware</span>
                      <ArrowUpRight size={14} />
                    </li>
                  </ul>
                </div>

                <div className="col">
                  <h3>Features & Media</h3>
                  <div className="media-item">
                    <strong>YouTube Software Engineering Insights</strong>
                    <p>Detailed architectural breakdowns & creative coding walkthroughs</p>
                  </div>
                  <div className="media-item">
                    <strong>Prismic Interview</strong>
                    <p>The Art of Modern Web Development & Interactive 3D Canvas Design</p>
                  </div>

                  <h3 className="mt-8">Experience</h3>
                  <div className="exp-item">
                    <p className="exp-role">Software Engineer</p>
                    <p className="exp-company">Dentsply Sirona – Zurich</p>
                  </div>
                  <div className="exp-item">
                    <p className="exp-role">Senior Software Engineer</p>
                    <p className="exp-company">Formlabs – Budapest</p>
                  </div>
                </div>

                <div className="col webgl-wave-col">
                  <div className="wave-wrapper">
                    <h3>3D Surface Topology</h3>
                    <div className="topographical-wave-3d">
                      <TopographicalWaveCanvas />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="socials">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <GithubIcon size={14} /> GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <LinkedinIcon size={14} /> LinkedIn
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <YoutubeIcon size={14} /> YouTube
          </a>
        </div>
        <div className="location">Coded in Marssau, Franche-Comté, France</div>
      </footer>

      {/* Get in Touch Drawer / Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="modal-backdrop" onClick={() => setIsContactOpen(false)}>
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3>Get in Touch</h3>
                  <p>Let's collaborate on engineering, 3D web, or robotics projects.</p>
                </div>
                <button className="btn-close" onClick={() => setIsContactOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {contactSubmitted ? (
                <div className="contact-success">
                  <CheckCircle2 size={48} color="#00aa70" />
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for reaching out. Marius will get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" placeholder="e.g. Alex Mercer" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="alex@example.com" required />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows={4} placeholder="Describe your project or inquiry..." required />
                  </div>
                  <button type="submit" className="btn-submit">
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
