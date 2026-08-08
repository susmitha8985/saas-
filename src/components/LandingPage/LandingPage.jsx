import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  Globe,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Menu,
  TrendingUp,
  Sparkles,
  Award,
  Tv,
  Lightbulb,
  GraduationCap,
  Trash2,
  Lock,
  ArrowRight
} from 'lucide-react';
import './LandingPage.css';

// --- SAFE IMAGE COMPONENT WITH FALLBACK ---
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';

function SafeImage({ src, alt, className, style }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt || 'Image'}
      className={className}
      style={style}
      onError={() => {
        if (imgSrc !== FALLBACK_IMAGE) {
          setImgSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}

// --- DATA FOR 3D ESSENTIAL SKILLS ---
const ESSENTIAL_SKILLS = [
  {
    id: 'skill-1',
    title: 'Prompt Engineering',
    color: '#00b894',
    bgColor: '#e8f8f5',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skill-2',
    title: 'Microsoft Excel',
    color: '#e17055',
    bgColor: '#fdf2e9',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skill-3',
    title: 'Large Language Models',
    color: '#0984e3',
    bgColor: '#ebf5fb',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80'
  }
];

// --- DATA FOR TRENDING COURSES (INR PRICING ₹) ---
const TRENDING_COURSES = [
  {
    id: 'tr-1',
    title: 'ChatGPT & AI Tools - From Beginner to Expert',
    instructor: 'Todd McLeod',
    badgeType: 'premium',
    badgeText: 'Premium',
    rating: 4.6,
    ratingsCount: '3,005',
    price: '₹799.00',
    originalPrice: '₹3,499.00',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    description: 'Master ChatGPT, Prompt Engineering, Midjourney, Grok, Gemini, and 20+ AI productivity tools to boost work efficiency.',
    hours: '14 total hours • All Levels'
  },
  {
    id: 'tr-2',
    title: 'AI Engineer Agentic Track: The Complete Agent & MCP Course',
    instructor: 'Ed Donner, Ligency',
    badgeType: 'bestseller',
    badgeText: 'Bestseller',
    rating: 4.7,
    ratingsCount: '45,182',
    price: '₹799.00',
    originalPrice: '₹4,999.00',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    description: 'Build autonomous AI agents using LangChain, AutoGen, CrewAI, Model Context Protocol (MCP), and OpenAI Assistants.',
    hours: '28 total hours • Intermediate'
  },
  {
    id: 'tr-3',
    title: 'The Complete Claude Code & Claude Cowork Masterclass [2026]',
    instructor: 'Prof. Ryan Ahmed, PhD, MBA',
    badgeType: 'bestseller',
    badgeText: 'Bestseller',
    rating: 4.6,
    ratingsCount: '6,720',
    price: '₹1,239.00',
    originalPrice: '₹3,899.00',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Learn Claude 3.5 Sonnet, Claude Code CLI, Artifacts, Computer Use, and Anthropic API for real-world software engineering.',
    hours: '18.5 total hours • All Levels'
  },
  {
    id: 'tr-4',
    title: 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents',
    instructor: 'Ligency, Ed Donner',
    badgeType: 'bestseller',
    badgeText: 'Bestseller',
    rating: 4.6,
    ratingsCount: '39,235',
    price: '₹3,289.00',
    originalPrice: '₹6,499.00',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: 'Deep dive into Fine-tuning Llama 3 with QLoRA, building production RAG applications with Vector DBs and LangChain.',
    hours: '42 total hours • Advanced'
  }
];

// --- SKILLS TRANSFORM CATEGORIES & COURSES ---
const TRANSFORM_CATEGORIES = [
  'Artificial Intelligence (AI)',
  'Python',
  'Microsoft Excel',
  'AI Agents & Agentic AI',
  'Digital Marketing',
  'Amazon AWS'
];

const TRANSFORM_COURSES_DATA = {
  'Artificial Intelligence (AI)': [
    {
      id: 'ai-1',
      title: 'The AI Engineer Course 2026: Complete AI Engineer Bootcamp',
      instructor: '365 Careers',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.5,
      ratingsCount: '23,970',
      price: '₹3,089.00',
      originalPrice: '₹5,999.00',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      description: 'The complete training: Deep Learning, Neural Networks, PyTorch, Transformers, HuggingFace, and LLM Fine-Tuning.'
    },
    {
      id: 'ai-2',
      title: 'A Practical Intro to AI Agents and Agentic AI',
      instructor: 'Ligency, Alex Honchar',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.6,
      ratingsCount: '318',
      price: '₹1,239.00',
      originalPrice: '₹3,299.00',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
      description: 'Build multi-agent workflows with AutoGen, CrewAI, Semantic Kernel, and custom tool calling.'
    },
    {
      id: 'ai-3',
      title: 'The Complete AI & GenAI Engineer Bootcamp 2026: Zero to Hero',
      instructor: 'AI University',
      badgeType: 'normal',
      badgeText: 'Highest Rated',
      rating: 4.7,
      ratingsCount: '25',
      price: '₹799.00',
      originalPrice: '₹2,999.00',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      description: 'Learn Generative AI, Prompt Engineering, Midjourney, Stable Diffusion, and OpenAI API from scratch.'
    },
    {
      id: 'ai-4',
      title: 'AI A-Z [2026]: Agentic AI, Gen AI, Prompt Engineering and RL',
      instructor: 'Hadelin de Ponteves, Kirill Eremenko',
      badgeType: 'premium',
      badgeText: 'Premium',
      rating: 4.4,
      ratingsCount: '50,488',
      price: '₹3,549.00',
      originalPrice: '₹6,999.00',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      description: 'Combine Reinforcement Learning (Q-Learning) with Generative AI and Autonomous Agentic architectures.'
    }
  ],
  'Python': [
    {
      id: 'py-1',
      title: '100 Days of Code: The Complete Python Pro Bootcamp',
      instructor: 'Dr. Angela Yu',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.8,
      ratingsCount: '312,450',
      price: '₹799.00',
      originalPrice: '₹3,899.00',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      description: 'Master Python by building 100 projects in 100 days. Learn Data Science, Automation, Web Apps, and Games.'
    },
    {
      id: 'py-2',
      title: 'The Complete Python Bootcamp From Zero to Hero in Python',
      instructor: 'Jose Portilla',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.7,
      ratingsCount: '495,820',
      price: '₹799.00',
      originalPrice: '₹3,499.00',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
      description: 'Learn Python like a pro! Start from basics and build complex applications, object-oriented systems, and automation scripts.'
    }
  ],
  'Microsoft Excel': [
    {
      id: 'ex-1',
      title: 'Microsoft Excel - Excel from Beginner to Advanced',
      instructor: 'Kyle Pew',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.7,
      ratingsCount: '420,100',
      price: '₹799.00',
      originalPrice: '₹3,899.00',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      description: 'Master Excel formulas (VLOOKUP, XLOOKUP), Pivot Tables, Charts, Macros, and VBA in Microsoft 365.'
    }
  ],
  'AI Agents & Agentic AI': [
    {
      id: 'ag-1',
      title: 'AI Agents Masterclass: Build Autonomous Multi-Agent AI Systems',
      instructor: 'Dr. Ryan Ahmed',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.8,
      ratingsCount: '12,450',
      price: '₹1,239.00',
      originalPrice: '₹4,499.00',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
      description: 'Learn to design multi-agent swarms with AutoGen, CrewAI, and LangChain.'
    }
  ],
  'Digital Marketing': [
    {
      id: 'dm-1',
      title: 'The Complete Digital Marketing Course - 12 Courses in 1',
      instructor: 'Rob Percival, Daragh Walsh',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.6,
      ratingsCount: '165,200',
      price: '₹799.00',
      originalPrice: '₹3,499.00',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      description: 'Master SEO, Google Ads, Facebook Ads, Social Media Marketing, Email Marketing, and Analytics.'
    }
  ],
  'Amazon AWS': [
    {
      id: 'aws-1',
      title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
      instructor: 'Stephane Maarek',
      badgeType: 'bestseller',
      badgeText: 'Bestseller',
      rating: 4.7,
      ratingsCount: '245,000',
      price: '₹1,239.00',
      originalPrice: '₹4,999.00',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      description: 'Pass the AWS SAA-C03 exam with hands-on practice labs, EC2, S3, RDS, VPC, and architecture diagrams.'
    }
  ]
};

const LANGUAGES = [
  'English', 'Hindi (हिन्दी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Kannada (ಕನ್ನಡ)',
  'Malayalam (മലയാളം)', 'Bengali (বাংলা)', 'Marathi (मराठी)', 'Gujarati (ગુજરાતી)',
  'Deutsch', 'Español', 'Français', 'Bahasa Indonesia', 'Italiano', '日本語', '한국어'
];

export default function LandingPage() {
  const navigate = useNavigate();

  // Component State
  const [activeTransformTab, setActiveTransformTab] = useState('Artificial Intelligence (AI)');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0, side: 'right' });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart & Wishlist Handlers
  const toggleCart = (course) => {
    if (cartItems.some(item => item.id === course.id)) {
      setCartItems(cartItems.filter(item => item.id !== course.id));
    } else {
      setCartItems([...cartItems, course]);
    }
  };

  const toggleWishlist = (courseId, e) => {
    e?.stopPropagation();
    if (wishlistItems.includes(courseId)) {
      setWishlistItems(wishlistItems.filter(id => id !== courseId));
    } else {
      setWishlistItems([...wishlistItems, courseId]);
    }
  };

  // Hover Popover Positioning logic
  const handleMouseEnterCard = (course, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    
    let side = 'right';
    let left = rect.right + 12;

    if (rect.right + 340 > windowWidth) {
      side = 'left';
      left = rect.left - 352;
    }

    setPopoverPos({
      top: rect.top + window.scrollY - 10,
      left: left,
      side: side
    });
    setHoveredCourse(course);
  };

  const handleMouseLeaveCard = () => {
    setHoveredCourse(null);
  };

  // Search Results
  const allCourses = [...TRENDING_COURSES, ...Object.values(TRANSFORM_COURSES_DATA).flat()];
  const searchResults = searchQuery.trim() === '' ? [] : allCourses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="udemy-in-root">
      
      {/* 1. HEADER NAVBAR (Matching Screenshot 1) */}
      <header className="udemy-in-header">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-hamburger-btn" aria-label="Toggle Menu">
          <Menu size={22} />
        </button>

        <div onClick={() => navigate('/')} className="in-brand-wrap" title="codeForEveryBody Home">
          <div className="in-brand-icon">
            <GraduationCap size={22} color="#ffffff" />
          </div>
          <span className="in-brand-title">
            code<span className="purple-txt">ForEveryBody</span>
          </span>
        </div>

        {/* Categories / Explore */}
        <div
          className="in-explore-wrap"
          onMouseEnter={() => setIsCategoriesMenuOpen(true)}
          onMouseLeave={() => setIsCategoriesMenuOpen(false)}
        >
          <button className="in-nav-btn">
            Explore <ChevronDown size={14} style={{ marginLeft: 2 }} />
          </button>
          
          {isCategoriesMenuOpen && (
            <div className="in-categories-dropdown">
              {['Development', 'Business', 'Finance & Accounting', 'IT & Software', 'Office Productivity', 'Personal Development', 'Design', 'Marketing', 'Health & Fitness', 'Music'].map(cat => (
                <div key={cat} onClick={() => { setIsCategoriesMenuOpen(false); navigate('/learning'); }} className="in-dropdown-item">
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => navigate('/overview')} className="in-nav-btn hide-mobile">
          Subscribe
        </button>

        {/* Global Search Bar */}
        <div className="in-search-container">
          <div className={`in-search-box ${isSearchFocused ? 'focused' : ''}`}>
            <Search size={18} className="in-search-icon" />
            <input
              type="text"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="in-search-clear">
                <X size={14} />
              </button>
            )}
          </div>

          {isSearchFocused && (
            <div className="in-autocomplete-popover">
              {searchQuery.trim() === '' ? (
                <div className="in-trending-box">
                  <div className="in-popover-title">Trending Searches</div>
                  <div className="in-chips-row">
                    {['python', 'chatgpt', 'ai engineer', 'excel', 'aws', 'claude code'].map(t => (
                      <button key={t} onMouseDown={() => setSearchQuery(t)} className="in-chip-btn">
                        <TrendingUp size={12} /> {t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="in-results-list">
                  {searchResults.slice(0, 5).map(course => (
                    <div key={course.id} onMouseDown={() => navigate('/learning')} className="in-search-row">
                      <SafeImage src={course.image} alt={course.title} className="in-search-thumb" />
                      <div className="in-search-info">
                        <div className="in-search-title">{course.title}</div>
                        <div className="in-search-instructor">By {course.instructor}</div>
                      </div>
                      <div className="in-search-price">{course.price}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="in-no-results">No courses found matching "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        {/* Header Right Nav Actions */}
        <div className="in-nav-actions">
          <button className="in-nav-txt-link hide-tablet">CareerHub Business</button>
          <button className="in-nav-txt-link hide-tablet">Teach on CareerHub</button>

          {/* Cart Icon */}
          <button onClick={() => setIsCartOpen(true)} className="in-icon-btn" title="Shopping Cart">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && <span className="in-cart-badge">{cartItems.length}</span>}
          </button>

          {/* Auth Action Buttons */}
          <button onClick={() => navigate('/auth?mode=signin')} className="in-btn-login">
            Log in
          </button>
          <button onClick={() => navigate('/auth?mode=signup')} className="in-btn-signup">
            Sign up
          </button>

          {/* Language Switcher */}
          <button onClick={() => setIsLangModalOpen(true)} className="in-btn-globe" title="Change Language">
            <Globe size={18} />
          </button>
        </div>
      </header>

      {/* 2. TEAL HERO BILLBOARD SECTION (Matching Screenshot 1) */}
      <section className="in-hero-billboard">
        <div className="in-hero-inner">
          {/* Left Floating Overlay Card */}
          <div className="in-hero-card">
            <h1 className="in-hero-title">Save 30% on a year of learning</h1>
            <p className="in-hero-desc">
              Personal Plan is your career companion for AI and more cutting-edge skills. Sale ends Aug 11. Terms apply.
            </p>
            <button onClick={() => navigate('/overview')} className="in-hero-cta">
              Save now
            </button>
          </div>

          {/* Right Hero Image Art */}
          <div className="in-hero-art-wrap">
            <SafeImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
              alt="Student learning"
              className="in-hero-art-img"
            />
          </div>
        </div>
      </section>

      {/* 3. LEARN ESSENTIAL CAREER AND LIFE SKILLS 3D CARDS (Matching Screenshot 2) */}
      <section className="in-essential-skills-section">
        <h2 className="in-section-heading">
          Learn <em>essential</em> career and life skills
        </h2>
        <p className="in-section-sub">
          CareerHub helps you build in-demand skills fast and advance your career in a changing job market
        </p>

        <div className="in-essential-grid">
          {ESSENTIAL_SKILLS.map((skill) => (
            <div key={skill.id} onClick={() => navigate('/learning')} className="in-3d-card">
              <div className="in-3d-img-container" style={{ backgroundColor: skill.bgColor }}>
                <SafeImage src={skill.image} alt={skill.title} className="in-3d-img" />
              </div>
              <div className="in-3d-bottom-pill">
                <span className="pill-title">{skill.title}</span>
                <ArrowRight size={18} color="#1c1d1f" />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation dots */}
        <div className="in-dots-controls">
          <button className="in-arrow-circle"><ChevronLeft size={18} /></button>
          <div className="in-dots-bar">
            <span className="dot" />
            <span className="dot active-pill" />
            <span className="dot" />
          </div>
          <button className="in-arrow-circle"><ChevronRight size={18} /></button>
        </div>
      </section>

      {/* 4. TRENDING COURSES (Matching Screenshot 3) */}
      <section className="in-trending-section">
        <div className="in-section-header">
          <h2 className="in-section-heading">Trending courses</h2>
        </div>

        <div className="in-courses-grid">
          {TRENDING_COURSES.map((course) => (
            <div
              key={course.id}
              className="in-course-card"
              onMouseEnter={(e) => handleMouseEnterCard(course, e)}
              onMouseLeave={handleMouseLeaveCard}
              onClick={() => navigate('/learning')}
            >
              <div className="in-thumb-wrap">
                <SafeImage src={course.image} alt={course.title} className="in-thumb-img" />
              </div>

              <div className="in-course-info">
                <h3 className="in-course-title">{course.title}</h3>
                <p className="in-course-instructor">{course.instructor}</p>

                {/* Badge Tag & Rating */}
                <div className="in-badge-rating-row">
                  <span className={`in-badge ${course.badgeType}`}>
                    {course.badgeText}
                  </span>
                  <span className="in-rating-num">★ {course.rating}</span>
                  <span className="in-rating-count">{course.ratingsCount} ratings</span>
                </div>

                {/* Indian Rupee Price */}
                <div className="in-price-row">
                  <span className="in-current-price">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE UDEMY COURSE HOVER PREVIEW POPOVER */}
      {hoveredCourse && (
        <div
          className={`udemy-popover-preview ${popoverPos.side}`}
          style={{ top: `${popoverPos.top}px`, left: `${popoverPos.left}px` }}
          onMouseEnter={() => setHoveredCourse(hoveredCourse)}
          onMouseLeave={() => setHoveredCourse(null)}
        >
          <h4 className="popover-title">{hoveredCourse.title}</h4>
          
          <div className="popover-meta-row">
            <span className="meta-badge-updated">Updated August 2026</span>
            <span className="meta-info">{hoveredCourse.hours || '24 total hours • All Levels'} • Subtitles</span>
          </div>

          <p className="popover-desc">{hoveredCourse.description || 'Master this topic from scratch with hands-on projects, labs, and expert guidance.'}</p>

          <div className="popover-highlights-header">What you'll learn:</div>
          <ul className="popover-highlights-list">
            <li className="highlight-item"><Check size={16} color="#1c1d1f" className="check-icon" /> Build real-world portfolio projects</li>
            <li className="highlight-item"><Check size={16} color="#1c1d1f" className="check-icon" /> Master key industry concepts & tools</li>
            <li className="highlight-item"><Check size={16} color="#1c1d1f" className="check-icon" /> Get Certificate of Completion</li>
          </ul>

          <div className="popover-actions">
            <button
              onClick={() => toggleCart(hoveredCourse)}
              className={`udemy-btn-dark popover-cart-btn ${cartItems.some(i => i.id === hoveredCourse.id) ? 'in-cart' : ''}`}
            >
              {cartItems.some(i => i.id === hoveredCourse.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={(e) => toggleWishlist(hoveredCourse.id, e)}
              className={`popover-wishlist-circle ${wishlistItems.includes(hoveredCourse.id) ? 'active' : ''}`}
            >
              <Heart size={18} fill={wishlistItems.includes(hoveredCourse.id) ? '#1c1d1f' : 'transparent'} />
            </button>
          </div>
        </div>
      )}

      {/* 5. PERSONAL PLAN SUBSCRIPTION BANNER (Matching Screenshot 4) */}
      <section className="in-personal-plan-banner">
        <div className="in-plan-card-inner">
          {/* Left Column Content */}
          <div className="in-plan-left">
            <h2 className="in-plan-heading">
              Build your career with a Personal Plan subscription
            </h2>
            <p className="in-plan-sub">
              Subscribers save an average of ₹4,000+ in their first month, stop paying per course. Join 5 lakh+ learners, starting at <strong>₹500/month</strong>.
            </p>

            {/* 4 Feature Chips */}
            <div className="in-plan-features-grid">
              <div className="in-feature-chip">
                <Sparkles size={18} color="#cec0fc" />
                <span>Get access to 28,000+ top-rated courses</span>
              </div>
              <div className="in-feature-chip">
                <Lightbulb size={18} color="#cec0fc" />
                <span>Learn from 9,000+ expert instructors</span>
              </div>
              <div className="in-feature-chip">
                <Tv size={18} color="#cec0fc" />
                <span>Dev, IT, Business, Design and 50+ topics</span>
              </div>
              <div className="in-feature-chip">
                <Award size={18} color="#cec0fc" />
                <span>Certification prep for AWS, Microsoft, PMI</span>
              </div>
            </div>

            <div className="in-plan-actions">
              <button onClick={() => navigate('/auth?mode=signup')} className="in-plan-btn-white">
                Subscribe now
              </button>
              <button onClick={() => navigate('/overview')} className="in-plan-link-txt">
                Learn more
              </button>
            </div>
          </div>

          {/* Right Column Art */}
          <div className="in-plan-right">
            <SafeImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Learner Portrait"
              className="in-plan-portrait-img"
            />
          </div>
        </div>
      </section>

      {/* 6. SKILLS TO TRANSFORM YOUR CAREER AND LIFE (Matching Screenshot 5) */}
      <section className="in-transform-section">
        <h2 className="in-section-heading">Skills to transform your career and life</h2>
        <p className="in-section-sub">
          From critical skills to technical topics, CareerHub supports your professional development.
        </p>

        {/* Category Tabs */}
        <div className="in-transform-tabs">
          {TRANSFORM_CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTransformTab(tab)}
              className={`in-transform-tab ${activeTransformTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Transform Courses Grid */}
        <div className="in-courses-grid">
          {(TRANSFORM_COURSES_DATA[activeTransformTab] || []).map((course) => (
            <div
              key={course.id}
              className="in-course-card"
              onMouseEnter={(e) => handleMouseEnterCard(course, e)}
              onMouseLeave={handleMouseLeaveCard}
              onClick={() => navigate('/learning')}
            >
              <div className="in-thumb-wrap">
                <SafeImage src={course.image} alt={course.title} className="in-thumb-img" />
              </div>

              <div className="in-course-info">
                <h3 className="in-course-title">{course.title}</h3>
                <p className="in-course-instructor">{course.instructor}</p>

                <div className="in-badge-rating-row">
                  <span className={`in-badge ${course.badgeType}`}>
                    {course.badgeText}
                  </span>
                  <span className="in-rating-num">★ {course.rating}</span>
                  <span className="in-rating-count">{course.ratingsCount} ratings</span>
                </div>

                <div className="in-price-row">
                  <span className="in-current-price">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="in-footer">
        <div className="in-footer-inner">
          <div className="in-footer-top">
            <div className="in-footer-brand">
              <GraduationCap size={24} color="#cec0fc" />
              <span className="in-footer-brand-title">Career<span style={{ color: '#cec0fc' }}>Hub</span></span>
            </div>
            <button onClick={() => setIsLangModalOpen(true)} className="in-footer-lang-btn">
              <Globe size={18} />
              <span>{selectedLanguage}</span>
            </button>
          </div>

          <div className="in-footer-links-grid">
            <div className="in-footer-col">
              <a href="#ub">CareerHub Business</a>
              <a href="#teach">Teach on CareerHub</a>
              <a href="#app">Get the app</a>
              <a href="#about">About us</a>
            </div>
            <div className="in-footer-col">
              <a href="#careers">Careers</a>
              <a href="#blog">Blog</a>
              <a href="#help">Help and Support</a>
              <a href="#affiliate">Affiliate</a>
            </div>
            <div className="in-footer-col">
              <a href="#terms">Terms</a>
              <a href="#privacy">Privacy policy</a>
              <a href="#cookies">Cookie settings</a>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>

          <div className="in-footer-bottom">
            <span>© 2026 CareerHub, Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* SHOPPING CART SIDE DRAWER */}
      {isCartOpen && (
        <div className="udemy-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="udemy-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Shopping Cart ({cartItems.length})</h3>
              <button onClick={() => setIsCartOpen(false)} className="drawer-close-btn">
                <X size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <ShoppingCart size={48} color="#6a6f73" />
                <p>Your cart is empty. Keep exploring to find top courses!</p>
                <button onClick={() => { setIsCartOpen(false); navigate('/learning'); }} className="in-btn-signup">
                  Keep Shopping
                </button>
              </div>
            ) : (
              <div className="cart-drawer-content">
                <div className="cart-items-scroll">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <SafeImage src={item.image} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-details">
                        <div className="cart-item-title">{item.title}</div>
                        <div className="cart-item-author">By {item.instructor}</div>
                        <div className="cart-item-price">{item.price}</div>
                      </div>
                      <button onClick={() => toggleCart(item)} className="cart-item-remove" title="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary-footer">
                  <button onClick={() => alert('Proceeding to CareerHub Secure Checkout...')} className="in-btn-signup checkout-btn">
                    <Lock size={16} /> Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LANGUAGE SELECTION MODAL */}
      {isLangModalOpen && (
        <div className="udemy-modal-backdrop" onClick={() => setIsLangModalOpen(false)}>
          <div className="udemy-lang-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choose a language</h3>
              <button onClick={() => setIsLangModalOpen(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>
            <div className="lang-grid">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setSelectedLanguage(lang); setIsLangModalOpen(false); }}
                  className={`lang-option-btn ${selectedLanguage === lang ? 'active' : ''}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
