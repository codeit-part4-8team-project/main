import BoardSection from '@/components/common/BoardSection';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function TeamKanban() {
  return (
    <div>
      <BoardSection title="Kanban board" content={<IssuePageContent />} />
    </div>
  );
}

function IssuePageContent() {
  return (
    <div className="mt-[1.7rem] flex h-full gap-[7.4rem]">
      {/* <GroupFilter className="mt-[3.7rem]" /> */}
      <KanbanBoard page="issue" hasButton />
    </div>
  );
}
