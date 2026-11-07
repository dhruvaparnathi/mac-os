import React, { useState } from 'react';
import MacWindow from '../../components/common/MacWindow';
import {
  RiSpotifyFill,
  RiMusic2Fill,
  RiPlayFill,
  RiPauseFill,
  RiSkipForwardFill,
  RiSkipBackFill,
  RiVolumeUpFill,
  RiVolumeMuteFill,
  RiInformationLine
} from '@remixicon/react';
import { useSettings } from '../../context/SettingsContext';
import { DEV_TRACKS } from '../../utils/audio';
import './spotify.scss';

const Spotify = () => {
  const [activeMode, setActiveMode] = useState('native'); // 'native' | 'embed'
  const {
    volume,
    setVolume,
    soundEnabled,
    setSoundEnabled,
    musicState,
    toggleMusic,
    nextMusicTrack,
    prevMusicTrack,
    selectMusicTrack,
    seekMusic
  } = useSettings();

  const currentTrack = musicState?.currentTrack || DEV_TRACKS[0];
  const isPlaying = musicState?.isPlaying;
  const currentTime = musicState?.currentTime || 0;
  const duration = musicState?.duration || 0;

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <MacWindow
      windowId="spotify"
      title={`Music — ${activeMode === 'native' ? currentTrack.title : 'Spotify Embed'}`}
      icon={RiSpotifyFill}
      defaultWidth={460}
      defaultHeight={580}
    >
      <div className="music-app-wrapper">
        {/* Top Segmented Mode Selector */}
        <div className="music-tab-header">
          <button
            className={`mode-tab ${activeMode === 'native' ? 'active' : ''}`}
            onClick={() => setActiveMode('native')}
          >
            <RiMusic2Fill size={15} />
            <span>Dev Lo-Fi (Volume Sync)</span>
          </button>
          <button
            className={`mode-tab ${activeMode === 'embed' ? 'active' : ''}`}
            onClick={() => setActiveMode('embed')}
          >
            <RiSpotifyFill size={15} />
            <span>Spotify Embed</span>
          </button>
        </div>

        {/* Mode 1: Native macOS Volume-Synced Music Player */}
        {activeMode === 'native' ? (
          <div className="native-player-body">
            {/* Album Cover & Ambient Glow */}
            <div className="album-art-section">
              <div className={`album-art-frame ${isPlaying ? 'playing' : ''}`}>
                <img src={currentTrack.cover} alt={currentTrack.title} />
                {isPlaying && (
                  <div className="visualizer-bars">
                    <span className="bar b1" />
                    <span className="bar b2" />
                    <span className="bar b3" />
                    <span className="bar b4" />
                    <span className="bar b5" />
                  </div>
                )}
              </div>

              <div className="track-details">
                <h3>{currentTrack.title}</h3>
                <p>{currentTrack.artist}</p>
                <span className="genre-pill">{currentTrack.genre}</span>
              </div>
            </div>

            {/* Time Scrubber */}
            <div className="scrubber-row">
              <span className="time-label">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekMusic(Number(e.target.value))}
                className="mac-slider scrub-slider"
              />
              <span className="time-label">{formatTime(duration)}</span>
            </div>

            {/* Transport Controls */}
            <div className="transport-controls">
              <button
                className="transport-btn"
                onClick={prevMusicTrack}
                title="Previous Track"
              >
                <RiSkipBackFill size={20} />
              </button>

              <button
                className="transport-btn play-circle"
                onClick={toggleMusic}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <RiPauseFill size={24} /> : <RiPlayFill size={24} />}
              </button>

              <button
                className="transport-btn"
                onClick={nextMusicTrack}
                title="Next Track"
              >
                <RiSkipForwardFill size={20} />
              </button>
            </div>

            {/* Real System Volume Synchronized Bar */}
            <div className="volume-control-box">
              <div className="volume-label-row">
                <span className="vol-title">macOS System Volume</span>
                <span className="vol-pct">{soundEnabled ? `${volume}%` : 'Muted'}</span>
              </div>
              <div className="volume-slider-row">
                <button
                  className="mute-btn-mini"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled && volume > 0 ? (
                    <RiVolumeUpFill size={17} color="#1db954" />
                  ) : (
                    <RiVolumeMuteFill size={17} color="#ff3b30" />
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
                  className="mac-slider vol-slider"
                />
              </div>
            </div>

            {/* Playlist Queue */}
            <div className="tracks-queue">
              <span className="queue-title">Playlist Queue</span>
              <div className="queue-list">
                {DEV_TRACKS.map((track, idx) => {
                  const isCurrent = currentTrack.id === track.id;
                  return (
                    <div
                      key={track.id}
                      className={`queue-item ${isCurrent ? 'active' : ''}`}
                      onClick={() => selectMusicTrack(idx)}
                    >
                      <img src={track.cover} alt="" className="queue-thumb" />
                      <div className="queue-item-info">
                        <span className="q-title">{track.title}</span>
                        <span className="q-artist">{track.artist}</span>
                      </div>
                      {isCurrent && isPlaying && (
                        <span className="playing-dot" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Mode 2: Spotify Embed with Contextual Notice */
          <div className="spotify-embed-body">
            <div className="spotify-notice-banner">
              <RiInformationLine size={16} className="notice-icon" />
              <p>
                Spotify embeds play inside Spotify’s secure cross-origin player.
                To control playback with the <strong>macOS Control Center volume slider</strong>, switch to the <strong>Dev Lo-Fi</strong> tab above.
              </p>
            </div>

            <div className="spotify-player-container">
              <iframe
                data-testid="embed-iframe"
                src="https://open.spotify.com/embed/playlist/3p0iPmL3ev1WxNkPQS7jGQ?utm_source=generator&theme=0"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
              />
            </div>
          </div>
        )}
      </div>
    </MacWindow>
  );
};

export default Spotify;
