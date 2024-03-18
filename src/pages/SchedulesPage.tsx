import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import Schedules from '@/components/SchedulesPage/Schedules';

const SchedulesPage = () => {
  const container = 'w-[192rem] bg-[ #EFEFEF]';
  return (
    <>
      <div className={container}>
        <Nav />

        <SideBar />
        <Schedules calendarType="나의 캘린더" />
      </div>
    </>
  );
};
export default SchedulesPage;
