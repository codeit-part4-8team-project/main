import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import useIssue from '@/hooks/useIssue';

export default function TeamIssuesPage() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { issueData } = useIssue();

  return (
    <BoardSection title="Kanban board">
      <div className="flex gap-[7.4rem]">
        {/* <GroupFilter className="mt-[3.7rem]" /> */}
        <KanbanBoard issues={issueData} page="issue" hasButton={true} />
      </div>
    </BoardSection>
  );
}
