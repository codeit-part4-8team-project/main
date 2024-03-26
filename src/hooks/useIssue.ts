import { useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Issues } from '@/types/issueTypes';

export default function useIssue(teamId?: number, issueId?: number) {
  const [issueData, setIssueData] = useState<Issues>({
    todoIssues: [],
    progressIssues: [],
    doneIssues: [],
  });

  let path = '';
  if (!teamId) {
    path = `/user/my-issue`; // 유저의 이슈 목록 조회
  } else if (!issueId) {
    path = `/${teamId}/issue/`; // 팀의 이슈 목록 조회
  } else {
    path = `/${teamId}/issue/${issueId}`; // 팀의 특정 이슈 조회
  }

  const { loading, error, data, fetchData } = useAxios<Issues>(
    {
      path,
      method: 'GET', // TODO 가능하면 다른 요청들도 가능하도록
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      setIssueData(data);
    }
    if (error) {
      console.log('issue get 요청 에러');
    }
  }, [loading, error, data]);

  return { issueData, fetchIssueData: fetchData };
}
