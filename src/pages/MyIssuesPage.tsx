import BoardSection from '@/components/common/BoardSection';
import PageLayout from '@/components/common/PageLayout';
import GroupFilter from '@/components/SchedulesPage/GroupFilter';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function MyIssuesPage() {
  return (
    <PageLayout>
      <BoardSection title="Kanban board" content={<IssuePageContent />} />
    </PageLayout>
  );
}

function IssuePageContent() {
  return (
    <div className="mt-[1.7rem] flex h-full gap-[7.4rem]">
      <GroupFilter className="mt-[3.7rem]" />
      <KanbanBoard page="issue" hasButton />
    </div>
  );
}
