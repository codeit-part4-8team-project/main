import React, { createContext, useState } from 'react';

//import { SchedulesData } from '@/components/SchedulesPage/Schedules';

export interface SchedulesData {
  id: number;
  title: string;
  content: string;
  startDateTime: string;
  endDateTime: string;
  author?: {
    name: string;
    imageUrl: string;
    role: string;
    grade: string;
    username: string;
    createdDate: string;
  };
  teamResponse?: {
    id: number;
    name: string;
    description: string;
    color: string;
  };
}
export interface CalendarContextType {
  nowDate: Date;
  mode: string;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  schedules?: SchedulesData[];
  setSchedules: React.Dispatch<React.SetStateAction<SchedulesData[]>>;
  filteredSchedules?: SchedulesData[];
  setFilteredSchedules: React.Dispatch<React.SetStateAction<SchedulesData[]>>;
  calendarType?: string;
}

const defaultContextValue: CalendarContextType = {
  nowDate: new Date(),
  mode: 'month',
  calendarType: '나의 캘린더',
  schedules: [],
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
  const [calendarType, setCalendarType] = useState('나의 캘린더');
  const contextValue: CalendarContextType = {
    nowDate,
    mode,
    calendarType,
    setNowDate,
    schedules,
    setSchedules,
    filteredSchedules,
    setFilteredSchedules,
  };

  return <calendarContext.Provider value={contextValue}>{children}</calendarContext.Provider>;
};
