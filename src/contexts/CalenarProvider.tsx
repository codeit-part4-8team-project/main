import React, { createContext, useState } from 'react';

export interface CalendarContextType {
  nowDate: Date;

  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

const defaultContextValue: CalendarContextType = {
  nowDate: new Date(),

  setNowDate: () => {},
};

export const calendarContext = createContext<CalendarContextType>(defaultContextValue);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nowDate, setNowDate] = useState<Date>(new Date());

  const contextValue: CalendarContextType = {
    nowDate,

    setNowDate,
  };

  return <calendarContext.Provider value={contextValue}>{children}</calendarContext.Provider>;
};
