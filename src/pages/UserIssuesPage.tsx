import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Filter from '@/components/common/Filter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useIssueBoard } from '@/hooks/useIssue';
import { useMyTeams } from '@/hooks/useMyTeams';

export default function UserIssuesPage() {
  const [checkedTeamId, setCheckedTeamId] = useState<number[]>([]);
  const { issueBoardData, fetchIssueBoardData } = useIssueBoard(checkedTeamId);

  const { myTeams } = useMyTeams();

  useEffect(() => {
    fetchIssueBoardData();
  }, [checkedTeamId]);

  return (
    <BoardSection title="Kanban board">
      <IssueProvider>
        <Filter
          myTeams={myTeams}
          checkedTeamId={checkedTeamId}
          setCheckedTeamId={setCheckedTeamId}
          className="absolute z-40 mr-[7.4rem]"
        />
        <KanbanBoard issueBoardData={issueBoardData} type="page" />
      </IssueProvider>
    </BoardSection>
  );
}
