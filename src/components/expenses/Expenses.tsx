
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', amount: 15.50, category: 'Food', description: 'Lunch', date: new Date() },
    { id: '2', amount: 45.00, category: 'Transport', description: 'Gas', date: new Date() },
  ]);

  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
  });

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

  const addExpense = () => {
    if (newExpense.amount && newExpense.category) {
      const expense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: new Date(),
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({ amount: '', category: '', description: '' });
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const todayExpenses = expenses
    .filter(expense => expense.date.toDateString() === new Date().toDateString())
    .reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = categories.map(category => ({
    category,
    total: expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  })).filter(item => item.total > 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Expense Tracker
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Keep track of your daily spending habits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200/20">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
            Today's Spending
          </h3>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">
            ${todayExpenses.toFixed(2)}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200/20">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            ${totalExpenses.toFixed(2)}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/20">
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
            Categories
          </h3>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            {categoryTotals.length}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Recent Expenses
            </h3>
            
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">{expense.category}</Badge>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {expense.description || 'No description'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {expense.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      ${expense.amount.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Add Expense
            </h3>
            
            <div className="space-y-4">
              <Input
                placeholder="Amount ($)"
                type="number"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
              
              <Select
                value={newExpense.category}
                onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Description (optional)"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />
              
              <Button
                onClick={addExpense}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Category Breakdown
            </h3>
            
            <div className="space-y-3">
              {categoryTotals.map((item) => (
                <div key={item.category} className="flex justify-between items-center">
                  <Badge variant="outline">{item.category}</Badge>
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    ${item.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
