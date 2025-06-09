
import { WelcomeCard } from './WelcomeCard';
import { QuickMatrix } from './QuickMatrix';
import { FocusQuickStart } from './FocusQuickStart';
import { TodayOverview } from './TodayOverview';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WelcomeCard />
        </div>
        <div>
          <TodayOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <QuickMatrix />
        <FocusQuickStart />
      </div>
    </div>
  );
};
