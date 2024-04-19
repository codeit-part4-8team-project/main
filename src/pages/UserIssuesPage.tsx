import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Filter from '@/components/common/Filter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useIssueBoard } from '@/hooks/useIssue';
import { useMyTeams } from '@/hooks/useMyTeams';

export default function UserIssuesPage() {
  const currentCheckedTeamId = sessionStorage.getItem('filteredTeam');
  const defaultCheckedTeamId = currentCheckedTeamId && JSON.parse(currentCheckedTeamId);

  const [checkedTeamId, setCheckedTeamId] = useState<number[]>(defaultCheckedTeamId ?? []);
  const { issueBoardData, fetchIssueBoardData } = useIssueBoard(checkedTeamId);

  const { myTeams } = useMyTeams();

  const reloadIssueBoard = () => {
    fetchIssueBoardData();
  };

  useEffect(() => {
    fetchIssueBoardData();
  }, [checkedTeamId]);

  return (
    <BoardSection title="Kanban board">
      <IssueProvider>
        <div className="flex h-full w-[131rem] justify-between">
          <Filter
            myTeams={myTeams}
            checkedTeamId={checkedTeamId}
            setCheckedTeamId={setCheckedTeamId}
          />
          <KanbanBoard
            issueBoardData={issueBoardData}
            type="page"
            reloadIssueBoard={reloadIssueBoard}
          />
        </div>
      </IssueProvider>
    </BoardSection>
  );
}
