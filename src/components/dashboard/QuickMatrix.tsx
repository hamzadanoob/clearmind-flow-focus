
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QuickMatrix = () => {
  const topTasks = [
    { id: 1, title: "Complete project proposal", priority: "urgent-important" },
    { id: 2, title: "Review quarterly goals", priority: "important" },
    { id: 3, title: "Team standup meeting", priority: "urgent" },
  ];

  return (
    <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Top 3 Focus Tasks
        </h3>
        <Button variant="outline" size="sm">
          View Matrix
        </Button>
      </div>
      
      <div className="space-y-3">
        {topTasks.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{index + 1}</span>
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">
              {task.title}
            </span>
            <div className={`w-3 h-3 rounded-full ${
              task.priority === 'urgent-important' ? 'bg-red-500' :
              task.priority === 'important' ? 'bg-yellow-500' : 'bg-blue-500'
            }`} />
          </div>
        ))}
      </div>
    </Card>
  );
};
