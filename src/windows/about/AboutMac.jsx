import React from 'react';
import MacWindow from '../../components/common/MacWindow';
import { RiMacLine, RiCpuLine, RiAwardLine, RiGraduationCapLine } from '@remixicon/react';
import { useWindows } from '../../context/WindowContext';
import './aboutmac.scss';

const AboutMac = () => {
  const { openWindow } = useWindows();

  return (
    <MacWindow
      windowId="about"
      title="About This Mac"
      icon={RiMacLine}
      defaultWidth={350}
      defaultHeight={440}
      resizable={false}
    >
      <div className="about-mac-content">
        <div className="about-logo-wrapper">
          <div className="mac-silicon-chip">
            <span>DA</span>
          </div>
        </div>

        <h2 className="device-name">MacBook Pro</h2>
        <span className="device-sub">16-inch, Developer Edition</span>

        <div className="specs-table">
          <div className="spec-row">
            <span className="spec-label">Developer</span>
            <span className="spec-val">Dhruv Aparnathi</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Role</span>
            <span className="spec-val">Full-Stack Engineer</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Chip</span>
            <span className="spec-val">Dhruv M-Series Neural</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Memory</span>
            <span className="spec-val">16 GB Unified Focus</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Education</span>
            <span className="spec-val">Parul Univ CSE (7.4 CGPA)</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">OS</span>
            <span className="spec-val">macOS DhruvOS 15.2</span>
          </div>
        </div>

        <div className="about-actions">
          <button
            className="about-btn"
            onClick={() => openWindow('finder')}
          >
            System Report...
          </button>
          <button
            className="about-btn primary"
            onClick={() => openWindow('pdf')}
          >
            View Resume
          </button>
        </div>
      </div>
    </MacWindow>
  );
};

export default AboutMac;

