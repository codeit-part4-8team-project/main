import BoardSection from '@/components/common/BoardSection';
import Schedules from '@/components/SchedulesPage/Schedules';

const TeamSchedulesPage = () => {
  return <BoardSection title="Team calendar" content={<Schedules calendarType="팀" />} />;
};

export default TeamSchedulesPage;
