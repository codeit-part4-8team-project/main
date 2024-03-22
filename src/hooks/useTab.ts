import { useContext } from 'react';
import { TabContext } from '@/contexts/TabProvider';

export default function useTab() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('반드시 TabProvider 안에서 사용해야 합니다');
  }

  const { currentTab, setCurrentTab } = context;
  return { currentTab, setCurrentTab };
}
