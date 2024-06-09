import { useEffect, useState } from 'react';

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes();
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime
};

export default TimeDisplay;
