import BoardSection from '@/components/common/BoardSection';
import PageLayout from '@/components/common/PageLayout';
import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function MainPage() {
  return (
    <PageLayout>
      <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
        <MainSchedules />
        <AnnouncementBoard />
        <BoardSection title="Kanban board" content={<KanbanBoard />} />
      </div>
    </PageLayout>
  );
}
