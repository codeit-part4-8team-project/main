import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import useIssue from '@/hooks/useIssue';

export default function TeamIssuesPage() {
  return <BoardSection title="Kanban board" content={<IssuePageContent />} />;
}

function IssuePageContent() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { issueData } = useIssue();

  return (
    <div className="mt-[1.7rem] flex h-full gap-[7.4rem]">
      {/* <GroupFilter className="mt-[3.7rem]" /> */}
      <KanbanBoard issues={issueData} page="issue" hasButton />
    </div>
  );
}
