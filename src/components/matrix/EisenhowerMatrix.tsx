
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  quadrant: 'urgent-important' | 'important' | 'urgent' | 'neither';
}

export const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete project proposal', quadrant: 'urgent-important' },
    { id: '2', title: 'Review quarterly goals', quadrant: 'important' },
    { id: '3', title: 'Team standup meeting', quadrant: 'urgent' },
    { id: '4', title: 'Organize desk', quadrant: 'neither' },
  ]);
  const [newTask, setNewTask] = useState('');

  const quadrants = [
    { id: 'urgent-important', title: 'Urgent & Important', subtitle: 'Do First', color: 'from-red-500 to-pink-500' },
    { id: 'important', title: 'Important, Not Urgent', subtitle: 'Schedule', color: 'from-yellow-500 to-orange-500' },
    { id: 'urgent', title: 'Urgent, Not Important', subtitle: 'Delegate', color: 'from-blue-500 to-cyan-500' },
    { id: 'neither', title: 'Neither Urgent nor Important', subtitle: 'Eliminate', color: 'from-gray-500 to-slate-500' },
  ];

  const addTask = (quadrant: string) => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        quadrant: quadrant as Task['quadrant'],
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const getTasksForQuadrant = (quadrant: string) => {
    return tasks.filter(task => task.quadrant === quadrant);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Eisenhower Priority Matrix
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Organize your tasks by urgency and importance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrants.map((quadrant) => (
          <Card key={quadrant.id} className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <div className={`bg-gradient-to-r ${quadrant.color} text-white p-4 rounded-lg mb-4`}>
              <h3 className="font-semibold">{quadrant.title}</h3>
              <p className="text-sm opacity-90">{quadrant.subtitle}</p>
            </div>

            <div className="space-y-2 mb-4 min-h-[200px]">
              {getTasksForQuadrant(quadrant.id).map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-move transition-colors"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {task.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Add new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask(quadrant.id)}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={() => addTask(quadrant.id)}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
