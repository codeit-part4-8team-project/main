import React, { createContext, useState } from 'react';
import { SchedulesData } from '@/components/SchedulesPage/Schedules';

export interface CalendarContextType {
  nowDate: Date;
  mode: string; // mode 속성 추가
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  schedules?: SchedulesData[];
  setSchedules: React.Dispatch<React.SetStateAction<SchedulesData[]>>;
  filteredSchedules?: SchedulesData[];
  setFilteredSchedules: React.Dispatch<React.SetStateAction<SchedulesData[]>>;
}

const defaultContextValue: CalendarContextType = {
  nowDate: new Date(),
  mode: 'month',
  setNowDate: () => {},
  setSchedules: () => [], // 스케줄 변경 함수를 빈 함수로 초기화
  filteredSchedules: [],
  setFilteredSchedules: () => {},
};

export const calendarContext = createContext<CalendarContextType>(defaultContextValue);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [mode, setMode] = useState('month'); // mode 상태 추가
  const [schedules, setSchedules] = useState<SchedulesData[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<SchedulesData[]>([]);

  const contextValue: CalendarContextType = {
    nowDate,
    mode,
    setNowDate,
    schedules,
    setSchedules,
    filteredSchedules,
    setFilteredSchedules,
  };

  return <calendarContext.Provider value={contextValue}>{children}</calendarContext.Provider>;
};
