import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';
import { Issue, Issues } from '@/types/issueTypes';

export function useIssueBoard(checkedTeamId?: number[]) {
  const [issueBoardData, setIssueBoardData] = useState<Issues>({
    todoIssues: [],
    progressIssues: [],
    doneIssues: [],
  });

  const { userId, teamId } = useParams();
  console.log('userId', userId);
  console.log('teamId', teamId);
  let query = '';
  checkedTeamId?.forEach((teamId, idx) => {
    if (idx === 0) query += `?teamIds=${teamId}`;
    else query += `&teamIds=${teamId}`;
  });

  let path;
  if (userId) {
    path = `/issue/user${query}`; // 유저의 통합 이슈 보드 조회 @ UserIssuesPage
  } else if (teamId) {
    path = `/issue/team/${teamId}`; // 팀의 이슈 보드 조회 @ TeamIssuesPage
  } else {
    throw Error('이슈 데이터를 가져올 수 있는 페이지가 아닙니다.');
  }

  const {
    loading,
    error,
    data,
    fetchData: fetchIssueBoardData,
  } = useAxios<Issues>(
    {
      path,
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      setIssueBoardData(data);
    }
    if (error) {
      throw Error('이슈를 불러오지 못했습니다.');
    }
  }, [checkedTeamId, loading, error, data]);

  return { checkedTeamId, issueBoardData, fetchIssueBoardData };
}

export function useIssue(issueId?: number) {
  const [issueData, setIssueData] = useState<Issue>();

  const path = `/issue/${issueId}`; // 특정 이슈 조회

  const { loading, error, data, fetchData } = useAxios<Issue>(
    {
      path,
      method: 'GET',
    },
    Boolean(issueId),
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
