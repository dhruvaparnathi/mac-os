import React, { useEffect, useRef } from 'react';
import {
  RiWifiFill,
  RiBluetoothFill,
  RiSunFill,
  RiVolumeUpFill,
  RiVolumeMuteFill,
  RiMoonFill,
  RiPlayFill,
  RiPauseFill,
  RiSkipForwardFill,
  RiMusic2Fill
} from '@remixicon/react';
import { useSettings } from '../../context/SettingsContext';
import { useWindows } from '../../context/WindowContext';

const ControlCenter = ({ isOpen, onClose }) => {
  const {
    brightness,
    setBrightness,
    volume,
    setVolume,
    darkMode,
    setDarkMode,
    soundEnabled,
    setSoundEnabled,
    musicState,
    toggleMusic,
    nextMusicTrack
  } = useSettings();
  const { openWindow } = useWindows();

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

  const currentTrack = musicState?.currentTrack || { title: 'Midnight Code Flow', artist: 'Chillhop Dev Beats' };
  const isPlaying = musicState?.isPlaying;

  return (
    <div className="control-center-panel" ref={menuRef}>
      <div className="cc-grid">
        {/* Left Toggles */}
        <div className="cc-toggles-card">
          <div className="cc-toggle-item active">
            <div className="cc-icon-btn active">
              <RiWifiFill size={16} />
            </div>
            <div className="cc-toggle-info">
              <span className="title">Wi-Fi</span>
              <span className="sub">Dhruv_Fiber_5G</span>
            </div>
          </div>

          <div className="cc-toggle-item active">
            <div className="cc-icon-btn active">
              <RiBluetoothFill size={16} />
            </div>
            <div className="cc-toggle-info">
              <span className="title">Bluetooth</span>
              <span className="sub">AirPods Pro</span>
            </div>
          </div>

          <div
            className={`cc-toggle-item ${darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className={`cc-icon-btn ${darkMode ? 'active' : ''}`}>
              <RiMoonFill size={16} />
            </div>
            <div className="cc-toggle-info">
              <span className="title">Dark Mode</span>
              <span className="sub">{darkMode ? 'On' : 'Off'}</span>
            </div>
          </div>
        </div>

        {/* Right Music Player Quick Card (Real Interactive Player) */}
        <div className="cc-music-card">
          <div
            className="music-card-header"
            onClick={() => {
              openWindow('spotify');
              onClose();
            }}
          >
            <div className={`music-icon-wrapper ${isPlaying ? 'playing' : ''}`}>
              <RiMusic2Fill size={20} color="#1db954" />
            </div>
            <div className="music-info">
              <span className="music-title">{currentTrack.title}</span>
              <span className="music-artist">{currentTrack.artist}</span>
            </div>
          </div>

          <div className="music-quick-controls">
            <button
              className="music-ctrl-btn play"
              onClick={(e) => {
                e.stopPropagation();
                toggleMusic();
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <RiPauseFill size={15} /> : <RiPlayFill size={15} />}
            </button>
            <button
              className="music-ctrl-btn"
              onClick={(e) => {
                e.stopPropagation();
                nextMusicTrack();
              }}
              title="Next Track"
            >
              <RiSkipForwardFill size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Display Brightness Slider */}
      <div className="cc-slider-card">
        <div className="slider-header">
          <span className="slider-label">Display Brightness</span>
          <span className="slider-val">{brightness}%</span>
        </div>
        <div className="slider-row">
          <RiSunFill size={16} className="slider-icon" />
          <input
            type="range"
            min="40"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="mac-slider"
          />
        </div>
      </div>

      {/* Sound Volume Slider (Directly controls music + system sound effects) */}
      <div className="cc-slider-card">
        <div className="slider-header">
          <span className="slider-label">Sound Volume</span>
          <span className="slider-val">{soundEnabled ? `${volume}%` : 'Muted'}</span>
        </div>
        <div className="slider-row">
          <button
            className="mute-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled && volume > 0 ? (
              <RiVolumeUpFill size={17} className="slider-icon" />
            ) : (
              <RiVolumeMuteFill size={17} className="slider-icon muted" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={soundEnabled ? volume : 0}
            onChange={(e) => {
              if (!soundEnabled) setSoundEnabled(true);
              setVolume(Number(e.target.value));
            }}
            className="mac-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
