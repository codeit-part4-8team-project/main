import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';

interface TeamContextValue {
  currentTeam: Team;
  currentPage: string;
}

interface TeamProviderProps {
  children: ReactNode;
  id?: number;
}

const defaultTeamValue: Team = {
  id: 0,
  name: '',
  description: '',
  color: '',
  members: [],
};

const TeamContext = createContext<TeamContextValue>({
  currentTeam: defaultTeamValue,
  currentPage: '',
});

/* 
  TeamContext에서 가져올 수 있는 것:
    1. 현재 경로의 팀 정보
    2. 현재 경로의 페이지 정보
    3. (파라미터로 id 전달 시) 해당하는 팀 정보 (id, title, description, color, members)
*/

export function TeamProvider({ children, id }: TeamProviderProps) {
  const [currentTeam, setCurrentTeam] = useState<Team>(defaultTeamValue);

  const { pathname } = useLocation();

  const currentPage = pathname.split('/').reverse()[0];
  const teamId = id || Number(pathname.split('/')[2]);

  const { loading, error, data, fetchData } = useAxios<Team>({
    path: `/team/${teamId}`,
  });

  useEffect(() => {
    if (data && !loading) {
      setCurrentTeam(data);
    }
    if (error) {
      console.log('팀 데이터 오류');
    }
  }, [teamId, data, error, loading]);

  useEffect(() => {
    fetchData();
  }, [teamId]);

  return (
    <TeamContext.Provider value={{ currentTeam, currentPage }}>{children}</TeamContext.Provider>
  );
}

export function useTeam() {
  const teamInfo = useContext(TeamContext);

  if (!teamInfo) {
    throw Error('반드시 TeamProvider 안에서 호출해야 합니다.');
  }

  return teamInfo;
}
