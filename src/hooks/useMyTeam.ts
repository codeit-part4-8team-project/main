import { DEFAULT_PAGE_DATA } from '@/constants/defaultPageData';
import { useEffect } from 'react';
import { useAxios } from './useAxios';
import { MyTeams } from '@/types/teamTypes';

export function useMyTeamPage(page?: number) {
  const query = `?page=${page || 1}`;

  const { error, data, fetchData } = useAxios<MyTeams>({
    path: `/team/my-team${query}`,
  });

  useEffect(() => {
    if (error) {
      throw Error('팀 정보를 불러오는데 실패했습니다.');
    }
  }, [error]);

  return { myTeamPageData: data || DEFAULT_PAGE_DATA, fetchMyTeamPageData: fetchData };
}
