
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

interface PrayerStatus {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

interface DayRecord {
  date: string;
  prayers: PrayerStatus;
  completionRate: number;
}

export const NamajTracker = () => {
  const [todayPrayers, setTodayPrayers] = useState<PrayerStatus>({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });

  const [records, setRecords] = useState<DayRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentStreak, setCurrentStreak] = useState(0);

  const prayers = [
    { key: 'fajr' as keyof PrayerStatus, name: 'Fajr', time: '5:30 AM' },
    { key: 'dhuhr' as keyof PrayerStatus, name: 'Dhuhr', time: '1:00 PM' },
    { key: 'asr' as keyof PrayerStatus, name: 'Asr', time: '4:30 PM' },
    { key: 'maghrib' as keyof PrayerStatus, name: 'Maghrib', time: '6:45 PM' },
    { key: 'isha' as keyof PrayerStatus, name: 'Isha', time: '8:15 PM' },
  ];

  const togglePrayer = (prayer: keyof PrayerStatus) => {
    const newStatus = { ...todayPrayers, [prayer]: !todayPrayers[prayer] };
    setTodayPrayers(newStatus);
    
    // Save to today's record
    const today = new Date().toDateString();
    const completionRate = Object.values(newStatus).filter(Boolean).length / 5 * 100;
    
    const updatedRecords = records.filter(r => r.date !== today);
    updatedRecords.push({
      date: today,
      prayers: newStatus,
      completionRate,
    });
    
    setRecords(updatedRecords);
    localStorage.setItem('namajRecords', JSON.stringify(updatedRecords));
  };

  const getTodayCompletion = () => {
    return Object.values(todayPrayers).filter(Boolean).length / 5 * 100;
  };

  const getWeeklyCompletion = () => {
    const weekRecords = records.slice(-7);
    if (weekRecords.length === 0) return 0;
    const average = weekRecords.reduce((sum, record) => sum + record.completionRate, 0) / weekRecords.length;
    return Math.round(average);
  };

  const calculateStreak = () => {
    let streak = 0;
    const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (const record of sortedRecords) {
      if (record.completionRate === 100) {
        streak++;
      } else {
        break;
      }
    }
    
    setCurrentStreak(streak);
  };

  useEffect(() => {
    // Load saved records
    const saved = localStorage.getItem('namajRecords');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    calculateStreak();
  }, [records]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Namaj Tracker
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Track your daily prayers and build consistency
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200/20">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
            Today's Progress
          </h3>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">
            {getTodayCompletion()}%
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            {Object.values(todayPrayers).filter(Boolean).length}/5 prayers
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200/20">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Weekly Average
          </h3>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {getWeeklyCompletion()}%
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            Last 7 days
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200/20">
          <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2">
            Current Streak
          </h3>
          <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
            {currentStreak}
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
            perfect days
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100">
              Today's Prayers
            </h3>
            
            <div className="space-y-4">
              {prayers.map((prayer) => (
                <div
                  key={prayer.key}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => togglePrayer(prayer.key)}
                      className="text-2xl"
                    >
                      {todayPrayers[prayer.key] ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-400" />
                      )}
                    </button>
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-slate-100">
                        {prayer.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {prayer.time}
                      </p>
                    </div>
                  </div>
                  
                  {todayPrayers[prayer.key] && (
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Daily Progress</span>
                <span>{getTodayCompletion()}%</span>
              </div>
              <Progress value={getTodayCompletion()} className="h-3" />
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Calendar
            </h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border-0"
            />
            
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-slate-700 dark:text-slate-300">
                Recent Performance
              </h4>
              {records.slice(-5).reverse().map((record) => (
                <div key={record.date} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                  <Badge variant={record.completionRate === 100 ? 'default' : 'secondary'}>
                    {record.completionRate}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
