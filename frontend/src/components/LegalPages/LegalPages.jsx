import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { useSEO } from '../../utils/seo';
import './LegalPages.css';

export function PrivacyPolicyPage() {
  const navigate = useNavigate();

  useSEO({
    title: 'Privacy Policy',
    description: 'Read the privacy policy and data protection principles of codeforeverybody.',
  });

  return (
    <div className="lg-container">
      <div className="lg-wrapper">
        <button type="button" className="lg-back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        <header className="lg-header">
          <div className="lg-icon-badge">
            <Shield size={22} />
          </div>
          <h1>Privacy Policy</h1>
          <p>Last updated: August 12, 2026</p>
        </header>

        <article className="lg-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              At <strong>codeforeverybody</strong>, we respect your privacy. We collect minimal personal details required to provide our software engineering learning platform, including your name, email address, course progress, and technical preferences.
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Data</h2>
            <p>
              Your data is strictly used to deliver course content, issue certificates of completion, track interactive lab progress, and provide technical customer support. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2>3. Cookies and Analytics</h2>
            <p>
              We use functional cookies and privacy-focused analytics to improve site performance and remember your login session preferences. You can adjust your cookie settings at any time using our Cookie Consent banner.
            </p>
          </section>

          <section>
            <h2>4. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our support team at{' '}
              <a href="mailto:support@codeforeverybody.com">support@codeforeverybody.com</a>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

export function TermsPage() {
  const navigate = useNavigate();

  useSEO({
    title: 'Terms of Service',
    description: 'Terms and conditions governing the use of codeforeverybody courses and platform.',
  });

  return (
    <div className="lg-container">
      <div className="lg-wrapper">
        <button type="button" className="lg-back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        <header className="lg-header">
          <div className="lg-icon-badge">
            <FileText size={22} />
          </div>
          <h1>Terms of Service</h1>
          <p>Last updated: August 12, 2026</p>
        </header>

        <article className="lg-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the <strong>codeforeverybody</strong> platform, courses, or interactive labs, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2>2. User Accounts & Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. Course materials are for individual learning and may not be redistributed without permission.
            </p>
          </section>

          <section>
            <h2>3. Refund Policy</h2>
            <p>
              We offer a 30-day money-back guarantee on all full course enrollments if you are not completely satisfied with your learning experience.
            </p>
          </section>

          <section>
            <h2>4. Contact Us</h2>
            <p>
              For inquiries regarding these Terms, contact us at{' '}
              <a href="mailto:legal@codeforeverybody.com">legal@codeforeverybody.com</a>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
