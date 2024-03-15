import clsx from 'clsx';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/SideBar/SideBar';
import Schedules from '@/components/SchedulesPage/Schedules';

const SchedulesPage = () => {
  const container = 'bg-[ #EFEFEF]';
  return (
    <>
      <div className={container}>
        <Nav />
        <div className={clsx(' flex ')}>
          <SideBar />
          <Schedules calendarType="나의 캘린더" />
        </div>
      </div>
    </>
  );
};
export default SchedulesPage;
