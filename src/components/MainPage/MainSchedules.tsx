import ControlDate from '@/components/SchedulesPage/ControlDate';
import DateBox from '@/components/SchedulesPage/DateBox';

function MainSchedules() {
  const Container = 'w-full m-[1.5rem] rounded-[2.4rem] shadow';
  return (
    <>
      <ControlDate mode="week" />
      <div className={Container}>
        <div>
          <DateBox mode="week" />
        </div>
      </div>
    </>
  );
}

export default MainSchedules;
