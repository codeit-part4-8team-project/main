import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import MainSchedules from '@/components/MainPage/MainSchedules';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function TeamHome() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  return (
    <div className="grid h-full w-full grid-cols-[107.4fr_37.8fr] grid-rows-[33.7fr_52.5fr] gap-[5.2rem]">
      <BoardSection
        title="Team calendar"
        mode="week"
        content={<MainSchedules teamId={teamId} calendarType="팀" />}
      />

      <BoardSection title="Kanban board" content={<KanbanBoard page="team" />} />
    </div>
  );
}
