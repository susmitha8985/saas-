import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  FileText,
  BookOpen,
  HelpCircle,
  ClipboardList,
  PlayCircle,
  Sparkles,
  Download,
  Send,
  Plus,
  BookMarked
} from 'lucide-react';
import './CoursePlayer.css';

// Default mock course data matching the UI in courseolayer.webp
const COURSE_DATA = {
  id: 'course-1',
  title: 'Instructional Design & Backend Architecture Masterclass',
  totalLessons: 16,
  completedLessons: 0,
  modules: [
    {
      id: 'm1',
      number: '01',
      title: 'Introduction to Instructional Design',
      expanded: true,
      items: [
        {
          id: 'l1',
          type: 'video',
          title: 'What is Instructional Design?',
          meta: '05:00',
          durationSec: 300,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          poster: '/test_assets/card_django.jpg',
          completed: false,
        },
        {
          id: 'l2',
          type: 'ebook',
          title: 'Introduction to Brand Design Principles',
          meta: 'Ebook',
          completed: false,
        },
        {
          id: 'l3',
          type: 'reading',
          title: 'Analyzing Successful Brand Designs',
          meta: 'Reading: 20 minutes',
          completed: false,
        },
        {
          id: 'l4',
          type: 'quiz',
          title: "Understanding Figma's Role in Brand Desi..",
          meta: 'Quiz: 05 questions',
          completed: false,
        },
        {
          id: 'l5',
          type: 'quiz',
          title: "Identifying Your Brand's Target Audience",
          meta: 'Quiz: 10 questions',
          completed: false,
        },
        {
          id: 'l6',
          type: 'video',
          title: 'Exploring Color Theory in Branding',
          meta: '04:00',
          durationSec: 240,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          poster: '/test_assets/card_code.jpg',
          completed: false,
        },
        {
          id: 'l7',
          type: 'assignment',
          title: 'Exam on Brand Design Fundamentals',
          meta: 'Assignment',
          completed: false,
        },
      ],
    },
    {
      id: 'm2',
      number: '02',
      title: 'User Research and Analysis',
      expanded: false,
      items: [
        { id: 'l8', type: 'video', title: 'User Interview Techniques', meta: '08:30', completed: false },
        { id: 'l9', type: 'reading', title: 'Creating Persona Frameworks', meta: 'Reading: 15 mins', completed: false },
      ],
    },
    {
      id: 'm3',
      number: '03',
      title: 'Information Architecture',
      expanded: false,
      items: [
        { id: 'l10', type: 'video', title: 'Card Sorting & Sitemap Design', meta: '06:45', completed: false },
      ],
    },
    {
      id: 'm4',
      number: '04',
      title: 'Wireframing and Prototyping',
      expanded: false,
      items: [
        { id: 'l11', type: 'video', title: 'Interactive High-Fidelity Prototypes', meta: '12:15', completed: false },
      ],
    },
  ],
};

const TRANSCRIPT_DATA = [
  {
    time: '00:00',
    seconds: 0,
    text: "Hi everyone, and welcome back to our UI/UX design course! I'm super excited to be here with you today, and in this session, we're going to talk about something really important: the difference between UI and UX.",
  },
  {
    time: '00:10',
    seconds: 10,
    text: "Now, I know that these two terms — UI and UX — are often used together, and sometimes even interchangeably. But they actually refer to two very different aspects of the design process. So let's break it down in a simple way.",
  },
];

export default function CoursePlayer() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Active States
  const [course, setCourse] = useState(COURSE_DATA);
  const [activeLessonId, setActiveLessonId] = useState('l1');
  const [sidebarTab, setSidebarTab] = useState('path'); // 'path', 'learners', 'discuss'
  const [bottomTab, setBottomTab] = useState('transcript'); // 'transcript', 'notes', 'resources'

  // Video State
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(80); // 1:20 to match reference image!
  const [duration, setDuration] = useState(760); // 12:40 (760 seconds) to match reference image!
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  // Notes & Discussion State
  const [notes, setNotes] = useState([
    { id: 1, time: '01:20', text: 'Important distinction between UI and UX design process.' }
  ]);
  const [newNote, setNewNote] = useState('');
  const [discussions, setDiscussions] = useState([
    { id: 1, author: 'Alex Chen', avatar: '👨‍💻', time: '2 hours ago', question: 'How do we handle state sync between module tabs?' }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  // Get active lesson
  const currentLesson =
    course.modules
      .flatMap((m) => m.items)
      .find((item) => item.id === activeLessonId) || course.modules[0].items[0];

  // Update progress
  const completedCount = course.modules
    .flatMap((m) => m.items)
    .filter((i) => i.completed).length;
  const totalCount = 16;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Handle Video Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Rewind / Forward 10s
  const handleSeekOffset = (offset) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        Math.min(duration, videoRef.current.currentTime + offset)
      );
      setCurrentTime(videoRef.current.currentTime);
    } else {
      setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + offset)));
    }
  };

  // Jump to specific timestamp
  const jumpToTime = (sec) => {
    if (videoRef.current) {
      videoRef.current.currentTime = sec;
      videoRef.current.play();
      setIsPlaying(true);
    }
    setCurrentTime(sec);
  };

  // Scrub bar change
  const handleScrub = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Toggle Module Expansion
  const toggleModuleExpand = (modId) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === modId ? { ...m, expanded: !m.expanded } : m
      ),
    }));
  };

  // Format Time (mm:ss)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Add Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), time: formatTime(currentTime), text: newNote },
    ]);
    setNewNote('');
  };

  // Add Question
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setDiscussions((prev) => [
      ...prev,
      { id: Date.now(), author: 'You', avatar: '🎓', time: 'Just now', question: newQuestion },
    ]);
    setNewQuestion('');
  };

  // Render Lesson Icon based on type
  const renderItemIcon = (type) => {
    switch (type) {
      case 'video':
        return <PlayCircle size={15} className="cp-type-icon" />;
      case 'ebook':
        return <FileText size={15} className="cp-type-icon" />;
      case 'reading':
        return <BookOpen size={15} className="cp-type-icon" />;
      case 'quiz':
        return <HelpCircle size={15} className="cp-type-icon" />;
      case 'assignment':
        return <ClipboardList size={15} className="cp-type-icon" />;
      default:
        return <PlayCircle size={15} className="cp-type-icon" />;
    }
  };

  return (
    <div className="cp-root-page">
      {/* Container Box matching exact frame in courseolayer.webp */}
      <div className="cp-main-card">
        
        {/* Top Header Bar matching courseolayer.webp */}
        <header className="cp-top-bar">
          <button
            type="button"
            className="cp-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </header>

        {/* 2-Column Split Workspace */}
        <div className="cp-workspace-grid">
          
          {/* LEFT SIDEBAR: Course Content & Curriculum */}
          <aside className="cp-sidebar">
            <div className="cp-sidebar-header">
              <h2 className="cp-sidebar-title">Course Content</h2>
              <p className="cp-sidebar-subtitle">
                Select the image, the title and the description of your course card. See the preview below.
              </p>

              {/* Progress Card Widget */}
              <div className="cp-progress-widget">
                <div className="cp-progress-meta-top">
                  <span className="cp-prog-label">Your progress</span>
                  <span className="cp-prog-count">
                    00 of {totalCount} lessons completed
                  </span>
                </div>

                <div className="cp-progress-bar-track">
                  <div
                    className="cp-progress-bar-fill"
                    style={{ width: `3%` }}
                  />
                  <div
                    className="cp-progress-thumb-pin"
                    style={{ left: `3%` }}
                  />
                </div>

                <div className="cp-progress-meta-bottom">
                  <span className="cp-prog-percent">00% completed</span>
                  <span className="cp-prog-motto">Keep going! 🎯</span>
                </div>
              </div>

              {/* Navigation Tabs (Path, Learners, Discuss) */}
              <div className="cp-sidebar-tabs">
                <button
                  type="button"
                  className={`cp-stab-btn ${sidebarTab === 'path' ? 'active' : ''}`}
                  onClick={() => setSidebarTab('path')}
                >
                  Path
                </button>
                <button
                  type="button"
                  className={`cp-stab-btn ${sidebarTab === 'learners' ? 'active' : ''}`}
                  onClick={() => setSidebarTab('learners')}
                >
                  Learners
                </button>
                <button
                  type="button"
                  className={`cp-stab-btn ${sidebarTab === 'discuss' ? 'active' : ''}`}
                  onClick={() => setSidebarTab('discuss')}
                >
                  Discuss
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: PATH (CURRICULUM MODULES) */}
            {sidebarTab === 'path' && (
              <div className="cp-modules-accordion-wrap">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="cp-module-block">
                    <div
                      className="cp-module-header"
                      onClick={() => toggleModuleExpand(mod.id)}
                    >
                      <div className="cp-mod-title-left">
                        {mod.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <span className="cp-mod-name">
                          {mod.number} {mod.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="cp-mod-opts-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>

                    {/* Expandable Module Lessons */}
                    {mod.expanded && (
                      <div className="cp-module-items-list">
                        {mod.items.map((item) => {
                          const isActive = item.id === activeLessonId;
                          return (
                            <div
                              key={item.id}
                              className={`cp-lesson-row ${isActive ? 'active-lesson' : ''}`}
                              onClick={() => {
                                setActiveLessonId(item.id);
                                if (item.type === 'video') {
                                  setIsPlaying(true);
                                }
                              }}
                            >
                              <div className="cp-lesson-icon-col">
                                {renderItemIcon(item.type)}
                              </div>
                              <div className="cp-lesson-info-col">
                                <span className="cp-lesson-title">{item.title}</span>
                                <span className="cp-lesson-meta">{item.meta}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 2: LEARNERS */}
            {sidebarTab === 'learners' && (
              <div className="cp-tab-pane-content">
                <h4 className="cp-pane-title">Classmates & Active Learners (1,420)</h4>
                <ul className="cp-learners-list">
                  <li className="cp-learner-item">
                    <span className="cp-avatar-emoji">👨‍💻</span>
                    <div>
                      <strong>Rahul Sharma</strong>
                      <p>Completed 12/16 lessons</p>
                    </div>
                  </li>
                  <li className="cp-learner-item">
                    <span className="cp-avatar-emoji">👩‍💻</span>
                    <div>
                      <strong>Priya Patel</strong>
                      <p>Completed 14/16 lessons</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {/* TAB CONTENT 3: DISCUSS */}
            {sidebarTab === 'discuss' && (
              <div className="cp-tab-pane-content">
                <h4 className="cp-pane-title">Course Discussion Q&A</h4>
                <form onSubmit={handleAddQuestion} className="cp-qa-form">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="cp-qa-input"
                  />
                  <button type="submit" className="cp-qa-btn">
                    <Send size={14} />
                  </button>
                </form>

                <div className="cp-qa-list">
                  {discussions.map((d) => (
                    <div key={d.id} className="cp-qa-card">
                      <div className="cp-qa-head">
                        <span>{d.avatar} {d.author}</span>
                        <small>{d.time}</small>
                      </div>
                      <p>{d.question}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT MAIN WORKSPACE: VIDEO PLAYER & WORKSPACE TABS */}
          <main className="cp-main-player-col">
            
            {/* VIDEO PLAYER FRAME CONTAINER */}
            <div className="cp-player-card" ref={playerContainerRef}>
              <div className="cp-video-viewport">
                {/* HTML5 Video element with poster image */}
                <video
                  ref={videoRef}
                  className="cp-video-element"
                  src={currentLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                  poster={currentLesson.poster || "/test_assets/card_django.jpg"}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                />

                {/* Overlaid Play Center Button if Paused */}
                {!isPlaying && (
                  <button type="button" className="cp-play-overlay-btn" onClick={togglePlay}>
                    <Play size={36} color="#ffffff" fill="#ffffff" />
                  </button>
                )}

                {/* CUSTOM CONTROLS OVERLAY matching courseolayer.webp */}
                <div className="cp-controls-bar">
                  
                  {/* SCRUB / PROGRESS SLIDER */}
                  <div className="cp-scrub-row">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      step="0.1"
                      value={currentTime}
                      onChange={handleScrub}
                      className="cp-scrub-slider"
                    />
                  </div>

                  {/* BOTTOM CONTROLS BAR */}
                  <div className="cp-controls-bottom-row">
                    
                    {/* Left Group: Play/Pause, Volume, Time */}
                    <div className="cp-ctrl-left">
                      <button type="button" className="cp-icon-btn" onClick={togglePlay}>
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>

                      <button
                        type="button"
                        className="cp-icon-btn"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>

                      <span className="cp-time-text">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Center Group: 10s Rewind, Play Pause, 10s Forward */}
                    <div className="cp-ctrl-center">
                      <button
                        type="button"
                        className="cp-skip-circle-btn"
                        onClick={() => handleSeekOffset(-10)}
                        title="Rewind 10s"
                      >
                        <RotateCcw size={13} />
                        <span className="cp-skip-num">10</span>
                      </button>

                      <button
                        type="button"
                        className="cp-center-play-pause"
                        onClick={togglePlay}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>

                      <button
                        type="button"
                        className="cp-skip-circle-btn"
                        onClick={() => handleSeekOffset(10)}
                        title="Forward 10s"
                      >
                        <RotateCw size={13} />
                        <span className="cp-skip-num">10</span>
                      </button>
                    </div>

                    {/* Right Group: Gear Settings, Fullscreen */}
                    <div className="cp-ctrl-right">
                      <button type="button" className="cp-icon-btn" title="Settings">
                        <Settings size={18} />
                      </button>

                      <button
                        type="button"
                        className="cp-icon-btn"
                        title="Toggle Fullscreen"
                        onClick={() => {
                          if (playerContainerRef.current) {
                            if (!document.fullscreenElement) {
                              playerContainerRef.current.requestFullscreen();
                              setIsFullscreen(true);
                            } else {
                              document.exitFullscreen();
                              setIsFullscreen(false);
                            }
                          }
                        }}
                      >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* LOWER WORKSPACE SECTION (Tabs, AI Assistant, Transcript/Notes) */}
            <div className="cp-lower-workspace">
              
              {/* Pill Tabs Bar (Transcript, Notes, Resources) */}
              <div className="cp-bottom-tabs-row">
                <button
                  type="button"
                  className={`cp-ptab-btn ${bottomTab === 'transcript' ? 'active' : ''}`}
                  onClick={() => setBottomTab('transcript')}
                >
                  Transcript
                </button>
                <button
                  type="button"
                  className={`cp-ptab-btn ${bottomTab === 'notes' ? 'active' : ''}`}
                  onClick={() => setBottomTab('notes')}
                >
                  Notes
                </button>
                <button
                  type="button"
                  className={`cp-ptab-btn ${bottomTab === 'resources' ? 'active' : ''}`}
                  onClick={() => setBottomTab('resources')}
                >
                  Resources
                </button>
              </div>

              {/* AI Assistant Banner Box matching courseolayer.webp */}
              <div className="cp-ai-banner-box">
                <div className="cp-ai-banner-left">
                  <div className="cp-ai-sparkle-icon">
                    <Sparkles size={18} color="#6366f1" />
                  </div>
                  <div className="cp-ai-text-wrap">
                    <strong className="cp-ai-title">
                      Ask the AI to generate advanced summaries of the video content and take notes
                    </strong>
                    <button
                      type="button"
                      className="cp-ai-link-btn"
                      onClick={() => setShowAIModal(true)}
                    >
                      Try them out now!
                    </button>
                  </div>
                </div>
              </div>

              {/* TAB 1: TRANSCRIPT WITH CLICKABLE TIMESTAMPS matching courseolayer.webp */}
              {bottomTab === 'transcript' && (
                <div className="cp-transcript-container">
                  {TRANSCRIPT_DATA.map((t, idx) => (
                    <div key={idx} className="cp-transcript-block">
                      <button
                        type="button"
                        className="cp-ts-stamp-btn"
                        onClick={() => jumpToTime(t.seconds)}
                      >
                        {t.time}
                      </button>
                      <p className="cp-ts-text">{t.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: NOTES */}
              {bottomTab === 'notes' && (
                <div className="cp-notes-container">
                  <form onSubmit={handleAddNote} className="cp-note-input-row">
                    <input
                      type="text"
                      placeholder={`Save a note at ${formatTime(currentTime)}...`}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="cp-note-input"
                    />
                    <button type="submit" className="cp-save-note-btn">
                      <Plus size={16} /> Save Note
                    </button>
                  </form>

                  <div className="cp-notes-list">
                    {notes.map((n) => (
                      <div key={n.id} className="cp-note-card">
                        <span className="cp-note-time-badge">{n.time}</span>
                        <p className="cp-note-text">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: RESOURCES */}
              {bottomTab === 'resources' && (
                <div className="cp-resources-container">
                  <div className="cp-resource-item">
                    <FileText size={18} color="#6366f1" />
                    <div className="cp-res-info">
                      <strong>Course Lecture Slides (PDF)</strong>
                      <small>12.4 MB • Updated August 2026</small>
                    </div>
                    <button type="button" className="cp-res-dl-btn">
                      <Download size={14} /> Download
                    </button>
                  </div>

                  <div className="cp-resource-item">
                    <BookMarked size={18} color="#6366f1" />
                    <div className="cp-res-info">
                      <strong>GitHub Source Code Repository</strong>
                      <small>Full production-ready setup</small>
                    </div>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="cp-res-dl-btn"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>

      </div>

      {/* AI SUMMARY GENERATOR MODAL */}
      {showAIModal && (
        <div className="cp-ai-modal-overlay" onClick={() => setShowAIModal(false)}>
          <div className="cp-ai-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="cp-ai-modal-header">
              <div className="cp-ai-mhead-left">
                <Sparkles size={20} color="#6366f1" />
                <h3>AI Content Summary & Key Takeaways</h3>
              </div>
              <button
                type="button"
                className="cp-modal-close"
                onClick={() => setShowAIModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="cp-ai-modal-body">
              <h4>Module 1 Summary: Instructional Design</h4>
              <ul>
                <li>
                  <strong>Core Difference:</strong> UI focuses on visual aesthetics, while UX structures user experience & cognitive workflows.
                </li>
                <li>
                  <strong>System Pattern:</strong> Microservices decouple user interfaces from backend data pipelines.
                </li>
              </ul>
            </div>

            <div className="cp-ai-modal-footer">
              <button
                type="button"
                className="cp-ai-close-btn"
                onClick={() => setShowAIModal(false)}
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
