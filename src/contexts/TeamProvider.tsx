import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';

interface TeamContextValue {
  team: Team;
}

const TeamContext = createContext<TeamContextValue | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const teamId = Number(pathname.split('/')[2]);

  const [team, setTeam] = useState<Team>({
    id: teamId,
    name: '',
    description: '',
    color: '',
    members: [],
  });

  const { loading, error, data } = useAxios<Team[]>(
    {
      path: '/team/my-team',
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      const currentTeam = data.filter((team) => team.id === teamId);
      setTeam(currentTeam[0]);
    }
    if (error) {
      console.log('오류');
    }
  }, [teamId, data, error, loading]);

  return <TeamContext.Provider value={{ team }}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const teamInfo = useContext(TeamContext);

  if (!teamInfo) {
    throw Error('TeamProvider 안에서 사용해야 합니다.');
  }
  const { team } = teamInfo;

  return { team };
}
