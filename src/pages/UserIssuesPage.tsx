import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
// import Filter from '@/components/common/Filter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useIssueBoard } from '@/hooks/useIssue';
import { Issues } from '@/types/issueTypes';

export default function UserIssuesPage() {
  const { issueBoardData, checkedTeamId /* , setCheckedTeamId */ } = useIssueBoard();
  const [issueData, setIssueData] = useState<Issues>(issueBoardData);

  useEffect(() => {
    setIssueData(issueBoardData);
  }, [checkedTeamId, issueBoardData]);

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
