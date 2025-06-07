import React, { useEffect } from 'react';

const useClock = (setDate) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [setDate]);
};

export default useClock;
