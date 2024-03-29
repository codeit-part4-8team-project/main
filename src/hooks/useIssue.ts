import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';
import { Issues } from '@/types/issueTypes';

export default function useIssue(issueId?: number) {
  const [issueData, setIssueData] = useState<Issues>({
    todoIssues: [],
    progressIssues: [],
    doneIssues: [],
  });

  const { userId, teamId } = useParams();

  let path = '';
  if (issueId) {
    path = `/issue/${issueId}`; // 특정 이슈 조회
  } else {
    if (userId) {
      path = `/issue/user`; // 유저의 통합 이슈 보드 조회 @ UserIssuesPage
    } else if (teamId) {
      path = `/issue/team/${teamId}`; // 팀의 이슈 보드 조회 @ TeamIssuesPage
    } else {
      throw Error('이슈 데이터를 가져올 수 있는 페이지가 아닙니다.');
    }
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
      throw Error('이슈를 불러오지 못했습니다.');
    }
  }, [loading, error, data]);

  return { issueData, fetchIssueData: fetchData };
}
