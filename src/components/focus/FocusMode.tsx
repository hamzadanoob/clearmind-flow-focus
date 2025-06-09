
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';

export const FocusMode = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        setCycles(prev => prev + 1);
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
      } else {
        setTimeLeft(25 * 60); // Back to 25 minute work session
        setIsBreak(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Focus Mode
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          {isBreak ? 'Take a well-deserved break' : 'Deep work time - eliminate distractions'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20 text-center">
            <div className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center mb-8 ${
              isBreak 
                ? 'bg-gradient-to-br from-emerald-400 to-teal-500' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <span className="text-white text-4xl font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <Button
                onClick={toggleTimer}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              
              <Button variant="outline" onClick={resetTimer}>
                <Square className="w-4 h-4 mr-2" />
                Reset
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p>Cycles completed: {cycles}</p>
              <p className="mt-1">
                {isBreak ? 'Break time!' : 'Focus session in progress'}
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Quick Notes
            </h3>
            <Textarea
              placeholder="Capture your thoughts during focus sessions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[150px] resize-none"
            />
          </Card>

          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Ambient Sounds
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Rain', 'Forest', 'Cafe', 'Ocean'].map((sound) => (
                <Button
                  key={sound}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {sound}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
