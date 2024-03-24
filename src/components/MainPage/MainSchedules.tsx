import ControlDate from '@/components/SchedulesPage/ControlDate';
import DateBox from '@/components/SchedulesPage/DateBox';
import CalendarIcon from '@/assets/CalendarIcon';

function MainSchedules() {
  const Container = 'w-full mt-[1.6rem] rounded-[2.4rem]';

  return (
    <>
      <div className="ml-[0.3rem] mr-[5.2rem] mt-[0.3rem] bg-[#F7F7F7]">
        <div className="content flex justify-between gap-[120rem]  whitespace-nowrap">
          <div className="flex items-center  gap-[0.9rem] font-rammetto text-[1.8rem] text-[#292929]">
            <CalendarIcon active={true}></CalendarIcon>
            <span> My calendar </span>
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
