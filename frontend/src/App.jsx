import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import OverviewPage from './components/OverviewPage/OverviewPage';
import ResumePage from './components/ResumePage/ResumePage';
import ApplicationsPage from './components/ApplicationsPage/ApplicationsPage';
import CoursesPage from './components/CoursesPage/CoursesPage';
import CoursePlayer from './components/CoursePlayer/CoursePlayer';
import ProfilePage from './components/ProfilePage/ProfilePage';
import JobsPage from './components/JobsPage/JobsPage';
import HeroCardsShowcase from './components/TestHeroCards/HeroCardsShowcase';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import { PrivacyPolicyPage, TermsPage } from './components/LegalPages/LegalPages';
import CookieBanner from './components/CookieBanner/CookieBanner';
import StickyMobileCTA from './components/StickyMobileCTA/StickyMobileCTA';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page at Root Route */}
        <Route path="/" element={<HeroCardsShowcase />} />

        {/* Dashboard Routes */}
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/player" element={<CoursePlayer />} />
        <Route path="/player/:courseId" element={<CoursePlayer />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:userId" element={<JobsPage />} />
        <Route path="/jobs/detail/:jobId" element={<JobsPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Auth & Utility Pages */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/showcase" element={<HeroCardsShowcase />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieBanner />
      <StickyMobileCTA />
    </BrowserRouter>
  );
}
