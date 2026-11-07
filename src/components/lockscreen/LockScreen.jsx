import React, { useState, useEffect } from 'react';
import { RiArrowRightLine, RiLockPasswordLine } from '@remixicon/react';
import { useSettings } from '../../context/SettingsContext';
import { soundManager } from '../../utils/sound';
import './lockscreen.scss';

const LockScreen = () => {
  const { isLocked, setIsLocked } = useSettings();
  const [password, setPassword] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isLocked) return null;

  const handleUnlock = (e) => {
    e?.preventDefault();
    soundManager.playPop();
    setIsLocked(false);
    setPassword('');
  };

  const dayStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="mac-lockscreen">
      <div className="lockscreen-clock">
        <span className="lock-day">{dayStr}</span>
        <span className="lock-time">{timeStr}</span>
      </div>

      <div className="lockscreen-user-box">
        <div className="user-avatar">
          <span>DA</span>
        </div>
        <h2 className="user-name">Dhruv Aparnathi</h2>

        <form onSubmit={handleUnlock} className="password-form">
          <div className="password-input-wrapper">
            <input
              type="password"
              placeholder="Enter password or press Enter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="unlock-btn" title="Unlock">
              <RiArrowRightLine size={16} />
            </button>
          </div>
        </form>

        <p className="unlock-hint" onClick={handleUnlock}>
          <RiLockPasswordLine size={12} /> Click here or press Enter to unlock
        </p>
      </div>
    </div>
  );
};

export default LockScreen;

