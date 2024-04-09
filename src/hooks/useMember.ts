import { DEFAULT_PAGE_DATA } from '@/constants/defaultPageData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from './useAxios';
import { Members } from '@/types/teamTypes';

export function useMemberPage(page?: number) {
  const [memberPageData, setMemberPageData] = useState<Members>(DEFAULT_PAGE_DATA);

  const query = `?page=${page || 1}`;

  const { teamId } = useParams();

  const { data, error, loading, fetchData } = useAxios<Members>({
    path: `/member/${teamId}${query}`,
  });

  useEffect(() => {
    if (data && !loading) {
      setMemberPageData(data);
    }
    if (error) {
      throw Error('팀정보를 불러오지 못했습니다.');
    }
  }, [loading, error, data]);

  return { memberPageData, fetchMemberPageData: fetchData };
}
