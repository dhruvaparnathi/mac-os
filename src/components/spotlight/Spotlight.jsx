import React, { useState, useEffect, useRef } from 'react';
import {
  RiSearchLine,
  RiFolder3Fill,
  RiCompass3Fill,
  RiChat1Fill,
  RiGithubFill,
  RiFileTextFill,
  RiFilePdf2Fill,
  RiTerminalFill,
  RiSpotifyFill,
  RiCalculatorFill,
  RiSettings4Fill,
  RiMacLine,
  RiArrowRightLine
} from '@remixicon/react';
import { useSettings } from '../../context/SettingsContext';
import { useWindows } from '../../context/WindowContext';
import './spotlight.scss';

const SEARCH_ITEMS = [
  { id: 'finder', name: 'Finder', category: 'Applications', desc: 'Browse folders, documents, and skills', icon: RiFolder3Fill, type: 'window' },
  { id: 'safari', name: 'Safari', category: 'Applications', desc: 'Browse web demos and live sites', icon: RiCompass3Fill, type: 'window' },
  { id: 'messages', name: 'Messages', category: 'Applications', desc: 'Chat directly with Dhruv or send email', icon: RiChat1Fill, type: 'window' },
  { id: 'github', name: 'Projects (GitHub)', category: 'Portfolio', desc: 'Snitch, Pax AI, Moodify, Battle Arena', icon: RiGithubFill, type: 'window' },
  { id: 'cli', name: 'Terminal (zsh)', category: 'Applications', desc: 'Interactive developer console', icon: RiTerminalFill, type: 'window' },
  { id: 'pdf', name: 'Resume (PDF)', category: 'Documents', desc: 'View and download full CV', icon: RiFilePdf2Fill, type: 'window' },
  { id: 'note', name: 'Notes (profile.config.ts)', category: 'Documents', desc: 'Tech stack, experience, and hackathons', icon: RiFileTextFill, type: 'window' },
  { id: 'spotify', name: 'Spotify Music', category: 'Media', desc: 'Listen to curated coding playlists', icon: RiSpotifyFill, type: 'window' },
  { id: 'calculator', name: 'Calculator', category: 'Utilities', desc: 'Functional macOS dark calculator', icon: RiCalculatorFill, type: 'window' },
  { id: 'settings', name: 'System Settings', category: 'Preferences', desc: 'Wallpapers, themes, and sound', icon: RiSettings4Fill, type: 'window' },
  { id: 'about', name: 'About This Mac', category: 'System', desc: 'Specs, bio, and education info', icon: RiMacLine, type: 'window' },
  { id: 'snitch-link', name: 'Snitch E-Commerce', category: 'Live Project', desc: 'MERN stack neo-brutalist commerce store', icon: RiCompass3Fill, type: 'link', url: 'https://snitch-cart.vercel.app/' },
  { id: 'paxai-link', name: 'Pax AI Q&A', category: 'Live Project', desc: 'Gemini & LangChain AI search engine', icon: RiCompass3Fill, type: 'link', url: 'https://paxai.onrender.com' },
  { id: 'moodify-link', name: 'Moodify Emotion Recommender', category: 'Live Project', desc: 'Face-api facial emotion detector & Spotify', icon: RiCompass3Fill, type: 'link', url: 'https://app-moodify.onrender.com/' },
  { id: 'gh-link', name: 'GitHub Profile', category: 'Links', desc: 'github.com/dhruvaparnathi', icon: RiGithubFill, type: 'link', url: 'https://github.com/dhruvaparnathi' },
  { id: 'li-link', name: 'LinkedIn Profile', category: 'Links', desc: 'Connect on LinkedIn', icon: RiArrowRightLine, type: 'link', url: 'https://www.linkedin.com/in/dhruv-aparnathi-506b58306/' }
];

const Spotlight = () => {
  const { spotlightOpen, setSpotlightOpen } = useSettings();
  const { openWindow } = useWindows();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (spotlightOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [spotlightOpen]);

  const filtered = SEARCH_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    setSpotlightOpen(false);
  };

  const handleSelect = (item) => {
    if (!item) return;
    if (item.type === 'window') {
      openWindow(item.id);
    } else if (item.type === 'link') {
      window.open(item.url, '_blank');
    }
    handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  if (!spotlightOpen) return null;

  return (
    <div
      className="spotlight-overlay"
      onClick={handleClose}
    >
      <div
        className="spotlight-dialog"
        ref={spotlightRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="spotlight-input-row">
          <RiSearchLine size={22} className="spotlight-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search (apps, projects, skills, resume)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="spotlight-esc">esc</kbd>
        </div>

        {filtered.length > 0 && (
          <div className="spotlight-results">
            {filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`spotlight-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="item-icon-wrapper">
                    <Icon size={18} />
                  </div>
                  <div className="item-info">
                    <span className="item-title">{item.name}</span>
                    <span className="item-desc">{item.desc}</span>
                  </div>
                  <span className="item-category">{item.category}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
