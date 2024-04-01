import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { useTeam } from '@/contexts/TeamProvider';
import { useIssueBoard } from '@/hooks/useIssue';

export default function TeamIssuesPage() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { team } = useTeam(teamId);
  const { issueBoardData } = useIssueBoard();

  return (
    <BoardSection title="Kanban board">
      <KanbanBoard issues={issueBoardData} type="page" team={team} />
    </BoardSection>
  );
}
