import React, { useState } from 'react';
import {
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
  RiMailFill,
  RiLinkedinBoxFill,
  RiDeleteBinFill
} from '@remixicon/react';
import { useWindows } from '../../context/WindowContext';
import './dock.scss';

const Dock = () => {
  const { windows, toggleWindow, openWindow } = useWindows();
  const [hoveredApp, setHoveredApp] = useState(null);

  const dockApps = [
    {
      id: 'finder',
      name: 'Finder',
      icon: RiFolder3Fill,
      className: 'finder-dock',
      action: () => toggleWindow('finder')
    },
    {
      id: 'safari',
      name: 'Safari',
      icon: RiCompass3Fill,
      className: 'safari-dock',
      action: () => toggleWindow('safari')
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: RiChat1Fill,
      className: 'messages-dock',
      action: () => toggleWindow('messages')
    },
    {
      id: 'github',
      name: 'GitHub Projects',
      icon: RiGithubFill,
      className: 'github-dock',
      action: () => toggleWindow('github')
    },
    {
      id: 'note',
      name: 'Notes',
      icon: RiFileTextFill,
      className: 'note-dock',
      action: () => toggleWindow('note')
    },
    {
      id: 'pdf',
      name: 'Resume (PDF)',
      icon: RiFilePdf2Fill,
      className: 'pdf-dock',
      action: () => toggleWindow('pdf')
    },
    {
      id: 'cli',
      name: 'Terminal',
      icon: RiTerminalFill,
      className: 'terminal-dock',
      action: () => toggleWindow('cli')
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: RiSpotifyFill,
      className: 'spotify-dock',
      action: () => toggleWindow('spotify')
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: RiCalculatorFill,
      className: 'calc-dock',
      action: () => toggleWindow('calculator')
    },
    {
      id: 'settings',
      name: 'System Settings',
      icon: RiSettings4Fill,
      className: 'settings-dock',
      action: () => toggleWindow('settings')
    }
  ];

  return (
    <div className="dock-wrapper">
      <footer className="mac-dock">
        {dockApps.map((app) => {
          const Icon = app.icon;
          const isOpen = windows[app.id]?.isOpen;

          return (
            <div
              key={app.id}
              className={`dock-item ${app.className}`}
              onClick={app.action}
              onMouseEnter={() => setHoveredApp(app.name)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {hoveredApp === app.name && (
                <div className="dock-tooltip">{app.name}</div>
              )}
              <div className="dock-icon">
                <Icon size={24} />
              </div>
              {isOpen && <span className="dock-dot" />}
            </div>
          );
        })}

        <div className="dock-divider" />

        {/* Mail Link */}
        <div
          className="dock-item mail-dock"
          onClick={() => window.open('mailto:dhruv.aparnathi.1@gmail.com', '_blank')}
          onMouseEnter={() => setHoveredApp('Mail Dhruv')}
          onMouseLeave={() => setHoveredApp(null)}
        >
          {hoveredApp === 'Mail Dhruv' && (
            <div className="dock-tooltip">Mail Dhruv</div>
          )}
          <div className="dock-icon">
            <RiMailFill size={24} />
          </div>
        </div>

        {/* LinkedIn Link */}
        <div
          className="dock-item linkedin-dock"
          onClick={() => window.open('https://www.linkedin.com/in/dhruv-aparnathi-506b58306/', '_blank')}
          onMouseEnter={() => setHoveredApp('LinkedIn')}
          onMouseLeave={() => setHoveredApp(null)}
        >
          {hoveredApp === 'LinkedIn' && (
            <div className="dock-tooltip">LinkedIn</div>
          )}
          <div className="dock-icon">
            <RiLinkedinBoxFill size={24} />
          </div>
        </div>

        {/* Trash */}
        <div
          className="dock-item trash-dock"
          onClick={() => openWindow('finder')}
          onMouseEnter={() => setHoveredApp('Bin')}
          onMouseLeave={() => setHoveredApp(null)}
        >
          {hoveredApp === 'Bin' && (
            <div className="dock-tooltip">Bin</div>
          )}
          <div className="dock-icon">
            <RiDeleteBinFill size={24} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dock;

