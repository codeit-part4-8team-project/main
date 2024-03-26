import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { useTeam } from '@/contexts/TeamProvider';
import useIssue from '@/hooks/useIssue';

export default function TeamIssuesPage() {
  return <BoardSection title="Kanban board" content={<IssuePageContent />} />;
}

function IssuePageContent() {
  const {
    currentTeam: { id },
  } = useTeam();
  const { issueData: teamIssues } = useIssue(id);

  return (
    <div className="mt-[1.7rem] flex h-full gap-[7.4rem]">
      {/* <GroupFilter className="mt-[3.7rem]" /> */}
      <KanbanBoard issues={teamIssues} page="issue" hasButton />
    </div>
  );
}
