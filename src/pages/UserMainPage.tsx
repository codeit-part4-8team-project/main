import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import FloatingButton from '@/components/common/FloatingButton';
import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementList from '@/components/announcement/AnnouncementList';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import { useIssueBoard } from '@/hooks/useIssue';

export default function UserMainPage() {
  const { userId } = useParams();
  const { issueBoardData } = useIssueBoard();
  const { announcementData } = useAnnouncement();

  return (
    <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
      <MainSchedules />
      <AnnouncementList announcements={announcementData} />
      <BoardSection
        title="Kanban board"
        content={<KanbanBoard issues={issueBoardData} type="main" />}
      />
      <FloatingButton link={`/user/${userId}/post`} />
    </div>
  );
}
