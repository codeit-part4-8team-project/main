import { useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Team } from '@/types/teamTypes';

export function useMyTeams() {
  const [myTeams, setMyTeams] = useState<Team[]>([]);

  const { loading, error, data, fetchData } = useAxios<Team[]>(
    {
      path: '/team/',
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      setMyTeams(data);
    }
    if (error) {
      throw Error('내가 속한 팀을 불러올 수 없습니다.');
    }
  }, [data, loading, error, setMyTeams]);

  return { myTeams, setMyTeams, fetchMyTeamsData: fetchData };
}
