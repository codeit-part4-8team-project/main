import { ReactNode, createContext, useState } from 'react';
import { TabType } from '@/types/tabTypes';

interface TabContextValue {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

interface TabProviderProps {
  defaultValue: TabType;
  children: ReactNode;
}

export const TabContext = createContext<TabContextValue | null>(null);

export function TabProvider({ defaultValue, children }: TabProviderProps) {
  const [currentTab, setCurrentTab] = useState(defaultValue);

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>{children}</TabContext.Provider>
  );
}
