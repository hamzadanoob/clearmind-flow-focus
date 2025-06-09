
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const Analytics = () => {
  const weeklyData = [
    { day: 'Mon', focus: 6, tasks: 8 },
    { day: 'Tue', focus: 4, tasks: 6 },
    { day: 'Wed', focus: 8, tasks: 12 },
    { day: 'Thu', focus: 5, tasks: 7 },
    { day: 'Fri', focus: 7, tasks: 10 },
    { day: 'Sat', focus: 3, tasks: 4 },
    { day: 'Sun', focus: 2, tasks: 3 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Track your productivity patterns and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200/20">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Weekly Focus Hours
          </h3>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            35h
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            +12% from last week
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200/20">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
            Tasks Completed
          </h3>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">
            50
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +8% from last week
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200/20">
          <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2">
            Productivity Score
          </h3>
          <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
            8.2/10
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
            Excellent performance!
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
          <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100">
            Weekly Progress
          </h3>
          
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{day.day}</span>
                  <span className="text-slate-800 dark:text-slate-100 font-medium">
                    {day.focus}h focus • {day.tasks} tasks
                  </span>
                </div>
                <Progress value={(day.focus / 8) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
          <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100">
            Insights & Recommendations
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                🎯 Peak Performance
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your most productive hours are between 9-11 AM. Schedule important tasks during this time.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                ✨ Streak Bonus
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                You're on a 5-day focus streak! Keep up the momentum.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                📈 Improvement Area
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Consider taking more breaks during long focus sessions to maintain quality.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
