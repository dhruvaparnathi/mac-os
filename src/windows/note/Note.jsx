import React, { useState, useEffect } from 'react';
import MacWindow from '../../components/common/MacWindow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  RiFileTextFill,
  RiFileCopyLine,
  RiCheckLine,
  RiCodeSSlashLine,
  RiCpuLine,
  RiTimeLine,
  RiFolderFill
} from '@remixicon/react';
import { soundManager } from '../../utils/sound';
import './note.scss';

const PROJECTS_ARCHITECTURE_TS = `/**
 * @file: projects.architecture.ts
 * @summary: Production architecture blueprints for featured MERN & AI systems.
 */

export const PROJECTS_BLUEPRINT = [
  {
    title: "Snitch — Architectural Commerce & Creator Marketplace",
    stack: ["React 19", "Tailwind CSS v4", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Razorpay", "ImageKit", "Passport.js", "GSAP", "Lenis"],
    highlights: [
      "Dynamic multi-attribute variant matrix & real-time inventory validation",
      "Cryptographic Razorpay checkout with HMAC-SHA256 signature verification",
      "Google OAuth 2.0 dynamic origin resolution & RBAC seller guards",
      "Cross-domain HttpOnly cookie authentication & ImageKit CDN media pipeline",
      "Kinetic GSAP stagger animations paired with Lenis inertia scrolling"
    ],
    links: {
      github: "https://github.com/dhruvaparnathi/Snitch",
      live: "https://snitch-cart.vercel.app/"
    }
  },
  {
    title: "Pax AI — Real-Time AI Search & Q&A Engine",
    stack: ["React 19", "Tailwind CSS v4", "Node.js", "Express.js", "MongoDB", "Socket.io", "LangChain", "Gemini API", "Tavily API", "ElevenLabs"],
    highlights: [
      "Retrieval-Augmented Generation (RAG) using Tavily Search API to synthesize live web data into cited answers",
      "LangChain integration to seamlessly switch between Google Gemini and Mistral AI models",
      "Low-latency token streaming and bidirectional communication via WebSockets (Socket.io)",
      "High-fidelity text-to-speech audio synthesis via ElevenLabs API"
    ],
    links: {
      github: "https://github.com/dhruvaparnathi/Pax-AI",
      live: "https://paxai.onrender.com/"
    }
  },
  {
    title: "Moodify — AI-Powered Facial Emotion Music Recommender",
    stack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Redis", "GSAP", "@mediapipe/tasks-vision", "Brevo SMTP", "ImageKit"],
    highlights: [
      "Client-side webcam facial emotion detection (6 primary moods) via @mediapipe/tasks-vision & ARKit blendshapes",
      "Custom VibePlayer audio engine with GSAP vinyl turntable rotation and dynamic sliders",
      "Secured endpoints with JWT sessions in HttpOnly cookies and email OTP verification via Brevo SMTP",
      "Redis caching layer and bulk audio upload with automated ID3 metadata parsing"
    ],
    links: {
      github: "https://github.com/dhruvaparnathi/Moodify",
      live: "https://app-moodify.onrender.com/"
    }
  },
  {
    title: "Mac-OS Portfolio Simulation",
    stack: ["React 19", "SCSS", "react-rnd", "react-console-emulator", "TailwindCSS"],
    highlights: [
      "Dynamic Z-index stacking engine, traffic lights, and window minimize/maximize",
      "Simulated desktop filesystem with interactive Finder and clickable shortcuts",
      "Spotlight Search (Cmd+K) with keyboard arrow navigation",
      "Synthesized Web Audio API sound effects and global volume synchronization"
    ],
    links: {
      github: "https://github.com/dhruvaparnathi/mac-os",
      live: "https://macbook-os.netlify.app/"
    }
  }
];`;

const EXPERIENCE_LOG_TXT = `=============================================================
DHRUV APARNATHI — PROFESSIONAL EXPERIENCE & LEARNING TIMELINE
=============================================================

[1] SELF-DIRECTED MERN STACK DEVELOPMENT
    Period: 2024 - Present
    Role  : Full-Stack Engineer / Builder
    - Built comprehensive frontend and full-stack applications through hands-on project builds.
    - Engineered modular React 19 component architectures, custom hooks, and state trees with Redux Toolkit.
    - Designed robust RESTful APIs in Node.js/Express with JWT authentication and RBAC guards.
    - Architected MongoDB schemas with Mongoose, indexing, and Redis caching.
    - Deployed 10+ web applications across Vercel, Render, and Netlify.

[2] SHERYIANS CODING SCHOOL — COHORT 2.0 & BACKEND
    Period: Ongoing
    Focus : Advanced Full-Stack & System Design
    - Advanced backend engineering: middleware handling, session management, and microservices.
    - Cloud file uploads with ImageKit CDN pipelines and Brevo SMTP email automation.
    - Database transactions, aggregations, and webhook integrations (Razorpay HMAC-SHA256).

[3] HOW_I_LEARNED | REACT JOURNEY
    Period: Ongoing
    Focus : Deep UI/UX & Experimental Mechanics
    - Built and iterated on 10+ focused web projects exploring animation libraries (GSAP, Lenis).
    - Real-time client-side vision AI models (@mediapipe/tasks-vision, TensorFlow.js).
    - Modern CSS architectures (Tailwind CSS v4, SCSS modular styling).

=============================================================
EDUCATION & CERTIFICATIONS
=============================================================
• Parul University: B.Tech in Computer Science & Engineering (Expected 2027, CGPA: 7.4)
• Coursework: DSA, OOP, DBMS, Operating Systems, Web Development
• Sololearn Certifications:
  - Prompt Engineering (CC-6FSZUKYO)
  - Frontend Development (CC-I6PBRXOU)
  - Web Development (CC-VRRK9RRO)
• Hackathon Vadodara 6.0: Top 500 Global Participation`;

const SKILLS_JSON = `{
  "developer": "Dhruv Aparnathi",
  "location": "Porbandar, Gujarat, India",
  "email": "dhruv.aparnathi.1@gmail.com",
  "github": "https://github.com/dhruvaparnathi",
  "codolio": "https://codolio.com/profile/dhruvaparnathi",
  "summary": "Self-driven MERN Stack Developer focused on building responsive, high-performance web applications with ReactJS and modern backend technologies.",
  "technical_skills": {
    "frontend": [
      "React 19",
      "ReactJS",
      "Redux Toolkit",
      "JavaScript (ES6+)",
      "TypeScript",
      "Tailwind CSS v4",
      "HTML5",
      "CSS3",
      "SCSS",
      "GSAP",
      "Lenis"
    ],
    "backend": [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Socket.io",
      "JWT & OAuth 2.0",
      "Passport.js"
    ],
    "ai_and_integrations": [
      "LangChain",
      "RAG (Retrieval-Augmented Generation)",
      "Google Gemini API",
      "Mistral AI",
      "Tavily Search API",
      "ElevenLabs (TTS)",
      "@mediapipe/tasks-vision",
      "TensorFlow.js"
    ],
    "payments_and_cloud": [
      "Razorpay (HMAC-SHA256)",
      "ImageKit CDN",
      "Brevo SMTP API",
      "Git",
      "GitHub",
      "Postman",
      "Vite",
      "Vercel",
      "Netlify"
    ]
  },
  "education": {
    "degree": "B.Tech in Computer Science & Engineering",
    "institution": "Parul University",
    "graduation": "Expected 2027",
    "cgpa": "7.4 / 10.0"
  },
  "certifications": [
    "Prompt Engineering — Sololearn (CC-6FSZUKYO)",
    "Frontend Development — Sololearn (CC-I6PBRXOU)",
    "Web Development — Sololearn (CC-VRRK9RRO)"
  ]
}`;

const Note = () => {
  const [activeTab, setActiveTab] = useState('profile.config.ts');
  const [profileCode, setProfileCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/note.txt')
      .then((res) => res.text())
      .then((text) => setProfileCode(text))
      .catch(() => setProfileCode('// Profile loaded'));
  }, []);

  const tabContents = {
    'profile.config.ts': { code: profileCode, lang: 'typescript', icon: RiCodeSSlashLine },
    'projects.architecture.ts': { code: PROJECTS_ARCHITECTURE_TS, lang: 'typescript', icon: RiCpuLine },
    'experience.log': { code: EXPERIENCE_LOG_TXT, lang: 'markdown', icon: RiTimeLine },
    'skills.json': { code: SKILLS_JSON, lang: 'json', icon: RiFolderFill }
  };

  const currentTabInfo = tabContents[activeTab] || tabContents['profile.config.ts'];

  const handleCopy = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(currentTabInfo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MacWindow
      windowId="note"
      title={`Notes — ${activeTab}`}
      icon={RiFileTextFill}
      defaultWidth={760}
      defaultHeight={500}
    >
      <div className="note-window-wrapper">
        {/* Tab Header Bar */}
        <div className="note-tab-bar">
          <div className="tabs-list">
            {Object.keys(tabContents).map((tabKey) => {
              const TabIcon = tabContents[tabKey].icon;
              return (
                <button
                  key={tabKey}
                  className={`note-tab-btn ${activeTab === tabKey ? 'active' : ''}`}
                  onClick={() => setActiveTab(tabKey)}
                >
                  <TabIcon size={13} className="tab-icon" />
                  <span>{tabKey}</span>
                </button>
              );
            })}
          </div>

          <button className="copy-btn" onClick={handleCopy} title="Copy file contents">
            {copied ? (
              <>
                <RiCheckLine size={14} color="#34c759" /> Copied!
              </>
            ) : (
              <>
                <RiFileCopyLine size={14} /> Copy
              </>
            )}
          </button>
        </div>

        {/* Code Viewport with Syntax Highlighting */}
        <div className="note-code-viewport">
          <SyntaxHighlighter
            language={currentTabInfo.lang}
            style={atelierDuneDark}
            customStyle={{
              background: 'transparent',
              fontSize: '12.5px',
              padding: '18px 22px',
              margin: 0,
              fontFamily: "'Fira Code', 'Cascadia Code', Menlo, Monaco, Consolas, monospace",
              lineHeight: 1.6
            }}
          >
            {currentTabInfo.code}
          </SyntaxHighlighter>
        </div>

        {/* Note Footer Bar */}
        <div className="note-footer-bar">
          <span className="file-info">{activeTab} • UTF-8</span>
          <span className="synced-badge">● Synced with Resume & Projects</span>
        </div>
      </div>
    </MacWindow>
  );
};

export default Note;
