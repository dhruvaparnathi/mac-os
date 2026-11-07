import React, { createContext, useContext, useState, useEffect } from 'react';
import { WALLPAPERS, ACCENT_COLORS } from '../data/wallpapers';
import { soundManager } from '../utils/sound';
import { audioController } from '../utils/audio';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0].url);
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(70);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);

  // Music State synced with AudioController
  const [musicState, setMusicState] = useState(audioController.getState());

  useEffect(() => {
    const unsubscribe = audioController.subscribe((state) => {
      setMusicState({ ...state });
    });
    return unsubscribe;
  }, []);

  // System Volume synchronization (Affects both sound effects and background music!)
  useEffect(() => {
    soundManager.enabled = soundEnabled;
    soundManager.volume = volume / 100;

    audioController.setVolume(volume / 100);
    audioController.setMuted(!soundEnabled);
  }, [soundEnabled, volume]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for Spotlight, Escape to close overlays)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setControlCenterOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        wallpaper,
        setWallpaper,
        accentColor,
        setAccentColor,
        brightness,
        setBrightness,
        volume,
        setVolume,
        soundEnabled,
        setSoundEnabled,
        darkMode,
        setDarkMode,
        isLocked,
        setIsLocked,
        spotlightOpen,
        setSpotlightOpen,
        controlCenterOpen,
        setControlCenterOpen,
        // Music Controller
        musicState,
        toggleMusic: () => audioController.togglePlay(),
        playMusic: () => audioController.play(),
        pauseMusic: () => audioController.pause(),
        nextMusicTrack: () => audioController.nextTrack(),
        prevMusicTrack: () => audioController.prevTrack(),
        selectMusicTrack: (idx) => audioController.selectTrack(idx),
        seekMusic: (sec) => audioController.seek(sec)
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
