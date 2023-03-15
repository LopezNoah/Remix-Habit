import React, { useState, useEffect } from 'react';

export function Timer() {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setDuration(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const handleStop = () => {
    setEndTime(Date.now());
    setIsRunning(false);
  };

  const formatDuration = () => {
    const seconds = Math.floor(duration / 1000);
    return `${seconds} seconds`;
  };

  return (
    <div>
      <h2>Timer Component</h2>
      <p>Duration: {formatDuration()}</p>
      {isRunning ? (
        <button onClick={handleStop}>Stop Timer</button>
      ) : (
        <button onClick={handleStart}>Start Timer</button>
      )}
    </div>
  );
}

export default Timer;
