import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Filter from '@/components/common/Filter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useIssueBoard } from '@/hooks/useIssue';
import { Issues } from '@/types/issueTypes';

export default function UserIssuesPage() {
  const { issueBoardData, checkedTeamId, setCheckedTeamId } = useIssueBoard();
  const [issueData, setIssueData] = useState<Issues>(issueBoardData);

  useEffect(() => {
    setIssueData(issueBoardData);
  }, [checkedTeamId, issueBoardData]);

  return (
    <BoardSection title="Kanban board">
      <IssueProvider>
        <Filter
          checkedTeamId={checkedTeamId || []}
          setCheckedTeamId={setCheckedTeamId || (() => {})}
        />
        <KanbanBoard issues={issueData} type="page" />
      </IssueProvider>
    </BoardSection>
  );
}
