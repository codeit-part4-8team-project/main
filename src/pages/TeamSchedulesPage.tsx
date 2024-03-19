import clsx from 'clsx';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/SideBar/SideBar';
import Schedules from '@/components/SchedulesPage/Schedules';

const TeamSchedulesPage = () => {
  return (
    <div className="bg-[ #EFEFEF] w-[192rem]">
      <Nav />
      <div className={clsx('flex')}>
        <SideBar />
        <Schedules calendarType="팀 캘린더 " />
      </div>
    </div>
  );
};

export default TeamSchedulesPage;
