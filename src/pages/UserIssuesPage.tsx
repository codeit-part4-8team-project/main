import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { useIssueBoard } from '@/hooks/useIssue';

export default function UserIssuesPage() {
  const { issueBoardData } = useIssueBoard();

  return (
    <BoardSection title="Kanban board">
      <KanbanBoard issues={issueBoardData} type="page" />
    </BoardSection>
  );
}
