import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
// import Filter from '@/components/common/Filter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useAxios } from '@/hooks/useAxios';
import { useIssueBoard } from '@/hooks/useIssue';
import { Issues } from '@/types/issueTypes';
import { Team } from '@/types/teamTypes';

export default function UserIssuesPage() {
  const { issueBoardData, checkedTeamId /* , setCheckedTeamId */ } = useIssueBoard();
  const [issueData, setIssueData] = useState<Issues>(issueBoardData);

  useEffect(() => {
    setIssueData(issueBoardData);
  }, [checkedTeamId, issueBoardData]);

  const [teams, setTeams] = useState<Team[]>([]);

  console.log('teams', teams); /* TODO 에러 지우는 용도 - 삭제 예정 */

  const { loading, error, data } = useAxios<Team[]>(
    {
      path: '/team/',
      method: 'GET',
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      setTeams(data);
    }
    if (error) {
      throw Error('내가 속한 팀을 불러올 수 없습니다.');
    }
  }, [data, loading, error]);

  return (
    <BoardSection title="Kanban board">
      <IssueProvider>
        <div className="flex h-full">
          {/* <Filter
            teamList={teams}
            checkedTeamId={checkedTeamId || []}
            setCheckedTeamId={setCheckedTeamId || (() => {})}
            className="mr-[7.4rem]"
          /> */}
          <KanbanBoard issues={issueData} type="page" />
        </div>
      </IssueProvider>
    </BoardSection>
  );
}
