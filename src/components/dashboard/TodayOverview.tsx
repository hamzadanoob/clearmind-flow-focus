
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const TodayOverview = () => {
  return (
    <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
        Today's Progress
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-300">Focus Sessions</span>
            <span className="text-slate-800 dark:text-slate-100 font-medium">3/5</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-300">Tasks Completed</span>
            <span className="text-slate-800 dark:text-slate-100 font-medium">8/12</span>
          </div>
          <Progress value={67} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-300">Weekly Goal</span>
            <span className="text-slate-800 dark:text-slate-100 font-medium">68%</span>
          </div>
          <Progress value={68} className="h-2" />
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          🎯 You're on track! Keep the momentum going.
        </p>
      </div>
    </Card>
  );
};
