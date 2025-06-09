
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause } from 'lucide-react';

export const FocusQuickStart = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Quick Focus
        </h3>
        <Timer className="w-5 h-5 text-blue-600" />
      </div>
      
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold">
            {formatTime(timeLeft)}
          </span>
        </div>
        
        <Button
          onClick={toggleTimer}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause Session
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Pomodoro
            </>
          )}
        </Button>
        
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Focus for 25 minutes, then take a 5-minute break
        </p>
      </div>
    </Card>
  );
};
