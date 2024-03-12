import clsx from 'clsx';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import Schedules from '@/components/SchedulesPage/Schedules';

const SchedulesPage = () => {
  return (
    <div className=" h-full w-full bg-[#EFEFEF] pb-[4.1rem] pl-[28.4rem] pr-[2.4rem] pt-[8.6rem]">
      <Nav />
      <div className={clsx(' flex ')}>
        <SideBar />
        <Schedules calendarType="나의 캘린더" />
      </div>
    </div>
  );
};
export default SchedulesPage;
