import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  quadrant: 'urgent-important' | 'important' | 'urgent' | 'neither';
  completed?: boolean;
  timeSpent?: number;
}

export const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete project proposal', quadrant: 'urgent-important' },
    { id: '2', title: 'Review quarterly goals', quadrant: 'important' },
    { id: '3', title: 'Team standup meeting', quadrant: 'urgent' },
    { id: '4', title: 'Organize desk', quadrant: 'neither' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const quadrants = [
    { id: 'urgent-important', title: 'Urgent & Important', subtitle: 'Do First', color: 'from-red-500 to-pink-500' },
    { id: 'important', title: 'Important, Not Urgent', subtitle: 'Schedule', color: 'from-yellow-500 to-orange-500' },
    { id: 'urgent', title: 'Urgent, Not Important', subtitle: 'Delegate', color: 'from-blue-500 to-cyan-500' },
    { id: 'neither', title: 'Neither Urgent nor Important', subtitle: 'Eliminate', color: 'from-gray-500 to-slate-500' },
  ];

  // Keyboard shortcut for quick add
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setShowQuickAdd(true);
      }
      if (e.key === 'Escape') {
        setShowQuickAdd(false);
        setNewTask('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const addTask = (quadrant: string) => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        quadrant: quadrant as Task['quadrant'],
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setShowQuickAdd(false);
    }
  };

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      // Move to completed tasks (you could store this in a separate array)
      setTasks(tasks.filter(t => t.id !== taskId));
      
      // Save to localStorage for task history
      const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
      completedTasks.push({
        ...task,
        completedAt: new Date(),
        timeSpent: Math.floor(Math.random() * 120) + 15, // Mock time spent
      });
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
  };

  const moveTask = (taskId: string, newQuadrant: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, quadrant: newQuadrant as Task['quadrant'] } : task
    ));
  };

  const getTasksForQuadrant = (quadrant: string) => {
    return tasks.filter(task => task.quadrant === quadrant);
  };

  const getTopThreeTasks = () => {
    return [
      ...getTasksForQuadrant('urgent-important'),
      ...getTasksForQuadrant('important'),
      ...getTasksForQuadrant('urgent'),
    ].slice(0, 3);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Eisenhower Priority Matrix
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Organize your tasks by urgency and importance • Press <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs">P</kbd> for quick add
        </p>
      </div>

      {/* Focus Today Ribbon */}
      <Card className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-200/20">
        <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
          🎯 Focus Today - Top 3 Priority Tasks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {getTopThreeTasks().map((task, index) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {task.title}
                </span>
              </div>
              <Button
                onClick={() => completeTask(task.id)}
                size="sm"
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700"
              >
                ✓
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <Card className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 z-50 p-6 bg-white dark:bg-slate-900 shadow-2xl">
          <h3 className="text-lg font-semibold mb-4">Quick Add Task</h3>
          <Input
            placeholder="Enter task title..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTask('urgent-important'); // Default to urgent-important
              }
            }}
            className="mb-4"
            autoFocus
          />
          <div className="flex gap-2">
            <Button onClick={() => addTask('urgent-important')} size="sm" className="bg-red-500">
              Urgent & Important
            </Button>
            <Button onClick={() => addTask('important')} size="sm" className="bg-yellow-500">
              Important
            </Button>
            <Button onClick={() => addTask('urgent')} size="sm" className="bg-blue-500">
              Urgent
            </Button>
            <Button onClick={() => addTask('neither')} size="sm" className="bg-gray-500">
              Neither
            </Button>
          </div>
        </Card>
      )}

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
                  className="group p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-move transition-colors"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const draggedTaskId = e.dataTransfer.getData('taskId');
                    if (draggedTaskId !== task.id) {
                      moveTask(draggedTaskId, quadrant.id);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                      {task.title}
                    </span>
                    <Button
                      onClick={() => completeTask(task.id)}
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600"
                    >
                      ✓
                    </Button>
                  </div>
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
