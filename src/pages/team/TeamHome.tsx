import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import useIssue from '@/hooks/useIssue';

export default function TeamHome() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { issueData: teamIssues } = useIssue(teamId);

  return (
    <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
      <BoardSection title="My calendar" content={<MainSchedules />} />
      <AnnouncementBoard />
      <BoardSection
        title="Kanban board"
        content={<KanbanBoard issues={teamIssues} page="team" />}
      />
    </div>
  );
}
