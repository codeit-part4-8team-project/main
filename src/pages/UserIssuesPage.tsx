import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import useIssue from '@/hooks/useIssue';

export default function UserIssuesPage() {
  const { issueData } = useIssue();

  return (
    <BoardSection title="Kanban board">
      <KanbanBoard issues={issueData} type="page" />
    </BoardSection>
  );
}
