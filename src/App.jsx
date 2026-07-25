import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import AuthPage from './components/AuthPage/AuthPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import LearningPage from './components/LearningPage/LearningPage';
import ProjectsPage from './components/ProjectsPage/ProjectsPage';
import OverviewPage from './components/OverviewPage/OverviewPage';
import ResumeBuilderPage from './components/ResumeBuilderPage/ResumeBuilderPage';
import MockInterviewPage from './components/MockInterviewPage/MockInterviewPage';
import CareerRoadmapPage from './components/CareerRoadmapPage/CareerRoadmapPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resume" element={<ResumeBuilderPage />} />
        <Route path="/mock" element={<MockInterviewPage />} />
        <Route path="/roadmap" element={<CareerRoadmapPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
