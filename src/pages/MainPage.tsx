import BoardSection from '@/components/common/BoardSection';
import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementList from '@/components/announcement/AnnouncementList';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import useAnnouncement from '@/hooks/useAnnouncement';
import useIssue from '@/hooks/useIssue';

export default function MainPage() {
  const { issueData: myIssues } = useIssue();
  const { announcementData } = useAnnouncement();

  return (
    <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
      <MainSchedules />
      <AnnouncementList announcements={announcementData} />
      <BoardSection title="Kanban board" content={<KanbanBoard issues={myIssues} page="main" />} />
    </div>
  );
}
