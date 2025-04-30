import React, { useEffect, useState } from 'react';

function timeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((date - now) / 1000);
  const isFuture = diffInSeconds > 0;
  const seconds = Math.abs(diffInSeconds);

  const intervals = [
    { label: 'any', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'dia', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minut', seconds: 60 },
    { label: 'segon', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      const label = interval.label + (count > 1 ? 's' : '');
      return isFuture
        ? `d'aquí a ${count} ${label}`
        : `fa ${count} ${label}`;
    }
  }

  return isFuture ? "d'aquí a uns segons" : 'ara mateix';
}

const TimeAgo = ({ timestamp }) => {
  const [displayTime, setDisplayTime] = useState(() => timeAgo(new Date(timestamp)));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayTime(timeAgo(new Date(timestamp)));
    }, 60000); // cada minuto

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span className="timeago">({displayTime})</span>;
};

export default TimeAgo;