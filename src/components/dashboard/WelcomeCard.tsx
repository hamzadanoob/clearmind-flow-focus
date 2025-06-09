
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

export const WelcomeCard = () => {
  const [quote, setQuote] = useState("Focus is not about doing more. It's about doing what matters.");
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));

    const quotes = [
      "Focus is not about doing more. It's about doing what matters.",
      "Clarity of mind leads to clarity of purpose.",
      "Small steps daily lead to big changes yearly.",
      "Progress, not perfection, is the goal.",
      "Your future self will thank you for what you do today."
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <Card className="p-8 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-0 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🌟</span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Good morning! Ready to focus?
        </h2>
        
        <p className="text-slate-600 dark:text-slate-300 italic max-w-md mx-auto">
          "{quote}"
        </p>
        
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {currentDate}
        </p>
      </div>
    </Card>
  );
};
