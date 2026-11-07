import React, { createContext, useContext, useState, useCallback } from 'react';
import { soundManager } from '../utils/sound';

const WindowContext = createContext();

const INITIAL_WINDOWS = {
  finder: {
    id: 'finder',
    title: 'Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 780, height: 480 },
    defaultPosition: { x: 100, y: 70 },
    resizable: true
  },
  safari: {
    id: 'safari',
    title: 'Safari — Portfolio & Demos',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 840, height: 520 },
    defaultPosition: { x: 120, y: 80 },
    resizable: true
  },
  messages: {
    id: 'messages',
    title: 'Messages — Dhruv Aparnathi',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 140, y: 90 },
    resizable: true
  },
  github: {
    id: 'github',
    title: 'GitHub Projects',
    isOpen: true, // open by default so visitors immediately see portfolio work!
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    defaultSize: { width: 820, height: 520 },
    defaultPosition: { x: 160, y: 60 },
    resizable: true
  },
  note: {
    id: 'note',
    title: 'Notes — profile.config.ts',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 680, height: 460 },
    defaultPosition: { x: 200, y: 110 },
    resizable: true
  },
  pdf: {
    id: 'pdf',
    title: 'Dhruv_Aparnathi_Resume.pdf',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 750, height: 550 },
    defaultPosition: { x: 180, y: 70 },
    resizable: true
  },
  cli: {
    id: 'cli',
    title: 'Terminal — zsh',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 660, height: 420 },
    defaultPosition: { x: 220, y: 120 },
    resizable: true
  },
  spotify: {
    id: 'spotify',
    title: 'Spotify — Dev Music',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 420, height: 500 },
    defaultPosition: { x: 240, y: 90 },
    resizable: true
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 280, height: 420 },
    defaultPosition: { x: 300, y: 140 },
    resizable: false
  },
  settings: {
    id: 'settings',
    title: 'System Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 740, height: 480 },
    defaultPosition: { x: 150, y: 100 },
    resizable: true
  },
  about: {
    id: 'about',
    title: 'About This Mac',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    defaultSize: { width: 340, height: 420 },
    defaultPosition: { x: 260, y: 120 },
    resizable: false
  }
};

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [topZIndex, setTopZIndex] = useState(15);
  const [activeWindowId, setActiveWindowId] = useState('github');

  const focusWindow = useCallback((id) => {
    setTopZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((prevWindows) => ({
        ...prevWindows,
        [id]: {
          ...prevWindows[id],
          zIndex: nextZ,
          isMinimized: false
        }
      }));
      return nextZ;
    });
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback(
    (id) => {
      soundManager.playWindowOpen();
      setTopZIndex((prev) => {
        const nextZ = prev + 1;
        setWindows((prevWindows) => ({
          ...prevWindows,
          [id]: {
            ...prevWindows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        }));
        return nextZ;
      });
      setActiveWindowId(id);
    },
    []
  );

  const closeWindow = useCallback(
    (id) => {
      soundManager.playPop();
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMaximized: false
        }
      }));
      if (activeWindowId === id) {
        // Find next open window to focus
        setWindows((currentWindows) => {
          const openWinIds = Object.keys(currentWindows).filter(
            (k) => k !== id && currentWindows[k].isOpen && !currentWindows[k].isMinimized
          );
          if (openWinIds.length > 0) {
            const nextActive = openWinIds.sort(
              (a, b) => currentWindows[b].zIndex - currentWindows[a].zIndex
            )[0];
            setActiveWindowId(nextActive);
          } else {
            setActiveWindowId(null);
          }
          return currentWindows;
        });
      }
    },
    [activeWindowId]
  );

  const minimizeWindow = useCallback(
    (id) => {
      soundManager.playPop();
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true
        }
      }));
      if (activeWindowId === id) {
        setActiveWindowId(null);
      }
    },
    [activeWindowId]
  );

  const toggleMaximizeWindow = useCallback((id) => {
    soundManager.playClick();
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
  }, []);

  const toggleWindow = useCallback(
    (id) => {
      const win = windows[id];
      if (!win) return;
      if (!win.isOpen) {
        openWindow(id);
      } else if (win.isMinimized) {
        focusWindow(id);
      } else if (activeWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [windows, activeWindowId, openWindow, focusWindow, minimizeWindow]
  );

  const closeAllWindows = useCallback(() => {
    soundManager.playTrash();
    setWindows((prev) => {
      const next = {};
      Object.keys(prev).forEach((key) => {
        next[key] = { ...prev[key], isOpen: false, isMaximized: false };
      });
      return next;
    });
    setActiveWindowId(null);
  }, []);

  const minimizeAllWindows = useCallback(() => {
    soundManager.playPop();
    setWindows((prev) => {
      const next = {};
      Object.keys(prev).forEach((key) => {
        next[key] = { ...prev[key], isMinimized: true };
      });
      return next;
    });
    setActiveWindowId(null);
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        topZIndex,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        toggleWindow,
        closeAllWindows,
        minimizeAllWindows
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWindows = () => useContext(WindowContext);
