import React, { useState } from 'react';
import './app.scss';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { WindowProvider } from './context/WindowContext';

// Components
import Navbar from './components/navbar/Navbar';
import Dock from './components/dock/Dock';
import DesktopIcons from './components/desktop/DesktopIcons';
import ContextMenu from './components/desktop/ContextMenu';
import Spotlight from './components/spotlight/Spotlight';
import LockScreen from './components/lockscreen/LockScreen';

// Windows
import Finder from './windows/finder/Finder';
import Safari from './windows/safari/Safari';
import Messages from './windows/messages/Messages';
import Github from './windows/github/Github';
import Note from './windows/note/Note';
import PDF from './windows/pdf/PDF';
import CLI from './windows/cli/CLI';
import Spotify from './windows/spotify/Spotify';
import Calculator from './windows/calculator/Calculator';
import Settings from './windows/settings/Settings';
import AboutMac from './windows/about/AboutMac';

const Desktop = () => {
  const { wallpaper, brightness } = useSettings();
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleContextMenu = (e) => {
    // Only open if clicking directly on the desktop background
    if (e.target.closest('.mac-window') || e.target.closest('.mac-dock') || e.target.closest('.mac-navbar')) {
      return;
    }
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 200)
    });
  };

  return (
    <main
      className="mac-desktop"
      onContextMenu={handleContextMenu}
      style={{
        backgroundImage: `url('${wallpaper}')`,
        filter: `brightness(${brightness}%)`
      }}
    >
      <Navbar />

      <DesktopIcons />

      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        visible={contextMenu.visible}
        onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
      />

      {/* Windows Layer */}
      <Finder />
      <Safari />
      <Messages />
      <Github />
      <Note />
      <PDF />
      <CLI />
      <Spotify />
      <Calculator />
      <Settings />
      <AboutMac />

      {/* Spotlight Search Overlay */}
      <Spotlight />

      {/* Lock Screen Overlay */}
      <LockScreen />

      {/* Dock Bar */}
      <Dock />
    </main>
  );
};

const App = () => {
  return (
    <SettingsProvider>
      <WindowProvider>
        <Desktop />
      </WindowProvider>
    </SettingsProvider>
  );
};

export default App;
