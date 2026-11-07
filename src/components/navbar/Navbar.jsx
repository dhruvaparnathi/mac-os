import React, { useState, useRef, useEffect } from 'react';
import {
  RiWifiLine,
  RiSearchLine,
  RiEqualizerLine,
  RiBattery2ChargeFill
} from '@remixicon/react';
import { useWindows } from '../../context/WindowContext';
import { useSettings } from '../../context/SettingsContext';
import AppleMenu from './AppleMenu';
import ControlCenter from './ControlCenter';
import DateTime from './DateTime';
import './navbar.scss';

const Navbar = () => {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    toggleMaximizeWindow,
    minimizeWindow,
    closeAllWindows
  } = useWindows();

  const {
    spotlightOpen,
    setSpotlightOpen,
    controlCenterOpen,
    setControlCenterOpen
  } = useSettings();

  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Derive current active app title
  const activeAppTitle = activeWindowId && windows[activeWindowId]?.isOpen
    ? windows[activeWindowId].id.toUpperCase()
    : 'Dhruv Aparnathi';

  // Close menus on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <nav className="mac-navbar" ref={navRef}>
      {/* Left Menu Items */}
      <div className="nav-left">
        <div
          className={`apple-btn ${appleMenuOpen ? 'active' : ''}`}
          onClick={() => {
            setAppleMenuOpen(!appleMenuOpen);
            setActiveDropdown(null);
          }}
        >
          <img src="/navbar-icons/apple.svg" alt="Apple" className="apple-icon-img" />
        </div>

        <AppleMenu isOpen={appleMenuOpen} onClose={() => setAppleMenuOpen(false)} />

        <div className="nav-app-name">
          <span>{activeAppTitle}</span>
        </div>

        {/* File Menu */}
        <div className="nav-menu-wrapper">
          <button
            className={`nav-menu-btn ${activeDropdown === 'file' ? 'active' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'file' ? null : 'file')}
          >
            File
          </button>
          {activeDropdown === 'file' && (
            <div className="nav-submenu">
              <button
                onClick={() => {
                  openWindow('finder');
                  setActiveDropdown(null);
                }}
              >
                New Finder Window
              </button>
              <button
                onClick={() => {
                  openWindow('cli');
                  setActiveDropdown(null);
                }}
              >
                New Terminal Window
              </button>
              <div className="submenu-divider" />
              <button
                onClick={() => {
                  if (activeWindowId) closeWindow(activeWindowId);
                  setActiveDropdown(null);
                }}
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  closeAllWindows();
                  setActiveDropdown(null);
                }}
              >
                Close All
              </button>
            </div>
          )}
        </div>

        {/* Window Menu */}
        <div className="nav-menu-wrapper">
          <button
            className={`nav-menu-btn ${activeDropdown === 'window' ? 'active' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'window' ? null : 'window')}
          >
            Window
          </button>
          {activeDropdown === 'window' && (
            <div className="nav-submenu">
              <button
                onClick={() => {
                  if (activeWindowId) minimizeWindow(activeWindowId);
                  setActiveDropdown(null);
                }}
              >
                Minimize
              </button>
              <button
                onClick={() => {
                  if (activeWindowId) toggleMaximizeWindow(activeWindowId);
                  setActiveDropdown(null);
                }}
              >
                Zoom / Toggle Fullscreen
              </button>
              <div className="submenu-divider" />
              <button
                onClick={() => {
                  openWindow('github');
                  setActiveDropdown(null);
                }}
              >
                Bring Projects to Front
              </button>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="nav-menu-wrapper">
          <button
            className={`nav-menu-btn ${activeDropdown === 'help' ? 'active' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'help' ? null : 'help')}
          >
            Help
          </button>
          {activeDropdown === 'help' && (
            <div className="nav-submenu">
              <button
                onClick={() => {
                  openWindow('about');
                  setActiveDropdown(null);
                }}
              >
                About Developer
              </button>
              <button
                onClick={() => {
                  setSpotlightOpen(true);
                  setActiveDropdown(null);
                }}
              >
                Spotlight Search (⌘K)
              </button>
              <div className="submenu-divider" />
              <a
                href="https://github.com/dhruvaparnathi"
                target="_blank"
                rel="noreferrer"
                className="submenu-link"
                onClick={() => setActiveDropdown(null)}
              >
                GitHub Profile
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right Tray Items */}
      <div className="nav-right">
        {/* Battery Indicator */}
        <div className="tray-item battery" title="Battery: 100% (Plugged In)">
          <span className="battery-pct">100%</span>
          <RiBattery2ChargeFill size={17} />
        </div>

        {/* Wi-Fi Icon */}
        <div className="tray-item" title="Wi-Fi: Connected">
          <RiWifiLine size={16} />
        </div>

        {/* Spotlight Icon */}
        <div
          className={`tray-item search-icon-btn ${spotlightOpen ? 'active' : ''}`}
          title="Spotlight Search (Cmd+K)"
          onClick={() => {
            setSpotlightOpen(!spotlightOpen);
            setControlCenterOpen(false);
          }}
        >
          <RiSearchLine size={15} />
        </div>

        {/* Control Center Icon */}
        <div
          className={`tray-item cc-icon-btn ${controlCenterOpen ? 'active' : ''}`}
          title="Control Center"
          onClick={() => {
            setControlCenterOpen(!controlCenterOpen);
            setSpotlightOpen(false);
          }}
        >
          <RiEqualizerLine size={15} />
        </div>

        {/* Date Time */}
        <div className="tray-item datetime-tray">
          <DateTime />
        </div>
      </div>

      {/* Control Center Panel */}
      <ControlCenter
        isOpen={controlCenterOpen}
        onClose={() => setControlCenterOpen(false)}
      />
    </nav>
  );
};

export default Navbar;

