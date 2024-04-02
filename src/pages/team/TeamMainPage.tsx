import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import FloatingButton from '@/components/common/FloatingButton';
// import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementList from '@/components/announcement/AnnouncementList';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useTeam } from '@/contexts/TeamProvider';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import { useIssueBoard } from '@/hooks/useIssue';

export default function TeamMainPage() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { team } = useTeam(teamId);
  const { issueBoardData, fetchIssueBoardData } = useIssueBoard();
  const { announcementData, fetchAnnouncementData } = useAnnouncement();

  useEffect(() => {
    fetchAnnouncementData();
    fetchIssueBoardData();
  }, [teamId]);

  return (
    <>
      <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
        {/* <BoardSection
          title="Team calendar"
          mode="week"
          content={<MainSchedules teamId={teamId} calendarType="팀" />}
        /> */}
        <div></div>
        <AnnouncementList announcements={announcementData} team={team} />
        <BoardSection
          title="Kanban board"
          content={
            <IssueProvider>
              <KanbanBoard issues={issueBoardData} type="main" team={team} />
            </IssueProvider>
          }
        />
      </div>
      <FloatingButton link={`/team/${teamId}/post`} />
    </>
  );
}
