import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import { ArrowLeft, ArrowUpRight, Globe, X, Send, CheckCircle2, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import * as THREE from 'three';
import './Portfolio3D.css';

// Project Database matching video frames & specs
const PROJECTS = [
  {
    id: 'awwwards',
    title: 'Awwwards Academy',
    subtitle: 'Creative Coding & WebGL Mastery',
    tags: ['CREATIVE CODING', 'THREEJS', 'WEBGL', 'GLSL'],
    description: 'Interactive portfolio showcase featuring dynamic 3D card deck transforms, magnetic parallax cursor tracking, and custom shader effects.',
    link: 'https://awwwards.com',
    cards: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'formlabs',
    title: 'Formlabs',
    subtitle: 'Industrial 3D Ecosystem & Architecture',
    tags: ['FULLSTACK', 'ECOMMERCE', 'MICROSERVICES', 'SOFTWARE ENGINEERING'],
    description:
      'As Senior Software Engineer at Formlabs (Budapest), I actively contributed to the development of Formlabs.com, a substantial website project, alongside confidential NDA projects.',
    link: 'https://formlabs.com',
    cards: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'growing-structure',
    title: 'Growing Structure',
    subtitle: 'KD-Tree Algorithmic Geometry Research',
    tags: ['WEBGL', 'GEOMETRY', 'THREEJS', 'ALGORITHMS'],
    description:
      'Based on 3D graphics research conducted at Dentsply Sirona focusing on mesh topology, using KD-trees in creative coding to generate procedural organic structures.',
    link: '#',
    cards: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'pen-plotter',
    title: '2DOF Pen Plotter',
    subtitle: 'Generative Robotics & C++ Firmware',
    tags: ['C++', 'OPENCV', 'PCB', '3D PRINTING', 'MATH'],
    description:
      'Designing a custom 2D pen plotter robot capable of rendering generative math artwork with custom C++ firmware and PCB electronics.',
    link: '#',
    cards: [
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&auto=format&fit=crop',
    ],
  },
];

// SVG Social Icons
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

// High-Performance Animated Organic Mesh for About Section
function OrganicTreeMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = time * 0.4 + state.pointer.x * 0.5;
    meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} rotation={[0.4, 0.2, 0]}>
        <torusKnotGeometry args={[1.25, 0.38, 128, 32]} />
        <meshStandardMaterial
          color="#00aa70"
          wireframe
          roughness={0.15}
          metalness={0.85}
          emissive="#00442c"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// High-Performance Dynamic Wave Cylinder for More Projects Section
function TopoWaveCylinder() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.5 + state.pointer.x * 0.4;
    meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.15;
    
    // Wave deformation
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const angle = Math.atan2(z, x);
      const radius = 1.5 + Math.sin(y * 3 + time * 2 + angle * 2) * 0.18;
      pos.setXYZ(i, Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[0.2, 0.5, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 4.2, 64, 64, true]} />
      <meshStandardMaterial
        color="#00e5a3"
        wireframe
        roughness={0.1}
        metalness={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Portfolio3D() {
  const [activeTab, setActiveTab] = useState('highlights');
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredPanelIdx, setHoveredPanelIdx] = useState(null);
  const [lang, setLang] = useState('EN');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Parallax Cursor Coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 24 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const bgTextX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-35, 35]), springConfig);
  const bgTextY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  const activeProject = PROJECTS[hoveredIdx] || PROJECTS[0];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setIsContactOpen(false);
    }, 2200);
  };

  return (
    <div className="portfolio-app">
      {/* Background Grid Lines Overlay */}
      <div className="grid-background" />

      {/* Header Navigation */}
      <header className="header">
        <div className="brand" onClick={() => { setActiveTab('highlights'); setSelectedProject(null); }}>
          <span className="name">Marius Ballet</span>
          <span className="subtitle">– FullStack Tinkerer</span>
        </div>

        <nav className="nav">
          <button
            className={activeTab === 'highlights' ? 'active' : ''}
            onClick={() => { setActiveTab('highlights'); setSelectedProject(null); }}
          >
            Highlights
          </button>
          <button
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={activeTab === 'more' ? 'active' : ''}
            onClick={() => setActiveTab('more')}
          >
            More Projects
          </button>
        </nav>

        <div className="actions">
          <span className="lang" onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}>
            <Globe size={13} style={{ marginRight: 4 }} />
            {lang === 'EN' ? 'EN - FR' : 'FR - EN'}
          </span>
          <button className="cta-btn" onClick={() => setIsContactOpen(true)}>
            Get in Touch
          </button>
        </div>
      </header>

      {/* Main Stage */}
      <main className="main-stage">
        <AnimatePresence mode="wait">
          {activeTab === 'highlights' && (
            <motion.section 
              key="highlights"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="highlights-stage"
            >
              {!selectedProject ? (
                /* Central 3D Cylindrical Arc Carousel Stage */
                <div 
                  className="arc-carousel-wrapper"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                >
                  {/* Giant Parallax Backdrop Text behind cards (00:04) */}
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(10px)' }}
                      animate={{ opacity: 0.85, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -40, scale: 0.92, filter: 'blur(10px)' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ x: bgTextX, y: bgTextY }}
                      className="giant-backdrop-title"
                    >
                      {activeProject.title}
                    </motion.h1>
                  </AnimatePresence>

                  {/* 3D Arc Card Deck with Dynamic Mouse Parallax */}
                  <motion.div 
                    className="arc-deck-3d"
                    style={{ rotateX: tiltX, rotateY: tiltY }}
                  >
                    {PROJECTS[0].cards.map((imgSrc, idx) => {
                      // Calculated 3D Cylindrical Arc Math Formula
                      const total = PROJECTS[0].cards.length;
                      const mid = (total - 1) / 2;
                      const diff = idx - mid;
                      
                      const isHovered = hoveredIdx === idx;
                      
                      const rotateY = isHovered ? 0 : diff * -14;
                      const rotateZ = isHovered ? 0 : diff * 3;
                      const translateZ = isHovered ? 140 : -Math.abs(diff) * 50;
                      const translateY = isHovered ? -24 : Math.pow(diff, 2) * 7;

                      return (
                        <motion.div
                          key={idx}
                          className={`arc-card ${isHovered ? 'hovered' : ''}`}
                          animate={{
                            rotateY,
                            rotateZ,
                            translateZ,
                            translateY,
                            scale: isHovered ? 1.15 : 1,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 24,
                            mass: 0.8,
                          }}
                          onMouseEnter={() => setHoveredIdx(idx % PROJECTS.length)}
                          onClick={() => setSelectedProject(PROJECTS[idx % PROJECTS.length])}
                        >
                          <img src={imgSrc} alt="project slide" />
                          <div className="arc-card-glare" />
                          <div className="arc-card-tag">
                            <span>{PROJECTS[idx % PROJECTS.length].title}</span>
                            <ArrowUpRight size={12} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <motion.div 
                    className="deck-caption"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={activeProject.id}
                  >
                    <Sparkles size={14} className="caption-sparkle" />
                    <span>{activeProject.title}</span>
                    <span className="caption-dot">•</span>
                    <span className="caption-sub">{activeProject.subtitle}</span>
                  </motion.div>
                </div>
              ) : (
                /* Expanded 3D Origami Accordion Fold Stage (00:09 - 00:16) */
                <motion.div
                  className="project-detail-layout"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Left Metadata Side */}
                  <div className="detail-meta">
                    <button className="back-link" onClick={() => setSelectedProject(null)}>
                      <ArrowLeft size={16} /> Back to Deck
                    </button>
                    <h1 className="project-heading">{selectedProject.title}</h1>
                    <p className="project-sub-heading">{selectedProject.subtitle}</p>
                    <div className="tag-row">
                      {selectedProject.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <p className="description">{selectedProject.description}</p>
                    <a 
                      href={selectedProject.link || '#'} 
                      className="see-project-btn" 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      See Project <ArrowUpRight size={16} />
                    </a>
                  </div>

                  {/* Right Interactive 3D Origami Accordion Fold Stage */}
                  <div className="accordion-stage-3d">
                    <div className="accordion-wrapper">
                      {selectedProject.cards.map((cardImg, i) => {
                        // 3D Accordion Concertina Fold Formula
                        const baseFoldAngles = [42, -22, 32, -26];
                        const basePositionsX = [-130, -35, 75, 175];
                        const basePositionsZ = [45, 120, 35, -55];

                        const isPanelHovered = hoveredPanelIdx === i;

                        // Dynamic accordion fan reaction on hover
                        let rotateY = baseFoldAngles[i % baseFoldAngles.length];
                        let x = basePositionsX[i % basePositionsX.length];
                        let z = basePositionsZ[i % basePositionsZ.length];
                        let scale = 1;

                        if (hoveredPanelIdx !== null) {
                          if (isPanelHovered) {
                            rotateY = 0;
                            z = 180;
                            scale = 1.15;
                          } else if (i < hoveredPanelIdx) {
                            x -= 40;
                            rotateY = baseFoldAngles[i % baseFoldAngles.length] + 15;
                          } else {
                            x += 40;
                            rotateY = baseFoldAngles[i % baseFoldAngles.length] - 15;
                          }
                        }

                        return (
                          <motion.div
                            key={i}
                            className={`accordion-panel ${isPanelHovered ? 'panel-active' : ''}`}
                            initial={{ opacity: 0, rotateY: 90, z: -250, x: 0 }}
                            animate={{
                              opacity: 1,
                              rotateY,
                              x,
                              z,
                              scale,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 240,
                              damping: 22,
                              delay: i * 0.06,
                            }}
                            onMouseEnter={() => setHoveredPanelIdx(i)}
                            onMouseLeave={() => setHoveredPanelIdx(null)}
                          >
                            {/* Mint Green 3D Backing Panel (00:10) */}
                            <div className="panel-back-layer" />
                            <img src={cardImg} alt={`preview slide ${i + 1}`} className="panel-img" />
                            <div className="panel-glare-effect" />
                            <div className="panel-num-tag">0{i + 1}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* About Tab with Interactive R3F WebGL Canvas */}
          {activeTab === 'about' && (
            <motion.section 
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="about-stage"
            >
              <div className="canvas-bg-container">
                <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[10, 10, 5]} intensity={1.8} />
                  <pointLight position={[-10, -10, -5]} color="#00e5a3" intensity={0.8} />
                  <OrganicTreeMesh />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.8} />
                </Canvas>
              </div>

              <div className="about-text-container">
                <div className="about-badge">
                  <Cpu size={14} color="#00aa70" /> 3D Graphics & Software Engineering
                </div>
                <h2>Full-Stack Thinker. Maker at Heart.</h2>
                <p>
                  I'm a software engineer and creative technologist who thrives on building. From
                  scalable web apps to 3D-printed prototypes and autonomous robots. Whether it's clean
                  code, creative problem-solving, or hands-on experimentation, I love turning ideas
                  into real-world solutions.
                </p>
                <p>
                  I obtained a bachelor's degree in interactive software development in <strong>Gobelins Paris</strong>
                  and continued my studies to become a software engineer with a major in drones and
                  robotics systems at <strong>EFREI Paris</strong>.
                </p>

                <div className="tech-chips">
                  <span>WebGL & GLSL</span>
                  <span>Three.js</span>
                  <span>React / Next.js</span>
                  <span>KD-Trees & Geometry</span>
                  <span>C++ & OpenCV</span>
                  <span>Robotics & Firmware</span>
                </div>
              </div>
            </motion.section>
          )}

          {/* More Projects Tab with Topo Wave Mesh */}
          {activeTab === 'more' && (
            <motion.section 
              key="more"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="more-stage"
            >
              <div className="more-content-grid">
                <div className="column">
                  <h3>Projects & Explorations</h3>
                  <ul className="project-links">
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
                      <span>Micro-Drone Flight Firmware</span>
                      <ArrowUpRight size={14} />
                    </li>
                  </ul>
                </div>

                <div className="column">
                  <h3>Features & Media</h3>
                  <p className="feature-item">
                    <strong>YouTube Software Engineering Insights</strong>
                    <span>Deep dive architecture walk-throughs & creative coding</span>
                  </p>
                  <p className="feature-item">
                    <strong>Prismic Interview</strong>
                    <span>The Art of Web Development & 3D Interactive Design</span>
                  </p>

                  <h3 className="section-divider">Experience</h3>
                  <p className="exp-item">
                    <strong>Software Engineer</strong>
                    <span>Dentsply Sirona – Zurich</span>
                  </p>
                  <p className="exp-item">
                    <strong>Senior Software Engineer</strong>
                    <span>Formlabs – Budapest</span>
                  </p>
                </div>

                {/* 3D Topographical Wave Mesh Column */}
                <div className="column canvas-col">
                  <div className="canvas-header">
                    <Compass size={14} color="#00aa70" /> Topographical Surface Shader
                  </div>
                  <Canvas camera={{ position: [0, 0, 4.8], fov: 50 }}>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[5, 8, 5]} intensity={1.5} />
                    <TopoWaveCylinder />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
                  </Canvas>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="social-group">
          <a href="https://github.com" target="_blank" rel="noreferrer"><GithubIcon size={14} /> GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><LinkedinIcon size={14} /> LinkedIn</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer"><YoutubeIcon size={14} /> YouTube</a>
        </div>
        <div className="credit">Coded in Marssau, Franche-Comté, France</div>
      </footer>

      {/* Contact Drawer Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="modal-backdrop" onClick={() => setIsContactOpen(false)}>
            <motion.div 
              className="modal-drawer"
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 120 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <div>
                  <h3>Get in Touch</h3>
                  <p>Let's collaborate on software engineering, 3D web, or robotics.</p>
                </div>
                <button className="btn-close" onClick={() => setIsContactOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {contactSubmitted ? (
                <div className="drawer-success">
                  <CheckCircle2 size={48} color="#00aa70" />
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for reaching out. Marius will reply shortly.</p>
                </div>
              ) : (
                <form className="drawer-form" onSubmit={handleContactSubmit}>
                  <div className="field">
                    <label>Your Name</label>
                    <input type="text" placeholder="e.g. Alex Mercer" required />
                  </div>
                  <div className="field">
                    <label>Email Address</label>
                    <input type="email" placeholder="alex@example.com" required />
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea rows={4} placeholder="Your inquiry or project idea..." required />
                  </div>
                  <button type="submit" className="btn-send">
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
