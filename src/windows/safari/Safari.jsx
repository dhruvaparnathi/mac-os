import React, { useState } from 'react';
import MacWindow from '../../components/common/MacWindow';
import {
  RiCompass3Fill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiRestartLine,
  RiLockFill,
  RiExternalLinkLine,
  RiShareLine
} from '@remixicon/react';
import './safari.scss';

const SAFARI_TABS = [
  {
    id: 'snitch',
    title: 'Snitch — Storefront',
    url: 'https://snitch-cart.vercel.app/',
    description: 'Neo-brutalist e-commerce storefront with Google OAuth 2.0 & Razorpay',
    tags: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://media.istockphoto.com/id/1521866387/photo/3d-render-of-shopping-sale-promotion-banner-online-full-shopping-cart-on-podium-with-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=UG4UTNXQ0Onl07hl-c6zDiRW7Fsl8ojtYz1qdlvXppM='
  },
  {
    id: 'paxai',
    title: 'Pax AI — Search Engine',
    url: 'https://paxai.onrender.com',
    description: 'Real-time AI-powered search and Q&A engine cutting through web noise',
    tags: ['React', 'Gemini API', 'LangChain', 'Socket.io'],
    image: 'https://plus.unsplash.com/premium_photo-1725985758251-b49c6b581d17?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'battlearena',
    title: 'AI Battle Arena',
    url: 'https://ai-battlearena.netlify.app/',
    description: 'Multi-LLM benchmark arena powered by LangGraph referee evaluation',
    tags: ['React', 'TypeScript', 'LangGraph', 'Gemini API'],
    image: 'https://images.unsplash.com/photo-1779493015876-bf5fe2477b34?q=80&w=687&auto=format&fit=crop'
  },
  {
    id: 'moodify',
    title: 'Moodify AI Music',
    url: 'https://app-moodify.onrender.com/',
    description: 'Facial emotion music recommender with TensorFlow & WebRTC',
    tags: ['JavaScript', 'TensorFlow.js', 'Spotify API', 'WebRTC'],
    image: 'https://images.unsplash.com/photo-1741719409289-9e04bfda9887?q=80&w=735&auto=format&fit=crop'
  }
];

const Safari = () => {
  const [activeTabId, setActiveTabId] = useState('snitch');
  const currentTab = SAFARI_TABS.find((t) => t.id === activeTabId) || SAFARI_TABS[0];

  return (
    <MacWindow
      windowId="safari"
      title={`Safari — ${currentTab.title}`}
      icon={RiCompass3Fill}
      defaultWidth={860}
      defaultHeight={540}
    >
      <div className="safari-container">
        {/* Safari Top Bar */}
        <div className="safari-toolbar">
          <div className="nav-controls">
            <button className="tool-btn" disabled>
              <RiArrowLeftSLine size={18} />
            </button>
            <button className="tool-btn" disabled>
              <RiArrowRightSLine size={18} />
            </button>
            <button className="tool-btn" onClick={() => {}}>
              <RiRestartLine size={16} />
            </button>
          </div>

          {/* URL Bar */}
          <div className="safari-url-bar">
            <RiLockFill size={13} className="lock-icon" />
            <span className="url-text">{currentTab.url}</span>
          </div>

          <div className="safari-actions">
            <a
              href={currentTab.url}
              target="_blank"
              rel="noreferrer"
              className="open-ext-btn"
              title="Open in new browser tab"
            >
              <RiExternalLinkLine size={16} />
            </a>
          </div>
        </div>

        {/* Tab Row */}
        <div className="safari-tabs">
          {SAFARI_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                className={`safari-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <span className="tab-title">{tab.title}</span>
              </div>
            );
          })}
        </div>

        {/* Web Viewport Content */}
        <div className="safari-viewport">
          <div className="safari-preview-card">
            <div className="preview-hero">
              <img src={currentTab.image} alt={currentTab.title} />
              <div className="hero-overlay">
                <h2>{currentTab.title}</h2>
                <p>{currentTab.description}</p>
                <div className="tags-row">
                  {currentTab.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="hero-actions">
                  <a
                    href={currentTab.url}
                    target="_blank"
                    rel="noreferrer"
                    className="launch-btn"
                  >
                    Launch Live Web App <RiExternalLinkLine size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className="preview-frame-hint">
              <p>
                ℹ️ To provide high security and full responsiveness, interactive apps can be launched full-screen via the link above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MacWindow>
  );
};

export default Safari;

