import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import HeroCardsShowcase from './components/TestHeroCards/HeroCardsShowcase';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import { PrivacyPolicyPage, TermsPage } from './components/LegalPages/LegalPages';
import CookieBanner from './components/CookieBanner/CookieBanner';
import StickyMobileCTA from './components/StickyMobileCTA/StickyMobileCTA';
import CoursePlayer from './components/CoursePlayer/CoursePlayer';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroCardsShowcase />} />
        <Route path="/player" element={<CoursePlayer />} />
        <Route path="/player/:courseId" element={<CoursePlayer />} />
        <Route path="/auth" element={<AuthPage />} />
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
