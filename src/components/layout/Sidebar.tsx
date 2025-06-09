
import { Circle, Square, Timer, BookOpen, FileText, DollarSign, Target, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed }: SidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Circle },
    { id: 'matrix', label: 'Priority Matrix', icon: Square },
    { id: 'focus', label: 'Focus Mode', icon: Timer },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/20 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } z-40`}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6"
        >
          <Menu className="w-4 h-4" />
        </Button>

        {!collapsed && (
          <div className="mb-8 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-200/20 dark:border-blue-700/20">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">North Star Goal</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Build a sustainable productivity system
            </p>
            <Progress value={68} className="h-2" />
            <span className="text-xs text-slate-500 mt-1 block">68% complete</span>
          </div>
        )}

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
