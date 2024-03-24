import BoardSection from '@/components/common/BoardSection';
// import GroupFilter from '@/components/SchedulesPage/GroupFilter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function MyIssuesPage() {
  return <BoardSection title="Kanban board" content={<IssuePageContent />} />;
}

function IssuePageContent() {
  return (
    <div className="mt-[1.7rem] flex h-full gap-[7.4rem]">
      {/* <GroupFilter className="mt-[3.7rem]" /> */}
      <KanbanBoard page="issue" hasButton />
    </div>
  );
}
