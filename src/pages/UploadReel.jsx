import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Upload, Video, Tag, FileText, CheckCircle2, AlertCircle, Loader } from 'lucide-react';

export default function UploadReel() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    transcript: '',
    hashtags: '',
    category: 'coding',
    difficulty: 'Beginner',
    isEducational: false
  });

  const [videoFile, setVideoFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
      } else {
        setError('Only video files (.mp4, .mov, etc.) are supported.');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
      } else {
        setError('Only video files (.mp4, .mov, etc.) are supported.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.title) {
      setError('Title is required.');
      return;
    }

    if (!videoFile) {
      setError('Please select a video file to upload.');
      return;
    }

    setLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('transcript', formData.transcript);
      uploadData.append('hashtags', formData.hashtags);
      uploadData.append('category', formData.category);
      uploadData.append('difficulty', formData.difficulty);
      uploadData.append('isEducational', formData.isEducational);
      uploadData.append('video', videoFile);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/reels`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: uploadData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        transcript: '',
        hashtags: '',
        category: 'coding',
        difficulty: 'Beginner',
        isEducational: false
      });
      setVideoFile(null);
      setTimeout(() => {
        navigate('/feed');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error occurred during file upload to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-dark-card border border-dark-border p-8 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-indigo/5 rounded-bl-full" />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">Upload Tech Reel</h1>
            <p className="text-xs text-dark-muted">
              Add custom short videos. Transcripts and tags will be analyzed by Grok AI.
            </p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm mb-6 animate-pulse">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>Reel successfully uploaded and registered! Redirecting to feed...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* File Drag and Drop Zone */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                dragActive ? 'border-primary-indigo bg-primary-indigo/5 scale-[1.01]' : 
                videoFile ? 'border-primary-cyan bg-primary-cyan/5' : 'border-dark-border hover:border-white/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {videoFile ? (
                <div className="text-center space-y-2">
                  <Video className="w-12 h-12 text-primary-cyan mx-auto animate-bounce" />
                  <p className="text-sm font-bold text-white max-w-[280px] truncate">{videoFile.name}</p>
                  <p className="text-xs text-dark-muted">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB • Ready</p>
                  <span className="text-[10px] text-primary-cyan underline block">Change video file</span>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Upload className="w-12 h-12 text-dark-muted mx-auto" />
                  <p className="text-sm font-semibold">Drag & drop your Reel video here</p>
                  <p className="text-xs text-dark-muted">or click to browse local files (MP4, MOV, up to 50MB)</p>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-dark-muted uppercase block mb-1">Reel Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. How Sockets Work under the hood"
                className="w-full px-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition placeholder:text-dark-muted"
              />
            </div>

            {/* Description & Transcript */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-dark-muted uppercase block mb-1">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Summarize the video contents..."
                  className="w-full px-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition placeholder:text-dark-muted resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark-muted uppercase block mb-1">Transcript (For AI Reasoning)</label>
                <textarea
                  name="transcript"
                  rows={4}
                  value={formData.transcript}
                  onChange={handleChange}
                  placeholder="Paste or write the dialogue/text transcript of the video..."
                  className="w-full px-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition placeholder:text-dark-muted resize-none"
                />
              </div>
            </div>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-dark-muted uppercase block mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition capitalize"
                >
                  <option value="coding">Coding / Programming</option>
                  <option value="memes">Programming Memes</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="career">Career Advice</option>
                  <option value="gadgets">Tech Gadgets</option>
                  <option value="gaming">Gaming</option>
                  <option value="news">Tech News</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark-muted uppercase block mb-1">Target Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Hashtags & Educational Flag */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <label className="text-xs font-semibold text-dark-muted uppercase block mb-1">Hashtags (Comma Separated)</label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="text"
                    name="hashtags"
                    value={formData.hashtags}
                    onChange={handleChange}
                    placeholder="webdev, coding, systemdesign"
                    className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-dark-border focus:border-primary-indigo rounded-xl text-white outline-none text-sm transition placeholder:text-dark-muted"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-dark-bg/40 border border-dark-border p-4 rounded-xl">
                <input
                  type="checkbox"
                  id="isEducational"
                  name="isEducational"
                  checked={formData.isEducational}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-indigo bg-dark-bg border-dark-border rounded focus:ring-primary-indigo"
                />
                <label htmlFor="isEducational" className="text-xs font-bold text-gray-200 select-none cursor-pointer">
                  Is this an Educational Tech Reel?
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-primary-indigo via-primary-purple to-primary-cyan text-white hover:brightness-110 shadow-lg shadow-primary-indigo/25 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Uploading to Cloudinary & Server...</span>
                </>
              ) : (
                <span>Publish Reel</span>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
