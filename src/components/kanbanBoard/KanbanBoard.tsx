import IssueList from '@/components/kanbanBoard/IssueList';

interface KanbanBoardItemProps {
  title: string;
}

export default function KanbanBoard() {
  return (
    <div className="flex h-full w-full justify-between gap-[2.4rem]">
      <KanbanBoardItem title="할 일 3" />
      <KanbanBoardItem title="진행 중 1" />
      <KanbanBoardItem title="백로그 1" />
    </div>
  );
}

function KanbanBoardItem({ title }: KanbanBoardItemProps) {
  return (
    <div className="flex h-[47.9rem] w-full flex-col gap-[2.4rem] rounded-[2.4rem] bg-[#FCFCFC] px-12 pt-12 shadow-[0_0_1rem_0_rgba(17,17,17,0.05)]">
      <span className="text-body2-bold text-gray80">{title}</span>
      <IssueList />
    </div>
  );
}
