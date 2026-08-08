import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Code, 
  Terminal, 
  Cpu, 
  Layers, 
  CheckCircle, 
  PlayCircle
} from 'lucide-react';
import './SoftwareCourses3D.css';

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

const TwitterIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Course Catalogue Data mapped to high-res tech imagery
const COURSES = [
  {
    id: 'web-dev-mastery',
    title: 'Full-Stack Web Mastery',
    subtitle: 'Full-Stack Web Mastery',
    category: 'WEB DEVELOPMENT',
    price: '$149',
    duration: '12 Weeks',
    tags: ['REACT', 'NODE.JS', 'NEXT.JS', 'MICROSERVICES'],
    description:
      'Master modern full-stack engineering from database design to scalable React architectures. Build 6 production-ready applications with microservice setups and automated CI/CD pipelines.',
    cards: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop',
    ],
    curriculum: ['Node.js Event Loop & Performance', 'Scalable Microservices with Docker', 'Advanced React Patterns & State', 'GraphQL & REST API Design']
  },
  {
    id: 'creative-webgl',
    title: 'WebGL & 3D Shaders',
    subtitle: 'WebGL & 3D Shaders',
    category: 'CREATIVE CODING',
    price: '$199',
    duration: '8 Weeks',
    tags: ['THREE.JS', 'GLSL', 'WEBGL', 'MATH'],
    description:
      'Unlock the world of interactive 3D web graphics. Learn GLSL fragment/vertex shaders, raymarching, post-processing pipelines, and high-performance Three.js canvas rendering.',
    cards: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
    ],
    curriculum: ['GLSL Vectors & Matrix Math', 'Custom Mesh Shaders & Noise', 'Lighting Models & PBR Rendering', 'Framer Motion 3D Mechanics']
  },
  {
    id: 'ai-engineering',
    title: 'AI & Neural Systems',
    subtitle: 'AI & Neural Systems',
    category: 'ARTIFICIAL INTELLIGENCE',
    price: '$249',
    duration: '10 Weeks',
    tags: ['PYTHON', 'PYTORCH', 'LLMS', 'NEURAL NETS'],
    description:
      'Build custom Deep Learning models, fine-tune Large Language Models (LLMs), and deploy high-throughput AI inference pipelines using PyTorch and modern GPU clusters.',
    cards: [
      'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    ],
    curriculum: ['Transformer Architecture from Scratch', 'LoRA & PEFT Fine-Tuning', 'RAG Engine & Vector Databases', 'Model Deployment with TensorRT']
  },
  {
    id: 'devops-cloud',
    title: 'DevOps & Cloud Systems',
    subtitle: 'DevOps & Cloud Systems',
    category: 'INFRASTRUCTURE',
    price: '$179',
    duration: '8 Weeks',
    tags: ['DOCKER', 'KUBERNETES', 'AWS', 'TERRAFORM'],
    description:
      'Design fault-tolerant cloud infrastructure. Master Kubernetes orchestration, Infrastructure as Code (IaC) with Terraform, and zero-downtime CI/CD deployment pipelines.',
    cards: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
    ],
    curriculum: ['Kubernetes Cluster Management', 'Terraform Multi-Cloud Deployments', 'Prometheus & Grafana Observability', 'Zero-Trust Cloud Security']
  },
  {
    id: 'robotics-cpp',
    title: 'Robotics & C++ Hardware',
    subtitle: 'Robotics & C++ Hardware',
    category: 'EMBEDDED SYSTEMS',
    price: '$219',
    duration: '10 Weeks',
    tags: ['C++', 'OPENCV', 'ROS2', 'HARDWARE'],
    description:
      'Program autonomous hardware, PCB controllers, and robotics systems. Learn low-level memory management, real-time computer vision with OpenCV, and ROS2 communication.',
    cards: [
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop',
    ],
    curriculum: ['Modern C++20 Memory Management', 'ROS2 Autonomous Navigation', 'OpenCV Real-Time Object Tracking', 'Custom PCB Firmware Development']
  }
];

// Interactive 3D Mesh for Platform Showcase Canvas
function InteractiveCodeNode() {
  return (
    <mesh rotation={[0.3, 0.4, 0]}>
      <icosahedronGeometry args={[1.4, 2]} />
      <meshStandardMaterial color="#00aa70" wireframe roughness={0.1} metalness={0.9} />
    </mesh>
  );
}

// Interactive 3D Wave Surface Canvas
function CloudGridWave() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <torusGeometry args={[1.6, 0.4, 32, 100]} />
      <meshStandardMaterial color="#00e5a3" wireframe roughness={0.2} />
    </mesh>
  );
}

export default function SoftwareCourses3D() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const activeCourse = COURSES[hoveredIdx] || COURSES[0];

  return (
    <div className="platform-app">
      {/* Structural Background Lines */}
      <div className="grid-bg" />

      {/* Header Bar */}
      <header className="navbar">
        <div className="brand" onClick={() => { setActiveTab('courses'); setSelectedCourse(null); }}>
          <Terminal size={22} className="brand-icon" />
          <span className="brand-name">codeForEveryBody</span>
          <span className="brand-tag">– Software Engineering Platform</span>
        </div>

        <nav className="nav-menu">
          <button
            className={activeTab === 'courses' ? 'active' : ''}
            onClick={() => { setActiveTab('courses'); setSelectedCourse(null); }}
          >
            Courses Deck
          </button>
          <button
            className={activeTab === 'method' ? 'active' : ''}
            onClick={() => setActiveTab('method')}
          >
            Learning System
          </button>
          <button
            className={activeTab === 'curriculum' ? 'active' : ''}
            onClick={() => setActiveTab('curriculum')}
          >
            All Tracks
          </button>
        </nav>

        <div className="nav-actions">
          <span className="region-indicator">GLOBAL / EN</span>
          <button className="enroll-btn" onClick={() => navigate('/auth')}>
            Explore Catalog
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="main-viewport">
        {activeTab === 'courses' && (
          <section className="courses-hero">
            {!selectedCourse ? (
              /* Central 3D Arc Deck Layout */
              <div className="arc-deck-container">
                {/* Backdrop Title Layer Behind Cards */}
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={activeCourse.id}
                    initial={{ opacity: 0, y: 35, scale: 0.94 }}
                    animate={{ opacity: 0.85, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -35, scale: 0.94 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="backdrop-course-title"
                  >
                    {activeCourse.title}
                  </motion.h1>
                </AnimatePresence>

                {/* Cylindrical 3D Arc Card Fan */}
                <div className="arc-cards-deck">
                  {COURSES.map((course, idx) => {
                    const total = COURSES.length;
                    const mid = (total - 1) / 2;
                    const diff = idx - mid;
                    
                    const isHovered = hoveredIdx === idx;
                    
                    const rotateY = isHovered ? 0 : diff * -14;
                    const rotateZ = isHovered ? 0 : diff * 3;
                    const translateZ = isHovered ? 140 : -Math.abs(diff) * 50;
                    const translateY = isHovered ? -25 : Math.pow(diff, 2) * 7;

                    return (
                      <motion.div
                        key={course.id}
                        className={`arc-card-item ${isHovered ? 'active-card' : ''}`}
                        animate={{
                          rotateY,
                          rotateZ,
                          translateZ,
                          translateY,
                          scale: isHovered ? 1.14 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="card-badge">{course.category}</div>
                        <img src={course.cards[0]} alt={course.title} />
                        <div className="card-footer-info">
                          <span>{course.price}</span>
                          <span>{course.duration}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="deck-course-caption">
                  <span>Hover to explore</span> • <strong>{activeCourse.title}</strong> ({activeCourse.category})
                </div>
              </div>
            ) : (
              /* Expanded Accordion 3D Stage */
              <motion.div
                className="course-detail-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Left Description Column */}
                <div className="course-meta-column">
                  <button className="back-btn" onClick={() => setSelectedCourse(null)}>
                    <ArrowLeft size={16} /> Back to Courses
                  </button>

                  <div className="category-pill">{selectedCourse.category}</div>
                  <h1 className="course-main-title">{selectedCourse.title}</h1>
                  
                  <div className="price-tag-row">
                    <span className="price-val">{selectedCourse.price}</span>
                    <span className="duration-val">{selectedCourse.duration} Intensive</span>
                  </div>

                  <div className="tags-cloud">
                    {selectedCourse.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>

                  <p className="course-description">{selectedCourse.description}</p>

                  <div className="curriculum-preview">
                    <h4>Key Syllabus Highlights:</h4>
                    <ul>
                      {selectedCourse.curriculum.map((item, i) => (
                        <li key={i}><CheckCircle size={14} className="check-icon" /> {item}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="enroll-now-btn" onClick={() => navigate('/auth')}>
                    Enroll in Course <ArrowUpRight size={18} />
                  </button>
                </div>

                {/* Right Interactive Origami Accordion Cards */}
                <div className="accordion-stage-container">
                  <div className="accordion-3d-stack">
                    {selectedCourse.cards.map((cardImg, i) => {
                      const angles = [38, -16, 28, -22];
                      const xOffsets = [-110, -20, 75, 160];
                      const zOffsets = [40, 110, 30, -50];

                      return (
                        <motion.div
                          key={i}
                          className="accordion-slide"
                          initial={{ opacity: 0, rotateY: 90, z: -200 }}
                          animate={{
                            opacity: 1,
                            rotateY: angles[i % angles.length],
                            x: xOffsets[i % xOffsets.length],
                            z: zOffsets[i % zOffsets.length],
                          }}
                          whileHover={{ rotateY: 0, scale: 1.08, z: 180 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.08 }}
                        >
                          <div className="green-backing-panel" />
                          <img src={cardImg} alt="Curriculum visual" className="slide-image" />
                          <div className="play-overlay">
                            <PlayCircle size={32} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </section>
        )}

        {/* Learning System Tab (About Section Equivalent with WebGL Canvas) */}
        {activeTab === 'method' && (
          <section className="learning-system-stage">
            <div className="three-bg-canvas">
              <Canvas camera={{ position: [0, 0, 4.2] }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <InteractiveCodeNode />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
            </div>

            <div className="system-text-content">
              <h2>Project-Driven Software Mastery.</h2>
              <p>
                We don't teach isolated syntax. Our curriculum is built around real-world software architecture,
                high-throughput systems, and production engineering practices.
              </p>
              <p>
                Every module concludes with a peer-reviewed production build—from writing custom C++ firmware
                and GPU shaders to deploying multi-region Kubernetes clusters.
              </p>
              <div className="stats-row">
                <div><strong>98%</strong> Completion Rate</div>
                <div><strong>1-on-1</strong> Senior Mentorship</div>
                <div><strong>Lifetime</strong> Codebase Access</div>
              </div>
            </div>
          </section>
        )}

        {/* Tracks List Tab (More Projects Equivalent) */}
        {activeTab === 'curriculum' && (
          <section className="tracks-stage">
            <div className="tracks-grid">
              <div className="grid-col">
                <h3>Specialized Modules</h3>
                <ul className="track-list">
                  <li onClick={() => navigate('/auth')}>Distributed Systems with Go <ArrowUpRight size={14} /></li>
                  <li onClick={() => navigate('/auth')}>Custom Shader Math & Raymarching <ArrowUpRight size={14} /></li>
                  <li onClick={() => navigate('/auth')}>Kernel Programming & Linux Internals <ArrowUpRight size={14} /></li>
                  <li onClick={() => navigate('/auth')}>GPU Acceleration with CUDA <ArrowUpRight size={14} /></li>
                </ul>
              </div>

              <div className="grid-col">
                <h3>Platform Features</h3>
                <p className="feat-item">Interactive Browser-Based Code Sandbox</p>
                <p className="feat-item">Automated CI/CD Code Review Bot</p>

                <h3 className="section-head">Alumni Engineers At</h3>
                <p className="company-item">Formlabs • Dentsply Sirona • Vercel • AWS</p>
              </div>

              <div className="grid-col canvas-grid-col">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[5, 5, 5]} />
                  <CloudGridWave />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
                </Canvas>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer-bar">
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noreferrer"><GithubIcon size={14} /> DevForge GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><LinkedinIcon size={14} /> LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><TwitterIcon size={14} /> Discord Community</a>
        </div>
        <div className="copyright">© 2026 DevForge Academy Inc. All rights reserved.</div>
      </footer>
    </div>
  );
}
