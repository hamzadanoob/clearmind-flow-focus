import { useState, useEffect, useRef } from 'react';
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
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const notificationRef = useRef<HTMLAudioElement | null>(null);

  // Sound options
  const ambientSounds = [
    { name: 'Rain', file: 'rain.mp3' },
    { name: 'Forest', file: 'forest.mp3' },
    { name: 'Cafe', file: 'cafe.mp3' },
    { name: 'Ocean', file: 'ocean.mp3' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      
      // Play notification sound
      if (soundEnabled && notificationRef.current) {
        notificationRef.current.play();
      }
      
      if (!isBreak) {
        setCycles(prev => prev + 1);
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
        
        // Show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Pomodoro Complete!', {
            body: 'Time for a 5-minute break.',
            icon: '/favicon.ico'
          });
        }
      } else {
        setTimeLeft(25 * 60); // Back to 25 minute work session
        setIsBreak(false);
        
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Break Over!', {
            body: 'Ready for another focus session?',
            icon: '/favicon.ico'
          });
        }
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, soundEnabled]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    
    // Handle ambient sound
    if (!isRunning && selectedSound && audioRef.current) {
      audioRef.current.play();
    } else if (isRunning && audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const selectSound = (soundName: string) => {
    if (selectedSound === soundName) {
      setSelectedSound(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setSelectedSound(soundName);
      // In a real app, you'd load the actual audio file
      // For now, we'll just track the selection
    }
  };

  const saveNotes = () => {
    const sessionNotes = JSON.parse(localStorage.getItem('focusNotes') || '[]');
    sessionNotes.push({
      id: Date.now(),
      content: notes,
      date: new Date().toISOString(),
      cycle: cycles,
    });
    localStorage.setItem('focusNotes', JSON.stringify(sessionNotes));
    setNotes('');
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
            <div className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${
              isBreak 
                ? 'bg-gradient-to-br from-emerald-400 to-teal-500' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            } ${isRunning ? 'animate-pulse' : ''}`}>
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

            {/* Progress indicator */}
            <div className="mt-6">
              <div className="flex justify-center space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < cycles ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Pomodoro cycles (4 cycles = long break)
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
              className="min-h-[150px] resize-none mb-3"
            />
            <Button
              onClick={saveNotes}
              size="sm"
              className="w-full"
              disabled={!notes.trim()}
            >
              Save Note
            </Button>
          </Card>

          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Ambient Sounds
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ambientSounds.map((sound) => (
                <Button
                  key={sound.name}
                  onClick={() => selectSound(sound.name)}
                  variant={selectedSound === sound.name ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {sound.name}
                </Button>
              ))}
            </div>
            {selectedSound && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
                🎵 Playing: {selectedSound}
              </p>
            )}
          </Card>

          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Session Stats
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Today's Focus Time:</span>
                <span className="font-semibold">{cycles * 25}min</span>
              </div>
              <div className="flex justify-between">
                <span>Sessions Completed:</span>
                <span className="font-semibold">{cycles}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Session:</span>
                <span className="font-semibold">
                  {isBreak ? 'Break' : 'Focus'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Hidden audio elements for notifications */}
      <audio ref={notificationRef} preload="auto">
        <source src="/notification.mp3" type="audio/mpeg" />
      </audio>
      
      {selectedSound && (
        <audio ref={audioRef} loop preload="auto">
          <source src={`/sounds/${selectedSound.toLowerCase()}.mp3`} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};
