import { useEffect } from 'react';
//import { useContext } from 'react';
import { Team } from '@/contexts/CalenarProvider';
import { useAxios } from '@/hooks/useAxios';

const useFetchTeamData = (setLoadedTeamIds: React.Dispatch<React.SetStateAction<string[]>>) => {
  const {
    loading,
    error,
    data: teamData,
    fetchData: fetchTeamData,
  } = useAxios<Team[]>({ path: '/team/my-team' }, true);

  useEffect(() => {
    if (!loading && !error && teamData) {
      const teamIds = teamData.map((team) => team.id);
      setLoadedTeamIds(teamIds);
    }
  }, [loading, error, teamData, setLoadedTeamIds]);
};

export default useFetchTeamData;
