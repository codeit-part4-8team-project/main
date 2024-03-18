import CalendarIcon from '../../../public/assets/calendar-dark.svg';
import ControlDate from '@/components/SchedulesPage/ControlDate';
import DateBox from '@/components/SchedulesPage/DateBox';

function MainSchedules() {
  const Container = 'w-full m-[1.5rem] rounded-[2.4rem]';
  return (
    <>
      <div className=" bg-[#F7F7F7]">
        <div className="flex gap-[67.5rem] whitespace-nowrap">
          <div className="flex items-center  gap-[0.9rem] font-rammetto text-[1.8rem] text-[#292929]">
            <img src={CalendarIcon} alt="캘린더 아이콘" />
            My calendar
          </div>
          <ControlDate mode="week" />
        </div>
        <div className={Container}>
          <div>
            <DateBox mode="week" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSchedules;
