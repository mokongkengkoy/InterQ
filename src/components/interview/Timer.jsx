import React, { useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const Timer = ({ duration, timeRemaining, setTimeRemaining, onTimeUp, isActive }) => {
  
  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      onTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, onTimeUp, setTimeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (timeRemaining / duration) * 100;
  
  // Color logic
  let colorClass = 'text-gray-700';
  let barColor = 'bg-indigo-600';
  
  if (timeRemaining < 30) {
    colorClass = 'text-orange-500';
    barColor = 'bg-orange-500';
  }
  if (timeRemaining < 10) {
    colorClass = 'text-red-500 animate-pulse';
    barColor = 'bg-red-500';
  }

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
           <SafeIcon icon={FiIcons.FiClock} /> Time Remaining
        </span>
        <span className={`text-2xl font-mono font-bold ${colorClass}`}>
          {formatTime(timeRemaining)}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} transition-all duration-1000 ease-linear`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;