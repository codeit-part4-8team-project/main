import clsx from 'clsx';
import BoardSection from '@/components/common/BoardSection';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import Schedules from '@/components/SchedulesPage/Schedules';

const TeamSchedulesPage = () => {
  return (
    // <div className="bg-[ #EFEFEF] w-[192rem]">
    //   <Nav />
    //   <div className={clsx('flex')}>
    //     <SideBar />
    //     <Schedules calendarType="팀 캘린더" />
    //   </div>
    // </div>

    <BoardSection title="Team calendar" content={<Schedules calendarType="팀 캘린더" />} />
  );
};

export default TeamSchedulesPage;
