import BoardSection from '@/components/common/BoardSection';
import Schedules from '@/components/SchedulesPage/Schedules';

export default function TeamCalendar() {
  return <BoardSection title="Team calendar" content={<Schedules calendarType="팀 캘린더" />} />;
}
