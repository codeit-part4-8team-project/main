import React, { createContext, useState } from 'react';

/* User + Team 합친 스케줄 */
export interface Schedule {
  id: number;
  title: string;
  content: string;
  startDateTime: string;
  endDateTime: string;
  author?: Author; // import
  team?: Team; // import
  user?: User;
}
export interface User {
  name: string;
  imageUrl: string;
  username: string;
}
export interface Author {
  name: string;
  imageUrl: string;
  role: string;
  grade: string;
  username: string;
  createdDate: string;
}
export interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
}
export interface CalendarContextType {
  nowDate: Date;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  schedules?: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  filteredSchedules?: Schedule[];
  setFilteredSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  calendarType?: string;
  setCalendarType: React.Dispatch<React.SetStateAction<string>>;
  teamIds: string[]; // teamIds 추가
  setTeamIds: React.Dispatch<React.SetStateAction<string[]>>; // setTeamIds 추가 // setTeamId 추가
  loadedTeamIds: string[]; // loadedTeamIds 추가
  setLoadedTeamIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultContextValue: CalendarContextType = {
  nowDate: new Date(),
  mode: 'month',
  setMode: () => {},
  calendarType: '나',
  setCalendarType: () => {},
  schedules: [],
  setNowDate: () => {},
  setSchedules: () => [], // 스케줄 변경 함수를 빈 함수로 초기화
  filteredSchedules: [],
  setFilteredSchedules: () => {},
  teamIds: [], // 초기값 설정
  setTeamIds: () => {}, // 초기값 설정
  loadedTeamIds: [], // 초기값 설정
  setLoadedTeamIds: () => {}, // 초기값 설정
};

export const calendarContext = createContext<CalendarContextType>(defaultContextValue);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [mode, setMode] = useState('month'); // mode 상태 추가
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [calendarType, setCalendarType] = useState('나');
  const [teamIds, setTeamIds] = useState<string[]>([]); // teamId state 추가
  const [loadedTeamIds, setLoadedTeamIds] = useState<string[]>([]); // loadedTeamIds 상태 추가
  const contextValue: CalendarContextType = {
    nowDate,
    mode,
    setMode,
    calendarType,
    setCalendarType,
    setNowDate,
    schedules,
    setSchedules,
    filteredSchedules,
    setFilteredSchedules,
    teamIds, // teamIds 추가
    setTeamIds, // setTeamIds 추가
    loadedTeamIds, // loadedTeamIds 추가
    setLoadedTeamIds, // setLoadedTeamIds 추가
  };

  return <calendarContext.Provider value={contextValue}>{children}</calendarContext.Provider>;
};
