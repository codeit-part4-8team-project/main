import React, { createContext, useState } from 'react';

export interface CalendarContextType {
  nowDate: Date;
  mode: 'month' | 'week';

  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

const defaultContextValue: CalendarContextType = {
  nowDate: new Date(),
  mode: 'month',

  setNowDate: () => {},
};

export const calendarContext = createContext<CalendarContextType>(defaultContextValue);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'month' | 'week'>('month');

  const contextValue: CalendarContextType = {
    nowDate,
    mode,

    setNowDate,
  };

  return <calendarContext.Provider value={contextValue}>{children}</calendarContext.Provider>;
};
