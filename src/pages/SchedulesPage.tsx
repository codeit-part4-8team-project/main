import BoardSection from '@/components/common/BoardSection';
import Schedules from '@/components/SchedulesPage/Schedules';

const SchedulesPage = () => {
  return <BoardSection title="My calendar" content={<Schedules calendarType="나" />} />;
};
export default SchedulesPage;
