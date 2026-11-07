import React, { useState } from 'react';
import MacWindow from '../../components/common/MacWindow';
import {
  RiSettings4Fill,
  RiImageLine,
  RiMoonLine,
  RiVolumeUpLine,
  RiInformationLine,
  RiCheckLine
} from '@remixicon/react';
import { WALLPAPERS, ACCENT_COLORS } from '../../data/wallpapers';
import { useSettings } from '../../context/SettingsContext';
import { soundManager } from '../../utils/sound';
import './settings.scss';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('wallpaper');
  const {
    wallpaper,
    setWallpaper,
    accentColor,
    setAccentColor,
    darkMode,
    setDarkMode,
    soundEnabled,
    setSoundEnabled,
    volume,
    setVolume
  } = useSettings();

  const tabs = [
    { id: 'wallpaper', label: 'Wallpaper', icon: RiImageLine },
    { id: 'appearance', label: 'Appearance', icon: RiMoonLine },
    { id: 'sound', label: 'Sound', icon: RiVolumeUpLine },
    { id: 'about', label: 'System Info', icon: RiInformationLine }
  ];

  return (
    <MacWindow
      windowId="settings"
      title="System Settings"
      icon={RiSettings4Fill}
      defaultWidth={740}
      defaultHeight={480}
    >
      <div className="settings-window">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          <div className="sidebar-search-box">
            <input type="text" placeholder="Search" />
          </div>

          <div className="settings-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  className={`settings-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings Main Content */}
        <div className="settings-main">
          {activeTab === 'wallpaper' && (
            <div className="settings-section">
              <h3>Desktop Wallpaper</h3>
              <p className="section-desc">Choose a dynamic high-resolution background for your desktop.</p>

              <div className="wallpaper-grid">
                {WALLPAPERS.map((wp) => {
                  const isSelected = wallpaper === wp.url;
                  return (
                    <div
                      key={wp.id}
                      className={`wp-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        soundManager.playClick();
                        setWallpaper(wp.url);
                      }}
                    >
                      <img src={wp.thumbnail} alt={wp.name} />
                      <div className="wp-info">
                        <span>{wp.name}</span>
                        {isSelected && <RiCheckLine size={16} color="#007aff" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h3>Appearance & Theme</h3>
              <p className="section-desc">Select how menus, windows, and controls look on DhruvOS.</p>

              <div className="settings-box">
                <div className="setting-row">
                  <div>
                    <h4>Dark Mode</h4>
                    <p className="row-desc">Optimize for nighttime coding and reduced glare.</p>
                  </div>
                  <button
                    className={`mac-toggle ${darkMode ? 'on' : ''}`}
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="setting-divider" />

                <div className="setting-row">
                  <div>
                    <h4>Accent Color</h4>
                    <p className="row-desc">Used for selections, buttons, and highlighted elements.</p>
                  </div>
                  <div className="accent-picker">
                    {ACCENT_COLORS.map((col) => (
                      <div
                        key={col.id}
                        className={`accent-circle ${accentColor.id === col.id ? 'active' : ''}`}
                        style={{ backgroundColor: col.hex }}
                        onClick={() => {
                          soundManager.playClick();
                          setAccentColor(col);
                        }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sound' && (
            <div className="settings-section">
              <h3>Sound & Audio Feedback</h3>
              <p className="section-desc">Control interface sound effects and volume levels.</p>

              <div className="settings-box">
                <div className="setting-row">
                  <div>
                    <h4>Play user interface sound effects</h4>
                    <p className="row-desc">Authentic macOS clicks, pops, and window sounds.</p>
                  </div>
                  <button
                    className={`mac-toggle ${soundEnabled ? 'on' : ''}`}
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      if (!soundEnabled) soundManager.playPop();
                    }}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="setting-divider" />

                <div className="setting-row">
                  <div>
                    <h4>Output Volume ({volume}%)</h4>
                    <p className="row-desc">Adjust synthesized Web Audio volume.</p>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="mac-slider"
                    style={{ width: 140 }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="settings-section">
              <h3>System Information</h3>
              <p className="section-desc">Architecture and software stack of Dhruv Aparnathi's portfolio.</p>

              <div className="settings-box">
                <div className="setting-row">
                  <span className="row-label">Operating System</span>
                  <span className="row-val">macOS Web Simulator v2.0</span>
                </div>
                <div className="setting-divider" />
                <div className="setting-row">
                  <span className="row-label">Core Runtime</span>
                  <span className="row-val">React 19 + Vite 7</span>
                </div>
                <div className="setting-divider" />
                <div className="setting-row">
                  <span className="row-label">Style Pipeline</span>
                  <span className="row-val">TailwindCSS v4 + SASS</span>
                </div>
                <div className="setting-divider" />
                <div className="setting-row">
                  <span className="row-label">Window Engine</span>
                  <span className="row-val">react-rnd Custom Architecture</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MacWindow>
  );
};

export default Settings;
