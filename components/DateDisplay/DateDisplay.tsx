import { useEffect, useState } from 'react';

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dayOfWeek = daysOfWeek[now.getDay()];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;
      setCurrentDate(formattedDate);
    };

    updateDate();
  }, []);

  return currentDate
};

export default DateDisplay;
