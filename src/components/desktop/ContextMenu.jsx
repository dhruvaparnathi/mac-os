import React, { useEffect } from 'react';
import { useWindows } from '../../context/WindowContext';
import './desktop.scss';

const ContextMenu = ({ x, y, visible, onClose }) => {
  const { openWindow } = useWindows();

  useEffect(() => {
    const handleClose = () => onClose();
    if (visible) {
      window.addEventListener('click', handleClose);
      window.addEventListener('contextmenu', handleClose);
    }
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('contextmenu', handleClose);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="desktop-context-menu"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          openWindow('finder');
          onClose();
        }}
      >
        <span>Open Finder</span>
      </button>

      <button
        onClick={() => {
          openWindow('cli');
          onClose();
        }}
      >
        <span>New Terminal at Folder</span>
      </button>

      <div className="menu-divider" />

      <button
        onClick={() => {
          openWindow('settings');
          onClose();
        }}
      >
        <span>Change Desktop Wallpaper...</span>
      </button>

      <button
        onClick={() => {
          openWindow('about');
          onClose();
        }}
      >
        <span>About This Mac</span>
      </button>
    </div>
  );
};

export default ContextMenu;

