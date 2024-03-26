import BoardSection from '@/components/common/BoardSection';
import MainSchedules from '@/components/MainPage/MainSchedules';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { useTeam } from '@/contexts/TeamProvider';
import useIssue from '@/hooks/useIssue';

export default function TeamHome() {
  const {
    currentTeam: { id },
  } = useTeam();
  const { issueData: teamIssues } = useIssue(id);

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
