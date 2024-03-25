import BoardSection from '@/components/common/BoardSection';
import Schedules from '@/components/SchedulesPage/Schedules';

const SchedulesPage = () => {
  return <BoardSection title="My calendar" content={<Schedules calendarType="나의 캘린더" />} />;
};
export default SchedulesPage;
