import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useIssueBoard } from '@/hooks/useIssue';

export default function UserIssuesPage() {
  const { issueBoardData } = useIssueBoard();

  return (
    <BoardSection title="Kanban board">
      <IssueProvider>
        <KanbanBoard issues={issueBoardData} type="page" />
      </IssueProvider>
    </BoardSection>
  );
}
