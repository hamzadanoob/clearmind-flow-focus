import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Trash2, Edit2 } from 'lucide-react';

interface SubGoal {
  id: string;
  title: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'long-term' | 'short-term';
  progress: number;
  subGoals: SubGoal[];
  deadline?: Date;
}

export const GoalConsole = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Degree',
      description: 'Graduate with Computer Science degree',
      type: 'long-term',
      progress: 65,
      subGoals: [
        { id: '1-1', title: 'Finish current semester', completed: true },
        { id: '1-2', title: 'Complete internship', completed: false },
        { id: '1-3', title: 'Final year project', completed: false },
      ],
      deadline: new Date('2024-12-01'),
    },
  ]);

  const [newGoal, setNewGoal] = useState<{
    title: string;
    description: string;
    type: 'long-term' | 'short-term';
  }>({
    title: '',
    description: '',
    type: 'short-term',
  });

  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  const addGoal = () => {
    if (newGoal.title.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        type: newGoal.type,
        progress: 0,
        subGoals: [],
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '', type: 'short-term' });
    }
  };

  const addSubGoal = (goalId: string, subGoalTitle: string) => {
    if (subGoalTitle.trim()) {
      setGoals(goals.map(goal => 
        goal.id === goalId 
          ? {
              ...goal,
              subGoals: [...goal.subGoals, {
                id: `${goalId}-${Date.now()}`,
                title: subGoalTitle,
                completed: false,
              }]
            }
          : goal
      ));
    }
  };

  const toggleSubGoal = (goalId: string, subGoalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? {
            ...goal,
            subGoals: goal.subGoals.map(subGoal =>
              subGoal.id === subGoalId 
                ? { ...subGoal, completed: !subGoal.completed }
                : subGoal
            ),
            progress: Math.round((goal.subGoals.filter(sg => sg.completed).length + 
                      (goal.subGoals.find(sg => sg.id === subGoalId)?.completed ? 0 : 1)) / 
                      goal.subGoals.length * 100)
          }
        : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Goal Console
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Set and track your long-term and short-term goals
        </p>
      </div>

      <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
          Add New Goal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Goal title..."
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <select
            value={newGoal.type}
            onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as 'long-term' | 'short-term' })}
            className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          >
            <option value="short-term">Short-term</option>
            <option value="long-term">Long-term</option>
          </select>
        </div>
        
        <Textarea
          placeholder="Goal description..."
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          className="mb-4"
        />
        
        <Button onClick={addGoal} className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                    {goal.title}
                  </h4>
                  <Badge variant={goal.type === 'long-term' ? 'default' : 'secondary'}>
                    {goal.type}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {goal.description}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEditingGoal(goal.id)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteGoal(goal.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-slate-700 dark:text-slate-300">Sub-goals:</h5>
              {goal.subGoals.map((subGoal) => (
                <div key={subGoal.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={subGoal.completed}
                    onChange={() => toggleSubGoal(goal.id, subGoal.id)}
                    className="rounded"
                  />
                  <span className={`text-sm ${subGoal.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {subGoal.title}
                  </span>
                </div>
              ))}
              
              <div className="flex gap-2 mt-3">
                <Input
                  placeholder="Add sub-goal..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSubGoal(goal.id, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    addSubGoal(goal.id, input.value);
                    input.value = '';
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
