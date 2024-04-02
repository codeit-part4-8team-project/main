import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import FloatingButton from '@/components/common/FloatingButton';
// import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementList from '@/components/announcement/AnnouncementList';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import { useIssueBoard } from '@/hooks/useIssue';

export default function UserMainPage() {
  const { userId } = useParams();
  const { issueBoardData } = useIssueBoard();
  const { announcementData } = useAnnouncement();

  return (
    <>
      <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
        {/* <BoardSection
          title="My calendar"
          mode="week"
          content={<MainSchedules calendarType="나" />}
        /> */}
        <div></div>
        <AnnouncementList announcements={announcementData} />
        <BoardSection
          title="Kanban board"
          content={
            <IssueProvider>
              <KanbanBoard issues={issueBoardData} type="main" />
            </IssueProvider>
          }
        />
      </div>
      <FloatingButton link={`/user/${userId}/post`} />
    </>
  );
}
