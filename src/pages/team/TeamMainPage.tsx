import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementList from '@/components/announcement/AnnouncementList';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { IssueProvider } from '@/contexts/IssueProvider';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import { useIssueBoard } from '@/hooks/useIssue';

export default function TeamMainPage() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { issueBoardData, fetchIssueBoardData } = useIssueBoard();
  const { announcementData, fetchAnnouncementData } = useAnnouncement();

  const reloadIssueBoard = () => {
    fetchIssueBoardData();
  };

  useEffect(() => {
    fetchAnnouncementData();
    fetchIssueBoardData();
  }, [teamId]);

  return (
    <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
      <BoardSection
        title="Team calendar"
        mode="week"
        content={<MainSchedules teamId={Number(teamId)} calendarType="팀" />}
      />
      <AnnouncementList announcements={announcementData} />
      <BoardSection
        title="Kanban board"
        content={
          <IssueProvider>
            <KanbanBoard
              reloadIssueBoard={reloadIssueBoard}
              issueBoardData={issueBoardData}
              type="main"
            />
          </IssueProvider>
        }
      />
    </div>
  );
}
