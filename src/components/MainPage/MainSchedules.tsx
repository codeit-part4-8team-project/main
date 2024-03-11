import { useState } from 'react';
import ControlDate from '@/components/MainPage/ControlDate';
import DateBox from '@/components/MainPage/DateBox';

function MainSchedules() {
  const Container = 'w-full m-[1.5rem] rounded-[2.4rem] shadow';
  const [nowDate, setNowDate] = useState<Date>(new Date());

  return (
    <>
      {' '}
      <ControlDate nowDate={nowDate} setNowDate={setNowDate} />
      <div className={Container}>
        <div>
          <DateBox nowDate={nowDate} />
        </div>
      </div>
    </>
  );
}

export default MainSchedules;
