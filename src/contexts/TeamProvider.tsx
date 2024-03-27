import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';

interface TeamContextValue {
  team: Team;
  setTeam: (team: Team) => void;
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

const TeamContext = createContext<TeamContextValue | null>(null);

export function TeamProvider({ children }: TeamProviderProps) {
  const [team, setTeam] = useState<Team>(defaultTeamValue);

  return <TeamContext.Provider value={{ team, setTeam }}>{children}</TeamContext.Provider>;
}

/* (파라미터로 id 전달 시) 해당하는 팀 정보 조회 (id, title, description, color, members) */
export function useTeam(id: number | string) {
  const teamInfo = useContext(TeamContext);

  if (!teamInfo) {
    throw Error('반드시 TeamProvider 안에서 호출해야 합니다.');
  }

  const { setTeam } = teamInfo;
  const { loading, error, data, fetchData } = useAxios<Team>({
    path: `/team/${id}`,
  });

  useEffect(() => {
    if (data && !loading) {
      setTeam(data);
    }
    if (error) {
      console.log('팀 데이터 오류');
    }
  }, [id, data, error, loading]);

  useEffect(() => {
    fetchData();
  }, [id]);

  return teamInfo;
}
