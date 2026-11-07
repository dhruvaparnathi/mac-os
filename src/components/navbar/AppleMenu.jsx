import React, { useEffect, useRef } from 'react';
import { useWindows } from '../../context/WindowContext';
import { useSettings } from '../../context/SettingsContext';

const AppleMenu = ({ isOpen, onClose }) => {
  const { openWindow } = useWindows();
  const { setIsLocked } = useSettings();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="apple-dropdown-menu" ref={menuRef}>
      <button
        className="menu-item"
        onClick={() => {
          openWindow('about');
          onClose();
        }}
      >
        <span>About This Mac</span>
      </button>

      <div className="menu-divider" />

      <button
        className="menu-item"
        onClick={() => {
          openWindow('settings');
          onClose();
        }}
      >
        <span>System Settings...</span>
      </button>

      <button
        className="menu-item"
        onClick={() => {
          openWindow('finder');
          onClose();
        }}
      >
        <span>Finder</span>
      </button>

      <div className="menu-divider" />

      <button
        className="menu-item"
        onClick={() => {
          setIsLocked(true);
          onClose();
        }}
      >
        <span>Lock Screen</span>
        <span className="shortcut">⌘L</span>
      </button>

      <button
        className="menu-item"
        onClick={() => {
          window.location.reload();
        }}
      >
        <span>Restart...</span>
      </button>
    </div>
  );
};

export default AppleMenu;

