
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, Clock } from 'lucide-react';

interface CompletedTask {
  id: string;
  title: string;
  category: 'urgent-important' | 'important' | 'urgent' | 'neither';
  completedAt: Date;
  timeSpent?: number;
  notes?: string;
}

export const TaskHistory = () => {
  const [completedTasks] = useState<CompletedTask[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      category: 'urgent-important',
      completedAt: new Date(Date.now() - 86400000), // Yesterday
      timeSpent: 120,
      notes: 'Finished ahead of deadline',
    },
    {
      id: '2',
      title: 'Review quarterly goals',
      category: 'important',
      completedAt: new Date(Date.now() - 172800000), // 2 days ago
      timeSpent: 45,
    },
    {
      id: '3',
      title: 'Team standup meeting',
      category: 'urgent',
      completedAt: new Date(Date.now() - 259200000), // 3 days ago
      timeSpent: 30,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTasks = completedTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || task.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'urgent-important': return 'bg-red-100 text-red-800';
      case 'important': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-blue-100 text-blue-800';
      case 'neither': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'urgent-important': return 'Urgent & Important';
      case 'important': return 'Important';
      case 'urgent': return 'Urgent';
      case 'neither': return 'Neither';
      default: return category;
    }
  };

  const formatTimeSpent = (minutes?: number) => {
    if (!minutes) return 'No time logged';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Task History
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Review your completed tasks and achievements
        </p>
      </div>

      <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search completed tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          >
            <option value="all">All Categories</option>
            <option value="urgent-important">Urgent & Important</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
            <option value="neither">Neither</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">
                No completed tasks found matching your criteria
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getCategoryColor(task.category)}>
                        {getCategoryLabel(task.category)}
                      </Badge>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {task.completedAt.toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTimeSpent(task.timeSpent)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {task.notes && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded">
                    {task.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
            📊 Quick Stats
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600 dark:text-blue-400">Total Tasks:</span>
              <span className="ml-2 font-semibold">{filteredTasks.length}</span>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">Time Spent:</span>
              <span className="ml-2 font-semibold">
                {formatTimeSpent(filteredTasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0))}
              </span>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">This Week:</span>
              <span className="ml-2 font-semibold">
                {filteredTasks.filter(task => 
                  new Date(task.completedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
                ).length}
              </span>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">Avg/Day:</span>
              <span className="ml-2 font-semibold">
                {Math.round(filteredTasks.length / 7 * 10) / 10}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
