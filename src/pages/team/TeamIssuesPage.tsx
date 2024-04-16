import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useIssueBoard } from '@/hooks/useIssue';

export default function TeamIssuesPage() {
  const { issueBoardData, fetchIssueBoardData } = useIssueBoard();

  const reloadIssueBoard = () => {
    fetchIssueBoardData();
  };
  return (
    <BoardSection title="Kanban board">
      <IssueProvider>
        <KanbanBoard
          issueBoardData={issueBoardData}
          type="page"
          reloadIssueBoard={reloadIssueBoard}
        />
      </IssueProvider>
    </BoardSection>
  );
}
