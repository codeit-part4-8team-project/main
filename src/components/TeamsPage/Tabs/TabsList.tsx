import clsx from 'clsx';
import { TABS } from '@/components/TeamsPage/Tabs/constants';
import useTab from '@/hooks/useTab';
import DividerIcon from '@/assets/DividerIcon';

interface TabsListProps {
  className: string;
}

export default function TabsList({ className }: TabsListProps) {
  const { currentTab, setCurrentTab } = useTab();

  return (
    <div className={`flex items-center gap-[2.4rem] ${className}`}>
      {TABS.map((tab, idx) => {
        const isCurrent = tab === currentTab ? true : false;

        return (
          <>
            {idx !== 0 && <DividerIcon />}
            <button
              type="button"
              onClick={() => setCurrentTab(tab)}
              className={clsx(
                isCurrent ? 'text-body3-bold text-gray100' : 'text-body3-medium text-gray50',
              )}
            >
              {tab}
            </button>
          </>
        );
      })}
    </div>
  );
}
