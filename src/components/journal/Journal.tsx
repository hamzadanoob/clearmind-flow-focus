
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

export const Journal = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [morningEntry, setMorningEntry] = useState('');
  const [eveningEntry, setEveningEntry] = useState('');
  const [mood, setMood] = useState<number>(3);

  const moodEmojis = ['😢', '😕', '😐', '😊', '😄'];
  const prompts = {
    morning: "What's on your mind this morning? What are you excited about today?",
    evening: "How did today go? What went well, and what could have been better?"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Daily Journal
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Reflect on your day and track your emotional journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
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
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">
              Morning Reflection
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {prompts.morning}
            </p>
            <Textarea
              placeholder="Start writing your morning thoughts..."
              value={morningEntry}
              onChange={(e) => setMorningEntry(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </Card>

          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">
              Evening Reflection
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {prompts.evening}
            </p>
            <Textarea
              placeholder="Reflect on your day..."
              value={eveningEntry}
              onChange={(e) => setEveningEntry(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </Card>

          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Today's Mood
            </h3>
            <div className="flex justify-center space-x-4 mb-4">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index)}
                  className={`text-3xl p-2 rounded-full transition-all ${
                    mood === index
                      ? 'bg-blue-100 dark:bg-blue-900 scale-125'
                      : 'hover:scale-110'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="text-center">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                Save Entry
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
