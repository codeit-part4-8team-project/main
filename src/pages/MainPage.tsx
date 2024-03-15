import BoardSection from '@/components/common/BoardSection';
import PageLayout from '@/components/common/PageLayout';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function MainPage() {
  return (
    <PageLayout>
      <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
        <BoardSection title="My calendar" content={<Temp />} />
        <AnnouncementBoard />
        <BoardSection title="Kanban board" content={<KanbanBoard />} />
      </div>
    </PageLayout>
  );
}

function Temp() {
  return <div className="h-[29.1rem] w-full shrink-0 border border-black"></div>;
}
