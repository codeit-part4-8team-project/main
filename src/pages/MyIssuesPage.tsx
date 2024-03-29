import BoardSection from '@/components/common/BoardSection';
// import GroupFilter from '@/components/SchedulesPage/GroupFilter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import useIssue from '@/hooks/useIssue';

export default function MyIssuesPage() {
  return <BoardSection title="Kanban board" content={<IssuePageContent />} />;
}

function IssuePageContent() {
  const { issueData } = useIssue();

  return (
    <div className="mt-[1.7rem] flex h-full gap-[7.4rem]">
      {/* <GroupFilter className="mt-[3.7rem]" /> */}
      <KanbanBoard issues={issueData} page="issue" hasButton />
    </div>
  );
}
