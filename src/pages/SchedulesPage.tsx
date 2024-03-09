import clsx from 'clsx';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/SideBar/SideBar';
import Schedules from '@/components/SchedulesPage/Schedules';

const SchedulesPage = () => {
  return (
    <div>
      <Nav />
      <div className={clsx('flex')}>
        <SideBar />
        <Schedules calendarType="나의" />
      </div>
    </div>
  );
};
export default SchedulesPage;
