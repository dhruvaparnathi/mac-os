import React, { useState, useRef, useEffect } from 'react';
import MacWindow from '../../components/common/MacWindow';
import {
  RiFilePdf2Fill,
  RiDownload2Line,
  RiExternalLinkLine,
  RiPrinterLine,
  RiFileTextLine,
  RiInformationLine,
  RiShieldCheckLine
} from '@remixicon/react';
import { soundManager } from '../../utils/sound';
import './pdf.scss';

const PDF = () => {
  const resumeUrl = '/dhruv_aparnathi_resume.pdf';
  const [viewMode, setViewMode] = useState('digital'); // Digital view is clean, formatted, and never renders a black box!
  const [downloading, setDownloading] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);
  const createdUrlsRef = useRef([]);

  // Cleanup any created blob URLs when unmounting
  useEffect(() => {
    const urls = createdUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          window.URL.revokeObjectURL(url);
        } catch {
          // ignore cleanup errors
        }
      });
    };
  }, []);

  // Bulletproof programmatic blob download (never premature revoke, which causes Chrome 'No file' error)
  const handleDownload = async () => {
    try {
      setDownloading(true);
      soundManager.playPop();

      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Fetch failed with status ' + response.status);

      const blob = await response.blob();
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      createdUrlsRef.current.push(blobUrl);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = 'Dhruv_Aparnathi_Resume.pdf';
      document.body.appendChild(a);
      a.click();

      // Keep blob URL alive for at least 60 seconds so Chrome's download engine has full time to write to disk
      setTimeout(() => {
        try {
          if (document.body.contains(a)) {
            document.body.removeChild(a);
          }
        } catch {
          // ignore
        }
      }, 500);

      setTimeout(() => {
        try {
          window.URL.revokeObjectURL(blobUrl);
        } catch {
          // ignore
        }
      }, 60000);

      setDownloading(false);
      setDownloadNotice(true);
      setTimeout(() => setDownloadNotice(false), 6000);
    } catch (err) {
      console.warn('Blob download fallback to direct window open:', err);
      setDownloading(false);
      // Fallback: Open in new browser tab
      window.open(resumeUrl, '_blank');
    }
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <MacWindow
      windowId="pdf"
      title="Dhruv_Aparnathi_Resume.pdf"
      icon={RiFilePdf2Fill}
      defaultWidth={820}
      defaultHeight={600}
    >
      <div className="pdf-window-wrapper">
        {/* PDF Top Bar */}
        <div className="pdf-toolbar">
          <div className="pdf-meta">
            <span className="pdf-name">Dhruv_Aparnathi_Resume.pdf</span>
            <span className="pdf-size">235 KB • MERN Stack Engineer</span>
          </div>

          <div className="view-mode-tabs">
            <button
              className={`view-mode-btn ${viewMode === 'digital' ? 'active' : ''}`}
              onClick={() => setViewMode('digital')}
              title="Interactive Digital Resume (Always Visible & Printable)"
            >
              <RiFileTextLine size={14} />
              <span>Digital View</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'pdf' ? 'active' : ''}`}
              onClick={() => setViewMode('pdf')}
              title="Raw PDF File Viewer"
            >
              <RiFilePdf2Fill size={14} />
              <span>PDF Viewer</span>
            </button>
          </div>

          <div className="pdf-actions">
            {/* Primary Blob Download Button */}
            <button
              onClick={handleDownload}
              className="pdf-btn primary"
              disabled={downloading}
              title="Download PDF to computer"
            >
              <RiDownload2Line size={14} />
              <span>{downloading ? 'Preparing...' : 'Download PDF'}</span>
            </button>

            {/* Direct Open in Tab */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="pdf-btn secondary"
              title="Open raw PDF in new browser tab"
            >
              <RiExternalLinkLine size={14} />
              <span>Open in Tab</span>
            </a>

            {/* Print / Save as PDF */}
            <button
              className="pdf-btn print-btn"
              onClick={handlePrint}
              title="Print Resume or Save directly as PDF"
            >
              <RiPrinterLine size={14} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Optional Download Feedback Banner */}
        {downloadNotice && (
          <div className="download-notice-banner">
            <RiInformationLine size={15} />
            <span>
              Download started! If your browser shows <em>"Couldn't download - No file"</em>, click <strong>Open in Tab</strong> or <strong>Print / Save PDF</strong>.
            </span>
            <button className="close-notice-btn" onClick={() => setDownloadNotice(false)}>×</button>
          </div>
        )}

        {/* Main Content Area */}
        {viewMode === 'digital' ? (
          /* Digital Interactive Resume View (100% Reliable in all browsers) */
          <div className="digital-resume-container">
            <div className="digital-resume-page">
              {/* Header */}
              <div className="resume-header">
                <h1>Dhruv Aparnathi</h1>
                <p className="resume-contact">
                  Porbandar, Gujarat, India • 8200733252 •{' '}
                  <a href="mailto:dhruv.aparnathi.1@gmail.com">
                    dhruv.aparnathi.1@gmail.com
                  </a>
                </p>
                <div className="resume-links">
                  <a
                    href="https://github.com/dhruvaparnathi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/dhruvaparnathi
                  </a>
                  <span>•</span>
                  <a
                    href="https://codolio.com/profile/dhruvaparnathi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    codolio.com/profile/dhruvaparnathi
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.linkedin.com/in/dhruv-aparnathi-506b58306"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="resume-section">
                <h2>Professional Summary</h2>
                <p className="summary-text">
                  Self-driven MERN Stack Developer focused on building responsive
                  and interactive web applications using ReactJS and modern backend
                  technologies. Passionate about frontend architecture, UI/UX design,
                  API development, and solving real-world problems through
                  project-based learning.
                </p>
              </div>

              {/* Skills */}
              <div className="resume-section">
                <h2>Technical Skills</h2>
                <div className="skills-grid">
                  <div className="skill-category">
                    <span className="skill-cat-title">Frontend:</span>
                    <span>
                      ReactJS (React 19), Redux Toolkit, JavaScript (ES6+),
                      TypeScript, Tailwind CSS v4, HTML5, CSS3, SCSS, GSAP, Lenis
                    </span>
                  </div>
                  <div className="skill-category">
                    <span className="skill-cat-title">Backend:</span>
                    <span>
                      Node.js, Express.js, REST APIs, MongoDB, Mongoose, Redis,
                      Socket.io, JWT &amp; OAuth 2.0, Passport.js
                    </span>
                  </div>
                  <div className="skill-category">
                    <span className="skill-cat-title">AI &amp; Tools:</span>
                    <span>
                      LangChain, RAG Pipelines, Google Gemini API, Mistral AI,
                      Tavily API, ElevenLabs (TTS), @mediapipe/tasks-vision,
                      Razorpay (HMAC-SHA256), ImageKit CDN, Git, Postman, Vite
                    </span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="resume-section">
                <h2>Key Projects</h2>

                <div className="resume-item">
                  <div className="item-heading">
                    <h3>Snitch — Architectural Commerce &amp; Creator Marketplace</h3>
                    <span className="item-date">2026</span>
                  </div>
                  <p className="item-tech">
                    React 19, Tailwind CSS v4, Redux Toolkit, Node.js, Express.js,
                    MongoDB, Razorpay, ImageKit, Passport.js, GSAP, Lenis
                  </p>
                  <ul className="item-bullets">
                    <li>
                      Architected full-stack neo-brutalist e-commerce platform and
                      merchant portal with kinetic GSAP stagger animations and
                      Lenis inertia scrolling.
                    </li>
                    <li>
                      Implemented dynamic multi-attribute variant matrix,
                      real-time inventory validation, and cryptographic Razorpay
                      checkout with HMAC-SHA256 signature verification.
                    </li>
                    <li>
                      Secured endpoints with Google OAuth 2.0 dynamic origin
                      resolution, RBAC seller guards, and cross-domain HttpOnly
                      cookie authentication; buffered media uploads to ImageKit
                      CDN.
                    </li>
                  </ul>
                </div>

                <div className="resume-item">
                  <div className="item-heading">
                    <h3>Moodify — AI-Powered Facial Emotion Music Recommender</h3>
                    <span className="item-date">2026</span>
                  </div>
                  <p className="item-tech">
                    React, Vite, Node.js, Express.js, MongoDB, Redis, GSAP,
                    @mediapipe/tasks-vision, Brevo SMTP API, ImageKit
                  </p>
                  <ul className="item-bullets">
                    <li>
                      Built real-time webcam facial emotion scanning resolving to 6
                      primary moods using @mediapipe/tasks-vision and ARKit
                      blendshape standards.
                    </li>
                    <li>
                      Designed custom animated audio player (VibePlayer) with GSAP
                      vinyl turntable rotation and customized track queue.
                    </li>
                    <li>
                      Secured endpoints with JWT sessions in HttpOnly cookies,
                      email OTP verification via Brevo SMTP API, and Redis caching
                      layer.
                    </li>
                  </ul>
                </div>

                <div className="resume-item">
                  <div className="item-heading">
                    <h3>Pax AI — Real-Time AI Search &amp; Q&amp;A Engine</h3>
                    <span className="item-date">2026</span>
                  </div>
                  <p className="item-tech">
                    React 19, Tailwind CSS v4, Node.js, Express.js, MongoDB,
                    Socket.io, LangChain, Tavily API, ElevenLabs, ImageKit
                  </p>
                  <ul className="item-bullets">
                    <li>
                      Orchestrated context-aware AI search utilizing LangChain to
                      integrate and switch between Google Gemini and Mistral AI
                      models.
                    </li>
                    <li>
                      Implemented Retrieval-Augmented Generation (RAG) using Tavily
                      Search API to synthesize live web data into cited answers.
                    </li>
                    <li>
                      Established low-latency token streaming via Socket.io and
                      ElevenLabs high-fidelity text-to-speech audio synthesis.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience */}
              <div className="resume-section">
                <h2>Experience</h2>
                <div className="resume-item">
                  <div className="item-heading">
                    <h3>Self-Directed MERN Development</h3>
                    <span className="item-date">2024 — Present</span>
                  </div>
                  <ul className="item-bullets">
                    <li>
                      Built frontend and full-stack applications through practical
                      project-based learning and continuous experimentation.
                    </li>
                    <li>
                      Developed reusable React components, REST APIs, and responsive
                      interfaces using modern JavaScript technologies.
                    </li>
                    <li>
                      Worked with MongoDB and Mongoose for schema design, CRUD
                      operations, and backend integration.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="resume-section">
                <h2>Education &amp; Certifications</h2>
                <div className="resume-item">
                  <div className="item-heading">
                    <h3>
                      B.Tech in Computer Science &amp; Engineering — Parul
                      University
                    </h3>
                    <span className="item-date">Expected 2027</span>
                  </div>
                  <p className="item-tech">
                    CGPA: 7.4 • Coursework: DSA, OOP, DBMS, Operating Systems, Web
                    Development
                  </p>
                  <p className="cert-list">
                    <RiShieldCheckLine size={13} color="#34c759" />{' '}
                    <strong>Certifications:</strong> Prompt Engineering
                    (Sololearn), Frontend Development (Sololearn), Web Development
                    (Sololearn)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PDF Viewer with Helper Banner & Fallback */
          <div className="pdf-view-frame">
            <div className="pdf-info-banner">
              <span>
                💡 Embedded PDF preview may be blocked by browser security settings.
              </span>
              <div className="banner-actions">
                <button
                  onClick={() => setViewMode('digital')}
                  className="banner-link-btn"
                >
                  Switch to Digital View
                </button>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="banner-link-btn primary"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
            <iframe
              src={`${resumeUrl}#toolbar=1&navpanes=0`}
              width="100%"
              height="100%"
              title="Dhruv Aparnathi Resume"
              className="pdf-iframe"
            />
          </div>
        )}
      </div>
    </MacWindow>
  );
};

export default PDF;
