
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { GoalConsole } from '@/components/goals/GoalConsole';
import { EisenhowerMatrix } from '@/components/matrix/EisenhowerMatrix';
import { FocusMode } from '@/components/focus/FocusMode';
import { Journal } from '@/components/journal/Journal';
import { Notes } from '@/components/notes/Notes';
import { NamajTracker } from '@/components/namaj/NamajTracker';
import { Expenses } from '@/components/expenses/Expenses';
import { TaskHistory } from '@/components/tasks/TaskHistory';
import { MotivationCards } from '@/components/motivation/MotivationCards';
import { Analytics } from '@/components/analytics/Analytics';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'goals':
        return <GoalConsole />;
      case 'matrix':
        return <EisenhowerMatrix />;
      case 'focus':
        return <FocusMode />;
      case 'journal':
        return <Journal />;
      case 'notes':
        return <Notes />;
      case 'namaj':
        return <NamajTracker />;
      case 'expenses':
        return <Expenses />;
      case 'history':
        return <TaskHistory />;
      case 'motivation':
        return <MotivationCards />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <TopNavigation />
      
      <div className="flex">
        <Sidebar 
          activeView={activeView}
          setActiveView={setActiveView}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
