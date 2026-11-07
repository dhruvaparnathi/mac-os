import React, { useEffect, useState } from 'react';

const DateTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'short' });
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const day = now.getDate();
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="mac-datetime">
      <span>{dayOfWeek} {month} {day}</span>
      <span className="time">{time}</span>
    </div>
  );
};

export default DateTime;

