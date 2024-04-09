import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import Schedules from '@/components/SchedulesPage/Schedules';

export default function TeamCalendar() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');
  return (
    <BoardSection
      title="Team calendar"
      mode="month"
      content={<Schedules calendarType="팀" teamId={teamId} />}
    />
  );
}
